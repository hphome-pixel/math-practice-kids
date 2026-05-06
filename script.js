const TOTAL_QUESTIONS = 10;

const setupView = document.querySelector("#setupView");
const quizView = document.querySelector("#quizView");
const reciteView = document.querySelector("#reciteView");
const resultView = document.querySelector("#resultView");
const stars = document.querySelector("#stars");
const questionCount = document.querySelector("#questionCount");
const scoreText = document.querySelector("#scoreText");
const progressFill = document.querySelector("#progressFill");
const questionText = document.querySelector("#questionText");
const answerForm = document.querySelector("#answerForm");
const answerInput = document.querySelector("#answerInput");
const feedbackText = document.querySelector("#feedbackText");
const resultScore = document.querySelector("#resultScore");
const resultMessage = document.querySelector("#resultMessage");
const reviewPanel = document.querySelector("#reviewPanel");
const reviewList = document.querySelector("#reviewList");
const clearWritingButton = document.querySelector("#clearWritingButton");
const submitAnswerButton = document.querySelector("#submitAnswerButton");
const startButton = document.querySelector("#startButton");
const arithmeticSettings = document.querySelector("#arithmeticSettings");
const multiplySettings = document.querySelector("#multiplySettings");
const divideSettings = document.querySelector("#divideSettings");
const reciteTitle = document.querySelector("#reciteTitle");
const reciteList = document.querySelector("#reciteList");
const toggleAnswersButton = document.querySelector("#toggleAnswersButton");
let nextQuestionTimer = null;
let digitTemplates = null;

const state = {
  practiceMode: "arithmetic",
  operation: "mixed",
  digits: 1,
  multiplyMode: "table-1",
  divideMode: "divide-1",
  totalQuestions: TOTAL_QUESTIONS,
  current: 0,
  score: 0,
  question: null,
  questionQueue: null,
  reviewRecords: [],
  reciteAnswersHidden: false,
  locked: false,
  awaitingNext: false,
  answerBoxes: [],
  scratchBoxes: [],
  previewCells: [],
};

startButton.addEventListener("click", startQuiz);
document.querySelector("#stopButton").addEventListener("click", stopQuiz);
document.querySelector("#againButton").addEventListener("click", startQuiz);
document.querySelector("#changeButton").addEventListener("click", showSetup);
document.querySelector("#wrongOnlyButton").addEventListener("click", startWrongOnlyQuiz);
document.querySelector("#reciteBackButton").addEventListener("click", showSetup);
toggleAnswersButton.addEventListener("click", toggleReciteAnswers);
document.querySelector("#prevTableButton").addEventListener("click", () => changeReciteTable(-1));
document.querySelector("#nextTableButton").addEventListener("click", () => changeReciteTable(1));
answerForm.addEventListener("submit", checkAnswer);
clearWritingButton.addEventListener("click", clearWriting);
document.querySelectorAll("input[name='practiceMode']").forEach((input) => {
  input.addEventListener("change", updateSetupMode);
});
document.querySelectorAll("input[name='multiplyMode']").forEach((input) => {
  input.addEventListener("change", updateStartButtonText);
});
updateSetupMode();

function startQuiz() {
  clearNextQuestionTimer();
  state.practiceMode = document.querySelector("input[name='practiceMode']:checked").value;
  state.operation = getSelectedOperation(state.practiceMode);
  state.digits = Number(document.querySelector("input[name='digits']:checked").value);
  state.multiplyMode = document.querySelector("input[name='multiplyMode']:checked").value;
  state.divideMode = document.querySelector("input[name='divideMode']:checked").value;

  if (state.practiceMode === "multiply" && state.multiplyMode.startsWith("recite-")) {
    showRecitation(Number(state.multiplyMode.replace("recite-", "")));
    return;
  }

  state.current = 0;
  state.score = 0;
  state.totalQuestions = TOTAL_QUESTIONS;
  state.questionQueue = null;
  state.reviewRecords = [];
  state.awaitingNext = false;

  setupView.classList.add("hidden");
  reciteView.classList.add("hidden");
  resultView.classList.add("hidden");
  quizView.classList.remove("hidden");
  feedbackText.textContent = "";
  feedbackText.className = "feedback";
  updateStars();
  nextQuestion();
}

