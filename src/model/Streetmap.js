import _ from "lodash";

const northDirectionValue = 'north';
const eastDirectionValue = 'east';
const southDirectionValue = 'south';
const westDirectionValue = 'west';


class Streetmap {

	constructor(cells, access, width, height) {
		this._cells = cells;
		this._access = access;
		this._width = width;
		this._height = height;
	}

	get width() {
		return this._width;
	}

	get height() {
		return this._height;
	}

	static get northDirectionValue() {
		return northDirectionValue;
	}

	static get eastDirectionValue() {
		return eastDirectionValue;
	}

	static get southDirectionValue() {
		return southDirectionValue;
	}

	static get westDirectionValue() {
		return westDirectionValue;
	}

	getCellById(cellId) {
		return this._cells.find(cell => cell.id === cellId);
	}

	static getOppositeDirection(direction) {
		switch (direction) {
			case this.northDirectionValue:
				return this.southDirectionValue;
			case this.southDirectionValue:
				return this.northDirectionValue;
			case this.eastDirectionValue:
				return this.westDirectionValue;
			case this.westDirectionValue:
				return this.eastDirectionValue;

		}
	}

	getCellsIdTargetedByDistance(cellIdOrigin, distance, direction = false, straight = false, previousCellId = false) {
		let cellsId = [];
		if (distance === 0) {
			cellsId.push(cellIdOrigin);
		} else {
			let accessToExplore = this._access.find(cellAccess => cellAccess.cellId === cellIdOrigin).access.filter(access => access.cellId !== previousCellId);
			if (direction !== false && straight) {
				accessToExplore = accessToExplore.filter(access => access.direction === direction);
			}
			accessToExplore
				.map(access => {
					const directionToExplore = (direction !== false && straight) ? direction : access.direction;
					this
						.getCellsIdTargetedByDistance(access.cellId, distance - 1, directionToExplore, straight, cellIdOrigin)
						.filter(cellId => !cellsId.includes(cellId))
						.forEach(cellId => cellsId.push(cellId));
				})
			;
		}
		return cellsId;
	}

	getDistanceBetweenTwoCells(originCellId, targetedCellId) {
		let cellsScanned = [];
		let distance = -1;
		let scanComplete = false;
		while (cellsScanned.includes(targetedCellId) === false && !scanComplete) {
			let currentScan = this.getCellsIdTargetedByDistance(originCellId, distance + 1);
			if (currentScan.filter(currentCellIdScan => !cellsScanned.includes(currentCellIdScan)).length === 0) {
				scanComplete = true;
			}

			distance++;
			currentScan.map((cellId) => {
				cellsScanned.push(cellId);
			});
		}

		return (scanComplete) ? -1 : distance;
	}
}

export {Streetmap};