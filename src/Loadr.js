import Cache from './Cache.js';
import BaseLoader from './BaseLoader.js';
import LoaderManager from './LoaderManager';

export default class Loadr extends BaseLoader {

	constructor(serverUrl, cache = new Cache()) {
		super(cache);

		this.serverUrl = serverUrl;
		this.path = 'assets/';

		this.loaders = [];
	}

	init() {
		var self = this;

		var promiseResolve, promiseReject;
		var promise = new Promise((resolve, reject) => {
			promiseResolve = resolve;
			promiseReject = reject;
		});

		var manifestUrl = `${this.serverUrl}manifest.json`;

		super.load({
			type: 'json',
			src: manifestUrl
		}).then(() => {
			self.manifest = self.cache.get(manifestUrl);
			promiseResolve();
		});

		return promise;
	}

	registerLoader(type, loader) {
		this.loaders[type] = loader;
	}

	load(ids, onUpdate) {
		let promiseResolve, promiseReject;
		let promise = new Promise((resolve, reject) => {
			promiseResolve = resolve;
			promiseReject = reject;
		});

		if(!Array.isArray(ids)) {
			ids = [ids];
		}

		// collect all dependencies
		let collectIds = (id) => {
			let pack = this.manifest.packs[id];

			if(pack.dependencies) {
				for(let j=0; j<pack.dependencies.length; j++) {
					let refId = pack.dependencies[j];

					if(ids.indexOf(refId) < 0) {
						ids.unshift(refId);
						collectIds(refId);
					}
				}
			}

			if(pack.includes) {
				for(let j=0; j<pack.includes.length; j++) {
					let refId = pack.includes[j];

					if(ids.indexOf(refId) < 0) {
						ids.push(refId);
						collectIds(refId);
					}
				}
			}
		};

		for (let i = 0; i < ids.length; i++) {
			let id = ids[i];
			collectIds(id);
		}

		// create managers
		let files = {};
		let managers = {};

		// collect files & managers for each pack
		for(let i=0; i<ids.length; i++) {
			let id = ids[i];
			let pack = this.manifest.packs[id];

			if(!this.loaders[pack.type]) {
				console.warn('unknown pack type: ' + pack.type);
			}

			//if(!pack.loader || !this.loaders[pack.loader])
			//	continue;

			files[id] = [];
			managers[id] = [];

			let manager = new LoaderManager(pack, this.loaders[pack.type], id);
			managers[id].push(manager);

			if(pack.files) {
				for (let fileId in pack.files) {
					let file = pack.files[fileId];

					let src = `${this.serverUrl}${file}`;
					manager.addFile(fileId, src);
					files[id].push({
						src: src,
						type: this.manifest.files[file].type
					});
				}
			}
		}

		// request files
		let currentIndex = 0;
		let loadNext = () => {
			if(currentIndex < ids.length) {
				let id = ids[currentIndex++];
				let localFiles = files[id];

				super.load(localFiles, (nbFilesLoaded, nbTotalFiles, bytesLoaded, bytesTotal) => {
					let localManagers = managers[id];

					for (let i = 0; i < localManagers.length; i++) {
						let manager = localManagers[i];
						manager.update(localFiles);

						if (manager.isComplete()) {
							manager.onComplete(localFiles, this, id);
						}
					}

					if (onUpdate) {
						onUpdate(nbFilesLoaded, nbTotalFiles, bytesLoaded, bytesTotal);
					}
				}).then(() => {
					loadNext();
				});
			} else {
				promiseResolve();
			}
		};
		loadNext();

		return promise;
	}

	unload(id) {
		for(let type in this.loaders) {
			let loader = this.loaders[type];

			loader.unload(id, this.cache);
		}
	}

	_extractPacks() {
		for (var pack of this.manifest.pack) {
			var json = this._getPending(this.serverUrl + `assets/pack/${pack}.json`).response;
			var data = this._getPending(this.serverUrl + `assets/pack/${pack}.pack`).response;

			var packed = new Unpacker(data, json);

			this.packs[pack] = packed;
		}
	}

	_extractAudiosprites() {
		for (var audiosprite of this.manifest.audiosprite) {
			var json = this._getPending(this.serverUrl + `assets/audiosprite/${audiosprite}.json`).response;

			this.audiosprites[audiosprite] = {
				urls: [`assets/audiosprite/${audiosprite}.ogg`, `assets/audiosprite/${audiosprite}.mp3`],
				sprite: json.sprite
			};
		}
	}

	getPack(id) {
		return this.packs[id];
	}

	getAudiosprite(id) {
		return this.audiosprites[id];
	}

}
