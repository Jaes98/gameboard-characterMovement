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

function start() {
    console.log('js running');

    window.addEventListener('keydown', keyPressed);
    window.addEventListener('keyup', keyPressed);


    requestAnimationFrame(tick);
};

function tick() {
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

