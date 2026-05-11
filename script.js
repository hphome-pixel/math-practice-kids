const TOTAL_QUESTIONS = 10;
const PUZZLE_QUESTIONS = 9;
const CHEST_COST = 10;
const PERFECT_BONUS_GOLD = 3;

const setupView = document.querySelector("#setupView");
const settingsView = document.querySelector("#settingsView");
const characterView = document.querySelector("#characterView");
const quizView = document.querySelector("#quizView");
const monsterView = document.querySelector("#monsterView");
const puzzleView = document.querySelector("#puzzleView");
const reciteView = document.querySelector("#reciteView");
const resultView = document.querySelector("#resultView");
const coinText = document.querySelector("#coinText");
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
const bottomStartButton = document.querySelector("#bottomStartButton");
const lobbyStartButton = document.querySelector("#lobbyStartButton");
const lobbyChestButton = document.querySelector("#lobbyChestButton");
const lobbyCharacterButton = document.querySelector("#lobbyCharacterButton");
const lobbyCharacterCard = document.querySelector("#lobbyCharacterCard");
const lobbyCharacterMedia = document.querySelector("#lobbyCharacterMedia");
const lobbyCharacterImage = document.querySelector("#lobbyCharacterImage");
const lobbyCharacterName = document.querySelector("#lobbyCharacterName");
const lobbyCharacterRarity = document.querySelector("#lobbyCharacterRarity");
const lobbyLevelText = document.querySelector("#lobbyLevelText");
const lobbyXpText = document.querySelector("#lobbyXpText");
const lobbyStreakText = document.querySelector("#lobbyStreakText");
const practiceSummaryText = document.querySelector("#practiceSummaryText");
const settingsButton = document.querySelector("#settingsButton");
const characterButton = document.querySelector("#characterButton");
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
const languageSelect = document.querySelector("#languageSelect");
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
const characterChoice = document.querySelector("#characterChoice");
const characterDashboard = document.querySelector("#characterDashboard");
const avatarStage = document.querySelector("#avatarStage");
const characterCoinText = document.querySelector("#characterCoinText");
const levelText = document.querySelector("#levelText");
const xpText = document.querySelector("#xpText");
const streakText = document.querySelector("#streakText");
const chestMessage = document.querySelector("#chestMessage");
const openChestButton = document.querySelector("#openChestButton");
const rewardChestOverlay = document.querySelector("#rewardChestOverlay");
const rewardChestButton = document.querySelector("#rewardChestButton");
const rewardChestImage = document.querySelector("#rewardChestImage");
const rewardChestHint = document.querySelector("#rewardChestHint");
const rewardChestResult = document.querySelector("#rewardChestResult");
const rewardChestCloseButton = document.querySelector("#rewardChestCloseButton");
const claimChestButton = document.querySelector("#claimChestButton");
const changeCharacterButton = document.querySelector("#changeCharacterButton");
const inventoryGrid = document.querySelector("#inventoryGrid");
const itemGrid = document.querySelector("#itemGrid");
const characterHint = document.querySelector("#characterHint");
const gmAddCoinsButton = document.querySelector("#gmAddCoinsButton");
const gmLevelUpButton = document.querySelector("#gmLevelUpButton");
const gmUnlockAllButton = document.querySelector("#gmUnlockAllButton");
const gmOpenChestButton = document.querySelector("#gmOpenChestButton");
const gmCycleMonsterButton = document.querySelector("#gmCycleMonsterButton");
const gmResetCharacterButton = document.querySelector("#gmResetCharacterButton");
let nextQuestionTimer = null;
let quizTimer = null;
let digitTemplates = null;
let audioContext = null;
let pendingRoundChest = false;
let pendingChestCost = 0;
let chestAnimationTimers = [];

const CHEST_IMAGE_STAGES = [
  "assets/ui/chest/chest_1_display.png",
  "assets/ui/chest/chest_1_display.png",
  "assets/ui/chest/chest_1_display.png",
  "assets/ui/chest/chest_4_display.png",
];
CHEST_IMAGE_STAGES.forEach((src) => {
  const image = new Image();
  image.src = src;
});

const translations = {
  en: {
    "開始背誦": "Start Review",
    "開始解鎖": "Start Unlock",
    "開始遊戲": "Start Game",
    "打中了！": "Hit!",
    "怪物被打倒了，全部答對！": "The monster is defeated. Perfect!",
    "打得很好，怪物快撐不住了！": "Great hits. The monster is almost down!",
    "再練一輪，下一次打得更準。": "Try another round and aim even better.",
    "解鎖一片！": "One piece unlocked!",
    "拼圖完成": "Puzzle Complete",
    "全部拼好了，先看一下完成的圖片。": "All pieces are complete. Take a moment to enjoy the picture.",
    "先解開幾片也很棒，下一輪繼續。": "Unlocking a few pieces is still progress. Keep going next round.",
    "數學練習": "Math Practice",
    "金幣數學島": "Coin Math Island",
    "練習設定": "Practice Settings",
    "點我調整題目": "Tap to adjust questions",
    "可領取": "Claim",
    "角色": "Character",
    "我的角色": "My Character",
    "選擇一位陪你一起練習的夥伴": "Choose a buddy to practice with you",
    "小男孩": "Boy",
    "小女孩": "Girl",
    "寶箱 10G": "Chest 10G",
    "換角色": "Change Character",
    "完成 10 題可獲得金幣與 XP。": "Complete 10 questions to earn coins and XP.",
    "GM 測試": "GM Test",
    "裝飾品": "Accessories",
    "角色收藏": "Character Collection",
    "目前角色": "Current Character",
    "收集裝備，裝備後解鎖對應造型。": "Collect gear and equip it to unlock matching skins.",
    "裝備物品會切換造型，角色收藏只作為圖鑑。": "Equip items to change skins. Character collection is a gallery.",
    "裝備中": "Equipped",
    "可裝備": "Equip",
    "未獲得": "Locked",
    "需要 10G 才能抽寶箱。": "You need 10G to open a chest.",
    "需要 10 金幣才能抽寶箱。": "You need 10 coins to open a chest.",
    "所有裝飾品都收集完成了！": "All accessories have been collected!",
    "解鎖全部": "Unlock All",
    "測試寶箱": "Test Chest",
    "重置角色": "Reset Character",
    "已記錄裝備，正式 PNG 素材製作中。": "Equipped in inventory. Official PNG art is in progress.",
    "沒有可抽的新裝備了！": "No new equipment is available!",
    "獲得獎勵": "Reward earned",
    "等級": "Level",
    "連勝": "Streak",
    "開寶箱 10 金幣": "Open Chest 10 Coins",
    "回合獎勵": "Round Reward",
    "獲得寶箱！": "Chest earned!",
    "點擊寶箱開啟": "Tap the chest to open",
    "領取寶箱": "Claim Chest",
    "寶箱打開中...": "Opening chest...",
    "Combo": "Combo",
    "連續答對": "Combo",
    "不想斷": "Keep it going",
    "做題賺金幣與 XP，開寶箱收集裝備。": "Answer questions to earn coins and XP, then open chests to collect gear.",
    "開寶箱收集裝備，裝備後切換造型。": "Open chests to collect gear, then equip it to change skins.",
    "普通角色": "Common Characters",
    "稀有角色": "Rare Characters",
    "史詩角色": "Epic Characters",
    "傳說角色": "Legendary Characters",
    "寶箱可獲得": "Chest reward",
    "物品可解鎖": "Item unlock",
    "需要物品": "Needs item",
    "物品": "Items",
    "已擁有": "Owned",
    "裝備": "Equip",
    "已裝備": "Equipped",
    "解鎖角色": "Unlocks character",
    "物品寶箱可獲得": "Chest item",
    "勇者之劍": "Hero Sword",
    "睡衣": "Pajamas",
    "運動鞋": "Sport Shoes",
    "抽到新物品": "New item",
    "已解鎖造型": "Skin unlocked",
    "完美獎勵": "Perfect Bonus",
    "普通": "Common",
    "稀有": "Rare",
    "史詩": "Epic",
    "傳說": "Legendary",
    "設定": "Settings",
    "選擇練習": "Choose Practice",
    "加法練習": "Addition Practice",
    "直式加法、進位練習": "Column addition and carrying",
    "減法練習": "Subtraction Practice",
    "直式減法、借位練習": "Column subtraction and borrowing",
    "乘法練習": "Multiplication Practice",
    "1 到 9 乘法表、十位乘法": "1 to 9 times tables and tens",
    "除法練習": "Division Practice",
    "除以 1 到 9、十位除法": "Divide by 1 to 9 and tens",
    "小遊戲": "Mini Games",
    "打怪練習、拼圖解鎖": "Monster practice and puzzle unlock",
    "選擇小遊戲": "Choose Mini Game",
    "打怪練習": "Monster Practice",
    "先選題型，答對攻擊": "Choose a question type, then attack",
    "拼圖解鎖": "Puzzle Unlock",
    "答對一題，解鎖一片圖片": "Unlock one piece for each correct answer",
    "選擇題目": "Choose Questions",
    "加法": "Addition",
    "減法": "Subtraction",
    "乘法": "Multiplication",
    "混合": "Mixed",
    "選擇位數": "Choose Digits",
    "個位": "Ones",
    "十位": "Tens",
    "百位": "Hundreds",
    "千位": "Thousands",
    "難度設定": "Difficulty",
    "不限": "Any",
    "不進位": "No carrying",
    "有進位": "With carrying",
    "不借位": "No borrowing",
    "有借位": "With borrowing",
    "乘法測驗": "Multiplication Quiz",
    "十位乘法": "Tens multiplication",
    "百位乘法": "Hundreds multiplication",
    "乘法表背誦": "Times Table Review",
    "1 表": "1 table",
    "2 表": "2 table",
    "3 表": "3 table",
    "4 表": "4 table",
    "5 表": "5 table",
    "6 表": "6 table",
    "7 表": "7 table",
    "8 表": "8 table",
    "9 表": "9 table",
    "除法設定": "Division Settings",
    "除以 1": "Divide by 1",
    "除以 2": "Divide by 2",
    "除以 3": "Divide by 3",
    "除以 4": "Divide by 4",
    "除以 5": "Divide by 5",
    "除以 6": "Divide by 6",
    "除以 7": "Divide by 7",
    "除以 8": "Divide by 8",
    "除以 9": "Divide by 9",
    "十位除法": "Tens division",
    "練習選項": "Practice Options",
    "限時模式": "Timed Mode",
    "秒內一直答題": "seconds, keep answering",
    "今日練習": "Today's Practice",
    "今天還沒完成練習": "No practice completed today",
    "開始 10 題": "Start 10 Questions",
    "回主選單": "Back to Menu",
    "鼓勵音效": "Encouragement Sounds",
    "答對答錯都有提示音，可以隨時關閉": "Play sounds for correct and wrong answers. You can turn this off anytime.",
    "語言": "Language",
    "版本": "Version",
    "停止練習": "Stop Practice",
    "答對 0 題": "0 Correct",
    "剩 60 秒": "60 seconds left",
    "清除手寫": "Clear Writing",
    "確認": "Check",
    "停止遊戲": "Stop Game",
    "打中 0 次": "0 Hits",
    "解鎖 0 / 9 片": "Unlocked 0 / 9 pieces",
    "看成績": "See Score",
    "切換乘法表": "Switch times table",
    "遮住答案": "Hide Answers",
    "顯示答案": "Show Answers",
    "先在答案格寫答案喔": "Write the answer in the boxes first.",
    "答對了！": "Correct!",
    "下一題": "Next Question",
    "這次還沒作答，準備好再試一次。": "No answers yet. Try again when you are ready.",
    "全部答對，太厲害了！": "Perfect score. Amazing!",
    "有進步，再練一輪會更熟。": "Nice progress. Another round will make it smoother.",
    "慢慢來，每次多會一點就很好。": "Take your time. Learning a little more each time is great.",
    "答對": "Correct",
    "答錯": "Wrong",
    "完成一回合後，這裡會記錄題數和答對率。": "After one round, this area will track questions and accuracy.",
    "完成次數": "Rounds",
    "練習題數": "Questions",
    "答對率": "Accuracy",
    "上一表": "Previous Table",
    "下一表": "Next Table",
    "1 的乘法表": "1 Times Table",
    "練習完成": "Practice Complete",
    "很棒，繼續保持！": "Great work. Keep going!",
    "答題紀錄": "Answer Review",
    "只練錯題": "Practice Missed Only",
    "再練一次": "Practice Again",
    "重新選擇": "Choose Again",
    "關於": "About",
    "隱私權政策": "Privacy Policy",
    "聯絡我們": "Contact",
  },
};

const textNodes = [];

const RARITY_LABELS = {
  common: "普通",
  rare: "稀有",
  epic: "史詩",
  legendary: "傳說",
};

const BASE_LEVEL_XP = 100;
const LEVEL_XP_STEP = 30;

