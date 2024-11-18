window.addEventListener("load", start);

const controls = {
  up: false,
  down: false,
  left: false,
  right: false,
};

const player = {
  x: 0,
  y: 0,
  width: 32,
  height: 40,
  speed: 70,
};

const enemy = {
  x: 0,
  y: 200,
  width: 32,
  height: 32,
  speed: 2,
  direction: 1,
};

const gameBoard = {
  left: 0,
  top: 0,
  right: 400,
  bottom: 400,
};

const playerElement = document.getElementById("player");
const gameBoardElement = document.getElementById("gameBoard");

function start() {
  console.log("js running");

  window.addEventListener("keydown", keyPressed);
  window.addEventListener("keyup", keyPressed);

  requestAnimationFrame(tick);
}

let prevTime = 0;
function tick(time) {
  requestAnimationFrame(tick);

  const deltaTime = (time - prevTime) / 1000;
  prevTime = time;

  displayPlayer();
  movePlayer(deltaTime);
  moveEnemy(deltaTime);
}

function movePlayer(deltaTime) {
  const newPosition = {
    x: player.x,
    y: player.y,
  };

  if (controls.left) {
    newPosition.x -= player.speed * deltaTime;
  }
  if (controls.right) {
    newPosition.x += player.speed * deltaTime;
  }
  if (controls.up) {
    newPosition.y -= player.speed * deltaTime;
  }
  if (controls.down) {
    newPosition.y += player.speed * deltaTime;
  }

  if (canMove(newPosition)) {
    player.x = newPosition.x;
    player.y = newPosition.y;
  }
}

function moveEnemy(deltaTime) {
  enemy.x += enemy.speed * enemy.direction;

  if (enemy.x <= gameBoard.left || enemy.x + enemy.width >= gameBoard.right) {
    enemy.direction *= -1;
  }

  const enemyElement = document.getElementById("enemy");
  enemyElement.style.transform = `translate(${enemy.x}px, ${enemy.y}px)`;
}

function displayPlayer() {
  playerElement.style.translate = `${player.x}px ${player.y}px`;
}

function canMove(newPosition) {
  if (
    newPosition.x < gameBoard.left ||
    newPosition.x + player.width > gameBoard.right
  ) {
    return false;
  }
  if (
    newPosition.y < gameBoard.top ||
    newPosition.y + player.height > gameBoard.bottom
  ) {
    return false;
  }

  return true;
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
