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

        describe('commsLink', function() {
            it('it defaults to always true', function () {
                const rover = new Rover(-5, -5);
                rover.executeInstruction('F');
                expect(rover.toString()).to.equal('-5 -4 N');
            });

            it('it ignores a non function commsLink', function () {
                const rover = new Rover(-5, -5);
                rover.executeInstruction('F', 'not a function');
                expect(rover.toString()).to.equal('-5 -4 N');
            });

            it('it does nothing special if comsLink is active (returns true)', function () {
                const rover = new Rover(-5, -5);
                const mockCommsLink = () => true;
                rover.executeInstruction('F', mockCommsLink);
                expect(rover.toString()).to.equal('-5 -4 N');
            });

            it('it passes itself to the sensorWarning callback', function () {
                const rover = new Rover(-5, -5);
                const mockCommsLink = (passedRover) => {
                    expect(passedRover).to.equal(rover);
                };
                rover.executeInstruction('F', mockCommsLink);
            });

            it('it adds LOST to output if commsLink is down (returns false)', function () {
                const rover = new Rover(-5, -5);
                const mockCommsLink = () => false;
                rover.executeInstruction('F', mockCommsLink);
                expect(rover.toString()).to.equal('-5 -4 N LOST');
            });
        });

        describe('sensorWarning', function() {
            it('it defaults to always false', function () {
                const rover = new Rover(-5, -5);
                rover.executeInstruction('F');
                expect(rover.toString()).to.equal('-5 -4 N');
            });

            it('it ignores a non function sensorWarning', function () {
                const rover = new Rover(-5, -5);
                rover.executeInstruction('F', null, 'not a function');
                expect(rover.toString()).to.equal('-5 -4 N');
            });

            it('it does nothing special if there is no sensorWarning (returns false)', function () {
                const rover = new Rover(-5, -5);
                const mockSensorWarning = () => false;
                rover.executeInstruction('F', null, mockSensorWarning);
                expect(rover.toString()).to.equal('-5 -4 N');
            });

            it('it passes itself and the instruction to the sensorWarning callback', function () {
                const rover = new Rover(-5, -5);
                const mockSensorWarning = (passedRover, passedInstruction) => {
                    expect(passedRover).to.equal(rover);
                    expect(passedInstruction).to.equal('F');
                };
                rover.executeInstruction('F', null, mockSensorWarning);
            });

            it('it skips execution of instruction when there is a sensorWarning (returns true)', function () {
                const rover = new Rover(-5, -5);
                const mockSensorWarning = () => true;
                rover.executeInstruction('F', null, mockSensorWarning);
                expect(rover.toString()).to.equal('-5 -5 N');
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

        describe('commsLink', function() {
            it('it defaults to always true', function () {
                const rover = new Rover(-5, -5);
                rover.executeInstructions('FRL');
                expect(rover.toString()).to.equal('-5 -4 N');
            });

            it('it ignores a non function commsLink', function () {
                const rover = new Rover(-5, -5);
                rover.executeInstructions('FRL', 'not a function');
                expect(rover.toString()).to.equal('-5 -4 N');
            });

            it('it does nothing special if comsLink is active (returns true)', function () {
                const rover = new Rover(-5, -5);
                const mockCommsLink = () => true;
                rover.executeInstructions('FRL', mockCommsLink);
                expect(rover.toString()).to.equal('-5 -4 N');
            });

            it('it passes itself to the sensorWarning callback', function () {
                const rover = new Rover(-5, -5);
                const mockCommsLink = (passedRover) => {
                    expect(passedRover).to.equal(rover);
                };
                rover.executeInstructions('FRL', mockCommsLink);
            });

            it('it adds LOST to output if commsLink is down (returns false)', function () {
                const rover = new Rover(0, 0);
                const mockCommsLink = () => false;
                rover.executeInstructions('FRL', mockCommsLink);
                expect(rover.toString()).to.equal('0 1 N LOST');
            });
        });

        describe('sensorWarning', function() {
            it('it defaults to always false', function () {
                const rover = new Rover(-5, -5);
                rover.executeInstructions('FRL');
                expect(rover.toString()).to.equal('-5 -4 N');
            });

            it('it ignores a non function sensorWarning', function () {
                const rover = new Rover(-5, -5);
                rover.executeInstructions('FRL', null, 'not a function');
                expect(rover.toString()).to.equal('-5 -4 N');
            });

            it('it does nothing special if there is no sensorWarning (returns false)', function () {
                const rover = new Rover(-5, -5);
                const mockSensorWarning = () => false;
                rover.executeInstructions('FRL', null, mockSensorWarning);
                expect(rover.toString()).to.equal('-5 -4 N');
            });

            it('it passes itself and instruction to the sensorWarning callback', function () {
                const rover = new Rover(-5, -5);
                let i = 1;
                const mockSensorWarning = (passedRover, passedInstruction) => {
                    expect(passedRover).to.equal(rover);
                    let expectedInstruction;
                    switch(i) {
                    case 1: expectedInstruction = 'F'; break;
                    case 2: expectedInstruction = 'R'; break;
                    case 3: expectedInstruction = 'L'; break;
                    }
                    expect(passedInstruction).to.equal(expectedInstruction);
                    i++;
                };
                rover.executeInstructions('FRL', null, mockSensorWarning);
            });

            it('it skips execution of instructions when there is a sensorWarning (returns true)', function () {
                const rover = new Rover(-5, -5);
                const mockSensorWarning = () => true;
                rover.executeInstructions('FRL', null, mockSensorWarning);
                expect(rover.toString()).to.equal('-5 -5 N');
            });

            it('it skips execution of some instructions, one out of the three instructions has a warning', function () {
                const rover = new Rover(-5, -5);
                let warning = true;
                const mockSensorWarning = () => {
                    return warning = !warning;
                };
                rover.executeInstructions('FFF', null, mockSensorWarning);
                expect(rover.toString()).to.equal('-5 -3 N');
            });
        });
    });

    describe('history', function() {

        it('no history for new rover', function () {
            const rover = new Rover();
            expect(rover.history.length).to.equal(0);
        });

        it('tracks history of an instruction', function() {
            const rover = new Rover();
            rover.executeInstruction('F');
            expect(rover.history.length).to.equal(1);
            expect(rover.history).to.deep.equal(['0 0 N F']);
            expect(rover.toString()).to.equal('0 1 N');
        });

        it('tracks history of multiple instructions', function() {
            const rover = new Rover();
            rover.executeInstructions('FFRFFLFFR');
            expect(rover.history.length).to.equal(9);
            expect(rover.history).to.deep.equal([
                '2 4 N R',
                '2 3 N F',
                '2 2 N F',
                '2 2 E L',
                '1 2 E F',
                '0 2 E F',
                '0 2 N R',
                '0 1 N F',
                '0 0 N F'
            ]);
            expect(rover.toString()).to.equal('2 4 E');
        });
    });
});