const accessoryCatalog = [
  { id: "cap-sun", slot: "hat", name: "陽光帽", enName: "Sunny Cap", icon: "帽", className: "sun-cap" },
  {
    id: "hat-crown",
    slot: "hat",
    name: "小皇冠",
    enName: "Tiny Crown",
    icon: "冠",
    className: "tiny-crown",
    rarity: "legendary",
    prototypeAssets: {
      boy: "assets/accessories/boy/hat-crown.png",
      girl: "assets/accessories/girl/hat-crown.png",
    },
    layeredAssets: {
      boy: "assets/accessories/layered/boy/front/hat-crown.png",
      girl: "assets/accessories/layered/girl/front/hat-crown.png",
    },
  },
  { id: "hat-wizard", slot: "hat", name: "星星魔法帽", enName: "Star Wizard Hat", icon: "巫", className: "wizard-hat" },
  { id: "hat-dino", slot: "hat", name: "恐龍帽", enName: "Dino Hood", icon: "龍", className: "dino-hood" },
  { id: "hat-beret", slot: "hat", name: "畫家帽", enName: "Painter Beret", icon: "貝", className: "beret" },
  { id: "hair-ribbon", slot: "hair", name: "粉色髮帶", enName: "Pink Headband", icon: "髮", className: "pink-headband" },
  {
    id: "hair-star",
    slot: "hair",
    name: "星星髮夾",
    enName: "Star Clip",
    icon: "星",
    className: "star-clip",
    rarity: "rare",
    prototypeAssets: {
      boy: "assets/accessories/boy/hair-star.png",
      girl: "assets/accessories/girl/hair-star.png",
    },
    layeredAssets: {
      boy: "assets/accessories/layered/boy/front/hair-star.png",
      girl: "assets/accessories/layered/girl/front/hair-star.png",
    },
  },
  { id: "hair-flower", slot: "hair", name: "小花髮飾", enName: "Flower Clip", icon: "花", className: "flower-clip" },
  { id: "hair-blue-bow", slot: "hair", name: "藍色蝴蝶結", enName: "Blue Bow", icon: "結", className: "blue-bow" },
  { id: "hair-laurel", slot: "hair", name: "月桂髮飾", enName: "Laurel Pin", icon: "葉", className: "laurel-pin" },
  {
    id: "top-mint",
    slot: "top",
    name: "薄荷上衣",
    enName: "Mint Top",
    icon: "衣",
    className: "mint-top",
    rarity: "rare",
    prototypeAssets: {
      boy: "assets/accessories/boy/top-mint.png",
      girl: "assets/accessories/girl/top-mint.png",
    },
    layeredAssets: {
      boy: "assets/accessories/layered/boy/clothes/top-mint.png",
      girl: "assets/accessories/layered/girl/clothes/top-mint.png",
    },
  },
  { id: "top-yellow", slot: "top", name: "黃色帽T", enName: "Yellow Hoodie", icon: "T", className: "yellow-top" },
  { id: "top-red", slot: "top", name: "紅色外套", enName: "Red Jacket", icon: "外", className: "red-top" },
  { id: "top-purple", slot: "top", name: "紫色上衣", enName: "Purple Top", icon: "紫", className: "purple-top" },
  { id: "top-sailor", slot: "top", name: "水手上衣", enName: "Sailor Top", icon: "海", className: "sailor-top" },
  { id: "bottom-navy", slot: "bottom", name: "深藍短褲", enName: "Navy Shorts", icon: "褲", className: "navy-bottom" },
  { id: "bottom-pink", slot: "bottom", name: "粉色短裙", enName: "Pink Skirt", icon: "裙", className: "pink-bottom" },
  { id: "bottom-green", slot: "bottom", name: "綠色短褲", enName: "Green Shorts", icon: "綠", className: "green-bottom" },
  { id: "bottom-orange", slot: "bottom", name: "橘色短褲", enName: "Orange Shorts", icon: "橘", className: "orange-bottom" },
  {
    id: "bottom-denim",
    slot: "bottom",
    name: "牛仔短褲",
    enName: "Denim Shorts",
    icon: "牛",
    className: "denim-bottom",
    rarity: "common",
    prototypeAssets: {
      boy: "assets/accessories/boy/bottom-denim.png",
      girl: "assets/accessories/girl/bottom-denim.png",
    },
    layeredAssets: {
      boy: "assets/accessories/layered/boy/clothes/bottom-denim.png",
      girl: "assets/accessories/layered/girl/clothes/bottom-denim.png",
    },
  },
  { id: "shoes-blue", slot: "shoes", name: "藍色球鞋", enName: "Blue Sneakers", icon: "鞋", className: "blue-shoes" },
  { id: "shoes-pink", slot: "shoes", name: "粉色球鞋", enName: "Pink Sneakers", icon: "粉", className: "pink-shoes" },
  {
    id: "shoes-yellow",
    slot: "shoes",
    name: "黃色球鞋",
    enName: "Yellow Sneakers",
    icon: "黃",
    className: "yellow-shoes",
    rarity: "rare",
    prototypeAssets: {
      boy: "assets/accessories/boy/shoes-yellow.png",
      girl: "assets/accessories/girl/shoes-yellow.png",
    },
    layeredAssets: {
      boy: "assets/accessories/layered/boy/clothes/shoes-yellow.png",
      girl: "assets/accessories/layered/girl/clothes/shoes-yellow.png",
    },
  },
  { id: "shoes-red", slot: "shoes", name: "紅色靴子", enName: "Red Boots", icon: "靴", className: "red-shoes" },
  { id: "shoes-mint", slot: "shoes", name: "薄荷鞋", enName: "Mint Shoes", icon: "薄", className: "mint-shoes" },
  {
    id: "hand-wand",
    slot: "hand",
    name: "星星棒",
    enName: "Star Wand",
    icon: "棒",
    className: "star-wand",
    rarity: "legendary",
    prototypeAssets: {
      boy: "assets/accessories/boy/hand-wand.png",
      girl: "assets/accessories/girl/hand-wand.png",
    },
    layeredAssets: {
      boy: "assets/accessories/layered/boy/front/hand-wand.png",
      girl: "assets/accessories/layered/girl/front/hand-wand.png",
    },
  },
  { id: "hand-book", slot: "hand", name: "數學書", enName: "Math Book", icon: "書", className: "math-book" },
  { id: "hand-shield", slot: "hand", name: "勇氣盾牌", enName: "Courage Shield", icon: "盾", className: "shield" },
  { id: "hand-balloon", slot: "hand", name: "愛心氣球", enName: "Heart Balloon", icon: "氣", className: "balloon" },
  { id: "hand-pencil", slot: "hand", name: "鉛筆棒", enName: "Pencil Wand", icon: "筆", className: "pencil" },
];

const accessorySlots = [
  { id: "hat", name: "帽子", enName: "Hats" },
  { id: "hair", name: "髮飾", enName: "Hair" },
  { id: "top", name: "上衣", enName: "Tops" },
  { id: "bottom", name: "下衣", enName: "Bottoms" },
  { id: "shoes", name: "鞋子", enName: "Shoes" },
  { id: "hand", name: "手持物", enName: "Hand Items" },
];

const characterLayerAssets = {
  boy: {
    base: "assets/characters/boy-base.png",
    bodyBack: "assets/characters/layers/boy/body-back.png",
    bodyFront: "assets/characters/layers/boy/body-front.png",
    hairFront: "assets/characters/layers/boy/head-hair-front.png",
  },
  girl: {
    base: "assets/characters/girl-base.png",
    bodyBack: "assets/characters/layers/girl/body-back.png",
    bodyFront: "assets/characters/layers/girl/body-front.png",
    hairFront: "assets/characters/layers/girl/head-hair-front.png",
  },
};

const characterCatalog = [
  { id: "boy", name: "元氣男孩", enName: "Bright Boy", rarity: "common", image: "assets/characters/boy_basic_display.png", owned: true },
  { id: "boy_pajama", name: "睡衣男孩", enName: "Pajama Boy", rarity: "common", image: "assets/characters/Common/boy_pajama.mp4", mediaType: "video", unlockType: "item", requiredItem: "pajama" },
  { id: "boy_sport", name: "運動男孩", enName: "Sport Boy", rarity: "common", image: "assets/characters/Common/boy_sport.mp4", mediaType: "video", unlockType: "item", requiredItem: "sport_shoes" },
  { id: "cat_boy", name: "貓咪男孩", enName: "Cat Boy", rarity: "common", image: "assets/characters/Common/cat_boy.mp4", mediaType: "video", unlockType: "item", requiredItem: "cat" },
  { id: "porm_boy", name: "舞會男孩", enName: "Prom Boy", rarity: "rare", image: "assets/characters/Rare/prom_boy.mp4", mediaType: "video", unlockType: "item", requiredItem: "porm_mask" },
  { id: "hero_boy", name: "勇者男孩", enName: "Hero Boy", rarity: "epic", image: "assets/characters/Epic/hero_boy.mp4", mediaType: "video", unlockType: "item", requiredItem: "hero_sword" },
  { id: "wand_boy", name: "魔杖男孩", enName: "Wand Boy", rarity: "epic", image: "assets/characters/Epic/wand_boy.mp4", mediaType: "video", unlockType: "item", requiredItem: "magic_wand" },
  { id: "angel_wings_boy", name: "天使男孩", enName: "Angel Boy", rarity: "legendary", image: "assets/characters/Legendary/angel_wings_boy.mp4", mediaType: "video", unlockType: "item", requiredItem: "angel_wings" },
  { id: "demon_hunter_core_badge_boy", name: "獵魔男孩", enName: "Demon Hunter Boy", rarity: "legendary", image: "assets/characters/Legendary/demon_hunter_core_badge_boy.mp4", mediaType: "video", unlockType: "item", requiredItem: "demon_hunter_core_badge" },
  { id: "girl", name: "元氣女孩", enName: "Bright Girl", rarity: "common", image: "assets/characters/girl_basic_display.png", owned: true },
  { id: "girl_pajama", name: "睡衣女孩", enName: "Pajama Girl", rarity: "common", image: "assets/characters/Common/girl_pajama.mp4", mediaType: "video", unlockType: "item", requiredItem: "pajama" },
  { id: "girl_sport", name: "運動女孩", enName: "Sport Girl", rarity: "common", image: "assets/characters/Common/girl_sport.mp4", mediaType: "video", unlockType: "item", requiredItem: "sport_shoes" },
  { id: "cat_girl", name: "貓咪女孩", enName: "Cat Girl", rarity: "common", image: "assets/characters/Common/cat_girl.mp4", mediaType: "video", unlockType: "item", requiredItem: "cat" },
  { id: "porm_girl", name: "舞會女孩", enName: "Prom Girl", rarity: "rare", image: "assets/characters/Rare/porm_girl.mp4", mediaType: "video", unlockType: "item", requiredItem: "porm_mask" },
  { id: "hero_girl", name: "勇者女孩", enName: "Hero Girl", rarity: "epic", image: "assets/characters/Epic/hero_girl.mp4", mediaType: "video", unlockType: "item", requiredItem: "hero_sword" },
  { id: "wand_girl", name: "魔杖女孩", enName: "Wand Girl", rarity: "epic", image: "assets/characters/Epic/wand_girl.mp4", mediaType: "video", unlockType: "item", requiredItem: "magic_wand" },
  { id: "angel_wings_girl", name: "天使女孩", enName: "Angel Girl", rarity: "legendary", image: "assets/characters/Legendary/angel_wings_girl.mp4", mediaType: "video", unlockType: "item", requiredItem: "angel_wings" },
  { id: "demon_hunter_core_badge_girl", name: "獵魔女孩", enName: "Demon Hunter Girl", rarity: "legendary", image: "assets/characters/Legendary/demon_hunter_core_badge_girl.mp4", mediaType: "video", unlockType: "item", requiredItem: "demon_hunter_core_badge" },
  { id: "level_5_explorer", name: "見習探險家", enName: "Junior Explorer", rarity: "rare", unlockType: "level", requiredLevel: 5, token: "Lv" },
  { id: "level_10_captain", name: "金幣隊長", enName: "Coin Captain", rarity: "epic", unlockType: "level", requiredLevel: 10, token: "10" },
  { id: "level_20_scholar", name: "星光學者", enName: "Star Scholar", rarity: "legendary", unlockType: "level", requiredLevel: 20, token: "星" },
  { id: "add_mage", name: "加法小法師", enName: "Addition Mage", rarity: "rare", unlockType: "achievement", statKey: "addCorrect", requiredCorrect: 100, token: "+" },
  { id: "subtract_ninja", name: "減法忍者", enName: "Subtraction Ninja", rarity: "rare", unlockType: "achievement", statKey: "subtractCorrect", requiredCorrect: 100, token: "−" },
  { id: "multiply_captain", name: "乘法隊長", enName: "Multiply Captain", rarity: "epic", unlockType: "achievement", statKey: "multiplyCorrect", requiredCorrect: 100, token: "×" },
  { id: "divide_doctor", name: "除法博士", enName: "Division Doctor", rarity: "epic", unlockType: "achievement", statKey: "divideCorrect", requiredCorrect: 100, token: "÷" },
];

const itemCatalog = [
  {
    id: "sport_shoes",
    name: "運動鞋",
    enName: "Sport Shoes",
    rarity: "common",
    icon: "鞋",
    iconImage: "assets/characters/Inventory/Common/sport.png",
    unlocksCharacter: {
      boy: "boy_sport",
      girl: "girl_sport",
    },
  },
  {
    id: "hero_sword",
    name: "勇者之劍",
    enName: "Hero Sword",
    rarity: "epic",
    icon: "劍",
    iconImage: "assets/characters/Inventory/Epic/sword.png",
    unlocksCharacter: {
      boy: "hero_boy",
      girl: "hero_girl",
    },
  },
  {
    id: "pajama",
    name: "睡衣",
    enName: "Pajamas",
    rarity: "common",
    icon: "衣",
    iconImage: "assets/characters/Inventory/Common/pajama.png",
    unlocksCharacter: {
      boy: "boy_pajama",
      girl: "girl_pajama",
    },
  },
  {
    id: "cat",
    name: "貓咪",
    enName: "Cat",
    rarity: "common",
    icon: "貓",
    iconImage: "assets/characters/Inventory/Common/cat.png",
    unlocksCharacter: {
      boy: "cat_boy",
      girl: "cat_girl",
    },
  },
  {
    id: "porm_mask",
    name: "舞會面具",
    enName: "Prom Mask",
    rarity: "rare",
    icon: "面",
    iconImage: "assets/characters/Inventory/Rare/Prom_mask.png",
    unlocksCharacter: {
      boy: "porm_boy",
      girl: "porm_girl",
    },
  },
  {
    id: "magic_wand",
    name: "魔法棒",
    enName: "Magic Wand",
    rarity: "epic",
    icon: "杖",
    iconImage: "assets/characters/Inventory/Epic/wand.png",
    unlocksCharacter: {
      boy: "wand_boy",
      girl: "wand_girl",
    },
  },
  {
    id: "angel_wings",
    name: "天使翅膀",
    enName: "Angel Wings",
    rarity: "legendary",
    icon: "翼",
    iconImage: "assets/characters/Inventory/Legendary/angel_wings.png",
    unlocksCharacter: {
      boy: "angel_wings_boy",
      girl: "angel_wings_girl",
    },
  },
  {
    id: "demon_hunter_core_badge",
    name: "獵魔徽章",
    enName: "Demon Hunter Badge",
    rarity: "legendary",
    icon: "徽",
    iconImage: "assets/characters/Inventory/Legendary/demon_hunter_core_badge.png",
    unlocksCharacter: {
      boy: "demon_hunter_core_badge_boy",
      girl: "demon_hunter_core_badge_girl",
    },
  },
];

const monsterTypes = [
  { id: "slime", name: "史萊姆", image: "assets/games/mosters/slime.png" },
  { id: "fire_dragon", name: "火焰龍", image: "assets/games/mosters/fire_dragon.png" },
  { id: "vampire", name: "吸血鬼" },
  { id: "werewolf", name: "狼人" },
  { id: "zombie", name: "殭屍" },
];

const puzzleAssets = [
  {
    id: "ballroom_dance",
    name: "舞會女孩",
    enName: "Ballroom Dance",
    url: "assets/games/puzzles/ballroom_dance.png",
  },
  {
    id: "anime_sporty",
    name: "運動少女",
    enName: "Anime Sporty",
    url: "assets/games/puzzles/anime_sporty.png",
  },
  {
    id: "magic",
    name: "魔法少女",
    enName: "Magic",
    url: "assets/games/puzzles/magic.png",
  },
];

const gameState = {
  gold: 0,
  gems: 0,
  inventory: [],
  unlockedCharacters: [],
  equipped: {
    hat: null,
    hair: null,
    top: null,
    bottom: null,
    shoes: null,
    hand: null,
  },
  streak: 0,
  combo: 0,
  level: 1,
  xp: 0,
  stats: {
    addCorrect: 0,
    subtractCorrect: 0,
    multiplyCorrect: 0,
    divideCorrect: 0,
  },
  claimedRewards: [],
  ownedItems: [],
  equippedItem: null,
  gachaPity: {
    sinceEpic: 0,
    sinceLegendary: 0,
  },
};

