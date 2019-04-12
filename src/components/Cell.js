import React from "react";

class Cell extends React.Component {
	render() {
		return (
			<div
				className="cell border"
				data-position-row={this.props.row}
				data-position-col={this.props.column}
				data-north-wall={this.props.cell.northWallType}
				data-east-wall={this.props.cell.eastWallType}
				data-south-wall={this.props.cell.southWallType}
				data-west-wall={this.props.cell.westWallType}
				data-height-cell={this.props.cell.height}
				data-width-cell={this.props.cell.width}>
				{this.props.cell.id}
			</div>
		);
	}
}

export {Cell};