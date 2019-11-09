let table;
let ships = [];
let button;

let boardSize = 10;
let numShips = 3;
let shipLength = 3;
let shipsSunk = 0;

// happens only once
function setup() {
    createCanvas(440, 440);
    table = new Table(boardSize, boardSize);

    button = createButton('Generate Random Set');
    button.position(0, 0);
    button.mousePressed(generateRandomSet);
}

// continous loop
function draw() {
    background(0);

    table.show();

    for (i = ships.length-1; i >= 0; i--) {
        if (ships[i].locations[0].length > 1) {
            ships[i].show(ships[i].locations);
        }
    }
}

function generateRandomSet() {
    let locations;
    for (i = ships.length-1; i >= 0; i--) {
        ships.slice(i, 1);
    }
    for (let i = 0; i < numShips; i++) {
        ships.push(new Ship());
        do {
            locations = generateShip();
        }
        while (collision(locations));
        ships[i].locations = locations;
        console.log('ship:'+i+' locations:'+locations);
    }
}

this.generateShip = function() {
    let direction = Math.floor(Math.random() * 2);
    let row, col;

    if (direction === 1) { // horizontal
        row = Math.floor(Math.random() * boardSize);
        col = Math.floor(Math.random() * (boardSize - shipLength + 1));
    } else { // vertical
        row = Math.floor(Math.random() * (boardSize - shipLength + 1));
        col = Math.floor(Math.random() * boardSize);
    }

    let newShipLocations = [];

    for (i = 0; i < shipLength; i++) {
        if (direction === 1) {
            newShipLocations.push(row + "" + (col + i));
        } else {
            newShipLocations.push((row + i) + "" + col);
        }
    }
    return newShipLocations;
}

this.collision = function(locations) {
    for (i = 0; i < numShips; i++) {
        let ship = ships[i];
        if (ship != undefined) {
            for (j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        
    }
    return false;
}