function updateSetupMode() {
  const practiceMode = document.querySelector("input[name='practiceMode']:checked").value;
  arithmeticSettings.classList.toggle("hidden", practiceMode !== "arithmetic");
  multiplySettings.classList.toggle("hidden", practiceMode !== "multiply");
  divideSettings.classList.toggle("hidden", practiceMode !== "divide");
  updateStartButtonText();
}

function updateStartButtonText() {
  const practiceMode = document.querySelector("input[name='practiceMode']:checked").value;
  const multiplyMode = document.querySelector("input[name='multiplyMode']:checked").value;
  startButton.textContent = practiceMode === "multiply" && multiplyMode.startsWith("recite-")
    ? "開始背誦"
    : "開始 10 題";
}

function showSetup() {
  clearNextQuestionTimer();
  state.locked = false;
  state.awaitingNext = false;
  state.questionQueue = null;
  submitAnswerButton.disabled = false;
  submitAnswerButton.textContent = "確認";
  resultView.classList.add("hidden");
  quizView.classList.add("hidden");
  reciteView.classList.add("hidden");
  setupView.classList.remove("hidden");
  stars.textContent = "☆☆☆☆☆";
  setWritingDisabled(false);
  clearWriting();
  feedbackText.textContent = "";
  feedbackText.className = "feedback";
}

function stopQuiz() {
  showSetup();
}

function startWrongOnlyQuiz() {
  const wrongQuestions = state.reviewRecords
    .filter((record) => !record.isCorrect)
    .map((record) => ({ ...record.question }));

  if (wrongQuestions.length === 0) {
    return;
  }

  clearNextQuestionTimer();
  state.questionQueue = wrongQuestions;
  state.totalQuestions = wrongQuestions.length;
  state.current = 0;
  state.score = 0;
  state.reviewRecords = [];
  state.awaitingNext = false;
  setupView.classList.add("hidden");
  reciteView.classList.add("hidden");
  resultView.classList.add("hidden");
  quizView.classList.remove("hidden");
  feedbackText.textContent = "";
  feedbackText.className = "feedback";
  updateStars();
  nextQuestion();
}

function showRecitation(tableNumber) {
  state.multiplyMode = `recite-${tableNumber}`;
  setupView.classList.add("hidden");
  quizView.classList.add("hidden");
  resultView.classList.add("hidden");
  reciteView.classList.remove("hidden");
  stars.textContent = "☆☆☆☆☆";
  updateReciteToggleButton();
  renderRecitationTable(tableNumber);
}

function toggleReciteAnswers() {
  state.reciteAnswersHidden = !state.reciteAnswersHidden;
  const tableNumber = Number(state.multiplyMode.replace("recite-", "")) || 1;
  updateReciteToggleButton();
  renderRecitationTable(tableNumber);
}

function updateReciteToggleButton() {
  toggleAnswersButton.textContent = state.reciteAnswersHidden ? "顯示答案" : "遮住答案";
}

function changeReciteTable(offset) {
  const currentTable = Number(state.multiplyMode.replace("recite-", "")) || 1;
  const nextTable = ((currentTable - 1 + offset + 9) % 9) + 1;
  const input = document.querySelector(`input[name='multiplyMode'][value='recite-${nextTable}']`);
  if (input) {
    input.checked = true;
  }
  showRecitation(nextTable);
}

