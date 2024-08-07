const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls .touch");

let gameOver = false;
let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
  let snakeBody = [];
let velocityX = 0,
  velocityY = 0;
  let setIntervalId;
  let score = 0;

  // Meilleur score stocké dans le local Storage
  let highScore = localStorage.getItem('high-score') || 0;
  highScoreElement.innerText = `Meilleur Score: ${highScore}`;

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  //recharge la page
  clearInterval(setIntervalId);
  alert("Perdu !! Recommencer?");
  location.reload();
}

const changeDirection = (e) => {
  // associe touche clavier direction serpent && evite qu'on puisse revenir en arriere
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
    console.log("up");
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
    console.log("down");
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
    console.log("left");
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
    console.log("right");
  }
};
controls.forEach(key => {
  key.addEventListener("click", () => changeDirection({
    key: key.dataset.key
  }));
  
});

const initGame = () => {
  if(gameOver) return handleGameOver();
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div> `;

  // Quand le serpent mange le fruit
  if(snakeX === foodX && snakeY === foodY){
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = `Meilleur Score: ${highScore}`;

    console.log(snakeBody);
  }
  // synchronise la div avec la tête du serpent
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];    
  }

  snakeBody[0] = [snakeX, snakeY]; 

  // synchronise la tête et le corp du serpent
  snakeX += velocityX;
  snakeY += velocityY;

  if(snakeX <= 0 || snakeX > 30 ||snakeY <= 0 || snakeY > 30){
    gameOver = true;
    console.log("perdu !!!")
  }

  //ajoute une div quand le serpert mange un fruit
  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div> `;

    //perdu quand le serpent se mord la queue
    if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
      gameOver = true;
      console.log("je me suis mordu");
    }    
  }  
  playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setIntervalId = setInterval(initGame, 200);

document.addEventListener("keydown", changeDirection);
