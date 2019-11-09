let table;
let ships = [];
let button;

let boardSize = 10;
let numShips = 5;
let shipLength = 3;
let shipsSunk = 0;

// happens only once
function setup() {
    createCanvas(440, 440);
    table = new Table(boardSize, boardSize);

    button = createButton('Generate '+numShips+' ships with length '+shipLength);
    button.position(0, 0);
    button.mousePressed(generateRandomSet);
}

// continous loop
function draw() {
    background(0);

    table.show();

    for (let i = ships.length-1; i >= 0; i--) {
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
        ships.push(new Ship(shipLength));
        do {
            locations = generateShip();
        }
        while (collision(locations));
        ships[i].locations = locations;
        // console.log('ship:'+i+' locations:'+locations);
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
            newShipLocations.push((col + i) + "" + row);
        } else {
            newShipLocations.push(col + "" + (row + i));
        }
    }
    return newShipLocations;
}

this.collision = function(locations) {
    let neighbours = [];
    let maxCnt = boardSize*boardSize;
    for (i = 0; i < numShips; i++) {
        let ship = ships[i];
        if (ship != undefined) {
            for (j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }

                // collect neighbours
                for (let k = 0; k < ship.locations.length; k++) {
                    if (ship.locations[k].length > 0) {
                        let actualX = int(ship.locations[k].charAt(0));
                        let actualY = int(ship.locations[k].charAt(1));
                        let lt = str(actualX-1)+str(+actualY-1);
                        let lm = str(actualX-1)+str(+actualY);
                        let lb = str(actualX-1)+str(actualY+1);
                        let mt = str(actualX)+str(actualY-1);
                        let mb = str(actualX)+str(actualY+1);
                        let rt = str(actualX+1)+str(actualY-1);
                        let rm = str(actualX+1)+str(actualY);
                        let rb = str(actualX+1)+str(actualY+1);
                        if (lt > 0 && lt < maxCnt) {
                            neighbours.push(lt);
                        }
                        if (lm > 0 && lm < maxCnt) {
                            neighbours.push(lm);
                        }
                        if (lb > 0 && lb <  maxCnt) {
                            neighbours.push(lb);
                        }
                        if (mt > 0 && mt < maxCnt) {
                            neighbours.push(mt);
                        }
                        if (mb > 0 && mb < maxCnt) {
                            neighbours.push(mb);
                        }
                        if (rt > 0 && rt < maxCnt) {
                            neighbours.push(rt);
                        }
                        if (rm > 0 && rm < maxCnt) {
                            neighbours.push(rm);
                        }
                        if (rb > 0 && rb < maxCnt) {
                            neighbours.push(rb);
                        }
                    }
                }
            }
        }
    }
    // console.log(neighbours);
    for (i = 0; i < locations.length; i++) {
        if (neighbours.indexOf(locations[i]) >= 0) {
            return true;
        }
    }
    return false;
}