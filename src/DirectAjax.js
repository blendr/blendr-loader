import XHRRequest from './XHRRequest';

export default class DirectAjax {

	constructor() {
		this.xhrs = [];
		this.pending = [];
		this.maxConcurrents = 4;
	}

	postMessage(data) {
		switch (data.proxy) {
			case "load":
				this.pending.push(data.data);
				this.checkPendingRequests();
				break;
			case "abort":
				this.onAbort(data);
				break;
			case "max":
				this.maxConcurrents = data.data;
		}
	}

	checkPendingRequests() {
		var self = this;

		while(this.xhrs.length < this.maxConcurrents && this.pending.length > 0) {
			var data = this.pending.shift();

			var xhr = new XHRRequest(data, (xhr) => self.onComplete(xhr), (data) => self.onMessage(data), (data) => self.onMessage(data)).xhr;
			this.xhrs.push({src: data.src, xhr: xhr});
		}
	}

	onComplete(xhr) {
		for (var i = 0, l = this.xhrs.length; i < l; i++) {
			if (this.xhrs[i].src == xhr.url) {
				this.xhrs.splice(i, 1);
				var message = JSON.parse(JSON.stringify({proxy: "oncomplete", data: {src: xhr.url}}));
				message.data.response = xhr.response;

				this.onMessage(message);

				this.checkPendingRequests();
				break;
			}
		}
	}

	onAbort(event) {
		var i = this.xhrs.length;
		while (i--) {
			if (this.xhrs[i].src == event.file.src) {
				this.xhrs[i].xhr.abort();
				this.xhrs.splice(i, 1)
			}
		}

		this.pending = [];
	}

	onMessage(data) {
		this.onmessage({data: data});
	}

}
