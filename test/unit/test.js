import chai from 'chai';
import {Cell} from '../../src/model/Cell';
import {Action} from '../../src/model/Action';

const expect = chai.expect;

describe('unit test Cell', () => {
	it('should create a cell', () => {
		let cell = new Cell(1, 1, 1, Cell.closedWallValue, Cell.openWallValue, Cell.closedWallValue, Cell.closedWallValue);
		expect(cell.id).equal(1);
		expect(cell.northWallType).equal(Cell.closedWallValue);
		expect(cell.eastWallType).equal(Cell.openWallValue);
		expect(cell.southWallType).equal(Cell.closedWallValue);
		expect(cell.westWallType).equal(Cell.closedWallValue);
		expect(cell.width).equal(1);
		expect(cell.height).equal(1);
	});
});

describe('unit test action', () => {
	let action = new Action();
	it('should declare an action', () => {
		expect(action.isConsumed).is.false;
	});

	it('should consume the action', () => {
		action.consume();
		expect(action.isConsumed).is.true;
	});

	it('should restore the action', () => {
		action.revert();
		expect(action.isConsumed).is.false;
	});

});