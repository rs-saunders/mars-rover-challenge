const privateProps = new WeakMap();

class Grid {
    constructor(x, y) {
        if(isNaN(x) || isNaN(y)) {
            throw new Error(`invalid starting coordinates ${x}x${y}`);
        }

        privateProps.set(this, { x, y, scents: new Map() });
    }

    get x() {
        return privateProps.get(this).x;
    }

    get y() {
        return privateProps.get(this).y;
    }

    toString() {
        const {x, y} = privateProps.get(this);
        return `${x} ${y}`;
    }

    isOffGrid(rover) {
        const isOffGrid = (rover.x < 0 || rover.x > this.x || rover.y < 0 || rover.y > this.y);

        if(isOffGrid) {
            const lastInstruction = rover.history[0];
            privateProps.get(this).scents.set(lastInstruction, true);
        }

        return isOffGrid;
    }
}

export default Grid;
