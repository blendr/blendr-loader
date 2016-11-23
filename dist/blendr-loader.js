/*!
 * 
 * 	blendr-loader - blendr-loader
 * 	Author: Nicolas Bouvet <bouvet.nicolas@gmail.com> (http://www.nico-boo.com)
 * 	Version: v1.0.0
 * 	Url: undefined
 * 	License(s): ISC
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["blendr-loader"] = factory();
	else
		root["blendr-loader"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Loadr = __webpack_require__(1);
	
	var _Loadr2 = _interopRequireDefault(_Loadr);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//import PackLoader from './loaders/PackLoader';
	//import PackUnpacker from '../packers/pack-unpacker';
	//import PackPacker from 'pack-packer';
	//import SpriteLoader from './loaders/SpriteLoader';
	//import AudiospriteLoader from './loaders/AudiospriteLoader';
	
	//Loadr.PackLoader = PackUnpacker;
	//Loadr.SpriteLoader = SpriteLoader;
	//Loadr.AudiospriteLoader = AudiospriteLoader;
	
	window.BlendrLoader = _Loadr2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Cache = __webpack_require__(2);
	
	var _Cache2 = _interopRequireDefault(_Cache);
	
	var _BaseLoader2 = __webpack_require__(3);
	
	var _BaseLoader3 = _interopRequireDefault(_BaseLoader2);
	
	var _LoaderManager = __webpack_require__(6);
	
	var _LoaderManager2 = _interopRequireDefault(_LoaderManager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Loadr = function (_BaseLoader) {
		_inherits(Loadr, _BaseLoader);
	
		function Loadr(serverUrl) {
			var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _Cache2.default();
	
			_classCallCheck(this, Loadr);
	
			var _this = _possibleConstructorReturn(this, (Loadr.__proto__ || Object.getPrototypeOf(Loadr)).call(this, cache));
	
			_this.serverUrl = serverUrl;
			_this.path = 'assets/';
	
			_this.loaders = [];
			return _this;
		}
	
		_createClass(Loadr, [{
			key: 'init',
			value: function init() {
				var self = this;
	
				var promiseResolve, promiseReject;
				var promise = new Promise(function (resolve, reject) {
					promiseResolve = resolve;
					promiseReject = reject;
				});
	
				var manifestUrl = this.serverUrl + 'manifest.json';
	
				_get(Loadr.prototype.__proto__ || Object.getPrototypeOf(Loadr.prototype), 'load', this).call(this, {
					type: 'json',
					src: manifestUrl
				}).then(function () {
					self.manifest = self.cache.get(manifestUrl);
					promiseResolve();
				});
	
				return promise;
			}
		}, {
			key: 'registerLoader',
			value: function registerLoader(type, loader) {
				this.loaders[type] = loader;
			}
		}, {
			key: 'load',
			value: function load(ids, onUpdate) {
				var _this2 = this;
	
				var promiseResolve = void 0,
				    promiseReject = void 0;
				var promise = new Promise(function (resolve, reject) {
					promiseResolve = resolve;
					promiseReject = reject;
				});
	
				if (!Array.isArray(ids)) {
					ids = [ids];
				}
	
				// collect all dependencies
				var collectIds = function collectIds(id) {
					var pack = _this2.manifest.packs[id];
	
					if (pack.dependencies) {
						for (var j = 0; j < pack.dependencies.length; j++) {
							var refId = pack.dependencies[j];
	
							if (ids.indexOf(refId) < 0) {
								ids.unshift(refId);
								collectIds(refId);
							}
						}
					}
	
					if (pack.includes) {
						for (var _j = 0; _j < pack.includes.length; _j++) {
							var _refId = pack.includes[_j];
	
							if (ids.indexOf(_refId) < 0) {
								ids.push(_refId);
								collectIds(_refId);
							}
						}
					}
				};
	
				for (var i = 0; i < ids.length; i++) {
					var id = ids[i];
					collectIds(id);
				}
	
				// create managers
				var files = {};
				var managers = {};
	
				// collect files & managers for each pack
				for (var _i = 0; _i < ids.length; _i++) {
					var _id = ids[_i];
					var pack = this.manifest.packs[_id];
	
					if (!this.loaders[pack.type]) {
						console.warn('unknown pack type: ' + pack.type);
					}
	
					//if(!pack.loader || !this.loaders[pack.loader])
					//	continue;
	
					files[_id] = [];
					managers[_id] = [];
	
					var manager = new _LoaderManager2.default(pack, this.loaders[pack.type], _id);
					managers[_id].push(manager);
	
					if (pack.files) {
						for (var fileId in pack.files) {
							var file = pack.files[fileId];
	
							var src = '' + this.serverUrl + file;
							manager.addFile(fileId, src);
							files[_id].push({
								src: src,
								type: this.manifest.files[file].type
							});
						}
					}
				}
	
				// request files
				var currentIndex = 0;
				var loadNext = function loadNext() {
					if (currentIndex < ids.length) {
						(function () {
							var id = ids[currentIndex++];
							var localFiles = files[id];
	
							_get(Loadr.prototype.__proto__ || Object.getPrototypeOf(Loadr.prototype), 'load', _this2).call(_this2, localFiles, function (nbFilesLoaded, nbTotalFiles, bytesLoaded, bytesTotal) {
								var localManagers = managers[id];
	
								for (var _i2 = 0; _i2 < localManagers.length; _i2++) {
									var _manager = localManagers[_i2];
									_manager.update(localFiles);
	
									if (_manager.isComplete()) {
										_manager.onComplete(localFiles, _this2, id);
									}
								}
	
								if (onUpdate) {
									onUpdate(nbFilesLoaded, nbTotalFiles, bytesLoaded, bytesTotal);
								}
							}).then(function () {
								loadNext();
							});
						})();
					} else {
						promiseResolve();
					}
				};
				loadNext();
	
				return promise;
			}
		}, {
			key: 'unload',
			value: function unload(id) {
				for (var type in this.loaders) {
					var loader = this.loaders[type];
	
					loader.unload(id, this.cache);
				}
			}
		}, {
			key: '_extractPacks',
			value: function _extractPacks() {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.manifest.pack[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var pack = _step.value;
	
						var json = this._getPending(this.serverUrl + ('assets/pack/' + pack + '.json')).response;
						var data = this._getPending(this.serverUrl + ('assets/pack/' + pack + '.pack')).response;
	
						var packed = new Unpacker(data, json);
	
						this.packs[pack] = packed;
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}, {
			key: '_extractAudiosprites',
			value: function _extractAudiosprites() {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = this.manifest.audiosprite[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var audiosprite = _step2.value;
	
						var json = this._getPending(this.serverUrl + ('assets/audiosprite/' + audiosprite + '.json')).response;
	
						this.audiosprites[audiosprite] = {
							urls: ['assets/audiosprite/' + audiosprite + '.ogg', 'assets/audiosprite/' + audiosprite + '.mp3'],
							sprite: json.sprite
						};
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		}, {
			key: 'getPack',
			value: function getPack(id) {
				return this.packs[id];
			}
		}, {
			key: 'getAudiosprite',
			value: function getAudiosprite(id) {
				return this.audiosprites[id];
			}
		}]);
	
		return Loadr;
	}(_BaseLoader3.default);
	
	exports.default = Loadr;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cache = function () {
		function Cache() {
			_classCallCheck(this, Cache);
	
			this.cache = [];
		}
	
		_createClass(Cache, [{
			key: "get",
			value: function get(id) {
				return this.cache[id];
			}
		}, {
			key: "set",
			value: function set(id, data) {
				this.cache[id] = data;
				return data;
			}
		}, {
			key: "remove",
			value: function remove(id) {
				var data = this.cache[id];
				delete this.cache[id];
				return data;
			}
		}, {
			key: "clear",
			value: function clear() {
				this.cache = [];
			}
		}]);
	
		return Cache;
	}();
	
	exports.default = Cache;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	// load ajax worker
	//import WebWorkify from 'webworkify';
	//import AjaxWorkerScript from 'raw!./workers/AjaxWorker.txt';
	//import AjaxWorker from 'worker!./workers/AjaxWorker.js';
	//import webworkify from 'webworkify-webpack';
	
	
	// web worker alternative
	//import DirectAjax from './DirectAjax';
	
	// waiting for bug fix
	
	
	var _Cache = __webpack_require__(2);
	
	var _Cache2 = _interopRequireDefault(_Cache);
	
	var _AjaxWorker = __webpack_require__(4);
	
	var _AjaxWorker2 = _interopRequireDefault(_AjaxWorker);
	
	var _pseudoWorker = __webpack_require__(5);
	
	var _pseudoWorker2 = _interopRequireDefault(_pseudoWorker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Loader = function () {
		function Loader(cache) {
			_classCallCheck(this, Loader);
	
			this.maxConcurrents = 4;
			this.cache = cache;
	
			if (window.Worker) {
				//this.worker = new AjaxWorker();
				//this.worker = new WebWorkify(require('./workers/AjaxWorker.js'));
				//this.worker = webworkify(require.resolve('./workers/AjaxWorker.js'));
				this.worker = new Worker(window.URL.createObjectURL(new Blob([_AjaxWorker2.default])));
			} else {
				//this.worker = new DirectAjax();
				this.worker = new _pseudoWorker2.default(window.URL.createObjectURL(new Blob([_AjaxWorker2.default])));
			}
	
			this.worker.postMessage({
				proxy: 'max',
				data: this.maxConcurrents
			});
	
			this.pendings = [];
		}
	
		_createClass(Loader, [{
			key: 'load',
			value: function load(files, onUpdate) {
				var self = this;
	
				if (!Array.isArray(files)) {
					files = [files];
				}
	
				this.worker.postMessage({
					proxy: 'abort'
				});
	
				this.complete = false;
				this.initComplete = false;
				this.pendings = [];
				this.onUpdate = onUpdate;
	
				var promise = new Promise(function (resolve, reject) {
					self.promiseResolve = resolve;
					self.promiseReject = reject;
				});
	
				this.worker.onmessage = function (event) {
					var data = event.data;
					var pending = self._getPending(data.data.src);
	
					switch (data.proxy) {
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
							if (self.cache) {
								self.cache.set(pending.src, pending.response);
							}
	
							self._update(true);
							break;
					}
				};
				this.worker.onerror = function (e) {
					console.log(e);
				};
	
				this.initComplete = true;
				for (var i = 0; i < files.length; i++) {
					this._requestFile(files[i]);
				}
	
				// force update in case all files are in the cache
				this._update(true);
	
				return promise;
			}
		}, {
			key: '_requestFile',
			value: function _requestFile(file) {
				var self = this;
	
				// prevent same file requests
				if (this._getPending(file.src)) {
					return;
				}
	
				var pending = {
					src: file.src,
					loaded: 0,
					total: file.size ? file.size : 0
				};
				file.pending = pending;
				this.pendings.push(pending);
	
				// check cache data
				if (this.cache) {
					var cacheFile = this.cache.get(file.src);
	
					if (cacheFile) {
						pending.loaded = pending.total;
						pending.complete = true;
						pending.response = cacheFile;
						return;
					}
				}
	
				// special case for images
				if (file.type == 'image') {
					(function () {
						var img = new Image();
						img.onload = function () {
							pending.loaded = pending.total;
							pending.response = img;
							pending.complete = true;
							self.cache.set(file.src, img);
							self._update(true);
						};
						img.src = file.src;
					})();
				} else if (file.type == 'manual') {
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
		}, {
			key: '_getPending',
			value: function _getPending(url) {
				for (var i = 0; i < this.pendings.length; i++) {
					var pending = this.pendings[i];
					if (pending.src == url) {
						return pending;
					}
				}
	
				return null;
			}
		}, {
			key: '_forceLoaded',
			value: function _forceLoaded(url, data) {
				for (var i = 0; i < this.pendings.length; i++) {
					var pending = this.pendings[i];
	
					if (pending.src == url) {
						pending.loaded = pending.total;
						pending.response = data;
						pending.complete = true;
	
						// cache data
						if (this.cache && data) {
							this.cache.set(pending.src, pending.response);
						}
	
						this._update(true);
						break;
					}
				}
			}
		}, {
			key: '_update',
			value: function _update() {
				var complete = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	
				var loaded = 0;
				var total = 0;
				var nbFilesLoaded = 0;
				var nbFilesTotal = 0;
	
				for (var i = 0; i < this.pendings.length; i++) {
					var pending = this.pendings[i];
					if (pending.total > 0 || pending.complete) {
						loaded += pending.loaded;
						total += pending.total;
						nbFilesTotal++;
	
						if (pending.loaded >= pending.total) {
							nbFilesLoaded++;
						}
					}
				}
	
				// only call onUpdate if all files have a length
				if (this.onUpdate && this.initComplete && !this.complete && nbFilesTotal == this.pendings.length) {
					this.onUpdate(nbFilesLoaded, this.pendings.length, loaded, total);
				}
	
				if (nbFilesLoaded == this.pendings.length && complete && !this.complete) {
					this.complete = true;
					this.promiseResolve();
				}
			}
		}]);
	
		return Loader;
	}();
	
	exports.default = Loader;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "\"use strict\";\n\nvar maxConcurrents = 1;\n\nself.onmessage = function (e) {\n\tswitch (e.data.proxy) {\n\t\tcase \"load\":\n\t\t\tpending.push(e.data.data);\n\t\t\tcheckPendingRequests();\n\t\t\tbreak;\n\t\tcase \"abort\":\n\t\t\tonAbort(e.data);\n\t\t\tbreak;\n\t\tcase \"max\":\n\t\t\tmaxConcurrents = e.data.data;\n\t}\n};\n\nfunction checkPendingRequests() {\n\twhile (xhrs.length < maxConcurrents && pending.length > 0) {\n\t\tvar data = pending.shift();\n\n\t\tnew XHRRequest(data, onComplete);\n\t}\n}\n\nvar xhrs = [];\nvar pending = [];\n\nfunction onComplete(xhr, response) {\n\tfor (var i = 0, l = xhrs.length; i < l; i++) {\n\t\tif (xhrs[i].src == xhr.url) {\n\t\t\txhrs.splice(i, 1);\n\t\t\tvar message = JSON.parse(JSON.stringify({ proxy: \"oncomplete\", data: { src: xhr.url } }));\n\t\t\tmessage.data.response = response;\n\t\t\tself.postMessage(message);\n\n\t\t\tcheckPendingRequests();\n\t\t\tbreak;\n\t\t}\n\t}\n}\n\nfunction onAbort(event) {\n\tvar i = xhrs.length;\n\twhile (i--) {\n\t\tif (!event.file || xhrs[i].src == event.file.src) {\n\t\t\txhrs[i].xhr.abort();\n\t\t\txhrs.splice(i, 1);\n\t\t}\n\t}\n\n\tpending = [];\n}\n\nfunction XHRRequest(data, callback) {\n\t/*\n  //x = new(XMLHttpRequest)();// || ActiveXObject)('MSXML2.XMLHTTP.3.0');\n  var x = new XMLHttpRequest();\n  x.open('GET', data.src, 1);\n  x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');\n  x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');\n  x.onreadystatechange = function () {\n  console.log(this.readyState);\n  //x.readyState > 3 && callback && callback(x.responseText, x);\n  };\n  x.send(null);\n  */\n\tvar url = data.src;\n\tthis.url = url;\n\n\tvar xhr = void 0;\n\ttry {\n\t\txhr = new XDomainRequest();\n\t} catch (e) {\n\t\txhr = new XMLHttpRequest();\n\t}\n\n\txhrs.push({ src: data.src, xhr: xhr });\n\n\tvar clean = function clean() {\n\t\txhr.onload = null;\n\t\txhr.onabort = null;\n\t\txhr.onprogress = null;\n\t\tcallback = null;\n\t\txhr = null;\n\t};\n\n\txhr.open(\"GET\", data.src, true);\n\n\t// check if supports json\n\tvar supportsJson = true;\n\tif (data.type && data.type.toLowerCase() == 'json') {\n\t\txhr.responseType = 'json';\n\t\tsupportsJson = 'response' in xhr && xhr.responseType == 'json';\n\t}\n\n\txhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');\n\txhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');\n\txhr.onprogress = function (event) {\n\t\tvar obj = JSON.parse(JSON.stringify({ proxy: \"onprogress\", data: { loaded: event.loaded, total: event.total, src: event.target.url } }));\n\t\tself.postMessage(obj);\n\t};\n\txhr.onload = function () {\n\t\tif (xhr.readyState < 4 || xhr.status !== 200) {\n\t\t\tclean();\n\t\t\treturn;\n\t\t}\n\t\tif (xhr.readyState === 4 && callback) {\n\t\t\tvar response = xhr.response;\n\n\t\t\t// type json but not supported\n\t\t\tif (!supportsJson) {\n\t\t\t\tresponse = JSON.parse(xhr.responseText);\n\t\t\t}\n\n\t\t\tcallback(xhr, response);\n\t\t\tclean();\n\t\t}\n\t};\n\txhr.onabort = function () {\n\t\tclean();\n\t};\n\txhr.url = url;\n\n\t// handle filesize\n\txhr.onreadystatechange = function () {\n\t\tif (this.readyState == 2) {\n\t\t\tvar filesize = parseInt(xhr.getResponseHeader(\"Content-Length\"));\n\n\t\t\tvar obj = JSON.parse(JSON.stringify({ proxy: \"filesize\", data: { loaded: 0, total: filesize, src: url } }));\n\t\t\tself.postMessage(obj);\n\t\t}\n\t};\n\n\txhr.responseType = data.type || 'text';\n\txhr.send(null);\n}"

/***/ },
/* 5 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	function doEval(self, __pseudoworker_script) {
	  /* jshint unused:false */
	  (function () {
	    /* jshint evil:true */
	    eval(__pseudoworker_script);
	  }).call(global);
	}
	
	function PseudoWorker(path) {
	  var messageListeners = [];
	  var errorListeners = [];
	  var workerMessageListeners = [];
	  var workerErrorListeners = [];
	  var postMessageListeners = [];
	  var terminated = false;
	  var script;
	  var workerSelf;
	
	  var api = this;
	
	  // custom each loop is for IE8 support
	  function executeEach(arr, fun) {
	    var i = -1;
	    while (++i < arr.length) {
	      if (arr[i]) {
	        fun(arr[i]);
	      }
	    }
	  }
	
	  function callErrorListener(err) {
	    return function (listener) {
	      listener({
	        type: 'error',
	        error: err,
	        message: err.message
	      });
	    };
	  }
	
	  function addEventListener(type, fun) {
	    /* istanbul ignore else */
	    if (type === 'message') {
	      messageListeners.push(fun);
	    } else if (type === 'error') {
	      errorListeners.push(fun);
	    }
	  }
	
	  function removeEventListener(type, fun) {
	      var listeners;
	      /* istanbul ignore else */
	      if (type === 'message') {
	        listeners = messageListeners;
	      } else if (type === 'error') {
	        listeners = errorListeners;
	      } else {
	        return;
	      }
	      var i = -1;
	      while (++i < listeners.length) {
	        var listener = listeners[i];
	        if (listener === fun) {
	          delete listeners[i];
	          break;
	        }
	      }
	  }
	
	  function postError(err) {
	    var callFun = callErrorListener(err);
	    if (typeof api.onerror === 'function') {
	      callFun(api.onerror);
	    }
	    if (workerSelf && typeof workerSelf.onerror === 'function') {
	      callFun(workerSelf.onerror);
	    }
	    executeEach(errorListeners, callFun);
	    executeEach(workerErrorListeners, callFun);
	  }
	
	  function runPostMessage(msg) {
	    function callFun(listener) {
	      try {
	        listener({data: msg});
	      } catch (err) {
	        postError(err);
	      }
	    }
	
	    if (workerSelf && typeof workerSelf.onmessage === 'function') {
	      callFun(workerSelf.onmessage);
	    }
	    executeEach(workerMessageListeners, callFun);
	  }
	
	  function postMessage(msg) {
	    if (typeof msg === 'undefined') {
	      throw new Error('postMessage() requires an argument');
	    }
	    if (terminated) {
	      return;
	    }
	    if (!script) {
	      postMessageListeners.push(msg);
	      return;
	    }
	    runPostMessage(msg);
	  }
	
	  function terminate() {
	    terminated = true;
	  }
	
	  function workerPostMessage(msg) {
	    function callFun(listener) {
	      listener({
	        data: msg
	      });
	    }
	    if (typeof api.onmessage === 'function') {
	      callFun(api.onmessage);
	    }
	    executeEach(messageListeners, callFun);
	  }
	
	  function workerAddEventListener(type, fun) {
	    /* istanbul ignore else */
	    if (type === 'message') {
	      workerMessageListeners.push(fun);
	    } else if (type === 'error') {
	      workerErrorListeners.push(fun);
	    }
	  }
	
	  var xhr = new XMLHttpRequest();
	
	  xhr.open('GET', path);
	  xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4) {
	      if (xhr.status >= 200 && xhr.status < 400) {
	        script = xhr.responseText;
	        workerSelf = {
	          postMessage: workerPostMessage,
	          addEventListener: workerAddEventListener,
	        };
	        doEval(workerSelf, script);
	        var currentListeners = postMessageListeners;
	        postMessageListeners = [];
	        for (var i = 0; i < currentListeners.length; i++) {
	          runPostMessage(currentListeners[i]);
	        }
	      } else {
	        postError(new Error('cannot find script ' + path));
	      }
	    }
	  };
	
	  xhr.send();
	
	  api.postMessage = postMessage;
	  api.addEventListener = addEventListener;
	  api.removeEventListener = removeEventListener;
	  api.terminate = terminate;
	
	  return api;
	}
	
	module.exports = PseudoWorker;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LoaderManager = function () {
		function LoaderManager(type, loader) {
			_classCallCheck(this, LoaderManager);
	
			this.type = type;
			this.loader = loader;
			this.files = {};
		}
	
		_createClass(LoaderManager, [{
			key: "unload",
			value: function unload() {}
		}, {
			key: "update",
			value: function update(files) {
				if (!this.end) {
					var complete = true;
	
					// check if requested files are all loaded
					for (var url in this.files) {
						for (var i = 0; i < files.length; i++) {
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
		}, {
			key: "addFile",
			value: function addFile(id, url) {
				this.files[url] = id;
			}
		}, {
			key: "onComplete",
			value: function onComplete(files, loadr, id) {
				if (this.loader && !this.end) {
					this.end = true;
	
					// gather files
					var dataFiles = {};
					for (var i = 0; i < files.length; i++) {
						var file = files[i];
	
						if (this.files[file.src]) {
							dataFiles[this.files[file.src]] = files[i].pending.response;
						}
					}
	
					//for(let id in this.files) {
					//	let url = this.files[id];
					//}
	
					if (this.loader.unpack) {
						this.loader.unpack(id, dataFiles, loadr.cache, loadr.manifest, loadr);
					} else {
						this.loader.onComplete(dataFiles, loadr, id);
					}
				}
			}
		}, {
			key: "isComplete",
			value: function isComplete() {
				return this.complete;
			}
		}]);
	
		return LoaderManager;
	}();
	
	exports.default = LoaderManager;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhOThjYjdlMmM2N2Y5NzRhYmRiMCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xvYWRyLmpzIiwid2VicGFjazovLy8uL3NyYy9DYWNoZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQmFzZUxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9BamF4V29ya2VyLmpzIiwid2VicGFjazovLy8uL34vcHNldWRvLXdvcmtlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTG9hZGVyTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJCbGVuZHJMb2FkZXIiLCJMb2FkciIsInNlcnZlclVybCIsImNhY2hlIiwicGF0aCIsImxvYWRlcnMiLCJzZWxmIiwicHJvbWlzZVJlc29sdmUiLCJwcm9taXNlUmVqZWN0IiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibWFuaWZlc3RVcmwiLCJ0eXBlIiwic3JjIiwidGhlbiIsIm1hbmlmZXN0IiwiZ2V0IiwibG9hZGVyIiwiaWRzIiwib25VcGRhdGUiLCJBcnJheSIsImlzQXJyYXkiLCJjb2xsZWN0SWRzIiwiaWQiLCJwYWNrIiwicGFja3MiLCJkZXBlbmRlbmNpZXMiLCJqIiwibGVuZ3RoIiwicmVmSWQiLCJpbmRleE9mIiwidW5zaGlmdCIsImluY2x1ZGVzIiwicHVzaCIsImkiLCJmaWxlcyIsIm1hbmFnZXJzIiwiY29uc29sZSIsIndhcm4iLCJtYW5hZ2VyIiwiZmlsZUlkIiwiZmlsZSIsImFkZEZpbGUiLCJjdXJyZW50SW5kZXgiLCJsb2FkTmV4dCIsImxvY2FsRmlsZXMiLCJuYkZpbGVzTG9hZGVkIiwibmJUb3RhbEZpbGVzIiwiYnl0ZXNMb2FkZWQiLCJieXRlc1RvdGFsIiwibG9jYWxNYW5hZ2VycyIsInVwZGF0ZSIsImlzQ29tcGxldGUiLCJvbkNvbXBsZXRlIiwidW5sb2FkIiwianNvbiIsIl9nZXRQZW5kaW5nIiwicmVzcG9uc2UiLCJkYXRhIiwicGFja2VkIiwiVW5wYWNrZXIiLCJhdWRpb3Nwcml0ZSIsImF1ZGlvc3ByaXRlcyIsInVybHMiLCJzcHJpdGUiLCJDYWNoZSIsIkxvYWRlciIsIm1heENvbmN1cnJlbnRzIiwiV29ya2VyIiwid29ya2VyIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiQmxvYiIsInBvc3RNZXNzYWdlIiwicHJveHkiLCJwZW5kaW5ncyIsImNvbXBsZXRlIiwiaW5pdENvbXBsZXRlIiwib25tZXNzYWdlIiwiZXZlbnQiLCJwZW5kaW5nIiwidG90YWwiLCJfdXBkYXRlIiwibG9hZGVkIiwic2V0Iiwib25lcnJvciIsImUiLCJsb2ciLCJfcmVxdWVzdEZpbGUiLCJzaXplIiwiY2FjaGVGaWxlIiwiaW1nIiwiSW1hZ2UiLCJvbmxvYWQiLCJ1cmwiLCJuYkZpbGVzVG90YWwiLCJMb2FkZXJNYW5hZ2VyIiwiZW5kIiwibG9hZHIiLCJkYXRhRmlsZXMiLCJ1bnBhY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOzs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQUEsUUFBT0MsWUFBUCxtQjs7Ozs7Ozs7Ozs7Ozs7OztBQ1hBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0tBRXFCQyxLOzs7QUFFcEIsaUJBQVlD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LEUsRUFBSTtBQUM1QixRQUFHLEtBQUtOLE1BQUwsSUFBZSxDQUFDLEtBQUtnRixHQUF4QixFQUE2QjtBQUM1QixVQUFLQSxHQUFMLEdBQVcsSUFBWDs7QUFFQTtBQUNBLFNBQUlFLFlBQVksRUFBaEI7QUFDQSxVQUFJLElBQUlqRSxJQUFFLENBQVYsRUFBYUEsSUFBRUMsTUFBTVAsTUFBckIsRUFBNkJNLEdBQTdCLEVBQWtDO0FBQ2pDLFVBQUlPLE9BQU9OLE1BQU1ELENBQU4sQ0FBWDs7QUFFQSxVQUFHLEtBQUtDLEtBQUwsQ0FBV00sS0FBSzVCLEdBQWhCLENBQUgsRUFBeUI7QUFDeEJzRixpQkFBVSxLQUFLaEUsS0FBTCxDQUFXTSxLQUFLNUIsR0FBaEIsQ0FBVixJQUFrQ3NCLE1BQU1ELENBQU4sRUFBUzhDLE9BQVQsQ0FBaUJ2QixRQUFuRDtBQUNBO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBOztBQUVBLFNBQUcsS0FBS3hDLE1BQUwsQ0FBWW1GLE1BQWYsRUFBdUI7QUFDdEIsV0FBS25GLE1BQUwsQ0FBWW1GLE1BQVosQ0FBbUI3RSxFQUFuQixFQUF1QjRFLFNBQXZCLEVBQWtDRCxNQUFNakcsS0FBeEMsRUFBK0NpRyxNQUFNbkYsUUFBckQsRUFBK0RtRixLQUEvRDtBQUNBLE1BRkQsTUFFTztBQUNOLFdBQUtqRixNQUFMLENBQVlvQyxVQUFaLENBQXVCOEMsU0FBdkIsRUFBa0NELEtBQWxDLEVBQXlDM0UsRUFBekM7QUFDQTtBQUNEO0FBQ0Q7OztnQ0FFWTtBQUNaLFdBQU8sS0FBS3FELFFBQVo7QUFDQTs7Ozs7O21CQTlEbUJvQixhIiwiZmlsZSI6ImJsZW5kci1sb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJibGVuZHItbG9hZGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJsZW5kci1sb2FkZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYTk4Y2I3ZTJjNjdmOTc0YWJkYjAiLCJpbXBvcnQgQmxlbmRyTG9hZGVyIGZyb20gJy4vTG9hZHInO1xuLy9pbXBvcnQgUGFja0xvYWRlciBmcm9tICcuL2xvYWRlcnMvUGFja0xvYWRlcic7XG4vL2ltcG9ydCBQYWNrVW5wYWNrZXIgZnJvbSAnLi4vcGFja2Vycy9wYWNrLXVucGFja2VyJztcbi8vaW1wb3J0IFBhY2tQYWNrZXIgZnJvbSAncGFjay1wYWNrZXInO1xuLy9pbXBvcnQgU3ByaXRlTG9hZGVyIGZyb20gJy4vbG9hZGVycy9TcHJpdGVMb2FkZXInO1xuLy9pbXBvcnQgQXVkaW9zcHJpdGVMb2FkZXIgZnJvbSAnLi9sb2FkZXJzL0F1ZGlvc3ByaXRlTG9hZGVyJztcblxuLy9Mb2Fkci5QYWNrTG9hZGVyID0gUGFja1VucGFja2VyO1xuLy9Mb2Fkci5TcHJpdGVMb2FkZXIgPSBTcHJpdGVMb2FkZXI7XG4vL0xvYWRyLkF1ZGlvc3ByaXRlTG9hZGVyID0gQXVkaW9zcHJpdGVMb2FkZXI7XG5cbndpbmRvdy5CbGVuZHJMb2FkZXIgPSBCbGVuZHJMb2FkZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJpbXBvcnQgQ2FjaGUgZnJvbSAnLi9DYWNoZS5qcyc7XG5pbXBvcnQgQmFzZUxvYWRlciBmcm9tICcuL0Jhc2VMb2FkZXIuanMnO1xuaW1wb3J0IExvYWRlck1hbmFnZXIgZnJvbSAnLi9Mb2FkZXJNYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZHIgZXh0ZW5kcyBCYXNlTG9hZGVyIHtcblxuXHRjb25zdHJ1Y3RvcihzZXJ2ZXJVcmwsIGNhY2hlID0gbmV3IENhY2hlKCkpIHtcblx0XHRzdXBlcihjYWNoZSk7XG5cblx0XHR0aGlzLnNlcnZlclVybCA9IHNlcnZlclVybDtcblx0XHR0aGlzLnBhdGggPSAnYXNzZXRzLyc7XG5cblx0XHR0aGlzLmxvYWRlcnMgPSBbXTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0dmFyIHByb21pc2VSZXNvbHZlLCBwcm9taXNlUmVqZWN0O1xuXHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0cHJvbWlzZVJlc29sdmUgPSByZXNvbHZlO1xuXHRcdFx0cHJvbWlzZVJlamVjdCA9IHJlamVjdDtcblx0XHR9KTtcblxuXHRcdHZhciBtYW5pZmVzdFVybCA9IGAke3RoaXMuc2VydmVyVXJsfW1hbmlmZXN0Lmpzb25gO1xuXG5cdFx0c3VwZXIubG9hZCh7XG5cdFx0XHR0eXBlOiAnanNvbicsXG5cdFx0XHRzcmM6IG1hbmlmZXN0VXJsXG5cdFx0fSkudGhlbigoKSA9PiB7XG5cdFx0XHRzZWxmLm1hbmlmZXN0ID0gc2VsZi5jYWNoZS5nZXQobWFuaWZlc3RVcmwpO1xuXHRcdFx0cHJvbWlzZVJlc29sdmUoKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBwcm9taXNlO1xuXHR9XG5cblx0cmVnaXN0ZXJMb2FkZXIodHlwZSwgbG9hZGVyKSB7XG5cdFx0dGhpcy5sb2FkZXJzW3R5cGVdID0gbG9hZGVyO1xuXHR9XG5cblx0bG9hZChpZHMsIG9uVXBkYXRlKSB7XG5cdFx0bGV0IHByb21pc2VSZXNvbHZlLCBwcm9taXNlUmVqZWN0O1xuXHRcdGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0cHJvbWlzZVJlc29sdmUgPSByZXNvbHZlO1xuXHRcdFx0cHJvbWlzZVJlamVjdCA9IHJlamVjdDtcblx0XHR9KTtcblxuXHRcdGlmKCFBcnJheS5pc0FycmF5KGlkcykpIHtcblx0XHRcdGlkcyA9IFtpZHNdO1xuXHRcdH1cblxuXHRcdC8vIGNvbGxlY3QgYWxsIGRlcGVuZGVuY2llc1xuXHRcdGxldCBjb2xsZWN0SWRzID0gKGlkKSA9PiB7XG5cdFx0XHRsZXQgcGFjayA9IHRoaXMubWFuaWZlc3QucGFja3NbaWRdO1xuXG5cdFx0XHRpZihwYWNrLmRlcGVuZGVuY2llcykge1xuXHRcdFx0XHRmb3IobGV0IGo9MDsgajxwYWNrLmRlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdGxldCByZWZJZCA9IHBhY2suZGVwZW5kZW5jaWVzW2pdO1xuXG5cdFx0XHRcdFx0aWYoaWRzLmluZGV4T2YocmVmSWQpIDwgMCkge1xuXHRcdFx0XHRcdFx0aWRzLnVuc2hpZnQocmVmSWQpO1xuXHRcdFx0XHRcdFx0Y29sbGVjdElkcyhyZWZJZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmKHBhY2suaW5jbHVkZXMpIHtcblx0XHRcdFx0Zm9yKGxldCBqPTA7IGo8cGFjay5pbmNsdWRlcy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdGxldCByZWZJZCA9IHBhY2suaW5jbHVkZXNbal07XG5cblx0XHRcdFx0XHRpZihpZHMuaW5kZXhPZihyZWZJZCkgPCAwKSB7XG5cdFx0XHRcdFx0XHRpZHMucHVzaChyZWZJZCk7XG5cdFx0XHRcdFx0XHRjb2xsZWN0SWRzKHJlZklkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpZHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBpZCA9IGlkc1tpXTtcblx0XHRcdGNvbGxlY3RJZHMoaWQpO1xuXHRcdH1cblxuXHRcdC8vIGNyZWF0ZSBtYW5hZ2Vyc1xuXHRcdGxldCBmaWxlcyA9IHt9O1xuXHRcdGxldCBtYW5hZ2VycyA9IHt9O1xuXG5cdFx0Ly8gY29sbGVjdCBmaWxlcyAmIG1hbmFnZXJzIGZvciBlYWNoIHBhY2tcblx0XHRmb3IobGV0IGk9MDsgaTxpZHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBpZCA9IGlkc1tpXTtcblx0XHRcdGxldCBwYWNrID0gdGhpcy5tYW5pZmVzdC5wYWNrc1tpZF07XG5cblx0XHRcdGlmKCF0aGlzLmxvYWRlcnNbcGFjay50eXBlXSkge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oJ3Vua25vd24gcGFjayB0eXBlOiAnICsgcGFjay50eXBlKTtcblx0XHRcdH1cblxuXHRcdFx0Ly9pZighcGFjay5sb2FkZXIgfHwgIXRoaXMubG9hZGVyc1twYWNrLmxvYWRlcl0pXG5cdFx0XHQvL1x0Y29udGludWU7XG5cblx0XHRcdGZpbGVzW2lkXSA9IFtdO1xuXHRcdFx0bWFuYWdlcnNbaWRdID0gW107XG5cblx0XHRcdGxldCBtYW5hZ2VyID0gbmV3IExvYWRlck1hbmFnZXIocGFjaywgdGhpcy5sb2FkZXJzW3BhY2sudHlwZV0sIGlkKTtcblx0XHRcdG1hbmFnZXJzW2lkXS5wdXNoKG1hbmFnZXIpO1xuXG5cdFx0XHRpZihwYWNrLmZpbGVzKSB7XG5cdFx0XHRcdGZvciAobGV0IGZpbGVJZCBpbiBwYWNrLmZpbGVzKSB7XG5cdFx0XHRcdFx0bGV0IGZpbGUgPSBwYWNrLmZpbGVzW2ZpbGVJZF07XG5cblx0XHRcdFx0XHRsZXQgc3JjID0gYCR7dGhpcy5zZXJ2ZXJVcmx9JHtmaWxlfWA7XG5cdFx0XHRcdFx0bWFuYWdlci5hZGRGaWxlKGZpbGVJZCwgc3JjKTtcblx0XHRcdFx0XHRmaWxlc1tpZF0ucHVzaCh7XG5cdFx0XHRcdFx0XHRzcmM6IHNyYyxcblx0XHRcdFx0XHRcdHR5cGU6IHRoaXMubWFuaWZlc3QuZmlsZXNbZmlsZV0udHlwZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gcmVxdWVzdCBmaWxlc1xuXHRcdGxldCBjdXJyZW50SW5kZXggPSAwO1xuXHRcdGxldCBsb2FkTmV4dCA9ICgpID0+IHtcblx0XHRcdGlmKGN1cnJlbnRJbmRleCA8IGlkcy5sZW5ndGgpIHtcblx0XHRcdFx0bGV0IGlkID0gaWRzW2N1cnJlbnRJbmRleCsrXTtcblx0XHRcdFx0bGV0IGxvY2FsRmlsZXMgPSBmaWxlc1tpZF07XG5cblx0XHRcdFx0c3VwZXIubG9hZChsb2NhbEZpbGVzLCAobmJGaWxlc0xvYWRlZCwgbmJUb3RhbEZpbGVzLCBieXRlc0xvYWRlZCwgYnl0ZXNUb3RhbCkgPT4ge1xuXHRcdFx0XHRcdGxldCBsb2NhbE1hbmFnZXJzID0gbWFuYWdlcnNbaWRdO1xuXG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbE1hbmFnZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRsZXQgbWFuYWdlciA9IGxvY2FsTWFuYWdlcnNbaV07XG5cdFx0XHRcdFx0XHRtYW5hZ2VyLnVwZGF0ZShsb2NhbEZpbGVzKTtcblxuXHRcdFx0XHRcdFx0aWYgKG1hbmFnZXIuaXNDb21wbGV0ZSgpKSB7XG5cdFx0XHRcdFx0XHRcdG1hbmFnZXIub25Db21wbGV0ZShsb2NhbEZpbGVzLCB0aGlzLCBpZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKG9uVXBkYXRlKSB7XG5cdFx0XHRcdFx0XHRvblVwZGF0ZShuYkZpbGVzTG9hZGVkLCBuYlRvdGFsRmlsZXMsIGJ5dGVzTG9hZGVkLCBieXRlc1RvdGFsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdGxvYWROZXh0KCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cHJvbWlzZVJlc29sdmUoKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdGxvYWROZXh0KCk7XG5cblx0XHRyZXR1cm4gcHJvbWlzZTtcblx0fVxuXG5cdHVubG9hZChpZCkge1xuXHRcdGZvcihsZXQgdHlwZSBpbiB0aGlzLmxvYWRlcnMpIHtcblx0XHRcdGxldCBsb2FkZXIgPSB0aGlzLmxvYWRlcnNbdHlwZV07XG5cblx0XHRcdGxvYWRlci51bmxvYWQoaWQsIHRoaXMuY2FjaGUpO1xuXHRcdH1cblx0fVxuXG5cdF9leHRyYWN0UGFja3MoKSB7XG5cdFx0Zm9yICh2YXIgcGFjayBvZiB0aGlzLm1hbmlmZXN0LnBhY2spIHtcblx0XHRcdHZhciBqc29uID0gdGhpcy5fZ2V0UGVuZGluZyh0aGlzLnNlcnZlclVybCArIGBhc3NldHMvcGFjay8ke3BhY2t9Lmpzb25gKS5yZXNwb25zZTtcblx0XHRcdHZhciBkYXRhID0gdGhpcy5fZ2V0UGVuZGluZyh0aGlzLnNlcnZlclVybCArIGBhc3NldHMvcGFjay8ke3BhY2t9LnBhY2tgKS5yZXNwb25zZTtcblxuXHRcdFx0dmFyIHBhY2tlZCA9IG5ldyBVbnBhY2tlcihkYXRhLCBqc29uKTtcblxuXHRcdFx0dGhpcy5wYWNrc1twYWNrXSA9IHBhY2tlZDtcblx0XHR9XG5cdH1cblxuXHRfZXh0cmFjdEF1ZGlvc3ByaXRlcygpIHtcblx0XHRmb3IgKHZhciBhdWRpb3Nwcml0ZSBvZiB0aGlzLm1hbmlmZXN0LmF1ZGlvc3ByaXRlKSB7XG5cdFx0XHR2YXIganNvbiA9IHRoaXMuX2dldFBlbmRpbmcodGhpcy5zZXJ2ZXJVcmwgKyBgYXNzZXRzL2F1ZGlvc3ByaXRlLyR7YXVkaW9zcHJpdGV9Lmpzb25gKS5yZXNwb25zZTtcblxuXHRcdFx0dGhpcy5hdWRpb3Nwcml0ZXNbYXVkaW9zcHJpdGVdID0ge1xuXHRcdFx0XHR1cmxzOiBbYGFzc2V0cy9hdWRpb3Nwcml0ZS8ke2F1ZGlvc3ByaXRlfS5vZ2dgLCBgYXNzZXRzL2F1ZGlvc3ByaXRlLyR7YXVkaW9zcHJpdGV9Lm1wM2BdLFxuXHRcdFx0XHRzcHJpdGU6IGpzb24uc3ByaXRlXG5cdFx0XHR9O1xuXHRcdH1cblx0fVxuXG5cdGdldFBhY2soaWQpIHtcblx0XHRyZXR1cm4gdGhpcy5wYWNrc1tpZF07XG5cdH1cblxuXHRnZXRBdWRpb3Nwcml0ZShpZCkge1xuXHRcdHJldHVybiB0aGlzLmF1ZGlvc3ByaXRlc1tpZF07XG5cdH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0xvYWRyLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FjaGUge1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuY2FjaGUgPSBbXTtcblx0fVxuXG5cdGdldChpZCkge1xuXHRcdHJldHVybiB0aGlzLmNhY2hlW2lkXTtcblx0fVxuXG5cdHNldChpZCwgZGF0YSkge1xuXHRcdHRoaXMuY2FjaGVbaWRdID0gZGF0YTtcblx0XHRyZXR1cm4gZGF0YTtcblx0fVxuXG5cdHJlbW92ZShpZCkge1xuXHRcdGxldCBkYXRhID0gdGhpcy5jYWNoZVtpZF07XG5cdFx0ZGVsZXRlIHRoaXMuY2FjaGVbaWRdO1xuXHRcdHJldHVybiBkYXRhO1xuXHR9XG5cblx0Y2xlYXIoKSB7XG5cdFx0dGhpcy5jYWNoZSA9IFtdO1xuXHR9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9DYWNoZS5qcyIsImltcG9ydCBDYWNoZSBmcm9tICcuL0NhY2hlLmpzJztcblxuLy8gbG9hZCBhamF4IHdvcmtlclxuLy9pbXBvcnQgV2ViV29ya2lmeSBmcm9tICd3ZWJ3b3JraWZ5Jztcbi8vaW1wb3J0IEFqYXhXb3JrZXJTY3JpcHQgZnJvbSAncmF3IS4vd29ya2Vycy9BamF4V29ya2VyLnR4dCc7XG4vL2ltcG9ydCBBamF4V29ya2VyIGZyb20gJ3dvcmtlciEuL3dvcmtlcnMvQWpheFdvcmtlci5qcyc7XG4vL2ltcG9ydCB3ZWJ3b3JraWZ5IGZyb20gJ3dlYndvcmtpZnktd2VicGFjayc7XG5pbXBvcnQgQWpheFdvcmtlclNjcmlwdCBmcm9tICdyYXchLi93b3JrZXJzL0FqYXhXb3JrZXIuanMnO1xuXG4vLyB3ZWIgd29ya2VyIGFsdGVybmF0aXZlXG4vL2ltcG9ydCBEaXJlY3RBamF4IGZyb20gJy4vRGlyZWN0QWpheCc7XG5cbi8vIHdhaXRpbmcgZm9yIGJ1ZyBmaXhcbmltcG9ydCBQc2V1ZG9Xb3JrZXIgZnJvbSAncHNldWRvLXdvcmtlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRlciB7XG5cblx0Y29uc3RydWN0b3IoY2FjaGUpIHtcblx0XHR0aGlzLm1heENvbmN1cnJlbnRzID0gNDtcblx0XHR0aGlzLmNhY2hlID0gY2FjaGU7XG5cblx0XHRpZih3aW5kb3cuV29ya2VyKSB7XG5cdFx0XHQvL3RoaXMud29ya2VyID0gbmV3IEFqYXhXb3JrZXIoKTtcblx0XHRcdC8vdGhpcy53b3JrZXIgPSBuZXcgV2ViV29ya2lmeShyZXF1aXJlKCcuL3dvcmtlcnMvQWpheFdvcmtlci5qcycpKTtcblx0XHRcdC8vdGhpcy53b3JrZXIgPSB3ZWJ3b3JraWZ5KHJlcXVpcmUucmVzb2x2ZSgnLi93b3JrZXJzL0FqYXhXb3JrZXIuanMnKSk7XG5cdFx0XHR0aGlzLndvcmtlciA9IG5ldyBXb3JrZXIod2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW0FqYXhXb3JrZXJTY3JpcHRdKSkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvL3RoaXMud29ya2VyID0gbmV3IERpcmVjdEFqYXgoKTtcblx0XHRcdHRoaXMud29ya2VyID0gbmV3IFBzZXVkb1dvcmtlcih3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbQWpheFdvcmtlclNjcmlwdF0pKSk7XG5cdFx0fVxuXG5cdFx0dGhpcy53b3JrZXIucG9zdE1lc3NhZ2Uoe1xuXHRcdFx0cHJveHk6ICdtYXgnLFxuXHRcdFx0ZGF0YTogdGhpcy5tYXhDb25jdXJyZW50c1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5wZW5kaW5ncyA9IFtdO1xuXHR9XG5cblx0bG9hZChmaWxlcywgb25VcGRhdGUpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRpZighQXJyYXkuaXNBcnJheShmaWxlcykpIHtcblx0XHRcdGZpbGVzID0gW2ZpbGVzXTtcblx0XHR9XG5cblx0XHR0aGlzLndvcmtlci5wb3N0TWVzc2FnZSh7XG5cdFx0XHRwcm94eTogJ2Fib3J0J1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5jb21wbGV0ZSA9IGZhbHNlO1xuXHRcdHRoaXMuaW5pdENvbXBsZXRlID0gZmFsc2U7XG5cdFx0dGhpcy5wZW5kaW5ncyA9IFtdO1xuXHRcdHRoaXMub25VcGRhdGUgPSBvblVwZGF0ZTtcblxuXHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0c2VsZi5wcm9taXNlUmVzb2x2ZSA9IHJlc29sdmU7XG5cdFx0XHRzZWxmLnByb21pc2VSZWplY3QgPSByZWplY3Q7XG5cdFx0fSk7XG5cblx0XHR0aGlzLndvcmtlci5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcblx0XHRcdHZhciBkYXRhID0gZXZlbnQuZGF0YTtcblx0XHRcdHZhciBwZW5kaW5nID0gc2VsZi5fZ2V0UGVuZGluZyhkYXRhLmRhdGEuc3JjKTtcblxuXHRcdFx0c3dpdGNoKGRhdGEucHJveHkpIHtcblx0XHRcdFx0Y2FzZSAnZmlsZXNpemUnOlxuXHRcdFx0XHRcdHBlbmRpbmcudG90YWwgPSBkYXRhLmRhdGEudG90YWw7XG5cdFx0XHRcdFx0c2VsZi5fdXBkYXRlKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ29ucHJvZ3Jlc3MnOlxuXHRcdFx0XHRcdHBlbmRpbmcubG9hZGVkID0gZGF0YS5kYXRhLmxvYWRlZDtcblx0XHRcdFx0XHRzZWxmLl91cGRhdGUoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnb25jb21wbGV0ZSc6XG5cdFx0XHRcdFx0cGVuZGluZy5sb2FkZWQgPSBwZW5kaW5nLnRvdGFsO1xuXHRcdFx0XHRcdHBlbmRpbmcucmVzcG9uc2UgPSBkYXRhLmRhdGEucmVzcG9uc2U7XG5cdFx0XHRcdFx0cGVuZGluZy5jb21wbGV0ZSA9IHRydWU7XG5cblx0XHRcdFx0XHQvLyBjYWNoZSBkYXRhXG5cdFx0XHRcdFx0aWYoc2VsZi5jYWNoZSkge1xuXHRcdFx0XHRcdFx0c2VsZi5jYWNoZS5zZXQocGVuZGluZy5zcmMsIHBlbmRpbmcucmVzcG9uc2UpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHNlbGYuX3VwZGF0ZSh0cnVlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9O1xuXHRcdHRoaXMud29ya2VyLm9uZXJyb3IgPSAoZSkgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coZSk7XG5cdFx0fTtcblxuXHRcdHRoaXMuaW5pdENvbXBsZXRlID0gdHJ1ZTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRoaXMuX3JlcXVlc3RGaWxlKGZpbGVzW2ldKTtcblx0XHR9XG5cblx0XHQvLyBmb3JjZSB1cGRhdGUgaW4gY2FzZSBhbGwgZmlsZXMgYXJlIGluIHRoZSBjYWNoZVxuXHRcdHRoaXMuX3VwZGF0ZSh0cnVlKTtcblxuXHRcdHJldHVybiBwcm9taXNlO1xuXHR9XG5cblx0X3JlcXVlc3RGaWxlKGZpbGUpIHtcblx0XHRsZXQgc2VsZiA9IHRoaXM7XG5cblx0XHQvLyBwcmV2ZW50IHNhbWUgZmlsZSByZXF1ZXN0c1xuXHRcdGlmKHRoaXMuX2dldFBlbmRpbmcoZmlsZS5zcmMpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0bGV0IHBlbmRpbmcgPSB7XG5cdFx0XHRzcmM6IGZpbGUuc3JjLFxuXHRcdFx0bG9hZGVkOiAwLFxuXHRcdFx0dG90YWw6IGZpbGUuc2l6ZSA/IGZpbGUuc2l6ZSA6IDBcblx0XHR9O1xuXHRcdGZpbGUucGVuZGluZyA9IHBlbmRpbmc7XG5cdFx0dGhpcy5wZW5kaW5ncy5wdXNoKHBlbmRpbmcpO1xuXG5cdFx0Ly8gY2hlY2sgY2FjaGUgZGF0YVxuXHRcdGlmKHRoaXMuY2FjaGUpIHtcblx0XHRcdGxldCBjYWNoZUZpbGUgPSB0aGlzLmNhY2hlLmdldChmaWxlLnNyYyk7XG5cblx0XHRcdGlmIChjYWNoZUZpbGUpIHtcblx0XHRcdFx0cGVuZGluZy5sb2FkZWQgPSBwZW5kaW5nLnRvdGFsO1xuXHRcdFx0XHRwZW5kaW5nLmNvbXBsZXRlID0gdHJ1ZTtcblx0XHRcdFx0cGVuZGluZy5yZXNwb25zZSA9IGNhY2hlRmlsZTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIHNwZWNpYWwgY2FzZSBmb3IgaW1hZ2VzXG5cdFx0aWYoZmlsZS50eXBlID09ICdpbWFnZScpIHtcblx0XHRcdGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHBlbmRpbmcubG9hZGVkID0gcGVuZGluZy50b3RhbDtcblx0XHRcdFx0cGVuZGluZy5yZXNwb25zZSA9IGltZztcblx0XHRcdFx0cGVuZGluZy5jb21wbGV0ZSA9IHRydWU7XG5cdFx0XHRcdHNlbGYuY2FjaGUuc2V0KGZpbGUuc3JjLCBpbWcpO1xuXHRcdFx0XHRzZWxmLl91cGRhdGUodHJ1ZSk7XG5cdFx0XHR9O1xuXHRcdFx0aW1nLnNyYyA9IGZpbGUuc3JjO1xuXHRcdH0gZWxzZSBpZihmaWxlLnR5cGUgPT0gJ21hbnVhbCcpIHtcblx0XHRcdC8vIG5vIGFjdGlvbiBvbiBtYW51YWwgZmlsZXNcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gb3RoZXJ3aXNlIHN0YW5kYXJkIGFqYXhcblx0XHRcdHRoaXMud29ya2VyLnBvc3RNZXNzYWdlKHtcblx0XHRcdFx0cHJveHk6ICdsb2FkJyxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdHNyYzogZmlsZS5zcmMsXG5cdFx0XHRcdFx0dHlwZTogZmlsZS50eXBlXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdF9nZXRQZW5kaW5nKHVybCkge1xuXHRcdGZvcihsZXQgaT0wOyBpPHRoaXMucGVuZGluZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBwZW5kaW5nID0gdGhpcy5wZW5kaW5nc1tpXTtcblx0XHRcdGlmKHBlbmRpbmcuc3JjID09IHVybCkge1xuXHRcdFx0XHRyZXR1cm4gcGVuZGluZztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdF9mb3JjZUxvYWRlZCh1cmwsIGRhdGEpIHtcblx0XHRmb3IobGV0IGk9MDsgaTx0aGlzLnBlbmRpbmdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgcGVuZGluZyA9IHRoaXMucGVuZGluZ3NbaV07XG5cblx0XHRcdGlmKHBlbmRpbmcuc3JjID09IHVybCkge1xuXHRcdFx0XHRwZW5kaW5nLmxvYWRlZCA9IHBlbmRpbmcudG90YWw7XG5cdFx0XHRcdHBlbmRpbmcucmVzcG9uc2UgPSBkYXRhO1xuXHRcdFx0XHRwZW5kaW5nLmNvbXBsZXRlID0gdHJ1ZTtcblxuXHRcdFx0XHQvLyBjYWNoZSBkYXRhXG5cdFx0XHRcdGlmKHRoaXMuY2FjaGUgJiYgZGF0YSkge1xuXHRcdFx0XHRcdHRoaXMuY2FjaGUuc2V0KHBlbmRpbmcuc3JjLCBwZW5kaW5nLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuX3VwZGF0ZSh0cnVlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0X3VwZGF0ZShjb21wbGV0ZSA9IGZhbHNlKSB7XG5cdFx0dmFyIGxvYWRlZCA9IDA7XG5cdFx0dmFyIHRvdGFsID0gMDtcblx0XHR2YXIgbmJGaWxlc0xvYWRlZCA9IDA7XG5cdFx0dmFyIG5iRmlsZXNUb3RhbCA9IDA7XG5cblx0XHRmb3IobGV0IGk9MDsgaTx0aGlzLnBlbmRpbmdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgcGVuZGluZyA9IHRoaXMucGVuZGluZ3NbaV07XG5cdFx0XHRpZihwZW5kaW5nLnRvdGFsID4gMCB8fCBwZW5kaW5nLmNvbXBsZXRlKSB7XG5cdFx0XHRcdGxvYWRlZCArPSBwZW5kaW5nLmxvYWRlZDtcblx0XHRcdFx0dG90YWwgKz0gcGVuZGluZy50b3RhbDtcblx0XHRcdFx0bmJGaWxlc1RvdGFsKys7XG5cblx0XHRcdFx0aWYocGVuZGluZy5sb2FkZWQgPj0gcGVuZGluZy50b3RhbCkge1xuXHRcdFx0XHRcdG5iRmlsZXNMb2FkZWQrKztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIG9ubHkgY2FsbCBvblVwZGF0ZSBpZiBhbGwgZmlsZXMgaGF2ZSBhIGxlbmd0aFxuXHRcdGlmKHRoaXMub25VcGRhdGUgJiYgdGhpcy5pbml0Q29tcGxldGUgJiYgIXRoaXMuY29tcGxldGUgJiYgbmJGaWxlc1RvdGFsID09IHRoaXMucGVuZGluZ3MubGVuZ3RoKSB7XG5cdFx0XHR0aGlzLm9uVXBkYXRlKG5iRmlsZXNMb2FkZWQsIHRoaXMucGVuZGluZ3MubGVuZ3RoLCBsb2FkZWQsIHRvdGFsKTtcblx0XHR9XG5cblxuXHRcdGlmKG5iRmlsZXNMb2FkZWQgPT0gdGhpcy5wZW5kaW5ncy5sZW5ndGggJiYgY29tcGxldGUgJiYgIXRoaXMuY29tcGxldGUpIHtcblx0XHRcdHRoaXMuY29tcGxldGUgPSB0cnVlO1xuXHRcdFx0dGhpcy5wcm9taXNlUmVzb2x2ZSgpO1xuXHRcdH1cblx0fVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQmFzZUxvYWRlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gXCJcXFwidXNlIHN0cmljdFxcXCI7XFxuXFxudmFyIG1heENvbmN1cnJlbnRzID0gMTtcXG5cXG5zZWxmLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XFxuXFx0c3dpdGNoIChlLmRhdGEucHJveHkpIHtcXG5cXHRcXHRjYXNlIFxcXCJsb2FkXFxcIjpcXG5cXHRcXHRcXHRwZW5kaW5nLnB1c2goZS5kYXRhLmRhdGEpO1xcblxcdFxcdFxcdGNoZWNrUGVuZGluZ1JlcXVlc3RzKCk7XFxuXFx0XFx0XFx0YnJlYWs7XFxuXFx0XFx0Y2FzZSBcXFwiYWJvcnRcXFwiOlxcblxcdFxcdFxcdG9uQWJvcnQoZS5kYXRhKTtcXG5cXHRcXHRcXHRicmVhaztcXG5cXHRcXHRjYXNlIFxcXCJtYXhcXFwiOlxcblxcdFxcdFxcdG1heENvbmN1cnJlbnRzID0gZS5kYXRhLmRhdGE7XFxuXFx0fVxcbn07XFxuXFxuZnVuY3Rpb24gY2hlY2tQZW5kaW5nUmVxdWVzdHMoKSB7XFxuXFx0d2hpbGUgKHhocnMubGVuZ3RoIDwgbWF4Q29uY3VycmVudHMgJiYgcGVuZGluZy5sZW5ndGggPiAwKSB7XFxuXFx0XFx0dmFyIGRhdGEgPSBwZW5kaW5nLnNoaWZ0KCk7XFxuXFxuXFx0XFx0bmV3IFhIUlJlcXVlc3QoZGF0YSwgb25Db21wbGV0ZSk7XFxuXFx0fVxcbn1cXG5cXG52YXIgeGhycyA9IFtdO1xcbnZhciBwZW5kaW5nID0gW107XFxuXFxuZnVuY3Rpb24gb25Db21wbGV0ZSh4aHIsIHJlc3BvbnNlKSB7XFxuXFx0Zm9yICh2YXIgaSA9IDAsIGwgPSB4aHJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xcblxcdFxcdGlmICh4aHJzW2ldLnNyYyA9PSB4aHIudXJsKSB7XFxuXFx0XFx0XFx0eGhycy5zcGxpY2UoaSwgMSk7XFxuXFx0XFx0XFx0dmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHsgcHJveHk6IFxcXCJvbmNvbXBsZXRlXFxcIiwgZGF0YTogeyBzcmM6IHhoci51cmwgfSB9KSk7XFxuXFx0XFx0XFx0bWVzc2FnZS5kYXRhLnJlc3BvbnNlID0gcmVzcG9uc2U7XFxuXFx0XFx0XFx0c2VsZi5wb3N0TWVzc2FnZShtZXNzYWdlKTtcXG5cXG5cXHRcXHRcXHRjaGVja1BlbmRpbmdSZXF1ZXN0cygpO1xcblxcdFxcdFxcdGJyZWFrO1xcblxcdFxcdH1cXG5cXHR9XFxufVxcblxcbmZ1bmN0aW9uIG9uQWJvcnQoZXZlbnQpIHtcXG5cXHR2YXIgaSA9IHhocnMubGVuZ3RoO1xcblxcdHdoaWxlIChpLS0pIHtcXG5cXHRcXHRpZiAoIWV2ZW50LmZpbGUgfHwgeGhyc1tpXS5zcmMgPT0gZXZlbnQuZmlsZS5zcmMpIHtcXG5cXHRcXHRcXHR4aHJzW2ldLnhoci5hYm9ydCgpO1xcblxcdFxcdFxcdHhocnMuc3BsaWNlKGksIDEpO1xcblxcdFxcdH1cXG5cXHR9XFxuXFxuXFx0cGVuZGluZyA9IFtdO1xcbn1cXG5cXG5mdW5jdGlvbiBYSFJSZXF1ZXN0KGRhdGEsIGNhbGxiYWNrKSB7XFxuXFx0LypcXG4gIC8veCA9IG5ldyhYTUxIdHRwUmVxdWVzdCkoKTsvLyB8fCBBY3RpdmVYT2JqZWN0KSgnTVNYTUwyLlhNTEhUVFAuMy4wJyk7XFxuICB2YXIgeCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xcbiAgeC5vcGVuKCdHRVQnLCBkYXRhLnNyYywgMSk7XFxuICB4LnNldFJlcXVlc3RIZWFkZXIoJ1gtUmVxdWVzdGVkLVdpdGgnLCAnWE1MSHR0cFJlcXVlc3QnKTtcXG4gIHguc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xcbiAgeC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XFxuICBjb25zb2xlLmxvZyh0aGlzLnJlYWR5U3RhdGUpO1xcbiAgLy94LnJlYWR5U3RhdGUgPiAzICYmIGNhbGxiYWNrICYmIGNhbGxiYWNrKHgucmVzcG9uc2VUZXh0LCB4KTtcXG4gIH07XFxuICB4LnNlbmQobnVsbCk7XFxuICAqL1xcblxcdHZhciB1cmwgPSBkYXRhLnNyYztcXG5cXHR0aGlzLnVybCA9IHVybDtcXG5cXG5cXHR2YXIgeGhyID0gdm9pZCAwO1xcblxcdHRyeSB7XFxuXFx0XFx0eGhyID0gbmV3IFhEb21haW5SZXF1ZXN0KCk7XFxuXFx0fSBjYXRjaCAoZSkge1xcblxcdFxcdHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xcblxcdH1cXG5cXG5cXHR4aHJzLnB1c2goeyBzcmM6IGRhdGEuc3JjLCB4aHI6IHhociB9KTtcXG5cXG5cXHR2YXIgY2xlYW4gPSBmdW5jdGlvbiBjbGVhbigpIHtcXG5cXHRcXHR4aHIub25sb2FkID0gbnVsbDtcXG5cXHRcXHR4aHIub25hYm9ydCA9IG51bGw7XFxuXFx0XFx0eGhyLm9ucHJvZ3Jlc3MgPSBudWxsO1xcblxcdFxcdGNhbGxiYWNrID0gbnVsbDtcXG5cXHRcXHR4aHIgPSBudWxsO1xcblxcdH07XFxuXFxuXFx0eGhyLm9wZW4oXFxcIkdFVFxcXCIsIGRhdGEuc3JjLCB0cnVlKTtcXG5cXG5cXHQvLyBjaGVjayBpZiBzdXBwb3J0cyBqc29uXFxuXFx0dmFyIHN1cHBvcnRzSnNvbiA9IHRydWU7XFxuXFx0aWYgKGRhdGEudHlwZSAmJiBkYXRhLnR5cGUudG9Mb3dlckNhc2UoKSA9PSAnanNvbicpIHtcXG5cXHRcXHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xcblxcdFxcdHN1cHBvcnRzSnNvbiA9ICdyZXNwb25zZScgaW4geGhyICYmIHhoci5yZXNwb25zZVR5cGUgPT0gJ2pzb24nO1xcblxcdH1cXG5cXG5cXHR4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsICdYTUxIdHRwUmVxdWVzdCcpO1xcblxcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XFxuXFx0eGhyLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcXG5cXHRcXHR2YXIgb2JqID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh7IHByb3h5OiBcXFwib25wcm9ncmVzc1xcXCIsIGRhdGE6IHsgbG9hZGVkOiBldmVudC5sb2FkZWQsIHRvdGFsOiBldmVudC50b3RhbCwgc3JjOiBldmVudC50YXJnZXQudXJsIH0gfSkpO1xcblxcdFxcdHNlbGYucG9zdE1lc3NhZ2Uob2JqKTtcXG5cXHR9O1xcblxcdHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XFxuXFx0XFx0aWYgKHhoci5yZWFkeVN0YXRlIDwgNCB8fCB4aHIuc3RhdHVzICE9PSAyMDApIHtcXG5cXHRcXHRcXHRjbGVhbigpO1xcblxcdFxcdFxcdHJldHVybjtcXG5cXHRcXHR9XFxuXFx0XFx0aWYgKHhoci5yZWFkeVN0YXRlID09PSA0ICYmIGNhbGxiYWNrKSB7XFxuXFx0XFx0XFx0dmFyIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlO1xcblxcblxcdFxcdFxcdC8vIHR5cGUganNvbiBidXQgbm90IHN1cHBvcnRlZFxcblxcdFxcdFxcdGlmICghc3VwcG9ydHNKc29uKSB7XFxuXFx0XFx0XFx0XFx0cmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xcblxcdFxcdFxcdH1cXG5cXG5cXHRcXHRcXHRjYWxsYmFjayh4aHIsIHJlc3BvbnNlKTtcXG5cXHRcXHRcXHRjbGVhbigpO1xcblxcdFxcdH1cXG5cXHR9O1xcblxcdHhoci5vbmFib3J0ID0gZnVuY3Rpb24gKCkge1xcblxcdFxcdGNsZWFuKCk7XFxuXFx0fTtcXG5cXHR4aHIudXJsID0gdXJsO1xcblxcblxcdC8vIGhhbmRsZSBmaWxlc2l6ZVxcblxcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XFxuXFx0XFx0aWYgKHRoaXMucmVhZHlTdGF0ZSA9PSAyKSB7XFxuXFx0XFx0XFx0dmFyIGZpbGVzaXplID0gcGFyc2VJbnQoeGhyLmdldFJlc3BvbnNlSGVhZGVyKFxcXCJDb250ZW50LUxlbmd0aFxcXCIpKTtcXG5cXG5cXHRcXHRcXHR2YXIgb2JqID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh7IHByb3h5OiBcXFwiZmlsZXNpemVcXFwiLCBkYXRhOiB7IGxvYWRlZDogMCwgdG90YWw6IGZpbGVzaXplLCBzcmM6IHVybCB9IH0pKTtcXG5cXHRcXHRcXHRzZWxmLnBvc3RNZXNzYWdlKG9iaik7XFxuXFx0XFx0fVxcblxcdH07XFxuXFxuXFx0eGhyLnJlc3BvbnNlVHlwZSA9IGRhdGEudHlwZSB8fCAndGV4dCc7XFxuXFx0eGhyLnNlbmQobnVsbCk7XFxufVwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Jhdy1sb2FkZXIhLi9zcmMvd29ya2Vycy9BamF4V29ya2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZG9FdmFsKHNlbGYsIF9fcHNldWRvd29ya2VyX3NjcmlwdCkge1xuICAvKiBqc2hpbnQgdW51c2VkOmZhbHNlICovXG4gIChmdW5jdGlvbiAoKSB7XG4gICAgLyoganNoaW50IGV2aWw6dHJ1ZSAqL1xuICAgIGV2YWwoX19wc2V1ZG93b3JrZXJfc2NyaXB0KTtcbiAgfSkuY2FsbChnbG9iYWwpO1xufVxuXG5mdW5jdGlvbiBQc2V1ZG9Xb3JrZXIocGF0aCkge1xuICB2YXIgbWVzc2FnZUxpc3RlbmVycyA9IFtdO1xuICB2YXIgZXJyb3JMaXN0ZW5lcnMgPSBbXTtcbiAgdmFyIHdvcmtlck1lc3NhZ2VMaXN0ZW5lcnMgPSBbXTtcbiAgdmFyIHdvcmtlckVycm9yTGlzdGVuZXJzID0gW107XG4gIHZhciBwb3N0TWVzc2FnZUxpc3RlbmVycyA9IFtdO1xuICB2YXIgdGVybWluYXRlZCA9IGZhbHNlO1xuICB2YXIgc2NyaXB0O1xuICB2YXIgd29ya2VyU2VsZjtcblxuICB2YXIgYXBpID0gdGhpcztcblxuICAvLyBjdXN0b20gZWFjaCBsb29wIGlzIGZvciBJRTggc3VwcG9ydFxuICBmdW5jdGlvbiBleGVjdXRlRWFjaChhcnIsIGZ1bikge1xuICAgIHZhciBpID0gLTE7XG4gICAgd2hpbGUgKCsraSA8IGFyci5sZW5ndGgpIHtcbiAgICAgIGlmIChhcnJbaV0pIHtcbiAgICAgICAgZnVuKGFycltpXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2FsbEVycm9yTGlzdGVuZXIoZXJyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgbGlzdGVuZXIoe1xuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICBlcnJvcjogZXJyLFxuICAgICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZVxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZnVuKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAodHlwZSA9PT0gJ21lc3NhZ2UnKSB7XG4gICAgICBtZXNzYWdlTGlzdGVuZXJzLnB1c2goZnVuKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICAgIGVycm9yTGlzdGVuZXJzLnB1c2goZnVuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZ1bikge1xuICAgICAgdmFyIGxpc3RlbmVycztcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAodHlwZSA9PT0gJ21lc3NhZ2UnKSB7XG4gICAgICAgIGxpc3RlbmVycyA9IG1lc3NhZ2VMaXN0ZW5lcnM7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICAgICAgbGlzdGVuZXJzID0gZXJyb3JMaXN0ZW5lcnM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgaSA9IC0xO1xuICAgICAgd2hpbGUgKCsraSA8IGxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgICAgICBpZiAobGlzdGVuZXIgPT09IGZ1bikge1xuICAgICAgICAgIGRlbGV0ZSBsaXN0ZW5lcnNbaV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBvc3RFcnJvcihlcnIpIHtcbiAgICB2YXIgY2FsbEZ1biA9IGNhbGxFcnJvckxpc3RlbmVyKGVycik7XG4gICAgaWYgKHR5cGVvZiBhcGkub25lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbEZ1bihhcGkub25lcnJvcik7XG4gICAgfVxuICAgIGlmICh3b3JrZXJTZWxmICYmIHR5cGVvZiB3b3JrZXJTZWxmLm9uZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxGdW4od29ya2VyU2VsZi5vbmVycm9yKTtcbiAgICB9XG4gICAgZXhlY3V0ZUVhY2goZXJyb3JMaXN0ZW5lcnMsIGNhbGxGdW4pO1xuICAgIGV4ZWN1dGVFYWNoKHdvcmtlckVycm9yTGlzdGVuZXJzLCBjYWxsRnVuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1blBvc3RNZXNzYWdlKG1zZykge1xuICAgIGZ1bmN0aW9uIGNhbGxGdW4obGlzdGVuZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxpc3RlbmVyKHtkYXRhOiBtc2d9KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBwb3N0RXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAod29ya2VyU2VsZiAmJiB0eXBlb2Ygd29ya2VyU2VsZi5vbm1lc3NhZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxGdW4od29ya2VyU2VsZi5vbm1lc3NhZ2UpO1xuICAgIH1cbiAgICBleGVjdXRlRWFjaCh3b3JrZXJNZXNzYWdlTGlzdGVuZXJzLCBjYWxsRnVuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvc3RNZXNzYWdlKG1zZykge1xuICAgIGlmICh0eXBlb2YgbXNnID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdwb3N0TWVzc2FnZSgpIHJlcXVpcmVzIGFuIGFyZ3VtZW50Jyk7XG4gICAgfVxuICAgIGlmICh0ZXJtaW5hdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghc2NyaXB0KSB7XG4gICAgICBwb3N0TWVzc2FnZUxpc3RlbmVycy5wdXNoKG1zZyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJ1blBvc3RNZXNzYWdlKG1zZyk7XG4gIH1cblxuICBmdW5jdGlvbiB0ZXJtaW5hdGUoKSB7XG4gICAgdGVybWluYXRlZCA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiB3b3JrZXJQb3N0TWVzc2FnZShtc2cpIHtcbiAgICBmdW5jdGlvbiBjYWxsRnVuKGxpc3RlbmVyKSB7XG4gICAgICBsaXN0ZW5lcih7XG4gICAgICAgIGRhdGE6IG1zZ1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYXBpLm9ubWVzc2FnZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbEZ1bihhcGkub25tZXNzYWdlKTtcbiAgICB9XG4gICAgZXhlY3V0ZUVhY2gobWVzc2FnZUxpc3RlbmVycywgY2FsbEZ1bik7XG4gIH1cblxuICBmdW5jdGlvbiB3b3JrZXJBZGRFdmVudExpc3RlbmVyKHR5cGUsIGZ1bikge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHR5cGUgPT09ICdtZXNzYWdlJykge1xuICAgICAgd29ya2VyTWVzc2FnZUxpc3RlbmVycy5wdXNoKGZ1bik7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgICB3b3JrZXJFcnJvckxpc3RlbmVycy5wdXNoKGZ1bik7XG4gICAgfVxuICB9XG5cbiAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gIHhoci5vcGVuKCdHRVQnLCBwYXRoKTtcbiAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgIHNjcmlwdCA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgIHdvcmtlclNlbGYgPSB7XG4gICAgICAgICAgcG9zdE1lc3NhZ2U6IHdvcmtlclBvc3RNZXNzYWdlLFxuICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXI6IHdvcmtlckFkZEV2ZW50TGlzdGVuZXIsXG4gICAgICAgIH07XG4gICAgICAgIGRvRXZhbCh3b3JrZXJTZWxmLCBzY3JpcHQpO1xuICAgICAgICB2YXIgY3VycmVudExpc3RlbmVycyA9IHBvc3RNZXNzYWdlTGlzdGVuZXJzO1xuICAgICAgICBwb3N0TWVzc2FnZUxpc3RlbmVycyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1cnJlbnRMaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBydW5Qb3N0TWVzc2FnZShjdXJyZW50TGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zdEVycm9yKG5ldyBFcnJvcignY2Fubm90IGZpbmQgc2NyaXB0ICcgKyBwYXRoKSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHhoci5zZW5kKCk7XG5cbiAgYXBpLnBvc3RNZXNzYWdlID0gcG9zdE1lc3NhZ2U7XG4gIGFwaS5hZGRFdmVudExpc3RlbmVyID0gYWRkRXZlbnRMaXN0ZW5lcjtcbiAgYXBpLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSByZW1vdmVFdmVudExpc3RlbmVyO1xuICBhcGkudGVybWluYXRlID0gdGVybWluYXRlO1xuXG4gIHJldHVybiBhcGk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHNldWRvV29ya2VyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9wc2V1ZG8td29ya2VyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRlck1hbmFnZXIge1xuXG5cdGNvbnN0cnVjdG9yKHR5cGUsIGxvYWRlcikge1xuXHRcdHRoaXMudHlwZSA9IHR5cGU7XG5cdFx0dGhpcy5sb2FkZXIgPSBsb2FkZXI7XG5cdFx0dGhpcy5maWxlcyA9IHt9O1xuXHR9XG5cblx0dW5sb2FkKCkge1xuXHR9XG5cblx0dXBkYXRlKGZpbGVzKSB7XG5cdFx0aWYoIXRoaXMuZW5kKSB7XG5cdFx0XHRsZXQgY29tcGxldGUgPSB0cnVlO1xuXG5cdFx0XHQvLyBjaGVjayBpZiByZXF1ZXN0ZWQgZmlsZXMgYXJlIGFsbCBsb2FkZWRcblx0XHRcdGZvciAobGV0IHVybCBpbiB0aGlzLmZpbGVzKSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAodXJsID09IGZpbGVzW2ldLnNyYykge1xuXHRcdFx0XHRcdFx0aWYgKCFmaWxlc1tpXS5wZW5kaW5nLmNvbXBsZXRlKSB7XG5cdFx0XHRcdFx0XHRcdGNvbXBsZXRlID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuY29tcGxldGUgPSBjb21wbGV0ZTtcblx0XHR9XG5cdH1cblxuXHRhZGRGaWxlKGlkLCB1cmwpIHtcblx0XHR0aGlzLmZpbGVzW3VybF0gPSBpZDtcblx0fVxuXG5cdG9uQ29tcGxldGUoZmlsZXMsIGxvYWRyLCBpZCkge1xuXHRcdGlmKHRoaXMubG9hZGVyICYmICF0aGlzLmVuZCkge1xuXHRcdFx0dGhpcy5lbmQgPSB0cnVlO1xuXG5cdFx0XHQvLyBnYXRoZXIgZmlsZXNcblx0XHRcdGxldCBkYXRhRmlsZXMgPSB7fTtcblx0XHRcdGZvcihsZXQgaT0wOyBpPGZpbGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBmaWxlID0gZmlsZXNbaV07XG5cblx0XHRcdFx0aWYodGhpcy5maWxlc1tmaWxlLnNyY10pIHtcblx0XHRcdFx0XHRkYXRhRmlsZXNbdGhpcy5maWxlc1tmaWxlLnNyY11dID0gZmlsZXNbaV0ucGVuZGluZy5yZXNwb25zZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvL2ZvcihsZXQgaWQgaW4gdGhpcy5maWxlcykge1xuXHRcdFx0Ly9cdGxldCB1cmwgPSB0aGlzLmZpbGVzW2lkXTtcblx0XHRcdC8vfVxuXG5cdFx0XHRpZih0aGlzLmxvYWRlci51bnBhY2spIHtcblx0XHRcdFx0dGhpcy5sb2FkZXIudW5wYWNrKGlkLCBkYXRhRmlsZXMsIGxvYWRyLmNhY2hlLCBsb2Fkci5tYW5pZmVzdCwgbG9hZHIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5sb2FkZXIub25Db21wbGV0ZShkYXRhRmlsZXMsIGxvYWRyLCBpZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aXNDb21wbGV0ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5jb21wbGV0ZTtcblx0fVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvTG9hZGVyTWFuYWdlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=