/* eslint-disable no-console */
import Rover from './Rover';
import Grid from './Grid';

// ### Sample Input

//5 3
const grid = new Grid(5, 3);

function commsLink(rover) {
    return !grid.isOffGrid(rover);
}

function sensorArray(rover, instruction) {
    return grid.detectScent(rover, instruction);
}

//1 1 E
//RFRFRFRF
const rover = new Rover(1, 1, 'E');
rover.executeInstructions('RFRFRFRF', commsLink, sensorArray);

// 3 2 N
// FRRFLLFFRRFLL
const rover2 = new Rover(3, 2, 'N');
rover2.executeInstructions('FRRFLLFFRRFLL', commsLink, sensorArray);

// 0 3 W
// LLFFFLFLFL
const rover3 = new Rover(0, 3, 'W');
rover3.executeInstructions('LLFFFLFLFL', commsLink, sensorArray);

// ### Sample Output
// 1 1 E
// 3 3 N LOST
// 2 3 S
console.log(rover.toString());
console.log(rover2.toString());
console.log(rover3.toString());
