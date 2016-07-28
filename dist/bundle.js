/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "d581794a71f75f6f0b04"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
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
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Dock = exports.Piece = exports.Map = exports.Dir = exports.Types = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _enum2 = __webpack_require__(3);
	
	var _enum3 = _interopRequireDefault(_enum2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var env = ("development");
	
	//Generate constants
	var Types = exports.Types = (0, _enum3.default)(['WHEAT', 'SHEEP', 'WOOD', 'BRICK', 'ORE', 'DESERT', 'WATER']);
	
	var Dir = exports.Dir = (0, _enum3.default)(['BOTTOM_RIGHT', 'BOTTOM_LEFT', 'TOP', 'BOTTOM', 'TOP_RIGHT', 'TOP_LEFT', 'RIGHT', 'LEFT']);
	
	var Neighbors = (0, _enum3.default)([{ name: 'TOP_RIGHT', x: 0, y: -1 }, { name: 'RIGHT', x: 1, y: 0 }, { name: 'BOTTOM_RIGHT', x: 1, y: 1 }, { name: 'BOTTOM_LEFT', x: 0, y: 1 }, { name: 'LEFT', x: -1, y: 0 }, { name: 'TOP_LEFT', x: -1, y: -1 }]);
	
	var NeighborsNeg = (0, _enum3.default)([{ name: 'TOP_RIGHT', x: 1, y: -1 }, { name: 'RIGHT', x: 1, y: 0 }, { name: 'BOTTOM_RIGHT', x: 0, y: 1 }, { name: 'BOTTOM_LEFT', x: -1, y: 1 }, { name: 'LEFT', x: -1, y: 0 }, { name: 'TOP_LEFT', x: 0, y: -1 }]);
	
	var DockType = (0, _enum3.default)(["3:1", "2:1"]);
	
	Array.prototype.shuffleSort = function () {
	  for (var i = this.length - 1; i > 0; i--) {
	    var j = Math.floor(Math.random() * (i + 1));
	    var temp = this[i];
	    this[i] = this[j];
	    this[j] = temp;
	  }
	  return this;
	};
	
	var Map = exports.Map = function () {
	  function Map() {
	    var _this = this;
	
	    _classCallCheck(this, Map);
	
	    this.numbers = [];
	    this.typesAvailable = [];
	    this.docks = [];
	
	    this.pieces = [[0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0]];
	
	    //initialize array of dock types and shuffle array
	    this.docks = [Types.WHEAT, Types.BRICK, Types.ORE, Types.WOOD, Types.SHEEP, 1, 1, 1, 1].shuffleSort();
	    //.map((dock, i) => i < 5 ? DockType["2:1"] : DockType["3:1"]).shuffleSort();
	
	    this.initPieces();
	    //this.setDocks();
	
	    this.pieces.forEach(function (row, i) {
	      row.forEach(function (piece, j) {
	        //if (piece instanceof Dock) piece.calcDir(j, i, this);
	        _this.findNeighbors(i, j);
	      });
	    });
	  }
	
	  //Initialization code
	
	
	  _createClass(Map, [{
	    key: 'initPieces',
	    value: function initPieces() {
	      var _this2 = this;
	
	      this.pieces = this.pieces.map(function (row, i) {
	        return row.map(function (column, j) {
	          if (i === 0 || j === 0 || i === _this2.pieces.length - 1 || j === _this2.pieces[i].length - 1) {
	            return new Piece(Types.WATER, -1);
	          } else {
	            return new Piece(null, -1);
	          }
	        }, _this2);
	      }, this);
	    }
	
	    //Initialization code
	
	  }, {
	    key: 'setNumbers',
	    value: function setNumbers() {
	      this.numbers = [8, 8, 6, 6, 12, 11, 11, 10, 10, 9, 9, 5, 5, 4, 4, 3, 3, 2, 0];
	    }
	
	    //Initialization code: randomize the palcement of docks amongst water pieces
	
	  }, {
	    key: 'randomizeDocks',
	    value: function randomizeDocks() {
	      var _this3 = this;
	
	      //initialize array of dock types and shuffle array
	      this.docks = [Types.WHEAT, Types.BRICK, Types.ORE, Types.WOOD, Types.SHEEP, 1, 1, 1, 1].shuffleSort();
	      var docks = [];
	      //push first row
	      docks.push.apply(docks, this.pieces[0]);
	
	      //push right column
	      for (var i = 1; i < this.pieces.length - 1; i++) {
	        var j = this.pieces[i].length - 1;
	        docks.push(this.pieces[i][j]);
	      }
	
	      //push bottom row: reverse
	      for (var _i = this.pieces[this.pieces.length - 1].length - 1; _i >= 0; _i--) {
	        docks.push(this.pieces[this.pieces.length - 1][_i]);
	      }
	      //docks.push.apply(docks, this.pieces[this.pieces.length - 1]);
	
	      //push left column
	      for (var _i2 = this.pieces.length - 2; _i2 > 0; _i2--) {
	        docks.push(this.pieces[_i2][0]);
	      }
	
	      //either 1st or second block
	      var chance = Math.floor(Math.random() * 2);
	      for (var _i3 = chance; _i3 < docks.length; _i3 += 2) {
	        docks[_i3].flag = true;
	      } //create a new set of pieces: replace those that have been flagged with docks
	      this.pieces = this.pieces.map(function (row) {
	        return row.map(function (piece) {
	          return piece.flag ? new Dock(_this3.docks.pop()) : piece;
	        });
	      });
	
	      //calculate dock direction
	      this.pieces.forEach(function (row, i) {
	        return row.forEach(function (piece, j) {
	          if (piece instanceof Dock) piece.calcDir(j, i, _this3);
	        });
	      });
	    }
	
	    //Initialization code
	
	  }, {
	    key: 'setTypes',
	    value: function setTypes() {
	      this.typesAvailable = [this.makeTileCounter(4, Types.WHEAT), this.makeTileCounter(4, Types.SHEEP), this.makeTileCounter(4, Types.WOOD), this.makeTileCounter(3, Types.BRICK), this.makeTileCounter(3, Types.ORE)].map(function (arr) {
	        var temp = [];
	        for (var i = 0; i < arr.count; i++) {
	          temp = temp.concat(arr.type);
	        }
	        return temp;
	      }).reduce(function (prev, curr) {
	        return prev.concat(curr);
	      }); //flatten array into list of types
	    }
	
	    //Initialization code
	    //helper method used to instantiate set of Types
	
	  }, {
	    key: 'makeTileCounter',
	    value: function makeTileCounter(count, type) {
	      return { count: count, type: type };
	    }
	
	    //find all neighbors of piece at location[i][j]
	
	  }, {
	    key: 'findNeighbors',
	    value: function findNeighbors(i, j) {
	      var _this4 = this;
	
	      Neighbors.enumerate().forEach(function (neighbor) {
	        var yOffset = void 0;
	        var xOffset = void 0;
	
	        if (i === Math.floor(_this4.pieces.length / 2) && (neighbor == Dir.BOTTOM_LEFT || neighbor == Dir.BOTTOM_RIGHT)) {
	          yOffset = i + NeighborsNeg[neighbor].y;
	          xOffset = j + NeighborsNeg[neighbor].x;
	        } else if (i > Math.floor(_this4.pieces.length / 2)) {
	          yOffset = i + NeighborsNeg[neighbor].y;
	          xOffset = j + NeighborsNeg[neighbor].x;
	        } else {
	          yOffset = i + Neighbors[neighbor].y;
	          xOffset = j + Neighbors[neighbor].x;
	        }
	
	        if (yOffset > 0 && yOffset < _this4.pieces.length - 1 && xOffset > 0 && xOffset < _this4.pieces[yOffset].length - 1) {
	          _this4.pieces[i][j].neighbors.push(_this4.pieces[yOffset][xOffset]);
	        }
	      });
	    }
	  }, {
	    key: 'checkNeighbors',
	    value: function checkNeighbors(cb) {
	
	      for (var i = 1; i < this.pieces.length - 1; i++) {
	        for (var j = 1; j < this.pieces[i].length - 1; j++) {
	
	          //iterate over neighbor nodes
	          for (var k = 0; k < this.pieces[i][j].neighbors.length; k++) {
	            if (!cb(this.pieces[i][j], this.pieces[i][j].neighbors[k])) {
	              return false;
	            }
	          }
	        }
	      }
	      return true;
	    }
	  }, {
	    key: 'checkNumbers',
	    value: function checkNumbers() {
	      return this.checkNeighbors(function (piece, neighbor) {
	        return !((piece.number === 6 || piece.number === 8) && (neighbor.number === 6 || neighbor.number === 8));
	      });
	    }
	  }, {
	    key: 'checkTypes',
	    value: function checkTypes() {
	      return this.checkNeighbors(function (piece, neighbor) {
	        return piece['type'] !== neighbor['type'];
	      });
	    }
	  }, {
	    key: 'shufflePieces',
	    value: function shufflePieces() {
	      this.typesAvailable.shuffleSort();
	    }
	  }, {
	    key: 'shuffleNumbers',
	    value: function shuffleNumbers() {
	      this.numbers.shuffleSort();
	    }
	  }, {
	    key: 'distribute',
	    value: function distribute(fr, to, func) {
	      for (var i = 1; i < to.length - 1; i++) {
	        for (var j = 1; j < to[i].length - 1; j++) {
	          func(fr, to, i, j);
	        }
	      }
	    }
	  }, {
	    key: 'randomizeTypes',
	    value: function randomizeTypes() {
	      var _this5 = this;
	
	      this.shufflePieces();
	      this.distribute(this.typesAvailable, this.pieces, function (fr, to, i, j) {
	
	        if (to[i][j].number === 0 || _this5.typesAvailable.length === 0) {
	          to[i][j].type = Types.DESERT;
	        } else {
	          to[i][j].type = fr.pop();
	        }
	      });
	    }
	  }, {
	    key: 'randomNumbers',
	    value: function randomNumbers() {
	      this.shuffleNumbers();
	      this.distribute(this.numbers, this.pieces, function (fr, to, i, j) {
	        to[i][j].number = fr.pop();
	      });
	    }
	  }, {
	    key: 'randomDistro',
	    value: function randomDistro() {
	      if (false) this.count = 0;
	      do {
	        this.setNumbers();
	        this.randomNumbers();
	        //if (process.env.NODE_ENV === 'test') this.count++;
	      } while (!this.checkNumbers());
	
	      var test = false;
	      do {
	        this.setTypes();
	        this.randomizeTypes();
	        if (false) this.count++;
	      } while (!this.checkTypes());
	
	      do {
	        this.randomizeDocks();
	      } while (false);
	    }
	  }, {
	    key: 'getPieces',
	    value: function getPieces() {
	      return this.pieces;
	    }
	  }]);
	
	  return Map;
	}();
	
	var Piece = exports.Piece = function Piece() {
	  var type = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	  var number = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	  _classCallCheck(this, Piece);
	
	  this.type = type;
	  this.number = number;
	  this.neighbors = [];
	}
	
	//implement recursive checking strategy
	
	;
	
	var Dock = exports.Dock = function (_Piece) {
	  _inherits(Dock, _Piece);
	
	  function Dock(dockType) {
	    _classCallCheck(this, Dock);
	
	    var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(Dock).call(this, Types.WATER, -1));
	
	    _this6.dockType = dockType;
	    _this6.dockDir = null;
	    return _this6;
	  }
	
	  _createClass(Dock, [{
	    key: 'calcDir',
	    value: function calcDir(x, y, map) {
	      if (y === 0) {
	        if (x < map.pieces[y].length / 2) {
	          this.dockDir = Dir.BOTTOM_RIGHT;
	        } else {
	          this.dockDir = Dir.BOTTOM_LEFT;
	        }
	      } else if (y === map.pieces.length - 1) {
	        if (x < map.pieces[y].length / 2) {
	          this.dockDir = Dir.TOP_RIGHT;
	        } else {
	          this.dockDir = Dir.TOP_LEFT;
	        }
	      } else if (map.pieces[y].length - 2 > map.pieces.length / 2) {
	        if (x === 0) {
	          this.dockDir = Dir.RIGHT;
	        } else {
	          this.dockDir = Dir.LEFT;
	        }
	      } else if (x === 0) {
	        if (y < map.pieces.length / 2) {
	          this.dockDir = Dir.BOTTOM_RIGHT;
	        } else {
	          this.dockDir = Dir.TOP_RIGHT;
	        }
	      } else {
	        if (y < map.pieces.length / 2) {
	          this.dockDir = Dir.BOTTOM_LEFT;
	        } else {
	          this.dockDir = Dir.TOP_LEFT;
	        }
	      }
	    }
	  }]);
	
	  return Dock;
	}(Piece);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _map = __webpack_require__(1);
	
	var _MapView = __webpack_require__(4);
	
	//(() => {
	var ele = document.getElementById('map');
	ele.width = '' + 750;
	ele.height = '' + 750;
	var ctx = document.getElementById('map').getContext('2d');
	var map = new _map.Map();
	var mView = new _MapView.MapView({ x: 100, y: 175 }, 50);
	
	//window.requestAnimationFrame(mView.draw);
	map.randomDistro();
	
	setInterval(function () {
	  ctx.clearRect(0, 0, ele.width, ele.height);
	  mView.draw(map);
	}, 50);
	//mView.draw();
	
	//PieceView.drawHex(ctx, {x: 50, y: 50}, 50);
	
	var button = document.getElementById('test-button');
	button.addEventListener('click', function () {
	  map = new _map.Map();
	  map.randomDistro();
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = _enum;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Enum = function () {
	  function Enum(arr) {
	    var _this = this;
	
	    _classCallCheck(this, Enum);
	
	    arr.forEach(function (arg) {
	      if (arg instanceof Object) {
	        _this[arg.name] = arg;
	        delete arg.name;
	      } else {
	        _this[arg] = arg;
	      }
	    });
	  }
	
	  _createClass(Enum, [{
	    key: "enumerate",
	    value: function enumerate() {
	      var arr = [];
	      for (var v in this) {
	        arr = arr.concat(v);
	      }
	      return arr;
	    }
	  }]);
	
	  return Enum;
	}();
	
	function _enum(arr) {
	  return new Enum(arr);
	}
	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PieceView = exports.MapView = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _map = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MapView = exports.MapView = function () {
	  function MapView(origin, width, map) {
	    _classCallCheck(this, MapView);
	
	    this.map = map;
	    this.width = width;
	    this.origin = origin;
	    this.pieceHeight = width; //* Math.sqrt(3);
	  }
	
	  _createClass(MapView, [{
	    key: 'calcX',
	    value: function calcX(xOffset) {
	      return this.origin.x + xOffset * this.width * 3 / 2;
	    }
	  }, {
	    key: 'invX',
	    value: function invX(xOffset) {
	      return this.origin.x + xOffset * this.width * (3 / 2) - this.width;
	    }
	  }, {
	    key: 'invY',
	    value: function invY(xOffset, yOffset) {
	      this.origin + xOffset * this.width;
	    }
	  }, {
	    key: 'invX',
	    value: function invX(xOffset, yOffset) {
	      this.origin.x + xOffset * this.width * (3 / 2) - this.width;
	    }
	  }, {
	    key: 'calcY',
	    value: function calcY(xOffset, yOffset) {
	      //return this.origin.y + yOffset * this.width * 2
	      var y = this.origin.y + yOffset * this.width * Math.sqrt(3);
	      //let y = this.origin.y //+ yOffset * Math.sqrt(3) * this.width;
	      switch (xOffset) {
	        case 0:
	          return y;
	        case 1:
	          return y - this.pieceHeight * Math.sqrt(3) / 2;
	        case 2:
	          return y - this.pieceHeight * Math.sqrt(3);
	        case 3:
	          return y - this.pieceHeight * Math.sqrt(3) * 3 / 2;
	        case 4:
	          return y - this.pieceHeight * Math.sqrt(3);
	        case 5:
	          return y - this.pieceHeight * Math.sqrt(3) / 2;
	        case 6:
	          return y;
	
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(map) {
	      var context = document.getElementById('map').getContext('2d');
	      context.save();
	      context.font = this.width / 3 + 'px Verdana';
	      var pieces = map.pieces;
	      for (var i = 0; i < pieces.length; i++) {
	
	        var y = this.calcX(i);
	        var column = pieces[i];
	        for (var j = 0; j < column.length; j++) {
	
	          var x = this.calcY(i, j);
	          context.fillStyle = this.setColor(column[j].type);
	
	          PieceView.drawHex(context, { x: x, y: y }, this.width);
	          this.drawDock(context, { x: x, y: y }, column[j]);
	
	          if (column[j].number > 0) {
	            context.fillStyle = 'white';
	            context.beginPath();
	            context.arc(x, y, this.width / 3, 0, 2 * Math.PI);
	            context.stroke();
	            context.fill();
	
	            var num = column[j].number;
	            context.textAlign = 'center';
	            context.textBaseline = 'middle';
	            context.fillStyle = num === 6 || num === 8 ? 'red' : 'black';
	            context.fillText(column[j].number, x, y);
	          }
	
	          if (column[j].type == _map.Types.WATER) {
	            this.drawDock(context, { x: x, y: y }, column[j]);
	          }
	        }
	      }
	      context.restore();
	    }
	  }, {
	    key: 'getDistance',
	    value: function getDistance(x, y) {
	      return Math.sqrt(x * x + y + y);
	    }
	  }, {
	    key: 'drawDock',
	    value: function drawDock(context, origin, piece) {
	      //this.context.save();
	      if (piece && piece.dockType) {
	        DockView.drawDock(context, origin, this.width, piece.dockType === 1 ? 'white' : this.setColor(piece.dockType), piece.dockDir);
	      }
	    }
	  }, {
	    key: 'setColor',
	    value: function setColor(type) {
	      switch (type) {
	        case _map.Types.WHEAT:
	          return "lightgreen";
	        case _map.Types.SHEEP:
	          return "green";
	        case _map.Types.WOOD:
	          return "brown";
	        case _map.Types.BRICK:
	          return "red";
	        case _map.Types.ORE:
	          return "black";
	        case _map.Types.DESERT:
	          return "gray";
	        case _map.Types.WATER:
	          return "blue";
	      }
	    }
	  }]);
	
	  return MapView;
	}();
	
	var PieceView = exports.PieceView = function () {
	  function PieceView() {
	    _classCallCheck(this, PieceView);
	  }
	
	  _createClass(PieceView, null, [{
	    key: 'drawHex',
	    value: function drawHex(context, origin, width) {
	      context.save();
	      var ratio = width * Math.sqrt(3) / 2;
	      var xOff = 3 / 2 * width / 2;
	      var offset = ratio * Math.sqrt(3);
	      context.beginPath();
	
	      context.moveTo(origin.x, origin.y);
	      context.lineTo(origin.x, origin.y - width);
	
	      context.lineTo(origin.x + ratio, origin.y - width / 2);
	      context.lineTo(origin.x + ratio, origin.y + width / 2);
	      context.lineTo(origin.x, origin.y + width);
	
	      context.lineTo(origin.x - ratio, origin.y + width / 2);
	      context.lineTo(origin.x - ratio, origin.y - width / 2);
	      context.lineTo(origin.x, origin.y - width);
	
	      context.fill();
	      context.restore();
	    }
	  }]);
	
	  return PieceView;
	}();
	
	var DockView = function () {
	  function DockView() {
	    _classCallCheck(this, DockView);
	  }
	
	  _createClass(DockView, null, [{
	    key: 'drawDock',
	    value: function drawDock(context, origin, width, color, dockDir) {
	      context.save();
	
	      context.translate(origin.x, origin.y);
	      context.rotate(DockView.calcDir(dockDir) * Math.PI / 180);
	      //context.moveTo(origin.x, origin.y);
	      context.fillStyle = color;
	      context.beginPath();
	
	      var newWidth = 3 / 4 * width;
	      var xDir = newWidth / 2;
	      var yDir = newWidth * Math.sqrt(3) / 2;
	      context.lineTo(xDir, yDir);
	      context.lineTo(-xDir, yDir);
	      context.lineTo(0, 0);
	
	      context.fill();
	      context.restore();
	    }
	  }, {
	    key: 'calcDir',
	    value: function calcDir(dir) {
	      switch (dir) {
	        case "TOP_RIGHT":
	          return -150;
	        case "TOP_LEFT":
	          return 150;
	        case "RIGHT":
	          return -90;
	        case "LEFT":
	          return 90;
	        case "BOTTOM_RIGHT":
	          return -30;
	        case "BOTTOM_LEFT":
	          return 30;
	        default:
	          return 0;
	      }
	    }
	  }]);

	  return DockView;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map