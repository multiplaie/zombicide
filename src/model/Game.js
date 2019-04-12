const startCellValue = 'startCell';
const normalCellValue = 'normalCell';

class Game {

	constructor(streetmap, characters, rules) {
		this._streetmap = streetmap;
		this._characters = characters;
		this._rules = rules;
		this._charactersStates = [];
		this._streetmapStates = [];
		this._streetmap.cells
			.map(cell => {
				const cellType = (cell.id === this._rules.startCellId) ? Game.startCellValue : Game.normalCellValue;
				this._streetmapStates.push({cellId: cell.id, type: cellType});
			});
		this._characters
			.map((character, index) =>
				this._charactersStates.push({
					characterName: character.name,
					positionCellId: this._rules.startCellId,
					playing: false,
					firstPlayer: false,
					nextCharacterName: (this.characters[index + 1] === undefined) ? this.characters[0].name : this.characters[index + 1].name
				})
			);
		this._roundCounter = 0;
	}

	get streetmap(){
		return this._streetmap;
	}

	get characters() {
		return this._characters;
	}

	static get startCellValue() {
		return startCellValue;
	}

	static get normalCellValue() {
		return normalCellValue;
	}

	start() {
		this._roundCounter = 1;
		this._charactersStates
			.slice(0, 1)
			.map(characterStates => {
				characterStates.firstPlayer = true;
				characterStates.playing = true;
			});
	}

	get currentPlayer() {
		return this._characters
			.find(character => character.name === this._charactersStates
				.find(characterStates => characterStates.playing).characterName);
	}

	getCharacterStates(characterTargeted) {
		return this._charactersStates
			.find(characterStates => characterStates.characterName === characterTargeted.name);
	}

	moveCurrentCharacter(cellIdTarget) {
		this._characters
			.find(c => c.name === this._charactersStates.find(character => character.playing).characterName)
			.consumeAction(
				this._streetmap
					.getDistanceBetweenTwoCells(this._charactersStates.find(character => character.playing).positionCellId, cellIdTarget)
					.filter(e => e.distance <= this._characters.find(c => c.name === this._charactersStates.find(character => character.playing).characterName).getRemainingAction().length)
					.find((e,i) => i === 0)
					.distance
			);
		this._charactersStates
			.find(character => character.playing).positionCellId = cellIdTarget;
	}


	endTurn() {
		let nextPlayingCharacterName = this._charactersStates.find(cs => cs.playing).nextCharacterName;
		this._charactersStates.find(cs => cs.playing).playing = false;


		if(this._charactersStates.find(cs => cs.characterName === nextPlayingCharacterName).firstPlayer){
			this._roundCounter++;
			this._characters.find(c => c.name === this._charactersStates.find(cs => cs.characterName === nextPlayingCharacterName).characterName).revertActions();
			const nextFirstPlayerCharacterName = this._charactersStates.find(cs => cs.firstPlayer).nextCharacterName;
			this._charactersStates.find(cs => cs.firstPlayer).firstPlayer = false;
			this._charactersStates.find(cs => cs.characterName === nextFirstPlayerCharacterName).firstPlayer = true;
			nextPlayingCharacterName = nextFirstPlayerCharacterName;
		}

		this._charactersStates.find(cs => cs.characterName === nextPlayingCharacterName).playing = true;

	}
}

export {Game}