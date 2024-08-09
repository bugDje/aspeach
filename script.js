const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls .touch");
const facile = document.querySelector(".facile");
const moyen = document.querySelector(".moyen");
const difficile = document.querySelector(".difficile");
const impossible = document.querySelector(".impossible");
const menu = document.querySelector(".play-menu");
const menuOver = document.querySelector(".game-over");
const replay = document.querySelector(".replay");
const quit = document.querySelector(".quit");


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


const croque = () => {
  const audio = new Audio()
    audio.src = "./audio/s-croque.mp3";
    audio.play();  
};
const mur = () => {
  const audio = new Audio()
    audio.src = "./audio/s-mur.mp3";
    audio.play();  
};
const pop = () => {
  const audio = new Audio()
    audio.src = "./audio/pop.mp3";
    audio.play();  
};

// Meilleur score stocké dans le local Storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `Meilleur Score: ${highScore}`;

const crescendo = () => {
  if(cre === true){
    clearInterval(setIntervalId);
    setIntervalId = setInterval(initGame, vitesse);
    vitesse--;
    console.log("cre actif")
   }
};

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  console.log("handlegameover");
  //message de fin de jeu et recharge la page
  clearInterval(setIntervalId);
  menuOver.style.visibility = "visible";
};

quit.addEventListener("click", ()=>{
  location.reload();
});
replay.addEventListener("click", ()=>{
  if(cre === true){
    location.reload();
    console.log("replay");
  setIntervalId = setInterval(initGame, 125);
  vitesse;
  cre = true;
  menuOver.style.visibility = "hidden";
 
  }
});

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
    snakeBody.push([foodX,foodY]);
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
facile.addEventListener("click", () => {
  setIntervalId = setInterval(initGame, 200);
  vitesse = 200;
  menu.style.visibility = "hidden";
  console.log(facile);
});
moyen.addEventListener("click", () => {
  setIntervalId = setInterval(initGame, 150);
  vitesse = 150;
  menu.style.visibility = "hidden";
});

difficile.addEventListener("click", () => {
  setIntervalId = setInterval(initGame, 100);
  vitesse = 100;
  menu.style.visibility = "hidden";
});
impossible.addEventListener("click", () => {
  setIntervalId = setInterval(initGame, 125);
  vitesse;
  cre = true;
  menu.style.visibility = "hidden";
});

document.addEventListener("keydown", changeDirection);
