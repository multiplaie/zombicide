import React from "react";

class Hud extends React.Component {
	render() {
		return (
			<div className="border-right position-fixed p-2 d-flex flex-column" id="player">
				<div id="profile" className="container-fluid flex-grow-1 ">
					<div className="row">
						<div className="col-md-3">
							<img src="https://via.placeholder.com/50" alt="profile"
							     className="img-thumbnail rounded-circle "/>
						</div>
						<div className="col-md-9 align-self-center">
							<ul>
								<li className="name">Name: [name]</li>
								<li className="action">Actions remaining: [action_remaining]</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="container-fluid d-flex" id="characters">
					<div className="character d-flex flex-column">
						<img src="" alt="character"/>
						<span className="name">[name]</span>
					</div>
					<div className="character d-flex flex-column">
						<img src="" alt="character"/>
						<span className="name">[name]</span>
					</div>
					<div className="character d-flex flex-column">
						<img src="" alt="character"/>
						<span className="name">[name]</span>
					</div>
				</div>
			</div>
		);
	}
}

export {Hud}