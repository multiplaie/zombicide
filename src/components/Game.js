import React from "react";
import {Streetmap} from "./Streetmap";
import {Game as GameModel} from "../model/Game";
import {Cell as CellModel} from "../model/Cell";
import {Streetmap as StreetmapModel} from "../model/Streetmap";
import {Character as CharacterModel} from "../model/Character";
import {Character} from "./Character";

const cells = [
	new CellModel(1, 1, 1, CellModel.closedWallValue, CellModel.openWallValue, CellModel.closedWallValue, CellModel.closedWallValue),
	new CellModel(2, 2, 1, CellModel.closedWallValue, CellModel.openWallValue, CellModel.openWallValue, CellModel.openWallValue),
	new CellModel(3, 1, 2, CellModel.closedWallValue, CellModel.openWallValue, CellModel.closedWallValue, CellModel.openWallValue),
	new CellModel(4, 1, 1, CellModel.closedWallValue, CellModel.closedWallValue, CellModel.openWallValue, CellModel.closedWallValue),
	new CellModel(5, 1, 2, CellModel.closedWallValue, CellModel.closedWallValue, CellModel.closedWallValue, CellModel.openWallValue),
	new CellModel(6, 1, 1, CellModel.closedWallValue, CellModel.openWallValue, CellModel.closedWallValue, CellModel.closedWallValue),
	new CellModel(7, 1, 2, CellModel.openWallValue, CellModel.openWallValue, CellModel.closedWallValue, CellModel.openWallValue),
	new CellModel(8, 1, 1, CellModel.closedWallValue, CellModel.openWallValue, CellModel.closedWallValue, CellModel.closedWallValue),
	new CellModel(9, 1, 1, CellModel.openWallValue, CellModel.openWallValue, CellModel.closedWallValue, CellModel.openWallValue),
	new CellModel(10, 1, 1, CellModel.closedWallValue, CellModel.openWallValue, CellModel.closedWallValue, CellModel.closedWallValue),
	new CellModel(11, 4, 1, CellModel.closedWallValue, CellModel.closedWallValue, CellModel.closedWallValue, CellModel.openWallValue)
];
const access = [
	{
		cellId: 1,
		access: [
			{direction: StreetmapModel.eastDirectionValue, cellId: 2},
		]
	},
	{
		cellId: 2,
		access: [
			{direction: StreetmapModel.westDirectionValue, cellId: 1},
			{direction: StreetmapModel.southDirectionValue, cellId: 7},
			{direction: StreetmapModel.eastDirectionValue, cellId: 3},
		]
	},
	{
		cellId: 3,
		access: [
			{direction: StreetmapModel.eastDirectionValue, cellId: 9},
			{direction: StreetmapModel.westDirectionValue, cellId: 2},
			{direction: StreetmapModel.westDirectionValue, cellId: 8},
		]
	},
	{
		cellId: 4,
		access: [
			{direction: StreetmapModel.southDirectionValue, cellId: 9}
		]
	},
	{
		cellId: 5,
		access: [
			{direction: StreetmapModel.westDirectionValue, cellId: 9}
		]
	},
	{
		cellId: 6,
		access: [
			{direction: StreetmapModel.eastDirectionValue, cellId: 7}
		]
	},
	{
		cellId: 7,
		access: [
			{direction: StreetmapModel.northDirectionValue, cellId: 2},
			{direction: StreetmapModel.eastDirectionValue, cellId: 11},
			{direction: StreetmapModel.westDirectionValue, cellId: 6},
			{direction: StreetmapModel.westDirectionValue, cellId: 10},
		]
	},
	{
		cellId: 8,
		access: [
			{direction: StreetmapModel.eastDirectionValue, cellId: 3}
		]

	},
	{
		cellId: 9,
		access: [
			{direction: StreetmapModel.northDirectionValue, cellId: 4},
			{direction: StreetmapModel.eastDirectionValue, cellId: 5},
			{direction: StreetmapModel.westDirectionValue, cellId: 3},
		]
	},
	{
		cellId: 10,
		access: [
			{direction: StreetmapModel.eastDirectionValue, cellId: 7}
		]
	},
	{
		cellId: 11,
		access: [
			{direction: StreetmapModel.westDirectionValue, cellId: 7}
		]
	}

];
const coordinates = [
	{cellId: 1, coordinate: [0, 0]},
	{cellId: 2, coordinate: [0, 1]},
	{cellId: 3, coordinate: [0, 3]},
	{cellId: 4, coordinate: [0, 4]},
	{cellId: 5, coordinate: [0, 5]},
	{cellId: 6, coordinate: [1, 0]},
	{cellId: 7, coordinate: [1, 1]},
	{cellId: 8, coordinate: [1, 2]},
	{cellId: 9, coordinate: [1, 4]},
	{cellId: 10, coordinate: [2, 0]},
	{cellId: 11, coordinate: [2, 2]},
];


class Game extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			model: new GameModel(
				new StreetmapModel(cells, access, coordinates, 6, 3),
				[new CharacterModel('Ned')],
				{startCellId: 8}
			).start(),
			step: 200
		};

	}

	displayActionMenu(i) {

	}

	render() {
		return (
			<div id="game">
				<Streetmap model={this.state.model.streetmap} step={this.state.step}/>
				<div className="characters">
					{this.state.model.characters.map((character, index) => (
							<Character key={index} model={character}
							           coordinate={this.state.model.streetmap.coordinates.find(coordinate => this.state.model.charactersStates.find(characterStates => characterStates.characterName === character.name).positionCellId === coordinate.cellId).coordinate}
							           onClick={i => this.displayActionMenu(i)}/>
						)
					)}
				</div>
			</div>
		);
	}
}

export {Game}