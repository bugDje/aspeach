const playBoard = document.querySelector(".play-board");
const wrapper = document.querySelector(".wrapper");
const shake = document.querySelector(".shake");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const modeElement = document.querySelector(".mode-jeu");
const controls = document.querySelectorAll(".controls .touch");
const facile = document.querySelector(".facile");
const moyen = document.querySelector(".moyen");
const difficile = document.querySelector(".difficile");
const impossible = document.querySelector(".impossible");
const menu = document.querySelector(".play-menu");
const mode = document.querySelector(".play-mode");
const menuOver = document.querySelector(".game-over");
const replay = document.querySelector(".replay");
const quit = document.querySelector(".quit");
const continuer = document.querySelector(".continuer");
const modeButton = document.querySelector(".mode-btn");
const snake = document.querySelector("#snake-img");
const guide = document.querySelector(".guide");

let gameOver = false;
let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let snakeBody = [];
let velocityX = 0,
  velocityY = 0;
let setIntervalId;
let vitesse = 125;
let score = 0;
let cre = false;
let fac = false;
let moy = false;
let dif = false;
let countLvl = 1;

const btnRing = () => {
  const audio = new Audio();
  audio.src = "./audio/s-btn.mp3";
  audio.play();
};
const serpentRing0 = () => {
  const audio = new Audio();
  audio.src = "./audio/s-serpent.mp3";
  audio.play();
};
const serpentRing1 = () => {
  const audio = new Audio();
  audio.src = "./audio/s-serpent1.mp3";
  audio.play();
};
const croque = () => {
  const audio = new Audio();
  audio.src = "./audio/s-croque.mp3";
  audio.play();
};
const mur = () => {
  const audio = new Audio();
  audio.src = "./audio/s-boom.mp3";
  audio.play();
};
const pop = () => {
  const audio = new Audio();
  audio.src = "./audio/pop.mp3";
  audio.play();
};

function fFacile() {
  setIntervalId = setInterval(initGame, 200);
  vitesse = 200;
  mode.style.visibility = "hidden";
  fac = true;
  cre = false;
  moy = false;
  dif = false;
  modeElement.innerText = `Mode: Facile `;
  console.log(facile);
}
function fMoyen() {
  setIntervalId = setInterval(initGame, 150);
  vitesse = 150;
  moy = true;
  cre = false;
  fac = false;
  dif = false;
  modeElement.innerText = `Mode: Moyen `;
  mode.style.visibility = "hidden";
}
function fDifficile() {
  setIntervalId = setInterval(initGame, 100);
  vitesse = 100;
  dif = true;
  cre = false;
  fac = false;
  moy = false;
  modeElement.innerText = `Mode: Difficile `;
  mode.style.visibility = "hidden";
}
function fImpossible() {
  setIntervalId = setInterval(initGame, 125);
  vitesse = 125;
  cre = true;
  fac = false;
  moy = false;
  dif = false;
  modeElement.innerText = `Mode: Crescendo `;
  mode.style.visibility = "hidden";
}

function reloadGame() {
  gameOver = false;
  foodX, foodY;
  (snakeX = 5), (snakeY = 10);
  snakeBody = [];
  (velocityX = 0), (velocityY = 0);
  setIntervalId;
  score = 0;
  countLvl = 1;
}

// Meilleur score stocké dans le local Storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `Meilleur Score: ${highScore}`;

const crescendo = () => {
  if (cre === true) {
    clearInterval(setIntervalId);
    setIntervalId = setInterval(initGame, vitesse);
    vitesse--;
    creNiveau();
    countLvl++;
    console.log(vitesse);
  }
};
function creNiveau() {
  if (countLvl < 5) {
    modeElement.innerText = `Mode: Crescendo | Niveau 1`;
  } else if (countLvl < 11) {
    modeElement.innerText = `Mode: Crescendo | Niveau 2`;
  } else if (countLvl < 18) {
    modeElement.innerText = `Mode: Crescendo | Niveau 3`;
  } else if (countLvl < 25) {
    modeElement.innerText = `Mode: Crescendo | Niveau 4`;
  } else if (countLvl < 34) {
    modeElement.innerText = `Mode: Crescendo | Niveau 5`;
  } else if (countLvl < 44) {
    modeElement.innerText = `Mode: Crescendo | Niveau 6`;
  } else if (countLvl < 55) {
    modeElement.innerText = `Mode: Crescendo | Niveau 7`;
  } else if (countLvl < 67) {
    modeElement.innerText = `Mode: Crescendo | Niveau 8`;
  } else if (countLvl < 80) {
    modeElement.innerText = `Mode: Crescendo | Niveau 9`;
  } else if (countLvl < 93) {
    modeElement.innerText = `Mode: Crescendo | Niveau 10`;
  } else if (countLvl < 100) {
    modeElement.innerText = `Mode: Crescendo | Niveau InSane`;
  }
}

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  console.log("handlegameover");
  //message de fin de jeu et recharge la page
  clearInterval(setIntervalId);
  menuOver.style.visibility = "visible";
  wrapper.classList.remove("shake");
  snake.classList.add("active-snake");

  serpentRing1();
};

