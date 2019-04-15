import React from "react";

class Character extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			model: this.props.model,
			coordinate: this.props.coordinate
		};
	}
	render(){
		return (
			<div className="character" onClick={this.props.onClick}>{this.state.model.name}</div>
		);
	}
}

export {Character}