window.addEventListener('load', start);


const controls = {
    up: false,
    down: false,
    left: false,
    right: false
};

const player = {
    x: 0,
    y: 0,
    width: 32,
    height: 40,
    speed: 20
};

const enemy = {
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    speed: 10
};

const gameBoard = {
    left: 0,
    top: 0,
    right: 400,
    bottom: 400,
};

const playerElement = document.getElementById('player');
const gameBoardElement = document.getElementById('gameBoard');

function start() {
    console.log('js running');

    window.addEventListener('keydown', keyPressed);
    window.addEventListener('keyup', keyPressed);


    requestAnimationFrame(tick);
};



let prevTime = 0;
function tick(time) {
  requestAnimationFrame(tick);

  const deltaTime = time - prevTime;
  prevTime = time;

//   movePlayer(deltaTime);
//   moveEnemy(deltaTime);
  displayPlayer();
}




// function displayPlayer() {
//   if (controls.up || controls.down || controls.left || controls.right) {
//     playerElement.style.translate = `${playerInfo.x}px ${playerInfo.y}px`;
//   }
//   playerElement.style.backgroundPosition = `${animationStuff.walkDir * 100}% ${
//     animationStuff.characterDirection * 100
//   }%`;
// }

function displayPlayer() {
    player.y = 40;
    player.x = 40;

    playerElement.style.transform = `translate(${player.x}px, ${player.y}px)`;
}

function keyPressed(event) {
  const input = event.key.toLowerCase();
  let boolValue = event.type == "keydown" ? true : false;

  if (input == "w") {
    controls.up = boolValue;
  } else if (input == "s") {
    controls.down = boolValue;
  } else if (input == "a") {
    controls.left = boolValue;
  } else if (input == "d") {
    controls.right = boolValue;
  }
}

