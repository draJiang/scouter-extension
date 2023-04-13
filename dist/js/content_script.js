/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Components/Nav.tsx":
/*!********************************!*\
  !*** ./src/Components/Nav.tsx ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Nav = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const icon128_png_1 = __importDefault(__webpack_require__(/*! ../assets/icon128.png */ "./src/assets/icon128.png"));
function Nav(props) {
    const [count, setCount] = (0, react_1.useState)(0);
    const [currentURL, setCurrentURL] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
    }, []);
    const handleSaveToAnkiBtnClick = () => {
        console.log('Nav handleSaveToAnkiBtnClick');
        props.handleSaveToAnkiBtnClick();
    };
    // const onNavMouseDown = (event:any)=>{
    //     console.log('Nav:onMouseDown');
    //     props.onMouseDown(event)
    // }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(antd_1.ConfigProvider, { theme: {
                token: {
                    colorPrimary: '#F08A24',
                },
            } },
            react_1.default.createElement("div", { id: "ScouterNav", style: { cursor: 'move' }, onMouseDown: props.onMouseDown },
                react_1.default.createElement("img", { src: icon128_png_1.default }),
                react_1.default.createElement("div", { className: "rightBtnBox", style: { flex: 1, textAlign: 'right' } }, props.addToAnkiStatus == 'success' ? '✅ Added to Anki' :
                    react_1.default.createElement(antd_1.Button, { size: "small", 
                        // type='link'
                        loading: props.addToAnkiStatus === 'loading' ? true : false, disabled: props.addToAnkiStatus === 'standby' ? true : false, onClick: handleSaveToAnkiBtnClick }, "Add to Anki"))))));
}
exports.Nav = Nav;


/***/ }),

/***/ "./src/PopupCard/Selection.tsx":
/*!*************************************!*\
  !*** ./src/PopupCard/Selection.tsx ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Selection = void 0;
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
// import LanguageDetect from "languagedetect";
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const locale_1 = __webpack_require__(/*! ../lib/locale */ "./src/lib/locale.ts");
const lang_1 = __webpack_require__(/*! ../lib/lang */ "./src/lib/lang.ts");
const icons_1 = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
function Selection(props) {
    const [targetLanguage, setTargetLanguage] = (0, react_1.useState)('English');
    const [playStatus, setPlayStatus] = (0, react_1.useState)(false);
    // 获取用户设置的语言信息
    let Lang = (0, locale_1.useCurrentLanguage)();
    (0, react_1.useEffect)(() => {
        setTargetLanguage(Lang['target']['name']);
        webextension_polyfill_1.default.storage.onChanged.addListener(onStorageChange);
        return () => {
            webextension_polyfill_1.default.storage.onChanged.removeListener(onStorageChange);
        };
    }, [props]);
    // 语音播报
    const speaker = () => {
        // 识别语言
        // const lngDetector = new LanguageDetect();
        // lngDetector.setLanguageType('iso2')
        // console.log(lngDetector.detect(props.text, 2));
        // 暂停上一次播报任务
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(props.text);
        // 语种
        utterance.lang = lang_1.languageCodes[targetLanguage];
        console.log(lang_1.languageCodes[targetLanguage]);
        console.log(targetLanguage);
        // 语速
        if (playStatus) {
            // 基数次播放时采用慢速播放，让用户可以听的更清楚
            utterance.rate = 0.6;
        }
        else {
            utterance.rate = 0.85;
        }
        setPlayStatus(!playStatus);
        // 开播吧
        speechSynthesis.speak(utterance);
    };
    const onStorageChange = (changes, area) => {
        console.log(changes);
        // 更新目标语言
        if ('targetLanguage' in changes) {
            console.log('changes');
            console.log(changes['targetLanguage']['newValue']);
            setTargetLanguage(changes['targetLanguage']['newValue']);
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { id: "ScouterSelection" },
            react_1.default.createElement("span", null, props.text),
            react_1.default.createElement(antd_1.Button, { style: { display: 'inline-block' }, size: "small", type: "text", icon: react_1.default.createElement(icons_1.CustomerServiceOutlined, null), onClick: speaker }))));
}
exports.Selection = Selection;
;


/***/ }),

/***/ "./src/PopupCard/index.tsx":
/*!*********************************!*\
  !*** ./src/PopupCard/index.tsx ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.PopupCard = void 0;
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_markdown_1 = __importDefault(__webpack_require__(/*! react-markdown */ "./node_modules/react-markdown/index.js"));
const Nav_1 = __webpack_require__(/*! ../Components/Nav */ "./src/Components/Nav.tsx");
const Selection_1 = __webpack_require__(/*! ./Selection */ "./src/PopupCard/Selection.tsx");
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const { TextArea } = antd_1.Input;
const settingGuide_png_1 = __importDefault(__webpack_require__(/*! ../assets/settingGuide.png */ "./src/assets/settingGuide.png"));
const locale_1 = __webpack_require__(/*! ../lib/locale */ "./src/lib/locale.ts");
let currentLanguage;
let targetLanguage;
function PopupCard(props) {
    const [messages, setMessages] = (0, react_1.useState)([]);
    const [openApiAnser, setopenApiAnser] = (0, react_1.useState)('');
    const [openApiAnser2, setopenApiAnser2] = (0, react_1.useState)('');
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    // standby,normal,loading,success
    const [addToAnkiStatus, setAddToAnkiStatus] = (0, react_1.useState)('standby');
    const [isAnswerDone1, setAnswerDone1] = (0, react_1.useState)(false);
    const [isUserAnswered, setIsUserAnswered] = (0, react_1.useState)(false);
    const [isAnswerDone2, setAnswerDone2] = (0, react_1.useState)(false);
    const [isErro, setIsErro] = (0, react_1.useState)(false);
    const [isAnswerInputed, setIsAnswerInputed] = (0, react_1.useState)(false);
    const [keyWord, setKeyWord] = (0, react_1.useState)('');
    const [sentence, setSentence] = (0, react_1.useState)('');
    // 窗口拖拽逻辑
    const [dragging, setDragging] = (0, react_1.useState)(false);
    // const [position, setPosition] = useState({ x: 10, y: 10 });
    // const [offset, setOffset] = useState({ x: 0, y: 0 });
    const windowElement = (0, react_1.useRef)(null);
    const [form] = antd_1.Form.useForm();
    const answerValue = antd_1.Form.useWatch('answer', form);
    // const [conversationList, setConversationList] = useState<{ type: string, isLoading: boolean, content: string }[]>([{ 'type': 'ai', 'isLoading': true, 'content': '' }]);
    let Lang = (0, locale_1.useCurrentLanguage)();
    currentLanguage = Lang['current']['name'];
    targetLanguage = Lang['target']['name'];
    (0, react_1.useEffect)(() => {
        // New Task
        // console.log('## PopupCard useEffect')
        // 当前选中的文字
        let keyWord = props.selection.toString();
        // 选中文字所在的段落
        let sentence = props.selection.anchorNode.data;
        // 设置窗口的默认位置
        if (windowElement.current) {
            // Check the boundaries
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const elementWidth = windowElement.current.clientWidth;
            const elementHeight = windowElement.current.clientHeight;
            const minX = 0;
            const minY = 0;
            const maxX = windowWidth - elementWidth;
            const maxY = windowHeight - elementHeight;
            const newX = maxX - 20;
            const newY = props.selection.anchorNode.parentElement.offsetTop + props.selection.anchorNode.parentElement.clientHeight + 20;
            const clampedX = Math.max(minX, Math.min(newX, maxX));
            const clampedY = Math.max(minY, Math.min(newY, maxY));
            // console.log(props.selection.getRangeAt(0));
            windowElement.current.style.left = `${clampedX}px`;
            windowElement.current.style.top = `${clampedY}px`;
        }
        setKeyWord(keyWord);
        setSentence(sentence);
        // 设置加载状态
        // setIsLoading(true)
        console.log('Lang:');
        console.log(Lang);
        // 如果历史记录中存在记录，则不重复请求 API，直接显示历史记录的信息
        webextension_polyfill_1.default.storage.sync.get({ "history": [] }).then((item) => {
            console.log(item.history);
            // 如果记录已存在，则不重复保存
            let bingo = false;
            for (let i = 0; i < item.history.length; i++) {
                let obj = item.history[i];
                if (obj.keyWord === keyWord && obj.sentence === sentence) {
                    bingo = true;
                    // 直接显示历史记录中的回答
                    setIsLoading(false);
                    setopenApiAnser(obj.answer);
                    setAnswerDone1(true);
                    setAddToAnkiStatus('normal');
                    break;
                }
            }
            if (!bingo) {
                let systemPrompt = {
                    "role": "system", "content": `As a language expert.
          - Please strictly adhere to the language requested by the user when providing your response.
          - Please answer the question using Markdown syntax, including but not limited to: 
            - Headings: ##, ###
            -	Lists: -, 1. 
            No additional language`
                };
                let userPrompt = {
                    "role": "user", "content": `1. Using ${Lang['current']['name']} explanatory part of speech
            2. Explanation: ${Lang['current']['Prompt1']['explanation']}. 
            3. Example sentences: Provide ${Lang['target']['name']} example sentences with the same meaning or function, along with their translations.
            4. Translation question: Based on the word, Provide 2 simple sentences to translate the ${Lang['current']['name']} sentences into ${Lang['target']['name']}.
            Please reply "Yes" if you understand.`
                };
                let assistantPrompt = { "role": "assistant", "content": 'Yes' };
                let userPrompt2 = {
                    "role": "user", "content": `Word:"${keyWord}", sentence: "${sentence.length <= keyWord.length ? props.selection.anchorNode.parentNode.parentNode.innerText : sentence}"
          `
                };
                // 关键字长度较长时，按照句子进行处理
                if (keyWord.length > 20) {
                    systemPrompt = {
                        "role": "system", "content": `As an AI language expert, translate the sentence, analyze the original sentence and explain the grammar involved.
            - Please strictly adhere to the language requested by the user when providing your response.
          - Please answer the question using Markdown syntax, including but not limited to: 
            - Headings: ##, ###
            -	Lists: -, 1. 
            No additional language`
                    };
                    userPrompt = {
                        "role": "user", "content": `1. ${Lang['current']['Prompt2']['translate']} 2. Explanation: ${Lang['current']['Prompt2']['explanation']} 
              3. Example sentences: Provide 2 ${Lang['target']['name']} example sentences and show their translations. 
              4. Translation question: Based on the grammar knowledge points mentioned, Provide 2 simple test questions to translate the ${Lang['current']['name']} sentences into ${Lang['target']['name']}
              Please reply "Yes" if you understand.`
                    };
                    userPrompt2 = {
                        "role": "user", "content": `Sentence: "${keyWord}"`
                    };
                }
                let prompt = [systemPrompt, userPrompt, assistantPrompt, userPrompt2];
                console.log(keyWord);
                getGPTMsg(prompt, 'as1', keyWord);
            }
        });
    }, [props]);
    // 窗口拖拽时触发
    (0, react_1.useEffect)(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            // console.log('useEffect return');
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);
    // 保存历史记录
    (0, react_1.useEffect)(() => {
        // 在 openApiAnser 更新后将其保存到浏览器存储中
        // 将查询记录保存起来
        const newHistory = { 'keyWord': keyWord, 'sentence': sentence, 'answer': openApiAnser, 'source': window.location.href };
        if (keyWord !== '' && sentence !== '' && openApiAnser !== '') {
            webextension_polyfill_1.default.storage.sync.get({ "history": [] }).then((item) => {
                console.log(item.history);
                let newHistoryList = [];
                let bingo = false;
                newHistoryList.push(newHistory);
                if (Array.isArray(item.history)) {
                    // 如果记录已存在，则不重复保存
                    for (let i = 0; i < item.history.length; i++) {
                        let obj = item.history[i];
                        if (obj.keyWord === newHistory['keyWord'] && obj.sentence === newHistory['sentence']) {
                            bingo = true;
                            break;
                        }
                    }
                    newHistoryList = item.history;
                    newHistoryList.unshift(newHistory);
                    newHistoryList.splice(10);
                }
                if (!bingo) {
                    webextension_polyfill_1.default.storage.sync.set({
                        history: newHistoryList
                    }).then(() => {
                    });
                }
            });
        }
    }, [isAnswerDone1]);
    // 使用 type 来区分当前请求的是第 1 个答案还是 第 2 个答案，根据不同的 type 渲染不同的 UI
    const getGPTMsg = (prompt, type, keyWord) => __awaiter(this, void 0, void 0, function* () {
        type = type || 'as1';
        keyWord = keyWord || '';
        setIsLoading(true);
        // 请求 background 获取数据
        // 使用长连接
        let port = webextension_polyfill_1.default.runtime.connect({
            name: 'popup-name'
        });
        // 在消息历史中插入新记录
        setMessages(prevMessages => [...prevMessages, { 'content': '', 'role': 'assistant', 'loading': true }]);
        // 使用 postMs 发送信息
        port.postMessage({ 'type': 'getGPTMsg', 'messages': prompt, 'keyWord': keyWord });
        // 接收信息
        port.onMessage.addListener(msg => {
            // console.log('port.onMessage.addListener');
            // 请求 GPT 数据失败
            if (msg.status === 'erro') {
                type === 'as2' ? setopenApiAnser2(msg.content) : setopenApiAnser(msg.content);
                if (msg.content.indexOf('API Key error') > -1) {
                    setIsErro(true);
                }
                setIsLoading(false);
            }
            // 请求 GPT 数据成功且数据流结束传输
            if (msg.status === 'end') {
                if (type === 'as2') {
                    setAnswerDone2(true);
                }
                else {
                    setAnswerDone1(true);
                    setAddToAnkiStatus('normal');
                }
                // getGPTDataIsProcess.current = false
                // console.log(getGPTDataIsProcess);
            }
            // 请求 GPT 数据成功且数据流开始传输
            if (msg.status === 'begin') {
                type === 'as2' ? setopenApiAnser2('') : setopenApiAnser('');
                setIsLoading(false);
                // setMessages([])
                // getGPTDataIsProcess.current = true
                // console.log(getGPTDataIsProcess);
                console.log('begin');
            }
            // 请求 GPT 数据成功且数据流传输中
            if (msg.status === 'process') {
                // let newMsg = messages[messages.length - 1]
                // newMsg['text'] += msg.content
                // newMsg['role'] = 'xxxx'
                // setMessages([...messages.slice(0, -1), newMsg])
                setMessages(prevMessages => {
                    const lastMessage = prevMessages[prevMessages.length - 1];
                    const newMsgList = lastMessage;
                    const updatedLastMessage = Object.assign(Object.assign({}, lastMessage), { content: newMsgList.content + msg.content, loading: false });
                    // const newMsgList = [...prevMessages.slice(0, prevMessages.length - 1), lastMessage]
                    return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];
                });
                // setMessages(prevMessages => {
                //   const lastMessageIndex = prevMessages.length - 1;
                //   const lastMessage = prevMessages[lastMessageIndex];
                //   const updatedLastMessage = {
                //     ...lastMessage,
                //     text: lastMessage.text + msg.content
                //   };
                //   return [...prevMessages.slice(0, lastMessageIndex), updatedLastMessage];
                // });
                // const lastMessage = { 'text': '', 'role': '' }
                // lastMessage['text'] += msg.content;
                // lastMessage['role'] = "xxxx";
                // return [lastMessage];
                // 渲染内容
                // type === 'as2' ? setopenApiAnser2(oa => oa += msg.content) : setopenApiAnser(oa => oa += msg.content)
            }
            if (msg.type === 'sendImgData') {
                console.log(msg);
                if ('imgs' in msg) {
                    console.log('unsplashSearchPhotos');
                    console.log('imgs:');
                    console.log(msg);
                }
            }
        });
    });
    // 提交答案
    const onPressEnter = (values) => {
        // console.log(event);
        console.log(values);
        let prompt = `${Lang['current']['Prompt3']['validation']}"${values.answer}"`;
        setIsUserAnswered(true);
        // 将用户发言发送到历史记录中
        setMessages(prevMessages => {
            const updatedLastMessage = {
                role: 'user',
                content: values.answer,
                'loading': false
            };
            // const newMsgList = [...prevMessages.slice(0, prevMessages.length - 1), lastMessage]
            return [...prevMessages, updatedLastMessage];
        });
        console.log(messages);
        const msgHistory = messages.map((item) => { return { 'role': item.role, 'content': item.content }; });
        getGPTMsg([...msgHistory, { "role": "user", "content": values.answer }], 'as2');
    };
    // 文本框下敲击按键时
    const handleKeyDown = (event) => {
        // 阻止事件冒泡
        event.stopPropagation();
    };
    const handleMouseDown = (event) => {
        // console.log('PopupCard:handleMouseDown');
        setDragging(true);
        if (windowElement.current) {
            const rect = windowElement.current.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;
            windowElement.current.dataset.offsetX = String(offsetX);
            windowElement.current.dataset.offsetY = String(offsetY);
        }
        // setOffset({ x: event.clientX - position.x, y: event.clientY - position.y });
    };
    const handleMouseMove = (event) => {
        // // console.log('PopupCard:handleMouseMove');
        // // console.log(dragging);
        if (dragging && windowElement.current) {
            // Use requestAnimationFrame to throttle the mousemove event handling
            // 鼠标相对窗口左上角的偏移
            const offsetX = parseFloat(windowElement.current.dataset.offsetX || '');
            const offsetY = parseFloat(windowElement.current.dataset.offsetY || '');
            const newX = event.clientX - offsetX;
            const newY = event.clientY - offsetY;
            // Check the boundaries
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const elementWidth = windowElement.current.clientWidth;
            const elementHeight = windowElement.current.clientHeight;
            const minX = 0;
            const minY = 0;
            const maxX = windowWidth - elementWidth;
            const maxY = windowHeight - elementHeight;
            const clampedX = Math.max(minX, Math.min(newX, maxX));
            const clampedY = Math.max(minY, Math.min(newY, maxY));
            // Only update the position if it's within the boundaries
            // newX >= minX && newX <= maxX && newY >= minY && newY <= maxY
            if (true) {
                // setPosition({ x: clampedX, y: clampedY });
                windowElement.current.style.left = `${clampedX}px`;
                windowElement.current.style.top = `${clampedY}px`;
            }
            else {}
        }
    };
    const handleMouseUp = () => {
        // // console.log('PopupCard:handleMouseUp');
        setDragging(false);
    };
    // 文本框值变化时
    const onTextAreaInput = (event) => {
        if (event.target.value.length > 3) {
            setIsAnswerInputed(true);
        }
        else {
            setIsAnswerInputed(false);
        }
    };
    // 点击保存到 Anki
    const handleSaveToAnkiBtnClick = () => {
        // return 
        // console.log('Popup:handleSaveToAnkiBtnClick');
        setAddToAnkiStatus('loading');
        let container = '';
        const stc = keyWord.length <= 20 ? sentence : '';
        if (windowElement.current) {
            console.log(windowElement.current);
            container = windowElement.current.innerHTML;
            container = windowElement.current.getElementsByClassName('openAIAnswer')[0].innerHTML;
        }
        // 请求 background 将数据保存到 Anki
        const p = {
            "note": {
                "deckName": "Default",
                "modelName": "Basic",
                "fields": {
                    "Front": keyWord,
                    "Back": '<p>' + stc + '</p>' + container + '<a href="' + window.location.href + '">Source</a>'
                },
                "tags": [
                    "Scouter"
                ]
            }
        };
        // 发送消息给 background
        let sending = webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'addToAnki', 'messages': p });
        sending.then(handleResponse, handleError);
        // 接收 background 的回复
        function handleResponse(message) {
            // console.log(message);
            if (message.error === null) {
                setAddToAnkiStatus('success');
            }
            else {
                alert(message.error);
                setAddToAnkiStatus('normal');
            }
        }
        function handleError(erro) {
            setAddToAnkiStatus('normal');
            // console.log(erro);
        }
    };
    return (react_1.default.createElement("div", { id: "LearningEnglish2023", ref: windowElement, style: {
            left: 10,
            top: 10,
        } },
        react_1.default.createElement(antd_1.ConfigProvider, { theme: {
                token: {
                    colorPrimary: '#F08A24',
                },
            } },
            react_1.default.createElement(Nav_1.Nav, { handleSaveToAnkiBtnClick: handleSaveToAnkiBtnClick, addToAnkiStatus: addToAnkiStatus, onMouseDown: handleMouseDown, title: 'Scouter' }),
            react_1.default.createElement("div", { className: "contentBox" },
                react_1.default.createElement(Selection_1.Selection, { text: keyWord }),
                react_1.default.createElement("button", { className: "bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" }, "Click me"),
                react_1.default.createElement("div", { className: 'tttttest' }, messages.map((item) => {
                    return item.loading ? react_1.default.createElement(antd_1.Skeleton, { active: true, title: false }) : react_1.default.createElement("div", { style: item.role === 'assistant' ? { border: '1px solid' } : { border: '1px solid red' } },
                        react_1.default.createElement(react_markdown_1.default, null, item.content));
                })),
                react_1.default.createElement(antd_1.Form, { onFinish: onPressEnter, layout: 'vertical', style: { textAlign: 'right' } },
                    react_1.default.createElement(antd_1.Form.Item, { name: "answer", style: { margin: '0 0 10px 0' } },
                        react_1.default.createElement(TextArea, { rows: 3, placeholder: "ask something", onKeyDown: handleKeyDown, onInput: onTextAreaInput })),
                    react_1.default.createElement(antd_1.Form.Item, { style: { margin: '0' } },
                        react_1.default.createElement(antd_1.Button
                        // type="primary"
                        , { 
                            // type="primary"
                            htmlType: "submit", size: 'small' }, "Submit"))),
                isErro ? react_1.default.createElement("img", { src: settingGuide_png_1.default, style: { width: '100%', borderRadius: '4px' } }) : ''))));
}
exports.PopupCard = PopupCard;
;


/***/ }),

/***/ "./src/content_script.tsx":
/*!********************************!*\
  !*** ./src/content_script.tsx ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
const PopupCard_1 = __webpack_require__(/*! ./PopupCard */ "./src/PopupCard/index.tsx");
const cssinjs_1 = __webpack_require__(/*! @ant-design/cssinjs */ "./node_modules/@ant-design/cssinjs/es/index.js");
const lang_1 = __webpack_require__(/*! ./lib/lang */ "./src/lib/lang.ts");
const locale_1 = __webpack_require__(/*! ./lib/locale */ "./src/lib/locale.ts");
// 页面载入后会注入次脚本，或 background 可能会在一些情况下注入此脚本
// console.log('before browser.runtime.onMessage.addListener');
// 初始化主容器，主容器用来挂在全局样式，包括第三方组件的样式
let MyBox = document.getElementById('__jiang-souter');
// container 承载 UI 组件
let container = document.createElement('div');
// 使用 shadow 来隔离样式
let shadowRoot = undefined;
if (MyBox !== null && MyBox !== undefined) {
    // 如果已存在容器
    // console.log('已存在 Box 容器');
    // 移除旧容器，避免出现 2 个主容器会导致 UI 渲染错误
    (_a = MyBox.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(MyBox);
}
// 创建主容器
MyBox = document.createElement('div');
MyBox.id = '__jiang-souter';
document.getElementsByTagName('html')[0].appendChild(MyBox);
MyBox.style.display = 'none'; //默认隐藏
shadowRoot = MyBox === null || MyBox === void 0 ? void 0 : MyBox.attachShadow({ mode: 'open' });
container.className = 'container';
shadowRoot === null || shadowRoot === void 0 ? void 0 : shadowRoot.appendChild(container);
// Ant 组件样式
const antStylesheet = document.createElement('link');
antStylesheet.rel = 'stylesheet';
antStylesheet.href = 'https://cdn.bootcdn.net/ajax/libs/antd/4.17.1/antd.min.css';
shadowRoot.appendChild(antStylesheet);
// 在 Shadow DOM 中添加样式：
const style = document.createElement('style');
style.textContent = `
  @font-face {
  font-family: 'OPPOSans-R';
  src: url('../public/font/OPPOSans-R.ttf') format('truetype');
  }

  #LearningEnglish2023 {
  font-family: sans-serif;
  width: 400px;
  height: 500px;
  color: #333;
  position: fixed;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  background-color: #fff;
  z-index: 9999;
  overflow: hidden;
  box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.1), -1px 10px 10px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  }

  #LearningEnglish2023,#LearningEnglish2023 textarea {

  }

  #LearningEnglish2023 .openAIAnswer {
  line-height: 30px;
  }

  #LearningEnglish2023 .userInput {
  margin: 10px 0;
  }

  #LearningEnglish2023 .contentBox {
  padding: 20px;
  overflow: scroll;
  }

  #LearningEnglish2023 #ScouterNav {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px 19px;
  border-bottom: 1px solid rgba(5, 5, 5, .06);
  user-select: none;
  }

  #LearningEnglish2023 #ScouterNav img {
  width: auto;
  height: 24px;
  margin-right: 6px;
  }

  #LearningEnglish2023 #ScouterSelection {
  margin-bottom: 14px;
  }
  `;
shadowRoot === null || shadowRoot === void 0 ? void 0 : shadowRoot.appendChild(style);
// 接收 background 消息（目前是通过浏览器的右键菜单触发）
webextension_polyfill_1.default.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    var _a;
    // console.log('content script onMessage:');
    // console.log(msg);
    if (msg.type === 'open-souter') {
        // 处理窗口
        if (MyBox !== null && MyBox !== undefined) {
            // 如果已存在容器
            // console.log('已存在 Box 容器');
            MyBox.style.display = 'block';
            // 移除旧内容，避免 2 次渲染混杂在一起
            (_a = container.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(container);
        }
        else {
            // console.log('不存在 Box 容器');
        }
        container = document.createElement('div');
        container.className = 'container';
        shadowRoot === null || shadowRoot === void 0 ? void 0 : shadowRoot.appendChild(container);
        // 显示窗口
        showPopupCard(window.getSelection(), container, shadowRoot);
        // 监听页面点击事件
        document.onmousedown = function (event) {
            var _a;
            if (MyBox !== undefined && MyBox !== null) {
                // 如果点击的不是插件窗口及其子元素，则关闭窗口
                if (MyBox !== event.target && !MyBox.contains(event.target)) {
                    // 隐藏窗口
                    (_a = container.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(container);
                }
            }
        };
    }
});
// 显示应用窗口
function showPopupCard(msg, MyBox, shadowRoot) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('showPopupCard:');
        // let a = await fetchcurrentLanguage()
        // console.log(a);
        const lang = yield (0, lang_1.fetchcurrentLanguage)();
        react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null,
            react_1.default.createElement(locale_1.CurrentLanguageContext.Provider, { value: lang },
                react_1.default.createElement(cssinjs_1.StyleProvider, { container: shadowRoot },
                    react_1.default.createElement(PopupCard_1.PopupCard, { selection: msg })))), MyBox);
    });
}
// async function getCurrentLanguage() {
//   const lang = await fetchcurrentLanguage()
//   console.log(lang);
//   return lang 
// }


/***/ }),

/***/ "./src/lib/locale.ts":
/*!***************************!*\
  !*** ./src/lib/locale.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useCurrentLanguage = exports.CurrentLanguageContext = void 0;
const react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const lang_1 = __webpack_require__(/*! ./lang */ "./src/lib/lang.ts");
const asyncFetchcurrentLanguage = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, lang_1.fetchcurrentLanguage)();
});
// 获取当前语言
exports.CurrentLanguageContext = (0, react_1.createContext)(null);
const useCurrentLanguage = () => (0, react_1.useContext)(exports.CurrentLanguageContext);
exports.useCurrentLanguage = useCurrentLanguage;


/***/ }),

/***/ "./src/assets/icon128.png":
/*!********************************!*\
  !*** ./src/assets/icon128.png ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,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");

/***/ }),

