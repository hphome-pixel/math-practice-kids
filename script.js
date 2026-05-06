const TOTAL_QUESTIONS = 10;
const PUZZLE_QUESTIONS = 9;

const setupView = document.querySelector("#setupView");
const settingsView = document.querySelector("#settingsView");
const quizView = document.querySelector("#quizView");
const monsterView = document.querySelector("#monsterView");
const puzzleView = document.querySelector("#puzzleView");
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
const settingsButton = document.querySelector("#settingsButton");
const arithmeticSettings = document.querySelector("#arithmeticSettings");
const multiplySettings = document.querySelector("#multiplySettings");
const divideSettings = document.querySelector("#divideSettings");
const miniGameSettings = document.querySelector("#miniGameSettings");
const practiceOptions = document.querySelector("#practiceOptions");
const addDifficultySettings = document.querySelector("#addDifficultySettings");
const subtractDifficultySettings = document.querySelector("#subtractDifficultySettings");
const reciteTitle = document.querySelector("#reciteTitle");
const reciteList = document.querySelector("#reciteList");
const toggleAnswersButton = document.querySelector("#toggleAnswersButton");
const timedModeToggle = document.querySelector("#timedModeToggle");
const soundToggle = document.querySelector("#soundToggle");
const timeLimitInput = document.querySelector("#timeLimitInput");
const timerText = document.querySelector("#timerText");
const dailySummary = document.querySelector("#dailySummary");
const monsterQuestionCount = document.querySelector("#monsterQuestionCount");
const monsterScoreText = document.querySelector("#monsterScoreText");
const monsterQuestion = document.querySelector("#monsterQuestion");
const monsterChoices = document.querySelector("#monsterChoices");
const monsterFeedback = document.querySelector("#monsterFeedback");
const monsterHealthFill = document.querySelector("#monsterHealthFill");
const monsterEnemy = document.querySelector("#monsterEnemy");
const puzzleQuestionCount = document.querySelector("#puzzleQuestionCount");
const puzzleScoreText = document.querySelector("#puzzleScoreText");
const puzzleQuestion = document.querySelector("#puzzleQuestion");
const puzzleChoices = document.querySelector("#puzzleChoices");
const puzzleFeedback = document.querySelector("#puzzleFeedback");
const puzzleBoard = document.querySelector("#puzzleBoard");
const puzzleResultButton = document.querySelector("#puzzleResultButton");
let nextQuestionTimer = null;
let quizTimer = null;
let digitTemplates = null;
let audioContext = null;

