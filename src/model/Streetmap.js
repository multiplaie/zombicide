import {Helper} from "../helper/Helper";

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

	/**
	 *
	 * @returns {*}
	 */
	get width() {
		return this._width;
	}

	/**
	 *
	 * @returns {*}
	 */
	get height() {
		return this._height;
	}

	/**
	 *
	 * @returns {*}
	 */
	get cells() {
		return this._cells;
	}

	/**
	 *
	 * @returns {string}
	 */
	static get northDirectionValue() {
		return northDirectionValue;
	}

	/**
	 *
	 * @returns {string}
	 */
	static get eastDirectionValue() {
		return eastDirectionValue;
	}

	/**
	 *
	 * @returns {string}
	 */
	static get southDirectionValue() {
		return southDirectionValue;
	}

	/**
	 *
	 * @returns {string}
	 */
	static get westDirectionValue() {
		return westDirectionValue;
	}

	/**
	 *
	 * @param cellId
	 * @returns {*}
	 */
	getCellById(cellId) {
		return this._cells.find(cell => cell.id === cellId);
	}

	/**
	 *
	 * @param originCellId
	 * @param targetedCellId
	 * @returns {*[]}
	 */
	getDistanceBetweenTwoCells(originCellId, targetedCellId) {
		let paths = [];
		this
			.getAvailablePaths(originCellId)
			.filter(path => path.includes(targetedCellId))
			.map(path => {
				if (paths.find(p => p.distance === path.indexOf(targetedCellId)) === undefined) {
					paths
						.push({
							distance: path.indexOf(targetedCellId),
							paths: []
						});
				}
				paths.find(p => p.distance === path.indexOf(targetedCellId)).paths =
					[
						...paths.find(p => p.distance === path.indexOf(targetedCellId)).paths.filter(path2 => !Helper.isEqual(path2, path.slice(0, path.indexOf(targetedCellId) + 1))),
						path.slice(0, path.indexOf(targetedCellId) + 1)
					];
			});
		return paths.filter((path, index) => paths.indexOf(path) >= index);
	}

	/**
	 *
	 * @param originCellId
	 * @returns {*[][]}
	 */
	getAvailablePaths(originCellId) {
		let paths = [[originCellId]];
		let scanComplete = false;
		while (!scanComplete) {
			let newPaths = [];
			paths.map(path => {
				const accessFiltered = this._access
					.find(access => access.cellId === path[path.length - 1])
					.access
					.filter(access => !path.includes(access.cellId));

				if (accessFiltered.length === 0) {
					newPaths.push(path);
				} else {
					accessFiltered.map(cellAccess => {
						newPaths.push([...path, cellAccess.cellId]);
					});
				}
			});

			if (Helper.isEqual(paths, newPaths)) {
				scanComplete = true;
			}
			paths = newPaths;
		}
		return paths;
	}
}

export {Streetmap};