function renderRecitationTable(tableNumber) {
  reciteTitle.textContent = `${tableNumber} 的乘法表`;
  reciteList.innerHTML = Array.from({ length: 9 }, (_, index) => {
    const multiplier = index + 1;
    const answer = tableNumber * multiplier;
    return `
      <div class="recite-row">
        <span>${tableNumber} × ${multiplier}</span>
        <strong class="${state.reciteAnswersHidden ? "hidden-answer" : ""}">${state.reciteAnswersHidden ? "?" : answer}</strong>
      </div>
    `;
  }).join("");
}

function nextQuestion() {
  if (state.current >= state.totalQuestions) {
    showResult();
    return;
  }

  state.question = state.questionQueue
    ? state.questionQueue[state.current]
    : makeQuestion(state.operation, state.digits, state.multiplyMode, state.divideMode);
  state.current += 1;
  state.locked = false;
  state.awaitingNext = false;
  renderQuestion(state.question);
  clearWriting();
  feedbackText.textContent = "";
  feedbackText.className = "feedback hidden";
  questionCount.textContent = `第 ${state.current} / ${state.totalQuestions} 題`;
  scoreText.textContent = `答對 ${state.score} 題`;
  progressFill.style.width = `${((state.current - 1) / state.totalQuestions) * 100}%`;
  answerInput.value = "";
  submitAnswerButton.disabled = false;
  submitAnswerButton.textContent = "確認";
  setWritingDisabled(false);
}

function checkAnswer(event) {
  event.preventDefault();

  if (state.awaitingNext) {
    nextQuestion();
    return;
  }

  if (state.locked) {
    return;
  }

  const writtenAnswer = recognizeAnswer();
  answerInput.value = writtenAnswer;

  if (writtenAnswer === "") {
    feedbackText.textContent = "先在答案格寫答案喔";
    feedbackText.className = "feedback feedback-card wrong";
    return;
  }

  state.locked = true;
  setWritingDisabled(true);
  const userAnswer = Number(writtenAnswer);
  const isCorrect = userAnswer === state.question.answer;
  state.reviewRecords.push({
    question: { ...state.question },
    userAnswer: writtenAnswer,
    isCorrect,
  });

  if (isCorrect) {
    state.score += 1;
    feedbackText.textContent = "答對了！";
    feedbackText.className = "feedback feedback-card correct";
    submitAnswerButton.disabled = true;
  } else {
    feedbackText.textContent = `差一點！答案是 ${state.question.answer}`;
    feedbackText.className = "feedback feedback-card wrong";
    state.awaitingNext = true;
    submitAnswerButton.textContent = "下一題";
  }

  updateStars();
  scoreText.textContent = `答對 ${state.score} 題`;
  progressFill.style.width = `${(state.current / state.totalQuestions) * 100}%`;
  if (isCorrect) {
    nextQuestionTimer = setTimeout(nextQuestion, 1000);
  }
}

function showResult() {
  quizView.classList.add("hidden");
  resultView.classList.remove("hidden");
  resultScore.textContent = `${state.score} / ${state.totalQuestions}`;
  progressFill.style.width = "100%";

  if (state.score === state.totalQuestions) {
    resultMessage.textContent = "全部答對，太厲害了！";
  } else if (state.score / state.totalQuestions >= 0.8) {
    resultMessage.textContent = "很棒，繼續保持！";
  } else if (state.score / state.totalQuestions >= 0.5) {
    resultMessage.textContent = "有進步，再練一輪會更熟。";
  } else {
    resultMessage.textContent = "慢慢來，每次多會一點就很好。";
  }

  renderReviewRecords();
}

function updateStars() {
  const filled = Math.round((state.score / state.totalQuestions) * 5);
  stars.textContent = "★".repeat(filled) + "☆".repeat(5 - filled);
}

