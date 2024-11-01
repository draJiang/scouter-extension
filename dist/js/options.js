/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Options/Nav.tsx":
/*!*****************************!*\
  !*** ./src/Options/Nav.tsx ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const Nav = () => {
    return (react_1.default.createElement("header", { className: "w-full p-8 flex items-center" },
        react_1.default.createElement("div", { className: "flex items-center flex-auto" },
            react_1.default.createElement("div", { className: 'flex items-center mr-2' },
                react_1.default.createElement("img", { className: "w-5 h-5 mr-2", src: "icon128.png" }),
                react_1.default.createElement("h1", { className: "text-xl text-gray-800" }, "Scouter")),
            react_1.default.createElement("a", { className: "text-gray-500 text-sm pt-1", target: '_blank', href: 'https://jiangzilong.notion.site/Version-Change-log-79ae9243bafb48dab3160f10ed90f584?pvs=4' }, webextension_polyfill_1.default.runtime.getManifest().version)),
        react_1.default.createElement("div", { className: 'flex flex-row items-center' },
            react_1.default.createElement("a", { className: "text-gray-800  text-sm mr-4 flex flex-row items-center", target: '_blank', href: 'https://jiangzilong.notion.site/3dc5b8da86b6451296fc326c340ce6ba?v=c40102b71c3b48888ca7f37525f6a330&pvs=4' },
                react_1.default.createElement("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                    react_1.default.createElement("path", { d: "M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H7.5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" })),
                "Wiki"),
            react_1.default.createElement("a", { className: "text-gray-800 text-sm mr-4 flex flex-row items-center", target: '_blank', href: 'https://discord.gg/wMaMmH7MMK' },
                react_1.default.createElement("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                    react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5.07451 1.82584C5.03267 1.81926 4.99014 1.81825 4.94803 1.82284C4.10683 1.91446 2.82673 2.36828 2.07115 2.77808C2.02106 2.80525 1.97621 2.84112 1.93869 2.88402C1.62502 3.24266 1.34046 3.82836 1.11706 4.38186C0.887447 4.95076 0.697293 5.55032 0.588937 5.98354C0.236232 7.39369 0.042502 9.08728 0.0174948 10.6925C0.0162429 10.7729 0.0351883 10.8523 0.0725931 10.9234C0.373679 11.496 1.02015 12.027 1.66809 12.4152C2.32332 12.8078 3.08732 13.1182 3.70385 13.1778C3.85335 13.1922 4.00098 13.1358 4.10282 13.0255C4.2572 12.8581 4.5193 12.4676 4.71745 12.1643C4.80739 12.0267 4.89157 11.8953 4.95845 11.7901C5.62023 11.9106 6.45043 11.9801 7.50002 11.9801C8.54844 11.9801 9.37796 11.9107 10.0394 11.7905C10.1062 11.8957 10.1903 12.0269 10.2801 12.1643C10.4783 12.4676 10.7404 12.8581 10.8947 13.0255C10.9966 13.1358 11.1442 13.1922 11.2937 13.1778C11.9102 13.1182 12.6742 12.8078 13.3295 12.4152C13.9774 12.027 14.6239 11.496 14.925 10.9234C14.9624 10.8523 14.9813 10.7729 14.9801 10.6925C14.9551 9.08728 14.7613 7.39369 14.4086 5.98354C14.3003 5.55032 14.1101 4.95076 13.8805 4.38186C13.6571 3.82836 13.3725 3.24266 13.0589 2.88402C13.0214 2.84112 12.9765 2.80525 12.9264 2.77808C12.1708 2.36828 10.8907 1.91446 10.0495 1.82284C10.0074 1.81825 9.96489 1.81926 9.92305 1.82584C9.71676 1.85825 9.5391 1.96458 9.40809 2.06355C9.26977 2.16804 9.1413 2.29668 9.0304 2.42682C8.86968 2.61544 8.71437 2.84488 8.61428 3.06225C8.27237 3.03501 7.90138 3.02 7.5 3.02C7.0977 3.02 6.72593 3.03508 6.38337 3.06244C6.28328 2.84501 6.12792 2.61549 5.96716 2.42682C5.85626 2.29668 5.72778 2.16804 5.58947 2.06355C5.45846 1.96458 5.2808 1.85825 5.07451 1.82584ZM11.0181 11.5382C11.0395 11.5713 11.0615 11.6051 11.0838 11.6392C11.2169 11.843 11.3487 12.0385 11.4508 12.1809C11.8475 12.0916 12.352 11.8818 12.8361 11.5917C13.3795 11.2661 13.8098 10.8918 14.0177 10.5739C13.9852 9.06758 13.7993 7.50369 13.4773 6.21648C13.38 5.82759 13.2038 5.27021 12.9903 4.74117C12.7893 4.24326 12.5753 3.82162 12.388 3.5792C11.7376 3.24219 10.7129 2.88582 10.0454 2.78987C10.0308 2.79839 10.0113 2.81102 9.98675 2.82955C9.91863 2.881 9.84018 2.95666 9.76111 3.04945C9.71959 3.09817 9.68166 3.1471 9.64768 3.19449C9.953 3.25031 10.2253 3.3171 10.4662 3.39123C11.1499 3.6016 11.6428 3.89039 11.884 4.212C12.0431 4.42408 12.0001 4.72494 11.788 4.884C11.5759 5.04306 11.2751 5.00008 11.116 4.788C11.0572 4.70961 10.8001 4.4984 10.1838 4.30877C9.58933 4.12585 8.71356 3.98 7.5 3.98C6.28644 3.98 5.41067 4.12585 4.81616 4.30877C4.19988 4.4984 3.94279 4.70961 3.884 4.788C3.72494 5.00008 3.42408 5.04306 3.212 4.884C2.99992 4.72494 2.95694 4.42408 3.116 4.212C3.35721 3.89039 3.85011 3.6016 4.53383 3.39123C4.77418 3.31727 5.04571 3.25062 5.35016 3.19488C5.31611 3.14738 5.27808 3.09831 5.23645 3.04945C5.15738 2.95666 5.07893 2.881 5.01081 2.82955C4.98628 2.81102 4.96674 2.79839 4.95217 2.78987C4.28464 2.88582 3.25999 3.24219 2.60954 3.5792C2.42226 3.82162 2.20825 4.24326 2.00729 4.74117C1.79376 5.27021 1.61752 5.82759 1.52025 6.21648C1.19829 7.50369 1.01236 9.06758 0.97986 10.5739C1.18772 10.8918 1.61807 11.2661 2.16148 11.5917C2.64557 11.8818 3.15003 12.0916 3.5468 12.1809C3.64885 12.0385 3.78065 11.843 3.9138 11.6392C3.93626 11.6048 3.95838 11.5708 3.97996 11.5375C3.19521 11.2591 2.77361 10.8758 2.50064 10.4664C2.35359 10.2458 2.4132 9.94778 2.63377 9.80074C2.85435 9.65369 3.15236 9.71329 3.29941 9.93387C3.56077 10.3259 4.24355 11.0201 7.50002 11.0201C10.7565 11.0201 11.4392 10.326 11.7006 9.93386C11.8477 9.71329 12.1457 9.65369 12.3663 9.80074C12.5869 9.94779 12.6465 10.2458 12.4994 10.4664C12.2262 10.8762 11.8041 11.2598 11.0181 11.5382ZM4.08049 7.01221C4.32412 6.74984 4.65476 6.60162 5.00007 6.59998C5.34538 6.60162 5.67603 6.74984 5.91966 7.01221C6.16329 7.27459 6.30007 7.62974 6.30007 7.99998C6.30007 8.37021 6.16329 8.72536 5.91966 8.98774C5.67603 9.25011 5.34538 9.39833 5.00007 9.39998C4.65476 9.39833 4.32412 9.25011 4.08049 8.98774C3.83685 8.72536 3.70007 8.37021 3.70007 7.99998C3.70007 7.62974 3.83685 7.27459 4.08049 7.01221ZM9.99885 6.59998C9.65354 6.60162 9.3229 6.74984 9.07926 7.01221C8.83563 7.27459 8.69885 7.62974 8.69885 7.99998C8.69885 8.37021 8.83563 8.72536 9.07926 8.98774C9.3229 9.25011 9.65354 9.39833 9.99885 9.39998C10.3442 9.39833 10.6748 9.25011 10.9184 8.98774C11.1621 8.72536 11.2989 8.37021 11.2989 7.99998C11.2989 7.62974 11.1621 7.27459 10.9184 7.01221C10.6748 6.74984 10.3442 6.60162 9.99885 6.59998Z", fill: "currentColor" })),
                "Discord"),
            react_1.default.createElement("a", { className: "text-gray-800 text-sm mr-4 flex flex-row items-center", target: '_blank', href: 'https://chromewebstore.google.com/detail/scouter/mncfcjnabpfoagocanfjglfcpmmnkicb' },
                react_1.default.createElement("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                    react_1.default.createElement("path", { d: "M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" })),
                "Evaluation"))));
};
exports["default"] = Nav;


/***/ }),

/***/ "./src/Options/index.tsx":
/*!*******************************!*\
  !*** ./src/Options/index.tsx ***!
  \*******************************/
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
exports.Options = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
const amplitude = __importStar(__webpack_require__(/*! @amplitude/analytics-browser */ "./node_modules/@amplitude/analytics-browser/lib/esm/index.js"));
const Nav_1 = __importDefault(__webpack_require__(/*! ./Nav */ "./src/Options/Nav.tsx"));
const General_1 = __importDefault(__webpack_require__(/*! ./section/General */ "./src/Options/section/General/index.tsx"));
const AI_1 = __importDefault(__webpack_require__(/*! ./section/AI */ "./src/Options/section/AI.tsx"));
const Pro_1 = __importDefault(__webpack_require__(/*! ./section/Pro */ "./src/Options/section/Pro.tsx"));
const Anki_1 = __importDefault(__webpack_require__(/*! ./section/Anki */ "./src/Options/section/Anki/index.tsx"));
const Youtube_1 = __importDefault(__webpack_require__(/*! ./section/Youtube */ "./src/Options/section/Youtube.tsx"));
const cssinjs_1 = __webpack_require__(/*! @ant-design/cssinjs */ "./node_modules/@ant-design/cssinjs/es/index.js");
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");
const util_2 = __webpack_require__(/*! ./util */ "./src/Options/util.ts");
const userInfo_1 = __webpack_require__(/*! ../lib/userInfo */ "./src/lib/userInfo.ts");
__webpack_require__(/*! ./index.css */ "./src/Options/index.css");
__webpack_require__(/*! ../index.css */ "./src/index.css");
// const languageData: LanguageObject = lang;
const Options = () => {
    // interface UserContextType {
    //   userInfo: userInfoType;
    //   setUserInfo: Dispatch<SetStateAction<userInfoType>>;
    // }
    const defaultUserInfo = { userId: '', verified: false, contextMenu: false, showYoutubeButton: true, contentEditable: false };
    // const UserContext = createContext<UserContextType>({ userInfo: defaultUserInfo, setUserInfo: () => { } });
    const [userInfo, setUserInfo] = (0, react_1.useState)(defaultUserInfo);
    const [settings, setSettings] = (0, react_1.useState)();
    const divElement = (0, react_1.useRef)(null);
    const tabItems = [
        {
            name: 'General',
            content: react_1.default.createElement(General_1.default, { settings: settings, saveOptions: thisSaveOptions })
        },
        {
            name: 'Anki',
            content: react_1.default.createElement(Anki_1.default, { settings: settings, saveOptions: thisSaveOptions })
        },
        {
            name: 'AI',
            content: react_1.default.createElement(AI_1.default, { settings: settings, saveOptions: thisSaveOptions })
        },
        {
            name: 'YouTube',
            content: react_1.default.createElement(Youtube_1.default, { settings: settings, saveOptions: thisSaveOptions })
        },
        {
            name: '⚡Pro',
            content: react_1.default.createElement(Pro_1.default, { settings: settings, saveOptions: thisSaveOptions })
        }
    ];
    const thisGetUserStatus = () => {
        return new Promise((resolve, reject) => {
            (0, util_1.getUserInfo)().then((userInfo) => {
                // 更新 UI
                // setVerified(userInfo.verified)
                resolve(userInfo);
            });
        });
    };
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            // 获取配置信息
            const items = yield (0, util_2.getSettings)();
            setSettings(items);
            const userInfo = yield thisGetUserStatus();
            setUserInfo(userInfo);
            const userId = userInfo.userId;
            // 数据埋点
            amplitude.init("ed720e33b4190ef29a0718a040bbb55a", userId, {
                defaultTracking: {
                    pageViews: false,
                    sessions: false,
                },
            });
            amplitude.track('openOptions');
        }))();
    }, []);
    function thisSaveOptions(values) {
        return __awaiter(this, void 0, void 0, function* () {
            //保存设置
            (0, util_2.saveOptions)(values);
            // 获取键值对
            const entries = Object.entries(values);
            // 遍历键值对
            for (const [key, value] of entries) {
                if (key === 'newLicenseKey') {
                    // 更新订阅状态
                    const userInfo = yield thisGetUserStatus();
                    setUserInfo(userInfo);
                }
            }
            // 更新
            const items = yield (0, util_2.getSettings)();
            setSettings(items);
        });
    }
    return (react_1.default.createElement(userInfo_1.UserInfoContext.Provider, { value: { user: userInfo, anki: null } },
        react_1.default.createElement("div", { className: 'flex flex-col items-center h-screen' },
            react_1.default.createElement(Nav_1.default, null),
            react_1.default.createElement("div", { id: "MyOptions", ref: divElement, className: ' flex-1' },
                react_1.default.createElement(antd_1.ConfigProvider, { theme: {
                        // algorithm: theme.defaultAlgorithm,
                        token: {
                            colorPrimary: '#F08A24',
                            colorLink: "#F08A24",
                            colorLinkHover: "#ffc478",
                            colorLinkActive: "#c96914"
                        },
                    } },
                    react_1.default.createElement(antd_1.Tabs, { className: 'w-full h-full grow', tabPosition: 'left', items: tabItems.map((item, i) => {
                            const id = String(i + 1);
                            return {
                                label: item.name,
                                key: id,
                                children: item.content,
                            };
                        }) }))))));
};
exports.Options = Options;
react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(cssinjs_1.StyleProvider, null,
        react_1.default.createElement(exports.Options, null))), document.getElementById("root"));


/***/ }),

/***/ "./src/Options/section/AI.tsx":
/*!************************************!*\
  !*** ./src/Options/section/AI.tsx ***!
  \************************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const models_1 = __webpack_require__(/*! ../models */ "./src/Options/models.ts");
const use_debounce_1 = __webpack_require__(/*! use-debounce */ "./node_modules/use-debounce/dist/index.module.js");
const AI = ({ settings, saveOptions }) => {
    const [form] = antd_1.Form.useForm();
    const { Option } = antd_1.Select;
    const [radioValue, setRadioValue] = (0, react_1.useState)('myOwnOpenAiKey');
    const onRadioChange = (e) => {
        setRadioValue(e.target.value);
    };
    (0, react_1.useEffect)(() => {
        if (settings) {
            setRadioValue(settings.apiKeySelection);
            form.setFieldsValue({
                apiKeySelection: settings.apiKeySelection,
                openApiKey: settings.openApiKey,
                openApiEndpoint: settings.openApiEndpoint,
                licenseKey: settings.licenseKey,
                chatGPTWeb: settings.chatGPTWeb,
                model: settings.model,
                freeModel: settings.freeModel,
                newLicenseKey: settings.newLicenseKey,
                ollamaApiEndpoint: settings.ollamaApiEndpoint,
                ollamaModel: settings.ollamaModel
            });
        }
    }, [settings]);
    const handleFormChange = (0, use_debounce_1.useDebouncedCallback)((term) => {
        saveOptions(term);
    }, 300);
    return (react_1.default.createElement(antd_1.Form, { onValuesChange: handleFormChange, form: form, 
        // labelCol={{ span: 4 }}
        layout: "horizontal" },
        react_1.default.createElement("section", null,
            react_1.default.createElement(antd_1.Form.Item, { name: "apiKeySelection", label: "\uD83D\uDD0BIn use" },
                react_1.default.createElement(antd_1.Radio.Group, { onChange: onRadioChange, value: radioValue, size: "small", style: { marginBottom: 0, display: 'flex' } },
                    react_1.default.createElement(antd_1.Radio.Button, { value: "scouterFreeAI", style: { flex: '1', textAlign: 'center' } }, "Scouter"),
                    react_1.default.createElement(antd_1.Radio.Button, { value: "myOwnOpenAiKey", style: { flex: '1', textAlign: 'center' } }, "OpenAI"),
                    react_1.default.createElement(antd_1.Radio.Button, { value: "ollama", style: { flex: '1', textAlign: 'center' } }, "Ollama"),
                    react_1.default.createElement(antd_1.Radio.Button, { value: "licenseKey", style: { flex: '1', textAlign: 'center' } }, "OpenRouter"))),
            react_1.default.createElement("div", { 
                // className="text-center"
                style: {
                    display: radioValue === 'scouterFreeAI' ? 'block' : 'none'
                } },
                react_1.default.createElement(antd_1.Form.Item, { name: "freeModel", label: "\uD83E\uDD16Model", initialValue: models_1.freeModels[0]['name'] },
                    react_1.default.createElement(antd_1.Select, { placeholder: "" }, models_1.freeModels.map((item) => react_1.default.createElement(Option, { key: item.id, value: item.id }, item.name))))),
            react_1.default.createElement("div", { style: {
                    display: radioValue === 'myOwnOpenAiKey' ? 'block' : 'none'
                } },
                react_1.default.createElement(antd_1.Form.Item, { name: "openApiEndpoint", label: "\uD83D\uDD17API Endpoint", extra: react_1.default.createElement("p", { style: {
                            color: '#666'
                        } },
                        "If you are using ",
                        react_1.default.createElement("strong", null, "Azure"),
                        " or a third-party endpoint, please fill in the endpoint address. ",
                        react_1.default.createElement("a", { target: '__blank', href: 'https://jiangzilong.notion.site/Set-up-your-API-Key-96266d5236fa462ca707683d9bb275c6?pvs=4' }, "Learn More\u2197\uFE0F")) },
                    react_1.default.createElement(antd_1.Input, { placeholder: "https://api.openai.com", type: "url" })),
                react_1.default.createElement(antd_1.Form.Item, { name: "openApiKey", label: "\uD83D\uDD11Your Open API Key" },
                    react_1.default.createElement(antd_1.Input, { placeholder: "We will not use your Key for any other purposes.", type: "password" }))),
            react_1.default.createElement("div", { style: {
                    display: radioValue === 'ollama' ? 'block' : 'none'
                } },
                react_1.default.createElement(antd_1.Form.Item, { name: "ollamaApiEndpoint", label: "\uD83D\uDD17API Endpoint" },
                    react_1.default.createElement(antd_1.Input, { placeholder: "http://localhost:11434", type: "url" })),
                react_1.default.createElement(antd_1.Form.Item, { name: "ollamaModel", label: "\uD83E\uDD16Model", extra: react_1.default.createElement("p", { style: {
                            color: '#666'
                        } },
                        " ",
                        react_1.default.createElement("a", { target: '__blank', href: 'https://jiangzilong.notion.site/How-to-use-Ollama-f8ff0d71198945b883e71e08f09cc9f5?pvs=4' }, "Learn More\u2197\uFE0F")) },
                    react_1.default.createElement(antd_1.Input, { placeholder: "llama2", type: "text" }))),
            react_1.default.createElement("div", { style: {
                    display: radioValue === 'licenseKey' ? 'block' : 'none'
                } },
                react_1.default.createElement(antd_1.Form.Item, { name: "licenseKey", label: "\uD83D\uDD11Key", style: { marginBottom: '16px' } },
                    react_1.default.createElement(antd_1.Input, { placeholder: "We will not use your Key for any other purposes.", type: "password" })),
                react_1.default.createElement(antd_1.Form.Item, { name: "model", label: "\uD83E\uDD16Model", initialValue: models_1.models[0]['name'] },
                    react_1.default.createElement(antd_1.Select, { placeholder: "" }, models_1.models.map((item) => react_1.default.createElement(Option, { key: item.id, value: item.id }, item.name))))),
            react_1.default.createElement("div", { className: " text-center", style: {
                    display: radioValue === 'chatGPTWeb' ? 'block' : 'none',
                    color: '#F08A24'
                } }, "\u26A0\uFE0FSorry, this feature is temporarily unavailable."))));
};
exports["default"] = AI;


