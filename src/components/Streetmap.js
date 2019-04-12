import React from "react";
import {Cell} from "./Cell";
import math from "mathjs";

class Streetmap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rows: 3,
			columns: 6,
		};
	}

	createGrid() {
		let cells = {
			scanned: [],
			components: []
		};

		this.props.matrix.map((cellId, cellCoords) => {
			if (cells.scanned.filter(cell => cell === cellId).length === 0) {
				cells.components.push(
					<Cell
						row={cellCoords[0] + 1}
						column={cellCoords[1] + 1}
						cell={this.props.streetmap.getCellById(cellId)}
					/>
				);
				cells.scanned.push(cellId);
			}
		});
		return cells.components;
	}

	render() {
		return (
			<div className="grid">{this.createGrid()}</div>
		);
	}
}

export {Streetmap}