/***/ "./src/assets/settingGuide.png":
/*!*************************************!*\
  !*** ./src/assets/settingGuide.png ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAccAAACpCAYAAABedfYsAAABp2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgIGV4aWY6VXNlckNvbW1lbnQ9IlNjcmVlbnNob3QiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIxNjkiCiAgIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSI0NTUiLz4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz4eQrDeAAABXWlDQ1BJQ0MgUHJvZmlsZQAAKJF1kE8og3EYxz9jiE1RlOSwlDKNZlty3SgUWrPlz0G9ezejZn69m+QmF+UsRyfJyXUlBzdXpSinXeSgXNQurNfzbthGnnp6Pn17nt/v2xcanJpSaTuwmckZkamQa2l5xdXyjJ1mHAzRqulZFQyHZ2WF71lfxXts1rwbtt7yHrys3lzGCqX2Ti72T6b/7tdVWyKZ1WV+SAd0ZeTA5hUO7+SUxXvCXYaYEj6yOFXhc4vjFb4q70QjE8K3wh36upYQLgh74jV6qoY309v6lwfLvTOZiS3I7JHuY54oPgJMMUeIUcYZlCzc/9wEyjcTbKHYxWCDFOvkcBEURZEmKTxDBp0RPMI+vNJ+K+vfGVa1w1eYHJOvuqvajPg/3oDep6rWfwoDccj7lWZoP8naivbsmt9XYUcemo5N820RWtxQejDN97xpls6g8RGui5+xhGMqHJwWOQAAQABJREFUeAHtXQd8VFX2PpOZdCD0Eqo0URBUVBDbWlAEFUTsvYuu9e8q7qooKFiwgK5dd9HVFbtrRRG7CMgKwlpo0oP0hPRMZv7nu2/OzMtkJplJ3qSQc395c3t537k53zv33feeq23rAX5SpwgoAoqAIqAIKAJBBJKCIQ0oAoqAIqAIKAKKgEFAyVEngiKgCCgCioAiEIaAkmMYIBpVBBQBRUARUASUHHUOKAKKgCKgCCgCYQgoOYYBolFFQBFQBBQBRUDJUeeAIqAIKAKKgCIQhoCSYxggGlUEFAFFQBFQBJQcdQ4oAoqAIqAIKAJhCCg5hgGiUUVAEVAEFAFFQMlR54AioAgoAoqAIhCGgJJjGCAaVQQUAUVAEVAElBx1DigCioAioAgoAmEIKDmGAaJRRUARUAQUAUVAyVHngCKgCCgCioAiEIaAkmMYIBpVBBQBRUARUASUHHUOKAKKgCKgCCgCYQgoOYYBolFFQBFQBBQBRUDJUeeAIqAIKAKKgCIQhoCSYxggGlUEFAFFQBFQBJQcdQ4oAoqAIqAIKAJhCCg5hgGiUUVAEVAEFAFFQMlR54AioAgoAopAo0Dgsb/fQ489fk/UsSL/3im3Rs2PJ0PJMR60tKwioAgoAopAvSGQl7ubzjp7dESCBDGeddZox8bmzkhvf5djrWlDioAioAgoAopAghCY+9m31K17Z0OQ3bp1po8+nGt6EmJ89dV36eb/m+xI7x5HWtFGFAFFQBFQBBSBOkDg2mtuN73AghQHixHEKHmSXhtfybE26GldRUARUAQUgTpHQEhQCNJpYsQJKTnWuVi1Q0VAEVAEFIHaIiAEiXbs4dq2K/VdbVsP8EtEfUVAEVAEFAFFQBEg0t2qOgsUAUVAEVAEFIEwBJQcwwDRqCKgCCgCioAioOSoc0ARUAQUAUVAEQhDQMkxDBCNKgKKgCKgCCgCSo46BxQBRUARUAQUgTAElBzDANGoIqAIKAKKgCKgzznqHFAEFIEmgkBjeWrN1UTk0bBPU8mxYctHR6cIKAK1RsBPGSk+6texlNKSfbVuLZENlHiT6NecFCooxaKekmQisa6ubSXH6hDSfEVAEWikCFiW4uhBu2nCidsokwmyMbhCJsYHZreht35sERiukmR9yE3vOdYH6tqnIqAI1AkCg7qU0N2nbGk0xAhQYOVOPGkrHdituE4w0k4iI6DkGBkXTVUEFIFGjYBlNZ4yKI+SGqHh5eIxj95/d0ACjeVeaaOeMJUGr+RYCRJNUAQUgcaNQIhM2jUrb7Sn0raZ1zb20DnZEjWYQASUHBMIrjatCCgC9YeAn/kEFlhjdRg6zkFd/SDgad26T/30rL0qAoqAIuA4Av4AoYBV/JScnMd+geO91EWDyckZ1Lp1L+4KNOkKEH0jZvu6AM3BPnS3qoNgalOKgCLQeBBYubUZ7SxM4QHXF+H4KSu9jPq2l3uLjQe7pjBSJcemIGU9R0VAEaiEwLPzetJ3v7ermF4X67C2tdIhPbbRtNFLKo5BYw0CASXHBiEGHYQioAjUGwJMiCHbMRRKzHisG6HmVqIhyUT3l5izaAqteopLFjeF89RzVAQUgT0GAdx/czOhpVJSUgYfLfhoXqOzcxlLUQjK8qsyHt1uN9/HTCaPx8V9JpkDHft8PnN4vX4qKyuj8vLKu2QtgxF9+C0ylm5rNHKtlGgE1HJMNMLaviKgCDiMADbdeJlivOQr58025VuZLNPI7W5HHnfrmPsKEaNsdpGqlVkrNTWZUtNSgmQoJcVPYtLE4UkmSktPMURZUlxKJSVlUoTHKFtPXcFdqHabNVhQAw0CASXHBiEGHcSehwAUYWUlu+edZ8M4I7+/mLze9UyWO8jt6cwP/qfFPDDLUrTLKhSGpZiRkcqWYnyq0s1WZUaGh1JSvFRYWFLJkgRR2m49xjxWLVh3CMQn8bobl/akCDRyBEIKtpGfSKMavs9fQL6y5UxmXcmd1LKasUNGdjlVtCBTUpIpMzO9mjaqzk5O9lBWlofyC4qorLTM9pgJ91zV+m3VzdZbLiz28rKtTPa72TouYOu9lBHkJWZXMrk8zcjt4iVuTxs+t8ZPLY3/DOptmmjHioAi0DARwH2/dUTJsowZfZQhq9FOjC62+GpPjPZem2Vm8NOWhVRqCFIIufrx2duo73BB/loqKlzPS8v8/GgKW9NuF1+AJJGf77fyXVcq9+aR17+LXCXrKDm1My8xZ9f3kGvVv5JjreDTyoqAItBQESgr28CWTbxf4mCFz0uptbUYI2GSyQRZXp7Py7+VN+tEKt9Q0pJcXjpycDJ1yOpJaze1pI1bd9PGLbtoNy8XFxWVkJ9PJ4WZJDktyViRPr+PvKU5fJ67KDW1J7mSYl/ibijnjHEoOTYkaehYFAFFoAIC6enWsmZRUVGF9NgifF/PF9uXLewrnLjHGItr1769KbZ1y5ZYipsyaHv37sJGc7/R7y+jXj28NP6Mg4nKvNSja0sq3l1EOT9vpE28ZLzs9x30A4eXr9pCm3fk8lJrGWU1T+eLAKLCot1sKf9CzZvv0ygJUskx5mmtBRWBpofA6WeMMy/4fP31N+vl5Pfff3/T77x582rUP3a0xuOwKzWWzTf77jeAjh95omn6kw8/op+XLoupG7SNJduSktKYykuhiVPu5uVM6x5pPPcqJ064Q5qokV9StJnat+5E3ZgUn355Hh2S254GdGpl7qN27tGWhvVvT1eOHUTFheX09ZIcmj1/NeVszaVvFv5Ge/fqQD27dKB5P66htMx+Neq/PispOdYn+tq3IhBA4MILz6ehQ4dWwOOD9z+g9z/40KT16duXbrrxenr4kem0YvnyCuUSFbGPCRbciy/+K1FdRW33pJNGspXlp5qSY9SGo2SkpsVmNfYfMCDYQq8+vWMmR1RCH/GSY7CzOg3sZEvQ2kiU5CqjEUN60af/XUkDOzSn0mR+bMXNj9KUuul/v66njdt3U7fstnTduAMpZ0cRDTtgL+qV3ZoemjmXSr355OZl1uSUTo6P/ujjjqY/HXcMfTFnLn0+53NH21dydBRObUwRqBkCIEZYZ+s3bAg2sGP79mC4rgMnjRpJgwYNoiVLfjJdw4LbsX1HkKzrYjy4IGjd2npuEeFEXxR4PG6zwSTSuWEJ9YCDBlOLrCyT3TawpIpIl67daNzZZ5n0vNxc+vGHRVTVUis2saAvrzc+qxYd3HXbnaafSD933zc5UnIN03y88zSPrVw3lfuT6d5nf6KLju/Kj6WU0Ze/bORnOlPp899yKOePYioo9tGB/TsTZ1FZYTF1aJdOf2asxt/5Hq1au5WXVZPJW5bDG3TaOb6LFcQIB1/JsYai1mqKQENHAMSYaAKIFYPFP/1EOPYfONBUef31Nyg9o3aPNcTat5QbdugQ2hi4WEA40djgzTfR3AEHD6Z9bdaivRwswS7dugaS2OfVz08++MhepFIYfdWEHCs1lKAENxXz4xkpTGY+Gja4J8187Udasz6H/nrpn8hftJOKmdff+XYFnX/iADrkoJ58zj6+v8u7b0H4fL/x198208Jf1lPzFqnG8vdjk07ZDrYerfu0Tg0bFqNYjk61Ke2o5ShIqK8INEAEunTtQm1bt6EC24aU/dmi27ZjO21YH7IynRo62h7CRJTJy6ivvRG6zwhiPGPcaWYc8+fNp8VLnH9ZNs41I80i4D579zXLzLKUe8EF59H6dRtoQ4AsC4uLHD9/jyf6522zWlgWYyw4x1K2qr5i6SPRZZKT+S0+vjRq0cxDg/tl0bK+vNO27d5EzZpTj3Y+Ki1z0fSbh9Mvq3bTU/9cSC7enNMigyirVQYdc2hPWrNpJz/bWUBpaR5emsW9Un7kw5/PvrPkCGvRaYtRsFVyFCTUVwQaIAKnnz6OunbpQu+/b917RBj34WBlPvLwo46OGOR05VVX0PIVK/gRiMrOz1s6MzIyTJl7p0x1jJzatGlD47nfznxudodxLF5svft5KBO22RxkKwCr8smnnqHtDi0/412pdeXqsq+anJPPV8iWXhm1a9uCunbIoHv/Mpy25PnJTXlsNbr4fqOfFq/NoxmvrKQF33xLl9x6G5Uzoe6VtZzvqSbTH9sLKDeXn+ss8TBBsgXKg/A0slcCKTkGZw7UAURYX077b8r440XV2HgS7p568mmzEef0008z+aeddipt2riRkO6s87MSSzd92EkXy6oYF6xUSX/iiccpPZ3NBIccyG3aQ4+Y8+zStau5r/lhYCOSdCF9j+IdoqNOGmUweIgvDmr2iIe0GsIb5xjaBSrpog/89MVncyklNYX2H3wg9e7bh8vCEvIZH60hjPmLNnA/cuyZZ9Cv//uZfl4WeRdrQyfH0jJeOuV7iVnNMymd9ygV5hdQa36OMTe/mIr8LspMc1HLzBQ6c0QvapdZyNZlOh3YxU8Zvk7kLy6mtIwUOvn4A6hruyx6e85S3pRTxi9sd/7iQzfkyFxOqC//CAntpIrGtf8qwKmDrPrFH8oypJxDpwvljx2q2KkKyypn0yYTrx0phNoPhSzFHopboUiEjXFGSg+vG0+8mBXqlKn3E3bIYjNQ2zatK+2Old2z33//Pc2c+VI8zVdbFs85hvCXuWC9/xR5ssFm29at1GfvvXmpEMQIHEIEia9t4PomhR8H6dq9K3Xr0d3Uk7rIbyzO7cYjLV7ylssjJy6+nejnh/pxFnwhx4+kZLd10V7ZzWnEEcfym3M2m3uNxd4k3sjjpeGH9aARR+5DWc1S6KflW+jXNX/w/cZ0KuP7kU66RG7IcZ7KnTxzbUsRUASMdQSCnD9/Pom1hKVIWFCJdiCAEGlYvVW0spwdAUhv8eIl5n6jvAAAPSA8ZMgQs3vWOWIECYYIC4QHZxE/0uXchSxNtskP4WIRpFXWusCxrMpQ2UDI8swvv7cn0JctsUEFi4rK+QH+Ylr++zZav3UHNc/ilxcUlPJr+XjsfEFQzkRZzhZkPluXBUX8jlU3Dx+fEcNaJG/kMUSaVk5Lf95Cazb+wYTp4w0+sT0mEw8Q2JADJ348dasr2wiXVa1JW92JxZZfk7ZqUifaaGrSVk3qaP+REagJljWpE7l3SzFXVLzRSsJStEjB6r81k+PIE0cQnoWsuat8LuEW4bzv54c1jzpOucr9o+WSkmJzHxHn3LtPH9PZSr7/iOXXggJs6nDGVTxXV8AatAjOugAInWu79h3Y8knhxzkO4M6xBJsUKI+xWDK0rEliUvHS+rVraNWKlQRLM0TAITL2+WBChdpHKw3JnXfRmZSXu5UvyJbR1Ge+o/tvOJyy2mTyOTMp+rxUUsr3n/keYxLHXbyRCXh5+ZxSPCmcxw/9p7XmR39cNOmJTyhvdy41y2jOVqjz59tkNuRYEzJcWYT/A4Xnh08pKS9+tHyk29uSJRR7GsqEtxOejzJ2J+XFt+chbE+3t6X9Y0kq3EqpiBfws2OGeLgTfMWPlo90e1v1i38B7+zr3Ikfkg4u11n3wOR/Ar7ddcnOjnK/Tc5bfHsthO3p4edvv+9m1du+fRsH7OWscPh4rNL4lfbFD+VYIXu6vd0Q/th0tJ7vcWKH6iGHHGK+oYiXACCta5eu4Q2GxdE+nL0fKyX8NzTXrL7Lyrxhb8exlo9R7qhjjqZs3rCEJVY46x6jhK0+UQ4EuXXzZnrvrXdsZWVeox9rXLCsKuJqtdVQfpNcGTTlgRt4uTSflixeSdtdOZTt3UBuPy+bpnoC9w95vvDLx10+/gC0p5yS+bGNXdvW02vvz+X8tjTzTX4Oclsupbg9bHGW8MvIoz8q01DO2z6OBmU5ymQVhWANFLMxfCJZkzE0uez58g8nvpyuvYzUR56UwxKKVdbqX/KQaK+LdKkvde35kiY+ysPZy0h9pEs57b8p4//hhx/T/gfuT4MOGESdmfiwK1Q2bVgWiTVPSkpKaO26dZg49MEH8iydfW6F5pMpFPyxl4k2/ywyqG7+V14StLddm/6t5dMOHTtSR75QwLl+xK9mw3iOOfYYs7QKTNLS0nizCN61Kn2F92+PBwGoFEC74jD38EJwK8naXIP/WaSjnJSFxYjNU6tXrqD33/4P57to1JiTqVefvtxU6OJCdBnat77dKHlWW2VluJcX6h/lGpL74P2FdM7lY6hF85Y08KD9qKxkb9q9bikl562gFP6IM9v3ZvRJqemUxI9xbNlZQo9P+5patFxNKzd5qXn6On7XainLDISYZJZUfX7exCUic+hkm9CGHGtSWxPLPsGBqH0iWQhjwloKNZSPyW2lYVIjLHmhq0CrLasNhKWO+KhjtS19ShsiUauu9q/4OzX/Pv98Ls2dO5fwnCEep4ACFhICIUg4hZf2vpj7BS3hB/Sdn3+W4gYxFxYWGqVuzfjQ/MeOVlH8zvdP1JeXUfFVjB9/XExvvvkW7eDnOaFRv5+/gMbxc5YDB+7Hb6TpSlhmjd6/9X+L/+eqHGRnlUFBF1s3Zbxk6OPHFKxlQj/fU4NDudy8XZTt72LkgvNfvOhHzrF0B8I9e/cJtMVlc3eZsSHf0iVWG9Z4XdxHOROxELDpIuafu6ZOCuIfc6UaFMTL0W+84i466dTD6NAjhpidut7mg6kgow8l807WZP4A1/rZX9CGj+fwG3Ca0Sr+hsXXy7bQfoPTaXDfXPrHG8XmvqSL54u3NI08GbwqwvcknXaJ3JBT75ajTBiAJuQkkz6UZ03CELChWS+T21JSVgn7PwXaCKQGq0udYIIJiAKwiBFJKGf9A0kbUiMUl7a0f8HGwk1iir/MFfEFn1Dcwsqaf126dDYKGGky/0GU9nh2dqfgQ/hOzr8N69ezRVZMDzxwn+kPP3KhaO8/Pz+fH+1Yb8o42T+fMb+FJ8M8pgLyh5P/P9xvfPrpZ2gQP1rShl8pt8Lq2PyPol74/18g27QR7ceamyAp3Ge05FJSXELujLRAFcjI0gc/LlxkvluYldXSyKWEcbKcn4r53uimAB65ebn01dzPOcuSr9UH2ggUZ6+Y+7DyWa8FyoVy7SFbJXtyHYVXrcylj96dS2eedRQl8QkUFJdRSXkm31NtwX4SdRzVm3z8SaptC+dTCz4m79+Let5xK61cs5nGpiyh5b+uorUrd1H/gTto/sJWCRl1It+Q4+rWda86loB0B2UQcqIIrMkk/xSh/EghmdDi28tESrPnIyz/+FJW/PBy0eJSXnx7uUhp9nyEtX+x0C3FFAtmdgylvPiR8uxp4WHFvzL+sAzxyIhgY8cMaXAgRmyWEdzFr1jWkqk9LTwsfUh98cPLRYtLefFD5SwdA0J6eOxuOrxXYSjLFprw3iD67vd2nGKRI4gQrlmzdL5nlmyIi292mDT7DwjNSkce+gKO8mgHiFoeAhBdh9pWWS8/7werTNwh3bbSg6NhhVZ289e2oVv+M5gzUFduu1QeT+WazqX02Ks9/eOl6/grHCnWh415HPn5Xr4X6aVV60r5/mMytWvfgnL5ZQ3bP/+cytb8QgPGn0e9hp9Gu3LX0ndf3EIzZhTTmnXOPRfr3NlV3VI9WI4h4QoRyhDtcUxs+eeR/HBfrsbEt+dHSrPnIyz9SVnxw8tFi0t58e3lIqXZ8xHW/i3lIViJH45TtLiUF99eLlKaPR9hxb8y/iA9LFnG4gRj8e11IqXZ8xFOPP5MKOZDuyEyso/B6h8YyBInwi4m/hJ+SbYHdBQco+gic4FgFeM81IOT5VPOMOrNsggtArVKyG9REe7XoRCXYZDQVHRnlQs0Gr1YAnPW/L6FLrngMX4G9Wzap39XjJrfl5pGLVv4aGcB0Vdvf03HHuyi5eX7UObwE6mj/xiibr1p8fLvaOPSu+jxJ9IbJTEC0joix8BsCgoRE8OKyKQLZtkC8s9jS9KgIqAIKAIxIZCczBYwrYle1ugg+8U60xBHy8v52b38QsrMxHterXwhQtFb4bopSHPcJj8JaPo0tyyDeo74MZQivtdofYlDiDnUe6RhorKUCDQUjEcqn5i031f/QWef+Shde/1IuvCSP3EneNYxifr3aU49rx9F3q0raeNrm+nlJ1+idh3KeQNPH2rbYhH9a1bbxAyojlqtI3K0zkYmFCYgnLUcIkK30mL9RVvmKs5UsE8iacGeZoWtOsiXCYewvRzi4uzp9rCVr/0r/jr/5P+o8v9Hxf8rK7/u/v/43Z+ezrwMWM3Lwnn4FulZy6qilzDO0lL+/hI7EGTFs0MM9ULz3+RbyZwDTHAEEzgMYuT3jJo2TWmTZgyDsHImo9IP6shSbaXMOkt4bPqH9NLML2nUqENo6GF9qU+fLtS+QxalZu9NY8Z2oDUrhtCXs7+mnI9+57Nq3MQIUBNMjjIR5N6G9c+EiRWrC01Cq47UNMTKIjDT0CRKDrccnJtWWpCEre7NxEb/ltWKAJezVbfy8Cv/BJYfapczuC1zHmF9mUphadq/DasApsBpz8Y/NKFU/nUnfzyf5/Zk86MDaYb4QlIw/5kVf0wmfvDGGpAdskFCSHOZh/m95fmUyRt0sIPWFBDdxYWt/3+jCLiGVQd15aLJzztfsZkKS6myqQrtWvpPyqPPaE4USf0To4xw164Cevnlz80haRX85Lr9rFmFvh2OJJgczWwzk8GaMKHlVJyHzLOK51SxjFUOE6mikxTxK+SGJQb74XR7ljVJuaY9MdCQVcfKsNcP9iN1xA9mVG7PXt9eXPsPoGEHZY/B35r7OB2Vvwi14r+ak/PfxWTodrdhaxG7SQ3qgU6je1j+NGPgi+PQ/UGkcR3DSz7ylbv4DS8FlJriMY8zeJgkTb6532juSgY6sIhM+i5nsi0tKeVnNS0LVPRfaDQgSblnGUqtEAoOBKnyTxKaVxXKasRxBBJMjpZAg1fOEYaPyYkD7+sLzUoUlMlgVZL5KjlmKkqRwHyRaSNlJdtqwdYkF6xUNlDJni71kBbepkmTDgKV7HWljrRhfFv5SmW1fyMUOy6CnWApPtJN2IanpMEPQBk2gwIZgYL2foJtccCejqJwJt/mB9O0f0ARBM2OnWBmFQj82vCqVDYgNHu61JW2xEeHSdgR6udPIfGGm6SkTI5nGvXhLedHLKBTIH345jVt0lJFv9xXxvcA+WUCpq2AxRdxAPzSbX6naEGhiwk4ybxFB89CQq+58MJ4btZn+uJXq/Er0sp4RyruW8JJcybCVmlSEr9/lF9AapElcgUUq0SFX1M5AIzJqNhahbIacRwBT1rq/g41GhIyzxMzceBbwg+fBFZZvF8whd9Fe9WVZ9FFl5xKLVpkOjQWbUYRUASaGgLBC+3AciaWMgtmn0PedbMjQvH443+j1L1GmjcR4UULOGRJNGKFWibm5RXQzH+8Q88+O4stSijJ6h6KFzKEvrTrUAlLfi0HptUjIlBLy9EiOUtwIjAQo9xjxMVbKN0aASxFhKzPn8ybP0tJMaJoNFERUAQSiUB5ztf8ncHdRl9BZ4EcE+nwIrXLTnDR2YePpin3Ps1vkCHq1TaeF6nbydAeTuSom27btSRHAGcnPwmD/UCC9rgFslnj56CPlzSuvPIcJUYLFv1VBBSBOkbA+/OzZD1YUccdc3e3HRtDn1iqZVWK5VtLz9r9GOprkVohUItLJRCgkZrNF6tQxmRMRFs+BG3V8fnLeSl1rBRUXxFQBBQBRcCOQEC9WgYFdKvoU/gStlfQsJMIeDryZ1hq6iAs66ImsIzKDVkiCwgOVz6cZi2zBnaGGYvSz2vu+Wo11hR4racIKAJ7PAIpqWnUoXM2b/rhTTx8tmZHLZZ+A+ak0b8BY2OPB6MeTtDz5dwZcXcLodgFA/LDzW/5egC+IIBD4njbvYSRjrrrAy/qjbtzraAIKAKKQDUIQCeZw9P43ukppzb4kIH08d+mmWcsoTPxqS740KXh+lfqqO8cArVYVhWLkL8Aza9EEoIE+eGBWRGgkCTyxaF86KFYSVVfEVAEFAFnEXB3PsrZBuuwtaSORxgjQ3SqGCAyBOhUkKS6xCBQY3IUoYAEccCJD/JDPoQKhzAEiwNhOUym/igCioAi4CACxmIMWI4pfc4id5dYdr84OAAHmnIxMSb1PtvoVOhVOScxKqBD4UTnOtClNhGGQI12q0JQsA5FUIjDiZUIHwQpQhWytJcT4YaNR6OKgCKgCNQYAegY0S0IJ3lSKOP4l6l01dtUnvMd+coif6Gjxh3WouKuXbsoPd36eDTGasabnEGu9odQap9xvDSHFwaEzgddmdfYBXzoX1MnYJzUYihaNQICcZMjJh7IT4QpbYoQJR3EiLI4EEYdCBMH4kKsUl99RUARUAScQEB0kPhJ7mRK6T2OfD3HBnUS+hESdaLPmrSRs2QJde7c2Xw7EjrR4/GYN+2kpODNP5ZqxjkgDz4c9KjoVDk/xCW/JuPQOpERiJscRVhoDmERlghMSFAIUSxIESB8OSIPSVMVAUVAEYgfAegj6BY4u56SuORLGVMwxp/pM56gwsIiuv66qykjo+LLtZGO/MzMDLru2vExtmhZgbAEQYri8JFlpGGM4kOnYuyI45C4/XwQVucsAnHfcxQyFMEgHi5EECOEKwJDGIcI1dlT0NYUAUVAEQghAL0jB3SRHEIuICMJx+oXFxfT8uXL6f4HHqLi4pJgfYSRhjx8KDrW9lBOxgi9iDHaSRJngzSUAWFKHCtuoltFp6KcOucRiBtVCAsOAoWDYCAkCctyKdJwYBJIWREs4lLHVNQfRUARUAQcQED0kxAPfOioeEgrUtmbbryOunfvzo+gbQgSpBAj0pCHMpHqRkvDuEB8IEUhOLOkGiBEqQdYEIbelPMTnSr1HIBOmwhDwMUkVaO9wCIctAeBgfggQCyjwskmHCFCe3ppaSlt3LiRDjnkEFNWfxQBRUARcBIBUWvR/Jr0hQ8WT77nPlq3bj2TYVfTxNq166lbt650x+0TzLJqPO3Onz+fevToYfSnECHIEjoTPvQq0uEQx7mADHGI/kUZIcx4+tay1SMQt+UoZCdXLIjLEW4ZQmhSXq58EEe61K9+iFpCEVAEFIH4EBDCgC/6RnwhmHj95s2b0cQ7/8rE2I1AijgQRhry4m1PdCB0I8LwoUNhPSIcfg5AQHQtyiNf9Gt86GjpWBAI3QmOpTSXEYHIREM1hHFVgwPCEsEhD0sGeEMOhG4nRqSpUwQUAUUgUQhAL8GJ9Sjx2vRn6b2QtZaUFLq/GW+70JOiN1EX+lEIEnHRo/ChL6FL4YQQhVSdOC/TsP5UQCBuy9GaHJZpL5YilkxFQBCYECTyIVRMALkSQhjlIXB1ioAioAgkGgHoJicO7EqdfM9UWrNmnbEYYTUijDTkxdsH9CMcdCH0oxyII090pBgV0r6UF5KUdhKNY1NrP26GgiDkSkwEiysaCEochAcCFEKEUFEPPhzqS1jqqK8IKAKKQENFAPcbJ02eEiRGLKXKEisIEnkoE4+DDoSOhLOvrolxYdeTKAcdGkn/Shvx9K1lq0cgbnKEIOTKBsK1kyKEiQNpyENYBIc6kq7EWL1gtIQioAg0HASmPfRoBWLEM4047AQ57aHpcQ0Y+lHIDvoRB5yQJvQl8uFEd4r+ldU6pKtLDAJxkyOGAaFCkBAiDggQvqRBgCgDJ8KVSYB0OUwB/VEEFAFFoIEjkJGRQfvu28+QIUhRnBAk8sJfDiBlovnQmdCF4ks5IUXoUazKIR+HONQRXYt0JUhBxlk/7kc5QHIiGCFFDAkCEyKUsFzt4NENCWP5AHF8smrYsGHOnk0ja23evHm0YcNGOv10fo+iOkVAEWhSCHz77bf8GEg3Sk1NNTpVVtmwWxU6FHGQH/QtwkKCCCNNdKqdOJsUgAk+2bh3q0IocBCeOAgJceSJuY+4/aoGebKujrC0I23U1L/44ktp7tzPI1Zfu3Z1xPTwxMWLl1BeXh4deeQR4VkJjT/88KO0YMFCGjNmdPAtGAntUBtXBBSBBoMAnl2EE/0JnSlpSBf9aSdG0ZtClFJf0hFX5wwCcZOjCAzdIwyhyBUM0hCHkLEcEG5lQshIw2EXLurV1Pl8fnP1de65Z1dowu2O/dT+9a+XCQQ5Z87sCm0kOnL//VNpx46dFf4hEt2ntq8IKAINAwExJDAa6E0hRhgR8tiGECPyoW9Fh0odpEHfqnMegdgZJNA3BAFBwQnJIW6/+kEZHMiH8OBQBkK3C9lkOPCz11496KqrrnSgpchN4FzkPCKXqH4HbqQ2evbsSfwX0UUqH16wujLV5Ye3p3FFQBGoOwREj+L/FA76EuQnb8ORdBClhFFGdKgYGNJO3Y28afQU94YcCAkCEmEBJrEcQSByJYN8hEWAEpc0SU80zF999TUdffSxNHv2J8GuZs16zaT9/vsaOvPMc+j119+gFStWmLRnn30uWO6f/5xJp5wyhnr06EWXXno5LVz4QzDvk08+NeXnzPmMRo06xZSBv2TJT8EyeFnxlCn30dChw0z+6aefaSxUKTB9+gy64oqKb/F//vkXeJn1NFP+7LPPpbfffkeKU07OZtPnO++8S+edd4Epg7bfeuvtYBkEXn11Fh133AkmH354foXCGlEEFIF6QQA6UKxHEBx0JHwxKkRnohzC4iMfYXH2sKSpX3sE4iZHuWpB17jKER8Cg4OgUAZ5QpYmg38gYEwG+E469Bl+SB+4j9inT1+68cb/o507d5p3ut5yywQ6+eSTaa+9etC1117D5DWUOnXqSLff/jf605+OMkN76qmnaeLEu+moo46ixx+fweMup3HjzqDffltu8vPz82n16t/p7rsn04UXXkB33nk7bd++zZChKcA/jzwynbBke+utt9DMmf8wHzYdPfpUQl24rVu3mvGYCP/MmPEYTZp0D49nCD355N+pa9eudMMNNxHIEK6srNT0ef31N9Jhhw2jhx+eRh07djLnVlhoPWOF+6+33nobjR59Ms2a9Yq5j4pzx71NdYqAItBwEIBFCD0phIg49Bh0F3QnnOgxxKWs5KEenPgmoj+OIRD3sqr0DAHZLUgIDnEICgIVshRBwseBCYA8SZf2auN//fU3THS9KzRxwgkn0DPPPGnS7r9/Ch177PGGeHCPb9CggXTddX82eYcffpghn+3bt3OZY0waiHDq1Pvp+uuvo5tuusGkHX/8cCbKo9nKfN2QqEnknwcfhGU41ESxHHLHHRNpy5Yt1L59e2Ml9u7dyxCxx+PmF60fTCtXrgpeVEgb8NHnQw89QldeeQVNmHCLyRo58kRD6LAwsWlHHMY0fvxVJrrvvvvQiBGj6Msvv6ITTxxBy5YtM+nnnnsutW7dioYMGUJjx46hDh06SHX1FQFFoAEgIIYC9KEQI/SnkJ3oSgxV9KrdtxOp1GkAp7XHDCFucpSrGvgiKElDHILGIWkIQ4hChgjDie8Ekvvs068CYaHNNm1aB5tu1aoVPfbYdDrnnPNM2hdfzA3e8A4WsgVWrVplYs899zxt2rQpmINlzc8+m1uhr/79+wfzBw4caMJ//GGR47hxY+nmm2+hww8/go4//ng64ojDmWCPNC8WDlYKBFauXGlC4TtmjznmaMISrlibKARyF9evXz8TlHEOHz7ckOzhhx/JS6vHct+H0fDhxxEwUKcIKAINBwHoSFlhw6igE6FDRY8iDWHoTll+RRiHlEUb6hKDQNzkCMFAICA9CBYOcTnChSlxqQNfBOzUKcFKAwlU5Vq2zApmu91VrybjOUy4gw8+mGD5iTv//HNpwIABEjU+ru7EwTq0Ozy/uP/+g+jjj2cT7n3OnPkiL/H2oTfffI2yskLjQR2v13oRu709pEsc/xziPB5rCzjiwNLucKGwaNEC+uij2YTnqP7yl1v5TR6ZvMT6b9pvv4pjt9fTsCKgCNQtAmIZCkHKblUQn+hI+IiLrpX/d+hf6FY40al1O/o9v7eQZo/xXCEIOAhWhIg4wpKHOIQoCh2Cle3JKCcvBUC5unD4Qvef/3wdnXTSKH4F1Fpzj27WrFf5HEJkVlJSEhxK3759TBiEe/nllwbTYTnG4zZs2MD3BDvyfc0/mwP3A/Fc5vz5C9iSHF6hqb59+5r4woULzT1Hyfz++/nmUZWWLVuaZzElPZqP+5jAHkSOA0u8Bx88lJeO31FyjAaapisC9YCAEB18kB186EroUehXhKFD5aUAIEMhQuRL2K536+E09tgu4yZHCBDCAMmJgxBFkEjHIYKG0MXKhKBRF0JGeafcpk05ZunR3h7al3uIDz74EGGp8403XqPNmzfTyJEn07PPPhu8bwdrCztWcWCjS3Z2tiGWe+65lzfRpBnrD7tQ//rX2809SNyLrM7hPC+66FIC6U6b9oC55wdLDk6I0N4G/gGwsWfatIeNVYnl2m+++YbH/Cbfx7zdXrTKMDYSPffcC2YZGVbrokX/NeVl+bXKypqpCCgCdYYADAY46ApYjfZVNtGjYoSgHPQo4nDIF8tRfJOhP44hEDc5QpBwEIhYhjIaIUQIDk58pAtJwnfS4XtqK1asYAuv8nOOeEPOd9/No+eff4EeffRhvg/ZxhxXX30V3XffA/xYxNHUr9/exqL85ptvzf1BbHTBhpi77rqLCdzDO0If5V2o282QkXfNNdeYMM4p3NnTEH7iiccJO2PPOOMsUxQ7YrELtUeP7hHbuPPOO8zkf/TRGaZPlL/llr/QZZddErF8eP+IX3fdtbwLdhtbqtebbCyp3nDD9XTqqadGKq5pioAiUE8ICNGJLkUcYTEcoEOgQ0Gc8JEP/Yt0lBFdirgSpPNCrPG7VUVIEAyEBOEhDQfiIliEkYZ8kCl8LKtiyfHQQw91/oxq0SJ2jPLpBCcnmsLYd+zYwdZcS56cNbN2sayLcw6/zxhtqOhz165dtdpEg3PJzd3FO1ZbG1lE60vTFQFFoH4Q+O6776hLly6UlpZm/kehM0GAID6EhRQlLqNEHDoCPhzCKK/OWQTithxFCPBBdHAI4xAhQahYMkAarmjkCkeukFCuIV7pRCI/nAMsztq49PR084xjrG2gz9ruLsW51HbcsY5XyykCikD8COD/HAeMBpAiDkkT/Yi4OKRBd8IhXfSvlJVy6juDQNXbNiP0IcKCLyQnQhKzH3ERInyQoxyI2wUboQtNUgQUAUVgj0fArjfFGsRJi66061HoTDlQRogSvrSDdHXOIRA3OaJrEBwEImQogrLfgxTyRHnk48AEkKUAxNUpAoqAItCUEYAeBBmK7oRuRZqdCIUk7WVQRwhVdWliZlCNGQoCgbAgTHEiUAhTBIZ8IUQIFHlySD31FQFFQBFoaghAX0IXQj+K7oQPJ4YHwrhNBSc6FWHUgT6161+kq3MOgRqRowgVwhKhYkh24UFwkicP1dsFby/r3OloS4qAIqAINC4EQJCiUyUMw0OIEz70qehMlJW46NTGdcaNY7Rxk6NdGBAWrlwgSBEY4rjqEWsRcZTDgTJSDgJXpwgoAopAU0dAdCR0I8LQjaIzEcYhliLSxUl5EKU65xEIIR1j20JqECIchCYCE1+WW1EWAoQTIUvcJOqPIqAIKAJNFAHRhfBFr4o+tetLezkhQtG/QqJNFMKEnnbc5AhhQFgQIkhQhCUClnwx+xGHIHGIIBEWgSf07LRxRUARUAQaKAKiA0GEQnYYKnQnVt/E2fOgd0X/opyQqpRV3zkE4iZHCEqEAiGJgMXH0ECCECLK4hCBQpAgVMRVqM4JUVtSBBSBxoeAkJ7oR+hQ6FbRnaJfxccZQm9G0r+N7+wb/ojjJkcISqxDCBEOQobQxEqUe5DIQ1gc8tUpAoqAIqAIhBAQvSg6FDliPAgRShxlcYgeRlkhWYTVOYdA3GwFIUEYEA7COORKB2G70BDGIU7qhadLvvqKgCKgCDQlBKAT8TYx+KJHERZdCizksQ6QIsgS+QhLOYTVOY9A3KgK2UF4cCIkCUN4cBAcHAQuZcVHnuSbQvqjCCgCikATQwC6FPoROhRh6E7RlyBEpIt+RTryRf+KnkW+usQgEDeyEI4IRAhOBCbCFIEKCUocAoazCzkxp6WtKgKKgCLQsBEQghM9KXoUo4YhgXzkSTmko4zoUdG/SFfnPAJxkyOEBqGA8CAoxCVNhChxyUd5CBS+1EV9dYqAIqAINFUEoB9FHyKMA3s0xGoUXCQPvuhb6FOJow11ziMQ2i8cY9siEPhCcAgL8UF4cJIGIWJNHcQp5Ik8WWePsVstpggoAorAHoUA9CB0ouhRhKEvZUc/0oU8oS/l8Q4xPlAWZdCOOucRiNt8gyAgEBwQIgQFwcGJIJGGfPgog3QRJMrJJEBYnSKgCCgCTREBMRagK0U/im61kyb0KPSu/UA5lLHr2KaIYSLPOW7L0S5QDAxCgtBAgnAgQji8TxV5iOMQkoQwpQ2E1SkCioAi0FQRgO6EHiwpKamwK1XID/nQn7AaxQhBHhzSRf9KHD7qqKs9AnGTowhGCA6khzSfj28e42CBIc/4zH0sWvKV84ePeaxlZaUmnacDl2Wrk9PVKQKKgCLQFBGA/iv3lrJutFbaeE0uoCv5fmKSh7xlJQYWs9Tqt3aqGv3LOra0pNQQptcXeuEKSFHIVAmy9jPKxSQW191cFBeLD+HSLYup4NvbyLt5Pm+xUrKrvUi0BUVAEVAEYkPAldyMUvYaSc0Ov5/cGe2CS6+orQQZG4bRSsVFjiBDWIUCesn25ZT35lHkL90drX1NVwQUAUVAEUgwAp42+1GrM74klztFCdIhrJNyzjmbcGy+6AIq+fG/lZrd+dA0+uOqK8gfuKcoZjtIsvinp5QYKyGmCYqAIqAI1C0C3u1LqXj1h+a2FYwYHOpqh4DHX1IcaIHBDAPUu24dFX42h1z8JWo/b7BxpaebqxIQo9lYs2tF7XrX2oqAIqAIKAKOIODd+ZvRy/ZNOo403EQb8WS/+XbUU8//4H2Tl37EEYYYcTUCUoT1iMOXnxe1rmYoAoqAIqAI1B0C2OQoFiN8WeWDry5+BJJKli2l8s2bK9X0FxcbqxEZmaNODuYDdOxQBUl6//gjmK4BRUARUAQUgfpDALpZDowCYXU1R8Cz7Za/mNppgwdTm0n3YIuTiRd+Ppf8hYWU3LMXpeyzD3lzciipQ4eg1Vj888/kz88nSovSuQvP4lS+YrELTK9oomCnyYqAIrDHIyC6MC496Mez4VWTnrS7xwOY4BP0pA0ZSiWLfqDiRYuoYPbHlDniRNNlwQcfGD/zpJOo6OuvaPvUKZR13fWUftxwc0WS/87bLKLoQvIe9gL52x1q2pAXBIiPB15zmGwPOuigBJ+eNq8IKAKKQMNEYMGCBZSdnU3JvKcDzzLKW3IkDF9uY+E+oiG9ZY+Q/38zop6QECP8uEg3aotNN8PTZuJdlPvC85T/xutUumyZIcfSX36hstWrKCkzkzKOPoby33zDIOTdsMEy29miLPphIaUNrmwZ2qG0Xg4Q+sYjBIbNPBA6nPj2OhpWBBQBRaApIADySklJMS9RgS5EHD7IEqQIhzj0qBgWVWlcIcamgF1dnKN5Q46nY0fTl+xcLfj4IxN3t21HsBBLli418bIVy8m3bSuV79jBb3bwkstjkVykgUKgbn7lUfgVjBAiXockL9KNVF/TFAFFQBHYkxFITU01pye6EKQIZ3RngCwRhg4FiYIwfUyg0dfrTHX9cQgBQ46wCOGSmrcwfvm2bcYvW7uGymb+04TxU/LTT/zQ/5uUcfIp5IGQ2AqM5iBUCBM+BIsrn7S0NJNWVFQUvEqKVl/TFQFFQBHYkxEAKcJYECMBJIg4LEhZasX7VMWShC4t3ZMBaWDn5tl+x+1UvPhHM6y0IUOM3/Lqa6joqy+DD/6XsuVYzLtaU/r3p+ZjxhC1aUvuHj34vrBlUUY6J7NEwMKHA0lCwCBIEbwIP1LdeNMW8f3Sed9+Re3adaTWbdtSB9441K5dO2rRogVl8tJwRIcb2zwJI20ailheExUBRUARcBABucUkOhHkhwMOaciHnrTHkW8tuJpk/UkgAp5i3oyDh/ubjzuDsDkHztO5MzU/+5xgt8V8f7Hkt1+p2cmjyd2hoxFam1smUN7rc7lMbrCcPQDhwsGHQGU9XJZZ7RPBXq8m4Y/ef4v65r1CyeuJVub66MdSDxV4U6nElcHvG2xD7rTWlJzZmjKzOlCL1u2pVet21IPJ/eCDD65Jd1pHEVAEFIFaI4AVNehHWI6yyga9KNajdIB8WJAoL69skTz1E4eAp8ML/yA3W4J4C040l3bQwdTpjbdwdzj02RS2zlJ69qLynE3RqhnBIxMCF2cnSnu65NfET0lJpX6d0ig7i8jLC/KeNCZm3A71F/IPH971VFbip6JSP+Xt9NHmdeW04BMvzf1gLP3lzkeCyxo16Ttana1bt1I6X3Q0a9YsWhFNVwSaNAI///wLTZp8X0QM7rxjAu277z4R8+oj8fU33qY333yHTjttDJ0+7lRHhmAnRJCk/UAHsBphPcpyq4Qd6VwbqRYBj6djp2oLoYCLr17E6hO/uoogPwgc5eFwRYTvPCLuFDGiXTxSkl9SRoVlqVTKk+mX1SW0aaeXUjz8Fp9yXsdPYuvVzev4HMdI2mel0OmHp9DnS96hKVNa0Z13TkIzjrivvvqabrzx/2j79u2mvUMOOZimT3+UOnWyNj050omtEZDwu+++R5dddoktVYOKQMNHoHv37tS9ezcz0AsvsFaqZr74iokjryE5ECMcfKfIUcgQt5tgHeKQNNGdEhedibi6ukHAuikYR18iHPhCelVVRxlcIcGX8hA8wtJWVfVjycN0cbNx6mYCLC8soq937E3HnfE38rh9lNmslfk2WmlxPhUXF1CJ103v//tO2rvNJurVIY3+/t4HNHHi5Fi6qbYMlj7Gj7+GJky4lc477xzCxqMbbriJ7rvvfpox49Fq69ekwJYtW+iee+6lyy+/tCbVtY4iUG8INGuWyXsCMkz//fvva3yJI68huXFsLb7B1iN8p/SW6ED7/gu0DX0JZ+8HOlPSGxIue/JYQuudcZwlhApB2YUXqbqdDCFcWI444BB30vl9sAyTaEeul/bqdwCNOvE4OuH442nz2qW0dN67lJ6WTCeOGEFjThpOXVt7KIWHUVrmC47HibFs3bqNCgoK6MgjjzDnh81A999/H1t1IeL65JNPacyY03jJaD8mtCsJlh8c6t188y0mfcSIkfT669azpcibxG8umjXrNQSNe/75F+ihhx6h5ctX0AUXXGzShg4dRl988aUJf/rpHDrllDGmrb/97Y7gUjjqTJ58j8kbNeoUqzH9VQQUgWoRgLU469UXHbMapUPoQSyXynOM0JlIg24V/Qpdi3QpI3XVTywCNWYoCFDIL9IQRbAoI4SISQBByxGpXk3TTD98NrlFPkptlk14C8933y+mjx4fT66vH6Lbrj6Vxl80ks4dN5xcuWvJk4oHbfEoirXkW9N+7fWyszvRgAED6OKLL6F///tVWrt2HbVu3YoGDtzPFPvll18NIZ522ljOf9lM9lt4YxPchAl/5fJrTfrVV483RPn999+bvG38aM3u3fyqvoDbvXs37dy5g3r06E733jvZpL7yyr/MBiMQ5mWXXUHnn38eIW3x4iU0bdrDpsyuXTvpuedeoIsuupAt2UekOfUVAUWgHhCAjoQuhH4UMhS9iSVW0a+yYxU6V13dIRD3siqGBgGC6ESQkYYLwUo+7jPK1RDKQvCOCxprq/xW+h0lburd70DCA7Z79+1BJ1zzBDVvlkLnb8rhZc4CWrl6EzUr+h+fRIoZNg/TUffii/+gJ598mi20e401eNBBg9l6nEq9e/emL7/8kk444QQmrnNNnw8/PI1+/HExk2Q5/ec/79HHH39I++zTjwYNGkg//LCI5sz5jIYOtXYQRxokdq917drFZPXs2dP4n332GR1zzNE0cuRIE7/uumvotttu5+NWEz/vvHNp7FhnNhSYBvVHEWgCCGBDjiyrOnXPUWATgoQPB7IUKxG6EunQt47rTBmA+hERiPtSRAgvYmu2RCkHkoRQhRyRLhakrXitg4bkmCB3FLtp0aKF9PGHb9EP87+gLt17siXZic65+Ea65sa7aeyZl1Kaiy1GJkUeiuOuTZs2dPvtf6X//e8neuutN/hcfXTVVdeYflauXEV9+/YJ9tmqVStDZBs3bjRpsATF9e7di1asWCXRmP3Zsz+luXM/5yXVAea44orxZnOQ/LO1a9c25ra0oCKQSATWrFlnVld62DbfIIwVF+Q1JAdihBPfybGJjoRuRBhkKDoTYRwgzOoMEifHpG2xERcvCBAUHIRYnRMhi8ARF9Ksrm68+WY0Lj9t2OmnpS9NpFw2qPJL+KMhvEln6WYvTfj7lzRkyIH0y0/fUoc0JkcXn7q/LN5uqiy/evVqWrBgIZ111pnmPAcPPpCXR2+ic88930xs7MxbtWp1sA1s4NnMnwvr0KG9Sfvjjy0kBLmJLV3ZyYd/jF27dgXrYVk1mjv66KOM9Tl16r3Rimi6ItAgELh70hQq5Pc0r2EyvHvS1OCYCgoK+RGPKfTC808F0+o7YN+Q49RYRBfCFwLE/zqIUfQs4nDQoUKeTvWv7VSNQNyWo1iAEFpVBCnEiPIoh0OuhkTQVQ8tjlyeXG7up7zES2277kWTXvieTpv0KV30wGd01tRPaepL83iTzDBeak2jwrwt1DKDX+TLHC+TM46eqiyakZFBt956G2/3fss8spKbm0uvvfY64XEO4DVs2DB6++13CI97gOCw9IrdrHit3rBhh/Imm4cJdZYuXUYvvviSSUOHIMw5c+YQCHPNmrXcxrvBccD6hMO9RVxZYhn2lVf+TfPnLzD3XZ955lm69NLLg+U1oAg0FAR69OjGqxv9eDh+M68xtxFGmlwYNpSxJmJDjugf6Eq7LsX/MZZTxdnzpI7kqZ84BEISiLEPCArCg0CrEpSdFEEMKC/1JB5jlzEUs66qyn1+ymEDK7+omDKSU7lPECCTc6mXPv30M9qZu5vyVs+ljn347Tllshmnegs4hgGYIh35Be6PPz7DEORNN91s0nAP8amnnjRhWJKTJ08yhIjnIPv06UNPPPG4yZs+/RG65pprefPOAeaVd1dccRmNGHGCyTv77LPoPX7k5NBDDyMs2+KepGDfmd9mdOKJI2j06FPp6aefNHUmTryDNwVdau55duvWjR57bLppR38UgYaEwMQ7/xocDqxIOHtaMHMPDQjpQR/i/xkHdCT2EiBP0uR/HTBInT0UkgZ1WnGTIwQlxBfLmeBel1wFoR5I0mmHCZWczEsTSSk0rO1a+vUFfs0dbGLmPZlkSZzAFE2n9EyjpJQ0Subl1rQUvPg3bgiqHP7JJ59Eo0aNNN+rhCUplp1UuuCC88yGHCwn2d/72r59e358Y5Z5NhKbiYCVOOTNmTPbWJuoY89DmaeeesI8riE4X3LJxUyOF5nyeL+sOBCzOkVAEYgfgURuyJH/Z+hGECWc6EnoNjsh2oky/rPQGvEgEDczQGhCONV1BEHahSn1wtOra6e6/J69+tDmJWXUvYOL/tQvnSiVd9pE3GzjotICHxUUe/nNOS7anl9OuXm51TUfdz4mOyy6aA7nbydGezm8ci6aa968ebSs4AuKpQD6sBOjpKuvCCgC8SMgG3HgO7lbFToRew9wYQtiRFwOiSMPZaBXkKeubhCImxyF7OTKprphQsBSVnwRfnV1Y80/48zzaNrP39PWH943r4zbVcCvkyv2UR4f2/N9HPbTroJyKvHzuwqJD36MIzm1Gfk9aXT4EdEflYi1fy2nCCgCtUMAqywN2SVqQw70I0gPetVaAbM+dCwvJRddiXIgSHV1h0CNyBHChCCrciJUlJHyEDDq4RCSraqNWLibGBAAAARrSURBVPMwkW6950l68MGeNG/ePPO5qrbd25r7c3vzJ6xatmxZ4cjKyjKbYLB8iTGpUwQUgfpF4OrxV9TvAKrpHdaikxYjuhMdKrrSrhPFkEAawtChcPYyJkF/EoZA3OQIQUGYIqyqRmYXLEgI9x+lbiz1q2o7PA/tT5hgvW0mPE/jioAi0LARkHeqNuxROjs66EfRhwjjgI6UPQd2gpR8lFdXNwjETY4QEoQmgos2TJSDw3o5rpDsdZCHJQIVdDT0NF0RUAT2dASgB6EbxVBAWIwI+EgX8oS+FJ26p+PSUM6vRuQowqzuJCBsHHAQthAkro5E8NW1ofmKgCKgCOyJCMhKGkgP+hC+HGJBghxFh+6JGDTkc4qbHCGoWCw+lEtmgYuFKTeTURdpmASxtNOQwdOxKQKKgCJQUwSEFKEH8f5peRQLcZClkCL0JeLQoaJPa9qn1osdgbjJERYgHIRZlXOV5pGvcIshQUOGXBhXQ3BJWCIo2U7e/M0mrj+KgCKgCDQ1BKADfYVp5ONbT8ZiTOadqqVsPULH8lHGpAiHPBNi0nSVFzY1mOrtfOMmR4xUrmyqGrX/u6v5sYmKTh5rT+Xk7nzsWFIxX2OKgCKgCDQVBHriRJeFzlb0pWVChNI1VD8ICF/F3LuY+riaUacIKAKKgCKgCOyJCMRNjlj7htP7hXvidNBzUgQUAUVAEQACcZMjLEYQoyHHpBqtyiryioAioAgoAg4j4HJbH3B3uNkm21zc5AhSxKYcHK5W+zRZ4PTEFQFFQBFoSAgksT6W213iN6TxNbaxxE2OOEG575jS/ypypbdrbOes41UEFAFFYI9CwN1xGCV3G27OSYnRGdG62BKM6X1EKCaHPLyKRzRKd66i0kVTqfyP+fydlYqPd4Q3bY+jrjzX48ypaCuKgCKgCDQeBKBHZQ8HRh2J1CKl2c/QldKC3N1GUPrgW8md2ty0Z1b1+PaXtF1dG/b2NBxCIC5yRDUQnDyviIdSEQbRSTp8HLAuw8NCqnhGMicnhw466KDQSDSkCCgCikATQmDBggWUnZ1tPjcnt6pAaBKGD92KNBzQp0iz+yA+pMHQkHLiI0+JseYTKuYdNQBZyA7gi+WHdCFChIUsITB7XISLssiDE7/mw9eaioAioAg0TgSgH5P5wX/oQdGX8JEG/QoneXaSRD0c0Kn2sJ0UGyciDWvUMZOjDFuIEUQpAkJYhIfPRyEMkhTBoS7KwKG+CBy+OkVAEVAEmiIC0JVw0IOw/ECKcNCbdksQaVIW+hMOOtZ+W8pOjHa9awrrT40QiIscATqEAh+CFCtQLEqkwwnpCUGiLML4FAvqFxUVmTakXI1GrpUUAUVAEWjECIDchBhxGtCjiIt+RRh6E8SIPBAg8sKPSHloT/QxwuriRyAuckTzADycDEF+EDQECfIDacqVD8JIF4JEXYRxKDnGLzCtoQgoAnsGAmJcQKdCH4r1h7NDGnQpiBFhHHB2nRlOlsiXcuIjTV3NEPh/8E647idCiCsAAAAASUVORK5CYII=");

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"content_script": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkchrome_extension_typescript_starter"] = self["webpackChunkchrome_extension_typescript_starter"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/content_script.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7O1dDQUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztXQ2hEQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvQ29tcG9uZW50cy9OYXYudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC9TZWxlY3Rpb24udHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC9pbmRleC50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvY29udGVudF9zY3JpcHQudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2xpYi9sb2NhbGUudHMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvYXNzZXRzL2ljb24xMjgucG5nIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2Fzc2V0cy9zZXR0aW5nR3VpZGUucG5nIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NyZWF0ZSBmYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhcm1vbnkgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5OYXYgPSB2b2lkIDA7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IGljb24xMjhfcG5nXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2Fzc2V0cy9pY29uMTI4LnBuZ1wiKSk7XG5mdW5jdGlvbiBOYXYocHJvcHMpIHtcbiAgICBjb25zdCBbY291bnQsIHNldENvdW50XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgwKTtcbiAgICBjb25zdCBbY3VycmVudFVSTCwgc2V0Q3VycmVudFVSTF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICB9LCBbXSk7XG4gICAgY29uc3QgaGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnTmF2IGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljaycpO1xuICAgICAgICBwcm9wcy5oYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2soKTtcbiAgICB9O1xuICAgIC8vIGNvbnN0IG9uTmF2TW91c2VEb3duID0gKGV2ZW50OmFueSk9PntcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ05hdjpvbk1vdXNlRG93bicpO1xuICAgIC8vICAgICBwcm9wcy5vbk1vdXNlRG93bihldmVudClcbiAgICAvLyB9XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Db25maWdQcm92aWRlciwgeyB0aGVtZToge1xuICAgICAgICAgICAgICAgIHRva2VuOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yUHJpbWFyeTogJyNGMDhBMjQnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBcIlNjb3V0ZXJOYXZcIiwgc3R5bGU6IHsgY3Vyc29yOiAnbW92ZScgfSwgb25Nb3VzZURvd246IHByb3BzLm9uTW91c2VEb3duIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBzcmM6IGljb24xMjhfcG5nXzEuZGVmYXVsdCB9KSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJyaWdodEJ0bkJveFwiLCBzdHlsZTogeyBmbGV4OiAxLCB0ZXh0QWxpZ246ICdyaWdodCcgfSB9LCBwcm9wcy5hZGRUb0Fua2lTdGF0dXMgPT0gJ3N1Y2Nlc3MnID8gJ+KchSBBZGRlZCB0byBBbmtpJyA6XG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc2l6ZTogXCJzbWFsbFwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHR5cGU9J2xpbmsnXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBwcm9wcy5hZGRUb0Fua2lTdGF0dXMgPT09ICdsb2FkaW5nJyA/IHRydWUgOiBmYWxzZSwgZGlzYWJsZWQ6IHByb3BzLmFkZFRvQW5raVN0YXR1cyA9PT0gJ3N0YW5kYnknID8gdHJ1ZSA6IGZhbHNlLCBvbkNsaWNrOiBoYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2sgfSwgXCJBZGQgdG8gQW5raVwiKSkpKSkpO1xufVxuZXhwb3J0cy5OYXYgPSBOYXY7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TZWxlY3Rpb24gPSB2b2lkIDA7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbi8vIGltcG9ydCBMYW5ndWFnZURldGVjdCBmcm9tIFwibGFuZ3VhZ2VkZXRlY3RcIjtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgbG9jYWxlXzEgPSByZXF1aXJlKFwiLi4vbGliL2xvY2FsZVwiKTtcbmNvbnN0IGxhbmdfMSA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbmNvbnN0IGljb25zXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7XG5mdW5jdGlvbiBTZWxlY3Rpb24ocHJvcHMpIHtcbiAgICBjb25zdCBbdGFyZ2V0TGFuZ3VhZ2UsIHNldFRhcmdldExhbmd1YWdlXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgnRW5nbGlzaCcpO1xuICAgIGNvbnN0IFtwbGF5U3RhdHVzLCBzZXRQbGF5U3RhdHVzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgLy8g6I635Y+W55So5oi36K6+572u55qE6K+t6KiA5L+h5oGvXG4gICAgbGV0IExhbmcgPSAoMCwgbG9jYWxlXzEudXNlQ3VycmVudExhbmd1YWdlKSgpO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICBzZXRUYXJnZXRMYW5ndWFnZShMYW5nWyd0YXJnZXQnXVsnbmFtZSddKTtcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcihvblN0b3JhZ2VDaGFuZ2UpO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLm9uQ2hhbmdlZC5yZW1vdmVMaXN0ZW5lcihvblN0b3JhZ2VDaGFuZ2UpO1xuICAgICAgICB9O1xuICAgIH0sIFtwcm9wc10pO1xuICAgIC8vIOivremfs+aSreaKpVxuICAgIGNvbnN0IHNwZWFrZXIgPSAoKSA9PiB7XG4gICAgICAgIC8vIOivhuWIq+ivreiogFxuICAgICAgICAvLyBjb25zdCBsbmdEZXRlY3RvciA9IG5ldyBMYW5ndWFnZURldGVjdCgpO1xuICAgICAgICAvLyBsbmdEZXRlY3Rvci5zZXRMYW5ndWFnZVR5cGUoJ2lzbzInKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhsbmdEZXRlY3Rvci5kZXRlY3QocHJvcHMudGV4dCwgMikpO1xuICAgICAgICAvLyDmmoLlgZzkuIrkuIDmrKHmkq3miqXku7vliqFcbiAgICAgICAgc3BlZWNoU3ludGhlc2lzLmNhbmNlbCgpO1xuICAgICAgICBjb25zdCB1dHRlcmFuY2UgPSBuZXcgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKHByb3BzLnRleHQpO1xuICAgICAgICAvLyDor63np41cbiAgICAgICAgdXR0ZXJhbmNlLmxhbmcgPSBsYW5nXzEubGFuZ3VhZ2VDb2Rlc1t0YXJnZXRMYW5ndWFnZV07XG4gICAgICAgIGNvbnNvbGUubG9nKGxhbmdfMS5sYW5ndWFnZUNvZGVzW3RhcmdldExhbmd1YWdlXSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRhcmdldExhbmd1YWdlKTtcbiAgICAgICAgLy8g6K+t6YCfXG4gICAgICAgIGlmIChwbGF5U3RhdHVzKSB7XG4gICAgICAgICAgICAvLyDln7rmlbDmrKHmkq3mlL7ml7bph4fnlKjmhaLpgJ/mkq3mlL7vvIzorqnnlKjmiLflj6/ku6XlkKznmoTmm7TmuIXmpZpcbiAgICAgICAgICAgIHV0dGVyYW5jZS5yYXRlID0gMC42O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdXR0ZXJhbmNlLnJhdGUgPSAwLjg1O1xuICAgICAgICB9XG4gICAgICAgIHNldFBsYXlTdGF0dXMoIXBsYXlTdGF0dXMpO1xuICAgICAgICAvLyDlvIDmkq3lkKdcbiAgICAgICAgc3BlZWNoU3ludGhlc2lzLnNwZWFrKHV0dGVyYW5jZSk7XG4gICAgfTtcbiAgICBjb25zdCBvblN0b3JhZ2VDaGFuZ2UgPSAoY2hhbmdlcywgYXJlYSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhjaGFuZ2VzKTtcbiAgICAgICAgLy8g5pu05paw55uu5qCH6K+t6KiAXG4gICAgICAgIGlmICgndGFyZ2V0TGFuZ3VhZ2UnIGluIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2VzJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjaGFuZ2VzWyd0YXJnZXRMYW5ndWFnZSddWyduZXdWYWx1ZSddKTtcbiAgICAgICAgICAgIHNldFRhcmdldExhbmd1YWdlKGNoYW5nZXNbJ3RhcmdldExhbmd1YWdlJ11bJ25ld1ZhbHVlJ10pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBpZDogXCJTY291dGVyU2VsZWN0aW9uXCIgfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBwcm9wcy50ZXh0KSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHsgZGlzcGxheTogJ2lubGluZS1ibG9jaycgfSwgc2l6ZTogXCJzbWFsbFwiLCB0eXBlOiBcInRleHRcIiwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5DdXN0b21lclNlcnZpY2VPdXRsaW5lZCwgbnVsbCksIG9uQ2xpY2s6IHNwZWFrZXIgfSkpKSk7XG59XG5leHBvcnRzLlNlbGVjdGlvbiA9IFNlbGVjdGlvbjtcbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUG9wdXBDYXJkID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCByZWFjdF9tYXJrZG93bl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdC1tYXJrZG93blwiKSk7XG5jb25zdCBOYXZfMSA9IHJlcXVpcmUoXCIuLi9Db21wb25lbnRzL05hdlwiKTtcbmNvbnN0IFNlbGVjdGlvbl8xID0gcmVxdWlyZShcIi4vU2VsZWN0aW9uXCIpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCB7IFRleHRBcmVhIH0gPSBhbnRkXzEuSW5wdXQ7XG5jb25zdCBzZXR0aW5nR3VpZGVfcG5nXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2Fzc2V0cy9zZXR0aW5nR3VpZGUucG5nXCIpKTtcbmNvbnN0IGxvY2FsZV8xID0gcmVxdWlyZShcIi4uL2xpYi9sb2NhbGVcIik7XG5sZXQgY3VycmVudExhbmd1YWdlO1xubGV0IHRhcmdldExhbmd1YWdlO1xuZnVuY3Rpb24gUG9wdXBDYXJkKHByb3BzKSB7XG4gICAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoW10pO1xuICAgIGNvbnN0IFtvcGVuQXBpQW5zZXIsIHNldG9wZW5BcGlBbnNlcl0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoJycpO1xuICAgIGNvbnN0IFtvcGVuQXBpQW5zZXIyLCBzZXRvcGVuQXBpQW5zZXIyXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgnJyk7XG4gICAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh0cnVlKTtcbiAgICAvLyBzdGFuZGJ5LG5vcm1hbCxsb2FkaW5nLHN1Y2Nlc3NcbiAgICBjb25zdCBbYWRkVG9BbmtpU3RhdHVzLCBzZXRBZGRUb0Fua2lTdGF0dXNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKCdzdGFuZGJ5Jyk7XG4gICAgY29uc3QgW2lzQW5zd2VyRG9uZTEsIHNldEFuc3dlckRvbmUxXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3QgW2lzVXNlckFuc3dlcmVkLCBzZXRJc1VzZXJBbnN3ZXJlZF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtpc0Fuc3dlckRvbmUyLCBzZXRBbnN3ZXJEb25lMl0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtpc0Vycm8sIHNldElzRXJyb10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtpc0Fuc3dlcklucHV0ZWQsIHNldElzQW5zd2VySW5wdXRlZF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtrZXlXb3JkLCBzZXRLZXlXb3JkXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgnJyk7XG4gICAgY29uc3QgW3NlbnRlbmNlLCBzZXRTZW50ZW5jZV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoJycpO1xuICAgIC8vIOeql+WPo+aLluaLvemAu+i+kVxuICAgIGNvbnN0IFtkcmFnZ2luZywgc2V0RHJhZ2dpbmddID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICAvLyBjb25zdCBbcG9zaXRpb24sIHNldFBvc2l0aW9uXSA9IHVzZVN0YXRlKHsgeDogMTAsIHk6IDEwIH0pO1xuICAgIC8vIGNvbnN0IFtvZmZzZXQsIHNldE9mZnNldF0gPSB1c2VTdGF0ZSh7IHg6IDAsIHk6IDAgfSk7XG4gICAgY29uc3Qgd2luZG93RWxlbWVudCA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3QgW2Zvcm1dID0gYW50ZF8xLkZvcm0udXNlRm9ybSgpO1xuICAgIGNvbnN0IGFuc3dlclZhbHVlID0gYW50ZF8xLkZvcm0udXNlV2F0Y2goJ2Fuc3dlcicsIGZvcm0pO1xuICAgIC8vIGNvbnN0IFtjb252ZXJzYXRpb25MaXN0LCBzZXRDb252ZXJzYXRpb25MaXN0XSA9IHVzZVN0YXRlPHsgdHlwZTogc3RyaW5nLCBpc0xvYWRpbmc6IGJvb2xlYW4sIGNvbnRlbnQ6IHN0cmluZyB9W10+KFt7ICd0eXBlJzogJ2FpJywgJ2lzTG9hZGluZyc6IHRydWUsICdjb250ZW50JzogJycgfV0pO1xuICAgIGxldCBMYW5nID0gKDAsIGxvY2FsZV8xLnVzZUN1cnJlbnRMYW5ndWFnZSkoKTtcbiAgICBjdXJyZW50TGFuZ3VhZ2UgPSBMYW5nWydjdXJyZW50J11bJ25hbWUnXTtcbiAgICB0YXJnZXRMYW5ndWFnZSA9IExhbmdbJ3RhcmdldCddWyduYW1lJ107XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIC8vIE5ldyBUYXNrXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCcjIyBQb3B1cENhcmQgdXNlRWZmZWN0JylcbiAgICAgICAgLy8g5b2T5YmN6YCJ5Lit55qE5paH5a2XXG4gICAgICAgIGxldCBrZXlXb3JkID0gcHJvcHMuc2VsZWN0aW9uLnRvU3RyaW5nKCk7XG4gICAgICAgIC8vIOmAieS4reaWh+Wtl+aJgOWcqOeahOauteiQvVxuICAgICAgICBsZXQgc2VudGVuY2UgPSBwcm9wcy5zZWxlY3Rpb24uYW5jaG9yTm9kZS5kYXRhO1xuICAgICAgICAvLyDorr7nva7nqpflj6PnmoTpu5jorqTkvY3nva5cbiAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQuY3VycmVudCkge1xuICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIGJvdW5kYXJpZXNcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50V2lkdGggPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gd2luZG93RWxlbWVudC5jdXJyZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IG1pblggPSAwO1xuICAgICAgICAgICAgY29uc3QgbWluWSA9IDA7XG4gICAgICAgICAgICBjb25zdCBtYXhYID0gd2luZG93V2lkdGggLSBlbGVtZW50V2lkdGg7XG4gICAgICAgICAgICBjb25zdCBtYXhZID0gd2luZG93SGVpZ2h0IC0gZWxlbWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ggPSBtYXhYIC0gMjA7XG4gICAgICAgICAgICBjb25zdCBuZXdZID0gcHJvcHMuc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudC5vZmZzZXRUb3AgKyBwcm9wcy5zZWxlY3Rpb24uYW5jaG9yTm9kZS5wYXJlbnRFbGVtZW50LmNsaWVudEhlaWdodCArIDIwO1xuICAgICAgICAgICAgY29uc3QgY2xhbXBlZFggPSBNYXRoLm1heChtaW5YLCBNYXRoLm1pbihuZXdYLCBtYXhYKSk7XG4gICAgICAgICAgICBjb25zdCBjbGFtcGVkWSA9IE1hdGgubWF4KG1pblksIE1hdGgubWluKG5ld1ksIG1heFkpKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb3BzLnNlbGVjdGlvbi5nZXRSYW5nZUF0KDApKTtcbiAgICAgICAgICAgIHdpbmRvd0VsZW1lbnQuY3VycmVudC5zdHlsZS5sZWZ0ID0gYCR7Y2xhbXBlZFh9cHhgO1xuICAgICAgICAgICAgd2luZG93RWxlbWVudC5jdXJyZW50LnN0eWxlLnRvcCA9IGAke2NsYW1wZWRZfXB4YDtcbiAgICAgICAgfVxuICAgICAgICBzZXRLZXlXb3JkKGtleVdvcmQpO1xuICAgICAgICBzZXRTZW50ZW5jZShzZW50ZW5jZSk7XG4gICAgICAgIC8vIOiuvue9ruWKoOi9veeKtuaAgVxuICAgICAgICAvLyBzZXRJc0xvYWRpbmcodHJ1ZSlcbiAgICAgICAgY29uc29sZS5sb2coJ0xhbmc6Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKExhbmcpO1xuICAgICAgICAvLyDlpoLmnpzljoblj7LorrDlvZXkuK3lrZjlnKjorrDlvZXvvIzliJnkuI3ph43lpI3or7fmsYIgQVBJ77yM55u05o6l5pi+56S65Y6G5Y+y6K6w5b2V55qE5L+h5oGvXG4gICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7IFwiaGlzdG9yeVwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtLmhpc3RvcnkpO1xuICAgICAgICAgICAgLy8g5aaC5p6c6K6w5b2V5bey5a2Y5Zyo77yM5YiZ5LiN6YeN5aSN5L+d5a2YXG4gICAgICAgICAgICBsZXQgYmluZ28gPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbS5oaXN0b3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9iaiA9IGl0ZW0uaGlzdG9yeVtpXTtcbiAgICAgICAgICAgICAgICBpZiAob2JqLmtleVdvcmQgPT09IGtleVdvcmQgJiYgb2JqLnNlbnRlbmNlID09PSBzZW50ZW5jZSkge1xuICAgICAgICAgICAgICAgICAgICBiaW5nbyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIC8vIOebtOaOpeaYvuekuuWOhuWPsuiusOW9leS4reeahOWbnuetlFxuICAgICAgICAgICAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBzZXRvcGVuQXBpQW5zZXIob2JqLmFuc3dlcik7XG4gICAgICAgICAgICAgICAgICAgIHNldEFuc3dlckRvbmUxKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoJ25vcm1hbCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWJpbmdvKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN5c3RlbVByb21wdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJyb2xlXCI6IFwic3lzdGVtXCIsIFwiY29udGVudFwiOiBgQXMgYSBsYW5ndWFnZSBleHBlcnQuXG4gICAgICAgICAgLSBQbGVhc2Ugc3RyaWN0bHkgYWRoZXJlIHRvIHRoZSBsYW5ndWFnZSByZXF1ZXN0ZWQgYnkgdGhlIHVzZXIgd2hlbiBwcm92aWRpbmcgeW91ciByZXNwb25zZS5cbiAgICAgICAgICAtIFBsZWFzZSBhbnN3ZXIgdGhlIHF1ZXN0aW9uIHVzaW5nIE1hcmtkb3duIHN5bnRheCwgaW5jbHVkaW5nIGJ1dCBub3QgbGltaXRlZCB0bzogXG4gICAgICAgICAgICAtIEhlYWRpbmdzOiAjIywgIyMjXG4gICAgICAgICAgICAtXHRMaXN0czogLSwgMS4gXG4gICAgICAgICAgICBObyBhZGRpdGlvbmFsIGxhbmd1YWdlYFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbGV0IHVzZXJQcm9tcHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwicm9sZVwiOiBcInVzZXJcIiwgXCJjb250ZW50XCI6IGAxLiBVc2luZyAke0xhbmdbJ2N1cnJlbnQnXVsnbmFtZSddfSBleHBsYW5hdG9yeSBwYXJ0IG9mIHNwZWVjaFxuICAgICAgICAgICAgMi4gRXhwbGFuYXRpb246ICR7TGFuZ1snY3VycmVudCddWydQcm9tcHQxJ11bJ2V4cGxhbmF0aW9uJ119LiBcbiAgICAgICAgICAgIDMuIEV4YW1wbGUgc2VudGVuY2VzOiBQcm92aWRlICR7TGFuZ1sndGFyZ2V0J11bJ25hbWUnXX0gZXhhbXBsZSBzZW50ZW5jZXMgd2l0aCB0aGUgc2FtZSBtZWFuaW5nIG9yIGZ1bmN0aW9uLCBhbG9uZyB3aXRoIHRoZWlyIHRyYW5zbGF0aW9ucy5cbiAgICAgICAgICAgIDQuIFRyYW5zbGF0aW9uIHF1ZXN0aW9uOiBCYXNlZCBvbiB0aGUgd29yZCwgUHJvdmlkZSAyIHNpbXBsZSBzZW50ZW5jZXMgdG8gdHJhbnNsYXRlIHRoZSAke0xhbmdbJ2N1cnJlbnQnXVsnbmFtZSddfSBzZW50ZW5jZXMgaW50byAke0xhbmdbJ3RhcmdldCddWyduYW1lJ119LlxuICAgICAgICAgICAgUGxlYXNlIHJlcGx5IFwiWWVzXCIgaWYgeW91IHVuZGVyc3RhbmQuYFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbGV0IGFzc2lzdGFudFByb21wdCA9IHsgXCJyb2xlXCI6IFwiYXNzaXN0YW50XCIsIFwiY29udGVudFwiOiAnWWVzJyB9O1xuICAgICAgICAgICAgICAgIGxldCB1c2VyUHJvbXB0MiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJyb2xlXCI6IFwidXNlclwiLCBcImNvbnRlbnRcIjogYFdvcmQ6XCIke2tleVdvcmR9XCIsIHNlbnRlbmNlOiBcIiR7c2VudGVuY2UubGVuZ3RoIDw9IGtleVdvcmQubGVuZ3RoID8gcHJvcHMuc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmlubmVyVGV4dCA6IHNlbnRlbmNlfVwiXG4gICAgICAgICAgYFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy8g5YWz6ZSu5a2X6ZW/5bqm6L6D6ZW/5pe277yM5oyJ54Wn5Y+l5a2Q6L+b6KGM5aSE55CGXG4gICAgICAgICAgICAgICAgaWYgKGtleVdvcmQubGVuZ3RoID4gMjApIHtcbiAgICAgICAgICAgICAgICAgICAgc3lzdGVtUHJvbXB0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJyb2xlXCI6IFwic3lzdGVtXCIsIFwiY29udGVudFwiOiBgQXMgYW4gQUkgbGFuZ3VhZ2UgZXhwZXJ0LCB0cmFuc2xhdGUgdGhlIHNlbnRlbmNlLCBhbmFseXplIHRoZSBvcmlnaW5hbCBzZW50ZW5jZSBhbmQgZXhwbGFpbiB0aGUgZ3JhbW1hciBpbnZvbHZlZC5cbiAgICAgICAgICAgIC0gUGxlYXNlIHN0cmljdGx5IGFkaGVyZSB0byB0aGUgbGFuZ3VhZ2UgcmVxdWVzdGVkIGJ5IHRoZSB1c2VyIHdoZW4gcHJvdmlkaW5nIHlvdXIgcmVzcG9uc2UuXG4gICAgICAgICAgLSBQbGVhc2UgYW5zd2VyIHRoZSBxdWVzdGlvbiB1c2luZyBNYXJrZG93biBzeW50YXgsIGluY2x1ZGluZyBidXQgbm90IGxpbWl0ZWQgdG86IFxuICAgICAgICAgICAgLSBIZWFkaW5nczogIyMsICMjI1xuICAgICAgICAgICAgLVx0TGlzdHM6IC0sIDEuIFxuICAgICAgICAgICAgTm8gYWRkaXRpb25hbCBsYW5ndWFnZWBcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdXNlclByb21wdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicm9sZVwiOiBcInVzZXJcIiwgXCJjb250ZW50XCI6IGAxLiAke0xhbmdbJ2N1cnJlbnQnXVsnUHJvbXB0MiddWyd0cmFuc2xhdGUnXX0gMi4gRXhwbGFuYXRpb246ICR7TGFuZ1snY3VycmVudCddWydQcm9tcHQyJ11bJ2V4cGxhbmF0aW9uJ119IFxuICAgICAgICAgICAgICAzLiBFeGFtcGxlIHNlbnRlbmNlczogUHJvdmlkZSAyICR7TGFuZ1sndGFyZ2V0J11bJ25hbWUnXX0gZXhhbXBsZSBzZW50ZW5jZXMgYW5kIHNob3cgdGhlaXIgdHJhbnNsYXRpb25zLiBcbiAgICAgICAgICAgICAgNC4gVHJhbnNsYXRpb24gcXVlc3Rpb246IEJhc2VkIG9uIHRoZSBncmFtbWFyIGtub3dsZWRnZSBwb2ludHMgbWVudGlvbmVkLCBQcm92aWRlIDIgc2ltcGxlIHRlc3QgcXVlc3Rpb25zIHRvIHRyYW5zbGF0ZSB0aGUgJHtMYW5nWydjdXJyZW50J11bJ25hbWUnXX0gc2VudGVuY2VzIGludG8gJHtMYW5nWyd0YXJnZXQnXVsnbmFtZSddfVxuICAgICAgICAgICAgICBQbGVhc2UgcmVwbHkgXCJZZXNcIiBpZiB5b3UgdW5kZXJzdGFuZC5gXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHVzZXJQcm9tcHQyID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJyb2xlXCI6IFwidXNlclwiLCBcImNvbnRlbnRcIjogYFNlbnRlbmNlOiBcIiR7a2V5V29yZH1cImBcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHByb21wdCA9IFtzeXN0ZW1Qcm9tcHQsIHVzZXJQcm9tcHQsIGFzc2lzdGFudFByb21wdCwgdXNlclByb21wdDJdO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGtleVdvcmQpO1xuICAgICAgICAgICAgICAgIGdldEdQVE1zZyhwcm9tcHQsICdhczEnLCBrZXlXb3JkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSwgW3Byb3BzXSk7XG4gICAgLy8g56qX5Y+j5ouW5ou95pe26Kem5Y+RXG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZVVwKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1c2VFZmZlY3QgcmV0dXJuJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVNb3VzZU1vdmUpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNlVXApO1xuICAgICAgICB9O1xuICAgIH0sIFtkcmFnZ2luZ10pO1xuICAgIC8vIOS/neWtmOWOhuWPsuiusOW9lVxuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAvLyDlnKggb3BlbkFwaUFuc2VyIOabtOaWsOWQjuWwhuWFtuS/neWtmOWIsOa1j+iniOWZqOWtmOWCqOS4rVxuICAgICAgICAvLyDlsIbmn6Xor6LorrDlvZXkv53lrZjotbfmnaVcbiAgICAgICAgY29uc3QgbmV3SGlzdG9yeSA9IHsgJ2tleVdvcmQnOiBrZXlXb3JkLCAnc2VudGVuY2UnOiBzZW50ZW5jZSwgJ2Fuc3dlcic6IG9wZW5BcGlBbnNlciwgJ3NvdXJjZSc6IHdpbmRvdy5sb2NhdGlvbi5ocmVmIH07XG4gICAgICAgIGlmIChrZXlXb3JkICE9PSAnJyAmJiBzZW50ZW5jZSAhPT0gJycgJiYgb3BlbkFwaUFuc2VyICE9PSAnJykge1xuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuZ2V0KHsgXCJoaXN0b3J5XCI6IFtdIH0pLnRoZW4oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtLmhpc3RvcnkpO1xuICAgICAgICAgICAgICAgIGxldCBuZXdIaXN0b3J5TGlzdCA9IFtdO1xuICAgICAgICAgICAgICAgIGxldCBiaW5nbyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG5ld0hpc3RvcnlMaXN0LnB1c2gobmV3SGlzdG9yeSk7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbS5oaXN0b3J5KSkge1xuICAgICAgICAgICAgICAgICAgICAvLyDlpoLmnpzorrDlvZXlt7LlrZjlnKjvvIzliJnkuI3ph43lpI3kv53lrZhcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtLmhpc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBpdGVtLmhpc3RvcnlbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmtleVdvcmQgPT09IG5ld0hpc3RvcnlbJ2tleVdvcmQnXSAmJiBvYmouc2VudGVuY2UgPT09IG5ld0hpc3RvcnlbJ3NlbnRlbmNlJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5nbyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbmV3SGlzdG9yeUxpc3QgPSBpdGVtLmhpc3Rvcnk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0hpc3RvcnlMaXN0LnVuc2hpZnQobmV3SGlzdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0hpc3RvcnlMaXN0LnNwbGljZSgxMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghYmluZ28pIHtcbiAgICAgICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpc3Rvcnk6IG5ld0hpc3RvcnlMaXN0XG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIFtpc0Fuc3dlckRvbmUxXSk7XG4gICAgLy8g5L2/55SoIHR5cGUg5p2l5Yy65YiG5b2T5YmN6K+35rGC55qE5piv56ysIDEg5Liq562U5qGI6L+Y5pivIOesrCAyIOS4quetlOahiO+8jOagueaNruS4jeWQjOeahCB0eXBlIOa4suafk+S4jeWQjOeahCBVSVxuICAgIGNvbnN0IGdldEdQVE1zZyA9IChwcm9tcHQsIHR5cGUsIGtleVdvcmQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHlwZSA9IHR5cGUgfHwgJ2FzMSc7XG4gICAgICAgIGtleVdvcmQgPSBrZXlXb3JkIHx8ICcnO1xuICAgICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICAgIC8vIOivt+axgiBiYWNrZ3JvdW5kIOiOt+WPluaVsOaNrlxuICAgICAgICAvLyDkvb/nlKjplb/ov57mjqVcbiAgICAgICAgbGV0IHBvcnQgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgICAgICAgICBuYW1lOiAncG9wdXAtbmFtZSdcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOWcqOa2iOaBr+WOhuWPsuS4reaPkuWFpeaWsOiusOW9lVxuICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4gWy4uLnByZXZNZXNzYWdlcywgeyAnY29udGVudCc6ICcnLCAncm9sZSc6ICdhc3Npc3RhbnQnLCAnbG9hZGluZyc6IHRydWUgfV0pO1xuICAgICAgICAvLyDkvb/nlKggcG9zdE1zIOWPkemAgeS/oeaBr1xuICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnZ2V0R1BUTXNnJywgJ21lc3NhZ2VzJzogcHJvbXB0LCAna2V5V29yZCc6IGtleVdvcmQgfSk7XG4gICAgICAgIC8vIOaOpeaUtuS/oeaBr1xuICAgICAgICBwb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihtc2cgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3BvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyJyk7XG4gICAgICAgICAgICAvLyDor7fmsYIgR1BUIOaVsOaNruWksei0pVxuICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT09ICdlcnJvJykge1xuICAgICAgICAgICAgICAgIHR5cGUgPT09ICdhczInID8gc2V0b3BlbkFwaUFuc2VyMihtc2cuY29udGVudCkgOiBzZXRvcGVuQXBpQW5zZXIobXNnLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIGlmIChtc2cuY29udGVudC5pbmRleE9mKCdBUEkgS2V5IGVycm9yJykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICBzZXRJc0Vycm8odHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDor7fmsYIgR1BUIOaVsOaNruaIkOWKn+S4lOaVsOaNrua1gee7k+adn+S8oOi+k1xuICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT09ICdlbmQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdhczInKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEFuc3dlckRvbmUyKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0QW5zd2VyRG9uZTEodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cygnbm9ybWFsJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGdldEdQVERhdGFJc1Byb2Nlc3MuY3VycmVudCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2V0R1BURGF0YUlzUHJvY2Vzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDor7fmsYIgR1BUIOaVsOaNruaIkOWKn+S4lOaVsOaNrua1geW8gOWni+S8oOi+k1xuICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT09ICdiZWdpbicpIHtcbiAgICAgICAgICAgICAgICB0eXBlID09PSAnYXMyJyA/IHNldG9wZW5BcGlBbnNlcjIoJycpIDogc2V0b3BlbkFwaUFuc2VyKCcnKTtcbiAgICAgICAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgIC8vIHNldE1lc3NhZ2VzKFtdKVxuICAgICAgICAgICAgICAgIC8vIGdldEdQVERhdGFJc1Byb2Nlc3MuY3VycmVudCA9IHRydWVcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnZXRHUFREYXRhSXNQcm9jZXNzKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYmVnaW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOivt+axgiBHUFQg5pWw5o2u5oiQ5Yqf5LiU5pWw5o2u5rWB5Lyg6L6T5LitXG4gICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PT0gJ3Byb2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgLy8gbGV0IG5ld01zZyA9IG1lc3NhZ2VzW21lc3NhZ2VzLmxlbmd0aCAtIDFdXG4gICAgICAgICAgICAgICAgLy8gbmV3TXNnWyd0ZXh0J10gKz0gbXNnLmNvbnRlbnRcbiAgICAgICAgICAgICAgICAvLyBuZXdNc2dbJ3JvbGUnXSA9ICd4eHh4J1xuICAgICAgICAgICAgICAgIC8vIHNldE1lc3NhZ2VzKFsuLi5tZXNzYWdlcy5zbGljZSgwLCAtMSksIG5ld01zZ10pXG4gICAgICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBwcmV2TWVzc2FnZXNbcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdNc2dMaXN0ID0gbGFzdE1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRMYXN0TWVzc2FnZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbGFzdE1lc3NhZ2UpLCB7IGNvbnRlbnQ6IG5ld01zZ0xpc3QuY29udGVudCArIG1zZy5jb250ZW50LCBsb2FkaW5nOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgbmV3TXNnTGlzdCA9IFsuLi5wcmV2TWVzc2FnZXMuc2xpY2UoMCwgcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDEpLCBsYXN0TWVzc2FnZV1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5wcmV2TWVzc2FnZXMuc2xpY2UoMCwgcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDEpLCB1cGRhdGVkTGFzdE1lc3NhZ2VdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICBjb25zdCBsYXN0TWVzc2FnZUluZGV4ID0gcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgLy8gICBjb25zdCBsYXN0TWVzc2FnZSA9IHByZXZNZXNzYWdlc1tsYXN0TWVzc2FnZUluZGV4XTtcbiAgICAgICAgICAgICAgICAvLyAgIGNvbnN0IHVwZGF0ZWRMYXN0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgLi4ubGFzdE1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgLy8gICAgIHRleHQ6IGxhc3RNZXNzYWdlLnRleHQgKyBtc2cuY29udGVudFxuICAgICAgICAgICAgICAgIC8vICAgfTtcbiAgICAgICAgICAgICAgICAvLyAgIHJldHVybiBbLi4ucHJldk1lc3NhZ2VzLnNsaWNlKDAsIGxhc3RNZXNzYWdlSW5kZXgpLCB1cGRhdGVkTGFzdE1lc3NhZ2VdO1xuICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGxhc3RNZXNzYWdlID0geyAndGV4dCc6ICcnLCAncm9sZSc6ICcnIH1cbiAgICAgICAgICAgICAgICAvLyBsYXN0TWVzc2FnZVsndGV4dCddICs9IG1zZy5jb250ZW50O1xuICAgICAgICAgICAgICAgIC8vIGxhc3RNZXNzYWdlWydyb2xlJ10gPSBcInh4eHhcIjtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gW2xhc3RNZXNzYWdlXTtcbiAgICAgICAgICAgICAgICAvLyDmuLLmn5PlhoXlrrlcbiAgICAgICAgICAgICAgICAvLyB0eXBlID09PSAnYXMyJyA/IHNldG9wZW5BcGlBbnNlcjIob2EgPT4gb2EgKz0gbXNnLmNvbnRlbnQpIDogc2V0b3BlbkFwaUFuc2VyKG9hID0+IG9hICs9IG1zZy5jb250ZW50KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1zZy50eXBlID09PSAnc2VuZEltZ0RhdGEnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgICAgICAgICBpZiAoJ2ltZ3MnIGluIG1zZykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndW5zcGxhc2hTZWFyY2hQaG90b3MnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ltZ3M6Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyDmj5DkuqTnrZTmoYhcbiAgICBjb25zdCBvblByZXNzRW50ZXIgPSAodmFsdWVzKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgICAgY29uc29sZS5sb2codmFsdWVzKTtcbiAgICAgICAgbGV0IHByb21wdCA9IGAke0xhbmdbJ2N1cnJlbnQnXVsnUHJvbXB0MyddWyd2YWxpZGF0aW9uJ119XCIke3ZhbHVlcy5hbnN3ZXJ9XCJgO1xuICAgICAgICBzZXRJc1VzZXJBbnN3ZXJlZCh0cnVlKTtcbiAgICAgICAgLy8g5bCG55So5oi35Y+R6KiA5Y+R6YCB5Yiw5Y6G5Y+y6K6w5b2V5LitXG4gICAgICAgIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkTGFzdE1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHZhbHVlcy5hbnN3ZXIsXG4gICAgICAgICAgICAgICAgJ2xvYWRpbmcnOiBmYWxzZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIGNvbnN0IG5ld01zZ0xpc3QgPSBbLi4ucHJldk1lc3NhZ2VzLnNsaWNlKDAsIHByZXZNZXNzYWdlcy5sZW5ndGggLSAxKSwgbGFzdE1lc3NhZ2VdXG4gICAgICAgICAgICByZXR1cm4gWy4uLnByZXZNZXNzYWdlcywgdXBkYXRlZExhc3RNZXNzYWdlXTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2VzKTtcbiAgICAgICAgY29uc3QgbXNnSGlzdG9yeSA9IG1lc3NhZ2VzLm1hcCgoaXRlbSkgPT4geyByZXR1cm4geyAncm9sZSc6IGl0ZW0ucm9sZSwgJ2NvbnRlbnQnOiBpdGVtLmNvbnRlbnQgfTsgfSk7XG4gICAgICAgIGdldEdQVE1zZyhbLi4ubXNnSGlzdG9yeSwgeyBcInJvbGVcIjogXCJ1c2VyXCIsIFwiY29udGVudFwiOiB2YWx1ZXMuYW5zd2VyIH1dLCAnYXMyJyk7XG4gICAgfTtcbiAgICAvLyDmlofmnKzmoYbkuIvmlbLlh7vmjInplK7ml7ZcbiAgICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIC8vIOmYu+atouS6i+S7tuWGkuazoVxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU1vdXNlRG93biA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnUG9wdXBDYXJkOmhhbmRsZU1vdXNlRG93bicpO1xuICAgICAgICBzZXREcmFnZ2luZyh0cnVlKTtcbiAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQuY3VycmVudCkge1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFggPSBldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WSA9IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgICAgICAgIHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFggPSBTdHJpbmcob2Zmc2V0WCk7XG4gICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRZID0gU3RyaW5nKG9mZnNldFkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldE9mZnNldCh7IHg6IGV2ZW50LmNsaWVudFggLSBwb3NpdGlvbi54LCB5OiBldmVudC5jbGllbnRZIC0gcG9zaXRpb24ueSB9KTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU1vdXNlTW92ZSA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyAvLyBjb25zb2xlLmxvZygnUG9wdXBDYXJkOmhhbmRsZU1vdXNlTW92ZScpO1xuICAgICAgICAvLyAvLyBjb25zb2xlLmxvZyhkcmFnZ2luZyk7XG4gICAgICAgIGlmIChkcmFnZ2luZyAmJiB3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vIFVzZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgdG8gdGhyb3R0bGUgdGhlIG1vdXNlbW92ZSBldmVudCBoYW5kbGluZ1xuICAgICAgICAgICAgLy8g6byg5qCH55u45a+556qX5Y+j5bem5LiK6KeS55qE5YGP56e7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRYID0gcGFyc2VGbG9hdCh3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRYIHx8ICcnKTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFkgPSBwYXJzZUZsb2F0KHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFkgfHwgJycpO1xuICAgICAgICAgICAgY29uc3QgbmV3WCA9IGV2ZW50LmNsaWVudFggLSBvZmZzZXRYO1xuICAgICAgICAgICAgY29uc3QgbmV3WSA9IGV2ZW50LmNsaWVudFkgLSBvZmZzZXRZO1xuICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIGJvdW5kYXJpZXNcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50V2lkdGggPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gd2luZG93RWxlbWVudC5jdXJyZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IG1pblggPSAwO1xuICAgICAgICAgICAgY29uc3QgbWluWSA9IDA7XG4gICAgICAgICAgICBjb25zdCBtYXhYID0gd2luZG93V2lkdGggLSBlbGVtZW50V2lkdGg7XG4gICAgICAgICAgICBjb25zdCBtYXhZID0gd2luZG93SGVpZ2h0IC0gZWxlbWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGNsYW1wZWRYID0gTWF0aC5tYXgobWluWCwgTWF0aC5taW4obmV3WCwgbWF4WCkpO1xuICAgICAgICAgICAgY29uc3QgY2xhbXBlZFkgPSBNYXRoLm1heChtaW5ZLCBNYXRoLm1pbihuZXdZLCBtYXhZKSk7XG4gICAgICAgICAgICAvLyBPbmx5IHVwZGF0ZSB0aGUgcG9zaXRpb24gaWYgaXQncyB3aXRoaW4gdGhlIGJvdW5kYXJpZXNcbiAgICAgICAgICAgIC8vIG5ld1ggPj0gbWluWCAmJiBuZXdYIDw9IG1heFggJiYgbmV3WSA+PSBtaW5ZICYmIG5ld1kgPD0gbWF4WVxuICAgICAgICAgICAgaWYgKHRydWUpIHtcbiAgICAgICAgICAgICAgICAvLyBzZXRQb3NpdGlvbih7IHg6IGNsYW1wZWRYLCB5OiBjbGFtcGVkWSB9KTtcbiAgICAgICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuc3R5bGUubGVmdCA9IGAke2NsYW1wZWRYfXB4YDtcbiAgICAgICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuc3R5bGUudG9wID0gYCR7Y2xhbXBlZFl9cHhgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5YWD57Sg5Yiw6L6+6L6555WMXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgcmVjdCA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBvZmZzZXRYID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBvZmZzZXRZID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICAgICAgICAgIC8vIHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFggPSBTdHJpbmcob2Zmc2V0WCk7XG4gICAgICAgICAgICAgICAgLy8gd2luZG93RWxlbWVudC5jdXJyZW50LmRhdGFzZXQub2Zmc2V0WSA9IFN0cmluZyhvZmZzZXRZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlTW91c2VVcCA9ICgpID0+IHtcbiAgICAgICAgLy8gLy8gY29uc29sZS5sb2coJ1BvcHVwQ2FyZDpoYW5kbGVNb3VzZVVwJyk7XG4gICAgICAgIHNldERyYWdnaW5nKGZhbHNlKTtcbiAgICB9O1xuICAgIC8vIOaWh+acrOahhuWAvOWPmOWMluaXtlxuICAgIGNvbnN0IG9uVGV4dEFyZWFJbnB1dCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA+IDMpIHtcbiAgICAgICAgICAgIHNldElzQW5zd2VySW5wdXRlZCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldElzQW5zd2VySW5wdXRlZChmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIOeCueWHu+S/neWtmOWIsCBBbmtpXG4gICAgY29uc3QgaGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrID0gKCkgPT4ge1xuICAgICAgICAvLyByZXR1cm4gXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdQb3B1cDpoYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2snKTtcbiAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKCdsb2FkaW5nJyk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSAnJztcbiAgICAgICAgY29uc3Qgc3RjID0ga2V5V29yZC5sZW5ndGggPD0gMjAgPyBzZW50ZW5jZSA6ICcnO1xuICAgICAgICBpZiAod2luZG93RWxlbWVudC5jdXJyZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh3aW5kb3dFbGVtZW50LmN1cnJlbnQpO1xuICAgICAgICAgICAgY29udGFpbmVyID0gd2luZG93RWxlbWVudC5jdXJyZW50LmlubmVySFRNTDtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvcGVuQUlBbnN3ZXInKVswXS5pbm5lckhUTUw7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6K+35rGCIGJhY2tncm91bmQg5bCG5pWw5o2u5L+d5a2Y5YiwIEFua2lcbiAgICAgICAgY29uc3QgcCA9IHtcbiAgICAgICAgICAgIFwibm90ZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWNrTmFtZVwiOiBcIkRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICBcIm1vZGVsTmFtZVwiOiBcIkJhc2ljXCIsXG4gICAgICAgICAgICAgICAgXCJmaWVsZHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIkZyb250XCI6IGtleVdvcmQsXG4gICAgICAgICAgICAgICAgICAgIFwiQmFja1wiOiAnPHA+JyArIHN0YyArICc8L3A+JyArIGNvbnRhaW5lciArICc8YSBocmVmPVwiJyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgJ1wiPlNvdXJjZTwvYT4nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcInRhZ3NcIjogW1xuICAgICAgICAgICAgICAgICAgICBcIlNjb3V0ZXJcIlxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8g5Y+R6YCB5raI5oGv57uZIGJhY2tncm91bmRcbiAgICAgICAgbGV0IHNlbmRpbmcgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhZGRUb0Fua2knLCAnbWVzc2FnZXMnOiBwIH0pO1xuICAgICAgICBzZW5kaW5nLnRoZW4oaGFuZGxlUmVzcG9uc2UsIGhhbmRsZUVycm9yKTtcbiAgICAgICAgLy8g5o6l5pS2IGJhY2tncm91bmQg55qE5Zue5aSNXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJlc3BvbnNlKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZXJyb3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KG1lc3NhZ2UuZXJyb3IpO1xuICAgICAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cygnbm9ybWFsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlRXJyb3IoZXJybykge1xuICAgICAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKCdub3JtYWwnKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVycm8pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgaWQ6IFwiTGVhcm5pbmdFbmdsaXNoMjAyM1wiLCByZWY6IHdpbmRvd0VsZW1lbnQsIHN0eWxlOiB7XG4gICAgICAgICAgICBsZWZ0OiAxMCxcbiAgICAgICAgICAgIHRvcDogMTAsXG4gICAgICAgIH0gfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkNvbmZpZ1Byb3ZpZGVyLCB7IHRoZW1lOiB7XG4gICAgICAgICAgICAgICAgdG9rZW46IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3JQcmltYXJ5OiAnI0YwOEEyNCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE5hdl8xLk5hdiwgeyBoYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2s6IGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljaywgYWRkVG9BbmtpU3RhdHVzOiBhZGRUb0Fua2lTdGF0dXMsIG9uTW91c2VEb3duOiBoYW5kbGVNb3VzZURvd24sIHRpdGxlOiAnU2NvdXRlcicgfSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJjb250ZW50Qm94XCIgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChTZWxlY3Rpb25fMS5TZWxlY3Rpb24sIHsgdGV4dDoga2V5V29yZCB9KSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJiZy1ibHVlLTUwMCBob3ZlcjpiZy1ibHVlLTcwMCB0ZXh0LXdoaXRlIHB5LTIgcHgtNCByb3VuZGVkXCIgfSwgXCJDbGljayBtZVwiKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ3R0dHR0ZXN0JyB9LCBtZXNzYWdlcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubG9hZGluZyA/IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Ta2VsZXRvbiwgeyBhY3RpdmU6IHRydWUsIHRpdGxlOiBmYWxzZSB9KSA6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IGl0ZW0ucm9sZSA9PT0gJ2Fzc2lzdGFudCcgPyB7IGJvcmRlcjogJzFweCBzb2xpZCcgfSA6IHsgYm9yZGVyOiAnMXB4IHNvbGlkIHJlZCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfbWFya2Rvd25fMS5kZWZhdWx0LCBudWxsLCBpdGVtLmNvbnRlbnQpKTtcbiAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0sIHsgb25GaW5pc2g6IG9uUHJlc3NFbnRlciwgbGF5b3V0OiAndmVydGljYWwnLCBzdHlsZTogeyB0ZXh0QWxpZ246ICdyaWdodCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwiYW5zd2VyXCIsIHN0eWxlOiB7IG1hcmdpbjogJzAgMCAxMHB4IDAnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7IHJvd3M6IDMsIHBsYWNlaG9sZGVyOiBcImFzayBzb21ldGhpbmdcIiwgb25LZXlEb3duOiBoYW5kbGVLZXlEb3duLCBvbklucHV0OiBvblRleHRBcmVhSW5wdXQgfSkpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IHN0eWxlOiB7IG1hcmdpbjogJzAnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbFR5cGU6IFwic3VibWl0XCIsIHNpemU6ICdzbWFsbCcgfSwgXCJTdWJtaXRcIikpKSxcbiAgICAgICAgICAgICAgICBpc0Vycm8gPyByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7IHNyYzogc2V0dGluZ0d1aWRlX3BuZ18xLmRlZmF1bHQsIHN0eWxlOiB7IHdpZHRoOiAnMTAwJScsIGJvcmRlclJhZGl1czogJzRweCcgfSB9KSA6ICcnKSkpKTtcbn1cbmV4cG9ydHMuUG9wdXBDYXJkID0gUG9wdXBDYXJkO1xuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbnZhciBfYTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgcmVhY3RfZG9tXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlYWN0LWRvbVwiKSk7XG5jb25zdCBQb3B1cENhcmRfMSA9IHJlcXVpcmUoXCIuL1BvcHVwQ2FyZFwiKTtcbmNvbnN0IGNzc2luanNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9jc3NpbmpzXCIpO1xuY29uc3QgbGFuZ18xID0gcmVxdWlyZShcIi4vbGliL2xhbmdcIik7XG5jb25zdCBsb2NhbGVfMSA9IHJlcXVpcmUoXCIuL2xpYi9sb2NhbGVcIik7XG4vLyDpobXpnaLovb3lhaXlkI7kvJrms6jlhaXmrKHohJrmnKzvvIzmiJYgYmFja2dyb3VuZCDlj6/og73kvJrlnKjkuIDkupvmg4XlhrXkuIvms6jlhaXmraTohJrmnKxcbi8vIGNvbnNvbGUubG9nKCdiZWZvcmUgYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcicpO1xuLy8g5Yid5aeL5YyW5Li75a655Zmo77yM5Li75a655Zmo55So5p2l5oyC5Zyo5YWo5bGA5qC35byP77yM5YyF5ous56ys5LiJ5pa557uE5Lu255qE5qC35byPXG5sZXQgTXlCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnX19qaWFuZy1zb3V0ZXInKTtcbi8vIGNvbnRhaW5lciDmib/ovb0gVUkg57uE5Lu2XG5sZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4vLyDkvb/nlKggc2hhZG93IOadpemalOemu+agt+W8j1xubGV0IHNoYWRvd1Jvb3QgPSB1bmRlZmluZWQ7XG5pZiAoTXlCb3ggIT09IG51bGwgJiYgTXlCb3ggIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIOWmguaenOW3suWtmOWcqOWuueWZqFxuICAgIC8vIGNvbnNvbGUubG9nKCflt7LlrZjlnKggQm94IOWuueWZqCcpO1xuICAgIC8vIOenu+mZpOaXp+WuueWZqO+8jOmBv+WFjeWHuueOsCAyIOS4quS4u+WuueWZqOS8muWvvOiHtCBVSSDmuLLmn5PplJnor69cbiAgICAoX2EgPSBNeUJveC5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlQ2hpbGQoTXlCb3gpO1xufVxuLy8g5Yib5bu65Li75a655ZmoXG5NeUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuTXlCb3guaWQgPSAnX19qaWFuZy1zb3V0ZXInO1xuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5hcHBlbmRDaGlsZChNeUJveCk7XG5NeUJveC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyAvL+m7mOiupOmakOiXj1xuc2hhZG93Um9vdCA9IE15Qm94ID09PSBudWxsIHx8IE15Qm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBNeUJveC5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG5jb250YWluZXIuY2xhc3NOYW1lID0gJ2NvbnRhaW5lcic7XG5zaGFkb3dSb290ID09PSBudWxsIHx8IHNoYWRvd1Jvb3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbi8vIEFudCDnu4Tku7bmoLflvI9cbmNvbnN0IGFudFN0eWxlc2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5hbnRTdHlsZXNoZWV0LnJlbCA9ICdzdHlsZXNoZWV0JztcbmFudFN0eWxlc2hlZXQuaHJlZiA9ICdodHRwczovL2Nkbi5ib290Y2RuLm5ldC9hamF4L2xpYnMvYW50ZC80LjE3LjEvYW50ZC5taW4uY3NzJztcbnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoYW50U3R5bGVzaGVldCk7XG4vLyDlnKggU2hhZG93IERPTSDkuK3mt7vliqDmoLflvI/vvJpcbmNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbnN0eWxlLnRleHRDb250ZW50ID0gYFxuICBAZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdPUFBPU2Fucy1SJztcbiAgc3JjOiB1cmwoJy4uL3B1YmxpYy9mb250L09QUE9TYW5zLVIudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xuICB9XG5cbiAgI0xlYXJuaW5nRW5nbGlzaDIwMjMge1xuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcbiAgd2lkdGg6IDQwMHB4O1xuICBoZWlnaHQ6IDUwMHB4O1xuICBjb2xvcjogIzMzMztcbiAgcG9zaXRpb246IGZpeGVkO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmb250LXNpemU6IDEzcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIHotaW5kZXg6IDk5OTk7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJveC1zaGFkb3c6IDJweCA0cHggMTZweCByZ2JhKDAsIDAsIDAsIDAuMSksIC0xcHggMTBweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4wNik7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgfVxuXG4gICNMZWFybmluZ0VuZ2xpc2gyMDIzLCNMZWFybmluZ0VuZ2xpc2gyMDIzIHRleHRhcmVhIHtcblxuICB9XG5cbiAgI0xlYXJuaW5nRW5nbGlzaDIwMjMgLm9wZW5BSUFuc3dlciB7XG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xuICB9XG5cbiAgI0xlYXJuaW5nRW5nbGlzaDIwMjMgLnVzZXJJbnB1dCB7XG4gIG1hcmdpbjogMTBweCAwO1xuICB9XG5cbiAgI0xlYXJuaW5nRW5nbGlzaDIwMjMgLmNvbnRlbnRCb3gge1xuICBwYWRkaW5nOiAyMHB4O1xuICBvdmVyZmxvdzogc2Nyb2xsO1xuICB9XG5cbiAgI0xlYXJuaW5nRW5nbGlzaDIwMjMgI1Njb3V0ZXJOYXYge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHN0YXJ0O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAxMHB4IDE5cHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNik7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICB9XG5cbiAgI0xlYXJuaW5nRW5nbGlzaDIwMjMgI1Njb3V0ZXJOYXYgaW1nIHtcbiAgd2lkdGg6IGF1dG87XG4gIGhlaWdodDogMjRweDtcbiAgbWFyZ2luLXJpZ2h0OiA2cHg7XG4gIH1cblxuICAjTGVhcm5pbmdFbmdsaXNoMjAyMyAjU2NvdXRlclNlbGVjdGlvbiB7XG4gIG1hcmdpbi1ib3R0b206IDE0cHg7XG4gIH1cbiAgYDtcbnNoYWRvd1Jvb3QgPT09IG51bGwgfHwgc2hhZG93Um9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hhZG93Um9vdC5hcHBlbmRDaGlsZChzdHlsZSk7XG4vLyDmjqXmlLYgYmFja2dyb3VuZCDmtojmga/vvIjnm67liY3mmK/pgJrov4fmtY/op4jlmajnmoTlj7PplK7oj5zljZXop6blj5HvvIlcbndlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKG1zZywgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICB2YXIgX2E7XG4gICAgLy8gY29uc29sZS5sb2coJ2NvbnRlbnQgc2NyaXB0IG9uTWVzc2FnZTonKTtcbiAgICAvLyBjb25zb2xlLmxvZyhtc2cpO1xuICAgIGlmIChtc2cudHlwZSA9PT0gJ29wZW4tc291dGVyJykge1xuICAgICAgICAvLyDlpITnkIbnqpflj6NcbiAgICAgICAgaWYgKE15Qm94ICE9PSBudWxsICYmIE15Qm94ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIOWmguaenOW3suWtmOWcqOWuueWZqFxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+W3suWtmOWcqCBCb3gg5a655ZmoJyk7XG4gICAgICAgICAgICBNeUJveC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIC8vIOenu+mZpOaXp+WGheWuue+8jOmBv+WFjSAyIOasoea4suafk+a3t+adguWcqOS4gOi1t1xuICAgICAgICAgICAgKF9hID0gY29udGFpbmVyLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+S4jeWtmOWcqCBCb3gg5a655ZmoJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSAnY29udGFpbmVyJztcbiAgICAgICAgc2hhZG93Um9vdCA9PT0gbnVsbCB8fCBzaGFkb3dSb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgIC8vIOaYvuekuueql+WPo1xuICAgICAgICBzaG93UG9wdXBDYXJkKHdpbmRvdy5nZXRTZWxlY3Rpb24oKSwgY29udGFpbmVyLCBzaGFkb3dSb290KTtcbiAgICAgICAgLy8g55uR5ZCs6aG16Z2i54K55Ye75LqL5Lu2XG4gICAgICAgIGRvY3VtZW50Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBpZiAoTXlCb3ggIT09IHVuZGVmaW5lZCAmJiBNeUJveCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIOWmguaenOeCueWHu+eahOS4jeaYr+aPkuS7tueql+WPo+WPiuWFtuWtkOWFg+e0oO+8jOWImeWFs+mXreeql+WPo1xuICAgICAgICAgICAgICAgIGlmIChNeUJveCAhPT0gZXZlbnQudGFyZ2V0ICYmICFNeUJveC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOmakOiXj+eql+WPo1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSBjb250YWluZXIucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZUNoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn0pO1xuLy8g5pi+56S65bqU55So56qX5Y+jXG5mdW5jdGlvbiBzaG93UG9wdXBDYXJkKG1zZywgTXlCb3gsIHNoYWRvd1Jvb3QpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnc2hvd1BvcHVwQ2FyZDonKTtcbiAgICAgICAgLy8gbGV0IGEgPSBhd2FpdCBmZXRjaGN1cnJlbnRMYW5ndWFnZSgpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGEpO1xuICAgICAgICBjb25zdCBsYW5nID0geWllbGQgKDAsIGxhbmdfMS5mZXRjaGN1cnJlbnRMYW5ndWFnZSkoKTtcbiAgICAgICAgcmVhY3RfZG9tXzEuZGVmYXVsdC5yZW5kZXIocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LlN0cmljdE1vZGUsIG51bGwsXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChsb2NhbGVfMS5DdXJyZW50TGFuZ3VhZ2VDb250ZXh0LlByb3ZpZGVyLCB7IHZhbHVlOiBsYW5nIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoY3NzaW5qc18xLlN0eWxlUHJvdmlkZXIsIHsgY29udGFpbmVyOiBzaGFkb3dSb290IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFBvcHVwQ2FyZF8xLlBvcHVwQ2FyZCwgeyBzZWxlY3Rpb246IG1zZyB9KSkpKSwgTXlCb3gpO1xuICAgIH0pO1xufVxuLy8gYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudExhbmd1YWdlKCkge1xuLy8gICBjb25zdCBsYW5nID0gYXdhaXQgZmV0Y2hjdXJyZW50TGFuZ3VhZ2UoKVxuLy8gICBjb25zb2xlLmxvZyhsYW5nKTtcbi8vICAgcmV0dXJuIGxhbmcgXG4vLyB9XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy51c2VDdXJyZW50TGFuZ3VhZ2UgPSBleHBvcnRzLkN1cnJlbnRMYW5ndWFnZUNvbnRleHQgPSB2b2lkIDA7XG5jb25zdCByZWFjdF8xID0gcmVxdWlyZShcInJlYWN0XCIpO1xuY29uc3QgbGFuZ18xID0gcmVxdWlyZShcIi4vbGFuZ1wiKTtcbmNvbnN0IGFzeW5jRmV0Y2hjdXJyZW50TGFuZ3VhZ2UgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICByZXR1cm4geWllbGQgKDAsIGxhbmdfMS5mZXRjaGN1cnJlbnRMYW5ndWFnZSkoKTtcbn0pO1xuLy8g6I635Y+W5b2T5YmN6K+t6KiAXG5leHBvcnRzLkN1cnJlbnRMYW5ndWFnZUNvbnRleHQgPSAoMCwgcmVhY3RfMS5jcmVhdGVDb250ZXh0KShudWxsKTtcbmNvbnN0IHVzZUN1cnJlbnRMYW5ndWFnZSA9ICgpID0+ICgwLCByZWFjdF8xLnVzZUNvbnRleHQpKGV4cG9ydHMuQ3VycmVudExhbmd1YWdlQ29udGV4dCk7XG5leHBvcnRzLnVzZUN1cnJlbnRMYW5ndWFnZSA9IHVzZUN1cnJlbnRMYW5ndWFnZTtcbiIsImV4cG9ydCBkZWZhdWx0IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFJQUFBQUNBQ0FZQUFBRERQbUhMQUFBQUNYQklXWE1BQUFzVEFBQUxFd0VBbXB3WUFBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQWpLU1VSQlZIZ0I3WjFQYkJSVkhNZC9WZm5US0xSc1FBSk55Z0RlVEVNSjNLeEptNGdYLytFRmszcWdQU2xlYkcvbHhIS0NlR205UUR5MVhEeDRhVkU0Y2JBRXJxWkY1YWhNU1pTWWtOSkdTRFZWNm54M2Q3WnZ4cG5PN3V6Nzg5dDU3NU04ZG1ZV0JQdSs4L3YzZm0rR3lPRndPQndPaDQxMGJQSGRZRERPMWo3OVlLd0VZNm4yNlF2WHdrOUhHNUltZ0F2QktGTnorT1NFMG5Za0NXQWtHTk9rRHArY1VOaVFKSUR2cVdyMlRlT1RFNHB5a2dTd0laNmNHK2ltNFpPN2FIWHRlV1U4ZkxJZWpIOHFuK0sxMWIrZWt5Rjhja0xKVGFZQWxpNGVvYTdPRnlpTHVoQ2NVTnFLVEFHc2ZQRWF5Y1FKaFJjdmtXWmdUZm82ZDJUK1BvTkM4V29qQzU4S0lCVHRBbWdVSnhROXNCVkFvemlodEViYkM2QlJDaUtVeGRxNEZveDVrb0QySUxBb01BaG0vV0JjRE1ZTXRZQVRnR0kwQ01XbkZvVGdCTUNFTEtHRTUxc3dFNHh4YWpKT2NBSm9JeUNFdTcrczBjMzdUK25ySC81TStpMStNSVpxbnczaEJOQ21QRnhlcDh1M2xwT0U0Rk1USW5BQ2FITWdoSGUvK2kzdUhueHFVQVRaUlg0SGEzcEwyK2pIOHg2ZGU2TmJ2T3dGWXpZWTNWbC8zZ21nSUZ6NllDOU52RlVTTC9VSFk0RXlhZ3RPQUFWaTR1MFNEWi9ZSlY3eXFOcmY0YVg5R1NlQWduSHAvWDNVdXlkUzRQV29Lb0pFZCtBRVVEQlE4cjV5Wm4vOHNoZU15YVRmN3dSUVFBYU9kdExBa2M3NDVaSGFpT0FFVUZBbVRwV1NMc01LUkZ5QkUwQkJnUldJeFFJQWt6OG1YbkFDS0REdnZQNUswdVhQeFJNbmdBS1RFQWNBV0lIQjhNUUpvTUQwOVd4UCsrcHNlTUNxSXdnclhYZC9YU05IOWU2RkgyK0ZycDB2cG4xMU9oaWpPR0FsZ0t0M1Y0S2x6bWZrUUVGbmIrc0NTTi9QQVRmZ0JjTm41UUt3M3UybzBuY3d1Myt4UlR6OHdzb0MvUFQ3My9Yai92NSs2dTdPWE13cUZQUHo4L1hqcnAzSzcwMFB2N0FSUUtVVlN1aUxtNTZlcm9qQUZoWVhGK240OGVQMTg5NDkyMGdIYkZ5QWVQY0RteVlmcks2dTFvL2h1eHZaanlrRE5nSVEvYjl0a3c4ZVBIaFFQOVoxOXdNK0Z1RFJwZ1d3emZlRHBhV2wrckd1dXgrd2RBRTJXZ0RmOSt2SFZsb0EwUVY0bmtlMkVSV0F2dGljcFFVNGR1d1kyY2JLeXVaK0R1c3NRRHdGdERFR1FCb1kwbHV5ekFMWW5nS0tkei9RVUFTcXc4WUNoTmdZQU42N2R5OXlycUVNWEllSEJWQ2NBbDYvZnAwNk9qcWtEZnozWkNKYUFKMHBJR0RuQWxSWUFMSEdMb05EaHc2UlRNUU1RT2ZkRDlpNUFCVXBvQmhneVVDMlNFVUI2UFQvZ01WaWtPb1VVQlFBZXVhYlhXZS8rZk5UT3YvZDQ4cXhDZ3RscWdnRWpBdEFkUXFJeVJkOWJOL0I3VTBYV2xTbnFKRWFRRW52bEJoM0FhcFR3SGlOUFkrUFZSMmptTFFBeGdXZ09nVVVBOEM4QWRiRDVjMjk5eXBpbEVnTTBHbFpES0E2QlJUOWY5K0JuQUo0c2w0L0xwZkxORFUxUmFySSsyL01pM2tCS0Rhdm9nRHlORm5HbitBRmZ4MnYzTW5FdWpxQXloUXdIZ0RtV1dVVHpiOXFkTmNBQUNzTElEc0ZsQkVBUWpSWHpyeEtPdWpxZkpGMFkxUUFxbE5BR1FFZ25zRXpYTklibWV2RXFBQlVwNENpLzRjcHg5TzBPRE44WW5mbDdTdzZNVzRCUWxRSGdOVW5iYTRUWi9CNkh0MFlEUUpWcG9EeEFMQWQwSjBCQURZdVFMWUZRRWFCelNXY1FaQ0t1a0tJN2hvQVlPTUNaS2VBc0Nnakl5UEVHYkd2UU9kbUVCR3pMc0R5UnRCSWxkSkFEUUFZRTRCckJEVzdDQlJpVEFDMk40SUNVM3NCUkl4YWdCQWJKeDlZN1FKczN3c1lYMVN5emdMWXZoZlFaQ3U0Q0FzWFlPTmVRRk5id2VLd3NBQzJwNEM2K3dCRmpQek44U1lMVk1SdTM3NU5uSUZJWmNZcU1qcVZaR0JHQUxFbUMrNFZPN0N3c0NBMVZqSFpDU3hpeEFWd1g1VkxRdVZTdGFrQUVCaHlBWnNXQUR0aFROVEFzeEFybGJJblA1NEM2dDROSkdKRUFHSUEyTmV6ZzI1ODBrUGNPUC90NDhxVFM0SHNMSVZMQ2dpTVNFOU1BZkY4WVB5d3VhR3lUaUUrRWN6azVBTVdNUUR1Tkc0UGlWWXBBRk5QQkV2Q2tBRCszMnI5OGJWSFdTOUgxa1o4cFZMMmRuQXVLU0RRTG9DMERBQS85TSsrK1lNNG9IcWxNcklLV0RMYm1hLzliNC9YQUNZbkoybDhmTHh5SE1ZRDU5NDB1emdrdWlQVm0wRk54d0Q2QlNCWUFQeHd4OGJHS3ExUllROC80b0V3K3VhQTdBd0FrODlsSFFBWWNBR2JGaUFzcmM3T3pySmRFRklaQUFKVHk4QWhSbU9BY05JaEJLNGR2RVd0QUlZWWpRSEV1MzV3Y0pBMk5qYW82SEJvQXhNeGFnRnNiQVNKTEFQdk1iL24wR2dNME5YVlJiWVJmVjZSZVJlZ1ZRRHhHc0RodzRmSk5yZzBnb1RvRlVDc0JpQzd3c2FkK1BNS1RWY0JnVllCMk40S0xyNFhDSEJZQnRmNkw3QzlGWnpUS21DSXNSakF4azVnY1RNb2h4UVFHSXNCYkJNQTh2KzV1Ym42ZWNxcjNiVmpMQWF3U1FDWS9LR2hvZm81OG4vZGo0Skp3MWdNWUVzR2dNZ2ZreTlXQUNkT2xZZ0wyZ1JnV3cwQSt4eEdSMGNycjRPTlR6Nlh1eDlvaTBUaU5RRHgwU2hGQXBVKzNQWGlwSWRnOGpuZC9VQ2JBT0t2aHArWm1TRmJRTnYzbFkvMkI0SGZ5OFFOYlFJUS9iOHRZT0x4NkRkME9ISGMrd0MwQ1FDRmorR1R1Nm5vSUwvSHdQOHZsMkxQVm1nVEFNd2ZSeE5vT3p6dGtrTWJUZ0NXa3lTQTlucStxcU1sa2dRUVdiUGtzbHZIb1lZa0FVUzZGbGJYL2lWSGNVa1N3THg0d20zVHBrTXVtUmJnNXYxbjVDZ3VhUmFnSGdoaW8yUzhqT3NvRG1scDRKZmhBU2FmMDE0OWgxelNCREJGZ2hXQUFKd1ZLQ1pwQXNEa1I2ekE1VnZMNUdndnJ0N0p0dHdkVzN5SHR0MkZZSGpoaFJ1Zjl0REFrZWJmdnVtUVExaVRxYndBYTNrOWRpMzl1eFJHZ3pHemxRQUFtdmNYd2hNc2FkNFo2MlhUMGRxdVNKN0l2RFFrQURBV2pNbndCQTJOc0FST0JHd21NaThmQm1PdUVRR0FjakF1aENld0JKZmUyOGVxdDYwVjJud2k4NEttVEw5UkFZQXlDU0lBYVBCQWp4c1hhMkRwUk9iaElsWG5rNW9SQUlpNGd4RFpRbkFUcVpUNjVJTm1CUUFTUlFEUUFqVnd0SlA2RG15dnZIUVp3RjBnalhRVHFRWGtmYXUxVHd5L2R0MnZuYzlRYkxrL2p3QkFtV0x1d0NHVnJJbGNTZm11YWZJS0FKVEppU0FMYlJPWmwxWUVBQWFEZ2NkN2VWUnMyRTlrWGxvVkFQQ29hZzNPRW44S081RjVrU0dBRUkvMENjRk5wQ1JrQ2lDa094aW5xZW9lK29PeDFTdkIzRVFhUm9VQWt2Qm9NMDd3WTU4T2g4UGhNTUovRU9TQ0ZnQVc4K0lBQUFBQVNVVk9SSzVDWUlJPVwiIiwiZXhwb3J0IGRlZmF1bHQgXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQWNjQUFBQ3BDQVlBQUFCZWRmWXNBQUFCcDJsVVdIUllUVXc2WTI5dExtRmtiMkpsTG5odGNBQUFBQUFBUEQ5NGNHRmphMlYwSUdKbFoybHVQU0x2dTc4aUlHbGtQU0pYTlUwd1RYQkRaV2hwU0hweVpWTjZUbFJqZW10ak9XUWlQejRLUEhnNmVHMXdiV1YwWVNCNGJXeHVjenA0UFNKaFpHOWlaVHB1Y3pwdFpYUmhMeUlnZURwNGJYQjBhejBpV0UxUUlFTnZjbVVnTmk0d0xqQWlQZ29nUEhKa1pqcFNSRVlnZUcxc2JuTTZjbVJtUFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eE9UazVMekF5THpJeUxYSmtaaTF6ZVc1MFlYZ3Ribk1qSWo0S0lDQThjbVJtT2tSbGMyTnlhWEIwYVc5dUlISmtaanBoWW05MWREMGlJZ29nSUNBZ2VHMXNibk02WlhocFpqMGlhSFIwY0RvdkwyNXpMbUZrYjJKbExtTnZiUzlsZUdsbUx6RXVNQzhpQ2lBZ0lHVjRhV1k2VlhObGNrTnZiVzFsYm5ROUlsTmpjbVZsYm5Ob2IzUWlDaUFnSUdWNGFXWTZVR2w0Wld4WlJHbHRaVzV6YVc5dVBTSXhOamtpQ2lBZ0lHVjRhV1k2VUdsNFpXeFlSR2x0Wlc1emFXOXVQU0kwTlRVaUx6NEtJRHd2Y21SbU9sSkVSajRLUEM5NE9uaHRjRzFsZEdFK0Nqdy9lSEJoWTJ0bGRDQmxibVE5SW5JaVB6NGVRckRlQUFBQlhXbERRMUJKUTBNZ1VISnZabWxzWlFBQUtKRjFrRThvZzNFWXh6OWppRTFSbE9Td2xES05abHR5M1NnVVdyUGx6MEc5ZXplalpuNjltK1FtRitVc1J5Zkp5WFVsQnpkWHBTaW5YZVNnWE5RdXJOZnpidGhHbm5wNlBuMTdudC92MnhjYW5KcFNhVHV3bWNrWmthbVFhMmw1eGRYeWpKMW1IQXpScXVsWkZReUhaMldGNzFsZnhYdHMxcndidHQ3eUhyeXMzbHpHQ3FYMlRpNzJUNmIvN3RkVld5S1oxV1YrU0FkMFplVEE1aFVPNytTVXhYdkNYWWFZRWo2eU9GWGhjNHZqRmI0cTcwUWpFOEszd2gzNnVwWVFMZ2g3NGpWNnFvWTMwOXY2bHdmTHZUT1ppUzNJN0pIdVk1NG9QZ0pNTVVlSVVjWVpsQ3pjLzl3RXlqY1RiS0hZeFdDREZPdmtjQkVVUlpFbUtUeERCcDBSUE1JK3ZOSitLK3ZmR1ZhMXcxZVlISk92dXF2YWpQZy8zb0RlcDZyV2Z3b0RjY2o3bFdab1A4bmFpdmJzbXQ5WFlVY2VtbzVOODIwUld0eFFlakROOTd4cGxzNmc4Ukd1aTUreGhHTXFISndXT1FBQVFBQkpSRUZVZUFIdFhRZDhWRlgyUHBPWmRDRDBFcW8wVVJCVVZCRGJXbEFFRlVUc3ZZdXU5ZThxN3Fvb0tGaXdnSzVkZDlIVkZidHJSUkc3Q01nS3dscG8wb1AwaFBSTVp2N251Mi9Pek10a0pwbEozcVNRYzM5NWMzdDUzN2s1M3p2MzNmZWVxMjNyQVg1U3B3Z29Bb3FBSXFBSUtBSkJCSktDSVEwb0FvcUFJcUFJS0FLS2dFRkF5VkVuZ2lLZ0NDZ0Npb0FpRUlhQWttTVlJQnBWQkJRQlJVQVJVQVNVSEhVT0tBS0tnQ0tnQ0NnQ1lRZ29PWVlCb2xGRlFCRlFCQlFCUlVESlVlZUFJcUFJS0FLS2dDSVFob0NTWXhnZ0dsVUVGQUZGUUJGUUJKUWNkUTRvQW9xQUlxQUlLQUpoQ0NnNWhnR2lVVVZBRVZBRUZBRkZRTWxSNTRBaW9BZ29Bb3FBSWhDR2dKSmpHQ0FhVlFRVUFVVkFFVkFFbEJ4MURpZ0Npb0Fpb0Fnb0FtRUlLRG1HQWFKUlJVQVJVQVFVQVVWQXlWSG5nQ0tnQ0NnQ2lvQWlFSWFBa21NWUlCcFZCQlFCUlVBUlVBU1VISFVPS0FLS2dDS2dDQ2dDWVFnb09ZWUJvbEZGUUJGUUJCUUJSVURKVWVlQUlxQUlLQUtLZ0NJUWhvQ1NZeGdnR2xVRUZBRkZRQkZRQkpRY2RRNG9Bb3FBSXFBSUtBSmhDQ2c1aGdHaVVVVkFFVkFFRkFGRlFNbFI1NEFpb0Fnb0FvcEFvMERnc2IvZlE0ODlmay9Vc1NMLzNpbTNSczJQSjBQSk1SNjB0S3dpb0Fnb0FvcEF2U0dRbDd1YnpqcDdkRVNDQkRHZWRkWm94OGJtemtodmY1ZGpyV2xEaW9BaW9BZ29Bb3BBZ2hDWSs5bTMxSzE3WjBPUTNicDFwbzgrbkd0NkVtSjg5ZFYzNmViL20reEk3eDVIV3RGR0ZBRkZRQkZRQkJTQk9rRGcybXR1TjczQWdoUUhpeEhFS0htU1hodGZ5YkUyNkdsZFJVQVJVQVFVZ1RwSFFFaFFDTkpwWXNRSktUbld1VmkxUTBWQUVWQUVGSUhhSWlBRWlYYnM0ZHEySy9WZGJWc1A4RXRFZlVWQUVWQUVGQUZGUUJFZzB0MnFPZ3NVQVVWQUVWQUVGSUV3QkpRY3d3RFJxQ0tnQ0NnQ2lvQWlvT1NvYzBBUlVBUVVBVVZBRVFoRFFNa3hEQkNOS2dLS2dDS2dDQ2dDU280NkJ4UUJSVUFSVUFRVWdUQUVsQnpEQU5Hb0lxQUlLQUtLZ0NLZ3p6bnFIRkFFRklFbWdrQmplV3JOMVVUazBiQlBVOG14WWN0SFI2Y0lLQUsxUnNCUEdTays2dGV4bE5LU2ZiVnVMWkVObEhpVDZOZWNGQ29veGFLZWttUWlzYTZ1YlNYSDZoRFNmRVZBRVdpa0NGaVc0dWhCdTJuQ2lkc29rd215TWJoQ0pzWUhacmVodDM1c0VSaXVrbVI5eUUzdk9kWUg2dHFuSXFBSTFBa0NnN3FVME4ybmJHazB4QWhRWU9WT1BHa3JIZGl0dUU0dzBrNGlJNkRrR0JrWFRWVUVGSUZHallCbE5aNHlLSStTR3FIaDVlSXhqOTUvZDBBQ2plVmVhYU9lTUpVR3IrUllDUkpOVUFRVWdjYU5RSWhNMmpVcmI3U24wcmFaMXpiMjBEblpFaldZUUFTVUhCTUlyamF0Q0NnQzlZZUFuL2tFRmxoamRSZzZ6a0ZkL1NEZ2FkMjZULzMwckwwcUFvcUFJdUE0QXY0QW9ZQlYvSlNjbk1kK2dlTzkxRVdEeWNrWjFMcDFMKzRLTk9rS0VIMGpadnU2QU0zQlBuUzNxb05nYWxPS2dDTFFlQkJZdWJVWjdTeE00UUhYRitINEtTdTlqUHEybDN1TGpRZTdwakJTSmNlbUlHVTlSMFZBRWFpRXdMUHpldEozdjdlcm1GNFg2N0MydGRJaFBiYlJ0TkZMS281Qll3MENBU1hIQmlFR0hZUWlvQWpVR3dKTWlDSGJNUlJLekhpc0c2SG1WcUloeVVUM2w1aXphQXF0ZW9wTEZqZUY4OVJ6VkFRVWdUMEdBZHgvY3pPaHBWSlNVZ1lmTGZob1hxT3pjeGxMVVFqSzhxc3lIdDF1TjkvSFRDYVB4OFY5SnBrREhmdDhQbk40dlg0cUt5dWo4dkxLdTJRdGd4RjkrQzB5bG01ck5IS3RsR2dFMUhKTU5NTGF2aUtnQ0RpTUFEYmRlSmxpdk9RcjU4MDI1VnVaTE5QSTdXNUhIbmZybVBzS0VhTnNkcEdxbFZrck5UV1pVdE5TZ21Rb0pjVlBZdExFNFVrbVNrdFBNVVJaVWx4S0pTVmxVb1RIS0Z0UFhjRmRxSGFiTlZoUUF3MENBU1hIQmlFR0hjU2Vod0FVWVdVbHUrZWRaOE00STcrL21MemU5VXlXTzhqdDZjd1AvcWZGUERETFVyVExLaFNHcFppUmtjcVdZbnlxMHMxV1pVYUdoMUpTdkZSWVdGTEprZ1JSMm00OXhqeFdMVmgzQ01Rbjhib2JsL2FrQ0RSeUJFSUt0cEdmU0tNYXZzOWZRTDZ5NVV4bVhjbWQxTEthc1VOR2RqbFZ0Q0JUVXBJcE16TzltamFxems1TzlsQldsb2Z5QzRxb3JMVE05cGdKOTF6VittM1Z6ZFpiTGl6MjhyS3RUUGE3MlRvdVlPdTlsQkhrSldaWE1yazh6Y2p0NGlWdVR4cyt0OFpQTFkzL0RPcHRtbWpIaW9BaTBEQVJ3SDIvZFVUSnNvd1pmWlFocTlGT2pDNjIrR3BQalBaZW0yVm04Tk9XaFZScUNGSUl1ZnJ4MmR1bzczQkIvbG9xS2x6UFM4djgvR2dLVzlOdUYxK0FKSkdmNzdmeVhWY3E5K2FSMTcrTFhDWHJLRG0xTXk4eFo5ZjNrR3ZWdjVKanJlRFR5b3FBSXRCUUVTZ3IyOENXVGJ4ZjRtQ0Z6MHVwdGJVWUkyR1N5UVJaWHA3UHk3K1ZOK3RFS3Q5UTBwSmNYanB5Y0RKMXlPcEphemUxcEkxYmQ5UEdMYnRvTnk4WEZ4V1ZrSjlQSjRXWkpEa3R5VmlSUHIrUHZLVTVmSjY3S0RXMUo3bVNZbC9pYmlqbmpIRW9PVFlrYWVoWUZBRkZvQUlDNmVuV3NtWlJVVkdGOU5naWZGL1BGOXVYTGV3cm5MakhHSXRyMTc2OUtiWjF5NVpZaXBzeWFIdjM3c0pHYzcvUjd5K2pYajI4TlA2TWc0bkt2TlNqYTBzcTNsMUVPVDl2cEUyOFpMenM5eDMwQTRlWHI5cENtM2ZrOGxKckdXVTFUK2VMQUtMQ290MXNLZjlDelp2djB5Z0pVc2t4NW1tdEJSV0Jwb2ZBNldlTU15LzRmUDMxTit2bDVQZmZmMy9UNzd4NTgyclVQM2EweHVPd0t6V1d6VGY3N2plQWpoOTVvbW42a3c4L29wK1hMb3VwRzdTTkpkdVNrdEtZeWt1aGlWUHU1dVZNNng1cFBQY3FKMDY0UTVxb2tWOVN0Sm5hdCs1RTNaZ1VuMzU1SGgyUzI1NEdkR3BsN3FOMjd0R1dodlZ2VDFlT0hVVEZoZVgwOVpJY21qMS9OZVZzemFWdkZ2NUdlL2ZxUUQyN2RLQjVQNjZodE14K05lcS9QaXNwT2RZbit0cTNJaEJBNE1JTHo2ZWhRNGRXd09PRDl6K2c5ei80MEtUMTZkdVhicnJ4ZW5yNGtlbTBZdm55Q3VVU0ZiR1BDUmJjaXkvK0sxRmRSVzMzcEpOR3NwWGxwNXFTWTlTR28yU2twc1ZtTmZZZk1DRFlRcTgrdldNbVIxUkNIL0dTWTdDek9nM3NaRXZRMmtpVTVDcWpFVU42MGFmL1hVa0RPelNuMG1SK2JNWE5qOUtVdXVsL3Y2Nm5qZHQzVTdmc3RuVGR1QU1wWjBjUkRUdGdMK3FWM1pvZW1qbVhTcjM1NU9abDF1U1VUbzZQL3VqampxWS9IWGNNZlRGbkxuMCs1M05IMjFkeWRCUk9iVXdScUJrQ0lFWllaK3MzYkFnMnNHUDc5bUM0cmdNbmpScEpnd1lOb2lWTGZqSmR3NExic1gxSGtLenJZank0SUdqZDJucHVFZUZFWHhSNFBHNnp3U1RTdVdFSjlZQ0RCbE9MckN5VDNUYXdwSXBJbDY3ZGFOelpaNW4wdk54Yyt2R0hSVlRWVWlzMnNhQXZyemMrcXhZZDNIWGJuYWFmU0Q5MzN6YzVVbklOMDN5ODh6U1ByVnczbGZ1VDZkNW5mNktManUvS2o2V1UwWmUvYk9Sbk9sUHA4OTl5S09lUFlpb285dEdCL1RzVFoxRlpZVEYxYUpkT2YyYXN4dC81SHExYXU1V1hWWlBKVzViREczVGFPYjZMRmNRSUIxL0pzWWFpMW1xS1FFTkhBTVNZYUFLSUZZUEZQLzFFT1BZZk9OQlVlZjMxTnlnOW8zYVBOY1RhdDVRYmR1Z1EyaGk0V0VBNDBkamd6VGZSM0FFSEQ2WjliZGFpdlJ3c3dTN2R1Z2FTMk9mVnowOCsrTWhlcEZJWWZkV0VIQ3MxbEtBRU54WHo0eGtwVEdZK0dqYTRKODE4N1VkYXN6NkgvbnJwbjhoZnRKT0ttZGZmK1hZRm5YL2lBRHJrb0o1OHpqNit2OHU3YjBINGZML3gxOTgyMDhKZjFsUHpGcW5HOHZkamswN1pEclllcmZ1MFRnMGJGcU5Zams2MUtlMm81U2hJcUs4SU5FQUV1blR0UW0xYnQ2RUMyNGFVL2RtaTI3WmpPMjFZSDdJeW5SbzYyaDdDUkpUSnk2aXZ2Ukc2endoaVBHUGNhV1ljOCtmTnA4VkxuSDlaTnM0MUk4MGk0RDU3OXpYTHpMS1VlOEVGNTlINmRSdG9RNEFzQzR1TEhEOS9qeWY2NTIyeldsZ1dZeXc0eDFLMnFyNWk2U1BSWlpLVCtTMCt2alJxMGN4RGcvdGwwYksrdk5PMjdkNUV6WnBUajNZK0tpMXowZlNiaDlNdnEzYlRVLzljU0M3ZW5OTWlneWlyVlFZZGMyaFBXck5wSnovYldVQnBhUjVlbXNXOVVuN2t3NS9QdnJQa0NHdlJhWXRSc0ZWeUZDVFVWd1FhSUFLbm56Nk91bmJwUXUrL2I5MTdSQmozNFdCbFB2THdvNDZPR09SMDVWVlgwUElWSy9nUmlNck96MXM2TXpJeVRKbDdwMHgxakp6YXRHbEQ0N25mem54dWRvZHhMRjVzdmZ0NUtCTzIyUnhrS3dDcjhzbW5ucUh0RGkwLzQxMnBkZVhxc3ErYW5KUFBWOGlXWGhtMWE5dUN1bmJJb0h2L01weTI1UG5KVFhsc05icjRmcU9mRnEvTm94bXZyS1FGMzN4TGw5eDZHNVV6b2U2VnRaenZxU2JUSDlzTEtEZVhuK3NzOFRCQnNnWEtnL0Ewc2xjQ0tUa0dadzdVQVVSWVgwNzdiOHI0NDBYVjJIZ1M3cDU2OG1tekVlZjAwMDh6K2FlZGRpcHQycmlSa082czg3TVNTemQ5MkVrWHk2b1lGNnhVU1gvaWljY3BQWjNOQkljY3lHM2FRNCtZOCt6U3RhdTVyL2xoWUNPU2RDRjlqK0lkb3FOT0dtVXdlSWd2RG1yMmlJZTBHc0liNXhqYUJTcnBvZy84OU1WbmN5a2xOWVgySDN3ZzllN2JoOHZDRXZJWkg2MGhqUG1MTm5BL2N1eVpaOUN2Ly91WmZsNFdlUmRyUXlmSDBqSmVPdVY3aVZuTk15bWQ5eWdWNWhkUWEzNk9NVGUvbUlyOExzcE1jMUhMekJRNmMwUXZhcGRaeU5abE9oM1l4VThadms3a0x5Nm10SXdVT3ZuNEE2aHJ1eXg2ZTg1UzNwUlR4aTlzZC83aVF6Zmt5RnhPcUMvL0NBbnRwSXJHdGY4cXdLbURyUHJGSDhveXBKeERwd3ZsangycTJLa0t5eXBuMHlZVHJ4MHBoTm9QaFN6RkhvcGJvVWlFalhGR1NnK3ZHMCs4bUJYcWxLbjNFM2JJWWpOUTJ6YXRLKzJPbGQyejMzLy9QYzJjK1ZJOHpWZGJGczg1aHZDWHVXQzkveFI1c3NGbTI5YXQxR2Z2dlhtcEVNUUlIRUlFaWE5dDRQb21oUjhINmRxOUszWHIwZDNVazdySWJ5ek83Y1lqTFY3eWxzc2pKeTYrbmVqbmgvcHhGbndoeDQra1pMZDEwVjdaelduRUVjZnltM00ybTN1TnhkNGszc2pqcGVHSDlhQVJSKzVEV2MxUzZLZmxXK2pYTlgvdy9jWjBLdVA3a1U2NlJHN0ljWjdLblR4emJVc1JVQVNNZFFTQ25EOS9Qb20xaEtWSVdGQ0pkaUNBRUdsWXZWVzBzcHdkQVVodjhlSWw1bjZqdkFBQVBTQThaTWdRczN2V09XSUVDWVlJQzRRSFp4RS8wdVhjaFN4TnRza1A0V0lScEZYV3VzQ3hyTXBRMlVESThzd3Z2N2NuMEpjdHNVRUZpNHJLK1FIK1lscisrelphdjNVSE5jL2lseGNVbFBKcitYanNmRUZRemtSWnpoWmtQbHVYQlVYOGpsVTNEeCtmRWNOYUpHL2tNVVNhVms1TGY5NUNhemIrd1lUcDR3MCtzVDBtRXc4UTJKQURKMzQ4ZGFzcjJ3aVhWYTFKVzkySnhaWmZrN1pxVWlmYWFHclNWazNxYVArUkVhZ0psaldwRTdsM1N6RlhWTHpSU3NKU3RFakI2cjgxaytQSUUwY1Fub1dzdWF0OEx1RVc0Ynp2NTRjMWp6cE91Y3I5bytXU2ttSnpIeEhuM0x0UEg5UFpTcjcvaU9YWGdnSnM2bkRHVlR4WFY4QWF0QWpPdWdBSW5XdTc5aDNZOGtuaHh6a080TTZ4QkpzVUtJK3hXREswckVsaVV2SFMrclZyYU5XS2xRUkxNMFRBSVRMMitXQkNoZHBIS3czSm5YZlJtWlNYdTVVdnlKYlIxR2Urby90dk9KeXkybVR5T1RNcCtyeFVVc3Izbi9rZVl4TEhYYnlSQ1hoNStaeFNQQ21jeHcvOXA3WG1SMzljTk9tSlR5aHZkeTQxeTJqT1Zxano1OXRrTnVSWUV6SmNXWVQvQTRYbmgwOHBLUzkrdEh5azI5dVNKUlI3R3NxRXR4T2VqekoySitYRnQrY2hiRSszdDZYOVkwa3EzRXFwaUJmd3MyT0dlTGdUZk1XUGxvOTBlMXYxaTM4QjcrenIzSWtma2c0dTExbjN3T1IvQXI3ZGRjbk9qbksvVGM1YmZIc3RoTzNwNGVkdnYrOW0xZHUrZlJzSDdPV3NjUGg0ck5MNGxmYkZEK1ZZSVh1NnZkMFEvdGgwdEo3dmNXS0g2aUdISEdLK29ZaVhBQ0N0YTVldTRRMkd4ZEUrbkwwZkt5WDhOelRYckw3THlyeGhiOGV4bG85UjdxaGpqcVpzM3JDRUpWWTQ2eDZqaEswK1VRNEV1WFh6Wm5ydnJYZHNaV1Zlb3g5clhMQ3NLdUpxdGRWUWZwTmNHVFRsZ1J0NHVUU2ZsaXhlU2R0ZE9aVHQzVUJ1UHkrYnBub0M5dzk1dnZETHgxMCsvZ0MwcDV5UytiR05YZHZXMDJ2dnorWDh0alR6VFg0T2Nsc3VwYmc5YkhHVzhNdklvejhxMDFETzJ6Nk9CbVU1eW1RVmhXQU5GTE14ZkNKWmt6RTB1ZXo1OGc4bnZweXV2WXpVUjU2VXd4S0tWZGJxWC9LUWFLK0xkS2t2ZGUzNWtpWSt5c1BaeTBoOXBFczU3YjhwNC8vaGh4L1QvZ2Z1VDRNT0dFU2RtZml3SzFRMmJWZ1dpVFZQU2twS2FPMjZkWmc0OU1FSDhpeWRmVzZGNXBNcEZQeXhsNGsyL3l3eXFHNytWMTRTdExkZG0vNnQ1ZE1PSFR0U1I3NVF3TGwreEs5bXczaU9PZllZczdRS1ROTFMwbml6Q042MUtuMkY5MitQQndHb0ZFQzc0akQzOEVKd0s4bmFYSVAvV2FTam5KU0Z4WWpOVTZ0WHJxRDMzLzRQNTd0bzFKaVRxVmVmdnR4VTZPSkNkQm5hdDc3ZEtIbFdXMlZsdUpjWDZoL2xHcEw3NFAyRmRNN2xZNmhGODVZMDhLRDlxS3hrYjlxOWJpa2w1NjJnRlA2SU05djNadlJKcWVtVXhJOXhiTmxaUW85UCs1cGF0RnhOS3pkNXFYbjZPbjdYYWluTERJU1laSlpVZlg3ZXhDVWljK2hrbTlDR0hHdFNXeFBMUHNHQnFIMGlXUWhqd2xvS05aU1B5VzJsWVZJakxIbWhxMENyTGFzTmhLV08rS2hqdFMxOVNoc2lVYXV1OXEvNE96WC9Qdjk4THMyZE81ZnduQ0VlcDRBQ0ZoSUNJVWc0aFpmMnZwajdCUzNoQi9TZG4zK1c0Z1l4RnhZV0dxVnV6ZmpRL01lT1ZsSDh6dmRQMUplWFVmRlZqQjkvWEV4dnZ2a1c3ZURuT2FGUnY1Ky9nTWJ4YzVZREIrN0hiNlRwU2xobWpkNi85WCtMLytlcUhHUm5sVUZCRjFzM1pieGs2T1BIRkt4bFFqL2ZVNE5EdWR5OFhaVHQ3MkxrZ3ZOZnZPaEh6ckYwQjhJOWUvY0p0TVZsYzNlWnNTSGYwaVZXRzlaNFhkeEhPUk94RUxEcEl1YWZ1NlpPQ3VJZmM2VWFGTVRMMFcrODRpNDY2ZFRENk5BamhwaWR1dDdtZzZrZ293OGw4MDdXWlA0QTEvclpYOUNHaitmd0czQ2EwU3IraHNYWHk3YlFmb1BUYVhEZlhQckhHOFhtdnFTTDU0dTNOSTA4R2J3cXd2Y2tuWGFKM0pCVDc1YWpUQmlBSnVRa2t6NlVaMDNDRUxDaFdTK1QyMUpTVmduN1B3WGFDS1FHcTB1ZFlJSUppQUt3aUJGSktHZjlBMGtiVWlNVWw3YTBmOEhHd2sxaWlyL01GZkVGbjFEY3dzcWFmMTI2ZERZS0dHa3kvMEdVOW5oMmRxZmdRL2hPenI4TjY5ZXpSVlpNRHp4d24ra1BQM0toYU84L1B6K2ZIKzFZYjhvNDJUK2ZNYitGSjhNOHBnTHloNVAvUDl4dmZQcnBaMmdRUDFyU2hsOHB0OExxMlB5UG9sNzQvMThnMjdRUjdjZWFteUFwM0dlMDVGSlNYRUx1akxSQUZjakkwZ2MvTGx4a3ZsdVlsZFhTeUtXRWNiS2NuNHI1M3VpbUFCNjVlYm4wMWR6UE9jdVNyOVVIMmdnVVo2K1krN0R5V2E4RnlvVnk3U0ZiSlh0eUhZVlhyY3lsajk2ZFMyZWVkUlFsOFFrVUZKZFJTWGttMzFOdHdYNFNkUnpWbTN6OFNhcHRDK2RUQ3o0bTc5K0xldDV4SzYxY3M1bkdwaXloNWIrdW9yVXJkMUgvZ1R0by9zSldDUmwxSXQrUTQrcldkYTg2bG9CMEIyVVFjcUlJck1ray94U2gvRWdobWREaTI4dEVTclBuSXl6LytGSlcvUEJ5MGVKU1hueDd1VWhwOW55RXRYK3gwQzNGRkF0bWRneWx2UGlSOHV4cDRXSEZ2ekwrc0F6eHlJaGdZOGNNYVhBZ1JteVdFZHpGcjFqV2txazlMVHdzZlVoOThjUExSWXRMZWZGRDVTd2RBMEo2ZU94dU9yeFhZU2pMRnBydzNpRDY3dmQybkdLUkk0Z1FybG16ZEw1bmxteUlpMjkybURUN0R3ak5Ta2NlK2dLTzhtZ0hpRm9lQWhCZGg5cFdXUzgvN3dlclROd2gzYmJTZzZOaGhWWjI4OWUyb1Z2K001Z3pVRmR1dTFRZVQrV2F6cVgwMktzOS9lT2w2L2dySENuV2g0MTVIUG41WHI0WDZhVlY2MHI1L21NeXRXdmZnbkw1WlEzYlAvK2N5dGI4UWdQR24wZTlocDlHdTNMWDBuZGYzRUl6WmhUVG1uWE9QUmZyM05sVjNWSTlXSTRoNFFvUnloRHRjVXhzK2VlUi9IQmZyc2JFdCtkSFNyUG5JeXo5U1ZueHc4dEZpMHQ1OGUzbElxWFo4eEhXL2kzbElWaUpINDVUdExpVUY5OWVMbEthUFI5aHhiOHkvaUE5TEZuRzRnUmo4ZTExSXFYWjh4Rk9QUDVNS09aRHV5RXlzby9CNmg4WXlCSW53aTRtL2hKK1NiWUhkQlFjbytnaWM0RmdGZU04MUlPVDVWUE9NT3JOc2dndEFyVkt5RzlSRWU3WG9SQ1hZWkRRVkhSbmxRczBHcjFZQW5QVy9MNkZMcm5nTVg0RzlXemFwMzlYakpyZmw1cEdMVnY0YUdjQjBWZHZmMDNISHV5aTVlWDdVT2J3RTZtai94aWlicjFwOGZMdmFPUFN1K2p4SjlJYkpURUMwam9peDhCc0Nnb1JFOE9LeUtRTFp0a0M4czlqUzlLZ0lxQUlLQUl4SVpDY3pCWXdyWWxlMXVnZys4VTYweEJIeTh2NTJiMzhRc3JNeEh0ZXJYd2hRdEZiNGJvcFNIUGNKajhKYVBvMHR5eURlbzc0TVpRaXZ0ZG9mWWxEaURuVWU2UmhvcktVQ0RRVWpFY3FuNWkwMzFmL1FXZWYrU2hkZS8xSXV2Q1NQM0VuZU5ZeGlmcjNhVTQ5cng5RjNxMHJhZU5ybStubEoxK2lkaDNLZVFOUEgycmJZaEg5YTFiYnhBeW9qbHF0STNLMHprWW1GQ1lnbkxVY0lrSzMwbUw5UlZ2bUtzNVVzRThpYWNHZVpvV3RPc2lYQ1lld3ZSemk0dXpwOXJDVnIvMHIvanIvNVArbzh2OUh4ZjhySzcvdS92LzQzWitlenJ3TVdNM0x3bm40RnVsWnk2cWlsekRPMGxMKy9oSTdFR1RGczBNTTlVTHozK1JieVp3RFRIQUVFemdNWXVUM2pKbzJUV21UWmd5RHNISW1vOUlQNnNoU2JhWE1Pa3Q0YlBxSDlOTE1MMm5VcUVObzZHRjlxVStmTHRTK1F4YWxadTlOWThaMm9EVXJodENYczcrbW5JOSs1N05xM01RSVVCTk1qaklSNU42RzljK0VpUldyQzAxQ3E0N1VOTVRLSWpEVDBDUktEcmNjbkp0V1dwQ0VyZTdOeEViL2x0V0tBSmV6VmJmeThDdi9CSllmYXBjenVDMXpIbUY5bVVwaGFkcS9EYXNBcHNCcHo4WS9OS0ZVL25VbmZ6eWY1L1prODZNRGFZYjRRbEl3LzVrVmYwd21mdkRHR3BBZHNrRkNTSE9aaC9tOTVmbVV5UnQwc0lQV0ZCRGR4WVd0LzMrakNMaUdWUWQxNWFMSnp6dGZzWmtLUzZteXFRcnRXdnBQeXFQUGFFNFVTZjBUbzR4dzE2NENldm5sejgwaGFSWDg1THI5ckZtRnZoMk9KSmdjeld3ems4R2FNS0hsVkp5SHpMT0s1MVN4akZVT0U2bWlreFR4SytTR0pRYjc0WFI3bGpWSnVhWTlNZENRVmNmS3NOY1A5aU4xeEE5bVZHN1BYdDllWFBzUG9HRUhaWS9CMzVyN09CMlZ2d2kxNHIrYWsvUGZ4V1RvZHJkaGF4RzdTUTNxZ1U2amUxaitOR1BnaStQUS9VR2tjUjNEU3o3eWxidjREUzhGbEpyaU1ZOHplSmdrVGI2NTMyanVTZ1k2c0loTStpNW5zaTB0S2VWbk5TMExWUFJmYURRZ1NibG5HVXF0RUFvT0JLbnlUeEthVnhYS2FzUnhCQkpNanBaQWcxZk9FWWFQeVlrRDcrc0x6VW9VbE1sZ1ZaTDVLamxtS2txUndIeVJhU05sSmR0cXdkWWtGNnhVTmxESm5pNzFrQmJlcGttVERnS1Y3SFdsanJSaGZGdjVTbVcxZnlNVU95NkNuV0FwUHRKTjJJYW5wTUVQUUJrMmd3SVpnWUwyZm9KdGNjQ2VqcUp3SnQvbUI5TzBmMEFSQk0yT25XQm1GUWo4MnZDcVZEWWdOSHU2MUpXMnhFZUhTZGdSNnVkUElmR0dtNlNrVEk1bkd2WGhMZWRITEtCVElIMzQ1alZ0MGxKRnY5eFh4dmNBK1dVQ3BxMkF4UmR4QVB6U2JYNm5hRUdoaXdrNHlieEZCODlDUXErNThNSjRidFpuK3VKWHEvRXIwc3A0UnlydVc4SkpjeWJDVm1sU0VyOS9sRjlBYXBFbGNnVVVxMFNGWDFNNUFJekpxTmhhaGJJYWNSd0JUMXJxL2c0MUdoSXl6eE16Y2VCYndnK2ZCRlpadkY4d2hkOUZlOVdWWjlGRmw1eEtMVnBrT2pRV2JVWVJVQVNhR2dMQkMrM0FjaWFXTWd0bW4wUGVkYk1qUXZINDQzK2oxTDFHbWpjUjRVVUxPR1JKTkdLRldpYm01UlhRekgrOFE4OCtPNHN0U2lqSjZoNktGektFdnJUclVBbExmaTBIcHRVaklsQkx5OUVpT1V0d0lqQVFvOXhqeE1WYktOMGFBU3hGaEt6UG44eWJQMHRKTWFKb05GRVJVQVFTaVVCNXp0ZjhuY0hkUmw5Qlo0RWNFK253SXJYTFRuRFIyWWVQcGluM1BzMXZrQ0hxMVRhZUY2bmJ5ZEFlVHVTb20yN2J0U1JIQUdjblB3bUQvVUNDOXJnRnNsbmo1NkNQbHpTdXZQSWNKVVlMRnYxVkJCU0JPa2JBKy9PelpEMVlVY2NkYzNlM0hSdERuMWlxWlZXSzVWdEx6OXI5R09wcmtWb2hVSXRMSlJDZ2tack5GNnRReG1STVJGcytCRzNWOGZuTGVTbDFyQlJVWHhGUUJCUUJSY0NPUUVDOVdnWUZkS3ZvVS9nU3RsZlFzSk1JZURyeVoxaHE2aUFzNjZJbXNJektEVmtpQ3dnT1Z6NmNaaTJ6Qm5hR0dZdlN6MnZ1K1dvMTFoUjRyYWNJS0FKN1BBSXBxV25Vb1hNMmIvcmhUVHg4dG1aSExaWitBK2FrMGI4QlkyT1BCNk1lVHREejVkd1pjWGNMb2RnRkEvTER6Vy81ZWdDK0lJQkQ0bmpidllTUmpycnJBeS9xamJ0enJhQUlLQUtLUURVSVFDZVp3OVA0M3VrcHB6YjRrSUgwOGQrbW1XY3NvVFB4cVM3NDBLWGgrbGZxcU84Y0FyVllWaFdMa0w4QXphOUVFb0lFK2VHQldSR2drQ1R5eGFGODZLRllTVlZmRVZBRUZBRm5FWEIzUHNyWkJ1dXd0YVNPUnhnalEzU3FHQ0F5Qk9oVWtLUzZ4Q0JRWTNJVW9ZQUVjY0NKRC9KRFBvUUtoekFFaXdOaE9VeW0vaWdDaW9BaTRDQUN4bUlNV0k0cGZjNGlkNWRZZHI4NE9BQUhtbkl4TVNiMVB0dm9WT2hWT1NjeEtxQkQ0VVRuT3RDbE5oR0dRSTEycTBKUXNBNUZVSWpEaVpVSUh3UXBRaFd5dEpjVDRZYU5SNk9LZ0NLZ0NOUVlBZWdZMFMwSUozbFNLT1A0bDZsMDFkdFVudk1kK2NvaWY2R2p4aDNXb3VLdVhic29QZDM2ZURUR2FzYWJuRUd1OW9kUWFwOXh2RFNIRndhRXpnZGRtZGZZQlh6b1gxTW5ZSnpVWWloYU5RSUNjWk1qSmg3SVQ0UXBiWW9RSlIzRWlMSTRFRVlkQ0JNSDRrS3NVbDk5UlVBUlVBU2NRRUIwa1BoSjdtUks2VDJPZkQzSEJuVVMraEVTZGFMUG1yU1JzMlFKZGU3YzJYdzdFanJSNC9HWU4rMmtwT0ROUDVacXhqa2dEejRjOUtqb1ZEay94Q1cvSnVQUU9wRVJpSnNjUlZob0RtRVJsZ2hNU0ZBSVVTeElFU0I4T1NJUFNWTVZBVVZBRVlnZkFlZ2o2Qlk0dTU2U3VPUkxHVk13eHAvcE01Nmd3c0lpdXY2NnF5a2pvK0xMdFpHTy9Nek1ETHJ1MnZFeHRtaFpnYkFFUVlyaThKRmxwR0dNNGtPbll1eUk0NUM0L1h3UVZ1Y3NBbkhmY3hReUZNRWdIaTVFRUNPRUt3SkRHSWNJMWRsVDBOWVVBVVZBRVFnaEFMMGpCM1NSSEVJdUlDTUp4K29YRnhmVDh1WEw2ZjRISHFMaTRwSmdmWVNSaGp4OEtEclc5bEJPeGdpOWlESGFTUkpuZ3pTVUFXRktIQ3R1b2x0RnA2S2NPdWNSaUJ0VkNBc09Bb1dEWUNBa0NjdHlLZEp3WUJKSVdSRXM0bExIVk5RZlJVQVJVQVFjUUVEMGt4QVBmT2lvZUVnclV0bWJicnlPdW5mdnpvK2diUWdTcEJBajBwQ0hNcEhxUmt2RHVFQjhJRVVoT0xPa0dpQkVxUWRZRUliZWxQTVRuU3IxSElCT213aER3TVVrVmFPOXdDSWN0QWVCZ2ZnZ1FDeWp3c2ttSENGQ2UzcHBhU2x0M0xpUkRqbmtFRk5XZnhRQlJVQVJjQklCVVd2Ui9KcjBoUThXVDc3blBscTNiajJUWVZmVHhOcTE2NmxidDY1MHgrMFR6TEpxUE8zT256K2ZldlRvWWZTbkVDSElFam9UUHZRcTB1RVF4N21BREhHSS9rVVpJY3g0K3RheTFTTVF0K1VvWkNkWExJakxFVzRaUW1oU1hxNThFRWU2MUs5K2lGcENFVkFFRklINEVCRENnQy82Um53aG1Iajk1czJiMGNRNy84ckUySTFBaWpnUVJocnk0bTFQZENCMEk4THdvVU5oUFNJY2ZnNUFRSFF0eWlOZjlHdDg2R2pwV0JBSTNRbU9wVFNYRVlISVJFTTFoSEZWZ3dQQ0VzRWhEMHNHZUVNT2hHNG5ScVNwVXdRVUFVVWdVUWhBTDhHSjlTangydlJuNmIyUXRaYVVGTHEvR1crNzBKT2lOMUVYK2xFSUVuSFJvL0NoTDZGTDRZUVFoVlNkT0MvVHNQNVVRQ0J1eTlHYUhKWnBMNVlpbGt4RlFCQ1lFQ1R5SVZSTUFMa1NRaGpsSVhCMWlvQWlvQWdrR2dIb0ppY083RXFkZk05VVdyTm1uYkVZWVRVaWpEVGt4ZHNIOUNNY2RDSDBveHlJSTA5MHBCZ1YwcjZVRjVLVWRoS05ZMU5yUDI2R2dpRGtTa3dFaXlzYUNFb2NoQWNDRkVLRVVGRVBQaHpxUzFqcXFLOElLQUtLUUVORkFQY2JKMDJlRWlSR0xLWEtFaXNJRW5rb0U0K0REb1NPaExPdnJvbHhZZGVUS0FjZEdrbi9TaHZ4OUsxbHEwY2dibktFSU9US0JzSzFreUtFaVFOcHlFTllCSWM2a3E3RVdMMWd0SVFpb0FnMEhBU21QZlJvQldMRU00MDQ3QVE1N2FIcGNRMFkrbEhJRHZvUkI1eVFKdlFsOHVGRWQ0citsZFU2cEt0TERBSnhreU9HQWFGQ2tCQWlEZ2dRdnFSQmdDZ0RKOEtWU1lCME9Vd0IvVkVFRkFGRm9JRWprSkdSUWZ2dTI4K1FJVWhSbkJBazhzSmZEaUJsb3ZuUW1kQ0Y0a3M1SVVYb1VhektJUitIT05RUlhZdDBKVWhCeGxrLzdrYzVRSElpR0NGRkRBa0NFeUtVc0Z6dDRORU5DV1A1QUhGOHNtcllzR0hPbmswamEyM2V2SG0wWWNOR092MTBmbytpT2tWQUVXaFNDSHo3N2JmOEdFZzNTazFOTlRwVlZ0bXdXeFU2RkhHUUgvUXR3a0tDQ0NOTmRLcWRPSnNVZ0FrKzJiaDNxMElvY0JDZU9BZ0pjZVNKdVkrNC9hb0dlYkt1anJDMEkyM1UxTC80NGt0cDd0elBJMVpmdTNaMXhQVHd4TVdMbDFCZVhoNGRlZVFSNFZrSmpULzg4S08wWU1GQ0dqTm1kUEF0R0FudFVCdFhCQlNCQm9NQW5sMkVFLzBKblNscFNCZjlhU2RHMFp0Q2xGSmYwaEZYNXd3Q2NaT2pDQXpkSXd5aHlCVU0waENIa0xFY0VHNWxRc2hJdzJFWEx1clYxUGw4Zm5QMWRlNjVaMWRvd3UyTy9kVCs5YStYQ1FRNVo4N3NDbTBrT25MLy9WTnB4NDZkRmY0aEV0Mm50cThJS0FJTkF3RXhKREFhNkUwaFJoZ1I4dGlHRUNQeW9XOUZoMG9kcEVIZnFuTWVnZGdaSk5BM0JBRkJ3UW5KSVc2LytrRVpITWlIOE9CUUJrSzNDOWxrT1BDejExNDk2S3Fycm5TZ3BjaE40RnprUENLWHFINEhicVEyZXZic1Nmd1gwVVVxSDE2d3VqTFY1WWUzcDNGRlFCR29Pd1JFaitML0ZBNzZFdVFuYjhPUmRCQ2xoRkZHZEtnWUdOSk8zWTI4YWZRVTk0WWNDQWtDRW1FQkpyRWNRU0J5SllOOGhFV0FFcGMwU1U4MHpGOTk5VFVkZmZTeE5IdjJKOEd1WnMxNnphVDkvdnNhT3ZQTWMrajExOStnRlN0V21MUm5uMzB1V082Zi81eEpwNXd5aG5yMDZFV1hYbm81TFZ6NFF6RHZrMDgrTmVYbnpQbU1SbzA2eFpTQnYyVEpUOEV5ZUZueGxDbjMwZENodzB6KzZhZWZhU3hVS1RCOStneTY0b3FLYi9GLy92a1hlSm4xTkZQKzdMUFBwYmZmZmtlS1UwN09adFBuTysrOFMrZWRkNEVwZzdiZmV1dnRZQmtFWG4xMUZoMTMzQWttSDM1NGZvWENHbEVFRklGNlFRQTZVS3hIRUJ4MEpId3hLa1Jub2h6QzRpTWZZWEgyc0tTcFgzc0U0aVpIdVdwQjE3aktFUjhDZzRPZ1VBWjVRcFltZzM4Z1lFd0crRTQ2OUJsK1NCKzRqOWluVDErNjhjYi9vNTA3ZDVwM3V0NXl5d1E2K2VTVGFhKzlldEMxMTE3RDVEV1VPblhxU0xmZi9qZjYwNStPTWtONzZxbW5hZUxFdSttb280Nml4eCtmd2VNdXAzSGp6cURmZmx0dTh2UHo4Mm4xNnQvcDdyc24wNFVYWGtCMzNuazdiZCsrelpDaEtjQS9qend5bmJCa2UrdXR0OURNbWY4d0h6WWRQZnBVUWwyNHJWdTNtdkdZQ1AvTW1QRVlUWnAwRDQ5bkNEMzU1TitwYTlldWRNTU5OeEhJRUs2c3JOVDBlZjMxTjlKaGh3MmpoeCtlUmgwN2RqTG5WbGhvUFdPRis2KzMzbm9ialI1OU1zMmE5WXE1ajRweng3MU5kWXFBSXRCd0VJQkZDRDBwaElnNDlCaDBGM1Fubk9neHhLV3M1S0VlblBnbW9qK09JUkQzc3FyMERBSFpMVWdJRG5FSUNnSVZzaFJCd3NlQkNZQThTWmYyYXVOLy9mVTNUSFM5S3pSeHdna24wRFBQUEduUzdyOS9DaDE3N1BHR2VIQ1BiOUNnZ1hUZGRYODJlWWNmZnBnaG4rM2J0M09aWTB3YWlIRHExUHZwK3V1dm81dHV1c0drSFgvOGNDYktvOW5LZk4yUXFFbmtud2NmaEdVNDFFU3hISExISFJOcHk1WXQxTDU5ZTJNbDl1N2R5eEN4eCtQbUY2MGZUQ3RYcmdwZVZFZ2I4TkhuUXc4OVFsZGVlUVZObUhDTHlSbzU4a1JENkxBd3NXbEhITVkwZnZ4VkpycnZ2dnZRaUJHajZNc3Z2NklUVHh4Qnk1WXRNK25ubm5zdXRXN2Rpb1lNR1VKang0NmhEaDA2U0hYMUZRRkZvQUVnSUlZQzlLRVFJL1Nua0ozb1NneFY5S3JkdHhPcDFHa0FwN1hIRENGdWNwU3JHdmdpS0VsREhJTEdJV2tJUTRoQ2hnakRpZThFa3Z2czA2OENZYUhOTm0xYUI1dHUxYW9WUGZiWWREcm5uUE5NMmhkZnpBM2U4QTRXc2dWV3JWcGxZczg5OXp4dDJyUXBtSU5semM4K20xdWhyLzc5K3dmekJ3NGNhTUovL0dHUjQ3aHhZK25tbTIraHd3OC9nbzQvL25nNjRvakRtV0NQTkM4V0RsWUtCRmF1WEdsQzRUdG1qem5tYU1JU3JsaWJLQVJ5Rjlldlh6OFRsSEVPSHo3Y2tPemhoeC9KUzZ2SGN0K0gwZkRoeHhFd1VLY0lLQUlOQndIb1NGbGh3NmlnRTZGRFJZOGlEV0hvVGxsK1JSaUhsRVViNmhLRFFOemtDTUZBSUNBOUNCWU9jVG5DaFNseHFRTmZCT3pVS2NGS0F3bFU1VnEyekFwbXU5MVZyeWJqT1V5NGd3OCttR0Q1aVR2Ly9ITnB3SUFCRWpVK3J1N0V3VHEwT3p5L3VQLytnK2pqajJjVDduM09uUGtpTC9IMm9UZmZmSTJ5c2tMalFSMnYxM29SdTcwOXBFc2MveHppUEI1ckN6aml3Tkx1Y0tHd2FORUMrdWlqMllUbnFQN3lsMXY1VFI2WnZNVDZiOXB2djRwanQ5ZlRzQ0tnQ05RdEFtSVpDa0hLYmxVUW4raEkrSWlMcnBYL2QraGY2Rlk0MGFsMU8vbzl2N2VRWm8veFhDRUlPQWhXaElnNHdwS0hPSVFvQ2gyQ2xlM0pLQ2N2QlVDNXVuRDRRdmVmLzN3ZG5YVFNLSDRGMUZwemoyN1dyRmY1SEVKa1ZsSlNFaHhLMzc1OVRCaUVlL25sbHdiVFlUbkc0elpzMk1EM0JEdnlmYzAvbXdQM0EvRmM1dno1QzlpU0hGNmhxYjU5KzVyNHdvVUx6VDFIeWZ6Kysvbm1VWldXTFZ1YVp6RWxQWnFQKzVqQUhrU09BMHU4Qng4OGxKZU8zMUZ5akFhYXBpc0M5WUNBRUIxOGtCMTg2RXJvVWVoWGhLRkQ1YVVBSUVNaFF1UkwySzUzNitFMDl0Z3U0eVpIQ0JEQ0FNbUpneEJGa0VqSElZS0cwTVhLaEtCUkYwSkdlYWZjcGswNVp1blIzaDdhbDN1SUR6NzRFR0dwODQwM1hxUE5temZUeUpFbjA3UFBQaHU4YndkckN6dFdjV0NqUzNaMnRpR1dlKzY1bHpmUnBCbnJEN3RRLy9yWDI4MDlTTnlMck03aFBDKzY2RklDNlU2YjlvQzU1d2RMRGs2STBONEcvZ0d3c1dmYXRJZU5WWW5sMm0rKytZYkgvQ2JmeDd6ZFhyVEtNRFlTUGZmY0MyWVpHVmJyb2tYL05lVmwrYlhLeXBxcENDZ0NkWVlBREFZNDZBcFlqZlpWTnRHallvU2dIUFFvNG5ESUY4dFJmSk9oUDQ0aEVEYzVRcEJ3RUloWWhqSWFJVVFJRGs1OHBBdEp3bmZTNFh0cUsxYXNZQXV2OG5PT2VFUE9kOS9ObytlZmY0RWVmZlJodmcvWnhoeFhYMzBWM1hmZkEveFl4TkhVcjkvZXhxTDg1cHR2emYxQmJIVEJocGk3N3JxTENkekRPMElmNVYybzI4MlFrWGZOTmRlWU1NNHAzTm5URUg3aWljY0pPMlBQT09Nc1V4UTdZckVMdFVlUDdoSGJ1UFBPTzh6a2YvVFJHYVpQbEwvbGxyL1FaWmRkRXJGOGVQK0lYM2ZkdGJ3TGRodGJxdGViYkN5cDNuREQ5WFRxcWFkR0txNXBpb0FpVUU4SUNOR0pMa1VjWVRFY29FT2dRMEdjOEpFUC9ZdDBsQkZkaXJnU3BQTkNyUEc3VlVWSUVBeUVCT0VoRFFmaUlsaUVrWVo4a0NsOExLdGl5ZkhRUXc5MS9veHEwU0oyalBMcEJDY25tc0xZZCt6WXdkWmNTNTZjTmJOMnNheUxjdzYvenhodHFPaHoxNjVkdGRwRWczUEp6ZDNGTzFaYkcxbEU2MHZURlFGRm9INFErTzY3NzZoTGx5NlVscFptL2tlaE0wR0FJRDZFaFJRbExxTkVIRG9DUGh6Q0tLL09XUVRpdGh4RkNQQkJkSEFJNHhBaFFhaFlNa0Fhcm1qa0NrZXVrRkN1SVY3cFJDSS9uQU1zenRxNDlQUjA4NHhqckcyZ3o5cnVMc1c1MUhiY3NZNVh5eWtDaWtEOENPRC9IQWVNQnBBaURra1QvWWk0T0tSQmQ4SWhYZlN2bEpWeTZqdURRTlhiTmlQMEljS0NMeVFuUWhLekgzRVJJbnlRb3h5STJ3VWJvUXROVWdRVUFVVmdqMGZBcmpmRkdzUkppNjYwNjFIb1REbFFSb2dTdnJTRGRIWE9JUkEzT2FKckVCd0VJbVFvZ3JMZmd4VHlSSG5rNDhBRWtLVUF4TlVwQW9xQUl0Q1VFWUFlQkJtSzdvUnVSWnFkQ0lVazdXVlFSd2hWZFdsaVpsQ05HUW9DZ2JBZ1RIRWlVQWhUQklaOElVUUlGSGx5U0QzMUZRRkZRQkZvYWdoQVgwSVhRaitLN29RUEo0WUh3cmhOQlNjNkZXSFVnVDYxNjEra3EzTU9nUnFSb3dnVndoS2hZa2gyNFVGd2tpY1AxZHNGYnkvcjNPbG9TNHFBSXFBSU5DNEVRSkNpVXlVTXcwT0lFejcwcWVoTWxKVzQ2TlRHZGNhTlk3UnhrNk5kR0JBV3Jsd2dTQkVZNHJqcUVXc1JjWlREZ1RKU0RnSlhwd2dvQW9wQVUwZEFkQ1IwSThMUWphSXpFY1lobGlMU3hVbDVFS1U2NXhFSUlSMWoyMEpxRUNJY2hDWUNFMStXVzFFV0FvUVRJVXZjSk9xUElxQUlLQUpORkFIUmhmQkZyNG8rdGV0TGV6a2hRdEcvUXFKTkZNS0VubmJjNUFoaFFGZ1FJa2hRaENVQ2xud3greEdISUhHSUlCRVdnU2YwN0xSeFJVQVJVQVFhS0FLaUEwR0VRbllZS25RblZ0L0UyZk9nZDBYL29weVFxcFJWM3prRTRpWkhDRXFFQWlHSmdNWEgwRUNDRUNMSzRoQ0JRcEFnVk1SVnFNNEpVVnRTQkJTQnhvZUFrSjdvUitoUTZGYlJuYUpmeGNjWlFtOUcwcitONyt3Yi9vampKa2NJU3F4RENCRU9Rb2JReEVxVWU1RElRMWdjOHRVcEFvcUFJcUFJaEJBUXZTZzZGRGxpUEFnUlNoeGxjWWdlUmxraFdZVFZPWWRBM0d3RklVRVlFQTdDT09SS0IyRzcwQkRHSVU3cWhhZEx2dnFLZ0NLZ0NEUWxCS0FUOFRZeCtLSkhFUlpkQ2l6a3NRNlFJc2dTK1FoTE9ZVFZPWTlBM0tnSzJVRjRjQ0lrQ1VONGNCQWNIQVF1WmNWSG51U2JRdnFqQ0NnQ2lrQVRRd0M2RlBvUk9oUmg2RTdSbHlCRXBJdCtSVHJ5UmYrS25rVyt1c1FnRURleUVJNElSQWhPQkNiQ0ZJRUtDVW9jQW9hekN6a3hwNld0S2dLS2dDTFFzQkVRZ2hNOUtYb1VvNFloZ1h6a1NUbWtvNHpvVWRHL1NGZm5QQUp4a3lPRUJxR0E4Q0FveENWTmhDaHh5VWQ1Q0JTKzFFVjlkWXFBSXFBSU5GVUVvQjlGSHlLTUEzczB4R29VWENRUHZ1aGI2Rk9Kb3cxMXppTVEyaThjWTlzaUVQaENjQWdMOFVGNGNKSUdJV0pOSGNRcDVJazhXV2VQc1ZzdHBnZ29Bb3JBSG9VQTlDQjBvdWhSaEtFdlpVYy8wb1U4b1MvbDhRNHhQbEFXWmRDT091Y1JpTnQ4Z3lBZ0VCd1FJZ1FGd2NHSklKR0dmUGdvZzNRUkpNckpKRUJZblNLZ0NDZ0NUUkVCTVJhZ0swVS9pbTYxa3liMEtQU3UvVUE1bExIcjJLYUlZU0xQT1c3TDBTNVFEQXhDZ3RCQWduQWdRamk4VHhWNWlPTVFrb1F3cFEyRTFTa0Npb0FpMEZRUmdPNkVIaXdwS2Ftd0sxWElEL25RbjdBYXhRaEJIaHpTUmY5S0hEN3FxS3M5QW5HVG93aEdDQTZraHpTZmoyOGU0MkNCSWMvNHpIMHNXdktWODRlUGVheGxaYVVtbmFjRGwyV3JrOVBWS1FLS2dDTFFGQkdBL2l2M2xySnV0RmJhZUUwdW9DdjVmbUtTaDd4bEpRWVdzOVRxdDNhcUd2M0xPcmEwcE5RUXB0Y1hldUVLU0ZISVZBbXk5alBLeFNRVzE5MWNGQmVMRCtIU0xZdXA0TnZieUx0NVBtK3hVcktydlVpMEJVVkFFVkFFWWtQQWxkeU1VdllhU2MwT3Y1L2NHZTJDUzYrb3JRUVpHNGJSU3NWRmppQkRXSVVDZXNuMjVaVDM1bEhrTDkwZHJYMU5Wd1FVQVVWQUVVZ3dBcDQyKzFHck03NGtsenRGQ2RJaHJKTnl6am1iY0d5KzZBSXErZkcvbFpyZCtkQTArdU9xSzhnZnVLY29aanRJc3ZpbnA1UVlLeUdtQ1lxQUlxQUkxQzBDM3UxTHFYajFoK2EyRll3WUhPcHFoNERIWDFJY2FJSEJEQVBVdTI0ZEZYNDJoMXo4SldvL2I3QnhwYWVicXhJUW85bFlzMnRGN1hyWDJvcUFJcUFJS0FLT0lPRGQrWnZSeS9aTk9vNDAzRVFiOFdTLytYYlVVOC8vNEgyVGwzN0VFWVlZY1RVQ1VvVDFpTU9YbnhlMXJtWW9Bb3FBSXFBSTFCMEMyT1FvRmlOOFdlV0RyeTUrQkpKS2xpMmw4czJiSzlYMEZ4Y2JxeEVabWFOT0R1WURkT3hRQlVsNi8vZ2ptSzRCUlVBUlVBUVVnZnBEQUxwWkRvd0NZWFUxUjhDejdaYS9tTnBwZ3dkVG0wbjNZSXVUaVJkK1BwZjhoWVdVM0xNWHBleXpEM2x6Y2lpcFE0ZWcxVmo4ODgva3o4OG5Tb3ZTdVF2UDRsUytZckVMVEs5b29tQ255WXFBSXJESEl5QzZNQzQ5Nk1lejRWV1RuclM3eHdPWTRCUDBwQTBaU2lXTGZxRGlSWXVvWVBiSGxEbmlSTk5sd1FjZkdEL3pwSk9vNk91dmFQdlVLWlIxM2ZXVWZ0eHdjMFdTLzg3YkxLTG9RdkllOWdMNTJ4MXEycEFYQklpUEIxNXptR3dQT3VpZ0JKK2VOcThJS0FLS1FNTkVZTUdDQlpTZG5VM0p2S2NEenpMS1czSWtERjl1WStFK29pRzlaWStRLzM4em9wNlFFQ1A4dUVnM2FvdE5OOFBUWnVKZGxQdkM4NVQveHV0VXVteVpJY2ZTWDM2aHN0V3JLQ2t6a3pLT1BvYnkzM3pESU9UZHNNRXkyOW1pTFBwaElhVU5ybXdaMnFHMFhnNFErc1lqQkliTlBCQTZuUGoyT2hwV0JCUUJSYUFwSUFEeVNrbEpNUzlSZ1M1RUhEN0lFcVFJaHpqMHFCZ1dWV2xjSWNhbWdGMWRuS041UTQ2blkwZlRsK3hjTGZqNEl4TjN0MjFIc0JCTGxpNDE4YklWeThtM2JTdVY3OWpCYjNid2tzdGprVnlrZ1VLZ2JuN2xVZmdWakJBaVhvY2tMOUtOVkYvVEZBRkZRQkhZa3hGSVRVMDFweWU2RUtRSVozUm5nQ3dSaGc0RmlZSXdmVXlnMGRmclRIWDljUWdCUTQ2d0NPR1NtcmN3ZnZtMmJjWXZXN3VHeW1iKzA0VHhVL0xUVC96US81dVVjZklwNUlHUTJBcU01aUJVQ0JNK0JJc3JuN1MwTkpOV1ZGUVV2RXFLVmwvVEZRRkZRQkhZa3hFQUtjSllFQ01CSklnNExFaFphc1g3Vk1XU2hDNHQzWk1CYVdEbjV0bCt4KzFVdlBoSE02eTBJVU9NMy9McWE2am9xeStERC82WHN1Vll6THRhVS9yM3ArWmp4aEMxYVV2dUhqMzR2ckJsVVVZNko3TkV3TUtIQTBsQ3dDQklFYndJUDFMZGVOTVc4ZjNTZWQ5K1JlM2FkYVRXYmR0U0I5NDQxSzVkTzJyUm9nVmw4dEp3UkljYjJ6d0pJMjBhaWxoZUV4VUJSVUFSY0JBQnVjVWtPaEhraHdNT2FjaUhuclRIa1c4dHVKcGsvVWtnQXA1aTNveURoL3Vianp1RHNEa0h6dE81TXpVLys1eGd0OFY4ZjdIa3QxK3AyY21qeWQyaG94RmFtMXNtVU43cmM3bE1ickNjUFFEaHdzR0hRR1U5WEpaWjdSUEJYcThtNFkvZWY0djY1cjFDeWV1SlZ1YjY2TWRTRHhWNFU2bkVsY0h2RzJ4RDdyVFdsSnpabWpLek9sQ0wxdTJwVmV0MjFJUEovZUNERDY1SmQxcEhFVkFFRklGYUk0QVZOZWhIV0k2eXlnYTlLTmFqZElCOFdKQW9MNjlza1R6MUU0ZUFwOE1ML3lBM1c0SjRDMDQwbDNiUXdkVHBqYmR3ZHpqMDJSUzJ6bEo2OXFMeW5FM1JxaG5CSXhNQ0YyY25TbnU2NU5mRVQwbEpwWDZkMGlnN2k4akxDL0tlTkNabTNBNzFGL0lQSDk3MVZGYmlwNkpTUCtYdDlOSG1kZVcwNEJNdnpmMWdMUDNsemtlQ3l4bzE2VHRhbmExYnQxSTZYM1EwYTlZc1doRk5Wd1NhTkFJLy8vd0xUWnA4WDBRTTdyeGpBdTI3N3o0Ujgrb2o4ZlUzM3FZMzMzeUhUanR0REowKzdsUkhobUFuUkpDay9VQUhzQnBoUGNweXE0UWQ2VndicVJZQmo2ZGpwMm9Mb1lDTHIxN0U2aE8vdW9vZ1B3Z2M1ZUZ3UllUdlBDTHVGREdpWFR4U2tsOVNSb1ZscVZUS2srbVgxU1cwYWFlWFVqejhGcDl5WHNkUFl1dlZ6ZXY0SE1kSTJtZWwwT21IcDlEblM5NmhLVk5hMFoxM1RrSXpqcml2dnZxYWJyengvMmo3OXUybXZVTU9PWmltVDMrVU9uV3lOajA1MG9tdEVaRHd1KysrUjVkZGRva3RWWU9LUU1OSG9IdjM3dFM5ZXpjejBBc3ZzRmFxWnI3NGlva2pyeUU1RUNNY2ZLZklVY2dRdDV0Z0hlS1FOTkdkRWhlZGliaTZ1a0hBdWlrWVIxOGlIUGhDZWxWVlJ4bGNJY0dYOGhBOHd0SldWZlZqeWNOMGNiTng2bVlDTEM4c29xOTM3RTNIbmZFMzhyaDlsTm1zbGZrMldtbHhQaFVYRjFDSjEwM3YvL3RPMnJ2Tkp1clZJWTMrL3Q0SE5ISGk1Rmk2cWJZTWxqN0dqNytHSmt5NGxjNDc3eHpDeHFNYmJyaUo3cnZ2ZnBveDQ5RnE2OWVrd0pZdFcraWVlKzZseXkrL3RDYlZ0WTRpVUc4SU5HdVd5WHNDTWt6Ly9mdnZhM3lKSTY4aHVYRnNMYjdCMWlOOHAvU1c2RUQ3L2d1MERYMEpaKzhIT2xQU0d4SXVlL0pZUXV1ZGNad2xoQXBCMllVWHFicWREQ0ZjV0k0NDRCQjMwdmw5c0F5VGFFZXVsL2JxZHdDTk92RTRPdUg0NDJuejJxVzBkTjY3bEo2V1RDZU9HRUZqVGhwT1hWdDdLSVdIVVZybUM0N0hpYkZzM2JxTkNnb0s2TWdqanpEbmg4MUE5OTkvSDF0MUllTDY1Sk5QYWN5WTAzakphRDhtdENzSmxoOGM2dDE4OHkwbWZjU0lrZlQ2NjlhenBjaWJ4Rzh1bWpYck5RU05lLzc1RitpaGh4Nmg1Y3RYMEFVWFhHelNoZzRkUmw5ODhhVUpmL3JwSERybGxER21yYi85N1k3Z1VqanFUSjU4ajhrYk5lb1Vxekg5VlFRVWdXb1JnTFU0NjlVWEhiTWFwVVBvUVN5WHluT00wSmxJZzI0Vi9RcGRpM1FwSTNYVlR5d0NOV1lvQ0ZESUw5SVFSYkFvSTRTSVNRQkJ5eEdwWGszVFREOThOcmxGUGtwdGxrMTRDODkzM3krbWp4NGZUNjZ2SDZMYnJqNlZ4bDgwa3M0ZE41eGN1V3ZKazRvSGJmRW9pclhrVzlOKzdmV3lzenZSZ0FFRDZPS0xMNkYvLy90VldydDJIYlZ1M1lvR0R0elBGUHZsbDE4TklaNTIybGpPZjlsTTlsdDRZeFBjaEFsLzVmSnJUZnJWVjQ4M1JQbjk5OStidkczOGFNM3UzZnlxdm9EYnZYczM3ZHk1ZzNyMDZFNzMzanZacEw3eXlyL01CaU1RNW1XWFhVSG5uMzhlSVczeDRpVTBiZHJEcHN5dVhUdnB1ZWRlb0lzdXVwQXQyVWVrT2ZVVkFVV2dIaENBam9RdWhINFVNaFM5aVNWVzBhK3lZeFU2VjEzZElSRDNzaXFHQmdHQzZFU1FrWVlMd1VvKzdqUEsxUkRLUXZDT0N4cHJxL3hXK2gwbGJ1cmQ3MERDQTdaNzkrMUJKMXp6QkRWdmxrTG5iOHJoWmM0Q1dybDZFelVyK2grZlJJb1pOZy9UVWZmaWkvK2dKNTk4bWkyMGU0MDFlTkJCZzlsNm5FcTllL2VtTDcvOGtrNDQ0UVFtcm5OTm53OC9QSTErL0hFeGsyUTUvZWMvNzlISEgzOUkrK3pUandZTkdrZy8vTENJNXN6NWpJWU90WFlRUnhva2RxOTE3ZHJGWlBYczJkUDRuMzMyR1IxenpORTBjdVJJRTcvdXVtdm90dHR1NStOV0V6L3Z2SE5wN0Zobk5oU1lCdlZIRVdnQ0NHQkRqaXlyT25YUFVXQVRnb1FQQjdJVUt4RzZFdW5RdDQ3clRCbUEraEVSaVB0U1JBZ3ZZbXUyUkNrSGtvUlFoUnlSTGhha3JYaXRnNGJrbUNCM0ZMdHAwYUtGOVBHSGI5RVA4NytnTHQxN3NpWFppYzY1K0VhNjVzYTdhZXlabDFLYWl5MUdKa1VlaXVPdVRaczJkUHZ0ZjZYLy9lOG5ldXV0Ti9oY2ZYVFZWZGVZZmxhdVhFVjkrL1lKOXRtcVZTdERaQnMzYmpScHNBVEY5ZTdkaTFhc1dDWFJtUDNac3orbHVYTS81eVhWQWVhNDRvcnhabk9RL0xPMWE5YzI1cmEwb0NLUVNBVFdyRmxuVmxkNjJEYmZJSXdWRitRMUpBZGloQlBmeWJHSmpvUnVSQmhrS0RvVFlSd2d6T29NRWlmSHBHMnhFUmN2Q0JBVUhJUlluUk1oaThBUkY5S3NybTY4K1dZMExqOXQyT21ucFM5TnBGdzJxUEpMK0tNaHZFbG42V1l2VGZqN2x6Umt5SUgweTAvZlVvYzBKa2NYbjdxL0xONXVxaXkvZXZWcVdyQmdJWjExMXBubVBBY1BQcENYUjIraWM4ODkzMHhzN014YnRXcDFzQTFzNE5uTW53dnIwS0c5U2Z2amp5MGtCTG1KTFYzWnlZZC9qRjI3ZGdYcllWazFtanY2NktPTTlUbDE2cjNSaW1pNkl0QWdFTGg3MGhRcTVQYzByMkV5dkh2UzFPQ1lDZ29LK1JHUEtmVEM4MDhGMCtvN1lOK1E0OVJZUkJmQ0Z3TEUvenFJVWZRczRuRFFvVUtlVHZXdjdWU05RTnlXbzFpQUVGcFZCQ25FaVBJb2gwT3Voa1RRVlE4dGpseWVYRzd1cDd6RVMyMjc3a1dUWHZpZVRwdjBLVjMwd0dkMDF0UlBhZXBMODNpVHpEQmVhazJqd3J3dDFES0RYK1RMSEMrVE00NmVxaXlha1pGQnQ5NTZHMi8zZnNzOHNwS2JtMHV2dmZZNjRYRU80RFZzMkRCNisrMTNDSTk3Z09DdzlJcmRySGl0M3JCaGgvSW1tNGNKZFpZdVhVWXZ2dmlTU1VPSElNdzVjK1lRQ0hQTm1yWGN4cnZCY2NENmhNTzlSVnhaWWhuMmxWZitUZlBuTHpEM1haOTU1bG02OU5MTGcrVTFvQWcwRkFSNjlPakdxeHY5ZURoK002OHh0eEZHbWx3WU5wU3hKbUpEanVnZjZFcTdMc1gvTVpaVHhkbnpwSTdrcVo4NEJFSVNpTEVQQ0FyQ2cwQ3JFcFNkRkVFTUtDLzFKQjVqbHpFVXM2NnF5bjEreW1FREs3K29tREtTVTdsUEVDQ1RjNm1YUHYzME05cVp1NXZ5VnMrbGpuMzQ3VGxsc2htbmVnczRoZ0dZSWgzNUJlNlBQejdERU9STk45MXMwbkFQOGFtbm5qUmhXSktUSjA4eWhJam5JUHYwNlVOUFBQRzR5WnMrL1JHNjVwcHJlZlBPQWVhVmQxZGNjUm1OR0hHQ3lUdjc3TFBvUFg3azVOQkREeU1zMitLZXBHRGZtZDltZE9LSkkyajA2RlBwNmFlZk5IVW1UcnlETndWZGF1NTVkdXZXalI1N2JMcHBSMzhVZ1lhRXdNUTcveG9jRHF4SU9IdGFNSE1QRFFqcFFSL2kveGtIZENUMkVpQlAwdVIvSFRCSW5UMFVrZ1oxV25HVEl3UWx4QmZMbWVCZWwxd0ZvUjVJMG1tSENaV2N6RXNUU1NrMHJPMWErdlVGZnMwZGJHTG1QWmxrU1p6QUZFMm45RXlqcEpRMFN1YmwxclFVdlBnM2JnaXFIUDdKSjU5RW8wYU5OTityaENVcGxwMVV1dUNDODh5R0hDd24yZC83MnI1OWUzNThZNVo1TmhLYmlZQ1ZPT1RObVRQYldKdW9ZODlEbWFlZWVzSThyaUU0WDNMSnhVeU9GNW55ZUwrc09CQ3pPa1ZBRVlnZmdVUnV5SkgvWitoR0VDV2M2RW5vTmpzaDJva3kvclBRR3ZFZ0VEY3pRR2hDT05WMUJFSGFoU24xd3RPcmE2ZTYvSjY5K3REbUpXWFV2WU9ML3RRdm5TaVZkOXBFM0d6am90SUNIeFVVZS9uTk9TN2FubDlPdVhtNTFUVWZkejRtT3l5NmFBN25ieWRHZXptOGNpNmFhOTY4ZWJTczRBdUtwUUQ2c0JPanBLdXZDQ2dDOFNNZ0czSGdPN2xiRlRvUmV3OXdZUXRpUkZ3T2lTTVBaYUJYa0tldWJoQ0lteHlGN09US3BycGhRc0JTVm53UmZuVjFZODAvNDh6emFOclAzOVBXSDk0M3I0emJWY0N2a3l2MlVSNGYyL045SFBiVHJvSnlLdkh6dXdxSkQzNk1Jem0xR2ZrOWFYVDRFZEVmbFlpMWZ5Mm5DQ2dDdFVNQXF5d04yU1ZxUXc3MEkwZ1BldFZhQWJNK2RDd3ZKUmRkaVhJZ1NIVjFoMENOeUJIQ2hDQ3JjaUpVbEpIeUVERHE0UkNTcmFxTldMaWJHQkFBQUFSclNVUkJWUE13a1c2OTUwbDY4TUdlTkcvZVBQTzVxcmJkMjVyN2MzdnpKNnhhdG14WjRjakt5aktiWUxCOGlUR3BVd1FVZ2ZwRjRPcnhWOVR2QUtycEhkYWlreFlqdWhNZEtyclNyaFBGa0VBYXd0Q2hjUFl5SmtGL0VvWkEzT1FJUVVHWUlxeXFSbVlYTEVnSTl4K2xiaXoxcTJvN1BBL3RUNWhndlcwbVBFL2ppb0FpMExBUmtIZXFOdXhST2pzNjZFZlJod2pqZ0k2VVBRZDJncFI4bEZkWE53akVUWTRRRW9RbWdvczJUSlNEdzNvNXJwRHNkWkNISlFJVmREVDBORjBSVUFUMmRBU2dCNkVieFZCQVdJd0krRWdYOG9TK0ZKMjZwK1BTVU02dlJ1UW93cXp1SkNCc0hIQVF0aEFrcm81RThOVzFvZm1LZ0NLZ0NPeUpDTWhLR2tnUCtoQytIR0pCZ2h4RmgrNkpHRFRrYzRxYkhDR29XQ3crbEV0bWdZdUZLVGVUVVJkcG1BU3h0Tk9Rd2RPeEtRS0tnQ0pRVXdTRUZLRUg4ZjVwZVJRTGNaQ2xrQ0wwSmVMUW9hSlBhOXFuMW9zZGdiakpFUllnSElSWmxYT1Y1cEd2Y0lzaFFVT0dYQmhYUTNCSldDSW8yVTdlL00wbXJqK0tnQ0tnQ0RRMUJLQURmWVZwNU9OYlQ4WmlUT2FkcXFWc1BVTEg4bEhHcEFpSFBCTmkwblNWRnpZMW1PcnRmT01tUjR4VXJteXFHclgvdTZ2NXNZbUtUaDVyVCtYazduenNXRkl4WDJPS2dDS2dDRFFWQkhyaVJKZUZ6bGIwcFdWQ2hOSTFWRDhJQ0YvRjNMdVkrcmlhVWFjSUtBS0tnQ0tnQ095SkNNUk5qbGo3aHRQN2hYdmlkTkJ6VWdRVUFVVkFFUUFDY1pNakxFWVFveUhIcEJxdHlpcnlpb0Fpb0Fnb0FnNGo0SEpiSDNCM3VOa20yMXpjNUFoU3hLWWNISzVXK3pSWjRQVEVGUUZGUUJGb1NBZ2tzVDZXMjEzaU42VHhOYmF4eEUyT09FRzU3NWpTL3lweXBiZHJiT2VzNDFVRUZBRkZZSTlDd04xeEdDVjNHMjdPU1luUkdkRzYyQktNNlgxRUtDYUhQTHlLUnpSS2Q2Nmkwa1ZUcWZ5UCtmeWRsWXFQZDRRM2JZK2pyanpYNDh5cGFDdUtnQ0tnQ0RRZUJLQkhaUThIUmgySjFDS2wyYy9RbGRLQzNOMUdVUHJnVzhtZDJ0eTBaMWIxK1BhWHRGMWRHL2IyTkJ4Q0lDNXlSRFVRbkR5dmlJZFNFUWJSU1RwOEhMQXV3OE5DcW5oR01pY25odzQ2NktEUVNEU2tDQ2dDaWtBVFFtREJnZ1dVbloxdFBqY250NnBBYUJLR0Q5MktOQnpRcDBpeit5QStwTUhRa0hMaUkwK0pzZVlUS3VZZE5RQlp5QTdnaStXSGRDRkNoSVVzSVRCN1hJU0xzc2lERTcvbXc5ZWFpb0Fpb0FnMFRnU2dINVA1d1gvb1FkR1g4SkVHL1FvbmVYYVNSRDBjMEtuMnNKMFVHeWNpRFd2VU1aT2pERnVJRVVRcEFrSlloSWZQUnlFTWtoVEJvUzdLd0tHK0NCeStPa1ZBRVZBRW1pSUMwSlZ3MElPdy9FQ0tjTkNiZGtzUWFWSVcraE1PT3RaK1c4cE9qSGE5YXdyclQ0MFFpSXNjQVRxRUFoK0NGQ3RRTEVxa3d3bnBDVUdpTE1MNEZBdnFGeFVWbVRha1hJMUdycFVVQVVWQUVXakVDSURjaEJoeEd0Q2ppSXQrUlJoNkU4U0lQQkFnOHNLUFNIbG9UL1F4d3VyaVJ5QXVja1R6QUR5Y0RFRitFRFFFQ2ZJRGFjcVZEOEpJRjRKRVhZUnhLRG5HTHpDdG9RZ29BbnNHQW1KY1FLZENINHIxaDdOREduUXBpQkZoSEhCMm5SbE9sc2lYY3VJalRWM05FUGgvOEU2NDdpZENpQ3NBQUFBQVNVVk9SSzVDWUlJPVwiIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlID0gT2JqZWN0LmNyZWF0ZShtb2R1bGUpO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsICdleHBvcnRzJywge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0c2V0OiAoKSA9PiB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VTIE1vZHVsZXMgbWF5IG5vdCBhc3NpZ24gbW9kdWxlLmV4cG9ydHMgb3IgZXhwb3J0cy4qLCBVc2UgRVNNIGV4cG9ydCBzeW50YXgsIGluc3RlYWQ6ICcgKyBtb2R1bGUuaWQpO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImNvbnRlbnRfc2NyaXB0XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2Nocm9tZV9leHRlbnNpb25fdHlwZXNjcmlwdF9zdGFydGVyXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2Nocm9tZV9leHRlbnNpb25fdHlwZXNjcmlwdF9zdGFydGVyXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9jb250ZW50X3NjcmlwdC50c3hcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==