/***/ }),

/***/ "./src/Options/section/Anki/index.tsx":
/*!********************************************!*\
  !*** ./src/Options/section/Anki/index.tsx ***!
  \********************************************/
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const util_1 = __webpack_require__(/*! ../../../util */ "./src/util.ts");
const use_debounce_1 = __webpack_require__(/*! use-debounce */ "./node_modules/use-debounce/dist/index.module.js");
const icons_1 = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
const { TextArea } = antd_1.Input;
const Anki = ({ settings, saveOptions }) => {
    const [ankiClientIsopen, setAnkiClientIsopen] = (0, react_1.useState)(true);
    const [ankiDeckNames, setAnkiDeckNames] = (0, react_1.useState)("loading");
    const [ankiModelNames, setAnkiModelNames] = (0, react_1.useState)("loading");
    const [ankiModelFieldNames, setAnkiModelFieldNames] = (0, react_1.useState)([]);
    const [fieldsStatus, setFieldsStatus] = (0, react_1.useState)(undefined);
    const [isScouterNote, setIsScouterNote] = (0, react_1.useState)({});
    const [form] = antd_1.Form.useForm();
    // const [formForField] = Form.useForm();
    const { Option } = antd_1.Select;
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            if (settings) {
                // 更新 默认值
                // form.setFieldsValue({
                //   ankiDeckName: settings.ankiDeckName,
                //   ankiNoteName: settings.ankiNoteName,
                // });
                // 设置默认值
                form.setFieldsValue({
                    ankiSettings: settings.ankiSettings,
                });
                // formForField.setFieldsValue({
                //     ankiNoteName: settings.ankiNoteName
                // });
                checkScouterNote();
            }
        }))();
        // setIsScouterNote(settings?.ankiNoteName.indexOf("Scouter") > -1);
    }, [settings]);
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // 获取 Note 对应的 fields
                handleModelFieldNames(settings === null || settings === void 0 ? void 0 : settings.ankiNoteName);
                const [deckNamesResult, modelNamesResult] = yield Promise.all([
                    (0, util_1.ankiAction)("deckNames", 6),
                    (0, util_1.ankiAction)("modelNames", 6),
                ]);
                // 处理 deckNames 结果
                if (deckNamesResult) {
                    const deckNames = deckNamesResult.result;
                    setAnkiDeckNames(deckNames);
                }
                // 处理 modelNames 结果
                if (modelNamesResult) {
                    const modelNames = modelNamesResult.result;
                    setAnkiModelNames(modelNames);
                }
            }
            catch (error) {
                setAnkiClientIsopen(false);
            }
        }))();
    }, [ankiClientIsopen]);
    // Note, Fields 表单修改时
    const handleFieldsFormChange = (0, use_debounce_1.useDebouncedCallback)((changedFields, allFields) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("onFieldsChange===");
        console.log(changedFields);
        // 如果更改的是 ankiNoteName，则需要更新 Fileds 表单
        if (Array.isArray(changedFields[0].name) &&
            changedFields[0].name.includes("ankiNoteName")) {
            // 设置加载状态
            setFieldsStatus({
                status: "loading",
                msg: "",
                index: changedFields[0]["name"][1],
            });
            // 获取 note 对应的 fileds 信息
            const result = yield handleModelFieldNames(changedFields[0].value);
            if (!result.error) {
                const modelFieldNames = result.data;
                let filedsNamePath = changedFields[0].name;
                filedsNamePath[filedsNamePath.length - 1] = "ankiFields";
                const filedsValue = modelFieldNames.map((name) => ({
                    [name]: "",
                }));
                console.log(modelFieldNames);
                form.setFieldValue(filedsNamePath, filedsValue);
                setFieldsStatus({
                    status: "ready",
                    msg: "",
                });
            }
        }
    }), 300);
    // 表单修改时
    const handleFormChange = (0, use_debounce_1.useDebouncedCallback)((term) => {
        console.log("handleFormChange========:");
        console.log(form.getFieldsValue());
        // console.log(settings);
        // console.log(term);
        // console.log(term["ankiSettings"][0]);
        let values = form.getFieldsValue();
        // values = values.ankiSettings.filter((item: AnkiSettingType) => {
        //   return item && item.ankiNoteName;
        // });
        // console.log("values:");
        // console.log(values);
        saveOptions(values);
        checkScouterNote();
    }, 300);
    // Scouter 默认 note 不支持编辑
    const checkScouterNote = () => {
        const formValues = form.getFieldsValue().ankiSettings;
        const newIsScouterNote = {};
        formValues.forEach((item, index) => {
            console.log(item);
            if (item.ankiNoteName) {
                if (item.ankiNoteName.indexOf("Scouter") > -1) {
                    // 如果是默认的 Note 则不支持修改 fileds
                    newIsScouterNote[index] = true;
                }
            }
            // if (item && item.input1 === "special") {
            //   newIsScouterNote[index] = true;
            // } else {
            //   newIsScouterNote[index] = false;
            // }
        });
        setIsScouterNote(newIsScouterNote);
    };
    // 获取 Note 对应的 fields
    const handleModelFieldNames = (noteName) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("handleModelFieldNames");
        if (noteName) {
            // 通过 noteName 获取对应的 fileds 信息
            const modelFieldNamesResult = yield (0, util_1.ankiAction)("modelFieldNames", 6, {
                modelName: noteName,
            });
            if (modelFieldNamesResult.result) {
                const modelFieldNames = modelFieldNamesResult.result;
                setAnkiModelFieldNames(modelFieldNames);
                console.log("modelFieldNamesResult:");
                console.log(modelFieldNamesResult);
                handleFormChange();
                return { error: false, data: modelFieldNamesResult.result };
                // 渲染 fields 表单的默认值
                // const fieldsRecord = settings?.ankiFields;
                // if (fieldsRecord) {
                //   // 找到 ankiNoteName 对应的 fields
                //   const targetRecord = fieldsRecord.find(
                //     (item: any) => item.note === noteName
                //   );
                //   const tf = Object.keys(targetRecord.fields).reduce<{
                //     [key: string]: string;
                //   }>((obj, item) => {
                //     const v = targetRecord.fields[item];
                //     obj[item] = v ? v.replace(/<br>/g, "\n") : v;
                //     return obj;
                //   }, {});
                //   if (tf) {
                //     form.setFieldsValue(tf);
                //   }
                // }
            }
            else {
                alert(modelFieldNamesResult.error);
                return { error: true, msg: modelFieldNamesResult.error };
            }
        }
        return { error: false, data: [] };
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        !ankiClientIsopen && (react_1.default.createElement("div", { style: {
                color: "#f50",
                border: "1px solid #f50",
                padding: "10px",
                marginBottom: "20px",
                borderRadius: "4px",
            } },
            "Anki client and related settings not found. Please",
            " ",
            react_1.default.createElement("a", { style: { textDecorationLine: "underline" }, target: "__blank", href: "https://jiangzilong.notion.site/Use-the-Add-to-Anki-feature-7ab95ff8aa5e419c978e8a2a0a451324" }, "configure\u2197\uFE0F"),
            " ",
            "and try again")),
        react_1.default.createElement(antd_1.Form
        // onFinish={}
        , { 
            // onFinish={}
            onValuesChange: handleFormChange, onFieldsChange: handleFieldsFormChange, form: form, labelCol: { span: 4 }, layout: "horizontal", initialValues: { items: [{}] } },
            react_1.default.createElement(antd_1.Form.List, { name: "ankiSettings" }, (fields, { add, remove, move }) => (react_1.default.createElement("div", { className: "flex flex-col gap-4" },
                fields.map((_a, index) => {
                    var { key, name } = _a, restField = __rest(_a, ["key", "name"]);
                    return (react_1.default.createElement(antd_1.Card, { key: key },
                        index == 0 && (react_1.default.createElement(antd_1.Tag, { className: " mb-6", icon: react_1.default.createElement(icons_1.StarOutlined, null), color: "orange" },
                            "Default",
                            " ")),
                        react_1.default.createElement(antd_1.Form.Item, Object.assign({}, restField, { name: [name, "ankiDeckName"], label: "Deck Name", initialValue: undefined }),
                            react_1.default.createElement(antd_1.Select, { placeholder: "Anki Deck Name", disabled: !ankiClientIsopen, loading: ankiDeckNames === "loading" }, ankiDeckNames !== "loading" &&
                                ankiDeckNames.map((item) => (react_1.default.createElement(Option, { key: item, value: item }, item))))),
                        react_1.default.createElement(antd_1.Form.Item, Object.assign({}, restField, { name: [name, "ankiNoteName"], label: "Note Name", initialValue: undefined }),
                            react_1.default.createElement(antd_1.Select, { placeholder: "Anki Note Name", disabled: !ankiClientIsopen, loading: ankiModelNames === "loading" }, ankiModelNames !== "loading" &&
                                ankiModelNames.map((item) => {
                                    return (react_1.default.createElement(Option, { key: item, value: item },
                                        " ",
                                        item));
                                }))),
                        (fieldsStatus === null || fieldsStatus === void 0 ? void 0 : fieldsStatus.status) === "loading" &&
                            (fieldsStatus === null || fieldsStatus === void 0 ? void 0 : fieldsStatus.index) === index ? (react_1.default.createElement(antd_1.Skeleton, { active: true })) : (react_1.default.createElement(antd_1.Form.List, { name: [name, "ankiFields"] }, (subFields, subOpt) => (react_1.default.createElement(react_1.default.Fragment, null, subFields.map((subField, subIndex) => {
                            const fieldName = Object.keys(form.getFieldValue([
                                "ankiSettings",
                                name,
                                "ankiFields",
                                subIndex,
                            ]) || {})[0] || "";
                            return (react_1.default.createElement(antd_1.Form.Item, { key: subField.key, name: [subField.name, fieldName], label: fieldName },
                                react_1.default.createElement(TextArea, { disabled: isScouterNote[index], autoSize: { minRows: 2, maxRows: 4 }, placeholder: isScouterNote[index]
                                        ? "The default note is not editable"
                                        : "{{Selection}}, {{Image}}..." })));
                        }))))),
                        react_1.default.createElement("div", { className: " flex flex-row gap-3 justify-end" },
                            fields.length > 1 && (
                            // <Form.Item>
                            react_1.default.createElement(antd_1.Tooltip, { title: "Delete" },
                                react_1.default.createElement(antd_1.Button, { className: "flex items-center justify-center", onClick: () => remove(name), 
                                    // block
                                    icon: react_1.default.createElement(icons_1.DeleteOutlined, null) }))
                            // </Form.Item>
                            ),
                            index !== 0 && (
                            // <Form.Item>
                            react_1.default.createElement(antd_1.Tooltip, { title: "Set as Default" },
                                react_1.default.createElement(antd_1.Button, { className: "flex items-center justify-center", onClick: () => {
                                        move(index, 0);
                                        window.scroll({
                                            top: 0,
                                            behavior: "smooth",
                                        });
                                    }, icon: react_1.default.createElement(icons_1.StarOutlined, null) }))
                            // </Form.Item>
                            ))));
                }),
                react_1.default.createElement(antd_1.Form.Item, null,
                    react_1.default.createElement(antd_1.Button, { className: "flex items-center justify-center", type: "dashed", onClick: () => add(), icon: react_1.default.createElement(icons_1.PlusOutlined, null), block: true }, "Add")))))),
        react_1.default.createElement("div", { className: " flex" },
            react_1.default.createElement("img", { className: "w-auto h-auto max-w-xl p-4 object-contain", src: "images/diagram.png" }),
            react_1.default.createElement("div", { className: " mt-11" },
                react_1.default.createElement("p", { className: " mb-3" }, "You can customize the content of each field when adding to Anki. You can input any string, including the following dynamic variables:"),
                react_1.default.createElement("div", { className: " list-disc flex flex-col gap-1" },
                    react_1.default.createElement("h3", { className: " font-semibold" }, "{{Selection}}"),
                    react_1.default.createElement("p", null, "Selected text"),
                    react_1.default.createElement("h3", { className: " font-semibold" }, "{{Sentence}}"),
                    react_1.default.createElement("p", null, "Sentence containing the selected text"),
                    react_1.default.createElement("h3", { className: " font-semibold" }, "{{Audio}}"),
                    react_1.default.createElement("p", null, "Pronunciation of the selected content"),
                    react_1.default.createElement("h3", { className: " font-semibold" }, "{{Image}}"),
                    react_1.default.createElement("p", null, "Picture"),
                    react_1.default.createElement("h3", { className: " font-semibold" }, "{{Definition}}"),
                    react_1.default.createElement("p", null, "Definition of the content"),
                    react_1.default.createElement("h3", { className: " font-semibold" }, "{{Source}}"),
                    react_1.default.createElement("p", null, "Link to the current website"))))));
};
exports["default"] = Anki;


/***/ }),

