/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/content-type/index.js":
/*!********************************************!*\
  !*** ./node_modules/content-type/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * RegExp to match *( ";" parameter ) in RFC 7231 sec 3.1.1.1
 *
 * parameter     = token "=" ( token / quoted-string )
 * token         = 1*tchar
 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
 *               / DIGIT / ALPHA
 *               ; any VCHAR, except delimiters
 * quoted-string = DQUOTE *( qdtext / quoted-pair ) DQUOTE
 * qdtext        = HTAB / SP / %x21 / %x23-5B / %x5D-7E / obs-text
 * obs-text      = %x80-FF
 * quoted-pair   = "\" ( HTAB / SP / VCHAR / obs-text )
 */
var PARAM_REGEXP = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g // eslint-disable-line no-control-regex
var TEXT_REGEXP = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/ // eslint-disable-line no-control-regex
var TOKEN_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/

/**
 * RegExp to match quoted-pair in RFC 7230 sec 3.2.6
 *
 * quoted-pair = "\" ( HTAB / SP / VCHAR / obs-text )
 * obs-text    = %x80-FF
 */
var QESC_REGEXP = /\\([\u000b\u0020-\u00ff])/g // eslint-disable-line no-control-regex

/**
 * RegExp to match chars that must be quoted-pair in RFC 7230 sec 3.2.6
 */
var QUOTE_REGEXP = /([\\"])/g

/**
 * RegExp to match type in RFC 7231 sec 3.1.1.1
 *
 * media-type = type "/" subtype
 * type       = token
 * subtype    = token
 */
var TYPE_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/

/**
 * Module exports.
 * @public
 */

exports.format = format
exports.parse = parse

/**
 * Format object to media type.
 *
 * @param {object} obj
 * @return {string}
 * @public
 */

function format (obj) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('argument obj is required')
  }

  var parameters = obj.parameters
  var type = obj.type

  if (!type || !TYPE_REGEXP.test(type)) {
    throw new TypeError('invalid type')
  }

  var string = type

  // append parameters
  if (parameters && typeof parameters === 'object') {
    var param
    var params = Object.keys(parameters).sort()

    for (var i = 0; i < params.length; i++) {
      param = params[i]

      if (!TOKEN_REGEXP.test(param)) {
        throw new TypeError('invalid parameter name')
      }

      string += '; ' + param + '=' + qstring(parameters[param])
    }
  }

  return string
}

/**
 * Parse media type to object.
 *
 * @param {string|object} string
 * @return {Object}
 * @public
 */

function parse (string) {
  if (!string) {
    throw new TypeError('argument string is required')
  }

  // support req/res-like objects as argument
  var header = typeof string === 'object'
    ? getcontenttype(string)
    : string

  if (typeof header !== 'string') {
    throw new TypeError('argument string is required to be a string')
  }

  var index = header.indexOf(';')
  var type = index !== -1
    ? header.slice(0, index).trim()
    : header.trim()

  if (!TYPE_REGEXP.test(type)) {
    throw new TypeError('invalid media type')
  }

  var obj = new ContentType(type.toLowerCase())

  // parse parameters
  if (index !== -1) {
    var key
    var match
    var value

    PARAM_REGEXP.lastIndex = index

    while ((match = PARAM_REGEXP.exec(header))) {
      if (match.index !== index) {
        throw new TypeError('invalid parameter format')
      }

      index += match[0].length
      key = match[1].toLowerCase()
      value = match[2]

      if (value.charCodeAt(0) === 0x22 /* " */) {
        // remove quotes
        value = value.slice(1, -1)

        // remove escapes
        if (value.indexOf('\\') !== -1) {
          value = value.replace(QESC_REGEXP, '$1')
        }
      }

      obj.parameters[key] = value
    }

    if (index !== header.length) {
      throw new TypeError('invalid parameter format')
    }
  }

  return obj
}

/**
 * Get content-type from req/res objects.
 *
 * @param {object}
 * @return {Object}
 * @private
 */

function getcontenttype (obj) {
  var header

  if (typeof obj.getHeader === 'function') {
    // res-like
    header = obj.getHeader('content-type')
  } else if (typeof obj.headers === 'object') {
    // req-like
    header = obj.headers && obj.headers['content-type']
  }

  if (typeof header !== 'string') {
    throw new TypeError('content-type header is missing from object')
  }

  return header
}

/**
 * Quote a string if necessary.
 *
 * @param {string} val
 * @return {string}
 * @private
 */

function qstring (val) {
  var str = String(val)

  // no need to quote tokens
  if (TOKEN_REGEXP.test(str)) {
    return str
  }

  if (str.length > 0 && !TEXT_REGEXP.test(str)) {
    throw new TypeError('invalid parameter value')
  }

  return '"' + str.replace(QUOTE_REGEXP, '\\$1') + '"'
}

/**
 * Class to represent a content type.
 * @private
 */
function ContentType (type) {
  this.parameters = Object.create(null)
  this.type = type
}


/***/ }),

/***/ "./node_modules/eventsource-parser/dist/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/eventsource-parser/dist/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
function createParser(onParse) {
  let isFirstChunk;
  let buffer;
  let startingPosition;
  let startingFieldLength;
  let eventId;
  let eventName;
  let data;
  reset();
  return {
    feed,
    reset
  };
  function reset() {
    isFirstChunk = true;
    buffer = "";
    startingPosition = 0;
    startingFieldLength = -1;
    eventId = void 0;
    eventName = void 0;
    data = "";
  }
  function feed(chunk) {
    buffer = buffer ? buffer + chunk : chunk;
    if (isFirstChunk && hasBom(buffer)) {
      buffer = buffer.slice(BOM.length);
    }
    isFirstChunk = false;
    const length = buffer.length;
    let position = 0;
    let discardTrailingNewline = false;
    while (position < length) {
      if (discardTrailingNewline) {
        if (buffer[position] === "\n") {
          ++position;
        }
        discardTrailingNewline = false;
      }
      let lineLength = -1;
      let fieldLength = startingFieldLength;
      let character;
      for (let index = startingPosition; lineLength < 0 && index < length; ++index) {
        character = buffer[index];
        if (character === ":" && fieldLength < 0) {
          fieldLength = index - position;
        } else if (character === "\r") {
          discardTrailingNewline = true;
          lineLength = index - position;
        } else if (character === "\n") {
          lineLength = index - position;
        }
      }
      if (lineLength < 0) {
        startingPosition = length - position;
        startingFieldLength = fieldLength;
        break;
      } else {
        startingPosition = 0;
        startingFieldLength = -1;
      }
      parseEventStreamLine(buffer, position, fieldLength, lineLength);
      position += lineLength + 1;
    }
    if (position === length) {
      buffer = "";
    } else if (position > 0) {
      buffer = buffer.slice(position);
    }
  }
  function parseEventStreamLine(lineBuffer, index, fieldLength, lineLength) {
    if (lineLength === 0) {
      if (data.length > 0) {
        onParse({
          type: "event",
          id: eventId,
          event: eventName || void 0,
          data: data.slice(0, -1)
          // remove trailing newline
        });

        data = "";
        eventId = void 0;
      }
      eventName = void 0;
      return;
    }
    const noValue = fieldLength < 0;
    const field = lineBuffer.slice(index, index + (noValue ? lineLength : fieldLength));
    let step = 0;
    if (noValue) {
      step = lineLength;
    } else if (lineBuffer[index + fieldLength + 1] === " ") {
      step = fieldLength + 2;
    } else {
      step = fieldLength + 1;
    }
    const position = index + step;
    const valueLength = lineLength - step;
    const value = lineBuffer.slice(position, position + valueLength).toString();
    if (field === "data") {
      data += value ? "".concat(value, "\n") : "\n";
    } else if (field === "event") {
      eventName = value;
    } else if (field === "id" && !value.includes("\0")) {
      eventId = value;
    } else if (field === "retry") {
      const retry = parseInt(value, 10);
      if (!Number.isNaN(retry)) {
        onParse({
          type: "reconnect-interval",
          value: retry
        });
      }
    }
  }
}
const BOM = [239, 187, 191];
function hasBom(buffer) {
  return BOM.every((charCode, index) => buffer.charCodeAt(index) === charCode);
}
exports.createParser = createParser;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./src/background.ts":
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const eventsource_parser_1 = __webpack_require__(/*! eventsource-parser */ "./node_modules/eventsource-parser/dist/index.js");
const util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
// [暂时废弃]content script 关闭窗口时，将此值设为 false 以中断数据渲染
let isContinue = true;
console.log('I am background');
webextension_polyfill_1.default.runtime.onInstalled.addListener(function () {
    console.log("插件已被安装");
});
// 卸载插件后引导填写卸载原因，帮助产品优化
webextension_polyfill_1.default.runtime.setUninstallURL("https://docs.google.com/forms/d/e/1FAIpQLSdobGQN3O0Ck4fVrgfvRZMme3de-2OaEp1pFtibZkU0koc37w/viewform?usp=sf_link");
// 创建右键菜单
webextension_polyfill_1.default.contextMenus.create({
    id: "1",
    title: "Scouter",
    contexts: ["selection"],
}, () => {
    webextension_polyfill_1.default.runtime.lastError;
});
// 右键菜单点击事件
webextension_polyfill_1.default.contextMenus.onClicked.addListener(function (info, _tab) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('右键菜单点击事件');
        webextension_polyfill_1.default.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            var _a;
            console.log(tabs);
            const activeTab = tabs[0];
            let tID = (_a = activeTab.id) !== null && _a !== void 0 ? _a : -1;
            if (activeTab && activeTab.id !== undefined) {
                let b = webextension_polyfill_1.default.tabs.sendMessage(tID, { type: 'open-souter', info, });
                // 已知情况：刚安装插件时直接使用会报错（刷新页面后使用则正常），此时需要载入 content_script.js 才行
                b.catch(e => {
                    console.log(e);
                    console.log('catch');
                    webextension_polyfill_1.default.scripting.executeScript({
                        target: { tabId: tID },
                        files: ["js/vendor.js", "js/content_script.js"],
                    }).then(() => {
                        console.log('chrome.scripting.executeScript');
                    }).then(() => {
                        webextension_polyfill_1.default.tabs.sendMessage(tID, { type: 'open-souter', info, });
                    });
                });
            }
        });
    });
});
// 长连接，处理 GPT 数据
webextension_polyfill_1.default.runtime.onConnect.addListener(port => {
    // 收到 content script 消息
    console.log('连接中------------');
    // 接收 content script 的消息
    port.onMessage.addListener((msg) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('接收消息：', msg);
        // return
        // 请求  GPT 数据
        if (msg.type === 'getGPTMsg') {
            console.log('getGPTMsg');
            // isContinue = true 时才会渲染数据
            isContinue = true;
            // 获取存储的 API Key  
            webextension_polyfill_1.default.storage.sync.get({ 'openApiKey': '', 'unsplashApiKey': '', 'currentLanguage': 'English', 'targetLanguage': 'Spanish' }).then((result) => {
                let messages = msg.messages;
                //==================== 下面的代码用于调试使用，正式环境需要注释掉
                // port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': '🥲 API Key error. Please modify and try again..' })
                // port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': '🥲 Encountered some issues, please try again later.' })
                // 获取图片
                if (msg.keyWord && msg.keyWord.length <= 20) {
                    const imgs = [
                        {
                            "id": "ZS67i1HLllo",
                            "created_at": "2020-06-19T23:41:53Z",
                            "updated_at": "2023-04-21T23:50:40Z",
                            "promoted_at": null,
                            "width": 9504,
                            "height": 6336,
                            "color": "#262626",
                            "blur_hash": "L87w~I4pIU_KsDNMsYWlIVxuoJNZ",
                            "description": "Javascript program in a vscode code editor with Dracula theme",
                            "alt_description": "black flat screen computer monitor",
                            "urls": {
                                "raw": "https://images.unsplash.com/photo-1592609931095-54a2168ae893?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwxfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3",
                                "full": "https://images.unsplash.com/photo-1592609931095-54a2168ae893?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwxfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=85",
                                "regular": "https://images.unsplash.com/photo-1592609931095-54a2168ae893?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwxfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=1080",
                                "small": "https://images.unsplash.com/photo-1592609931095-54a2168ae893?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwxfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=400",
                                "thumb": "https://images.unsplash.com/photo-1592609931095-54a2168ae893?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwxfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=200",
                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1592609931095-54a2168ae893"
                            },
                            "links": {
                                "self": "https://api.unsplash.com/photos/ZS67i1HLllo",
                                "html": "https://unsplash.com/photos/ZS67i1HLllo",
                                "download": "https://unsplash.com/photos/ZS67i1HLllo/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwxfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz",
                                "download_location": "https://api.unsplash.com/photos/ZS67i1HLllo/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwxfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz"
                            },
                            "likes": 168,
                            "liked_by_user": false,
                            "current_user_collections": [],
                            "sponsorship": null,
                            "topic_submissions": {},
                            "user": {
                                "id": "Iai2P-IO1ko",
                                "updated_at": "2023-04-22T00:26:12Z",
                                "username": "gamell",
                                "name": "Joan Gamell",
                                "first_name": "Joan",
                                "last_name": "Gamell",
                                "twitter_username": "gamell",
                                "portfolio_url": "https://gamell.io",
                                "bio": "Barcelona-born software engineer living in sunny SD",
                                "location": "San Diego, CA",
                                "links": {
                                    "self": "https://api.unsplash.com/users/gamell",
                                    "html": "https://unsplash.com/@gamell",
                                    "photos": "https://api.unsplash.com/users/gamell/photos",
                                    "likes": "https://api.unsplash.com/users/gamell/likes",
                                    "portfolio": "https://api.unsplash.com/users/gamell/portfolio",
                                    "following": "https://api.unsplash.com/users/gamell/following",
                                    "followers": "https://api.unsplash.com/users/gamell/followers"
                                },
                                "profile_image": {
                                    "small": "https://images.unsplash.com/profile-1590974591830-892b375e6371image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                    "medium": "https://images.unsplash.com/profile-1590974591830-892b375e6371image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                    "large": "https://images.unsplash.com/profile-1590974591830-892b375e6371image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                },
                                "instagram_username": "jgamell",
                                "total_collections": 1,
                                "total_likes": 6,
                                "total_photos": 4,
                                "accepted_tos": true,
                                "for_hire": true,
                                "social": {
                                    "instagram_username": "jgamell",
                                    "portfolio_url": "https://gamell.io",
                                    "twitter_username": "gamell",
                                    "paypal_email": null
                                }
                            },
                            "tags": [
                                {
                                    "type": "search",
                                    "title": "usa"
                                },
                                {
                                    "type": "search",
                                    "title": "ca"
                                },
                                {
                                    "type": "search",
                                    "title": "san francisco"
                                }
                            ]
                        },
                        {
                            "id": "59yRYIHWtzY",
                            "created_at": "2020-09-16T14:44:05Z",
                            "updated_at": "2023-04-21T17:13:52Z",
                            "promoted_at": null,
                            "width": 5184,
                            "height": 3456,
                            "color": "#262626",
                            "blur_hash": "LWD0Gu8^R*o~x]M_f6xaD$%NWBRj",
                            "description": null,
                            "alt_description": "person using black laptop computer",
                            "urls": {
                                "raw": "https://images.unsplash.com/photo-1600267165477-6d4cc741b379?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwyfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3",
                                "full": "https://images.unsplash.com/photo-1600267165477-6d4cc741b379?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwyfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=85",
                                "regular": "https://images.unsplash.com/photo-1600267165477-6d4cc741b379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwyfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=1080",
                                "small": "https://images.unsplash.com/photo-1600267165477-6d4cc741b379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwyfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=400",
                                "thumb": "https://images.unsplash.com/photo-1600267165477-6d4cc741b379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwyfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=200",
                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1600267165477-6d4cc741b379"
                            },
                            "links": {
                                "self": "https://api.unsplash.com/photos/59yRYIHWtzY",
                                "html": "https://unsplash.com/photos/59yRYIHWtzY",
                                "download": "https://unsplash.com/photos/59yRYIHWtzY/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwyfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz",
                                "download_location": "https://api.unsplash.com/photos/59yRYIHWtzY/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwyfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz"
                            },
                            "likes": 103,
                            "liked_by_user": false,
                            "current_user_collections": [],
                            "sponsorship": null,
                            "topic_submissions": {
                                "business-work": {
                                    "status": "approved",
                                    "approved_on": "2020-11-27T13:38:05Z"
                                },
                                "technology": {
                                    "status": "rejected"
                                }
                            },
                            "user": {
                                "id": "c2sAAE9BXrY",
                                "updated_at": "2023-04-21T17:12:58Z",
                                "username": "sigmund",
                                "name": "Sigmund",
                                "first_name": "Sigmund",
                                "last_name": null,
                                "twitter_username": "sig__mund",
                                "portfolio_url": "https://sigmund.ca",
                                "bio": "Sigmund réalise des solutions numériques qui font la différence. onvousecoute@sigmund.ca",
                                "location": "Quebec, Canada",
                                "links": {
                                    "self": "https://api.unsplash.com/users/sigmund",
                                    "html": "https://unsplash.com/@sigmund",
                                    "photos": "https://api.unsplash.com/users/sigmund/photos",
                                    "likes": "https://api.unsplash.com/users/sigmund/likes",
                                    "portfolio": "https://api.unsplash.com/users/sigmund/portfolio",
                                    "following": "https://api.unsplash.com/users/sigmund/following",
                                    "followers": "https://api.unsplash.com/users/sigmund/followers"
                                },
                                "profile_image": {
                                    "small": "https://images.unsplash.com/profile-1592576104839-3461efcd5624image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                    "medium": "https://images.unsplash.com/profile-1592576104839-3461efcd5624image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                    "large": "https://images.unsplash.com/profile-1592576104839-3461efcd5624image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                },
                                "instagram_username": "sig__mund",
                                "total_collections": 28,
                                "total_likes": 739,
                                "total_photos": 1697,
                                "accepted_tos": true,
                                "for_hire": false,
                                "social": {
                                    "instagram_username": "sig__mund",
                                    "portfolio_url": "https://sigmund.ca",
                                    "twitter_username": "sig__mund",
                                    "paypal_email": null
                                }
                            },
                            "tags": [
                                {
                                    "type": "landing_page",
                                    "title": "grey",
                                    "source": {
                                        "ancestry": {
                                            "type": {
                                                "slug": "wallpapers",
                                                "pretty_slug": "HD Wallpapers"
                                            },
                                            "category": {
                                                "slug": "colors",
                                                "pretty_slug": "Color"
                                            },
                                            "subcategory": {
                                                "slug": "grey",
                                                "pretty_slug": "Grey"
                                            }
                                        },
                                        "title": "Hd grey wallpapers",
                                        "subtitle": "Download free grey wallpapers",
                                        "description": "Choose from a curated selection of grey wallpapers for your mobile and desktop screens. Always free on Unsplash.",
                                        "meta_title": "Grey Wallpapers: Free HD Download [500+ HQ] | Unsplash",
                                        "meta_description": "Choose from hundreds of free grey wallpapers. Download HD wallpapers for free on Unsplash.",
                                        "cover_photo": {
                                            "id": "ctXf1GVyf9A",
                                            "created_at": "2018-09-10T08:05:55Z",
                                            "updated_at": "2023-04-17T18:04:50Z",
                                            "promoted_at": null,
                                            "width": 5304,
                                            "height": 7952,
                                            "color": "#a6a6a6",
                                            "blur_hash": "L3IYFNIU00~q-;M{R*t80KtRIUM{",
                                            "description": "Old stone background texture",
                                            "alt_description": null,
                                            "urls": {
                                                "raw": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3",
                                                "full": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
                                                "regular": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                                                "small": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                                                "thumb": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max",
                                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1536566482680-fca31930a0bd"
                                            },
                                            "links": {
                                                "self": "https://api.unsplash.com/photos/ctXf1GVyf9A",
                                                "html": "https://unsplash.com/photos/ctXf1GVyf9A",
                                                "download": "https://unsplash.com/photos/ctXf1GVyf9A/download",
                                                "download_location": "https://api.unsplash.com/photos/ctXf1GVyf9A/download"
                                            },
                                            "likes": 1877,
                                            "liked_by_user": false,
                                            "current_user_collections": [],
                                            "sponsorship": null,
                                            "topic_submissions": {
                                                "textures-patterns": {
                                                    "status": "approved",
                                                    "approved_on": "2020-04-06T14:20:11Z"
                                                }
                                            },
                                            "premium": false,
                                            "plus": false,
                                            "user": {
                                                "id": "IFcEhJqem0Q",
                                                "updated_at": "2023-04-18T00:18:46Z",
                                                "username": "anniespratt",
                                                "name": "Annie Spratt",
                                                "first_name": "Annie",
                                                "last_name": "Spratt",
                                                "twitter_username": "anniespratt",
                                                "portfolio_url": "https://www.anniespratt.com",
                                                "bio": "Photographer from England, sharing my digital, film + vintage slide scans.  \r\n",
                                                "location": "New Forest National Park, UK",
                                                "links": {
                                                    "self": "https://api.unsplash.com/users/anniespratt",
                                                    "html": "https://unsplash.com/@anniespratt",
                                                    "photos": "https://api.unsplash.com/users/anniespratt/photos",
                                                    "likes": "https://api.unsplash.com/users/anniespratt/likes",
                                                    "portfolio": "https://api.unsplash.com/users/anniespratt/portfolio",
                                                    "following": "https://api.unsplash.com/users/anniespratt/following",
                                                    "followers": "https://api.unsplash.com/users/anniespratt/followers"
                                                },
                                                "profile_image": {
                                                    "small": "https://images.unsplash.com/profile-1648828806223-1852f704c58aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                                    "medium": "https://images.unsplash.com/profile-1648828806223-1852f704c58aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                                    "large": "https://images.unsplash.com/profile-1648828806223-1852f704c58aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                                },
                                                "instagram_username": "anniespratt",
                                                "total_collections": 151,
                                                "total_likes": 14445,
                                                "total_photos": 17843,
                                                "accepted_tos": true,
                                                "for_hire": false,
                                                "social": {
                                                    "instagram_username": "anniespratt",
                                                    "portfolio_url": "https://www.anniespratt.com",
                                                    "twitter_username": "anniespratt",
                                                    "paypal_email": null
                                                }
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "landing_page",
                                    "title": "pc",
                                    "source": {
                                        "ancestry": {
                                            "type": {
                                                "slug": "wallpapers",
                                                "pretty_slug": "HD Wallpapers"
                                            },
                                            "category": {
                                                "slug": "desktop",
                                                "pretty_slug": "Desktop"
                                            },
                                            "subcategory": {
                                                "slug": "pc",
                                                "pretty_slug": "PC"
                                            }
                                        },
                                        "title": "Hd pc wallpapers",
                                        "subtitle": "Download free pc wallpapers",
                                        "description": "Choose from a curated selection of PC wallpapers for your mobile and desktop screens. Always free on Unsplash.",
                                        "meta_title": "PC Wallpapers: Free HD Download [500+ HQ] | Unsplash",
                                        "meta_description": "Choose from hundreds of free PC wallpapers. Download HD wallpapers for free on Unsplash.",
                                        "cover_photo": {
                                            "id": "KzPefInJW58",
                                            "created_at": "2018-08-02T16:42:41Z",
                                            "updated_at": "2023-04-17T18:04:33Z",
                                            "promoted_at": "2018-08-03T13:59:39Z",
                                            "width": 5472,
                                            "height": 3648,
                                            "color": "#0cd9f3",
                                            "blur_hash": "LsHEtUk;BUWX0zbJs.kBiwkC$iay",
                                            "description": "Within the walls of this museum are countless people who love the power of imagination. They draw, they sing, they paint, they shoot photos, and they enjoy the fact that art is all around us. From your car, this is just a building to most people, but to an artist, this is a building full of repetition and sleekness just screaming to be photographed. Cheers to the people that can see outside of the box.",
                                            "alt_description": "white pyramid illustration",
                                            "urls": {
                                                "raw": "https://images.unsplash.com/photo-1533227356842-2b94d2d24d8d?ixlib=rb-4.0.3",
                                                "full": "https://images.unsplash.com/photo-1533227356842-2b94d2d24d8d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
                                                "regular": "https://images.unsplash.com/photo-1533227356842-2b94d2d24d8d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                                                "small": "https://images.unsplash.com/photo-1533227356842-2b94d2d24d8d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                                                "thumb": "https://images.unsplash.com/photo-1533227356842-2b94d2d24d8d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max",
                                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1533227356842-2b94d2d24d8d"
                                            },
                                            "links": {
                                                "self": "https://api.unsplash.com/photos/KzPefInJW58",
                                                "html": "https://unsplash.com/photos/KzPefInJW58",
                                                "download": "https://unsplash.com/photos/KzPefInJW58/download",
                                                "download_location": "https://api.unsplash.com/photos/KzPefInJW58/download"
                                            },
                                            "likes": 498,
                                            "liked_by_user": false,
                                            "current_user_collections": [],
                                            "sponsorship": null,
                                            "topic_submissions": {
                                                "wallpapers": {
                                                    "status": "approved",
                                                    "approved_on": "2020-04-06T14:20:09Z"
                                                },
                                                "architecture-interior": {
                                                    "status": "approved",
                                                    "approved_on": "2020-04-06T14:20:14Z"
                                                }
                                            },
                                            "premium": false,
                                            "plus": false,
                                            "user": {
                                                "id": "12MfUHvkED0",
                                                "updated_at": "2023-04-15T21:08:58Z",
                                                "username": "joshstyle",
                                                "name": "JOSHUA COLEMAN",
                                                "first_name": "JOSHUA",
                                                "last_name": "COLEMAN",
                                                "twitter_username": "joshstylela",
                                                "portfolio_url": "http://www.joshstyle.com",
                                                "bio": "Photographer, graphic designer, set costumer for movies and tv shows. 65k followers on IG, so tag me to possibly get featured! @joshstyle #joshstylela #joshstyle\r\n **Paypal donations happily accepted. Support small artists if you use their images.** ",
                                                "location": "Los Angeles / Virginia",
                                                "links": {
                                                    "self": "https://api.unsplash.com/users/joshstyle",
                                                    "html": "https://unsplash.com/@joshstyle",
                                                    "photos": "https://api.unsplash.com/users/joshstyle/photos",
                                                    "likes": "https://api.unsplash.com/users/joshstyle/likes",
                                                    "portfolio": "https://api.unsplash.com/users/joshstyle/portfolio",
                                                    "following": "https://api.unsplash.com/users/joshstyle/following",
                                                    "followers": "https://api.unsplash.com/users/joshstyle/followers"
                                                },
                                                "profile_image": {
                                                    "small": "https://images.unsplash.com/profile-1513026942804-43f7b1b9b0ba?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                                    "medium": "https://images.unsplash.com/profile-1513026942804-43f7b1b9b0ba?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                                    "large": "https://images.unsplash.com/profile-1513026942804-43f7b1b9b0ba?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                                },
                                                "instagram_username": "joshstyle",
                                                "total_collections": 3,
                                                "total_likes": 222,
                                                "total_photos": 177,
                                                "accepted_tos": true,
                                                "for_hire": true,
                                                "social": {
                                                    "instagram_username": "joshstyle",
                                                    "portfolio_url": "http://www.joshstyle.com",
                                                    "twitter_username": "joshstylela",
                                                    "paypal_email": null
                                                }
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "landing_page",
                                    "title": "computer",
                                    "source": {
                                        "ancestry": {
                                            "type": {
                                                "slug": "wallpapers",
                                                "pretty_slug": "HD Wallpapers"
                                            },
                                            "category": {
                                                "slug": "desktop",
                                                "pretty_slug": "Desktop"
                                            },
                                            "subcategory": {
                                                "slug": "computer",
                                                "pretty_slug": "Computer"
                                            }
                                        },
                                        "title": "Hd computer wallpapers",
                                        "subtitle": "Download free computer wallpapers",
                                        "description": "Choose from a curated selection of computer wallpapers for your mobile and desktop screens. Always free on Unsplash.",
                                        "meta_title": "Computer Wallpapers: Free HD Download [500+ HQ] | Unsplash",
                                        "meta_description": "Choose from hundreds of free computer wallpapers. Download HD wallpapers for free on Unsplash.",
                                        "cover_photo": {
                                            "id": "wyEinDRV88I",
                                            "created_at": "2016-11-18T21:01:40Z",
                                            "updated_at": "2023-04-17T14:01:07Z",
                                            "promoted_at": "2016-11-18T21:01:40Z",
                                            "width": 7952,
                                            "height": 5304,
                                            "color": "#c0c0c0",
                                            "blur_hash": "LhF$CS?bRjRj~p%LV@WCSiWWWBof",
                                            "description": null,
                                            "alt_description": "woman taking photo of buildings",
                                            "urls": {
                                                "raw": "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-4.0.3",
                                                "full": "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
                                                "regular": "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                                                "small": "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                                                "thumb": "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max",
                                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1479502806991-251c94be6b15"
                                            },
                                            "links": {
                                                "self": "https://api.unsplash.com/photos/wyEinDRV88I",
                                                "html": "https://unsplash.com/photos/wyEinDRV88I",
                                                "download": "https://unsplash.com/photos/wyEinDRV88I/download",
                                                "download_location": "https://api.unsplash.com/photos/wyEinDRV88I/download"
                                            },
                                            "likes": 576,
                                            "liked_by_user": false,
                                            "current_user_collections": [],
                                            "sponsorship": null,
                                            "topic_submissions": {
                                                "wallpapers": {
                                                    "status": "approved",
                                                    "approved_on": "2020-04-06T14:20:09Z"
                                                }
                                            },
                                            "premium": false,
                                            "plus": false,
                                            "user": {
                                                "id": "WylEZk6e2xA",
                                                "updated_at": "2023-04-17T15:02:05Z",
                                                "username": "thoughtcatalog",
                                                "name": "Thought Catalog",
                                                "first_name": "Thought",
                                                "last_name": "Catalog",
                                                "twitter_username": "thoughtcatalog",
                                                "portfolio_url": "http://thoughtcatalog.com/?utm_campaign=platform-link&utm_source=unsplash&utm_medium=profile",
                                                "bio": "We're a digital magazine based in Brooklyn. We use Unsplash to share with the world some of our best in-house photography.",
                                                "location": "New York",
                                                "links": {
                                                    "self": "https://api.unsplash.com/users/thoughtcatalog",
                                                    "html": "https://unsplash.com/@thoughtcatalog",
                                                    "photos": "https://api.unsplash.com/users/thoughtcatalog/photos",
                                                    "likes": "https://api.unsplash.com/users/thoughtcatalog/likes",
                                                    "portfolio": "https://api.unsplash.com/users/thoughtcatalog/portfolio",
                                                    "following": "https://api.unsplash.com/users/thoughtcatalog/following",
                                                    "followers": "https://api.unsplash.com/users/thoughtcatalog/followers"
                                                },
                                                "profile_image": {
                                                    "small": "https://images.unsplash.com/profile-1479502385647-8aa0d0e9a87b?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                                    "medium": "https://images.unsplash.com/profile-1479502385647-8aa0d0e9a87b?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                                    "large": "https://images.unsplash.com/profile-1479502385647-8aa0d0e9a87b?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                                },
                                                "instagram_username": "thoughtcatalog",
                                                "total_collections": 5,
                                                "total_likes": 12,
                                                "total_photos": 173,
                                                "accepted_tos": true,
                                                "for_hire": true,
                                                "social": {
                                                    "instagram_username": "thoughtcatalog",
                                                    "portfolio_url": "http://thoughtcatalog.com/?utm_campaign=platform-link&utm_source=unsplash&utm_medium=profile",
                                                    "twitter_username": "thoughtcatalog",
                                                    "paypal_email": null
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "id": "XJXWbfSo2f0",
                            "created_at": "2017-03-04T01:23:15Z",
                            "updated_at": "2023-04-22T04:34:47Z",
                            "promoted_at": "2017-03-04T01:23:15Z",
                            "width": 6000,
                            "height": 4000,
                            "color": "#0c2640",
                            "blur_hash": "L44.Y:jeDhj:.As:acWBR4s:x^WX",
                            "description": "Code on a laptop screen",
                            "alt_description": "turned on gray laptop computer",
                            "urls": {
                                "raw": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwzfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3",
                                "full": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwzfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=85",
                                "regular": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwzfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=1080",
                                "small": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwzfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=400",
                                "thumb": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwzfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=200",
                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1488590528505-98d2b5aba04b"
                            },
                            "links": {
                                "self": "https://api.unsplash.com/photos/XJXWbfSo2f0",
                                "html": "https://unsplash.com/photos/XJXWbfSo2f0",
                                "download": "https://unsplash.com/photos/XJXWbfSo2f0/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwzfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz",
                                "download_location": "https://api.unsplash.com/photos/XJXWbfSo2f0/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwzfHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz"
                            },
                            "likes": 1981,
                            "liked_by_user": false,
                            "current_user_collections": [],
                            "sponsorship": null,
                            "topic_submissions": {},
                            "user": {
                                "id": "TrMEfNqww7s",
                                "updated_at": "2023-04-21T16:21:44Z",
                                "username": "lucabravo",
                                "name": "Luca Bravo",
                                "first_name": "Luca",
                                "last_name": "Bravo",
                                "twitter_username": "hz",
                                "portfolio_url": "https://instagram.com/lucabravo/",
                                "bio": "Hi, I’m Luca Bravo, an Italian UX designer and front-end web developer based in Cremona, Italy.\r\nI draw inspiration from silent hills, foggy mounts, cold lakes, the complex simplicity of patterns and urban architecture.",
                                "location": "Italy",
                                "links": {
                                    "self": "https://api.unsplash.com/users/lucabravo",
                                    "html": "https://unsplash.com/fr/@lucabravo",
                                    "photos": "https://api.unsplash.com/users/lucabravo/photos",
                                    "likes": "https://api.unsplash.com/users/lucabravo/likes",
                                    "portfolio": "https://api.unsplash.com/users/lucabravo/portfolio",
                                    "following": "https://api.unsplash.com/users/lucabravo/following",
                                    "followers": "https://api.unsplash.com/users/lucabravo/followers"
                                },
                                "profile_image": {
                                    "small": "https://images.unsplash.com/profile-1585521746678-1988925483d3image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                    "medium": "https://images.unsplash.com/profile-1585521746678-1988925483d3image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                    "large": "https://images.unsplash.com/profile-1585521746678-1988925483d3image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                },
                                "instagram_username": "lucabravo",
                                "total_collections": 5,
                                "total_likes": 158,
                                "total_photos": 198,
                                "accepted_tos": true,
                                "for_hire": false,
                                "social": {
                                    "instagram_username": "lucabravo",
                                    "portfolio_url": "https://instagram.com/lucabravo/",
                                    "twitter_username": "hz",
                                    "paypal_email": null
                                }
                            },
                            "tags": [
                                {
                                    "type": "search",
                                    "title": "technology"
                                },
                                {
                                    "type": "search",
                                    "title": "web"
                                },
                                {
                                    "type": "landing_page",
                                    "title": "italy",
                                    "source": {
                                        "ancestry": {
                                            "type": {
                                                "slug": "images",
                                                "pretty_slug": "Images"
                                            },
                                            "category": {
                                                "slug": "travel",
                                                "pretty_slug": "Travel"
                                            },
                                            "subcategory": {
                                                "slug": "italy",
                                                "pretty_slug": "Italy"
                                            }
                                        },
                                        "title": "Italy pictures & images",
                                        "subtitle": "Download free italy images",
                                        "description": "Choose from a curated selection of Italy photos. Always free on Unsplash.",
                                        "meta_title": "Beautiful Italy Pictures | Download Free Images on Unsplash",
                                        "meta_description": "Choose from hundreds of free Italy pictures. Download HD Italy photos for free on Unsplash.",
                                        "cover_photo": {
                                            "id": "rknrvCrfS1k",
                                            "created_at": "2018-01-20T21:28:57Z",
                                            "updated_at": "2023-04-22T09:09:56Z",
                                            "promoted_at": "2018-01-21T12:32:39Z",
                                            "width": 2675,
                                            "height": 4027,
                                            "color": "#c0d9f3",
                                            "blur_hash": "L,H2i[M_oge._4Rjofa}XnbcWAW=",
                                            "description": "The Cliffs of Cinque Terre",
                                            "alt_description": "Manarola, Italy",
                                            "urls": {
                                                "raw": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
                                                "full": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
                                                "regular": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                                                "small": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                                                "thumb": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max",
                                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1516483638261-f4dbaf036963"
                                            },
                                            "links": {
                                                "self": "https://api.unsplash.com/photos/rknrvCrfS1k",
                                                "html": "https://unsplash.com/photos/rknrvCrfS1k",
                                                "download": "https://unsplash.com/photos/rknrvCrfS1k/download",
                                                "download_location": "https://api.unsplash.com/photos/rknrvCrfS1k/download"
                                            },
                                            "likes": 3838,
                                            "liked_by_user": false,
                                            "current_user_collections": [],
                                            "sponsorship": null,
                                            "topic_submissions": {
                                                "nature": {
                                                    "status": "approved",
                                                    "approved_on": "2020-04-06T14:20:18Z"
                                                },
                                                "wallpapers": {
                                                    "status": "approved",
                                                    "approved_on": "2021-06-17T15:52:37Z"
                                                }
                                            },
                                            "premium": false,
                                            "plus": false,
                                            "user": {
                                                "id": "NuPaOVVjvqA",
                                                "updated_at": "2023-04-16T17:41:31Z",
                                                "username": "jackward",
                                                "name": "Jack Ward",
                                                "first_name": "Jack",
                                                "last_name": "Ward",
                                                "twitter_username": "jwardu",
                                                "portfolio_url": null,
                                                "bio": "Adventure/Landscape Photographer",
                                                "location": "Boston, Ma",
                                                "links": {
                                                    "self": "https://api.unsplash.com/users/jackward",
                                                    "html": "https://unsplash.com/@jackward",
                                                    "photos": "https://api.unsplash.com/users/jackward/photos",
                                                    "likes": "https://api.unsplash.com/users/jackward/likes",
                                                    "portfolio": "https://api.unsplash.com/users/jackward/portfolio",
                                                    "following": "https://api.unsplash.com/users/jackward/following",
                                                    "followers": "https://api.unsplash.com/users/jackward/followers"
                                                },
                                                "profile_image": {
                                                    "small": "https://images.unsplash.com/profile-1522420435626-e26c29024ea9?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                                    "medium": "https://images.unsplash.com/profile-1522420435626-e26c29024ea9?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                                    "large": "https://images.unsplash.com/profile-1522420435626-e26c29024ea9?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                                },
                                                "instagram_username": "jwardu",
                                                "total_collections": 0,
                                                "total_likes": 853,
                                                "total_photos": 217,
                                                "accepted_tos": true,
                                                "for_hire": false,
                                                "social": {
                                                    "instagram_username": "jwardu",
                                                    "portfolio_url": null,
                                                    "twitter_username": "jwardu",
                                                    "paypal_email": null
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "id": "ir5gC4hlqT0",
                            "created_at": "2020-08-09T21:36:23Z",
                            "updated_at": "2023-04-22T14:30:09Z",
                            "promoted_at": null,
                            "width": 4292,
                            "height": 3373,
                            "color": "#f38c0c",
                            "blur_hash": "LuNiZ,10OTN{XhI@W;ww#SofWrs9",
                            "description": "Crystal Pyramid Wallpaper/Desktop Background - To me it looks like the pyramid is a container for color.",
                            "alt_description": "purple and pink triangle illustration",
                            "urls": {
                                "raw": "https://images.unsplash.com/photo-1597008641621-cefdcf718025?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw0fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3",
                                "full": "https://images.unsplash.com/photo-1597008641621-cefdcf718025?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw0fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=85",
                                "regular": "https://images.unsplash.com/photo-1597008641621-cefdcf718025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw0fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=1080",
                                "small": "https://images.unsplash.com/photo-1597008641621-cefdcf718025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw0fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=400",
                                "thumb": "https://images.unsplash.com/photo-1597008641621-cefdcf718025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw0fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=200",
                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1597008641621-cefdcf718025"
                            },
                            "links": {
                                "self": "https://api.unsplash.com/photos/ir5gC4hlqT0",
                                "html": "https://unsplash.com/photos/ir5gC4hlqT0",
                                "download": "https://unsplash.com/photos/ir5gC4hlqT0/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw0fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz",
                                "download_location": "https://api.unsplash.com/photos/ir5gC4hlqT0/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw0fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz"
                            },
                            "likes": 595,
                            "liked_by_user": false,
                            "current_user_collections": [],
                            "sponsorship": null,
                            "topic_submissions": {
                                "wallpapers": {
                                    "status": "rejected"
                                },
                                "spirituality": {
                                    "status": "rejected"
                                }
                            },
                            "user": {
                                "id": "Kjh3Y5kfBlM",
                                "updated_at": "2023-04-22T03:52:01Z",
                                "username": "lazycreekimages",
                                "name": "Michael Dziedzic",
                                "first_name": "Michael",
                                "last_name": "Dziedzic",
                                "twitter_username": null,
                                "portfolio_url": "https://www.lazycreekstudios.com/",
                                "bio": "Many of the photos that I share here would slowly fade away on my hard drive if they weren't on Unsplash!  I hope you can find some of them suited for your purposes.",
                                "location": "TEXAS, USA",
                                "links": {
                                    "self": "https://api.unsplash.com/users/lazycreekimages",
                                    "html": "https://unsplash.com/@lazycreekimages",
                                    "photos": "https://api.unsplash.com/users/lazycreekimages/photos",
                                    "likes": "https://api.unsplash.com/users/lazycreekimages/likes",
                                    "portfolio": "https://api.unsplash.com/users/lazycreekimages/portfolio",
                                    "following": "https://api.unsplash.com/users/lazycreekimages/following",
                                    "followers": "https://api.unsplash.com/users/lazycreekimages/followers"
                                },
                                "profile_image": {
                                    "small": "https://images.unsplash.com/profile-1641401343455-7c52a9fdd344image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                    "medium": "https://images.unsplash.com/profile-1641401343455-7c52a9fdd344image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                    "large": "https://images.unsplash.com/profile-1641401343455-7c52a9fdd344image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                },
                                "instagram_username": "lazycreekimages",
                                "total_collections": 27,
                                "total_likes": 4745,
                                "total_photos": 109,
                                "accepted_tos": true,
                                "for_hire": false,
                                "social": {
                                    "instagram_username": "lazycreekimages",
                                    "portfolio_url": "https://www.lazycreekstudios.com/",
                                    "twitter_username": null,
                                    "paypal_email": null
                                }
                            },
                            "tags": [
                                {
                                    "type": "search",
                                    "title": "lazy creek studios"
                                },
                                {
                                    "type": "search",
                                    "title": "tyler"
                                },
                                {
                                    "type": "search",
                                    "title": "tx"
                                }
                            ]
                        },
                        {
                            "id": "HsTnjCVQ798",
                            "created_at": "2017-10-31T18:55:58Z",
                            "updated_at": "2023-04-21T23:52:57Z",
                            "promoted_at": null,
                            "width": 4897,
                            "height": 3264,
                            "color": "#8c8c8c",
                            "blur_hash": "L6DJSA~qtO-;ogIUxuD%tRohRj%M",
                            "description": "She just left for a meeting and her desk looked like a stock photo. ",
                            "alt_description": "black framed eyeglasses on top of white printing paper",
                            "urls": {
                                "raw": "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw1fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3",
                                "full": "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw1fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=85",
                                "regular": "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw1fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=1080",
                                "small": "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw1fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=400",
                                "thumb": "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw1fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=200",
                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1509475826633-fed577a2c71b"
                            },
                            "links": {
                                "self": "https://api.unsplash.com/photos/HsTnjCVQ798",
                                "html": "https://unsplash.com/photos/HsTnjCVQ798",
                                "download": "https://unsplash.com/photos/HsTnjCVQ798/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw1fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz",
                                "download_location": "https://api.unsplash.com/photos/HsTnjCVQ798/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw1fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz"
                            },
                            "likes": 540,
                            "liked_by_user": false,
                            "current_user_collections": [],
                            "sponsorship": null,
                            "topic_submissions": {
                                "business-work": {
                                    "status": "approved",
                                    "approved_on": "2021-09-29T12:53:46Z"
                                }
                            },
                            "user": {
                                "id": "c2sAAE9BXrY",
                                "updated_at": "2023-04-21T17:12:58Z",
                                "username": "sigmund",
                                "name": "Sigmund",
                                "first_name": "Sigmund",
                                "last_name": null,
                                "twitter_username": "sig__mund",
                                "portfolio_url": "https://sigmund.ca",
                                "bio": "Sigmund réalise des solutions numériques qui font la différence. onvousecoute@sigmund.ca",
                                "location": "Quebec, Canada",
                                "links": {
                                    "self": "https://api.unsplash.com/users/sigmund",
                                    "html": "https://unsplash.com/@sigmund",
                                    "photos": "https://api.unsplash.com/users/sigmund/photos",
                                    "likes": "https://api.unsplash.com/users/sigmund/likes",
                                    "portfolio": "https://api.unsplash.com/users/sigmund/portfolio",
                                    "following": "https://api.unsplash.com/users/sigmund/following",
                                    "followers": "https://api.unsplash.com/users/sigmund/followers"
                                },
                                "profile_image": {
                                    "small": "https://images.unsplash.com/profile-1592576104839-3461efcd5624image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                    "medium": "https://images.unsplash.com/profile-1592576104839-3461efcd5624image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                    "large": "https://images.unsplash.com/profile-1592576104839-3461efcd5624image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                },
                                "instagram_username": "sig__mund",
                                "total_collections": 28,
                                "total_likes": 739,
                                "total_photos": 1697,
                                "accepted_tos": true,
                                "for_hire": false,
                                "social": {
                                    "instagram_username": "sig__mund",
                                    "portfolio_url": "https://sigmund.ca",
                                    "twitter_username": "sig__mund",
                                    "paypal_email": null
                                }
                            },
                            "tags": [
                                {
                                    "type": "landing_page",
                                    "title": "grey",
                                    "source": {
                                        "ancestry": {
                                            "type": {
                                                "slug": "wallpapers",
                                                "pretty_slug": "HD Wallpapers"
                                            },
                                            "category": {
                                                "slug": "colors",
                                                "pretty_slug": "Color"
                                            },
                                            "subcategory": {
                                                "slug": "grey",
                                                "pretty_slug": "Grey"
                                            }
                                        },
                                        "title": "Hd grey wallpapers",
                                        "subtitle": "Download free grey wallpapers",
                                        "description": "Choose from a curated selection of grey wallpapers for your mobile and desktop screens. Always free on Unsplash.",
                                        "meta_title": "Grey Wallpapers: Free HD Download [500+ HQ] | Unsplash",
                                        "meta_description": "Choose from hundreds of free grey wallpapers. Download HD wallpapers for free on Unsplash.",
                                        "cover_photo": {
                                            "id": "ctXf1GVyf9A",
                                            "created_at": "2018-09-10T08:05:55Z",
                                            "updated_at": "2023-04-17T18:04:50Z",
                                            "promoted_at": null,
                                            "width": 5304,
                                            "height": 7952,
                                            "color": "#a6a6a6",
                                            "blur_hash": "L3IYFNIU00~q-;M{R*t80KtRIUM{",
                                            "description": "Old stone background texture",
                                            "alt_description": null,
                                            "urls": {
                                                "raw": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3",
                                                "full": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
                                                "regular": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                                                "small": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                                                "thumb": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max",
                                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1536566482680-fca31930a0bd"
                                            },
                                            "links": {
                                                "self": "https://api.unsplash.com/photos/ctXf1GVyf9A",
                                                "html": "https://unsplash.com/photos/ctXf1GVyf9A",
                                                "download": "https://unsplash.com/photos/ctXf1GVyf9A/download",
                                                "download_location": "https://api.unsplash.com/photos/ctXf1GVyf9A/download"
                                            },
                                            "likes": 1877,
                                            "liked_by_user": false,
                                            "current_user_collections": [],
                                            "sponsorship": null,
                                            "topic_submissions": {
                                                "textures-patterns": {
                                                    "status": "approved",
                                                    "approved_on": "2020-04-06T14:20:11Z"
                                                }
                                            },
                                            "premium": false,
                                            "plus": false,
                                            "user": {
                                                "id": "IFcEhJqem0Q",
                                                "updated_at": "2023-04-18T00:18:46Z",
                                                "username": "anniespratt",
                                                "name": "Annie Spratt",
                                                "first_name": "Annie",
                                                "last_name": "Spratt",
                                                "twitter_username": "anniespratt",
                                                "portfolio_url": "https://www.anniespratt.com",
                                                "bio": "Photographer from England, sharing my digital, film + vintage slide scans.  \r\n",
                                                "location": "New Forest National Park, UK",
                                                "links": {
                                                    "self": "https://api.unsplash.com/users/anniespratt",
                                                    "html": "https://unsplash.com/@anniespratt",
                                                    "photos": "https://api.unsplash.com/users/anniespratt/photos",
                                                    "likes": "https://api.unsplash.com/users/anniespratt/likes",
                                                    "portfolio": "https://api.unsplash.com/users/anniespratt/portfolio",
                                                    "following": "https://api.unsplash.com/users/anniespratt/following",
                                                    "followers": "https://api.unsplash.com/users/anniespratt/followers"
                                                },
                                                "profile_image": {
                                                    "small": "https://images.unsplash.com/profile-1648828806223-1852f704c58aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                                    "medium": "https://images.unsplash.com/profile-1648828806223-1852f704c58aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                                    "large": "https://images.unsplash.com/profile-1648828806223-1852f704c58aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                                },
                                                "instagram_username": "anniespratt",
                                                "total_collections": 151,
                                                "total_likes": 14445,
                                                "total_photos": 17843,
                                                "accepted_tos": true,
                                                "for_hire": false,
                                                "social": {
                                                    "instagram_username": "anniespratt",
                                                    "portfolio_url": "https://www.anniespratt.com",
                                                    "twitter_username": "anniespratt",
                                                    "paypal_email": null
                                                }
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "search",
                                    "title": "canada"
                                },
                                {
                                    "type": "search",
                                    "title": "québec city"
                                }
                            ]
                        },
                        {
                            "id": "Fv2J-aK0Acs",
                            "created_at": "2020-11-23T21:18:59Z",
                            "updated_at": "2023-04-21T06:14:59Z",
                            "promoted_at": null,
                            "width": 5057,
                            "height": 3315,
                            "color": "#262626",
                            "blur_hash": "LMDJL?M_R301kEW?M{ocITM{%gt8",
                            "description": null,
                            "alt_description": "black and silver laptop computer beside yellow ceramic mug",
                            "urls": {
                                "raw": "https://images.unsplash.com/photo-1606166325683-e6deb697d301?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw2fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3",
                                "full": "https://images.unsplash.com/photo-1606166325683-e6deb697d301?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw2fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=85",
                                "regular": "https://images.unsplash.com/photo-1606166325683-e6deb697d301?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw2fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=1080",
                                "small": "https://images.unsplash.com/photo-1606166325683-e6deb697d301?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw2fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=400",
                                "thumb": "https://images.unsplash.com/photo-1606166325683-e6deb697d301?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw2fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=200",
                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1606166325683-e6deb697d301"
                            },
                            "links": {
                                "self": "https://api.unsplash.com/photos/Fv2J-aK0Acs",
                                "html": "https://unsplash.com/photos/Fv2J-aK0Acs",
                                "download": "https://unsplash.com/photos/Fv2J-aK0Acs/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw2fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz",
                                "download_location": "https://api.unsplash.com/photos/Fv2J-aK0Acs/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw2fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz"
                            },
                            "likes": 94,
                            "liked_by_user": false,
                            "current_user_collections": [],
                            "sponsorship": null,
                            "topic_submissions": {
                                "business-work": {
                                    "status": "rejected"
                                }
                            },
                            "user": {
                                "id": "c2sAAE9BXrY",
                                "updated_at": "2023-04-21T17:12:58Z",
                                "username": "sigmund",
                                "name": "Sigmund",
                                "first_name": "Sigmund",
                                "last_name": null,
                                "twitter_username": "sig__mund",
                                "portfolio_url": "https://sigmund.ca",
                                "bio": "Sigmund réalise des solutions numériques qui font la différence. onvousecoute@sigmund.ca",
                                "location": "Quebec, Canada",
                                "links": {
                                    "self": "https://api.unsplash.com/users/sigmund",
                                    "html": "https://unsplash.com/@sigmund",
                                    "photos": "https://api.unsplash.com/users/sigmund/photos",
                                    "likes": "https://api.unsplash.com/users/sigmund/likes",
                                    "portfolio": "https://api.unsplash.com/users/sigmund/portfolio",
                                    "following": "https://api.unsplash.com/users/sigmund/following",
                                    "followers": "https://api.unsplash.com/users/sigmund/followers"
                                },
                                "profile_image": {
                                    "small": "https://images.unsplash.com/profile-1592576104839-3461efcd5624image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                    "medium": "https://images.unsplash.com/profile-1592576104839-3461efcd5624image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                    "large": "https://images.unsplash.com/profile-1592576104839-3461efcd5624image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                },
                                "instagram_username": "sig__mund",
                                "total_collections": 28,
                                "total_likes": 739,
                                "total_photos": 1697,
                                "accepted_tos": true,
                                "for_hire": false,
                                "social": {
                                    "instagram_username": "sig__mund",
                                    "portfolio_url": "https://sigmund.ca",
                                    "twitter_username": "sig__mund",
                                    "paypal_email": null
                                }
                            },
                            "tags": [
                                {
                                    "type": "landing_page",
                                    "title": "grey",
                                    "source": {
                                        "ancestry": {
                                            "type": {
                                                "slug": "wallpapers",
                                                "pretty_slug": "HD Wallpapers"
                                            },
                                            "category": {
                                                "slug": "colors",
                                                "pretty_slug": "Color"
                                            },
                                            "subcategory": {
                                                "slug": "grey",
                                                "pretty_slug": "Grey"
                                            }
                                        },
                                        "title": "Hd grey wallpapers",
                                        "subtitle": "Download free grey wallpapers",
                                        "description": "Choose from a curated selection of grey wallpapers for your mobile and desktop screens. Always free on Unsplash.",
                                        "meta_title": "Grey Wallpapers: Free HD Download [500+ HQ] | Unsplash",
                                        "meta_description": "Choose from hundreds of free grey wallpapers. Download HD wallpapers for free on Unsplash.",
                                        "cover_photo": {
                                            "id": "ctXf1GVyf9A",
                                            "created_at": "2018-09-10T08:05:55Z",
                                            "updated_at": "2023-04-17T18:04:50Z",
                                            "promoted_at": null,
                                            "width": 5304,
                                            "height": 7952,
                                            "color": "#a6a6a6",
                                            "blur_hash": "L3IYFNIU00~q-;M{R*t80KtRIUM{",
                                            "description": "Old stone background texture",
                                            "alt_description": null,
                                            "urls": {
                                                "raw": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3",
                                                "full": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
                                                "regular": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                                                "small": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                                                "thumb": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max",
                                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1536566482680-fca31930a0bd"
                                            },
                                            "links": {
                                                "self": "https://api.unsplash.com/photos/ctXf1GVyf9A",
                                                "html": "https://unsplash.com/photos/ctXf1GVyf9A",
                                                "download": "https://unsplash.com/photos/ctXf1GVyf9A/download",
                                                "download_location": "https://api.unsplash.com/photos/ctXf1GVyf9A/download"
                                            },
                                            "likes": 1877,
                                            "liked_by_user": false,
                                            "current_user_collections": [],
                                            "sponsorship": null,
                                            "topic_submissions": {
                                                "textures-patterns": {
                                                    "status": "approved",
                                                    "approved_on": "2020-04-06T14:20:11Z"
                                                }
                                            },
                                            "premium": false,
                                            "plus": false,
                                            "user": {
                                                "id": "IFcEhJqem0Q",
                                                "updated_at": "2023-04-18T00:18:46Z",
                                                "username": "anniespratt",
                                                "name": "Annie Spratt",
                                                "first_name": "Annie",
                                                "last_name": "Spratt",
                                                "twitter_username": "anniespratt",
                                                "portfolio_url": "https://www.anniespratt.com",
                                                "bio": "Photographer from England, sharing my digital, film + vintage slide scans.  \r\n",
                                                "location": "New Forest National Park, UK",
                                                "links": {
                                                    "self": "https://api.unsplash.com/users/anniespratt",
                                                    "html": "https://unsplash.com/@anniespratt",
                                                    "photos": "https://api.unsplash.com/users/anniespratt/photos",
                                                    "likes": "https://api.unsplash.com/users/anniespratt/likes",
                                                    "portfolio": "https://api.unsplash.com/users/anniespratt/portfolio",
                                                    "following": "https://api.unsplash.com/users/anniespratt/following",
                                                    "followers": "https://api.unsplash.com/users/anniespratt/followers"
                                                },
                                                "profile_image": {
                                                    "small": "https://images.unsplash.com/profile-1648828806223-1852f704c58aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                                    "medium": "https://images.unsplash.com/profile-1648828806223-1852f704c58aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                                    "large": "https://images.unsplash.com/profile-1648828806223-1852f704c58aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                                },
                                                "instagram_username": "anniespratt",
                                                "total_collections": 151,
                                                "total_likes": 14445,
                                                "total_photos": 17843,
                                                "accepted_tos": true,
                                                "for_hire": false,
                                                "social": {
                                                    "instagram_username": "anniespratt",
                                                    "portfolio_url": "https://www.anniespratt.com",
                                                    "twitter_username": "anniespratt",
                                                    "paypal_email": null
                                                }
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "landing_page",
                                    "title": "computer",
                                    "source": {
                                        "ancestry": {
                                            "type": {
                                                "slug": "wallpapers",
                                                "pretty_slug": "HD Wallpapers"
                                            },
                                            "category": {
                                                "slug": "desktop",
                                                "pretty_slug": "Desktop"
                                            },
                                            "subcategory": {
                                                "slug": "computer",
                                                "pretty_slug": "Computer"
                                            }
                                        },
                                        "title": "Hd computer wallpapers",
                                        "subtitle": "Download free computer wallpapers",
                                        "description": "Choose from a curated selection of computer wallpapers for your mobile and desktop screens. Always free on Unsplash.",
                                        "meta_title": "Computer Wallpapers: Free HD Download [500+ HQ] | Unsplash",
                                        "meta_description": "Choose from hundreds of free computer wallpapers. Download HD wallpapers for free on Unsplash.",
                                        "cover_photo": {
                                            "id": "wyEinDRV88I",
                                            "created_at": "2016-11-18T21:01:40Z",
                                            "updated_at": "2023-04-17T14:01:07Z",
                                            "promoted_at": "2016-11-18T21:01:40Z",
                                            "width": 7952,
                                            "height": 5304,
                                            "color": "#c0c0c0",
                                            "blur_hash": "LhF$CS?bRjRj~p%LV@WCSiWWWBof",
                                            "description": null,
                                            "alt_description": "woman taking photo of buildings",
                                            "urls": {
                                                "raw": "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-4.0.3",
                                                "full": "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
                                                "regular": "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                                                "small": "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                                                "thumb": "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max",
                                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1479502806991-251c94be6b15"
                                            },
                                            "links": {
                                                "self": "https://api.unsplash.com/photos/wyEinDRV88I",
                                                "html": "https://unsplash.com/photos/wyEinDRV88I",
                                                "download": "https://unsplash.com/photos/wyEinDRV88I/download",
                                                "download_location": "https://api.unsplash.com/photos/wyEinDRV88I/download"
                                            },
                                            "likes": 576,
                                            "liked_by_user": false,
                                            "current_user_collections": [],
                                            "sponsorship": null,
                                            "topic_submissions": {
                                                "wallpapers": {
                                                    "status": "approved",
                                                    "approved_on": "2020-04-06T14:20:09Z"
                                                }
                                            },
                                            "premium": false,
                                            "plus": false,
                                            "user": {
                                                "id": "WylEZk6e2xA",
                                                "updated_at": "2023-04-17T15:02:05Z",
                                                "username": "thoughtcatalog",
                                                "name": "Thought Catalog",
                                                "first_name": "Thought",
                                                "last_name": "Catalog",
                                                "twitter_username": "thoughtcatalog",
                                                "portfolio_url": "http://thoughtcatalog.com/?utm_campaign=platform-link&utm_source=unsplash&utm_medium=profile",
                                                "bio": "We're a digital magazine based in Brooklyn. We use Unsplash to share with the world some of our best in-house photography.",
                                                "location": "New York",
                                                "links": {
                                                    "self": "https://api.unsplash.com/users/thoughtcatalog",
                                                    "html": "https://unsplash.com/@thoughtcatalog",
                                                    "photos": "https://api.unsplash.com/users/thoughtcatalog/photos",
                                                    "likes": "https://api.unsplash.com/users/thoughtcatalog/likes",
                                                    "portfolio": "https://api.unsplash.com/users/thoughtcatalog/portfolio",
                                                    "following": "https://api.unsplash.com/users/thoughtcatalog/following",
                                                    "followers": "https://api.unsplash.com/users/thoughtcatalog/followers"
                                                },
                                                "profile_image": {
                                                    "small": "https://images.unsplash.com/profile-1479502385647-8aa0d0e9a87b?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                                    "medium": "https://images.unsplash.com/profile-1479502385647-8aa0d0e9a87b?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                                    "large": "https://images.unsplash.com/profile-1479502385647-8aa0d0e9a87b?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                                },
                                                "instagram_username": "thoughtcatalog",
                                                "total_collections": 5,
                                                "total_likes": 12,
                                                "total_photos": 173,
                                                "accepted_tos": true,
                                                "for_hire": true,
                                                "social": {
                                                    "instagram_username": "thoughtcatalog",
                                                    "portfolio_url": "http://thoughtcatalog.com/?utm_campaign=platform-link&utm_source=unsplash&utm_medium=profile",
                                                    "twitter_username": "thoughtcatalog",
                                                    "paypal_email": null
                                                }
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "search",
                                    "title": "electronics"
                                }
                            ]
                        },
                        {
                            "id": "UXNXItayGmo",
                            "created_at": "2020-06-06T14:21:11Z",
                            "updated_at": "2023-04-21T21:12:16Z",
                            "promoted_at": null,
                            "width": 3999,
                            "height": 2666,
                            "color": "#d9d9d9",
                            "blur_hash": "LlODnI~qWBj@?vIUozt7IVofj[M{",
                            "description": null,
                            "alt_description": "black and silver laptop computer",
                            "urls": {
                                "raw": "https://images.unsplash.com/photo-1591453089343-9ee5e4ac7e2d?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw3fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3",
                                "full": "https://images.unsplash.com/photo-1591453089343-9ee5e4ac7e2d?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw3fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=85",
                                "regular": "https://images.unsplash.com/photo-1591453089343-9ee5e4ac7e2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw3fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=1080",
                                "small": "https://images.unsplash.com/photo-1591453089343-9ee5e4ac7e2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw3fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=400",
                                "thumb": "https://images.unsplash.com/photo-1591453089343-9ee5e4ac7e2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw3fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=200",
                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1591453089343-9ee5e4ac7e2d"
                            },
                            "links": {
                                "self": "https://api.unsplash.com/photos/UXNXItayGmo",
                                "html": "https://unsplash.com/photos/UXNXItayGmo",
                                "download": "https://unsplash.com/photos/UXNXItayGmo/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw3fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz",
                                "download_location": "https://api.unsplash.com/photos/UXNXItayGmo/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw3fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz"
                            },
                            "likes": 24,
                            "liked_by_user": false,
                            "current_user_collections": [],
                            "sponsorship": null,
                            "topic_submissions": {},
                            "user": {
                                "id": "_X4qTyQdFqw",
                                "updated_at": "2023-04-11T18:11:09Z",
                                "username": "markuswinkler",
                                "name": "Markus Winkler",
                                "first_name": "Markus",
                                "last_name": "Winkler",
                                "twitter_username": "markuswinkler",
                                "portfolio_url": "https://viarami.com",
                                "bio": "Photographer from Germany \r\nIf you want, you can book me! 📮hello@viarami.com I Also interested how you are using my photos, let me know!",
                                "location": "Germany",
                                "links": {
                                    "self": "https://api.unsplash.com/users/markuswinkler",
                                    "html": "https://unsplash.com/@markuswinkler",
                                    "photos": "https://api.unsplash.com/users/markuswinkler/photos",
                                    "likes": "https://api.unsplash.com/users/markuswinkler/likes",
                                    "portfolio": "https://api.unsplash.com/users/markuswinkler/portfolio",
                                    "following": "https://api.unsplash.com/users/markuswinkler/following",
                                    "followers": "https://api.unsplash.com/users/markuswinkler/followers"
                                },
                                "profile_image": {
                                    "small": "https://images.unsplash.com/profile-1562947793246-6f1ccf9383cf?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                    "medium": "https://images.unsplash.com/profile-1562947793246-6f1ccf9383cf?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                    "large": "https://images.unsplash.com/profile-1562947793246-6f1ccf9383cf?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                },
                                "instagram_username": "m23",
                                "total_collections": 278,
                                "total_likes": 0,
                                "total_photos": 3679,
                                "accepted_tos": true,
                                "for_hire": true,
                                "social": {
                                    "instagram_username": "m23",
                                    "portfolio_url": "https://viarami.com",
                                    "twitter_username": "markuswinkler",
                                    "paypal_email": null
                                }
                            },
                            "tags": [
                                {
                                    "type": "landing_page",
                                    "title": "grey",
                                    "source": {
                                        "ancestry": {
                                            "type": {
                                                "slug": "wallpapers",
                                                "pretty_slug": "HD Wallpapers"
                                            },
                                            "category": {
                                                "slug": "colors",
                                                "pretty_slug": "Color"
                                            },
                                            "subcategory": {
                                                "slug": "grey",
                                                "pretty_slug": "Grey"
                                            }
                                        },
                                        "title": "Hd grey wallpapers",
                                        "subtitle": "Download free grey wallpapers",
                                        "description": "Choose from a curated selection of grey wallpapers for your mobile and desktop screens. Always free on Unsplash.",
                                        "meta_title": "Grey Wallpapers: Free HD Download [500+ HQ] | Unsplash",
                                        "meta_description": "Choose from hundreds of free grey wallpapers. Download HD wallpapers for free on Unsplash.",
                                        "cover_photo": {
                                            "id": "ctXf1GVyf9A",
                                            "created_at": "2018-09-10T08:05:55Z",
                                            "updated_at": "2023-04-17T18:04:50Z",
                                            "promoted_at": null,
                                            "width": 5304,
                                            "height": 7952,
                                            "color": "#a6a6a6",
                                            "blur_hash": "L3IYFNIU00~q-;M{R*t80KtRIUM{",
                                            "description": "Old stone background texture",
                                            "alt_description": null,
                                            "urls": {
                                                "raw": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3",
                                                "full": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
                                                "regular": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                                                "small": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                                                "thumb": "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max",
                                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1536566482680-fca31930a0bd"
                                            },
                                            "links": {
                                                "self": "https://api.unsplash.com/photos/ctXf1GVyf9A",
                                                "html": "https://unsplash.com/photos/ctXf1GVyf9A",
                                                "download": "https://unsplash.com/photos/ctXf1GVyf9A/download",
                                                "download_location": "https://api.unsplash.com/photos/ctXf1GVyf9A/download"
                                            },
                                            "likes": 1877,
                                            "liked_by_user": false,
                                            "current_user_collections": [],
                                            "sponsorship": null,
                                            "topic_submissions": {
                                                "textures-patterns": {
                                                    "status": "approved",
                                                    "approved_on": "2020-04-06T14:20:11Z"
                                                }
                                            },
                                            "premium": false,
                                            "plus": false,
                                            "user": {
                                                "id": "IFcEhJqem0Q",
                                                "updated_at": "2023-04-18T00:18:46Z",
                                                "username": "anniespratt",
                                                "name": "Annie Spratt",
                                                "first_name": "Annie",
                                                "last_name": "Spratt",
                                                "twitter_username": "anniespratt",
                                                "portfolio_url": "https://www.anniespratt.com",
                                                "bio": "Photographer from England, sharing my digital, film + vintage slide scans.  \r\n",
                                                "location": "New Forest National Park, UK",
                                                "links": {
                                                    "self": "https://api.unsplash.com/users/anniespratt",
                                                    "html": "https://unsplash.com/@anniespratt",
                                                    "photos": "https://api.unsplash.com/users/anniespratt/photos",
                                                    "likes": "https://api.unsplash.com/users/anniespratt/likes",
                                                    "portfolio": "https://api.unsplash.com/users/anniespratt/portfolio",
                                                    "following": "https://api.unsplash.com/users/anniespratt/following",
                                                    "followers": "https://api.unsplash.com/users/anniespratt/followers"
                                                },
                                                "profile_image": {
                                                    "small": "https://images.unsplash.com/profile-1648828806223-1852f704c58aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                                    "medium": "https://images.unsplash.com/profile-1648828806223-1852f704c58aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                                    "large": "https://images.unsplash.com/profile-1648828806223-1852f704c58aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                                },
                                                "instagram_username": "anniespratt",
                                                "total_collections": 151,
                                                "total_likes": 14445,
                                                "total_photos": 17843,
                                                "accepted_tos": true,
                                                "for_hire": false,
                                                "social": {
                                                    "instagram_username": "anniespratt",
                                                    "portfolio_url": "https://www.anniespratt.com",
                                                    "twitter_username": "anniespratt",
                                                    "paypal_email": null
                                                }
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "search",
                                    "title": "text"
                                },
                                {
                                    "type": "search",
                                    "title": "page"
                                }
                            ]
                        },
                        {
                            "id": "86b0GW7aLUw",
                            "created_at": "2017-10-25T08:48:44Z",
                            "updated_at": "2023-04-22T08:40:00Z",
                            "promoted_at": null,
                            "width": 5184,
                            "height": 3456,
                            "color": "#595959",
                            "blur_hash": "L9DJ6Z~WI98^DhxutR%f?boyogWB",
                            "description": "Coding Screen",
                            "alt_description": "photo of computer monitor displaying program",
                            "urls": {
                                "raw": "https://images.unsplash.com/photo-1508921234172-b68ed335b3e6?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw4fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3",
                                "full": "https://images.unsplash.com/photo-1508921234172-b68ed335b3e6?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw4fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=85",
                                "regular": "https://images.unsplash.com/photo-1508921234172-b68ed335b3e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw4fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=1080",
                                "small": "https://images.unsplash.com/photo-1508921234172-b68ed335b3e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw4fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=400",
                                "thumb": "https://images.unsplash.com/photo-1508921234172-b68ed335b3e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw4fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=200",
                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1508921234172-b68ed335b3e6"
                            },
                            "links": {
                                "self": "https://api.unsplash.com/photos/86b0GW7aLUw",
                                "html": "https://unsplash.com/photos/86b0GW7aLUw",
                                "download": "https://unsplash.com/photos/86b0GW7aLUw/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw4fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz",
                                "download_location": "https://api.unsplash.com/photos/86b0GW7aLUw/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw4fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz"
                            },
                            "likes": 357,
                            "liked_by_user": false,
                            "current_user_collections": [],
                            "sponsorship": null,
                            "topic_submissions": {},
                            "user": {
                                "id": "yUjsUZcXneg",
                                "updated_at": "2023-04-22T12:16:55Z",
                                "username": "bugsster",
                                "name": "Taras Shypka",
                                "first_name": "Taras",
                                "last_name": "Shypka",
                                "twitter_username": null,
                                "portfolio_url": null,
                                "bio": null,
                                "location": "Dnipro, Ukraine",
                                "links": {
                                    "self": "https://api.unsplash.com/users/bugsster",
                                    "html": "https://unsplash.com/@bugsster",
                                    "photos": "https://api.unsplash.com/users/bugsster/photos",
                                    "likes": "https://api.unsplash.com/users/bugsster/likes",
                                    "portfolio": "https://api.unsplash.com/users/bugsster/portfolio",
                                    "following": "https://api.unsplash.com/users/bugsster/following",
                                    "followers": "https://api.unsplash.com/users/bugsster/followers"
                                },
                                "profile_image": {
                                    "small": "https://images.unsplash.com/profile-1601455374420-f07995f8c7b0image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                    "medium": "https://images.unsplash.com/profile-1601455374420-f07995f8c7b0image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                    "large": "https://images.unsplash.com/profile-1601455374420-f07995f8c7b0image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                },
                                "instagram_username": "bugsster",
                                "total_collections": 0,
                                "total_likes": 0,
                                "total_photos": 6,
                                "accepted_tos": true,
                                "for_hire": false,
                                "social": {
                                    "instagram_username": "bugsster",
                                    "portfolio_url": null,
                                    "twitter_username": null,
                                    "paypal_email": null
                                }
                            },
                            "tags": [
                                {
                                    "type": "landing_page",
                                    "title": "computer",
                                    "source": {
                                        "ancestry": {
                                            "type": {
                                                "slug": "wallpapers",
                                                "pretty_slug": "HD Wallpapers"
                                            },
                                            "category": {
                                                "slug": "desktop",
                                                "pretty_slug": "Desktop"
                                            },
                                            "subcategory": {
                                                "slug": "computer",
                                                "pretty_slug": "Computer"
                                            }
                                        },
                                        "title": "Hd computer wallpapers",
                                        "subtitle": "Download free computer wallpapers",
                                        "description": "Choose from a curated selection of computer wallpapers for your mobile and desktop screens. Always free on Unsplash.",
                                        "meta_title": "Computer Wallpapers: Free HD Download [500+ HQ] | Unsplash",
                                        "meta_description": "Choose from hundreds of free computer wallpapers. Download HD wallpapers for free on Unsplash.",
                                        "cover_photo": {
                                            "id": "wyEinDRV88I",
                                            "created_at": "2016-11-18T21:01:40Z",
                                            "updated_at": "2023-04-17T14:01:07Z",
                                            "promoted_at": "2016-11-18T21:01:40Z",
                                            "width": 7952,
                                            "height": 5304,
                                            "color": "#c0c0c0",
                                            "blur_hash": "LhF$CS?bRjRj~p%LV@WCSiWWWBof",
                                            "description": null,
                                            "alt_description": "woman taking photo of buildings",
                                            "urls": {
                                                "raw": "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-4.0.3",
                                                "full": "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
                                                "regular": "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                                                "small": "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                                                "thumb": "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max",
                                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1479502806991-251c94be6b15"
                                            },
                                            "links": {
                                                "self": "https://api.unsplash.com/photos/wyEinDRV88I",
                                                "html": "https://unsplash.com/photos/wyEinDRV88I",
                                                "download": "https://unsplash.com/photos/wyEinDRV88I/download",
                                                "download_location": "https://api.unsplash.com/photos/wyEinDRV88I/download"
                                            },
                                            "likes": 576,
                                            "liked_by_user": false,
                                            "current_user_collections": [],
                                            "sponsorship": null,
                                            "topic_submissions": {
                                                "wallpapers": {
                                                    "status": "approved",
                                                    "approved_on": "2020-04-06T14:20:09Z"
                                                }
                                            },
                                            "premium": false,
                                            "plus": false,
                                            "user": {
                                                "id": "WylEZk6e2xA",
                                                "updated_at": "2023-04-17T15:02:05Z",
                                                "username": "thoughtcatalog",
                                                "name": "Thought Catalog",
                                                "first_name": "Thought",
                                                "last_name": "Catalog",
                                                "twitter_username": "thoughtcatalog",
                                                "portfolio_url": "http://thoughtcatalog.com/?utm_campaign=platform-link&utm_source=unsplash&utm_medium=profile",
                                                "bio": "We're a digital magazine based in Brooklyn. We use Unsplash to share with the world some of our best in-house photography.",
                                                "location": "New York",
                                                "links": {
                                                    "self": "https://api.unsplash.com/users/thoughtcatalog",
                                                    "html": "https://unsplash.com/@thoughtcatalog",
                                                    "photos": "https://api.unsplash.com/users/thoughtcatalog/photos",
                                                    "likes": "https://api.unsplash.com/users/thoughtcatalog/likes",
                                                    "portfolio": "https://api.unsplash.com/users/thoughtcatalog/portfolio",
                                                    "following": "https://api.unsplash.com/users/thoughtcatalog/following",
                                                    "followers": "https://api.unsplash.com/users/thoughtcatalog/followers"
                                                },
                                                "profile_image": {
                                                    "small": "https://images.unsplash.com/profile-1479502385647-8aa0d0e9a87b?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                                    "medium": "https://images.unsplash.com/profile-1479502385647-8aa0d0e9a87b?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                                    "large": "https://images.unsplash.com/profile-1479502385647-8aa0d0e9a87b?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                                },
                                                "instagram_username": "thoughtcatalog",
                                                "total_collections": 5,
                                                "total_likes": 12,
                                                "total_photos": 173,
                                                "accepted_tos": true,
                                                "for_hire": true,
                                                "social": {
                                                    "instagram_username": "thoughtcatalog",
                                                    "portfolio_url": "http://thoughtcatalog.com/?utm_campaign=platform-link&utm_source=unsplash&utm_medium=profile",
                                                    "twitter_username": "thoughtcatalog",
                                                    "paypal_email": null
                                                }
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "landing_page",
                                    "title": "screen",
                                    "source": {
                                        "ancestry": {
                                            "type": {
                                                "slug": "wallpapers",
                                                "pretty_slug": "HD Wallpapers"
                                            },
                                            "category": {
                                                "slug": "screen",
                                                "pretty_slug": "Screen"
                                            }
                                        },
                                        "title": "Hd screen wallpapers",
                                        "subtitle": "Download free screen wallpapers",
                                        "description": "Choose from a curated selection of screen wallpapers for your mobile and desktop screens. Always free on Unsplash.",
                                        "meta_title": "Screen Wallpapers: Free HD Download [500+ HQ] | Unsplash",
                                        "meta_description": "Choose from hundreds of free screen wallpapers. Download HD wallpapers for free on Unsplash.",
                                        "cover_photo": {
                                            "id": "RpZxHPikR6A",
                                            "created_at": "2018-02-28T05:04:55Z",
                                            "updated_at": "2023-04-11T02:03:25Z",
                                            "promoted_at": "2018-02-28T13:07:30Z",
                                            "width": 3160,
                                            "height": 3941,
                                            "color": "#262659",
                                            "blur_hash": "L98gm+yGxv?I5YISI8ITJE%htmS%",
                                            "description": "The Big Apple",
                                            "alt_description": "aerial photo of bridge during nighttime",
                                            "urls": {
                                                "raw": "https://images.unsplash.com/photo-1519794206461-cccd885bf209?ixlib=rb-4.0.3",
                                                "full": "https://images.unsplash.com/photo-1519794206461-cccd885bf209?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
                                                "regular": "https://images.unsplash.com/photo-1519794206461-cccd885bf209?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                                                "small": "https://images.unsplash.com/photo-1519794206461-cccd885bf209?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
                                                "thumb": "https://images.unsplash.com/photo-1519794206461-cccd885bf209?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max",
                                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1519794206461-cccd885bf209"
                                            },
                                            "links": {
                                                "self": "https://api.unsplash.com/photos/RpZxHPikR6A",
                                                "html": "https://unsplash.com/photos/RpZxHPikR6A",
                                                "download": "https://unsplash.com/photos/RpZxHPikR6A/download",
                                                "download_location": "https://api.unsplash.com/photos/RpZxHPikR6A/download"
                                            },
                                            "likes": 536,
                                            "liked_by_user": false,
                                            "current_user_collections": [],
                                            "sponsorship": null,
                                            "topic_submissions": {
                                                "wallpapers": {
                                                    "status": "approved",
                                                    "approved_on": "2020-04-06T14:20:09Z"
                                                }
                                            },
                                            "premium": false,
                                            "plus": false,
                                            "user": {
                                                "id": "ckhwrOf2W1c",
                                                "updated_at": "2023-04-07T21:00:42Z",
                                                "username": "zacong",
                                                "name": "Zac Ong",
                                                "first_name": "Zac",
                                                "last_name": "Ong",
                                                "twitter_username": "Zac_Ong",
                                                "portfolio_url": "https://zacong.work/",
                                                "bio": "A Multidisciplinary Creative Director and Artist",
                                                "location": "Singapore",
                                                "links": {
                                                    "self": "https://api.unsplash.com/users/zacong",
                                                    "html": "https://unsplash.com/de/@zacong",
                                                    "photos": "https://api.unsplash.com/users/zacong/photos",
                                                    "likes": "https://api.unsplash.com/users/zacong/likes",
                                                    "portfolio": "https://api.unsplash.com/users/zacong/portfolio",
                                                    "following": "https://api.unsplash.com/users/zacong/following",
                                                    "followers": "https://api.unsplash.com/users/zacong/followers"
                                                },
                                                "profile_image": {
                                                    "small": "https://images.unsplash.com/profile-1571088120526-aecfce4e3632image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                                    "medium": "https://images.unsplash.com/profile-1571088120526-aecfce4e3632image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                                    "large": "https://images.unsplash.com/profile-1571088120526-aecfce4e3632image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                                },
                                                "instagram_username": "zac_ong",
                                                "total_collections": 0,
                                                "total_likes": 148,
                                                "total_photos": 88,
                                                "accepted_tos": true,
                                                "for_hire": true,
                                                "social": {
                                                    "instagram_username": "zac_ong",
                                                    "portfolio_url": "https://zacong.work/",
                                                    "twitter_username": "Zac_Ong",
                                                    "paypal_email": null
                                                }
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "search",
                                    "title": "pogram"
                                }
                            ]
                        },
                        {
                            "id": "AxAPuIRWHGk",
                            "created_at": "2019-11-26T17:46:59Z",
                            "updated_at": "2023-04-21T16:09:38Z",
                            "promoted_at": null,
                            "width": 4744,
                            "height": 3162,
                            "color": "#404040",
                            "blur_hash": "LKEf4t~Wnf9ZHqjD?H?a%2RjIUIA",
                            "description": "Web developers working. Recherche, idéation et conception.\nNotre approche place vos utilisateurs au centre de l’expérience numérique afin de favoriser leur engagement et les inciter à passer à l’action. Nous disposons d’une boîte à outils adaptée à vos besoins afin que le tout repose sur des bases solides.",
                            "alt_description": "man wearing black dress shirt",
                            "urls": {
                                "raw": "https://images.unsplash.com/photo-1574790398664-0cb03682ed1c?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw5fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3",
                                "full": "https://images.unsplash.com/photo-1574790398664-0cb03682ed1c?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw5fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=85",
                                "regular": "https://images.unsplash.com/photo-1574790398664-0cb03682ed1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw5fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=1080",
                                "small": "https://images.unsplash.com/photo-1574790398664-0cb03682ed1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw5fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=400",
                                "thumb": "https://images.unsplash.com/photo-1574790398664-0cb03682ed1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw5fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz&ixlib=rb-4.0.3&q=80&w=200",
                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1574790398664-0cb03682ed1c"
                            },
                            "links": {
                                "self": "https://api.unsplash.com/photos/AxAPuIRWHGk",
                                "html": "https://unsplash.com/photos/AxAPuIRWHGk",
                                "download": "https://unsplash.com/photos/AxAPuIRWHGk/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw5fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz",
                                "download_location": "https://api.unsplash.com/photos/AxAPuIRWHGk/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHw5fHxmdW5jdGlvbnN8ZW58MHx8fHwxNjgyMTc5OTMz"
                            },
                            "likes": 130,
                            "liked_by_user": false,
                            "current_user_collections": [],
                            "sponsorship": null,
                            "topic_submissions": {
                                "business-work": {
                                    "status": "approved",
                                    "approved_on": "2021-02-03T18:55:03Z"
                                }
                            },
                            "user": {
                                "id": "c2sAAE9BXrY",
                                "updated_at": "2023-04-21T17:12:58Z",
                                "username": "sigmund",
                                "name": "Sigmund",
                                "first_name": "Sigmund",
                                "last_name": null,
                                "twitter_username": "sig__mund",
                                "portfolio_url": "https://sigmund.ca",
                                "bio": "Sigmund réalise des solutions numériques qui font la différence. onvousecoute@sigmund.ca",
                                "location": "Quebec, Canada",
                                "links": {
                                    "self": "https://api.unsplash.com/users/sigmund",
                                    "html": "https://unsplash.com/@sigmund",
                                    "photos": "https://api.unsplash.com/users/sigmund/photos",
                                    "likes": "https://api.unsplash.com/users/sigmund/likes",
                                    "portfolio": "https://api.unsplash.com/users/sigmund/portfolio",
                                    "following": "https://api.unsplash.com/users/sigmund/following",
                                    "followers": "https://api.unsplash.com/users/sigmund/followers"
                                },
                                "profile_image": {
                                    "small": "https://images.unsplash.com/profile-1592576104839-3461efcd5624image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                    "medium": "https://images.unsplash.com/profile-1592576104839-3461efcd5624image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                    "large": "https://images.unsplash.com/profile-1592576104839-3461efcd5624image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                },
                                "instagram_username": "sig__mund",
                                "total_collections": 28,
                                "total_likes": 739,
                                "total_photos": 1697,
                                "accepted_tos": true,
                                "for_hire": false,
                                "social": {
                                    "instagram_username": "sig__mund",
                                    "portfolio_url": "https://sigmund.ca",
                                    "twitter_username": "sig__mund",
                                    "paypal_email": null
                                }
                            },
                            "tags": [
                                {
                                    "type": "search",
                                    "title": "sigmund"
                                },
                                {
                                    "type": "search",
                                    "title": "boulevard charest est"
                                },
                                {
                                    "type": "search",
                                    "title": "québec"
                                }
                            ]
                        },
                        {
                            "id": "O2MdroNurVw",
                            "created_at": "2019-04-22T17:05:07Z",
                            "updated_at": "2023-04-22T11:45:01Z",
                            "promoted_at": null,
                            "width": 5184,
                            "height": 3456,
                            "color": "#262626",
                            "blur_hash": "L76lPjxVDSaH.lZ$M$t1Q-Meofxs",
                            "description": "When developing our very first Mayosis theme (for selling digital products through WordPress) I captured some great looking pictures on my iMac. The 50mm Prime lens was best for this particular shot with it's beautiful depth of field rendering. Later, I added some color gradient overlay and adjusted the look and feel in Lightroom and Photoshop.",
                            "alt_description": "green, blue, and yellow text on computer screen",
                            "urls": {
                                "raw": "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwxMHx8ZnVuY3Rpb25zfGVufDB8fHx8MTY4MjE3OTkzMw&ixlib=rb-4.0.3",
                                "full": "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwxMHx8ZnVuY3Rpb25zfGVufDB8fHx8MTY4MjE3OTkzMw&ixlib=rb-4.0.3&q=85",
                                "regular": "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwxMHx8ZnVuY3Rpb25zfGVufDB8fHx8MTY4MjE3OTkzMw&ixlib=rb-4.0.3&q=80&w=1080",
                                "small": "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwxMHx8ZnVuY3Rpb25zfGVufDB8fHx8MTY4MjE3OTkzMw&ixlib=rb-4.0.3&q=80&w=400",
                                "thumb": "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwxMHx8ZnVuY3Rpb25zfGVufDB8fHx8MTY4MjE3OTkzMw&ixlib=rb-4.0.3&q=80&w=200",
                                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1555952494-efd681c7e3f9"
                            },
                            "links": {
                                "self": "https://api.unsplash.com/photos/O2MdroNurVw",
                                "html": "https://unsplash.com/photos/O2MdroNurVw",
                                "download": "https://unsplash.com/photos/O2MdroNurVw/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwxMHx8ZnVuY3Rpb25zfGVufDB8fHx8MTY4MjE3OTkzMw",
                                "download_location": "https://api.unsplash.com/photos/O2MdroNurVw/download?ixid=Mnw0MzM4NDV8MHwxfHNlYXJjaHwxMHx8ZnVuY3Rpb25zfGVufDB8fHx8MTY4MjE3OTkzMw"
                            },
                            "likes": 191,
                            "liked_by_user": false,
                            "current_user_collections": [],
                            "sponsorship": null,
                            "topic_submissions": {},
                            "user": {
                                "id": "EepKzSJXfo0",
                                "updated_at": "2023-04-19T13:43:31Z",
                                "username": "hishahadat",
                                "name": "Shahadat Rahman",
                                "first_name": "Shahadat",
                                "last_name": "Rahman",
                                "twitter_username": "HiShahadat",
                                "portfolio_url": "https://gradienta.io",
                                "bio": "Product Designer, Photographer, Speaker & Passive Happiness Earner. Would love to see what you made with my images or send messages if I can help you with any project.",
                                "location": "Dhaka, Bangladesh",
                                "links": {
                                    "self": "https://api.unsplash.com/users/hishahadat",
                                    "html": "https://unsplash.com/@hishahadat",
                                    "photos": "https://api.unsplash.com/users/hishahadat/photos",
                                    "likes": "https://api.unsplash.com/users/hishahadat/likes",
                                    "portfolio": "https://api.unsplash.com/users/hishahadat/portfolio",
                                    "following": "https://api.unsplash.com/users/hishahadat/following",
                                    "followers": "https://api.unsplash.com/users/hishahadat/followers"
                                },
                                "profile_image": {
                                    "small": "https://images.unsplash.com/profile-1664159925166-d0a96d110b9dimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                                    "medium": "https://images.unsplash.com/profile-1664159925166-d0a96d110b9dimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                                    "large": "https://images.unsplash.com/profile-1664159925166-d0a96d110b9dimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                                },
                                "instagram_username": "hishahadat",
                                "total_collections": 1,
                                "total_likes": 0,
                                "total_photos": 34,
                                "accepted_tos": true,
                                "for_hire": true,
                                "social": {
                                    "instagram_username": "hishahadat",
                                    "portfolio_url": "https://gradienta.io",
                                    "twitter_username": "HiShahadat",
                                    "paypal_email": null
                                }
                            },
                            "tags": [
                                {
                                    "type": "search",
                                    "title": "text"
                                },
                                {
                                    "type": "search",
                                    "title": "code"
                                },
                                {
                                    "type": "search",
                                    "title": "html"
                                }
                            ]
                        }
                    ];
                    port.postMessage({ 'type': 'sendImgData', 'status': 'end', 'imgs': imgs });
                    // unsplashSearchPhotos(result['unsplashApiKey'], msg.keyWord).then((imgs: any) => {
                    //   console.log(imgs);
                    //   port.postMessage({ 'type': 'sendImgData', 'status': 'end', 'imgs': imgs })
                    // }).catch((error: any) => {
                    //   console.log(error);
                    // });
                }
                setTimeout(() => {
                    const now = new Date();
                    port.postMessage({ 'type': 'sendGPTData', 'status': 'begin', 'content': '' });
                    port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': `${now}` });
                    setTimeout(() => {
                        for (let i = 0; i < 80; i++) {
                            port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': "W" });
                        }
                        port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': "END" });
                        port.postMessage({ 'type': 'sendGPTData', 'status': 'end', 'content': "" });
                    }, 1000);
                }, 2000);
                return;
                // ====================
                if (result.openApiKey.length < 5) {
                    port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': '🥲 API Key error. Please modify and try again..' });
                    return;
                }
                fetch('https://api.openai.com/v1/chat/completions', {
                    method: "POST",
                    body: JSON.stringify({
                        "model": "gpt-3.5-turbo",
                        "messages": messages,
                        // "temperature": 0.8,
                        // "top_p": 0.9,
                        // "frequency_penalty": -0.5,
                        // "presence_penalty": 0.5,
                        // "temperature": 0,
                        // "max_tokens":520,
                        // "top_p": 1,
                        // "frequency_penalty": 0,
                        // "presence_penalty": 1,
                        "temperature": 0.7,
                        "max_tokens": 420,
                        "top_p": 1,
                        "frequency_penalty": 0,
                        "presence_penalty": 1,
                        "stream": true
                    }),
                    headers: { 'Authorization': 'Bearer ' + result.openApiKey, 'Content-Type': 'application/json', }
                }).then((response) => __awaiter(void 0, void 0, void 0, function* () {
                    var _a;
                    port.postMessage({ 'type': 'sendGPTData', 'status': 'begin', 'content': '' });
                    if (response.status === 401) {
                        // API KEY Error
                        console.log('401');
                        port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': '🥲 API Key error. Please modify and try again..' });
                        return;
                    }
                    if (response.status !== 401 && response.status !== 200) {
                        //  Error
                        port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': '🥲 Encountered some issues, please try again later.' });
                        return;
                    }
                    // 处理 server-sent events
                    const parser = (0, eventsource_parser_1.createParser)((event) => {
                        if (event.type === 'event') {
                            // console.log('createParser:');
                            try {
                                let new_msg = JSON.parse(event.data)['choices'][0]['delta']['content'];
                                if (new_msg !== undefined) {
                                    // 将数据发送给 UI 以渲染内容
                                    port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': JSON.parse(event.data)['choices'][0]['delta']['content'] });
                                }
                            }
                            catch (_a) {
                                console.log(' createParser JSON.parse errow');
                            }
                        }
                    });
                    const reader = (_a = response.body) === null || _a === void 0 ? void 0 : _a.getReader();
                    if (reader !== undefined) {
                        try {
                            // eslint-disable-next-line no-constant-condition
                            while (true) {
                                const { done, value } = yield reader.read();
                                if (done) {
                                    // 数据传输结束
                                    console.log('Done');
                                    port.postMessage({ 'type': 'sendGPTData', 'status': 'end', 'content': '' });
                                    break;
                                }
                                if (!isContinue) {
                                    console.log('停止渲染数据');
                                    break;
                                }
                                const str = new TextDecoder().decode(value);
                                parser.feed(str);
                            }
                        }
                        finally {
                            reader.releaseLock();
                        }
                        parser.reset();
                    }
                }))
                    .catch((error) => {
                    console.log('error');
                    console.log(error);
                    port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': "🥲 Encountered some issues, please try again later." });
                });
            });
        }
        // 停止渲染数据
        if (msg.type === 'windowClosed') {
            isContinue = false;
        }
    }));
});
webextension_polyfill_1.default.runtime.onMessage.addListener(handleMessage);
function handleMessage(request, sender, sendResponse) {
    console.log("Message from the content script: " +
        request.type);
    if (request.type === 'addToAnki') {
        console.log('addToAnki');
        const p = request.messages;
        // Define sendResponse as an async function
        const asyncSendResponse = (response) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield sendResponse(response);
            }
            catch (error) {
                console.error(error);
            }
        });
        (0, util_1.ankiAction)('addNote', 6, p).then((result) => {
            console.log(`got list of decks: ${result}`);
            // 反馈处理结果
            asyncSendResponse({ type: 'addToAnki', result: 'success', error: result.error });
        })
            .catch((error) => {
            console.error(error);
            asyncSendResponse({ type: 'addToAnki', result: 'failure', error: error.error });
        });
        // Return true to inform sendResponse that you will be calling it asynchronously
        return true;
    }
}


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unsplashSearchPhotos = exports.ankiAction = void 0;
const unsplash_js_1 = __webpack_require__(/*! unsplash-js */ "./node_modules/unsplash-js/dist/unsplash-js.esm.js");
// 将信息添加到 Anki
function ankiAction(action, version, params = {}) {
    return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:8765', {
            method: "POST",
            body: JSON.stringify({ "action": action, "version": version, "params": params })
        }).then(response => response.json()).then((data) => {
            console.log(data);
            resolve(data);
        }).catch((error) => {
            console.log('error');
            console.log(error);
            reject({ 'result': [], 'error': 'Please open the Anki client and install the Anki-Connect plugin before trying again.' });
        });
    });
}
exports.ankiAction = ankiAction;
function unsplashSearchPhotos(API_KEY, query) {
    return new Promise((resolve, reject) => {
        const unsplash = (0, unsplash_js_1.createApi)({
            accessKey: API_KEY,
        });
        unsplash.search.getPhotos({
            query: query,
        }).then((data) => {
            var _a, _b, _c;
            console.log(data);
            if (((_a = data.response) === null || _a === void 0 ? void 0 : _a.results.length) === 0) {
                resolve([]);
            }
            else {
                const imageUrl = (_b = data.response) === null || _b === void 0 ? void 0 : _b.results[0].urls.regular;
                // chrome.tabs.create({ url: imageUrl });
                resolve((_c = data.response) === null || _c === void 0 ? void 0 : _c.results);
            }
        }).catch((error) => {
            reject(error);
        });
    });
}
exports.unsplashSearchPhotos = unsplashSearchPhotos;


/***/ }),

/***/ "./node_modules/unsplash-js/dist/unsplash-js.esm.js":
/*!**********************************************************!*\
  !*** ./node_modules/unsplash-js/dist/unsplash-js.esm.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Language": () => (/* binding */ Language),
/* harmony export */   "OrderBy": () => (/* binding */ OrderBy),
/* harmony export */   "_internals": () => (/* binding */ internals),
/* harmony export */   "createApi": () => (/* binding */ createApi)
/* harmony export */ });
/* harmony import */ var content_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! content-type */ "./node_modules/content-type/index.js");


function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var checkIsString = /*#__PURE__*/getRefinement(function (value) {
  return typeof value === 'string' ? value : null;
});
var isDefined = function isDefined(x) {
  return x !== null && x !== undefined;
};
function getRefinement(getB) {
  return function (a) {
    return isDefined(getB(a));
  };
}
var checkIsNonEmptyArray = function checkIsNonEmptyArray(a) {
  return a.length > 0;
};

/** Takes a dictionary containing nullish values and returns a dictionary of all the defined
 * (non-nullish) values.
 */

var compactDefined = function compactDefined(obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    var _ref;

    var value = obj[key];
    return _extends({}, acc, isDefined(value) ? (_ref = {}, _ref[key] = value, _ref) : {});
  }, {});
};
function flow() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  var len = fns.length - 1;
  return function () {
    for (var _len2 = arguments.length, x = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      x[_key2] = arguments[_key2];
    }

    var y = fns[0].apply(this, x);

    for (var i = 1; i <= len; i++) {
      y = fns[i].call(this, y);
    }

    return y;
  };
}

var checkIsObject = /*#__PURE__*/getRefinement(function (response) {
  return isDefined(response) && typeof response === 'object' && !Array.isArray(response) ? response : null;
});
var checkIsErrors = /*#__PURE__*/getRefinement(function (errors) {
  return Array.isArray(errors) && errors.every(checkIsString) && checkIsNonEmptyArray(errors) ? errors : null;
});
var checkIsApiError = /*#__PURE__*/getRefinement(function (response) {
  return checkIsObject(response) && 'errors' in response && checkIsErrors(response.errors) ? {
    errors: response.errors
  } : null;
});
var getErrorForBadStatusCode = function getErrorForBadStatusCode(jsonResponse) {
  if (checkIsApiError(jsonResponse)) {
    return {
      errors: jsonResponse.errors,
      source: 'api'
    };
  } else {
    return {
      errors: ['Responded with a status code outside the 2xx range, and the response body is not recognisable.'],
      source: 'decoding'
    };
  }
};
var DecodingError = function DecodingError(message) {
  this.message = message;
};

var CONTENT_TYPE_RESPONSE_HEADER = 'content-type';
var CONTENT_TYPE_JSON = 'application/json';

var checkIsJsonResponse = function checkIsJsonResponse(response) {
  var contentTypeHeader = response.headers.get(CONTENT_TYPE_RESPONSE_HEADER);
  return isDefined(contentTypeHeader) && (0,content_type__WEBPACK_IMPORTED_MODULE_0__.parse)(contentTypeHeader).type === CONTENT_TYPE_JSON;
};
/**
 * Note: restrict the type of JSON to `AnyJson` so that `any` doesn't leak downstream.
 */


var getJsonResponse = function getJsonResponse(response) {
  if (checkIsJsonResponse(response)) {
    return response.json()["catch"](function (_err) {
      throw new DecodingError('unable to parse JSON response.');
    });
  } else {
    throw new DecodingError('expected JSON response from server.');
  }
};

var handleFetchResponse = function handleFetchResponse(handleResponse) {
  return function (response) {
    return (response.ok ? handleResponse({
      response: response
    }).then(function (handledResponse) {
      return {
        type: 'success',
        status: response.status,
        response: handledResponse,
        originalResponse: response
      };
    }) : getJsonResponse(response).then(function (jsonResponse) {
      return _extends({
        type: 'error',
        status: response.status
      }, getErrorForBadStatusCode(jsonResponse), {
        originalResponse: response
      });
    }))["catch"](function (error) {
      /**
       * We want to separate expected decoding errors from unknown ones. We do so by throwing a custom
       * `DecodingError` whenever we encounter one within `handleFetchResponse` and catch them all
       * here. This allows us to easily handle all of these errors at once. Unexpected errors are not
       * caught, so that they bubble up and fail loudly.
       *
       * Note: Ideally we'd use an Either type, but this does the job without introducing dependencies
       * like `fp-ts`.
       */
      if (error instanceof DecodingError) {
        return {
          type: 'error',
          source: 'decoding',
          status: response.status,
          originalResponse: response,
          errors: [error.message]
        };
      } else {
        throw error;
      }
    });
  };
};
var castResponse = function castResponse() {
  return function (_ref) {
    var response = _ref.response;
    return getJsonResponse(response);
  };
};

var addQueryToUrl = function addQueryToUrl(query) {
  return function (url) {
    Object.keys(query).forEach(function (queryKey) {
      return url.searchParams.set(queryKey, query[queryKey].toString());
    });
  };
};

var addPathnameToUrl = function addPathnameToUrl(pathname) {
  return function (url) {
    // When there is no existing pathname, the value is `/`. Appending would give us a URL with two
    // forward slashes. This is why we replace the value in that scenario.
    if (url.pathname === '/') {
      url.pathname = pathname;
    } else {
      url.pathname += pathname;
    }
  };
};

var buildUrl = function buildUrl(_ref) {
  var pathname = _ref.pathname,
      query = _ref.query;
  return function (apiUrl) {
    var url = new URL(apiUrl);
    addPathnameToUrl(pathname)(url);
    addQueryToUrl(query)(url);
    return url.toString();
  };
};

var getQueryFromSearchParams = function getQueryFromSearchParams(searchParams) {
  var query = {};
  searchParams.forEach(function (value, key) {
    query[key] = value;
  });
  return query;
};

var parseQueryAndPathname = function parseQueryAndPathname(url) {
  var _URL = new URL(url),
      pathname = _URL.pathname,
      searchParams = _URL.searchParams;

  var query = getQueryFromSearchParams(searchParams);
  return {
    query: query,
    pathname: pathname === '/' ? undefined : pathname
  };
};

/**
 * helper used to type-check the arguments, and add default params for all requests
 */

var createRequestHandler = function createRequestHandler(fn) {
  return function (a, additionalFetchOptions) {
    if (additionalFetchOptions === void 0) {
      additionalFetchOptions = {};
    }

    var _fn = fn(a),
        headers = _fn.headers,
        query = _fn.query,
        baseReqParams = _objectWithoutPropertiesLoose(_fn, ["headers", "query"]);

    return _extends({}, baseReqParams, additionalFetchOptions, {
      query: query,
      headers: _extends({}, headers, additionalFetchOptions.headers)
    });
  };
};
var makeEndpoint = function makeEndpoint(endpoint) {
  return endpoint;
};
var initMakeRequest = function initMakeRequest(_ref) {
  var accessKey = _ref.accessKey,
      _ref$apiVersion = _ref.apiVersion,
      apiVersion = _ref$apiVersion === void 0 ? 'v1' : _ref$apiVersion,
      _ref$apiUrl = _ref.apiUrl,
      apiUrl = _ref$apiUrl === void 0 ? 'https://api.unsplash.com' : _ref$apiUrl,
      generalHeaders = _ref.headers,
      providedFetch = _ref.fetch,
      generalFetchOptions = _objectWithoutPropertiesLoose(_ref, ["accessKey", "apiVersion", "apiUrl", "headers", "fetch"]);

  return function (_ref2) {
    var handleResponse = _ref2.handleResponse,
        handleRequest = _ref2.handleRequest;
    return flow(handleRequest, function (_ref3) {
      var pathname = _ref3.pathname,
          query = _ref3.query,
          _ref3$method = _ref3.method,
          method = _ref3$method === void 0 ? 'GET' : _ref3$method,
          endpointHeaders = _ref3.headers,
          body = _ref3.body,
          signal = _ref3.signal;
      var url = buildUrl({
        pathname: pathname,
        query: query
      })(apiUrl);

      var fetchOptions = _extends({
        method: method,
        headers: _extends({}, generalHeaders, endpointHeaders, {
          'Accept-Version': apiVersion
        }, isDefined(accessKey) ? {
          Authorization: "Client-ID " + accessKey
        } : {}),
        body: body,
        signal: signal
      }, generalFetchOptions);

      var fetchToUse = providedFetch != null ? providedFetch : fetch;
      return fetchToUse(url, fetchOptions).then(handleFetchResponse(handleResponse));
    });
  };
};

var TOTAL_RESPONSE_HEADER = 'x-total';

var getTotalFromApiFeedResponse = function getTotalFromApiFeedResponse(response) {
  var totalsStr = response.headers.get(TOTAL_RESPONSE_HEADER);

  if (isDefined(totalsStr)) {
    var total = parseInt(totalsStr);

    if (Number.isInteger(total)) {
      return total;
    } else {
      throw new DecodingError("expected " + TOTAL_RESPONSE_HEADER + " header to be valid integer.");
    }
  } else {
    throw new DecodingError("expected " + TOTAL_RESPONSE_HEADER + " header to exist.");
  }
};

var handleFeedResponse = function handleFeedResponse() {
  return function (_ref) {
    var response = _ref.response;
    return castResponse()({
      response: response
    }).then(function (results) {
      return {
        results: results,
        total: getTotalFromApiFeedResponse(response)
      };
    });
  };
};

var getCollections = function getCollections(collectionIds) {
  return isDefined(collectionIds) ? {
    collections: collectionIds.join()
  } : {};
};
var getTopics = function getTopics(topicIds) {
  return isDefined(topicIds) ? {
    topics: topicIds.join()
  } : {};
};
var getFeedParams = function getFeedParams(_ref) {
  var page = _ref.page,
      perPage = _ref.perPage,
      orderBy = _ref.orderBy;
  return compactDefined({
    per_page: perPage,
    order_by: orderBy,
    page: page
  });
};

var COLLECTIONS_PATH_PREFIX = '/collections';
var getPhotos = /*#__PURE__*/function () {
  var getPathname = function getPathname(_ref) {
    var collectionId = _ref.collectionId;
    return COLLECTIONS_PATH_PREFIX + "/" + collectionId + "/photos";
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_ref2) {
      var collectionId = _ref2.collectionId,
          orientation = _ref2.orientation,
          paginationParams = _objectWithoutPropertiesLoose(_ref2, ["collectionId", "orientation"]);

      return {
        pathname: getPathname({
          collectionId: collectionId
        }),
        query: compactDefined(_extends({}, getFeedParams(paginationParams), {
          orientation: orientation
        }))
      };
    }),
    handleResponse: handleFeedResponse()
  });
}();
var get = /*#__PURE__*/function () {
  var getPathname = function getPathname(_ref3) {
    var collectionId = _ref3.collectionId;
    return COLLECTIONS_PATH_PREFIX + "/" + collectionId;
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_ref4) {
      var collectionId = _ref4.collectionId;
      return {
        pathname: getPathname({
          collectionId: collectionId
        }),
        query: {}
      };
    }),
    handleResponse: castResponse()
  });
}();
var list = /*#__PURE__*/function () {
  var getPathname = function getPathname() {
    return COLLECTIONS_PATH_PREFIX;
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (paginationParams) {
      if (paginationParams === void 0) {
        paginationParams = {};
      }

      return {
        pathname: getPathname(),
        query: getFeedParams(paginationParams)
      };
    }),
    handleResponse: handleFeedResponse()
  });
}();
var getRelated = /*#__PURE__*/function () {
  var getPathname = function getPathname(_ref5) {
    var collectionId = _ref5.collectionId;
    return COLLECTIONS_PATH_PREFIX + "/" + collectionId + "/related";
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_ref6) {
      var collectionId = _ref6.collectionId;
      return {
        pathname: getPathname({
          collectionId: collectionId
        }),
        query: {}
      };
    }),
    handleResponse: castResponse()
  });
}();

var index = {
  __proto__: null,
  getPhotos: getPhotos,
  get: get,
  list: list,
  getRelated: getRelated
};

var PHOTOS_PATH_PREFIX = '/photos';
var list$1 = /*#__PURE__*/function () {
  var _getPathname = function getPathname() {
    return PHOTOS_PATH_PREFIX;
  };

  return makeEndpoint({
    // Wrapper uses type trick to allow 0 args
    getPathname: function getPathname(_params) {
      return _getPathname();
    },
    handleRequest: createRequestHandler(function (feedParams) {
      if (feedParams === void 0) {
        feedParams = {};
      }

      return {
        pathname: PHOTOS_PATH_PREFIX,
        query: compactDefined(getFeedParams(feedParams))
      };
    }),
    handleResponse: handleFeedResponse()
  });
}();
var get$1 = /*#__PURE__*/function () {
  var getPathname = function getPathname(_ref) {
    var photoId = _ref.photoId;
    return PHOTOS_PATH_PREFIX + "/" + photoId;
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_ref2) {
      var photoId = _ref2.photoId;
      return {
        pathname: getPathname({
          photoId: photoId
        }),
        query: {}
      };
    }),
    handleResponse: castResponse()
  });
}();
var getStats = /*#__PURE__*/function () {
  var getPathname = function getPathname(_ref3) {
    var photoId = _ref3.photoId;
    return PHOTOS_PATH_PREFIX + "/" + photoId + "/statistics";
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_ref4) {
      var photoId = _ref4.photoId;
      return {
        pathname: getPathname({
          photoId: photoId
        }),
        query: {}
      };
    }),
    handleResponse: castResponse()
  });
}();
var getRandom = /*#__PURE__*/function () {
  var getPathname = function getPathname() {
    return PHOTOS_PATH_PREFIX + "/random";
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_temp) {
      var _ref5 = _temp === void 0 ? {} : _temp,
          collectionIds = _ref5.collectionIds,
          contentFilter = _ref5.contentFilter,
          topicIds = _ref5.topicIds,
          queryParams = _objectWithoutPropertiesLoose(_ref5, ["collectionIds", "contentFilter", "topicIds"]);

      return {
        pathname: getPathname(),
        query: compactDefined(_extends({}, queryParams, {
          content_filter: contentFilter
        }, getCollections(collectionIds), getTopics(topicIds))),
        headers: {
          /**
           * Avoid response caching
           */
          'cache-control': 'no-cache'
        }
      };
    }),
    handleResponse: castResponse()
  });
}();
var trackDownload = {
  handleRequest: /*#__PURE__*/createRequestHandler(function (_ref6) {
    var downloadLocation = _ref6.downloadLocation;

    var _parseQueryAndPathnam = parseQueryAndPathname(downloadLocation),
        pathname = _parseQueryAndPathnam.pathname,
        query = _parseQueryAndPathnam.query;

    if (!isDefined(pathname)) {
      throw new Error('Could not parse pathname from url.');
    }

    return {
      pathname: pathname,
      query: compactDefined(query)
    };
  }),
  handleResponse: /*#__PURE__*/castResponse()
};

var index$1 = {
  __proto__: null,
  list: list$1,
  get: get$1,
  getStats: getStats,
  getRandom: getRandom,
  trackDownload: trackDownload
};

var SEARCH_PATH_PREFIX = "/search";
var getPhotos$1 = /*#__PURE__*/function () {
  var _getPathname = function getPathname() {
    return SEARCH_PATH_PREFIX + "/photos";
  };

  return makeEndpoint({
    // Wrapper uses type trick to allow 0 args
    getPathname: function getPathname(_params) {
      return _getPathname();
    },
    handleRequest: createRequestHandler(function (_ref) {
      var query = _ref.query,
          page = _ref.page,
          perPage = _ref.perPage,
          orderBy = _ref.orderBy,
          collectionIds = _ref.collectionIds,
          lang = _ref.lang,
          contentFilter = _ref.contentFilter,
          filters = _objectWithoutPropertiesLoose(_ref, ["query", "page", "perPage", "orderBy", "collectionIds", "lang", "contentFilter"]);

      return {
        pathname: _getPathname(),
        query: compactDefined(_extends({
          query: query,
          content_filter: contentFilter,
          lang: lang,
          order_by: orderBy
        }, getFeedParams({
          page: page,
          perPage: perPage
        }), getCollections(collectionIds), filters))
      };
    }),
    handleResponse: castResponse()
  });
}();
var getCollections$1 = /*#__PURE__*/function () {
  var _getPathname2 = function getPathname() {
    return SEARCH_PATH_PREFIX + "/collections";
  };

  return makeEndpoint({
    // Wrapper uses type trick to allow 0 args
    getPathname: function getPathname(_params) {
      return _getPathname2();
    },
    handleRequest: createRequestHandler(function (_ref2) {
      var query = _ref2.query,
          paginationParams = _objectWithoutPropertiesLoose(_ref2, ["query"]);

      return {
        pathname: _getPathname2(),
        query: _extends({
          query: query
        }, getFeedParams(paginationParams))
      };
    }),
    handleResponse: castResponse()
  });
}();
var getUsers = /*#__PURE__*/function () {
  var _getPathname3 = function getPathname() {
    return SEARCH_PATH_PREFIX + "/users";
  };

  return makeEndpoint({
    // Wrapper uses type trick to allow 0 args
    getPathname: function getPathname(_params) {
      return _getPathname3();
    },
    handleRequest: createRequestHandler(function (_ref3) {
      var query = _ref3.query,
          paginationParams = _objectWithoutPropertiesLoose(_ref3, ["query"]);

      return {
        pathname: _getPathname3(),
        query: _extends({
          query: query
        }, getFeedParams(paginationParams))
      };
    }),
    handleResponse: castResponse()
  });
}();

var index$2 = {
  __proto__: null,
  getPhotos: getPhotos$1,
  getCollections: getCollections$1,
  getUsers: getUsers
};

var USERS_PATH_PREFIX = '/users';
var get$2 = /*#__PURE__*/function () {
  var getPathname = function getPathname(_ref) {
    var username = _ref.username;
    return USERS_PATH_PREFIX + "/" + username;
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_ref2) {
      var username = _ref2.username;
      return {
        pathname: getPathname({
          username: username
        }),
        query: {}
      };
    }),
    handleResponse: castResponse()
  });
}();
var getPhotos$2 = /*#__PURE__*/function () {
  var getPathname = function getPathname(_ref3) {
    var username = _ref3.username;
    return USERS_PATH_PREFIX + "/" + username + "/photos";
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_ref4) {
      var username = _ref4.username,
          stats = _ref4.stats,
          orientation = _ref4.orientation,
          paginationParams = _objectWithoutPropertiesLoose(_ref4, ["username", "stats", "orientation"]);

      return {
        pathname: getPathname({
          username: username
        }),
        query: compactDefined(_extends({}, getFeedParams(paginationParams), {
          orientation: orientation,
          stats: stats
        }))
      };
    }),
    handleResponse: handleFeedResponse()
  });
}();
var getLikes = /*#__PURE__*/function () {
  var getPathname = function getPathname(_ref5) {
    var username = _ref5.username;
    return USERS_PATH_PREFIX + "/" + username + "/likes";
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_ref6) {
      var username = _ref6.username,
          orientation = _ref6.orientation,
          paginationParams = _objectWithoutPropertiesLoose(_ref6, ["username", "orientation"]);

      return {
        pathname: getPathname({
          username: username
        }),
        query: compactDefined(_extends({}, getFeedParams(paginationParams), {
          orientation: orientation
        }))
      };
    }),
    handleResponse: handleFeedResponse()
  });
}();
var getCollections$2 = /*#__PURE__*/function () {
  var getPathname = function getPathname(_ref7) {
    var username = _ref7.username;
    return USERS_PATH_PREFIX + "/" + username + "/collections";
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_ref8) {
      var username = _ref8.username,
          paginationParams = _objectWithoutPropertiesLoose(_ref8, ["username"]);

      return {
        pathname: getPathname({
          username: username
        }),
        query: getFeedParams(paginationParams)
      };
    }),
    handleResponse: handleFeedResponse()
  });
}();

var index$3 = {
  __proto__: null,
  get: get$2,
  getPhotos: getPhotos$2,
  getLikes: getLikes,
  getCollections: getCollections$2
};

var BASE_TOPIC_PATH = '/topics';

var getTopicPath = function getTopicPath(_ref) {
  var topicIdOrSlug = _ref.topicIdOrSlug;
  return BASE_TOPIC_PATH + "/" + topicIdOrSlug;
};

var list$2 = /*#__PURE__*/makeEndpoint({
  getPathname: getTopicPath,
  handleRequest: function handleRequest(_ref2) {
    var page = _ref2.page,
        perPage = _ref2.perPage,
        orderBy = _ref2.orderBy,
        topicIdsOrSlugs = _ref2.topicIdsOrSlugs;
    return {
      pathname: BASE_TOPIC_PATH,
      query: compactDefined(_extends({}, getFeedParams({
        page: page,
        perPage: perPage
      }), {
        ids: topicIdsOrSlugs == null ? void 0 : topicIdsOrSlugs.join(','),
        order_by: orderBy
      }))
    };
  },
  handleResponse: /*#__PURE__*/handleFeedResponse()
});
var get$3 = /*#__PURE__*/makeEndpoint({
  getPathname: getTopicPath,
  handleRequest: function handleRequest(_ref3) {
    var topicIdOrSlug = _ref3.topicIdOrSlug;
    return {
      pathname: getTopicPath({
        topicIdOrSlug: topicIdOrSlug
      }),
      query: {}
    };
  },
  handleResponse: /*#__PURE__*/castResponse()
});
var getPhotos$3 = /*#__PURE__*/function () {
  var getPathname = /*#__PURE__*/flow(getTopicPath, function (topicPath) {
    return topicPath + "/photos";
  });
  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: function handleRequest(_ref4) {
      var topicIdOrSlug = _ref4.topicIdOrSlug,
          orientation = _ref4.orientation,
          feedParams = _objectWithoutPropertiesLoose(_ref4, ["topicIdOrSlug", "orientation"]);

      return {
        pathname: getPathname({
          topicIdOrSlug: topicIdOrSlug
        }),
        query: compactDefined(_extends({}, getFeedParams(feedParams), {
          orientation: orientation
        }))
      };
    },
    handleResponse: handleFeedResponse()
  });
}();

var index$4 = {
  __proto__: null,
  list: list$2,
  get: get$3,
  getPhotos: getPhotos$3
};

var trackNonHotLinkedPhotoView = function trackNonHotLinkedPhotoView(_ref) {
  var appId = _ref.appId;
  return function (_ref2) {
    var photoId = _ref2.photoId;
    var ids = !Array.isArray(photoId) ? [photoId] : photoId;

    if (ids.length > 20) {
      throw new Error('You cannot track more than 20 photos at once. Please try again with fewer photos.');
    }

    return fetch("views.unsplash.com/v?photo_id=" + ids.join() + "&app_id=" + appId);
  };
};



var internals = {
  __proto__: null,
  collections: index,
  photos: index$1,
  search: index$2,
  users: index$3,
  topics: index$4,
  trackNonHotLinkedPhotoView: trackNonHotLinkedPhotoView
};

var Language;

(function (Language) {
  Language["Afrikaans"] = "af";
  Language["Amharic"] = "am";
  Language["Arabic"] = "ar";
  Language["Azerbaijani"] = "az";
  Language["Belarusian"] = "be";
  Language["Bulgarian"] = "bg";
  Language["Bengali"] = "bn";
  Language["Bosnian"] = "bs";
  Language["Catalan"] = "ca";
  Language["Cebuano"] = "ceb";
  Language["Corsican"] = "co";
  Language["Czech"] = "cs";
  Language["Welsh"] = "cy";
  Language["Danish"] = "da";
  Language["German"] = "de";
  Language["Greek"] = "el";
  Language["English"] = "en";
  Language["Esperanto"] = "eo";
  Language["Spanish"] = "es";
  Language["Estonian"] = "et";
  Language["Basque"] = "eu";
  Language["Persian"] = "fa";
  Language["Finnish"] = "fi";
  Language["French"] = "fr";
  Language["Frisian"] = "fy";
  Language["Irish"] = "ga";
  Language["ScotsGaelic"] = "gd";
  Language["Galician"] = "gl";
  Language["Gujarati"] = "gu";
  Language["Hausa"] = "ha";
  Language["Hawaiian"] = "haw";
  Language["Hindi"] = "hi";
  Language["Hmong"] = "hmn";
  Language["Croatian"] = "hr";
  Language["HaitianCreole"] = "ht";
  Language["Hungarian"] = "hu";
  Language["Armenian"] = "hy";
  Language["Indonesian"] = "id";
  Language["Igbo"] = "ig";
  Language["Icelandic"] = "is";
  Language["Italian"] = "it";
  Language["Hebrew"] = "iw";
  Language["Japanese"] = "ja";
  Language["Javanese"] = "jw";
  Language["Georgian"] = "ka";
  Language["Kazakh"] = "kk";
  Language["Khmer"] = "km";
  Language["Kannada"] = "kn";
  Language["Korean"] = "ko";
  Language["Kurdish"] = "ku";
  Language["Kyrgyz"] = "ky";
  Language["Latin"] = "la";
  Language["Luxembourgish"] = "lb";
  Language["Lao"] = "lo";
  Language["Lithuanian"] = "lt";
  Language["Latvian"] = "lv";
  Language["Malagasy"] = "mg";
  Language["Maori"] = "mi";
  Language["Macedonian"] = "mk";
  Language["Malayalam"] = "ml";
  Language["Mongolian"] = "mn";
  Language["Marathi"] = "mr";
  Language["Malay"] = "ms";
  Language["Maltese"] = "mt";
  Language["Myanmar"] = "my";
  Language["Nepali"] = "ne";
  Language["Dutch"] = "nl";
  Language["Norwegian"] = "no";
  Language["Nyanja"] = "ny";
  Language["Oriya"] = "or";
  Language["Punjabi"] = "pa";
  Language["Polish"] = "pl";
  Language["Pashto"] = "ps";
  Language["Portuguese"] = "pt";
  Language["Romanian"] = "ro";
  Language["Russian"] = "ru";
  Language["Kinyarwanda"] = "rw";
  Language["Sindhi"] = "sd";
  Language["Sinhala"] = "si";
  Language["Slovak"] = "sk";
  Language["Slovenian"] = "sl";
  Language["Samoan"] = "sm";
  Language["Shona"] = "sn";
  Language["Somali"] = "so";
  Language["Albanian"] = "sq";
  Language["Serbian"] = "sr";
  Language["Sesotho"] = "st";
  Language["Sundanese"] = "su";
  Language["Swedish"] = "sv";
  Language["Swahili"] = "sw";
  Language["Tamil"] = "ta";
  Language["Telugu"] = "te";
  Language["Tajik"] = "tg";
  Language["Thai"] = "th";
  Language["Turkmen"] = "tk";
  Language["Filipino"] = "tl";
  Language["Turkish"] = "tr";
  Language["Tatar"] = "tt";
  Language["Uighur"] = "ug";
  Language["Ukrainian"] = "uk";
  Language["Urdu"] = "ur";
  Language["Uzbek"] = "uz";
  Language["Vietnamese"] = "vi";
  Language["Xhosa"] = "xh";
  Language["Yiddish"] = "yi";
  Language["Yoruba"] = "yo";
  Language["ChineseSimplified"] = "zh";
  Language["ChineseTraditional"] = "zh-TW";
  Language["Zulu"] = "zu";
})(Language || (Language = {}));

var OrderBy;

(function (OrderBy) {
  OrderBy["LATEST"] = "latest";
  OrderBy["POPULAR"] = "popular";
  OrderBy["VIEWS"] = "views";
  OrderBy["DOWNLOADS"] = "downloads";
  OrderBy["OLDEST"] = "oldest";
})(OrderBy || (OrderBy = {}));

var createApi = /*#__PURE__*/flow(initMakeRequest, function (makeRequest) {
  return {
    photos: {
      get: makeRequest(get$1),
      list: makeRequest(list$1),
      getStats: makeRequest(getStats),
      getRandom: makeRequest(getRandom),
      trackDownload: makeRequest(trackDownload)
    },
    users: {
      getPhotos: makeRequest(getPhotos$2),
      getCollections: makeRequest(getCollections$2),
      getLikes: makeRequest(getLikes),
      get: makeRequest(get$2)
    },
    search: {
      getCollections: makeRequest(getCollections$1),
      getPhotos: makeRequest(getPhotos$1),
      getUsers: makeRequest(getUsers)
    },
    collections: {
      getPhotos: makeRequest(getPhotos),
      get: makeRequest(get),
      list: makeRequest(list),
      getRelated: makeRequest(getRelated)
    },
    topics: {
      list: makeRequest(list$2),
      get: makeRequest(get$3),
      getPhotos: makeRequest(getPhotos$3)
    }
  };
});


//# sourceMappingURL=unsplash-js.esm.js.map


/***/ }),

/***/ "./node_modules/webextension-polyfill/dist/browser-polyfill.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webextension-polyfill/dist/browser-polyfill.js ***!
  \*********************************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (module) {
  /* webextension-polyfill - v0.10.0 - Fri Aug 12 2022 19:42:44 */

  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */

  /* vim: set sts=2 sw=2 et tw=80: */

  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  if (!globalThis.chrome?.runtime?.id) {
    throw new Error("This script should only be loaded in a browser extension.");
  }

  if (typeof globalThis.browser === "undefined" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received."; // Wrapping the bulk of this polyfill in a one-time-use function is a minor
    // optimization for Firefox. Since Spidermonkey does not fully parse the
    // contents of a function until the first time it's called, and since it will
    // never actually need to be called, this allows the polyfill to be included
    // in Firefox nearly for free.

    const wrapAPIs = extensionAPIs => {
      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
      // at build time by replacing the following "include" with the content of the
      // JSON file.
      const apiMetadata = {
        "alarms": {
          "clear": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "clearAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "bookmarks": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getChildren": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getRecent": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getSubTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTree": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "browserAction": {
          "disable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "enable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "getBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getBadgeText": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "openPopup": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setBadgeText": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "browsingData": {
          "remove": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "removeCache": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCookies": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeDownloads": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFormData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeHistory": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeLocalStorage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePasswords": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePluginData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "settings": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "commands": {
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "contextMenus": {
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "cookies": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAllCookieStores": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "set": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "devtools": {
          "inspectedWindow": {
            "eval": {
              "minArgs": 1,
              "maxArgs": 2,
              "singleCallbackArg": false
            }
          },
          "panels": {
            "create": {
              "minArgs": 3,
              "maxArgs": 3,
              "singleCallbackArg": true
            },
            "elements": {
              "createSidebarPane": {
                "minArgs": 1,
                "maxArgs": 1
              }
            }
          }
        },
        "downloads": {
          "cancel": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "download": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "erase": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFileIcon": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "open": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "pause": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFile": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "resume": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "extension": {
          "isAllowedFileSchemeAccess": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "isAllowedIncognitoAccess": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "history": {
          "addUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "deleteRange": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getVisits": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "i18n": {
          "detectLanguage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAcceptLanguages": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "identity": {
          "launchWebAuthFlow": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "idle": {
          "queryState": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "management": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSelf": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setEnabled": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "uninstallSelf": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "notifications": {
          "clear": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPermissionLevel": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "pageAction": {
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "hide": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "permissions": {
          "contains": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "request": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "runtime": {
          "getBackgroundPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPlatformInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "openOptionsPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "requestUpdateCheck": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "sendMessage": {
            "minArgs": 1,
            "maxArgs": 3
          },
          "sendNativeMessage": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "setUninstallURL": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "sessions": {
          "getDevices": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getRecentlyClosed": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "restore": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "storage": {
          "local": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "managed": {
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "sync": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          }
        },
        "tabs": {
          "captureVisibleTab": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "detectLanguage": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "discard": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "duplicate": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "executeScript": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getZoom": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getZoomSettings": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goBack": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goForward": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "highlight": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "insertCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "query": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "reload": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "sendMessage": {
            "minArgs": 2,
            "maxArgs": 3
          },
          "setZoom": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "setZoomSettings": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "update": {
            "minArgs": 1,
            "maxArgs": 2
          }
        },
        "topSites": {
          "get": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "webNavigation": {
          "getAllFrames": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFrame": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "webRequest": {
          "handlerBehaviorChanged": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "windows": {
          "create": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getLastFocused": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        }
      };

      if (Object.keys(apiMetadata).length === 0) {
        throw new Error("api-metadata.json has not been included in browser-polyfill");
      }
      /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */


      class DefaultWeakMap extends WeakMap {
        constructor(createItem, items = undefined) {
          super(items);
          this.createItem = createItem;
        }

        get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }

          return super.get(key);
        }

      }
      /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */


      const isThenable = value => {
        return value && typeof value === "object" && typeof value.then === "function";
      };
      /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.reject
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function}
       *        The generated callback function.
       */


      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (extensionAPIs.runtime.lastError) {
            promise.reject(new Error(extensionAPIs.runtime.lastError.message));
          } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
            promise.resolve(callbackArgs[0]);
          } else {
            promise.resolve(callbackArgs);
          }
        };
      };

      const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";
      /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */


      const wrapAsyncFunction = (name, metadata) => {
        return function asyncFunctionWrapper(target, ...args) {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }

          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }

          return new Promise((resolve, reject) => {
            if (metadata.fallbackToNoCallback) {
              // This API method has currently no callback on Chrome, but it return a promise on Firefox,
              // and so the polyfill will try to call it with a callback first, and it will fallback
              // to not passing the callback if the first call fails.
              try {
                target[name](...args, makeCallback({
                  resolve,
                  reject
                }, metadata));
              } catch (cbError) {
                console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
                target[name](...args); // Update the API method metadata, so that the next API calls will not try to
                // use the unsupported callback anymore.

                metadata.fallbackToNoCallback = false;
                metadata.noCallback = true;
                resolve();
              }
            } else if (metadata.noCallback) {
              target[name](...args);
              resolve();
            } else {
              target[name](...args, makeCallback({
                resolve,
                reject
              }, metadata));
            }
          });
        };
      };
      /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the original method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */


      const wrapMethod = (target, method, wrapper) => {
        return new Proxy(method, {
          apply(targetMethod, thisObj, args) {
            return wrapper.call(thisObj, target, ...args);
          }

        });
      };

      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
      /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */

      const wrapObject = (target, wrappers = {}, metadata = {}) => {
        let cache = Object.create(null);
        let handlers = {
          has(proxyTarget, prop) {
            return prop in target || prop in cache;
          },

          get(proxyTarget, prop, receiver) {
            if (prop in cache) {
              return cache[prop];
            }

            if (!(prop in target)) {
              return undefined;
            }

            let value = target[prop];

            if (typeof value === "function") {
              // This is a method on the underlying object. Check if we need to do
              // any wrapping.
              if (typeof wrappers[prop] === "function") {
                // We have a special-case wrapper for this method.
                value = wrapMethod(target, target[prop], wrappers[prop]);
              } else if (hasOwnProperty(metadata, prop)) {
                // This is an async method that we have metadata for. Create a
                // Promise wrapper for it.
                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                value = wrapMethod(target, target[prop], wrapper);
              } else {
                // This is a method that we don't know or care about. Return the
                // original method, bound to the underlying object.
                value = value.bind(target);
              }
            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
              // This is an object that we need to do some wrapping for the children
              // of. Create a sub-object wrapper for it with the appropriate child
              // metadata.
              value = wrapObject(value, wrappers[prop], metadata[prop]);
            } else if (hasOwnProperty(metadata, "*")) {
              // Wrap all properties in * namespace.
              value = wrapObject(value, wrappers[prop], metadata["*"]);
            } else {
              // We don't need to do any wrapping for this property,
              // so just forward all access to the underlying object.
              Object.defineProperty(cache, prop, {
                configurable: true,
                enumerable: true,

                get() {
                  return target[prop];
                },

                set(value) {
                  target[prop] = value;
                }

              });
              return value;
            }

            cache[prop] = value;
            return value;
          },

          set(proxyTarget, prop, value, receiver) {
            if (prop in cache) {
              cache[prop] = value;
            } else {
              target[prop] = value;
            }

            return true;
          },

          defineProperty(proxyTarget, prop, desc) {
            return Reflect.defineProperty(cache, prop, desc);
          },

          deleteProperty(proxyTarget, prop) {
            return Reflect.deleteProperty(cache, prop);
          }

        }; // Per contract of the Proxy API, the "get" proxy handler must return the
        // original value of the target if that value is declared read-only and
        // non-configurable. For this reason, we create an object with the
        // prototype set to `target` instead of using `target` directly.
        // Otherwise we cannot return a custom object for APIs that
        // are declared read-only and non-configurable, such as `chrome.devtools`.
        //
        // The proxy handlers themselves will still use the original `target`
        // instead of the `proxyTarget`, so that the methods and properties are
        // dereferenced via the original targets.

        let proxyTarget = Object.create(target);
        return new Proxy(proxyTarget, handlers);
      };
      /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */


      const wrapEvent = wrapperMap => ({
        addListener(target, listener, ...args) {
          target.addListener(wrapperMap.get(listener), ...args);
        },

        hasListener(target, listener) {
          return target.hasListener(wrapperMap.get(listener));
        },

        removeListener(target, listener) {
          target.removeListener(wrapperMap.get(listener));
        }

      });

      const onRequestFinishedWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }
        /**
         * Wraps an onRequestFinished listener function so that it will return a
         * `getContent()` property which returns a `Promise` rather than using a
         * callback API.
         *
         * @param {object} req
         *        The HAR entry object representing the network request.
         */


        return function onRequestFinished(req) {
          const wrappedReq = wrapObject(req, {}
          /* wrappers */
          , {
            getContent: {
              minArgs: 0,
              maxArgs: 0
            }
          });
          listener(wrappedReq);
        };
      });
      const onMessageWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }
        /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */


        return function onMessage(message, sender, sendResponse) {
          let didCallSendResponse = false;
          let wrappedSendResponse;
          let sendResponsePromise = new Promise(resolve => {
            wrappedSendResponse = function (response) {
              didCallSendResponse = true;
              resolve(response);
            };
          });
          let result;

          try {
            result = listener(message, sender, wrappedSendResponse);
          } catch (err) {
            result = Promise.reject(err);
          }

          const isResultThenable = result !== true && isThenable(result); // If the listener didn't returned true or a Promise, or called
          // wrappedSendResponse synchronously, we can exit earlier
          // because there will be no response sent from this listener.

          if (result !== true && !isResultThenable && !didCallSendResponse) {
            return false;
          } // A small helper to send the message if the promise resolves
          // and an error if the promise rejects (a wrapped sendMessage has
          // to translate the message into a resolved promise or a rejected
          // promise).


          const sendPromisedResult = promise => {
            promise.then(msg => {
              // send the message value.
              sendResponse(msg);
            }, error => {
              // Send a JSON representation of the error if the rejected value
              // is an instance of error, or the object itself otherwise.
              let message;

              if (error && (error instanceof Error || typeof error.message === "string")) {
                message = error.message;
              } else {
                message = "An unexpected error occurred";
              }

              sendResponse({
                __mozWebExtensionPolyfillReject__: true,
                message
              });
            }).catch(err => {
              // Print an error on the console if unable to send the response.
              console.error("Failed to send onMessage rejected reply", err);
            });
          }; // If the listener returned a Promise, send the resolved value as a
          // result, otherwise wait the promise related to the wrappedSendResponse
          // callback to resolve and send it as a response.


          if (isResultThenable) {
            sendPromisedResult(result);
          } else {
            sendPromisedResult(sendResponsePromise);
          } // Let Chrome know that the listener is replying.


          return true;
        };
      });

      const wrappedSendMessageCallback = ({
        reject,
        resolve
      }, reply) => {
        if (extensionAPIs.runtime.lastError) {
          // Detect when none of the listeners replied to the sendMessage call and resolve
          // the promise to undefined as in Firefox.
          // See https://github.com/mozilla/webextension-polyfill/issues/130
          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
            resolve();
          } else {
            reject(new Error(extensionAPIs.runtime.lastError.message));
          }
        } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
          // Convert back the JSON representation of the error into
          // an Error instance.
          reject(new Error(reply.message));
        } else {
          resolve(reply);
        }
      };

      const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
        if (args.length < metadata.minArgs) {
          throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
        }

        if (args.length > metadata.maxArgs) {
          throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
        }

        return new Promise((resolve, reject) => {
          const wrappedCb = wrappedSendMessageCallback.bind(null, {
            resolve,
            reject
          });
          args.push(wrappedCb);
          apiNamespaceObj.sendMessage(...args);
        });
      };

      const staticWrappers = {
        devtools: {
          network: {
            onRequestFinished: wrapEvent(onRequestFinishedWrappers)
          }
        },
        runtime: {
          onMessage: wrapEvent(onMessageWrappers),
          onMessageExternal: wrapEvent(onMessageWrappers),
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 1,
            maxArgs: 3
          })
        },
        tabs: {
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 2,
            maxArgs: 3
          })
        }
      };
      const settingMetadata = {
        clear: {
          minArgs: 1,
          maxArgs: 1
        },
        get: {
          minArgs: 1,
          maxArgs: 1
        },
        set: {
          minArgs: 1,
          maxArgs: 1
        }
      };
      apiMetadata.privacy = {
        network: {
          "*": settingMetadata
        },
        services: {
          "*": settingMetadata
        },
        websites: {
          "*": settingMetadata
        }
      };
      return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
    }; // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.


    module.exports = wrapAPIs(chrome);
  } else {
    module.exports = globalThis.browser;
  }
});
//# sourceMappingURL=browser-polyfill.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/background.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFWTs7QUFFWjtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixtQkFBbUI7QUFDdkM7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQjtBQUNuQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxlQUFlO0FBQzFCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoT2E7O0FBRWIsOENBQTZDO0FBQzdDO0FBQ0EsQ0FBQyxFQUFDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxrQ0FBa0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCOzs7Ozs7Ozs7Ozs7QUM5SGE7QUFDYjtBQUNBLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZ0RBQWdELG1CQUFPLENBQUMsNEZBQXVCO0FBQy9FLDZCQUE2QixtQkFBTyxDQUFDLDJFQUFvQjtBQUN6RCxlQUFlLG1CQUFPLENBQUMsNkJBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxtQ0FBbUM7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdGQUFnRiw0QkFBNEI7QUFDNUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxZQUFZO0FBQzlDO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EscUJBQXFCO0FBQ3JCLGdGQUFnRiw0QkFBNEI7QUFDNUcscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsbUdBQW1HO0FBQ2xLO0FBQ0E7QUFDQSxzQ0FBc0MsdUdBQXVHO0FBQzdJLHNDQUFzQywyR0FBMkc7QUFDako7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFLEVBQUUsWUFBWTtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEVBQThFO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxNQUFNO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0UsRUFBRSxZQUFZO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsTUFBTTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFLEVBQUUsWUFBWTtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFLEVBQUUsWUFBWTtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsc0RBQXNEO0FBQzdGO0FBQ0E7QUFDQSw0Q0FBNEMsc0RBQXNEO0FBQ2xHLHdCQUF3QjtBQUN4QjtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMseURBQXlEO0FBQ2hHLHVDQUF1QywwREFBMEQsSUFBSSxHQUFHO0FBQ3hHO0FBQ0Esd0NBQXdDLFFBQVE7QUFDaEQsK0NBQStDLDREQUE0RDtBQUMzRztBQUNBLDJDQUEyQyw4REFBOEQ7QUFDekcsMkNBQTJDLHVEQUF1RDtBQUNsRyxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLHVDQUF1Qyx1R0FBdUc7QUFDOUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsK0JBQStCO0FBQy9CLGlCQUFpQjtBQUNqQjtBQUNBLHVDQUF1Qyx5REFBeUQ7QUFDaEc7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHVHQUF1RztBQUNsSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQywyR0FBMkc7QUFDdEo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsaUhBQWlIO0FBQ3hLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGNBQWM7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsdURBQXVELHVEQUF1RDtBQUM5RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLDJHQUEyRztBQUNsSixpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLDhDQUE4QyxPQUFPO0FBQ3JEO0FBQ0EsZ0NBQWdDLDJEQUEyRDtBQUMzRixTQUFTO0FBQ1Q7QUFDQTtBQUNBLGdDQUFnQywwREFBMEQ7QUFDMUYsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5Z0VhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDRCQUE0QixHQUFHLGtCQUFrQjtBQUNqRCxzQkFBc0IsbUJBQU8sQ0FBQyx1RUFBYTtBQUMzQztBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsd0RBQXdEO0FBQzNGLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxxQkFBcUIsK0dBQStHO0FBQ3BJLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxlQUFlO0FBQ3ZEO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0EsNEJBQTRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDUzs7QUFFckM7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsdUJBQXVCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0Isb0NBQW9DLCtCQUErQjtBQUN6RixHQUFHLElBQUk7QUFDUDtBQUNBO0FBQ0EscUVBQXFFLGFBQWE7QUFDbEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0VBQXdFLGVBQWU7QUFDdkY7QUFDQTs7QUFFQTs7QUFFQSxvQkFBb0IsVUFBVTtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlDQUF5QyxtREFBSztBQUM5QztBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7QUFDQSwwQkFBMEI7QUFDMUIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBLFNBQVM7QUFDVDtBQUNBLFVBQVUsSUFBSTtBQUNkO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCx5Q0FBeUM7QUFDekM7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCx5Q0FBeUM7QUFDekM7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCx5Q0FBeUM7QUFDekM7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDRCQUE0Qjs7QUFFN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRWdFO0FBQ2pFOzs7Ozs7Ozs7OztBQ2hnQ0E7QUFDQSxNQUFNLElBQTBDO0FBQ2hELElBQUksaUNBQWdDLENBQUMsTUFBUSxDQUFDLG9DQUFFLE9BQU87QUFBQTtBQUFBO0FBQUEsa0dBQUM7QUFDeEQsSUFBSSxLQUFLLFlBUU47QUFDSCxDQUFDO0FBQ0Q7O0FBRUEsc0NBQXNDOztBQUV0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3SEFBd0g7QUFDeEg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixVQUFVO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixHQUFHO0FBQ3BCLG1CQUFtQixTQUFTO0FBQzVCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBLGlCQUFpQixVQUFVO0FBQzNCO0FBQ0EsaUJBQWlCLFVBQVU7QUFDM0I7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QjtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QjtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxrQkFBa0IsRUFBRSxzQ0FBc0MsTUFBTSxLQUFLLFVBQVUsWUFBWTtBQUM1STs7QUFFQTtBQUNBLGdEQUFnRCxrQkFBa0IsRUFBRSxzQ0FBc0MsTUFBTSxLQUFLLFVBQVUsWUFBWTtBQUMzSTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsZ0JBQWdCO0FBQ2hCLGdDQUFnQyxNQUFNO0FBQ3RDLHVDQUF1QztBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQSxpQkFBaUIsVUFBVTtBQUMzQjtBQUNBO0FBQ0EsaUJBQWlCLFVBQVU7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUSxjQUFjO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxnQkFBZ0I7QUFDN0U7QUFDQSxpQkFBaUIsUUFBUSxjQUFjO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxtQkFBbUI7QUFDbkI7O0FBRUEsK0NBQStDLGVBQWU7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG9DQUFvQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUEsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsUUFBUTtBQUMzQjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsR0FBRztBQUN0QjtBQUNBLG1CQUFtQixRQUFRO0FBQzNCO0FBQ0EsbUJBQW1CLGFBQWE7QUFDaEM7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBLDBFQUEwRTtBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYixhQUFhO0FBQ2I7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLFlBQVk7OztBQUdaO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQ0FBK0Msa0JBQWtCLEVBQUUsc0NBQXNDLE1BQU0sS0FBSyxVQUFVLFlBQVk7QUFDMUk7O0FBRUE7QUFDQSw4Q0FBOEMsa0JBQWtCLEVBQUUsc0NBQXNDLE1BQU0sS0FBSyxVQUFVLFlBQVk7QUFDekk7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7O0FBR0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7OztVQ3B2Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL25vZGVfbW9kdWxlcy9jb250ZW50LXR5cGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvZXZlbnRzb3VyY2UtcGFyc2VyL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvYmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy91dGlsLnRzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3Vuc3BsYXNoLWpzL2Rpc3QvdW5zcGxhc2gtanMuZXNtLmpzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9kaXN0L2Jyb3dzZXItcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBjb250ZW50LXR5cGVcbiAqIENvcHlyaWdodChjKSAyMDE1IERvdWdsYXMgQ2hyaXN0b3BoZXIgV2lsc29uXG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4ndXNlIHN0cmljdCdcblxuLyoqXG4gKiBSZWdFeHAgdG8gbWF0Y2ggKiggXCI7XCIgcGFyYW1ldGVyICkgaW4gUkZDIDcyMzEgc2VjIDMuMS4xLjFcbiAqXG4gKiBwYXJhbWV0ZXIgICAgID0gdG9rZW4gXCI9XCIgKCB0b2tlbiAvIHF1b3RlZC1zdHJpbmcgKVxuICogdG9rZW4gICAgICAgICA9IDEqdGNoYXJcbiAqIHRjaGFyICAgICAgICAgPSBcIiFcIiAvIFwiI1wiIC8gXCIkXCIgLyBcIiVcIiAvIFwiJlwiIC8gXCInXCIgLyBcIipcIlxuICogICAgICAgICAgICAgICAvIFwiK1wiIC8gXCItXCIgLyBcIi5cIiAvIFwiXlwiIC8gXCJfXCIgLyBcImBcIiAvIFwifFwiIC8gXCJ+XCJcbiAqICAgICAgICAgICAgICAgLyBESUdJVCAvIEFMUEhBXG4gKiAgICAgICAgICAgICAgIDsgYW55IFZDSEFSLCBleGNlcHQgZGVsaW1pdGVyc1xuICogcXVvdGVkLXN0cmluZyA9IERRVU9URSAqKCBxZHRleHQgLyBxdW90ZWQtcGFpciApIERRVU9URVxuICogcWR0ZXh0ICAgICAgICA9IEhUQUIgLyBTUCAvICV4MjEgLyAleDIzLTVCIC8gJXg1RC03RSAvIG9icy10ZXh0XG4gKiBvYnMtdGV4dCAgICAgID0gJXg4MC1GRlxuICogcXVvdGVkLXBhaXIgICA9IFwiXFxcIiAoIEhUQUIgLyBTUCAvIFZDSEFSIC8gb2JzLXRleHQgKVxuICovXG52YXIgUEFSQU1fUkVHRVhQID0gLzsgKihbISMkJSYnKisuXl9gfH4wLTlBLVphLXotXSspICo9ICooXCIoPzpbXFx1MDAwYlxcdTAwMjBcXHUwMDIxXFx1MDAyMy1cXHUwMDViXFx1MDA1ZC1cXHUwMDdlXFx1MDA4MC1cXHUwMGZmXXxcXFxcW1xcdTAwMGJcXHUwMDIwLVxcdTAwZmZdKSpcInxbISMkJSYnKisuXl9gfH4wLTlBLVphLXotXSspICovZyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnRyb2wtcmVnZXhcbnZhciBURVhUX1JFR0VYUCA9IC9eW1xcdTAwMGJcXHUwMDIwLVxcdTAwN2VcXHUwMDgwLVxcdTAwZmZdKyQvIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29udHJvbC1yZWdleFxudmFyIFRPS0VOX1JFR0VYUCA9IC9eWyEjJCUmJyorLl5fYHx+MC05QS1aYS16LV0rJC9cblxuLyoqXG4gKiBSZWdFeHAgdG8gbWF0Y2ggcXVvdGVkLXBhaXIgaW4gUkZDIDcyMzAgc2VjIDMuMi42XG4gKlxuICogcXVvdGVkLXBhaXIgPSBcIlxcXCIgKCBIVEFCIC8gU1AgLyBWQ0hBUiAvIG9icy10ZXh0IClcbiAqIG9icy10ZXh0ICAgID0gJXg4MC1GRlxuICovXG52YXIgUUVTQ19SRUdFWFAgPSAvXFxcXChbXFx1MDAwYlxcdTAwMjAtXFx1MDBmZl0pL2cgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb250cm9sLXJlZ2V4XG5cbi8qKlxuICogUmVnRXhwIHRvIG1hdGNoIGNoYXJzIHRoYXQgbXVzdCBiZSBxdW90ZWQtcGFpciBpbiBSRkMgNzIzMCBzZWMgMy4yLjZcbiAqL1xudmFyIFFVT1RFX1JFR0VYUCA9IC8oW1xcXFxcIl0pL2dcblxuLyoqXG4gKiBSZWdFeHAgdG8gbWF0Y2ggdHlwZSBpbiBSRkMgNzIzMSBzZWMgMy4xLjEuMVxuICpcbiAqIG1lZGlhLXR5cGUgPSB0eXBlIFwiL1wiIHN1YnR5cGVcbiAqIHR5cGUgICAgICAgPSB0b2tlblxuICogc3VidHlwZSAgICA9IHRva2VuXG4gKi9cbnZhciBUWVBFX1JFR0VYUCA9IC9eWyEjJCUmJyorLl5fYHx+MC05QS1aYS16LV0rXFwvWyEjJCUmJyorLl5fYHx+MC05QS1aYS16LV0rJC9cblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqIEBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmZvcm1hdCA9IGZvcm1hdFxuZXhwb3J0cy5wYXJzZSA9IHBhcnNlXG5cbi8qKlxuICogRm9ybWF0IG9iamVjdCB0byBtZWRpYSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqIEBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXQgKG9iaikge1xuICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IG9iaiBpcyByZXF1aXJlZCcpXG4gIH1cblxuICB2YXIgcGFyYW1ldGVycyA9IG9iai5wYXJhbWV0ZXJzXG4gIHZhciB0eXBlID0gb2JqLnR5cGVcblxuICBpZiAoIXR5cGUgfHwgIVRZUEVfUkVHRVhQLnRlc3QodHlwZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnZhbGlkIHR5cGUnKVxuICB9XG5cbiAgdmFyIHN0cmluZyA9IHR5cGVcblxuICAvLyBhcHBlbmQgcGFyYW1ldGVyc1xuICBpZiAocGFyYW1ldGVycyAmJiB0eXBlb2YgcGFyYW1ldGVycyA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgcGFyYW1cbiAgICB2YXIgcGFyYW1zID0gT2JqZWN0LmtleXMocGFyYW1ldGVycykuc29ydCgpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcmFtcy5sZW5ndGg7IGkrKykge1xuICAgICAgcGFyYW0gPSBwYXJhbXNbaV1cblxuICAgICAgaWYgKCFUT0tFTl9SRUdFWFAudGVzdChwYXJhbSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW52YWxpZCBwYXJhbWV0ZXIgbmFtZScpXG4gICAgICB9XG5cbiAgICAgIHN0cmluZyArPSAnOyAnICsgcGFyYW0gKyAnPScgKyBxc3RyaW5nKHBhcmFtZXRlcnNbcGFyYW1dKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHJpbmdcbn1cblxuLyoqXG4gKiBQYXJzZSBtZWRpYSB0eXBlIHRvIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHN0cmluZ1xuICogQHJldHVybiB7T2JqZWN0fVxuICogQHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHBhcnNlIChzdHJpbmcpIHtcbiAgaWYgKCFzdHJpbmcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBzdHJpbmcgaXMgcmVxdWlyZWQnKVxuICB9XG5cbiAgLy8gc3VwcG9ydCByZXEvcmVzLWxpa2Ugb2JqZWN0cyBhcyBhcmd1bWVudFxuICB2YXIgaGVhZGVyID0gdHlwZW9mIHN0cmluZyA9PT0gJ29iamVjdCdcbiAgICA/IGdldGNvbnRlbnR0eXBlKHN0cmluZylcbiAgICA6IHN0cmluZ1xuXG4gIGlmICh0eXBlb2YgaGVhZGVyICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IHN0cmluZyBpcyByZXF1aXJlZCB0byBiZSBhIHN0cmluZycpXG4gIH1cblxuICB2YXIgaW5kZXggPSBoZWFkZXIuaW5kZXhPZignOycpXG4gIHZhciB0eXBlID0gaW5kZXggIT09IC0xXG4gICAgPyBoZWFkZXIuc2xpY2UoMCwgaW5kZXgpLnRyaW0oKVxuICAgIDogaGVhZGVyLnRyaW0oKVxuXG4gIGlmICghVFlQRV9SRUdFWFAudGVzdCh0eXBlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgbWVkaWEgdHlwZScpXG4gIH1cblxuICB2YXIgb2JqID0gbmV3IENvbnRlbnRUeXBlKHR5cGUudG9Mb3dlckNhc2UoKSlcblxuICAvLyBwYXJzZSBwYXJhbWV0ZXJzXG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICB2YXIga2V5XG4gICAgdmFyIG1hdGNoXG4gICAgdmFyIHZhbHVlXG5cbiAgICBQQVJBTV9SRUdFWFAubGFzdEluZGV4ID0gaW5kZXhcblxuICAgIHdoaWxlICgobWF0Y2ggPSBQQVJBTV9SRUdFWFAuZXhlYyhoZWFkZXIpKSkge1xuICAgICAgaWYgKG1hdGNoLmluZGV4ICE9PSBpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnZhbGlkIHBhcmFtZXRlciBmb3JtYXQnKVxuICAgICAgfVxuXG4gICAgICBpbmRleCArPSBtYXRjaFswXS5sZW5ndGhcbiAgICAgIGtleSA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKClcbiAgICAgIHZhbHVlID0gbWF0Y2hbMl1cblxuICAgICAgaWYgKHZhbHVlLmNoYXJDb2RlQXQoMCkgPT09IDB4MjIgLyogXCIgKi8pIHtcbiAgICAgICAgLy8gcmVtb3ZlIHF1b3Rlc1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDEsIC0xKVxuXG4gICAgICAgIC8vIHJlbW92ZSBlc2NhcGVzXG4gICAgICAgIGlmICh2YWx1ZS5pbmRleE9mKCdcXFxcJykgIT09IC0xKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFFFU0NfUkVHRVhQLCAnJDEnKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9iai5wYXJhbWV0ZXJzW2tleV0gPSB2YWx1ZVxuICAgIH1cblxuICAgIGlmIChpbmRleCAhPT0gaGVhZGVyLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW52YWxpZCBwYXJhbWV0ZXIgZm9ybWF0JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqXG59XG5cbi8qKlxuICogR2V0IGNvbnRlbnQtdHlwZSBmcm9tIHJlcS9yZXMgb2JqZWN0cy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH1cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZ2V0Y29udGVudHR5cGUgKG9iaikge1xuICB2YXIgaGVhZGVyXG5cbiAgaWYgKHR5cGVvZiBvYmouZ2V0SGVhZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gcmVzLWxpa2VcbiAgICBoZWFkZXIgPSBvYmouZ2V0SGVhZGVyKCdjb250ZW50LXR5cGUnKVxuICB9IGVsc2UgaWYgKHR5cGVvZiBvYmouaGVhZGVycyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyByZXEtbGlrZVxuICAgIGhlYWRlciA9IG9iai5oZWFkZXJzICYmIG9iai5oZWFkZXJzWydjb250ZW50LXR5cGUnXVxuICB9XG5cbiAgaWYgKHR5cGVvZiBoZWFkZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY29udGVudC10eXBlIGhlYWRlciBpcyBtaXNzaW5nIGZyb20gb2JqZWN0JylcbiAgfVxuXG4gIHJldHVybiBoZWFkZXJcbn1cblxuLyoqXG4gKiBRdW90ZSBhIHN0cmluZyBpZiBuZWNlc3NhcnkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbFxuICogQHJldHVybiB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBxc3RyaW5nICh2YWwpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyh2YWwpXG5cbiAgLy8gbm8gbmVlZCB0byBxdW90ZSB0b2tlbnNcbiAgaWYgKFRPS0VOX1JFR0VYUC50ZXN0KHN0cikpIHtcbiAgICByZXR1cm4gc3RyXG4gIH1cblxuICBpZiAoc3RyLmxlbmd0aCA+IDAgJiYgIVRFWFRfUkVHRVhQLnRlc3Qoc3RyKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgcGFyYW1ldGVyIHZhbHVlJylcbiAgfVxuXG4gIHJldHVybiAnXCInICsgc3RyLnJlcGxhY2UoUVVPVEVfUkVHRVhQLCAnXFxcXCQxJykgKyAnXCInXG59XG5cbi8qKlxuICogQ2xhc3MgdG8gcmVwcmVzZW50IGEgY29udGVudCB0eXBlLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gQ29udGVudFR5cGUgKHR5cGUpIHtcbiAgdGhpcy5wYXJhbWV0ZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICB0aGlzLnR5cGUgPSB0eXBlXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZnVuY3Rpb24gY3JlYXRlUGFyc2VyKG9uUGFyc2UpIHtcbiAgbGV0IGlzRmlyc3RDaHVuaztcbiAgbGV0IGJ1ZmZlcjtcbiAgbGV0IHN0YXJ0aW5nUG9zaXRpb247XG4gIGxldCBzdGFydGluZ0ZpZWxkTGVuZ3RoO1xuICBsZXQgZXZlbnRJZDtcbiAgbGV0IGV2ZW50TmFtZTtcbiAgbGV0IGRhdGE7XG4gIHJlc2V0KCk7XG4gIHJldHVybiB7XG4gICAgZmVlZCxcbiAgICByZXNldFxuICB9O1xuICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBpc0ZpcnN0Q2h1bmsgPSB0cnVlO1xuICAgIGJ1ZmZlciA9IFwiXCI7XG4gICAgc3RhcnRpbmdQb3NpdGlvbiA9IDA7XG4gICAgc3RhcnRpbmdGaWVsZExlbmd0aCA9IC0xO1xuICAgIGV2ZW50SWQgPSB2b2lkIDA7XG4gICAgZXZlbnROYW1lID0gdm9pZCAwO1xuICAgIGRhdGEgPSBcIlwiO1xuICB9XG4gIGZ1bmN0aW9uIGZlZWQoY2h1bmspIHtcbiAgICBidWZmZXIgPSBidWZmZXIgPyBidWZmZXIgKyBjaHVuayA6IGNodW5rO1xuICAgIGlmIChpc0ZpcnN0Q2h1bmsgJiYgaGFzQm9tKGJ1ZmZlcikpIHtcbiAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5zbGljZShCT00ubGVuZ3RoKTtcbiAgICB9XG4gICAgaXNGaXJzdENodW5rID0gZmFsc2U7XG4gICAgY29uc3QgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aDtcbiAgICBsZXQgcG9zaXRpb24gPSAwO1xuICAgIGxldCBkaXNjYXJkVHJhaWxpbmdOZXdsaW5lID0gZmFsc2U7XG4gICAgd2hpbGUgKHBvc2l0aW9uIDwgbGVuZ3RoKSB7XG4gICAgICBpZiAoZGlzY2FyZFRyYWlsaW5nTmV3bGluZSkge1xuICAgICAgICBpZiAoYnVmZmVyW3Bvc2l0aW9uXSA9PT0gXCJcXG5cIikge1xuICAgICAgICAgICsrcG9zaXRpb247XG4gICAgICAgIH1cbiAgICAgICAgZGlzY2FyZFRyYWlsaW5nTmV3bGluZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgbGV0IGxpbmVMZW5ndGggPSAtMTtcbiAgICAgIGxldCBmaWVsZExlbmd0aCA9IHN0YXJ0aW5nRmllbGRMZW5ndGg7XG4gICAgICBsZXQgY2hhcmFjdGVyO1xuICAgICAgZm9yIChsZXQgaW5kZXggPSBzdGFydGluZ1Bvc2l0aW9uOyBsaW5lTGVuZ3RoIDwgMCAmJiBpbmRleCA8IGxlbmd0aDsgKytpbmRleCkge1xuICAgICAgICBjaGFyYWN0ZXIgPSBidWZmZXJbaW5kZXhdO1xuICAgICAgICBpZiAoY2hhcmFjdGVyID09PSBcIjpcIiAmJiBmaWVsZExlbmd0aCA8IDApIHtcbiAgICAgICAgICBmaWVsZExlbmd0aCA9IGluZGV4IC0gcG9zaXRpb247XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyID09PSBcIlxcclwiKSB7XG4gICAgICAgICAgZGlzY2FyZFRyYWlsaW5nTmV3bGluZSA9IHRydWU7XG4gICAgICAgICAgbGluZUxlbmd0aCA9IGluZGV4IC0gcG9zaXRpb247XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyID09PSBcIlxcblwiKSB7XG4gICAgICAgICAgbGluZUxlbmd0aCA9IGluZGV4IC0gcG9zaXRpb247XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChsaW5lTGVuZ3RoIDwgMCkge1xuICAgICAgICBzdGFydGluZ1Bvc2l0aW9uID0gbGVuZ3RoIC0gcG9zaXRpb247XG4gICAgICAgIHN0YXJ0aW5nRmllbGRMZW5ndGggPSBmaWVsZExlbmd0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGFydGluZ1Bvc2l0aW9uID0gMDtcbiAgICAgICAgc3RhcnRpbmdGaWVsZExlbmd0aCA9IC0xO1xuICAgICAgfVxuICAgICAgcGFyc2VFdmVudFN0cmVhbUxpbmUoYnVmZmVyLCBwb3NpdGlvbiwgZmllbGRMZW5ndGgsIGxpbmVMZW5ndGgpO1xuICAgICAgcG9zaXRpb24gKz0gbGluZUxlbmd0aCArIDE7XG4gICAgfVxuICAgIGlmIChwb3NpdGlvbiA9PT0gbGVuZ3RoKSB7XG4gICAgICBidWZmZXIgPSBcIlwiO1xuICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPiAwKSB7XG4gICAgICBidWZmZXIgPSBidWZmZXIuc2xpY2UocG9zaXRpb24pO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBwYXJzZUV2ZW50U3RyZWFtTGluZShsaW5lQnVmZmVyLCBpbmRleCwgZmllbGRMZW5ndGgsIGxpbmVMZW5ndGgpIHtcbiAgICBpZiAobGluZUxlbmd0aCA9PT0gMCkge1xuICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICBvblBhcnNlKHtcbiAgICAgICAgICB0eXBlOiBcImV2ZW50XCIsXG4gICAgICAgICAgaWQ6IGV2ZW50SWQsXG4gICAgICAgICAgZXZlbnQ6IGV2ZW50TmFtZSB8fCB2b2lkIDAsXG4gICAgICAgICAgZGF0YTogZGF0YS5zbGljZSgwLCAtMSlcbiAgICAgICAgICAvLyByZW1vdmUgdHJhaWxpbmcgbmV3bGluZVxuICAgICAgICB9KTtcblxuICAgICAgICBkYXRhID0gXCJcIjtcbiAgICAgICAgZXZlbnRJZCA9IHZvaWQgMDtcbiAgICAgIH1cbiAgICAgIGV2ZW50TmFtZSA9IHZvaWQgMDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgbm9WYWx1ZSA9IGZpZWxkTGVuZ3RoIDwgMDtcbiAgICBjb25zdCBmaWVsZCA9IGxpbmVCdWZmZXIuc2xpY2UoaW5kZXgsIGluZGV4ICsgKG5vVmFsdWUgPyBsaW5lTGVuZ3RoIDogZmllbGRMZW5ndGgpKTtcbiAgICBsZXQgc3RlcCA9IDA7XG4gICAgaWYgKG5vVmFsdWUpIHtcbiAgICAgIHN0ZXAgPSBsaW5lTGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAobGluZUJ1ZmZlcltpbmRleCArIGZpZWxkTGVuZ3RoICsgMV0gPT09IFwiIFwiKSB7XG4gICAgICBzdGVwID0gZmllbGRMZW5ndGggKyAyO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGVwID0gZmllbGRMZW5ndGggKyAxO1xuICAgIH1cbiAgICBjb25zdCBwb3NpdGlvbiA9IGluZGV4ICsgc3RlcDtcbiAgICBjb25zdCB2YWx1ZUxlbmd0aCA9IGxpbmVMZW5ndGggLSBzdGVwO1xuICAgIGNvbnN0IHZhbHVlID0gbGluZUJ1ZmZlci5zbGljZShwb3NpdGlvbiwgcG9zaXRpb24gKyB2YWx1ZUxlbmd0aCkudG9TdHJpbmcoKTtcbiAgICBpZiAoZmllbGQgPT09IFwiZGF0YVwiKSB7XG4gICAgICBkYXRhICs9IHZhbHVlID8gXCJcIi5jb25jYXQodmFsdWUsIFwiXFxuXCIpIDogXCJcXG5cIjtcbiAgICB9IGVsc2UgaWYgKGZpZWxkID09PSBcImV2ZW50XCIpIHtcbiAgICAgIGV2ZW50TmFtZSA9IHZhbHVlO1xuICAgIH0gZWxzZSBpZiAoZmllbGQgPT09IFwiaWRcIiAmJiAhdmFsdWUuaW5jbHVkZXMoXCJcXDBcIikpIHtcbiAgICAgIGV2ZW50SWQgPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKGZpZWxkID09PSBcInJldHJ5XCIpIHtcbiAgICAgIGNvbnN0IHJldHJ5ID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgIGlmICghTnVtYmVyLmlzTmFOKHJldHJ5KSkge1xuICAgICAgICBvblBhcnNlKHtcbiAgICAgICAgICB0eXBlOiBcInJlY29ubmVjdC1pbnRlcnZhbFwiLFxuICAgICAgICAgIHZhbHVlOiByZXRyeVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbmNvbnN0IEJPTSA9IFsyMzksIDE4NywgMTkxXTtcbmZ1bmN0aW9uIGhhc0JvbShidWZmZXIpIHtcbiAgcmV0dXJuIEJPTS5ldmVyeSgoY2hhckNvZGUsIGluZGV4KSA9PiBidWZmZXIuY2hhckNvZGVBdChpbmRleCkgPT09IGNoYXJDb2RlKTtcbn1cbmV4cG9ydHMuY3JlYXRlUGFyc2VyID0gY3JlYXRlUGFyc2VyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCBldmVudHNvdXJjZV9wYXJzZXJfMSA9IHJlcXVpcmUoXCJldmVudHNvdXJjZS1wYXJzZXJcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuLy8gW+aaguaXtuW6n+W8g11jb250ZW50IHNjcmlwdCDlhbPpl63nqpflj6Pml7bvvIzlsIbmraTlgLzorr7kuLogZmFsc2Ug5Lul5Lit5pat5pWw5o2u5riy5p+TXG5sZXQgaXNDb250aW51ZSA9IHRydWU7XG5jb25zb2xlLmxvZygnSSBhbSBiYWNrZ3JvdW5kJyk7XG53ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKFwi5o+S5Lu25bey6KKr5a6J6KOFXCIpO1xufSk7XG4vLyDljbjovb3mj5Lku7blkI7lvJXlr7zloavlhpnljbjovb3ljp/lm6DvvIzluK7liqnkuqflk4HkvJjljJZcbndlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZXRVbmluc3RhbGxVUkwoXCJodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9mb3Jtcy9kL2UvMUZBSXBRTFNkb2JHUU4zTzBDazRmVnJnZnZSWk1tZTNkZS0yT2FFcDFwRnRpYlprVTBrb2MzN3cvdmlld2Zvcm0/dXNwPXNmX2xpbmtcIik7XG4vLyDliJvlu7rlj7PplK7oj5zljZVcbndlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuY29udGV4dE1lbnVzLmNyZWF0ZSh7XG4gICAgaWQ6IFwiMVwiLFxuICAgIHRpdGxlOiBcIlNjb3V0ZXJcIixcbiAgICBjb250ZXh0czogW1wic2VsZWN0aW9uXCJdLFxufSwgKCkgPT4ge1xuICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5sYXN0RXJyb3I7XG59KTtcbi8vIOWPs+mUruiPnOWNleeCueWHu+S6i+S7tlxud2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5jb250ZXh0TWVudXMub25DbGlja2VkLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChpbmZvLCBfdGFiKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ+WPs+mUruiPnOWNleeCueWHu+S6i+S7ticpO1xuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSkudGhlbigodGFicykgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGFicyk7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuICAgICAgICAgICAgbGV0IHRJRCA9IChfYSA9IGFjdGl2ZVRhYi5pZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogLTE7XG4gICAgICAgICAgICBpZiAoYWN0aXZlVGFiICYmIGFjdGl2ZVRhYi5pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGIgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnRhYnMuc2VuZE1lc3NhZ2UodElELCB7IHR5cGU6ICdvcGVuLXNvdXRlcicsIGluZm8sIH0pO1xuICAgICAgICAgICAgICAgIC8vIOW3suefpeaDheWGte+8muWImuWuieijheaPkuS7tuaXtuebtOaOpeS9v+eUqOS8muaKpemUme+8iOWIt+aWsOmhtemdouWQjuS9v+eUqOWImeato+W4uO+8ie+8jOatpOaXtumcgOimgei9veWFpSBjb250ZW50X3NjcmlwdC5qcyDmiY3ooYxcbiAgICAgICAgICAgICAgICBiLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhdGNoJyk7XG4gICAgICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB7IHRhYklkOiB0SUQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzOiBbXCJqcy92ZW5kb3IuanNcIiwgXCJqcy9jb250ZW50X3NjcmlwdC5qc1wiXSxcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC50YWJzLnNlbmRNZXNzYWdlKHRJRCwgeyB0eXBlOiAnb3Blbi1zb3V0ZXInLCBpbmZvLCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4vLyDplb/ov57mjqXvvIzlpITnkIYgR1BUIOaVsOaNrlxud2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLm9uQ29ubmVjdC5hZGRMaXN0ZW5lcihwb3J0ID0+IHtcbiAgICAvLyDmlLbliLAgY29udGVudCBzY3JpcHQg5raI5oGvXG4gICAgY29uc29sZS5sb2coJ+i/nuaOpeS4rS0tLS0tLS0tLS0tLScpO1xuICAgIC8vIOaOpeaUtiBjb250ZW50IHNjcmlwdCDnmoTmtojmga9cbiAgICBwb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobXNnKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ+aOpeaUtua2iOaBr++8micsIG1zZyk7XG4gICAgICAgIC8vIHJldHVyblxuICAgICAgICAvLyDor7fmsYIgIEdQVCDmlbDmja5cbiAgICAgICAgaWYgKG1zZy50eXBlID09PSAnZ2V0R1BUTXNnJykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldEdQVE1zZycpO1xuICAgICAgICAgICAgLy8gaXNDb250aW51ZSA9IHRydWUg5pe25omN5Lya5riy5p+T5pWw5o2uXG4gICAgICAgICAgICBpc0NvbnRpbnVlID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIOiOt+WPluWtmOWCqOeahCBBUEkgS2V5ICBcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7ICdvcGVuQXBpS2V5JzogJycsICd1bnNwbGFzaEFwaUtleSc6ICcnLCAnY3VycmVudExhbmd1YWdlJzogJ0VuZ2xpc2gnLCAndGFyZ2V0TGFuZ3VhZ2UnOiAnU3BhbmlzaCcgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2VzID0gbXNnLm1lc3NhZ2VzO1xuICAgICAgICAgICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT0g5LiL6Z2i55qE5Luj56CB55So5LqO6LCD6K+V5L2/55So77yM5q2j5byP546v5aKD6ZyA6KaB5rOo6YeK5o6JXG4gICAgICAgICAgICAgICAgLy8gcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ3NlbmRHUFREYXRhJywgJ3N0YXR1cyc6ICdlcnJvJywgJ2NvbnRlbnQnOiAn8J+lsiBBUEkgS2V5IGVycm9yLiBQbGVhc2UgbW9kaWZ5IGFuZCB0cnkgYWdhaW4uLicgfSlcbiAgICAgICAgICAgICAgICAvLyBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnc2VuZEdQVERhdGEnLCAnc3RhdHVzJzogJ2Vycm8nLCAnY29udGVudCc6ICfwn6WyIEVuY291bnRlcmVkIHNvbWUgaXNzdWVzLCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyLicgfSlcbiAgICAgICAgICAgICAgICAvLyDojrflj5blm77niYdcbiAgICAgICAgICAgICAgICBpZiAobXNnLmtleVdvcmQgJiYgbXNnLmtleVdvcmQubGVuZ3RoIDw9IDIwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZ3MgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIlpTNjdpMUhMbGxvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0wNi0xOVQyMzo0MTo1M1pcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIzLTA0LTIxVDIzOjUwOjQwWlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvbW90ZWRfYXRcIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IDk1MDQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogNjMzNixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzI2MjYyNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmx1cl9oYXNoXCI6IFwiTDg3d35JNHBJVV9Lc0ROTXNZV2xJVnh1b0pOWlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJKYXZhc2NyaXB0IHByb2dyYW0gaW4gYSB2c2NvZGUgY29kZSBlZGl0b3Igd2l0aCBEcmFjdWxhIHRoZW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbHRfZGVzY3JpcHRpb25cIjogXCJibGFjayBmbGF0IHNjcmVlbiBjb21wdXRlciBtb25pdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cmxzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyYXdcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU5MjYwOTkzMTA5NS01NGEyMTY4YWU4OTM/aXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHd4Zkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNeiZpeGxpYj1yYi00LjAuM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZ1bGxcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU5MjYwOTkzMTA5NS01NGEyMTY4YWU4OTM/Y3JvcD1lbnRyb3B5JmNzPXNyZ2ImZm09anBnJml4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3eGZIeG1kVzVqZEdsdmJuTjhaVzU4TUh4OGZId3hOamd5TVRjNU9UTXomaXhsaWI9cmItNC4wLjMmcT04NVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlZ3VsYXJcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU5MjYwOTkzMTA5NS01NGEyMTY4YWU4OTM/Y3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJmZpdD1tYXgmZm09anBnJml4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3eGZIeG1kVzVqZEdsdmJuTjhaVzU4TUh4OGZId3hOamd5TVRjNU9UTXomaXhsaWI9cmItNC4wLjMmcT04MCZ3PTEwODBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbFwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTkyNjA5OTMxMDk1LTU0YTIxNjhhZTg5Mz9jcm9wPWVudHJvcHkmY3M9dGlueXNyZ2ImZml0PW1heCZmbT1qcGcmaXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHd4Zkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNeiZpeGxpYj1yYi00LjAuMyZxPTgwJnc9NDAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGh1bWJcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU5MjYwOTkzMTA5NS01NGEyMTY4YWU4OTM/Y3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJmZpdD1tYXgmZm09anBnJml4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3eGZIeG1kVzVqZEdsdmJuTjhaVzU4TUh4OGZId3hOamd5TVRjNU9UTXomaXhsaWI9cmItNC4wLjMmcT04MCZ3PTIwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsX3MzXCI6IFwiaHR0cHM6Ly9zMy51cy13ZXN0LTIuYW1hem9uYXdzLmNvbS9pbWFnZXMudW5zcGxhc2guY29tL3NtYWxsL3Bob3RvLTE1OTI2MDk5MzEwOTUtNTRhMjE2OGFlODkzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlua3NcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGZcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL1pTNjdpMUhMbGxvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHRtbFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9aUzY3aTFITGxsb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRvd25sb2FkXCI6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL1pTNjdpMUhMbGxvL2Rvd25sb2FkP2l4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3eGZIeG1kVzVqZEdsdmJuTjhaVzU4TUh4OGZId3hOamd5TVRjNU9UTXpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZF9sb2NhdGlvblwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvWlM2N2kxSExsbG8vZG93bmxvYWQ/aXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHd4Zkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNelwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VzXCI6IDE2OCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VkX2J5X3VzZXJcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXJyZW50X3VzZXJfY29sbGVjdGlvbnNcIjogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcG9uc29yc2hpcFwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG9waWNfc3VibWlzc2lvbnNcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIklhaTJQLUlPMWtvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjMtMDQtMjJUMDA6MjY6MTJaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcm5hbWVcIjogXCJnYW1lbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiSm9hbiBHYW1lbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmaXJzdF9uYW1lXCI6IFwiSm9hblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhc3RfbmFtZVwiOiBcIkdhbWVsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR3aXR0ZXJfdXNlcm5hbWVcIjogXCJnYW1lbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9fdXJsXCI6IFwiaHR0cHM6Ly9nYW1lbGwuaW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiaW9cIjogXCJCYXJjZWxvbmEtYm9ybiBzb2Z0d2FyZSBlbmdpbmVlciBsaXZpbmcgaW4gc3VubnkgU0RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsb2NhdGlvblwiOiBcIlNhbiBEaWVnbywgQ0FcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaW5rc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGZcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZ2FtZWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0bWxcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9AZ2FtZWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBob3Rvc1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9nYW1lbGwvcGhvdG9zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VzXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2dhbWVsbC9saWtlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9cIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZ2FtZWxsL3BvcnRmb2xpb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb2xsb3dpbmdcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZ2FtZWxsL2ZvbGxvd2luZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb2xsb3dlcnNcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZ2FtZWxsL2ZvbGxvd2Vyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZV9pbWFnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTU5MDk3NDU5MTgzMC04OTJiMzc1ZTYzNzFpbWFnZT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9MzImaD0zMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZWRpdW1cIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTkwOTc0NTkxODMwLTg5MmIzNzVlNjM3MWltYWdlP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz02NCZoPTY0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhcmdlXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTU5MDk3NDU5MTgzMC04OTJiMzc1ZTYzNzFpbWFnZT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9MTI4Jmg9MTI4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YWdyYW1fdXNlcm5hbWVcIjogXCJqZ2FtZWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfY29sbGVjdGlvbnNcIjogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9saWtlc1wiOiA2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Bob3Rvc1wiOiA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjY2VwdGVkX3Rvc1wiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvcl9oaXJlXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic29jaWFsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5zdGFncmFtX3VzZXJuYW1lXCI6IFwiamdhbWVsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9fdXJsXCI6IFwiaHR0cHM6Ly9nYW1lbGwuaW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHdpdHRlcl91c2VybmFtZVwiOiBcImdhbWVsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXlwYWxfZW1haWxcIjogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhZ3NcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJ1c2FcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJjYVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcInNhbiBmcmFuY2lzY29cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiNTl5UllJSFd0ellcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTA5LTE2VDE0OjQ0OjA1WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjMtMDQtMjFUMTc6MTM6NTJaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9tb3RlZF9hdFwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogNTE4NCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiAzNDU2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMjYyNjI2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJibHVyX2hhc2hcIjogXCJMV0QwR3U4XlIqb354XU1fZjZ4YUQkJU5XQlJqXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWx0X2Rlc2NyaXB0aW9uXCI6IFwicGVyc29uIHVzaW5nIGJsYWNrIGxhcHRvcCBjb21wdXRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXJsc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmF3XCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MDAyNjcxNjU0NzctNmQ0Y2M3NDFiMzc5P2l4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3eWZIeG1kVzVqZEdsdmJuTjhaVzU4TUh4OGZId3hOamd5TVRjNU9UTXomaXhsaWI9cmItNC4wLjNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmdWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MDAyNjcxNjU0NzctNmQ0Y2M3NDFiMzc5P2Nyb3A9ZW50cm9weSZjcz1zcmdiJmZtPWpwZyZpeGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFId3lmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16Jml4bGliPXJiLTQuMC4zJnE9ODVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWd1bGFyXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MDAyNjcxNjU0NzctNmQ0Y2M3NDFiMzc5P2Nyb3A9ZW50cm9weSZjcz10aW55c3JnYiZmaXQ9bWF4JmZtPWpwZyZpeGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFId3lmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16Jml4bGliPXJiLTQuMC4zJnE9ODAmdz0xMDgwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYwMDI2NzE2NTQ3Ny02ZDRjYzc0MWIzNzk/Y3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJmZpdD1tYXgmZm09anBnJml4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3eWZIeG1kVzVqZEdsdmJuTjhaVzU4TUh4OGZId3hOamd5TVRjNU9UTXomaXhsaWI9cmItNC4wLjMmcT04MCZ3PTQwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRodW1iXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MDAyNjcxNjU0NzctNmQ0Y2M3NDFiMzc5P2Nyb3A9ZW50cm9weSZjcz10aW55c3JnYiZmaXQ9bWF4JmZtPWpwZyZpeGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFId3lmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16Jml4bGliPXJiLTQuMC4zJnE9ODAmdz0yMDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbF9zM1wiOiBcImh0dHBzOi8vczMudXMtd2VzdC0yLmFtYXpvbmF3cy5jb20vaW1hZ2VzLnVuc3BsYXNoLmNvbS9zbWFsbC9waG90by0xNjAwMjY3MTY1NDc3LTZkNGNjNzQxYjM3OVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpbmtzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxmXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy81OXlSWUlIV3R6WVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0bWxcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvNTl5UllJSFd0ellcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy81OXlSWUlIV3R6WS9kb3dubG9hZD9peGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFId3lmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRfbG9jYXRpb25cIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zLzU5eVJZSUhXdHpZL2Rvd25sb2FkP2l4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3eWZIeG1kVzVqZEdsdmJuTjhaVzU4TUh4OGZId3hOamd5TVRjNU9UTXpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlc1wiOiAxMDMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlZF9ieV91c2VyXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3VycmVudF91c2VyX2NvbGxlY3Rpb25zXCI6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvbnNvcnNoaXBcIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvcGljX3N1Ym1pc3Npb25zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJidXNpbmVzcy13b3JrXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RhdHVzXCI6IFwiYXBwcm92ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwcm92ZWRfb25cIjogXCIyMDIwLTExLTI3VDEzOjM4OjA1WlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGVjaG5vbG9neVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBcInJlamVjdGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImMyc0FBRTlCWHJZXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjMtMDQtMjFUMTc6MTI6NThaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcm5hbWVcIjogXCJzaWdtdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlNpZ211bmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmaXJzdF9uYW1lXCI6IFwiU2lnbXVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhc3RfbmFtZVwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR3aXR0ZXJfdXNlcm5hbWVcIjogXCJzaWdfX211bmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9fdXJsXCI6IFwiaHR0cHM6Ly9zaWdtdW5kLmNhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmlvXCI6IFwiU2lnbXVuZCByw6lhbGlzZSBkZXMgc29sdXRpb25zIG51bcOpcmlxdWVzIHF1aSBmb250IGxhIGRpZmbDqXJlbmNlLiBvbnZvdXNlY291dGVAc2lnbXVuZC5jYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxvY2F0aW9uXCI6IFwiUXVlYmVjLCBDYW5hZGFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaW5rc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGZcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvc2lnbXVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJodG1sXCI6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vQHNpZ211bmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGhvdG9zXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3NpZ211bmQvcGhvdG9zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VzXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3NpZ211bmQvbGlrZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3NpZ211bmQvcG9ydGZvbGlvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbGxvd2luZ1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9zaWdtdW5kL2ZvbGxvd2luZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb2xsb3dlcnNcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvc2lnbXVuZC9mb2xsb3dlcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVfaW1hZ2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbFwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1OTI1NzYxMDQ4MzktMzQ2MWVmY2Q1NjI0aW1hZ2U/aXhsaWI9cmItNC4wLjMmY3JvcD1mYWNlcyZmaXQ9Y3JvcCZ3PTMyJmg9MzJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVkaXVtXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTU5MjU3NjEwNDgzOS0zNDYxZWZjZDU2MjRpbWFnZT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9NjQmaD02NFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXJnZVwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1OTI1NzYxMDQ4MzktMzQ2MWVmY2Q1NjI0aW1hZ2U/aXhsaWI9cmItNC4wLjMmY3JvcD1mYWNlcyZmaXQ9Y3JvcCZ3PTEyOCZoPTEyOFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5zdGFncmFtX3VzZXJuYW1lXCI6IFwic2lnX19tdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfY29sbGVjdGlvbnNcIjogMjgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfbGlrZXNcIjogNzM5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Bob3Rvc1wiOiAxNjk3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjY2VwdGVkX3Rvc1wiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvcl9oaXJlXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNvY2lhbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluc3RhZ3JhbV91c2VybmFtZVwiOiBcInNpZ19fbXVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9fdXJsXCI6IFwiaHR0cHM6Ly9zaWdtdW5kLmNhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR3aXR0ZXJfdXNlcm5hbWVcIjogXCJzaWdfX211bmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGF5cGFsX2VtYWlsXCI6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWdzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibGFuZGluZ19wYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiZ3JleVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzb3VyY2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYW5jZXN0cnlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbHVnXCI6IFwid2FsbHBhcGVyc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV0dHlfc2x1Z1wiOiBcIkhEIFdhbGxwYXBlcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNhdGVnb3J5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2x1Z1wiOiBcImNvbG9yc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV0dHlfc2x1Z1wiOiBcIkNvbG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJjYXRlZ29yeVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNsdWdcIjogXCJncmV5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByZXR0eV9zbHVnXCI6IFwiR3JleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJIZCBncmV5IHdhbGxwYXBlcnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YnRpdGxlXCI6IFwiRG93bmxvYWQgZnJlZSBncmV5IHdhbGxwYXBlcnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiQ2hvb3NlIGZyb20gYSBjdXJhdGVkIHNlbGVjdGlvbiBvZiBncmV5IHdhbGxwYXBlcnMgZm9yIHlvdXIgbW9iaWxlIGFuZCBkZXNrdG9wIHNjcmVlbnMuIEFsd2F5cyBmcmVlIG9uIFVuc3BsYXNoLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YV90aXRsZVwiOiBcIkdyZXkgV2FsbHBhcGVyczogRnJlZSBIRCBEb3dubG9hZCBbNTAwKyBIUV0gfCBVbnNwbGFzaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YV9kZXNjcmlwdGlvblwiOiBcIkNob29zZSBmcm9tIGh1bmRyZWRzIG9mIGZyZWUgZ3JleSB3YWxscGFwZXJzLiBEb3dubG9hZCBIRCB3YWxscGFwZXJzIGZvciBmcmVlIG9uIFVuc3BsYXNoLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY292ZXJfcGhvdG9cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiY3RYZjFHVnlmOUFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAxOC0wOS0xMFQwODowNTo1NVpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMy0wNC0xN1QxODowNDo1MFpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9tb3RlZF9hdFwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IDUzMDQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IDc5NTIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYTZhNmE2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmx1cl9oYXNoXCI6IFwiTDNJWUZOSVUwMH5xLTtNe1IqdDgwS3RSSVVNe1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiT2xkIHN0b25lIGJhY2tncm91bmQgdGV4dHVyZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFsdF9kZXNjcmlwdGlvblwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVybHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyYXdcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUzNjU2NjQ4MjY4MC1mY2EzMTkzMGEwYmQ/aXhsaWI9cmItNC4wLjNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZnVsbFwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTM2NTY2NDgyNjgwLWZjYTMxOTMwYTBiZD9peGxpYj1yYi00LjAuMyZxPTg1JmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9c3JnYlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWd1bGFyXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MzY1NjY0ODI2ODAtZmNhMzE5MzBhMGJkP2l4bGliPXJiLTQuMC4zJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTEwODAmZml0PW1heFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbFwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTM2NTY2NDgyNjgwLWZjYTMxOTMwYTBiZD9peGxpYj1yYi00LjAuMyZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz00MDAmZml0PW1heFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aHVtYlwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTM2NTY2NDgyNjgwLWZjYTMxOTMwYTBiZD9peGxpYj1yYi00LjAuMyZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0yMDAmZml0PW1heFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbF9zM1wiOiBcImh0dHBzOi8vczMudXMtd2VzdC0yLmFtYXpvbmF3cy5jb20vaW1hZ2VzLnVuc3BsYXNoLmNvbS9zbWFsbC9waG90by0xNTM2NTY2NDgyNjgwLWZjYTMxOTMwYTBiZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlua3NcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxmXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9jdFhmMUdWeWY5QVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJodG1sXCI6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL2N0WGYxR1Z5ZjlBXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRvd25sb2FkXCI6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL2N0WGYxR1Z5ZjlBL2Rvd25sb2FkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRvd25sb2FkX2xvY2F0aW9uXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9jdFhmMUdWeWY5QS9kb3dubG9hZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZXNcIjogMTg3NyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlZF9ieV91c2VyXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImN1cnJlbnRfdXNlcl9jb2xsZWN0aW9uc1wiOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcG9uc29yc2hpcFwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvcGljX3N1Ym1pc3Npb25zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dHVyZXMtcGF0dGVybnNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RhdHVzXCI6IFwiYXBwcm92ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcHJvdmVkX29uXCI6IFwiMjAyMC0wNC0wNlQxNDoyMDoxMVpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByZW1pdW1cIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGx1c1wiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJJRmNFaEpxZW0wUVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMy0wNC0xOFQwMDoxODo0NlpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcm5hbWVcIjogXCJhbm5pZXNwcmF0dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiQW5uaWUgU3ByYXR0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZpcnN0X25hbWVcIjogXCJBbm5pZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXN0X25hbWVcIjogXCJTcHJhdHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHdpdHRlcl91c2VybmFtZVwiOiBcImFubmllc3ByYXR0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvcnRmb2xpb191cmxcIjogXCJodHRwczovL3d3dy5hbm5pZXNwcmF0dC5jb21cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmlvXCI6IFwiUGhvdG9ncmFwaGVyIGZyb20gRW5nbGFuZCwgc2hhcmluZyBteSBkaWdpdGFsLCBmaWxtICsgdmludGFnZSBzbGlkZSBzY2Fucy4gIFxcclxcblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsb2NhdGlvblwiOiBcIk5ldyBGb3Jlc3QgTmF0aW9uYWwgUGFyaywgVUtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlua3NcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZlwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9hbm5pZXNwcmF0dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHRtbFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL0Bhbm5pZXNwcmF0dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGhvdG9zXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2Fubmllc3ByYXR0L3Bob3Rvc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZXNcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvYW5uaWVzcHJhdHQvbGlrZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvcnRmb2xpb1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9hbm5pZXNwcmF0dC9wb3J0Zm9saW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbGxvd2luZ1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9hbm5pZXNwcmF0dC9mb2xsb3dpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbGxvd2Vyc1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9hbm5pZXNwcmF0dC9mb2xsb3dlcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZV9pbWFnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbFwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE2NDg4Mjg4MDYyMjMtMTg1MmY3MDRjNThhaW1hZ2U/aXhsaWI9cmItNC4wLjMmY3JvcD1mYWNlcyZmaXQ9Y3JvcCZ3PTMyJmg9MzJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1lZGl1bVwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE2NDg4Mjg4MDYyMjMtMTg1MmY3MDRjNThhaW1hZ2U/aXhsaWI9cmItNC4wLjMmY3JvcD1mYWNlcyZmaXQ9Y3JvcCZ3PTY0Jmg9NjRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhcmdlXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTY0ODgyODgwNjIyMy0xODUyZjcwNGM1OGFpbWFnZT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9MTI4Jmg9MTI4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluc3RhZ3JhbV91c2VybmFtZVwiOiBcImFubmllc3ByYXR0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX2NvbGxlY3Rpb25zXCI6IDE1MSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfbGlrZXNcIjogMTQ0NDUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Bob3Rvc1wiOiAxNzg0MyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNjZXB0ZWRfdG9zXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvcl9oaXJlXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzb2NpYWxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5zdGFncmFtX3VzZXJuYW1lXCI6IFwiYW5uaWVzcHJhdHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvcnRmb2xpb191cmxcIjogXCJodHRwczovL3d3dy5hbm5pZXNwcmF0dC5jb21cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR3aXR0ZXJfdXNlcm5hbWVcIjogXCJhbm5pZXNwcmF0dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGF5cGFsX2VtYWlsXCI6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibGFuZGluZ19wYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwicGNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic291cmNlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFuY2VzdHJ5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2x1Z1wiOiBcIndhbGxwYXBlcnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldHR5X3NsdWdcIjogXCJIRCBXYWxscGFwZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXRlZ29yeVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNsdWdcIjogXCJkZXNrdG9wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByZXR0eV9zbHVnXCI6IFwiRGVza3RvcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViY2F0ZWdvcnlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbHVnXCI6IFwicGNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldHR5X3NsdWdcIjogXCJQQ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJIZCBwYyB3YWxscGFwZXJzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJ0aXRsZVwiOiBcIkRvd25sb2FkIGZyZWUgcGMgd2FsbHBhcGVyc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJDaG9vc2UgZnJvbSBhIGN1cmF0ZWQgc2VsZWN0aW9uIG9mIFBDIHdhbGxwYXBlcnMgZm9yIHlvdXIgbW9iaWxlIGFuZCBkZXNrdG9wIHNjcmVlbnMuIEFsd2F5cyBmcmVlIG9uIFVuc3BsYXNoLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YV90aXRsZVwiOiBcIlBDIFdhbGxwYXBlcnM6IEZyZWUgSEQgRG93bmxvYWQgWzUwMCsgSFFdIHwgVW5zcGxhc2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGFfZGVzY3JpcHRpb25cIjogXCJDaG9vc2UgZnJvbSBodW5kcmVkcyBvZiBmcmVlIFBDIHdhbGxwYXBlcnMuIERvd25sb2FkIEhEIHdhbGxwYXBlcnMgZm9yIGZyZWUgb24gVW5zcGxhc2guXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb3Zlcl9waG90b1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJLelBlZkluSlc1OFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDE4LTA4LTAyVDE2OjQyOjQxWlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIzLTA0LTE3VDE4OjA0OjMzWlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb21vdGVkX2F0XCI6IFwiMjAxOC0wOC0wM1QxMzo1OTozOVpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiA1NDcyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiAzNjQ4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzBjZDlmM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJsdXJfaGFzaFwiOiBcIkxzSEV0VWs7QlVXWDB6YkpzLmtCaXdrQyRpYXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIldpdGhpbiB0aGUgd2FsbHMgb2YgdGhpcyBtdXNldW0gYXJlIGNvdW50bGVzcyBwZW9wbGUgd2hvIGxvdmUgdGhlIHBvd2VyIG9mIGltYWdpbmF0aW9uLiBUaGV5IGRyYXcsIHRoZXkgc2luZywgdGhleSBwYWludCwgdGhleSBzaG9vdCBwaG90b3MsIGFuZCB0aGV5IGVuam95IHRoZSBmYWN0IHRoYXQgYXJ0IGlzIGFsbCBhcm91bmQgdXMuIEZyb20geW91ciBjYXIsIHRoaXMgaXMganVzdCBhIGJ1aWxkaW5nIHRvIG1vc3QgcGVvcGxlLCBidXQgdG8gYW4gYXJ0aXN0LCB0aGlzIGlzIGEgYnVpbGRpbmcgZnVsbCBvZiByZXBldGl0aW9uIGFuZCBzbGVla25lc3MganVzdCBzY3JlYW1pbmcgdG8gYmUgcGhvdG9ncmFwaGVkLiBDaGVlcnMgdG8gdGhlIHBlb3BsZSB0aGF0IGNhbiBzZWUgb3V0c2lkZSBvZiB0aGUgYm94LlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFsdF9kZXNjcmlwdGlvblwiOiBcIndoaXRlIHB5cmFtaWQgaWxsdXN0cmF0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXJsc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJhd1wiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTMzMjI3MzU2ODQyLTJiOTRkMmQyNGQ4ZD9peGxpYj1yYi00LjAuM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmdWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MzMyMjczNTY4NDItMmI5NGQyZDI0ZDhkP2l4bGliPXJiLTQuMC4zJnE9ODUmZm09anBnJmNyb3A9ZW50cm9weSZjcz1zcmdiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlZ3VsYXJcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUzMzIyNzM1Njg0Mi0yYjk0ZDJkMjRkOGQ/aXhsaWI9cmItNC4wLjMmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MzMyMjczNTY4NDItMmI5NGQyZDI0ZDhkP2l4bGliPXJiLTQuMC4zJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTQwMCZmaXQ9bWF4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRodW1iXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MzMyMjczNTY4NDItMmI5NGQyZDI0ZDhkP2l4bGliPXJiLTQuMC4zJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTIwMCZmaXQ9bWF4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsX3MzXCI6IFwiaHR0cHM6Ly9zMy51cy13ZXN0LTIuYW1hem9uYXdzLmNvbS9pbWFnZXMudW5zcGxhc2guY29tL3NtYWxsL3Bob3RvLTE1MzMyMjczNTY4NDItMmI5NGQyZDI0ZDhkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaW5rc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGZcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL0t6UGVmSW5KVzU4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0bWxcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvS3pQZWZJbkpXNThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvS3pQZWZJbkpXNTgvZG93bmxvYWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRfbG9jYXRpb25cIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL0t6UGVmSW5KVzU4L2Rvd25sb2FkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlc1wiOiA0OTgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZWRfYnlfdXNlclwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXJyZW50X3VzZXJfY29sbGVjdGlvbnNcIjogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvbnNvcnNoaXBcIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3BpY19zdWJtaXNzaW9uc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndhbGxwYXBlcnNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RhdHVzXCI6IFwiYXBwcm92ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcHJvdmVkX29uXCI6IFwiMjAyMC0wNC0wNlQxNDoyMDowOVpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJjaGl0ZWN0dXJlLWludGVyaW9yXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBcImFwcHJvdmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHByb3ZlZF9vblwiOiBcIjIwMjAtMDQtMDZUMTQ6MjA6MTRaXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmVtaXVtXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBsdXNcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiMTJNZlVIdmtFRDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjMtMDQtMTVUMjE6MDg6NThaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJuYW1lXCI6IFwiam9zaHN0eWxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJKT1NIVUEgQ09MRU1BTlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmaXJzdF9uYW1lXCI6IFwiSk9TSFVBXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhc3RfbmFtZVwiOiBcIkNPTEVNQU5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHdpdHRlcl91c2VybmFtZVwiOiBcImpvc2hzdHlsZWxhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvcnRmb2xpb191cmxcIjogXCJodHRwOi8vd3d3Lmpvc2hzdHlsZS5jb21cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmlvXCI6IFwiUGhvdG9ncmFwaGVyLCBncmFwaGljIGRlc2lnbmVyLCBzZXQgY29zdHVtZXIgZm9yIG1vdmllcyBhbmQgdHYgc2hvd3MuIDY1ayBmb2xsb3dlcnMgb24gSUcsIHNvIHRhZyBtZSB0byBwb3NzaWJseSBnZXQgZmVhdHVyZWQhIEBqb3Noc3R5bGUgI2pvc2hzdHlsZWxhICNqb3Noc3R5bGVcXHJcXG4gKipQYXlwYWwgZG9uYXRpb25zIGhhcHBpbHkgYWNjZXB0ZWQuIFN1cHBvcnQgc21hbGwgYXJ0aXN0cyBpZiB5b3UgdXNlIHRoZWlyIGltYWdlcy4qKiBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibG9jYXRpb25cIjogXCJMb3MgQW5nZWxlcyAvIFZpcmdpbmlhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpbmtzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGZcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvam9zaHN0eWxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJodG1sXCI6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vQGpvc2hzdHlsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGhvdG9zXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2pvc2hzdHlsZS9waG90b3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VzXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2pvc2hzdHlsZS9saWtlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2pvc2hzdHlsZS9wb3J0Zm9saW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbGxvd2luZ1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qb3Noc3R5bGUvZm9sbG93aW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb2xsb3dlcnNcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvam9zaHN0eWxlL2ZvbGxvd2Vyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlX2ltYWdlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTUxMzAyNjk0MjgwNC00M2Y3YjFiOWIwYmE/aXhsaWI9cmItNC4wLjMmY3JvcD1mYWNlcyZmaXQ9Y3JvcCZ3PTMyJmg9MzJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1lZGl1bVwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1MTMwMjY5NDI4MDQtNDNmN2IxYjliMGJhP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz02NCZoPTY0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXJnZVwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1MTMwMjY5NDI4MDQtNDNmN2IxYjliMGJhP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz0xMjgmaD0xMjhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5zdGFncmFtX3VzZXJuYW1lXCI6IFwiam9zaHN0eWxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX2NvbGxlY3Rpb25zXCI6IDMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX2xpa2VzXCI6IDIyMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfcGhvdG9zXCI6IDE3NyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNjZXB0ZWRfdG9zXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvcl9oaXJlXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNvY2lhbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YWdyYW1fdXNlcm5hbWVcIjogXCJqb3Noc3R5bGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvcnRmb2xpb191cmxcIjogXCJodHRwOi8vd3d3Lmpvc2hzdHlsZS5jb21cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR3aXR0ZXJfdXNlcm5hbWVcIjogXCJqb3Noc3R5bGVsYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGF5cGFsX2VtYWlsXCI6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibGFuZGluZ19wYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiY29tcHV0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic291cmNlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFuY2VzdHJ5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2x1Z1wiOiBcIndhbGxwYXBlcnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldHR5X3NsdWdcIjogXCJIRCBXYWxscGFwZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXRlZ29yeVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNsdWdcIjogXCJkZXNrdG9wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByZXR0eV9zbHVnXCI6IFwiRGVza3RvcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViY2F0ZWdvcnlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbHVnXCI6IFwiY29tcHV0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldHR5X3NsdWdcIjogXCJDb21wdXRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJIZCBjb21wdXRlciB3YWxscGFwZXJzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJ0aXRsZVwiOiBcIkRvd25sb2FkIGZyZWUgY29tcHV0ZXIgd2FsbHBhcGVyc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJDaG9vc2UgZnJvbSBhIGN1cmF0ZWQgc2VsZWN0aW9uIG9mIGNvbXB1dGVyIHdhbGxwYXBlcnMgZm9yIHlvdXIgbW9iaWxlIGFuZCBkZXNrdG9wIHNjcmVlbnMuIEFsd2F5cyBmcmVlIG9uIFVuc3BsYXNoLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YV90aXRsZVwiOiBcIkNvbXB1dGVyIFdhbGxwYXBlcnM6IEZyZWUgSEQgRG93bmxvYWQgWzUwMCsgSFFdIHwgVW5zcGxhc2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGFfZGVzY3JpcHRpb25cIjogXCJDaG9vc2UgZnJvbSBodW5kcmVkcyBvZiBmcmVlIGNvbXB1dGVyIHdhbGxwYXBlcnMuIERvd25sb2FkIEhEIHdhbGxwYXBlcnMgZm9yIGZyZWUgb24gVW5zcGxhc2guXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb3Zlcl9waG90b1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJ3eUVpbkRSVjg4SVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDE2LTExLTE4VDIxOjAxOjQwWlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIzLTA0LTE3VDE0OjAxOjA3WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb21vdGVkX2F0XCI6IFwiMjAxNi0xMS0xOFQyMTowMTo0MFpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiA3OTUyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiA1MzA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2MwYzBjMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJsdXJfaGFzaFwiOiBcIkxoRiRDUz9iUmpSan5wJUxWQFdDU2lXV1dCb2ZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFsdF9kZXNjcmlwdGlvblwiOiBcIndvbWFuIHRha2luZyBwaG90byBvZiBidWlsZGluZ3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cmxzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmF3XCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0Nzk1MDI4MDY5OTEtMjUxYzk0YmU2YjE1P2l4bGliPXJiLTQuMC4zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZ1bGxcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ3OTUwMjgwNjk5MS0yNTFjOTRiZTZiMTU/aXhsaWI9cmItNC4wLjMmcT04NSZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXNyZ2JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVndWxhclwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDc5NTAyODA2OTkxLTI1MWM5NGJlNmIxNT9peGxpYj1yYi00LjAuMyZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ3OTUwMjgwNjk5MS0yNTFjOTRiZTZiMTU/aXhsaWI9cmItNC4wLjMmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9NDAwJmZpdD1tYXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGh1bWJcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ3OTUwMjgwNjk5MS0yNTFjOTRiZTZiMTU/aXhsaWI9cmItNC4wLjMmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MjAwJmZpdD1tYXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxfczNcIjogXCJodHRwczovL3MzLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tL2ltYWdlcy51bnNwbGFzaC5jb20vc21hbGwvcGhvdG8tMTQ3OTUwMjgwNjk5MS0yNTFjOTRiZTZiMTVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpbmtzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZlwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3Mvd3lFaW5EUlY4OElcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHRtbFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy93eUVpbkRSVjg4SVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy93eUVpbkRSVjg4SS9kb3dubG9hZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZF9sb2NhdGlvblwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3Mvd3lFaW5EUlY4OEkvZG93bmxvYWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VzXCI6IDU3NixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlZF9ieV91c2VyXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImN1cnJlbnRfdXNlcl9jb2xsZWN0aW9uc1wiOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcG9uc29yc2hpcFwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvcGljX3N1Ym1pc3Npb25zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2FsbHBhcGVyc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGF0dXNcIjogXCJhcHByb3ZlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwcm92ZWRfb25cIjogXCIyMDIwLTA0LTA2VDE0OjIwOjA5WlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJlbWl1bVwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwbHVzXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIld5bEVaazZlMnhBXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIzLTA0LTE3VDE1OjAyOjA1WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiBcInRob3VnaHRjYXRhbG9nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJUaG91Z2h0IENhdGFsb2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmlyc3RfbmFtZVwiOiBcIlRob3VnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFzdF9uYW1lXCI6IFwiQ2F0YWxvZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0d2l0dGVyX3VzZXJuYW1lXCI6IFwidGhvdWdodGNhdGFsb2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvX3VybFwiOiBcImh0dHA6Ly90aG91Z2h0Y2F0YWxvZy5jb20vP3V0bV9jYW1wYWlnbj1wbGF0Zm9ybS1saW5rJnV0bV9zb3VyY2U9dW5zcGxhc2gmdXRtX21lZGl1bT1wcm9maWxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJpb1wiOiBcIldlJ3JlIGEgZGlnaXRhbCBtYWdhemluZSBiYXNlZCBpbiBCcm9va2x5bi4gV2UgdXNlIFVuc3BsYXNoIHRvIHNoYXJlIHdpdGggdGhlIHdvcmxkIHNvbWUgb2Ygb3VyIGJlc3QgaW4taG91c2UgcGhvdG9ncmFwaHkuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxvY2F0aW9uXCI6IFwiTmV3IFlvcmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlua3NcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZlwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy90aG91Z2h0Y2F0YWxvZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHRtbFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL0B0aG91Z2h0Y2F0YWxvZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGhvdG9zXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3Rob3VnaHRjYXRhbG9nL3Bob3Rvc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZXNcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvdGhvdWdodGNhdGFsb2cvbGlrZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvcnRmb2xpb1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy90aG91Z2h0Y2F0YWxvZy9wb3J0Zm9saW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbGxvd2luZ1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy90aG91Z2h0Y2F0YWxvZy9mb2xsb3dpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbGxvd2Vyc1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy90aG91Z2h0Y2F0YWxvZy9mb2xsb3dlcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZV9pbWFnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbFwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE0Nzk1MDIzODU2NDctOGFhMGQwZTlhODdiP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz0zMiZoPTMyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZWRpdW1cIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNDc5NTAyMzg1NjQ3LThhYTBkMGU5YTg3Yj9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9NjQmaD02NFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNDc5NTAyMzg1NjQ3LThhYTBkMGU5YTg3Yj9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9MTI4Jmg9MTI4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluc3RhZ3JhbV91c2VybmFtZVwiOiBcInRob3VnaHRjYXRhbG9nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX2NvbGxlY3Rpb25zXCI6IDUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX2xpa2VzXCI6IDEyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9waG90b3NcIjogMTczLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY2NlcHRlZF90b3NcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9yX2hpcmVcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic29jaWFsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluc3RhZ3JhbV91c2VybmFtZVwiOiBcInRob3VnaHRjYXRhbG9nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9fdXJsXCI6IFwiaHR0cDovL3Rob3VnaHRjYXRhbG9nLmNvbS8/dXRtX2NhbXBhaWduPXBsYXRmb3JtLWxpbmsmdXRtX3NvdXJjZT11bnNwbGFzaCZ1dG1fbWVkaXVtPXByb2ZpbGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR3aXR0ZXJfdXNlcm5hbWVcIjogXCJ0aG91Z2h0Y2F0YWxvZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGF5cGFsX2VtYWlsXCI6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIlhKWFdiZlNvMmYwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAxNy0wMy0wNFQwMToyMzoxNVpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIzLTA0LTIyVDA0OjM0OjQ3WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvbW90ZWRfYXRcIjogXCIyMDE3LTAzLTA0VDAxOjIzOjE1WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogNjAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiA0MDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMGMyNjQwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJibHVyX2hhc2hcIjogXCJMNDQuWTpqZURoajouQXM6YWNXQlI0czp4XldYXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIkNvZGUgb24gYSBsYXB0b3Agc2NyZWVuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbHRfZGVzY3JpcHRpb25cIjogXCJ0dXJuZWQgb24gZ3JheSBsYXB0b3AgY29tcHV0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVybHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJhd1wiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDg4NTkwNTI4NTA1LTk4ZDJiNWFiYTA0Yj9peGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFId3pmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16Jml4bGliPXJiLTQuMC4zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZnVsbFwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDg4NTkwNTI4NTA1LTk4ZDJiNWFiYTA0Yj9jcm9wPWVudHJvcHkmY3M9c3JnYiZmbT1qcGcmaXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHd6Zkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNeiZpeGxpYj1yYi00LjAuMyZxPTg1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVndWxhclwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDg4NTkwNTI4NTA1LTk4ZDJiNWFiYTA0Yj9jcm9wPWVudHJvcHkmY3M9dGlueXNyZ2ImZml0PW1heCZmbT1qcGcmaXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHd6Zkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNeiZpeGxpYj1yYi00LjAuMyZxPTgwJnc9MTA4MFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0ODg1OTA1Mjg1MDUtOThkMmI1YWJhMDRiP2Nyb3A9ZW50cm9weSZjcz10aW55c3JnYiZmaXQ9bWF4JmZtPWpwZyZpeGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFId3pmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16Jml4bGliPXJiLTQuMC4zJnE9ODAmdz00MDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aHVtYlwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDg4NTkwNTI4NTA1LTk4ZDJiNWFiYTA0Yj9jcm9wPWVudHJvcHkmY3M9dGlueXNyZ2ImZml0PW1heCZmbT1qcGcmaXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHd6Zkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNeiZpeGxpYj1yYi00LjAuMyZxPTgwJnc9MjAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxfczNcIjogXCJodHRwczovL3MzLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tL2ltYWdlcy51bnNwbGFzaC5jb20vc21hbGwvcGhvdG8tMTQ4ODU5MDUyODUwNS05OGQyYjVhYmEwNGJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaW5rc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZlwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvWEpYV2JmU28yZjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJodG1sXCI6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL1hKWFdiZlNvMmYwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvWEpYV2JmU28yZjAvZG93bmxvYWQ/aXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHd6Zkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNelwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRvd25sb2FkX2xvY2F0aW9uXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9YSlhXYmZTbzJmMC9kb3dubG9hZD9peGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFId3pmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZXNcIjogMTk4MSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VkX2J5X3VzZXJcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXJyZW50X3VzZXJfY29sbGVjdGlvbnNcIjogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcG9uc29yc2hpcFwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG9waWNfc3VibWlzc2lvbnNcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIlRyTUVmTnF3dzdzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjMtMDQtMjFUMTY6MjE6NDRaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcm5hbWVcIjogXCJsdWNhYnJhdm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiTHVjYSBCcmF2b1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZpcnN0X25hbWVcIjogXCJMdWNhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFzdF9uYW1lXCI6IFwiQnJhdm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0d2l0dGVyX3VzZXJuYW1lXCI6IFwiaHpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9fdXJsXCI6IFwiaHR0cHM6Ly9pbnN0YWdyYW0uY29tL2x1Y2FicmF2by9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiaW9cIjogXCJIaSwgSeKAmW0gTHVjYSBCcmF2bywgYW4gSXRhbGlhbiBVWCBkZXNpZ25lciBhbmQgZnJvbnQtZW5kIHdlYiBkZXZlbG9wZXIgYmFzZWQgaW4gQ3JlbW9uYSwgSXRhbHkuXFxyXFxuSSBkcmF3IGluc3BpcmF0aW9uIGZyb20gc2lsZW50IGhpbGxzLCBmb2dneSBtb3VudHMsIGNvbGQgbGFrZXMsIHRoZSBjb21wbGV4IHNpbXBsaWNpdHkgb2YgcGF0dGVybnMgYW5kIHVyYmFuIGFyY2hpdGVjdHVyZS5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsb2NhdGlvblwiOiBcIkl0YWx5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlua3NcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxmXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2x1Y2FicmF2b1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJodG1sXCI6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vZnIvQGx1Y2FicmF2b1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwaG90b3NcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvbHVjYWJyYXZvL3Bob3Rvc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlc1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9sdWNhYnJhdm8vbGlrZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2x1Y2FicmF2by9wb3J0Zm9saW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9sbG93aW5nXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2x1Y2FicmF2by9mb2xsb3dpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9sbG93ZXJzXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2x1Y2FicmF2by9mb2xsb3dlcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVfaW1hZ2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbFwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1ODU1MjE3NDY2NzgtMTk4ODkyNTQ4M2QzaW1hZ2U/aXhsaWI9cmItNC4wLjMmY3JvcD1mYWNlcyZmaXQ9Y3JvcCZ3PTMyJmg9MzJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVkaXVtXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTU4NTUyMTc0NjY3OC0xOTg4OTI1NDgzZDNpbWFnZT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9NjQmaD02NFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXJnZVwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1ODU1MjE3NDY2NzgtMTk4ODkyNTQ4M2QzaW1hZ2U/aXhsaWI9cmItNC4wLjMmY3JvcD1mYWNlcyZmaXQ9Y3JvcCZ3PTEyOCZoPTEyOFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5zdGFncmFtX3VzZXJuYW1lXCI6IFwibHVjYWJyYXZvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfY29sbGVjdGlvbnNcIjogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9saWtlc1wiOiAxNTgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfcGhvdG9zXCI6IDE5OCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY2NlcHRlZF90b3NcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JfaGlyZVwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzb2NpYWxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YWdyYW1fdXNlcm5hbWVcIjogXCJsdWNhYnJhdm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvX3VybFwiOiBcImh0dHBzOi8vaW5zdGFncmFtLmNvbS9sdWNhYnJhdm8vXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR3aXR0ZXJfdXNlcm5hbWVcIjogXCJoelwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXlwYWxfZW1haWxcIjogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhZ3NcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJ0ZWNobm9sb2d5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwid2ViXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibGFuZGluZ19wYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiaXRhbHlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic291cmNlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFuY2VzdHJ5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2x1Z1wiOiBcImltYWdlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV0dHlfc2x1Z1wiOiBcIkltYWdlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbHVnXCI6IFwidHJhdmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByZXR0eV9zbHVnXCI6IFwiVHJhdmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJjYXRlZ29yeVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNsdWdcIjogXCJpdGFseVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV0dHlfc2x1Z1wiOiBcIkl0YWx5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkl0YWx5IHBpY3R1cmVzICYgaW1hZ2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJ0aXRsZVwiOiBcIkRvd25sb2FkIGZyZWUgaXRhbHkgaW1hZ2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIkNob29zZSBmcm9tIGEgY3VyYXRlZCBzZWxlY3Rpb24gb2YgSXRhbHkgcGhvdG9zLiBBbHdheXMgZnJlZSBvbiBVbnNwbGFzaC5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGFfdGl0bGVcIjogXCJCZWF1dGlmdWwgSXRhbHkgUGljdHVyZXMgfCBEb3dubG9hZCBGcmVlIEltYWdlcyBvbiBVbnNwbGFzaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YV9kZXNjcmlwdGlvblwiOiBcIkNob29zZSBmcm9tIGh1bmRyZWRzIG9mIGZyZWUgSXRhbHkgcGljdHVyZXMuIERvd25sb2FkIEhEIEl0YWx5IHBob3RvcyBmb3IgZnJlZSBvbiBVbnNwbGFzaC5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvdmVyX3Bob3RvXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcInJrbnJ2Q3JmUzFrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMTgtMDEtMjBUMjE6Mjg6NTdaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjMtMDQtMjJUMDk6MDk6NTZaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvbW90ZWRfYXRcIjogXCIyMDE4LTAxLTIxVDEyOjMyOjM5WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IDI2NzUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IDQwMjcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYzBkOWYzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmx1cl9oYXNoXCI6IFwiTCxIMmlbTV9vZ2UuXzRSam9mYX1YbmJjV0FXPVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlIENsaWZmcyBvZiBDaW5xdWUgVGVycmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbHRfZGVzY3JpcHRpb25cIjogXCJNYW5hcm9sYSwgSXRhbHlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cmxzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmF3XCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTY0ODM2MzgyNjEtZjRkYmFmMDM2OTYzP2l4bGliPXJiLTQuMC4zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZ1bGxcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjQ4MzYzODI2MS1mNGRiYWYwMzY5NjM/aXhsaWI9cmItNC4wLjMmcT04NSZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXNyZ2JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVndWxhclwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2NDgzNjM4MjYxLWY0ZGJhZjAzNjk2Mz9peGxpYj1yYi00LjAuMyZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjQ4MzYzODI2MS1mNGRiYWYwMzY5NjM/aXhsaWI9cmItNC4wLjMmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9NDAwJmZpdD1tYXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGh1bWJcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjQ4MzYzODI2MS1mNGRiYWYwMzY5NjM/aXhsaWI9cmItNC4wLjMmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MjAwJmZpdD1tYXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxfczNcIjogXCJodHRwczovL3MzLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tL2ltYWdlcy51bnNwbGFzaC5jb20vc21hbGwvcGhvdG8tMTUxNjQ4MzYzODI2MS1mNGRiYWYwMzY5NjNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpbmtzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZlwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvcmtucnZDcmZTMWtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHRtbFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9ya25ydkNyZlMxa1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9ya25ydkNyZlMxay9kb3dubG9hZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZF9sb2NhdGlvblwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvcmtucnZDcmZTMWsvZG93bmxvYWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VzXCI6IDM4MzgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZWRfYnlfdXNlclwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXJyZW50X3VzZXJfY29sbGVjdGlvbnNcIjogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvbnNvcnNoaXBcIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3BpY19zdWJtaXNzaW9uc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hdHVyZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGF0dXNcIjogXCJhcHByb3ZlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwcm92ZWRfb25cIjogXCIyMDIwLTA0LTA2VDE0OjIwOjE4WlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3YWxscGFwZXJzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBcImFwcHJvdmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHByb3ZlZF9vblwiOiBcIjIwMjEtMDYtMTdUMTU6NTI6MzdaXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmVtaXVtXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBsdXNcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiTnVQYU9WVmp2cUFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjMtMDQtMTZUMTc6NDE6MzFaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJuYW1lXCI6IFwiamFja3dhcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIkphY2sgV2FyZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmaXJzdF9uYW1lXCI6IFwiSmFja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXN0X25hbWVcIjogXCJXYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR3aXR0ZXJfdXNlcm5hbWVcIjogXCJqd2FyZHVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvX3VybFwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiaW9cIjogXCJBZHZlbnR1cmUvTGFuZHNjYXBlIFBob3RvZ3JhcGhlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsb2NhdGlvblwiOiBcIkJvc3RvbiwgTWFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlua3NcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZlwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qYWNrd2FyZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHRtbFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL0BqYWNrd2FyZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGhvdG9zXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2phY2t3YXJkL3Bob3Rvc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZXNcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvamFja3dhcmQvbGlrZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvcnRmb2xpb1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qYWNrd2FyZC9wb3J0Zm9saW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbGxvd2luZ1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qYWNrd2FyZC9mb2xsb3dpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbGxvd2Vyc1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qYWNrd2FyZC9mb2xsb3dlcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZV9pbWFnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbFwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1MjI0MjA0MzU2MjYtZTI2YzI5MDI0ZWE5P2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz0zMiZoPTMyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZWRpdW1cIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTIyNDIwNDM1NjI2LWUyNmMyOTAyNGVhOT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9NjQmaD02NFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTIyNDIwNDM1NjI2LWUyNmMyOTAyNGVhOT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9MTI4Jmg9MTI4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluc3RhZ3JhbV91c2VybmFtZVwiOiBcImp3YXJkdVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9jb2xsZWN0aW9uc1wiOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9saWtlc1wiOiA4NTMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Bob3Rvc1wiOiAyMTcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjY2VwdGVkX3Rvc1wiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JfaGlyZVwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic29jaWFsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluc3RhZ3JhbV91c2VybmFtZVwiOiBcImp3YXJkdVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvX3VybFwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHdpdHRlcl91c2VybmFtZVwiOiBcImp3YXJkdVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGF5cGFsX2VtYWlsXCI6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImlyNWdDNGhscVQwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0wOC0wOVQyMTozNjoyM1pcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIzLTA0LTIyVDE0OjMwOjA5WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvbW90ZWRfYXRcIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IDQyOTIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogMzM3MyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2YzOGMwY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmx1cl9oYXNoXCI6IFwiTHVOaVosMTBPVE57WGhJQFc7d3cjU29mV3JzOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJDcnlzdGFsIFB5cmFtaWQgV2FsbHBhcGVyL0Rlc2t0b3AgQmFja2dyb3VuZCAtIFRvIG1lIGl0IGxvb2tzIGxpa2UgdGhlIHB5cmFtaWQgaXMgYSBjb250YWluZXIgZm9yIGNvbG9yLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWx0X2Rlc2NyaXB0aW9uXCI6IFwicHVycGxlIGFuZCBwaW5rIHRyaWFuZ2xlIGlsbHVzdHJhdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXJsc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmF3XCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1OTcwMDg2NDE2MjEtY2VmZGNmNzE4MDI1P2l4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3MGZIeG1kVzVqZEdsdmJuTjhaVzU4TUh4OGZId3hOamd5TVRjNU9UTXomaXhsaWI9cmItNC4wLjNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmdWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1OTcwMDg2NDE2MjEtY2VmZGNmNzE4MDI1P2Nyb3A9ZW50cm9weSZjcz1zcmdiJmZtPWpwZyZpeGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFIdzBmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16Jml4bGliPXJiLTQuMC4zJnE9ODVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWd1bGFyXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1OTcwMDg2NDE2MjEtY2VmZGNmNzE4MDI1P2Nyb3A9ZW50cm9weSZjcz10aW55c3JnYiZmaXQ9bWF4JmZtPWpwZyZpeGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFIdzBmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16Jml4bGliPXJiLTQuMC4zJnE9ODAmdz0xMDgwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU5NzAwODY0MTYyMS1jZWZkY2Y3MTgwMjU/Y3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJmZpdD1tYXgmZm09anBnJml4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3MGZIeG1kVzVqZEdsdmJuTjhaVzU4TUh4OGZId3hOamd5TVRjNU9UTXomaXhsaWI9cmItNC4wLjMmcT04MCZ3PTQwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRodW1iXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1OTcwMDg2NDE2MjEtY2VmZGNmNzE4MDI1P2Nyb3A9ZW50cm9weSZjcz10aW55c3JnYiZmaXQ9bWF4JmZtPWpwZyZpeGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFIdzBmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16Jml4bGliPXJiLTQuMC4zJnE9ODAmdz0yMDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbF9zM1wiOiBcImh0dHBzOi8vczMudXMtd2VzdC0yLmFtYXpvbmF3cy5jb20vaW1hZ2VzLnVuc3BsYXNoLmNvbS9zbWFsbC9waG90by0xNTk3MDA4NjQxNjIxLWNlZmRjZjcxODAyNVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpbmtzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxmXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9pcjVnQzRobHFUMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0bWxcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvaXI1Z0M0aGxxVDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9pcjVnQzRobHFUMC9kb3dubG9hZD9peGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFIdzBmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRfbG9jYXRpb25cIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL2lyNWdDNGhscVQwL2Rvd25sb2FkP2l4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3MGZIeG1kVzVqZEdsdmJuTjhaVzU4TUh4OGZId3hOamd5TVRjNU9UTXpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlc1wiOiA1OTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlZF9ieV91c2VyXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3VycmVudF91c2VyX2NvbGxlY3Rpb25zXCI6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvbnNvcnNoaXBcIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvcGljX3N1Ym1pc3Npb25zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3YWxscGFwZXJzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RhdHVzXCI6IFwicmVqZWN0ZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwaXJpdHVhbGl0eVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBcInJlamVjdGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIktqaDNZNWtmQmxNXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjMtMDQtMjJUMDM6NTI6MDFaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcm5hbWVcIjogXCJsYXp5Y3JlZWtpbWFnZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiTWljaGFlbCBEemllZHppY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZpcnN0X25hbWVcIjogXCJNaWNoYWVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFzdF9uYW1lXCI6IFwiRHppZWR6aWNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0d2l0dGVyX3VzZXJuYW1lXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvX3VybFwiOiBcImh0dHBzOi8vd3d3LmxhenljcmVla3N0dWRpb3MuY29tL1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJpb1wiOiBcIk1hbnkgb2YgdGhlIHBob3RvcyB0aGF0IEkgc2hhcmUgaGVyZSB3b3VsZCBzbG93bHkgZmFkZSBhd2F5IG9uIG15IGhhcmQgZHJpdmUgaWYgdGhleSB3ZXJlbid0IG9uIFVuc3BsYXNoISAgSSBob3BlIHlvdSBjYW4gZmluZCBzb21lIG9mIHRoZW0gc3VpdGVkIGZvciB5b3VyIHB1cnBvc2VzLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxvY2F0aW9uXCI6IFwiVEVYQVMsIFVTQVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpbmtzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZlwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9sYXp5Y3JlZWtpbWFnZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHRtbFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL0BsYXp5Y3JlZWtpbWFnZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGhvdG9zXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2xhenljcmVla2ltYWdlcy9waG90b3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZXNcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvbGF6eWNyZWVraW1hZ2VzL2xpa2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvcnRmb2xpb1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9sYXp5Y3JlZWtpbWFnZXMvcG9ydGZvbGlvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbGxvd2luZ1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9sYXp5Y3JlZWtpbWFnZXMvZm9sbG93aW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbGxvd2Vyc1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9sYXp5Y3JlZWtpbWFnZXMvZm9sbG93ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlX2ltYWdlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNjQxNDAxMzQzNDU1LTdjNTJhOWZkZDM0NGltYWdlP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz0zMiZoPTMyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1lZGl1bVwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE2NDE0MDEzNDM0NTUtN2M1MmE5ZmRkMzQ0aW1hZ2U/aXhsaWI9cmItNC4wLjMmY3JvcD1mYWNlcyZmaXQ9Y3JvcCZ3PTY0Jmg9NjRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNjQxNDAxMzQzNDU1LTdjNTJhOWZkZDM0NGltYWdlP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz0xMjgmaD0xMjhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluc3RhZ3JhbV91c2VybmFtZVwiOiBcImxhenljcmVla2ltYWdlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX2NvbGxlY3Rpb25zXCI6IDI3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX2xpa2VzXCI6IDQ3NDUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfcGhvdG9zXCI6IDEwOSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY2NlcHRlZF90b3NcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JfaGlyZVwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzb2NpYWxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YWdyYW1fdXNlcm5hbWVcIjogXCJsYXp5Y3JlZWtpbWFnZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvX3VybFwiOiBcImh0dHBzOi8vd3d3LmxhenljcmVla3N0dWRpb3MuY29tL1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0d2l0dGVyX3VzZXJuYW1lXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBheXBhbF9lbWFpbFwiOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFnc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcImxhenkgY3JlZWsgc3R1ZGlvc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcInR5bGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwidHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiSHNUbmpDVlE3OThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDE3LTEwLTMxVDE4OjU1OjU4WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjMtMDQtMjFUMjM6NTI6NTdaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9tb3RlZF9hdFwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogNDg5NyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiAzMjY0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjOGM4YzhjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJibHVyX2hhc2hcIjogXCJMNkRKU0F+cXRPLTtvZ0lVeHVEJXRSb2hSaiVNXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIlNoZSBqdXN0IGxlZnQgZm9yIGEgbWVldGluZyBhbmQgaGVyIGRlc2sgbG9va2VkIGxpa2UgYSBzdG9jayBwaG90by4gXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbHRfZGVzY3JpcHRpb25cIjogXCJibGFjayBmcmFtZWQgZXllZ2xhc3NlcyBvbiB0b3Agb2Ygd2hpdGUgcHJpbnRpbmcgcGFwZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVybHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJhd1wiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTA5NDc1ODI2NjMzLWZlZDU3N2EyYzcxYj9peGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFIdzFmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16Jml4bGliPXJiLTQuMC4zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZnVsbFwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTA5NDc1ODI2NjMzLWZlZDU3N2EyYzcxYj9jcm9wPWVudHJvcHkmY3M9c3JnYiZmbT1qcGcmaXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHcxZkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNeiZpeGxpYj1yYi00LjAuMyZxPTg1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVndWxhclwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTA5NDc1ODI2NjMzLWZlZDU3N2EyYzcxYj9jcm9wPWVudHJvcHkmY3M9dGlueXNyZ2ImZml0PW1heCZmbT1qcGcmaXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHcxZkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNeiZpeGxpYj1yYi00LjAuMyZxPTgwJnc9MTA4MFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MDk0NzU4MjY2MzMtZmVkNTc3YTJjNzFiP2Nyb3A9ZW50cm9weSZjcz10aW55c3JnYiZmaXQ9bWF4JmZtPWpwZyZpeGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFIdzFmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16Jml4bGliPXJiLTQuMC4zJnE9ODAmdz00MDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aHVtYlwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTA5NDc1ODI2NjMzLWZlZDU3N2EyYzcxYj9jcm9wPWVudHJvcHkmY3M9dGlueXNyZ2ImZml0PW1heCZmbT1qcGcmaXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHcxZkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNeiZpeGxpYj1yYi00LjAuMyZxPTgwJnc9MjAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxfczNcIjogXCJodHRwczovL3MzLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tL2ltYWdlcy51bnNwbGFzaC5jb20vc21hbGwvcGhvdG8tMTUwOTQ3NTgyNjYzMy1mZWQ1NzdhMmM3MWJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaW5rc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZlwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvSHNUbmpDVlE3OThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJodG1sXCI6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL0hzVG5qQ1ZRNzk4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvSHNUbmpDVlE3OTgvZG93bmxvYWQ/aXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHcxZkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNelwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRvd25sb2FkX2xvY2F0aW9uXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9Ic1RuakNWUTc5OC9kb3dubG9hZD9peGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFIdzFmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZXNcIjogNTQwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZWRfYnlfdXNlclwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImN1cnJlbnRfdXNlcl9jb2xsZWN0aW9uc1wiOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwb25zb3JzaGlwXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3BpY19zdWJtaXNzaW9uc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYnVzaW5lc3Mtd29ya1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBcImFwcHJvdmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcHJvdmVkX29uXCI6IFwiMjAyMS0wOS0yOVQxMjo1Mzo0NlpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiYzJzQUFFOUJYcllcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMy0wNC0yMVQxNzoxMjo1OFpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiBcInNpZ211bmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiU2lnbXVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZpcnN0X25hbWVcIjogXCJTaWdtdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFzdF9uYW1lXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHdpdHRlcl91c2VybmFtZVwiOiBcInNpZ19fbXVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvcnRmb2xpb191cmxcIjogXCJodHRwczovL3NpZ211bmQuY2FcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiaW9cIjogXCJTaWdtdW5kIHLDqWFsaXNlIGRlcyBzb2x1dGlvbnMgbnVtw6lyaXF1ZXMgcXVpIGZvbnQgbGEgZGlmZsOpcmVuY2UuIG9udm91c2Vjb3V0ZUBzaWdtdW5kLmNhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibG9jYXRpb25cIjogXCJRdWViZWMsIENhbmFkYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpbmtzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZlwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9zaWdtdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0bWxcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9Ac2lnbXVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwaG90b3NcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvc2lnbXVuZC9waG90b3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZXNcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvc2lnbXVuZC9saWtlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9cIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvc2lnbXVuZC9wb3J0Zm9saW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9sbG93aW5nXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3NpZ211bmQvZm9sbG93aW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbGxvd2Vyc1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9zaWdtdW5kL2ZvbGxvd2Vyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZV9pbWFnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTU5MjU3NjEwNDgzOS0zNDYxZWZjZDU2MjRpbWFnZT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9MzImaD0zMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZWRpdW1cIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTkyNTc2MTA0ODM5LTM0NjFlZmNkNTYyNGltYWdlP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz02NCZoPTY0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhcmdlXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTU5MjU3NjEwNDgzOS0zNDYxZWZjZDU2MjRpbWFnZT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9MTI4Jmg9MTI4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YWdyYW1fdXNlcm5hbWVcIjogXCJzaWdfX211bmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9jb2xsZWN0aW9uc1wiOiAyOCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9saWtlc1wiOiA3MzksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfcGhvdG9zXCI6IDE2OTcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNjZXB0ZWRfdG9zXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9yX2hpcmVcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic29jaWFsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5zdGFncmFtX3VzZXJuYW1lXCI6IFwic2lnX19tdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvcnRmb2xpb191cmxcIjogXCJodHRwczovL3NpZ211bmQuY2FcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHdpdHRlcl91c2VybmFtZVwiOiBcInNpZ19fbXVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXlwYWxfZW1haWxcIjogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhZ3NcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJsYW5kaW5nX3BhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJncmV5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNvdXJjZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbmNlc3RyeVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNsdWdcIjogXCJ3YWxscGFwZXJzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByZXR0eV9zbHVnXCI6IFwiSEQgV2FsbHBhcGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbHVnXCI6IFwiY29sb3JzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByZXR0eV9zbHVnXCI6IFwiQ29sb3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YmNhdGVnb3J5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2x1Z1wiOiBcImdyZXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldHR5X3NsdWdcIjogXCJHcmV5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkhkIGdyZXkgd2FsbHBhcGVyc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3VidGl0bGVcIjogXCJEb3dubG9hZCBmcmVlIGdyZXkgd2FsbHBhcGVyc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJDaG9vc2UgZnJvbSBhIGN1cmF0ZWQgc2VsZWN0aW9uIG9mIGdyZXkgd2FsbHBhcGVycyBmb3IgeW91ciBtb2JpbGUgYW5kIGRlc2t0b3Agc2NyZWVucy4gQWx3YXlzIGZyZWUgb24gVW5zcGxhc2guXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXRhX3RpdGxlXCI6IFwiR3JleSBXYWxscGFwZXJzOiBGcmVlIEhEIERvd25sb2FkIFs1MDArIEhRXSB8IFVuc3BsYXNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXRhX2Rlc2NyaXB0aW9uXCI6IFwiQ2hvb3NlIGZyb20gaHVuZHJlZHMgb2YgZnJlZSBncmV5IHdhbGxwYXBlcnMuIERvd25sb2FkIEhEIHdhbGxwYXBlcnMgZm9yIGZyZWUgb24gVW5zcGxhc2guXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb3Zlcl9waG90b1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJjdFhmMUdWeWY5QVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDE4LTA5LTEwVDA4OjA1OjU1WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIzLTA0LTE3VDE4OjA0OjUwWlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb21vdGVkX2F0XCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogNTMwNCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogNzk1MixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNhNmE2YTZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJibHVyX2hhc2hcIjogXCJMM0lZRk5JVTAwfnEtO017Uip0ODBLdFJJVU17XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJPbGQgc3RvbmUgYmFja2dyb3VuZCB0ZXh0dXJlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWx0X2Rlc2NyaXB0aW9uXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXJsc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJhd1wiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTM2NTY2NDgyNjgwLWZjYTMxOTMwYTBiZD9peGxpYj1yYi00LjAuM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmdWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MzY1NjY0ODI2ODAtZmNhMzE5MzBhMGJkP2l4bGliPXJiLTQuMC4zJnE9ODUmZm09anBnJmNyb3A9ZW50cm9weSZjcz1zcmdiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlZ3VsYXJcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUzNjU2NjQ4MjY4MC1mY2EzMTkzMGEwYmQ/aXhsaWI9cmItNC4wLjMmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MzY1NjY0ODI2ODAtZmNhMzE5MzBhMGJkP2l4bGliPXJiLTQuMC4zJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTQwMCZmaXQ9bWF4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRodW1iXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MzY1NjY0ODI2ODAtZmNhMzE5MzBhMGJkP2l4bGliPXJiLTQuMC4zJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTIwMCZmaXQ9bWF4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsX3MzXCI6IFwiaHR0cHM6Ly9zMy51cy13ZXN0LTIuYW1hem9uYXdzLmNvbS9pbWFnZXMudW5zcGxhc2guY29tL3NtYWxsL3Bob3RvLTE1MzY1NjY0ODI2ODAtZmNhMzE5MzBhMGJkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaW5rc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGZcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL2N0WGYxR1Z5ZjlBXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0bWxcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvY3RYZjFHVnlmOUFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvY3RYZjFHVnlmOUEvZG93bmxvYWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRfbG9jYXRpb25cIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL2N0WGYxR1Z5ZjlBL2Rvd25sb2FkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlc1wiOiAxODc3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VkX2J5X3VzZXJcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3VycmVudF91c2VyX2NvbGxlY3Rpb25zXCI6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwb25zb3JzaGlwXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG9waWNfc3VibWlzc2lvbnNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0dXJlcy1wYXR0ZXJuc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGF0dXNcIjogXCJhcHByb3ZlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwcm92ZWRfb25cIjogXCIyMDIwLTA0LTA2VDE0OjIwOjExWlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJlbWl1bVwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwbHVzXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIklGY0VoSnFlbTBRXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIzLTA0LTE4VDAwOjE4OjQ2WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiBcImFubmllc3ByYXR0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJBbm5pZSBTcHJhdHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmlyc3RfbmFtZVwiOiBcIkFubmllXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhc3RfbmFtZVwiOiBcIlNwcmF0dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0d2l0dGVyX3VzZXJuYW1lXCI6IFwiYW5uaWVzcHJhdHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvX3VybFwiOiBcImh0dHBzOi8vd3d3LmFubmllc3ByYXR0LmNvbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiaW9cIjogXCJQaG90b2dyYXBoZXIgZnJvbSBFbmdsYW5kLCBzaGFyaW5nIG15IGRpZ2l0YWwsIGZpbG0gKyB2aW50YWdlIHNsaWRlIHNjYW5zLiAgXFxyXFxuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxvY2F0aW9uXCI6IFwiTmV3IEZvcmVzdCBOYXRpb25hbCBQYXJrLCBVS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaW5rc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxmXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2Fubmllc3ByYXR0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJodG1sXCI6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vQGFubmllc3ByYXR0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwaG90b3NcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvYW5uaWVzcHJhdHQvcGhvdG9zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlc1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9hbm5pZXNwcmF0dC9saWtlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2Fubmllc3ByYXR0L3BvcnRmb2xpb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9sbG93aW5nXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2Fubmllc3ByYXR0L2ZvbGxvd2luZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9sbG93ZXJzXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2Fubmllc3ByYXR0L2ZvbGxvd2Vyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlX2ltYWdlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTY0ODgyODgwNjIyMy0xODUyZjcwNGM1OGFpbWFnZT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9MzImaD0zMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVkaXVtXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTY0ODgyODgwNjIyMy0xODUyZjcwNGM1OGFpbWFnZT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9NjQmaD02NFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNjQ4ODI4ODA2MjIzLTE4NTJmNzA0YzU4YWltYWdlP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz0xMjgmaD0xMjhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5zdGFncmFtX3VzZXJuYW1lXCI6IFwiYW5uaWVzcHJhdHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfY29sbGVjdGlvbnNcIjogMTUxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9saWtlc1wiOiAxNDQ0NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfcGhvdG9zXCI6IDE3ODQzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY2NlcHRlZF90b3NcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9yX2hpcmVcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNvY2lhbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YWdyYW1fdXNlcm5hbWVcIjogXCJhbm5pZXNwcmF0dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvX3VybFwiOiBcImh0dHBzOi8vd3d3LmFubmllc3ByYXR0LmNvbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHdpdHRlcl91c2VybmFtZVwiOiBcImFubmllc3ByYXR0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXlwYWxfZW1haWxcIjogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJjYW5hZGFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJxdcOpYmVjIGNpdHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiRnYySi1hSzBBY3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTExLTIzVDIxOjE4OjU5WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjMtMDQtMjFUMDY6MTQ6NTlaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9tb3RlZF9hdFwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogNTA1NyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiAzMzE1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMjYyNjI2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJibHVyX2hhc2hcIjogXCJMTURKTD9NX1IzMDFrRVc/TXtvY0lUTXslZ3Q4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWx0X2Rlc2NyaXB0aW9uXCI6IFwiYmxhY2sgYW5kIHNpbHZlciBsYXB0b3AgY29tcHV0ZXIgYmVzaWRlIHllbGxvdyBjZXJhbWljIG11Z1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXJsc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmF3XCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MDYxNjYzMjU2ODMtZTZkZWI2OTdkMzAxP2l4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3MmZIeG1kVzVqZEdsdmJuTjhaVzU4TUh4OGZId3hOamd5TVRjNU9UTXomaXhsaWI9cmItNC4wLjNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmdWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MDYxNjYzMjU2ODMtZTZkZWI2OTdkMzAxP2Nyb3A9ZW50cm9weSZjcz1zcmdiJmZtPWpwZyZpeGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFIdzJmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16Jml4bGliPXJiLTQuMC4zJnE9ODVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWd1bGFyXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MDYxNjYzMjU2ODMtZTZkZWI2OTdkMzAxP2Nyb3A9ZW50cm9weSZjcz10aW55c3JnYiZmaXQ9bWF4JmZtPWpwZyZpeGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFIdzJmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16Jml4bGliPXJiLTQuMC4zJnE9ODAmdz0xMDgwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYwNjE2NjMyNTY4My1lNmRlYjY5N2QzMDE/Y3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJmZpdD1tYXgmZm09anBnJml4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3MmZIeG1kVzVqZEdsdmJuTjhaVzU4TUh4OGZId3hOamd5TVRjNU9UTXomaXhsaWI9cmItNC4wLjMmcT04MCZ3PTQwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRodW1iXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MDYxNjYzMjU2ODMtZTZkZWI2OTdkMzAxP2Nyb3A9ZW50cm9weSZjcz10aW55c3JnYiZmaXQ9bWF4JmZtPWpwZyZpeGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFIdzJmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16Jml4bGliPXJiLTQuMC4zJnE9ODAmdz0yMDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbF9zM1wiOiBcImh0dHBzOi8vczMudXMtd2VzdC0yLmFtYXpvbmF3cy5jb20vaW1hZ2VzLnVuc3BsYXNoLmNvbS9zbWFsbC9waG90by0xNjA2MTY2MzI1NjgzLWU2ZGViNjk3ZDMwMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpbmtzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxmXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9GdjJKLWFLMEFjc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0bWxcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvRnYySi1hSzBBY3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9GdjJKLWFLMEFjcy9kb3dubG9hZD9peGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFIdzJmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRfbG9jYXRpb25cIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL0Z2MkotYUswQWNzL2Rvd25sb2FkP2l4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3MmZIeG1kVzVqZEdsdmJuTjhaVzU4TUh4OGZId3hOamd5TVRjNU9UTXpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlc1wiOiA5NCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VkX2J5X3VzZXJcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXJyZW50X3VzZXJfY29sbGVjdGlvbnNcIjogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcG9uc29yc2hpcFwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG9waWNfc3VibWlzc2lvbnNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJ1c2luZXNzLXdvcmtcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGF0dXNcIjogXCJyZWplY3RlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJjMnNBQUU5QlhyWVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIzLTA0LTIxVDE3OjEyOjU4WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJuYW1lXCI6IFwic2lnbXVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJTaWdtdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmlyc3RfbmFtZVwiOiBcIlNpZ211bmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXN0X25hbWVcIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0d2l0dGVyX3VzZXJuYW1lXCI6IFwic2lnX19tdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvX3VybFwiOiBcImh0dHBzOi8vc2lnbXVuZC5jYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJpb1wiOiBcIlNpZ211bmQgcsOpYWxpc2UgZGVzIHNvbHV0aW9ucyBudW3DqXJpcXVlcyBxdWkgZm9udCBsYSBkaWZmw6lyZW5jZS4gb252b3VzZWNvdXRlQHNpZ211bmQuY2FcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsb2NhdGlvblwiOiBcIlF1ZWJlYywgQ2FuYWRhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlua3NcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxmXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3NpZ211bmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHRtbFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL0BzaWdtdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBob3Rvc1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9zaWdtdW5kL3Bob3Rvc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlc1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9zaWdtdW5kL2xpa2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvcnRmb2xpb1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9zaWdtdW5kL3BvcnRmb2xpb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb2xsb3dpbmdcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvc2lnbXVuZC9mb2xsb3dpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9sbG93ZXJzXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3NpZ211bmQvZm9sbG93ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlX2ltYWdlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTkyNTc2MTA0ODM5LTM0NjFlZmNkNTYyNGltYWdlP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz0zMiZoPTMyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1lZGl1bVwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1OTI1NzYxMDQ4MzktMzQ2MWVmY2Q1NjI0aW1hZ2U/aXhsaWI9cmItNC4wLjMmY3JvcD1mYWNlcyZmaXQ9Y3JvcCZ3PTY0Jmg9NjRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTkyNTc2MTA0ODM5LTM0NjFlZmNkNTYyNGltYWdlP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz0xMjgmaD0xMjhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluc3RhZ3JhbV91c2VybmFtZVwiOiBcInNpZ19fbXVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX2NvbGxlY3Rpb25zXCI6IDI4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX2xpa2VzXCI6IDczOSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9waG90b3NcIjogMTY5NyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY2NlcHRlZF90b3NcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JfaGlyZVwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzb2NpYWxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YWdyYW1fdXNlcm5hbWVcIjogXCJzaWdfX211bmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvX3VybFwiOiBcImh0dHBzOi8vc2lnbXVuZC5jYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0d2l0dGVyX3VzZXJuYW1lXCI6IFwic2lnX19tdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBheXBhbF9lbWFpbFwiOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFnc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImxhbmRpbmdfcGFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcImdyZXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic291cmNlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFuY2VzdHJ5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2x1Z1wiOiBcIndhbGxwYXBlcnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldHR5X3NsdWdcIjogXCJIRCBXYWxscGFwZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXRlZ29yeVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNsdWdcIjogXCJjb2xvcnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldHR5X3NsdWdcIjogXCJDb2xvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViY2F0ZWdvcnlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbHVnXCI6IFwiZ3JleVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV0dHlfc2x1Z1wiOiBcIkdyZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiSGQgZ3JleSB3YWxscGFwZXJzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJ0aXRsZVwiOiBcIkRvd25sb2FkIGZyZWUgZ3JleSB3YWxscGFwZXJzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIkNob29zZSBmcm9tIGEgY3VyYXRlZCBzZWxlY3Rpb24gb2YgZ3JleSB3YWxscGFwZXJzIGZvciB5b3VyIG1vYmlsZSBhbmQgZGVza3RvcCBzY3JlZW5zLiBBbHdheXMgZnJlZSBvbiBVbnNwbGFzaC5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGFfdGl0bGVcIjogXCJHcmV5IFdhbGxwYXBlcnM6IEZyZWUgSEQgRG93bmxvYWQgWzUwMCsgSFFdIHwgVW5zcGxhc2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGFfZGVzY3JpcHRpb25cIjogXCJDaG9vc2UgZnJvbSBodW5kcmVkcyBvZiBmcmVlIGdyZXkgd2FsbHBhcGVycy4gRG93bmxvYWQgSEQgd2FsbHBhcGVycyBmb3IgZnJlZSBvbiBVbnNwbGFzaC5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvdmVyX3Bob3RvXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImN0WGYxR1Z5ZjlBXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMTgtMDktMTBUMDg6MDU6NTVaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjMtMDQtMTdUMTg6MDQ6NTBaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvbW90ZWRfYXRcIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiA1MzA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiA3OTUyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2E2YTZhNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJsdXJfaGFzaFwiOiBcIkwzSVlGTklVMDB+cS07TXtSKnQ4MEt0UklVTXtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIk9sZCBzdG9uZSBiYWNrZ3JvdW5kIHRleHR1cmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbHRfZGVzY3JpcHRpb25cIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cmxzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmF3XCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MzY1NjY0ODI2ODAtZmNhMzE5MzBhMGJkP2l4bGliPXJiLTQuMC4zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZ1bGxcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUzNjU2NjQ4MjY4MC1mY2EzMTkzMGEwYmQ/aXhsaWI9cmItNC4wLjMmcT04NSZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXNyZ2JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVndWxhclwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTM2NTY2NDgyNjgwLWZjYTMxOTMwYTBiZD9peGxpYj1yYi00LjAuMyZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUzNjU2NjQ4MjY4MC1mY2EzMTkzMGEwYmQ/aXhsaWI9cmItNC4wLjMmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9NDAwJmZpdD1tYXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGh1bWJcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUzNjU2NjQ4MjY4MC1mY2EzMTkzMGEwYmQ/aXhsaWI9cmItNC4wLjMmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MjAwJmZpdD1tYXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxfczNcIjogXCJodHRwczovL3MzLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tL2ltYWdlcy51bnNwbGFzaC5jb20vc21hbGwvcGhvdG8tMTUzNjU2NjQ4MjY4MC1mY2EzMTkzMGEwYmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpbmtzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZlwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvY3RYZjFHVnlmOUFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHRtbFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9jdFhmMUdWeWY5QVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9jdFhmMUdWeWY5QS9kb3dubG9hZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZF9sb2NhdGlvblwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvY3RYZjFHVnlmOUEvZG93bmxvYWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VzXCI6IDE4NzcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZWRfYnlfdXNlclwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXJyZW50X3VzZXJfY29sbGVjdGlvbnNcIjogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvbnNvcnNoaXBcIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3BpY19zdWJtaXNzaW9uc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHR1cmVzLXBhdHRlcm5zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBcImFwcHJvdmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHByb3ZlZF9vblwiOiBcIjIwMjAtMDQtMDZUMTQ6MjA6MTFaXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmVtaXVtXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBsdXNcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiSUZjRWhKcWVtMFFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjMtMDQtMThUMDA6MTg6NDZaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJuYW1lXCI6IFwiYW5uaWVzcHJhdHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIkFubmllIFNwcmF0dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmaXJzdF9uYW1lXCI6IFwiQW5uaWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFzdF9uYW1lXCI6IFwiU3ByYXR0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR3aXR0ZXJfdXNlcm5hbWVcIjogXCJhbm5pZXNwcmF0dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9fdXJsXCI6IFwiaHR0cHM6Ly93d3cuYW5uaWVzcHJhdHQuY29tXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJpb1wiOiBcIlBob3RvZ3JhcGhlciBmcm9tIEVuZ2xhbmQsIHNoYXJpbmcgbXkgZGlnaXRhbCwgZmlsbSArIHZpbnRhZ2Ugc2xpZGUgc2NhbnMuICBcXHJcXG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibG9jYXRpb25cIjogXCJOZXcgRm9yZXN0IE5hdGlvbmFsIFBhcmssIFVLXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpbmtzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGZcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvYW5uaWVzcHJhdHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0bWxcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9AYW5uaWVzcHJhdHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBob3Rvc1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9hbm5pZXNwcmF0dC9waG90b3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VzXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2Fubmllc3ByYXR0L2xpa2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9cIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvYW5uaWVzcHJhdHQvcG9ydGZvbGlvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb2xsb3dpbmdcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvYW5uaWVzcHJhdHQvZm9sbG93aW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb2xsb3dlcnNcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvYW5uaWVzcHJhdHQvZm9sbG93ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVfaW1hZ2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNjQ4ODI4ODA2MjIzLTE4NTJmNzA0YzU4YWltYWdlP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz0zMiZoPTMyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZWRpdW1cIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNjQ4ODI4ODA2MjIzLTE4NTJmNzA0YzU4YWltYWdlP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz02NCZoPTY0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXJnZVwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE2NDg4Mjg4MDYyMjMtMTg1MmY3MDRjNThhaW1hZ2U/aXhsaWI9cmItNC4wLjMmY3JvcD1mYWNlcyZmaXQ9Y3JvcCZ3PTEyOCZoPTEyOFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YWdyYW1fdXNlcm5hbWVcIjogXCJhbm5pZXNwcmF0dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9jb2xsZWN0aW9uc1wiOiAxNTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX2xpa2VzXCI6IDE0NDQ1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9waG90b3NcIjogMTc4NDMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjY2VwdGVkX3Rvc1wiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JfaGlyZVwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic29jaWFsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluc3RhZ3JhbV91c2VybmFtZVwiOiBcImFubmllc3ByYXR0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9fdXJsXCI6IFwiaHR0cHM6Ly93d3cuYW5uaWVzcHJhdHQuY29tXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0d2l0dGVyX3VzZXJuYW1lXCI6IFwiYW5uaWVzcHJhdHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBheXBhbF9lbWFpbFwiOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImxhbmRpbmdfcGFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcImNvbXB1dGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNvdXJjZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbmNlc3RyeVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNsdWdcIjogXCJ3YWxscGFwZXJzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByZXR0eV9zbHVnXCI6IFwiSEQgV2FsbHBhcGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbHVnXCI6IFwiZGVza3RvcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV0dHlfc2x1Z1wiOiBcIkRlc2t0b3BcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YmNhdGVnb3J5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2x1Z1wiOiBcImNvbXB1dGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByZXR0eV9zbHVnXCI6IFwiQ29tcHV0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiSGQgY29tcHV0ZXIgd2FsbHBhcGVyc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3VidGl0bGVcIjogXCJEb3dubG9hZCBmcmVlIGNvbXB1dGVyIHdhbGxwYXBlcnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiQ2hvb3NlIGZyb20gYSBjdXJhdGVkIHNlbGVjdGlvbiBvZiBjb21wdXRlciB3YWxscGFwZXJzIGZvciB5b3VyIG1vYmlsZSBhbmQgZGVza3RvcCBzY3JlZW5zLiBBbHdheXMgZnJlZSBvbiBVbnNwbGFzaC5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGFfdGl0bGVcIjogXCJDb21wdXRlciBXYWxscGFwZXJzOiBGcmVlIEhEIERvd25sb2FkIFs1MDArIEhRXSB8IFVuc3BsYXNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXRhX2Rlc2NyaXB0aW9uXCI6IFwiQ2hvb3NlIGZyb20gaHVuZHJlZHMgb2YgZnJlZSBjb21wdXRlciB3YWxscGFwZXJzLiBEb3dubG9hZCBIRCB3YWxscGFwZXJzIGZvciBmcmVlIG9uIFVuc3BsYXNoLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY292ZXJfcGhvdG9cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwid3lFaW5EUlY4OElcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAxNi0xMS0xOFQyMTowMTo0MFpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMy0wNC0xN1QxNDowMTowN1pcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9tb3RlZF9hdFwiOiBcIjIwMTYtMTEtMThUMjE6MDE6NDBaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogNzk1MixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogNTMwNCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNjMGMwYzBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJibHVyX2hhc2hcIjogXCJMaEYkQ1M/YlJqUmp+cCVMVkBXQ1NpV1dXQm9mXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbHRfZGVzY3JpcHRpb25cIjogXCJ3b21hbiB0YWtpbmcgcGhvdG8gb2YgYnVpbGRpbmdzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXJsc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJhd1wiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDc5NTAyODA2OTkxLTI1MWM5NGJlNmIxNT9peGxpYj1yYi00LjAuM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmdWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0Nzk1MDI4MDY5OTEtMjUxYzk0YmU2YjE1P2l4bGliPXJiLTQuMC4zJnE9ODUmZm09anBnJmNyb3A9ZW50cm9weSZjcz1zcmdiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlZ3VsYXJcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ3OTUwMjgwNjk5MS0yNTFjOTRiZTZiMTU/aXhsaWI9cmItNC4wLjMmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0Nzk1MDI4MDY5OTEtMjUxYzk0YmU2YjE1P2l4bGliPXJiLTQuMC4zJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTQwMCZmaXQ9bWF4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRodW1iXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0Nzk1MDI4MDY5OTEtMjUxYzk0YmU2YjE1P2l4bGliPXJiLTQuMC4zJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTIwMCZmaXQ9bWF4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsX3MzXCI6IFwiaHR0cHM6Ly9zMy51cy13ZXN0LTIuYW1hem9uYXdzLmNvbS9pbWFnZXMudW5zcGxhc2guY29tL3NtYWxsL3Bob3RvLTE0Nzk1MDI4MDY5OTEtMjUxYzk0YmU2YjE1XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaW5rc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGZcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL3d5RWluRFJWODhJXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0bWxcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3Mvd3lFaW5EUlY4OElcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3Mvd3lFaW5EUlY4OEkvZG93bmxvYWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRfbG9jYXRpb25cIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL3d5RWluRFJWODhJL2Rvd25sb2FkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlc1wiOiA1NzYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZWRfYnlfdXNlclwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXJyZW50X3VzZXJfY29sbGVjdGlvbnNcIjogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvbnNvcnNoaXBcIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3BpY19zdWJtaXNzaW9uc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndhbGxwYXBlcnNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RhdHVzXCI6IFwiYXBwcm92ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcHJvdmVkX29uXCI6IFwiMjAyMC0wNC0wNlQxNDoyMDowOVpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByZW1pdW1cIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGx1c1wiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJXeWxFWms2ZTJ4QVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMy0wNC0xN1QxNTowMjowNVpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcm5hbWVcIjogXCJ0aG91Z2h0Y2F0YWxvZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiVGhvdWdodCBDYXRhbG9nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZpcnN0X25hbWVcIjogXCJUaG91Z2h0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhc3RfbmFtZVwiOiBcIkNhdGFsb2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHdpdHRlcl91c2VybmFtZVwiOiBcInRob3VnaHRjYXRhbG9nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvcnRmb2xpb191cmxcIjogXCJodHRwOi8vdGhvdWdodGNhdGFsb2cuY29tLz91dG1fY2FtcGFpZ249cGxhdGZvcm0tbGluayZ1dG1fc291cmNlPXVuc3BsYXNoJnV0bV9tZWRpdW09cHJvZmlsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiaW9cIjogXCJXZSdyZSBhIGRpZ2l0YWwgbWFnYXppbmUgYmFzZWQgaW4gQnJvb2tseW4uIFdlIHVzZSBVbnNwbGFzaCB0byBzaGFyZSB3aXRoIHRoZSB3b3JsZCBzb21lIG9mIG91ciBiZXN0IGluLWhvdXNlIHBob3RvZ3JhcGh5LlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsb2NhdGlvblwiOiBcIk5ldyBZb3JrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpbmtzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGZcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvdGhvdWdodGNhdGFsb2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0bWxcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9AdGhvdWdodGNhdGFsb2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBob3Rvc1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy90aG91Z2h0Y2F0YWxvZy9waG90b3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VzXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3Rob3VnaHRjYXRhbG9nL2xpa2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9cIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvdGhvdWdodGNhdGFsb2cvcG9ydGZvbGlvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb2xsb3dpbmdcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvdGhvdWdodGNhdGFsb2cvZm9sbG93aW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb2xsb3dlcnNcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvdGhvdWdodGNhdGFsb2cvZm9sbG93ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVfaW1hZ2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNDc5NTAyMzg1NjQ3LThhYTBkMGU5YTg3Yj9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9MzImaD0zMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVkaXVtXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTQ3OTUwMjM4NTY0Ny04YWEwZDBlOWE4N2I/aXhsaWI9cmItNC4wLjMmY3JvcD1mYWNlcyZmaXQ9Y3JvcCZ3PTY0Jmg9NjRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhcmdlXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTQ3OTUwMjM4NTY0Ny04YWEwZDBlOWE4N2I/aXhsaWI9cmItNC4wLjMmY3JvcD1mYWNlcyZmaXQ9Y3JvcCZ3PTEyOCZoPTEyOFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YWdyYW1fdXNlcm5hbWVcIjogXCJ0aG91Z2h0Y2F0YWxvZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9jb2xsZWN0aW9uc1wiOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9saWtlc1wiOiAxMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfcGhvdG9zXCI6IDE3MyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNjZXB0ZWRfdG9zXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvcl9oaXJlXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNvY2lhbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YWdyYW1fdXNlcm5hbWVcIjogXCJ0aG91Z2h0Y2F0YWxvZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvX3VybFwiOiBcImh0dHA6Ly90aG91Z2h0Y2F0YWxvZy5jb20vP3V0bV9jYW1wYWlnbj1wbGF0Zm9ybS1saW5rJnV0bV9zb3VyY2U9dW5zcGxhc2gmdXRtX21lZGl1bT1wcm9maWxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0d2l0dGVyX3VzZXJuYW1lXCI6IFwidGhvdWdodGNhdGFsb2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBheXBhbF9lbWFpbFwiOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcImVsZWN0cm9uaWNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIlVYTlhJdGF5R21vXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0wNi0wNlQxNDoyMToxMVpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIzLTA0LTIxVDIxOjEyOjE2WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvbW90ZWRfYXRcIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IDM5OTksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogMjY2NixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2Q5ZDlkOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmx1cl9oYXNoXCI6IFwiTGxPRG5JfnFXQmpAP3ZJVW96dDdJVm9maltNe1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFsdF9kZXNjcmlwdGlvblwiOiBcImJsYWNrIGFuZCBzaWx2ZXIgbGFwdG9wIGNvbXB1dGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cmxzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyYXdcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU5MTQ1MzA4OTM0My05ZWU1ZTRhYzdlMmQ/aXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHczZkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNeiZpeGxpYj1yYi00LjAuM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZ1bGxcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU5MTQ1MzA4OTM0My05ZWU1ZTRhYzdlMmQ/Y3JvcD1lbnRyb3B5JmNzPXNyZ2ImZm09anBnJml4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3M2ZIeG1kVzVqZEdsdmJuTjhaVzU4TUh4OGZId3hOamd5TVRjNU9UTXomaXhsaWI9cmItNC4wLjMmcT04NVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlZ3VsYXJcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU5MTQ1MzA4OTM0My05ZWU1ZTRhYzdlMmQ/Y3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJmZpdD1tYXgmZm09anBnJml4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3M2ZIeG1kVzVqZEdsdmJuTjhaVzU4TUh4OGZId3hOamd5TVRjNU9UTXomaXhsaWI9cmItNC4wLjMmcT04MCZ3PTEwODBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbFwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTkxNDUzMDg5MzQzLTllZTVlNGFjN2UyZD9jcm9wPWVudHJvcHkmY3M9dGlueXNyZ2ImZml0PW1heCZmbT1qcGcmaXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHczZkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNeiZpeGxpYj1yYi00LjAuMyZxPTgwJnc9NDAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGh1bWJcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU5MTQ1MzA4OTM0My05ZWU1ZTRhYzdlMmQ/Y3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJmZpdD1tYXgmZm09anBnJml4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3M2ZIeG1kVzVqZEdsdmJuTjhaVzU4TUh4OGZId3hOamd5TVRjNU9UTXomaXhsaWI9cmItNC4wLjMmcT04MCZ3PTIwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsX3MzXCI6IFwiaHR0cHM6Ly9zMy51cy13ZXN0LTIuYW1hem9uYXdzLmNvbS9pbWFnZXMudW5zcGxhc2guY29tL3NtYWxsL3Bob3RvLTE1OTE0NTMwODkzNDMtOWVlNWU0YWM3ZTJkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlua3NcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGZcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL1VYTlhJdGF5R21vXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHRtbFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9VWE5YSXRheUdtb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRvd25sb2FkXCI6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL1VYTlhJdGF5R21vL2Rvd25sb2FkP2l4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3M2ZIeG1kVzVqZEdsdmJuTjhaVzU4TUh4OGZId3hOamd5TVRjNU9UTXpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZF9sb2NhdGlvblwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvVVhOWEl0YXlHbW8vZG93bmxvYWQ/aXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHczZkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNelwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VzXCI6IDI0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZWRfYnlfdXNlclwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImN1cnJlbnRfdXNlcl9jb2xsZWN0aW9uc1wiOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwb25zb3JzaGlwXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3BpY19zdWJtaXNzaW9uc1wiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiX1g0cVR5UWRGcXdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMy0wNC0xMVQxODoxMTowOVpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiBcIm1hcmt1c3dpbmtsZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiTWFya3VzIFdpbmtsZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmaXJzdF9uYW1lXCI6IFwiTWFya3VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFzdF9uYW1lXCI6IFwiV2lua2xlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR3aXR0ZXJfdXNlcm5hbWVcIjogXCJtYXJrdXN3aW5rbGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvX3VybFwiOiBcImh0dHBzOi8vdmlhcmFtaS5jb21cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiaW9cIjogXCJQaG90b2dyYXBoZXIgZnJvbSBHZXJtYW55IFxcclxcbklmIHlvdSB3YW50LCB5b3UgY2FuIGJvb2sgbWUhIPCfk65oZWxsb0B2aWFyYW1pLmNvbSBJIEFsc28gaW50ZXJlc3RlZCBob3cgeW91IGFyZSB1c2luZyBteSBwaG90b3MsIGxldCBtZSBrbm93IVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxvY2F0aW9uXCI6IFwiR2VybWFueVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpbmtzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZlwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9tYXJrdXN3aW5rbGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0bWxcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9AbWFya3Vzd2lua2xlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwaG90b3NcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvbWFya3Vzd2lua2xlci9waG90b3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZXNcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvbWFya3Vzd2lua2xlci9saWtlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9cIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvbWFya3Vzd2lua2xlci9wb3J0Zm9saW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9sbG93aW5nXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL21hcmt1c3dpbmtsZXIvZm9sbG93aW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbGxvd2Vyc1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9tYXJrdXN3aW5rbGVyL2ZvbGxvd2Vyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZV9pbWFnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTU2Mjk0Nzc5MzI0Ni02ZjFjY2Y5MzgzY2Y/aXhsaWI9cmItNC4wLjMmY3JvcD1mYWNlcyZmaXQ9Y3JvcCZ3PTMyJmg9MzJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVkaXVtXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTU2Mjk0Nzc5MzI0Ni02ZjFjY2Y5MzgzY2Y/aXhsaWI9cmItNC4wLjMmY3JvcD1mYWNlcyZmaXQ9Y3JvcCZ3PTY0Jmg9NjRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTYyOTQ3NzkzMjQ2LTZmMWNjZjkzODNjZj9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9MTI4Jmg9MTI4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YWdyYW1fdXNlcm5hbWVcIjogXCJtMjNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9jb2xsZWN0aW9uc1wiOiAyNzgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfbGlrZXNcIjogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9waG90b3NcIjogMzY3OSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY2NlcHRlZF90b3NcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JfaGlyZVwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNvY2lhbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluc3RhZ3JhbV91c2VybmFtZVwiOiBcIm0yM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9fdXJsXCI6IFwiaHR0cHM6Ly92aWFyYW1pLmNvbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0d2l0dGVyX3VzZXJuYW1lXCI6IFwibWFya3Vzd2lua2xlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXlwYWxfZW1haWxcIjogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhZ3NcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJsYW5kaW5nX3BhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJncmV5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNvdXJjZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbmNlc3RyeVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNsdWdcIjogXCJ3YWxscGFwZXJzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByZXR0eV9zbHVnXCI6IFwiSEQgV2FsbHBhcGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbHVnXCI6IFwiY29sb3JzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByZXR0eV9zbHVnXCI6IFwiQ29sb3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YmNhdGVnb3J5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2x1Z1wiOiBcImdyZXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldHR5X3NsdWdcIjogXCJHcmV5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkhkIGdyZXkgd2FsbHBhcGVyc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3VidGl0bGVcIjogXCJEb3dubG9hZCBmcmVlIGdyZXkgd2FsbHBhcGVyc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJDaG9vc2UgZnJvbSBhIGN1cmF0ZWQgc2VsZWN0aW9uIG9mIGdyZXkgd2FsbHBhcGVycyBmb3IgeW91ciBtb2JpbGUgYW5kIGRlc2t0b3Agc2NyZWVucy4gQWx3YXlzIGZyZWUgb24gVW5zcGxhc2guXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXRhX3RpdGxlXCI6IFwiR3JleSBXYWxscGFwZXJzOiBGcmVlIEhEIERvd25sb2FkIFs1MDArIEhRXSB8IFVuc3BsYXNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXRhX2Rlc2NyaXB0aW9uXCI6IFwiQ2hvb3NlIGZyb20gaHVuZHJlZHMgb2YgZnJlZSBncmV5IHdhbGxwYXBlcnMuIERvd25sb2FkIEhEIHdhbGxwYXBlcnMgZm9yIGZyZWUgb24gVW5zcGxhc2guXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb3Zlcl9waG90b1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJjdFhmMUdWeWY5QVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDE4LTA5LTEwVDA4OjA1OjU1WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIzLTA0LTE3VDE4OjA0OjUwWlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb21vdGVkX2F0XCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogNTMwNCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogNzk1MixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNhNmE2YTZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJibHVyX2hhc2hcIjogXCJMM0lZRk5JVTAwfnEtO017Uip0ODBLdFJJVU17XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJPbGQgc3RvbmUgYmFja2dyb3VuZCB0ZXh0dXJlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWx0X2Rlc2NyaXB0aW9uXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXJsc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJhd1wiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTM2NTY2NDgyNjgwLWZjYTMxOTMwYTBiZD9peGxpYj1yYi00LjAuM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmdWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MzY1NjY0ODI2ODAtZmNhMzE5MzBhMGJkP2l4bGliPXJiLTQuMC4zJnE9ODUmZm09anBnJmNyb3A9ZW50cm9weSZjcz1zcmdiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlZ3VsYXJcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUzNjU2NjQ4MjY4MC1mY2EzMTkzMGEwYmQ/aXhsaWI9cmItNC4wLjMmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MzY1NjY0ODI2ODAtZmNhMzE5MzBhMGJkP2l4bGliPXJiLTQuMC4zJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTQwMCZmaXQ9bWF4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRodW1iXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MzY1NjY0ODI2ODAtZmNhMzE5MzBhMGJkP2l4bGliPXJiLTQuMC4zJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTIwMCZmaXQ9bWF4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsX3MzXCI6IFwiaHR0cHM6Ly9zMy51cy13ZXN0LTIuYW1hem9uYXdzLmNvbS9pbWFnZXMudW5zcGxhc2guY29tL3NtYWxsL3Bob3RvLTE1MzY1NjY0ODI2ODAtZmNhMzE5MzBhMGJkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaW5rc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGZcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL2N0WGYxR1Z5ZjlBXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0bWxcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvY3RYZjFHVnlmOUFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvY3RYZjFHVnlmOUEvZG93bmxvYWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRfbG9jYXRpb25cIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL2N0WGYxR1Z5ZjlBL2Rvd25sb2FkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlc1wiOiAxODc3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VkX2J5X3VzZXJcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3VycmVudF91c2VyX2NvbGxlY3Rpb25zXCI6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwb25zb3JzaGlwXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG9waWNfc3VibWlzc2lvbnNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0dXJlcy1wYXR0ZXJuc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGF0dXNcIjogXCJhcHByb3ZlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwcm92ZWRfb25cIjogXCIyMDIwLTA0LTA2VDE0OjIwOjExWlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJlbWl1bVwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwbHVzXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIklGY0VoSnFlbTBRXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIzLTA0LTE4VDAwOjE4OjQ2WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiBcImFubmllc3ByYXR0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJBbm5pZSBTcHJhdHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmlyc3RfbmFtZVwiOiBcIkFubmllXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhc3RfbmFtZVwiOiBcIlNwcmF0dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0d2l0dGVyX3VzZXJuYW1lXCI6IFwiYW5uaWVzcHJhdHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvX3VybFwiOiBcImh0dHBzOi8vd3d3LmFubmllc3ByYXR0LmNvbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiaW9cIjogXCJQaG90b2dyYXBoZXIgZnJvbSBFbmdsYW5kLCBzaGFyaW5nIG15IGRpZ2l0YWwsIGZpbG0gKyB2aW50YWdlIHNsaWRlIHNjYW5zLiAgXFxyXFxuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxvY2F0aW9uXCI6IFwiTmV3IEZvcmVzdCBOYXRpb25hbCBQYXJrLCBVS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaW5rc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxmXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2Fubmllc3ByYXR0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJodG1sXCI6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vQGFubmllc3ByYXR0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwaG90b3NcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvYW5uaWVzcHJhdHQvcGhvdG9zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlc1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9hbm5pZXNwcmF0dC9saWtlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2Fubmllc3ByYXR0L3BvcnRmb2xpb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9sbG93aW5nXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2Fubmllc3ByYXR0L2ZvbGxvd2luZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9sbG93ZXJzXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2Fubmllc3ByYXR0L2ZvbGxvd2Vyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlX2ltYWdlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTY0ODgyODgwNjIyMy0xODUyZjcwNGM1OGFpbWFnZT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9MzImaD0zMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVkaXVtXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTY0ODgyODgwNjIyMy0xODUyZjcwNGM1OGFpbWFnZT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9NjQmaD02NFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNjQ4ODI4ODA2MjIzLTE4NTJmNzA0YzU4YWltYWdlP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz0xMjgmaD0xMjhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5zdGFncmFtX3VzZXJuYW1lXCI6IFwiYW5uaWVzcHJhdHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfY29sbGVjdGlvbnNcIjogMTUxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9saWtlc1wiOiAxNDQ0NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfcGhvdG9zXCI6IDE3ODQzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY2NlcHRlZF90b3NcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9yX2hpcmVcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNvY2lhbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YWdyYW1fdXNlcm5hbWVcIjogXCJhbm5pZXNwcmF0dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvX3VybFwiOiBcImh0dHBzOi8vd3d3LmFubmllc3ByYXR0LmNvbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHdpdHRlcl91c2VybmFtZVwiOiBcImFubmllc3ByYXR0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXlwYWxfZW1haWxcIjogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwicGFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCI4NmIwR1c3YUxVd1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMTctMTAtMjVUMDg6NDg6NDRaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMy0wNC0yMlQwODo0MDowMFpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb21vdGVkX2F0XCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiA1MTg0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IDM0NTYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM1OTU5NTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJsdXJfaGFzaFwiOiBcIkw5REo2Wn5XSTk4XkRoeHV0UiVmP2JveW9nV0JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiQ29kaW5nIFNjcmVlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWx0X2Rlc2NyaXB0aW9uXCI6IFwicGhvdG8gb2YgY29tcHV0ZXIgbW9uaXRvciBkaXNwbGF5aW5nIHByb2dyYW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVybHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJhd1wiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTA4OTIxMjM0MTcyLWI2OGVkMzM1YjNlNj9peGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFIdzRmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16Jml4bGliPXJiLTQuMC4zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZnVsbFwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTA4OTIxMjM0MTcyLWI2OGVkMzM1YjNlNj9jcm9wPWVudHJvcHkmY3M9c3JnYiZmbT1qcGcmaXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHc0Zkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNeiZpeGxpYj1yYi00LjAuMyZxPTg1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVndWxhclwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTA4OTIxMjM0MTcyLWI2OGVkMzM1YjNlNj9jcm9wPWVudHJvcHkmY3M9dGlueXNyZ2ImZml0PW1heCZmbT1qcGcmaXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHc0Zkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNeiZpeGxpYj1yYi00LjAuMyZxPTgwJnc9MTA4MFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MDg5MjEyMzQxNzItYjY4ZWQzMzViM2U2P2Nyb3A9ZW50cm9weSZjcz10aW55c3JnYiZmaXQ9bWF4JmZtPWpwZyZpeGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFIdzRmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16Jml4bGliPXJiLTQuMC4zJnE9ODAmdz00MDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aHVtYlwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTA4OTIxMjM0MTcyLWI2OGVkMzM1YjNlNj9jcm9wPWVudHJvcHkmY3M9dGlueXNyZ2ImZml0PW1heCZmbT1qcGcmaXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHc0Zkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNeiZpeGxpYj1yYi00LjAuMyZxPTgwJnc9MjAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxfczNcIjogXCJodHRwczovL3MzLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tL2ltYWdlcy51bnNwbGFzaC5jb20vc21hbGwvcGhvdG8tMTUwODkyMTIzNDE3Mi1iNjhlZDMzNWIzZTZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaW5rc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZlwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvODZiMEdXN2FMVXdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJodG1sXCI6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zLzg2YjBHVzdhTFV3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvODZiMEdXN2FMVXcvZG93bmxvYWQ/aXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHc0Zkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNelwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRvd25sb2FkX2xvY2F0aW9uXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy84NmIwR1c3YUxVdy9kb3dubG9hZD9peGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFIdzRmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZXNcIjogMzU3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZWRfYnlfdXNlclwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImN1cnJlbnRfdXNlcl9jb2xsZWN0aW9uc1wiOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwb25zb3JzaGlwXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3BpY19zdWJtaXNzaW9uc1wiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwieVVqc1VaY1huZWdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMy0wNC0yMlQxMjoxNjo1NVpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiBcImJ1Z3NzdGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlRhcmFzIFNoeXBrYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZpcnN0X25hbWVcIjogXCJUYXJhc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhc3RfbmFtZVwiOiBcIlNoeXBrYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR3aXR0ZXJfdXNlcm5hbWVcIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9fdXJsXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmlvXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibG9jYXRpb25cIjogXCJEbmlwcm8sIFVrcmFpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaW5rc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGZcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvYnVnc3N0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHRtbFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL0BidWdzc3RlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwaG90b3NcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvYnVnc3N0ZXIvcGhvdG9zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VzXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2J1Z3NzdGVyL2xpa2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvcnRmb2xpb1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9idWdzc3Rlci9wb3J0Zm9saW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9sbG93aW5nXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2J1Z3NzdGVyL2ZvbGxvd2luZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb2xsb3dlcnNcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvYnVnc3N0ZXIvZm9sbG93ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlX2ltYWdlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNjAxNDU1Mzc0NDIwLWYwNzk5NWY4YzdiMGltYWdlP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz0zMiZoPTMyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1lZGl1bVwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE2MDE0NTUzNzQ0MjAtZjA3OTk1ZjhjN2IwaW1hZ2U/aXhsaWI9cmItNC4wLjMmY3JvcD1mYWNlcyZmaXQ9Y3JvcCZ3PTY0Jmg9NjRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNjAxNDU1Mzc0NDIwLWYwNzk5NWY4YzdiMGltYWdlP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz0xMjgmaD0xMjhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluc3RhZ3JhbV91c2VybmFtZVwiOiBcImJ1Z3NzdGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfY29sbGVjdGlvbnNcIjogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9saWtlc1wiOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Bob3Rvc1wiOiA2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjY2VwdGVkX3Rvc1wiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvcl9oaXJlXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNvY2lhbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluc3RhZ3JhbV91c2VybmFtZVwiOiBcImJ1Z3NzdGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvcnRmb2xpb191cmxcIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHdpdHRlcl91c2VybmFtZVwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXlwYWxfZW1haWxcIjogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhZ3NcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJsYW5kaW5nX3BhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJjb21wdXRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzb3VyY2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYW5jZXN0cnlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbHVnXCI6IFwid2FsbHBhcGVyc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV0dHlfc2x1Z1wiOiBcIkhEIFdhbGxwYXBlcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNhdGVnb3J5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2x1Z1wiOiBcImRlc2t0b3BcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldHR5X3NsdWdcIjogXCJEZXNrdG9wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJjYXRlZ29yeVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNsdWdcIjogXCJjb21wdXRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV0dHlfc2x1Z1wiOiBcIkNvbXB1dGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkhkIGNvbXB1dGVyIHdhbGxwYXBlcnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YnRpdGxlXCI6IFwiRG93bmxvYWQgZnJlZSBjb21wdXRlciB3YWxscGFwZXJzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIkNob29zZSBmcm9tIGEgY3VyYXRlZCBzZWxlY3Rpb24gb2YgY29tcHV0ZXIgd2FsbHBhcGVycyBmb3IgeW91ciBtb2JpbGUgYW5kIGRlc2t0b3Agc2NyZWVucy4gQWx3YXlzIGZyZWUgb24gVW5zcGxhc2guXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXRhX3RpdGxlXCI6IFwiQ29tcHV0ZXIgV2FsbHBhcGVyczogRnJlZSBIRCBEb3dubG9hZCBbNTAwKyBIUV0gfCBVbnNwbGFzaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YV9kZXNjcmlwdGlvblwiOiBcIkNob29zZSBmcm9tIGh1bmRyZWRzIG9mIGZyZWUgY29tcHV0ZXIgd2FsbHBhcGVycy4gRG93bmxvYWQgSEQgd2FsbHBhcGVycyBmb3IgZnJlZSBvbiBVbnNwbGFzaC5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvdmVyX3Bob3RvXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcInd5RWluRFJWODhJXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMTYtMTEtMThUMjE6MDE6NDBaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjMtMDQtMTdUMTQ6MDE6MDdaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvbW90ZWRfYXRcIjogXCIyMDE2LTExLTE4VDIxOjAxOjQwWlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IDc5NTIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IDUzMDQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYzBjMGMwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmx1cl9oYXNoXCI6IFwiTGhGJENTP2JSalJqfnAlTFZAV0NTaVdXV0JvZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWx0X2Rlc2NyaXB0aW9uXCI6IFwid29tYW4gdGFraW5nIHBob3RvIG9mIGJ1aWxkaW5nc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVybHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyYXdcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ3OTUwMjgwNjk5MS0yNTFjOTRiZTZiMTU/aXhsaWI9cmItNC4wLjNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZnVsbFwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDc5NTAyODA2OTkxLTI1MWM5NGJlNmIxNT9peGxpYj1yYi00LjAuMyZxPTg1JmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9c3JnYlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWd1bGFyXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0Nzk1MDI4MDY5OTEtMjUxYzk0YmU2YjE1P2l4bGliPXJiLTQuMC4zJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTEwODAmZml0PW1heFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbFwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDc5NTAyODA2OTkxLTI1MWM5NGJlNmIxNT9peGxpYj1yYi00LjAuMyZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz00MDAmZml0PW1heFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aHVtYlwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDc5NTAyODA2OTkxLTI1MWM5NGJlNmIxNT9peGxpYj1yYi00LjAuMyZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0yMDAmZml0PW1heFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbF9zM1wiOiBcImh0dHBzOi8vczMudXMtd2VzdC0yLmFtYXpvbmF3cy5jb20vaW1hZ2VzLnVuc3BsYXNoLmNvbS9zbWFsbC9waG90by0xNDc5NTAyODA2OTkxLTI1MWM5NGJlNmIxNVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlua3NcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxmXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy93eUVpbkRSVjg4SVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJodG1sXCI6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL3d5RWluRFJWODhJXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRvd25sb2FkXCI6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL3d5RWluRFJWODhJL2Rvd25sb2FkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRvd25sb2FkX2xvY2F0aW9uXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy93eUVpbkRSVjg4SS9kb3dubG9hZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZXNcIjogNTc2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VkX2J5X3VzZXJcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3VycmVudF91c2VyX2NvbGxlY3Rpb25zXCI6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwb25zb3JzaGlwXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG9waWNfc3VibWlzc2lvbnNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3YWxscGFwZXJzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBcImFwcHJvdmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHByb3ZlZF9vblwiOiBcIjIwMjAtMDQtMDZUMTQ6MjA6MDlaXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmVtaXVtXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBsdXNcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiV3lsRVprNmUyeEFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjMtMDQtMTdUMTU6MDI6MDVaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJuYW1lXCI6IFwidGhvdWdodGNhdGFsb2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlRob3VnaHQgQ2F0YWxvZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmaXJzdF9uYW1lXCI6IFwiVGhvdWdodFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXN0X25hbWVcIjogXCJDYXRhbG9nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR3aXR0ZXJfdXNlcm5hbWVcIjogXCJ0aG91Z2h0Y2F0YWxvZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9fdXJsXCI6IFwiaHR0cDovL3Rob3VnaHRjYXRhbG9nLmNvbS8/dXRtX2NhbXBhaWduPXBsYXRmb3JtLWxpbmsmdXRtX3NvdXJjZT11bnNwbGFzaCZ1dG1fbWVkaXVtPXByb2ZpbGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmlvXCI6IFwiV2UncmUgYSBkaWdpdGFsIG1hZ2F6aW5lIGJhc2VkIGluIEJyb29rbHluLiBXZSB1c2UgVW5zcGxhc2ggdG8gc2hhcmUgd2l0aCB0aGUgd29ybGQgc29tZSBvZiBvdXIgYmVzdCBpbi1ob3VzZSBwaG90b2dyYXBoeS5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibG9jYXRpb25cIjogXCJOZXcgWW9ya1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaW5rc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxmXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3Rob3VnaHRjYXRhbG9nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJodG1sXCI6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vQHRob3VnaHRjYXRhbG9nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwaG90b3NcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvdGhvdWdodGNhdGFsb2cvcGhvdG9zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlc1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy90aG91Z2h0Y2F0YWxvZy9saWtlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3Rob3VnaHRjYXRhbG9nL3BvcnRmb2xpb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9sbG93aW5nXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3Rob3VnaHRjYXRhbG9nL2ZvbGxvd2luZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9sbG93ZXJzXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3Rob3VnaHRjYXRhbG9nL2ZvbGxvd2Vyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlX2ltYWdlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTQ3OTUwMjM4NTY0Ny04YWEwZDBlOWE4N2I/aXhsaWI9cmItNC4wLjMmY3JvcD1mYWNlcyZmaXQ9Y3JvcCZ3PTMyJmg9MzJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1lZGl1bVwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE0Nzk1MDIzODU2NDctOGFhMGQwZTlhODdiP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz02NCZoPTY0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXJnZVwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE0Nzk1MDIzODU2NDctOGFhMGQwZTlhODdiP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz0xMjgmaD0xMjhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5zdGFncmFtX3VzZXJuYW1lXCI6IFwidGhvdWdodGNhdGFsb2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfY29sbGVjdGlvbnNcIjogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfbGlrZXNcIjogMTIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Bob3Rvc1wiOiAxNzMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjY2VwdGVkX3Rvc1wiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JfaGlyZVwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzb2NpYWxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5zdGFncmFtX3VzZXJuYW1lXCI6IFwidGhvdWdodGNhdGFsb2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvcnRmb2xpb191cmxcIjogXCJodHRwOi8vdGhvdWdodGNhdGFsb2cuY29tLz91dG1fY2FtcGFpZ249cGxhdGZvcm0tbGluayZ1dG1fc291cmNlPXVuc3BsYXNoJnV0bV9tZWRpdW09cHJvZmlsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHdpdHRlcl91c2VybmFtZVwiOiBcInRob3VnaHRjYXRhbG9nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXlwYWxfZW1haWxcIjogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJsYW5kaW5nX3BhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJzY3JlZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic291cmNlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFuY2VzdHJ5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2x1Z1wiOiBcIndhbGxwYXBlcnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldHR5X3NsdWdcIjogXCJIRCBXYWxscGFwZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXRlZ29yeVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNsdWdcIjogXCJzY3JlZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldHR5X3NsdWdcIjogXCJTY3JlZW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiSGQgc2NyZWVuIHdhbGxwYXBlcnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YnRpdGxlXCI6IFwiRG93bmxvYWQgZnJlZSBzY3JlZW4gd2FsbHBhcGVyc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJDaG9vc2UgZnJvbSBhIGN1cmF0ZWQgc2VsZWN0aW9uIG9mIHNjcmVlbiB3YWxscGFwZXJzIGZvciB5b3VyIG1vYmlsZSBhbmQgZGVza3RvcCBzY3JlZW5zLiBBbHdheXMgZnJlZSBvbiBVbnNwbGFzaC5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGFfdGl0bGVcIjogXCJTY3JlZW4gV2FsbHBhcGVyczogRnJlZSBIRCBEb3dubG9hZCBbNTAwKyBIUV0gfCBVbnNwbGFzaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YV9kZXNjcmlwdGlvblwiOiBcIkNob29zZSBmcm9tIGh1bmRyZWRzIG9mIGZyZWUgc2NyZWVuIHdhbGxwYXBlcnMuIERvd25sb2FkIEhEIHdhbGxwYXBlcnMgZm9yIGZyZWUgb24gVW5zcGxhc2guXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb3Zlcl9waG90b1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJScFp4SFBpa1I2QVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDE4LTAyLTI4VDA1OjA0OjU1WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIzLTA0LTExVDAyOjAzOjI1WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb21vdGVkX2F0XCI6IFwiMjAxOC0wMi0yOFQxMzowNzozMFpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiAzMTYwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiAzOTQxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzI2MjY1OVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJsdXJfaGFzaFwiOiBcIkw5OGdtK3lHeHY/STVZSVNJOElUSkUlaHRtUyVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZSBCaWcgQXBwbGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbHRfZGVzY3JpcHRpb25cIjogXCJhZXJpYWwgcGhvdG8gb2YgYnJpZGdlIGR1cmluZyBuaWdodHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cmxzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmF3XCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTk3OTQyMDY0NjEtY2NjZDg4NWJmMjA5P2l4bGliPXJiLTQuMC4zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZ1bGxcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxOTc5NDIwNjQ2MS1jY2NkODg1YmYyMDk/aXhsaWI9cmItNC4wLjMmcT04NSZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXNyZ2JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVndWxhclwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE5Nzk0MjA2NDYxLWNjY2Q4ODViZjIwOT9peGxpYj1yYi00LjAuMyZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxOTc5NDIwNjQ2MS1jY2NkODg1YmYyMDk/aXhsaWI9cmItNC4wLjMmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9NDAwJmZpdD1tYXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGh1bWJcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxOTc5NDIwNjQ2MS1jY2NkODg1YmYyMDk/aXhsaWI9cmItNC4wLjMmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MjAwJmZpdD1tYXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxfczNcIjogXCJodHRwczovL3MzLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tL2ltYWdlcy51bnNwbGFzaC5jb20vc21hbGwvcGhvdG8tMTUxOTc5NDIwNjQ2MS1jY2NkODg1YmYyMDlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpbmtzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZlwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvUnBaeEhQaWtSNkFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHRtbFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9ScFp4SFBpa1I2QVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9ScFp4SFBpa1I2QS9kb3dubG9hZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZF9sb2NhdGlvblwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvUnBaeEhQaWtSNkEvZG93bmxvYWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VzXCI6IDUzNixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlZF9ieV91c2VyXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImN1cnJlbnRfdXNlcl9jb2xsZWN0aW9uc1wiOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcG9uc29yc2hpcFwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvcGljX3N1Ym1pc3Npb25zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2FsbHBhcGVyc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGF0dXNcIjogXCJhcHByb3ZlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwcm92ZWRfb25cIjogXCIyMDIwLTA0LTA2VDE0OjIwOjA5WlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJlbWl1bVwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwbHVzXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImNraHdyT2YyVzFjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIzLTA0LTA3VDIxOjAwOjQyWlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiBcInphY29uZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiWmFjIE9uZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmaXJzdF9uYW1lXCI6IFwiWmFjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhc3RfbmFtZVwiOiBcIk9uZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0d2l0dGVyX3VzZXJuYW1lXCI6IFwiWmFjX09uZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9fdXJsXCI6IFwiaHR0cHM6Ly96YWNvbmcud29yay9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmlvXCI6IFwiQSBNdWx0aWRpc2NpcGxpbmFyeSBDcmVhdGl2ZSBEaXJlY3RvciBhbmQgQXJ0aXN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxvY2F0aW9uXCI6IFwiU2luZ2Fwb3JlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpbmtzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGZcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvemFjb25nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJodG1sXCI6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vZGUvQHphY29uZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGhvdG9zXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3phY29uZy9waG90b3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpa2VzXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3phY29uZy9saWtlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3phY29uZy9wb3J0Zm9saW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbGxvd2luZ1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy96YWNvbmcvZm9sbG93aW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb2xsb3dlcnNcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvemFjb25nL2ZvbGxvd2Vyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlX2ltYWdlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTU3MTA4ODEyMDUyNi1hZWNmY2U0ZTM2MzJpbWFnZT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9MzImaD0zMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVkaXVtXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTU3MTA4ODEyMDUyNi1hZWNmY2U0ZTM2MzJpbWFnZT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9NjQmaD02NFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTcxMDg4MTIwNTI2LWFlY2ZjZTRlMzYzMmltYWdlP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz0xMjgmaD0xMjhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5zdGFncmFtX3VzZXJuYW1lXCI6IFwiemFjX29uZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9jb2xsZWN0aW9uc1wiOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9saWtlc1wiOiAxNDgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Bob3Rvc1wiOiA4OCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNjZXB0ZWRfdG9zXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvcl9oaXJlXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNvY2lhbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YWdyYW1fdXNlcm5hbWVcIjogXCJ6YWNfb25nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9fdXJsXCI6IFwiaHR0cHM6Ly96YWNvbmcud29yay9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR3aXR0ZXJfdXNlcm5hbWVcIjogXCJaYWNfT25nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXlwYWxfZW1haWxcIjogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJwb2dyYW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiQXhBUHVJUldIR2tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDE5LTExLTI2VDE3OjQ2OjU5WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjMtMDQtMjFUMTY6MDk6MzhaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9tb3RlZF9hdFwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogNDc0NCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiAzMTYyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNDA0MDQwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJibHVyX2hhc2hcIjogXCJMS0VmNHR+V25mOVpIcWpEP0g/YSUyUmpJVUlBXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIldlYiBkZXZlbG9wZXJzIHdvcmtpbmcuIFJlY2hlcmNoZSwgaWTDqWF0aW9uIGV0IGNvbmNlcHRpb24uXFxuTm90cmUgYXBwcm9jaGUgcGxhY2Ugdm9zIHV0aWxpc2F0ZXVycyBhdSBjZW50cmUgZGUgbOKAmWV4cMOpcmllbmNlIG51bcOpcmlxdWUgYWZpbiBkZSBmYXZvcmlzZXIgbGV1ciBlbmdhZ2VtZW50IGV0IGxlcyBpbmNpdGVyIMOgIHBhc3NlciDDoCBs4oCZYWN0aW9uLiBOb3VzIGRpc3Bvc29ucyBk4oCZdW5lIGJvw650ZSDDoCBvdXRpbHMgYWRhcHTDqWUgw6Agdm9zIGJlc29pbnMgYWZpbiBxdWUgbGUgdG91dCByZXBvc2Ugc3VyIGRlcyBiYXNlcyBzb2xpZGVzLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWx0X2Rlc2NyaXB0aW9uXCI6IFwibWFuIHdlYXJpbmcgYmxhY2sgZHJlc3Mgc2hpcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVybHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJhd1wiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTc0NzkwMzk4NjY0LTBjYjAzNjgyZWQxYz9peGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFIdzVmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16Jml4bGliPXJiLTQuMC4zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZnVsbFwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTc0NzkwMzk4NjY0LTBjYjAzNjgyZWQxYz9jcm9wPWVudHJvcHkmY3M9c3JnYiZmbT1qcGcmaXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHc1Zkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNeiZpeGxpYj1yYi00LjAuMyZxPTg1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVndWxhclwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTc0NzkwMzk4NjY0LTBjYjAzNjgyZWQxYz9jcm9wPWVudHJvcHkmY3M9dGlueXNyZ2ImZml0PW1heCZmbT1qcGcmaXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHc1Zkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNeiZpeGxpYj1yYi00LjAuMyZxPTgwJnc9MTA4MFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NzQ3OTAzOTg2NjQtMGNiMDM2ODJlZDFjP2Nyb3A9ZW50cm9weSZjcz10aW55c3JnYiZmaXQ9bWF4JmZtPWpwZyZpeGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFIdzVmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16Jml4bGliPXJiLTQuMC4zJnE9ODAmdz00MDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aHVtYlwiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTc0NzkwMzk4NjY0LTBjYjAzNjgyZWQxYz9jcm9wPWVudHJvcHkmY3M9dGlueXNyZ2ImZml0PW1heCZmbT1qcGcmaXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHc1Zkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNeiZpeGxpYj1yYi00LjAuMyZxPTgwJnc9MjAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxfczNcIjogXCJodHRwczovL3MzLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tL2ltYWdlcy51bnNwbGFzaC5jb20vc21hbGwvcGhvdG8tMTU3NDc5MDM5ODY2NC0wY2IwMzY4MmVkMWNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaW5rc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZlwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvQXhBUHVJUldIR2tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJodG1sXCI6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL0F4QVB1SVJXSEdrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvQXhBUHVJUldIR2svZG93bmxvYWQ/aXhpZD1NbncwTXpNNE5EVjhNSHd4ZkhObFlYSmphSHc1Zkh4bWRXNWpkR2x2Ym5OOFpXNThNSHg4Zkh3eE5qZ3lNVGM1T1RNelwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRvd25sb2FkX2xvY2F0aW9uXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9BeEFQdUlSV0hHay9kb3dubG9hZD9peGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFIdzVmSHhtZFc1amRHbHZibk44Wlc1OE1IeDhmSHd4TmpneU1UYzVPVE16XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZXNcIjogMTMwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZWRfYnlfdXNlclwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImN1cnJlbnRfdXNlcl9jb2xsZWN0aW9uc1wiOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwb25zb3JzaGlwXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3BpY19zdWJtaXNzaW9uc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYnVzaW5lc3Mtd29ya1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBcImFwcHJvdmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcHJvdmVkX29uXCI6IFwiMjAyMS0wMi0wM1QxODo1NTowM1pcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiYzJzQUFFOUJYcllcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMy0wNC0yMVQxNzoxMjo1OFpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiBcInNpZ211bmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiU2lnbXVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZpcnN0X25hbWVcIjogXCJTaWdtdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFzdF9uYW1lXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHdpdHRlcl91c2VybmFtZVwiOiBcInNpZ19fbXVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvcnRmb2xpb191cmxcIjogXCJodHRwczovL3NpZ211bmQuY2FcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiaW9cIjogXCJTaWdtdW5kIHLDqWFsaXNlIGRlcyBzb2x1dGlvbnMgbnVtw6lyaXF1ZXMgcXVpIGZvbnQgbGEgZGlmZsOpcmVuY2UuIG9udm91c2Vjb3V0ZUBzaWdtdW5kLmNhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibG9jYXRpb25cIjogXCJRdWViZWMsIENhbmFkYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpbmtzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZlwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9zaWdtdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0bWxcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9Ac2lnbXVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwaG90b3NcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvc2lnbXVuZC9waG90b3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZXNcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvc2lnbXVuZC9saWtlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9cIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvc2lnbXVuZC9wb3J0Zm9saW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9sbG93aW5nXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3NpZ211bmQvZm9sbG93aW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbGxvd2Vyc1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9zaWdtdW5kL2ZvbGxvd2Vyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZV9pbWFnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTU5MjU3NjEwNDgzOS0zNDYxZWZjZDU2MjRpbWFnZT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9MzImaD0zMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZWRpdW1cIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTkyNTc2MTA0ODM5LTM0NjFlZmNkNTYyNGltYWdlP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz02NCZoPTY0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhcmdlXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTU5MjU3NjEwNDgzOS0zNDYxZWZjZDU2MjRpbWFnZT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9MTI4Jmg9MTI4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YWdyYW1fdXNlcm5hbWVcIjogXCJzaWdfX211bmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9jb2xsZWN0aW9uc1wiOiAyOCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9saWtlc1wiOiA3MzksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfcGhvdG9zXCI6IDE2OTcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNjZXB0ZWRfdG9zXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9yX2hpcmVcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic29jaWFsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5zdGFncmFtX3VzZXJuYW1lXCI6IFwic2lnX19tdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvcnRmb2xpb191cmxcIjogXCJodHRwczovL3NpZ211bmQuY2FcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHdpdHRlcl91c2VybmFtZVwiOiBcInNpZ19fbXVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXlwYWxfZW1haWxcIjogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhZ3NcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJzaWdtdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiYm91bGV2YXJkIGNoYXJlc3QgZXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwicXXDqWJlY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJPMk1kcm9OdXJWd1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMTktMDQtMjJUMTc6MDU6MDdaXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMy0wNC0yMlQxMTo0NTowMVpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb21vdGVkX2F0XCI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiA1MTg0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IDM0NTYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMyNjI2MjZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJsdXJfaGFzaFwiOiBcIkw3NmxQanhWRFNhSC5sWiRNJHQxUS1NZW9meHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiV2hlbiBkZXZlbG9waW5nIG91ciB2ZXJ5IGZpcnN0IE1heW9zaXMgdGhlbWUgKGZvciBzZWxsaW5nIGRpZ2l0YWwgcHJvZHVjdHMgdGhyb3VnaCBXb3JkUHJlc3MpIEkgY2FwdHVyZWQgc29tZSBncmVhdCBsb29raW5nIHBpY3R1cmVzIG9uIG15IGlNYWMuIFRoZSA1MG1tIFByaW1lIGxlbnMgd2FzIGJlc3QgZm9yIHRoaXMgcGFydGljdWxhciBzaG90IHdpdGggaXQncyBiZWF1dGlmdWwgZGVwdGggb2YgZmllbGQgcmVuZGVyaW5nLiBMYXRlciwgSSBhZGRlZCBzb21lIGNvbG9yIGdyYWRpZW50IG92ZXJsYXkgYW5kIGFkanVzdGVkIHRoZSBsb29rIGFuZCBmZWVsIGluIExpZ2h0cm9vbSBhbmQgUGhvdG9zaG9wLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWx0X2Rlc2NyaXB0aW9uXCI6IFwiZ3JlZW4sIGJsdWUsIGFuZCB5ZWxsb3cgdGV4dCBvbiBjb21wdXRlciBzY3JlZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVybHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJhd1wiOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTU1OTUyNDk0LWVmZDY4MWM3ZTNmOT9peGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFId3hNSHg4Wm5WdVkzUnBiMjV6ZkdWdWZEQjhmSHg4TVRZNE1qRTNPVGt6TXcmaXhsaWI9cmItNC4wLjNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmdWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NTU5NTI0OTQtZWZkNjgxYzdlM2Y5P2Nyb3A9ZW50cm9weSZjcz1zcmdiJmZtPWpwZyZpeGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFId3hNSHg4Wm5WdVkzUnBiMjV6ZkdWdWZEQjhmSHg4TVRZNE1qRTNPVGt6TXcmaXhsaWI9cmItNC4wLjMmcT04NVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlZ3VsYXJcIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU1NTk1MjQ5NC1lZmQ2ODFjN2UzZjk/Y3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJmZpdD1tYXgmZm09anBnJml4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3eE1IeDhablZ1WTNScGIyNXpmR1Z1ZkRCOGZIeDhNVFk0TWpFM09Ua3pNdyZpeGxpYj1yYi00LjAuMyZxPTgwJnc9MTA4MFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NTU5NTI0OTQtZWZkNjgxYzdlM2Y5P2Nyb3A9ZW50cm9weSZjcz10aW55c3JnYiZmaXQ9bWF4JmZtPWpwZyZpeGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFId3hNSHg4Wm5WdVkzUnBiMjV6ZkdWdWZEQjhmSHg4TVRZNE1qRTNPVGt6TXcmaXhsaWI9cmItNC4wLjMmcT04MCZ3PTQwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRodW1iXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NTU5NTI0OTQtZWZkNjgxYzdlM2Y5P2Nyb3A9ZW50cm9weSZjcz10aW55c3JnYiZmaXQ9bWF4JmZtPWpwZyZpeGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFId3hNSHg4Wm5WdVkzUnBiMjV6ZkdWdWZEQjhmSHg4TVRZNE1qRTNPVGt6TXcmaXhsaWI9cmItNC4wLjMmcT04MCZ3PTIwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsX3MzXCI6IFwiaHR0cHM6Ly9zMy51cy13ZXN0LTIuYW1hem9uYXdzLmNvbS9pbWFnZXMudW5zcGxhc2guY29tL3NtYWxsL3Bob3RvLTE1NTU5NTI0OTQtZWZkNjgxYzdlM2Y5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlua3NcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGZcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL08yTWRyb051clZ3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHRtbFwiOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9PMk1kcm9OdXJWd1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRvd25sb2FkXCI6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL08yTWRyb051clZ3L2Rvd25sb2FkP2l4aWQ9TW53ME16TTRORFY4TUh3eGZITmxZWEpqYUh3eE1IeDhablZ1WTNScGIyNXpmR1Z1ZkRCOGZIeDhNVFk0TWpFM09Ua3pNd1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRvd25sb2FkX2xvY2F0aW9uXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9PMk1kcm9OdXJWdy9kb3dubG9hZD9peGlkPU1udzBNek00TkRWOE1Id3hmSE5sWVhKamFId3hNSHg4Wm5WdVkzUnBiMjV6ZkdWdWZEQjhmSHg4TVRZNE1qRTNPVGt6TXdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlc1wiOiAxOTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWtlZF9ieV91c2VyXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3VycmVudF91c2VyX2NvbGxlY3Rpb25zXCI6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvbnNvcnNoaXBcIjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvcGljX3N1Ym1pc3Npb25zXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJFZXBLelNKWGZvMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIzLTA0LTE5VDEzOjQzOjMxWlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJuYW1lXCI6IFwiaGlzaGFoYWRhdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJTaGFoYWRhdCBSYWhtYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmaXJzdF9uYW1lXCI6IFwiU2hhaGFkYXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXN0X25hbWVcIjogXCJSYWhtYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0d2l0dGVyX3VzZXJuYW1lXCI6IFwiSGlTaGFoYWRhdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBvcnRmb2xpb191cmxcIjogXCJodHRwczovL2dyYWRpZW50YS5pb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJpb1wiOiBcIlByb2R1Y3QgRGVzaWduZXIsIFBob3RvZ3JhcGhlciwgU3BlYWtlciAmIFBhc3NpdmUgSGFwcGluZXNzIEVhcm5lci4gV291bGQgbG92ZSB0byBzZWUgd2hhdCB5b3UgbWFkZSB3aXRoIG15IGltYWdlcyBvciBzZW5kIG1lc3NhZ2VzIGlmIEkgY2FuIGhlbHAgeW91IHdpdGggYW55IHByb2plY3QuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibG9jYXRpb25cIjogXCJEaGFrYSwgQmFuZ2xhZGVzaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpbmtzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZlwiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9oaXNoYWhhZGF0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0bWxcIjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9AaGlzaGFoYWRhdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwaG90b3NcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvaGlzaGFoYWRhdC9waG90b3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlrZXNcIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvaGlzaGFoYWRhdC9saWtlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3J0Zm9saW9cIjogXCJodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvaGlzaGFoYWRhdC9wb3J0Zm9saW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9sbG93aW5nXCI6IFwiaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2hpc2hhaGFkYXQvZm9sbG93aW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbGxvd2Vyc1wiOiBcImh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9oaXNoYWhhZGF0L2ZvbGxvd2Vyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZV9pbWFnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTY2NDE1OTkyNTE2Ni1kMGE5NmQxMTBiOWRpbWFnZT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9MzImaD0zMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZWRpdW1cIjogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNjY0MTU5OTI1MTY2LWQwYTk2ZDExMGI5ZGltYWdlP2l4bGliPXJiLTQuMC4zJmNyb3A9ZmFjZXMmZml0PWNyb3Amdz02NCZoPTY0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhcmdlXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTY2NDE1OTkyNTE2Ni1kMGE5NmQxMTBiOWRpbWFnZT9peGxpYj1yYi00LjAuMyZjcm9wPWZhY2VzJmZpdD1jcm9wJnc9MTI4Jmg9MTI4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YWdyYW1fdXNlcm5hbWVcIjogXCJoaXNoYWhhZGF0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfY29sbGVjdGlvbnNcIjogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9saWtlc1wiOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Bob3Rvc1wiOiAzNCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY2NlcHRlZF90b3NcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JfaGlyZVwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNvY2lhbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluc3RhZ3JhbV91c2VybmFtZVwiOiBcImhpc2hhaGFkYXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9ydGZvbGlvX3VybFwiOiBcImh0dHBzOi8vZ3JhZGllbnRhLmlvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR3aXR0ZXJfdXNlcm5hbWVcIjogXCJIaVNoYWhhZGF0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBheXBhbF9lbWFpbFwiOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFnc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJjb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiaHRtbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdzZW5kSW1nRGF0YScsICdzdGF0dXMnOiAnZW5kJywgJ2ltZ3MnOiBpbWdzIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyB1bnNwbGFzaFNlYXJjaFBob3RvcyhyZXN1bHRbJ3Vuc3BsYXNoQXBpS2V5J10sIG1zZy5rZXlXb3JkKS50aGVuKChpbWdzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhpbWdzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnc2VuZEltZ0RhdGEnLCAnc3RhdHVzJzogJ2VuZCcsICdpbWdzJzogaW1ncyB9KVxuICAgICAgICAgICAgICAgICAgICAvLyB9KS5jYXRjaCgoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnc2VuZEdQVERhdGEnLCAnc3RhdHVzJzogJ2JlZ2luJywgJ2NvbnRlbnQnOiAnJyB9KTtcbiAgICAgICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ3NlbmRHUFREYXRhJywgJ3N0YXR1cyc6ICdwcm9jZXNzJywgJ2NvbnRlbnQnOiBgJHtub3d9YCB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDgwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnc2VuZEdQVERhdGEnLCAnc3RhdHVzJzogJ3Byb2Nlc3MnLCAnY29udGVudCc6IFwiV1wiIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ3NlbmRHUFREYXRhJywgJ3N0YXR1cyc6ICdwcm9jZXNzJywgJ2NvbnRlbnQnOiBcIkVORFwiIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ3NlbmRHUFREYXRhJywgJ3N0YXR1cyc6ICdlbmQnLCAnY29udGVudCc6IFwiXCIgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQub3BlbkFwaUtleS5sZW5ndGggPCA1KSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdzZW5kR1BURGF0YScsICdzdGF0dXMnOiAnZXJybycsICdjb250ZW50JzogJ/CfpbIgQVBJIEtleSBlcnJvci4gUGxlYXNlIG1vZGlmeSBhbmQgdHJ5IGFnYWluLi4nIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZldGNoKCdodHRwczovL2FwaS5vcGVuYWkuY29tL3YxL2NoYXQvY29tcGxldGlvbnMnLCB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibW9kZWxcIjogXCJncHQtMy41LXR1cmJvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IG1lc3NhZ2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gXCJ0ZW1wZXJhdHVyZVwiOiAwLjgsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBcInRvcF9wXCI6IDAuOSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFwiZnJlcXVlbmN5X3BlbmFsdHlcIjogLTAuNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFwicHJlc2VuY2VfcGVuYWx0eVwiOiAwLjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBcInRlbXBlcmF0dXJlXCI6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBcIm1heF90b2tlbnNcIjo1MjAsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBcInRvcF9wXCI6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBcImZyZXF1ZW5jeV9wZW5hbHR5XCI6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBcInByZXNlbmNlX3BlbmFsdHlcIjogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGVtcGVyYXR1cmVcIjogMC43LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXhfdG9rZW5zXCI6IDQyMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG9wX3BcIjogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJlcXVlbmN5X3BlbmFsdHlcIjogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJlc2VuY2VfcGVuYWx0eVwiOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHJlYW1cIjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHJlc3VsdC5vcGVuQXBpS2V5LCAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCB9XG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdzZW5kR1BURGF0YScsICdzdGF0dXMnOiAnYmVnaW4nLCAnY29udGVudCc6ICcnIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFQSSBLRVkgRXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc0MDEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdzZW5kR1BURGF0YScsICdzdGF0dXMnOiAnZXJybycsICdjb250ZW50JzogJ/CfpbIgQVBJIEtleSBlcnJvci4gUGxlYXNlIG1vZGlmeSBhbmQgdHJ5IGFnYWluLi4nIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDQwMSAmJiByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gIEVycm9yXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnc2VuZEdQVERhdGEnLCAnc3RhdHVzJzogJ2Vycm8nLCAnY29udGVudCc6ICfwn6WyIEVuY291bnRlcmVkIHNvbWUgaXNzdWVzLCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyLicgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8g5aSE55CGIHNlcnZlci1zZW50IGV2ZW50c1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJzZXIgPSAoMCwgZXZlbnRzb3VyY2VfcGFyc2VyXzEuY3JlYXRlUGFyc2VyKSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSAnZXZlbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2NyZWF0ZVBhcnNlcjonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3X21zZyA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSlbJ2Nob2ljZXMnXVswXVsnZGVsdGEnXVsnY29udGVudCddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3X21zZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlsIbmlbDmja7lj5HpgIHnu5kgVUkg5Lul5riy5p+T5YaF5a65XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnc2VuZEdQVERhdGEnLCAnc3RhdHVzJzogJ3Byb2Nlc3MnLCAnY29udGVudCc6IEpTT04ucGFyc2UoZXZlbnQuZGF0YSlbJ2Nob2ljZXMnXVswXVsnZGVsdGEnXVsnY29udGVudCddIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnIGNyZWF0ZVBhcnNlciBKU09OLnBhcnNlIGVycm93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVhZGVyID0gKF9hID0gcmVzcG9uc2UuYm9keSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldFJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVhZGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IHlpZWxkIHJlYWRlci5yZWFkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmlbDmja7kvKDovpPnu5PmnZ9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEb25lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnc2VuZEdQVERhdGEnLCAnc3RhdHVzJzogJ2VuZCcsICdjb250ZW50JzogJycgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzQ29udGludWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflgZzmraLmuLLmn5PmlbDmja4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0ciA9IG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5mZWVkKHN0cik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnJlbGVhc2VMb2NrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdzZW5kR1BURGF0YScsICdzdGF0dXMnOiAnZXJybycsICdjb250ZW50JzogXCLwn6WyIEVuY291bnRlcmVkIHNvbWUgaXNzdWVzLCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyLlwiIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5YGc5q2i5riy5p+T5pWw5o2uXG4gICAgICAgIGlmIChtc2cudHlwZSA9PT0gJ3dpbmRvd0Nsb3NlZCcpIHtcbiAgICAgICAgICAgIGlzQ29udGludWUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pKTtcbn0pO1xud2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihoYW5kbGVNZXNzYWdlKTtcbmZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2UocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICBjb25zb2xlLmxvZyhcIk1lc3NhZ2UgZnJvbSB0aGUgY29udGVudCBzY3JpcHQ6IFwiICtcbiAgICAgICAgcmVxdWVzdC50eXBlKTtcbiAgICBpZiAocmVxdWVzdC50eXBlID09PSAnYWRkVG9BbmtpJykge1xuICAgICAgICBjb25zb2xlLmxvZygnYWRkVG9BbmtpJyk7XG4gICAgICAgIGNvbnN0IHAgPSByZXF1ZXN0Lm1lc3NhZ2VzO1xuICAgICAgICAvLyBEZWZpbmUgc2VuZFJlc3BvbnNlIGFzIGFuIGFzeW5jIGZ1bmN0aW9uXG4gICAgICAgIGNvbnN0IGFzeW5jU2VuZFJlc3BvbnNlID0gKHJlc3BvbnNlKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHNlbmRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICgwLCB1dGlsXzEuYW5raUFjdGlvbikoJ2FkZE5vdGUnLCA2LCBwKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBnb3QgbGlzdCBvZiBkZWNrczogJHtyZXN1bHR9YCk7XG4gICAgICAgICAgICAvLyDlj43ppojlpITnkIbnu5PmnpxcbiAgICAgICAgICAgIGFzeW5jU2VuZFJlc3BvbnNlKHsgdHlwZTogJ2FkZFRvQW5raScsIHJlc3VsdDogJ3N1Y2Nlc3MnLCBlcnJvcjogcmVzdWx0LmVycm9yIH0pO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICBhc3luY1NlbmRSZXNwb25zZSh7IHR5cGU6ICdhZGRUb0Fua2knLCByZXN1bHQ6ICdmYWlsdXJlJywgZXJyb3I6IGVycm9yLmVycm9yIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gUmV0dXJuIHRydWUgdG8gaW5mb3JtIHNlbmRSZXNwb25zZSB0aGF0IHlvdSB3aWxsIGJlIGNhbGxpbmcgaXQgYXN5bmNocm9ub3VzbHlcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVuc3BsYXNoU2VhcmNoUGhvdG9zID0gZXhwb3J0cy5hbmtpQWN0aW9uID0gdm9pZCAwO1xuY29uc3QgdW5zcGxhc2hfanNfMSA9IHJlcXVpcmUoXCJ1bnNwbGFzaC1qc1wiKTtcbi8vIOWwhuS/oeaBr+a3u+WKoOWIsCBBbmtpXG5mdW5jdGlvbiBhbmtpQWN0aW9uKGFjdGlvbiwgdmVyc2lvbiwgcGFyYW1zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBmZXRjaCgnaHR0cDovLzEyNy4wLjAuMTo4NzY1Jywge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgXCJhY3Rpb25cIjogYWN0aW9uLCBcInZlcnNpb25cIjogdmVyc2lvbiwgXCJwYXJhbXNcIjogcGFyYW1zIH0pXG4gICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICByZWplY3QoeyAncmVzdWx0JzogW10sICdlcnJvcic6ICdQbGVhc2Ugb3BlbiB0aGUgQW5raSBjbGllbnQgYW5kIGluc3RhbGwgdGhlIEFua2ktQ29ubmVjdCBwbHVnaW4gYmVmb3JlIHRyeWluZyBhZ2Fpbi4nIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuYW5raUFjdGlvbiA9IGFua2lBY3Rpb247XG5mdW5jdGlvbiB1bnNwbGFzaFNlYXJjaFBob3RvcyhBUElfS0VZLCBxdWVyeSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHVuc3BsYXNoID0gKDAsIHVuc3BsYXNoX2pzXzEuY3JlYXRlQXBpKSh7XG4gICAgICAgICAgICBhY2Nlc3NLZXk6IEFQSV9LRVksXG4gICAgICAgIH0pO1xuICAgICAgICB1bnNwbGFzaC5zZWFyY2guZ2V0UGhvdG9zKHtcbiAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgfSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGlmICgoKF9hID0gZGF0YS5yZXNwb25zZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlc3VsdHMubGVuZ3RoKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VVcmwgPSAoX2IgPSBkYXRhLnJlc3BvbnNlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucmVzdWx0c1swXS51cmxzLnJlZ3VsYXI7XG4gICAgICAgICAgICAgICAgLy8gY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiBpbWFnZVVybCB9KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKChfYyA9IGRhdGEucmVzcG9uc2UpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5yZXN1bHRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHMudW5zcGxhc2hTZWFyY2hQaG90b3MgPSB1bnNwbGFzaFNlYXJjaFBob3RvcztcbiIsImltcG9ydCB7IHBhcnNlIH0gZnJvbSAnY29udGVudC10eXBlJztcblxuZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbnZhciBjaGVja0lzU3RyaW5nID0gLyojX19QVVJFX18qL2dldFJlZmluZW1lbnQoZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUgOiBudWxsO1xufSk7XG52YXIgaXNEZWZpbmVkID0gZnVuY3Rpb24gaXNEZWZpbmVkKHgpIHtcbiAgcmV0dXJuIHggIT09IG51bGwgJiYgeCAhPT0gdW5kZWZpbmVkO1xufTtcbmZ1bmN0aW9uIGdldFJlZmluZW1lbnQoZ2V0Qikge1xuICByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gaXNEZWZpbmVkKGdldEIoYSkpO1xuICB9O1xufVxudmFyIGNoZWNrSXNOb25FbXB0eUFycmF5ID0gZnVuY3Rpb24gY2hlY2tJc05vbkVtcHR5QXJyYXkoYSkge1xuICByZXR1cm4gYS5sZW5ndGggPiAwO1xufTtcblxuLyoqIFRha2VzIGEgZGljdGlvbmFyeSBjb250YWluaW5nIG51bGxpc2ggdmFsdWVzIGFuZCByZXR1cm5zIGEgZGljdGlvbmFyeSBvZiBhbGwgdGhlIGRlZmluZWRcclxuICogKG5vbi1udWxsaXNoKSB2YWx1ZXMuXHJcbiAqL1xuXG52YXIgY29tcGFjdERlZmluZWQgPSBmdW5jdGlvbiBjb21wYWN0RGVmaW5lZChvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgIHZhciBfcmVmO1xuXG4gICAgdmFyIHZhbHVlID0gb2JqW2tleV07XG4gICAgcmV0dXJuIF9leHRlbmRzKHt9LCBhY2MsIGlzRGVmaW5lZCh2YWx1ZSkgPyAoX3JlZiA9IHt9LCBfcmVmW2tleV0gPSB2YWx1ZSwgX3JlZikgOiB7fSk7XG4gIH0sIHt9KTtcbn07XG5mdW5jdGlvbiBmbG93KCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgZm5zID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGZuc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHZhciBsZW4gPSBmbnMubGVuZ3RoIC0gMTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIHggPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIHhbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG5cbiAgICB2YXIgeSA9IGZuc1swXS5hcHBseSh0aGlzLCB4KTtcblxuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IGxlbjsgaSsrKSB7XG4gICAgICB5ID0gZm5zW2ldLmNhbGwodGhpcywgeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHk7XG4gIH07XG59XG5cbnZhciBjaGVja0lzT2JqZWN0ID0gLyojX19QVVJFX18qL2dldFJlZmluZW1lbnQoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gIHJldHVybiBpc0RlZmluZWQocmVzcG9uc2UpICYmIHR5cGVvZiByZXNwb25zZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkocmVzcG9uc2UpID8gcmVzcG9uc2UgOiBudWxsO1xufSk7XG52YXIgY2hlY2tJc0Vycm9ycyA9IC8qI19fUFVSRV9fKi9nZXRSZWZpbmVtZW50KGZ1bmN0aW9uIChlcnJvcnMpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoZXJyb3JzKSAmJiBlcnJvcnMuZXZlcnkoY2hlY2tJc1N0cmluZykgJiYgY2hlY2tJc05vbkVtcHR5QXJyYXkoZXJyb3JzKSA/IGVycm9ycyA6IG51bGw7XG59KTtcbnZhciBjaGVja0lzQXBpRXJyb3IgPSAvKiNfX1BVUkVfXyovZ2V0UmVmaW5lbWVudChmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgcmV0dXJuIGNoZWNrSXNPYmplY3QocmVzcG9uc2UpICYmICdlcnJvcnMnIGluIHJlc3BvbnNlICYmIGNoZWNrSXNFcnJvcnMocmVzcG9uc2UuZXJyb3JzKSA/IHtcbiAgICBlcnJvcnM6IHJlc3BvbnNlLmVycm9yc1xuICB9IDogbnVsbDtcbn0pO1xudmFyIGdldEVycm9yRm9yQmFkU3RhdHVzQ29kZSA9IGZ1bmN0aW9uIGdldEVycm9yRm9yQmFkU3RhdHVzQ29kZShqc29uUmVzcG9uc2UpIHtcbiAgaWYgKGNoZWNrSXNBcGlFcnJvcihqc29uUmVzcG9uc2UpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yczoganNvblJlc3BvbnNlLmVycm9ycyxcbiAgICAgIHNvdXJjZTogJ2FwaSdcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcnM6IFsnUmVzcG9uZGVkIHdpdGggYSBzdGF0dXMgY29kZSBvdXRzaWRlIHRoZSAyeHggcmFuZ2UsIGFuZCB0aGUgcmVzcG9uc2UgYm9keSBpcyBub3QgcmVjb2duaXNhYmxlLiddLFxuICAgICAgc291cmNlOiAnZGVjb2RpbmcnXG4gICAgfTtcbiAgfVxufTtcbnZhciBEZWNvZGluZ0Vycm9yID0gZnVuY3Rpb24gRGVjb2RpbmdFcnJvcihtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59O1xuXG52YXIgQ09OVEVOVF9UWVBFX1JFU1BPTlNFX0hFQURFUiA9ICdjb250ZW50LXR5cGUnO1xudmFyIENPTlRFTlRfVFlQRV9KU09OID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuXG52YXIgY2hlY2tJc0pzb25SZXNwb25zZSA9IGZ1bmN0aW9uIGNoZWNrSXNKc29uUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgdmFyIGNvbnRlbnRUeXBlSGVhZGVyID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoQ09OVEVOVF9UWVBFX1JFU1BPTlNFX0hFQURFUik7XG4gIHJldHVybiBpc0RlZmluZWQoY29udGVudFR5cGVIZWFkZXIpICYmIHBhcnNlKGNvbnRlbnRUeXBlSGVhZGVyKS50eXBlID09PSBDT05URU5UX1RZUEVfSlNPTjtcbn07XG4vKipcclxuICogTm90ZTogcmVzdHJpY3QgdGhlIHR5cGUgb2YgSlNPTiB0byBgQW55SnNvbmAgc28gdGhhdCBgYW55YCBkb2Vzbid0IGxlYWsgZG93bnN0cmVhbS5cclxuICovXG5cblxudmFyIGdldEpzb25SZXNwb25zZSA9IGZ1bmN0aW9uIGdldEpzb25SZXNwb25zZShyZXNwb25zZSkge1xuICBpZiAoY2hlY2tJc0pzb25SZXNwb25zZShyZXNwb25zZSkpIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKF9lcnIpIHtcbiAgICAgIHRocm93IG5ldyBEZWNvZGluZ0Vycm9yKCd1bmFibGUgdG8gcGFyc2UgSlNPTiByZXNwb25zZS4nKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRGVjb2RpbmdFcnJvcignZXhwZWN0ZWQgSlNPTiByZXNwb25zZSBmcm9tIHNlcnZlci4nKTtcbiAgfVxufTtcblxudmFyIGhhbmRsZUZldGNoUmVzcG9uc2UgPSBmdW5jdGlvbiBoYW5kbGVGZXRjaFJlc3BvbnNlKGhhbmRsZVJlc3BvbnNlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICByZXR1cm4gKHJlc3BvbnNlLm9rID8gaGFuZGxlUmVzcG9uc2Uoe1xuICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlXG4gICAgfSkudGhlbihmdW5jdGlvbiAoaGFuZGxlZFJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICByZXNwb25zZTogaGFuZGxlZFJlc3BvbnNlLFxuICAgICAgICBvcmlnaW5hbFJlc3BvbnNlOiByZXNwb25zZVxuICAgICAgfTtcbiAgICB9KSA6IGdldEpzb25SZXNwb25zZShyZXNwb25zZSkudGhlbihmdW5jdGlvbiAoanNvblJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gX2V4dGVuZHMoe1xuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgfSwgZ2V0RXJyb3JGb3JCYWRTdGF0dXNDb2RlKGpzb25SZXNwb25zZSksIHtcbiAgICAgICAgb3JpZ2luYWxSZXNwb25zZTogcmVzcG9uc2VcbiAgICAgIH0pO1xuICAgIH0pKVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgLyoqXHJcbiAgICAgICAqIFdlIHdhbnQgdG8gc2VwYXJhdGUgZXhwZWN0ZWQgZGVjb2RpbmcgZXJyb3JzIGZyb20gdW5rbm93biBvbmVzLiBXZSBkbyBzbyBieSB0aHJvd2luZyBhIGN1c3RvbVxyXG4gICAgICAgKiBgRGVjb2RpbmdFcnJvcmAgd2hlbmV2ZXIgd2UgZW5jb3VudGVyIG9uZSB3aXRoaW4gYGhhbmRsZUZldGNoUmVzcG9uc2VgIGFuZCBjYXRjaCB0aGVtIGFsbFxyXG4gICAgICAgKiBoZXJlLiBUaGlzIGFsbG93cyB1cyB0byBlYXNpbHkgaGFuZGxlIGFsbCBvZiB0aGVzZSBlcnJvcnMgYXQgb25jZS4gVW5leHBlY3RlZCBlcnJvcnMgYXJlIG5vdFxyXG4gICAgICAgKiBjYXVnaHQsIHNvIHRoYXQgdGhleSBidWJibGUgdXAgYW5kIGZhaWwgbG91ZGx5LlxyXG4gICAgICAgKlxyXG4gICAgICAgKiBOb3RlOiBJZGVhbGx5IHdlJ2QgdXNlIGFuIEVpdGhlciB0eXBlLCBidXQgdGhpcyBkb2VzIHRoZSBqb2Igd2l0aG91dCBpbnRyb2R1Y2luZyBkZXBlbmRlbmNpZXNcclxuICAgICAgICogbGlrZSBgZnAtdHNgLlxyXG4gICAgICAgKi9cbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERlY29kaW5nRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgIHNvdXJjZTogJ2RlY29kaW5nJyxcbiAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICBvcmlnaW5hbFJlc3BvbnNlOiByZXNwb25zZSxcbiAgICAgICAgICBlcnJvcnM6IFtlcnJvci5tZXNzYWdlXVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59O1xudmFyIGNhc3RSZXNwb25zZSA9IGZ1bmN0aW9uIGNhc3RSZXNwb25zZSgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gX3JlZi5yZXNwb25zZTtcbiAgICByZXR1cm4gZ2V0SnNvblJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgfTtcbn07XG5cbnZhciBhZGRRdWVyeVRvVXJsID0gZnVuY3Rpb24gYWRkUXVlcnlUb1VybChxdWVyeSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHVybCkge1xuICAgIE9iamVjdC5rZXlzKHF1ZXJ5KS5mb3JFYWNoKGZ1bmN0aW9uIChxdWVyeUtleSkge1xuICAgICAgcmV0dXJuIHVybC5zZWFyY2hQYXJhbXMuc2V0KHF1ZXJ5S2V5LCBxdWVyeVtxdWVyeUtleV0udG9TdHJpbmcoKSk7XG4gICAgfSk7XG4gIH07XG59O1xuXG52YXIgYWRkUGF0aG5hbWVUb1VybCA9IGZ1bmN0aW9uIGFkZFBhdGhuYW1lVG9VcmwocGF0aG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh1cmwpIHtcbiAgICAvLyBXaGVuIHRoZXJlIGlzIG5vIGV4aXN0aW5nIHBhdGhuYW1lLCB0aGUgdmFsdWUgaXMgYC9gLiBBcHBlbmRpbmcgd291bGQgZ2l2ZSB1cyBhIFVSTCB3aXRoIHR3b1xuICAgIC8vIGZvcndhcmQgc2xhc2hlcy4gVGhpcyBpcyB3aHkgd2UgcmVwbGFjZSB0aGUgdmFsdWUgaW4gdGhhdCBzY2VuYXJpby5cbiAgICBpZiAodXJsLnBhdGhuYW1lID09PSAnLycpIHtcbiAgICAgIHVybC5wYXRobmFtZSA9IHBhdGhuYW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwucGF0aG5hbWUgKz0gcGF0aG5hbWU7XG4gICAgfVxuICB9O1xufTtcblxudmFyIGJ1aWxkVXJsID0gZnVuY3Rpb24gYnVpbGRVcmwoX3JlZikge1xuICB2YXIgcGF0aG5hbWUgPSBfcmVmLnBhdGhuYW1lLFxuICAgICAgcXVlcnkgPSBfcmVmLnF1ZXJ5O1xuICByZXR1cm4gZnVuY3Rpb24gKGFwaVVybCkge1xuICAgIHZhciB1cmwgPSBuZXcgVVJMKGFwaVVybCk7XG4gICAgYWRkUGF0aG5hbWVUb1VybChwYXRobmFtZSkodXJsKTtcbiAgICBhZGRRdWVyeVRvVXJsKHF1ZXJ5KSh1cmwpO1xuICAgIHJldHVybiB1cmwudG9TdHJpbmcoKTtcbiAgfTtcbn07XG5cbnZhciBnZXRRdWVyeUZyb21TZWFyY2hQYXJhbXMgPSBmdW5jdGlvbiBnZXRRdWVyeUZyb21TZWFyY2hQYXJhbXMoc2VhcmNoUGFyYW1zKSB7XG4gIHZhciBxdWVyeSA9IHt9O1xuICBzZWFyY2hQYXJhbXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIHF1ZXJ5W2tleV0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiBxdWVyeTtcbn07XG5cbnZhciBwYXJzZVF1ZXJ5QW5kUGF0aG5hbWUgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5QW5kUGF0aG5hbWUodXJsKSB7XG4gIHZhciBfVVJMID0gbmV3IFVSTCh1cmwpLFxuICAgICAgcGF0aG5hbWUgPSBfVVJMLnBhdGhuYW1lLFxuICAgICAgc2VhcmNoUGFyYW1zID0gX1VSTC5zZWFyY2hQYXJhbXM7XG5cbiAgdmFyIHF1ZXJ5ID0gZ2V0UXVlcnlGcm9tU2VhcmNoUGFyYW1zKHNlYXJjaFBhcmFtcyk7XG4gIHJldHVybiB7XG4gICAgcXVlcnk6IHF1ZXJ5LFxuICAgIHBhdGhuYW1lOiBwYXRobmFtZSA9PT0gJy8nID8gdW5kZWZpbmVkIDogcGF0aG5hbWVcbiAgfTtcbn07XG5cbi8qKlxyXG4gKiBoZWxwZXIgdXNlZCB0byB0eXBlLWNoZWNrIHRoZSBhcmd1bWVudHMsIGFuZCBhZGQgZGVmYXVsdCBwYXJhbXMgZm9yIGFsbCByZXF1ZXN0c1xyXG4gKi9cblxudmFyIGNyZWF0ZVJlcXVlc3RIYW5kbGVyID0gZnVuY3Rpb24gY3JlYXRlUmVxdWVzdEhhbmRsZXIoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhLCBhZGRpdGlvbmFsRmV0Y2hPcHRpb25zKSB7XG4gICAgaWYgKGFkZGl0aW9uYWxGZXRjaE9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgYWRkaXRpb25hbEZldGNoT3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIHZhciBfZm4gPSBmbihhKSxcbiAgICAgICAgaGVhZGVycyA9IF9mbi5oZWFkZXJzLFxuICAgICAgICBxdWVyeSA9IF9mbi5xdWVyeSxcbiAgICAgICAgYmFzZVJlcVBhcmFtcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9mbiwgW1wiaGVhZGVyc1wiLCBcInF1ZXJ5XCJdKTtcblxuICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgYmFzZVJlcVBhcmFtcywgYWRkaXRpb25hbEZldGNoT3B0aW9ucywge1xuICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgaGVhZGVyczogX2V4dGVuZHMoe30sIGhlYWRlcnMsIGFkZGl0aW9uYWxGZXRjaE9wdGlvbnMuaGVhZGVycylcbiAgICB9KTtcbiAgfTtcbn07XG52YXIgbWFrZUVuZHBvaW50ID0gZnVuY3Rpb24gbWFrZUVuZHBvaW50KGVuZHBvaW50KSB7XG4gIHJldHVybiBlbmRwb2ludDtcbn07XG52YXIgaW5pdE1ha2VSZXF1ZXN0ID0gZnVuY3Rpb24gaW5pdE1ha2VSZXF1ZXN0KF9yZWYpIHtcbiAgdmFyIGFjY2Vzc0tleSA9IF9yZWYuYWNjZXNzS2V5LFxuICAgICAgX3JlZiRhcGlWZXJzaW9uID0gX3JlZi5hcGlWZXJzaW9uLFxuICAgICAgYXBpVmVyc2lvbiA9IF9yZWYkYXBpVmVyc2lvbiA9PT0gdm9pZCAwID8gJ3YxJyA6IF9yZWYkYXBpVmVyc2lvbixcbiAgICAgIF9yZWYkYXBpVXJsID0gX3JlZi5hcGlVcmwsXG4gICAgICBhcGlVcmwgPSBfcmVmJGFwaVVybCA9PT0gdm9pZCAwID8gJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbScgOiBfcmVmJGFwaVVybCxcbiAgICAgIGdlbmVyYWxIZWFkZXJzID0gX3JlZi5oZWFkZXJzLFxuICAgICAgcHJvdmlkZWRGZXRjaCA9IF9yZWYuZmV0Y2gsXG4gICAgICBnZW5lcmFsRmV0Y2hPcHRpb25zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZiwgW1wiYWNjZXNzS2V5XCIsIFwiYXBpVmVyc2lvblwiLCBcImFwaVVybFwiLCBcImhlYWRlcnNcIiwgXCJmZXRjaFwiXSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmMikge1xuICAgIHZhciBoYW5kbGVSZXNwb25zZSA9IF9yZWYyLmhhbmRsZVJlc3BvbnNlLFxuICAgICAgICBoYW5kbGVSZXF1ZXN0ID0gX3JlZjIuaGFuZGxlUmVxdWVzdDtcbiAgICByZXR1cm4gZmxvdyhoYW5kbGVSZXF1ZXN0LCBmdW5jdGlvbiAoX3JlZjMpIHtcbiAgICAgIHZhciBwYXRobmFtZSA9IF9yZWYzLnBhdGhuYW1lLFxuICAgICAgICAgIHF1ZXJ5ID0gX3JlZjMucXVlcnksXG4gICAgICAgICAgX3JlZjMkbWV0aG9kID0gX3JlZjMubWV0aG9kLFxuICAgICAgICAgIG1ldGhvZCA9IF9yZWYzJG1ldGhvZCA9PT0gdm9pZCAwID8gJ0dFVCcgOiBfcmVmMyRtZXRob2QsXG4gICAgICAgICAgZW5kcG9pbnRIZWFkZXJzID0gX3JlZjMuaGVhZGVycyxcbiAgICAgICAgICBib2R5ID0gX3JlZjMuYm9keSxcbiAgICAgICAgICBzaWduYWwgPSBfcmVmMy5zaWduYWw7XG4gICAgICB2YXIgdXJsID0gYnVpbGRVcmwoe1xuICAgICAgICBwYXRobmFtZTogcGF0aG5hbWUsXG4gICAgICAgIHF1ZXJ5OiBxdWVyeVxuICAgICAgfSkoYXBpVXJsKTtcblxuICAgICAgdmFyIGZldGNoT3B0aW9ucyA9IF9leHRlbmRzKHtcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IF9leHRlbmRzKHt9LCBnZW5lcmFsSGVhZGVycywgZW5kcG9pbnRIZWFkZXJzLCB7XG4gICAgICAgICAgJ0FjY2VwdC1WZXJzaW9uJzogYXBpVmVyc2lvblxuICAgICAgICB9LCBpc0RlZmluZWQoYWNjZXNzS2V5KSA/IHtcbiAgICAgICAgICBBdXRob3JpemF0aW9uOiBcIkNsaWVudC1JRCBcIiArIGFjY2Vzc0tleVxuICAgICAgICB9IDoge30pLFxuICAgICAgICBib2R5OiBib2R5LFxuICAgICAgICBzaWduYWw6IHNpZ25hbFxuICAgICAgfSwgZ2VuZXJhbEZldGNoT3B0aW9ucyk7XG5cbiAgICAgIHZhciBmZXRjaFRvVXNlID0gcHJvdmlkZWRGZXRjaCAhPSBudWxsID8gcHJvdmlkZWRGZXRjaCA6IGZldGNoO1xuICAgICAgcmV0dXJuIGZldGNoVG9Vc2UodXJsLCBmZXRjaE9wdGlvbnMpLnRoZW4oaGFuZGxlRmV0Y2hSZXNwb25zZShoYW5kbGVSZXNwb25zZSkpO1xuICAgIH0pO1xuICB9O1xufTtcblxudmFyIFRPVEFMX1JFU1BPTlNFX0hFQURFUiA9ICd4LXRvdGFsJztcblxudmFyIGdldFRvdGFsRnJvbUFwaUZlZWRSZXNwb25zZSA9IGZ1bmN0aW9uIGdldFRvdGFsRnJvbUFwaUZlZWRSZXNwb25zZShyZXNwb25zZSkge1xuICB2YXIgdG90YWxzU3RyID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoVE9UQUxfUkVTUE9OU0VfSEVBREVSKTtcblxuICBpZiAoaXNEZWZpbmVkKHRvdGFsc1N0cikpIHtcbiAgICB2YXIgdG90YWwgPSBwYXJzZUludCh0b3RhbHNTdHIpO1xuXG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIodG90YWwpKSB7XG4gICAgICByZXR1cm4gdG90YWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBEZWNvZGluZ0Vycm9yKFwiZXhwZWN0ZWQgXCIgKyBUT1RBTF9SRVNQT05TRV9IRUFERVIgKyBcIiBoZWFkZXIgdG8gYmUgdmFsaWQgaW50ZWdlci5cIik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBEZWNvZGluZ0Vycm9yKFwiZXhwZWN0ZWQgXCIgKyBUT1RBTF9SRVNQT05TRV9IRUFERVIgKyBcIiBoZWFkZXIgdG8gZXhpc3QuXCIpO1xuICB9XG59O1xuXG52YXIgaGFuZGxlRmVlZFJlc3BvbnNlID0gZnVuY3Rpb24gaGFuZGxlRmVlZFJlc3BvbnNlKCkge1xuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgcmVzcG9uc2UgPSBfcmVmLnJlc3BvbnNlO1xuICAgIHJldHVybiBjYXN0UmVzcG9uc2UoKSh7XG4gICAgICByZXNwb25zZTogcmVzcG9uc2VcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN1bHRzOiByZXN1bHRzLFxuICAgICAgICB0b3RhbDogZ2V0VG90YWxGcm9tQXBpRmVlZFJlc3BvbnNlKHJlc3BvbnNlKVxuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcbn07XG5cbnZhciBnZXRDb2xsZWN0aW9ucyA9IGZ1bmN0aW9uIGdldENvbGxlY3Rpb25zKGNvbGxlY3Rpb25JZHMpIHtcbiAgcmV0dXJuIGlzRGVmaW5lZChjb2xsZWN0aW9uSWRzKSA/IHtcbiAgICBjb2xsZWN0aW9uczogY29sbGVjdGlvbklkcy5qb2luKClcbiAgfSA6IHt9O1xufTtcbnZhciBnZXRUb3BpY3MgPSBmdW5jdGlvbiBnZXRUb3BpY3ModG9waWNJZHMpIHtcbiAgcmV0dXJuIGlzRGVmaW5lZCh0b3BpY0lkcykgPyB7XG4gICAgdG9waWNzOiB0b3BpY0lkcy5qb2luKClcbiAgfSA6IHt9O1xufTtcbnZhciBnZXRGZWVkUGFyYW1zID0gZnVuY3Rpb24gZ2V0RmVlZFBhcmFtcyhfcmVmKSB7XG4gIHZhciBwYWdlID0gX3JlZi5wYWdlLFxuICAgICAgcGVyUGFnZSA9IF9yZWYucGVyUGFnZSxcbiAgICAgIG9yZGVyQnkgPSBfcmVmLm9yZGVyQnk7XG4gIHJldHVybiBjb21wYWN0RGVmaW5lZCh7XG4gICAgcGVyX3BhZ2U6IHBlclBhZ2UsXG4gICAgb3JkZXJfYnk6IG9yZGVyQnksXG4gICAgcGFnZTogcGFnZVxuICB9KTtcbn07XG5cbnZhciBDT0xMRUNUSU9OU19QQVRIX1BSRUZJWCA9ICcvY29sbGVjdGlvbnMnO1xudmFyIGdldFBob3RvcyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBnZXRQYXRobmFtZSA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKF9yZWYpIHtcbiAgICB2YXIgY29sbGVjdGlvbklkID0gX3JlZi5jb2xsZWN0aW9uSWQ7XG4gICAgcmV0dXJuIENPTExFQ1RJT05TX1BBVEhfUFJFRklYICsgXCIvXCIgKyBjb2xsZWN0aW9uSWQgKyBcIi9waG90b3NcIjtcbiAgfTtcblxuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICBnZXRQYXRobmFtZTogZ2V0UGF0aG5hbWUsXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICB2YXIgY29sbGVjdGlvbklkID0gX3JlZjIuY29sbGVjdGlvbklkLFxuICAgICAgICAgIG9yaWVudGF0aW9uID0gX3JlZjIub3JpZW50YXRpb24sXG4gICAgICAgICAgcGFnaW5hdGlvblBhcmFtcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYyLCBbXCJjb2xsZWN0aW9uSWRcIiwgXCJvcmllbnRhdGlvblwiXSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhuYW1lOiBnZXRQYXRobmFtZSh7XG4gICAgICAgICAgY29sbGVjdGlvbklkOiBjb2xsZWN0aW9uSWRcbiAgICAgICAgfSksXG4gICAgICAgIHF1ZXJ5OiBjb21wYWN0RGVmaW5lZChfZXh0ZW5kcyh7fSwgZ2V0RmVlZFBhcmFtcyhwYWdpbmF0aW9uUGFyYW1zKSwge1xuICAgICAgICAgIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvblxuICAgICAgICB9KSlcbiAgICAgIH07XG4gICAgfSksXG4gICAgaGFuZGxlUmVzcG9uc2U6IGhhbmRsZUZlZWRSZXNwb25zZSgpXG4gIH0pO1xufSgpO1xudmFyIGdldCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBnZXRQYXRobmFtZSA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKF9yZWYzKSB7XG4gICAgdmFyIGNvbGxlY3Rpb25JZCA9IF9yZWYzLmNvbGxlY3Rpb25JZDtcbiAgICByZXR1cm4gQ09MTEVDVElPTlNfUEFUSF9QUkVGSVggKyBcIi9cIiArIGNvbGxlY3Rpb25JZDtcbiAgfTtcblxuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICBnZXRQYXRobmFtZTogZ2V0UGF0aG5hbWUsXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKF9yZWY0KSB7XG4gICAgICB2YXIgY29sbGVjdGlvbklkID0gX3JlZjQuY29sbGVjdGlvbklkO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aG5hbWU6IGdldFBhdGhuYW1lKHtcbiAgICAgICAgICBjb2xsZWN0aW9uSWQ6IGNvbGxlY3Rpb25JZFxuICAgICAgICB9KSxcbiAgICAgICAgcXVlcnk6IHt9XG4gICAgICB9O1xuICAgIH0pLFxuICAgIGhhbmRsZVJlc3BvbnNlOiBjYXN0UmVzcG9uc2UoKVxuICB9KTtcbn0oKTtcbnZhciBsaXN0ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIGdldFBhdGhuYW1lID0gZnVuY3Rpb24gZ2V0UGF0aG5hbWUoKSB7XG4gICAgcmV0dXJuIENPTExFQ1RJT05TX1BBVEhfUFJFRklYO1xuICB9O1xuXG4gIHJldHVybiBtYWtlRW5kcG9pbnQoe1xuICAgIGdldFBhdGhuYW1lOiBnZXRQYXRobmFtZSxcbiAgICBoYW5kbGVSZXF1ZXN0OiBjcmVhdGVSZXF1ZXN0SGFuZGxlcihmdW5jdGlvbiAocGFnaW5hdGlvblBhcmFtcykge1xuICAgICAgaWYgKHBhZ2luYXRpb25QYXJhbXMgPT09IHZvaWQgMCkge1xuICAgICAgICBwYWdpbmF0aW9uUGFyYW1zID0ge307XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhuYW1lOiBnZXRQYXRobmFtZSgpLFxuICAgICAgICBxdWVyeTogZ2V0RmVlZFBhcmFtcyhwYWdpbmF0aW9uUGFyYW1zKVxuICAgICAgfTtcbiAgICB9KSxcbiAgICBoYW5kbGVSZXNwb25zZTogaGFuZGxlRmVlZFJlc3BvbnNlKClcbiAgfSk7XG59KCk7XG52YXIgZ2V0UmVsYXRlZCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBnZXRQYXRobmFtZSA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKF9yZWY1KSB7XG4gICAgdmFyIGNvbGxlY3Rpb25JZCA9IF9yZWY1LmNvbGxlY3Rpb25JZDtcbiAgICByZXR1cm4gQ09MTEVDVElPTlNfUEFUSF9QUkVGSVggKyBcIi9cIiArIGNvbGxlY3Rpb25JZCArIFwiL3JlbGF0ZWRcIjtcbiAgfTtcblxuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICBnZXRQYXRobmFtZTogZ2V0UGF0aG5hbWUsXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKF9yZWY2KSB7XG4gICAgICB2YXIgY29sbGVjdGlvbklkID0gX3JlZjYuY29sbGVjdGlvbklkO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aG5hbWU6IGdldFBhdGhuYW1lKHtcbiAgICAgICAgICBjb2xsZWN0aW9uSWQ6IGNvbGxlY3Rpb25JZFxuICAgICAgICB9KSxcbiAgICAgICAgcXVlcnk6IHt9XG4gICAgICB9O1xuICAgIH0pLFxuICAgIGhhbmRsZVJlc3BvbnNlOiBjYXN0UmVzcG9uc2UoKVxuICB9KTtcbn0oKTtcblxudmFyIGluZGV4ID0ge1xuICBfX3Byb3RvX186IG51bGwsXG4gIGdldFBob3RvczogZ2V0UGhvdG9zLFxuICBnZXQ6IGdldCxcbiAgbGlzdDogbGlzdCxcbiAgZ2V0UmVsYXRlZDogZ2V0UmVsYXRlZFxufTtcblxudmFyIFBIT1RPU19QQVRIX1BSRUZJWCA9ICcvcGhvdG9zJztcbnZhciBsaXN0JDEgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgX2dldFBhdGhuYW1lID0gZnVuY3Rpb24gZ2V0UGF0aG5hbWUoKSB7XG4gICAgcmV0dXJuIFBIT1RPU19QQVRIX1BSRUZJWDtcbiAgfTtcblxuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICAvLyBXcmFwcGVyIHVzZXMgdHlwZSB0cmljayB0byBhbGxvdyAwIGFyZ3NcbiAgICBnZXRQYXRobmFtZTogZnVuY3Rpb24gZ2V0UGF0aG5hbWUoX3BhcmFtcykge1xuICAgICAgcmV0dXJuIF9nZXRQYXRobmFtZSgpO1xuICAgIH0sXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKGZlZWRQYXJhbXMpIHtcbiAgICAgIGlmIChmZWVkUGFyYW1zID09PSB2b2lkIDApIHtcbiAgICAgICAgZmVlZFBhcmFtcyA9IHt9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRobmFtZTogUEhPVE9TX1BBVEhfUFJFRklYLFxuICAgICAgICBxdWVyeTogY29tcGFjdERlZmluZWQoZ2V0RmVlZFBhcmFtcyhmZWVkUGFyYW1zKSlcbiAgICAgIH07XG4gICAgfSksXG4gICAgaGFuZGxlUmVzcG9uc2U6IGhhbmRsZUZlZWRSZXNwb25zZSgpXG4gIH0pO1xufSgpO1xudmFyIGdldCQxID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIGdldFBhdGhuYW1lID0gZnVuY3Rpb24gZ2V0UGF0aG5hbWUoX3JlZikge1xuICAgIHZhciBwaG90b0lkID0gX3JlZi5waG90b0lkO1xuICAgIHJldHVybiBQSE9UT1NfUEFUSF9QUkVGSVggKyBcIi9cIiArIHBob3RvSWQ7XG4gIH07XG5cbiAgcmV0dXJuIG1ha2VFbmRwb2ludCh7XG4gICAgZ2V0UGF0aG5hbWU6IGdldFBhdGhuYW1lLFxuICAgIGhhbmRsZVJlcXVlc3Q6IGNyZWF0ZVJlcXVlc3RIYW5kbGVyKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgdmFyIHBob3RvSWQgPSBfcmVmMi5waG90b0lkO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aG5hbWU6IGdldFBhdGhuYW1lKHtcbiAgICAgICAgICBwaG90b0lkOiBwaG90b0lkXG4gICAgICAgIH0pLFxuICAgICAgICBxdWVyeToge31cbiAgICAgIH07XG4gICAgfSksXG4gICAgaGFuZGxlUmVzcG9uc2U6IGNhc3RSZXNwb25zZSgpXG4gIH0pO1xufSgpO1xudmFyIGdldFN0YXRzID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIGdldFBhdGhuYW1lID0gZnVuY3Rpb24gZ2V0UGF0aG5hbWUoX3JlZjMpIHtcbiAgICB2YXIgcGhvdG9JZCA9IF9yZWYzLnBob3RvSWQ7XG4gICAgcmV0dXJuIFBIT1RPU19QQVRIX1BSRUZJWCArIFwiL1wiICsgcGhvdG9JZCArIFwiL3N0YXRpc3RpY3NcIjtcbiAgfTtcblxuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICBnZXRQYXRobmFtZTogZ2V0UGF0aG5hbWUsXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKF9yZWY0KSB7XG4gICAgICB2YXIgcGhvdG9JZCA9IF9yZWY0LnBob3RvSWQ7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRobmFtZTogZ2V0UGF0aG5hbWUoe1xuICAgICAgICAgIHBob3RvSWQ6IHBob3RvSWRcbiAgICAgICAgfSksXG4gICAgICAgIHF1ZXJ5OiB7fVxuICAgICAgfTtcbiAgICB9KSxcbiAgICBoYW5kbGVSZXNwb25zZTogY2FzdFJlc3BvbnNlKClcbiAgfSk7XG59KCk7XG52YXIgZ2V0UmFuZG9tID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIGdldFBhdGhuYW1lID0gZnVuY3Rpb24gZ2V0UGF0aG5hbWUoKSB7XG4gICAgcmV0dXJuIFBIT1RPU19QQVRIX1BSRUZJWCArIFwiL3JhbmRvbVwiO1xuICB9O1xuXG4gIHJldHVybiBtYWtlRW5kcG9pbnQoe1xuICAgIGdldFBhdGhuYW1lOiBnZXRQYXRobmFtZSxcbiAgICBoYW5kbGVSZXF1ZXN0OiBjcmVhdGVSZXF1ZXN0SGFuZGxlcihmdW5jdGlvbiAoX3RlbXApIHtcbiAgICAgIHZhciBfcmVmNSA9IF90ZW1wID09PSB2b2lkIDAgPyB7fSA6IF90ZW1wLFxuICAgICAgICAgIGNvbGxlY3Rpb25JZHMgPSBfcmVmNS5jb2xsZWN0aW9uSWRzLFxuICAgICAgICAgIGNvbnRlbnRGaWx0ZXIgPSBfcmVmNS5jb250ZW50RmlsdGVyLFxuICAgICAgICAgIHRvcGljSWRzID0gX3JlZjUudG9waWNJZHMsXG4gICAgICAgICAgcXVlcnlQYXJhbXMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmNSwgW1wiY29sbGVjdGlvbklkc1wiLCBcImNvbnRlbnRGaWx0ZXJcIiwgXCJ0b3BpY0lkc1wiXSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhuYW1lOiBnZXRQYXRobmFtZSgpLFxuICAgICAgICBxdWVyeTogY29tcGFjdERlZmluZWQoX2V4dGVuZHMoe30sIHF1ZXJ5UGFyYW1zLCB7XG4gICAgICAgICAgY29udGVudF9maWx0ZXI6IGNvbnRlbnRGaWx0ZXJcbiAgICAgICAgfSwgZ2V0Q29sbGVjdGlvbnMoY29sbGVjdGlvbklkcyksIGdldFRvcGljcyh0b3BpY0lkcykpKSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQXZvaWQgcmVzcG9uc2UgY2FjaGluZ1xyXG4gICAgICAgICAgICovXG4gICAgICAgICAgJ2NhY2hlLWNvbnRyb2wnOiAnbm8tY2FjaGUnXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSksXG4gICAgaGFuZGxlUmVzcG9uc2U6IGNhc3RSZXNwb25zZSgpXG4gIH0pO1xufSgpO1xudmFyIHRyYWNrRG93bmxvYWQgPSB7XG4gIGhhbmRsZVJlcXVlc3Q6IC8qI19fUFVSRV9fKi9jcmVhdGVSZXF1ZXN0SGFuZGxlcihmdW5jdGlvbiAoX3JlZjYpIHtcbiAgICB2YXIgZG93bmxvYWRMb2NhdGlvbiA9IF9yZWY2LmRvd25sb2FkTG9jYXRpb247XG5cbiAgICB2YXIgX3BhcnNlUXVlcnlBbmRQYXRobmFtID0gcGFyc2VRdWVyeUFuZFBhdGhuYW1lKGRvd25sb2FkTG9jYXRpb24pLFxuICAgICAgICBwYXRobmFtZSA9IF9wYXJzZVF1ZXJ5QW5kUGF0aG5hbS5wYXRobmFtZSxcbiAgICAgICAgcXVlcnkgPSBfcGFyc2VRdWVyeUFuZFBhdGhuYW0ucXVlcnk7XG5cbiAgICBpZiAoIWlzRGVmaW5lZChwYXRobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHBhcnNlIHBhdGhuYW1lIGZyb20gdXJsLicpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwYXRobmFtZTogcGF0aG5hbWUsXG4gICAgICBxdWVyeTogY29tcGFjdERlZmluZWQocXVlcnkpXG4gICAgfTtcbiAgfSksXG4gIGhhbmRsZVJlc3BvbnNlOiAvKiNfX1BVUkVfXyovY2FzdFJlc3BvbnNlKClcbn07XG5cbnZhciBpbmRleCQxID0ge1xuICBfX3Byb3RvX186IG51bGwsXG4gIGxpc3Q6IGxpc3QkMSxcbiAgZ2V0OiBnZXQkMSxcbiAgZ2V0U3RhdHM6IGdldFN0YXRzLFxuICBnZXRSYW5kb206IGdldFJhbmRvbSxcbiAgdHJhY2tEb3dubG9hZDogdHJhY2tEb3dubG9hZFxufTtcblxudmFyIFNFQVJDSF9QQVRIX1BSRUZJWCA9IFwiL3NlYXJjaFwiO1xudmFyIGdldFBob3RvcyQxID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIF9nZXRQYXRobmFtZSA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKCkge1xuICAgIHJldHVybiBTRUFSQ0hfUEFUSF9QUkVGSVggKyBcIi9waG90b3NcIjtcbiAgfTtcblxuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICAvLyBXcmFwcGVyIHVzZXMgdHlwZSB0cmljayB0byBhbGxvdyAwIGFyZ3NcbiAgICBnZXRQYXRobmFtZTogZnVuY3Rpb24gZ2V0UGF0aG5hbWUoX3BhcmFtcykge1xuICAgICAgcmV0dXJuIF9nZXRQYXRobmFtZSgpO1xuICAgIH0sXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgIHZhciBxdWVyeSA9IF9yZWYucXVlcnksXG4gICAgICAgICAgcGFnZSA9IF9yZWYucGFnZSxcbiAgICAgICAgICBwZXJQYWdlID0gX3JlZi5wZXJQYWdlLFxuICAgICAgICAgIG9yZGVyQnkgPSBfcmVmLm9yZGVyQnksXG4gICAgICAgICAgY29sbGVjdGlvbklkcyA9IF9yZWYuY29sbGVjdGlvbklkcyxcbiAgICAgICAgICBsYW5nID0gX3JlZi5sYW5nLFxuICAgICAgICAgIGNvbnRlbnRGaWx0ZXIgPSBfcmVmLmNvbnRlbnRGaWx0ZXIsXG4gICAgICAgICAgZmlsdGVycyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcInF1ZXJ5XCIsIFwicGFnZVwiLCBcInBlclBhZ2VcIiwgXCJvcmRlckJ5XCIsIFwiY29sbGVjdGlvbklkc1wiLCBcImxhbmdcIiwgXCJjb250ZW50RmlsdGVyXCJdKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aG5hbWU6IF9nZXRQYXRobmFtZSgpLFxuICAgICAgICBxdWVyeTogY29tcGFjdERlZmluZWQoX2V4dGVuZHMoe1xuICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICBjb250ZW50X2ZpbHRlcjogY29udGVudEZpbHRlcixcbiAgICAgICAgICBsYW5nOiBsYW5nLFxuICAgICAgICAgIG9yZGVyX2J5OiBvcmRlckJ5XG4gICAgICAgIH0sIGdldEZlZWRQYXJhbXMoe1xuICAgICAgICAgIHBhZ2U6IHBhZ2UsXG4gICAgICAgICAgcGVyUGFnZTogcGVyUGFnZVxuICAgICAgICB9KSwgZ2V0Q29sbGVjdGlvbnMoY29sbGVjdGlvbklkcyksIGZpbHRlcnMpKVxuICAgICAgfTtcbiAgICB9KSxcbiAgICBoYW5kbGVSZXNwb25zZTogY2FzdFJlc3BvbnNlKClcbiAgfSk7XG59KCk7XG52YXIgZ2V0Q29sbGVjdGlvbnMkMSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBfZ2V0UGF0aG5hbWUyID0gZnVuY3Rpb24gZ2V0UGF0aG5hbWUoKSB7XG4gICAgcmV0dXJuIFNFQVJDSF9QQVRIX1BSRUZJWCArIFwiL2NvbGxlY3Rpb25zXCI7XG4gIH07XG5cbiAgcmV0dXJuIG1ha2VFbmRwb2ludCh7XG4gICAgLy8gV3JhcHBlciB1c2VzIHR5cGUgdHJpY2sgdG8gYWxsb3cgMCBhcmdzXG4gICAgZ2V0UGF0aG5hbWU6IGZ1bmN0aW9uIGdldFBhdGhuYW1lKF9wYXJhbXMpIHtcbiAgICAgIHJldHVybiBfZ2V0UGF0aG5hbWUyKCk7XG4gICAgfSxcbiAgICBoYW5kbGVSZXF1ZXN0OiBjcmVhdGVSZXF1ZXN0SGFuZGxlcihmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgIHZhciBxdWVyeSA9IF9yZWYyLnF1ZXJ5LFxuICAgICAgICAgIHBhZ2luYXRpb25QYXJhbXMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmMiwgW1wicXVlcnlcIl0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRobmFtZTogX2dldFBhdGhuYW1lMigpLFxuICAgICAgICBxdWVyeTogX2V4dGVuZHMoe1xuICAgICAgICAgIHF1ZXJ5OiBxdWVyeVxuICAgICAgICB9LCBnZXRGZWVkUGFyYW1zKHBhZ2luYXRpb25QYXJhbXMpKVxuICAgICAgfTtcbiAgICB9KSxcbiAgICBoYW5kbGVSZXNwb25zZTogY2FzdFJlc3BvbnNlKClcbiAgfSk7XG59KCk7XG52YXIgZ2V0VXNlcnMgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgX2dldFBhdGhuYW1lMyA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKCkge1xuICAgIHJldHVybiBTRUFSQ0hfUEFUSF9QUkVGSVggKyBcIi91c2Vyc1wiO1xuICB9O1xuXG4gIHJldHVybiBtYWtlRW5kcG9pbnQoe1xuICAgIC8vIFdyYXBwZXIgdXNlcyB0eXBlIHRyaWNrIHRvIGFsbG93IDAgYXJnc1xuICAgIGdldFBhdGhuYW1lOiBmdW5jdGlvbiBnZXRQYXRobmFtZShfcGFyYW1zKSB7XG4gICAgICByZXR1cm4gX2dldFBhdGhuYW1lMygpO1xuICAgIH0sXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKF9yZWYzKSB7XG4gICAgICB2YXIgcXVlcnkgPSBfcmVmMy5xdWVyeSxcbiAgICAgICAgICBwYWdpbmF0aW9uUGFyYW1zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZjMsIFtcInF1ZXJ5XCJdKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aG5hbWU6IF9nZXRQYXRobmFtZTMoKSxcbiAgICAgICAgcXVlcnk6IF9leHRlbmRzKHtcbiAgICAgICAgICBxdWVyeTogcXVlcnlcbiAgICAgICAgfSwgZ2V0RmVlZFBhcmFtcyhwYWdpbmF0aW9uUGFyYW1zKSlcbiAgICAgIH07XG4gICAgfSksXG4gICAgaGFuZGxlUmVzcG9uc2U6IGNhc3RSZXNwb25zZSgpXG4gIH0pO1xufSgpO1xuXG52YXIgaW5kZXgkMiA9IHtcbiAgX19wcm90b19fOiBudWxsLFxuICBnZXRQaG90b3M6IGdldFBob3RvcyQxLFxuICBnZXRDb2xsZWN0aW9uczogZ2V0Q29sbGVjdGlvbnMkMSxcbiAgZ2V0VXNlcnM6IGdldFVzZXJzXG59O1xuXG52YXIgVVNFUlNfUEFUSF9QUkVGSVggPSAnL3VzZXJzJztcbnZhciBnZXQkMiA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBnZXRQYXRobmFtZSA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKF9yZWYpIHtcbiAgICB2YXIgdXNlcm5hbWUgPSBfcmVmLnVzZXJuYW1lO1xuICAgIHJldHVybiBVU0VSU19QQVRIX1BSRUZJWCArIFwiL1wiICsgdXNlcm5hbWU7XG4gIH07XG5cbiAgcmV0dXJuIG1ha2VFbmRwb2ludCh7XG4gICAgZ2V0UGF0aG5hbWU6IGdldFBhdGhuYW1lLFxuICAgIGhhbmRsZVJlcXVlc3Q6IGNyZWF0ZVJlcXVlc3RIYW5kbGVyKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgdmFyIHVzZXJuYW1lID0gX3JlZjIudXNlcm5hbWU7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRobmFtZTogZ2V0UGF0aG5hbWUoe1xuICAgICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZVxuICAgICAgICB9KSxcbiAgICAgICAgcXVlcnk6IHt9XG4gICAgICB9O1xuICAgIH0pLFxuICAgIGhhbmRsZVJlc3BvbnNlOiBjYXN0UmVzcG9uc2UoKVxuICB9KTtcbn0oKTtcbnZhciBnZXRQaG90b3MkMiA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBnZXRQYXRobmFtZSA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKF9yZWYzKSB7XG4gICAgdmFyIHVzZXJuYW1lID0gX3JlZjMudXNlcm5hbWU7XG4gICAgcmV0dXJuIFVTRVJTX1BBVEhfUFJFRklYICsgXCIvXCIgKyB1c2VybmFtZSArIFwiL3Bob3Rvc1wiO1xuICB9O1xuXG4gIHJldHVybiBtYWtlRW5kcG9pbnQoe1xuICAgIGdldFBhdGhuYW1lOiBnZXRQYXRobmFtZSxcbiAgICBoYW5kbGVSZXF1ZXN0OiBjcmVhdGVSZXF1ZXN0SGFuZGxlcihmdW5jdGlvbiAoX3JlZjQpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IF9yZWY0LnVzZXJuYW1lLFxuICAgICAgICAgIHN0YXRzID0gX3JlZjQuc3RhdHMsXG4gICAgICAgICAgb3JpZW50YXRpb24gPSBfcmVmNC5vcmllbnRhdGlvbixcbiAgICAgICAgICBwYWdpbmF0aW9uUGFyYW1zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZjQsIFtcInVzZXJuYW1lXCIsIFwic3RhdHNcIiwgXCJvcmllbnRhdGlvblwiXSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhuYW1lOiBnZXRQYXRobmFtZSh7XG4gICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lXG4gICAgICAgIH0pLFxuICAgICAgICBxdWVyeTogY29tcGFjdERlZmluZWQoX2V4dGVuZHMoe30sIGdldEZlZWRQYXJhbXMocGFnaW5hdGlvblBhcmFtcyksIHtcbiAgICAgICAgICBvcmllbnRhdGlvbjogb3JpZW50YXRpb24sXG4gICAgICAgICAgc3RhdHM6IHN0YXRzXG4gICAgICAgIH0pKVxuICAgICAgfTtcbiAgICB9KSxcbiAgICBoYW5kbGVSZXNwb25zZTogaGFuZGxlRmVlZFJlc3BvbnNlKClcbiAgfSk7XG59KCk7XG52YXIgZ2V0TGlrZXMgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgZ2V0UGF0aG5hbWUgPSBmdW5jdGlvbiBnZXRQYXRobmFtZShfcmVmNSkge1xuICAgIHZhciB1c2VybmFtZSA9IF9yZWY1LnVzZXJuYW1lO1xuICAgIHJldHVybiBVU0VSU19QQVRIX1BSRUZJWCArIFwiL1wiICsgdXNlcm5hbWUgKyBcIi9saWtlc1wiO1xuICB9O1xuXG4gIHJldHVybiBtYWtlRW5kcG9pbnQoe1xuICAgIGdldFBhdGhuYW1lOiBnZXRQYXRobmFtZSxcbiAgICBoYW5kbGVSZXF1ZXN0OiBjcmVhdGVSZXF1ZXN0SGFuZGxlcihmdW5jdGlvbiAoX3JlZjYpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IF9yZWY2LnVzZXJuYW1lLFxuICAgICAgICAgIG9yaWVudGF0aW9uID0gX3JlZjYub3JpZW50YXRpb24sXG4gICAgICAgICAgcGFnaW5hdGlvblBhcmFtcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWY2LCBbXCJ1c2VybmFtZVwiLCBcIm9yaWVudGF0aW9uXCJdKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aG5hbWU6IGdldFBhdGhuYW1lKHtcbiAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWVcbiAgICAgICAgfSksXG4gICAgICAgIHF1ZXJ5OiBjb21wYWN0RGVmaW5lZChfZXh0ZW5kcyh7fSwgZ2V0RmVlZFBhcmFtcyhwYWdpbmF0aW9uUGFyYW1zKSwge1xuICAgICAgICAgIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvblxuICAgICAgICB9KSlcbiAgICAgIH07XG4gICAgfSksXG4gICAgaGFuZGxlUmVzcG9uc2U6IGhhbmRsZUZlZWRSZXNwb25zZSgpXG4gIH0pO1xufSgpO1xudmFyIGdldENvbGxlY3Rpb25zJDIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgZ2V0UGF0aG5hbWUgPSBmdW5jdGlvbiBnZXRQYXRobmFtZShfcmVmNykge1xuICAgIHZhciB1c2VybmFtZSA9IF9yZWY3LnVzZXJuYW1lO1xuICAgIHJldHVybiBVU0VSU19QQVRIX1BSRUZJWCArIFwiL1wiICsgdXNlcm5hbWUgKyBcIi9jb2xsZWN0aW9uc1wiO1xuICB9O1xuXG4gIHJldHVybiBtYWtlRW5kcG9pbnQoe1xuICAgIGdldFBhdGhuYW1lOiBnZXRQYXRobmFtZSxcbiAgICBoYW5kbGVSZXF1ZXN0OiBjcmVhdGVSZXF1ZXN0SGFuZGxlcihmdW5jdGlvbiAoX3JlZjgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IF9yZWY4LnVzZXJuYW1lLFxuICAgICAgICAgIHBhZ2luYXRpb25QYXJhbXMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmOCwgW1widXNlcm5hbWVcIl0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRobmFtZTogZ2V0UGF0aG5hbWUoe1xuICAgICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZVxuICAgICAgICB9KSxcbiAgICAgICAgcXVlcnk6IGdldEZlZWRQYXJhbXMocGFnaW5hdGlvblBhcmFtcylcbiAgICAgIH07XG4gICAgfSksXG4gICAgaGFuZGxlUmVzcG9uc2U6IGhhbmRsZUZlZWRSZXNwb25zZSgpXG4gIH0pO1xufSgpO1xuXG52YXIgaW5kZXgkMyA9IHtcbiAgX19wcm90b19fOiBudWxsLFxuICBnZXQ6IGdldCQyLFxuICBnZXRQaG90b3M6IGdldFBob3RvcyQyLFxuICBnZXRMaWtlczogZ2V0TGlrZXMsXG4gIGdldENvbGxlY3Rpb25zOiBnZXRDb2xsZWN0aW9ucyQyXG59O1xuXG52YXIgQkFTRV9UT1BJQ19QQVRIID0gJy90b3BpY3MnO1xuXG52YXIgZ2V0VG9waWNQYXRoID0gZnVuY3Rpb24gZ2V0VG9waWNQYXRoKF9yZWYpIHtcbiAgdmFyIHRvcGljSWRPclNsdWcgPSBfcmVmLnRvcGljSWRPclNsdWc7XG4gIHJldHVybiBCQVNFX1RPUElDX1BBVEggKyBcIi9cIiArIHRvcGljSWRPclNsdWc7XG59O1xuXG52YXIgbGlzdCQyID0gLyojX19QVVJFX18qL21ha2VFbmRwb2ludCh7XG4gIGdldFBhdGhuYW1lOiBnZXRUb3BpY1BhdGgsXG4gIGhhbmRsZVJlcXVlc3Q6IGZ1bmN0aW9uIGhhbmRsZVJlcXVlc3QoX3JlZjIpIHtcbiAgICB2YXIgcGFnZSA9IF9yZWYyLnBhZ2UsXG4gICAgICAgIHBlclBhZ2UgPSBfcmVmMi5wZXJQYWdlLFxuICAgICAgICBvcmRlckJ5ID0gX3JlZjIub3JkZXJCeSxcbiAgICAgICAgdG9waWNJZHNPclNsdWdzID0gX3JlZjIudG9waWNJZHNPclNsdWdzO1xuICAgIHJldHVybiB7XG4gICAgICBwYXRobmFtZTogQkFTRV9UT1BJQ19QQVRILFxuICAgICAgcXVlcnk6IGNvbXBhY3REZWZpbmVkKF9leHRlbmRzKHt9LCBnZXRGZWVkUGFyYW1zKHtcbiAgICAgICAgcGFnZTogcGFnZSxcbiAgICAgICAgcGVyUGFnZTogcGVyUGFnZVxuICAgICAgfSksIHtcbiAgICAgICAgaWRzOiB0b3BpY0lkc09yU2x1Z3MgPT0gbnVsbCA/IHZvaWQgMCA6IHRvcGljSWRzT3JTbHVncy5qb2luKCcsJyksXG4gICAgICAgIG9yZGVyX2J5OiBvcmRlckJ5XG4gICAgICB9KSlcbiAgICB9O1xuICB9LFxuICBoYW5kbGVSZXNwb25zZTogLyojX19QVVJFX18qL2hhbmRsZUZlZWRSZXNwb25zZSgpXG59KTtcbnZhciBnZXQkMyA9IC8qI19fUFVSRV9fKi9tYWtlRW5kcG9pbnQoe1xuICBnZXRQYXRobmFtZTogZ2V0VG9waWNQYXRoLFxuICBoYW5kbGVSZXF1ZXN0OiBmdW5jdGlvbiBoYW5kbGVSZXF1ZXN0KF9yZWYzKSB7XG4gICAgdmFyIHRvcGljSWRPclNsdWcgPSBfcmVmMy50b3BpY0lkT3JTbHVnO1xuICAgIHJldHVybiB7XG4gICAgICBwYXRobmFtZTogZ2V0VG9waWNQYXRoKHtcbiAgICAgICAgdG9waWNJZE9yU2x1ZzogdG9waWNJZE9yU2x1Z1xuICAgICAgfSksXG4gICAgICBxdWVyeToge31cbiAgICB9O1xuICB9LFxuICBoYW5kbGVSZXNwb25zZTogLyojX19QVVJFX18qL2Nhc3RSZXNwb25zZSgpXG59KTtcbnZhciBnZXRQaG90b3MkMyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBnZXRQYXRobmFtZSA9IC8qI19fUFVSRV9fKi9mbG93KGdldFRvcGljUGF0aCwgZnVuY3Rpb24gKHRvcGljUGF0aCkge1xuICAgIHJldHVybiB0b3BpY1BhdGggKyBcIi9waG90b3NcIjtcbiAgfSk7XG4gIHJldHVybiBtYWtlRW5kcG9pbnQoe1xuICAgIGdldFBhdGhuYW1lOiBnZXRQYXRobmFtZSxcbiAgICBoYW5kbGVSZXF1ZXN0OiBmdW5jdGlvbiBoYW5kbGVSZXF1ZXN0KF9yZWY0KSB7XG4gICAgICB2YXIgdG9waWNJZE9yU2x1ZyA9IF9yZWY0LnRvcGljSWRPclNsdWcsXG4gICAgICAgICAgb3JpZW50YXRpb24gPSBfcmVmNC5vcmllbnRhdGlvbixcbiAgICAgICAgICBmZWVkUGFyYW1zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZjQsIFtcInRvcGljSWRPclNsdWdcIiwgXCJvcmllbnRhdGlvblwiXSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhuYW1lOiBnZXRQYXRobmFtZSh7XG4gICAgICAgICAgdG9waWNJZE9yU2x1ZzogdG9waWNJZE9yU2x1Z1xuICAgICAgICB9KSxcbiAgICAgICAgcXVlcnk6IGNvbXBhY3REZWZpbmVkKF9leHRlbmRzKHt9LCBnZXRGZWVkUGFyYW1zKGZlZWRQYXJhbXMpLCB7XG4gICAgICAgICAgb3JpZW50YXRpb246IG9yaWVudGF0aW9uXG4gICAgICAgIH0pKVxuICAgICAgfTtcbiAgICB9LFxuICAgIGhhbmRsZVJlc3BvbnNlOiBoYW5kbGVGZWVkUmVzcG9uc2UoKVxuICB9KTtcbn0oKTtcblxudmFyIGluZGV4JDQgPSB7XG4gIF9fcHJvdG9fXzogbnVsbCxcbiAgbGlzdDogbGlzdCQyLFxuICBnZXQ6IGdldCQzLFxuICBnZXRQaG90b3M6IGdldFBob3RvcyQzXG59O1xuXG52YXIgdHJhY2tOb25Ib3RMaW5rZWRQaG90b1ZpZXcgPSBmdW5jdGlvbiB0cmFja05vbkhvdExpbmtlZFBob3RvVmlldyhfcmVmKSB7XG4gIHZhciBhcHBJZCA9IF9yZWYuYXBwSWQ7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICB2YXIgcGhvdG9JZCA9IF9yZWYyLnBob3RvSWQ7XG4gICAgdmFyIGlkcyA9ICFBcnJheS5pc0FycmF5KHBob3RvSWQpID8gW3Bob3RvSWRdIDogcGhvdG9JZDtcblxuICAgIGlmIChpZHMubGVuZ3RoID4gMjApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGNhbm5vdCB0cmFjayBtb3JlIHRoYW4gMjAgcGhvdG9zIGF0IG9uY2UuIFBsZWFzZSB0cnkgYWdhaW4gd2l0aCBmZXdlciBwaG90b3MuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZldGNoKFwidmlld3MudW5zcGxhc2guY29tL3Y/cGhvdG9faWQ9XCIgKyBpZHMuam9pbigpICsgXCImYXBwX2lkPVwiICsgYXBwSWQpO1xuICB9O1xufTtcblxuXG5cbnZhciBpbnRlcm5hbHMgPSB7XG4gIF9fcHJvdG9fXzogbnVsbCxcbiAgY29sbGVjdGlvbnM6IGluZGV4LFxuICBwaG90b3M6IGluZGV4JDEsXG4gIHNlYXJjaDogaW5kZXgkMixcbiAgdXNlcnM6IGluZGV4JDMsXG4gIHRvcGljczogaW5kZXgkNCxcbiAgdHJhY2tOb25Ib3RMaW5rZWRQaG90b1ZpZXc6IHRyYWNrTm9uSG90TGlua2VkUGhvdG9WaWV3XG59O1xuXG52YXIgTGFuZ3VhZ2U7XG5cbihmdW5jdGlvbiAoTGFuZ3VhZ2UpIHtcbiAgTGFuZ3VhZ2VbXCJBZnJpa2FhbnNcIl0gPSBcImFmXCI7XG4gIExhbmd1YWdlW1wiQW1oYXJpY1wiXSA9IFwiYW1cIjtcbiAgTGFuZ3VhZ2VbXCJBcmFiaWNcIl0gPSBcImFyXCI7XG4gIExhbmd1YWdlW1wiQXplcmJhaWphbmlcIl0gPSBcImF6XCI7XG4gIExhbmd1YWdlW1wiQmVsYXJ1c2lhblwiXSA9IFwiYmVcIjtcbiAgTGFuZ3VhZ2VbXCJCdWxnYXJpYW5cIl0gPSBcImJnXCI7XG4gIExhbmd1YWdlW1wiQmVuZ2FsaVwiXSA9IFwiYm5cIjtcbiAgTGFuZ3VhZ2VbXCJCb3NuaWFuXCJdID0gXCJic1wiO1xuICBMYW5ndWFnZVtcIkNhdGFsYW5cIl0gPSBcImNhXCI7XG4gIExhbmd1YWdlW1wiQ2VidWFub1wiXSA9IFwiY2ViXCI7XG4gIExhbmd1YWdlW1wiQ29yc2ljYW5cIl0gPSBcImNvXCI7XG4gIExhbmd1YWdlW1wiQ3plY2hcIl0gPSBcImNzXCI7XG4gIExhbmd1YWdlW1wiV2Vsc2hcIl0gPSBcImN5XCI7XG4gIExhbmd1YWdlW1wiRGFuaXNoXCJdID0gXCJkYVwiO1xuICBMYW5ndWFnZVtcIkdlcm1hblwiXSA9IFwiZGVcIjtcbiAgTGFuZ3VhZ2VbXCJHcmVla1wiXSA9IFwiZWxcIjtcbiAgTGFuZ3VhZ2VbXCJFbmdsaXNoXCJdID0gXCJlblwiO1xuICBMYW5ndWFnZVtcIkVzcGVyYW50b1wiXSA9IFwiZW9cIjtcbiAgTGFuZ3VhZ2VbXCJTcGFuaXNoXCJdID0gXCJlc1wiO1xuICBMYW5ndWFnZVtcIkVzdG9uaWFuXCJdID0gXCJldFwiO1xuICBMYW5ndWFnZVtcIkJhc3F1ZVwiXSA9IFwiZXVcIjtcbiAgTGFuZ3VhZ2VbXCJQZXJzaWFuXCJdID0gXCJmYVwiO1xuICBMYW5ndWFnZVtcIkZpbm5pc2hcIl0gPSBcImZpXCI7XG4gIExhbmd1YWdlW1wiRnJlbmNoXCJdID0gXCJmclwiO1xuICBMYW5ndWFnZVtcIkZyaXNpYW5cIl0gPSBcImZ5XCI7XG4gIExhbmd1YWdlW1wiSXJpc2hcIl0gPSBcImdhXCI7XG4gIExhbmd1YWdlW1wiU2NvdHNHYWVsaWNcIl0gPSBcImdkXCI7XG4gIExhbmd1YWdlW1wiR2FsaWNpYW5cIl0gPSBcImdsXCI7XG4gIExhbmd1YWdlW1wiR3VqYXJhdGlcIl0gPSBcImd1XCI7XG4gIExhbmd1YWdlW1wiSGF1c2FcIl0gPSBcImhhXCI7XG4gIExhbmd1YWdlW1wiSGF3YWlpYW5cIl0gPSBcImhhd1wiO1xuICBMYW5ndWFnZVtcIkhpbmRpXCJdID0gXCJoaVwiO1xuICBMYW5ndWFnZVtcIkhtb25nXCJdID0gXCJobW5cIjtcbiAgTGFuZ3VhZ2VbXCJDcm9hdGlhblwiXSA9IFwiaHJcIjtcbiAgTGFuZ3VhZ2VbXCJIYWl0aWFuQ3Jlb2xlXCJdID0gXCJodFwiO1xuICBMYW5ndWFnZVtcIkh1bmdhcmlhblwiXSA9IFwiaHVcIjtcbiAgTGFuZ3VhZ2VbXCJBcm1lbmlhblwiXSA9IFwiaHlcIjtcbiAgTGFuZ3VhZ2VbXCJJbmRvbmVzaWFuXCJdID0gXCJpZFwiO1xuICBMYW5ndWFnZVtcIklnYm9cIl0gPSBcImlnXCI7XG4gIExhbmd1YWdlW1wiSWNlbGFuZGljXCJdID0gXCJpc1wiO1xuICBMYW5ndWFnZVtcIkl0YWxpYW5cIl0gPSBcIml0XCI7XG4gIExhbmd1YWdlW1wiSGVicmV3XCJdID0gXCJpd1wiO1xuICBMYW5ndWFnZVtcIkphcGFuZXNlXCJdID0gXCJqYVwiO1xuICBMYW5ndWFnZVtcIkphdmFuZXNlXCJdID0gXCJqd1wiO1xuICBMYW5ndWFnZVtcIkdlb3JnaWFuXCJdID0gXCJrYVwiO1xuICBMYW5ndWFnZVtcIkthemFraFwiXSA9IFwia2tcIjtcbiAgTGFuZ3VhZ2VbXCJLaG1lclwiXSA9IFwia21cIjtcbiAgTGFuZ3VhZ2VbXCJLYW5uYWRhXCJdID0gXCJrblwiO1xuICBMYW5ndWFnZVtcIktvcmVhblwiXSA9IFwia29cIjtcbiAgTGFuZ3VhZ2VbXCJLdXJkaXNoXCJdID0gXCJrdVwiO1xuICBMYW5ndWFnZVtcIkt5cmd5elwiXSA9IFwia3lcIjtcbiAgTGFuZ3VhZ2VbXCJMYXRpblwiXSA9IFwibGFcIjtcbiAgTGFuZ3VhZ2VbXCJMdXhlbWJvdXJnaXNoXCJdID0gXCJsYlwiO1xuICBMYW5ndWFnZVtcIkxhb1wiXSA9IFwibG9cIjtcbiAgTGFuZ3VhZ2VbXCJMaXRodWFuaWFuXCJdID0gXCJsdFwiO1xuICBMYW5ndWFnZVtcIkxhdHZpYW5cIl0gPSBcImx2XCI7XG4gIExhbmd1YWdlW1wiTWFsYWdhc3lcIl0gPSBcIm1nXCI7XG4gIExhbmd1YWdlW1wiTWFvcmlcIl0gPSBcIm1pXCI7XG4gIExhbmd1YWdlW1wiTWFjZWRvbmlhblwiXSA9IFwibWtcIjtcbiAgTGFuZ3VhZ2VbXCJNYWxheWFsYW1cIl0gPSBcIm1sXCI7XG4gIExhbmd1YWdlW1wiTW9uZ29saWFuXCJdID0gXCJtblwiO1xuICBMYW5ndWFnZVtcIk1hcmF0aGlcIl0gPSBcIm1yXCI7XG4gIExhbmd1YWdlW1wiTWFsYXlcIl0gPSBcIm1zXCI7XG4gIExhbmd1YWdlW1wiTWFsdGVzZVwiXSA9IFwibXRcIjtcbiAgTGFuZ3VhZ2VbXCJNeWFubWFyXCJdID0gXCJteVwiO1xuICBMYW5ndWFnZVtcIk5lcGFsaVwiXSA9IFwibmVcIjtcbiAgTGFuZ3VhZ2VbXCJEdXRjaFwiXSA9IFwibmxcIjtcbiAgTGFuZ3VhZ2VbXCJOb3J3ZWdpYW5cIl0gPSBcIm5vXCI7XG4gIExhbmd1YWdlW1wiTnlhbmphXCJdID0gXCJueVwiO1xuICBMYW5ndWFnZVtcIk9yaXlhXCJdID0gXCJvclwiO1xuICBMYW5ndWFnZVtcIlB1bmphYmlcIl0gPSBcInBhXCI7XG4gIExhbmd1YWdlW1wiUG9saXNoXCJdID0gXCJwbFwiO1xuICBMYW5ndWFnZVtcIlBhc2h0b1wiXSA9IFwicHNcIjtcbiAgTGFuZ3VhZ2VbXCJQb3J0dWd1ZXNlXCJdID0gXCJwdFwiO1xuICBMYW5ndWFnZVtcIlJvbWFuaWFuXCJdID0gXCJyb1wiO1xuICBMYW5ndWFnZVtcIlJ1c3NpYW5cIl0gPSBcInJ1XCI7XG4gIExhbmd1YWdlW1wiS2lueWFyd2FuZGFcIl0gPSBcInJ3XCI7XG4gIExhbmd1YWdlW1wiU2luZGhpXCJdID0gXCJzZFwiO1xuICBMYW5ndWFnZVtcIlNpbmhhbGFcIl0gPSBcInNpXCI7XG4gIExhbmd1YWdlW1wiU2xvdmFrXCJdID0gXCJza1wiO1xuICBMYW5ndWFnZVtcIlNsb3ZlbmlhblwiXSA9IFwic2xcIjtcbiAgTGFuZ3VhZ2VbXCJTYW1vYW5cIl0gPSBcInNtXCI7XG4gIExhbmd1YWdlW1wiU2hvbmFcIl0gPSBcInNuXCI7XG4gIExhbmd1YWdlW1wiU29tYWxpXCJdID0gXCJzb1wiO1xuICBMYW5ndWFnZVtcIkFsYmFuaWFuXCJdID0gXCJzcVwiO1xuICBMYW5ndWFnZVtcIlNlcmJpYW5cIl0gPSBcInNyXCI7XG4gIExhbmd1YWdlW1wiU2Vzb3Rob1wiXSA9IFwic3RcIjtcbiAgTGFuZ3VhZ2VbXCJTdW5kYW5lc2VcIl0gPSBcInN1XCI7XG4gIExhbmd1YWdlW1wiU3dlZGlzaFwiXSA9IFwic3ZcIjtcbiAgTGFuZ3VhZ2VbXCJTd2FoaWxpXCJdID0gXCJzd1wiO1xuICBMYW5ndWFnZVtcIlRhbWlsXCJdID0gXCJ0YVwiO1xuICBMYW5ndWFnZVtcIlRlbHVndVwiXSA9IFwidGVcIjtcbiAgTGFuZ3VhZ2VbXCJUYWppa1wiXSA9IFwidGdcIjtcbiAgTGFuZ3VhZ2VbXCJUaGFpXCJdID0gXCJ0aFwiO1xuICBMYW5ndWFnZVtcIlR1cmttZW5cIl0gPSBcInRrXCI7XG4gIExhbmd1YWdlW1wiRmlsaXBpbm9cIl0gPSBcInRsXCI7XG4gIExhbmd1YWdlW1wiVHVya2lzaFwiXSA9IFwidHJcIjtcbiAgTGFuZ3VhZ2VbXCJUYXRhclwiXSA9IFwidHRcIjtcbiAgTGFuZ3VhZ2VbXCJVaWdodXJcIl0gPSBcInVnXCI7XG4gIExhbmd1YWdlW1wiVWtyYWluaWFuXCJdID0gXCJ1a1wiO1xuICBMYW5ndWFnZVtcIlVyZHVcIl0gPSBcInVyXCI7XG4gIExhbmd1YWdlW1wiVXpiZWtcIl0gPSBcInV6XCI7XG4gIExhbmd1YWdlW1wiVmlldG5hbWVzZVwiXSA9IFwidmlcIjtcbiAgTGFuZ3VhZ2VbXCJYaG9zYVwiXSA9IFwieGhcIjtcbiAgTGFuZ3VhZ2VbXCJZaWRkaXNoXCJdID0gXCJ5aVwiO1xuICBMYW5ndWFnZVtcIllvcnViYVwiXSA9IFwieW9cIjtcbiAgTGFuZ3VhZ2VbXCJDaGluZXNlU2ltcGxpZmllZFwiXSA9IFwiemhcIjtcbiAgTGFuZ3VhZ2VbXCJDaGluZXNlVHJhZGl0aW9uYWxcIl0gPSBcInpoLVRXXCI7XG4gIExhbmd1YWdlW1wiWnVsdVwiXSA9IFwienVcIjtcbn0pKExhbmd1YWdlIHx8IChMYW5ndWFnZSA9IHt9KSk7XG5cbnZhciBPcmRlckJ5O1xuXG4oZnVuY3Rpb24gKE9yZGVyQnkpIHtcbiAgT3JkZXJCeVtcIkxBVEVTVFwiXSA9IFwibGF0ZXN0XCI7XG4gIE9yZGVyQnlbXCJQT1BVTEFSXCJdID0gXCJwb3B1bGFyXCI7XG4gIE9yZGVyQnlbXCJWSUVXU1wiXSA9IFwidmlld3NcIjtcbiAgT3JkZXJCeVtcIkRPV05MT0FEU1wiXSA9IFwiZG93bmxvYWRzXCI7XG4gIE9yZGVyQnlbXCJPTERFU1RcIl0gPSBcIm9sZGVzdFwiO1xufSkoT3JkZXJCeSB8fCAoT3JkZXJCeSA9IHt9KSk7XG5cbnZhciBjcmVhdGVBcGkgPSAvKiNfX1BVUkVfXyovZmxvdyhpbml0TWFrZVJlcXVlc3QsIGZ1bmN0aW9uIChtYWtlUmVxdWVzdCkge1xuICByZXR1cm4ge1xuICAgIHBob3Rvczoge1xuICAgICAgZ2V0OiBtYWtlUmVxdWVzdChnZXQkMSksXG4gICAgICBsaXN0OiBtYWtlUmVxdWVzdChsaXN0JDEpLFxuICAgICAgZ2V0U3RhdHM6IG1ha2VSZXF1ZXN0KGdldFN0YXRzKSxcbiAgICAgIGdldFJhbmRvbTogbWFrZVJlcXVlc3QoZ2V0UmFuZG9tKSxcbiAgICAgIHRyYWNrRG93bmxvYWQ6IG1ha2VSZXF1ZXN0KHRyYWNrRG93bmxvYWQpXG4gICAgfSxcbiAgICB1c2Vyczoge1xuICAgICAgZ2V0UGhvdG9zOiBtYWtlUmVxdWVzdChnZXRQaG90b3MkMiksXG4gICAgICBnZXRDb2xsZWN0aW9uczogbWFrZVJlcXVlc3QoZ2V0Q29sbGVjdGlvbnMkMiksXG4gICAgICBnZXRMaWtlczogbWFrZVJlcXVlc3QoZ2V0TGlrZXMpLFxuICAgICAgZ2V0OiBtYWtlUmVxdWVzdChnZXQkMilcbiAgICB9LFxuICAgIHNlYXJjaDoge1xuICAgICAgZ2V0Q29sbGVjdGlvbnM6IG1ha2VSZXF1ZXN0KGdldENvbGxlY3Rpb25zJDEpLFxuICAgICAgZ2V0UGhvdG9zOiBtYWtlUmVxdWVzdChnZXRQaG90b3MkMSksXG4gICAgICBnZXRVc2VyczogbWFrZVJlcXVlc3QoZ2V0VXNlcnMpXG4gICAgfSxcbiAgICBjb2xsZWN0aW9uczoge1xuICAgICAgZ2V0UGhvdG9zOiBtYWtlUmVxdWVzdChnZXRQaG90b3MpLFxuICAgICAgZ2V0OiBtYWtlUmVxdWVzdChnZXQpLFxuICAgICAgbGlzdDogbWFrZVJlcXVlc3QobGlzdCksXG4gICAgICBnZXRSZWxhdGVkOiBtYWtlUmVxdWVzdChnZXRSZWxhdGVkKVxuICAgIH0sXG4gICAgdG9waWNzOiB7XG4gICAgICBsaXN0OiBtYWtlUmVxdWVzdChsaXN0JDIpLFxuICAgICAgZ2V0OiBtYWtlUmVxdWVzdChnZXQkMyksXG4gICAgICBnZXRQaG90b3M6IG1ha2VSZXF1ZXN0KGdldFBob3RvcyQzKVxuICAgIH1cbiAgfTtcbn0pO1xuXG5leHBvcnQgeyBMYW5ndWFnZSwgT3JkZXJCeSwgaW50ZXJuYWxzIGFzIF9pbnRlcm5hbHMsIGNyZWF0ZUFwaSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dW5zcGxhc2gtanMuZXNtLmpzLm1hcFxuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIsIFtcIm1vZHVsZVwiXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBmYWN0b3J5KG1vZHVsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG1vZCA9IHtcbiAgICAgIGV4cG9ydHM6IHt9XG4gICAgfTtcbiAgICBmYWN0b3J5KG1vZCk7XG4gICAgZ2xvYmFsLmJyb3dzZXIgPSBtb2QuZXhwb3J0cztcbiAgfVxufSkodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxUaGlzIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24gKG1vZHVsZSkge1xuICAvKiB3ZWJleHRlbnNpb24tcG9seWZpbGwgLSB2MC4xMC4wIC0gRnJpIEF1ZyAxMiAyMDIyIDE5OjQyOjQ0ICovXG5cbiAgLyogLSotIE1vZGU6IGluZGVudC10YWJzLW1vZGU6IG5pbDsganMtaW5kZW50LWxldmVsOiAyIC0qLSAqL1xuXG4gIC8qIHZpbTogc2V0IHN0cz0yIHN3PTIgZXQgdHc9ODA6ICovXG5cbiAgLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICAgKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gICAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGlmICghZ2xvYmFsVGhpcy5jaHJvbWU/LnJ1bnRpbWU/LmlkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBzY3JpcHQgc2hvdWxkIG9ubHkgYmUgbG9hZGVkIGluIGEgYnJvd3NlciBleHRlbnNpb24uXCIpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzLmJyb3dzZXIgPT09IFwidW5kZWZpbmVkXCIgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKGdsb2JhbFRoaXMuYnJvd3NlcikgIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICBjb25zdCBDSFJPTUVfU0VORF9NRVNTQUdFX0NBTExCQUNLX05PX1JFU1BPTlNFX01FU1NBR0UgPSBcIlRoZSBtZXNzYWdlIHBvcnQgY2xvc2VkIGJlZm9yZSBhIHJlc3BvbnNlIHdhcyByZWNlaXZlZC5cIjsgLy8gV3JhcHBpbmcgdGhlIGJ1bGsgb2YgdGhpcyBwb2x5ZmlsbCBpbiBhIG9uZS10aW1lLXVzZSBmdW5jdGlvbiBpcyBhIG1pbm9yXG4gICAgLy8gb3B0aW1pemF0aW9uIGZvciBGaXJlZm94LiBTaW5jZSBTcGlkZXJtb25rZXkgZG9lcyBub3QgZnVsbHkgcGFyc2UgdGhlXG4gICAgLy8gY29udGVudHMgb2YgYSBmdW5jdGlvbiB1bnRpbCB0aGUgZmlyc3QgdGltZSBpdCdzIGNhbGxlZCwgYW5kIHNpbmNlIGl0IHdpbGxcbiAgICAvLyBuZXZlciBhY3R1YWxseSBuZWVkIHRvIGJlIGNhbGxlZCwgdGhpcyBhbGxvd3MgdGhlIHBvbHlmaWxsIHRvIGJlIGluY2x1ZGVkXG4gICAgLy8gaW4gRmlyZWZveCBuZWFybHkgZm9yIGZyZWUuXG5cbiAgICBjb25zdCB3cmFwQVBJcyA9IGV4dGVuc2lvbkFQSXMgPT4ge1xuICAgICAgLy8gTk9URTogYXBpTWV0YWRhdGEgaXMgYXNzb2NpYXRlZCB0byB0aGUgY29udGVudCBvZiB0aGUgYXBpLW1ldGFkYXRhLmpzb24gZmlsZVxuICAgICAgLy8gYXQgYnVpbGQgdGltZSBieSByZXBsYWNpbmcgdGhlIGZvbGxvd2luZyBcImluY2x1ZGVcIiB3aXRoIHRoZSBjb250ZW50IG9mIHRoZVxuICAgICAgLy8gSlNPTiBmaWxlLlxuICAgICAgY29uc3QgYXBpTWV0YWRhdGEgPSB7XG4gICAgICAgIFwiYWxhcm1zXCI6IHtcbiAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xlYXJBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJib29rbWFya3NcIjoge1xuICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Q2hpbGRyZW5cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRSZWNlbnRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRTdWJUcmVlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VHJlZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVUcmVlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYnJvd3NlckFjdGlvblwiOiB7XG4gICAgICAgICAgXCJkaXNhYmxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZW5hYmxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3JcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRCYWRnZVRleHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3BlblBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3JcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRCYWRnZVRleHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJyb3dzaW5nRGF0YVwiOiB7XG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDYWNoZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNvb2tpZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVEb3dubG9hZHNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVGb3JtRGF0YVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUhpc3RvcnlcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVMb2NhbFN0b3JhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVQYXNzd29yZHNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVQbHVnaW5EYXRhXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb21tYW5kc1wiOiB7XG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb250ZXh0TWVudXNcIjoge1xuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY29va2llc1wiOiB7XG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxDb29raWVTdG9yZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJkZXZ0b29sc1wiOiB7XG4gICAgICAgICAgXCJpbnNwZWN0ZWRXaW5kb3dcIjoge1xuICAgICAgICAgICAgXCJldmFsXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyLFxuICAgICAgICAgICAgICBcInNpbmdsZUNhbGxiYWNrQXJnXCI6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInBhbmVsc1wiOiB7XG4gICAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAzLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMyxcbiAgICAgICAgICAgICAgXCJzaW5nbGVDYWxsYmFja0FyZ1wiOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJlbGVtZW50c1wiOiB7XG4gICAgICAgICAgICAgIFwiY3JlYXRlU2lkZWJhclBhbmVcIjoge1xuICAgICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiZG93bmxvYWRzXCI6IHtcbiAgICAgICAgICBcImNhbmNlbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRvd25sb2FkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZXJhc2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRGaWxlSWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJwYXVzZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUZpbGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXN1bWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiZXh0ZW5zaW9uXCI6IHtcbiAgICAgICAgICBcImlzQWxsb3dlZEZpbGVTY2hlbWVBY2Nlc3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpc0FsbG93ZWRJbmNvZ25pdG9BY2Nlc3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJoaXN0b3J5XCI6IHtcbiAgICAgICAgICBcImFkZFVybFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRlbGV0ZUFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRlbGV0ZVJhbmdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlVXJsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VmlzaXRzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaTE4blwiOiB7XG4gICAgICAgICAgXCJkZXRlY3RMYW5ndWFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFjY2VwdExhbmd1YWdlc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImlkZW50aXR5XCI6IHtcbiAgICAgICAgICBcImxhdW5jaFdlYkF1dGhGbG93XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaWRsZVwiOiB7XG4gICAgICAgICAgXCJxdWVyeVN0YXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibWFuYWdlbWVudFwiOiB7XG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRTZWxmXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0RW5hYmxlZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVuaW5zdGFsbFNlbGZcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJub3RpZmljYXRpb25zXCI6IHtcbiAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UGVybWlzc2lvbkxldmVsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicGFnZUFjdGlvblwiOiB7XG4gICAgICAgICAgXCJnZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaGlkZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2hvd1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInBlcm1pc3Npb25zXCI6IHtcbiAgICAgICAgICBcImNvbnRhaW5zXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVxdWVzdFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInJ1bnRpbWVcIjoge1xuICAgICAgICAgIFwiZ2V0QmFja2dyb3VuZFBhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRQbGF0Zm9ybUluZm9cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuT3B0aW9uc1BhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXF1ZXN0VXBkYXRlQ2hlY2tcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmROYXRpdmVNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VW5pbnN0YWxsVVJMXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwic2Vzc2lvbnNcIjoge1xuICAgICAgICAgIFwiZ2V0RGV2aWNlc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFJlY2VudGx5Q2xvc2VkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVzdG9yZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInN0b3JhZ2VcIjoge1xuICAgICAgICAgIFwibG9jYWxcIjoge1xuICAgICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRCeXRlc0luVXNlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtYW5hZ2VkXCI6IHtcbiAgICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRCeXRlc0luVXNlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN5bmNcIjoge1xuICAgICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRCeXRlc0luVXNlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ0YWJzXCI6IHtcbiAgICAgICAgICBcImNhcHR1cmVWaXNpYmxlVGFiXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGV0ZWN0TGFuZ3VhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkaXNjYXJkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZHVwbGljYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZXhlY3V0ZVNjcmlwdFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEN1cnJlbnRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRab29tXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Wm9vbVNldHRpbmdzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ29CYWNrXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ29Gb3J3YXJkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaGlnaGxpZ2h0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaW5zZXJ0Q1NTXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInF1ZXJ5XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVsb2FkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ1NTXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogM1xuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRab29tXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0Wm9vbVNldHRpbmdzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwidG9wU2l0ZXNcIjoge1xuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2ViTmF2aWdhdGlvblwiOiB7XG4gICAgICAgICAgXCJnZXRBbGxGcmFtZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRGcmFtZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIndlYlJlcXVlc3RcIjoge1xuICAgICAgICAgIFwiaGFuZGxlckJlaGF2aW9yQ2hhbmdlZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIndpbmRvd3NcIjoge1xuICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Q3VycmVudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldExhc3RGb2N1c2VkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlmIChPYmplY3Qua2V5cyhhcGlNZXRhZGF0YSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImFwaS1tZXRhZGF0YS5qc29uIGhhcyBub3QgYmVlbiBpbmNsdWRlZCBpbiBicm93c2VyLXBvbHlmaWxsXCIpO1xuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgKiBBIFdlYWtNYXAgc3ViY2xhc3Mgd2hpY2ggY3JlYXRlcyBhbmQgc3RvcmVzIGEgdmFsdWUgZm9yIGFueSBrZXkgd2hpY2ggZG9lc1xuICAgICAgICogbm90IGV4aXN0IHdoZW4gYWNjZXNzZWQsIGJ1dCBiZWhhdmVzIGV4YWN0bHkgYXMgYW4gb3JkaW5hcnkgV2Vha01hcFxuICAgICAgICogb3RoZXJ3aXNlLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNyZWF0ZUl0ZW1cbiAgICAgICAqICAgICAgICBBIGZ1bmN0aW9uIHdoaWNoIHdpbGwgYmUgY2FsbGVkIGluIG9yZGVyIHRvIGNyZWF0ZSB0aGUgdmFsdWUgZm9yIGFueVxuICAgICAgICogICAgICAgIGtleSB3aGljaCBkb2VzIG5vdCBleGlzdCwgdGhlIGZpcnN0IHRpbWUgaXQgaXMgYWNjZXNzZWQuIFRoZVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uIHJlY2VpdmVzLCBhcyBpdHMgb25seSBhcmd1bWVudCwgdGhlIGtleSBiZWluZyBjcmVhdGVkLlxuICAgICAgICovXG5cblxuICAgICAgY2xhc3MgRGVmYXVsdFdlYWtNYXAgZXh0ZW5kcyBXZWFrTWFwIHtcbiAgICAgICAgY29uc3RydWN0b3IoY3JlYXRlSXRlbSwgaXRlbXMgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzdXBlcihpdGVtcyk7XG4gICAgICAgICAgdGhpcy5jcmVhdGVJdGVtID0gY3JlYXRlSXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldChrZXkpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgdGhpcy5jcmVhdGVJdGVtKGtleSkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBzdXBlci5nZXQoa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGFuIG9iamVjdCB3aXRoIGEgYHRoZW5gIG1ldGhvZCwgYW5kIGNhblxuICAgICAgICogdGhlcmVmb3JlIGJlIGFzc3VtZWQgdG8gYmVoYXZlIGFzIGEgUHJvbWlzZS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICAgICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHRoZW5hYmxlLlxuICAgICAgICovXG5cblxuICAgICAgY29uc3QgaXNUaGVuYWJsZSA9IHZhbHVlID0+IHtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gXCJmdW5jdGlvblwiO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIHdoaWNoLCB3aGVuIGNhbGxlZCwgd2lsbCByZXNvbHZlIG9yIHJlamVjdFxuICAgICAgICogdGhlIGdpdmVuIHByb21pc2UgYmFzZWQgb24gaG93IGl0IGlzIGNhbGxlZDpcbiAgICAgICAqXG4gICAgICAgKiAtIElmLCB3aGVuIGNhbGxlZCwgYGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcmAgY29udGFpbnMgYSBub24tbnVsbCBvYmplY3QsXG4gICAgICAgKiAgIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIHdpdGggdGhhdCB2YWx1ZS5cbiAgICAgICAqIC0gSWYgdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIGV4YWN0bHkgb25lIGFyZ3VtZW50LCB0aGUgcHJvbWlzZSBpc1xuICAgICAgICogICByZXNvbHZlZCB0byB0aGF0IHZhbHVlLlxuICAgICAgICogLSBPdGhlcndpc2UsIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHRvIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZVxuICAgICAgICogICBmdW5jdGlvbidzIGFyZ3VtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gcHJvbWlzZVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSByZXNvbHV0aW9uIGFuZCByZWplY3Rpb24gZnVuY3Rpb25zIG9mIGFcbiAgICAgICAqICAgICAgICBwcm9taXNlLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJvbWlzZS5yZXNvbHZlXG4gICAgICAgKiAgICAgICAgVGhlIHByb21pc2UncyByZXNvbHV0aW9uIGZ1bmN0aW9uLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJvbWlzZS5yZWplY3RcbiAgICAgICAqICAgICAgICBUaGUgcHJvbWlzZSdzIHJlamVjdGlvbiBmdW5jdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YVxuICAgICAgICogICAgICAgIE1ldGFkYXRhIGFib3V0IHRoZSB3cmFwcGVkIG1ldGhvZCB3aGljaCBoYXMgY3JlYXRlZCB0aGUgY2FsbGJhY2suXG4gICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnXG4gICAgICAgKiAgICAgICAgV2hldGhlciBvciBub3QgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCBvbmx5IHRoZSBmaXJzdFxuICAgICAgICogICAgICAgIGFyZ3VtZW50IG9mIHRoZSBjYWxsYmFjaywgYWx0ZXJuYXRpdmVseSBhbiBhcnJheSBvZiBhbGwgdGhlXG4gICAgICAgKiAgICAgICAgY2FsbGJhY2sgYXJndW1lbnRzIGlzIHJlc29sdmVkLiBCeSBkZWZhdWx0LCBpZiB0aGUgY2FsbGJhY2tcbiAgICAgICAqICAgICAgICBmdW5jdGlvbiBpcyBpbnZva2VkIHdpdGggb25seSBhIHNpbmdsZSBhcmd1bWVudCwgdGhhdCB3aWxsIGJlXG4gICAgICAgKiAgICAgICAgcmVzb2x2ZWQgdG8gdGhlIHByb21pc2UsIHdoaWxlIGFsbCBhcmd1bWVudHMgd2lsbCBiZSByZXNvbHZlZCBhc1xuICAgICAgICogICAgICAgIGFuIGFycmF5IGlmIG11bHRpcGxlIGFyZSBnaXZlbi5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gICAgICAgKiAgICAgICAgVGhlIGdlbmVyYXRlZCBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IG1ha2VDYWxsYmFjayA9IChwcm9taXNlLCBtZXRhZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gKC4uLmNhbGxiYWNrQXJncykgPT4ge1xuICAgICAgICAgIGlmIChleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlamVjdChuZXcgRXJyb3IoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZyB8fCBjYWxsYmFja0FyZ3MubGVuZ3RoIDw9IDEgJiYgbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmcgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoY2FsbGJhY2tBcmdzWzBdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvbWlzZS5yZXNvbHZlKGNhbGxiYWNrQXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgY29uc3QgcGx1cmFsaXplQXJndW1lbnRzID0gbnVtQXJncyA9PiBudW1BcmdzID09IDEgPyBcImFyZ3VtZW50XCIgOiBcImFyZ3VtZW50c1wiO1xuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGEgd3JhcHBlciBmdW5jdGlvbiBmb3IgYSBtZXRob2Qgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBhbmQgbWV0YWRhdGEuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgICAqICAgICAgICBUaGUgbmFtZSBvZiB0aGUgbWV0aG9kIHdoaWNoIGlzIGJlaW5nIHdyYXBwZWQuXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gbWV0YWRhdGFcbiAgICAgICAqICAgICAgICBNZXRhZGF0YSBhYm91dCB0aGUgbWV0aG9kIGJlaW5nIHdyYXBwZWQuXG4gICAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IG1ldGFkYXRhLm1pbkFyZ3NcbiAgICAgICAqICAgICAgICBUaGUgbWluaW11bSBudW1iZXIgb2YgYXJndW1lbnRzIHdoaWNoIG11c3QgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uLiBJZiBjYWxsZWQgd2l0aCBmZXdlciB0aGFuIHRoaXMgbnVtYmVyIG9mIGFyZ3VtZW50cywgdGhlXG4gICAgICAgKiAgICAgICAgd3JhcHBlciB3aWxsIHJhaXNlIGFuIGV4Y2VwdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWF4QXJnc1xuICAgICAgICogICAgICAgIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbWF5IGJlIHBhc3NlZCB0byB0aGVcbiAgICAgICAqICAgICAgICBmdW5jdGlvbi4gSWYgY2FsbGVkIHdpdGggbW9yZSB0aGFuIHRoaXMgbnVtYmVyIG9mIGFyZ3VtZW50cywgdGhlXG4gICAgICAgKiAgICAgICAgd3JhcHBlciB3aWxsIHJhaXNlIGFuIGV4Y2VwdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmdcbiAgICAgICAqICAgICAgICBXaGV0aGVyIG9yIG5vdCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIG9ubHkgdGhlIGZpcnN0XG4gICAgICAgKiAgICAgICAgYXJndW1lbnQgb2YgdGhlIGNhbGxiYWNrLCBhbHRlcm5hdGl2ZWx5IGFuIGFycmF5IG9mIGFsbCB0aGVcbiAgICAgICAqICAgICAgICBjYWxsYmFjayBhcmd1bWVudHMgaXMgcmVzb2x2ZWQuIEJ5IGRlZmF1bHQsIGlmIHRoZSBjYWxsYmFja1xuICAgICAgICogICAgICAgIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aCBvbmx5IGEgc2luZ2xlIGFyZ3VtZW50LCB0aGF0IHdpbGwgYmVcbiAgICAgICAqICAgICAgICByZXNvbHZlZCB0byB0aGUgcHJvbWlzZSwgd2hpbGUgYWxsIGFyZ3VtZW50cyB3aWxsIGJlIHJlc29sdmVkIGFzXG4gICAgICAgKiAgICAgICAgYW4gYXJyYXkgaWYgbXVsdGlwbGUgYXJlIGdpdmVuLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbihvYmplY3QsIC4uLiopfVxuICAgICAgICogICAgICAgVGhlIGdlbmVyYXRlZCB3cmFwcGVyIGZ1bmN0aW9uLlxuICAgICAgICovXG5cblxuICAgICAgY29uc3Qgd3JhcEFzeW5jRnVuY3Rpb24gPSAobmFtZSwgbWV0YWRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGFzeW5jRnVuY3Rpb25XcmFwcGVyKHRhcmdldCwgLi4uYXJncykge1xuICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8IG1ldGFkYXRhLm1pbkFyZ3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbGVhc3QgJHttZXRhZGF0YS5taW5BcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5taW5BcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gbWV0YWRhdGEubWF4QXJncykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBtb3N0ICR7bWV0YWRhdGEubWF4QXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWF4QXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAobWV0YWRhdGEuZmFsbGJhY2tUb05vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgLy8gVGhpcyBBUEkgbWV0aG9kIGhhcyBjdXJyZW50bHkgbm8gY2FsbGJhY2sgb24gQ2hyb21lLCBidXQgaXQgcmV0dXJuIGEgcHJvbWlzZSBvbiBGaXJlZm94LFxuICAgICAgICAgICAgICAvLyBhbmQgc28gdGhlIHBvbHlmaWxsIHdpbGwgdHJ5IHRvIGNhbGwgaXQgd2l0aCBhIGNhbGxiYWNrIGZpcnN0LCBhbmQgaXQgd2lsbCBmYWxsYmFja1xuICAgICAgICAgICAgICAvLyB0byBub3QgcGFzc2luZyB0aGUgY2FsbGJhY2sgaWYgdGhlIGZpcnN0IGNhbGwgZmFpbHMuXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MsIG1ha2VDYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICAgICAgfSwgbWV0YWRhdGEpKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoY2JFcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtuYW1lfSBBUEkgbWV0aG9kIGRvZXNuJ3Qgc2VlbSB0byBzdXBwb3J0IHRoZSBjYWxsYmFjayBwYXJhbWV0ZXIsIGAgKyBcImZhbGxpbmcgYmFjayB0byBjYWxsIGl0IHdpdGhvdXQgYSBjYWxsYmFjazogXCIsIGNiRXJyb3IpO1xuICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzKTsgLy8gVXBkYXRlIHRoZSBBUEkgbWV0aG9kIG1ldGFkYXRhLCBzbyB0aGF0IHRoZSBuZXh0IEFQSSBjYWxscyB3aWxsIG5vdCB0cnkgdG9cbiAgICAgICAgICAgICAgICAvLyB1c2UgdGhlIHVuc3VwcG9ydGVkIGNhbGxiYWNrIGFueW1vcmUuXG5cbiAgICAgICAgICAgICAgICBtZXRhZGF0YS5mYWxsYmFja1RvTm9DYWxsYmFjayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG1ldGFkYXRhLm5vQ2FsbGJhY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChtZXRhZGF0YS5ub0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MsIG1ha2VDYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICAgfSwgbWV0YWRhdGEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIFdyYXBzIGFuIGV4aXN0aW5nIG1ldGhvZCBvZiB0aGUgdGFyZ2V0IG9iamVjdCwgc28gdGhhdCBjYWxscyB0byBpdCBhcmVcbiAgICAgICAqIGludGVyY2VwdGVkIGJ5IHRoZSBnaXZlbiB3cmFwcGVyIGZ1bmN0aW9uLiBUaGUgd3JhcHBlciBmdW5jdGlvbiByZWNlaXZlcyxcbiAgICAgICAqIGFzIGl0cyBmaXJzdCBhcmd1bWVudCwgdGhlIG9yaWdpbmFsIGB0YXJnZXRgIG9iamVjdCwgZm9sbG93ZWQgYnkgZWFjaCBvZlxuICAgICAgICogdGhlIGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIG9yaWdpbmFsIG1ldGhvZC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gICAgICAgKiAgICAgICAgVGhlIG9yaWdpbmFsIHRhcmdldCBvYmplY3QgdGhhdCB0aGUgd3JhcHBlZCBtZXRob2QgYmVsb25ncyB0by5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1ldGhvZFxuICAgICAgICogICAgICAgIFRoZSBtZXRob2QgYmVpbmcgd3JhcHBlZC4gVGhpcyBpcyB1c2VkIGFzIHRoZSB0YXJnZXQgb2YgdGhlIFByb3h5XG4gICAgICAgKiAgICAgICAgb2JqZWN0IHdoaWNoIGlzIGNyZWF0ZWQgdG8gd3JhcCB0aGUgbWV0aG9kLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gd3JhcHBlclxuICAgICAgICogICAgICAgIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHdoaWNoIGlzIGNhbGxlZCBpbiBwbGFjZSBvZiBhIGRpcmVjdCBpbnZvY2F0aW9uXG4gICAgICAgKiAgICAgICAgb2YgdGhlIHdyYXBwZWQgbWV0aG9kLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtQcm94eTxmdW5jdGlvbj59XG4gICAgICAgKiAgICAgICAgQSBQcm94eSBvYmplY3QgZm9yIHRoZSBnaXZlbiBtZXRob2QsIHdoaWNoIGludm9rZXMgdGhlIGdpdmVuIHdyYXBwZXJcbiAgICAgICAqICAgICAgICBtZXRob2QgaW4gaXRzIHBsYWNlLlxuICAgICAgICovXG5cblxuICAgICAgY29uc3Qgd3JhcE1ldGhvZCA9ICh0YXJnZXQsIG1ldGhvZCwgd3JhcHBlcikgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb3h5KG1ldGhvZCwge1xuICAgICAgICAgIGFwcGx5KHRhcmdldE1ldGhvZCwgdGhpc09iaiwgYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIHdyYXBwZXIuY2FsbCh0aGlzT2JqLCB0YXJnZXQsIC4uLmFyZ3MpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGxldCBoYXNPd25Qcm9wZXJ0eSA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbiAgICAgIC8qKlxuICAgICAgICogV3JhcHMgYW4gb2JqZWN0IGluIGEgUHJveHkgd2hpY2ggaW50ZXJjZXB0cyBhbmQgd3JhcHMgY2VydGFpbiBtZXRob2RzXG4gICAgICAgKiBiYXNlZCBvbiB0aGUgZ2l2ZW4gYHdyYXBwZXJzYCBhbmQgYG1ldGFkYXRhYCBvYmplY3RzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAgICAgICAqICAgICAgICBUaGUgdGFyZ2V0IG9iamVjdCB0byB3cmFwLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbd3JhcHBlcnMgPSB7fV1cbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgdHJlZSBjb250YWluaW5nIHdyYXBwZXIgZnVuY3Rpb25zIGZvciBzcGVjaWFsIGNhc2VzLiBBbnlcbiAgICAgICAqICAgICAgICBmdW5jdGlvbiBwcmVzZW50IGluIHRoaXMgb2JqZWN0IHRyZWUgaXMgY2FsbGVkIGluIHBsYWNlIG9mIHRoZVxuICAgICAgICogICAgICAgIG1ldGhvZCBpbiB0aGUgc2FtZSBsb2NhdGlvbiBpbiB0aGUgYHRhcmdldGAgb2JqZWN0IHRyZWUuIFRoZXNlXG4gICAgICAgKiAgICAgICAgd3JhcHBlciBtZXRob2RzIGFyZSBpbnZva2VkIGFzIGRlc2NyaWJlZCBpbiB7QHNlZSB3cmFwTWV0aG9kfS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gW21ldGFkYXRhID0ge31dXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IHRyZWUgY29udGFpbmluZyBtZXRhZGF0YSB1c2VkIHRvIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVcbiAgICAgICAqICAgICAgICBQcm9taXNlLWJhc2VkIHdyYXBwZXIgZnVuY3Rpb25zIGZvciBhc3luY2hyb25vdXMuIEFueSBmdW5jdGlvbiBpblxuICAgICAgICogICAgICAgIHRoZSBgdGFyZ2V0YCBvYmplY3QgdHJlZSB3aGljaCBoYXMgYSBjb3JyZXNwb25kaW5nIG1ldGFkYXRhIG9iamVjdFxuICAgICAgICogICAgICAgIGluIHRoZSBzYW1lIGxvY2F0aW9uIGluIHRoZSBgbWV0YWRhdGFgIHRyZWUgaXMgcmVwbGFjZWQgd2l0aCBhblxuICAgICAgICogICAgICAgIGF1dG9tYXRpY2FsbHktZ2VuZXJhdGVkIHdyYXBwZXIgZnVuY3Rpb24sIGFzIGRlc2NyaWJlZCBpblxuICAgICAgICogICAgICAgIHtAc2VlIHdyYXBBc3luY0Z1bmN0aW9ufVxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtQcm94eTxvYmplY3Q+fVxuICAgICAgICovXG5cbiAgICAgIGNvbnN0IHdyYXBPYmplY3QgPSAodGFyZ2V0LCB3cmFwcGVycyA9IHt9LCBtZXRhZGF0YSA9IHt9KSA9PiB7XG4gICAgICAgIGxldCBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGxldCBoYW5kbGVycyA9IHtcbiAgICAgICAgICBoYXMocHJveHlUYXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wIGluIHRhcmdldCB8fCBwcm9wIGluIGNhY2hlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBnZXQocHJveHlUYXJnZXQsIHByb3AsIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICBpZiAocHJvcCBpbiBjYWNoZSkge1xuICAgICAgICAgICAgICByZXR1cm4gY2FjaGVbcHJvcF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghKHByb3AgaW4gdGFyZ2V0KSkge1xuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0YXJnZXRbcHJvcF07XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIG9uIHRoZSB1bmRlcmx5aW5nIG9iamVjdC4gQ2hlY2sgaWYgd2UgbmVlZCB0byBkb1xuICAgICAgICAgICAgICAvLyBhbnkgd3JhcHBpbmcuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2Ygd3JhcHBlcnNbcHJvcF0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgYSBzcGVjaWFsLWNhc2Ugd3JhcHBlciBmb3IgdGhpcyBtZXRob2QuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwTWV0aG9kKHRhcmdldCwgdGFyZ2V0W3Byb3BdLCB3cmFwcGVyc1twcm9wXSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhbiBhc3luYyBtZXRob2QgdGhhdCB3ZSBoYXZlIG1ldGFkYXRhIGZvci4gQ3JlYXRlIGFcbiAgICAgICAgICAgICAgICAvLyBQcm9taXNlIHdyYXBwZXIgZm9yIGl0LlxuICAgICAgICAgICAgICAgIGxldCB3cmFwcGVyID0gd3JhcEFzeW5jRnVuY3Rpb24ocHJvcCwgbWV0YWRhdGFbcHJvcF0pO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gd3JhcE1ldGhvZCh0YXJnZXQsIHRhcmdldFtwcm9wXSwgd3JhcHBlcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIG1ldGhvZCB0aGF0IHdlIGRvbid0IGtub3cgb3IgY2FyZSBhYm91dC4gUmV0dXJuIHRoZVxuICAgICAgICAgICAgICAgIC8vIG9yaWdpbmFsIG1ldGhvZCwgYm91bmQgdG8gdGhlIHVuZGVybHlpbmcgb2JqZWN0LlxuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuYmluZCh0YXJnZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAoaGFzT3duUHJvcGVydHkod3JhcHBlcnMsIHByb3ApIHx8IGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBwcm9wKSkpIHtcbiAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhbiBvYmplY3QgdGhhdCB3ZSBuZWVkIHRvIGRvIHNvbWUgd3JhcHBpbmcgZm9yIHRoZSBjaGlsZHJlblxuICAgICAgICAgICAgICAvLyBvZi4gQ3JlYXRlIGEgc3ViLW9iamVjdCB3cmFwcGVyIGZvciBpdCB3aXRoIHRoZSBhcHByb3ByaWF0ZSBjaGlsZFxuICAgICAgICAgICAgICAvLyBtZXRhZGF0YS5cbiAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwT2JqZWN0KHZhbHVlLCB3cmFwcGVyc1twcm9wXSwgbWV0YWRhdGFbcHJvcF0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgXCIqXCIpKSB7XG4gICAgICAgICAgICAgIC8vIFdyYXAgYWxsIHByb3BlcnRpZXMgaW4gKiBuYW1lc3BhY2UuXG4gICAgICAgICAgICAgIHZhbHVlID0gd3JhcE9iamVjdCh2YWx1ZSwgd3JhcHBlcnNbcHJvcF0sIG1ldGFkYXRhW1wiKlwiXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBXZSBkb24ndCBuZWVkIHRvIGRvIGFueSB3cmFwcGluZyBmb3IgdGhpcyBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAgLy8gc28ganVzdCBmb3J3YXJkIGFsbCBhY2Nlc3MgdG8gdGhlIHVuZGVybHlpbmcgb2JqZWN0LlxuICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2FjaGUsIHByb3AsIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbcHJvcF07XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhY2hlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHNldChwcm94eVRhcmdldCwgcHJvcCwgdmFsdWUsIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICBpZiAocHJvcCBpbiBjYWNoZSkge1xuICAgICAgICAgICAgICBjYWNoZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBkZWZpbmVQcm9wZXJ0eShwcm94eVRhcmdldCwgcHJvcCwgZGVzYykge1xuICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoY2FjaGUsIHByb3AsIGRlc2MpO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBkZWxldGVQcm9wZXJ0eShwcm94eVRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkoY2FjaGUsIHByb3ApO1xuICAgICAgICAgIH1cblxuICAgICAgICB9OyAvLyBQZXIgY29udHJhY3Qgb2YgdGhlIFByb3h5IEFQSSwgdGhlIFwiZ2V0XCIgcHJveHkgaGFuZGxlciBtdXN0IHJldHVybiB0aGVcbiAgICAgICAgLy8gb3JpZ2luYWwgdmFsdWUgb2YgdGhlIHRhcmdldCBpZiB0aGF0IHZhbHVlIGlzIGRlY2xhcmVkIHJlYWQtb25seSBhbmRcbiAgICAgICAgLy8gbm9uLWNvbmZpZ3VyYWJsZS4gRm9yIHRoaXMgcmVhc29uLCB3ZSBjcmVhdGUgYW4gb2JqZWN0IHdpdGggdGhlXG4gICAgICAgIC8vIHByb3RvdHlwZSBzZXQgdG8gYHRhcmdldGAgaW5zdGVhZCBvZiB1c2luZyBgdGFyZ2V0YCBkaXJlY3RseS5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIHdlIGNhbm5vdCByZXR1cm4gYSBjdXN0b20gb2JqZWN0IGZvciBBUElzIHRoYXRcbiAgICAgICAgLy8gYXJlIGRlY2xhcmVkIHJlYWQtb25seSBhbmQgbm9uLWNvbmZpZ3VyYWJsZSwgc3VjaCBhcyBgY2hyb21lLmRldnRvb2xzYC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gVGhlIHByb3h5IGhhbmRsZXJzIHRoZW1zZWx2ZXMgd2lsbCBzdGlsbCB1c2UgdGhlIG9yaWdpbmFsIGB0YXJnZXRgXG4gICAgICAgIC8vIGluc3RlYWQgb2YgdGhlIGBwcm94eVRhcmdldGAsIHNvIHRoYXQgdGhlIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgYXJlXG4gICAgICAgIC8vIGRlcmVmZXJlbmNlZCB2aWEgdGhlIG9yaWdpbmFsIHRhcmdldHMuXG5cbiAgICAgICAgbGV0IHByb3h5VGFyZ2V0ID0gT2JqZWN0LmNyZWF0ZSh0YXJnZXQpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHByb3h5VGFyZ2V0LCBoYW5kbGVycyk7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGEgc2V0IG9mIHdyYXBwZXIgZnVuY3Rpb25zIGZvciBhbiBldmVudCBvYmplY3QsIHdoaWNoIGhhbmRsZXNcbiAgICAgICAqIHdyYXBwaW5nIG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0aGF0IHRob3NlIG1lc3NhZ2VzIGFyZSBwYXNzZWQuXG4gICAgICAgKlxuICAgICAgICogQSBzaW5nbGUgd3JhcHBlciBpcyBjcmVhdGVkIGZvciBlYWNoIGxpc3RlbmVyIGZ1bmN0aW9uLCBhbmQgc3RvcmVkIGluIGFcbiAgICAgICAqIG1hcC4gU3Vic2VxdWVudCBjYWxscyB0byBgYWRkTGlzdGVuZXJgLCBgaGFzTGlzdGVuZXJgLCBvciBgcmVtb3ZlTGlzdGVuZXJgXG4gICAgICAgKiByZXRyaWV2ZSB0aGUgb3JpZ2luYWwgd3JhcHBlciwgc28gdGhhdCAgYXR0ZW1wdHMgdG8gcmVtb3ZlIGFcbiAgICAgICAqIHByZXZpb3VzbHktYWRkZWQgbGlzdGVuZXIgd29yayBhcyBleHBlY3RlZC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge0RlZmF1bHRXZWFrTWFwPGZ1bmN0aW9uLCBmdW5jdGlvbj59IHdyYXBwZXJNYXBcbiAgICAgICAqICAgICAgICBBIERlZmF1bHRXZWFrTWFwIG9iamVjdCB3aGljaCB3aWxsIGNyZWF0ZSB0aGUgYXBwcm9wcmlhdGUgd3JhcHBlclxuICAgICAgICogICAgICAgIGZvciBhIGdpdmVuIGxpc3RlbmVyIGZ1bmN0aW9uIHdoZW4gb25lIGRvZXMgbm90IGV4aXN0LCBhbmQgcmV0cmlldmVcbiAgICAgICAqICAgICAgICBhbiBleGlzdGluZyBvbmUgd2hlbiBpdCBkb2VzLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwRXZlbnQgPSB3cmFwcGVyTWFwID0+ICh7XG4gICAgICAgIGFkZExpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIsIC4uLmFyZ3MpIHtcbiAgICAgICAgICB0YXJnZXQuYWRkTGlzdGVuZXIod3JhcHBlck1hcC5nZXQobGlzdGVuZXIpLCAuLi5hcmdzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYXNMaXN0ZW5lcih0YXJnZXQsIGxpc3RlbmVyKSB7XG4gICAgICAgICAgcmV0dXJuIHRhcmdldC5oYXNMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lcikpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgICAgICAgICB0YXJnZXQucmVtb3ZlTGlzdGVuZXIod3JhcHBlck1hcC5nZXQobGlzdGVuZXIpKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgb25SZXF1ZXN0RmluaXNoZWRXcmFwcGVycyA9IG5ldyBEZWZhdWx0V2Vha01hcChsaXN0ZW5lciA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogV3JhcHMgYW4gb25SZXF1ZXN0RmluaXNoZWQgbGlzdGVuZXIgZnVuY3Rpb24gc28gdGhhdCBpdCB3aWxsIHJldHVybiBhXG4gICAgICAgICAqIGBnZXRDb250ZW50KClgIHByb3BlcnR5IHdoaWNoIHJldHVybnMgYSBgUHJvbWlzZWAgcmF0aGVyIHRoYW4gdXNpbmcgYVxuICAgICAgICAgKiBjYWxsYmFjayBBUEkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXFcbiAgICAgICAgICogICAgICAgIFRoZSBIQVIgZW50cnkgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbmV0d29yayByZXF1ZXN0LlxuICAgICAgICAgKi9cblxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBvblJlcXVlc3RGaW5pc2hlZChyZXEpIHtcbiAgICAgICAgICBjb25zdCB3cmFwcGVkUmVxID0gd3JhcE9iamVjdChyZXEsIHt9XG4gICAgICAgICAgLyogd3JhcHBlcnMgKi9cbiAgICAgICAgICAsIHtcbiAgICAgICAgICAgIGdldENvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgbWluQXJnczogMCxcbiAgICAgICAgICAgICAgbWF4QXJnczogMFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxpc3RlbmVyKHdyYXBwZWRSZXEpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICBjb25zdCBvbk1lc3NhZ2VXcmFwcGVycyA9IG5ldyBEZWZhdWx0V2Vha01hcChsaXN0ZW5lciA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogV3JhcHMgYSBtZXNzYWdlIGxpc3RlbmVyIGZ1bmN0aW9uIHNvIHRoYXQgaXQgbWF5IHNlbmQgcmVzcG9uc2VzIGJhc2VkIG9uXG4gICAgICAgICAqIGl0cyByZXR1cm4gdmFsdWUsIHJhdGhlciB0aGFuIGJ5IHJldHVybmluZyBhIHNlbnRpbmVsIHZhbHVlIGFuZCBjYWxsaW5nIGFcbiAgICAgICAgICogY2FsbGJhY2suIElmIHRoZSBsaXN0ZW5lciBmdW5jdGlvbiByZXR1cm5zIGEgUHJvbWlzZSwgdGhlIHJlc3BvbnNlIGlzXG4gICAgICAgICAqIHNlbnQgd2hlbiB0aGUgcHJvbWlzZSBlaXRoZXIgcmVzb2x2ZXMgb3IgcmVqZWN0cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHsqfSBtZXNzYWdlXG4gICAgICAgICAqICAgICAgICBUaGUgbWVzc2FnZSBzZW50IGJ5IHRoZSBvdGhlciBlbmQgb2YgdGhlIGNoYW5uZWwuXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBzZW5kZXJcbiAgICAgICAgICogICAgICAgIERldGFpbHMgYWJvdXQgdGhlIHNlbmRlciBvZiB0aGUgbWVzc2FnZS5cbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbigqKX0gc2VuZFJlc3BvbnNlXG4gICAgICAgICAqICAgICAgICBBIGNhbGxiYWNrIHdoaWNoLCB3aGVuIGNhbGxlZCB3aXRoIGFuIGFyYml0cmFyeSBhcmd1bWVudCwgc2VuZHNcbiAgICAgICAgICogICAgICAgIHRoYXQgdmFsdWUgYXMgYSByZXNwb25zZS5cbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqICAgICAgICBUcnVlIGlmIHRoZSB3cmFwcGVkIGxpc3RlbmVyIHJldHVybmVkIGEgUHJvbWlzZSwgd2hpY2ggd2lsbCBsYXRlclxuICAgICAgICAgKiAgICAgICAgeWllbGQgYSByZXNwb25zZS4gRmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAgICAgKi9cblxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBvbk1lc3NhZ2UobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICAgICAgICBsZXQgZGlkQ2FsbFNlbmRSZXNwb25zZSA9IGZhbHNlO1xuICAgICAgICAgIGxldCB3cmFwcGVkU2VuZFJlc3BvbnNlO1xuICAgICAgICAgIGxldCBzZW5kUmVzcG9uc2VQcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB3cmFwcGVkU2VuZFJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGRpZENhbGxTZW5kUmVzcG9uc2UgPSB0cnVlO1xuICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbGV0IHJlc3VsdDtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSBsaXN0ZW5lcihtZXNzYWdlLCBzZW5kZXIsIHdyYXBwZWRTZW5kUmVzcG9uc2UpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVzdWx0ID0gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBpc1Jlc3VsdFRoZW5hYmxlID0gcmVzdWx0ICE9PSB0cnVlICYmIGlzVGhlbmFibGUocmVzdWx0KTsgLy8gSWYgdGhlIGxpc3RlbmVyIGRpZG4ndCByZXR1cm5lZCB0cnVlIG9yIGEgUHJvbWlzZSwgb3IgY2FsbGVkXG4gICAgICAgICAgLy8gd3JhcHBlZFNlbmRSZXNwb25zZSBzeW5jaHJvbm91c2x5LCB3ZSBjYW4gZXhpdCBlYXJsaWVyXG4gICAgICAgICAgLy8gYmVjYXVzZSB0aGVyZSB3aWxsIGJlIG5vIHJlc3BvbnNlIHNlbnQgZnJvbSB0aGlzIGxpc3RlbmVyLlxuXG4gICAgICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSAmJiAhaXNSZXN1bHRUaGVuYWJsZSAmJiAhZGlkQ2FsbFNlbmRSZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gLy8gQSBzbWFsbCBoZWxwZXIgdG8gc2VuZCB0aGUgbWVzc2FnZSBpZiB0aGUgcHJvbWlzZSByZXNvbHZlc1xuICAgICAgICAgIC8vIGFuZCBhbiBlcnJvciBpZiB0aGUgcHJvbWlzZSByZWplY3RzIChhIHdyYXBwZWQgc2VuZE1lc3NhZ2UgaGFzXG4gICAgICAgICAgLy8gdG8gdHJhbnNsYXRlIHRoZSBtZXNzYWdlIGludG8gYSByZXNvbHZlZCBwcm9taXNlIG9yIGEgcmVqZWN0ZWRcbiAgICAgICAgICAvLyBwcm9taXNlKS5cblxuXG4gICAgICAgICAgY29uc3Qgc2VuZFByb21pc2VkUmVzdWx0ID0gcHJvbWlzZSA9PiB7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4obXNnID0+IHtcbiAgICAgICAgICAgICAgLy8gc2VuZCB0aGUgbWVzc2FnZSB2YWx1ZS5cbiAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKG1zZyk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgIC8vIFNlbmQgYSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBlcnJvciBpZiB0aGUgcmVqZWN0ZWQgdmFsdWVcbiAgICAgICAgICAgICAgLy8gaXMgYW4gaW5zdGFuY2Ugb2YgZXJyb3IsIG9yIHRoZSBvYmplY3QgaXRzZWxmIG90aGVyd2lzZS5cbiAgICAgICAgICAgICAgbGV0IG1lc3NhZ2U7XG5cbiAgICAgICAgICAgICAgaWYgKGVycm9yICYmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yIHx8IHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSBcInN0cmluZ1wiKSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWRcIjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7XG4gICAgICAgICAgICAgICAgX19tb3pXZWJFeHRlbnNpb25Qb2x5ZmlsbFJlamVjdF9fOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAvLyBQcmludCBhbiBlcnJvciBvbiB0aGUgY29uc29sZSBpZiB1bmFibGUgdG8gc2VuZCB0aGUgcmVzcG9uc2UuXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gc2VuZCBvbk1lc3NhZ2UgcmVqZWN0ZWQgcmVwbHlcIiwgZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07IC8vIElmIHRoZSBsaXN0ZW5lciByZXR1cm5lZCBhIFByb21pc2UsIHNlbmQgdGhlIHJlc29sdmVkIHZhbHVlIGFzIGFcbiAgICAgICAgICAvLyByZXN1bHQsIG90aGVyd2lzZSB3YWl0IHRoZSBwcm9taXNlIHJlbGF0ZWQgdG8gdGhlIHdyYXBwZWRTZW5kUmVzcG9uc2VcbiAgICAgICAgICAvLyBjYWxsYmFjayB0byByZXNvbHZlIGFuZCBzZW5kIGl0IGFzIGEgcmVzcG9uc2UuXG5cblxuICAgICAgICAgIGlmIChpc1Jlc3VsdFRoZW5hYmxlKSB7XG4gICAgICAgICAgICBzZW5kUHJvbWlzZWRSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VuZFByb21pc2VkUmVzdWx0KHNlbmRSZXNwb25zZVByb21pc2UpO1xuICAgICAgICAgIH0gLy8gTGV0IENocm9tZSBrbm93IHRoYXQgdGhlIGxpc3RlbmVyIGlzIHJlcGx5aW5nLlxuXG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB3cmFwcGVkU2VuZE1lc3NhZ2VDYWxsYmFjayA9ICh7XG4gICAgICAgIHJlamVjdCxcbiAgICAgICAgcmVzb2x2ZVxuICAgICAgfSwgcmVwbHkpID0+IHtcbiAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAvLyBEZXRlY3Qgd2hlbiBub25lIG9mIHRoZSBsaXN0ZW5lcnMgcmVwbGllZCB0byB0aGUgc2VuZE1lc3NhZ2UgY2FsbCBhbmQgcmVzb2x2ZVxuICAgICAgICAgIC8vIHRoZSBwcm9taXNlIHRvIHVuZGVmaW5lZCBhcyBpbiBGaXJlZm94LlxuICAgICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS93ZWJleHRlbnNpb24tcG9seWZpbGwvaXNzdWVzLzEzMFxuICAgICAgICAgIGlmIChleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UgPT09IENIUk9NRV9TRU5EX01FU1NBR0VfQ0FMTEJBQ0tfTk9fUkVTUE9OU0VfTUVTU0FHRSkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChyZXBseSAmJiByZXBseS5fX21veldlYkV4dGVuc2lvblBvbHlmaWxsUmVqZWN0X18pIHtcbiAgICAgICAgICAvLyBDb252ZXJ0IGJhY2sgdGhlIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGVycm9yIGludG9cbiAgICAgICAgICAvLyBhbiBFcnJvciBpbnN0YW5jZS5cbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKHJlcGx5Lm1lc3NhZ2UpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHJlcGx5KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3Qgd3JhcHBlZFNlbmRNZXNzYWdlID0gKG5hbWUsIG1ldGFkYXRhLCBhcGlOYW1lc3BhY2VPYmosIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgbWV0YWRhdGEubWluQXJncykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbGVhc3QgJHttZXRhZGF0YS5taW5BcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5taW5BcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBtZXRhZGF0YS5tYXhBcmdzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBtb3N0ICR7bWV0YWRhdGEubWF4QXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWF4QXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBjb25zdCB3cmFwcGVkQ2IgPSB3cmFwcGVkU2VuZE1lc3NhZ2VDYWxsYmFjay5iaW5kKG51bGwsIHtcbiAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICByZWplY3RcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBhcmdzLnB1c2god3JhcHBlZENiKTtcbiAgICAgICAgICBhcGlOYW1lc3BhY2VPYmouc2VuZE1lc3NhZ2UoLi4uYXJncyk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgY29uc3Qgc3RhdGljV3JhcHBlcnMgPSB7XG4gICAgICAgIGRldnRvb2xzOiB7XG4gICAgICAgICAgbmV0d29yazoge1xuICAgICAgICAgICAgb25SZXF1ZXN0RmluaXNoZWQ6IHdyYXBFdmVudChvblJlcXVlc3RGaW5pc2hlZFdyYXBwZXJzKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcnVudGltZToge1xuICAgICAgICAgIG9uTWVzc2FnZTogd3JhcEV2ZW50KG9uTWVzc2FnZVdyYXBwZXJzKSxcbiAgICAgICAgICBvbk1lc3NhZ2VFeHRlcm5hbDogd3JhcEV2ZW50KG9uTWVzc2FnZVdyYXBwZXJzKSxcbiAgICAgICAgICBzZW5kTWVzc2FnZTogd3JhcHBlZFNlbmRNZXNzYWdlLmJpbmQobnVsbCwgXCJzZW5kTWVzc2FnZVwiLCB7XG4gICAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgICAgbWF4QXJnczogM1xuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHRhYnM6IHtcbiAgICAgICAgICBzZW5kTWVzc2FnZTogd3JhcHBlZFNlbmRNZXNzYWdlLmJpbmQobnVsbCwgXCJzZW5kTWVzc2FnZVwiLCB7XG4gICAgICAgICAgICBtaW5BcmdzOiAyLFxuICAgICAgICAgICAgbWF4QXJnczogM1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb25zdCBzZXR0aW5nTWV0YWRhdGEgPSB7XG4gICAgICAgIGNsZWFyOiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH0sXG4gICAgICAgIGdldDoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9LFxuICAgICAgICBzZXQ6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGFwaU1ldGFkYXRhLnByaXZhY3kgPSB7XG4gICAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH0sXG4gICAgICAgIHNlcnZpY2VzOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9LFxuICAgICAgICB3ZWJzaXRlczoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiB3cmFwT2JqZWN0KGV4dGVuc2lvbkFQSXMsIHN0YXRpY1dyYXBwZXJzLCBhcGlNZXRhZGF0YSk7XG4gICAgfTsgLy8gVGhlIGJ1aWxkIHByb2Nlc3MgYWRkcyBhIFVNRCB3cmFwcGVyIGFyb3VuZCB0aGlzIGZpbGUsIHdoaWNoIG1ha2VzIHRoZVxuICAgIC8vIGBtb2R1bGVgIHZhcmlhYmxlIGF2YWlsYWJsZS5cblxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB3cmFwQVBJcyhjaHJvbWUpO1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5icm93c2VyO1xuICB9XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJyb3dzZXItcG9seWZpbGwuanMubWFwXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2JhY2tncm91bmQudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=