function renderReviewRecords() {
  const wrongCount = state.reviewRecords.filter((record) => !record.isCorrect).length;
  document.querySelector("#wrongOnlyButton").classList.toggle("hidden", wrongCount === 0);
  reviewPanel.classList.toggle("hidden", state.reviewRecords.length === 0);
  reviewList.innerHTML = state.reviewRecords.map((record, index) => {
    const status = record.isCorrect ? "答對" : "答錯";
    const answerText = record.isCorrect
      ? `你寫 ${record.userAnswer}`
      : `你寫 ${record.userAnswer}，答案是 ${record.question.answer}`;
    return `
      <div class="review-row ${record.isCorrect ? "correct" : "wrong"}">
        <span>第 ${index + 1} 題</span>
        <strong>${record.question.text.replace("?", record.question.answer)}</strong>
        <small>${status}：${answerText}</small>
      </div>
    `;
  }).join("");
}

function makeQuestion(operation, digits, multiplyMode, divideMode) {
  const pickedOperation = operation === "mixed" ? pickOperation() : operation;
  const range = getRange(digits);

  if (pickedOperation === "add") {
    const a = randomInt(range.min, range.max);
    const b = randomInt(range.min, range.max);
    return { text: `${a} + ${b} = ?`, answer: a + b, operation: "add", a, b };
  }

  if (pickedOperation === "multiply") {
    return makeMultiplyQuestion(multiplyMode);
  }

  if (pickedOperation === "divide") {
    return makeDivideQuestion(divideMode);
  }

  const first = randomInt(range.min, range.max);
  const second = randomInt(range.min, range.max);
  const a = Math.max(first, second);
  const b = Math.min(first, second);
  return { text: `${a} - ${b} = ?`, answer: a - b, operation: "subtract", a, b };
}

function renderQuestion(question) {
  if (question.layout === "horizontal") {
    renderHorizontalQuestion(question);
    return;
  }

  if (question.operation === "divide") {
    if (question.layout === "longDivision") {
      renderLongDivisionQuestion(question);
    } else {
      renderHorizontalQuestion(question);
    }
    return;
  }

  const operatorByOperation = {
    add: "+",
    subtract: "-",
    multiply: "×",
  };
  const operator = operatorByOperation[question.operation];
  const topDigits = String(question.a);
  const bottomDigits = String(question.b);
  const answerDigits = String(question.answer);
  const columns = Math.max(topDigits.length, bottomDigits.length, answerDigits.length);
  const topCells = padDigits(topDigits, columns);
  const bottomCells = padDigits(bottomDigits, columns);
  questionText.className = "question vertical";
  questionText.innerHTML = `
    <div class="worksheet columns-${columns}" style="--columns: ${columns}" aria-label="${question.text}">
      <div class="worksheet-row scratch-row">
        <div class="worksheet-spacer"></div>
        ${makeCanvasCells(columns, "carry-canvas", "進位或借位")}
      </div>
      <div class="worksheet-row top-row">
        <div class="worksheet-spacer"></div>
        ${makeDigitCells(topCells)}
      </div>
      <div class="worksheet-row bottom-row">
        <div class="worksheet-cell operator">${operator}</div>
        ${makeDigitCells(bottomCells)}
      </div>
      <div class="worksheet-line"></div>
      <div class="worksheet-row answer-row">
        <div class="worksheet-spacer"></div>
        ${makeCanvasCells(columns, "answer-canvas", "答案")}
      </div>
      <div class="worksheet-row preview-row">
        <div class="worksheet-spacer"></div>
        ${makePreviewCells(columns)}
      </div>
    </div>
  `;
  buildWritingBoxes();
  updateAnswerPreview();
}

function renderHorizontalQuestion(question) {
  const answerDigits = String(question.answer);
  const columns = answerDigits.length;
  const operatorByOperation = {
    divide: "÷",
    multiply: "×",
  };
  const operator = operatorByOperation[question.operation];
  questionText.className = "question horizontal";
  questionText.innerHTML = `
    <div class="horizontal-question" aria-label="${question.text}">
      <div class="horizontal-equation">${question.a} ${operator} ${question.b} = ?</div>
      <div class="horizontal-answer columns-${columns}" style="--columns: ${columns}">
        ${makeCanvasCells(columns, "answer-canvas", "答案")}
        ${makePreviewCells(columns)}
      </div>
    </div>
  `;
  buildWritingBoxes();
  updateAnswerPreview();
}

