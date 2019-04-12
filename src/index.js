import Button from 'react-bootstrap/Button';
import React from 'react';
import {render} from 'react-dom';
import style from "./assets/index.scss";
import {Hud} from "./components/Hud";
import {Game} from "./components/Game";
import {Cell} from "./model/Cell";
import {Streetmap} from "./model/Streetmap";
import {Character} from "./model/Character";
import {Game as GameModel} from "./model/Game";

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
const characters = [
	new Character('Ned'),
	new Character('Phil')
];
const rules = {
	startCellId: 8,
};

const game = new GameModel(streetmap, characters, rules);
game.start();
render(
	<React.Fragment>
		<Game game={game}/>
		<Hud/>
	</React.Fragment>
	, document.getElementById('root')
);


