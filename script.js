const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls .touch");
const facile = document.querySelector(".facile");
const moyen = document.querySelector(".moyen");
const difficile = document.querySelector(".difficile");

let gameOver = false;
let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let snakeBody = [];
let velocityX = 0,
  velocityY = 0;
let setIntervalId;
let vitesse = 100;
let score = 0;
console.log(vitesse);

// Meilleur score stocké dans le local Storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `Meilleur Score: ${highScore}`;

const crescendo = () => {
  setIntervalId = setInterval(initGame, vitesse);
};

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  console.log("handlegameover");
  //message de fin de jeu et recharge la page
  clearInterval(setIntervalId);
  alert("Perdu !! Recommencer?");
  location.reload();
};

const changeDirection = (e) => {
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
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
    score++;
    clearInterval(setIntervalId);
    vitesse--;
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
      gameOver = true;
    }
  }
  playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();

// setIntervalId = setInterval(initGame, 300);
facile.addEventListener("click", () => {
  setIntervalId = setInterval(initGame, 200);
  vitesse = 200;
  console.log(facile);
});
moyen.addEventListener("click", () => {
  setIntervalId = setInterval(initGame, 125);
  vitesse = 125;
});
difficile.addEventListener("click", () => {
  setIntervalId = setInterval(initGame, 50);
  vitesse = 50;
});

document.addEventListener("keydown", changeDirection);
