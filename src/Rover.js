import isFunction from 'lodash/isFunction';

const directions = 'NESW';
const privateProps = new WeakMap();

function turnLeft(direction) {
    let directionIndex = directions.indexOf(direction);
    directionIndex = (directionIndex > 0) ? (directionIndex - 1) : (directions.length - 1);
    return directions[directionIndex];
}

function turnRight(direction) {
    let directionIndex = directions.indexOf(direction);
    directionIndex = (directionIndex < (directions.length - 1)) ? (directionIndex + 1) : 0;
    return directions[directionIndex];
}

class Rover {

    constructor(x = 0, y = 0, direction = 'N') {
        if(isNaN(x) || isNaN(y)) {
            throw new Error(`invalid starting coordinates ${x}x${y}`);
        }

        if(directions.indexOf(direction) === -1) {
            throw new Error(`${direction} is not a valid direction`);
        }

        privateProps.set(this, {
            x,
            y,
            direction,
            history: [],
            lost: false
        });
    }

    get x() {
        return privateProps.get(this).x;
    }

    get y() {
        return privateProps.get(this).y;
    }

    get direction() {
        return privateProps.get(this).direction;
    }

    get history() {
        return privateProps.get(this).history;
    }

    executeInstruction(instruction, commsLink, sensorWarning) {
        const {x, y, direction, history} = privateProps.get(this);

        if(isFunction(sensorWarning) && sensorWarning(this, instruction)) {
            return;
        }

        history.unshift(`${this.toString()} ${instruction}`);

        switch(instruction) {
        case 'L':
            privateProps.get(this).direction = turnLeft(direction);
            break;

        case 'R':
            privateProps.get(this).direction = turnRight(direction);
            break;

        case 'F':
            switch(direction) {
            case 'N':
                privateProps.get(this).y = y+1;
                break;
            case 'S':
                privateProps.get(this).y = y-1;
                break;
            case 'E':
                privateProps.get(this).x = x+1;
                break;
            case 'W':
                privateProps.get(this).x = x-1;
            }
        }

        if(isFunction(commsLink) && !commsLink(this)) {
            privateProps.get(this).lost = true;
        }
    }

    executeInstructions(instructions, commsLink, sensorWarning) {
        const numInstructions = instructions.length;
        for (let i = 0; i < numInstructions; i++) {
            this.executeInstruction(instructions[i], commsLink, sensorWarning);
        }
    }

    toString() {
        const {lost} = privateProps.get(this);
        const lostMessage = lost ? ' LOST' : '';
        return `${this.x} ${this.y} ${this.direction}${lostMessage}`;
    }
}

export default Rover;
