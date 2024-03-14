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
    }, []);
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
                        react_1.default.createElement(DropdownMenu.Trigger, { asChild: true },
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
                                } },
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
                        } }, addToAnkiStatus.status == 'success' ? react_1.default.createElement("span", null,
                        react_1.default.createElement(icons_1.CheckCircleTwoTone, { twoToneColor: "#52c41a" }),
                        " Added to ",
                        react_1.default.createElement("span", { style: {
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }, onClick: editNoteInAnki.bind(event, addToAnkiStatus.noteId) }, "Anki")) :
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
        console.log(props.data);
        // 渲染 Prompt 列表
        initializePromptList();
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
            setIsOpenMenu(true);
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
        console.log(data.selection);
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
            // console.log(props.position.x)
            // console.log(props.position.y)   
            // console.log('===')
            // console.log(buttonWidth);
            // console.log(buttonHeight);
            // console.log('===')
            // console.log(window.innerWidth);
            // console.log(window.innerHeight);
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
        console.log('显示应用窗口');
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
            console.log(event);
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
        console.log(event);
        // 移除快捷按钮
        console.log('移除快捷按钮');
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
        if (((_b = MyBox === null || MyBox === void 0 ? void 0 : MyBox.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('.' + SHORTCUT_BUTTON_CLASSNAME)) === null && USER_INFO.contextMenu && !isInShadow) {
            // 记录最近选中的文字
            const range = selection === null || selection === void 0 ? void 0 : selection.selection.getRangeAt(0);
            lastSelection = {
                // 保存各个属性的引用和值
                anchorNode: range.startContainer,
                anchorOffset: range.startOffset,
                focusNode: range.endContainer,
                focusOffset: range.endOffset,
            };
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
                                const newSelection = window.getSelection();
                                // 重新选中划词区域
                                if (lastSelection) {
                                    // 创建一个范围对象
                                    const newRange = document.createRange();
                                    const anchorNode = lastSelection.anchorNode;
                                    const focusNode = lastSelection.focusNode;
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
    console.log(event);
    console.log(event.composedPath());
    const element = event.composedPath()[0];
    if (element instanceof HTMLElement && !element.classList.contains('ShortcutButton') && MyBox !== undefined && MyBox !== null && !isPin && !donotClosePopupCard) {
        // 如果点击的不是快捷按钮、插件窗口及其子元素，则关闭窗口
        if (MyBox !== event.target && !MyBox.contains(event.target)) {
            // 隐藏窗口
            console.log('隐藏窗口');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1dDaERBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Db21wb25lbnRzL0N1c3RvbVByb21wdEZvcm0udHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbXBvbmVudHMvRHJvcGRvd25NZW51SXRlbS50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvQ29tcG9uZW50cy9JbWFnZXMudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbXBvbmVudHMvTmF2LnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvTWVzc2FnZS50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvUG9wdXBDYXJkL1Byb21wdExpc3QudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC9SZWdlbmVyYXRlQnV0dG9uLnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvU2VsZWN0aW9uLnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvVXNlck1lc3NhZ2VJbnB1dC50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvUG9wdXBDYXJkL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvc3R5bGUudHMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvUG9wdXBDYXJkL3V0aWwudHMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvY29udGVudFNjcmlwdC9TaG9ydGN1dEJ1dHRvbi50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvY29udGVudFNjcmlwdC9pbmRleC50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvbGliL2xvY2FsZS50cyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9saWIvdXNlckluZm8udHMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvYXNzZXRzL2ljb24xMjgucG5nIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2Fzc2V0cy9zZXR0aW5nR3VpZGUucG5nIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NyZWF0ZSBmYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhcm1vbnkgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkN1c3RvbVByb21wdEZvcm0gPSB2b2lkIDA7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuZnVuY3Rpb24gQ3VzdG9tUHJvbXB0Rm9ybShwcm9wcykge1xuICAgIGNvbnN0IFtmb3JtXSA9IGFudGRfMS5Gb3JtLnVzZUZvcm0oKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgLy8g5pu05pawIGlucHV0IOaWh+acrOahhueahOm7mOiupOWAvFxuICAgICAgICBmb3JtLnNldEZpZWxkc1ZhbHVlKHtcbiAgICAgICAgICAgIHRpdGxlOiBwcm9wcy5kYXRhLnRpdGxlLFxuICAgICAgICAgICAgZ2V0VW5zcGxhc2hJbWFnZXM6IHByb3BzLmRhdGEuZ2V0VW5zcGxhc2hJbWFnZXMsXG4gICAgICAgICAgICB1c2VyUHJvbXB0OiBwcm9wcy5kYXRhLnVzZXJQcm9tcHRcbiAgICAgICAgfSk7XG4gICAgfSwgW3Byb3BzLmRhdGFdKTtcbiAgICAvLyDkv53lrZggUHJvbXB0XG4gICAgY29uc3Qgc2F2ZVByb21wdCA9ICh2YWx1ZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8g5YWz6Zet6KGo5Y2VXG4gICAgICAgIHByb3BzLm9wZW5DdXN0b21Qcm9tcHRGb3JtKHsgaXNPcGVuOiBmYWxzZSwgZGF0YTogeyAndGl0bGUnOiAnJywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZmFsc2UsICd1c2VyUHJvbXB0JzogJycsICdpZCc6ICcnIH0gfSk7XG4gICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgIC8vIOiOt+WPluW3suS/neWtmOeahCBQcm9tcHQgTGlzdFxuICAgICAgICBjb25zdCBwcm9tcHRMaXN0ID0geWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuZ2V0KHsgXCJwcm9tcHRMaXN0XCI6IFtdIH0pLnRoZW4oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnByb21wdExpc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgbmV3UHJvbXB0cyA9IHByb21wdExpc3Q7XG4gICAgICAgIC8vIOWmguaenCBwcm9wcyDkuK3ljIXlkKsgSUTvvIzliJnor7TmmI7lvZPliY3mmK/lnKjnvJbovpEgUHJvbXB0IOiAjOS4jeaYr+aWsOWiniBQcm9tcHRcbiAgICAgICAgaWYgKHByb3BzLmRhdGEuaWQgIT09ICcnKSB7XG4gICAgICAgICAgICAvLyDlnKggUHJvbXB0IOiusOW9leS4reaJvuWIsOi/meadoSBQcm9tcHRcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3UHJvbXB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChuZXdQcm9tcHRzW2ldWydpZCddID09PSBwcm9wcy5kYXRhLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOS/ruaUuVxuICAgICAgICAgICAgICAgICAgICBuZXdQcm9tcHRzW2ldWyd0aXRsZSddID0gdmFsdWVzWyd0aXRsZSddO1xuICAgICAgICAgICAgICAgICAgICBuZXdQcm9tcHRzW2ldWydnZXRVbnNwbGFzaEltYWdlcyddID0gdmFsdWVzWydnZXRVbnNwbGFzaEltYWdlcyddO1xuICAgICAgICAgICAgICAgICAgICBuZXdQcm9tcHRzW2ldWyd1c2VyUHJvbXB0J10gPSB2YWx1ZXNbJ3VzZXJQcm9tcHQnXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbmV3UHJvbXB0cyA9IFtPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHZhbHVlcyksIHsgJ2lkJzogdGltZXN0YW1wIH0pLCAuLi5wcm9tcHRMaXN0XTtcbiAgICAgICAgfVxuICAgICAgICAvLyDlsIYgUHJvbXB0IOS/neWtmOS4i+adpVxuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2Uuc3luYy5zZXQoe1xuICAgICAgICAgICAgcHJvbXB0TGlzdDogbmV3UHJvbXB0cy5sZW5ndGggPiA2ID8gbmV3UHJvbXB0cy5zcGxpY2UoMCwgNikgOiBuZXdQcm9tcHRzLFxuICAgICAgICB9KS50aGVuKGl0ZW0gPT4ge1xuICAgICAgICAgICAgLy8g5bCGIFByb21wdCDkvKDlm57nu5nniLbnu4Tku7bvvIzku6XorqkgUHJvbXB0IOWIl+ihqCBVSSDph43mlrDmuLLmn5NcbiAgICAgICAgICAgIHByb3BzLmhhbmRsZVByb21wdEVkaXRlZChwcm9wcy5kYXRhLmlkID09PSAnJyk7XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgYWxlcnQoJ/CfpbJTYXZlIGZhaWxlZCwgcG9zc2libHkgZHVlIHRvIGEgdG9vIGxvbmcgUHJvbXB0LiBZb3UgY2FuIGRlbGV0ZSBvdGhlciBQcm9tcHRzIG9yIHNob3J0ZW4gdGhlIFByb21wdCBjaGFyYWN0ZXJzIGFuZCB0cnkgYWdhaW4uIFxcbicgKyBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIOWIoOmZpCBQcm9tcHRcbiAgICBjb25zdCBoYW5kbGVEZWxldGVCdXR0b25DbGljayA9ICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8g5YWz6Zet6KGo5Y2VXG4gICAgICAgIHByb3BzLm9wZW5DdXN0b21Qcm9tcHRGb3JtKHsgaXNPcGVuOiBmYWxzZSwgZGF0YTogeyAndGl0bGUnOiAnJywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZmFsc2UsICd1c2VyUHJvbXB0JzogJycsICdpZCc6ICcnIH0gfSk7XG4gICAgICAgIC8vIOiOt+WPluW3suS/neWtmOeahCBQcm9tcHQgTGlzdFxuICAgICAgICBjb25zdCBwcm9tcHRMaXN0ID0geWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuZ2V0KHsgXCJwcm9tcHRMaXN0XCI6IFtdIH0pLnRoZW4oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnByb21wdExpc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgbmV3UHJvbXB0cyA9IHByb21wdExpc3Q7XG4gICAgICAgIC8vIOWcqCBQcm9tcHQg6K6w5b2V5Lit5om+5Yiw6L+Z5p2hIFByb21wdFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1Byb21wdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChuZXdQcm9tcHRzW2ldWydpZCddID09PSBwcm9wcy5kYXRhLmlkKSB7XG4gICAgICAgICAgICAgICAgLy8g5Yig6ZmkXG4gICAgICAgICAgICAgICAgbmV3UHJvbXB0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgLy8g5bCGIFByb21wdCDkv53lrZjkuIvmnaVcbiAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2Uuc3luYy5zZXQoe1xuICAgICAgICAgICAgICAgICAgICBwcm9tcHRMaXN0OiBuZXdQcm9tcHRzLmxlbmd0aCA+IDYgPyBuZXdQcm9tcHRzLnNwbGljZSgwLCA2KSA6IG5ld1Byb21wdHMsXG4gICAgICAgICAgICAgICAgfSkudGhlbihpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5bCGIFByb21wdCDkvKDlm57nu5nniLbnu4Tku7bvvIzku6XorqkgUHJvbXB0IOWIl+ihqCBVSSDph43mlrDmuLLmn5NcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuaGFuZGxlUHJvbXB0RWRpdGVkKHByb3BzLmRhdGEuaWQgPT09ICcnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLCB7IG9uRmluaXNoOiBzYXZlUHJvbXB0LCBcbiAgICAgICAgICAgIC8vIGxheW91dD0naG9yaXpvbnRhbCdcbiAgICAgICAgICAgIGxhYmVsQ29sOiB7XG4gICAgICAgICAgICAgICAgeHM6IHsgc3BhbjogNiB9LFxuICAgICAgICAgICAgICAgIHNtOiB7IHNwYW46IDUgfSxcbiAgICAgICAgICAgIH0sIGZvcm06IGZvcm0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgbmFtZTogXCJ0aXRsZVwiLCBsYWJlbDogXCJUaXRsZVwiLCBydWxlczogW3sgcmVxdWlyZWQ6IHRydWUsIG1lc3NhZ2U6ICdQbGVhc2UgaW5wdXQgeW91ciB0aXRsZScgfV0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuSW5wdXQsIHsgbWF4TGVuZ3RoOiA0MCwgb25LZXlEb3duOiBoYW5kbGVLZXlEb3duLCBwbGFjZWhvbGRlcjogXCJIb3cgdG8gbmFtZSB0aGUgUHJvbXB0XCIsIHR5cGU6IFwidGV4dFwiIH0pKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgZXh0cmE6IFwiRGlzcGxheSBJbWFnZXMgUmVsYXRlZCB0byB0aGUgU2VsZWN0ZWQgVGV4dFwiLCBuYW1lOiBcImdldFVuc3BsYXNoSW1hZ2VzXCIsIGxhYmVsOiBcIkltYWdlc1wiLCB2YWx1ZVByb3BOYW1lOiBcImNoZWNrZWRcIiB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Td2l0Y2gsIG51bGwpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgbmFtZTogXCJ1c2VyUHJvbXB0XCIsIGxhYmVsOiBcIlByb21wdFwiLCBleHRyYTogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICBgJHsne3NlbGVjdGlvbn0nfTogU2VsZWN0ZWQgdGV4dGAsXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYnJcIiwgbnVsbCksXG4gICAgICAgICAgICAgICAgICAgIGAkeyd7c2VudGVuY2V9J306IFNlbnRlbmNlIGNvbnRhaW5pbmcgdGhlIHNlbGVjdGVkIHRleHRgLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJyXCIsIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjRjA4QTI0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9uQ2xpY2s6ICgpID0+IHdpbmRvdy5vcGVuKCdodHRwczovL2ppYW5nemlsb25nLm5vdGlvbi5zaXRlL0R5bmFtaWMtUGxhY2Vob2xkZXJzLTVmMDcwNTE2M2ZmNjQwYWZiZGQ1NzcxMTVkYzk1Nzc5P3B2cz00JykgfSwgXCJMZWFybiBNb3JlXCIpKSwgcnVsZXM6IFt7IHJlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAnUGxlYXNlIGlucHV0IHlvdXIgcHJvbXB0JyB9XSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbnB1dC5UZXh0QXJlYSwgeyBwbGFjZWhvbGRlcjogXCJUcmFuc2xhdGUge3NlbGVjdGlvbn0gdG8gQ2hpbmVzZVwiLCBvbktleURvd246IGhhbmRsZUtleURvd24sIHJvd3M6IDQsIG1heExlbmd0aDogMzAwMCB9KSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IHN0eWxlOiB7IG1hcmdpbjogJzAnIH0gfSxcbiAgICAgICAgICAgICAgICBwcm9wcy5kYXRhLmlkICE9PSAnJyAmJiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogJzEycHgnXG4gICAgICAgICAgICAgICAgICAgIH0sIG9uQ2xpY2s6IGhhbmRsZURlbGV0ZUJ1dHRvbkNsaWNrLCBkYW5nZXI6IHRydWUgfSwgXCJEZWxldGVcIiksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZTogeyBtaW5XaWR0aDogJzEyMHB4JyB9LCB0eXBlOiBcInByaW1hcnlcIiwgaHRtbFR5cGU6IFwic3VibWl0XCIgfSwgXCJTYXZlXCIpKSkpKTtcbn1cbmV4cG9ydHMuQ3VzdG9tUHJvbXB0Rm9ybSA9IEN1c3RvbVByb21wdEZvcm07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Ecm9wZG93bk1lbnVJdGVtID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uL1BvcHVwQ2FyZC91dGlsXCIpO1xuY29uc3QgRHJvcGRvd25NZW51ID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJAcmFkaXgtdWkvcmVhY3QtZHJvcGRvd24tbWVudVwiKSk7XG5jb25zdCByZWFjdF9pY29uc18xID0gcmVxdWlyZShcIkByYWRpeC11aS9yZWFjdC1pY29uc1wiKTtcbmZ1bmN0aW9uIERyb3Bkb3duTWVudUl0ZW0ocHJvcHMpIHtcbiAgICBjb25zdCBbaXNIb3ZlcmVkLCBzZXRJc0hvdmVyZWRdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICB9KTtcbiAgICBjb25zdCBvblNlbGVjdCA9ICgpID0+IHtcbiAgICAgICAgcHJvcHMub25TZWxlY3QoKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUVkaXRQcm9tcHQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHByb3BzLmhhbmRsZUVkaXRQcm9tcHQoKTtcbiAgICB9O1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51Lkl0ZW0sIHsgc3R5bGU6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICc2cHgnLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnNHB4JyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzJweCdcbiAgICAgICAgfSwgY2xhc3NOYW1lOiBcIkRyb3Bkb3duTWVudUl0ZW1cIiwgb25Nb3VzZUVudGVyOiAoKSA9PiBzZXRJc0hvdmVyZWQodHJ1ZSksIG9uTW91c2VMZWF2ZTogKCkgPT4gc2V0SXNIb3ZlcmVkKGZhbHNlKSwgb25TZWxlY3Q6IG9uU2VsZWN0IH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgZmxleDogJzEnLFxuICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcydcbiAgICAgICAgICAgIH0gfSwgcHJvcHMuY2hpbGRyZW4pLFxuICAgICAgICBpc0hvdmVyZWQgJiZcbiAgICAgICAgICAgIChwcm9wcy5kYXRhLmlkID09PSAnRGVmYXVsdCcgP1xuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgb25DbGljazogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKCdodHRwczovL2ppYW5nemlsb25nLm5vdGlvbi5zaXRlL1doYXQtaXMtdGhlLWRlZmF1bHQtUHJvbXB0LVByb21wdC01YjU1ZTNmYzMwM2Q0MjVmOGNjYTE2ZDViZWUxOWU3YycpO1xuICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ljb25zXzEuUXVlc3Rpb25NYXJrQ2lyY2xlZEljb24sIG51bGwpKVxuICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuZGF0YS5pZCA9PT0gdXRpbF8xLmRpY3Rpb25hcnlQcm9tcHQuaWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKCdodHRwczovL2ppYW5nemlsb25nLm5vdGlvbi5zaXRlL09ubGluZS1EaWN0aW9uYXJ5LTQzNzM3NTI3ZGMxMzRiY2ViMmQ0MGVkNzliZTFlMGUzP3B2cz00Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ljb25zXzEuUXVlc3Rpb25NYXJrQ2lyY2xlZEljb24sIG51bGwpKVxuICAgICAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgb25DbGljazogaGFuZGxlRWRpdFByb21wdCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF9pY29uc18xLlBlbmNpbDJJY29uLCBudWxsKSkpKSk7XG59XG5leHBvcnRzLkRyb3Bkb3duTWVudUl0ZW0gPSBEcm9wZG93bk1lbnVJdGVtO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSW1hZ2VzID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IGljb25zXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7XG5jb25zdCBQcm9UYWdfMSA9IHJlcXVpcmUoXCIuL1Byb1RhZ1wiKTtcbmNvbnN0IHVzZXJJbmZvXzEgPSByZXF1aXJlKFwiLi4vbGliL3VzZXJJbmZvXCIpO1xuY29uc3QgcmVhY3Rfc3ByaW5nXzEgPSByZXF1aXJlKFwicmVhY3Qtc3ByaW5nXCIpO1xuZnVuY3Rpb24gSW1hZ2VzKHByb3BzKSB7XG4gICAgLy8gY29uc3QgW2ltYWdlcywgc2V0SW1hZ2VzXSA9IHVzZVN0YXRlPEFycmF5PEltYWdlVHlwZT4+KFtdKTtcbiAgICBjb25zdCBbaW1hZ2VJbmRleCwgc2V0SW1hZ2VJbmRleF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoMCk7XG4gICAgY29uc3QgW3Nob3dDb250cm9sLCBzZXRTaG93Q29udHJvbF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtjaGFuZ2VJbWFnZSwgc2V0Q2hhbmdlSW1hZ2VTdGF0dXNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbaW1hZ2VzTG9hZGluZywgc2V0SW1hZ2VzTG9hZGluZ10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkodHJ1ZSk7XG4gICAgLy8gY29uc3QgW3NlYXJjaEltYWdlSXNMb2FkaW5nLCBzZXRTZWFyY2hJbWFnZUlzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgICBjb25zdCB1c2VySW5mbyA9ICgwLCB1c2VySW5mb18xLnVzZVVzZXJJbmZvQ29udGV4dCkoKTtcbiAgICAvLyBjb25zdCBbY3VycmVudFVSTCwgc2V0Q3VycmVudFVSTF0gPSB1c2VTdGF0ZTxzdHJpbmc+KCk7XG4gICAgY29uc3QgaW5wdXRFbGVtZW50ID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICBjb25zdCBpbWFnZUJveEVsZW1lbnQgPSAoMCwgcmVhY3RfMS51c2VSZWYpKG51bGwpO1xuICAgIGNvbnN0IGNvbXBvc2luZyA9ICgwLCByZWFjdF8xLnVzZVJlZikoZmFsc2UpO1xuICAgIGNvbnN0IGhhbmRsZUNvbXBvc2l0aW9uU3RhcnQgPSAoKSA9PiB7XG4gICAgICAgIGNvbXBvc2luZy5jdXJyZW50ID0gdHJ1ZTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUNvbXBvc2l0aW9uRW5kID0gKCkgPT4ge1xuICAgICAgICBjb21wb3NpbmcuY3VycmVudCA9IGZhbHNlO1xuICAgIH07XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIC8vIHNldEltYWdlcyhwcm9wcy5pbWFnZXMpXG4gICAgICAgIHNldEltYWdlc0xvYWRpbmcoZmFsc2UpO1xuICAgIH0sIFtwcm9wcy5pbWFnZXNdKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpbnB1dEVsZW1lbnQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpbnB1dEVsZW1lbnQuY3VycmVudCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGlucHV0RWxlbWVudC5jdXJyZW50Py5pbnB1dCk7XG4gICAgICAgIGlmICh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCkge1xuICAgICAgICAgICAgKF9hID0gaW5wdXRFbGVtZW50LmN1cnJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfSwgW2NoYW5nZUltYWdlXSk7XG4gICAgY29uc3QgaGFuZGxlRWRpdEltYWdlc0NsaWNrID0gKCkgPT4ge1xuICAgICAgICBzZXRDaGFuZ2VJbWFnZVN0YXR1cyh0cnVlKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVNlYXJjaElucHV0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlU2VhcmNoQnRuQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgc2V0SW1hZ2VJbmRleCgwKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmICh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCkge1xuICAgICAgICAgICAgbGV0IGlucHV0VmFsdWUgPSAoX2IgPSAoX2EgPSBpbnB1dEVsZW1lbnQuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlucHV0KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudmFsdWU7XG4gICAgICAgICAgICBpZiAoaW5wdXRWYWx1ZSAmJiBpbnB1dFZhbHVlICE9PSAnJyAmJiAhY29tcG9zaW5nLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBzZXRJbWFnZXNMb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgICAgIC8vIOaQnOe0ouWbvueJh1xuICAgICAgICAgICAgICAgIHByb3BzLmdldFVuc3BsYXNoSW1hZ2VzKGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgICAgIHNldENoYW5nZUltYWdlU3RhdHVzKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAvLyBhbXBsaXR1ZGUudHJhY2soJ2hhbmRsZVNlYXJjaEltYWdlJyk7XG4gICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdoYW5kbGVTZWFyY2hJbWFnZScgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhbGVydCgnUGxlYXNlIGFjdGl2YXRlIFBybycpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVHZW5lcmF0aW9uc0ltYWdlcyA9IChldmVudCkgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBzZXRJbWFnZUluZGV4KDApO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSB7XG4gICAgICAgICAgICBsZXQgaW5wdXRWYWx1ZSA9IChfYiA9IChfYSA9IGlucHV0RWxlbWVudC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5wdXQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi52YWx1ZTtcbiAgICAgICAgICAgIGlmIChpbnB1dFZhbHVlICYmIGlucHV0VmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgc2V0SW1hZ2VzTG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgICAgICAvLyDnlJ/miJDlm77niYdcbiAgICAgICAgICAgICAgICBwcm9wcy5nZW5lcmF0aW9uc0ltYWdlcyhpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZXRDaGFuZ2VJbWFnZVN0YXR1cyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdoYW5kbGVHZW5lcmF0aW9uc0ltYWdlcycgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhbGVydCgnUGxlYXNlIGFjdGl2YXRlIFBybycpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVDaGFuZ2VJbWFnZXNDbGljayA9IChvZmZzZXQpID0+IHtcbiAgICAgICAgc2V0SW1hZ2VJbmRleChpbmRleCA9PiB7XG4gICAgICAgICAgICBpbmRleCA9IGluZGV4ICsgb2Zmc2V0O1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IHByb3BzLmltYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBwcm9wcy5pbWFnZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGFtcGxpdHVkZS50cmFjaygnaGFuZGxlQ2hhbmdlSW1hZ2UnKTtcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdoYW5kbGVDaGFuZ2VJbWFnZScgfSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVJbWFnZXNCb3hIb3ZlciA9IChlKSA9PiB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmIChlLnR5cGUgPT09ICdtb3VzZWVudGVyJykge1xuICAgICAgICAgICAgc2V0U2hvd0NvbnRyb2wodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudHlwZSA9PT0gJ21vdXNlbGVhdmUnKSB7XG4gICAgICAgICAgICAvLyDmmL7npLrlm77niYfmkJzntKLmoYbml7bkuI3oh6rliqjpmpDol4/mjqfku7ZcbiAgICAgICAgICAgIGlmICghY2hhbmdlSW1hZ2UgfHwgKChfYiA9IChfYSA9IGlucHV0RWxlbWVudC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5wdXQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi52YWx1ZSkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgc2V0U2hvd0NvbnRyb2woZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNldENoYW5nZUltYWdlU3RhdHVzKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNldFNob3dDb250cm9sKHRydWUpXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGFuaW1hdGlvblN0eWxlID0gKDAsIHJlYWN0X3NwcmluZ18xLnVzZVNwcmluZykoe1xuICAgICAgICBmcm9tOiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScgfSxcbiAgICAgICAgdG86IHsgdHJhbnNmb3JtOiAncm90YXRlKDM2MGRlZyknIH0sXG4gICAgICAgIGNvbmZpZzogeyBkdXJhdGlvbjogMTAwMCB9LFxuICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICB3aWR0aDogJzMycHgnLFxuICAgICAgICBoZWlnaHQ6ICczMnB4JyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHJlZCdcbiAgICB9KTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImltYWdlc1wiLCByZWY6IGltYWdlQm94RWxlbWVudCwgc3R5bGU6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgbGluZUhlaWdodDogJzAnLFxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnMThweCdcbiAgICAgICAgfSB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBvbk1vdXNlRW50ZXI6IGhhbmRsZUltYWdlc0JveEhvdmVyLCBvbk1vdXNlTGVhdmU6IGhhbmRsZUltYWdlc0JveEhvdmVyIH0sXG4gICAgICAgICAgICAgICAgaW1hZ2VzTG9hZGluZyAmJlxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2IoMCwgMCwgMCwwLjUpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAnOSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X3NwcmluZ18xLmFuaW1hdGVkLmRpdiwgeyBzdHlsZTogYW5pbWF0aW9uU3R5bGUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkxvYWRpbmdPdXRsaW5lZCwgbnVsbCkpKSxcbiAgICAgICAgICAgICAgICBwcm9wcy5pbWFnZXMubGVuZ3RoID4gMCA/XG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImltYWdlQm94XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuSW1hZ2UsIHsgXCJkYXRhLWRvd25sb2FkbG9jYXRpb25cIjogcHJvcHMuaW1hZ2VzW2ltYWdlSW5kZXhdLmxpbmtzLmRvd25sb2FkX2xvY2F0aW9uLCBzcmM6IHByb3BzLmltYWdlc1tpbWFnZUluZGV4XS51cmxzLnNtYWxsLCBhbHQ6IHByb3BzLmltYWdlc1tpbWFnZUluZGV4XVsnZGVzY3JpcHRpb24nXSwgaGVpZ2h0OiAyNDAsIHdpZHRoOiAnMTAwJScsIHByZXZpZXc6IGZhbHNlLCBwbGFjZWhvbGRlcjogdHJ1ZSB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbWFnZVF1ZXVlXCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgcHJvcHMuaW1hZ2VzLm1hcChpbWcgPT4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBrZXk6IGltZy5pZCwgc3JjOiBpbWcudXJscy5zbWFsbCB9KSkpKVxuICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzI0MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNiknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcycHgnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5FbXB0eSwgeyBzdHlsZTogeyBtYXJnaW46ICcwIGF1dG8nIH0sIGRlc2NyaXB0aW9uOiAnTm8gcmVsYXRlZCBwaWN0dXJlcyBmb3VuZCcsIGltYWdlOiBhbnRkXzEuRW1wdHkuUFJFU0VOVEVEX0lNQUdFX1NJTVBMRSB9KSksXG4gICAgICAgICAgICAgICAgc2hvd0NvbnRyb2wgJiYgIWltYWdlc0xvYWRpbmcgJiZcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJzUwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcwIDJweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8ganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1hcm91bmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWFyZ2luOiAnMHB4IDE4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDM2MGRlZywgcmdiYSgwLCAwLCAwLCAwKSAwJSwgcmdiYSgwLCAwLCAwLCAwLjEpIDI3LjYlLCByZ2JhKDAsIDAsIDAsIDAuMikgNTQuNjklLCByZ2JhKDAsIDAsIDAsIDAuMzUpIDEwMCUpJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgY2hhbmdlSW1hZ2UgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaYvuekuuWbvueJh+aQnOe0ouaOp+S7tlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzJweCAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgZmxleDogJzEnLCBtYXJnaW5SaWdodDogJzIwcHgnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbnB1dCwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCkgPT09IGZhbHNlID8gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC45KScgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiAnMnB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHN1ZmZpeDogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvVGFnXzEuUHJvVGFnLCBudWxsKSwgZGlzYWJsZWQ6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpLCBwbGFjZWhvbGRlcjogXCJTZWFyY2ggaW1hZ2VzXCIsIG9uS2V5RG93bjogaGFuZGxlU2VhcmNoSW5wdXQsIG9uQ29tcG9zaXRpb25TdGFydDogaGFuZGxlQ29tcG9zaXRpb25TdGFydCwgb25Db21wb3NpdGlvbkVuZDogaGFuZGxlQ29tcG9zaXRpb25FbmQsIHNpemU6IFwic21hbGxcIiwgcmVmOiBpbnB1dEVsZW1lbnQsIG9uUHJlc3NFbnRlcjogaGFuZGxlU2VhcmNoQnRuQ2xpY2sgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuVG9vbHRpcCwgeyBwbGFjZW1lbnQ6IFwiYm90dG9tXCIsIHRpdGxlOiAnU2VhcmNoIEltYWdlcyjij44pJywgYXJyb3c6IGZhbHNlLCBnZXRQb3B1cENvbnRhaW5lcjogKCkgPT4gaW1hZ2VCb3hFbGVtZW50LmN1cnJlbnQgfHwgZG9jdW1lbnQuYm9keSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgZGlzYWJsZWQ6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpLCB0eXBlOiBcInRleHRcIiwgc2l6ZTogXCJzbWFsbFwiLCBzdHlsZTogeyBjb2xvcjogJyNmZmYnLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIG1hcmdpblJpZ2h0OiAnMTBweCcsIG9wYWNpdHk6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpID8gJzAuNycgOiAnMScgfSwgb25DbGljazogaGFuZGxlU2VhcmNoQnRuQ2xpY2ssIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuU2VhcmNoT3V0bGluZWQsIG51bGwpIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Ub29sdGlwLCB7IHBsYWNlbWVudDogXCJib3R0b21cIiwgdGl0bGU6ICdHZW5lcmF0ZSBJbWFnZXMgd2l0aCBBSScsIGFycm93OiBmYWxzZSwgZ2V0UG9wdXBDb250YWluZXI6ICgpID0+IGltYWdlQm94RWxlbWVudC5jdXJyZW50IHx8IGRvY3VtZW50LmJvZHkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IGRpc2FibGVkOiAhKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSwgdHlwZTogXCJ0ZXh0XCIsIHNpemU6IFwic21hbGxcIiwgc3R5bGU6IHsgY29sb3I6ICcjZmZmJywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCBtYXJnaW5SaWdodDogJzEwcHgnLCBvcGFjaXR5OiAhKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSA/ICcwLjcnIDogJzEnIH0sIG9uQ2xpY2s6IGhhbmRsZUdlbmVyYXRpb25zSW1hZ2VzLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLlRodW5kZXJib2x0T3V0bGluZWQsIG51bGwpIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgdHlwZTogXCJ0ZXh0XCIsIHNpemU6IFwic21hbGxcIiwgc3R5bGU6IHsgY29sb3I6ICcjZmZmJywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH0sIG9uQ2xpY2s6ICgpID0+IHNldENoYW5nZUltYWdlU3RhdHVzKGZhbHNlKSwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5DbG9zZU91dGxpbmVkLCBudWxsKSB9KSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhHcm93OiAnaW5oZXJpdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLmltYWdlcy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0eXBlOiBcInRleHRcIiwgc2l6ZTogXCJzbWFsbFwiLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkxlZnRPdXRsaW5lZCwgbnVsbCksIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUNoYW5nZUltYWdlc0NsaWNrKC0xKSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICc0MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJzUwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcwIDRweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgaW1hZ2VJbmRleCArIDEgKyAnLycgKyBwcm9wcy5pbWFnZXMubGVuZ3RoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0eXBlOiBcInRleHRcIiwgc2l6ZTogXCJzbWFsbFwiLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLlJpZ2h0T3V0bGluZWQsIG51bGwpLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVDaGFuZ2VJbWFnZXNDbGljaygxKSB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ3Jvdy1yZXZlcnNlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6ICcxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIHN0eWxlOiB7IGNvbG9yOiAnI2ZmZicsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9LCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVFZGl0SW1hZ2VzQ2xpY2soKSwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5Gb3JtT3V0bGluZWQsIG51bGwpIH0pKSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLmltYWdlcy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiaW1hZ2VTb3VyY2VcIiwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6ICcxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdmbGV4LWVuZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzAuOTBlbScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC44KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJzRweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRTaGFkb3c6ICcycHggMnB4IDVweCByZ2JhKDAsIDAsIDAsIDAuMyknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgcHJvcHMuaW1hZ2VzW2ltYWdlSW5kZXhdLnR5cGUgPT09ICdhaScgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsIFwiUGhvdG8gYnkgQUlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUGhvdG8gYnkgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgc3R5bGU6IHsgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnLCBwYWRkaW5nOiAnMCAycHgnIH0sIHRhcmdldDogJ19ibGFuaycsIGhyZWY6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vQFwiICsgcHJvcHMuaW1hZ2VzW2ltYWdlSW5kZXhdLnVzZXIudXNlcm5hbWUgKyBcIj91dG1fc291cmNlPVNjb3V0ZXImdXRtX21lZGl1bT1yZWZlcnJhbFwiIH0sIHByb3BzLmltYWdlc1tpbWFnZUluZGV4XS51c2VyLm5hbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIG9uIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IHN0eWxlOiB7IHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJywgcGFkZGluZzogJzAgMnB4JyB9LCB0YXJnZXQ6ICdfYmxhbmsnLCBocmVmOiBcImh0dHBzOi8vdW5zcGxhc2guY29tLz91dG1fc291cmNlPVNjb3V0ZXImdXRtX21lZGl1bT1yZWZlcnJhbFwiIH0sIFwiVW5zcGxhc2hcIikpKSkpKSkpO1xufVxuZXhwb3J0cy5JbWFnZXMgPSBJbWFnZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5OYXYgPSB2b2lkIDA7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgbGFuZ18xID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xuY29uc3QgdXNlckluZm9fMSA9IHJlcXVpcmUoXCIuLi9saWIvdXNlckluZm9cIik7XG5jb25zdCBEcm9wZG93bk1lbnUgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIkByYWRpeC11aS9yZWFjdC1kcm9wZG93bi1tZW51XCIpKTtcbmNvbnN0IERyb3Bkb3duTWVudUl0ZW1fMSA9IHJlcXVpcmUoXCIuL0Ryb3Bkb3duTWVudUl0ZW1cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vUG9wdXBDYXJkL3V0aWxcIik7XG5jb25zdCByZWFjdF9pY29uc18xID0gcmVxdWlyZShcIkByYWRpeC11aS9yZWFjdC1pY29uc1wiKTtcbi8vIGltcG9ydCB0eXBlIHsgTWVudVByb3BzIH0gZnJvbSAnYW50ZCc7XG5jb25zdCBjb250ZW50U2NyaXB0XzEgPSByZXF1aXJlKFwiLi4vY29udGVudFNjcmlwdFwiKTtcbmNvbnN0IGljb25zXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7XG5jb25zdCBsb2NhbGVfMSA9IHJlcXVpcmUoXCIuLi9saWIvbG9jYWxlXCIpO1xuZnVuY3Rpb24gTmF2KHByb3BzKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBjb25zdCBbaXNQaW4sIHNldElzUGluXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3QgW2N1cnJlbnRVUkwsIHNldEN1cnJlbnRVUkxdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKCk7XG4gICAgY29uc3QgW2lzT3BlblByb21wdE1lbnUsIHNldElzT3BlblByb21wdE1lbnVdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBkZWZhdWx0UHJvbXB0ID0gKDAsIHJlYWN0XzEudXNlUmVmKSgpO1xuICAgIGNvbnN0IFthZGRUb0Fua2lTdGF0dXMsIHNldEFkZFRvQW5raVN0YXR1c10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pO1xuICAgIC8vIGNvbnN0IHsgT3B0aW9uIH0gPSBTZWxlY3Q7XG4gICAgY29uc3QgbmF2RWxlbWVudCA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3QgdXNlckluZm8gPSAoMCwgdXNlckluZm9fMS51c2VVc2VySW5mb0NvbnRleHQpKCk7XG4gICAgbGV0IExhbmcgPSAoMCwgbG9jYWxlXzEudXNlQ3VycmVudExhbmd1YWdlKSgpO1xuICAgIGNvbnN0IGN1cnJlbnRMYW5ndWFnZSA9IExhbmdbJ2N1cnJlbnQnXVsnbmFtZSddO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAvLyDlvZPkuI3oh6rliqjoh6rooYwgUHJvbXB077yM6Ieq5Yqo5omT5byAIFByb21wdCDoj5zljZXkvpvnlKjmiLfpgInmi6lcbiAgICAgICAgaWYgKHByb3BzLmlzT3Blbk1lbnUpIHtcbiAgICAgICAgICAgIG9uTWVudU9wZW5DaGFuZ2UocHJvcHMuaXNPcGVuTWVudSk7XG4gICAgICAgIH1cbiAgICB9LCBbcHJvcHMuaXNPcGVuTWVudV0pO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICBkZWZhdWx0UHJvbXB0LmN1cnJlbnQgPSAoMCwgdXRpbF8xLmdldERlZmF1bHRQcm9tcHQpKHByb3BzLmtleVdvcmQsIGN1cnJlbnRMYW5ndWFnZSk7XG4gICAgICAgIC8vIOiuvue9rua3u+WKoOWIsCBBbmtpIOeahOaTjeS9nOeKtuaAgVxuICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMocHJvcHMuYWRkVG9BbmtpU3RhdHVzKTtcbiAgICB9LCBbXSk7XG4gICAgY29uc3QgaGFuZGxlTWVudUNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgaGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrKGUua2V5KTtcbiAgICB9O1xuICAgIGxldCBpdGVtcyA9IFtdO1xuICAgIGlmICh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8uYW5raS5kZWNrcykge1xuICAgICAgICBpdGVtcyA9IHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby5hbmtpLmRlY2tzLm1hcCgoZGVjaykgPT4geyByZXR1cm4geyAna2V5JzogZGVjaywgJ2xhYmVsJzogZGVjayB9OyB9KTtcbiAgICB9XG4gICAgY29uc3QgbWVudVByb3BzID0ge1xuICAgICAgICBpdGVtcyxcbiAgICAgICAgb25DbGljazogaGFuZGxlTWVudUNsaWNrLFxuICAgIH07XG4gICAgLy8gLy8g54K55Ye75L+d5a2Y5YiwIEFua2kg5oyJ6ZKuXG4gICAgLy8gY29uc3QgaGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrID0gKCkgPT4ge1xuICAgIC8vICAgICBwcm9wcy5oYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2soKVxuICAgIC8vIH07XG4gICAgLy8g5re75Yqg5YiwIEFua2lcbiAgICBjb25zdCBhZGRUb0Fua2kgPSAoZGVja05hbWUsIG1vZGVsTmFtZSwgZnJvbnQsIGJhY2spID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICBjb25zdCBrZXlXb3JkID0gcHJvcHMua2V5V29yZDtcbiAgICAgICAgY29uc3QgU2VudGVuY2UgPSBwcm9wcy5TZW50ZW5jZTtcbiAgICAgICAgY29uc3Qgd2luZG93RWxlbWVudCA9IHByb3BzLndpbmRvd0VsZW1lbnQ7XG4gICAgICAgIGxldCBjb250YWluZXIgPSAnJztcbiAgICAgICAgbGV0IGltYWdlcyA9ICcnO1xuICAgICAgICBsZXQgdW5zcGxhc2hfZG93bmxvYWRfbG9jYXRpb247XG4gICAgICAgIGxldCBzdGMgPSBrZXlXb3JkLmxlbmd0aCA8PSAyMCA/IFNlbnRlbmNlIDogJyc7XG4gICAgICAgIC8vIOi9rOenuyBIVE1MIOagh+etvu+8jOaMieeFp+aZrumAmuWtl+espuS4suWkhOeQhlxuICAgICAgICBzdGMgPSBzdGMucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIik7XG4gICAgICAgIC8vIOWcqOivreWig+WPpeWtkOS4reWwhuWFs+mUruWtl+eqgeWHuuaYvuekulxuICAgICAgICBzdGMgPSBzdGMucmVwbGFjZShuZXcgUmVnRXhwKGtleVdvcmQsICdnJyksICc8c3BhbiBjbGFzcz1cImtleVdvcmRcIj4nICsga2V5V29yZCArICc8L3NwYW4+Jyk7XG4gICAgICAgIGxldCBTY291dGVyU2VsZWN0aW9uID0gJyc7XG4gICAgICAgIGlmICh3aW5kb3dFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyDpgInkuK3nmoTmloflrZdcbiAgICAgICAgICAgIFNjb3V0ZXJTZWxlY3Rpb24gPSAoX2EgPSB3aW5kb3dFbGVtZW50ID09PSBudWxsIHx8IHdpbmRvd0VsZW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpbmRvd0VsZW1lbnQucXVlcnlTZWxlY3RvcignI1Njb3V0ZXJTZWxlY3Rpb24nKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzcGFuJylbMF0uaW5uZXJIVE1MO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cod2luZG93RWxlbWVudCk7XG4gICAgICAgICAgICBjb250YWluZXIgPSB3aW5kb3dFbGVtZW50LmlubmVySFRNTDtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IHdpbmRvd0VsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVzc2FnZXMnKVswXS5pbm5lckhUTUw7XG4gICAgICAgICAgICAvLyDlpITnkIYgY29udGFpbmVyIOeahOWGheWuuVxuICAgICAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgICAgICAgIGxldCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGNvbnRhaW5lciwgJ3RleHQvaHRtbCcpO1xuICAgICAgICAgICAgbGV0IGVsZW1lbnRzVG9SZW1vdmUgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnLmltYWdlUXVldWUnKTtcbiAgICAgICAgICAgIGxldCBpbWFnZVNvdXJjZSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCcuaW1hZ2VTb3VyY2UnKTtcbiAgICAgICAgICAgIC8vIOWIm+W7uuaWsOeahCBpbWcg5qCH562+XG4gICAgICAgICAgICAvLyDorr7nva7lm77niYfnmoTlsLrlr7jjgIHmoLflvI9cbiAgICAgICAgICAgIGlmIChkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VCb3gnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGltZyA9IGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZUJveCcpWzBdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXTtcbiAgICAgICAgICAgICAgICBpbWcud2lkdGggPSAwO1xuICAgICAgICAgICAgICAgIGNvbnN0IGltZ1VybCA9IGltZy5zcmM7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICAgICAgbmV3SW1nLnNyYyA9IGltZ1VybDtcbiAgICAgICAgICAgICAgICAvLyDojrflj5bopoHmm7/mjaLnmoQgZGl2XG4gICAgICAgICAgICAgICAgbGV0IGRpdiA9IGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZUJveCcpWzBdO1xuICAgICAgICAgICAgICAgIGlmIChkaXYpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5L2/55So5paw55qEIGltZyDmoIfnrb7mm7/mjaIgZGl2XG4gICAgICAgICAgICAgICAgICAgIChfYiA9IGRpdi5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucmVwbGFjZUNoaWxkKG5ld0ltZywgZGl2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDmsqHmnInlm77niYdcbiAgICAgICAgICAgICAgICBjb25zdCBpbWdzID0gZG9jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlcycpWzBdO1xuICAgICAgICAgICAgICAgIGlmIChpbWdzKSB7XG4gICAgICAgICAgICAgICAgICAgIChfYyA9IGltZ3MucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnJlbW92ZUNoaWxkKGltZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOWIoOmZpOmihOWKoOi9veeahOWbvueJh1xuICAgICAgICAgICAgZWxlbWVudHNUb1JlbW92ZS5mb3JFYWNoKGVsID0+IHsgdmFyIF9hOyByZXR1cm4gKF9hID0gZWwucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZUNoaWxkKGVsKTsgfSk7XG4gICAgICAgICAgICAvLyDliKDpmaTlm77niYfmnaXmupDkv6Hmga9cbiAgICAgICAgICAgIGltYWdlU291cmNlLmZvckVhY2goZWwgPT4geyB2YXIgX2E7IHJldHVybiAoX2EgPSBlbC5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlQ2hpbGQoZWwpOyB9KTtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvYy5ib2R5LmlubmVySFRNTDtcbiAgICAgICAgICAgIC8vIOWkhOeQhuagt+W8j++8jOmBv+WFjSBBbmtpIOWGheaYvuekuuW8guW4uFxuICAgICAgICAgICAgY29udGFpbmVyID0gY29udGFpbmVyLnJlcGxhY2UoL3N0eWxlPS9nLCAnJyk7XG4gICAgICAgICAgICBpZiAod2luZG93RWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZUJveCcpWzBdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbWFnZXMgPSB3aW5kb3dFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlQm94JylbMF0uaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgIC8vIOiOt+WPliB1bnNwbGFzaEFwaSDnmoQgZG93bmxvYWRfbG9jYXRpb25cbiAgICAgICAgICAgICAgICB1bnNwbGFzaF9kb3dubG9hZF9sb2NhdGlvbiA9IChfZCA9IHdpbmRvd0VsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzJylbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLnBhcmVudEVsZW1lbnQpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZG93bmxvYWRsb2NhdGlvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaW1hZ2VzKTtcbiAgICAgICAgICAgIC8vIOWkhOeQhuagt+W8j++8jOmBv+WFjSBBbmtpIOWGheaYvuekuuW8guW4uFxuICAgICAgICAgICAgaW1hZ2VzID0gaW1hZ2VzLnJlcGxhY2UoL3N0eWxlPS9naSwgJycpO1xuICAgICAgICAgICAgaW1hZ2VzID0gaW1hZ2VzLnJlcGxhY2UoL3dpZHRoL2dpLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2FyZFN0eWxlID0gYGA7XG4gICAgICAgIGNvbnN0IHRoaXNMYW5nID0gbGFuZ18xLmxhbmc7XG4gICAgICAgIGxldCBhdWRpb1VybCA9ICdodHRwOi8vZGljdC55b3VkYW8uY29tL2RpY3R2b2ljZT90eXBlPTAmYXVkaW89JztcbiAgICAgICAgbGV0IGF1ZGlvLCBmaWxlbmFtZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF1ZGlvVXJsID0gdGhpc0xhbmdbTGFuZ1sndGFyZ2V0J11bJ2lkJ11dWydhdWRpb1VSTCddO1xuICAgICAgICAgICAgLy8gZmlsZW5hbWUgPSBEYXRlLm5vdygpLnRvU3RyaW5nKClcbiAgICAgICAgICAgIGZpbGVuYW1lID0gJyc7XG4gICAgICAgICAgICBhdWRpbyA9IFt7XG4gICAgICAgICAgICAgICAgICAgIFwidXJsXCI6IGF1ZGlvVXJsICsga2V5V29yZCxcbiAgICAgICAgICAgICAgICAgICAgXCJmaWxlbmFtZVwiOiBcIlNjb3V0ZXJcIiArIGZpbGVuYW1lICsgXCIubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZmllbGRzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRnJvbnRcIlxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfV07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBhdWRpbyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIC8vIOW4uOinhOexu+Wei1xuICAgICAgICBsZXQgYW5raUJhY2sgPSAnPHA+IDxibG9ja3F1b3RlPicgKyBzdGMgKyAnIOKAlOKAlCA8YSBocmVmPVwiJyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgJ1wiPlNvdXJjZTwvYT48L2Jsb2NrcXVvdGU+PC9wPicgKyBjb250YWluZXI7XG4gICAgICAgIGlmIChrZXlXb3JkLmxlbmd0aCA+IDIwKSB7XG4gICAgICAgICAgICAvLyDlpoLmnpzpgInkuK3nmoTnrKblj7fplb/luqblpKfkuo4gMjDvvIjor7TmmI7mmK/lj6XlrZDvvInliJnkuI3mmL7npLrkuIrkuIvmloflj6XlrZDvvIznhLblkI7lsIbmnaXmupDpk77mjqXmlL7liLDlsL7pg6hcbiAgICAgICAgICAgIGFua2lCYWNrID0gY29udGFpbmVyICsgJzxwPjxhIGhyZWY9XCInICsgd2luZG93LmxvY2F0aW9uLmhyZWYgKyAnXCI+U291cmNlPC9hPjwvcD4nO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwID0ge1xuICAgICAgICAgICAgXCJub3RlXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlY2tOYW1lXCI6IGRlY2tOYW1lLFxuICAgICAgICAgICAgICAgIFwibW9kZWxOYW1lXCI6IG1vZGVsTmFtZSxcbiAgICAgICAgICAgICAgICBcImZpZWxkc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFtmcm9udF06IGtleVdvcmQsXG4gICAgICAgICAgICAgICAgICAgIFtiYWNrXTogY2FyZFN0eWxlICsgYW5raUJhY2tcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiYXVkaW9cIjogYXVkaW8sXG4gICAgICAgICAgICAgICAgXCJ0YWdzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJTY291dGVyXCJcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIOWujOW9ouWhq+epuuexu+Wei1xuICAgICAgICBpZiAoU2NvdXRlclNlbGVjdGlvbi5pbmRleE9mKCdjbGFzcz1cImFua2lTcGFjZVwiJykgPj0gMCB8fCBjb250YWluZXIuaW5kZXhPZignY2xhc3M9XCJhbmtpU3BhY2VcIicpID49IDAgfHwgY29udGFpbmVyLmluZGV4T2YoJ3t7YycpID49IDApIHtcbiAgICAgICAgICAgIGxldCBuZXdGcm9udDtcbiAgICAgICAgICAgIG5ld0Zyb250ID0gJzxwPicgKyBTY291dGVyU2VsZWN0aW9uICsgJzwvcD4nICsgJzxibG9ja3F1b3RlPicgKyBzdGMgKyAnIOKAlOKAlCA8YSBocmVmPVwiJyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgJ1wiPlNvdXJjZTwvYT48L2Jsb2NrcXVvdGU+JyArIGNvbnRhaW5lcjtcbiAgICAgICAgICAgIGlmIChrZXlXb3JkLmxlbmd0aCA+IDIwKSB7XG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c6YCJ5Lit55qE56ym5Y+36ZW/5bqm5aSn5LqOIDIw77yI6K+05piO5piv5Y+l5a2Q77yJ5YiZ5LiN5pi+56S65LiK5LiL5paH5Y+l5a2Q77yM54S25ZCO5bCG5p2l5rqQ6ZO+5o6l5pS+5Yiw5bC+6YOoXG4gICAgICAgICAgICAgICAgbmV3RnJvbnQgPSAnPHA+JyArIFNjb3V0ZXJTZWxlY3Rpb24gKyAnPC9wPicgKyBjb250YWluZXIgKyAnPHA+IDxhIGhyZWY9XCInICsgd2luZG93LmxvY2F0aW9uLmhyZWYgKyAnXCI+U291cmNlPC9hPjwvcD4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcCA9IHtcbiAgICAgICAgICAgICAgICBcIm5vdGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImRlY2tOYW1lXCI6IGRlY2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICBcIm1vZGVsTmFtZVwiOiBtb2RlbE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwiZmllbGRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtmcm9udF06IG5ld0Zyb250LFxuICAgICAgICAgICAgICAgICAgICAgICAgW2JhY2tdOiAnJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcImF1ZGlvXCI6IFtdLFxuICAgICAgICAgICAgICAgICAgICBcInRhZ3NcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJTY291dGVyXCJcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8g5Y+R6YCB5raI5oGv57uZIGJhY2tncm91bmRcbiAgICAgICAgbGV0IHNlbmRpbmcgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhZGROb3RlJywgJ21lc3NhZ2VzJzogeyAnYW5raV9hcmd1bWVudHMnOiBwLCAnYW5raV9hY3Rpb25fdHlwZSc6ICdhZGROb3RlJywgJ3Vuc3BsYXNoX2Rvd25sb2FkX2xvY2F0aW9uJzogdW5zcGxhc2hfZG93bmxvYWRfbG9jYXRpb24gfSwgfSk7XG4gICAgICAgIHNlbmRpbmcudGhlbihoYW5kbGVSZXNwb25zZSwgaGFuZGxlRXJyb3IpO1xuICAgICAgICAvLyDmjqXmlLYgYmFja2dyb3VuZCDnmoTlm57lpI1cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUmVzcG9uc2UobWVzc2FnZSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5lcnJvciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnc3VjY2VzcycsICdub3RlSWQnOiBtZXNzYWdlLmRhdGEgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydChtZXNzYWdlLmVycm9yKTtcbiAgICAgICAgICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycm8pIHtcbiAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnJvKTtcbiAgICAgICAgfVxuICAgICAgICAvLyDmlbDmja7ln4vngrlcbiAgICAgICAgLy8gYW1wbGl0dWRlLnRyYWNrKCdhZGRUb0Fua2knKTtcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdhZGRUb0Fua2knIH0pO1xuICAgIH07XG4gICAgLy8g54K55Ye75L+d5a2Y5YiwIEFua2lcbiAgICBjb25zdCBoYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2sgPSAoZGVjaykgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHdpbmRvd0VsZW1lbnQgPSBwcm9wcy53aW5kb3dFbGVtZW50O1xuICAgICAgICAvLyDmoLnmja7mmK/lkKbkuLrlrozlvaLloavnqbrnlLPor7fkuI3lkIznmoTljaHniYfmqKHmnb9cbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2luZG93RWxlbWVudCA9PT0gbnVsbCB8fCB3aW5kb3dFbGVtZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3aW5kb3dFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lc3NhZ2VzJylbMF0uaW5uZXJIVE1MO1xuICAgICAgICBjb25zdCBzZWxlY3Rpb25UZXh0ID0gKF9hID0gd2luZG93RWxlbWVudCA9PT0gbnVsbCB8fCB3aW5kb3dFbGVtZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3aW5kb3dFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNTY291dGVyU2VsZWN0aW9uJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpWzBdLmlubmVySFRNTDtcbiAgICAgICAgbGV0IGlzQW5raVNwYWNlID0gZmFsc2U7XG4gICAgICAgIGlmIChjb250YWluZXIgfHwgc2VsZWN0aW9uVGV4dCkge1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5pbmRleE9mKCdjbGFzcz1cImFua2lTcGFjZVwiJykgPj0gMCB8fCBjb250YWluZXIuaW5kZXhPZigne3tjJykgPj0gMCB8fCBzZWxlY3Rpb25UZXh0LmluZGV4T2YoJ2NsYXNzPVwiYW5raVNwYWNlJykgPj0gMCkge1xuICAgICAgICAgICAgICAgIGlzQW5raVNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ2xvYWRpbmcnLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgZnVuY3Rpb24gc2V0QW5raUluZm8oYW5raUluZm8pIHtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVscyA9IGFua2lJbmZvLm1vZGVscztcbiAgICAgICAgICAgIGxldCBtb2RlbE5hbWUgPSAnJywgZmllbGQxID0gJycsIGZpZWxkMiA9ICcnO1xuICAgICAgICAgICAgbW9kZWxzLmZvckVhY2goKG1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsLmlzQW5raVNwYWNlID09PSBpc0Fua2lTcGFjZSkge1xuICAgICAgICAgICAgICAgICAgICBtb2RlbE5hbWUgPSBtb2RlbC5tb2RlbE5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkMSA9IG1vZGVsLmZpZWxkMTtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQyID0gbW9kZWwuZmllbGQyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAnbW9kZWxOYW1lJzogbW9kZWxOYW1lLFxuICAgICAgICAgICAgICAgICdmaWVsZDEnOiBmaWVsZDEsXG4gICAgICAgICAgICAgICAgJ2ZpZWxkMic6IGZpZWxkMlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLmFua2kpIHtcbiAgICAgICAgICAgIGNvbnN0IHRoaXNEZWNrID0gZGVjayA/IGRlY2sgOiB1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8uYW5raS5kZWZhdWx0RGVja05hbWU7XG4gICAgICAgICAgICBjb25zdCBhbmtpSW5mbyA9IHNldEFua2lJbmZvKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby5hbmtpKTtcbiAgICAgICAgICAgIC8vIOa3u+WKoOWIsCBBbmtpIOS4rVxuICAgICAgICAgICAgYWRkVG9BbmtpKHRoaXNEZWNrLCBhbmtpSW5mby5tb2RlbE5hbWUsIGFua2lJbmZvLmZpZWxkMSwgYW5raUluZm8uZmllbGQyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIOiOt+WPliBBbmtpIOeJjOe7hOS/oeaBr1xuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnc2V0TW9kZWwnLCAnbWVzc2FnZXMnOiB7fSwgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmtpSW5mbyA9IHNldEFua2lJbmZvKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhpc0RlY2sgPSBkZWNrID8gZGVjayA6IHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby5hbmtpLmRlZmF1bHREZWNrTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgLy8g5re75Yqg5YiwIEFua2kg5LitXG4gICAgICAgICAgICAgICAgICAgIGFkZFRvQW5raSh0aGlzRGVjaywgYW5raUluZm8ubW9kZWxOYW1lLCBhbmtpSW5mby5maWVsZDEsIGFua2lJbmZvLmZpZWxkMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyDlj43ppojplJnor6/kv6Hmga9cbiAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzdWx0LmVycm9yLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdub3JtYWwnLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8g54K55Ye7IFBpbiDmjInpkq5cbiAgICBjb25zdCBoYW5kbGVQaW5CdG5DbGljayA9ICgpID0+IHtcbiAgICAgICAgaWYgKGlzUGluKSB7XG4gICAgICAgICAgICAoMCwgY29udGVudFNjcmlwdF8xLnBpblBvcHVwQ2FyZCkoZmFsc2UpO1xuICAgICAgICAgICAgc2V0SXNQaW4oZmFsc2UpO1xuICAgICAgICAgICAgLy8gYW1wbGl0dWRlLnRyYWNrKCdwaW5Qb3B1cENhcmQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICgwLCBjb250ZW50U2NyaXB0XzEucGluUG9wdXBDYXJkKSh0cnVlKTtcbiAgICAgICAgICAgIHNldElzUGluKHRydWUpO1xuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdwaW5Qb3B1cENhcmQnIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyDlnKggQW5raSDkuK3miZPlvIDnrJTorrBcbiAgICBjb25zdCBlZGl0Tm90ZUluQW5raSA9IChub3RlSWQpID0+IHtcbiAgICAgICAgbGV0IHNlbmRpbmcgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdndWlFZGl0Tm90ZScsICdtZXNzYWdlcyc6IHsgJ2Fua2lfYWN0aW9uX3R5cGUnOiAnZ3VpRWRpdE5vdGUnLCAnYW5raV9hcmd1bWVudHMnOiB7ICdub3RlJzogbm90ZUlkIH0sIH0gfSk7XG4gICAgICAgIHNlbmRpbmcudGhlbigobWVzc2FnZSkgPT4ge1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAvL2Vycm9yXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy8g5omT5byAIFByb21wdCDnvJbovpHnqpflj6NcbiAgICBjb25zdCBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSA9IChkYXRhKSA9PiB7XG4gICAgICAgIHByb3BzLm9wZW5DdXN0b21Qcm9tcHRGb3JtKGRhdGEpO1xuICAgICAgICBzZXRJc09wZW5Qcm9tcHRNZW51KGZhbHNlKTtcbiAgICB9O1xuICAgIC8vIFByb21wdCDoj5zljZUgaXRlbSDngrnlh7tcbiAgICBjb25zdCBoYW5kbGVNZW51SXRlbUNsaWNrID0gKGRhdGEpID0+IHtcbiAgICAgICAgLy8g56ysIDMg5Liq5Y+C5pWwIGZhbHNlIOihqOekuuS4jemHjeaWsOa4suafk+WbvueJh1xuICAgICAgICAvLyAvLyDlpoLmnpzkuIrkuIDkuKogUHJvbXB0IOaYr+S4jeaYvuekuuWbvueJh++8jOS4lOW9k+WJjSBQcm9tcHQg6ZyA6KaB5pi+56S65Zu+54mH77yM5YiZ5pys5qyh5Lu75Yqh6ZyA6KaB5riy5p+T5Zu+54mH77yM5ZCm5YiZ5LiN6YeN5paw5riy5p+T5Zu+54mHXG4gICAgICAgIC8vIGlmIChwcm9wcy5sYXN0RXhlY3V0ZWRQcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMgIT09IHRydWUgJiYgZGF0YS5nZXRVbnNwbGFzaEltYWdlcykge1xuICAgICAgICAvLyAgICAgcHJvcHMuaGFuZGxlTWVudUl0ZW1DbGljayhkYXRhKVxuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgcHJvcHMuaGFuZGxlTWVudUl0ZW1DbGljayhkYXRhLCB0cnVlLCBmYWxzZSlcbiAgICAgICAgLy8gfVxuICAgICAgICBwcm9wcy5oYW5kbGVNZW51SXRlbUNsaWNrKGRhdGEpO1xuICAgIH07XG4gICAgY29uc3Qgb25NZW51T3BlbkNoYW5nZSA9IChvcGVuKSA9PiB7XG4gICAgICAgIC8vIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHNldElzT3BlblByb21wdE1lbnUob3Blbik7XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkNvbmZpZ1Byb3ZpZGVyLCB7IHRoZW1lOiB7XG4gICAgICAgICAgICAgICAgdG9rZW46IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3JQcmltYXJ5OiAnI0YwOEEyNCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgaWQ6IFwiU2NvdXRlck5hdlwiLCByZWY6IG5hdkVsZW1lbnQsIGNsYXNzTmFtZTogJ3AtNCcsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LXN0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6ICcxMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogJzEycHgnLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMDYpJyxcbiAgICAgICAgICAgICAgICAgICAgdXNlclNlbGVjdDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdtb3ZlJyxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsIHRvcDogMCxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgekluZGV4OiA5LFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTJweCAxOHB4J1xuICAgICAgICAgICAgICAgIH0sIG9uTW91c2VEb3duOiBwcm9wcy5vbk1vdXNlRG93biB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgekluZGV4OiA5IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51LlJvb3QsIHsgb3BlbjogaXNPcGVuUHJvbXB0TWVudSwgbW9kYWw6IGZhbHNlLCBvbk9wZW5DaGFuZ2U6IG9uTWVudU9wZW5DaGFuZ2UgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5UcmlnZ2VyLCB7IGFzQ2hpbGQ6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJJY29uQnV0dG9uXCIsIFwiYXJpYS1sYWJlbFwiOiBcIkN1c3RvbWlzZSBvcHRpb25zXCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ljb25zXzEuSGFtYnVyZ2VyTWVudUljb24sIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6ICc0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAnMTcwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgcHJvcHMubGFzdEV4ZWN1dGVkUHJvbXB0LnRpdGxlKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51LlBvcnRhbCwgeyBjb250YWluZXI6IG5hdkVsZW1lbnQuY3VycmVudCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5Db250ZW50LCB7IGNsYXNzTmFtZTogXCJEcm9wZG93bk1lbnVDb250ZW50XCIsIGFsaWduOiAnc3RhcnQnLCBzaWRlT2Zmc2V0OiA1LCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxODBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICdyZ2JhKDAsIDAsIDAsIDAuMDgpIDBweCA2cHggMTZweCAwcHgsIHJnYmEoMCwgMCwgMCwgMC4xMikgMHB4IDNweCA2cHggLTRweCwgcmdiYSgwLCAwLCAwLCAwLjA1KSAwcHggOXB4IDI4cHggOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogJzQwMG1zJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vekFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uOiAnY3ViaWMtYmV6aWVyKDAuMTYsIDEsIDAuMywgMSknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lsbENoYW5nZTogJ3RyYW5zZm9ybSwgb3BhY2l0eSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnVJdGVtXzEuRHJvcGRvd25NZW51SXRlbSwgeyBrZXk6IChfYSA9IGRlZmF1bHRQcm9tcHQuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkLCBkYXRhOiBkZWZhdWx0UHJvbXB0LmN1cnJlbnQsIG9uU2VsZWN0OiAoKSA9PiBoYW5kbGVNZW51SXRlbUNsaWNrKGRlZmF1bHRQcm9tcHQuY3VycmVudCksIGhhbmRsZUVkaXRQcm9tcHQ6ICgpID0+IG9wZW5DdXN0b21Qcm9tcHRGb3JtKHsgaXNPcGVuOiB0cnVlLCBkYXRhOiBkZWZhdWx0UHJvbXB0LmN1cnJlbnQgfSkgfSwgKF9iID0gZGVmYXVsdFByb21wdC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudGl0bGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnVJdGVtXzEuRHJvcGRvd25NZW51SXRlbSwgeyBrZXk6IHV0aWxfMS5kaWN0aW9uYXJ5UHJvbXB0LmlkLCBkYXRhOiB1dGlsXzEuZGljdGlvbmFyeVByb21wdCwgb25TZWxlY3Q6ICgpID0+IGhhbmRsZU1lbnVJdGVtQ2xpY2sodXRpbF8xLmRpY3Rpb25hcnlQcm9tcHQpLCBoYW5kbGVFZGl0UHJvbXB0OiAoKSA9PiBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogdHJ1ZSwgZGF0YTogdXRpbF8xLmRpY3Rpb25hcnlQcm9tcHQgfSkgfSwgdXRpbF8xLmRpY3Rpb25hcnlQcm9tcHQudGl0bGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRGl2aWRlciwgeyBzdHlsZTogeyBtYXJnaW46ICc4cHggMCcgfSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMucHJvbXB0cy5tYXAoaXRlbSA9PiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnVJdGVtXzEuRHJvcGRvd25NZW51SXRlbSwgeyBrZXk6IGl0ZW0uaWQsIGRhdGE6IGl0ZW0sIG9uU2VsZWN0OiAoKSA9PiBoYW5kbGVNZW51SXRlbUNsaWNrKGl0ZW0pLCBoYW5kbGVFZGl0UHJvbXB0OiAoKSA9PiBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogdHJ1ZSwgZGF0YTogaXRlbSB9KSB9LCBpdGVtLnRpdGxlKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5TZXBhcmF0b3IsIHsgY2xhc3NOYW1lOiBcIkRyb3Bkb3duTWVudVNlcGFyYXRvclwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5wcm9tcHRzLmxlbmd0aCA8IDYgPyByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7IG1hcmdpblRvcDogJzRweCcgfSwgc2l6ZTogJ3NtYWxsJywgb25DbGljazogKCkgPT4gb3BlbkN1c3RvbVByb21wdEZvcm0oeyBpc09wZW46IHRydWUsIGRhdGE6IHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9IH0pIH0sIFwiQ3JlYXRlIHByb21wdFwiKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7IG1hcmdpblRvcDogJzRweCcgfSwgc2l6ZTogJ3NtYWxsJywgZGlzYWJsZWQ6IHRydWUgfSwgXCJBdCBtb3N0IDcgUHJvbXB0c1wiKSkpKSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicmlnaHRCdG5Cb3hcIiwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdyaWdodCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2VuZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogJzEwcHgnXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sIGFkZFRvQW5raVN0YXR1cy5zdGF0dXMgPT0gJ3N1Y2Nlc3MnID8gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkNoZWNrQ2lyY2xlVHdvVG9uZSwgeyB0d29Ub25lQ29sb3I6IFwiIzUyYzQxYVwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIgQWRkZWQgdG8gXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgb25DbGljazogZWRpdE5vdGVJbkFua2kuYmluZChldmVudCwgYWRkVG9BbmtpU3RhdHVzLm5vdGVJZCkgfSwgXCJBbmtpXCIpKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRHJvcGRvd24uQnV0dG9uLCB7IHNpemU6IFwic21hbGxcIiwgb3ZlcmxheVN0eWxlOiB7IHdpZHRoOiAnNTAlJyB9LCBnZXRQb3B1cENvbnRhaW5lcjogKCkgPT4gbmF2RWxlbWVudC5jdXJyZW50LCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzEzLjJweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWNvbj17PFBsdXNTcXVhcmVPdXRsaW5lZCAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogYWRkVG9BbmtpU3RhdHVzLnN0YXR1cyA9PT0gJ3N0YW5kYnknIHx8IGFkZFRvQW5raVN0YXR1cy5zdGF0dXMgPT09ICdsb2FkaW5nJyA/IHRydWUgOiBmYWxzZSwgbWVudTogbWVudVByb3BzLCBvbkNsaWNrOiAoZXZlbnQpID0+IGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljaygpIH0sIGFkZFRvQW5raVN0YXR1cy5zdGF0dXMgPT09ICdsb2FkaW5nJyA/ICdBZGRpbmcuLi4nIDogJ0FkZCB0byBBbmtpJykpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHNpemU6ICdzbWFsbCcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHlwZT0ndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IGlzUGluID8gJyNGMDhBMjQnIDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMy4ycHgnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBpY29uOiBpc1BpbiA/IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuUHVzaHBpbkZpbGxlZCwgeyBjbGFzc05hbWU6ICdpc1BpbicgfSkgOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLlB1c2hwaW5PdXRsaW5lZCwgbnVsbCksIG9uQ2xpY2s6IGhhbmRsZVBpbkJ0bkNsaWNrIH0pKSkpKSk7XG59XG5leHBvcnRzLk5hdiA9IE5hdjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1lc3NhZ2VzTGlzdCA9IHZvaWQgMDtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3Qgc3R5bGVkX2NvbXBvbmVudHNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwic3R5bGVkLWNvbXBvbmVudHNcIikpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCByZWFjdF9pY29uc18xID0gcmVxdWlyZShcIkByYWRpeC11aS9yZWFjdC1pY29uc1wiKTtcbmNvbnN0IHJlYWN0X21hcmtkb3duXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlYWN0LW1hcmtkb3duXCIpKTtcbmNvbnN0IHJlbWFya19icmVha3NfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVtYXJrLWJyZWFrc1wiKSk7XG5jb25zdCByZWh5cGVfcmF3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlaHlwZS1yYXdcIikpO1xuY29uc3QgcmVtYXJrX2dmbV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZW1hcmstZ2ZtXCIpKTtcbmNvbnN0IHNldHRpbmdHdWlkZV9wbmdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vYXNzZXRzL3NldHRpbmdHdWlkZS5wbmdcIikpO1xuY29uc3QgSW1hZ2VzXzEgPSByZXF1aXJlKFwiLi4vQ29tcG9uZW50cy9JbWFnZXNcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xubGV0IEljb25CdXR0b24gPSAoMCwgc3R5bGVkX2NvbXBvbmVudHNfMS5kZWZhdWx0KShhbnRkXzEuQnV0dG9uKSBgXG5cbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cbmA7XG5jb25zdCBNZXNzYWdlQm94ID0gc3R5bGVkX2NvbXBvbmVudHNfMS5kZWZhdWx0LmRpdiBgXG4gICAgXG4gICAgcGFkZGluZzoxOHB4IDA7XG5cbiAgICAmOmhvdmVye1xuICAgICAgICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwwLDAsMC4wNCk7XG4gICAgfVxuICAgIFxuXG5gO1xuZnVuY3Rpb24gTWVzc2FnZShwcm9wcykge1xuICAgIGNvbnN0IFtpbWFnZXMsIHNldEltYWdlc10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoW10pO1xuICAgIGNvbnN0IFttZXNzYWdlSW5kZXgsIHNldE1lc3NhZ2VJbmRleF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkocHJvcHMubWVzc2FnZS5jb250ZW50Lmxlbmd0aCAtIDEpO1xuICAgIGNvbnN0IFtpc01lc3NhZ2VIb3Zlciwgc2V0SXNNZXNzYWdlSG92ZXJdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgc2V0SW1hZ2VzKHByb3BzLm1lc3NhZ2UuaW1hZ2VzKTtcbiAgICAgICAgc2V0TWVzc2FnZUluZGV4KHByb3BzLm1lc3NhZ2UuY29udGVudC5sZW5ndGggPD0gMCA/IDAgOiBwcm9wcy5tZXNzYWdlLmNvbnRlbnQubGVuZ3RoIC0gMSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdtZXNzYWdlSW5kZXg6Jyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2VJbmRleCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByb3BzLm1lc3NhZ2UuY29udGVudCk7XG4gICAgfSwgW3Byb3BzLm1lc3NhZ2VdKTtcbiAgICBjb25zdCBoYW5kbGVNZXNzYWdlSW5kZXhDaGFuZ2UgPSAobikgPT4ge1xuICAgICAgICBsZXQgbmV3SW5kZXggPSBtZXNzYWdlSW5kZXg7XG4gICAgICAgIG5ld0luZGV4ICs9IG47XG4gICAgICAgIGlmIChuZXdJbmRleCA8IDApIHtcbiAgICAgICAgICAgIG5ld0luZGV4ID0gcHJvcHMubWVzc2FnZS5jb250ZW50Lmxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld0luZGV4ID4gcHJvcHMubWVzc2FnZS5jb250ZW50Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIG5ld0luZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBzZXRNZXNzYWdlSW5kZXgobmV3SW5kZXgpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlTWVzc2FnZUhvdmVyID0gKGUpID0+IHtcbiAgICAgICAgaWYgKGUudHlwZSA9PT0gJ21vdXNlbGVhdmUnKSB7XG4gICAgICAgICAgICBzZXRJc01lc3NhZ2VIb3ZlcihmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXRJc01lc3NhZ2VIb3Zlcih0cnVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8gY29uc3QgbGFzdFN0YXR1cyA9IHByb3BzLm1lc3NhZ2UuY29udGVudFtwcm9wcy5tZXNzYWdlLmNvbnRlbnQubGVuZ3RoIC0gMV0uc3RhdHVzXG4gICAgbGV0IGNvbnRlbnQ7XG4gICAgaWYgKG1lc3NhZ2VJbmRleCA+IHByb3BzLm1lc3NhZ2UuY29udGVudC5sZW5ndGggLSAxKSB7XG4gICAgICAgIGNvbnRlbnQgPSBwcm9wcy5tZXNzYWdlLmNvbnRlbnRbcHJvcHMubWVzc2FnZS5jb250ZW50Lmxlbmd0aCAtIDFdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29udGVudCA9IHByb3BzLm1lc3NhZ2UuY29udGVudFttZXNzYWdlSW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnJywgc3R5bGU6IHByb3BzLm1lc3NhZ2Uucm9sZSA9PT0gJ3VzZXInID8geyBiYWNrZ3JvdW5kQ29sb3I6ICcjRjZGNkY2JywgcGFkZGluZ1RvcDogJzJweCcsIHBhZGRpbmdCb3R0b206ICcycHgnIH0gOiB7fSB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuU2tlbGV0b24sIHsgc3R5bGU6IHsgbWFyZ2luOiAnMThweCAwJyB9LCBsb2FkaW5nOiBwcm9wcy5tZXNzYWdlLmNvbnRlbnRbcHJvcHMubWVzc2FnZS5jb250ZW50Lmxlbmd0aCAtIDFdWydzdGF0dXMnXSA9PT0gJ2JlZ2luJyA/IHRydWUgOiBmYWxzZSwgYWN0aXZlOiB0cnVlLCB0aXRsZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHByb3BzLm1lc3NhZ2Uuc2hvd0ltYWdlc0JveCAmJlxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEltYWdlc18xLkltYWdlcywgeyBpbWFnZXM6IGltYWdlcywgZ2V0VW5zcGxhc2hJbWFnZXM6IChrZXlXb3JkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmdldFVuc3BsYXNoSW1hZ2VzKShrZXlXb3JkKS50aGVuKChpbWdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aSE55CG5Zu+54mH55qE5pWw5o2u5qC85byPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0ltYWdlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ3MuZm9yRWFjaCgoaW1nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd1bnNwbGFzaCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaW1nLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNtYWxsOiBpbWcudXJscy5zbWFsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG93bmxvYWRfbG9jYXRpb246IGltZy5saW5rcy5kb3dubG9hZF9sb2NhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBpbWcuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IGltZy51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGltZy51c2VyLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3SW1hZ2VzLnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJbWFnZXMobmV3SW1hZ2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCBnZW5lcmF0aW9uc0ltYWdlczogKGtleVdvcmQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2dlbmVyYXRpb25zSW1hZ2VzJywgJ2RhdGEnOiB7ICdwcm9tcHQnOiBrZXlXb3JkIH0gfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlpITnkIblm77niYfnmoTmlbDmja7moLzlvI9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SW1hZ2VzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2NlZWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhLmRhdGEuZm9yRWFjaCgoaW1nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2FpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaW1nLnVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmxzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNtYWxsOiBpbWcudXJsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3dubG9hZF9sb2NhdGlvbjogJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAnQUknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQUknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ltYWdlcy5wdXNoKG9iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJbWFnZXMobmV3SW1hZ2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEltYWdlcyhbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgnbWVzc2FnZScgaW4gcmVzcG9uc2UuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzcG9uc2UuZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdUaGUgY3VycmVudCBBSSBlbmRwb2ludCBkb2VzIG5vdCBzdXBwb3J0IGltYWdlIGdlbmVyYXRpb24uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSB9KSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VCb3gsIHsgc3R5bGU6IHt9LCBvbk1vdXNlRW50ZXI6IGhhbmRsZU1lc3NhZ2VIb3Zlciwgb25Nb3VzZUxlYXZlOiBoYW5kbGVNZXNzYWdlSG92ZXIgfSxcbiAgICAgICAgICAgICAgICBwcm9wcy5tZXNzYWdlLmNvbnRlbnQubGVuZ3RoID4gMSAmJiBpc01lc3NhZ2VIb3ZlciAmJlxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJy0zMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ2ZpdC1jb250ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6ICc5J1xuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnZml0LWNvbnRlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJ3JnYmEoMCwgMCwgMCwgMC4wOCkgMHB4IDZweCAxNnB4IDBweCwgcmdiYSgwLCAwLCAwLCAwLjEyKSAwcHggM3B4IDZweCAtNHB4LCByZ2JhKDAsIDAsIDAsIDAuMDUpIDBweCA5cHggMjhweCA4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChJY29uQnV0dG9uLCB7IHR5cGU6ICd0ZXh0Jywgc2l6ZTogJ3NtYWxsJywgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfaWNvbnNfMS5DaGV2cm9uTGVmdEljb24sIG51bGwpLCBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVNZXNzYWdlSW5kZXhDaGFuZ2UoLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgbWFyZ2luOiAnMCAycHgnIH0gfSwgbWVzc2FnZUluZGV4ICsgMSArICcvJyArIHByb3BzLm1lc3NhZ2UuY29udGVudC5sZW5ndGgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEljb25CdXR0b24sIHsgdHlwZTogJ3RleHQnLCBzaXplOiAnc21hbGwnLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF9pY29uc18xLkNoZXZyb25SaWdodEljb24sIG51bGwpLCBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVNZXNzYWdlSW5kZXhDaGFuZ2UoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlwUGF0aDogXCJwYXRoKCdNIDAgOCBBIDQgNCAwIDAgMCAyLjgyODQyNzEyNDc0NjE5IDYuODI4NDI3MTI0NzQ2MTkgTCA2LjU4NTc4NjQzNzYyNjkwNSAzLjA3MTA2NzgxMTg2NTQ3NTUgQSAyIDIgMCAwIDEgOS40MTQyMTM1NjIzNzMwOTYgMy4wNzEwNjc4MTE4NjU0NzU1IEwgMTMuMTcxNTcyODc1MjUzODEgNi44Mjg0MjcxMjQ3NDYxOSBBIDQgNCAwIDAgMCAxNiA4IFonKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzE2cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICc4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDE4MGRlZyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICdyZ2JhKDAsIDAsIDAsIDAuMDgpIDBweCA2cHggMTZweCAwcHgsIHJnYmEoMCwgMCwgMCwgMC4xMikgMHB4IDNweCA2cHggLTRweCwgcmdiYSgwLCAwLCAwLCAwLjA1KSAwcHggOXB4IDI4cHggOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJzI2cHgnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9KSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfbWFya2Rvd25fMS5kZWZhdWx0LCB7IHJlbWFya1BsdWdpbnM6IFtyZW1hcmtfYnJlYWtzXzEuZGVmYXVsdCwgcmVtYXJrX2dmbV8xLmRlZmF1bHRdLCByZWh5cGVQbHVnaW5zOiBbcmVoeXBlX3Jhd18xLmRlZmF1bHRdLCBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU6IChfYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeyBub2RlIH0gPSBfYSwgcHJvcHMgPSBfX3Jlc3QoX2EsIFtcIm5vZGVcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyBvdmVyZmxvd1g6ICdzY3JvbGwnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiwgT2JqZWN0LmFzc2lnbih7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnbWF4LWNvbnRlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogJzYyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjY2NjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBwcm9wcykpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGE6IChfYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeyBub2RlIH0gPSBfYSwgcHJvcHMgPSBfX3Jlc3QoX2EsIFtcIm5vZGVcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIE9iamVjdC5hc3NpZ24oeyB0YXJnZXQ6ICdfX2JsYW5rJywgc3R5bGU6IHsgY29sb3I6ICcjRjA4QTI0JyB9IH0sIHByb3BzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgc2tpcEh0bWw6IGZhbHNlLCBjaGlsZHJlbjogY29udGVudFsnY29udGVudCddIH0pLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50WydzdGF0dXMnXSA9PT0gJ2ludmFsaWRfYXBpX2tleScgJiYgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7IHNyYzogc2V0dGluZ0d1aWRlX3BuZ18xLmRlZmF1bHQsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0pKSkpKSkpO1xufVxuO1xuZnVuY3Rpb24gTWVzc2FnZXNMaXN0KHByb3BzKSB7XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ21lc3NhZ2VzJywgc3R5bGU6IHtcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcyJyxcbiAgICAgICAgICAgIHdvcmRXcmFwOiAnYnJlYWstd29yZCcsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc0OHB4J1xuICAgICAgICB9IH0sIHByb3BzLm1lc3NhZ2VzLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoTWVzc2FnZSwgeyBrZXk6IGl0ZW0uY29udGVudFswXS5jaGF0SWQsIG1lc3NhZ2U6IGl0ZW0gfSk7XG4gICAgfSkpKTtcbn1cbmV4cG9ydHMuTWVzc2FnZXNMaXN0ID0gTWVzc2FnZXNMaXN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Qcm9tcHRMaXN0ID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IHN0eWxlZF9jb21wb25lbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInN0eWxlZC1jb21wb25lbnRzXCIpKTtcbmNvbnN0IHVzZXJJbmZvXzEgPSByZXF1aXJlKFwiLi4vbGliL3VzZXJJbmZvXCIpO1xuY29uc3QgUHJvVGFnXzEgPSByZXF1aXJlKFwiLi4vQ29tcG9uZW50cy9Qcm9UYWdcIik7XG5jb25zdCBsb2NhbGVfMSA9IHJlcXVpcmUoXCIuLi9saWIvbG9jYWxlXCIpO1xubGV0IE15QnV0dG9uID0gc3R5bGVkX2NvbXBvbmVudHNfMS5kZWZhdWx0LmJ1dHRvbiBgXG5cbiAgICBwYWRkaW5nOiA2cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBjdXJzb3I6IHVuc2V0O1xuXG4gICAgJjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6I0Y2RjZGNjtcbiAgICB9XG5gO1xuZnVuY3Rpb24gUHJvbXB0QnV0dG9uKHByb3BzKSB7XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChNeUJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICc0cHgnLFxuICAgICAgICAgICAgcG9pbnRlckV2ZW50czogcHJvcHMuZGlzYWJsZSA/ICdub25lJyA6ICdhdXRvJ1xuICAgICAgICB9LCBvbkNsaWNrOiBwcm9wcy5oYW5kbGVNZW51SXRlbUNsaWNrIH0sIHByb3BzLmNoaWxkcmVuKSk7XG59XG5mdW5jdGlvbiBQcm9tcHRMaXN0KHByb3BzKSB7XG4gICAgY29uc3QgUHJvbXB0TGlzdERPTSA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3QgdXNlckluZm8gPSAoMCwgdXNlckluZm9fMS51c2VVc2VySW5mb0NvbnRleHQpKCk7XG4gICAgbGV0IExhbmcgPSAoMCwgbG9jYWxlXzEudXNlQ3VycmVudExhbmd1YWdlKSgpO1xuICAgIGNvbnN0IGN1cnJlbnRMYW5ndWFnZSA9IExhbmdbJ2N1cnJlbnQnXVsnbmFtZSddO1xuICAgIC8vIGNvbnN0IHVzZXJJbmZvID0gdXNlVXNlckluZm9Db250ZXh0KClcbiAgICAvLyBjb25zb2xlLmxvZygndXNlckluZm86Jyk7XG4gICAgLy8gY29uc29sZS5sb2codXNlckluZm8pO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgIH0sIFtwcm9wcy5zaG93Rm9sbG93VXBEYXRhTWVudS5zaG93XSk7XG4gICAgLy8gUHJvbXB0IOiPnOWNlSBpdGVtIOeCueWHu1xuICAgIGNvbnN0IGhhbmRsZU1lbnVJdGVtQ2xpY2sgPSAoZGF0YSkgPT4ge1xuICAgICAgICBpZiAodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpIHtcbiAgICAgICAgICAgIC8vIOesrCAzIOS4quWPguaVsCBmYWxzZSDooajnpLrkuI3ph43mlrDmuLLmn5Plm77niYdcbiAgICAgICAgICAgIHByb3BzLmhhbmRsZU1lbnVJdGVtQ2xpY2soZGF0YSwgJ3llcycsIHRydWUsIHByb3BzLmZvbGxvd1VwRGF0YSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyByZWY6IFByb21wdExpc3RET00sIGNsYXNzTmFtZTogJ2ZvbGxvd1VwTWVudScsIHN0eWxlOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHByb3BzLnNob3dGb2xsb3dVcERhdGFNZW51LnN0eWxlKSwgeyBwb3NpdGlvbjogJ2Fic29sdXRlJywgZGlzcGxheTogXCJmbGV4XCIsIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsIHdpZHRoOiAnMTIwcHgnLCBwYWRkaW5nOiAnMCcgfSkgfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2VuZCcsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogJzhweCcsXG4gICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KScsXG4gICAgICAgICAgICAgICAgY29sb3I6ICcjNjY2J1xuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgc3R5bGU6IHsgZmxleDogJzEnIH0gfSwgXCJQcm9tcHRcIiksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChQcm9UYWdfMS5Qcm9UYWcsIG51bGwpKSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogJzhweCA4cHggNHB4JyxcbiAgICAgICAgICAgICAgICBjdXJzb3I6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpID8gJ25vdC1hbGxvd2VkJyA6ICcnLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpID8gJzAuNycgOiAnMScsXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChQcm9tcHRCdXR0b24sIHsgZGlzYWJsZTogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCksIGhhbmRsZU1lbnVJdGVtQ2xpY2s6ICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcCA9ICgwLCB1dGlsXzEuZ2V0RGVmYXVsdFByb21wdCkocHJvcHMuZm9sbG93VXBEYXRhLmtleVdvcmQsIGN1cnJlbnRMYW5ndWFnZSk7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZU1lbnVJdGVtQ2xpY2socCk7XG4gICAgICAgICAgICAgICAgfSkgfSwgXCJEZWZhdWx0XCIpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvbXB0QnV0dG9uLCB7IGRpc2FibGU6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpLCBoYW5kbGVNZW51SXRlbUNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZU1lbnVJdGVtQ2xpY2sodXRpbF8xLmRpY3Rpb25hcnlQcm9tcHQpO1xuICAgICAgICAgICAgICAgIH0gfSwgdXRpbF8xLmRpY3Rpb25hcnlQcm9tcHQudGl0bGUpLFxuICAgICAgICAgICAgcHJvcHMucHJvbXB0TGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVNZW51SXRlbUNsaWNrKGl0ZW0pfT57aXRlbS50aXRsZX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvbXB0QnV0dG9uLCB7IGtleTogaXRlbS5pZCwgZGlzYWJsZTogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCksIGhhbmRsZU1lbnVJdGVtQ2xpY2s6ICgpID0+IGhhbmRsZU1lbnVJdGVtQ2xpY2soaXRlbSkgfSwgaXRlbS50aXRsZSk7XG4gICAgICAgICAgICB9KSkpKTtcbn1cbmV4cG9ydHMuUHJvbXB0TGlzdCA9IFByb21wdExpc3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUmVnZW5lcmF0ZUJ1dHRvbiA9IHZvaWQgMDtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xuZnVuY3Rpb24gUmVnZW5lcmF0ZUJ1dHRvbihwcm9wcykge1xuICAgIGNvbnN0IGxhc3RNZXNzYWdlID0gcHJvcHMubWVzc2FnZXNbcHJvcHMubWVzc2FnZXMubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgbGFzdE1lc3NhZ2VTdGF0dXMgPSBsYXN0TWVzc2FnZSA/IGxhc3RNZXNzYWdlLmNvbnRlbnRbbGFzdE1lc3NhZ2UuY29udGVudC5sZW5ndGggLSAxXS5zdGF0dXMgOiAnYmVnaW4nO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgcHJvcHMubWVzc2FnZXMubGVuZ3RoID49IDEgJiYgKGxhc3RNZXNzYWdlU3RhdHVzID09PSAnaW52YWxpZF9hcGlfa2V5JyB8fCBsYXN0TWVzc2FnZVN0YXR1cyA9PT0gJ2RvbmUnKSAmJlxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMy4ycHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICc2MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICcxOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCA2cHggMTZweCAwIHJnYmEoMCwgMCwgMCwgMC4wOCksIDAgM3B4IDZweCAtNHB4IHJnYmEoMCwgMCwgMCwgMC4xMiksIDAgOXB4IDI4cHggOHB4IHJnYmEoMCwgMCwgMCwgMC4wNSknXG4gICAgICAgICAgICAgICAgfSwgc2l6ZTogJ3NtYWxsJywgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwcm9wcy5oYW5kbGVSZWdlbmVyYXRlQnV0dG9uQ2xpY2soKTtcbiAgICAgICAgICAgICAgICB9IH0sIFwiUmVnZW5lcmF0ZVwiKSkpKTtcbn1cbmV4cG9ydHMuUmVnZW5lcmF0ZUJ1dHRvbiA9IFJlZ2VuZXJhdGVCdXR0b247XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TZWxlY3Rpb24gPSB2b2lkIDA7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCBsb2NhbGVfMSA9IHJlcXVpcmUoXCIuLi9saWIvbG9jYWxlXCIpO1xuY29uc3QgbGFuZ18xID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xuY29uc3QgaWNvbnNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9pY29uc1wiKTtcbi8vIGNvbnN0IHVzZVN0eWxlcyA9IGNyZWF0ZVVzZVN0eWxlcyh7XG4vLyAgIG1vcmVCdXR0b246IHtcbi8vICAgICBjb2xvcjogJyNGMDhBMjQnLFxuLy8gICAgIFwiJjpob3ZlclwiOiB7XG4vLyAgICAgICBjb2xvcjogJ3JlZCdcbi8vICAgICB9XG4vLyAgIH0sXG4vLyB9KVxuY29uc3Qgc3R5bGUgPSBgXG4gICNTY291dGVyU2VsZWN0aW9uPnNwYW4ge1xuICAgIGZvbnQtc2l0ZToxMnB4O1xuICAgIGNvbG9yOiM2NjY7XG4gIH1cbiAgLm1vcmVCdXR0b24ge1xuICAgIGNvbG9yOiAjRjA4QTI0O1xuICAgIGN1cnNvcjpwb2ludGVyO1xuICAgIG1hcmdpbjowcHggMnB4O1xuICB9XG4gIC5tb3JlQnV0dG9uOmhvdmVyIHtcbiAgICBvcGFjaXR5OjAuODtcbiAgfVxuXG5gO1xuZnVuY3Rpb24gU2VsZWN0aW9uKHByb3BzKSB7XG4gICAgY29uc3QgW3RhcmdldExhbmd1YWdlLCBzZXRUYXJnZXRMYW5ndWFnZV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoJ1VuaXRlZCBTdGF0ZXMnKTtcbiAgICBjb25zdCBbc2hvd0Z1bGxUZXh0LCBzZXRTaG93RnVsbFRleHRdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHRydWUpO1xuICAgIGNvbnN0IFtwbGF5U3RhdHVzLCBzZXRQbGF5U3RhdHVzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3QgbGFzdFNwZWFrVGltZSA9ICgwLCByZWFjdF8xLnVzZVJlZikoTWF0aC5mbG9vcihEYXRlLm5vdygpKSk7XG4gICAgLy8g6I635Y+W55So5oi36K6+572u55qE6K+t6KiA5L+h5oGvXG4gICAgbGV0IExhbmcgPSAoMCwgbG9jYWxlXzEudXNlQ3VycmVudExhbmd1YWdlKSgpO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICBzZXRUYXJnZXRMYW5ndWFnZShMYW5nWyd0YXJnZXQnXVsnaWQnXSk7XG4gICAgICAgIHNldFNob3dGdWxsVGV4dChwcm9wcy50ZXh0Lmxlbmd0aCA8PSAxNDApO1xuICAgICAgICBzZXRQbGF5U3RhdHVzKGZhbHNlKTtcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcihvblN0b3JhZ2VDaGFuZ2UpO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLm9uQ2hhbmdlZC5yZW1vdmVMaXN0ZW5lcihvblN0b3JhZ2VDaGFuZ2UpO1xuICAgICAgICB9O1xuICAgIH0sIFtwcm9wcy50ZXh0XSk7XG4gICAgLy8g6K+t6Z+z5pKt5oqlXG4gICAgY29uc3Qgc3BlYWtlciA9ICgpID0+IHtcbiAgICAgICAgLy8g6K+G5Yir6K+t6KiAXG4gICAgICAgIC8vIGNvbnN0IGxuZ0RldGVjdG9yID0gbmV3IExhbmd1YWdlRGV0ZWN0KCk7XG4gICAgICAgIC8vIGxuZ0RldGVjdG9yLnNldExhbmd1YWdlVHlwZSgnaXNvMicpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGxuZ0RldGVjdG9yLmRldGVjdChwcm9wcy50ZXh0LCAyKSk7XG4gICAgICAgIGlmIChNYXRoLmZsb29yKERhdGUubm93KCkpIC0gbGFzdFNwZWFrVGltZS5jdXJyZW50IDwgMTAwMCkge1xuICAgICAgICAgICAgLy8geCDmr6vnp5LlhoXlj6rlj6/ngrnlh7vkuIDmrKFcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgKDAsIHV0aWxfMS5wbGF5VGV4dFRvU3BlZWNoKShwcm9wcy50ZXh0LCBsYW5nXzEubGFuZ3VhZ2VDb2Rlc1t0YXJnZXRMYW5ndWFnZV0sIHRhcmdldExhbmd1YWdlKTtcbiAgICAgICAgICAgIC8vIHRleHRUb1NwZWVjaERvd25sb2FkKHByb3BzLnRleHQsIGxhbmd1YWdlQ29kZXNbdGFyZ2V0TGFuZ3VhZ2UgYXMga2V5b2YgdHlwZW9mIGxhbmd1YWdlQ29kZXNdKVxuICAgICAgICAgICAgbGFzdFNwZWFrVGltZS5jdXJyZW50ID0gTWF0aC5mbG9vcihEYXRlLm5vdygpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIOaaguWBnOS4iuS4gOasoeaSreaKpeS7u+WKoVxuICAgICAgICAgICAgc3BlZWNoU3ludGhlc2lzLmNhbmNlbCgpO1xuICAgICAgICAgICAgY29uc3QgdXR0ZXJhbmNlID0gbmV3IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZShwcm9wcy50ZXh0KTtcbiAgICAgICAgICAgIC8vIOivreenjVxuICAgICAgICAgICAgdXR0ZXJhbmNlLmxhbmcgPSBsYW5nXzEubGFuZ3VhZ2VDb2Rlc1t0YXJnZXRMYW5ndWFnZV07XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhsYW5ndWFnZUNvZGVzW3RhcmdldExhbmd1YWdlIGFzIGtleW9mIHR5cGVvZiBsYW5ndWFnZUNvZGVzXSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0YXJnZXRMYW5ndWFnZSk7XG4gICAgICAgICAgICAvLyDor63pgJ9cbiAgICAgICAgICAgIGlmIChwbGF5U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgLy8g5Z+65pWw5qyh5pKt5pS+5pe26YeH55So5oWi6YCf5pKt5pS+77yM6K6p55So5oi35Y+v5Lul5ZCs55qE5pu05riF5qWaXG4gICAgICAgICAgICAgICAgdXR0ZXJhbmNlLnJhdGUgPSAwLjY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB1dHRlcmFuY2UucmF0ZSA9IDAuODU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRQbGF5U3RhdHVzKCFwbGF5U3RhdHVzKTtcbiAgICAgICAgICAgIC8vIOW8gOaSreWQp1xuICAgICAgICAgICAgc3BlZWNoU3ludGhlc2lzLnNwZWFrKHV0dGVyYW5jZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYW1wbGl0dWRlLnRyYWNrKCdzcGVhaycpO1xuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ3NwZWFrJyB9KTtcbiAgICB9O1xuICAgIGNvbnN0IG9uU3RvcmFnZUNoYW5nZSA9IChjaGFuZ2VzLCBhcmVhKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNoYW5nZXMpO1xuICAgICAgICAvLyDmm7TmlrDnm67moIfor63oqIBcbiAgICAgICAgaWYgKCd0YXJnZXRMYW5ndWFnZScgaW4gY2hhbmdlcykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2NoYW5nZXMnKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNoYW5nZXNbJ3RhcmdldExhbmd1YWdlJ11bJ25ld1ZhbHVlJ10pO1xuICAgICAgICAgICAgc2V0VGFyZ2V0TGFuZ3VhZ2UoY2hhbmdlc1sndGFyZ2V0TGFuZ3VhZ2UnXVsnbmV3VmFsdWUnXSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVRvZ2dsZVNob3dGdW5UZXh0ID0gKCkgPT4ge1xuICAgICAgICBzZXRTaG93RnVsbFRleHQoIXNob3dGdWxsVGV4dCk7XG4gICAgfTtcbiAgICAvLyBjb25zdCBjbGFzc2VzID0gdXNlU3R5bGVzKClcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiLCBudWxsLCBzdHlsZSksXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgaWQ6IFwiU2NvdXRlclNlbGVjdGlvblwiLCBjbGFzc05hbWU6ICcnLCBzdHlsZToge1xuICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJzE4cHgnLFxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcxLjUnXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICBzaG93RnVsbFRleHQgPyByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHByb3BzLnRleHQpLFxuICAgICAgICAgICAgICAgIHByb3BzLnRleHQubGVuZ3RoID4gMTQwICYmIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGNsYXNzTmFtZTogJ21vcmVCdXR0b24nLCBvbkNsaWNrOiBoYW5kbGVUb2dnbGVTaG93RnVuVGV4dCB9LCBcIkxlc3NcIikpXG4gICAgICAgICAgICAgICAgOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBwcm9wcy50ZXh0LnN1YnN0cmluZygwLCAxNDApICsgJy4uLicpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBjbGFzc05hbWU6ICdtb3JlQnV0dG9uJywgb25DbGljazogaGFuZGxlVG9nZ2xlU2hvd0Z1blRleHQgfSwgXCJNb3JlXCIpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICcycHgnXG4gICAgICAgICAgICAgICAgfSwgc2l6ZTogXCJzbWFsbFwiLCB0eXBlOiBcInRleHRcIiwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5DdXN0b21lclNlcnZpY2VPdXRsaW5lZCwgbnVsbCksIG9uQ2xpY2s6IHNwZWFrZXIgfSkpKSk7XG59XG5leHBvcnRzLlNlbGVjdGlvbiA9IFNlbGVjdGlvbjtcbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlVzZXJNZXNzYWdlSW5wdXQgPSB2b2lkIDA7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IGljb25zXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7XG5jb25zdCByZWFjdF9zcHJpbmdfMSA9IHJlcXVpcmUoXCJyZWFjdC1zcHJpbmdcIik7XG5jb25zdCB7IFRleHRBcmVhIH0gPSBhbnRkXzEuSW5wdXQ7XG5mdW5jdGlvbiBVc2VyTWVzc2FnZUlucHV0KHByb3BzKSB7XG4gICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBwcm9wcy5tZXNzYWdlc1twcm9wcy5tZXNzYWdlcy5sZW5ndGggLSAxXTtcbiAgICAvLyBjb25zdCBsYXN0TWVzc2FnZVN0YXR1cyA9IGxhc3RNZXNzYWdlLmNvbnRlbnRbbGFzdE1lc3NhZ2UuY29udGVudC5sZW5ndGggLSAxXS5zdGF0dXNcbiAgICBjb25zdCBbZm9ybV0gPSBhbnRkXzEuRm9ybS51c2VGb3JtKCk7XG4gICAgY29uc3QgW2lzQW5zd2VySW5wdXRlZCwgc2V0SXNBbnN3ZXJJbnB1dGVkXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgLy8g5paH5pys5qGG5LiL5pWy5Ye75oyJ6ZSu5pe2XG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyDpmLvmraLkuovku7blhpLms6FcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZUtleURvd24nKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMyAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRzID0gcHJvcHMubWVzc2FnZXNbcHJvcHMubWVzc2FnZXMubGVuZ3RoIC0gMV1bJ2NvbnRlbnQnXTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb3BzLm1lc3NhZ2VzKTtcbiAgICAgICAgICAgIC8vIOaVsuWHu+Wbnui9pumUrlxuICAgICAgICAgICAgaWYgKHByb3BzLm1lc3NhZ2VzLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgICAgICAgIChjb250ZW50c1tjb250ZW50cy5sZW5ndGggLSAxXVsnc3RhdHVzJ10gIT09ICdiZWdpbicgJiZcbiAgICAgICAgICAgICAgICAgICAgY29udGVudHNbY29udGVudHMubGVuZ3RoIC0gMV1bJ3N0YXR1cyddICE9PSAncHJvY2VzcycpICYmIGlzQW5zd2VySW5wdXRlZCkge1xuICAgICAgICAgICAgICAgIC8vIOmdnuWKoOi9veeKtuaAgeOAgUdQVCDmtojmga/lj5HpgIHlrozmr5Xml7bnlKjmiLflj6/lj5HpgIHmtojmga9cbiAgICAgICAgICAgICAgICBoYW5kbGVTZW5kTWVzc2FnZSh7ICdtc2cnOiBldmVudC50YXJnZXQudmFsdWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyDmlofmnKzmoYblgLzlj5jljJbml7ZcbiAgICBjb25zdCBvblRleHRBcmVhSW5wdXQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzZXRJc0Fuc3dlcklucHV0ZWQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXRJc0Fuc3dlcklucHV0ZWQoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVTZW5kTWVzc2FnZSA9ICh2YWx1ZXMpID0+IHtcbiAgICAgICAgLy8g5riF56m65paH5pys5qGGXG4gICAgICAgIGZvcm0ucmVzZXRGaWVsZHMoKTtcbiAgICAgICAgLy8g56aB55So5Y+R6YCB5oyJ6ZKuXG4gICAgICAgIHNldElzQW5zd2VySW5wdXRlZChmYWxzZSk7XG4gICAgICAgIC8vIOaJp+ihjOWPkea2iOaBr+S6i+S7tlxuICAgICAgICBwcm9wcy5oYW5kbGVTZW5kTWVzc2FnZSh2YWx1ZXMubXNnKTtcbiAgICB9O1xuICAgIC8vIGNvbnN0IEFuaW1hdGVkQnV0dG9uID0gYW5pbWF0ZWQoQnV0dG9uKTtcbiAgICBjb25zdCBhbmltYXRpb25TdHlsZSA9ICgwLCByZWFjdF9zcHJpbmdfMS51c2VTcHJpbmcpKHtcbiAgICAgICAgZnJvbTogeyB0cmFuc2Zvcm06ICdyb3RhdGUoMGRlZyknIH0sXG4gICAgICAgIHRvOiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgzNjBkZWcpJyB9LFxuICAgICAgICBjb25maWc6IHsgZHVyYXRpb246IDEwMDAgfSxcbiAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgd2lkdGg6ICczMnB4JyxcbiAgICAgICAgaGVpZ2h0OiAnMzJweCcsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCByZWQnXG4gICAgfSk7XG4gICAgY29uc3QgbGFzdFN0YXR1cyA9IGxhc3RNZXNzYWdlID8gbGFzdE1lc3NhZ2UuY29udGVudFtsYXN0TWVzc2FnZS5jb250ZW50Lmxlbmd0aCAtIDFdLnN0YXR1cyA6ICdiZWdpbic7XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ3ctZnVsbCcsIHN0eWxlOiB7IGJvcmRlclRvcDogJzFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNiknIH0gfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0sIHsgZm9ybTogZm9ybSwgb25GaW5pc2g6IGhhbmRsZVNlbmRNZXNzYWdlLCBcbiAgICAgICAgICAgIC8vIG9uS2V5RG93bj17aGFuZGxlRm9ybUtleURvd259XG4gICAgICAgICAgICBsYXlvdXQ6ICdpbmxpbmUnLCBzdHlsZTogeyBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9LCBjbGFzc05hbWU6ICdwLTInIH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwibXNnXCIsIHN0eWxlOiB7IG1hcmdpbjogJzAnLCBmbGV4R3JvdzogJzEnIH0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwgeyBwbGFjZWhvbGRlcjogXCJTZW5kIGEgbWVzc2FnZVwiLCBib3JkZXJlZDogZmFsc2UsIGF1dG9TaXplOiB7IG1pblJvd3M6IDEsIG1heFJvd3M6IDIgfSwgXG4gICAgICAgICAgICAgICAgICAgIC8vIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0Q29sb3I6ICcjRjA4QTI0JyxcbiAgICAgICAgICAgICAgICAgICAgfSwgb25LZXlEb3duOiBoYW5kbGVLZXlEb3duLCBvbklucHV0OiBvblRleHRBcmVhSW5wdXQgfSkpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBzdHlsZTogeyBtYXJnaW5SaWdodDogJzAnIH0gfSwgcHJvcHMubWVzc2FnZXMubGVuZ3RoID09PSAwIHx8IGxhc3RTdGF0dXMgIT09ICdiZWdpbicgJiYgbGFzdFN0YXR1cyAhPT0gJ3Byb2Nlc3MnID9cbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHR5cGU6IFwidGV4dFwiLCBodG1sVHlwZTogXCJzdWJtaXRcIiwgZGlzYWJsZWQ6IHByb3BzLm1lc3NhZ2VzLmxlbmd0aCA+IDAgPyBsYXN0U3RhdHVzID09PSAnYmVnaW4nIHx8IGxhc3RTdGF0dXMgPT09ICdwcm9jZXNzJyB8fCAhaXNBbnN3ZXJJbnB1dGVkIDogZmFsc2UsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbG9yOiAhaXNMb2FkaW5nICYmIGlzQW5zd2VySW5wdXRlZCA/ICcjRjA4QTI0JyA6ICcnXG4gICAgICAgICAgICAgICAgICAgIH0sIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuU2VuZE91dGxpbmVkLCBudWxsKSB9KSA6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgbWFyZ2luUmlnaHQ6ICc4cHgnIH0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF9zcHJpbmdfMS5hbmltYXRlZC5kaXYsIHsgc3R5bGU6IGFuaW1hdGlvblN0eWxlIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuTG9hZGluZ091dGxpbmVkLCBudWxsKSkpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgc3R5bGU6IHsgbWFyZ2luOiAnMCcgfSB9KSkpKTtcbn1cbmV4cG9ydHMuVXNlck1lc3NhZ2VJbnB1dCA9IFVzZXJNZXNzYWdlSW5wdXQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlBvcHVwQ2FyZCA9IHZvaWQgMDtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgdXVpZF8xID0gcmVxdWlyZShcInV1aWRcIik7XG5jb25zdCBjb250ZW50U2NyaXB0XzEgPSByZXF1aXJlKFwiLi4vY29udGVudFNjcmlwdFwiKTtcbmNvbnN0IE5hdl8xID0gcmVxdWlyZShcIi4uL0NvbXBvbmVudHMvTmF2XCIpO1xuY29uc3QgQ3VzdG9tUHJvbXB0Rm9ybV8xID0gcmVxdWlyZShcIi4uL0NvbXBvbmVudHMvQ3VzdG9tUHJvbXB0Rm9ybVwiKTtcbmNvbnN0IE1lc3NhZ2VfMSA9IHJlcXVpcmUoXCIuL01lc3NhZ2VcIik7XG5jb25zdCBQcm9tcHRMaXN0XzEgPSByZXF1aXJlKFwiLi9Qcm9tcHRMaXN0XCIpO1xuY29uc3QgUmVnZW5lcmF0ZUJ1dHRvbl8xID0gcmVxdWlyZShcIi4vUmVnZW5lcmF0ZUJ1dHRvblwiKTtcbmNvbnN0IFVzZXJNZXNzYWdlSW5wdXRfMSA9IHJlcXVpcmUoXCIuL1VzZXJNZXNzYWdlSW5wdXRcIik7XG5jb25zdCBTZWxlY3Rpb25fMSA9IHJlcXVpcmUoXCIuL1NlbGVjdGlvblwiKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgbG9jYWxlXzEgPSByZXF1aXJlKFwiLi4vbGliL2xvY2FsZVwiKTtcbmNvbnN0IHVzZXJJbmZvXzEgPSByZXF1aXJlKFwiLi4vbGliL3VzZXJJbmZvXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IHN0eWxlZF9jb21wb25lbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInN0eWxlZC1jb21wb25lbnRzXCIpKTtcbmxldCBjdXJyZW50TGFuZ3VhZ2U7XG5sZXQgdGFyZ2V0TGFuZ3VhZ2U7XG4vLyDojrflj5YgQW5raSDljaHniYfvvIznlKjkuo7nvJblhpnmlYXkuotcbmxldCBhbmtpQ2FyZHM7XG4oMCwgdXRpbF8xLmdldEFua2lDYXJkcykoKS50aGVuKChjYXJkcykgPT4ge1xuICAgIGFua2lDYXJkcyA9IGNhcmRzO1xufSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coZXJyb3IpO1xufSk7XG4vLyDliJ3lp4vljJYgQW5raSDnmoQgTW9kZWzvvIzkuLrlkI7nu63lr7zlhaXliLAgQW5raSDmj5DpgJ9cbmNvbnN0IHsgVGV4dEFyZWEgfSA9IGFudGRfMS5JbnB1dDtcbi8vIGNvbnN0IEFua2lDb250ZXh0ID0gY3JlYXRlQ29udGV4dChudWxsKTtcbmNvbnN0IFNjb3V0ZXJEaXYgPSBzdHlsZWRfY29tcG9uZW50c18xLmRlZmF1bHQuZGl2IGBcblxubGVmdDoxMDtcbnRvcDoxMDtcblxuZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG53aWR0aDogMzkwcHg7XG5oZWlnaHQ6IDU2MHB4O1xuY29sb3I6IHJnYigwIDAgMCAvIDgwJSk7XG5wb3NpdGlvbjogZml4ZWQ7XG5kaXNwbGF5OiBmbGV4O1xuZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbmZvbnQtc2l6ZTogMTRweDtcbmJhY2tncm91bmQtY29sb3I6ICNmZmY7XG56LWluZGV4OiA5OTk7XG5vdmVyZmxvdzogaGlkZGVuO1xuYm94LXNoYWRvdzogMHB4IDhweCAyOHB4IHJnYmEoMCwwLDAsLjE2KTtcbmJvcmRlci1yYWRpdXM6IDZweDtcbmJvcmRlcjoxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMDYpXG5cbmgxLGgyLGgye1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuaDEge1xuICBmb250LXNpemU6MjBweDtcbn1cblxuaDIge1xuICBmb250LXNpemU6MTdweDtcbn1cblxuYDtcbmZ1bmN0aW9uIFBvcHVwQ2FyZChwcm9wcykge1xuICAgIGNvbnN0IFttZXNzYWdlcywgc2V0TWVzc2FnZXNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKFt7XG4gICAgICAgICAgICAnY29udGVudCc6IFt7XG4gICAgICAgICAgICAgICAgICAgICdzdGF0dXMnOiAnYmVnaW4nLFxuICAgICAgICAgICAgICAgICAgICAnY2hhdElkJzogJycsXG4gICAgICAgICAgICAgICAgICAgICdjb250ZW50JzogJydcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICdyb2xlJzogJ3VzZXInLFxuICAgICAgICAgICAgJ3Byb21wdCc6ICcnLFxuICAgICAgICAgICAgJ3Nob3dJbWFnZXNCb3gnOiB0cnVlLFxuICAgICAgICAgICAgJ2ltYWdlcyc6IFtdXG4gICAgICAgIH1dKTtcbiAgICBjb25zdCBbcHJvbXB0cywgc2V0UHJvbXB0c10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoW10pO1xuICAgIGNvbnN0IFtsYXN0RXhlY3V0ZWRQcm9tcHQsIHNldExhc3RFeGVjdXRlZFByb21wdF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoeyAndGl0bGUnOiAn8J+RifCfj7wgUGxlYXNlIGNob29zZSBhIHByb21wdCcsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9KTtcbiAgICBjb25zdCBbaXNPcGVuTWVudSwgc2V0SXNPcGVuTWVudV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtpc1BvcG92ZXJPcGVuLCBzZXRQb3BvdmVyT3Blbl0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtjdXN0b21Qcm9tcHRGb3JtRGF0YSwgc2V0Q3VzdG9tUHJvbXB0Rm9ybURhdGFdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9KTtcbiAgICAvLyBzdGFuZGJ5LG5vcm1hbCxsb2FkaW5nLHN1Y2Nlc3NcbiAgICBjb25zdCBbYWRkVG9BbmtpU3RhdHVzLCBzZXRBZGRUb0Fua2lTdGF0dXNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHsgJ3N0YXR1cyc6ICdub3JtYWwnLCAnbm90ZUlkJzogMCB9KTtcbiAgICBjb25zdCBbZm9sbG93VXBEYXRhLCBzZXRGb2xsb3dVcERhdGFdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHsga2V5V29yZDogJycsIHNlbnRlbmNlOiAnJyB9KTtcbiAgICBjb25zdCBbc2hvd0ZvbGxvd1VwRGF0YU1lbnUsIHNldFNob3dGb2xsb3dVcERhdGFNZW51XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7IHNob3c6IGZhbHNlLCBzdHlsZToge30gfSk7XG4gICAgLy8g56qX5Y+j5ouW5ou96YC76L6RXG4gICAgY29uc3QgW2RyYWdnaW5nLCBzZXREcmFnZ2luZ10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IHdpbmRvd0VsZW1lbnQgPSAoMCwgcmVhY3RfMS51c2VSZWYpKG51bGwpO1xuICAgIGNvbnN0IG1lc3NhZ2VzTGlzdCA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3Qgc2hvdWxkU3RheUF0Qm90dG9tUmVmID0gKDAsIHJlYWN0XzEudXNlUmVmKShmYWxzZSk7XG4gICAgLy8gY29uc3QgdXNlckluZm9SZWYgPSB1c2VSZWYoKTtcbiAgICBjb25zdCBsYXN0UHJvbXB0UmVmID0gKDAsIHJlYWN0XzEudXNlUmVmKSgpO1xuICAgIGNvbnN0IFtmb3JtXSA9IGFudGRfMS5Gb3JtLnVzZUZvcm0oKTtcbiAgICBjb25zdCB1c2VySW5mbyA9ICgwLCB1c2VySW5mb18xLnVzZVVzZXJJbmZvQ29udGV4dCkoKTtcbiAgICBsZXQgTGFuZyA9ICgwLCBsb2NhbGVfMS51c2VDdXJyZW50TGFuZ3VhZ2UpKCk7XG4gICAgY3VycmVudExhbmd1YWdlID0gTGFuZ1snY3VycmVudCddWyduYW1lJ107XG4gICAgdGFyZ2V0TGFuZ3VhZ2UgPSBMYW5nWyd0YXJnZXQnXVsnbmFtZSddO1xuICAgIC8vIOaOp+WItui/vemXruiPnOWNlVxuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygn5o6n5Yi26L+96Zeu6I+c5Y2VJyk7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgcG9ydCA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5jb25uZWN0KHtcbiAgICAgICAgICAgIG5hbWU6ICdmcm9tUG9wdXBDYXJkJ1xuICAgICAgICB9KTtcbiAgICAgICAgcG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1zZykgPT4ge1xuICAgICAgICAgICAgaWYgKG1zZy50eXBlID09PSBcIlVQREFURV9QT1BVUF9DQVJEXCIpIHtcbiAgICAgICAgICAgICAgICAvLyDmmL7npLogUHJvbXB0IOiPnOWNlVxuICAgICAgICAgICAgICAgIHNldEZvbGxvd1VwRGF0YShtc2cucGF5bG9hZC5mb2xsb3dVcERhdGEpO1xuICAgICAgICAgICAgICAgIC8v6K6+572u6I+c5Y2V55qE5L2N572uXG4gICAgICAgICAgICAgICAgc2V0U2hvd0ZvbGxvd1VwRGF0YU1lbnUocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IG1zZy5wYXlsb2FkLnN0eWxlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgKF9hID0gd2luZG93RWxlbWVudC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2FyZENsaWNrKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1c2VFZmZlY3QgcmV0dXJuJyk7XG4gICAgICAgICAgICAoX2EgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDYXJkQ2xpY2spO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGVQb3B1cENhcmRDbGljaygpIHtcbiAgICAgICAgICAgIC8vIOW9k+i/vemXruiPnOWNleaYvuekuuaXtu+8jOeCueWHu+eql+WPo+WFs+mXreiPnOWNlVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNob3dGb2xsb3dVcERhdGFNZW51LnNob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0ZvbGxvd1VwRGF0YU1lbnUocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICB9XG4gICAgfSwgW3Nob3dGb2xsb3dVcERhdGFNZW51XSk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb3BzLmRhdGEpO1xuICAgICAgICAvLyDmuLLmn5MgUHJvbXB0IOWIl+ihqFxuICAgICAgICBpbml0aWFsaXplUHJvbXB0TGlzdCgpO1xuICAgICAgICBpZiAocHJvcHMucnVuUHJvbXB0IHx8IHByb3BzLnJ1blByb21wdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyDojrflj5bmnIDov5HkuIDmrKHmiafooYznmoQgUHJvbXB0XG4gICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuZ2V0KHsgXCJsYXN0RXhlY3V0ZWRQcm9tcHRcIjogJycgfSkudGhlbigoaXRlbSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxhc3RFeGVjdXRlZFByb21wdCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5omn6KGM6buY6K6kIFByb21wdOOAgeiOt+WPliBVbnNwbGFzaCDlm77niYdcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9ybXB0ID0geWllbGQgKDAsIHV0aWxfMS5nZXRJbml0aWFsUHJvbXB0KShwcm9wcy5kYXRhLmtleVdvcmQsIGN1cnJlbnRMYW5ndWFnZSk7XG4gICAgICAgICAgICAgICAgICAgIGV4ZWN1dGl2ZVByb21wdChwb3JtcHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5omn6KGMIFByb21wdOOAgeiOt+WPliBVbnNwbGFzaCDlm77niYdcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGFzdEV4ZWN1dGVkUHJvbXB0LmlkID09PSBcIkRlZmF1bHRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9ybXB0ID0geWllbGQgKDAsIHV0aWxfMS5nZXRJbml0aWFsUHJvbXB0KShwcm9wcy5kYXRhLmtleVdvcmQsIGN1cnJlbnRMYW5ndWFnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBleGVjdXRpdmVQcm9tcHQocG9ybXB0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWN1dGl2ZVByb21wdChpdGVtLmxhc3RFeGVjdXRlZFByb21wdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyDkuI3miafooYzku7vkvZUgUHJvbXB077yM55Sx55So5oi36Ieq6KGM6YCJ5oupXG4gICAgICAgICAgICBleGVjdXRpdmVQcm9tcHQoeyAndGl0bGUnOiAnRGVmYXVsdCcsICdnZXRVbnNwbGFzaEltYWdlcyc6IHRydWUsICd1c2VyUHJvbXB0JzogYFdvcmQ6XCJ7e2tleVdvcmR9fVwiLCBzZW50ZW5jZTogXCJ7e3NlbnRlbmNlfX1cImAsICdpZCc6ICdEZWZhdWx0JyB9LCAnbm8nKTtcbiAgICAgICAgICAgIHNldElzT3Blbk1lbnUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6K6+572u56qX5Y+j55qE6buY6K6k5L2N572u44CB5re75Yqg5rua5Yqo5LqL5Lu277yM6K6p5raI5oGv5YiX6KGo6Ieq5Yqo5rua5Yqo5Yiw5bqV6YOoXG4gICAgICAgICgwLCB1dGlsXzEud2luZG93SW5pdGlhbGl6YXRpb24pKHsgJ2lzUGluJzogcHJvcHMuaXNQaW4sICd3aW5kb3dFbGVtZW50Jzogd2luZG93RWxlbWVudCwgJ3NlbGVjdGlvbic6IHByb3BzLnNlbGVjdGlvbiwgJ21lc3NhZ2VzTGlzdCc6IG1lc3NhZ2VzTGlzdCB9KTtcbiAgICB9LCBbcHJvcHMuZGF0YS5rZXlXb3JkXSk7XG4gICAgLy8g6IGK5aSp6K6w5b2V5pS55Y+Y5pe2XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIC8vIOiusOW9leW9k+WJjeWIl+ihqOeahOS9jee9rlxuICAgICAgICBpZiAod2luZG93RWxlbWVudC5jdXJyZW50KSB7XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRhaW5lcicpWzBdO1xuICAgICAgICAgICAgc2hvdWxkU3RheUF0Qm90dG9tUmVmLmN1cnJlbnQgPSBjb250YWluZXIuc2Nyb2xsSGVpZ2h0IC0gY29udGFpbmVyLnNjcm9sbFRvcCA8PSBjb250YWluZXIuY2xpZW50SGVpZ2h0ICsgMjA7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50TGVuZ3RoID0gbWVzc2FnZXMubGVuZ3RoID4gMCA/IG1lc3NhZ2VzW21lc3NhZ2VzLmxlbmd0aCAtIDFdLmNvbnRlbnQubGVuZ3RoIDogMDtcbiAgICAgICAgICAgIC8vIOiHquWKqOa7muWKqOWIsOa2iOaBr+W6lemDqO+8jOaWueS+v+eci+WIsOacgOaWsOeahOaWh+Wtl1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZXNbbWVzc2FnZXMubGVuZ3RoIC0gMV0uY29udGVudFtjb250ZW50TGVuZ3RoIC0gMV0uc3RhdHVzID09PSAncHJvY2VzcycgfHwgbWVzc2FnZXNbbWVzc2FnZXMubGVuZ3RoIC0gMV0uY29udGVudFtjb250ZW50TGVuZ3RoIC0gMV0uc3RhdHVzID09PSAnYmVnaW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvQm90dG9tKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9Cb3R0b20oc2hvdWxkU3RheUF0Qm90dG9tUmVmLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICAvLyAgIGlmIChjb250YWluZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgY2hlY2tJZlNob3VsZFN0YXlBdEJvdHRvbSk7XG4gICAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfVxuICAgICAgICAvLyDkv53lrZjljoblj7LorrDlvZXvvIzlj6rkv53nlZnmtojmga/orrDlvZXnmoTnrKwgMSDmnaHvvIzlpoLmnpzov5nmnaHmtojlpLHmmK/plJnor6/mj5DnpLrvvIzliJnkuI3kv53lrZhcbiAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA9PT0gMSAmJiBtZXNzYWdlc1swXVsnY29udGVudCddW21lc3NhZ2VzWzBdWydjb250ZW50J10ubGVuZ3RoIC0gMV1bJ3N0YXR1cyddID09PSAnZG9uZScpIHtcbiAgICAgICAgICAgICgoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RvcmFnZSA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5nZXQoeyBcImhpc3RvcnlcIjogW10sIFwibGFzdEV4ZWN1dGVkUHJvbXB0XCI6ICcnIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleVdvcmQgPSBwcm9wcy5kYXRhLmtleVdvcmQ7XG4gICAgICAgICAgICAgICAgY29uc3QgU2VudGVuY2UgPSBwcm9wcy5kYXRhLlNlbnRlbmNlO1xuICAgICAgICAgICAgICAgIC8vIOWwhuafpeivouiusOW9leS/neWtmOi1t+adpVxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0hpc3RvcnkgPSB7XG4gICAgICAgICAgICAgICAgICAgICdrZXlXb3JkJzoga2V5V29yZCxcbiAgICAgICAgICAgICAgICAgICAgJ3NlbnRlbmNlJzogU2VudGVuY2UsXG4gICAgICAgICAgICAgICAgICAgICdyb2xlJzogbWVzc2FnZXNbMF1bJ3JvbGUnXSxcbiAgICAgICAgICAgICAgICAgICAgJ2Fuc3dlcic6IG1lc3NhZ2VzWzBdWydjb250ZW50J11bbWVzc2FnZXNbMF1bJ2NvbnRlbnQnXS5sZW5ndGggLSAxXVsnY29udGVudCddLFxuICAgICAgICAgICAgICAgICAgICAnc291cmNlJzogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICAgICAgICAgICdwcm9tcHQnOiBtZXNzYWdlc1swXVsncHJvbXB0J10sXG4gICAgICAgICAgICAgICAgICAgICdpbWFnZXMnOiBtZXNzYWdlc1swXVsnaW1hZ2VzJ11cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChrZXlXb3JkICE9PSAnJyAmJiBTZW50ZW5jZSAhPT0gJycgJiYgbWVzc2FnZXNbMF1bJ2NvbnRlbnQnXVttZXNzYWdlc1swXVsnY29udGVudCddLmxlbmd0aCAtIDFdWydjb250ZW50J10gIT09ICcnICYmIHN0b3JhZ2UubGFzdEV4ZWN1dGVkUHJvbXB0LmlkICE9PSAnZGljdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaXRlbS5oaXN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0hpc3RvcnlMaXN0ID0gW107XG4gICAgICAgICAgICAgICAgICAgIGxldCBiaW5nbyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBuZXdIaXN0b3J5TGlzdC5wdXNoKG5ld0hpc3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICAvLyDlpoLmnpzmnIDov5HmiafooYznmoTmmK/lnKjnur/or43lhbjvvIzliJnkuI3kv53lrZjljoblj7LorrDlvZVcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc3RvcmFnZS5oaXN0b3J5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6c6K6w5b2V5bey5a2Y5Zyo77yM5YiZ5LiN6YeN5aSN5L+d5a2YXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3JhZ2UuaGlzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBzdG9yYWdlLmhpc3RvcnlbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5rZXlXb3JkID09PSBuZXdIaXN0b3J5WydrZXlXb3JkJ10gJiYgb2JqLnNlbnRlbmNlID09PSBuZXdIaXN0b3J5WydzZW50ZW5jZSddICYmIG9iai5wcm9tcHQgPT09IG5ld0hpc3RvcnlbJ3Byb21wdCddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmdvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SGlzdG9yeUxpc3QgPSBzdG9yYWdlLmhpc3Rvcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdIaXN0b3J5TGlzdC51bnNoaWZ0KG5ld0hpc3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SGlzdG9yeUxpc3Quc3BsaWNlKDgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobmV3SGlzdG9yeUxpc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghYmluZ28pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5zZXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpc3Rvcnk6IG5ld0hpc3RvcnlMaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKSgpO1xuICAgICAgICB9XG4gICAgfSwgW21lc3NhZ2VzXSk7XG4gICAgLy8g56qX5Y+j5ouW5ou95pe26Kem5Y+RXG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZVVwKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1c2VFZmZlY3QgcmV0dXJuJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVNb3VzZU1vdmUpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNlVXApO1xuICAgICAgICB9O1xuICAgIH0sIFtkcmFnZ2luZ10pO1xuICAgIC8vIOaJp+ihjCBQcm9tcHRcbiAgICBjb25zdCBleGVjdXRpdmVQcm9tcHQgPSAocHJvbXB0LCBydW5Qcm9tcHQsIGltYWdlVG9SZXJlbmRlciwgZGF0YSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyDorr7nva7liqDovb3nirbmgIFcbiAgICAgICAgLy8gc2V0SXNMb2FkaW5nKHRydWUpXG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgbGV0IG5lZWRUb1J1blByb21wdCA9IHJ1blByb21wdDtcbiAgICAgICAgaWYgKG5lZWRUb1J1blByb21wdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBuZWVkVG9SdW5Qcm9tcHQgPSAneWVzJztcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmVlZFRvUmVyZW5kZXJJbWFnZSA9IGltYWdlVG9SZXJlbmRlcjtcbiAgICAgICAgaWYgKG5lZWRUb1JlcmVuZGVySW1hZ2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbmVlZFRvUmVyZW5kZXJJbWFnZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGtleVdvcmQgPSBwcm9wcy5kYXRhLmtleVdvcmQ7XG4gICAgICAgIGxldCBTZW50ZW5jZSA9IHByb3BzLmRhdGEuU2VudGVuY2U7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGtleVdvcmQgPSBkYXRhLmtleVdvcmQ7XG4gICAgICAgICAgICBTZW50ZW5jZSA9IGRhdGEuc2VudGVuY2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyDliJ3lp4vljJZcbiAgICAgICAgICAgIHNldE1lc3NhZ2VzKFtdKTsgLy8g5a+56K+d5YiX6KGoXG4gICAgICAgIH1cbiAgICAgICAgLy8g5aaC5p6c6ZyA6KaB56uL5Y2z5omn6KGMIFByb21wdFxuICAgICAgICBpZiAobmVlZFRvUnVuUHJvbXB0ICE9PSAnbm8nKSB7XG4gICAgICAgICAgICAvL+WIneWni+WMluWbvueJh+WuueWZqFxuICAgICAgICAgICAgbGV0IHNob3dJbWFnZXNCb3ggPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHByb21wdC5pZCA9PT0gJ2RpY3QnIHx8IHByb21wdC5pZCA9PT0gJ0RlZmF1bHQnKSB7XG4gICAgICAgICAgICAgICAgLy8g54m55q6K55qE5pa55rOVXG4gICAgICAgICAgICAgICAgaWYgKGtleVdvcmQubGVuZ3RoIDwgMjApIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0ltYWdlc0JveCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzaG93SW1hZ2VzQm94ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g6Ieq5a6a5LmJIFByb21wdFxuICAgICAgICAgICAgICAgIGlmIChwcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMgJiYgbmVlZFRvUnVuUHJvbXB0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOW9k+WJjSBQcm9tcHQg6ZyA6KaB5pi+56S65Zu+54mH77yM5LiU5b2T5YmN6ZyA6KaB56uL5Y2z5omn6KGMIFByb21wdFxuICAgICAgICAgICAgICAgICAgICBzaG93SW1hZ2VzQm94ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dJbWFnZXNCb3ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDln4vngrlcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAnZXhlY3V0aXZlUHJvbXB0JyB9KTtcbiAgICAgICAgICAgIC8vIOWcqOa2iOaBr+WOhuWPsuS4reaPkuWFpeaWsOiusOW9lVxuICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IFsuLi5wcmV2TWVzc2FnZXMsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAnY29udGVudCc6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NoYXRJZCc6ICgwLCB1dWlkXzEudjQpKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQnOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3RhdHVzJzogJ2JlZ2luJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgICdyb2xlJzogJ2Fzc2lzdGFudCcsXG4gICAgICAgICAgICAgICAgICAgICdwcm9tcHQnOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgJ3Nob3dJbWFnZXNCb3gnOiBzaG93SW1hZ2VzQm94LFxuICAgICAgICAgICAgICAgICAgICAnaW1hZ2VzJzogW11cbiAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICAvLyDpnZ7ov73pl67ml7bvvIzmiY3kvJrorrDlvZXmnIDov5HmiafooYznmoQgUHJvbXB0XG4gICAgICAgICAgICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8g6K6+572u5pyA6L+R5omn6KGM55qEIFByb21wdFxuICAgICAgICAgICAgICAgIHNldExhc3RFeGVjdXRlZFByb21wdChwcm9tcHQpO1xuICAgICAgICAgICAgICAgIC8vIOiusOW9leacgOi/kSAxIOasoeS9v+eUqOeahCBQcm9tcHTvvIznlKjkuo7kuIvmrKHlkK/liqjnqpflj6Pml7bpu5jorqTmiafooYzmraQgUHJvbXB0XG4gICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLnNldCh7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RFeGVjdXRlZFByb21wdDogcHJvbXB0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbmV3UHJvbXB0O1xuICAgICAgICAgICAgbGV0IHAgPSBwcm9tcHQudXNlclByb21wdDtcbiAgICAgICAgICAgIC8vIOWkhOeQhiBQcm9tcHQg5Lit55qE5Y+Y6YePXG4gICAgICAgICAgICBwID0geWllbGQgKDAsIHV0aWxfMS5oYW5kbGVQcm9tcHRWYXJpYWJsZXMpKHAsIGtleVdvcmQsIFNlbnRlbmNlLCBMYW5nKTtcbiAgICAgICAgICAgIG5ld1Byb21wdCA9IFt7ICdyb2xlJzogJ3VzZXInLCAnY29udGVudCc6IHAgfV07XG4gICAgICAgICAgICAvLyDlpoLmnpzljoblj7LorrDlvZXkuK3lrZjlnKjorrDlvZXvvIzliJnkuI3ph43lpI3or7fmsYIgQVBJ77yM55u05o6l5pi+56S65Y6G5Y+y6K6w5b2V55qE5L+h5oGvXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB5aWVsZCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuZ2V0KHsgXCJoaXN0b3J5XCI6IFtdIH0pLnRoZW4oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzorrDlvZXlt7LlrZjlnKjvvIzliJnkuI3ph43lpI3kv53lrZhcbiAgICAgICAgICAgICAgICBsZXQgYmluZ28gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBsZXQgdXBkYXRlZExhc3RNZXNzYWdlO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbS5oaXN0b3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBpdGVtLmhpc3RvcnlbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmoua2V5V29yZCA9PT0ga2V5V29yZCAmJiBvYmouc2VudGVuY2UgPT09IFNlbnRlbmNlICYmIG9iai5wcm9tcHQgPT09IG5ld1Byb21wdFswXVsnY29udGVudCddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJ3JvbGUnIGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pen54mI5pys5Lit5Zug5Li65rKh5pyJ5a2Y5YKoIHJvbGUg77yM55u05o6l5pi+56S65Y6G5Y+y5pWw5o2u5pe25Lya5a+86Ie05ZCO57ut5rWB56iL5byC5bi4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZ28gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmdvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfljoblj7LorrDlvZXvvJonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG9iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDnm7TmjqXmmL7npLrljoblj7LorrDlvZXkuK3nmoTlm57nrZRcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRMYXN0TWVzc2FnZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZXNbbWVzc2FnZXMubGVuZ3RoIC0gMV0pLCB7IHJvbGU6IG9iai5yb2xlLCBjb250ZW50OiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NoYXRJZCc6ICgwLCB1dWlkXzEudjQpKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY29udGVudCc6IG9iai5hbnN3ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3RhdHVzJzogJ2RvbmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dLCBwcm9tcHQ6IG5ld1Byb21wdFswXVsnY29udGVudCddLCBzaG93SW1hZ2VzQm94OiBzaG93SW1hZ2VzQm94LCBpbWFnZXM6IG9iai5pbWFnZXMgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geyBiaW5nbzogYmluZ28sIHVwZGF0ZWRMYXN0TWVzc2FnZTogdXBkYXRlZExhc3RNZXNzYWdlIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuYmluZ28pIHtcbiAgICAgICAgICAgICAgICAvL+aYvuekuuWOhuWPsuiusOW9lVxuICAgICAgICAgICAgICAgIHNldE1lc3NhZ2VzKFtyZXN1bHQudXBkYXRlZExhc3RNZXNzYWdlXSk7XG4gICAgICAgICAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdub3JtYWwnLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgICAgICAgICBsYXN0UHJvbXB0UmVmLmN1cnJlbnQgPSBuZXdQcm9tcHQ7XG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c6ZyA6KaB5pi+56S65Zu+54mH77yM5LiU5Y6G5Y+y6K6w5b2V5Lit5rKh5pyJ5Zu+54mH77yM5YiZ6I635Y+W5Zu+54mHXG4gICAgICAgICAgICAgICAgaWYgKHNob3dJbWFnZXNCb3ggJiYgKChfYSA9IHJlc3VsdC51cGRhdGVkTGFzdE1lc3NhZ2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pbWFnZXMubGVuZ3RoKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyDojrflj5blm77niYfmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgKDAsIHV0aWxfMS5nZXRVbnNwbGFzaEltYWdlcykoa2V5V29yZCkudGhlbigoaW1ncykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L+d5a2Y5Zu+54mH5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RNZXNzYWdlID0gcHJldk1lc3NhZ2VzW3ByZXZNZXNzYWdlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldk1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRMYXN0TWVzc2FnZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbGFzdE1lc3NhZ2UpLCB7IG5lZWRUb1Nob3dJbWc6IHRydWUsIGltYWdlczogaW1ncyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWy4uLnByZXZNZXNzYWdlcy5zbGljZSgwLCBwcmV2TWVzc2FnZXMubGVuZ3RoIC0gMSksIHVwZGF0ZWRMYXN0TWVzc2FnZV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g6I635Y+W6K+t6KiA55+l6K+GXG4gICAgICAgICAgICAgICAgZ2V0S25vd2xlZGdlKG5ld1Byb21wdCwga2V5V29yZCwgcHJvbXB0LmlkKTtcbiAgICAgICAgICAgICAgICAvLyDor7fmsYLlm77niYdcbiAgICAgICAgICAgICAgICBpZiAocHJvbXB0LmlkID09ICdEZWZhdWx0JyB8fCBwcm9tcHQuaWQgPT0gJ2RpY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXlXb3JkLmxlbmd0aCA8PSAyMCAmJiBwcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMgJiYgbmVlZFRvUmVyZW5kZXJJbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5Zu+54mH5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmdldFVuc3BsYXNoSW1hZ2VzKShrZXlXb3JkKS50aGVuKChpbWdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0SW1hZ2VzKGltZ3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L+d5a2Y5Zu+54mH5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBwcmV2TWVzc2FnZXNbcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldk1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRMYXN0TWVzc2FnZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbGFzdE1lc3NhZ2UpLCB7IG5lZWRUb1Nob3dJbWc6IHRydWUsIGltYWdlczogaW1ncyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5wcmV2TWVzc2FnZXMuc2xpY2UoMCwgcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDEpLCB1cGRhdGVkTGFzdE1lc3NhZ2VdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMgJiYgbmVlZFRvUmVyZW5kZXJJbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5Zu+54mH5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmdldFVuc3BsYXNoSW1hZ2VzKShrZXlXb3JkKS50aGVuKChpbWdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0SW1hZ2VzKGltZ3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L+d5a2Y5Zu+54mH5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBwcmV2TWVzc2FnZXNbcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldk1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRMYXN0TWVzc2FnZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbGFzdE1lc3NhZ2UpLCB7IG5lZWRUb1Nob3dJbWc6IHRydWUsIGltYWdlczogaW1ncyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5wcmV2TWVzc2FnZXMuc2xpY2UoMCwgcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDEpLCB1cGRhdGVkTGFzdE1lc3NhZ2VdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyDmiZPlvIAgUG9wdXAg56qX5Y+j77yM5LiN6ZyA6KaB56uL5Y2z5omn6KGMIFByb21wdFxuICAgICAgICAgICAgc2V0TGFzdEV4ZWN1dGVkUHJvbXB0KHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9KTtcbiAgICAgICAgICAgIC8vIOaVsOaNruWfi+eCuVxuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdvcGVuUG9wdXBDYXJkJyB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIOeCueWHu+OAjOmHjeaWsOeUn+aIkOOAjeaMiemSrlxuICAgIGNvbnN0IGhhbmRsZVJlZ2VuZXJhdGVCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICAgICAgLy8g5Zyo5raI5oGv5Y6G5Y+y5Lit5o+S5YWl5paw6K6w5b2VXG4gICAgICAgIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiB7XG4gICAgICAgICAgICBsZXQgbmV3TWVzc2FnZXMgPSBbLi4ucHJldk1lc3NhZ2VzXTtcbiAgICAgICAgICAgIG5ld01lc3NhZ2VzW25ld01lc3NhZ2VzLmxlbmd0aCAtIDFdLmNvbnRlbnQucHVzaCh7XG4gICAgICAgICAgICAgICAgY2hhdElkOiAoMCwgdXVpZF8xLnY0KSgpLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgICAgICAgICAgIHN0YXR1czogJ2JlZ2luJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gYmVnaW4g54q25oCB5omN5Lya5pi+56S65Yqg6L295Yqo55S7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gbmV3TWVzc2FnZXNbbmV3TWVzc2FnZXMubGVuZ3RoIC0gMV0uY29udGVudDtcbiAgICAgICAgICAgIG5ld01lc3NhZ2VzW25ld01lc3NhZ2VzLmxlbmd0aCAtIDFdLmNvbnRlbnRbY29udGVudC5sZW5ndGggLSAxXS5zdGF0dXMgPSAnYmVnaW4nO1xuICAgICAgICAgICAgcmV0dXJuIG5ld01lc3NhZ2VzO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8g6I635Y+W5pyA6L+R5omn6KGM55qEIFByb21wdO+8jOWGjeasoeaJp+ihjFxuICAgICAgICBnZXRLbm93bGVkZ2UobGFzdFByb21wdFJlZi5jdXJyZW50LCBwcm9wcy5kYXRhLmtleVdvcmQsIGxhc3RFeGVjdXRlZFByb21wdC5pZCk7XG4gICAgfTtcbiAgICBjb25zdCBpbml0aWFsaXplUHJvbXB0TGlzdCA9ICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8g6I635Y+W5bey5L+d5a2Y55qEIFByb21wdCBMaXN0XG4gICAgICAgIGNvbnN0IHByb21wdExpc3QgPSB5aWVsZCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2Uuc3luYy5nZXQoeyBcInByb21wdExpc3RcIjogW10gfSkudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucHJvbXB0TGlzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFByb21wdHMocHJvbXB0TGlzdCk7XG4gICAgfSk7XG4gICAgLy8g57yW6L6R6Ieq5a6a5LmJIFByb21wdCDmiJDlip/lkI5cbiAgICBjb25zdCBoYW5kbGVQcm9tcHRFZGl0ZWQgPSAoaXNOZXcpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8g5Yid5aeL5YyWIFByb21wdCDliJfooahcbiAgICAgICAgaW5pdGlhbGl6ZVByb21wdExpc3QoKTtcbiAgICAgICAgLy8g5pu05paw5pyA6L+R5L2/55So55qEIFByb21wdO+8iOmSiOWvuee8lui+keeahOWcuuaZr++8iVxuICAgICAgICBpZiAoIWlzTmV3KSB7XG4gICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2Uuc3luYy5nZXQoeyBcInByb21wdExpc3RcIjogW10gfSkudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbS5wcm9tcHRMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnByb21wdExpc3RbaV0uaWQgPT09IGxhc3RFeGVjdXRlZFByb21wdC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pu05pawXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRMYXN0RXhlY3V0ZWRQcm9tcHQoaXRlbS5wcm9tcHRMaXN0W2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOiusOW9leacgOi/kSAxIOasoeS9v+eUqOeahCBQcm9tcHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5zZXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RFeGVjdXRlZFByb21wdDogaXRlbS5wcm9tcHRMaXN0W2ldXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdoYW5kbGVQcm9tcHRFZGl0ZWQnIH0pO1xuICAgIH0pO1xuICAgIC8vIOivt+axgiBHUFQg5pWw5o2uXG4gICAgY29uc3QgZ2V0S25vd2xlZGdlID0gKHByb21wdCwga2V5V29yZCwgcHJvbXB0SWQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8g5L2/55So6ZW/6L+e5o6lXG4gICAgICAgIGNvbnN0IHBvcnQgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgICAgICAgICBuYW1lOiAnZ2V0R1BUJ1xuICAgICAgICB9KTtcbiAgICAgICAgLy8g6K6w5b2V5pyA6L+R5omn6KGM55qEIFByb21wdO+8jOeUqOS6jumHjeaWsOeUn+aIkFxuICAgICAgICBsYXN0UHJvbXB0UmVmLmN1cnJlbnQgPSBwcm9tcHQ7XG4gICAgICAgIGNvbnN0IHRoaXNLZXlXb3JkID0ga2V5V29yZCB8fCAnJztcbiAgICAgICAgY29uc3QgdGhpc1Byb21wdElkID0gcHJvbXB0SWQgfHwgJyc7XG4gICAgICAgIC8vIOemgeeUqOS/neWtmOWIsCBBbmtpIOaMiemSrlxuICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ3N0YW5kYnknLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgaWYgKHRoaXNQcm9tcHRJZCA9PT0gJ2RpY3QnKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyDkvb/nlKggcG9zdE1zIOWPkemAgeS/oeaBr1xuICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdnZXREaWN0aW9uYXJ5RGF0YScsICdtZXNzYWdlcyc6IHByb21wdCwgJ2tleVdvcmQnOiB0aGlzS2V5V29yZCB9KTtcbiAgICAgICAgICAgIH0sIDIwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIOS9v+eUqCBwb3N0TXMg5Y+R6YCB5L+h5oGvXG4gICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ2dldEtub3dsZWRnZScsICdtZXNzYWdlcyc6IHByb21wdCwgJ2tleVdvcmQnOiB0aGlzS2V5V29yZCB9KTtcbiAgICAgICAgICAgIH0sIDIwKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBicm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChtc2csIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gICAgICAgIC8vICAgLy8gY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8g5o6l5pS25L+h5oGvXG4gICAgICAgIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKChtc2cpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdwb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcicpO1xuICAgICAgICAgICAgaWYgKG1zZy50eXBlID09PSAnc2VuZEdQVERhdGEnKSB7XG4gICAgICAgICAgICAgICAgLy8g6K+35rGCIEdQVCDmlbDmja7miJDlip/kuJTmlbDmja7mtYHkvKDovpPkuK1cbiAgICAgICAgICAgICAgICAvLyBpZiAobXNnLnN0YXR1cyA9PT0gJ3Byb2Nlc3MnIHx8IG1zZy5zdGF0dXMgPT09ICdlbmQnKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5riy5p+T5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdNZXNzYWdlcyA9IFsuLi5wcmV2TWVzc2FnZXNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBuZXdNZXNzYWdlc1tuZXdNZXNzYWdlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOa3seW6puaLt+i0nVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRlbnRMaXN0ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShsYXN0TWVzc2FnZS5jb250ZW50KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3Q29udGVudCA9IG1zZy5BcGlUeXBlID09PSAnY2hhdEdQVFdlYicgPyBtc2cuY29udGVudCA6IGNvbnRlbnRMaXN0W2NvbnRlbnRMaXN0Lmxlbmd0aCAtIDFdWydjb250ZW50J10gKyBtc2cuY29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbnRlbnQgPSAoMCwgdXRpbF8xLmhhbmRsZUhpZ2h0bGlnaHQpKG5ld0NvbnRlbnQsIHByb3BzLmRhdGEua2V5V29yZCwgYW5raUNhcmRzLCB3aW5kb3dFbGVtZW50ID09PSBudWxsIHx8IHdpbmRvd0VsZW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpbmRvd0VsZW1lbnQuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50TGlzdFtjb250ZW50TGlzdC5sZW5ndGggLSAxXVsnY29udGVudCddID0gbmV3Q29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRMaXN0W2NvbnRlbnRMaXN0Lmxlbmd0aCAtIDFdWydzdGF0dXMnXSA9IG1zZy5zdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdDb250ZW50TGlzdCA9IFsuLi5jb250ZW50TGlzdF07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkTGFzdE1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxhc3RNZXNzYWdlKSwgeyBjb250ZW50OiBuZXdDb250ZW50TGlzdCwgcHJvbXB0OiBwcm9tcHRbMF1bJ2NvbnRlbnQnXSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbLi4ucHJldk1lc3NhZ2VzLnNsaWNlKDAsIHByZXZNZXNzYWdlcy5sZW5ndGggLSAxKSwgdXBkYXRlZExhc3RNZXNzYWdlXTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgLy8g6K+35rGCIEdQVCDmlbDmja7miJDlip/kuJTmlbDmja7mtYHnu5PmnZ/kvKDovpNcbiAgICAgICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PT0gJ2RvbmUnIHx8IG1zZy5zdGF0dXMgPT09ICdlcnJvJykge1xuICAgICAgICAgICAgICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8g55So5oi35Y+R6YCB5raI5oGvXG4gICAgY29uc3QgaGFuZGxlU2VuZE1lc3NhZ2UgPSAodmFsdWVzKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHZhbHVlcyk7XG4gICAgICAgIGxldCBwcm9tcHQgPSB2YWx1ZXM7XG4gICAgICAgIC8vIC8vIOa4heepuuaWh+acrOahhlxuICAgICAgICAvLyBmb3JtLnJlc2V0RmllbGRzKCk7XG4gICAgICAgIC8vIOWumuS9jeWIsOW6lemDqFxuICAgICAgICBzY3JvbGxUb0JvdHRvbSh0cnVlKTtcbiAgICAgICAgLy8g5bCG55So5oi35Y+R6KiA5Y+R6YCB5Yiw5raI5oGv6K6w5b2V5LitXG4gICAgICAgIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkTGFzdE1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhdElkOiAoMCwgdXVpZF8xLnY0KSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogdmFsdWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnZG9uZScsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHByb21wdDogcHJvbXB0LFxuICAgICAgICAgICAgICAgIHNob3dJbWFnZXNCb3g6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGltYWdlczogW11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gWy4uLnByZXZNZXNzYWdlcywgdXBkYXRlZExhc3RNZXNzYWdlXTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOWcqOa2iOaBr+WOhuWPsuS4reaPkuWFpeaWsCBHUFQg5raI5oGvXG4gICAgICAgIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiBbLi4ucHJldk1lc3NhZ2VzLCB7XG4gICAgICAgICAgICAgICAgY29udGVudDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXRJZDogKDAsIHV1aWRfMS52NCkoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnYmVnaW4nLFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICByb2xlOiAnYXNzaXN0YW50JyxcbiAgICAgICAgICAgICAgICBwcm9tcHQ6ICcnLFxuICAgICAgICAgICAgICAgIHNob3dJbWFnZXNCb3g6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGltYWdlczogW11cbiAgICAgICAgICAgIH1dKTtcbiAgICAgICAgY29uc3QgbXNnSGlzdG9yeSA9IG1lc3NhZ2VzLnNsaWNlKC01KS5tYXAoKGl0ZW0pID0+IHsgcmV0dXJuIHsgJ3JvbGUnOiBpdGVtLnJvbGUsICdjb250ZW50JzogaXRlbS5jb250ZW50W2l0ZW0uY29udGVudC5sZW5ndGggLSAxXVsnY29udGVudCddIH07IH0pO1xuICAgICAgICBnZXRLbm93bGVkZ2UoWy4uLm1zZ0hpc3RvcnksIHsgXCJyb2xlXCI6IFwidXNlclwiLCBcImNvbnRlbnRcIjogdmFsdWVzIH1dKTtcbiAgICAgICAgLy8gYW1wbGl0dWRlLnRyYWNrKCdoYW5kbGVTZW5kTWVzc2FnZScpO1xuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ2hhbmRsZVNlbmRNZXNzYWdlJyB9KTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU1vdXNlRG93biA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnUG9wdXBDYXJkOmhhbmRsZU1vdXNlRG93bicpO1xuICAgICAgICBzZXREcmFnZ2luZyh0cnVlKTtcbiAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQuY3VycmVudCkge1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFggPSBldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WSA9IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgICAgICAgIHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFggPSBTdHJpbmcob2Zmc2V0WCk7XG4gICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRZID0gU3RyaW5nKG9mZnNldFkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldE9mZnNldCh7IHg6IGV2ZW50LmNsaWVudFggLSBwb3NpdGlvbi54LCB5OiBldmVudC5jbGllbnRZIC0gcG9zaXRpb24ueSB9KTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU1vdXNlTW92ZSA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyAvLyBjb25zb2xlLmxvZygnUG9wdXBDYXJkOmhhbmRsZU1vdXNlTW92ZScpO1xuICAgICAgICAvLyAvLyBjb25zb2xlLmxvZyhkcmFnZ2luZyk7XG4gICAgICAgIGlmIChkcmFnZ2luZyAmJiB3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vIFVzZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgdG8gdGhyb3R0bGUgdGhlIG1vdXNlbW92ZSBldmVudCBoYW5kbGluZ1xuICAgICAgICAgICAgLy8g6byg5qCH55u45a+556qX5Y+j5bem5LiK6KeS55qE5YGP56e7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRYID0gcGFyc2VGbG9hdCh3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRYIHx8ICcnKTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFkgPSBwYXJzZUZsb2F0KHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFkgfHwgJycpO1xuICAgICAgICAgICAgY29uc3QgbmV3WCA9IGV2ZW50LmNsaWVudFggLSBvZmZzZXRYO1xuICAgICAgICAgICAgY29uc3QgbmV3WSA9IGV2ZW50LmNsaWVudFkgLSBvZmZzZXRZO1xuICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIGJvdW5kYXJpZXNcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50V2lkdGggPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gd2luZG93RWxlbWVudC5jdXJyZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IG1pblggPSAtZWxlbWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGNvbnN0IG1pblkgPSAwO1xuICAgICAgICAgICAgY29uc3QgbWF4WCA9IHdpbmRvd1dpZHRoIC0gZWxlbWVudFdpZHRoICsgZWxlbWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGNvbnN0IG1heFkgPSB3aW5kb3dIZWlnaHQgLSBlbGVtZW50SGVpZ2h0ICsgZWxlbWVudEhlaWdodCAvIDEuNTtcbiAgICAgICAgICAgIGNvbnN0IGNsYW1wZWRYID0gTWF0aC5tYXgobWluWCwgTWF0aC5taW4obmV3WCwgbWF4WCkpO1xuICAgICAgICAgICAgY29uc3QgY2xhbXBlZFkgPSBNYXRoLm1heChtaW5ZLCBNYXRoLm1pbihuZXdZLCBtYXhZKSk7XG4gICAgICAgICAgICAvLyBPbmx5IHVwZGF0ZSB0aGUgcG9zaXRpb24gaWYgaXQncyB3aXRoaW4gdGhlIGJvdW5kYXJpZXNcbiAgICAgICAgICAgIC8vIG5ld1ggPj0gbWluWCAmJiBuZXdYIDw9IG1heFggJiYgbmV3WSA+PSBtaW5ZICYmIG5ld1kgPD0gbWF4WVxuICAgICAgICAgICAgaWYgKHRydWUpIHtcbiAgICAgICAgICAgICAgICAvLyBzZXRQb3NpdGlvbih7IHg6IGNsYW1wZWRYLCB5OiBjbGFtcGVkWSB9KTtcbiAgICAgICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuc3R5bGUubGVmdCA9IGAke2NsYW1wZWRYfXB4YDtcbiAgICAgICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuc3R5bGUudG9wID0gYCR7Y2xhbXBlZFl9cHhgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5YWD57Sg5Yiw6L6+6L6555WMXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgcmVjdCA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBvZmZzZXRYID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBvZmZzZXRZID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICAgICAgICAgIC8vIHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFggPSBTdHJpbmcob2Zmc2V0WCk7XG4gICAgICAgICAgICAgICAgLy8gd2luZG93RWxlbWVudC5jdXJyZW50LmRhdGFzZXQub2Zmc2V0WSA9IFN0cmluZyhvZmZzZXRZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlTW91c2VVcCA9ICgpID0+IHtcbiAgICAgICAgLy8gLy8gY29uc29sZS5sb2coJ1BvcHVwQ2FyZDpoYW5kbGVNb3VzZVVwJyk7XG4gICAgICAgIHNldERyYWdnaW5nKGZhbHNlKTtcbiAgICB9O1xuICAgIC8vIC8vIOa3u+WKoOWIsCBBbmtpXG4gICAgLy8gY29uc3QgYWRkVG9BbmtpID0gKGRlY2tOYW1lOiBzdHJpbmcsIG1vZGVsTmFtZTogc3RyaW5nLCBmcm9udDogc3RyaW5nLCBiYWNrOiBzdHJpbmcpID0+IHtcbiAgICAvLyAgIGNvbnN0IGtleVdvcmQgPSBwcm9wcy5kYXRhLmtleVdvcmRcbiAgICAvLyAgIGNvbnN0IFNlbnRlbmNlID0gcHJvcHMuZGF0YS5TZW50ZW5jZVxuICAgIC8vICAgbGV0IGNvbnRhaW5lciA9ICcnXG4gICAgLy8gICBsZXQgaW1hZ2VzID0gJydcbiAgICAvLyAgIGxldCB1bnNwbGFzaF9kb3dubG9hZF9sb2NhdGlvblxuICAgIC8vICAgbGV0IHN0YyA9IGtleVdvcmQubGVuZ3RoIDw9IDIwID8gU2VudGVuY2UgOiAnJ1xuICAgIC8vICAgLy8g6L2s56e7IEhUTUwg5qCH562+77yM5oyJ54Wn5pmu6YCa5a2X56ym5Liy5aSE55CGXG4gICAgLy8gICBzdGMgPSBzdGMucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIik7XG4gICAgLy8gICAvLyDlnKjor63looPlj6XlrZDkuK3lsIblhbPplK7lrZfnqoHlh7rmmL7npLpcbiAgICAvLyAgIHN0YyA9IHN0Yy5yZXBsYWNlKG5ldyBSZWdFeHAoa2V5V29yZCwgJ2cnKSwgJzxzcGFuIGNsYXNzPVwia2V5V29yZFwiPicgKyBrZXlXb3JkICsgJzwvc3Bhbj4nKTtcbiAgICAvLyAgIGxldCBTY291dGVyU2VsZWN0aW9uID0gJydcbiAgICAvLyAgIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAvLyAgICAgLy8g6YCJ5Lit55qE5paH5a2XXG4gICAgLy8gICAgIFNjb3V0ZXJTZWxlY3Rpb24gPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3IoJyNTY291dGVyU2VsZWN0aW9uJyk/LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzcGFuJylbMF0uaW5uZXJIVE1MIVxuICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyh3aW5kb3dFbGVtZW50LmN1cnJlbnQpO1xuICAgIC8vICAgICBjb250YWluZXIgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuaW5uZXJIVE1MXG4gICAgLy8gICAgIGNvbnRhaW5lciA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZXNzYWdlcycpWzBdLmlubmVySFRNTFxuICAgIC8vICAgICAvLyDlpITnkIYgY29udGFpbmVyIOeahOWGheWuuVxuICAgIC8vICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgIC8vICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhjb250YWluZXIsICd0ZXh0L2h0bWwnKTtcbiAgICAvLyAgICAgbGV0IGVsZW1lbnRzVG9SZW1vdmUgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnLmltYWdlUXVldWUnKTtcbiAgICAvLyAgICAgbGV0IGltYWdlU291cmNlID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbWFnZVNvdXJjZScpO1xuICAgIC8vICAgICAvLyDliJvlu7rmlrDnmoQgaW1nIOagh+etvlxuICAgIC8vICAgICAvLyDorr7nva7lm77niYfnmoTlsLrlr7jjgIHmoLflvI9cbiAgICAvLyAgICAgaWYgKGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZUJveCcpLmxlbmd0aCA+IDApIHtcbiAgICAvLyAgICAgICBsZXQgaW1nID0gZG9jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlQm94JylbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgLy8gICAgICAgaW1nLndpZHRoID0gMFxuICAgIC8vICAgICAgIGNvbnN0IGltZ1VybCA9IGltZy5zcmM7XG4gICAgLy8gICAgICAgbGV0IG5ld0ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgLy8gICAgICAgbmV3SW1nLnNyYyA9IGltZ1VybDtcbiAgICAvLyAgICAgICAvLyDojrflj5bopoHmm7/mjaLnmoQgZGl2XG4gICAgLy8gICAgICAgbGV0IGRpdiA9IGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZUJveCcpWzBdO1xuICAgIC8vICAgICAgIGlmIChkaXYpIHtcbiAgICAvLyAgICAgICAgIC8vIOS9v+eUqOaWsOeahCBpbWcg5qCH562+5pu/5o2iIGRpdlxuICAgIC8vICAgICAgICAgZGl2LnBhcmVudE5vZGU/LnJlcGxhY2VDaGlsZChuZXdJbWcsIGRpdik7XG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgIC8vIOayoeacieWbvueJh1xuICAgIC8vICAgICAgIGNvbnN0IGltZ3MgPSBkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzJylbMF1cbiAgICAvLyAgICAgICBpZiAoaW1ncykge1xuICAgIC8vICAgICAgICAgaW1ncy5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChpbWdzKVxuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vICAgICAvLyDliKDpmaTpooTliqDovb3nmoTlm77niYdcbiAgICAvLyAgICAgZWxlbWVudHNUb1JlbW92ZS5mb3JFYWNoKGVsID0+IGVsLnBhcmVudE5vZGU/LnJlbW92ZUNoaWxkKGVsKSk7XG4gICAgLy8gICAgIC8vIOWIoOmZpOWbvueJh+adpea6kOS/oeaBr1xuICAgIC8vICAgICBpbWFnZVNvdXJjZS5mb3JFYWNoKGVsID0+IGVsLnBhcmVudE5vZGU/LnJlbW92ZUNoaWxkKGVsKSk7XG4gICAgLy8gICAgIGNvbnRhaW5lciA9IGRvYy5ib2R5LmlubmVySFRNTDtcbiAgICAvLyAgICAgLy8g5aSE55CG5qC35byP77yM6YG/5YWNIEFua2kg5YaF5pi+56S65byC5bi4XG4gICAgLy8gICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lci5yZXBsYWNlKC9zdHlsZT0vZywgJycpO1xuICAgIC8vICAgICBpZiAod2luZG93RWxlbWVudC5jdXJyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlQm94JylbMF0gIT09IHVuZGVmaW5lZCkge1xuICAgIC8vICAgICAgIGltYWdlcyA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZUJveCcpWzBdLmlubmVySFRNTFxuICAgIC8vICAgICAgIC8vIOiOt+WPliB1bnNwbGFzaEFwaSDnmoQgZG93bmxvYWRfbG9jYXRpb25cbiAgICAvLyAgICAgICB1bnNwbGFzaF9kb3dubG9hZF9sb2NhdGlvbiA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXMnKVswXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0ucGFyZW50RWxlbWVudD8uZ2V0QXR0cmlidXRlKCdkYXRhLWRvd25sb2FkbG9jYXRpb24nKVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKGltYWdlcyk7XG4gICAgLy8gICAgIC8vIOWkhOeQhuagt+W8j++8jOmBv+WFjSBBbmtpIOWGheaYvuekuuW8guW4uFxuICAgIC8vICAgICBpbWFnZXMgPSBpbWFnZXMucmVwbGFjZSgvc3R5bGU9L2dpLCAnJyk7XG4gICAgLy8gICAgIGltYWdlcyA9IGltYWdlcy5yZXBsYWNlKC93aWR0aC9naSwgJycpO1xuICAgIC8vICAgfVxuICAgIC8vICAgY29uc3QgY2FyZFN0eWxlID0gYGBcbiAgICAvLyAgIC8vIOivt+axgiBiYWNrZ3JvdW5kIOWwhuaVsOaNruS/neWtmOWIsCBBbmtpXG4gICAgLy8gICAvLyDljZXor43lj5Hpn7NcbiAgICAvLyAgIGludGVyZmFjZSBMYW5nT2JqZWN0IHtcbiAgICAvLyAgICAgW2tleTogc3RyaW5nXTogbGFuZ1R5cGU7XG4gICAgLy8gICB9XG4gICAgLy8gICBjb25zdCB0aGlzTGFuZzogTGFuZ09iamVjdCA9IGxhbmdcbiAgICAvLyAgIGxldCBhdWRpb1VybDogc3RyaW5nID0gJ2h0dHA6Ly9kaWN0LnlvdWRhby5jb20vZGljdHZvaWNlP3R5cGU9MCZhdWRpbz0nXG4gICAgLy8gICBsZXQgYXVkaW86IFtdIHwgW3t9XSwgZmlsZW5hbWVcbiAgICAvLyAgIHRyeSB7XG4gICAgLy8gICAgIGF1ZGlvVXJsID0gdGhpc0xhbmdbTGFuZ1sndGFyZ2V0J11bJ2lkJ11dWydhdWRpb1VSTCddXG4gICAgLy8gICAgIC8vIGZpbGVuYW1lID0gRGF0ZS5ub3coKS50b1N0cmluZygpXG4gICAgLy8gICAgIGZpbGVuYW1lID0gJydcbiAgICAvLyAgICAgYXVkaW8gPSBbe1xuICAgIC8vICAgICAgIFwidXJsXCI6IGF1ZGlvVXJsICsga2V5V29yZCxcbiAgICAvLyAgICAgICBcImZpbGVuYW1lXCI6IFwiU2NvdXRlclwiICsgZmlsZW5hbWUgKyBcIi5tcDNcIixcbiAgICAvLyAgICAgICBcImZpZWxkc1wiOiBbXG4gICAgLy8gICAgICAgICBcIkZyb250XCJcbiAgICAvLyAgICAgICBdXG4gICAgLy8gICAgIH1dXG4gICAgLy8gICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vICAgICBhdWRpbyA9IFtdXG4gICAgLy8gICB9XG4gICAgLy8gICAvLyDluLjop4TnsbvlnotcbiAgICAvLyAgIGxldCBhbmtpQmFjayA9ICc8cD4gPGJsb2NrcXVvdGU+JyArIHN0YyArICcg4oCU4oCUIDxhIGhyZWY9XCInICsgd2luZG93LmxvY2F0aW9uLmhyZWYgKyAnXCI+U291cmNlPC9hPjwvYmxvY2txdW90ZT48L3A+JyArIGNvbnRhaW5lclxuICAgIC8vICAgaWYgKGtleVdvcmQubGVuZ3RoID4gMjApIHtcbiAgICAvLyAgICAgLy8g5aaC5p6c6YCJ5Lit55qE56ym5Y+36ZW/5bqm5aSn5LqOIDIw77yI6K+05piO5piv5Y+l5a2Q77yJ5YiZ5LiN5pi+56S65LiK5LiL5paH5Y+l5a2Q77yM54S25ZCO5bCG5p2l5rqQ6ZO+5o6l5pS+5Yiw5bC+6YOoXG4gICAgLy8gICAgIGFua2lCYWNrID0gY29udGFpbmVyICsgJzxwPjxhIGhyZWY9XCInICsgd2luZG93LmxvY2F0aW9uLmhyZWYgKyAnXCI+U291cmNlPC9hPjwvcD4nXG4gICAgLy8gICB9XG4gICAgLy8gICBsZXQgcCA9IHtcbiAgICAvLyAgICAgXCJub3RlXCI6IHtcbiAgICAvLyAgICAgICBcImRlY2tOYW1lXCI6IGRlY2tOYW1lLFxuICAgIC8vICAgICAgIFwibW9kZWxOYW1lXCI6IG1vZGVsTmFtZSxcbiAgICAvLyAgICAgICBcImZpZWxkc1wiOiB7XG4gICAgLy8gICAgICAgICBbZnJvbnRdOiBrZXlXb3JkLFxuICAgIC8vICAgICAgICAgW2JhY2tdOiBjYXJkU3R5bGUgKyBhbmtpQmFja1xuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgICAgXCJhdWRpb1wiOiBhdWRpbyxcbiAgICAvLyAgICAgICBcInRhZ3NcIjogW1xuICAgIC8vICAgICAgICAgXCJTY291dGVyXCJcbiAgICAvLyAgICAgICBdXG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH1cbiAgICAvLyAgIC8vIOWujOW9ouWhq+epuuexu+Wei1xuICAgIC8vICAgaWYgKFNjb3V0ZXJTZWxlY3Rpb24uaW5kZXhPZignY2xhc3M9XCJhbmtpU3BhY2VcIicpID49IDAgfHwgY29udGFpbmVyLmluZGV4T2YoJ2NsYXNzPVwiYW5raVNwYWNlXCInKSA+PSAwIHx8IGNvbnRhaW5lci5pbmRleE9mKCd7e2MnKSA+PSAwKSB7XG4gICAgLy8gICAgIGxldCBuZXdGcm9udDogc3RyaW5nXG4gICAgLy8gICAgIG5ld0Zyb250ID0gJzxwPicgKyBTY291dGVyU2VsZWN0aW9uICsgJzwvcD4nICsgJzxibG9ja3F1b3RlPicgKyBzdGMgKyAnIOKAlOKAlCA8YSBocmVmPVwiJyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgJ1wiPlNvdXJjZTwvYT48L2Jsb2NrcXVvdGU+JyArIGNvbnRhaW5lclxuICAgIC8vICAgICBpZiAoa2V5V29yZC5sZW5ndGggPiAyMCkge1xuICAgIC8vICAgICAgIC8vIOWmguaenOmAieS4reeahOespuWPt+mVv+W6puWkp+S6jiAyMO+8iOivtOaYjuaYr+WPpeWtkO+8ieWImeS4jeaYvuekuuS4iuS4i+aWh+WPpeWtkO+8jOeEtuWQjuWwhuadpea6kOmTvuaOpeaUvuWIsOWwvumDqFxuICAgIC8vICAgICAgIG5ld0Zyb250ID0gJzxwPicgKyBTY291dGVyU2VsZWN0aW9uICsgJzwvcD4nICsgY29udGFpbmVyICsgJzxwPiA8YSBocmVmPVwiJyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgJ1wiPlNvdXJjZTwvYT48L3A+J1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHAgPSB7XG4gICAgLy8gICAgICAgXCJub3RlXCI6IHtcbiAgICAvLyAgICAgICAgIFwiZGVja05hbWVcIjogZGVja05hbWUsXG4gICAgLy8gICAgICAgICBcIm1vZGVsTmFtZVwiOiBtb2RlbE5hbWUsXG4gICAgLy8gICAgICAgICBcImZpZWxkc1wiOiB7XG4gICAgLy8gICAgICAgICAgIFtmcm9udF06IG5ld0Zyb250LFxuICAgIC8vICAgICAgICAgICBbYmFja106ICcnXG4gICAgLy8gICAgICAgICB9LFxuICAgIC8vICAgICAgICAgXCJhdWRpb1wiOiBbXSxcbiAgICAvLyAgICAgICAgIFwidGFnc1wiOiBbXG4gICAgLy8gICAgICAgICAgIFwiU2NvdXRlclwiXG4gICAgLy8gICAgICAgICBdXG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy8gICAvLyDlj5HpgIHmtojmga/nu5kgYmFja2dyb3VuZFxuICAgIC8vICAgbGV0IHNlbmRpbmcgPSBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhZGROb3RlJywgJ21lc3NhZ2VzJzogeyAnYW5raV9hcmd1bWVudHMnOiBwLCAnYW5raV9hY3Rpb25fdHlwZSc6ICdhZGROb3RlJywgJ3Vuc3BsYXNoX2Rvd25sb2FkX2xvY2F0aW9uJzogdW5zcGxhc2hfZG93bmxvYWRfbG9jYXRpb24gfSwgfSlcbiAgICAvLyAgIHNlbmRpbmcudGhlbihoYW5kbGVSZXNwb25zZSwgaGFuZGxlRXJyb3IpO1xuICAgIC8vICAgLy8g5pWw5o2u5Z+L54K5XG4gICAgLy8gICAvLyBhbXBsaXR1ZGUudHJhY2soJ2FkZFRvQW5raScpO1xuICAgIC8vICAgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdhZGRUb0Fua2knIH0pXG4gICAgLy8gfVxuICAgIC8vIC8vIOeCueWHu+S/neWtmOWIsCBBbmtpXG4gICAgLy8gY29uc3QgaGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrID0gKGRlY2s/OiBzdHJpbmcpID0+IHtcbiAgICAvLyAgIC8vIOagueaNruaYr+WQpuS4uuWujOW9ouWhq+epuueUs+ivt+S4jeWQjOeahOWNoeeJh+aooeadv1xuICAgIC8vICAgY29uc3QgY29udGFpbmVyID0gd2luZG93RWxlbWVudC5jdXJyZW50Py5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZXNzYWdlcycpWzBdLmlubmVySFRNTCFcbiAgICAvLyAgIGNvbnN0IHNlbGVjdGlvblRleHQgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3IoJyNTY291dGVyU2VsZWN0aW9uJyk/LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzcGFuJylbMF0uaW5uZXJIVE1MIVxuICAgIC8vICAgbGV0IGlzQW5raVNwYWNlID0gZmFsc2VcbiAgICAvLyAgIGlmIChjb250YWluZXIgfHwgc2VsZWN0aW9uVGV4dCkge1xuICAgIC8vICAgICBpZiAoY29udGFpbmVyLmluZGV4T2YoJ2NsYXNzPVwiYW5raVNwYWNlXCInKSA+PSAwIHx8IGNvbnRhaW5lci5pbmRleE9mKCd7e2MnKSA+PSAwIHx8IHNlbGVjdGlvblRleHQuaW5kZXhPZignY2xhc3M9XCJhbmtpU3BhY2UnKSA+PSAwKSB7XG4gICAgLy8gICAgICAgaXNBbmtpU3BhY2UgPSB0cnVlXG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH1cbiAgICAvLyAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbG9hZGluZycsICdub3RlSWQnOiAwIH0pXG4gICAgLy8gICBmdW5jdGlvbiBzZXRBbmtpSW5mbyhhbmtpSW5mbzogQW5raUluZm9UeXBlKSB7XG4gICAgLy8gICAgIGNvbnN0IG1vZGVscyA9IGFua2lJbmZvLm1vZGVsc1xuICAgIC8vICAgICBsZXQgbW9kZWxOYW1lOiBzdHJpbmcgPSAnJywgZmllbGQxOiBzdHJpbmcgPSAnJywgZmllbGQyOiBzdHJpbmcgPSAnJ1xuICAgIC8vICAgICBtb2RlbHMuZm9yRWFjaCgobW9kZWw6IGFueSkgPT4ge1xuICAgIC8vICAgICAgIGlmIChtb2RlbC5pc0Fua2lTcGFjZSA9PT0gaXNBbmtpU3BhY2UpIHtcbiAgICAvLyAgICAgICAgIG1vZGVsTmFtZSA9IG1vZGVsLm1vZGVsTmFtZVxuICAgIC8vICAgICAgICAgZmllbGQxID0gbW9kZWwuZmllbGQxXG4gICAgLy8gICAgICAgICBmaWVsZDIgPSBtb2RlbC5maWVsZDJcbiAgICAvLyAgICAgICB9XG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgICByZXR1cm4ge1xuICAgIC8vICAgICAgICdtb2RlbE5hbWUnOiBtb2RlbE5hbWUsXG4gICAgLy8gICAgICAgJ2ZpZWxkMSc6IGZpZWxkMSxcbiAgICAvLyAgICAgICAnZmllbGQyJzogZmllbGQyXG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH1cbiAgICAvLyAgIGlmICh1c2VySW5mbz8uYW5raSkge1xuICAgIC8vICAgICBjb25zdCB0aGlzRGVjayA9IGRlY2sgPyBkZWNrIDogdXNlckluZm8/LmFua2kuZGVmYXVsdERlY2tOYW1lXG4gICAgLy8gICAgIGNvbnN0IGFua2lJbmZvID0gc2V0QW5raUluZm8odXNlckluZm8/LmFua2kpXG4gICAgLy8gICAgIC8vIOa3u+WKoOWIsCBBbmtpIOS4rVxuICAgIC8vICAgICBhZGRUb0Fua2kodGhpc0RlY2ssIGFua2lJbmZvLm1vZGVsTmFtZSEsIGFua2lJbmZvLmZpZWxkMSEsIGFua2lJbmZvLmZpZWxkMiEpXG4gICAgLy8gICB9IGVsc2Uge1xuICAgIC8vICAgICAvLyDojrflj5YgQW5raSDniYznu4Tkv6Hmga9cbiAgICAvLyAgICAgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnc2V0TW9kZWwnLCAnbWVzc2FnZXMnOiB7fSwgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgLy8gICAgICAgaWYgKHJlc3VsdC5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xuICAgIC8vICAgICAgICAgY29uc3QgYW5raUluZm8gPSBzZXRBbmtpSW5mbyhyZXN1bHQuZGF0YSlcbiAgICAvLyAgICAgICAgIGNvbnN0IHRoaXNEZWNrID0gZGVjayA/IGRlY2sgOiB1c2VySW5mbz8uYW5raS5kZWZhdWx0RGVja05hbWVcbiAgICAvLyAgICAgICAgIC8vIOa3u+WKoOWIsCBBbmtpIOS4rVxuICAgIC8vICAgICAgICAgYWRkVG9BbmtpKHRoaXNEZWNrISwgYW5raUluZm8ubW9kZWxOYW1lISwgYW5raUluZm8uZmllbGQxISwgYW5raUluZm8uZmllbGQyISlcbiAgICAvLyAgICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgLy8g5Y+N6aaI6ZSZ6K+v5L+h5oGvXG4gICAgLy8gICAgICAgICBhbGVydChyZXN1bHQuZXJyb3IuZXJyb3IpXG4gICAgLy8gICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pXG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICB9KVxuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvLyBHUFQg55Sf5oiQ5raI5oGv5pe277yM6Ieq5Yqo5a6a5L2N5Yiw5raI5oGv5YiX6KGo5bqV6YOo77yM5pa55L6/55So5oi36ZiF6K+7XG4gICAgZnVuY3Rpb24gc2Nyb2xsVG9Cb3R0b20oY2FuU3JvbGwgPSBmYWxzZSkge1xuICAgICAgICBpZiAod2luZG93RWxlbWVudC5jdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRhaW5lcicpWzBdO1xuICAgICAgICAgICAgaWYgKGNhblNyb2xsKSB7XG4gICAgICAgICAgICAgICAgLy8g5L2N5LqO5bqV6YOo77yM6ZyA6KaB6Ieq5Yqo5rua5YqoXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnNjcm9sbFRvcCA9IGNvbnRhaW5lci5zY3JvbGxIZWlnaHQgKyAyMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSA9IChkYXRhKSA9PiB7XG4gICAgICAgIC8vIOW8gOWQr+aIluWFs+mXreiHquWumuS5iSBQcm9tcHQg6KGo5Y2VXG4gICAgICAgIHNldFBvcG92ZXJPcGVuKGRhdGEuaXNPcGVuKTtcbiAgICAgICAgLy8g6K6+572u6KGo5Y2V55qE6buY6K6k6K6+572uXG4gICAgICAgIGlmIChkYXRhLmlzT3Blbikge1xuICAgICAgICAgICAgc2V0Q3VzdG9tUHJvbXB0Rm9ybURhdGEoZGF0YS5kYXRhKTtcbiAgICAgICAgICAgIC8vIOW8gOWQr+ihqOWNlVxuICAgICAgICAgICAgLy8gYW1wbGl0dWRlLnRyYWNrKCdvcGVuQ3VzdG9tUHJvbXB0Rm9ybScpO1xuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdvcGVuQ3VzdG9tUHJvbXB0Rm9ybScgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5byA5ZCv6KGo5Y2V5ZCO56aB5q2i54K55Ye756qX5Y+j5aSW5Yy65Z+f5YWz6Zet56qX5Y+jXG4gICAgICAgICgwLCBjb250ZW50U2NyaXB0XzEuc2V0RG9ub3RDbG9zZVBvcHVwQ2FyZCkoZGF0YS5pc09wZW4pO1xuICAgIH07XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFNjb3V0ZXJEaXYsIHsgaWQ6IFwiTGVhcm5pbmdFbmdsaXNoMjAyM1wiLCByZWY6IHdpbmRvd0VsZW1lbnQsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgbGVmdDogMTAsXG4gICAgICAgICAgICAgICAgdG9wOiAxMCxcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Db25maWdQcm92aWRlciwgeyB0aGVtZToge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JQcmltYXJ5OiAnI0YwOEEyNCcsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE5hdl8xLk5hdlxuICAgICAgICAgICAgICAgIC8vIGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljaz17aGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrfVxuICAgICAgICAgICAgICAgICwgeyBcbiAgICAgICAgICAgICAgICAgICAgLy8gaGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrPXtoYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgIGFkZFRvQW5raVN0YXR1czogYWRkVG9BbmtpU3RhdHVzLCBvbk1vdXNlRG93bjogaGFuZGxlTW91c2VEb3duLCBoYW5kbGVNZW51SXRlbUNsaWNrOiBleGVjdXRpdmVQcm9tcHQsIG9wZW5DdXN0b21Qcm9tcHRGb3JtOiBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSwgaXNPcGVuTWVudTogaXNPcGVuTWVudSwgcHJvbXB0czogcHJvbXB0cywgbGFzdEV4ZWN1dGVkUHJvbXB0OiBsYXN0RXhlY3V0ZWRQcm9tcHQsIGtleVdvcmQ6IHByb3BzLmRhdGEua2V5V29yZCwgU2VudGVuY2U6IHByb3BzLmRhdGEuU2VudGVuY2UsIHdpbmRvd0VsZW1lbnQ6IHdpbmRvd0VsZW1lbnQuY3VycmVudCB9KSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2NvbnRhaW5lciBmbGV4LWdyb3cgZmxleCBmbGV4LWNvbCBvdmVyZmxvdy1hdXRvJywgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJzQ4cHgnXG4gICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdmbGV4LWdyb3cnLCByZWY6IG1lc3NhZ2VzTGlzdCwgc3R5bGU6IHt9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChTZWxlY3Rpb25fMS5TZWxlY3Rpb24sIHsgdGV4dDogcHJvcHMuZGF0YS5rZXlXb3JkIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoTWVzc2FnZV8xLk1lc3NhZ2VzTGlzdCwgeyBtZXNzYWdlczogbWVzc2FnZXMgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlcy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1lc3NhZ2VzW21lc3NhZ2VzLmxlbmd0aCAtIDFdLnByb21wdCA9PT0gJycgPyAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChSZWdlbmVyYXRlQnV0dG9uXzEuUmVnZW5lcmF0ZUJ1dHRvbiwgeyBtZXNzYWdlczogbWVzc2FnZXMsIGhhbmRsZVJlZ2VuZXJhdGVCdXR0b25DbGljazogaGFuZGxlUmVnZW5lcmF0ZUJ1dHRvbkNsaWNrIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnZm9sbG93VXBNZW51Qm94Jywgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogc2hvd0ZvbGxvd1VwRGF0YU1lbnUuc2hvdyA/ICdibG9jaycgOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnZml0LWNvbnRlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChQcm9tcHRMaXN0XzEuUHJvbXB0TGlzdCwgeyBmb2xsb3dVcERhdGE6IGZvbGxvd1VwRGF0YSwgc2hvd0ZvbGxvd1VwRGF0YU1lbnU6IHNob3dGb2xsb3dVcERhdGFNZW51LCBwcm9tcHRMaXN0OiBwcm9tcHRzLCBoYW5kbGVNZW51SXRlbUNsaWNrOiBleGVjdXRpdmVQcm9tcHQgfSkpKSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoVXNlck1lc3NhZ2VJbnB1dF8xLlVzZXJNZXNzYWdlSW5wdXQsIHsgbWVzc2FnZXM6IG1lc3NhZ2VzLCBoYW5kbGVTZW5kTWVzc2FnZTogaGFuZGxlU2VuZE1lc3NhZ2UgfSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkRyYXdlciwgeyB0aXRsZTogY3VzdG9tUHJvbXB0Rm9ybURhdGEuaWQgPT09ICcnID8gXCJDcmVhdGUgUHJvbXB0XCIgOiBcIkVkaXQgUHJvbXB0XCIsIHBsYWNlbWVudDogXCJib3R0b21cIiwgY2xvc2FibGU6IGZhbHNlLCBoZWlnaHQ6ICcxMDAlJywgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogaXNQb3BvdmVyT3BlbiwgZ2V0Q29udGFpbmVyOiBmYWxzZSwgZXh0cmE6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5TcGFjZSwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7IHpJbmRleDogJzknIH0sIG9uQ2xpY2s6ICgpID0+IG9wZW5DdXN0b21Qcm9tcHRGb3JtKHsgaXNPcGVuOiBmYWxzZSwgZGF0YTogeyAndGl0bGUnOiAnJywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZmFsc2UsICd1c2VyUHJvbXB0JzogJycsICdpZCc6ICcnIH0gfSkgfSwgXCJDYW5jZWxcIikpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJhY2tncm91bmRDb2xvcjogJ3JlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICc2NHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAnYWxsLXNjcm9sbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBvbk1vdXNlRG93bjogaGFuZGxlTW91c2VEb3duIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoQ3VzdG9tUHJvbXB0Rm9ybV8xLkN1c3RvbVByb21wdEZvcm0sIHsgb3BlbkN1c3RvbVByb21wdEZvcm06IG9wZW5DdXN0b21Qcm9tcHRGb3JtLCBoYW5kbGVQcm9tcHRFZGl0ZWQ6IGhhbmRsZVByb21wdEVkaXRlZCwgZGF0YTogY3VzdG9tUHJvbXB0Rm9ybURhdGEgfSkpKSkpKSk7XG59XG5leHBvcnRzLlBvcHVwQ2FyZCA9IFBvcHVwQ2FyZDtcbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5wb3B1cENhcmRTdHlsZSA9IHZvaWQgMDtcbmV4cG9ydHMucG9wdXBDYXJkU3R5bGUgPSBgXG4uc2xpY2stYXJyb3c6OmJlZm9yZXtcbiAgY29udGVudDpcIlwiICFpbXBvcnRhbnQ7XG59XG5cbi5hbmtpU3BhY2Uge1xuICBjb2xvcjojRjA4QTI0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hbmtpU3BhY2U6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiNGMDhBMjQ7XG4gIGNvbG9yOiNmZmZmZmY7XG59XG5cbi5jb250ZXh0Qm94LC5mb2xsb3dVcE1lbnUge1xuICBkaXNwbGF5OiBmbGV4O1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gIHBhZGRpbmc6IDRweCA4cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBib3gtc2hhZG93OiAwcHggOHB4IDI4cHggcmdiYSgwLDAsMCwuMTYpO1xuICB6LWluZGV4Ojk7XG5cbn1cblxuLmNvbnRleHRCb3gge1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4vLyAuY29udGV4dEJveCAqIHtcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xuLy8gICBwYWRkaW5nOiAycHg7XG4vLyB9XG5cbi8vIC5hbmtpU3BhY2VCdXR0b25Cb3gge1xuLy8gICBkaXNwbGF5OiBmbGV4O1xuLy8gICBmbGV4LWRpcmVjdGlvbjogcm93O1xuLy8gICBtYXJnaW4tcmlnaHQ6IDhweDtcbi8vICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMTIpO1xuLy8gICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xuLy8gfVxuXG4vLyAuc2V0QW5raVNwYWNlQnV0dG9uOmZpcnN0LW9mLXR5cGUge1xuLy8gICBtYXJnaW4tcmlnaHQ6OHB4O1xuLy8gfVxuXG4vLyAubG9va1VwQnV0dG9uIHtcbi8vICAgd2lkdGg6IDE4cHg7XG4vLyAgIGhlaWdodDogMThweDtcbi8vICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuLy8gICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuLy8gICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4vLyB9XG5cbi8vIC5hbmtpU3BhY2VCdXR0b25Cb3ggKjpob3ZlciB7XG4gIFxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCw1OSwwLjA1MSk7XG4vLyAgIGJvcmRlci1yYWRpdXM6IDJweDtcblxuLy8gfVxuXG4uYW50LWNhcm91c2VsIC5zbGljay1wcmV2LFxuLmFudC1jYXJvdXNlbCAuc2xpY2stbmV4dCxcbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLXByZXY6aG92ZXIsXG4uYW50LWNhcm91c2VsIC5zbGljay1uZXh0OmhvdmVyIHtcbiAgZm9udC1zaXplOiBpbmhlcml0O1xuICBjb2xvcjogY3VycmVudENvbG9yO1xufVxuXG4uYW50LWNhcm91c2VsIC5zbGljay1wcmV2LFxuLmFudC1jYXJvdXNlbCAuc2xpY2stcHJldjpob3ZlciB7XG4gIGxlZnQ6IDEwcHg7XG4gIHotaW5kZXg6IDI7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmFudC1jYXJvdXNlbCAuc2xpY2stbmV4dCxcbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLW5leHQ6aG92ZXIge1xuICByaWdodDogMTBweDtcbiAgei1pbmRleDogMjtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uaW1hZ2VzIGltZyB7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG59XG5cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDEsI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDIsI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDN7XG4gIG1hcmdpbjogMTBweCAwO1xufVxuXG4vLyAjTGVhcm5pbmdFbmdsaXNoMjAyMyBoMXtcbi8vICAgZm9udC1zaXplOjIwcHg7XG4vLyB9XG4vLyAjTGVhcm5pbmdFbmdsaXNoMjAyMyBoMntcbi8vICAgZm9udC1zaXplOjE3cHg7XG4vLyB9XG5cbi8vICNMZWFybmluZ0VuZ2xpc2gyMDIzIHtcbi8vIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xuLy8gd2lkdGg6IDM5MHB4O1xuLy8gaGVpZ2h0OiA1NjBweDtcbi8vIGNvbG9yOiByZ2IoMCAwIDAgLyA4MCUpO1xuLy8gcG9zaXRpb246IGZpeGVkO1xuLy8gZGlzcGxheTogZmxleDtcbi8vIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4vLyBmb250LXNpemU6IDEzLjJweDtcbi8vIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4vLyB6LWluZGV4OiA5OTk5O1xuLy8gb3ZlcmZsb3c6IGhpZGRlbjtcbi8vIGJveC1zaGFkb3c6IDBweCA4cHggMjhweCByZ2JhKDAsMCwwLC4xNik7XG4vLyBib3JkZXItcmFkaXVzOiA2cHg7XG4vLyBib3JkZXI6MXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KVxuLy8gfVxuXG46OnNlbGVjdGlvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkQ1QjI7XG59XG5cbjo6LW1vei1zZWxlY3Rpb24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZENUIyO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAuY29udGFpbmVyOjotd2Via2l0LXNjcm9sbGJhciAge1xuICAvLyB3aWR0aDowcHg7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5jb250YWluZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrICB7XG4gIC8vIGJhY2tncm91bmQ6ICNmZmY7IC8qIOiuvue9rua7muWKqOadoei9qOmBk+iDjOaZr+iJsiAqL1xufVxuXG4vLyAjTGVhcm5pbmdFbmdsaXNoMjAyMyAuY29udGFpbmVyOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4vLyAgIGJhY2tncm91bmQ6ICM4ODg7IC8qIOiuvue9rua7muWKqOadoea7keWdl+iDjOaZr+iJsiAqL1xuLy8gfVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAuRHJvcGRvd25NZW51SXRlbTpob3ZlciB7XG4gIFxuICBiYWNrZ3JvdW5kLWNvbG9yOiNGNkY2RjY7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5Ecm9wZG93bk1lbnVJdGVtOmZvY3VzLXZpc2libGUge1xuICBvdXRsaW5lOiBub25lO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyBoMSwjTGVhcm5pbmdFbmdsaXNoMjAyMyBoMiwjTGVhcm5pbmdFbmdsaXNoMjAyMyBoMyB7XG5cbiAgY29sb3I6IHJnYmEoMCwgMCwgMCk7XG5cbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgI1Njb3V0ZXJTZWxlY3Rpb24sICNMZWFybmluZ0VuZ2xpc2gyMDIzIC5tZXNzYWdlcz5kaXYgIHtcbiAgcGFkZGluZy1sZWZ0OjE4cHg7XG4gIHBhZGRpbmctcmlnaHQ6MThweDtcbn1cblxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAudXNlcklucHV0IHtcbm1hcmdpbjogMTBweCAwO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAuY29udGVudEJveCB7XG5vdmVyZmxvdzogc2Nyb2xsO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAubWVzc2FnZXMgPiAqID4gKiB7XG4gIC8vIG1hcmdpbjogMThweCAwO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAjU2NvdXRlck5hdiB7XG4vLyBkaXNwbGF5OiBmbGV4O1xuLy8ganVzdGlmeS1jb250ZW50OiBzdGFydDtcbi8vIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4vLyBwYWRkaW5nLXRvcDogMTJweDtcbi8vIHBhZGRpbmctYm90dG9tOiAxMnB4O1xuLy8gYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KTtcbi8vIHVzZXItc2VsZWN0OiBub25lO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAjU2NvdXRlck5hdiBpbWcge1xuLy8gd2lkdGg6IGF1dG87XG4vLyBoZWlnaHQ6IDI0cHg7XG4vLyBtYXJnaW4tcmlnaHQ6IDZweDtcbn1cblxuLm1lc3NhZ2VzIHVse1xuICBsaXN0LXN0eWxlOmRpc2M7XG4gIHBhZGRpbmctbGVmdDogMjBweDtcbn1cblxuLm1lc3NhZ2VzIG9se1xuICBsaXN0LXN0eWxlOmF1dG87XG4gIHBhZGRpbmctbGVmdDogMjBweDtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLmlzUGluIHBhdGh7XG4gIGZpbGw6ICNGMDhBMjQ7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5yaWdodEJ0bkJveCBidXR0b24ge1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5yaWdodEJ0bkJveCBidXR0b24gc3BhbjpsYXN0LW9mLXR5cGV7XG4gIFxufVxuXG50YWJsZSB0ciB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gIHBhZGRpbmc6IDVweDtcbn1cbnRhYmxlIHRoLCB0YWJsZSB0ZCB7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG50YWJsZSB0aCB7XG4gIC8vIGZvbnQtc2l6ZTogMTRweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuLy8gLyog5rua5Yqo5p2h5Lul5Y+K5rua5Yqo5p2h6L2o6YGT55qE5a695bqmICovXG4vLyA6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbi8vICAgICB3aWR0aDogMTBweDtcbi8vIH1cblxuLy8gLyog5rua5Yqo5p2h6L2o6YGT55qE5qC35byPKi9cbi8vIDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xuICAgIFxuLy8gfVxuXG4vLyAvKiDmu5rliqjmnaHnmoTmoLflvI8gKi9cbi8vIDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuLy8gICAgIGJhY2tncm91bmQ6ICM4ODg7IFxuLy8gfVxuXG4vLyAvKiDlvZPkvaDpvKDmoIfmgqzlgZzlnKjmu5rliqjmnaHkuIrml7bnmoTmoLflvI8gKi9cbi8vIDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIge1xuLy8gICAgIGJhY2tncm91bmQ6ICM1NTU7IFxuLy8gfVxuXG4vKiDmu5rliqjmnaEgKi9cbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG9yaXpvbnRhbCB7IC8q5rC05bmz5rua5Yqo5p2h55qE5qC35byPKi9cbiAgd2lkdGg6IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0MxQzFDMTtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA2cHg7XG59XG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrLXBpZWNlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsgLyrmu5rliqjmnaHnmoTog4zmma/popzoibIqL1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDA7IC8q5rua5Yqo5p2h55qE5ZyG6KeS5a695bqmKi9cbn1cbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICB3aWR0aDogMTBweDsgLyrmu5rliqjmnaHnmoTlrr3luqYqL1xuICBoZWlnaHQ6IDhweDsgLyrmu5rliqjmnaHnmoTpq5jluqYqL1xufVxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjp2ZXJ0aWNhbCB7IC8q5Z6C55u05rua5Yqo5p2h55qE5qC35byPKi9cbiAgaGVpZ2h0OiA1MHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTk5O1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDRweDtcbiAgb3V0bGluZTogMnB4IHNvbGlkICNmZmY7XG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4O1xuICBib3JkZXI6IDJweCBzb2xpZCAjZmZmO1xufVxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7IC8q5rua5Yqo5p2h55qEaG92ZXLmoLflvI8qL1xuICBoZWlnaHQ6IDUwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5ZjlmOWY7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNHB4O1xufVxuXG5wcmUge1xuYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMDtcbmJvcmRlci1yYWRpdXM6IDVweDtcbnBhZGRpbmc6IDE1cHg7XG5ib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuY29sb3I6ICMzMzM7XG5mb250LWZhbWlseTogQ291cmllciwgbW9ub3NwYWNlO1xubGluZS1oZWlnaHQ6IDEuMjtcbm92ZXJmbG93LXg6IGF1dG87XG53aGl0ZS1zcGFjZTogcHJlO1xufVxuXG5ibG9ja3F1b3RlIHtcbnBhZGRpbmc6IDEwcHggMjBweDtcbm1hcmdpbjogMCAwIDIwcHg7XG5ib3JkZXItbGVmdDogNXB4IHNvbGlkICNmMWYxZjE7XG5jb2xvcjogIzY2NjtcbmJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XG59XG5cbmA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRJbml0aWFsUHJvbXB0ID0gZXhwb3J0cy5nZXREZWZhdWx0UHJvbXB0ID0gZXhwb3J0cy5oYW5kbGVIaWdodGxpZ2h0ID0gZXhwb3J0cy5nZXRBbmtpQ2FyZHMgPSBleHBvcnRzLmhhbmRsZVByb21wdFZhcmlhYmxlcyA9IGV4cG9ydHMuZ2V0VW5zcGxhc2hJbWFnZXMgPSBleHBvcnRzLndpbmRvd0luaXRpYWxpemF0aW9uID0gZXhwb3J0cy5nZXRDbGlwYm9hcmQgPSBleHBvcnRzLmRlZmF1bHRQcm9tcHQgPSBleHBvcnRzLmRpY3Rpb25hcnlQcm9tcHQgPSB2b2lkIDA7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi9PcHRpb25zL3V0aWxcIik7XG5leHBvcnRzLmRpY3Rpb25hcnlQcm9tcHQgPSB7XG4gICAgdGl0bGU6ICdEaWN0aW9uYXJ5JyxcbiAgICBpZDogJ2RpY3QnLFxuICAgIGdldFVuc3BsYXNoSW1hZ2VzOiB0cnVlLFxuICAgIHVzZXJQcm9tcHQ6ICcnLFxufTtcbmV4cG9ydHMuZGVmYXVsdFByb21wdCA9IHtcbiAgICB0aXRsZTogJ0RpY3Rpb25hcnknLFxuICAgIGlkOiAnZGljdCcsXG4gICAgZ2V0VW5zcGxhc2hJbWFnZXM6IHRydWUsXG4gICAgdXNlclByb21wdDogJycsXG59O1xuY29uc3QgZ2V0Q2xpcGJvYXJkID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQoKVxuICAgICAgICAgICAgLnRoZW4odGV4dCA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHRleHQpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5nZXRDbGlwYm9hcmQgPSBnZXRDbGlwYm9hcmQ7XG5jb25zdCB3aW5kb3dJbml0aWFsaXphdGlvbiA9IChkYXRhKSA9PiB7XG4gICAgLy8g6K6+572u56qX5Y+j55qE6buY6K6k5L2N572uXG4gICAgaWYgKGRhdGEud2luZG93RWxlbWVudC5jdXJyZW50ICYmICFkYXRhLmlzUGluKSB7XG4gICAgICAgIC8vIENoZWNrIHRoZSBib3VuZGFyaWVzXG4gICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgY29uc3QgZWxlbWVudFdpZHRoID0gZGF0YS53aW5kb3dFbGVtZW50LmN1cnJlbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRIZWlnaHQgPSBkYXRhLndpbmRvd0VsZW1lbnQuY3VycmVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IG1pblggPSAwO1xuICAgICAgICBjb25zdCBtaW5ZID0gMDtcbiAgICAgICAgY29uc3QgbWF4WCA9IHdpbmRvd1dpZHRoIC0gZWxlbWVudFdpZHRoO1xuICAgICAgICBjb25zdCBtYXhZID0gd2luZG93SGVpZ2h0IC0gZWxlbWVudEhlaWdodDtcbiAgICAgICAgbGV0IG5ld1gsIG5ld1kgPSAwO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uT2JqZWN0ID0gZGF0YS5zZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIG5ld1ggPSBzZWxlY3Rpb25PYmplY3QueCArIHNlbGVjdGlvbk9iamVjdC53aWR0aCArIDEwO1xuICAgICAgICAgICAgbmV3WSA9IHNlbGVjdGlvbk9iamVjdC55ICsgc2VsZWN0aW9uT2JqZWN0LmhlaWdodCArIDEwO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNsYW1wZWRYID0gTWF0aC5tYXgobWluWCwgTWF0aC5taW4obmV3WCwgbWF4WCkpO1xuICAgICAgICBjb25zdCBjbGFtcGVkWSA9IE1hdGgubWF4KG1pblksIE1hdGgubWluKG5ld1ksIG1heFkpKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS5zZWxlY3Rpb24pO1xuICAgICAgICBkYXRhLndpbmRvd0VsZW1lbnQuY3VycmVudC5zdHlsZS5sZWZ0ID0gYCR7Y2xhbXBlZFh9cHhgO1xuICAgICAgICBkYXRhLndpbmRvd0VsZW1lbnQuY3VycmVudC5zdHlsZS50b3AgPSBgJHtjbGFtcGVkWX1weGA7XG4gICAgfVxuICAgIC8vIC8vIOa3u+WKoOa7muWKqOS6i+S7tu+8jOiuqea2iOaBr+WIl+ihqOiHquWKqOa7muWKqOWIsOW6lemDqFxuICAgIC8vIGRhdGEubWVzc2FnZXNMaXN0LmN1cnJlbnQ/LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlU2Nyb2xsKTtcbiAgICAvLyByZXR1cm4gKCkgPT4ge1xuICAgIC8vICAgICAvLyBjb25zb2xlLmxvZygndXNlRWZmZWN0IHJldHVybicpO1xuICAgIC8vICAgICBkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50Py5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZVNjcm9sbCk7XG4gICAgLy8gfTtcbiAgICAvLyBmdW5jdGlvbiBoYW5kbGVTY3JvbGwoKSB7XG4gICAgLy8gICAgIGlmIChkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50ICE9PSBudWxsKSB7XG4gICAgLy8gICAgICAgICBjb25zdCBpc0F0Qm90dG9tID0gZGF0YS5tZXNzYWdlc0xpc3QuY3VycmVudD8uc2Nyb2xsVG9wICsgZGF0YS5tZXNzYWdlc0xpc3QuY3VycmVudC5jbGllbnRIZWlnaHQgPj0gZGF0YS5tZXNzYWdlc0xpc3QuY3VycmVudC5zY3JvbGxIZWlnaHQgLSAwLjU7XG4gICAgLy8gICAgICAgICBpZiAoaXNBdEJvdHRvbSkge1xuICAgIC8vICAgICAgICAgICAgIC8vIOW3sue7j+S9jeS6juW6lemDqO+8jOS4jemcgOimgeiHquWKqOa7muWKqFxuICAgIC8vICAgICAgICAgICAgIHJldHVybjtcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICAgICAgLy8gc2Nyb2xsVG9Cb3R0b20oKVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIC8vIOacquS9jeS6juW6lemDqO+8jOS4jeaJp+ihjOiHquWKqOa7muWKqFxuICAgIC8vIH1cbn07XG5leHBvcnRzLndpbmRvd0luaXRpYWxpemF0aW9uID0gd2luZG93SW5pdGlhbGl6YXRpb247XG4vKipcbiAqIOiOt+WPliBVbnNwbGFzaCDlm77niYdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5V29yZCAtIOagueaNruatpOWFs+mUruWtl+aQnOe0ouWbvueJh1xuICogQHJldHVybnMge0FycmF5fSDlm77niYfliJfooahcbiAqIEB0aHJvd3Mge+W8guW4uOexu+Wei30g5byC5bi45o+P6L+wXG4gKi9cbmNvbnN0IGdldFVuc3BsYXNoSW1hZ2VzID0gKGtleVdvcmQpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyDor7fmsYIgYmFja2dyb3VuZCDojrflj5bmlbDmja5cbiAgICAgICAgLy8g5L2/55So6ZW/6L+e5o6lXG4gICAgICAgIC8vIGxldCBwb3J0ID0gYnJvd3Nlci5ydW50aW1lLmNvbm5lY3Qoe1xuICAgICAgICAvLyAgICAgbmFtZTogJ2Zyb21Qb3B1cENhcmRVdGlsJ1xuICAgICAgICAvLyB9KVxuICAgICAgICAvLyDkvb/nlKggcG9zdE1zIOWPkemAgeS/oeaBr1xuICAgICAgICBsZXQgc2VuZGluZyA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2dldFVuc3BsYXNoSW1hZ2VzJywgJ21lc3NhZ2VzJzogJycsICdrZXlXb3JkJzoga2V5V29yZCB9KTtcbiAgICAgICAgc2VuZGluZy50aGVuKChtc2cpID0+IHtcbiAgICAgICAgICAgIGlmIChtc2cudHlwZSA9PT0gJ3NlbmRJbWdEYXRhJykge1xuICAgICAgICAgICAgICAgIGlmICgnaW1ncycgaW4gbXNnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1bnNwbGFzaFNlYXJjaFBob3RvcycpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG1zZy5pbWdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIC8vZXJyb3JcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIC8vIOaOpeaUtuS/oeaBr1xuICAgICAgICAvLyBwb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihtc2cgPT4ge1xuICAgICAgICAvLyAgICAgaWYgKG1zZy50eXBlID09PSAnc2VuZEltZ0RhdGEnKSB7XG4gICAgICAgIC8vICAgICAgICAgaWYgKCdpbWdzJyBpbiBtc2cpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3Vuc3BsYXNoU2VhcmNoUGhvdG9zJyk7XG4gICAgICAgIC8vICAgICAgICAgICAgIHJlc29sdmUobXNnLmltZ3MpXG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KVxuICAgIH0pO1xufTtcbmV4cG9ydHMuZ2V0VW5zcGxhc2hJbWFnZXMgPSBnZXRVbnNwbGFzaEltYWdlcztcbi8qKlxuICog5aSE55CGIFByb21wdCDkuK3nmoTlj5jph49cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvbXB0U3RyIC0g6ZyA6KaB5aSE55CG55qEIFByb21wdCDlrZfnrKbkuLJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlXb3JkIC0g55So5oi35omA6YCJ5Lit55qE5YWz6ZSu5a2XXG4gKiBAcGFyYW0ge3N0cmluZ30gU2VudGVuY2UgLSDku47nvZHpobXkuK3mj5Dlj5bnmoTlhbPplK7lrZfmiYDlnKjnmoTlj6XlrZBcbiAqIEByZXR1cm5zIHtzdHJpbmd9IOWkhOeQhuWQjueahCBQcm9tcHQg5a2X56ym5LiyXG4gKiBAdGhyb3dzIHvlvILluLjnsbvlnot9IOW8guW4uOaPj+i/sFxuICovXG5jb25zdCBoYW5kbGVQcm9tcHRWYXJpYWJsZXMgPSAocHJvbXB0U3RyLCBrZXlXb3JkLCBTZW50ZW5jZSwgTGFuZykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgbGV0IG5ld1Byb21wdFN0ciA9IHByb21wdFN0cjtcbiAgICAvLyDlpITnkIblhbPplK7lrZflkozlj6XlrZBcbiAgICBuZXdQcm9tcHRTdHIgPSBwcm9tcHRTdHIucmVwbGFjZSgvXFx7c2VsZWN0aW9uXFx9L2csIGtleVdvcmQpO1xuICAgIG5ld1Byb21wdFN0ciA9IG5ld1Byb21wdFN0ci5yZXBsYWNlKC9cXHtzZW50ZW5jZVxcfS9nLCBTZW50ZW5jZSk7XG4gICAgLy8g5aSE55CG6K+t6KiAXG4gICAgbmV3UHJvbXB0U3RyID0gbmV3UHJvbXB0U3RyLnJlcGxhY2UoL1xce25hdGl2ZUxhbmd1YWdlXFx9L2csIExhbmdbJ2N1cnJlbnQnXVsnbmFtZSddKTtcbiAgICBuZXdQcm9tcHRTdHIgPSBuZXdQcm9tcHRTdHIucmVwbGFjZSgvXFx7Y3VycmVudExhbmd1YWdlXFx9L2csIExhbmdbJ2N1cnJlbnQnXVsnbmFtZSddKTtcbiAgICBuZXdQcm9tcHRTdHIgPSBuZXdQcm9tcHRTdHIucmVwbGFjZSgvXFx7dGFyZ2V0TGFuZ3VhZ2VcXH0vZywgTGFuZ1sndGFyZ2V0J11bJ25hbWUnXSk7XG4gICAgLy8g5aSE55CGIEFua2kg5Y2V6K+NXG4gICAgaWYgKG5ld1Byb21wdFN0ci5pbmRleE9mKCd7YW5raUNhcmRzfScpID49IDApIHtcbiAgICAgICAgLy8g6I635Y+W55uu5qCH5Y2h54mHXG4gICAgICAgIGxldCByYW5kb21WYWx1ZXM7XG4gICAgICAgIGxldCBhbmtpQ2FyZHNTdHIgPSAnJztcbiAgICAgICAgeWllbGQgKDAsIGV4cG9ydHMuZ2V0QW5raUNhcmRzKSgpLnRoZW4oKGNhcmRzKSA9PiB7XG4gICAgICAgICAgICByYW5kb21WYWx1ZXMgPSBjYXJkcztcbiAgICAgICAgICAgIGlmIChyYW5kb21WYWx1ZXMgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAocmFuZG9tVmFsdWVzLmxlbmd0aCA+IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g6ZqP5py65Y+WIFgg5Liq5Y2h54mHXG4gICAgICAgICAgICAgICAgICAgIC8vIOa3seaLt+i0neaVsOe7hOS7pemBv+WFjeS/ruaUuea6kOaVsOe7hFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaHVmZmxlZEFycmF5ID0gcmFuZG9tVmFsdWVzLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIOS9v+eUqCBGaXNoZXItWWF0ZXMg5rSX54mM566X5rOV5a+55pWw57uE6L+b6KGM5omT5LmxXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBzaHVmZmxlZEFycmF5Lmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtzaHVmZmxlZEFycmF5W2ldLCBzaHVmZmxlZEFycmF5W2pdXSA9IFtzaHVmZmxlZEFycmF5W2pdLCBzaHVmZmxlZEFycmF5W2ldXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyDlj5bliY0geCDkuKrlhYPntKDkvZzkuLrnu5PmnpxcbiAgICAgICAgICAgICAgICAgICAgcmFuZG9tVmFsdWVzID0gc2h1ZmZsZWRBcnJheS5zbGljZSgwLCA1KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIOWwhuWNleivjeabv+aNouWIsCBwcm9tcHQg5LitXG4gICAgICAgICAgICAgICAgcmFuZG9tVmFsdWVzID09PSBudWxsIHx8IHJhbmRvbVZhbHVlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmFuZG9tVmFsdWVzLmZvckVhY2goKGNhcmQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGNhcmQuZmllbGRzKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpcnN0S2V5ID0ga2V5c1swXTtcbiAgICAgICAgICAgICAgICAgICAgLy8g5om+5Yiw5Y2h54mH5q2j6Z2iXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmQuZmllbGRzW2tleXNbaV1dLm9yZGVyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RLZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFua2lDYXJkc1N0ciArPSBjYXJkLmZpZWxkc1tmaXJzdEtleV0udmFsdWUgKyAnLCc7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbmV3UHJvbXB0U3RyID0gbmV3UHJvbXB0U3RyLnJlcGxhY2UoL1xce2Fua2lDYXJkc1xcfS9nLCBhbmtpQ2FyZHNTdHIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdQcm9tcHRTdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgbmV3UHJvbXB0U3RyID0gbmV3UHJvbXB0U3RyLnJlcGxhY2UoL1xce2Fua2lDYXJkc1xcfS9nLCAnJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3UHJvbXB0U3RyO1xufSk7XG5leHBvcnRzLmhhbmRsZVByb21wdFZhcmlhYmxlcyA9IGhhbmRsZVByb21wdFZhcmlhYmxlcztcbi8qKlxuICog6I635Y+WIEFua2kg5Y2h54mHXG4gKlxuICogQHJldHVybnMge29iamVjdFtdfSDov5Tlm57ljaHniYfnmoTlr7nosaHliJfooahcbiAqIEB0aHJvd3Mge+W8guW4uOexu+Wei30g5byC5bi45o+P6L+wXG4gKi9cbmNvbnN0IGdldEFua2lDYXJkcyA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyDliKTmlq3mnKzlnLDmmK/lkKblrZjmnInmnKrov4fmnJ/nmoTmlbDmja5cbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLmdldCh7IFwiYW5raUNhcmRzXCI6IHsgJ2NhcmRzJzogW10sICd0aW1lJzogMCB9IH0pLnRoZW4oKGl0ZW0pID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgLy8g57yT5a2YIDEg5bCP5pe2XG4gICAgICAgICAgICBpZiAoaXRlbS5hbmtpQ2FyZHMuY2FyZHMubGVuZ3RoID4gMCAmJiBEYXRlLm5vdygpIC0gaXRlbS5hbmtpQ2FyZHMudGltZSA8IDM2MDAgKiAxMDAwKSB7XG4gICAgICAgICAgICAgICAgLy8g6Iul5pys5Zyw5pyJ5Y+v55So55qE5pWw5o2u77yM5YiZ55u05o6l5aSE55CGXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpdGVtLmFua2lDYXJkcy5jYXJkcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDoi6XmnKzlnLDml6Dlj6/nlKjnmoTmlbDmja7vvIzliJnpgJrov4cgQW5raVxuICAgICAgICAgICAgICAgIHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2Fua2lBY3Rpb24nLCAnbWVzc2FnZXMnOiB7ICdhbmtpX2FjdGlvbl90eXBlJzogJ2ZpbmRDYXJkcycsICdhbmtpX2FyZ3VtZW50cyc6IHsgJ3F1ZXJ5JzogJ2lzOmR1ZSBwcm9wOmR1ZT4tMiBwcm9wOmR1ZTwzJyB9IH0sIH0pLnRoZW4oKG1lc3NhZ2UpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5lcnJvciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5qC55o2u5Y2h54mHIElEIOafpeivouWNoeeJh+S/oeaBr1xuICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW5raUFjdGlvbicsICdtZXNzYWdlcyc6IHsgJ2Fua2lfYWN0aW9uX3R5cGUnOiAnY2FyZHNJbmZvJywgJ2Fua2lfYXJndW1lbnRzJzogeyAnY2FyZHMnOiBtZXNzYWdlLnJlc3VsdCB9IH0sIH0pLnRoZW4oKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FyZHMgPSBtZXNzYWdlLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlsIbmlbDmja7lrZjlgqjliLDmnKzlnLDvvIzpmZDliLbmnIDlpKfkv53lrZjmlbDph4/vvIzpgb/lhY3mnKzlnLDlrZjlgqjnqbrpl7Tovr7liLDkuIrpmZBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5raUNhcmRzOiB7ICd0aW1lJzogRGF0ZS5ub3coKSwgJ2NhcmRzJzogY2FyZHMuc2xpY2UoMCwgMzApIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNhcmRzLnNsaWNlKDAsIDMwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Y+N6aaI6ZSZ6K+v5L+h5oGvXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSwgKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9lcnJvclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5nZXRBbmtpQ2FyZHMgPSBnZXRBbmtpQ2FyZHM7XG4vKipcbiAqIOWkhOeQhuWtl+espuS4su+8jOWvueaMh+WumuWtl+espuiuvue9ruagt+W8j+OAgeeCueWHu+S6i+S7tlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSDpnIDopoHlpITnkIbnmoTlrZfnrKbkuLJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlXb3JkIC0g5b2T5YmN6YCJ5Lit55qE5a2X56ymXG4gKiBAcmV0dXJucyB7c3RyaW5nfSDlpITnkIblkI7nmoQgUHJvbXB0IOWtl+espuS4slxuICogQHRocm93cyB75byC5bi457G75Z6LfSDlvILluLjmj4/ov7BcbiAqL1xuY29uc3QgaGFuZGxlSGlnaHRsaWdodCA9IChzdHIsIGtleVdvcmQsIGFua2lDYXJkcywgd2luZG93RWxlbWVudCkgPT4ge1xuICAgIGlmIChzdHIgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIGxldCBuZXdTdHIgPSBzdHI7XG4gICAgLy8g5aSE55CGIGtleXdvcmQg6auY5LquXG4gICAgbmV3U3RyID0gbmV3U3RyLnJlcGxhY2UobmV3IFJlZ0V4cChgKF58W14qXSkoJHtrZXlXb3JkfSkoW14qXXwkKWAsICdnaScpLCBmdW5jdGlvbiAobWF0Y2gsIHAxLCBwMiwgcDMpIHtcbiAgICAgICAgLy8g5aaC5p6c5YWz6ZSu6K+N5YmN5ZCO5rKh5pyJKu+8jOWImea3u+WKoCoq77yM5ZCm5YiZ5L+d55WZ5Y6f5qC3XG4gICAgICAgIGlmIChwMSAhPT0gJyonICYmIHAzICE9PSAnKicpIHtcbiAgICAgICAgICAgIHJldHVybiBwMSArICcqKicgKyBwMiArICcqKicgKyBwMztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDsgLy8g5LiN6L+b6KGM5pu/5o2iXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyAvLyDlpITnkIYgQW5raSDljZXor43pq5jkuq5cbiAgICAvLyBjb25zdCBjYXJkcyA9IGFua2lDYXJkc1xuICAgIC8vIGlmICh3aW5kb3dFbGVtZW50ICYmIGNhcmRzKSB7XG4gICAgLy8gICAgIC8vIOmBjeWOhuavj+S4gOS4quWNoeeJh1xuICAgIC8vICAgICBjYXJkcy5mb3JFYWNoKChjYXJkOiBhbnkpID0+IHtcbiAgICAvLyAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIC8vICAgICAgICAgLy8gY29uc29sZS5sb2coY2FyZCk7XG4gICAgLy8gICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY2FyZC5maWVsZHMpO1xuICAgIC8vICAgICAgICAgbGV0IGZpcnN0S2V5ID0ga2V5c1swXTtcbiAgICAvLyAgICAgICAgIC8vIOaJvuWIsOWNoeeJh+ato+mdolxuICAgIC8vICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICAgICAgICAgICAgaWYgKGNhcmQuZmllbGRzW2tleXNbaV1dLm9yZGVyID09PSAwKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIGZpcnN0S2V5ID0ga2V5c1tpXVxuICAgIC8vICAgICAgICAgICAgICAgICBicmVha1xuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIGNvbnN0IGNhcmRGcm9udFZhbHVlID0gY2FyZC5maWVsZHNbZmlyc3RLZXldLnZhbHVlXG4gICAgLy8gICAgICAgICBjb25zdCBlc2NhcGVkQ2FyZEZyb250VmFsdWUgPSBlc2NhcGVSZWdFeHAoY2FyZEZyb250VmFsdWUpO1xuICAgIC8vICAgICAgICAgaWYgKGNhcmRGcm9udFZhbHVlICE9PSBrZXlXb3JkKSB7XG4gICAgLy8gICAgICAgICAgICAgbmV3U3RyID0gbmV3U3RyLnJlcGxhY2UobmV3IFJlZ0V4cChlc2NhcGVkQ2FyZEZyb250VmFsdWUsICdnaScpLCBgPG1hcms+JHtjYXJkRnJvbnRWYWx1ZX08L21hcms+YClcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIC8vIH0sIDEwKTtcbiAgICAvLyAgICAgICAgIGZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmc6IHN0cmluZykge1xuICAgIC8vICAgICAgICAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTsgLy8gJCYgbWVhbnMgdGhlIHdob2xlIG1hdGNoZWQgc3RyaW5nXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgICAvLyDlr7nkuIrov7DlhYPntKDmt7vliqDngrnlh7vkuovku7ZcbiAgICAvLyAgICAgLy8gbGV0IGhpZ2h0bGlnaHREb20gPSB3aW5kb3dFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hlbGxvJylcbiAgICAvLyAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCBoaWdodGxpZ2h0RG9tLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICAgIC8vICAgICBoaWdodGxpZ2h0RG9tW2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlSGlnaHRsaWdodENsaWNrKVxuICAgIC8vICAgICAvLyAgICAgaGlnaHRsaWdodERvbVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUhpZ2h0bGlnaHRDbGljaylcbiAgICAvLyAgICAgLy8gfVxuICAgIC8vIH1cbiAgICByZXR1cm4gbmV3U3RyO1xuICAgIC8vIHJldHVybiAndHJ1ZSdcbn07XG5leHBvcnRzLmhhbmRsZUhpZ2h0bGlnaHQgPSBoYW5kbGVIaWdodGxpZ2h0O1xuLyoqXG4gKiDojrflj5bns7vnu5/nmoTpu5jorqQgUHJvbXB0XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5V29yZCAtIOW9k+WJjemAieS4reeahOWtl+esplxuICogQHJldHVybnMge3N0cmluZ30gUHJvbXB0IOWtl+espuS4slxuICogQHRocm93cyB75byC5bi457G75Z6LfSDlvILluLjmj4/ov7BcbiAqL1xuY29uc3QgZ2V0RGVmYXVsdFByb21wdCA9IChrZXlXb3JkLCBjdXJyZW50TGFuZ3VhZ2UpID0+IHtcbiAgICBsZXQgZ2V0VW5zcGxhc2hJbWFnZXMgPSB0cnVlO1xuICAgIGxldCB1c2VyUHJvbXB0ID0gYFxuXG4gICAgICAgIFBsZWFzZSBoZWxwIG1lIGxlYXJuIGFzIGEgZm9yZWlnbiBsYW5ndWFnZSB0ZWFjaGVyLiBTZW50ZW5jZXMgaW4gZXhhbXBsZXMgc2hvdWxkIG5vdCBiZSB0aGUgc2FtZSBhcyB0aGUgZ2l2ZW4gc2VudGVuY2UsIEFic29sdXRlbHkgTm8gRXh0cmEgVGV4dCwgT25seSBQcm92aWRlIEluZm9ybWF0aW9uIGFzIGluIHRoZSBFeGFtcGxlcywgS2VlcCBMYW5ndWFnZSBDb25jaXNlLlxuXG4gICAgICAgIEV4YW1wbGXvvJpcbiAgICAgICAgXG4gICAgICAgIC0gIE1lYW5pbmc6IDxFeHBsYWluIHRoZSBtZWFuaW5nIHVzaW5nIHtuYXRpdmVMYW5ndWFnZX0+XG4gICAgICAgIC0gIFBhcnQgb2YgU3BlZWNoOiA8SW5kaWNhdGUgdGhlIHBhcnQgb2Ygc3BlZWNoIHVzaW5nIHtuYXRpdmVMYW5ndWFnZX0+XG4gICAgICAgIFxuICAgICAgICAjIyBNZWFuaW5nIGluIHRoZSBzZW50ZW5jZVxuICAgICAgICAtICA8RXhwbGFpbiB0aGUgbWVhbmluZyBvZiB0aGUgd29yZCBpbiB0aGUgc2VudGVuY2UgdXNpbmcge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgXG4gICAgICAgICMjIEV4YW1wbGUgU2VudGVuY2VzXG4gICAgICAgIC0gIDx7dGFyZ2V0TGFuZ3VhZ2V9IGV4YW1wbGUgc2VudGVuY2U+IC0gPFRyYW5zbGF0aW9uIGluIHtuYXRpdmVMYW5ndWFnZX0+XG4gICAgICAgIC0gIDx7dGFyZ2V0TGFuZ3VhZ2V9IGV4YW1wbGUgc2VudGVuY2U+IC0gPFRyYW5zbGF0aW9uIGluIHtuYXRpdmVMYW5ndWFnZX0+XG4gICAgICAgIFxuICAgICAgICAjIyBUcmFuc2xhdGlvbiBFeGVyY2lzZVxuICAgICAgICAtICA8e25hdGl2ZUxhbmd1YWdlfSBzZW50ZW5jZT5cbiAgICAgICAgLSAgPHtuYXRpdmVMYW5ndWFnZX0gc2VudGVuY2U+XG4gICAgICAgIFxuICAgICAgICAtLS1cbiAgICAgICAgXG4gICAgICAgIFdvcmQ6e3NlbGVjdGlvbn0sIHNlbnRlbmNlOiB7c2VudGVuY2V9LFlvdSBtdXN0IHJlcGx5IGluIHRoZSBzcGVjaWZpZWQgbGFuZ3VhZ2VcblxuICAgICAgICBQbGVhc2Ugc3RhcnQgdGVhY2hpbmc6XG5cbiAgICAgICAgYDtcbiAgICBzd2l0Y2ggKGN1cnJlbnRMYW5ndWFnZSkge1xuICAgICAgICBjYXNlICfnroDkvZPkuK3mlocnOlxuICAgICAgICAgICAgdXNlclByb21wdCA9IGBcbiAgICAgICAgICAgIOS9nOS4uuS4gOWQjeWkluivreaVmeW4iO+8jOaIkeW4jOacm+W+l+WIsOS9oOeahOW4ruWKqeOAguS9oOaPkOS+m+eahOS+i+WPpeS4jeiDveS4juaIkeaPkOS+m+eahOWPpeWtkOebuOWQjO+8jOS4peemgea3u+WKoOS7u+S9lemineWklueahOaWh+acrO+8jOWPquaMieeFp+ekuuS+i+S4reeahOaWueW8j+e7meWHuuS/oeaBr++8jOehruS/neivreiogOeugOa0geOAglxuXG4gICAgICAgICAgICDnpLrkvovvvJpcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLSAg5ZCr5LmJ77yaPOeUqCB7bmF0aXZlTGFuZ3VhZ2V9IOino+mHiuWQq+S5iT5cbiAgICAgICAgICAgIC0gIOivjeaAp++8mjznlKgge25hdGl2ZUxhbmd1YWdlfSDooajmmI7or43mgKc+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICMjIOWcqOWPpeS4reeahOWQq+S5iVxuICAgICAgICAgICAgLSAgPOeUqCB7bmF0aXZlTGFuZ3VhZ2V9IOino+mHiuWPpeS4reeahOivjeaxh+WQq+S5iT5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgIyMg56S65L6L5Y+l5a2QXG4gICAgICAgICAgICAtICA8e3RhcmdldExhbmd1YWdlfSDnmoTnpLrkvovlj6XlrZA+IC0gPOeUqCB7bmF0aXZlTGFuZ3VhZ2V9IOe/u+ivkT5cbiAgICAgICAgICAgIC0gIDx7dGFyZ2V0TGFuZ3VhZ2V9IOeahOekuuS+i+WPpeWtkD4gLSA855SoIHtuYXRpdmVMYW5ndWFnZX0g57+76K+RPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAjIyDnv7vor5Hnu4PkuaBcbiAgICAgICAgICAgIC0gIDx7bmF0aXZlTGFuZ3VhZ2V9IOWPpeWtkD5cbiAgICAgICAgICAgIC0gIDx7bmF0aXZlTGFuZ3VhZ2V9IOWPpeWtkD5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLS0tXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIOWNleivje+8mlwie3NlbGVjdGlvbn1cIu+8jOWPpeWtkO+8mlwie3NlbnRlbmNlfVwi77yM5L2g5b+F6aG755So6KeE5a6a55qE6K+t6KiA6L+b6KGM5Zue5aSN44CCXG4gICAgXG4gICAgICAgICAgICDor7flvIDlp4vmlZnlrabvvJpcbiAgICBcbiAgICAgICAgICAgIGA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAn57mB6auU5Lit5paHJzpcbiAgICAgICAgICAgIHVzZXJQcm9tcHQgPSBgXG4gICAgICAgICAgICDkvZzngrrkuIDlkI3lpJboqp7ogIHluKvvvIzmiJHluIzmnJvlvpfliLDkvaDnmoTluavliqnjgILkvaDmj5DkvpvnmoTkvovlj6XkuI3mh4noiIfmiJHmj5DkvpvnmoTlj6XlrZDnm7jlkIzvvIzlmrTnpoHmt7vliqDku7vkvZXpoY3lpJbnmoTmloflrZfvvIzlj6rmjInnhafnr4TkvovkuK3nmoTmlrnlvI/ntablh7ros4foqIrvvIznorrkv53oqp7oqIDnsKHmvZTjgIJcblxuICAgICAgICAgICAg56+E5L6L77yaXG5cbiAgICAgICAgICAgIC0gIOWQq+e+qe+8mjznlKgge25hdGl2ZUxhbmd1YWdlfSDop6Pph4vlkKvnvqk+XG4gICAgICAgICAgICAtICDoqZ7mgKfvvJo855SoIHtuYXRpdmVMYW5ndWFnZX0g6KGo5piO6Kme5oCnPlxuXG4gICAgICAgICAgICAjIyDlnKjlj6XlrZDkuK3nmoTlkKvnvqlcbiAgICAgICAgICAgIC0gIDznlKgge25hdGl2ZUxhbmd1YWdlfSDop6Pph4vlj6XkuK3nmoToqZ7lvZnlkKvnvqk+XG5cbiAgICAgICAgICAgICMjIOevhOS+i+WPpeWtkFxuICAgICAgICAgICAgLSAgPHt0YXJnZXRMYW5ndWFnZX0g55qE56+E5L6L5Y+l5a2QPiAtIDznlKgge25hdGl2ZUxhbmd1YWdlfSDnv7vora8+XG4gICAgICAgICAgICAtICA8e3RhcmdldExhbmd1YWdlfSDnmoTnr4Tkvovlj6XlrZA+IC0gPOeUqCB7bmF0aXZlTGFuZ3VhZ2V9IOe/u+itrz5cblxuICAgICAgICAgICAgIyMg57+76K2v57e057+SXG4gICAgICAgICAgICAtICA8e25hdGl2ZUxhbmd1YWdlfSDlj6XlrZA+XG4gICAgICAgICAgICAtICA8e25hdGl2ZUxhbmd1YWdlfSDlj6XlrZA+XG5cbiAgICAgICAgICAgIC0tLVxuXG4gICAgICAgICAgICDlrZfoqZ7vvJpcIntzZWxlY3Rpb259XCLvvIzlj6XlrZDvvJpcIntzZW50ZW5jZX1cIu+8jOS9oOW/hemgiOeUqOimj+WumueahOiqnuiogOmAsuihjOWbnuimhuOAglxuXG4gICAgICAgICAgICDoq4vplovlp4vmlZnlrbjvvJpcblxuICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIOWFs+mUruWtl+mVv+W6pui+g+mVv+aXtu+8jOaMieeFp+WPpeWtkOi/m+ihjOWkhOeQhlxuICAgIGlmIChrZXlXb3JkLmxlbmd0aCA+IDIwKSB7XG4gICAgICAgIGdldFVuc3BsYXNoSW1hZ2VzID0gZmFsc2U7XG4gICAgICAgIHVzZXJQcm9tcHQgPSBgXG4gICAgICBcbiAgICAgICAgICAgIEFzIGEgbGFuZ3VhZ2UgdGVhY2hlciwgSSB3aWxsIHByb3ZpZGUgYW4gZXhwbGFuYXRpb24gb2YgdGhlIGdyYW1tYXIga25vd2xlZGdlIGluIHRoZSBnaXZlbiBzZW50ZW5jZSwgQWJzb2x1dGVseSBObyBFeHRyYSBUZXh0LCBPbmx5IFByb3ZpZGUgSW5mb3JtYXRpb24gYXMgaW4gdGhlIEV4YW1wbGVzLCBLZWVwIExhbmd1YWdlIENvbmNpc2UuXG5cbiAgICAgICAgICAgIEV4YW1wbGU6XG5cbiAgICAgICAgICAgICMjIFRyYW5zbGF0aW9uXG4gICAgICAgICAgICA8VHJhbnNsYXRlIHRvIHtuYXRpdmVMYW5ndWFnZX0+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICMjIEdyYW1tYXJcbiAgICAgICAgICAgIDwtIFBvaW50OiBFeHBsYWluIGluIHtuYXRpdmVMYW5ndWFnZX0+XG5cbiAgICAgICAgICAgICMjIEV4YW1wbGVzIG9mIHJlbGF0ZWQgZ3JhbW1hclxuICAgICAgICAgICAgLSAgPHt0YXJnZXRMYW5ndWFnZX0gZXhhbXBsZSBzZW50ZW5jZT4gLSA8VHJhbnNsYXRpb24gaW4ge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgICAgIC0gIDx7dGFyZ2V0TGFuZ3VhZ2V9IGV4YW1wbGUgc2VudGVuY2U+IC0gPFRyYW5zbGF0aW9uIGluIHtuYXRpdmVMYW5ndWFnZX0+XG5cbiAgICAgICAgICAgIC0tLVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBTZW50ZW5jZToge3NlbGVjdGlvbn1cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgYDtcbiAgICAgICAgc3dpdGNoIChjdXJyZW50TGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgIGNhc2UgJ+eugOS9k+S4reaWhyc6XG4gICAgICAgICAgICAgICAgdXNlclByb21wdCA9IGBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICDor7fkvaDkvZzkuLrkuIDlkI3lpJbor63mlZnluIjlr7nnu5nlrprlj6XlrZDkuK3nmoTor63ms5Xnn6Xor4bov5vooYzop6Pph4rvvIznu53lr7nkuI3og73mnInku7vkvZXpop3lpJbnmoTmlofmnKzvvIzlj6rmjInnhafnpLrkvovmj5Dkvpvkv6Hmga/vvIzkv53mjIHor63oqIDnroDmtIHjgIJcblxuICAgICAgICAgICAgICAgIOekuuS+i++8mlxuXG4gICAgICAgICAgICAgICAgIyMg57+76K+RXG4gICAgICAgICAgICAgICAgPOe/u+ivkeaIkHtuYXRpdmVMYW5ndWFnZX0+XG5cbiAgICAgICAgICAgICAgICAjIyDor63ms5VcbiAgICAgICAgICAgICAgICA8LSDngrnvvJrnlKh7bmF0aXZlTGFuZ3VhZ2V96Kej6YeKPlxuXG4gICAgICAgICAgICAgICAgIyMg55u45YWz6K+t5rOV56S65L6LXG4gICAgICAgICAgICAgICAgLSAgIDx7dGFyZ2V0TGFuZ3VhZ2V955qE56S65L6L5Y+l5a2QPiAtIDznlKh7bmF0aXZlTGFuZ3VhZ2V957+76K+RPlxuICAgICAgICAgICAgICAgIC0gICA8e3RhcmdldExhbmd1YWdlfeeahOekuuS+i+WPpeWtkD4gLSA855Soe25hdGl2ZUxhbmd1YWdlfee/u+ivkT5cblxuICAgICAgICAgICAgICAgIC0tLVxuXG4gICAgICAgICAgICAgICAg5Y+l5a2Q77ya4oCde3NlbGVjdGlvbn3igJxcblxuICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICfnuYHpq5TkuK3mlocnOlxuICAgICAgICAgICAgICAgIHVzZXJQcm9tcHQgPSBgXG4gICAgICAgICAgICAgICAg6KuL5L2g5L2c54K65LiA5ZCN5aSW6Kqe5pWZ5bir5bCN57Wm5a6a5Y+l5a2Q5Lit55qE6Kqe5rOV55+l6K2Y6YCy6KGM6Kej6YeL77yM57WV5bCN5LiN6IO95pyJ5Lu75L2V6aGN5aSW55qE5paH5pys77yM5Y+q5oyJ54Wn56+E5L6L5o+Q5L6b6LOH6KiK77yM5L+d5oyB6Kqe6KiA57Ch5r2U44CCXG5cbiAgICAgICAgICAgICAgICDnr4TkvovvvJpcblxuICAgICAgICAgICAgICAgICMjIOe/u+itr1xuICAgICAgICAgICAgICAgIDznv7vora/miJB7bmF0aXZlTGFuZ3VhZ2V9PlxuXG4gICAgICAgICAgICAgICAgIyMg6Kqe5rOVXG4gICAgICAgICAgICAgICAgPC0g6bue77ya55Soe25hdGl2ZUxhbmd1YWdlfeino+mHiz5cblxuICAgICAgICAgICAgICAgICMjIOebuOmXnOiqnuazleevhOS+i1xuICAgICAgICAgICAgICAgIC0gICA8e3RhcmdldExhbmd1YWdlfeeahOevhOS+i+WPpeWtkD4gLSA855Soe25hdGl2ZUxhbmd1YWdlfee/u+itrz5cbiAgICAgICAgICAgICAgICAtICAgPHt0YXJnZXRMYW5ndWFnZX3nmoTnr4Tkvovlj6XlrZA+IC0gPOeUqHtuYXRpdmVMYW5ndWFnZX3nv7vora8+XG5cbiAgICAgICAgICAgICAgICAtLS1cblxuICAgICAgICAgICAgICAgIOWPpeWtkO+8mlwie3NlbGVjdGlvbn1cIlxuXG4gICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgZGVmYXVsdFByb21wdCA9IHtcbiAgICAgICAgJ3RpdGxlJzogJ0RlZmF1bHQnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBnZXRVbnNwbGFzaEltYWdlcywgJ3VzZXJQcm9tcHQnOiB1c2VyUHJvbXB0LFxuICAgICAgICAnaWQnOiAnRGVmYXVsdCdcbiAgICB9O1xuICAgIHJldHVybiBkZWZhdWx0UHJvbXB0O1xufTtcbmV4cG9ydHMuZ2V0RGVmYXVsdFByb21wdCA9IGdldERlZmF1bHRQcm9tcHQ7XG5jb25zdCBnZXRJbml0aWFsUHJvbXB0ID0gKGtleVdvcmQsIGN1cnJlbnRMYW5ndWFnZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgLy/liKTmlq3nlKjmiLfmmK/lkKborr7nva7kuoYgQVBJIEtlee+8jOacquiuvue9ruWImem7mOiupOS9v+eUqOWcqOe6v+ivjeWFuFxuICAgIGNvbnN0IGlzU2V0S2V5ID0geWllbGQgKDAsIHV0aWxfMS5nZXRTZXR0aW5ncykoKS50aGVuKChpdGVtcykgPT4ge1xuICAgICAgICBpZiAoaXRlbXMuYXBpS2V5U2VsZWN0aW9uID09PSAnbGljZW5zZUtleScgJiYgaXRlbXMubGljZW5zZUtleS5sZW5ndGggPCA1KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXRlbXMuYXBpS2V5U2VsZWN0aW9uID09PSAnbXlPd25PcGVuQWlLZXknICYmIGl0ZW1zLm9wZW5BcGlLZXkubGVuZ3RoIDwgNSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoaXNTZXRLZXkpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFByb21wdCA9ICgwLCBleHBvcnRzLmdldERlZmF1bHRQcm9tcHQpKGtleVdvcmQsIGN1cnJlbnRMYW5ndWFnZSk7XG4gICAgICAgIHJldHVybiBkZWZhdWx0UHJvbXB0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8g5rKh5pyJ6K6+572uIEFwaSBLZXlcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuZGljdGlvbmFyeVByb21wdDtcbiAgICB9XG59KTtcbmV4cG9ydHMuZ2V0SW5pdGlhbFByb21wdCA9IGdldEluaXRpYWxQcm9tcHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TaG9ydGN1dEJ1dHRvbiA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHN0eWxlZF9jb21wb25lbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInN0eWxlZC1jb21wb25lbnRzXCIpKTtcbmNvbnN0IHJlYWN0X2ljb25zXzEgPSByZXF1aXJlKFwiQHJhZGl4LXVpL3JlYWN0LWljb25zXCIpO1xuY29uc3QgU2NvdXRlckJ1dHRvbiA9IHN0eWxlZF9jb21wb25lbnRzXzEuZGVmYXVsdC5idXR0b24gYFxuICAgIFxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgcGFkZGluZzogNHB4IDhweDtcblxuICAgICY6aG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjZGNkY2O1xuICAgIH1cblxuYDtcbmNvbnN0IFNjb3V0ZXJCdXR0b25Cb3ggPSBzdHlsZWRfY29tcG9uZW50c18xLmRlZmF1bHQuZGl2IGBcblxuZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG5iYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuY29sb3I6IHJnYigwIDAgMCAvIDgwJSk7XG5oZWlnaHQ6MzJweDtcblxuZm9udC1zaXplOjE0cHg7XG5cbmRpc3BsYXk6IGZsZXg7XG5mbGV4LWRpcmVjdGlvbjogcm93O1xuYWxpZ24taXRlbXM6IGNlbnRlcjtcblxucG9zaXRpb246IGFic29sdXRlO1xudG9wOiAke3Byb3BzID0+IHByb3BzLnRvcH1weDtcbmxlZnQ6ICR7cHJvcHMgPT4gcHJvcHMubGVmdH1weDtcbnotaW5kZXg6IDk5OTtcblxuYm94LXNoYWRvdzogMHB4IDhweCAyOHB4IHJnYmEoMCwwLDAsLjE2KTtcbmJvcmRlci1yYWRpdXM6IDRweDtcbmJvcmRlcjoxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMDYpXG5cbmA7XG5mdW5jdGlvbiBTaG9ydGN1dEJ1dHRvbihwcm9wcykge1xuICAgIC8vIC8vIOiuvue9ruWIneWni+WdkOagh+S4uiAoMCwgMClcbiAgICBjb25zdCBbcG9zaXRpb24sIHNldFBvc2l0aW9uXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7IHg6IDAsIHk6IDAgfSk7XG4gICAgY29uc3QgYnV0dG9uUmVmID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgLy/orr7nva7mjInpkq7kvY3nva5cbiAgICAgICAgbGV0IGxlZnQgPSBwcm9wcy5wb3NpdGlvbi54O1xuICAgICAgICBsZXQgdG9wID0gcHJvcHMucG9zaXRpb24ueTtcbiAgICAgICAgaWYgKGJ1dHRvblJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICBjb25zdCBidXR0b25XaWR0aCA9IGJ1dHRvblJlZi5jdXJyZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uSGVpZ2h0ID0gYnV0dG9uUmVmLmN1cnJlbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgLy8g5aaC5p6c6LaF5Ye65Y+z5L6n6L6555WM77yM5ZCR5bem6LCD5pW0XG4gICAgICAgICAgICBpZiAobGVmdCArIGJ1dHRvbldpZHRoID4gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gd2luZG93LmlubmVyV2lkdGggLSBidXR0b25XaWR0aCAtIDEwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gLy8g5aaC5p6c6LaF5Ye65bqV6YOo6L6555WM77yM5ZCR5LiK6LCD5pW0XG4gICAgICAgICAgICAvLyBpZiAodG9wICsgYnV0dG9uSGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgICAgICAvLyAgICAgdG9wID0gd2luZG93LmlubmVySGVpZ2h0IC0gYnV0dG9uSGVpZ2h0O1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvcHMucG9zaXRpb24ueClcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb3BzLnBvc2l0aW9uLnkpICAgXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnPT09JylcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGJ1dHRvbldpZHRoKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGJ1dHRvbkhlaWdodCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnPT09JylcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdpbmRvdy5pbm5lcldpZHRoKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0UG9zaXRpb24oeyB4OiBsZWZ0LCB5OiB0b3AgfSk7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoU2NvdXRlckJ1dHRvbkJveCwgeyByZWY6IGJ1dHRvblJlZiwgbGVmdDogcG9zaXRpb24ueCwgdG9wOiBwb3NpdGlvbi55IH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4JyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdycsXG4gICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFNjb3V0ZXJCdXR0b24sIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAvLyBtYXJnaW5SaWdodDogJzRweCdcbiAgICAgICAgICAgICAgICB9LCBjbGFzc05hbWU6IFwiU2hvcnRjdXRCdXR0b25cIiwgb25DbGljazogKCkgPT4gcHJvcHMuaGFuZGxlU2hvcnRjdXRCdXR0b25DbGljayh0cnVlKSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ljb25zXzEuUGFwZXJQbGFuZUljb24sIHsgc3R5bGU6IHsgbWFyZ2luUmlnaHQ6ICc0cHgnIH0gfSksXG4gICAgICAgICAgICAgICAgXCJSdW5cIiksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChTY291dGVyQnV0dG9uLCB7IGNsYXNzTmFtZTogXCJTaG9ydGN1dEJ1dHRvblwiLCBvbkNsaWNrOiAoKSA9PiBwcm9wcy5oYW5kbGVTaG9ydGN1dEJ1dHRvbkNsaWNrKGZhbHNlKSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ljb25zXzEuT3BlbkluTmV3V2luZG93SWNvbiwgeyBzdHlsZTogeyBtYXJnaW5SaWdodDogJzRweCcgfSB9KSxcbiAgICAgICAgICAgICAgICBcIiBPcGVuXCIpKSkpO1xufVxuZXhwb3J0cy5TaG9ydGN1dEJ1dHRvbiA9IFNob3J0Y3V0QnV0dG9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZXREb25vdENsb3NlUG9wdXBDYXJkID0gZXhwb3J0cy5waW5Qb3B1cENhcmQgPSB2b2lkIDA7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHJlYWN0X2RvbV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuY29uc3QgUG9wdXBDYXJkXzEgPSByZXF1aXJlKFwiLi4vUG9wdXBDYXJkXCIpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCBjc3NpbmpzXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vY3NzaW5qc1wiKTtcbmNvbnN0IHN0eWxlZF9jb21wb25lbnRzXzEgPSByZXF1aXJlKFwic3R5bGVkLWNvbXBvbmVudHNcIik7XG5jb25zdCB1c2VySW5mb18xID0gcmVxdWlyZShcIi4uL2xpYi91c2VySW5mb1wiKTtcbmNvbnN0IGxhbmdfMSA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbmNvbnN0IGxvY2FsZV8xID0gcmVxdWlyZShcIi4uL2xpYi9sb2NhbGVcIik7XG5jb25zdCB1c2VySW5mb18yID0gcmVxdWlyZShcIi4uL2xpYi91c2VySW5mb1wiKTtcbi8vIGltcG9ydCB7IEJ1dHRvbiwgbWVzc2FnZSB9IGZyb20gJ2FudGQnO1xuY29uc3QgaWNvbnNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9pY29uc1wiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuY29uc3QgbGFuZ18yID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xuY29uc3QgdXRpbF8yID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG5jb25zdCBzdHlsZV8xID0gcmVxdWlyZShcIi4uL1BvcHVwQ2FyZC9zdHlsZVwiKTtcbmNvbnN0IFNob3J0Y3V0QnV0dG9uXzEgPSByZXF1aXJlKFwiLi9TaG9ydGN1dEJ1dHRvblwiKTtcbmNvbnN0IGljb24xMjhfcG5nXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2Fzc2V0cy9pY29uMTI4LnBuZ1wiKSk7XG5jb25zdCBzdHlsZWRfY29tcG9uZW50c18yID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKSk7XG5jb25zdCBpc0ZpcmVmb3ggPSB0eXBlb2YgSW5zdGFsbFRyaWdnZXIgIT09ICd1bmRlZmluZWQnO1xuLy8g5a655Zmo57G755uuXG5jb25zdCBDT05UQUlORVJfQ0xBU1NOQU1FID0gJ2NvbnRhaW5lcic7XG5jb25zdCBTSE9SVENVVF9CVVRUT05fQ0xBU1NOQU1FID0gJ1Nob3J0Y3V0QnV0dG9uQ29udGFpbmVyJztcbi8vIOiusOW9leW9k+WJjeeql+WPo+aYr+WQpiBQaW4g5L2PXG5sZXQgaXNQaW4gPSBmYWxzZTtcbi8vIOiuvue9ruW9k+WJjeeql+WPo+aYr+WQpuWFgeiuuOWFs+mXrVxubGV0IGRvbm90Q2xvc2VQb3B1cENhcmQgPSBmYWxzZTtcbi8vIOWIneWni+WMluS4u+WuueWZqO+8jOS4u+WuueWZqOeUqOadpeaMguWcqOWFqOWxgOagt+W8j++8jOWMheaLrOesrOS4ieaWuee7hOS7tueahOagt+W8j1xubGV0IE15Qm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ19famlhbmctc2NvdXRlcicpO1xuLy8gY29uc29sZS5sb2coTXlCb3gpO1xuLy8gY29udGFpbmVyIOaJv+i9veS4u+eql+WPo+eahCBVSSDnu4Tku7ZcbmxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnRhaW5lci5jbGFzc05hbWUgPSBDT05UQUlORVJfQ0xBU1NOQU1FO1xuLy8g5L2/55SoIHNoYWRvdyDmnaXpmpTnprvmoLflvI9cbmxldCBzaGFkb3dSb290ID0gdW5kZWZpbmVkO1xuaWYgKE15Qm94ID09PSBudWxsIHx8IE15Qm94ID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyDlpoLmnpzkuI3lrZjlnKjlrrnlmahcbiAgICAvLyDliJvlu7rkuLvlrrnlmahcbiAgICBNeUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIE15Qm94LmlkID0gJ19famlhbmctc2NvdXRlcic7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5hcHBlbmRDaGlsZChNeUJveCk7XG4gICAgLy8gTXlCb3guc3R5bGUuZGlzcGxheSA9ICdub25lJyAvL+m7mOiupOmakOiXj1xuICAgIE15Qm94LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHNoYWRvd1Jvb3QgPSBNeUJveCA9PT0gbnVsbCB8fCBNeUJveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogTXlCb3guYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QgPT09IG51bGwgfHwgc2hhZG93Um9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgIC8vIEFudCDnu4Tku7bmoLflvI9cbiAgICAvLyBjb25zdCBhbnRTdHlsZXNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgIC8vIGFudFN0eWxlc2hlZXQucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIC8vIGFudFN0eWxlc2hlZXQuaHJlZiA9ICdodHRwczovL2Nkbi5ib290Y2RuLm5ldC9hamF4L2xpYnMvYW50ZC80LjE3LjEvYW50ZC5taW4uY3NzJztcbiAgICAvLyBzaGFkb3dSb290LmFwcGVuZENoaWxkKGFudFN0eWxlc2hlZXQpO1xuICAgIC8vIFRhaWx3aW5kXG4gICAgY29uc3QgdGFpbHdpbmRTdHlsZXNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgIHRhaWx3aW5kU3R5bGVzaGVldC5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgdGFpbHdpbmRTdHlsZXNoZWV0LmhyZWYgPSAnaHR0cHM6Ly91bnBrZy5jb20vdGFpbHdpbmRjc3NAXjIvZGlzdC90YWlsd2luZC5taW4uY3NzJztcbiAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKHRhaWx3aW5kU3R5bGVzaGVldCk7XG4gICAgLy8g5ZyoIFNoYWRvdyBET00g5Lit5re75Yqg5qC35byP77yaXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlLnRleHRDb250ZW50ID0gc3R5bGVfMS5wb3B1cENhcmRTdHlsZTtcbiAgICBzaGFkb3dSb290ID09PSBudWxsIHx8IHNoYWRvd1Jvb3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuLy8g55So5oi35LuY6LS554q25oCB562J5L+h5oGv44CB55So5oi355qEIEFua2kg5L+h5oGvXG5sZXQgVVNFUl9JTkZPID0geyB1c2VySWQ6ICd1bmtub3cnLCB2ZXJpZmllZDogZmFsc2UsIGNvbnRleHRNZW51OiBmYWxzZSB9O1xubGV0IEFOS0lfSU5GTyA9IHsgZGVmYXVsdERlY2tOYW1lOiAnJywgZGVja3M6IFtdLCBtb2RlbHM6IFtdIH07XG4vLyDojrflj5bnlKjmiLfkv6Hmga9cbmNvbnN0IHRoaXNHZXRVc2VySW5mbyA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHRyeSB7XG4gICAgICAgIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICAgICAgICAvLyBVU0VSX0lORk8gPSBhd2FpdCBnZXRVc2VySW5mbygpXG4gICAgICAgIFVTRVJfSU5GTyA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2dldFVzZXJJbmZvJywgJ21lc3NhZ2VzJzoge30sIH0pO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgICAvLyDojrflj5YgQW5raSBkZWNrc1xuICAgIGNvbnN0IGRlY2tzID0geWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW5raUFjdGlvbicsICdtZXNzYWdlcyc6IHsgJ2Fua2lfYWN0aW9uX3R5cGUnOiAnZGVja05hbWVzJywgJ2Fua2lfYXJndW1lbnRzJzoge30gfSwgfSk7XG4gICAgQU5LSV9JTkZPLmRlY2tzID0gZGVja3MucmVzdWx0O1xuICAgIC8vIOiOt+WPliBBbmtpIG1vZGVscyDlkozpu5jorqTnmoQgRGVjayDlkI3np7BcbiAgICBjb25zdCBtb2RlbHNBbmREZWNrID0geWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnc2V0TW9kZWwnLCAnbWVzc2FnZXMnOiB7fSwgfSk7XG4gICAgQU5LSV9JTkZPLm1vZGVscyA9IG1vZGVsc0FuZERlY2suZGF0YS5tb2RlbERhdGE7XG4gICAgQU5LSV9JTkZPLmRlZmF1bHREZWNrTmFtZSA9IG1vZGVsc0FuZERlY2suZGF0YS5kZWZhdWx0RGVja05hbWU7XG4gICAgLy8g5pu05pawIEFua2kgc3R5bGVcbiAgICB0cnkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEFOS0lfSU5GTy5tb2RlbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSB7XG4gICAgICAgICAgICAgICAgXCJtb2RlbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBBTktJX0lORk8ubW9kZWxzW2ldWydtb2RlbE5hbWUnXSxcbiAgICAgICAgICAgICAgICAgICAgXCJjc3NcIjogdXRpbF8yLmNhcmRTdHlsZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyDmm7TmlrAgc3R5bGVcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2Fua2lBY3Rpb24nLCAnbWVzc2FnZXMnOiB7ICdhbmtpX2FjdGlvbl90eXBlJzogJ3VwZGF0ZU1vZGVsU3R5bGluZycsICdhbmtpX2FyZ3VtZW50cyc6IHAgfSwgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICB9XG4gICAgLy8g6I635Y+WIEFua2kg54mM57uE5L+h5oGvXG4gICAgLy8gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnc2V0TW9kZWwnLCAnbWVzc2FnZXMnOiB7fSwgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgLy8gICBBTktJX0lORk8ubW9kZWxzID0gcmVzdWx0LmRhdGFcbiAgICAvLyAgIC8vIOabtOaWsCBBbmtpIHN0eWxlXG4gICAgLy8gICB0cnkge1xuICAgIC8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEFOS0lfSU5GTy5tb2RlbHMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyAgICAgICBjb25zdCBwID0ge1xuICAgIC8vICAgICAgICAgXCJtb2RlbFwiOiB7XG4gICAgLy8gICAgICAgICAgIFwibmFtZVwiOiBBTktJX0lORk8ubW9kZWxzW2ldWydtb2RlbE5hbWUnXSxcbiAgICAvLyAgICAgICAgICAgXCJjc3NcIjogY2FyZFN0eWxlXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICAgIC8vIOiOt+WPliBBbmtpIOeJjOe7hOS/oeaBr1xuICAgIC8vICAgICAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2Fua2lBY3Rpb24nLCAnbWVzc2FnZXMnOiB7ICdhbmtpX2FjdGlvbl90eXBlJzogJ3VwZGF0ZU1vZGVsU3R5bGluZycsICdhbmtpX2FyZ3VtZW50cyc6IHAgfSwgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgLy8gICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgIC8vICAgICAgIH0pXG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gICB9XG4gICAgLy8gfSlcbn0pO1xubGV0IHBvcnQgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgbmFtZTogJ2Zyb21Db250ZW50U2NyaXB0J1xufSk7XG4vLyDmjqXmlLYgYmFja2dyb3VuZCDmtojmga/vvIjnm67liY3mmK/pgJrov4fmtY/op4jlmajnmoTlj7PplK7oj5zljZXjgIHlv6vmjbfplK7op6blj5HvvIlcbndlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKG1zZywgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICB2YXIgX2E7XG4gICAgLy8gY29uc29sZS5sb2coJ2NvbnRlbnQgc2NyaXB0IG9uTWVzc2FnZTonKTtcbiAgICAvLyBjb25zb2xlLmxvZyhtc2cpO1xuICAgIGlmIChtc2cudHlwZSA9PT0gJ29wZW4tc2NvdXRlcicpIHtcbiAgICAgICAgLy8g5aSE55CG56qX5Y+jXG4gICAgICAgIGlmIChNeUJveCAhPT0gbnVsbCAmJiBNeUJveCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyDlpoLmnpzlt7LlrZjlnKjlrrnlmahcbiAgICAgICAgICAgIGlmICgoKF9hID0gTXlCb3guc2hhZG93Um9vdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnF1ZXJ5U2VsZWN0b3IoJy4nICsgQ09OVEFJTkVSX0NMQVNTTkFNRSkpID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c5LiN5a2Y5ZyoIFBvcHVwQ2FyZFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBDT05UQUlORVJfQ0xBU1NOQU1FO1xuICAgICAgICAgICAgICAgIHNoYWRvd1Jvb3QgPT09IG51bGwgfHwgc2hhZG93Um9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5YGc5q2i5pen55qE5a+56K+dXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvLyDph43mlrDpk77mjqVcbiAgICAgICAgICAgICAgICBwb3J0ID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLmNvbm5lY3Qoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZnJvbUNvbnRlbnRTY3JpcHQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ1N0b3BUaGVDb252ZXJzYXRpb24nLCAnbWVzc2FnZXMnOiAnJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE15Qm94LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICAgICAgICAvLyDnp7vpmaTml6flhoXlrrnvvIzpgb/lhY0gMiDmrKHmuLLmn5Pmt7fmnYLlnKjkuIDotbdcbiAgICAgICAgICAgIC8vIGNvbnRhaW5lci5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+S4jeWtmOWcqCBCb3gg5a655ZmoJyk7XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBDT05UQUlORVJfQ0xBU1NOQU1FO1xuICAgICAgICAgICAgc2hhZG93Um9vdCA9PT0gbnVsbCB8fCBzaGFkb3dSb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSBnZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgLy8g5pi+56S656qX5Y+jXG4gICAgICAgIGlmIChzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmtleVdvcmQgIT09ICcnKSB7XG4gICAgICAgICAgICBzaG93UG9wdXBDYXJkKHsgJ2tleVdvcmQnOiBzZWxlY3Rpb24gPT09IG51bGwgfHwgc2VsZWN0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZWxlY3Rpb24ua2V5V29yZCwgJ1NlbnRlbmNlJzogc2VsZWN0aW9uLnNlbnRlbmNlIH0sIHdpbmRvdy5nZXRTZWxlY3Rpb24oKSwgY29udGFpbmVyLCBzaGFkb3dSb290LCBpc1BpbiwgbXNnLnJ1blByb21wdCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gLy8g55uR5ZCs6aG16Z2i54K55Ye75LqL5Lu2XG4gICAgICAgIC8vIGRvY3VtZW50Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vICAgaWYgKE15Qm94ICE9PSB1bmRlZmluZWQgJiYgTXlCb3ggIT09IG51bGwgJiYgIWlzUGluICYmICFkb25vdENsb3NlUG9wdXBDYXJkKSB7XG4gICAgICAgIC8vICAgICAvLyDlpoLmnpzngrnlh7vnmoTkuI3mmK/mj5Lku7bnqpflj6Plj4rlhbblrZDlhYPntKDvvIzliJnlhbPpl63nqpflj6NcbiAgICAgICAgLy8gICAgIGlmIChNeUJveCAhPT0gZXZlbnQudGFyZ2V0ICYmICFNeUJveC5jb250YWlucyhldmVudC50YXJnZXQgYXMgTm9kZSkpIHtcbiAgICAgICAgLy8gICAgICAgLy8g6ZqQ6JeP56qX5Y+jXG4gICAgICAgIC8vICAgICAgIGNvbnRhaW5lci5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgICAgICAvLyAgICAgICAvLyBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzZWxlY3Rpb25jaGFuZ2UnLCBoYW5kbGVTZWxlY3Rpb25jaGFuZ2UpO1xuICAgICAgICAvLyAgICAgICAvLyBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2V1cCk7XG4gICAgICAgIC8vICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSlcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gY29udGFpbmVyLm9ubW91c2Vkb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIC8vICAgLy8g6ZqQ6JePIHNldEFua2lTcGFjZUJ1dHRvblxuICAgICAgICAvLyAgIGNvbnN0IGNvbnRleHRCb3ggPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGV4dEJveDInKVswXVxuICAgICAgICAvLyAgIGlmIChjb250ZXh0Qm94KSB7XG4gICAgICAgIC8vICAgICAvLyDngrnlh7vnmoTkuI3mmK8gc2V0QW5raVNwYWNlQnV0dG9uIOaXtuaJjemakOiXj1xuICAgICAgICAvLyAgICAgaWYgKGNvbnRleHRCb3ggIT09IGV2ZW50LnRhcmdldCAmJiAhY29udGV4dEJveC5jb250YWlucyhldmVudC50YXJnZXQgYXMgTm9kZSkpIHtcbiAgICAgICAgLy8gICAgICAgY29udGV4dEJveC5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChjb250ZXh0Qm94KVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gfVxuICAgIH1cbn0pO1xuLy8g5pi+56S65bqU55So56qX5Y+jXG5mdW5jdGlvbiBzaG93UG9wdXBDYXJkKGRhdGEsIG1zZywgTXlCb3gsIHNoYWRvd1Jvb3QsIGlzUGluLCBydW5Qcm9tcHQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmxvZygn5pi+56S65bqU55So56qX5Y+jJyk7XG4gICAgICAgIGxldCBsYW5nID0geWllbGQgKDAsIGxhbmdfMS5mZXRjaGN1cnJlbnRMYW5ndWFnZSkoKTtcbiAgICAgICAgcmVhY3RfZG9tXzEuZGVmYXVsdC5yZW5kZXIocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LlN0cmljdE1vZGUsIG51bGwsXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChsb2NhbGVfMS5DdXJyZW50TGFuZ3VhZ2VDb250ZXh0LlByb3ZpZGVyLCB7IHZhbHVlOiBsYW5nIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQodXNlckluZm9fMi5Vc2VySW5mb0NvbnRleHQuUHJvdmlkZXIsIHsgdmFsdWU6IHsgdXNlcjogVVNFUl9JTkZPLCBhbmtpOiBBTktJX0lORk8gfSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChjc3NpbmpzXzEuU3R5bGVQcm92aWRlciwgeyBjb250YWluZXI6IHNoYWRvd1Jvb3QgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHN0eWxlZF9jb21wb25lbnRzXzEuU3R5bGVTaGVldE1hbmFnZXIsIHsgdGFyZ2V0OiBzaGFkb3dSb290IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUG9wdXBDYXJkXzEuUG9wdXBDYXJkLCB7IGRhdGE6IGRhdGEsIHNlbGVjdGlvbjogbXNnLCBydW5Qcm9tcHQ6IHJ1blByb21wdCwgaXNQaW46IGlzUGluIH0pKSkpKSksIE15Qm94KTtcbiAgICB9KTtcbn1cbi8vIGludGVyZmFjZSBQb3B1cENhcmRDb250ZXh0UHJvcHMge1xuLy8gICBkYXRhOiBhbnk7XG4vLyAgIHNlbGVjdGlvbjogYW55O1xuLy8gICBydW5Qcm9tcHQ6IGJvb2xlYW47XG4vLyB9XG4vLyBmdW5jdGlvbiBQb3B1cENhcmRDb250ZXh0KHByb3BzOiBQb3B1cENhcmRDb250ZXh0UHJvcHMpIHtcbi8vICAgY29uc3QgW3VzZXJJbmZvLCBzZXRVc2VySW5mb10gPSB1c2VTdGF0ZTx1c2VySW5mb1R5cGUgfCBudWxsPihudWxsKTtcbi8vICAgY29uc3QgW2xhbmcsIHNldExhbmddID0gdXNlU3RhdGU8YW55PihudWxsKTtcbi8vICAgdXNlRWZmZWN0KCgpID0+IHtcbi8vICAgICBhc3luYyBmdW5jdGlvbiBmZXRjaFVzZXJJbmZvKCkge1xuLy8gICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IGdldFVzZXJJbmZvKCk7XG4vLyAgICAgICBjb25zdCBsYW5nID0gYXdhaXQgZmV0Y2hjdXJyZW50TGFuZ3VhZ2UoKVxuLy8gICAgICAgc2V0TGFuZyhsYW5nKVxuLy8gICAgICAgc2V0VXNlckluZm8oaW5mbyk7XG4vLyAgICAgfVxuLy8gICAgIGZldGNoVXNlckluZm8oKTtcbi8vICAgfSwgW10pOyAgLy8g6LeR5LiA5qyh77yM5LiN5L6d6LWW5Lu75L2V5aSW6YOo5Y+Y6YePXG4vLyAgIHJldHVybiAoXG4vLyAgICAgPEN1cnJlbnRMYW5ndWFnZUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e2xhbmd9PlxuLy8gICAgICAgPFVzZXJJbmZvQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17VVNFUl9JTkZPfT5cbi8vICAgICAgICAgPFN0eWxlUHJvdmlkZXIgY29udGFpbmVyPXtzaGFkb3dSb290fT5cbi8vICAgICAgICAgICA8U3R5bGVTaGVldE1hbmFnZXIgdGFyZ2V0PXtzaGFkb3dSb290fT5cbi8vICAgICAgICAgICAgIDxQb3B1cENhcmQgZGF0YT17cHJvcHMuZGF0YX0gc2VsZWN0aW9uPXtwcm9wcy5zZWxlY3Rpb259IHJ1blByb21wdD17cHJvcHMucnVuUHJvbXB0fSBpc1Bpbj17aXNQaW59IC8+XG4vLyAgICAgICAgICAgPC9TdHlsZVNoZWV0TWFuYWdlcj5cbi8vICAgICAgICAgPC9TdHlsZVByb3ZpZGVyPlxuLy8gICAgICAgPC9Vc2VySW5mb0NvbnRleHQuUHJvdmlkZXI+XG4vLyAgICAgPC9DdXJyZW50TGFuZ3VhZ2VDb250ZXh0LlByb3ZpZGVyPlxuLy8gICApXG4vLyB9XG5jb25zdCBwaW5Qb3B1cENhcmQgPSAodmFsdWUpID0+IHtcbiAgICBpc1BpbiA9IHZhbHVlO1xufTtcbmV4cG9ydHMucGluUG9wdXBDYXJkID0gcGluUG9wdXBDYXJkO1xuY29uc3Qgc2V0RG9ub3RDbG9zZVBvcHVwQ2FyZCA9ICh2YWx1ZSkgPT4ge1xuICAgIGRvbm90Q2xvc2VQb3B1cENhcmQgPSB2YWx1ZTtcbn07XG5leHBvcnRzLnNldERvbm90Q2xvc2VQb3B1cENhcmQgPSBzZXREb25vdENsb3NlUG9wdXBDYXJkO1xuLy8gY29uc3QgaGFuZGxlU2VsZWN0aW9uY2hhbmdlID0gKCkgPT4ge1xuLy8gICBsZXQgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuLy8gICBpZiAoc2VsZWN0aW9uKSB7XG4vLyAgICAgY29uc29sZS5sb2coJ3NlbGVjdGlvbi50b1N0cmluZygpOicpO1xuLy8gICAgIGNvbnNvbGUubG9nKHNlbGVjdGlvbi50b1N0cmluZygpKTtcbi8vICAgICBpc1RleHRTZWxlY3RlZCA9IHNlbGVjdGlvbi50b1N0cmluZygpLmxlbmd0aCA+IDA7XG4vLyAgIH1cbi8vIH1cbmxldCBpc1RleHRTZWxlY3RlZCA9IGZhbHNlO1xubGV0IGxhc3RTZWxlY3Rpb24gPSB7XG4gICAgYW5jaG9yTm9kZTogbnVsbCxcbiAgICBhbmNob3JPZmZzZXQ6IDAsXG4gICAgZm9jdXNOb2RlOiBudWxsLFxuICAgIGZvY3VzT2Zmc2V0OiAwLFxufTtcbmNvbnN0IGhhbmRsZU1vdXNldXAgPSAoZXZlbnQpID0+IHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnN0IGlzSW5TaGFkb3cgPSBNeUJveCA9PT0gZXZlbnQudGFyZ2V0IHx8IChNeUJveCA9PT0gbnVsbCB8fCBNeUJveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogTXlCb3guY29udGFpbnMoZXZlbnQudGFyZ2V0KSk7XG4gICAgLy8g6I635Y+W55So5oi35Zyo5a6/5Li7572R6aG15LiK6YCJ5Lit55qE5YaF5a65XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gZ2V0U2VsZWN0aW9uKGlzSW5TaGFkb3cpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVNb3VzZXVwJyk7XG4gICAgLy8gY29uc29sZS5sb2coaXNUZXh0U2VsZWN0ZWQpO1xuICAgIC8vIGNvbnNvbGUubG9nKGRvbm90Q2xvc2VQb3B1cENhcmQpO1xuICAgIC8vIGNvbnNvbGUubG9nKHNlbGVjdGlvbik7XG4gICAgLy8gY29uc29sZS5sb2coaXNJblNoYWRvdyk7XG4gICAgaWYgKHNlbGVjdGlvbikge1xuICAgICAgICBpc1RleHRTZWxlY3RlZCA9IHNlbGVjdGlvbi5zZWxlY3Rpb24udG9TdHJpbmcoKS5sZW5ndGggPiAwO1xuICAgIH1cbiAgICAvLyDmnInpgInkuK3mloflrZfkuJTmnKrlvIDlkK8gUHJvbXB0IOiuvue9rueVjOmdou+8iOWmguaenOW8gOWQryBQcm9tcHQg6K6+572u55WM6Z2i6ICM5LuN54S25omn6KGM5p+l6K+i5Lu75Yqh5pe277yM5Lya5a+86Ie05LiN5b+F6KaB55qE5Lu75Yqh5omn6KGM77yJXG4gICAgaWYgKGlzVGV4dFNlbGVjdGVkICYmICFkb25vdENsb3NlUG9wdXBDYXJkKSB7XG4gICAgICAgIGlmICghaXNJblNoYWRvdykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgICAgICAgICAgLy8g5ZyoIFBvcHVwQ2FyZCDojIPlm7TlpJbop6blj5FcbiAgICAgICAgICAgIC8vIGlzVGV4dFNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAvLyDlgZzmraLml6fnmoTlr7nor51cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ1N0b3BUaGVDb252ZXJzYXRpb24nLCAnbWVzc2FnZXMnOiAnJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIC8vIOmHjeaWsOmTvuaOpVxuICAgICAgICAgICAgICAgIHBvcnQgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdmcm9tQ29udGVudFNjcmlwdCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnU3RvcFRoZUNvbnZlcnNhdGlvbicsICdtZXNzYWdlcyc6ICcnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5pi+56S656qX5Y+jL+abtOaWsOeql+WPo+S/oeaBr1xuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbiAmJiAoc2VsZWN0aW9uID09PSBudWxsIHx8IHNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VsZWN0aW9uLmtleVdvcmQubGVuZ3RoKSA+IDAgJiYgaXNQaW4gJiYgKChfYSA9IHNlbGVjdGlvbi5zZWxlY3Rpb24uYW5jaG9yTm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5vZGVOYW1lKSA9PT0gJyN0ZXh0Jykge1xuICAgICAgICAgICAgICAgIHNob3dQb3B1cENhcmQoeyAna2V5V29yZCc6IHNlbGVjdGlvbiA9PT0gbnVsbCB8fCBzZWxlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbGVjdGlvbi5rZXlXb3JkLCAnU2VudGVuY2UnOiBzZWxlY3Rpb24uc2VudGVuY2UgfSwgd2luZG93LmdldFNlbGVjdGlvbigpLCBjb250YWluZXIsIHNoYWRvd1Jvb3QsIGlzUGluLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIOWcqCBQb3B1cENhcmQg6IyD5Zu05YaF6Kem5Y+RXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRUZXh0O1xuICAgICAgICAgICAgLy8g5pi+56S65a6M5b2i5aGr56m65pON5L2c5oyJ6ZKuXG4gICAgICAgICAgICBpZiAoaXNGaXJlZm94KSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRUZXh0ID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRUZXh0ID0gc2hhZG93Um9vdC5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dFN0cmluZyA9IHNlbGVjdGVkVGV4dC50b1N0cmluZygpO1xuICAgICAgICAgICAgLy8gY29uc3Qgc2VudGVuY2UgPSAnJ1xuICAgICAgICAgICAgY29uc3QgUG9wdXBDYXJkQ29udGFpbmVyID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoQ09OVEFJTkVSX0NMQVNTTkFNRSlbMF07XG4gICAgICAgICAgICAvLyBjb25zdCBtZXNzYWdlc0JveCA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZXNzYWdlcycpWzBdXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzZWxlY3RlZFRleHQpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZXNCb3g/LmNvbnRhaW5zKHNlbGVjdGVkVGV4dC5iYXNlTm9kZS5wYXJlbnROb2RlIGFzIE5vZGUpKTtcbiAgICAgICAgICAgIC8vIGxldCBpc0luTWVzc2FnZXMgPSBmYWxzZVxuICAgICAgICAgICAgLy8gaWYgKHNlbGVjdGVkVGV4dC5iYXNlTm9kZSkge1xuICAgICAgICAgICAgLy8gICBpZiAobWVzc2FnZXNCb3ggPT09IHNlbGVjdGVkVGV4dC5iYXNlTm9kZS5wYXJlbnROb2RlIHx8IG1lc3NhZ2VzQm94Py5jb250YWlucyhzZWxlY3RlZFRleHQuYmFzZU5vZGUucGFyZW50Tm9kZSBhcyBOb2RlKSkge1xuICAgICAgICAgICAgLy8gICAgIC8v5ZyoIG1lc3NhZ2VzIOWuueWZqOWGheaTjeS9nO+8jOWImeaYvuekuuaTjeS9nOaMiemSrlxuICAgICAgICAgICAgLy8gICAgIGlzSW5NZXNzYWdlcyA9IHRydWVcbiAgICAgICAgICAgIC8vICAgfVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgaWYgKFBvcHVwQ2FyZENvbnRhaW5lciAmJiBzZWxlY3RlZFRleHQudHlwZSA9PT0gJ1JhbmdlJyAmJiAhY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5jb250ZXh0Qm94MicpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRleHRCb3gyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY29udGV4dEJveDIuY2xhc3NOYW1lID0gJ2NvbnRleHRCb3gyJztcbiAgICAgICAgICAgICAgICBjb250ZXh0Qm94Mi5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICAgICAgICAgICAgUG9wdXBDYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRleHRCb3gyKTtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZ2UgPSBzZWxlY3RlZFRleHQuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgICAgICAgICByZWFjdF9kb21fMS5kZWZhdWx0LnJlbmRlcihyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudCh1c2VySW5mb18yLlVzZXJJbmZvQ29udGV4dC5Qcm92aWRlciwgeyB2YWx1ZTogeyB1c2VyOiBVU0VSX0lORk8sIGFua2k6IEFOS0lfSU5GTyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHN0eWxlZF9jb21wb25lbnRzXzEuU3R5bGVTaGVldE1hbmFnZXIsIHsgdGFyZ2V0OiBzaGFkb3dSb290IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChUb29sQmFyLCB7IHNlbGVjdGVkVGV4dDogc2VsZWN0ZWRUZXh0LmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIHNlbGVjdGVkVGV4dFN0cmluZzogc2VsZWN0ZWRUZXh0U3RyaW5nLCByYW5nZTogcmFuZ2UgfSkpKSwgY29udGV4dEJveDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFpc1RleHRTZWxlY3RlZCkge1xuICAgICAgICAvLyDmsqHmnInpgInkuK3ku7vkvZXmloflrZdcbiAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgICAgICAvLyDnp7vpmaTlv6vmjbfmjInpkq5cbiAgICAgICAgY29uc29sZS5sb2coJ+enu+mZpOW/q+aNt+aMiemSricpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IFNob3J0Y3V0QnV0dG9uQ29udGFpbmVyID0gc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcuJyArIFNIT1JUQ1VUX0JVVFRPTl9DTEFTU05BTUUpO1xuICAgICAgICAgICAgaWYgKFNob3J0Y3V0QnV0dG9uQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgKF9hID0gU2hvcnRjdXRCdXR0b25Db250YWluZXIucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZUNoaWxkKFNob3J0Y3V0QnV0dG9uQ29udGFpbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8g5pyJ6YCJ5Lit5paH5a2XXG4gICAgICAgIC8vIOaYvuekuuW/q+aNt+aMiemSrlxuICAgICAgICBpZiAoKChfYiA9IE15Qm94ID09PSBudWxsIHx8IE15Qm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBNeUJveC5zaGFkb3dSb290KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucXVlcnlTZWxlY3RvcignLicgKyBTSE9SVENVVF9CVVRUT05fQ0xBU1NOQU1FKSkgPT09IG51bGwgJiYgVVNFUl9JTkZPLmNvbnRleHRNZW51ICYmICFpc0luU2hhZG93KSB7XG4gICAgICAgICAgICAvLyDorrDlvZXmnIDov5HpgInkuK3nmoTmloflrZdcbiAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gc2VsZWN0aW9uID09PSBudWxsIHx8IHNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VsZWN0aW9uLnNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuICAgICAgICAgICAgbGFzdFNlbGVjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAvLyDkv53lrZjlkITkuKrlsZ7mgKfnmoTlvJXnlKjlkozlgLxcbiAgICAgICAgICAgICAgICBhbmNob3JOb2RlOiByYW5nZS5zdGFydENvbnRhaW5lcixcbiAgICAgICAgICAgICAgICBhbmNob3JPZmZzZXQ6IHJhbmdlLnN0YXJ0T2Zmc2V0LFxuICAgICAgICAgICAgICAgIGZvY3VzTm9kZTogcmFuZ2UuZW5kQ29udGFpbmVyLFxuICAgICAgICAgICAgICAgIGZvY3VzT2Zmc2V0OiByYW5nZS5lbmRPZmZzZXQsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8g5aaC5p6c5LiN5a2Y5Zyo5oyJ6ZKuXG4gICAgICAgICAgICBsZXQgU2hvcnRjdXRCdXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIFNob3J0Y3V0QnV0dG9uQ29udGFpbmVyLmNsYXNzTmFtZSA9IFNIT1JUQ1VUX0JVVFRPTl9DTEFTU05BTUU7XG4gICAgICAgICAgICBzaGFkb3dSb290ID09PSBudWxsIHx8IHNoYWRvd1Jvb3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoU2hvcnRjdXRCdXR0b25Db250YWluZXIpO1xuICAgICAgICAgICAgcmVhY3RfZG9tXzEuZGVmYXVsdC5yZW5kZXIocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LlN0cmljdE1vZGUsIG51bGwsXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoc3R5bGVkX2NvbXBvbmVudHNfMS5TdHlsZVNoZWV0TWFuYWdlciwgeyB0YXJnZXQ6IHNoYWRvd1Jvb3QgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoU2hvcnRjdXRCdXR0b25fMS5TaG9ydGN1dEJ1dHRvbiwgeyBwb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IGV2ZW50LnBhZ2VYICsgMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogZXZlbnQucGFnZVkgKyAxMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgaGFuZGxlU2hvcnRjdXRCdXR0b25DbGljazogKHJ1blByb21wdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIOmYu+atouS6i+S7tuWGkuazoVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgoX2EgPSBNeUJveCA9PT0gbnVsbCB8fCBNeUJveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogTXlCb3guc2hhZG93Um9vdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnF1ZXJ5U2VsZWN0b3IoJy4nICsgQ09OVEFJTkVSX0NMQVNTTkFNRSkpID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlpoLmnpzkuI3lrZjlnKggUG9wdXBDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBDT05UQUlORVJfQ0xBU1NOQU1FO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hhZG93Um9vdCA9PT0gbnVsbCB8fCBzaGFkb3dSb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3U2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDph43mlrDpgInkuK3liJLor43ljLrln59cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWIm+W7uuS4gOS4quiMg+WbtOWvueixoVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yTm9kZSA9IGxhc3RTZWxlY3Rpb24uYW5jaG9yTm9kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvY3VzTm9kZSA9IGxhc3RTZWxlY3Rpb24uZm9jdXNOb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFuY2hvck5vZGUgJiYgZm9jdXNOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L2/55So5L+d5a2Y55qEIHNlbGVjdGVkIFJhbmdlIOaBouWkjVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1JhbmdlLnNldFN0YXJ0KGFuY2hvck5vZGUsIGxhc3RTZWxlY3Rpb24gPT09IG51bGwgfHwgbGFzdFNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogbGFzdFNlbGVjdGlvbi5hbmNob3JPZmZzZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1JhbmdlLnNldEVuZChmb2N1c05vZGUsIGxhc3RTZWxlY3Rpb24gPT09IG51bGwgfHwgbGFzdFNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogbGFzdFNlbGVjdGlvbi5mb2N1c09mZnNldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+WIFNlbGVjdGlvbiDlr7nosaFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDnp7vpmaTmiYDmnInnjrDmnInnmoTpgInmi6lcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5re75Yqg5paw55qE6YCJ5Yy6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2VsZWN0aW9uLmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDnp7vpmaTlv6vmjbfmjInpkq5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgU2hvcnRjdXRCdXR0b25Db250YWluZXIgPSBzaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy4nICsgU0hPUlRDVVRfQlVUVE9OX0NMQVNTTkFNRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChTaG9ydGN1dEJ1dHRvbkNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKF9iID0gU2hvcnRjdXRCdXR0b25Db250YWluZXIucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnJlbW92ZUNoaWxkKFNob3J0Y3V0QnV0dG9uQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmmL7npLrnqpflj6NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1BvcHVwQ2FyZCh7ICdrZXlXb3JkJzogc2VsZWN0aW9uID09PSBudWxsIHx8IHNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VsZWN0aW9uLmtleVdvcmQsICdTZW50ZW5jZSc6IHNlbGVjdGlvbi5zZW50ZW5jZSB9LCBuZXdTZWxlY3Rpb24sIGNvbnRhaW5lciwgc2hhZG93Um9vdCwgaXNQaW4sIHJ1blByb21wdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSB9KSkpLCBTaG9ydGN1dEJ1dHRvbkNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9XG59O1xuY29uc3QgZ2V0U2VsZWN0aW9uID0gKGlzSW5TaGFkb3cpID0+IHtcbiAgICBsZXQgc2VsZWN0aW9uO1xuICAgIGlmIChpc0luU2hhZG93KSB7XG4gICAgICAgIHNlbGVjdGlvbiA9IHNoYWRvd1Jvb3QuZ2V0U2VsZWN0aW9uKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgfVxuICAgIGlmIChzZWxlY3Rpb24gIT09IG51bGwgJiYgc2VsZWN0aW9uLnJhbmdlQ291bnQgPiAwKSB7XG4gICAgICAgIC8vIOW9k+WJjemAieS4reeahOaWh+Wtl1xuICAgICAgICBsZXQga2V5V29yZCA9IHNlbGVjdGlvbi50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgICAgbGV0IHNlbnRlbmNlID0gJyc7XG4gICAgICAgIGxldCBwYXJlbnROb2RlID0gc2VsZWN0aW9uLmZvY3VzTm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAvLyDlpoLmnpzpgInkuK3nmoTmmK/kuIDkuKrmm7TlsI/nmoTlhYPntKDvvIjlpoI8ZW0+77yJ77yM5oiR5Lus6ZyA6KaB5ZCR5LiK5a+75om+XG4gICAgICAgIHdoaWxlIChwYXJlbnROb2RlLnRhZ05hbWUgJiYgKCFpc0Jsb2NrTGV2ZWwoKHBhcmVudE5vZGUudGFnTmFtZSB8fCB1bmRlZmluZWQpLnRvTG93ZXJDYXNlKCkpICYmIChwYXJlbnROb2RlLnRhZ05hbWUgfHwgdW5kZWZpbmVkKS50b0xvd2VyQ2FzZSgpICE9PSAnYm9keScpKSB7XG4gICAgICAgICAgICBwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzZW50ZW5jZXMgPSBzcGxpdEludG9TZW50ZW5jZXMocGFyZW50Tm9kZSk7XG4gICAgICAgIGxldCByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuICAgICAgICBsZXQgc3RhcnRPZmZzZXRTaGlmdCA9IDM7XG4gICAgICAgIGxldCBlbmRPZmZzZXRTaGlmdCA9IDM7XG4gICAgICAgIGlmIChyYW5nZS5zdGFydE9mZnNldCA+PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFyQmVmb3JlID0gcmFuZ2Uuc3RhcnRDb250YWluZXIudGV4dENvbnRlbnRbcmFuZ2Uuc3RhcnRPZmZzZXQgLSAxXTtcbiAgICAgICAgICAgIHN0YXJ0T2Zmc2V0U2hpZnQgPSAvW+OAgi7vvIEhP++8n10vLnRlc3QoY2hhckJlZm9yZSkgPyAwIDogMztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZ2UuZW5kT2Zmc2V0IDwgcmFuZ2UuZW5kQ29udGFpbmVyLnRleHRDb250ZW50Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYXJBZnRlciA9IHJhbmdlLmVuZENvbnRhaW5lci50ZXh0Q29udGVudFtyYW5nZS5lbmRPZmZzZXRdO1xuICAgICAgICAgICAgZW5kT2Zmc2V0U2hpZnQgPSAvW+OAgi7vvIEhP++8n10vLnRlc3QoY2hhckFmdGVyKSA/IDAgOiAzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyYW5nZS5lbmRPZmZzZXQgPT09IDAgfHwgaXNJblNoYWRvdykge1xuICAgICAgICAgICAgZW5kT2Zmc2V0U2hpZnQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGxldCBleHBhbmRlZFJhbmdlID0gcmFuZ2UuY2xvbmVSYW5nZSgpOyAvLyDlpI3liLblvZPliY3pgInkuK3nmoTojIPlm7Tlr7nosaFcbiAgICAgICAgLy8gZXhwYW5kUmFuZ2XnmoTojIPlm7TliY3lkI7lkITnp7vliqgz5Liq5a2X56ym77yI5aaC5p6c5Y+v5Lul55qE6K+d77yJXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBleHBhbmRlZFJhbmdlLnNldFN0YXJ0KHJhbmdlLnN0YXJ0Q29udGFpbmVyLCBNYXRoLm1heChyYW5nZS5zdGFydE9mZnNldCAtIHN0YXJ0T2Zmc2V0U2hpZnQsIDApKTtcbiAgICAgICAgICAgIGV4cGFuZGVkUmFuZ2Uuc2V0RW5kKHJhbmdlLmVuZENvbnRhaW5lciwgTWF0aC5taW4ocmFuZ2UuZW5kT2Zmc2V0ICsgZW5kT2Zmc2V0U2hpZnQsIHJhbmdlLmVuZENvbnRhaW5lci50ZXh0Q29udGVudC5sZW5ndGggLSAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6I635Y+W5YyF5ous5YWz6ZSu6K+N5YmN5ZCO5a2X56ym55qE5a2X56ym5LiyXG4gICAgICAgIGxldCBleHBhbmRlZFNlbGVjdGVkVGV4dCA9IGV4cGFuZGVkUmFuZ2UudG9TdHJpbmcoKTtcbiAgICAgICAgZm9yIChsZXQgcyBvZiBzZW50ZW5jZXMpIHtcbiAgICAgICAgICAgIGlmIChzLmluY2x1ZGVzKGV4cGFuZGVkU2VsZWN0ZWRUZXh0KSkge1xuICAgICAgICAgICAgICAgIHNlbnRlbmNlID0gcztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VudGVuY2UgPT09ICcnKSB7XG4gICAgICAgICAgICBzZW50ZW5jZSA9IHNlbGVjdGlvbi5hbmNob3JOb2RlLmRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coeyAnc2VsZWN0aW9uJzogc2VsZWN0aW9uLCAna2V5V29yZCc6IGtleVdvcmQsICdzZW50ZW5jZSc6IHNlbnRlbmNlIH0pO1xuICAgICAgICByZXR1cm4geyAnc2VsZWN0aW9uJzogc2VsZWN0aW9uLCAna2V5V29yZCc6IGtleVdvcmQsICdzZW50ZW5jZSc6IHNlbnRlbmNlIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8g5ouG5YiG5paH5pys5Li65Y+l5a2Q55qE5Ye95pWwXG4gICAgZnVuY3Rpb24gc3BsaXRJbnRvU2VudGVuY2VzKG5vZGUpIHtcbiAgICAgICAgbGV0IHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0ZW1wRGl2LmlubmVySFRNTCA9IG5vZGUuaW5uZXJIVE1MO1xuICAgICAgICBsZXQgcGxhaW5UZXh0ID0gdGVtcERpdi5pbm5lclRleHQ7XG4gICAgICAgIC8vIOWvueiLseaWh+WSjOaXpeivreeahOWkhOeQhlxuICAgICAgICBsZXQgc2VudGVuY2VzID0gcGxhaW5UZXh0LnNwbGl0KC9b44CCLu+8gSE/77yfXS8pO1xuICAgICAgICAvLyDliKDpmaTnqbrlj6XlrZBcbiAgICAgICAgc2VudGVuY2VzID0gc2VudGVuY2VzLmZpbHRlcigoc2VudGVuY2UpID0+IHNlbnRlbmNlLnRyaW0oKSAhPT0gXCJcIik7XG4gICAgICAgIHJldHVybiBzZW50ZW5jZXM7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzQmxvY2tMZXZlbCh0YWdOYW1lKSB7XG4gICAgICAgIGNvbnN0IGJsb2NrTGV2ZWxFbGVtZW50cyA9IFtcbiAgICAgICAgICAgICdhZGRyZXNzJywgJ2FydGljbGUnLCAnYXNpZGUnLCAnYmxvY2txdW90ZScsICdjYW52YXMnLCAnZGQnLCAnZGl2JywgJ2RsJyxcbiAgICAgICAgICAgICdkdCcsICdmaWVsZHNldCcsICdmaWdjYXB0aW9uJywgJ2ZpZ3VyZScsICdmb290ZXInLCAnZm9ybScsICdoMScsICdoMicsXG4gICAgICAgICAgICAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAnaGVhZGVyJywgJ2hyJywgJ2xpJywgJ21haW4nLCAnbmF2JywgJ25vc2NyaXB0JyxcbiAgICAgICAgICAgICdvbCcsICdvdXRwdXQnLCAncCcsICdwcmUnLCAnc2VjdGlvbicsICd0YWJsZScsICd0aGVhZCcsICd0cicsICd1bCdcbiAgICAgICAgXTtcbiAgICAgICAgcmV0dXJuIGJsb2NrTGV2ZWxFbGVtZW50cy5pbmNsdWRlcyh0YWdOYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgIH1cbn07XG5jb25zdCBzZXRBbmtpU3BhY2UgPSAocmFuZ2UsIHNlbGVjdGVkVGV4dCwgZXZlbnQsIGlzQWRkTmV3KSA9PiB7XG4gICAgbGV0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgYW5raVNwYWNlID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Fua2lTcGFjZScpO1xuICAgIC8vIOiOt+WPluW9k+WJjeacgOWkp+eahCBpbmRleFxuICAgIGxldCBtYXhJbmRleCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbmtpU3BhY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdGhpc0luZGV4ID0gTnVtYmVyKGFua2lTcGFjZVtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSk7XG4gICAgICAgIGlmICh0aGlzSW5kZXggPiBtYXhJbmRleCkge1xuICAgICAgICAgICAgbWF4SW5kZXggPSB0aGlzSW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IG51bWJlciA9IG1heEluZGV4ID09PSAwID8gMSA6IG1heEluZGV4O1xuICAgIGlmIChpc0FkZE5ldykge1xuICAgICAgICBudW1iZXIgPSBtYXhJbmRleCArIDE7XG4gICAgfVxuICAgIHNwYW4udGV4dENvbnRlbnQgPSAne3tjJyArIG51bWJlciArICc6OicgKyBzZWxlY3RlZFRleHQgKyAnfX0nO1xuICAgIHNwYW4uY2xhc3NOYW1lID0gJ2Fua2lTcGFjZSc7XG4gICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBudW1iZXIudG9TdHJpbmcoKSk7XG4gICAgc3Bhbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIOaBouWkjeS4uum7mOiupOagt+W8j1xuICAgICAgICAvLyBzcGFuLmlubmVyVGV4dFxuICAgICAgICBpZiAoc3Bhbi50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgLy8gbGV0IG9sZFRleHQgPSBzcGFuLnRleHRDb250ZW50XG4gICAgICAgICAgICAvLyBvbGRUZXh0ID0gb2xkVGV4dC5yZXBsYWNlKCd7e2MxOjonLCAnJylcbiAgICAgICAgICAgIC8vIG9sZFRleHQgPSBvbGRUZXh0LnJlcGxhY2UoJ319JywgJycpXG4gICAgICAgICAgICB2YXIgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzZWxlY3RlZFRleHQpO1xuICAgICAgICAgICAgKF9hID0gc3Bhbi5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVwbGFjZUNoaWxkKHRleHROb2RlLCBzcGFuKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmFuZ2UgPT09IG51bGwgfHwgcmFuZ2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7XG4gICAgcmFuZ2UgPT09IG51bGwgfHwgcmFuZ2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJhbmdlLmluc2VydE5vZGUoc3Bhbik7XG59O1xuY29uc3QgU3R5bGVkQnV0dG9uID0gc3R5bGVkX2NvbXBvbmVudHNfMi5kZWZhdWx0LmJ1dHRvbiBgXG4gICAgXG4gICAgd2lkdGg6IDE4cHg7XG4gICAgaGVpZ2h0OiAxOHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgIHBhZGRpbmc6IDJweDtcbiAgICBcblxuICAgICY6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLDAsNTksMC4wNTEpO1xuICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIH1cblxuICAgICR7cHJvcHMgPT4gcHJvcHMuJGRpc2FibGUgJiYgKDAsIHN0eWxlZF9jb21wb25lbnRzXzIuY3NzKSBgXG4gICAgICBvcGFjaXR5OiAwLjU7XG4gICAgICBjdXJzb3I6IGhlbHA7XG4gICAgYH1cblxuICAgIC8vICR7cHJvcHMgPT4gIXByb3BzLiRkaXNhYmxlICYmICgwLCBzdHlsZWRfY29tcG9uZW50c18yLmNzcykgYFxuICAgIC8vICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgIC8vIGB9XG5cblxuYDtcbmNvbnN0IEljb25CdXR0b24gPSBzdHlsZWRfY29tcG9uZW50c18yLmRlZmF1bHQuYnV0dG9uIGBcbiAgICBcbiAgICB3aWR0aDogMTZweDtcbiAgICBoZWlnaHQ6IDE2cHg7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICAgIGN1cnNvcjogZGVmYXVsdDtcblxuICAgICY6aG92ZXIge1xuICAgICAgb3BhY2l0eTogMC44O1xuICAgIH1cbmA7XG5mdW5jdGlvbiBUb29sQmFyKHByb3BzKSB7XG4gICAgY29uc3QgW3Nob3dNZW51LCBzZXRTaG93TWVudV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkodHJ1ZSk7XG4gICAgY29uc3QgQ29udGV4dEJveCA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3QgdXNlckluZm8gPSAoMCwgdXNlckluZm9fMS51c2VVc2VySW5mb0NvbnRleHQpKCk7XG4gICAgLy8gbGV0IHBvcnRGcm9tTWVudTogYW55XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRleHRCb3ggPSBDb250ZXh0Qm94LmN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IHBvcHVwQ2FyZCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjTGVhcm5pbmdFbmdsaXNoMjAyMycpO1xuICAgICAgICBjb25zdCBQb3B1cENhcmRDb250YWluZXIgPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShDT05UQUlORVJfQ0xBU1NOQU1FKVswXTtcbiAgICAgICAgY29uc3QgbWVzc2FnZXNCb3ggPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VzJyk7XG4gICAgICAgIC8v6K6+572u5oyJ6ZKu55qE5L2N572uXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dFggPSBwcm9wcy5zZWxlY3RlZFRleHQueDtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0WSA9IHByb3BzLnNlbGVjdGVkVGV4dC55O1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRXaWR0aCA9IHByb3BzLnNlbGVjdGVkVGV4dC53aWR0aDtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0SGVpZ2h0ID0gcHJvcHMuc2VsZWN0ZWRUZXh0LmhlaWdodDtcbiAgICAgICAgY29uc3QgYnV0dG9uWCA9IChjb250ZXh0Qm94ID09PSBudWxsIHx8IGNvbnRleHRCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRleHRCb3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueCkgfHwgMDtcbiAgICAgICAgY29uc3QgYnV0dG9uWSA9IChjb250ZXh0Qm94ID09PSBudWxsIHx8IGNvbnRleHRCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRleHRCb3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueSkgfHwgMDtcbiAgICAgICAgLy8g5pyA5aSnIFgg5YC8XG4gICAgICAgIGNvbnN0IG1heFggPSAoKHBvcHVwQ2FyZCA9PT0gbnVsbCB8fCBwb3B1cENhcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBvcHVwQ2FyZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkgfHwgMCkgLSBjb250ZXh0Qm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIC0gMjA7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VCb3hIZWlnaHQgPSBtZXNzYWdlc0JveCA9PT0gbnVsbCB8fCBtZXNzYWdlc0JveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWVzc2FnZXNCb3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICBjb25zdCBjb250YWluZXJCb3hIZWlnaHQgPSBQb3B1cENhcmRDb250YWluZXIgPT09IG51bGwgfHwgUG9wdXBDYXJkQ29udGFpbmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBQb3B1cENhcmRDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICBjb25zdCBoZWlnaHQgPSBtZXNzYWdlQm94SGVpZ2h0ID4gY29udGFpbmVyQm94SGVpZ2h0ID8gbWVzc2FnZUJveEhlaWdodCArIDYwIDogY29udGFpbmVyQm94SGVpZ2h0O1xuICAgICAgICBjb25zdCBtaW5ZID0gMCAtIGhlaWdodDtcbiAgICAgICAgbGV0IGxlZnQgPSBzZWxlY3RlZFRleHRYIC0gYnV0dG9uWCArIHNlbGVjdGVkVGV4dFdpZHRoIC0gNjA7XG4gICAgICAgIC8vIGxlZnQgPSBsZWZ0ID4gbWF4WCA/IG1heFggOiBsZWZ0XG4gICAgICAgIGxlZnQgPSBNYXRoLm1heCgxMCwgTWF0aC5taW4obWF4WCwgbGVmdCkpO1xuICAgICAgICBsZXQgdG9wID0gc2VsZWN0ZWRUZXh0WSAtIGJ1dHRvblkgLSA0MDtcbiAgICAgICAgLy8gdG9wID0gdG9wIDwgbWluWSA/IG1pblkgOiB0b3BcbiAgICAgICAgdG9wID0gTWF0aC5tYXgobWluWSwgTWF0aC5taW4oNjAsIHRvcCkpO1xuICAgICAgICAvLyBjb250ZXh0Qm94MiEuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnXG4gICAgICAgIC8vIGNvbnRleHRCb3ghLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgICBjb250ZXh0Qm94LnN0eWxlLmxlZnQgPSBsZWZ0LnRvU3RyaW5nKCkgKyAncHgnO1xuICAgICAgICBjb250ZXh0Qm94LnN0eWxlLnRvcCA9IHRvcC50b1N0cmluZygpICsgJ3B4JztcbiAgICAgICAgc2V0U2hvd01lbnUodHJ1ZSk7XG4gICAgfSwgW10pO1xuICAgIGNvbnN0IGhhbmRsZVNldEFua2lTcGFjZUJ1dHRvbkNsaWNrID0gKGV2ZW50LCBpc0FkZE5ldykgPT4ge1xuICAgICAgICBzZXRBbmtpU3BhY2UocHJvcHMucmFuZ2UsIHByb3BzLnNlbGVjdGVkVGV4dFN0cmluZywgZXZlbnQsIGlzQWRkTmV3KTtcbiAgICAgICAgLy8gQ29udGV4dEJveC5jdXJyZW50IS5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChDb250ZXh0Qm94LmN1cnJlbnQhKVxuICAgICAgICBzZXRTaG93TWVudShmYWxzZSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVGb2xsb3dVcE1lbnVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IFBvcHVwQ2FyZENvbnRhaW5lciA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKENPTlRBSU5FUl9DTEFTU05BTUUpWzBdO1xuICAgICAgICBjb25zdCBtZXNzYWdlc0JveCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZXMnKTtcbiAgICAgICAgY29uc3Qgc2VudGVuY2UgPSBnZXRTZWxlY3Rpb24odHJ1ZSk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dFggPSBwcm9wcy5zZWxlY3RlZFRleHQueDtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0WSA9IHByb3BzLnNlbGVjdGVkVGV4dC55O1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRXaWR0aCA9IHByb3BzLnNlbGVjdGVkVGV4dC53aWR0aDtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0SGVpZ2h0ID0gcHJvcHMuc2VsZWN0ZWRUZXh0LmhlaWdodDtcbiAgICAgICAgY29uc3QgZm9sbG93VXBNZW51Qm94WCA9IChtZXNzYWdlc0JveCA9PT0gbnVsbCB8fCBtZXNzYWdlc0JveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWVzc2FnZXNCb3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueCkgfHwgMDtcbiAgICAgICAgY29uc3QgZm9sbG93VXBNZW51Qm94WSA9ICgobWVzc2FnZXNCb3ggPT09IG51bGwgfHwgbWVzc2FnZXNCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc3NhZ2VzQm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnkpIHx8IDApICsgKChtZXNzYWdlc0JveCA9PT0gbnVsbCB8fCBtZXNzYWdlc0JveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWVzc2FnZXNCb3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0KSB8fCAwKTtcbiAgICAgICAgY29uc3QgZm9sbG93VXBNZW51Qm94V2lkdGggPSAxNDA7XG4gICAgICAgIC8vIGNvbnN0IGZvbGxvd1VwTWVudUJveEhlaWdodCA9IGZvbGxvd1VwTWVudUJveD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IHx8IDBcbiAgICAgICAgY29uc3QgbWF4WCA9ICgoUG9wdXBDYXJkQ29udGFpbmVyID09PSBudWxsIHx8IFBvcHVwQ2FyZENvbnRhaW5lciA9PT0gdm9pZCAwID8gdm9pZCAwIDogUG9wdXBDYXJkQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSB8fCAwKSAtIGZvbGxvd1VwTWVudUJveFdpZHRoIC0gMTA7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1heFgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygobWVzc2FnZXNCb3g/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCB8fCAwKSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2VzQm94Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmb2xsb3dVcE1lbnUnKVswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSlcbiAgICAgICAgY29uc3QgbWF4WSA9ICgoKFBvcHVwQ2FyZENvbnRhaW5lciA9PT0gbnVsbCB8fCBQb3B1cENhcmRDb250YWluZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IFBvcHVwQ2FyZENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55KSB8fCAwKSArICgoUG9wdXBDYXJkQ29udGFpbmVyID09PSBudWxsIHx8IFBvcHVwQ2FyZENvbnRhaW5lciA9PT0gdm9pZCAwID8gdm9pZCAwIDogUG9wdXBDYXJkQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCkgfHwgMCkpIC0gKCgobWVzc2FnZXNCb3ggPT09IG51bGwgfHwgbWVzc2FnZXNCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc3NhZ2VzQm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnkpIHx8IDApICsgKChtZXNzYWdlc0JveCA9PT0gbnVsbCB8fCBtZXNzYWdlc0JveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWVzc2FnZXNCb3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0KSB8fCAwKSkgLSAyMzA7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VCb3hIZWlnaHQgPSBtZXNzYWdlc0JveCA9PT0gbnVsbCB8fCBtZXNzYWdlc0JveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWVzc2FnZXNCb3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICBjb25zdCBjb250YWluZXJCb3hIZWlnaHQgPSBQb3B1cENhcmRDb250YWluZXIgPT09IG51bGwgfHwgUG9wdXBDYXJkQ29udGFpbmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBQb3B1cENhcmRDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICBjb25zdCBoZWlnaHQgPSBtZXNzYWdlQm94SGVpZ2h0ID4gY29udGFpbmVyQm94SGVpZ2h0ID8gbWVzc2FnZUJveEhlaWdodCArIDE4MCA6IGNvbnRhaW5lckJveEhlaWdodDtcbiAgICAgICAgY29uc3QgbWluWSA9IDAgLSBoZWlnaHQgKyAxMzA7XG4gICAgICAgIGxldCBsZWZ0ID0gKHNlbGVjdGVkVGV4dFggLSBmb2xsb3dVcE1lbnVCb3hYICsgc2VsZWN0ZWRUZXh0V2lkdGggLSA0MCk7XG4gICAgICAgIGxldCB0b3AgPSAoc2VsZWN0ZWRUZXh0WSAtIGZvbGxvd1VwTWVudUJveFkgLSBzZWxlY3RlZFRleHRIZWlnaHQpO1xuICAgICAgICAvLyBYIOWdkOagh+eahOacgOWkp+acgOWwj+WAvFxuICAgICAgICBsZWZ0ID0gTWF0aC5tYXgoMTAsIE1hdGgubWluKG1heFgsIGxlZnQpKTtcbiAgICAgICAgLy8gWSDlnZDmoIfnmoTmnIDlpKflgLxcbiAgICAgICAgdG9wID0gTWF0aC5tYXgobWluWSwgTWF0aC5taW4obWF4WSwgdG9wKSk7XG4gICAgICAgIHNldFNob3dNZW51KGZhbHNlKTtcbiAgICAgICAgLy8g5Y+W5raI5paH5a2X6YCJ5Lit77yM6YG/5YWN5oSP5aSW5by55Ye66I+c5Y2V5qCPXG4gICAgICAgIChfYSA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnVVBEQVRFX1BPUFVQX0NBUkQnLCBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBsZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgICAgICAgICAgIH0sIGZvbGxvd1VwRGF0YTogeyBrZXlXb3JkOiBwcm9wcy5zZWxlY3RlZFRleHRTdHJpbmcsIHNlbnRlbmNlOiBzZW50ZW5jZSA9PT0gbnVsbCB8fCBzZW50ZW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VudGVuY2Uuc2VudGVuY2UgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCwgc2hvd01lbnUgJiYgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyByZWY6IENvbnRleHRCb3gsIGNsYXNzTmFtZTogJ2NvbnRleHRCb3gnLCBzdHlsZToge1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgICAgfSB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogXCJyb3dcIixcbiAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogXCI4cHhcIixcbiAgICAgICAgICAgICAgICBib3JkZXJSaWdodDogXCIxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMTIpXCIsXG4gICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiBcIjE4cHhcIlxuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlRvb2x0aXAsIHsgcGxhY2VtZW50OiBcImJvdHRvbVwiLCB0aXRsZTogJ0Nsb3plIGRlbGV0aW9uKHNhbWUgY2FyZCknLCBhcnJvdzogZmFsc2UgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChTdHlsZWRCdXR0b24sIHsgc3R5bGU6IHsgbWFyZ2luUmlnaHQ6ICcxMHB4JyB9LCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVTZXRBbmtpU3BhY2VCdXR0b25DbGljayhldmVudCwgZmFsc2UpIH0sIFwiWy4uLl1cIikpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlRvb2x0aXAsIHsgcGxhY2VtZW50OiBcImJvdHRvbVwiLCB0aXRsZTogJ0Nsb3plIGRlbGV0aW9uKG5ldyBjYXJkKScsIGFycm93OiBmYWxzZSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFN0eWxlZEJ1dHRvbiwgeyBvbkNsaWNrOiAoKSA9PiBoYW5kbGVTZXRBbmtpU3BhY2VCdXR0b25DbGljayhldmVudCwgdHJ1ZSkgfSwgXCJbLi4uXStcIikpKSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Ub29sdGlwLCB7IHBsYWNlbWVudDogXCJib3R0b21cIiwgdGl0bGU6ICdQcm9udW5jaWF0aW9uKOKaoVBybyknLCBhcnJvdzogZmFsc2UgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChTdHlsZWRCdXR0b24sIHsgXCIkZGlzYWJsZVwiOiAodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpID8gZmFsc2UgOiB0cnVlLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICcxMHB4J1xuICAgICAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFuZyA9IHlpZWxkICgwLCBsYW5nXzEuZmV0Y2hjdXJyZW50TGFuZ3VhZ2UpKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFuZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRMYW5ndWFnZSA9IGxhbmdbJ3RhcmdldCddWydpZCddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLnBsYXlUZXh0VG9TcGVlY2gpKHByb3BzLnNlbGVjdGVkVGV4dFN0cmluZywgbGFuZ18yLmxhbmd1YWdlQ29kZXNbdGFyZ2V0TGFuZ3VhZ2VdLCB0YXJnZXRMYW5ndWFnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dNZW51KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbGVydCgnIFlvdSBhcmUgbm90IFBybycpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuQ3VzdG9tZXJTZXJ2aWNlT3V0bGluZWQsIG51bGwpKSkpLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJ1xuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlRvb2x0aXAsIHsgcGxhY2VtZW50OiBcImJvdHRvbVwiLCB0aXRsZTogJ0ludm9rZSBQcm9tcHQo4pqhUHJvKScsIGFycm93OiBmYWxzZSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEljb25CdXR0b24sIHsgY2xhc3NOYW1lOiAnbG9va1VwQnV0dG9uJywgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke2ljb24xMjhfcG5nXzEuZGVmYXVsdH0pYCxcbiAgICAgICAgICAgICAgICAgICAgfSwgb25DbGljazogaGFuZGxlRm9sbG93VXBNZW51Q2xpY2sgfSkpKSkpKTtcbn1cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIOiOt+WPlueUqOaIt+S/oeaBr1xudGhpc0dldFVzZXJJbmZvKCk7XG4vLyDnm5HlkKzpobXpnaLpvKDmoIfmiqzotbfkuovku7ZcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZXVwKTtcbi8vIOebkeWQrOmhtemdoum8oOagh+aMieS4i+S6i+S7tlxuZG9jdW1lbnQub25tb3VzZWRvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICBjb25zb2xlLmxvZyhldmVudC5jb21wb3NlZFBhdGgoKSk7XG4gICAgY29uc3QgZWxlbWVudCA9IGV2ZW50LmNvbXBvc2VkUGF0aCgpWzBdO1xuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgIWVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdTaG9ydGN1dEJ1dHRvbicpICYmIE15Qm94ICE9PSB1bmRlZmluZWQgJiYgTXlCb3ggIT09IG51bGwgJiYgIWlzUGluICYmICFkb25vdENsb3NlUG9wdXBDYXJkKSB7XG4gICAgICAgIC8vIOWmguaenOeCueWHu+eahOS4jeaYr+W/q+aNt+aMiemSruOAgeaPkuS7tueql+WPo+WPiuWFtuWtkOWFg+e0oO+8jOWImeWFs+mXreeql+WPo1xuICAgICAgICBpZiAoTXlCb3ggIT09IGV2ZW50LnRhcmdldCAmJiAhTXlCb3guY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgLy8g6ZqQ6JeP56qX5Y+jXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6ZqQ6JeP56qX5Y+jJyk7XG4gICAgICAgICAgICAoX2EgPSBjb250YWluZXIucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZUNoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgICAgICAvLyBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzZWxlY3Rpb25jaGFuZ2UnLCBoYW5kbGVTZWxlY3Rpb25jaGFuZ2UpO1xuICAgICAgICAgICAgLy8gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNldXApO1xuICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ1N0b3BUaGVDb252ZXJzYXRpb24nLCAnbWVzc2FnZXMnOiAnJyB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjb250ZXh0Qm94ID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRleHRCb3gyJylbMF07XG4gICAgLy8g54K55Ye75o+S5Lu256qX5Y+j5LiU5LiN5pivIFRvb2xCYXJcbiAgICBjb25zdCBpc0luU2hhZG93ID0gTXlCb3ggPT09IGV2ZW50LnRhcmdldCB8fCAoTXlCb3ggPT09IG51bGwgfHwgTXlCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IE15Qm94LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpO1xuICAgIGNvbnN0IGlzSW5Ub29sQmFyID0gY29udGV4dEJveCA9PT0gZXZlbnQuY29tcG9zZWRQYXRoKClbMF0gfHwgKGNvbnRleHRCb3ggPT09IG51bGwgfHwgY29udGV4dEJveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29udGV4dEJveC5jb250YWlucyhldmVudC5jb21wb3NlZFBhdGgoKVswXSkpO1xuICAgIGlmIChpc0luU2hhZG93ICYmICFpc0luVG9vbEJhcikge1xuICAgICAgICAvLyDpmpDol48gVG9vbEJhclxuICAgICAgICBpZiAoY29udGV4dEJveCkge1xuICAgICAgICAgICAgLy8g54K55Ye755qE5LiN5pivIHNldEFua2lTcGFjZUJ1dHRvbiDml7bmiY3pmpDol49cbiAgICAgICAgICAgIGlmIChjb250ZXh0Qm94ICE9PSBldmVudC50YXJnZXQgJiYgIWNvbnRleHRCb3guY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIChfYiA9IGNvbnRleHRCb3gucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnJlbW92ZUNoaWxkKGNvbnRleHRCb3gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3NlbGVjdGlvbmNoYW5nZScsIGhhbmRsZVNlbGVjdGlvbmNoYW5nZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy51c2VDdXJyZW50TGFuZ3VhZ2UgPSBleHBvcnRzLkN1cnJlbnRMYW5ndWFnZUNvbnRleHQgPSB2b2lkIDA7XG5jb25zdCByZWFjdF8xID0gcmVxdWlyZShcInJlYWN0XCIpO1xuY29uc3QgbGFuZ18xID0gcmVxdWlyZShcIi4vbGFuZ1wiKTtcbmNvbnN0IGFzeW5jRmV0Y2hjdXJyZW50TGFuZ3VhZ2UgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICByZXR1cm4geWllbGQgKDAsIGxhbmdfMS5mZXRjaGN1cnJlbnRMYW5ndWFnZSkoKTtcbn0pO1xuLy8g6I635Y+W5b2T5YmN6K+t6KiAXG5leHBvcnRzLkN1cnJlbnRMYW5ndWFnZUNvbnRleHQgPSAoMCwgcmVhY3RfMS5jcmVhdGVDb250ZXh0KShudWxsKTtcbmNvbnN0IHVzZUN1cnJlbnRMYW5ndWFnZSA9ICgpID0+ICgwLCByZWFjdF8xLnVzZUNvbnRleHQpKGV4cG9ydHMuQ3VycmVudExhbmd1YWdlQ29udGV4dCk7XG5leHBvcnRzLnVzZUN1cnJlbnRMYW5ndWFnZSA9IHVzZUN1cnJlbnRMYW5ndWFnZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy51c2VVc2VySW5mb0NvbnRleHQgPSBleHBvcnRzLlVzZXJJbmZvQ29udGV4dCA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSByZXF1aXJlKFwicmVhY3RcIik7XG5leHBvcnRzLlVzZXJJbmZvQ29udGV4dCA9ICgwLCByZWFjdF8xLmNyZWF0ZUNvbnRleHQpKG51bGwpO1xuY29uc3QgdXNlVXNlckluZm9Db250ZXh0ID0gKCkgPT4gKDAsIHJlYWN0XzEudXNlQ29udGV4dCkoZXhwb3J0cy5Vc2VySW5mb0NvbnRleHQpO1xuZXhwb3J0cy51c2VVc2VySW5mb0NvbnRleHQgPSB1c2VVc2VySW5mb0NvbnRleHQ7XG4iLCJleHBvcnQgZGVmYXVsdCBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSUFBQUFDQUNBWUFBQUREUG1ITEFBQUFDWEJJV1hNQUFBc1RBQUFMRXdFQW1wd1lBQUFBQVhOU1IwSUFyczRjNlFBQUFBUm5RVTFCQUFDeGp3djhZUVVBQUFqS1NVUkJWSGdCN1oxUGJCUlZITWQvVmZuVEtMUnNRQUpOeWdEZVRFTUozS3hKbTRnWC8rRUZrM3FnUFNsZWJHL2x4SEtDZUdtOVFEeTFYRHg0YVZFNGNiQUVycVpGNWFoTVNaU1lrTkpHU0RWVjZueDNkN1p2eHBuTzd1ejc4OXQ1NzVNOGRtWVdCUHUrOC92M2ZtK0d5T0Z3T0J3T2g0MTBiUEhkWURETzFqNzlZS3dFWTZuMjZRdlh3azlIRzVJbWdBdkJLRk56K09TRTBuWWtDV0FrR05Pa0RwK2NVTmlRSklEdnFXcjJUZU9URTRweWtnU3dJWjZjRytpbTRaTzdhSFh0ZVdVOGZMSWVqSDhxbitLMTFiK2VreUY4Y2tMSlRhWUFsaTRlb2E3T0Z5aUx1aENjVU5xS1RBR3NmUEVheWNRSmhSY3ZrV1pnVGZvNmQyVCtQb05DOFdvakM1OEtJQlR0QW1nVUp4UTlzQlZBb3ppaHRFYmJDNkJSQ2lLVXhkcTRGb3g1a29EMklMQW9NQWhtL1dCY0RNWU10WUFUZ0dJMENNV25Gb1RnQk1DRUxLR0U1MXN3RTR4eGFqSk9jQUpvSXlDRXU3K3MwYzM3VCtuckgvNU0raTErTUlacW53M2hCTkNtUEZ4ZXA4dTNscE9FNEZNVEluQUNhSE1naEhlLytpM3VIbnhxVUFUWlJYNEhhM3BMMitqSDh4NmRlNk5idk93Rll6WVkzVmwvM2dtZ0lGejZZQzlOdkZVU0wvVUhZNEV5YWd0T0FBVmk0dTBTRFovWUpWN3lxTnJmNGFYOUdTZUFnbkhwL1gzVXV5ZFM0UFdvS29KRWQrQUVVREJROHI1eVpuLzhzaGVNeWFUZjd3UlFRQWFPZHRMQWtjNzQ1WkhhaU9BRVVGQW1UcFdTTHNNS1JGeUJFMEJCZ1JXSXhRSUFrejhtWG5BQ0tERHZ2UDVLMHVYUHhSTW5nQUtURUFjQVdJSEI4TVFKb01EMDlXeFArK3BzZU1DcUl3Z3JYWGQvWFNOSDllNkZIMitGcnAwdnBuMTFPaGlqT0dBbGdLdDNWNEtsem1ma1FFRm5iK3NDU04vUEFUZmdCY05uNVFLdzN1Mm8wbmN3dTMreFJUejh3c29DL1BUNzMvWGovdjUrNnU3T1hNd3FGUFB6OC9YanJwM0s3MDBQdjdBUlFLVVZTdWlMbTU2ZXJvakFGaFlYRituNDhlUDE4OTQ5MjBnSGJGeUFlUGNEbXlZZnJLNnUxby9odXh2Wmp5a0ROZ0lRL2I5dGt3OGVQSGhRUDlaMTl3TStGdURScGdXd3pmZURwYVdsK3JHdXV4K3dkQUUyV2dEZjkrdkhWbG9BMFFWNG5rZTJFUldBdnRpY3BRVTRkdXdZMmNiS3l1WitEdXNzUUR3RnRERUdRQm9ZMGx1eXpBTFluZ0tLZHovUVVBU3F3OFlDaE5nWUFONjdkeTl5cnFFTVhJZUhCVkNjQWw2L2ZwMDZPanFrRGZ6M1pDSmFBSjBwSUdEbkFsUllBTEhHTG9ORGh3NlJUTVFNUU9mZEQ5aTVBQlVwb0JoZ3lVQzJTRVVCNlBUL2dNVmlrT29VVUJRQWV1YWJYV2UvK2ZOVE92L2Q0OHF4Q2d0bHFnZ0VqQXRBZFFxSXlSZDliTi9CN1UwWFdsU25xSkVhUUVudmxCaDNBYXBUd0hpTlBZK1BWUjJqbUxRQXhnV2dPZ1VVQThDOEFkYkQ1YzI5OXlwaWxFZ00wR2xaREtBNkJSVDlmOStCbkFKNHNsNC9McGZMTkRVMVJhckkrMi9NaTNrQktEYXZvZ0R5TkZuR24rQUZmeDJ2M01uRXVqcUF5aFF3SGdEbVdXVVR6YjlxZE5jQUFDc0xJRHNGbEJFQVFqUlh6cnhLT3VqcWZKRjBZMVFBcWxOQUdRRWduc0V6WE5JYm1ldkVxQUJVcDRDaS80Y3B4OU8wT0ROOFluZmw3U3c2TVc0QlFsUUhnTlVuYmE0VFovQjZIdDBZRFFKVnBvRHhBTEFkMEowQkFEWXVRTFlGUUVhQnpTV2NRWkNLdWtLSTdob0FZT01DWktlQXNDZ2pJeVBFR2JHdlFPZG1FQkd6THNEeVJ0QklsZEpBRFFBWUU0QnJCRFc3Q0JSaVRBQzJONElDVTNzQlJJeGFnQkFiSng5WTdRSnMzd3NZWDFTeXpnTFl2aGZRWkN1NENBc1hZT05lUUZOYndlS3dzQUMycDRDNit3QkZqUHpOOFNZTFZNUnUzNzVObklGSVpjWXFNanFWWkdCR0FMRW1DKzRWTzdDd3NDQTFWakhaQ1N4aXhBVndYNVZMUXVWU3Rha0FFQmh5QVpzV0FEdGhUTlRBc3hBcmxiSW5QNTRDNnQ0TkpHSkVBR0lBMk5lemcyNTgwa1BjT1AvdDQ4cVRTNEhzTElWTENnaU1TRTlNQWZGOFlQeXd1YUd5VGlFK0Vjems1QU1XTVFEdU5HNFBpVllwQUZOUEJFdkNrQUQrMzJyOThiVkhXUzlIMWtaOHBWTDJkbkF1S1NEUUxvQzBEQUEvOU0rKytZTTRvSHFsTXJJS1dETGJtYS85YjQvWEFDWW5KMmw4Zkx4eUhNWUQ1OTQwdXpna3VpUFZtMEZOeHdENkJTQllBUHh3eDhiR0txMVJZUTgvNG9Fdyt1YUE3QXdBazg5bEhRQVljQUdiRmlBc3JjN096ckpkRUZJWkFBSlR5OEFoUm1PQWNOSWhCSzRkdkVXdEFJWVlqUUhFdTM1d2NKQTJOamFvNkhCb0F4TXhhZ0ZzYkFTSkxBUHZNYi9uMEdnTTBOWFZSYllSZlY2UmVSZWdWUUR4R3NEaHc0ZkpOcmcwZ29Ub0ZVQ3NCaUM3d3NhZCtQTUtUVmNCZ1ZZQjJONEtMcjRYQ0hCWUJ0ZjZMN0M5Rlp6VEttQ0lzUmpBeGs1Z2NUTW9oeFFRR0lzQmJCTUE4dis1dWJuNmVjcXIzYlZqTEFhd1NRQ1kvS0dob2ZvNThuL2RqNEpKdzFnTVlFc0dnTWdma3k5V0FDZE9sWWdMMmdSZ1d3MEEreHhHUjBjcnI0T05UejZYdXg5b2kwVGlOUUR4MFNoRkFwVSszUFhpcElkZzhqbmQvVUNiQU9LdmhwK1ptU0ZiUU52M2xZLzJCNEhmeThRTmJRSVEvYjh0WU9MeDZEZDBPSEhjK3dDMENRQ0ZqK0dUdTZub0lML0h3UDh2bDJMUFZtZ1RBTXdmUnhOb096enRra01iVGdDV2t5U0E5bnErcXFNbGtnUVFXYlBrc2x2SG9ZWWtBVVM2RmxiWC9pVkhjVWtTd0x4NHdtM1Rwa011bVJiZzV2MW41Q2d1YVJhZ0hnaGlvMlM4ak9zb0RtbHA0SmZoQVNhZjAxNDloMXpTQkRCRmdoV0FBSndWS0NacEFzRGtSNnpBNVZ2TDVHZ3ZydDdKdHR3ZFczeUh0dDJGWUhqaGhSdWY5dERBa2ViZnZ1bVFRMWlUcWJ3QWEzazlkaTM5dXhSR2d6R3psUUFBbXZjWHdoTXNhZDRaNjJYVDBkcXVTSjdJdkRRa0FEQVdqTW53QkEyTnNBUk9CR3dtTWk4ZkJtT3VFUUdBY2pBdWhDZXdCSmZlMjhlcXQ2MFYybndpODRLbVRMOVJBWUF5Q1NJQWFQQkFqeHNYYTJEcFJPYmhJbFhuazVvUkFJaTRneERaUW5BVHFaVDY1SU5tQlFBU1JRRFFBalZ3dEpQNkRteXZ2SFFad0YwZ2pYUVRxUVhrZmF1MVR3eS9kdDJ2bmM5UWJMay9qd0JBbVdMdXdDR1ZySWxjU2ZtdWFmSUtBSlRKaVNBTGJST1psMVlFQUFhRGdjZDdlVlJzMkU5a1hsb1ZBUENvYWczT0VuOEtPNUY1a1NHQUVJLzBDY0ZOcENSa0NpQ2tPeGlucWVvZStvT3gxU3ZCM0VRYVJvVUFrdkJvTTA3d1k1OE9oOFBoTU1KL0VPU0NGZ0FXOCtJQUFBQUFTVVZPUks1Q1lJST1cIiIsImV4cG9ydCBkZWZhdWx0IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFjY0FBQUNwQ0FZQUFBQmVkZllzQUFBQnAybFVXSFJZVFV3NlkyOXRMbUZrYjJKbExuaHRjQUFBQUFBQVBEOTRjR0ZqYTJWMElHSmxaMmx1UFNMdnU3OGlJR2xrUFNKWE5VMHdUWEJEWldocFNIcHlaVk42VGxSamVtdGpPV1FpUHo0S1BIZzZlRzF3YldWMFlTQjRiV3h1Y3pwNFBTSmhaRzlpWlRwdWN6cHRaWFJoTHlJZ2VEcDRiWEIwYXowaVdFMVFJRU52Y21VZ05pNHdMakFpUGdvZ1BISmtaanBTUkVZZ2VHMXNibk02Y21SbVBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHhPVGs1THpBeUx6SXlMWEprWmkxemVXNTBZWGd0Ym5NaklqNEtJQ0E4Y21SbU9rUmxjMk55YVhCMGFXOXVJSEprWmpwaFltOTFkRDBpSWdvZ0lDQWdlRzFzYm5NNlpYaHBaajBpYUhSMGNEb3ZMMjV6TG1Ga2IySmxMbU52YlM5bGVHbG1MekV1TUM4aUNpQWdJR1Y0YVdZNlZYTmxja052YlcxbGJuUTlJbE5qY21WbGJuTm9iM1FpQ2lBZ0lHVjRhV1k2VUdsNFpXeFpSR2x0Wlc1emFXOXVQU0l4TmpraUNpQWdJR1Y0YVdZNlVHbDRaV3hZUkdsdFpXNXphVzl1UFNJME5UVWlMejRLSUR3dmNtUm1PbEpFUmo0S1BDOTRPbmh0Y0cxbGRHRStDancvZUhCaFkydGxkQ0JsYm1ROUluSWlQejRlUXJEZUFBQUJYV2xEUTFCSlEwTWdVSEp2Wm1sc1pRQUFLSkYxa0U4b2czRVl4ejlqaUUxUmxPU3dsREtOWmx0eTNTZ1VXclBsejBHOWV6ZWpabjY5bStRbUYrVXNSeWZKeVhVbEJ6ZFhwU2luWGVTZ1hOUXVyTmZ6YnRoR25ucDZQbjE3bnQvdjJ4Y2FuSnBTYVR1d21ja1prYW1RYTJsNXhkWHlqSjFtSEF6UnF1bFpGUXlIWjJXRjcxbGZ4WHRzMXJ3YnR0N3lIcnlzM2x6R0NxWDJUaTcyVDZiLzd0ZFZXeUtaMVdWK1NBZDBaZVRBNWhVTzcrU1V4WHZDWFlhWUVqNnlPRlhoYzR2akZiNHE3MFFqRThLM3doMzZ1cFlRTGdoNzRqVjZxb1kzMDl2Nmx3Zkx2VE9aaVMzSTdKSHVZNTRvUGdKTU1VZUlVY1labEN6Yy85d0V5amNUYktIWXhXQ0RGT3ZrY0JFVVJaRW1LVHhEQnAwUlBNSSt2TkorSyt2ZkdWYTF3MWVZSEpPdnVxdmFqUGcvM29EZXA2cldmd29EY2NqN2xXWm9QOG5haXZic210OVhZVWNlbW81TjgyMFJXdHhRZWpETjk3eHBsczZnOFJHdWk1K3hoR01xSEp3V09RQUFRQUJKUkVGVWVBSHRYUWQ4VkZYMlBwT1pkQ0QwRXFvMFVSQlVWQkRiV2xBRUZVVHN2WXV1OWU4cTdxb29LRml3Z0s1ZGQ5SFZGYnRyUlJHN0NNZ0t3bHBvMG9QMGhQUk1adjdudTIvT3pNdGtKcGxKM3FTUWMzOTVjM3Q1MzdrNTN6djMzZmVlcTIzckFYNVNwd2dvQW9xQUlxQUlLQUpCQkpLQ0lRMG9Bb3FBSXFBSUtBS0tnRUZBeVZFbmdpS2dDQ2dDaW9BaUVJYUFrbU1ZSUJwVkJCUUJSVUFSVUFTVUhIVU9LQUtLZ0NLZ0NDZ0NZUWdvT1lZQm9sRkZRQkZRQkJRQlJVREpVZWVBSXFBSUtBS0tnQ0lRaG9DU1l4Z2dHbFVFRkFGRlFCRlFCSlFjZFE0b0FvcUFJcUFJS0FKaENDZzVoZ0dpVVVWQUVWQUVGQUZGUU1sUjU0QWlvQWdvQW9xQUloQ0dnSkpqR0NBYVZRUVVBVVZBRVZBRWxCeDFEaWdDaW9BaW9BZ29BbUVJS0RtR0FhSlJSVUFSVUFRVUFVVkF5VkhuZ0NLZ0NDZ0Npb0FpRUlhQWttTVlJQnBWQkJRQlJVQVJVQVNVSEhVT0tBS0tnQ0tnQ0NnQ1lRZ29PWVlCb2xGRlFCRlFCQlFCUlVESlVlZUFJcUFJS0FLS2dDSVFob0NTWXhnZ0dsVUVGQUZGUUJGUUJKUWNkUTRvQW9xQUlxQUlLQUpoQ0NnNWhnR2lVVVZBRVZBRUZBRkZRTWxSNTRBaW9BZ29Bb3BBbzBEZ3NiL2ZRNDg5ZmsvVXNTTC8zaW0zUnMyUEowUEpNUjYwdEt3aW9BZ29Bb3BBdlNHUWw3dWJ6anA3ZEVTQ0JER2VkZFpveDhibXpraHZmNWRqcldsRGlvQWlvQWdvQW9wQWdoQ1krOW0zMUsxN1owT1EzYnAxcG84K25HdDZFbUo4OWRWMzZlYi9tK3hJN3g1SFd0RkdGQUZGUUJGUUJCU0JPa0RnMm10dU43M0FnaFFIaXhIRUtIbVNYaHRmeWJFMjZHbGRSVUFSVUFRVWdUcEhRRWhRQ05KcFlzUUpLVG5XdVZpMVEwVkFFVkFFRklIYUlpQUVpWGJzNGRxMksvVmRiVnNQOEV0RWZVVkFFVkFFRkFGRlFCRWcwdDJxT2dzVUFVVkFFVkFFRklFd0JKUWN3d0RScUNLZ0NDZ0Npb0Fpb09Tb2MwQVJVQVFVQVVWQUVRaERRTWt4REJDTktnS0tnQ0tnQ0NnQ1NvNDZCeFFCUlVBUlVBUVVnVEFFbEJ6REFOR29JcUFJS0FLS2dDS2d6em5xSEZBRUZJRW1na0JqZVdyTjFVVGswYkJQVThteFljdEhSNmNJS0FLMVJzQlBHU2srNnRleGxOS1NmYlZ1TFpFTmxIaVQ2TmVjRkNvb3hhS2VrbVFpc2E2dWJTWEg2aERTZkVWQUVXaWtDRmlXNHVoQnUybkNpZHNva3dteU1iaENKc1lIWnJlaHQzNXNFUml1a21SOXlFM3ZPZFlINnRxbklxQUkxQWtDZzdxVTBOMm5iR2sweEFoUVlPVk9QR2tySGRpdHVFNHcwazRpSTZEa0dCa1hUVlVFRklGR2pZQmxOWjR5S0krU0dxSGg1ZUl4ajk1L2QwQUNqZVZlYWFPZU1KVUdyK1JZQ1JKTlVBUVVnY2FOUUloTTJqVXJiN1NuMHJhWjF6YjIwRG5aRWpXWVFBU1VIQk1JcmphdENDZ0M5WWVBbi9rRUZsaGpkUmc2emtGZC9TRGdhZDI2VC8zMHJMMHFBb3FBSXVBNEF2NEFvWUJWL0pTY25NZCtnZU85MUVXRHlja1oxTHAxTCs0S05Pa0tFSDBqWnZ1NkFNM0JQblMzcW9OZ2FsT0tnQ0xRZUJCWXViVVo3U3hNNFFIWEYrSDRLU3U5alBxMmwzdUxqUWU3cGpCU0pjZW1JR1U5UjBWQUVhaUV3TFB6ZXRKM3Y3ZXJtRjRYNjdDMnRkSWhQYmJSdE5GTEtvNUJZdzBDQVNYSEJpRUdIWVFpb0FqVUd3Sk1pQ0hiTVJSS3pIaXNHNkhtVnFJaHlVVDNsNWl6YUFxdGVvcExGamVGODlSelZBUVVnVDBHQWR4L2N6T2hwVkpTVWdZZkxmaG9YcU96Y3hsTFVRaks4cXN5SHQxdU45L0hUQ2FQeDhWOUpwa0RIZnQ4UG5ONHZYNHFLeXVqOHZMS3UyUXRneEY5K0MweWxtNXJOSEt0bEdnRTFISk1OTUxhdmlLZ0NEaU1BRGJkZUpsaXZPUXI1ODAyNVZ1WkxOUEk3VzVISG5mcm1Qc0tFYU5zZHBHcWxWa3JOVFdaVXROU2dtUW9KY1ZQWXRMRTRVa21Ta3RQTVVSWlVseEtKU1ZsVW9USEtGdFBYY0ZkcUhhYk5WaFFBdzBDQVNYSEJpRUdIY1NlaHdBVVlXVWx1K2VkWjhNNEk3Ky9tTHplOVV5V084anQ2Y3dQL3FmRlBERExVclRMS2hTR3BaaVJrY3FXWW55cTBzMVdaVWFHaDFKU3ZGUllXRkxKa2dSUjJtNDl4anhXTFZoM0NNUW44Ym9ibC9ha0NEUnlCRUlLdHBHZlNLTWF2czlmUUw2eTVVeG1YY21kMUxLYXNVTkdkamxWdENCVFVwSXBNek85bWphcXprNU85bEJXbG9meUM0cW9yTFRNOXBnSjkxelYrbTNWemRaYkxpejI4ckt0VFBhNzJUb3VZT3U5bEJIa0pXWlhNcms4emNqdDRpVnVUeHMrdDhaUExZMy9ET3B0bW1qSGlvQWkwREFSd0gyL2RVVEpzb3daZlpRaHE5Rk9qQzYyK0dwUGpQWmVtMlZtOE5PV2hWUnFDRklJdWZyeDJkdW83M0JCL2xvcUtselBTOHY4L0dnS1c5TnVGMStBSkpHZjc3ZnlYVmNxOSthUjE3K0xYQ1hyS0RtMU15OHhaOWYza0d2VnY1SmpyZURUeW9xQUl0QlFFU2dyMjhDV1RieGY0bUNGejB1cHRiVVlJMkdTeVFSWlhwN1B5NytWTit0RUt0OVEwcEpjWGpweWNESjF5T3BKYXplMXBJMWJkOVBHTGJ0b055OFhGeFdWa0o5UEo0V1pKRGt0eVZpUlByK1B2S1U1Zko2N0tEVzFKN21TWWwvaWJpam5qSEVvT1RZa2FlaFlGQUZGb0FJQzZlbldzbVpSVVZHRjlOZ2lmRi9QRjl1WExld3JuTGpIR0l0cjE3NjlLYloxeTVaWWlwc3lhSHYzN3NKR2M3L1I3eStqWGoyOE5QNk1nNG5Ldk5TamEwc3EzbDFFT1Q5dnBFMjhaTHpzOXgzMEE0ZVhyOXBDbTNmazhsSnJHV1UxVCtlTEFLTENvdDFzS2Y5Q3padnYweWdKVXNreDVtbXRCUldCcG9mQTZXZU1NeS80ZlAzMU4rdmw1UGZmZjMvVDc3eDU4MnJVUDNhMHh1T3dLeldXelRmNzdqZUFqaDk1b21uNmt3OC9vcCtYTG91cEc3U05KZHVTa3RLWXlrdWhpVlB1NXVWTTZ4NXBQUGNxSjA2NFE1cW9rVjlTdEpuYXQrNUUzWmdVbjM1NUhoMlMyNTRHZEdwbDdxTjI3dEdXaHZWdlQxZU9IVVRGaGVYMDlaSWNtajEvTmVWc3phVnZGdjVHZS9mcVFEMjdkS0I1UDY2aHRNeCtOZXEvUGlzcE9kWW4rdHEzSWhCQTRNSUx6NmVoUTRkV3dPT0Q5eitnOXovNDBLVDE2ZHVYYnJyeGVucjRrZW0wWXZueUN1VVNGYkdQQ1JiY2l5LytLMUZkUlczM3BKTkdzcFhscDVxU1k5U0dvMlNrcHNWbU5mWWZNQ0RZUXE4K3ZXTW1SMVJDSC9HU1k3Q3pPZzNzWkV2UTJraVU1Q3FqRVVONjBhZi9YVWtET3pTbjBtUitiTVhOajlLVXV1bC92NjZuamR0M1U3ZnN0blRkdUFNcFowY1JEVHRnTCtxVjNab2Vtam1YU3IzNTVPWmwxdVNVVG82UC91ampqcVkvSFhjTWZURm5MbjArNTNOSDIxZHlkQlJPYlV3UnFCa0NJRVpZWitzM2JBZzJzR1A3OW1DNHJnTW5qUnBKZ3dZTm9pVkxmakpkdzRMYnNYMUhrS3pyWWp5NElHamQybnB1RWVGRVh4UjRQRzZ6d1NUU3VXRUo5WUNEQmxPTHJDeVQzVGF3cElwSWw2N2RhTnpaWjVuMHZOeGMrdkdIUlZUVlVpczJzYUF2cnpjK3F4WWQzSFhibmFhZlNEOTMzemM1VW5JTjAzeTg4elNQclZ3M2xmdVQ2ZDVuZjZLTGp1L0tqNldVMFplL2JPUm5PbFBwODk5eUtPZVBZaW9vOXRHQi9Uc1RaMUZaWVRGMWFKZE9mMmFzeHQvNUhxMWF1NVdYVlpQSlc1YkRHM1RhT2I2TEZjUUlCMS9Kc1lhaTFtcUtRRU5IQU1TWWFBS0lGWVBGUC8xRU9QWWZPTkJVZWYzMU55ZzlvM2FQTmNUYXQ1UWJkdWdRMmhpNFdFQTQwZGpnelRmUjNBRUhENlo5YmRhaXZSd3N3UzdkdWdhUzJPZlZ6MDgrK01oZXBGSVlmZFdFSENzMWxLQUVOeFh6NHhrcFRHWStHamE0SjgxODdVZGFzejZIL25ycG44aGZ0Sk9LbWRmZitYWUZuWC9pQURya29KNTh6ajYrdjh1N2IwSDRmTC94MTk4MjA4SmYxbFB6RnFuRzh2ZGprMDdaRHJZZXJmdTBUZzBiRnFOWWprNjFLZTJvNVNoSXFLOElORUFFdW5UdFFtMWJ0NkVDMjRhVS9kbWkyN1pqTzIxWUg3SXluUm82Mmg3Q1JKVEp5Nml2dlJHNnp3aGlQR1BjYVdZYzgrZk5wOFZMbkg5Wk5zNDFJODBpNEQ1Nzl6WEx6TEtVZThFRjU5SDZkUnRvUTRBc0M0dUxIRDkvanlmNjUyMnpXbGdXWXl3NHgxSzJxcjVpNlNQUlpaS1QrUzArdmpScTBjeERnL3RsMGJLK3ZOTzI3ZDVFelpwVGozWStLaTF6MGZTYmg5TXZxM2JUVS85Y1NDN2VuTk1pZ3lpclZRWWRjMmhQV3JOcEp6L2JXVUJwYVI1ZW1zVzlVbjdrdzUvUHZyUGtDR3ZSYVl0UnNGVnlGQ1RVVndRYUlBS25uejZPdW5icFF1Ky9iOTE3UkJqMzRXQmxQdkx3bzQ2T0dPUjA1VlZYMFBJVksvZ1JpTXJPejFzNk16SXlUSmw3cDB4MWpKemF0R2xENDduZnpueHVkb2R4TEY1c3ZmdDVLQk8yMlJ4a0t3Q3I4c21ubnFIdERpMC80MTJwZGVYcXNxK2FuSlBQVjhpV1hobTFhOXVDdW5iSW9Idi9NcHkyNVBuSlRYbHNOYnI0ZnFPZkZxL05veG12cktRRjMzeExsOXg2RzVVem9lNlZ0Wnp2cVNiVEg5c0xLRGVYbitzczhUQkJzZ1hLZy9BMHNsY0NLVGtHWnc3VUFVUllYMDc3YjhyNDQwWFYySGdTN3A1NjhtbXpFZWYwMDA4eithZWRkaXB0MnJpUmtPNnM4N01TU3pkOTJFa1h5Nm9ZRjZ4VVNYL2lpY2NwUFozTkJJY2N5RzNhUTQrWTgrelN0YXU1ci9saFlDT1NkQ0Y5aitJZG9xTk9HbVV3ZUlndkRtcjJpSWUwR3NJYjV4amFCU3Jwb2cvODlNVm5jeWtsTllYMkgzd2c5ZTdiaDh2Q0V2SVpINjBoalBtTE5uQS9jdXlaWjlDdi8vdVpmbDRXZVJkclF5ZkgwakplT3VWN2lWbk5NeW1kOXlnVjVoZFFhMzZPTVRlL21JcjhMc3BNYzFITHpCUTZjMFF2YXBkWnlOWmxPaDNZeFU4WnZrN2tMeTZtdEl3VU92bjRBNmhydXl4NmU4NVMzcFJUeGk5c2QvN2lRemZreUZ4T3FDLy9DQW50cElyR3RmOHF3S21EclByRkg4b3lwSnhEcHd2bGp4MnEyS2tLeXlwbjB5WVRyeDBwaE5vUGhTekZIb3Bib1VpRWpYRkdTZyt2RzArOG1CWHFsS24zRTNiSVlqTlEyemF0SysyT2xkMnozMy8vUGMyYytWSTh6VmRiRnM4NWh2Q1h1V0M5L3hSNXNzRm0yOWF0MUdmdnZYbXBFTVFJSEVJRWlhOXQ0UG9taFI4SDZkcTlLM1hyMGQzVWs3cklieXpPN2NZakxWN3lsc3NqSnk2K25lam5oL3B4Rm53aHg0K2taTGQxMFY3WnpXbkVFY2Z5bTNNMm0zdU54ZDRrM3NqanBlR0g5YUFSUis1RFdjMVM2S2ZsVytqWE5YL3cvY1owS3VQN2tVNjZSRzdJY1o3S25UeHpiVXNSVUFTTWRRU0NuRDkvUG9tMWhLVklXRkNKZGlDQUVHbFl2Vlcwc3B3ZEFVaHY4ZUlsNW42anZBQUFQU0E4Wk1nUXMzdldPV0lFQ1lZSUM0UUhaeEUvMHVYY2hTeE50c2tQNFdJUnBGWFd1c0N4ck1wUTJVREk4c3d2djdjbjBKY3RzVUVGaTRySytRSCtZbHIrK3paYXYzVUhOYy9pbHhjVWxQSnIrWGpzZkVGUXprUlp6aFprUGx1WEJVWDhqbFUzRHgrZkVjTmFKRy9rTVVTYVZrNUxmOTVDYXpiK3dZVHA0dzArc1QwbUV3OFEySkFESjM0OGRhc3Iyd2lYVmExSlc5Mkp4WlpmazdacVVpZmFhR3JTVmszcWFQK1JFYWdKbGpXcEU3bDNTekZYVkx6UlNzSlN0RWpCNnI4MWsrUElFMGNRbm9Xc3VhdDhMdUVXNGJ6djU0YzFqenBPdWNyOW8rV1NrbUp6SHhIbjNMdFBIOVBaU3I3L2lPWFhnZ0pzNm5ER1ZUeFhWOEFhdEFqT3VnQUluV3U3OWgzWThrbmh4emtPNE02eEJKc1VLSSt4V0RLMHJFbGlVdkhTK3JWcmFOV0tsUVJMTTBUQUlUTDIrV0JDaGRwSEt3M0puWGZSbVpTWHU1VXZ5SmJSMUdlK28vdHZPSnl5Mm1UeU9UTXArcnhVVXNyM24va2VZeExIWGJ5UkNYaDUrWnhTUENtY3h3LzlwN1htUjM5Y05PbUpUeWh2ZHk0MXkyak9WcWp6NTl0a051UllFekpjV1lUL0E0WG5oMDhwS1M5K3RIeWsyOXVTSlJSN0dzcUV0eE9lanpKMkorWEZ0K2NoYkUrM3Q2WDlZMGtxM0VxcGlCZndzMk9HZUxnVGZNV1BsbzkwZTF2MWkzOEI3K3pyM0lrZmtnNHUxMW4zd09SL0FyN2RkY25Pam5LL1RjNWJmSHN0aE8zcDRlZHZ2KzltMWR1K2ZSc0g3T1dzY1BoNHJOTDRsZmJGRCtWWUlYdTZ2ZDBRL3RoMHRKN3ZjV0tINmlHSEhHSytvWWlYQUNDdGE1ZXU0UTJHeGRFK25MMGZLeVg4TnpUWHJMN0x5cnhoYjhleGxvOVI3cWhqanFaczNyQ0VKVlk0Nng2amhLMCtVUTRFdVhYelpucnZyWGRzWldWZW94OXJYTENzS3VKcXRkVlFmcE5jR1RUbGdSdDR1VFNmbGl4ZVNkdGRPWlR0M1VCdVB5K2Jwbm9DOXc5NXZ2REx4MTArL2dDMHA1eVMrYkdOWGR2VzAydnZ6K1g4dGpUelRYNE9jbHN1cGJnOWJIR1c4TXZJb3o4cTAxRE8yejZPQm1VNXltUVZoV0FORkxNeGZDSlprekUwdWV6NThnOG52cHl1dll6VVI1NlV3eEtLVmRicVgvS1FhSytMZEtrdmRlMzVraVkreXNQWnkwaDlwRXM1N2I4cDQvL2hoeC9UL2dmdVQ0TU9HRVNkbWZpd0sxUTJiVmdXaVRWUFNrcEthTzI2ZFpnNDlNRUg4aXlkZlc2RjVwTXBGUHl4bDRrMi95d3lxRzcrVjE0U3RMZGRtLzZ0NWRNT0hUdFNSNzVRd0xsK3hLOW13M2lPT2ZZWXM3UUtUTkxTMG5pekNONjFLbjJGOTIrUEJ3R29GRUM3NGpEMzhFSndLOG5hWElQL1dhU2puSlNGeFlqTlU2dFhycUQzMy80UDU3dG8xSmlUcVZlZnZ0eFU2T0pDZEJuYXQ3N2RLSGxXVzJWbHVKY1g2aC9sR3BMNzRQMkZkTTdsWTZoRjg1WTA4S0Q5cUt4a2I5cTliaWtsNTYyZ0ZQNklNOXYzWnZSSnFlbVV4STl4Yk5sWlFvOVArNXBhdEZ4Tkt6ZDVxWG42T243WGFpbkxESVNZWkpaVWZYN2V4Q1VpYytoa205Q0dIR3RTV3hQTFBzR0JxSDBpV1Foandsb0tOWlNQeVcybFlWSWpMSG1ocTBDckxhc05oS1dPK0toanRTMTlTaHNpVWF1dTlxLzRPelgvUHY5OExzMmRPNWZ3bkNFZXA0QUNGaElDSVVnNGhaZjJ2cGo3QlMzaEIvU2RuMytXNGdZeEZ4WVdHcVZ1emZqUS9NZU9WbEg4enZkUDFKZVhVZkZWakI5L1hFeHZ2dmtXN2VEbk9hRlJ2NSsvZ01ieGM1WURCKzdIYjZUcFNsaG1qZDYvOVgrTC8rZXFIR1JubFVGQkYxczNaYnhrNk9QSEZLeGxRai9mVTRORHVkeThYWlR0NzJMa2d2TmZ2T2hIenJGMEI4STllL2NKdE1WbGMzZVpzU0hmMGlWV0c5WjRYZHhIT1JPeEVMRHBJdWFmdTZaT0N1SWZjNlVhRk1UTDBXKzg0aTQ2NmRURDZOQWpocGlkdXQ3bWc2a2dvdzhsODA3V1pQNEExL3JaWDlDR2orZndHM0NhMFNyK2hzWFh5N2JRZm9QVGFYRGZYUHJIRzhYbXZxU0w1NHUzTkkwOEdid3F3dmNrblhhSjNKQlQ3NWFqVEJpQUp1UWtrejZVWjAzQ0VMQ2hXUytUMjFKU1ZnbjdQd1hhQ0tRR3EwdWRZSUlKaUFLd2lCRkpLR2Y5QTBrYlVpTVVsN2EwZjhIR3drMWlpci9NRmZFRm4xRGN3c3FhZjEyNmREWUtHR2t5LzBHVTluaDJkcWZnUS9oT3pyOE42OWV6UlZaTUR6eHduK2tQUDNLaGFPOC9QeitmSCsxWWI4bzQyVCtmTWIrRko4TThwZ0x5aDVQL1A5eHZmUHJwWjJnUVAxclNobDhwdDhMcTJQeVBvbDc0LzE4ZzI3UVI3Y2VhbXlBcDNHZTA1RkpTWEVMdWpMUkFGY2pJMGdjL0xseGt2bHVZbGRYU3lLV0VjYktjbjRyNTN1aW1BQjY1ZWJuMDFkelBPY3VTcjlVSDJnZ1VaNitZKzdEeVdhOEZ5b1Z5N1NGYkpYdHlIWVZYcmN5bGo5NmRTMmVlZFJRbDhRa1VGSmRSU1hrbTMxTnR3WDRTZFJ6Vm0zejhTYXB0QytkVEN6NG03OStMZXQ1eEs2MWNzNW5HcGl5aDViK3VvclVyZDFIL2dUdG8vc0pXQ1JsMUl0K1E0K3JXZGE4NmxvQjBCMlVRY3FJSXJNa2sveFNoL0VnaG1kRGkyOHRFU3JQbkl5ei8rRkpXL1BCeTBlSlNYbng3dVVocDlueUV0WCt4MEMzRkZBdG1kZ3lsdlBpUjh1eHA0V0hGdnpMK3NBenh5SWhnWThjTWFYQWdSbXlXRWR6RnIxaldrcWs5TFR3c2ZVaDk4Y1BMUll0TGVmRkQ1U3dkQTBKNmVPeHVPcnhYWVNqTEZwcnczaUQ2N3ZkMm5HS1JJNGdRcmxtemRMNW5sbXlJaTI5Mm1EVDdEd2pOU2tjZStnS084bWdIaUZvZUFoQmRoOXBXV1M4Lzd3ZXJUTndoM2JiU2c2TmhoVloyODllMm9WditNNWd6VUZkdXUxUWVUK1dhenFYMDJLczkvZU9sNi9nckhDbldoNDE1SFBuNVhyNFg2YVZWNjByNS9tTXl0V3ZmZ25MNVpRM2JQLytjeXRiOFFnUEduMGU5aHA5R3UzTFgwbmRmM0VJelpoVFRtblhPUFJmcjNObFYzVkk5V0k0aDRRb1J5aER0Y1V4cytlZVIvSEJmcnNiRXQrZEhTclBuSXl6OVNWbnh3OHRGaTB0NThlM2xJcVhaOHhIVy9pM2xJVmlKSDQ1VHRMaVVGOTllTGxLYVBSOWh4Yjh5L2lBOUxGbkc0Z1JqOGUxMUlxWFo4eEZPUFA1TUtPWkR1eUV5c28vQjZoOFl5Qklud2k0bS9oSitTYllIZEJRY28rZ2ljNEZnRmVNODFJT1Q1VlBPTU9yTnNnZ3RBclZLeUc5UkVlN1hvUkNYWVpEUVZIUm5sUXMwR3IxWUFuUFcvTDZGTHJuZ01YNEc5V3phcDM5WGpKcmZsNXBHTFZ2NGFHY0IwVmR2ZjAzSEh1eWk1ZVg3VU9id0U2bWoveGlpYnIxcDhmTHZhT1BTdStqeEo5SWJKVEVDMGpvaXg4QnNDZ29SRThPS3lLUUxadGtDOHM5alM5S2dJcUFJS0FJeElaQ2N6Qll3cllsZTF1Z2crOFU2MHhCSHk4djUyYjM4UXNyTXhIdGVyWHdoUXRGYjRib3BTSFBjSmo4SmFQbzB0eXlEZW83NE1aUWl2dGRvZllsRGlEblVlNlJob3JLVUNEUVVqRWNxbjVpMDMxZi9RV2VmK1NoZGUvMUl1dkNTUDNFbmVOWXhpZnIzYVU0OXJ4OUYzcTByYWVOcm0rbmxKMStpZGgzS2VRTlBIMnJiWWhIOWExYmJ4QXlvamxxdEkzSzB6a1ltRkNZZ25MVWNJa0szMG1MOVJWdm1LczVVc0U4aWFjR2Vab1d0T3NpWENZZXd2UnppNHV6cDlyQ1ZyLzByL2pyLzVQK284djlIeGY4cks3L3Uvdi80M1orZXpyd01XTTNMd25uNEZ1bFp5NnFpbHpETzBsTCsvaEk3RUdURnMwTU05VUx6MytSYnlad0RUSEFFRXpnTVl1VDNqSm8yVFdtVFpneURzSEltbzlJUDZzaFNiYVhNT2t0NGJQcUg5TkxNTDJuVXFFTm82R0Y5cVUrZkx0UytReGFsWnU5Tlk4WjJvRFVyaHRDWHM3K21uSTkrNTdOcTNNUUlVQk5NampJUjVONkc5YytFaVJXckMwMUNxNDdVTk1US0lqRFQwQ1JLRHJjY25KdFdXcENFcmU3TnhFYi9sdFdLQUplelZiZnk4Q3YvQkpZZmFwY3p1QzF6SG1GOW1VcGhhZHEvRGFzQXBzQnB6OFkvTktGVS9uVW5menlmNS9aazg2TURhWWI0UWxJdy81a1ZmMHdtZnZER0dwQWRza0ZDU0hPWmgvbTk1Zm1VeVJ0MHNJUFdGQkRkeFlXdC8zK2pDTGlHVlFkMTVhTEp6enRmc1prS1M2bXlxUXJ0V3ZwUHlxUFBhRTRVU2YwVG80eHcxNjRDZXZubHo4MGhhUlg4NUxyOXJGbUZ2aDJPSkpnY3pXd3prOEdhTUtIbFZKeUh6TE9LNTFTeGpGVU9FNm1pa3hUeEsrU0dKUWI3NFhSN2xqVkp1YVk5TWRDUVZjZktzTmNQOWlOMXhBOW1WRzdQWHQ5ZVhQc1BvR0VIWlkvQjM1cjdPQjJWdndpMTRyK2FrL1BmeFdUb2RyZGhheEc3U1EzcWdVNmplMWorTkdQZ2krUFEvVUdrY1IzRFN6N3lsYnY0RFM4RmxKcmlNWTh6ZUpna1RiNjUzMmp1U2dZNnNJaE0raTVuc2kwdEtlVm5OUzBMVlBSZmFEUWdTYmxuR1VxdEVBb09CS255VHhLYVZ4WEthc1J4QkJKTWpwWkFnMWZPRVlhUHlZa0Q3K3NMelVvVWxNbGdWWkw1S2psbUtrcVJ3SHlSYVNObEpkdHF3ZFlrRjZ4VU5sREpuaTcxa0JiZXBrbVREZ0tWN0hXbGpyUmhmRnY1U21XMWZ5TVVPeTZDbldBcFB0Sk4ySWFucE1FUFFCazJnd0laZ1lMMmZvSnRjY0NlanFKd0p0L21COU8wZjBBUkJNMk9uV0JtRlFqODJ2Q3FWRFlnTkh1NjFKVzJ4RWVIU2RnUjZ1ZFBJZkdHbTZTa1RJNW5HdlhoTGVkSExLQlRJSDM0NWpWdDBsSkZ2OXhYeHZjQStXVUNwcTJBeFJkeEFQelNiWDZuYUVHaGl3azR5YnhGQjg5Q1FxKzU4TUo0YnRabit1SlhxL0VyMHNwNFJ5cnVXOEpKY3liQ1ZtbFNFcjkvbEY5QWFwRWxjZ1VVcTBTRlgxTTVBSXpKcU5oYWhiSWFjUndCVDFycS9nNDFHaEl5enhNemNlQmJ3ZytmQkZaWnZGOHdoZDlGZTlXVlo5RkZsNXhLTFZwa09qUVdiVVlSVUFTYUdnTEJDKzNBY2lhV01ndG1uMFBlZGJNalF2SDQ0MytqMUwxR21qY1I0VVVMT0dSSk5HS0ZXaWJtNVJYUXpIKzhRODgrTzRzdFNpako2aDZLRnpLRXZyVHJVQWxMZmkwSHB0VWpJbEJMeTlFaU9VdHdJakFRbzl4anhNVmJLTjBhQVN4RmhLelBuOHliUDB0Sk1hSm9ORkVSVUFRU2lVQjV6dGY4bmNIZFJsOUJaNEVjRStud0lyWExUbkRSMlllUHBpbjNQczF2a0NIcTFUYWVGNm5ieWRBZVR1U29tMjdidFNSSEFHY25Qd21EL1VDQzlyZ0ZzbG5qNTZDUGx6U3V2UEljSlVZTEZ2MVZCQlNCT2tiQSsvT3paRDFZVWNjZGMzZTNIUnREbjFpcVpWV0s1VnRMejlyOUdPcHJrVm9oVUl0TEpSQ2drWnJORjZ0UXhtUk1SRnMrQkczVjhmbkxlU2wxckJSVVh4RlFCQlFCUmNDT1FFQzlXZ1lGZEt2b1UvZ1N0bGZRc0pNSWVEcnlaMWhxNmlBczY2SW1zSXpLRFZraUN3Z09WejZjWmkyekJuYUdHWXZTejJ2dStXbzExaFI0cmFjSUtBSjdQQUlwcVduVW9YTTJiL3JoVFR4OHRtWkhMWlorQSthazBiOEJZMk9QQjZNZVR0RHo1ZHdaY1hjTG9kZ0ZBL0xEelcvNWVnQytJSUJENG5qYnZZU1JqcnJyQXkvcWpidHpyYUFJS0FLS1FEVUlRQ2VadzlQNDN1a3BwemI0a0lIMDhkK21tV2Nzb1RQeHFTNzQwS1hoK2xmcXFPOGNBclZZVmhXTGtMOEF6YTlFRW9JRStlR0JXUkdna0NUeXhhRjg2S0ZZU1ZWZkVWQUVGQUZuRVhCM1BzclpCdXV3dGFTT1J4Z2pRM1NxR0NBeUJPaFVrS1M2eENCUVkzSVVvWUFFY2NDSkQvSkRQb1FLaHpBRWl3TmhPVXltL2lnQ2lvQWk0Q0FDeG1JTVdJNHBmYzRpZDVkWWRyODRPQUFIbW5JeE1TYjFQdHZvVk9oVk9TY3hLcUJENFVUbk90Q2xOaEdHUUkxMnEwSlFzQTVGVUlqRGlaVUlId1FwUWhXeXRKY1Q0WWFOUjZPS2dDS2dDTlFZQWVnWTBTMElKM2xTS09QNGw2bDAxZHRVbnZNZCtjb2lmNkdqeGgzV291S3VYYnNvUGQzNmVEVEdhc2FibkVHdTlvZFFhcDl4dkRTSEZ3YUV6Z2RkbWRmWUJYem9YMU1uWUp6VVlpaGFOUUlDY1pNakpoN0lUNFFwYllvUUpSM0VpTEk0RUVZZENCTUg0a0tzVWw5OVJVQVJVQVNjUUVCMGtQaEo3bVJLNlQyT2ZEM0hCblVTK2hFU2RhTFBtclNSczJRSmRlN2MyWHc3RWpyUjQvR1lOKzJrcE9ETlA1WnF4amtnRHo0YzlLam9WRGsveENXL0p1UFFPcEVSaUpzY1JWaG9EbUVSbGdoTVNGQUlVU3hJRVNCOE9TSVBTVk1WQVVWQUVZZ2ZBZWdqNkJZNHU1NlN1T1JMR1ZNd3hwL3BNNTZnd3NJaXV2NjZxeWtqbytMTHRaR08vTXpNRExydTJ2RXh0bWhaZ2JBRVFZcmk4SkZscEdHTTRrT25ZdXlJNDVDNC9Yd1FWdWNzQW5IZmN4UXlGTUVnSGk1RUVDT0VLd0pER0ljSTFkbFQwTllVQVVWQUVRZ2hBTDBqQjNTUkhFSXVJQ01KeCtvWEZ4ZlQ4dVhMNmY0SEhxTGk0cEpnZllTUmhqeDhLRHJXOWxCT3hnaTlpREhhU1JKbmd6U1VBV0ZLSEN0dW9sdEZwNktjT3VjUmlCdFZDQXNPQW9XRFlDQWtDY3R5S2RKd1lCSklXUkVzNGxMSFZOUWZSVUFSVUFRY1FFRDBreEFQZk9pb2VFZ3JVdG1iYnJ5T3VuZnZ6bytnYlFnU3BCQWowcENITXBIcVJrdkR1RUI4SUVVaE9MT2tHaUJFcVFkWUVJYmVsUE1UblNyMUhJQk9td2hEd01Va1ZhTzl3Q0ljdEFlQmdmZ2dRQ3lqd3NrbUhDRkNlM3BwYVNsdDNMaVJEam5rRUZOV2Z4UUJSVUFSY0JJQlVXdlIvSnIwaFE4V1Q3N25QbHEzYmoyVFlWZlR4TnExNjZsYnQ2NTB4KzBUekxKcVBPM09ueitmZXZUb1lmU25FQ0hJRWpvVFB2UXEwdUVReDdtQURIR0kva1VaSWN4NCt0YXkxU01RdCtVb1pDZFhMSWpMRVc0WlFtaFNYcTU4RUVlNjFLOStpRnBDRVZBRUZJSDRFQkRDZ0MvNlJud2htSGo5NXMyYjBjUTcvOHJFMkkxQWlqZ1FSaHJ5NG0xUGRDQjBJOEx3b1VOaFBTSWNmZzVBUUhRdHlpTmY5R3Q4NkdqcFdCQUkzUW1PcFRTWEVZSElSRU0xaEhGVmd3UENFc0VoRDBzR2VFTU9oRzRuUnFTcFV3UVVBVVVnVVFoQUw4R0o5U2p4MnZSbjZiMlF0WmFVRkxxL0dXKzcwSk9pTjFFWCtsRUlFbkhSby9DaEw2Rkw0WVFRaFZTZE9DL1RzUDVVUUNCdXk5R2FISlpwTDVZaWxreEZRQkNZRUNUeUlWUk1BTGtTUWhqbElYQjFpb0Fpb0Fna0dnSG9KaWNPN0VxZGZNOVVXck5tbmJFWVlUVWlqRFRreGRzSDlDTWNkQ0gwb3h5SUkwOTBwQmdWMHI2VUY1S1VkaEtOWTFOclAyNkdnaURrU2t3RWl5c2FDRW9jaEFjQ0ZFS0VVRkVQUGh6cVMxanFxSzhJS0FLS1FFTkZBUGNiSjAyZUVpUkdMS1hLRWlzSUVua29FNCtERG9TT2hMT3Zyb2x4WWRlVEtBY2RHa24vU2h2eDlLMWxxMGNnYm5LRUlPVEtCc0sxa3lLRWlRTnB5RU5ZQkljNmtxN0VXTDFndElRaW9BZzBIQVNtUGZSb0JXTEVNNDA0N0FRNTdhSHBjUTBZK2xISUR2b1JCNXlRSnZRbDh1RkVkNHIrbGRVNnBLdExEQUp4a3lPR0FhRkNrQkFpRGdnUXZxUkJnQ2dESjhLVlNZQjBPVXdCL1ZFRUZBRkZvSUVqa0pHUlFmdnUyOCtRSVVoUm5CQWs4c0pmRGlCbG92blFtZENGNGtzNUlVWG9VYXpLSVIrSE9OUVJYWXQwSlVoQnhsay83a2M1UUhJaUdDRkZEQWtDRXlLVXNGenQ0TkVOQ1dQNUFIRjhzbXJZc0dIT25rMGphMjNldkhtMFljTkdPdjEwZm8raU9rVkFFV2hTQ0h6NzdiZjhHRWczU2sxTk5UcFZWdG13V3hVNkZIR1FIL1F0d2tLQ0NDTk5kS3FkT0pzVWdBaysyYmgzcTBJb2NCQ2VPQWdKY2VTSnVZKzQvYW9HZWJLdWpyQzBJMjNVMUwvNDRrdHA3dHpQSTFaZnUzWjF4UFR3eE1XTGwxQmVYaDRkZWVRUjRWa0pqVC84OEtPMFlNRkNHak5tZFBBdEdBbnRVQnRYQkJTQkJvTUFubDJFRS8wSm5TbHBTQmY5YVNkRzBadENsRkpmMGhGWDV3d0NjWk9qQ0F6ZEl3eWh5QlVNMGhDSGtMRWNFRzVsUXNoSXcyRVhMdXJWMVBsOGZuUDFkZTY1WjFkb3d1Mk8vZFQrOWErWENRUTVaODdzQ20wa09uTC8vVk5weDQ2ZEZmNGhFdDJudHE4SUtBSU5Bd0V4SkRBYTZFMGhSaGdSOHRpR0VDUHlvVzlGaDBvZHBFSGZxbk1lZ2RnWkpOQTNCQUZCd1FuSklXNi8ra0VaSE1pSDhPQlFCa0szQzlsa09QQ3oxMTQ5NktxcnJuU2dwY2hONEZ6a1BDS1hxSDRIYnFRMmV2YnNTZndYMFVVcUgxNnd1akxWNVllM3AzRkZRQkdvT3dSRWorTC9GQTc2RXVRbmI4T1JkQkNsaEZGR2RLZ1lHTkpPM1kyOGFmUVU5NFljQ0FrQ0VtRUJKckVjUVNCeUpZTjhoRVdBRXBjMFNVODB6Rjk5OVRVZGZmU3hOSHYySjhHdVpzMTZ6YVQ5L3ZzYU92UE1jK2oxMTkrZ0ZTdFdtTFJubjMwdVdPNmYvNXhKcDV3eWhucjA2RVdYWG5vNUxWejRRekR2azA4K05lWG56UG1NUm8wNnhaU0J2MlRKVDhFeWVGbnhsQ24zMGRDaHcweis2YWVmYVN4VUtUQjkrZ3k2NG9xS2IvRi8vdmtYZUpuMU5GUCs3TFBQcGJmZmZrZUtVMDdPWnRQbk8rKzhTK2VkZDRFcGc3YmZldXZ0WUJrRVhuMTFGaDEzM0FrbUgzNTRmb1hDR2xFRUZJRjZRUUE2VUt4SEVCeDBKSHd4S2tSbm9oekM0aU1mWVhIMnNLU3BYM3NFNGlaSHVXcEIxN2pLRVI4Q2c0T2dVQVo1UXBZbWczOGdZRXdHK0U0NjlCbCtTQis0ajlpblQxKzY4Y2IvbzUwN2Q1cDN1dDV5eXdRNitlU1RhYSs5ZXRDMTExN0Q1RFdVT25YcVNMZmYvamY2MDUrT01rTjc2cW1uYWVMRXUrbW9vNDZpeHgrZndlTXVwM0hqenFEZmZsdHU4dlB6ODJuMTZ0L3A3cnNuMDRVWFhrQjMzbms3YmQrK3paQ2hLY0Evanp3eW5iQmtlK3V0dDlETW1mOHdIellkUGZwVVFsMjRyVnUzbXZHWUNQL01tUEVZVFpwMEQ0OW5DRDM1NU4rcGE5ZXVkTU1OTnhISUVLNnNyTlQwZWYzMU45SmhodzJqaHgrZVJoMDdkakxuVmxob1BXT0YrNiszM25vYmpSNTlNczJhOVlxNWo0cHp4NzFOZFlxQUl0QndFSUJGQ0QwcGhJZzQ5QmgwRjNRbm5PZ3h4S1dzNUtFZW5QZ21vaitPSVJEM3NxcjBEQUhaTFVnSURuRUlDZ0lWc2hSQndzZUJDWUE4U1pmMmF1Ti8vZlUzVEhTOUt6Unh3Z2tuMERQUFBHblM3cjkvQ2gxNzdQR0dlSENQYjlDZ2dYVGRkWDgyZVljZmZwZ2huKzNidDNPWlkwd2FpSERxMVB2cCt1dXZvNXR1dXNHa0hYLzhjQ2JLbzluS2ZOMlFxRW5rbndjZmhHVTQxRVN4SEhMSEhSTnB5NVl0MUw1OWUyTWw5dTdkeXhDeHgrUG1GNjBmVEN0WHJncGVWRWdiOE5IblF3ODlRbGRlZVFWTm1IQ0x5Um81OGtSRDZMQXdzV2xISE1ZMGZ2eFZKcnJ2dnZ2UWlCR2o2TXN2djZJVFR4eEJ5NVl0TStubm5uc3V0VzdkaW9ZTUdVSmp4NDZoRGgwNlNIWDFGUUZGb0FFZ0lJWUM5S0VRSS9TbmtKM29TZ3hWOUtyZHR4T3AxR2tBcDdYSERDRnVjcFNyR3ZnaUtFbERISUxHSVdrSVE0aENoZ2pEaWU4RWt2dnMwNjhDWWFITk5tMWFCNXR1MWFvVlBmYllkRHJublBOTTJoZGZ6QTNlOEE0V3NnVldyVnBsWXM4OTl6eHQyclFwbUlObHpjOCttMXVoci83OSt3ZnpCdzRjYU1KLy9HR1I0N2h4WStubW0yK2h3dzgvZ280Ly9uZzY0b2pEbVdDUE5DOFdEbFlLQkZhdVhHbEM0VHRtanpubWFNSVNybGliS0FSeUY5ZXZYejhUbEhFT0h6N2NrT3poaHgvSlM2dkhjdCtIMGZEaHh4RXdVS2NJS0FJTkJ3SG9TRmxodzZpZ0U2RkRSWThpRFdIb1RsbCtSUmlIbEVVYjZoS0RRTnprQ01GQUlDQTlDQllPY1RuQ2hTbHhxUU5mQk96VUtjRktBd2xVNVZxMnpBcG11OTFWcnliak9VeTRndzgrbUdENWlUdi8vSE5wd0lBQkVqVStydTdFd1RxME96eS91UC8rZytqamoyY1Q3bjNPblBraUwvSDJvVGZmZkkyeXNrTGpRUjJ2MTNvUnU3MDlwRXNjL3h6aVBCNXJDemppd05MdWNLR3dhTkVDK3VpajJZVG5xUDd5bDF2NVRSNlp2TVQ2YjlwdnY0cGp0OWZUc0NLZ0NOUXRBbUlaQ2tIS2JsVVFuK2hJK0lpTHJwWC9kK2hmNkZZNDBhbDFPL285djdlUVpvL3hYQ0VJT0FoV2hJZzR3cEtIT0lRb0NoMkNsZTNKS0NjdkJVQzV1bkQ0UXZlZi8zd2RuWFRTS0g0RjFGcHpqMjdXckZmNUhFSmtWbEpTRWh4SzM3NTlUQmlFZS9ubGx3YlRZVG5HNHpaczJNRDNCRHZ5ZmMwL213UDNBL0ZjNXZ6NUM5aVNIRjZocWI1OSs1cjR3b1VMelQxSHlmeisrL25tVVpXV0xWdWFaekVsUFpxUCs1akFIa1NPQTB1OEJ4ODhsSmVPMzFGeWpBYWFwaXNDOVlDQUVCMThrQjE4NkVyb1VlaFhoS0ZENWFVQUlFTWhRdVJMMks1MzYrRTA5dGd1NHlaSENCRENBTW1KZ3hCRmtFakhJWUtHME1YS2hLQlJGMEpHZWFmY3BrMDVadW5SM2g3YWwzdUlEejc0RUdHcDg0MDNYcVBObXpmVHlKRW4wN1BQUGh1OGJ3ZHJDenRXY1dDalMzWjJ0aUdXZSs2NWx6ZlJwQm5yRDd0US8vclgyODA5U055THJNN2hQQys2NkZJQzZVNmI5b0M1NXdkTERrNkkwTjRHL2dHd3NXZmF0SWVOVllubDJtKysrWWJIL0NiZng3emRYclRLTURZU1BmZmNDMllaR1Zicm9rWC9OZVZsK2JYS3lwcXBDQ2dDZFlZQURBWTQ2QXBZamZaVk50R2pZb1NnSFBRbzRuRElGOHRSZkpPaFA0NGhFRGM1UXBCd0VJaFloaklhSVVRSURrNThwQXRKd25mUzRYdHFLMWFzWUF1djhuT09lRVBPZDkvTm8rZWZmNEVlZmZSaHZnL1p4aHhYWDMwVjNYZmZBL3hZeE5IVXI5L2V4cUw4NXB0dnpmMUJiSFRCaHBpNzdycUxDZHpETzBJZjVWMm8yODJRa1hmTk5kZVlNTTRwM05uVEVIN2lpY2NKTzJQUE9PTXNVeFE3WXJFTHRVZVA3aEhidVBQT084emtmL1RSR2FaUGxML2xsci9RWlpkZEVyRjhlUCtJWDNmZHRid0xkaHRicXRlYmJDeXAzbkREOVhUcXFhZEdLcTVwaW9BaVVFOElDTkdKTGtVY1lURWNvRU9nUTBHYzhKRVAvWXQwbEJGZGlyZ1NwUE5DclBHN1ZVVklFQXlFQk9FaERRZmlJbGlFa1laOGtDbDhMS3RpeWZIUVF3OTEvb3hxMFNKMmpQTHBCQ2NubXNMWWQrell3ZFpjUzU2Y05iTjJzYXlMY3c2L3p4aHRxT2h6MTY1ZHRkcEVnM1BKemQzRk8xWmJHMWxFNjB2VEZRRkZvSDRRK082Nzc2aExseTZVbHBabS9rZWhNMEdBSUQ2RWhSUWxMcU5FSERvQ1BoekNLSy9PV1FUaXRoeEZDUEJCZEhBSTR4QWhRYWhZTWtBYXJtamtDa2V1a0ZDdUlWN3BSQ0kvbkFNc3p0cTQ5UFIwODR4anJHMmd6OXJ1THNXNTFIYmNzWTVYeXlrQ2lrRDhDT0QvSEFlTUJwQWlEa2tUL1lpNE9LUkJkOEloWGZTdmxKVnk2anVEUU5YYk5pUDBJY0tDTHlRblFoS3pIM0VSSW55UW94eUkyd1Vib1F0TlVnUVVBVVZnajBmQXJqZkZHc1JKaTY2MDYxSG9URGxRUm9nU3ZyU0RkSFhPSVJBM09hSnJFQndFSW1Rb2dyTGZneFR5UkhuazQ4QUVrS1VBeE5VcEFvcUFJdENVRVlBZUJCbUs3b1J1UlpxZENJVWs3V1ZRUndoVmRXbGlabENOR1FvQ2diQWdUSEVpVUFoVEJJWjhJVVFJRkhseVNEMzFGUUZGUUJGb2FnaEFYMElYUWorSzdvUVBKNFlId3JoTkJTYzZGV0hVZ1Q2MTYxK2txM01PZ1JxUm93Z1Z3aEtoWWtoMjRVRndraWNQMWRzRmJ5L3IzT2xvUzRxQUlxQUlOQzRFUUpDaVV5VU13ME9JRXo3MHFlaE1sSlc0Nk5UR2RjYU5ZN1J4azZOZEdCQVdybHdnU0JFWTRyanFFV3NSY1pURGdUSlNEZ0pYcHdnb0FvcEFVMGRBZENSMEk4TFFqYUl6RWNZaGxpTFN4VWw1RUtVNjV4RUlJUjFqMjBKcUVDSWNoQ1lDRTErV1cxRVdBb1FUSVV2Y0pPcVBJcUFJS0FKTkZBSFJoZkJGcjRvK3RldExlemtoUXRHL1FxSk5GTUtFbm5iYzVBaGhRRmdRSWtoUWhDVUNsbnd4K3hHSElIR0lJQkVXZ1NmMDdMUnhSVUFSVUFRYUtBS2lBMEdFUW5ZWUtuUW5WdC9FMmZPZ2QwWC9vcHlRcXBSVjN6a0U0aVpIQ0VxRUFpR0pnTVhIMEVDQ0VDTEs0aENCUXBBZ1ZNUlZxTTRKVVZ0U0JCU0J4b2VBa0o3b1IraFE2RmJSbmFKZnhjY1pRbTlHMHIrTjcrd2Ivb2pqSmtjSVNxeERDQkVPUW9iUXhFcVVlNURJUTFnYzh0VXBBb3FBSXFBSWhCQVF2U2c2RkRsaVBBZ1JTaHhsY1lnZVJsa2hXWVRWT1lkQTNHd0ZJVUVZRUE3Q09PUktCMkc3MEJER0lVN3FoYWRMdnZxS2dDS2dDRFFsQktBVDhUWXgrS0pIRVJaZENpemtzUTZRSXNnUytRaExPWVRWT1k5QTNLZ0syVUY0Y0NJa0NVTjRjQkFjSEFRdVpjVkhudVNiUXZxakNDZ0Npa0FUUXdDNkZQb1JPaFJoNkU3Umx5QkVwSXQrUlRyeVJmK0tua1crdXNRZ0VEZXlFSTRJUkFoT0JDYkNGSUVLQ1VvY0FvYXpDemt4cDZXdEtnS0tnQ0xRc0JFUWdoTTlLWG9VbzRZaGdYemtTVG1rbzR6b1VkRy9TRmZuUEFKeGt5T0VCcUdBOENBb3hDVk5oQ2h4eVVkNUNCUysxRVY5ZFlxQUlxQUlORlVFb0I5Rkh5S01BM3MweEdvVVhDUVB2dWhiNkZPSm93MTF6aU1RMmk4Y1k5c2lFUGhDY0FnTDhVRjRjSklHSVdKTkhjUXA1SWs4V1dlUHNWc3RwZ2dvQW9yQUhvVUE5Q0Iwb3VoUmhLRXZaVWMvMG9VOG9TL2w4UTR4UGxBV1pkQ09PdWNSaU50OGd5QWdFQndRSWdRRndjR0pJSkdHZlBnb2czUVJKTXJKSkVCWW5TS2dDQ2dDVFJFQk1SYWdLMFUvaW02MWt5YjBLUFN1L1VBNWxMSHIyS2FJWVNMUE9XN0wwUzVRREF4Q2d0QkFnbkFnUWppOFR4VjVpT01Ra29Rd3BRMkUxU2tDaW9BaTBGUVJnTzZFSGl3cEthbXdLMVhJRC9uUW43QWF4UWhCSGh6U1JmOUtIRDdxcUtzOUFuR1Rvd2hHQ0E2a2h6U2ZqMjhlNDJDQkljLzR6SDBzV3ZLVjg0ZVBlYXhsWmFVbW5hY0RsMldyazlQVktRS0tnQ0xRRkJHQS9pdjNsckp1dEZiYWVFMHVvQ3Y1Zm1LU2g3eGxKUVlXczlUcXQzYXFHdjNMT3JhMHBOUVFwdGNYZXVFS1NGSElWQW15OWpQS3hTUVcxOTFjRkJlTEQrSFNMWXVwNE52YnlMdDVQbSt4VXJLcnZVaTBCVVZBRVZBRVlrUEFsZHlNVXZZYVNjME92NS9jR2UyQ1M2K29yUVFaRzRiUlNzVkZqaUJEV0lVQ2VzbjI1WlQzNWxIa0w5MGRyWDFOVndRVUFVVkFFVWd3QXA0MisxR3JNNzRrbHp0RkNkSWhySk55emptYmNHeSs2QUlxK2ZHL2xacmQrZEEwK3VPcUs4Z2Z1S2NvWmp0SXN2aW5wNVFZS3lHbUNZcUFJcUFJMUMwQzN1MUxxWGoxaCthMkZZd1lIT3BxaDRESFgxSWNhSUhCREFQVXUyNGRGWDQyaDF6OEpXby9iN0J4cGFlYnF4SVFvOWxZczJ0RjdYclgyb3FBSXFBSUtBS09JT0RkK1p2UnkvWk5PbzQwM0VRYjhXUy8rWGJVVTgvLzRIMlRsMzdFRVlZWWNUVUNVb1QxaU1PWG54ZTFybVlvQW9xQUlxQUkxQjBDMk9Rb0ZpTjhXZVdEcnk1K0JKSktsaTJsOHMyYks5WDBGeGNicXhFWm1hTk9EdVlEZE94UUJVbDYvL2dqbUs0QlJVQVJVQVFVZ2ZwREFMcFpEb3dDWVhVMVI4Q3o3WmEvbU5wcGd3ZFRtMG4zWUl1VGlSZCtQcGY4aFlXVTNMTVhwZXl6RDNsemNpaXBRNGVnMVZqODg4L2t6ODhuU292U3VRdlA0bFMrWXJFTFRLOW9vbUNueVlxQUlyREhJeUM2TUM0OTZNZXo0VldUbnJTN3h3T1k0QlAwcEEwWlNpV0xmcURpUll1b1lQYkhsRG5pUk5ObHdRY2ZHRC96cEpPbzZPdXZhUHZVS1pSMTNmV1VmdHh3YzBXUy84N2JMS0xvUXZJZTlnTDUyeDFxMnBBWEJJaVBCMTV6bUd3UE91aWdCSitlTnE4SUtBS0tRTU5FWU1HQ0JaU2RuVTNKdktjRHp6TEtXM0lrREY5dVkrRStvaUc5WlkrUS8zOHpvcDZRRUNQOHVFZzNhb3ROTjhQVFp1SmRsUHZDODVUL3h1dFV1bXlaSWNmU1gzNmhzdFdyS0Nremt6S09Qb2J5MzN6RElPVGRzTUV5MjltaUxQcGhJYVVOcm13WjJxRzBYZzRRK3NZakJJYk5QQkE2blBqMk9ocFdCQlFCUmFBcElBRHlTa2xKTVM5UmdTNUVIRDdJRXFRSWh6ajBxQmdXVldsY0ljYW1nRjFkbktONVE0Nm5ZMGZUbCt4Y0xmajRJeE4zdDIxSHNCQkxsaTQxOGJJVnk4bTNiU3VWNzlqQmIzYndrc3Rqa1Z5a2dVS2dibjdsVWZnVmpCQWlYb2NrTDlLTlZGL1RGQUZGUUJIWWt4RklUVTAxcHllNkVLUUlaM1JuZ0N3UmhnNEZpWUl3ZlV5ZzBkZnJUSFg5Y1FnQlE0NndDT0dTbXJjd2Z2bTJiY1l2Vzd1R3ltYiswNFR4VS9MVFQvelEvNXVVY2ZJcDVJR1EyQXFNNWlCVUNCTStCSXNybjdTME5KTldWRlFVdkVxS1ZsL1RGUUZGUUJIWWt4RUFLY0pZRUNNQkpJZzRMRWhaYXNYN1ZNV1NoQzR0M1pNQmFXRG41dGwreCsxVXZQaEhNNnkwSVVPTTMvTHFhNmpvcXkrREQvNlhzdVZZekx0YVUvcjNwK1pqeGhDMWFVdnVIajM0dnJCbFVVWTZKN05Fd01LSEEwbEN3Q0JJRWJ3SVAxTGRlTk1XOGYzU2VkOStSZTNhZGFUV2JkdFNCOTQ0MUs1ZE8yclJvZ1ZsOHRKd1JJY2IyendKSTIwYWlsaGVFeFVCUlVBUmNCQUJ1Y1VrT2hIa2h3TU9hY2lIbnJUSGtXOHR1SnBrL1VrZ0FwNWkzb3lEaC91Ymp6dURzRGtIenRPNU16VS8rNXhndDhWOGY3SGt0MStwMmNtanlkMmhveEZhbTFzbVVON3JjN2xNYnJDY1BRRGh3c0dIUUdVOVhKWlo3UlBCWHE4bTRZL2VmNHY2NXIxQ3lldUpWdWI2Nk1kU0R4VjRVNm5FbGNIdkcyeEQ3clRXbEp6Wm1qS3pPbENMMXUycFZldDIxSVBKL2VDREQ2NUpkMXBIRVZBRUZJRmFJNEFWTmVoSFdJNnl5Z2E5S05hamRJQjhXSkFvTDY5c2tUejFFNGVBcDhNTC95QTNXNEo0QzA0MGwzYlF3ZFRwamJkd2R6ajAyUlMyemxKNjlxTHluRTNScWhuQkl4TUNGMmNuU251NjVOZkVUMGxKcFg2ZDBpZzdpOGpMQy9LZU5DWm0zQTcxRi9JUEg5NzFWRmJpcDZKU1ArWHQ5TkhtZGVXMDRCTXZ6ZjFnTFAzbHprZUN5eG8xNlR0YW5hMWJ0MUk2WDNRMGE5WXNXaEZOVndTYU5BSS8vL3dMVFpwOFgwUU03cnhqQXUyNzd6NFI4K29qOGZVMzNxWTMzM3lIVGp0dERKMCs3bFJIaG1BblJKQ2svVUFIc0JwaFBjcHlxNFFkNlZ3YnFSWUJqNmRqcDJvTG9ZQ0xyMTdFNmhPL3Vvb2dQd2djNWVGd1JZVHZQQ0x1RkRHaVhUeFNrbDlTUm9WbHFWVEtrK21YMVNXMGFhZVhVano4RnA5eVhzZFBZdXZWemV2NEhNZEkybWVsME9tSHA5RG5TOTZoS1ZOYTBaMTNUa0l6anJpdnZ2cWFicnp4LzJqNzl1Mm12VU1PT1ppbVQzK1VPbld5TmowNTBvbXRFWkR3dSsrK1I1ZGRkb2t0VllPS1FNTkhvSHYzN3RTOWV6Y3owQXN2c0ZhcVpyNzRpb2tqcnlFNUVDTWNmS2ZJVWNnUXQ1dGdIZUtRTk5HZEVoZWRpYmk2dWtIQXVpa1lSMThpSFBoQ2VsVlZSeGxjSWNHWDhoQTh3dEpXVmZWanljTjBjYk54Nm1ZQ0xDOHNvcTkzN0UzSG5mRTM4cmg5bE5tc2xmazJXbWx4UGhVWEYxQ0oxMDN2Ly90TzJydk5KdXJWSVkzKy90NEhOSEhpNUZpNnFiWU1sajdHajcrR0preTRsYzQ3N3h6Q3hxTWJicmlKN3J2dmZwb3g0OUZxNjlla3dKWXRXK2llZSs2bHl5Ky90Q2JWdFk0aVVHOElOR3VXeVhzQ01rei8vZnZ2YTN5Skk2OGh1WEZzTGI3QjFpTjhwL1NXNkVENy9ndTBEWDBKWis4SE9sUFNHeEl1ZS9KWVF1dWRjWndsaEFwQjJZVVhxYnFkRENGY1dJNDQ0QkIzMHZsOXNBeVRhRWV1bC9icWR3Q05PdkU0T3VINDQybnoycVcwZE42N2xKNldUQ2VPR0VGalRocE9YVnQ3S0lXSFVWcm1DNDdIaWJGczNicU5DZ29LNk1namp6RG5oODFBOTk5L0gxdDFJZUw2NUpOUGFjeVkwM2pKYUQ4bXRDc0psaDhjNnQxODh5MG1mY1NJa2ZUNjY5YXpwY2lieEc4dW1qWHJOUVNOZS83NUYraWhoeDZoNWN0WDBBVVhYR3pTaGc0ZFJsOTg4YVVKZi9ycEhEcmxsREdtcmIvOTdZN2dVampxVEo1OGo4a2JOZW9VcXpIOVZRUVVnV29SZ0xVNDY5VVhIYk1hcFVQb1FTeVh5bk9NMEpsSWcyNFYvUXBkaTNRcEkzWFZUeXdDTldZb0NGRElMOUlRUmJBb0k0U0lTUUJCeXhHcFhrM1RURDk4TnJsRlBrcHRsazE0Qzg5MzN5K21qeDRmVDY2dkg2TGJyajZWeGw4MGtzNGRONXhjdVd2Sms0b0hiZkVvaXJYa1c5Tis3Zld5c3p2UmdBRUQ2T0tMTDZGLy8vdFZXcnQySGJWdTNZb0dEdHpQRlB2bGwxOE5JWjUyMmxqT2Y5bE05bHQ0WXhQY2hBbC81ZkpyVGZyVlY0ODNSUG45OTkrYnZHMzhhTTN1M2Z5cXZvRGJ2WHMzN2R5NWczcjA2RTczM2p2WnBMN3l5ci9NQmlNUTVtV1hYVUhubjM4ZUlXM3g0aVUwYmRyRHBzeXVYVHZwdWVkZW9Jc3V1cEF0MlVla09mVVZBVVdnSGhDQWpvUXVoSDRVTWhTOWlTVlcwYSt5WXhVNlYxM2RJUkQzc2lxR0JnR0M2RVNRa1lZTHdVbys3alBLMVJES1F2Q09DeHBycS94VytoMGxidXJkNzBEQ0E3Wjc5KzFCSjF6ekJEVnZsa0xuYjhyaFpjNENXcmw2RXpVcitoK2ZSSW9aTmcvVFVmZmlpLytnSjU5OG1pMjBlNDAxZU5CQmc5bDZuRXE5ZS9lbUw3LzhrazQ0NFFRbXJuTk5udzgvUEkxKy9IRXhrMlE1L2VjLzc5SEhIMzlJKyt6VGp3WU5Ha2cvL0xDSTVzejVqSVlPdFhZUVJ4b2tkcTkxN2RyRlpQWHMyZFA0bjMzMkdSMXp6TkUwY3VSSUU3L3V1bXZvdHR0dTUrTldFei92dkhOcDdGaG5OaFNZQnZWSEVXZ0NDR0JEaml5ck9uWFBVV0FUZ29RUEI3SVVLeEc2RXVuUXQ0N3JUQm1BK2hFUmlQdFNSQWd2WW11MlJDa0hrb1JRaFJ5UkxoYWtyWGl0ZzRia21DQjNGTHRwMGFLRjlQR0hiOUVQODcrZ0x0MTdzaVhaaWM2NStFYTY1c2E3YWV5WmwxS2FpeTFHSmtVZWl1T3VUWnMyZFB2dGY2WC8vZThuZXV1dE4vaGNmWFRWVmRlWWZsYXVYRVY5Ky9ZSjl0bXFWU3REWkJzM2JqUnBzQVRGOWU3ZGkxYXNXQ1hSbVAzWnN6K2x1WE0vNXlYVkFlYTQ0b3J4Wm5PUS9MTzFhOWMyNXJhMG9DS1FTQVRXckZsblZsZDYyRGJmSUl3VkYrUTFKQWRpaEJQZnliR0pqb1J1UkJoa0tEb1RZUndnek9vTUVpZkhwRzJ4RVJjdkNCQVVISVJZblJNaGk4QVJGOUtzcm02OCtXWTBMajl0Mk9tbnBTOU5wRncycVBKTCtLTWh2RWxuNldZdlRmajdselJreUlIMHkwL2ZVb2MwSmtjWG43cS9MTjV1cWl5L2V2VnFXckJnSVoxMTFwbm1QQWNQUHBDWFIyK2ljODg5MzB4czdNeGJ0V3Axc0ExczRObk1ud3ZyMEtHOVNmdmpqeTBrQkxtSkxWM1p5WWQvakYyN2RnWHJZVmsxbWp2NjZLT005VGwxNnIzUmltaTZJdEFnRUxoNzBoUXE1UGMwcjJFeXZIdlMxT0NZQ2dvSytSR1BLZlRDODA4RjArbzdZTitRNDlSWVJCZkNGd0xFL3pxSVVmUXM0bkRRb1VLZVR2V3Y3VlNOUU55V28xaUFFRnBWQkNuRWlQSW9oME91aGtUUVZROHRqbHllWEc3dXA3ekVTMjI3N2tXVFh2aWVUcHYwS1YzMHdHZDAxdFJQYWVwTDgzaVR6REJlYWsyandyd3QxREtEWCtUTEhDK1RNNDZlcWl5YWtaRkJ0OTU2RzIvM2ZzczhzcEtibTB1dnZmWTY0WEVPNERWczJEQjYrKzEzQ0k5N2dPQ3c5SXJkckhpdDNyQmhoL0ltbTRjSmRaWXVYVVl2dnZpU1NVT0hJTXc1YytZUUNIUE5tclhjeHJ2QmNjRDZoTU85UlZ4WllobjJsVmYrVGZQbkx6RDNYWjk1NWxtNjlOTExnK1Uxb0FnMEZBUjY5T2pHcXh2OWVEaCtNNjh4dHhGR21sd1lOcFN4Sm1KRGp1Z2Y2RXE3THNYL01aWlR4ZG56cEk3a3FaODRCRUlTaUxFUENBckNnMENyRXBTZEZFRU1LQy8xSkI1amx6RVVzNjZxeW4xK3ltRURLNytvbURLU1U3bFBFQ0NUYzZtWFB2MzBNOXFadTV2eVZzK2xqbjM0N1RsbHNobW5lZ3M0aGdHWUloMzVCZTZQUHo3REVPUk5OOTFzMG5BUDhhbW5ualJoV0pLVEowOHloSWpuSVB2MDZVTlBQUEc0eVpzKy9SRzY1cHByZWZQT0FlYVZkMWRjY1JtTkdIR0N5VHY3N0xQb1BYN2s1TkJERHlNczIrS2VwR0RmbWQ5bWRPS0pJMmowNkZQcDZhZWZOSFVtVHJ5RE53VmRhdTU1ZHV2V2pSNTdiTHBwUjM4VWdZYUV3TVE3L3hvY0RxeElPSHRhTUhNUERRanBRUi9pL3hrSGRDVDJFaUJQMHVSL0hUQkluVDBVa2daMVduR1RJd1FseEJmTG1lQmVsMXdGb1I1STBtbUhDWldjekVzVFNTazByTzFhK3ZVRmZzMGRiR0xtUFpsa1NaekFGRTJuOUV5anBKUTBTdWJsMXJRVXZQZzNiZ2lxSFA3Sko1OUVvMGFOTk4rcmhDVXBscDFVdXVDQzg4eUdIQ3duMmQvNzJyNTllMzU4WTVaNU5oS2JpWUNWT09UTm1UUGJXSnVvWTg5RG1hZWVlc0k4cmlFNFgzTEp4VXlPRjVueWVMK3NPQkN6T2tWQUVZZ2ZnVVJ1eUpIL1oraEdFQ1djNkVub05qc2gyb2t5L3JQUUd2RWdFRGN6UUdoQ09OVjFCRUhhaFNuMXd0T3JhNmU2L0o2OSt0RG1KV1hVdllPTC90UXZuU2lWZDlwRTNHempvdElDSHhVVWUvbk5PUzdhbmw5T3VYbTUxVFVmZHo0bU95eTZhQTduYnlkR2V6bThjaTZhYTk2OGViU3M0QXVLcFFENnNCT2pwS3V2Q0NnQzhTTWdHM0hnTzdsYkZUb1Jldzl3WVF0aVJGd09pU01QWmFCWGtLZXViaENJbXh5RjdPVEtwcnBoUXNCU1Zud1JmblYxWTgwLzQ4enphTnJQMzlQV0g5NDNyNHpiVmNDdmt5djJVUjRmMi9OOUhQYlRyb0p5S3ZIenV3cUpEMzZNSXptMUdmazlhWFQ0RWRFZmxZaTFmeTJuQ0NnQ3RVTUFxeXdOMlNWcVF3NzBJMGdQZXRWYUFiTStkQ3d2SlJkZGlYSWdTSFYxaDBDTnlCSENoQ0NyY2lKVWxKSHlFRERxNFJDU3JhcU5XTGliR0JBQUFBUnJTVVJCVlBNd2tXNjk1MGw2OE1HZU5HL2VQUE81cXJiZDI1cjdjM3Z6SjZ4YXRteFo0Y2pLeWpLYllMQjhpVEdwVXdRVWdmcEY0T3J4VjlUdkFLcnBIZGFpa3hZanVoTWRLcnJTcmhQRmtFQWF3dENoY1BZeUprRi9Fb1pBM09RSVFVR1lJcXlxUm1ZWExFZ0k5eCtsYml6MXEybzdQQS90VDVoZ3ZXMG1QRS9qaW9BaTBMQVJrSGVxTnV4Uk9qczY2RWZSaHdqamdJNlVQUWQyZ3BSOGxGZFhOd2pFVFk0UUVvUW1nb3MyVEpTRHczbzVycERzZFpDSEpRSVZkRFQwTkYwUlVBVDJkQVNnQjZFYnhWQkFXSXdJK0VnWDhvUytGSjI2cCtQU1VNNnZSdVFvd3F6dUpDQnNISEFRdGhBa3JvNUU4Tlcxb2ZtS2dDS2dDT3lKQ01oS0drZ1AraEMrSEdKQmdoeEZoKzZKR0RUa2M0cWJIQ0dvV0N3K2xFdG1nWXVGS1RlVFVSZHBtQVN4dE5PUXdkT3hLUUtLZ0NKUVV3U0VGS0VIOGY1cGVSUUxjWkNsa0NMMEplTFFvYUpQYTlxbjFvc2RnYmpKRVJZZ0hJUlpsWE9WNXBHdmNJc2hRVU9HWEJoWFEzQkpXQ0lvMlU3ZS9NMG1yaitLZ0NLZ0NEUTFCS0FEZllWcDVPTmJUOFppVE9hZHFxVnNQVUxIOGxIR3BBaUhQQk5pMG5TVkZ6WTFtT3J0Zk9NbVI0eFVybXlxR3JYL3U2djVzWW1LVGg1clQrWGs3bnpzV0ZJeFgyT0tnQ0tnQ0RRVkJIcmlSSmVGemxiMHBXVkNoTkkxVkQ4SUNGL0YzTHVZK3JpYVVhY0lLQUtLZ0NLZ0NPeUpDTVJOamxqN2h0UDdoWHZpZE5CelVnUVVBVVZBRVFBQ2NaTWpMRVlRb3lISHBCcXR5aXJ5aW9BaW9BZ29BZzRqNEhKYkgzQjN1TmttMjF6YzVBaFN4S1ljSEs1Vyt6Ulo0UFRFRlFGRlFCRm9TQWdrc1Q2VzIxM2lONlR4TmJheHhFMk9PRUc1NzVqUy95cHlwYmRyYk9lczQxVUVGQUZGWUk5Q3dOMXhHQ1YzRzI3T1NZblJHZEc2MkJLTTZYMUVLQ2FIUEx5S1J6UktkNjZpMGtWVHFmeVArZnlkbFlxUGQ0UTNiWStqcmp6WDQ4eXBhQ3VLZ0NLZ0NEUWVCS0JIWlE4SFJoMkoxQ0tsMmMvUWxkS0MzTjFHVVByZ1c4bWQydHkwWjFiMStQYVh0RjFkRy9iMk5CeENJQzV5UkRVUW5EeXZpSWRTRVFiUlNUcDhITEF1dzhOQ3FuaEdNaWNuaHc0NjZLRFFTRFNrQ0NnQ2lrQVRRbURCZ2dXVW5aMXRQamNudDZwQWFCS0dEOTJLTkJ6UXAwaXoreUErcE1IUWtITGlJMCtKc2VZVEt1WWROUUJaeUE3Z2krV0hkQ0ZDaElVc0lUQjdYSVNMc3NpREU3L213OWVhaW9BaW9BZzBUZ1NnSDVQNXdYL29RZEdYOEpFRy9Rb25lWGFTUkQwYzBLbjJzSjBVR3ljaURXdlVNWk9qREZ1SUVVUXBBa0pZaElmUFJ5RU1raFRCb1M3S3dLRytDQnkrT2tWQUVWQUVtaUlDMEpWdzBJT3cvRUNLY05DYmRrc1FhVklXK2hNT090WitXOHBPakhhOWF3cnJUNDBRaUlzY0FUcUVBaCtDRkN0UUxFcWt3d25wQ1VHaUxNTDRGQXZxRnhVVm1UYWtYSTFHcnBVVUFVVkFFV2pFQ0lEY2hCaHhHdENqaUl0K1JSaDZFOFNJUEJBZzhzS1BTSGxvVC9ReHd1cmlSeUF1Y2tUekFEeWNERUYrRURRRUNmSURhY3FWRDhKSUY0SkVYWVJ4S0RuR0x6Q3RvUWdvQW5zR0FtSmNRS2RDSDRyMWg3TkRHblFwaUJGaEhIQjJuUmxPbHNpWGN1SWpUVjNORVBoLzhFNjQ3aWRDaUNzQUFBQUFTVVZPUks1Q1lJST1cIiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsInZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiA/IChvYmopID0+IChPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSkgOiAob2JqKSA9PiAob2JqLl9fcHJvdG9fXyk7XG52YXIgbGVhZlByb3RvdHlwZXM7XG4vLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3Rcbi8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuLy8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4vLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3Rcbi8vIG1vZGUgJiAxNjogcmV0dXJuIHZhbHVlIHdoZW4gaXQncyBQcm9taXNlLWxpa2Vcbi8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbl9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG5cdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IHRoaXModmFsdWUpO1xuXHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuXHRpZih0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlKSB7XG5cdFx0aWYoKG1vZGUgJiA0KSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG5cdFx0aWYoKG1vZGUgJiAxNikgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicpIHJldHVybiB2YWx1ZTtcblx0fVxuXHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuXHR2YXIgZGVmID0ge307XG5cdGxlYWZQcm90b3R5cGVzID0gbGVhZlByb3RvdHlwZXMgfHwgW251bGwsIGdldFByb3RvKHt9KSwgZ2V0UHJvdG8oW10pLCBnZXRQcm90byhnZXRQcm90byldO1xuXHRmb3IodmFyIGN1cnJlbnQgPSBtb2RlICYgMiAmJiB2YWx1ZTsgdHlwZW9mIGN1cnJlbnQgPT0gJ29iamVjdCcgJiYgIX5sZWFmUHJvdG90eXBlcy5pbmRleE9mKGN1cnJlbnQpOyBjdXJyZW50ID0gZ2V0UHJvdG8oY3VycmVudCkpIHtcblx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdXJyZW50KS5mb3JFYWNoKChrZXkpID0+IChkZWZba2V5XSA9ICgpID0+ICh2YWx1ZVtrZXldKSkpO1xuXHR9XG5cdGRlZlsnZGVmYXVsdCddID0gKCkgPT4gKHZhbHVlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBkZWYpO1xuXHRyZXR1cm4gbnM7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5obWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZSA9IE9iamVjdC5jcmVhdGUobW9kdWxlKTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCAnZXhwb3J0cycsIHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHNldDogKCkgPT4ge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdFUyBNb2R1bGVzIG1heSBub3QgYXNzaWduIG1vZHVsZS5leHBvcnRzIG9yIGV4cG9ydHMuKiwgVXNlIEVTTSBleHBvcnQgc3ludGF4LCBpbnN0ZWFkOiAnICsgbW9kdWxlLmlkKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiY29udGVudF9zY3JpcHRcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2hyb21lX2V4dGVuc2lvbl90eXBlc2NyaXB0X3N0YXJ0ZXJcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2hyb21lX2V4dGVuc2lvbl90eXBlc2NyaXB0X3N0YXJ0ZXJcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvbnRlbnRTY3JpcHQvaW5kZXgudHN4XCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=