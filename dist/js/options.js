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
    const defaultUserInfo = {
        userId: "",
        verified: false,
        contextMenu: false,
        contextMenuBlackList: "",
        showYoutubeButton: true,
        contentEditable: false,
    };
    // const UserContext = createContext<UserContextType>({ userInfo: defaultUserInfo, setUserInfo: () => { } });
    const [userInfo, setUserInfo] = (0, react_1.useState)(defaultUserInfo);
    const [settings, setSettings] = (0, react_1.useState)();
    const divElement = (0, react_1.useRef)(null);
    const tabItems = [
        {
            name: "General",
            content: react_1.default.createElement(General_1.default, { settings: settings, saveOptions: thisSaveOptions }),
        },
        {
            name: "Anki",
            content: react_1.default.createElement(Anki_1.default, { settings: settings, saveOptions: thisSaveOptions }),
        },
        {
            name: "AI",
            content: react_1.default.createElement(AI_1.default, { settings: settings, saveOptions: thisSaveOptions }),
        },
        {
            name: "YouTube",
            content: react_1.default.createElement(Youtube_1.default, { settings: settings, saveOptions: thisSaveOptions }),
        },
        {
            name: "⚡Pro",
            content: react_1.default.createElement(Pro_1.default, { settings: settings, saveOptions: thisSaveOptions }),
        },
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
            amplitude.track("openOptions");
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
                if (key === "newLicenseKey") {
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
        react_1.default.createElement("div", { className: "flex flex-col items-center h-screen" },
            react_1.default.createElement(Nav_1.default, null),
            react_1.default.createElement("div", { id: "MyOptions", ref: divElement, className: " flex-1" },
                react_1.default.createElement(antd_1.ConfigProvider, { theme: {
                        // algorithm: theme.defaultAlgorithm,
                        token: {
                            colorPrimary: "#F08A24",
                            colorLink: "#F08A24",
                            colorLinkHover: "#ffc478",
                            colorLinkActive: "#c96914",
                        },
                    } },
                    react_1.default.createElement(antd_1.Tabs, { className: "w-full h-full grow", tabPosition: "left", items: tabItems.map((item, i) => {
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
                    react_1.default.createElement(antd_1.Input, { placeholder: "https://api.openai.com/v1/chat/completions", type: "url" })),
                react_1.default.createElement(antd_1.Form.Item, { name: "openApiKey", label: "\uD83D\uDD11 Your Open API Key" },
                    react_1.default.createElement(antd_1.Input, { placeholder: "We will not use your Key for any other purposes.", type: "password" })),
                react_1.default.createElement(antd_1.Form.Item, { name: "openApiModel", label: "\uD83E\uDD16 Model" },
                    react_1.default.createElement(antd_1.Input, { placeholder: "gpt-4o-mini", type: "text" }))),
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
                react_1.default.createElement(antd_1.Form.Item, { name: "model", label: "\uD83E\uDD16Model", extra: react_1.default.createElement("p", { style: {
                            // color: "#666",
                            padding: '8px'
                        } },
                        " ",
                        react_1.default.createElement("a", { target: "__blank", href: "https://jiangzilong.notion.site/Set-up-your-API-Key-API-Key-96266d5236fa462ca707683d9bb275c6" }, "Learn More\u2197\uFE0F")) },
                    react_1.default.createElement(antd_1.Input, { placeholder: "google/gemma-2-9b-it:free", type: "text" }))),
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
                                react_1.default.createElement("span", null, "Summarize Webpage Content")),
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
                                react_1.default.createElement("span", null, "Summarize Webpage Content"),
                                react_1.default.createElement("a", { target: "_blank", href: "https://jiangzilong.notion.site/1b1596b28b348073b66dd6d91b3fe60a?pvs=4" },
                                    react_1.default.createElement("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                        react_1.default.createElement("path", { d: "M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" })))),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxnREFBZ0QsbUJBQU8sQ0FBQyw0RkFBdUI7QUFDL0UsZ0NBQWdDLG1CQUFPLENBQUMsNENBQU87QUFDL0M7QUFDQSxzREFBc0QsMkNBQTJDO0FBQ2pHLCtDQUErQywwQ0FBMEM7QUFDekYsbURBQW1ELHFDQUFxQztBQUN4Rix1REFBdUQsK0NBQStDO0FBQ3RHLHNEQUFzRCxvQ0FBb0M7QUFDMUYsaURBQWlELDhKQUE4SjtBQUMvTSwrQ0FBK0MseUNBQXlDO0FBQ3hGLGlEQUFpRCwwTUFBME07QUFDM1AsdURBQXVELG9HQUFvRztBQUMzSiw0REFBNEQsODFCQUE4MUI7QUFDMTVCO0FBQ0EsaURBQWlELDZIQUE2SDtBQUM5Syx1REFBdUQsb0dBQW9HO0FBQzNKLDREQUE0RCxvNElBQW80STtBQUNoOEk7QUFDQSxpREFBaUQsaUxBQWlMO0FBQ2xPLHVEQUF1RCxvR0FBb0c7QUFDM0osNERBQTRELG1tQkFBbW1CO0FBQy9wQjtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7O0FDNUJGO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG9DQUFvQztBQUNuRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSwwQ0FBMEMsNEJBQTRCO0FBQ3RFLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlO0FBQ2YsNkJBQTZCLG1CQUFPLENBQUMsNENBQU87QUFDNUMsb0NBQW9DLG1CQUFPLENBQUMsb0RBQVc7QUFDdkQsK0JBQStCLG1CQUFPLENBQUMsa0dBQThCO0FBQ3JFLDhCQUE4QixtQkFBTyxDQUFDLG9DQUFPO0FBQzdDLGtDQUFrQyxtQkFBTyxDQUFDLGtFQUFtQjtBQUM3RCw2QkFBNkIsbUJBQU8sQ0FBQyxrREFBYztBQUNuRCw4QkFBOEIsbUJBQU8sQ0FBQyxvREFBZTtBQUNyRCwrQkFBK0IsbUJBQU8sQ0FBQyw0REFBZ0I7QUFDdkQsa0NBQWtDLG1CQUFPLENBQUMsNERBQW1CO0FBQzdELGtCQUFrQixtQkFBTyxDQUFDLDJFQUFxQjtBQUMvQyxlQUFlLG1CQUFPLENBQUMsNkNBQU07QUFDN0IsZUFBZSxtQkFBTyxDQUFDLDhCQUFTO0FBQ2hDLGVBQWUsbUJBQU8sQ0FBQyxxQ0FBUTtBQUMvQixtQkFBbUIsbUJBQU8sQ0FBQyw4Q0FBaUI7QUFDNUMsbUJBQU8sQ0FBQyw0Q0FBYTtBQUNyQixtQkFBTyxDQUFDLHFDQUFjO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsbURBQW1EO0FBQy9HO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RSxrREFBa0Q7QUFDMUgsU0FBUztBQUNUO0FBQ0E7QUFDQSxxRUFBcUUsa0RBQWtEO0FBQ3ZILFNBQVM7QUFDVDtBQUNBO0FBQ0EsbUVBQW1FLGtEQUFrRDtBQUNySCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHdFQUF3RSxrREFBa0Q7QUFDMUgsU0FBUztBQUNUO0FBQ0E7QUFDQSxvRUFBb0Usa0RBQWtEO0FBQ3RILFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsa0NBQXlCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxpRkFBaUYsU0FBUyw4QkFBOEI7QUFDeEgsK0NBQStDLGtEQUFrRDtBQUNqRztBQUNBLG1EQUFtRCx3REFBd0Q7QUFDM0csdUVBQXVFO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6Qix1QkFBdUI7QUFDdkIsaUVBQWlFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixHQUFHO0FBQzVCO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNyS2E7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsb0NBQW9DO0FBQ25EO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLDBDQUEwQyw0QkFBNEI7QUFDdEUsQ0FBQztBQUNEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDZCQUE2QixtQkFBTyxDQUFDLDRDQUFPO0FBQzVDLGVBQWUsbUJBQU8sQ0FBQyw2Q0FBTTtBQUM3QixpQkFBaUIsbUJBQU8sQ0FBQywwQ0FBVztBQUNwQyx1QkFBdUIsbUJBQU8sQ0FBQyxzRUFBYztBQUM3QyxjQUFjLHVCQUF1QjtBQUNyQztBQUNBLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLHlEQUF5RDtBQUN6RCx1QkFBdUI7QUFDdkIsOEJBQThCO0FBQzlCO0FBQ0EsOERBQThELHNEQUFzRDtBQUNwSCxvRUFBb0Usb0VBQW9FLG9DQUFvQztBQUM1Syx5RUFBeUUsaUNBQWlDLGtDQUFrQztBQUM1SSx5RUFBeUUsa0NBQWtDLGtDQUFrQztBQUM3SSx5RUFBeUUsMEJBQTBCLGtDQUFrQztBQUNySSx5RUFBeUUsOEJBQThCLGtDQUFrQztBQUN6STtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixrRUFBa0UsOEZBQThGO0FBQ2hLLG1FQUFtRSxpQkFBaUIsNkVBQTZFLDhCQUE4QjtBQUMvTCxtREFBbUQ7QUFDbkQ7QUFDQSxtQkFBbUI7QUFDbkIsa0VBQWtFLHdHQUF3RztBQUMxSztBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCx1SEFBdUgsOEJBQThCO0FBQ2xOLGtFQUFrRSx3RUFBd0U7QUFDMUksa0VBQWtFLDZEQUE2RDtBQUMvSCxrRUFBa0UsbUZBQW1GO0FBQ3JKLGtFQUFrRSxtREFBbUQ7QUFDckgsa0VBQWtFLDBDQUEwQztBQUM1RyxtREFBbUQ7QUFDbkQ7QUFDQSxtQkFBbUI7QUFDbkIsa0VBQWtFLDhEQUE4RDtBQUNoSSxrRUFBa0Usb0RBQW9EO0FBQ3RILGtFQUFrRSw2RkFBNkY7QUFDL0o7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQSw2REFBNkQscUhBQXFILDhCQUE4QjtBQUNoTixrRUFBa0UscUNBQXFDO0FBQ3ZHLG1EQUFtRDtBQUNuRDtBQUNBLG1CQUFtQjtBQUNuQixrRUFBa0UsdURBQXVELHdCQUF3QjtBQUNqSixrRUFBa0UsbUZBQW1GO0FBQ3JKLGtFQUFrRSx1RkFBdUY7QUFDeko7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBLDZEQUE2RCx5SEFBeUgsOEJBQThCO0FBQ3BOLGtFQUFrRSx3REFBd0Q7QUFDMUgsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUN0SEY7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsb0NBQW9DO0FBQ25EO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLDBDQUEwQyw0QkFBNEI7QUFDdEUsQ0FBQztBQUNEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsY0FBYztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDZCQUE2QixtQkFBTyxDQUFDLDRDQUFPO0FBQzVDLGVBQWUsbUJBQU8sQ0FBQyw2Q0FBTTtBQUM3QixlQUFlLG1CQUFPLENBQUMsb0NBQWU7QUFDdEMsdUJBQXVCLG1CQUFPLENBQUMsc0VBQWM7QUFDN0MsZ0JBQWdCLG1CQUFPLENBQUMsdUVBQW1CO0FBQzNDLFFBQVEsV0FBVztBQUNuQixnQkFBZ0IsdUJBQXVCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0U7QUFDdEU7QUFDQTtBQUNBLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsSUFBSTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLEtBQUs7QUFDTDtBQUNBLHFFQUFxRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxpREFBaUQsU0FBUyxpQ0FBaUMsMkhBQTJIO0FBQ3ROO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhHQUE4RyxTQUFTLHlDQUF5QyxVQUFVLEtBQUs7QUFDL0ssOERBQThELHNCQUFzQixhQUFhLG1CQUFtQiw2Q0FBNkMsa0NBQWtDO0FBQ25NO0FBQ0EsMEJBQTBCLFlBQVk7QUFDdEMseUVBQXlFLFVBQVU7QUFDbkYsbUZBQW1GLHNHQUFzRztBQUN6TDtBQUNBO0FBQ0Esd0ZBQXdGLGVBQWUsMkVBQTJFO0FBQ2xMLDJFQUEyRSxrR0FBa0c7QUFDN0sscUdBQXFHLHdCQUF3QjtBQUM3SCx3RkFBd0YsZUFBZSwyRUFBMkU7QUFDbEwsMkVBQTJFLG1HQUFtRztBQUM5SztBQUNBLG9GQUFvRix3QkFBd0I7QUFDNUc7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBLDJLQUEySyxjQUFjLHdEQUF3RCw0QkFBNEI7QUFDN1E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQyxzRkFBc0YsdUVBQXVFO0FBQzdKLDBFQUEwRSw0Q0FBNEMsd0JBQXdCO0FBQzlJO0FBQ0EsNkNBQTZDLFdBQVcsSUFBSSxPQUFPLE1BQU07QUFDekUseUJBQXlCO0FBQ3pCLCtEQUErRCwrQ0FBK0M7QUFDOUc7QUFDQTtBQUNBLDRFQUE0RSxpQkFBaUI7QUFDN0YsK0VBQStFO0FBQy9FO0FBQ0EsdUdBQXVHO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEVBQTRFLHlCQUF5QjtBQUNyRywrRUFBK0U7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekMscUNBQXFDLG1FQUFtRTtBQUN4RztBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsbUVBQW1FLG1LQUFtSztBQUN0TywrQ0FBK0Msb0JBQW9CO0FBQ25FLG1EQUFtRCxtRkFBbUY7QUFDdEksbURBQW1ELHFCQUFxQjtBQUN4RSxxREFBcUQsb0JBQW9CO0FBQ3pFLHVEQUF1RCw2Q0FBNkM7QUFDcEcsMERBQTBELDZCQUE2QixLQUFLLFdBQVc7QUFDdkc7QUFDQSwwREFBMEQsNkJBQTZCLEtBQUssVUFBVTtBQUN0RztBQUNBLDBEQUEwRCw2QkFBNkIsS0FBSyxPQUFPO0FBQ25HO0FBQ0EsMERBQTBELDZCQUE2QixLQUFLLE9BQU87QUFDbkc7QUFDQSwwREFBMEQsNkJBQTZCLEtBQUssWUFBWTtBQUN4RztBQUNBLDBEQUEwRCw2QkFBNkIsS0FBSyxRQUFRO0FBQ3BHO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUNwVEY7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsb0NBQW9DO0FBQ25EO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLDBDQUEwQyw0QkFBNEI7QUFDdEUsQ0FBQztBQUNEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsNkJBQTZCLG1CQUFPLENBQUMsNENBQU87QUFDNUMsZUFBZSxtQkFBTyxDQUFDLDZDQUFNO0FBQzdCLGdCQUFnQixtQkFBTyxDQUFDLHVFQUFtQjtBQUMzQyxpQkFBaUIsbUJBQU8sQ0FBQyw0REFBeUI7QUFDbEQsbUJBQW1CLG1CQUFPLENBQUMsaURBQW9CO0FBQy9DLHVCQUF1QixtQkFBTyxDQUFDLHNFQUFjO0FBQzdDLDBDQUEwQyxtQkFBTyxDQUFDLGdGQUFpQjtBQUNuRSxlQUFlLHVCQUF1QjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFFBQVE7QUFDbEMsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxxREFBcUQsMERBQTBELFNBQVMsd0JBQXdCO0FBQ2hKLDhEQUE4RDtBQUM5RCwwQkFBMEI7QUFDMUIsMkJBQTJCO0FBQzNCLDhEQUE4RCxTQUFTLG9CQUFvQixrREFBa0QsU0FBUyxzQkFBc0I7QUFDNUs7QUFDQSxvT0FBb08seUJBQXlCLGtEQUFrRDtBQUMvUyxtREFBbUQsd0JBQXdCO0FBQzNFLG1EQUFtRCxnRUFBZ0U7QUFDbkgsdURBQXVELGdFQUFnRTtBQUN2SCwwREFBMEQseUVBQXlFO0FBQ25JLHVEQUF1RCwyQ0FBMkM7QUFDbEcsMkRBQTJELDRJQUE0STtBQUN2TSwrREFBK0QsdUNBQXVDO0FBQ3RHLGtFQUFrRSxxQ0FBcUM7QUFDdkcsaUVBQWlFLG1EQUFtRDtBQUNwSCxtRUFBbUUsaURBQWlEO0FBQ3BILHdFQUF3RSwyQ0FBMkM7QUFDbkgsOERBQThELHFEQUFxRDtBQUNuSCxrRUFBa0UsMENBQTBDO0FBQzVHLHVFQUF1RSxxSUFBcUk7QUFDNU0sNEVBQTRFLG1LQUFtSztBQUMvTztBQUNBLGtFQUFrRSwwQ0FBMEM7QUFDNUcsdUVBQXVFLHFJQUFxSTtBQUM1TSw0RUFBNEUsbUtBQW1LO0FBQy9PO0FBQ0Esa0VBQWtFLDBDQUEwQztBQUM1Ryx1RUFBdUUscUlBQXFJO0FBQzVNLDRFQUE0RSxtS0FBbUs7QUFDL087QUFDQSxrRUFBa0UsMENBQTBDO0FBQzVHLHVFQUF1RSw0SEFBNEg7QUFDbk0sNEVBQTRFLDhrQkFBOGtCO0FBQzFwQjtBQUNBLGtFQUFrRSwwQ0FBMEM7QUFDNUcsdUVBQXVFLDRIQUE0SDtBQUNuTSw0RUFBNEUsOGtCQUE4a0I7QUFDMXBCO0FBQ0Esa0VBQWtFLDBDQUEwQztBQUM1Ryx1RUFBdUUsNEhBQTRIO0FBQ25NLDRFQUE0RSw4a0JBQThrQjtBQUMxcEI7QUFDQSxrRUFBa0UsMENBQTBDO0FBQzVHLHVFQUF1RSw0SEFBNEg7QUFDbk0sNEVBQTRFLDhrQkFBOGtCO0FBQzFwQjtBQUNBLGtFQUFrRSwwQ0FBMEM7QUFDNUcsdUVBQXVFLDRIQUE0SDtBQUNuTSw0RUFBNEUsOGtCQUE4a0I7QUFDMXBCO0FBQ0Esa0VBQWtFLDBDQUEwQztBQUM1Ryx1RUFBdUUsNEhBQTRIO0FBQ25NLDRFQUE0RSw4a0JBQThrQjtBQUMxcEI7QUFDQSwyREFBMkQsNElBQTRJO0FBQ3ZNLCtEQUErRCx1Q0FBdUM7QUFDdEcsa0VBQWtFLHFDQUFxQztBQUN2RyxpRUFBaUUsbURBQW1EO0FBQ3BILG1FQUFtRSxpREFBaUQ7QUFDcEgsd0VBQXdFLDJDQUEyQztBQUNuSCw4REFBOEQscURBQXFEO0FBQ25ILGtFQUFrRSwwQ0FBMEM7QUFDNUcsdUVBQXVFLHFJQUFxSTtBQUM1TSw0RUFBNEUsbUtBQW1LO0FBQy9PO0FBQ0Esa0VBQWtFLDBDQUEwQztBQUM1Ryx1RUFBdUUscUlBQXFJO0FBQzVNLDRFQUE0RSxtS0FBbUs7QUFDL087QUFDQSxrRUFBa0UsMENBQTBDO0FBQzVHLHVFQUF1RSxxSUFBcUk7QUFDNU0sNEVBQTRFLG1LQUFtSztBQUMvTztBQUNBLGtFQUFrRSwwQ0FBMEM7QUFDNUcsdUVBQXVFLHFJQUFxSTtBQUM1TSw0RUFBNEUsbUtBQW1LO0FBQy9PO0FBQ0EscUVBQXFFLGtHQUFrRztBQUN2SywyRUFBMkUsb0dBQW9HO0FBQy9LLGdGQUFnRixtNEJBQW00QjtBQUNuOUIsa0VBQWtFLDBDQUEwQztBQUM1Ryx1RUFBdUUscUlBQXFJO0FBQzVNLDRFQUE0RSxtS0FBbUs7QUFDL087QUFDQSxxRUFBcUUsOEhBQThIO0FBQ25NLDJFQUEyRSxvR0FBb0c7QUFDL0ssZ0ZBQWdGLG00QkFBbTRCO0FBQ245QixrRUFBa0UsMENBQTBDO0FBQzVHLHVFQUF1RSxxSUFBcUk7QUFDNU0sNEVBQTRFLG1LQUFtSztBQUMvTztBQUNBLHFFQUFxRSxnSEFBZ0g7QUFDckwsMkVBQTJFLG9HQUFvRztBQUMvSyxnRkFBZ0YsbTRCQUFtNEI7QUFDbjlCLGtFQUFrRSwwQ0FBMEM7QUFDNUcsdUVBQXVFLHFJQUFxSTtBQUM1TSw0RUFBNEUsbUtBQW1LO0FBQy9PO0FBQ0EscUVBQXFFLHFJQUFxSTtBQUMxTSwyRUFBMkUsb0dBQW9HO0FBQy9LLGdGQUFnRixtNEJBQW00QjtBQUNuOUIsa0VBQWtFLDBDQUEwQztBQUM1Ryx1RUFBdUUscUlBQXFJO0FBQzVNLDRFQUE0RSxtS0FBbUs7QUFDL087QUFDQSxxRUFBcUUscUhBQXFIO0FBQzFMLDJFQUEyRSxvR0FBb0c7QUFDL0ssZ0ZBQWdGLG00QkFBbTRCO0FBQ245QixrRUFBa0UsMENBQTBDO0FBQzVHLHVFQUF1RSxxSUFBcUk7QUFDNU0sNEVBQTRFLG1LQUFtSztBQUMvTztBQUNBLHFFQUFxRSx1SEFBdUg7QUFDNUwsMkVBQTJFLG9HQUFvRztBQUMvSyxnRkFBZ0YsbTRCQUFtNEI7QUFDbjlCLDZEQUE2RDtBQUM3RDtBQUNBLDZCQUE2QiwwS0FBMEs7QUFDdk07QUFDQSxpRUFBaUUsc0xBQXNMO0FBQ3ZQLDBFQUEwRSw2RkFBNkY7QUFDdkssdUVBQXVFLDhEQUE4RDtBQUNySTtBQUNBLDJFQUEyRSx5Q0FBeUM7QUFDcEg7QUFDQTtBQUNBO0FBQ0EsNkVBQTZFLHdIQUF3SDtBQUNyTTtBQUNBLGtCQUFlOzs7Ozs7Ozs7OztBQzNNRjtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxvQ0FBb0M7QUFDbkQ7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsMENBQTBDLDRCQUE0QjtBQUN0RSxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsNkJBQTZCLG1CQUFPLENBQUMsNENBQU87QUFDNUMsZUFBZSxtQkFBTyxDQUFDLDZDQUFNO0FBQzdCLHVCQUF1QixtQkFBTyxDQUFDLHNFQUFjO0FBQzdDLG1CQUFtQix1QkFBdUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRSxTQUFTLHdCQUF3QjtBQUNuRztBQUNBLDhEQUE4RDtBQUM5RCwyREFBMkQsZ0VBQWdFLElBQUk7QUFDL0g7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7O1VDcERmO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Q7V0FDdEQsc0NBQXNDLGlFQUFpRTtXQUN2RztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBOzs7OztXQ1ZBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1dDaERBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9PcHRpb25zL05hdi50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvT3B0aW9ucy9pbmRleC50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvT3B0aW9ucy9zZWN0aW9uL0FJLnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9PcHRpb25zL3NlY3Rpb24vQW5raS9pbmRleC50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvT3B0aW9ucy9zZWN0aW9uL1Byby50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvT3B0aW9ucy9zZWN0aW9uL1lvdXR1YmUudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NyZWF0ZSBmYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhcm1vbnkgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgTmF2ID0gKCkgPT4ge1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIiwgeyBjbGFzc05hbWU6IFwidy1mdWxsIHAtOCBmbGV4IGl0ZW1zLWNlbnRlclwiIH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGZsZXgtYXV0b1wiIH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2ZsZXggaXRlbXMtY2VudGVyIG1yLTInIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBjbGFzc05hbWU6IFwidy01IGgtNSBtci0yXCIsIHNyYzogXCJpY29uMTI4LnBuZ1wiIH0pLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGV4dC14bCB0ZXh0LWdyYXktODAwXCIgfSwgXCJTY291dGVyXCIpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWdyYXktNTAwIHRleHQtc20gcHQtMVwiLCB0YXJnZXQ6ICdfYmxhbmsnLCBocmVmOiAnaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9WZXJzaW9uLUNoYW5nZS1sb2ctNzlhZTkyNDNiYWZiNDhkYWIzMTYwZjEwZWQ5MGY1ODQ/cHZzPTQnIH0sIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5nZXRNYW5pZmVzdCgpLnZlcnNpb24pKSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdmbGV4IGZsZXgtcm93IGl0ZW1zLWNlbnRlcicgfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWdyYXktODAwICB0ZXh0LXNtIG1yLTQgZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXJcIiwgdGFyZ2V0OiAnX2JsYW5rJywgaHJlZjogJ2h0dHBzOi8vamlhbmd6aWxvbmcubm90aW9uLnNpdGUvM2RjNWI4ZGE4NmI2NDUxMjk2ZmMzMjZjMzQwY2U2YmE/dj1jNDAxMDJiNzFjM2I0ODg4OGNhN2YzNzUyNWY2YTMzMCZwdnM9NCcgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IHdpZHRoOiBcIjE1XCIsIGhlaWdodDogXCIxNVwiLCB2aWV3Qm94OiBcIjAgMCAxNSAxNVwiLCBmaWxsOiBcIm5vbmVcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBkOiBcIk0zIDIuNUMzIDIuMjIzODYgMy4yMjM4NiAyIDMuNSAySDkuMDg1NzlDOS4yMTgzOSAyIDkuMzQ1NTcgMi4wNTI2OCA5LjQzOTM0IDIuMTQ2NDVMMTEuODUzNiA0LjU2MDY2QzExLjk0NzMgNC42NTQ0MyAxMiA0Ljc4MTYxIDEyIDQuOTE0MjFWMTIuNUMxMiAxMi43NzYxIDExLjc3NjEgMTMgMTEuNSAxM0gzLjVDMy4yMjM4NiAxMyAzIDEyLjc3NjEgMyAxMi41VjIuNVpNMy41IDFDMi42NzE1NyAxIDIgMS42NzE1NyAyIDIuNVYxMi41QzIgMTMuMzI4NCAyLjY3MTU3IDE0IDMuNSAxNEgxMS41QzEyLjMyODQgMTQgMTMgMTMuMzI4NCAxMyAxMi41VjQuOTE0MjFDMTMgNC41MTYzOSAxMi44NDIgNC4xMzQ4NiAxMi41NjA3IDMuODUzNTVMMTAuMTQ2NCAxLjQzOTM0QzkuODY1MTQgMS4xNTgwNCA5LjQ4MzYxIDEgOS4wODU3OSAxSDMuNVpNNC41IDRDNC4yMjM4NiA0IDQgNC4yMjM4NiA0IDQuNUM0IDQuNzc2MTQgNC4yMjM4NiA1IDQuNSA1SDcuNUM3Ljc3NjE0IDUgOCA0Ljc3NjE0IDggNC41QzggNC4yMjM4NiA3Ljc3NjE0IDQgNy41IDRINC41Wk00LjUgN0M0LjIyMzg2IDcgNCA3LjIyMzg2IDQgNy41QzQgNy43NzYxNCA0LjIyMzg2IDggNC41IDhIMTAuNUMxMC43NzYxIDggMTEgNy43NzYxNCAxMSA3LjVDMTEgNy4yMjM4NiAxMC43NzYxIDcgMTAuNSA3SDQuNVpNNC41IDEwQzQuMjIzODYgMTAgNCAxMC4yMjM5IDQgMTAuNUM0IDEwLjc3NjEgNC4yMjM4NiAxMSA0LjUgMTFIMTAuNUMxMC43NzYxIDExIDExIDEwLjc3NjEgMTEgMTAuNUMxMSAxMC4yMjM5IDEwLjc3NjEgMTAgMTAuNSAxMEg0LjVaXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICBcIldpa2lcIiksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1ncmF5LTgwMCB0ZXh0LXNtIG1yLTQgZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXJcIiwgdGFyZ2V0OiAnX2JsYW5rJywgaHJlZjogJ2h0dHBzOi8vZGlzY29yZC5nZy93TWFNbUg3TU1LJyB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgd2lkdGg6IFwiMTVcIiwgaGVpZ2h0OiBcIjE1XCIsIHZpZXdCb3g6IFwiMCAwIDE1IDE1XCIsIGZpbGw6IFwibm9uZVwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiLCBkOiBcIk01LjA3NDUxIDEuODI1ODRDNS4wMzI2NyAxLjgxOTI2IDQuOTkwMTQgMS44MTgyNSA0Ljk0ODAzIDEuODIyODRDNC4xMDY4MyAxLjkxNDQ2IDIuODI2NzMgMi4zNjgyOCAyLjA3MTE1IDIuNzc4MDhDMi4wMjEwNiAyLjgwNTI1IDEuOTc2MjEgMi44NDExMiAxLjkzODY5IDIuODg0MDJDMS42MjUwMiAzLjI0MjY2IDEuMzQwNDYgMy44MjgzNiAxLjExNzA2IDQuMzgxODZDMC44ODc0NDcgNC45NTA3NiAwLjY5NzI5MyA1LjU1MDMyIDAuNTg4OTM3IDUuOTgzNTRDMC4yMzYyMzIgNy4zOTM2OSAwLjA0MjUwMiA5LjA4NzI4IDAuMDE3NDk0OCAxMC42OTI1QzAuMDE2MjQyOSAxMC43NzI5IDAuMDM1MTg4MyAxMC44NTIzIDAuMDcyNTkzMSAxMC45MjM0QzAuMzczNjc5IDExLjQ5NiAxLjAyMDE1IDEyLjAyNyAxLjY2ODA5IDEyLjQxNTJDMi4zMjMzMiAxMi44MDc4IDMuMDg3MzIgMTMuMTE4MiAzLjcwMzg1IDEzLjE3NzhDMy44NTMzNSAxMy4xOTIyIDQuMDAwOTggMTMuMTM1OCA0LjEwMjgyIDEzLjAyNTVDNC4yNTcyIDEyLjg1ODEgNC41MTkzIDEyLjQ2NzYgNC43MTc0NSAxMi4xNjQzQzQuODA3MzkgMTIuMDI2NyA0Ljg5MTU3IDExLjg5NTMgNC45NTg0NSAxMS43OTAxQzUuNjIwMjMgMTEuOTEwNiA2LjQ1MDQzIDExLjk4MDEgNy41MDAwMiAxMS45ODAxQzguNTQ4NDQgMTEuOTgwMSA5LjM3Nzk2IDExLjkxMDcgMTAuMDM5NCAxMS43OTA1QzEwLjEwNjIgMTEuODk1NyAxMC4xOTAzIDEyLjAyNjkgMTAuMjgwMSAxMi4xNjQzQzEwLjQ3ODMgMTIuNDY3NiAxMC43NDA0IDEyLjg1ODEgMTAuODk0NyAxMy4wMjU1QzEwLjk5NjYgMTMuMTM1OCAxMS4xNDQyIDEzLjE5MjIgMTEuMjkzNyAxMy4xNzc4QzExLjkxMDIgMTMuMTE4MiAxMi42NzQyIDEyLjgwNzggMTMuMzI5NSAxMi40MTUyQzEzLjk3NzQgMTIuMDI3IDE0LjYyMzkgMTEuNDk2IDE0LjkyNSAxMC45MjM0QzE0Ljk2MjQgMTAuODUyMyAxNC45ODEzIDEwLjc3MjkgMTQuOTgwMSAxMC42OTI1QzE0Ljk1NTEgOS4wODcyOCAxNC43NjEzIDcuMzkzNjkgMTQuNDA4NiA1Ljk4MzU0QzE0LjMwMDMgNS41NTAzMiAxNC4xMTAxIDQuOTUwNzYgMTMuODgwNSA0LjM4MTg2QzEzLjY1NzEgMy44MjgzNiAxMy4zNzI1IDMuMjQyNjYgMTMuMDU4OSAyLjg4NDAyQzEzLjAyMTQgMi44NDExMiAxMi45NzY1IDIuODA1MjUgMTIuOTI2NCAyLjc3ODA4QzEyLjE3MDggMi4zNjgyOCAxMC44OTA3IDEuOTE0NDYgMTAuMDQ5NSAxLjgyMjg0QzEwLjAwNzQgMS44MTgyNSA5Ljk2NDg5IDEuODE5MjYgOS45MjMwNSAxLjgyNTg0QzkuNzE2NzYgMS44NTgyNSA5LjUzOTEgMS45NjQ1OCA5LjQwODA5IDIuMDYzNTVDOS4yNjk3NyAyLjE2ODA0IDkuMTQxMyAyLjI5NjY4IDkuMDMwNCAyLjQyNjgyQzguODY5NjggMi42MTU0NCA4LjcxNDM3IDIuODQ0ODggOC42MTQyOCAzLjA2MjI1QzguMjcyMzcgMy4wMzUwMSA3LjkwMTM4IDMuMDIgNy41IDMuMDJDNy4wOTc3IDMuMDIgNi43MjU5MyAzLjAzNTA4IDYuMzgzMzcgMy4wNjI0NEM2LjI4MzI4IDIuODQ1MDEgNi4xMjc5MiAyLjYxNTQ5IDUuOTY3MTYgMi40MjY4MkM1Ljg1NjI2IDIuMjk2NjggNS43Mjc3OCAyLjE2ODA0IDUuNTg5NDcgMi4wNjM1NUM1LjQ1ODQ2IDEuOTY0NTggNS4yODA4IDEuODU4MjUgNS4wNzQ1MSAxLjgyNTg0Wk0xMS4wMTgxIDExLjUzODJDMTEuMDM5NSAxMS41NzEzIDExLjA2MTUgMTEuNjA1MSAxMS4wODM4IDExLjYzOTJDMTEuMjE2OSAxMS44NDMgMTEuMzQ4NyAxMi4wMzg1IDExLjQ1MDggMTIuMTgwOUMxMS44NDc1IDEyLjA5MTYgMTIuMzUyIDExLjg4MTggMTIuODM2MSAxMS41OTE3QzEzLjM3OTUgMTEuMjY2MSAxMy44MDk4IDEwLjg5MTggMTQuMDE3NyAxMC41NzM5QzEzLjk4NTIgOS4wNjc1OCAxMy43OTkzIDcuNTAzNjkgMTMuNDc3MyA2LjIxNjQ4QzEzLjM4IDUuODI3NTkgMTMuMjAzOCA1LjI3MDIxIDEyLjk5MDMgNC43NDExN0MxMi43ODkzIDQuMjQzMjYgMTIuNTc1MyAzLjgyMTYyIDEyLjM4OCAzLjU3OTJDMTEuNzM3NiAzLjI0MjE5IDEwLjcxMjkgMi44ODU4MiAxMC4wNDU0IDIuNzg5ODdDMTAuMDMwOCAyLjc5ODM5IDEwLjAxMTMgMi44MTEwMiA5Ljk4Njc1IDIuODI5NTVDOS45MTg2MyAyLjg4MSA5Ljg0MDE4IDIuOTU2NjYgOS43NjExMSAzLjA0OTQ1QzkuNzE5NTkgMy4wOTgxNyA5LjY4MTY2IDMuMTQ3MSA5LjY0NzY4IDMuMTk0NDlDOS45NTMgMy4yNTAzMSAxMC4yMjUzIDMuMzE3MSAxMC40NjYyIDMuMzkxMjNDMTEuMTQ5OSAzLjYwMTYgMTEuNjQyOCAzLjg5MDM5IDExLjg4NCA0LjIxMkMxMi4wNDMxIDQuNDI0MDggMTIuMDAwMSA0LjcyNDk0IDExLjc4OCA0Ljg4NEMxMS41NzU5IDUuMDQzMDYgMTEuMjc1MSA1LjAwMDA4IDExLjExNiA0Ljc4OEMxMS4wNTcyIDQuNzA5NjEgMTAuODAwMSA0LjQ5ODQgMTAuMTgzOCA0LjMwODc3QzkuNTg5MzMgNC4xMjU4NSA4LjcxMzU2IDMuOTggNy41IDMuOThDNi4yODY0NCAzLjk4IDUuNDEwNjcgNC4xMjU4NSA0LjgxNjE2IDQuMzA4NzdDNC4xOTk4OCA0LjQ5ODQgMy45NDI3OSA0LjcwOTYxIDMuODg0IDQuNzg4QzMuNzI0OTQgNS4wMDAwOCAzLjQyNDA4IDUuMDQzMDYgMy4yMTIgNC44ODRDMi45OTk5MiA0LjcyNDk0IDIuOTU2OTQgNC40MjQwOCAzLjExNiA0LjIxMkMzLjM1NzIxIDMuODkwMzkgMy44NTAxMSAzLjYwMTYgNC41MzM4MyAzLjM5MTIzQzQuNzc0MTggMy4zMTcyNyA1LjA0NTcxIDMuMjUwNjIgNS4zNTAxNiAzLjE5NDg4QzUuMzE2MTEgMy4xNDczOCA1LjI3ODA4IDMuMDk4MzEgNS4yMzY0NSAzLjA0OTQ1QzUuMTU3MzggMi45NTY2NiA1LjA3ODkzIDIuODgxIDUuMDEwODEgMi44Mjk1NUM0Ljk4NjI4IDIuODExMDIgNC45NjY3NCAyLjc5ODM5IDQuOTUyMTcgMi43ODk4N0M0LjI4NDY0IDIuODg1ODIgMy4yNTk5OSAzLjI0MjE5IDIuNjA5NTQgMy41NzkyQzIuNDIyMjYgMy44MjE2MiAyLjIwODI1IDQuMjQzMjYgMi4wMDcyOSA0Ljc0MTE3QzEuNzkzNzYgNS4yNzAyMSAxLjYxNzUyIDUuODI3NTkgMS41MjAyNSA2LjIxNjQ4QzEuMTk4MjkgNy41MDM2OSAxLjAxMjM2IDkuMDY3NTggMC45Nzk4NiAxMC41NzM5QzEuMTg3NzIgMTAuODkxOCAxLjYxODA3IDExLjI2NjEgMi4xNjE0OCAxMS41OTE3QzIuNjQ1NTcgMTEuODgxOCAzLjE1MDAzIDEyLjA5MTYgMy41NDY4IDEyLjE4MDlDMy42NDg4NSAxMi4wMzg1IDMuNzgwNjUgMTEuODQzIDMuOTEzOCAxMS42MzkyQzMuOTM2MjYgMTEuNjA0OCAzLjk1ODM4IDExLjU3MDggMy45Nzk5NiAxMS41Mzc1QzMuMTk1MjEgMTEuMjU5MSAyLjc3MzYxIDEwLjg3NTggMi41MDA2NCAxMC40NjY0QzIuMzUzNTkgMTAuMjQ1OCAyLjQxMzIgOS45NDc3OCAyLjYzMzc3IDkuODAwNzRDMi44NTQzNSA5LjY1MzY5IDMuMTUyMzYgOS43MTMyOSAzLjI5OTQxIDkuOTMzODdDMy41NjA3NyAxMC4zMjU5IDQuMjQzNTUgMTEuMDIwMSA3LjUwMDAyIDExLjAyMDFDMTAuNzU2NSAxMS4wMjAxIDExLjQzOTIgMTAuMzI2IDExLjcwMDYgOS45MzM4NkMxMS44NDc3IDkuNzEzMjkgMTIuMTQ1NyA5LjY1MzY5IDEyLjM2NjMgOS44MDA3NEMxMi41ODY5IDkuOTQ3NzkgMTIuNjQ2NSAxMC4yNDU4IDEyLjQ5OTQgMTAuNDY2NEMxMi4yMjYyIDEwLjg3NjIgMTEuODA0MSAxMS4yNTk4IDExLjAxODEgMTEuNTM4MlpNNC4wODA0OSA3LjAxMjIxQzQuMzI0MTIgNi43NDk4NCA0LjY1NDc2IDYuNjAxNjIgNS4wMDAwNyA2LjU5OTk4QzUuMzQ1MzggNi42MDE2MiA1LjY3NjAzIDYuNzQ5ODQgNS45MTk2NiA3LjAxMjIxQzYuMTYzMjkgNy4yNzQ1OSA2LjMwMDA3IDcuNjI5NzQgNi4zMDAwNyA3Ljk5OTk4QzYuMzAwMDcgOC4zNzAyMSA2LjE2MzI5IDguNzI1MzYgNS45MTk2NiA4Ljk4Nzc0QzUuNjc2MDMgOS4yNTAxMSA1LjM0NTM4IDkuMzk4MzMgNS4wMDAwNyA5LjM5OTk4QzQuNjU0NzYgOS4zOTgzMyA0LjMyNDEyIDkuMjUwMTEgNC4wODA0OSA4Ljk4Nzc0QzMuODM2ODUgOC43MjUzNiAzLjcwMDA3IDguMzcwMjEgMy43MDAwNyA3Ljk5OTk4QzMuNzAwMDcgNy42Mjk3NCAzLjgzNjg1IDcuMjc0NTkgNC4wODA0OSA3LjAxMjIxWk05Ljk5ODg1IDYuNTk5OThDOS42NTM1NCA2LjYwMTYyIDkuMzIyOSA2Ljc0OTg0IDkuMDc5MjYgNy4wMTIyMUM4LjgzNTYzIDcuMjc0NTkgOC42OTg4NSA3LjYyOTc0IDguNjk4ODUgNy45OTk5OEM4LjY5ODg1IDguMzcwMjEgOC44MzU2MyA4LjcyNTM2IDkuMDc5MjYgOC45ODc3NEM5LjMyMjkgOS4yNTAxMSA5LjY1MzU0IDkuMzk4MzMgOS45OTg4NSA5LjM5OTk4QzEwLjM0NDIgOS4zOTgzMyAxMC42NzQ4IDkuMjUwMTEgMTAuOTE4NCA4Ljk4Nzc0QzExLjE2MjEgOC43MjUzNiAxMS4yOTg5IDguMzcwMjEgMTEuMjk4OSA3Ljk5OTk4QzExLjI5ODkgNy42Mjk3NCAxMS4xNjIxIDcuMjc0NTkgMTAuOTE4NCA3LjAxMjIxQzEwLjY3NDggNi43NDk4NCAxMC4zNDQyIDYuNjAxNjIgOS45OTg4NSA2LjU5OTk4WlwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiIH0pKSxcbiAgICAgICAgICAgICAgICBcIkRpc2NvcmRcIiksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1ncmF5LTgwMCB0ZXh0LXNtIG1yLTQgZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXJcIiwgdGFyZ2V0OiAnX2JsYW5rJywgaHJlZjogJ2h0dHBzOi8vY2hyb21ld2Vic3RvcmUuZ29vZ2xlLmNvbS9kZXRhaWwvc2NvdXRlci9tbmNmY2puYWJwZm9hZ29jYW5mamdsZmNwbW1ua2ljYicgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IHdpZHRoOiBcIjE1XCIsIGhlaWdodDogXCIxNVwiLCB2aWV3Qm94OiBcIjAgMCAxNSAxNVwiLCBmaWxsOiBcIm5vbmVcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBkOiBcIk0xLjM1MjQ4IDQuOTA1MzJDMS4zNTI0OCAyLjk0NDk4IDIuOTM2IDEuMzUyNDggNC44OTM0NiAxLjM1MjQ4QzYuMjU3NjkgMS4zNTI0OCA2Ljg2MDU4IDEuOTIzMzYgNy41MDAwMiAyLjkzNTQ1QzguMTM5NDYgMS45MjMzNiA4Ljc0MjM1IDEuMzUyNDggMTAuMTA2NiAxLjM1MjQ4QzEyLjA2NCAxLjM1MjQ4IDEzLjY0NzYgMi45NDQ5OCAxMy42NDc2IDQuOTA1MzJDMTMuNjQ3NiA2Ljc0MDQxIDEyLjYwMTMgOC41MDUwOCAxMS40MDA4IDkuOTY5MjdDMTAuMjYzNiAxMS4zNTYyIDguOTIxOTQgMTIuNTUwOCA4LjAwNjAxIDEzLjM2NjRDNy45NDY0NSAxMy40MTk0IDcuODg4NjkgMTMuNDcwOSA3LjgzMjkxIDEzLjUyMDZDNy42NDMyNCAxMy42ODk5IDcuMzU2OCAxMy42ODk5IDcuMTY3MTMgMTMuNTIwNkM3LjExMTM1IDEzLjQ3MDkgNy4wNTM1OSAxMy40MTk0IDYuOTk0MDMgMTMuMzY2NEM2LjA3ODEgMTIuNTUwOCA0LjczNjQxIDExLjM1NjIgMy41OTkyNiA5Ljk2OTI3QzIuMzk4NzIgOC41MDUwOCAxLjM1MjQ4IDYuNzQwNDEgMS4zNTI0OCA0LjkwNTMyWlwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCBmaWxsUnVsZTogXCJldmVub2RkXCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSksXG4gICAgICAgICAgICAgICAgXCJFdmFsdWF0aW9uXCIpKSkpO1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IE5hdjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuT3B0aW9ucyA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHJlYWN0X2RvbV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuY29uc3QgYW1wbGl0dWRlID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJAYW1wbGl0dWRlL2FuYWx5dGljcy1icm93c2VyXCIpKTtcbmNvbnN0IE5hdl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL05hdlwiKSk7XG5jb25zdCBHZW5lcmFsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc2VjdGlvbi9HZW5lcmFsXCIpKTtcbmNvbnN0IEFJXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc2VjdGlvbi9BSVwiKSk7XG5jb25zdCBQcm9fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zZWN0aW9uL1Byb1wiKSk7XG5jb25zdCBBbmtpXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc2VjdGlvbi9BbmtpXCIpKTtcbmNvbnN0IFlvdXR1YmVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zZWN0aW9uL1lvdXR1YmVcIikpO1xuY29uc3QgY3NzaW5qc18xID0gcmVxdWlyZShcIkBhbnQtZGVzaWduL2Nzc2luanNcIik7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuY29uc3QgdXRpbF8yID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IHVzZXJJbmZvXzEgPSByZXF1aXJlKFwiLi4vbGliL3VzZXJJbmZvXCIpO1xucmVxdWlyZShcIi4vaW5kZXguY3NzXCIpO1xucmVxdWlyZShcIi4uL2luZGV4LmNzc1wiKTtcbi8vIGNvbnN0IGxhbmd1YWdlRGF0YTogTGFuZ3VhZ2VPYmplY3QgPSBsYW5nO1xuY29uc3QgT3B0aW9ucyA9ICgpID0+IHtcbiAgICAvLyBpbnRlcmZhY2UgVXNlckNvbnRleHRUeXBlIHtcbiAgICAvLyAgIHVzZXJJbmZvOiB1c2VySW5mb1R5cGU7XG4gICAgLy8gICBzZXRVc2VySW5mbzogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248dXNlckluZm9UeXBlPj47XG4gICAgLy8gfVxuICAgIGNvbnN0IGRlZmF1bHRVc2VySW5mbyA9IHtcbiAgICAgICAgdXNlcklkOiBcIlwiLFxuICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICAgIGNvbnRleHRNZW51OiBmYWxzZSxcbiAgICAgICAgY29udGV4dE1lbnVCbGFja0xpc3Q6IFwiXCIsXG4gICAgICAgIHNob3dZb3V0dWJlQnV0dG9uOiB0cnVlLFxuICAgICAgICBjb250ZW50RWRpdGFibGU6IGZhbHNlLFxuICAgIH07XG4gICAgLy8gY29uc3QgVXNlckNvbnRleHQgPSBjcmVhdGVDb250ZXh0PFVzZXJDb250ZXh0VHlwZT4oeyB1c2VySW5mbzogZGVmYXVsdFVzZXJJbmZvLCBzZXRVc2VySW5mbzogKCkgPT4geyB9IH0pO1xuICAgIGNvbnN0IFt1c2VySW5mbywgc2V0VXNlckluZm9dID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGRlZmF1bHRVc2VySW5mbyk7XG4gICAgY29uc3QgW3NldHRpbmdzLCBzZXRTZXR0aW5nc10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoKTtcbiAgICBjb25zdCBkaXZFbGVtZW50ID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICBjb25zdCB0YWJJdGVtcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJHZW5lcmFsXCIsXG4gICAgICAgICAgICBjb250ZW50OiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChHZW5lcmFsXzEuZGVmYXVsdCwgeyBzZXR0aW5nczogc2V0dGluZ3MsIHNhdmVPcHRpb25zOiB0aGlzU2F2ZU9wdGlvbnMgfSksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiQW5raVwiLFxuICAgICAgICAgICAgY29udGVudDogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoQW5raV8xLmRlZmF1bHQsIHsgc2V0dGluZ3M6IHNldHRpbmdzLCBzYXZlT3B0aW9uczogdGhpc1NhdmVPcHRpb25zIH0pLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIkFJXCIsXG4gICAgICAgICAgICBjb250ZW50OiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChBSV8xLmRlZmF1bHQsIHsgc2V0dGluZ3M6IHNldHRpbmdzLCBzYXZlT3B0aW9uczogdGhpc1NhdmVPcHRpb25zIH0pLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIllvdVR1YmVcIixcbiAgICAgICAgICAgIGNvbnRlbnQ6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFlvdXR1YmVfMS5kZWZhdWx0LCB7IHNldHRpbmdzOiBzZXR0aW5ncywgc2F2ZU9wdGlvbnM6IHRoaXNTYXZlT3B0aW9ucyB9KSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCLimqFQcm9cIixcbiAgICAgICAgICAgIGNvbnRlbnQ6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFByb18xLmRlZmF1bHQsIHsgc2V0dGluZ3M6IHNldHRpbmdzLCBzYXZlT3B0aW9uczogdGhpc1NhdmVPcHRpb25zIH0pLFxuICAgICAgICB9LFxuICAgIF07XG4gICAgY29uc3QgdGhpc0dldFVzZXJTdGF0dXMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAoMCwgdXRpbF8xLmdldFVzZXJJbmZvKSgpLnRoZW4oKHVzZXJJbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8g5pu05pawIFVJXG4gICAgICAgICAgICAgICAgLy8gc2V0VmVyaWZpZWQodXNlckluZm8udmVyaWZpZWQpXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh1c2VySW5mbyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgKCgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgLy8g6I635Y+W6YWN572u5L+h5oGvXG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IHlpZWxkICgwLCB1dGlsXzIuZ2V0U2V0dGluZ3MpKCk7XG4gICAgICAgICAgICBzZXRTZXR0aW5ncyhpdGVtcyk7XG4gICAgICAgICAgICBjb25zdCB1c2VySW5mbyA9IHlpZWxkIHRoaXNHZXRVc2VyU3RhdHVzKCk7XG4gICAgICAgICAgICBzZXRVc2VySW5mbyh1c2VySW5mbyk7XG4gICAgICAgICAgICBjb25zdCB1c2VySWQgPSB1c2VySW5mby51c2VySWQ7XG4gICAgICAgICAgICAvLyDmlbDmja7ln4vngrlcbiAgICAgICAgICAgIGFtcGxpdHVkZS5pbml0KHByb2Nlc3MuZW52LkFNUExJVFVERV9LRVksIHVzZXJJZCwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUcmFja2luZzoge1xuICAgICAgICAgICAgICAgICAgICBwYWdlVmlld3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uczogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYW1wbGl0dWRlLnRyYWNrKFwib3Blbk9wdGlvbnNcIik7XG4gICAgICAgIH0pKSgpO1xuICAgIH0sIFtdKTtcbiAgICBmdW5jdGlvbiB0aGlzU2F2ZU9wdGlvbnModmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAvL+S/neWtmOiuvue9rlxuICAgICAgICAgICAgKDAsIHV0aWxfMi5zYXZlT3B0aW9ucykodmFsdWVzKTtcbiAgICAgICAgICAgIC8vIOiOt+WPlumUruWAvOWvuVxuICAgICAgICAgICAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHZhbHVlcyk7XG4gICAgICAgICAgICAvLyDpgY3ljobplK7lgLzlr7lcbiAgICAgICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGVudHJpZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBcIm5ld0xpY2Vuc2VLZXlcIikge1xuICAgICAgICAgICAgICAgICAgICAvLyDmm7TmlrDorqLpmIXnirbmgIFcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlckluZm8gPSB5aWVsZCB0aGlzR2V0VXNlclN0YXR1cygpO1xuICAgICAgICAgICAgICAgICAgICBzZXRVc2VySW5mbyh1c2VySW5mbyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5pu05pawXG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IHlpZWxkICgwLCB1dGlsXzIuZ2V0U2V0dGluZ3MpKCk7XG4gICAgICAgICAgICBzZXRTZXR0aW5ncyhpdGVtcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHVzZXJJbmZvXzEuVXNlckluZm9Db250ZXh0LlByb3ZpZGVyLCB7IHZhbHVlOiB7IHVzZXI6IHVzZXJJbmZvLCBhbmtpOiBudWxsIH0gfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgaC1zY3JlZW5cIiB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoTmF2XzEuZGVmYXVsdCwgbnVsbCksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBcIk15T3B0aW9uc1wiLCByZWY6IGRpdkVsZW1lbnQsIGNsYXNzTmFtZTogXCIgZmxleC0xXCIgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQ29uZmlnUHJvdmlkZXIsIHsgdGhlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsZ29yaXRobTogdGhlbWUuZGVmYXVsdEFsZ29yaXRobSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JQcmltYXJ5OiBcIiNGMDhBMjRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvckxpbms6IFwiI0YwOEEyNFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yTGlua0hvdmVyOiBcIiNmZmM0NzhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvckxpbmtBY3RpdmU6IFwiI2M5NjkxNFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuVGFicywgeyBjbGFzc05hbWU6IFwidy1mdWxsIGgtZnVsbCBncm93XCIsIHRhYlBvc2l0aW9uOiBcImxlZnRcIiwgaXRlbXM6IHRhYkl0ZW1zLm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gU3RyaW5nKGkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogaXRlbS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogaXRlbS5jb250ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSB9KSkpKSkpO1xufTtcbmV4cG9ydHMuT3B0aW9ucyA9IE9wdGlvbnM7XG5yZWFjdF9kb21fMS5kZWZhdWx0LnJlbmRlcihyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuU3RyaWN0TW9kZSwgbnVsbCxcbiAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChjc3NpbmpzXzEuU3R5bGVQcm92aWRlciwgbnVsbCxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoZXhwb3J0cy5PcHRpb25zLCBudWxsKSkpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgbW9kZWxzXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzXCIpO1xuY29uc3QgdXNlX2RlYm91bmNlXzEgPSByZXF1aXJlKFwidXNlLWRlYm91bmNlXCIpO1xuY29uc3QgQUkgPSAoeyBzZXR0aW5ncywgc2F2ZU9wdGlvbnMgfSkgPT4ge1xuICAgIGNvbnN0IFtmb3JtXSA9IGFudGRfMS5Gb3JtLnVzZUZvcm0oKTtcbiAgICBjb25zdCB7IE9wdGlvbiB9ID0gYW50ZF8xLlNlbGVjdDtcbiAgICBjb25zdCBbcmFkaW9WYWx1ZSwgc2V0UmFkaW9WYWx1ZV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoXCJteU93bk9wZW5BaUtleVwiKTtcbiAgICBjb25zdCBvblJhZGlvQ2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgc2V0UmFkaW9WYWx1ZShlLnRhcmdldC52YWx1ZSk7XG4gICAgfTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgaWYgKHNldHRpbmdzKSB7XG4gICAgICAgICAgICBzZXRSYWRpb1ZhbHVlKHNldHRpbmdzLmFwaUtleVNlbGVjdGlvbik7XG4gICAgICAgICAgICBmb3JtLnNldEZpZWxkc1ZhbHVlKHtcbiAgICAgICAgICAgICAgICBhcGlLZXlTZWxlY3Rpb246IHNldHRpbmdzLmFwaUtleVNlbGVjdGlvbixcbiAgICAgICAgICAgICAgICBvcGVuQXBpS2V5OiBzZXR0aW5ncy5vcGVuQXBpS2V5LFxuICAgICAgICAgICAgICAgIG9wZW5BcGlFbmRwb2ludDogc2V0dGluZ3Mub3BlbkFwaUVuZHBvaW50LFxuICAgICAgICAgICAgICAgIG9wZW5BcGlNb2RlbDogc2V0dGluZ3Mub3BlbkFwaU1vZGVsLFxuICAgICAgICAgICAgICAgIGxpY2Vuc2VLZXk6IHNldHRpbmdzLmxpY2Vuc2VLZXksXG4gICAgICAgICAgICAgICAgY2hhdEdQVFdlYjogc2V0dGluZ3MuY2hhdEdQVFdlYixcbiAgICAgICAgICAgICAgICBtb2RlbDogc2V0dGluZ3MubW9kZWwsXG4gICAgICAgICAgICAgICAgZnJlZU1vZGVsOiBzZXR0aW5ncy5mcmVlTW9kZWwsXG4gICAgICAgICAgICAgICAgbmV3TGljZW5zZUtleTogc2V0dGluZ3MubmV3TGljZW5zZUtleSxcbiAgICAgICAgICAgICAgICBvbGxhbWFBcGlFbmRwb2ludDogc2V0dGluZ3Mub2xsYW1hQXBpRW5kcG9pbnQsXG4gICAgICAgICAgICAgICAgb2xsYW1hTW9kZWw6IHNldHRpbmdzLm9sbGFtYU1vZGVsLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCBbc2V0dGluZ3NdKTtcbiAgICBjb25zdCBoYW5kbGVGb3JtQ2hhbmdlID0gKDAsIHVzZV9kZWJvdW5jZV8xLnVzZURlYm91bmNlZENhbGxiYWNrKSgodGVybSkgPT4ge1xuICAgICAgICBzYXZlT3B0aW9ucyh0ZXJtKTtcbiAgICB9LCAzMDApO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0sIHsgb25WYWx1ZXNDaGFuZ2U6IGhhbmRsZUZvcm1DaGFuZ2UsIGZvcm06IGZvcm0sIFxuICAgICAgICAvLyBsYWJlbENvbD17eyBzcGFuOiA0IH19XG4gICAgICAgIGxheW91dDogXCJob3Jpem9udGFsXCIgfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIsIG51bGwsXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwiYXBpS2V5U2VsZWN0aW9uXCIsIGxhYmVsOiBcIlxcdUQ4M0RcXHVERDBCSW4gdXNlXCIgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuUmFkaW8uR3JvdXAsIHsgb25DaGFuZ2U6IG9uUmFkaW9DaGFuZ2UsIHZhbHVlOiByYWRpb1ZhbHVlLCBzaXplOiBcInNtYWxsXCIsIHN0eWxlOiB7IG1hcmdpbkJvdHRvbTogMCwgZGlzcGxheTogXCJmbGV4XCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuUmFkaW8uQnV0dG9uLCB7IHZhbHVlOiBcInNjb3V0ZXJGcmVlQUlcIiwgc3R5bGU6IHsgZmxleDogXCIxXCIsIHRleHRBbGlnbjogXCJjZW50ZXJcIiB9IH0sIFwiU2NvdXRlclwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlJhZGlvLkJ1dHRvbiwgeyB2YWx1ZTogXCJteU93bk9wZW5BaUtleVwiLCBzdHlsZTogeyBmbGV4OiBcIjFcIiwgdGV4dEFsaWduOiBcImNlbnRlclwiIH0gfSwgXCJDdXN0b21pemVcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5SYWRpby5CdXR0b24sIHsgdmFsdWU6IFwib2xsYW1hXCIsIHN0eWxlOiB7IGZsZXg6IFwiMVwiLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfSB9LCBcIk9sbGFtYVwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlJhZGlvLkJ1dHRvbiwgeyB2YWx1ZTogXCJsaWNlbnNlS2V5XCIsIHN0eWxlOiB7IGZsZXg6IFwiMVwiLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfSB9LCBcIk9wZW5Sb3V0ZXJcIikpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgXG4gICAgICAgICAgICAgICAgLy8gY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIlxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHJhZGlvVmFsdWUgPT09IFwic2NvdXRlckZyZWVBSVwiID8gXCJibG9ja1wiIDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgbmFtZTogXCJmcmVlTW9kZWxcIiwgbGFiZWw6IFwiXFx1RDgzRVxcdUREMTYgTW9kZWxcIiwgaW5pdGlhbFZhbHVlOiBtb2RlbHNfMS5mcmVlTW9kZWxzWzBdW1wibmFtZVwiXSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuU2VsZWN0LCB7IHBsYWNlaG9sZGVyOiBcIlwiIH0sIG1vZGVsc18xLmZyZWVNb2RlbHMubWFwKChpdGVtKSA9PiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoT3B0aW9uLCB7IGtleTogaXRlbS5pZCwgdmFsdWU6IGl0ZW0uaWQgfSwgaXRlbS5uYW1lKSkpKSkpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiByYWRpb1ZhbHVlID09PSBcIm15T3duT3BlbkFpS2V5XCIgPyBcImJsb2NrXCIgOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBuYW1lOiBcIm9wZW5BcGlFbmRwb2ludFwiLCBsYWJlbDogXCJcXHVEODNEXFx1REQxN0FQSSBFbmRwb2ludFwiLCBleHRyYTogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjNjY2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIklmIHlvdSBhcmUgdXNpbmcgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN0cm9uZ1wiLCBudWxsLCBcIkF6dXJlXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIgb3IgYSB0aGlyZC1wYXJ0eSBlbmRwb2ludCwgcGxlYXNlIGZpbGwgaW4gdGhlIGVuZHBvaW50IGFkZHJlc3MuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IHRhcmdldDogXCJfX2JsYW5rXCIsIGhyZWY6IFwiaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9TZXQtdXAteW91ci1BUEktS2V5LTk2MjY2ZDUyMzZmYTQ2MmNhNzA3NjgzZDliYjI3NWM2P3B2cz00XCIgfSwgXCJMZWFybiBNb3JlXFx1MjE5N1xcdUZFMEZcIikpIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbnB1dCwgeyBwbGFjZWhvbGRlcjogXCJodHRwczovL2FwaS5vcGVuYWkuY29tL3YxL2NoYXQvY29tcGxldGlvbnNcIiwgdHlwZTogXCJ1cmxcIiB9KSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBuYW1lOiBcIm9wZW5BcGlLZXlcIiwgbGFiZWw6IFwiXFx1RDgzRFxcdUREMTEgWW91ciBPcGVuIEFQSSBLZXlcIiB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuSW5wdXQsIHsgcGxhY2Vob2xkZXI6IFwiV2Ugd2lsbCBub3QgdXNlIHlvdXIgS2V5IGZvciBhbnkgb3RoZXIgcHVycG9zZXMuXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9KSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBuYW1lOiBcIm9wZW5BcGlNb2RlbFwiLCBsYWJlbDogXCJcXHVEODNFXFx1REQxNiBNb2RlbFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbnB1dCwgeyBwbGFjZWhvbGRlcjogXCJncHQtNG8tbWluaVwiLCB0eXBlOiBcInRleHRcIiB9KSkpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiByYWRpb1ZhbHVlID09PSBcIm9sbGFtYVwiID8gXCJibG9ja1wiIDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgbmFtZTogXCJvbGxhbWFBcGlFbmRwb2ludFwiLCBsYWJlbDogXCJcXHVEODNEXFx1REQxN0FQSSBFbmRwb2ludFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbnB1dCwgeyBwbGFjZWhvbGRlcjogXCJodHRwOi8vbG9jYWxob3N0OjExNDM0XCIsIHR5cGU6IFwidXJsXCIgfSkpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgbmFtZTogXCJvbGxhbWFNb2RlbFwiLCBsYWJlbDogXCJcXHVEODNFXFx1REQxNk1vZGVsXCIsIGV4dHJhOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiM2NjZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgdGFyZ2V0OiBcIl9fYmxhbmtcIiwgaHJlZjogXCJodHRwczovL2ppYW5nemlsb25nLm5vdGlvbi5zaXRlL0hvdy10by11c2UtT2xsYW1hLWY4ZmYwZDcxMTk4OTQ1Yjg4M2U3MWUwOGYwOWNjOWY1P3B2cz00XCIgfSwgXCJMZWFybiBNb3JlXFx1MjE5N1xcdUZFMEZcIikpIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbnB1dCwgeyBwbGFjZWhvbGRlcjogXCJsbGFtYTJcIiwgdHlwZTogXCJ0ZXh0XCIgfSkpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogcmFkaW9WYWx1ZSA9PT0gXCJsaWNlbnNlS2V5XCIgPyBcImJsb2NrXCIgOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBuYW1lOiBcImxpY2Vuc2VLZXlcIiwgbGFiZWw6IFwiXFx1RDgzRFxcdUREMTFLZXlcIiwgc3R5bGU6IHsgbWFyZ2luQm90dG9tOiBcIjE2cHhcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbnB1dCwgeyBwbGFjZWhvbGRlcjogXCJXZSB3aWxsIG5vdCB1c2UgeW91ciBLZXkgZm9yIGFueSBvdGhlciBwdXJwb3Nlcy5cIiwgdHlwZTogXCJwYXNzd29yZFwiIH0pKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwibW9kZWxcIiwgbGFiZWw6IFwiXFx1RDgzRVxcdUREMTZNb2RlbFwiLCBleHRyYTogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb2xvcjogXCIjNjY2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzhweCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgdGFyZ2V0OiBcIl9fYmxhbmtcIiwgaHJlZjogXCJodHRwczovL2ppYW5nemlsb25nLm5vdGlvbi5zaXRlL1NldC11cC15b3VyLUFQSS1LZXktQVBJLUtleS05NjI2NmQ1MjM2ZmE0NjJjYTcwNzY4M2Q5YmIyNzVjNlwiIH0sIFwiTGVhcm4gTW9yZVxcdTIxOTdcXHVGRTBGXCIpKSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuSW5wdXQsIHsgcGxhY2Vob2xkZXI6IFwiZ29vZ2xlL2dlbW1hLTItOWItaXQ6ZnJlZVwiLCB0eXBlOiBcInRleHRcIiB9KSkpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiIHRleHQtY2VudGVyXCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHJhZGlvVmFsdWUgPT09IFwiY2hhdEdQVFdlYlwiID8gXCJibG9ja1wiIDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNGMDhBMjRcIixcbiAgICAgICAgICAgICAgICB9IH0sIFwiXFx1MjZBMFxcdUZFMEZTb3JyeSwgdGhpcyBmZWF0dXJlIGlzIHRlbXBvcmFyaWx5IHVuYXZhaWxhYmxlLlwiKSkpKTtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBBSTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uLy4uL3V0aWxcIik7XG5jb25zdCB1c2VfZGVib3VuY2VfMSA9IHJlcXVpcmUoXCJ1c2UtZGVib3VuY2VcIik7XG5jb25zdCBpY29uc18xID0gcmVxdWlyZShcIkBhbnQtZGVzaWduL2ljb25zXCIpO1xuY29uc3QgeyBUZXh0QXJlYSB9ID0gYW50ZF8xLklucHV0O1xuY29uc3QgQW5raSA9ICh7IHNldHRpbmdzLCBzYXZlT3B0aW9ucyB9KSA9PiB7XG4gICAgY29uc3QgW2Fua2lDbGllbnRJc29wZW4sIHNldEFua2lDbGllbnRJc29wZW5dID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHRydWUpO1xuICAgIGNvbnN0IFthbmtpRGVja05hbWVzLCBzZXRBbmtpRGVja05hbWVzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShcImxvYWRpbmdcIik7XG4gICAgY29uc3QgW2Fua2lNb2RlbE5hbWVzLCBzZXRBbmtpTW9kZWxOYW1lc10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoXCJsb2FkaW5nXCIpO1xuICAgIGNvbnN0IFthbmtpTW9kZWxGaWVsZE5hbWVzLCBzZXRBbmtpTW9kZWxGaWVsZE5hbWVzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShbXSk7XG4gICAgY29uc3QgW2ZpZWxkc1N0YXR1cywgc2V0RmllbGRzU3RhdHVzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh1bmRlZmluZWQpO1xuICAgIGNvbnN0IFtpc1Njb3V0ZXJOb3RlLCBzZXRJc1Njb3V0ZXJOb3RlXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7fSk7XG4gICAgY29uc3QgW2Zvcm1dID0gYW50ZF8xLkZvcm0udXNlRm9ybSgpO1xuICAgIC8vIGNvbnN0IFtmb3JtRm9yRmllbGRdID0gRm9ybS51c2VGb3JtKCk7XG4gICAgY29uc3QgeyBPcHRpb24gfSA9IGFudGRfMS5TZWxlY3Q7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgICgoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIC8vIOabtOaWsCDpu5jorqTlgLxcbiAgICAgICAgICAgICAgICAvLyBmb3JtLnNldEZpZWxkc1ZhbHVlKHtcbiAgICAgICAgICAgICAgICAvLyAgIGFua2lEZWNrTmFtZTogc2V0dGluZ3MuYW5raURlY2tOYW1lLFxuICAgICAgICAgICAgICAgIC8vICAgYW5raU5vdGVOYW1lOiBzZXR0aW5ncy5hbmtpTm90ZU5hbWUsXG4gICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgIGxldCBhbmtpU2V0dGluZ3MgPSBzZXR0aW5ncy5hbmtpU2V0dGluZ3M7XG4gICAgICAgICAgICAgICAgLy8g6K6+572u6buY6K6k5YC8XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLorr7nva7pu5jorqTlgLwgYW5raVNldHRpbmdzOlwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhbmtpU2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgIGZvcm0uc2V0RmllbGRzVmFsdWUoe1xuICAgICAgICAgICAgICAgICAgICBhbmtpU2V0dGluZ3M6IGFua2lTZXR0aW5ncyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyBmb3JtRm9yRmllbGQuc2V0RmllbGRzVmFsdWUoe1xuICAgICAgICAgICAgICAgIC8vICAgICBhbmtpTm90ZU5hbWU6IHNldHRpbmdzLmFua2lOb3RlTmFtZVxuICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgICAgIGNoZWNrU2NvdXRlck5vdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpKCk7XG4gICAgICAgIC8vIHNldElzU2NvdXRlck5vdGUoc2V0dGluZ3M/LmFua2lOb3RlTmFtZS5pbmRleE9mKFwiU2NvdXRlclwiKSA+IC0xKTtcbiAgICB9LCBbc2V0dGluZ3NdKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgKCgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvLyDojrflj5YgTm90ZSDlr7nlupTnmoQgZmllbGRzXG4gICAgICAgICAgICAgICAgaGFuZGxlTW9kZWxGaWVsZE5hbWVzKHNldHRpbmdzID09PSBudWxsIHx8IHNldHRpbmdzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXR0aW5ncy5hbmtpTm90ZU5hbWUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IFtkZWNrTmFtZXNSZXN1bHQsIG1vZGVsTmFtZXNSZXN1bHRdID0geWllbGQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmFua2lBY3Rpb24pKFwiZGVja05hbWVzXCIsIDYpLFxuICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmFua2lBY3Rpb24pKFwibW9kZWxOYW1lc1wiLCA2KSxcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAvLyDlpITnkIYgZGVja05hbWVzIOe7k+aenFxuICAgICAgICAgICAgICAgIGlmIChkZWNrTmFtZXNSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVja05hbWVzID0gZGVja05hbWVzUmVzdWx0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgc2V0QW5raURlY2tOYW1lcyhkZWNrTmFtZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyDlpITnkIYgbW9kZWxOYW1lcyDnu5PmnpxcbiAgICAgICAgICAgICAgICBpZiAobW9kZWxOYW1lc1Jlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2RlbE5hbWVzID0gbW9kZWxOYW1lc1Jlc3VsdC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHNldEFua2lNb2RlbE5hbWVzKG1vZGVsTmFtZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHNldEFua2lDbGllbnRJc29wZW4oZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSkoKTtcbiAgICB9LCBbYW5raUNsaWVudElzb3Blbl0pO1xuICAgIC8vIE5vdGUsIEZpZWxkcyDooajljZXkv67mlLnml7ZcbiAgICBjb25zdCBoYW5kbGVGaWVsZHNGb3JtQ2hhbmdlID0gKDAsIHVzZV9kZWJvdW5jZV8xLnVzZURlYm91bmNlZENhbGxiYWNrKSgoY2hhbmdlZEZpZWxkcywgYWxsRmllbGRzKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkZpZWxkc0NoYW5nZT09PVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coY2hhbmdlZEZpZWxkcyk7XG4gICAgICAgIC8vIOWmguaenOabtOaUueeahOaYryBhbmtpTm90ZU5hbWXvvIzliJnpnIDopoHmm7TmlrAgRmlsZWRzIOihqOWNlVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGFuZ2VkRmllbGRzWzBdLm5hbWUpICYmXG4gICAgICAgICAgICBjaGFuZ2VkRmllbGRzWzBdLm5hbWUuaW5jbHVkZXMoXCJhbmtpTm90ZU5hbWVcIikpIHtcbiAgICAgICAgICAgIC8vIOiuvue9ruWKoOi9veeKtuaAgVxuICAgICAgICAgICAgc2V0RmllbGRzU3RhdHVzKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFwibG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgIG1zZzogXCJcIixcbiAgICAgICAgICAgICAgICBpbmRleDogY2hhbmdlZEZpZWxkc1swXVtcIm5hbWVcIl1bMV0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIOiOt+WPliBub3RlIOWvueW6lOeahCBmaWxlZHMg5L+h5oGvXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB5aWVsZCBoYW5kbGVNb2RlbEZpZWxkTmFtZXMoY2hhbmdlZEZpZWxkc1swXS52YWx1ZSk7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsRmllbGROYW1lcyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgIGxldCBmaWxlZHNOYW1lUGF0aCA9IGNoYW5nZWRGaWVsZHNbMF0ubmFtZTtcbiAgICAgICAgICAgICAgICBmaWxlZHNOYW1lUGF0aFtmaWxlZHNOYW1lUGF0aC5sZW5ndGggLSAxXSA9IFwiYW5raUZpZWxkc1wiO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVkc1ZhbHVlID0gbW9kZWxGaWVsZE5hbWVzLm1hcCgobmFtZSkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgW25hbWVdOiBcIlwiLFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtb2RlbEZpZWxkTmFtZXMpO1xuICAgICAgICAgICAgICAgIGZvcm0uc2V0RmllbGRWYWx1ZShmaWxlZHNOYW1lUGF0aCwgZmlsZWRzVmFsdWUpO1xuICAgICAgICAgICAgICAgIHNldEZpZWxkc1N0YXR1cyh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJyZWFkeVwiLFxuICAgICAgICAgICAgICAgICAgICBtc2c6IFwiXCIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSwgMzAwKTtcbiAgICAvLyDooajljZXkv67mlLnml7ZcbiAgICBjb25zdCBoYW5kbGVGb3JtQ2hhbmdlID0gKDAsIHVzZV9kZWJvdW5jZV8xLnVzZURlYm91bmNlZENhbGxiYWNrKSgodGVybSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImhhbmRsZUZvcm1DaGFuZ2U9PT09PT09PTpcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGZvcm0uZ2V0RmllbGRzVmFsdWUoKSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNldHRpbmdzKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGVybSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRlcm1bXCJhbmtpU2V0dGluZ3NcIl1bMF0pO1xuICAgICAgICBsZXQgdmFsdWVzID0gZm9ybS5nZXRGaWVsZHNWYWx1ZSgpO1xuICAgICAgICAvLyB2YWx1ZXMgPSB2YWx1ZXMuYW5raVNldHRpbmdzLmZpbHRlcigoaXRlbTogQW5raVNldHRpbmdUeXBlKSA9PiB7XG4gICAgICAgIC8vICAgcmV0dXJuIGl0ZW0gJiYgaXRlbS5hbmtpTm90ZU5hbWU7XG4gICAgICAgIC8vIH0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInZhbHVlczpcIik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHZhbHVlcyk7XG4gICAgICAgIHNhdmVPcHRpb25zKHZhbHVlcyk7XG4gICAgICAgIGNoZWNrU2NvdXRlck5vdGUoKTtcbiAgICB9LCAzMDApO1xuICAgIC8vIFNjb3V0ZXIg6buY6K6kIG5vdGUg5LiN5pSv5oyB57yW6L6RXG4gICAgY29uc3QgY2hlY2tTY291dGVyTm90ZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZm9ybVZhbHVlcyA9IGZvcm0uZ2V0RmllbGRzVmFsdWUoKS5hbmtpU2V0dGluZ3M7XG4gICAgICAgIGNvbnN0IG5ld0lzU2NvdXRlck5vdGUgPSB7fTtcbiAgICAgICAgZm9ybVZhbHVlcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbSk7XG4gICAgICAgICAgICBpZiAoaXRlbS5hbmtpTm90ZU5hbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5hbmtpTm90ZU5hbWUuaW5kZXhPZihcIlNjb3V0ZXJcIikgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyDlpoLmnpzmmK/pu5jorqTnmoQgTm90ZSDliJnkuI3mlK/mjIHkv67mlLkgZmlsZWRzXG4gICAgICAgICAgICAgICAgICAgIG5ld0lzU2NvdXRlck5vdGVbaW5kZXhdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiAoaXRlbSAmJiBpdGVtLmlucHV0MSA9PT0gXCJzcGVjaWFsXCIpIHtcbiAgICAgICAgICAgIC8vICAgbmV3SXNTY291dGVyTm90ZVtpbmRleF0gPSB0cnVlO1xuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgbmV3SXNTY291dGVyTm90ZVtpbmRleF0gPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNldElzU2NvdXRlck5vdGUobmV3SXNTY291dGVyTm90ZSk7XG4gICAgfTtcbiAgICAvLyDojrflj5YgTm90ZSDlr7nlupTnmoQgZmllbGRzXG4gICAgY29uc3QgaGFuZGxlTW9kZWxGaWVsZE5hbWVzID0gKG5vdGVOYW1lKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJoYW5kbGVNb2RlbEZpZWxkTmFtZXNcIik7XG4gICAgICAgIGlmIChub3RlTmFtZSkge1xuICAgICAgICAgICAgLy8g6YCa6L+HIG5vdGVOYW1lIOiOt+WPluWvueW6lOeahCBmaWxlZHMg5L+h5oGvXG4gICAgICAgICAgICBjb25zdCBtb2RlbEZpZWxkTmFtZXNSZXN1bHQgPSB5aWVsZCAoMCwgdXRpbF8xLmFua2lBY3Rpb24pKFwibW9kZWxGaWVsZE5hbWVzXCIsIDYsIHtcbiAgICAgICAgICAgICAgICBtb2RlbE5hbWU6IG5vdGVOYW1lLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobW9kZWxGaWVsZE5hbWVzUmVzdWx0LnJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsRmllbGROYW1lcyA9IG1vZGVsRmllbGROYW1lc1Jlc3VsdC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgc2V0QW5raU1vZGVsRmllbGROYW1lcyhtb2RlbEZpZWxkTmFtZXMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibW9kZWxGaWVsZE5hbWVzUmVzdWx0OlwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtb2RlbEZpZWxkTmFtZXNSZXN1bHQpO1xuICAgICAgICAgICAgICAgIGhhbmRsZUZvcm1DaGFuZ2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBlcnJvcjogZmFsc2UsIGRhdGE6IG1vZGVsRmllbGROYW1lc1Jlc3VsdC5yZXN1bHQgfTtcbiAgICAgICAgICAgICAgICAvLyDmuLLmn5MgZmllbGRzIOihqOWNleeahOm7mOiupOWAvFxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGZpZWxkc1JlY29yZCA9IHNldHRpbmdzPy5hbmtpRmllbGRzO1xuICAgICAgICAgICAgICAgIC8vIGlmIChmaWVsZHNSZWNvcmQpIHtcbiAgICAgICAgICAgICAgICAvLyAgIC8vIOaJvuWIsCBhbmtpTm90ZU5hbWUg5a+55bqU55qEIGZpZWxkc1xuICAgICAgICAgICAgICAgIC8vICAgY29uc3QgdGFyZ2V0UmVjb3JkID0gZmllbGRzUmVjb3JkLmZpbmQoXG4gICAgICAgICAgICAgICAgLy8gICAgIChpdGVtOiBhbnkpID0+IGl0ZW0ubm90ZSA9PT0gbm90ZU5hbWVcbiAgICAgICAgICAgICAgICAvLyAgICk7XG4gICAgICAgICAgICAgICAgLy8gICBjb25zdCB0ZiA9IE9iamVjdC5rZXlzKHRhcmdldFJlY29yZC5maWVsZHMpLnJlZHVjZTx7XG4gICAgICAgICAgICAgICAgLy8gICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbiAgICAgICAgICAgICAgICAvLyAgIH0+KChvYmosIGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgY29uc3QgdiA9IHRhcmdldFJlY29yZC5maWVsZHNbaXRlbV07XG4gICAgICAgICAgICAgICAgLy8gICAgIG9ialtpdGVtXSA9IHYgPyB2LnJlcGxhY2UoLzxicj4vZywgXCJcXG5cIikgOiB2O1xuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgICAgIC8vICAgfSwge30pO1xuICAgICAgICAgICAgICAgIC8vICAgaWYgKHRmKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGZvcm0uc2V0RmllbGRzVmFsdWUodGYpO1xuICAgICAgICAgICAgICAgIC8vICAgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KG1vZGVsRmllbGROYW1lc1Jlc3VsdC5lcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IHRydWUsIG1zZzogbW9kZWxGaWVsZE5hbWVzUmVzdWx0LmVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6IGZhbHNlLCBkYXRhOiBbXSB9O1xuICAgIH0pO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAhYW5raUNsaWVudElzb3BlbiAmJiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNmNTBcIixcbiAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkICNmNTBcIixcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI0cHhcIixcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIFwiQW5raSBjbGllbnQgYW5kIHJlbGF0ZWQgc2V0dGluZ3Mgbm90IGZvdW5kLiBQbGVhc2VcIixcbiAgICAgICAgICAgIFwiIFwiLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgc3R5bGU6IHsgdGV4dERlY29yYXRpb25MaW5lOiBcInVuZGVybGluZVwiIH0sIHRhcmdldDogXCJfX2JsYW5rXCIsIGhyZWY6IFwiaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9Vc2UtdGhlLUFkZC10by1BbmtpLWZlYXR1cmUtN2FiOTVmZjhhYTVlNDE5Yzk3OGU4YTJhMGE0NTEzMjRcIiB9LCBcImNvbmZpZ3VyZVxcdTIxOTdcXHVGRTBGXCIpLFxuICAgICAgICAgICAgXCIgXCIsXG4gICAgICAgICAgICBcImFuZCB0cnkgYWdhaW5cIikpLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybVxuICAgICAgICAvLyBvbkZpbmlzaD17fVxuICAgICAgICAsIHsgXG4gICAgICAgICAgICAvLyBvbkZpbmlzaD17fVxuICAgICAgICAgICAgb25WYWx1ZXNDaGFuZ2U6IGhhbmRsZUZvcm1DaGFuZ2UsIG9uRmllbGRzQ2hhbmdlOiBoYW5kbGVGaWVsZHNGb3JtQ2hhbmdlLCBmb3JtOiBmb3JtLCBsYWJlbENvbDogeyBzcGFuOiA0IH0sIGxheW91dDogXCJob3Jpem9udGFsXCIsIGluaXRpYWxWYWx1ZXM6IHsgaXRlbXM6IFt7fV0gfSB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uTGlzdCwgeyBuYW1lOiBcImFua2lTZXR0aW5nc1wiIH0sIChmaWVsZHMsIHsgYWRkLCByZW1vdmUsIG1vdmUgfSkgPT4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZmxleC1jb2wgZ2FwLTRcIiB9LFxuICAgICAgICAgICAgICAgIGZpZWxkcy5tYXAoKF9hLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgeyBrZXksIG5hbWUgfSA9IF9hLCByZXN0RmllbGQgPSBfX3Jlc3QoX2EsIFtcImtleVwiLCBcIm5hbWVcIl0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5DYXJkLCB7IGtleToga2V5IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9PSAwICYmIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuVGFnLCB7IGNsYXNzTmFtZTogXCIgbWItNlwiLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLlN0YXJPdXRsaW5lZCwgbnVsbCksIGNvbG9yOiBcIm9yYW5nZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJEZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIE9iamVjdC5hc3NpZ24oe30sIHJlc3RGaWVsZCwgeyBuYW1lOiBbbmFtZSwgXCJhbmtpRGVja05hbWVcIl0sIGxhYmVsOiBcIkRlY2sgTmFtZVwiLCBpbml0aWFsVmFsdWU6IHVuZGVmaW5lZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuU2VsZWN0LCB7IHBsYWNlaG9sZGVyOiBcIkFua2kgRGVjayBOYW1lXCIsIGRpc2FibGVkOiAhYW5raUNsaWVudElzb3BlbiwgbG9hZGluZzogYW5raURlY2tOYW1lcyA9PT0gXCJsb2FkaW5nXCIgfSwgYW5raURlY2tOYW1lcyAhPT0gXCJsb2FkaW5nXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5raURlY2tOYW1lcy5tYXAoKGl0ZW0pID0+IChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChPcHRpb24sIHsga2V5OiBpdGVtLCB2YWx1ZTogaXRlbSB9LCBpdGVtKSkpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCBPYmplY3QuYXNzaWduKHt9LCByZXN0RmllbGQsIHsgbmFtZTogW25hbWUsIFwiYW5raU5vdGVOYW1lXCJdLCBsYWJlbDogXCJOb3RlIE5hbWVcIiwgaW5pdGlhbFZhbHVlOiB1bmRlZmluZWQgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlNlbGVjdCwgeyBwbGFjZWhvbGRlcjogXCJBbmtpIE5vdGUgTmFtZVwiLCBkaXNhYmxlZDogIWFua2lDbGllbnRJc29wZW4sIGxvYWRpbmc6IGFua2lNb2RlbE5hbWVzID09PSBcImxvYWRpbmdcIiB9LCBhbmtpTW9kZWxOYW1lcyAhPT0gXCJsb2FkaW5nXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5raU1vZGVsTmFtZXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE9wdGlvbiwgeyBrZXk6IGl0ZW0sIHZhbHVlOiBpdGVtIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGZpZWxkc1N0YXR1cyA9PT0gbnVsbCB8fCBmaWVsZHNTdGF0dXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZpZWxkc1N0YXR1cy5zdGF0dXMpID09PSBcImxvYWRpbmdcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmaWVsZHNTdGF0dXMgPT09IG51bGwgfHwgZmllbGRzU3RhdHVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmaWVsZHNTdGF0dXMuaW5kZXgpID09PSBpbmRleCA/IChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuU2tlbGV0b24sIHsgYWN0aXZlOiB0cnVlIH0pKSA6IChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5MaXN0LCB7IG5hbWU6IFtuYW1lLCBcImFua2lGaWVsZHNcIl0gfSwgKHN1YkZpZWxkcywgc3ViT3B0KSA9PiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLCBzdWJGaWVsZHMubWFwKChzdWJGaWVsZCwgc3ViSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBPYmplY3Qua2V5cyhmb3JtLmdldEZpZWxkVmFsdWUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFua2lTZXR0aW5nc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFua2lGaWVsZHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSkgfHwge30pWzBdIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IGtleTogc3ViRmllbGQua2V5LCBuYW1lOiBbc3ViRmllbGQubmFtZSwgZmllbGROYW1lXSwgbGFiZWw6IGZpZWxkTmFtZSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwgeyBkaXNhYmxlZDogaXNTY291dGVyTm90ZVtpbmRleF0sIGF1dG9TaXplOiB7IG1pblJvd3M6IDIsIG1heFJvd3M6IDQgfSwgcGxhY2Vob2xkZXI6IGlzU2NvdXRlck5vdGVbaW5kZXhdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIlRoZSBkZWZhdWx0IG5vdGUgaXMgbm90IGVkaXRhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwie3tTZWxlY3Rpb259fSwge3tJbWFnZX19Li4uXCIgfSkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIiBmbGV4IGZsZXgtcm93IGdhcC0zIGp1c3RpZnktZW5kXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHMubGVuZ3RoID4gMSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPEZvcm0uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuVG9vbHRpcCwgeyB0aXRsZTogXCJEZWxldGVcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiLCBvbkNsaWNrOiAoKSA9PiByZW1vdmUobmFtZSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuRGVsZXRlT3V0bGluZWQsIG51bGwpIH0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwvRm9ybS5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggIT09IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDxGb3JtLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlRvb2x0aXAsIHsgdGl0bGU6IFwiU2V0IGFzIERlZmF1bHRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiLCBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZShpbmRleCwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLlN0YXJPdXRsaW5lZCwgbnVsbCkgfSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC9Gb3JtLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSkpKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiLCB0eXBlOiBcImRhc2hlZFwiLCBvbkNsaWNrOiAoKSA9PiBhZGQoKSwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5QbHVzT3V0bGluZWQsIG51bGwpLCBibG9jazogdHJ1ZSB9LCBcIkFkZFwiKSkpKSkpLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCIgZmxleFwiIH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7IGNsYXNzTmFtZTogXCJ3LWF1dG8gaC1hdXRvIG1heC13LXhsIHAtNCBvYmplY3QtY29udGFpblwiLCBzcmM6IFwiaW1hZ2VzL2RpYWdyYW0ucG5nXCIgfSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCIgbXQtMTFcIiB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicFwiLCB7IGNsYXNzTmFtZTogXCIgbWItM1wiIH0sIFwiWW91IGNhbiBjdXN0b21pemUgdGhlIGNvbnRlbnQgb2YgZWFjaCBmaWVsZCB3aGVuIGFkZGluZyB0byBBbmtpLiBZb3UgY2FuIGlucHV0IGFueSBzdHJpbmcsIGluY2x1ZGluZyB0aGUgZm9sbG93aW5nIGR5bmFtaWMgdmFyaWFibGVzOlwiKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCIgbGlzdC1kaXNjIGZsZXggZmxleC1jb2wgZ2FwLTFcIiB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImgzXCIsIHsgY2xhc3NOYW1lOiBcIiBmb250LXNlbWlib2xkXCIgfSwgXCJ7e1NlbGVjdGlvbn19XCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCwgXCJTZWxlY3RlZCB0ZXh0XCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImgzXCIsIHsgY2xhc3NOYW1lOiBcIiBmb250LXNlbWlib2xkXCIgfSwgXCJ7e1NlbnRlbmNlfX1cIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCBcIlNlbnRlbmNlIGNvbnRhaW5pbmcgdGhlIHNlbGVjdGVkIHRleHRcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwiIGZvbnQtc2VtaWJvbGRcIiB9LCBcInt7QXVkaW99fVwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIFwiUHJvbnVuY2lhdGlvbiBvZiB0aGUgc2VsZWN0ZWQgY29udGVudFwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCB7IGNsYXNzTmFtZTogXCIgZm9udC1zZW1pYm9sZFwiIH0sIFwie3tJbWFnZX19XCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCwgXCJQaWN0dXJlXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImgzXCIsIHsgY2xhc3NOYW1lOiBcIiBmb250LXNlbWlib2xkXCIgfSwgXCJ7e0RlZmluaXRpb259fVwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIFwiRGVmaW5pdGlvbiBvZiB0aGUgY29udGVudFwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCB7IGNsYXNzTmFtZTogXCIgZm9udC1zZW1pYm9sZFwiIH0sIFwie3tTb3VyY2V9fVwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIFwiTGluayB0byB0aGUgY3VycmVudCB3ZWJzaXRlXCIpKSkpKSk7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gQW5raTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IGljb25zXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7XG5jb25zdCBQcm9UYWdfMSA9IHJlcXVpcmUoXCIuLi8uLi9Db21wb25lbnRzL1Byb1RhZ1wiKTtcbmNvbnN0IHVzZXJJbmZvXzEgPSByZXF1aXJlKFwiLi4vLi4vbGliL3VzZXJJbmZvXCIpO1xuY29uc3QgdXNlX2RlYm91bmNlXzEgPSByZXF1aXJlKFwidXNlLWRlYm91bmNlXCIpO1xuY29uc3QgY2FudmFzX2NvbmZldHRpXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImNhbnZhcy1jb25mZXR0aVwiKSk7XG5jb25zdCBQcm8gPSAoeyBzZXR0aW5ncywgc2F2ZU9wdGlvbnMgfSkgPT4ge1xuICAgIC8vIGNvbnN0IFt2ZXJpZmllZCwgc2V0VmVyaWZpZWRdID0gdXNlU3RhdGU8Ym9vbGVhbiB8IG51bGw+KGZhbHNlKTtcbiAgICBjb25zdCBbZm9ybV0gPSBhbnRkXzEuRm9ybS51c2VGb3JtKCk7XG4gICAgY29uc3QgdXNlckluZm8gPSAoMCwgdXNlckluZm9fMS51c2VVc2VySW5mb0NvbnRleHQpKCk7XG4gICAgY29uc3QgW2lzTW9kYWxPcGVuLCBzZXRJc01vZGFsT3Blbl0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAvLyB0aGlzR2V0VXNlclN0YXR1cygpXG4gICAgICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgICAgICAgLy8g5pu05pawIOm7mOiupOWAvFxuICAgICAgICAgICAgZm9ybS5zZXRGaWVsZHNWYWx1ZSh7XG4gICAgICAgICAgICAgICAgbmV3TGljZW5zZUtleTogc2V0dGluZ3MubmV3TGljZW5zZUtleSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwgW3NldHRpbmdzXSk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIGlmICh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCkge1xuICAgICAgICAgICAgKDAsIGNhbnZhc19jb25mZXR0aV8xLmRlZmF1bHQpKHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZUNvdW50OiAxNDAsXG4gICAgICAgICAgICAgICAgc3ByZWFkOiAxNzAsXG4gICAgICAgICAgICAgICAgb3JpZ2luOiB7IHk6IDAuNCB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCBbdXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWRdKTtcbiAgICBjb25zdCBoYW5kbGVGb3JtQ2hhbmdlID0gKDAsIHVzZV9kZWJvdW5jZV8xLnVzZURlYm91bmNlZENhbGxiYWNrKSgodGVybSkgPT4ge1xuICAgICAgICBzYXZlT3B0aW9ucyh0ZXJtKTtcbiAgICB9LCAzMDApO1xuICAgIGNvbnN0IHNob3dNb2RhbCA9ICgpID0+IHtcbiAgICAgICAgc2V0SXNNb2RhbE9wZW4odHJ1ZSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVPayA9ICgpID0+IHtcbiAgICAgICAgc2V0SXNNb2RhbE9wZW4oZmFsc2UpO1xuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAvLyA8c2VjdGlvbiBzdHlsZT17e1xuICAgIC8vICAgICBib3JkZXI6ICcxcHggc29saWQgI2ZmZDlhMScsXG4gICAgLy8gICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmZhZjAnXG4gICAgLy8gfX0+XG4gICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0sIHsgZm9ybTogZm9ybSwgb25WYWx1ZXNDaGFuZ2U6IGhhbmRsZUZvcm1DaGFuZ2UsIGxhYmVsQ29sOiB7IHNwYW46IDQgfSwgbGF5b3V0OiBcImhvcml6b250YWxcIiB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBuYW1lOiBcIm5ld0xpY2Vuc2VLZXlcIiwgXG4gICAgICAgICAgICAgICAgLy8gbGFiZWw9ezw+IDxQcm9UYWcgLz48Lz59XG4gICAgICAgICAgICAgICAgc3R5bGU6IHt9IH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLklucHV0LCB7IHN0eWxlOiB7IHBhZGRpbmdMZWZ0OiBcIjVweFwiIH0sIHByZWZpeDogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgc3R5bGU6IHsgbWFyZ2luUmlnaHQ6IFwiNHB4XCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChQcm9UYWdfMS5Qcm9UYWcsIG51bGwpKSwgc3VmZml4OiAodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpICYmIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkNoZWNrQ2lyY2xlVHdvVG9uZSwgeyB0d29Ub25lQ29sb3I6IFwiIzUyYzQxYVwiIH0pKSwgcGxhY2Vob2xkZXI6IFwiTGljZW5zZSBLZXlcIiwgdHlwZTogXCJwYXNzd29yZFwiIH0pKSksXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiLCB7IGNsYXNzTmFtZTogXCJiZy13aGl0ZSBcIiB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicHktOCBweC00IG14LWF1dG8gbWF4LXctc2NyZWVuLXhsIGxnOnB5LTkgbGc6cHgtNlwiIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibXgtYXV0byBtYXgtdy1zY3JlZW4tbWQgdGV4dC1jZW50ZXIgbWItOCBsZzptYi0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaDJcIiwgeyBjbGFzc05hbWU6IFwibWItNCB0ZXh0LTR4bCB0cmFja2luZy10aWdodCBmb250LWV4dHJhYm9sZCB0ZXh0LWdyYXktOTAwIFwiIH0sIFwiQnJpZGdpbmcgdGhlIGdhcCBiZXR3ZWVuIHRoZW9yeSBhbmQgcHJhY3RpY2VcIikpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZmxleC1yb3cganVzdGlmeS1jZW50ZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtY29sIHAtNiBteC00IG1pbi13LTcyIG1heC13LWxnIHRleHQtY2VudGVyIHRleHQtZ3JheS05MDAgYmctd2hpdGUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWdyYXktMTAwIHNoYWRvdyAgeGw6cC04IFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtY29sIGdhcC0zIG1iLThcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0yeGwgZm9udC1zZW1pYm9sZFwiIH0sIFwiU3RhcnRlclwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBcIiwgeyBjbGFzc05hbWU6IFwiZm9udC1saWdodCB0ZXh0LWdyYXktNTAwIHNtOnRleHQtbGcgXCIgfSwgXCIvXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtYmFzZWxpbmVcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwibXItMiB0ZXh0LTV4bCBmb250LWV4dHJhYm9sZFwiIH0sIFwiJDBcIikpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgeyByb2xlOiBcImxpc3RcIiwgY2xhc3NOYW1lOiBcIm1iLTggc3BhY2UteS00IHRleHQtbGVmdFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctNSBoLTUgdGV4dC1ncmVlbi01MDAgXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIHZpZXdCb3g6IFwiMCAwIDIwIDIwXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgZDogXCJNMTYuNzA3IDUuMjkzYTEgMSAwIDAxMCAxLjQxNGwtOCA4YTEgMSAwIDAxLTEuNDE0IDBsLTQtNGExIDEgMCAwMTEuNDE0LTEuNDE0TDggMTIuNTg2bDcuMjkzLTcuMjkzYTEgMSAwIDAxMS40MTQgMHpcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiQUlcIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTUgaC01IHRleHQtZ3JlZW4tNTAwIFwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCB2aWV3Qm94OiBcIjAgMCAyMCAyMFwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBmaWxsUnVsZTogXCJldmVub2RkXCIsIGQ6IFwiTTE2LjcwNyA1LjI5M2ExIDEgMCAwMTAgMS40MTRsLTggOGExIDEgMCAwMS0xLjQxNCAwbC00LTRhMSAxIDAgMDExLjQxNC0xLjQxNEw4IDEyLjU4Nmw3LjI5My03LjI5M2ExIDEgMCAwMTEuNDE0IDB6XCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIk9ubGluZSBkaWN0aW9uYXJ5XCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy01IGgtNSB0ZXh0LWdyZWVuLTUwMCBcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgdmlld0JveDogXCIwIDAgMjAgMjBcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBkOiBcIk0xNi43MDcgNS4yOTNhMSAxIDAgMDEwIDEuNDE0bC04IDhhMSAxIDAgMDEtMS40MTQgMGwtNC00YTEgMSAwIDAxMS40MTQtMS40MTRMOCAxMi41ODZsNy4yOTMtNy4yOTNhMSAxIDAgMDExLjQxNCAwelwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJBZGQgdG8gQW5raVwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctNSBoLTUgdGV4dC1ncmF5LTUwMCBcIiwgdmlld0JveDogXCIwIDAgMTUgMTVcIiwgZmlsbDogXCJub25lXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGQ6IFwiTTExLjc4MTYgNC4wMzE1N0MxMi4wMDYyIDMuODA3MDIgMTIuMDA2MiAzLjQ0Mjk1IDExLjc4MTYgMy4yMTg0QzExLjU1NzEgMi45OTM4NSAxMS4xOTMgMi45OTM4NSAxMC45Njg1IDMuMjE4NEw3LjUwMDA1IDYuNjg2ODJMNC4wMzE2NCAzLjIxODRDMy44MDcwOCAyLjk5Mzg1IDMuNDQzMDEgMi45OTM4NSAzLjIxODQ2IDMuMjE4NEMyLjk5MzkxIDMuNDQyOTUgMi45OTM5MSAzLjgwNzAyIDMuMjE4NDYgNC4wMzE1N0w2LjY4Njg4IDcuNDk5OTlMMy4yMTg0NiAxMC45Njg0QzIuOTkzOTEgMTEuMTkzIDIuOTkzOTEgMTEuNTU3IDMuMjE4NDYgMTEuNzgxNkMzLjQ0MzAxIDEyLjAwNjEgMy44MDcwOCAxMi4wMDYxIDQuMDMxNjQgMTEuNzgxNkw3LjUwMDA1IDguMzEzMTZMMTAuOTY4NSAxMS43ODE2QzExLjE5MyAxMi4wMDYxIDExLjU1NzEgMTIuMDA2MSAxMS43ODE2IDExLjc4MTZDMTIuMDA2MiAxMS41NTcgMTIuMDA2MiAxMS4xOTMgMTEuNzgxNiAxMC45Njg0TDguMzEzMjIgNy40OTk5OUwxMS43ODE2IDQuMDMxNTdaXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiU3VtbWFyaXplIFdlYnBhZ2UgQ29udGVudFwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctNSBoLTUgdGV4dC1ncmF5LTUwMCBcIiwgdmlld0JveDogXCIwIDAgMTUgMTVcIiwgZmlsbDogXCJub25lXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGQ6IFwiTTExLjc4MTYgNC4wMzE1N0MxMi4wMDYyIDMuODA3MDIgMTIuMDA2MiAzLjQ0Mjk1IDExLjc4MTYgMy4yMTg0QzExLjU1NzEgMi45OTM4NSAxMS4xOTMgMi45OTM4NSAxMC45Njg1IDMuMjE4NEw3LjUwMDA1IDYuNjg2ODJMNC4wMzE2NCAzLjIxODRDMy44MDcwOCAyLjk5Mzg1IDMuNDQzMDEgMi45OTM4NSAzLjIxODQ2IDMuMjE4NEMyLjk5MzkxIDMuNDQyOTUgMi45OTM5MSAzLjgwNzAyIDMuMjE4NDYgNC4wMzE1N0w2LjY4Njg4IDcuNDk5OTlMMy4yMTg0NiAxMC45Njg0QzIuOTkzOTEgMTEuMTkzIDIuOTkzOTEgMTEuNTU3IDMuMjE4NDYgMTEuNzgxNkMzLjQ0MzAxIDEyLjAwNjEgMy44MDcwOCAxMi4wMDYxIDQuMDMxNjQgMTEuNzgxNkw3LjUwMDA1IDguMzEzMTZMMTAuOTY4NSAxMS43ODE2QzExLjE5MyAxMi4wMDYxIDExLjU1NzEgMTIuMDA2MSAxMS43ODE2IDExLjc4MTZDMTIuMDA2MiAxMS41NTcgMTIuMDA2MiAxMS4xOTMgMTEuNzgxNiAxMC45Njg0TDguMzEzMjIgNy40OTk5OUwxMS43ODE2IDQuMDMxNTdaXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiTGVhcm5pbmcgaW4gWW91VHViZVwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctNSBoLTUgdGV4dC1ncmF5LTUwMCBcIiwgdmlld0JveDogXCIwIDAgMTUgMTVcIiwgZmlsbDogXCJub25lXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGQ6IFwiTTExLjc4MTYgNC4wMzE1N0MxMi4wMDYyIDMuODA3MDIgMTIuMDA2MiAzLjQ0Mjk1IDExLjc4MTYgMy4yMTg0QzExLjU1NzEgMi45OTM4NSAxMS4xOTMgMi45OTM4NSAxMC45Njg1IDMuMjE4NEw3LjUwMDA1IDYuNjg2ODJMNC4wMzE2NCAzLjIxODRDMy44MDcwOCAyLjk5Mzg1IDMuNDQzMDEgMi45OTM4NSAzLjIxODQ2IDMuMjE4NEMyLjk5MzkxIDMuNDQyOTUgMi45OTM5MSAzLjgwNzAyIDMuMjE4NDYgNC4wMzE1N0w2LjY4Njg4IDcuNDk5OTlMMy4yMTg0NiAxMC45Njg0QzIuOTkzOTEgMTEuMTkzIDIuOTkzOTEgMTEuNTU3IDMuMjE4NDYgMTEuNzgxNkMzLjQ0MzAxIDEyLjAwNjEgMy44MDcwOCAxMi4wMDYxIDQuMDMxNjQgMTEuNzgxNkw3LjUwMDA1IDguMzEzMTZMMTAuOTY4NSAxMS43ODE2QzExLjE5MyAxMi4wMDYxIDExLjU1NzEgMTIuMDA2MSAxMS43ODE2IDExLjc4MTZDMTIuMDA2MiAxMS41NTcgMTIuMDA2MiAxMS4xOTMgMTEuNzgxNiAxMC45Njg0TDguMzEzMjIgNy40OTk5OUwxMS43ODE2IDQuMDMxNTdaXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiU2VhcmNoIGltYWdlc1wiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctNSBoLTUgdGV4dC1ncmF5LTUwMCBcIiwgdmlld0JveDogXCIwIDAgMTUgMTVcIiwgZmlsbDogXCJub25lXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGQ6IFwiTTExLjc4MTYgNC4wMzE1N0MxMi4wMDYyIDMuODA3MDIgMTIuMDA2MiAzLjQ0Mjk1IDExLjc4MTYgMy4yMTg0QzExLjU1NzEgMi45OTM4NSAxMS4xOTMgMi45OTM4NSAxMC45Njg1IDMuMjE4NEw3LjUwMDA1IDYuNjg2ODJMNC4wMzE2NCAzLjIxODRDMy44MDcwOCAyLjk5Mzg1IDMuNDQzMDEgMi45OTM4NSAzLjIxODQ2IDMuMjE4NEMyLjk5MzkxIDMuNDQyOTUgMi45OTM5MSAzLjgwNzAyIDMuMjE4NDYgNC4wMzE1N0w2LjY4Njg4IDcuNDk5OTlMMy4yMTg0NiAxMC45Njg0QzIuOTkzOTEgMTEuMTkzIDIuOTkzOTEgMTEuNTU3IDMuMjE4NDYgMTEuNzgxNkMzLjQ0MzAxIDEyLjAwNjEgMy44MDcwOCAxMi4wMDYxIDQuMDMxNjQgMTEuNzgxNkw3LjUwMDA1IDguMzEzMTZMMTAuOTY4NSAxMS43ODE2QzExLjE5MyAxMi4wMDYxIDExLjU1NzEgMTIuMDA2MSAxMS43ODE2IDExLjc4MTZDMTIuMDA2MiAxMS41NTcgMTIuMDA2MiAxMS4xOTMgMTEuNzgxNiAxMC45Njg0TDguMzEzMjIgNy40OTk5OUwxMS43ODE2IDQuMDMxNTdaXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiUGFzdGUgdGhlIGltYWdlIGZyb20gdGhlIGNsaXBib2FyZFwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctNSBoLTUgdGV4dC1ncmF5LTUwMCBcIiwgdmlld0JveDogXCIwIDAgMTUgMTVcIiwgZmlsbDogXCJub25lXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGQ6IFwiTTExLjc4MTYgNC4wMzE1N0MxMi4wMDYyIDMuODA3MDIgMTIuMDA2MiAzLjQ0Mjk1IDExLjc4MTYgMy4yMTg0QzExLjU1NzEgMi45OTM4NSAxMS4xOTMgMi45OTM4NSAxMC45Njg1IDMuMjE4NEw3LjUwMDA1IDYuNjg2ODJMNC4wMzE2NCAzLjIxODRDMy44MDcwOCAyLjk5Mzg1IDMuNDQzMDEgMi45OTM4NSAzLjIxODQ2IDMuMjE4NEMyLjk5MzkxIDMuNDQyOTUgMi45OTM5MSAzLjgwNzAyIDMuMjE4NDYgNC4wMzE1N0w2LjY4Njg4IDcuNDk5OTlMMy4yMTg0NiAxMC45Njg0QzIuOTkzOTEgMTEuMTkzIDIuOTkzOTEgMTEuNTU3IDMuMjE4NDYgMTEuNzgxNkMzLjQ0MzAxIDEyLjAwNjEgMy44MDcwOCAxMi4wMDYxIDQuMDMxNjQgMTEuNzgxNkw3LjUwMDA1IDguMzEzMTZMMTAuOTY4NSAxMS43ODE2QzExLjE5MyAxMi4wMDYxIDExLjU1NzEgMTIuMDA2MSAxMS43ODE2IDExLjc4MTZDMTIuMDA2MiAxMS41NTcgMTIuMDA2MiAxMS4xOTMgMTEuNzgxNiAxMC45Njg0TDguMzEzMjIgNy40OTk5OUwxMS43ODE2IDQuMDMxNTdaXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiQXBwZW5kIHF1ZXJ5XCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy01IGgtNSB0ZXh0LWdyYXktNTAwIFwiLCB2aWV3Qm94OiBcIjAgMCAxNSAxNVwiLCBmaWxsOiBcIm5vbmVcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZDogXCJNMTEuNzgxNiA0LjAzMTU3QzEyLjAwNjIgMy44MDcwMiAxMi4wMDYyIDMuNDQyOTUgMTEuNzgxNiAzLjIxODRDMTEuNTU3MSAyLjk5Mzg1IDExLjE5MyAyLjk5Mzg1IDEwLjk2ODUgMy4yMTg0TDcuNTAwMDUgNi42ODY4Mkw0LjAzMTY0IDMuMjE4NEMzLjgwNzA4IDIuOTkzODUgMy40NDMwMSAyLjk5Mzg1IDMuMjE4NDYgMy4yMTg0QzIuOTkzOTEgMy40NDI5NSAyLjk5MzkxIDMuODA3MDIgMy4yMTg0NiA0LjAzMTU3TDYuNjg2ODggNy40OTk5OUwzLjIxODQ2IDEwLjk2ODRDMi45OTM5MSAxMS4xOTMgMi45OTM5MSAxMS41NTcgMy4yMTg0NiAxMS43ODE2QzMuNDQzMDEgMTIuMDA2MSAzLjgwNzA4IDEyLjAwNjEgNC4wMzE2NCAxMS43ODE2TDcuNTAwMDUgOC4zMTMxNkwxMC45Njg1IDExLjc4MTZDMTEuMTkzIDEyLjAwNjEgMTEuNTU3MSAxMi4wMDYxIDExLjc4MTYgMTEuNzgxNkMxMi4wMDYyIDExLjU1NyAxMi4wMDYyIDExLjE5MyAxMS43ODE2IDEwLjk2ODRMOC4zMTMyMiA3LjQ5OTk5TDExLjc4MTYgNC4wMzE1N1pcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJDb250ZW50IEVkaXRhYmxlXCIpKSkpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtY29sIHAtNiBteC00IG1pbi13LTcyIG1heC13LWxnIHRleHQtY2VudGVyIHRleHQtZ3JheS05MDAgYmctd2hpdGUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWdyYXktMTAwIHNoYWRvdyAgeGw6cC04IFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtY29sIGdhcC0zIG1iLThcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0yeGwgZm9udC1zZW1pYm9sZFwiIH0sIFwiUHJvXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicFwiLCB7IGNsYXNzTmFtZTogXCJmb250LWxpZ2h0IHRleHQtZ3JheS01MDAgc206dGV4dC1sZyBcIiB9LCBcIk9uZS10aW1lXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtYmFzZWxpbmVcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwibXItMiB0ZXh0LTV4bCBmb250LWV4dHJhYm9sZFwiIH0sIFwiJDlcIikpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgeyByb2xlOiBcImxpc3RcIiwgY2xhc3NOYW1lOiBcIm1iLTggc3BhY2UteS00IHRleHQtbGVmdFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctNSBoLTUgdGV4dC1ncmVlbi01MDAgXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIHZpZXdCb3g6IFwiMCAwIDIwIDIwXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgZDogXCJNMTYuNzA3IDUuMjkzYTEgMSAwIDAxMCAxLjQxNGwtOCA4YTEgMSAwIDAxLTEuNDE0IDBsLTQtNGExIDEgMCAwMTEuNDE0LTEuNDE0TDggMTIuNTg2bDcuMjkzLTcuMjkzYTEgMSAwIDAxMS40MTQgMHpcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiQUlcIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTUgaC01IHRleHQtZ3JlZW4tNTAwIFwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCB2aWV3Qm94OiBcIjAgMCAyMCAyMFwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBmaWxsUnVsZTogXCJldmVub2RkXCIsIGQ6IFwiTTE2LjcwNyA1LjI5M2ExIDEgMCAwMTAgMS40MTRsLTggOGExIDEgMCAwMS0xLjQxNCAwbC00LTRhMSAxIDAgMDExLjQxNC0xLjQxNEw4IDEyLjU4Nmw3LjI5My03LjI5M2ExIDEgMCAwMTEuNDE0IDB6XCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIk9ubGluZSBkaWN0aW9uYXJ5XCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy01IGgtNSB0ZXh0LWdyZWVuLTUwMCBcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgdmlld0JveDogXCIwIDAgMjAgMjBcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBkOiBcIk0xNi43MDcgNS4yOTNhMSAxIDAgMDEwIDEuNDE0bC04IDhhMSAxIDAgMDEtMS40MTQgMGwtNC00YTEgMSAwIDAxMS40MTQtMS40MTRMOCAxMi41ODZsNy4yOTMtNy4yOTNhMSAxIDAgMDExLjQxNCAwelwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJBZGQgdG8gQW5raVwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctNSBoLTUgdGV4dC1ncmVlbi01MDAgXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIHZpZXdCb3g6IFwiMCAwIDIwIDIwXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgZDogXCJNMTYuNzA3IDUuMjkzYTEgMSAwIDAxMCAxLjQxNGwtOCA4YTEgMSAwIDAxLTEuNDE0IDBsLTQtNGExIDEgMCAwMTEuNDE0LTEuNDE0TDggMTIuNTg2bDcuMjkzLTcuMjkzYTEgMSAwIDAxMS40MTQgMHpcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiU3VtbWFyaXplIFdlYnBhZ2UgQ29udGVudFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgdGFyZ2V0OiBcIl9ibGFua1wiLCBocmVmOiBcImh0dHBzOi8vamlhbmd6aWxvbmcubm90aW9uLnNpdGUvMWIxNTk2YjI4YjM0ODA3M2I2NmRkNmQ5MWIzZmU2MGE/cHZzPTRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyB3aWR0aDogXCIxNVwiLCBoZWlnaHQ6IFwiMTVcIiwgdmlld0JveDogXCIwIDAgMTUgMTVcIiwgZmlsbDogXCJub25lXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBkOiBcIk03LjQ5OTkxIDAuODc2ODkyQzMuODQyMjIgMC44NzY4OTIgMC44NzcwNzUgMy44NDIwNCAwLjg3NzA3NSA3LjQ5OTcyQzAuODc3MDc1IDExLjE1NzQgMy44NDIyMiAxNC4xMjI2IDcuNDk5OTEgMTQuMTIyNkMxMS4xNTc2IDE0LjEyMjYgMTQuMTIyNyAxMS4xNTc0IDE0LjEyMjcgNy40OTk3MkMxNC4xMjI3IDMuODQyMDQgMTEuMTU3NiAwLjg3Njg5MiA3LjQ5OTkxIDAuODc2ODkyWk0xLjgyNzA3IDcuNDk5NzJDMS44MjcwNyA0LjM2NjcxIDQuMzY2ODkgMS44MjY4OSA3LjQ5OTkxIDEuODI2ODlDMTAuNjMyOSAxLjgyNjg5IDEzLjE3MjcgNC4zNjY3MSAxMy4xNzI3IDcuNDk5NzJDMTMuMTcyNyAxMC42MzI3IDEwLjYzMjkgMTMuMTcyNiA3LjQ5OTkxIDEzLjE3MjZDNC4zNjY4OSAxMy4xNzI2IDEuODI3MDcgMTAuNjMyNyAxLjgyNzA3IDcuNDk5NzJaTTguMjQ5OTIgNC40OTk5OUM4LjI0OTkyIDQuOTE0MiA3LjkxNDEzIDUuMjQ5OTkgNy40OTk5MiA1LjI0OTk5QzcuMDg1NzEgNS4yNDk5OSA2Ljc0OTkyIDQuOTE0MiA2Ljc0OTkyIDQuNDk5OTlDNi43NDk5MiA0LjA4NTc3IDcuMDg1NzEgMy43NDk5OSA3LjQ5OTkyIDMuNzQ5OTlDNy45MTQxMyAzLjc0OTk5IDguMjQ5OTIgNC4wODU3NyA4LjI0OTkyIDQuNDk5OTlaTTYuMDAwMDMgNS45OTk5OUg2LjUwMDAzSDcuNTAwMDNDNy43NzYxOCA1Ljk5OTk5IDguMDAwMDMgNi4yMjM4NCA4LjAwMDAzIDYuNDk5OTlWOS45OTk5OUg4LjUwMDAzSDkuMDAwMDNWMTFIOC41MDAwM0g3LjUwMDAzSDYuNTAwMDNINi4wMDAwM1Y5Ljk5OTk5SDYuNTAwMDNINy4wMDAwM1Y2Ljk5OTk5SDYuNTAwMDNINi4wMDAwM1Y1Ljk5OTk5WlwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCBmaWxsUnVsZTogXCJldmVub2RkXCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy01IGgtNSB0ZXh0LWdyZWVuLTUwMCBcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgdmlld0JveDogXCIwIDAgMjAgMjBcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBkOiBcIk0xNi43MDcgNS4yOTNhMSAxIDAgMDEwIDEuNDE0bC04IDhhMSAxIDAgMDEtMS40MTQgMGwtNC00YTEgMSAwIDAxMS40MTQtMS40MTRMOCAxMi41ODZsNy4yOTMtNy4yOTNhMSAxIDAgMDExLjQxNCAwelwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJMZWFybmluZyBpbiBZb3VUdWJlXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyB0YXJnZXQ6IFwiX2JsYW5rXCIsIGhyZWY6IFwiaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9MZWFybmluZy1pbi1Zb3VUdWJlLVlvdVR1YmUtMWQ2MWZkNTA4MTVhNDJhNWFmMzk0ZGI0YTY5NWM3MTI/cHZzPTRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyB3aWR0aDogXCIxNVwiLCBoZWlnaHQ6IFwiMTVcIiwgdmlld0JveDogXCIwIDAgMTUgMTVcIiwgZmlsbDogXCJub25lXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBkOiBcIk03LjQ5OTkxIDAuODc2ODkyQzMuODQyMjIgMC44NzY4OTIgMC44NzcwNzUgMy44NDIwNCAwLjg3NzA3NSA3LjQ5OTcyQzAuODc3MDc1IDExLjE1NzQgMy44NDIyMiAxNC4xMjI2IDcuNDk5OTEgMTQuMTIyNkMxMS4xNTc2IDE0LjEyMjYgMTQuMTIyNyAxMS4xNTc0IDE0LjEyMjcgNy40OTk3MkMxNC4xMjI3IDMuODQyMDQgMTEuMTU3NiAwLjg3Njg5MiA3LjQ5OTkxIDAuODc2ODkyWk0xLjgyNzA3IDcuNDk5NzJDMS44MjcwNyA0LjM2NjcxIDQuMzY2ODkgMS44MjY4OSA3LjQ5OTkxIDEuODI2ODlDMTAuNjMyOSAxLjgyNjg5IDEzLjE3MjcgNC4zNjY3MSAxMy4xNzI3IDcuNDk5NzJDMTMuMTcyNyAxMC42MzI3IDEwLjYzMjkgMTMuMTcyNiA3LjQ5OTkxIDEzLjE3MjZDNC4zNjY4OSAxMy4xNzI2IDEuODI3MDcgMTAuNjMyNyAxLjgyNzA3IDcuNDk5NzJaTTguMjQ5OTIgNC40OTk5OUM4LjI0OTkyIDQuOTE0MiA3LjkxNDEzIDUuMjQ5OTkgNy40OTk5MiA1LjI0OTk5QzcuMDg1NzEgNS4yNDk5OSA2Ljc0OTkyIDQuOTE0MiA2Ljc0OTkyIDQuNDk5OTlDNi43NDk5MiA0LjA4NTc3IDcuMDg1NzEgMy43NDk5OSA3LjQ5OTkyIDMuNzQ5OTlDNy45MTQxMyAzLjc0OTk5IDguMjQ5OTIgNC4wODU3NyA4LjI0OTkyIDQuNDk5OTlaTTYuMDAwMDMgNS45OTk5OUg2LjUwMDAzSDcuNTAwMDNDNy43NzYxOCA1Ljk5OTk5IDguMDAwMDMgNi4yMjM4NCA4LjAwMDAzIDYuNDk5OTlWOS45OTk5OUg4LjUwMDAzSDkuMDAwMDNWMTFIOC41MDAwM0g3LjUwMDAzSDYuNTAwMDNINi4wMDAwM1Y5Ljk5OTk5SDYuNTAwMDNINy4wMDAwM1Y2Ljk5OTk5SDYuNTAwMDNINi4wMDAwM1Y1Ljk5OTk5WlwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCBmaWxsUnVsZTogXCJldmVub2RkXCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy01IGgtNSB0ZXh0LWdyZWVuLTUwMCBcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgdmlld0JveDogXCIwIDAgMjAgMjBcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBkOiBcIk0xNi43MDcgNS4yOTNhMSAxIDAgMDEwIDEuNDE0bC04IDhhMSAxIDAgMDEtMS40MTQgMGwtNC00YTEgMSAwIDAxMS40MTQtMS40MTRMOCAxMi41ODZsNy4yOTMtNy4yOTNhMSAxIDAgMDExLjQxNCAwelwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJTZWFyY2ggaW1hZ2VzXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyB0YXJnZXQ6IFwiX2JsYW5rXCIsIGhyZWY6IFwiaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9TZWFyY2gtaW1hZ2VzLTM5NmQyNDVkZWNlOTQ4ZmY4MDNiOWU1MWY1NmJiMzhmP3B2cz00XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgd2lkdGg6IFwiMTVcIiwgaGVpZ2h0OiBcIjE1XCIsIHZpZXdCb3g6IFwiMCAwIDE1IDE1XCIsIGZpbGw6IFwibm9uZVwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZDogXCJNNy40OTk5MSAwLjg3Njg5MkMzLjg0MjIyIDAuODc2ODkyIDAuODc3MDc1IDMuODQyMDQgMC44NzcwNzUgNy40OTk3MkMwLjg3NzA3NSAxMS4xNTc0IDMuODQyMjIgMTQuMTIyNiA3LjQ5OTkxIDE0LjEyMjZDMTEuMTU3NiAxNC4xMjI2IDE0LjEyMjcgMTEuMTU3NCAxNC4xMjI3IDcuNDk5NzJDMTQuMTIyNyAzLjg0MjA0IDExLjE1NzYgMC44NzY4OTIgNy40OTk5MSAwLjg3Njg5MlpNMS44MjcwNyA3LjQ5OTcyQzEuODI3MDcgNC4zNjY3MSA0LjM2Njg5IDEuODI2ODkgNy40OTk5MSAxLjgyNjg5QzEwLjYzMjkgMS44MjY4OSAxMy4xNzI3IDQuMzY2NzEgMTMuMTcyNyA3LjQ5OTcyQzEzLjE3MjcgMTAuNjMyNyAxMC42MzI5IDEzLjE3MjYgNy40OTk5MSAxMy4xNzI2QzQuMzY2ODkgMTMuMTcyNiAxLjgyNzA3IDEwLjYzMjcgMS44MjcwNyA3LjQ5OTcyWk04LjI0OTkyIDQuNDk5OTlDOC4yNDk5MiA0LjkxNDIgNy45MTQxMyA1LjI0OTk5IDcuNDk5OTIgNS4yNDk5OUM3LjA4NTcxIDUuMjQ5OTkgNi43NDk5MiA0LjkxNDIgNi43NDk5MiA0LjQ5OTk5QzYuNzQ5OTIgNC4wODU3NyA3LjA4NTcxIDMuNzQ5OTkgNy40OTk5MiAzLjc0OTk5QzcuOTE0MTMgMy43NDk5OSA4LjI0OTkyIDQuMDg1NzcgOC4yNDk5MiA0LjQ5OTk5Wk02LjAwMDAzIDUuOTk5OTlINi41MDAwM0g3LjUwMDAzQzcuNzc2MTggNS45OTk5OSA4LjAwMDAzIDYuMjIzODQgOC4wMDAwMyA2LjQ5OTk5VjkuOTk5OTlIOC41MDAwM0g5LjAwMDAzVjExSDguNTAwMDNINy41MDAwM0g2LjUwMDAzSDYuMDAwMDNWOS45OTk5OUg2LjUwMDAzSDcuMDAwMDNWNi45OTk5OUg2LjUwMDAzSDYuMDAwMDNWNS45OTk5OVpcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctNSBoLTUgdGV4dC1ncmVlbi01MDAgXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIHZpZXdCb3g6IFwiMCAwIDIwIDIwXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgZDogXCJNMTYuNzA3IDUuMjkzYTEgMSAwIDAxMCAxLjQxNGwtOCA4YTEgMSAwIDAxLTEuNDE0IDBsLTQtNGExIDEgMCAwMTEuNDE0LTEuNDE0TDggMTIuNTg2bDcuMjkzLTcuMjkzYTEgMSAwIDAxMS40MTQgMHpcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiUGFzdGUgdGhlIGltYWdlIGZyb20gdGhlIGNsaXBib2FyZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgdGFyZ2V0OiBcIl9ibGFua1wiLCBocmVmOiBcImh0dHBzOi8vamlhbmd6aWxvbmcubm90aW9uLnNpdGUvUGFzdGUtdGhlLWltYWdlLWZyb20tdGhlLWNsaXBib2FyZC0zNjA2Y2E4ZTU3NGY0NjUyYWM1ODM3MjAzYzY1MWRhNz9wdnM9NFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IHdpZHRoOiBcIjE1XCIsIGhlaWdodDogXCIxNVwiLCB2aWV3Qm94OiBcIjAgMCAxNSAxNVwiLCBmaWxsOiBcIm5vbmVcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGQ6IFwiTTcuNDk5OTEgMC44NzY4OTJDMy44NDIyMiAwLjg3Njg5MiAwLjg3NzA3NSAzLjg0MjA0IDAuODc3MDc1IDcuNDk5NzJDMC44NzcwNzUgMTEuMTU3NCAzLjg0MjIyIDE0LjEyMjYgNy40OTk5MSAxNC4xMjI2QzExLjE1NzYgMTQuMTIyNiAxNC4xMjI3IDExLjE1NzQgMTQuMTIyNyA3LjQ5OTcyQzE0LjEyMjcgMy44NDIwNCAxMS4xNTc2IDAuODc2ODkyIDcuNDk5OTEgMC44NzY4OTJaTTEuODI3MDcgNy40OTk3MkMxLjgyNzA3IDQuMzY2NzEgNC4zNjY4OSAxLjgyNjg5IDcuNDk5OTEgMS44MjY4OUMxMC42MzI5IDEuODI2ODkgMTMuMTcyNyA0LjM2NjcxIDEzLjE3MjcgNy40OTk3MkMxMy4xNzI3IDEwLjYzMjcgMTAuNjMyOSAxMy4xNzI2IDcuNDk5OTEgMTMuMTcyNkM0LjM2Njg5IDEzLjE3MjYgMS44MjcwNyAxMC42MzI3IDEuODI3MDcgNy40OTk3MlpNOC4yNDk5MiA0LjQ5OTk5QzguMjQ5OTIgNC45MTQyIDcuOTE0MTMgNS4yNDk5OSA3LjQ5OTkyIDUuMjQ5OTlDNy4wODU3MSA1LjI0OTk5IDYuNzQ5OTIgNC45MTQyIDYuNzQ5OTIgNC40OTk5OUM2Ljc0OTkyIDQuMDg1NzcgNy4wODU3MSAzLjc0OTk5IDcuNDk5OTIgMy43NDk5OUM3LjkxNDEzIDMuNzQ5OTkgOC4yNDk5MiA0LjA4NTc3IDguMjQ5OTIgNC40OTk5OVpNNi4wMDAwMyA1Ljk5OTk5SDYuNTAwMDNINy41MDAwM0M3Ljc3NjE4IDUuOTk5OTkgOC4wMDAwMyA2LjIyMzg0IDguMDAwMDMgNi40OTk5OVY5Ljk5OTk5SDguNTAwMDNIOS4wMDAwM1YxMUg4LjUwMDAzSDcuNTAwMDNINi41MDAwM0g2LjAwMDAzVjkuOTk5OTlINi41MDAwM0g3LjAwMDAzVjYuOTk5OTlINi41MDAwM0g2LjAwMDAzVjUuOTk5OTlaXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTUgaC01IHRleHQtZ3JlZW4tNTAwIFwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCB2aWV3Qm94OiBcIjAgMCAyMCAyMFwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBmaWxsUnVsZTogXCJldmVub2RkXCIsIGQ6IFwiTTE2LjcwNyA1LjI5M2ExIDEgMCAwMTAgMS40MTRsLTggOGExIDEgMCAwMS0xLjQxNCAwbC00LTRhMSAxIDAgMDExLjQxNC0xLjQxNEw4IDEyLjU4Nmw3LjI5My03LjI5M2ExIDEgMCAwMTEuNDE0IDB6XCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIkFwcGVuZCBxdWVyeVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgdGFyZ2V0OiBcIl9ibGFua1wiLCBocmVmOiBcImh0dHBzOi8vamlhbmd6aWxvbmcubm90aW9uLnNpdGUvRm9sbG93LXVwLXF1ZXN0aW9uLWMzMjEwNzJlOWNiYzRiY2ZiNTE4NDM2NDdhYTcyMDQ1P3B2cz00XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgd2lkdGg6IFwiMTVcIiwgaGVpZ2h0OiBcIjE1XCIsIHZpZXdCb3g6IFwiMCAwIDE1IDE1XCIsIGZpbGw6IFwibm9uZVwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZDogXCJNNy40OTk5MSAwLjg3Njg5MkMzLjg0MjIyIDAuODc2ODkyIDAuODc3MDc1IDMuODQyMDQgMC44NzcwNzUgNy40OTk3MkMwLjg3NzA3NSAxMS4xNTc0IDMuODQyMjIgMTQuMTIyNiA3LjQ5OTkxIDE0LjEyMjZDMTEuMTU3NiAxNC4xMjI2IDE0LjEyMjcgMTEuMTU3NCAxNC4xMjI3IDcuNDk5NzJDMTQuMTIyNyAzLjg0MjA0IDExLjE1NzYgMC44NzY4OTIgNy40OTk5MSAwLjg3Njg5MlpNMS44MjcwNyA3LjQ5OTcyQzEuODI3MDcgNC4zNjY3MSA0LjM2Njg5IDEuODI2ODkgNy40OTk5MSAxLjgyNjg5QzEwLjYzMjkgMS44MjY4OSAxMy4xNzI3IDQuMzY2NzEgMTMuMTcyNyA3LjQ5OTcyQzEzLjE3MjcgMTAuNjMyNyAxMC42MzI5IDEzLjE3MjYgNy40OTk5MSAxMy4xNzI2QzQuMzY2ODkgMTMuMTcyNiAxLjgyNzA3IDEwLjYzMjcgMS44MjcwNyA3LjQ5OTcyWk04LjI0OTkyIDQuNDk5OTlDOC4yNDk5MiA0LjkxNDIgNy45MTQxMyA1LjI0OTk5IDcuNDk5OTIgNS4yNDk5OUM3LjA4NTcxIDUuMjQ5OTkgNi43NDk5MiA0LjkxNDIgNi43NDk5MiA0LjQ5OTk5QzYuNzQ5OTIgNC4wODU3NyA3LjA4NTcxIDMuNzQ5OTkgNy40OTk5MiAzLjc0OTk5QzcuOTE0MTMgMy43NDk5OSA4LjI0OTkyIDQuMDg1NzcgOC4yNDk5MiA0LjQ5OTk5Wk02LjAwMDAzIDUuOTk5OTlINi41MDAwM0g3LjUwMDAzQzcuNzc2MTggNS45OTk5OSA4LjAwMDAzIDYuMjIzODQgOC4wMDAwMyA2LjQ5OTk5VjkuOTk5OTlIOC41MDAwM0g5LjAwMDAzVjExSDguNTAwMDNINy41MDAwM0g2LjUwMDAzSDYuMDAwMDNWOS45OTk5OUg2LjUwMDAzSDcuMDAwMDNWNi45OTk5OUg2LjUwMDAzSDYuMDAwMDNWNS45OTk5OVpcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctNSBoLTUgdGV4dC1ncmVlbi01MDAgXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIHZpZXdCb3g6IFwiMCAwIDIwIDIwXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgZDogXCJNMTYuNzA3IDUuMjkzYTEgMSAwIDAxMCAxLjQxNGwtOCA4YTEgMSAwIDAxLTEuNDE0IDBsLTQtNGExIDEgMCAwMTEuNDE0LTEuNDE0TDggMTIuNTg2bDcuMjkzLTcuMjkzYTEgMSAwIDAxMS40MTQgMHpcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiQ29udGVudCBFZGl0YWJsZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgdGFyZ2V0OiBcIl9ibGFua1wiLCBocmVmOiBcImh0dHBzOi8vamlhbmd6aWxvbmcubm90aW9uLnNpdGUvQ29udGVudC1FZGl0YWJsZS1Qcm8tNTQ2NDQ0MzhiNzdkNGQzZmI3NTZjZjhiYWFmNTM1N2E/cHZzPTRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyB3aWR0aDogXCIxNVwiLCBoZWlnaHQ6IFwiMTVcIiwgdmlld0JveDogXCIwIDAgMTUgMTVcIiwgZmlsbDogXCJub25lXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyBkOiBcIk03LjQ5OTkxIDAuODc2ODkyQzMuODQyMjIgMC44NzY4OTIgMC44NzcwNzUgMy44NDIwNCAwLjg3NzA3NSA3LjQ5OTcyQzAuODc3MDc1IDExLjE1NzQgMy44NDIyMiAxNC4xMjI2IDcuNDk5OTEgMTQuMTIyNkMxMS4xNTc2IDE0LjEyMjYgMTQuMTIyNyAxMS4xNTc0IDE0LjEyMjcgNy40OTk3MkMxNC4xMjI3IDMuODQyMDQgMTEuMTU3NiAwLjg3Njg5MiA3LjQ5OTkxIDAuODc2ODkyWk0xLjgyNzA3IDcuNDk5NzJDMS44MjcwNyA0LjM2NjcxIDQuMzY2ODkgMS44MjY4OSA3LjQ5OTkxIDEuODI2ODlDMTAuNjMyOSAxLjgyNjg5IDEzLjE3MjcgNC4zNjY3MSAxMy4xNzI3IDcuNDk5NzJDMTMuMTcyNyAxMC42MzI3IDEwLjYzMjkgMTMuMTcyNiA3LjQ5OTkxIDEzLjE3MjZDNC4zNjY4OSAxMy4xNzI2IDEuODI3MDcgMTAuNjMyNyAxLjgyNzA3IDcuNDk5NzJaTTguMjQ5OTIgNC40OTk5OUM4LjI0OTkyIDQuOTE0MiA3LjkxNDEzIDUuMjQ5OTkgNy40OTk5MiA1LjI0OTk5QzcuMDg1NzEgNS4yNDk5OSA2Ljc0OTkyIDQuOTE0MiA2Ljc0OTkyIDQuNDk5OTlDNi43NDk5MiA0LjA4NTc3IDcuMDg1NzEgMy43NDk5OSA3LjQ5OTkyIDMuNzQ5OTlDNy45MTQxMyAzLjc0OTk5IDguMjQ5OTIgNC4wODU3NyA4LjI0OTkyIDQuNDk5OTlaTTYuMDAwMDMgNS45OTk5OUg2LjUwMDAzSDcuNTAwMDNDNy43NzYxOCA1Ljk5OTk5IDguMDAwMDMgNi4yMjM4NCA4LjAwMDAzIDYuNDk5OTlWOS45OTk5OUg4LjUwMDAzSDkuMDAwMDNWMTFIOC41MDAwM0g3LjUwMDAzSDYuNTAwMDNINi4wMDAwM1Y5Ljk5OTk5SDYuNTAwMDNINy4wMDAwM1Y2Ljk5OTk5SDYuNTAwMDNINi4wMDAwM1Y1Ljk5OTk5WlwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCBmaWxsUnVsZTogXCJldmVub2RkXCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSkpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBocmVmOiBcIiNcIiwgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihcImh0dHBzOi8vamlhbmcubGVtb25zcXVlZXp5LmNvbS9jaGVja291dC9idXkvZTMxZjhjMTgtN2JmMi00ZjZiLTg1YzItNTA4ZmI1MDBjZTg0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGNsYXNzTmFtZTogXCJ0ZXh0LXdoaXRlIGhvdmVyOnRleHQtd2hpdGUgYmctb3JhbmdlLTQwMCBob3ZlcjpiZy1vcmFuZ2UtNTAwIGZvY3VzOnJpbmctNCBmb2N1czpyaW5nLXByaW1hcnktMjAwIGZvbnQtbWVkaXVtIHJvdW5kZWQtbGcgdGV4dC1zbSBweC01IHB5LTIuNSB0ZXh0LWNlbnRlciBcIiB9LCBcIkdldCBzdGFydGVkXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGhyZWY6IFwiI1wiLCBvbkNsaWNrOiBzaG93TW9kYWwsIGNsYXNzTmFtZTogXCIgbXQtMiBob3Zlcjp0ZXh0LW9yYW5nZS01MDAgdGV4dC1vcmFuZ2UtNDAwICBmb2N1czpyaW5nLTQgZm9jdXM6cmluZy1wcmltYXJ5LTIwMCBmb250LW1lZGl1bSByb3VuZGVkLWxnIHRleHQtc20gcHgtNSBweS0yLjUgdGV4dC1jZW50ZXIgXCIgfSwgXCJcXHU1RkFFXFx1NEZFMVxcdTY1MkZcXHU0RUQ4XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Nb2RhbCwgeyB0aXRsZTogXCJXZUNoYXRQYXlcIiwgb3BlbjogaXNNb2RhbE9wZW4sIG9uQ2FuY2VsOiBoYW5kbGVPaywgZm9vdGVyOiBudWxsLCBtYXNrQ2xvc2FibGU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgZ2FwLTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIFwiXFx1OEJGN1xcdTU3MjhcXHU0RUQ4XFx1NkIzRVxcdTY1RjZcXHU1OTA3XFx1NkNFOFxcdTRGNjBcXHU3Njg0XFx1OTBBRVxcdTdCQjFcXHVGRjBDXFx1NkZDMFxcdTZEM0JcXHU3ODAxXFx1NUMwNlxcdTUzRDFcXHU5MDAxXFx1ODFGM1xcdTkwQUVcXHU3QkIxXFx1NEUyRFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsgd2lkdGg6IDI0MCwgc3JjOiBcImltYWdlcy9XZUNoYXRQYXkucG5nXCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcdTYyMTFcXHU0RUVDXFx1NEYxQVxcdTVDM0RcXHU1RkVCXFx1NTNEMVxcdTkwMDFcXHU2RkMwXFx1NkQzQlxcdTc4MDFcXHVGRjBDXFx1ODJFNVxcdTY3MkFcXHU2NTM2XFx1NTIzMFxcdTUzRUZcXHU4MDU0XFx1N0NGQlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LW9yYW5nZS00MDBcIiwgaHJlZjogXCJtYWlsdG86anpsb25nNjY2QGdtYWlsLmNvbT9zdWJqZWN0PVxcdThCRjdcXHU1M0QxXFx1OTAwMSBTY291dGVyIFxcdTZGQzBcXHU2RDNCXFx1NzgwMVwiIH0sIFwianpsb25nNjY2QGdtYWlsLmNvbVwiKSkpKSkpKSkpKSk7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gUHJvO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgdXNlX2RlYm91bmNlXzEgPSByZXF1aXJlKFwidXNlLWRlYm91bmNlXCIpO1xuY29uc3QgWW91dHViZSA9ICh7IHNldHRpbmdzLCBzYXZlT3B0aW9ucyB9KSA9PiB7XG4gICAgY29uc3QgW2Zvcm1dID0gYW50ZF8xLkZvcm0udXNlRm9ybSgpO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhzZXR0aW5ncyk7XG4gICAgICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgICAgICAgLy8g5pu05pawIOm7mOiupOWAvFxuICAgICAgICAgICAgZm9ybS5zZXRGaWVsZHNWYWx1ZSh7XG4gICAgICAgICAgICAgICAgc2hvd1lvdXR1YmVCdXR0b246IHNldHRpbmdzLnNob3dZb3V0dWJlQnV0dG9uLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCBbc2V0dGluZ3NdKTtcbiAgICBjb25zdCBoYW5kbGVGb3JtQ2hhbmdlID0gKDAsIHVzZV9kZWJvdW5jZV8xLnVzZURlYm91bmNlZENhbGxiYWNrKSgodGVybSkgPT4ge1xuICAgICAgICBzYXZlT3B0aW9ucyh0ZXJtKTtcbiAgICB9LCAzMDApO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm1cbiAgICAvLyBvbkZpbmlzaD17fVxuICAgICwgeyBcbiAgICAgICAgLy8gb25GaW5pc2g9e31cbiAgICAgICAgb25WYWx1ZXNDaGFuZ2U6IGhhbmRsZUZvcm1DaGFuZ2UsIGZvcm06IGZvcm0sIGxhYmVsQ29sOiB7IHNwYW46IDQgfSwgbGF5b3V0OiBcImhvcml6b250YWxcIiB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIiwgbnVsbCxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgbmFtZTogXCJzaG93WW91dHViZUJ1dHRvblwiLCB2YWx1ZVByb3BOYW1lOiBcImNoZWNrZWRcIiwgbGFiZWw6IFwiXFx1RDgzRFxcdURDRkEgWW91VHViZSBzaG9ydGN1dFwiLCBleHRyYTogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBjbGFzc05hbWU6IFwiIHctZnVsbCBweS0yIG1heC13LTJ4bFwiLCBzcmM6IFwiaW1hZ2VzL3lvdXR1YmUucG5nXCIgfSkpIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlN3aXRjaCwgbnVsbCkpKSkpO1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IFlvdXR1YmU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCJ2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyAob2JqKSA9PiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIDogKG9iaikgPT4gKG9iai5fX3Byb3RvX18pO1xudmFyIGxlYWZQcm90b3R5cGVzO1xuLy8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuLy8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vLyBtb2RlICYgMTY6IHJldHVybiB2YWx1ZSB3aGVuIGl0J3MgUHJvbWlzZS1saWtlXG4vLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuXHRpZihtb2RlICYgMSkgdmFsdWUgPSB0aGlzKHZhbHVlKTtcblx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcblx0aWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuXHRcdGlmKChtb2RlICYgNCkgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmKChtb2RlICYgMTYpICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdH1cblx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcblx0dmFyIGRlZiA9IHt9O1xuXHRsZWFmUHJvdG90eXBlcyA9IGxlYWZQcm90b3R5cGVzIHx8IFtudWxsLCBnZXRQcm90byh7fSksIGdldFByb3RvKFtdKSwgZ2V0UHJvdG8oZ2V0UHJvdG8pXTtcblx0Zm9yKHZhciBjdXJyZW50ID0gbW9kZSAmIDIgJiYgdmFsdWU7IHR5cGVvZiBjdXJyZW50ID09ICdvYmplY3QnICYmICF+bGVhZlByb3RvdHlwZXMuaW5kZXhPZihjdXJyZW50KTsgY3VycmVudCA9IGdldFByb3RvKGN1cnJlbnQpKSB7XG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCkuZm9yRWFjaCgoa2V5KSA9PiAoZGVmW2tleV0gPSAoKSA9PiAodmFsdWVba2V5XSkpKTtcblx0fVxuXHRkZWZbJ2RlZmF1bHQnXSA9ICgpID0+ICh2YWx1ZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChucywgZGVmKTtcblx0cmV0dXJuIG5zO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18uaG1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUgPSBPYmplY3QuY3JlYXRlKG1vZHVsZSk7XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgJ2V4cG9ydHMnLCB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRzZXQ6ICgpID0+IHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignRVMgTW9kdWxlcyBtYXkgbm90IGFzc2lnbiBtb2R1bGUuZXhwb3J0cyBvciBleHBvcnRzLiosIFVzZSBFU00gZXhwb3J0IHN5bnRheCwgaW5zdGVhZDogJyArIG1vZHVsZS5pZCk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm9wdGlvbnNcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2hyb21lX2V4dGVuc2lvbl90eXBlc2NyaXB0X3N0YXJ0ZXJcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2hyb21lX2V4dGVuc2lvbl90eXBlc2NyaXB0X3N0YXJ0ZXJcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL09wdGlvbnMvaW5kZXgudHN4XCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=