const state = {
  practiceMode: "add",
  operation: "add",
  digits: 1,
  multiplyMode: "table-1",
  divideMode: "divide-1",
  miniGameMode: "monster",
  miniGameOperation: "add",
  language: getStoredLanguage(),
  character: null,
  coins: 0,
  ownedAccessories: [],
  equippedAccessories: {},
  currentCombo: 0,
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
  monsterTypeIndex: 0,
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
bottomStartButton.addEventListener("click", startQuiz);
lobbyStartButton.addEventListener("click", startQuiz);
lobbyChestButton.addEventListener("click", openChest);
lobbyCharacterButton.addEventListener("click", showCharacter);
document.querySelector("#stopButton").addEventListener("click", stopQuiz);
document.querySelector("#againButton").addEventListener("click", startQuiz);
document.querySelector("#changeButton").addEventListener("click", showSetup);
document.querySelector("#wrongOnlyButton").addEventListener("click", startWrongOnlyQuiz);
claimChestButton.addEventListener("click", claimResultChest);
settingsButton.addEventListener("click", showSettings);
characterButton?.addEventListener("click", showCharacter);
document.querySelector("#settingsBackButton").addEventListener("click", showSetup);
document.querySelector("#characterBackButton").addEventListener("click", showSetup);
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
  input.addEventListener("change", updateSetupMode);
});
document.querySelectorAll("input[name='digits']").forEach((input) => {
  input.addEventListener("change", updatePracticeSummary);
});
document.querySelectorAll("input[name='addDifficulty'], input[name='subtractDifficulty'], input[name='divideMode']").forEach((input) => {
  input.addEventListener("change", updatePracticeSummary);
});
document.querySelectorAll("[data-character]").forEach((button) => {
  button.addEventListener("click", () => chooseCharacter(button.dataset.character));
});
lobbyCharacterCard.addEventListener("click", () => playActiveCharacterAnimation(lobbyCharacterCard));
openChestButton.addEventListener("click", openChest);
rewardChestButton.addEventListener("click", openRewardChest);
rewardChestCloseButton.addEventListener("click", () => {
  hideRewardChest();
  showSetup();
});
changeCharacterButton.addEventListener("click", resetCharacterChoice);
gmAddCoinsButton.addEventListener("click", gmAddCoins);
gmLevelUpButton.addEventListener("click", gmLevelUp);
gmUnlockAllButton.addEventListener("click", gmUnlockAll);
gmOpenChestButton.addEventListener("click", gmOpenChest);
gmCycleMonsterButton.addEventListener("click", gmCycleMonster);
gmResetCharacterButton.addEventListener("click", gmResetCharacter);
timedModeToggle.addEventListener("change", updateStartButtonText);
timeLimitInput.addEventListener("input", updateStartButtonText);
soundToggle.addEventListener("change", () => {
  state.soundEnabled = soundToggle.checked;
});
languageSelect.addEventListener("change", () => {
  state.language = languageSelect.value;
  saveLanguage();
  applyLanguage();
  updateStartButtonText();
  renderDailySummary();
});
collectTextNodes();
loadCharacterState();
languageSelect.value = state.language;
applyLanguage();
updateSetupMode();
renderDailySummary();
renderCharacterPanel();

function getStoredLanguage() {
  try {
    return localStorage.getItem("mathPracticeLanguage") || "zh-Hant";
  } catch {
    return "zh-Hant";
  }
}

function saveLanguage() {
  try {
    localStorage.setItem("mathPracticeLanguage", state.language);
  } catch {
    // Language selection still works for the current visit.
  }
}

function t(zhText) {
  if (state.language === "en") {
    return translations.en[zhText] || zhText;
  }
  return zhText;
}

function collectTextNodes() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    const value = node.nodeValue.trim();
    if (value) {
      textNodes.push({ node, originalValue: node.nodeValue, zhText: value });
    }
    node = walker.nextNode();
  }
}

function applyLanguage() {
  document.documentElement.lang = state.language;
  document.title = t("金幣數學島");
  textNodes.forEach(({ node, originalValue, zhText }) => {
    const translated = t(zhText);
    node.nodeValue = originalValue.replace(zhText, translated);
  });
  updateInfoPageLinks();
  renderCharacterPanel();
}

function updateInfoPageLinks() {
  const suffix = state.language === "en" ? "-en" : "";
  const footerLinks = document.querySelectorAll(".site-footer a");
  if (footerLinks[0]) footerLinks[0].href = `about${suffix}.html`;
  if (footerLinks[1]) footerLinks[1].href = `privacy${suffix}.html`;
  if (footerLinks[2]) footerLinks[2].href = `contact${suffix}.html`;
}

function formatQuestionCounter(current, total) {
  return state.language === "en" ? `Question ${current} / ${total}` : `第 ${current} / ${total} 題`;
}

function formatQuestionNumber(current) {
  return state.language === "en" ? `Question ${current}` : `第 ${current} 題`;
}

function formatScore(score) {
  return state.language === "en" ? `${score} Correct` : `答對 ${score} 題`;
}

function formatHits(score) {
  return state.language === "en" ? `${score} Hits` : `打中 ${score} 次`;
}

function formatPuzzleScore(score, total = PUZZLE_QUESTIONS) {
  return state.language === "en" ? `Unlocked ${score} / ${total} pieces` : `解鎖 ${score} / ${total} 片`;
}

function formatWrongAnswer(answer) {
  return state.language === "en" ? `Almost! The answer is ${answer}` : `差一點！答案是 ${answer}`;
}

function loadCharacterState() {
  try {
    const rawGameState = localStorage.getItem("mathPracticeGameState");
    const rawLegacyState = localStorage.getItem("mathPracticeCharacter");
    const data = rawGameState ? JSON.parse(rawGameState) : rawLegacyState ? JSON.parse(rawLegacyState) : {};
    state.character = normalizeBaseCharacterId(data.character || null);
    gameState.gold = Number(data.gold ?? data.coins) || 0;
    gameState.gems = Number(data.gems) || 0;
    gameState.inventory = Array.isArray(data.inventory)
      ? data.inventory
      : Array.isArray(data.ownedAccessories) ? data.ownedAccessories : [];
    gameState.unlockedCharacters = Array.isArray(data.unlockedCharacters)
      ? data.unlockedCharacters
      : ["boy", "girl"];
    gameState.ownedItems = normalizeOwnedItems(data.ownedItems);
    gameState.equippedItem = gameState.ownedItems.includes(data.equippedItem) ? data.equippedItem : null;
    gameState.unlockedCharacters = normalizeUnlockedCharacters(gameState.unlockedCharacters);
    state.character = data.character ? normalizeBaseCharacterId(state.character) : null;
    gameState.equipped = {
      ...gameState.equipped,
      ...(data.equipped || data.equippedAccessories || {}),
    };
    gameState.streak = Number(data.streak) || 0;
    gameState.combo = Number(data.combo) || 0;
    gameState.xp = Number(data.xp) || 0;
    gameState.level = getLevelFromXp(gameState.xp);
    gameState.stats = {
      ...gameState.stats,
      ...(data.stats || {}),
    };
    gameState.claimedRewards = Array.isArray(data.claimedRewards) ? data.claimedRewards : [];
    gameState.gachaPity = {
      sinceEpic: Number(data.gachaPity?.sinceEpic) || 0,
      sinceLegendary: Number(data.gachaPity?.sinceLegendary) || 0,
    };
    syncLegacyGameFields();
  } catch {
    state.character = null;
    gameState.gold = 0;
    gameState.gems = 0;
    gameState.inventory = [];
    gameState.unlockedCharacters = ["boy", "girl"];
    gameState.equipped = { hat: null, hair: null, top: null, bottom: null, shoes: null, hand: null };
    gameState.streak = 0;
    gameState.combo = 0;
    gameState.xp = 0;
    gameState.level = 1;
    gameState.stats = { addCorrect: 0, subtractCorrect: 0, multiplyCorrect: 0, divideCorrect: 0 };
    gameState.claimedRewards = [];
    gameState.ownedItems = [];
    gameState.equippedItem = null;
    gameState.gachaPity = { sinceEpic: 0, sinceLegendary: 0 };
    syncLegacyGameFields();
  }
}

function saveCharacterState() {
  syncLegacyGameFields();
  try {
    localStorage.setItem("mathPracticeGameState", JSON.stringify({
      character: state.character,
      gold: gameState.gold,
      gems: gameState.gems,
      inventory: gameState.inventory,
      unlockedCharacters: gameState.unlockedCharacters,
      equipped: gameState.equipped,
      streak: gameState.streak,
      combo: gameState.combo,
      level: gameState.level,
      xp: gameState.xp,
      stats: gameState.stats,
      claimedRewards: gameState.claimedRewards,
      ownedItems: gameState.ownedItems,
      equippedItem: gameState.equippedItem,
      gachaPity: gameState.gachaPity,
    }));
  } catch {
    // The dress-up system still works for the current visit.
  }
}

function syncLegacyGameFields() {
  state.coins = gameState.gold;
  state.ownedAccessories = gameState.inventory;
  state.equippedAccessories = gameState.equipped;
}

function normalizeUnlockedCharacters(ids) {
  const normalized = Array.from(new Set([...(ids || []), "boy", "girl"]));
  return normalized.filter((id) => characterCatalog.some((character) => character.id === id));
}

function normalizeOwnedItems(ids) {
  if (!Array.isArray(ids)) return [];
  return Array.from(new Set(ids)).filter((id) => itemCatalog.some((item) => item.id === id));
}

function normalizeBaseCharacterId(characterId) {
  if (characterId === "girl" || String(characterId || "").includes("girl")) return "girl";
  if (characterId === "boy" || String(characterId || "").includes("boy")) return "boy";
  return null;
}

function isCharacterUnlocked(characterId, ownedIds = gameState.unlockedCharacters) {
  if (ownedIds.includes(characterId)) return true;
  const character = getCharacterById(characterId);
  return character.unlockType === "item" && gameState.ownedItems.includes(character.requiredItem);
}

function getCharacterById(characterId) {
  return characterCatalog.find((character) => character.id === characterId) || characterCatalog[0];
}

function getItemById(itemId) {
  return itemCatalog.find((item) => item.id === itemId) || null;
}

function getItemCharacterId(item, baseCharacter = state.character) {
  if (!item || !item.unlocksCharacter || !baseCharacter) return baseCharacter || "boy";
  if (typeof item.unlocksCharacter === "string") return item.unlocksCharacter;
  return item.unlocksCharacter[baseCharacter] || baseCharacter;
}

function getActiveCharacterId() {
  const baseCharacter = state.character || "boy";
  const item = getItemById(gameState.equippedItem);
  return getItemCharacterId(item, baseCharacter);
}

function getActiveCharacter() {
  return getCharacterById(getActiveCharacterId());
}

function getCharacterImageMarkup(character, altText, className = "character-image") {
  if (character.mediaType === "video" && character.image) {
    return `
      <video
        class="${className} character-video"
        src="${character.image}"
        aria-label="${altText}"
        muted
        playsinline
        preload="auto"
      ></video>
    `;
  }
  if (character.image) {
    return `<img class="${className}" src="${character.image}" alt="${altText}" />`;
  }
  return `<div class="${className} placeholder-character" aria-label="${altText}">${character.token || "?"}</div>`;
}

function renderCharacterMedia(character, altText, className = "character-image") {
  return getCharacterImageMarkup(character, altText, className);
}

function resetCharacterVideo(video) {
  if (!video) return;
  const reset = () => {
    video.pause();
    try {
      video.currentTime = 0.001;
    } catch {
      video.load();
    }
    video.classList.remove("is-playing");
  };
  if (video.readyState >= 1) {
    reset();
  } else {
    video.addEventListener("loadedmetadata", reset, { once: true });
    video.load();
  }
}

function prepareCharacterVideos(container = document) {
  container.querySelectorAll("video.character-video").forEach((video) => {
    if (video.dataset.videoPrepared) {
      return;
    }
    video.dataset.videoPrepared = "true";
    video.addEventListener("ended", () => resetCharacterVideo(video));
    video.addEventListener("pause", () => video.classList.remove("is-playing"));
    resetCharacterVideo(video);
  });
}

