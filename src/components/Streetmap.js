import React from "react";
import {Cell} from "./Cell";


class Streetmap extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			model: this.props.model,
			style: [],
			step: this.props.step
		};
	}

	componentDidMount() {
		let style = [];
		this.state.model.coordinates.map((cellCoordinate) => {
			style.push({
				cellId: cellCoordinate.cellId,
				style: {
					left: parseInt(cellCoordinate.coordinate[1]) * this.state.step,
					top: parseInt(cellCoordinate.coordinate[0]) * this.state.step
				}
			});
		});
		this.setState({style: style});
	}


	render() {
		return (
			<div className={"streetmap"}>
				{
					this.state.model.cells.map((cell) => (
						<Cell
							key={cell.id}
							model={cell}
							step={this.state.step}
							style={(this.state.style.find((cellStyle) => cellStyle.cellId === cell.id) === undefined) ? {} : this.state.style.find((cellStyle) => cellStyle.cellId === cell.id).style}
						/>
					))
				}
			</div>
		);
	}
}

export {Streetmap}