function renderLongDivisionQuestion(question) {
  const answerDigits = String(question.answer);
  const scratchColumns = String(question.a).length;
  questionText.className = "question long-division";
  questionText.innerHTML = `
    <div class="long-division-question" aria-label="${question.text}">
      <div class="long-division-grid">
        <div class="long-division-spacer"></div>
        <div class="long-division-answer columns-${scratchColumns}" style="--columns: ${scratchColumns}">
          ${makeLongDivisionAnswerCells(answerDigits, scratchColumns)}
        </div>
        <div class="long-divisor">${question.b}</div>
        <div class="long-dividend columns-${scratchColumns}" style="--columns: ${scratchColumns}">
          ${makeLongDivisionDigitCells(String(question.a))}
        </div>
        <div class="long-division-spacer"></div>
        <div class="long-division-scratch columns-${scratchColumns}" style="--columns: ${scratchColumns}" aria-label="運算草稿">
          ${makeCanvasCells(scratchColumns * 2, "scratch-canvas", "草稿")}
        </div>
      </div>
    </div>
  `;
  buildWritingBoxes();
  updateAnswerPreview();
}

function pickOperation() {
  const operations = ["add", "subtract"];
  return operations[randomInt(0, operations.length - 1)];
}

function makeMultiplyQuestion(multiplyMode) {
  if (multiplyMode === "hundreds") {
    const a = randomInt(100, 999);
    const b = randomInt(2, 9);
    return { text: `${a} × ${b} = ?`, answer: a * b, operation: "multiply", a, b };
  }

  if (multiplyMode === "tens") {
    const a = randomInt(10, 99);
    const b = randomInt(2, 9);
    return { text: `${a} × ${b} = ?`, answer: a * b, operation: "multiply", a, b };
  }

  const tableNumber = Number(multiplyMode.replace("table-", ""));
  const b = randomInt(1, 9);
  return {
    text: `${tableNumber} × ${b} = ?`,
    answer: tableNumber * b,
    operation: "multiply",
    layout: "horizontal",
    a: tableNumber,
    b,
  };
}

function makeDivideQuestion(divideMode) {
  if (divideMode === "tens") {
    const divisor = randomInt(2, 9);
    const answer = randomInt(10, 99);
    return {
      text: `${divisor * answer} ÷ ${divisor} = ?`,
      answer,
      operation: "divide",
      layout: "longDivision",
      a: divisor * answer,
      b: divisor,
    };
  }

  const divisor = Number(divideMode.replace("divide-", ""));
  const answer = randomInt(1, 9);
  return {
    text: `${divisor * answer} ÷ ${divisor} = ?`,
    answer,
    operation: "divide",
    layout: "horizontal",
    a: divisor * answer,
    b: divisor,
  };
}

function getSelectedOperation(practiceMode) {
  if (practiceMode === "multiply") {
    return "multiply";
  }

  if (practiceMode === "divide") {
    return "divide";
  }

  return document.querySelector("input[name='operation']:checked").value;
}