function getPlaceholderCharacterDataUrl(character) {
  const rarityColors = {
    common: "#8b969e",
    rare: "#4c7bd9",
    epic: "#9c5cff",
    legendary: "#f7c948",
  };
  const color = rarityColors[character.rarity] || rarityColors.common;
  const token = character.token || "?";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="768" height="1024" viewBox="0 0 768 1024">
      <rect width="768" height="1024" rx="44" fill="#ffffff"/>
      <rect x="54" y="54" width="660" height="916" rx="38" fill="#f7fffb" stroke="${color}" stroke-width="18"/>
      <circle cx="384" cy="430" r="150" fill="${color}" opacity="0.18"/>
      <text x="384" y="500" text-anchor="middle" font-family="Segoe UI, Arial" font-size="190" font-weight="900" fill="${color}">${token}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function renderLobby() {
  updateTopCoins();
  const character = getActiveCharacter();
  const characterName = state.language === "en" ? character.enName : character.name;
  const rarityLabel = t(RARITY_LABELS[character.rarity] || RARITY_LABELS.common);
  lobbyCharacterMedia.innerHTML = renderCharacterMedia(character, characterName, "lobby-character-asset");
  prepareCharacterVideos(lobbyCharacterMedia);
  lobbyCharacterName.textContent = characterName;
  lobbyCharacterRarity.textContent = rarityLabel;
  lobbyCharacterCard.className = `lobby-character-card rarity-${character.rarity}`;
  lobbyCharacterCard.dataset.mediaType = character.mediaType || "image";
  lobbyLevelText.textContent = `Lv.${gameState.level}`;
  lobbyXpText.textContent = `${getXpProgress()} / ${getXpNeededForLevel(gameState.level)}`;
  lobbyStreakText.textContent = `${gameState.streak}`;
  lobbyChestButton.disabled = gameState.gold < CHEST_COST || !state.character;
  updatePracticeSummary();
}

function updatePracticeSummary() {
  const practiceMode = document.querySelector("input[name='practiceMode']:checked").value;
  const modeNames = {
    add: t("加法練習"),
    subtract: t("減法練習"),
    multiply: t("乘法練習"),
    divide: t("除法練習"),
    miniGames: t("小遊戲"),
  };
  const digits = document.querySelector("input[name='digits']:checked")?.value || "1";
  const digitNames = {
    1: "個位",
    2: "十位",
    3: "百位",
    4: "千位",
  };
  if (practiceMode === "miniGames") {
    const gameName = document.querySelector("input[name='miniGameMode']:checked")?.parentElement?.querySelector("span")?.textContent || "";
    const operationName = document.querySelector("input[name='miniGameOperation']:checked")?.parentElement?.textContent?.trim() || "";
    practiceSummaryText.textContent = `${modeNames[practiceMode]}・${gameName}・${operationName}・${digitNames[digits] || ""}`;
    return;
  }
  practiceSummaryText.textContent = `${modeNames[practiceMode]}・${digitNames[digits] || ""}`;
}

function getLevelFromXp(xp) {
  let level = 1;
  while (xp >= getTotalXpForLevel(level + 1)) {
    level += 1;
  }
  return level;
}

function getXpProgress() {
  return gameState.xp - getTotalXpForLevel(gameState.level);
}

function getXpNeededForLevel(level) {
  return BASE_LEVEL_XP + Math.max(0, level - 1) * LEVEL_XP_STEP;
}

function getTotalXpForLevel(level) {
  let total = 0;
  for (let currentLevel = 1; currentLevel < level; currentLevel += 1) {
    total += getXpNeededForLevel(currentLevel);
  }
  return total;
}

function chooseCharacter(character) {
  if (character !== "boy" && character !== "girl") {
    return;
  }
  state.character = character;
  gameState.equippedItem = null;
  saveCharacterState();
  renderCharacterPanel();
}

function resetCharacterChoice() {
  state.character = null;
  saveCharacterState();
  renderCharacterPanel();
}

function renderCharacterPanel() {
  updateTopCoins();
  renderLobby();
  characterCoinText.innerHTML = formatCoinDisplay(gameState.gold);
  levelText.textContent = `Lv.${gameState.level}`;
  xpText.textContent = `${getXpProgress()} / ${getXpNeededForLevel(gameState.level)}`;
  streakText.textContent = `${gameState.streak}`;
  characterChoice.classList.toggle("hidden", Boolean(state.character));
  characterDashboard.classList.toggle("hidden", !state.character);
  characterHint.textContent = state.character
    ? t("裝備物品會切換造型，角色收藏只作為圖鑑。")
    : t("選擇一位陪你一起練習的夥伴");
  openChestButton.disabled = gameState.gold < CHEST_COST || !state.character;
  renderAvatar();
  renderCharacterCollection();
  renderItemInventory();
}

function renderAvatar() {
  if (!state.character) {
    avatarStage.innerHTML = "";
    return;
  }
  avatarStage.className = "avatar-stage";
  const character = getActiveCharacter();
  const characterName = state.language === "en" ? character.enName : character.name;
  const rarityLabel = t(RARITY_LABELS[character.rarity] || RARITY_LABELS.common);
  avatarStage.innerHTML = `
    <figure class="avatar-complete-card rarity-${character.rarity}" data-avatar-card data-media-type="${character.mediaType || "image"}">
      ${getCharacterImageMarkup(character, characterName)}
      <figcaption>
        <strong>${characterName}</strong>
        <span>${rarityLabel}</span>
      </figcaption>
    </figure>
  `;
  prepareCharacterVideos(avatarStage);
  avatarStage.querySelector("[data-avatar-card]")?.addEventListener("click", playActiveCharacterAnimation);
}

function pulseCharacterCard(targetCard = avatarStage.querySelector("[data-avatar-card]")) {
  const target = targetCard || avatarStage.querySelector("[data-avatar-card]") || lobbyCharacterCard;
  if (!target) {
    return;
  }
  target.classList.remove("character-tap-burst");
  void target.offsetWidth;
  target.classList.add("character-tap-burst");
}

function playActiveCharacterAnimation(targetCard = avatarStage.querySelector("[data-avatar-card]")) {
  const target = targetCard || avatarStage.querySelector("[data-avatar-card]") || lobbyCharacterCard;
  if (!target) {
    return;
  }
  const character = getActiveCharacter();
  const video = target.querySelector("video");
  if (video) {
    video.classList.add("is-playing");
    video.muted = !state.soundEnabled;
    video.volume = state.soundEnabled ? 0.85 : 0;
    video.currentTime = 0;
    video.play().catch(() => {
      video.muted = true;
      resetCharacterVideo(video);
      pulseCharacterCard(target);
    });
    return;
  }
  playEquipSound(character.rarity);
  pulseCharacterCard(target);
}

function scrollToAvatarPreview() {
  if (!avatarStage || characterDashboard.classList.contains("hidden")) {
    return;
  }
  window.setTimeout(() => {
    avatarStage.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      prepareCharacterVideos(avatarStage);
      pulseCharacterCard();
    }, 360);
  }, 80);
}

function makeCharacterSvg() {
  const layers = characterLayerAssets[state.character];
  const characterLabel = state.character === "girl" ? t("小女孩") : t("小男孩");
  const hasLayeredCharacter = layers.bodyBack && layers.bodyFront;
  if (!hasLayeredCharacter) {
    return `<img class="character-image" src="${layers.base}" alt="${characterLabel}" />`;
  }
  return `
    <div class="avatar-composite ${state.character}">
      <img class="character-layer body-back-layer" src="${layers.bodyBack}" alt="${characterLabel}" />
      ${makeLayeredAccessoryImages("back")}
      ${makeLayeredAccessoryImages("clothes")}
      <img class="character-layer body-front-layer" src="${layers.bodyFront}" alt="" aria-hidden="true" />
      ${makeLayeredAccessoryImages("front")}
    </div>
  `;
}

function makeLayeredAccessoryImages(layer) {
  const equippedItems = getEquippedItems();
  return Object.values(equippedItems)
    .map((item) => ({ item, asset: getLayeredAccessoryAsset(item) }))
    .filter(({ item, asset }) => item && asset && getAccessoryLayer(item.slot) === layer)
    .map(({ item, asset }) => `<img class="avatar-accessory ${item.slot}-accessory" src="${asset}" alt="" aria-hidden="true" />`)
    .join("");
}

function getLayeredAccessoryAsset(item) {
  if (!item || !item.layeredAssets || !state.character) {
    return "";
  }
  return item.layeredAssets[state.character] || "";
}

function getAccessoryLayer(slot) {
  if (slot === "top" || slot === "bottom" || slot === "shoes") {
    return "clothes";
  }
  if (slot === "backpack") {
    return "back";
  }
  return "front";
}

function makeCharacterDefs() {
  return `
    <defs>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="12" stdDeviation="8" flood-color="#263238" flood-opacity="0.2"/>
      </filter>
      <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffe9c7"/>
        <stop offset="1" stop-color="#ffbf88"/>
      </linearGradient>
      <linearGradient id="boyHair" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#4b5960"/>
        <stop offset="1" stop-color="#1f292e"/>
      </linearGradient>
      <linearGradient id="girlHair" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#9a5b33"/>
        <stop offset="1" stop-color="#5d321c"/>
      </linearGradient>
      <linearGradient id="blueOutfit" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#82c8ff"/>
        <stop offset="1" stop-color="#4c7bd9"/>
      </linearGradient>
      <linearGradient id="mintOutfit" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#78e6c4"/>
        <stop offset="1" stop-color="#2f8f6f"/>
      </linearGradient>
      <linearGradient id="pinkOutfit" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffb2d2"/>
        <stop offset="1" stop-color="#e96f8f"/>
      </linearGradient>
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff59b"/>
        <stop offset="1" stop-color="#f7c948"/>
      </linearGradient>
    </defs>
  `;
}

function makeBoyCharacterSvg() {
  return `
    <svg class="character-svg" viewBox="0 0 360 460" role="img" aria-label="${t("我的角色")}">
      ${makeCharacterDefs()}
      <ellipse cx="178" cy="414" rx="94" ry="22" fill="#263238" opacity="0.16"/>
      <g filter="url(#softShadow)">
        <path d="M118 238 C92 268 82 312 80 350" fill="none" stroke="#263238" stroke-width="42" stroke-linecap="round"/>
        <path d="M118 238 C92 268 82 312 80 350" fill="none" stroke="url(#skin)" stroke-width="30" stroke-linecap="round"/>
        <path d="M242 238 C268 268 282 312 288 350" fill="none" stroke="#263238" stroke-width="42" stroke-linecap="round"/>
        <path d="M242 238 C268 268 282 312 288 350" fill="none" stroke="url(#skin)" stroke-width="30" stroke-linecap="round"/>
        <path d="M136 326 H224 L214 378 H146 Z" fill="#5e8ee8" stroke="#263238" stroke-width="9" stroke-linejoin="round"/>
        <path d="M146 364 V398" stroke="#ffcf9d" stroke-width="34" stroke-linecap="round"/>
        <path d="M214 364 V398" stroke="#ffcf9d" stroke-width="34" stroke-linecap="round"/>
        <path d="M116 404 Q146 386 176 402 Q170 424 116 424 Z" fill="#78b9ff" stroke="#263238" stroke-width="8" stroke-linejoin="round"/>
        <path d="M186 402 Q216 386 246 404 Q244 424 190 424 Z" fill="#78b9ff" stroke="#263238" stroke-width="8" stroke-linejoin="round"/>
        <path d="M132 402 H166 M202 402 H234" stroke="#fffdf8" stroke-width="6" stroke-linecap="round"/>
        <path d="M108 218 Q180 190 252 218 L236 332 H124 Z" fill="url(#blueOutfit)" stroke="#263238" stroke-width="9" stroke-linejoin="round"/>
        <path d="M130 228 Q180 210 230 228" stroke="#d5efff" stroke-width="8" stroke-linecap="round" opacity="0.72"/>
        <path d="M148 282 Q180 302 212 282" fill="none" stroke="#fffdf8" stroke-width="7" stroke-linecap="round" opacity="0.38"/>
        <path d="M98 136 C102 58 256 58 262 134 C236 96 152 88 98 136 Z" fill="url(#boyHair)" stroke="#263238" stroke-width="8"/>
        <path d="M116 108 C150 72 210 70 242 104" fill="none" stroke="#ffffff" stroke-width="9" stroke-linecap="round" opacity="0.2"/>
        <path d="M106 136 C106 72 254 72 254 136 C254 202 220 232 180 232 C140 232 106 202 106 136 Z" fill="url(#skin)" stroke="#263238" stroke-width="8" stroke-linejoin="round"/>
        <circle cx="146" cy="150" r="22" fill="#263238"/>
        <circle cx="214" cy="150" r="22" fill="#263238"/>
        <circle cx="140" cy="142" r="7" fill="#ffffff"/>
        <circle cx="208" cy="142" r="7" fill="#ffffff"/>
        <circle cx="154" cy="178" r="15" fill="#ff9a9a" opacity="0.54"/>
        <circle cx="206" cy="178" r="15" fill="#ff9a9a" opacity="0.54"/>
        <path d="M164 188 Q180 206 196 188" fill="none" stroke="#c84d4d" stroke-width="7" stroke-linecap="round"/>
        <path d="M132 116 Q180 84 228 116" fill="none" stroke="#ffffff" stroke-width="10" stroke-linecap="round" opacity="0.2"/>
      </g>
    </svg>
  `;
}

function makeGirlCharacterSvg() {
  return `
    <svg class="character-svg" viewBox="0 0 360 460" role="img" aria-label="${t("我的角色")}">
      ${makeCharacterDefs()}
      <ellipse cx="180" cy="414" rx="96" ry="22" fill="#263238" opacity="0.16"/>
      <g filter="url(#softShadow)">
        <path d="M86 148 C72 66 126 34 180 34 C234 34 288 66 274 148 C270 226 230 258 180 258 C130 258 90 226 86 148 Z" fill="url(#girlHair)" stroke="#263238" stroke-width="8"/>
        <circle cx="86" cy="164" r="36" fill="url(#girlHair)" stroke="#263238" stroke-width="7"/>
        <circle cx="274" cy="164" r="36" fill="url(#girlHair)" stroke="#263238" stroke-width="7"/>
        <path d="M114 116 C136 62 218 60 250 116 C212 96 156 92 114 116 Z" fill="#b86f41" opacity="0.45"/>
        <path d="M118 238 C92 268 82 312 80 350" fill="none" stroke="#263238" stroke-width="42" stroke-linecap="round"/>
        <path d="M118 238 C92 268 82 312 80 350" fill="none" stroke="url(#skin)" stroke-width="30" stroke-linecap="round"/>
        <path d="M242 238 C268 268 282 312 288 350" fill="none" stroke="#263238" stroke-width="42" stroke-linecap="round"/>
        <path d="M242 238 C268 268 282 312 288 350" fill="none" stroke="url(#skin)" stroke-width="30" stroke-linecap="round"/>
        <path d="M134 326 H226 L238 374 H122 Z" fill="#e96f8f" stroke="#263238" stroke-width="9" stroke-linejoin="round"/>
        <path d="M146 364 V398" stroke="#ffcf9d" stroke-width="34" stroke-linecap="round"/>
        <path d="M214 364 V398" stroke="#ffcf9d" stroke-width="34" stroke-linecap="round"/>
        <path d="M114 404 Q146 386 178 402 Q172 424 114 424 Z" fill="#ffabd0" stroke="#263238" stroke-width="8" stroke-linejoin="round"/>
        <path d="M184 402 Q216 386 248 404 Q246 424 188 424 Z" fill="#ffabd0" stroke="#263238" stroke-width="8" stroke-linejoin="round"/>
        <path d="M130 402 H166 M200 402 H236" stroke="#fffdf8" stroke-width="6" stroke-linecap="round"/>
        <path d="M108 218 Q180 190 252 218 L236 332 H124 Z" fill="url(#pinkOutfit)" stroke="#263238" stroke-width="9" stroke-linejoin="round"/>
        <path d="M132 230 Q180 212 228 230" stroke="#ffd9e5" stroke-width="8" stroke-linecap="round" opacity="0.72"/>
        <path d="M148 282 Q180 302 212 282" fill="none" stroke="#fffdf8" stroke-width="7" stroke-linecap="round" opacity="0.4"/>
        <path d="M106 136 C106 72 254 72 254 136 C254 202 220 232 180 232 C140 232 106 202 106 136 Z" fill="url(#skin)" stroke="#263238" stroke-width="8" stroke-linejoin="round"/>
        <circle cx="146" cy="150" r="22" fill="#263238"/>
        <circle cx="214" cy="150" r="22" fill="#263238"/>
        <circle cx="140" cy="142" r="7" fill="#ffffff"/>
        <circle cx="208" cy="142" r="7" fill="#ffffff"/>
        <circle cx="154" cy="178" r="15" fill="#ff9a9a" opacity="0.56"/>
        <circle cx="206" cy="178" r="15" fill="#ff9a9a" opacity="0.56"/>
        <path d="M164 188 Q180 206 196 188" fill="none" stroke="#c84d4d" stroke-width="7" stroke-linecap="round"/>
        <path d="M132 116 Q180 84 228 116" fill="none" stroke="#ffffff" stroke-width="10" stroke-linecap="round" opacity="0.2"/>
      </g>
    </svg>
  `;
}

