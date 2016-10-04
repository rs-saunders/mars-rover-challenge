/* eslint-disable no-console */
import Rover from './Rover';
import Grid from './Grid';

// sample input 1
//5 3
const grid = new Grid(5, 3);
function commsLink(rover) {
    return !grid.isOffGrid(rover);
}

//1 1 E
//RFRFRFRF
const rover = new Rover(1, 1, 'E');
rover.executeInstructions('RFRFRFRF', commsLink);
console.log(rover.toString());

// 3 2 N
// FRRFLLFFRRFLL
const rover2 = new Rover(3, 2, 'N');
rover2.executeInstructions('FRRFLLFFRRFLL', commsLink);
console.log(rover2.toString());

// 0 3 W
// LLFFFLFLFL
const rover3 = new Rover(0, 3, 'W');
rover3.executeInstructions('LLFFFLFLFL', commsLink);
console.log(rover3.toString());
