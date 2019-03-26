import {Action} from "./Action";

class Character {
	constructor(name) {
		this._name = name;
		this._actions = [
			new Action(),
			new Action(),
			new Action()
		];
	}

	get name() {
		return this._name;
	}

	getRemainingAction() {
		return this._actions.filter(action => !action.isConsumed);
	}

	consumeAction() {
		this.getRemainingAction().slice(0, 1).map(action => action.consume());
	}


	revertActions() {
		this._actions.map(action => action.revert());
	}
}

export {Character};