function getEquippedItems() {
  return Object.fromEntries(
    Object.entries(gameState.equipped).map(([slot, accessoryId]) => [
      slot,
      accessoryCatalog.find((accessory) => accessory.id === accessoryId),
    ]),
  );
}

function makeHeadSvg() {
  return `
    <g class="svg-head">
      <path d="M108 132 C108 72 252 72 252 132 C252 198 220 226 180 226 C140 226 108 198 108 132 Z" fill="url(#skin)" stroke="#263238" stroke-width="8" stroke-linejoin="round"/>
      <circle cx="146" cy="148" r="19" fill="#263238"/>
      <circle cx="214" cy="148" r="19" fill="#263238"/>
      <circle cx="140" cy="141" r="7" fill="#ffffff"/>
      <circle cx="208" cy="141" r="7" fill="#ffffff"/>
      <circle cx="154" cy="174" r="13" fill="#ff9a9a" opacity="0.52"/>
      <circle cx="206" cy="174" r="13" fill="#ff9a9a" opacity="0.52"/>
      <path d="M164 184 Q180 202 196 184" fill="none" stroke="#c84d4d" stroke-width="6" stroke-linecap="round"/>
      <path d="M132 112 Q180 78 228 112" fill="none" stroke="#ffffff" stroke-width="10" stroke-linecap="round" opacity="0.22"/>
    </g>
  `;
}

function makeBaseHairSvg(isGirl) {
  if (isGirl) {
    return `
      <g class="svg-base-hair">
        <path d="M88 150 C72 72 124 42 180 42 C236 42 288 72 272 150 C266 210 232 244 180 244 C128 244 94 210 88 150 Z" fill="url(#hairGirl)" stroke="#263238" stroke-width="8"/>
        <path d="M112 126 C128 72 202 58 242 112 C214 94 164 86 112 126 Z" fill="#b06b3e" opacity="0.5"/>
      </g>
    `;
  }
  return `
    <g class="svg-base-hair">
      <path d="M104 126 C110 62 250 62 256 126 C220 92 154 88 104 126 Z" fill="url(#hairBoy)" stroke="#263238" stroke-width="8"/>
      <path d="M118 108 C150 74 206 72 236 106" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity="0.18"/>
    </g>
  `;
}

function makeArmsSvg() {
  return `
    <g class="svg-arms">
      <path d="M106 238 C82 260 72 304 66 342" fill="none" stroke="#263238" stroke-width="38" stroke-linecap="round"/>
      <path d="M254 238 C278 260 288 304 294 342" fill="none" stroke="#263238" stroke-width="38" stroke-linecap="round"/>
      <path d="M106 238 C82 260 72 304 66 342" fill="none" stroke="url(#skin)" stroke-width="28" stroke-linecap="round"/>
      <path d="M254 238 C278 260 288 304 294 342" fill="none" stroke="url(#skin)" stroke-width="28" stroke-linecap="round"/>
    </g>
  `;
}

function makeBodySvg(outfit) {
  if (outfit === "dress") {
    return `
      <g class="svg-body">
        <path d="M124 226 H236 L264 354 H96 Z" fill="url(#coralDress)" stroke="#263238" stroke-width="8" stroke-linejoin="round"/>
        <path d="M142 244 H218" stroke="#ffd9cc" stroke-width="8" stroke-linecap="round" opacity="0.72"/>
        <circle cx="180" cy="286" r="9" fill="#fff6df" opacity="0.8"/>
      </g>
    `;
  }
  const fill = outfit === "hoodie" ? "url(#shirtBlue)" : outfit === "shirt" ? "url(#shirtGreen)" : "url(#shirtGreen)";
  const pocket = outfit === "hoodie"
    ? `<path d="M152 292 Q180 318 208 292 V322 H152 Z" fill="#fffdf8" opacity="0.36"/>`
    : `<path d="M142 256 H218" stroke="#fffdf8" stroke-width="7" stroke-linecap="round" opacity="0.34"/>`;
  return `
    <g class="svg-body">
      <path d="M116 224 Q180 202 244 224 L236 348 H124 Z" fill="${fill}" stroke="#263238" stroke-width="8" stroke-linejoin="round"/>
      <path d="M180 218 V340" stroke="#ffffff" stroke-width="6" opacity="0.22"/>
      ${pocket}
      <circle cx="180" cy="250" r="7" fill="#fff6df" opacity="0.78"/>
    </g>
  `;
}

function makeLegsSvg(shoes) {
  const shoeFill = shoes === "boots" ? "#e96f55" : shoes === "sneakers" ? "#f7c948" : "#4c7bd9";
  return `
    <g class="svg-legs">
      <path d="M146 342 V398" stroke="#4c7bd9" stroke-width="34" stroke-linecap="round"/>
      <path d="M214 342 V398" stroke="#4c7bd9" stroke-width="34" stroke-linecap="round"/>
      <path d="M122 404 Q146 388 172 404 Q168 422 122 422 Z" fill="${shoeFill}" stroke="#263238" stroke-width="7" stroke-linejoin="round"/>
      <path d="M188 404 Q214 388 238 404 Q238 422 192 422 Z" fill="${shoeFill}" stroke="#263238" stroke-width="7" stroke-linejoin="round"/>
      <path d="M134 404 H164 M200 404 H228" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity="0.55"/>
    </g>
  `;
}

function makeHatSvg(item) {
  if (!item) return "";
  if (item.className === "wizard") {
    return `
      <g class="svg-hat">
        <path d="M138 82 L188 -26 L228 88 Z" fill="#7c5cff" stroke="#263238" stroke-width="8" stroke-linejoin="round"/>
        <path d="M154 56 L212 78" stroke="#f7c948" stroke-width="10" stroke-linecap="round"/>
        <circle cx="182" cy="34" r="8" fill="#fff6df"/>
      </g>
    `;
  }
  if (item.className === "dino") {
    return `
      <g class="svg-hat">
        <path d="M104 102 Q180 42 256 102 V130 H104 Z" fill="#2f8f6f" stroke="#263238" stroke-width="8" stroke-linejoin="round"/>
        <path d="M134 78 L150 46 L166 78 L182 46 L198 78 L214 46 L230 78" fill="#f7c948" stroke="#263238" stroke-width="5" stroke-linejoin="round"/>
      </g>
    `;
  }
  return `
    <g class="svg-hat">
      <path d="M106 94 Q180 50 254 94 L244 126 H116 Z" fill="#e96f55" stroke="#263238" stroke-width="8" stroke-linejoin="round"/>
      <path d="M210 112 H272" stroke="#f7c948" stroke-width="16" stroke-linecap="round"/>
      <path d="M132 84 Q180 66 228 84" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity="0.38"/>
    </g>
  `;
}

function makeHairAccessorySvg(item) {
  if (!item) return "";
  if (item.className === "twin") {
    return `
      <g class="svg-hair-accessory">
        <circle cx="82" cy="166" r="36" fill="#f7a35c" stroke="#263238" stroke-width="7"/>
        <circle cx="278" cy="166" r="36" fill="#f7a35c" stroke="#263238" stroke-width="7"/>
        <circle cx="82" cy="156" r="12" fill="#ffd9a8" opacity="0.45"/>
        <circle cx="278" cy="156" r="12" fill="#ffd9a8" opacity="0.45"/>
      </g>
    `;
  }
  return `
    <g class="svg-hair-accessory">
      <path d="M226 88 L236 110 L260 110 L240 124 L248 148 L226 134 L204 148 L212 124 L192 110 L216 110 Z" fill="#f7c948" stroke="#263238" stroke-width="5" stroke-linejoin="round"/>
    </g>
  `;
}

function makeCapeSvg(item) {
  if (!item || item.className !== "cape") return "";
  return `
    <g class="svg-cape">
      <path d="M114 222 Q180 192 246 222 L282 390 Q180 440 78 390 Z" fill="url(#purpleCape)" stroke="#263238" stroke-width="8" stroke-linejoin="round"/>
      <path d="M130 238 Q180 216 230 238" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity="0.22"/>
    </g>
  `;
}

function makeBackAccessorySvg(item) {
  if (!item || item.className !== "backpack") return "";
  return `
    <g class="svg-backpack">
      <path d="M78 244 Q58 278 72 342 Q104 350 126 324 L126 250 Z" fill="#f7c948" stroke="#263238" stroke-width="7"/>
      <path d="M282 244 Q302 278 288 342 Q256 350 234 324 L234 250 Z" fill="#e96f55" stroke="#263238" stroke-width="7"/>
      <circle cx="96" cy="278" r="8" fill="#fffdf8" opacity="0.6"/>
      <circle cx="264" cy="278" r="8" fill="#fffdf8" opacity="0.6"/>
    </g>
  `;
}

function makeHandAccessorySvg(item) {
  if (!item) return "";
  if (item.className === "shield") {
    return `
      <g class="svg-hand-accessory">
        <path d="M48 278 Q86 248 124 278 Q116 350 86 372 Q56 350 48 278 Z" fill="#4c7bd9" stroke="#263238" stroke-width="8" stroke-linejoin="round"/>
        <path d="M72 284 L100 284 M86 268 V342" stroke="#fffdf8" stroke-width="6" stroke-linecap="round" opacity="0.65"/>
      </g>
    `;
  }
  return `
    <g class="svg-hand-accessory">
      <path d="M262 246 L314 350" stroke="#263238" stroke-width="12" stroke-linecap="round"/>
      <path d="M262 246 L314 350" stroke="#ffd37a" stroke-width="7" stroke-linecap="round"/>
      <path d="M248 228 L260 254 L288 254 L266 270 L274 298 L250 282 L226 298 L234 270 L212 254 L240 254 Z" fill="#f7c948" stroke="#263238" stroke-width="6" stroke-linejoin="round"/>
    </g>
  `;
}

function renderCharacterCollection() {
  const rarityGroups = [
    { rarity: "common", title: state.language === "en" ? "Common Items" : "普通物品" },
    { rarity: "rare", title: state.language === "en" ? "Rare Items" : "稀有物品" },
    { rarity: "epic", title: state.language === "en" ? "Epic Items" : "史詩物品" },
    { rarity: "legendary", title: state.language === "en" ? "Legendary Items" : "傳說物品" },
  ];

  inventoryGrid.innerHTML = rarityGroups.map((group, index) => {
    const characters = characterCatalog.filter((character) => character.rarity === group.rarity);
    const ownedCount = characters.filter((character) => isCharacterUnlocked(character.id)).length;
    return `
      <details class="rarity-collection-group rarity-${group.rarity}" ${index < 2 ? "open" : ""}>
        <summary>
          <span>${group.title}</span>
          <strong>${ownedCount}/${characters.length}</strong>
        </summary>
        <div class="rarity-character-grid">
          ${characters.map(renderCollectionCharacterCard).join("")}
        </div>
      </details>
    `;
  }).join("");
}

function renderCollectionCharacterCard(character) {
  const isOwned = isCharacterUnlocked(character.id);
  const label = state.language === "en" ? character.enName : character.name;
  const rarityLabel = t(RARITY_LABELS[character.rarity] || RARITY_LABELS.common);
  const unlockInfo = getUnlockInfo(character);
  const canClaim = !isOwned && unlockInfo.canClaim;
  return `
    <button
      class="collection-character-card ${isOwned ? "" : "locked"} ${canClaim ? "claimable" : ""} rarity-${character.rarity}"
      type="button"
      data-character-card="${character.id}"
      disabled
    >
      ${isOwned ? getCharacterImageMarkup(character, label, "collection-character-image") : `<span class="locked-character-mark">?</span>`}
      <span>${isOwned ? label : "???"}</span>
      <em>${rarityLabel}</em>
      <small>${getCharacterCardStatus(character, isOwned, false, unlockInfo)}</small>
    </button>
  `;
}

function getUnlockInfo(character) {
  if (character.unlockType === "item") {
    const item = getItemById(character.requiredItem);
    const itemName = item ? (state.language === "en" ? item.enName : item.name) : character.requiredItem;
    return {
      canClaim: false,
      text: `${t("需要物品")}：${itemName}`,
      progress: gameState.ownedItems.includes(character.requiredItem) ? t("已擁有") : t("物品寶箱可獲得"),
    };
  }
  if (character.unlockType === "level") {
    return {
      canClaim: gameState.level >= character.requiredLevel,
      text: `Lv.${character.requiredLevel} 解鎖`,
      progress: `${Math.min(gameState.level, character.requiredLevel)} / ${character.requiredLevel}`,
    };
  }
  if (character.unlockType === "achievement") {
    const current = Number(gameState.stats[character.statKey]) || 0;
    return {
      canClaim: current >= character.requiredCorrect,
      text: `${getStatLabel(character.statKey)}答對 ${character.requiredCorrect} 題`,
      progress: `${Math.min(current, character.requiredCorrect)} / ${character.requiredCorrect}`,
    };
  }
  return { canClaim: false, text: "", progress: "" };
}

function getCharacterCardStatus(character, isOwned, isSelected, unlockInfo) {
  if (isOwned) return state.language === "en" ? "Collected" : "已收集";
  if (unlockInfo.canClaim) return state.language === "en" ? "Claim" : "可領取";
  if (!character.unlockType) return t("寶箱可獲得");
  return `${unlockInfo.text}・${unlockInfo.progress}`;
}

function renderItemInventory() {
  if (!itemGrid) return;
  const rarityGroups = [
    { rarity: "common", title: t("普通角色") },
    { rarity: "rare", title: t("稀有角色") },
    { rarity: "epic", title: t("史詩角色") },
    { rarity: "legendary", title: t("傳說角色") },
  ];

  itemGrid.innerHTML = rarityGroups.map((group, index) => {
    const items = itemCatalog.filter((item) => item.rarity === group.rarity);
    const ownedCount = items.filter((item) => gameState.ownedItems.includes(item.id)).length;
    if (!items.length) return "";
    return `
      <details class="item-rarity-group rarity-${group.rarity}" ${index < 2 ? "open" : ""}>
        <summary>
          <strong>${group.title}</strong>
          <span>${ownedCount}/${items.length}</span>
        </summary>
        <div class="item-rarity-grid">
          ${items.map(renderItemCard).join("")}
        </div>
      </details>
    `;
  }).join("");

  itemGrid.querySelectorAll("[data-item-card]").forEach((button) => {
    button.addEventListener("click", () => equipItem(button.dataset.itemCard));
  });
}

