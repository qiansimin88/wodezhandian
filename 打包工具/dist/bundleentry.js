/*! 这是钱思敏的webpack练手项目通过插件BannerPlugin做到的 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1)  //载入style.css     cssloader复制读取文件  style-loader负责把文件写进 html 的head里面
	document.write('it works');
	document.write(__webpack_require__(6))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body {background: red;background: url(" + __webpack_require__(4) + ");}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	//moduel.js
	module.exports = 'it works from module.js';

/***/ }
/******/ ]);