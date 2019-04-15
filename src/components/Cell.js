import React from "react";

class Cell extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.model;

	}

	render() {
		return (
			<div
				style={{
					...this.props.style,
					width: this.state.width * this.props.step,
					height: this.state.height * this.props.step
				}}
				className="cell border"
				data-north-wall={this.state.northWallType}
				data-east-wall={this.state.eastWallType}
				data-south-wall={this.state.southWallType}
				data-west-wall={this.state.westWallType}
			>
				{this.state.id}
			</div>
		);
	}
}

export {Cell};