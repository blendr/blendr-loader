export default class XHRRequest {

	constructor(data, callback, callbackFilesize, callbackProgress) {
		let url = data.src;
		this.url = url;

		try {
			this.xhr = new XDomainRequest();
		} catch (e) {
			this.xhr = new XMLHttpRequest();
		}

		this.callback = callback;
		this.xhr.onprogress = this.handleProgress.bind(this);
		this.xhr.onload = this.handleLoad.bind(this);
		this.xhr.onabort = this.handleAbort.bind(this);
		this.xhr.url = url;

		this.callbackFilesize = callbackFilesize;
		this.callbackProgress = callbackProgress;

		// handle filesize
		var that = this;
		this.xhr.onreadystatechange = function () {
			if (this.readyState == 2) {
				var filesize = parseInt(that.xhr.getResponseHeader("Content-Length"));
				that.handleFilesize(filesize);
			}
		};

		this.xhr.open("GET", data.src, true);

		this.xhr.responseType = data.type || 'text';
		//if (data.type == "binary") {
		//	this.xhr.responseType = "arraybuffer";
		//}
		this.xhr.send(null);
	}

	handleFilesize(filesize) {
		let obj = JSON.parse(JSON.stringify({proxy: "filesize", data: {loaded: 0, total: filesize, src: this.url}}));
		this.callbackFilesize(obj);
	}

	handleProgress(event) {
		let obj = JSON.parse(JSON.stringify({proxy: "onprogress", data: {loaded: event.loaded, total: event.total, src: event.target.url}}));
		this.callbackProgress(obj);
	}

	handleAbort() {
		this.clean();
	}

	clean () {
		this.xhr.onload = null;
		this.xhr.onabort = null;
		this.xhr.onprogress = null;
		this.callback = null;
		this.xhr = null;
	}

	handleLoad(event) {
		if (this.xhr.readyState < 4 || this.xhr.status !== 200) {
			this.clean();
			return;
		}
		if (this.xhr.readyState === 4 && this.callback) {
			this.callback(this.xhr);
			this.clean();
		}
	}

}