/***/ "./src/Options/section/Pro.tsx":
/*!*************************************!*\
  !*** ./src/Options/section/Pro.tsx ***!
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
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const icons_1 = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
const ProTag_1 = __webpack_require__(/*! ../../Components/ProTag */ "./src/Components/ProTag.tsx");
const userInfo_1 = __webpack_require__(/*! ../../lib/userInfo */ "./src/lib/userInfo.ts");
const use_debounce_1 = __webpack_require__(/*! use-debounce */ "./node_modules/use-debounce/dist/index.module.js");
const canvas_confetti_1 = __importDefault(__webpack_require__(/*! canvas-confetti */ "./node_modules/canvas-confetti/dist/confetti.module.mjs"));
const Pro = ({ settings, saveOptions }) => {
    // const [verified, setVerified] = useState<boolean | null>(false);
    const [form] = antd_1.Form.useForm();
    const userInfo = (0, userInfo_1.useUserInfoContext)();
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        // thisGetUserStatus()
        if (settings) {
            // 更新 默认值
            form.setFieldsValue({
                newLicenseKey: settings.newLicenseKey,
            });
        }
    }, [settings]);
    (0, react_1.useEffect)(() => {
        if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified) {
            (0, canvas_confetti_1.default)({
                particleCount: 140,
                spread: 170,
                origin: { y: 0.4 },
            });
        }
    }, [userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified]);
    const handleFormChange = (0, use_debounce_1.useDebouncedCallback)((term) => {
        saveOptions(term);
    }, 300);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    return (
    // <section style={{
    //     border: '1px solid #ffd9a1',
    //     backgroundColor: '#fffaf0'
    // }}>
    react_1.default.createElement("div", null,
        react_1.default.createElement(antd_1.Form, { form: form, onValuesChange: handleFormChange, labelCol: { span: 4 }, layout: "horizontal" },
            react_1.default.createElement(antd_1.Form.Item, { name: "newLicenseKey", 
                // label={<> <ProTag /></>}
                style: {} },
                react_1.default.createElement(antd_1.Input, { style: { paddingLeft: "5px" }, prefix: react_1.default.createElement("span", { style: { marginRight: "4px" } },
                        " ",
                        react_1.default.createElement(ProTag_1.ProTag, null)), suffix: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified) && (react_1.default.createElement(icons_1.CheckCircleTwoTone, { twoToneColor: "#52c41a" })), placeholder: "License Key", type: "password" }))),
        react_1.default.createElement("section", { className: "bg-white " },
            react_1.default.createElement("div", { className: "py-8 px-4 mx-auto max-w-screen-xl lg:py-9 lg:px-6" },
                react_1.default.createElement("div", { className: "mx-auto max-w-screen-md text-center mb-8 lg:mb-12" },
                    react_1.default.createElement("h2", { className: "mb-4 text-4xl tracking-tight font-extrabold text-gray-900 " }, "Bridging the gap between theory and practice")),
                react_1.default.createElement("div", { className: "flex flex-row justify-center" },
                    react_1.default.createElement("div", { className: "flex flex-col p-6 mx-4 min-w-72 max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow  xl:p-8 " },
                        react_1.default.createElement("div", { className: "flex flex-col gap-3 mb-8" },
                            react_1.default.createElement("h3", { className: "text-2xl font-semibold" }, "Starter"),
                            react_1.default.createElement("p", { className: "font-light text-gray-500 sm:text-lg " }, "/"),
                            react_1.default.createElement("div", { className: "flex justify-center items-baseline" },
                                react_1.default.createElement("span", { className: "mr-2 text-5xl font-extrabold" }, "$0"))),
                        react_1.default.createElement("ul", { role: "list", className: "mb-8 space-y-4 text-left" },
                            react_1.default.createElement("li", { className: "flex items-center space-x-3" },
                                react_1.default.createElement("svg", { className: "flex-shrink-0 w-5 h-5 text-green-500 ", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" },
                                    react_1.default.createElement("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })),
                                react_1.default.createElement("span", null, "AI")),
                            react_1.default.createElement("li", { className: "flex items-center space-x-3" },
                                react_1.default.createElement("svg", { className: "flex-shrink-0 w-5 h-5 text-green-500 ", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" },
                                    react_1.default.createElement("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })),
                                react_1.default.createElement("span", null, "Online dictionary")),
                            react_1.default.createElement("li", { className: "flex items-center space-x-3" },
                                react_1.default.createElement("svg", { className: "flex-shrink-0 w-5 h-5 text-green-500 ", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" },
                                    react_1.default.createElement("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })),
                                react_1.default.createElement("span", null, "Add to Anki")),
                            react_1.default.createElement("li", { className: "flex items-center space-x-3" },
                                react_1.default.createElement("svg", { className: "flex-shrink-0 w-5 h-5 text-gray-500 ", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                    react_1.default.createElement("path", { d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" })),
                                react_1.default.createElement("span", null, "Learning in YouTube")),
                            react_1.default.createElement("li", { className: "flex items-center space-x-3" },
                                react_1.default.createElement("svg", { className: "flex-shrink-0 w-5 h-5 text-gray-500 ", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                    react_1.default.createElement("path", { d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" })),
                                react_1.default.createElement("span", null, "Search images")),
                            react_1.default.createElement("li", { className: "flex items-center space-x-3" },
                                react_1.default.createElement("svg", { className: "flex-shrink-0 w-5 h-5 text-gray-500 ", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                    react_1.default.createElement("path", { d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" })),
                                react_1.default.createElement("span", null, "Paste the image from the clipboard")),
                            react_1.default.createElement("li", { className: "flex items-center space-x-3" },
                                react_1.default.createElement("svg", { className: "flex-shrink-0 w-5 h-5 text-gray-500 ", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                    react_1.default.createElement("path", { d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" })),
                                react_1.default.createElement("span", null, "Append query")),
                            react_1.default.createElement("li", { className: "flex items-center space-x-3" },
                                react_1.default.createElement("svg", { className: "flex-shrink-0 w-5 h-5 text-gray-500 ", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                    react_1.default.createElement("path", { d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" })),
                                react_1.default.createElement("span", null, "Content Editable")))),
                    react_1.default.createElement("div", { className: "flex flex-col p-6 mx-4 min-w-72 max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow  xl:p-8 " },
                        react_1.default.createElement("div", { className: "flex flex-col gap-3 mb-8" },
                            react_1.default.createElement("h3", { className: "text-2xl font-semibold" }, "Pro"),
                            react_1.default.createElement("p", { className: "font-light text-gray-500 sm:text-lg " }, "One-time"),
                            react_1.default.createElement("div", { className: "flex justify-center items-baseline" },
                                react_1.default.createElement("span", { className: "mr-2 text-5xl font-extrabold" }, "$9"))),
                        react_1.default.createElement("ul", { role: "list", className: "mb-8 space-y-4 text-left" },
                            react_1.default.createElement("li", { className: "flex items-center space-x-3" },
                                react_1.default.createElement("svg", { className: "flex-shrink-0 w-5 h-5 text-green-500 ", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" },
                                    react_1.default.createElement("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })),
                                react_1.default.createElement("span", null, "AI")),
                            react_1.default.createElement("li", { className: "flex items-center space-x-3" },
                                react_1.default.createElement("svg", { className: "flex-shrink-0 w-5 h-5 text-green-500 ", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" },
                                    react_1.default.createElement("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })),
                                react_1.default.createElement("span", null, "Online dictionary")),
                            react_1.default.createElement("li", { className: "flex items-center space-x-3" },
                                react_1.default.createElement("svg", { className: "flex-shrink-0 w-5 h-5 text-green-500 ", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" },
                                    react_1.default.createElement("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })),
                                react_1.default.createElement("span", null, "Add to Anki")),
                            react_1.default.createElement("li", { className: "flex items-center space-x-3" },
                                react_1.default.createElement("svg", { className: "flex-shrink-0 w-5 h-5 text-green-500 ", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" },
                                    react_1.default.createElement("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })),
                                react_1.default.createElement("span", null, "Learning in YouTube"),
                                react_1.default.createElement("a", { target: "_blank", href: "https://jiangzilong.notion.site/Learning-in-YouTube-YouTube-1d61fd50815a42a5af394db4a695c712?pvs=4" },
                                    react_1.default.createElement("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                        react_1.default.createElement("path", { d: "M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" })))),
                            react_1.default.createElement("li", { className: "flex items-center space-x-3" },
                                react_1.default.createElement("svg", { className: "flex-shrink-0 w-5 h-5 text-green-500 ", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" },
                                    react_1.default.createElement("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })),
                                react_1.default.createElement("span", null, "Search images"),
                                react_1.default.createElement("a", { target: "_blank", href: "https://jiangzilong.notion.site/Search-images-396d245dece948ff803b9e51f56bb38f?pvs=4" },
                                    react_1.default.createElement("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                        react_1.default.createElement("path", { d: "M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" })))),
                            react_1.default.createElement("li", { className: "flex items-center space-x-3" },
                                react_1.default.createElement("svg", { className: "flex-shrink-0 w-5 h-5 text-green-500 ", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" },
                                    react_1.default.createElement("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })),
                                react_1.default.createElement("span", null, "Paste the image from the clipboard"),
                                react_1.default.createElement("a", { target: "_blank", href: "https://jiangzilong.notion.site/Paste-the-image-from-the-clipboard-3606ca8e574f4652ac5837203c651da7?pvs=4" },
                                    react_1.default.createElement("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                        react_1.default.createElement("path", { d: "M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" })))),
                            react_1.default.createElement("li", { className: "flex items-center space-x-3" },
                                react_1.default.createElement("svg", { className: "flex-shrink-0 w-5 h-5 text-green-500 ", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" },
                                    react_1.default.createElement("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })),
                                react_1.default.createElement("span", null, "Append query"),
                                react_1.default.createElement("a", { target: "_blank", href: "https://jiangzilong.notion.site/Follow-up-question-c321072e9cbc4bcfb51843647aa72045?pvs=4" },
                                    react_1.default.createElement("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                        react_1.default.createElement("path", { d: "M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" })))),
                            react_1.default.createElement("li", { className: "flex items-center space-x-3" },
                                react_1.default.createElement("svg", { className: "flex-shrink-0 w-5 h-5 text-green-500 ", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" },
                                    react_1.default.createElement("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })),
                                react_1.default.createElement("span", null, "Content Editable"),
                                react_1.default.createElement("a", { target: "_blank", href: "https://jiangzilong.notion.site/Content-Editable-Pro-54644438b77d4d3fb756cf8baaf5357a?pvs=4" },
                                    react_1.default.createElement("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                        react_1.default.createElement("path", { d: "M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }))))),
                        react_1.default.createElement("a", { href: "#", onClick: () => {
                                window.open("https://jiang.lemonsqueezy.com/checkout/buy/e31f8c18-7bf2-4f6b-85c2-508fb500ce84");
                            }, className: "text-white hover:text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center " }, "Get started"),
                        react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement("a", { href: "#", onClick: showModal, className: " mt-2 hover:text-orange-500 text-orange-400  focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center " }, "\u5FAE\u4FE1\u652F\u4ED8"),
                            react_1.default.createElement(antd_1.Modal, { title: "WeChatPay", open: isModalOpen, onCancel: handleOk, footer: null, maskClosable: true },
                                react_1.default.createElement("div", { className: "flex flex-col justify-center items-center gap-3" },
                                    react_1.default.createElement("p", null, "\u8BF7\u5728\u4ED8\u6B3E\u65F6\u5907\u6CE8\u4F60\u7684\u90AE\u7BB1\uFF0C\u6FC0\u6D3B\u7801\u5C06\u53D1\u9001\u81F3\u90AE\u7BB1\u4E2D"),
                                    react_1.default.createElement("img", { width: 240, src: "images/WeChatPay.png" }),
                                    react_1.default.createElement("p", null,
                                        "\u6211\u4EEC\u4F1A\u5C3D\u5FEB\u53D1\u9001\u6FC0\u6D3B\u7801\uFF0C\u82E5\u672A\u6536\u5230\u53EF\u8054\u7CFB",
                                        " ",
                                        react_1.default.createElement("a", { className: "text-orange-400", href: "mailto:jzlong666@gmail.com?subject=\u8BF7\u53D1\u9001 Scouter \u6FC0\u6D3B\u7801" }, "jzlong666@gmail.com")))))))))));
};
exports["default"] = Pro;


/***/ }),

/***/ "./src/Options/section/Youtube.tsx":
/*!*****************************************!*\
  !*** ./src/Options/section/Youtube.tsx ***!
  \*****************************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const use_debounce_1 = __webpack_require__(/*! use-debounce */ "./node_modules/use-debounce/dist/index.module.js");
const Youtube = ({ settings, saveOptions }) => {
    const [form] = antd_1.Form.useForm();
    (0, react_1.useEffect)(() => {
        console.log(settings);
        if (settings) {
            // 更新 默认值
            form.setFieldsValue({
                showYoutubeButton: settings.showYoutubeButton,
            });
        }
    }, [settings]);
    const handleFormChange = (0, use_debounce_1.useDebouncedCallback)((term) => {
        saveOptions(term);
    }, 300);
    return (react_1.default.createElement(antd_1.Form
    // onFinish={}
    , { 
        // onFinish={}
        onValuesChange: handleFormChange, form: form, labelCol: { span: 4 }, layout: "horizontal" },
        react_1.default.createElement("section", null,
            react_1.default.createElement(antd_1.Form.Item, { name: "showYoutubeButton", valuePropName: "checked", label: "\uD83D\uDCFA YouTube shortcut", extra: react_1.default.createElement("div", null,
                    react_1.default.createElement("img", { className: " w-full py-2 max-w-2xl", src: "images/youtube.png" })) },
                react_1.default.createElement(antd_1.Switch, null)))));
};
exports["default"] = Youtube;


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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"options": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/Options/index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Q7V0FDdEQsc0NBQXNDLGlFQUFpRTtXQUN2RztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBOzs7OztXQ1ZBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1dDaERBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9PcHRpb25zL05hdi50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvT3B0aW9ucy9pbmRleC50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvT3B0aW9ucy9zZWN0aW9uL0FJLnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9PcHRpb25zL3NlY3Rpb24vQW5raS9pbmRleC50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvT3B0aW9ucy9zZWN0aW9uL1Byby50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvT3B0aW9ucy9zZWN0aW9uL1lvdXR1YmUudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NyZWF0ZSBmYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhcm1vbnkgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgTmF2ID0gKCkgPT4ge1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIiwgeyBjbGFzc05hbWU6IFwidy1mdWxsIHAtOCBmbGV4IGl0ZW1zLWNlbnRlclwiIH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGZsZXgtYXV0b1wiIH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2ZsZXggaXRlbXMtY2VudGVyIG1yLTInIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBjbGFzc05hbWU6IFwidy01IGgtNSBtci0yXCIsIHNyYzogXCJpY29uMTI4LnBuZ1wiIH0pLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGV4dC14bCB0ZXh0LWdyYXktODAwXCIgfSwgXCJTY291dGVyXCIpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWdyYXktNTAwIHRleHQtc20gcHQtMVwiLCB0YXJnZXQ6ICdfYmxhbmsnLCBocmVmOiAnaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9WZXJzaW9uLUNoYW5nZS1sb2ctNzlhZTkyNDNiYWZiNDhkYWIzMTYwZjEwZWQ5MGY1ODQ/cHZzPTQnIH0sIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5nZXRNYW5pZmVzdCgpLnZlcnNpb24pKSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdmbGV4IGZsZXgtcm93IGl0ZW1zLWNlbnRlcicgfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWdyYXktODAwICB0ZXh0LXNtIG1yLTQgZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXJcIiwgdGFyZ2V0OiAnX2JsYW5rJywgaHJlZjogJ2h0dHBzOi8vamlhbmd6aWxvbmcubm90aW9uLnNpdGUvM2RjNWI4ZGE4NmI2NDUxMjk2ZmMzMjZjMzQwY2U2YmE/dj1jNDAxMDJiNzFjM2I0ODg4OGNhN2YzNzUyNWY2YTMzMCZwdnM9NCcgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IHdpZHRoOiBcIjE1XCIsIGhlaWdodDogXCIxNVwiLCB2aWV3Qm94OiBcIjAgMCAxNSAxNVwiLCBmaWxsOiBcIm5vbmVcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBkOiBcIk0zIDIuNUMzIDIuMjIzODYgMy4yMjM4NiAyIDMuNSAySDkuMDg1NzlDOS4yMTgzOSAyIDkuMzQ1NTcgMi4wNTI2OCA5LjQzOTM0IDIuMTQ2NDVMMTEuODUzNiA0LjU2MDY2QzExLjk0NzMgNC42NTQ0MyAxMiA0Ljc4MTYxIDEyIDQuOTE0MjFWMTIuNUMxMiAxMi43NzYxIDExLjc3NjEgMTMgMTEuNSAxM0gzLjVDMy4yMjM4NiAxMyAzIDEyLjc3NjEgMyAxMi41VjIuNVpNMy41IDFDMi42NzE1NyAxIDIgMS42NzE1NyAyIDIuNVYxMi41QzIgMTMuMzI4NCAyLjY3MTU3IDE0IDMuNSAxNEgxMS41QzEyLjMyODQgMTQgMTMgMTMuMzI4NCAxMyAxMi41VjQuOTE0MjFDMTMgNC41MTYzOSAxMi44NDIgNC4xMzQ4NiAxMi41NjA3IDMuODUzNTVMMTAuMTQ2NCAxLjQzOTM0QzkuODY1MTQgMS4xNTgwNCA5LjQ4MzYxIDEgOS4wODU3OSAxSDMuNVpNNC41IDRDNC4yMjM4NiA0IDQgNC4yMjM4NiA0IDQuNUM0IDQuNzc2MTQgNC4yMjM4NiA1IDQuNSA1SDcuNUM3Ljc3NjE0IDUgOCA0Ljc3NjE0IDggNC41QzggNC4yMjM4NiA3Ljc3NjE0IDQgNy41IDRINC41Wk00LjUgN0M0LjIyMzg2IDcgNCA3LjIyMzg2IDQgNy41QzQgNy43NzYxNCA0LjIyMzg2IDggNC41IDhIMTAuNUMxMC43NzYxIDggMTEgNy43NzYxNCAxMSA3LjVDMTEgNy4yMjM4NiAxMC43NzYxIDcgMTAuNSA3SDQuNVpNNC41IDEwQzQuMjIzODYgMTAgNCAxMC4yMjM5IDQgMTAuNUM0IDEwLjc3NjEgNC4yMjM4NiAxMSA0LjUgMTFIMTAuNUMxMC43NzYxIDExIDExIDEwLjc3NjEgMTEgMTAuNUMxMSAxMC4yMjM5IDEwLjc3NjEgMTAgMTAuNSAxMEg0LjVaXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICBcIldpa2lcIiksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1ncmF5LTgwMCB0ZXh0LXNtIG1yLTQgZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXJcIiwgdGFyZ2V0OiAnX2JsYW5rJywgaHJlZjogJ2h0dHBzOi8vZGlzY29yZC5nZy93TWFNbUg3TU1LJyB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgd2lkdGg6IFwiMTVcIiwgaGVpZ2h0OiBcIjE1XCIsIHZpZXdCb3g6IFwiMCAwIDE1IDE1XCIsIGZpbGw6IFwibm9uZVwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiLCBkOiBcIk01LjA3NDUxIDEuODI1ODRDNS4wMzI2NyAxLjgxOTI2IDQuOTkwMTQgMS44MTgyNSA0Ljk0ODAzIDEuODIyODRDNC4xMDY4MyAxLjkxNDQ2IDIuODI2NzMgMi4zNjgyOCAyLjA3MTE1IDIuNzc4MDhDMi4wMjEwNiAyLjgwNTI1IDEuOTc2MjEgMi44NDExMiAxLjkzODY5IDIuODg0MDJDMS42MjUwMiAzLjI0MjY2IDEuMzQwNDYgMy44MjgzNiAxLjExNzA2IDQuMzgxODZDMC44ODc0NDcgNC45NTA3NiAwLjY5NzI5MyA1LjU1MDMyIDAuNTg4OTM3IDUuOTgzNTRDMC4yMzYyMzIgNy4zOTM2OSAwLjA0MjUwMiA5LjA4NzI4IDAuMDE3NDk0OCAxMC42OTI1QzAuMDE2MjQyOSAxMC43NzI5IDAuMDM1MTg4MyAxMC44NTIzIDAuMDcyNTkzMSAxMC45MjM0QzAuMzczNjc5IDExLjQ5NiAxLjAyMDE1IDEyLjAyNyAxLjY2ODA5IDEyLjQxNTJDMi4zMjMzMiAxMi44MDc4IDMuMDg3MzIgMTMuMTE4MiAzLjcwMzg1IDEzLjE3NzhDMy44NTMzNSAxMy4xOTIyIDQuMDAwOTggMTMuMTM1OCA0LjEwMjgyIDEzLjAyNTVDNC4yNTcyIDEyLjg1ODEgNC41MTkzIDEyLjQ2NzYgNC43MTc0NSAxMi4xNjQzQzQuODA3MzkgMTIuMDI2NyA0Ljg5MTU3IDExLjg5NTMgNC45NTg0NSAxMS43OTAxQzUuNjIwMjMgMTEuOTEwNiA2LjQ1MDQzIDExLjk4MDEgNy41MDAwMiAxMS45ODAxQzguNTQ4NDQgMTEuOTgwMSA5LjM3Nzk2IDExLjkxMDcgMTAuMDM5NCAxMS43OTA1QzEwLjEwNjIgMTEuODk1NyAxMC4xOTAzIDEyLjAyNjkgMTAuMjgwMSAxMi4xNjQzQzEwLjQ3ODMgMTIuNDY3NiAxMC43NDA0IDEyLjg1ODEgMTAuODk0NyAxMy4wMjU1QzEwLjk5NjYgMTMuMTM1OCAxMS4xNDQyIDEzLjE5MjIgMTEuMjkzNyAxMy4xNzc4QzExLjkxMDIgMTMuMTE4MiAxMi42NzQyIDEyLjgwNzggMTMuMzI5NSAxMi40MTUyQzEzLjk3NzQgMTIuMDI3IDE0LjYyMzkgMTEuNDk2IDE0LjkyNSAxMC45MjM0QzE0Ljk2MjQgMTAuODUyMyAxNC45ODEzIDEwLjc3MjkgMTQuOTgwMSAxMC42OTI1QzE0Ljk1NTEgOS4wODcyOCAxNC43NjEzIDcuMzkzNjkgMTQuNDA4NiA1Ljk4MzU0QzE0LjMwMDMgNS41NTAzMiAxNC4xMTAxIDQuOTUwNzYgMTMuODgwNSA0LjM4MTg2QzEzLjY1NzEgMy44MjgzNiAxMy4zNzI1IDMuMjQyNjYgMTMuMDU4OSAyLjg4NDAyQzEzLjAyMTQgMi44NDExMiAxMi45NzY1IDIuODA1MjUgMTIuOTI2NCAyLjc3ODA4QzEyLjE3MDggMi4zNjgyOCAxMC44OTA3IDEuOTE0NDYgMTAuMDQ5NSAxLjgyMjg0QzEwLjAwNzQgMS44MTgyNSA5Ljk2NDg5IDEuODE5MjYgOS45MjMwNSAxLjgyNTg0QzkuNzE2NzYgMS44NTgyNSA5LjUzOTEgMS45NjQ1OCA5LjQwODA5IDIuMDYzNTVDOS4yNjk3NyAyLjE2ODA0IDkuMTQxMyAyLjI5NjY4IDkuMDMwNCAyLjQyNjgyQzguODY5NjggMi42MTU0NCA4LjcxNDM3IDIuODQ0ODggOC42MTQyOCAzLjA2MjI1QzguMjcyMzcgMy4wMzUwMSA3LjkwMTM4IDMuMDIgNy41IDMuMDJDNy4wOTc3IDMuMDIgNi43MjU5MyAzLjAzNTA4IDYuMzgzMzcgMy4wNjI0NEM2LjI4MzI4IDIuODQ1MDEgNi4xMjc5MiAyLjYxNTQ5IDUuOTY3MTYgMi40MjY4MkM1Ljg1NjI2IDIuMjk2NjggNS43Mjc3OCAyLjE2ODA0IDUuNTg5NDcgMi4wNjM1NUM1LjQ1ODQ2IDEuOTY0NTggNS4yODA4IDEuODU4MjUgNS4wNzQ1MSAxLjgyNTg0Wk0xMS4wMTgxIDExLjUzODJDMTEuMDM5NSAxMS41NzEzIDExLjA2MTUgMTEuNjA1MSAxMS4wODM4IDExLjYzOTJDMTEuMjE2OSAxMS44NDMgMTEuMzQ4NyAxMi4wMzg1IDExLjQ1MDggMTIuMTgwOUMxMS44NDc1IDEyLjA5MTYgMTIuMzUyIDExLjg4MTggMTIuODM2MSAxMS41OTE3QzEzLjM3OTUgMTEuMjY2MSAxMy44MDk4IDEwLjg5MTggMTQuMDE3NyAxMC41NzM5QzEzLjk4NTIgOS4wNjc1OCAxMy43OTkzIDcuNTAzNjkgMTMuNDc3MyA2LjIxNjQ4QzEzLjM4IDUuODI3NTkgMTMuMjAzOCA1LjI3MDIxIDEyLjk5MDMgNC43NDExN0MxMi43ODkzIDQuMjQzMjYgMTIuNTc1MyAzLjgyMTYyIDEyLjM4OCAzLjU3OTJDMTEuNzM3NiAzLjI0MjE5IDEwLjcxMjkgMi44ODU4MiAxMC4wNDU0IDIuNzg5ODdDMTAuMDMwOCAyLjc5ODM5IDEwLjAxMTMgMi44MTEwMiA5Ljk4Njc1IDIuODI5NTVDOS45MTg2MyAyLjg4MSA5Ljg0MDE4IDIuOTU2NjYgOS43NjExMSAzLjA0OTQ1QzkuNzE5NTkgMy4wOTgxNyA5LjY4MTY2IDMuMTQ3MSA5LjY0NzY4IDMuMTk0NDlDOS45NTMgMy4yNTAzMSAxMC4yMjUzIDMuMzE3MSAxMC40NjYyIDMuMzkxMjNDMTEuMTQ5OSAzLjYwMTYgMTEuNjQyOCAzLjg5MDM5IDExLjg4NCA0LjIxMkMxMi4wNDMxIDQuNDI0MDggMTIuMDAwMSA0LjcyNDk0IDExLjc4OCA0Ljg4NEMxMS41NzU5IDUuMDQzMDYgMTEuMjc1MSA1LjAwMDA4IDExLjExNiA0Ljc4OEMxMS4wNTcyIDQuNzA5NjEgMTAuODAwMSA0LjQ5ODQgMTAuMTgzOCA0LjMwODc3QzkuNTg5MzMgNC4xMjU4NSA4LjcxMzU2IDMuOTggNy41IDMuOThDNi4yODY0NCAzLjk4IDUuNDEwNjcgNC4xMjU4NSA0LjgxNjE2IDQuMzA4NzdDNC4xOTk4OCA0LjQ5ODQgMy45NDI3OSA0LjcwOTYxIDMuODg0IDQuNzg4QzMuNzI0OTQgNS4wMDAwOCAzLjQyNDA4IDUuMDQzMDYgMy4yMTIgNC44ODRDMi45OTk5MiA0LjcyNDk0IDIuOTU2OTQgNC40MjQwOCAzLjExNiA0LjIxMkMzLjM1NzIxIDMuODkwMzkgMy44NTAxMSAzLjYwMTYgNC41MzM4MyAzLjM5MTIzQzQuNzc0MTggMy4zMTcyNyA1LjA0NTcxIDMuMjUwNjIgNS4zNTAxNiAzLjE5NDg4QzUuMzE2MTEgMy4xNDczOCA1LjI3ODA4IDMuMDk4MzEgNS4yMzY0NSAzLjA0OTQ1QzUuMTU3MzggMi45NTY2NiA1LjA3ODkzIDIuODgxIDUuMDEwODEgMi44Mjk1NUM0Ljk4NjI4IDIuODExMDIgNC45NjY3NCAyLjc5ODM5IDQuOTUyMTcgMi43ODk4N0M0LjI4NDY0IDIuODg1ODIgMy4yNTk5OSAzLjI0MjE5IDIuNjA5NTQgMy41NzkyQzIuNDIyMjYgMy44MjE2MiAyLjIwODI1IDQuMjQzMjYgMi4wMDcyOSA0Ljc0MTE3QzEuNzkzNzYgNS4yNzAyMSAxLjYxNzUyIDUuODI3NTkgMS41MjAyNSA2LjIxNjQ4QzEuMTk4MjkgNy41MDM2OSAxLjAxMjM2IDkuMDY3NTggMC45Nzk4NiAxMC41NzM5QzEuMTg3NzIgMTAuODkxOCAxLjYxODA3IDExLjI2NjEgMi4xNjE0OCAxMS41OTE3QzIuNjQ1NTcgMTEuODgxOCAzLjE1MDAzIDEyLjA5MTYgMy41NDY4IDEyLjE4MDlDMy42NDg4NSAxMi4wMzg1IDMuNzgwNjUgMTEuODQzIDMuOTEzOCAxMS42MzkyQzMuOTM2MjYgMTEuNjA0OCAzLjk1ODM4IDExLjU3MDggMy45Nzk5NiAxMS41Mzc1QzMuMTk1MjEgMTEuMjU5MSAyLjc3MzYxIDEwLjg3NTggMi41MDA2NCAxMC40NjY0QzIuMzUzNTkgMTAuMjQ1OCAyLjQxMzIgOS45NDc3OCAyLjYzMzc3IDkuODAwNzRDMi44NTQzNSA5LjY1MzY5IDMuMTUyMzYgOS43MTMyOSAzLjI5OTQxIDkuOTMzODdDMy41NjA3NyAxMC4zMjU5IDQuMjQzNTUgMTEuMDIwMSA3LjUwMDAyIDExLjAyMDFDMTAuNzU2NSAxMS4wMjAxIDExLjQzOTIgMTAuMzI2IDExLjcwMDYgOS45MzM4NkMxMS44NDc3IDkuNzEzMjkgMTIuMTQ1NyA5LjY1MzY5IDEyLjM2NjMgOS44MDA3NEMxMi41ODY5IDkuOTQ3NzkgMTIuNjQ2NSAxMC4yNDU4IDEyLjQ5OTQgMTAuNDY2NEMxMi4yMjYyIDEwLjg3NjIgMTEuODA0MSAxMS4yNTk4IDExLjAxODEgMTEuNTM4MlpNNC4wODA0OSA3LjAxMjIxQzQuMzI0MTIgNi43NDk4NCA0LjY1NDc2IDYuNjAxNjIgNS4wMDAwNyA2LjU5OTk4QzUuMzQ1MzggNi42MDE2MiA1LjY3NjAzIDYuNzQ5ODQgNS45MTk2NiA3LjAxMjIxQzYuMTYzMjkgNy4yNzQ1OSA2LjMwMDA3IDcuNjI5NzQgNi4zMDAwNyA3Ljk5OTk4QzYuMzAwMDcgOC4zNzAyMSA2LjE2MzI5IDguNzI1MzYgNS45MTk2NiA4Ljk4Nzc0QzUuNjc2MDMgOS4yNTAxMSA1LjM0NTM4IDkuMzk4MzMgNS4wMDAwNyA5LjM5OTk4QzQuNjU0NzYgOS4zOTgzMyA0LjMyNDEyIDkuMjUwMTEgNC4wODA0OSA4Ljk4Nzc0QzMuODM2ODUgOC43MjUzNiAzLjcwMDA3IDguMzcwMjEgMy43MDAwNyA3Ljk5OTk4QzMuNzAwMDcgNy42Mjk3NCAzLjgzNjg1IDcuMjc0NTkgNC4wODA0OSA3LjAxMjIxWk05Ljk5ODg1IDYuNTk5OThDOS42NTM1NCA2LjYwMTYyIDkuMzIyOSA2Ljc0OTg0IDkuMDc5MjYgNy4wMTIyMUM4LjgzNTYzIDcuMjc0NTkgOC42OTg4NSA3LjYyOTc0IDguNjk4ODUgNy45OTk5OEM4LjY5ODg1IDguMzcwMjEgOC44MzU2MyA4LjcyNTM2IDkuMDc5MjYgOC45ODc3NEM5LjMyMjkgOS4yNTAxMSA5LjY1MzU0IDkuMzk4MzMgOS45OTg4NSA5LjM5OTk4QzEwLjM0NDIgOS4zOTgzMyAxMC42NzQ4IDkuMjUwMTEgMTAuOTE4NCA4Ljk4Nzc0QzExLjE2MjEgOC43MjUzNiAxMS4yOTg5IDguMzcwMjEgMTEuMjk4OSA3Ljk5OTk4QzExLjI5ODkgNy42Mjk3NCAxMS4xNjIxIDcuMjc0NTkgMTAuOTE4NCA3LjAxMjIxQzEwLjY3NDggNi43NDk4NCAxMC4zNDQyIDYuNjAxNjIgOS45OTg4NSA2LjU5OTk4WlwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiIH0pKSxcbiAgICAgICAgICAgICAgICBcIkRpc2NvcmRcIiksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1ncmF5LTgwMCB0ZXh0LXNtIG1yLTQgZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXJcIiwgdGFyZ2V0OiAnX2JsYW5rJywgaHJlZjogJ2h0dHBzOi8vY2hyb21ld2Vic3RvcmUuZ29vZ2xlLmNvbS9kZXRhaWwvc2NvdXRlci9tbmNmY2puYWJwZm9hZ29jYW5mamdsZmNwbW1ua2ljYicgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IHdpZHRoOiBcIjE1XCIsIGhlaWdodDogXCIxNVwiLCB2aWV3Qm94OiBcIjAgMCAxNSAxNVwiLCBmaWxsOiBcIm5vbmVcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBkOiBcIk0xLjM1MjQ4IDQuOTA1MzJDMS4zNTI0OCAyLjk0NDk4IDIuOTM2IDEuMzUyNDggNC44OTM0NiAxLjM1MjQ4QzYuMjU3NjkgMS4zNTI0OCA2Ljg2MDU4IDEuOTIzMzYgNy41MDAwMiAyLjkzNTQ1QzguMTM5NDYgMS45MjMzNiA4Ljc0MjM1IDEuMzUyNDggMTAuMTA2NiAxLjM1MjQ4QzEyLjA2NCAxLjM1MjQ4IDEzLjY0NzYgMi45NDQ5OCAxMy42NDc2IDQuOTA1MzJDMTMuNjQ3NiA2Ljc0MDQxIDEyLjYwMTMgOC41MDUwOCAxMS40MDA4IDkuOTY5MjdDMTAuMjYzNiAxMS4zNTYyIDguOTIxOTQgMTIuNTUwOCA4LjAwNjAxIDEzLjM2NjRDNy45NDY0NSAxMy40MTk0IDcuODg4NjkgMTMuNDcwOSA3LjgzMjkxIDEzLjUyMDZDNy42NDMyNCAxMy42ODk5IDcuMzU2OCAxMy42ODk5IDcuMTY3MTMgMTMuNTIwNkM3LjExMTM1IDEzLjQ3MDkgNy4wNTM1OSAxMy40MTk0IDYuOTk0MDMgMTMuMzY2NEM2LjA3ODEgMTIuNTUwOCA0LjczNjQxIDExLjM1NjIgMy41OTkyNiA5Ljk2OTI3QzIuMzk4NzIgOC41MDUwOCAxLjM1MjQ4IDYuNzQwNDEgMS4zNTI0OCA0LjkwNTMyWlwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCBmaWxsUnVsZTogXCJldmVub2RkXCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSksXG4gICAgICAgICAgICAgICAgXCJFdmFsdWF0aW9uXCIpKSkpO1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IE5hdjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuT3B0aW9ucyA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHJlYWN0X2RvbV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuY29uc3QgYW1wbGl0dWRlID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJAYW1wbGl0dWRlL2FuYWx5dGljcy1icm93c2VyXCIpKTtcbmNvbnN0IE5hdl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL05hdlwiKSk7XG5jb25zdCBHZW5lcmFsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc2VjdGlvbi9HZW5lcmFsXCIpKTtcbmNvbnN0IEFJXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc2VjdGlvbi9BSVwiKSk7XG5jb25zdCBQcm9fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zZWN0aW9uL1Byb1wiKSk7XG5jb25zdCBBbmtpXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc2VjdGlvbi9BbmtpXCIpKTtcbmNvbnN0IFlvdXR1YmVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zZWN0aW9uL1lvdXR1YmVcIikpO1xuY29uc3QgY3NzaW5qc18xID0gcmVxdWlyZShcIkBhbnQtZGVzaWduL2Nzc2luanNcIik7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuY29uc3QgdXRpbF8yID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IHVzZXJJbmZvXzEgPSByZXF1aXJlKFwiLi4vbGliL3VzZXJJbmZvXCIpO1xucmVxdWlyZShcIi4vaW5kZXguY3NzXCIpO1xucmVxdWlyZShcIi4uL2luZGV4LmNzc1wiKTtcbi8vIGNvbnN0IGxhbmd1YWdlRGF0YTogTGFuZ3VhZ2VPYmplY3QgPSBsYW5nO1xuY29uc3QgT3B0aW9ucyA9ICgpID0+IHtcbiAgICAvLyBpbnRlcmZhY2UgVXNlckNvbnRleHRUeXBlIHtcbiAgICAvLyAgIHVzZXJJbmZvOiB1c2VySW5mb1R5cGU7XG4gICAgLy8gICBzZXRVc2VySW5mbzogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248dXNlckluZm9UeXBlPj47XG4gICAgLy8gfVxuICAgIGNvbnN0IGRlZmF1bHRVc2VySW5mbyA9IHsgdXNlcklkOiAnJywgdmVyaWZpZWQ6IGZhbHNlLCBjb250ZXh0TWVudTogZmFsc2UsIHNob3dZb3V0dWJlQnV0dG9uOiB0cnVlLCBjb250ZW50RWRpdGFibGU6IGZhbHNlIH07XG4gICAgLy8gY29uc3QgVXNlckNvbnRleHQgPSBjcmVhdGVDb250ZXh0PFVzZXJDb250ZXh0VHlwZT4oeyB1c2VySW5mbzogZGVmYXVsdFVzZXJJbmZvLCBzZXRVc2VySW5mbzogKCkgPT4geyB9IH0pO1xuICAgIGNvbnN0IFt1c2VySW5mbywgc2V0VXNlckluZm9dID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGRlZmF1bHRVc2VySW5mbyk7XG4gICAgY29uc3QgW3NldHRpbmdzLCBzZXRTZXR0aW5nc10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoKTtcbiAgICBjb25zdCBkaXZFbGVtZW50ID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICBjb25zdCB0YWJJdGVtcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0dlbmVyYWwnLFxuICAgICAgICAgICAgY29udGVudDogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoR2VuZXJhbF8xLmRlZmF1bHQsIHsgc2V0dGluZ3M6IHNldHRpbmdzLCBzYXZlT3B0aW9uczogdGhpc1NhdmVPcHRpb25zIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdBbmtpJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEFua2lfMS5kZWZhdWx0LCB7IHNldHRpbmdzOiBzZXR0aW5ncywgc2F2ZU9wdGlvbnM6IHRoaXNTYXZlT3B0aW9ucyB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQUknLFxuICAgICAgICAgICAgY29udGVudDogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoQUlfMS5kZWZhdWx0LCB7IHNldHRpbmdzOiBzZXR0aW5ncywgc2F2ZU9wdGlvbnM6IHRoaXNTYXZlT3B0aW9ucyB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnWW91VHViZScsXG4gICAgICAgICAgICBjb250ZW50OiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChZb3V0dWJlXzEuZGVmYXVsdCwgeyBzZXR0aW5nczogc2V0dGluZ3MsIHNhdmVPcHRpb25zOiB0aGlzU2F2ZU9wdGlvbnMgfSlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ+KaoVBybycsXG4gICAgICAgICAgICBjb250ZW50OiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChQcm9fMS5kZWZhdWx0LCB7IHNldHRpbmdzOiBzZXR0aW5ncywgc2F2ZU9wdGlvbnM6IHRoaXNTYXZlT3B0aW9ucyB9KVxuICAgICAgICB9XG4gICAgXTtcbiAgICBjb25zdCB0aGlzR2V0VXNlclN0YXR1cyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICgwLCB1dGlsXzEuZ2V0VXNlckluZm8pKCkudGhlbigodXNlckluZm8pID0+IHtcbiAgICAgICAgICAgICAgICAvLyDmm7TmlrAgVUlcbiAgICAgICAgICAgICAgICAvLyBzZXRWZXJpZmllZCh1c2VySW5mby52ZXJpZmllZClcbiAgICAgICAgICAgICAgICByZXNvbHZlKHVzZXJJbmZvKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAoKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAvLyDojrflj5bphY3nva7kv6Hmga9cbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0geWllbGQgKDAsIHV0aWxfMi5nZXRTZXR0aW5ncykoKTtcbiAgICAgICAgICAgIHNldFNldHRpbmdzKGl0ZW1zKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJJbmZvID0geWllbGQgdGhpc0dldFVzZXJTdGF0dXMoKTtcbiAgICAgICAgICAgIHNldFVzZXJJbmZvKHVzZXJJbmZvKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJJZCA9IHVzZXJJbmZvLnVzZXJJZDtcbiAgICAgICAgICAgIC8vIOaVsOaNruWfi+eCuVxuICAgICAgICAgICAgYW1wbGl0dWRlLmluaXQocHJvY2Vzcy5lbnYuQU1QTElUVURFX0tFWSwgdXNlcklkLCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRyYWNraW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VWaWV3czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25zOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhbXBsaXR1ZGUudHJhY2soJ29wZW5PcHRpb25zJyk7XG4gICAgICAgIH0pKSgpO1xuICAgIH0sIFtdKTtcbiAgICBmdW5jdGlvbiB0aGlzU2F2ZU9wdGlvbnModmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAvL+S/neWtmOiuvue9rlxuICAgICAgICAgICAgKDAsIHV0aWxfMi5zYXZlT3B0aW9ucykodmFsdWVzKTtcbiAgICAgICAgICAgIC8vIOiOt+WPlumUruWAvOWvuVxuICAgICAgICAgICAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHZhbHVlcyk7XG4gICAgICAgICAgICAvLyDpgY3ljobplK7lgLzlr7lcbiAgICAgICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGVudHJpZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnbmV3TGljZW5zZUtleScpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5pu05paw6K6i6ZiF54q25oCBXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJJbmZvID0geWllbGQgdGhpc0dldFVzZXJTdGF0dXMoKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VXNlckluZm8odXNlckluZm8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOabtOaWsFxuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSB5aWVsZCAoMCwgdXRpbF8yLmdldFNldHRpbmdzKSgpO1xuICAgICAgICAgICAgc2V0U2V0dGluZ3MoaXRlbXMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudCh1c2VySW5mb18xLlVzZXJJbmZvQ29udGV4dC5Qcm92aWRlciwgeyB2YWx1ZTogeyB1c2VyOiB1c2VySW5mbywgYW5raTogbnVsbCB9IH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgaC1zY3JlZW4nIH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChOYXZfMS5kZWZhdWx0LCBudWxsKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgaWQ6IFwiTXlPcHRpb25zXCIsIHJlZjogZGl2RWxlbWVudCwgY2xhc3NOYW1lOiAnIGZsZXgtMScgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQ29uZmlnUHJvdmlkZXIsIHsgdGhlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsZ29yaXRobTogdGhlbWUuZGVmYXVsdEFsZ29yaXRobSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JQcmltYXJ5OiAnI0YwOEEyNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JMaW5rOiBcIiNGMDhBMjRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvckxpbmtIb3ZlcjogXCIjZmZjNDc4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JMaW5rQWN0aXZlOiBcIiNjOTY5MTRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuVGFicywgeyBjbGFzc05hbWU6ICd3LWZ1bGwgaC1mdWxsIGdyb3cnLCB0YWJQb3NpdGlvbjogJ2xlZnQnLCBpdGVtczogdGFiSXRlbXMubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWQgPSBTdHJpbmcoaSArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBpdGVtLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBpdGVtLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIH0pKSkpKSk7XG59O1xuZXhwb3J0cy5PcHRpb25zID0gT3B0aW9ucztcbnJlYWN0X2RvbV8xLmRlZmF1bHQucmVuZGVyKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5TdHJpY3RNb2RlLCBudWxsLFxuICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGNzc2luanNfMS5TdHlsZVByb3ZpZGVyLCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChleHBvcnRzLk9wdGlvbnMsIG51bGwpKSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCBtb2RlbHNfMSA9IHJlcXVpcmUoXCIuLi9tb2RlbHNcIik7XG5jb25zdCB1c2VfZGVib3VuY2VfMSA9IHJlcXVpcmUoXCJ1c2UtZGVib3VuY2VcIik7XG5jb25zdCBBSSA9ICh7IHNldHRpbmdzLCBzYXZlT3B0aW9ucyB9KSA9PiB7XG4gICAgY29uc3QgW2Zvcm1dID0gYW50ZF8xLkZvcm0udXNlRm9ybSgpO1xuICAgIGNvbnN0IHsgT3B0aW9uIH0gPSBhbnRkXzEuU2VsZWN0O1xuICAgIGNvbnN0IFtyYWRpb1ZhbHVlLCBzZXRSYWRpb1ZhbHVlXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgnbXlPd25PcGVuQWlLZXknKTtcbiAgICBjb25zdCBvblJhZGlvQ2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgc2V0UmFkaW9WYWx1ZShlLnRhcmdldC52YWx1ZSk7XG4gICAgfTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgaWYgKHNldHRpbmdzKSB7XG4gICAgICAgICAgICBzZXRSYWRpb1ZhbHVlKHNldHRpbmdzLmFwaUtleVNlbGVjdGlvbik7XG4gICAgICAgICAgICBmb3JtLnNldEZpZWxkc1ZhbHVlKHtcbiAgICAgICAgICAgICAgICBhcGlLZXlTZWxlY3Rpb246IHNldHRpbmdzLmFwaUtleVNlbGVjdGlvbixcbiAgICAgICAgICAgICAgICBvcGVuQXBpS2V5OiBzZXR0aW5ncy5vcGVuQXBpS2V5LFxuICAgICAgICAgICAgICAgIG9wZW5BcGlFbmRwb2ludDogc2V0dGluZ3Mub3BlbkFwaUVuZHBvaW50LFxuICAgICAgICAgICAgICAgIGxpY2Vuc2VLZXk6IHNldHRpbmdzLmxpY2Vuc2VLZXksXG4gICAgICAgICAgICAgICAgY2hhdEdQVFdlYjogc2V0dGluZ3MuY2hhdEdQVFdlYixcbiAgICAgICAgICAgICAgICBtb2RlbDogc2V0dGluZ3MubW9kZWwsXG4gICAgICAgICAgICAgICAgZnJlZU1vZGVsOiBzZXR0aW5ncy5mcmVlTW9kZWwsXG4gICAgICAgICAgICAgICAgbmV3TGljZW5zZUtleTogc2V0dGluZ3MubmV3TGljZW5zZUtleSxcbiAgICAgICAgICAgICAgICBvbGxhbWFBcGlFbmRwb2ludDogc2V0dGluZ3Mub2xsYW1hQXBpRW5kcG9pbnQsXG4gICAgICAgICAgICAgICAgb2xsYW1hTW9kZWw6IHNldHRpbmdzLm9sbGFtYU1vZGVsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIFtzZXR0aW5nc10pO1xuICAgIGNvbnN0IGhhbmRsZUZvcm1DaGFuZ2UgPSAoMCwgdXNlX2RlYm91bmNlXzEudXNlRGVib3VuY2VkQ2FsbGJhY2spKCh0ZXJtKSA9PiB7XG4gICAgICAgIHNhdmVPcHRpb25zKHRlcm0pO1xuICAgIH0sIDMwMCk7XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybSwgeyBvblZhbHVlc0NoYW5nZTogaGFuZGxlRm9ybUNoYW5nZSwgZm9ybTogZm9ybSwgXG4gICAgICAgIC8vIGxhYmVsQ29sPXt7IHNwYW46IDQgfX1cbiAgICAgICAgbGF5b3V0OiBcImhvcml6b250YWxcIiB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIiwgbnVsbCxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgbmFtZTogXCJhcGlLZXlTZWxlY3Rpb25cIiwgbGFiZWw6IFwiXFx1RDgzRFxcdUREMEJJbiB1c2VcIiB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5SYWRpby5Hcm91cCwgeyBvbkNoYW5nZTogb25SYWRpb0NoYW5nZSwgdmFsdWU6IHJhZGlvVmFsdWUsIHNpemU6IFwic21hbGxcIiwgc3R5bGU6IHsgbWFyZ2luQm90dG9tOiAwLCBkaXNwbGF5OiAnZmxleCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuUmFkaW8uQnV0dG9uLCB7IHZhbHVlOiBcInNjb3V0ZXJGcmVlQUlcIiwgc3R5bGU6IHsgZmxleDogJzEnLCB0ZXh0QWxpZ246ICdjZW50ZXInIH0gfSwgXCJTY291dGVyXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuUmFkaW8uQnV0dG9uLCB7IHZhbHVlOiBcIm15T3duT3BlbkFpS2V5XCIsIHN0eWxlOiB7IGZsZXg6ICcxJywgdGV4dEFsaWduOiAnY2VudGVyJyB9IH0sIFwiT3BlbkFJXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuUmFkaW8uQnV0dG9uLCB7IHZhbHVlOiBcIm9sbGFtYVwiLCBzdHlsZTogeyBmbGV4OiAnMScsIHRleHRBbGlnbjogJ2NlbnRlcicgfSB9LCBcIk9sbGFtYVwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlJhZGlvLkJ1dHRvbiwgeyB2YWx1ZTogXCJsaWNlbnNlS2V5XCIsIHN0eWxlOiB7IGZsZXg6ICcxJywgdGV4dEFsaWduOiAnY2VudGVyJyB9IH0sIFwiT3BlblJvdXRlclwiKSkpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBcbiAgICAgICAgICAgICAgICAvLyBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogcmFkaW9WYWx1ZSA9PT0gJ3Njb3V0ZXJGcmVlQUknID8gJ2Jsb2NrJyA6ICdub25lJ1xuICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwiZnJlZU1vZGVsXCIsIGxhYmVsOiBcIlxcdUQ4M0VcXHVERDE2TW9kZWxcIiwgaW5pdGlhbFZhbHVlOiBtb2RlbHNfMS5mcmVlTW9kZWxzWzBdWyduYW1lJ10gfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlNlbGVjdCwgeyBwbGFjZWhvbGRlcjogXCJcIiB9LCBtb2RlbHNfMS5mcmVlTW9kZWxzLm1hcCgoaXRlbSkgPT4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoT3B0aW9uLCB7IGtleTogaXRlbS5pZCwgdmFsdWU6IGl0ZW0uaWQgfSwgaXRlbS5uYW1lKSkpKSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHJhZGlvVmFsdWUgPT09ICdteU93bk9wZW5BaUtleScgPyAnYmxvY2snIDogJ25vbmUnXG4gICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgbmFtZTogXCJvcGVuQXBpRW5kcG9pbnRcIiwgbGFiZWw6IFwiXFx1RDgzRFxcdUREMTdBUEkgRW5kcG9pbnRcIiwgZXh0cmE6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicFwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNjY2J1xuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJJZiB5b3UgYXJlIHVzaW5nIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdHJvbmdcIiwgbnVsbCwgXCJBenVyZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIG9yIGEgdGhpcmQtcGFydHkgZW5kcG9pbnQsIHBsZWFzZSBmaWxsIGluIHRoZSBlbmRwb2ludCBhZGRyZXNzLiBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IHRhcmdldDogJ19fYmxhbmsnLCBocmVmOiAnaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9TZXQtdXAteW91ci1BUEktS2V5LTk2MjY2ZDUyMzZmYTQ2MmNhNzA3NjgzZDliYjI3NWM2P3B2cz00JyB9LCBcIkxlYXJuIE1vcmVcXHUyMTk3XFx1RkUwRlwiKSkgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLklucHV0LCB7IHBsYWNlaG9sZGVyOiBcImh0dHBzOi8vYXBpLm9wZW5haS5jb21cIiwgdHlwZTogXCJ1cmxcIiB9KSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBuYW1lOiBcIm9wZW5BcGlLZXlcIiwgbGFiZWw6IFwiXFx1RDgzRFxcdUREMTFZb3VyIE9wZW4gQVBJIEtleVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbnB1dCwgeyBwbGFjZWhvbGRlcjogXCJXZSB3aWxsIG5vdCB1c2UgeW91ciBLZXkgZm9yIGFueSBvdGhlciBwdXJwb3Nlcy5cIiwgdHlwZTogXCJwYXNzd29yZFwiIH0pKSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHJhZGlvVmFsdWUgPT09ICdvbGxhbWEnID8gJ2Jsb2NrJyA6ICdub25lJ1xuICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwib2xsYW1hQXBpRW5kcG9pbnRcIiwgbGFiZWw6IFwiXFx1RDgzRFxcdUREMTdBUEkgRW5kcG9pbnRcIiB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuSW5wdXQsIHsgcGxhY2Vob2xkZXI6IFwiaHR0cDovL2xvY2FsaG9zdDoxMTQzNFwiLCB0eXBlOiBcInVybFwiIH0pKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwib2xsYW1hTW9kZWxcIiwgbGFiZWw6IFwiXFx1RDgzRVxcdUREMTZNb2RlbFwiLCBleHRyYTogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM2NjYnXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IHRhcmdldDogJ19fYmxhbmsnLCBocmVmOiAnaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9Ib3ctdG8tdXNlLU9sbGFtYS1mOGZmMGQ3MTE5ODk0NWI4ODNlNzFlMDhmMDljYzlmNT9wdnM9NCcgfSwgXCJMZWFybiBNb3JlXFx1MjE5N1xcdUZFMEZcIikpIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbnB1dCwgeyBwbGFjZWhvbGRlcjogXCJsbGFtYTJcIiwgdHlwZTogXCJ0ZXh0XCIgfSkpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogcmFkaW9WYWx1ZSA9PT0gJ2xpY2Vuc2VLZXknID8gJ2Jsb2NrJyA6ICdub25lJ1xuICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwibGljZW5zZUtleVwiLCBsYWJlbDogXCJcXHVEODNEXFx1REQxMUtleVwiLCBzdHlsZTogeyBtYXJnaW5Cb3R0b206ICcxNnB4JyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbnB1dCwgeyBwbGFjZWhvbGRlcjogXCJXZSB3aWxsIG5vdCB1c2UgeW91ciBLZXkgZm9yIGFueSBvdGhlciBwdXJwb3Nlcy5cIiwgdHlwZTogXCJwYXNzd29yZFwiIH0pKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwibW9kZWxcIiwgbGFiZWw6IFwiXFx1RDgzRVxcdUREMTZNb2RlbFwiLCBpbml0aWFsVmFsdWU6IG1vZGVsc18xLm1vZGVsc1swXVsnbmFtZSddIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5TZWxlY3QsIHsgcGxhY2Vob2xkZXI6IFwiXCIgfSwgbW9kZWxzXzEubW9kZWxzLm1hcCgoaXRlbSkgPT4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoT3B0aW9uLCB7IGtleTogaXRlbS5pZCwgdmFsdWU6IGl0ZW0uaWQgfSwgaXRlbS5uYW1lKSkpKSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCIgdGV4dC1jZW50ZXJcIiwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogcmFkaW9WYWx1ZSA9PT0gJ2NoYXRHUFRXZWInID8gJ2Jsb2NrJyA6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjRjA4QTI0J1xuICAgICAgICAgICAgICAgIH0gfSwgXCJcXHUyNkEwXFx1RkUwRlNvcnJ5LCB0aGlzIGZlYXR1cmUgaXMgdGVtcG9yYXJpbHkgdW5hdmFpbGFibGUuXCIpKSkpO1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IEFJO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXRpbFwiKTtcbmNvbnN0IHVzZV9kZWJvdW5jZV8xID0gcmVxdWlyZShcInVzZS1kZWJvdW5jZVwiKTtcbmNvbnN0IGljb25zXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7XG5jb25zdCB7IFRleHRBcmVhIH0gPSBhbnRkXzEuSW5wdXQ7XG5jb25zdCBBbmtpID0gKHsgc2V0dGluZ3MsIHNhdmVPcHRpb25zIH0pID0+IHtcbiAgICBjb25zdCBbYW5raUNsaWVudElzb3Blbiwgc2V0QW5raUNsaWVudElzb3Blbl0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkodHJ1ZSk7XG4gICAgY29uc3QgW2Fua2lEZWNrTmFtZXMsIHNldEFua2lEZWNrTmFtZXNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKFwibG9hZGluZ1wiKTtcbiAgICBjb25zdCBbYW5raU1vZGVsTmFtZXMsIHNldEFua2lNb2RlbE5hbWVzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShcImxvYWRpbmdcIik7XG4gICAgY29uc3QgW2Fua2lNb2RlbEZpZWxkTmFtZXMsIHNldEFua2lNb2RlbEZpZWxkTmFtZXNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKFtdKTtcbiAgICBjb25zdCBbZmllbGRzU3RhdHVzLCBzZXRGaWVsZHNTdGF0dXNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHVuZGVmaW5lZCk7XG4gICAgY29uc3QgW2lzU2NvdXRlck5vdGUsIHNldElzU2NvdXRlck5vdGVdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHt9KTtcbiAgICBjb25zdCBbZm9ybV0gPSBhbnRkXzEuRm9ybS51c2VGb3JtKCk7XG4gICAgLy8gY29uc3QgW2Zvcm1Gb3JGaWVsZF0gPSBGb3JtLnVzZUZvcm0oKTtcbiAgICBjb25zdCB7IE9wdGlvbiB9ID0gYW50ZF8xLlNlbGVjdDtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgKCgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgLy8g5pu05pawIOm7mOiupOWAvFxuICAgICAgICAgICAgICAgIC8vIGZvcm0uc2V0RmllbGRzVmFsdWUoe1xuICAgICAgICAgICAgICAgIC8vICAgYW5raURlY2tOYW1lOiBzZXR0aW5ncy5hbmtpRGVja05hbWUsXG4gICAgICAgICAgICAgICAgLy8gICBhbmtpTm90ZU5hbWU6IHNldHRpbmdzLmFua2lOb3RlTmFtZSxcbiAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICAvLyDorr7nva7pu5jorqTlgLxcbiAgICAgICAgICAgICAgICBmb3JtLnNldEZpZWxkc1ZhbHVlKHtcbiAgICAgICAgICAgICAgICAgICAgYW5raVNldHRpbmdzOiBzZXR0aW5ncy5hbmtpU2V0dGluZ3MsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gZm9ybUZvckZpZWxkLnNldEZpZWxkc1ZhbHVlKHtcbiAgICAgICAgICAgICAgICAvLyAgICAgYW5raU5vdGVOYW1lOiBzZXR0aW5ncy5hbmtpTm90ZU5hbWVcbiAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICBjaGVja1Njb3V0ZXJOb3RlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKSgpO1xuICAgICAgICAvLyBzZXRJc1Njb3V0ZXJOb3RlKHNldHRpbmdzPy5hbmtpTm90ZU5hbWUuaW5kZXhPZihcIlNjb3V0ZXJcIikgPiAtMSk7XG4gICAgfSwgW3NldHRpbmdzXSk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgICgoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8g6I635Y+WIE5vdGUg5a+55bqU55qEIGZpZWxkc1xuICAgICAgICAgICAgICAgIGhhbmRsZU1vZGVsRmllbGROYW1lcyhzZXR0aW5ncyA9PT0gbnVsbCB8fCBzZXR0aW5ncyA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2V0dGluZ3MuYW5raU5vdGVOYW1lKTtcbiAgICAgICAgICAgICAgICBjb25zdCBbZGVja05hbWVzUmVzdWx0LCBtb2RlbE5hbWVzUmVzdWx0XSA9IHlpZWxkIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICAgICAgKDAsIHV0aWxfMS5hbmtpQWN0aW9uKShcImRlY2tOYW1lc1wiLCA2KSxcbiAgICAgICAgICAgICAgICAgICAgKDAsIHV0aWxfMS5hbmtpQWN0aW9uKShcIm1vZGVsTmFtZXNcIiwgNiksXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgLy8g5aSE55CGIGRlY2tOYW1lcyDnu5PmnpxcbiAgICAgICAgICAgICAgICBpZiAoZGVja05hbWVzUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlY2tOYW1lcyA9IGRlY2tOYW1lc1Jlc3VsdC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHNldEFua2lEZWNrTmFtZXMoZGVja05hbWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g5aSE55CGIG1vZGVsTmFtZXMg57uT5p6cXG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsTmFtZXNSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZWxOYW1lcyA9IG1vZGVsTmFtZXNSZXN1bHQucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBzZXRBbmtpTW9kZWxOYW1lcyhtb2RlbE5hbWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBzZXRBbmtpQ2xpZW50SXNvcGVuKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpKCk7XG4gICAgfSwgW2Fua2lDbGllbnRJc29wZW5dKTtcbiAgICAvLyBOb3RlLCBGaWVsZHMg6KGo5Y2V5L+u5pS55pe2XG4gICAgY29uc3QgaGFuZGxlRmllbGRzRm9ybUNoYW5nZSA9ICgwLCB1c2VfZGVib3VuY2VfMS51c2VEZWJvdW5jZWRDYWxsYmFjaykoKGNoYW5nZWRGaWVsZHMsIGFsbEZpZWxkcykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25GaWVsZHNDaGFuZ2U9PT1cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGNoYW5nZWRGaWVsZHMpO1xuICAgICAgICAvLyDlpoLmnpzmm7TmlLnnmoTmmK8gYW5raU5vdGVOYW1l77yM5YiZ6ZyA6KaB5pu05pawIEZpbGVkcyDooajljZVcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hhbmdlZEZpZWxkc1swXS5uYW1lKSAmJlxuICAgICAgICAgICAgY2hhbmdlZEZpZWxkc1swXS5uYW1lLmluY2x1ZGVzKFwiYW5raU5vdGVOYW1lXCIpKSB7XG4gICAgICAgICAgICAvLyDorr7nva7liqDovb3nirbmgIFcbiAgICAgICAgICAgIHNldEZpZWxkc1N0YXR1cyh7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBcImxvYWRpbmdcIixcbiAgICAgICAgICAgICAgICBtc2c6IFwiXCIsXG4gICAgICAgICAgICAgICAgaW5kZXg6IGNoYW5nZWRGaWVsZHNbMF1bXCJuYW1lXCJdWzFdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyDojrflj5Ygbm90ZSDlr7nlupTnmoQgZmlsZWRzIOS/oeaBr1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geWllbGQgaGFuZGxlTW9kZWxGaWVsZE5hbWVzKGNoYW5nZWRGaWVsZHNbMF0udmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RlbEZpZWxkTmFtZXMgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICBsZXQgZmlsZWRzTmFtZVBhdGggPSBjaGFuZ2VkRmllbGRzWzBdLm5hbWU7XG4gICAgICAgICAgICAgICAgZmlsZWRzTmFtZVBhdGhbZmlsZWRzTmFtZVBhdGgubGVuZ3RoIC0gMV0gPSBcImFua2lGaWVsZHNcIjtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlZHNWYWx1ZSA9IG1vZGVsRmllbGROYW1lcy5tYXAoKG5hbWUpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIFtuYW1lXTogXCJcIixcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobW9kZWxGaWVsZE5hbWVzKTtcbiAgICAgICAgICAgICAgICBmb3JtLnNldEZpZWxkVmFsdWUoZmlsZWRzTmFtZVBhdGgsIGZpbGVkc1ZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZXRGaWVsZHNTdGF0dXMoe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwicmVhZHlcIixcbiAgICAgICAgICAgICAgICAgICAgbXNnOiBcIlwiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSksIDMwMCk7XG4gICAgLy8g6KGo5Y2V5L+u5pS55pe2XG4gICAgY29uc3QgaGFuZGxlRm9ybUNoYW5nZSA9ICgwLCB1c2VfZGVib3VuY2VfMS51c2VEZWJvdW5jZWRDYWxsYmFjaykoKHRlcm0pID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJoYW5kbGVGb3JtQ2hhbmdlPT09PT09PT06XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhmb3JtLmdldEZpZWxkc1ZhbHVlKCkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhzZXR0aW5ncyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRlcm0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZXJtW1wiYW5raVNldHRpbmdzXCJdWzBdKTtcbiAgICAgICAgbGV0IHZhbHVlcyA9IGZvcm0uZ2V0RmllbGRzVmFsdWUoKTtcbiAgICAgICAgLy8gdmFsdWVzID0gdmFsdWVzLmFua2lTZXR0aW5ncy5maWx0ZXIoKGl0ZW06IEFua2lTZXR0aW5nVHlwZSkgPT4ge1xuICAgICAgICAvLyAgIHJldHVybiBpdGVtICYmIGl0ZW0uYW5raU5vdGVOYW1lO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJ2YWx1ZXM6XCIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZXMpO1xuICAgICAgICBzYXZlT3B0aW9ucyh2YWx1ZXMpO1xuICAgICAgICBjaGVja1Njb3V0ZXJOb3RlKCk7XG4gICAgfSwgMzAwKTtcbiAgICAvLyBTY291dGVyIOm7mOiupCBub3RlIOS4jeaUr+aMgee8lui+kVxuICAgIGNvbnN0IGNoZWNrU2NvdXRlck5vdGUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZXMgPSBmb3JtLmdldEZpZWxkc1ZhbHVlKCkuYW5raVNldHRpbmdzO1xuICAgICAgICBjb25zdCBuZXdJc1Njb3V0ZXJOb3RlID0ge307XG4gICAgICAgIGZvcm1WYWx1ZXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0pO1xuICAgICAgICAgICAgaWYgKGl0ZW0uYW5raU5vdGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uYW5raU5vdGVOYW1lLmluZGV4T2YoXCJTY291dGVyXCIpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6c5piv6buY6K6k55qEIE5vdGUg5YiZ5LiN5pSv5oyB5L+u5pS5IGZpbGVkc1xuICAgICAgICAgICAgICAgICAgICBuZXdJc1Njb3V0ZXJOb3RlW2luZGV4XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgKGl0ZW0gJiYgaXRlbS5pbnB1dDEgPT09IFwic3BlY2lhbFwiKSB7XG4gICAgICAgICAgICAvLyAgIG5ld0lzU2NvdXRlck5vdGVbaW5kZXhdID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgIG5ld0lzU2NvdXRlck5vdGVbaW5kZXhdID0gZmFsc2U7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRJc1Njb3V0ZXJOb3RlKG5ld0lzU2NvdXRlck5vdGUpO1xuICAgIH07XG4gICAgLy8g6I635Y+WIE5vdGUg5a+55bqU55qEIGZpZWxkc1xuICAgIGNvbnN0IGhhbmRsZU1vZGVsRmllbGROYW1lcyA9IChub3RlTmFtZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGFuZGxlTW9kZWxGaWVsZE5hbWVzXCIpO1xuICAgICAgICBpZiAobm90ZU5hbWUpIHtcbiAgICAgICAgICAgIC8vIOmAmui/hyBub3RlTmFtZSDojrflj5blr7nlupTnmoQgZmlsZWRzIOS/oeaBr1xuICAgICAgICAgICAgY29uc3QgbW9kZWxGaWVsZE5hbWVzUmVzdWx0ID0geWllbGQgKDAsIHV0aWxfMS5hbmtpQWN0aW9uKShcIm1vZGVsRmllbGROYW1lc1wiLCA2LCB7XG4gICAgICAgICAgICAgICAgbW9kZWxOYW1lOiBub3RlTmFtZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG1vZGVsRmllbGROYW1lc1Jlc3VsdC5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RlbEZpZWxkTmFtZXMgPSBtb2RlbEZpZWxkTmFtZXNSZXN1bHQucmVzdWx0O1xuICAgICAgICAgICAgICAgIHNldEFua2lNb2RlbEZpZWxkTmFtZXMobW9kZWxGaWVsZE5hbWVzKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1vZGVsRmllbGROYW1lc1Jlc3VsdDpcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobW9kZWxGaWVsZE5hbWVzUmVzdWx0KTtcbiAgICAgICAgICAgICAgICBoYW5kbGVGb3JtQ2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IGZhbHNlLCBkYXRhOiBtb2RlbEZpZWxkTmFtZXNSZXN1bHQucmVzdWx0IH07XG4gICAgICAgICAgICAgICAgLy8g5riy5p+TIGZpZWxkcyDooajljZXnmoTpu5jorqTlgLxcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBmaWVsZHNSZWNvcmQgPSBzZXR0aW5ncz8uYW5raUZpZWxkcztcbiAgICAgICAgICAgICAgICAvLyBpZiAoZmllbGRzUmVjb3JkKSB7XG4gICAgICAgICAgICAgICAgLy8gICAvLyDmib7liLAgYW5raU5vdGVOYW1lIOWvueW6lOeahCBmaWVsZHNcbiAgICAgICAgICAgICAgICAvLyAgIGNvbnN0IHRhcmdldFJlY29yZCA9IGZpZWxkc1JlY29yZC5maW5kKFxuICAgICAgICAgICAgICAgIC8vICAgICAoaXRlbTogYW55KSA9PiBpdGVtLm5vdGUgPT09IG5vdGVOYW1lXG4gICAgICAgICAgICAgICAgLy8gICApO1xuICAgICAgICAgICAgICAgIC8vICAgY29uc3QgdGYgPSBPYmplY3Qua2V5cyh0YXJnZXRSZWNvcmQuZmllbGRzKS5yZWR1Y2U8e1xuICAgICAgICAgICAgICAgIC8vICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG4gICAgICAgICAgICAgICAgLy8gICB9Pigob2JqLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbnN0IHYgPSB0YXJnZXRSZWNvcmQuZmllbGRzW2l0ZW1dO1xuICAgICAgICAgICAgICAgIC8vICAgICBvYmpbaXRlbV0gPSB2ID8gdi5yZXBsYWNlKC88YnI+L2csIFwiXFxuXCIpIDogdjtcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICAvLyAgIH0sIHt9KTtcbiAgICAgICAgICAgICAgICAvLyAgIGlmICh0Zikge1xuICAgICAgICAgICAgICAgIC8vICAgICBmb3JtLnNldEZpZWxkc1ZhbHVlKHRmKTtcbiAgICAgICAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydChtb2RlbEZpZWxkTmFtZXNSZXN1bHQuZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiB0cnVlLCBtc2c6IG1vZGVsRmllbGROYW1lc1Jlc3VsdC5lcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGVycm9yOiBmYWxzZSwgZGF0YTogW10gfTtcbiAgICB9KTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgIWFua2lDbGllbnRJc29wZW4gJiYgKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjZjUwXCIsXG4gICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjZjUwXCIsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCIsXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICBcIkFua2kgY2xpZW50IGFuZCByZWxhdGVkIHNldHRpbmdzIG5vdCBmb3VuZC4gUGxlYXNlXCIsXG4gICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IHN0eWxlOiB7IHRleHREZWNvcmF0aW9uTGluZTogXCJ1bmRlcmxpbmVcIiB9LCB0YXJnZXQ6IFwiX19ibGFua1wiLCBocmVmOiBcImh0dHBzOi8vamlhbmd6aWxvbmcubm90aW9uLnNpdGUvVXNlLXRoZS1BZGQtdG8tQW5raS1mZWF0dXJlLTdhYjk1ZmY4YWE1ZTQxOWM5NzhlOGEyYTBhNDUxMzI0XCIgfSwgXCJjb25maWd1cmVcXHUyMTk3XFx1RkUwRlwiKSxcbiAgICAgICAgICAgIFwiIFwiLFxuICAgICAgICAgICAgXCJhbmQgdHJ5IGFnYWluXCIpKSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm1cbiAgICAgICAgLy8gb25GaW5pc2g9e31cbiAgICAgICAgLCB7IFxuICAgICAgICAgICAgLy8gb25GaW5pc2g9e31cbiAgICAgICAgICAgIG9uVmFsdWVzQ2hhbmdlOiBoYW5kbGVGb3JtQ2hhbmdlLCBvbkZpZWxkc0NoYW5nZTogaGFuZGxlRmllbGRzRm9ybUNoYW5nZSwgZm9ybTogZm9ybSwgbGFiZWxDb2w6IHsgc3BhbjogNCB9LCBsYXlvdXQ6IFwiaG9yaXpvbnRhbFwiLCBpbml0aWFsVmFsdWVzOiB7IGl0ZW1zOiBbe31dIH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkxpc3QsIHsgbmFtZTogXCJhbmtpU2V0dGluZ3NcIiB9LCAoZmllbGRzLCB7IGFkZCwgcmVtb3ZlLCBtb3ZlIH0pID0+IChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtY29sIGdhcC00XCIgfSxcbiAgICAgICAgICAgICAgICBmaWVsZHMubWFwKChfYSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHsga2V5LCBuYW1lIH0gPSBfYSwgcmVzdEZpZWxkID0gX19yZXN0KF9hLCBbXCJrZXlcIiwgXCJuYW1lXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQ2FyZCwgeyBrZXk6IGtleSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPT0gMCAmJiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlRhZywgeyBjbGFzc05hbWU6IFwiIG1iLTZcIiwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5TdGFyT3V0bGluZWQsIG51bGwpLCBjb2xvcjogXCJvcmFuZ2VcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIFwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCBPYmplY3QuYXNzaWduKHt9LCByZXN0RmllbGQsIHsgbmFtZTogW25hbWUsIFwiYW5raURlY2tOYW1lXCJdLCBsYWJlbDogXCJEZWNrIE5hbWVcIiwgaW5pdGlhbFZhbHVlOiB1bmRlZmluZWQgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlNlbGVjdCwgeyBwbGFjZWhvbGRlcjogXCJBbmtpIERlY2sgTmFtZVwiLCBkaXNhYmxlZDogIWFua2lDbGllbnRJc29wZW4sIGxvYWRpbmc6IGFua2lEZWNrTmFtZXMgPT09IFwibG9hZGluZ1wiIH0sIGFua2lEZWNrTmFtZXMgIT09IFwibG9hZGluZ1wiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFua2lEZWNrTmFtZXMubWFwKChpdGVtKSA9PiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoT3B0aW9uLCB7IGtleTogaXRlbSwgdmFsdWU6IGl0ZW0gfSwgaXRlbSkpKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgT2JqZWN0LmFzc2lnbih7fSwgcmVzdEZpZWxkLCB7IG5hbWU6IFtuYW1lLCBcImFua2lOb3RlTmFtZVwiXSwgbGFiZWw6IFwiTm90ZSBOYW1lXCIsIGluaXRpYWxWYWx1ZTogdW5kZWZpbmVkIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5TZWxlY3QsIHsgcGxhY2Vob2xkZXI6IFwiQW5raSBOb3RlIE5hbWVcIiwgZGlzYWJsZWQ6ICFhbmtpQ2xpZW50SXNvcGVuLCBsb2FkaW5nOiBhbmtpTW9kZWxOYW1lcyA9PT0gXCJsb2FkaW5nXCIgfSwgYW5raU1vZGVsTmFtZXMgIT09IFwibG9hZGluZ1wiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFua2lNb2RlbE5hbWVzLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChPcHRpb24sIHsga2V5OiBpdGVtLCB2YWx1ZTogaXRlbSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIChmaWVsZHNTdGF0dXMgPT09IG51bGwgfHwgZmllbGRzU3RhdHVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmaWVsZHNTdGF0dXMuc3RhdHVzKSA9PT0gXCJsb2FkaW5nXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZmllbGRzU3RhdHVzID09PSBudWxsIHx8IGZpZWxkc1N0YXR1cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZmllbGRzU3RhdHVzLmluZGV4KSA9PT0gaW5kZXggPyAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlNrZWxldG9uLCB7IGFjdGl2ZTogdHJ1ZSB9KSkgOiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uTGlzdCwgeyBuYW1lOiBbbmFtZSwgXCJhbmtpRmllbGRzXCJdIH0sIChzdWJGaWVsZHMsIHN1Yk9wdCkgPT4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCwgc3ViRmllbGRzLm1hcCgoc3ViRmllbGQsIHN1YkluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmllbGROYW1lID0gT2JqZWN0LmtleXMoZm9ybS5nZXRGaWVsZFZhbHVlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbmtpU2V0dGluZ3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbmtpRmllbGRzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pIHx8IHt9KVswXSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBrZXk6IHN1YkZpZWxkLmtleSwgbmFtZTogW3N1YkZpZWxkLm5hbWUsIGZpZWxkTmFtZV0sIGxhYmVsOiBmaWVsZE5hbWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHsgZGlzYWJsZWQ6IGlzU2NvdXRlck5vdGVbaW5kZXhdLCBhdXRvU2l6ZTogeyBtaW5Sb3dzOiAyLCBtYXhSb3dzOiA0IH0sIHBsYWNlaG9sZGVyOiBpc1Njb3V0ZXJOb3RlW2luZGV4XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJUaGUgZGVmYXVsdCBub3RlIGlzIG5vdCBlZGl0YWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcInt7U2VsZWN0aW9ufX0sIHt7SW1hZ2V9fS4uLlwiIH0pKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSkpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCIgZmxleCBmbGV4LXJvdyBnYXAtMyBqdXN0aWZ5LWVuZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzLmxlbmd0aCA+IDEgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDxGb3JtLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlRvb2x0aXAsIHsgdGl0bGU6IFwiRGVsZXRlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIiwgb25DbGljazogKCkgPT4gcmVtb3ZlKG5hbWUpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkRlbGV0ZU91dGxpbmVkLCBudWxsKSB9KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8L0Zvcm0uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ICE9PSAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8Rm9ybS5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Ub29sdGlwLCB7IHRpdGxlOiBcIlNldCBhcyBEZWZhdWx0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIiwgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmUoaW5kZXgsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5TdGFyT3V0bGluZWQsIG51bGwpIH0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwvRm9ybS5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpKSk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIiwgdHlwZTogXCJkYXNoZWRcIiwgb25DbGljazogKCkgPT4gYWRkKCksIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuUGx1c091dGxpbmVkLCBudWxsKSwgYmxvY2s6IHRydWUgfSwgXCJBZGRcIikpKSkpKSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiIGZsZXhcIiB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBjbGFzc05hbWU6IFwidy1hdXRvIGgtYXV0byBtYXgtdy14bCBwLTQgb2JqZWN0LWNvbnRhaW5cIiwgc3JjOiBcImltYWdlcy9kaWFncmFtLnBuZ1wiIH0pLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiIG10LTExXCIgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBcIiwgeyBjbGFzc05hbWU6IFwiIG1iLTNcIiB9LCBcIllvdSBjYW4gY3VzdG9taXplIHRoZSBjb250ZW50IG9mIGVhY2ggZmllbGQgd2hlbiBhZGRpbmcgdG8gQW5raS4gWW91IGNhbiBpbnB1dCBhbnkgc3RyaW5nLCBpbmNsdWRpbmcgdGhlIGZvbGxvd2luZyBkeW5hbWljIHZhcmlhYmxlczpcIiksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiIGxpc3QtZGlzYyBmbGV4IGZsZXgtY29sIGdhcC0xXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCB7IGNsYXNzTmFtZTogXCIgZm9udC1zZW1pYm9sZFwiIH0sIFwie3tTZWxlY3Rpb259fVwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIFwiU2VsZWN0ZWQgdGV4dFwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCB7IGNsYXNzTmFtZTogXCIgZm9udC1zZW1pYm9sZFwiIH0sIFwie3tTZW50ZW5jZX19XCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCwgXCJTZW50ZW5jZSBjb250YWluaW5nIHRoZSBzZWxlY3RlZCB0ZXh0XCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImgzXCIsIHsgY2xhc3NOYW1lOiBcIiBmb250LXNlbWlib2xkXCIgfSwgXCJ7e0F1ZGlvfX1cIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCBcIlByb251bmNpYXRpb24gb2YgdGhlIHNlbGVjdGVkIGNvbnRlbnRcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwiIGZvbnQtc2VtaWJvbGRcIiB9LCBcInt7SW1hZ2V9fVwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIFwiUGljdHVyZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCB7IGNsYXNzTmFtZTogXCIgZm9udC1zZW1pYm9sZFwiIH0sIFwie3tEZWZpbml0aW9ufX1cIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCBcIkRlZmluaXRpb24gb2YgdGhlIGNvbnRlbnRcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwiIGZvbnQtc2VtaWJvbGRcIiB9LCBcInt7U291cmNlfX1cIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCBcIkxpbmsgdG8gdGhlIGN1cnJlbnQgd2Vic2l0ZVwiKSkpKSkpO1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IEFua2k7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCBpY29uc18xID0gcmVxdWlyZShcIkBhbnQtZGVzaWduL2ljb25zXCIpO1xuY29uc3QgUHJvVGFnXzEgPSByZXF1aXJlKFwiLi4vLi4vQ29tcG9uZW50cy9Qcm9UYWdcIik7XG5jb25zdCB1c2VySW5mb18xID0gcmVxdWlyZShcIi4uLy4uL2xpYi91c2VySW5mb1wiKTtcbmNvbnN0IHVzZV9kZWJvdW5jZV8xID0gcmVxdWlyZShcInVzZS1kZWJvdW5jZVwiKTtcbmNvbnN0IGNhbnZhc19jb25mZXR0aV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJjYW52YXMtY29uZmV0dGlcIikpO1xuY29uc3QgUHJvID0gKHsgc2V0dGluZ3MsIHNhdmVPcHRpb25zIH0pID0+IHtcbiAgICAvLyBjb25zdCBbdmVyaWZpZWQsIHNldFZlcmlmaWVkXSA9IHVzZVN0YXRlPGJvb2xlYW4gfCBudWxsPihmYWxzZSk7XG4gICAgY29uc3QgW2Zvcm1dID0gYW50ZF8xLkZvcm0udXNlRm9ybSgpO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gKDAsIHVzZXJJbmZvXzEudXNlVXNlckluZm9Db250ZXh0KSgpO1xuICAgIGNvbnN0IFtpc01vZGFsT3Blbiwgc2V0SXNNb2RhbE9wZW5dID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgLy8gdGhpc0dldFVzZXJTdGF0dXMoKVxuICAgICAgICBpZiAoc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIC8vIOabtOaWsCDpu5jorqTlgLxcbiAgICAgICAgICAgIGZvcm0uc2V0RmllbGRzVmFsdWUoe1xuICAgICAgICAgICAgICAgIG5ld0xpY2Vuc2VLZXk6IHNldHRpbmdzLm5ld0xpY2Vuc2VLZXksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIFtzZXR0aW5nc10pO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICBpZiAodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpIHtcbiAgICAgICAgICAgICgwLCBjYW52YXNfY29uZmV0dGlfMS5kZWZhdWx0KSh7XG4gICAgICAgICAgICAgICAgcGFydGljbGVDb3VudDogMTQwLFxuICAgICAgICAgICAgICAgIHNwcmVhZDogMTcwLFxuICAgICAgICAgICAgICAgIG9yaWdpbjogeyB5OiAwLjQgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwgW3VzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkXSk7XG4gICAgY29uc3QgaGFuZGxlRm9ybUNoYW5nZSA9ICgwLCB1c2VfZGVib3VuY2VfMS51c2VEZWJvdW5jZWRDYWxsYmFjaykoKHRlcm0pID0+IHtcbiAgICAgICAgc2F2ZU9wdGlvbnModGVybSk7XG4gICAgfSwgMzAwKTtcbiAgICBjb25zdCBzaG93TW9kYWwgPSAoKSA9PiB7XG4gICAgICAgIHNldElzTW9kYWxPcGVuKHRydWUpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlT2sgPSAoKSA9PiB7XG4gICAgICAgIHNldElzTW9kYWxPcGVuKGZhbHNlKTtcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgLy8gPHNlY3Rpb24gc3R5bGU9e3tcbiAgICAvLyAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNmZmQ5YTEnLFxuICAgIC8vICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmYWYwJ1xuICAgIC8vIH19PlxuICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLCB7IGZvcm06IGZvcm0sIG9uVmFsdWVzQ2hhbmdlOiBoYW5kbGVGb3JtQ2hhbmdlLCBsYWJlbENvbDogeyBzcGFuOiA0IH0sIGxheW91dDogXCJob3Jpem9udGFsXCIgfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgbmFtZTogXCJuZXdMaWNlbnNlS2V5XCIsIFxuICAgICAgICAgICAgICAgIC8vIGxhYmVsPXs8PiA8UHJvVGFnIC8+PC8+fVxuICAgICAgICAgICAgICAgIHN0eWxlOiB7fSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbnB1dCwgeyBzdHlsZTogeyBwYWRkaW5nTGVmdDogXCI1cHhcIiB9LCBwcmVmaXg6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IHN0eWxlOiB7IG1hcmdpblJpZ2h0OiBcIjRweFwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvVGFnXzEuUHJvVGFnLCBudWxsKSksIHN1ZmZpeDogKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSAmJiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5DaGVja0NpcmNsZVR3b1RvbmUsIHsgdHdvVG9uZUNvbG9yOiBcIiM1MmM0MWFcIiB9KSksIHBsYWNlaG9sZGVyOiBcIkxpY2Vuc2UgS2V5XCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9KSkpLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIiwgeyBjbGFzc05hbWU6IFwiYmctd2hpdGUgXCIgfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInB5LTggcHgtNCBteC1hdXRvIG1heC13LXNjcmVlbi14bCBsZzpweS05IGxnOnB4LTZcIiB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm14LWF1dG8gbWF4LXctc2NyZWVuLW1kIHRleHQtY2VudGVyIG1iLTggbGc6bWItMTJcIiB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImgyXCIsIHsgY2xhc3NOYW1lOiBcIm1iLTQgdGV4dC00eGwgdHJhY2tpbmctdGlnaHQgZm9udC1leHRyYWJvbGQgdGV4dC1ncmF5LTkwMCBcIiB9LCBcIkJyaWRnaW5nIHRoZSBnYXAgYmV0d2VlbiB0aGVvcnkgYW5kIHByYWN0aWNlXCIpKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtcm93IGp1c3RpZnktY2VudGVyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBmbGV4LWNvbCBwLTYgbXgtNCBtaW4tdy03MiBtYXgtdy1sZyB0ZXh0LWNlbnRlciB0ZXh0LWdyYXktOTAwIGJnLXdoaXRlIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBzaGFkb3cgIHhsOnAtOCBcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBmbGV4LWNvbCBnYXAtMyBtYi04XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtMnhsIGZvbnQtc2VtaWJvbGRcIiB9LCBcIlN0YXJ0ZXJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIHsgY2xhc3NOYW1lOiBcImZvbnQtbGlnaHQgdGV4dC1ncmF5LTUwMCBzbTp0ZXh0LWxnIFwiIH0sIFwiL1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWJhc2VsaW5lXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcIm1yLTIgdGV4dC01eGwgZm9udC1leHRyYWJvbGRcIiB9LCBcIiQwXCIpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInVsXCIsIHsgcm9sZTogXCJsaXN0XCIsIGNsYXNzTmFtZTogXCJtYi04IHNwYWNlLXktNCB0ZXh0LWxlZnRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTUgaC01IHRleHQtZ3JlZW4tNTAwIFwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCB2aWV3Qm94OiBcIjAgMCAyMCAyMFwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBmaWxsUnVsZTogXCJldmVub2RkXCIsIGQ6IFwiTTE2LjcwNyA1LjI5M2ExIDEgMCAwMTAgMS40MTRsLTggOGExIDEgMCAwMS0xLjQxNCAwbC00LTRhMSAxIDAgMDExLjQxNC0xLjQxNEw4IDEyLjU4Nmw3LjI5My03LjI5M2ExIDEgMCAwMTEuNDE0IDB6XCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIkFJXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy01IGgtNSB0ZXh0LWdyZWVuLTUwMCBcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgdmlld0JveDogXCIwIDAgMjAgMjBcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBkOiBcIk0xNi43MDcgNS4yOTNhMSAxIDAgMDEwIDEuNDE0bC04IDhhMSAxIDAgMDEtMS40MTQgMGwtNC00YTEgMSAwIDAxMS40MTQtMS40MTRMOCAxMi41ODZsNy4yOTMtNy4yOTNhMSAxIDAgMDExLjQxNCAwelwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJPbmxpbmUgZGljdGlvbmFyeVwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctNSBoLTUgdGV4dC1ncmVlbi01MDAgXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIHZpZXdCb3g6IFwiMCAwIDIwIDIwXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgZDogXCJNMTYuNzA3IDUuMjkzYTEgMSAwIDAxMCAxLjQxNGwtOCA4YTEgMSAwIDAxLTEuNDE0IDBsLTQtNGExIDEgMCAwMTEuNDE0LTEuNDE0TDggMTIuNTg2bDcuMjkzLTcuMjkzYTEgMSAwIDAxMS40MTQgMHpcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiQWRkIHRvIEFua2lcIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTUgaC01IHRleHQtZ3JheS01MDAgXCIsIHZpZXdCb3g6IFwiMCAwIDE1IDE1XCIsIGZpbGw6IFwibm9uZVwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBkOiBcIk0xMS43ODE2IDQuMDMxNTdDMTIuMDA2MiAzLjgwNzAyIDEyLjAwNjIgMy40NDI5NSAxMS43ODE2IDMuMjE4NEMxMS41NTcxIDIuOTkzODUgMTEuMTkzIDIuOTkzODUgMTAuOTY4NSAzLjIxODRMNy41MDAwNSA2LjY4NjgyTDQuMDMxNjQgMy4yMTg0QzMuODA3MDggMi45OTM4NSAzLjQ0MzAxIDIuOTkzODUgMy4yMTg0NiAzLjIxODRDMi45OTM5MSAzLjQ0Mjk1IDIuOTkzOTEgMy44MDcwMiAzLjIxODQ2IDQuMDMxNTdMNi42ODY4OCA3LjQ5OTk5TDMuMjE4NDYgMTAuOTY4NEMyLjk5MzkxIDExLjE5MyAyLjk5MzkxIDExLjU1NyAzLjIxODQ2IDExLjc4MTZDMy40NDMwMSAxMi4wMDYxIDMuODA3MDggMTIuMDA2MSA0LjAzMTY0IDExLjc4MTZMNy41MDAwNSA4LjMxMzE2TDEwLjk2ODUgMTEuNzgxNkMxMS4xOTMgMTIuMDA2MSAxMS41NTcxIDEyLjAwNjEgMTEuNzgxNiAxMS43ODE2QzEyLjAwNjIgMTEuNTU3IDEyLjAwNjIgMTEuMTkzIDExLjc4MTYgMTAuOTY4NEw4LjMxMzIyIDcuNDk5OTlMMTEuNzgxNiA0LjAzMTU3WlwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCBmaWxsUnVsZTogXCJldmVub2RkXCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIkxlYXJuaW5nIGluIFlvdVR1YmVcIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTUgaC01IHRleHQtZ3JheS01MDAgXCIsIHZpZXdCb3g6IFwiMCAwIDE1IDE1XCIsIGZpbGw6IFwibm9uZVwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBkOiBcIk0xMS43ODE2IDQuMDMxNTdDMTIuMDA2MiAzLjgwNzAyIDEyLjAwNjIgMy40NDI5NSAxMS43ODE2IDMuMjE4NEMxMS41NTcxIDIuOTkzODUgMTEuMTkzIDIuOTkzODUgMTAuOTY4NSAzLjIxODRMNy41MDAwNSA2LjY4NjgyTDQuMDMxNjQgMy4yMTg0QzMuODA3MDggMi45OTM4NSAzLjQ0MzAxIDIuOTkzODUgMy4yMTg0NiAzLjIxODRDMi45OTM5MSAzLjQ0Mjk1IDIuOTkzOTEgMy44MDcwMiAzLjIxODQ2IDQuMDMxNTdMNi42ODY4OCA3LjQ5OTk5TDMuMjE4NDYgMTAuOTY4NEMyLjk5MzkxIDExLjE5MyAyLjk5MzkxIDExLjU1NyAzLjIxODQ2IDExLjc4MTZDMy40NDMwMSAxMi4wMDYxIDMuODA3MDggMTIuMDA2MSA0LjAzMTY0IDExLjc4MTZMNy41MDAwNSA4LjMxMzE2TDEwLjk2ODUgMTEuNzgxNkMxMS4xOTMgMTIuMDA2MSAxMS41NTcxIDEyLjAwNjEgMTEuNzgxNiAxMS43ODE2QzEyLjAwNjIgMTEuNTU3IDEyLjAwNjIgMTEuMTkzIDExLjc4MTYgMTAuOTY4NEw4LjMxMzIyIDcuNDk5OTlMMTEuNzgxNiA0LjAzMTU3WlwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCBmaWxsUnVsZTogXCJldmVub2RkXCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIlNlYXJjaCBpbWFnZXNcIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTUgaC01IHRleHQtZ3JheS01MDAgXCIsIHZpZXdCb3g6IFwiMCAwIDE1IDE1XCIsIGZpbGw6IFwibm9uZVwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBkOiBcIk0xMS43ODE2IDQuMDMxNTdDMTIuMDA2MiAzLjgwNzAyIDEyLjAwNjIgMy40NDI5NSAxMS43ODE2IDMuMjE4NEMxMS41NTcxIDIuOTkzODUgMTEuMTkzIDIuOTkzODUgMTAuOTY4NSAzLjIxODRMNy41MDAwNSA2LjY4NjgyTDQuMDMxNjQgMy4yMTg0QzMuODA3MDggMi45OTM4NSAzLjQ0MzAxIDIuOTkzODUgMy4yMTg0NiAzLjIxODRDMi45OTM5MSAzLjQ0Mjk1IDIuOTkzOTEgMy44MDcwMiAzLjIxODQ2IDQuMDMxNTdMNi42ODY4OCA3LjQ5OTk5TDMuMjE4NDYgMTAuOTY4NEMyLjk5MzkxIDExLjE5MyAyLjk5MzkxIDExLjU1NyAzLjIxODQ2IDExLjc4MTZDMy40NDMwMSAxMi4wMDYxIDMuODA3MDggMTIuMDA2MSA0LjAzMTY0IDExLjc4MTZMNy41MDAwNSA4LjMxMzE2TDEwLjk2ODUgMTEuNzgxNkMxMS4xOTMgMTIuMDA2MSAxMS41NTcxIDEyLjAwNjEgMTEuNzgxNiAxMS43ODE2QzEyLjAwNjIgMTEuNTU3IDEyLjAwNjIgMTEuMTkzIDExLjc4MTYgMTAuOTY4NEw4LjMxMzIyIDcuNDk5OTlMMTEuNzgxNiA0LjAzMTU3WlwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCBmaWxsUnVsZTogXCJldmVub2RkXCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIlBhc3RlIHRoZSBpbWFnZSBmcm9tIHRoZSBjbGlwYm9hcmRcIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTUgaC01IHRleHQtZ3JheS01MDAgXCIsIHZpZXdCb3g6IFwiMCAwIDE1IDE1XCIsIGZpbGw6IFwibm9uZVwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBkOiBcIk0xMS43ODE2IDQuMDMxNTdDMTIuMDA2MiAzLjgwNzAyIDEyLjAwNjIgMy40NDI5NSAxMS43ODE2IDMuMjE4NEMxMS41NTcxIDIuOTkzODUgMTEuMTkzIDIuOTkzODUgMTAuOTY4NSAzLjIxODRMNy41MDAwNSA2LjY4NjgyTDQuMDMxNjQgMy4yMTg0QzMuODA3MDggMi45OTM4NSAzLjQ0MzAxIDIuOTkzODUgMy4yMTg0NiAzLjIxODRDMi45OTM5MSAzLjQ0Mjk1IDIuOTkzOTEgMy44MDcwMiAzLjIxODQ2IDQuMDMxNTdMNi42ODY4OCA3LjQ5OTk5TDMuMjE4NDYgMTAuOTY4NEMyLjk5MzkxIDExLjE5MyAyLjk5MzkxIDExLjU1NyAzLjIxODQ2IDExLjc4MTZDMy40NDMwMSAxMi4wMDYxIDMuODA3MDggMTIuMDA2MSA0LjAzMTY0IDExLjc4MTZMNy41MDAwNSA4LjMxMzE2TDEwLjk2ODUgMTEuNzgxNkMxMS4xOTMgMTIuMDA2MSAxMS41NTcxIDEyLjAwNjEgMTEuNzgxNiAxMS43ODE2QzEyLjAwNjIgMTEuNTU3IDEyLjAwNjIgMTEuMTkzIDExLjc4MTYgMTAuOTY4NEw4LjMxMzIyIDcuNDk5OTlMMTEuNzgxNiA0LjAzMTU3WlwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCBmaWxsUnVsZTogXCJldmVub2RkXCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIkFwcGVuZCBxdWVyeVwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctNSBoLTUgdGV4dC1ncmF5LTUwMCBcIiwgdmlld0JveDogXCIwIDAgMTUgMTVcIiwgZmlsbDogXCJub25lXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGQ6IFwiTTExLjc4MTYgNC4wMzE1N0MxMi4wMDYyIDMuODA3MDIgMTIuMDA2MiAzLjQ0Mjk1IDExLjc4MTYgMy4yMTg0QzExLjU1NzEgMi45OTM4NSAxMS4xOTMgMi45OTM4NSAxMC45Njg1IDMuMjE4NEw3LjUwMDA1IDYuNjg2ODJMNC4wMzE2NCAzLjIxODRDMy44MDcwOCAyLjk5Mzg1IDMuNDQzMDEgMi45OTM4NSAzLjIxODQ2IDMuMjE4NEMyLjk5MzkxIDMuNDQyOTUgMi45OTM5MSAzLjgwNzAyIDMuMjE4NDYgNC4wMzE1N0w2LjY4Njg4IDcuNDk5OTlMMy4yMTg0NiAxMC45Njg0QzIuOTkzOTEgMTEuMTkzIDIuOTkzOTEgMTEuNTU3IDMuMjE4NDYgMTEuNzgxNkMzLjQ0MzAxIDEyLjAwNjEgMy44MDcwOCAxMi4wMDYxIDQuMDMxNjQgMTEuNzgxNkw3LjUwMDA1IDguMzEzMTZMMTAuOTY4NSAxMS43ODE2QzExLjE5MyAxMi4wMDYxIDExLjU1NzEgMTIuMDA2MSAxMS43ODE2IDExLjc4MTZDMTIuMDA2MiAxMS41NTcgMTIuMDA2MiAxMS4xOTMgMTEuNzgxNiAxMC45Njg0TDguMzEzMjIgNy40OTk5OUwxMS43ODE2IDQuMDMxNTdaXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiQ29udGVudCBFZGl0YWJsZVwiKSkpKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBmbGV4LWNvbCBwLTYgbXgtNCBtaW4tdy03MiBtYXgtdy1sZyB0ZXh0LWNlbnRlciB0ZXh0LWdyYXktOTAwIGJnLXdoaXRlIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBzaGFkb3cgIHhsOnAtOCBcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBmbGV4LWNvbCBnYXAtMyBtYi04XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtMnhsIGZvbnQtc2VtaWJvbGRcIiB9LCBcIlByb1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBcIiwgeyBjbGFzc05hbWU6IFwiZm9udC1saWdodCB0ZXh0LWdyYXktNTAwIHNtOnRleHQtbGcgXCIgfSwgXCJPbmUtdGltZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWJhc2VsaW5lXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcIm1yLTIgdGV4dC01eGwgZm9udC1leHRyYWJvbGRcIiB9LCBcIiQ5XCIpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInVsXCIsIHsgcm9sZTogXCJsaXN0XCIsIGNsYXNzTmFtZTogXCJtYi04IHNwYWNlLXktNCB0ZXh0LWxlZnRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTUgaC01IHRleHQtZ3JlZW4tNTAwIFwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCB2aWV3Qm94OiBcIjAgMCAyMCAyMFwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBmaWxsUnVsZTogXCJldmVub2RkXCIsIGQ6IFwiTTE2LjcwNyA1LjI5M2ExIDEgMCAwMTAgMS40MTRsLTggOGExIDEgMCAwMS0xLjQxNCAwbC00LTRhMSAxIDAgMDExLjQxNC0xLjQxNEw4IDEyLjU4Nmw3LjI5My03LjI5M2ExIDEgMCAwMTEuNDE0IDB6XCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIkFJXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy01IGgtNSB0ZXh0LWdyZWVuLTUwMCBcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgdmlld0JveDogXCIwIDAgMjAgMjBcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBkOiBcIk0xNi43MDcgNS4yOTNhMSAxIDAgMDEwIDEuNDE0bC04IDhhMSAxIDAgMDEtMS40MTQgMGwtNC00YTEgMSAwIDAxMS40MTQtMS40MTRMOCAxMi41ODZsNy4yOTMtNy4yOTNhMSAxIDAgMDExLjQxNCAwelwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJPbmxpbmUgZGljdGlvbmFyeVwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctNSBoLTUgdGV4dC1ncmVlbi01MDAgXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIHZpZXdCb3g6IFwiMCAwIDIwIDIwXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgZDogXCJNMTYuNzA3IDUuMjkzYTEgMSAwIDAxMCAxLjQxNGwtOCA4YTEgMSAwIDAxLTEuNDE0IDBsLTQtNGExIDEgMCAwMTEuNDE0LTEuNDE0TDggMTIuNTg2bDcuMjkzLTcuMjkzYTEgMSAwIDAxMS40MTQgMHpcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiQWRkIHRvIEFua2lcIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTUgaC01IHRleHQtZ3JlZW4tNTAwIFwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCB2aWV3Qm94OiBcIjAgMCAyMCAyMFwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBmaWxsUnVsZTogXCJldmVub2RkXCIsIGQ6IFwiTTE2LjcwNyA1LjI5M2ExIDEgMCAwMTAgMS40MTRsLTggOGExIDEgMCAwMS0xLjQxNCAwbC00LTRhMSAxIDAgMDExLjQxNC0xLjQxNEw4IDEyLjU4Nmw3LjI5My03LjI5M2ExIDEgMCAwMTEuNDE0IDB6XCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIkxlYXJuaW5nIGluIFlvdVR1YmVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IHRhcmdldDogXCJfYmxhbmtcIiwgaHJlZjogXCJodHRwczovL2ppYW5nemlsb25nLm5vdGlvbi5zaXRlL0xlYXJuaW5nLWluLVlvdVR1YmUtWW91VHViZS0xZDYxZmQ1MDgxNWE0MmE1YWYzOTRkYjRhNjk1YzcxMj9wdnM9NFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IHdpZHRoOiBcIjE1XCIsIGhlaWdodDogXCIxNVwiLCB2aWV3Qm94OiBcIjAgMCAxNSAxNVwiLCBmaWxsOiBcIm5vbmVcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGQ6IFwiTTcuNDk5OTEgMC44NzY4OTJDMy44NDIyMiAwLjg3Njg5MiAwLjg3NzA3NSAzLjg0MjA0IDAuODc3MDc1IDcuNDk5NzJDMC44NzcwNzUgMTEuMTU3NCAzLjg0MjIyIDE0LjEyMjYgNy40OTk5MSAxNC4xMjI2QzExLjE1NzYgMTQuMTIyNiAxNC4xMjI3IDExLjE1NzQgMTQuMTIyNyA3LjQ5OTcyQzE0LjEyMjcgMy44NDIwNCAxMS4xNTc2IDAuODc2ODkyIDcuNDk5OTEgMC44NzY4OTJaTTEuODI3MDcgNy40OTk3MkMxLjgyNzA3IDQuMzY2NzEgNC4zNjY4OSAxLjgyNjg5IDcuNDk5OTEgMS44MjY4OUMxMC42MzI5IDEuODI2ODkgMTMuMTcyNyA0LjM2NjcxIDEzLjE3MjcgNy40OTk3MkMxMy4xNzI3IDEwLjYzMjcgMTAuNjMyOSAxMy4xNzI2IDcuNDk5OTEgMTMuMTcyNkM0LjM2Njg5IDEzLjE3MjYgMS44MjcwNyAxMC42MzI3IDEuODI3MDcgNy40OTk3MlpNOC4yNDk5MiA0LjQ5OTk5QzguMjQ5OTIgNC45MTQyIDcuOTE0MTMgNS4yNDk5OSA3LjQ5OTkyIDUuMjQ5OTlDNy4wODU3MSA1LjI0OTk5IDYuNzQ5OTIgNC45MTQyIDYuNzQ5OTIgNC40OTk5OUM2Ljc0OTkyIDQuMDg1NzcgNy4wODU3MSAzLjc0OTk5IDcuNDk5OTIgMy43NDk5OUM3LjkxNDEzIDMuNzQ5OTkgOC4yNDk5MiA0LjA4NTc3IDguMjQ5OTIgNC40OTk5OVpNNi4wMDAwMyA1Ljk5OTk5SDYuNTAwMDNINy41MDAwM0M3Ljc3NjE4IDUuOTk5OTkgOC4wMDAwMyA2LjIyMzg0IDguMDAwMDMgNi40OTk5OVY5Ljk5OTk5SDguNTAwMDNIOS4wMDAwM1YxMUg4LjUwMDAzSDcuNTAwMDNINi41MDAwM0g2LjAwMDAzVjkuOTk5OTlINi41MDAwM0g3LjAwMDAzVjYuOTk5OTlINi41MDAwM0g2LjAwMDAzVjUuOTk5OTlaXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTUgaC01IHRleHQtZ3JlZW4tNTAwIFwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCB2aWV3Qm94OiBcIjAgMCAyMCAyMFwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBmaWxsUnVsZTogXCJldmVub2RkXCIsIGQ6IFwiTTE2LjcwNyA1LjI5M2ExIDEgMCAwMTAgMS40MTRsLTggOGExIDEgMCAwMS0xLjQxNCAwbC00LTRhMSAxIDAgMDExLjQxNC0xLjQxNEw4IDEyLjU4Nmw3LjI5My03LjI5M2ExIDEgMCAwMTEuNDE0IDB6XCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIlNlYXJjaCBpbWFnZXNcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IHRhcmdldDogXCJfYmxhbmtcIiwgaHJlZjogXCJodHRwczovL2ppYW5nemlsb25nLm5vdGlvbi5zaXRlL1NlYXJjaC1pbWFnZXMtMzk2ZDI0NWRlY2U5NDhmZjgwM2I5ZTUxZjU2YmIzOGY/cHZzPTRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyB3aWR0aDogXCIxNVwiLCBoZWlnaHQ6IFwiMTVcIiwgdmlld0JveDogXCIwIDAgMTUgMTVcIiwgZmlsbDogXCJub25lXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBkOiBcIk03LjQ5OTkxIDAuODc2ODkyQzMuODQyMjIgMC44NzY4OTIgMC44NzcwNzUgMy44NDIwNCAwLjg3NzA3NSA3LjQ5OTcyQzAuODc3MDc1IDExLjE1NzQgMy44NDIyMiAxNC4xMjI2IDcuNDk5OTEgMTQuMTIyNkMxMS4xNTc2IDE0LjEyMjYgMTQuMTIyNyAxMS4xNTc0IDE0LjEyMjcgNy40OTk3MkMxNC4xMjI3IDMuODQyMDQgMTEuMTU3NiAwLjg3Njg5MiA3LjQ5OTkxIDAuODc2ODkyWk0xLjgyNzA3IDcuNDk5NzJDMS44MjcwNyA0LjM2NjcxIDQuMzY2ODkgMS44MjY4OSA3LjQ5OTkxIDEuODI2ODlDMTAuNjMyOSAxLjgyNjg5IDEzLjE3MjcgNC4zNjY3MSAxMy4xNzI3IDcuNDk5NzJDMTMuMTcyNyAxMC42MzI3IDEwLjYzMjkgMTMuMTcyNiA3LjQ5OTkxIDEzLjE3MjZDNC4zNjY4OSAxMy4xNzI2IDEuODI3MDcgMTAuNjMyNyAxLjgyNzA3IDcuNDk5NzJaTTguMjQ5OTIgNC40OTk5OUM4LjI0OTkyIDQuOTE0MiA3LjkxNDEzIDUuMjQ5OTkgNy40OTk5MiA1LjI0OTk5QzcuMDg1NzEgNS4yNDk5OSA2Ljc0OTkyIDQuOTE0MiA2Ljc0OTkyIDQuNDk5OTlDNi43NDk5MiA0LjA4NTc3IDcuMDg1NzEgMy43NDk5OSA3LjQ5OTkyIDMuNzQ5OTlDNy45MTQxMyAzLjc0OTk5IDguMjQ5OTIgNC4wODU3NyA4LjI0OTkyIDQuNDk5OTlaTTYuMDAwMDMgNS45OTk5OUg2LjUwMDAzSDcuNTAwMDNDNy43NzYxOCA1Ljk5OTk5IDguMDAwMDMgNi4yMjM4NCA4LjAwMDAzIDYuNDk5OTlWOS45OTk5OUg4LjUwMDAzSDkuMDAwMDNWMTFIOC41MDAwM0g3LjUwMDAzSDYuNTAwMDNINi4wMDAwM1Y5Ljk5OTk5SDYuNTAwMDNINy4wMDAwM1Y2Ljk5OTk5SDYuNTAwMDNINi4wMDAwM1Y1Ljk5OTk5WlwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCBmaWxsUnVsZTogXCJldmVub2RkXCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy01IGgtNSB0ZXh0LWdyZWVuLTUwMCBcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgdmlld0JveDogXCIwIDAgMjAgMjBcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBkOiBcIk0xNi43MDcgNS4yOTNhMSAxIDAgMDEwIDEuNDE0bC04IDhhMSAxIDAgMDEtMS40MTQgMGwtNC00YTEgMSAwIDAxMS40MTQtMS40MTRMOCAxMi41ODZsNy4yOTMtNy4yOTNhMSAxIDAgMDExLjQxNCAwelwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJQYXN0ZSB0aGUgaW1hZ2UgZnJvbSB0aGUgY2xpcGJvYXJkXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyB0YXJnZXQ6IFwiX2JsYW5rXCIsIGhyZWY6IFwiaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9QYXN0ZS10aGUtaW1hZ2UtZnJvbS10aGUtY2xpcGJvYXJkLTM2MDZjYThlNTc0ZjQ2NTJhYzU4MzcyMDNjNjUxZGE3P3B2cz00XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgd2lkdGg6IFwiMTVcIiwgaGVpZ2h0OiBcIjE1XCIsIHZpZXdCb3g6IFwiMCAwIDE1IDE1XCIsIGZpbGw6IFwibm9uZVwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZDogXCJNNy40OTk5MSAwLjg3Njg5MkMzLjg0MjIyIDAuODc2ODkyIDAuODc3MDc1IDMuODQyMDQgMC44NzcwNzUgNy40OTk3MkMwLjg3NzA3NSAxMS4xNTc0IDMuODQyMjIgMTQuMTIyNiA3LjQ5OTkxIDE0LjEyMjZDMTEuMTU3NiAxNC4xMjI2IDE0LjEyMjcgMTEuMTU3NCAxNC4xMjI3IDcuNDk5NzJDMTQuMTIyNyAzLjg0MjA0IDExLjE1NzYgMC44NzY4OTIgNy40OTk5MSAwLjg3Njg5MlpNMS44MjcwNyA3LjQ5OTcyQzEuODI3MDcgNC4zNjY3MSA0LjM2Njg5IDEuODI2ODkgNy40OTk5MSAxLjgyNjg5QzEwLjYzMjkgMS44MjY4OSAxMy4xNzI3IDQuMzY2NzEgMTMuMTcyNyA3LjQ5OTcyQzEzLjE3MjcgMTAuNjMyNyAxMC42MzI5IDEzLjE3MjYgNy40OTk5MSAxMy4xNzI2QzQuMzY2ODkgMTMuMTcyNiAxLjgyNzA3IDEwLjYzMjcgMS44MjcwNyA3LjQ5OTcyWk04LjI0OTkyIDQuNDk5OTlDOC4yNDk5MiA0LjkxNDIgNy45MTQxMyA1LjI0OTk5IDcuNDk5OTIgNS4yNDk5OUM3LjA4NTcxIDUuMjQ5OTkgNi43NDk5MiA0LjkxNDIgNi43NDk5MiA0LjQ5OTk5QzYuNzQ5OTIgNC4wODU3NyA3LjA4NTcxIDMuNzQ5OTkgNy40OTk5MiAzLjc0OTk5QzcuOTE0MTMgMy43NDk5OSA4LjI0OTkyIDQuMDg1NzcgOC4yNDk5MiA0LjQ5OTk5Wk02LjAwMDAzIDUuOTk5OTlINi41MDAwM0g3LjUwMDAzQzcuNzc2MTggNS45OTk5OSA4LjAwMDAzIDYuMjIzODQgOC4wMDAwMyA2LjQ5OTk5VjkuOTk5OTlIOC41MDAwM0g5LjAwMDAzVjExSDguNTAwMDNINy41MDAwM0g2LjUwMDAzSDYuMDAwMDNWOS45OTk5OUg2LjUwMDAzSDcuMDAwMDNWNi45OTk5OUg2LjUwMDAzSDYuMDAwMDNWNS45OTk5OVpcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctNSBoLTUgdGV4dC1ncmVlbi01MDAgXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIHZpZXdCb3g6IFwiMCAwIDIwIDIwXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgZDogXCJNMTYuNzA3IDUuMjkzYTEgMSAwIDAxMCAxLjQxNGwtOCA4YTEgMSAwIDAxLTEuNDE0IDBsLTQtNGExIDEgMCAwMTEuNDE0LTEuNDE0TDggMTIuNTg2bDcuMjkzLTcuMjkzYTEgMSAwIDAxMS40MTQgMHpcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiQXBwZW5kIHF1ZXJ5XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyB0YXJnZXQ6IFwiX2JsYW5rXCIsIGhyZWY6IFwiaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9Gb2xsb3ctdXAtcXVlc3Rpb24tYzMyMTA3MmU5Y2JjNGJjZmI1MTg0MzY0N2FhNzIwNDU/cHZzPTRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyB3aWR0aDogXCIxNVwiLCBoZWlnaHQ6IFwiMTVcIiwgdmlld0JveDogXCIwIDAgMTUgMTVcIiwgZmlsbDogXCJub25lXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBkOiBcIk03LjQ5OTkxIDAuODc2ODkyQzMuODQyMjIgMC44NzY4OTIgMC44NzcwNzUgMy44NDIwNCAwLjg3NzA3NSA3LjQ5OTcyQzAuODc3MDc1IDExLjE1NzQgMy44NDIyMiAxNC4xMjI2IDcuNDk5OTEgMTQuMTIyNkMxMS4xNTc2IDE0LjEyMjYgMTQuMTIyNyAxMS4xNTc0IDE0LjEyMjcgNy40OTk3MkMxNC4xMjI3IDMuODQyMDQgMTEuMTU3NiAwLjg3Njg5MiA3LjQ5OTkxIDAuODc2ODkyWk0xLjgyNzA3IDcuNDk5NzJDMS44MjcwNyA0LjM2NjcxIDQuMzY2ODkgMS44MjY4OSA3LjQ5OTkxIDEuODI2ODlDMTAuNjMyOSAxLjgyNjg5IDEzLjE3MjcgNC4zNjY3MSAxMy4xNzI3IDcuNDk5NzJDMTMuMTcyNyAxMC42MzI3IDEwLjYzMjkgMTMuMTcyNiA3LjQ5OTkxIDEzLjE3MjZDNC4zNjY4OSAxMy4xNzI2IDEuODI3MDcgMTAuNjMyNyAxLjgyNzA3IDcuNDk5NzJaTTguMjQ5OTIgNC40OTk5OUM4LjI0OTkyIDQuOTE0MiA3LjkxNDEzIDUuMjQ5OTkgNy40OTk5MiA1LjI0OTk5QzcuMDg1NzEgNS4yNDk5OSA2Ljc0OTkyIDQuOTE0MiA2Ljc0OTkyIDQuNDk5OTlDNi43NDk5MiA0LjA4NTc3IDcuMDg1NzEgMy43NDk5OSA3LjQ5OTkyIDMuNzQ5OTlDNy45MTQxMyAzLjc0OTk5IDguMjQ5OTIgNC4wODU3NyA4LjI0OTkyIDQuNDk5OTlaTTYuMDAwMDMgNS45OTk5OUg2LjUwMDAzSDcuNTAwMDNDNy43NzYxOCA1Ljk5OTk5IDguMDAwMDMgNi4yMjM4NCA4LjAwMDAzIDYuNDk5OTlWOS45OTk5OUg4LjUwMDAzSDkuMDAwMDNWMTFIOC41MDAwM0g3LjUwMDAzSDYuNTAwMDNINi4wMDAwM1Y5Ljk5OTk5SDYuNTAwMDNINy4wMDAwM1Y2Ljk5OTk5SDYuNTAwMDNINi4wMDAwM1Y1Ljk5OTk5WlwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCBmaWxsUnVsZTogXCJldmVub2RkXCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy01IGgtNSB0ZXh0LWdyZWVuLTUwMCBcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgdmlld0JveDogXCIwIDAgMjAgMjBcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBkOiBcIk0xNi43MDcgNS4yOTNhMSAxIDAgMDEwIDEuNDE0bC04IDhhMSAxIDAgMDEtMS40MTQgMGwtNC00YTEgMSAwIDAxMS40MTQtMS40MTRMOCAxMi41ODZsNy4yOTMtNy4yOTNhMSAxIDAgMDExLjQxNCAwelwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJDb250ZW50IEVkaXRhYmxlXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyB0YXJnZXQ6IFwiX2JsYW5rXCIsIGhyZWY6IFwiaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9Db250ZW50LUVkaXRhYmxlLVByby01NDY0NDQzOGI3N2Q0ZDNmYjc1NmNmOGJhYWY1MzU3YT9wdnM9NFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IHdpZHRoOiBcIjE1XCIsIGhlaWdodDogXCIxNVwiLCB2aWV3Qm94OiBcIjAgMCAxNSAxNVwiLCBmaWxsOiBcIm5vbmVcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGQ6IFwiTTcuNDk5OTEgMC44NzY4OTJDMy44NDIyMiAwLjg3Njg5MiAwLjg3NzA3NSAzLjg0MjA0IDAuODc3MDc1IDcuNDk5NzJDMC44NzcwNzUgMTEuMTU3NCAzLjg0MjIyIDE0LjEyMjYgNy40OTk5MSAxNC4xMjI2QzExLjE1NzYgMTQuMTIyNiAxNC4xMjI3IDExLjE1NzQgMTQuMTIyNyA3LjQ5OTcyQzE0LjEyMjcgMy44NDIwNCAxMS4xNTc2IDAuODc2ODkyIDcuNDk5OTEgMC44NzY4OTJaTTEuODI3MDcgNy40OTk3MkMxLjgyNzA3IDQuMzY2NzEgNC4zNjY4OSAxLjgyNjg5IDcuNDk5OTEgMS44MjY4OUMxMC42MzI5IDEuODI2ODkgMTMuMTcyNyA0LjM2NjcxIDEzLjE3MjcgNy40OTk3MkMxMy4xNzI3IDEwLjYzMjcgMTAuNjMyOSAxMy4xNzI2IDcuNDk5OTEgMTMuMTcyNkM0LjM2Njg5IDEzLjE3MjYgMS44MjcwNyAxMC42MzI3IDEuODI3MDcgNy40OTk3MlpNOC4yNDk5MiA0LjQ5OTk5QzguMjQ5OTIgNC45MTQyIDcuOTE0MTMgNS4yNDk5OSA3LjQ5OTkyIDUuMjQ5OTlDNy4wODU3MSA1LjI0OTk5IDYuNzQ5OTIgNC45MTQyIDYuNzQ5OTIgNC40OTk5OUM2Ljc0OTkyIDQuMDg1NzcgNy4wODU3MSAzLjc0OTk5IDcuNDk5OTIgMy43NDk5OUM3LjkxNDEzIDMuNzQ5OTkgOC4yNDk5MiA0LjA4NTc3IDguMjQ5OTIgNC40OTk5OVpNNi4wMDAwMyA1Ljk5OTk5SDYuNTAwMDNINy41MDAwM0M3Ljc3NjE4IDUuOTk5OTkgOC4wMDAwMyA2LjIyMzg0IDguMDAwMDMgNi40OTk5OVY5Ljk5OTk5SDguNTAwMDNIOS4wMDAwM1YxMUg4LjUwMDAzSDcuNTAwMDNINi41MDAwM0g2LjAwMDAzVjkuOTk5OTlINi41MDAwM0g3LjAwMDAzVjYuOTk5OTlINi41MDAwM0g2LjAwMDAzVjUuOTk5OTlaXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGhyZWY6IFwiI1wiLCBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKFwiaHR0cHM6Ly9qaWFuZy5sZW1vbnNxdWVlenkuY29tL2NoZWNrb3V0L2J1eS9lMzFmOGMxOC03YmYyLTRmNmItODVjMi01MDhmYjUwMGNlODRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgY2xhc3NOYW1lOiBcInRleHQtd2hpdGUgaG92ZXI6dGV4dC13aGl0ZSBiZy1vcmFuZ2UtNDAwIGhvdmVyOmJnLW9yYW5nZS01MDAgZm9jdXM6cmluZy00IGZvY3VzOnJpbmctcHJpbWFyeS0yMDAgZm9udC1tZWRpdW0gcm91bmRlZC1sZyB0ZXh0LXNtIHB4LTUgcHktMi41IHRleHQtY2VudGVyIFwiIH0sIFwiR2V0IHN0YXJ0ZWRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgaHJlZjogXCIjXCIsIG9uQ2xpY2s6IHNob3dNb2RhbCwgY2xhc3NOYW1lOiBcIiBtdC0yIGhvdmVyOnRleHQtb3JhbmdlLTUwMCB0ZXh0LW9yYW5nZS00MDAgIGZvY3VzOnJpbmctNCBmb2N1czpyaW5nLXByaW1hcnktMjAwIGZvbnQtbWVkaXVtIHJvdW5kZWQtbGcgdGV4dC1zbSBweC01IHB5LTIuNSB0ZXh0LWNlbnRlciBcIiB9LCBcIlxcdTVGQUVcXHU0RkUxXFx1NjUyRlxcdTRFRDhcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLk1vZGFsLCB7IHRpdGxlOiBcIldlQ2hhdFBheVwiLCBvcGVuOiBpc01vZGFsT3Blbiwgb25DYW5jZWw6IGhhbmRsZU9rLCBmb290ZXI6IG51bGwsIG1hc2tDbG9zYWJsZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBnYXAtM1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCwgXCJcXHU4QkY3XFx1NTcyOFxcdTRFRDhcXHU2QjNFXFx1NjVGNlxcdTU5MDdcXHU2Q0U4XFx1NEY2MFxcdTc2ODRcXHU5MEFFXFx1N0JCMVxcdUZGMENcXHU2RkMwXFx1NkQzQlxcdTc4MDFcXHU1QzA2XFx1NTNEMVxcdTkwMDFcXHU4MUYzXFx1OTBBRVxcdTdCQjFcXHU0RTJEXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyB3aWR0aDogMjQwLCBzcmM6IFwiaW1hZ2VzL1dlQ2hhdFBheS5wbmdcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFx1NjIxMVxcdTRFRUNcXHU0RjFBXFx1NUMzRFxcdTVGRUJcXHU1M0QxXFx1OTAwMVxcdTZGQzBcXHU2RDNCXFx1NzgwMVxcdUZGMENcXHU4MkU1XFx1NjcyQVxcdTY1MzZcXHU1MjMwXFx1NTNFRlxcdTgwNTRcXHU3Q0ZCXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtb3JhbmdlLTQwMFwiLCBocmVmOiBcIm1haWx0bzpqemxvbmc2NjZAZ21haWwuY29tP3N1YmplY3Q9XFx1OEJGN1xcdTUzRDFcXHU5MDAxIFNjb3V0ZXIgXFx1NkZDMFxcdTZEM0JcXHU3ODAxXCIgfSwgXCJqemxvbmc2NjZAZ21haWwuY29tXCIpKSkpKSkpKSkpKTtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBQcm87XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCB1c2VfZGVib3VuY2VfMSA9IHJlcXVpcmUoXCJ1c2UtZGVib3VuY2VcIik7XG5jb25zdCBZb3V0dWJlID0gKHsgc2V0dGluZ3MsIHNhdmVPcHRpb25zIH0pID0+IHtcbiAgICBjb25zdCBbZm9ybV0gPSBhbnRkXzEuRm9ybS51c2VGb3JtKCk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNldHRpbmdzKTtcbiAgICAgICAgaWYgKHNldHRpbmdzKSB7XG4gICAgICAgICAgICAvLyDmm7TmlrAg6buY6K6k5YC8XG4gICAgICAgICAgICBmb3JtLnNldEZpZWxkc1ZhbHVlKHtcbiAgICAgICAgICAgICAgICBzaG93WW91dHViZUJ1dHRvbjogc2V0dGluZ3Muc2hvd1lvdXR1YmVCdXR0b24sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIFtzZXR0aW5nc10pO1xuICAgIGNvbnN0IGhhbmRsZUZvcm1DaGFuZ2UgPSAoMCwgdXNlX2RlYm91bmNlXzEudXNlRGVib3VuY2VkQ2FsbGJhY2spKCh0ZXJtKSA9PiB7XG4gICAgICAgIHNhdmVPcHRpb25zKHRlcm0pO1xuICAgIH0sIDMwMCk7XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybVxuICAgIC8vIG9uRmluaXNoPXt9XG4gICAgLCB7IFxuICAgICAgICAvLyBvbkZpbmlzaD17fVxuICAgICAgICBvblZhbHVlc0NoYW5nZTogaGFuZGxlRm9ybUNoYW5nZSwgZm9ybTogZm9ybSwgbGFiZWxDb2w6IHsgc3BhbjogNCB9LCBsYXlvdXQ6IFwiaG9yaXpvbnRhbFwiIH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiLCBudWxsLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBuYW1lOiBcInNob3dZb3V0dWJlQnV0dG9uXCIsIHZhbHVlUHJvcE5hbWU6IFwiY2hlY2tlZFwiLCBsYWJlbDogXCJcXHVEODNEXFx1RENGQSBZb3VUdWJlIHNob3J0Y3V0XCIsIGV4dHJhOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7IGNsYXNzTmFtZTogXCIgdy1mdWxsIHB5LTIgbWF4LXctMnhsXCIsIHNyYzogXCJpbWFnZXMveW91dHViZS5wbmdcIiB9KSkgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuU3dpdGNoLCBudWxsKSkpKSk7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gWW91dHViZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsInZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiA/IChvYmopID0+IChPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSkgOiAob2JqKSA9PiAob2JqLl9fcHJvdG9fXyk7XG52YXIgbGVhZlByb3RvdHlwZXM7XG4vLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3Rcbi8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuLy8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4vLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3Rcbi8vIG1vZGUgJiAxNjogcmV0dXJuIHZhbHVlIHdoZW4gaXQncyBQcm9taXNlLWxpa2Vcbi8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbl9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG5cdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IHRoaXModmFsdWUpO1xuXHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuXHRpZih0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlKSB7XG5cdFx0aWYoKG1vZGUgJiA0KSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG5cdFx0aWYoKG1vZGUgJiAxNikgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicpIHJldHVybiB2YWx1ZTtcblx0fVxuXHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuXHR2YXIgZGVmID0ge307XG5cdGxlYWZQcm90b3R5cGVzID0gbGVhZlByb3RvdHlwZXMgfHwgW251bGwsIGdldFByb3RvKHt9KSwgZ2V0UHJvdG8oW10pLCBnZXRQcm90byhnZXRQcm90byldO1xuXHRmb3IodmFyIGN1cnJlbnQgPSBtb2RlICYgMiAmJiB2YWx1ZTsgdHlwZW9mIGN1cnJlbnQgPT0gJ29iamVjdCcgJiYgIX5sZWFmUHJvdG90eXBlcy5pbmRleE9mKGN1cnJlbnQpOyBjdXJyZW50ID0gZ2V0UHJvdG8oY3VycmVudCkpIHtcblx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdXJyZW50KS5mb3JFYWNoKChrZXkpID0+IChkZWZba2V5XSA9ICgpID0+ICh2YWx1ZVtrZXldKSkpO1xuXHR9XG5cdGRlZlsnZGVmYXVsdCddID0gKCkgPT4gKHZhbHVlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBkZWYpO1xuXHRyZXR1cm4gbnM7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5obWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZSA9IE9iamVjdC5jcmVhdGUobW9kdWxlKTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCAnZXhwb3J0cycsIHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHNldDogKCkgPT4ge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdFUyBNb2R1bGVzIG1heSBub3QgYXNzaWduIG1vZHVsZS5leHBvcnRzIG9yIGV4cG9ydHMuKiwgVXNlIEVTTSBleHBvcnQgc3ludGF4LCBpbnN0ZWFkOiAnICsgbW9kdWxlLmlkKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwib3B0aW9uc1wiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjaHJvbWVfZXh0ZW5zaW9uX3R5cGVzY3JpcHRfc3RhcnRlclwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjaHJvbWVfZXh0ZW5zaW9uX3R5cGVzY3JpcHRfc3RhcnRlclwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvT3B0aW9ucy9pbmRleC50c3hcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==