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
    const [radioValue, setRadioValue] = (0, react_1.useState)("myOwnOpenAiKey");
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
                openApiModel: settings.openApiModel,
                licenseKey: settings.licenseKey,
                chatGPTWeb: settings.chatGPTWeb,
                model: settings.model,
                freeModel: settings.freeModel,
                newLicenseKey: settings.newLicenseKey,
                ollamaApiEndpoint: settings.ollamaApiEndpoint,
                ollamaModel: settings.ollamaModel,
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
                react_1.default.createElement(antd_1.Radio.Group, { onChange: onRadioChange, value: radioValue, size: "small", style: { marginBottom: 0, display: "flex" } },
                    react_1.default.createElement(antd_1.Radio.Button, { value: "scouterFreeAI", style: { flex: "1", textAlign: "center" } }, "Scouter"),
                    react_1.default.createElement(antd_1.Radio.Button, { value: "myOwnOpenAiKey", style: { flex: "1", textAlign: "center" } }, "Customize"),
                    react_1.default.createElement(antd_1.Radio.Button, { value: "ollama", style: { flex: "1", textAlign: "center" } }, "Ollama"),
                    react_1.default.createElement(antd_1.Radio.Button, { value: "licenseKey", style: { flex: "1", textAlign: "center" } }, "OpenRouter"))),
            react_1.default.createElement("div", { 
                // className="text-center"
                style: {
                    display: radioValue === "scouterFreeAI" ? "block" : "none",
                } },
                react_1.default.createElement(antd_1.Form.Item, { name: "freeModel", label: "\uD83E\uDD16 Model", initialValue: models_1.freeModels[0]["name"] },
                    react_1.default.createElement(antd_1.Select, { placeholder: "" }, models_1.freeModels.map((item) => (react_1.default.createElement(Option, { key: item.id, value: item.id }, item.name)))))),
            react_1.default.createElement("div", { style: {
                    display: radioValue === "myOwnOpenAiKey" ? "block" : "none",
                } },
                react_1.default.createElement(antd_1.Form.Item, { name: "openApiEndpoint", label: "\uD83D\uDD17API Endpoint", extra: react_1.default.createElement("p", { style: {
                            color: "#666",
                        } },
                        "If you are using ",
                        react_1.default.createElement("strong", null, "Azure"),
                        " or a third-party endpoint, please fill in the endpoint address.",
                        " ",
                        react_1.default.createElement("a", { target: "__blank", href: "https://jiangzilong.notion.site/Set-up-your-API-Key-96266d5236fa462ca707683d9bb275c6?pvs=4" }, "Learn More\u2197\uFE0F")) },
                    react_1.default.createElement(antd_1.Input, { placeholder: "https://api.openai.com", type: "url" })),
                react_1.default.createElement(antd_1.Form.Item, { name: "openApiKey", label: "\uD83D\uDD11 Your Open API Key" },
                    react_1.default.createElement(antd_1.Input, { placeholder: "We will not use your Key for any other purposes.", type: "password" })),
                react_1.default.createElement(antd_1.Form.Item, { name: "openApiModel", label: "\uD83E\uDD16 Model" },
                    react_1.default.createElement(antd_1.Input, { placeholder: "We will not use your Key for any other purposes.", type: "text" }))),
            react_1.default.createElement("div", { style: {
                    display: radioValue === "ollama" ? "block" : "none",
                } },
                react_1.default.createElement(antd_1.Form.Item, { name: "ollamaApiEndpoint", label: "\uD83D\uDD17API Endpoint" },
                    react_1.default.createElement(antd_1.Input, { placeholder: "http://localhost:11434", type: "url" })),
                react_1.default.createElement(antd_1.Form.Item, { name: "ollamaModel", label: "\uD83E\uDD16Model", extra: react_1.default.createElement("p", { style: {
                            color: "#666",
                        } },
                        " ",
                        react_1.default.createElement("a", { target: "__blank", href: "https://jiangzilong.notion.site/How-to-use-Ollama-f8ff0d71198945b883e71e08f09cc9f5?pvs=4" }, "Learn More\u2197\uFE0F")) },
                    react_1.default.createElement(antd_1.Input, { placeholder: "llama2", type: "text" }))),
            react_1.default.createElement("div", { style: {
                    display: radioValue === "licenseKey" ? "block" : "none",
                } },
                react_1.default.createElement(antd_1.Form.Item, { name: "licenseKey", label: "\uD83D\uDD11Key", style: { marginBottom: "16px" } },
                    react_1.default.createElement(antd_1.Input, { placeholder: "We will not use your Key for any other purposes.", type: "password" })),
                react_1.default.createElement(antd_1.Form.Item, { name: "model", label: "\uD83E\uDD16Model", initialValue: models_1.models[0]["name"] },
                    react_1.default.createElement(antd_1.Select, { placeholder: "" }, models_1.models.map((item) => (react_1.default.createElement(Option, { key: item.id, value: item.id }, item.name)))))),
            react_1.default.createElement("div", { className: " text-center", style: {
                    display: radioValue === "chatGPTWeb" ? "block" : "none",
                    color: "#F08A24",
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
                console.log(settings);
                let ankiSettings = settings.ankiSettings;
                // 设置默认值
                console.log("设置默认值 ankiSettings:");
                console.log(ankiSettings);
                form.setFieldsValue({
                    ankiSettings: ankiSettings,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esc0RBQXNEO1dBQ3RELHNDQUFzQyxpRUFBaUU7V0FDdkc7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQTs7Ozs7V0NWQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztXQ2hEQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvT3B0aW9ucy9OYXYudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL09wdGlvbnMvaW5kZXgudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL09wdGlvbnMvc2VjdGlvbi9BSS50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvT3B0aW9ucy9zZWN0aW9uL0Fua2kvaW5kZXgudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL09wdGlvbnMvc2VjdGlvbi9Qcm8udHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL09wdGlvbnMvc2VjdGlvbi9Zb3V0dWJlLnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jcmVhdGUgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXJtb255IG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IE5hdiA9ICgpID0+IHtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIsIHsgY2xhc3NOYW1lOiBcInctZnVsbCBwLTggZmxleCBpdGVtcy1jZW50ZXJcIiB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBmbGV4LWF1dG9cIiB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdmbGV4IGl0ZW1zLWNlbnRlciBtci0yJyB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsgY2xhc3NOYW1lOiBcInctNSBoLTUgbXItMlwiLCBzcmM6IFwiaWNvbjEyOC5wbmdcIiB9KSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteGwgdGV4dC1ncmF5LTgwMFwiIH0sIFwiU2NvdXRlclwiKSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1ncmF5LTUwMCB0ZXh0LXNtIHB0LTFcIiwgdGFyZ2V0OiAnX2JsYW5rJywgaHJlZjogJ2h0dHBzOi8vamlhbmd6aWxvbmcubm90aW9uLnNpdGUvVmVyc2lvbi1DaGFuZ2UtbG9nLTc5YWU5MjQzYmFmYjQ4ZGFiMzE2MGYxMGVkOTBmNTg0P3B2cz00JyB9LCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS52ZXJzaW9uKSksXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXInIH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1ncmF5LTgwMCAgdGV4dC1zbSBtci00IGZsZXggZmxleC1yb3cgaXRlbXMtY2VudGVyXCIsIHRhcmdldDogJ19ibGFuaycsIGhyZWY6ICdodHRwczovL2ppYW5nemlsb25nLm5vdGlvbi5zaXRlLzNkYzViOGRhODZiNjQ1MTI5NmZjMzI2YzM0MGNlNmJhP3Y9YzQwMTAyYjcxYzNiNDg4ODhjYTdmMzc1MjVmNmEzMzAmcHZzPTQnIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyB3aWR0aDogXCIxNVwiLCBoZWlnaHQ6IFwiMTVcIiwgdmlld0JveDogXCIwIDAgMTUgMTVcIiwgZmlsbDogXCJub25lXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZDogXCJNMyAyLjVDMyAyLjIyMzg2IDMuMjIzODYgMiAzLjUgMkg5LjA4NTc5QzkuMjE4MzkgMiA5LjM0NTU3IDIuMDUyNjggOS40MzkzNCAyLjE0NjQ1TDExLjg1MzYgNC41NjA2NkMxMS45NDczIDQuNjU0NDMgMTIgNC43ODE2MSAxMiA0LjkxNDIxVjEyLjVDMTIgMTIuNzc2MSAxMS43NzYxIDEzIDExLjUgMTNIMy41QzMuMjIzODYgMTMgMyAxMi43NzYxIDMgMTIuNVYyLjVaTTMuNSAxQzIuNjcxNTcgMSAyIDEuNjcxNTcgMiAyLjVWMTIuNUMyIDEzLjMyODQgMi42NzE1NyAxNCAzLjUgMTRIMTEuNUMxMi4zMjg0IDE0IDEzIDEzLjMyODQgMTMgMTIuNVY0LjkxNDIxQzEzIDQuNTE2MzkgMTIuODQyIDQuMTM0ODYgMTIuNTYwNyAzLjg1MzU1TDEwLjE0NjQgMS40MzkzNEM5Ljg2NTE0IDEuMTU4MDQgOS40ODM2MSAxIDkuMDg1NzkgMUgzLjVaTTQuNSA0QzQuMjIzODYgNCA0IDQuMjIzODYgNCA0LjVDNCA0Ljc3NjE0IDQuMjIzODYgNSA0LjUgNUg3LjVDNy43NzYxNCA1IDggNC43NzYxNCA4IDQuNUM4IDQuMjIzODYgNy43NzYxNCA0IDcuNSA0SDQuNVpNNC41IDdDNC4yMjM4NiA3IDQgNy4yMjM4NiA0IDcuNUM0IDcuNzc2MTQgNC4yMjM4NiA4IDQuNSA4SDEwLjVDMTAuNzc2MSA4IDExIDcuNzc2MTQgMTEgNy41QzExIDcuMjIzODYgMTAuNzc2MSA3IDEwLjUgN0g0LjVaTTQuNSAxMEM0LjIyMzg2IDEwIDQgMTAuMjIzOSA0IDEwLjVDNCAxMC43NzYxIDQuMjIzODYgMTEgNC41IDExSDEwLjVDMTAuNzc2MSAxMSAxMSAxMC43NzYxIDExIDEwLjVDMTEgMTAuMjIzOSAxMC43NzYxIDEwIDEwLjUgMTBINC41WlwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCBmaWxsUnVsZTogXCJldmVub2RkXCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSksXG4gICAgICAgICAgICAgICAgXCJXaWtpXCIpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtZ3JheS04MDAgdGV4dC1zbSBtci00IGZsZXggZmxleC1yb3cgaXRlbXMtY2VudGVyXCIsIHRhcmdldDogJ19ibGFuaycsIGhyZWY6ICdodHRwczovL2Rpc2NvcmQuZ2cvd01hTW1IN01NSycgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IHdpZHRoOiBcIjE1XCIsIGhlaWdodDogXCIxNVwiLCB2aWV3Qm94OiBcIjAgMCAxNSAxNVwiLCBmaWxsOiBcIm5vbmVcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBmaWxsUnVsZTogXCJldmVub2RkXCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiwgZDogXCJNNS4wNzQ1MSAxLjgyNTg0QzUuMDMyNjcgMS44MTkyNiA0Ljk5MDE0IDEuODE4MjUgNC45NDgwMyAxLjgyMjg0QzQuMTA2ODMgMS45MTQ0NiAyLjgyNjczIDIuMzY4MjggMi4wNzExNSAyLjc3ODA4QzIuMDIxMDYgMi44MDUyNSAxLjk3NjIxIDIuODQxMTIgMS45Mzg2OSAyLjg4NDAyQzEuNjI1MDIgMy4yNDI2NiAxLjM0MDQ2IDMuODI4MzYgMS4xMTcwNiA0LjM4MTg2QzAuODg3NDQ3IDQuOTUwNzYgMC42OTcyOTMgNS41NTAzMiAwLjU4ODkzNyA1Ljk4MzU0QzAuMjM2MjMyIDcuMzkzNjkgMC4wNDI1MDIgOS4wODcyOCAwLjAxNzQ5NDggMTAuNjkyNUMwLjAxNjI0MjkgMTAuNzcyOSAwLjAzNTE4ODMgMTAuODUyMyAwLjA3MjU5MzEgMTAuOTIzNEMwLjM3MzY3OSAxMS40OTYgMS4wMjAxNSAxMi4wMjcgMS42NjgwOSAxMi40MTUyQzIuMzIzMzIgMTIuODA3OCAzLjA4NzMyIDEzLjExODIgMy43MDM4NSAxMy4xNzc4QzMuODUzMzUgMTMuMTkyMiA0LjAwMDk4IDEzLjEzNTggNC4xMDI4MiAxMy4wMjU1QzQuMjU3MiAxMi44NTgxIDQuNTE5MyAxMi40Njc2IDQuNzE3NDUgMTIuMTY0M0M0LjgwNzM5IDEyLjAyNjcgNC44OTE1NyAxMS44OTUzIDQuOTU4NDUgMTEuNzkwMUM1LjYyMDIzIDExLjkxMDYgNi40NTA0MyAxMS45ODAxIDcuNTAwMDIgMTEuOTgwMUM4LjU0ODQ0IDExLjk4MDEgOS4zNzc5NiAxMS45MTA3IDEwLjAzOTQgMTEuNzkwNUMxMC4xMDYyIDExLjg5NTcgMTAuMTkwMyAxMi4wMjY5IDEwLjI4MDEgMTIuMTY0M0MxMC40NzgzIDEyLjQ2NzYgMTAuNzQwNCAxMi44NTgxIDEwLjg5NDcgMTMuMDI1NUMxMC45OTY2IDEzLjEzNTggMTEuMTQ0MiAxMy4xOTIyIDExLjI5MzcgMTMuMTc3OEMxMS45MTAyIDEzLjExODIgMTIuNjc0MiAxMi44MDc4IDEzLjMyOTUgMTIuNDE1MkMxMy45Nzc0IDEyLjAyNyAxNC42MjM5IDExLjQ5NiAxNC45MjUgMTAuOTIzNEMxNC45NjI0IDEwLjg1MjMgMTQuOTgxMyAxMC43NzI5IDE0Ljk4MDEgMTAuNjkyNUMxNC45NTUxIDkuMDg3MjggMTQuNzYxMyA3LjM5MzY5IDE0LjQwODYgNS45ODM1NEMxNC4zMDAzIDUuNTUwMzIgMTQuMTEwMSA0Ljk1MDc2IDEzLjg4MDUgNC4zODE4NkMxMy42NTcxIDMuODI4MzYgMTMuMzcyNSAzLjI0MjY2IDEzLjA1ODkgMi44ODQwMkMxMy4wMjE0IDIuODQxMTIgMTIuOTc2NSAyLjgwNTI1IDEyLjkyNjQgMi43NzgwOEMxMi4xNzA4IDIuMzY4MjggMTAuODkwNyAxLjkxNDQ2IDEwLjA0OTUgMS44MjI4NEMxMC4wMDc0IDEuODE4MjUgOS45NjQ4OSAxLjgxOTI2IDkuOTIzMDUgMS44MjU4NEM5LjcxNjc2IDEuODU4MjUgOS41MzkxIDEuOTY0NTggOS40MDgwOSAyLjA2MzU1QzkuMjY5NzcgMi4xNjgwNCA5LjE0MTMgMi4yOTY2OCA5LjAzMDQgMi40MjY4MkM4Ljg2OTY4IDIuNjE1NDQgOC43MTQzNyAyLjg0NDg4IDguNjE0MjggMy4wNjIyNUM4LjI3MjM3IDMuMDM1MDEgNy45MDEzOCAzLjAyIDcuNSAzLjAyQzcuMDk3NyAzLjAyIDYuNzI1OTMgMy4wMzUwOCA2LjM4MzM3IDMuMDYyNDRDNi4yODMyOCAyLjg0NTAxIDYuMTI3OTIgMi42MTU0OSA1Ljk2NzE2IDIuNDI2ODJDNS44NTYyNiAyLjI5NjY4IDUuNzI3NzggMi4xNjgwNCA1LjU4OTQ3IDIuMDYzNTVDNS40NTg0NiAxLjk2NDU4IDUuMjgwOCAxLjg1ODI1IDUuMDc0NTEgMS44MjU4NFpNMTEuMDE4MSAxMS41MzgyQzExLjAzOTUgMTEuNTcxMyAxMS4wNjE1IDExLjYwNTEgMTEuMDgzOCAxMS42MzkyQzExLjIxNjkgMTEuODQzIDExLjM0ODcgMTIuMDM4NSAxMS40NTA4IDEyLjE4MDlDMTEuODQ3NSAxMi4wOTE2IDEyLjM1MiAxMS44ODE4IDEyLjgzNjEgMTEuNTkxN0MxMy4zNzk1IDExLjI2NjEgMTMuODA5OCAxMC44OTE4IDE0LjAxNzcgMTAuNTczOUMxMy45ODUyIDkuMDY3NTggMTMuNzk5MyA3LjUwMzY5IDEzLjQ3NzMgNi4yMTY0OEMxMy4zOCA1LjgyNzU5IDEzLjIwMzggNS4yNzAyMSAxMi45OTAzIDQuNzQxMTdDMTIuNzg5MyA0LjI0MzI2IDEyLjU3NTMgMy44MjE2MiAxMi4zODggMy41NzkyQzExLjczNzYgMy4yNDIxOSAxMC43MTI5IDIuODg1ODIgMTAuMDQ1NCAyLjc4OTg3QzEwLjAzMDggMi43OTgzOSAxMC4wMTEzIDIuODExMDIgOS45ODY3NSAyLjgyOTU1QzkuOTE4NjMgMi44ODEgOS44NDAxOCAyLjk1NjY2IDkuNzYxMTEgMy4wNDk0NUM5LjcxOTU5IDMuMDk4MTcgOS42ODE2NiAzLjE0NzEgOS42NDc2OCAzLjE5NDQ5QzkuOTUzIDMuMjUwMzEgMTAuMjI1MyAzLjMxNzEgMTAuNDY2MiAzLjM5MTIzQzExLjE0OTkgMy42MDE2IDExLjY0MjggMy44OTAzOSAxMS44ODQgNC4yMTJDMTIuMDQzMSA0LjQyNDA4IDEyLjAwMDEgNC43MjQ5NCAxMS43ODggNC44ODRDMTEuNTc1OSA1LjA0MzA2IDExLjI3NTEgNS4wMDAwOCAxMS4xMTYgNC43ODhDMTEuMDU3MiA0LjcwOTYxIDEwLjgwMDEgNC40OTg0IDEwLjE4MzggNC4zMDg3N0M5LjU4OTMzIDQuMTI1ODUgOC43MTM1NiAzLjk4IDcuNSAzLjk4QzYuMjg2NDQgMy45OCA1LjQxMDY3IDQuMTI1ODUgNC44MTYxNiA0LjMwODc3QzQuMTk5ODggNC40OTg0IDMuOTQyNzkgNC43MDk2MSAzLjg4NCA0Ljc4OEMzLjcyNDk0IDUuMDAwMDggMy40MjQwOCA1LjA0MzA2IDMuMjEyIDQuODg0QzIuOTk5OTIgNC43MjQ5NCAyLjk1Njk0IDQuNDI0MDggMy4xMTYgNC4yMTJDMy4zNTcyMSAzLjg5MDM5IDMuODUwMTEgMy42MDE2IDQuNTMzODMgMy4zOTEyM0M0Ljc3NDE4IDMuMzE3MjcgNS4wNDU3MSAzLjI1MDYyIDUuMzUwMTYgMy4xOTQ4OEM1LjMxNjExIDMuMTQ3MzggNS4yNzgwOCAzLjA5ODMxIDUuMjM2NDUgMy4wNDk0NUM1LjE1NzM4IDIuOTU2NjYgNS4wNzg5MyAyLjg4MSA1LjAxMDgxIDIuODI5NTVDNC45ODYyOCAyLjgxMTAyIDQuOTY2NzQgMi43OTgzOSA0Ljk1MjE3IDIuNzg5ODdDNC4yODQ2NCAyLjg4NTgyIDMuMjU5OTkgMy4yNDIxOSAyLjYwOTU0IDMuNTc5MkMyLjQyMjI2IDMuODIxNjIgMi4yMDgyNSA0LjI0MzI2IDIuMDA3MjkgNC43NDExN0MxLjc5Mzc2IDUuMjcwMjEgMS42MTc1MiA1LjgyNzU5IDEuNTIwMjUgNi4yMTY0OEMxLjE5ODI5IDcuNTAzNjkgMS4wMTIzNiA5LjA2NzU4IDAuOTc5ODYgMTAuNTczOUMxLjE4NzcyIDEwLjg5MTggMS42MTgwNyAxMS4yNjYxIDIuMTYxNDggMTEuNTkxN0MyLjY0NTU3IDExLjg4MTggMy4xNTAwMyAxMi4wOTE2IDMuNTQ2OCAxMi4xODA5QzMuNjQ4ODUgMTIuMDM4NSAzLjc4MDY1IDExLjg0MyAzLjkxMzggMTEuNjM5MkMzLjkzNjI2IDExLjYwNDggMy45NTgzOCAxMS41NzA4IDMuOTc5OTYgMTEuNTM3NUMzLjE5NTIxIDExLjI1OTEgMi43NzM2MSAxMC44NzU4IDIuNTAwNjQgMTAuNDY2NEMyLjM1MzU5IDEwLjI0NTggMi40MTMyIDkuOTQ3NzggMi42MzM3NyA5LjgwMDc0QzIuODU0MzUgOS42NTM2OSAzLjE1MjM2IDkuNzEzMjkgMy4yOTk0MSA5LjkzMzg3QzMuNTYwNzcgMTAuMzI1OSA0LjI0MzU1IDExLjAyMDEgNy41MDAwMiAxMS4wMjAxQzEwLjc1NjUgMTEuMDIwMSAxMS40MzkyIDEwLjMyNiAxMS43MDA2IDkuOTMzODZDMTEuODQ3NyA5LjcxMzI5IDEyLjE0NTcgOS42NTM2OSAxMi4zNjYzIDkuODAwNzRDMTIuNTg2OSA5Ljk0Nzc5IDEyLjY0NjUgMTAuMjQ1OCAxMi40OTk0IDEwLjQ2NjRDMTIuMjI2MiAxMC44NzYyIDExLjgwNDEgMTEuMjU5OCAxMS4wMTgxIDExLjUzODJaTTQuMDgwNDkgNy4wMTIyMUM0LjMyNDEyIDYuNzQ5ODQgNC42NTQ3NiA2LjYwMTYyIDUuMDAwMDcgNi41OTk5OEM1LjM0NTM4IDYuNjAxNjIgNS42NzYwMyA2Ljc0OTg0IDUuOTE5NjYgNy4wMTIyMUM2LjE2MzI5IDcuMjc0NTkgNi4zMDAwNyA3LjYyOTc0IDYuMzAwMDcgNy45OTk5OEM2LjMwMDA3IDguMzcwMjEgNi4xNjMyOSA4LjcyNTM2IDUuOTE5NjYgOC45ODc3NEM1LjY3NjAzIDkuMjUwMTEgNS4zNDUzOCA5LjM5ODMzIDUuMDAwMDcgOS4zOTk5OEM0LjY1NDc2IDkuMzk4MzMgNC4zMjQxMiA5LjI1MDExIDQuMDgwNDkgOC45ODc3NEMzLjgzNjg1IDguNzI1MzYgMy43MDAwNyA4LjM3MDIxIDMuNzAwMDcgNy45OTk5OEMzLjcwMDA3IDcuNjI5NzQgMy44MzY4NSA3LjI3NDU5IDQuMDgwNDkgNy4wMTIyMVpNOS45OTg4NSA2LjU5OTk4QzkuNjUzNTQgNi42MDE2MiA5LjMyMjkgNi43NDk4NCA5LjA3OTI2IDcuMDEyMjFDOC44MzU2MyA3LjI3NDU5IDguNjk4ODUgNy42Mjk3NCA4LjY5ODg1IDcuOTk5OThDOC42OTg4NSA4LjM3MDIxIDguODM1NjMgOC43MjUzNiA5LjA3OTI2IDguOTg3NzRDOS4zMjI5IDkuMjUwMTEgOS42NTM1NCA5LjM5ODMzIDkuOTk4ODUgOS4zOTk5OEMxMC4zNDQyIDkuMzk4MzMgMTAuNjc0OCA5LjI1MDExIDEwLjkxODQgOC45ODc3NEMxMS4xNjIxIDguNzI1MzYgMTEuMjk4OSA4LjM3MDIxIDExLjI5ODkgNy45OTk5OEMxMS4yOTg5IDcuNjI5NzQgMTEuMTYyMSA3LjI3NDU5IDEwLjkxODQgNy4wMTIyMUMxMC42NzQ4IDYuNzQ5ODQgMTAuMzQ0MiA2LjYwMTYyIDkuOTk4ODUgNi41OTk5OFpcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiB9KSksXG4gICAgICAgICAgICAgICAgXCJEaXNjb3JkXCIpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtZ3JheS04MDAgdGV4dC1zbSBtci00IGZsZXggZmxleC1yb3cgaXRlbXMtY2VudGVyXCIsIHRhcmdldDogJ19ibGFuaycsIGhyZWY6ICdodHRwczovL2Nocm9tZXdlYnN0b3JlLmdvb2dsZS5jb20vZGV0YWlsL3Njb3V0ZXIvbW5jZmNqbmFicGZvYWdvY2FuZmpnbGZjcG1tbmtpY2InIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyB3aWR0aDogXCIxNVwiLCBoZWlnaHQ6IFwiMTVcIiwgdmlld0JveDogXCIwIDAgMTUgMTVcIiwgZmlsbDogXCJub25lXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZDogXCJNMS4zNTI0OCA0LjkwNTMyQzEuMzUyNDggMi45NDQ5OCAyLjkzNiAxLjM1MjQ4IDQuODkzNDYgMS4zNTI0OEM2LjI1NzY5IDEuMzUyNDggNi44NjA1OCAxLjkyMzM2IDcuNTAwMDIgMi45MzU0NUM4LjEzOTQ2IDEuOTIzMzYgOC43NDIzNSAxLjM1MjQ4IDEwLjEwNjYgMS4zNTI0OEMxMi4wNjQgMS4zNTI0OCAxMy42NDc2IDIuOTQ0OTggMTMuNjQ3NiA0LjkwNTMyQzEzLjY0NzYgNi43NDA0MSAxMi42MDEzIDguNTA1MDggMTEuNDAwOCA5Ljk2OTI3QzEwLjI2MzYgMTEuMzU2MiA4LjkyMTk0IDEyLjU1MDggOC4wMDYwMSAxMy4zNjY0QzcuOTQ2NDUgMTMuNDE5NCA3Ljg4ODY5IDEzLjQ3MDkgNy44MzI5MSAxMy41MjA2QzcuNjQzMjQgMTMuNjg5OSA3LjM1NjggMTMuNjg5OSA3LjE2NzEzIDEzLjUyMDZDNy4xMTEzNSAxMy40NzA5IDcuMDUzNTkgMTMuNDE5NCA2Ljk5NDAzIDEzLjM2NjRDNi4wNzgxIDEyLjU1MDggNC43MzY0MSAxMS4zNTYyIDMuNTk5MjYgOS45NjkyN0MyLjM5ODcyIDguNTA1MDggMS4zNTI0OCA2Ljc0MDQxIDEuMzUyNDggNC45MDUzMlpcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpLFxuICAgICAgICAgICAgICAgIFwiRXZhbHVhdGlvblwiKSkpKTtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBOYXY7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk9wdGlvbnMgPSB2b2lkIDA7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCByZWFjdF9kb21fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3QtZG9tXCIpKTtcbmNvbnN0IGFtcGxpdHVkZSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQGFtcGxpdHVkZS9hbmFseXRpY3MtYnJvd3NlclwiKSk7XG5jb25zdCBOYXZfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9OYXZcIikpO1xuY29uc3QgR2VuZXJhbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3NlY3Rpb24vR2VuZXJhbFwiKSk7XG5jb25zdCBBSV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3NlY3Rpb24vQUlcIikpO1xuY29uc3QgUHJvXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc2VjdGlvbi9Qcm9cIikpO1xuY29uc3QgQW5raV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3NlY3Rpb24vQW5raVwiKSk7XG5jb25zdCBZb3V0dWJlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc2VjdGlvbi9Zb3V0dWJlXCIpKTtcbmNvbnN0IGNzc2luanNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9jc3NpbmpzXCIpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbmNvbnN0IHV0aWxfMiA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5jb25zdCB1c2VySW5mb18xID0gcmVxdWlyZShcIi4uL2xpYi91c2VySW5mb1wiKTtcbnJlcXVpcmUoXCIuL2luZGV4LmNzc1wiKTtcbnJlcXVpcmUoXCIuLi9pbmRleC5jc3NcIik7XG4vLyBjb25zdCBsYW5ndWFnZURhdGE6IExhbmd1YWdlT2JqZWN0ID0gbGFuZztcbmNvbnN0IE9wdGlvbnMgPSAoKSA9PiB7XG4gICAgLy8gaW50ZXJmYWNlIFVzZXJDb250ZXh0VHlwZSB7XG4gICAgLy8gICB1c2VySW5mbzogdXNlckluZm9UeXBlO1xuICAgIC8vICAgc2V0VXNlckluZm86IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHVzZXJJbmZvVHlwZT4+O1xuICAgIC8vIH1cbiAgICBjb25zdCBkZWZhdWx0VXNlckluZm8gPSB7IHVzZXJJZDogJycsIHZlcmlmaWVkOiBmYWxzZSwgY29udGV4dE1lbnU6IGZhbHNlLCBzaG93WW91dHViZUJ1dHRvbjogdHJ1ZSwgY29udGVudEVkaXRhYmxlOiBmYWxzZSB9O1xuICAgIC8vIGNvbnN0IFVzZXJDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxVc2VyQ29udGV4dFR5cGU+KHsgdXNlckluZm86IGRlZmF1bHRVc2VySW5mbywgc2V0VXNlckluZm86ICgpID0+IHsgfSB9KTtcbiAgICBjb25zdCBbdXNlckluZm8sIHNldFVzZXJJbmZvXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShkZWZhdWx0VXNlckluZm8pO1xuICAgIGNvbnN0IFtzZXR0aW5ncywgc2V0U2V0dGluZ3NdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKCk7XG4gICAgY29uc3QgZGl2RWxlbWVudCA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3QgdGFiSXRlbXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdHZW5lcmFsJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEdlbmVyYWxfMS5kZWZhdWx0LCB7IHNldHRpbmdzOiBzZXR0aW5ncywgc2F2ZU9wdGlvbnM6IHRoaXNTYXZlT3B0aW9ucyB9KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQW5raScsXG4gICAgICAgICAgICBjb250ZW50OiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChBbmtpXzEuZGVmYXVsdCwgeyBzZXR0aW5nczogc2V0dGluZ3MsIHNhdmVPcHRpb25zOiB0aGlzU2F2ZU9wdGlvbnMgfSlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0FJJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEFJXzEuZGVmYXVsdCwgeyBzZXR0aW5nczogc2V0dGluZ3MsIHNhdmVPcHRpb25zOiB0aGlzU2F2ZU9wdGlvbnMgfSlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1lvdVR1YmUnLFxuICAgICAgICAgICAgY29udGVudDogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoWW91dHViZV8xLmRlZmF1bHQsIHsgc2V0dGluZ3M6IHNldHRpbmdzLCBzYXZlT3B0aW9uczogdGhpc1NhdmVPcHRpb25zIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICfimqFQcm8nLFxuICAgICAgICAgICAgY29udGVudDogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvXzEuZGVmYXVsdCwgeyBzZXR0aW5nczogc2V0dGluZ3MsIHNhdmVPcHRpb25zOiB0aGlzU2F2ZU9wdGlvbnMgfSlcbiAgICAgICAgfVxuICAgIF07XG4gICAgY29uc3QgdGhpc0dldFVzZXJTdGF0dXMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAoMCwgdXRpbF8xLmdldFVzZXJJbmZvKSgpLnRoZW4oKHVzZXJJbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8g5pu05pawIFVJXG4gICAgICAgICAgICAgICAgLy8gc2V0VmVyaWZpZWQodXNlckluZm8udmVyaWZpZWQpXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh1c2VySW5mbyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgKCgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgLy8g6I635Y+W6YWN572u5L+h5oGvXG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IHlpZWxkICgwLCB1dGlsXzIuZ2V0U2V0dGluZ3MpKCk7XG4gICAgICAgICAgICBzZXRTZXR0aW5ncyhpdGVtcyk7XG4gICAgICAgICAgICBjb25zdCB1c2VySW5mbyA9IHlpZWxkIHRoaXNHZXRVc2VyU3RhdHVzKCk7XG4gICAgICAgICAgICBzZXRVc2VySW5mbyh1c2VySW5mbyk7XG4gICAgICAgICAgICBjb25zdCB1c2VySWQgPSB1c2VySW5mby51c2VySWQ7XG4gICAgICAgICAgICAvLyDmlbDmja7ln4vngrlcbiAgICAgICAgICAgIGFtcGxpdHVkZS5pbml0KHByb2Nlc3MuZW52LkFNUExJVFVERV9LRVksIHVzZXJJZCwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUcmFja2luZzoge1xuICAgICAgICAgICAgICAgICAgICBwYWdlVmlld3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uczogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYW1wbGl0dWRlLnRyYWNrKCdvcGVuT3B0aW9ucycpO1xuICAgICAgICB9KSkoKTtcbiAgICB9LCBbXSk7XG4gICAgZnVuY3Rpb24gdGhpc1NhdmVPcHRpb25zKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgLy/kv53lrZjorr7nva5cbiAgICAgICAgICAgICgwLCB1dGlsXzIuc2F2ZU9wdGlvbnMpKHZhbHVlcyk7XG4gICAgICAgICAgICAvLyDojrflj5bplK7lgLzlr7lcbiAgICAgICAgICAgIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyh2YWx1ZXMpO1xuICAgICAgICAgICAgLy8g6YGN5Y6G6ZSu5YC85a+5XG4gICAgICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ25ld0xpY2Vuc2VLZXknKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOabtOaWsOiuoumYheeKtuaAgVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VySW5mbyA9IHlpZWxkIHRoaXNHZXRVc2VyU3RhdHVzKCk7XG4gICAgICAgICAgICAgICAgICAgIHNldFVzZXJJbmZvKHVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDmm7TmlrBcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0geWllbGQgKDAsIHV0aWxfMi5nZXRTZXR0aW5ncykoKTtcbiAgICAgICAgICAgIHNldFNldHRpbmdzKGl0ZW1zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQodXNlckluZm9fMS5Vc2VySW5mb0NvbnRleHQuUHJvdmlkZXIsIHsgdmFsdWU6IHsgdXNlcjogdXNlckluZm8sIGFua2k6IG51bGwgfSB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2ZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGgtc2NyZWVuJyB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoTmF2XzEuZGVmYXVsdCwgbnVsbCksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBcIk15T3B0aW9uc1wiLCByZWY6IGRpdkVsZW1lbnQsIGNsYXNzTmFtZTogJyBmbGV4LTEnIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkNvbmZpZ1Byb3ZpZGVyLCB7IHRoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbGdvcml0aG06IHRoZW1lLmRlZmF1bHRBbGdvcml0aG0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yUHJpbWFyeTogJyNGMDhBMjQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yTGluazogXCIjRjA4QTI0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JMaW5rSG92ZXI6IFwiI2ZmYzQ3OFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yTGlua0FjdGl2ZTogXCIjYzk2OTE0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlRhYnMsIHsgY2xhc3NOYW1lOiAndy1mdWxsIGgtZnVsbCBncm93JywgdGFiUG9zaXRpb246ICdsZWZ0JywgaXRlbXM6IHRhYkl0ZW1zLm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gU3RyaW5nKGkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogaXRlbS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogaXRlbS5jb250ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSB9KSkpKSkpO1xufTtcbmV4cG9ydHMuT3B0aW9ucyA9IE9wdGlvbnM7XG5yZWFjdF9kb21fMS5kZWZhdWx0LnJlbmRlcihyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuU3RyaWN0TW9kZSwgbnVsbCxcbiAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChjc3NpbmpzXzEuU3R5bGVQcm92aWRlciwgbnVsbCxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoZXhwb3J0cy5PcHRpb25zLCBudWxsKSkpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgbW9kZWxzXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzXCIpO1xuY29uc3QgdXNlX2RlYm91bmNlXzEgPSByZXF1aXJlKFwidXNlLWRlYm91bmNlXCIpO1xuY29uc3QgQUkgPSAoeyBzZXR0aW5ncywgc2F2ZU9wdGlvbnMgfSkgPT4ge1xuICAgIGNvbnN0IFtmb3JtXSA9IGFudGRfMS5Gb3JtLnVzZUZvcm0oKTtcbiAgICBjb25zdCB7IE9wdGlvbiB9ID0gYW50ZF8xLlNlbGVjdDtcbiAgICBjb25zdCBbcmFkaW9WYWx1ZSwgc2V0UmFkaW9WYWx1ZV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoXCJteU93bk9wZW5BaUtleVwiKTtcbiAgICBjb25zdCBvblJhZGlvQ2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgc2V0UmFkaW9WYWx1ZShlLnRhcmdldC52YWx1ZSk7XG4gICAgfTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgaWYgKHNldHRpbmdzKSB7XG4gICAgICAgICAgICBzZXRSYWRpb1ZhbHVlKHNldHRpbmdzLmFwaUtleVNlbGVjdGlvbik7XG4gICAgICAgICAgICBmb3JtLnNldEZpZWxkc1ZhbHVlKHtcbiAgICAgICAgICAgICAgICBhcGlLZXlTZWxlY3Rpb246IHNldHRpbmdzLmFwaUtleVNlbGVjdGlvbixcbiAgICAgICAgICAgICAgICBvcGVuQXBpS2V5OiBzZXR0aW5ncy5vcGVuQXBpS2V5LFxuICAgICAgICAgICAgICAgIG9wZW5BcGlFbmRwb2ludDogc2V0dGluZ3Mub3BlbkFwaUVuZHBvaW50LFxuICAgICAgICAgICAgICAgIG9wZW5BcGlNb2RlbDogc2V0dGluZ3Mub3BlbkFwaU1vZGVsLFxuICAgICAgICAgICAgICAgIGxpY2Vuc2VLZXk6IHNldHRpbmdzLmxpY2Vuc2VLZXksXG4gICAgICAgICAgICAgICAgY2hhdEdQVFdlYjogc2V0dGluZ3MuY2hhdEdQVFdlYixcbiAgICAgICAgICAgICAgICBtb2RlbDogc2V0dGluZ3MubW9kZWwsXG4gICAgICAgICAgICAgICAgZnJlZU1vZGVsOiBzZXR0aW5ncy5mcmVlTW9kZWwsXG4gICAgICAgICAgICAgICAgbmV3TGljZW5zZUtleTogc2V0dGluZ3MubmV3TGljZW5zZUtleSxcbiAgICAgICAgICAgICAgICBvbGxhbWFBcGlFbmRwb2ludDogc2V0dGluZ3Mub2xsYW1hQXBpRW5kcG9pbnQsXG4gICAgICAgICAgICAgICAgb2xsYW1hTW9kZWw6IHNldHRpbmdzLm9sbGFtYU1vZGVsLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCBbc2V0dGluZ3NdKTtcbiAgICBjb25zdCBoYW5kbGVGb3JtQ2hhbmdlID0gKDAsIHVzZV9kZWJvdW5jZV8xLnVzZURlYm91bmNlZENhbGxiYWNrKSgodGVybSkgPT4ge1xuICAgICAgICBzYXZlT3B0aW9ucyh0ZXJtKTtcbiAgICB9LCAzMDApO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0sIHsgb25WYWx1ZXNDaGFuZ2U6IGhhbmRsZUZvcm1DaGFuZ2UsIGZvcm06IGZvcm0sIFxuICAgICAgICAvLyBsYWJlbENvbD17eyBzcGFuOiA0IH19XG4gICAgICAgIGxheW91dDogXCJob3Jpem9udGFsXCIgfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIsIG51bGwsXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwiYXBpS2V5U2VsZWN0aW9uXCIsIGxhYmVsOiBcIlxcdUQ4M0RcXHVERDBCSW4gdXNlXCIgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuUmFkaW8uR3JvdXAsIHsgb25DaGFuZ2U6IG9uUmFkaW9DaGFuZ2UsIHZhbHVlOiByYWRpb1ZhbHVlLCBzaXplOiBcInNtYWxsXCIsIHN0eWxlOiB7IG1hcmdpbkJvdHRvbTogMCwgZGlzcGxheTogXCJmbGV4XCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuUmFkaW8uQnV0dG9uLCB7IHZhbHVlOiBcInNjb3V0ZXJGcmVlQUlcIiwgc3R5bGU6IHsgZmxleDogXCIxXCIsIHRleHRBbGlnbjogXCJjZW50ZXJcIiB9IH0sIFwiU2NvdXRlclwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlJhZGlvLkJ1dHRvbiwgeyB2YWx1ZTogXCJteU93bk9wZW5BaUtleVwiLCBzdHlsZTogeyBmbGV4OiBcIjFcIiwgdGV4dEFsaWduOiBcImNlbnRlclwiIH0gfSwgXCJDdXN0b21pemVcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5SYWRpby5CdXR0b24sIHsgdmFsdWU6IFwib2xsYW1hXCIsIHN0eWxlOiB7IGZsZXg6IFwiMVwiLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfSB9LCBcIk9sbGFtYVwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlJhZGlvLkJ1dHRvbiwgeyB2YWx1ZTogXCJsaWNlbnNlS2V5XCIsIHN0eWxlOiB7IGZsZXg6IFwiMVwiLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfSB9LCBcIk9wZW5Sb3V0ZXJcIikpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgXG4gICAgICAgICAgICAgICAgLy8gY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIlxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHJhZGlvVmFsdWUgPT09IFwic2NvdXRlckZyZWVBSVwiID8gXCJibG9ja1wiIDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgbmFtZTogXCJmcmVlTW9kZWxcIiwgbGFiZWw6IFwiXFx1RDgzRVxcdUREMTYgTW9kZWxcIiwgaW5pdGlhbFZhbHVlOiBtb2RlbHNfMS5mcmVlTW9kZWxzWzBdW1wibmFtZVwiXSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuU2VsZWN0LCB7IHBsYWNlaG9sZGVyOiBcIlwiIH0sIG1vZGVsc18xLmZyZWVNb2RlbHMubWFwKChpdGVtKSA9PiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoT3B0aW9uLCB7IGtleTogaXRlbS5pZCwgdmFsdWU6IGl0ZW0uaWQgfSwgaXRlbS5uYW1lKSkpKSkpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiByYWRpb1ZhbHVlID09PSBcIm15T3duT3BlbkFpS2V5XCIgPyBcImJsb2NrXCIgOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBuYW1lOiBcIm9wZW5BcGlFbmRwb2ludFwiLCBsYWJlbDogXCJcXHVEODNEXFx1REQxN0FQSSBFbmRwb2ludFwiLCBleHRyYTogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjNjY2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIklmIHlvdSBhcmUgdXNpbmcgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN0cm9uZ1wiLCBudWxsLCBcIkF6dXJlXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIgb3IgYSB0aGlyZC1wYXJ0eSBlbmRwb2ludCwgcGxlYXNlIGZpbGwgaW4gdGhlIGVuZHBvaW50IGFkZHJlc3MuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IHRhcmdldDogXCJfX2JsYW5rXCIsIGhyZWY6IFwiaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9TZXQtdXAteW91ci1BUEktS2V5LTk2MjY2ZDUyMzZmYTQ2MmNhNzA3NjgzZDliYjI3NWM2P3B2cz00XCIgfSwgXCJMZWFybiBNb3JlXFx1MjE5N1xcdUZFMEZcIikpIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbnB1dCwgeyBwbGFjZWhvbGRlcjogXCJodHRwczovL2FwaS5vcGVuYWkuY29tXCIsIHR5cGU6IFwidXJsXCIgfSkpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgbmFtZTogXCJvcGVuQXBpS2V5XCIsIGxhYmVsOiBcIlxcdUQ4M0RcXHVERDExIFlvdXIgT3BlbiBBUEkgS2V5XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLklucHV0LCB7IHBsYWNlaG9sZGVyOiBcIldlIHdpbGwgbm90IHVzZSB5b3VyIEtleSBmb3IgYW55IG90aGVyIHB1cnBvc2VzLlwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSkpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgbmFtZTogXCJvcGVuQXBpTW9kZWxcIiwgbGFiZWw6IFwiXFx1RDgzRVxcdUREMTYgTW9kZWxcIiB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuSW5wdXQsIHsgcGxhY2Vob2xkZXI6IFwiV2Ugd2lsbCBub3QgdXNlIHlvdXIgS2V5IGZvciBhbnkgb3RoZXIgcHVycG9zZXMuXCIsIHR5cGU6IFwidGV4dFwiIH0pKSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHJhZGlvVmFsdWUgPT09IFwib2xsYW1hXCIgPyBcImJsb2NrXCIgOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBuYW1lOiBcIm9sbGFtYUFwaUVuZHBvaW50XCIsIGxhYmVsOiBcIlxcdUQ4M0RcXHVERDE3QVBJIEVuZHBvaW50XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLklucHV0LCB7IHBsYWNlaG9sZGVyOiBcImh0dHA6Ly9sb2NhbGhvc3Q6MTE0MzRcIiwgdHlwZTogXCJ1cmxcIiB9KSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBuYW1lOiBcIm9sbGFtYU1vZGVsXCIsIGxhYmVsOiBcIlxcdUQ4M0VcXHVERDE2TW9kZWxcIiwgZXh0cmE6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicFwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiIzY2NlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyB0YXJnZXQ6IFwiX19ibGFua1wiLCBocmVmOiBcImh0dHBzOi8vamlhbmd6aWxvbmcubm90aW9uLnNpdGUvSG93LXRvLXVzZS1PbGxhbWEtZjhmZjBkNzExOTg5NDViODgzZTcxZTA4ZjA5Y2M5ZjU/cHZzPTRcIiB9LCBcIkxlYXJuIE1vcmVcXHUyMTk3XFx1RkUwRlwiKSkgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLklucHV0LCB7IHBsYWNlaG9sZGVyOiBcImxsYW1hMlwiLCB0eXBlOiBcInRleHRcIiB9KSkpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiByYWRpb1ZhbHVlID09PSBcImxpY2Vuc2VLZXlcIiA/IFwiYmxvY2tcIiA6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwibGljZW5zZUtleVwiLCBsYWJlbDogXCJcXHVEODNEXFx1REQxMUtleVwiLCBzdHlsZTogeyBtYXJnaW5Cb3R0b206IFwiMTZweFwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLklucHV0LCB7IHBsYWNlaG9sZGVyOiBcIldlIHdpbGwgbm90IHVzZSB5b3VyIEtleSBmb3IgYW55IG90aGVyIHB1cnBvc2VzLlwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSkpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgbmFtZTogXCJtb2RlbFwiLCBsYWJlbDogXCJcXHVEODNFXFx1REQxNk1vZGVsXCIsIGluaXRpYWxWYWx1ZTogbW9kZWxzXzEubW9kZWxzWzBdW1wibmFtZVwiXSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuU2VsZWN0LCB7IHBsYWNlaG9sZGVyOiBcIlwiIH0sIG1vZGVsc18xLm1vZGVscy5tYXAoKGl0ZW0pID0+IChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChPcHRpb24sIHsga2V5OiBpdGVtLmlkLCB2YWx1ZTogaXRlbS5pZCB9LCBpdGVtLm5hbWUpKSkpKSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCIgdGV4dC1jZW50ZXJcIiwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogcmFkaW9WYWx1ZSA9PT0gXCJjaGF0R1BUV2ViXCIgPyBcImJsb2NrXCIgOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiI0YwOEEyNFwiLFxuICAgICAgICAgICAgICAgIH0gfSwgXCJcXHUyNkEwXFx1RkUwRlNvcnJ5LCB0aGlzIGZlYXR1cmUgaXMgdGVtcG9yYXJpbHkgdW5hdmFpbGFibGUuXCIpKSkpO1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IEFJO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXRpbFwiKTtcbmNvbnN0IHVzZV9kZWJvdW5jZV8xID0gcmVxdWlyZShcInVzZS1kZWJvdW5jZVwiKTtcbmNvbnN0IGljb25zXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7XG5jb25zdCB7IFRleHRBcmVhIH0gPSBhbnRkXzEuSW5wdXQ7XG5jb25zdCBBbmtpID0gKHsgc2V0dGluZ3MsIHNhdmVPcHRpb25zIH0pID0+IHtcbiAgICBjb25zdCBbYW5raUNsaWVudElzb3Blbiwgc2V0QW5raUNsaWVudElzb3Blbl0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkodHJ1ZSk7XG4gICAgY29uc3QgW2Fua2lEZWNrTmFtZXMsIHNldEFua2lEZWNrTmFtZXNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKFwibG9hZGluZ1wiKTtcbiAgICBjb25zdCBbYW5raU1vZGVsTmFtZXMsIHNldEFua2lNb2RlbE5hbWVzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShcImxvYWRpbmdcIik7XG4gICAgY29uc3QgW2Fua2lNb2RlbEZpZWxkTmFtZXMsIHNldEFua2lNb2RlbEZpZWxkTmFtZXNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKFtdKTtcbiAgICBjb25zdCBbZmllbGRzU3RhdHVzLCBzZXRGaWVsZHNTdGF0dXNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHVuZGVmaW5lZCk7XG4gICAgY29uc3QgW2lzU2NvdXRlck5vdGUsIHNldElzU2NvdXRlck5vdGVdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHt9KTtcbiAgICBjb25zdCBbZm9ybV0gPSBhbnRkXzEuRm9ybS51c2VGb3JtKCk7XG4gICAgLy8gY29uc3QgW2Zvcm1Gb3JGaWVsZF0gPSBGb3JtLnVzZUZvcm0oKTtcbiAgICBjb25zdCB7IE9wdGlvbiB9ID0gYW50ZF8xLlNlbGVjdDtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgKCgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgLy8g5pu05pawIOm7mOiupOWAvFxuICAgICAgICAgICAgICAgIC8vIGZvcm0uc2V0RmllbGRzVmFsdWUoe1xuICAgICAgICAgICAgICAgIC8vICAgYW5raURlY2tOYW1lOiBzZXR0aW5ncy5hbmtpRGVja05hbWUsXG4gICAgICAgICAgICAgICAgLy8gICBhbmtpTm90ZU5hbWU6IHNldHRpbmdzLmFua2lOb3RlTmFtZSxcbiAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgbGV0IGFua2lTZXR0aW5ncyA9IHNldHRpbmdzLmFua2lTZXR0aW5ncztcbiAgICAgICAgICAgICAgICAvLyDorr7nva7pu5jorqTlgLxcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiuvue9rum7mOiupOWAvCBhbmtpU2V0dGluZ3M6XCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFua2lTZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgZm9ybS5zZXRGaWVsZHNWYWx1ZSh7XG4gICAgICAgICAgICAgICAgICAgIGFua2lTZXR0aW5nczogYW5raVNldHRpbmdzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIGZvcm1Gb3JGaWVsZC5zZXRGaWVsZHNWYWx1ZSh7XG4gICAgICAgICAgICAgICAgLy8gICAgIGFua2lOb3RlTmFtZTogc2V0dGluZ3MuYW5raU5vdGVOYW1lXG4gICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgY2hlY2tTY291dGVyTm90ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSkoKTtcbiAgICAgICAgLy8gc2V0SXNTY291dGVyTm90ZShzZXR0aW5ncz8uYW5raU5vdGVOYW1lLmluZGV4T2YoXCJTY291dGVyXCIpID4gLTEpO1xuICAgIH0sIFtzZXR0aW5nc10pO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAoKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vIOiOt+WPliBOb3RlIOWvueW6lOeahCBmaWVsZHNcbiAgICAgICAgICAgICAgICBoYW5kbGVNb2RlbEZpZWxkTmFtZXMoc2V0dGluZ3MgPT09IG51bGwgfHwgc2V0dGluZ3MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNldHRpbmdzLmFua2lOb3RlTmFtZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgW2RlY2tOYW1lc1Jlc3VsdCwgbW9kZWxOYW1lc1Jlc3VsdF0gPSB5aWVsZCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgICgwLCB1dGlsXzEuYW5raUFjdGlvbikoXCJkZWNrTmFtZXNcIiwgNiksXG4gICAgICAgICAgICAgICAgICAgICgwLCB1dGlsXzEuYW5raUFjdGlvbikoXCJtb2RlbE5hbWVzXCIsIDYpLFxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIC8vIOWkhOeQhiBkZWNrTmFtZXMg57uT5p6cXG4gICAgICAgICAgICAgICAgaWYgKGRlY2tOYW1lc1Jlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWNrTmFtZXMgPSBkZWNrTmFtZXNSZXN1bHQucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBzZXRBbmtpRGVja05hbWVzKGRlY2tOYW1lcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIOWkhOeQhiBtb2RlbE5hbWVzIOe7k+aenFxuICAgICAgICAgICAgICAgIGlmIChtb2RlbE5hbWVzUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsTmFtZXMgPSBtb2RlbE5hbWVzUmVzdWx0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgc2V0QW5raU1vZGVsTmFtZXMobW9kZWxOYW1lcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgc2V0QW5raUNsaWVudElzb3BlbihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKSgpO1xuICAgIH0sIFthbmtpQ2xpZW50SXNvcGVuXSk7XG4gICAgLy8gTm90ZSwgRmllbGRzIOihqOWNleS/ruaUueaXtlxuICAgIGNvbnN0IGhhbmRsZUZpZWxkc0Zvcm1DaGFuZ2UgPSAoMCwgdXNlX2RlYm91bmNlXzEudXNlRGVib3VuY2VkQ2FsbGJhY2spKChjaGFuZ2VkRmllbGRzLCBhbGxGaWVsZHMpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uRmllbGRzQ2hhbmdlPT09XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhjaGFuZ2VkRmllbGRzKTtcbiAgICAgICAgLy8g5aaC5p6c5pu05pS555qE5pivIGFua2lOb3RlTmFtZe+8jOWImemcgOimgeabtOaWsCBGaWxlZHMg6KGo5Y2VXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoYW5nZWRGaWVsZHNbMF0ubmFtZSkgJiZcbiAgICAgICAgICAgIGNoYW5nZWRGaWVsZHNbMF0ubmFtZS5pbmNsdWRlcyhcImFua2lOb3RlTmFtZVwiKSkge1xuICAgICAgICAgICAgLy8g6K6+572u5Yqg6L2954q25oCBXG4gICAgICAgICAgICBzZXRGaWVsZHNTdGF0dXMoe1xuICAgICAgICAgICAgICAgIHN0YXR1czogXCJsb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgbXNnOiBcIlwiLFxuICAgICAgICAgICAgICAgIGluZGV4OiBjaGFuZ2VkRmllbGRzWzBdW1wibmFtZVwiXVsxXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8g6I635Y+WIG5vdGUg5a+55bqU55qEIGZpbGVkcyDkv6Hmga9cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHlpZWxkIGhhbmRsZU1vZGVsRmllbGROYW1lcyhjaGFuZ2VkRmllbGRzWzBdLnZhbHVlKTtcbiAgICAgICAgICAgIGlmICghcmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kZWxGaWVsZE5hbWVzID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgbGV0IGZpbGVkc05hbWVQYXRoID0gY2hhbmdlZEZpZWxkc1swXS5uYW1lO1xuICAgICAgICAgICAgICAgIGZpbGVkc05hbWVQYXRoW2ZpbGVkc05hbWVQYXRoLmxlbmd0aCAtIDFdID0gXCJhbmtpRmllbGRzXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZWRzVmFsdWUgPSBtb2RlbEZpZWxkTmFtZXMubWFwKChuYW1lKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICBbbmFtZV06IFwiXCIsXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1vZGVsRmllbGROYW1lcyk7XG4gICAgICAgICAgICAgICAgZm9ybS5zZXRGaWVsZFZhbHVlKGZpbGVkc05hbWVQYXRoLCBmaWxlZHNWYWx1ZSk7XG4gICAgICAgICAgICAgICAgc2V0RmllbGRzU3RhdHVzKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcInJlYWR5XCIsXG4gICAgICAgICAgICAgICAgICAgIG1zZzogXCJcIixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pLCAzMDApO1xuICAgIC8vIOihqOWNleS/ruaUueaXtlxuICAgIGNvbnN0IGhhbmRsZUZvcm1DaGFuZ2UgPSAoMCwgdXNlX2RlYm91bmNlXzEudXNlRGVib3VuY2VkQ2FsbGJhY2spKCh0ZXJtKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGFuZGxlRm9ybUNoYW5nZT09PT09PT09OlwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZm9ybS5nZXRGaWVsZHNWYWx1ZSgpKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coc2V0dGluZ3MpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZXJtKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGVybVtcImFua2lTZXR0aW5nc1wiXVswXSk7XG4gICAgICAgIGxldCB2YWx1ZXMgPSBmb3JtLmdldEZpZWxkc1ZhbHVlKCk7XG4gICAgICAgIC8vIHZhbHVlcyA9IHZhbHVlcy5hbmtpU2V0dGluZ3MuZmlsdGVyKChpdGVtOiBBbmtpU2V0dGluZ1R5cGUpID0+IHtcbiAgICAgICAgLy8gICByZXR1cm4gaXRlbSAmJiBpdGVtLmFua2lOb3RlTmFtZTtcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmFsdWVzOlwiKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codmFsdWVzKTtcbiAgICAgICAgc2F2ZU9wdGlvbnModmFsdWVzKTtcbiAgICAgICAgY2hlY2tTY291dGVyTm90ZSgpO1xuICAgIH0sIDMwMCk7XG4gICAgLy8gU2NvdXRlciDpu5jorqQgbm90ZSDkuI3mlK/mjIHnvJbovpFcbiAgICBjb25zdCBjaGVja1Njb3V0ZXJOb3RlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtVmFsdWVzID0gZm9ybS5nZXRGaWVsZHNWYWx1ZSgpLmFua2lTZXR0aW5ncztcbiAgICAgICAgY29uc3QgbmV3SXNTY291dGVyTm90ZSA9IHt9O1xuICAgICAgICBmb3JtVmFsdWVzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtKTtcbiAgICAgICAgICAgIGlmIChpdGVtLmFua2lOb3RlTmFtZSkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmFua2lOb3RlTmFtZS5pbmRleE9mKFwiU2NvdXRlclwiKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOaYr+m7mOiupOeahCBOb3RlIOWImeS4jeaUr+aMgeS/ruaUuSBmaWxlZHNcbiAgICAgICAgICAgICAgICAgICAgbmV3SXNTY291dGVyTm90ZVtpbmRleF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIChpdGVtICYmIGl0ZW0uaW5wdXQxID09PSBcInNwZWNpYWxcIikge1xuICAgICAgICAgICAgLy8gICBuZXdJc1Njb3V0ZXJOb3RlW2luZGV4XSA9IHRydWU7XG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICBuZXdJc1Njb3V0ZXJOb3RlW2luZGV4XSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9KTtcbiAgICAgICAgc2V0SXNTY291dGVyTm90ZShuZXdJc1Njb3V0ZXJOb3RlKTtcbiAgICB9O1xuICAgIC8vIOiOt+WPliBOb3RlIOWvueW6lOeahCBmaWVsZHNcbiAgICBjb25zdCBoYW5kbGVNb2RlbEZpZWxkTmFtZXMgPSAobm90ZU5hbWUpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImhhbmRsZU1vZGVsRmllbGROYW1lc1wiKTtcbiAgICAgICAgaWYgKG5vdGVOYW1lKSB7XG4gICAgICAgICAgICAvLyDpgJrov4cgbm90ZU5hbWUg6I635Y+W5a+55bqU55qEIGZpbGVkcyDkv6Hmga9cbiAgICAgICAgICAgIGNvbnN0IG1vZGVsRmllbGROYW1lc1Jlc3VsdCA9IHlpZWxkICgwLCB1dGlsXzEuYW5raUFjdGlvbikoXCJtb2RlbEZpZWxkTmFtZXNcIiwgNiwge1xuICAgICAgICAgICAgICAgIG1vZGVsTmFtZTogbm90ZU5hbWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChtb2RlbEZpZWxkTmFtZXNSZXN1bHQucmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kZWxGaWVsZE5hbWVzID0gbW9kZWxGaWVsZE5hbWVzUmVzdWx0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICBzZXRBbmtpTW9kZWxGaWVsZE5hbWVzKG1vZGVsRmllbGROYW1lcyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtb2RlbEZpZWxkTmFtZXNSZXN1bHQ6XCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1vZGVsRmllbGROYW1lc1Jlc3VsdCk7XG4gICAgICAgICAgICAgICAgaGFuZGxlRm9ybUNoYW5nZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBmYWxzZSwgZGF0YTogbW9kZWxGaWVsZE5hbWVzUmVzdWx0LnJlc3VsdCB9O1xuICAgICAgICAgICAgICAgIC8vIOa4suafkyBmaWVsZHMg6KGo5Y2V55qE6buY6K6k5YC8XG4gICAgICAgICAgICAgICAgLy8gY29uc3QgZmllbGRzUmVjb3JkID0gc2V0dGluZ3M/LmFua2lGaWVsZHM7XG4gICAgICAgICAgICAgICAgLy8gaWYgKGZpZWxkc1JlY29yZCkge1xuICAgICAgICAgICAgICAgIC8vICAgLy8g5om+5YiwIGFua2lOb3RlTmFtZSDlr7nlupTnmoQgZmllbGRzXG4gICAgICAgICAgICAgICAgLy8gICBjb25zdCB0YXJnZXRSZWNvcmQgPSBmaWVsZHNSZWNvcmQuZmluZChcbiAgICAgICAgICAgICAgICAvLyAgICAgKGl0ZW06IGFueSkgPT4gaXRlbS5ub3RlID09PSBub3RlTmFtZVxuICAgICAgICAgICAgICAgIC8vICAgKTtcbiAgICAgICAgICAgICAgICAvLyAgIGNvbnN0IHRmID0gT2JqZWN0LmtleXModGFyZ2V0UmVjb3JkLmZpZWxkcykucmVkdWNlPHtcbiAgICAgICAgICAgICAgICAvLyAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xuICAgICAgICAgICAgICAgIC8vICAgfT4oKG9iaiwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCB2ID0gdGFyZ2V0UmVjb3JkLmZpZWxkc1tpdGVtXTtcbiAgICAgICAgICAgICAgICAvLyAgICAgb2JqW2l0ZW1dID0gdiA/IHYucmVwbGFjZSgvPGJyPi9nLCBcIlxcblwiKSA6IHY7XG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgLy8gICB9LCB7fSk7XG4gICAgICAgICAgICAgICAgLy8gICBpZiAodGYpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgZm9ybS5zZXRGaWVsZHNWYWx1ZSh0Zik7XG4gICAgICAgICAgICAgICAgLy8gICB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQobW9kZWxGaWVsZE5hbWVzUmVzdWx0LmVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBlcnJvcjogdHJ1ZSwgbXNnOiBtb2RlbEZpZWxkTmFtZXNSZXN1bHQuZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBlcnJvcjogZmFsc2UsIGRhdGE6IFtdIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICFhbmtpQ2xpZW50SXNvcGVuICYmIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgY29sb3I6IFwiI2Y1MFwiLFxuICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWQgI2Y1MFwiLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjRweFwiLFxuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgXCJBbmtpIGNsaWVudCBhbmQgcmVsYXRlZCBzZXR0aW5ncyBub3QgZm91bmQuIFBsZWFzZVwiLFxuICAgICAgICAgICAgXCIgXCIsXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBzdHlsZTogeyB0ZXh0RGVjb3JhdGlvbkxpbmU6IFwidW5kZXJsaW5lXCIgfSwgdGFyZ2V0OiBcIl9fYmxhbmtcIiwgaHJlZjogXCJodHRwczovL2ppYW5nemlsb25nLm5vdGlvbi5zaXRlL1VzZS10aGUtQWRkLXRvLUFua2ktZmVhdHVyZS03YWI5NWZmOGFhNWU0MTljOTc4ZThhMmEwYTQ1MTMyNFwiIH0sIFwiY29uZmlndXJlXFx1MjE5N1xcdUZFMEZcIiksXG4gICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgIFwiYW5kIHRyeSBhZ2FpblwiKSksXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtXG4gICAgICAgIC8vIG9uRmluaXNoPXt9XG4gICAgICAgICwgeyBcbiAgICAgICAgICAgIC8vIG9uRmluaXNoPXt9XG4gICAgICAgICAgICBvblZhbHVlc0NoYW5nZTogaGFuZGxlRm9ybUNoYW5nZSwgb25GaWVsZHNDaGFuZ2U6IGhhbmRsZUZpZWxkc0Zvcm1DaGFuZ2UsIGZvcm06IGZvcm0sIGxhYmVsQ29sOiB7IHNwYW46IDQgfSwgbGF5b3V0OiBcImhvcml6b250YWxcIiwgaW5pdGlhbFZhbHVlczogeyBpdGVtczogW3t9XSB9IH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5MaXN0LCB7IG5hbWU6IFwiYW5raVNldHRpbmdzXCIgfSwgKGZpZWxkcywgeyBhZGQsIHJlbW92ZSwgbW92ZSB9KSA9PiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBmbGV4LWNvbCBnYXAtNFwiIH0sXG4gICAgICAgICAgICAgICAgZmllbGRzLm1hcCgoX2EsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB7IGtleSwgbmFtZSB9ID0gX2EsIHJlc3RGaWVsZCA9IF9fcmVzdChfYSwgW1wia2V5XCIsIFwibmFtZVwiXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkNhcmQsIHsga2V5OiBrZXkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID09IDAgJiYgKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5UYWcsIHsgY2xhc3NOYW1lOiBcIiBtYi02XCIsIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuU3Rhck91dGxpbmVkLCBudWxsKSwgY29sb3I6IFwib3JhbmdlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBcIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgT2JqZWN0LmFzc2lnbih7fSwgcmVzdEZpZWxkLCB7IG5hbWU6IFtuYW1lLCBcImFua2lEZWNrTmFtZVwiXSwgbGFiZWw6IFwiRGVjayBOYW1lXCIsIGluaXRpYWxWYWx1ZTogdW5kZWZpbmVkIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5TZWxlY3QsIHsgcGxhY2Vob2xkZXI6IFwiQW5raSBEZWNrIE5hbWVcIiwgZGlzYWJsZWQ6ICFhbmtpQ2xpZW50SXNvcGVuLCBsb2FkaW5nOiBhbmtpRGVja05hbWVzID09PSBcImxvYWRpbmdcIiB9LCBhbmtpRGVja05hbWVzICE9PSBcImxvYWRpbmdcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmtpRGVja05hbWVzLm1hcCgoaXRlbSkgPT4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE9wdGlvbiwgeyBrZXk6IGl0ZW0sIHZhbHVlOiBpdGVtIH0sIGl0ZW0pKSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIE9iamVjdC5hc3NpZ24oe30sIHJlc3RGaWVsZCwgeyBuYW1lOiBbbmFtZSwgXCJhbmtpTm90ZU5hbWVcIl0sIGxhYmVsOiBcIk5vdGUgTmFtZVwiLCBpbml0aWFsVmFsdWU6IHVuZGVmaW5lZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuU2VsZWN0LCB7IHBsYWNlaG9sZGVyOiBcIkFua2kgTm90ZSBOYW1lXCIsIGRpc2FibGVkOiAhYW5raUNsaWVudElzb3BlbiwgbG9hZGluZzogYW5raU1vZGVsTmFtZXMgPT09IFwibG9hZGluZ1wiIH0sIGFua2lNb2RlbE5hbWVzICE9PSBcImxvYWRpbmdcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmtpTW9kZWxOYW1lcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoT3B0aW9uLCB7IGtleTogaXRlbSwgdmFsdWU6IGl0ZW0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAoZmllbGRzU3RhdHVzID09PSBudWxsIHx8IGZpZWxkc1N0YXR1cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZmllbGRzU3RhdHVzLnN0YXR1cykgPT09IFwibG9hZGluZ1wiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZpZWxkc1N0YXR1cyA9PT0gbnVsbCB8fCBmaWVsZHNTdGF0dXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZpZWxkc1N0YXR1cy5pbmRleCkgPT09IGluZGV4ID8gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Ta2VsZXRvbiwgeyBhY3RpdmU6IHRydWUgfSkpIDogKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkxpc3QsIHsgbmFtZTogW25hbWUsIFwiYW5raUZpZWxkc1wiXSB9LCAoc3ViRmllbGRzLCBzdWJPcHQpID0+IChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsIHN1YkZpZWxkcy5tYXAoKHN1YkZpZWxkLCBzdWJJbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IE9iamVjdC5rZXlzKGZvcm0uZ2V0RmllbGRWYWx1ZShbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYW5raVNldHRpbmdzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYW5raUZpZWxkc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSB8fCB7fSlbMF0gfHwgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsga2V5OiBzdWJGaWVsZC5rZXksIG5hbWU6IFtzdWJGaWVsZC5uYW1lLCBmaWVsZE5hbWVdLCBsYWJlbDogZmllbGROYW1lIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7IGRpc2FibGVkOiBpc1Njb3V0ZXJOb3RlW2luZGV4XSwgYXV0b1NpemU6IHsgbWluUm93czogMiwgbWF4Um93czogNCB9LCBwbGFjZWhvbGRlcjogaXNTY291dGVyTm90ZVtpbmRleF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiVGhlIGRlZmF1bHQgbm90ZSBpcyBub3QgZWRpdGFibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJ7e1NlbGVjdGlvbn19LCB7e0ltYWdlfX0uLi5cIiB9KSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkpKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiIGZsZXggZmxleC1yb3cgZ2FwLTMganVzdGlmeS1lbmRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkcy5sZW5ndGggPiAxICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8Rm9ybS5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Ub29sdGlwLCB7IHRpdGxlOiBcIkRlbGV0ZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIsIG9uQ2xpY2s6ICgpID0+IHJlbW92ZShuYW1lKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBibG9ja1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5EZWxldGVPdXRsaW5lZCwgbnVsbCkgfSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC9Gb3JtLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCAhPT0gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPEZvcm0uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuVG9vbHRpcCwgeyB0aXRsZTogXCJTZXQgYXMgRGVmYXVsdFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIsIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlKGluZGV4LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuU3Rhck91dGxpbmVkLCBudWxsKSB9KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8L0Zvcm0uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKSkpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIsIHR5cGU6IFwiZGFzaGVkXCIsIG9uQ2xpY2s6ICgpID0+IGFkZCgpLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLlBsdXNPdXRsaW5lZCwgbnVsbCksIGJsb2NrOiB0cnVlIH0sIFwiQWRkXCIpKSkpKSksXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIiBmbGV4XCIgfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsgY2xhc3NOYW1lOiBcInctYXV0byBoLWF1dG8gbWF4LXcteGwgcC00IG9iamVjdC1jb250YWluXCIsIHNyYzogXCJpbWFnZXMvZGlhZ3JhbS5wbmdcIiB9KSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIiBtdC0xMVwiIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIHsgY2xhc3NOYW1lOiBcIiBtYi0zXCIgfSwgXCJZb3UgY2FuIGN1c3RvbWl6ZSB0aGUgY29udGVudCBvZiBlYWNoIGZpZWxkIHdoZW4gYWRkaW5nIHRvIEFua2kuIFlvdSBjYW4gaW5wdXQgYW55IHN0cmluZywgaW5jbHVkaW5nIHRoZSBmb2xsb3dpbmcgZHluYW1pYyB2YXJpYWJsZXM6XCIpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIiBsaXN0LWRpc2MgZmxleCBmbGV4LWNvbCBnYXAtMVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwiIGZvbnQtc2VtaWJvbGRcIiB9LCBcInt7U2VsZWN0aW9ufX1cIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCBcIlNlbGVjdGVkIHRleHRcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwiIGZvbnQtc2VtaWJvbGRcIiB9LCBcInt7U2VudGVuY2V9fVwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIFwiU2VudGVuY2UgY29udGFpbmluZyB0aGUgc2VsZWN0ZWQgdGV4dFwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCB7IGNsYXNzTmFtZTogXCIgZm9udC1zZW1pYm9sZFwiIH0sIFwie3tBdWRpb319XCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCwgXCJQcm9udW5jaWF0aW9uIG9mIHRoZSBzZWxlY3RlZCBjb250ZW50XCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImgzXCIsIHsgY2xhc3NOYW1lOiBcIiBmb250LXNlbWlib2xkXCIgfSwgXCJ7e0ltYWdlfX1cIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCBcIlBpY3R1cmVcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwiIGZvbnQtc2VtaWJvbGRcIiB9LCBcInt7RGVmaW5pdGlvbn19XCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCwgXCJEZWZpbml0aW9uIG9mIHRoZSBjb250ZW50XCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImgzXCIsIHsgY2xhc3NOYW1lOiBcIiBmb250LXNlbWlib2xkXCIgfSwgXCJ7e1NvdXJjZX19XCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCwgXCJMaW5rIHRvIHRoZSBjdXJyZW50IHdlYnNpdGVcIikpKSkpKTtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBBbmtpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgaWNvbnNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9pY29uc1wiKTtcbmNvbnN0IFByb1RhZ18xID0gcmVxdWlyZShcIi4uLy4uL0NvbXBvbmVudHMvUHJvVGFnXCIpO1xuY29uc3QgdXNlckluZm9fMSA9IHJlcXVpcmUoXCIuLi8uLi9saWIvdXNlckluZm9cIik7XG5jb25zdCB1c2VfZGVib3VuY2VfMSA9IHJlcXVpcmUoXCJ1c2UtZGVib3VuY2VcIik7XG5jb25zdCBjYW52YXNfY29uZmV0dGlfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiY2FudmFzLWNvbmZldHRpXCIpKTtcbmNvbnN0IFBybyA9ICh7IHNldHRpbmdzLCBzYXZlT3B0aW9ucyB9KSA9PiB7XG4gICAgLy8gY29uc3QgW3ZlcmlmaWVkLCBzZXRWZXJpZmllZF0gPSB1c2VTdGF0ZTxib29sZWFuIHwgbnVsbD4oZmFsc2UpO1xuICAgIGNvbnN0IFtmb3JtXSA9IGFudGRfMS5Gb3JtLnVzZUZvcm0oKTtcbiAgICBjb25zdCB1c2VySW5mbyA9ICgwLCB1c2VySW5mb18xLnVzZVVzZXJJbmZvQ29udGV4dCkoKTtcbiAgICBjb25zdCBbaXNNb2RhbE9wZW4sIHNldElzTW9kYWxPcGVuXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIC8vIHRoaXNHZXRVc2VyU3RhdHVzKClcbiAgICAgICAgaWYgKHNldHRpbmdzKSB7XG4gICAgICAgICAgICAvLyDmm7TmlrAg6buY6K6k5YC8XG4gICAgICAgICAgICBmb3JtLnNldEZpZWxkc1ZhbHVlKHtcbiAgICAgICAgICAgICAgICBuZXdMaWNlbnNlS2V5OiBzZXR0aW5ncy5uZXdMaWNlbnNlS2V5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCBbc2V0dGluZ3NdKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgaWYgKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSB7XG4gICAgICAgICAgICAoMCwgY2FudmFzX2NvbmZldHRpXzEuZGVmYXVsdCkoe1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlQ291bnQ6IDE0MCxcbiAgICAgICAgICAgICAgICBzcHJlYWQ6IDE3MCxcbiAgICAgICAgICAgICAgICBvcmlnaW46IHsgeTogMC40IH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIFt1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZF0pO1xuICAgIGNvbnN0IGhhbmRsZUZvcm1DaGFuZ2UgPSAoMCwgdXNlX2RlYm91bmNlXzEudXNlRGVib3VuY2VkQ2FsbGJhY2spKCh0ZXJtKSA9PiB7XG4gICAgICAgIHNhdmVPcHRpb25zKHRlcm0pO1xuICAgIH0sIDMwMCk7XG4gICAgY29uc3Qgc2hvd01vZGFsID0gKCkgPT4ge1xuICAgICAgICBzZXRJc01vZGFsT3Blbih0cnVlKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU9rID0gKCkgPT4ge1xuICAgICAgICBzZXRJc01vZGFsT3BlbihmYWxzZSk7XG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgIC8vIDxzZWN0aW9uIHN0eWxlPXt7XG4gICAgLy8gICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZmZkOWExJyxcbiAgICAvLyAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZmFmMCdcbiAgICAvLyB9fT5cbiAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybSwgeyBmb3JtOiBmb3JtLCBvblZhbHVlc0NoYW5nZTogaGFuZGxlRm9ybUNoYW5nZSwgbGFiZWxDb2w6IHsgc3BhbjogNCB9LCBsYXlvdXQ6IFwiaG9yaXpvbnRhbFwiIH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwibmV3TGljZW5zZUtleVwiLCBcbiAgICAgICAgICAgICAgICAvLyBsYWJlbD17PD4gPFByb1RhZyAvPjwvPn1cbiAgICAgICAgICAgICAgICBzdHlsZToge30gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuSW5wdXQsIHsgc3R5bGU6IHsgcGFkZGluZ0xlZnQ6IFwiNXB4XCIgfSwgcHJlZml4OiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZTogeyBtYXJnaW5SaWdodDogXCI0cHhcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFByb1RhZ18xLlByb1RhZywgbnVsbCkpLCBzdWZmaXg6ICh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCkgJiYgKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuQ2hlY2tDaXJjbGVUd29Ub25lLCB7IHR3b1RvbmVDb2xvcjogXCIjNTJjNDFhXCIgfSkpLCBwbGFjZWhvbGRlcjogXCJMaWNlbnNlIEtleVwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSkpKSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIsIHsgY2xhc3NOYW1lOiBcImJnLXdoaXRlIFwiIH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJweS04IHB4LTQgbXgtYXV0byBtYXgtdy1zY3JlZW4teGwgbGc6cHktOSBsZzpweC02XCIgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJteC1hdXRvIG1heC13LXNjcmVlbi1tZCB0ZXh0LWNlbnRlciBtYi04IGxnOm1iLTEyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCB7IGNsYXNzTmFtZTogXCJtYi00IHRleHQtNHhsIHRyYWNraW5nLXRpZ2h0IGZvbnQtZXh0cmFib2xkIHRleHQtZ3JheS05MDAgXCIgfSwgXCJCcmlkZ2luZyB0aGUgZ2FwIGJldHdlZW4gdGhlb3J5IGFuZCBwcmFjdGljZVwiKSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBmbGV4LXJvdyBqdXN0aWZ5LWNlbnRlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZmxleC1jb2wgcC02IG14LTQgbWluLXctNzIgbWF4LXctbGcgdGV4dC1jZW50ZXIgdGV4dC1ncmF5LTkwMCBiZy13aGl0ZSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZ3JheS0xMDAgc2hhZG93ICB4bDpwLTggXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZmxleC1jb2wgZ2FwLTMgbWItOFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkXCIgfSwgXCJTdGFydGVyXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicFwiLCB7IGNsYXNzTmFtZTogXCJmb250LWxpZ2h0IHRleHQtZ3JheS01MDAgc206dGV4dC1sZyBcIiB9LCBcIi9cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1iYXNlbGluZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJtci0yIHRleHQtNXhsIGZvbnQtZXh0cmFib2xkXCIgfSwgXCIkMFwiKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCB7IHJvbGU6IFwibGlzdFwiLCBjbGFzc05hbWU6IFwibWItOCBzcGFjZS15LTQgdGV4dC1sZWZ0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy01IGgtNSB0ZXh0LWdyZWVuLTUwMCBcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgdmlld0JveDogXCIwIDAgMjAgMjBcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBkOiBcIk0xNi43MDcgNS4yOTNhMSAxIDAgMDEwIDEuNDE0bC04IDhhMSAxIDAgMDEtMS40MTQgMGwtNC00YTEgMSAwIDAxMS40MTQtMS40MTRMOCAxMi41ODZsNy4yOTMtNy4yOTNhMSAxIDAgMDExLjQxNCAwelwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJBSVwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctNSBoLTUgdGV4dC1ncmVlbi01MDAgXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIHZpZXdCb3g6IFwiMCAwIDIwIDIwXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgZDogXCJNMTYuNzA3IDUuMjkzYTEgMSAwIDAxMCAxLjQxNGwtOCA4YTEgMSAwIDAxLTEuNDE0IDBsLTQtNGExIDEgMCAwMTEuNDE0LTEuNDE0TDggMTIuNTg2bDcuMjkzLTcuMjkzYTEgMSAwIDAxMS40MTQgMHpcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiT25saW5lIGRpY3Rpb25hcnlcIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTUgaC01IHRleHQtZ3JlZW4tNTAwIFwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCB2aWV3Qm94OiBcIjAgMCAyMCAyMFwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBmaWxsUnVsZTogXCJldmVub2RkXCIsIGQ6IFwiTTE2LjcwNyA1LjI5M2ExIDEgMCAwMTAgMS40MTRsLTggOGExIDEgMCAwMS0xLjQxNCAwbC00LTRhMSAxIDAgMDExLjQxNC0xLjQxNEw4IDEyLjU4Nmw3LjI5My03LjI5M2ExIDEgMCAwMTEuNDE0IDB6XCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIkFkZCB0byBBbmtpXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy01IGgtNSB0ZXh0LWdyYXktNTAwIFwiLCB2aWV3Qm94OiBcIjAgMCAxNSAxNVwiLCBmaWxsOiBcIm5vbmVcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZDogXCJNMTEuNzgxNiA0LjAzMTU3QzEyLjAwNjIgMy44MDcwMiAxMi4wMDYyIDMuNDQyOTUgMTEuNzgxNiAzLjIxODRDMTEuNTU3MSAyLjk5Mzg1IDExLjE5MyAyLjk5Mzg1IDEwLjk2ODUgMy4yMTg0TDcuNTAwMDUgNi42ODY4Mkw0LjAzMTY0IDMuMjE4NEMzLjgwNzA4IDIuOTkzODUgMy40NDMwMSAyLjk5Mzg1IDMuMjE4NDYgMy4yMTg0QzIuOTkzOTEgMy40NDI5NSAyLjk5MzkxIDMuODA3MDIgMy4yMTg0NiA0LjAzMTU3TDYuNjg2ODggNy40OTk5OUwzLjIxODQ2IDEwLjk2ODRDMi45OTM5MSAxMS4xOTMgMi45OTM5MSAxMS41NTcgMy4yMTg0NiAxMS43ODE2QzMuNDQzMDEgMTIuMDA2MSAzLjgwNzA4IDEyLjAwNjEgNC4wMzE2NCAxMS43ODE2TDcuNTAwMDUgOC4zMTMxNkwxMC45Njg1IDExLjc4MTZDMTEuMTkzIDEyLjAwNjEgMTEuNTU3MSAxMi4wMDYxIDExLjc4MTYgMTEuNzgxNkMxMi4wMDYyIDExLjU1NyAxMi4wMDYyIDExLjE5MyAxMS43ODE2IDEwLjk2ODRMOC4zMTMyMiA3LjQ5OTk5TDExLjc4MTYgNC4wMzE1N1pcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJMZWFybmluZyBpbiBZb3VUdWJlXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy01IGgtNSB0ZXh0LWdyYXktNTAwIFwiLCB2aWV3Qm94OiBcIjAgMCAxNSAxNVwiLCBmaWxsOiBcIm5vbmVcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZDogXCJNMTEuNzgxNiA0LjAzMTU3QzEyLjAwNjIgMy44MDcwMiAxMi4wMDYyIDMuNDQyOTUgMTEuNzgxNiAzLjIxODRDMTEuNTU3MSAyLjk5Mzg1IDExLjE5MyAyLjk5Mzg1IDEwLjk2ODUgMy4yMTg0TDcuNTAwMDUgNi42ODY4Mkw0LjAzMTY0IDMuMjE4NEMzLjgwNzA4IDIuOTkzODUgMy40NDMwMSAyLjk5Mzg1IDMuMjE4NDYgMy4yMTg0QzIuOTkzOTEgMy40NDI5NSAyLjk5MzkxIDMuODA3MDIgMy4yMTg0NiA0LjAzMTU3TDYuNjg2ODggNy40OTk5OUwzLjIxODQ2IDEwLjk2ODRDMi45OTM5MSAxMS4xOTMgMi45OTM5MSAxMS41NTcgMy4yMTg0NiAxMS43ODE2QzMuNDQzMDEgMTIuMDA2MSAzLjgwNzA4IDEyLjAwNjEgNC4wMzE2NCAxMS43ODE2TDcuNTAwMDUgOC4zMTMxNkwxMC45Njg1IDExLjc4MTZDMTEuMTkzIDEyLjAwNjEgMTEuNTU3MSAxMi4wMDYxIDExLjc4MTYgMTEuNzgxNkMxMi4wMDYyIDExLjU1NyAxMi4wMDYyIDExLjE5MyAxMS43ODE2IDEwLjk2ODRMOC4zMTMyMiA3LjQ5OTk5TDExLjc4MTYgNC4wMzE1N1pcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJTZWFyY2ggaW1hZ2VzXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy01IGgtNSB0ZXh0LWdyYXktNTAwIFwiLCB2aWV3Qm94OiBcIjAgMCAxNSAxNVwiLCBmaWxsOiBcIm5vbmVcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZDogXCJNMTEuNzgxNiA0LjAzMTU3QzEyLjAwNjIgMy44MDcwMiAxMi4wMDYyIDMuNDQyOTUgMTEuNzgxNiAzLjIxODRDMTEuNTU3MSAyLjk5Mzg1IDExLjE5MyAyLjk5Mzg1IDEwLjk2ODUgMy4yMTg0TDcuNTAwMDUgNi42ODY4Mkw0LjAzMTY0IDMuMjE4NEMzLjgwNzA4IDIuOTkzODUgMy40NDMwMSAyLjk5Mzg1IDMuMjE4NDYgMy4yMTg0QzIuOTkzOTEgMy40NDI5NSAyLjk5MzkxIDMuODA3MDIgMy4yMTg0NiA0LjAzMTU3TDYuNjg2ODggNy40OTk5OUwzLjIxODQ2IDEwLjk2ODRDMi45OTM5MSAxMS4xOTMgMi45OTM5MSAxMS41NTcgMy4yMTg0NiAxMS43ODE2QzMuNDQzMDEgMTIuMDA2MSAzLjgwNzA4IDEyLjAwNjEgNC4wMzE2NCAxMS43ODE2TDcuNTAwMDUgOC4zMTMxNkwxMC45Njg1IDExLjc4MTZDMTEuMTkzIDEyLjAwNjEgMTEuNTU3MSAxMi4wMDYxIDExLjc4MTYgMTEuNzgxNkMxMi4wMDYyIDExLjU1NyAxMi4wMDYyIDExLjE5MyAxMS43ODE2IDEwLjk2ODRMOC4zMTMyMiA3LjQ5OTk5TDExLjc4MTYgNC4wMzE1N1pcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJQYXN0ZSB0aGUgaW1hZ2UgZnJvbSB0aGUgY2xpcGJvYXJkXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy01IGgtNSB0ZXh0LWdyYXktNTAwIFwiLCB2aWV3Qm94OiBcIjAgMCAxNSAxNVwiLCBmaWxsOiBcIm5vbmVcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZDogXCJNMTEuNzgxNiA0LjAzMTU3QzEyLjAwNjIgMy44MDcwMiAxMi4wMDYyIDMuNDQyOTUgMTEuNzgxNiAzLjIxODRDMTEuNTU3MSAyLjk5Mzg1IDExLjE5MyAyLjk5Mzg1IDEwLjk2ODUgMy4yMTg0TDcuNTAwMDUgNi42ODY4Mkw0LjAzMTY0IDMuMjE4NEMzLjgwNzA4IDIuOTkzODUgMy40NDMwMSAyLjk5Mzg1IDMuMjE4NDYgMy4yMTg0QzIuOTkzOTEgMy40NDI5NSAyLjk5MzkxIDMuODA3MDIgMy4yMTg0NiA0LjAzMTU3TDYuNjg2ODggNy40OTk5OUwzLjIxODQ2IDEwLjk2ODRDMi45OTM5MSAxMS4xOTMgMi45OTM5MSAxMS41NTcgMy4yMTg0NiAxMS43ODE2QzMuNDQzMDEgMTIuMDA2MSAzLjgwNzA4IDEyLjAwNjEgNC4wMzE2NCAxMS43ODE2TDcuNTAwMDUgOC4zMTMxNkwxMC45Njg1IDExLjc4MTZDMTEuMTkzIDEyLjAwNjEgMTEuNTU3MSAxMi4wMDYxIDExLjc4MTYgMTEuNzgxNkMxMi4wMDYyIDExLjU1NyAxMi4wMDYyIDExLjE5MyAxMS43ODE2IDEwLjk2ODRMOC4zMTMyMiA3LjQ5OTk5TDExLjc4MTYgNC4wMzE1N1pcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJBcHBlbmQgcXVlcnlcIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTUgaC01IHRleHQtZ3JheS01MDAgXCIsIHZpZXdCb3g6IFwiMCAwIDE1IDE1XCIsIGZpbGw6IFwibm9uZVwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBkOiBcIk0xMS43ODE2IDQuMDMxNTdDMTIuMDA2MiAzLjgwNzAyIDEyLjAwNjIgMy40NDI5NSAxMS43ODE2IDMuMjE4NEMxMS41NTcxIDIuOTkzODUgMTEuMTkzIDIuOTkzODUgMTAuOTY4NSAzLjIxODRMNy41MDAwNSA2LjY4NjgyTDQuMDMxNjQgMy4yMTg0QzMuODA3MDggMi45OTM4NSAzLjQ0MzAxIDIuOTkzODUgMy4yMTg0NiAzLjIxODRDMi45OTM5MSAzLjQ0Mjk1IDIuOTkzOTEgMy44MDcwMiAzLjIxODQ2IDQuMDMxNTdMNi42ODY4OCA3LjQ5OTk5TDMuMjE4NDYgMTAuOTY4NEMyLjk5MzkxIDExLjE5MyAyLjk5MzkxIDExLjU1NyAzLjIxODQ2IDExLjc4MTZDMy40NDMwMSAxMi4wMDYxIDMuODA3MDggMTIuMDA2MSA0LjAzMTY0IDExLjc4MTZMNy41MDAwNSA4LjMxMzE2TDEwLjk2ODUgMTEuNzgxNkMxMS4xOTMgMTIuMDA2MSAxMS41NTcxIDEyLjAwNjEgMTEuNzgxNiAxMS43ODE2QzEyLjAwNjIgMTEuNTU3IDEyLjAwNjIgMTEuMTkzIDExLjc4MTYgMTAuOTY4NEw4LjMxMzIyIDcuNDk5OTlMMTEuNzgxNiA0LjAzMTU3WlwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCBmaWxsUnVsZTogXCJldmVub2RkXCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIkNvbnRlbnQgRWRpdGFibGVcIikpKSksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZmxleC1jb2wgcC02IG14LTQgbWluLXctNzIgbWF4LXctbGcgdGV4dC1jZW50ZXIgdGV4dC1ncmF5LTkwMCBiZy13aGl0ZSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZ3JheS0xMDAgc2hhZG93ICB4bDpwLTggXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZmxleC1jb2wgZ2FwLTMgbWItOFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkXCIgfSwgXCJQcm9cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIHsgY2xhc3NOYW1lOiBcImZvbnQtbGlnaHQgdGV4dC1ncmF5LTUwMCBzbTp0ZXh0LWxnIFwiIH0sIFwiT25lLXRpbWVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1iYXNlbGluZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJtci0yIHRleHQtNXhsIGZvbnQtZXh0cmFib2xkXCIgfSwgXCIkOVwiKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCB7IHJvbGU6IFwibGlzdFwiLCBjbGFzc05hbWU6IFwibWItOCBzcGFjZS15LTQgdGV4dC1sZWZ0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy01IGgtNSB0ZXh0LWdyZWVuLTUwMCBcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgdmlld0JveDogXCIwIDAgMjAgMjBcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBkOiBcIk0xNi43MDcgNS4yOTNhMSAxIDAgMDEwIDEuNDE0bC04IDhhMSAxIDAgMDEtMS40MTQgMGwtNC00YTEgMSAwIDAxMS40MTQtMS40MTRMOCAxMi41ODZsNy4yOTMtNy4yOTNhMSAxIDAgMDExLjQxNCAwelwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJBSVwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctNSBoLTUgdGV4dC1ncmVlbi01MDAgXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIHZpZXdCb3g6IFwiMCAwIDIwIDIwXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgZDogXCJNMTYuNzA3IDUuMjkzYTEgMSAwIDAxMCAxLjQxNGwtOCA4YTEgMSAwIDAxLTEuNDE0IDBsLTQtNGExIDEgMCAwMTEuNDE0LTEuNDE0TDggMTIuNTg2bDcuMjkzLTcuMjkzYTEgMSAwIDAxMS40MTQgMHpcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiT25saW5lIGRpY3Rpb25hcnlcIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTUgaC01IHRleHQtZ3JlZW4tNTAwIFwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCB2aWV3Qm94OiBcIjAgMCAyMCAyMFwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBmaWxsUnVsZTogXCJldmVub2RkXCIsIGQ6IFwiTTE2LjcwNyA1LjI5M2ExIDEgMCAwMTAgMS40MTRsLTggOGExIDEgMCAwMS0xLjQxNCAwbC00LTRhMSAxIDAgMDExLjQxNC0xLjQxNEw4IDEyLjU4Nmw3LjI5My03LjI5M2ExIDEgMCAwMTEuNDE0IDB6XCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIkFkZCB0byBBbmtpXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy01IGgtNSB0ZXh0LWdyZWVuLTUwMCBcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgdmlld0JveDogXCIwIDAgMjAgMjBcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBkOiBcIk0xNi43MDcgNS4yOTNhMSAxIDAgMDEwIDEuNDE0bC04IDhhMSAxIDAgMDEtMS40MTQgMGwtNC00YTEgMSAwIDAxMS40MTQtMS40MTRMOCAxMi41ODZsNy4yOTMtNy4yOTNhMSAxIDAgMDExLjQxNCAwelwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJMZWFybmluZyBpbiBZb3VUdWJlXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyB0YXJnZXQ6IFwiX2JsYW5rXCIsIGhyZWY6IFwiaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9MZWFybmluZy1pbi1Zb3VUdWJlLVlvdVR1YmUtMWQ2MWZkNTA4MTVhNDJhNWFmMzk0ZGI0YTY5NWM3MTI/cHZzPTRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyB3aWR0aDogXCIxNVwiLCBoZWlnaHQ6IFwiMTVcIiwgdmlld0JveDogXCIwIDAgMTUgMTVcIiwgZmlsbDogXCJub25lXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBkOiBcIk03LjQ5OTkxIDAuODc2ODkyQzMuODQyMjIgMC44NzY4OTIgMC44NzcwNzUgMy44NDIwNCAwLjg3NzA3NSA3LjQ5OTcyQzAuODc3MDc1IDExLjE1NzQgMy44NDIyMiAxNC4xMjI2IDcuNDk5OTEgMTQuMTIyNkMxMS4xNTc2IDE0LjEyMjYgMTQuMTIyNyAxMS4xNTc0IDE0LjEyMjcgNy40OTk3MkMxNC4xMjI3IDMuODQyMDQgMTEuMTU3NiAwLjg3Njg5MiA3LjQ5OTkxIDAuODc2ODkyWk0xLjgyNzA3IDcuNDk5NzJDMS44MjcwNyA0LjM2NjcxIDQuMzY2ODkgMS44MjY4OSA3LjQ5OTkxIDEuODI2ODlDMTAuNjMyOSAxLjgyNjg5IDEzLjE3MjcgNC4zNjY3MSAxMy4xNzI3IDcuNDk5NzJDMTMuMTcyNyAxMC42MzI3IDEwLjYzMjkgMTMuMTcyNiA3LjQ5OTkxIDEzLjE3MjZDNC4zNjY4OSAxMy4xNzI2IDEuODI3MDcgMTAuNjMyNyAxLjgyNzA3IDcuNDk5NzJaTTguMjQ5OTIgNC40OTk5OUM4LjI0OTkyIDQuOTE0MiA3LjkxNDEzIDUuMjQ5OTkgNy40OTk5MiA1LjI0OTk5QzcuMDg1NzEgNS4yNDk5OSA2Ljc0OTkyIDQuOTE0MiA2Ljc0OTkyIDQuNDk5OTlDNi43NDk5MiA0LjA4NTc3IDcuMDg1NzEgMy43NDk5OSA3LjQ5OTkyIDMuNzQ5OTlDNy45MTQxMyAzLjc0OTk5IDguMjQ5OTIgNC4wODU3NyA4LjI0OTkyIDQuNDk5OTlaTTYuMDAwMDMgNS45OTk5OUg2LjUwMDAzSDcuNTAwMDNDNy43NzYxOCA1Ljk5OTk5IDguMDAwMDMgNi4yMjM4NCA4LjAwMDAzIDYuNDk5OTlWOS45OTk5OUg4LjUwMDAzSDkuMDAwMDNWMTFIOC41MDAwM0g3LjUwMDAzSDYuNTAwMDNINi4wMDAwM1Y5Ljk5OTk5SDYuNTAwMDNINy4wMDAwM1Y2Ljk5OTk5SDYuNTAwMDNINi4wMDAwM1Y1Ljk5OTk5WlwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCBmaWxsUnVsZTogXCJldmVub2RkXCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy01IGgtNSB0ZXh0LWdyZWVuLTUwMCBcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgdmlld0JveDogXCIwIDAgMjAgMjBcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBkOiBcIk0xNi43MDcgNS4yOTNhMSAxIDAgMDEwIDEuNDE0bC04IDhhMSAxIDAgMDEtMS40MTQgMGwtNC00YTEgMSAwIDAxMS40MTQtMS40MTRMOCAxMi41ODZsNy4yOTMtNy4yOTNhMSAxIDAgMDExLjQxNCAwelwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJTZWFyY2ggaW1hZ2VzXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyB0YXJnZXQ6IFwiX2JsYW5rXCIsIGhyZWY6IFwiaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9TZWFyY2gtaW1hZ2VzLTM5NmQyNDVkZWNlOTQ4ZmY4MDNiOWU1MWY1NmJiMzhmP3B2cz00XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgd2lkdGg6IFwiMTVcIiwgaGVpZ2h0OiBcIjE1XCIsIHZpZXdCb3g6IFwiMCAwIDE1IDE1XCIsIGZpbGw6IFwibm9uZVwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZDogXCJNNy40OTk5MSAwLjg3Njg5MkMzLjg0MjIyIDAuODc2ODkyIDAuODc3MDc1IDMuODQyMDQgMC44NzcwNzUgNy40OTk3MkMwLjg3NzA3NSAxMS4xNTc0IDMuODQyMjIgMTQuMTIyNiA3LjQ5OTkxIDE0LjEyMjZDMTEuMTU3NiAxNC4xMjI2IDE0LjEyMjcgMTEuMTU3NCAxNC4xMjI3IDcuNDk5NzJDMTQuMTIyNyAzLjg0MjA0IDExLjE1NzYgMC44NzY4OTIgNy40OTk5MSAwLjg3Njg5MlpNMS44MjcwNyA3LjQ5OTcyQzEuODI3MDcgNC4zNjY3MSA0LjM2Njg5IDEuODI2ODkgNy40OTk5MSAxLjgyNjg5QzEwLjYzMjkgMS44MjY4OSAxMy4xNzI3IDQuMzY2NzEgMTMuMTcyNyA3LjQ5OTcyQzEzLjE3MjcgMTAuNjMyNyAxMC42MzI5IDEzLjE3MjYgNy40OTk5MSAxMy4xNzI2QzQuMzY2ODkgMTMuMTcyNiAxLjgyNzA3IDEwLjYzMjcgMS44MjcwNyA3LjQ5OTcyWk04LjI0OTkyIDQuNDk5OTlDOC4yNDk5MiA0LjkxNDIgNy45MTQxMyA1LjI0OTk5IDcuNDk5OTIgNS4yNDk5OUM3LjA4NTcxIDUuMjQ5OTkgNi43NDk5MiA0LjkxNDIgNi43NDk5MiA0LjQ5OTk5QzYuNzQ5OTIgNC4wODU3NyA3LjA4NTcxIDMuNzQ5OTkgNy40OTk5MiAzLjc0OTk5QzcuOTE0MTMgMy43NDk5OSA4LjI0OTkyIDQuMDg1NzcgOC4yNDk5MiA0LjQ5OTk5Wk02LjAwMDAzIDUuOTk5OTlINi41MDAwM0g3LjUwMDAzQzcuNzc2MTggNS45OTk5OSA4LjAwMDAzIDYuMjIzODQgOC4wMDAwMyA2LjQ5OTk5VjkuOTk5OTlIOC41MDAwM0g5LjAwMDAzVjExSDguNTAwMDNINy41MDAwM0g2LjUwMDAzSDYuMDAwMDNWOS45OTk5OUg2LjUwMDAzSDcuMDAwMDNWNi45OTk5OUg2LjUwMDAzSDYuMDAwMDNWNS45OTk5OVpcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctNSBoLTUgdGV4dC1ncmVlbi01MDAgXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIHZpZXdCb3g6IFwiMCAwIDIwIDIwXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgZDogXCJNMTYuNzA3IDUuMjkzYTEgMSAwIDAxMCAxLjQxNGwtOCA4YTEgMSAwIDAxLTEuNDE0IDBsLTQtNGExIDEgMCAwMTEuNDE0LTEuNDE0TDggMTIuNTg2bDcuMjkzLTcuMjkzYTEgMSAwIDAxMS40MTQgMHpcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiUGFzdGUgdGhlIGltYWdlIGZyb20gdGhlIGNsaXBib2FyZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgdGFyZ2V0OiBcIl9ibGFua1wiLCBocmVmOiBcImh0dHBzOi8vamlhbmd6aWxvbmcubm90aW9uLnNpdGUvUGFzdGUtdGhlLWltYWdlLWZyb20tdGhlLWNsaXBib2FyZC0zNjA2Y2E4ZTU3NGY0NjUyYWM1ODM3MjAzYzY1MWRhNz9wdnM9NFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IHdpZHRoOiBcIjE1XCIsIGhlaWdodDogXCIxNVwiLCB2aWV3Qm94OiBcIjAgMCAxNSAxNVwiLCBmaWxsOiBcIm5vbmVcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGQ6IFwiTTcuNDk5OTEgMC44NzY4OTJDMy44NDIyMiAwLjg3Njg5MiAwLjg3NzA3NSAzLjg0MjA0IDAuODc3MDc1IDcuNDk5NzJDMC44NzcwNzUgMTEuMTU3NCAzLjg0MjIyIDE0LjEyMjYgNy40OTk5MSAxNC4xMjI2QzExLjE1NzYgMTQuMTIyNiAxNC4xMjI3IDExLjE1NzQgMTQuMTIyNyA3LjQ5OTcyQzE0LjEyMjcgMy44NDIwNCAxMS4xNTc2IDAuODc2ODkyIDcuNDk5OTEgMC44NzY4OTJaTTEuODI3MDcgNy40OTk3MkMxLjgyNzA3IDQuMzY2NzEgNC4zNjY4OSAxLjgyNjg5IDcuNDk5OTEgMS44MjY4OUMxMC42MzI5IDEuODI2ODkgMTMuMTcyNyA0LjM2NjcxIDEzLjE3MjcgNy40OTk3MkMxMy4xNzI3IDEwLjYzMjcgMTAuNjMyOSAxMy4xNzI2IDcuNDk5OTEgMTMuMTcyNkM0LjM2Njg5IDEzLjE3MjYgMS44MjcwNyAxMC42MzI3IDEuODI3MDcgNy40OTk3MlpNOC4yNDk5MiA0LjQ5OTk5QzguMjQ5OTIgNC45MTQyIDcuOTE0MTMgNS4yNDk5OSA3LjQ5OTkyIDUuMjQ5OTlDNy4wODU3MSA1LjI0OTk5IDYuNzQ5OTIgNC45MTQyIDYuNzQ5OTIgNC40OTk5OUM2Ljc0OTkyIDQuMDg1NzcgNy4wODU3MSAzLjc0OTk5IDcuNDk5OTIgMy43NDk5OUM3LjkxNDEzIDMuNzQ5OTkgOC4yNDk5MiA0LjA4NTc3IDguMjQ5OTIgNC40OTk5OVpNNi4wMDAwMyA1Ljk5OTk5SDYuNTAwMDNINy41MDAwM0M3Ljc3NjE4IDUuOTk5OTkgOC4wMDAwMyA2LjIyMzg0IDguMDAwMDMgNi40OTk5OVY5Ljk5OTk5SDguNTAwMDNIOS4wMDAwM1YxMUg4LjUwMDAzSDcuNTAwMDNINi41MDAwM0g2LjAwMDAzVjkuOTk5OTlINi41MDAwM0g3LjAwMDAzVjYuOTk5OTlINi41MDAwM0g2LjAwMDAzVjUuOTk5OTlaXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTUgaC01IHRleHQtZ3JlZW4tNTAwIFwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCB2aWV3Qm94OiBcIjAgMCAyMCAyMFwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBmaWxsUnVsZTogXCJldmVub2RkXCIsIGQ6IFwiTTE2LjcwNyA1LjI5M2ExIDEgMCAwMTAgMS40MTRsLTggOGExIDEgMCAwMS0xLjQxNCAwbC00LTRhMSAxIDAgMDExLjQxNC0xLjQxNEw4IDEyLjU4Nmw3LjI5My03LjI5M2ExIDEgMCAwMTEuNDE0IDB6XCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIkFwcGVuZCBxdWVyeVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgdGFyZ2V0OiBcIl9ibGFua1wiLCBocmVmOiBcImh0dHBzOi8vamlhbmd6aWxvbmcubm90aW9uLnNpdGUvRm9sbG93LXVwLXF1ZXN0aW9uLWMzMjEwNzJlOWNiYzRiY2ZiNTE4NDM2NDdhYTcyMDQ1P3B2cz00XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgd2lkdGg6IFwiMTVcIiwgaGVpZ2h0OiBcIjE1XCIsIHZpZXdCb3g6IFwiMCAwIDE1IDE1XCIsIGZpbGw6IFwibm9uZVwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZDogXCJNNy40OTk5MSAwLjg3Njg5MkMzLjg0MjIyIDAuODc2ODkyIDAuODc3MDc1IDMuODQyMDQgMC44NzcwNzUgNy40OTk3MkMwLjg3NzA3NSAxMS4xNTc0IDMuODQyMjIgMTQuMTIyNiA3LjQ5OTkxIDE0LjEyMjZDMTEuMTU3NiAxNC4xMjI2IDE0LjEyMjcgMTEuMTU3NCAxNC4xMjI3IDcuNDk5NzJDMTQuMTIyNyAzLjg0MjA0IDExLjE1NzYgMC44NzY4OTIgNy40OTk5MSAwLjg3Njg5MlpNMS44MjcwNyA3LjQ5OTcyQzEuODI3MDcgNC4zNjY3MSA0LjM2Njg5IDEuODI2ODkgNy40OTk5MSAxLjgyNjg5QzEwLjYzMjkgMS44MjY4OSAxMy4xNzI3IDQuMzY2NzEgMTMuMTcyNyA3LjQ5OTcyQzEzLjE3MjcgMTAuNjMyNyAxMC42MzI5IDEzLjE3MjYgNy40OTk5MSAxMy4xNzI2QzQuMzY2ODkgMTMuMTcyNiAxLjgyNzA3IDEwLjYzMjcgMS44MjcwNyA3LjQ5OTcyWk04LjI0OTkyIDQuNDk5OTlDOC4yNDk5MiA0LjkxNDIgNy45MTQxMyA1LjI0OTk5IDcuNDk5OTIgNS4yNDk5OUM3LjA4NTcxIDUuMjQ5OTkgNi43NDk5MiA0LjkxNDIgNi43NDk5MiA0LjQ5OTk5QzYuNzQ5OTIgNC4wODU3NyA3LjA4NTcxIDMuNzQ5OTkgNy40OTk5MiAzLjc0OTk5QzcuOTE0MTMgMy43NDk5OSA4LjI0OTkyIDQuMDg1NzcgOC4yNDk5MiA0LjQ5OTk5Wk02LjAwMDAzIDUuOTk5OTlINi41MDAwM0g3LjUwMDAzQzcuNzc2MTggNS45OTk5OSA4LjAwMDAzIDYuMjIzODQgOC4wMDAwMyA2LjQ5OTk5VjkuOTk5OTlIOC41MDAwM0g5LjAwMDAzVjExSDguNTAwMDNINy41MDAwM0g2LjUwMDAzSDYuMDAwMDNWOS45OTk5OUg2LjUwMDAzSDcuMDAwMDNWNi45OTk5OUg2LjUwMDAzSDYuMDAwMDNWNS45OTk5OVpcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctNSBoLTUgdGV4dC1ncmVlbi01MDAgXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIHZpZXdCb3g6IFwiMCAwIDIwIDIwXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgZDogXCJNMTYuNzA3IDUuMjkzYTEgMSAwIDAxMCAxLjQxNGwtOCA4YTEgMSAwIDAxLTEuNDE0IDBsLTQtNGExIDEgMCAwMTEuNDE0LTEuNDE0TDggMTIuNTg2bDcuMjkzLTcuMjkzYTEgMSAwIDAxMS40MTQgMHpcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiQ29udGVudCBFZGl0YWJsZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgdGFyZ2V0OiBcIl9ibGFua1wiLCBocmVmOiBcImh0dHBzOi8vamlhbmd6aWxvbmcubm90aW9uLnNpdGUvQ29udGVudC1FZGl0YWJsZS1Qcm8tNTQ2NDQ0MzhiNzdkNGQzZmI3NTZjZjhiYWFmNTM1N2E/cHZzPTRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyB3aWR0aDogXCIxNVwiLCBoZWlnaHQ6IFwiMTVcIiwgdmlld0JveDogXCIwIDAgMTUgMTVcIiwgZmlsbDogXCJub25lXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBkOiBcIk03LjQ5OTkxIDAuODc2ODkyQzMuODQyMjIgMC44NzY4OTIgMC44NzcwNzUgMy44NDIwNCAwLjg3NzA3NSA3LjQ5OTcyQzAuODc3MDc1IDExLjE1NzQgMy44NDIyMiAxNC4xMjI2IDcuNDk5OTEgMTQuMTIyNkMxMS4xNTc2IDE0LjEyMjYgMTQuMTIyNyAxMS4xNTc0IDE0LjEyMjcgNy40OTk3MkMxNC4xMjI3IDMuODQyMDQgMTEuMTU3NiAwLjg3Njg5MiA3LjQ5OTkxIDAuODc2ODkyWk0xLjgyNzA3IDcuNDk5NzJDMS44MjcwNyA0LjM2NjcxIDQuMzY2ODkgMS44MjY4OSA3LjQ5OTkxIDEuODI2ODlDMTAuNjMyOSAxLjgyNjg5IDEzLjE3MjcgNC4zNjY3MSAxMy4xNzI3IDcuNDk5NzJDMTMuMTcyNyAxMC42MzI3IDEwLjYzMjkgMTMuMTcyNiA3LjQ5OTkxIDEzLjE3MjZDNC4zNjY4OSAxMy4xNzI2IDEuODI3MDcgMTAuNjMyNyAxLjgyNzA3IDcuNDk5NzJaTTguMjQ5OTIgNC40OTk5OUM4LjI0OTkyIDQuOTE0MiA3LjkxNDEzIDUuMjQ5OTkgNy40OTk5MiA1LjI0OTk5QzcuMDg1NzEgNS4yNDk5OSA2Ljc0OTkyIDQuOTE0MiA2Ljc0OTkyIDQuNDk5OTlDNi43NDk5MiA0LjA4NTc3IDcuMDg1NzEgMy43NDk5OSA3LjQ5OTkyIDMuNzQ5OTlDNy45MTQxMyAzLjc0OTk5IDguMjQ5OTIgNC4wODU3NyA4LjI0OTkyIDQuNDk5OTlaTTYuMDAwMDMgNS45OTk5OUg2LjUwMDAzSDcuNTAwMDNDNy43NzYxOCA1Ljk5OTk5IDguMDAwMDMgNi4yMjM4NCA4LjAwMDAzIDYuNDk5OTlWOS45OTk5OUg4LjUwMDAzSDkuMDAwMDNWMTFIOC41MDAwM0g3LjUwMDAzSDYuNTAwMDNINi4wMDAwM1Y5Ljk5OTk5SDYuNTAwMDNINy4wMDAwM1Y2Ljk5OTk5SDYuNTAwMDNINi4wMDAwM1Y1Ljk5OTk5WlwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCBmaWxsUnVsZTogXCJldmVub2RkXCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSkpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBocmVmOiBcIiNcIiwgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihcImh0dHBzOi8vamlhbmcubGVtb25zcXVlZXp5LmNvbS9jaGVja291dC9idXkvZTMxZjhjMTgtN2JmMi00ZjZiLTg1YzItNTA4ZmI1MDBjZTg0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGNsYXNzTmFtZTogXCJ0ZXh0LXdoaXRlIGhvdmVyOnRleHQtd2hpdGUgYmctb3JhbmdlLTQwMCBob3ZlcjpiZy1vcmFuZ2UtNTAwIGZvY3VzOnJpbmctNCBmb2N1czpyaW5nLXByaW1hcnktMjAwIGZvbnQtbWVkaXVtIHJvdW5kZWQtbGcgdGV4dC1zbSBweC01IHB5LTIuNSB0ZXh0LWNlbnRlciBcIiB9LCBcIkdldCBzdGFydGVkXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGhyZWY6IFwiI1wiLCBvbkNsaWNrOiBzaG93TW9kYWwsIGNsYXNzTmFtZTogXCIgbXQtMiBob3Zlcjp0ZXh0LW9yYW5nZS01MDAgdGV4dC1vcmFuZ2UtNDAwICBmb2N1czpyaW5nLTQgZm9jdXM6cmluZy1wcmltYXJ5LTIwMCBmb250LW1lZGl1bSByb3VuZGVkLWxnIHRleHQtc20gcHgtNSBweS0yLjUgdGV4dC1jZW50ZXIgXCIgfSwgXCJcXHU1RkFFXFx1NEZFMVxcdTY1MkZcXHU0RUQ4XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Nb2RhbCwgeyB0aXRsZTogXCJXZUNoYXRQYXlcIiwgb3BlbjogaXNNb2RhbE9wZW4sIG9uQ2FuY2VsOiBoYW5kbGVPaywgZm9vdGVyOiBudWxsLCBtYXNrQ2xvc2FibGU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgZ2FwLTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIFwiXFx1OEJGN1xcdTU3MjhcXHU0RUQ4XFx1NkIzRVxcdTY1RjZcXHU1OTA3XFx1NkNFOFxcdTRGNjBcXHU3Njg0XFx1OTBBRVxcdTdCQjFcXHVGRjBDXFx1NkZDMFxcdTZEM0JcXHU3ODAxXFx1NUMwNlxcdTUzRDFcXHU5MDAxXFx1ODFGM1xcdTkwQUVcXHU3QkIxXFx1NEUyRFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsgd2lkdGg6IDI0MCwgc3JjOiBcImltYWdlcy9XZUNoYXRQYXkucG5nXCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcdTYyMTFcXHU0RUVDXFx1NEYxQVxcdTVDM0RcXHU1RkVCXFx1NTNEMVxcdTkwMDFcXHU2RkMwXFx1NkQzQlxcdTc4MDFcXHVGRjBDXFx1ODJFNVxcdTY3MkFcXHU2NTM2XFx1NTIzMFxcdTUzRUZcXHU4MDU0XFx1N0NGQlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LW9yYW5nZS00MDBcIiwgaHJlZjogXCJtYWlsdG86anpsb25nNjY2QGdtYWlsLmNvbT9zdWJqZWN0PVxcdThCRjdcXHU1M0QxXFx1OTAwMSBTY291dGVyIFxcdTZGQzBcXHU2RDNCXFx1NzgwMVwiIH0sIFwianpsb25nNjY2QGdtYWlsLmNvbVwiKSkpKSkpKSkpKSk7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gUHJvO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgdXNlX2RlYm91bmNlXzEgPSByZXF1aXJlKFwidXNlLWRlYm91bmNlXCIpO1xuY29uc3QgWW91dHViZSA9ICh7IHNldHRpbmdzLCBzYXZlT3B0aW9ucyB9KSA9PiB7XG4gICAgY29uc3QgW2Zvcm1dID0gYW50ZF8xLkZvcm0udXNlRm9ybSgpO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhzZXR0aW5ncyk7XG4gICAgICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgICAgICAgLy8g5pu05pawIOm7mOiupOWAvFxuICAgICAgICAgICAgZm9ybS5zZXRGaWVsZHNWYWx1ZSh7XG4gICAgICAgICAgICAgICAgc2hvd1lvdXR1YmVCdXR0b246IHNldHRpbmdzLnNob3dZb3V0dWJlQnV0dG9uLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCBbc2V0dGluZ3NdKTtcbiAgICBjb25zdCBoYW5kbGVGb3JtQ2hhbmdlID0gKDAsIHVzZV9kZWJvdW5jZV8xLnVzZURlYm91bmNlZENhbGxiYWNrKSgodGVybSkgPT4ge1xuICAgICAgICBzYXZlT3B0aW9ucyh0ZXJtKTtcbiAgICB9LCAzMDApO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm1cbiAgICAvLyBvbkZpbmlzaD17fVxuICAgICwgeyBcbiAgICAgICAgLy8gb25GaW5pc2g9e31cbiAgICAgICAgb25WYWx1ZXNDaGFuZ2U6IGhhbmRsZUZvcm1DaGFuZ2UsIGZvcm06IGZvcm0sIGxhYmVsQ29sOiB7IHNwYW46IDQgfSwgbGF5b3V0OiBcImhvcml6b250YWxcIiB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIiwgbnVsbCxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgbmFtZTogXCJzaG93WW91dHViZUJ1dHRvblwiLCB2YWx1ZVByb3BOYW1lOiBcImNoZWNrZWRcIiwgbGFiZWw6IFwiXFx1RDgzRFxcdURDRkEgWW91VHViZSBzaG9ydGN1dFwiLCBleHRyYTogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBjbGFzc05hbWU6IFwiIHctZnVsbCBweS0yIG1heC13LTJ4bFwiLCBzcmM6IFwiaW1hZ2VzL3lvdXR1YmUucG5nXCIgfSkpIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlN3aXRjaCwgbnVsbCkpKSkpO1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IFlvdXR1YmU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCJ2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyAob2JqKSA9PiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIDogKG9iaikgPT4gKG9iai5fX3Byb3RvX18pO1xudmFyIGxlYWZQcm90b3R5cGVzO1xuLy8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuLy8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vLyBtb2RlICYgMTY6IHJldHVybiB2YWx1ZSB3aGVuIGl0J3MgUHJvbWlzZS1saWtlXG4vLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuXHRpZihtb2RlICYgMSkgdmFsdWUgPSB0aGlzKHZhbHVlKTtcblx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcblx0aWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuXHRcdGlmKChtb2RlICYgNCkgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmKChtb2RlICYgMTYpICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdH1cblx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcblx0dmFyIGRlZiA9IHt9O1xuXHRsZWFmUHJvdG90eXBlcyA9IGxlYWZQcm90b3R5cGVzIHx8IFtudWxsLCBnZXRQcm90byh7fSksIGdldFByb3RvKFtdKSwgZ2V0UHJvdG8oZ2V0UHJvdG8pXTtcblx0Zm9yKHZhciBjdXJyZW50ID0gbW9kZSAmIDIgJiYgdmFsdWU7IHR5cGVvZiBjdXJyZW50ID09ICdvYmplY3QnICYmICF+bGVhZlByb3RvdHlwZXMuaW5kZXhPZihjdXJyZW50KTsgY3VycmVudCA9IGdldFByb3RvKGN1cnJlbnQpKSB7XG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCkuZm9yRWFjaCgoa2V5KSA9PiAoZGVmW2tleV0gPSAoKSA9PiAodmFsdWVba2V5XSkpKTtcblx0fVxuXHRkZWZbJ2RlZmF1bHQnXSA9ICgpID0+ICh2YWx1ZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChucywgZGVmKTtcblx0cmV0dXJuIG5zO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18uaG1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUgPSBPYmplY3QuY3JlYXRlKG1vZHVsZSk7XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgJ2V4cG9ydHMnLCB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRzZXQ6ICgpID0+IHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignRVMgTW9kdWxlcyBtYXkgbm90IGFzc2lnbiBtb2R1bGUuZXhwb3J0cyBvciBleHBvcnRzLiosIFVzZSBFU00gZXhwb3J0IHN5bnRheCwgaW5zdGVhZDogJyArIG1vZHVsZS5pZCk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm9wdGlvbnNcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2hyb21lX2V4dGVuc2lvbl90eXBlc2NyaXB0X3N0YXJ0ZXJcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2hyb21lX2V4dGVuc2lvbl90eXBlc2NyaXB0X3N0YXJ0ZXJcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL09wdGlvbnMvaW5kZXgudHN4XCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=