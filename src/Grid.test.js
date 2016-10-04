import chai, {expect} from 'chai';
import chaiAsPromised  from 'chai-as-promised';
import Grid from './Grid';
import Rover from './Rover';

chai.use(chaiAsPromised);
chai.should();

describe('Grid class', function() {
    describe('new Grid', function() {

        it('throws Error if x is not a number', function() {
            expect(() => new Grid('A', 0)).to.throw(Error, 'invalid starting coordinates Ax0');
        });

        it('throws Error if y is not a number', function() {
            expect(() => new Grid(0, 'B')).to.throw(Error, 'invalid starting coordinates 0xB');
        });

        it('allows setting initial grid size', function() {
            const grid = new Grid(5, 5);
            expect(grid.toString()).to.equal('5 5');
        });
    });

    describe('isOffGrid', function() {

        let grid;

        beforeEach(function() {
            grid = new Grid(5, 5);
        });

        describe('returns false when', function() {
            it('rover is within grid', function() {
                const rover = new Rover(1, 1);
                expect(grid.isOffGrid(rover)).to.be.false;
            });

            it('rover is in north west corner', function() {
                const rover = new Rover(0, 5);
                expect(grid.isOffGrid(rover)).to.be.false;
            });

            it('rover is in north east corner', function() {
                const rover = new Rover(5, 5);
                expect(grid.isOffGrid(rover)).to.be.false;
            });

            it('rover is in south east corner', function() {
                const rover = new Rover(5, 0);
                expect(grid.isOffGrid(rover)).to.be.false;
            });

            it('rover is in south west corner', function() {
                const rover = new Rover(0, 0);
                expect(grid.isOffGrid(rover)).to.be.false;
            });
        });

        describe('returns true when', function() {

            it('rover is too far west', function() {
                const rover = new Rover(-1, 0);
                expect(grid.isOffGrid(rover)).to.be.true;
            });

            it('rover is too far east', function() {
                const rover = new Rover(6, 0);
                expect(grid.isOffGrid(rover)).to.be.true;
            });

            it('rover is too far north', function() {
                const rover = new Rover(0, 6);
                expect(grid.isOffGrid(rover)).to.be.true;
            });

            it('rover is too far south', function() {
                const rover = new Rover(0, -1);
                expect(grid.isOffGrid(rover)).to.be.true;
            });
        });
    });
});
