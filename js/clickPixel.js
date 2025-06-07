const divSize = 81;
let numberIndex = 0;
let gameScore = 0;
let gameHighScore = 0;
let startNumber = 0;
let lastNumber = 0;
let isClicked = false;
let isStart = false;
let isLast = false;
let randomNumber = [];
let movingDiv = [];
let divColor;

const root = document.getElementById("root");
const startButton = document.getElementById("start");
const reStartButton = document.getElementById("reStart");
const score = document.getElementById("score");
const highScore = document.getElementById("highScore");

function addEventMouseOver(click) {
  click.addEventListener("mouseover", () => {
    if (isClicked) {
      if (click.getAttribute("style") === null) {
        movingDiv.push(click);
        click.style = divColor;
      } else if (isStart && click.getAttribute("id") == lastNumber) {
        startGame();
        gameScore++;
        score.innerText = gameScore;
        movingDiv = [];
        isClicked = false;
      } else if(isLast && click.getAttribute("id") == startNumber) {
        startGame();
        gameScore++;
        score.innerText = gameScore;
        movingDiv = [];
        isClicked = false;
      } else {
        movingDiv.forEach(div => {
          div.removeAttribute("style");
        })
        movingDiv = [];
        isClicked = false;
      }
    }
  })
}

function addEventMouseDown(click) {
  click.addEventListener("mousedown", () => {
    isClicked = true;
    isStart = false;
    isLast = false;
    if (click.getAttribute("id") == startNumber) {
      isStart = true;
    } else if (click.getAttribute("id") == lastNumber) {
      isLast = true;
    }
    if (click.getAttribute("style") !== null) {
      divColor = click.getAttribute("style");
    }
  })
}

function addEventMouseUp(click) {
  click.addEventListener("mouseup", () => {
    movingDiv.forEach(div => {
      div.removeAttribute("style");
    })
    isClicked = false;
  })
}

function clickDiv(idValue) {
  let click = document.getElementById(idValue);
  addEventMouseOver(click);
  addEventMouseDown(click);
  addEventMouseUp(click);
}

function randomNotDupe() {
  let isLoop = true;
  while (isLoop) {
    if (randomNumber.length === divSize) {
      isLoop = false;
    } else {
      random = Math.floor(Math.random() * divSize);
      if (!randomNumber.includes(random)) {
        randomNumber.push(random);
      }
    }
  }
}

function makeDiv() {
  for (let i = 0; i < 81; i++) {
    const div = document.createElement("div");
    div.setAttribute("class", "border-1px w-2 h-2 clickDiv");
    div.setAttribute("id", i);
    root.append(div);
    clickDiv(i);
  }
  randomNotDupe();
}

makeDiv();

function makeBackgroundColor() {
  let redColor = Math.floor(Math.random() * 255);
  let greenColor = Math.floor(Math.random() * 255);
  let blueColor = Math.floor(Math.random() * 255);
  return `rgb(${redColor}, ${greenColor}, ${blueColor})`;
}

function startButtonDisabled(isDisabled) {
  if (isDisabled) {
    startButton.setAttribute("disabled", "true");
  } else {
    startButton.removeAttribute("disabled");
  }
}

function startGame() {
  let isLoop = true;
  let divBackgroundColor = makeBackgroundColor();
  let printCount = 0;
  startNumber = 0;
  lastNumber = 0;
  while (isLoop) {
    const div = document.getElementById(randomNumber[numberIndex]);
    if (div.style.background === "") {
      div.style.background = divBackgroundColor;
      startButtonDisabled(true);
      if (startNumber === 0) {
        startNumber = randomNumber[numberIndex];
      } else {
        lastNumber = randomNumber[numberIndex];
      }
      printCount++;
      numberIndex++;
    } else {
      numberIndex++;
    }
    if (printCount !== 0 && (printCount % 2) === 0) {
      isLoop = false;
    }
  }
}

startButton.addEventListener("click", () => {
  startGame();
  reStartButtonDisabled(false);
})


function removeDiv() {
  const childNodeList = document.getElementById("root").childNodes;
  childNodeList.forEach(childNode => {
    childNode.removeAttribute("style");
  })
}

function reStartButtonDisabled(isDisabled) {
  if (isDisabled) {
    reStartButton.setAttribute("disabled", "true");
  } else {
    reStartButton.removeAttribute("disabled");
  }
}

reStartButton.addEventListener("click", () => {
  if (gameHighScore < gameScore) {
    gameHighScore = gameScore;
    highScore.innerText = gameHighScore;
  }
  randomNotDupe();
  gameScore = 0;
  score.innerText = gameScore;
  removeDiv();
  startButtonDisabled(false);
  reStartButtonDisabled(true);
})