continuer.addEventListener("click", () => {
  serpentRing0();
  menu.style.visibility = "hidden";
  mode.style.visibility = "visible";
});
modeButton.addEventListener("click", () => {
  btnRing();
  menuOver.style.visibility = "hidden";
  mode.style.visibility = "visible";
  scoreElement.innerText = `Score: 0`;
  snake.classList.remove("active-snake");
  reloadGame();
});
quit.addEventListener("click", () => {
  btnRing();
  location.reload();
});
replay.addEventListener("click", () => {
  snake.classList.remove("active-snake");
  btnRing();
  if (cre === true) {
    console.log("replay");
    console.log("crescendo");
    menuOver.style.visibility = "hidden";
    scoreElement.innerText = `Score: 0`;
    modeElement.innerText = `Mode: Crescendo `;
    reloadGame();
    fImpossible();
  } else if (fac === true) {
    console.log("replay");
    console.log("facile");
    menuOver.style.visibility = "hidden";
    scoreElement.innerText = `Score: 0`;
    modeElement.innerText = `Mode: Facile `;
    fFacile();
    reloadGame();
  } else if (moy === true) {
    console.log("replay");
    console.log("moyen");
    menuOver.style.visibility = "hidden";
    scoreElement.innerText = `Score: 0`;
    modeElement.innerText = `Moyen`;
    fMoyen();
    reloadGame();
  } else if (dif === true) {
    console.log("replay");
    console.log("Difficile");
    menuOver.style.visibility = "hidden";
    scoreElement.innerText = `Score: 0`;
    modeElement.innerText = `Mode: Difficile `;
    fDifficile();
    reloadGame();
  } else {
    console.log("replay marche pas");
  }
});
function modeSelect() {
  if (cre === true) {
    modeElement.innerText = `Mode: Crescendo `;
  } else if (fac === true) {
    modeElement.innerText = `Mode: Facile `;
  } else if (moy === true) {
    modeElement.innerText = `Mode: Moyen `;
  } else if (dif === true) {
    modeElement.innerText = `Mode: Difficile`;
  } else {
    console.log("mode ne marche pas");
  }
}

const changeDirection = (e) => {
guide.style.display = "none";
  // associe touche clavier direction serpent && evite qu'on puisse revenir en arriere
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

// mode Tactile
controls.forEach((key) => {
  key.addEventListener("click", () =>
    changeDirection({
      key: key.dataset.key,
    })
  );
});

const initGame = () => {
  if (gameOver) return handleGameOver();
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div> `;

  // Quand le serpent mange le fruit
  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    changeFoodPosition();
    pop();
    score++;
    crescendo();
    console.log(vitesse);
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = `Meilleur Score: ${highScore}`;
  }
  // synchronise la div avec la tête du serpent
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  // synchronise la tête et le corp du serpent
  snakeX += velocityX;
  snakeY += velocityY;

  // perdu si le serpent touche le mur
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    wrapper.classList.add("shake");
    console.log(wrapper);
    mur();

    gameOver = true;
  }

  //ajoute une div quand le serpert mange un fruit
  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div> `;

    //perdu quand le serpent se mord la queue
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      croque();
      gameOver = true;
    }
  }
  playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();

// setIntervalId = setInterval(initGame, 300);

// Mode de jeu
facile.addEventListener("click", fFacile);
moyen.addEventListener("click", fMoyen);
difficile.addEventListener("click", fDifficile);
impossible.addEventListener("click", fImpossible);

// commande
document.addEventListener("keydown", changeDirection);
