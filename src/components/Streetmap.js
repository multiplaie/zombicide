import React from "react";

class Streetmap extends React.Component{
	render(){
		return (
			<div className="grid" data-columns="6" data-rows="3">
				<div className="cell border" data-position-row="1" data-position-col="1" data-north-wall="closed"
				     data-east-wall="open" data-south-wall="closed" data-west-wall="closed">1
				</div>
				<div className="cell border" data-width-cell="2" data-position-row="1" data-position-col="2"
				     data-north-wall="closed" data-east-wall="open" data-south-wall="open" data-west-wall="open">2
				</div>
				<div className="cell border highlight" data-height-cell="2" data-position-row="1"
				     data-position-col="4"
				     data-north-wall="closed" data-east-wall="open" data-south-wall="closed" data-west-wall="open">3
				</div>
				<div className="cell border" data-position-row="1" data-position-col="5" data-north-wall="closed"
				     data-east-wall="closed" data-south-wall="open" data-west-wall="closed">4
				</div>
				<div className="cell border" data-height-cell="2" data-position-row="1" data-position-col="6"
				     data-north-wall="closed" data-east-wall="closed" data-south-wall="closed"
				     data-west-wall="closed">5
				</div>
				<div className="cell border" data-position-row="2" data-position-col="1" data-north-wall="closed"
				     data-east-wall="open" data-south-wall="closed" data-west-wall="closed">6
				</div>
				<div className="cell border" data-height-cell="2" data-position-row="2" data-position-col="2"
				     data-north-wall="open" data-east-wall="closed" data-south-wall="closed" data-west-wall="open">7
				</div>
				<div className="cell border" data-position-row="2" data-position-col="3" data-north-wall="closed"
				     data-east-wall="open" data-south-wall="closed" data-west-wall="closed">8
				</div>
				<div className="cell border" data-position-row="2" data-position-col="5" data-north-wall="open"
				     data-east-wall="open" data-south-wall="closed" data-west-wall="open">9
				</div>
				<div className="cell border" data-position-row="3" data-position-col="1" data-north-wall="closed"
				     data-east-wall="open" data-south-wall="closed" data-west-wall="closed">10
				</div>
				<div className="cell border" data-width-cell="4" data-position-row="3" data-position-col="3"
				     data-north-wall="closed" data-east-wall="closed" data-south-wall="closed"
				     data-west-wall="open">11
				</div>
			</div>
		);
	}
}

export {Streetmap}