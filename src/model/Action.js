class Action{
	constructor(){
		this._consumed = false;
	}

	get isConsumed(){
		return this._consumed;
	}

	consume(){
		this._consumed = true;
	}

	revert(){
		this._consumed = false;
	}
}
export {Action};