function renderItemCard(item) {
    const isOwned = gameState.ownedItems.includes(item.id);
    const isEquipped = gameState.equippedItem === item.id;
    const itemName = state.language === "en" ? item.enName : item.name;
    const rarityLabel = t(RARITY_LABELS[item.rarity] || RARITY_LABELS.common);
    const character = getCharacterById(getItemCharacterId(item));
    const characterName = state.language === "en" ? character.enName : character.name;
    const status = isEquipped
      ? t("已裝備")
      : isOwned ? t("裝備") : t("物品寶箱可獲得");
    const iconMarkup = isOwned
      ? (item.iconImage ? `<img src="${item.iconImage}" alt="" aria-hidden="true" />` : item.icon || "?")
      : "?";
    return `
      <button
        class="item-card ${isOwned ? "" : "locked"} ${isEquipped ? "equipped" : ""} rarity-${item.rarity}"
        type="button"
        data-item-card="${item.id}"
        ${isOwned ? "" : "disabled"}
      >
        <span class="item-icon ${isOwned ? "" : "item-icon-locked"}">${iconMarkup}</span>
        <strong>${isOwned ? itemName : "???"}</strong>
        <em>${rarityLabel}</em>
        <small>${t("解鎖角色")}：${characterName}</small>
        <small>${status}</small>
      </button>
    `;
}

function equipItem(itemId) {
  const item = getItemById(itemId);
  if (!item || !gameState.ownedItems.includes(itemId)) {
    return;
  }
  gameState.equippedItem = itemId;
  saveCharacterState();
  renderCharacterPanel();
  const itemName = state.language === "en" ? item.enName : item.name;
  chestMessage.textContent = state.language === "en" ? `Equipped: ${itemName}` : `已裝備：${itemName}`;
  playEquipSound(item.rarity);
  scrollToAvatarPreview();
}

function getStatLabel(statKey) {
  const labels = {
    addCorrect: "加法",
    subtractCorrect: "減法",
    multiplyCorrect: "乘法",
    divideCorrect: "除法",
  };
  return labels[statKey] || "";
}

function claimRewardCharacter(character) {
  const unlockInfo = getUnlockInfo(character);
  if (!character.unlockType || !unlockInfo.canClaim || gameState.unlockedCharacters.includes(character.id)) {
    return;
  }
  gameState.unlockedCharacters.push(character.id);
  if (!gameState.claimedRewards.includes(character.id)) {
    gameState.claimedRewards.push(character.id);
  }
  saveCharacterState();
  renderCharacterPanel();
}

function getAvailableAccessories() {
  return accessoryCatalog.filter((item) => Boolean(getLayeredAccessoryAsset(item)));
}

function equipAccessory(accessoryId) {
  if (!gameState.inventory.includes(accessoryId)) {
    return;
  }
  const item = accessoryCatalog.find((accessory) => accessory.id === accessoryId);
  if (!item) {
    return;
  }
  if (gameState.equipped[item.slot] === item.id) {
    gameState.equipped[item.slot] = null;
  } else {
    gameState.equipped[item.slot] = item.id;
  }
  saveCharacterState();
  renderCharacterPanel();
  if (!getLayeredAccessoryAsset(item)) {
    chestMessage.textContent = t("已記錄裝備，正式 PNG 素材製作中。");
  }
}

function openChest() {
  if (gameState.gold < CHEST_COST || !state.character) {
    chestMessage.textContent = t("需要 10 金幣才能抽寶箱。");
    return;
  }
  pendingChestCost = CHEST_COST;
  chestMessage.textContent = state.language === "en" ? "Chest ready. Tap to open!" : "寶箱準備好了，點擊開箱！";
  showRewardChest();
}

function rollChestReward() {
  const rarity = getRandomRarity();
  updateGachaPity(rarity);
  return rollItemReward(rarity);
}

function rollCharacterReward(rarity) {
  const gachaCharacters = characterCatalog.filter((character) => !character.unlockType);
  const rarityPool = gachaCharacters.filter((character) => character.rarity === rarity);
  const pool = rarityPool.length > 0 ? rarityPool : gachaCharacters;
  const character = pool[randomInt(0, pool.length - 1)];
  const isDuplicate = isCharacterUnlocked(character.id);
  const duplicateGold = Math.floor(CHEST_COST * 0.5);

  if (isDuplicate) {
    gameState.gold += duplicateGold;
  } else {
    gameState.unlockedCharacters.push(character.id);
  }

  return {
    type: "character",
    item: character,
    character,
    rarity: character.rarity || rarity,
    isDuplicate,
    goldBonus: isDuplicate ? duplicateGold : 0,
  };
}

function rollItemReward(rarity) {
  const rarityPool = itemCatalog.filter((item) => item.rarity === rarity);
  const pool = rarityPool.length > 0 ? rarityPool : itemCatalog;
  const unownedPool = pool.filter((item) => !gameState.ownedItems.includes(item.id));
  const drawPool = unownedPool.length > 0 ? unownedPool : pool;
  const rewardItem = drawPool[randomInt(0, drawPool.length - 1)];
  const isDuplicate = gameState.ownedItems.includes(rewardItem.id);
  const duplicateGold = Math.floor(CHEST_COST * 0.5);

  if (isDuplicate) {
    gameState.gold += duplicateGold;
  } else {
    gameState.ownedItems.push(rewardItem.id);
  }

  return {
    type: "item",
    item: rewardItem,
    character: getCharacterById(getItemCharacterId(rewardItem)),
    rarity: rewardItem.rarity || rarity,
    isDuplicate,
    goldBonus: isDuplicate ? duplicateGold : 0,
  };
}

function formatChestRewardText(reward) {
  if (!reward.item) {
    const duplicateGold = Math.floor(CHEST_COST * 0.5);
    return state.language === "en" ? `Duplicate reward converted to +${duplicateGold} coins.` : `重複獎勵轉換為金幣 +${duplicateGold}。`;
  }

  const itemName = state.language === "en" ? reward.item.enName : reward.item.name;
  const rarityLabel = t(RARITY_LABELS[reward.rarity] || RARITY_LABELS.common);
  if (reward.isDuplicate) {
    return state.language === "en"
      ? `Duplicate ${itemName} (${rarityLabel}) converted to +${reward.goldBonus} coins.`
      : `重複的 ${itemName}（${rarityLabel}）轉換為金幣 +${reward.goldBonus}。`;
  }

  return state.language === "en"
    ? `New gear: ${itemName} (${rarityLabel})`
    : `抽到新裝備 ${itemName}（${rarityLabel}）！`;
}

function showRewardChest() {
  if (!state.character || !rewardChestOverlay) {
    return;
  }

  resetChestAnimation();
  rewardChestOverlay.classList.remove("hidden");
  rewardChestButton.disabled = false;
  rewardChestButton.classList.remove("opened", "opening", "stage-2", "stage-3", "stage-4");
  rewardChestOverlay.classList.remove("is-opening", "is-epic", "is-legendary");
  rewardChestHint.textContent = state.language === "en" ? "Tap the chest to open" : "點擊寶箱開啟";
  rewardChestResult.className = "reward-chest-result hidden";
  rewardChestResult.innerHTML = "";
  rewardChestCloseButton.classList.add("hidden");
  setChestStage(0);
}

function hideRewardChest() {
  if (!rewardChestOverlay) {
    return;
  }
  resetChestAnimation();
  rewardChestOverlay.classList.add("hidden");
  rewardChestOverlay.classList.remove("is-opening", "is-epic", "is-legendary");
}

function setChestStage(stageIndex) {
  if (!rewardChestImage) {
    return;
  }
  const clampedIndex = Math.max(0, Math.min(stageIndex, CHEST_IMAGE_STAGES.length - 1));
  rewardChestImage.src = CHEST_IMAGE_STAGES[clampedIndex];
  rewardChestButton.classList.toggle("stage-2", clampedIndex === 1);
  rewardChestButton.classList.toggle("stage-3", clampedIndex === 2);
  rewardChestButton.classList.toggle("stage-4", clampedIndex === 3);
}

function resetChestAnimation() {
  chestAnimationTimers.forEach((timerId) => window.clearTimeout(timerId));
  chestAnimationTimers = [];
  setChestStage(0);
  if (rewardChestButton) {
    rewardChestButton.classList.remove("opened", "opening", "stage-2", "stage-3", "stage-4");
  }
}

function prepareResultChest(questionCount) {
  pendingRoundChest = Boolean(state.character && questionCount > 0);
  claimChestButton.classList.toggle("hidden", !pendingRoundChest);
  claimChestButton.disabled = false;
  claimChestButton.textContent = t("領取寶箱");
}

function claimResultChest() {
  if (!pendingRoundChest) {
    return;
  }
  pendingRoundChest = false;
  pendingChestCost = 0;
  claimChestButton.disabled = true;
  claimChestButton.classList.add("hidden");
  showRewardChest();
}

function openRewardChest() {
  if (!state.character || rewardChestButton.disabled) {
    return;
  }
  if (pendingChestCost > 0) {
    if (gameState.gold < pendingChestCost) {
      rewardChestHint.textContent = t("需要 10 金幣才能抽寶箱。");
      return;
    }
    gameState.gold -= pendingChestCost;
    pendingChestCost = 0;
    saveCharacterState();
    renderCharacterPanel();
    updateTopCoins();
  }

  rewardChestButton.disabled = true;
  rewardChestButton.classList.add("opening");
  rewardChestOverlay.classList.add("is-opening");
  rewardChestHint.textContent = t("寶箱打開中...");
  playChestSound("opening");

  chestAnimationTimers = [
    window.setTimeout(() => {
      rewardChestButton.classList.add("stage-3");
      playChestSound("common");
    }, 280),
    window.setTimeout(() => {
      setChestStage(3);
      playChestSound("rare");
    }, 820),
    window.setTimeout(() => {
      const reward = rollChestReward();
      saveCharacterState();
      renderCharacterPanel();
      updateTopCoins();
      rewardChestButton.classList.remove("opening");
      rewardChestButton.classList.add("opened");
      rewardChestOverlay.classList.remove("is-opening");
      rewardChestOverlay.classList.toggle("is-epic", reward.rarity === "epic");
      rewardChestOverlay.classList.toggle("is-legendary", reward.rarity === "legendary");
      renderRewardChestResult(reward);
      playChestSound(reward.rarity);
      chestAnimationTimers = [];
    }, 1220),
  ];
}

function renderRewardChestResult(reward) {
  const rarityLabel = t(RARITY_LABELS[reward.rarity] || RARITY_LABELS.common);
  const itemName = reward.item
    ? (state.language === "en" ? reward.item.enName : reward.item.name)
    : (state.language === "en" ? "Coins" : "金幣");
  const unlockedCharacterName = reward.character
    ? (state.language === "en" ? reward.character.enName : reward.character.name)
    : "";
  const duplicateText = reward.isDuplicate
    ? (state.language === "en" ? `Already owned. +${reward.goldBonus} coins!` : `已擁有，轉換金幣 +${reward.goldBonus}！`)
    : `${t("已解鎖造型")}：${unlockedCharacterName}`;
  const rewardVisual = reward.item?.iconImage
    ? `<img class="reward-item-image" src="${reward.item.iconImage}" alt="${itemName}" />`
    : `<span class="reward-item-icon">${reward.item?.icon || "?"}</span>`;

  rewardChestHint.textContent = state.language === "en" ? "Reward earned" : "獲得獎勵";
  rewardChestResult.className = `reward-chest-result rarity-${reward.rarity}`;
  rewardChestResult.innerHTML = `
    <span>${rarityLabel}</span>
    ${rewardVisual}
    <strong>${itemName}</strong>
    <em>${duplicateText}</em>
  `;
  window.setTimeout(() => {
    rewardChestCloseButton.classList.remove("hidden");
  }, reward.rarity === "legendary" ? 900 : 180);
}

function getRandomRarity() {
  if (gameState.gachaPity.sinceLegendary >= 79) {
    return "legendary";
  }
  if (gameState.gachaPity.sinceEpic >= 29) {
    return "epic";
  }
  const rand = Math.random();
  if (rand < 0.60) return "common";
  if (rand < 0.87) return "rare";
  if (rand < 0.97) return "epic";
  return "legendary";
}

function updateGachaPity(rarity) {
  gameState.gachaPity.sinceEpic += 1;
  gameState.gachaPity.sinceLegendary += 1;
  if (rarity === "epic" || rarity === "legendary") {
    gameState.gachaPity.sinceEpic = 0;
  }
  if (rarity === "legendary") {
    gameState.gachaPity.sinceLegendary = 0;
  }
}

function gmAddCoins() {
  gameState.gold += 10;
  chestMessage.textContent = state.language === "en" ? "GM: +10G added." : "GM：已增加 10G。";
  saveCharacterState();
  renderCharacterPanel();
}

function gmLevelUp() {
  const nextLevel = gameState.level + 1;
  gameState.xp = Math.max(gameState.xp, getTotalXpForLevel(nextLevel));
  gameState.level = getLevelFromXp(gameState.xp);
  chestMessage.textContent = state.language === "en" ? `GM: level up to Lv.${gameState.level}.` : `GM：等級提升到 Lv.${gameState.level}。`;
  saveCharacterState();
  renderCharacterPanel();
}

function gmUnlockAll() {
  gameState.unlockedCharacters = characterCatalog.map((character) => character.id);
  gameState.ownedItems = itemCatalog.map((item) => item.id);
  chestMessage.textContent = state.language === "en" ? "GM: all characters unlocked." : "GM：已解鎖全部角色。";
  saveCharacterState();
  renderCharacterPanel();
}

function gmOpenChest() {
  if (!state.character) {
    state.character = "girl";
  }
  gameState.gold = Math.max(gameState.gold, CHEST_COST);
  openChest();
}

function gmCycleMonster() {
  const key = "mathPracticeMonsterIndex";
  const current = Number(localStorage.getItem(key)) || 0;
  const next = (current + 1) % monsterTypes.length;
  localStorage.setItem(key, String(next));
  const monster = monsterTypes[next];
  chestMessage.textContent = state.language === "en"
    ? `GM: next monster is ${monster.name}.`
    : `GM：下一隻怪物是 ${monster.name}。`;
  if (!monsterView.classList.contains("hidden")) {
    state.monsterTypeIndex = next;
    renderMonsterEnemy();
  }
}

function gmResetCharacter() {
  state.character = null;
  gameState.gold = 0;
  gameState.gems = 0;
  gameState.inventory = [];
  gameState.unlockedCharacters = ["boy", "girl"];
  gameState.equipped = { hat: null, hair: null, top: null, bottom: null, shoes: null, hand: null };
  gameState.streak = 0;
  gameState.combo = 0;
  gameState.xp = 0;
  gameState.level = 1;
  gameState.stats = { addCorrect: 0, subtractCorrect: 0, multiplyCorrect: 0, divideCorrect: 0 };
  gameState.claimedRewards = [];
  gameState.ownedItems = [];
  gameState.equippedItem = null;
  gameState.gachaPity = { sinceEpic: 0, sinceLegendary: 0 };
  chestMessage.textContent = t("完成 10 題可獲得金幣與 XP。");
  saveCharacterState();
  renderCharacterPanel();
}