function getRange(digits) {
  if (digits === 1) {
    return { min: 0, max: 10 };
  }

  return {
    min: 10 ** (digits - 1),
    max: 10 ** digits - 1,
  };
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clearNextQuestionTimer() {
  if (nextQuestionTimer) {
    clearTimeout(nextQuestionTimer);
    nextQuestionTimer = null;
  }
}

function buildWritingBoxes() {
  state.answerBoxes = [];
  state.scratchBoxes = [];
  state.previewCells = Array.from(document.querySelectorAll(".preview-cell"));
  state.previewCells.forEach((cell) => {
    cell.addEventListener("click", openDigitChooser);
  });

  document.querySelectorAll(".answer-canvas, .carry-canvas, .scratch-canvas").forEach((canvas, index) => {
    canvas.width = 160;
    canvas.height = 160;

    const box = {
      canvas,
      context: canvas.getContext("2d"),
      drawing: false,
      points: [],
      hasInk: false,
      disabled: false,
      manualDigit: null,
    };

    prepareCanvas(box);
    canvas.addEventListener("pointerdown", (event) => startDrawing(event, box));
    canvas.addEventListener("pointermove", (event) => draw(event, box));
    canvas.addEventListener("pointerup", () => stopDrawing(box));
    canvas.addEventListener("pointercancel", () => stopDrawing(box));
    canvas.addEventListener("pointerleave", () => stopDrawing(box));

    if (canvas.classList.contains("answer-canvas")) {
      state.answerBoxes.push(box);
    } else {
      state.scratchBoxes.push(box);
    }
  });
}

function prepareCanvas(box) {
  const { context, canvas } = box;
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = 14;
  context.strokeStyle = "#263238";
}

function startDrawing(event, box) {
  if (state.locked || box.disabled) {
    return;
  }

  event.preventDefault();
  box.manualDigit = null;
  box.drawing = true;
  box.hasInk = true;
  const point = getCanvasPoint(event, box.canvas);
  box.points.push(point);
  box.context.beginPath();
  box.context.moveTo(point.x, point.y);
}

function draw(event, box) {
  if (!box.drawing) {
    return;
  }

  event.preventDefault();
  const point = getCanvasPoint(event, box.canvas);
  box.points.push(point);
  box.context.lineTo(point.x, point.y);
  box.context.stroke();
  updateAnswerPreview();
}

function stopDrawing(box) {
  box.drawing = false;
}

function getCanvasPoint(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * canvas.width,
    y: ((event.clientY - rect.top) / rect.height) * canvas.height,
  };
}

function clearWriting() {
  closeDigitChoosers();
  [...state.answerBoxes, ...state.scratchBoxes].forEach((box) => {
    box.points = [];
    box.hasInk = false;
    box.drawing = false;
    box.manualDigit = null;
    prepareCanvas(box);
  });
  updateAnswerPreview();
}

function recognizeAnswer() {
  const digits = state.answerBoxes
    .map((box) => box.manualDigit ?? recognizeDigit(box))
    .join("")
    .replace(/^0+(?=\d)/, "");
  return digits;
}

function recognizeDigit(box) {
  if (!box.hasInk) {
    return null;
  }

  const sample = getNormalizedPixels(box.canvas);
  const templates = getDigitTemplates();
  let bestDigit = "0";
  let bestScore = Number.POSITIVE_INFINITY;

  templates.forEach((variants, digit) => {
    const score = Math.min(...variants.map((template) => comparePixels(sample, template)));
    if (score < bestScore) {
      bestScore = score;
      bestDigit = String(digit);
    }
  });

  return bestDigit;
}

function getNormalizedPixels(canvas) {
  const size = 28;
  const source = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
  const bounds = getInkBounds(source);
  const temp = document.createElement("canvas");
  temp.width = size;
  temp.height = size;
  const context = temp.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, size, size);

  if (!bounds) {
    return new Array(size * size).fill(0);
  }

  const width = bounds.maxX - bounds.minX + 1;
  const height = bounds.maxY - bounds.minY + 1;
  const scale = Math.min(22 / width, 22 / height);
  const drawWidth = width * scale;
  const drawHeight = height * scale;
  const offsetX = (size - drawWidth) / 2;
  const offsetY = (size - drawHeight) / 2;
  context.drawImage(
    canvas,
    bounds.minX,
    bounds.minY,
    width,
    height,
    offsetX,
    offsetY,
    drawWidth,
    drawHeight,
  );

  return pixelsFromImageData(context.getImageData(0, 0, size, size));
}

