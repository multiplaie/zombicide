import React from "react";
import {Streetmap} from "./Streetmap";

class Game extends React.Component{
	render(){
		return (
			<div id="game">
				<Streetmap/>
				<div className="characters">
					<div className="character rounded-circle border" data-position-row="2" data-position-col="3">Ned
					</div>
					<div className="actions border rounded-pill d-flex flex-row">
						<div className="action"><i className="fas fa-running"></i></div>
					</div>
				</div>
			</div>
		);
	}
}

export {Game}