import React from "react";
import {Streetmap} from "./Streetmap";
import {Character} from "./Character";
import math from "mathjs";

class Game extends React.Component {
	getMatrix() {
		let matrix = math.zeros(this.props.game.streetmap.height, this.props.game.streetmap.width);
		let cursorRow = 0;
		let cursorColumn = 0;
		this.props.game.streetmap.cells.map(cell => {
			for (let c = cursorColumn; c < cursorColumn + cell.width; c++) {
				matrix.subset(math.index(cursorRow, c), cell.id);
			}

			for (let r = cursorRow; r < cursorRow + cell.height; r++) {
				matrix.subset(math.index(r, cursorColumn), cell.id);
			}

			cursorColumn += cell.width;

			if (cursorColumn >= this.props.game.streetmap.width) {
				cursorRow++;
				cursorColumn = 0;
			}

			while (cursorColumn < this.props.game.streetmap.width && cursorRow < this.props.game.streetmap.height && matrix.subset(math.index(cursorRow, cursorColumn)) !== 0) {
				cursorColumn++;
				if (cursorColumn >= this.props.game.streetmap.width) {
					cursorRow++;
					cursorColumn = 0;
				}
			}
		});

		return matrix;
	}

	getCellCoordinate(cellId){
		let coordinates = [];
		this.getMatrix().map((cellIdFound,coordinate) => {
			if (cellIdFound === cellId) coordinates.push(coordinate);
		});
		return coordinates[0];
	}

	render() {

		return (
			<div id="game">
				<Streetmap streetmap={this.props.game.streetmap} step={500} matrix={this.getMatrix()}/>
				<div className="characters">

					{this.props.game.characters.map(character =>
						<Character name={character.name} coordinate={this.getCellCoordinate(this.props.game.getCharacterStates(character).positionCellId)} step={100}/>
					)}

					<div className="actions border rounded-pill d-flex flex-row">
						<div className="action"><i className="fas fa-running"></i></div>
					</div>
				</div>
			</div>
		);
	}
}

export {Game}