function getInkBounds(imageData) {
  const { data, width, height } = imageData;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let found = false;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const darkness = 255 - (data[index] + data[index + 1] + data[index + 2]) / 3;
      if (darkness > 30) {
        found = true;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  return found ? { minX, minY, maxX, maxY } : null;
}

function pixelsFromImageData(imageData) {
  const pixels = [];
  for (let index = 0; index < imageData.data.length; index += 4) {
    const darkness = 255 - (
      imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2]
    ) / 3;
    pixels.push(darkness / 255);
  }
  return pixels;
}

function getDigitTemplates() {
  if (digitTemplates) {
    return digitTemplates;
  }

  digitTemplates = Array.from({ length: 10 }, (_, digit) => {
    const variants = [makeFontTemplate(digit)];
    getStrokeVariants(digit).forEach((strokes) => {
      variants.push(makeStrokeTemplate(strokes));
    });
    return variants;
  });

  return digitTemplates;
}

function makeFontTemplate(digit) {
  const canvas = document.createElement("canvas");
  canvas.width = 160;
  canvas.height = 160;
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#263238";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "120px Segoe UI, Arial, sans-serif";
  context.fillText(String(digit), 80, 84);
  return getNormalizedPixels(canvas);
}

function makeStrokeTemplate(strokes) {
  const canvas = document.createElement("canvas");
  canvas.width = 160;
  canvas.height = 160;
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = 16;
  context.strokeStyle = "#263238";

  strokes.forEach((stroke) => {
    context.beginPath();
    stroke.forEach((point, index) => {
      if (index === 0) {
        context.moveTo(point[0], point[1]);
      } else {
        context.lineTo(point[0], point[1]);
      }
    });
    context.stroke();
  });

  return getNormalizedPixels(canvas);
}

function getStrokeVariants(digit) {
  const variants = {
    0: [
      [[[80, 28], [112, 44], [120, 82], [104, 124], [70, 132], [42, 112], [36, 76], [48, 42], [80, 28]]],
    ],
    1: [
      [[[82, 28], [82, 132]]],
      [[[70, 42], [88, 26], [88, 132]]],
      [[[88, 30], [78, 132]]],
    ],
    2: [
      [[[46, 50], [76, 28], [112, 40], [112, 72], [48, 130], [118, 130]]],
    ],
    3: [
      [[[48, 38], [112, 38], [82, 78], [116, 92], [100, 128], [46, 122]]],
    ],
    4: [
      [[[106, 28], [46, 100], [122, 100]], [[104, 28], [104, 134]]],
      [[[98, 28], [98, 132]], [[42, 92], [122, 92]], [[98, 28], [42, 92]]],
      [[[48, 34], [48, 96], [120, 96]], [[108, 34], [108, 134]]],
    ],
    5: [
      [[[112, 34], [54, 34], [48, 76], [92, 76], [116, 98], [100, 130], [46, 124]]],
    ],
    6: [
      [[[104, 36], [68, 42], [44, 80], [54, 124], [94, 132], [118, 104], [100, 80], [58, 82]]],
    ],
    7: [
      [[[42, 34], [120, 34], [70, 132]]],
      [[[42, 34], [120, 34], [88, 76], [70, 132]]],
    ],
    8: [
      [[[80, 28], [112, 48], [88, 76], [48, 56], [64, 30], [80, 28]], [[80, 78], [120, 102], [96, 134], [54, 120], [48, 92], [80, 78]]],
    ],
    9: [
      [[[78, 30], [112, 46], [108, 82], [76, 92], [48, 74], [52, 42], [78, 30]], [[108, 80], [90, 132]]],
      [[[78, 28], [116, 42], [118, 76], [88, 96], [52, 82], [50, 48], [78, 28]], [[112, 72], [106, 132]]],
      [[[76, 30], [110, 48], [112, 84], [78, 96], [48, 76], [52, 42], [76, 30]], [[110, 82], [72, 132]]],
    ],
  };

  return variants[digit] ?? [];
}