function awardPracticeRewards(questionCount, correctCount) {
  if (!state.character || questionCount <= 0) {
    return;
  }
  const earnedGold = Math.max(1, correctCount * 2 + Math.floor(questionCount / 5));
  const wasPerfect = correctCount === questionCount;
  const perfectXpBonus = wasPerfect && questionCount === TOTAL_QUESTIONS ? 5 : 0;
  const earnedXp = Math.max(5, correctCount * 2 + 5 + perfectXpBonus);
  const perfectBonus = wasPerfect && questionCount === TOTAL_QUESTIONS ? PERFECT_BONUS_GOLD : 0;
  gameState.gold += earnedGold + perfectBonus;
  gameState.xp += earnedXp;
  gameState.level = getLevelFromXp(gameState.xp);
  gameState.streak = wasPerfect ? gameState.streak + 1 : 0;
  chestMessage.textContent = state.language === "en"
    ? `Reward: +${earnedGold + perfectBonus} coins, +${earnedXp} XP${perfectBonus ? " (Perfect +3)" : ""}`
    : `獲得獎勵：金幣 +${earnedGold + perfectBonus}，XP +${earnedXp}${perfectBonus ? "（全對 +3）" : ""}`;
  saveCharacterState();
  renderCharacterPanel();
  if (perfectBonus > 0) {
    window.setTimeout(() => showPerfectBonusEffect(), 240);
  }
}

function awardCorrectAnswerCoin(sourceElement) {
  if (!state.character) {
    return;
  }

  gameState.gold += 1;
  saveCharacterState();
  updateTopCoins();
  showCoinFly(sourceElement);
}

function registerCorrectAnswer(sourceElement, operation) {
  state.currentCombo += 1;
  gameState.combo = Math.max(gameState.combo, state.currentCombo);
  recordCorrectOperation(operation);
  awardCorrectAnswerCoin(sourceElement);
  showComboPop(sourceElement);
}

function recordCorrectOperation(operation) {
  const statKeyByOperation = {
    add: "addCorrect",
    subtract: "subtractCorrect",
    multiply: "multiplyCorrect",
    divide: "divideCorrect",
  };
  const statKey = statKeyByOperation[operation];
  if (!statKey) {
    return;
  }
  gameState.stats[statKey] = (Number(gameState.stats[statKey]) || 0) + 1;
}

function resetCurrentCombo() {
  state.currentCombo = 0;
}

function getComboMessage(combo) {
  if (combo >= 10) return "Amazing!";
  if (combo >= 5) return "Great!";
  if (combo >= 3) return "Nice!";
  return "";
}

function showComboPop(sourceElement) {
  const message = getComboMessage(state.currentCombo);
  if (!message || !sourceElement) {
    return;
  }

  const anchor = getComboAnchor(sourceElement);
  const rect = anchor.getBoundingClientRect();
  const combo = document.createElement("div");
  combo.className = `combo-pop combo-${state.currentCombo >= 10 ? "amazing" : state.currentCombo >= 5 ? "great" : "nice"}`;
  combo.innerHTML = `
    <strong>${state.currentCombo} ${t("連續答對")}</strong>
    <span>${message}</span>
  `;
  combo.style.left = `${rect.left + rect.width / 2}px`;
  combo.style.top = `${Math.max(78, rect.top - 12)}px`;
  document.body.appendChild(combo);
  window.setTimeout(() => combo.remove(), 1400);
}

function getComboAnchor(sourceElement) {
  if (!quizView.classList.contains("hidden")) return questionText;
  if (!monsterView.classList.contains("hidden")) return monsterEnemy;
  if (!puzzleView.classList.contains("hidden")) return puzzleQuestion;
  return sourceElement;
}

function showCoinFly(sourceElement, amount = 1) {
  const coinTarget = coinText;
  if (!sourceElement || !coinTarget) {
    return;
  }

  const sourceRect = sourceElement.getBoundingClientRect();
  const targetRect = coinTarget.getBoundingClientRect();
  const coin = document.createElement("div");
  coin.className = "coin-fly";
  coin.innerHTML = `<span class="coin-symbol" aria-hidden="true"></span><strong>+${amount}</strong>`;
  const startX = sourceRect.left + sourceRect.width / 2;
  const startY = sourceRect.top + sourceRect.height / 2;
  const endX = targetRect.left + targetRect.width / 2;
  const endY = targetRect.top + targetRect.height / 2;
  coin.style.left = `${startX}px`;
  coin.style.top = `${startY}px`;
  coin.style.setProperty("--coin-dx", `${endX - startX}px`);
  coin.style.setProperty("--coin-dy", `${endY - startY}px`);
  document.body.appendChild(coin);
  window.setTimeout(() => coin.remove(), 900);
}

function showPerfectBonusEffect() {
  const anchor = !resultView.classList.contains("hidden") ? resultScore : coinText;
  if (!anchor) {
    return;
  }
  const rect = anchor.getBoundingClientRect();
  const bonus = document.createElement("div");
  bonus.className = "perfect-bonus-pop";
  bonus.innerHTML = `<span>${t("完美獎勵")}</span><strong>+${PERFECT_BONUS_GOLD}</strong>`;
  bonus.style.left = `${rect.left + rect.width / 2}px`;
  bonus.style.top = `${Math.max(86, rect.top - 18)}px`;
  document.body.appendChild(bonus);
  showCoinFly(anchor, PERFECT_BONUS_GOLD);
  playChestSound("rare");
  window.setTimeout(() => bonus.remove(), 1600);
}

function startQuiz() {
  clearNextQuestionTimer();
  clearQuizTimer();
  hideRewardChest();
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
  resetCurrentCombo();
  resetCurrentCombo();

  setupView.classList.add("hidden");
  settingsView.classList.add("hidden");
  characterView.classList.add("hidden");
  monsterView.classList.add("hidden");
  puzzleView.classList.add("hidden");
  reciteView.classList.add("hidden");
  resultView.classList.add("hidden");
  quizView.classList.remove("hidden");
  feedbackText.textContent = "";
  feedbackText.className = "feedback";
  updateTopCoins();
  updateTimerDisplay();
  if (state.timedMode) {
    startQuizTimer();
  }
  nextQuestion();
}

function updateSetupMode() {
  const practiceMode = document.querySelector("input[name='practiceMode']:checked").value;
  const miniGameOperation = document.querySelector("input[name='miniGameOperation']:checked")?.value || "add";
  const effectiveMode = practiceMode === "miniGames" ? miniGameOperation : practiceMode;
  const isArithmetic = effectiveMode === "add" || effectiveMode === "subtract";
  miniGameSettings.classList.toggle("hidden", practiceMode !== "miniGames");
  arithmeticSettings.classList.toggle("hidden", !(isArithmetic || practiceMode === "miniGames"));
  practiceOptions.classList.toggle("hidden", practiceMode === "miniGames");
  addDifficultySettings.classList.toggle("hidden", !(effectiveMode === "add" || effectiveMode === "mixed"));
  subtractDifficultySettings.classList.toggle("hidden", !(effectiveMode === "subtract" || effectiveMode === "mixed"));
  multiplySettings.classList.toggle("hidden", !(effectiveMode === "multiply" || effectiveMode === "mixed"));
  divideSettings.classList.toggle("hidden", !(effectiveMode === "divide" || effectiveMode === "mixed"));
  updateStartButtonText();
  updatePracticeSummary();
}

function updateStartButtonText() {
  const practiceMode = document.querySelector("input[name='practiceMode']:checked").value;
  const multiplyMode = document.querySelector("input[name='multiplyMode']:checked").value;
  const miniGameMode = document.querySelector("input[name='miniGameMode']:checked").value;
  const setStartText = (text) => {
    startButton.textContent = text;
    bottomStartButton.textContent = text;
    lobbyStartButton.textContent = text;
  };
  if (practiceMode === "multiply" && multiplyMode.startsWith("recite-")) {
    setStartText(t("開始背誦"));
  } else if (practiceMode === "miniGames") {
    setStartText(miniGameMode === "puzzle" ? t("開始解鎖") : t("開始遊戲"));
  } else {
    setStartText(timedModeToggle.checked
      ? state.language === "en" ? `Start ${getTimeLimitSeconds()} Seconds` : `開始 ${getTimeLimitSeconds()} 秒`
      : t("開始 10 題"));
    lobbyStartButton.textContent = timedModeToggle.checked
      ? lobbyStartButton.textContent
      : "開始冒險";
  }
  updatePracticeSummary();
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
  hideRewardChest();
  state.locked = false;
  state.awaitingNext = false;
  resetCurrentCombo();
  state.questionQueue = null;
  submitAnswerButton.disabled = false;
  submitAnswerButton.textContent = t("確認");
  resultView.classList.add("hidden");
  claimChestButton.classList.add("hidden");
  settingsView.classList.add("hidden");
  characterView.classList.add("hidden");
  monsterView.classList.add("hidden");
  puzzleView.classList.add("hidden");
  quizView.classList.add("hidden");
  reciteView.classList.add("hidden");
  setupView.classList.remove("hidden");
  puzzleResultButton.classList.add("hidden");
  updateTopCoins();
  renderLobby();
  timerText.classList.add("hidden");
  setWritingDisabled(false);
  clearWriting();
  feedbackText.textContent = "";
  feedbackText.className = "feedback";
}

function showSettings() {
  clearNextQuestionTimer();
  clearQuizTimer();
  hideRewardChest();
  setupView.classList.add("hidden");
  characterView.classList.add("hidden");
  quizView.classList.add("hidden");
  monsterView.classList.add("hidden");
  puzzleView.classList.add("hidden");
  reciteView.classList.add("hidden");
  resultView.classList.add("hidden");
  settingsView.classList.remove("hidden");
}

function showCharacter() {
  clearNextQuestionTimer();
  clearQuizTimer();
  hideRewardChest();
  setupView.classList.add("hidden");
  settingsView.classList.add("hidden");
  characterView.classList.add("hidden");
  quizView.classList.add("hidden");
  monsterView.classList.add("hidden");
  puzzleView.classList.add("hidden");
  reciteView.classList.add("hidden");
  resultView.classList.add("hidden");
  characterView.classList.remove("hidden");
  renderCharacterPanel();
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
  state.monsterTypeIndex = getNextMonsterTypeIndex();
  state.reviewRecords = [];
  resetCurrentCombo();
  setupView.classList.add("hidden");
  settingsView.classList.add("hidden");
  characterView.classList.add("hidden");
  quizView.classList.add("hidden");
  puzzleView.classList.add("hidden");
  reciteView.classList.add("hidden");
  resultView.classList.add("hidden");
  monsterView.classList.remove("hidden");
  updateTopCoins();
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
  monsterQuestionCount.textContent = formatQuestionCounter(state.monsterCurrent, TOTAL_QUESTIONS);
  monsterScoreText.textContent = formatHits(state.monsterScore);
  monsterQuestion.textContent = state.monsterQuestion.text;
  monsterFeedback.textContent = "";
  monsterFeedback.className = "feedback hidden";
  renderMonsterEnemy();
  renderMonsterHealth();
  renderMonsterChoices();
}

function renderMonsterEnemy() {
  const monster = monsterTypes[state.monsterTypeIndex % monsterTypes.length];
  monsterEnemy.className = `monster monster-${monster.id}`;
  monsterEnemy.setAttribute("aria-label", monster.name);
  monsterEnemy.innerHTML = `
    ${monster.image ? `<img class="monster-art monster-image" src="${monster.image}" alt="" aria-hidden="true" />` : makeMonsterSvg(monster.id)}
    <span class="monster-name">${monster.name}</span>
  `;
}

function getNextMonsterTypeIndex() {
  const key = "mathPracticeMonsterIndex";
  const current = Number(localStorage.getItem(key)) || 0;
  localStorage.setItem(key, String((current + 1) % monsterTypes.length));
  return current % monsterTypes.length;
}

function makeMonsterSvg(monsterId) {
  if (monsterId === "werewolf") {
    return `
      <svg class="monster-art" viewBox="0 0 220 220" aria-hidden="true">
        <ellipse class="monster-shadow" cx="110" cy="196" rx="64" ry="14" />
        <path d="M52 84 L78 28 L102 74 Z" fill="#8b5a33"/>
        <path d="M168 84 L142 28 L118 74 Z" fill="#8b5a33"/>
        <path d="M48 112 C48 56 84 42 110 42 C146 42 172 65 172 112 C172 160 144 188 110 188 C76 188 48 160 48 112 Z" fill="#a87343"/>
        <path d="M75 65 C92 38 128 38 145 65 C132 58 88 58 75 65 Z" fill="#5f3922"/>
        <circle cx="82" cy="103" r="13" fill="#fff"/>
        <circle cx="138" cy="103" r="13" fill="#fff"/>
        <circle cx="84" cy="105" r="7" fill="#263238"/>
        <circle cx="136" cy="105" r="7" fill="#263238"/>
        <path d="M92 136 Q110 154 128 136" fill="none" stroke="#263238" stroke-width="7" stroke-linecap="round"/>
        <path d="M98 135 L104 151 L112 135 L120 151 L126 135" fill="#fff"/>
        <ellipse cx="110" cy="121" rx="18" ry="13" fill="#5f3922"/>
      </svg>
    `;
  }
  if (monsterId === "zombie") {
    return `
      <svg class="monster-art" viewBox="0 0 220 220" aria-hidden="true">
        <ellipse class="monster-shadow" cx="110" cy="196" rx="62" ry="14" />
        <path d="M52 116 C52 62 82 42 112 42 C150 42 174 68 174 116 C174 160 146 186 110 186 C76 186 52 158 52 116 Z" fill="#92c77d"/>
        <path d="M70 70 C92 42 130 42 152 70 C128 64 94 64 70 70 Z" fill="#486b42"/>
        <path d="M78 84 L98 66 L118 84 L140 64 L154 88" fill="none" stroke="#486b42" stroke-width="10" stroke-linecap="round"/>
        <circle cx="82" cy="106" r="13" fill="#fff"/>
        <circle cx="140" cy="106" r="13" fill="#fff"/>
        <circle cx="86" cy="109" r="5" fill="#263238"/>
        <circle cx="136" cy="103" r="5" fill="#263238"/>
        <path d="M88 145 Q110 134 132 145" fill="none" stroke="#263238" stroke-width="7" stroke-linecap="round"/>
        <path d="M60 128 L40 140 M162 128 L184 140" stroke="#92c77d" stroke-width="18" stroke-linecap="round"/>
        <path d="M116 75 L142 82" stroke="#263238" stroke-width="6" stroke-linecap="round"/>
      </svg>
    `;
  }
  return `
    <svg class="monster-art" viewBox="0 0 220 220" aria-hidden="true">
      <ellipse class="monster-shadow" cx="110" cy="196" rx="62" ry="14" />
      <path d="M42 164 C52 92 64 48 110 48 C156 48 168 92 178 164 C150 188 70 188 42 164 Z" fill="#4d315f"/>
      <path d="M62 76 C75 48 94 36 110 36 C126 36 145 48 158 76 C142 66 78 66 62 76 Z" fill="#263238"/>
      <circle cx="82" cy="105" r="14" fill="#fff"/>
      <circle cx="138" cy="105" r="14" fill="#fff"/>
      <circle cx="84" cy="107" r="7" fill="#263238"/>
      <circle cx="136" cy="107" r="7" fill="#263238"/>
      <path d="M88 138 Q110 154 132 138" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
      <path d="M98 140 L104 160 L112 140 L120 160 L126 140" fill="#fff"/>
      <path d="M56 166 C36 150 28 124 38 98 C52 118 62 140 56 166 Z" fill="#2f203d"/>
      <path d="M164 166 C184 150 192 124 182 98 C168 118 158 140 164 166 Z" fill="#2f203d"/>
    </svg>
  `;
}