const state = {
  practiceMode: "add",
  operation: "add",
  digits: 1,
  multiplyMode: "table-1",
  divideMode: "divide-1",
  miniGameMode: "monster",
  miniGameOperation: "add",
  addDifficulty: "any",
  subtractDifficulty: "any",
  timedMode: false,
  soundEnabled: true,
  secondsLeft: 60,
  totalQuestions: TOTAL_QUESTIONS,
  current: 0,
  score: 0,
  question: null,
  questionQueue: null,
  reviewRecords: [],
  monsterCurrent: 0,
  monsterScore: 0,
  monsterQuestion: null,
  monsterLocked: false,
  puzzleCurrent: 0,
  puzzleScore: 0,
  puzzleQuestion: null,
  puzzleLocked: false,
  puzzleImage: null,
  puzzleRevealOrder: [],
  puzzleUnlockedPieces: [],
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
settingsButton.addEventListener("click", showSettings);
document.querySelector("#settingsBackButton").addEventListener("click", showSetup);
document.querySelector("#monsterStopButton").addEventListener("click", showSetup);
document.querySelector("#puzzleStopButton").addEventListener("click", showSetup);
document.querySelector("#puzzleResultButton").addEventListener("click", showPuzzleResult);
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
document.querySelectorAll("input[name='miniGameMode']").forEach((input) => {
  input.addEventListener("change", updateStartButtonText);
});
document.querySelectorAll("input[name='miniGameOperation']").forEach((input) => {
  input.addEventListener("change", updateStartButtonText);
});
timedModeToggle.addEventListener("change", updateStartButtonText);
timeLimitInput.addEventListener("input", updateStartButtonText);
soundToggle.addEventListener("change", () => {
  state.soundEnabled = soundToggle.checked;
});
updateSetupMode();
renderDailySummary();

function startQuiz() {
  clearNextQuestionTimer();
  clearQuizTimer();
  state.practiceMode = document.querySelector("input[name='practiceMode']:checked").value;
  state.operation = getSelectedOperation(state.practiceMode);
  state.digits = Number(document.querySelector("input[name='digits']:checked").value);
  state.multiplyMode = document.querySelector("input[name='multiplyMode']:checked").value;
  state.divideMode = document.querySelector("input[name='divideMode']:checked").value;
  state.miniGameMode = document.querySelector("input[name='miniGameMode']:checked").value;
  state.miniGameOperation = document.querySelector("input[name='miniGameOperation']:checked").value;
  state.addDifficulty = document.querySelector("input[name='addDifficulty']:checked").value;
  state.subtractDifficulty = document.querySelector("input[name='subtractDifficulty']:checked").value;
  state.timedMode = timedModeToggle.checked;
  state.soundEnabled = soundToggle.checked;
  state.secondsLeft = getTimeLimitSeconds();

  if (state.practiceMode === "multiply" && state.multiplyMode.startsWith("recite-")) {
    showRecitation(Number(state.multiplyMode.replace("recite-", "")));
    return;
  }

  if (state.practiceMode === "miniGames") {
    if (state.miniGameMode === "puzzle") {
      startPuzzleGame();
    } else {
      startMonsterGame();
    }
    return;
  }

  state.current = 0;
  state.score = 0;
  state.totalQuestions = state.timedMode ? Number.POSITIVE_INFINITY : TOTAL_QUESTIONS;
  state.secondsLeft = getTimeLimitSeconds();
  state.questionQueue = null;
  state.reviewRecords = [];
  state.awaitingNext = false;

  setupView.classList.add("hidden");
  settingsView.classList.add("hidden");
  monsterView.classList.add("hidden");
  puzzleView.classList.add("hidden");
  reciteView.classList.add("hidden");
  resultView.classList.add("hidden");
  quizView.classList.remove("hidden");
  feedbackText.textContent = "";
  feedbackText.className = "feedback";
  updateStars();
  updateTimerDisplay();
  if (state.timedMode) {
    startQuizTimer();
  }
  nextQuestion();
}

function updateSetupMode() {
  const practiceMode = document.querySelector("input[name='practiceMode']:checked").value;
  const effectiveMode = practiceMode;
  const isArithmetic = effectiveMode === "add" || effectiveMode === "subtract";
  miniGameSettings.classList.toggle("hidden", practiceMode !== "miniGames");
  arithmeticSettings.classList.toggle("hidden", !isArithmetic);
  practiceOptions.classList.toggle("hidden", practiceMode === "miniGames");
  addDifficultySettings.classList.toggle("hidden", effectiveMode !== "add");
  subtractDifficultySettings.classList.toggle("hidden", effectiveMode !== "subtract");
  multiplySettings.classList.toggle("hidden", effectiveMode !== "multiply");
  divideSettings.classList.toggle("hidden", effectiveMode !== "divide");
  updateStartButtonText();
}

function updateStartButtonText() {
  const practiceMode = document.querySelector("input[name='practiceMode']:checked").value;
  const multiplyMode = document.querySelector("input[name='multiplyMode']:checked").value;
  const miniGameMode = document.querySelector("input[name='miniGameMode']:checked").value;
  if (practiceMode === "multiply" && multiplyMode.startsWith("recite-")) {
    startButton.textContent = "開始背誦";
  } else if (practiceMode === "miniGames") {
    startButton.textContent = miniGameMode === "puzzle" ? "開始解鎖" : "開始遊戲";
  } else {
    startButton.textContent = timedModeToggle.checked ? `開始 ${getTimeLimitSeconds()} 秒` : "開始 10 題";
  }
}

function getTimeLimitSeconds() {
  const value = Number(timeLimitInput.value);
  if (!Number.isFinite(value)) {
    return 60;
  }

  const seconds = Math.min(600, Math.max(10, Math.round(value)));
  timeLimitInput.value = String(seconds);
  return seconds;
}

function showSetup() {
  clearNextQuestionTimer();
  clearQuizTimer();
  state.locked = false;
  state.awaitingNext = false;
  state.questionQueue = null;
  submitAnswerButton.disabled = false;
  submitAnswerButton.textContent = "確認";
  resultView.classList.add("hidden");
  settingsView.classList.add("hidden");
  monsterView.classList.add("hidden");
  puzzleView.classList.add("hidden");
  quizView.classList.add("hidden");
  reciteView.classList.add("hidden");
  setupView.classList.remove("hidden");
  puzzleResultButton.classList.add("hidden");
  stars.textContent = "☆☆☆☆☆";
  timerText.classList.add("hidden");
  setWritingDisabled(false);
  clearWriting();
  feedbackText.textContent = "";
  feedbackText.className = "feedback";
}

function showSettings() {
  clearNextQuestionTimer();
  clearQuizTimer();
  setupView.classList.add("hidden");
  quizView.classList.add("hidden");
  monsterView.classList.add("hidden");
  puzzleView.classList.add("hidden");
  reciteView.classList.add("hidden");
  resultView.classList.add("hidden");
  settingsView.classList.remove("hidden");
}

function stopQuiz() {
  showSetup();
}

function startMonsterGame() {
  clearNextQuestionTimer();
  clearQuizTimer();
  state.monsterCurrent = 0;
  state.monsterScore = 0;
  state.score = 0;
  state.monsterLocked = false;
  state.reviewRecords = [];
  setupView.classList.add("hidden");
  settingsView.classList.add("hidden");
  quizView.classList.add("hidden");
  puzzleView.classList.add("hidden");
  reciteView.classList.add("hidden");
  resultView.classList.add("hidden");
  monsterView.classList.remove("hidden");
  stars.textContent = "☆☆☆☆☆";
  nextMonsterQuestion();
}

function nextMonsterQuestion() {
  if (state.monsterCurrent >= TOTAL_QUESTIONS) {
    showMonsterResult();
    return;
  }

  state.monsterCurrent += 1;
  state.monsterLocked = false;
  state.monsterQuestion = makeMonsterQuestion();
  monsterQuestionCount.textContent = `第 ${state.monsterCurrent} / ${TOTAL_QUESTIONS} 題`;
  monsterScoreText.textContent = `打中 ${state.monsterScore} 次`;
  monsterQuestion.textContent = state.monsterQuestion.text;
  monsterFeedback.textContent = "";
  monsterFeedback.className = "feedback hidden";
  monsterEnemy.classList.remove("hit", "miss");
  renderMonsterHealth();
  renderMonsterChoices();
}

function makeMonsterQuestion() {
  return makeMiniGameQuestion("monster");
}

function makeMiniGameQuestion(gameType) {
  const selectedOperation = state.miniGameOperation || "add";
  const operations = ["add", "subtract", "multiply"];
  const operation = selectedOperation === "mixed"
    ? operations[randomInt(0, operations.length - 1)]
    : selectedOperation;

  if (operation === "multiply") {
    const a = randomInt(2, 9);
    const b = randomInt(2, 9);
    const answer = a * b;
    return {
      text: `${a} × ${b} = ?`,
      answer,
      operation,
      a,
      b,
      choices: makeChoices(answer),
    };
  }

  if (operation === "add") {
    const a = randomInt(1, 20);
    const b = randomInt(1, 20);
    const answer = a + b;
    return {
      text: `${a} + ${b} = ?`,
      answer,
      operation,
      a,
      b,
      choices: makeChoices(answer),
    };
  }

  const a = randomInt(6, 30);
  const b = randomInt(1, a - 1);
  const answer = a - b;
  return {
    text: `${a} - ${b} = ?`,
    answer,
    operation,
    a,
    b,
    choices: makeChoices(answer),
  };
}

function makeChoices(answer) {
  const choices = new Set([answer]);
  while (choices.size < 4) {
    const spread = Math.max(6, Math.min(18, Math.round(answer / 2)));
    const offset = randomInt(-spread, spread);
    const candidate = answer + offset;
    if (candidate >= 0 && candidate !== answer) {
      choices.add(candidate);
    }
  }

  return shuffle(Array.from(choices));
}

function shuffle(items) {
  return items
    .map((item) => ({ item, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .map(({ item }) => item);
}

function renderMonsterChoices() {
  monsterChoices.innerHTML = state.monsterQuestion.choices.map((choice) => (
    `<button type="button" data-choice="${choice}">${choice}</button>`
  )).join("");
  monsterChoices.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => checkMonsterAnswer(Number(button.dataset.choice)));
  });
}

function checkMonsterAnswer(choice) {
  if (state.monsterLocked) {
    return;
  }

  state.monsterLocked = true;
  const isCorrect = choice === state.monsterQuestion.answer;
  state.reviewRecords.push({
    question: { ...state.monsterQuestion },
    userAnswer: String(choice),
    userAnswerDisplay: String(choice),
    isCorrect,
  });

  if (isCorrect) {
    state.monsterScore += 1;
    state.score = state.monsterScore;
    monsterFeedback.textContent = "打中了！";
    monsterFeedback.className = "feedback feedback-card correct";
    monsterEnemy.classList.add("hit");
    playFeedbackSound(true);
  } else {
    monsterFeedback.textContent = `差一點！答案是 ${state.monsterQuestion.answer}`;
    monsterFeedback.className = "feedback feedback-card wrong";
    monsterEnemy.classList.add("miss");
    playFeedbackSound(false);
  }

  monsterScoreText.textContent = `打中 ${state.monsterScore} 次`;
  updateStars();
  renderMonsterHealth();
  window.setTimeout(nextMonsterQuestion, isCorrect ? 800 : 1200);
}

function renderMonsterHealth() {
  const remaining = Math.max(0, TOTAL_QUESTIONS - state.monsterScore);
  monsterHealthFill.style.width = `${(remaining / TOTAL_QUESTIONS) * 100}%`;
}

function showMonsterResult() {
  monsterView.classList.add("hidden");
  resultView.classList.remove("hidden");
  resultScore.textContent = `${state.monsterScore} / ${TOTAL_QUESTIONS}`;
  if (state.monsterScore === TOTAL_QUESTIONS) {
    resultMessage.textContent = "怪物被打倒了，全部答對！";
  } else if (state.monsterScore >= 7) {
    resultMessage.textContent = "打得很好，怪物快撐不住了！";
  } else {
    resultMessage.textContent = "再練一輪，下一次打得更準。";
  }
  saveDailyPractice(TOTAL_QUESTIONS, state.monsterScore);
  renderDailySummary();
  renderReviewRecords();
}

function startPuzzleGame() {
  clearNextQuestionTimer();
  clearQuizTimer();
  state.puzzleCurrent = 0;
  state.puzzleScore = 0;
  state.score = 0;
  state.puzzleLocked = false;
  state.puzzleImage = pickPuzzleImage();
  state.puzzleRevealOrder = shuffle(Array.from({ length: PUZZLE_QUESTIONS }, (_, index) => index));
  state.puzzleUnlockedPieces = [];
  state.reviewRecords = [];
  setupView.classList.add("hidden");
  settingsView.classList.add("hidden");
  quizView.classList.add("hidden");
  monsterView.classList.add("hidden");
  reciteView.classList.add("hidden");
  resultView.classList.add("hidden");
  puzzleView.classList.remove("hidden");
  stars.textContent = "☆☆☆☆☆";
  puzzleResultButton.classList.add("hidden");
  renderPuzzleBoard();
  nextPuzzleQuestion();
}

function nextPuzzleQuestion() {
  if (state.puzzleCurrent >= PUZZLE_QUESTIONS) {
    showPuzzleResult();
    return;
  }

  state.puzzleCurrent += 1;
  state.puzzleLocked = false;
  state.puzzleQuestion = makeMiniGameQuestion("puzzle");
  puzzleQuestionCount.textContent = `第 ${state.puzzleCurrent} / ${PUZZLE_QUESTIONS} 題`;
  puzzleScoreText.textContent = `解鎖 ${state.puzzleScore} / ${PUZZLE_QUESTIONS} 片`;
  puzzleQuestion.textContent = state.puzzleQuestion.text;
  puzzleFeedback.textContent = "";
  puzzleFeedback.className = "feedback hidden";
  puzzleResultButton.classList.add("hidden");
  renderPuzzleChoices();
}

function pickPuzzleImage() {
  const images = [
    { name: "小貓", theme: "cat" },
    { name: "恐龍", theme: "dino" },
    { name: "太空船", theme: "rocket" },
    { name: "寶箱", theme: "treasure" },
    { name: "勇者", theme: "hero" },
    { name: "生日蛋糕", theme: "cake" },
  ];
  const image = images[randomInt(0, images.length - 1)];
  return { ...image, url: makePuzzleImageUrl(image.theme) };
}

function makePuzzleImageUrl(theme) {
  const artByTheme = {
    cat: `
      <rect width="300" height="300" fill="#ffe8b3"/>
      <circle cx="150" cy="145" r="72" fill="#f7a35c"/>
      <path d="M92 98 L118 48 L136 104 Z M164 104 L190 48 L208 98 Z" fill="#e96f55"/>
      <circle cx="122" cy="136" r="9" fill="#263238"/>
      <circle cx="178" cy="136" r="9" fill="#263238"/>
      <path d="M145 158 Q150 166 155 158" fill="none" stroke="#263238" stroke-width="6" stroke-linecap="round"/>
      <path d="M98 166 H54 M100 180 H58 M202 166 H246 M200 180 H242" stroke="#263238" stroke-width="5" stroke-linecap="round"/>
      <circle cx="106" cy="162" r="13" fill="#ffd1c8"/>
      <circle cx="194" cy="162" r="13" fill="#ffd1c8"/>
    `,
    dino: `
      <rect width="300" height="300" fill="#d8f3dc"/>
      <ellipse cx="154" cy="172" rx="82" ry="58" fill="#2f8f6f"/>
      <circle cx="212" cy="128" r="42" fill="#2f8f6f"/>
      <path d="M78 164 Q40 142 36 98 Q76 126 106 150" fill="#2f8f6f"/>
      <path d="M96 116 L112 78 L132 116 L150 78 L168 116 L186 78 L204 116" fill="#f7c948"/>
      <circle cx="226" cy="118" r="7" fill="#263238"/>
      <path d="M222 146 Q238 154 252 144" fill="none" stroke="#263238" stroke-width="5" stroke-linecap="round"/>
      <rect x="112" y="212" width="24" height="42" rx="10" fill="#227157"/>
      <rect x="178" y="212" width="24" height="42" rx="10" fill="#227157"/>
    `,
    rocket: `
      <rect width="300" height="300" fill="#dbeafe"/>
      <circle cx="74" cy="70" r="14" fill="#ffffff"/>
      <circle cx="230" cy="54" r="10" fill="#ffffff"/>
      <path d="M150 42 Q204 96 178 184 H122 Q96 96 150 42 Z" fill="#ffffff" stroke="#263238" stroke-width="6"/>
      <circle cx="150" cy="104" r="24" fill="#4c7bd9"/>
      <path d="M122 166 L76 210 L126 204 Z M178 166 L224 210 L174 204 Z" fill="#e96f55"/>
      <path d="M130 206 Q150 270 170 206" fill="#f7c948"/>
      <path d="M140 210 Q150 252 160 210" fill="#e96f55"/>
    `,
    treasure: `
      <rect width="300" height="300" fill="#ffe4d6"/>
      <path d="M70 132 Q70 70 150 70 Q230 70 230 132 Z" fill="#f7c948" stroke="#263238" stroke-width="6"/>
      <rect x="62" y="126" width="176" height="96" rx="10" fill="#e96f55" stroke="#263238" stroke-width="6"/>
      <rect x="138" y="70" width="24" height="152" fill="#fff3c4" stroke="#263238" stroke-width="5"/>
      <rect x="62" y="142" width="176" height="24" fill="#f7c948" stroke="#263238" stroke-width="5"/>
      <circle cx="150" cy="180" r="14" fill="#263238"/>
      <circle cx="88" cy="94" r="8" fill="#ffffff"/>
      <circle cx="208" cy="94" r="8" fill="#ffffff"/>
    `,
    hero: `
      <rect width="300" height="300" fill="#e0f2fe"/>
      <circle cx="150" cy="86" r="38" fill="#ffd1a6" stroke="#263238" stroke-width="6"/>
      <path d="M106 90 Q150 30 194 90 Q170 72 150 76 Q130 72 106 90 Z" fill="#263238"/>
      <path d="M86 238 Q104 132 150 132 Q196 132 214 238 Z" fill="#4c7bd9" stroke="#263238" stroke-width="6"/>
      <path d="M118 154 H182 L166 216 H134 Z" fill="#f7c948" stroke="#263238" stroke-width="5"/>
      <path d="M216 124 L254 86 L268 100 L230 138 Z" fill="#e96f55" stroke="#263238" stroke-width="5"/>
      <path d="M98 124 L58 92" stroke="#263238" stroke-width="10" stroke-linecap="round"/>
      <circle cx="136" cy="88" r="5" fill="#263238"/>
      <circle cx="164" cy="88" r="5" fill="#263238"/>
    `,
    cake: `
      <rect width="300" height="300" fill="#fde2f3"/>
      <rect x="82" y="142" width="136" height="84" rx="14" fill="#ffd1a6" stroke="#263238" stroke-width="6"/>
      <path d="M82 154 Q104 176 126 154 Q148 176 170 154 Q192 176 218 154 V142 H82 Z" fill="#ffffff" stroke="#263238" stroke-width="5"/>
      <rect x="106" y="96" width="12" height="44" rx="6" fill="#4c7bd9"/>
      <rect x="144" y="88" width="12" height="52" rx="6" fill="#2f8f6f"/>
      <rect x="182" y="96" width="12" height="44" rx="6" fill="#e96f55"/>
      <path d="M112 84 Q100 66 116 52 Q132 68 112 84 Z M150 76 Q138 58 154 44 Q170 60 150 76 Z M188 84 Q176 66 192 52 Q208 68 188 84 Z" fill="#f7c948"/>
      <circle cx="118" cy="188" r="7" fill="#e96f55"/>
      <circle cx="150" cy="188" r="7" fill="#4c7bd9"/>
      <circle cx="182" cy="188" r="7" fill="#2f8f6f"/>
    `,
  };
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
      ${artByTheme[theme]}
    </svg>
  `;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function renderPuzzleBoard() {
  const image = state.puzzleImage;
  puzzleBoard.setAttribute("aria-label", `${image.name}拼圖`);
  puzzleBoard.innerHTML = Array.from({ length: PUZZLE_QUESTIONS }, (_, index) => {
    const isUnlocked = state.puzzleUnlockedPieces.includes(index);
    const row = Math.floor(index / 3);
    const column = index % 3;
    const positionX = column * 50;
    const positionY = row * 50;
    return `
      <div
        class="puzzle-piece ${isUnlocked ? "unlocked" : ""}"
        style="--puzzle-image: url('${image.url}'); --piece-position: ${positionX}% ${positionY}%"
      >
        <span>${isUnlocked ? "" : "?"}</span>
      </div>
    `;
  }).join("");
}

function renderPuzzleChoices() {
  puzzleChoices.innerHTML = state.puzzleQuestion.choices.map((choice) => (
    `<button type="button" data-choice="${choice}">${choice}</button>`
  )).join("");
  puzzleChoices.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => checkPuzzleAnswer(Number(button.dataset.choice)));
  });
}

function checkPuzzleAnswer(choice) {
  if (state.puzzleLocked) {
    return;
  }

  state.puzzleLocked = true;
  const isCorrect = choice === state.puzzleQuestion.answer;
  state.reviewRecords.push({
    question: { ...state.puzzleQuestion },
    userAnswer: String(choice),
    userAnswerDisplay: String(choice),
    isCorrect,
  });

  if (isCorrect) {
    const nextPiece = state.puzzleRevealOrder[state.puzzleScore];
    if (nextPiece !== undefined) {
      state.puzzleUnlockedPieces.push(nextPiece);
    }
    state.puzzleScore += 1;
    state.score = state.puzzleScore;
    puzzleFeedback.textContent = "解鎖一片！";
    puzzleFeedback.className = "feedback feedback-card correct";
    playFeedbackSound(true);
  } else {
    puzzleFeedback.textContent = `差一點！答案是 ${state.puzzleQuestion.answer}`;
    puzzleFeedback.className = "feedback feedback-card wrong";
    playFeedbackSound(false);
  }

  puzzleScoreText.textContent = `解鎖 ${state.puzzleScore} / ${PUZZLE_QUESTIONS} 片`;
  updateStars();
  renderPuzzleBoard();
  if (state.puzzleScore === PUZZLE_QUESTIONS) {
    finishPuzzleUnlock();
    return;
  }
  window.setTimeout(nextPuzzleQuestion, isCorrect ? 800 : 1200);
}

function finishPuzzleUnlock() {
  puzzleQuestionCount.textContent = "拼圖完成";
  puzzleScoreText.textContent = `解鎖 ${PUZZLE_QUESTIONS} / ${PUZZLE_QUESTIONS} 片`;
  puzzleQuestion.textContent = `${state.puzzleImage.name}完成！`;
  puzzleChoices.innerHTML = "";
  puzzleFeedback.textContent = "全部拼好了，先看一下完成的圖片。";
  puzzleFeedback.className = "feedback feedback-card correct";
  puzzleResultButton.classList.remove("hidden");
}

function showPuzzleResult() {
  puzzleView.classList.add("hidden");
  resultView.classList.remove("hidden");
  resultScore.textContent = `${state.puzzleScore} / ${PUZZLE_QUESTIONS}`;
  if (state.puzzleScore === PUZZLE_QUESTIONS) {
    resultMessage.textContent = `${state.puzzleImage.name}完整解鎖，全部答對！`;
  } else if (state.puzzleScore >= 6) {
    resultMessage.textContent = `${state.puzzleImage.name}快完成了，再玩一次就能補滿。`;
  } else {
    resultMessage.textContent = "先解開幾片也很棒，下一輪繼續。";
  }
  saveDailyPractice(PUZZLE_QUESTIONS, state.puzzleScore);
  renderDailySummary();
  renderReviewRecords();
}

function startWrongOnlyQuiz() {
  const wrongQuestions = state.reviewRecords
    .filter((record) => !record.isCorrect)
    .map((record) => ({ ...record.question }));

  if (wrongQuestions.length === 0) {
    return;
  }

  clearNextQuestionTimer();
  clearQuizTimer();
  state.questionQueue = wrongQuestions;
  state.totalQuestions = wrongQuestions.length;
  state.timedMode = false;
  state.current = 0;
  state.score = 0;
  state.reviewRecords = [];
  state.awaitingNext = false;
  setupView.classList.add("hidden");
  settingsView.classList.add("hidden");
  monsterView.classList.add("hidden");
  puzzleView.classList.add("hidden");
  reciteView.classList.add("hidden");
  resultView.classList.add("hidden");
  quizView.classList.remove("hidden");
  feedbackText.textContent = "";
  feedbackText.className = "feedback";
  updateTimerDisplay();
  updateStars();
  nextQuestion();
}

function showRecitation(tableNumber) {
  state.multiplyMode = `recite-${tableNumber}`;
  setupView.classList.add("hidden");
  settingsView.classList.add("hidden");
  monsterView.classList.add("hidden");
  puzzleView.classList.add("hidden");
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
  if (!state.timedMode && state.current >= state.totalQuestions) {
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
  questionCount.textContent = state.timedMode
    ? `第 ${state.current} 題`
    : `第 ${state.current} / ${state.totalQuestions} 題`;
  scoreText.textContent = `答對 ${state.score} 題`;
  progressFill.style.width = state.timedMode
    ? `${((getTimeLimitSeconds() - state.secondsLeft) / getTimeLimitSeconds()) * 100}%`
    : `${((state.current - 1) / state.totalQuestions) * 100}%`;
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
  const expectedAnswer = getExpectedAnswer(state.question);
  const isCorrect = writtenAnswer === expectedAnswer;
  state.reviewRecords.push({
    question: { ...state.question },
    userAnswer: writtenAnswer,
    userAnswerDisplay: formatAnswerForDisplay(state.question, writtenAnswer),
    isCorrect,
  });

  if (isCorrect) {
    state.score += 1;
    feedbackText.textContent = "答對了！";
    feedbackText.className = "feedback feedback-card correct";
    submitAnswerButton.disabled = true;
    playFeedbackSound(true);
  } else {
    feedbackText.textContent = `差一點！答案是 ${getAnswerDisplay(state.question)}`;
    feedbackText.className = "feedback feedback-card wrong";
    state.awaitingNext = true;
    submitAnswerButton.textContent = "下一題";
    playFeedbackSound(false);
  }

  updateStars();
  scoreText.textContent = `答對 ${state.score} 題`;
  progressFill.style.width = state.timedMode
    ? `${((getTimeLimitSeconds() - state.secondsLeft) / getTimeLimitSeconds()) * 100}%`
    : `${(state.current / state.totalQuestions) * 100}%`;
  if (isCorrect) {
    nextQuestionTimer = setTimeout(nextQuestion, 1000);
  }
}

function showResult() {
  clearQuizTimer();
  quizView.classList.add("hidden");
  puzzleView.classList.add("hidden");
  resultView.classList.remove("hidden");
  const answeredCount = state.reviewRecords.length;
  const resultTotal = state.timedMode ? answeredCount : state.totalQuestions;
  resultScore.textContent = `${state.score} / ${resultTotal}`;
  progressFill.style.width = "100%";

  if (resultTotal === 0) {
    resultMessage.textContent = "這次還沒作答，準備好再試一次。";
  } else if (state.score === resultTotal) {
    resultMessage.textContent = "全部答對，太厲害了！";
  } else if (state.score / resultTotal >= 0.8) {
    resultMessage.textContent = "很棒，繼續保持！";
  } else if (state.score / resultTotal >= 0.5) {
    resultMessage.textContent = "有進步，再練一輪會更熟。";
  } else {
    resultMessage.textContent = "慢慢來，每次多會一點就很好。";
  }

  saveDailyPractice(resultTotal, state.score);
  renderDailySummary();
  renderReviewRecords();
}

function updateStars() {
  const starTotal = state.practiceMode === "miniGames"
    ? state.miniGameMode === "puzzle" ? PUZZLE_QUESTIONS : TOTAL_QUESTIONS
    : state.timedMode ? Math.max(state.reviewRecords.length, 1) : state.totalQuestions;
  const filled = Math.round((state.score / starTotal) * 5);
  stars.textContent = "★".repeat(filled) + "☆".repeat(5 - filled);
}

function renderReviewRecords() {
  const wrongCount = state.reviewRecords.filter((record) => !record.isCorrect).length;
  document.querySelector("#wrongOnlyButton").classList.toggle("hidden", wrongCount === 0);
  reviewPanel.classList.toggle("hidden", state.reviewRecords.length === 0);
  reviewList.innerHTML = state.reviewRecords.map((record, index) => {
    const status = record.isCorrect ? "答對" : "答錯";
    const answerText = record.isCorrect
      ? `你寫 ${record.userAnswerDisplay}`
      : `你寫 ${record.userAnswerDisplay}，答案是 ${getAnswerDisplay(record.question)}`;
    return `
      <div class="review-row ${record.isCorrect ? "correct" : "wrong"}">
        <span>第 ${index + 1} 題</span>
        <strong>${record.question.text.replace("?", getAnswerDisplay(record.question))}</strong>
        <small>${status}：${answerText}</small>
      </div>
    `;
  }).join("");
}

function makeQuestion(operation, digits, multiplyMode, divideMode) {
  const pickedOperation = operation === "mixed" ? pickOperation() : operation;
  const range = getRange(digits);

  if (pickedOperation === "add") {
    const { a, b } = makeAdditionNumbers(range, state.addDifficulty);
    return { text: `${a} + ${b} = ?`, answer: a + b, operation: "add", a, b };
  }

  if (pickedOperation === "multiply") {
    return makeMultiplyQuestion(multiplyMode);
  }

  if (pickedOperation === "divide") {
    return makeDivideQuestion(divideMode);
  }

  const { a, b } = makeSubtractionNumbers(range, state.subtractDifficulty);
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

function makeAdditionNumbers(range, difficulty) {
  return makeNumbersByRule(
    range,
    (a, b) => {
      if (difficulty === "noCarry") {
        return !hasCarry(a, b);
      }
      if (difficulty === "carry") {
        return hasCarry(a, b);
      }
      return true;
    },
    () => ({ a: randomInt(range.min, range.max), b: randomInt(range.min, range.max) }),
  );
}

function makeSubtractionNumbers(range, difficulty) {
  return makeNumbersByRule(
    range,
    (a, b) => {
      if (difficulty === "noBorrow") {
        return !hasBorrow(a, b);
      }
      if (difficulty === "borrow") {
        return hasBorrow(a, b);
      }
      return true;
    },
    () => {
      const first = randomInt(range.min, range.max);
      const second = randomInt(range.min, range.max);
      return { a: Math.max(first, second), b: Math.min(first, second) };
    },
  );
}

function makeNumbersByRule(range, isMatch, makeCandidate) {
  for (let attempt = 0; attempt < 300; attempt += 1) {
    const candidate = makeCandidate();
    if (isMatch(candidate.a, candidate.b)) {
      return candidate;
    }
  }

  return makeCandidate();
}

function hasCarry(a, b) {
  const columns = Math.max(String(a).length, String(b).length);
  const aDigits = padDigits(String(a), columns);
  const bDigits = padDigits(String(b), columns);
  return aDigits.some((digit, index) => Number(digit || 0) + Number(bDigits[index] || 0) >= 10);
}

function hasBorrow(a, b) {
  const columns = Math.max(String(a).length, String(b).length);
  const aDigits = padDigits(String(a), columns);
  const bDigits = padDigits(String(b), columns);
  return aDigits.some((digit, index) => Number(digit || 0) < Number(bDigits[index] || 0));
}

function getSelectedOperation(practiceMode) {
  if (practiceMode === "add") {
    return "add";
  }

  if (practiceMode === "subtract") {
    return "subtract";
  }

  if (practiceMode === "multiply") {
    return "multiply";
  }

  if (practiceMode === "divide") {
    return "divide";
  }

  return "add";
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

function playFeedbackSound(isCorrect) {
  if (!state.soundEnabled) {
    return;
  }

  audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
  const now = audioContext.currentTime;
  const notes = isCorrect ? [523.25, 659.25, 783.99] : [220, 185];
  notes.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, now + index * 0.08);
    gain.gain.setValueAtTime(0.0001, now + index * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.12, now + index * 0.08 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.12);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now + index * 0.08);
    oscillator.stop(now + index * 0.08 + 0.14);
  });
}

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDailyPractice() {
  try {
    const rawData = localStorage.getItem("mathPracticeDaily");
    const data = rawData ? JSON.parse(rawData) : null;
    if (data?.date === getTodayKey()) {
      return data;
    }
  } catch {
    // Ignore damaged localStorage data and start fresh for today.
  }

  return { date: getTodayKey(), sessions: 0, questions: 0, correct: 0 };
}

function saveDailyPractice(questions, correct) {
  if (questions === 0) {
    return;
  }

  const data = getDailyPractice();
  data.sessions += 1;
  data.questions += questions;
  data.correct += correct;
  try {
    localStorage.setItem("mathPracticeDaily", JSON.stringify(data));
  } catch {
    // The app still works if the browser blocks localStorage.
  }
}

function renderDailySummary() {
  const data = getDailyPractice();
  if (data.questions === 0) {
    dailySummary.innerHTML = `
      <div class="daily-empty">
        <strong>今天還沒完成練習</strong>
        <span>完成一回合後，這裡會記錄題數和答對率。</span>
      </div>
    `;
    return;
  }

  const accuracy = Math.round((data.correct / data.questions) * 100);
  dailySummary.innerHTML = `
    <div class="daily-stats">
      <div>
        <strong>${data.sessions}</strong>
        <span>完成次數</span>
      </div>
      <div>
        <strong>${data.questions}</strong>
        <span>練習題數</span>
      </div>
      <div>
        <strong>${accuracy}%</strong>
        <span>答對率</span>
      </div>
    </div>
  `;
}

function clearNextQuestionTimer() {
  if (nextQuestionTimer) {
    clearTimeout(nextQuestionTimer);
    nextQuestionTimer = null;
  }
}

function startQuizTimer() {
  clearQuizTimer();
  const totalSeconds = getTimeLimitSeconds();
  quizTimer = setInterval(() => {
    state.secondsLeft = Math.max(0, state.secondsLeft - 1);
    updateTimerDisplay();
    progressFill.style.width = `${((totalSeconds - state.secondsLeft) / totalSeconds) * 100}%`;
    if (state.secondsLeft === 0) {
      clearNextQuestionTimer();
      showResult();
    }
  }, 1000);
}

function clearQuizTimer() {
  if (quizTimer) {
    clearInterval(quizTimer);
    quizTimer = null;
  }
}

function updateTimerDisplay() {
  timerText.classList.toggle("hidden", !state.timedMode);
  timerText.textContent = `剩 ${state.secondsLeft} 秒`;
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

function getExpectedAnswer(question) {
  return String(question.answer);
}

function getAnswerDisplay(question) {
  return String(question.answer);
}

function formatAnswerForDisplay(question, answer) {
  return answer;
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
