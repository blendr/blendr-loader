export default class LoaderManager {

	constructor(type, loader) {
		this.type = type;
		this.loader = loader;
		this.files = {};
	}

	unload() {
	}

	update(files) {
		if(!this.end) {
			let complete = true;

			// check if requested files are all loaded
			for (let url in this.files) {
				for (let i = 0; i < files.length; i++) {
					if (url == files[i].src) {
						if (!files[i].pending.complete) {
							complete = false;
						}
					}
				}
			}

			this.complete = complete;
		}
	}

	addFile(id, url) {
		this.files[url] = id;
	}

	onComplete(files, loadr, id) {
		if(this.loader && !this.end) {
			this.end = true;

			// gather files
			let dataFiles = {};
			for(let i=0; i<files.length; i++) {
				let file = files[i];

				if(this.files[file.src]) {
					dataFiles[this.files[file.src]] = files[i].pending.response;
				}
			}

			//for(let id in this.files) {
			//	let url = this.files[id];
			//}

			if(this.loader.unpack) {
				this.loader.unpack(id, dataFiles, loadr.cache, loadr.manifest, loadr);
			} else {
				this.loader.onComplete(dataFiles, loadr, id);
			}
		}
	}

	isComplete() {
		return this.complete;
	}

}
