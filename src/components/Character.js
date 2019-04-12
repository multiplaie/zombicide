import React from "react";

class Character extends React.Component {
	render(){
		return (
			<div className="character rounded-circle border" data-position-row={this.props.coordinate[0]+1} data-position-col={this.props.coordinate[1]+1}>{this.props.name}</div>
		);
	}
}

export {Character}