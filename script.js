//złapane elementy
const updateResult = document.querySelector(".score");
const playground = document.querySelector(".container");
const lifes = document.querySelector(".lifes");
const score = document.querySelector(".score");
const ship = document.querySelector(".ship");

let interval = 20;

class Obstacle {
  constructor() {}

  run(lp) {
    this.append();
    this.setPositionX();
    this.changeInterval();
    this.collisionDetection(lp);
    this.setIntervalElement(lp);
  }
  changeInterval() {
    if (score.innerText > 100) {
      interval = 15;
    }
    if (score.innerText > 200) {
      interval = 10;
    }
  }
  append() {
    this.obstacleElement = document.createElement("div");
    this.obstacleElement.classList.add("obstacle");
    playground.appendChild(this.obstacleElement);
  }

  setPositionX() {
    this.obstacleElement.style.left = `${Math.floor(Math.random() * 560)}px`;
    this.obstacleElement.style.top = `0px`;
  }
  collisionDetection(lp) {
    this.collisionInterval = setInterval(() => {
      const shipElementRect = ship.getClientRects()[0];
      const obstacleElementRect = this.obstacleElement.getClientRects()[0];

      if (obstacleElementRect === undefined) {
        return clearInterval(this.collisionInterval);
      }

      console.log(lp, obstacleElementRect);
      console.log(obstacleElementRect.x);
      console.log(obstacleElementRect.width);
      console.log(shipElementRect.x);

      if (
        shipElementRect.x < obstacleElementRect.x + obstacleElementRect.width &&
        shipElementRect.x + shipElementRect.width > obstacleElementRect.x &&
        shipElementRect.y <
          obstacleElementRect.y + obstacleElementRect.height &&
        shipElementRect.y + shipElementRect.height > obstacleElementRect.y
      ) {
        console.log("collision detected");
      }
    }, 1000);
  }
  setIntervalElement(lp) {
    this.moveIntervalRef = setInterval(() => {
      this.obstacleElement.style.top =
        this.obstacleElement.offsetTop + 5 + "px";

      const obstacleElementRect = this.obstacleElement.getClientRects()[0];
      const playgroundElementRect = playground.getClientRects()[0];

      if (obstacleElementRect === undefined) {
        clearInterval(this.collisionInterval);
        clearInterval(this.moveIntervalRef);

        return;
      }

      if (
        obstacleElementRect.y + obstacleElementRect.height >=
        playgroundElementRect.y + playgroundElementRect.height
      ) {
        lifes.innerText -= 1;

        playground.removeChild(this.obstacleElement);
        if (lifes.innerText < 1) {
          lifes.innerText = 0;
          let allElements = document.querySelectorAll(".obstacle");
          allElements.forEach((element) => {
            playground.removeChild(element);
          });
        }
      }
    }, interval);
  }
}
class Results {
  constructor(lifes) {
    let _lifes = lifes;
    this.getLifesValue = () => _lifes;

    this.checkCanPlay = (value) => {
      if (_lifes >= value) return true;
      return false;
    };
    this.changeResult = (value) => {
      const currentLifeStatus = _lifes - value;
      if (currentLifeStatus > 0) return currentLifeStatus;
    };
  }
}

class Player {
  constructor() {
    this.positionX = 280;
    ship.style.left = `${this.positionX}px`;
    this.btnLeft = document.querySelector(".button--left");
    this.btnRight = document.querySelector(".button--right");
    this.btnLeft.addEventListener("click", this.moveLeft.bind(this));
    this.btnRight.addEventListener("click", this.moveRight.bind(this));
  }

  moveRight() {
    if (this.positionX >= 550) {
      this.positionX = 0;
      ship.style.left = `${this.positionX}px`;
    }
    this.positionX += 20;
    ship.style.left = `${this.positionX}px`;
  }

  moveLeft() {
    if (this.positionX <= 0) {
      this.positionX = 560;
      ship.style.left = `${this.positionX}px`;
    }
    this.positionX -= 20;
    ship.style.left = `${this.positionX}px`;
  }
}

class Game {
  constructor(life) {
    // this.positionZero = 0;
    lifes.innerText = life;
    this.results = new Results(life);
    this.player = new Player();
    this.createObstacle();
    // this.clearResult();
    // this.clear();
    console.log(lifes.innerText);
  }
  createObstacle() {
    let lp = 1;
    this.startInterval = setInterval(() => {
      if (lifes.innerText < 1) {
        return clearInterval(this.startInterval);
      }

      new Obstacle().run(lp);
      lp++;
    }, 2000);
  }
  // clearResult() {
  //   const lifesLeft = document.querySelector(".lifes");
  //   console.log(lifesLeft.innerText);
  //   setInterval(() => {
  //     if (lifesLeft.innerText < 1) {
  //       lifes.innerText = 0;
  //     }
  //   }, 10);
  // }
  // clear() {
  //   if (lifes.innerText === 0) {
  //     return this.stopGame();
  //   }
  // }
  // stopGame() {
  //   clearInterval(this.startInterval);
  // }
}

const game = new Game(2);
