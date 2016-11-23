var maxConcurrents = 1;

self.onmessage = function (e) {
	switch (e.data.proxy) {
		case "load":
			pending.push(e.data.data);
			checkPendingRequests();
			break;
		case "abort":
			onAbort(e.data);
			break;
		case "max":
			maxConcurrents = e.data.data;
	}
};

function checkPendingRequests() {
	while (xhrs.length < maxConcurrents && pending.length > 0) {
		var data = pending.shift();

		new XHRRequest(data, onComplete);
	}
}

var xhrs = [];
var pending = [];

function onComplete(xhr, response) {
	for (var i = 0, l = xhrs.length; i < l; i++) {
		if (xhrs[i].src == xhr.url) {
			xhrs.splice(i, 1);
			var message = JSON.parse(JSON.stringify({proxy: "oncomplete", data: {src: xhr.url}}));
			message.data.response = response;
			self.postMessage(message);

			checkPendingRequests();
			break;
		}
	}
}

function onAbort(event) {
	var i = xhrs.length;
	while (i--) {
		if (!event.file || xhrs[i].src == event.file.src) {
			xhrs[i].xhr.abort();
			xhrs.splice(i, 1)
		}
	}

	pending = [];
}

function XHRRequest(data, callback) {
	/*
	 //x = new(XMLHttpRequest)();// || ActiveXObject)('MSXML2.XMLHTTP.3.0');
	 var x = new XMLHttpRequest();
	 x.open('GET', data.src, 1);
	 x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	 x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	 x.onreadystatechange = function () {
	 console.log(this.readyState);
	 //x.readyState > 3 && callback && callback(x.responseText, x);
	 };
	 x.send(null);
	 */
	let url = data.src;
	this.url = url;

	let xhr;
	try {
		xhr = new XDomainRequest();
	} catch (e) {
		xhr = new XMLHttpRequest();
	}

	xhrs.push({src: data.src, xhr: xhr});

	let clean = function () {
		xhr.onload = null;
		xhr.onabort = null;
		xhr.onprogress = null;
		callback = null;
		xhr = null;
	};

	xhr.open("GET", data.src, true);

	// check if supports json
	let supportsJson = true;
	if (data.type && data.type.toLowerCase() == 'json') {
		xhr.responseType = 'json';
		supportsJson = 'response' in xhr && xhr.responseType == 'json';
	}

	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onprogress = function (event) {
		let obj = JSON.parse(JSON.stringify({proxy: "onprogress", data: {loaded: event.loaded, total: event.total, src: event.target.url}}));
		self.postMessage(obj);
	};
	xhr.onload = function () {
		if (xhr.readyState < 4 || xhr.status !== 200) {
			clean();
			return;
		}
		if (xhr.readyState === 4 && callback) {
			let response = xhr.response;

			// type json but not supported
			if (!supportsJson) {
				response = JSON.parse(xhr.responseText);
			}

			callback(xhr, response);
			clean();
		}
	};
	xhr.onabort = function () {
		clean()
	};
	xhr.url = url;

	// handle filesize
	xhr.onreadystatechange = function () {
		if (this.readyState == 2) {
			let filesize = parseInt(xhr.getResponseHeader("Content-Length"));

			let obj = JSON.parse(JSON.stringify({proxy: "filesize", data: {loaded: 0, total: filesize, src: url}}));
			self.postMessage(obj);
		}
	};

	xhr.responseType = data.type || 'text';
	xhr.send(null);
}
