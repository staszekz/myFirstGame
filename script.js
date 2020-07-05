//złapane elementy
const updateResult = document.querySelector(".score");
const playground = document.querySelector(".container");
const lifes = document.querySelector(".lifes");

class Obstacle {
  constructor() {
    this.timer = 0;
  }

  run() {
    this.append();
    this.setPositionX();
    this.setIntervalElement();
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

  print() {
    console.log(this.obstacleElement);
  }

  setIntervalElement() {
    this.moveIntervalRef = setInterval(() => {
      this.obstacleElement.style.top =
        this.obstacleElement.offsetTop + 10 + "px";

      const obstacleElementRect = this.obstacleElement.getClientRects()[0];
      const playgroundElementRect = playground.getClientRects()[0];

      if (
        obstacleElementRect.y + obstacleElementRect.height >=
        playgroundElementRect.y + playgroundElementRect.height
      ) {
        clearInterval(this.moveIntervalRef);
        playground.removeChild(this.obstacleElement);
      }
    }, 50);
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
    this.ship = document.querySelector(".ship");
    this.ship.style.left = `${this.positionX}px`;
    this.btnLeft = document.querySelector(".button--left");
    this.btnRight = document.querySelector(".button--right");
    this.btnLeft.addEventListener("click", this.moveLeft.bind(this));
    this.btnRight.addEventListener("click", this.moveRight.bind(this));
  }

  moveRight() {
    if (this.positionX >= 550) {
      this.positionX = 0;
      this.ship.style.left = `${this.positionX}px`;
    }
    this.positionX += 20;
    this.ship.style.left = `${this.positionX}px`;
  }

  moveLeft() {
    if (this.positionX <= 0) {
      this.positionX = 560;
      this.ship.style.left = `${this.positionX}px`;
    }
    this.positionX -= 20;
    this.ship.style.left = `${this.positionX}px`;
  }
}

class Game {
  constructor(life) {
    // this.positionZero = 0;
    this.results = new Results(life);
    this.player = new Player();
    this.log();
    this.createObstacle();
    // this.setPosition();
  }
  log() {
    console.log(this.player);
    console.log(this.results.checkCanPlay(3));
  }
  createObstacle() {
    setInterval(() => {
      new Obstacle().run();
    }, 5000);
  }
}

const game = new Game(7);
