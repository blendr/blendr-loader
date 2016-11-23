import Cache from './Cache.js';

// load ajax worker
//import WebWorkify from 'webworkify';
//import AjaxWorkerScript from 'raw!./workers/AjaxWorker.txt';
//import AjaxWorker from 'worker!./workers/AjaxWorker.js';
//import webworkify from 'webworkify-webpack';
import AjaxWorkerScript from 'raw!./workers/AjaxWorker.js';

// web worker alternative
//import DirectAjax from './DirectAjax';

// waiting for bug fix
import PseudoWorker from 'pseudo-worker';

export default class Loader {

	constructor(cache) {
		this.maxConcurrents = 4;
		this.cache = cache;

		if(window.Worker) {
			//this.worker = new AjaxWorker();
			//this.worker = new WebWorkify(require('./workers/AjaxWorker.js'));
			//this.worker = webworkify(require.resolve('./workers/AjaxWorker.js'));
			this.worker = new Worker(window.URL.createObjectURL(new Blob([AjaxWorkerScript])));
		} else {
			//this.worker = new DirectAjax();
			this.worker = new PseudoWorker(window.URL.createObjectURL(new Blob([AjaxWorkerScript])));
		}

		this.worker.postMessage({
			proxy: 'max',
			data: this.maxConcurrents
		});

		this.pendings = [];
	}

	load(files, onUpdate) {
		var self = this;

		if(!Array.isArray(files)) {
			files = [files];
		}

		this.worker.postMessage({
			proxy: 'abort'
		});

		this.complete = false;
		this.initComplete = false;
		this.pendings = [];
		this.onUpdate = onUpdate;

		var promise = new Promise((resolve, reject) => {
			self.promiseResolve = resolve;
			self.promiseReject = reject;
		});

		this.worker.onmessage = (event) => {
			var data = event.data;
			var pending = self._getPending(data.data.src);

			switch(data.proxy) {
				case 'filesize':
					pending.total = data.data.total;
					self._update();
					break;
				case 'onprogress':
					pending.loaded = data.data.loaded;
					self._update();
					break;
				case 'oncomplete':
					pending.loaded = pending.total;
					pending.response = data.data.response;
					pending.complete = true;

					// cache data
					if(self.cache) {
						self.cache.set(pending.src, pending.response);
					}

					self._update(true);
					break;
			}
		};
		this.worker.onerror = (e) => {
			console.log(e);
		};

		this.initComplete = true;
		for(var i = 0; i < files.length; i++) {
			this._requestFile(files[i]);
		}

		// force update in case all files are in the cache
		this._update(true);

		return promise;
	}

	_requestFile(file) {
		let self = this;

		// prevent same file requests
		if(this._getPending(file.src)) {
			return;
		}

		let pending = {
			src: file.src,
			loaded: 0,
			total: file.size ? file.size : 0
		};
		file.pending = pending;
		this.pendings.push(pending);

		// check cache data
		if(this.cache) {
			let cacheFile = this.cache.get(file.src);

			if (cacheFile) {
				pending.loaded = pending.total;
				pending.complete = true;
				pending.response = cacheFile;
				return;
			}
		}

		// special case for images
		if(file.type == 'image') {
			let img = new Image();
			img.onload = function () {
				pending.loaded = pending.total;
				pending.response = img;
				pending.complete = true;
				self.cache.set(file.src, img);
				self._update(true);
			};
			img.src = file.src;
		} else if(file.type == 'manual') {
			// no action on manual files
		} else {
			// otherwise standard ajax
			this.worker.postMessage({
				proxy: 'load',
				data: {
					src: file.src,
					type: file.type
				}
			});
		}
	}

	_getPending(url) {
		for(let i=0; i<this.pendings.length; i++) {
			let pending = this.pendings[i];
			if(pending.src == url) {
				return pending;
			}
		}

		return null;
	}

	_forceLoaded(url, data) {
		for(let i=0; i<this.pendings.length; i++) {
			let pending = this.pendings[i];

			if(pending.src == url) {
				pending.loaded = pending.total;
				pending.response = data;
				pending.complete = true;

				// cache data
				if(this.cache && data) {
					this.cache.set(pending.src, pending.response);
				}

				this._update(true);
				break;
			}
		}
	}

	_update(complete = false) {
		var loaded = 0;
		var total = 0;
		var nbFilesLoaded = 0;
		var nbFilesTotal = 0;

		for(let i=0; i<this.pendings.length; i++) {
			let pending = this.pendings[i];
			if(pending.total > 0 || pending.complete) {
				loaded += pending.loaded;
				total += pending.total;
				nbFilesTotal++;

				if(pending.loaded >= pending.total) {
					nbFilesLoaded++;
				}
			}
		}

		// only call onUpdate if all files have a length
		if(this.onUpdate && this.initComplete && !this.complete && nbFilesTotal == this.pendings.length) {
			this.onUpdate(nbFilesLoaded, this.pendings.length, loaded, total);
		}


		if(nbFilesLoaded == this.pendings.length && complete && !this.complete) {
			this.complete = true;
			this.promiseResolve();
		}
	}

}