function makeMonsterQuestion() {
  return makeMiniGameQuestion("monster");
}

function makeMiniGameQuestion(gameType) {
  const selectedOperation = state.miniGameOperation || "add";
  const operations = ["add", "subtract", "multiply", "divide"];
  const operation = selectedOperation === "mixed"
    ? operations[randomInt(0, operations.length - 1)]
    : selectedOperation;
  const question = makeQuestion(operation, state.digits, state.multiplyMode, state.divideMode);
  return {
    ...question,
    choices: makeChoices(question.answer),
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
    monsterFeedback.textContent = t("打中了！");
    monsterFeedback.className = "feedback feedback-card correct";
    playMonsterAttackAnimation();
    registerCorrectAnswer(monsterEnemy, state.monsterQuestion.operation);
    playFeedbackSound(true);
  } else {
    resetCurrentCombo();
    monsterFeedback.textContent = formatWrongAnswer(state.monsterQuestion.answer);
    monsterFeedback.className = "feedback feedback-card wrong";
    playMonsterMissAnimation();
    playFeedbackSound(false);
  }

  monsterScoreText.textContent = formatHits(state.monsterScore);
  updateTopCoins();
  renderMonsterHealth();
  window.setTimeout(nextMonsterQuestion, isCorrect ? 800 : 1200);
}

function playMonsterAttackAnimation() {
  monsterEnemy.classList.remove("miss");
  monsterEnemy.classList.add("hit");
  const slash = document.createElement("span");
  slash.className = "monster-attack-effect";
  slash.textContent = "✦";
  monsterEnemy.appendChild(slash);
  window.setTimeout(() => slash.remove(), 520);
}

function playMonsterMissAnimation() {
  monsterEnemy.classList.remove("hit");
  monsterEnemy.classList.add("miss");
  const miss = document.createElement("span");
  miss.className = "monster-miss-effect";
  miss.textContent = "MISS";
  monsterEnemy.appendChild(miss);
  window.setTimeout(() => miss.remove(), 680);
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
    resultMessage.textContent = t("怪物被打倒了，全部答對！");
  } else if (state.monsterScore >= 7) {
    resultMessage.textContent = t("打得很好，怪物快撐不住了！");
  } else {
    resultMessage.textContent = t("再練一輪，下一次打得更準。");
  }
  saveDailyPractice(TOTAL_QUESTIONS, state.monsterScore);
  awardPracticeRewards(TOTAL_QUESTIONS, state.monsterScore);
  prepareResultChest(TOTAL_QUESTIONS);
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
  resetCurrentCombo();
  setupView.classList.add("hidden");
  settingsView.classList.add("hidden");
  characterView.classList.add("hidden");
  quizView.classList.add("hidden");
  monsterView.classList.add("hidden");
  reciteView.classList.add("hidden");
  resultView.classList.add("hidden");
  puzzleView.classList.remove("hidden");
  updateTopCoins();
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
  puzzleQuestionCount.textContent = formatQuestionCounter(state.puzzleCurrent, PUZZLE_QUESTIONS);
  puzzleScoreText.textContent = formatPuzzleScore(state.puzzleScore);
  puzzleQuestion.textContent = state.puzzleQuestion.text;
  puzzleFeedback.textContent = "";
  puzzleFeedback.className = "feedback hidden";
  puzzleResultButton.classList.add("hidden");
  renderPuzzleChoices();
}

function pickPuzzleImage() {
  if (puzzleAssets.length > 0) {
    return puzzleAssets[randomInt(0, puzzleAssets.length - 1)];
  }
  const images = [
    { name: "小貓", enName: "Cat", theme: "cat" },
    { name: "恐龍", enName: "Dinosaur", theme: "dino" },
    { name: "太空船", enName: "Rocket", theme: "rocket" },
    { name: "寶箱", enName: "Treasure Chest", theme: "treasure" },
    { name: "勇者", enName: "Hero", theme: "hero" },
    { name: "生日蛋糕", enName: "Birthday Cake", theme: "cake" },
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
  puzzleBoard.setAttribute(
    "aria-label",
    state.language === "en" ? `${image.enName} puzzle` : `${image.name}拼圖`,
  );
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
    puzzleFeedback.textContent = t("解鎖一片！");
    puzzleFeedback.className = "feedback feedback-card correct";
    registerCorrectAnswer(puzzleBoard, state.puzzleQuestion.operation);
    playFeedbackSound(true);
  } else {
    resetCurrentCombo();
    puzzleFeedback.textContent = formatWrongAnswer(state.puzzleQuestion.answer);
    puzzleFeedback.className = "feedback feedback-card wrong";
    playFeedbackSound(false);
  }

  puzzleScoreText.textContent = formatPuzzleScore(state.puzzleScore);
  updateTopCoins();
  renderPuzzleBoard();
  if (state.puzzleScore === PUZZLE_QUESTIONS) {
    finishPuzzleUnlock();
    return;
  }
  window.setTimeout(nextPuzzleQuestion, isCorrect ? 800 : 1200);
}

function finishPuzzleUnlock() {
  puzzleQuestionCount.textContent = t("拼圖完成");
  puzzleScoreText.textContent = formatPuzzleScore(PUZZLE_QUESTIONS);
  puzzleQuestion.textContent = state.language === "en"
    ? `${state.puzzleImage.enName} complete!`
    : `${state.puzzleImage.name}完成！`;
  puzzleChoices.innerHTML = "";
  puzzleFeedback.textContent = t("全部拼好了，先看一下完成的圖片。");
  puzzleFeedback.className = "feedback feedback-card correct";
  puzzleResultButton.classList.remove("hidden");
}

function showPuzzleResult() {
  puzzleView.classList.add("hidden");
  resultView.classList.remove("hidden");
  resultScore.textContent = `${state.puzzleScore} / ${PUZZLE_QUESTIONS}`;
  if (state.puzzleScore === PUZZLE_QUESTIONS) {
    resultMessage.textContent = state.language === "en"
      ? `${state.puzzleImage.enName} fully unlocked. Perfect!`
      : `${state.puzzleImage.name}完整解鎖，全部答對！`;
  } else if (state.puzzleScore >= 6) {
    resultMessage.textContent = state.language === "en"
      ? `${state.puzzleImage.enName} is almost complete. Try again to finish it.`
      : `${state.puzzleImage.name}快完成了，再玩一次就能補滿。`;
  } else {
    resultMessage.textContent = t("先解開幾片也很棒，下一輪繼續。");
  }
  saveDailyPractice(PUZZLE_QUESTIONS, state.puzzleScore);
  awardPracticeRewards(PUZZLE_QUESTIONS, state.puzzleScore);
  prepareResultChest(PUZZLE_QUESTIONS);
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
  resetCurrentCombo();
  setupView.classList.add("hidden");
  settingsView.classList.add("hidden");
  characterView.classList.add("hidden");
  monsterView.classList.add("hidden");
  puzzleView.classList.add("hidden");
  reciteView.classList.add("hidden");
  resultView.classList.add("hidden");
  quizView.classList.remove("hidden");
  feedbackText.textContent = "";
  feedbackText.className = "feedback";
  updateTimerDisplay();
  updateTopCoins();
  nextQuestion();
}

function showRecitation(tableNumber) {
  state.multiplyMode = `recite-${tableNumber}`;
  setupView.classList.add("hidden");
  settingsView.classList.add("hidden");
  characterView.classList.add("hidden");
  monsterView.classList.add("hidden");
  puzzleView.classList.add("hidden");
  quizView.classList.add("hidden");
  resultView.classList.add("hidden");
  reciteView.classList.remove("hidden");
  updateTopCoins();
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
  toggleAnswersButton.textContent = state.reciteAnswersHidden ? t("顯示答案") : t("遮住答案");
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
  reciteTitle.textContent = state.language === "en" ? `${tableNumber} Times Table` : `${tableNumber} 的乘法表`;
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
    ? formatQuestionNumber(state.current)
    : formatQuestionCounter(state.current, state.totalQuestions);
  scoreText.textContent = formatScore(state.score);
  progressFill.style.width = state.timedMode
    ? `${((getTimeLimitSeconds() - state.secondsLeft) / getTimeLimitSeconds()) * 100}%`
    : `${((state.current - 1) / state.totalQuestions) * 100}%`;
  answerInput.value = "";
  submitAnswerButton.disabled = false;
  submitAnswerButton.textContent = t("確認");
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
    feedbackText.textContent = t("先在答案格寫答案喔");
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
    feedbackText.textContent = t("答對了！");
    feedbackText.className = "feedback feedback-card correct";
    submitAnswerButton.disabled = true;
    registerCorrectAnswer(answerForm, state.question.operation);
    playFeedbackSound(true);
  } else {
    resetCurrentCombo();
    feedbackText.textContent = formatWrongAnswer(getAnswerDisplay(state.question));
    feedbackText.className = "feedback feedback-card wrong";
    state.awaitingNext = true;
    submitAnswerButton.textContent = t("下一題");
    playFeedbackSound(false);
  }

  updateTopCoins();
  scoreText.textContent = formatScore(state.score);
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
    resultMessage.textContent = t("這次還沒作答，準備好再試一次。");
  } else if (state.score === resultTotal) {
    resultMessage.textContent = t("全部答對，太厲害了！");
  } else if (state.score / resultTotal >= 0.8) {
    resultMessage.textContent = t("很棒，繼續保持！");
  } else if (state.score / resultTotal >= 0.5) {
    resultMessage.textContent = t("有進步，再練一輪會更熟。");
  } else {
    resultMessage.textContent = t("慢慢來，每次多會一點就很好。");
  }

  saveDailyPractice(resultTotal, state.score);
  awardPracticeRewards(resultTotal, state.score);
  prepareResultChest(resultTotal);
  renderDailySummary();
  renderReviewRecords();
}

function updateTopCoins() {
  coinText.innerHTML = formatCoinDisplay(gameState.gold);
  if (lobbyChestButton) {
    lobbyChestButton.disabled = gameState.gold < CHEST_COST || !state.character;
  }
}

function formatCoinDisplay(coins) {
  return `<span class="coin-symbol" aria-hidden="true"></span><span>${coins}</span>`;
}

function renderReviewRecords() {
  const wrongCount = state.reviewRecords.filter((record) => !record.isCorrect).length;
  document.querySelector("#wrongOnlyButton").classList.toggle("hidden", wrongCount === 0);
  reviewPanel.classList.toggle("hidden", state.reviewRecords.length === 0);
  reviewList.innerHTML = state.reviewRecords.map((record, index) => {
    const status = record.isCorrect ? t("答對") : t("答錯");
    const answerText = record.isCorrect
      ? state.language === "en" ? `You wrote ${record.userAnswerDisplay}` : `你寫 ${record.userAnswerDisplay}`
      : state.language === "en"
        ? `You wrote ${record.userAnswerDisplay}; answer: ${getAnswerDisplay(record.question)}`
        : `你寫 ${record.userAnswerDisplay}，答案是 ${getAnswerDisplay(record.question)}`;
    return `
      <div class="review-row ${record.isCorrect ? "correct" : "wrong"}">
        <span>${state.language === "en" ? `Question ${index + 1}` : `第 ${index + 1} 題`}</span>
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
  const operations = ["add", "subtract", "multiply", "divide"];
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

function playChestSound(stage) {
  if (!state.soundEnabled) {
    return;
  }

  audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
  const now = audioContext.currentTime;
  const noteSets = {
    opening: [196, 246.94, 293.66],
    common: [392, 523.25],
    rare: [523.25, 659.25, 783.99],
    epic: [493.88, 622.25, 739.99, 987.77],
    legendary: [523.25, 659.25, 783.99, 1046.5, 1318.51],
  };
  const notes = noteSets[stage] || noteSets.common;
  notes.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = now + index * (stage === "legendary" ? 0.07 : 0.08);
    oscillator.type = stage === "legendary" ? "triangle" : "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(stage === "legendary" ? 0.16 : 0.11, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + (stage === "legendary" ? 0.22 : 0.14));
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(start);
    oscillator.stop(start + (stage === "legendary" ? 0.24 : 0.16));
  });
}

function playEquipSound(rarity = "common") {
  if (!state.soundEnabled) {
    return;
  }

  audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
  const now = audioContext.currentTime;
  const settings = {
    common: { start: 520, end: 980, duration: 0.2, sparkles: [1244.51, 1567.98], volume: 0.08 },
    rare: { start: 560, end: 1320, duration: 0.26, sparkles: [1396.91, 1760, 2093], volume: 0.1 },
    epic: { start: 620, end: 1660, duration: 0.34, sparkles: [1567.98, 2093, 2637.02, 3135.96], volume: 0.115 },
    legendary: { start: 700, end: 2200, duration: 0.44, sparkles: [1760, 2349.32, 2793.83, 3520, 4186.01], volume: 0.13 },
  };
  const sound = settings[rarity] || settings.common;
  const sweep = audioContext.createOscillator();
  const sweepGain = audioContext.createGain();
  sweep.type = "triangle";
  sweep.frequency.setValueAtTime(sound.start, now);
  sweep.frequency.exponentialRampToValueAtTime(sound.end, now + sound.duration);
  sweepGain.gain.setValueAtTime(0.0001, now);
  sweepGain.gain.exponentialRampToValueAtTime(sound.volume, now + 0.025);
  sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + sound.duration);
  sweep.connect(sweepGain);
  sweepGain.connect(audioContext.destination);
  sweep.start(now);
  sweep.stop(now + sound.duration + 0.02);

  sound.sparkles.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = now + 0.055 + index * (rarity === "legendary" ? 0.055 : 0.045);
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(sound.volume * 0.72, start + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.09);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.105);
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
        <strong>${t("今天還沒完成練習")}</strong>
        <span>${t("完成一回合後，這裡會記錄題數和答對率。")}</span>
      </div>
    `;
    return;
  }

  const accuracy = Math.round((data.correct / data.questions) * 100);
  dailySummary.innerHTML = `
    <div class="daily-stats">
      <div>
        <strong>${data.sessions}</strong>
        <span>${t("完成次數")}</span>
      </div>
      <div>
        <strong>${data.questions}</strong>
        <span>${t("練習題數")}</span>
      </div>
      <div>
        <strong>${accuracy}%</strong>
        <span>${t("答對率")}</span>
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
  timerText.textContent = state.language === "en" ? `${state.secondsLeft} seconds left` : `剩 ${state.secondsLeft} 秒`;
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
