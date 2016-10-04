import chai, {expect} from 'chai';
import chaiAsPromised  from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.should();

describe('Fake Test', function() {
    it('true is true', function () {
        expect(true).to.equal(true);
    });
});
