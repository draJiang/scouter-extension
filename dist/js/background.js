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
const unsplash_js_1 = __webpack_require__(/*! unsplash-js */ "./node_modules/unsplash-js/dist/unsplash-js.esm.js");
// [暂时废弃]content script 关闭窗口时，将此值设为 false 以中断数据渲染
let isContinue = true;
let controller = new AbortController();
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
        console.log(info);
        sendMessageToContent();
    });
});
// 监听快捷键
webextension_polyfill_1.default.commands.onCommand.addListener(function (command) {
    console.log('hello');
    if (command === 'scout') {
        // 执行相关代码
        sendMessageToContent();
    }
});
// 长连接，处理 GPT 数据
webextension_polyfill_1.default.runtime.onConnect.addListener(port => {
    // 收到 content script 消息
    console.log('连接中------------');
    // 接收 content script 的消息
    port.onMessage.addListener((msg) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('接收消息：', msg);
        // 获取 API Key 等存储的数据
        let openApiKey, currentLanguage, targetLanguage = '';
        webextension_polyfill_1.default.storage.sync.get({ 'openApiKey': '', 'currentLanguage': 'English', 'targetLanguage': 'Spanish' }).then((result) => {
            console.log(result);
            openApiKey = result.openApiKey;
            currentLanguage = result.currentLanguage;
            targetLanguage = result.targetLanguage;
            // 请求  GPT 数据
            if (msg.type === 'getGPTMsg') {
                console.log('getGPTMsg');
                // isContinue = true 时才会渲染数据
                isContinue = true;
                controller = new AbortController();
                let messages = msg.messages;
                //==================== 下面的代码用于调试使用，正式环境需要注释掉
                // port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': '🥲 API Key error. Please modify and try again..' })
                // port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': '🥲 Encountered some issues, please try again later.' })
                setTimeout(() => {
                    const now = new Date();
                    port.postMessage({ 'type': 'sendGPTData', 'status': 'begin', 'content': '' });
                    port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': `${now}` });
                    setTimeout(() => {
                        for (let i = 0; i < 80; i++) {
                            port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': "W" });
                            if (!isContinue) {
                                console.log('停止渲染数据');
                                break;
                            }
                        }
                        port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': "END" });
                        port.postMessage({ 'type': 'sendGPTData', 'status': 'end', 'content': "" });
                    }, 1000);
                }, 2000);
                return;
                // ====================
                if (openApiKey.length < 5) {
                    port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': '🥲 API Key error. Please modify and try again..' });
                    return;
                }
                fetch('https://api.openai.com/v1/chat/completions', {
                    signal: controller.signal,
                    method: "POST",
                    body: JSON.stringify({
                        "model": "gpt-3.5-turbo",
                        "messages": messages,
                        "temperature": 0.7,
                        "max_tokens": 420,
                        "top_p": 1,
                        "frequency_penalty": 0,
                        "presence_penalty": 2,
                        "stream": true
                    }),
                    headers: { 'Authorization': 'Bearer ' + openApiKey, 'Content-Type': 'application/json', }
                }).then((response) => __awaiter(void 0, void 0, void 0, function* () {
                    var _a;
                    port.postMessage({ 'type': 'sendGPTData', 'status': 'begin', 'content': '' });
                    if (response.status !== 200) {
                        // API KEY Error
                        response.json().then((data) => {
                            console.log(data);
                            port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': '🥲 ' + data.error.message, 'code': data.error.code });
                            return;
                        });
                    }
                    // if (response.status !== 401 && response.status !== 200) {
                    //   //  Error
                    //   port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': '🥲 Encountered some issues, please try again later.' })
                    //   return
                    // }
                    // 处理 server-sent events
                    const parser = (0, eventsource_parser_1.createParser)((event) => {
                        if (event.type === 'event') {
                            // console.log('createParser:');
                            try {
                                let new_msg = JSON.parse(event.data)['choices'][0]['delta']['content'];
                                if (new_msg !== undefined) {
                                    console.log(JSON.parse(event.data).id);
                                    // 将数据发送给 UI 以渲染内容
                                    port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': JSON.parse(event.data)['choices'][0]['delta']['content'], 'chatId': JSON.parse(event.data).id });
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
                })).catch((error) => {
                    console.log('error');
                    console.log(error);
                    // port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': "🥲 Encountered some issues, please try again later." })
                });
            }
            // 获取 Unsplash 图片
            if (msg.type === 'getUnsplashImages') {
                // 获取图片
                if (msg.keyWord && msg.keyWord.length <= 20) {
                    // port.postMessage({ 'type': 'sendImgData', 'status': 'end', 'imgs': imgs })
                    (0, util_1.unsplashSearchPhotos)("t8eOwEDwJEGJe7mYWDleFDBK_EM0SaF1hK_4KYfcD_8", msg.keyWord).then((imgs) => {
                        console.log(imgs);
                        port.postMessage({ 'type': 'sendImgData', 'status': 'end', 'imgs': imgs });
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            }
            // 停止渲染数据
            if (msg.type === 'StopTheConversation') {
                isContinue = false;
                controller.abort();
            }
        });
    }));
});
webextension_polyfill_1.default.runtime.onMessage.addListener(handleMessage);
function handleMessage(request, sender, sendResponse) {
    console.log("Message from the content script: " +
        request.type);
    if (request.type === 'addToAnki') {
        console.log('addToAnki');
        // Unsplash
        const unsplash = (0, unsplash_js_1.createApi)({
            accessKey: "t8eOwEDwJEGJe7mYWDleFDBK_EM0SaF1hK_4KYfcD_8"
        });
        console.log('unsplash.photos.trackDownload');
        if (request.messages.unsplash_download_location !== undefined) {
            unsplash.photos.trackDownload({ downloadLocation: request.messages.unsplash_download_location, }).then((result) => console.log(result));
        }
        // Define sendResponse as an async function
        const asyncSendResponse = (response) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield sendResponse(response);
            }
            catch (error) {
                console.error(error);
            }
        });
        (0, util_1.ankiAction)('addNote', 6, request.messages.anki_arguments).then((result) => {
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
const sendMessageToContent = () => {
    webextension_polyfill_1.default.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        var _a;
        console.log(tabs);
        const activeTab = tabs[0];
        let tID = (_a = activeTab.id) !== null && _a !== void 0 ? _a : -1;
        if (activeTab && activeTab.id !== undefined) {
            let b = webextension_polyfill_1.default.tabs.sendMessage(tID, { type: 'open-souter' });
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
                    webextension_polyfill_1.default.tabs.sendMessage(tID, { type: 'open-souter' });
                });
            });
        }
    });
};


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMp3 = exports.unsplashSearchPhotos = exports.ankiAction = void 0;
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
function getMp3() {
    // 创建 AudioContext 对象
    const audioContext = new AudioContext();
    // 创建一个空的缓冲区，用于存储音频数据
    const buffer = audioContext.createBuffer(1, 44100, 44100);
    // 获取缓冲区的数据
    const data = buffer.getChannelData(0);
    // 将字符串转换为音频数据
    const string = 'Hello, world!';
    for (let i = 0; i < string.length; i++) {
        data[i] = string.charCodeAt(i) / 65535 * 2 - 1;
    }
    // 创建一个 AudioBufferSourceNode 对象，将缓冲区作为参数传入
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    // 将 AudioBufferSourceNode 对象连接到 AudioContext 的 destination 属性
    source.connect(audioContext.destination);
    // 播放音频
    source.start();
    // 将音频导出为 MP3 文件
    // const encoder = new Mp3Encoder(1, 44100, 128);
    // const mp3Data = encoder.encodeBuffer(buffer.getChannelData(0));
    // const blob = new Blob([mp3Data], { type: 'audio/mp3' });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = 'audio.mp3';
}
exports.getMp3 = getMp3;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFWTs7QUFFWjtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixtQkFBbUI7QUFDdkM7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQjtBQUNuQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxlQUFlO0FBQzFCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoT2E7O0FBRWIsOENBQTZDO0FBQzdDO0FBQ0EsQ0FBQyxFQUFDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxrQ0FBa0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCOzs7Ozs7Ozs7Ozs7QUM5SGE7QUFDYjtBQUNBLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZ0RBQWdELG1CQUFPLENBQUMsNEZBQXVCO0FBQy9FLDZCQUE2QixtQkFBTyxDQUFDLDJFQUFvQjtBQUN6RCxlQUFlLG1CQUFPLENBQUMsNkJBQVE7QUFDL0Isc0JBQXNCLG1CQUFPLENBQUMsdUVBQWE7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELDZFQUE2RTtBQUN4STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsdUdBQXVHO0FBQzdJLHNDQUFzQywyR0FBMkc7QUFDako7QUFDQTtBQUNBLHVDQUF1Qyx5REFBeUQ7QUFDaEcsdUNBQXVDLDBEQUEwRCxJQUFJLEdBQUc7QUFDeEc7QUFDQSx3Q0FBd0MsUUFBUTtBQUNoRCwrQ0FBK0MsNERBQTREO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsOERBQThEO0FBQ3pHLDJDQUEyQyx1REFBdUQ7QUFDbEcscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsdUdBQXVHO0FBQzlJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsK0JBQStCO0FBQy9CLGlCQUFpQjtBQUNqQjtBQUNBLHVDQUF1Qyx5REFBeUQ7QUFDaEc7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MseUdBQXlHO0FBQ3hKO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QywyR0FBMkc7QUFDdko7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxzSkFBc0o7QUFDN007QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsY0FBYztBQUN0RDtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsdURBQXVEO0FBQzlHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsMENBQTBDLDJHQUEyRztBQUNySixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxzREFBc0Q7QUFDaEcscURBQXFELDZDQUE0QjtBQUNqRjtBQUNBLDJDQUEyQyxzREFBc0Q7QUFDakcscUJBQXFCO0FBQ3JCO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qiw2Q0FBNEI7QUFDbkQsU0FBUztBQUNUO0FBQ0E7QUFDQSw0Q0FBNEMsZ0VBQWdFO0FBQzVHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLDhDQUE4QyxPQUFPO0FBQ3JEO0FBQ0EsZ0NBQWdDLDJEQUEyRDtBQUMzRixTQUFTO0FBQ1Q7QUFDQTtBQUNBLGdDQUFnQywwREFBMEQ7QUFDMUYsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsbUNBQW1DO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEUscUJBQXFCO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsWUFBWTtBQUMxQztBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQjtBQUNqQiw0RUFBNEUscUJBQXFCO0FBQ2pHLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7OztBQy9QYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxjQUFjLEdBQUcsNEJBQTRCLEdBQUcsa0JBQWtCO0FBQ2xFLHNCQUFzQixtQkFBTyxDQUFDLHVFQUFhO0FBQzNDO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx3REFBd0Q7QUFDM0YsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHFCQUFxQiwrR0FBK0c7QUFDcEksU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGVBQWU7QUFDdkQ7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsbUJBQW1CO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pFdUI7O0FBRXJDO0FBQ0E7QUFDQSxvQkFBb0Isc0JBQXNCO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLHVCQUF1QjtBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLG9DQUFvQywrQkFBK0I7QUFDekYsR0FBRyxJQUFJO0FBQ1A7QUFDQTtBQUNBLHFFQUFxRSxhQUFhO0FBQ2xGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdFQUF3RSxlQUFlO0FBQ3ZGO0FBQ0E7O0FBRUE7O0FBRUEsb0JBQW9CLFVBQVU7QUFDOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5Q0FBeUMsbURBQUs7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCO0FBQ0EsMEJBQTBCO0FBQzFCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxVQUFVLElBQUk7QUFDZDtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QseUNBQXlDO0FBQ3pDO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULHlDQUF5QztBQUN6QztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QseUNBQXlDO0FBQ3pDO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QseUNBQXlDO0FBQ3pDO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw0QkFBNEI7O0FBRTdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMEJBQTBCOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVnRTtBQUNqRTs7Ozs7Ozs7Ozs7QUNoZ0NBO0FBQ0EsTUFBTSxJQUEwQztBQUNoRCxJQUFJLGlDQUFnQyxDQUFDLE1BQVEsQ0FBQyxvQ0FBRSxPQUFPO0FBQUE7QUFBQTtBQUFBLGtHQUFDO0FBQ3hELElBQUksS0FBSyxZQVFOO0FBQ0gsQ0FBQztBQUNEOztBQUVBLHNDQUFzQzs7QUFFdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0hBQXdIO0FBQ3hIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNB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Ozs7VUNwdkNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvY29udGVudC10eXBlL2luZGV4LmpzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL2V2ZW50c291cmNlLXBhcnNlci9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvdXRpbC50cyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL25vZGVfbW9kdWxlcy91bnNwbGFzaC1qcy9kaXN0L3Vuc3BsYXNoLWpzLmVzbS5qcyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL25vZGVfbW9kdWxlcy93ZWJleHRlbnNpb24tcG9seWZpbGwvZGlzdC9icm93c2VyLXBvbHlmaWxsLmpzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogY29udGVudC10eXBlXG4gKiBDb3B5cmlnaHQoYykgMjAxNSBEb3VnbGFzIENocmlzdG9waGVyIFdpbHNvblxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogUmVnRXhwIHRvIG1hdGNoICooIFwiO1wiIHBhcmFtZXRlciApIGluIFJGQyA3MjMxIHNlYyAzLjEuMS4xXG4gKlxuICogcGFyYW1ldGVyICAgICA9IHRva2VuIFwiPVwiICggdG9rZW4gLyBxdW90ZWQtc3RyaW5nIClcbiAqIHRva2VuICAgICAgICAgPSAxKnRjaGFyXG4gKiB0Y2hhciAgICAgICAgID0gXCIhXCIgLyBcIiNcIiAvIFwiJFwiIC8gXCIlXCIgLyBcIiZcIiAvIFwiJ1wiIC8gXCIqXCJcbiAqICAgICAgICAgICAgICAgLyBcIitcIiAvIFwiLVwiIC8gXCIuXCIgLyBcIl5cIiAvIFwiX1wiIC8gXCJgXCIgLyBcInxcIiAvIFwiflwiXG4gKiAgICAgICAgICAgICAgIC8gRElHSVQgLyBBTFBIQVxuICogICAgICAgICAgICAgICA7IGFueSBWQ0hBUiwgZXhjZXB0IGRlbGltaXRlcnNcbiAqIHF1b3RlZC1zdHJpbmcgPSBEUVVPVEUgKiggcWR0ZXh0IC8gcXVvdGVkLXBhaXIgKSBEUVVPVEVcbiAqIHFkdGV4dCAgICAgICAgPSBIVEFCIC8gU1AgLyAleDIxIC8gJXgyMy01QiAvICV4NUQtN0UgLyBvYnMtdGV4dFxuICogb2JzLXRleHQgICAgICA9ICV4ODAtRkZcbiAqIHF1b3RlZC1wYWlyICAgPSBcIlxcXCIgKCBIVEFCIC8gU1AgLyBWQ0hBUiAvIG9icy10ZXh0IClcbiAqL1xudmFyIFBBUkFNX1JFR0VYUCA9IC87ICooWyEjJCUmJyorLl5fYHx+MC05QS1aYS16LV0rKSAqPSAqKFwiKD86W1xcdTAwMGJcXHUwMDIwXFx1MDAyMVxcdTAwMjMtXFx1MDA1YlxcdTAwNWQtXFx1MDA3ZVxcdTAwODAtXFx1MDBmZl18XFxcXFtcXHUwMDBiXFx1MDAyMC1cXHUwMGZmXSkqXCJ8WyEjJCUmJyorLl5fYHx+MC05QS1aYS16LV0rKSAqL2cgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb250cm9sLXJlZ2V4XG52YXIgVEVYVF9SRUdFWFAgPSAvXltcXHUwMDBiXFx1MDAyMC1cXHUwMDdlXFx1MDA4MC1cXHUwMGZmXSskLyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnRyb2wtcmVnZXhcbnZhciBUT0tFTl9SRUdFWFAgPSAvXlshIyQlJicqKy5eX2B8fjAtOUEtWmEtei1dKyQvXG5cbi8qKlxuICogUmVnRXhwIHRvIG1hdGNoIHF1b3RlZC1wYWlyIGluIFJGQyA3MjMwIHNlYyAzLjIuNlxuICpcbiAqIHF1b3RlZC1wYWlyID0gXCJcXFwiICggSFRBQiAvIFNQIC8gVkNIQVIgLyBvYnMtdGV4dCApXG4gKiBvYnMtdGV4dCAgICA9ICV4ODAtRkZcbiAqL1xudmFyIFFFU0NfUkVHRVhQID0gL1xcXFwoW1xcdTAwMGJcXHUwMDIwLVxcdTAwZmZdKS9nIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29udHJvbC1yZWdleFxuXG4vKipcbiAqIFJlZ0V4cCB0byBtYXRjaCBjaGFycyB0aGF0IG11c3QgYmUgcXVvdGVkLXBhaXIgaW4gUkZDIDcyMzAgc2VjIDMuMi42XG4gKi9cbnZhciBRVU9URV9SRUdFWFAgPSAvKFtcXFxcXCJdKS9nXG5cbi8qKlxuICogUmVnRXhwIHRvIG1hdGNoIHR5cGUgaW4gUkZDIDcyMzEgc2VjIDMuMS4xLjFcbiAqXG4gKiBtZWRpYS10eXBlID0gdHlwZSBcIi9cIiBzdWJ0eXBlXG4gKiB0eXBlICAgICAgID0gdG9rZW5cbiAqIHN1YnR5cGUgICAgPSB0b2tlblxuICovXG52YXIgVFlQRV9SRUdFWFAgPSAvXlshIyQlJicqKy5eX2B8fjAtOUEtWmEtei1dK1xcL1shIyQlJicqKy5eX2B8fjAtOUEtWmEtei1dKyQvXG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKiBAcHVibGljXG4gKi9cblxuZXhwb3J0cy5mb3JtYXQgPSBmb3JtYXRcbmV4cG9ydHMucGFyc2UgPSBwYXJzZVxuXG4vKipcbiAqIEZvcm1hdCBvYmplY3QgdG8gbWVkaWEgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0IChvYmopIHtcbiAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBvYmogaXMgcmVxdWlyZWQnKVxuICB9XG5cbiAgdmFyIHBhcmFtZXRlcnMgPSBvYmoucGFyYW1ldGVyc1xuICB2YXIgdHlwZSA9IG9iai50eXBlXG5cbiAgaWYgKCF0eXBlIHx8ICFUWVBFX1JFR0VYUC50ZXN0KHR5cGUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW52YWxpZCB0eXBlJylcbiAgfVxuXG4gIHZhciBzdHJpbmcgPSB0eXBlXG5cbiAgLy8gYXBwZW5kIHBhcmFtZXRlcnNcbiAgaWYgKHBhcmFtZXRlcnMgJiYgdHlwZW9mIHBhcmFtZXRlcnMgPT09ICdvYmplY3QnKSB7XG4gICAgdmFyIHBhcmFtXG4gICAgdmFyIHBhcmFtcyA9IE9iamVjdC5rZXlzKHBhcmFtZXRlcnMpLnNvcnQoKVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJhbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhcmFtID0gcGFyYW1zW2ldXG5cbiAgICAgIGlmICghVE9LRU5fUkVHRVhQLnRlc3QocGFyYW0pKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgcGFyYW1ldGVyIG5hbWUnKVxuICAgICAgfVxuXG4gICAgICBzdHJpbmcgKz0gJzsgJyArIHBhcmFtICsgJz0nICsgcXN0cmluZyhwYXJhbWV0ZXJzW3BhcmFtXSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RyaW5nXG59XG5cbi8qKlxuICogUGFyc2UgbWVkaWEgdHlwZSB0byBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSBzdHJpbmdcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZSAoc3RyaW5nKSB7XG4gIGlmICghc3RyaW5nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgc3RyaW5nIGlzIHJlcXVpcmVkJylcbiAgfVxuXG4gIC8vIHN1cHBvcnQgcmVxL3Jlcy1saWtlIG9iamVjdHMgYXMgYXJndW1lbnRcbiAgdmFyIGhlYWRlciA9IHR5cGVvZiBzdHJpbmcgPT09ICdvYmplY3QnXG4gICAgPyBnZXRjb250ZW50dHlwZShzdHJpbmcpXG4gICAgOiBzdHJpbmdcblxuICBpZiAodHlwZW9mIGhlYWRlciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBzdHJpbmcgaXMgcmVxdWlyZWQgdG8gYmUgYSBzdHJpbmcnKVxuICB9XG5cbiAgdmFyIGluZGV4ID0gaGVhZGVyLmluZGV4T2YoJzsnKVxuICB2YXIgdHlwZSA9IGluZGV4ICE9PSAtMVxuICAgID8gaGVhZGVyLnNsaWNlKDAsIGluZGV4KS50cmltKClcbiAgICA6IGhlYWRlci50cmltKClcblxuICBpZiAoIVRZUEVfUkVHRVhQLnRlc3QodHlwZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnZhbGlkIG1lZGlhIHR5cGUnKVxuICB9XG5cbiAgdmFyIG9iaiA9IG5ldyBDb250ZW50VHlwZSh0eXBlLnRvTG93ZXJDYXNlKCkpXG5cbiAgLy8gcGFyc2UgcGFyYW1ldGVyc1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgdmFyIGtleVxuICAgIHZhciBtYXRjaFxuICAgIHZhciB2YWx1ZVxuXG4gICAgUEFSQU1fUkVHRVhQLmxhc3RJbmRleCA9IGluZGV4XG5cbiAgICB3aGlsZSAoKG1hdGNoID0gUEFSQU1fUkVHRVhQLmV4ZWMoaGVhZGVyKSkpIHtcbiAgICAgIGlmIChtYXRjaC5pbmRleCAhPT0gaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW52YWxpZCBwYXJhbWV0ZXIgZm9ybWF0JylcbiAgICAgIH1cblxuICAgICAgaW5kZXggKz0gbWF0Y2hbMF0ubGVuZ3RoXG4gICAgICBrZXkgPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpXG4gICAgICB2YWx1ZSA9IG1hdGNoWzJdXG5cbiAgICAgIGlmICh2YWx1ZS5jaGFyQ29kZUF0KDApID09PSAweDIyIC8qIFwiICovKSB7XG4gICAgICAgIC8vIHJlbW92ZSBxdW90ZXNcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgxLCAtMSlcblxuICAgICAgICAvLyByZW1vdmUgZXNjYXBlc1xuICAgICAgICBpZiAodmFsdWUuaW5kZXhPZignXFxcXCcpICE9PSAtMSkge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShRRVNDX1JFR0VYUCwgJyQxJylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvYmoucGFyYW1ldGVyc1trZXldID0gdmFsdWVcbiAgICB9XG5cbiAgICBpZiAoaW5kZXggIT09IGhlYWRlci5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgcGFyYW1ldGVyIGZvcm1hdCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9ialxufVxuXG4vKipcbiAqIEdldCBjb250ZW50LXR5cGUgZnJvbSByZXEvcmVzIG9iamVjdHMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGdldGNvbnRlbnR0eXBlIChvYmopIHtcbiAgdmFyIGhlYWRlclxuXG4gIGlmICh0eXBlb2Ygb2JqLmdldEhlYWRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIHJlcy1saWtlXG4gICAgaGVhZGVyID0gb2JqLmdldEhlYWRlcignY29udGVudC10eXBlJylcbiAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqLmhlYWRlcnMgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gcmVxLWxpa2VcbiAgICBoZWFkZXIgPSBvYmouaGVhZGVycyAmJiBvYmouaGVhZGVyc1snY29udGVudC10eXBlJ11cbiAgfVxuXG4gIGlmICh0eXBlb2YgaGVhZGVyICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvbnRlbnQtdHlwZSBoZWFkZXIgaXMgbWlzc2luZyBmcm9tIG9iamVjdCcpXG4gIH1cblxuICByZXR1cm4gaGVhZGVyXG59XG5cbi8qKlxuICogUXVvdGUgYSBzdHJpbmcgaWYgbmVjZXNzYXJ5LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcXN0cmluZyAodmFsKSB7XG4gIHZhciBzdHIgPSBTdHJpbmcodmFsKVxuXG4gIC8vIG5vIG5lZWQgdG8gcXVvdGUgdG9rZW5zXG4gIGlmIChUT0tFTl9SRUdFWFAudGVzdChzdHIpKSB7XG4gICAgcmV0dXJuIHN0clxuICB9XG5cbiAgaWYgKHN0ci5sZW5ndGggPiAwICYmICFURVhUX1JFR0VYUC50ZXN0KHN0cikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnZhbGlkIHBhcmFtZXRlciB2YWx1ZScpXG4gIH1cblxuICByZXR1cm4gJ1wiJyArIHN0ci5yZXBsYWNlKFFVT1RFX1JFR0VYUCwgJ1xcXFwkMScpICsgJ1wiJ1xufVxuXG4vKipcbiAqIENsYXNzIHRvIHJlcHJlc2VudCBhIGNvbnRlbnQgdHlwZS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIENvbnRlbnRUeXBlICh0eXBlKSB7XG4gIHRoaXMucGFyYW1ldGVycyA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgdGhpcy50eXBlID0gdHlwZVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmZ1bmN0aW9uIGNyZWF0ZVBhcnNlcihvblBhcnNlKSB7XG4gIGxldCBpc0ZpcnN0Q2h1bms7XG4gIGxldCBidWZmZXI7XG4gIGxldCBzdGFydGluZ1Bvc2l0aW9uO1xuICBsZXQgc3RhcnRpbmdGaWVsZExlbmd0aDtcbiAgbGV0IGV2ZW50SWQ7XG4gIGxldCBldmVudE5hbWU7XG4gIGxldCBkYXRhO1xuICByZXNldCgpO1xuICByZXR1cm4ge1xuICAgIGZlZWQsXG4gICAgcmVzZXRcbiAgfTtcbiAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgaXNGaXJzdENodW5rID0gdHJ1ZTtcbiAgICBidWZmZXIgPSBcIlwiO1xuICAgIHN0YXJ0aW5nUG9zaXRpb24gPSAwO1xuICAgIHN0YXJ0aW5nRmllbGRMZW5ndGggPSAtMTtcbiAgICBldmVudElkID0gdm9pZCAwO1xuICAgIGV2ZW50TmFtZSA9IHZvaWQgMDtcbiAgICBkYXRhID0gXCJcIjtcbiAgfVxuICBmdW5jdGlvbiBmZWVkKGNodW5rKSB7XG4gICAgYnVmZmVyID0gYnVmZmVyID8gYnVmZmVyICsgY2h1bmsgOiBjaHVuaztcbiAgICBpZiAoaXNGaXJzdENodW5rICYmIGhhc0JvbShidWZmZXIpKSB7XG4gICAgICBidWZmZXIgPSBidWZmZXIuc2xpY2UoQk9NLmxlbmd0aCk7XG4gICAgfVxuICAgIGlzRmlyc3RDaHVuayA9IGZhbHNlO1xuICAgIGNvbnN0IGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgbGV0IHBvc2l0aW9uID0gMDtcbiAgICBsZXQgZGlzY2FyZFRyYWlsaW5nTmV3bGluZSA9IGZhbHNlO1xuICAgIHdoaWxlIChwb3NpdGlvbiA8IGxlbmd0aCkge1xuICAgICAgaWYgKGRpc2NhcmRUcmFpbGluZ05ld2xpbmUpIHtcbiAgICAgICAgaWYgKGJ1ZmZlcltwb3NpdGlvbl0gPT09IFwiXFxuXCIpIHtcbiAgICAgICAgICArK3Bvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGRpc2NhcmRUcmFpbGluZ05ld2xpbmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGxldCBsaW5lTGVuZ3RoID0gLTE7XG4gICAgICBsZXQgZmllbGRMZW5ndGggPSBzdGFydGluZ0ZpZWxkTGVuZ3RoO1xuICAgICAgbGV0IGNoYXJhY3RlcjtcbiAgICAgIGZvciAobGV0IGluZGV4ID0gc3RhcnRpbmdQb3NpdGlvbjsgbGluZUxlbmd0aCA8IDAgJiYgaW5kZXggPCBsZW5ndGg7ICsraW5kZXgpIHtcbiAgICAgICAgY2hhcmFjdGVyID0gYnVmZmVyW2luZGV4XTtcbiAgICAgICAgaWYgKGNoYXJhY3RlciA9PT0gXCI6XCIgJiYgZmllbGRMZW5ndGggPCAwKSB7XG4gICAgICAgICAgZmllbGRMZW5ndGggPSBpbmRleCAtIHBvc2l0aW9uO1xuICAgICAgICB9IGVsc2UgaWYgKGNoYXJhY3RlciA9PT0gXCJcXHJcIikge1xuICAgICAgICAgIGRpc2NhcmRUcmFpbGluZ05ld2xpbmUgPSB0cnVlO1xuICAgICAgICAgIGxpbmVMZW5ndGggPSBpbmRleCAtIHBvc2l0aW9uO1xuICAgICAgICB9IGVsc2UgaWYgKGNoYXJhY3RlciA9PT0gXCJcXG5cIikge1xuICAgICAgICAgIGxpbmVMZW5ndGggPSBpbmRleCAtIHBvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobGluZUxlbmd0aCA8IDApIHtcbiAgICAgICAgc3RhcnRpbmdQb3NpdGlvbiA9IGxlbmd0aCAtIHBvc2l0aW9uO1xuICAgICAgICBzdGFydGluZ0ZpZWxkTGVuZ3RoID0gZmllbGRMZW5ndGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhcnRpbmdQb3NpdGlvbiA9IDA7XG4gICAgICAgIHN0YXJ0aW5nRmllbGRMZW5ndGggPSAtMTtcbiAgICAgIH1cbiAgICAgIHBhcnNlRXZlbnRTdHJlYW1MaW5lKGJ1ZmZlciwgcG9zaXRpb24sIGZpZWxkTGVuZ3RoLCBsaW5lTGVuZ3RoKTtcbiAgICAgIHBvc2l0aW9uICs9IGxpbmVMZW5ndGggKyAxO1xuICAgIH1cbiAgICBpZiAocG9zaXRpb24gPT09IGxlbmd0aCkge1xuICAgICAgYnVmZmVyID0gXCJcIjtcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uID4gMCkge1xuICAgICAgYnVmZmVyID0gYnVmZmVyLnNsaWNlKHBvc2l0aW9uKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gcGFyc2VFdmVudFN0cmVhbUxpbmUobGluZUJ1ZmZlciwgaW5kZXgsIGZpZWxkTGVuZ3RoLCBsaW5lTGVuZ3RoKSB7XG4gICAgaWYgKGxpbmVMZW5ndGggPT09IDApIHtcbiAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgb25QYXJzZSh7XG4gICAgICAgICAgdHlwZTogXCJldmVudFwiLFxuICAgICAgICAgIGlkOiBldmVudElkLFxuICAgICAgICAgIGV2ZW50OiBldmVudE5hbWUgfHwgdm9pZCAwLFxuICAgICAgICAgIGRhdGE6IGRhdGEuc2xpY2UoMCwgLTEpXG4gICAgICAgICAgLy8gcmVtb3ZlIHRyYWlsaW5nIG5ld2xpbmVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGF0YSA9IFwiXCI7XG4gICAgICAgIGV2ZW50SWQgPSB2b2lkIDA7XG4gICAgICB9XG4gICAgICBldmVudE5hbWUgPSB2b2lkIDA7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5vVmFsdWUgPSBmaWVsZExlbmd0aCA8IDA7XG4gICAgY29uc3QgZmllbGQgPSBsaW5lQnVmZmVyLnNsaWNlKGluZGV4LCBpbmRleCArIChub1ZhbHVlID8gbGluZUxlbmd0aCA6IGZpZWxkTGVuZ3RoKSk7XG4gICAgbGV0IHN0ZXAgPSAwO1xuICAgIGlmIChub1ZhbHVlKSB7XG4gICAgICBzdGVwID0gbGluZUxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKGxpbmVCdWZmZXJbaW5kZXggKyBmaWVsZExlbmd0aCArIDFdID09PSBcIiBcIikge1xuICAgICAgc3RlcCA9IGZpZWxkTGVuZ3RoICsgMjtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RlcCA9IGZpZWxkTGVuZ3RoICsgMTtcbiAgICB9XG4gICAgY29uc3QgcG9zaXRpb24gPSBpbmRleCArIHN0ZXA7XG4gICAgY29uc3QgdmFsdWVMZW5ndGggPSBsaW5lTGVuZ3RoIC0gc3RlcDtcbiAgICBjb25zdCB2YWx1ZSA9IGxpbmVCdWZmZXIuc2xpY2UocG9zaXRpb24sIHBvc2l0aW9uICsgdmFsdWVMZW5ndGgpLnRvU3RyaW5nKCk7XG4gICAgaWYgKGZpZWxkID09PSBcImRhdGFcIikge1xuICAgICAgZGF0YSArPSB2YWx1ZSA/IFwiXCIuY29uY2F0KHZhbHVlLCBcIlxcblwiKSA6IFwiXFxuXCI7XG4gICAgfSBlbHNlIGlmIChmaWVsZCA9PT0gXCJldmVudFwiKSB7XG4gICAgICBldmVudE5hbWUgPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKGZpZWxkID09PSBcImlkXCIgJiYgIXZhbHVlLmluY2x1ZGVzKFwiXFwwXCIpKSB7XG4gICAgICBldmVudElkID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmIChmaWVsZCA9PT0gXCJyZXRyeVwiKSB7XG4gICAgICBjb25zdCByZXRyeSA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgICBpZiAoIU51bWJlci5pc05hTihyZXRyeSkpIHtcbiAgICAgICAgb25QYXJzZSh7XG4gICAgICAgICAgdHlwZTogXCJyZWNvbm5lY3QtaW50ZXJ2YWxcIixcbiAgICAgICAgICB2YWx1ZTogcmV0cnlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5jb25zdCBCT00gPSBbMjM5LCAxODcsIDE5MV07XG5mdW5jdGlvbiBoYXNCb20oYnVmZmVyKSB7XG4gIHJldHVybiBCT00uZXZlcnkoKGNoYXJDb2RlLCBpbmRleCkgPT4gYnVmZmVyLmNoYXJDb2RlQXQoaW5kZXgpID09PSBjaGFyQ29kZSk7XG59XG5leHBvcnRzLmNyZWF0ZVBhcnNlciA9IGNyZWF0ZVBhcnNlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgZXZlbnRzb3VyY2VfcGFyc2VyXzEgPSByZXF1aXJlKFwiZXZlbnRzb3VyY2UtcGFyc2VyXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IHVuc3BsYXNoX2pzXzEgPSByZXF1aXJlKFwidW5zcGxhc2gtanNcIik7XG4vLyBb5pqC5pe25bqf5byDXWNvbnRlbnQgc2NyaXB0IOWFs+mXreeql+WPo+aXtu+8jOWwhuatpOWAvOiuvuS4uiBmYWxzZSDku6XkuK3mlq3mlbDmja7muLLmn5NcbmxldCBpc0NvbnRpbnVlID0gdHJ1ZTtcbmxldCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuY29uc29sZS5sb2coJ0kgYW0gYmFja2dyb3VuZCcpO1xud2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZyhcIuaPkuS7tuW3suiiq+WuieijhVwiKTtcbn0pO1xuLy8g5Y246L295o+S5Lu25ZCO5byV5a+85aGr5YaZ5Y246L295Y6f5Zug77yM5biu5Yqp5Lqn5ZOB5LyY5YyWXG53ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2V0VW5pbnN0YWxsVVJMKFwiaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQUlwUUxTZG9iR1FOM08wQ2s0ZlZyZ2Z2UlpNbWUzZGUtMk9hRXAxcEZ0aWJaa1Uwa29jMzd3L3ZpZXdmb3JtP3VzcD1zZl9saW5rXCIpO1xuLy8g5Yib5bu65Y+z6ZSu6I+c5Y2VXG53ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LmNvbnRleHRNZW51cy5jcmVhdGUoe1xuICAgIGlkOiBcIjFcIixcbiAgICB0aXRsZTogXCJTY291dGVyXCIsXG4gICAgY29udGV4dHM6IFtcInNlbGVjdGlvblwiXSxcbn0sICgpID0+IHtcbiAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUubGFzdEVycm9yO1xufSk7XG4vLyDlj7PplK7oj5zljZXngrnlh7vkuovku7ZcbndlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuY29udGV4dE1lbnVzLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihmdW5jdGlvbiAoaW5mbywgX3RhYikge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCflj7PplK7oj5zljZXngrnlh7vkuovku7YnKTtcbiAgICAgICAgY29uc29sZS5sb2coaW5mbyk7XG4gICAgICAgIHNlbmRNZXNzYWdlVG9Db250ZW50KCk7XG4gICAgfSk7XG59KTtcbi8vIOebkeWQrOW/q+aNt+mUrlxud2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5jb21tYW5kcy5vbkNvbW1hbmQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKGNvbW1hbmQpIHtcbiAgICBjb25zb2xlLmxvZygnaGVsbG8nKTtcbiAgICBpZiAoY29tbWFuZCA9PT0gJ3Njb3V0Jykge1xuICAgICAgICAvLyDmiafooYznm7jlhbPku6PnoIFcbiAgICAgICAgc2VuZE1lc3NhZ2VUb0NvbnRlbnQoKTtcbiAgICB9XG59KTtcbi8vIOmVv+i/nuaOpe+8jOWkhOeQhiBHUFQg5pWw5o2uXG53ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUub25Db25uZWN0LmFkZExpc3RlbmVyKHBvcnQgPT4ge1xuICAgIC8vIOaUtuWIsCBjb250ZW50IHNjcmlwdCDmtojmga9cbiAgICBjb25zb2xlLmxvZygn6L+e5o6l5LitLS0tLS0tLS0tLS0tJyk7XG4gICAgLy8g5o6l5pS2IGNvbnRlbnQgc2NyaXB0IOeahOa2iOaBr1xuICAgIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKChtc2cpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmxvZygn5o6l5pS25raI5oGv77yaJywgbXNnKTtcbiAgICAgICAgLy8g6I635Y+WIEFQSSBLZXkg562J5a2Y5YKo55qE5pWw5o2uXG4gICAgICAgIGxldCBvcGVuQXBpS2V5LCBjdXJyZW50TGFuZ3VhZ2UsIHRhcmdldExhbmd1YWdlID0gJyc7XG4gICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7ICdvcGVuQXBpS2V5JzogJycsICdjdXJyZW50TGFuZ3VhZ2UnOiAnRW5nbGlzaCcsICd0YXJnZXRMYW5ndWFnZSc6ICdTcGFuaXNoJyB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICBvcGVuQXBpS2V5ID0gcmVzdWx0Lm9wZW5BcGlLZXk7XG4gICAgICAgICAgICBjdXJyZW50TGFuZ3VhZ2UgPSByZXN1bHQuY3VycmVudExhbmd1YWdlO1xuICAgICAgICAgICAgdGFyZ2V0TGFuZ3VhZ2UgPSByZXN1bHQudGFyZ2V0TGFuZ3VhZ2U7XG4gICAgICAgICAgICAvLyDor7fmsYIgIEdQVCDmlbDmja5cbiAgICAgICAgICAgIGlmIChtc2cudHlwZSA9PT0gJ2dldEdQVE1zZycpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0R1BUTXNnJyk7XG4gICAgICAgICAgICAgICAgLy8gaXNDb250aW51ZSA9IHRydWUg5pe25omN5Lya5riy5p+T5pWw5o2uXG4gICAgICAgICAgICAgICAgaXNDb250aW51ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZXMgPSBtc2cubWVzc2FnZXM7XG4gICAgICAgICAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PSDkuIvpnaLnmoTku6PnoIHnlKjkuo7osIPor5Xkvb/nlKjvvIzmraPlvI/njq/looPpnIDopoHms6jph4rmjolcbiAgICAgICAgICAgICAgICAvLyBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnc2VuZEdQVERhdGEnLCAnc3RhdHVzJzogJ2Vycm8nLCAnY29udGVudCc6ICfwn6WyIEFQSSBLZXkgZXJyb3IuIFBsZWFzZSBtb2RpZnkgYW5kIHRyeSBhZ2Fpbi4uJyB9KVxuICAgICAgICAgICAgICAgIC8vIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdzZW5kR1BURGF0YScsICdzdGF0dXMnOiAnZXJybycsICdjb250ZW50JzogJ/CfpbIgRW5jb3VudGVyZWQgc29tZSBpc3N1ZXMsIHBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuJyB9KVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnc2VuZEdQVERhdGEnLCAnc3RhdHVzJzogJ2JlZ2luJywgJ2NvbnRlbnQnOiAnJyB9KTtcbiAgICAgICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ3NlbmRHUFREYXRhJywgJ3N0YXR1cyc6ICdwcm9jZXNzJywgJ2NvbnRlbnQnOiBgJHtub3d9YCB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDgwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnc2VuZEdQVERhdGEnLCAnc3RhdHVzJzogJ3Byb2Nlc3MnLCAnY29udGVudCc6IFwiV1wiIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNDb250aW51ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5YGc5q2i5riy5p+T5pWw5o2uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdzZW5kR1BURGF0YScsICdzdGF0dXMnOiAncHJvY2VzcycsICdjb250ZW50JzogXCJFTkRcIiB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdzZW5kR1BURGF0YScsICdzdGF0dXMnOiAnZW5kJywgJ2NvbnRlbnQnOiBcIlwiIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICAgICAgICBpZiAob3BlbkFwaUtleS5sZW5ndGggPCA1KSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdzZW5kR1BURGF0YScsICdzdGF0dXMnOiAnZXJybycsICdjb250ZW50JzogJ/CfpbIgQVBJIEtleSBlcnJvci4gUGxlYXNlIG1vZGlmeSBhbmQgdHJ5IGFnYWluLi4nIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZldGNoKCdodHRwczovL2FwaS5vcGVuYWkuY29tL3YxL2NoYXQvY29tcGxldGlvbnMnLCB7XG4gICAgICAgICAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibW9kZWxcIjogXCJncHQtMy41LXR1cmJvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IG1lc3NhZ2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZW1wZXJhdHVyZVwiOiAwLjcsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1heF90b2tlbnNcIjogNDIwLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3BfcFwiOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmcmVxdWVuY3lfcGVuYWx0eVwiOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmVzZW5jZV9wZW5hbHR5XCI6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN0cmVhbVwiOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgb3BlbkFwaUtleSwgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgfVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnc2VuZEdQVERhdGEnLCAnc3RhdHVzJzogJ2JlZ2luJywgJ2NvbnRlbnQnOiAnJyB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBUEkgS0VZIEVycm9yXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5qc29uKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdzZW5kR1BURGF0YScsICdzdGF0dXMnOiAnZXJybycsICdjb250ZW50JzogJ/CfpbIgJyArIGRhdGEuZXJyb3IubWVzc2FnZSwgJ2NvZGUnOiBkYXRhLmVycm9yLmNvZGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gNDAxICYmIHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgLy8gIEVycm9yXG4gICAgICAgICAgICAgICAgICAgIC8vICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ3NlbmRHUFREYXRhJywgJ3N0YXR1cyc6ICdlcnJvJywgJ2NvbnRlbnQnOiAn8J+lsiBFbmNvdW50ZXJlZCBzb21lIGlzc3VlcywgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlci4nIH0pXG4gICAgICAgICAgICAgICAgICAgIC8vICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgLy8g5aSE55CGIHNlcnZlci1zZW50IGV2ZW50c1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJzZXIgPSAoMCwgZXZlbnRzb3VyY2VfcGFyc2VyXzEuY3JlYXRlUGFyc2VyKSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSAnZXZlbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2NyZWF0ZVBhcnNlcjonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3X21zZyA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSlbJ2Nob2ljZXMnXVswXVsnZGVsdGEnXVsnY29udGVudCddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3X21zZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKGV2ZW50LmRhdGEpLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWwhuaVsOaNruWPkemAgee7mSBVSSDku6XmuLLmn5PlhoXlrrlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdzZW5kR1BURGF0YScsICdzdGF0dXMnOiAncHJvY2VzcycsICdjb250ZW50JzogSlNPTi5wYXJzZShldmVudC5kYXRhKVsnY2hvaWNlcyddWzBdWydkZWx0YSddWydjb250ZW50J10sICdjaGF0SWQnOiBKU09OLnBhcnNlKGV2ZW50LmRhdGEpLmlkIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnIGNyZWF0ZVBhcnNlciBKU09OLnBhcnNlIGVycm93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVhZGVyID0gKF9hID0gcmVzcG9uc2UuYm9keSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldFJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVhZGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IHlpZWxkIHJlYWRlci5yZWFkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmlbDmja7kvKDovpPnu5PmnZ9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEb25lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnc2VuZEdQVERhdGEnLCAnc3RhdHVzJzogJ2VuZCcsICdjb250ZW50JzogJycgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzQ29udGludWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflgZzmraLmuLLmn5PmlbDmja4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0ciA9IG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5mZWVkKHN0cik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnJlbGVhc2VMb2NrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ3NlbmRHUFREYXRhJywgJ3N0YXR1cyc6ICdlcnJvJywgJ2NvbnRlbnQnOiBcIvCfpbIgRW5jb3VudGVyZWQgc29tZSBpc3N1ZXMsIHBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuXCIgfSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOiOt+WPliBVbnNwbGFzaCDlm77niYdcbiAgICAgICAgICAgIGlmIChtc2cudHlwZSA9PT0gJ2dldFVuc3BsYXNoSW1hZ2VzJykge1xuICAgICAgICAgICAgICAgIC8vIOiOt+WPluWbvueJh1xuICAgICAgICAgICAgICAgIGlmIChtc2cua2V5V29yZCAmJiBtc2cua2V5V29yZC5sZW5ndGggPD0gMjApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ3NlbmRJbWdEYXRhJywgJ3N0YXR1cyc6ICdlbmQnLCAnaW1ncyc6IGltZ3MgfSlcbiAgICAgICAgICAgICAgICAgICAgKDAsIHV0aWxfMS51bnNwbGFzaFNlYXJjaFBob3RvcykocHJvY2Vzcy5lbnYuVU5TUExBU0hfQVBJX0tFWSwgbXNnLmtleVdvcmQpLnRoZW4oKGltZ3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGltZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ3NlbmRJbWdEYXRhJywgJ3N0YXR1cyc6ICdlbmQnLCAnaW1ncyc6IGltZ3MgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDlgZzmraLmuLLmn5PmlbDmja5cbiAgICAgICAgICAgIGlmIChtc2cudHlwZSA9PT0gJ1N0b3BUaGVDb252ZXJzYXRpb24nKSB7XG4gICAgICAgICAgICAgICAgaXNDb250aW51ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSkpO1xufSk7XG53ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGhhbmRsZU1lc3NhZ2UpO1xuZnVuY3Rpb24gaGFuZGxlTWVzc2FnZShyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIGNvbnNvbGUubG9nKFwiTWVzc2FnZSBmcm9tIHRoZSBjb250ZW50IHNjcmlwdDogXCIgK1xuICAgICAgICByZXF1ZXN0LnR5cGUpO1xuICAgIGlmIChyZXF1ZXN0LnR5cGUgPT09ICdhZGRUb0Fua2knKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhZGRUb0Fua2knKTtcbiAgICAgICAgLy8gVW5zcGxhc2hcbiAgICAgICAgY29uc3QgdW5zcGxhc2ggPSAoMCwgdW5zcGxhc2hfanNfMS5jcmVhdGVBcGkpKHtcbiAgICAgICAgICAgIGFjY2Vzc0tleTogcHJvY2Vzcy5lbnYuVU5TUExBU0hfQVBJX0tFWVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coJ3Vuc3BsYXNoLnBob3Rvcy50cmFja0Rvd25sb2FkJyk7XG4gICAgICAgIGlmIChyZXF1ZXN0Lm1lc3NhZ2VzLnVuc3BsYXNoX2Rvd25sb2FkX2xvY2F0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHVuc3BsYXNoLnBob3Rvcy50cmFja0Rvd25sb2FkKHsgZG93bmxvYWRMb2NhdGlvbjogcmVxdWVzdC5tZXNzYWdlcy51bnNwbGFzaF9kb3dubG9hZF9sb2NhdGlvbiwgfSkudGhlbigocmVzdWx0KSA9PiBjb25zb2xlLmxvZyhyZXN1bHQpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEZWZpbmUgc2VuZFJlc3BvbnNlIGFzIGFuIGFzeW5jIGZ1bmN0aW9uXG4gICAgICAgIGNvbnN0IGFzeW5jU2VuZFJlc3BvbnNlID0gKHJlc3BvbnNlKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHNlbmRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICgwLCB1dGlsXzEuYW5raUFjdGlvbikoJ2FkZE5vdGUnLCA2LCByZXF1ZXN0Lm1lc3NhZ2VzLmFua2lfYXJndW1lbnRzKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBnb3QgbGlzdCBvZiBkZWNrczogJHtyZXN1bHR9YCk7XG4gICAgICAgICAgICAvLyDlj43ppojlpITnkIbnu5PmnpxcbiAgICAgICAgICAgIGFzeW5jU2VuZFJlc3BvbnNlKHsgdHlwZTogJ2FkZFRvQW5raScsIHJlc3VsdDogJ3N1Y2Nlc3MnLCBlcnJvcjogcmVzdWx0LmVycm9yIH0pO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICBhc3luY1NlbmRSZXNwb25zZSh7IHR5cGU6ICdhZGRUb0Fua2knLCByZXN1bHQ6ICdmYWlsdXJlJywgZXJyb3I6IGVycm9yLmVycm9yIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gUmV0dXJuIHRydWUgdG8gaW5mb3JtIHNlbmRSZXNwb25zZSB0aGF0IHlvdSB3aWxsIGJlIGNhbGxpbmcgaXQgYXN5bmNocm9ub3VzbHlcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuY29uc3Qgc2VuZE1lc3NhZ2VUb0NvbnRlbnQgPSAoKSA9PiB7XG4gICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0pLnRoZW4oKHRhYnMpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zb2xlLmxvZyh0YWJzKTtcbiAgICAgICAgY29uc3QgYWN0aXZlVGFiID0gdGFic1swXTtcbiAgICAgICAgbGV0IHRJRCA9IChfYSA9IGFjdGl2ZVRhYi5pZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogLTE7XG4gICAgICAgIGlmIChhY3RpdmVUYWIgJiYgYWN0aXZlVGFiLmlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBiID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC50YWJzLnNlbmRNZXNzYWdlKHRJRCwgeyB0eXBlOiAnb3Blbi1zb3V0ZXInIH0pO1xuICAgICAgICAgICAgLy8g5bey55+l5oOF5Ya177ya5Yia5a6J6KOF5o+S5Lu25pe255u05o6l5L2/55So5Lya5oql6ZSZ77yI5Yi35paw6aG16Z2i5ZCO5L2/55So5YiZ5q2j5bi477yJ77yM5q2k5pe26ZyA6KaB6L295YWlIGNvbnRlbnRfc2NyaXB0LmpzIOaJjeihjFxuICAgICAgICAgICAgYi5jYXRjaChlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2F0Y2gnKTtcbiAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB7IHRhYklkOiB0SUQgfSxcbiAgICAgICAgICAgICAgICAgICAgZmlsZXM6IFtcImpzL3ZlbmRvci5qc1wiLCBcImpzL2NvbnRlbnRfc2NyaXB0LmpzXCJdLFxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0Jyk7XG4gICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQudGFicy5zZW5kTWVzc2FnZSh0SUQsIHsgdHlwZTogJ29wZW4tc291dGVyJyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldE1wMyA9IGV4cG9ydHMudW5zcGxhc2hTZWFyY2hQaG90b3MgPSBleHBvcnRzLmFua2lBY3Rpb24gPSB2b2lkIDA7XG5jb25zdCB1bnNwbGFzaF9qc18xID0gcmVxdWlyZShcInVuc3BsYXNoLWpzXCIpO1xuLy8g5bCG5L+h5oGv5re75Yqg5YiwIEFua2lcbmZ1bmN0aW9uIGFua2lBY3Rpb24oYWN0aW9uLCB2ZXJzaW9uLCBwYXJhbXMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZldGNoKCdodHRwOi8vMTI3LjAuMC4xOjg3NjUnLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBcImFjdGlvblwiOiBhY3Rpb24sIFwidmVyc2lvblwiOiB2ZXJzaW9uLCBcInBhcmFtc1wiOiBwYXJhbXMgfSlcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIHJlamVjdCh7ICdyZXN1bHQnOiBbXSwgJ2Vycm9yJzogJ1BsZWFzZSBvcGVuIHRoZSBBbmtpIGNsaWVudCBhbmQgaW5zdGFsbCB0aGUgQW5raS1Db25uZWN0IHBsdWdpbiBiZWZvcmUgdHJ5aW5nIGFnYWluLicgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0cy5hbmtpQWN0aW9uID0gYW5raUFjdGlvbjtcbmZ1bmN0aW9uIHVuc3BsYXNoU2VhcmNoUGhvdG9zKEFQSV9LRVksIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgdW5zcGxhc2ggPSAoMCwgdW5zcGxhc2hfanNfMS5jcmVhdGVBcGkpKHtcbiAgICAgICAgICAgIGFjY2Vzc0tleTogQVBJX0tFWSxcbiAgICAgICAgfSk7XG4gICAgICAgIHVuc3BsYXNoLnNlYXJjaC5nZXRQaG90b3Moe1xuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICB9KS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgaWYgKCgoX2EgPSBkYXRhLnJlc3BvbnNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVzdWx0cy5sZW5ndGgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWFnZVVybCA9IChfYiA9IGRhdGEucmVzcG9uc2UpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5yZXN1bHRzWzBdLnVybHMucmVndWxhcjtcbiAgICAgICAgICAgICAgICAvLyBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6IGltYWdlVXJsIH0pO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKF9jID0gZGF0YS5yZXNwb25zZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnJlc3VsdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0cy51bnNwbGFzaFNlYXJjaFBob3RvcyA9IHVuc3BsYXNoU2VhcmNoUGhvdG9zO1xuZnVuY3Rpb24gZ2V0TXAzKCkge1xuICAgIC8vIOWIm+W7uiBBdWRpb0NvbnRleHQg5a+56LGhXG4gICAgY29uc3QgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICAgIC8vIOWIm+W7uuS4gOS4quepuueahOe8k+WGsuWMuu+8jOeUqOS6juWtmOWCqOmfs+mikeaVsOaNrlxuICAgIGNvbnN0IGJ1ZmZlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXIoMSwgNDQxMDAsIDQ0MTAwKTtcbiAgICAvLyDojrflj5bnvJPlhrLljLrnmoTmlbDmja5cbiAgICBjb25zdCBkYXRhID0gYnVmZmVyLmdldENoYW5uZWxEYXRhKDApO1xuICAgIC8vIOWwhuWtl+espuS4sui9rOaNouS4uumfs+mikeaVsOaNrlxuICAgIGNvbnN0IHN0cmluZyA9ICdIZWxsbywgd29ybGQhJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICBkYXRhW2ldID0gc3RyaW5nLmNoYXJDb2RlQXQoaSkgLyA2NTUzNSAqIDIgLSAxO1xuICAgIH1cbiAgICAvLyDliJvlu7rkuIDkuKogQXVkaW9CdWZmZXJTb3VyY2VOb2RlIOWvueixoe+8jOWwhue8k+WGsuWMuuS9nOS4uuWPguaVsOS8oOWFpVxuICAgIGNvbnN0IHNvdXJjZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICBzb3VyY2UuYnVmZmVyID0gYnVmZmVyO1xuICAgIC8vIOWwhiBBdWRpb0J1ZmZlclNvdXJjZU5vZGUg5a+56LGh6L+e5o6l5YiwIEF1ZGlvQ29udGV4dCDnmoQgZGVzdGluYXRpb24g5bGe5oCnXG4gICAgc291cmNlLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICAvLyDmkq3mlL7pn7PpopFcbiAgICBzb3VyY2Uuc3RhcnQoKTtcbiAgICAvLyDlsIbpn7PpopHlr7zlh7rkuLogTVAzIOaWh+S7tlxuICAgIC8vIGNvbnN0IGVuY29kZXIgPSBuZXcgTXAzRW5jb2RlcigxLCA0NDEwMCwgMTI4KTtcbiAgICAvLyBjb25zdCBtcDNEYXRhID0gZW5jb2Rlci5lbmNvZGVCdWZmZXIoYnVmZmVyLmdldENoYW5uZWxEYXRhKDApKTtcbiAgICAvLyBjb25zdCBibG9iID0gbmV3IEJsb2IoW21wM0RhdGFdLCB7IHR5cGU6ICdhdWRpby9tcDMnIH0pO1xuICAgIC8vIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgLy8gY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAvLyBsaW5rLmhyZWYgPSB1cmw7XG4gICAgLy8gbGluay5kb3dubG9hZCA9ICdhdWRpby5tcDMnO1xufVxuZXhwb3J0cy5nZXRNcDMgPSBnZXRNcDM7XG4iLCJpbXBvcnQgeyBwYXJzZSB9IGZyb20gJ2NvbnRlbnQtdHlwZSc7XG5cbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICB2YXIga2V5LCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG52YXIgY2hlY2tJc1N0cmluZyA9IC8qI19fUFVSRV9fKi9nZXRSZWZpbmVtZW50KGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHZhbHVlIDogbnVsbDtcbn0pO1xudmFyIGlzRGVmaW5lZCA9IGZ1bmN0aW9uIGlzRGVmaW5lZCh4KSB7XG4gIHJldHVybiB4ICE9PSBudWxsICYmIHggIT09IHVuZGVmaW5lZDtcbn07XG5mdW5jdGlvbiBnZXRSZWZpbmVtZW50KGdldEIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIGlzRGVmaW5lZChnZXRCKGEpKTtcbiAgfTtcbn1cbnZhciBjaGVja0lzTm9uRW1wdHlBcnJheSA9IGZ1bmN0aW9uIGNoZWNrSXNOb25FbXB0eUFycmF5KGEpIHtcbiAgcmV0dXJuIGEubGVuZ3RoID4gMDtcbn07XG5cbi8qKiBUYWtlcyBhIGRpY3Rpb25hcnkgY29udGFpbmluZyBudWxsaXNoIHZhbHVlcyBhbmQgcmV0dXJucyBhIGRpY3Rpb25hcnkgb2YgYWxsIHRoZSBkZWZpbmVkXHJcbiAqIChub24tbnVsbGlzaCkgdmFsdWVzLlxyXG4gKi9cblxudmFyIGNvbXBhY3REZWZpbmVkID0gZnVuY3Rpb24gY29tcGFjdERlZmluZWQob2JqKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgYWNjLCBpc0RlZmluZWQodmFsdWUpID8gKF9yZWYgPSB7fSwgX3JlZltrZXldID0gdmFsdWUsIF9yZWYpIDoge30pO1xuICB9LCB7fSk7XG59O1xuZnVuY3Rpb24gZmxvdygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZucyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBmbnNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICB2YXIgbGVuID0gZm5zLmxlbmd0aCAtIDE7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCB4ID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICB4W19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgfVxuXG4gICAgdmFyIHkgPSBmbnNbMF0uYXBwbHkodGhpcywgeCk7XG5cbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBsZW47IGkrKykge1xuICAgICAgeSA9IGZuc1tpXS5jYWxsKHRoaXMsIHkpO1xuICAgIH1cblxuICAgIHJldHVybiB5O1xuICB9O1xufVxuXG52YXIgY2hlY2tJc09iamVjdCA9IC8qI19fUFVSRV9fKi9nZXRSZWZpbmVtZW50KGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICByZXR1cm4gaXNEZWZpbmVkKHJlc3BvbnNlKSAmJiB0eXBlb2YgcmVzcG9uc2UgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHJlc3BvbnNlKSA/IHJlc3BvbnNlIDogbnVsbDtcbn0pO1xudmFyIGNoZWNrSXNFcnJvcnMgPSAvKiNfX1BVUkVfXyovZ2V0UmVmaW5lbWVudChmdW5jdGlvbiAoZXJyb3JzKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGVycm9ycykgJiYgZXJyb3JzLmV2ZXJ5KGNoZWNrSXNTdHJpbmcpICYmIGNoZWNrSXNOb25FbXB0eUFycmF5KGVycm9ycykgPyBlcnJvcnMgOiBudWxsO1xufSk7XG52YXIgY2hlY2tJc0FwaUVycm9yID0gLyojX19QVVJFX18qL2dldFJlZmluZW1lbnQoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gIHJldHVybiBjaGVja0lzT2JqZWN0KHJlc3BvbnNlKSAmJiAnZXJyb3JzJyBpbiByZXNwb25zZSAmJiBjaGVja0lzRXJyb3JzKHJlc3BvbnNlLmVycm9ycykgPyB7XG4gICAgZXJyb3JzOiByZXNwb25zZS5lcnJvcnNcbiAgfSA6IG51bGw7XG59KTtcbnZhciBnZXRFcnJvckZvckJhZFN0YXR1c0NvZGUgPSBmdW5jdGlvbiBnZXRFcnJvckZvckJhZFN0YXR1c0NvZGUoanNvblJlc3BvbnNlKSB7XG4gIGlmIChjaGVja0lzQXBpRXJyb3IoanNvblJlc3BvbnNlKSkge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcnM6IGpzb25SZXNwb25zZS5lcnJvcnMsXG4gICAgICBzb3VyY2U6ICdhcGknXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3JzOiBbJ1Jlc3BvbmRlZCB3aXRoIGEgc3RhdHVzIGNvZGUgb3V0c2lkZSB0aGUgMnh4IHJhbmdlLCBhbmQgdGhlIHJlc3BvbnNlIGJvZHkgaXMgbm90IHJlY29nbmlzYWJsZS4nXSxcbiAgICAgIHNvdXJjZTogJ2RlY29kaW5nJ1xuICAgIH07XG4gIH1cbn07XG52YXIgRGVjb2RpbmdFcnJvciA9IGZ1bmN0aW9uIERlY29kaW5nRXJyb3IobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufTtcblxudmFyIENPTlRFTlRfVFlQRV9SRVNQT05TRV9IRUFERVIgPSAnY29udGVudC10eXBlJztcbnZhciBDT05URU5UX1RZUEVfSlNPTiA9ICdhcHBsaWNhdGlvbi9qc29uJztcblxudmFyIGNoZWNrSXNKc29uUmVzcG9uc2UgPSBmdW5jdGlvbiBjaGVja0lzSnNvblJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gIHZhciBjb250ZW50VHlwZUhlYWRlciA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KENPTlRFTlRfVFlQRV9SRVNQT05TRV9IRUFERVIpO1xuICByZXR1cm4gaXNEZWZpbmVkKGNvbnRlbnRUeXBlSGVhZGVyKSAmJiBwYXJzZShjb250ZW50VHlwZUhlYWRlcikudHlwZSA9PT0gQ09OVEVOVF9UWVBFX0pTT047XG59O1xuLyoqXHJcbiAqIE5vdGU6IHJlc3RyaWN0IHRoZSB0eXBlIG9mIEpTT04gdG8gYEFueUpzb25gIHNvIHRoYXQgYGFueWAgZG9lc24ndCBsZWFrIGRvd25zdHJlYW0uXHJcbiAqL1xuXG5cbnZhciBnZXRKc29uUmVzcG9uc2UgPSBmdW5jdGlvbiBnZXRKc29uUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgaWYgKGNoZWNrSXNKc29uUmVzcG9uc2UocmVzcG9uc2UpKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVtcImNhdGNoXCJdKGZ1bmN0aW9uIChfZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgRGVjb2RpbmdFcnJvcigndW5hYmxlIHRvIHBhcnNlIEpTT04gcmVzcG9uc2UuJyk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IERlY29kaW5nRXJyb3IoJ2V4cGVjdGVkIEpTT04gcmVzcG9uc2UgZnJvbSBzZXJ2ZXIuJyk7XG4gIH1cbn07XG5cbnZhciBoYW5kbGVGZXRjaFJlc3BvbnNlID0gZnVuY3Rpb24gaGFuZGxlRmV0Y2hSZXNwb25zZShoYW5kbGVSZXNwb25zZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgcmV0dXJuIChyZXNwb25zZS5vayA/IGhhbmRsZVJlc3BvbnNlKHtcbiAgICAgIHJlc3BvbnNlOiByZXNwb25zZVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGhhbmRsZWRSZXNwb25zZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgcmVzcG9uc2U6IGhhbmRsZWRSZXNwb25zZSxcbiAgICAgICAgb3JpZ2luYWxSZXNwb25zZTogcmVzcG9uc2VcbiAgICAgIH07XG4gICAgfSkgOiBnZXRKc29uUmVzcG9uc2UocmVzcG9uc2UpLnRoZW4oZnVuY3Rpb24gKGpzb25SZXNwb25zZSkge1xuICAgICAgcmV0dXJuIF9leHRlbmRzKHtcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICAgIH0sIGdldEVycm9yRm9yQmFkU3RhdHVzQ29kZShqc29uUmVzcG9uc2UpLCB7XG4gICAgICAgIG9yaWdpbmFsUmVzcG9uc2U6IHJlc3BvbnNlXG4gICAgICB9KTtcbiAgICB9KSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIC8qKlxyXG4gICAgICAgKiBXZSB3YW50IHRvIHNlcGFyYXRlIGV4cGVjdGVkIGRlY29kaW5nIGVycm9ycyBmcm9tIHVua25vd24gb25lcy4gV2UgZG8gc28gYnkgdGhyb3dpbmcgYSBjdXN0b21cclxuICAgICAgICogYERlY29kaW5nRXJyb3JgIHdoZW5ldmVyIHdlIGVuY291bnRlciBvbmUgd2l0aGluIGBoYW5kbGVGZXRjaFJlc3BvbnNlYCBhbmQgY2F0Y2ggdGhlbSBhbGxcclxuICAgICAgICogaGVyZS4gVGhpcyBhbGxvd3MgdXMgdG8gZWFzaWx5IGhhbmRsZSBhbGwgb2YgdGhlc2UgZXJyb3JzIGF0IG9uY2UuIFVuZXhwZWN0ZWQgZXJyb3JzIGFyZSBub3RcclxuICAgICAgICogY2F1Z2h0LCBzbyB0aGF0IHRoZXkgYnViYmxlIHVwIGFuZCBmYWlsIGxvdWRseS5cclxuICAgICAgICpcclxuICAgICAgICogTm90ZTogSWRlYWxseSB3ZSdkIHVzZSBhbiBFaXRoZXIgdHlwZSwgYnV0IHRoaXMgZG9lcyB0aGUgam9iIHdpdGhvdXQgaW50cm9kdWNpbmcgZGVwZW5kZW5jaWVzXHJcbiAgICAgICAqIGxpa2UgYGZwLXRzYC5cclxuICAgICAgICovXG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBEZWNvZGluZ0Vycm9yKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICBzb3VyY2U6ICdkZWNvZGluZycsXG4gICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgb3JpZ2luYWxSZXNwb25zZTogcmVzcG9uc2UsXG4gICAgICAgICAgZXJyb3JzOiBbZXJyb3IubWVzc2FnZV1cbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufTtcbnZhciBjYXN0UmVzcG9uc2UgPSBmdW5jdGlvbiBjYXN0UmVzcG9uc2UoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciByZXNwb25zZSA9IF9yZWYucmVzcG9uc2U7XG4gICAgcmV0dXJuIGdldEpzb25SZXNwb25zZShyZXNwb25zZSk7XG4gIH07XG59O1xuXG52YXIgYWRkUXVlcnlUb1VybCA9IGZ1bmN0aW9uIGFkZFF1ZXJ5VG9VcmwocXVlcnkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh1cmwpIHtcbiAgICBPYmplY3Qua2V5cyhxdWVyeSkuZm9yRWFjaChmdW5jdGlvbiAocXVlcnlLZXkpIHtcbiAgICAgIHJldHVybiB1cmwuc2VhcmNoUGFyYW1zLnNldChxdWVyeUtleSwgcXVlcnlbcXVlcnlLZXldLnRvU3RyaW5nKCkpO1xuICAgIH0pO1xuICB9O1xufTtcblxudmFyIGFkZFBhdGhuYW1lVG9VcmwgPSBmdW5jdGlvbiBhZGRQYXRobmFtZVRvVXJsKHBhdGhuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodXJsKSB7XG4gICAgLy8gV2hlbiB0aGVyZSBpcyBubyBleGlzdGluZyBwYXRobmFtZSwgdGhlIHZhbHVlIGlzIGAvYC4gQXBwZW5kaW5nIHdvdWxkIGdpdmUgdXMgYSBVUkwgd2l0aCB0d29cbiAgICAvLyBmb3J3YXJkIHNsYXNoZXMuIFRoaXMgaXMgd2h5IHdlIHJlcGxhY2UgdGhlIHZhbHVlIGluIHRoYXQgc2NlbmFyaW8uXG4gICAgaWYgKHVybC5wYXRobmFtZSA9PT0gJy8nKSB7XG4gICAgICB1cmwucGF0aG5hbWUgPSBwYXRobmFtZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsLnBhdGhuYW1lICs9IHBhdGhuYW1lO1xuICAgIH1cbiAgfTtcbn07XG5cbnZhciBidWlsZFVybCA9IGZ1bmN0aW9uIGJ1aWxkVXJsKF9yZWYpIHtcbiAgdmFyIHBhdGhuYW1lID0gX3JlZi5wYXRobmFtZSxcbiAgICAgIHF1ZXJ5ID0gX3JlZi5xdWVyeTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhcGlVcmwpIHtcbiAgICB2YXIgdXJsID0gbmV3IFVSTChhcGlVcmwpO1xuICAgIGFkZFBhdGhuYW1lVG9VcmwocGF0aG5hbWUpKHVybCk7XG4gICAgYWRkUXVlcnlUb1VybChxdWVyeSkodXJsKTtcbiAgICByZXR1cm4gdXJsLnRvU3RyaW5nKCk7XG4gIH07XG59O1xuXG52YXIgZ2V0UXVlcnlGcm9tU2VhcmNoUGFyYW1zID0gZnVuY3Rpb24gZ2V0UXVlcnlGcm9tU2VhcmNoUGFyYW1zKHNlYXJjaFBhcmFtcykge1xuICB2YXIgcXVlcnkgPSB7fTtcbiAgc2VhcmNoUGFyYW1zLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICBxdWVyeVtrZXldID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcXVlcnk7XG59O1xuXG52YXIgcGFyc2VRdWVyeUFuZFBhdGhuYW1lID0gZnVuY3Rpb24gcGFyc2VRdWVyeUFuZFBhdGhuYW1lKHVybCkge1xuICB2YXIgX1VSTCA9IG5ldyBVUkwodXJsKSxcbiAgICAgIHBhdGhuYW1lID0gX1VSTC5wYXRobmFtZSxcbiAgICAgIHNlYXJjaFBhcmFtcyA9IF9VUkwuc2VhcmNoUGFyYW1zO1xuXG4gIHZhciBxdWVyeSA9IGdldFF1ZXJ5RnJvbVNlYXJjaFBhcmFtcyhzZWFyY2hQYXJhbXMpO1xuICByZXR1cm4ge1xuICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICBwYXRobmFtZTogcGF0aG5hbWUgPT09ICcvJyA/IHVuZGVmaW5lZCA6IHBhdGhuYW1lXG4gIH07XG59O1xuXG4vKipcclxuICogaGVscGVyIHVzZWQgdG8gdHlwZS1jaGVjayB0aGUgYXJndW1lbnRzLCBhbmQgYWRkIGRlZmF1bHQgcGFyYW1zIGZvciBhbGwgcmVxdWVzdHNcclxuICovXG5cbnZhciBjcmVhdGVSZXF1ZXN0SGFuZGxlciA9IGZ1bmN0aW9uIGNyZWF0ZVJlcXVlc3RIYW5kbGVyKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoYSwgYWRkaXRpb25hbEZldGNoT3B0aW9ucykge1xuICAgIGlmIChhZGRpdGlvbmFsRmV0Y2hPcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgIGFkZGl0aW9uYWxGZXRjaE9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICB2YXIgX2ZuID0gZm4oYSksXG4gICAgICAgIGhlYWRlcnMgPSBfZm4uaGVhZGVycyxcbiAgICAgICAgcXVlcnkgPSBfZm4ucXVlcnksXG4gICAgICAgIGJhc2VSZXFQYXJhbXMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfZm4sIFtcImhlYWRlcnNcIiwgXCJxdWVyeVwiXSk7XG5cbiAgICByZXR1cm4gX2V4dGVuZHMoe30sIGJhc2VSZXFQYXJhbXMsIGFkZGl0aW9uYWxGZXRjaE9wdGlvbnMsIHtcbiAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgIGhlYWRlcnM6IF9leHRlbmRzKHt9LCBoZWFkZXJzLCBhZGRpdGlvbmFsRmV0Y2hPcHRpb25zLmhlYWRlcnMpXG4gICAgfSk7XG4gIH07XG59O1xudmFyIG1ha2VFbmRwb2ludCA9IGZ1bmN0aW9uIG1ha2VFbmRwb2ludChlbmRwb2ludCkge1xuICByZXR1cm4gZW5kcG9pbnQ7XG59O1xudmFyIGluaXRNYWtlUmVxdWVzdCA9IGZ1bmN0aW9uIGluaXRNYWtlUmVxdWVzdChfcmVmKSB7XG4gIHZhciBhY2Nlc3NLZXkgPSBfcmVmLmFjY2Vzc0tleSxcbiAgICAgIF9yZWYkYXBpVmVyc2lvbiA9IF9yZWYuYXBpVmVyc2lvbixcbiAgICAgIGFwaVZlcnNpb24gPSBfcmVmJGFwaVZlcnNpb24gPT09IHZvaWQgMCA/ICd2MScgOiBfcmVmJGFwaVZlcnNpb24sXG4gICAgICBfcmVmJGFwaVVybCA9IF9yZWYuYXBpVXJsLFxuICAgICAgYXBpVXJsID0gX3JlZiRhcGlVcmwgPT09IHZvaWQgMCA/ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20nIDogX3JlZiRhcGlVcmwsXG4gICAgICBnZW5lcmFsSGVhZGVycyA9IF9yZWYuaGVhZGVycyxcbiAgICAgIHByb3ZpZGVkRmV0Y2ggPSBfcmVmLmZldGNoLFxuICAgICAgZ2VuZXJhbEZldGNoT3B0aW9ucyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcImFjY2Vzc0tleVwiLCBcImFwaVZlcnNpb25cIiwgXCJhcGlVcmxcIiwgXCJoZWFkZXJzXCIsIFwiZmV0Y2hcIl0pO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICB2YXIgaGFuZGxlUmVzcG9uc2UgPSBfcmVmMi5oYW5kbGVSZXNwb25zZSxcbiAgICAgICAgaGFuZGxlUmVxdWVzdCA9IF9yZWYyLmhhbmRsZVJlcXVlc3Q7XG4gICAgcmV0dXJuIGZsb3coaGFuZGxlUmVxdWVzdCwgZnVuY3Rpb24gKF9yZWYzKSB7XG4gICAgICB2YXIgcGF0aG5hbWUgPSBfcmVmMy5wYXRobmFtZSxcbiAgICAgICAgICBxdWVyeSA9IF9yZWYzLnF1ZXJ5LFxuICAgICAgICAgIF9yZWYzJG1ldGhvZCA9IF9yZWYzLm1ldGhvZCxcbiAgICAgICAgICBtZXRob2QgPSBfcmVmMyRtZXRob2QgPT09IHZvaWQgMCA/ICdHRVQnIDogX3JlZjMkbWV0aG9kLFxuICAgICAgICAgIGVuZHBvaW50SGVhZGVycyA9IF9yZWYzLmhlYWRlcnMsXG4gICAgICAgICAgYm9keSA9IF9yZWYzLmJvZHksXG4gICAgICAgICAgc2lnbmFsID0gX3JlZjMuc2lnbmFsO1xuICAgICAgdmFyIHVybCA9IGJ1aWxkVXJsKHtcbiAgICAgICAgcGF0aG5hbWU6IHBhdGhuYW1lLFxuICAgICAgICBxdWVyeTogcXVlcnlcbiAgICAgIH0pKGFwaVVybCk7XG5cbiAgICAgIHZhciBmZXRjaE9wdGlvbnMgPSBfZXh0ZW5kcyh7XG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBfZXh0ZW5kcyh7fSwgZ2VuZXJhbEhlYWRlcnMsIGVuZHBvaW50SGVhZGVycywge1xuICAgICAgICAgICdBY2NlcHQtVmVyc2lvbic6IGFwaVZlcnNpb25cbiAgICAgICAgfSwgaXNEZWZpbmVkKGFjY2Vzc0tleSkgPyB7XG4gICAgICAgICAgQXV0aG9yaXphdGlvbjogXCJDbGllbnQtSUQgXCIgKyBhY2Nlc3NLZXlcbiAgICAgICAgfSA6IHt9KSxcbiAgICAgICAgYm9keTogYm9keSxcbiAgICAgICAgc2lnbmFsOiBzaWduYWxcbiAgICAgIH0sIGdlbmVyYWxGZXRjaE9wdGlvbnMpO1xuXG4gICAgICB2YXIgZmV0Y2hUb1VzZSA9IHByb3ZpZGVkRmV0Y2ggIT0gbnVsbCA/IHByb3ZpZGVkRmV0Y2ggOiBmZXRjaDtcbiAgICAgIHJldHVybiBmZXRjaFRvVXNlKHVybCwgZmV0Y2hPcHRpb25zKS50aGVuKGhhbmRsZUZldGNoUmVzcG9uc2UoaGFuZGxlUmVzcG9uc2UpKTtcbiAgICB9KTtcbiAgfTtcbn07XG5cbnZhciBUT1RBTF9SRVNQT05TRV9IRUFERVIgPSAneC10b3RhbCc7XG5cbnZhciBnZXRUb3RhbEZyb21BcGlGZWVkUmVzcG9uc2UgPSBmdW5jdGlvbiBnZXRUb3RhbEZyb21BcGlGZWVkUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgdmFyIHRvdGFsc1N0ciA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFRPVEFMX1JFU1BPTlNFX0hFQURFUik7XG5cbiAgaWYgKGlzRGVmaW5lZCh0b3RhbHNTdHIpKSB7XG4gICAgdmFyIHRvdGFsID0gcGFyc2VJbnQodG90YWxzU3RyKTtcblxuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHRvdGFsKSkge1xuICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRGVjb2RpbmdFcnJvcihcImV4cGVjdGVkIFwiICsgVE9UQUxfUkVTUE9OU0VfSEVBREVSICsgXCIgaGVhZGVyIHRvIGJlIHZhbGlkIGludGVnZXIuXCIpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRGVjb2RpbmdFcnJvcihcImV4cGVjdGVkIFwiICsgVE9UQUxfUkVTUE9OU0VfSEVBREVSICsgXCIgaGVhZGVyIHRvIGV4aXN0LlwiKTtcbiAgfVxufTtcblxudmFyIGhhbmRsZUZlZWRSZXNwb25zZSA9IGZ1bmN0aW9uIGhhbmRsZUZlZWRSZXNwb25zZSgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gX3JlZi5yZXNwb25zZTtcbiAgICByZXR1cm4gY2FzdFJlc3BvbnNlKCkoe1xuICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0cykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdWx0czogcmVzdWx0cyxcbiAgICAgICAgdG90YWw6IGdldFRvdGFsRnJvbUFwaUZlZWRSZXNwb25zZShyZXNwb25zZSlcbiAgICAgIH07XG4gICAgfSk7XG4gIH07XG59O1xuXG52YXIgZ2V0Q29sbGVjdGlvbnMgPSBmdW5jdGlvbiBnZXRDb2xsZWN0aW9ucyhjb2xsZWN0aW9uSWRzKSB7XG4gIHJldHVybiBpc0RlZmluZWQoY29sbGVjdGlvbklkcykgPyB7XG4gICAgY29sbGVjdGlvbnM6IGNvbGxlY3Rpb25JZHMuam9pbigpXG4gIH0gOiB7fTtcbn07XG52YXIgZ2V0VG9waWNzID0gZnVuY3Rpb24gZ2V0VG9waWNzKHRvcGljSWRzKSB7XG4gIHJldHVybiBpc0RlZmluZWQodG9waWNJZHMpID8ge1xuICAgIHRvcGljczogdG9waWNJZHMuam9pbigpXG4gIH0gOiB7fTtcbn07XG52YXIgZ2V0RmVlZFBhcmFtcyA9IGZ1bmN0aW9uIGdldEZlZWRQYXJhbXMoX3JlZikge1xuICB2YXIgcGFnZSA9IF9yZWYucGFnZSxcbiAgICAgIHBlclBhZ2UgPSBfcmVmLnBlclBhZ2UsXG4gICAgICBvcmRlckJ5ID0gX3JlZi5vcmRlckJ5O1xuICByZXR1cm4gY29tcGFjdERlZmluZWQoe1xuICAgIHBlcl9wYWdlOiBwZXJQYWdlLFxuICAgIG9yZGVyX2J5OiBvcmRlckJ5LFxuICAgIHBhZ2U6IHBhZ2VcbiAgfSk7XG59O1xuXG52YXIgQ09MTEVDVElPTlNfUEFUSF9QUkVGSVggPSAnL2NvbGxlY3Rpb25zJztcbnZhciBnZXRQaG90b3MgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgZ2V0UGF0aG5hbWUgPSBmdW5jdGlvbiBnZXRQYXRobmFtZShfcmVmKSB7XG4gICAgdmFyIGNvbGxlY3Rpb25JZCA9IF9yZWYuY29sbGVjdGlvbklkO1xuICAgIHJldHVybiBDT0xMRUNUSU9OU19QQVRIX1BSRUZJWCArIFwiL1wiICsgY29sbGVjdGlvbklkICsgXCIvcGhvdG9zXCI7XG4gIH07XG5cbiAgcmV0dXJuIG1ha2VFbmRwb2ludCh7XG4gICAgZ2V0UGF0aG5hbWU6IGdldFBhdGhuYW1lLFxuICAgIGhhbmRsZVJlcXVlc3Q6IGNyZWF0ZVJlcXVlc3RIYW5kbGVyKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgdmFyIGNvbGxlY3Rpb25JZCA9IF9yZWYyLmNvbGxlY3Rpb25JZCxcbiAgICAgICAgICBvcmllbnRhdGlvbiA9IF9yZWYyLm9yaWVudGF0aW9uLFxuICAgICAgICAgIHBhZ2luYXRpb25QYXJhbXMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmMiwgW1wiY29sbGVjdGlvbklkXCIsIFwib3JpZW50YXRpb25cIl0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRobmFtZTogZ2V0UGF0aG5hbWUoe1xuICAgICAgICAgIGNvbGxlY3Rpb25JZDogY29sbGVjdGlvbklkXG4gICAgICAgIH0pLFxuICAgICAgICBxdWVyeTogY29tcGFjdERlZmluZWQoX2V4dGVuZHMoe30sIGdldEZlZWRQYXJhbXMocGFnaW5hdGlvblBhcmFtcyksIHtcbiAgICAgICAgICBvcmllbnRhdGlvbjogb3JpZW50YXRpb25cbiAgICAgICAgfSkpXG4gICAgICB9O1xuICAgIH0pLFxuICAgIGhhbmRsZVJlc3BvbnNlOiBoYW5kbGVGZWVkUmVzcG9uc2UoKVxuICB9KTtcbn0oKTtcbnZhciBnZXQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgZ2V0UGF0aG5hbWUgPSBmdW5jdGlvbiBnZXRQYXRobmFtZShfcmVmMykge1xuICAgIHZhciBjb2xsZWN0aW9uSWQgPSBfcmVmMy5jb2xsZWN0aW9uSWQ7XG4gICAgcmV0dXJuIENPTExFQ1RJT05TX1BBVEhfUFJFRklYICsgXCIvXCIgKyBjb2xsZWN0aW9uSWQ7XG4gIH07XG5cbiAgcmV0dXJuIG1ha2VFbmRwb2ludCh7XG4gICAgZ2V0UGF0aG5hbWU6IGdldFBhdGhuYW1lLFxuICAgIGhhbmRsZVJlcXVlc3Q6IGNyZWF0ZVJlcXVlc3RIYW5kbGVyKGZ1bmN0aW9uIChfcmVmNCkge1xuICAgICAgdmFyIGNvbGxlY3Rpb25JZCA9IF9yZWY0LmNvbGxlY3Rpb25JZDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhuYW1lOiBnZXRQYXRobmFtZSh7XG4gICAgICAgICAgY29sbGVjdGlvbklkOiBjb2xsZWN0aW9uSWRcbiAgICAgICAgfSksXG4gICAgICAgIHF1ZXJ5OiB7fVxuICAgICAgfTtcbiAgICB9KSxcbiAgICBoYW5kbGVSZXNwb25zZTogY2FzdFJlc3BvbnNlKClcbiAgfSk7XG59KCk7XG52YXIgbGlzdCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBnZXRQYXRobmFtZSA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKCkge1xuICAgIHJldHVybiBDT0xMRUNUSU9OU19QQVRIX1BSRUZJWDtcbiAgfTtcblxuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICBnZXRQYXRobmFtZTogZ2V0UGF0aG5hbWUsXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKHBhZ2luYXRpb25QYXJhbXMpIHtcbiAgICAgIGlmIChwYWdpbmF0aW9uUGFyYW1zID09PSB2b2lkIDApIHtcbiAgICAgICAgcGFnaW5hdGlvblBhcmFtcyA9IHt9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRobmFtZTogZ2V0UGF0aG5hbWUoKSxcbiAgICAgICAgcXVlcnk6IGdldEZlZWRQYXJhbXMocGFnaW5hdGlvblBhcmFtcylcbiAgICAgIH07XG4gICAgfSksXG4gICAgaGFuZGxlUmVzcG9uc2U6IGhhbmRsZUZlZWRSZXNwb25zZSgpXG4gIH0pO1xufSgpO1xudmFyIGdldFJlbGF0ZWQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgZ2V0UGF0aG5hbWUgPSBmdW5jdGlvbiBnZXRQYXRobmFtZShfcmVmNSkge1xuICAgIHZhciBjb2xsZWN0aW9uSWQgPSBfcmVmNS5jb2xsZWN0aW9uSWQ7XG4gICAgcmV0dXJuIENPTExFQ1RJT05TX1BBVEhfUFJFRklYICsgXCIvXCIgKyBjb2xsZWN0aW9uSWQgKyBcIi9yZWxhdGVkXCI7XG4gIH07XG5cbiAgcmV0dXJuIG1ha2VFbmRwb2ludCh7XG4gICAgZ2V0UGF0aG5hbWU6IGdldFBhdGhuYW1lLFxuICAgIGhhbmRsZVJlcXVlc3Q6IGNyZWF0ZVJlcXVlc3RIYW5kbGVyKGZ1bmN0aW9uIChfcmVmNikge1xuICAgICAgdmFyIGNvbGxlY3Rpb25JZCA9IF9yZWY2LmNvbGxlY3Rpb25JZDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhuYW1lOiBnZXRQYXRobmFtZSh7XG4gICAgICAgICAgY29sbGVjdGlvbklkOiBjb2xsZWN0aW9uSWRcbiAgICAgICAgfSksXG4gICAgICAgIHF1ZXJ5OiB7fVxuICAgICAgfTtcbiAgICB9KSxcbiAgICBoYW5kbGVSZXNwb25zZTogY2FzdFJlc3BvbnNlKClcbiAgfSk7XG59KCk7XG5cbnZhciBpbmRleCA9IHtcbiAgX19wcm90b19fOiBudWxsLFxuICBnZXRQaG90b3M6IGdldFBob3RvcyxcbiAgZ2V0OiBnZXQsXG4gIGxpc3Q6IGxpc3QsXG4gIGdldFJlbGF0ZWQ6IGdldFJlbGF0ZWRcbn07XG5cbnZhciBQSE9UT1NfUEFUSF9QUkVGSVggPSAnL3Bob3Rvcyc7XG52YXIgbGlzdCQxID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIF9nZXRQYXRobmFtZSA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKCkge1xuICAgIHJldHVybiBQSE9UT1NfUEFUSF9QUkVGSVg7XG4gIH07XG5cbiAgcmV0dXJuIG1ha2VFbmRwb2ludCh7XG4gICAgLy8gV3JhcHBlciB1c2VzIHR5cGUgdHJpY2sgdG8gYWxsb3cgMCBhcmdzXG4gICAgZ2V0UGF0aG5hbWU6IGZ1bmN0aW9uIGdldFBhdGhuYW1lKF9wYXJhbXMpIHtcbiAgICAgIHJldHVybiBfZ2V0UGF0aG5hbWUoKTtcbiAgICB9LFxuICAgIGhhbmRsZVJlcXVlc3Q6IGNyZWF0ZVJlcXVlc3RIYW5kbGVyKGZ1bmN0aW9uIChmZWVkUGFyYW1zKSB7XG4gICAgICBpZiAoZmVlZFBhcmFtcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGZlZWRQYXJhbXMgPSB7fTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aG5hbWU6IFBIT1RPU19QQVRIX1BSRUZJWCxcbiAgICAgICAgcXVlcnk6IGNvbXBhY3REZWZpbmVkKGdldEZlZWRQYXJhbXMoZmVlZFBhcmFtcykpXG4gICAgICB9O1xuICAgIH0pLFxuICAgIGhhbmRsZVJlc3BvbnNlOiBoYW5kbGVGZWVkUmVzcG9uc2UoKVxuICB9KTtcbn0oKTtcbnZhciBnZXQkMSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBnZXRQYXRobmFtZSA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKF9yZWYpIHtcbiAgICB2YXIgcGhvdG9JZCA9IF9yZWYucGhvdG9JZDtcbiAgICByZXR1cm4gUEhPVE9TX1BBVEhfUFJFRklYICsgXCIvXCIgKyBwaG90b0lkO1xuICB9O1xuXG4gIHJldHVybiBtYWtlRW5kcG9pbnQoe1xuICAgIGdldFBhdGhuYW1lOiBnZXRQYXRobmFtZSxcbiAgICBoYW5kbGVSZXF1ZXN0OiBjcmVhdGVSZXF1ZXN0SGFuZGxlcihmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgIHZhciBwaG90b0lkID0gX3JlZjIucGhvdG9JZDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhuYW1lOiBnZXRQYXRobmFtZSh7XG4gICAgICAgICAgcGhvdG9JZDogcGhvdG9JZFxuICAgICAgICB9KSxcbiAgICAgICAgcXVlcnk6IHt9XG4gICAgICB9O1xuICAgIH0pLFxuICAgIGhhbmRsZVJlc3BvbnNlOiBjYXN0UmVzcG9uc2UoKVxuICB9KTtcbn0oKTtcbnZhciBnZXRTdGF0cyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBnZXRQYXRobmFtZSA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKF9yZWYzKSB7XG4gICAgdmFyIHBob3RvSWQgPSBfcmVmMy5waG90b0lkO1xuICAgIHJldHVybiBQSE9UT1NfUEFUSF9QUkVGSVggKyBcIi9cIiArIHBob3RvSWQgKyBcIi9zdGF0aXN0aWNzXCI7XG4gIH07XG5cbiAgcmV0dXJuIG1ha2VFbmRwb2ludCh7XG4gICAgZ2V0UGF0aG5hbWU6IGdldFBhdGhuYW1lLFxuICAgIGhhbmRsZVJlcXVlc3Q6IGNyZWF0ZVJlcXVlc3RIYW5kbGVyKGZ1bmN0aW9uIChfcmVmNCkge1xuICAgICAgdmFyIHBob3RvSWQgPSBfcmVmNC5waG90b0lkO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aG5hbWU6IGdldFBhdGhuYW1lKHtcbiAgICAgICAgICBwaG90b0lkOiBwaG90b0lkXG4gICAgICAgIH0pLFxuICAgICAgICBxdWVyeToge31cbiAgICAgIH07XG4gICAgfSksXG4gICAgaGFuZGxlUmVzcG9uc2U6IGNhc3RSZXNwb25zZSgpXG4gIH0pO1xufSgpO1xudmFyIGdldFJhbmRvbSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBnZXRQYXRobmFtZSA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKCkge1xuICAgIHJldHVybiBQSE9UT1NfUEFUSF9QUkVGSVggKyBcIi9yYW5kb21cIjtcbiAgfTtcblxuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICBnZXRQYXRobmFtZTogZ2V0UGF0aG5hbWUsXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKF90ZW1wKSB7XG4gICAgICB2YXIgX3JlZjUgPSBfdGVtcCA9PT0gdm9pZCAwID8ge30gOiBfdGVtcCxcbiAgICAgICAgICBjb2xsZWN0aW9uSWRzID0gX3JlZjUuY29sbGVjdGlvbklkcyxcbiAgICAgICAgICBjb250ZW50RmlsdGVyID0gX3JlZjUuY29udGVudEZpbHRlcixcbiAgICAgICAgICB0b3BpY0lkcyA9IF9yZWY1LnRvcGljSWRzLFxuICAgICAgICAgIHF1ZXJ5UGFyYW1zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZjUsIFtcImNvbGxlY3Rpb25JZHNcIiwgXCJjb250ZW50RmlsdGVyXCIsIFwidG9waWNJZHNcIl0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRobmFtZTogZ2V0UGF0aG5hbWUoKSxcbiAgICAgICAgcXVlcnk6IGNvbXBhY3REZWZpbmVkKF9leHRlbmRzKHt9LCBxdWVyeVBhcmFtcywge1xuICAgICAgICAgIGNvbnRlbnRfZmlsdGVyOiBjb250ZW50RmlsdGVyXG4gICAgICAgIH0sIGdldENvbGxlY3Rpb25zKGNvbGxlY3Rpb25JZHMpLCBnZXRUb3BpY3ModG9waWNJZHMpKSksXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEF2b2lkIHJlc3BvbnNlIGNhY2hpbmdcclxuICAgICAgICAgICAqL1xuICAgICAgICAgICdjYWNoZS1jb250cm9sJzogJ25vLWNhY2hlJ1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pLFxuICAgIGhhbmRsZVJlc3BvbnNlOiBjYXN0UmVzcG9uc2UoKVxuICB9KTtcbn0oKTtcbnZhciB0cmFja0Rvd25sb2FkID0ge1xuICBoYW5kbGVSZXF1ZXN0OiAvKiNfX1BVUkVfXyovY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKF9yZWY2KSB7XG4gICAgdmFyIGRvd25sb2FkTG9jYXRpb24gPSBfcmVmNi5kb3dubG9hZExvY2F0aW9uO1xuXG4gICAgdmFyIF9wYXJzZVF1ZXJ5QW5kUGF0aG5hbSA9IHBhcnNlUXVlcnlBbmRQYXRobmFtZShkb3dubG9hZExvY2F0aW9uKSxcbiAgICAgICAgcGF0aG5hbWUgPSBfcGFyc2VRdWVyeUFuZFBhdGhuYW0ucGF0aG5hbWUsXG4gICAgICAgIHF1ZXJ5ID0gX3BhcnNlUXVlcnlBbmRQYXRobmFtLnF1ZXJ5O1xuXG4gICAgaWYgKCFpc0RlZmluZWQocGF0aG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBwYXJzZSBwYXRobmFtZSBmcm9tIHVybC4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGF0aG5hbWU6IHBhdGhuYW1lLFxuICAgICAgcXVlcnk6IGNvbXBhY3REZWZpbmVkKHF1ZXJ5KVxuICAgIH07XG4gIH0pLFxuICBoYW5kbGVSZXNwb25zZTogLyojX19QVVJFX18qL2Nhc3RSZXNwb25zZSgpXG59O1xuXG52YXIgaW5kZXgkMSA9IHtcbiAgX19wcm90b19fOiBudWxsLFxuICBsaXN0OiBsaXN0JDEsXG4gIGdldDogZ2V0JDEsXG4gIGdldFN0YXRzOiBnZXRTdGF0cyxcbiAgZ2V0UmFuZG9tOiBnZXRSYW5kb20sXG4gIHRyYWNrRG93bmxvYWQ6IHRyYWNrRG93bmxvYWRcbn07XG5cbnZhciBTRUFSQ0hfUEFUSF9QUkVGSVggPSBcIi9zZWFyY2hcIjtcbnZhciBnZXRQaG90b3MkMSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBfZ2V0UGF0aG5hbWUgPSBmdW5jdGlvbiBnZXRQYXRobmFtZSgpIHtcbiAgICByZXR1cm4gU0VBUkNIX1BBVEhfUFJFRklYICsgXCIvcGhvdG9zXCI7XG4gIH07XG5cbiAgcmV0dXJuIG1ha2VFbmRwb2ludCh7XG4gICAgLy8gV3JhcHBlciB1c2VzIHR5cGUgdHJpY2sgdG8gYWxsb3cgMCBhcmdzXG4gICAgZ2V0UGF0aG5hbWU6IGZ1bmN0aW9uIGdldFBhdGhuYW1lKF9wYXJhbXMpIHtcbiAgICAgIHJldHVybiBfZ2V0UGF0aG5hbWUoKTtcbiAgICB9LFxuICAgIGhhbmRsZVJlcXVlc3Q6IGNyZWF0ZVJlcXVlc3RIYW5kbGVyKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICB2YXIgcXVlcnkgPSBfcmVmLnF1ZXJ5LFxuICAgICAgICAgIHBhZ2UgPSBfcmVmLnBhZ2UsXG4gICAgICAgICAgcGVyUGFnZSA9IF9yZWYucGVyUGFnZSxcbiAgICAgICAgICBvcmRlckJ5ID0gX3JlZi5vcmRlckJ5LFxuICAgICAgICAgIGNvbGxlY3Rpb25JZHMgPSBfcmVmLmNvbGxlY3Rpb25JZHMsXG4gICAgICAgICAgbGFuZyA9IF9yZWYubGFuZyxcbiAgICAgICAgICBjb250ZW50RmlsdGVyID0gX3JlZi5jb250ZW50RmlsdGVyLFxuICAgICAgICAgIGZpbHRlcnMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJxdWVyeVwiLCBcInBhZ2VcIiwgXCJwZXJQYWdlXCIsIFwib3JkZXJCeVwiLCBcImNvbGxlY3Rpb25JZHNcIiwgXCJsYW5nXCIsIFwiY29udGVudEZpbHRlclwiXSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhuYW1lOiBfZ2V0UGF0aG5hbWUoKSxcbiAgICAgICAgcXVlcnk6IGNvbXBhY3REZWZpbmVkKF9leHRlbmRzKHtcbiAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgY29udGVudF9maWx0ZXI6IGNvbnRlbnRGaWx0ZXIsXG4gICAgICAgICAgbGFuZzogbGFuZyxcbiAgICAgICAgICBvcmRlcl9ieTogb3JkZXJCeVxuICAgICAgICB9LCBnZXRGZWVkUGFyYW1zKHtcbiAgICAgICAgICBwYWdlOiBwYWdlLFxuICAgICAgICAgIHBlclBhZ2U6IHBlclBhZ2VcbiAgICAgICAgfSksIGdldENvbGxlY3Rpb25zKGNvbGxlY3Rpb25JZHMpLCBmaWx0ZXJzKSlcbiAgICAgIH07XG4gICAgfSksXG4gICAgaGFuZGxlUmVzcG9uc2U6IGNhc3RSZXNwb25zZSgpXG4gIH0pO1xufSgpO1xudmFyIGdldENvbGxlY3Rpb25zJDEgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgX2dldFBhdGhuYW1lMiA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKCkge1xuICAgIHJldHVybiBTRUFSQ0hfUEFUSF9QUkVGSVggKyBcIi9jb2xsZWN0aW9uc1wiO1xuICB9O1xuXG4gIHJldHVybiBtYWtlRW5kcG9pbnQoe1xuICAgIC8vIFdyYXBwZXIgdXNlcyB0eXBlIHRyaWNrIHRvIGFsbG93IDAgYXJnc1xuICAgIGdldFBhdGhuYW1lOiBmdW5jdGlvbiBnZXRQYXRobmFtZShfcGFyYW1zKSB7XG4gICAgICByZXR1cm4gX2dldFBhdGhuYW1lMigpO1xuICAgIH0sXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICB2YXIgcXVlcnkgPSBfcmVmMi5xdWVyeSxcbiAgICAgICAgICBwYWdpbmF0aW9uUGFyYW1zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZjIsIFtcInF1ZXJ5XCJdKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aG5hbWU6IF9nZXRQYXRobmFtZTIoKSxcbiAgICAgICAgcXVlcnk6IF9leHRlbmRzKHtcbiAgICAgICAgICBxdWVyeTogcXVlcnlcbiAgICAgICAgfSwgZ2V0RmVlZFBhcmFtcyhwYWdpbmF0aW9uUGFyYW1zKSlcbiAgICAgIH07XG4gICAgfSksXG4gICAgaGFuZGxlUmVzcG9uc2U6IGNhc3RSZXNwb25zZSgpXG4gIH0pO1xufSgpO1xudmFyIGdldFVzZXJzID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIF9nZXRQYXRobmFtZTMgPSBmdW5jdGlvbiBnZXRQYXRobmFtZSgpIHtcbiAgICByZXR1cm4gU0VBUkNIX1BBVEhfUFJFRklYICsgXCIvdXNlcnNcIjtcbiAgfTtcblxuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICAvLyBXcmFwcGVyIHVzZXMgdHlwZSB0cmljayB0byBhbGxvdyAwIGFyZ3NcbiAgICBnZXRQYXRobmFtZTogZnVuY3Rpb24gZ2V0UGF0aG5hbWUoX3BhcmFtcykge1xuICAgICAgcmV0dXJuIF9nZXRQYXRobmFtZTMoKTtcbiAgICB9LFxuICAgIGhhbmRsZVJlcXVlc3Q6IGNyZWF0ZVJlcXVlc3RIYW5kbGVyKGZ1bmN0aW9uIChfcmVmMykge1xuICAgICAgdmFyIHF1ZXJ5ID0gX3JlZjMucXVlcnksXG4gICAgICAgICAgcGFnaW5hdGlvblBhcmFtcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYzLCBbXCJxdWVyeVwiXSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhuYW1lOiBfZ2V0UGF0aG5hbWUzKCksXG4gICAgICAgIHF1ZXJ5OiBfZXh0ZW5kcyh7XG4gICAgICAgICAgcXVlcnk6IHF1ZXJ5XG4gICAgICAgIH0sIGdldEZlZWRQYXJhbXMocGFnaW5hdGlvblBhcmFtcykpXG4gICAgICB9O1xuICAgIH0pLFxuICAgIGhhbmRsZVJlc3BvbnNlOiBjYXN0UmVzcG9uc2UoKVxuICB9KTtcbn0oKTtcblxudmFyIGluZGV4JDIgPSB7XG4gIF9fcHJvdG9fXzogbnVsbCxcbiAgZ2V0UGhvdG9zOiBnZXRQaG90b3MkMSxcbiAgZ2V0Q29sbGVjdGlvbnM6IGdldENvbGxlY3Rpb25zJDEsXG4gIGdldFVzZXJzOiBnZXRVc2Vyc1xufTtcblxudmFyIFVTRVJTX1BBVEhfUFJFRklYID0gJy91c2Vycyc7XG52YXIgZ2V0JDIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgZ2V0UGF0aG5hbWUgPSBmdW5jdGlvbiBnZXRQYXRobmFtZShfcmVmKSB7XG4gICAgdmFyIHVzZXJuYW1lID0gX3JlZi51c2VybmFtZTtcbiAgICByZXR1cm4gVVNFUlNfUEFUSF9QUkVGSVggKyBcIi9cIiArIHVzZXJuYW1lO1xuICB9O1xuXG4gIHJldHVybiBtYWtlRW5kcG9pbnQoe1xuICAgIGdldFBhdGhuYW1lOiBnZXRQYXRobmFtZSxcbiAgICBoYW5kbGVSZXF1ZXN0OiBjcmVhdGVSZXF1ZXN0SGFuZGxlcihmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IF9yZWYyLnVzZXJuYW1lO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aG5hbWU6IGdldFBhdGhuYW1lKHtcbiAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWVcbiAgICAgICAgfSksXG4gICAgICAgIHF1ZXJ5OiB7fVxuICAgICAgfTtcbiAgICB9KSxcbiAgICBoYW5kbGVSZXNwb25zZTogY2FzdFJlc3BvbnNlKClcbiAgfSk7XG59KCk7XG52YXIgZ2V0UGhvdG9zJDIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgZ2V0UGF0aG5hbWUgPSBmdW5jdGlvbiBnZXRQYXRobmFtZShfcmVmMykge1xuICAgIHZhciB1c2VybmFtZSA9IF9yZWYzLnVzZXJuYW1lO1xuICAgIHJldHVybiBVU0VSU19QQVRIX1BSRUZJWCArIFwiL1wiICsgdXNlcm5hbWUgKyBcIi9waG90b3NcIjtcbiAgfTtcblxuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICBnZXRQYXRobmFtZTogZ2V0UGF0aG5hbWUsXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKF9yZWY0KSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBfcmVmNC51c2VybmFtZSxcbiAgICAgICAgICBzdGF0cyA9IF9yZWY0LnN0YXRzLFxuICAgICAgICAgIG9yaWVudGF0aW9uID0gX3JlZjQub3JpZW50YXRpb24sXG4gICAgICAgICAgcGFnaW5hdGlvblBhcmFtcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWY0LCBbXCJ1c2VybmFtZVwiLCBcInN0YXRzXCIsIFwib3JpZW50YXRpb25cIl0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRobmFtZTogZ2V0UGF0aG5hbWUoe1xuICAgICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZVxuICAgICAgICB9KSxcbiAgICAgICAgcXVlcnk6IGNvbXBhY3REZWZpbmVkKF9leHRlbmRzKHt9LCBnZXRGZWVkUGFyYW1zKHBhZ2luYXRpb25QYXJhbXMpLCB7XG4gICAgICAgICAgb3JpZW50YXRpb246IG9yaWVudGF0aW9uLFxuICAgICAgICAgIHN0YXRzOiBzdGF0c1xuICAgICAgICB9KSlcbiAgICAgIH07XG4gICAgfSksXG4gICAgaGFuZGxlUmVzcG9uc2U6IGhhbmRsZUZlZWRSZXNwb25zZSgpXG4gIH0pO1xufSgpO1xudmFyIGdldExpa2VzID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIGdldFBhdGhuYW1lID0gZnVuY3Rpb24gZ2V0UGF0aG5hbWUoX3JlZjUpIHtcbiAgICB2YXIgdXNlcm5hbWUgPSBfcmVmNS51c2VybmFtZTtcbiAgICByZXR1cm4gVVNFUlNfUEFUSF9QUkVGSVggKyBcIi9cIiArIHVzZXJuYW1lICsgXCIvbGlrZXNcIjtcbiAgfTtcblxuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICBnZXRQYXRobmFtZTogZ2V0UGF0aG5hbWUsXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKF9yZWY2KSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBfcmVmNi51c2VybmFtZSxcbiAgICAgICAgICBvcmllbnRhdGlvbiA9IF9yZWY2Lm9yaWVudGF0aW9uLFxuICAgICAgICAgIHBhZ2luYXRpb25QYXJhbXMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmNiwgW1widXNlcm5hbWVcIiwgXCJvcmllbnRhdGlvblwiXSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhuYW1lOiBnZXRQYXRobmFtZSh7XG4gICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lXG4gICAgICAgIH0pLFxuICAgICAgICBxdWVyeTogY29tcGFjdERlZmluZWQoX2V4dGVuZHMoe30sIGdldEZlZWRQYXJhbXMocGFnaW5hdGlvblBhcmFtcyksIHtcbiAgICAgICAgICBvcmllbnRhdGlvbjogb3JpZW50YXRpb25cbiAgICAgICAgfSkpXG4gICAgICB9O1xuICAgIH0pLFxuICAgIGhhbmRsZVJlc3BvbnNlOiBoYW5kbGVGZWVkUmVzcG9uc2UoKVxuICB9KTtcbn0oKTtcbnZhciBnZXRDb2xsZWN0aW9ucyQyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIGdldFBhdGhuYW1lID0gZnVuY3Rpb24gZ2V0UGF0aG5hbWUoX3JlZjcpIHtcbiAgICB2YXIgdXNlcm5hbWUgPSBfcmVmNy51c2VybmFtZTtcbiAgICByZXR1cm4gVVNFUlNfUEFUSF9QUkVGSVggKyBcIi9cIiArIHVzZXJuYW1lICsgXCIvY29sbGVjdGlvbnNcIjtcbiAgfTtcblxuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICBnZXRQYXRobmFtZTogZ2V0UGF0aG5hbWUsXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKF9yZWY4KSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBfcmVmOC51c2VybmFtZSxcbiAgICAgICAgICBwYWdpbmF0aW9uUGFyYW1zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZjgsIFtcInVzZXJuYW1lXCJdKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aG5hbWU6IGdldFBhdGhuYW1lKHtcbiAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWVcbiAgICAgICAgfSksXG4gICAgICAgIHF1ZXJ5OiBnZXRGZWVkUGFyYW1zKHBhZ2luYXRpb25QYXJhbXMpXG4gICAgICB9O1xuICAgIH0pLFxuICAgIGhhbmRsZVJlc3BvbnNlOiBoYW5kbGVGZWVkUmVzcG9uc2UoKVxuICB9KTtcbn0oKTtcblxudmFyIGluZGV4JDMgPSB7XG4gIF9fcHJvdG9fXzogbnVsbCxcbiAgZ2V0OiBnZXQkMixcbiAgZ2V0UGhvdG9zOiBnZXRQaG90b3MkMixcbiAgZ2V0TGlrZXM6IGdldExpa2VzLFxuICBnZXRDb2xsZWN0aW9uczogZ2V0Q29sbGVjdGlvbnMkMlxufTtcblxudmFyIEJBU0VfVE9QSUNfUEFUSCA9ICcvdG9waWNzJztcblxudmFyIGdldFRvcGljUGF0aCA9IGZ1bmN0aW9uIGdldFRvcGljUGF0aChfcmVmKSB7XG4gIHZhciB0b3BpY0lkT3JTbHVnID0gX3JlZi50b3BpY0lkT3JTbHVnO1xuICByZXR1cm4gQkFTRV9UT1BJQ19QQVRIICsgXCIvXCIgKyB0b3BpY0lkT3JTbHVnO1xufTtcblxudmFyIGxpc3QkMiA9IC8qI19fUFVSRV9fKi9tYWtlRW5kcG9pbnQoe1xuICBnZXRQYXRobmFtZTogZ2V0VG9waWNQYXRoLFxuICBoYW5kbGVSZXF1ZXN0OiBmdW5jdGlvbiBoYW5kbGVSZXF1ZXN0KF9yZWYyKSB7XG4gICAgdmFyIHBhZ2UgPSBfcmVmMi5wYWdlLFxuICAgICAgICBwZXJQYWdlID0gX3JlZjIucGVyUGFnZSxcbiAgICAgICAgb3JkZXJCeSA9IF9yZWYyLm9yZGVyQnksXG4gICAgICAgIHRvcGljSWRzT3JTbHVncyA9IF9yZWYyLnRvcGljSWRzT3JTbHVncztcbiAgICByZXR1cm4ge1xuICAgICAgcGF0aG5hbWU6IEJBU0VfVE9QSUNfUEFUSCxcbiAgICAgIHF1ZXJ5OiBjb21wYWN0RGVmaW5lZChfZXh0ZW5kcyh7fSwgZ2V0RmVlZFBhcmFtcyh7XG4gICAgICAgIHBhZ2U6IHBhZ2UsXG4gICAgICAgIHBlclBhZ2U6IHBlclBhZ2VcbiAgICAgIH0pLCB7XG4gICAgICAgIGlkczogdG9waWNJZHNPclNsdWdzID09IG51bGwgPyB2b2lkIDAgOiB0b3BpY0lkc09yU2x1Z3Muam9pbignLCcpLFxuICAgICAgICBvcmRlcl9ieTogb3JkZXJCeVxuICAgICAgfSkpXG4gICAgfTtcbiAgfSxcbiAgaGFuZGxlUmVzcG9uc2U6IC8qI19fUFVSRV9fKi9oYW5kbGVGZWVkUmVzcG9uc2UoKVxufSk7XG52YXIgZ2V0JDMgPSAvKiNfX1BVUkVfXyovbWFrZUVuZHBvaW50KHtcbiAgZ2V0UGF0aG5hbWU6IGdldFRvcGljUGF0aCxcbiAgaGFuZGxlUmVxdWVzdDogZnVuY3Rpb24gaGFuZGxlUmVxdWVzdChfcmVmMykge1xuICAgIHZhciB0b3BpY0lkT3JTbHVnID0gX3JlZjMudG9waWNJZE9yU2x1ZztcbiAgICByZXR1cm4ge1xuICAgICAgcGF0aG5hbWU6IGdldFRvcGljUGF0aCh7XG4gICAgICAgIHRvcGljSWRPclNsdWc6IHRvcGljSWRPclNsdWdcbiAgICAgIH0pLFxuICAgICAgcXVlcnk6IHt9XG4gICAgfTtcbiAgfSxcbiAgaGFuZGxlUmVzcG9uc2U6IC8qI19fUFVSRV9fKi9jYXN0UmVzcG9uc2UoKVxufSk7XG52YXIgZ2V0UGhvdG9zJDMgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgZ2V0UGF0aG5hbWUgPSAvKiNfX1BVUkVfXyovZmxvdyhnZXRUb3BpY1BhdGgsIGZ1bmN0aW9uICh0b3BpY1BhdGgpIHtcbiAgICByZXR1cm4gdG9waWNQYXRoICsgXCIvcGhvdG9zXCI7XG4gIH0pO1xuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICBnZXRQYXRobmFtZTogZ2V0UGF0aG5hbWUsXG4gICAgaGFuZGxlUmVxdWVzdDogZnVuY3Rpb24gaGFuZGxlUmVxdWVzdChfcmVmNCkge1xuICAgICAgdmFyIHRvcGljSWRPclNsdWcgPSBfcmVmNC50b3BpY0lkT3JTbHVnLFxuICAgICAgICAgIG9yaWVudGF0aW9uID0gX3JlZjQub3JpZW50YXRpb24sXG4gICAgICAgICAgZmVlZFBhcmFtcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWY0LCBbXCJ0b3BpY0lkT3JTbHVnXCIsIFwib3JpZW50YXRpb25cIl0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRobmFtZTogZ2V0UGF0aG5hbWUoe1xuICAgICAgICAgIHRvcGljSWRPclNsdWc6IHRvcGljSWRPclNsdWdcbiAgICAgICAgfSksXG4gICAgICAgIHF1ZXJ5OiBjb21wYWN0RGVmaW5lZChfZXh0ZW5kcyh7fSwgZ2V0RmVlZFBhcmFtcyhmZWVkUGFyYW1zKSwge1xuICAgICAgICAgIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvblxuICAgICAgICB9KSlcbiAgICAgIH07XG4gICAgfSxcbiAgICBoYW5kbGVSZXNwb25zZTogaGFuZGxlRmVlZFJlc3BvbnNlKClcbiAgfSk7XG59KCk7XG5cbnZhciBpbmRleCQ0ID0ge1xuICBfX3Byb3RvX186IG51bGwsXG4gIGxpc3Q6IGxpc3QkMixcbiAgZ2V0OiBnZXQkMyxcbiAgZ2V0UGhvdG9zOiBnZXRQaG90b3MkM1xufTtcblxudmFyIHRyYWNrTm9uSG90TGlua2VkUGhvdG9WaWV3ID0gZnVuY3Rpb24gdHJhY2tOb25Ib3RMaW5rZWRQaG90b1ZpZXcoX3JlZikge1xuICB2YXIgYXBwSWQgPSBfcmVmLmFwcElkO1xuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgdmFyIHBob3RvSWQgPSBfcmVmMi5waG90b0lkO1xuICAgIHZhciBpZHMgPSAhQXJyYXkuaXNBcnJheShwaG90b0lkKSA/IFtwaG90b0lkXSA6IHBob3RvSWQ7XG5cbiAgICBpZiAoaWRzLmxlbmd0aCA+IDIwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW5ub3QgdHJhY2sgbW9yZSB0aGFuIDIwIHBob3RvcyBhdCBvbmNlLiBQbGVhc2UgdHJ5IGFnYWluIHdpdGggZmV3ZXIgcGhvdG9zLicpO1xuICAgIH1cblxuICAgIHJldHVybiBmZXRjaChcInZpZXdzLnVuc3BsYXNoLmNvbS92P3Bob3RvX2lkPVwiICsgaWRzLmpvaW4oKSArIFwiJmFwcF9pZD1cIiArIGFwcElkKTtcbiAgfTtcbn07XG5cblxuXG52YXIgaW50ZXJuYWxzID0ge1xuICBfX3Byb3RvX186IG51bGwsXG4gIGNvbGxlY3Rpb25zOiBpbmRleCxcbiAgcGhvdG9zOiBpbmRleCQxLFxuICBzZWFyY2g6IGluZGV4JDIsXG4gIHVzZXJzOiBpbmRleCQzLFxuICB0b3BpY3M6IGluZGV4JDQsXG4gIHRyYWNrTm9uSG90TGlua2VkUGhvdG9WaWV3OiB0cmFja05vbkhvdExpbmtlZFBob3RvVmlld1xufTtcblxudmFyIExhbmd1YWdlO1xuXG4oZnVuY3Rpb24gKExhbmd1YWdlKSB7XG4gIExhbmd1YWdlW1wiQWZyaWthYW5zXCJdID0gXCJhZlwiO1xuICBMYW5ndWFnZVtcIkFtaGFyaWNcIl0gPSBcImFtXCI7XG4gIExhbmd1YWdlW1wiQXJhYmljXCJdID0gXCJhclwiO1xuICBMYW5ndWFnZVtcIkF6ZXJiYWlqYW5pXCJdID0gXCJhelwiO1xuICBMYW5ndWFnZVtcIkJlbGFydXNpYW5cIl0gPSBcImJlXCI7XG4gIExhbmd1YWdlW1wiQnVsZ2FyaWFuXCJdID0gXCJiZ1wiO1xuICBMYW5ndWFnZVtcIkJlbmdhbGlcIl0gPSBcImJuXCI7XG4gIExhbmd1YWdlW1wiQm9zbmlhblwiXSA9IFwiYnNcIjtcbiAgTGFuZ3VhZ2VbXCJDYXRhbGFuXCJdID0gXCJjYVwiO1xuICBMYW5ndWFnZVtcIkNlYnVhbm9cIl0gPSBcImNlYlwiO1xuICBMYW5ndWFnZVtcIkNvcnNpY2FuXCJdID0gXCJjb1wiO1xuICBMYW5ndWFnZVtcIkN6ZWNoXCJdID0gXCJjc1wiO1xuICBMYW5ndWFnZVtcIldlbHNoXCJdID0gXCJjeVwiO1xuICBMYW5ndWFnZVtcIkRhbmlzaFwiXSA9IFwiZGFcIjtcbiAgTGFuZ3VhZ2VbXCJHZXJtYW5cIl0gPSBcImRlXCI7XG4gIExhbmd1YWdlW1wiR3JlZWtcIl0gPSBcImVsXCI7XG4gIExhbmd1YWdlW1wiRW5nbGlzaFwiXSA9IFwiZW5cIjtcbiAgTGFuZ3VhZ2VbXCJFc3BlcmFudG9cIl0gPSBcImVvXCI7XG4gIExhbmd1YWdlW1wiU3BhbmlzaFwiXSA9IFwiZXNcIjtcbiAgTGFuZ3VhZ2VbXCJFc3RvbmlhblwiXSA9IFwiZXRcIjtcbiAgTGFuZ3VhZ2VbXCJCYXNxdWVcIl0gPSBcImV1XCI7XG4gIExhbmd1YWdlW1wiUGVyc2lhblwiXSA9IFwiZmFcIjtcbiAgTGFuZ3VhZ2VbXCJGaW5uaXNoXCJdID0gXCJmaVwiO1xuICBMYW5ndWFnZVtcIkZyZW5jaFwiXSA9IFwiZnJcIjtcbiAgTGFuZ3VhZ2VbXCJGcmlzaWFuXCJdID0gXCJmeVwiO1xuICBMYW5ndWFnZVtcIklyaXNoXCJdID0gXCJnYVwiO1xuICBMYW5ndWFnZVtcIlNjb3RzR2FlbGljXCJdID0gXCJnZFwiO1xuICBMYW5ndWFnZVtcIkdhbGljaWFuXCJdID0gXCJnbFwiO1xuICBMYW5ndWFnZVtcIkd1amFyYXRpXCJdID0gXCJndVwiO1xuICBMYW5ndWFnZVtcIkhhdXNhXCJdID0gXCJoYVwiO1xuICBMYW5ndWFnZVtcIkhhd2FpaWFuXCJdID0gXCJoYXdcIjtcbiAgTGFuZ3VhZ2VbXCJIaW5kaVwiXSA9IFwiaGlcIjtcbiAgTGFuZ3VhZ2VbXCJIbW9uZ1wiXSA9IFwiaG1uXCI7XG4gIExhbmd1YWdlW1wiQ3JvYXRpYW5cIl0gPSBcImhyXCI7XG4gIExhbmd1YWdlW1wiSGFpdGlhbkNyZW9sZVwiXSA9IFwiaHRcIjtcbiAgTGFuZ3VhZ2VbXCJIdW5nYXJpYW5cIl0gPSBcImh1XCI7XG4gIExhbmd1YWdlW1wiQXJtZW5pYW5cIl0gPSBcImh5XCI7XG4gIExhbmd1YWdlW1wiSW5kb25lc2lhblwiXSA9IFwiaWRcIjtcbiAgTGFuZ3VhZ2VbXCJJZ2JvXCJdID0gXCJpZ1wiO1xuICBMYW5ndWFnZVtcIkljZWxhbmRpY1wiXSA9IFwiaXNcIjtcbiAgTGFuZ3VhZ2VbXCJJdGFsaWFuXCJdID0gXCJpdFwiO1xuICBMYW5ndWFnZVtcIkhlYnJld1wiXSA9IFwiaXdcIjtcbiAgTGFuZ3VhZ2VbXCJKYXBhbmVzZVwiXSA9IFwiamFcIjtcbiAgTGFuZ3VhZ2VbXCJKYXZhbmVzZVwiXSA9IFwiandcIjtcbiAgTGFuZ3VhZ2VbXCJHZW9yZ2lhblwiXSA9IFwia2FcIjtcbiAgTGFuZ3VhZ2VbXCJLYXpha2hcIl0gPSBcImtrXCI7XG4gIExhbmd1YWdlW1wiS2htZXJcIl0gPSBcImttXCI7XG4gIExhbmd1YWdlW1wiS2FubmFkYVwiXSA9IFwia25cIjtcbiAgTGFuZ3VhZ2VbXCJLb3JlYW5cIl0gPSBcImtvXCI7XG4gIExhbmd1YWdlW1wiS3VyZGlzaFwiXSA9IFwia3VcIjtcbiAgTGFuZ3VhZ2VbXCJLeXJneXpcIl0gPSBcImt5XCI7XG4gIExhbmd1YWdlW1wiTGF0aW5cIl0gPSBcImxhXCI7XG4gIExhbmd1YWdlW1wiTHV4ZW1ib3VyZ2lzaFwiXSA9IFwibGJcIjtcbiAgTGFuZ3VhZ2VbXCJMYW9cIl0gPSBcImxvXCI7XG4gIExhbmd1YWdlW1wiTGl0aHVhbmlhblwiXSA9IFwibHRcIjtcbiAgTGFuZ3VhZ2VbXCJMYXR2aWFuXCJdID0gXCJsdlwiO1xuICBMYW5ndWFnZVtcIk1hbGFnYXN5XCJdID0gXCJtZ1wiO1xuICBMYW5ndWFnZVtcIk1hb3JpXCJdID0gXCJtaVwiO1xuICBMYW5ndWFnZVtcIk1hY2Vkb25pYW5cIl0gPSBcIm1rXCI7XG4gIExhbmd1YWdlW1wiTWFsYXlhbGFtXCJdID0gXCJtbFwiO1xuICBMYW5ndWFnZVtcIk1vbmdvbGlhblwiXSA9IFwibW5cIjtcbiAgTGFuZ3VhZ2VbXCJNYXJhdGhpXCJdID0gXCJtclwiO1xuICBMYW5ndWFnZVtcIk1hbGF5XCJdID0gXCJtc1wiO1xuICBMYW5ndWFnZVtcIk1hbHRlc2VcIl0gPSBcIm10XCI7XG4gIExhbmd1YWdlW1wiTXlhbm1hclwiXSA9IFwibXlcIjtcbiAgTGFuZ3VhZ2VbXCJOZXBhbGlcIl0gPSBcIm5lXCI7XG4gIExhbmd1YWdlW1wiRHV0Y2hcIl0gPSBcIm5sXCI7XG4gIExhbmd1YWdlW1wiTm9yd2VnaWFuXCJdID0gXCJub1wiO1xuICBMYW5ndWFnZVtcIk55YW5qYVwiXSA9IFwibnlcIjtcbiAgTGFuZ3VhZ2VbXCJPcml5YVwiXSA9IFwib3JcIjtcbiAgTGFuZ3VhZ2VbXCJQdW5qYWJpXCJdID0gXCJwYVwiO1xuICBMYW5ndWFnZVtcIlBvbGlzaFwiXSA9IFwicGxcIjtcbiAgTGFuZ3VhZ2VbXCJQYXNodG9cIl0gPSBcInBzXCI7XG4gIExhbmd1YWdlW1wiUG9ydHVndWVzZVwiXSA9IFwicHRcIjtcbiAgTGFuZ3VhZ2VbXCJSb21hbmlhblwiXSA9IFwicm9cIjtcbiAgTGFuZ3VhZ2VbXCJSdXNzaWFuXCJdID0gXCJydVwiO1xuICBMYW5ndWFnZVtcIktpbnlhcndhbmRhXCJdID0gXCJyd1wiO1xuICBMYW5ndWFnZVtcIlNpbmRoaVwiXSA9IFwic2RcIjtcbiAgTGFuZ3VhZ2VbXCJTaW5oYWxhXCJdID0gXCJzaVwiO1xuICBMYW5ndWFnZVtcIlNsb3Zha1wiXSA9IFwic2tcIjtcbiAgTGFuZ3VhZ2VbXCJTbG92ZW5pYW5cIl0gPSBcInNsXCI7XG4gIExhbmd1YWdlW1wiU2Ftb2FuXCJdID0gXCJzbVwiO1xuICBMYW5ndWFnZVtcIlNob25hXCJdID0gXCJzblwiO1xuICBMYW5ndWFnZVtcIlNvbWFsaVwiXSA9IFwic29cIjtcbiAgTGFuZ3VhZ2VbXCJBbGJhbmlhblwiXSA9IFwic3FcIjtcbiAgTGFuZ3VhZ2VbXCJTZXJiaWFuXCJdID0gXCJzclwiO1xuICBMYW5ndWFnZVtcIlNlc290aG9cIl0gPSBcInN0XCI7XG4gIExhbmd1YWdlW1wiU3VuZGFuZXNlXCJdID0gXCJzdVwiO1xuICBMYW5ndWFnZVtcIlN3ZWRpc2hcIl0gPSBcInN2XCI7XG4gIExhbmd1YWdlW1wiU3dhaGlsaVwiXSA9IFwic3dcIjtcbiAgTGFuZ3VhZ2VbXCJUYW1pbFwiXSA9IFwidGFcIjtcbiAgTGFuZ3VhZ2VbXCJUZWx1Z3VcIl0gPSBcInRlXCI7XG4gIExhbmd1YWdlW1wiVGFqaWtcIl0gPSBcInRnXCI7XG4gIExhbmd1YWdlW1wiVGhhaVwiXSA9IFwidGhcIjtcbiAgTGFuZ3VhZ2VbXCJUdXJrbWVuXCJdID0gXCJ0a1wiO1xuICBMYW5ndWFnZVtcIkZpbGlwaW5vXCJdID0gXCJ0bFwiO1xuICBMYW5ndWFnZVtcIlR1cmtpc2hcIl0gPSBcInRyXCI7XG4gIExhbmd1YWdlW1wiVGF0YXJcIl0gPSBcInR0XCI7XG4gIExhbmd1YWdlW1wiVWlnaHVyXCJdID0gXCJ1Z1wiO1xuICBMYW5ndWFnZVtcIlVrcmFpbmlhblwiXSA9IFwidWtcIjtcbiAgTGFuZ3VhZ2VbXCJVcmR1XCJdID0gXCJ1clwiO1xuICBMYW5ndWFnZVtcIlV6YmVrXCJdID0gXCJ1elwiO1xuICBMYW5ndWFnZVtcIlZpZXRuYW1lc2VcIl0gPSBcInZpXCI7XG4gIExhbmd1YWdlW1wiWGhvc2FcIl0gPSBcInhoXCI7XG4gIExhbmd1YWdlW1wiWWlkZGlzaFwiXSA9IFwieWlcIjtcbiAgTGFuZ3VhZ2VbXCJZb3J1YmFcIl0gPSBcInlvXCI7XG4gIExhbmd1YWdlW1wiQ2hpbmVzZVNpbXBsaWZpZWRcIl0gPSBcInpoXCI7XG4gIExhbmd1YWdlW1wiQ2hpbmVzZVRyYWRpdGlvbmFsXCJdID0gXCJ6aC1UV1wiO1xuICBMYW5ndWFnZVtcIlp1bHVcIl0gPSBcInp1XCI7XG59KShMYW5ndWFnZSB8fCAoTGFuZ3VhZ2UgPSB7fSkpO1xuXG52YXIgT3JkZXJCeTtcblxuKGZ1bmN0aW9uIChPcmRlckJ5KSB7XG4gIE9yZGVyQnlbXCJMQVRFU1RcIl0gPSBcImxhdGVzdFwiO1xuICBPcmRlckJ5W1wiUE9QVUxBUlwiXSA9IFwicG9wdWxhclwiO1xuICBPcmRlckJ5W1wiVklFV1NcIl0gPSBcInZpZXdzXCI7XG4gIE9yZGVyQnlbXCJET1dOTE9BRFNcIl0gPSBcImRvd25sb2Fkc1wiO1xuICBPcmRlckJ5W1wiT0xERVNUXCJdID0gXCJvbGRlc3RcIjtcbn0pKE9yZGVyQnkgfHwgKE9yZGVyQnkgPSB7fSkpO1xuXG52YXIgY3JlYXRlQXBpID0gLyojX19QVVJFX18qL2Zsb3coaW5pdE1ha2VSZXF1ZXN0LCBmdW5jdGlvbiAobWFrZVJlcXVlc3QpIHtcbiAgcmV0dXJuIHtcbiAgICBwaG90b3M6IHtcbiAgICAgIGdldDogbWFrZVJlcXVlc3QoZ2V0JDEpLFxuICAgICAgbGlzdDogbWFrZVJlcXVlc3QobGlzdCQxKSxcbiAgICAgIGdldFN0YXRzOiBtYWtlUmVxdWVzdChnZXRTdGF0cyksXG4gICAgICBnZXRSYW5kb206IG1ha2VSZXF1ZXN0KGdldFJhbmRvbSksXG4gICAgICB0cmFja0Rvd25sb2FkOiBtYWtlUmVxdWVzdCh0cmFja0Rvd25sb2FkKVxuICAgIH0sXG4gICAgdXNlcnM6IHtcbiAgICAgIGdldFBob3RvczogbWFrZVJlcXVlc3QoZ2V0UGhvdG9zJDIpLFxuICAgICAgZ2V0Q29sbGVjdGlvbnM6IG1ha2VSZXF1ZXN0KGdldENvbGxlY3Rpb25zJDIpLFxuICAgICAgZ2V0TGlrZXM6IG1ha2VSZXF1ZXN0KGdldExpa2VzKSxcbiAgICAgIGdldDogbWFrZVJlcXVlc3QoZ2V0JDIpXG4gICAgfSxcbiAgICBzZWFyY2g6IHtcbiAgICAgIGdldENvbGxlY3Rpb25zOiBtYWtlUmVxdWVzdChnZXRDb2xsZWN0aW9ucyQxKSxcbiAgICAgIGdldFBob3RvczogbWFrZVJlcXVlc3QoZ2V0UGhvdG9zJDEpLFxuICAgICAgZ2V0VXNlcnM6IG1ha2VSZXF1ZXN0KGdldFVzZXJzKVxuICAgIH0sXG4gICAgY29sbGVjdGlvbnM6IHtcbiAgICAgIGdldFBob3RvczogbWFrZVJlcXVlc3QoZ2V0UGhvdG9zKSxcbiAgICAgIGdldDogbWFrZVJlcXVlc3QoZ2V0KSxcbiAgICAgIGxpc3Q6IG1ha2VSZXF1ZXN0KGxpc3QpLFxuICAgICAgZ2V0UmVsYXRlZDogbWFrZVJlcXVlc3QoZ2V0UmVsYXRlZClcbiAgICB9LFxuICAgIHRvcGljczoge1xuICAgICAgbGlzdDogbWFrZVJlcXVlc3QobGlzdCQyKSxcbiAgICAgIGdldDogbWFrZVJlcXVlc3QoZ2V0JDMpLFxuICAgICAgZ2V0UGhvdG9zOiBtYWtlUmVxdWVzdChnZXRQaG90b3MkMylcbiAgICB9XG4gIH07XG59KTtcblxuZXhwb3J0IHsgTGFuZ3VhZ2UsIE9yZGVyQnksIGludGVybmFscyBhcyBfaW50ZXJuYWxzLCBjcmVhdGVBcGkgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVuc3BsYXNoLWpzLmVzbS5qcy5tYXBcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiLCBbXCJtb2R1bGVcIl0sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgZmFjdG9yeShtb2R1bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciBtb2QgPSB7XG4gICAgICBleHBvcnRzOiB7fVxuICAgIH07XG4gICAgZmFjdG9yeShtb2QpO1xuICAgIGdsb2JhbC5icm93c2VyID0gbW9kLmV4cG9ydHM7XG4gIH1cbn0pKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsVGhpcyA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgLyogd2ViZXh0ZW5zaW9uLXBvbHlmaWxsIC0gdjAuMTAuMCAtIEZyaSBBdWcgMTIgMjAyMiAxOTo0Mjo0NCAqL1xuXG4gIC8qIC0qLSBNb2RlOiBpbmRlbnQtdGFicy1tb2RlOiBuaWw7IGpzLWluZGVudC1sZXZlbDogMiAtKi0gKi9cblxuICAvKiB2aW06IHNldCBzdHM9MiBzdz0yIGV0IHR3PTgwOiAqL1xuXG4gIC8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICAgKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBpZiAoIWdsb2JhbFRoaXMuY2hyb21lPy5ydW50aW1lPy5pZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgc2NyaXB0IHNob3VsZCBvbmx5IGJlIGxvYWRlZCBpbiBhIGJyb3dzZXIgZXh0ZW5zaW9uLlwiKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcy5icm93c2VyID09PSBcInVuZGVmaW5lZFwiIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWxUaGlzLmJyb3dzZXIpICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgY29uc3QgQ0hST01FX1NFTkRfTUVTU0FHRV9DQUxMQkFDS19OT19SRVNQT05TRV9NRVNTQUdFID0gXCJUaGUgbWVzc2FnZSBwb3J0IGNsb3NlZCBiZWZvcmUgYSByZXNwb25zZSB3YXMgcmVjZWl2ZWQuXCI7IC8vIFdyYXBwaW5nIHRoZSBidWxrIG9mIHRoaXMgcG9seWZpbGwgaW4gYSBvbmUtdGltZS11c2UgZnVuY3Rpb24gaXMgYSBtaW5vclxuICAgIC8vIG9wdGltaXphdGlvbiBmb3IgRmlyZWZveC4gU2luY2UgU3BpZGVybW9ua2V5IGRvZXMgbm90IGZ1bGx5IHBhcnNlIHRoZVxuICAgIC8vIGNvbnRlbnRzIG9mIGEgZnVuY3Rpb24gdW50aWwgdGhlIGZpcnN0IHRpbWUgaXQncyBjYWxsZWQsIGFuZCBzaW5jZSBpdCB3aWxsXG4gICAgLy8gbmV2ZXIgYWN0dWFsbHkgbmVlZCB0byBiZSBjYWxsZWQsIHRoaXMgYWxsb3dzIHRoZSBwb2x5ZmlsbCB0byBiZSBpbmNsdWRlZFxuICAgIC8vIGluIEZpcmVmb3ggbmVhcmx5IGZvciBmcmVlLlxuXG4gICAgY29uc3Qgd3JhcEFQSXMgPSBleHRlbnNpb25BUElzID0+IHtcbiAgICAgIC8vIE5PVEU6IGFwaU1ldGFkYXRhIGlzIGFzc29jaWF0ZWQgdG8gdGhlIGNvbnRlbnQgb2YgdGhlIGFwaS1tZXRhZGF0YS5qc29uIGZpbGVcbiAgICAgIC8vIGF0IGJ1aWxkIHRpbWUgYnkgcmVwbGFjaW5nIHRoZSBmb2xsb3dpbmcgXCJpbmNsdWRlXCIgd2l0aCB0aGUgY29udGVudCBvZiB0aGVcbiAgICAgIC8vIEpTT04gZmlsZS5cbiAgICAgIGNvbnN0IGFwaU1ldGFkYXRhID0ge1xuICAgICAgICBcImFsYXJtc1wiOiB7XG4gICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsZWFyQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYm9va21hcmtzXCI6IHtcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldENoaWxkcmVuXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UmVjZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0U3ViVHJlZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlVHJlZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJyb3dzZXJBY3Rpb25cIjoge1xuICAgICAgICAgIFwiZGlzYWJsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImVuYWJsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJhZGdlQmFja2dyb3VuZENvbG9yXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QmFkZ2VUZXh0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5Qb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEJhZGdlQmFja2dyb3VuZENvbG9yXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0QmFkZ2VUZXh0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJicm93c2luZ0RhdGFcIjoge1xuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ2FjaGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDb29raWVzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRG93bmxvYWRzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRm9ybURhdGFcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVIaXN0b3J5XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlTG9jYWxTdG9yYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlUGFzc3dvcmRzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlUGx1Z2luRGF0YVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldHRpbmdzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY29tbWFuZHNcIjoge1xuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY29udGV4dE1lbnVzXCI6IHtcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvb2tpZXNcIjoge1xuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsQ29va2llU3RvcmVzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiZGV2dG9vbHNcIjoge1xuICAgICAgICAgIFwiaW5zcGVjdGVkV2luZG93XCI6IHtcbiAgICAgICAgICAgIFwiZXZhbFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMixcbiAgICAgICAgICAgICAgXCJzaW5nbGVDYWxsYmFja0FyZ1wiOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJwYW5lbHNcIjoge1xuICAgICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMyxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDMsXG4gICAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZWxlbWVudHNcIjoge1xuICAgICAgICAgICAgICBcImNyZWF0ZVNpZGViYXJQYW5lXCI6IHtcbiAgICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImRvd25sb2Fkc1wiOiB7XG4gICAgICAgICAgXCJjYW5jZWxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkb3dubG9hZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImVyYXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0RmlsZUljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicGF1c2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVGaWxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVzdW1lXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2hvd1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImV4dGVuc2lvblwiOiB7XG4gICAgICAgICAgXCJpc0FsbG93ZWRGaWxlU2NoZW1lQWNjZXNzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaXNBbGxvd2VkSW5jb2duaXRvQWNjZXNzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaGlzdG9yeVwiOiB7XG4gICAgICAgICAgXCJhZGRVcmxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVSYW5nZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRlbGV0ZVVybFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFZpc2l0c1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImkxOG5cIjoge1xuICAgICAgICAgIFwiZGV0ZWN0TGFuZ3VhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBY2NlcHRMYW5ndWFnZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpZGVudGl0eVwiOiB7XG4gICAgICAgICAgXCJsYXVuY2hXZWJBdXRoRmxvd1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImlkbGVcIjoge1xuICAgICAgICAgIFwicXVlcnlTdGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm1hbmFnZW1lbnRcIjoge1xuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0U2VsZlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEVuYWJsZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1bmluc3RhbGxTZWxmXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibm90aWZpY2F0aW9uc1wiOiB7XG4gICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBlcm1pc3Npb25MZXZlbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInBhZ2VBY3Rpb25cIjoge1xuICAgICAgICAgIFwiZ2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImhpZGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwZXJtaXNzaW9uc1wiOiB7XG4gICAgICAgICAgXCJjb250YWluc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcXVlc3RcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJydW50aW1lXCI6IHtcbiAgICAgICAgICBcImdldEJhY2tncm91bmRQYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UGxhdGZvcm1JbmZvXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3Blbk9wdGlvbnNQYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVxdWVzdFVwZGF0ZUNoZWNrXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogM1xuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTmF0aXZlTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFVuaW5zdGFsbFVSTFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInNlc3Npb25zXCI6IHtcbiAgICAgICAgICBcImdldERldmljZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRSZWNlbnRseUNsb3NlZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlc3RvcmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzdG9yYWdlXCI6IHtcbiAgICAgICAgICBcImxvY2FsXCI6IHtcbiAgICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibWFuYWdlZFwiOiB7XG4gICAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzeW5jXCI6IHtcbiAgICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwidGFic1wiOiB7XG4gICAgICAgICAgXCJjYXB0dXJlVmlzaWJsZVRhYlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGlzY2FyZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImR1cGxpY2F0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImV4ZWN1dGVTY3JpcHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Wm9vbVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFpvb21TZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdvQmFja1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdvRm9yd2FyZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImhpZ2hsaWdodFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImluc2VydENTU1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJxdWVyeVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbG9hZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNTU1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0Wm9vbVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFpvb21TZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInRvcFNpdGVzXCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIndlYk5hdmlnYXRpb25cIjoge1xuICAgICAgICAgIFwiZ2V0QWxsRnJhbWVzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0RnJhbWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3ZWJSZXF1ZXN0XCI6IHtcbiAgICAgICAgICBcImhhbmRsZXJCZWhhdmlvckNoYW5nZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3aW5kb3dzXCI6IHtcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEN1cnJlbnRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRMYXN0Rm9jdXNlZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBpZiAoT2JqZWN0LmtleXMoYXBpTWV0YWRhdGEpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhcGktbWV0YWRhdGEuanNvbiBoYXMgbm90IGJlZW4gaW5jbHVkZWQgaW4gYnJvd3Nlci1wb2x5ZmlsbFwiKTtcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogQSBXZWFrTWFwIHN1YmNsYXNzIHdoaWNoIGNyZWF0ZXMgYW5kIHN0b3JlcyBhIHZhbHVlIGZvciBhbnkga2V5IHdoaWNoIGRvZXNcbiAgICAgICAqIG5vdCBleGlzdCB3aGVuIGFjY2Vzc2VkLCBidXQgYmVoYXZlcyBleGFjdGx5IGFzIGFuIG9yZGluYXJ5IFdlYWtNYXBcbiAgICAgICAqIG90aGVyd2lzZS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjcmVhdGVJdGVtXG4gICAgICAgKiAgICAgICAgQSBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIGNhbGxlZCBpbiBvcmRlciB0byBjcmVhdGUgdGhlIHZhbHVlIGZvciBhbnlcbiAgICAgICAqICAgICAgICBrZXkgd2hpY2ggZG9lcyBub3QgZXhpc3QsIHRoZSBmaXJzdCB0aW1lIGl0IGlzIGFjY2Vzc2VkLiBUaGVcbiAgICAgICAqICAgICAgICBmdW5jdGlvbiByZWNlaXZlcywgYXMgaXRzIG9ubHkgYXJndW1lbnQsIHRoZSBrZXkgYmVpbmcgY3JlYXRlZC5cbiAgICAgICAqL1xuXG5cbiAgICAgIGNsYXNzIERlZmF1bHRXZWFrTWFwIGV4dGVuZHMgV2Vha01hcCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNyZWF0ZUl0ZW0sIGl0ZW1zID0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc3VwZXIoaXRlbXMpO1xuICAgICAgICAgIHRoaXMuY3JlYXRlSXRlbSA9IGNyZWF0ZUl0ZW07XG4gICAgICAgIH1cblxuICAgICAgICBnZXQoa2V5KSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnNldChrZXksIHRoaXMuY3JlYXRlSXRlbShrZXkpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gc3VwZXIuZ2V0KGtleSk7XG4gICAgICAgIH1cblxuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG9iamVjdCBpcyBhbiBvYmplY3Qgd2l0aCBhIGB0aGVuYCBtZXRob2QsIGFuZCBjYW5cbiAgICAgICAqIHRoZXJlZm9yZSBiZSBhc3N1bWVkIHRvIGJlaGF2ZSBhcyBhIFByb21pc2UuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAgICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB0aGVuYWJsZS5cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IGlzVGhlbmFibGUgPSB2YWx1ZSA9PiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09IFwiZnVuY3Rpb25cIjtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBmdW5jdGlvbiB3aGljaCwgd2hlbiBjYWxsZWQsIHdpbGwgcmVzb2x2ZSBvciByZWplY3RcbiAgICAgICAqIHRoZSBnaXZlbiBwcm9taXNlIGJhc2VkIG9uIGhvdyBpdCBpcyBjYWxsZWQ6XG4gICAgICAgKlxuICAgICAgICogLSBJZiwgd2hlbiBjYWxsZWQsIGBjaHJvbWUucnVudGltZS5sYXN0RXJyb3JgIGNvbnRhaW5zIGEgbm9uLW51bGwgb2JqZWN0LFxuICAgICAgICogICB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCB3aXRoIHRoYXQgdmFsdWUuXG4gICAgICAgKiAtIElmIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aCBleGFjdGx5IG9uZSBhcmd1bWVudCwgdGhlIHByb21pc2UgaXNcbiAgICAgICAqICAgcmVzb2x2ZWQgdG8gdGhhdCB2YWx1ZS5cbiAgICAgICAqIC0gT3RoZXJ3aXNlLCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB0byBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGVcbiAgICAgICAqICAgZnVuY3Rpb24ncyBhcmd1bWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHByb21pc2VcbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgcmVzb2x1dGlvbiBhbmQgcmVqZWN0aW9uIGZ1bmN0aW9ucyBvZiBhXG4gICAgICAgKiAgICAgICAgcHJvbWlzZS5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByb21pc2UucmVzb2x2ZVxuICAgICAgICogICAgICAgIFRoZSBwcm9taXNlJ3MgcmVzb2x1dGlvbiBmdW5jdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByb21pc2UucmVqZWN0XG4gICAgICAgKiAgICAgICAgVGhlIHByb21pc2UncyByZWplY3Rpb24gZnVuY3Rpb24uXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gbWV0YWRhdGFcbiAgICAgICAqICAgICAgICBNZXRhZGF0YSBhYm91dCB0aGUgd3JhcHBlZCBtZXRob2Qgd2hpY2ggaGFzIGNyZWF0ZWQgdGhlIGNhbGxiYWNrLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZ1xuICAgICAgICogICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggb25seSB0aGUgZmlyc3RcbiAgICAgICAqICAgICAgICBhcmd1bWVudCBvZiB0aGUgY2FsbGJhY2ssIGFsdGVybmF0aXZlbHkgYW4gYXJyYXkgb2YgYWxsIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGFyZ3VtZW50cyBpcyByZXNvbHZlZC4gQnkgZGVmYXVsdCwgaWYgdGhlIGNhbGxiYWNrXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoIG9ubHkgYSBzaW5nbGUgYXJndW1lbnQsIHRoYXQgd2lsbCBiZVxuICAgICAgICogICAgICAgIHJlc29sdmVkIHRvIHRoZSBwcm9taXNlLCB3aGlsZSBhbGwgYXJndW1lbnRzIHdpbGwgYmUgcmVzb2x2ZWQgYXNcbiAgICAgICAqICAgICAgICBhbiBhcnJheSBpZiBtdWx0aXBsZSBhcmUgZ2l2ZW4uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAgICogICAgICAgIFRoZSBnZW5lcmF0ZWQgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCBtYWtlQ2FsbGJhY2sgPSAocHJvbWlzZSwgbWV0YWRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuICguLi5jYWxsYmFja0FyZ3MpID0+IHtcbiAgICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgICAgcHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAobWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmcgfHwgY2FsbGJhY2tBcmdzLmxlbmd0aCA8PSAxICYmIG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgcHJvbWlzZS5yZXNvbHZlKGNhbGxiYWNrQXJnc1swXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZShjYWxsYmFja0FyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHBsdXJhbGl6ZUFyZ3VtZW50cyA9IG51bUFyZ3MgPT4gbnVtQXJncyA9PSAxID8gXCJhcmd1bWVudFwiIDogXCJhcmd1bWVudHNcIjtcbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhIHdyYXBwZXIgZnVuY3Rpb24gZm9yIGEgbWV0aG9kIHdpdGggdGhlIGdpdmVuIG5hbWUgYW5kIG1ldGFkYXRhLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICAgKiAgICAgICAgVGhlIG5hbWUgb2YgdGhlIG1ldGhvZCB3aGljaCBpcyBiZWluZyB3cmFwcGVkLlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhXG4gICAgICAgKiAgICAgICAgTWV0YWRhdGEgYWJvdXQgdGhlIG1ldGhvZCBiZWluZyB3cmFwcGVkLlxuICAgICAgICogQHBhcmFtIHtpbnRlZ2VyfSBtZXRhZGF0YS5taW5BcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1pbmltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtdXN0IGJlIHBhc3NlZCB0byB0aGVcbiAgICAgICAqICAgICAgICBmdW5jdGlvbi4gSWYgY2FsbGVkIHdpdGggZmV3ZXIgdGhhbiB0aGlzIG51bWJlciBvZiBhcmd1bWVudHMsIHRoZVxuICAgICAgICogICAgICAgIHdyYXBwZXIgd2lsbCByYWlzZSBhbiBleGNlcHRpb24uXG4gICAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IG1ldGFkYXRhLm1heEFyZ3NcbiAgICAgICAqICAgICAgICBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXJndW1lbnRzIHdoaWNoIG1heSBiZSBwYXNzZWQgdG8gdGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24uIElmIGNhbGxlZCB3aXRoIG1vcmUgdGhhbiB0aGlzIG51bWJlciBvZiBhcmd1bWVudHMsIHRoZVxuICAgICAgICogICAgICAgIHdyYXBwZXIgd2lsbCByYWlzZSBhbiBleGNlcHRpb24uXG4gICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnXG4gICAgICAgKiAgICAgICAgV2hldGhlciBvciBub3QgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCBvbmx5IHRoZSBmaXJzdFxuICAgICAgICogICAgICAgIGFyZ3VtZW50IG9mIHRoZSBjYWxsYmFjaywgYWx0ZXJuYXRpdmVseSBhbiBhcnJheSBvZiBhbGwgdGhlXG4gICAgICAgKiAgICAgICAgY2FsbGJhY2sgYXJndW1lbnRzIGlzIHJlc29sdmVkLiBCeSBkZWZhdWx0LCBpZiB0aGUgY2FsbGJhY2tcbiAgICAgICAqICAgICAgICBmdW5jdGlvbiBpcyBpbnZva2VkIHdpdGggb25seSBhIHNpbmdsZSBhcmd1bWVudCwgdGhhdCB3aWxsIGJlXG4gICAgICAgKiAgICAgICAgcmVzb2x2ZWQgdG8gdGhlIHByb21pc2UsIHdoaWxlIGFsbCBhcmd1bWVudHMgd2lsbCBiZSByZXNvbHZlZCBhc1xuICAgICAgICogICAgICAgIGFuIGFycmF5IGlmIG11bHRpcGxlIGFyZSBnaXZlbi5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb24ob2JqZWN0LCAuLi4qKX1cbiAgICAgICAqICAgICAgIFRoZSBnZW5lcmF0ZWQgd3JhcHBlciBmdW5jdGlvbi5cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IHdyYXBBc3luY0Z1bmN0aW9uID0gKG5hbWUsIG1ldGFkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBhc3luY0Z1bmN0aW9uV3JhcHBlcih0YXJnZXQsIC4uLmFyZ3MpIHtcbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPCBtZXRhZGF0YS5taW5BcmdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IGxlYXN0ICR7bWV0YWRhdGEubWluQXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWluQXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IG1ldGFkYXRhLm1heEFyZ3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbW9zdCAke21ldGFkYXRhLm1heEFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1heEFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgQVBJIG1ldGhvZCBoYXMgY3VycmVudGx5IG5vIGNhbGxiYWNrIG9uIENocm9tZSwgYnV0IGl0IHJldHVybiBhIHByb21pc2Ugb24gRmlyZWZveCxcbiAgICAgICAgICAgICAgLy8gYW5kIHNvIHRoZSBwb2x5ZmlsbCB3aWxsIHRyeSB0byBjYWxsIGl0IHdpdGggYSBjYWxsYmFjayBmaXJzdCwgYW5kIGl0IHdpbGwgZmFsbGJhY2tcbiAgICAgICAgICAgICAgLy8gdG8gbm90IHBhc3NpbmcgdGhlIGNhbGxiYWNrIGlmIHRoZSBmaXJzdCBjYWxsIGZhaWxzLlxuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzLCBtYWtlQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICAgIH0sIG1ldGFkYXRhKSk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGNiRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bmFtZX0gQVBJIG1ldGhvZCBkb2Vzbid0IHNlZW0gdG8gc3VwcG9ydCB0aGUgY2FsbGJhY2sgcGFyYW1ldGVyLCBgICsgXCJmYWxsaW5nIGJhY2sgdG8gY2FsbCBpdCB3aXRob3V0IGEgY2FsbGJhY2s6IFwiLCBjYkVycm9yKTtcbiAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncyk7IC8vIFVwZGF0ZSB0aGUgQVBJIG1ldGhvZCBtZXRhZGF0YSwgc28gdGhhdCB0aGUgbmV4dCBBUEkgY2FsbHMgd2lsbCBub3QgdHJ5IHRvXG4gICAgICAgICAgICAgICAgLy8gdXNlIHRoZSB1bnN1cHBvcnRlZCBjYWxsYmFjayBhbnltb3JlLlxuXG4gICAgICAgICAgICAgICAgbWV0YWRhdGEuZmFsbGJhY2tUb05vQ2FsbGJhY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBtZXRhZGF0YS5ub0NhbGxiYWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWV0YWRhdGEubm9DYWxsYmFjaykge1xuICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncyk7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzLCBtYWtlQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICAgIH0sIG1ldGFkYXRhKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhbiBleGlzdGluZyBtZXRob2Qgb2YgdGhlIHRhcmdldCBvYmplY3QsIHNvIHRoYXQgY2FsbHMgdG8gaXQgYXJlXG4gICAgICAgKiBpbnRlcmNlcHRlZCBieSB0aGUgZ2l2ZW4gd3JhcHBlciBmdW5jdGlvbi4gVGhlIHdyYXBwZXIgZnVuY3Rpb24gcmVjZWl2ZXMsXG4gICAgICAgKiBhcyBpdHMgZmlyc3QgYXJndW1lbnQsIHRoZSBvcmlnaW5hbCBgdGFyZ2V0YCBvYmplY3QsIGZvbGxvd2VkIGJ5IGVhY2ggb2ZcbiAgICAgICAqIHRoZSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBvcmlnaW5hbCBtZXRob2QuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAgICogICAgICAgIFRoZSBvcmlnaW5hbCB0YXJnZXQgb2JqZWN0IHRoYXQgdGhlIHdyYXBwZWQgbWV0aG9kIGJlbG9uZ3MgdG8uXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2RcbiAgICAgICAqICAgICAgICBUaGUgbWV0aG9kIGJlaW5nIHdyYXBwZWQuIFRoaXMgaXMgdXNlZCBhcyB0aGUgdGFyZ2V0IG9mIHRoZSBQcm94eVxuICAgICAgICogICAgICAgIG9iamVjdCB3aGljaCBpcyBjcmVhdGVkIHRvIHdyYXAgdGhlIG1ldGhvZC5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHdyYXBwZXJcbiAgICAgICAqICAgICAgICBUaGUgd3JhcHBlciBmdW5jdGlvbiB3aGljaCBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgYSBkaXJlY3QgaW52b2NhdGlvblxuICAgICAgICogICAgICAgIG9mIHRoZSB3cmFwcGVkIG1ldGhvZC5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7UHJveHk8ZnVuY3Rpb24+fVxuICAgICAgICogICAgICAgIEEgUHJveHkgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gbWV0aG9kLCB3aGljaCBpbnZva2VzIHRoZSBnaXZlbiB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgbWV0aG9kIGluIGl0cyBwbGFjZS5cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IHdyYXBNZXRob2QgPSAodGFyZ2V0LCBtZXRob2QsIHdyYXBwZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eShtZXRob2QsIHtcbiAgICAgICAgICBhcHBseSh0YXJnZXRNZXRob2QsIHRoaXNPYmosIGFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiB3cmFwcGVyLmNhbGwodGhpc09iaiwgdGFyZ2V0LCAuLi5hcmdzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBsZXQgaGFzT3duUHJvcGVydHkgPSBGdW5jdGlvbi5jYWxsLmJpbmQoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG4gICAgICAvKipcbiAgICAgICAqIFdyYXBzIGFuIG9iamVjdCBpbiBhIFByb3h5IHdoaWNoIGludGVyY2VwdHMgYW5kIHdyYXBzIGNlcnRhaW4gbWV0aG9kc1xuICAgICAgICogYmFzZWQgb24gdGhlIGdpdmVuIGB3cmFwcGVyc2AgYW5kIGBtZXRhZGF0YWAgb2JqZWN0cy5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gICAgICAgKiAgICAgICAgVGhlIHRhcmdldCBvYmplY3QgdG8gd3JhcC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gW3dyYXBwZXJzID0ge31dXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IHRyZWUgY29udGFpbmluZyB3cmFwcGVyIGZ1bmN0aW9ucyBmb3Igc3BlY2lhbCBjYXNlcy4gQW55XG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gcHJlc2VudCBpbiB0aGlzIG9iamVjdCB0cmVlIGlzIGNhbGxlZCBpbiBwbGFjZSBvZiB0aGVcbiAgICAgICAqICAgICAgICBtZXRob2QgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlLiBUaGVzZVxuICAgICAgICogICAgICAgIHdyYXBwZXIgbWV0aG9kcyBhcmUgaW52b2tlZCBhcyBkZXNjcmliZWQgaW4ge0BzZWUgd3JhcE1ldGhvZH0uXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IFttZXRhZGF0YSA9IHt9XVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgbWV0YWRhdGEgdXNlZCB0byBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlXG4gICAgICAgKiAgICAgICAgUHJvbWlzZS1iYXNlZCB3cmFwcGVyIGZ1bmN0aW9ucyBmb3IgYXN5bmNocm9ub3VzLiBBbnkgZnVuY3Rpb24gaW5cbiAgICAgICAqICAgICAgICB0aGUgYHRhcmdldGAgb2JqZWN0IHRyZWUgd2hpY2ggaGFzIGEgY29ycmVzcG9uZGluZyBtZXRhZGF0YSBvYmplY3RcbiAgICAgICAqICAgICAgICBpbiB0aGUgc2FtZSBsb2NhdGlvbiBpbiB0aGUgYG1ldGFkYXRhYCB0cmVlIGlzIHJlcGxhY2VkIHdpdGggYW5cbiAgICAgICAqICAgICAgICBhdXRvbWF0aWNhbGx5LWdlbmVyYXRlZCB3cmFwcGVyIGZ1bmN0aW9uLCBhcyBkZXNjcmliZWQgaW5cbiAgICAgICAqICAgICAgICB7QHNlZSB3cmFwQXN5bmNGdW5jdGlvbn1cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7UHJveHk8b2JqZWN0Pn1cbiAgICAgICAqL1xuXG4gICAgICBjb25zdCB3cmFwT2JqZWN0ID0gKHRhcmdldCwgd3JhcHBlcnMgPSB7fSwgbWV0YWRhdGEgPSB7fSkgPT4ge1xuICAgICAgICBsZXQgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBsZXQgaGFuZGxlcnMgPSB7XG4gICAgICAgICAgaGFzKHByb3h5VGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcCBpbiB0YXJnZXQgfHwgcHJvcCBpbiBjYWNoZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZ2V0KHByb3h5VGFyZ2V0LCBwcm9wLCByZWNlaXZlcikge1xuICAgICAgICAgICAgaWYgKHByb3AgaW4gY2FjaGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlW3Byb3BdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIShwcm9wIGluIHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGFyZ2V0W3Byb3BdO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIG1ldGhvZCBvbiB0aGUgdW5kZXJseWluZyBvYmplY3QuIENoZWNrIGlmIHdlIG5lZWQgdG8gZG9cbiAgICAgICAgICAgICAgLy8gYW55IHdyYXBwaW5nLlxuICAgICAgICAgICAgICBpZiAodHlwZW9mIHdyYXBwZXJzW3Byb3BdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIGEgc3BlY2lhbC1jYXNlIHdyYXBwZXIgZm9yIHRoaXMgbWV0aG9kLlxuICAgICAgICAgICAgICAgIHZhbHVlID0gd3JhcE1ldGhvZCh0YXJnZXQsIHRhcmdldFtwcm9wXSwgd3JhcHBlcnNbcHJvcF0pO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBwcm9wKSkge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYW4gYXN5bmMgbWV0aG9kIHRoYXQgd2UgaGF2ZSBtZXRhZGF0YSBmb3IuIENyZWF0ZSBhXG4gICAgICAgICAgICAgICAgLy8gUHJvbWlzZSB3cmFwcGVyIGZvciBpdC5cbiAgICAgICAgICAgICAgICBsZXQgd3JhcHBlciA9IHdyYXBBc3luY0Z1bmN0aW9uKHByb3AsIG1ldGFkYXRhW3Byb3BdKTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBNZXRob2QodGFyZ2V0LCB0YXJnZXRbcHJvcF0sIHdyYXBwZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBtZXRob2QgdGhhdCB3ZSBkb24ndCBrbm93IG9yIGNhcmUgYWJvdXQuIFJldHVybiB0aGVcbiAgICAgICAgICAgICAgICAvLyBvcmlnaW5hbCBtZXRob2QsIGJvdW5kIHRvIHRoZSB1bmRlcmx5aW5nIG9iamVjdC5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmJpbmQodGFyZ2V0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgKGhhc093blByb3BlcnR5KHdyYXBwZXJzLCBwcm9wKSB8fCBoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgcHJvcCkpKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYW4gb2JqZWN0IHRoYXQgd2UgbmVlZCB0byBkbyBzb21lIHdyYXBwaW5nIGZvciB0aGUgY2hpbGRyZW5cbiAgICAgICAgICAgICAgLy8gb2YuIENyZWF0ZSBhIHN1Yi1vYmplY3Qgd3JhcHBlciBmb3IgaXQgd2l0aCB0aGUgYXBwcm9wcmlhdGUgY2hpbGRcbiAgICAgICAgICAgICAgLy8gbWV0YWRhdGEuXG4gICAgICAgICAgICAgIHZhbHVlID0gd3JhcE9iamVjdCh2YWx1ZSwgd3JhcHBlcnNbcHJvcF0sIG1ldGFkYXRhW3Byb3BdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIFwiKlwiKSkge1xuICAgICAgICAgICAgICAvLyBXcmFwIGFsbCBwcm9wZXJ0aWVzIGluICogbmFtZXNwYWNlLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBPYmplY3QodmFsdWUsIHdyYXBwZXJzW3Byb3BdLCBtZXRhZGF0YVtcIipcIl0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gV2UgZG9uJ3QgbmVlZCB0byBkbyBhbnkgd3JhcHBpbmcgZm9yIHRoaXMgcHJvcGVydHksXG4gICAgICAgICAgICAgIC8vIHNvIGp1c3QgZm9yd2FyZCBhbGwgYWNjZXNzIHRvIHRoZSB1bmRlcmx5aW5nIG9iamVjdC5cbiAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNhY2hlLCBwcm9wLCB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BdO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYWNoZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBzZXQocHJveHlUYXJnZXQsIHByb3AsIHZhbHVlLCByZWNlaXZlcikge1xuICAgICAgICAgICAgaWYgKHByb3AgaW4gY2FjaGUpIHtcbiAgICAgICAgICAgICAgY2FjaGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZGVmaW5lUHJvcGVydHkocHJveHlUYXJnZXQsIHByb3AsIGRlc2MpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmRlZmluZVByb3BlcnR5KGNhY2hlLCBwcm9wLCBkZXNjKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZGVsZXRlUHJvcGVydHkocHJveHlUYXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KGNhY2hlLCBwcm9wKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfTsgLy8gUGVyIGNvbnRyYWN0IG9mIHRoZSBQcm94eSBBUEksIHRoZSBcImdldFwiIHByb3h5IGhhbmRsZXIgbXVzdCByZXR1cm4gdGhlXG4gICAgICAgIC8vIG9yaWdpbmFsIHZhbHVlIG9mIHRoZSB0YXJnZXQgaWYgdGhhdCB2YWx1ZSBpcyBkZWNsYXJlZCByZWFkLW9ubHkgYW5kXG4gICAgICAgIC8vIG5vbi1jb25maWd1cmFibGUuIEZvciB0aGlzIHJlYXNvbiwgd2UgY3JlYXRlIGFuIG9iamVjdCB3aXRoIHRoZVxuICAgICAgICAvLyBwcm90b3R5cGUgc2V0IHRvIGB0YXJnZXRgIGluc3RlYWQgb2YgdXNpbmcgYHRhcmdldGAgZGlyZWN0bHkuXG4gICAgICAgIC8vIE90aGVyd2lzZSB3ZSBjYW5ub3QgcmV0dXJuIGEgY3VzdG9tIG9iamVjdCBmb3IgQVBJcyB0aGF0XG4gICAgICAgIC8vIGFyZSBkZWNsYXJlZCByZWFkLW9ubHkgYW5kIG5vbi1jb25maWd1cmFibGUsIHN1Y2ggYXMgYGNocm9tZS5kZXZ0b29sc2AuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoZSBwcm94eSBoYW5kbGVycyB0aGVtc2VsdmVzIHdpbGwgc3RpbGwgdXNlIHRoZSBvcmlnaW5hbCBgdGFyZ2V0YFxuICAgICAgICAvLyBpbnN0ZWFkIG9mIHRoZSBgcHJveHlUYXJnZXRgLCBzbyB0aGF0IHRoZSBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIGFyZVxuICAgICAgICAvLyBkZXJlZmVyZW5jZWQgdmlhIHRoZSBvcmlnaW5hbCB0YXJnZXRzLlxuXG4gICAgICAgIGxldCBwcm94eVRhcmdldCA9IE9iamVjdC5jcmVhdGUodGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eShwcm94eVRhcmdldCwgaGFuZGxlcnMpO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhIHNldCBvZiB3cmFwcGVyIGZ1bmN0aW9ucyBmb3IgYW4gZXZlbnQgb2JqZWN0LCB3aGljaCBoYW5kbGVzXG4gICAgICAgKiB3cmFwcGluZyBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdGhhdCB0aG9zZSBtZXNzYWdlcyBhcmUgcGFzc2VkLlxuICAgICAgICpcbiAgICAgICAqIEEgc2luZ2xlIHdyYXBwZXIgaXMgY3JlYXRlZCBmb3IgZWFjaCBsaXN0ZW5lciBmdW5jdGlvbiwgYW5kIHN0b3JlZCBpbiBhXG4gICAgICAgKiBtYXAuIFN1YnNlcXVlbnQgY2FsbHMgdG8gYGFkZExpc3RlbmVyYCwgYGhhc0xpc3RlbmVyYCwgb3IgYHJlbW92ZUxpc3RlbmVyYFxuICAgICAgICogcmV0cmlldmUgdGhlIG9yaWdpbmFsIHdyYXBwZXIsIHNvIHRoYXQgIGF0dGVtcHRzIHRvIHJlbW92ZSBhXG4gICAgICAgKiBwcmV2aW91c2x5LWFkZGVkIGxpc3RlbmVyIHdvcmsgYXMgZXhwZWN0ZWQuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtEZWZhdWx0V2Vha01hcDxmdW5jdGlvbiwgZnVuY3Rpb24+fSB3cmFwcGVyTWFwXG4gICAgICAgKiAgICAgICAgQSBEZWZhdWx0V2Vha01hcCBvYmplY3Qgd2hpY2ggd2lsbCBjcmVhdGUgdGhlIGFwcHJvcHJpYXRlIHdyYXBwZXJcbiAgICAgICAqICAgICAgICBmb3IgYSBnaXZlbiBsaXN0ZW5lciBmdW5jdGlvbiB3aGVuIG9uZSBkb2VzIG5vdCBleGlzdCwgYW5kIHJldHJpZXZlXG4gICAgICAgKiAgICAgICAgYW4gZXhpc3Rpbmcgb25lIHdoZW4gaXQgZG9lcy5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAgICovXG5cblxuICAgICAgY29uc3Qgd3JhcEV2ZW50ID0gd3JhcHBlck1hcCA9PiAoe1xuICAgICAgICBhZGRMaXN0ZW5lcih0YXJnZXQsIGxpc3RlbmVyLCAuLi5hcmdzKSB7XG4gICAgICAgICAgdGFyZ2V0LmFkZExpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSwgLi4uYXJncyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFzTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICAgIHJldHVybiB0YXJnZXQuaGFzTGlzdGVuZXIod3JhcHBlck1hcC5nZXQobGlzdGVuZXIpKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmVMaXN0ZW5lcih0YXJnZXQsIGxpc3RlbmVyKSB7XG4gICAgICAgICAgdGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG9uUmVxdWVzdEZpbmlzaGVkV3JhcHBlcnMgPSBuZXcgRGVmYXVsdFdlYWtNYXAobGlzdGVuZXIgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyYXBzIGFuIG9uUmVxdWVzdEZpbmlzaGVkIGxpc3RlbmVyIGZ1bmN0aW9uIHNvIHRoYXQgaXQgd2lsbCByZXR1cm4gYVxuICAgICAgICAgKiBgZ2V0Q29udGVudCgpYCBwcm9wZXJ0eSB3aGljaCByZXR1cm5zIGEgYFByb21pc2VgIHJhdGhlciB0aGFuIHVzaW5nIGFcbiAgICAgICAgICogY2FsbGJhY2sgQVBJLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVxXG4gICAgICAgICAqICAgICAgICBUaGUgSEFSIGVudHJ5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5ldHdvcmsgcmVxdWVzdC5cbiAgICAgICAgICovXG5cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gb25SZXF1ZXN0RmluaXNoZWQocmVxKSB7XG4gICAgICAgICAgY29uc3Qgd3JhcHBlZFJlcSA9IHdyYXBPYmplY3QocmVxLCB7fVxuICAgICAgICAgIC8qIHdyYXBwZXJzICovXG4gICAgICAgICAgLCB7XG4gICAgICAgICAgICBnZXRDb250ZW50OiB7XG4gICAgICAgICAgICAgIG1pbkFyZ3M6IDAsXG4gICAgICAgICAgICAgIG1heEFyZ3M6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsaXN0ZW5lcih3cmFwcGVkUmVxKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgICAgY29uc3Qgb25NZXNzYWdlV3JhcHBlcnMgPSBuZXcgRGVmYXVsdFdlYWtNYXAobGlzdGVuZXIgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyYXBzIGEgbWVzc2FnZSBsaXN0ZW5lciBmdW5jdGlvbiBzbyB0aGF0IGl0IG1heSBzZW5kIHJlc3BvbnNlcyBiYXNlZCBvblxuICAgICAgICAgKiBpdHMgcmV0dXJuIHZhbHVlLCByYXRoZXIgdGhhbiBieSByZXR1cm5pbmcgYSBzZW50aW5lbCB2YWx1ZSBhbmQgY2FsbGluZyBhXG4gICAgICAgICAqIGNhbGxiYWNrLiBJZiB0aGUgbGlzdGVuZXIgZnVuY3Rpb24gcmV0dXJucyBhIFByb21pc2UsIHRoZSByZXNwb25zZSBpc1xuICAgICAgICAgKiBzZW50IHdoZW4gdGhlIHByb21pc2UgZWl0aGVyIHJlc29sdmVzIG9yIHJlamVjdHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gbWVzc2FnZVxuICAgICAgICAgKiAgICAgICAgVGhlIG1lc3NhZ2Ugc2VudCBieSB0aGUgb3RoZXIgZW5kIG9mIHRoZSBjaGFubmVsLlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gc2VuZGVyXG4gICAgICAgICAqICAgICAgICBEZXRhaWxzIGFib3V0IHRoZSBzZW5kZXIgb2YgdGhlIG1lc3NhZ2UuXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKil9IHNlbmRSZXNwb25zZVxuICAgICAgICAgKiAgICAgICAgQSBjYWxsYmFjayB3aGljaCwgd2hlbiBjYWxsZWQgd2l0aCBhbiBhcmJpdHJhcnkgYXJndW1lbnQsIHNlbmRzXG4gICAgICAgICAqICAgICAgICB0aGF0IHZhbHVlIGFzIGEgcmVzcG9uc2UuXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKiAgICAgICAgVHJ1ZSBpZiB0aGUgd3JhcHBlZCBsaXN0ZW5lciByZXR1cm5lZCBhIFByb21pc2UsIHdoaWNoIHdpbGwgbGF0ZXJcbiAgICAgICAgICogICAgICAgIHlpZWxkIGEgcmVzcG9uc2UuIEZhbHNlIG90aGVyd2lzZS5cbiAgICAgICAgICovXG5cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gb25NZXNzYWdlKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgbGV0IGRpZENhbGxTZW5kUmVzcG9uc2UgPSBmYWxzZTtcbiAgICAgICAgICBsZXQgd3JhcHBlZFNlbmRSZXNwb25zZTtcbiAgICAgICAgICBsZXQgc2VuZFJlc3BvbnNlUHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgd3JhcHBlZFNlbmRSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICBkaWRDYWxsU2VuZFJlc3BvbnNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxldCByZXN1bHQ7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gbGlzdGVuZXIobWVzc2FnZSwgc2VuZGVyLCB3cmFwcGVkU2VuZFJlc3BvbnNlKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgaXNSZXN1bHRUaGVuYWJsZSA9IHJlc3VsdCAhPT0gdHJ1ZSAmJiBpc1RoZW5hYmxlKHJlc3VsdCk7IC8vIElmIHRoZSBsaXN0ZW5lciBkaWRuJ3QgcmV0dXJuZWQgdHJ1ZSBvciBhIFByb21pc2UsIG9yIGNhbGxlZFxuICAgICAgICAgIC8vIHdyYXBwZWRTZW5kUmVzcG9uc2Ugc3luY2hyb25vdXNseSwgd2UgY2FuIGV4aXQgZWFybGllclxuICAgICAgICAgIC8vIGJlY2F1c2UgdGhlcmUgd2lsbCBiZSBubyByZXNwb25zZSBzZW50IGZyb20gdGhpcyBsaXN0ZW5lci5cblxuICAgICAgICAgIGlmIChyZXN1bHQgIT09IHRydWUgJiYgIWlzUmVzdWx0VGhlbmFibGUgJiYgIWRpZENhbGxTZW5kUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IC8vIEEgc21hbGwgaGVscGVyIHRvIHNlbmQgdGhlIG1lc3NhZ2UgaWYgdGhlIHByb21pc2UgcmVzb2x2ZXNcbiAgICAgICAgICAvLyBhbmQgYW4gZXJyb3IgaWYgdGhlIHByb21pc2UgcmVqZWN0cyAoYSB3cmFwcGVkIHNlbmRNZXNzYWdlIGhhc1xuICAgICAgICAgIC8vIHRvIHRyYW5zbGF0ZSB0aGUgbWVzc2FnZSBpbnRvIGEgcmVzb2x2ZWQgcHJvbWlzZSBvciBhIHJlamVjdGVkXG4gICAgICAgICAgLy8gcHJvbWlzZSkuXG5cblxuICAgICAgICAgIGNvbnN0IHNlbmRQcm9taXNlZFJlc3VsdCA9IHByb21pc2UgPT4ge1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKG1zZyA9PiB7XG4gICAgICAgICAgICAgIC8vIHNlbmQgdGhlIG1lc3NhZ2UgdmFsdWUuXG4gICAgICAgICAgICAgIHNlbmRSZXNwb25zZShtc2cpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAvLyBTZW5kIGEgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaWYgdGhlIHJlamVjdGVkIHZhbHVlXG4gICAgICAgICAgICAgIC8vIGlzIGFuIGluc3RhbmNlIG9mIGVycm9yLCBvciB0aGUgb2JqZWN0IGl0c2VsZiBvdGhlcndpc2UuXG4gICAgICAgICAgICAgIGxldCBtZXNzYWdlO1xuXG4gICAgICAgICAgICAgIGlmIChlcnJvciAmJiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciB8fCB0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gXCJzdHJpbmdcIikpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkXCI7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgIF9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgLy8gUHJpbnQgYW4gZXJyb3Igb24gdGhlIGNvbnNvbGUgaWYgdW5hYmxlIHRvIHNlbmQgdGhlIHJlc3BvbnNlLlxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHNlbmQgb25NZXNzYWdlIHJlamVjdGVkIHJlcGx5XCIsIGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9OyAvLyBJZiB0aGUgbGlzdGVuZXIgcmV0dXJuZWQgYSBQcm9taXNlLCBzZW5kIHRoZSByZXNvbHZlZCB2YWx1ZSBhcyBhXG4gICAgICAgICAgLy8gcmVzdWx0LCBvdGhlcndpc2Ugd2FpdCB0aGUgcHJvbWlzZSByZWxhdGVkIHRvIHRoZSB3cmFwcGVkU2VuZFJlc3BvbnNlXG4gICAgICAgICAgLy8gY2FsbGJhY2sgdG8gcmVzb2x2ZSBhbmQgc2VuZCBpdCBhcyBhIHJlc3BvbnNlLlxuXG5cbiAgICAgICAgICBpZiAoaXNSZXN1bHRUaGVuYWJsZSkge1xuICAgICAgICAgICAgc2VuZFByb21pc2VkUmVzdWx0KHJlc3VsdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbmRQcm9taXNlZFJlc3VsdChzZW5kUmVzcG9uc2VQcm9taXNlKTtcbiAgICAgICAgICB9IC8vIExldCBDaHJvbWUga25vdyB0aGF0IHRoZSBsaXN0ZW5lciBpcyByZXBseWluZy5cblxuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgd3JhcHBlZFNlbmRNZXNzYWdlQ2FsbGJhY2sgPSAoe1xuICAgICAgICByZWplY3QsXG4gICAgICAgIHJlc29sdmVcbiAgICAgIH0sIHJlcGx5KSA9PiB7XG4gICAgICAgIGlmIChleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgLy8gRGV0ZWN0IHdoZW4gbm9uZSBvZiB0aGUgbGlzdGVuZXJzIHJlcGxpZWQgdG8gdGhlIHNlbmRNZXNzYWdlIGNhbGwgYW5kIHJlc29sdmVcbiAgICAgICAgICAvLyB0aGUgcHJvbWlzZSB0byB1bmRlZmluZWQgYXMgaW4gRmlyZWZveC5cbiAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsL2lzc3Vlcy8xMzBcbiAgICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlID09PSBDSFJPTUVfU0VORF9NRVNTQUdFX0NBTExCQUNLX05PX1JFU1BPTlNFX01FU1NBR0UpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVwbHkgJiYgcmVwbHkuX19tb3pXZWJFeHRlbnNpb25Qb2x5ZmlsbFJlamVjdF9fKSB7XG4gICAgICAgICAgLy8gQ29udmVydCBiYWNrIHRoZSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBlcnJvciBpbnRvXG4gICAgICAgICAgLy8gYW4gRXJyb3IgaW5zdGFuY2UuXG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihyZXBseS5tZXNzYWdlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXBseSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHdyYXBwZWRTZW5kTWVzc2FnZSA9IChuYW1lLCBtZXRhZGF0YSwgYXBpTmFtZXNwYWNlT2JqLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA8IG1ldGFkYXRhLm1pbkFyZ3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IGxlYXN0ICR7bWV0YWRhdGEubWluQXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWluQXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gbWV0YWRhdGEubWF4QXJncykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbW9zdCAke21ldGFkYXRhLm1heEFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1heEFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgY29uc3Qgd3JhcHBlZENiID0gd3JhcHBlZFNlbmRNZXNzYWdlQ2FsbGJhY2suYmluZChudWxsLCB7XG4gICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYXJncy5wdXNoKHdyYXBwZWRDYik7XG4gICAgICAgICAgYXBpTmFtZXNwYWNlT2JqLnNlbmRNZXNzYWdlKC4uLmFyZ3MpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHN0YXRpY1dyYXBwZXJzID0ge1xuICAgICAgICBkZXZ0b29sczoge1xuICAgICAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgICAgIG9uUmVxdWVzdEZpbmlzaGVkOiB3cmFwRXZlbnQob25SZXF1ZXN0RmluaXNoZWRXcmFwcGVycylcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJ1bnRpbWU6IHtcbiAgICAgICAgICBvbk1lc3NhZ2U6IHdyYXBFdmVudChvbk1lc3NhZ2VXcmFwcGVycyksXG4gICAgICAgICAgb25NZXNzYWdlRXh0ZXJuYWw6IHdyYXBFdmVudChvbk1lc3NhZ2VXcmFwcGVycyksXG4gICAgICAgICAgc2VuZE1lc3NhZ2U6IHdyYXBwZWRTZW5kTWVzc2FnZS5iaW5kKG51bGwsIFwic2VuZE1lc3NhZ2VcIiwge1xuICAgICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICAgIG1heEFyZ3M6IDNcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB0YWJzOiB7XG4gICAgICAgICAgc2VuZE1lc3NhZ2U6IHdyYXBwZWRTZW5kTWVzc2FnZS5iaW5kKG51bGwsIFwic2VuZE1lc3NhZ2VcIiwge1xuICAgICAgICAgICAgbWluQXJnczogMixcbiAgICAgICAgICAgIG1heEFyZ3M6IDNcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3Qgc2V0dGluZ01ldGFkYXRhID0ge1xuICAgICAgICBjbGVhcjoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9LFxuICAgICAgICBnZXQ6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBhcGlNZXRhZGF0YS5wcml2YWN5ID0ge1xuICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9LFxuICAgICAgICBzZXJ2aWNlczoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfSxcbiAgICAgICAgd2Vic2l0ZXM6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gd3JhcE9iamVjdChleHRlbnNpb25BUElzLCBzdGF0aWNXcmFwcGVycywgYXBpTWV0YWRhdGEpO1xuICAgIH07IC8vIFRoZSBidWlsZCBwcm9jZXNzIGFkZHMgYSBVTUQgd3JhcHBlciBhcm91bmQgdGhpcyBmaWxlLCB3aGljaCBtYWtlcyB0aGVcbiAgICAvLyBgbW9kdWxlYCB2YXJpYWJsZSBhdmFpbGFibGUuXG5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gd3JhcEFQSXMoY2hyb21lKTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbFRoaXMuYnJvd3NlcjtcbiAgfVxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1icm93c2VyLXBvbHlmaWxsLmpzLm1hcFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9iYWNrZ3JvdW5kLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9