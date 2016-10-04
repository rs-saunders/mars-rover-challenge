import chai, {expect} from 'chai';
import chaiAsPromised  from 'chai-as-promised';
import Rover from './Rover';

chai.use(chaiAsPromised);
chai.should();

describe('Rover class', function() {
    describe('new Rover', function() {

        it('sets default coordinates are 0 0 N', function() {
            const rover = new Rover();
            expect(rover.toString()).to.equal('0 0 N');
        });

        it('allows setting initial x coordinate', function() {
            const rover = new Rover(1);
            expect(rover.x).to.equal(1);
        });

        it('allows setting initial y coordinate', function() {
            const rover = new Rover(0, 1);
            expect(rover.y).to.equal(1);
        });

        it('allows setting initial direction', function() {
            const rover = new Rover(0, 1, 'S');
            expect(rover.direction).to.equal('S');
        });

        it('throws Error if x is not a number', function() {
            expect(() => new Rover('A')).to.throw(Error, 'invalid starting coordinates Ax0');
        });

        it('throws Error if y is not a number', function() {
            expect(() => new Rover(0, 'A')).to.throw(Error, 'invalid starting coordinates 0xA');
        });

        it('throws Error if direction is not N S E or W', function() {
            expect(() => new Rover(0, 0, 'A')).to.throw(Error, 'A is not a valid direction');
        });
    });

    describe('executeInstruction', function() {

        it('ignores unrecognised instructions', function() {
            const rover = new Rover();
            rover.executeInstruction('DANCE');
            expect(rover.toString()).to.equal('0 0 N');
        });

        describe('turning (L)eft', function() {
            it('facing (N)orth', function() {
                const rover = new Rover(0, 0, 'N');
                rover.executeInstruction('L');
                expect(rover.toString()).to.equal('0 0 W');
            });
            it('facing (E)ast', function() {
                const rover = new Rover(0, 0, 'E');
                rover.executeInstruction('L');
                expect(rover.toString()).to.equal('0 0 N');
            });
            it('facing (S)outh', function() {
                const rover = new Rover(0, 0, 'S');
                rover.executeInstruction('L');
                expect(rover.toString()).to.equal('0 0 E');
            });
            it('facing (W)est', function() {
                const rover = new Rover(0, 0, 'W');
                rover.executeInstruction('L');
                expect(rover.toString()).to.equal('0 0 S');
            });
        });

        describe('turning (R)ight', function() {
            it('facing (N)orth', function() {
                const rover = new Rover(0, 0, 'N');
                rover.executeInstruction('R');
                expect(rover.toString()).to.equal('0 0 E');
            });
            it('facing (E)ast', function() {
                const rover = new Rover(0, 0, 'E');
                rover.executeInstruction('R');
                expect(rover.toString()).to.equal('0 0 S');
            });
            it('facing (S)outh', function() {
                const rover = new Rover(0, 0, 'S');
                rover.executeInstruction('R');
                expect(rover.toString()).to.equal('0 0 W');
            });
            it('facing (W)est', function() {
                const rover = new Rover(0, 0, 'W');
                rover.executeInstruction('R');
                expect(rover.toString()).to.equal('0 0 N');
            });
        });

        describe('moving (F)orward', function() {
            it('facing (N)orth', function() {
                const rover = new Rover(0, 0, 'N');
                rover.executeInstruction('F');
                expect(rover.toString()).to.equal('0 1 N');
            });
            it('facing (E)ast', function() {
                const rover = new Rover(0, 0, 'E');
                rover.executeInstruction('F');
                expect(rover.toString()).to.equal('1 0 E');
            });
            it('facing (S)outh', function() {
                const rover = new Rover(1, 1, 'S');
                rover.executeInstruction('F');
                expect(rover.toString()).to.equal('1 0 S');
            });
            it('facing (W)est', function() {
                const rover = new Rover(1, 1, 'W');
                rover.executeInstruction('F');
                expect(rover.toString()).to.equal('0 1 W');
            });
        });
    });

    describe('executeInstructions', function() {

        it('ignores unrecognised instructions', function () {
            const rover = new Rover();
            rover.executeInstructions('DANCE');
            expect(rover.toString()).to.equal('0 0 N');
        });

        it('ignores unrecognised instructions between valid ones', function () {
            const rover = new Rover();
            rover.executeInstructions('FUN DANCE RAVE');
            expect(rover.toString()).to.equal('0 1 E');
        });

        it('can execute multiple instructions', function() {
            const rover = new Rover();
            rover.executeInstructions('FFRFFLFFR');
            expect(rover.toString()).to.equal('2 4 E');
        });
    });
});
