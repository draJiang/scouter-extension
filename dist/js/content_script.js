/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Components/CustomPromptForm.tsx":
/*!*********************************************!*\
  !*** ./src/Components/CustomPromptForm.tsx ***!
  \*********************************************/
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
exports.CustomPromptForm = void 0;
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
function CustomPromptForm(props) {
    const [form] = antd_1.Form.useForm();
    (0, react_1.useEffect)(() => {
        // 更新 input 文本框的默认值
        form.setFieldsValue({
            title: props.data.title,
            getUnsplashImages: props.data.getUnsplashImages,
            userPrompt: props.data.userPrompt
        });
    }, [props.data]);
    // 保存 Prompt
    const savePrompt = (values) => __awaiter(this, void 0, void 0, function* () {
        // 关闭表单
        props.openCustomPromptForm({ isOpen: false, data: { 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' } });
        const timestamp = new Date().getTime().toString();
        // 获取已保存的 Prompt List
        const promptList = yield webextension_polyfill_1.default.storage.sync.get({ "promptList": [] }).then((item) => {
            return item.promptList;
        });
        let newPrompts = promptList;
        // 如果 props 中包含 ID，则说明当前是在编辑 Prompt 而不是新增 Prompt
        if (props.data.id !== '') {
            // 在 Prompt 记录中找到这条 Prompt
            for (let i = 0; i < newPrompts.length; i++) {
                if (newPrompts[i]['id'] === props.data.id) {
                    // 修改
                    newPrompts[i]['title'] = values['title'];
                    newPrompts[i]['getUnsplashImages'] = values['getUnsplashImages'];
                    newPrompts[i]['userPrompt'] = values['userPrompt'];
                    break;
                }
            }
        }
        else {
            newPrompts = [Object.assign(Object.assign({}, values), { 'id': timestamp }), ...promptList];
        }
        // 将 Prompt 保存下来
        webextension_polyfill_1.default.storage.sync.set({
            promptList: newPrompts.length > 6 ? newPrompts.splice(0, 6) : newPrompts,
        }).then(item => {
            // 将 Prompt 传回给父组件，以让 Prompt 列表 UI 重新渲染
            props.handlePromptEdited(props.data.id === '');
        }).catch((error) => {
            alert('🥲Save failed, possibly due to a too long Prompt. You can delete other Prompts or shorten the Prompt characters and try again. \n' + error);
        });
    });
    // 删除 Prompt
    const handleDeleteButtonClick = () => __awaiter(this, void 0, void 0, function* () {
        // 关闭表单
        props.openCustomPromptForm({ isOpen: false, data: { 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' } });
        // 获取已保存的 Prompt List
        const promptList = yield webextension_polyfill_1.default.storage.sync.get({ "promptList": [] }).then((item) => {
            return item.promptList;
        });
        let newPrompts = promptList;
        // 在 Prompt 记录中找到这条 Prompt
        for (let i = 0; i < newPrompts.length; i++) {
            if (newPrompts[i]['id'] === props.data.id) {
                // 删除
                newPrompts.splice(i, 1);
                // 将 Prompt 保存下来
                webextension_polyfill_1.default.storage.sync.set({
                    promptList: newPrompts.length > 6 ? newPrompts.splice(0, 6) : newPrompts,
                }).then(item => {
                    // 将 Prompt 传回给父组件，以让 Prompt 列表 UI 重新渲染
                    props.handlePromptEdited(props.data.id === '');
                });
                break;
            }
        }
    });
    const handleKeyDown = (event) => {
        event.stopPropagation();
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(antd_1.Form, { onFinish: savePrompt, 
            // layout='horizontal'
            labelCol: {
                xs: { span: 6 },
                sm: { span: 5 },
            }, form: form },
            react_1.default.createElement(antd_1.Form.Item, { name: "title", label: "Title", rules: [{ required: true, message: 'Please input your title' }] },
                react_1.default.createElement(antd_1.Input, { maxLength: 40, onKeyDown: handleKeyDown, placeholder: "How to name the Prompt", type: "text" })),
            react_1.default.createElement(antd_1.Form.Item, { extra: "Display Images Related to the Selected Text", name: "getUnsplashImages", label: "Images", valuePropName: "checked" },
                react_1.default.createElement(antd_1.Switch, null)),
            react_1.default.createElement(antd_1.Form.Item, { name: "userPrompt", label: "Prompt", extra: react_1.default.createElement(react_1.default.Fragment, null,
                    `${'{selection}'}: Selected text`,
                    react_1.default.createElement("br", null),
                    `${'{sentence}'}: Sentence containing the selected text`,
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("a", { style: {
                            opacity: 1,
                            color: '#F08A24',
                            textDecoration: 'underline'
                        }, onClick: () => window.open('https://jiangzilong.notion.site/Dynamic-Placeholders-5f0705163ff640afbdd577115dc95779?pvs=4') }, "Learn More")), rules: [{ required: true, message: 'Please input your prompt' }] },
                react_1.default.createElement(antd_1.Input.TextArea, { placeholder: "Translate {selection} to Chinese", onKeyDown: handleKeyDown, rows: 4, maxLength: 3000 })),
            react_1.default.createElement(antd_1.Form.Item, { style: { margin: '0' } },
                props.data.id !== '' && react_1.default.createElement(antd_1.Button, { style: {
                        marginRight: '12px'
                    }, onClick: handleDeleteButtonClick, danger: true }, "Delete"),
                react_1.default.createElement(antd_1.Button, { style: { minWidth: '120px' }, type: "primary", htmlType: "submit" }, "Save")))));
}
exports.CustomPromptForm = CustomPromptForm;


/***/ }),

/***/ "./src/Components/DropdownMenuItem.tsx":
/*!*********************************************!*\
  !*** ./src/Components/DropdownMenuItem.tsx ***!
  \*********************************************/
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
exports.DropdownMenuItem = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const util_1 = __webpack_require__(/*! ../PopupCard/util */ "./src/PopupCard/util.ts");
const DropdownMenu = __importStar(__webpack_require__(/*! @radix-ui/react-dropdown-menu */ "./node_modules/@radix-ui/react-dropdown-menu/dist/index.js"));
const react_icons_1 = __webpack_require__(/*! @radix-ui/react-icons */ "./node_modules/@radix-ui/react-icons/dist/react-icons.esm.js");
function DropdownMenuItem(props) {
    const [isHovered, setIsHovered] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
    });
    const onSelect = () => {
        props.onSelect();
    };
    const handleEditPrompt = (event) => {
        event.stopPropagation();
        props.handleEditPrompt();
    };
    return (react_1.default.createElement(DropdownMenu.Item, { style: {
            display: 'flex',
            padding: '6px',
            marginBottom: '4px',
            borderRadius: '2px'
        }, className: "DropdownMenuItem", onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), onSelect: onSelect },
        react_1.default.createElement("span", { style: {
                flex: '1',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            } }, props.children),
        isHovered &&
            (props.data.id === 'Default' ?
                react_1.default.createElement("button", { onClick: (event) => {
                        event.stopPropagation();
                        window.open('https://jiangzilong.notion.site/What-is-the-default-Prompt-Prompt-5b55e3fc303d425f8cca16d5bee19e7c');
                    } },
                    react_1.default.createElement(react_icons_1.QuestionMarkCircledIcon, null))
                :
                    props.data.id === util_1.dictionaryPrompt.id ?
                        react_1.default.createElement("button", { onClick: (event) => {
                                event.stopPropagation();
                                window.open('https://jiangzilong.notion.site/Online-Dictionary-43737527dc134bceb2d40ed79be1e0e3?pvs=4');
                            } },
                            react_1.default.createElement(react_icons_1.QuestionMarkCircledIcon, null))
                        :
                            react_1.default.createElement("button", { onClick: handleEditPrompt },
                                react_1.default.createElement(react_icons_1.Pencil2Icon, null)))));
}
exports.DropdownMenuItem = DropdownMenuItem;


/***/ }),

/***/ "./src/Components/Images.tsx":
/*!***********************************!*\
  !*** ./src/Components/Images.tsx ***!
  \***********************************/
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
exports.Images = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const icons_1 = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
const ProTag_1 = __webpack_require__(/*! ./ProTag */ "./src/Components/ProTag.tsx");
const userInfo_1 = __webpack_require__(/*! ../lib/userInfo */ "./src/lib/userInfo.ts");
const react_spring_1 = __webpack_require__(/*! react-spring */ "./node_modules/react-spring/dist/cjs/index.js");
function Images(props) {
    // const [images, setImages] = useState<Array<ImageType>>([]);
    const [imageIndex, setImageIndex] = (0, react_1.useState)(0);
    const [showControl, setShowControl] = (0, react_1.useState)(false);
    const [changeImage, setChangeImageStatus] = (0, react_1.useState)(false);
    const [imagesLoading, setImagesLoading] = (0, react_1.useState)(true);
    // const [searchImageIsLoading, setSearchImageIsLoading] = useState(false)
    const userInfo = (0, userInfo_1.useUserInfoContext)();
    // const [currentURL, setCurrentURL] = useState<string>();
    const inputElement = (0, react_1.useRef)(null);
    const imageBoxElement = (0, react_1.useRef)(null);
    const composing = (0, react_1.useRef)(false);
    const handleCompositionStart = () => {
        composing.current = true;
    };
    const handleCompositionEnd = () => {
        composing.current = false;
    };
    (0, react_1.useEffect)(() => {
        // setImages(props.images)
        setImagesLoading(false);
    }, [props.images]);
    (0, react_1.useEffect)(() => {
        var _a;
        // console.log(inputElement);
        // console.log(inputElement.current);
        // console.log(inputElement.current?.input);
        if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified) {
            (_a = inputElement.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }, [changeImage]);
    const handleEditImagesClick = () => {
        setChangeImageStatus(true);
    };
    const handleSearchInput = (event) => {
        event.stopPropagation();
    };
    const handleSearchBtnClick = (event) => {
        var _a, _b;
        setImageIndex(0);
        event.stopPropagation();
        if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified) {
            let inputValue = (_b = (_a = inputElement.current) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.value;
            if (inputValue && inputValue !== '' && !composing.current) {
                setImagesLoading(true);
                // 搜索图片
                props.getUnsplashImages(inputValue);
                setChangeImageStatus(false);
                // amplitude.track('handleSearchImage');
                webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'handleSearchImage' });
            }
        }
        else {
            alert('Please activate Pro');
        }
    };
    const handleGenerationsImages = (event) => {
        var _a, _b;
        setImageIndex(0);
        event.stopPropagation();
        if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified) {
            let inputValue = (_b = (_a = inputElement.current) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.value;
            if (inputValue && inputValue !== '') {
                setImagesLoading(true);
                // 生成图片
                props.generationsImages(inputValue);
                setChangeImageStatus(false);
                webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'handleGenerationsImages' });
            }
        }
        else {
            alert('Please activate Pro');
        }
    };
    const handleChangeImagesClick = (offset) => {
        setImageIndex(index => {
            index = index + offset;
            if (index >= props.images.length) {
                index = 0;
            }
            if (index < 0) {
                index = props.images.length - 1;
            }
            return index;
        });
        // amplitude.track('handleChangeImage');
        webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'handleChangeImage' });
    };
    const handleImagesBoxHover = (e) => {
        var _a, _b;
        if (e.type === 'mouseenter') {
            setShowControl(true);
        }
        if (e.type === 'mouseleave') {
            // 显示图片搜索框时不自动隐藏控件
            if (!changeImage || ((_b = (_a = inputElement.current) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.value) === '') {
                setShowControl(false);
                setChangeImageStatus(false);
            }
            // setShowControl(true)
        }
    };
    const animationStyle = (0, react_spring_1.useSpring)({
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
        config: { duration: 1000 },
        loop: true,
        width: '32px',
        height: '32px',
        border: '1px solid red'
    });
    return (react_1.default.createElement("div", { className: "images", ref: imageBoxElement, style: {
            position: 'relative',
            lineHeight: '0',
            marginTop: '18px'
        } },
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", { onMouseEnter: handleImagesBoxHover, onMouseLeave: handleImagesBoxHover },
                imagesLoading &&
                    react_1.default.createElement("div", { style: {
                            position: 'absolute',
                            color: '#ffffff',
                            backgroundColor: 'rgb(0, 0, 0,0.5)',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: '9'
                        } },
                        react_1.default.createElement(react_spring_1.animated.div, { style: animationStyle },
                            react_1.default.createElement(icons_1.LoadingOutlined, null))),
                props.images.length > 0 ?
                    react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("div", { className: "imageBox" },
                            react_1.default.createElement(antd_1.Image, { "data-downloadlocation": props.images[imageIndex].links.download_location, src: props.images[imageIndex].urls.small, alt: props.images[imageIndex]['description'], height: 240, width: '100%', preview: false, placeholder: true })),
                        react_1.default.createElement("div", { className: "imageQueue", style: {
                                display: 'none'
                            } }, props.images.map(img => react_1.default.createElement("img", { key: img.id, src: img.urls.small }))))
                    :
                        react_1.default.createElement("div", { style: {
                                height: '240px',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                border: '1px solid rgba(5, 5, 5, .06)',
                                borderRadius: '2px'
                            } },
                            react_1.default.createElement(antd_1.Empty, { style: { margin: '0 auto' }, description: 'No related pictures found', image: antd_1.Empty.PRESENTED_IMAGE_SIMPLE })),
                showControl && !imagesLoading &&
                    react_1.default.createElement("div", { style: {
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '100%',
                            height: '100%',
                            left: 0,
                            display: 'flex',
                            borderRadius: '0 2px',
                            // justifyContent: 'space-around',
                            flexDirection: 'column',
                        } },
                        react_1.default.createElement("div", { style: {
                                padding: '8px',
                                // margin: '0px 18px',
                                background: 'linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 27.6%, rgba(0, 0, 0, 0.2) 54.69%, rgba(0, 0, 0, 0.35) 100%)'
                            } }, changeImage ?
                            // 显示图片搜索控件
                            react_1.default.createElement("div", { style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '2px 0'
                                } },
                                react_1.default.createElement("div", { style: { flex: '1', marginRight: '20px' } },
                                    react_1.default.createElement(antd_1.Input, { style: {
                                            backgroundColor: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified) === false ? 'rgba(255, 255, 255, 0.9)' : '',
                                            width: '100%',
                                            paddingRight: '2px'
                                        }, suffix: react_1.default.createElement(ProTag_1.ProTag, null), disabled: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified), placeholder: "Search images", onKeyDown: handleSearchInput, onCompositionStart: handleCompositionStart, onCompositionEnd: handleCompositionEnd, size: "small", ref: inputElement, onPressEnter: handleSearchBtnClick })),
                                react_1.default.createElement("div", { style: {
                                        display: 'flex',
                                        alignItems: 'center'
                                    } },
                                    react_1.default.createElement(antd_1.Tooltip, { placement: "bottom", title: 'Search Images(⏎)', arrow: false, getPopupContainer: () => imageBoxElement.current || document.body },
                                        react_1.default.createElement(antd_1.Button, { disabled: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified), type: "text", size: "small", style: { color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', opacity: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified) ? '0.7' : '1' }, onClick: handleSearchBtnClick, icon: react_1.default.createElement(icons_1.SearchOutlined, null) })),
                                    react_1.default.createElement(antd_1.Tooltip, { placement: "bottom", title: 'Generate Images with AI', arrow: false, getPopupContainer: () => imageBoxElement.current || document.body },
                                        react_1.default.createElement(antd_1.Button, { disabled: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified), type: "text", size: "small", style: { color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', opacity: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified) ? '0.7' : '1' }, onClick: handleGenerationsImages, icon: react_1.default.createElement(icons_1.ThunderboltOutlined, null) })),
                                    react_1.default.createElement(antd_1.Button, { type: "text", size: "small", style: { color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }, onClick: () => setChangeImageStatus(false), icon: react_1.default.createElement(icons_1.CloseOutlined, null) })))
                            :
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement("div", { style: {
                                            display: 'flex',
                                            flexGrow: 'inherit',
                                            alignItems: 'center'
                                        } },
                                        props.images.length > 0 &&
                                            react_1.default.createElement("div", { style: {
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                } },
                                                react_1.default.createElement(antd_1.Button, { style: {
                                                        color: '#fff',
                                                        lineHeight: '100%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }, type: "text", size: "small", icon: react_1.default.createElement(icons_1.LeftOutlined, null), onClick: () => handleChangeImagesClick(-1) }),
                                                react_1.default.createElement("div", { style: {
                                                        width: '40px',
                                                        textAlign: 'center',
                                                        color: '#fff',
                                                        fontWeight: '500',
                                                        padding: '0 4px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    } }, imageIndex + 1 + '/' + props.images.length),
                                                react_1.default.createElement(antd_1.Button, { style: {
                                                        color: '#fff',
                                                        lineHeight: '100%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }, type: "text", size: "small", icon: react_1.default.createElement(icons_1.RightOutlined, null), onClick: () => handleChangeImagesClick(1) })),
                                        react_1.default.createElement("div", { style: {
                                                display: 'flex',
                                                flexDirection: 'row-reverse',
                                                flex: '1',
                                            } },
                                            react_1.default.createElement(antd_1.Button, { type: "text", size: "small", style: { color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }, onClick: () => handleEditImagesClick(), icon: react_1.default.createElement(icons_1.FormOutlined, null) }))))),
                        props.images.length > 0 &&
                            react_1.default.createElement("div", { className: "imageSource", style: {
                                    flex: '1',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    fontSize: '0.90em',
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    padding: '8px',
                                    marginTop: '4px',
                                    lineHeight: 'normal',
                                    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'
                                } }, props.images[imageIndex].type === 'ai' ?
                                react_1.default.createElement(react_1.default.Fragment, null, "Photo by AI")
                                :
                                    react_1.default.createElement(react_1.default.Fragment, null,
                                        "Photo by ",
                                        react_1.default.createElement("a", { style: { textDecoration: 'underline', padding: '0 2px' }, target: '_blank', href: "https://unsplash.com/@" + props.images[imageIndex].user.username + "?utm_source=Scouter&utm_medium=referral" }, props.images[imageIndex].user.name),
                                        " on ",
                                        react_1.default.createElement("a", { style: { textDecoration: 'underline', padding: '0 2px' }, target: '_blank', href: "https://unsplash.com/?utm_source=Scouter&utm_medium=referral" }, "Unsplash"))))))));
}
exports.Images = Images;


/***/ }),

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
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const lang_1 = __webpack_require__(/*! ../lib/lang */ "./src/lib/lang.ts");
const userInfo_1 = __webpack_require__(/*! ../lib/userInfo */ "./src/lib/userInfo.ts");
const DropdownMenu = __importStar(__webpack_require__(/*! @radix-ui/react-dropdown-menu */ "./node_modules/@radix-ui/react-dropdown-menu/dist/index.js"));
const DropdownMenuItem_1 = __webpack_require__(/*! ./DropdownMenuItem */ "./src/Components/DropdownMenuItem.tsx");
const util_1 = __webpack_require__(/*! ../PopupCard/util */ "./src/PopupCard/util.ts");
const react_icons_1 = __webpack_require__(/*! @radix-ui/react-icons */ "./node_modules/@radix-ui/react-icons/dist/react-icons.esm.js");
// import type { MenuProps } from 'antd';
const contentScript_1 = __webpack_require__(/*! ../contentScript */ "./src/contentScript/index.tsx");
const icons_1 = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
const locale_1 = __webpack_require__(/*! ../lib/locale */ "./src/lib/locale.ts");
function Nav(props) {
    var _a, _b;
    const [isPin, setIsPin] = (0, react_1.useState)(false);
    const [currentURL, setCurrentURL] = (0, react_1.useState)();
    const [isOpenPromptMenu, setIsOpenPromptMenu] = (0, react_1.useState)(false);
    const defaultPrompt = (0, react_1.useRef)();
    const [addToAnkiStatus, setAddToAnkiStatus] = (0, react_1.useState)({ 'status': 'normal', 'noteId': 0 });
    // const { Option } = Select;
    const navElement = (0, react_1.useRef)(null);
    const userInfo = (0, userInfo_1.useUserInfoContext)();
    let Lang = (0, locale_1.useCurrentLanguage)();
    const currentLanguage = Lang['current']['name'];
    (0, react_1.useEffect)(() => {
        // 当不自动自行 Prompt，自动打开 Prompt 菜单供用户选择
        if (props.isOpenMenu) {
            onMenuOpenChange(props.isOpenMenu);
        }
    }, [props.isOpenMenu]);
    (0, react_1.useEffect)(() => {
        defaultPrompt.current = (0, util_1.getDefaultPrompt)(props.keyWord, currentLanguage);
        // 设置添加到 Anki 的操作状态
        setAddToAnkiStatus(props.addToAnkiStatus);
    }, [props.addToAnkiStatus]);
    const handleMenuClick = (e) => {
        handleSaveToAnkiBtnClick(e.key);
    };
    let items = [];
    if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.anki.decks) {
        items = userInfo === null || userInfo === void 0 ? void 0 : userInfo.anki.decks.map((deck) => { return { 'key': deck, 'label': deck }; });
    }
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    // // 点击保存到 Anki 按钮
    // const handleSaveToAnkiBtnClick = () => {
    //     props.handleSaveToAnkiBtnClick()
    // };
    // 添加到 Anki
    const addToAnki = (deckName, modelName, front, back) => {
        var _a, _b, _c, _d;
        const keyWord = props.keyWord;
        const Sentence = props.Sentence;
        const windowElement = props.windowElement;
        let container = '';
        let images = '';
        let unsplash_download_location;
        let stc = keyWord.length <= 20 ? Sentence : '';
        // 转移 HTML 标签，按照普通字符串处理
        stc = stc.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        // 在语境句子中将关键字突出显示
        stc = stc.replace(new RegExp(keyWord, 'g'), '<span class="keyWord">' + keyWord + '</span>');
        let ScouterSelection = '';
        if (windowElement) {
            // 选中的文字
            ScouterSelection = (_a = windowElement === null || windowElement === void 0 ? void 0 : windowElement.querySelector('#ScouterSelection')) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('span')[0].innerHTML;
            // console.log(windowElement);
            container = windowElement.innerHTML;
            container = windowElement.getElementsByClassName('messages')[0].innerHTML;
            // 处理 container 的内容
            let parser = new DOMParser();
            let doc = parser.parseFromString(container, 'text/html');
            let elementsToRemove = doc.querySelectorAll('.imageQueue');
            let imageSource = doc.querySelectorAll('.imageSource');
            // 创建新的 img 标签
            // 设置图片的尺寸、样式
            if (doc.getElementsByClassName('imageBox').length > 0) {
                let img = doc.getElementsByClassName('imageBox')[0].getElementsByTagName('img')[0];
                img.width = 0;
                const imgUrl = img.src;
                let newImg = document.createElement("img");
                newImg.src = imgUrl;
                // 获取要替换的 div
                let div = doc.getElementsByClassName('imageBox')[0];
                if (div) {
                    // 使用新的 img 标签替换 div
                    (_b = div.parentNode) === null || _b === void 0 ? void 0 : _b.replaceChild(newImg, div);
                }
            }
            else {
                // 没有图片
                const imgs = doc.getElementsByClassName('images')[0];
                if (imgs) {
                    (_c = imgs.parentNode) === null || _c === void 0 ? void 0 : _c.removeChild(imgs);
                }
            }
            // 删除预加载的图片
            elementsToRemove.forEach(el => { var _a; return (_a = el.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(el); });
            // 删除图片来源信息
            imageSource.forEach(el => { var _a; return (_a = el.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(el); });
            container = doc.body.innerHTML;
            // 处理样式，避免 Anki 内显示异常
            container = container.replace(/style=/g, '');
            if (windowElement.getElementsByClassName('imageBox')[0] !== undefined) {
                images = windowElement.getElementsByClassName('imageBox')[0].innerHTML;
                // 获取 unsplashApi 的 download_location
                unsplash_download_location = (_d = windowElement.getElementsByClassName('images')[0].getElementsByTagName('img')[0].parentElement) === null || _d === void 0 ? void 0 : _d.getAttribute('data-downloadlocation');
            }
            // console.log(images);
            // 处理样式，避免 Anki 内显示异常
            images = images.replace(/style=/gi, '');
            images = images.replace(/width/gi, '');
        }
        const cardStyle = ``;
        const thisLang = lang_1.lang;
        let audioUrl = 'http://dict.youdao.com/dictvoice?type=0&audio=';
        let audio, filename;
        try {
            audioUrl = thisLang[Lang['target']['id']]['audioURL'];
            // filename = Date.now().toString()
            filename = '';
            audio = [{
                    "url": audioUrl + keyWord,
                    "filename": "Scouter" + filename + ".mp3",
                    "fields": [
                        "Front"
                    ]
                }];
        }
        catch (error) {
            audio = [];
        }
        // 常规类型
        let ankiBack = '<p> <blockquote>' + stc + ' —— <a href="' + window.location.href + '">Source</a></blockquote></p>' + container;
        if (keyWord.length > 20) {
            // 如果选中的符号长度大于 20（说明是句子）则不显示上下文句子，然后将来源链接放到尾部
            ankiBack = container + '<p><a href="' + window.location.href + '">Source</a></p>';
        }
        let p = {
            "note": {
                "deckName": deckName,
                "modelName": modelName,
                "fields": {
                    [front]: keyWord,
                    [back]: cardStyle + ankiBack
                },
                "audio": audio,
                "tags": [
                    "Scouter"
                ]
            }
        };
        // 完形填空类型
        if (ScouterSelection.indexOf('class="ankiSpace"') >= 0 || container.indexOf('class="ankiSpace"') >= 0 || container.indexOf('{{c') >= 0) {
            let newFront;
            newFront = '<p>' + ScouterSelection + '</p>' + '<blockquote>' + stc + ' —— <a href="' + window.location.href + '">Source</a></blockquote>' + container;
            if (keyWord.length > 20) {
                // 如果选中的符号长度大于 20（说明是句子）则不显示上下文句子，然后将来源链接放到尾部
                newFront = '<p>' + ScouterSelection + '</p>' + container + '<p> <a href="' + window.location.href + '">Source</a></p>';
            }
            p = {
                "note": {
                    "deckName": deckName,
                    "modelName": modelName,
                    "fields": {
                        [front]: newFront,
                        [back]: ''
                    },
                    "audio": [],
                    "tags": [
                        "Scouter"
                    ]
                }
            };
        }
        // 发送消息给 background
        let sending = webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'addNote', 'messages': { 'anki_arguments': p, 'anki_action_type': 'addNote', 'unsplash_download_location': unsplash_download_location }, });
        sending.then(handleResponse, handleError);
        // 接收 background 的回复
        function handleResponse(message) {
            // console.log(message);
            if (message.error === null) {
                setAddToAnkiStatus({ 'status': 'success', 'noteId': message.data });
            }
            else {
                alert(message.error);
                setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 });
            }
        }
        function handleError(erro) {
            setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 });
            // console.log(erro);
        }
        // 数据埋点
        // amplitude.track('addToAnki');
        webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'addToAnki' });
    };
    // 点击保存到 Anki
    const handleSaveToAnkiBtnClick = (deck) => {
        var _a;
        const windowElement = props.windowElement;
        // 根据是否为完形填空申请不同的卡片模板
        const container = windowElement === null || windowElement === void 0 ? void 0 : windowElement.getElementsByClassName('messages')[0].innerHTML;
        const selectionText = (_a = windowElement === null || windowElement === void 0 ? void 0 : windowElement.querySelector('#ScouterSelection')) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('span')[0].innerHTML;
        let isAnkiSpace = false;
        if (container || selectionText) {
            if (container.indexOf('class="ankiSpace"') >= 0 || container.indexOf('{{c') >= 0 || selectionText.indexOf('class="ankiSpace') >= 0) {
                isAnkiSpace = true;
            }
        }
        setAddToAnkiStatus({ 'status': 'loading', 'noteId': 0 });
        function setAnkiInfo(ankiInfo) {
            const models = ankiInfo.models;
            let modelName = '', field1 = '', field2 = '';
            models.forEach((model) => {
                if (model.isAnkiSpace === isAnkiSpace) {
                    modelName = model.modelName;
                    field1 = model.field1;
                    field2 = model.field2;
                }
            });
            return {
                'modelName': modelName,
                'field1': field1,
                'field2': field2
            };
        }
        if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.anki) {
            const thisDeck = deck ? deck : userInfo === null || userInfo === void 0 ? void 0 : userInfo.anki.defaultDeckName;
            const ankiInfo = setAnkiInfo(userInfo === null || userInfo === void 0 ? void 0 : userInfo.anki);
            // 添加到 Anki 中
            addToAnki(thisDeck, ankiInfo.modelName, ankiInfo.field1, ankiInfo.field2);
        }
        else {
            // 获取 Anki 牌组信息
            webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'setModel', 'messages': {}, }).then((result) => {
                if (result.result === 'success') {
                    const ankiInfo = setAnkiInfo(result.data);
                    const thisDeck = deck ? deck : userInfo === null || userInfo === void 0 ? void 0 : userInfo.anki.defaultDeckName;
                    // 添加到 Anki 中
                    addToAnki(thisDeck, ankiInfo.modelName, ankiInfo.field1, ankiInfo.field2);
                }
                else {
                    // 反馈错误信息
                    alert(result.error.error);
                    setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 });
                }
            });
        }
    };
    // 点击 Pin 按钮
    const handlePinBtnClick = () => {
        if (isPin) {
            (0, contentScript_1.pinPopupCard)(false);
            setIsPin(false);
            // amplitude.track('pinPopupCard');
        }
        else {
            (0, contentScript_1.pinPopupCard)(true);
            setIsPin(true);
            webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'pinPopupCard' });
        }
    };
    // 在 Anki 中打开笔记
    const editNoteInAnki = (noteId) => {
        let sending = webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'guiEditNote', 'messages': { 'anki_action_type': 'guiEditNote', 'anki_arguments': { 'note': noteId }, } });
        sending.then((message) => {
        }, () => {
            //error
        });
    };
    // 打开 Prompt 编辑窗口
    const openCustomPromptForm = (data) => {
        props.openCustomPromptForm(data);
        setIsOpenPromptMenu(false);
    };
    // Prompt 菜单 item 点击
    const handleMenuItemClick = (data) => {
        // 第 3 个参数 false 表示不重新渲染图片
        // // 如果上一个 Prompt 是不显示图片，且当前 Prompt 需要显示图片，则本次任务需要渲染图片，否则不重新渲染图片
        // if (props.lastExecutedPrompt.getUnsplashImages !== true && data.getUnsplashImages) {
        //     props.handleMenuItemClick(data)
        // } else {
        //     props.handleMenuItemClick(data, true, false)
        // }
        props.handleMenuItemClick(data);
    };
    const onMenuOpenChange = (open) => {
        // event.stopPropagation()
        setIsOpenPromptMenu(open);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(antd_1.ConfigProvider, { theme: {
                token: {
                    colorPrimary: '#F08A24',
                },
            } },
            react_1.default.createElement("div", { id: "ScouterNav", ref: navElement, className: 'p-4', style: {
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid rgba(5, 5, 5, .06)',
                    userSelect: 'none',
                    cursor: 'move',
                    position: 'absolute',
                    width: '100%', top: 0,
                    background: 'white',
                    zIndex: 9,
                    padding: '12px 18px'
                }, onMouseDown: props.onMouseDown },
                react_1.default.createElement("div", { style: { zIndex: 9 } },
                    react_1.default.createElement(DropdownMenu.Root, { open: isOpenPromptMenu, modal: false, onOpenChange: onMenuOpenChange },
                        react_1.default.createElement(DropdownMenu.Trigger, { asChild: true, onMouseEnter: () => setIsOpenPromptMenu(true) },
                            react_1.default.createElement("button", { className: "IconButton", "aria-label": "Customise options", style: {
                                    display: 'flex',
                                    alignItems: 'center'
                                } },
                                react_1.default.createElement(react_icons_1.HamburgerMenuIcon, null),
                                react_1.default.createElement("span", { style: {
                                        marginLeft: '4px',
                                        maxWidth: '170px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    } }, props.lastExecutedPrompt.title))),
                        react_1.default.createElement(DropdownMenu.Portal, { container: navElement.current },
                            react_1.default.createElement(DropdownMenu.Content, { className: "DropdownMenuContent", align: 'start', sideOffset: 5, style: {
                                    backgroundColor: '#fff',
                                    cursor: 'default',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '180px',
                                    padding: '10px',
                                    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px',
                                    borderRadius: '8px',
                                    animationDuration: '400ms',
                                    MozAnimationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                                    willChange: 'transform, opacity'
                                }, onMouseLeave: () => setIsOpenPromptMenu(false) },
                                react_1.default.createElement(DropdownMenuItem_1.DropdownMenuItem, { key: (_a = defaultPrompt.current) === null || _a === void 0 ? void 0 : _a.id, data: defaultPrompt.current, onSelect: () => handleMenuItemClick(defaultPrompt.current), handleEditPrompt: () => openCustomPromptForm({ isOpen: true, data: defaultPrompt.current }) }, (_b = defaultPrompt.current) === null || _b === void 0 ? void 0 : _b.title),
                                react_1.default.createElement(DropdownMenuItem_1.DropdownMenuItem, { key: util_1.dictionaryPrompt.id, data: util_1.dictionaryPrompt, onSelect: () => handleMenuItemClick(util_1.dictionaryPrompt), handleEditPrompt: () => openCustomPromptForm({ isOpen: true, data: util_1.dictionaryPrompt }) }, util_1.dictionaryPrompt.title),
                                react_1.default.createElement(antd_1.Divider, { style: { margin: '8px 0' } }),
                                props.prompts.map(item => react_1.default.createElement(DropdownMenuItem_1.DropdownMenuItem, { key: item.id, data: item, onSelect: () => handleMenuItemClick(item), handleEditPrompt: () => openCustomPromptForm({ isOpen: true, data: item }) }, item.title)),
                                react_1.default.createElement(DropdownMenu.Separator, { className: "DropdownMenuSeparator" }),
                                props.prompts.length < 6 ? react_1.default.createElement(antd_1.Button, { style: { marginTop: '4px' }, size: 'small', onClick: () => openCustomPromptForm({ isOpen: true, data: { 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' } }) }, "Create prompt") :
                                    react_1.default.createElement(antd_1.Button, { style: { marginTop: '4px' }, size: 'small', disabled: true }, "At most 7 Prompts"))))),
                react_1.default.createElement("div", { className: "rightBtnBox", style: {
                        flex: 1,
                        textAlign: 'right',
                        display: 'flex',
                        justifyContent: 'end',
                        alignItems: 'center'
                    } },
                    react_1.default.createElement("div", { style: {
                            marginRight: '10px'
                        } }, addToAnkiStatus.status === 'success' ?
                        react_1.default.createElement("span", null,
                            react_1.default.createElement(icons_1.CheckCircleTwoTone, { twoToneColor: "#52c41a" }),
                            " Added to ",
                            react_1.default.createElement("span", { style: {
                                    textDecoration: 'underline',
                                    cursor: 'pointer'
                                }, onClick: editNoteInAnki.bind(event, addToAnkiStatus.noteId) }, "Anki"))
                        :
                            react_1.default.createElement(antd_1.Dropdown.Button, { size: "small", overlayStyle: { width: '50%' }, getPopupContainer: () => navElement.current, style: {
                                    fontSize: '13.2px',
                                    width: 'auto',
                                }, 
                                // icon={<PlusSquareOutlined />}
                                disabled: addToAnkiStatus.status === 'standby' || addToAnkiStatus.status === 'loading' ? true : false, menu: menuProps, onClick: (event) => handleSaveToAnkiBtnClick() }, addToAnkiStatus.status === 'loading' ? 'Adding...' : 'Add to Anki')),
                    react_1.default.createElement(antd_1.Button, { size: 'small', 
                        // type='text'
                        style: {
                            borderColor: isPin ? '#F08A24' : '',
                            fontSize: '13.2px'
                        }, icon: isPin ? react_1.default.createElement(icons_1.PushpinFilled, { className: 'isPin' }) : react_1.default.createElement(icons_1.PushpinOutlined, null), onClick: handlePinBtnClick }))))));
}
exports.Nav = Nav;


/***/ }),

/***/ "./src/PopupCard/Message.tsx":
/*!***********************************!*\
  !*** ./src/PopupCard/Message.tsx ***!
  \***********************************/
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessagesList = void 0;
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const styled_components_1 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const react_icons_1 = __webpack_require__(/*! @radix-ui/react-icons */ "./node_modules/@radix-ui/react-icons/dist/react-icons.esm.js");
const react_markdown_1 = __importDefault(__webpack_require__(/*! react-markdown */ "./node_modules/react-markdown/index.js"));
const remark_breaks_1 = __importDefault(__webpack_require__(/*! remark-breaks */ "./node_modules/remark-breaks/index.js"));
const rehype_raw_1 = __importDefault(__webpack_require__(/*! rehype-raw */ "./node_modules/rehype-raw/index.js"));
const remark_gfm_1 = __importDefault(__webpack_require__(/*! remark-gfm */ "./node_modules/remark-gfm/index.js"));
const settingGuide_png_1 = __importDefault(__webpack_require__(/*! ../assets/settingGuide.png */ "./src/assets/settingGuide.png"));
const Images_1 = __webpack_require__(/*! ../Components/Images */ "./src/Components/Images.tsx");
const util_1 = __webpack_require__(/*! ./util */ "./src/PopupCard/util.ts");
let IconButton = (0, styled_components_1.default)(antd_1.Button) `

    display: flex;
    align-items: center;
    justify-content: center;

`;
const MessageBox = styled_components_1.default.div `
    
    padding:18px 0;

    &:hover{
        // background-color: rgb(0,0,0,0.04);
    }
    

`;
function Message(props) {
    const [images, setImages] = (0, react_1.useState)([]);
    const [messageIndex, setMessageIndex] = (0, react_1.useState)(props.message.content.length - 1);
    const [isMessageHover, setIsMessageHover] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setImages(props.message.images);
        setMessageIndex(props.message.content.length <= 0 ? 0 : props.message.content.length - 1);
        // console.log('messageIndex:');
        // console.log(messageIndex);
        // console.log(props.message.content);
    }, [props.message]);
    const handleMessageIndexChange = (n) => {
        let newIndex = messageIndex;
        newIndex += n;
        if (newIndex < 0) {
            newIndex = props.message.content.length - 1;
        }
        if (newIndex > props.message.content.length - 1) {
            newIndex = 0;
        }
        setMessageIndex(newIndex);
    };
    const handleMessageHover = (e) => {
        if (e.type === 'mouseleave') {
            setIsMessageHover(false);
        }
        else {
            setIsMessageHover(true);
        }
    };
    // const lastStatus = props.message.content[props.message.content.length - 1].status
    let content;
    if (messageIndex > props.message.content.length - 1) {
        content = props.message.content[props.message.content.length - 1];
    }
    else {
        content = props.message.content[messageIndex];
    }
    return (react_1.default.createElement("div", { className: '', style: props.message.role === 'user' ? { backgroundColor: '#F6F6F6', paddingTop: '2px', paddingBottom: '2px' } : {} },
        react_1.default.createElement(antd_1.Skeleton, { style: { margin: '18px 0' }, loading: props.message.content[props.message.content.length - 1]['status'] === 'begin' ? true : false, active: true, title: false },
            props.message.showImagesBox &&
                react_1.default.createElement(Images_1.Images, { images: images, getUnsplashImages: (keyWord) => {
                        (0, util_1.getUnsplashImages)(keyWord).then((imgs) => {
                            // 处理图片的数据格式
                            let newImages = [];
                            imgs.forEach((img) => {
                                const obj = {
                                    type: 'unsplash',
                                    id: img.id,
                                    urls: {
                                        small: img.urls.small
                                    },
                                    links: {
                                        download_location: img.links.download_location
                                    },
                                    description: img.description,
                                    user: {
                                        username: img.user.username,
                                        name: img.user.name
                                    }
                                };
                                newImages.push(obj);
                            });
                            setImages(newImages);
                        });
                    }, generationsImages: (keyWord) => {
                        webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'generationsImages', 'data': { 'prompt': keyWord } }).then((response) => {
                            // 处理图片的数据格式
                            let newImages = [];
                            if (response.succeeded) {
                                response.data.data.forEach((img) => {
                                    const obj = {
                                        type: 'ai',
                                        id: img.url,
                                        urls: {
                                            small: img.url
                                        },
                                        links: {
                                            download_location: ''
                                        },
                                        description: '',
                                        user: {
                                            username: 'AI',
                                            name: 'AI'
                                        }
                                    };
                                    newImages.push(obj);
                                });
                                setImages(newImages);
                            }
                            else {
                                setImages([]);
                                if ('message' in response.data) {
                                    alert(response.data.message);
                                }
                                else {
                                    alert('The current AI endpoint does not support image generation.');
                                }
                            }
                        });
                    } }),
            react_1.default.createElement(MessageBox, { style: {}, onMouseEnter: handleMessageHover, onMouseLeave: handleMessageHover },
                props.message.content.length > 1 && isMessageHover &&
                    react_1.default.createElement("div", { style: {
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            top: '-30px',
                            width: 'fit-content',
                            alignItems: 'center',
                            height: '0',
                            zIndex: '9'
                        } },
                        react_1.default.createElement("div", { style: {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 'fit-content',
                                // position: 'absolute',
                                backgroundColor: '#fff',
                                boxShadow: 'rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px',
                                borderRadius: '4px',
                            } },
                            react_1.default.createElement(IconButton, { type: 'text', size: 'small', icon: react_1.default.createElement(react_icons_1.ChevronLeftIcon, null), onClick: () => {
                                    handleMessageIndexChange(-1);
                                } }),
                            react_1.default.createElement("div", { style: { margin: '0 2px' } }, messageIndex + 1 + '/' + props.message.content.length),
                            react_1.default.createElement(IconButton, { type: 'text', size: 'small', icon: react_1.default.createElement(react_icons_1.ChevronRightIcon, null), onClick: () => {
                                    handleMessageIndexChange(1);
                                } })),
                        react_1.default.createElement("div", { style: {
                                clipPath: "path('M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z')",
                                width: '16px',
                                height: '8px',
                                backgroundColor: '#fff',
                                transform: 'rotate(180deg)',
                                boxShadow: 'rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px',
                                position: 'absolute',
                                top: '26px'
                            } })),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(react_markdown_1.default, { remarkPlugins: [remark_breaks_1.default, remark_gfm_1.default], rehypePlugins: [rehype_raw_1.default], components: {
                            table: (_a) => {
                                var { node } = _a, props = __rest(_a, ["node"]);
                                return react_1.default.createElement("div", { style: { overflowX: 'scroll' } },
                                    react_1.default.createElement("table", Object.assign({ style: {
                                            width: 'max-content',
                                            maxWidth: '620px',
                                            border: "1px solid #ccc",
                                            borderCollapse: 'collapse',
                                            margin: 0,
                                            padding: 0,
                                        } }, props)));
                            },
                            a: (_a) => {
                                var { node } = _a, props = __rest(_a, ["node"]);
                                return react_1.default.createElement("a", Object.assign({ target: '__blank', style: { color: '#F08A24' } }, props));
                            }
                        }, skipHtml: false, children: content['content'] }),
                    content['status'] === 'invalid_api_key' && react_1.default.createElement("div", { className: '' },
                        react_1.default.createElement("img", { src: settingGuide_png_1.default, style: {
                                borderRadius: '4px'
                            } })))))));
}
;
function MessagesList(props) {
    return (react_1.default.createElement("div", { className: 'messages', style: {
            lineHeight: '2',
            wordWrap: 'break-word',
            marginBottom: '48px'
        } }, props.messages.map((item) => {
        return react_1.default.createElement(Message, { key: item.content[0].chatId, message: item });
    })));
}
exports.MessagesList = MessagesList;


/***/ }),

/***/ "./src/PopupCard/PromptList.tsx":
/*!**************************************!*\
  !*** ./src/PopupCard/PromptList.tsx ***!
  \**************************************/
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
exports.PromptList = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const util_1 = __webpack_require__(/*! ./util */ "./src/PopupCard/util.ts");
const styled_components_1 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
const userInfo_1 = __webpack_require__(/*! ../lib/userInfo */ "./src/lib/userInfo.ts");
const ProTag_1 = __webpack_require__(/*! ../Components/ProTag */ "./src/Components/ProTag.tsx");
const locale_1 = __webpack_require__(/*! ../lib/locale */ "./src/lib/locale.ts");
let MyButton = styled_components_1.default.button `

    padding: 6px;
    margin-bottom: 4px;
    border-radius: 2px;
    cursor: unset;

    &:hover {
        background-color:#F6F6F6;
    }
`;
function PromptButton(props) {
    return (react_1.default.createElement(MyButton, { style: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',
            padding: '4px',
            pointerEvents: props.disable ? 'none' : 'auto'
        }, onClick: props.handleMenuItemClick }, props.children));
}
function PromptList(props) {
    const PromptListDOM = (0, react_1.useRef)(null);
    const userInfo = (0, userInfo_1.useUserInfoContext)();
    let Lang = (0, locale_1.useCurrentLanguage)();
    const currentLanguage = Lang['current']['name'];
    // const userInfo = useUserInfoContext()
    // console.log('userInfo:');
    // console.log(userInfo);
    (0, react_1.useEffect)(() => {
    }, [props.showFollowUpDataMenu.show]);
    // Prompt 菜单 item 点击
    const handleMenuItemClick = (data) => {
        if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified) {
            // 第 3 个参数 false 表示不重新渲染图片
            props.handleMenuItemClick(data, 'yes', true, props.followUpData);
        }
    };
    return (react_1.default.createElement("div", { ref: PromptListDOM, className: 'followUpMenu', style: Object.assign(Object.assign({}, props.showFollowUpDataMenu.style), { position: 'absolute', display: "flex", flexDirection: "column", width: '120px', padding: '0' }) },
        react_1.default.createElement("div", { style: {
                display: 'flex',
                justifyContent: 'end',
                padding: '8px',
                borderBottom: '1px solid rgba(5, 5, 5, .06)',
                color: '#666'
            } },
            react_1.default.createElement("span", { style: { flex: '1' } }, "Prompt"),
            react_1.default.createElement(ProTag_1.ProTag, null)),
        react_1.default.createElement("div", { style: {
                display: "flex",
                flexDirection: "column",
                padding: '8px 8px 4px',
                cursor: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified) ? 'not-allowed' : '',
                opacity: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified) ? '0.7' : '1',
            } },
            react_1.default.createElement(PromptButton, { disable: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified), handleMenuItemClick: () => __awaiter(this, void 0, void 0, function* () {
                    const p = (0, util_1.getDefaultPrompt)(props.followUpData.keyWord, currentLanguage);
                    handleMenuItemClick(p);
                }) }, "Default"),
            react_1.default.createElement(PromptButton, { disable: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified), handleMenuItemClick: () => {
                    handleMenuItemClick(util_1.dictionaryPrompt);
                } }, util_1.dictionaryPrompt.title),
            props.promptList.map((item) => {
                // return <button onClick={() => handleMenuItemClick(item)}>{item.title}</button>
                return react_1.default.createElement(PromptButton, { key: item.id, disable: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified), handleMenuItemClick: () => handleMenuItemClick(item) }, item.title);
            }))));
}
exports.PromptList = PromptList;


/***/ }),

/***/ "./src/PopupCard/RegenerateButton.tsx":
/*!********************************************!*\
  !*** ./src/PopupCard/RegenerateButton.tsx ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegenerateButton = void 0;
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
function RegenerateButton(props) {
    const lastMessage = props.messages[props.messages.length - 1];
    const lastMessageStatus = lastMessage ? lastMessage.content[lastMessage.content.length - 1].status : 'begin';
    return (react_1.default.createElement("div", null, props.messages.length >= 1 && (lastMessageStatus === 'invalid_api_key' || lastMessageStatus === 'done') &&
        react_1.default.createElement("div", null,
            react_1.default.createElement(antd_1.Button, { style: {
                    position: 'absolute',
                    fontSize: '13.2px',
                    bottom: '60px',
                    right: '18px',
                    boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
                }, size: 'small', onClick: () => {
                    props.handleRegenerateButtonClick();
                } }, "Regenerate"))));
}
exports.RegenerateButton = RegenerateButton;


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
const util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const locale_1 = __webpack_require__(/*! ../lib/locale */ "./src/lib/locale.ts");
const lang_1 = __webpack_require__(/*! ../lib/lang */ "./src/lib/lang.ts");
const icons_1 = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
// const useStyles = createUseStyles({
//   moreButton: {
//     color: '#F08A24',
//     "&:hover": {
//       color: 'red'
//     }
//   },
// })
const style = `
  #ScouterSelection>span {
    font-site:12px;
    color:#666;
  }
  .moreButton {
    color: #F08A24;
    cursor:pointer;
    margin:0px 2px;
  }
  .moreButton:hover {
    opacity:0.8;
  }

`;
function Selection(props) {
    const [targetLanguage, setTargetLanguage] = (0, react_1.useState)('United States');
    const [showFullText, setShowFullText] = (0, react_1.useState)(true);
    const [playStatus, setPlayStatus] = (0, react_1.useState)(false);
    const lastSpeakTime = (0, react_1.useRef)(Math.floor(Date.now()));
    // 获取用户设置的语言信息
    let Lang = (0, locale_1.useCurrentLanguage)();
    (0, react_1.useEffect)(() => {
        setTargetLanguage(Lang['target']['id']);
        setShowFullText(props.text.length <= 140);
        setPlayStatus(false);
        webextension_polyfill_1.default.storage.onChanged.addListener(onStorageChange);
        return () => {
            webextension_polyfill_1.default.storage.onChanged.removeListener(onStorageChange);
        };
    }, [props.text]);
    // 语音播报
    const speaker = () => {
        // 识别语言
        // const lngDetector = new LanguageDetect();
        // lngDetector.setLanguageType('iso2')
        // console.log(lngDetector.detect(props.text, 2));
        if (Math.floor(Date.now()) - lastSpeakTime.current < 1000) {
            // x 毫秒内只可点击一次
            return;
        }
        try {
            (0, util_1.playTextToSpeech)(props.text, lang_1.languageCodes[targetLanguage], targetLanguage);
            // textToSpeechDownload(props.text, languageCodes[targetLanguage as keyof typeof languageCodes])
            lastSpeakTime.current = Math.floor(Date.now());
        }
        catch (error) {
            // 暂停上一次播报任务
            speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(props.text);
            // 语种
            utterance.lang = lang_1.languageCodes[targetLanguage];
            // console.log(languageCodes[targetLanguage as keyof typeof languageCodes]);
            // console.log(targetLanguage);
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
        }
        // amplitude.track('speak');
        webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'speak' });
    };
    const onStorageChange = (changes, area) => {
        // console.log(changes);
        // 更新目标语言
        if ('targetLanguage' in changes) {
            // console.log('changes');
            // console.log(changes['targetLanguage']['newValue']);
            setTargetLanguage(changes['targetLanguage']['newValue']);
        }
    };
    const handleToggleShowFunText = () => {
        setShowFullText(!showFullText);
    };
    // const classes = useStyles()
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("style", null, style),
        react_1.default.createElement("div", { id: "ScouterSelection", className: '', style: {
                marginTop: '18px',
                lineHeight: '1.5'
            } },
            showFullText ? react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("span", null, props.text),
                props.text.length > 140 && react_1.default.createElement("a", { className: 'moreButton', onClick: handleToggleShowFunText }, "Less"))
                : react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("span", null, props.text.substring(0, 140) + '...'),
                    react_1.default.createElement("a", { className: 'moreButton', onClick: handleToggleShowFunText }, "More")),
            react_1.default.createElement(antd_1.Button, { style: {
                    display: 'inline-block',
                    position: 'relative',
                    bottom: '2px'
                }, size: "small", type: "text", icon: react_1.default.createElement(icons_1.CustomerServiceOutlined, null), onClick: speaker }))));
}
exports.Selection = Selection;
;


/***/ }),

/***/ "./src/PopupCard/UserMessageInput.tsx":
/*!********************************************!*\
  !*** ./src/PopupCard/UserMessageInput.tsx ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserMessageInput = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const icons_1 = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
const react_spring_1 = __webpack_require__(/*! react-spring */ "./node_modules/react-spring/dist/cjs/index.js");
const { TextArea } = antd_1.Input;
function UserMessageInput(props) {
    const lastMessage = props.messages[props.messages.length - 1];
    // const lastMessageStatus = lastMessage.content[lastMessage.content.length - 1].status
    const [form] = antd_1.Form.useForm();
    const [isAnswerInputed, setIsAnswerInputed] = (0, react_1.useState)(false);
    // 文本框下敲击按键时
    const handleKeyDown = (event) => {
        // 阻止事件冒泡
        // console.log('handleKeyDown');
        event.stopPropagation();
        if (event.keyCode === 13 && !event.shiftKey) {
            const contents = props.messages[props.messages.length - 1]['content'];
            // console.log(props.messages);
            // 敲击回车键
            if (props.messages.length === 0 ||
                (contents[contents.length - 1]['status'] !== 'begin' &&
                    contents[contents.length - 1]['status'] !== 'process') && isAnswerInputed) {
                // 非加载状态、GPT 消息发送完毕时用户可发送消息
                handleSendMessage({ 'msg': event.target.value });
            }
            else {
                event.preventDefault();
            }
        }
    };
    // 文本框值变化时
    const onTextAreaInput = (event) => {
        if (event.target.value.length > 0) {
            setIsAnswerInputed(true);
        }
        else {
            setIsAnswerInputed(false);
        }
    };
    const handleSendMessage = (values) => {
        // 清空文本框
        form.resetFields();
        // 禁用发送按钮
        setIsAnswerInputed(false);
        // 执行发消息事件
        props.handleSendMessage(values.msg);
    };
    // const AnimatedButton = animated(Button);
    const animationStyle = (0, react_spring_1.useSpring)({
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
        config: { duration: 1000 },
        loop: true,
        width: '32px',
        height: '32px',
        border: '1px solid red'
    });
    const lastStatus = lastMessage ? lastMessage.content[lastMessage.content.length - 1].status : 'begin';
    return (react_1.default.createElement("div", { className: 'w-full', style: { borderTop: '1px solid rgba(5, 5, 5, .06)' } },
        react_1.default.createElement(antd_1.Form, { form: form, onFinish: handleSendMessage, 
            // onKeyDown={handleFormKeyDown}
            layout: 'inline', style: { alignItems: 'center' }, className: 'p-2' },
            react_1.default.createElement(antd_1.Form.Item, { name: "msg", style: { margin: '0', flexGrow: '1' } },
                react_1.default.createElement(TextArea, { placeholder: "Send a message", bordered: false, autoSize: { minRows: 1, maxRows: 2 }, 
                    // onChange={handleInputChange}
                    style: {
                        caretColor: '#F08A24',
                    }, onKeyDown: handleKeyDown, onInput: onTextAreaInput })),
            react_1.default.createElement(antd_1.Form.Item, { style: { marginRight: '0' } }, props.messages.length === 0 || lastStatus !== 'begin' && lastStatus !== 'process' ?
                react_1.default.createElement(antd_1.Button, { type: "text", htmlType: "submit", disabled: props.messages.length > 0 ? lastStatus === 'begin' || lastStatus === 'process' || !isAnswerInputed : false, style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // color: !isLoading && isAnswerInputed ? '#F08A24' : ''
                    }, icon: react_1.default.createElement(icons_1.SendOutlined, null) }) : react_1.default.createElement("div", { style: { marginRight: '8px' } },
                react_1.default.createElement(react_spring_1.animated.div, { style: animationStyle },
                    react_1.default.createElement(icons_1.LoadingOutlined, null)))),
            react_1.default.createElement(antd_1.Form.Item, { style: { margin: '0' } }))));
}
exports.UserMessageInput = UserMessageInput;


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
const uuid_1 = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/commonjs-browser/index.js");
const contentScript_1 = __webpack_require__(/*! ../contentScript */ "./src/contentScript/index.tsx");
const Nav_1 = __webpack_require__(/*! ../Components/Nav */ "./src/Components/Nav.tsx");
const CustomPromptForm_1 = __webpack_require__(/*! ../Components/CustomPromptForm */ "./src/Components/CustomPromptForm.tsx");
const Message_1 = __webpack_require__(/*! ./Message */ "./src/PopupCard/Message.tsx");
const PromptList_1 = __webpack_require__(/*! ./PromptList */ "./src/PopupCard/PromptList.tsx");
const RegenerateButton_1 = __webpack_require__(/*! ./RegenerateButton */ "./src/PopupCard/RegenerateButton.tsx");
const UserMessageInput_1 = __webpack_require__(/*! ./UserMessageInput */ "./src/PopupCard/UserMessageInput.tsx");
const Selection_1 = __webpack_require__(/*! ./Selection */ "./src/PopupCard/Selection.tsx");
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const locale_1 = __webpack_require__(/*! ../lib/locale */ "./src/lib/locale.ts");
const userInfo_1 = __webpack_require__(/*! ../lib/userInfo */ "./src/lib/userInfo.ts");
const util_1 = __webpack_require__(/*! ./util */ "./src/PopupCard/util.ts");
const styled_components_1 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
let currentLanguage;
let targetLanguage;
// 获取 Anki 卡片，用于编写故事
let ankiCards;
(0, util_1.getAnkiCards)().then((cards) => {
    ankiCards = cards;
}).catch((error) => {
    // console.log(error);
});
// 初始化 Anki 的 Model，为后续导入到 Anki 提速
const { TextArea } = antd_1.Input;
// const AnkiContext = createContext(null);
const ScouterDiv = styled_components_1.default.div `

left:10;
top:10;

font-family: sans-serif;
width: 390px;
height: 560px;
color: rgb(0 0 0 / 80%);
position: fixed;
display: flex;
flex-direction: column;
font-size: 14px;
background-color: #fff;
z-index: 999;
overflow: hidden;
box-shadow: 0px 8px 28px rgba(0,0,0,.16);
border-radius: 6px;
border:1px solid rgba(5, 5, 5, .06)

h1,h2,h2{
  font-weight: bold;
}

h1 {
  font-size:20px;
}

h2 {
  font-size:17px;
}

`;
function PopupCard(props) {
    const [messages, setMessages] = (0, react_1.useState)([{
            'content': [{
                    'status': 'begin',
                    'chatId': '',
                    'content': ''
                }],
            'role': 'user',
            'prompt': '',
            'showImagesBox': true,
            'images': []
        }]);
    const [prompts, setPrompts] = (0, react_1.useState)([]);
    const [lastExecutedPrompt, setLastExecutedPrompt] = (0, react_1.useState)({ 'title': '👉🏼 Please choose a prompt', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' });
    const [isOpenMenu, setIsOpenMenu] = (0, react_1.useState)(false);
    const [isPopoverOpen, setPopoverOpen] = (0, react_1.useState)(false);
    const [customPromptFormData, setCustomPromptFormData] = (0, react_1.useState)({ 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' });
    // standby,normal,loading,success
    const [addToAnkiStatus, setAddToAnkiStatus] = (0, react_1.useState)({ 'status': 'normal', 'noteId': 0 });
    const [followUpData, setFollowUpData] = (0, react_1.useState)({ keyWord: '', sentence: '' });
    const [showFollowUpDataMenu, setShowFollowUpDataMenu] = (0, react_1.useState)({ show: false, style: {} });
    // 窗口拖拽逻辑
    const [dragging, setDragging] = (0, react_1.useState)(false);
    const windowElement = (0, react_1.useRef)(null);
    const messagesList = (0, react_1.useRef)(null);
    const shouldStayAtBottomRef = (0, react_1.useRef)(false);
    // const userInfoRef = useRef();
    const lastPromptRef = (0, react_1.useRef)();
    const [form] = antd_1.Form.useForm();
    const userInfo = (0, userInfo_1.useUserInfoContext)();
    let Lang = (0, locale_1.useCurrentLanguage)();
    currentLanguage = Lang['current']['name'];
    targetLanguage = Lang['target']['name'];
    // 控制追问菜单
    (0, react_1.useEffect)(() => {
        // console.log('控制追问菜单');
        var _a;
        const port = webextension_polyfill_1.default.runtime.connect({
            name: 'fromPopupCard'
        });
        port.onMessage.addListener((msg) => {
            if (msg.type === "UPDATE_POPUP_CARD") {
                // 显示 Prompt 菜单
                setFollowUpData(msg.payload.followUpData);
                //设置菜单的位置
                setShowFollowUpDataMenu(prev => {
                    const newData = {
                        show: true,
                        style: msg.payload.style
                    };
                    return newData;
                });
            }
        });
        (_a = windowElement.current) === null || _a === void 0 ? void 0 : _a.addEventListener("click", handlePopupCardClick);
        return () => {
            var _a;
            // console.log('useEffect return');
            (_a = windowElement.current) === null || _a === void 0 ? void 0 : _a.removeEventListener("click", handlePopupCardClick);
        };
        function handlePopupCardClick() {
            // 当追问菜单显示时，点击窗口关闭菜单
            setTimeout(() => {
                if (showFollowUpDataMenu.show) {
                    setShowFollowUpDataMenu(prev => {
                        const newData = {
                            style: {},
                            show: false,
                        };
                        return newData;
                    });
                }
            }, 10);
        }
    }, [showFollowUpDataMenu]);
    (0, react_1.useEffect)(() => {
        // 渲染 Prompt 列表
        initializePromptList();
        // 重复添加到 Anki 按钮的状态
        // setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 })
        if (props.runPrompt || props.runPrompt === undefined) {
            // 获取最近一次执行的 Prompt
            webextension_polyfill_1.default.storage.local.get({ "lastExecutedPrompt": '' }).then((item) => __awaiter(this, void 0, void 0, function* () {
                if (item.lastExecutedPrompt === '') {
                    // 执行默认 Prompt、获取 Unsplash 图片
                    const pormpt = yield (0, util_1.getInitialPrompt)(props.data.keyWord, currentLanguage);
                    executivePrompt(pormpt);
                }
                else {
                    // 执行 Prompt、获取 Unsplash 图片
                    if (item.lastExecutedPrompt.id === "Default") {
                        const pormpt = yield (0, util_1.getInitialPrompt)(props.data.keyWord, currentLanguage);
                        executivePrompt(pormpt);
                    }
                    else {
                        executivePrompt(item.lastExecutedPrompt);
                    }
                }
            }));
        }
        else {
            // 不执行任何 Prompt，由用户自行选择
            executivePrompt({ 'title': 'Default', 'getUnsplashImages': true, 'userPrompt': `Word:"{{keyWord}}", sentence: "{{sentence}}"`, 'id': 'Default' }, 'no');
            // setIsOpenMenu(true)
        }
        // 设置窗口的默认位置、添加滚动事件，让消息列表自动滚动到底部
        (0, util_1.windowInitialization)({ 'isPin': props.isPin, 'windowElement': windowElement, 'selection': props.selection, 'messagesList': messagesList });
    }, [props.data.keyWord]);
    // 聊天记录改变时
    (0, react_1.useEffect)(() => {
        // 记录当前列表的位置
        if (windowElement.current) {
            const container = windowElement.current.querySelectorAll('.container')[0];
            shouldStayAtBottomRef.current = container.scrollHeight - container.scrollTop <= container.clientHeight + 20;
            const contentLength = messages.length > 0 ? messages[messages.length - 1].content.length : 0;
            // 自动滚动到消息底部，方便看到最新的文字
            if (messages.length > 1) {
                if (messages[messages.length - 1].content[contentLength - 1].status === 'process' || messages[messages.length - 1].content[contentLength - 1].status === 'begin') {
                    scrollToBottom(true);
                }
                else {
                    scrollToBottom(shouldStayAtBottomRef.current);
                }
            }
            // return () => {
            //   if (container !== null) {
            //     container.removeEventListener('scroll', checkIfShouldStayAtBottom);
            //   }
            // }
        }
        // 保存历史记录，只保留消息记录的第 1 条，如果这条消失是错误提示，则不保存
        if (messages.length === 1 && messages[0]['content'][messages[0]['content'].length - 1]['status'] === 'done') {
            (() => __awaiter(this, void 0, void 0, function* () {
                const storage = yield webextension_polyfill_1.default.storage.local.get({ "history": [], "lastExecutedPrompt": '' });
                const keyWord = props.data.keyWord;
                const Sentence = props.data.Sentence;
                // 将查询记录保存起来
                const newHistory = {
                    'keyWord': keyWord,
                    'sentence': Sentence,
                    'role': messages[0]['role'],
                    'answer': messages[0]['content'][messages[0]['content'].length - 1]['content'],
                    'source': window.location.href,
                    'prompt': messages[0]['prompt'],
                    'images': messages[0]['images']
                };
                if (keyWord !== '' && Sentence !== '' && messages[0]['content'][messages[0]['content'].length - 1]['content'] !== '' && storage.lastExecutedPrompt.id !== 'dict') {
                    // console.log(item.history);
                    let newHistoryList = [];
                    let bingo = false;
                    newHistoryList.push(newHistory);
                    // 如果最近执行的是在线词典，则不保存历史记录
                    if (Array.isArray(storage.history)) {
                        // 如果记录已存在，则不重复保存
                        for (let i = 0; i < storage.history.length; i++) {
                            let obj = storage.history[i];
                            if (obj.keyWord === newHistory['keyWord'] && obj.sentence === newHistory['sentence'] && obj.prompt === newHistory['prompt']) {
                                bingo = true;
                                break;
                            }
                        }
                        newHistoryList = storage.history;
                        newHistoryList.unshift(newHistory);
                        newHistoryList.splice(8);
                        // console.log(newHistoryList);
                    }
                    if (!bingo) {
                        webextension_polyfill_1.default.storage.local.set({
                            history: newHistoryList
                        });
                    }
                }
            }))();
        }
    }, [messages]);
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
    // 执行 Prompt
    const executivePrompt = (prompt, runPrompt, imageToRerender, data) => __awaiter(this, void 0, void 0, function* () {
        // 设置加载状态
        // setIsLoading(true)
        var _a;
        let needToRunPrompt = runPrompt;
        if (needToRunPrompt === undefined) {
            needToRunPrompt = 'yes';
        }
        let needToRerenderImage = imageToRerender;
        if (needToRerenderImage === undefined) {
            needToRerenderImage = true;
        }
        let keyWord = props.data.keyWord;
        let Sentence = props.data.Sentence;
        if (data !== undefined) {
            keyWord = data.keyWord;
            Sentence = data.sentence;
        }
        else {
            // 初始化
            setMessages([]); // 对话列表
        }
        // 如果需要立即执行 Prompt
        if (needToRunPrompt !== 'no') {
            //初始化图片容器
            let showImagesBox = true;
            if (prompt.id === 'dict' || prompt.id === 'Default') {
                // 特殊的方法
                if (keyWord.length < 20) {
                    showImagesBox = true;
                }
                else {
                    showImagesBox = false;
                }
            }
            else {
                // 自定义 Prompt
                if (prompt.getUnsplashImages && needToRunPrompt) {
                    // 如果当前 Prompt 需要显示图片，且当前需要立即执行 Prompt
                    showImagesBox = true;
                }
                else {
                    showImagesBox = false;
                }
            }
            // 埋点
            webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'executivePrompt' });
            // 在消息历史中插入新记录
            setMessages(prevMessages => [...prevMessages,
                {
                    'content': [{
                            'chatId': (0, uuid_1.v4)(),
                            'content': '',
                            'status': 'begin'
                        }],
                    'role': 'assistant',
                    'prompt': '',
                    'showImagesBox': showImagesBox,
                    'images': []
                }]);
            // 非追问时，才会记录最近执行的 Prompt
            if (data === undefined) {
                // 设置最近执行的 Prompt
                setLastExecutedPrompt(prompt);
                // 记录最近 1 次使用的 Prompt，用于下次启动窗口时默认执行此 Prompt
                webextension_polyfill_1.default.storage.local.set({
                    lastExecutedPrompt: prompt
                });
            }
            let newPrompt;
            let p = prompt.userPrompt;
            // 处理 Prompt 中的变量
            p = yield (0, util_1.handlePromptVariables)(p, keyWord, Sentence, Lang);
            newPrompt = [{ 'role': 'user', 'content': p }];
            // 如果历史记录中存在记录，则不重复请求 API，直接显示历史记录的信息
            const result = yield webextension_polyfill_1.default.storage.local.get({ "history": [] }).then((item) => {
                // console.log(item);
                // 如果记录已存在，则不重复保存
                let bingo = false;
                let updatedLastMessage;
                for (let i = 0; i < item.history.length; i++) {
                    let obj = item.history[i];
                    if (obj.keyWord === keyWord && obj.sentence === Sentence && obj.prompt === newPrompt[0]['content']) {
                        if ('role' in obj) {
                        }
                        else {
                            // 旧版本中因为没有存储 role ，直接显示历史数据时会导致后续流程异常
                            bingo = false;
                            break;
                        }
                        bingo = true;
                        // console.log('历史记录：');
                        // console.log(obj);
                        // 直接显示历史记录中的回答
                        updatedLastMessage = Object.assign(Object.assign({}, messages[messages.length - 1]), { role: obj.role, content: [{
                                    'chatId': (0, uuid_1.v4)(),
                                    'content': obj.answer,
                                    'status': 'done'
                                }], prompt: newPrompt[0]['content'], showImagesBox: showImagesBox, images: obj.images });
                        break;
                    }
                }
                return { bingo: bingo, updatedLastMessage: updatedLastMessage };
            });
            if (result.bingo) {
                //显示历史记录
                setMessages([result.updatedLastMessage]);
                setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 });
                lastPromptRef.current = newPrompt;
                // 如果需要显示图片，且历史记录中没有图片，则获取图片
                if (showImagesBox && ((_a = result.updatedLastMessage) === null || _a === void 0 ? void 0 : _a.images.length) === 0) {
                    // 获取图片数据
                    (0, util_1.getUnsplashImages)(keyWord).then((imgs) => {
                        // 保存图片数据
                        setMessages(prevMessages => {
                            const lastMessage = prevMessages[prevMessages.length - 1];
                            if (prevMessages.length === 0) {
                                return [];
                            }
                            const updatedLastMessage = Object.assign(Object.assign({}, lastMessage), { needToShowImg: true, images: imgs });
                            return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];
                        });
                    });
                }
            }
            else {
                // 获取语言知识
                getKnowledge(newPrompt, keyWord, prompt.id);
                // 请求图片
                if (prompt.id == 'Default' || prompt.id == 'dict') {
                    if (keyWord.length <= 20 && prompt.getUnsplashImages && needToRerenderImage) {
                        // 获取图片数据
                        (0, util_1.getUnsplashImages)(keyWord).then((imgs) => {
                            // setImages(imgs)
                            // 保存图片数据
                            setMessages(prevMessages => {
                                const lastMessage = prevMessages[prevMessages.length - 1];
                                if (prevMessages.length === 0) {
                                    return [];
                                }
                                const updatedLastMessage = Object.assign(Object.assign({}, lastMessage), { needToShowImg: true, images: imgs });
                                return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];
                            });
                        });
                    }
                }
                else {
                    if (prompt.getUnsplashImages && needToRerenderImage) {
                        // 获取图片数据
                        (0, util_1.getUnsplashImages)(keyWord).then((imgs) => {
                            // setImages(imgs)
                            // 保存图片数据
                            setMessages(prevMessages => {
                                const lastMessage = prevMessages[prevMessages.length - 1];
                                if (prevMessages.length === 0) {
                                    return [];
                                }
                                const updatedLastMessage = Object.assign(Object.assign({}, lastMessage), { needToShowImg: true, images: imgs });
                                return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];
                            });
                        });
                    }
                }
            }
        }
        else {
            // 打开 Popup 窗口，不需要立即执行 Prompt
            setLastExecutedPrompt({ 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' });
            // 数据埋点
            webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'openPopupCard' });
        }
    });
    // 点击「重新生成」按钮
    const handleRegenerateButtonClick = () => {
        // 在消息历史中插入新记录
        setMessages(prevMessages => {
            let newMessages = [...prevMessages];
            newMessages[newMessages.length - 1].content.push({
                chatId: (0, uuid_1.v4)(),
                content: '',
                status: 'begin',
            });
            // begin 状态才会显示加载动画
            const content = newMessages[newMessages.length - 1].content;
            newMessages[newMessages.length - 1].content[content.length - 1].status = 'begin';
            return newMessages;
        });
        // 获取最近执行的 Prompt，再次执行
        getKnowledge(lastPromptRef.current, props.data.keyWord, lastExecutedPrompt.id);
    };
    const initializePromptList = () => __awaiter(this, void 0, void 0, function* () {
        // 获取已保存的 Prompt List
        const promptList = yield webextension_polyfill_1.default.storage.sync.get({ "promptList": [] }).then((item) => {
            return item.promptList;
        });
        setPrompts(promptList);
    });
    // 编辑自定义 Prompt 成功后
    const handlePromptEdited = (isNew) => __awaiter(this, void 0, void 0, function* () {
        // 初始化 Prompt 列表
        initializePromptList();
        // 更新最近使用的 Prompt（针对编辑的场景）
        if (!isNew) {
            webextension_polyfill_1.default.storage.sync.get({ "promptList": [] }).then((item) => {
                for (let i = 0; i < item.promptList.length; i++) {
                    if (item.promptList[i].id === lastExecutedPrompt.id) {
                        // 更新
                        setLastExecutedPrompt(item.promptList[i]);
                        // 记录最近 1 次使用的 Prompt
                        webextension_polyfill_1.default.storage.local.set({
                            lastExecutedPrompt: item.promptList[i]
                        });
                        break;
                    }
                }
            });
        }
        webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'handlePromptEdited' });
    });
    // 请求 GPT 数据
    const getKnowledge = (prompt, keyWord, promptId) => __awaiter(this, void 0, void 0, function* () {
        // 使用长连接
        const port = webextension_polyfill_1.default.runtime.connect({
            name: 'getGPT'
        });
        // 记录最近执行的 Prompt，用于重新生成
        lastPromptRef.current = prompt;
        const thisKeyWord = keyWord || '';
        const thisPromptId = promptId || '';
        // 禁用保存到 Anki 按钮
        setAddToAnkiStatus({ 'status': 'standby', 'noteId': 0 });
        if (thisPromptId === 'dict') {
            setTimeout(() => {
                // 使用 postMs 发送信息
                port.postMessage({ 'type': 'getDictionaryData', 'messages': prompt, 'keyWord': thisKeyWord });
            }, 20);
        }
        else {
            setTimeout(() => {
                // 使用 postMs 发送信息
                port.postMessage({ 'type': 'getKnowledge', 'messages': prompt, 'keyWord': thisKeyWord });
            }, 20);
        }
        // browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        //   // console.log(msg);
        // })
        // 接收信息
        port.onMessage.addListener((msg) => {
            // console.log('port.onMessage.addListener');
            if (msg.type === 'sendGPTData') {
                // 请求 GPT 数据成功且数据流传输中
                // if (msg.status === 'process' || msg.status === 'end') {
                try {
                    // 渲染数据
                    setMessages(prevMessages => {
                        const newMessages = [...prevMessages];
                        const lastMessage = newMessages[newMessages.length - 1];
                        // 深度拷贝
                        let contentList = JSON.parse(JSON.stringify(lastMessage.content));
                        let newContent = msg.ApiType === 'chatGPTWeb' ? msg.content : contentList[contentList.length - 1]['content'] + msg.content;
                        newContent = (0, util_1.handleHightlight)(newContent, props.data.keyWord, ankiCards, windowElement === null || windowElement === void 0 ? void 0 : windowElement.current);
                        contentList[contentList.length - 1]['content'] = newContent;
                        contentList[contentList.length - 1]['status'] = msg.status;
                        const newContentList = [...contentList];
                        const updatedLastMessage = Object.assign(Object.assign({}, lastMessage), { content: newContentList, prompt: prompt[0]['content'] });
                        return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];
                    });
                }
                catch (error) {
                }
                // }
                // 请求 GPT 数据成功且数据流结束传输
                if (msg.status === 'done' || msg.status === 'erro') {
                    setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 });
                }
            }
        });
    });
    // 用户发送消息
    const handleSendMessage = (values) => {
        // console.log(values);
        let prompt = values;
        // // 清空文本框
        // form.resetFields();
        // 定位到底部
        scrollToBottom(true);
        // 将用户发言发送到消息记录中
        setMessages(prevMessages => {
            const updatedLastMessage = {
                role: 'user',
                content: [
                    {
                        chatId: (0, uuid_1.v4)(),
                        content: values,
                        status: 'done',
                    }
                ],
                prompt: prompt,
                showImagesBox: false,
                images: []
            };
            return [...prevMessages, updatedLastMessage];
        });
        // 在消息历史中插入新 GPT 消息
        setMessages(prevMessages => [...prevMessages, {
                content: [{
                        chatId: (0, uuid_1.v4)(),
                        content: '',
                        status: 'begin',
                    }],
                role: 'assistant',
                prompt: '',
                showImagesBox: false,
                images: []
            }]);
        const msgHistory = messages.slice(-5).map((item) => { return { 'role': item.role, 'content': item.content[item.content.length - 1]['content'] }; });
        getKnowledge([...msgHistory, { "role": "user", "content": values }]);
        // amplitude.track('handleSendMessage');
        webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'handleSendMessage' });
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
            const minX = -elementWidth / 2;
            const minY = 0;
            const maxX = windowWidth - elementWidth + elementWidth / 2;
            const maxY = windowHeight - elementHeight + elementHeight / 1.5;
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
    // // 添加到 Anki
    // const addToAnki = (deckName: string, modelName: string, front: string, back: string) => {
    //   const keyWord = props.data.keyWord
    //   const Sentence = props.data.Sentence
    //   let container = ''
    //   let images = ''
    //   let unsplash_download_location
    //   let stc = keyWord.length <= 20 ? Sentence : ''
    //   // 转移 HTML 标签，按照普通字符串处理
    //   stc = stc.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //   // 在语境句子中将关键字突出显示
    //   stc = stc.replace(new RegExp(keyWord, 'g'), '<span class="keyWord">' + keyWord + '</span>');
    //   let ScouterSelection = ''
    //   if (windowElement.current) {
    //     // 选中的文字
    //     ScouterSelection = windowElement.current?.querySelector('#ScouterSelection')?.getElementsByTagName('span')[0].innerHTML!
    //     // console.log(windowElement.current);
    //     container = windowElement.current.innerHTML
    //     container = windowElement.current.getElementsByClassName('messages')[0].innerHTML
    //     // 处理 container 的内容
    //     let parser = new DOMParser();
    //     let doc = parser.parseFromString(container, 'text/html');
    //     let elementsToRemove = doc.querySelectorAll('.imageQueue');
    //     let imageSource = doc.querySelectorAll('.imageSource');
    //     // 创建新的 img 标签
    //     // 设置图片的尺寸、样式
    //     if (doc.getElementsByClassName('imageBox').length > 0) {
    //       let img = doc.getElementsByClassName('imageBox')[0].getElementsByTagName('img')[0] as HTMLImageElement;
    //       img.width = 0
    //       const imgUrl = img.src;
    //       let newImg = document.createElement("img");
    //       newImg.src = imgUrl;
    //       // 获取要替换的 div
    //       let div = doc.getElementsByClassName('imageBox')[0];
    //       if (div) {
    //         // 使用新的 img 标签替换 div
    //         div.parentNode?.replaceChild(newImg, div);
    //       }
    //     } else {
    //       // 没有图片
    //       const imgs = doc.getElementsByClassName('images')[0]
    //       if (imgs) {
    //         imgs.parentNode?.removeChild(imgs)
    //       }
    //     }
    //     // 删除预加载的图片
    //     elementsToRemove.forEach(el => el.parentNode?.removeChild(el));
    //     // 删除图片来源信息
    //     imageSource.forEach(el => el.parentNode?.removeChild(el));
    //     container = doc.body.innerHTML;
    //     // 处理样式，避免 Anki 内显示异常
    //     container = container.replace(/style=/g, '');
    //     if (windowElement.current.getElementsByClassName('imageBox')[0] !== undefined) {
    //       images = windowElement.current.getElementsByClassName('imageBox')[0].innerHTML
    //       // 获取 unsplashApi 的 download_location
    //       unsplash_download_location = windowElement.current.getElementsByClassName('images')[0].getElementsByTagName('img')[0].parentElement?.getAttribute('data-downloadlocation')
    //     }
    //     // console.log(images);
    //     // 处理样式，避免 Anki 内显示异常
    //     images = images.replace(/style=/gi, '');
    //     images = images.replace(/width/gi, '');
    //   }
    //   const cardStyle = ``
    //   // 请求 background 将数据保存到 Anki
    //   // 单词发音
    //   interface LangObject {
    //     [key: string]: langType;
    //   }
    //   const thisLang: LangObject = lang
    //   let audioUrl: string = 'http://dict.youdao.com/dictvoice?type=0&audio='
    //   let audio: [] | [{}], filename
    //   try {
    //     audioUrl = thisLang[Lang['target']['id']]['audioURL']
    //     // filename = Date.now().toString()
    //     filename = ''
    //     audio = [{
    //       "url": audioUrl + keyWord,
    //       "filename": "Scouter" + filename + ".mp3",
    //       "fields": [
    //         "Front"
    //       ]
    //     }]
    //   } catch (error) {
    //     audio = []
    //   }
    //   // 常规类型
    //   let ankiBack = '<p> <blockquote>' + stc + ' —— <a href="' + window.location.href + '">Source</a></blockquote></p>' + container
    //   if (keyWord.length > 20) {
    //     // 如果选中的符号长度大于 20（说明是句子）则不显示上下文句子，然后将来源链接放到尾部
    //     ankiBack = container + '<p><a href="' + window.location.href + '">Source</a></p>'
    //   }
    //   let p = {
    //     "note": {
    //       "deckName": deckName,
    //       "modelName": modelName,
    //       "fields": {
    //         [front]: keyWord,
    //         [back]: cardStyle + ankiBack
    //       },
    //       "audio": audio,
    //       "tags": [
    //         "Scouter"
    //       ]
    //     }
    //   }
    //   // 完形填空类型
    //   if (ScouterSelection.indexOf('class="ankiSpace"') >= 0 || container.indexOf('class="ankiSpace"') >= 0 || container.indexOf('{{c') >= 0) {
    //     let newFront: string
    //     newFront = '<p>' + ScouterSelection + '</p>' + '<blockquote>' + stc + ' —— <a href="' + window.location.href + '">Source</a></blockquote>' + container
    //     if (keyWord.length > 20) {
    //       // 如果选中的符号长度大于 20（说明是句子）则不显示上下文句子，然后将来源链接放到尾部
    //       newFront = '<p>' + ScouterSelection + '</p>' + container + '<p> <a href="' + window.location.href + '">Source</a></p>'
    //     }
    //     p = {
    //       "note": {
    //         "deckName": deckName,
    //         "modelName": modelName,
    //         "fields": {
    //           [front]: newFront,
    //           [back]: ''
    //         },
    //         "audio": [],
    //         "tags": [
    //           "Scouter"
    //         ]
    //       }
    //     }
    //   }
    //   // 发送消息给 background
    //   let sending = browser.runtime.sendMessage({ 'type': 'addNote', 'messages': { 'anki_arguments': p, 'anki_action_type': 'addNote', 'unsplash_download_location': unsplash_download_location }, })
    //   sending.then(handleResponse, handleError);
    //   // 数据埋点
    //   // amplitude.track('addToAnki');
    //   browser.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'addToAnki' })
    // }
    // // 点击保存到 Anki
    // const handleSaveToAnkiBtnClick = (deck?: string) => {
    //   // 根据是否为完形填空申请不同的卡片模板
    //   const container = windowElement.current?.getElementsByClassName('messages')[0].innerHTML!
    //   const selectionText = windowElement.current?.querySelector('#ScouterSelection')?.getElementsByTagName('span')[0].innerHTML!
    //   let isAnkiSpace = false
    //   if (container || selectionText) {
    //     if (container.indexOf('class="ankiSpace"') >= 0 || container.indexOf('{{c') >= 0 || selectionText.indexOf('class="ankiSpace') >= 0) {
    //       isAnkiSpace = true
    //     }
    //   }
    //   setAddToAnkiStatus({ 'status': 'loading', 'noteId': 0 })
    //   function setAnkiInfo(ankiInfo: AnkiInfoType) {
    //     const models = ankiInfo.models
    //     let modelName: string = '', field1: string = '', field2: string = ''
    //     models.forEach((model: any) => {
    //       if (model.isAnkiSpace === isAnkiSpace) {
    //         modelName = model.modelName
    //         field1 = model.field1
    //         field2 = model.field2
    //       }
    //     });
    //     return {
    //       'modelName': modelName,
    //       'field1': field1,
    //       'field2': field2
    //     }
    //   }
    //   if (userInfo?.anki) {
    //     const thisDeck = deck ? deck : userInfo?.anki.defaultDeckName
    //     const ankiInfo = setAnkiInfo(userInfo?.anki)
    //     // 添加到 Anki 中
    //     addToAnki(thisDeck, ankiInfo.modelName!, ankiInfo.field1!, ankiInfo.field2!)
    //   } else {
    //     // 获取 Anki 牌组信息
    //     browser.runtime.sendMessage({ 'type': 'setModel', 'messages': {}, }).then((result) => {
    //       if (result.result === 'success') {
    //         const ankiInfo = setAnkiInfo(result.data)
    //         const thisDeck = deck ? deck : userInfo?.anki.defaultDeckName
    //         // 添加到 Anki 中
    //         addToAnki(thisDeck!, ankiInfo.modelName!, ankiInfo.field1!, ankiInfo.field2!)
    //       } else {
    //         // 反馈错误信息
    //         alert(result.error.error)
    //         setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 })
    //       }
    //     })
    //   }
    // }
    // GPT 生成消息时，自动定位到消息列表底部，方便用户阅读
    function scrollToBottom(canSroll = false) {
        if (windowElement.current !== null) {
            const container = windowElement.current.querySelectorAll('.container')[0];
            if (canSroll) {
                // 位于底部，需要自动滚动
                container.scrollTop = container.scrollHeight + 20;
            }
        }
    }
    const openCustomPromptForm = (data) => {
        // 开启或关闭自定义 Prompt 表单
        setPopoverOpen(data.isOpen);
        // 设置表单的默认设置
        if (data.isOpen) {
            setCustomPromptFormData(data.data);
            // 开启表单
            // amplitude.track('openCustomPromptForm');
            webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'openCustomPromptForm' });
        }
        // 开启表单后禁止点击窗口外区域关闭窗口
        (0, contentScript_1.setDonotClosePopupCard)(data.isOpen);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ScouterDiv, { id: "LearningEnglish2023", ref: windowElement, style: {
                left: 10,
                top: 10,
            } },
            react_1.default.createElement(antd_1.ConfigProvider, { theme: {
                    token: {
                        colorPrimary: '#F08A24',
                    },
                } },
                react_1.default.createElement(Nav_1.Nav
                // handleSaveToAnkiBtnClick={handleSaveToAnkiBtnClick}
                , { 
                    // handleSaveToAnkiBtnClick={handleSaveToAnkiBtnClick}
                    addToAnkiStatus: addToAnkiStatus, onMouseDown: handleMouseDown, handleMenuItemClick: executivePrompt, openCustomPromptForm: openCustomPromptForm, isOpenMenu: isOpenMenu, prompts: prompts, lastExecutedPrompt: lastExecutedPrompt, keyWord: props.data.keyWord, Sentence: props.data.Sentence, windowElement: windowElement.current }),
                react_1.default.createElement("div", { className: 'container flex-grow flex flex-col overflow-auto', style: {
                        marginTop: '48px'
                    } },
                    react_1.default.createElement("div", { className: 'flex-grow', ref: messagesList, style: {} },
                        react_1.default.createElement(Selection_1.Selection, { text: props.data.keyWord }),
                        react_1.default.createElement(Message_1.MessagesList, { messages: messages }),
                        messages.length > 0 &&
                            (messages[messages.length - 1].prompt === '' ? ''
                                :
                                    react_1.default.createElement(RegenerateButton_1.RegenerateButton, { messages: messages, handleRegenerateButtonClick: handleRegenerateButtonClick })),
                        react_1.default.createElement("div", { className: 'followUpMenuBox', style: {
                                display: showFollowUpDataMenu.show ? 'block' : 'none',
                                position: "relative",
                                width: 'fit-content',
                                height: '0'
                            } },
                            react_1.default.createElement(PromptList_1.PromptList, { followUpData: followUpData, showFollowUpDataMenu: showFollowUpDataMenu, promptList: prompts, handleMenuItemClick: executivePrompt })))),
                react_1.default.createElement(UserMessageInput_1.UserMessageInput, { messages: messages, handleSendMessage: handleSendMessage }),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(antd_1.Drawer, { title: customPromptFormData.id === '' ? "Create Prompt" : "Edit Prompt", placement: "bottom", closable: false, height: '100%', 
                        // onClose={onClose}
                        open: isPopoverOpen, getContainer: false, extra: react_1.default.createElement(antd_1.Space, null,
                            react_1.default.createElement(antd_1.Button, { style: { zIndex: '9' }, onClick: () => openCustomPromptForm({ isOpen: false, data: { 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' } }) }, "Cancel")) },
                        react_1.default.createElement("div", { style: {
                                // backgroundColor: 'red',
                                position: 'absolute',
                                left: '0',
                                top: '0',
                                width: '100%',
                                height: '64px',
                                cursor: 'all-scroll'
                            }, onMouseDown: handleMouseDown }),
                        react_1.default.createElement(CustomPromptForm_1.CustomPromptForm, { openCustomPromptForm: openCustomPromptForm, handlePromptEdited: handlePromptEdited, data: customPromptFormData })))))));
}
exports.PopupCard = PopupCard;
;


/***/ }),

/***/ "./src/PopupCard/style.ts":
/*!********************************!*\
  !*** ./src/PopupCard/style.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.popupCardStyle = void 0;
exports.popupCardStyle = `
.slick-arrow::before{
  content:"" !important;
}

.ankiSpace {
  color:#F08A24;
  cursor: pointer;
}

.ankiSpace:hover {
  background-color:#F08A24;
  color:#ffffff;
}

.contextBox,.followUpMenu {
  display: flex;
  width: fit-content;
  padding: 4px 8px;
  background-color: #fff;
  border: 1px solid rgba(5, 5, 5, .06);
  border-radius: 4px;
  box-shadow: 0px 8px 28px rgba(0,0,0,.16);
  z-index:9;

}

.contextBox {
  align-items: center;
}

// .contextBox * {
//   cursor: default;
//   padding: 2px;
// }

// .ankiSpaceButtonBox {
//   display: flex;
//   flex-direction: row;
//   margin-right: 8px;
//   border-right: 1px solid rgba(5, 5, 5, .12);
//   padding-right: 10px;
// }

// .setAnkiSpaceButton:first-of-type {
//   margin-right:8px;
// }

// .lookUpButton {
//   width: 18px;
//   height: 18px;
//   background-size: contain;
//   background-repeat: no-repeat;
//   background-position: center;
// }

// .ankiSpaceButtonBox *:hover {
  
//   background-color: rgba(0,0,59,0.051);
//   border-radius: 2px;

// }

.ant-carousel .slick-prev,
.ant-carousel .slick-next,
.ant-carousel .slick-prev:hover,
.ant-carousel .slick-next:hover {
  font-size: inherit;
  color: currentColor;
}

.ant-carousel .slick-prev,
.ant-carousel .slick-prev:hover {
  left: 10px;
  z-index: 2;
  color: white;
}

.ant-carousel .slick-next,
.ant-carousel .slick-next:hover {
  right: 10px;
  z-index: 2;
  color: white;
}

.images img {
  object-fit: cover;
  border-radius: 2px;
}


#LearningEnglish2023 h1,#LearningEnglish2023 h2,#LearningEnglish2023 h3{
  margin: 10px 0;
}

// #LearningEnglish2023 h1{
//   font-size:20px;
// }
// #LearningEnglish2023 h2{
//   font-size:17px;
// }

// #LearningEnglish2023 {
// font-family: sans-serif;
// width: 390px;
// height: 560px;
// color: rgb(0 0 0 / 80%);
// position: fixed;
// display: flex;
// flex-direction: column;
// font-size: 13.2px;
// background-color: #fff;
// z-index: 9999;
// overflow: hidden;
// box-shadow: 0px 8px 28px rgba(0,0,0,.16);
// border-radius: 6px;
// border:1px solid rgba(5, 5, 5, .06)
// }

::selection {
  background-color: #FFD5B2;
}

::-moz-selection {
  background-color: #FFD5B2;
}

#LearningEnglish2023 .container::-webkit-scrollbar  {
  // width:0px;
}

#LearningEnglish2023 .container::-webkit-scrollbar-track  {
  // background: #fff; /* 设置滚动条轨道背景色 */
}

// #LearningEnglish2023 .container::-webkit-scrollbar-thumb {
//   background: #888; /* 设置滚动条滑块背景色 */
// }

#LearningEnglish2023 .DropdownMenuItem:hover {
  
  background-color:#F6F6F6;
}

#LearningEnglish2023 .DropdownMenuItem:focus-visible {
  outline: none;
}

#LearningEnglish2023 h1,#LearningEnglish2023 h2,#LearningEnglish2023 h3 {

  color: rgba(0, 0, 0);

}

#LearningEnglish2023 #ScouterSelection, #LearningEnglish2023 .messages>div  {
  padding-left:18px;
  padding-right:18px;
}


#LearningEnglish2023 .userInput {
margin: 10px 0;
}

#LearningEnglish2023 .contentBox {
overflow: scroll;
}

#LearningEnglish2023 .messages > * > * {
  // margin: 18px 0;
}

#LearningEnglish2023 #ScouterNav {
// display: flex;
// justify-content: start;
// align-items: center;
// padding-top: 12px;
// padding-bottom: 12px;
// border-bottom: 1px solid rgba(5, 5, 5, .06);
// user-select: none;
}

#LearningEnglish2023 #ScouterNav img {
// width: auto;
// height: 24px;
// margin-right: 6px;
}

.messages ul{
  list-style:disc;
  padding-left: 20px;
}

.messages ol{
  list-style:auto;
  padding-left: 20px;
}

#LearningEnglish2023 .isPin path{
  fill: #F08A24;
}

#LearningEnglish2023 .rightBtnBox button {

  display: flex;
  align-items: center;
  justify-content: center;

}

#LearningEnglish2023 .rightBtnBox button span:last-of-type{
  
}

table tr {
  border: 1px solid #ddd;
  padding: 5px;
}
table th, table td {
  padding: 10px;
  text-align: left;
}
table th {
  // font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

// /* 滚动条以及滚动条轨道的宽度 */
// ::-webkit-scrollbar {
//     width: 10px;
// }

// /* 滚动条轨道的样式*/
// ::-webkit-scrollbar-track {
    
// }

// /* 滚动条的样式 */
// ::-webkit-scrollbar-thumb {
//     background: #888; 
// }

// /* 当你鼠标悬停在滚动条上时的样式 */
// ::-webkit-scrollbar-thumb:hover {
//     background: #555; 
// }

/* 滚动条 */
::-webkit-scrollbar-thumb:horizontal { /*水平滚动条的样式*/
  width: 4px;
  background-color: #C1C1C1;
  -webkit-border-radius: 6px;
}
::-webkit-scrollbar-track-piece {
  background-color: #fff; /*滚动条的背景颜色*/
  -webkit-border-radius: 0; /*滚动条的圆角宽度*/
}
::-webkit-scrollbar {
  width: 10px; /*滚动条的宽度*/
  height: 8px; /*滚动条的高度*/
}
::-webkit-scrollbar-thumb:vertical { /*垂直滚动条的样式*/
  height: 50px;
  background-color: #999;
  -webkit-border-radius: 4px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}
::-webkit-scrollbar-thumb:hover { /*滚动条的hover样式*/
  height: 50px;
  background-color: #9f9f9f;
  -webkit-border-radius: 4px;
}

pre {
background-color: #f0f0f0;
border-radius: 5px;
padding: 15px;
border: 1px solid #ddd;
color: #333;
font-family: Courier, monospace;
line-height: 1.2;
overflow-x: auto;
white-space: pre;
}

blockquote {
padding: 10px 20px;
margin: 0 0 20px;
border-left: 5px solid #f1f1f1;
color: #666;
background-color: #f9f9f9;
}

`;


/***/ }),

/***/ "./src/PopupCard/util.ts":
/*!*******************************!*\
  !*** ./src/PopupCard/util.ts ***!
  \*******************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getInitialPrompt = exports.getDefaultPrompt = exports.handleHightlight = exports.getAnkiCards = exports.handlePromptVariables = exports.getUnsplashImages = exports.windowInitialization = exports.getClipboard = exports.defaultPrompt = exports.dictionaryPrompt = void 0;
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const util_1 = __webpack_require__(/*! ../Options/util */ "./src/Options/util.ts");
exports.dictionaryPrompt = {
    title: 'Dictionary',
    id: 'dict',
    getUnsplashImages: true,
    userPrompt: '',
};
exports.defaultPrompt = {
    title: 'Dictionary',
    id: 'dict',
    getUnsplashImages: true,
    userPrompt: '',
};
const getClipboard = () => {
    return new Promise((resolve, reject) => {
        navigator.clipboard.readText()
            .then(text => {
            resolve(text);
        })
            .catch(err => {
            reject(err);
        });
    });
};
exports.getClipboard = getClipboard;
const windowInitialization = (data) => {
    // 设置窗口的默认位置
    if (data.windowElement.current && !data.isPin) {
        // Check the boundaries
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const elementWidth = data.windowElement.current.clientWidth;
        const elementHeight = data.windowElement.current.clientHeight;
        const minX = 0;
        const minY = 0;
        const maxX = windowWidth - elementWidth;
        const maxY = windowHeight - elementHeight;
        let newX, newY = 0;
        try {
            const selectionObject = data.selection.getRangeAt(0).getBoundingClientRect();
            newX = selectionObject.x + selectionObject.width + 10;
            newY = selectionObject.y + selectionObject.height + 10;
        }
        catch (error) {
        }
        const clampedX = Math.max(minX, Math.min(newX, maxX));
        const clampedY = Math.max(minY, Math.min(newY, maxY));
        data.windowElement.current.style.left = `${clampedX}px`;
        data.windowElement.current.style.top = `${clampedY}px`;
    }
    // // 添加滚动事件，让消息列表自动滚动到底部
    // data.messagesList.current?.addEventListener("scroll", handleScroll);
    // return () => {
    //     // console.log('useEffect return');
    //     data.messagesList.current?.removeEventListener("scroll", handleScroll);
    // };
    // function handleScroll() {
    //     if (data.messagesList.current !== null) {
    //         const isAtBottom = data.messagesList.current?.scrollTop + data.messagesList.current.clientHeight >= data.messagesList.current.scrollHeight - 0.5;
    //         if (isAtBottom) {
    //             // 已经位于底部，不需要自动滚动
    //             return;
    //         } else {
    //             // scrollToBottom()
    //         }
    //     }
    //     // 未位于底部，不执行自动滚动
    // }
};
exports.windowInitialization = windowInitialization;
/**
 * 获取 Unsplash 图片
 *
 * @param {string} keyWord - 根据此关键字搜索图片
 * @returns {Array} 图片列表
 * @throws {异常类型} 异常描述
 */
const getUnsplashImages = (keyWord) => {
    return new Promise((resolve, reject) => {
        // 请求 background 获取数据
        // 使用长连接
        // let port = browser.runtime.connect({
        //     name: 'fromPopupCardUtil'
        // })
        // 使用 postMs 发送信息
        let sending = webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'getUnsplashImages', 'messages': '', 'keyWord': keyWord });
        sending.then((msg) => {
            if (msg.type === 'sendImgData') {
                if ('imgs' in msg) {
                    // console.log('unsplashSearchPhotos');
                    resolve(msg.imgs);
                }
            }
        }, () => {
            //error
        });
        // // 接收信息
        // port.onMessage.addListener(msg => {
        //     if (msg.type === 'sendImgData') {
        //         if ('imgs' in msg) {
        //             // console.log('unsplashSearchPhotos');
        //             resolve(msg.imgs)
        //         }
        //     }
        // })
    });
};
exports.getUnsplashImages = getUnsplashImages;
/**
 * 处理 Prompt 中的变量
 *
 * @param {string} promptStr - 需要处理的 Prompt 字符串
 * @param {string} keyWord - 用户所选中的关键字
 * @param {string} Sentence - 从网页中提取的关键字所在的句子
 * @returns {string} 处理后的 Prompt 字符串
 * @throws {异常类型} 异常描述
 */
const handlePromptVariables = (promptStr, keyWord, Sentence, Lang) => __awaiter(void 0, void 0, void 0, function* () {
    let newPromptStr = promptStr;
    // 处理关键字和句子
    newPromptStr = promptStr.replace(/\{selection\}/g, keyWord);
    newPromptStr = newPromptStr.replace(/\{sentence\}/g, Sentence);
    // 处理语言
    newPromptStr = newPromptStr.replace(/\{nativeLanguage\}/g, Lang['current']['name']);
    newPromptStr = newPromptStr.replace(/\{currentLanguage\}/g, Lang['current']['name']);
    newPromptStr = newPromptStr.replace(/\{targetLanguage\}/g, Lang['target']['name']);
    // 处理 Anki 单词
    if (newPromptStr.indexOf('{ankiCards}') >= 0) {
        // 获取目标卡片
        let randomValues;
        let ankiCardsStr = '';
        yield (0, exports.getAnkiCards)().then((cards) => {
            randomValues = cards;
            if (randomValues !== null) {
                if (randomValues.length > 5) {
                    // 随机取 X 个卡片
                    // 深拷贝数组以避免修改源数组
                    const shuffledArray = randomValues.slice();
                    // 使用 Fisher-Yates 洗牌算法对数组进行打乱
                    for (let i = shuffledArray.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
                    }
                    // 取前 x 个元素作为结果
                    randomValues = shuffledArray.slice(0, 5);
                }
                else {
                }
                // 将单词替换到 prompt 中
                randomValues === null || randomValues === void 0 ? void 0 : randomValues.forEach((card) => {
                    const keys = Object.keys(card.fields);
                    let firstKey = keys[0];
                    // 找到卡片正面
                    for (let i = 0; i < keys.length; i++) {
                        if (card.fields[keys[i]].order === 0) {
                            firstKey = keys[i];
                            break;
                        }
                    }
                    ankiCardsStr += card.fields[firstKey].value + ',';
                });
                newPromptStr = newPromptStr.replace(/\{ankiCards\}/g, ankiCardsStr);
                return newPromptStr;
            }
        }).catch((error) => {
            newPromptStr = newPromptStr.replace(/\{ankiCards\}/g, '');
        });
    }
    return newPromptStr;
});
exports.handlePromptVariables = handlePromptVariables;
/**
 * 获取 Anki 卡片
 *
 * @returns {object[]} 返回卡片的对象列表
 * @throws {异常类型} 异常描述
 */
const getAnkiCards = () => {
    return new Promise((resolve, reject) => {
        // 判断本地是否存有未过期的数据
        webextension_polyfill_1.default.storage.local.get({ "ankiCards": { 'cards': [], 'time': 0 } }).then((item) => __awaiter(void 0, void 0, void 0, function* () {
            // 缓存 1 小时
            if (item.ankiCards.cards.length > 0 && Date.now() - item.ankiCards.time < 3600 * 1000) {
                // 若本地有可用的数据，则直接处理
                resolve(item.ankiCards.cards);
            }
            else {
                // 若本地无可用的数据，则通过 Anki
                yield webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'ankiAction', 'messages': { 'anki_action_type': 'findCards', 'anki_arguments': { 'query': 'is:due prop:due>-2 prop:due<3' } }, }).then((message) => __awaiter(void 0, void 0, void 0, function* () {
                    if (message.error === null) {
                        // 根据卡片 ID 查询卡片信息
                        yield webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'ankiAction', 'messages': { 'anki_action_type': 'cardsInfo', 'anki_arguments': { 'cards': message.result } }, }).then((message) => {
                            // console.log(message);
                            let cards = message.result;
                            // 将数据存储到本地，限制最大保存数量，避免本地存储空间达到上限
                            webextension_polyfill_1.default.storage.local.set({
                                ankiCards: { 'time': Date.now(), 'cards': cards.slice(0, 30) }
                            });
                            resolve(cards.slice(0, 30));
                        }, (message) => {
                            //error
                        });
                    }
                    else {
                        // 反馈错误信息
                        reject(message);
                    }
                }), (message) => {
                    //error
                });
            }
        }));
    });
};
exports.getAnkiCards = getAnkiCards;
/**
 * 处理字符串，对指定字符设置样式、点击事件
 *
 * @param {string} str - 需要处理的字符串
 * @param {string} keyWord - 当前选中的字符
 * @returns {string} 处理后的 Prompt 字符串
 * @throws {异常类型} 异常描述
 */
const handleHightlight = (str, keyWord, ankiCards, windowElement) => {
    if (str === '') {
        return str;
    }
    let newStr = str;
    // 处理 keyword 高亮
    newStr = newStr.replace(new RegExp(`(^|[^*])(${keyWord})([^*]|$)`, 'gi'), function (match, p1, p2, p3) {
        // 如果关键词前后没有*，则添加**，否则保留原样
        if (p1 !== '*' && p3 !== '*') {
            return p1 + '**' + p2 + '**' + p3;
        }
        else {
            return match; // 不进行替换
        }
    });
    // // 处理 Anki 单词高亮
    // const cards = ankiCards
    // if (windowElement && cards) {
    //     // 遍历每一个卡片
    //     cards.forEach((card: any) => {
    //         // setTimeout(() => {
    //         // console.log(card);
    //         const keys = Object.keys(card.fields);
    //         let firstKey = keys[0];
    //         // 找到卡片正面
    //         for (let i = 0; i < keys.length; i++) {
    //             if (card.fields[keys[i]].order === 0) {
    //                 firstKey = keys[i]
    //                 break
    //             }
    //         }
    //         const cardFrontValue = card.fields[firstKey].value
    //         const escapedCardFrontValue = escapeRegExp(cardFrontValue);
    //         if (cardFrontValue !== keyWord) {
    //             newStr = newStr.replace(new RegExp(escapedCardFrontValue, 'gi'), `<mark>${cardFrontValue}</mark>`)
    //         }
    //         // }, 10);
    //         function escapeRegExp(string: string) {
    //             return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    //         }
    //     });
    //     // 对上述元素添加点击事件
    //     // let hightlightDom = windowElement.getElementsByClassName('hello')
    //     // for (let i = 0; i < hightlightDom.length; i++) {
    //     //     hightlightDom[i].removeEventListener('click', handleHightlightClick)
    //     //     hightlightDom[i].addEventListener('click', handleHightlightClick)
    //     // }
    // }
    return newStr;
    // return 'true'
};
exports.handleHightlight = handleHightlight;
/**
 * 获取系统的默认 Prompt
 * @param {string} keyWord - 当前选中的字符
 * @returns {string} Prompt 字符串
 * @throws {异常类型} 异常描述
 */
const getDefaultPrompt = (keyWord, currentLanguage) => {
    let getUnsplashImages = true;
    let userPrompt = `

        Please help me learn as a foreign language teacher. Sentences in examples should not be the same as the given sentence, Absolutely No Extra Text, Only Provide Information as in the Examples, Keep Language Concise.

        Example：
        
        -  Meaning: <Explain the meaning using {nativeLanguage}>
        -  Part of Speech: <Indicate the part of speech using {nativeLanguage}>
        
        ## Meaning in the sentence
        -  <Explain the meaning of the word in the sentence using {nativeLanguage}>
        
        ## Example Sentences
        -  <{targetLanguage} example sentence> - <Translation in {nativeLanguage}>
        -  <{targetLanguage} example sentence> - <Translation in {nativeLanguage}>
        
        ## Translation Exercise
        -  <{nativeLanguage} sentence>
        -  <{nativeLanguage} sentence>
        
        ---
        
        Word:{selection}, sentence: {sentence},You must reply in the specified language

        Please start teaching:

        `;
    switch (currentLanguage) {
        case '简体中文':
            userPrompt = `
            作为一名外语教师，我希望得到你的帮助。你提供的例句不能与我提供的句子相同，严禁添加任何额外的文本，只按照示例中的方式给出信息，确保语言简洁。

            示例：
            
            -  含义：<用 {nativeLanguage} 解释含义>
            -  词性：<用 {nativeLanguage} 表明词性>
            
            ## 在句中的含义
            -  <用 {nativeLanguage} 解释句中的词汇含义>
            
            ## 示例句子
            -  <{targetLanguage} 的示例句子> - <用 {nativeLanguage} 翻译>
            -  <{targetLanguage} 的示例句子> - <用 {nativeLanguage} 翻译>
            
            ## 翻译练习
            -  <{nativeLanguage} 句子>
            -  <{nativeLanguage} 句子>
            
            ---
            
            单词："{selection}"，句子："{sentence}"，你必须用规定的语言进行回复。
    
            请开始教学：
    
            `;
            break;
        case '繁體中文':
            userPrompt = `
            作為一名外語老師，我希望得到你的幫助。你提供的例句不應與我提供的句子相同，嚴禁添加任何額外的文字，只按照範例中的方式給出資訊，確保語言簡潔。

            範例：

            -  含義：<用 {nativeLanguage} 解釋含義>
            -  詞性：<用 {nativeLanguage} 表明詞性>

            ## 在句子中的含義
            -  <用 {nativeLanguage} 解釋句中的詞彙含義>

            ## 範例句子
            -  <{targetLanguage} 的範例句子> - <用 {nativeLanguage} 翻譯>
            -  <{targetLanguage} 的範例句子> - <用 {nativeLanguage} 翻譯>

            ## 翻譯練習
            -  <{nativeLanguage} 句子>
            -  <{nativeLanguage} 句子>

            ---

            字詞："{selection}"，句子："{sentence}"，你必須用規定的語言進行回覆。

            請開始教學：

            `;
            break;
        default:
            break;
    }
    // 关键字长度较长时，按照句子进行处理
    if (keyWord.length > 20) {
        getUnsplashImages = false;
        userPrompt = `
      
            As a language teacher, I will provide an explanation of the grammar knowledge in the given sentence, Absolutely No Extra Text, Only Provide Information as in the Examples, Keep Language Concise.

            Example:

            ## Translation
            <Translate to {nativeLanguage}>
            
            ## Grammar
            <- Point: Explain in {nativeLanguage}>

            ## Examples of related grammar
            -  <{targetLanguage} example sentence> - <Translation in {nativeLanguage}>
            -  <{targetLanguage} example sentence> - <Translation in {nativeLanguage}>

            ---
            
            Sentence: {selection}
                  
            `;
        switch (currentLanguage) {
            case '简体中文':
                userPrompt = `
                
                请你作为一名外语教师对给定句子中的语法知识进行解释，绝对不能有任何额外的文本，只按照示例提供信息，保持语言简洁。

                示例：

                ## 翻译
                <翻译成{nativeLanguage}>

                ## 语法
                <- 点：用{nativeLanguage}解释>

                ## 相关语法示例
                -   <{targetLanguage}的示例句子> - <用{nativeLanguage}翻译>
                -   <{targetLanguage}的示例句子> - <用{nativeLanguage}翻译>

                ---

                句子：”{selection}“

                `;
                break;
            case '繁體中文':
                userPrompt = `
                請你作為一名外語教師對給定句子中的語法知識進行解釋，絕對不能有任何額外的文本，只按照範例提供資訊，保持語言簡潔。

                範例：

                ## 翻譯
                <翻譯成{nativeLanguage}>

                ## 語法
                <- 點：用{nativeLanguage}解釋>

                ## 相關語法範例
                -   <{targetLanguage}的範例句子> - <用{nativeLanguage}翻譯>
                -   <{targetLanguage}的範例句子> - <用{nativeLanguage}翻譯>

                ---

                句子："{selection}"

                `;
                break;
            default:
                break;
        }
    }
    const defaultPrompt = {
        'title': 'Default', 'getUnsplashImages': getUnsplashImages, 'userPrompt': userPrompt,
        'id': 'Default'
    };
    return defaultPrompt;
};
exports.getDefaultPrompt = getDefaultPrompt;
const getInitialPrompt = (keyWord, currentLanguage) => __awaiter(void 0, void 0, void 0, function* () {
    //判断用户是否设置了 API Key，未设置则默认使用在线词典
    const isSetKey = yield (0, util_1.getSettings)().then((items) => {
        if (items.apiKeySelection === 'licenseKey' && items.licenseKey.length < 5) {
            return false;
        }
        else if (items.apiKeySelection === 'myOwnOpenAiKey' && items.openApiKey.length < 5) {
            return false;
        }
        else {
            return true;
        }
    });
    if (isSetKey) {
        const defaultPrompt = (0, exports.getDefaultPrompt)(keyWord, currentLanguage);
        return defaultPrompt;
    }
    else {
        // 没有设置 Api Key
        return exports.dictionaryPrompt;
    }
});
exports.getInitialPrompt = getInitialPrompt;


/***/ }),

/***/ "./src/contentScript/ShortcutButton.tsx":
/*!**********************************************!*\
  !*** ./src/contentScript/ShortcutButton.tsx ***!
  \**********************************************/
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
exports.ShortcutButton = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const styled_components_1 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
const react_icons_1 = __webpack_require__(/*! @radix-ui/react-icons */ "./node_modules/@radix-ui/react-icons/dist/react-icons.esm.js");
const ScouterButton = styled_components_1.default.button `
    
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 4px 8px;

    &:hover {
        background-color: #F6F6F6;
    }

`;
const ScouterButtonBox = styled_components_1.default.div `

font-family: sans-serif;
background-color: #fff;
color: rgb(0 0 0 / 80%);
height:32px;

font-size:14px;

display: flex;
flex-direction: row;
align-items: center;

position: absolute;
top: ${props => props.top}px;
left: ${props => props.left}px;
z-index: 999;

box-shadow: 0px 8px 28px rgba(0,0,0,.16);
border-radius: 4px;
border:1px solid rgba(5, 5, 5, .06)

`;
function ShortcutButton(props) {
    // // 设置初始坐标为 (0, 0)
    const [position, setPosition] = (0, react_1.useState)({ x: 0, y: 0 });
    const buttonRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        //设置按钮位置
        let left = props.position.x;
        let top = props.position.y;
        if (buttonRef.current) {
            const buttonWidth = buttonRef.current.offsetWidth;
            const buttonHeight = buttonRef.current.offsetHeight;
            // 如果超出右侧边界，向左调整
            if (left + buttonWidth > window.innerWidth) {
                left = window.innerWidth - buttonWidth - 10;
            }
            // // 如果超出底部边界，向上调整
            // if (top + buttonHeight > window.innerHeight) {
            //     top = window.innerHeight - buttonHeight;
            // }
        }
        setPosition({ x: left, y: top });
    }, []);
    return (react_1.default.createElement(ScouterButtonBox, { ref: buttonRef, left: position.x, top: position.y },
        react_1.default.createElement("div", { style: {
                padding: '6px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            } },
            react_1.default.createElement(ScouterButton, { style: {
                // marginRight: '4px'
                }, className: "ShortcutButton", onClick: () => props.handleShortcutButtonClick(true) },
                react_1.default.createElement(react_icons_1.PaperPlaneIcon, { style: { marginRight: '4px' } }),
                "Run"),
            react_1.default.createElement(ScouterButton, { className: "ShortcutButton", onClick: () => props.handleShortcutButtonClick(false) },
                react_1.default.createElement(react_icons_1.OpenInNewWindowIcon, { style: { marginRight: '4px' } }),
                " Open"))));
}
exports.ShortcutButton = ShortcutButton;


/***/ }),

/***/ "./src/contentScript/index.tsx":
/*!*************************************!*\
  !*** ./src/contentScript/index.tsx ***!
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
exports.setDonotClosePopupCard = exports.pinPopupCard = void 0;
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
const PopupCard_1 = __webpack_require__(/*! ../PopupCard */ "./src/PopupCard/index.tsx");
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const cssinjs_1 = __webpack_require__(/*! @ant-design/cssinjs */ "./node_modules/@ant-design/cssinjs/es/index.js");
const styled_components_1 = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
const userInfo_1 = __webpack_require__(/*! ../lib/userInfo */ "./src/lib/userInfo.ts");
const lang_1 = __webpack_require__(/*! ../lib/lang */ "./src/lib/lang.ts");
const locale_1 = __webpack_require__(/*! ../lib/locale */ "./src/lib/locale.ts");
const userInfo_2 = __webpack_require__(/*! ../lib/userInfo */ "./src/lib/userInfo.ts");
// import { Button, message } from 'antd';
const icons_1 = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
const util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");
const lang_2 = __webpack_require__(/*! ../lib/lang */ "./src/lib/lang.ts");
const util_2 = __webpack_require__(/*! ../util */ "./src/util.ts");
const style_1 = __webpack_require__(/*! ../PopupCard/style */ "./src/PopupCard/style.ts");
const ShortcutButton_1 = __webpack_require__(/*! ./ShortcutButton */ "./src/contentScript/ShortcutButton.tsx");
const icon128_png_1 = __importDefault(__webpack_require__(/*! ../assets/icon128.png */ "./src/assets/icon128.png"));
const styled_components_2 = __importStar(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
const isFirefox = typeof InstallTrigger !== 'undefined';
// 容器类目
const CONTAINER_CLASSNAME = 'container';
const SHORTCUT_BUTTON_CLASSNAME = 'ShortcutButtonContainer';
// 记录当前窗口是否 Pin 住
let isPin = false;
// 设置当前窗口是否允许关闭
let donotClosePopupCard = false;
// 初始化主容器，主容器用来挂在全局样式，包括第三方组件的样式
let MyBox = document.getElementById('__jiang-scouter');
// console.log(MyBox);
// container 承载主窗口的 UI 组件
let container = document.createElement('div');
container.className = CONTAINER_CLASSNAME;
// 使用 shadow 来隔离样式
let shadowRoot = undefined;
if (MyBox === null || MyBox === undefined) {
    // 如果不存在容器
    // 创建主容器
    MyBox = document.createElement('div');
    MyBox.id = '__jiang-scouter';
    document.getElementsByTagName('html')[0].appendChild(MyBox);
    // MyBox.style.display = 'none' //默认隐藏
    MyBox.style.display = 'block';
    shadowRoot = MyBox === null || MyBox === void 0 ? void 0 : MyBox.attachShadow({ mode: 'open' });
    shadowRoot === null || shadowRoot === void 0 ? void 0 : shadowRoot.appendChild(container);
    // Ant 组件样式
    // const antStylesheet = document.createElement('link');
    // antStylesheet.rel = 'stylesheet';
    // antStylesheet.href = 'https://cdn.bootcdn.net/ajax/libs/antd/4.17.1/antd.min.css';
    // shadowRoot.appendChild(antStylesheet);
    // Tailwind
    const tailwindStylesheet = document.createElement('link');
    tailwindStylesheet.rel = 'stylesheet';
    tailwindStylesheet.href = 'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css';
    shadowRoot.appendChild(tailwindStylesheet);
    // 在 Shadow DOM 中添加样式：
    const style = document.createElement('style');
    style.textContent = style_1.popupCardStyle;
    shadowRoot === null || shadowRoot === void 0 ? void 0 : shadowRoot.appendChild(style);
}
// 用户付费状态等信息、用户的 Anki 信息
let USER_INFO = { userId: 'unknow', verified: false, contextMenu: false };
let ANKI_INFO = { defaultDeckName: '', decks: [], models: [] };
// 获取用户信息
const thisGetUserInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 获取用户信息
        // USER_INFO = await getUserInfo()
        USER_INFO = yield webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'getUserInfo', 'messages': {}, });
    }
    catch (error) {
        console.log(error);
    }
    // 获取 Anki decks
    const decks = yield webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'ankiAction', 'messages': { 'anki_action_type': 'deckNames', 'anki_arguments': {} }, });
    ANKI_INFO.decks = decks.result;
    // 获取 Anki models 和默认的 Deck 名称
    const modelsAndDeck = yield webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'setModel', 'messages': {}, });
    ANKI_INFO.models = modelsAndDeck.data.modelData;
    ANKI_INFO.defaultDeckName = modelsAndDeck.data.defaultDeckName;
    // 更新 Anki style
    try {
        for (let i = 0; i < ANKI_INFO.models.length; i++) {
            const p = {
                "model": {
                    "name": ANKI_INFO.models[i]['modelName'],
                    "css": util_2.cardStyle
                }
            };
            // 更新 style
            webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'ankiAction', 'messages': { 'anki_action_type': 'updateModelStyling', 'anki_arguments': p }, }).then((result) => {
            });
        }
    }
    catch (error) {
    }
    // 获取 Anki 牌组信息
    // browser.runtime.sendMessage({ 'type': 'setModel', 'messages': {}, }).then((result) => {
    //   ANKI_INFO.models = result.data
    //   // 更新 Anki style
    //   try {
    //     for (let i = 0; i < ANKI_INFO.models.length; i++) {
    //       const p = {
    //         "model": {
    //           "name": ANKI_INFO.models[i]['modelName'],
    //           "css": cardStyle
    //         }
    //       }
    //       // 获取 Anki 牌组信息
    //       browser.runtime.sendMessage({ 'type': 'ankiAction', 'messages': { 'anki_action_type': 'updateModelStyling', 'anki_arguments': p }, }).then((result) => {
    //         // console.log(result);
    //       })
    //     }
    //   } catch (error) {
    //   }
    // })
});
let port = webextension_polyfill_1.default.runtime.connect({
    name: 'fromContentScript'
});
// 接收 background 消息（目前是通过浏览器的右键菜单、快捷键触发）
webextension_polyfill_1.default.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    var _a;
    // console.log('content script onMessage:');
    // console.log(msg);
    if (msg.type === 'open-scouter') {
        // 处理窗口
        if (MyBox !== null && MyBox !== undefined) {
            // 如果已存在容器
            if (((_a = MyBox.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.' + CONTAINER_CLASSNAME)) === null) {
                // 如果不存在 PopupCard
                container = document.createElement('div');
                container.className = CONTAINER_CLASSNAME;
                shadowRoot === null || shadowRoot === void 0 ? void 0 : shadowRoot.appendChild(container);
            }
            // 停止旧的对话
            try {
                port.postMessage({ 'type': 'StopTheConversation', 'messages': '' });
            }
            catch (error) {
                // 重新链接
                port = webextension_polyfill_1.default.runtime.connect({
                    name: 'fromContentScript'
                });
                port.postMessage({ 'type': 'StopTheConversation', 'messages': '' });
            }
            // MyBox.style.display = 'block'
            // 移除旧内容，避免 2 次渲染混杂在一起
            // container.parentNode?.removeChild(container);
        }
        else {
            // console.log('不存在 Box 容器');
            container = document.createElement('div');
            container.className = CONTAINER_CLASSNAME;
            shadowRoot === null || shadowRoot === void 0 ? void 0 : shadowRoot.appendChild(container);
        }
        // const selection = window.getSelection();
        const selection = getSelection();
        // 显示窗口
        if (selection && selection.keyWord !== '') {
            showPopupCard({ 'keyWord': selection === null || selection === void 0 ? void 0 : selection.keyWord, 'Sentence': selection.sentence }, window.getSelection(), container, shadowRoot, isPin, msg.runPrompt);
        }
        // // 监听页面点击事件
        // document.onmousedown = function (event) {
        //   if (MyBox !== undefined && MyBox !== null && !isPin && !donotClosePopupCard) {
        //     // 如果点击的不是插件窗口及其子元素，则关闭窗口
        //     if (MyBox !== event.target && !MyBox.contains(event.target as Node)) {
        //       // 隐藏窗口
        //       container.parentNode?.removeChild(container);
        //       // document.removeEventListener('selectionchange', handleSelectionchange);
        //       // document.removeEventListener('mouseup', handleMouseup);
        //       port.postMessage({ 'type': 'StopTheConversation', 'messages': '' })
        //     }
        //   }
        // }
        // container.onmousedown = (event) => {
        //   // 隐藏 setAnkiSpaceButton
        //   const contextBox = container.getElementsByClassName('contextBox2')[0]
        //   if (contextBox) {
        //     // 点击的不是 setAnkiSpaceButton 时才隐藏
        //     if (contextBox !== event.target && !contextBox.contains(event.target as Node)) {
        //       contextBox.parentNode?.removeChild(contextBox)
        //     }
        //   }
        // }
    }
});
// 显示应用窗口
function showPopupCard(data, msg, MyBox, shadowRoot, isPin, runPrompt) {
    return __awaiter(this, void 0, void 0, function* () {
        let lang = yield (0, lang_1.fetchcurrentLanguage)();
        react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null,
            react_1.default.createElement(locale_1.CurrentLanguageContext.Provider, { value: lang },
                react_1.default.createElement(userInfo_2.UserInfoContext.Provider, { value: { user: USER_INFO, anki: ANKI_INFO } },
                    react_1.default.createElement(cssinjs_1.StyleProvider, { container: shadowRoot },
                        react_1.default.createElement(styled_components_1.StyleSheetManager, { target: shadowRoot },
                            react_1.default.createElement(PopupCard_1.PopupCard, { data: data, selection: msg, runPrompt: runPrompt, isPin: isPin })))))), MyBox);
    });
}
// interface PopupCardContextProps {
//   data: any;
//   selection: any;
//   runPrompt: boolean;
// }
// function PopupCardContext(props: PopupCardContextProps) {
//   const [userInfo, setUserInfo] = useState<userInfoType | null>(null);
//   const [lang, setLang] = useState<any>(null);
//   useEffect(() => {
//     async function fetchUserInfo() {
//       const info = await getUserInfo();
//       const lang = await fetchcurrentLanguage()
//       setLang(lang)
//       setUserInfo(info);
//     }
//     fetchUserInfo();
//   }, []);  // 跑一次，不依赖任何外部变量
//   return (
//     <CurrentLanguageContext.Provider value={lang}>
//       <UserInfoContext.Provider value={USER_INFO}>
//         <StyleProvider container={shadowRoot}>
//           <StyleSheetManager target={shadowRoot}>
//             <PopupCard data={props.data} selection={props.selection} runPrompt={props.runPrompt} isPin={isPin} />
//           </StyleSheetManager>
//         </StyleProvider>
//       </UserInfoContext.Provider>
//     </CurrentLanguageContext.Provider>
//   )
// }
const pinPopupCard = (value) => {
    isPin = value;
};
exports.pinPopupCard = pinPopupCard;
const setDonotClosePopupCard = (value) => {
    donotClosePopupCard = value;
};
exports.setDonotClosePopupCard = setDonotClosePopupCard;
// const handleSelectionchange = () => {
//   let selection = window.getSelection();
//   if (selection) {
//     console.log('selection.toString():');
//     console.log(selection.toString());
//     isTextSelected = selection.toString().length > 0;
//   }
// }
let isTextSelected = false;
let lastSelection = {
    anchorNode: null,
    anchorOffset: 0,
    focusNode: null,
    focusOffset: 0,
};
const handleMouseup = (event) => {
    var _a, _b;
    const isInShadow = MyBox === event.target || (MyBox === null || MyBox === void 0 ? void 0 : MyBox.contains(event.target));
    // 获取用户在宿主网页上选中的内容
    const selection = getSelection(isInShadow);
    console.log(selection);
    const range = selection === null || selection === void 0 ? void 0 : selection.selection.getRangeAt(0);
    // lastSelection = {
    //   // 保存各个属性的引用和值
    //   anchorNode: range.startContainer,
    //   anchorOffset: range.startOffset,
    //   focusNode: range.endContainer,
    //   focusOffset: range.endOffset,
    // };
    lastSelection = {
        // 保存各个属性的引用和值
        anchorNode: selection === null || selection === void 0 ? void 0 : selection.selection.anchorNode,
        anchorOffset: selection === null || selection === void 0 ? void 0 : selection.selection.anchorOffset,
        focusNode: selection === null || selection === void 0 ? void 0 : selection.selection.focusNode,
        focusOffset: selection === null || selection === void 0 ? void 0 : selection.selection.focusOffset,
    };
    console.log(lastSelection);
    console.log('=====');
    // console.log('handleMouseup');
    // console.log(isTextSelected);
    // console.log(donotClosePopupCard);
    // console.log(selection);
    // console.log(isInShadow);
    if (selection) {
        isTextSelected = selection.selection.toString().length > 0;
    }
    // 有选中文字且未开启 Prompt 设置界面（如果开启 Prompt 设置界面而仍然执行查询任务时，会导致不必要的任务执行）
    if (isTextSelected && !donotClosePopupCard) {
        if (!isInShadow) {
            // 在 PopupCard 范围外触发
            // isTextSelected = false;
            // 停止旧的对话
            try {
                port.postMessage({ 'type': 'StopTheConversation', 'messages': '' });
            }
            catch (error) {
                // 重新链接
                port = webextension_polyfill_1.default.runtime.connect({
                    name: 'fromContentScript'
                });
                port.postMessage({ 'type': 'StopTheConversation', 'messages': '' });
            }
            // 显示窗口/更新窗口信息
            if (selection && (selection === null || selection === void 0 ? void 0 : selection.keyWord.length) > 0 && isPin && ((_a = selection.selection.anchorNode) === null || _a === void 0 ? void 0 : _a.nodeName) === '#text') {
                showPopupCard({ 'keyWord': selection === null || selection === void 0 ? void 0 : selection.keyWord, 'Sentence': selection.sentence }, window.getSelection(), container, shadowRoot, isPin, true);
            }
        }
        else {
            // 在 PopupCard 范围内触发
            let selectedText;
            // 显示完形填空操作按钮
            if (isFirefox) {
                selectedText = window.getSelection();
            }
            else {
                selectedText = shadowRoot.getSelection();
            }
            const selectedTextString = selectedText.toString();
            // const sentence = ''
            const PopupCardContainer = container.getElementsByClassName(CONTAINER_CLASSNAME)[0];
            // const messagesBox = container.getElementsByClassName('messages')[0]
            // console.log(selectedText);
            // console.log(messagesBox?.contains(selectedText.baseNode.parentNode as Node));
            // let isInMessages = false
            // if (selectedText.baseNode) {
            //   if (messagesBox === selectedText.baseNode.parentNode || messagesBox?.contains(selectedText.baseNode.parentNode as Node)) {
            //     //在 messages 容器内操作，则显示操作按钮
            //     isInMessages = true
            //   }
            // }
            if (PopupCardContainer && selectedText.type === 'Range' && !container.querySelector('.contextBox2')) {
                let contextBox2 = document.createElement('div');
                contextBox2.className = 'contextBox2';
                contextBox2.style.position = 'relative';
                PopupCardContainer.appendChild(contextBox2);
                let range = selectedText.getRangeAt(0);
                react_dom_1.default.render(react_1.default.createElement(userInfo_2.UserInfoContext.Provider, { value: { user: USER_INFO, anki: ANKI_INFO } },
                    react_1.default.createElement(styled_components_1.StyleSheetManager, { target: shadowRoot },
                        react_1.default.createElement(ToolBar, { selectedText: selectedText.getRangeAt(0).getBoundingClientRect(), selectedTextString: selectedTextString, range: range }))), contextBox2);
            }
            // 
        }
    }
    if (!isTextSelected) {
        // 没有选中任何文字
        // 移除快捷按钮
        setTimeout(() => {
            var _a;
            const ShortcutButtonContainer = shadowRoot.querySelector('.' + SHORTCUT_BUTTON_CLASSNAME);
            if (ShortcutButtonContainer) {
                (_a = ShortcutButtonContainer.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(ShortcutButtonContainer);
            }
        }, 10);
    }
    else {
        // 有选中文字
        // 显示快捷按钮
        if (((_b = MyBox === null || MyBox === void 0 ? void 0 : MyBox.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('.' + SHORTCUT_BUTTON_CLASSNAME)) === null && USER_INFO.contextMenu && !isInShadow && !isPin) {
            // 记录最近选中的文字
            // 如果不存在按钮
            let ShortcutButtonContainer = document.createElement('div');
            ShortcutButtonContainer.className = SHORTCUT_BUTTON_CLASSNAME;
            shadowRoot === null || shadowRoot === void 0 ? void 0 : shadowRoot.appendChild(ShortcutButtonContainer);
            react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null,
                react_1.default.createElement(styled_components_1.StyleSheetManager, { target: shadowRoot },
                    react_1.default.createElement(ShortcutButton_1.ShortcutButton, { position: {
                            x: event.pageX + 10,
                            y: event.pageY + 10
                        }, handleShortcutButtonClick: (runPrompt) => {
                            var _a, _b;
                            // event.stopPropagation(); // 阻止事件冒泡
                            if (selection) {
                                if (((_a = MyBox === null || MyBox === void 0 ? void 0 : MyBox.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.' + CONTAINER_CLASSNAME)) === null) {
                                    // 如果不存在 PopupCard
                                    container = document.createElement('div');
                                    container.className = CONTAINER_CLASSNAME;
                                    shadowRoot === null || shadowRoot === void 0 ? void 0 : shadowRoot.appendChild(container);
                                }
                                // const newSelection = window.getSelection();
                                const selection = getSelection(isInShadow);
                                const newSelection = selection === null || selection === void 0 ? void 0 : selection.selection;
                                // 重新选中划词区域
                                if (lastSelection) {
                                    console.log('===============');
                                    // 创建一个范围对象
                                    const newRange = document.createRange();
                                    const anchorNode = lastSelection.anchorNode;
                                    const focusNode = lastSelection.focusNode;
                                    console.log(lastSelection);
                                    if (anchorNode && focusNode) {
                                        // 使用保存的 selected Range 恢复
                                        newRange.setStart(anchorNode, lastSelection === null || lastSelection === void 0 ? void 0 : lastSelection.anchorOffset);
                                        newRange.setEnd(focusNode, lastSelection === null || lastSelection === void 0 ? void 0 : lastSelection.focusOffset);
                                        // 获取 Selection 对象
                                        // 移除所有现有的选择
                                        newSelection.removeAllRanges();
                                        // 添加新的选区
                                        newSelection.addRange(range);
                                    }
                                }
                                // 移除快捷按钮
                                const ShortcutButtonContainer = shadowRoot.querySelector('.' + SHORTCUT_BUTTON_CLASSNAME);
                                if (ShortcutButtonContainer) {
                                    (_b = ShortcutButtonContainer.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(ShortcutButtonContainer);
                                }
                                // 显示窗口
                                showPopupCard({ 'keyWord': selection === null || selection === void 0 ? void 0 : selection.keyWord, 'Sentence': selection.sentence }, newSelection, container, shadowRoot, isPin, runPrompt);
                            }
                        } }))), ShortcutButtonContainer);
        }
    }
};
const getSelection = (isInShadow) => {
    let selection;
    if (isInShadow) {
        selection = shadowRoot.getSelection();
    }
    else {
        selection = window.getSelection();
    }
    if (selection !== null && selection.rangeCount > 0) {
        // 当前选中的文字
        let keyWord = selection.toString().trim();
        let sentence = '';
        let parentNode = selection.focusNode.parentNode;
        // 如果选中的是一个更小的元素（如<em>），我们需要向上寻找
        while (parentNode.tagName && (!isBlockLevel((parentNode.tagName || undefined).toLowerCase()) && (parentNode.tagName || undefined).toLowerCase() !== 'body')) {
            parentNode = parentNode.parentNode;
        }
        let sentences = splitIntoSentences(parentNode);
        let range = selection.getRangeAt(0);
        let startOffsetShift = 3;
        let endOffsetShift = 3;
        if (range.startOffset >= 1) {
            const charBefore = range.startContainer.textContent[range.startOffset - 1];
            startOffsetShift = /[。.！!?？]/.test(charBefore) ? 0 : 3;
        }
        if (range.endOffset < range.endContainer.textContent.length - 1) {
            const charAfter = range.endContainer.textContent[range.endOffset];
            endOffsetShift = /[。.！!?？]/.test(charAfter) ? 0 : 3;
        }
        if (range.endOffset === 0 || isInShadow) {
            endOffsetShift = 0;
        }
        let expandedRange = range.cloneRange(); // 复制当前选中的范围对象
        // expandRange的范围前后各移动3个字符（如果可以的话）
        try {
            expandedRange.setStart(range.startContainer, Math.max(range.startOffset - startOffsetShift, 0));
            expandedRange.setEnd(range.endContainer, Math.min(range.endOffset + endOffsetShift, range.endContainer.textContent.length - 1));
        }
        catch (error) {
            console.log(error);
        }
        // 获取包括关键词前后字符的字符串
        let expandedSelectedText = expandedRange.toString();
        for (let s of sentences) {
            if (s.includes(expandedSelectedText)) {
                sentence = s;
                break;
            }
        }
        if (sentence === '') {
            sentence = selection.anchorNode.data;
        }
        // console.log({ 'selection': selection, 'keyWord': keyWord, 'sentence': sentence });
        return { 'selection': selection, 'keyWord': keyWord, 'sentence': sentence };
    }
    else {
        return null;
    }
    // 拆分文本为句子的函数
    function splitIntoSentences(node) {
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = node.innerHTML;
        let plainText = tempDiv.innerText;
        // 对英文和日语的处理
        let sentences = plainText.split(/[。.！!?？]/);
        // 删除空句子
        sentences = sentences.filter((sentence) => sentence.trim() !== "");
        return sentences;
    }
    function isBlockLevel(tagName) {
        const blockLevelElements = [
            'address', 'article', 'aside', 'blockquote', 'canvas', 'dd', 'div', 'dl',
            'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2',
            'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'li', 'main', 'nav', 'noscript',
            'ol', 'output', 'p', 'pre', 'section', 'table', 'thead', 'tr', 'ul'
        ];
        return blockLevelElements.includes(tagName.toLowerCase());
    }
};
const setAnkiSpace = (range, selectedText, event, isAddNew) => {
    let span = document.createElement('span');
    const ankiSpace = container.getElementsByClassName('ankiSpace');
    // 获取当前最大的 index
    let maxIndex = 0;
    for (let i = 0; i < ankiSpace.length; i++) {
        const thisIndex = Number(ankiSpace[i].getAttribute('data-index'));
        if (thisIndex > maxIndex) {
            maxIndex = thisIndex;
        }
    }
    let number = maxIndex === 0 ? 1 : maxIndex;
    if (isAddNew) {
        number = maxIndex + 1;
    }
    span.textContent = '{{c' + number + '::' + selectedText + '}}';
    span.className = 'ankiSpace';
    span.setAttribute('data-index', number.toString());
    span.onclick = function () {
        var _a;
        // 恢复为默认样式
        // span.innerText
        if (span.textContent) {
            // let oldText = span.textContent
            // oldText = oldText.replace('{{c1::', '')
            // oldText = oldText.replace('}}', '')
            var textNode = document.createTextNode(selectedText);
            (_a = span.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(textNode, span);
        }
    };
    range === null || range === void 0 ? void 0 : range.deleteContents();
    range === null || range === void 0 ? void 0 : range.insertNode(span);
};
const StyledButton = styled_components_2.default.button `
    
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: default;
    padding: 2px;
    

    &:hover {
      background-color: rgba(0,0,59,0.051);
      border-radius: 2px;
    }

    ${props => props.$disable && (0, styled_components_2.css) `
      opacity: 0.5;
      cursor: help;
    `}

    // ${props => !props.$disable && (0, styled_components_2.css) `
    //   cursor: default;
    // `}


`;
const IconButton = styled_components_2.default.button `
    
    width: 16px;
    height: 16px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: default;

    &:hover {
      opacity: 0.8;
    }
`;
function ToolBar(props) {
    const [showMenu, setShowMenu] = (0, react_1.useState)(true);
    const ContextBox = (0, react_1.useRef)(null);
    const userInfo = (0, userInfo_1.useUserInfoContext)();
    // let portFromMenu: any
    (0, react_1.useEffect)(() => {
        const contextBox = ContextBox.current;
        const popupCard = container.querySelector('#LearningEnglish2023');
        const PopupCardContainer = container.getElementsByClassName(CONTAINER_CLASSNAME)[0];
        const messagesBox = container.querySelector('.messages');
        //设置按钮的位置
        const selectedTextX = props.selectedText.x;
        const selectedTextY = props.selectedText.y;
        const selectedTextWidth = props.selectedText.width;
        const selectedTextHeight = props.selectedText.height;
        const buttonX = (contextBox === null || contextBox === void 0 ? void 0 : contextBox.getBoundingClientRect().x) || 0;
        const buttonY = (contextBox === null || contextBox === void 0 ? void 0 : contextBox.getBoundingClientRect().y) || 0;
        // 最大 X 值
        const maxX = ((popupCard === null || popupCard === void 0 ? void 0 : popupCard.getBoundingClientRect().width) || 0) - contextBox.getBoundingClientRect().width - 20;
        const messageBoxHeight = messagesBox === null || messagesBox === void 0 ? void 0 : messagesBox.getBoundingClientRect().height;
        const containerBoxHeight = PopupCardContainer === null || PopupCardContainer === void 0 ? void 0 : PopupCardContainer.getBoundingClientRect().height;
        const height = messageBoxHeight > containerBoxHeight ? messageBoxHeight + 60 : containerBoxHeight;
        const minY = 0 - height;
        let left = selectedTextX - buttonX + selectedTextWidth - 60;
        // left = left > maxX ? maxX : left
        left = Math.max(10, Math.min(maxX, left));
        let top = selectedTextY - buttonY - 40;
        // top = top < minY ? minY : top
        top = Math.max(minY, Math.min(60, top));
        // contextBox2!.style.position = 'relative'
        // contextBox!.style.position = 'absolute'
        contextBox.style.left = left.toString() + 'px';
        contextBox.style.top = top.toString() + 'px';
        setShowMenu(true);
    }, []);
    const handleSetAnkiSpaceButtonClick = (event, isAddNew) => {
        setAnkiSpace(props.range, props.selectedTextString, event, isAddNew);
        // ContextBox.current!.parentNode?.removeChild(ContextBox.current!)
        setShowMenu(false);
    };
    const handleFollowUpMenuClick = (event) => {
        var _a;
        const PopupCardContainer = container.getElementsByClassName(CONTAINER_CLASSNAME)[0];
        const messagesBox = container.querySelector('.messages');
        const sentence = getSelection(true);
        const selectedTextX = props.selectedText.x;
        const selectedTextY = props.selectedText.y;
        const selectedTextWidth = props.selectedText.width;
        const selectedTextHeight = props.selectedText.height;
        const followUpMenuBoxX = (messagesBox === null || messagesBox === void 0 ? void 0 : messagesBox.getBoundingClientRect().x) || 0;
        const followUpMenuBoxY = ((messagesBox === null || messagesBox === void 0 ? void 0 : messagesBox.getBoundingClientRect().y) || 0) + ((messagesBox === null || messagesBox === void 0 ? void 0 : messagesBox.getBoundingClientRect().height) || 0);
        const followUpMenuBoxWidth = 140;
        // const followUpMenuBoxHeight = followUpMenuBox?.getBoundingClientRect().height || 0
        const maxX = ((PopupCardContainer === null || PopupCardContainer === void 0 ? void 0 : PopupCardContainer.getBoundingClientRect().width) || 0) - followUpMenuBoxWidth - 10;
        // console.log(maxX);
        // console.log((messagesBox?.getBoundingClientRect().height || 0));
        // console.log(messagesBox?.getBoundingClientRect());
        // console.log(container.getElementsByClassName('followUpMenu')[0].getBoundingClientRect())
        const maxY = (((PopupCardContainer === null || PopupCardContainer === void 0 ? void 0 : PopupCardContainer.getBoundingClientRect().y) || 0) + ((PopupCardContainer === null || PopupCardContainer === void 0 ? void 0 : PopupCardContainer.getBoundingClientRect().height) || 0)) - (((messagesBox === null || messagesBox === void 0 ? void 0 : messagesBox.getBoundingClientRect().y) || 0) + ((messagesBox === null || messagesBox === void 0 ? void 0 : messagesBox.getBoundingClientRect().height) || 0)) - 230;
        const messageBoxHeight = messagesBox === null || messagesBox === void 0 ? void 0 : messagesBox.getBoundingClientRect().height;
        const containerBoxHeight = PopupCardContainer === null || PopupCardContainer === void 0 ? void 0 : PopupCardContainer.getBoundingClientRect().height;
        const height = messageBoxHeight > containerBoxHeight ? messageBoxHeight + 180 : containerBoxHeight;
        const minY = 0 - height + 130;
        let left = (selectedTextX - followUpMenuBoxX + selectedTextWidth - 40);
        let top = (selectedTextY - followUpMenuBoxY - selectedTextHeight);
        // X 坐标的最大最小值
        left = Math.max(10, Math.min(maxX, left));
        // Y 坐标的最大值
        top = Math.max(minY, Math.min(maxY, top));
        setShowMenu(false);
        // 取消文字选中，避免意外弹出菜单栏
        (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
        try {
            webextension_polyfill_1.default.runtime.sendMessage({
                type: 'UPDATE_POPUP_CARD', payload: {
                    style: {
                        left: left,
                        top: top,
                    }, followUpData: { keyWord: props.selectedTextString, sentence: sentence === null || sentence === void 0 ? void 0 : sentence.sentence }
                }
            });
        }
        catch (error) {
            // console.log(error);
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null, showMenu && react_1.default.createElement("div", { ref: ContextBox, className: 'contextBox', style: {
            position: 'absolute'
        } },
        react_1.default.createElement("div", { style: {
                display: "flex",
                flexDirection: "row",
                marginRight: "8px",
                borderRight: "1px solid rgba(5, 5, 5, .12)",
                paddingRight: "18px"
            } },
            react_1.default.createElement(antd_1.Tooltip, { placement: "bottom", title: 'Cloze deletion(same card)', arrow: false },
                react_1.default.createElement(StyledButton, { style: { marginRight: '10px' }, onClick: () => handleSetAnkiSpaceButtonClick(event, false) }, "[...]")),
            react_1.default.createElement(antd_1.Tooltip, { placement: "bottom", title: 'Cloze deletion(new card)', arrow: false },
                react_1.default.createElement(StyledButton, { onClick: () => handleSetAnkiSpaceButtonClick(event, true) }, "[...]+"))),
        react_1.default.createElement("div", null,
            react_1.default.createElement(antd_1.Tooltip, { placement: "bottom", title: 'Pronunciation(⚡Pro)', arrow: false },
                react_1.default.createElement(StyledButton, { "$disable": (userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified) ? false : true, style: {
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '10px'
                    }, onClick: () => __awaiter(this, void 0, void 0, function* () {
                        let lang = yield (0, lang_1.fetchcurrentLanguage)();
                        if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified) {
                            if (lang) {
                                const targetLanguage = lang['target']['id'];
                                (0, util_1.playTextToSpeech)(props.selectedTextString, lang_2.languageCodes[targetLanguage], targetLanguage);
                                setShowMenu(false);
                            }
                        }
                        else {
                            // alert(' You are not Pro')
                        }
                    }) },
                    react_1.default.createElement(icons_1.CustomerServiceOutlined, null)))),
        react_1.default.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            } },
            react_1.default.createElement(antd_1.Tooltip, { placement: "bottom", title: 'Invoke Prompt(⚡Pro)', arrow: false },
                react_1.default.createElement(IconButton, { className: 'lookUpButton', style: {
                        backgroundImage: `url(${icon128_png_1.default})`,
                    }, onClick: handleFollowUpMenuClick }))))));
}
/////////////////////////////////////////////////////////////////////////////////////
// 获取用户信息
thisGetUserInfo();
// 监听页面鼠标抬起事件
document.addEventListener('mouseup', handleMouseup);
// 监听页面鼠标按下事件
document.onmousedown = function (event) {
    var _a, _b;
    const element = event.composedPath()[0];
    if (element instanceof HTMLElement && !element.classList.contains('ShortcutButton') && MyBox !== undefined && MyBox !== null && !isPin && !donotClosePopupCard) {
        // 如果点击的不是快捷按钮、插件窗口及其子元素，则关闭窗口
        if (MyBox !== event.target && !MyBox.contains(event.target)) {
            // 隐藏窗口
            // console.log('隐藏窗口')
            (_a = container.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(container);
            // document.removeEventListener('selectionchange', handleSelectionchange);
            // document.removeEventListener('mouseup', handleMouseup);
            port.postMessage({ 'type': 'StopTheConversation', 'messages': '' });
        }
    }
    const contextBox = container.getElementsByClassName('contextBox2')[0];
    // 点击插件窗口且不是 ToolBar
    const isInShadow = MyBox === event.target || (MyBox === null || MyBox === void 0 ? void 0 : MyBox.contains(event.target));
    const isInToolBar = contextBox === event.composedPath()[0] || (contextBox === null || contextBox === void 0 ? void 0 : contextBox.contains(event.composedPath()[0]));
    if (isInShadow && !isInToolBar) {
        // 隐藏 ToolBar
        if (contextBox) {
            // 点击的不是 setAnkiSpaceButton 时才隐藏
            if (contextBox !== event.target && !contextBox.contains(event.target)) {
                (_b = contextBox.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(contextBox);
            }
        }
    }
};
// document.addEventListener('selectionchange', handleSelectionchange);


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

/***/ "./src/lib/userInfo.ts":
/*!*****************************!*\
  !*** ./src/lib/userInfo.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useUserInfoContext = exports.UserInfoContext = void 0;
const react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
exports.UserInfoContext = (0, react_1.createContext)(null);
const useUserInfoContext = () => (0, react_1.useContext)(exports.UserInfoContext);
exports.useUserInfoContext = useUserInfoContext;


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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,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");

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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/contentScript/index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztXQ2hEQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvQ29tcG9uZW50cy9DdXN0b21Qcm9tcHRGb3JtLnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Db21wb25lbnRzL0Ryb3Bkb3duTWVudUl0ZW0udHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbXBvbmVudHMvSW1hZ2VzLnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Db21wb25lbnRzL05hdi50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvUG9wdXBDYXJkL01lc3NhZ2UudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC9Qcm9tcHRMaXN0LnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvUmVnZW5lcmF0ZUJ1dHRvbi50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvUG9wdXBDYXJkL1NlbGVjdGlvbi50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvUG9wdXBDYXJkL1VzZXJNZXNzYWdlSW5wdXQudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC9pbmRleC50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvUG9wdXBDYXJkL3N0eWxlLnRzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC91dGlsLnRzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2NvbnRlbnRTY3JpcHQvU2hvcnRjdXRCdXR0b24udHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2NvbnRlbnRTY3JpcHQvaW5kZXgudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2xpYi9sb2NhbGUudHMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvbGliL3VzZXJJbmZvLnRzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2Fzc2V0cy9pY29uMTI4LnBuZyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9hc3NldHMvc2V0dGluZ0d1aWRlLnBuZyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jcmVhdGUgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXJtb255IG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DdXN0b21Qcm9tcHRGb3JtID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmZ1bmN0aW9uIEN1c3RvbVByb21wdEZvcm0ocHJvcHMpIHtcbiAgICBjb25zdCBbZm9ybV0gPSBhbnRkXzEuRm9ybS51c2VGb3JtKCk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIC8vIOabtOaWsCBpbnB1dCDmlofmnKzmoYbnmoTpu5jorqTlgLxcbiAgICAgICAgZm9ybS5zZXRGaWVsZHNWYWx1ZSh7XG4gICAgICAgICAgICB0aXRsZTogcHJvcHMuZGF0YS50aXRsZSxcbiAgICAgICAgICAgIGdldFVuc3BsYXNoSW1hZ2VzOiBwcm9wcy5kYXRhLmdldFVuc3BsYXNoSW1hZ2VzLFxuICAgICAgICAgICAgdXNlclByb21wdDogcHJvcHMuZGF0YS51c2VyUHJvbXB0XG4gICAgICAgIH0pO1xuICAgIH0sIFtwcm9wcy5kYXRhXSk7XG4gICAgLy8g5L+d5a2YIFByb21wdFxuICAgIGNvbnN0IHNhdmVQcm9tcHQgPSAodmFsdWVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOWFs+mXreihqOWNlVxuICAgICAgICBwcm9wcy5vcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogZmFsc2UsIGRhdGE6IHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9IH0pO1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpO1xuICAgICAgICAvLyDojrflj5blt7Lkv53lrZjnmoQgUHJvbXB0IExpc3RcbiAgICAgICAgY29uc3QgcHJvbXB0TGlzdCA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7IFwicHJvbXB0TGlzdFwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5wcm9tcHRMaXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IG5ld1Byb21wdHMgPSBwcm9tcHRMaXN0O1xuICAgICAgICAvLyDlpoLmnpwgcHJvcHMg5Lit5YyF5ZCrIElE77yM5YiZ6K+05piO5b2T5YmN5piv5Zyo57yW6L6RIFByb21wdCDogIzkuI3mmK/mlrDlop4gUHJvbXB0XG4gICAgICAgIGlmIChwcm9wcy5kYXRhLmlkICE9PSAnJykge1xuICAgICAgICAgICAgLy8g5ZyoIFByb21wdCDorrDlvZXkuK3mib7liLDov5nmnaEgUHJvbXB0XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1Byb21wdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3UHJvbXB0c1tpXVsnaWQnXSA9PT0gcHJvcHMuZGF0YS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyDkv67mlLlcbiAgICAgICAgICAgICAgICAgICAgbmV3UHJvbXB0c1tpXVsndGl0bGUnXSA9IHZhbHVlc1sndGl0bGUnXTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UHJvbXB0c1tpXVsnZ2V0VW5zcGxhc2hJbWFnZXMnXSA9IHZhbHVlc1snZ2V0VW5zcGxhc2hJbWFnZXMnXTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UHJvbXB0c1tpXVsndXNlclByb21wdCddID0gdmFsdWVzWyd1c2VyUHJvbXB0J107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5ld1Byb21wdHMgPSBbT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB2YWx1ZXMpLCB7ICdpZCc6IHRpbWVzdGFtcCB9KSwgLi4ucHJvbXB0TGlzdF07XG4gICAgICAgIH1cbiAgICAgICAgLy8g5bCGIFByb21wdCDkv53lrZjkuIvmnaVcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuc2V0KHtcbiAgICAgICAgICAgIHByb21wdExpc3Q6IG5ld1Byb21wdHMubGVuZ3RoID4gNiA/IG5ld1Byb21wdHMuc3BsaWNlKDAsIDYpIDogbmV3UHJvbXB0cyxcbiAgICAgICAgfSkudGhlbihpdGVtID0+IHtcbiAgICAgICAgICAgIC8vIOWwhiBQcm9tcHQg5Lyg5Zue57uZ54i257uE5Lu277yM5Lul6K6pIFByb21wdCDliJfooaggVUkg6YeN5paw5riy5p+TXG4gICAgICAgICAgICBwcm9wcy5oYW5kbGVQcm9tcHRFZGl0ZWQocHJvcHMuZGF0YS5pZCA9PT0gJycpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGFsZXJ0KCfwn6WyU2F2ZSBmYWlsZWQsIHBvc3NpYmx5IGR1ZSB0byBhIHRvbyBsb25nIFByb21wdC4gWW91IGNhbiBkZWxldGUgb3RoZXIgUHJvbXB0cyBvciBzaG9ydGVuIHRoZSBQcm9tcHQgY2hhcmFjdGVycyBhbmQgdHJ5IGFnYWluLiBcXG4nICsgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyDliKDpmaQgUHJvbXB0XG4gICAgY29uc3QgaGFuZGxlRGVsZXRlQnV0dG9uQ2xpY2sgPSAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOWFs+mXreihqOWNlVxuICAgICAgICBwcm9wcy5vcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogZmFsc2UsIGRhdGE6IHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9IH0pO1xuICAgICAgICAvLyDojrflj5blt7Lkv53lrZjnmoQgUHJvbXB0IExpc3RcbiAgICAgICAgY29uc3QgcHJvbXB0TGlzdCA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7IFwicHJvbXB0TGlzdFwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5wcm9tcHRMaXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IG5ld1Byb21wdHMgPSBwcm9tcHRMaXN0O1xuICAgICAgICAvLyDlnKggUHJvbXB0IOiusOW9leS4reaJvuWIsOi/meadoSBQcm9tcHRcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdQcm9tcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobmV3UHJvbXB0c1tpXVsnaWQnXSA9PT0gcHJvcHMuZGF0YS5pZCkge1xuICAgICAgICAgICAgICAgIC8vIOWIoOmZpFxuICAgICAgICAgICAgICAgIG5ld1Byb21wdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIC8vIOWwhiBQcm9tcHQg5L+d5a2Y5LiL5p2lXG4gICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbXB0TGlzdDogbmV3UHJvbXB0cy5sZW5ndGggPiA2ID8gbmV3UHJvbXB0cy5zcGxpY2UoMCwgNikgOiBuZXdQcm9tcHRzLFxuICAgICAgICAgICAgICAgIH0pLnRoZW4oaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWwhiBQcm9tcHQg5Lyg5Zue57uZ54i257uE5Lu277yM5Lul6K6pIFByb21wdCDliJfooaggVUkg6YeN5paw5riy5p+TXG4gICAgICAgICAgICAgICAgICAgIHByb3BzLmhhbmRsZVByb21wdEVkaXRlZChwcm9wcy5kYXRhLmlkID09PSAnJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH07XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybSwgeyBvbkZpbmlzaDogc2F2ZVByb21wdCwgXG4gICAgICAgICAgICAvLyBsYXlvdXQ9J2hvcml6b250YWwnXG4gICAgICAgICAgICBsYWJlbENvbDoge1xuICAgICAgICAgICAgICAgIHhzOiB7IHNwYW46IDYgfSxcbiAgICAgICAgICAgICAgICBzbTogeyBzcGFuOiA1IH0sXG4gICAgICAgICAgICB9LCBmb3JtOiBmb3JtIH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwidGl0bGVcIiwgbGFiZWw6IFwiVGl0bGVcIiwgcnVsZXM6IFt7IHJlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAnUGxlYXNlIGlucHV0IHlvdXIgdGl0bGUnIH1dIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLklucHV0LCB7IG1heExlbmd0aDogNDAsIG9uS2V5RG93bjogaGFuZGxlS2V5RG93biwgcGxhY2Vob2xkZXI6IFwiSG93IHRvIG5hbWUgdGhlIFByb21wdFwiLCB0eXBlOiBcInRleHRcIiB9KSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IGV4dHJhOiBcIkRpc3BsYXkgSW1hZ2VzIFJlbGF0ZWQgdG8gdGhlIFNlbGVjdGVkIFRleHRcIiwgbmFtZTogXCJnZXRVbnNwbGFzaEltYWdlc1wiLCBsYWJlbDogXCJJbWFnZXNcIiwgdmFsdWVQcm9wTmFtZTogXCJjaGVja2VkXCIgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuU3dpdGNoLCBudWxsKSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwidXNlclByb21wdFwiLCBsYWJlbDogXCJQcm9tcHRcIiwgZXh0cmE6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYCR7J3tzZWxlY3Rpb259J306IFNlbGVjdGVkIHRleHRgLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJyXCIsIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICBgJHsne3NlbnRlbmNlfSd9OiBTZW50ZW5jZSBjb250YWluaW5nIHRoZSBzZWxlY3RlZCB0ZXh0YCxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJiclwiLCBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI0YwOEEyNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiAoKSA9PiB3aW5kb3cub3BlbignaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9EeW5hbWljLVBsYWNlaG9sZGVycy01ZjA3MDUxNjNmZjY0MGFmYmRkNTc3MTE1ZGM5NTc3OT9wdnM9NCcpIH0sIFwiTGVhcm4gTW9yZVwiKSksIHJ1bGVzOiBbeyByZXF1aXJlZDogdHJ1ZSwgbWVzc2FnZTogJ1BsZWFzZSBpbnB1dCB5b3VyIHByb21wdCcgfV0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuSW5wdXQuVGV4dEFyZWEsIHsgcGxhY2Vob2xkZXI6IFwiVHJhbnNsYXRlIHtzZWxlY3Rpb259IHRvIENoaW5lc2VcIiwgb25LZXlEb3duOiBoYW5kbGVLZXlEb3duLCByb3dzOiA0LCBtYXhMZW5ndGg6IDMwMDAgfSkpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBzdHlsZTogeyBtYXJnaW46ICcwJyB9IH0sXG4gICAgICAgICAgICAgICAgcHJvcHMuZGF0YS5pZCAhPT0gJycgJiYgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICcxMnB4J1xuICAgICAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiBoYW5kbGVEZWxldGVCdXR0b25DbGljaywgZGFuZ2VyOiB0cnVlIH0sIFwiRGVsZXRlXCIpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHsgbWluV2lkdGg6ICcxMjBweCcgfSwgdHlwZTogXCJwcmltYXJ5XCIsIGh0bWxUeXBlOiBcInN1Ym1pdFwiIH0sIFwiU2F2ZVwiKSkpKSk7XG59XG5leHBvcnRzLkN1c3RvbVByb21wdEZvcm0gPSBDdXN0b21Qcm9tcHRGb3JtO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRHJvcGRvd25NZW51SXRlbSA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi9Qb3B1cENhcmQvdXRpbFwiKTtcbmNvbnN0IERyb3Bkb3duTWVudSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQHJhZGl4LXVpL3JlYWN0LWRyb3Bkb3duLW1lbnVcIikpO1xuY29uc3QgcmVhY3RfaWNvbnNfMSA9IHJlcXVpcmUoXCJAcmFkaXgtdWkvcmVhY3QtaWNvbnNcIik7XG5mdW5jdGlvbiBEcm9wZG93bk1lbnVJdGVtKHByb3BzKSB7XG4gICAgY29uc3QgW2lzSG92ZXJlZCwgc2V0SXNIb3ZlcmVkXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgfSk7XG4gICAgY29uc3Qgb25TZWxlY3QgPSAoKSA9PiB7XG4gICAgICAgIHByb3BzLm9uU2VsZWN0KCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVFZGl0UHJvbXB0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBwcm9wcy5oYW5kbGVFZGl0UHJvbXB0KCk7XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5JdGVtLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnNnB4JyxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzRweCcsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcycHgnXG4gICAgICAgIH0sIGNsYXNzTmFtZTogXCJEcm9wZG93bk1lbnVJdGVtXCIsIG9uTW91c2VFbnRlcjogKCkgPT4gc2V0SXNIb3ZlcmVkKHRydWUpLCBvbk1vdXNlTGVhdmU6ICgpID0+IHNldElzSG92ZXJlZChmYWxzZSksIG9uU2VsZWN0OiBvblNlbGVjdCB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgIGZsZXg6ICcxJyxcbiAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnXG4gICAgICAgICAgICB9IH0sIHByb3BzLmNoaWxkcmVuKSxcbiAgICAgICAgaXNIb3ZlcmVkICYmXG4gICAgICAgICAgICAocHJvcHMuZGF0YS5pZCA9PT0gJ0RlZmF1bHQnID9cbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IG9uQ2xpY2s6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cub3BlbignaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9XaGF0LWlzLXRoZS1kZWZhdWx0LVByb21wdC1Qcm9tcHQtNWI1NWUzZmMzMDNkNDI1ZjhjY2ExNmQ1YmVlMTllN2MnKTtcbiAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF9pY29uc18xLlF1ZXN0aW9uTWFya0NpcmNsZWRJY29uLCBudWxsKSlcbiAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgIHByb3BzLmRhdGEuaWQgPT09IHV0aWxfMS5kaWN0aW9uYXJ5UHJvbXB0LmlkID9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgb25DbGljazogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cub3BlbignaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9PbmxpbmUtRGljdGlvbmFyeS00MzczNzUyN2RjMTM0YmNlYjJkNDBlZDc5YmUxZTBlMz9wdnM9NCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF9pY29uc18xLlF1ZXN0aW9uTWFya0NpcmNsZWRJY29uLCBudWxsKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IG9uQ2xpY2s6IGhhbmRsZUVkaXRQcm9tcHQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfaWNvbnNfMS5QZW5jaWwySWNvbiwgbnVsbCkpKSkpO1xufVxuZXhwb3J0cy5Ecm9wZG93bk1lbnVJdGVtID0gRHJvcGRvd25NZW51SXRlbTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkltYWdlcyA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCBpY29uc18xID0gcmVxdWlyZShcIkBhbnQtZGVzaWduL2ljb25zXCIpO1xuY29uc3QgUHJvVGFnXzEgPSByZXF1aXJlKFwiLi9Qcm9UYWdcIik7XG5jb25zdCB1c2VySW5mb18xID0gcmVxdWlyZShcIi4uL2xpYi91c2VySW5mb1wiKTtcbmNvbnN0IHJlYWN0X3NwcmluZ18xID0gcmVxdWlyZShcInJlYWN0LXNwcmluZ1wiKTtcbmZ1bmN0aW9uIEltYWdlcyhwcm9wcykge1xuICAgIC8vIGNvbnN0IFtpbWFnZXMsIHNldEltYWdlc10gPSB1c2VTdGF0ZTxBcnJheTxJbWFnZVR5cGU+PihbXSk7XG4gICAgY29uc3QgW2ltYWdlSW5kZXgsIHNldEltYWdlSW5kZXhdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKDApO1xuICAgIGNvbnN0IFtzaG93Q29udHJvbCwgc2V0U2hvd0NvbnRyb2xdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbY2hhbmdlSW1hZ2UsIHNldENoYW5nZUltYWdlU3RhdHVzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3QgW2ltYWdlc0xvYWRpbmcsIHNldEltYWdlc0xvYWRpbmddID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHRydWUpO1xuICAgIC8vIGNvbnN0IFtzZWFyY2hJbWFnZUlzTG9hZGluZywgc2V0U2VhcmNoSW1hZ2VJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gICAgY29uc3QgdXNlckluZm8gPSAoMCwgdXNlckluZm9fMS51c2VVc2VySW5mb0NvbnRleHQpKCk7XG4gICAgLy8gY29uc3QgW2N1cnJlbnRVUkwsIHNldEN1cnJlbnRVUkxdID0gdXNlU3RhdGU8c3RyaW5nPigpO1xuICAgIGNvbnN0IGlucHV0RWxlbWVudCA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3QgaW1hZ2VCb3hFbGVtZW50ID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICBjb25zdCBjb21wb3NpbmcgPSAoMCwgcmVhY3RfMS51c2VSZWYpKGZhbHNlKTtcbiAgICBjb25zdCBoYW5kbGVDb21wb3NpdGlvblN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICBjb21wb3NpbmcuY3VycmVudCA9IHRydWU7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVDb21wb3NpdGlvbkVuZCA9ICgpID0+IHtcbiAgICAgICAgY29tcG9zaW5nLmN1cnJlbnQgPSBmYWxzZTtcbiAgICB9O1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAvLyBzZXRJbWFnZXMocHJvcHMuaW1hZ2VzKVxuICAgICAgICBzZXRJbWFnZXNMb2FkaW5nKGZhbHNlKTtcbiAgICB9LCBbcHJvcHMuaW1hZ2VzXSk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coaW5wdXRFbGVtZW50KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coaW5wdXRFbGVtZW50LmN1cnJlbnQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpbnB1dEVsZW1lbnQuY3VycmVudD8uaW5wdXQpO1xuICAgICAgICBpZiAodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpIHtcbiAgICAgICAgICAgIChfYSA9IGlucHV0RWxlbWVudC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH0sIFtjaGFuZ2VJbWFnZV0pO1xuICAgIGNvbnN0IGhhbmRsZUVkaXRJbWFnZXNDbGljayA9ICgpID0+IHtcbiAgICAgICAgc2V0Q2hhbmdlSW1hZ2VTdGF0dXModHJ1ZSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVTZWFyY2hJbnB1dCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVNlYXJjaEJ0bkNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHNldEltYWdlSW5kZXgoMCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpIHtcbiAgICAgICAgICAgIGxldCBpbnB1dFZhbHVlID0gKF9iID0gKF9hID0gaW5wdXRFbGVtZW50LmN1cnJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pbnB1dCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnZhbHVlO1xuICAgICAgICAgICAgaWYgKGlucHV0VmFsdWUgJiYgaW5wdXRWYWx1ZSAhPT0gJycgJiYgIWNvbXBvc2luZy5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgc2V0SW1hZ2VzTG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgICAgICAvLyDmkJzntKLlm77niYdcbiAgICAgICAgICAgICAgICBwcm9wcy5nZXRVbnNwbGFzaEltYWdlcyhpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZXRDaGFuZ2VJbWFnZVN0YXR1cyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgLy8gYW1wbGl0dWRlLnRyYWNrKCdoYW5kbGVTZWFyY2hJbWFnZScpO1xuICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAnaGFuZGxlU2VhcmNoSW1hZ2UnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoJ1BsZWFzZSBhY3RpdmF0ZSBQcm8nKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlR2VuZXJhdGlvbnNJbWFnZXMgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgc2V0SW1hZ2VJbmRleCgwKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmICh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCkge1xuICAgICAgICAgICAgbGV0IGlucHV0VmFsdWUgPSAoX2IgPSAoX2EgPSBpbnB1dEVsZW1lbnQuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlucHV0KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudmFsdWU7XG4gICAgICAgICAgICBpZiAoaW5wdXRWYWx1ZSAmJiBpbnB1dFZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHNldEltYWdlc0xvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgICAgICAgLy8g55Sf5oiQ5Zu+54mHXG4gICAgICAgICAgICAgICAgcHJvcHMuZ2VuZXJhdGlvbnNJbWFnZXMoaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgc2V0Q2hhbmdlSW1hZ2VTdGF0dXMoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAnaGFuZGxlR2VuZXJhdGlvbnNJbWFnZXMnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoJ1BsZWFzZSBhY3RpdmF0ZSBQcm8nKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlSW1hZ2VzQ2xpY2sgPSAob2Zmc2V0KSA9PiB7XG4gICAgICAgIHNldEltYWdlSW5kZXgoaW5kZXggPT4ge1xuICAgICAgICAgICAgaW5kZXggPSBpbmRleCArIG9mZnNldDtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSBwcm9wcy5pbWFnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gcHJvcHMuaW1hZ2VzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBhbXBsaXR1ZGUudHJhY2soJ2hhbmRsZUNoYW5nZUltYWdlJyk7XG4gICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAnaGFuZGxlQ2hhbmdlSW1hZ2UnIH0pO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlSW1hZ2VzQm94SG92ZXIgPSAoZSkgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBpZiAoZS50eXBlID09PSAnbW91c2VlbnRlcicpIHtcbiAgICAgICAgICAgIHNldFNob3dDb250cm9sKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLnR5cGUgPT09ICdtb3VzZWxlYXZlJykge1xuICAgICAgICAgICAgLy8g5pi+56S65Zu+54mH5pCc57Si5qGG5pe25LiN6Ieq5Yqo6ZqQ6JeP5o6n5Lu2XG4gICAgICAgICAgICBpZiAoIWNoYW5nZUltYWdlIHx8ICgoX2IgPSAoX2EgPSBpbnB1dEVsZW1lbnQuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlucHV0KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudmFsdWUpID09PSAnJykge1xuICAgICAgICAgICAgICAgIHNldFNob3dDb250cm9sKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzZXRDaGFuZ2VJbWFnZVN0YXR1cyhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzZXRTaG93Q29udHJvbCh0cnVlKVxuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBhbmltYXRpb25TdHlsZSA9ICgwLCByZWFjdF9zcHJpbmdfMS51c2VTcHJpbmcpKHtcbiAgICAgICAgZnJvbTogeyB0cmFuc2Zvcm06ICdyb3RhdGUoMGRlZyknIH0sXG4gICAgICAgIHRvOiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgzNjBkZWcpJyB9LFxuICAgICAgICBjb25maWc6IHsgZHVyYXRpb246IDEwMDAgfSxcbiAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgd2lkdGg6ICczMnB4JyxcbiAgICAgICAgaGVpZ2h0OiAnMzJweCcsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCByZWQnXG4gICAgfSk7XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbWFnZXNcIiwgcmVmOiBpbWFnZUJveEVsZW1lbnQsIHN0eWxlOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcwJyxcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzE4cHgnXG4gICAgICAgIH0gfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgb25Nb3VzZUVudGVyOiBoYW5kbGVJbWFnZXNCb3hIb3Zlciwgb25Nb3VzZUxlYXZlOiBoYW5kbGVJbWFnZXNCb3hIb3ZlciB9LFxuICAgICAgICAgICAgICAgIGltYWdlc0xvYWRpbmcgJiZcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiKDAsIDAsIDAsMC41KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogJzknXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF9zcHJpbmdfMS5hbmltYXRlZC5kaXYsIHsgc3R5bGU6IGFuaW1hdGlvblN0eWxlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5Mb2FkaW5nT3V0bGluZWQsIG51bGwpKSksXG4gICAgICAgICAgICAgICAgcHJvcHMuaW1hZ2VzLmxlbmd0aCA+IDAgP1xuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbWFnZUJveFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkltYWdlLCB7IFwiZGF0YS1kb3dubG9hZGxvY2F0aW9uXCI6IHByb3BzLmltYWdlc1tpbWFnZUluZGV4XS5saW5rcy5kb3dubG9hZF9sb2NhdGlvbiwgc3JjOiBwcm9wcy5pbWFnZXNbaW1hZ2VJbmRleF0udXJscy5zbWFsbCwgYWx0OiBwcm9wcy5pbWFnZXNbaW1hZ2VJbmRleF1bJ2Rlc2NyaXB0aW9uJ10sIGhlaWdodDogMjQwLCB3aWR0aDogJzEwMCUnLCBwcmV2aWV3OiBmYWxzZSwgcGxhY2Vob2xkZXI6IHRydWUgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiaW1hZ2VRdWV1ZVwiLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sIHByb3BzLmltYWdlcy5tYXAoaW1nID0+IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsga2V5OiBpbWcuaWQsIHNyYzogaW1nLnVybHMuc21hbGwgfSkpKSlcbiAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcyNDBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMDYpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRW1wdHksIHsgc3R5bGU6IHsgbWFyZ2luOiAnMCBhdXRvJyB9LCBkZXNjcmlwdGlvbjogJ05vIHJlbGF0ZWQgcGljdHVyZXMgZm91bmQnLCBpbWFnZTogYW50ZF8xLkVtcHR5LlBSRVNFTlRFRF9JTUFHRV9TSU1QTEUgfSkpLFxuICAgICAgICAgICAgICAgIHNob3dDb250cm9sICYmICFpbWFnZXNMb2FkaW5nICYmXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICc1MCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMCAycHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYXJvdW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzhweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1hcmdpbjogJzBweCAxOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgzNjBkZWcsIHJnYmEoMCwgMCwgMCwgMCkgMCUsIHJnYmEoMCwgMCwgMCwgMC4xKSAyNy42JSwgcmdiYSgwLCAwLCAwLCAwLjIpIDU0LjY5JSwgcmdiYSgwLCAwLCAwLCAwLjM1KSAxMDAlKSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sIGNoYW5nZUltYWdlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmmL7npLrlm77niYfmkJzntKLmjqfku7ZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcycHggMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IGZsZXg6ICcxJywgbWFyZ2luUmlnaHQ6ICcyMHB4JyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuSW5wdXQsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpID09PSBmYWxzZSA/ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSknIDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogJzJweCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBzdWZmaXg6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFByb1RhZ18xLlByb1RhZywgbnVsbCksIGRpc2FibGVkOiAhKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSwgcGxhY2Vob2xkZXI6IFwiU2VhcmNoIGltYWdlc1wiLCBvbktleURvd246IGhhbmRsZVNlYXJjaElucHV0LCBvbkNvbXBvc2l0aW9uU3RhcnQ6IGhhbmRsZUNvbXBvc2l0aW9uU3RhcnQsIG9uQ29tcG9zaXRpb25FbmQ6IGhhbmRsZUNvbXBvc2l0aW9uRW5kLCBzaXplOiBcInNtYWxsXCIsIHJlZjogaW5wdXRFbGVtZW50LCBvblByZXNzRW50ZXI6IGhhbmRsZVNlYXJjaEJ0bkNsaWNrIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlRvb2x0aXAsIHsgcGxhY2VtZW50OiBcImJvdHRvbVwiLCB0aXRsZTogJ1NlYXJjaCBJbWFnZXMo4o+OKScsIGFycm93OiBmYWxzZSwgZ2V0UG9wdXBDb250YWluZXI6ICgpID0+IGltYWdlQm94RWxlbWVudC5jdXJyZW50IHx8IGRvY3VtZW50LmJvZHkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IGRpc2FibGVkOiAhKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSwgdHlwZTogXCJ0ZXh0XCIsIHNpemU6IFwic21hbGxcIiwgc3R5bGU6IHsgY29sb3I6ICcjZmZmJywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCBtYXJnaW5SaWdodDogJzEwcHgnLCBvcGFjaXR5OiAhKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSA/ICcwLjcnIDogJzEnIH0sIG9uQ2xpY2s6IGhhbmRsZVNlYXJjaEJ0bkNsaWNrLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLlNlYXJjaE91dGxpbmVkLCBudWxsKSB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuVG9vbHRpcCwgeyBwbGFjZW1lbnQ6IFwiYm90dG9tXCIsIHRpdGxlOiAnR2VuZXJhdGUgSW1hZ2VzIHdpdGggQUknLCBhcnJvdzogZmFsc2UsIGdldFBvcHVwQ29udGFpbmVyOiAoKSA9PiBpbWFnZUJveEVsZW1lbnQuY3VycmVudCB8fCBkb2N1bWVudC5ib2R5IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBkaXNhYmxlZDogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCksIHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIHN0eWxlOiB7IGNvbG9yOiAnI2ZmZicsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgbWFyZ2luUmlnaHQ6ICcxMHB4Jywgb3BhY2l0eTogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCkgPyAnMC43JyA6ICcxJyB9LCBvbkNsaWNrOiBoYW5kbGVHZW5lcmF0aW9uc0ltYWdlcywgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5UaHVuZGVyYm9sdE91dGxpbmVkLCBudWxsKSB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIHN0eWxlOiB7IGNvbG9yOiAnI2ZmZicsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9LCBvbkNsaWNrOiAoKSA9PiBzZXRDaGFuZ2VJbWFnZVN0YXR1cyhmYWxzZSksIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuQ2xvc2VPdXRsaW5lZCwgbnVsbCkgfSkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4R3JvdzogJ2luaGVyaXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5pbWFnZXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdHlwZTogXCJ0ZXh0XCIsIHNpemU6IFwic21hbGxcIiwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5MZWZ0T3V0bGluZWQsIG51bGwpLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVDaGFuZ2VJbWFnZXNDbGljaygtMSkgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnNDBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICc1MDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMCA0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sIGltYWdlSW5kZXggKyAxICsgJy8nICsgcHJvcHMuaW1hZ2VzLmxlbmd0aCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdHlwZTogXCJ0ZXh0XCIsIHNpemU6IFwic21hbGxcIiwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5SaWdodE91dGxpbmVkLCBudWxsKSwgb25DbGljazogKCkgPT4gaGFuZGxlQ2hhbmdlSW1hZ2VzQ2xpY2soMSkgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3ctcmV2ZXJzZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiAnMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyB0eXBlOiBcInRleHRcIiwgc2l6ZTogXCJzbWFsbFwiLCBzdHlsZTogeyBjb2xvcjogJyNmZmYnLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfSwgb25DbGljazogKCkgPT4gaGFuZGxlRWRpdEltYWdlc0NsaWNrKCksIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuRm9ybU91dGxpbmVkLCBudWxsKSB9KSkpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5pbWFnZXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImltYWdlU291cmNlXCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiAnMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnZmxleC1lbmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcwLjkwZW0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOCknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzhweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6ICc0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogJ25vcm1hbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U2hhZG93OiAnMnB4IDJweCA1cHggcmdiYSgwLCAwLCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sIHByb3BzLmltYWdlc1tpbWFnZUluZGV4XS50eXBlID09PSAnYWknID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLCBcIlBob3RvIGJ5IEFJXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBob3RvIGJ5IFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IHN0eWxlOiB7IHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJywgcGFkZGluZzogJzAgMnB4JyB9LCB0YXJnZXQ6ICdfYmxhbmsnLCBocmVmOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL0BcIiArIHByb3BzLmltYWdlc1tpbWFnZUluZGV4XS51c2VyLnVzZXJuYW1lICsgXCI/dXRtX3NvdXJjZT1TY291dGVyJnV0bV9tZWRpdW09cmVmZXJyYWxcIiB9LCBwcm9wcy5pbWFnZXNbaW1hZ2VJbmRleF0udXNlci5uYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBvbiBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBzdHlsZTogeyB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsIHBhZGRpbmc6ICcwIDJweCcgfSwgdGFyZ2V0OiAnX2JsYW5rJywgaHJlZjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS8/dXRtX3NvdXJjZT1TY291dGVyJnV0bV9tZWRpdW09cmVmZXJyYWxcIiB9LCBcIlVuc3BsYXNoXCIpKSkpKSkpKTtcbn1cbmV4cG9ydHMuSW1hZ2VzID0gSW1hZ2VzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTmF2ID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IGxhbmdfMSA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbmNvbnN0IHVzZXJJbmZvXzEgPSByZXF1aXJlKFwiLi4vbGliL3VzZXJJbmZvXCIpO1xuY29uc3QgRHJvcGRvd25NZW51ID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJAcmFkaXgtdWkvcmVhY3QtZHJvcGRvd24tbWVudVwiKSk7XG5jb25zdCBEcm9wZG93bk1lbnVJdGVtXzEgPSByZXF1aXJlKFwiLi9Ecm9wZG93bk1lbnVJdGVtXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uL1BvcHVwQ2FyZC91dGlsXCIpO1xuY29uc3QgcmVhY3RfaWNvbnNfMSA9IHJlcXVpcmUoXCJAcmFkaXgtdWkvcmVhY3QtaWNvbnNcIik7XG4vLyBpbXBvcnQgdHlwZSB7IE1lbnVQcm9wcyB9IGZyb20gJ2FudGQnO1xuY29uc3QgY29udGVudFNjcmlwdF8xID0gcmVxdWlyZShcIi4uL2NvbnRlbnRTY3JpcHRcIik7XG5jb25zdCBpY29uc18xID0gcmVxdWlyZShcIkBhbnQtZGVzaWduL2ljb25zXCIpO1xuY29uc3QgbG9jYWxlXzEgPSByZXF1aXJlKFwiLi4vbGliL2xvY2FsZVwiKTtcbmZ1bmN0aW9uIE5hdihwcm9wcykge1xuICAgIHZhciBfYSwgX2I7XG4gICAgY29uc3QgW2lzUGluLCBzZXRJc1Bpbl0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtjdXJyZW50VVJMLCBzZXRDdXJyZW50VVJMXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgpO1xuICAgIGNvbnN0IFtpc09wZW5Qcm9tcHRNZW51LCBzZXRJc09wZW5Qcm9tcHRNZW51XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3QgZGVmYXVsdFByb21wdCA9ICgwLCByZWFjdF8xLnVzZVJlZikoKTtcbiAgICBjb25zdCBbYWRkVG9BbmtpU3RhdHVzLCBzZXRBZGRUb0Fua2lTdGF0dXNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHsgJ3N0YXR1cyc6ICdub3JtYWwnLCAnbm90ZUlkJzogMCB9KTtcbiAgICAvLyBjb25zdCB7IE9wdGlvbiB9ID0gU2VsZWN0O1xuICAgIGNvbnN0IG5hdkVsZW1lbnQgPSAoMCwgcmVhY3RfMS51c2VSZWYpKG51bGwpO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gKDAsIHVzZXJJbmZvXzEudXNlVXNlckluZm9Db250ZXh0KSgpO1xuICAgIGxldCBMYW5nID0gKDAsIGxvY2FsZV8xLnVzZUN1cnJlbnRMYW5ndWFnZSkoKTtcbiAgICBjb25zdCBjdXJyZW50TGFuZ3VhZ2UgPSBMYW5nWydjdXJyZW50J11bJ25hbWUnXTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgLy8g5b2T5LiN6Ieq5Yqo6Ieq6KGMIFByb21wdO+8jOiHquWKqOaJk+W8gCBQcm9tcHQg6I+c5Y2V5L6b55So5oi36YCJ5oupXG4gICAgICAgIGlmIChwcm9wcy5pc09wZW5NZW51KSB7XG4gICAgICAgICAgICBvbk1lbnVPcGVuQ2hhbmdlKHByb3BzLmlzT3Blbk1lbnUpO1xuICAgICAgICB9XG4gICAgfSwgW3Byb3BzLmlzT3Blbk1lbnVdKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgZGVmYXVsdFByb21wdC5jdXJyZW50ID0gKDAsIHV0aWxfMS5nZXREZWZhdWx0UHJvbXB0KShwcm9wcy5rZXlXb3JkLCBjdXJyZW50TGFuZ3VhZ2UpO1xuICAgICAgICAvLyDorr7nva7mt7vliqDliLAgQW5raSDnmoTmk43kvZznirbmgIFcbiAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHByb3BzLmFkZFRvQW5raVN0YXR1cyk7XG4gICAgfSwgW3Byb3BzLmFkZFRvQW5raVN0YXR1c10pO1xuICAgIGNvbnN0IGhhbmRsZU1lbnVDbGljayA9IChlKSA9PiB7XG4gICAgICAgIGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljayhlLmtleSk7XG4gICAgfTtcbiAgICBsZXQgaXRlbXMgPSBbXTtcbiAgICBpZiAodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLmFua2kuZGVja3MpIHtcbiAgICAgICAgaXRlbXMgPSB1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8uYW5raS5kZWNrcy5tYXAoKGRlY2spID0+IHsgcmV0dXJuIHsgJ2tleSc6IGRlY2ssICdsYWJlbCc6IGRlY2sgfTsgfSk7XG4gICAgfVxuICAgIGNvbnN0IG1lbnVQcm9wcyA9IHtcbiAgICAgICAgaXRlbXMsXG4gICAgICAgIG9uQ2xpY2s6IGhhbmRsZU1lbnVDbGljayxcbiAgICB9O1xuICAgIC8vIC8vIOeCueWHu+S/neWtmOWIsCBBbmtpIOaMiemSrlxuICAgIC8vIGNvbnN0IGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljayA9ICgpID0+IHtcbiAgICAvLyAgICAgcHJvcHMuaGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrKClcbiAgICAvLyB9O1xuICAgIC8vIOa3u+WKoOWIsCBBbmtpXG4gICAgY29uc3QgYWRkVG9BbmtpID0gKGRlY2tOYW1lLCBtb2RlbE5hbWUsIGZyb250LCBiYWNrKSA9PiB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgY29uc3Qga2V5V29yZCA9IHByb3BzLmtleVdvcmQ7XG4gICAgICAgIGNvbnN0IFNlbnRlbmNlID0gcHJvcHMuU2VudGVuY2U7XG4gICAgICAgIGNvbnN0IHdpbmRvd0VsZW1lbnQgPSBwcm9wcy53aW5kb3dFbGVtZW50O1xuICAgICAgICBsZXQgY29udGFpbmVyID0gJyc7XG4gICAgICAgIGxldCBpbWFnZXMgPSAnJztcbiAgICAgICAgbGV0IHVuc3BsYXNoX2Rvd25sb2FkX2xvY2F0aW9uO1xuICAgICAgICBsZXQgc3RjID0ga2V5V29yZC5sZW5ndGggPD0gMjAgPyBTZW50ZW5jZSA6ICcnO1xuICAgICAgICAvLyDovaznp7sgSFRNTCDmoIfnrb7vvIzmjInnhafmma7pgJrlrZfnrKbkuLLlpITnkIZcbiAgICAgICAgc3RjID0gc3RjLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpO1xuICAgICAgICAvLyDlnKjor63looPlj6XlrZDkuK3lsIblhbPplK7lrZfnqoHlh7rmmL7npLpcbiAgICAgICAgc3RjID0gc3RjLnJlcGxhY2UobmV3IFJlZ0V4cChrZXlXb3JkLCAnZycpLCAnPHNwYW4gY2xhc3M9XCJrZXlXb3JkXCI+JyArIGtleVdvcmQgKyAnPC9zcGFuPicpO1xuICAgICAgICBsZXQgU2NvdXRlclNlbGVjdGlvbiA9ICcnO1xuICAgICAgICBpZiAod2luZG93RWxlbWVudCkge1xuICAgICAgICAgICAgLy8g6YCJ5Lit55qE5paH5a2XXG4gICAgICAgICAgICBTY291dGVyU2VsZWN0aW9uID0gKF9hID0gd2luZG93RWxlbWVudCA9PT0gbnVsbCB8fCB3aW5kb3dFbGVtZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3aW5kb3dFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNTY291dGVyU2VsZWN0aW9uJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpWzBdLmlubmVySFRNTDtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdpbmRvd0VsZW1lbnQpO1xuICAgICAgICAgICAgY29udGFpbmVyID0gd2luZG93RWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgICAgICBjb250YWluZXIgPSB3aW5kb3dFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lc3NhZ2VzJylbMF0uaW5uZXJIVE1MO1xuICAgICAgICAgICAgLy8g5aSE55CGIGNvbnRhaW5lciDnmoTlhoXlrrlcbiAgICAgICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhjb250YWluZXIsICd0ZXh0L2h0bWwnKTtcbiAgICAgICAgICAgIGxldCBlbGVtZW50c1RvUmVtb3ZlID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbWFnZVF1ZXVlJyk7XG4gICAgICAgICAgICBsZXQgaW1hZ2VTb3VyY2UgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnLmltYWdlU291cmNlJyk7XG4gICAgICAgICAgICAvLyDliJvlu7rmlrDnmoQgaW1nIOagh+etvlxuICAgICAgICAgICAgLy8g6K6+572u5Zu+54mH55qE5bC65a+444CB5qC35byPXG4gICAgICAgICAgICBpZiAoZG9jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlQm94JykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBpbWcgPSBkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VCb3gnKVswXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF07XG4gICAgICAgICAgICAgICAgaW1nLndpZHRoID0gMDtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWdVcmwgPSBpbWcuc3JjO1xuICAgICAgICAgICAgICAgIGxldCBuZXdJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgICAgIG5ld0ltZy5zcmMgPSBpbWdVcmw7XG4gICAgICAgICAgICAgICAgLy8g6I635Y+W6KaB5pu/5o2i55qEIGRpdlxuICAgICAgICAgICAgICAgIGxldCBkaXYgPSBkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VCb3gnKVswXTtcbiAgICAgICAgICAgICAgICBpZiAoZGl2KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOS9v+eUqOaWsOeahCBpbWcg5qCH562+5pu/5o2iIGRpdlxuICAgICAgICAgICAgICAgICAgICAoX2IgPSBkaXYucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnJlcGxhY2VDaGlsZChuZXdJbWcsIGRpdik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5rKh5pyJ5Zu+54mHXG4gICAgICAgICAgICAgICAgY29uc3QgaW1ncyA9IGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXMnKVswXTtcbiAgICAgICAgICAgICAgICBpZiAoaW1ncykge1xuICAgICAgICAgICAgICAgICAgICAoX2MgPSBpbWdzLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5yZW1vdmVDaGlsZChpbWdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDliKDpmaTpooTliqDovb3nmoTlm77niYdcbiAgICAgICAgICAgIGVsZW1lbnRzVG9SZW1vdmUuZm9yRWFjaChlbCA9PiB7IHZhciBfYTsgcmV0dXJuIChfYSA9IGVsLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVDaGlsZChlbCk7IH0pO1xuICAgICAgICAgICAgLy8g5Yig6Zmk5Zu+54mH5p2l5rqQ5L+h5oGvXG4gICAgICAgICAgICBpbWFnZVNvdXJjZS5mb3JFYWNoKGVsID0+IHsgdmFyIF9hOyByZXR1cm4gKF9hID0gZWwucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZUNoaWxkKGVsKTsgfSk7XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2MuYm9keS5pbm5lckhUTUw7XG4gICAgICAgICAgICAvLyDlpITnkIbmoLflvI/vvIzpgb/lhY0gQW5raSDlhoXmmL7npLrlvILluLhcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lci5yZXBsYWNlKC9zdHlsZT0vZywgJycpO1xuICAgICAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VCb3gnKVswXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VzID0gd2luZG93RWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZUJveCcpWzBdLmlubmVySFRNTDtcbiAgICAgICAgICAgICAgICAvLyDojrflj5YgdW5zcGxhc2hBcGkg55qEIGRvd25sb2FkX2xvY2F0aW9uXG4gICAgICAgICAgICAgICAgdW5zcGxhc2hfZG93bmxvYWRfbG9jYXRpb24gPSAoX2QgPSB3aW5kb3dFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlcycpWzBdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXS5wYXJlbnRFbGVtZW50KSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuZ2V0QXR0cmlidXRlKCdkYXRhLWRvd25sb2FkbG9jYXRpb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGltYWdlcyk7XG4gICAgICAgICAgICAvLyDlpITnkIbmoLflvI/vvIzpgb/lhY0gQW5raSDlhoXmmL7npLrlvILluLhcbiAgICAgICAgICAgIGltYWdlcyA9IGltYWdlcy5yZXBsYWNlKC9zdHlsZT0vZ2ksICcnKTtcbiAgICAgICAgICAgIGltYWdlcyA9IGltYWdlcy5yZXBsYWNlKC93aWR0aC9naSwgJycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNhcmRTdHlsZSA9IGBgO1xuICAgICAgICBjb25zdCB0aGlzTGFuZyA9IGxhbmdfMS5sYW5nO1xuICAgICAgICBsZXQgYXVkaW9VcmwgPSAnaHR0cDovL2RpY3QueW91ZGFvLmNvbS9kaWN0dm9pY2U/dHlwZT0wJmF1ZGlvPSc7XG4gICAgICAgIGxldCBhdWRpbywgZmlsZW5hbWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhdWRpb1VybCA9IHRoaXNMYW5nW0xhbmdbJ3RhcmdldCddWydpZCddXVsnYXVkaW9VUkwnXTtcbiAgICAgICAgICAgIC8vIGZpbGVuYW1lID0gRGF0ZS5ub3coKS50b1N0cmluZygpXG4gICAgICAgICAgICBmaWxlbmFtZSA9ICcnO1xuICAgICAgICAgICAgYXVkaW8gPSBbe1xuICAgICAgICAgICAgICAgICAgICBcInVybFwiOiBhdWRpb1VybCArIGtleVdvcmQsXG4gICAgICAgICAgICAgICAgICAgIFwiZmlsZW5hbWVcIjogXCJTY291dGVyXCIgKyBmaWxlbmFtZSArIFwiLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICBcImZpZWxkc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkZyb250XCJcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgYXVkaW8gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICAvLyDluLjop4TnsbvlnotcbiAgICAgICAgbGV0IGFua2lCYWNrID0gJzxwPiA8YmxvY2txdW90ZT4nICsgc3RjICsgJyDigJTigJQgPGEgaHJlZj1cIicgKyB3aW5kb3cubG9jYXRpb24uaHJlZiArICdcIj5Tb3VyY2U8L2E+PC9ibG9ja3F1b3RlPjwvcD4nICsgY29udGFpbmVyO1xuICAgICAgICBpZiAoa2V5V29yZC5sZW5ndGggPiAyMCkge1xuICAgICAgICAgICAgLy8g5aaC5p6c6YCJ5Lit55qE56ym5Y+36ZW/5bqm5aSn5LqOIDIw77yI6K+05piO5piv5Y+l5a2Q77yJ5YiZ5LiN5pi+56S65LiK5LiL5paH5Y+l5a2Q77yM54S25ZCO5bCG5p2l5rqQ6ZO+5o6l5pS+5Yiw5bC+6YOoXG4gICAgICAgICAgICBhbmtpQmFjayA9IGNvbnRhaW5lciArICc8cD48YSBocmVmPVwiJyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgJ1wiPlNvdXJjZTwvYT48L3A+JztcbiAgICAgICAgfVxuICAgICAgICBsZXQgcCA9IHtcbiAgICAgICAgICAgIFwibm90ZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWNrTmFtZVwiOiBkZWNrTmFtZSxcbiAgICAgICAgICAgICAgICBcIm1vZGVsTmFtZVwiOiBtb2RlbE5hbWUsXG4gICAgICAgICAgICAgICAgXCJmaWVsZHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBbZnJvbnRdOiBrZXlXb3JkLFxuICAgICAgICAgICAgICAgICAgICBbYmFja106IGNhcmRTdHlsZSArIGFua2lCYWNrXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcImF1ZGlvXCI6IGF1ZGlvLFxuICAgICAgICAgICAgICAgIFwidGFnc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiU2NvdXRlclwiXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvLyDlrozlvaLloavnqbrnsbvlnotcbiAgICAgICAgaWYgKFNjb3V0ZXJTZWxlY3Rpb24uaW5kZXhPZignY2xhc3M9XCJhbmtpU3BhY2VcIicpID49IDAgfHwgY29udGFpbmVyLmluZGV4T2YoJ2NsYXNzPVwiYW5raVNwYWNlXCInKSA+PSAwIHx8IGNvbnRhaW5lci5pbmRleE9mKCd7e2MnKSA+PSAwKSB7XG4gICAgICAgICAgICBsZXQgbmV3RnJvbnQ7XG4gICAgICAgICAgICBuZXdGcm9udCA9ICc8cD4nICsgU2NvdXRlclNlbGVjdGlvbiArICc8L3A+JyArICc8YmxvY2txdW90ZT4nICsgc3RjICsgJyDigJTigJQgPGEgaHJlZj1cIicgKyB3aW5kb3cubG9jYXRpb24uaHJlZiArICdcIj5Tb3VyY2U8L2E+PC9ibG9ja3F1b3RlPicgKyBjb250YWluZXI7XG4gICAgICAgICAgICBpZiAoa2V5V29yZC5sZW5ndGggPiAyMCkge1xuICAgICAgICAgICAgICAgIC8vIOWmguaenOmAieS4reeahOespuWPt+mVv+W6puWkp+S6jiAyMO+8iOivtOaYjuaYr+WPpeWtkO+8ieWImeS4jeaYvuekuuS4iuS4i+aWh+WPpeWtkO+8jOeEtuWQjuWwhuadpea6kOmTvuaOpeaUvuWIsOWwvumDqFxuICAgICAgICAgICAgICAgIG5ld0Zyb250ID0gJzxwPicgKyBTY291dGVyU2VsZWN0aW9uICsgJzwvcD4nICsgY29udGFpbmVyICsgJzxwPiA8YSBocmVmPVwiJyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgJ1wiPlNvdXJjZTwvYT48L3A+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHAgPSB7XG4gICAgICAgICAgICAgICAgXCJub3RlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJkZWNrTmFtZVwiOiBkZWNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJtb2RlbE5hbWVcIjogbW9kZWxOYW1lLFxuICAgICAgICAgICAgICAgICAgICBcImZpZWxkc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBbZnJvbnRdOiBuZXdGcm9udCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtiYWNrXTogJydcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJhdWRpb1wiOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgXCJ0YWdzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiU2NvdXRlclwiXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIOWPkemAgea2iOaBr+e7mSBiYWNrZ3JvdW5kXG4gICAgICAgIGxldCBzZW5kaW5nID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYWRkTm90ZScsICdtZXNzYWdlcyc6IHsgJ2Fua2lfYXJndW1lbnRzJzogcCwgJ2Fua2lfYWN0aW9uX3R5cGUnOiAnYWRkTm90ZScsICd1bnNwbGFzaF9kb3dubG9hZF9sb2NhdGlvbic6IHVuc3BsYXNoX2Rvd25sb2FkX2xvY2F0aW9uIH0sIH0pO1xuICAgICAgICBzZW5kaW5nLnRoZW4oaGFuZGxlUmVzcG9uc2UsIGhhbmRsZUVycm9yKTtcbiAgICAgICAgLy8g5o6l5pS2IGJhY2tncm91bmQg55qE5Zue5aSNXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJlc3BvbnNlKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZXJyb3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ3N1Y2Nlc3MnLCAnbm90ZUlkJzogbWVzc2FnZS5kYXRhIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQobWVzc2FnZS5lcnJvcik7XG4gICAgICAgICAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdub3JtYWwnLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVFcnJvcihlcnJvKSB7XG4gICAgICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJybyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5pWw5o2u5Z+L54K5XG4gICAgICAgIC8vIGFtcGxpdHVkZS50cmFjaygnYWRkVG9BbmtpJyk7XG4gICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAnYWRkVG9BbmtpJyB9KTtcbiAgICB9O1xuICAgIC8vIOeCueWHu+S/neWtmOWIsCBBbmtpXG4gICAgY29uc3QgaGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrID0gKGRlY2spID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCB3aW5kb3dFbGVtZW50ID0gcHJvcHMud2luZG93RWxlbWVudDtcbiAgICAgICAgLy8g5qC55o2u5piv5ZCm5Li65a6M5b2i5aGr56m655Sz6K+35LiN5ZCM55qE5Y2h54mH5qih5p2/XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHdpbmRvd0VsZW1lbnQgPT09IG51bGwgfHwgd2luZG93RWxlbWVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2luZG93RWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZXNzYWdlcycpWzBdLmlubmVySFRNTDtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uVGV4dCA9IChfYSA9IHdpbmRvd0VsZW1lbnQgPT09IG51bGwgfHwgd2luZG93RWxlbWVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2luZG93RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjU2NvdXRlclNlbGVjdGlvbicpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NwYW4nKVswXS5pbm5lckhUTUw7XG4gICAgICAgIGxldCBpc0Fua2lTcGFjZSA9IGZhbHNlO1xuICAgICAgICBpZiAoY29udGFpbmVyIHx8IHNlbGVjdGlvblRleHQpIHtcbiAgICAgICAgICAgIGlmIChjb250YWluZXIuaW5kZXhPZignY2xhc3M9XCJhbmtpU3BhY2VcIicpID49IDAgfHwgY29udGFpbmVyLmluZGV4T2YoJ3t7YycpID49IDAgfHwgc2VsZWN0aW9uVGV4dC5pbmRleE9mKCdjbGFzcz1cImFua2lTcGFjZScpID49IDApIHtcbiAgICAgICAgICAgICAgICBpc0Fua2lTcGFjZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdsb2FkaW5nJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIHNldEFua2lJbmZvKGFua2lJbmZvKSB7XG4gICAgICAgICAgICBjb25zdCBtb2RlbHMgPSBhbmtpSW5mby5tb2RlbHM7XG4gICAgICAgICAgICBsZXQgbW9kZWxOYW1lID0gJycsIGZpZWxkMSA9ICcnLCBmaWVsZDIgPSAnJztcbiAgICAgICAgICAgIG1vZGVscy5mb3JFYWNoKChtb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtb2RlbC5pc0Fua2lTcGFjZSA9PT0gaXNBbmtpU3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxOYW1lID0gbW9kZWwubW9kZWxOYW1lO1xuICAgICAgICAgICAgICAgICAgICBmaWVsZDEgPSBtb2RlbC5maWVsZDE7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkMiA9IG1vZGVsLmZpZWxkMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgJ21vZGVsTmFtZSc6IG1vZGVsTmFtZSxcbiAgICAgICAgICAgICAgICAnZmllbGQxJzogZmllbGQxLFxuICAgICAgICAgICAgICAgICdmaWVsZDInOiBmaWVsZDJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby5hbmtpKSB7XG4gICAgICAgICAgICBjb25zdCB0aGlzRGVjayA9IGRlY2sgPyBkZWNrIDogdXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLmFua2kuZGVmYXVsdERlY2tOYW1lO1xuICAgICAgICAgICAgY29uc3QgYW5raUluZm8gPSBzZXRBbmtpSW5mbyh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8uYW5raSk7XG4gICAgICAgICAgICAvLyDmt7vliqDliLAgQW5raSDkuK1cbiAgICAgICAgICAgIGFkZFRvQW5raSh0aGlzRGVjaywgYW5raUluZm8ubW9kZWxOYW1lLCBhbmtpSW5mby5maWVsZDEsIGFua2lJbmZvLmZpZWxkMik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyDojrflj5YgQW5raSDniYznu4Tkv6Hmga9cbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ3NldE1vZGVsJywgJ21lc3NhZ2VzJzoge30sIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5raUluZm8gPSBzZXRBbmtpSW5mbyhyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoaXNEZWNrID0gZGVjayA/IGRlY2sgOiB1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8uYW5raS5kZWZhdWx0RGVja05hbWU7XG4gICAgICAgICAgICAgICAgICAgIC8vIOa3u+WKoOWIsCBBbmtpIOS4rVxuICAgICAgICAgICAgICAgICAgICBhZGRUb0Fua2kodGhpc0RlY2ssIGFua2lJbmZvLm1vZGVsTmFtZSwgYW5raUluZm8uZmllbGQxLCBhbmtpSW5mby5maWVsZDIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5Y+N6aaI6ZSZ6K+v5L+h5oGvXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KHJlc3VsdC5lcnJvci5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIOeCueWHuyBQaW4g5oyJ6ZKuXG4gICAgY29uc3QgaGFuZGxlUGluQnRuQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGlmIChpc1Bpbikge1xuICAgICAgICAgICAgKDAsIGNvbnRlbnRTY3JpcHRfMS5waW5Qb3B1cENhcmQpKGZhbHNlKTtcbiAgICAgICAgICAgIHNldElzUGluKGZhbHNlKTtcbiAgICAgICAgICAgIC8vIGFtcGxpdHVkZS50cmFjaygncGluUG9wdXBDYXJkJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAoMCwgY29udGVudFNjcmlwdF8xLnBpblBvcHVwQ2FyZCkodHJ1ZSk7XG4gICAgICAgICAgICBzZXRJc1Bpbih0cnVlKTtcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAncGluUG9wdXBDYXJkJyB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8g5ZyoIEFua2kg5Lit5omT5byA56yU6K6wXG4gICAgY29uc3QgZWRpdE5vdGVJbkFua2kgPSAobm90ZUlkKSA9PiB7XG4gICAgICAgIGxldCBzZW5kaW5nID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnZ3VpRWRpdE5vdGUnLCAnbWVzc2FnZXMnOiB7ICdhbmtpX2FjdGlvbl90eXBlJzogJ2d1aUVkaXROb3RlJywgJ2Fua2lfYXJndW1lbnRzJzogeyAnbm90ZSc6IG5vdGVJZCB9LCB9IH0pO1xuICAgICAgICBzZW5kaW5nLnRoZW4oKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgLy9lcnJvclxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vIOaJk+W8gCBQcm9tcHQg57yW6L6R56qX5Y+jXG4gICAgY29uc3Qgb3BlbkN1c3RvbVByb21wdEZvcm0gPSAoZGF0YSkgPT4ge1xuICAgICAgICBwcm9wcy5vcGVuQ3VzdG9tUHJvbXB0Rm9ybShkYXRhKTtcbiAgICAgICAgc2V0SXNPcGVuUHJvbXB0TWVudShmYWxzZSk7XG4gICAgfTtcbiAgICAvLyBQcm9tcHQg6I+c5Y2VIGl0ZW0g54K55Ye7XG4gICAgY29uc3QgaGFuZGxlTWVudUl0ZW1DbGljayA9IChkYXRhKSA9PiB7XG4gICAgICAgIC8vIOesrCAzIOS4quWPguaVsCBmYWxzZSDooajnpLrkuI3ph43mlrDmuLLmn5Plm77niYdcbiAgICAgICAgLy8gLy8g5aaC5p6c5LiK5LiA5LiqIFByb21wdCDmmK/kuI3mmL7npLrlm77niYfvvIzkuJTlvZPliY0gUHJvbXB0IOmcgOimgeaYvuekuuWbvueJh++8jOWImeacrOasoeS7u+WKoemcgOimgea4suafk+WbvueJh++8jOWQpuWImeS4jemHjeaWsOa4suafk+WbvueJh1xuICAgICAgICAvLyBpZiAocHJvcHMubGFzdEV4ZWN1dGVkUHJvbXB0LmdldFVuc3BsYXNoSW1hZ2VzICE9PSB0cnVlICYmIGRhdGEuZ2V0VW5zcGxhc2hJbWFnZXMpIHtcbiAgICAgICAgLy8gICAgIHByb3BzLmhhbmRsZU1lbnVJdGVtQ2xpY2soZGF0YSlcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIHByb3BzLmhhbmRsZU1lbnVJdGVtQ2xpY2soZGF0YSwgdHJ1ZSwgZmFsc2UpXG4gICAgICAgIC8vIH1cbiAgICAgICAgcHJvcHMuaGFuZGxlTWVudUl0ZW1DbGljayhkYXRhKTtcbiAgICB9O1xuICAgIGNvbnN0IG9uTWVudU9wZW5DaGFuZ2UgPSAob3BlbikgPT4ge1xuICAgICAgICAvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBzZXRJc09wZW5Qcm9tcHRNZW51KG9wZW4pO1xuICAgIH07XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Db25maWdQcm92aWRlciwgeyB0aGVtZToge1xuICAgICAgICAgICAgICAgIHRva2VuOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yUHJpbWFyeTogJyNGMDhBMjQnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBcIlNjb3V0ZXJOYXZcIiwgcmVmOiBuYXZFbGVtZW50LCBjbGFzc05hbWU6ICdwLTQnLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnZmxleC1zdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiAnMTJweCcsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdCb3R0b206ICcxMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KScsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAnbW92ZScsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLCB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogOSxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEycHggMThweCdcbiAgICAgICAgICAgICAgICB9LCBvbk1vdXNlRG93bjogcHJvcHMub25Nb3VzZURvd24gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IHpJbmRleDogOSB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5Sb290LCB7IG9wZW46IGlzT3BlblByb21wdE1lbnUsIG1vZGFsOiBmYWxzZSwgb25PcGVuQ2hhbmdlOiBvbk1lbnVPcGVuQ2hhbmdlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnUuVHJpZ2dlciwgeyBhc0NoaWxkOiB0cnVlLCBvbk1vdXNlRW50ZXI6ICgpID0+IHNldElzT3BlblByb21wdE1lbnUodHJ1ZSkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJJY29uQnV0dG9uXCIsIFwiYXJpYS1sYWJlbFwiOiBcIkN1c3RvbWlzZSBvcHRpb25zXCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ljb25zXzEuSGFtYnVyZ2VyTWVudUljb24sIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6ICc0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAnMTcwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgcHJvcHMubGFzdEV4ZWN1dGVkUHJvbXB0LnRpdGxlKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51LlBvcnRhbCwgeyBjb250YWluZXI6IG5hdkVsZW1lbnQuY3VycmVudCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5Db250ZW50LCB7IGNsYXNzTmFtZTogXCJEcm9wZG93bk1lbnVDb250ZW50XCIsIGFsaWduOiAnc3RhcnQnLCBzaWRlT2Zmc2V0OiA1LCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxODBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICdyZ2JhKDAsIDAsIDAsIDAuMDgpIDBweCA2cHggMTZweCAwcHgsIHJnYmEoMCwgMCwgMCwgMC4xMikgMHB4IDNweCA2cHggLTRweCwgcmdiYSgwLCAwLCAwLCAwLjA1KSAwcHggOXB4IDI4cHggOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogJzQwMG1zJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vekFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uOiAnY3ViaWMtYmV6aWVyKDAuMTYsIDEsIDAuMywgMSknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lsbENoYW5nZTogJ3RyYW5zZm9ybSwgb3BhY2l0eSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgb25Nb3VzZUxlYXZlOiAoKSA9PiBzZXRJc09wZW5Qcm9tcHRNZW51KGZhbHNlKSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnVJdGVtXzEuRHJvcGRvd25NZW51SXRlbSwgeyBrZXk6IChfYSA9IGRlZmF1bHRQcm9tcHQuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkLCBkYXRhOiBkZWZhdWx0UHJvbXB0LmN1cnJlbnQsIG9uU2VsZWN0OiAoKSA9PiBoYW5kbGVNZW51SXRlbUNsaWNrKGRlZmF1bHRQcm9tcHQuY3VycmVudCksIGhhbmRsZUVkaXRQcm9tcHQ6ICgpID0+IG9wZW5DdXN0b21Qcm9tcHRGb3JtKHsgaXNPcGVuOiB0cnVlLCBkYXRhOiBkZWZhdWx0UHJvbXB0LmN1cnJlbnQgfSkgfSwgKF9iID0gZGVmYXVsdFByb21wdC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudGl0bGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnVJdGVtXzEuRHJvcGRvd25NZW51SXRlbSwgeyBrZXk6IHV0aWxfMS5kaWN0aW9uYXJ5UHJvbXB0LmlkLCBkYXRhOiB1dGlsXzEuZGljdGlvbmFyeVByb21wdCwgb25TZWxlY3Q6ICgpID0+IGhhbmRsZU1lbnVJdGVtQ2xpY2sodXRpbF8xLmRpY3Rpb25hcnlQcm9tcHQpLCBoYW5kbGVFZGl0UHJvbXB0OiAoKSA9PiBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogdHJ1ZSwgZGF0YTogdXRpbF8xLmRpY3Rpb25hcnlQcm9tcHQgfSkgfSwgdXRpbF8xLmRpY3Rpb25hcnlQcm9tcHQudGl0bGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRGl2aWRlciwgeyBzdHlsZTogeyBtYXJnaW46ICc4cHggMCcgfSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMucHJvbXB0cy5tYXAoaXRlbSA9PiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnVJdGVtXzEuRHJvcGRvd25NZW51SXRlbSwgeyBrZXk6IGl0ZW0uaWQsIGRhdGE6IGl0ZW0sIG9uU2VsZWN0OiAoKSA9PiBoYW5kbGVNZW51SXRlbUNsaWNrKGl0ZW0pLCBoYW5kbGVFZGl0UHJvbXB0OiAoKSA9PiBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogdHJ1ZSwgZGF0YTogaXRlbSB9KSB9LCBpdGVtLnRpdGxlKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5TZXBhcmF0b3IsIHsgY2xhc3NOYW1lOiBcIkRyb3Bkb3duTWVudVNlcGFyYXRvclwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5wcm9tcHRzLmxlbmd0aCA8IDYgPyByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7IG1hcmdpblRvcDogJzRweCcgfSwgc2l6ZTogJ3NtYWxsJywgb25DbGljazogKCkgPT4gb3BlbkN1c3RvbVByb21wdEZvcm0oeyBpc09wZW46IHRydWUsIGRhdGE6IHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9IH0pIH0sIFwiQ3JlYXRlIHByb21wdFwiKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7IG1hcmdpblRvcDogJzRweCcgfSwgc2l6ZTogJ3NtYWxsJywgZGlzYWJsZWQ6IHRydWUgfSwgXCJBdCBtb3N0IDcgUHJvbXB0c1wiKSkpKSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicmlnaHRCdG5Cb3hcIiwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdyaWdodCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2VuZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogJzEwcHgnXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sIGFkZFRvQW5raVN0YXR1cy5zdGF0dXMgPT09ICdzdWNjZXNzJyA/XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkNoZWNrQ2lyY2xlVHdvVG9uZSwgeyB0d29Ub25lQ29sb3I6IFwiIzUyYzQxYVwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIEFkZGVkIHRvIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiBlZGl0Tm90ZUluQW5raS5iaW5kKGV2ZW50LCBhZGRUb0Fua2lTdGF0dXMubm90ZUlkKSB9LCBcIkFua2lcIikpXG4gICAgICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkRyb3Bkb3duLkJ1dHRvbiwgeyBzaXplOiBcInNtYWxsXCIsIG92ZXJsYXlTdHlsZTogeyB3aWR0aDogJzUwJScgfSwgZ2V0UG9wdXBDb250YWluZXI6ICgpID0+IG5hdkVsZW1lbnQuY3VycmVudCwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTMuMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpY29uPXs8UGx1c1NxdWFyZU91dGxpbmVkIC8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogYWRkVG9BbmtpU3RhdHVzLnN0YXR1cyA9PT0gJ3N0YW5kYnknIHx8IGFkZFRvQW5raVN0YXR1cy5zdGF0dXMgPT09ICdsb2FkaW5nJyA/IHRydWUgOiBmYWxzZSwgbWVudTogbWVudVByb3BzLCBvbkNsaWNrOiAoZXZlbnQpID0+IGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljaygpIH0sIGFkZFRvQW5raVN0YXR1cy5zdGF0dXMgPT09ICdsb2FkaW5nJyA/ICdBZGRpbmcuLi4nIDogJ0FkZCB0byBBbmtpJykpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHNpemU6ICdzbWFsbCcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHlwZT0ndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IGlzUGluID8gJyNGMDhBMjQnIDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMy4ycHgnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBpY29uOiBpc1BpbiA/IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuUHVzaHBpbkZpbGxlZCwgeyBjbGFzc05hbWU6ICdpc1BpbicgfSkgOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLlB1c2hwaW5PdXRsaW5lZCwgbnVsbCksIG9uQ2xpY2s6IGhhbmRsZVBpbkJ0bkNsaWNrIH0pKSkpKSk7XG59XG5leHBvcnRzLk5hdiA9IE5hdjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1lc3NhZ2VzTGlzdCA9IHZvaWQgMDtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3Qgc3R5bGVkX2NvbXBvbmVudHNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwic3R5bGVkLWNvbXBvbmVudHNcIikpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCByZWFjdF9pY29uc18xID0gcmVxdWlyZShcIkByYWRpeC11aS9yZWFjdC1pY29uc1wiKTtcbmNvbnN0IHJlYWN0X21hcmtkb3duXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlYWN0LW1hcmtkb3duXCIpKTtcbmNvbnN0IHJlbWFya19icmVha3NfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVtYXJrLWJyZWFrc1wiKSk7XG5jb25zdCByZWh5cGVfcmF3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlaHlwZS1yYXdcIikpO1xuY29uc3QgcmVtYXJrX2dmbV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZW1hcmstZ2ZtXCIpKTtcbmNvbnN0IHNldHRpbmdHdWlkZV9wbmdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vYXNzZXRzL3NldHRpbmdHdWlkZS5wbmdcIikpO1xuY29uc3QgSW1hZ2VzXzEgPSByZXF1aXJlKFwiLi4vQ29tcG9uZW50cy9JbWFnZXNcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xubGV0IEljb25CdXR0b24gPSAoMCwgc3R5bGVkX2NvbXBvbmVudHNfMS5kZWZhdWx0KShhbnRkXzEuQnV0dG9uKSBgXG5cbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cbmA7XG5jb25zdCBNZXNzYWdlQm94ID0gc3R5bGVkX2NvbXBvbmVudHNfMS5kZWZhdWx0LmRpdiBgXG4gICAgXG4gICAgcGFkZGluZzoxOHB4IDA7XG5cbiAgICAmOmhvdmVye1xuICAgICAgICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwwLDAsMC4wNCk7XG4gICAgfVxuICAgIFxuXG5gO1xuZnVuY3Rpb24gTWVzc2FnZShwcm9wcykge1xuICAgIGNvbnN0IFtpbWFnZXMsIHNldEltYWdlc10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoW10pO1xuICAgIGNvbnN0IFttZXNzYWdlSW5kZXgsIHNldE1lc3NhZ2VJbmRleF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkocHJvcHMubWVzc2FnZS5jb250ZW50Lmxlbmd0aCAtIDEpO1xuICAgIGNvbnN0IFtpc01lc3NhZ2VIb3Zlciwgc2V0SXNNZXNzYWdlSG92ZXJdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgc2V0SW1hZ2VzKHByb3BzLm1lc3NhZ2UuaW1hZ2VzKTtcbiAgICAgICAgc2V0TWVzc2FnZUluZGV4KHByb3BzLm1lc3NhZ2UuY29udGVudC5sZW5ndGggPD0gMCA/IDAgOiBwcm9wcy5tZXNzYWdlLmNvbnRlbnQubGVuZ3RoIC0gMSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdtZXNzYWdlSW5kZXg6Jyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2VJbmRleCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByb3BzLm1lc3NhZ2UuY29udGVudCk7XG4gICAgfSwgW3Byb3BzLm1lc3NhZ2VdKTtcbiAgICBjb25zdCBoYW5kbGVNZXNzYWdlSW5kZXhDaGFuZ2UgPSAobikgPT4ge1xuICAgICAgICBsZXQgbmV3SW5kZXggPSBtZXNzYWdlSW5kZXg7XG4gICAgICAgIG5ld0luZGV4ICs9IG47XG4gICAgICAgIGlmIChuZXdJbmRleCA8IDApIHtcbiAgICAgICAgICAgIG5ld0luZGV4ID0gcHJvcHMubWVzc2FnZS5jb250ZW50Lmxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld0luZGV4ID4gcHJvcHMubWVzc2FnZS5jb250ZW50Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIG5ld0luZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBzZXRNZXNzYWdlSW5kZXgobmV3SW5kZXgpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlTWVzc2FnZUhvdmVyID0gKGUpID0+IHtcbiAgICAgICAgaWYgKGUudHlwZSA9PT0gJ21vdXNlbGVhdmUnKSB7XG4gICAgICAgICAgICBzZXRJc01lc3NhZ2VIb3ZlcihmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXRJc01lc3NhZ2VIb3Zlcih0cnVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8gY29uc3QgbGFzdFN0YXR1cyA9IHByb3BzLm1lc3NhZ2UuY29udGVudFtwcm9wcy5tZXNzYWdlLmNvbnRlbnQubGVuZ3RoIC0gMV0uc3RhdHVzXG4gICAgbGV0IGNvbnRlbnQ7XG4gICAgaWYgKG1lc3NhZ2VJbmRleCA+IHByb3BzLm1lc3NhZ2UuY29udGVudC5sZW5ndGggLSAxKSB7XG4gICAgICAgIGNvbnRlbnQgPSBwcm9wcy5tZXNzYWdlLmNvbnRlbnRbcHJvcHMubWVzc2FnZS5jb250ZW50Lmxlbmd0aCAtIDFdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29udGVudCA9IHByb3BzLm1lc3NhZ2UuY29udGVudFttZXNzYWdlSW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnJywgc3R5bGU6IHByb3BzLm1lc3NhZ2Uucm9sZSA9PT0gJ3VzZXInID8geyBiYWNrZ3JvdW5kQ29sb3I6ICcjRjZGNkY2JywgcGFkZGluZ1RvcDogJzJweCcsIHBhZGRpbmdCb3R0b206ICcycHgnIH0gOiB7fSB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuU2tlbGV0b24sIHsgc3R5bGU6IHsgbWFyZ2luOiAnMThweCAwJyB9LCBsb2FkaW5nOiBwcm9wcy5tZXNzYWdlLmNvbnRlbnRbcHJvcHMubWVzc2FnZS5jb250ZW50Lmxlbmd0aCAtIDFdWydzdGF0dXMnXSA9PT0gJ2JlZ2luJyA/IHRydWUgOiBmYWxzZSwgYWN0aXZlOiB0cnVlLCB0aXRsZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHByb3BzLm1lc3NhZ2Uuc2hvd0ltYWdlc0JveCAmJlxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEltYWdlc18xLkltYWdlcywgeyBpbWFnZXM6IGltYWdlcywgZ2V0VW5zcGxhc2hJbWFnZXM6IChrZXlXb3JkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmdldFVuc3BsYXNoSW1hZ2VzKShrZXlXb3JkKS50aGVuKChpbWdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aSE55CG5Zu+54mH55qE5pWw5o2u5qC85byPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0ltYWdlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ3MuZm9yRWFjaCgoaW1nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd1bnNwbGFzaCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaW1nLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNtYWxsOiBpbWcudXJscy5zbWFsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG93bmxvYWRfbG9jYXRpb246IGltZy5saW5rcy5kb3dubG9hZF9sb2NhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBpbWcuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IGltZy51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGltZy51c2VyLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3SW1hZ2VzLnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJbWFnZXMobmV3SW1hZ2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCBnZW5lcmF0aW9uc0ltYWdlczogKGtleVdvcmQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2dlbmVyYXRpb25zSW1hZ2VzJywgJ2RhdGEnOiB7ICdwcm9tcHQnOiBrZXlXb3JkIH0gfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlpITnkIblm77niYfnmoTmlbDmja7moLzlvI9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SW1hZ2VzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2NlZWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhLmRhdGEuZm9yRWFjaCgoaW1nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2FpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaW1nLnVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmxzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNtYWxsOiBpbWcudXJsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3dubG9hZF9sb2NhdGlvbjogJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAnQUknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQUknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ltYWdlcy5wdXNoKG9iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJbWFnZXMobmV3SW1hZ2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEltYWdlcyhbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgnbWVzc2FnZScgaW4gcmVzcG9uc2UuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzcG9uc2UuZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdUaGUgY3VycmVudCBBSSBlbmRwb2ludCBkb2VzIG5vdCBzdXBwb3J0IGltYWdlIGdlbmVyYXRpb24uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSB9KSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VCb3gsIHsgc3R5bGU6IHt9LCBvbk1vdXNlRW50ZXI6IGhhbmRsZU1lc3NhZ2VIb3Zlciwgb25Nb3VzZUxlYXZlOiBoYW5kbGVNZXNzYWdlSG92ZXIgfSxcbiAgICAgICAgICAgICAgICBwcm9wcy5tZXNzYWdlLmNvbnRlbnQubGVuZ3RoID4gMSAmJiBpc01lc3NhZ2VIb3ZlciAmJlxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJy0zMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ2ZpdC1jb250ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6ICc5J1xuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnZml0LWNvbnRlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJ3JnYmEoMCwgMCwgMCwgMC4wOCkgMHB4IDZweCAxNnB4IDBweCwgcmdiYSgwLCAwLCAwLCAwLjEyKSAwcHggM3B4IDZweCAtNHB4LCByZ2JhKDAsIDAsIDAsIDAuMDUpIDBweCA5cHggMjhweCA4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChJY29uQnV0dG9uLCB7IHR5cGU6ICd0ZXh0Jywgc2l6ZTogJ3NtYWxsJywgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfaWNvbnNfMS5DaGV2cm9uTGVmdEljb24sIG51bGwpLCBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVNZXNzYWdlSW5kZXhDaGFuZ2UoLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgbWFyZ2luOiAnMCAycHgnIH0gfSwgbWVzc2FnZUluZGV4ICsgMSArICcvJyArIHByb3BzLm1lc3NhZ2UuY29udGVudC5sZW5ndGgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEljb25CdXR0b24sIHsgdHlwZTogJ3RleHQnLCBzaXplOiAnc21hbGwnLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF9pY29uc18xLkNoZXZyb25SaWdodEljb24sIG51bGwpLCBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVNZXNzYWdlSW5kZXhDaGFuZ2UoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlwUGF0aDogXCJwYXRoKCdNIDAgOCBBIDQgNCAwIDAgMCAyLjgyODQyNzEyNDc0NjE5IDYuODI4NDI3MTI0NzQ2MTkgTCA2LjU4NTc4NjQzNzYyNjkwNSAzLjA3MTA2NzgxMTg2NTQ3NTUgQSAyIDIgMCAwIDEgOS40MTQyMTM1NjIzNzMwOTYgMy4wNzEwNjc4MTE4NjU0NzU1IEwgMTMuMTcxNTcyODc1MjUzODEgNi44Mjg0MjcxMjQ3NDYxOSBBIDQgNCAwIDAgMCAxNiA4IFonKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzE2cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICc4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDE4MGRlZyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICdyZ2JhKDAsIDAsIDAsIDAuMDgpIDBweCA2cHggMTZweCAwcHgsIHJnYmEoMCwgMCwgMCwgMC4xMikgMHB4IDNweCA2cHggLTRweCwgcmdiYSgwLCAwLCAwLCAwLjA1KSAwcHggOXB4IDI4cHggOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJzI2cHgnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9KSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfbWFya2Rvd25fMS5kZWZhdWx0LCB7IHJlbWFya1BsdWdpbnM6IFtyZW1hcmtfYnJlYWtzXzEuZGVmYXVsdCwgcmVtYXJrX2dmbV8xLmRlZmF1bHRdLCByZWh5cGVQbHVnaW5zOiBbcmVoeXBlX3Jhd18xLmRlZmF1bHRdLCBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU6IChfYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeyBub2RlIH0gPSBfYSwgcHJvcHMgPSBfX3Jlc3QoX2EsIFtcIm5vZGVcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyBvdmVyZmxvd1g6ICdzY3JvbGwnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiwgT2JqZWN0LmFzc2lnbih7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnbWF4LWNvbnRlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogJzYyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjY2NjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBwcm9wcykpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGE6IChfYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeyBub2RlIH0gPSBfYSwgcHJvcHMgPSBfX3Jlc3QoX2EsIFtcIm5vZGVcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIE9iamVjdC5hc3NpZ24oeyB0YXJnZXQ6ICdfX2JsYW5rJywgc3R5bGU6IHsgY29sb3I6ICcjRjA4QTI0JyB9IH0sIHByb3BzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgc2tpcEh0bWw6IGZhbHNlLCBjaGlsZHJlbjogY29udGVudFsnY29udGVudCddIH0pLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50WydzdGF0dXMnXSA9PT0gJ2ludmFsaWRfYXBpX2tleScgJiYgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7IHNyYzogc2V0dGluZ0d1aWRlX3BuZ18xLmRlZmF1bHQsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0pKSkpKSkpO1xufVxuO1xuZnVuY3Rpb24gTWVzc2FnZXNMaXN0KHByb3BzKSB7XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ21lc3NhZ2VzJywgc3R5bGU6IHtcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcyJyxcbiAgICAgICAgICAgIHdvcmRXcmFwOiAnYnJlYWstd29yZCcsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc0OHB4J1xuICAgICAgICB9IH0sIHByb3BzLm1lc3NhZ2VzLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoTWVzc2FnZSwgeyBrZXk6IGl0ZW0uY29udGVudFswXS5jaGF0SWQsIG1lc3NhZ2U6IGl0ZW0gfSk7XG4gICAgfSkpKTtcbn1cbmV4cG9ydHMuTWVzc2FnZXNMaXN0ID0gTWVzc2FnZXNMaXN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Qcm9tcHRMaXN0ID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IHN0eWxlZF9jb21wb25lbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInN0eWxlZC1jb21wb25lbnRzXCIpKTtcbmNvbnN0IHVzZXJJbmZvXzEgPSByZXF1aXJlKFwiLi4vbGliL3VzZXJJbmZvXCIpO1xuY29uc3QgUHJvVGFnXzEgPSByZXF1aXJlKFwiLi4vQ29tcG9uZW50cy9Qcm9UYWdcIik7XG5jb25zdCBsb2NhbGVfMSA9IHJlcXVpcmUoXCIuLi9saWIvbG9jYWxlXCIpO1xubGV0IE15QnV0dG9uID0gc3R5bGVkX2NvbXBvbmVudHNfMS5kZWZhdWx0LmJ1dHRvbiBgXG5cbiAgICBwYWRkaW5nOiA2cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBjdXJzb3I6IHVuc2V0O1xuXG4gICAgJjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6I0Y2RjZGNjtcbiAgICB9XG5gO1xuZnVuY3Rpb24gUHJvbXB0QnV0dG9uKHByb3BzKSB7XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChNeUJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICc0cHgnLFxuICAgICAgICAgICAgcG9pbnRlckV2ZW50czogcHJvcHMuZGlzYWJsZSA/ICdub25lJyA6ICdhdXRvJ1xuICAgICAgICB9LCBvbkNsaWNrOiBwcm9wcy5oYW5kbGVNZW51SXRlbUNsaWNrIH0sIHByb3BzLmNoaWxkcmVuKSk7XG59XG5mdW5jdGlvbiBQcm9tcHRMaXN0KHByb3BzKSB7XG4gICAgY29uc3QgUHJvbXB0TGlzdERPTSA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3QgdXNlckluZm8gPSAoMCwgdXNlckluZm9fMS51c2VVc2VySW5mb0NvbnRleHQpKCk7XG4gICAgbGV0IExhbmcgPSAoMCwgbG9jYWxlXzEudXNlQ3VycmVudExhbmd1YWdlKSgpO1xuICAgIGNvbnN0IGN1cnJlbnRMYW5ndWFnZSA9IExhbmdbJ2N1cnJlbnQnXVsnbmFtZSddO1xuICAgIC8vIGNvbnN0IHVzZXJJbmZvID0gdXNlVXNlckluZm9Db250ZXh0KClcbiAgICAvLyBjb25zb2xlLmxvZygndXNlckluZm86Jyk7XG4gICAgLy8gY29uc29sZS5sb2codXNlckluZm8pO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgIH0sIFtwcm9wcy5zaG93Rm9sbG93VXBEYXRhTWVudS5zaG93XSk7XG4gICAgLy8gUHJvbXB0IOiPnOWNlSBpdGVtIOeCueWHu1xuICAgIGNvbnN0IGhhbmRsZU1lbnVJdGVtQ2xpY2sgPSAoZGF0YSkgPT4ge1xuICAgICAgICBpZiAodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpIHtcbiAgICAgICAgICAgIC8vIOesrCAzIOS4quWPguaVsCBmYWxzZSDooajnpLrkuI3ph43mlrDmuLLmn5Plm77niYdcbiAgICAgICAgICAgIHByb3BzLmhhbmRsZU1lbnVJdGVtQ2xpY2soZGF0YSwgJ3llcycsIHRydWUsIHByb3BzLmZvbGxvd1VwRGF0YSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyByZWY6IFByb21wdExpc3RET00sIGNsYXNzTmFtZTogJ2ZvbGxvd1VwTWVudScsIHN0eWxlOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHByb3BzLnNob3dGb2xsb3dVcERhdGFNZW51LnN0eWxlKSwgeyBwb3NpdGlvbjogJ2Fic29sdXRlJywgZGlzcGxheTogXCJmbGV4XCIsIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsIHdpZHRoOiAnMTIwcHgnLCBwYWRkaW5nOiAnMCcgfSkgfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2VuZCcsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogJzhweCcsXG4gICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KScsXG4gICAgICAgICAgICAgICAgY29sb3I6ICcjNjY2J1xuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgc3R5bGU6IHsgZmxleDogJzEnIH0gfSwgXCJQcm9tcHRcIiksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChQcm9UYWdfMS5Qcm9UYWcsIG51bGwpKSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogJzhweCA4cHggNHB4JyxcbiAgICAgICAgICAgICAgICBjdXJzb3I6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpID8gJ25vdC1hbGxvd2VkJyA6ICcnLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpID8gJzAuNycgOiAnMScsXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChQcm9tcHRCdXR0b24sIHsgZGlzYWJsZTogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCksIGhhbmRsZU1lbnVJdGVtQ2xpY2s6ICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcCA9ICgwLCB1dGlsXzEuZ2V0RGVmYXVsdFByb21wdCkocHJvcHMuZm9sbG93VXBEYXRhLmtleVdvcmQsIGN1cnJlbnRMYW5ndWFnZSk7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZU1lbnVJdGVtQ2xpY2socCk7XG4gICAgICAgICAgICAgICAgfSkgfSwgXCJEZWZhdWx0XCIpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvbXB0QnV0dG9uLCB7IGRpc2FibGU6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpLCBoYW5kbGVNZW51SXRlbUNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZU1lbnVJdGVtQ2xpY2sodXRpbF8xLmRpY3Rpb25hcnlQcm9tcHQpO1xuICAgICAgICAgICAgICAgIH0gfSwgdXRpbF8xLmRpY3Rpb25hcnlQcm9tcHQudGl0bGUpLFxuICAgICAgICAgICAgcHJvcHMucHJvbXB0TGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVNZW51SXRlbUNsaWNrKGl0ZW0pfT57aXRlbS50aXRsZX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvbXB0QnV0dG9uLCB7IGtleTogaXRlbS5pZCwgZGlzYWJsZTogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCksIGhhbmRsZU1lbnVJdGVtQ2xpY2s6ICgpID0+IGhhbmRsZU1lbnVJdGVtQ2xpY2soaXRlbSkgfSwgaXRlbS50aXRsZSk7XG4gICAgICAgICAgICB9KSkpKTtcbn1cbmV4cG9ydHMuUHJvbXB0TGlzdCA9IFByb21wdExpc3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUmVnZW5lcmF0ZUJ1dHRvbiA9IHZvaWQgMDtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xuZnVuY3Rpb24gUmVnZW5lcmF0ZUJ1dHRvbihwcm9wcykge1xuICAgIGNvbnN0IGxhc3RNZXNzYWdlID0gcHJvcHMubWVzc2FnZXNbcHJvcHMubWVzc2FnZXMubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgbGFzdE1lc3NhZ2VTdGF0dXMgPSBsYXN0TWVzc2FnZSA/IGxhc3RNZXNzYWdlLmNvbnRlbnRbbGFzdE1lc3NhZ2UuY29udGVudC5sZW5ndGggLSAxXS5zdGF0dXMgOiAnYmVnaW4nO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgcHJvcHMubWVzc2FnZXMubGVuZ3RoID49IDEgJiYgKGxhc3RNZXNzYWdlU3RhdHVzID09PSAnaW52YWxpZF9hcGlfa2V5JyB8fCBsYXN0TWVzc2FnZVN0YXR1cyA9PT0gJ2RvbmUnKSAmJlxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMy4ycHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICc2MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICcxOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCA2cHggMTZweCAwIHJnYmEoMCwgMCwgMCwgMC4wOCksIDAgM3B4IDZweCAtNHB4IHJnYmEoMCwgMCwgMCwgMC4xMiksIDAgOXB4IDI4cHggOHB4IHJnYmEoMCwgMCwgMCwgMC4wNSknXG4gICAgICAgICAgICAgICAgfSwgc2l6ZTogJ3NtYWxsJywgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwcm9wcy5oYW5kbGVSZWdlbmVyYXRlQnV0dG9uQ2xpY2soKTtcbiAgICAgICAgICAgICAgICB9IH0sIFwiUmVnZW5lcmF0ZVwiKSkpKTtcbn1cbmV4cG9ydHMuUmVnZW5lcmF0ZUJ1dHRvbiA9IFJlZ2VuZXJhdGVCdXR0b247XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TZWxlY3Rpb24gPSB2b2lkIDA7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCBsb2NhbGVfMSA9IHJlcXVpcmUoXCIuLi9saWIvbG9jYWxlXCIpO1xuY29uc3QgbGFuZ18xID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xuY29uc3QgaWNvbnNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9pY29uc1wiKTtcbi8vIGNvbnN0IHVzZVN0eWxlcyA9IGNyZWF0ZVVzZVN0eWxlcyh7XG4vLyAgIG1vcmVCdXR0b246IHtcbi8vICAgICBjb2xvcjogJyNGMDhBMjQnLFxuLy8gICAgIFwiJjpob3ZlclwiOiB7XG4vLyAgICAgICBjb2xvcjogJ3JlZCdcbi8vICAgICB9XG4vLyAgIH0sXG4vLyB9KVxuY29uc3Qgc3R5bGUgPSBgXG4gICNTY291dGVyU2VsZWN0aW9uPnNwYW4ge1xuICAgIGZvbnQtc2l0ZToxMnB4O1xuICAgIGNvbG9yOiM2NjY7XG4gIH1cbiAgLm1vcmVCdXR0b24ge1xuICAgIGNvbG9yOiAjRjA4QTI0O1xuICAgIGN1cnNvcjpwb2ludGVyO1xuICAgIG1hcmdpbjowcHggMnB4O1xuICB9XG4gIC5tb3JlQnV0dG9uOmhvdmVyIHtcbiAgICBvcGFjaXR5OjAuODtcbiAgfVxuXG5gO1xuZnVuY3Rpb24gU2VsZWN0aW9uKHByb3BzKSB7XG4gICAgY29uc3QgW3RhcmdldExhbmd1YWdlLCBzZXRUYXJnZXRMYW5ndWFnZV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoJ1VuaXRlZCBTdGF0ZXMnKTtcbiAgICBjb25zdCBbc2hvd0Z1bGxUZXh0LCBzZXRTaG93RnVsbFRleHRdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHRydWUpO1xuICAgIGNvbnN0IFtwbGF5U3RhdHVzLCBzZXRQbGF5U3RhdHVzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3QgbGFzdFNwZWFrVGltZSA9ICgwLCByZWFjdF8xLnVzZVJlZikoTWF0aC5mbG9vcihEYXRlLm5vdygpKSk7XG4gICAgLy8g6I635Y+W55So5oi36K6+572u55qE6K+t6KiA5L+h5oGvXG4gICAgbGV0IExhbmcgPSAoMCwgbG9jYWxlXzEudXNlQ3VycmVudExhbmd1YWdlKSgpO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICBzZXRUYXJnZXRMYW5ndWFnZShMYW5nWyd0YXJnZXQnXVsnaWQnXSk7XG4gICAgICAgIHNldFNob3dGdWxsVGV4dChwcm9wcy50ZXh0Lmxlbmd0aCA8PSAxNDApO1xuICAgICAgICBzZXRQbGF5U3RhdHVzKGZhbHNlKTtcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcihvblN0b3JhZ2VDaGFuZ2UpO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLm9uQ2hhbmdlZC5yZW1vdmVMaXN0ZW5lcihvblN0b3JhZ2VDaGFuZ2UpO1xuICAgICAgICB9O1xuICAgIH0sIFtwcm9wcy50ZXh0XSk7XG4gICAgLy8g6K+t6Z+z5pKt5oqlXG4gICAgY29uc3Qgc3BlYWtlciA9ICgpID0+IHtcbiAgICAgICAgLy8g6K+G5Yir6K+t6KiAXG4gICAgICAgIC8vIGNvbnN0IGxuZ0RldGVjdG9yID0gbmV3IExhbmd1YWdlRGV0ZWN0KCk7XG4gICAgICAgIC8vIGxuZ0RldGVjdG9yLnNldExhbmd1YWdlVHlwZSgnaXNvMicpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGxuZ0RldGVjdG9yLmRldGVjdChwcm9wcy50ZXh0LCAyKSk7XG4gICAgICAgIGlmIChNYXRoLmZsb29yKERhdGUubm93KCkpIC0gbGFzdFNwZWFrVGltZS5jdXJyZW50IDwgMTAwMCkge1xuICAgICAgICAgICAgLy8geCDmr6vnp5LlhoXlj6rlj6/ngrnlh7vkuIDmrKFcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgKDAsIHV0aWxfMS5wbGF5VGV4dFRvU3BlZWNoKShwcm9wcy50ZXh0LCBsYW5nXzEubGFuZ3VhZ2VDb2Rlc1t0YXJnZXRMYW5ndWFnZV0sIHRhcmdldExhbmd1YWdlKTtcbiAgICAgICAgICAgIC8vIHRleHRUb1NwZWVjaERvd25sb2FkKHByb3BzLnRleHQsIGxhbmd1YWdlQ29kZXNbdGFyZ2V0TGFuZ3VhZ2UgYXMga2V5b2YgdHlwZW9mIGxhbmd1YWdlQ29kZXNdKVxuICAgICAgICAgICAgbGFzdFNwZWFrVGltZS5jdXJyZW50ID0gTWF0aC5mbG9vcihEYXRlLm5vdygpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIOaaguWBnOS4iuS4gOasoeaSreaKpeS7u+WKoVxuICAgICAgICAgICAgc3BlZWNoU3ludGhlc2lzLmNhbmNlbCgpO1xuICAgICAgICAgICAgY29uc3QgdXR0ZXJhbmNlID0gbmV3IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZShwcm9wcy50ZXh0KTtcbiAgICAgICAgICAgIC8vIOivreenjVxuICAgICAgICAgICAgdXR0ZXJhbmNlLmxhbmcgPSBsYW5nXzEubGFuZ3VhZ2VDb2Rlc1t0YXJnZXRMYW5ndWFnZV07XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhsYW5ndWFnZUNvZGVzW3RhcmdldExhbmd1YWdlIGFzIGtleW9mIHR5cGVvZiBsYW5ndWFnZUNvZGVzXSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0YXJnZXRMYW5ndWFnZSk7XG4gICAgICAgICAgICAvLyDor63pgJ9cbiAgICAgICAgICAgIGlmIChwbGF5U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgLy8g5Z+65pWw5qyh5pKt5pS+5pe26YeH55So5oWi6YCf5pKt5pS+77yM6K6p55So5oi35Y+v5Lul5ZCs55qE5pu05riF5qWaXG4gICAgICAgICAgICAgICAgdXR0ZXJhbmNlLnJhdGUgPSAwLjY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB1dHRlcmFuY2UucmF0ZSA9IDAuODU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRQbGF5U3RhdHVzKCFwbGF5U3RhdHVzKTtcbiAgICAgICAgICAgIC8vIOW8gOaSreWQp1xuICAgICAgICAgICAgc3BlZWNoU3ludGhlc2lzLnNwZWFrKHV0dGVyYW5jZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYW1wbGl0dWRlLnRyYWNrKCdzcGVhaycpO1xuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ3NwZWFrJyB9KTtcbiAgICB9O1xuICAgIGNvbnN0IG9uU3RvcmFnZUNoYW5nZSA9IChjaGFuZ2VzLCBhcmVhKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNoYW5nZXMpO1xuICAgICAgICAvLyDmm7TmlrDnm67moIfor63oqIBcbiAgICAgICAgaWYgKCd0YXJnZXRMYW5ndWFnZScgaW4gY2hhbmdlcykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2NoYW5nZXMnKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNoYW5nZXNbJ3RhcmdldExhbmd1YWdlJ11bJ25ld1ZhbHVlJ10pO1xuICAgICAgICAgICAgc2V0VGFyZ2V0TGFuZ3VhZ2UoY2hhbmdlc1sndGFyZ2V0TGFuZ3VhZ2UnXVsnbmV3VmFsdWUnXSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVRvZ2dsZVNob3dGdW5UZXh0ID0gKCkgPT4ge1xuICAgICAgICBzZXRTaG93RnVsbFRleHQoIXNob3dGdWxsVGV4dCk7XG4gICAgfTtcbiAgICAvLyBjb25zdCBjbGFzc2VzID0gdXNlU3R5bGVzKClcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiLCBudWxsLCBzdHlsZSksXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgaWQ6IFwiU2NvdXRlclNlbGVjdGlvblwiLCBjbGFzc05hbWU6ICcnLCBzdHlsZToge1xuICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJzE4cHgnLFxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcxLjUnXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICBzaG93RnVsbFRleHQgPyByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHByb3BzLnRleHQpLFxuICAgICAgICAgICAgICAgIHByb3BzLnRleHQubGVuZ3RoID4gMTQwICYmIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGNsYXNzTmFtZTogJ21vcmVCdXR0b24nLCBvbkNsaWNrOiBoYW5kbGVUb2dnbGVTaG93RnVuVGV4dCB9LCBcIkxlc3NcIikpXG4gICAgICAgICAgICAgICAgOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBwcm9wcy50ZXh0LnN1YnN0cmluZygwLCAxNDApICsgJy4uLicpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBjbGFzc05hbWU6ICdtb3JlQnV0dG9uJywgb25DbGljazogaGFuZGxlVG9nZ2xlU2hvd0Z1blRleHQgfSwgXCJNb3JlXCIpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICcycHgnXG4gICAgICAgICAgICAgICAgfSwgc2l6ZTogXCJzbWFsbFwiLCB0eXBlOiBcInRleHRcIiwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5DdXN0b21lclNlcnZpY2VPdXRsaW5lZCwgbnVsbCksIG9uQ2xpY2s6IHNwZWFrZXIgfSkpKSk7XG59XG5leHBvcnRzLlNlbGVjdGlvbiA9IFNlbGVjdGlvbjtcbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlVzZXJNZXNzYWdlSW5wdXQgPSB2b2lkIDA7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IGljb25zXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7XG5jb25zdCByZWFjdF9zcHJpbmdfMSA9IHJlcXVpcmUoXCJyZWFjdC1zcHJpbmdcIik7XG5jb25zdCB7IFRleHRBcmVhIH0gPSBhbnRkXzEuSW5wdXQ7XG5mdW5jdGlvbiBVc2VyTWVzc2FnZUlucHV0KHByb3BzKSB7XG4gICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBwcm9wcy5tZXNzYWdlc1twcm9wcy5tZXNzYWdlcy5sZW5ndGggLSAxXTtcbiAgICAvLyBjb25zdCBsYXN0TWVzc2FnZVN0YXR1cyA9IGxhc3RNZXNzYWdlLmNvbnRlbnRbbGFzdE1lc3NhZ2UuY29udGVudC5sZW5ndGggLSAxXS5zdGF0dXNcbiAgICBjb25zdCBbZm9ybV0gPSBhbnRkXzEuRm9ybS51c2VGb3JtKCk7XG4gICAgY29uc3QgW2lzQW5zd2VySW5wdXRlZCwgc2V0SXNBbnN3ZXJJbnB1dGVkXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgLy8g5paH5pys5qGG5LiL5pWy5Ye75oyJ6ZSu5pe2XG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyDpmLvmraLkuovku7blhpLms6FcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZUtleURvd24nKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMyAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRzID0gcHJvcHMubWVzc2FnZXNbcHJvcHMubWVzc2FnZXMubGVuZ3RoIC0gMV1bJ2NvbnRlbnQnXTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb3BzLm1lc3NhZ2VzKTtcbiAgICAgICAgICAgIC8vIOaVsuWHu+Wbnui9pumUrlxuICAgICAgICAgICAgaWYgKHByb3BzLm1lc3NhZ2VzLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgICAgICAgIChjb250ZW50c1tjb250ZW50cy5sZW5ndGggLSAxXVsnc3RhdHVzJ10gIT09ICdiZWdpbicgJiZcbiAgICAgICAgICAgICAgICAgICAgY29udGVudHNbY29udGVudHMubGVuZ3RoIC0gMV1bJ3N0YXR1cyddICE9PSAncHJvY2VzcycpICYmIGlzQW5zd2VySW5wdXRlZCkge1xuICAgICAgICAgICAgICAgIC8vIOmdnuWKoOi9veeKtuaAgeOAgUdQVCDmtojmga/lj5HpgIHlrozmr5Xml7bnlKjmiLflj6/lj5HpgIHmtojmga9cbiAgICAgICAgICAgICAgICBoYW5kbGVTZW5kTWVzc2FnZSh7ICdtc2cnOiBldmVudC50YXJnZXQudmFsdWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyDmlofmnKzmoYblgLzlj5jljJbml7ZcbiAgICBjb25zdCBvblRleHRBcmVhSW5wdXQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzZXRJc0Fuc3dlcklucHV0ZWQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXRJc0Fuc3dlcklucHV0ZWQoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVTZW5kTWVzc2FnZSA9ICh2YWx1ZXMpID0+IHtcbiAgICAgICAgLy8g5riF56m65paH5pys5qGGXG4gICAgICAgIGZvcm0ucmVzZXRGaWVsZHMoKTtcbiAgICAgICAgLy8g56aB55So5Y+R6YCB5oyJ6ZKuXG4gICAgICAgIHNldElzQW5zd2VySW5wdXRlZChmYWxzZSk7XG4gICAgICAgIC8vIOaJp+ihjOWPkea2iOaBr+S6i+S7tlxuICAgICAgICBwcm9wcy5oYW5kbGVTZW5kTWVzc2FnZSh2YWx1ZXMubXNnKTtcbiAgICB9O1xuICAgIC8vIGNvbnN0IEFuaW1hdGVkQnV0dG9uID0gYW5pbWF0ZWQoQnV0dG9uKTtcbiAgICBjb25zdCBhbmltYXRpb25TdHlsZSA9ICgwLCByZWFjdF9zcHJpbmdfMS51c2VTcHJpbmcpKHtcbiAgICAgICAgZnJvbTogeyB0cmFuc2Zvcm06ICdyb3RhdGUoMGRlZyknIH0sXG4gICAgICAgIHRvOiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgzNjBkZWcpJyB9LFxuICAgICAgICBjb25maWc6IHsgZHVyYXRpb246IDEwMDAgfSxcbiAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgd2lkdGg6ICczMnB4JyxcbiAgICAgICAgaGVpZ2h0OiAnMzJweCcsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCByZWQnXG4gICAgfSk7XG4gICAgY29uc3QgbGFzdFN0YXR1cyA9IGxhc3RNZXNzYWdlID8gbGFzdE1lc3NhZ2UuY29udGVudFtsYXN0TWVzc2FnZS5jb250ZW50Lmxlbmd0aCAtIDFdLnN0YXR1cyA6ICdiZWdpbic7XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ3ctZnVsbCcsIHN0eWxlOiB7IGJvcmRlclRvcDogJzFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNiknIH0gfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0sIHsgZm9ybTogZm9ybSwgb25GaW5pc2g6IGhhbmRsZVNlbmRNZXNzYWdlLCBcbiAgICAgICAgICAgIC8vIG9uS2V5RG93bj17aGFuZGxlRm9ybUtleURvd259XG4gICAgICAgICAgICBsYXlvdXQ6ICdpbmxpbmUnLCBzdHlsZTogeyBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9LCBjbGFzc05hbWU6ICdwLTInIH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwibXNnXCIsIHN0eWxlOiB7IG1hcmdpbjogJzAnLCBmbGV4R3JvdzogJzEnIH0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwgeyBwbGFjZWhvbGRlcjogXCJTZW5kIGEgbWVzc2FnZVwiLCBib3JkZXJlZDogZmFsc2UsIGF1dG9TaXplOiB7IG1pblJvd3M6IDEsIG1heFJvd3M6IDIgfSwgXG4gICAgICAgICAgICAgICAgICAgIC8vIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0Q29sb3I6ICcjRjA4QTI0JyxcbiAgICAgICAgICAgICAgICAgICAgfSwgb25LZXlEb3duOiBoYW5kbGVLZXlEb3duLCBvbklucHV0OiBvblRleHRBcmVhSW5wdXQgfSkpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBzdHlsZTogeyBtYXJnaW5SaWdodDogJzAnIH0gfSwgcHJvcHMubWVzc2FnZXMubGVuZ3RoID09PSAwIHx8IGxhc3RTdGF0dXMgIT09ICdiZWdpbicgJiYgbGFzdFN0YXR1cyAhPT0gJ3Byb2Nlc3MnID9cbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHR5cGU6IFwidGV4dFwiLCBodG1sVHlwZTogXCJzdWJtaXRcIiwgZGlzYWJsZWQ6IHByb3BzLm1lc3NhZ2VzLmxlbmd0aCA+IDAgPyBsYXN0U3RhdHVzID09PSAnYmVnaW4nIHx8IGxhc3RTdGF0dXMgPT09ICdwcm9jZXNzJyB8fCAhaXNBbnN3ZXJJbnB1dGVkIDogZmFsc2UsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbG9yOiAhaXNMb2FkaW5nICYmIGlzQW5zd2VySW5wdXRlZCA/ICcjRjA4QTI0JyA6ICcnXG4gICAgICAgICAgICAgICAgICAgIH0sIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuU2VuZE91dGxpbmVkLCBudWxsKSB9KSA6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgbWFyZ2luUmlnaHQ6ICc4cHgnIH0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF9zcHJpbmdfMS5hbmltYXRlZC5kaXYsIHsgc3R5bGU6IGFuaW1hdGlvblN0eWxlIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuTG9hZGluZ091dGxpbmVkLCBudWxsKSkpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgc3R5bGU6IHsgbWFyZ2luOiAnMCcgfSB9KSkpKTtcbn1cbmV4cG9ydHMuVXNlck1lc3NhZ2VJbnB1dCA9IFVzZXJNZXNzYWdlSW5wdXQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlBvcHVwQ2FyZCA9IHZvaWQgMDtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgdXVpZF8xID0gcmVxdWlyZShcInV1aWRcIik7XG5jb25zdCBjb250ZW50U2NyaXB0XzEgPSByZXF1aXJlKFwiLi4vY29udGVudFNjcmlwdFwiKTtcbmNvbnN0IE5hdl8xID0gcmVxdWlyZShcIi4uL0NvbXBvbmVudHMvTmF2XCIpO1xuY29uc3QgQ3VzdG9tUHJvbXB0Rm9ybV8xID0gcmVxdWlyZShcIi4uL0NvbXBvbmVudHMvQ3VzdG9tUHJvbXB0Rm9ybVwiKTtcbmNvbnN0IE1lc3NhZ2VfMSA9IHJlcXVpcmUoXCIuL01lc3NhZ2VcIik7XG5jb25zdCBQcm9tcHRMaXN0XzEgPSByZXF1aXJlKFwiLi9Qcm9tcHRMaXN0XCIpO1xuY29uc3QgUmVnZW5lcmF0ZUJ1dHRvbl8xID0gcmVxdWlyZShcIi4vUmVnZW5lcmF0ZUJ1dHRvblwiKTtcbmNvbnN0IFVzZXJNZXNzYWdlSW5wdXRfMSA9IHJlcXVpcmUoXCIuL1VzZXJNZXNzYWdlSW5wdXRcIik7XG5jb25zdCBTZWxlY3Rpb25fMSA9IHJlcXVpcmUoXCIuL1NlbGVjdGlvblwiKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgbG9jYWxlXzEgPSByZXF1aXJlKFwiLi4vbGliL2xvY2FsZVwiKTtcbmNvbnN0IHVzZXJJbmZvXzEgPSByZXF1aXJlKFwiLi4vbGliL3VzZXJJbmZvXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IHN0eWxlZF9jb21wb25lbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInN0eWxlZC1jb21wb25lbnRzXCIpKTtcbmxldCBjdXJyZW50TGFuZ3VhZ2U7XG5sZXQgdGFyZ2V0TGFuZ3VhZ2U7XG4vLyDojrflj5YgQW5raSDljaHniYfvvIznlKjkuo7nvJblhpnmlYXkuotcbmxldCBhbmtpQ2FyZHM7XG4oMCwgdXRpbF8xLmdldEFua2lDYXJkcykoKS50aGVuKChjYXJkcykgPT4ge1xuICAgIGFua2lDYXJkcyA9IGNhcmRzO1xufSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coZXJyb3IpO1xufSk7XG4vLyDliJ3lp4vljJYgQW5raSDnmoQgTW9kZWzvvIzkuLrlkI7nu63lr7zlhaXliLAgQW5raSDmj5DpgJ9cbmNvbnN0IHsgVGV4dEFyZWEgfSA9IGFudGRfMS5JbnB1dDtcbi8vIGNvbnN0IEFua2lDb250ZXh0ID0gY3JlYXRlQ29udGV4dChudWxsKTtcbmNvbnN0IFNjb3V0ZXJEaXYgPSBzdHlsZWRfY29tcG9uZW50c18xLmRlZmF1bHQuZGl2IGBcblxubGVmdDoxMDtcbnRvcDoxMDtcblxuZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG53aWR0aDogMzkwcHg7XG5oZWlnaHQ6IDU2MHB4O1xuY29sb3I6IHJnYigwIDAgMCAvIDgwJSk7XG5wb3NpdGlvbjogZml4ZWQ7XG5kaXNwbGF5OiBmbGV4O1xuZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbmZvbnQtc2l6ZTogMTRweDtcbmJhY2tncm91bmQtY29sb3I6ICNmZmY7XG56LWluZGV4OiA5OTk7XG5vdmVyZmxvdzogaGlkZGVuO1xuYm94LXNoYWRvdzogMHB4IDhweCAyOHB4IHJnYmEoMCwwLDAsLjE2KTtcbmJvcmRlci1yYWRpdXM6IDZweDtcbmJvcmRlcjoxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMDYpXG5cbmgxLGgyLGgye1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuaDEge1xuICBmb250LXNpemU6MjBweDtcbn1cblxuaDIge1xuICBmb250LXNpemU6MTdweDtcbn1cblxuYDtcbmZ1bmN0aW9uIFBvcHVwQ2FyZChwcm9wcykge1xuICAgIGNvbnN0IFttZXNzYWdlcywgc2V0TWVzc2FnZXNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKFt7XG4gICAgICAgICAgICAnY29udGVudCc6IFt7XG4gICAgICAgICAgICAgICAgICAgICdzdGF0dXMnOiAnYmVnaW4nLFxuICAgICAgICAgICAgICAgICAgICAnY2hhdElkJzogJycsXG4gICAgICAgICAgICAgICAgICAgICdjb250ZW50JzogJydcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICdyb2xlJzogJ3VzZXInLFxuICAgICAgICAgICAgJ3Byb21wdCc6ICcnLFxuICAgICAgICAgICAgJ3Nob3dJbWFnZXNCb3gnOiB0cnVlLFxuICAgICAgICAgICAgJ2ltYWdlcyc6IFtdXG4gICAgICAgIH1dKTtcbiAgICBjb25zdCBbcHJvbXB0cywgc2V0UHJvbXB0c10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoW10pO1xuICAgIGNvbnN0IFtsYXN0RXhlY3V0ZWRQcm9tcHQsIHNldExhc3RFeGVjdXRlZFByb21wdF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoeyAndGl0bGUnOiAn8J+RifCfj7wgUGxlYXNlIGNob29zZSBhIHByb21wdCcsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9KTtcbiAgICBjb25zdCBbaXNPcGVuTWVudSwgc2V0SXNPcGVuTWVudV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtpc1BvcG92ZXJPcGVuLCBzZXRQb3BvdmVyT3Blbl0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtjdXN0b21Qcm9tcHRGb3JtRGF0YSwgc2V0Q3VzdG9tUHJvbXB0Rm9ybURhdGFdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9KTtcbiAgICAvLyBzdGFuZGJ5LG5vcm1hbCxsb2FkaW5nLHN1Y2Nlc3NcbiAgICBjb25zdCBbYWRkVG9BbmtpU3RhdHVzLCBzZXRBZGRUb0Fua2lTdGF0dXNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHsgJ3N0YXR1cyc6ICdub3JtYWwnLCAnbm90ZUlkJzogMCB9KTtcbiAgICBjb25zdCBbZm9sbG93VXBEYXRhLCBzZXRGb2xsb3dVcERhdGFdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHsga2V5V29yZDogJycsIHNlbnRlbmNlOiAnJyB9KTtcbiAgICBjb25zdCBbc2hvd0ZvbGxvd1VwRGF0YU1lbnUsIHNldFNob3dGb2xsb3dVcERhdGFNZW51XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7IHNob3c6IGZhbHNlLCBzdHlsZToge30gfSk7XG4gICAgLy8g56qX5Y+j5ouW5ou96YC76L6RXG4gICAgY29uc3QgW2RyYWdnaW5nLCBzZXREcmFnZ2luZ10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IHdpbmRvd0VsZW1lbnQgPSAoMCwgcmVhY3RfMS51c2VSZWYpKG51bGwpO1xuICAgIGNvbnN0IG1lc3NhZ2VzTGlzdCA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3Qgc2hvdWxkU3RheUF0Qm90dG9tUmVmID0gKDAsIHJlYWN0XzEudXNlUmVmKShmYWxzZSk7XG4gICAgLy8gY29uc3QgdXNlckluZm9SZWYgPSB1c2VSZWYoKTtcbiAgICBjb25zdCBsYXN0UHJvbXB0UmVmID0gKDAsIHJlYWN0XzEudXNlUmVmKSgpO1xuICAgIGNvbnN0IFtmb3JtXSA9IGFudGRfMS5Gb3JtLnVzZUZvcm0oKTtcbiAgICBjb25zdCB1c2VySW5mbyA9ICgwLCB1c2VySW5mb18xLnVzZVVzZXJJbmZvQ29udGV4dCkoKTtcbiAgICBsZXQgTGFuZyA9ICgwLCBsb2NhbGVfMS51c2VDdXJyZW50TGFuZ3VhZ2UpKCk7XG4gICAgY3VycmVudExhbmd1YWdlID0gTGFuZ1snY3VycmVudCddWyduYW1lJ107XG4gICAgdGFyZ2V0TGFuZ3VhZ2UgPSBMYW5nWyd0YXJnZXQnXVsnbmFtZSddO1xuICAgIC8vIOaOp+WItui/vemXruiPnOWNlVxuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygn5o6n5Yi26L+96Zeu6I+c5Y2VJyk7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgcG9ydCA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5jb25uZWN0KHtcbiAgICAgICAgICAgIG5hbWU6ICdmcm9tUG9wdXBDYXJkJ1xuICAgICAgICB9KTtcbiAgICAgICAgcG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1zZykgPT4ge1xuICAgICAgICAgICAgaWYgKG1zZy50eXBlID09PSBcIlVQREFURV9QT1BVUF9DQVJEXCIpIHtcbiAgICAgICAgICAgICAgICAvLyDmmL7npLogUHJvbXB0IOiPnOWNlVxuICAgICAgICAgICAgICAgIHNldEZvbGxvd1VwRGF0YShtc2cucGF5bG9hZC5mb2xsb3dVcERhdGEpO1xuICAgICAgICAgICAgICAgIC8v6K6+572u6I+c5Y2V55qE5L2N572uXG4gICAgICAgICAgICAgICAgc2V0U2hvd0ZvbGxvd1VwRGF0YU1lbnUocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IG1zZy5wYXlsb2FkLnN0eWxlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgKF9hID0gd2luZG93RWxlbWVudC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2FyZENsaWNrKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1c2VFZmZlY3QgcmV0dXJuJyk7XG4gICAgICAgICAgICAoX2EgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDYXJkQ2xpY2spO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGVQb3B1cENhcmRDbGljaygpIHtcbiAgICAgICAgICAgIC8vIOW9k+i/vemXruiPnOWNleaYvuekuuaXtu+8jOeCueWHu+eql+WPo+WFs+mXreiPnOWNlVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNob3dGb2xsb3dVcERhdGFNZW51LnNob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0ZvbGxvd1VwRGF0YU1lbnUocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICB9XG4gICAgfSwgW3Nob3dGb2xsb3dVcERhdGFNZW51XSk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIC8vIOa4suafkyBQcm9tcHQg5YiX6KGoXG4gICAgICAgIGluaXRpYWxpemVQcm9tcHRMaXN0KCk7XG4gICAgICAgIC8vIOmHjeWkjea3u+WKoOWIsCBBbmtpIOaMiemSrueahOeKtuaAgVxuICAgICAgICAvLyBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pXG4gICAgICAgIGlmIChwcm9wcy5ydW5Qcm9tcHQgfHwgcHJvcHMucnVuUHJvbXB0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIOiOt+WPluacgOi/keS4gOasoeaJp+ihjOeahCBQcm9tcHRcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5nZXQoeyBcImxhc3RFeGVjdXRlZFByb21wdFwiOiAnJyB9KS50aGVuKChpdGVtKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGFzdEV4ZWN1dGVkUHJvbXB0ID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDmiafooYzpu5jorqQgUHJvbXB044CB6I635Y+WIFVuc3BsYXNoIOWbvueJh1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3JtcHQgPSB5aWVsZCAoMCwgdXRpbF8xLmdldEluaXRpYWxQcm9tcHQpKHByb3BzLmRhdGEua2V5V29yZCwgY3VycmVudExhbmd1YWdlKTtcbiAgICAgICAgICAgICAgICAgICAgZXhlY3V0aXZlUHJvbXB0KHBvcm1wdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyDmiafooYwgUHJvbXB044CB6I635Y+WIFVuc3BsYXNoIOWbvueJh1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5sYXN0RXhlY3V0ZWRQcm9tcHQuaWQgPT09IFwiRGVmYXVsdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3JtcHQgPSB5aWVsZCAoMCwgdXRpbF8xLmdldEluaXRpYWxQcm9tcHQpKHByb3BzLmRhdGEua2V5V29yZCwgY3VycmVudExhbmd1YWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWN1dGl2ZVByb21wdChwb3JtcHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhlY3V0aXZlUHJvbXB0KGl0ZW0ubGFzdEV4ZWN1dGVkUHJvbXB0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIOS4jeaJp+ihjOS7u+S9lSBQcm9tcHTvvIznlLHnlKjmiLfoh6rooYzpgInmi6lcbiAgICAgICAgICAgIGV4ZWN1dGl2ZVByb21wdCh7ICd0aXRsZSc6ICdEZWZhdWx0JywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogdHJ1ZSwgJ3VzZXJQcm9tcHQnOiBgV29yZDpcInt7a2V5V29yZH19XCIsIHNlbnRlbmNlOiBcInt7c2VudGVuY2V9fVwiYCwgJ2lkJzogJ0RlZmF1bHQnIH0sICdubycpO1xuICAgICAgICAgICAgLy8gc2V0SXNPcGVuTWVudSh0cnVlKVxuICAgICAgICB9XG4gICAgICAgIC8vIOiuvue9rueql+WPo+eahOm7mOiupOS9jee9ruOAgea3u+WKoOa7muWKqOS6i+S7tu+8jOiuqea2iOaBr+WIl+ihqOiHquWKqOa7muWKqOWIsOW6lemDqFxuICAgICAgICAoMCwgdXRpbF8xLndpbmRvd0luaXRpYWxpemF0aW9uKSh7ICdpc1Bpbic6IHByb3BzLmlzUGluLCAnd2luZG93RWxlbWVudCc6IHdpbmRvd0VsZW1lbnQsICdzZWxlY3Rpb24nOiBwcm9wcy5zZWxlY3Rpb24sICdtZXNzYWdlc0xpc3QnOiBtZXNzYWdlc0xpc3QgfSk7XG4gICAgfSwgW3Byb3BzLmRhdGEua2V5V29yZF0pO1xuICAgIC8vIOiBiuWkqeiusOW9leaUueWPmOaXtlxuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAvLyDorrDlvZXlvZPliY3liJfooajnmoTkvY3nva5cbiAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQuY3VycmVudCkge1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2luZG93RWxlbWVudC5jdXJyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250YWluZXInKVswXTtcbiAgICAgICAgICAgIHNob3VsZFN0YXlBdEJvdHRvbVJlZi5jdXJyZW50ID0gY29udGFpbmVyLnNjcm9sbEhlaWdodCAtIGNvbnRhaW5lci5zY3JvbGxUb3AgPD0gY29udGFpbmVyLmNsaWVudEhlaWdodCArIDIwO1xuICAgICAgICAgICAgY29uc3QgY29udGVudExlbmd0aCA9IG1lc3NhZ2VzLmxlbmd0aCA+IDAgPyBtZXNzYWdlc1ttZXNzYWdlcy5sZW5ndGggLSAxXS5jb250ZW50Lmxlbmd0aCA6IDA7XG4gICAgICAgICAgICAvLyDoh6rliqjmu5rliqjliLDmtojmga/lupXpg6jvvIzmlrnkvr/nnIvliLDmnIDmlrDnmoTmloflrZdcbiAgICAgICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2VzW21lc3NhZ2VzLmxlbmd0aCAtIDFdLmNvbnRlbnRbY29udGVudExlbmd0aCAtIDFdLnN0YXR1cyA9PT0gJ3Byb2Nlc3MnIHx8IG1lc3NhZ2VzW21lc3NhZ2VzLmxlbmd0aCAtIDFdLmNvbnRlbnRbY29udGVudExlbmd0aCAtIDFdLnN0YXR1cyA9PT0gJ2JlZ2luJykge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb0JvdHRvbSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvQm90dG9tKHNob3VsZFN0YXlBdEJvdHRvbVJlZi5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgLy8gICBpZiAoY29udGFpbmVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGNoZWNrSWZTaG91bGRTdGF5QXRCb3R0b20pO1xuICAgICAgICAgICAgLy8gICB9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICAgICAgLy8g5L+d5a2Y5Y6G5Y+y6K6w5b2V77yM5Y+q5L+d55WZ5raI5oGv6K6w5b2V55qE56ysIDEg5p2h77yM5aaC5p6c6L+Z5p2h5raI5aSx5piv6ZSZ6K+v5o+Q56S677yM5YiZ5LiN5L+d5a2YXG4gICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPT09IDEgJiYgbWVzc2FnZXNbMF1bJ2NvbnRlbnQnXVttZXNzYWdlc1swXVsnY29udGVudCddLmxlbmd0aCAtIDFdWydzdGF0dXMnXSA9PT0gJ2RvbmUnKSB7XG4gICAgICAgICAgICAoKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB5aWVsZCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuZ2V0KHsgXCJoaXN0b3J5XCI6IFtdLCBcImxhc3RFeGVjdXRlZFByb21wdFwiOiAnJyB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlXb3JkID0gcHJvcHMuZGF0YS5rZXlXb3JkO1xuICAgICAgICAgICAgICAgIGNvbnN0IFNlbnRlbmNlID0gcHJvcHMuZGF0YS5TZW50ZW5jZTtcbiAgICAgICAgICAgICAgICAvLyDlsIbmn6Xor6LorrDlvZXkv53lrZjotbfmnaVcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdIaXN0b3J5ID0ge1xuICAgICAgICAgICAgICAgICAgICAna2V5V29yZCc6IGtleVdvcmQsXG4gICAgICAgICAgICAgICAgICAgICdzZW50ZW5jZSc6IFNlbnRlbmNlLFxuICAgICAgICAgICAgICAgICAgICAncm9sZSc6IG1lc3NhZ2VzWzBdWydyb2xlJ10sXG4gICAgICAgICAgICAgICAgICAgICdhbnN3ZXInOiBtZXNzYWdlc1swXVsnY29udGVudCddW21lc3NhZ2VzWzBdWydjb250ZW50J10ubGVuZ3RoIC0gMV1bJ2NvbnRlbnQnXSxcbiAgICAgICAgICAgICAgICAgICAgJ3NvdXJjZSc6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgICAgICAgICAncHJvbXB0JzogbWVzc2FnZXNbMF1bJ3Byb21wdCddLFxuICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzJzogbWVzc2FnZXNbMF1bJ2ltYWdlcyddXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5V29yZCAhPT0gJycgJiYgU2VudGVuY2UgIT09ICcnICYmIG1lc3NhZ2VzWzBdWydjb250ZW50J11bbWVzc2FnZXNbMF1bJ2NvbnRlbnQnXS5sZW5ndGggLSAxXVsnY29udGVudCddICE9PSAnJyAmJiBzdG9yYWdlLmxhc3RFeGVjdXRlZFByb21wdC5pZCAhPT0gJ2RpY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0uaGlzdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdIaXN0b3J5TGlzdCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmluZ28gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbmV3SGlzdG9yeUxpc3QucHVzaChuZXdIaXN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6c5pyA6L+R5omn6KGM55qE5piv5Zyo57q/6K+N5YW477yM5YiZ5LiN5L+d5a2Y5Y6G5Y+y6K6w5b2VXG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHN0b3JhZ2UuaGlzdG9yeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOiusOW9leW3suWtmOWcqO+8jOWImeS4jemHjeWkjeS/neWtmFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9yYWdlLmhpc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gc3RvcmFnZS5oaXN0b3J5W2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoua2V5V29yZCA9PT0gbmV3SGlzdG9yeVsna2V5V29yZCddICYmIG9iai5zZW50ZW5jZSA9PT0gbmV3SGlzdG9yeVsnc2VudGVuY2UnXSAmJiBvYmoucHJvbXB0ID09PSBuZXdIaXN0b3J5Wydwcm9tcHQnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5nbyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0hpc3RvcnlMaXN0ID0gc3RvcmFnZS5oaXN0b3J5O1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SGlzdG9yeUxpc3QudW5zaGlmdChuZXdIaXN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0hpc3RvcnlMaXN0LnNwbGljZSg4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld0hpc3RvcnlMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWJpbmdvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXN0b3J5OiBuZXdIaXN0b3J5TGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSkoKTtcbiAgICAgICAgfVxuICAgIH0sIFttZXNzYWdlc10pO1xuICAgIC8vIOeql+WPo+aLluaLveaXtuinpuWPkVxuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVNb3VzZU1vdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2VVcCk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndXNlRWZmZWN0IHJldHVybicpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZVVwKTtcbiAgICAgICAgfTtcbiAgICB9LCBbZHJhZ2dpbmddKTtcbiAgICAvLyDmiafooYwgUHJvbXB0XG4gICAgY29uc3QgZXhlY3V0aXZlUHJvbXB0ID0gKHByb21wdCwgcnVuUHJvbXB0LCBpbWFnZVRvUmVyZW5kZXIsIGRhdGEpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8g6K6+572u5Yqg6L2954q25oCBXG4gICAgICAgIC8vIHNldElzTG9hZGluZyh0cnVlKVxuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGxldCBuZWVkVG9SdW5Qcm9tcHQgPSBydW5Qcm9tcHQ7XG4gICAgICAgIGlmIChuZWVkVG9SdW5Qcm9tcHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbmVlZFRvUnVuUHJvbXB0ID0gJ3llcyc7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5lZWRUb1JlcmVuZGVySW1hZ2UgPSBpbWFnZVRvUmVyZW5kZXI7XG4gICAgICAgIGlmIChuZWVkVG9SZXJlbmRlckltYWdlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG5lZWRUb1JlcmVuZGVySW1hZ2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBrZXlXb3JkID0gcHJvcHMuZGF0YS5rZXlXb3JkO1xuICAgICAgICBsZXQgU2VudGVuY2UgPSBwcm9wcy5kYXRhLlNlbnRlbmNlO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBrZXlXb3JkID0gZGF0YS5rZXlXb3JkO1xuICAgICAgICAgICAgU2VudGVuY2UgPSBkYXRhLnNlbnRlbmNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8g5Yid5aeL5YyWXG4gICAgICAgICAgICBzZXRNZXNzYWdlcyhbXSk7IC8vIOWvueivneWIl+ihqFxuICAgICAgICB9XG4gICAgICAgIC8vIOWmguaenOmcgOimgeeri+WNs+aJp+ihjCBQcm9tcHRcbiAgICAgICAgaWYgKG5lZWRUb1J1blByb21wdCAhPT0gJ25vJykge1xuICAgICAgICAgICAgLy/liJ3lp4vljJblm77niYflrrnlmahcbiAgICAgICAgICAgIGxldCBzaG93SW1hZ2VzQm94ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChwcm9tcHQuaWQgPT09ICdkaWN0JyB8fCBwcm9tcHQuaWQgPT09ICdEZWZhdWx0Jykge1xuICAgICAgICAgICAgICAgIC8vIOeJueauiueahOaWueazlVxuICAgICAgICAgICAgICAgIGlmIChrZXlXb3JkLmxlbmd0aCA8IDIwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dJbWFnZXNCb3ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0ltYWdlc0JveCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOiHquWumuS5iSBQcm9tcHRcbiAgICAgICAgICAgICAgICBpZiAocHJvbXB0LmdldFVuc3BsYXNoSW1hZ2VzICYmIG5lZWRUb1J1blByb21wdCkge1xuICAgICAgICAgICAgICAgICAgICAvLyDlpoLmnpzlvZPliY0gUHJvbXB0IOmcgOimgeaYvuekuuWbvueJh++8jOS4lOW9k+WJjemcgOimgeeri+WNs+aJp+ihjCBQcm9tcHRcbiAgICAgICAgICAgICAgICAgICAgc2hvd0ltYWdlc0JveCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzaG93SW1hZ2VzQm94ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5Z+L54K5XG4gICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ2V4ZWN1dGl2ZVByb21wdCcgfSk7XG4gICAgICAgICAgICAvLyDlnKjmtojmga/ljoblj7LkuK3mj5LlhaXmlrDorrDlvZVcbiAgICAgICAgICAgIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiBbLi4ucHJldk1lc3NhZ2VzLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQnOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjaGF0SWQnOiAoMCwgdXVpZF8xLnY0KSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjb250ZW50JzogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0YXR1cyc6ICdiZWdpbidcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICAncm9sZSc6ICdhc3Npc3RhbnQnLFxuICAgICAgICAgICAgICAgICAgICAncHJvbXB0JzogJycsXG4gICAgICAgICAgICAgICAgICAgICdzaG93SW1hZ2VzQm94Jzogc2hvd0ltYWdlc0JveCxcbiAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcyc6IFtdXG4gICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgLy8g6Z2e6L+96Zeu5pe277yM5omN5Lya6K6w5b2V5pyA6L+R5omn6KGM55qEIFByb21wdFxuICAgICAgICAgICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIOiuvue9ruacgOi/keaJp+ihjOeahCBQcm9tcHRcbiAgICAgICAgICAgICAgICBzZXRMYXN0RXhlY3V0ZWRQcm9tcHQocHJvbXB0KTtcbiAgICAgICAgICAgICAgICAvLyDorrDlvZXmnIDov5EgMSDmrKHkvb/nlKjnmoQgUHJvbXB077yM55So5LqO5LiL5qyh5ZCv5Yqo56qX5Y+j5pe26buY6K6k5omn6KGM5q2kIFByb21wdFxuICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5zZXQoe1xuICAgICAgICAgICAgICAgICAgICBsYXN0RXhlY3V0ZWRQcm9tcHQ6IHByb21wdFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG5ld1Byb21wdDtcbiAgICAgICAgICAgIGxldCBwID0gcHJvbXB0LnVzZXJQcm9tcHQ7XG4gICAgICAgICAgICAvLyDlpITnkIYgUHJvbXB0IOS4reeahOWPmOmHj1xuICAgICAgICAgICAgcCA9IHlpZWxkICgwLCB1dGlsXzEuaGFuZGxlUHJvbXB0VmFyaWFibGVzKShwLCBrZXlXb3JkLCBTZW50ZW5jZSwgTGFuZyk7XG4gICAgICAgICAgICBuZXdQcm9tcHQgPSBbeyAncm9sZSc6ICd1c2VyJywgJ2NvbnRlbnQnOiBwIH1dO1xuICAgICAgICAgICAgLy8g5aaC5p6c5Y6G5Y+y6K6w5b2V5Lit5a2Y5Zyo6K6w5b2V77yM5YiZ5LiN6YeN5aSN6K+35rGCIEFQSe+8jOebtOaOpeaYvuekuuWOhuWPsuiusOW9leeahOS/oeaBr1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLmdldCh7IFwiaGlzdG9yeVwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c6K6w5b2V5bey5a2Y5Zyo77yM5YiZ5LiN6YeN5aSN5L+d5a2YXG4gICAgICAgICAgICAgICAgbGV0IGJpbmdvID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbGV0IHVwZGF0ZWRMYXN0TWVzc2FnZTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW0uaGlzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gaXRlbS5oaXN0b3J5W2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmtleVdvcmQgPT09IGtleVdvcmQgJiYgb2JqLnNlbnRlbmNlID09PSBTZW50ZW5jZSAmJiBvYmoucHJvbXB0ID09PSBuZXdQcm9tcHRbMF1bJ2NvbnRlbnQnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCdyb2xlJyBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaXp+eJiOacrOS4reWboOS4uuayoeacieWtmOWCqCByb2xlIO+8jOebtOaOpeaYvuekuuWOhuWPsuaVsOaNruaXtuS8muWvvOiHtOWQjue7rea1geeoi+W8guW4uFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmdvID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBiaW5nbyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn5Y6G5Y+y6K6w5b2V77yaJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhvYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g55u05o6l5pi+56S65Y6G5Y+y6K6w5b2V5Lit55qE5Zue562UXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkTGFzdE1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1lc3NhZ2VzW21lc3NhZ2VzLmxlbmd0aCAtIDFdKSwgeyByb2xlOiBvYmoucm9sZSwgY29udGVudDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjaGF0SWQnOiAoMCwgdXVpZF8xLnY0KSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQnOiBvYmouYW5zd2VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0YXR1cyc6ICdkb25lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XSwgcHJvbXB0OiBuZXdQcm9tcHRbMF1bJ2NvbnRlbnQnXSwgc2hvd0ltYWdlc0JveDogc2hvd0ltYWdlc0JveCwgaW1hZ2VzOiBvYmouaW1hZ2VzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYmluZ286IGJpbmdvLCB1cGRhdGVkTGFzdE1lc3NhZ2U6IHVwZGF0ZWRMYXN0TWVzc2FnZSB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmJpbmdvKSB7XG4gICAgICAgICAgICAgICAgLy/mmL7npLrljoblj7LorrDlvZVcbiAgICAgICAgICAgICAgICBzZXRNZXNzYWdlcyhbcmVzdWx0LnVwZGF0ZWRMYXN0TWVzc2FnZV0pO1xuICAgICAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgICAgICAgICAgbGFzdFByb21wdFJlZi5jdXJyZW50ID0gbmV3UHJvbXB0O1xuICAgICAgICAgICAgICAgIC8vIOWmguaenOmcgOimgeaYvuekuuWbvueJh++8jOS4lOWOhuWPsuiusOW9leS4reayoeacieWbvueJh++8jOWImeiOt+WPluWbvueJh1xuICAgICAgICAgICAgICAgIGlmIChzaG93SW1hZ2VzQm94ICYmICgoX2EgPSByZXN1bHQudXBkYXRlZExhc3RNZXNzYWdlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW1hZ2VzLmxlbmd0aCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5Zu+54mH5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgICgwLCB1dGlsXzEuZ2V0VW5zcGxhc2hJbWFnZXMpKGtleVdvcmQpLnRoZW4oKGltZ3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS/neWtmOWbvueJh+aVsOaNrlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0TWVzc2FnZSA9IHByZXZNZXNzYWdlc1twcmV2TWVzc2FnZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZNZXNzYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkTGFzdE1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxhc3RNZXNzYWdlKSwgeyBuZWVkVG9TaG93SW1nOiB0cnVlLCBpbWFnZXM6IGltZ3MgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5wcmV2TWVzc2FnZXMuc2xpY2UoMCwgcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDEpLCB1cGRhdGVkTGFzdE1lc3NhZ2VdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOiOt+WPluivreiogOefpeivhlxuICAgICAgICAgICAgICAgIGdldEtub3dsZWRnZShuZXdQcm9tcHQsIGtleVdvcmQsIHByb21wdC5pZCk7XG4gICAgICAgICAgICAgICAgLy8g6K+35rGC5Zu+54mHXG4gICAgICAgICAgICAgICAgaWYgKHByb21wdC5pZCA9PSAnRGVmYXVsdCcgfHwgcHJvbXB0LmlkID09ICdkaWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5V29yZC5sZW5ndGggPD0gMjAgJiYgcHJvbXB0LmdldFVuc3BsYXNoSW1hZ2VzICYmIG5lZWRUb1JlcmVuZGVySW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOiOt+WPluWbvueJh+aVsOaNrlxuICAgICAgICAgICAgICAgICAgICAgICAgKDAsIHV0aWxfMS5nZXRVbnNwbGFzaEltYWdlcykoa2V5V29yZCkudGhlbigoaW1ncykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldEltYWdlcyhpbWdzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS/neWtmOWbvueJh+aVsOaNrlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RNZXNzYWdlID0gcHJldk1lc3NhZ2VzW3ByZXZNZXNzYWdlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZNZXNzYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkTGFzdE1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxhc3RNZXNzYWdlKSwgeyBuZWVkVG9TaG93SW1nOiB0cnVlLCBpbWFnZXM6IGltZ3MgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbLi4ucHJldk1lc3NhZ2VzLnNsaWNlKDAsIHByZXZNZXNzYWdlcy5sZW5ndGggLSAxKSwgdXBkYXRlZExhc3RNZXNzYWdlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvbXB0LmdldFVuc3BsYXNoSW1hZ2VzICYmIG5lZWRUb1JlcmVuZGVySW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOiOt+WPluWbvueJh+aVsOaNrlxuICAgICAgICAgICAgICAgICAgICAgICAgKDAsIHV0aWxfMS5nZXRVbnNwbGFzaEltYWdlcykoa2V5V29yZCkudGhlbigoaW1ncykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldEltYWdlcyhpbWdzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS/neWtmOWbvueJh+aVsOaNrlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RNZXNzYWdlID0gcHJldk1lc3NhZ2VzW3ByZXZNZXNzYWdlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZNZXNzYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkTGFzdE1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxhc3RNZXNzYWdlKSwgeyBuZWVkVG9TaG93SW1nOiB0cnVlLCBpbWFnZXM6IGltZ3MgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbLi4ucHJldk1lc3NhZ2VzLnNsaWNlKDAsIHByZXZNZXNzYWdlcy5sZW5ndGggLSAxKSwgdXBkYXRlZExhc3RNZXNzYWdlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8g5omT5byAIFBvcHVwIOeql+WPo++8jOS4jemcgOimgeeri+WNs+aJp+ihjCBQcm9tcHRcbiAgICAgICAgICAgIHNldExhc3RFeGVjdXRlZFByb21wdCh7ICd0aXRsZSc6ICcnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBmYWxzZSwgJ3VzZXJQcm9tcHQnOiAnJywgJ2lkJzogJycgfSk7XG4gICAgICAgICAgICAvLyDmlbDmja7ln4vngrlcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAnb3BlblBvcHVwQ2FyZCcgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyDngrnlh7vjgIzph43mlrDnlJ/miJDjgI3mjInpkq5cbiAgICBjb25zdCBoYW5kbGVSZWdlbmVyYXRlQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIC8vIOWcqOa2iOaBr+WOhuWPsuS4reaPkuWFpeaWsOiusOW9lVxuICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4ge1xuICAgICAgICAgICAgbGV0IG5ld01lc3NhZ2VzID0gWy4uLnByZXZNZXNzYWdlc107XG4gICAgICAgICAgICBuZXdNZXNzYWdlc1tuZXdNZXNzYWdlcy5sZW5ndGggLSAxXS5jb250ZW50LnB1c2goe1xuICAgICAgICAgICAgICAgIGNoYXRJZDogKDAsIHV1aWRfMS52NCkoKSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnJyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdiZWdpbicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIGJlZ2luIOeKtuaAgeaJjeS8muaYvuekuuWKoOi9veWKqOeUu1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IG5ld01lc3NhZ2VzW25ld01lc3NhZ2VzLmxlbmd0aCAtIDFdLmNvbnRlbnQ7XG4gICAgICAgICAgICBuZXdNZXNzYWdlc1tuZXdNZXNzYWdlcy5sZW5ndGggLSAxXS5jb250ZW50W2NvbnRlbnQubGVuZ3RoIC0gMV0uc3RhdHVzID0gJ2JlZ2luJztcbiAgICAgICAgICAgIHJldHVybiBuZXdNZXNzYWdlcztcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOiOt+WPluacgOi/keaJp+ihjOeahCBQcm9tcHTvvIzlho3mrKHmiafooYxcbiAgICAgICAgZ2V0S25vd2xlZGdlKGxhc3RQcm9tcHRSZWYuY3VycmVudCwgcHJvcHMuZGF0YS5rZXlXb3JkLCBsYXN0RXhlY3V0ZWRQcm9tcHQuaWQpO1xuICAgIH07XG4gICAgY29uc3QgaW5pdGlhbGl6ZVByb21wdExpc3QgPSAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOiOt+WPluW3suS/neWtmOeahCBQcm9tcHQgTGlzdFxuICAgICAgICBjb25zdCBwcm9tcHRMaXN0ID0geWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuZ2V0KHsgXCJwcm9tcHRMaXN0XCI6IFtdIH0pLnRoZW4oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnByb21wdExpc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRQcm9tcHRzKHByb21wdExpc3QpO1xuICAgIH0pO1xuICAgIC8vIOe8lui+keiHquWumuS5iSBQcm9tcHQg5oiQ5Yqf5ZCOXG4gICAgY29uc3QgaGFuZGxlUHJvbXB0RWRpdGVkID0gKGlzTmV3KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOWIneWni+WMliBQcm9tcHQg5YiX6KGoXG4gICAgICAgIGluaXRpYWxpemVQcm9tcHRMaXN0KCk7XG4gICAgICAgIC8vIOabtOaWsOacgOi/keS9v+eUqOeahCBQcm9tcHTvvIjpkojlr7nnvJbovpHnmoTlnLrmma/vvIlcbiAgICAgICAgaWYgKCFpc05ldykge1xuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuZ2V0KHsgXCJwcm9tcHRMaXN0XCI6IFtdIH0pLnRoZW4oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW0ucHJvbXB0TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5wcm9tcHRMaXN0W2ldLmlkID09PSBsYXN0RXhlY3V0ZWRQcm9tcHQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOabtOaWsFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TGFzdEV4ZWN1dGVkUHJvbXB0KGl0ZW0ucHJvbXB0TGlzdFtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDorrDlvZXmnIDov5EgMSDmrKHkvb/nlKjnmoQgUHJvbXB0XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RXhlY3V0ZWRQcm9tcHQ6IGl0ZW0ucHJvbXB0TGlzdFtpXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAnaGFuZGxlUHJvbXB0RWRpdGVkJyB9KTtcbiAgICB9KTtcbiAgICAvLyDor7fmsYIgR1BUIOaVsOaNrlxuICAgIGNvbnN0IGdldEtub3dsZWRnZSA9IChwcm9tcHQsIGtleVdvcmQsIHByb21wdElkKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOS9v+eUqOmVv+i/nuaOpVxuICAgICAgICBjb25zdCBwb3J0ID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLmNvbm5lY3Qoe1xuICAgICAgICAgICAgbmFtZTogJ2dldEdQVCdcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOiusOW9leacgOi/keaJp+ihjOeahCBQcm9tcHTvvIznlKjkuo7ph43mlrDnlJ/miJBcbiAgICAgICAgbGFzdFByb21wdFJlZi5jdXJyZW50ID0gcHJvbXB0O1xuICAgICAgICBjb25zdCB0aGlzS2V5V29yZCA9IGtleVdvcmQgfHwgJyc7XG4gICAgICAgIGNvbnN0IHRoaXNQcm9tcHRJZCA9IHByb21wdElkIHx8ICcnO1xuICAgICAgICAvLyDnpoHnlKjkv53lrZjliLAgQW5raSDmjInpkq5cbiAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdzdGFuZGJ5JywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgIGlmICh0aGlzUHJvbXB0SWQgPT09ICdkaWN0Jykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8g5L2/55SoIHBvc3RNcyDlj5HpgIHkv6Hmga9cbiAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnZ2V0RGljdGlvbmFyeURhdGEnLCAnbWVzc2FnZXMnOiBwcm9tcHQsICdrZXlXb3JkJzogdGhpc0tleVdvcmQgfSk7XG4gICAgICAgICAgICB9LCAyMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyDkvb/nlKggcG9zdE1zIOWPkemAgeS/oeaBr1xuICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdnZXRLbm93bGVkZ2UnLCAnbWVzc2FnZXMnOiBwcm9tcHQsICdrZXlXb3JkJzogdGhpc0tleVdvcmQgfSk7XG4gICAgICAgICAgICB9LCAyMCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAobXNnLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgICAgICAvLyAgIC8vIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIOaOpeaUtuS/oeaBr1xuICAgICAgICBwb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobXNnKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXInKTtcbiAgICAgICAgICAgIGlmIChtc2cudHlwZSA9PT0gJ3NlbmRHUFREYXRhJykge1xuICAgICAgICAgICAgICAgIC8vIOivt+axgiBHUFQg5pWw5o2u5oiQ5Yqf5LiU5pWw5o2u5rWB5Lyg6L6T5LitXG4gICAgICAgICAgICAgICAgLy8gaWYgKG1zZy5zdGF0dXMgPT09ICdwcm9jZXNzJyB8fCBtc2cuc3RhdHVzID09PSAnZW5kJykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOa4suafk+aVsOaNrlxuICAgICAgICAgICAgICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TWVzc2FnZXMgPSBbLi4ucHJldk1lc3NhZ2VzXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RNZXNzYWdlID0gbmV3TWVzc2FnZXNbbmV3TWVzc2FnZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmt7Hluqbmi7fotJ1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250ZW50TGlzdCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobGFzdE1lc3NhZ2UuY29udGVudCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0NvbnRlbnQgPSBtc2cuQXBpVHlwZSA9PT0gJ2NoYXRHUFRXZWInID8gbXNnLmNvbnRlbnQgOiBjb250ZW50TGlzdFtjb250ZW50TGlzdC5sZW5ndGggLSAxXVsnY29udGVudCddICsgbXNnLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdDb250ZW50ID0gKDAsIHV0aWxfMS5oYW5kbGVIaWdodGxpZ2h0KShuZXdDb250ZW50LCBwcm9wcy5kYXRhLmtleVdvcmQsIGFua2lDYXJkcywgd2luZG93RWxlbWVudCA9PT0gbnVsbCB8fCB3aW5kb3dFbGVtZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3aW5kb3dFbGVtZW50LmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudExpc3RbY29udGVudExpc3QubGVuZ3RoIC0gMV1bJ2NvbnRlbnQnXSA9IG5ld0NvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50TGlzdFtjb250ZW50TGlzdC5sZW5ndGggLSAxXVsnc3RhdHVzJ10gPSBtc2cuc3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3Q29udGVudExpc3QgPSBbLi4uY29udGVudExpc3RdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlZExhc3RNZXNzYWdlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBsYXN0TWVzc2FnZSksIHsgY29udGVudDogbmV3Q29udGVudExpc3QsIHByb21wdDogcHJvbXB0WzBdWydjb250ZW50J10gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWy4uLnByZXZNZXNzYWdlcy5zbGljZSgwLCBwcmV2TWVzc2FnZXMubGVuZ3RoIC0gMSksIHVwZGF0ZWRMYXN0TWVzc2FnZV07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIC8vIOivt+axgiBHUFQg5pWw5o2u5oiQ5Yqf5LiU5pWw5o2u5rWB57uT5p2f5Lyg6L6TXG4gICAgICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT09ICdkb25lJyB8fCBtc2cuc3RhdHVzID09PSAnZXJybycpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdub3JtYWwnLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIOeUqOaIt+WPkemAgea2iOaBr1xuICAgIGNvbnN0IGhhbmRsZVNlbmRNZXNzYWdlID0gKHZhbHVlcykgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZXMpO1xuICAgICAgICBsZXQgcHJvbXB0ID0gdmFsdWVzO1xuICAgICAgICAvLyAvLyDmuIXnqbrmlofmnKzmoYZcbiAgICAgICAgLy8gZm9ybS5yZXNldEZpZWxkcygpO1xuICAgICAgICAvLyDlrprkvY3liLDlupXpg6hcbiAgICAgICAgc2Nyb2xsVG9Cb3R0b20odHJ1ZSk7XG4gICAgICAgIC8vIOWwhueUqOaIt+WPkeiogOWPkemAgeWIsOa2iOaBr+iusOW9leS4rVxuICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlZExhc3RNZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXRJZDogKDAsIHV1aWRfMS52NCkoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHZhbHVlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2RvbmUnLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBwcm9tcHQ6IHByb21wdCxcbiAgICAgICAgICAgICAgICBzaG93SW1hZ2VzQm94OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpbWFnZXM6IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIFsuLi5wcmV2TWVzc2FnZXMsIHVwZGF0ZWRMYXN0TWVzc2FnZV07XG4gICAgICAgIH0pO1xuICAgICAgICAvLyDlnKjmtojmga/ljoblj7LkuK3mj5LlhaXmlrAgR1BUIOa2iOaBr1xuICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4gWy4uLnByZXZNZXNzYWdlcywge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGF0SWQ6ICgwLCB1dWlkXzEudjQpKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2JlZ2luJyxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgcm9sZTogJ2Fzc2lzdGFudCcsXG4gICAgICAgICAgICAgICAgcHJvbXB0OiAnJyxcbiAgICAgICAgICAgICAgICBzaG93SW1hZ2VzQm94OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpbWFnZXM6IFtdXG4gICAgICAgICAgICB9XSk7XG4gICAgICAgIGNvbnN0IG1zZ0hpc3RvcnkgPSBtZXNzYWdlcy5zbGljZSgtNSkubWFwKChpdGVtKSA9PiB7IHJldHVybiB7ICdyb2xlJzogaXRlbS5yb2xlLCAnY29udGVudCc6IGl0ZW0uY29udGVudFtpdGVtLmNvbnRlbnQubGVuZ3RoIC0gMV1bJ2NvbnRlbnQnXSB9OyB9KTtcbiAgICAgICAgZ2V0S25vd2xlZGdlKFsuLi5tc2dIaXN0b3J5LCB7IFwicm9sZVwiOiBcInVzZXJcIiwgXCJjb250ZW50XCI6IHZhbHVlcyB9XSk7XG4gICAgICAgIC8vIGFtcGxpdHVkZS50cmFjaygnaGFuZGxlU2VuZE1lc3NhZ2UnKTtcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdoYW5kbGVTZW5kTWVzc2FnZScgfSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNb3VzZURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1BvcHVwQ2FyZDpoYW5kbGVNb3VzZURvd24nKTtcbiAgICAgICAgc2V0RHJhZ2dpbmcodHJ1ZSk7XG4gICAgICAgIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRYID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFkgPSBldmVudC5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRYID0gU3RyaW5nKG9mZnNldFgpO1xuICAgICAgICAgICAgd2luZG93RWxlbWVudC5jdXJyZW50LmRhdGFzZXQub2Zmc2V0WSA9IFN0cmluZyhvZmZzZXRZKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXRPZmZzZXQoeyB4OiBldmVudC5jbGllbnRYIC0gcG9zaXRpb24ueCwgeTogZXZlbnQuY2xpZW50WSAtIHBvc2l0aW9uLnkgfSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNb3VzZU1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgLy8gLy8gY29uc29sZS5sb2coJ1BvcHVwQ2FyZDpoYW5kbGVNb3VzZU1vdmUnKTtcbiAgICAgICAgLy8gLy8gY29uc29sZS5sb2coZHJhZ2dpbmcpO1xuICAgICAgICBpZiAoZHJhZ2dpbmcgJiYgd2luZG93RWxlbWVudC5jdXJyZW50KSB7XG4gICAgICAgICAgICAvLyBVc2UgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHRvIHRocm90dGxlIHRoZSBtb3VzZW1vdmUgZXZlbnQgaGFuZGxpbmdcbiAgICAgICAgICAgIC8vIOm8oOagh+ebuOWvueeql+WPo+W3puS4iuinkueahOWBj+enu1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WCA9IHBhcnNlRmxvYXQod2luZG93RWxlbWVudC5jdXJyZW50LmRhdGFzZXQub2Zmc2V0WCB8fCAnJyk7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRZID0gcGFyc2VGbG9hdCh3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRZIHx8ICcnKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ggPSBldmVudC5jbGllbnRYIC0gb2Zmc2V0WDtcbiAgICAgICAgICAgIGNvbnN0IG5ld1kgPSBldmVudC5jbGllbnRZIC0gb2Zmc2V0WTtcbiAgICAgICAgICAgIC8vIENoZWNrIHRoZSBib3VuZGFyaWVzXG4gICAgICAgICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudFdpZHRoID0gd2luZG93RWxlbWVudC5jdXJyZW50LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudEhlaWdodCA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBtaW5YID0gLWVsZW1lbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICBjb25zdCBtaW5ZID0gMDtcbiAgICAgICAgICAgIGNvbnN0IG1heFggPSB3aW5kb3dXaWR0aCAtIGVsZW1lbnRXaWR0aCArIGVsZW1lbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICBjb25zdCBtYXhZID0gd2luZG93SGVpZ2h0IC0gZWxlbWVudEhlaWdodCArIGVsZW1lbnRIZWlnaHQgLyAxLjU7XG4gICAgICAgICAgICBjb25zdCBjbGFtcGVkWCA9IE1hdGgubWF4KG1pblgsIE1hdGgubWluKG5ld1gsIG1heFgpKTtcbiAgICAgICAgICAgIGNvbnN0IGNsYW1wZWRZID0gTWF0aC5tYXgobWluWSwgTWF0aC5taW4obmV3WSwgbWF4WSkpO1xuICAgICAgICAgICAgLy8gT25seSB1cGRhdGUgdGhlIHBvc2l0aW9uIGlmIGl0J3Mgd2l0aGluIHRoZSBib3VuZGFyaWVzXG4gICAgICAgICAgICAvLyBuZXdYID49IG1pblggJiYgbmV3WCA8PSBtYXhYICYmIG5ld1kgPj0gbWluWSAmJiBuZXdZIDw9IG1heFlcbiAgICAgICAgICAgIGlmICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgLy8gc2V0UG9zaXRpb24oeyB4OiBjbGFtcGVkWCwgeTogY2xhbXBlZFkgfSk7XG4gICAgICAgICAgICAgICAgd2luZG93RWxlbWVudC5jdXJyZW50LnN0eWxlLmxlZnQgPSBgJHtjbGFtcGVkWH1weGA7XG4gICAgICAgICAgICAgICAgd2luZG93RWxlbWVudC5jdXJyZW50LnN0eWxlLnRvcCA9IGAke2NsYW1wZWRZfXB4YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOWFg+e0oOWIsOi+vui+ueeVjFxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHJlY3QgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgLy8gY29uc3Qgb2Zmc2V0WCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICAgICAgICAgICAgLy8gY29uc3Qgb2Zmc2V0WSA9IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgICAgICAgICAgICAvLyB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRYID0gU3RyaW5nKG9mZnNldFgpO1xuICAgICAgICAgICAgICAgIC8vIHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFkgPSBTdHJpbmcob2Zmc2V0WSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU1vdXNlVXAgPSAoKSA9PiB7XG4gICAgICAgIC8vIC8vIGNvbnNvbGUubG9nKCdQb3B1cENhcmQ6aGFuZGxlTW91c2VVcCcpO1xuICAgICAgICBzZXREcmFnZ2luZyhmYWxzZSk7XG4gICAgfTtcbiAgICAvLyAvLyDmt7vliqDliLAgQW5raVxuICAgIC8vIGNvbnN0IGFkZFRvQW5raSA9IChkZWNrTmFtZTogc3RyaW5nLCBtb2RlbE5hbWU6IHN0cmluZywgZnJvbnQ6IHN0cmluZywgYmFjazogc3RyaW5nKSA9PiB7XG4gICAgLy8gICBjb25zdCBrZXlXb3JkID0gcHJvcHMuZGF0YS5rZXlXb3JkXG4gICAgLy8gICBjb25zdCBTZW50ZW5jZSA9IHByb3BzLmRhdGEuU2VudGVuY2VcbiAgICAvLyAgIGxldCBjb250YWluZXIgPSAnJ1xuICAgIC8vICAgbGV0IGltYWdlcyA9ICcnXG4gICAgLy8gICBsZXQgdW5zcGxhc2hfZG93bmxvYWRfbG9jYXRpb25cbiAgICAvLyAgIGxldCBzdGMgPSBrZXlXb3JkLmxlbmd0aCA8PSAyMCA/IFNlbnRlbmNlIDogJydcbiAgICAvLyAgIC8vIOi9rOenuyBIVE1MIOagh+etvu+8jOaMieeFp+aZrumAmuWtl+espuS4suWkhOeQhlxuICAgIC8vICAgc3RjID0gc3RjLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpO1xuICAgIC8vICAgLy8g5Zyo6K+t5aKD5Y+l5a2Q5Lit5bCG5YWz6ZSu5a2X56qB5Ye65pi+56S6XG4gICAgLy8gICBzdGMgPSBzdGMucmVwbGFjZShuZXcgUmVnRXhwKGtleVdvcmQsICdnJyksICc8c3BhbiBjbGFzcz1cImtleVdvcmRcIj4nICsga2V5V29yZCArICc8L3NwYW4+Jyk7XG4gICAgLy8gICBsZXQgU2NvdXRlclNlbGVjdGlvbiA9ICcnXG4gICAgLy8gICBpZiAod2luZG93RWxlbWVudC5jdXJyZW50KSB7XG4gICAgLy8gICAgIC8vIOmAieS4reeahOaWh+Wtl1xuICAgIC8vICAgICBTY291dGVyU2VsZWN0aW9uID0gd2luZG93RWxlbWVudC5jdXJyZW50Py5xdWVyeVNlbGVjdG9yKCcjU2NvdXRlclNlbGVjdGlvbicpPy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpWzBdLmlubmVySFRNTCFcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2cod2luZG93RWxlbWVudC5jdXJyZW50KTtcbiAgICAvLyAgICAgY29udGFpbmVyID0gd2luZG93RWxlbWVudC5jdXJyZW50LmlubmVySFRNTFxuICAgIC8vICAgICBjb250YWluZXIgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVzc2FnZXMnKVswXS5pbm5lckhUTUxcbiAgICAvLyAgICAgLy8g5aSE55CGIGNvbnRhaW5lciDnmoTlhoXlrrlcbiAgICAvLyAgICAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAvLyAgICAgbGV0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoY29udGFpbmVyLCAndGV4dC9odG1sJyk7XG4gICAgLy8gICAgIGxldCBlbGVtZW50c1RvUmVtb3ZlID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbWFnZVF1ZXVlJyk7XG4gICAgLy8gICAgIGxldCBpbWFnZVNvdXJjZSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCcuaW1hZ2VTb3VyY2UnKTtcbiAgICAvLyAgICAgLy8g5Yib5bu65paw55qEIGltZyDmoIfnrb5cbiAgICAvLyAgICAgLy8g6K6+572u5Zu+54mH55qE5bC65a+444CB5qC35byPXG4gICAgLy8gICAgIGlmIChkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VCb3gnKS5sZW5ndGggPiAwKSB7XG4gICAgLy8gICAgICAgbGV0IGltZyA9IGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZUJveCcpWzBdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIC8vICAgICAgIGltZy53aWR0aCA9IDBcbiAgICAvLyAgICAgICBjb25zdCBpbWdVcmwgPSBpbWcuc3JjO1xuICAgIC8vICAgICAgIGxldCBuZXdJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIC8vICAgICAgIG5ld0ltZy5zcmMgPSBpbWdVcmw7XG4gICAgLy8gICAgICAgLy8g6I635Y+W6KaB5pu/5o2i55qEIGRpdlxuICAgIC8vICAgICAgIGxldCBkaXYgPSBkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VCb3gnKVswXTtcbiAgICAvLyAgICAgICBpZiAoZGl2KSB7XG4gICAgLy8gICAgICAgICAvLyDkvb/nlKjmlrDnmoQgaW1nIOagh+etvuabv+aNoiBkaXZcbiAgICAvLyAgICAgICAgIGRpdi5wYXJlbnROb2RlPy5yZXBsYWNlQ2hpbGQobmV3SW1nLCBkaXYpO1xuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAvLyDmsqHmnInlm77niYdcbiAgICAvLyAgICAgICBjb25zdCBpbWdzID0gZG9jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlcycpWzBdXG4gICAgLy8gICAgICAgaWYgKGltZ3MpIHtcbiAgICAvLyAgICAgICAgIGltZ3MucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQoaW1ncylcbiAgICAvLyAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgLy8g5Yig6Zmk6aKE5Yqg6L2955qE5Zu+54mHXG4gICAgLy8gICAgIGVsZW1lbnRzVG9SZW1vdmUuZm9yRWFjaChlbCA9PiBlbC5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChlbCkpO1xuICAgIC8vICAgICAvLyDliKDpmaTlm77niYfmnaXmupDkv6Hmga9cbiAgICAvLyAgICAgaW1hZ2VTb3VyY2UuZm9yRWFjaChlbCA9PiBlbC5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChlbCkpO1xuICAgIC8vICAgICBjb250YWluZXIgPSBkb2MuYm9keS5pbm5lckhUTUw7XG4gICAgLy8gICAgIC8vIOWkhOeQhuagt+W8j++8jOmBv+WFjSBBbmtpIOWGheaYvuekuuW8guW4uFxuICAgIC8vICAgICBjb250YWluZXIgPSBjb250YWluZXIucmVwbGFjZSgvc3R5bGU9L2csICcnKTtcbiAgICAvLyAgICAgaWYgKHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZUJveCcpWzBdICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyAgICAgICBpbWFnZXMgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VCb3gnKVswXS5pbm5lckhUTUxcbiAgICAvLyAgICAgICAvLyDojrflj5YgdW5zcGxhc2hBcGkg55qEIGRvd25sb2FkX2xvY2F0aW9uXG4gICAgLy8gICAgICAgdW5zcGxhc2hfZG93bmxvYWRfbG9jYXRpb24gPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzJylbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLnBhcmVudEVsZW1lbnQ/LmdldEF0dHJpYnV0ZSgnZGF0YS1kb3dubG9hZGxvY2F0aW9uJylcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhpbWFnZXMpO1xuICAgIC8vICAgICAvLyDlpITnkIbmoLflvI/vvIzpgb/lhY0gQW5raSDlhoXmmL7npLrlvILluLhcbiAgICAvLyAgICAgaW1hZ2VzID0gaW1hZ2VzLnJlcGxhY2UoL3N0eWxlPS9naSwgJycpO1xuICAgIC8vICAgICBpbWFnZXMgPSBpbWFnZXMucmVwbGFjZSgvd2lkdGgvZ2ksICcnKTtcbiAgICAvLyAgIH1cbiAgICAvLyAgIGNvbnN0IGNhcmRTdHlsZSA9IGBgXG4gICAgLy8gICAvLyDor7fmsYIgYmFja2dyb3VuZCDlsIbmlbDmja7kv53lrZjliLAgQW5raVxuICAgIC8vICAgLy8g5Y2V6K+N5Y+R6Z+zXG4gICAgLy8gICBpbnRlcmZhY2UgTGFuZ09iamVjdCB7XG4gICAgLy8gICAgIFtrZXk6IHN0cmluZ106IGxhbmdUeXBlO1xuICAgIC8vICAgfVxuICAgIC8vICAgY29uc3QgdGhpc0xhbmc6IExhbmdPYmplY3QgPSBsYW5nXG4gICAgLy8gICBsZXQgYXVkaW9Vcmw6IHN0cmluZyA9ICdodHRwOi8vZGljdC55b3VkYW8uY29tL2RpY3R2b2ljZT90eXBlPTAmYXVkaW89J1xuICAgIC8vICAgbGV0IGF1ZGlvOiBbXSB8IFt7fV0sIGZpbGVuYW1lXG4gICAgLy8gICB0cnkge1xuICAgIC8vICAgICBhdWRpb1VybCA9IHRoaXNMYW5nW0xhbmdbJ3RhcmdldCddWydpZCddXVsnYXVkaW9VUkwnXVxuICAgIC8vICAgICAvLyBmaWxlbmFtZSA9IERhdGUubm93KCkudG9TdHJpbmcoKVxuICAgIC8vICAgICBmaWxlbmFtZSA9ICcnXG4gICAgLy8gICAgIGF1ZGlvID0gW3tcbiAgICAvLyAgICAgICBcInVybFwiOiBhdWRpb1VybCArIGtleVdvcmQsXG4gICAgLy8gICAgICAgXCJmaWxlbmFtZVwiOiBcIlNjb3V0ZXJcIiArIGZpbGVuYW1lICsgXCIubXAzXCIsXG4gICAgLy8gICAgICAgXCJmaWVsZHNcIjogW1xuICAgIC8vICAgICAgICAgXCJGcm9udFwiXG4gICAgLy8gICAgICAgXVxuICAgIC8vICAgICB9XVxuICAgIC8vICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyAgICAgYXVkaW8gPSBbXVxuICAgIC8vICAgfVxuICAgIC8vICAgLy8g5bi46KeE57G75Z6LXG4gICAgLy8gICBsZXQgYW5raUJhY2sgPSAnPHA+IDxibG9ja3F1b3RlPicgKyBzdGMgKyAnIOKAlOKAlCA8YSBocmVmPVwiJyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgJ1wiPlNvdXJjZTwvYT48L2Jsb2NrcXVvdGU+PC9wPicgKyBjb250YWluZXJcbiAgICAvLyAgIGlmIChrZXlXb3JkLmxlbmd0aCA+IDIwKSB7XG4gICAgLy8gICAgIC8vIOWmguaenOmAieS4reeahOespuWPt+mVv+W6puWkp+S6jiAyMO+8iOivtOaYjuaYr+WPpeWtkO+8ieWImeS4jeaYvuekuuS4iuS4i+aWh+WPpeWtkO+8jOeEtuWQjuWwhuadpea6kOmTvuaOpeaUvuWIsOWwvumDqFxuICAgIC8vICAgICBhbmtpQmFjayA9IGNvbnRhaW5lciArICc8cD48YSBocmVmPVwiJyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgJ1wiPlNvdXJjZTwvYT48L3A+J1xuICAgIC8vICAgfVxuICAgIC8vICAgbGV0IHAgPSB7XG4gICAgLy8gICAgIFwibm90ZVwiOiB7XG4gICAgLy8gICAgICAgXCJkZWNrTmFtZVwiOiBkZWNrTmFtZSxcbiAgICAvLyAgICAgICBcIm1vZGVsTmFtZVwiOiBtb2RlbE5hbWUsXG4gICAgLy8gICAgICAgXCJmaWVsZHNcIjoge1xuICAgIC8vICAgICAgICAgW2Zyb250XToga2V5V29yZCxcbiAgICAvLyAgICAgICAgIFtiYWNrXTogY2FyZFN0eWxlICsgYW5raUJhY2tcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgIFwiYXVkaW9cIjogYXVkaW8sXG4gICAgLy8gICAgICAgXCJ0YWdzXCI6IFtcbiAgICAvLyAgICAgICAgIFwiU2NvdXRlclwiXG4gICAgLy8gICAgICAgXVxuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy8gICAvLyDlrozlvaLloavnqbrnsbvlnotcbiAgICAvLyAgIGlmIChTY291dGVyU2VsZWN0aW9uLmluZGV4T2YoJ2NsYXNzPVwiYW5raVNwYWNlXCInKSA+PSAwIHx8IGNvbnRhaW5lci5pbmRleE9mKCdjbGFzcz1cImFua2lTcGFjZVwiJykgPj0gMCB8fCBjb250YWluZXIuaW5kZXhPZigne3tjJykgPj0gMCkge1xuICAgIC8vICAgICBsZXQgbmV3RnJvbnQ6IHN0cmluZ1xuICAgIC8vICAgICBuZXdGcm9udCA9ICc8cD4nICsgU2NvdXRlclNlbGVjdGlvbiArICc8L3A+JyArICc8YmxvY2txdW90ZT4nICsgc3RjICsgJyDigJTigJQgPGEgaHJlZj1cIicgKyB3aW5kb3cubG9jYXRpb24uaHJlZiArICdcIj5Tb3VyY2U8L2E+PC9ibG9ja3F1b3RlPicgKyBjb250YWluZXJcbiAgICAvLyAgICAgaWYgKGtleVdvcmQubGVuZ3RoID4gMjApIHtcbiAgICAvLyAgICAgICAvLyDlpoLmnpzpgInkuK3nmoTnrKblj7fplb/luqblpKfkuo4gMjDvvIjor7TmmI7mmK/lj6XlrZDvvInliJnkuI3mmL7npLrkuIrkuIvmloflj6XlrZDvvIznhLblkI7lsIbmnaXmupDpk77mjqXmlL7liLDlsL7pg6hcbiAgICAvLyAgICAgICBuZXdGcm9udCA9ICc8cD4nICsgU2NvdXRlclNlbGVjdGlvbiArICc8L3A+JyArIGNvbnRhaW5lciArICc8cD4gPGEgaHJlZj1cIicgKyB3aW5kb3cubG9jYXRpb24uaHJlZiArICdcIj5Tb3VyY2U8L2E+PC9wPidcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBwID0ge1xuICAgIC8vICAgICAgIFwibm90ZVwiOiB7XG4gICAgLy8gICAgICAgICBcImRlY2tOYW1lXCI6IGRlY2tOYW1lLFxuICAgIC8vICAgICAgICAgXCJtb2RlbE5hbWVcIjogbW9kZWxOYW1lLFxuICAgIC8vICAgICAgICAgXCJmaWVsZHNcIjoge1xuICAgIC8vICAgICAgICAgICBbZnJvbnRdOiBuZXdGcm9udCxcbiAgICAvLyAgICAgICAgICAgW2JhY2tdOiAnJ1xuICAgIC8vICAgICAgICAgfSxcbiAgICAvLyAgICAgICAgIFwiYXVkaW9cIjogW10sXG4gICAgLy8gICAgICAgICBcInRhZ3NcIjogW1xuICAgIC8vICAgICAgICAgICBcIlNjb3V0ZXJcIlxuICAgIC8vICAgICAgICAgXVxuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vICAgfVxuICAgIC8vICAgLy8g5Y+R6YCB5raI5oGv57uZIGJhY2tncm91bmRcbiAgICAvLyAgIGxldCBzZW5kaW5nID0gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYWRkTm90ZScsICdtZXNzYWdlcyc6IHsgJ2Fua2lfYXJndW1lbnRzJzogcCwgJ2Fua2lfYWN0aW9uX3R5cGUnOiAnYWRkTm90ZScsICd1bnNwbGFzaF9kb3dubG9hZF9sb2NhdGlvbic6IHVuc3BsYXNoX2Rvd25sb2FkX2xvY2F0aW9uIH0sIH0pXG4gICAgLy8gICBzZW5kaW5nLnRoZW4oaGFuZGxlUmVzcG9uc2UsIGhhbmRsZUVycm9yKTtcbiAgICAvLyAgIC8vIOaVsOaNruWfi+eCuVxuICAgIC8vICAgLy8gYW1wbGl0dWRlLnRyYWNrKCdhZGRUb0Fua2knKTtcbiAgICAvLyAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAnYWRkVG9BbmtpJyB9KVxuICAgIC8vIH1cbiAgICAvLyAvLyDngrnlh7vkv53lrZjliLAgQW5raVxuICAgIC8vIGNvbnN0IGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljayA9IChkZWNrPzogc3RyaW5nKSA9PiB7XG4gICAgLy8gICAvLyDmoLnmja7mmK/lkKbkuLrlrozlvaLloavnqbrnlLPor7fkuI3lkIznmoTljaHniYfmqKHmnb9cbiAgICAvLyAgIGNvbnN0IGNvbnRhaW5lciA9IHdpbmRvd0VsZW1lbnQuY3VycmVudD8uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVzc2FnZXMnKVswXS5pbm5lckhUTUwhXG4gICAgLy8gICBjb25zdCBzZWxlY3Rpb25UZXh0ID0gd2luZG93RWxlbWVudC5jdXJyZW50Py5xdWVyeVNlbGVjdG9yKCcjU2NvdXRlclNlbGVjdGlvbicpPy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpWzBdLmlubmVySFRNTCFcbiAgICAvLyAgIGxldCBpc0Fua2lTcGFjZSA9IGZhbHNlXG4gICAgLy8gICBpZiAoY29udGFpbmVyIHx8IHNlbGVjdGlvblRleHQpIHtcbiAgICAvLyAgICAgaWYgKGNvbnRhaW5lci5pbmRleE9mKCdjbGFzcz1cImFua2lTcGFjZVwiJykgPj0gMCB8fCBjb250YWluZXIuaW5kZXhPZigne3tjJykgPj0gMCB8fCBzZWxlY3Rpb25UZXh0LmluZGV4T2YoJ2NsYXNzPVwiYW5raVNwYWNlJykgPj0gMCkge1xuICAgIC8vICAgICAgIGlzQW5raVNwYWNlID0gdHJ1ZVxuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy8gICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ2xvYWRpbmcnLCAnbm90ZUlkJzogMCB9KVxuICAgIC8vICAgZnVuY3Rpb24gc2V0QW5raUluZm8oYW5raUluZm86IEFua2lJbmZvVHlwZSkge1xuICAgIC8vICAgICBjb25zdCBtb2RlbHMgPSBhbmtpSW5mby5tb2RlbHNcbiAgICAvLyAgICAgbGV0IG1vZGVsTmFtZTogc3RyaW5nID0gJycsIGZpZWxkMTogc3RyaW5nID0gJycsIGZpZWxkMjogc3RyaW5nID0gJydcbiAgICAvLyAgICAgbW9kZWxzLmZvckVhY2goKG1vZGVsOiBhbnkpID0+IHtcbiAgICAvLyAgICAgICBpZiAobW9kZWwuaXNBbmtpU3BhY2UgPT09IGlzQW5raVNwYWNlKSB7XG4gICAgLy8gICAgICAgICBtb2RlbE5hbWUgPSBtb2RlbC5tb2RlbE5hbWVcbiAgICAvLyAgICAgICAgIGZpZWxkMSA9IG1vZGVsLmZpZWxkMVxuICAgIC8vICAgICAgICAgZmllbGQyID0gbW9kZWwuZmllbGQyXG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICB9KTtcbiAgICAvLyAgICAgcmV0dXJuIHtcbiAgICAvLyAgICAgICAnbW9kZWxOYW1lJzogbW9kZWxOYW1lLFxuICAgIC8vICAgICAgICdmaWVsZDEnOiBmaWVsZDEsXG4gICAgLy8gICAgICAgJ2ZpZWxkMic6IGZpZWxkMlxuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy8gICBpZiAodXNlckluZm8/LmFua2kpIHtcbiAgICAvLyAgICAgY29uc3QgdGhpc0RlY2sgPSBkZWNrID8gZGVjayA6IHVzZXJJbmZvPy5hbmtpLmRlZmF1bHREZWNrTmFtZVxuICAgIC8vICAgICBjb25zdCBhbmtpSW5mbyA9IHNldEFua2lJbmZvKHVzZXJJbmZvPy5hbmtpKVxuICAgIC8vICAgICAvLyDmt7vliqDliLAgQW5raSDkuK1cbiAgICAvLyAgICAgYWRkVG9BbmtpKHRoaXNEZWNrLCBhbmtpSW5mby5tb2RlbE5hbWUhLCBhbmtpSW5mby5maWVsZDEhLCBhbmtpSW5mby5maWVsZDIhKVxuICAgIC8vICAgfSBlbHNlIHtcbiAgICAvLyAgICAgLy8g6I635Y+WIEFua2kg54mM57uE5L+h5oGvXG4gICAgLy8gICAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ3NldE1vZGVsJywgJ21lc3NhZ2VzJzoge30sIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIC8vICAgICAgIGlmIChyZXN1bHQucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcbiAgICAvLyAgICAgICAgIGNvbnN0IGFua2lJbmZvID0gc2V0QW5raUluZm8ocmVzdWx0LmRhdGEpXG4gICAgLy8gICAgICAgICBjb25zdCB0aGlzRGVjayA9IGRlY2sgPyBkZWNrIDogdXNlckluZm8/LmFua2kuZGVmYXVsdERlY2tOYW1lXG4gICAgLy8gICAgICAgICAvLyDmt7vliqDliLAgQW5raSDkuK1cbiAgICAvLyAgICAgICAgIGFkZFRvQW5raSh0aGlzRGVjayEsIGFua2lJbmZvLm1vZGVsTmFtZSEsIGFua2lJbmZvLmZpZWxkMSEsIGFua2lJbmZvLmZpZWxkMiEpXG4gICAgLy8gICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgIC8vIOWPjemmiOmUmeivr+S/oeaBr1xuICAgIC8vICAgICAgICAgYWxlcnQocmVzdWx0LmVycm9yLmVycm9yKVxuICAgIC8vICAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdub3JtYWwnLCAnbm90ZUlkJzogMCB9KVxuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgfSlcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gICAgLy8gR1BUIOeUn+aIkOa2iOaBr+aXtu+8jOiHquWKqOWumuS9jeWIsOa2iOaBr+WIl+ihqOW6lemDqO+8jOaWueS+v+eUqOaIt+mYheivu1xuICAgIGZ1bmN0aW9uIHNjcm9sbFRvQm90dG9tKGNhblNyb2xsID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQuY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2luZG93RWxlbWVudC5jdXJyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250YWluZXInKVswXTtcbiAgICAgICAgICAgIGlmIChjYW5Tcm9sbCkge1xuICAgICAgICAgICAgICAgIC8vIOS9jeS6juW6lemDqO+8jOmcgOimgeiHquWKqOa7muWKqFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSBjb250YWluZXIuc2Nyb2xsSGVpZ2h0ICsgMjA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgb3BlbkN1c3RvbVByb21wdEZvcm0gPSAoZGF0YSkgPT4ge1xuICAgICAgICAvLyDlvIDlkK/miJblhbPpl63oh6rlrprkuYkgUHJvbXB0IOihqOWNlVxuICAgICAgICBzZXRQb3BvdmVyT3BlbihkYXRhLmlzT3Blbik7XG4gICAgICAgIC8vIOiuvue9ruihqOWNleeahOm7mOiupOiuvue9rlxuICAgICAgICBpZiAoZGF0YS5pc09wZW4pIHtcbiAgICAgICAgICAgIHNldEN1c3RvbVByb21wdEZvcm1EYXRhKGRhdGEuZGF0YSk7XG4gICAgICAgICAgICAvLyDlvIDlkK/ooajljZVcbiAgICAgICAgICAgIC8vIGFtcGxpdHVkZS50cmFjaygnb3BlbkN1c3RvbVByb21wdEZvcm0nKTtcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAnb3BlbkN1c3RvbVByb21wdEZvcm0nIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIOW8gOWQr+ihqOWNleWQjuemgeatoueCueWHu+eql+WPo+WkluWMuuWfn+WFs+mXreeql+WPo1xuICAgICAgICAoMCwgY29udGVudFNjcmlwdF8xLnNldERvbm90Q2xvc2VQb3B1cENhcmQpKGRhdGEuaXNPcGVuKTtcbiAgICB9O1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChTY291dGVyRGl2LCB7IGlkOiBcIkxlYXJuaW5nRW5nbGlzaDIwMjNcIiwgcmVmOiB3aW5kb3dFbGVtZW50LCBzdHlsZToge1xuICAgICAgICAgICAgICAgIGxlZnQ6IDEwLFxuICAgICAgICAgICAgICAgIHRvcDogMTAsXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQ29uZmlnUHJvdmlkZXIsIHsgdGhlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yUHJpbWFyeTogJyNGMDhBMjQnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChOYXZfMS5OYXZcbiAgICAgICAgICAgICAgICAvLyBoYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2s9e2hhbmRsZVNhdmVUb0Fua2lCdG5DbGlja31cbiAgICAgICAgICAgICAgICAsIHsgXG4gICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljaz17aGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrfVxuICAgICAgICAgICAgICAgICAgICBhZGRUb0Fua2lTdGF0dXM6IGFkZFRvQW5raVN0YXR1cywgb25Nb3VzZURvd246IGhhbmRsZU1vdXNlRG93biwgaGFuZGxlTWVudUl0ZW1DbGljazogZXhlY3V0aXZlUHJvbXB0LCBvcGVuQ3VzdG9tUHJvbXB0Rm9ybTogb3BlbkN1c3RvbVByb21wdEZvcm0sIGlzT3Blbk1lbnU6IGlzT3Blbk1lbnUsIHByb21wdHM6IHByb21wdHMsIGxhc3RFeGVjdXRlZFByb21wdDogbGFzdEV4ZWN1dGVkUHJvbXB0LCBrZXlXb3JkOiBwcm9wcy5kYXRhLmtleVdvcmQsIFNlbnRlbmNlOiBwcm9wcy5kYXRhLlNlbnRlbmNlLCB3aW5kb3dFbGVtZW50OiB3aW5kb3dFbGVtZW50LmN1cnJlbnQgfSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdjb250YWluZXIgZmxleC1ncm93IGZsZXggZmxleC1jb2wgb3ZlcmZsb3ctYXV0bycsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6ICc0OHB4J1xuICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnZmxleC1ncm93JywgcmVmOiBtZXNzYWdlc0xpc3QsIHN0eWxlOiB7fSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0aW9uXzEuU2VsZWN0aW9uLCB7IHRleHQ6IHByb3BzLmRhdGEua2V5V29yZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VfMS5NZXNzYWdlc0xpc3QsIHsgbWVzc2FnZXM6IG1lc3NhZ2VzIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtZXNzYWdlc1ttZXNzYWdlcy5sZW5ndGggLSAxXS5wcm9tcHQgPT09ICcnID8gJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUmVnZW5lcmF0ZUJ1dHRvbl8xLlJlZ2VuZXJhdGVCdXR0b24sIHsgbWVzc2FnZXM6IG1lc3NhZ2VzLCBoYW5kbGVSZWdlbmVyYXRlQnV0dG9uQ2xpY2s6IGhhbmRsZVJlZ2VuZXJhdGVCdXR0b25DbGljayB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2ZvbGxvd1VwTWVudUJveCcsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHNob3dGb2xsb3dVcERhdGFNZW51LnNob3cgPyAnYmxvY2snIDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ2ZpdC1jb250ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvbXB0TGlzdF8xLlByb21wdExpc3QsIHsgZm9sbG93VXBEYXRhOiBmb2xsb3dVcERhdGEsIHNob3dGb2xsb3dVcERhdGFNZW51OiBzaG93Rm9sbG93VXBEYXRhTWVudSwgcHJvbXB0TGlzdDogcHJvbXB0cywgaGFuZGxlTWVudUl0ZW1DbGljazogZXhlY3V0aXZlUHJvbXB0IH0pKSkpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFVzZXJNZXNzYWdlSW5wdXRfMS5Vc2VyTWVzc2FnZUlucHV0LCB7IG1lc3NhZ2VzOiBtZXNzYWdlcywgaGFuZGxlU2VuZE1lc3NhZ2U6IGhhbmRsZVNlbmRNZXNzYWdlIH0pLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5EcmF3ZXIsIHsgdGl0bGU6IGN1c3RvbVByb21wdEZvcm1EYXRhLmlkID09PSAnJyA/IFwiQ3JlYXRlIFByb21wdFwiIDogXCJFZGl0IFByb21wdFwiLCBwbGFjZW1lbnQ6IFwiYm90dG9tXCIsIGNsb3NhYmxlOiBmYWxzZSwgaGVpZ2h0OiAnMTAwJScsIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25DbG9zZT17b25DbG9zZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46IGlzUG9wb3Zlck9wZW4sIGdldENvbnRhaW5lcjogZmFsc2UsIGV4dHJhOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuU3BhY2UsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZTogeyB6SW5kZXg6ICc5JyB9LCBvbkNsaWNrOiAoKSA9PiBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogZmFsc2UsIGRhdGE6IHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9IH0pIH0sIFwiQ2FuY2VsXCIpKSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBiYWNrZ3JvdW5kQ29sb3I6ICdyZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICcwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnNjRweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ2FsbC1zY3JvbGwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgb25Nb3VzZURvd246IGhhbmRsZU1vdXNlRG93biB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEN1c3RvbVByb21wdEZvcm1fMS5DdXN0b21Qcm9tcHRGb3JtLCB7IG9wZW5DdXN0b21Qcm9tcHRGb3JtOiBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSwgaGFuZGxlUHJvbXB0RWRpdGVkOiBoYW5kbGVQcm9tcHRFZGl0ZWQsIGRhdGE6IGN1c3RvbVByb21wdEZvcm1EYXRhIH0pKSkpKSkpO1xufVxuZXhwb3J0cy5Qb3B1cENhcmQgPSBQb3B1cENhcmQ7XG47XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucG9wdXBDYXJkU3R5bGUgPSB2b2lkIDA7XG5leHBvcnRzLnBvcHVwQ2FyZFN0eWxlID0gYFxuLnNsaWNrLWFycm93OjpiZWZvcmV7XG4gIGNvbnRlbnQ6XCJcIiAhaW1wb3J0YW50O1xufVxuXG4uYW5raVNwYWNlIHtcbiAgY29sb3I6I0YwOEEyNDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYW5raVNwYWNlOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjojRjA4QTI0O1xuICBjb2xvcjojZmZmZmZmO1xufVxuXG4uY29udGV4dEJveCwuZm9sbG93VXBNZW51IHtcbiAgZGlzcGxheTogZmxleDtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuICBwYWRkaW5nOiA0cHggOHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNik7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm94LXNoYWRvdzogMHB4IDhweCAyOHB4IHJnYmEoMCwwLDAsLjE2KTtcbiAgei1pbmRleDo5O1xuXG59XG5cbi5jb250ZXh0Qm94IHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLy8gLmNvbnRleHRCb3ggKiB7XG4vLyAgIGN1cnNvcjogZGVmYXVsdDtcbi8vICAgcGFkZGluZzogMnB4O1xuLy8gfVxuXG4vLyAuYW5raVNwYWNlQnV0dG9uQm94IHtcbi8vICAgZGlzcGxheTogZmxleDtcbi8vICAgZmxleC1kaXJlY3Rpb246IHJvdztcbi8vICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4vLyAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjEyKTtcbi8vICAgcGFkZGluZy1yaWdodDogMTBweDtcbi8vIH1cblxuLy8gLnNldEFua2lTcGFjZUJ1dHRvbjpmaXJzdC1vZi10eXBlIHtcbi8vICAgbWFyZ2luLXJpZ2h0OjhweDtcbi8vIH1cblxuLy8gLmxvb2tVcEJ1dHRvbiB7XG4vLyAgIHdpZHRoOiAxOHB4O1xuLy8gICBoZWlnaHQ6IDE4cHg7XG4vLyAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbi8vICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbi8vICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuLy8gfVxuXG4vLyAuYW5raVNwYWNlQnV0dG9uQm94ICo6aG92ZXIge1xuICBcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLDAsNTksMC4wNTEpO1xuLy8gICBib3JkZXItcmFkaXVzOiAycHg7XG5cbi8vIH1cblxuLmFudC1jYXJvdXNlbCAuc2xpY2stcHJldixcbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLW5leHQsXG4uYW50LWNhcm91c2VsIC5zbGljay1wcmV2OmhvdmVyLFxuLmFudC1jYXJvdXNlbCAuc2xpY2stbmV4dDpob3ZlciB7XG4gIGZvbnQtc2l6ZTogaW5oZXJpdDtcbiAgY29sb3I6IGN1cnJlbnRDb2xvcjtcbn1cblxuLmFudC1jYXJvdXNlbCAuc2xpY2stcHJldixcbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLXByZXY6aG92ZXIge1xuICBsZWZ0OiAxMHB4O1xuICB6LWluZGV4OiAyO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLW5leHQsXG4uYW50LWNhcm91c2VsIC5zbGljay1uZXh0OmhvdmVyIHtcbiAgcmlnaHQ6IDEwcHg7XG4gIHotaW5kZXg6IDI7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmltYWdlcyBpbWcge1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xufVxuXG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIGgxLCNMZWFybmluZ0VuZ2xpc2gyMDIzIGgyLCNMZWFybmluZ0VuZ2xpc2gyMDIzIGgze1xuICBtYXJnaW46IDEwcHggMDtcbn1cblxuLy8gI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDF7XG4vLyAgIGZvbnQtc2l6ZToyMHB4O1xuLy8gfVxuLy8gI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDJ7XG4vLyAgIGZvbnQtc2l6ZToxN3B4O1xuLy8gfVxuXG4vLyAjTGVhcm5pbmdFbmdsaXNoMjAyMyB7XG4vLyBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcbi8vIHdpZHRoOiAzOTBweDtcbi8vIGhlaWdodDogNTYwcHg7XG4vLyBjb2xvcjogcmdiKDAgMCAwIC8gODAlKTtcbi8vIHBvc2l0aW9uOiBmaXhlZDtcbi8vIGRpc3BsYXk6IGZsZXg7XG4vLyBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuLy8gZm9udC1zaXplOiAxMy4ycHg7XG4vLyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuLy8gei1pbmRleDogOTk5OTtcbi8vIG92ZXJmbG93OiBoaWRkZW47XG4vLyBib3gtc2hhZG93OiAwcHggOHB4IDI4cHggcmdiYSgwLDAsMCwuMTYpO1xuLy8gYm9yZGVyLXJhZGl1czogNnB4O1xuLy8gYm9yZGVyOjFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNilcbi8vIH1cblxuOjpzZWxlY3Rpb24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZENUIyO1xufVxuXG46Oi1tb3otc2VsZWN0aW9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRDVCMjtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLmNvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXIgIHtcbiAgLy8gd2lkdGg6MHB4O1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAuY29udGFpbmVyOjotd2Via2l0LXNjcm9sbGJhci10cmFjayAge1xuICAvLyBiYWNrZ3JvdW5kOiAjZmZmOyAvKiDorr7nva7mu5rliqjmnaHovajpgZPog4zmma/oibIgKi9cbn1cblxuLy8gI0xlYXJuaW5nRW5nbGlzaDIwMjMgLmNvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuLy8gICBiYWNrZ3JvdW5kOiAjODg4OyAvKiDorr7nva7mu5rliqjmnaHmu5HlnZfog4zmma/oibIgKi9cbi8vIH1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLkRyb3Bkb3duTWVudUl0ZW06aG92ZXIge1xuICBcbiAgYmFja2dyb3VuZC1jb2xvcjojRjZGNkY2O1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAuRHJvcGRvd25NZW51SXRlbTpmb2N1cy12aXNpYmxlIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDEsI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDIsI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDMge1xuXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDApO1xuXG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzICNTY291dGVyU2VsZWN0aW9uLCAjTGVhcm5pbmdFbmdsaXNoMjAyMyAubWVzc2FnZXM+ZGl2ICB7XG4gIHBhZGRpbmctbGVmdDoxOHB4O1xuICBwYWRkaW5nLXJpZ2h0OjE4cHg7XG59XG5cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLnVzZXJJbnB1dCB7XG5tYXJnaW46IDEwcHggMDtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLmNvbnRlbnRCb3gge1xub3ZlcmZsb3c6IHNjcm9sbDtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLm1lc3NhZ2VzID4gKiA+ICoge1xuICAvLyBtYXJnaW46IDE4cHggMDtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgI1Njb3V0ZXJOYXYge1xuLy8gZGlzcGxheTogZmxleDtcbi8vIGp1c3RpZnktY29udGVudDogc3RhcnQ7XG4vLyBhbGlnbi1pdGVtczogY2VudGVyO1xuLy8gcGFkZGluZy10b3A6IDEycHg7XG4vLyBwYWRkaW5nLWJvdHRvbTogMTJweDtcbi8vIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNik7XG4vLyB1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgI1Njb3V0ZXJOYXYgaW1nIHtcbi8vIHdpZHRoOiBhdXRvO1xuLy8gaGVpZ2h0OiAyNHB4O1xuLy8gbWFyZ2luLXJpZ2h0OiA2cHg7XG59XG5cbi5tZXNzYWdlcyB1bHtcbiAgbGlzdC1zdHlsZTpkaXNjO1xuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG59XG5cbi5tZXNzYWdlcyBvbHtcbiAgbGlzdC1zdHlsZTphdXRvO1xuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5pc1BpbiBwYXRoe1xuICBmaWxsOiAjRjA4QTI0O1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAucmlnaHRCdG5Cb3ggYnV0dG9uIHtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAucmlnaHRCdG5Cb3ggYnV0dG9uIHNwYW46bGFzdC1vZi10eXBle1xuICBcbn1cblxudGFibGUgdHIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBwYWRkaW5nOiA1cHg7XG59XG50YWJsZSB0aCwgdGFibGUgdGQge1xuICBwYWRkaW5nOiAxMHB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxudGFibGUgdGgge1xuICAvLyBmb250LXNpemU6IDE0cHg7XG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi8vIC8qIOa7muWKqOadoeS7peWPiua7muWKqOadoei9qOmBk+eahOWuveW6piAqL1xuLy8gOjotd2Via2l0LXNjcm9sbGJhciB7XG4vLyAgICAgd2lkdGg6IDEwcHg7XG4vLyB9XG5cbi8vIC8qIOa7muWKqOadoei9qOmBk+eahOagt+W8jyovXG4vLyA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICBcbi8vIH1cblxuLy8gLyog5rua5Yqo5p2h55qE5qC35byPICovXG4vLyA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbi8vICAgICBiYWNrZ3JvdW5kOiAjODg4OyBcbi8vIH1cblxuLy8gLyog5b2T5L2g6byg5qCH5oKs5YGc5Zyo5rua5Yqo5p2h5LiK5pe255qE5qC35byPICovXG4vLyA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHtcbi8vICAgICBiYWNrZ3JvdW5kOiAjNTU1OyBcbi8vIH1cblxuLyog5rua5Yqo5p2hICovXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvcml6b250YWwgeyAvKuawtOW5s+a7muWKqOadoeeahOagt+W8jyovXG4gIHdpZHRoOiA0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNDMUMxQzE7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNnB4O1xufVxuOjotd2Via2l0LXNjcm9sbGJhci10cmFjay1waWVjZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7IC8q5rua5Yqo5p2h55qE6IOM5pmv6aKc6ImyKi9cbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAwOyAvKua7muWKqOadoeeahOWchuinkuWuveW6piovXG59XG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgd2lkdGg6IDEwcHg7IC8q5rua5Yqo5p2h55qE5a695bqmKi9cbiAgaGVpZ2h0OiA4cHg7IC8q5rua5Yqo5p2h55qE6auY5bqmKi9cbn1cbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6dmVydGljYWwgeyAvKuWeguebtOa7muWKqOadoeeahOagt+W8jyovXG4gIGhlaWdodDogNTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzk5OTtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA0cHg7XG4gIG91dGxpbmU6IDJweCBzb2xpZCAjZmZmO1xuICBvdXRsaW5lLW9mZnNldDogLTJweDtcbiAgYm9yZGVyOiAycHggc29saWQgI2ZmZjtcbn1cbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIgeyAvKua7muWKqOadoeeahGhvdmVy5qC35byPKi9cbiAgaGVpZ2h0OiA1MHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWY5ZjlmO1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxucHJlIHtcbmJhY2tncm91bmQtY29sb3I6ICNmMGYwZjA7XG5ib3JkZXItcmFkaXVzOiA1cHg7XG5wYWRkaW5nOiAxNXB4O1xuYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbmNvbG9yOiAjMzMzO1xuZm9udC1mYW1pbHk6IENvdXJpZXIsIG1vbm9zcGFjZTtcbmxpbmUtaGVpZ2h0OiAxLjI7XG5vdmVyZmxvdy14OiBhdXRvO1xud2hpdGUtc3BhY2U6IHByZTtcbn1cblxuYmxvY2txdW90ZSB7XG5wYWRkaW5nOiAxMHB4IDIwcHg7XG5tYXJnaW46IDAgMCAyMHB4O1xuYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCAjZjFmMWYxO1xuY29sb3I6ICM2NjY7XG5iYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xufVxuXG5gO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0SW5pdGlhbFByb21wdCA9IGV4cG9ydHMuZ2V0RGVmYXVsdFByb21wdCA9IGV4cG9ydHMuaGFuZGxlSGlnaHRsaWdodCA9IGV4cG9ydHMuZ2V0QW5raUNhcmRzID0gZXhwb3J0cy5oYW5kbGVQcm9tcHRWYXJpYWJsZXMgPSBleHBvcnRzLmdldFVuc3BsYXNoSW1hZ2VzID0gZXhwb3J0cy53aW5kb3dJbml0aWFsaXphdGlvbiA9IGV4cG9ydHMuZ2V0Q2xpcGJvYXJkID0gZXhwb3J0cy5kZWZhdWx0UHJvbXB0ID0gZXhwb3J0cy5kaWN0aW9uYXJ5UHJvbXB0ID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vT3B0aW9ucy91dGlsXCIpO1xuZXhwb3J0cy5kaWN0aW9uYXJ5UHJvbXB0ID0ge1xuICAgIHRpdGxlOiAnRGljdGlvbmFyeScsXG4gICAgaWQ6ICdkaWN0JyxcbiAgICBnZXRVbnNwbGFzaEltYWdlczogdHJ1ZSxcbiAgICB1c2VyUHJvbXB0OiAnJyxcbn07XG5leHBvcnRzLmRlZmF1bHRQcm9tcHQgPSB7XG4gICAgdGl0bGU6ICdEaWN0aW9uYXJ5JyxcbiAgICBpZDogJ2RpY3QnLFxuICAgIGdldFVuc3BsYXNoSW1hZ2VzOiB0cnVlLFxuICAgIHVzZXJQcm9tcHQ6ICcnLFxufTtcbmNvbnN0IGdldENsaXBib2FyZCA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLnJlYWRUZXh0KClcbiAgICAgICAgICAgIC50aGVuKHRleHQgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0ZXh0KTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbmV4cG9ydHMuZ2V0Q2xpcGJvYXJkID0gZ2V0Q2xpcGJvYXJkO1xuY29uc3Qgd2luZG93SW5pdGlhbGl6YXRpb24gPSAoZGF0YSkgPT4ge1xuICAgIC8vIOiuvue9rueql+WPo+eahOm7mOiupOS9jee9rlxuICAgIGlmIChkYXRhLndpbmRvd0VsZW1lbnQuY3VycmVudCAmJiAhZGF0YS5pc1Bpbikge1xuICAgICAgICAvLyBDaGVjayB0aGUgYm91bmRhcmllc1xuICAgICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRXaWR0aCA9IGRhdGEud2luZG93RWxlbWVudC5jdXJyZW50LmNsaWVudFdpZHRoO1xuICAgICAgICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gZGF0YS53aW5kb3dFbGVtZW50LmN1cnJlbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICBjb25zdCBtaW5YID0gMDtcbiAgICAgICAgY29uc3QgbWluWSA9IDA7XG4gICAgICAgIGNvbnN0IG1heFggPSB3aW5kb3dXaWR0aCAtIGVsZW1lbnRXaWR0aDtcbiAgICAgICAgY29uc3QgbWF4WSA9IHdpbmRvd0hlaWdodCAtIGVsZW1lbnRIZWlnaHQ7XG4gICAgICAgIGxldCBuZXdYLCBuZXdZID0gMDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbk9iamVjdCA9IGRhdGEuc2VsZWN0aW9uLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBuZXdYID0gc2VsZWN0aW9uT2JqZWN0LnggKyBzZWxlY3Rpb25PYmplY3Qud2lkdGggKyAxMDtcbiAgICAgICAgICAgIG5ld1kgPSBzZWxlY3Rpb25PYmplY3QueSArIHNlbGVjdGlvbk9iamVjdC5oZWlnaHQgKyAxMDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjbGFtcGVkWCA9IE1hdGgubWF4KG1pblgsIE1hdGgubWluKG5ld1gsIG1heFgpKTtcbiAgICAgICAgY29uc3QgY2xhbXBlZFkgPSBNYXRoLm1heChtaW5ZLCBNYXRoLm1pbihuZXdZLCBtYXhZKSk7XG4gICAgICAgIGRhdGEud2luZG93RWxlbWVudC5jdXJyZW50LnN0eWxlLmxlZnQgPSBgJHtjbGFtcGVkWH1weGA7XG4gICAgICAgIGRhdGEud2luZG93RWxlbWVudC5jdXJyZW50LnN0eWxlLnRvcCA9IGAke2NsYW1wZWRZfXB4YDtcbiAgICB9XG4gICAgLy8gLy8g5re75Yqg5rua5Yqo5LqL5Lu277yM6K6p5raI5oGv5YiX6KGo6Ieq5Yqo5rua5Yqo5Yiw5bqV6YOoXG4gICAgLy8gZGF0YS5tZXNzYWdlc0xpc3QuY3VycmVudD8uYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVTY3JvbGwpO1xuICAgIC8vIHJldHVybiAoKSA9PiB7XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKCd1c2VFZmZlY3QgcmV0dXJuJyk7XG4gICAgLy8gICAgIGRhdGEubWVzc2FnZXNMaXN0LmN1cnJlbnQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlU2Nyb2xsKTtcbiAgICAvLyB9O1xuICAgIC8vIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbCgpIHtcbiAgICAvLyAgICAgaWYgKGRhdGEubWVzc2FnZXNMaXN0LmN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAvLyAgICAgICAgIGNvbnN0IGlzQXRCb3R0b20gPSBkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50Py5zY3JvbGxUb3AgKyBkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50LmNsaWVudEhlaWdodCA+PSBkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50LnNjcm9sbEhlaWdodCAtIDAuNTtcbiAgICAvLyAgICAgICAgIGlmIChpc0F0Qm90dG9tKSB7XG4gICAgLy8gICAgICAgICAgICAgLy8g5bey57uP5L2N5LqO5bqV6YOo77yM5LiN6ZyA6KaB6Ieq5Yqo5rua5YqoXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICAvLyBzY3JvbGxUb0JvdHRvbSgpXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgLy8g5pyq5L2N5LqO5bqV6YOo77yM5LiN5omn6KGM6Ieq5Yqo5rua5YqoXG4gICAgLy8gfVxufTtcbmV4cG9ydHMud2luZG93SW5pdGlhbGl6YXRpb24gPSB3aW5kb3dJbml0aWFsaXphdGlvbjtcbi8qKlxuICog6I635Y+WIFVuc3BsYXNoIOWbvueJh1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlXb3JkIC0g5qC55o2u5q2k5YWz6ZSu5a2X5pCc57Si5Zu+54mHXG4gKiBAcmV0dXJucyB7QXJyYXl9IOWbvueJh+WIl+ihqFxuICogQHRocm93cyB75byC5bi457G75Z6LfSDlvILluLjmj4/ov7BcbiAqL1xuY29uc3QgZ2V0VW5zcGxhc2hJbWFnZXMgPSAoa2V5V29yZCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIOivt+axgiBiYWNrZ3JvdW5kIOiOt+WPluaVsOaNrlxuICAgICAgICAvLyDkvb/nlKjplb/ov57mjqVcbiAgICAgICAgLy8gbGV0IHBvcnQgPSBicm93c2VyLnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgICAgIC8vICAgICBuYW1lOiAnZnJvbVBvcHVwQ2FyZFV0aWwnXG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIOS9v+eUqCBwb3N0TXMg5Y+R6YCB5L+h5oGvXG4gICAgICAgIGxldCBzZW5kaW5nID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnZ2V0VW5zcGxhc2hJbWFnZXMnLCAnbWVzc2FnZXMnOiAnJywgJ2tleVdvcmQnOiBrZXlXb3JkIH0pO1xuICAgICAgICBzZW5kaW5nLnRoZW4oKG1zZykgPT4ge1xuICAgICAgICAgICAgaWYgKG1zZy50eXBlID09PSAnc2VuZEltZ0RhdGEnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCdpbWdzJyBpbiBtc2cpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3Vuc3BsYXNoU2VhcmNoUGhvdG9zJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobXNnLmltZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgLy9lcnJvclxuICAgICAgICB9KTtcbiAgICAgICAgLy8gLy8g5o6l5pS25L+h5oGvXG4gICAgICAgIC8vIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKG1zZyA9PiB7XG4gICAgICAgIC8vICAgICBpZiAobXNnLnR5cGUgPT09ICdzZW5kSW1nRGF0YScpIHtcbiAgICAgICAgLy8gICAgICAgICBpZiAoJ2ltZ3MnIGluIG1zZykge1xuICAgICAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndW5zcGxhc2hTZWFyY2hQaG90b3MnKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgcmVzb2x2ZShtc2cuaW1ncylcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pXG4gICAgfSk7XG59O1xuZXhwb3J0cy5nZXRVbnNwbGFzaEltYWdlcyA9IGdldFVuc3BsYXNoSW1hZ2VzO1xuLyoqXG4gKiDlpITnkIYgUHJvbXB0IOS4reeahOWPmOmHj1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9tcHRTdHIgLSDpnIDopoHlpITnkIbnmoQgUHJvbXB0IOWtl+espuS4slxuICogQHBhcmFtIHtzdHJpbmd9IGtleVdvcmQgLSDnlKjmiLfmiYDpgInkuK3nmoTlhbPplK7lrZdcbiAqIEBwYXJhbSB7c3RyaW5nfSBTZW50ZW5jZSAtIOS7jue9kemhteS4reaPkOWPlueahOWFs+mUruWtl+aJgOWcqOeahOWPpeWtkFxuICogQHJldHVybnMge3N0cmluZ30g5aSE55CG5ZCO55qEIFByb21wdCDlrZfnrKbkuLJcbiAqIEB0aHJvd3Mge+W8guW4uOexu+Wei30g5byC5bi45o+P6L+wXG4gKi9cbmNvbnN0IGhhbmRsZVByb21wdFZhcmlhYmxlcyA9IChwcm9tcHRTdHIsIGtleVdvcmQsIFNlbnRlbmNlLCBMYW5nKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBsZXQgbmV3UHJvbXB0U3RyID0gcHJvbXB0U3RyO1xuICAgIC8vIOWkhOeQhuWFs+mUruWtl+WSjOWPpeWtkFxuICAgIG5ld1Byb21wdFN0ciA9IHByb21wdFN0ci5yZXBsYWNlKC9cXHtzZWxlY3Rpb25cXH0vZywga2V5V29yZCk7XG4gICAgbmV3UHJvbXB0U3RyID0gbmV3UHJvbXB0U3RyLnJlcGxhY2UoL1xce3NlbnRlbmNlXFx9L2csIFNlbnRlbmNlKTtcbiAgICAvLyDlpITnkIbor63oqIBcbiAgICBuZXdQcm9tcHRTdHIgPSBuZXdQcm9tcHRTdHIucmVwbGFjZSgvXFx7bmF0aXZlTGFuZ3VhZ2VcXH0vZywgTGFuZ1snY3VycmVudCddWyduYW1lJ10pO1xuICAgIG5ld1Byb21wdFN0ciA9IG5ld1Byb21wdFN0ci5yZXBsYWNlKC9cXHtjdXJyZW50TGFuZ3VhZ2VcXH0vZywgTGFuZ1snY3VycmVudCddWyduYW1lJ10pO1xuICAgIG5ld1Byb21wdFN0ciA9IG5ld1Byb21wdFN0ci5yZXBsYWNlKC9cXHt0YXJnZXRMYW5ndWFnZVxcfS9nLCBMYW5nWyd0YXJnZXQnXVsnbmFtZSddKTtcbiAgICAvLyDlpITnkIYgQW5raSDljZXor41cbiAgICBpZiAobmV3UHJvbXB0U3RyLmluZGV4T2YoJ3thbmtpQ2FyZHN9JykgPj0gMCkge1xuICAgICAgICAvLyDojrflj5bnm67moIfljaHniYdcbiAgICAgICAgbGV0IHJhbmRvbVZhbHVlcztcbiAgICAgICAgbGV0IGFua2lDYXJkc1N0ciA9ICcnO1xuICAgICAgICB5aWVsZCAoMCwgZXhwb3J0cy5nZXRBbmtpQ2FyZHMpKCkudGhlbigoY2FyZHMpID0+IHtcbiAgICAgICAgICAgIHJhbmRvbVZhbHVlcyA9IGNhcmRzO1xuICAgICAgICAgICAgaWYgKHJhbmRvbVZhbHVlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChyYW5kb21WYWx1ZXMubGVuZ3RoID4gNSkge1xuICAgICAgICAgICAgICAgICAgICAvLyDpmo/mnLrlj5YgWCDkuKrljaHniYdcbiAgICAgICAgICAgICAgICAgICAgLy8g5rex5ou36LSd5pWw57uE5Lul6YG/5YWN5L+u5pS55rqQ5pWw57uEXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNodWZmbGVkQXJyYXkgPSByYW5kb21WYWx1ZXMuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8g5L2/55SoIEZpc2hlci1ZYXRlcyDmtJfniYznrpfms5Xlr7nmlbDnu4Tov5vooYzmiZPkubFcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHNodWZmbGVkQXJyYXkubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgW3NodWZmbGVkQXJyYXlbaV0sIHNodWZmbGVkQXJyYXlbal1dID0gW3NodWZmbGVkQXJyYXlbal0sIHNodWZmbGVkQXJyYXlbaV1dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIOWPluWJjSB4IOS4quWFg+e0oOS9nOS4uue7k+aenFxuICAgICAgICAgICAgICAgICAgICByYW5kb21WYWx1ZXMgPSBzaHVmZmxlZEFycmF5LnNsaWNlKDAsIDUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g5bCG5Y2V6K+N5pu/5o2i5YiwIHByb21wdCDkuK1cbiAgICAgICAgICAgICAgICByYW5kb21WYWx1ZXMgPT09IG51bGwgfHwgcmFuZG9tVmFsdWVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYW5kb21WYWx1ZXMuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY2FyZC5maWVsZHMpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3RLZXkgPSBrZXlzWzBdO1xuICAgICAgICAgICAgICAgICAgICAvLyDmib7liLDljaHniYfmraPpnaJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZC5maWVsZHNba2V5c1tpXV0ub3JkZXIgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYW5raUNhcmRzU3RyICs9IGNhcmQuZmllbGRzW2ZpcnN0S2V5XS52YWx1ZSArICcsJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBuZXdQcm9tcHRTdHIgPSBuZXdQcm9tcHRTdHIucmVwbGFjZSgvXFx7YW5raUNhcmRzXFx9L2csIGFua2lDYXJkc1N0cik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1Byb21wdFN0cjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBuZXdQcm9tcHRTdHIgPSBuZXdQcm9tcHRTdHIucmVwbGFjZSgvXFx7YW5raUNhcmRzXFx9L2csICcnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdQcm9tcHRTdHI7XG59KTtcbmV4cG9ydHMuaGFuZGxlUHJvbXB0VmFyaWFibGVzID0gaGFuZGxlUHJvbXB0VmFyaWFibGVzO1xuLyoqXG4gKiDojrflj5YgQW5raSDljaHniYdcbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0W119IOi/lOWbnuWNoeeJh+eahOWvueixoeWIl+ihqFxuICogQHRocm93cyB75byC5bi457G75Z6LfSDlvILluLjmj4/ov7BcbiAqL1xuY29uc3QgZ2V0QW5raUNhcmRzID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIOWIpOaWreacrOWcsOaYr+WQpuWtmOacieacqui/h+acn+eahOaVsOaNrlxuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuZ2V0KHsgXCJhbmtpQ2FyZHNcIjogeyAnY2FyZHMnOiBbXSwgJ3RpbWUnOiAwIH0gfSkudGhlbigoaXRlbSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAvLyDnvJPlrZggMSDlsI/ml7ZcbiAgICAgICAgICAgIGlmIChpdGVtLmFua2lDYXJkcy5jYXJkcy5sZW5ndGggPiAwICYmIERhdGUubm93KCkgLSBpdGVtLmFua2lDYXJkcy50aW1lIDwgMzYwMCAqIDEwMDApIHtcbiAgICAgICAgICAgICAgICAvLyDoi6XmnKzlnLDmnInlj6/nlKjnmoTmlbDmja7vvIzliJnnm7TmjqXlpITnkIZcbiAgICAgICAgICAgICAgICByZXNvbHZlKGl0ZW0uYW5raUNhcmRzLmNhcmRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOiLpeacrOWcsOaXoOWPr+eUqOeahOaVsOaNru+8jOWImemAmui/hyBBbmtpXG4gICAgICAgICAgICAgICAgeWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW5raUFjdGlvbicsICdtZXNzYWdlcyc6IHsgJ2Fua2lfYWN0aW9uX3R5cGUnOiAnZmluZENhcmRzJywgJ2Fua2lfYXJndW1lbnRzJzogeyAncXVlcnknOiAnaXM6ZHVlIHByb3A6ZHVlPi0yIHByb3A6ZHVlPDMnIH0gfSwgfSkudGhlbigobWVzc2FnZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmVycm9yID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmoLnmja7ljaHniYcgSUQg5p+l6K+i5Y2h54mH5L+h5oGvXG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbmtpQWN0aW9uJywgJ21lc3NhZ2VzJzogeyAnYW5raV9hY3Rpb25fdHlwZSc6ICdjYXJkc0luZm8nLCAnYW5raV9hcmd1bWVudHMnOiB7ICdjYXJkcyc6IG1lc3NhZ2UucmVzdWx0IH0gfSwgfSkudGhlbigobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYXJkcyA9IG1lc3NhZ2UucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWwhuaVsOaNruWtmOWCqOWIsOacrOWcsO+8jOmZkOWItuacgOWkp+S/neWtmOaVsOmHj++8jOmBv+WFjeacrOWcsOWtmOWCqOepuumXtOi+vuWIsOS4iumZkFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5zZXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmtpQ2FyZHM6IHsgJ3RpbWUnOiBEYXRlLm5vdygpLCAnY2FyZHMnOiBjYXJkcy5zbGljZSgwLCAzMCkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2FyZHMuc2xpY2UoMCwgMzApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9lcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlj43ppojplJnor6/kv6Hmga9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLCAobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2Vycm9yXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn07XG5leHBvcnRzLmdldEFua2lDYXJkcyA9IGdldEFua2lDYXJkcztcbi8qKlxuICog5aSE55CG5a2X56ym5Liy77yM5a+55oyH5a6a5a2X56ym6K6+572u5qC35byP44CB54K55Ye75LqL5Lu2XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIOmcgOimgeWkhOeQhueahOWtl+espuS4slxuICogQHBhcmFtIHtzdHJpbmd9IGtleVdvcmQgLSDlvZPliY3pgInkuK3nmoTlrZfnrKZcbiAqIEByZXR1cm5zIHtzdHJpbmd9IOWkhOeQhuWQjueahCBQcm9tcHQg5a2X56ym5LiyXG4gKiBAdGhyb3dzIHvlvILluLjnsbvlnot9IOW8guW4uOaPj+i/sFxuICovXG5jb25zdCBoYW5kbGVIaWdodGxpZ2h0ID0gKHN0ciwga2V5V29yZCwgYW5raUNhcmRzLCB3aW5kb3dFbGVtZW50KSA9PiB7XG4gICAgaWYgKHN0ciA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbGV0IG5ld1N0ciA9IHN0cjtcbiAgICAvLyDlpITnkIYga2V5d29yZCDpq5jkuq5cbiAgICBuZXdTdHIgPSBuZXdTdHIucmVwbGFjZShuZXcgUmVnRXhwKGAoXnxbXipdKSgke2tleVdvcmR9KShbXipdfCQpYCwgJ2dpJyksIGZ1bmN0aW9uIChtYXRjaCwgcDEsIHAyLCBwMykge1xuICAgICAgICAvLyDlpoLmnpzlhbPplK7or43liY3lkI7msqHmnIkq77yM5YiZ5re75YqgKirvvIzlkKbliJnkv53nlZnljp/moLdcbiAgICAgICAgaWYgKHAxICE9PSAnKicgJiYgcDMgIT09ICcqJykge1xuICAgICAgICAgICAgcmV0dXJuIHAxICsgJyoqJyArIHAyICsgJyoqJyArIHAzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoOyAvLyDkuI3ov5vooYzmm7/mjaJcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIC8vIOWkhOeQhiBBbmtpIOWNleivjemrmOS6rlxuICAgIC8vIGNvbnN0IGNhcmRzID0gYW5raUNhcmRzXG4gICAgLy8gaWYgKHdpbmRvd0VsZW1lbnQgJiYgY2FyZHMpIHtcbiAgICAvLyAgICAgLy8g6YGN5Y6G5q+P5LiA5Liq5Y2h54mHXG4gICAgLy8gICAgIGNhcmRzLmZvckVhY2goKGNhcmQ6IGFueSkgPT4ge1xuICAgIC8vICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgLy8gICAgICAgICAvLyBjb25zb2xlLmxvZyhjYXJkKTtcbiAgICAvLyAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjYXJkLmZpZWxkcyk7XG4gICAgLy8gICAgICAgICBsZXQgZmlyc3RLZXkgPSBrZXlzWzBdO1xuICAgIC8vICAgICAgICAgLy8g5om+5Yiw5Y2h54mH5q2j6Z2iXG4gICAgLy8gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyAgICAgICAgICAgICBpZiAoY2FyZC5maWVsZHNba2V5c1tpXV0ub3JkZXIgPT09IDApIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgZmlyc3RLZXkgPSBrZXlzW2ldXG4gICAgLy8gICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgY29uc3QgY2FyZEZyb250VmFsdWUgPSBjYXJkLmZpZWxkc1tmaXJzdEtleV0udmFsdWVcbiAgICAvLyAgICAgICAgIGNvbnN0IGVzY2FwZWRDYXJkRnJvbnRWYWx1ZSA9IGVzY2FwZVJlZ0V4cChjYXJkRnJvbnRWYWx1ZSk7XG4gICAgLy8gICAgICAgICBpZiAoY2FyZEZyb250VmFsdWUgIT09IGtleVdvcmQpIHtcbiAgICAvLyAgICAgICAgICAgICBuZXdTdHIgPSBuZXdTdHIucmVwbGFjZShuZXcgUmVnRXhwKGVzY2FwZWRDYXJkRnJvbnRWYWx1ZSwgJ2dpJyksIGA8bWFyaz4ke2NhcmRGcm9udFZhbHVlfTwvbWFyaz5gKVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgLy8gfSwgMTApO1xuICAgIC8vICAgICAgICAgZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZzogc3RyaW5nKSB7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpOyAvLyAkJiBtZWFucyB0aGUgd2hvbGUgbWF0Y2hlZCBzdHJpbmdcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICAgIC8vIOWvueS4iui/sOWFg+e0oOa3u+WKoOeCueWHu+S6i+S7tlxuICAgIC8vICAgICAvLyBsZXQgaGlnaHRsaWdodERvbSA9IHdpbmRvd0VsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaGVsbG8nKVxuICAgIC8vICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IGhpZ2h0bGlnaHREb20ubGVuZ3RoOyBpKyspIHtcbiAgICAvLyAgICAgLy8gICAgIGhpZ2h0bGlnaHREb21baV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVIaWdodGxpZ2h0Q2xpY2spXG4gICAgLy8gICAgIC8vICAgICBoaWdodGxpZ2h0RG9tW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlSGlnaHRsaWdodENsaWNrKVxuICAgIC8vICAgICAvLyB9XG4gICAgLy8gfVxuICAgIHJldHVybiBuZXdTdHI7XG4gICAgLy8gcmV0dXJuICd0cnVlJ1xufTtcbmV4cG9ydHMuaGFuZGxlSGlnaHRsaWdodCA9IGhhbmRsZUhpZ2h0bGlnaHQ7XG4vKipcbiAqIOiOt+WPluezu+e7n+eahOm7mOiupCBQcm9tcHRcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlXb3JkIC0g5b2T5YmN6YCJ5Lit55qE5a2X56ymXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBQcm9tcHQg5a2X56ym5LiyXG4gKiBAdGhyb3dzIHvlvILluLjnsbvlnot9IOW8guW4uOaPj+i/sFxuICovXG5jb25zdCBnZXREZWZhdWx0UHJvbXB0ID0gKGtleVdvcmQsIGN1cnJlbnRMYW5ndWFnZSkgPT4ge1xuICAgIGxldCBnZXRVbnNwbGFzaEltYWdlcyA9IHRydWU7XG4gICAgbGV0IHVzZXJQcm9tcHQgPSBgXG5cbiAgICAgICAgUGxlYXNlIGhlbHAgbWUgbGVhcm4gYXMgYSBmb3JlaWduIGxhbmd1YWdlIHRlYWNoZXIuIFNlbnRlbmNlcyBpbiBleGFtcGxlcyBzaG91bGQgbm90IGJlIHRoZSBzYW1lIGFzIHRoZSBnaXZlbiBzZW50ZW5jZSwgQWJzb2x1dGVseSBObyBFeHRyYSBUZXh0LCBPbmx5IFByb3ZpZGUgSW5mb3JtYXRpb24gYXMgaW4gdGhlIEV4YW1wbGVzLCBLZWVwIExhbmd1YWdlIENvbmNpc2UuXG5cbiAgICAgICAgRXhhbXBsZe+8mlxuICAgICAgICBcbiAgICAgICAgLSAgTWVhbmluZzogPEV4cGxhaW4gdGhlIG1lYW5pbmcgdXNpbmcge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgLSAgUGFydCBvZiBTcGVlY2g6IDxJbmRpY2F0ZSB0aGUgcGFydCBvZiBzcGVlY2ggdXNpbmcge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgXG4gICAgICAgICMjIE1lYW5pbmcgaW4gdGhlIHNlbnRlbmNlXG4gICAgICAgIC0gIDxFeHBsYWluIHRoZSBtZWFuaW5nIG9mIHRoZSB3b3JkIGluIHRoZSBzZW50ZW5jZSB1c2luZyB7bmF0aXZlTGFuZ3VhZ2V9PlxuICAgICAgICBcbiAgICAgICAgIyMgRXhhbXBsZSBTZW50ZW5jZXNcbiAgICAgICAgLSAgPHt0YXJnZXRMYW5ndWFnZX0gZXhhbXBsZSBzZW50ZW5jZT4gLSA8VHJhbnNsYXRpb24gaW4ge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgLSAgPHt0YXJnZXRMYW5ndWFnZX0gZXhhbXBsZSBzZW50ZW5jZT4gLSA8VHJhbnNsYXRpb24gaW4ge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgXG4gICAgICAgICMjIFRyYW5zbGF0aW9uIEV4ZXJjaXNlXG4gICAgICAgIC0gIDx7bmF0aXZlTGFuZ3VhZ2V9IHNlbnRlbmNlPlxuICAgICAgICAtICA8e25hdGl2ZUxhbmd1YWdlfSBzZW50ZW5jZT5cbiAgICAgICAgXG4gICAgICAgIC0tLVxuICAgICAgICBcbiAgICAgICAgV29yZDp7c2VsZWN0aW9ufSwgc2VudGVuY2U6IHtzZW50ZW5jZX0sWW91IG11c3QgcmVwbHkgaW4gdGhlIHNwZWNpZmllZCBsYW5ndWFnZVxuXG4gICAgICAgIFBsZWFzZSBzdGFydCB0ZWFjaGluZzpcblxuICAgICAgICBgO1xuICAgIHN3aXRjaCAoY3VycmVudExhbmd1YWdlKSB7XG4gICAgICAgIGNhc2UgJ+eugOS9k+S4reaWhyc6XG4gICAgICAgICAgICB1c2VyUHJvbXB0ID0gYFxuICAgICAgICAgICAg5L2c5Li65LiA5ZCN5aSW6K+t5pWZ5biI77yM5oiR5biM5pyb5b6X5Yiw5L2g55qE5biu5Yqp44CC5L2g5o+Q5L6b55qE5L6L5Y+l5LiN6IO95LiO5oiR5o+Q5L6b55qE5Y+l5a2Q55u45ZCM77yM5Lil56aB5re75Yqg5Lu75L2V6aKd5aSW55qE5paH5pys77yM5Y+q5oyJ54Wn56S65L6L5Lit55qE5pa55byP57uZ5Ye65L+h5oGv77yM56Gu5L+d6K+t6KiA566A5rSB44CCXG5cbiAgICAgICAgICAgIOekuuS+i++8mlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAtICDlkKvkuYnvvJo855SoIHtuYXRpdmVMYW5ndWFnZX0g6Kej6YeK5ZCr5LmJPlxuICAgICAgICAgICAgLSAg6K+N5oCn77yaPOeUqCB7bmF0aXZlTGFuZ3VhZ2V9IOihqOaYjuivjeaApz5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgIyMg5Zyo5Y+l5Lit55qE5ZCr5LmJXG4gICAgICAgICAgICAtICA855SoIHtuYXRpdmVMYW5ndWFnZX0g6Kej6YeK5Y+l5Lit55qE6K+N5rGH5ZCr5LmJPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAjIyDnpLrkvovlj6XlrZBcbiAgICAgICAgICAgIC0gIDx7dGFyZ2V0TGFuZ3VhZ2V9IOeahOekuuS+i+WPpeWtkD4gLSA855SoIHtuYXRpdmVMYW5ndWFnZX0g57+76K+RPlxuICAgICAgICAgICAgLSAgPHt0YXJnZXRMYW5ndWFnZX0g55qE56S65L6L5Y+l5a2QPiAtIDznlKgge25hdGl2ZUxhbmd1YWdlfSDnv7vor5E+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICMjIOe/u+ivkee7g+S5oFxuICAgICAgICAgICAgLSAgPHtuYXRpdmVMYW5ndWFnZX0g5Y+l5a2QPlxuICAgICAgICAgICAgLSAgPHtuYXRpdmVMYW5ndWFnZX0g5Y+l5a2QPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAtLS1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAg5Y2V6K+N77yaXCJ7c2VsZWN0aW9ufVwi77yM5Y+l5a2Q77yaXCJ7c2VudGVuY2V9XCLvvIzkvaDlv4XpobvnlKjop4TlrprnmoTor63oqIDov5vooYzlm57lpI3jgIJcbiAgICBcbiAgICAgICAgICAgIOivt+W8gOWni+aVmeWtpu+8mlxuICAgIFxuICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICfnuYHpq5TkuK3mlocnOlxuICAgICAgICAgICAgdXNlclByb21wdCA9IGBcbiAgICAgICAgICAgIOS9nOeCuuS4gOWQjeWkluiqnuiAgeW4q++8jOaIkeW4jOacm+W+l+WIsOS9oOeahOW5q+WKqeOAguS9oOaPkOS+m+eahOS+i+WPpeS4jeaHieiIh+aIkeaPkOS+m+eahOWPpeWtkOebuOWQjO+8jOWatOemgea3u+WKoOS7u+S9lemhjeWklueahOaWh+Wtl++8jOWPquaMieeFp+evhOS+i+S4reeahOaWueW8j+e1puWHuuizh+ioiu+8jOeiuuS/neiqnuiogOewoea9lOOAglxuXG4gICAgICAgICAgICDnr4TkvovvvJpcblxuICAgICAgICAgICAgLSAg5ZCr576p77yaPOeUqCB7bmF0aXZlTGFuZ3VhZ2V9IOino+mHi+WQq+e+qT5cbiAgICAgICAgICAgIC0gIOipnuaAp++8mjznlKgge25hdGl2ZUxhbmd1YWdlfSDooajmmI7oqZ7mgKc+XG5cbiAgICAgICAgICAgICMjIOWcqOWPpeWtkOS4reeahOWQq+e+qVxuICAgICAgICAgICAgLSAgPOeUqCB7bmF0aXZlTGFuZ3VhZ2V9IOino+mHi+WPpeS4reeahOipnuW9meWQq+e+qT5cblxuICAgICAgICAgICAgIyMg56+E5L6L5Y+l5a2QXG4gICAgICAgICAgICAtICA8e3RhcmdldExhbmd1YWdlfSDnmoTnr4Tkvovlj6XlrZA+IC0gPOeUqCB7bmF0aXZlTGFuZ3VhZ2V9IOe/u+itrz5cbiAgICAgICAgICAgIC0gIDx7dGFyZ2V0TGFuZ3VhZ2V9IOeahOevhOS+i+WPpeWtkD4gLSA855SoIHtuYXRpdmVMYW5ndWFnZX0g57+76K2vPlxuXG4gICAgICAgICAgICAjIyDnv7vora/nt7Tnv5JcbiAgICAgICAgICAgIC0gIDx7bmF0aXZlTGFuZ3VhZ2V9IOWPpeWtkD5cbiAgICAgICAgICAgIC0gIDx7bmF0aXZlTGFuZ3VhZ2V9IOWPpeWtkD5cblxuICAgICAgICAgICAgLS0tXG5cbiAgICAgICAgICAgIOWtl+ipnu+8mlwie3NlbGVjdGlvbn1cIu+8jOWPpeWtkO+8mlwie3NlbnRlbmNlfVwi77yM5L2g5b+F6aCI55So6KaP5a6a55qE6Kqe6KiA6YCy6KGM5Zue6KaG44CCXG5cbiAgICAgICAgICAgIOiri+mWi+Wni+aVmeWtuO+8mlxuXG4gICAgICAgICAgICBgO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgLy8g5YWz6ZSu5a2X6ZW/5bqm6L6D6ZW/5pe277yM5oyJ54Wn5Y+l5a2Q6L+b6KGM5aSE55CGXG4gICAgaWYgKGtleVdvcmQubGVuZ3RoID4gMjApIHtcbiAgICAgICAgZ2V0VW5zcGxhc2hJbWFnZXMgPSBmYWxzZTtcbiAgICAgICAgdXNlclByb21wdCA9IGBcbiAgICAgIFxuICAgICAgICAgICAgQXMgYSBsYW5ndWFnZSB0ZWFjaGVyLCBJIHdpbGwgcHJvdmlkZSBhbiBleHBsYW5hdGlvbiBvZiB0aGUgZ3JhbW1hciBrbm93bGVkZ2UgaW4gdGhlIGdpdmVuIHNlbnRlbmNlLCBBYnNvbHV0ZWx5IE5vIEV4dHJhIFRleHQsIE9ubHkgUHJvdmlkZSBJbmZvcm1hdGlvbiBhcyBpbiB0aGUgRXhhbXBsZXMsIEtlZXAgTGFuZ3VhZ2UgQ29uY2lzZS5cblxuICAgICAgICAgICAgRXhhbXBsZTpcblxuICAgICAgICAgICAgIyMgVHJhbnNsYXRpb25cbiAgICAgICAgICAgIDxUcmFuc2xhdGUgdG8ge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgIyMgR3JhbW1hclxuICAgICAgICAgICAgPC0gUG9pbnQ6IEV4cGxhaW4gaW4ge25hdGl2ZUxhbmd1YWdlfT5cblxuICAgICAgICAgICAgIyMgRXhhbXBsZXMgb2YgcmVsYXRlZCBncmFtbWFyXG4gICAgICAgICAgICAtICA8e3RhcmdldExhbmd1YWdlfSBleGFtcGxlIHNlbnRlbmNlPiAtIDxUcmFuc2xhdGlvbiBpbiB7bmF0aXZlTGFuZ3VhZ2V9PlxuICAgICAgICAgICAgLSAgPHt0YXJnZXRMYW5ndWFnZX0gZXhhbXBsZSBzZW50ZW5jZT4gLSA8VHJhbnNsYXRpb24gaW4ge25hdGl2ZUxhbmd1YWdlfT5cblxuICAgICAgICAgICAgLS0tXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFNlbnRlbmNlOiB7c2VsZWN0aW9ufVxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBgO1xuICAgICAgICBzd2l0Y2ggKGN1cnJlbnRMYW5ndWFnZSkge1xuICAgICAgICAgICAgY2FzZSAn566A5L2T5Lit5paHJzpcbiAgICAgICAgICAgICAgICB1c2VyUHJvbXB0ID0gYFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIOivt+S9oOS9nOS4uuS4gOWQjeWkluivreaVmeW4iOWvuee7meWumuWPpeWtkOS4reeahOivreazleefpeivhui/m+ihjOino+mHiu+8jOe7neWvueS4jeiDveacieS7u+S9lemineWklueahOaWh+acrO+8jOWPquaMieeFp+ekuuS+i+aPkOS+m+S/oeaBr++8jOS/neaMgeivreiogOeugOa0geOAglxuXG4gICAgICAgICAgICAgICAg56S65L6L77yaXG5cbiAgICAgICAgICAgICAgICAjIyDnv7vor5FcbiAgICAgICAgICAgICAgICA857+76K+R5oiQe25hdGl2ZUxhbmd1YWdlfT5cblxuICAgICAgICAgICAgICAgICMjIOivreazlVxuICAgICAgICAgICAgICAgIDwtIOeCue+8mueUqHtuYXRpdmVMYW5ndWFnZX3op6Pph4o+XG5cbiAgICAgICAgICAgICAgICAjIyDnm7jlhbPor63ms5XnpLrkvotcbiAgICAgICAgICAgICAgICAtICAgPHt0YXJnZXRMYW5ndWFnZX3nmoTnpLrkvovlj6XlrZA+IC0gPOeUqHtuYXRpdmVMYW5ndWFnZX3nv7vor5E+XG4gICAgICAgICAgICAgICAgLSAgIDx7dGFyZ2V0TGFuZ3VhZ2V955qE56S65L6L5Y+l5a2QPiAtIDznlKh7bmF0aXZlTGFuZ3VhZ2V957+76K+RPlxuXG4gICAgICAgICAgICAgICAgLS0tXG5cbiAgICAgICAgICAgICAgICDlj6XlrZDvvJrigJ17c2VsZWN0aW9ufeKAnFxuXG4gICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ+e5gemrlOS4reaWhyc6XG4gICAgICAgICAgICAgICAgdXNlclByb21wdCA9IGBcbiAgICAgICAgICAgICAgICDoq4vkvaDkvZzngrrkuIDlkI3lpJboqp7mlZnluKvlsI3ntablrprlj6XlrZDkuK3nmoToqp7ms5Xnn6XorZjpgLLooYzop6Pph4vvvIzntZXlsI3kuI3og73mnInku7vkvZXpoY3lpJbnmoTmlofmnKzvvIzlj6rmjInnhafnr4Tkvovmj5Dkvpvos4foqIrvvIzkv53mjIHoqp7oqIDnsKHmvZTjgIJcblxuICAgICAgICAgICAgICAgIOevhOS+i++8mlxuXG4gICAgICAgICAgICAgICAgIyMg57+76K2vXG4gICAgICAgICAgICAgICAgPOe/u+itr+aIkHtuYXRpdmVMYW5ndWFnZX0+XG5cbiAgICAgICAgICAgICAgICAjIyDoqp7ms5VcbiAgICAgICAgICAgICAgICA8LSDpu57vvJrnlKh7bmF0aXZlTGFuZ3VhZ2V96Kej6YeLPlxuXG4gICAgICAgICAgICAgICAgIyMg55u46Zec6Kqe5rOV56+E5L6LXG4gICAgICAgICAgICAgICAgLSAgIDx7dGFyZ2V0TGFuZ3VhZ2V955qE56+E5L6L5Y+l5a2QPiAtIDznlKh7bmF0aXZlTGFuZ3VhZ2V957+76K2vPlxuICAgICAgICAgICAgICAgIC0gICA8e3RhcmdldExhbmd1YWdlfeeahOevhOS+i+WPpeWtkD4gLSA855Soe25hdGl2ZUxhbmd1YWdlfee/u+itrz5cblxuICAgICAgICAgICAgICAgIC0tLVxuXG4gICAgICAgICAgICAgICAg5Y+l5a2Q77yaXCJ7c2VsZWN0aW9ufVwiXG5cbiAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBkZWZhdWx0UHJvbXB0ID0ge1xuICAgICAgICAndGl0bGUnOiAnRGVmYXVsdCcsICdnZXRVbnNwbGFzaEltYWdlcyc6IGdldFVuc3BsYXNoSW1hZ2VzLCAndXNlclByb21wdCc6IHVzZXJQcm9tcHQsXG4gICAgICAgICdpZCc6ICdEZWZhdWx0J1xuICAgIH07XG4gICAgcmV0dXJuIGRlZmF1bHRQcm9tcHQ7XG59O1xuZXhwb3J0cy5nZXREZWZhdWx0UHJvbXB0ID0gZ2V0RGVmYXVsdFByb21wdDtcbmNvbnN0IGdldEluaXRpYWxQcm9tcHQgPSAoa2V5V29yZCwgY3VycmVudExhbmd1YWdlKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAvL+WIpOaWreeUqOaIt+aYr+WQpuiuvue9ruS6hiBBUEkgS2V577yM5pyq6K6+572u5YiZ6buY6K6k5L2/55So5Zyo57q/6K+N5YW4XG4gICAgY29uc3QgaXNTZXRLZXkgPSB5aWVsZCAoMCwgdXRpbF8xLmdldFNldHRpbmdzKSgpLnRoZW4oKGl0ZW1zKSA9PiB7XG4gICAgICAgIGlmIChpdGVtcy5hcGlLZXlTZWxlY3Rpb24gPT09ICdsaWNlbnNlS2V5JyAmJiBpdGVtcy5saWNlbnNlS2V5Lmxlbmd0aCA8IDUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpdGVtcy5hcGlLZXlTZWxlY3Rpb24gPT09ICdteU93bk9wZW5BaUtleScgJiYgaXRlbXMub3BlbkFwaUtleS5sZW5ndGggPCA1KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChpc1NldEtleSkge1xuICAgICAgICBjb25zdCBkZWZhdWx0UHJvbXB0ID0gKDAsIGV4cG9ydHMuZ2V0RGVmYXVsdFByb21wdCkoa2V5V29yZCwgY3VycmVudExhbmd1YWdlKTtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRQcm9tcHQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyDmsqHmnInorr7nva4gQXBpIEtleVxuICAgICAgICByZXR1cm4gZXhwb3J0cy5kaWN0aW9uYXJ5UHJvbXB0O1xuICAgIH1cbn0pO1xuZXhwb3J0cy5nZXRJbml0aWFsUHJvbXB0ID0gZ2V0SW5pdGlhbFByb21wdDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNob3J0Y3V0QnV0dG9uID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3Qgc3R5bGVkX2NvbXBvbmVudHNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwic3R5bGVkLWNvbXBvbmVudHNcIikpO1xuY29uc3QgcmVhY3RfaWNvbnNfMSA9IHJlcXVpcmUoXCJAcmFkaXgtdWkvcmVhY3QtaWNvbnNcIik7XG5jb25zdCBTY291dGVyQnV0dG9uID0gc3R5bGVkX2NvbXBvbmVudHNfMS5kZWZhdWx0LmJ1dHRvbiBgXG4gICAgXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICBwYWRkaW5nOiA0cHggOHB4O1xuXG4gICAgJjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGNkY2RjY7XG4gICAgfVxuXG5gO1xuY29uc3QgU2NvdXRlckJ1dHRvbkJveCA9IHN0eWxlZF9jb21wb25lbnRzXzEuZGVmYXVsdC5kaXYgYFxuXG5mb250LWZhbWlseTogc2Fucy1zZXJpZjtcbmJhY2tncm91bmQtY29sb3I6ICNmZmY7XG5jb2xvcjogcmdiKDAgMCAwIC8gODAlKTtcbmhlaWdodDozMnB4O1xuXG5mb250LXNpemU6MTRweDtcblxuZGlzcGxheTogZmxleDtcbmZsZXgtZGlyZWN0aW9uOiByb3c7XG5hbGlnbi1pdGVtczogY2VudGVyO1xuXG5wb3NpdGlvbjogYWJzb2x1dGU7XG50b3A6ICR7cHJvcHMgPT4gcHJvcHMudG9wfXB4O1xubGVmdDogJHtwcm9wcyA9PiBwcm9wcy5sZWZ0fXB4O1xuei1pbmRleDogOTk5O1xuXG5ib3gtc2hhZG93OiAwcHggOHB4IDI4cHggcmdiYSgwLDAsMCwuMTYpO1xuYm9yZGVyLXJhZGl1czogNHB4O1xuYm9yZGVyOjFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNilcblxuYDtcbmZ1bmN0aW9uIFNob3J0Y3V0QnV0dG9uKHByb3BzKSB7XG4gICAgLy8gLy8g6K6+572u5Yid5aeL5Z2Q5qCH5Li6ICgwLCAwKVxuICAgIGNvbnN0IFtwb3NpdGlvbiwgc2V0UG9zaXRpb25dID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHsgeDogMCwgeTogMCB9KTtcbiAgICBjb25zdCBidXR0b25SZWYgPSAoMCwgcmVhY3RfMS51c2VSZWYpKG51bGwpO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAvL+iuvue9ruaMiemSruS9jee9rlxuICAgICAgICBsZXQgbGVmdCA9IHByb3BzLnBvc2l0aW9uLng7XG4gICAgICAgIGxldCB0b3AgPSBwcm9wcy5wb3NpdGlvbi55O1xuICAgICAgICBpZiAoYnV0dG9uUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbldpZHRoID0gYnV0dG9uUmVmLmN1cnJlbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICBjb25zdCBidXR0b25IZWlnaHQgPSBidXR0b25SZWYuY3VycmVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAvLyDlpoLmnpzotoXlh7rlj7PkvqfovrnnlYzvvIzlkJHlt6bosIPmlbRcbiAgICAgICAgICAgIGlmIChsZWZ0ICsgYnV0dG9uV2lkdGggPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xuICAgICAgICAgICAgICAgIGxlZnQgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIGJ1dHRvbldpZHRoIC0gMTA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAvLyDlpoLmnpzotoXlh7rlupXpg6jovrnnlYzvvIzlkJHkuIrosIPmlbRcbiAgICAgICAgICAgIC8vIGlmICh0b3AgKyBidXR0b25IZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgICAgIC8vICAgICB0b3AgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSBidXR0b25IZWlnaHQ7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICAgICAgc2V0UG9zaXRpb24oeyB4OiBsZWZ0LCB5OiB0b3AgfSk7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoU2NvdXRlckJ1dHRvbkJveCwgeyByZWY6IGJ1dHRvblJlZiwgbGVmdDogcG9zaXRpb24ueCwgdG9wOiBwb3NpdGlvbi55IH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4JyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdycsXG4gICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFNjb3V0ZXJCdXR0b24sIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAvLyBtYXJnaW5SaWdodDogJzRweCdcbiAgICAgICAgICAgICAgICB9LCBjbGFzc05hbWU6IFwiU2hvcnRjdXRCdXR0b25cIiwgb25DbGljazogKCkgPT4gcHJvcHMuaGFuZGxlU2hvcnRjdXRCdXR0b25DbGljayh0cnVlKSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ljb25zXzEuUGFwZXJQbGFuZUljb24sIHsgc3R5bGU6IHsgbWFyZ2luUmlnaHQ6ICc0cHgnIH0gfSksXG4gICAgICAgICAgICAgICAgXCJSdW5cIiksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChTY291dGVyQnV0dG9uLCB7IGNsYXNzTmFtZTogXCJTaG9ydGN1dEJ1dHRvblwiLCBvbkNsaWNrOiAoKSA9PiBwcm9wcy5oYW5kbGVTaG9ydGN1dEJ1dHRvbkNsaWNrKGZhbHNlKSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ljb25zXzEuT3BlbkluTmV3V2luZG93SWNvbiwgeyBzdHlsZTogeyBtYXJnaW5SaWdodDogJzRweCcgfSB9KSxcbiAgICAgICAgICAgICAgICBcIiBPcGVuXCIpKSkpO1xufVxuZXhwb3J0cy5TaG9ydGN1dEJ1dHRvbiA9IFNob3J0Y3V0QnV0dG9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZXREb25vdENsb3NlUG9wdXBDYXJkID0gZXhwb3J0cy5waW5Qb3B1cENhcmQgPSB2b2lkIDA7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHJlYWN0X2RvbV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuY29uc3QgUG9wdXBDYXJkXzEgPSByZXF1aXJlKFwiLi4vUG9wdXBDYXJkXCIpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCBjc3NpbmpzXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vY3NzaW5qc1wiKTtcbmNvbnN0IHN0eWxlZF9jb21wb25lbnRzXzEgPSByZXF1aXJlKFwic3R5bGVkLWNvbXBvbmVudHNcIik7XG5jb25zdCB1c2VySW5mb18xID0gcmVxdWlyZShcIi4uL2xpYi91c2VySW5mb1wiKTtcbmNvbnN0IGxhbmdfMSA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbmNvbnN0IGxvY2FsZV8xID0gcmVxdWlyZShcIi4uL2xpYi9sb2NhbGVcIik7XG5jb25zdCB1c2VySW5mb18yID0gcmVxdWlyZShcIi4uL2xpYi91c2VySW5mb1wiKTtcbi8vIGltcG9ydCB7IEJ1dHRvbiwgbWVzc2FnZSB9IGZyb20gJ2FudGQnO1xuY29uc3QgaWNvbnNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9pY29uc1wiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuY29uc3QgbGFuZ18yID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xuY29uc3QgdXRpbF8yID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG5jb25zdCBzdHlsZV8xID0gcmVxdWlyZShcIi4uL1BvcHVwQ2FyZC9zdHlsZVwiKTtcbmNvbnN0IFNob3J0Y3V0QnV0dG9uXzEgPSByZXF1aXJlKFwiLi9TaG9ydGN1dEJ1dHRvblwiKTtcbmNvbnN0IGljb24xMjhfcG5nXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2Fzc2V0cy9pY29uMTI4LnBuZ1wiKSk7XG5jb25zdCBzdHlsZWRfY29tcG9uZW50c18yID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKSk7XG5jb25zdCBpc0ZpcmVmb3ggPSB0eXBlb2YgSW5zdGFsbFRyaWdnZXIgIT09ICd1bmRlZmluZWQnO1xuLy8g5a655Zmo57G755uuXG5jb25zdCBDT05UQUlORVJfQ0xBU1NOQU1FID0gJ2NvbnRhaW5lcic7XG5jb25zdCBTSE9SVENVVF9CVVRUT05fQ0xBU1NOQU1FID0gJ1Nob3J0Y3V0QnV0dG9uQ29udGFpbmVyJztcbi8vIOiusOW9leW9k+WJjeeql+WPo+aYr+WQpiBQaW4g5L2PXG5sZXQgaXNQaW4gPSBmYWxzZTtcbi8vIOiuvue9ruW9k+WJjeeql+WPo+aYr+WQpuWFgeiuuOWFs+mXrVxubGV0IGRvbm90Q2xvc2VQb3B1cENhcmQgPSBmYWxzZTtcbi8vIOWIneWni+WMluS4u+WuueWZqO+8jOS4u+WuueWZqOeUqOadpeaMguWcqOWFqOWxgOagt+W8j++8jOWMheaLrOesrOS4ieaWuee7hOS7tueahOagt+W8j1xubGV0IE15Qm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ19famlhbmctc2NvdXRlcicpO1xuLy8gY29uc29sZS5sb2coTXlCb3gpO1xuLy8gY29udGFpbmVyIOaJv+i9veS4u+eql+WPo+eahCBVSSDnu4Tku7ZcbmxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnRhaW5lci5jbGFzc05hbWUgPSBDT05UQUlORVJfQ0xBU1NOQU1FO1xuLy8g5L2/55SoIHNoYWRvdyDmnaXpmpTnprvmoLflvI9cbmxldCBzaGFkb3dSb290ID0gdW5kZWZpbmVkO1xuaWYgKE15Qm94ID09PSBudWxsIHx8IE15Qm94ID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyDlpoLmnpzkuI3lrZjlnKjlrrnlmahcbiAgICAvLyDliJvlu7rkuLvlrrnlmahcbiAgICBNeUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIE15Qm94LmlkID0gJ19famlhbmctc2NvdXRlcic7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5hcHBlbmRDaGlsZChNeUJveCk7XG4gICAgLy8gTXlCb3guc3R5bGUuZGlzcGxheSA9ICdub25lJyAvL+m7mOiupOmakOiXj1xuICAgIE15Qm94LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHNoYWRvd1Jvb3QgPSBNeUJveCA9PT0gbnVsbCB8fCBNeUJveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogTXlCb3guYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QgPT09IG51bGwgfHwgc2hhZG93Um9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgIC8vIEFudCDnu4Tku7bmoLflvI9cbiAgICAvLyBjb25zdCBhbnRTdHlsZXNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgIC8vIGFudFN0eWxlc2hlZXQucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIC8vIGFudFN0eWxlc2hlZXQuaHJlZiA9ICdodHRwczovL2Nkbi5ib290Y2RuLm5ldC9hamF4L2xpYnMvYW50ZC80LjE3LjEvYW50ZC5taW4uY3NzJztcbiAgICAvLyBzaGFkb3dSb290LmFwcGVuZENoaWxkKGFudFN0eWxlc2hlZXQpO1xuICAgIC8vIFRhaWx3aW5kXG4gICAgY29uc3QgdGFpbHdpbmRTdHlsZXNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgIHRhaWx3aW5kU3R5bGVzaGVldC5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgdGFpbHdpbmRTdHlsZXNoZWV0LmhyZWYgPSAnaHR0cHM6Ly91bnBrZy5jb20vdGFpbHdpbmRjc3NAXjIvZGlzdC90YWlsd2luZC5taW4uY3NzJztcbiAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKHRhaWx3aW5kU3R5bGVzaGVldCk7XG4gICAgLy8g5ZyoIFNoYWRvdyBET00g5Lit5re75Yqg5qC35byP77yaXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlLnRleHRDb250ZW50ID0gc3R5bGVfMS5wb3B1cENhcmRTdHlsZTtcbiAgICBzaGFkb3dSb290ID09PSBudWxsIHx8IHNoYWRvd1Jvb3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuLy8g55So5oi35LuY6LS554q25oCB562J5L+h5oGv44CB55So5oi355qEIEFua2kg5L+h5oGvXG5sZXQgVVNFUl9JTkZPID0geyB1c2VySWQ6ICd1bmtub3cnLCB2ZXJpZmllZDogZmFsc2UsIGNvbnRleHRNZW51OiBmYWxzZSB9O1xubGV0IEFOS0lfSU5GTyA9IHsgZGVmYXVsdERlY2tOYW1lOiAnJywgZGVja3M6IFtdLCBtb2RlbHM6IFtdIH07XG4vLyDojrflj5bnlKjmiLfkv6Hmga9cbmNvbnN0IHRoaXNHZXRVc2VySW5mbyA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHRyeSB7XG4gICAgICAgIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICAgICAgICAvLyBVU0VSX0lORk8gPSBhd2FpdCBnZXRVc2VySW5mbygpXG4gICAgICAgIFVTRVJfSU5GTyA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2dldFVzZXJJbmZvJywgJ21lc3NhZ2VzJzoge30sIH0pO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgICAvLyDojrflj5YgQW5raSBkZWNrc1xuICAgIGNvbnN0IGRlY2tzID0geWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW5raUFjdGlvbicsICdtZXNzYWdlcyc6IHsgJ2Fua2lfYWN0aW9uX3R5cGUnOiAnZGVja05hbWVzJywgJ2Fua2lfYXJndW1lbnRzJzoge30gfSwgfSk7XG4gICAgQU5LSV9JTkZPLmRlY2tzID0gZGVja3MucmVzdWx0O1xuICAgIC8vIOiOt+WPliBBbmtpIG1vZGVscyDlkozpu5jorqTnmoQgRGVjayDlkI3np7BcbiAgICBjb25zdCBtb2RlbHNBbmREZWNrID0geWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnc2V0TW9kZWwnLCAnbWVzc2FnZXMnOiB7fSwgfSk7XG4gICAgQU5LSV9JTkZPLm1vZGVscyA9IG1vZGVsc0FuZERlY2suZGF0YS5tb2RlbERhdGE7XG4gICAgQU5LSV9JTkZPLmRlZmF1bHREZWNrTmFtZSA9IG1vZGVsc0FuZERlY2suZGF0YS5kZWZhdWx0RGVja05hbWU7XG4gICAgLy8g5pu05pawIEFua2kgc3R5bGVcbiAgICB0cnkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEFOS0lfSU5GTy5tb2RlbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSB7XG4gICAgICAgICAgICAgICAgXCJtb2RlbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBBTktJX0lORk8ubW9kZWxzW2ldWydtb2RlbE5hbWUnXSxcbiAgICAgICAgICAgICAgICAgICAgXCJjc3NcIjogdXRpbF8yLmNhcmRTdHlsZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyDmm7TmlrAgc3R5bGVcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2Fua2lBY3Rpb24nLCAnbWVzc2FnZXMnOiB7ICdhbmtpX2FjdGlvbl90eXBlJzogJ3VwZGF0ZU1vZGVsU3R5bGluZycsICdhbmtpX2FyZ3VtZW50cyc6IHAgfSwgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICB9XG4gICAgLy8g6I635Y+WIEFua2kg54mM57uE5L+h5oGvXG4gICAgLy8gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnc2V0TW9kZWwnLCAnbWVzc2FnZXMnOiB7fSwgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgLy8gICBBTktJX0lORk8ubW9kZWxzID0gcmVzdWx0LmRhdGFcbiAgICAvLyAgIC8vIOabtOaWsCBBbmtpIHN0eWxlXG4gICAgLy8gICB0cnkge1xuICAgIC8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEFOS0lfSU5GTy5tb2RlbHMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyAgICAgICBjb25zdCBwID0ge1xuICAgIC8vICAgICAgICAgXCJtb2RlbFwiOiB7XG4gICAgLy8gICAgICAgICAgIFwibmFtZVwiOiBBTktJX0lORk8ubW9kZWxzW2ldWydtb2RlbE5hbWUnXSxcbiAgICAvLyAgICAgICAgICAgXCJjc3NcIjogY2FyZFN0eWxlXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICAgIC8vIOiOt+WPliBBbmtpIOeJjOe7hOS/oeaBr1xuICAgIC8vICAgICAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2Fua2lBY3Rpb24nLCAnbWVzc2FnZXMnOiB7ICdhbmtpX2FjdGlvbl90eXBlJzogJ3VwZGF0ZU1vZGVsU3R5bGluZycsICdhbmtpX2FyZ3VtZW50cyc6IHAgfSwgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgLy8gICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgIC8vICAgICAgIH0pXG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gICB9XG4gICAgLy8gfSlcbn0pO1xubGV0IHBvcnQgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgbmFtZTogJ2Zyb21Db250ZW50U2NyaXB0J1xufSk7XG4vLyDmjqXmlLYgYmFja2dyb3VuZCDmtojmga/vvIjnm67liY3mmK/pgJrov4fmtY/op4jlmajnmoTlj7PplK7oj5zljZXjgIHlv6vmjbfplK7op6blj5HvvIlcbndlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKG1zZywgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICB2YXIgX2E7XG4gICAgLy8gY29uc29sZS5sb2coJ2NvbnRlbnQgc2NyaXB0IG9uTWVzc2FnZTonKTtcbiAgICAvLyBjb25zb2xlLmxvZyhtc2cpO1xuICAgIGlmIChtc2cudHlwZSA9PT0gJ29wZW4tc2NvdXRlcicpIHtcbiAgICAgICAgLy8g5aSE55CG56qX5Y+jXG4gICAgICAgIGlmIChNeUJveCAhPT0gbnVsbCAmJiBNeUJveCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyDlpoLmnpzlt7LlrZjlnKjlrrnlmahcbiAgICAgICAgICAgIGlmICgoKF9hID0gTXlCb3guc2hhZG93Um9vdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnF1ZXJ5U2VsZWN0b3IoJy4nICsgQ09OVEFJTkVSX0NMQVNTTkFNRSkpID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c5LiN5a2Y5ZyoIFBvcHVwQ2FyZFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBDT05UQUlORVJfQ0xBU1NOQU1FO1xuICAgICAgICAgICAgICAgIHNoYWRvd1Jvb3QgPT09IG51bGwgfHwgc2hhZG93Um9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5YGc5q2i5pen55qE5a+56K+dXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvLyDph43mlrDpk77mjqVcbiAgICAgICAgICAgICAgICBwb3J0ID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLmNvbm5lY3Qoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZnJvbUNvbnRlbnRTY3JpcHQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ1N0b3BUaGVDb252ZXJzYXRpb24nLCAnbWVzc2FnZXMnOiAnJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE15Qm94LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICAgICAgICAvLyDnp7vpmaTml6flhoXlrrnvvIzpgb/lhY0gMiDmrKHmuLLmn5Pmt7fmnYLlnKjkuIDotbdcbiAgICAgICAgICAgIC8vIGNvbnRhaW5lci5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+S4jeWtmOWcqCBCb3gg5a655ZmoJyk7XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBDT05UQUlORVJfQ0xBU1NOQU1FO1xuICAgICAgICAgICAgc2hhZG93Um9vdCA9PT0gbnVsbCB8fCBzaGFkb3dSb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSBnZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgLy8g5pi+56S656qX5Y+jXG4gICAgICAgIGlmIChzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmtleVdvcmQgIT09ICcnKSB7XG4gICAgICAgICAgICBzaG93UG9wdXBDYXJkKHsgJ2tleVdvcmQnOiBzZWxlY3Rpb24gPT09IG51bGwgfHwgc2VsZWN0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZWxlY3Rpb24ua2V5V29yZCwgJ1NlbnRlbmNlJzogc2VsZWN0aW9uLnNlbnRlbmNlIH0sIHdpbmRvdy5nZXRTZWxlY3Rpb24oKSwgY29udGFpbmVyLCBzaGFkb3dSb290LCBpc1BpbiwgbXNnLnJ1blByb21wdCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gLy8g55uR5ZCs6aG16Z2i54K55Ye75LqL5Lu2XG4gICAgICAgIC8vIGRvY3VtZW50Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vICAgaWYgKE15Qm94ICE9PSB1bmRlZmluZWQgJiYgTXlCb3ggIT09IG51bGwgJiYgIWlzUGluICYmICFkb25vdENsb3NlUG9wdXBDYXJkKSB7XG4gICAgICAgIC8vICAgICAvLyDlpoLmnpzngrnlh7vnmoTkuI3mmK/mj5Lku7bnqpflj6Plj4rlhbblrZDlhYPntKDvvIzliJnlhbPpl63nqpflj6NcbiAgICAgICAgLy8gICAgIGlmIChNeUJveCAhPT0gZXZlbnQudGFyZ2V0ICYmICFNeUJveC5jb250YWlucyhldmVudC50YXJnZXQgYXMgTm9kZSkpIHtcbiAgICAgICAgLy8gICAgICAgLy8g6ZqQ6JeP56qX5Y+jXG4gICAgICAgIC8vICAgICAgIGNvbnRhaW5lci5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgICAgICAvLyAgICAgICAvLyBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzZWxlY3Rpb25jaGFuZ2UnLCBoYW5kbGVTZWxlY3Rpb25jaGFuZ2UpO1xuICAgICAgICAvLyAgICAgICAvLyBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2V1cCk7XG4gICAgICAgIC8vICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSlcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gY29udGFpbmVyLm9ubW91c2Vkb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIC8vICAgLy8g6ZqQ6JePIHNldEFua2lTcGFjZUJ1dHRvblxuICAgICAgICAvLyAgIGNvbnN0IGNvbnRleHRCb3ggPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGV4dEJveDInKVswXVxuICAgICAgICAvLyAgIGlmIChjb250ZXh0Qm94KSB7XG4gICAgICAgIC8vICAgICAvLyDngrnlh7vnmoTkuI3mmK8gc2V0QW5raVNwYWNlQnV0dG9uIOaXtuaJjemakOiXj1xuICAgICAgICAvLyAgICAgaWYgKGNvbnRleHRCb3ggIT09IGV2ZW50LnRhcmdldCAmJiAhY29udGV4dEJveC5jb250YWlucyhldmVudC50YXJnZXQgYXMgTm9kZSkpIHtcbiAgICAgICAgLy8gICAgICAgY29udGV4dEJveC5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChjb250ZXh0Qm94KVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gfVxuICAgIH1cbn0pO1xuLy8g5pi+56S65bqU55So56qX5Y+jXG5mdW5jdGlvbiBzaG93UG9wdXBDYXJkKGRhdGEsIG1zZywgTXlCb3gsIHNoYWRvd1Jvb3QsIGlzUGluLCBydW5Qcm9tcHQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBsZXQgbGFuZyA9IHlpZWxkICgwLCBsYW5nXzEuZmV0Y2hjdXJyZW50TGFuZ3VhZ2UpKCk7XG4gICAgICAgIHJlYWN0X2RvbV8xLmRlZmF1bHQucmVuZGVyKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5TdHJpY3RNb2RlLCBudWxsLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQobG9jYWxlXzEuQ3VycmVudExhbmd1YWdlQ29udGV4dC5Qcm92aWRlciwgeyB2YWx1ZTogbGFuZyB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHVzZXJJbmZvXzIuVXNlckluZm9Db250ZXh0LlByb3ZpZGVyLCB7IHZhbHVlOiB7IHVzZXI6IFVTRVJfSU5GTywgYW5raTogQU5LSV9JTkZPIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoY3NzaW5qc18xLlN0eWxlUHJvdmlkZXIsIHsgY29udGFpbmVyOiBzaGFkb3dSb290IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChzdHlsZWRfY29tcG9uZW50c18xLlN0eWxlU2hlZXRNYW5hZ2VyLCB7IHRhcmdldDogc2hhZG93Um9vdCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFBvcHVwQ2FyZF8xLlBvcHVwQ2FyZCwgeyBkYXRhOiBkYXRhLCBzZWxlY3Rpb246IG1zZywgcnVuUHJvbXB0OiBydW5Qcm9tcHQsIGlzUGluOiBpc1BpbiB9KSkpKSkpLCBNeUJveCk7XG4gICAgfSk7XG59XG4vLyBpbnRlcmZhY2UgUG9wdXBDYXJkQ29udGV4dFByb3BzIHtcbi8vICAgZGF0YTogYW55O1xuLy8gICBzZWxlY3Rpb246IGFueTtcbi8vICAgcnVuUHJvbXB0OiBib29sZWFuO1xuLy8gfVxuLy8gZnVuY3Rpb24gUG9wdXBDYXJkQ29udGV4dChwcm9wczogUG9wdXBDYXJkQ29udGV4dFByb3BzKSB7XG4vLyAgIGNvbnN0IFt1c2VySW5mbywgc2V0VXNlckluZm9dID0gdXNlU3RhdGU8dXNlckluZm9UeXBlIHwgbnVsbD4obnVsbCk7XG4vLyAgIGNvbnN0IFtsYW5nLCBzZXRMYW5nXSA9IHVzZVN0YXRlPGFueT4obnVsbCk7XG4vLyAgIHVzZUVmZmVjdCgoKSA9PiB7XG4vLyAgICAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hVc2VySW5mbygpIHtcbi8vICAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCBnZXRVc2VySW5mbygpO1xuLy8gICAgICAgY29uc3QgbGFuZyA9IGF3YWl0IGZldGNoY3VycmVudExhbmd1YWdlKClcbi8vICAgICAgIHNldExhbmcobGFuZylcbi8vICAgICAgIHNldFVzZXJJbmZvKGluZm8pO1xuLy8gICAgIH1cbi8vICAgICBmZXRjaFVzZXJJbmZvKCk7XG4vLyAgIH0sIFtdKTsgIC8vIOi3keS4gOasoe+8jOS4jeS+nei1luS7u+S9leWklumDqOWPmOmHj1xuLy8gICByZXR1cm4gKFxuLy8gICAgIDxDdXJyZW50TGFuZ3VhZ2VDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXtsYW5nfT5cbi8vICAgICAgIDxVc2VySW5mb0NvbnRleHQuUHJvdmlkZXIgdmFsdWU9e1VTRVJfSU5GT30+XG4vLyAgICAgICAgIDxTdHlsZVByb3ZpZGVyIGNvbnRhaW5lcj17c2hhZG93Um9vdH0+XG4vLyAgICAgICAgICAgPFN0eWxlU2hlZXRNYW5hZ2VyIHRhcmdldD17c2hhZG93Um9vdH0+XG4vLyAgICAgICAgICAgICA8UG9wdXBDYXJkIGRhdGE9e3Byb3BzLmRhdGF9IHNlbGVjdGlvbj17cHJvcHMuc2VsZWN0aW9ufSBydW5Qcm9tcHQ9e3Byb3BzLnJ1blByb21wdH0gaXNQaW49e2lzUGlufSAvPlxuLy8gICAgICAgICAgIDwvU3R5bGVTaGVldE1hbmFnZXI+XG4vLyAgICAgICAgIDwvU3R5bGVQcm92aWRlcj5cbi8vICAgICAgIDwvVXNlckluZm9Db250ZXh0LlByb3ZpZGVyPlxuLy8gICAgIDwvQ3VycmVudExhbmd1YWdlQ29udGV4dC5Qcm92aWRlcj5cbi8vICAgKVxuLy8gfVxuY29uc3QgcGluUG9wdXBDYXJkID0gKHZhbHVlKSA9PiB7XG4gICAgaXNQaW4gPSB2YWx1ZTtcbn07XG5leHBvcnRzLnBpblBvcHVwQ2FyZCA9IHBpblBvcHVwQ2FyZDtcbmNvbnN0IHNldERvbm90Q2xvc2VQb3B1cENhcmQgPSAodmFsdWUpID0+IHtcbiAgICBkb25vdENsb3NlUG9wdXBDYXJkID0gdmFsdWU7XG59O1xuZXhwb3J0cy5zZXREb25vdENsb3NlUG9wdXBDYXJkID0gc2V0RG9ub3RDbG9zZVBvcHVwQ2FyZDtcbi8vIGNvbnN0IGhhbmRsZVNlbGVjdGlvbmNoYW5nZSA9ICgpID0+IHtcbi8vICAgbGV0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbi8vICAgaWYgKHNlbGVjdGlvbikge1xuLy8gICAgIGNvbnNvbGUubG9nKCdzZWxlY3Rpb24udG9TdHJpbmcoKTonKTtcbi8vICAgICBjb25zb2xlLmxvZyhzZWxlY3Rpb24udG9TdHJpbmcoKSk7XG4vLyAgICAgaXNUZXh0U2VsZWN0ZWQgPSBzZWxlY3Rpb24udG9TdHJpbmcoKS5sZW5ndGggPiAwO1xuLy8gICB9XG4vLyB9XG5sZXQgaXNUZXh0U2VsZWN0ZWQgPSBmYWxzZTtcbmxldCBsYXN0U2VsZWN0aW9uID0ge1xuICAgIGFuY2hvck5vZGU6IG51bGwsXG4gICAgYW5jaG9yT2Zmc2V0OiAwLFxuICAgIGZvY3VzTm9kZTogbnVsbCxcbiAgICBmb2N1c09mZnNldDogMCxcbn07XG5jb25zdCBoYW5kbGVNb3VzZXVwID0gKGV2ZW50KSA9PiB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBjb25zdCBpc0luU2hhZG93ID0gTXlCb3ggPT09IGV2ZW50LnRhcmdldCB8fCAoTXlCb3ggPT09IG51bGwgfHwgTXlCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IE15Qm94LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpO1xuICAgIC8vIOiOt+WPlueUqOaIt+WcqOWuv+S4u+e9kemhteS4iumAieS4reeahOWGheWuuVxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IGdldFNlbGVjdGlvbihpc0luU2hhZG93KTtcbiAgICBjb25zb2xlLmxvZyhzZWxlY3Rpb24pO1xuICAgIGNvbnN0IHJhbmdlID0gc2VsZWN0aW9uID09PSBudWxsIHx8IHNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VsZWN0aW9uLnNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuICAgIC8vIGxhc3RTZWxlY3Rpb24gPSB7XG4gICAgLy8gICAvLyDkv53lrZjlkITkuKrlsZ7mgKfnmoTlvJXnlKjlkozlgLxcbiAgICAvLyAgIGFuY2hvck5vZGU6IHJhbmdlLnN0YXJ0Q29udGFpbmVyLFxuICAgIC8vICAgYW5jaG9yT2Zmc2V0OiByYW5nZS5zdGFydE9mZnNldCxcbiAgICAvLyAgIGZvY3VzTm9kZTogcmFuZ2UuZW5kQ29udGFpbmVyLFxuICAgIC8vICAgZm9jdXNPZmZzZXQ6IHJhbmdlLmVuZE9mZnNldCxcbiAgICAvLyB9O1xuICAgIGxhc3RTZWxlY3Rpb24gPSB7XG4gICAgICAgIC8vIOS/neWtmOWQhOS4quWxnuaAp+eahOW8leeUqOWSjOWAvFxuICAgICAgICBhbmNob3JOb2RlOiBzZWxlY3Rpb24gPT09IG51bGwgfHwgc2VsZWN0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZWxlY3Rpb24uc2VsZWN0aW9uLmFuY2hvck5vZGUsXG4gICAgICAgIGFuY2hvck9mZnNldDogc2VsZWN0aW9uID09PSBudWxsIHx8IHNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VsZWN0aW9uLnNlbGVjdGlvbi5hbmNob3JPZmZzZXQsXG4gICAgICAgIGZvY3VzTm9kZTogc2VsZWN0aW9uID09PSBudWxsIHx8IHNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VsZWN0aW9uLnNlbGVjdGlvbi5mb2N1c05vZGUsXG4gICAgICAgIGZvY3VzT2Zmc2V0OiBzZWxlY3Rpb24gPT09IG51bGwgfHwgc2VsZWN0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZWxlY3Rpb24uc2VsZWN0aW9uLmZvY3VzT2Zmc2V0LFxuICAgIH07XG4gICAgY29uc29sZS5sb2cobGFzdFNlbGVjdGlvbik7XG4gICAgY29uc29sZS5sb2coJz09PT09Jyk7XG4gICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZU1vdXNldXAnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhpc1RleHRTZWxlY3RlZCk7XG4gICAgLy8gY29uc29sZS5sb2coZG9ub3RDbG9zZVBvcHVwQ2FyZCk7XG4gICAgLy8gY29uc29sZS5sb2coc2VsZWN0aW9uKTtcbiAgICAvLyBjb25zb2xlLmxvZyhpc0luU2hhZG93KTtcbiAgICBpZiAoc2VsZWN0aW9uKSB7XG4gICAgICAgIGlzVGV4dFNlbGVjdGVkID0gc2VsZWN0aW9uLnNlbGVjdGlvbi50b1N0cmluZygpLmxlbmd0aCA+IDA7XG4gICAgfVxuICAgIC8vIOaciemAieS4reaWh+Wtl+S4lOacquW8gOWQryBQcm9tcHQg6K6+572u55WM6Z2i77yI5aaC5p6c5byA5ZCvIFByb21wdCDorr7nva7nlYzpnaLogIzku43nhLbmiafooYzmn6Xor6Lku7vliqHml7bvvIzkvJrlr7zoh7TkuI3lv4XopoHnmoTku7vliqHmiafooYzvvIlcbiAgICBpZiAoaXNUZXh0U2VsZWN0ZWQgJiYgIWRvbm90Q2xvc2VQb3B1cENhcmQpIHtcbiAgICAgICAgaWYgKCFpc0luU2hhZG93KSB7XG4gICAgICAgICAgICAvLyDlnKggUG9wdXBDYXJkIOiMg+WbtOWkluinpuWPkVxuICAgICAgICAgICAgLy8gaXNUZXh0U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIOWBnOatouaXp+eahOWvueivnVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnU3RvcFRoZUNvbnZlcnNhdGlvbicsICdtZXNzYWdlcyc6ICcnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgLy8g6YeN5paw6ZO+5o6lXG4gICAgICAgICAgICAgICAgcG9ydCA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5jb25uZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2Zyb21Db250ZW50U2NyaXB0J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDmmL7npLrnqpflj6Mv5pu05paw56qX5Y+j5L+h5oGvXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uICYmIChzZWxlY3Rpb24gPT09IG51bGwgfHwgc2VsZWN0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZWxlY3Rpb24ua2V5V29yZC5sZW5ndGgpID4gMCAmJiBpc1BpbiAmJiAoKF9hID0gc2VsZWN0aW9uLnNlbGVjdGlvbi5hbmNob3JOb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eubm9kZU5hbWUpID09PSAnI3RleHQnKSB7XG4gICAgICAgICAgICAgICAgc2hvd1BvcHVwQ2FyZCh7ICdrZXlXb3JkJzogc2VsZWN0aW9uID09PSBudWxsIHx8IHNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VsZWN0aW9uLmtleVdvcmQsICdTZW50ZW5jZSc6IHNlbGVjdGlvbi5zZW50ZW5jZSB9LCB3aW5kb3cuZ2V0U2VsZWN0aW9uKCksIGNvbnRhaW5lciwgc2hhZG93Um9vdCwgaXNQaW4sIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8g5ZyoIFBvcHVwQ2FyZCDojIPlm7TlhoXop6blj5FcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFRleHQ7XG4gICAgICAgICAgICAvLyDmmL7npLrlrozlvaLloavnqbrmk43kvZzmjInpkq5cbiAgICAgICAgICAgIGlmIChpc0ZpcmVmb3gpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFRleHQgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFRleHQgPSBzaGFkb3dSb290LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0U3RyaW5nID0gc2VsZWN0ZWRUZXh0LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAvLyBjb25zdCBzZW50ZW5jZSA9ICcnXG4gICAgICAgICAgICBjb25zdCBQb3B1cENhcmRDb250YWluZXIgPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShDT05UQUlORVJfQ0xBU1NOQU1FKVswXTtcbiAgICAgICAgICAgIC8vIGNvbnN0IG1lc3NhZ2VzQm94ID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lc3NhZ2VzJylbMF1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHNlbGVjdGVkVGV4dCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlc0JveD8uY29udGFpbnMoc2VsZWN0ZWRUZXh0LmJhc2VOb2RlLnBhcmVudE5vZGUgYXMgTm9kZSkpO1xuICAgICAgICAgICAgLy8gbGV0IGlzSW5NZXNzYWdlcyA9IGZhbHNlXG4gICAgICAgICAgICAvLyBpZiAoc2VsZWN0ZWRUZXh0LmJhc2VOb2RlKSB7XG4gICAgICAgICAgICAvLyAgIGlmIChtZXNzYWdlc0JveCA9PT0gc2VsZWN0ZWRUZXh0LmJhc2VOb2RlLnBhcmVudE5vZGUgfHwgbWVzc2FnZXNCb3g/LmNvbnRhaW5zKHNlbGVjdGVkVGV4dC5iYXNlTm9kZS5wYXJlbnROb2RlIGFzIE5vZGUpKSB7XG4gICAgICAgICAgICAvLyAgICAgLy/lnKggbWVzc2FnZXMg5a655Zmo5YaF5pON5L2c77yM5YiZ5pi+56S65pON5L2c5oyJ6ZKuXG4gICAgICAgICAgICAvLyAgICAgaXNJbk1lc3NhZ2VzID0gdHJ1ZVxuICAgICAgICAgICAgLy8gICB9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBpZiAoUG9wdXBDYXJkQ29udGFpbmVyICYmIHNlbGVjdGVkVGV4dC50eXBlID09PSAnUmFuZ2UnICYmICFjb250YWluZXIucXVlcnlTZWxlY3RvcignLmNvbnRleHRCb3gyJykpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29udGV4dEJveDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0Qm94Mi5jbGFzc05hbWUgPSAnY29udGV4dEJveDInO1xuICAgICAgICAgICAgICAgIGNvbnRleHRCb3gyLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgICAgICAgICAgICBQb3B1cENhcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGV4dEJveDIpO1xuICAgICAgICAgICAgICAgIGxldCByYW5nZSA9IHNlbGVjdGVkVGV4dC5nZXRSYW5nZUF0KDApO1xuICAgICAgICAgICAgICAgIHJlYWN0X2RvbV8xLmRlZmF1bHQucmVuZGVyKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHVzZXJJbmZvXzIuVXNlckluZm9Db250ZXh0LlByb3ZpZGVyLCB7IHZhbHVlOiB7IHVzZXI6IFVTRVJfSU5GTywgYW5raTogQU5LSV9JTkZPIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoc3R5bGVkX2NvbXBvbmVudHNfMS5TdHlsZVNoZWV0TWFuYWdlciwgeyB0YXJnZXQ6IHNoYWRvd1Jvb3QgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFRvb2xCYXIsIHsgc2VsZWN0ZWRUZXh0OiBzZWxlY3RlZFRleHQuZ2V0UmFuZ2VBdCgwKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgc2VsZWN0ZWRUZXh0U3RyaW5nOiBzZWxlY3RlZFRleHRTdHJpbmcsIHJhbmdlOiByYW5nZSB9KSkpLCBjb250ZXh0Qm94Mik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWlzVGV4dFNlbGVjdGVkKSB7XG4gICAgICAgIC8vIOayoeaciemAieS4reS7u+S9leaWh+Wtl1xuICAgICAgICAvLyDnp7vpmaTlv6vmjbfmjInpkq5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCBTaG9ydGN1dEJ1dHRvbkNvbnRhaW5lciA9IHNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLicgKyBTSE9SVENVVF9CVVRUT05fQ0xBU1NOQU1FKTtcbiAgICAgICAgICAgIGlmIChTaG9ydGN1dEJ1dHRvbkNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIChfYSA9IFNob3J0Y3V0QnV0dG9uQ29udGFpbmVyLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVDaGlsZChTaG9ydGN1dEJ1dHRvbkNvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIOaciemAieS4reaWh+Wtl1xuICAgICAgICAvLyDmmL7npLrlv6vmjbfmjInpkq5cbiAgICAgICAgaWYgKCgoX2IgPSBNeUJveCA9PT0gbnVsbCB8fCBNeUJveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogTXlCb3guc2hhZG93Um9vdCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnF1ZXJ5U2VsZWN0b3IoJy4nICsgU0hPUlRDVVRfQlVUVE9OX0NMQVNTTkFNRSkpID09PSBudWxsICYmIFVTRVJfSU5GTy5jb250ZXh0TWVudSAmJiAhaXNJblNoYWRvdyAmJiAhaXNQaW4pIHtcbiAgICAgICAgICAgIC8vIOiusOW9leacgOi/kemAieS4reeahOaWh+Wtl1xuICAgICAgICAgICAgLy8g5aaC5p6c5LiN5a2Y5Zyo5oyJ6ZKuXG4gICAgICAgICAgICBsZXQgU2hvcnRjdXRCdXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIFNob3J0Y3V0QnV0dG9uQ29udGFpbmVyLmNsYXNzTmFtZSA9IFNIT1JUQ1VUX0JVVFRPTl9DTEFTU05BTUU7XG4gICAgICAgICAgICBzaGFkb3dSb290ID09PSBudWxsIHx8IHNoYWRvd1Jvb3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoU2hvcnRjdXRCdXR0b25Db250YWluZXIpO1xuICAgICAgICAgICAgcmVhY3RfZG9tXzEuZGVmYXVsdC5yZW5kZXIocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LlN0cmljdE1vZGUsIG51bGwsXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoc3R5bGVkX2NvbXBvbmVudHNfMS5TdHlsZVNoZWV0TWFuYWdlciwgeyB0YXJnZXQ6IHNoYWRvd1Jvb3QgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoU2hvcnRjdXRCdXR0b25fMS5TaG9ydGN1dEJ1dHRvbiwgeyBwb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IGV2ZW50LnBhZ2VYICsgMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogZXZlbnQucGFnZVkgKyAxMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgaGFuZGxlU2hvcnRjdXRCdXR0b25DbGljazogKHJ1blByb21wdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIOmYu+atouS6i+S7tuWGkuazoVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgoX2EgPSBNeUJveCA9PT0gbnVsbCB8fCBNeUJveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogTXlCb3guc2hhZG93Um9vdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnF1ZXJ5U2VsZWN0b3IoJy4nICsgQ09OVEFJTkVSX0NMQVNTTkFNRSkpID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlpoLmnpzkuI3lrZjlnKggUG9wdXBDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBDT05UQUlORVJfQ0xBU1NOQU1FO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hhZG93Um9vdCA9PT0gbnVsbCB8fCBzaGFkb3dSb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgbmV3U2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSBnZXRTZWxlY3Rpb24oaXNJblNoYWRvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1NlbGVjdGlvbiA9IHNlbGVjdGlvbiA9PT0gbnVsbCB8fCBzZWxlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbGVjdGlvbi5zZWxlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOmHjeaWsOmAieS4reWIkuivjeWMuuWfn1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJz09PT09PT09PT09PT09PScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Yib5bu65LiA5Liq6IyD5Zu05a+56LGhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdSYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmNob3JOb2RlID0gbGFzdFNlbGVjdGlvbi5hbmNob3JOb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9jdXNOb2RlID0gbGFzdFNlbGVjdGlvbi5mb2N1c05vZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhsYXN0U2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbmNob3JOb2RlICYmIGZvY3VzTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS9v+eUqOS/neWtmOeahCBzZWxlY3RlZCBSYW5nZSDmgaLlpI1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSYW5nZS5zZXRTdGFydChhbmNob3JOb2RlLCBsYXN0U2VsZWN0aW9uID09PSBudWxsIHx8IGxhc3RTZWxlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxhc3RTZWxlY3Rpb24uYW5jaG9yT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSYW5nZS5zZXRFbmQoZm9jdXNOb2RlLCBsYXN0U2VsZWN0aW9uID09PSBudWxsIHx8IGxhc3RTZWxlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxhc3RTZWxlY3Rpb24uZm9jdXNPZmZzZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOiOt+WPliBTZWxlY3Rpb24g5a+56LGhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g56e76Zmk5omA5pyJ546w5pyJ55qE6YCJ5oupXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOa3u+WKoOaWsOeahOmAieWMulxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NlbGVjdGlvbi5hZGRSYW5nZShyYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g56e76Zmk5b+r5o235oyJ6ZKuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFNob3J0Y3V0QnV0dG9uQ29udGFpbmVyID0gc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcuJyArIFNIT1JUQ1VUX0JVVFRPTl9DTEFTU05BTUUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoU2hvcnRjdXRCdXR0b25Db250YWluZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChfYiA9IFNob3J0Y3V0QnV0dG9uQ29udGFpbmVyLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5yZW1vdmVDaGlsZChTaG9ydGN1dEJ1dHRvbkNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pi+56S656qX5Y+jXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dQb3B1cENhcmQoeyAna2V5V29yZCc6IHNlbGVjdGlvbiA9PT0gbnVsbCB8fCBzZWxlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbGVjdGlvbi5rZXlXb3JkLCAnU2VudGVuY2UnOiBzZWxlY3Rpb24uc2VudGVuY2UgfSwgbmV3U2VsZWN0aW9uLCBjb250YWluZXIsIHNoYWRvd1Jvb3QsIGlzUGluLCBydW5Qcm9tcHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSkpKSwgU2hvcnRjdXRCdXR0b25Db250YWluZXIpO1xuICAgICAgICB9XG4gICAgfVxufTtcbmNvbnN0IGdldFNlbGVjdGlvbiA9IChpc0luU2hhZG93KSA9PiB7XG4gICAgbGV0IHNlbGVjdGlvbjtcbiAgICBpZiAoaXNJblNoYWRvdykge1xuICAgICAgICBzZWxlY3Rpb24gPSBzaGFkb3dSb290LmdldFNlbGVjdGlvbigpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0aW9uICE9PSBudWxsICYmIHNlbGVjdGlvbi5yYW5nZUNvdW50ID4gMCkge1xuICAgICAgICAvLyDlvZPliY3pgInkuK3nmoTmloflrZdcbiAgICAgICAgbGV0IGtleVdvcmQgPSBzZWxlY3Rpb24udG9TdHJpbmcoKS50cmltKCk7XG4gICAgICAgIGxldCBzZW50ZW5jZSA9ICcnO1xuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHNlbGVjdGlvbi5mb2N1c05vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgLy8g5aaC5p6c6YCJ5Lit55qE5piv5LiA5Liq5pu05bCP55qE5YWD57Sg77yI5aaCPGVtPu+8ie+8jOaIkeS7rOmcgOimgeWQkeS4iuWvu+aJvlxuICAgICAgICB3aGlsZSAocGFyZW50Tm9kZS50YWdOYW1lICYmICghaXNCbG9ja0xldmVsKChwYXJlbnROb2RlLnRhZ05hbWUgfHwgdW5kZWZpbmVkKS50b0xvd2VyQ2FzZSgpKSAmJiAocGFyZW50Tm9kZS50YWdOYW1lIHx8IHVuZGVmaW5lZCkudG9Mb3dlckNhc2UoKSAhPT0gJ2JvZHknKSkge1xuICAgICAgICAgICAgcGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VudGVuY2VzID0gc3BsaXRJbnRvU2VudGVuY2VzKHBhcmVudE5vZGUpO1xuICAgICAgICBsZXQgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgbGV0IHN0YXJ0T2Zmc2V0U2hpZnQgPSAzO1xuICAgICAgICBsZXQgZW5kT2Zmc2V0U2hpZnQgPSAzO1xuICAgICAgICBpZiAocmFuZ2Uuc3RhcnRPZmZzZXQgPj0gMSkge1xuICAgICAgICAgICAgY29uc3QgY2hhckJlZm9yZSA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyLnRleHRDb250ZW50W3JhbmdlLnN0YXJ0T2Zmc2V0IC0gMV07XG4gICAgICAgICAgICBzdGFydE9mZnNldFNoaWZ0ID0gL1vjgIIu77yBIT/vvJ9dLy50ZXN0KGNoYXJCZWZvcmUpID8gMCA6IDM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmdlLmVuZE9mZnNldCA8IHJhbmdlLmVuZENvbnRhaW5lci50ZXh0Q29udGVudC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFyQWZ0ZXIgPSByYW5nZS5lbmRDb250YWluZXIudGV4dENvbnRlbnRbcmFuZ2UuZW5kT2Zmc2V0XTtcbiAgICAgICAgICAgIGVuZE9mZnNldFNoaWZ0ID0gL1vjgIIu77yBIT/vvJ9dLy50ZXN0KGNoYXJBZnRlcikgPyAwIDogMztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZ2UuZW5kT2Zmc2V0ID09PSAwIHx8IGlzSW5TaGFkb3cpIHtcbiAgICAgICAgICAgIGVuZE9mZnNldFNoaWZ0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZXhwYW5kZWRSYW5nZSA9IHJhbmdlLmNsb25lUmFuZ2UoKTsgLy8g5aSN5Yi25b2T5YmN6YCJ5Lit55qE6IyD5Zu05a+56LGhXG4gICAgICAgIC8vIGV4cGFuZFJhbmdl55qE6IyD5Zu05YmN5ZCO5ZCE56e75YqoM+S4quWtl+espu+8iOWmguaenOWPr+S7peeahOivne+8iVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZXhwYW5kZWRSYW5nZS5zZXRTdGFydChyYW5nZS5zdGFydENvbnRhaW5lciwgTWF0aC5tYXgocmFuZ2Uuc3RhcnRPZmZzZXQgLSBzdGFydE9mZnNldFNoaWZ0LCAwKSk7XG4gICAgICAgICAgICBleHBhbmRlZFJhbmdlLnNldEVuZChyYW5nZS5lbmRDb250YWluZXIsIE1hdGgubWluKHJhbmdlLmVuZE9mZnNldCArIGVuZE9mZnNldFNoaWZ0LCByYW5nZS5lbmRDb250YWluZXIudGV4dENvbnRlbnQubGVuZ3RoIC0gMSkpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOiOt+WPluWMheaLrOWFs+mUruivjeWJjeWQjuWtl+espueahOWtl+espuS4slxuICAgICAgICBsZXQgZXhwYW5kZWRTZWxlY3RlZFRleHQgPSBleHBhbmRlZFJhbmdlLnRvU3RyaW5nKCk7XG4gICAgICAgIGZvciAobGV0IHMgb2Ygc2VudGVuY2VzKSB7XG4gICAgICAgICAgICBpZiAocy5pbmNsdWRlcyhleHBhbmRlZFNlbGVjdGVkVGV4dCkpIHtcbiAgICAgICAgICAgICAgICBzZW50ZW5jZSA9IHM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbnRlbmNlID09PSAnJykge1xuICAgICAgICAgICAgc2VudGVuY2UgPSBzZWxlY3Rpb24uYW5jaG9yTm9kZS5kYXRhO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHsgJ3NlbGVjdGlvbic6IHNlbGVjdGlvbiwgJ2tleVdvcmQnOiBrZXlXb3JkLCAnc2VudGVuY2UnOiBzZW50ZW5jZSB9KTtcbiAgICAgICAgcmV0dXJuIHsgJ3NlbGVjdGlvbic6IHNlbGVjdGlvbiwgJ2tleVdvcmQnOiBrZXlXb3JkLCAnc2VudGVuY2UnOiBzZW50ZW5jZSB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIOaLhuWIhuaWh+acrOS4uuWPpeWtkOeahOWHveaVsFxuICAgIGZ1bmN0aW9uIHNwbGl0SW50b1NlbnRlbmNlcyhub2RlKSB7XG4gICAgICAgIGxldCB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGVtcERpdi5pbm5lckhUTUwgPSBub2RlLmlubmVySFRNTDtcbiAgICAgICAgbGV0IHBsYWluVGV4dCA9IHRlbXBEaXYuaW5uZXJUZXh0O1xuICAgICAgICAvLyDlr7noi7Hmloflkozml6Xor63nmoTlpITnkIZcbiAgICAgICAgbGV0IHNlbnRlbmNlcyA9IHBsYWluVGV4dC5zcGxpdCgvW+OAgi7vvIEhP++8n10vKTtcbiAgICAgICAgLy8g5Yig6Zmk56m65Y+l5a2QXG4gICAgICAgIHNlbnRlbmNlcyA9IHNlbnRlbmNlcy5maWx0ZXIoKHNlbnRlbmNlKSA9PiBzZW50ZW5jZS50cmltKCkgIT09IFwiXCIpO1xuICAgICAgICByZXR1cm4gc2VudGVuY2VzO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0Jsb2NrTGV2ZWwodGFnTmFtZSkge1xuICAgICAgICBjb25zdCBibG9ja0xldmVsRWxlbWVudHMgPSBbXG4gICAgICAgICAgICAnYWRkcmVzcycsICdhcnRpY2xlJywgJ2FzaWRlJywgJ2Jsb2NrcXVvdGUnLCAnY2FudmFzJywgJ2RkJywgJ2RpdicsICdkbCcsXG4gICAgICAgICAgICAnZHQnLCAnZmllbGRzZXQnLCAnZmlnY2FwdGlvbicsICdmaWd1cmUnLCAnZm9vdGVyJywgJ2Zvcm0nLCAnaDEnLCAnaDInLFxuICAgICAgICAgICAgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JywgJ2hlYWRlcicsICdocicsICdsaScsICdtYWluJywgJ25hdicsICdub3NjcmlwdCcsXG4gICAgICAgICAgICAnb2wnLCAnb3V0cHV0JywgJ3AnLCAncHJlJywgJ3NlY3Rpb24nLCAndGFibGUnLCAndGhlYWQnLCAndHInLCAndWwnXG4gICAgICAgIF07XG4gICAgICAgIHJldHVybiBibG9ja0xldmVsRWxlbWVudHMuaW5jbHVkZXModGFnTmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9XG59O1xuY29uc3Qgc2V0QW5raVNwYWNlID0gKHJhbmdlLCBzZWxlY3RlZFRleHQsIGV2ZW50LCBpc0FkZE5ldykgPT4ge1xuICAgIGxldCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGFua2lTcGFjZSA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhbmtpU3BhY2UnKTtcbiAgICAvLyDojrflj5blvZPliY3mnIDlpKfnmoQgaW5kZXhcbiAgICBsZXQgbWF4SW5kZXggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYW5raVNwYWNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRoaXNJbmRleCA9IE51bWJlcihhbmtpU3BhY2VbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykpO1xuICAgICAgICBpZiAodGhpc0luZGV4ID4gbWF4SW5kZXgpIHtcbiAgICAgICAgICAgIG1heEluZGV4ID0gdGhpc0luZGV4O1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBudW1iZXIgPSBtYXhJbmRleCA9PT0gMCA/IDEgOiBtYXhJbmRleDtcbiAgICBpZiAoaXNBZGROZXcpIHtcbiAgICAgICAgbnVtYmVyID0gbWF4SW5kZXggKyAxO1xuICAgIH1cbiAgICBzcGFuLnRleHRDb250ZW50ID0gJ3t7YycgKyBudW1iZXIgKyAnOjonICsgc2VsZWN0ZWRUZXh0ICsgJ319JztcbiAgICBzcGFuLmNsYXNzTmFtZSA9ICdhbmtpU3BhY2UnO1xuICAgIHNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgbnVtYmVyLnRvU3RyaW5nKCkpO1xuICAgIHNwYW4ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyDmgaLlpI3kuLrpu5jorqTmoLflvI9cbiAgICAgICAgLy8gc3Bhbi5pbm5lclRleHRcbiAgICAgICAgaWYgKHNwYW4udGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgIC8vIGxldCBvbGRUZXh0ID0gc3Bhbi50ZXh0Q29udGVudFxuICAgICAgICAgICAgLy8gb2xkVGV4dCA9IG9sZFRleHQucmVwbGFjZSgne3tjMTo6JywgJycpXG4gICAgICAgICAgICAvLyBvbGRUZXh0ID0gb2xkVGV4dC5yZXBsYWNlKCd9fScsICcnKVxuICAgICAgICAgICAgdmFyIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc2VsZWN0ZWRUZXh0KTtcbiAgICAgICAgICAgIChfYSA9IHNwYW4ucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlcGxhY2VDaGlsZCh0ZXh0Tm9kZSwgc3Bhbik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJhbmdlID09PSBudWxsIHx8IHJhbmdlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYW5nZS5kZWxldGVDb250ZW50cygpO1xuICAgIHJhbmdlID09PSBudWxsIHx8IHJhbmdlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYW5nZS5pbnNlcnROb2RlKHNwYW4pO1xufTtcbmNvbnN0IFN0eWxlZEJ1dHRvbiA9IHN0eWxlZF9jb21wb25lbnRzXzIuZGVmYXVsdC5idXR0b24gYFxuICAgIFxuICAgIHdpZHRoOiAxOHB4O1xuICAgIGhlaWdodDogMThweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICBwYWRkaW5nOiAycHg7XG4gICAgXG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDU5LDAuMDUxKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICB9XG5cbiAgICAke3Byb3BzID0+IHByb3BzLiRkaXNhYmxlICYmICgwLCBzdHlsZWRfY29tcG9uZW50c18yLmNzcykgYFxuICAgICAgb3BhY2l0eTogMC41O1xuICAgICAgY3Vyc29yOiBoZWxwO1xuICAgIGB9XG5cbiAgICAvLyAke3Byb3BzID0+ICFwcm9wcy4kZGlzYWJsZSAmJiAoMCwgc3R5bGVkX2NvbXBvbmVudHNfMi5jc3MpIGBcbiAgICAvLyAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICAvLyBgfVxuXG5cbmA7XG5jb25zdCBJY29uQnV0dG9uID0gc3R5bGVkX2NvbXBvbmVudHNfMi5kZWZhdWx0LmJ1dHRvbiBgXG4gICAgXG4gICAgd2lkdGg6IDE2cHg7XG4gICAgaGVpZ2h0OiAxNnB4O1xuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIG9wYWNpdHk6IDAuODtcbiAgICB9XG5gO1xuZnVuY3Rpb24gVG9vbEJhcihwcm9wcykge1xuICAgIGNvbnN0IFtzaG93TWVudSwgc2V0U2hvd01lbnVdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHRydWUpO1xuICAgIGNvbnN0IENvbnRleHRCb3ggPSAoMCwgcmVhY3RfMS51c2VSZWYpKG51bGwpO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gKDAsIHVzZXJJbmZvXzEudXNlVXNlckluZm9Db250ZXh0KSgpO1xuICAgIC8vIGxldCBwb3J0RnJvbU1lbnU6IGFueVxuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICBjb25zdCBjb250ZXh0Qm94ID0gQ29udGV4dEJveC5jdXJyZW50O1xuICAgICAgICBjb25zdCBwb3B1cENhcmQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignI0xlYXJuaW5nRW5nbGlzaDIwMjMnKTtcbiAgICAgICAgY29uc3QgUG9wdXBDYXJkQ29udGFpbmVyID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoQ09OVEFJTkVSX0NMQVNTTkFNRSlbMF07XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzQm94ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlcycpO1xuICAgICAgICAvL+iuvue9ruaMiemSrueahOS9jee9rlxuICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRYID0gcHJvcHMuc2VsZWN0ZWRUZXh0Lng7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dFkgPSBwcm9wcy5zZWxlY3RlZFRleHQueTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0V2lkdGggPSBwcm9wcy5zZWxlY3RlZFRleHQud2lkdGg7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dEhlaWdodCA9IHByb3BzLnNlbGVjdGVkVGV4dC5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IGJ1dHRvblggPSAoY29udGV4dEJveCA9PT0gbnVsbCB8fCBjb250ZXh0Qm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb250ZXh0Qm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLngpIHx8IDA7XG4gICAgICAgIGNvbnN0IGJ1dHRvblkgPSAoY29udGV4dEJveCA9PT0gbnVsbCB8fCBjb250ZXh0Qm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb250ZXh0Qm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnkpIHx8IDA7XG4gICAgICAgIC8vIOacgOWkpyBYIOWAvFxuICAgICAgICBjb25zdCBtYXhYID0gKChwb3B1cENhcmQgPT09IG51bGwgfHwgcG9wdXBDYXJkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwb3B1cENhcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpIHx8IDApIC0gY29udGV4dEJveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCAtIDIwO1xuICAgICAgICBjb25zdCBtZXNzYWdlQm94SGVpZ2h0ID0gbWVzc2FnZXNCb3ggPT09IG51bGwgfHwgbWVzc2FnZXNCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc3NhZ2VzQm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgY29uc3QgY29udGFpbmVyQm94SGVpZ2h0ID0gUG9wdXBDYXJkQ29udGFpbmVyID09PSBudWxsIHx8IFBvcHVwQ2FyZENvbnRhaW5lciA9PT0gdm9pZCAwID8gdm9pZCAwIDogUG9wdXBDYXJkQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gbWVzc2FnZUJveEhlaWdodCA+IGNvbnRhaW5lckJveEhlaWdodCA/IG1lc3NhZ2VCb3hIZWlnaHQgKyA2MCA6IGNvbnRhaW5lckJveEhlaWdodDtcbiAgICAgICAgY29uc3QgbWluWSA9IDAgLSBoZWlnaHQ7XG4gICAgICAgIGxldCBsZWZ0ID0gc2VsZWN0ZWRUZXh0WCAtIGJ1dHRvblggKyBzZWxlY3RlZFRleHRXaWR0aCAtIDYwO1xuICAgICAgICAvLyBsZWZ0ID0gbGVmdCA+IG1heFggPyBtYXhYIDogbGVmdFxuICAgICAgICBsZWZ0ID0gTWF0aC5tYXgoMTAsIE1hdGgubWluKG1heFgsIGxlZnQpKTtcbiAgICAgICAgbGV0IHRvcCA9IHNlbGVjdGVkVGV4dFkgLSBidXR0b25ZIC0gNDA7XG4gICAgICAgIC8vIHRvcCA9IHRvcCA8IG1pblkgPyBtaW5ZIDogdG9wXG4gICAgICAgIHRvcCA9IE1hdGgubWF4KG1pblksIE1hdGgubWluKDYwLCB0b3ApKTtcbiAgICAgICAgLy8gY29udGV4dEJveDIhLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xuICAgICAgICAvLyBjb250ZXh0Qm94IS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgICAgICAgY29udGV4dEJveC5zdHlsZS5sZWZ0ID0gbGVmdC50b1N0cmluZygpICsgJ3B4JztcbiAgICAgICAgY29udGV4dEJveC5zdHlsZS50b3AgPSB0b3AudG9TdHJpbmcoKSArICdweCc7XG4gICAgICAgIHNldFNob3dNZW51KHRydWUpO1xuICAgIH0sIFtdKTtcbiAgICBjb25zdCBoYW5kbGVTZXRBbmtpU3BhY2VCdXR0b25DbGljayA9IChldmVudCwgaXNBZGROZXcpID0+IHtcbiAgICAgICAgc2V0QW5raVNwYWNlKHByb3BzLnJhbmdlLCBwcm9wcy5zZWxlY3RlZFRleHRTdHJpbmcsIGV2ZW50LCBpc0FkZE5ldyk7XG4gICAgICAgIC8vIENvbnRleHRCb3guY3VycmVudCEucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQoQ29udGV4dEJveC5jdXJyZW50ISlcbiAgICAgICAgc2V0U2hvd01lbnUoZmFsc2UpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlRm9sbG93VXBNZW51Q2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBQb3B1cENhcmRDb250YWluZXIgPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShDT05UQUlORVJfQ0xBU1NOQU1FKVswXTtcbiAgICAgICAgY29uc3QgbWVzc2FnZXNCb3ggPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VzJyk7XG4gICAgICAgIGNvbnN0IHNlbnRlbmNlID0gZ2V0U2VsZWN0aW9uKHRydWUpO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRYID0gcHJvcHMuc2VsZWN0ZWRUZXh0Lng7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dFkgPSBwcm9wcy5zZWxlY3RlZFRleHQueTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0V2lkdGggPSBwcm9wcy5zZWxlY3RlZFRleHQud2lkdGg7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dEhlaWdodCA9IHByb3BzLnNlbGVjdGVkVGV4dC5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IGZvbGxvd1VwTWVudUJveFggPSAobWVzc2FnZXNCb3ggPT09IG51bGwgfHwgbWVzc2FnZXNCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc3NhZ2VzQm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLngpIHx8IDA7XG4gICAgICAgIGNvbnN0IGZvbGxvd1VwTWVudUJveFkgPSAoKG1lc3NhZ2VzQm94ID09PSBudWxsIHx8IG1lc3NhZ2VzQm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNzYWdlc0JveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55KSB8fCAwKSArICgobWVzc2FnZXNCb3ggPT09IG51bGwgfHwgbWVzc2FnZXNCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc3NhZ2VzQm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCkgfHwgMCk7XG4gICAgICAgIGNvbnN0IGZvbGxvd1VwTWVudUJveFdpZHRoID0gMTQwO1xuICAgICAgICAvLyBjb25zdCBmb2xsb3dVcE1lbnVCb3hIZWlnaHQgPSBmb2xsb3dVcE1lbnVCb3g/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCB8fCAwXG4gICAgICAgIGNvbnN0IG1heFggPSAoKFBvcHVwQ2FyZENvbnRhaW5lciA9PT0gbnVsbCB8fCBQb3B1cENhcmRDb250YWluZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IFBvcHVwQ2FyZENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkgfHwgMCkgLSBmb2xsb3dVcE1lbnVCb3hXaWR0aCAtIDEwO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXhYKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coKG1lc3NhZ2VzQm94Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgfHwgMCkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlc0JveD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZm9sbG93VXBNZW51JylbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpXG4gICAgICAgIGNvbnN0IG1heFkgPSAoKChQb3B1cENhcmRDb250YWluZXIgPT09IG51bGwgfHwgUG9wdXBDYXJkQ29udGFpbmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBQb3B1cENhcmRDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueSkgfHwgMCkgKyAoKFBvcHVwQ2FyZENvbnRhaW5lciA9PT0gbnVsbCB8fCBQb3B1cENhcmRDb250YWluZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IFBvcHVwQ2FyZENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQpIHx8IDApKSAtICgoKG1lc3NhZ2VzQm94ID09PSBudWxsIHx8IG1lc3NhZ2VzQm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNzYWdlc0JveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55KSB8fCAwKSArICgobWVzc2FnZXNCb3ggPT09IG51bGwgfHwgbWVzc2FnZXNCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc3NhZ2VzQm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCkgfHwgMCkpIC0gMjMwO1xuICAgICAgICBjb25zdCBtZXNzYWdlQm94SGVpZ2h0ID0gbWVzc2FnZXNCb3ggPT09IG51bGwgfHwgbWVzc2FnZXNCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc3NhZ2VzQm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgY29uc3QgY29udGFpbmVyQm94SGVpZ2h0ID0gUG9wdXBDYXJkQ29udGFpbmVyID09PSBudWxsIHx8IFBvcHVwQ2FyZENvbnRhaW5lciA9PT0gdm9pZCAwID8gdm9pZCAwIDogUG9wdXBDYXJkQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gbWVzc2FnZUJveEhlaWdodCA+IGNvbnRhaW5lckJveEhlaWdodCA/IG1lc3NhZ2VCb3hIZWlnaHQgKyAxODAgOiBjb250YWluZXJCb3hIZWlnaHQ7XG4gICAgICAgIGNvbnN0IG1pblkgPSAwIC0gaGVpZ2h0ICsgMTMwO1xuICAgICAgICBsZXQgbGVmdCA9IChzZWxlY3RlZFRleHRYIC0gZm9sbG93VXBNZW51Qm94WCArIHNlbGVjdGVkVGV4dFdpZHRoIC0gNDApO1xuICAgICAgICBsZXQgdG9wID0gKHNlbGVjdGVkVGV4dFkgLSBmb2xsb3dVcE1lbnVCb3hZIC0gc2VsZWN0ZWRUZXh0SGVpZ2h0KTtcbiAgICAgICAgLy8gWCDlnZDmoIfnmoTmnIDlpKfmnIDlsI/lgLxcbiAgICAgICAgbGVmdCA9IE1hdGgubWF4KDEwLCBNYXRoLm1pbihtYXhYLCBsZWZ0KSk7XG4gICAgICAgIC8vIFkg5Z2Q5qCH55qE5pyA5aSn5YC8XG4gICAgICAgIHRvcCA9IE1hdGgubWF4KG1pblksIE1hdGgubWluKG1heFksIHRvcCkpO1xuICAgICAgICBzZXRTaG93TWVudShmYWxzZSk7XG4gICAgICAgIC8vIOWPlua2iOaWh+Wtl+mAieS4re+8jOmBv+WFjeaEj+WkluW8ueWHuuiPnOWNleagj1xuICAgICAgICAoX2EgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1VQREFURV9QT1BVUF9DQVJEJywgcGF5bG9hZDoge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogbGVmdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdG9wLFxuICAgICAgICAgICAgICAgICAgICB9LCBmb2xsb3dVcERhdGE6IHsga2V5V29yZDogcHJvcHMuc2VsZWN0ZWRUZXh0U3RyaW5nLCBzZW50ZW5jZTogc2VudGVuY2UgPT09IG51bGwgfHwgc2VudGVuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbnRlbmNlLnNlbnRlbmNlIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsIHNob3dNZW51ICYmIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgcmVmOiBDb250ZXh0Qm94LCBjbGFzc05hbWU6ICdjb250ZXh0Qm94Jywgc3R5bGU6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgICAgIH0gfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwicm93XCIsXG4gICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgYm9yZGVyUmlnaHQ6IFwiMXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjEyKVwiLFxuICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogXCIxOHB4XCJcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Ub29sdGlwLCB7IHBsYWNlbWVudDogXCJib3R0b21cIiwgdGl0bGU6ICdDbG96ZSBkZWxldGlvbihzYW1lIGNhcmQpJywgYXJyb3c6IGZhbHNlIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoU3R5bGVkQnV0dG9uLCB7IHN0eWxlOiB7IG1hcmdpblJpZ2h0OiAnMTBweCcgfSwgb25DbGljazogKCkgPT4gaGFuZGxlU2V0QW5raVNwYWNlQnV0dG9uQ2xpY2soZXZlbnQsIGZhbHNlKSB9LCBcIlsuLi5dXCIpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Ub29sdGlwLCB7IHBsYWNlbWVudDogXCJib3R0b21cIiwgdGl0bGU6ICdDbG96ZSBkZWxldGlvbihuZXcgY2FyZCknLCBhcnJvdzogZmFsc2UgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChTdHlsZWRCdXR0b24sIHsgb25DbGljazogKCkgPT4gaGFuZGxlU2V0QW5raVNwYWNlQnV0dG9uQ2xpY2soZXZlbnQsIHRydWUpIH0sIFwiWy4uLl0rXCIpKSksXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuVG9vbHRpcCwgeyBwbGFjZW1lbnQ6IFwiYm90dG9tXCIsIHRpdGxlOiAnUHJvbnVuY2lhdGlvbijimqFQcm8pJywgYXJyb3c6IGZhbHNlIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoU3R5bGVkQnV0dG9uLCB7IFwiJGRpc2FibGVcIjogKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSA/IGZhbHNlIDogdHJ1ZSwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnMTBweCdcbiAgICAgICAgICAgICAgICAgICAgfSwgb25DbGljazogKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxhbmcgPSB5aWVsZCAoMCwgbGFuZ18xLmZldGNoY3VycmVudExhbmd1YWdlKSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0TGFuZ3VhZ2UgPSBsYW5nWyd0YXJnZXQnXVsnaWQnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKDAsIHV0aWxfMS5wbGF5VGV4dFRvU3BlZWNoKShwcm9wcy5zZWxlY3RlZFRleHRTdHJpbmcsIGxhbmdfMi5sYW5ndWFnZUNvZGVzW3RhcmdldExhbmd1YWdlXSwgdGFyZ2V0TGFuZ3VhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TWVudShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxlcnQoJyBZb3UgYXJlIG5vdCBQcm8nKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkN1c3RvbWVyU2VydmljZU91dGxpbmVkLCBudWxsKSkpKSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcidcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Ub29sdGlwLCB7IHBsYWNlbWVudDogXCJib3R0b21cIiwgdGl0bGU6ICdJbnZva2UgUHJvbXB0KOKaoVBybyknLCBhcnJvdzogZmFsc2UgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChJY29uQnV0dG9uLCB7IGNsYXNzTmFtZTogJ2xvb2tVcEJ1dHRvbicsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uMTI4X3BuZ18xLmRlZmF1bHR9KWAsXG4gICAgICAgICAgICAgICAgICAgIH0sIG9uQ2xpY2s6IGhhbmRsZUZvbGxvd1VwTWVudUNsaWNrIH0pKSkpKSk7XG59XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyDojrflj5bnlKjmiLfkv6Hmga9cbnRoaXNHZXRVc2VySW5mbygpO1xuLy8g55uR5ZCs6aG16Z2i6byg5qCH5oqs6LW35LqL5Lu2XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2V1cCk7XG4vLyDnm5HlkKzpobXpnaLpvKDmoIfmjInkuIvkuovku7ZcbmRvY3VtZW50Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBjb25zdCBlbGVtZW50ID0gZXZlbnQuY29tcG9zZWRQYXRoKClbMF07XG4gICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiAhZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ1Nob3J0Y3V0QnV0dG9uJykgJiYgTXlCb3ggIT09IHVuZGVmaW5lZCAmJiBNeUJveCAhPT0gbnVsbCAmJiAhaXNQaW4gJiYgIWRvbm90Q2xvc2VQb3B1cENhcmQpIHtcbiAgICAgICAgLy8g5aaC5p6c54K55Ye755qE5LiN5piv5b+r5o235oyJ6ZKu44CB5o+S5Lu256qX5Y+j5Y+K5YW25a2Q5YWD57Sg77yM5YiZ5YWz6Zet56qX5Y+jXG4gICAgICAgIGlmIChNeUJveCAhPT0gZXZlbnQudGFyZ2V0ICYmICFNeUJveC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAvLyDpmpDol4/nqpflj6NcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfpmpDol4/nqpflj6MnKVxuICAgICAgICAgICAgKF9hID0gY29udGFpbmVyLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgICAgICAgICAgLy8gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2VsZWN0aW9uY2hhbmdlJywgaGFuZGxlU2VsZWN0aW9uY2hhbmdlKTtcbiAgICAgICAgICAgIC8vIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZXVwKTtcbiAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgY29udGV4dEJveCA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZXh0Qm94MicpWzBdO1xuICAgIC8vIOeCueWHu+aPkuS7tueql+WPo+S4lOS4jeaYryBUb29sQmFyXG4gICAgY29uc3QgaXNJblNoYWRvdyA9IE15Qm94ID09PSBldmVudC50YXJnZXQgfHwgKE15Qm94ID09PSBudWxsIHx8IE15Qm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBNeUJveC5jb250YWlucyhldmVudC50YXJnZXQpKTtcbiAgICBjb25zdCBpc0luVG9vbEJhciA9IGNvbnRleHRCb3ggPT09IGV2ZW50LmNvbXBvc2VkUGF0aCgpWzBdIHx8IChjb250ZXh0Qm94ID09PSBudWxsIHx8IGNvbnRleHRCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRleHRCb3guY29udGFpbnMoZXZlbnQuY29tcG9zZWRQYXRoKClbMF0pKTtcbiAgICBpZiAoaXNJblNoYWRvdyAmJiAhaXNJblRvb2xCYXIpIHtcbiAgICAgICAgLy8g6ZqQ6JePIFRvb2xCYXJcbiAgICAgICAgaWYgKGNvbnRleHRCb3gpIHtcbiAgICAgICAgICAgIC8vIOeCueWHu+eahOS4jeaYryBzZXRBbmtpU3BhY2VCdXR0b24g5pe25omN6ZqQ6JePXG4gICAgICAgICAgICBpZiAoY29udGV4dEJveCAhPT0gZXZlbnQudGFyZ2V0ICYmICFjb250ZXh0Qm94LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAoX2IgPSBjb250ZXh0Qm94LnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5yZW1vdmVDaGlsZChjb250ZXh0Qm94KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzZWxlY3Rpb25jaGFuZ2UnLCBoYW5kbGVTZWxlY3Rpb25jaGFuZ2UpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudXNlQ3VycmVudExhbmd1YWdlID0gZXhwb3J0cy5DdXJyZW50TGFuZ3VhZ2VDb250ZXh0ID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbmNvbnN0IGxhbmdfMSA9IHJlcXVpcmUoXCIuL2xhbmdcIik7XG5jb25zdCBhc3luY0ZldGNoY3VycmVudExhbmd1YWdlID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgcmV0dXJuIHlpZWxkICgwLCBsYW5nXzEuZmV0Y2hjdXJyZW50TGFuZ3VhZ2UpKCk7XG59KTtcbi8vIOiOt+WPluW9k+WJjeivreiogFxuZXhwb3J0cy5DdXJyZW50TGFuZ3VhZ2VDb250ZXh0ID0gKDAsIHJlYWN0XzEuY3JlYXRlQ29udGV4dCkobnVsbCk7XG5jb25zdCB1c2VDdXJyZW50TGFuZ3VhZ2UgPSAoKSA9PiAoMCwgcmVhY3RfMS51c2VDb250ZXh0KShleHBvcnRzLkN1cnJlbnRMYW5ndWFnZUNvbnRleHQpO1xuZXhwb3J0cy51c2VDdXJyZW50TGFuZ3VhZ2UgPSB1c2VDdXJyZW50TGFuZ3VhZ2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudXNlVXNlckluZm9Db250ZXh0ID0gZXhwb3J0cy5Vc2VySW5mb0NvbnRleHQgPSB2b2lkIDA7XG5jb25zdCByZWFjdF8xID0gcmVxdWlyZShcInJlYWN0XCIpO1xuZXhwb3J0cy5Vc2VySW5mb0NvbnRleHQgPSAoMCwgcmVhY3RfMS5jcmVhdGVDb250ZXh0KShudWxsKTtcbmNvbnN0IHVzZVVzZXJJbmZvQ29udGV4dCA9ICgpID0+ICgwLCByZWFjdF8xLnVzZUNvbnRleHQpKGV4cG9ydHMuVXNlckluZm9Db250ZXh0KTtcbmV4cG9ydHMudXNlVXNlckluZm9Db250ZXh0ID0gdXNlVXNlckluZm9Db250ZXh0O1xuIiwiZXhwb3J0IGRlZmF1bHQgXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlBQUFBQ0FDQVlBQUFERFBtSExBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUFYTlNSMElBcnM0YzZRQUFBQVJuUVUxQkFBQ3hqd3Y4WVFVQUFBaktTVVJCVkhnQjdaMVBiQlJWSE1kL1ZmblRLTFJzUUFKTnlnRGVURU1KM0t4Sm00Z1gvK0VGazNxZ1BTbGViRy9seEhLQ2VHbTlRRHkxWER4NGFWRTRjYkFFcnFaRjVhaE1TWlNZa05KR1NEVlY2bngzZDdadnhwbk83dXo3ODl0NTc1TThkbVlXQlB1KzgvdjNmbStHeU9Gd09Cd09oNDEwYlBIZFlERE8xajc5WUt3RVk2bjI2UXZYd2s5SEc1SW1nQXZCS0ZOeitPU0UwbllrQ1dBa0dOT2tEcCtjVU5pUUpJRHZxV3IyVGVPVEU0cHlrZ1N3SVo2Y0craW00Wk83YUhYdGVXVThmTEllakg4cW4rSzExYitla3lGOGNrTEpUYVlBbGk0ZW9hN09GeWlMdWhDY1VOcUtUQUdzZlBFYXljUUpoUmN2a1daZ1RmbzZkMlQrUG9OQzhXb2pDNThLSUJUdEFtZ1VKeFE5c0JWQW96aWh0RWJiQzZCUkNpS1V4ZHE0Rm94NWtvRDJJTEFvTUFobS9XQmNETVlNdFlBVGdHSTBDTVduRm9UZ0JNQ0VMS0dFNTFzd0U0eHhhakpPY0FKb0l5Q0V1NytzMGMzN1QrbnJILzVNK2kxK01JWnFudzNoQk5DbVBGeGVwOHUzbHBPRTRGTVRJbkFDYUhNZ2hIZS8raTN1SG54cVVBVFpSWDRIYTNwTDIrakg4eDZkZTZOYnZPd0ZZellZM1ZsLzNnbWdJRno2WUM5TnZGVVNML1VIWTRFeWFndE9BQVZpNHUwU0RaL1lKVjd5cU5yZjRhWDlHU2VBZ25IcC9YM1V1eWRTNFBXb0tvSkVkK0FFVURCUThyNXlabi84c2hlTXlhVGY3d1JRUUFhT2R0TEFrYzc0NVpIYWlPQUVVRkFtVHBXU0xzTUtSRnlCRTBCQmdSV0l4UUlBa3o4bVhuQUNLRER2dlA1SzB1WFB4Uk1uZ0FLVEVBY0FXSUhCOE1RSm9NRDA5V3hQKytwc2VNQ3FJd2dyWFhkL1hTTkg5ZTZGSDIrRnJwMHZwbjExT2hpak9HQWxnS3QzVjRLbHptZmtRRUZuYitzQ1NOL1BBVGZnQmNObjVRS3czdTJvMG5jd3UzK3hSVHo4d3NvQy9QVDczL1hqL3Y1KzZ1N09YTXdxRlBQejgvWGpycDNLNzAwUHY3QVJRS1VWU3VpTG01NmVyb2pBRmhZWEYrbjQ4ZVAxODk0OTIwZ0hiRnlBZVBjRG15WWZySzZ1MW8vaHV4dlpqeWtETmdJUS9iOXRrdzhlUEhoUVA5WjE5d00rRnVEUnBnV3d6ZmVEcGFXbCtyR3V1eCt3ZEFFMldnRGY5K3ZIVmxvQTBRVjRua2UyRVJXQXZ0aWNwUVU0ZHV3WTJjYkt5dVorRHVzc1FEd0Z0REVHUUJvWTBsdXl6QUxZbmdLS2R6L1FVQVNxdzhZQ2hOZ1lBTjY3ZHk5eXJxRU1YSWVIQlZDY0FsNi9mcDA2T2pxa0RmejNaQ0phQUowcElHRG5BbFJZQUxIR0xvTkRodzZSVE1RTVFPZmREOWk1QUJVcG9CaGd5VUMyU0VVQjZQVC9nTVZpa09vVVVCUUFldWFiWFdlLytmTlRPdi9kNDhxeENndGxxZ2dFakF0QWRRcUl5UmQ5Yk4vQjdVMFhXbFNucUpFYVFFbnZsQmgzQWFwVHdIaU5QWStQVlIyam1MUUF4Z1dnT2dVVUE4QzhBZGJENWMyOTl5cGlsRWdNMEdsWkRLQTZCUlQ5ZjkrQm5BSjRzbDQvTHBmTE5EVTFSYXJJKzIvTWkza0JLRGF2b2dEeU5GbkduK0FGZngydjNNbkV1anFBeWhRd0hnRG1XV1VUemI5cWROY0FBQ3NMSURzRmxCRUFRalJYenJ4S091anFmSkYwWTFRQXFsTkFHUUVnbnNFelhOSWJtZXZFcUFCVXA0Q2kvNGNweDlPME9ETjhZbmZsN1N3Nk1XNEJRbFFIZ05VbmJhNFRaL0I2SHQwWURRSlZwb0R4QUxBZDBKMEJBRFl1UUxZRlFFYUJ6U1djUVpDS3VrS0k3aG9BWU9NQ1pLZUFzQ2dqSXlQRUdiR3ZRT2RtRUJHekxzRHlSdEJJbGRKQURRQVlFNEJyQkRXN0NCUmlUQUMyTjRJQ1Uzc0JSSXhhZ0JBYkp4OVk3UUpzM3dzWVgxU3l6Z0xZdmhmUVpDdTRDQXNYWU9OZVFGTmJ3ZUt3c0FDMnA0QzYrd0JGalB6TjhTWUxWTVJ1Mzc1Tm5JRklaY1lxTWpxVlpHQkdBTEVtQys0Vk83Q3dzQ0ExVmpIWkNTeGl4QVZ3WDVWTFF1VlN0YWtBRUJoeUFac1dBRHRoVE5UQXN4QXJsYkluUDU0QzZ0NE5KR0pFQUdJQTJOZXpnMjU4MGtQY09QL3Q0OHFUUzRIc0xJVkxDZ2lNU0U5TUFmRjhZUHl3dWFHeVRpRStFY3prNUFNV01RRHVORzRQaVZZcEFGTlBCRXZDa0FEKzMycjk4YlZIV1M5SDFrWjhwVkwyZG5BdUtTRFFMb0MwREFBLzlNKysrWU00b0hxbE1ySUtXRExibWEvOWI0L1hBQ1luSjJsOGZMeHlITVlENTk0MHV6Z2t1aVBWbTBGTnh3RDZCU0JZQVB4d3g4YkdLcTFSWVE4LzRvRXcrdWFBN0F3QWs4OWxIUUFZY0FHYkZpQXNyYzdPenJKZEVGSVpBQUpUeThBaFJtT0FjTkloQks0ZHZFV3RBSVlZalFIRXUzNXdjSkEyTmphbzZIQm9BeE14YWdGc2JBU0pMQVB2TWIvbjBHZ00wTlhWUmJZUmZWNlJlUmVnVlFEeEdzRGh3NGZKTnJnMGdvVG9GVUNzQmlDN3dzYWQrUE1LVFZjQmdWWUIyTjRLTHI0WENIQllCdGY2TDdDOUZaelRLbUNJc1JqQXhrNWdjVE1vaHhRUUdJc0JiQk1BOHYrNXVibjZlY3FyM2JWakxBYXdTUUNZL0tHaG9mbzU4bi9kajRKSncxZ01ZRXNHZ01nZmt5OVdBQ2RPbFlnTDJnUmdXdzBBK3h4R1IwY3JyNE9OVHo2WHV4OW9pMFRpTlFEeDBTaEZBcFUrM1BYaXBJZGc4am5kL1VDYkFPS3ZocCtabVNGYlFOdjNsWS8yQjRIZnk4UU5iUUlRL2I4dFlPTHg2RGQwT0hIYyt3QzBDUUNGaitHVHU2bm9JTC9Id1A4dmwyTFBWbWdUQU13ZlJ4Tm9Penp0a2tNYlRnQ1dreVNBOW5xK3FxTWxrZ1FRV2JQa3NsdkhvWVlrQVVTNkZsYlgvaVZIY1VrU3dMeDR3bTNUcGtNdW1SYmc1djFuNUNndWFSYWdIZ2hpbzJTOGpPc29EbWxwNEpmaEFTYWYwMTQ5aDF6U0JEQkZnaFdBQUp3VktDWnBBc0RrUjZ6QTVWdkw1R2d2cnQ3SnR0d2RXM3lIdHQyRllIamhoUnVmOXREQWtlYmZ2dW1RUTFpVHFid0FhM2s5ZGkzOXV4Ukdnekd6bFFBQW12Y1h3aE1zYWQ0WjYyWFQwZHF1U0o3SXZEUWtBREFXak1ud0JBMk5zQVJPQkd3bU1pOGZCbU91RVFHQWNqQXVoQ2V3QkpmZTI4ZXF0NjBWMm53aTg0S21UTDlSQVlBeUNTSUFhUEJBanhzWGEyRHBST2JoSWxYbms1b1JBSWk0Z3hEWlFuQVRxWlQ2NUlObUJRQVNSUURRQWpWd3RKUDZEbXl2dkhRWndGMGdqWFFUcVFYa2ZhdTFUd3kvZHQydm5jOVFiTGsvandCQW1XTHV3Q0dWcklsY1NmbXVhZklLQUpUSmlTQUxiUk9abDFZRUFBYURnY2Q3ZVZSczJFOWtYbG9WQVBDb2FnM09FbjhLTzVGNWtTR0FFSS8wQ2NGTnBDUmtDaUNrT3hpbnFlb2Urb094MVN2QjNFUWFSb1VBa3ZCb00wN3dZNThPaDhQaE1NSi9FT1NDRmdBVzgrSUFBQUFBU1VWT1JLNUNZSUk9XCIiLCJleHBvcnQgZGVmYXVsdCBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBY2NBQUFDcENBWUFBQUJlZGZZc0FBQUJwMmxVV0hSWVRVdzZZMjl0TG1Ga2IySmxMbmh0Y0FBQUFBQUFQRDk0Y0dGamEyVjBJR0psWjJsdVBTTHZ1NzhpSUdsa1BTSlhOVTB3VFhCRFpXaHBTSHB5WlZONlRsUmplbXRqT1dRaVB6NEtQSGc2ZUcxd2JXVjBZU0I0Yld4dWN6cDRQU0poWkc5aVpUcHVjenB0WlhSaEx5SWdlRHA0YlhCMGF6MGlXRTFRSUVOdmNtVWdOaTR3TGpBaVBnb2dQSEprWmpwU1JFWWdlRzFzYm5NNmNtUm1QU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUx6QXlMekl5TFhKa1ppMXplVzUwWVhndGJuTWpJajRLSUNBOGNtUm1Pa1JsYzJOeWFYQjBhVzl1SUhKa1pqcGhZbTkxZEQwaUlnb2dJQ0FnZUcxc2JuTTZaWGhwWmowaWFIUjBjRG92TDI1ekxtRmtiMkpsTG1OdmJTOWxlR2xtTHpFdU1DOGlDaUFnSUdWNGFXWTZWWE5sY2tOdmJXMWxiblE5SWxOamNtVmxibk5vYjNRaUNpQWdJR1Y0YVdZNlVHbDRaV3haUkdsdFpXNXphVzl1UFNJeE5qa2lDaUFnSUdWNGFXWTZVR2w0Wld4WVJHbHRaVzV6YVc5dVBTSTBOVFVpTHo0S0lEd3ZjbVJtT2xKRVJqNEtQQzk0T25odGNHMWxkR0UrQ2p3L2VIQmhZMnRsZENCbGJtUTlJbklpUHo0ZVFyRGVBQUFCWFdsRFExQkpRME1nVUhKdlptbHNaUUFBS0pGMWtFOG9nM0VZeHo5amlFMVJsT1N3bERLTlpsdHkzU2dVV3JQbHowRzllemVqWm42OW0rUW1GK1VzUnlmSnlYVWxCemRYcFNpblhlU2dYTlF1ck5memJ0aEdubnA2UG4xN250L3YyeGNhbkpwU2FUdXdtY2taa2FtUWEybDV4ZFh5akoxbUhBelJxdWxaRlF5SFoyV0Y3MWxmeFh0czFyd2J0dDd5SHJ5czNsekdDcVgyVGk3MlQ2Yi83dGRWV3lLWjFXVitTQWQwWmVUQTVoVU83K1NVeFh2Q1hZYVlFajZ5T0ZYaGM0dmpGYjRxNzBRakU4SzN3aDM2dXBZUUxnaDc0alY2cW9ZMzA5djZsd2ZMdlRPWmlTM0k3Skh1WTU0b1BnSk1NVWVJVWNZWmxDemMvOXdFeWpjVGJLSFl4V0NERk92a2NCRVVSWkVtS1R4REJwMFJQTUkrdk5KK0srdmZHVmExdzFlWUhKT3Z1cXZhalBnLzNvRGVwNnJXZndvRGNjajdsV1pvUDhuYWl2YnNtdDlYWVVjZW1vNU44MjBSV3R4UWVqRE45N3hwbHM2ZzhSR3VpNSt4aEdNcUhKd1dPUUFBUUFCSlJFRlVlQUh0WFFkOFZGWDJQcE9aZENEMEVxbzBVUkJVVkJEYldsQUVGVVRzdll1dTllOHE3cW9vS0Zpd2dLNWRkOUhWRmJ0clJSRzdDTWdLd2xwbzBvUDBoUFJNWnY3bnUyL096TXRrSnBsSjNxU1FjMzk1YzN0NTM3azUzenYzM2ZlZXEyM3JBWDVTcHdnb0FvcUFJcUFJS0FKQkJKS0NJUTBvQW9xQUlxQUlLQUtLZ0VGQXlWRW5naUtnQ0NnQ2lvQWlFSWFBa21NWUlCcFZCQlFCUlVBUlVBU1VISFVPS0FLS2dDS2dDQ2dDWVFnb09ZWUJvbEZGUUJGUUJCUUJSVURKVWVlQUlxQUlLQUtLZ0NJUWhvQ1NZeGdnR2xVRUZBRkZRQkZRQkpRY2RRNG9Bb3FBSXFBSUtBSmhDQ2c1aGdHaVVVVkFFVkFFRkFGRlFNbFI1NEFpb0Fnb0FvcUFJaENHZ0pKakdDQWFWUVFVQVVWQUVWQUVsQngxRGlnQ2lvQWlvQWdvQW1FSUtEbUdBYUpSUlVBUlVBUVVBVVZBeVZIbmdDS2dDQ2dDaW9BaUVJYUFrbU1ZSUJwVkJCUUJSVUFSVUFTVUhIVU9LQUtLZ0NLZ0NDZ0NZUWdvT1lZQm9sRkZRQkZRQkJRQlJVREpVZWVBSXFBSUtBS0tnQ0lRaG9DU1l4Z2dHbFVFRkFGRlFCRlFCSlFjZFE0b0FvcUFJcUFJS0FKaENDZzVoZ0dpVVVWQUVWQUVGQUZGUU1sUjU0QWlvQWdvQW9wQW8wRGdzYi9mUTQ4OWZrL1VzU0wvM2ltM1JzMlBKMFBKTVI2MHRLd2lvQWdvQW9wQXZTR1FsN3ViempwN2RFU0NCREdlZGRab3g4Ym16a2h2ZjVkanJXbERpb0Fpb0Fnb0FvcEFnaENZKzltMzFLMTdaME9RM2JwMXBvOCtuR3Q2RW1KODlkVjM2ZWIvbSt4STd4NUhXdEZHRkFGRlFCRlFCQlNCT2tEZzJtdHVONzNBZ2hRSGl4SEVLSG1TWGh0ZnliRTI2R2xkUlVBUlVBUVVnVHBIUUVoUUNOSnBZc1FKS1RuV3VWaTFRMFZBRVZBRUZJSGFJaUFFaVhiczRkcTJLL1ZkYlZzUDhFdEVmVVZBRVZBRUZBRkZRQkVnMHQycU9nc1VBVVZBRVZBRUZJRXdCSlFjd3dEUnFDS2dDQ2dDaW9BaW9PU29jMEFSVUFRVUFVVkFFUWhEUU1reERCQ05LZ0tLZ0NLZ0NDZ0NTbzQ2QnhRQlJVQVJVQVFVZ1RBRWxCekRBTkdvSXFBSUtBS0tnQ0tnenpucUhGQUVGSUVtZ2tCamVXck4xVVRrMGJCUFU4bXhZY3RIUjZjSUtBSzFSc0JQR1NrKzZ0ZXhsTktTZmJWdUxaRU5sSGlUNk5lY0ZDb294YUtla21RaXNhNnViU1hINmhEU2ZFVkFFV2lrQ0ZpVzR1aEJ1Mm5DaWRzb2t3bXlNYmhDSnNZSFpyZWh0MzVzRVJpdWttUjl5RTN2T2RZSDZ0cW5JcUFJMUFrQ2c3cVUwTjJuYkdrMHhBaFFZT1ZPUEdrckhkaXR1RTR3MGs0aUk2RGtHQmtYVFZVRUZJRkdqWUJsTlo0eUtJK1NHcUhoNWVJeGo5NS9kMEFDamVWZWFhT2VNSlVHcitSWUNSSk5VQVFVZ2NhTlFJaE0yalVyYjdTbjByYVoxemIyMERuWkVqV1lRQVNVSEJNSXJqYXRDQ2dDOVllQW4va0VGbGhqZFJnNnprRmQvU0RnYWQyNlQvMzByTDBxQW9xQUl1QTRBdjRBb1lCVi9KU2NuTWQrZ2VPOTFFV0R5Y2taMUxwMUwrNEtOT2tLRUgwalp2dTZBTTNCUG5TM3FvTmdhbE9LZ0NMUWVCQll1YlVaN1N4TTRRSFhGK0g0S1N1OWpQcTJsM3VMalFlN3BqQlNKY2VtSUdVOVIwVkFFYWlFd0xQemV0SjN2N2VybUY0WDY3QzJ0ZEloUGJiUnRORkxLbzVCWXcwQ0FTWEhCaUVHSFlRaW9BalVHd0pNaUNIYk1SUkt6SGlzRzZIbVZxSWh5VVQzbDVpemFBcXRlb3BMRmplRjg5UnpWQVFVZ1QwR0FkeC9jek9ocFZKU1VnWWZMZmhvWHFPemN4bExVUWpLOHFzeUh0MXVOOS9IVENhUHg4VjlKcGtESGZ0OFBuTjR2WDRxS3l1ajh2TEt1MlF0Z3hGOStDMHlsbTVyTkhLdGxHZ0UxSEpNTk1MYXZpS2dDRGlNQURiZGVKbGl2T1FyNTgwMjVWdVpMTlBJN1c1SEhuZnJtUHNLRWFOc2RwR3FsVmtyTlRXWlV0TlNnbVFvSmNWUFl0TEU0VWttU2t0UE1VUlpVbHhLSlNWbFVvVEhLRnRQWGNGZHFIYWJOVmhRQXcwQ0FTWEhCaUVHSGNTZWh3QVVZV1VsdStlZFo4TTRJNysvbUx6ZTlVeVdPOGp0NmN3UC9xZkZQRERMVXJUTEtoU0dwWmlSa2NxV1lueXEwczFXWlVhR2gxSlN2RlJZV0ZMSmtnUlIybTQ5eGp4V0xWaDNDTVFuOGJvYmwvYWtDRFJ5QkVJS3RwR2ZTS01hdnM5ZlFMNnk1VXhtWGNtZDFMS2FzVU5HZGpsVnRDQlRVcElwTXpPOW1qYXF6azVPOWxCV2xvZnlDNHFvckxUTTlwZ0o5MXpWK20zVnpkWmJMaXoyOHJLdFRQYTcyVG91WU91OWxCSGtKV1pYTXJrOHpjanQ0aVZ1VHhzK3Q4WlBMWTMvRE9wdG1takhpb0FpMERBUndIMi9kVVRKc293WmZaUWhxOUZPakM2MitHcFBqUFplbTJWbThOT1doVlJxQ0ZJSXVmcngyZHVvNzNCQi9sb3FLbHpQUzh2OC9HZ0tXOU51RjErQUpKR2Y3N2Z5WFZjcTkrYVIxNytMWENYcktEbTFNeTh4WjlmM2tHdlZ2NUpqcmVEVHlvcUFJdEJRRVNncjI4Q1dUYnhmNG1DRnowdXB0YlVZSTJHU3lRUlpYcDdQeTcrVk4rdEVLdDlRMHBKY1hqcHljREoxeU9wSmF6ZTFwSTFiZDlQR0xidG9OeThYRnhXVmtKOVBKNFdaSkRrdHlWaVJQcitQdktVNWZKNjdLRFcxSjdtU1lsL2liaWpuakhFb09UWWthZWhZRkFGRm9BSUM2ZW5Xc21aUlVWR0Y5TmdpZkYvUEY5dVhMZXdybkxqSEdJdHIxNzY5S2JaMXk1WllpcHN5YUh2MzdzSkdjNy9SN3kralhqMjhOUDZNZzRuS3ZOU2phMHNxM2wxRU9UOXZwRTI4Wkx6czl4MzBBNGVYcjlwQ20zZms4bEpyR1dVMVQrZUxBS0xDb3Qxc0tmOUN6WnZ2MHlnSlVza3g1bW10QlJXQnBvZkE2V2VNTXkvNGZQMzFOK3ZsNVBmZmYzL1Q3N3g1ODJyVVAzYTB4dU93S3pXV3pUZjc3amVBamg5NW9tbjZrdzgvb3ArWExvdXBHN1NOSmR1U2t0S1l5a3VoaVZQdTV1Vk02eDVwUFBjcUowNjRRNXFva1Y5U3RKbmF0KzVFM1pnVW4zNTVIaDJTMjU0R2RHcGw3cU4yN3RHV2h2VnZUMWVPSFVURmhlWDA5WkljbWoxL05lVnN6YVZ2RnY1R2UvZnFRRDI3ZEtCNVA2Nmh0TXgrTmVxL1Bpc3BPZFluK3RxM0loQkE0TUlMejZlaFE0ZFd3T09EOXorZzl6LzQwS1QxNmR1WGJycnhlbnI0a2VtMFl2bnlDdVVTRmJHUENSYmNpeS8rSzFGZFJXMzNwSk5Hc3BYbHA1cVNZOVNHbzJTa3BzVm1OZllmTUNEWVFxOCt2V01tUjFSQ0gvR1NZN0N6T2czc1pFdlEya2lVNUNxakVVTjYwYWYvWFVrRE96U24wbVIrYk1YTmo5S1V1dWwvdjY2bmpkdDNVN2ZzdG5UZHVBTXBaMGNSRFR0Z0wrcVYzWm9lbWptWFNyMzU1T1psMXVTVVRvNlAvdWpqanFZL0hYY01mVEZuTG4wKzUzTkgyMWR5ZEJST2JVd1JxQmtDSUVaWVorczNiQWcyc0dQNzltQzRyZ01ualJwSmd3WU5vaVZMZmpKZHc0TGJzWDFIa0t6cllqeTRJR2pkMm5wdUVlRkVYeFI0UEc2endTVFN1V0VKOVlDREJsT0xyQ3lUM1Rhd3BJcElsNjdkYU56Wlo1bjB2TnhjK3ZHSFJWVFZVaXMyc2FBdnJ6YytxeFlkM0hYYm5hYWZTRDkzM3pjNVVuSU4wM3k4OHpTUHJWdzNsZnVUNmQ1bmY2S0xqdS9LajZXVTBaZS9iT1JuT2xQcDg5OXlLT2VQWWlvbzl0R0IvVHNUWjFGWllURjFhSmRPZjJhc3h0LzVIcTFhdTVXWFZaUEpXNWJERzNUYU9iNkxGY1FJQjEvSnNZYWkxbXFLUUVOSEFNU1lhQUtJRllQRlAvMUVPUFlmT05CVWVmMzFOeWc5bzNhUE5jVGF0NVFiZHVnUTJoaTRXRUE0MGRqZ3pUZlIzQUVIRDZaOWJkYWl2Undzd1M3ZHVnYVMyT2ZWejA4KytNaGVwRklZZmRXRUhDczFsS0FFTnhYejR4a3BUR1krR2phNEo4MTg3VWRhc3o2SC9ucnBuOGhmdEpPS21kZmYrWFlGblgvaUFEcmtvSjU4emo2K3Y4dTdiMEg0ZkwveDE5ODIwOEpmMWxQekZxbkc4dmRqazA3WkRyWWVyZnUwVGcwYkZxTllqazYxS2UybzVTaElxSzhJTkVBRXVuVHRRbTFidDZFQzI0YVUvZG1pMjdaak8yMVlIN0l5blJvNjJoN0NSSlRKeTZpdnZSRzZ6d2hpUEdQY2FXWWM4K2ZOcDhWTG5IOVpOczQxSTgwaTRENTc5elhMekxLVWU4RUY1OUg2ZFJ0b1E0QXNDNHVMSEQ5L2p5ZjY1MjJ6V2xnV1l5dzR4MUsycXI1aTZTUFJaWktUK1MwK3ZqUnEwY3hEZy90bDBiSyt2Tk8yN2Q1RXpacFRqM1krS2kxejBmU2JoOU12cTNiVFUvOWNTQzdlbk5NaWd5aXJWUVlkYzJoUFdyTnBKei9iV1VCcGFSNWVtc1c5VW43a3c1L1B2clBrQ0d2UmFZdFJzRlZ5RkNUVVZ3UWFJQUtubno2T3VuYnBRdSsvYjkxN1JCajM0V0JsUHZMd280Nk9HT1IwNVZWWDBQSVZLL2dSaU1yT3oxczZNekl5VEpsN3AweDFqSnphdEdsRDQ3bmZ6bnh1ZG9keExGNXN2ZnQ1S0JPMjJSeGtLd0NyOHNtbm5xSHREaTAvNDEycGRlWHFzcSthbkpQUFY4aVdYaG0xYTl1Q3VuYklvSHYvTXB5MjVQbkpUWGxzTmJyNGZxT2ZGcS9Ob3htdnJLUUYzM3hMbDl4Nkc1VXpvZTZWdFp6dnFTYlRIOXNMS0RlWG4rc3M4VEJCc2dYS2cvQTBzbGNDS1RrR1p3N1VBVVJZWDA3N2I4cjQ0MFhWMkhnUzdwNTY4bW16RWVmMDAwOHorYWVkZGlwdDJyaVJrTzZzODdNU1N6ZDkyRWtYeTZvWUY2eFVTWC9paWNjcFBaM05CSWNjeUczYVE0K1k4K3pTdGF1NXIvbGhZQ09TZENGOWorSWRvcU5PR21Vd2VJZ3ZEbXIyaUllMEdzSWI1eGphQlNycG9nLzg5TVZuY3lrbE5ZWDJIM3dnOWU3Ymg4dkNFdklaSDYwaGpQbUxObkEvY3V5Wlo5Q3YvL3VaZmw0V2VSZHJReWZIMGpKZU91VjdpVm5OTXltZDl5Z1Y1aGRRYTM2T01UZS9tSXI4THNwTWMxSEx6QlE2YzBRdmFwZFp5TlpsT2gzWXhVOFp2azdrTHk2bXRJd1VPdm40QTZocnV5eDZlODVTM3BSVHhpOXNkLzdpUXpma3lGeE9xQy8vQ0FudHBJckd0Zjhxd0ttRHJQckZIOG95cEp4RHB3dmxqeDJxMktrS3l5cG4weVlUcngwcGhOb1BoU3pGSG9wYm9VaUVqWEZHU2crdkcwKzhtQlhxbEtuM0UzYklZak5RMnphdEsrMk9sZDJ6MzMvL1BjMmMrVkk4elZkYkZzODVodkNYdVdDOS94UjVzc0ZtMjlhdDFHZnZ2WG1wRU1RSUhFSUVpYTl0NFBvbWhSOEg2ZHE5SzNYcjBkM1VrN3JJYnl6TzdjWWpMVjd5bHNzakp5NituZWpuaC9weEZud2h4NCtrWkxkMTBWN1p6V25FRWNmeW0zTTJtM3VOeGQ0azNzampwZUdIOWFBUlIrNURXYzFTNktmbFcralhOWC93L2NaMEt1UDdrVTY2Ukc3SWNaN0tuVHh6YlVzUlVBU01kUVNDbkQ5L1BvbTFoS1ZJV0ZDSmRpQ0FFR2xZdlZXMHNwd2RBVWh2OGVJbDVuNmp2QUFBUFNBOFpNZ1FzM3ZXT1dJRUNZWUlDNFFIWnhFLzB1WGNoU3hOdHNrUDRXSVJwRlhXdXNDeHJNcFEyVURJOHN3dnY3Y24wSmN0c1VFRmk0cksrUUgrWWxyKyt6WmF2M1VITmMvaWx4Y1VsUEpyK1hqc2ZFRlF6a1Jaemhaa1BsdVhCVVg4amxVM0R4K2ZFY05hSkcva01VU2FWazVMZjk1Q2F6Yit3WVRwNHcwK3NUMG1FdzhRMkpBREozNDhkYXNyMndpWFZhMUpXOTJKeFpaZms3WnFVaWZhYUdyU1ZrM3FhUCtSRWFnSmxqV3BFN2wzU3pGWFZMelJTc0pTdEVqQjZyODFrK1BJRTBjUW5vV3N1YXQ4THVFVzRienY1NGMxanpwT3VjcjlvK1dTa21Kekh4SG4zTHRQSDlQWlNyNy9pT1hYZ2dKczZuREdWVHhYVjhBYXRBak91Z0FJbld1NzloM1k4a25oeHprTzRNNnhCSnNVS0kreFdESzByRWxpVXZIUytyVnJhTldLbFFSTE0wVEFJVEwyK1dCQ2hkcEhLdzNKblhmUm1aU1h1NVV2eUpiUjFHZStvL3R2T0p5eTJtVHlPVE1wK3J4VVVzcjNuL2tlWXhMSFhieVJDWGg1K1p4U1BDbWN4dy85cDdYbVIzOWNOT21KVHlodmR5NDF5MmpPVnFqejU5dGtOdVJZRXpKY1dZVC9BNFhuaDA4cEtTOSt0SHlrMjl1U0pSUjdHc3FFdHhPZWp6SjJKK1hGdCtjaGJFKzN0Nlg5WTBrcTNFcXBpQmZ3czJPR2VMZ1RmTVdQbG85MGUxdjFpMzhCNyt6cjNJa2ZrZzR1MTFuM3dPUi9BcjdkZGNuT2puSy9UYzViZkhzdGhPM3A0ZWR2dis5bTFkdStmUnNIN09Xc2NQaDRyTkw0bGZiRkQrVllJWHU2dmQwUS90aDB0Sjd2Y1dLSDZpR0hIR0srb1lpWEFDQ3RhNWV1NFEyR3hkRStuTDBmS3lYOE56VFhyTDdMeXJ4aGI4ZXhsbzlSN3FoampxWnMzckNFSlZZNDZ4NmpoSzArVVE0RXVYWHpabnJ2clhkc1pXVmVveDlyWExDc0t1SnF0ZFZRZnBOY0dUVGxnUnQ0dVRTZmxpeGVTZHRkT1pUdDNVQnVQeSticG5vQzl3OTV2dkRMeDEwKy9nQzBwNXlTK2JHTlhkdlcwMnZ2eitYOHRqVHpUWDRPY2xzdXBiZzliSEdXOE12SW96OHEwMURPMno2T0JtVTV5bVFWaFdBTkZMTXhmQ0paa3pFMHVlejU4ZzhudnB5dXZZelVSNTZVd3hLS1ZkYnFYL0tRYUsrTGRLa3ZkZTM1a2lZK3lzUFp5MGg5cEVzNTdiOHA0Ly9oaHgvVC9nZnVUNE1PR0VTZG1maXdLMVEyYlZnV2lUVlBTa3BLYU8yNmRaZzQ5TUVIOGl5ZGZXNkY1cE1wRlB5eGw0azIveXd5cUc3K1YxNFN0TGRkbS82dDVkTU9IVHRTUjc1UXdMbCt4SzltdzNpT09mWVlzN1FLVE5MUzBuaXpDTjYxS24yRjkyK1BCd0dvRkVDNzRqRDM4RUp3SzhuYVhJUC9XYVNqbkpTRnhZak5VNnRYcnFEMzMvNFA1N3RvMUppVHFWZWZ2dHhVNk9KQ2RCbmF0NzdkS0hsV1cyVmx1SmNYNmgvbEdwTDc0UDJGZE03bFk2aEY4NVkwOEtEOXFLeGtiOXE5YmlrbDU2MmdGUDZJTTl2M1p2UkpxZW1VeEk5eGJObFpRbzlQKzVwYXRGeE5LemQ1cVhuNk9uN1hhaW5MRElTWVpKWlVmWDdleENVaWMraGttOUNHSEd0U1d4UExQc0dCcUgwaVdRaGp3bG9LTlpTUHlXMmxZVklqTEhtaHEwQ3JMYXNOaEtXTytLaGp0UzE5U2hzaVVhdXU5cS80T3pYL1B2OThMczJkTzVmd25DRWVwNEFDRmhJQ0lVZzRoWmYydnBqN0JTM2hCL1NkbjMrVzRnWXhGeFlXR3FWdXpmalEvTWVPVmxIOHp2ZFAxSmVYVWZGVmpCOS9YRXh2dnZrVzdlRG5PYUZSdjUrL2dNYnhjNVlEQis3SGI2VHBTbGhtamQ2LzlYK0wvK2VxSEdSbmxVRkJGMXMzWmJ4azZPUEhGS3hsUWovZlU0TkR1ZHk4WFpUdDcyTGtndk5mdk9oSHpyRjBCOEk5ZS9jSnRNVmxjM2Vac1NIZjBpVldHOVo0WGR4SE9ST3hFTERwSXVhZnU2Wk9DdUlmYzZVYUZNVEwwVys4NGk0NjZkVEQ2TkFqaHBpZHV0N21nNmtnb3c4bDgwN1daUDRBMS9yWlg5Q0dqK2Z3RzNDYTBTcitoc1hYeTdiUWZvUFRhWERmWFBySEc4WG12cVNMNTR1M05JMDhHYndxd3Zja25YYUozSkJUNzVhalRCaUFKdVFra3o2VVowM0NFTENoV1MrVDIxSlNWZ243UHdYYUNLUUdxMHVkWUlJSmlBS3dpQkZKS0dmOUEwa2JVaU1VbDdhMGY4SEd3azFpaXIvTUZmRUZuMURjd3NxYWYxMjZkRFlLR0dreS8wR1U5bmgyZHFmZ1EvaE96cjhONjllelJWWk1Eenh3bitrUFAzS2hhTzgvUHorZkgrMVliOG80MlQrZk1iK0ZKOE04cGdMeWg1UC9QOXh2ZlBycFoyZ1FQMXJTaGw4cHQ4THEyUHlQb2w3NC8xOGcyN1FSN2NlYW15QXAzR2UwNUZKU1hFTHVqTFJBRmNqSTBnYy9MbHhrdmx1WWxkWFN5S1dFY2JLY240cjUzdWltQUI2NWVibjAxZHpQT2N1U3I5VUgyZ2dVWjYrWSs3RHlXYThGeW9WeTdTRmJKWHR5SFlWWHJjeWxqOTZkUzJlZWRSUWw4UWtVRkpkUlNYa20zMU50d1g0U2RSelZtM3o4U2FwdEMrZFRDejRtNzkrTGV0NXhLNjFjczVuR3BpeWg1Yit1b3JVcmQxSC9nVHRvL3NKV0NSbDFJdCtRNCtyV2RhODZsb0IwQjJVUWNxSUlyTWtrL3hTaC9FZ2htZERpMjh0RVNyUG5JeXovK0ZKVy9QQnkwZUpTWG54N3VVaHA5bnlFdFgreDBDM0ZGQXRtZGd5bHZQaVI4dXhwNFdIRnZ6TCtzQXp4eUloZ1k4Y01hWEFnUm15V0VkekZyMWpXa3FrOUxUd3NmVWg5OGNQTFJZdExlZkZENVN3ZEEwSjZlT3h1T3J4WFlTakxGcHJ3M2lENjd2ZDJuR0tSSTRnUXJsbXpkTDVubG15SWkyOTJtRFQ3RHdqTlNrY2UrZ0tPOG1nSGlGb2VBaEJkaDlwV1dTOC83d2VyVE53aDNiYlNnNk5oaFZaMjg5ZTJvVnYrTTVnelVGZHV1MVFlVCtXYXpxWDAyS3M5L2VPbDYvZ3JIQ25XaDQxNUhQbjVYcjRYNmFWVjYwcjUvbU15dFd2ZmduTDVaUTNiUC8rY3l0YjhRZ1BHbjBlOWhwOUd1M0xYMG5kZjNFSXpaaFRUbW5YT1BSZnIzTmxWM1ZJOVdJNGg0UW9SeWhEdGNVeHMrZWVSL0hCZnJzYkV0K2RIU3JQbkl5ejlTVm54dzh0RmkwdDU4ZTNsSXFYWjh4SFcvaTNsSVZpSkg0NVR0TGlVRjk5ZUxsS2FQUjloeGI4eS9pQTlMRm5HNGdSajhlMTFJcVhaOHhGT1BQNU1LT1pEdXlFeXNvL0I2aDhZeUJJbndpNG0vaEorU2JZSGRCUWNvK2dpYzRGZ0ZlTTgxSU9UNVZQT01Pck5zZ2d0QXJWS3lHOVJFZTdYb1JDWFlaRFFWSFJubFFzMEdyMVlBblBXL0w2RkxybmdNWDRHOVd6YXAzOVhqSnJmbDVwR0xWdjRhR2NCMFZkdmYwM0hIdXlpNWVYN1VPYndFNm1qL3hpaWJyMXA4Zkx2YU9QU3UranhKOUliSlRFQzBqb2l4OEJzQ2dvUkU4T0t5S1FMWnRrQzhzOWpTOUtnSXFBSUtBSXhJWkNjekJZd3JZbGUxdWdnKzhVNjB4Qkh5OHY1MmIzOFFzck14SHRlclh3aFF0RmI0Ym9wU0hQY0pqOEphUG8wdHl5RGVvNzRNWlFpdnRkb2ZZbERpRG5VZTZSaG9yS1VDRFFVakVjcW41aTAzMWYvUVdlZitTaGRlLzFJdXZDU1AzRW5lTll4aWZyM2FVNDlyeDlGM3EwcmFlTnJtK25sSjEraWRoM0tlUU5QSDJyYlloSDlhMWJieEF5b2pscXRJM0swemtZbUZDWWduTFVjSWtLMzBtTDlSVnZtS3M1VXNFOGlhY0dlWm9XdE9zaVhDWWV3dlJ6aTR1enA5ckNWci8wci9qci81UCtvOHY5SHhmOHJLNy91L3YvNDNaK2V6cndNV00zTHdubjRGdWxaeTZxaWx6RE8wbEwrL2hJN0VHVEZzME1NOVVMejMrUmJ5WndEVEhBRUV6Z01ZdVQzakpvMlRXbVRaZ3lEc0hJbW85SVA2c2hTYmFYTU9rdDRiUHFIOU5MTUwyblVxRU5vNkdGOXFVK2ZMdFMrUXhhbFp1OU5ZOFoyb0RVcmh0Q1hzNyttbkk5KzU3TnEzTVFJVUJOTWpqSVI1TjZHOWMrRWlSV3JDMDFDcTQ3VU5NVEtJakRUMENSS0RyY2NuSnRXV3BDRXJlN054RWIvbHRXS0FKZXpWYmZ5OEN2L0JKWWZhcGN6dUMxekhtRjltVXBoYWRxL0Rhc0Fwc0JwejhZL05LRlUvblVuZnp5ZjUvWms4Nk1EYVliNFFsSXcvNWtWZjB3bWZ2REdHcEFkc2tGQ1NIT1poL205NWZtVXlSdDBzSVBXRkJEZHhZV3QvMytqQ0xpR1ZRZDE1YUxKenp0ZnNaa0tTNm15cVFydFd2cFB5cVBQYUU0VVNmMFRvNHh3MTY0Q2V2bmx6ODBoYVJYODVMcjlyRm1GdmgyT0pKZ2N6V3d6azhHYU1LSGxWSnlIekxPSzUxU3hqRlVPRTZtaWt4VHhLK1NHSlFiNzRYUjdsalZKdWFZOU1kQ1FWY2ZLc05jUDlpTjF4QTltVkc3UFh0OWVYUHNQb0dFSFpZL0IzNXI3T0IyVnZ3aTE0cithay9QZnhXVG9kcmRoYXhHN1NRM3FnVTZqZTFqK05HUGdpK1BRL1VHa2NSM0RTejd5bGJ2NERTOEZsSnJpTVk4emVKZ2tUYjY1MzJqdVNnWTZzSWhNK2k1bnNpMHRLZVZuTlMwTFZQUmZhRFFnU2JsbkdVcXRFQW9PQktueVR4S2FWeFhLYXNSeEJCSk1qcFpBZzFmT0VZYVB5WWtENytzTHpVb1VsTWxnVlpMNUtqbG1La3FSd0h5UmFTTmxKZHRxd2RZa0Y2eFVObERKbmk3MWtCYmVwa21URGdLVjdIV2xqclJoZkZ2NVNtVzFmeU1VT3k2Q25XQXBQdEpOMklhbnBNRVBRQmsyZ3dJWmdZTDJmb0p0Y2NDZWpxSndKdC9tQjlPMGYwQVJCTTJPbldCbUZRajgydkNxVkRZZ05IdTYxSlcyeEVlSFNkZ1I2dWRQSWZHR202U2tUSTVuR3ZYaExlZEhMS0JUSUgzNDVqVnQwbEpGdjl4WHh2Y0ErV1VDcHEyQXhSZHhBUHpTYlg2bmFFR2hpd2s0eWJ4RkI4OUNRcSs1OE1KNGJ0Wm4rdUpYcS9FcjBzcDRSeXJ1VzhKSmN5YkNWbWxTRXI5L2xGOUFhcEVsY2dVVXEwU0ZYMU01QUl6SnFOaGFoYklhY1J3QlQxcnEvZzQxR2hJeXp4TXpjZUJid2crZkJGWlp2Rjh3aGQ5RmU5V1ZaOUZGbDV4S0xWcGtPalFXYlVZUlVBU2FHZ0xCQyszQWNpYVdNZ3RtbjBQZWRiTWpRdkg0NDMrajFMMUdtamNSNFVVTE9HUkpOR0tGV2libTVSWFF6SCs4UTg4K080c3RTaWpKNmg2S0Z6S0V2clRyVUFsTGZpMEhwdFVqSWxCTHk5RWlPVXR3SWpBUW85eGp4TVZiS04wYUFTeEZoS3pQbjh5YlAwdEpNYUpvTkZFUlVBUVNpVUI1enRmOG5jSGRSbDlCWjRFY0UrbndJclhMVG5EUjJZZVBwaW4zUHMxdmtDSHExVGFlRjZuYnlkQWVUdVNvbTI3YnRTUkhBR2NuUHdtRC9VQ0M5cmdGc2xuajU2Q1BselN1dlBJY0pVWUxGdjFWQkJTQk9rYkErL096WkQxWVVjY2RjM2UzSFJ0RG4xaXFaVldLNVZ0THo5cjlHT3Bya1ZvaFVJdExKUkNna1pyTkY2dFF4bVJNUkZzK0JHM1Y4Zm5MZVNsMXJCUlVYeEZRQkJRQlJjQ09RRUM5V2dZRmRLdm9VL2dTdGxmUXNKTUllRHJ5WjFocTZpQXM2Nkltc0l6S0RWa2lDd2dPVno2Y1ppMnpCbmFHR1l2U3oydnUrV28xMWhSNHJhY0lLQUo3UEFJcHFXblVvWE0yYi9yaFRUeDh0bVpITFpaK0ErYWswYjhCWTJPUEI2TWVUdER6NWR3WmNYY0xvZGdGQS9MRHpXLzVlZ0MrSUlCRDRuamJ2WVNSanJyckF5L3FqYnR6cmFBSUtBS0tRRFVJUUNlWnc5UDQzdWtwcHpiNGtJSDA4ZCttbVdjc29UUHhxUzc0MEtYaCtsZnFxTzhjQXJWWVZoV0xrTDhBemE5RUVvSUUrZUdCV1JHZ2tDVHl4YUY4NktGWVNWVmZFVkFFRkFGbkVYQjNQc3JaQnV1d3RhU09SeGdqUTNTcUdDQXlCT2hVa0tTNnhDQlFZM0lVb1lBRWNjQ0pEL0pEUG9RS2h6QUVpd05oT1V5bS9pZ0Npb0FpNENBQ3htSU1XSTRwZmM0aWQ1ZFlkcjg0T0FBSG1uSXhNU2IxUHR2b1ZPaFZPU2N4S3FCRDRVVG5PdENsTmhHR1FJMTJxMEpRc0E1RlVJakRpWlVJSHdRcFFoV3l0SmNUNFlhTlI2T0tnQ0tnQ05RWUFlZ1kwUzBJSjNsU0tPUDRsNmwwMWR0VW52TWQrY29pZjZHanhoM1dvdUt1WGJzb1BkMzZlRFRHYXNhYm5FR3U5b2RRYXA5eHZEU0hGd2FFemdkZG1kZllCWHpvWDFNbllKelVZaWhhTlFJQ2NaTWpKaDdJVDRRcGJZb1FKUjNFaUxJNEVFWWRDQk1INGtLc1VsOTlSVUFSVUFTY1FFQjBrUGhKN21SSzZUMk9mRDNIQm5VUytoRVNkYUxQbXJTUnMyUUpkZTdjMlh3N0VqclI0L0dZTisya3BPRE5QNVpxeGprZ0R6NGM5S2pvVkRrL3hDVy9KdVBRT3BFUmlKc2NSVmhvRG1FUmxnaE1TRkFJVVN4SUVTQjhPU0lQU1ZNVkFVVkFFWWdmQWVnajZCWTR1NTZTdU9STEdWTXd4cC9wTTU2Z3dzSWl1djY2cXlram8rTEx0WkdPL016TURMcnUydkV4dG1oWmdiQUVRWXJpOEpGbHBHR000a09uWXV5STQ1QzQvWHdRVnVjc0FuSGZjeFF5Rk1FZ0hpNUVFQ09FS3dKREdJY0kxZGxUME5ZVUFVVkFFUWdoQUwwakIzU1JIRUl1SUNNSngrb1hGeGZUOHVYTDZmNEhIcUxpNHBKZ2ZZU1Joang4S0RyVzlsQk94Z2k5aURIYVNSSm5nelNVQVdGS0hDdHVvbHRGcDZLY091Y1JpQnRWQ0FzT0FvV0RZQ0FrQ2N0eUtkSndZQkpJV1JFczRsTEhWTlFmUlVBUlVBUWNRRUQwa3hBUGZPaW9lRWdyVXRtYmJyeU91bmZ2em8rZ2JRZ1NwQkFqMHBDSE1wSHFSa3ZEdUVCOElFVWhPTE9rR2lCRXFRZFlFSWJlbFBNVG5TcjFISUJPbXdoRHdNVWtWYU85d0NJY3RBZUJnZmdnUUN5andza21IQ0ZDZTNwcGFTbHQzTGlSRGpua0VGTldmeFFCUlVBUmNCSUJVV3ZSL0pyMGhROFdUNzduUGxxM2JqMlRZVmZUeE5xMTY2bGJ0NjUweCswVHpMSnFQTzNPbnorZmV2VG9ZZlNuRUNISUVqb1RQdlFxMHVFUXg3bUFESEdJL2tVWkljeDQrdGF5MVNNUXQrVW9aQ2RYTElqTEVXNFpRbWhTWHE1OEVFZTYxSzkraUZwQ0VWQUVGSUg0RUJEQ2dDLzZSbndobUhqOTVzMmIwY1E3LzhyRTJJMUFpamdRUmhyeTRtMVBkQ0IwSThMd29VTmhQU0ljZmc1QVFIUXR5aU5mOUd0ODZHanBXQkFJM1FtT3BUU1hFWUhJUkVNMWhIRlZnd1BDRXNFaEQwc0dlRU1PaEc0blJxU3BVd1FVQVVVZ1VRaEFMOEdKOVNqeDJ2Um42YjJRdFphVUZMcS9HVys3MEpPaU4xRVgrbEVJRW5IUm8vQ2hMNkZMNFlRUWhWU2RPQy9Uc1A1VVFDQnV5OUdhSEpacEw1WWlsa3hGUUJDWUVDVHlJVlJNQUxrU1FoamxJWEIxaW9BaW9BZ2tHZ0hvSmljTzdFcWRmTTlVV3JObW5iRVlZVFVpakRUa3hkc0g5Q01jZENIMG94eUlJMDkwcEJnVjByNlVGNUtVZGhLTlkxTnJQMjZHZ2lEa1Nrd0VpeXNhQ0VvY2hBY0NGRUtFVUZFUFBoenFTMWpxcUs4SUtBS0tRRU5GQVBjYkowMmVFaVJHTEtYS0Vpc0lFbmtvRTQrRERvU09oTE92cm9seFlkZVRLQWNkR2tuL1Nodng5SzFscTBjZ2JuS0VJT1RLQnNLMWt5S0VpUU5weUVOWUJJYzZrcTdFV0wxZ3RJUWlvQWcwSEFTbVBmUm9CV0xFTTQwNDdBUTU3YUhwY1EwWStsSElEdm9SQjV5UUp2UWw4dUZFZDRyK2xkVTZwS3RMREFKeGt5T0dBYUZDa0JBaURnZ1F2cVJCZ0NnREo4S1ZTWUIwT1V3Qi9WRUVGQUZGb0lFamtKR1JRZnZ1MjgrUUlVaFJuQkFrOHNKZkRpQmxvdm5RbWRDRjRrczVJVVhvVWF6S0lSK0hPTlFSWFl0MEpVaEJ4bGsvN2tjNVFISWlHQ0ZGREFrQ0V5S1VzRnp0NE5FTkNXUDVBSEY4c21yWXNHSE9uazBqYTIzZXZIbTBZY05HT3YxMGZvK2lPa1ZBRVdoU0NIejc3YmY4R0VnM1NrMU5OVHBWVnRtd1d4VTZGSEdRSC9RdHdrS0NDQ05OZEtxZE9Kc1VnQWsrMmJoM3EwSW9jQkNlT0FnSmNlU0p1WSs0L2FvR2ViS3VqckMwSTIzVTFMLzQ0a3RwN3R6UEkxWmZ1M1oxeFBUd3hNV0xsMUJlWGg0ZGVlUVI0VmtKalQvODhLTzBZTUZDR2pObWRQQXRHQW50VUJ0WEJCU0JCb01BbmwyRUUvMEpuU2xwU0JmOWFTZEcwWnRDbEZKZjBoRlg1d3dDY1pPakNBemRJd3loeUJVTTBoQ0hrTEVjRUc1bFFzaEl3MkVYTHVyVjFQbDhmblAxZGU2NVoxZG93dTJPL2RUKzlhK1hDUVE1Wjg3c0NtMGtPbkwvL1ZOcHg0NmRGZjRoRXQybnRxOElLQUlOQXdFeEpEQWE2RTBoUmhnUjh0aUdFQ1B5b1c5Rmgwb2RwRUhmcW5NZWdkZ1pKTkEzQkFGQndRbkpJVzYvK2tFWkhNaUg4T0JRQmtLM0M5bGtPUEN6MTE0OTZLcXJyblNncGNoTjRGemtQQ0tYcUg0SGJxUTJldmJzU2Z3WDBVVXFIMTZ3dWpMVjVZZTNwM0ZGUUJHb093UkVqK0wvRkE3NkV1UW5iOE9SZEJDbGhGRkdkS2dZR05KTzNZMjhhZlFVOTRZY0NBa0NFbUVCSnJFY1FTQnlKWU44aEVXQUVwYzBTVTgwekY5OTlUVWRmZlN4Tkh2Mko4R3VaczE2emFUOS92c2FPdlBNYytqMTE5K2dGU3RXbUxSbm4zMHVXTzZmLzV4SnA1d3lobnIwNkVXWFhubzVMVno0UXpEdmswOCtOZVhuelBtTVJvMDZ4WlNCdjJUSlQ4RXllRm54bENuMzBkQ2h3MHorNmFlZmFTeFVLVEI5K2d5NjRvcUtiL0YvL3ZrWGVKbjFORlArN0xQUHBiZmZma2VLVTA3T1p0UG5PKys4UytlZGQ0RXBnN2JmZXV2dFlCa0VYbjExRmgxMzNBa21IMzU0Zm9YQ0dsRUVGSUY2UVFBNlVLeEhFQngwSkh3eEtrUm5vaHpDNGlNZllYSDJzS1NwWDNzRTRpWkh1V3BCMTdqS0VSOENnNE9nVUFaNVFwWW1nMzhnWUV3RytFNDY5QmwrU0IrNGo5aW5UMSs2OGNiL281MDdkNXAzdXQ1eXl3UTYrZVNUYWErOWV0QzExMTdENURXVU9uWHFTTGZmL2pmNjA1K09Na043NnFtbmFlTEV1K21vbzQ2aXh4K2Z3ZU11cDNIanpxRGZmbHR1OHZQejgybjE2dC9wN3JzbjA0VVhYa0IzM25rN2JkKyt6WkNoS2NBL2p6d3luYkJrZSt1dHQ5RE1tZjh3SHpZZFBmcFVRbDI0clZ1M212R1lDUC9NbVBFWVRacDBENDluQ0QzNTVOK3BhOWV1ZE1NTk54SElFSzZzck5UMGVmMzFOOUpoaHcyamh4K2VSaDA3ZGpMblZsaG9QV09GKzYrMzNub2JqUjU5TXMyYTlZcTVqNHB6eDcxTmRZcUFJdEJ3RUlCRkNEMHBoSWc0OUJoMEYzUW5uT2d4eEtXczVLRWVuUGdtb2orT0lSRDNzcXIwREFIWkxVZ0lEbkVJQ2dJVnNoUkJ3c2VCQ1lBOFNaZjJhdU4vL2ZVM1RIUzlLelJ4d2drbjBEUFBQR25TN3I5L0NoMTc3UEdHZUhDUGI5Q2dnWFRkZFg4MmVZY2ZmcGdobiszYnQzT1pZMHdhaUhEcTFQdnArdXV2bzV0dXVzR2tIWC84Y0NiS285bktmTjJRcUVua253Y2ZoR1U0MUVTeEhITEhIUk5weTVZdDFMNTllMk1sOXU3ZHl4Q3h4K1BtRjYwZlRDdFhyZ3BlVkVnYjhOSG5Rdzg5UWxkZWVRVk5tSENMeVJvNThrUkQ2TEF3c1dsSEhNWTBmdnhWSnJydnZ2dlFpQkdqNk1zdnY2SVRUeHhCeTVZdE0rbm5ubnN1dFc3ZGlvWU1HVUpqeDQ2aERoMDZTSFgxRlFGRm9BRWdJSVlDOUtFUUkvU25rSjNvU2d4VjlLcmR0eE9wMUdrQXA3WEhEQ0Z1Y3BTckd2Z2lLRWxESElMR0lXa0lRNGhDaGdqRGllOEVrdnZzMDY4Q1lhSE5ObTFhQjV0dTFhb1ZQZmJZZERybm5QTk0yaGRmekEzZThBNFdzZ1ZXclZwbFlzODk5enh0MnJRcG1JTmx6YzgrbTF1aHIvNzkrd2Z6Qnc0Y2FNSi8vR0dSNDdoeFkrbm1tMitod3c4L2dvNC8vbmc2NG9qRG1XQ1BOQzhXRGxZS0JGYXVYR2xDNFR0bWp6bm1hTUlTcmxpYktBUnlGOWV2WHo4VGxIRU9Iejdja096aGh4L0pTNnZIY3QrSDBmRGh4eEV3VUtjSUtBSU5Cd0hvU0ZsaHc2aWdFNkZEUlk4aURXSG9UbGwrUlJpSGxFVWI2aEtEUU56a0NNRkFJQ0E5Q0JZT2NUbkNoU2x4cVFOZkJPelVLY0ZLQXdsVTVWcTJ6QXBtdTkxVnJ5YmpPVXk0Z3c4K21HRDVpVHYvL0hOcHdJQUJFalUrcnU3RXdUcTBPenkvdVAvK2crampqMmNUN24zT25Qa2lML0gyb1RmZmZJMnlza0xqUVIydjEzb1J1NzA5cEVzYy94emlQQjVyQ3pqaXdOTHVjS0d3YU5FQyt1aWoyWVRucVA3eWwxdjVUUjZadk1UNmI5cHZ2NHBqdDlmVHNDS2dDTlF0QW1JWkNrSEtibFVRbitoSStJaUxycFgvZCtoZjZGWTQwYWwxTy9vOXY3ZVFaby94WENFSU9BaFdoSWc0d3BLSE9JUW9DaDJDbGUzSktDY3ZCVUM1dW5ENFF2ZWYvM3dkblhUU0tINEYxRnB6ajI3V3JGZjVIRUprVmxKU0VoeEszNzU5VEJpRWUvbmxsd2JUWVRuRzR6WnMyTUQzQkR2eWZjMC9td1AzQS9GYzV2ejVDOWlTSEY2aHFiNTkrNXI0d29VTHpUMUh5ZnorKy9ubVVaV1dMVnVhWnpFbFBacVArNWpBSGtTT0EwdThCeDg4bEplTzMxRnlqQWFhcGlzQzlZQ0FFQjE4a0IxODZFcm9VZWhYaEtGRDVhVUFJRU1oUXVSTDJLNTM2K0UwOXRndTR5WkhDQkRDQU1tSmd4QkZrRWpISVlLRzBNWEtoS0JSRjBKR2VhZmNwazA1WnVuUjNoN2FsM3VJRHo3NEVHR3A4NDAzWHFQTm16ZlR5SkVuMDdQUFBodThid2RyQ3p0V2NXQ2pTM1oydGlHV2UrNjVsemZScEJuckQ3dFEvL3JYMjgwOVNOeUxyTTdoUEMrNjZGSUM2VTZiOW9DNTV3ZExEazZJME40Ry9nR3dzV2ZhdEllTlZZbmwybSsrK1liSC9DYmZ4N3pkWHJUS01EWVNQZmZjQzJZWkdWYnJva1gvTmVWbCtiWEt5cHFwQ0NnQ2RZWUFEQVk0NkFwWWpmWlZOdEdqWW9TZ0hQUW80bkRJRjh0UmZKT2hQNDRoRURjNVFwQndFSWhZaGpJYUlVUUlEazU4cEF0SnduZlM0WHRxSzFhc1lBdXY4bk9PZUVQT2Q5L05vK2VmZjRFZWZmUmh2Zy9aeGh4WFgzMFYzWGZmQS94WXhOSFVyOS9leHFMODVwdHZ6ZjFCYkhUQmhwaTc3cnFMQ2R6RE8wSWY1VjJvMjgyUWtYZk5OZGVZTU00cDNOblRFSDdpaWNjSk8yUFBPT01zVXhRN1lyRUx0VWVQN2hIYnVQUE9POHprZi9UUkdhWlBsTC9sbHIvUVpaZGRFckY4ZVArSVgzZmR0YndMZGh0YnF0ZWJiQ3lwM25ERDlYVHFxYWRHS3E1cGlvQWlVRThJQ05HSkxrVWNZVEVjb0VPZ1EwR2M4SkVQL1l0MGxCRmRpcmdTcFBOQ3JQRzdWVVZJRUF5RUJPRWhEUWZpSWxpRWtZWjhrQ2w4TEt0aXlmSFFRdzkxL294cTBTSjJqUExwQkNjbm1zTFlkK3pZd2RaY1M1NmNOYk4yc2F5TGN3Ni96eGh0cU9oejE2NWR0ZHBFZzNQSnpkM0ZPMVpiRzFsRTYwdlRGUUZGb0g0UStPNjc3NmhMbHk2VWxwWm0va2VoTTBHQUlENkVoUlFsTHFORUhEb0NQaHpDS0svT1dRVGl0aHhGQ1BCQmRIQUk0eEFoUWFoWU1rQWFybWprQ2tldWtGQ3VJVjdwUkNJL25BTXN6dHE0OVBSMDg0eGpyRzJnejlydUxzVzUxSGJjc1k1WHl5a0Npa0Q4Q09EL0hBZU1CcEFpRGtrVC9ZaTRPS1JCZDhJaFhmU3ZsSlZ5Nmp1RFFOWGJOaVAwSWNLQ0x5UW5RaEt6SDNFUklueVFveHlJMndVYm9RdE5VZ1FVQVVWZ2owZkFyamZGR3NSSmk2NjA2MUhvVERsUVJvZ1N2clNEZEhYT0lSQTNPYUpyRUJ3RUltUW9nckxmZ3hUeVJIbms0OEFFa0tVQXhOVXBBb3FBSXRDVUVZQWVCQm1LN29SdVJacWRDSVVrN1dWUVJ3aFZkV2xpWmxDTkdRb0NnYkFnVEhFaVVBaFRCSVo4SVVRSUZIbHlTRDMxRlFGRlFCRm9hZ2hBWDBJWFFqK0s3b1FQSjRZSHdyaE5CU2M2RldIVWdUNjE2MStrcTNNT2dScVJvd2dWd2hLaFlraDI0VUZ3a2ljUDFkc0ZieS9yM09sb1M0cUFJcUFJTkM0RVFKQ2lVeVVNdzBPSUV6NzBxZWhNbEpXNDZOVEdkY2FOWTdSeGs2TmRHQkFXcmx3Z1NCRVk0cmpxRVdzUmNaVERnVEpTRGdKWHB3Z29Bb3BBVTBkQWRDUjBJOExRamFJekVjWWhsaUxTeFVsNUVLVTY1eEVJSVIxajIwSnFFQ0ljaENZQ0UxK1dXMUVXQW9RVElVdmNKT3FQSXFBSUtBSk5GQUhSaGZCRnI0byt0ZXRMZXpraFF0Ry9RcUpORk1LRW5uYmM1QWhoUUZnUUlraFFoQ1VDbG53eCt4R0hJSEdJSUJFV2dTZjA3TFJ4UlVBUlVBUWFLQUtpQTBHRVFuWVlLblFuVnQvRTJmT2dkMFgvb3B5UXFwUlYzemtFNGlaSENFcUVBaUdKZ01YSDBFQ0NFQ0xLNGhDQlFwQWdWTVJWcU00SlVWdFNCQlNCeG9lQWtKN29SK2hRNkZiUm5hSmZ4Y2NaUW05RzByK043K3diL29qakprY0lTcXhEQ0JFT1FvYlF4RXFVZTVESVExZ2M4dFVwQW9xQUlxQUloQkFRdlNnNkZEbGlQQWdSU2h4bGNZZ2VSbGtoV1lUVk9ZZEEzR3dGSVVFWUVBN0NPT1JLQjJHNzBCREdJVTdxaGFkTHZ2cUtnQ0tnQ0RRbEJLQVQ4VFl4K0tKSEVSWmRDaXprc1E2UUlzZ1MrUWhMT1lUVk9ZOUEzS2dLMlVGNGNDSWtDVU40Y0JBY0hBUXVaY1ZIbnVTYlF2cWpDQ2dDaWtBVFF3QzZGUG9ST2hSaDZFN1JseUJFcEl0K1JUcnlSZitLbmtXK3VzUWdFRGV5RUk0SVJBaE9CQ2JDRklFS0NVb2NBb2F6Q3preHA2V3RLZ0tLZ0NMUXNCRVFnaE05S1hvVW80WWhnWHprU1Rta280em9VZEcvU0ZmblBBSnhreU9FQnFHQThDQW94Q1ZOaENoeHlVZDVDQlMrMUVWOWRZcUFJcUFJTkZVRW9COUZIeUtNQTNzMHhHb1VYQ1FQdnVoYjZGT0pvdzExemlNUTJpOGNZOXNpRVBoQ2NBZ0w4VUY0Y0pJR0lXSk5IY1FwNUlrOFdXZVBzVnN0cGdnb0FvckFIb1VBOUNCMG91aFJoS0V2WlVjLzBvVThvUy9sOFE0eFBsQVdaZENPT3VjUmlOdDhneUFnRUJ3UUlnUUZ3Y0dKSUpHR2ZQZ29nM1FSSk1ySkpFQlluU0tnQ0NnQ1RSRUJNUmFnSzBVL2ltNjFreWIwS1BTdS9VQTVsTEhyMkthSVlTTFBPVzdMMFM1UURBeENndEJBZ25BZ1FqaThUeFY1aU9NUWtvUXdwUTJFMVNrQ2lvQWkwRlFSZ082RUhpd3BLYW13SzFYSUQvblFuN0FheFFoQkhoelNSZjlLSEQ3cXFLczlBbkdUb3doR0NBNmtoelNmajI4ZTQyQ0JJYy80ekgwc1d2S1Y4NGVQZWF4bFphVW1uYWNEbDJXcms5UFZLUUtLZ0NMUUZCR0EvaXYzbHJKdXRGYmFlRTB1b0N2NWZtS1NoN3hsSlFZV3M5VHF0M2FxR3YzTE9yYTBwTlFRcHRjWGV1RUtTRkhJVkFteTlqUEt4U1FXMTkxY0ZCZUxEK0hTTFl1cDROdmJ5THQ1UG0reFVyS3J2VWkwQlVWQUVWQUVZa1BBbGR5TVV2WWFTYzBPdjUvY0dlMkNTNitvclFRWkc0YlJTc1ZGamlCRFdJVUNlc24yNVpUMzVsSGtMOTBkclgxTlZ3UVVBVVZBRVVnd0FwNDIrMUdyTTc0a2x6dEZDZElockpOeXpqbWJjR3krNkFJcStmRy9sWnJkK2RBMCt1T3FLOGdmdUtjb1pqdElzdmlucDVRWUt5R21DWXFBSXFBSTFDMEMzdTFMcVhqMWgrYTJGWXdZSE9wcWg0REhYMUljYUlIQkRBUFV1MjRkRlg0MmgxejhKV28vYjdCeHBhZWJxeElRbzlsWXMydEY3WHJYMm9xQUlxQUlLQUtPSU9EZCtadlJ5L1pOT280MDNFUWI4V1MvK1hiVVU4Ly80SDJUbDM3RUVZWVljVFVDVW9UMWlNT1hueGUxcm1Zb0FvcUFJcUFJMUIwQzJPUW9GaU44V2VXRHJ5NStCSkpLbGkybDhzMmJLOVgwRnhjYnF4RVptYU5PRHVZRGRPeFFCVWw2Ly9nam1LNEJSVUFSVUFRVWdmcERBTHBaRG93Q1lYVTFSOEN6N1phL21OcHBnd2RUbTBuM1lJdVRpUmQrUHBmOGhZV1UzTE1YcGV5ekQzbHpjaWlwUTRlZzFWajg4OC9rejg4blNvdlN1UXZQNGxTK1lyRUxUSzlvb21DbnlZcUFJckRISXlDNk1DNDk2TWV6NFZXVG5yUzd4d09ZNEJQMHBBMFpTaVdMZnFEaVJZdW9ZUGJIbERuaVJOTmx3UWNmR0QvenBKT282T3V2YVB2VUtaUjEzZldVZnR4d2MwV1MvODdiTEtMb1F2SWU5Z0w1MngxcTJwQVhCSWlQQjE1em1Hd1BPdWlnQkorZU5xOElLQUtLUU1ORVlNR0NCWlNkblUzSnZLY0R6ekxLVzNJa0RGOXVZK0Urb2lHOVpZK1EvMzh6b3A2UUVDUDh1RWczYW90Tk44UFRadUpkbFB2Qzg1VC94dXRVdW15WkljZlNYMzZoc3RXcktDa3prektPUG9ieTMzekRJT1Rkc01FeTI5bWlMUHBoSWFVTnJtd1oycUcwWGc0UStzWWpCSWJOUEJBNm5QajJPaHBXQkJRQlJhQXBJQUR5U2tsSk1TOVJnUzVFSEQ3SUVxUUloemowcUJnV1ZXbGNJY2FtZ0YxZG5LTjVRNDZuWTBmVGwreGNMZmo0SXhOM3QyMUhzQkJMbGk0MThiSVZ5OG0zYlN1Vjc5akJiM2J3a3N0amtWeWtnVUtnYm43bFVmZ1ZqQkFpWG9ja0w5S05WRi9URkFGRlFCSFlreEZJVFUwMXB5ZTZFS1FJWjNSbmdDd1JoZzRGaVlJd2ZVeWcwZGZyVEhYOWNRZ0JRNDZ3Q09HU21yY3dmdm0yYmNZdlc3dUd5bWIrMDRUeFUvTFRUL3pRLzV1VWNmSXA1SUdRMkFxTTVpQlVDQk0rQklzcm43UzBOSk5XVkZRVXZFcUtWbC9URlFGRlFCSFlreEVBS2NKWUVDTUJKSWc0TEVoWmFzWDdWTVdTaEM0dDNaTUJhV0RuNXRsK3grMVV2UGhITTZ5MElVT00zL0xxYTZqb3F5K0RELzZYc3VWWXpMdGFVL3IzcCtaanhoQzFhVXZ1SGozNHZyQmxVVVk2SjdORXdNS0hBMGxDd0NCSUVid0lQMUxkZU5NVzhmM1NlZDkrUmUzYWRhVFdiZHRTQjk0NDFLNWRPMnJSb2dWbDh0SndSSWNiMnp3SkkyMGFpbGhlRXhVQlJVQVJjQkFCdWNVa09oSGtod01PYWNpSG5yVEhrVzh0dUpway9Va2dBcDVpM295RGgvdWJqenVEc0RrSHp0TzVNelUvKzV4Z3Q4VjhmN0hrdDErcDJjbWp5ZDJob3hGYW0xc21VTjdyYzdsTWJyQ2NQUURod3NHSFFHVTlYSlpaN1JQQlhxOG00WS9lZjR2NjVyMUN5ZXVKVnViNjZNZFNEeFY0VTZuRWxjSHZHMnhEN3JUV2xKelptakt6T2xDTDF1MnBWZXQyMUlQSi9lQ0RENjVKZDFwSEVWQUVGSUZhSTRBVk5laEhXSTZ5eWdhOUtOYWpkSUI4V0pBb0w2OXNrVHoxRTRlQXA4TUwveUEzVzRKNEMwNDBsM2JRd2RUcGpiZHdkemowMlJTMnpsSjY5cUx5bkUzUnFobkJJeE1DRjJjblNudTY1TmZFVDBsSnBYNmQwaWc3aThqTEMvS2VOQ1ptM0E3MUYvSVBIOTcxVkZiaXA2SlNQK1h0OU5IbWRlVzA0Qk12emYxZ0xQM2x6a2VDeXhvMTZUdGFuYTFidDFJNlgzUTBhOVlzV2hGTlZ3U2FOQUkvLy93TFRacDhYMFFNN3J4akF1Mjc3ejRSOCtvajhmVTMzcVkzMzN5SFRqdHRESjArN2xSSGhtQW5SSkNrL1VBSHNCcGhQY3B5cTRRZDZWd2JxUllCajZkanAyb0xvWUNMcjE3RTZoTy91b29nUHdnYzVlRndSWVR2UENMdUZER2lYVHhTa2w5U1JvVmxxVlRLayttWDFTVzBhYWVYVWp6OEZwOXlYc2RQWXV2VnpldjRITWRJMm1lbDBPbUhwOURuUzk2aEtWTmEwWjEzVGtJempyaXZ2dnFhYnJ6eC8yajc5dTJtdlVNT09aaW1UMytVT25XeU5qMDUwb210RVpEd3UrKytSNWRkZG9rdFZZT0tRTU5Ib0h2Mzd0UzllemN6MEFzdnNGYXFacjc0aW9ranJ5RTVFQ01jZktmSVVjZ1F0NXRnSGVLUU5OR2RFaGVkaWJpNnVrSEF1aWtZUjE4aUhQaENlbFZWUnhsY0ljR1g4aEE4d3RKV1ZmVmp5Y04wY2JOeDZtWUNMQzhzb3E5MzdFM0huZkUzOHJoOWxObXNsZmsyV21seFBoVVhGMUNKMTAzdi8vdE8ycnZOSnVyVklZMysvdDRITkhIaTVGaTZxYllNbGo3R2o3K0dKa3k0bGM0Nzd4ekN4cU1iYnJpSjdydnZmcG94NDlGcTY5ZWt3Sll0VytpZWUrNmx5eSsvdENiVnRZNGlVRzhJTkd1V3lYc0NNa3ovL2Z2dmEzeUpJNjhodVhGc0xiN0IxaU44cC9TVzZFRDcvZ3UwRFgwSlorOEhPbFBTR3hJdWUvSllRdXVkY1p3bGhBcEIyWVVYcWJxZERDRmNXSTQ0NEJCMzB2bDlzQXlUYUVldWwvYnFkd0NOT3ZFNE91SDQ0Mm56MnFXMGRONjdsSjZXVENlT0dFRmpUaHBPWFZ0N0tJV0hVVnJtQzQ3SGliRnMzYnFOQ2dvSzZNZ2pqekRuaDgxQTk5OS9IMXQxSWVMNjVKTlBhY3lZMDNqSmFEOG10Q3NKbGg4YzZ0MTg4eTBtZmNTSWtmVDY2OWF6cGNpYnhHOHVtalhyTlFTTmUvNzVGK2loaHg2aDVjdFgwQVVYWEd6U2hnNGRSbDk4OGFVSmYvcnBIRHJsbERHbXJiLzk3WTdnVWpqcVRKNThqOGtiTmVvVXF6SDlWUVFVZ1dvUmdMVTQ2OVVYSGJNYXBVUG9RU3lYeW5PTTBKbElnMjRWL1FwZGkzUXBJM1hWVHl3Q05XWW9DRkRJTDlJUVJiQW9JNFNJU1FCQnl4R3BYazNUVEQ5OE5ybEZQa3B0bGsxNEM4OTMzeSttang0ZlQ2NnZINkxicmo2VnhsODBrczRkTjV4Y3VXdkprNG9IYmZFb2lyWGtXOU4rN2ZXeXN6dlJnQUVENk9LTEw2Ri8vL3RWV3J0MkhiVnUzWW9HRHR6UEZQdmxsMThOSVo1MjJsak9mOWxNOWx0NFl4UGNoQWwvNWZKclRmclZWNDgzUlBuOTk5K2J2RzM4YU0zdTNmeXF2b0RidlhzMzdkeTVnM3IwNkU3MzNqdlpwTDd5eXIvTUJpTVE1bVdYWFVIbm4zOGVJVzN4NGlVMGJkckRwc3l1WFR2cHVlZGVvSXN1dXBBdDJVZWtPZlVWQVVXZ0hoQ0Fqb1F1aEg0VU1oUzlpU1ZXMGEreVl4VTZWMTNkSVJEM3NpcUdCZ0dDNkVTUWtZWUx3VW8rN2pQSzFSREtRdkNPQ3hwcnEveFcraDBsYnVyZDcwRENBN1o3OSsxQkoxenpCRFZ2bGtMbmI4cmhaYzRDV3JsNkV6VXIraCtmUklvWk5nL1RVZmZpaS8rZ0o1OThtaTIwZTQwMWVOQkJnOWw2bkVxOWUvZW1MNy84a2s0NDRRUW1ybk5Obnc4L1BJMSsvSEV4azJRNS9lYy83OUhISDM5SSsrelRqd1lOR2tnLy9MQ0k1c3o1aklZT3RYWVFSeG9rZHE5MTdkckZaUFhzMmRQNG4zMzJHUjF6ek5FMGN1UklFNy91dW12b3R0dHU1K05XRXovdnZITnA3RmhuTmhTWUJ2VkhFV2dDQ0dCRGppeXJPblhQVVdBVGdvUVBCN0lVS3hHNkV1blF0NDdyVEJtQStoRVJpUHRTUkFndlltdTJSQ2tIa29SUWhSeVJMaGFrclhpdGc0YmttQ0IzRkx0cDBhS0Y5UEdIYjlFUDg3K2dMdDE3c2lYWmljNjUrRWE2NXNhN2FleVpsMUthaXkxR0prVWVpdU91VFpzMmRQdnRmNlgvL2U4bmV1dXROL2hjZlhUVlZkZVlmbGF1WEVWOSsvWUo5dG1xVlN0RFpCczNialJwc0FURjllN2RpMWFzV0NYUm1QM1pzeitsdVhNLzV5WFZBZWE0NG9yeFpuT1EvTE8xYTljMjVyYTBvQ0tRU0FUV3JGbG5WbGQ2MkRiZklJd1ZGK1ExSkFkaWhCUGZ5YkdKam9SdVJCaGtLRG9UWVJ3Z3pPb01FaWZIcEcyeEVSY3ZDQkFVSElSWW5STWhpOEFSRjlLc3JtNjgrV1kwTGo5dDJPbW5wUzlOcEZ3MnFQSkwrS01odkVsbjZXWXZUZmo3bHpSa3lJSDB5MC9mVW9jMEprY1huN3EvTE41dXFpeS9ldlZxV3JCZ0laMTExcG5tUEFjUFBwQ1hSMitpYzg4OTMweHM3TXhidFdwMXNBMXM0Tm5Nbnd2cjBLRzlTZnZqankwa0JMbUpMVjNaeVlkL2pGMjdkZ1hyWVZrMW1qdjY2S09NOVRsMTZyM1JpbWk2SXRBZ0VMaDcwaFFxNVBjMHIyRXl2SHZTMU9DWUNnb0srUkdQS2ZUQzgwOEYwK283WU4rUTQ5UllSQmZDRndMRS96cUlVZlFzNG5EUW9VS2VUdld2N1ZTTlFOeVdvMWlBRUZwVkJDbkVpUElvaDBPdWhrVFFWUTh0amx5ZVhHN3VwN3pFUzIyNzdrV1RYdmllVHB2MEtWMzB3R2QwMXRSUGFlcEw4M2lUekRCZWFrMmp3cnd0MURLRFgrVExIQytUTTQ2ZXFpeWFrWkZCdDk1NkcyLzNmc3M4c3BLYm0wdXZ2Zlk2NFhFTzREVnMyREI2KysxM0NJOTdnT0N3OUlyZHJIaXQzckJoaC9JbW00Y0pkWll1WFVZdnZ2aVNTVU9ISU13NWMrWVFDSFBObXJYY3hydkJjY0Q2aE1POVJWeFpZaG4ybFZmK1RmUG5MekQzWFo5NTVsbTY5TkxMZytVMW9BZzBGQVI2OU9qR3F4djllRGgrTTY4eHR4RkdtbHdZTnBTeEptSkRqdWdmNkVxN0xzWC9NWlpUeGRuenBJN2txWjg0QkVJU2lMRVBDQXJDZzBDckVwU2RGRUVNS0MvMUpCNWpsekVVczY2cXluMSt5bUVESzcrb21ES1NVN2xQRUNDVGM2bVhQdjMwTTlxWnU1dnlWcytsam4zNDdUbGxzaG1uZWdzNGhnR1lJaDM1QmU2UFB6N0RFT1JOTjkxczBuQVA4YW1ubmpSaFdKS1RKMDh5aElqbklQdjA2VU5QUFBHNHlacysvUkc2NXBwcmVmUE9BZWFWZDFkY2NSbU5HSEdDeVR2NzdMUG9QWDdrNU5CRER5TXMyK0tlcEdEZm1kOW1kT0tKSTJqMDZGUHA2YWVmTkhVbVRyeUROd1ZkYXU1NWR1dldqUjU3YkxwcFIzOFVnWWFFd01RNy94b2NEcXhJT0h0YU1ITVBEUWpwUVIvaS94a0hkQ1QyRWlCUDB1Ui9IVEJJblQwVWtnWjFXbkdUSXdRbHhCZkxtZUJlbDF3Rm9SNUkwbW1IQ1pXY3pFc1RTU2swck8xYSt2VUZmczBkYkdMbVBabGtTWnpBRkUybjlFeWpwSlEwU3VibDFyUVV2UGczYmdpcUhQN0pKNTlFbzBhTk5OK3JoQ1VwbHAxVXV1Q0M4OHlHSEN3bjJkLzcycjU5ZTM1OFk1WjVOaEtiaVlDVk9PVE5tVFBiV0p1b1k4OURtYWVlZXNJOHJpRTRYM0xKeFV5T0Y1bnllTCtzT0JDek9rVkFFWWdmZ1VSdXlKSC9aK2hHRUNXYzZFbm9OanNoMm9reS9yUFFHdkVnRURjelFHaENPTlYxQkVIYWhTbjF3dE9yYTZlNi9KNjkrdERtSldYVXZZT0wvdFF2blNpVmQ5cEUzR3pqb3RJQ0h4VVVlL25OT1M3YW5sOU91WG01MVRVZmR6NG1PeXk2YUE3bmJ5ZEdlem04Y2k2YWE5NjhlYlNzNEF1S3BRRDZzQk9qcEt1dkNDZ0M4U01nRzNIZ083bGJGVG9SZXc5d1lRdGlSRndPaVNNUFphQlhrS2V1YmhDSW14eUY3T1RLcHJwaFFzQlNWbndSZm5WMVk4MC80OHp6YU5yUDM5UFdIOTQzcjR6YlZjQ3ZreXYyVVI0ZjIvTjlIUGJUcm9KeUt2SHp1d3FKRDM2TUl6bTFHZms5YVhUNEVkRWZsWWkxZnkybkNDZ0N0VU1BcXl3TjJTVnFRdzcwSTBnUGV0VmFBYk0rZEN3dkpSZGRpWElnU0hWMWgwQ055QkhDaENDcmNpSlVsSkh5RUREcTRSQ1NyYXFOV0xpYkdCQUFBQVJyU1VSQlZQTXdrVzY5NTBsNjhNR2VORy9lUFBPNXFyYmQyNXI3YzN2eko2eGF0bXhaNGNqS3lqS2JZTEI4aVRHcFV3UVVnZnBGNE9yeFY5VHZBS3JwSGRhaWt4WWp1aE1kS3JyU3JoUEZrRUFhd3RDaGNQWXlKa0YvRW9aQTNPUUlRVUdZSXF5cVJtWVhMRWdJOXgrbGJpejFxMm83UEEvdFQ1aGd2VzBtUEUvamlvQWkwTEFSa0hlcU51eFJPanM2NkVmUmh3ampnSTZVUFFkMmdwUjhsRmRYTndqRVRZNFFFb1FtZ29zMlRKU0R3M281cnBEc2RaQ0hKUUlWZERUME5GMFJVQVQyZEFTZ0I2RWJ4VkJBV0l3SStFZ1g4b1MrRkoyNnArUFNVTTZ2UnVRb3dxenVKQ0JzSEhBUXRoQWtybzVFOE5XMW9mbUtnQ0tnQ095SkNNaEtHa2dQK2hDK0hHSkJnaHhGaCs2SkdEVGtjNHFiSENHb1dDdytsRXRtZ1l1RktUZVRVUmRwbUFTeHROT1F3ZE94S1FLS2dDSlFVd1NFRktFSDhmNXBlUlFMY1pDbGtDTDBKZUxRb2FKUGE5cW4xb3NkZ2JqSkVSWWdISVJabFhPVjVwR3ZjSXNoUVVPR1hCaFhRM0JKV0NJbzJVN2UvTTBtcmorS2dDS2dDRFExQktBRGZZVnA1T05iVDhaaVRPYWRxcVZzUFVMSDhsSEdwQWlIUEJOaTBuU1ZGelkxbU9ydGZPTW1SNHhVcm15cUdyWC91NnY1c1ltS1RoNXJUK1hrN256c1dGSXhYMk9LZ0NLZ0NEUVZCSHJpUkplRnpsYjBwV1ZDaE5JMVZEOElDRi9GM0x1WStyaWFVYWNJS0FLS2dDS2dDT3lKQ01STmpsajdodFA3aFh2aWROQnpVZ1FVQVVWQUVRQUNjWk1qTEVZUW95SEhwQnF0eWlyeWlvQWlvQWdvQWc0ajRISmJIM0IzdU5rbTIxemM1QWhTeEtZY0hLNVcrelJaNFBURUZRRkZRQkZvU0Fna3NUNlcyMTNpTjZUeE5iYXh4RTJPT0VHNTc1alMveXB5cGJkcmJPZXM0MVVFRkFGRllJOUN3TjF4R0NWM0cyN09TWW5SR2RHNjJCS002WDFFS0NhSFBMeUtSelJLZDY2aTBrVlRxZnlQK2Z5ZGxZcVBkNFEzYlkranJqelg0OHlwYUN1S2dDS2dDRFFlQktCSFpROEhSaDJKMUNLbDJjL1FsZEtDM04xR1VQcmdXOG1kMnR5MFoxYjErUGFYdEYxZEcvYjJOQnhDSUM1eVJEVVFuRHl2aUlkU0VRYlJTVHA4SExBdXc4TkNxbmhHTWljbmh3NDY2S0RRU0RTa0NDZ0Npa0FUUW1EQmdnV1VuWjF0UGpjbnQ2cEFhQktHRDkyS05CelFwMGl6K3lBK3BNSFFrSExpSTArSnNlWVRLdVlkTlFCWnlBN2dpK1dIZENGQ2hJVXNJVEI3WElTTHNzaURFNy9tdzllYWlvQWlvQWcwVGdTZ0g1UDV3WC9vUWRHWDhKRUcvUW9uZVhhU1JEMGMwS24yc0owVUd5Y2lEV3ZVTVpPakRGdUlFVVFwQWtKWWhJZlBSeUVNa2hUQm9TN0t3S0crQ0J5K09rVkFFVkFFbWlJQzBKVncwSU93L0VDS2NOQ2Jka3NRYVZJVytoTU9PdForVzhwT2pIYTlhd3JyVDQwUWlJc2NBVHFFQWgrQ0ZDdFFMRXFrd3ducENVR2lMTUw0RkF2cUZ4VVZtVGFrWEkxR3JwVVVBVVZBRVdqRUNJRGNoQmh4R3RDamlJdCtSUmg2RThTSVBCQWc4c0tQU0hsb1QvUXh3dXJpUnlBdWNrVHpBRHljREVGK0VEUUVDZklEYWNxVkQ4SklGNEpFWFlSeEtEbkdMekN0b1Fnb0Fuc0dBbUpjUUtkQ0g0cjFoN05ER25RcGlCRmhISEIyblJsT2xzaVhjdUlqVFYzTkVQaC84RTY0N2lkQ2lDc0FBQUFBU1VWT1JLNUNZSUk9XCIiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCJ2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyAob2JqKSA9PiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIDogKG9iaikgPT4gKG9iai5fX3Byb3RvX18pO1xudmFyIGxlYWZQcm90b3R5cGVzO1xuLy8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuLy8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vLyBtb2RlICYgMTY6IHJldHVybiB2YWx1ZSB3aGVuIGl0J3MgUHJvbWlzZS1saWtlXG4vLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuXHRpZihtb2RlICYgMSkgdmFsdWUgPSB0aGlzKHZhbHVlKTtcblx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcblx0aWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuXHRcdGlmKChtb2RlICYgNCkgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmKChtb2RlICYgMTYpICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdH1cblx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcblx0dmFyIGRlZiA9IHt9O1xuXHRsZWFmUHJvdG90eXBlcyA9IGxlYWZQcm90b3R5cGVzIHx8IFtudWxsLCBnZXRQcm90byh7fSksIGdldFByb3RvKFtdKSwgZ2V0UHJvdG8oZ2V0UHJvdG8pXTtcblx0Zm9yKHZhciBjdXJyZW50ID0gbW9kZSAmIDIgJiYgdmFsdWU7IHR5cGVvZiBjdXJyZW50ID09ICdvYmplY3QnICYmICF+bGVhZlByb3RvdHlwZXMuaW5kZXhPZihjdXJyZW50KTsgY3VycmVudCA9IGdldFByb3RvKGN1cnJlbnQpKSB7XG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCkuZm9yRWFjaCgoa2V5KSA9PiAoZGVmW2tleV0gPSAoKSA9PiAodmFsdWVba2V5XSkpKTtcblx0fVxuXHRkZWZbJ2RlZmF1bHQnXSA9ICgpID0+ICh2YWx1ZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChucywgZGVmKTtcblx0cmV0dXJuIG5zO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18uaG1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUgPSBPYmplY3QuY3JlYXRlKG1vZHVsZSk7XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgJ2V4cG9ydHMnLCB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRzZXQ6ICgpID0+IHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignRVMgTW9kdWxlcyBtYXkgbm90IGFzc2lnbiBtb2R1bGUuZXhwb3J0cyBvciBleHBvcnRzLiosIFVzZSBFU00gZXhwb3J0IHN5bnRheCwgaW5zdGVhZDogJyArIG1vZHVsZS5pZCk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImNvbnRlbnRfc2NyaXB0XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2Nocm9tZV9leHRlbnNpb25fdHlwZXNjcmlwdF9zdGFydGVyXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2Nocm9tZV9leHRlbnNpb25fdHlwZXNjcmlwdF9zdGFydGVyXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9jb250ZW50U2NyaXB0L2luZGV4LnRzeFwiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9