import chai from 'chai';
import {Cell} from "../../src/model/Cell";
import {Streetmap} from '../../src/model/Streetmap';
import {Character} from '../../src/model/Character';
import {Game} from '../../src/model/Game';

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


	const streetmap = new Streetmap(cells, access,[], 6, 3);


	it('should create a streetmap', () => {
		expect(streetmap.width).to.be.equal(6);
		expect(streetmap.height).to.be.equal(3);
	});

	it('should get a cell', () => {
		const cell = streetmap.getCellById(3);
		expect(cell.id).equal(3);
		expect(cell.northWallType).equal(Cell.closedWallValue);
	});

	it('should count the distance between two cells', () => {
		expect(streetmap.getDistanceBetweenTwoCells(1, 5)).property('length').equal(1);
		streetmap.getDistanceBetweenTwoCells(10, 5).slice(0, 1).map(e => expect(e.distance).equal(5));
		streetmap.getDistanceBetweenTwoCells(10, 8).slice(0, 1).map(e => expect(e.distance).equal(4));
	});

	it('should get all available paths from a cell', () => {
		expect(streetmap.getAvailablePaths(8)).deep.members(
			[
				[8, 3, 9, 5],
				[8, 3, 9, 4],
				[8, 3, 2, 1],
				[8, 3, 2, 7, 6],
				[8, 3, 2, 7, 10],
				[8, 3, 2, 7, 11]
			]
		);
	});


});

describe('Character integration tests', () => {
	const character = new Character('Ned');

	it('should create a character', () => {
		expect(character.name).equal('Ned');
		expect(character.getRemainingAction()).property('length').equal(3);
	});

	it('should consume all actions remaining', () => {
		expect(character.getRemainingAction()).property('length').equal(3);
		character.consumeAction();
		character.consumeAction();
		character.consumeAction();
		expect(character.getRemainingAction()).property('length').equal(0);
	});

	it('should restore all actions', () => {
		character.revertActions();
		expect(character.getRemainingAction()).property('length').equal(3);
	});
});

describe('Game integration tests', () => {
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
	const coordinates = [
		{cellId: 1, coordinate: [0,0]},
		{cellId: 2, coordinate: [0,1]},
		{cellId: 3, coordinate: [0,3]},
		{cellId: 4, coordinate: [0,4]},
		{cellId: 5, coordinate: [0,5]},
		{cellId: 6, coordinate: [1,0]},
		{cellId: 7, coordinate: [1,1]},
		{cellId: 8, coordinate: [1,2]},
		{cellId: 9, coordinate: [1,4]},
		{cellId: 10, coordinate: [2,0]},
		{cellId: 11, coordinate: [2,3]},
	];
	const streetmap = new Streetmap(cells, access, coordinates,  6, 3);
	const characters = [
		new Character('Ned'),
		new Character('Phil')
	];

	const rules = {
		startCellId: 8,
	};

	const game = new Game(streetmap, characters, rules);

	it('should create a game', () => {
		expect(game.characters).property('length').equal(2);
	});

	it('should get the name of current playing character', () => {
		game.start();
		expect(game.currentPlayer).property('name').equal('Ned');
	});

	it('should invoke characters on streetmap', () => {
		expect(game.getCharacterStates(game.currentPlayer)).property('positionCellId').equal(8);
	});

	it('should move character', () => {
		game.moveCurrentCharacter(1);
		expect(game.getCharacterStates(game.currentPlayer)).property('positionCellId').equal(1);
		expect(game.currentPlayer.getRemainingAction()).property('length').equal(0);
	});

	it('should declare end turn and make the next character playable', () => {
		game.endTurn();
		expect(game.currentPlayer).property('name').equal('Phil');
		expect(game.currentPlayer.getRemainingAction()).property('length').equal(3);
	});

	it("should declare end round restore character's actions and determinate a new first player", () => {
		game.endTurn();
		expect(game.currentPlayer).property('name').equal('Phil');
		expect(game.currentPlayer.getRemainingAction()).property('length').equal(3);
	});


});