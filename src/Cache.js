export default class Cache {

	constructor() {
		this.cache = [];
	}

	get(id) {
		return this.cache[id];
	}

	set(id, data) {
		this.cache[id] = data;
		return data;
	}

	remove(id) {
		let data = this.cache[id];
		delete this.cache[id];
		return data;
	}

	clear() {
		this.cache = [];
	}

}
