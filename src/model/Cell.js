const closedWallValue = 'closed';
const openWallValue = 'open';

class Cell {
	constructor(id, width, height, northWallType, eastWallType, southWallType, westWallType) {
		this._id = id;
		this._width = width;
		this._height = height;
		this._northWallType = northWallType;
		this._eastWallType = eastWallType;
		this._southWallType = southWallType;
		this._westWallType = westWallType;
	}

	static get closedWallValue() {
		return closedWallValue;
	}

	static get openWallValue() {
		return openWallValue;
	}

	get northWallType(){
		return this._northWallType;
	}

	get eastWallType(){
		return this._eastWallType;
	}

	get southWallType(){
		return this._southWallType;
	}

	get westWallType(){
		return this._westWallType;
	}

	get height(){
		return this._height;
	}

	get width(){
		return this._width;
	}

	get id(){
		return this._id;
	}



}


export {Cell};