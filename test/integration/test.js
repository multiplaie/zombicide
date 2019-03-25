import chai from 'chai';
import {Cell} from "../../src/model/Cell";
import {Streetmap} from '../../src/model/Streetmap';

const expect = chai.expect;

describe('Streetmap integration tests', () => {
	const cells = [
		new Cell(1, 1, 1, Cell.closedWallValue, Cell.openWallValue, Cell.closedWallValue, Cell.closedWallValue),
		new Cell(2, 2, 1, Cell.closedWallValue, Cell.openWallValue, Cell.openWallValue, Cell.openWallValue),
		new Cell(3, 1, 2, Cell.closedWallValue, Cell.openWallValue, Cell.closedWallValue, Cell.openWallValue),
		new Cell(4, 1, 1, Cell.closedWallValue, Cell.closedWallValue, Cell.openWallValue, Cell.closedWallValue),
		new Cell(5, 1, 2, Cell.closedWallValue, Cell.closedWallValue, Cell.closedWallValue, Cell.openWallValue),
		new Cell(6, 1, 1, Cell.closedWallValue, Cell.openWallValue, Cell.closedWallValue, Cell.closedWallValue),
		new Cell(7, 1, 2, Cell.openWallValue, Cell.openWallValue, Cell.closedWallValue, Cell.openWallValue),
		new Cell(8, 1, 1, Cell.closedWallValue, Cell.openWallValue, Cell.closedWallValue, Cell.closedWallValue),
		new Cell(9, 1, 1, Cell.openWallValue, Cell.openWallValue, Cell.closedWallValue, Cell.openWallValue),
		new Cell(10, 1, 1, Cell.closedWallValue, Cell.openWallValue, Cell.closedWallValue, Cell.closedWallValue),
		new Cell(11, 4, 1, Cell.closedWallValue, Cell.closedWallValue, Cell.closedWallValue, Cell.openWallValue)
	];
	const access = [
		{
			cellId: 1,
			access: [
				{direction: Streetmap.eastDirectionValue, cellId: 2},
			]
		},
		{
			cellId: 2,
			access: [
				{direction: Streetmap.westDirectionValue, cellId: 1},
				{direction: Streetmap.southDirectionValue, cellId: 7},
				{direction: Streetmap.eastDirectionValue, cellId: 3},
			]
		},
		{
			cellId: 3,
			access: [
				{direction: Streetmap.eastDirectionValue, cellId: 9},
				{direction: Streetmap.westDirectionValue, cellId: 2},
				{direction: Streetmap.westDirectionValue, cellId: 8},
			]
		},
		{
			cellId: 4,
			access: [
				{direction: Streetmap.southDirectionValue, cellId: 9}
			]
		},
		{
			cellId: 5,
			access: [
				{direction: Streetmap.westDirectionValue, cellId: 9}
			]
		},
		{
			cellId: 6,
			access: [
				{direction: Streetmap.eastDirectionValue, cellId: 7}
			]
		},
		{
			cellId: 7,
			access: [
				{direction: Streetmap.northDirectionValue, cellId: 2},
				{direction: Streetmap.eastDirectionValue, cellId: 11},
				{direction: Streetmap.westDirectionValue, cellId: 6},
				{direction: Streetmap.westDirectionValue, cellId: 10},
			]
		},
		{
			cellId: 8,
			access: [
				{direction: Streetmap.eastDirectionValue, cellId: 3}
			]

		},
		{
			cellId: 9,
			access: [
				{direction: Streetmap.northDirectionValue, cellId: 4},
				{direction: Streetmap.eastDirectionValue, cellId: 5},
				{direction: Streetmap.westDirectionValue, cellId: 3},
			]
		},
		{
			cellId: 10,
			access: [
				{direction: Streetmap.eastDirectionValue, cellId: 7}
			]
		},
		{
			cellId: 11,
			access: [
				{direction: Streetmap.westDirectionValue, cellId: 7}
			]
		}

	];


	const streetmap = new Streetmap(cells, access, 6, 3);


	it('should create a streetmap', () => {
		expect(streetmap.width).to.be.equal(6);
		expect(streetmap.height).to.be.equal(3);
	});

	it('should get a cell', () => {
		const cell = streetmap.getCellById(3);
		expect(cell.id).equal(3);
		expect(cell.northWallType).equal(Cell.closedWallValue);
	});

	it('should get cells targeted by a distance', () => {

		const zeroDistantCells = streetmap.getCellsIdTargetedByDistance(7, 0);
		const oneDistantCells = streetmap.getCellsIdTargetedByDistance(7, 1);
		const twoDistantCellsStraight = streetmap.getCellsIdTargetedByDistance(1, 2, Streetmap.eastDirectionValue, true);
		const twoDistantCellsAllDirection = streetmap.getCellsIdTargetedByDistance(1, 2);
		const threeDistantCellsAllDirection = streetmap.getCellsIdTargetedByDistance(1, 3);

		expect(zeroDistantCells).deep.equal([7]);
		[2, 6, 10, 11].map(cellId => expect(oneDistantCells).include(cellId));
		expect(twoDistantCellsStraight).deep.equal([3]);
		[7, 3].map(cellId => expect(twoDistantCellsAllDirection).include(cellId));
		[6, 10, 11, 8, 9].map(cellId => expect(threeDistantCellsAllDirection).include(cellId));
	});

	it('should count the distance between two cells', () => {
		expect(streetmap.getDistanceBetweenTwoCells(1, 5)).equal(4);
		expect(streetmap.getDistanceBetweenTwoCells(10, 5)).equal(5);
		expect(streetmap.getDistanceBetweenTwoCells(10, 8)).equal(4);
	});


});