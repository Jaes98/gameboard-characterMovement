window.addEventListener("load", start)

const controls = {
  up: false,
  down: false,
  left: false,
  right: false,
};

const player = {
  x: 180,
  y: 0,
  width: 32,
  height: 40,
  speed: 100,
};

const gameBoard = {
  left: 0,
  top: 0,
  right: 320,
  bottom: 320,
};

const playerElement = document.getElementById("player");
const gameBoardElement = document.getElementById("gamefield");

function start() {

    window.addEventListener("keydown", keyPressed);
    window.addEventListener("keyup", keyPressed);

    createTiles()
    displayTiles()

    requestAnimationFrame(tick);
}


const tiles = [
    [4, 4, 4, 4, 4, 4, 4, 3, 1, 2],
    [3, 3, 4, 4, 4, 3, 3, 3, 1, 6],
    [3, 3, 4, 7, 4, 3, 3, 1, 1, 1],
    [3, 3, 3, 5, 3, 3, 3, 1, 1, 2],
    [6, 1, 3, 5, 3, 1, 1, 2, 1, 1],
    [1, 2, 1, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    [2, 1, 1, 0, 1, 6, 1, 0, 1, 2],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [2, 6, 1, 1, 1, 2, 1, 1, 1, 2],
]

const GRID_HEIGHT = tiles.length
const GRID_WIDTH = tiles[0].length
const TILE_SIZE = 32

function getTileAtCoord(row, col) {
    
console.log(`Tile fra koordinat [${row}, ${col}]:`, tiles[col][row]);
    return tiles[col][row]
}

function getTileAtPos( x, y ) {
    let row = Math.floor(x / TILE_SIZE)
    let col = Math.floor(y / TILE_SIZE)
    console.log(`Tile fra position [${x}, ${y}]:`, tiles[col][row]);
    return tiles[col][row]
}

function coordFromPos(x, y) {
    let row = Math.floor(x / TILE_SIZE)
    let col = Math.floor(y / TILE_SIZE)
    console.log(`Koordinat fra position [${x}, ${y}]:`, row, col);
    return row, col
}

function posFromCoord(col, row) {
    let x = Math.floor(row * TILE_SIZE)
    let y = Math.floor(col * TILE_SIZE)
    console.log(`Position fra koordinat [${col}, ${row}]:`, x, y);
    return x, y
}


function createTiles() {
    let backgroundElement = document.getElementById('background')
    document.documentElement.style.setProperty("--GRID_WIDTH", GRID_WIDTH);
    // document.documentElement.style.setProperty("--GRID_HEIGHT", GRID_HEIGHT);
    document.documentElement.style.setProperty("--TILE_SIZE", TILE_SIZE);

    
    for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
            let tile = document.createElement("div")
            tile.classList.add("tile")
            tile.style.width = TILE_SIZE + "px"
            tile.style.height = TILE_SIZE + "px"
            tile.style.left = col * TILE_SIZE + "px"
            tile.style.top = row * TILE_SIZE + "px"
            backgroundElement.appendChild(tile)
        }
    }
}

function displayTiles() {
  const tileElements = document.querySelectorAll(".tile");
  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const tileIndex = row * GRID_WIDTH + col;
      const visualTile = tileElements[tileIndex];
      const tileType = getTileAtCoord(col, row);
      console.log("Tile type:", tileType);
      const className = getClassForTileType(tileType);
      visualTile.className = "tile";
      if (className) {
        visualTile.classList.add(className);
      }
    }
  }
}


function getClassForTileType(tileType) {
  switch (tileType) {
    case 0:
      return "path";
    case 1:
      return "grass";
    case 2:
      return "flower";
    case 3:
      return "water";
    case 4:
        return "wall";
    case 5: 
        return "floorplanks";
    case 6:
        return "tree"
    case 7:
        return "door"
    default:
      return "water";
  }
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

let prevTime = 0;
function tick(time) {
  requestAnimationFrame(tick);

  const deltaTime = (time - prevTime) / 1000;
  prevTime = time;

  displayPlayer();
  movePlayer(deltaTime);
}