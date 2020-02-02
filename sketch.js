let table;
let ships = [];
let buttonGenerate;
let inputFire;

let boardSize = 10;
let numShips5 = 1;
let shipLength5 = 5;
let numShips4 = 2;
let shipLength4 = 4;
let numShips3 = 3;
let shipLength3 = 3;

let guesses = 0;
let shipsSunk = 0;

// happens only once
function setup() {
    createCanvas(440, 440);
    table = new Table(boardSize, boardSize);

    let totalNumShips = numShips5+numShips4+numShips3;
    buttonGenerate = createButton('Generate '+totalNumShips+' ships with length '+shipLength5+','+shipLength4+','+shipLength3);
    buttonGenerate.position(0, 0);
    buttonGenerate.mousePressed(generateRandomSet);

    inputFire = createInput('');
    inputFire.position(0, 430);
    inputFire.size(20, AUTO);
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

function keyPressed() {
    if (keyCode === ENTER) {
        processGuess(inputFire.value().toUpperCase());
    }
}

function generateRandomSet() {
    let locations;

    for (let i = ships.length-1; i >= 0; i--) {
        ships.splice(i, 1);
    }

    guesses = 0;
    shipsSunk = 0;
    inputFire.value('');

    for (let i = 0; i < numShips5; i++) {
        ships.push(new Ship(shipLength5));
        do {
            locations = generateShip(shipLength5);
        }
        while (collision(locations));
        ships[i].locations = locations;
        // console.log('ship:'+i+' locations:'+locations);
    }

    for (let i = numShips5; i < numShips5+numShips4; i++) {
        ships.push(new Ship(shipLength4));
        do {
            locations = generateShip(shipLength4);
        }
        while (collision(locations));
        ships[i].locations = locations;
        // console.log('ship:'+i+' locations:'+locations);
    }

    for (let i = numShips5+numShips4; i < numShips5+numShips4+numShips3; i++) {
        ships.push(new Ship(shipLength3));
        do {
            locations = generateShip(shipLength3);
        }
        while (collision(locations));
        ships[i].locations = locations;
        // console.log('ship:'+i+' locations:'+locations);
    }
}

function generateShip(shipLength) {
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
            newShipLocations.push((col + i) + '' + row);
        } else {
            newShipLocations.push(col + '' + (row + i));
        }
    }
    return newShipLocations;
}

function collision(locations) {
    let neighbours = [];
    let maxCnt = boardSize*boardSize;
    let totalNumShips = numShips5+numShips4+numShips3;
    for (i = 0; i < totalNumShips; i++) {
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

function processGuess(guess) {
    let location = parseGuess(guess);

    if (location) {
        guesses++;
        let hit = fire(location);
        let totalNumShips = numShips5+numShips4+numShips3;
        if (hit && shipsSunk === totalNumShips) {
            console.log('You sank all my battleships, in ' + guesses + ' guesses');
        }
    }
}

// helper function to parse a guess from the user
function parseGuess(guess) {
	let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

	if (guess === null || guess.length !== 2) {
		alert('Oops, please enter a letter and a number on the board.');
	} else {
		let firstChar = guess.charAt(0);
		let row = alphabet.indexOf(firstChar);
		let column = guess.charAt(1);
		if (isNaN(row) || isNaN(column)) {
			alert('Oops, that is not on the board.');
		} else if (row < 0 || row >= boardSize || column < 0 || column >= boardSize) {
				alert('Oops, that is off the board!');
		} else {
			return row + column;
		}
	}
	return null;
}

function fire(guess) {
    let totalNumShips = numShips5+numShips4+numShips3;
    for(let i = 0; i < totalNumShips; i++) {
        let ship = ships[i];
        let index = ship.locations.indexOf(guess);

        // check if a ship location has already been hit
        if (ship.hits[index] === 'hit') {
            console.log('Oops, you already hit that location');
            return true;
        } else if (index >= 0) {
            ship.hits[index] = 'hit';
            console.log('HIT!');

            if (isSunk(ship)) {
                console.log('You sank my battleship!');
                shipsSunk++;
            }
            return true;
        }
    }
    console.log('You Missed');
    return false;
}

function isSunk(ship) {
    for (let i = 0; i < ship.locations.length; i++) {
        if (ship.hits[i] !== 'hit') {
            return false;
        }
    }
    return true;
}