function comparePixels(sample, template) {
  let score = 0;
  for (let index = 0; index < sample.length; index += 1) {
    score += Math.abs(sample[index] - template[index]);
  }
  return score;
}

function setWritingDisabled(isDisabled) {
  clearWritingButton.disabled = isDisabled;
  [...state.answerBoxes, ...state.scratchBoxes].forEach((box) => {
    box.disabled = isDisabled;
  });
  state.previewCells.forEach((cell) => {
    cell.disabled = isDisabled;
  });
}

function openDigitChooser(event) {
  if (state.locked) {
    return;
  }

  const previewCell = event.currentTarget;
  const index = Number(previewCell.dataset.previewIndex);
  const box = state.answerBoxes[index];
  if (!box) {
    return;
  }

  closeDigitChoosers();
  const chooser = document.createElement("div");
  chooser.className = "digit-chooser";
  chooser.dataset.chooserIndex = String(index);
  chooser.innerHTML = Array.from({ length: 10 }, (_, digit) => (
    `<button type="button" data-choice="${digit}">${digit}</button>`
  )).join("");
  const chooserHost = previewCell.closest(".worksheet")
    ?? previewCell.closest(".horizontal-question")
    ?? previewCell.closest(".long-division-question");
  if (!chooserHost) {
    return;
  }

  chooserHost.append(chooser);

  chooser.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      box.manualDigit = button.dataset.choice;
      updateAnswerPreview();
      closeDigitChoosers();
    });
  });
}

function closeDigitChoosers() {
  document.querySelectorAll(".digit-chooser").forEach((chooser) => chooser.remove());
}

function updateAnswerPreview() {
  state.answerBoxes.forEach((box, index) => {
    const previewCell = state.previewCells[index];
    if (!previewCell) {
      return;
    }

    const digit = box.manualDigit ?? recognizeDigit(box);
    previewCell.textContent = digit ?? "-";
    previewCell.setAttribute(
      "aria-label",
      digit === null ? "尚未辨識，點選可手動選答案" : `辨識為 ${digit}，點選可修改`,
    );
    previewCell.classList.toggle("empty", digit === null);
    previewCell.classList.toggle("manual", box.manualDigit !== null);
  });
}

function padDigits(value, columns) {
  return value.padStart(columns, " ").split("");
}

function makeDigitCells(digits) {
  return digits
    .map((digit) => `<div class="worksheet-cell digit">${digit === " " ? "" : digit}</div>`)
    .join("");
}

function makeLongDivisionDigitCells(value) {
  return value
    .split("")
    .map((digit) => `<span class="long-dividend-digit">${digit}</span>`)
    .join("");
}

function makeLongDivisionAnswerCells(answerDigits, columns) {
  const answerCells = answerDigits
    .split("")
    .map((_, index) => (
      `<canvas class="answer-canvas" aria-label="商第 ${index + 1} 格"></canvas>`
    ));
  const previewCells = answerDigits
    .split("")
    .map((_, index) => (
      `<button class="worksheet-cell preview-cell empty" type="button" data-preview-index="${index}">-</button>`
    ));
  const placeholders = Array.from(
    { length: Math.max(0, columns - answerDigits.length) },
    () => `<div class="long-division-placeholder" aria-hidden="true"></div>`,
  );

  return [
    ...placeholders,
    ...answerCells,
    ...placeholders,
    ...previewCells,
  ].join("");
}

function makeCanvasCells(count, className, label) {
  return Array.from({ length: count }, (_, index) => (
    `<canvas class="${className}" aria-label="${label}第 ${index + 1} 格"></canvas>`
  )).join("");
}

function makePreviewCells(count) {
  return Array.from({ length: count }, (_, index) => (
    `<button class="worksheet-cell preview-cell empty" type="button" data-preview-index="${index}">-</button>`
  )).join("");
}
