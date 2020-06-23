//złapane elementy
;
const updateResult = document.querySelector('.score');
const playground = document.querySelector('.container');
const lifes = document.querySelector('.lifes')

class Obstacle {
  constructor() {
    // this.setPositionY();
    this.timer = 0;
    this.append();
    this.setPositionX();
    // this.getRect();
    // this.setPosition();
    // this.setIntervalElement();
    // this.print();
  }
  append() {
    this.obstacleElement = document.createElement('div');
    this.obstacleElement.classList.add('obstacle')
    playground.appendChild(this.obstacleElement);
  }
  setPositionX() {
    this.obstacleElement.style.left = `${Math.floor(Math.random() * 560)}px`;
    this.obstacleElement.style.top = `0px`;
  }
  print() {
    console.log(this.obstacleElement);
  }
  // getRect() {
  // const rect = this.obstacleElement.getBoundingClientRect();
  // console.log(rect);
  // console.log(rect.top)
  // return rect.top

  // }
  //   this.rect = new DOMRect(
  //     rect.x + 20,
  //     rect.y + 20,
  //     rect.width - 40,
  //     rect.height - 80)
  // }

  // console.log(rect.y)
  // this.rect = new DOMRect(
  //   rect.x + 20,
  //   rect.y + 20,
  //   rect.width - 40,
  //   rect.height - 80
  // )
  // this.obstacleElement.style.top = `${teraz}px`;
  // if (rect.top > 630) {
  //   this.obstacleElement.style.display = 'none';
  // }
  // teraz++;
  // console.log(teraz);
  // console.log(this.rect.y)


}


class Results {
  constructor(lifes) {
    let _lifes = lifes;
    this.getLifesValue = () => _lifes;

    this.checkCanPlay = value => {
      if (_lifes >= value) return true;
      return false;
    }
    this.changeResult = value => {
      const currentLifeStatus = _lifes - value;
      if (currentLifeStatus > 0) return currentLifeStatus;
      // return stopGame();
    }
  }
}
// const result = new Results(5)

class Player {
  constructor() {
    this.positionX = 280;
    this.ship = document.querySelector('.ship');
    this.ship.style.left = `${this.positionX}px`
    this.btnLeft = document.querySelector('.button--left');
    this.btnRight = document.querySelector('.button--right');
    this.btnLeft.addEventListener('click', this.moveLeft.bind(this));
    this.btnRight.addEventListener('click', this.moveRight.bind(this));
  }

  moveRight() {
    // console.log(ship);
    console.log(`w prawo`);
    console.log(this);
    if (this.positionX >= 550) {
      this.positionX = 0;
      this.ship.style.left = `${this.positionX}px`
    }
    this.positionX += 20
    this.ship.style.left = `${this.positionX}px`
  };

  moveLeft() {
    console.log(`w lewo`);
    console.log(this);
    if (this.positionX <= 0) {
      this.positionX = 560;
      this.ship.style.left = `${this.positionX}px`
    }
    this.positionX -= 20
    this.ship.style.left = `${this.positionX}px`
  };
}



class Game {
  constructor(life) {
    // this.positionZero = 0;
    this.results = new Results(life);
    this.player = new Player;
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
      new Obstacle();
    }, 5000);
  }

}



const setIntervalElement = setInterval(() => {
  this.timer += 5;
}, 500);

const setPosition = setInterval(() => {

  let all = [...document.querySelectorAll('.obstacle')];
  console.log(all);
  let fff;
  all.forEach(item => {
    // this.setIntervalElement();
    item.getClientRects()[0];
    let fff = item.clientTop;
    console.log(fff);

    fff += 10;
    item.style.top = `${fff}px`;
    // console.log(`to jest ${this.timer}`);
    console.log(item.clientTop);


  }) // this.positionZero = 0;
  // const rect = this.obstacleElement.getClientRects()[0];
  // console.log(rect.y);
  // let pos = rect.y;
  all = [];
}, 100)



const game = new Game(7);

// game();
// setInterval(() => {
//   setInterval(() => {
//     positionObstacle = +10
//   }, 500)
//   // let rect2;
//   const addingToHtml = () => {
//     const barrier = document.createElement('div');
//     barrier.classList.add('obstacle');
//     positionObstacle = Math.floor(Math.random() * 560)
//     barrier.style.left = positionObstacle + 'px';
//     obstacles.push(barrier)
//     playground.appendChild(barrier);

//   }

//   // addingToHtml();

//   console.log(obstacles);
// }, 1000)

// let rect1 = ship.getBoundingClientRect();
// // let rect2 = el2.getBoundingClientRect();

// let overlap = !(rect1.x < rect2.y ||
//   rect1.left > rect2.right ||
//   rect1.bottom < rect2.top ||
//   rect1.top > rect2.bottom);


// // const ifHit = () => {
// //   obstacles.map((item) => {
// //     if ((item.style.left >= ship.offsetTop) && ((item.offsetLeft >= ship.offsetLeft) && (item.offsetLeft <= ship.offsetLeft + 50))) {
// //       lifesLeft--;
// //       lifes.textContent = lifesLeft;
// //     }
// //   })
// // }

// // console.log(ship.offsetLeft);



// // setInterval(ifHit, 5050)
// 

// const scoreCounter = () => {
//   result += 10;
//   updateResult.textContent = result;
// };
// setInterval(scoreCounter, 5000);


// btnRight.addEventListener('click', moveRight);
// btnLeft.addEventListener('click', moveLeft);