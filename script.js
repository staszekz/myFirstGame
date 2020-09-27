//złapane elementy
const updateResult = document.querySelector('.score');
const playground = document.querySelector('.container');
const lifes = document.querySelector('.lifes');
const score = document.querySelector('.score');
const ship = document.querySelector('.ship');
const modal = document.querySelector('.start');
const startBtn = document.querySelector('.start__button');

let initialResult = 0;
let gameInterval = 3000;
let interval = 25;

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
    if (score.innerText > 10) {
      interval = 20;
    }
    if (score.innerText > 20) {
      gameInterval = 2500;
    }
    if (score.innerText > 30) {
      interval = 15;
    }
    if (score.innerText > 40) {
      gameInterval = 2000;
    }
    if (score.innerText > 50) {
      gameInterval = 1500;
    }
  }
  append() {
    this.obstacleElement = document.createElement('div');
    this.obstacleElement.classList.add('obstacle');
    playground.appendChild(this.obstacleElement);
  }

  setPositionX() {
    this.obstacleElement.style.left = `${Math.floor(Math.random() * 520)}px`;
    this.obstacleElement.style.top = `0px`;
  }
  collisionDetection(lp) {
    this.collisionInterval = setInterval(() => {
      const shipElementRect = ship.getBoundingClientRect();
      const obstacleElementRect = this.obstacleElement.getBoundingClientRect();
      // console.log(`ship`, shipElementRect);
      // console.log(`obstacje`, obstacleElementRect);
      // // console.log(`rect`, ship.getBoundingClientRect());

      if (obstacleElementRect === undefined) {
        return clearInterval(this.collisionInterval);
      }

      if (
        shipElementRect.x <= obstacleElementRect.x + obstacleElementRect.width &&
        obstacleElementRect.x <= shipElementRect.x + shipElementRect.width &&
        obstacleElementRect.bottom >= shipElementRect.top
      ) {
        console.log('collision detected', score.innerText);
        playground.removeChild(this.obstacleElement);
        score.innerText = ++initialResult;
      }
    }, interval);
  }
  setIntervalElement(lp) {
    this.moveIntervalRef = setInterval(() => {
      this.obstacleElement.style.top = this.obstacleElement.offsetTop + 3 + 'px';

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
          let allElements = document.querySelectorAll('.obstacle');
          allElements.forEach(element => {
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

    this.checkCanPlay = value => {
      if (_lifes >= value) return true;
      return false;
    };
    this.changeResult = value => {
      const currentLifeStatus = _lifes - value;
      if (currentLifeStatus > 0) return currentLifeStatus;
    };
  }
}

class Player {
  constructor() {
    this.positionX = 280;
    ship.style.left = `${this.positionX}px`;
    this.btnLeft = document.querySelector('.button--left');
    this.btnRight = document.querySelector('.button--right');
    this.btnLeft.addEventListener('click', this.moveLeft.bind(this));
    this.btnRight.addEventListener('click', this.moveRight.bind(this));
    document.addEventListener('keydown', this.moveByKeyDown.bind(this));
  }

  moveRight() {
    if (this.positionX >= 520) {
      this.positionX = -20;
      ship.style.left = `${this.positionX}px`;
    }
    this.positionX += 20;
    console.log(`position`, this.positionX);
    ship.style.left = `${this.positionX}px`;
  }

  moveLeft() {
    if (this.positionX <= 0) {
      this.positionX = 540;
      ship.style.left = `${this.positionX}px`;
    }
    this.positionX -= 20;
    console.log(`position left`, this.positionX);
    ship.style.left = `${this.positionX}px`;
  }

  moveByKeyDown(e) {
    if (e.code === 'ArrowRight' || e.code === 'KeyD') {
      this.moveRight();
    }
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
      this.moveLeft();
    }
  }
}

class Game {
  constructor(life) {
    // this.positionZero = 0;
    lifes.innerText = life;
    score.innerText = 0;
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
    }, gameInterval);
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

const startGame = () => {
  modal.style.display = 'none';
  new Game(10);
};

startBtn.addEventListener('click', startGame);

// const game = new Game(20);
