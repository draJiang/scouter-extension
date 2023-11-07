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
        isHovered && (props.data.id === 'Default' || props.data.id === 'dict' ? react_1.default.createElement("button", { onClick: () => { window.open('https://jiangzilong.notion.site/What-is-the-default-Prompt-Prompt-5b55e3fc303d425f8cca16d5bee19e7c'); } },
            react_1.default.createElement(react_icons_1.QuestionMarkCircledIcon, null)) : react_1.default.createElement("button", { onClick: handleEditPrompt },
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
const DropdownMenu = __importStar(__webpack_require__(/*! @radix-ui/react-dropdown-menu */ "./node_modules/@radix-ui/react-dropdown-menu/dist/index.js"));
const DropdownMenuItem_1 = __webpack_require__(/*! ./DropdownMenuItem */ "./src/Components/DropdownMenuItem.tsx");
const util_1 = __webpack_require__(/*! ../PopupCard/util */ "./src/PopupCard/util.ts");
const react_icons_1 = __webpack_require__(/*! @radix-ui/react-icons */ "./node_modules/@radix-ui/react-icons/dist/react-icons.esm.js");
// import type { MenuProps } from 'antd';
const contentScript_1 = __webpack_require__(/*! ../contentScript */ "./src/contentScript/index.tsx");
const icons_1 = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
function Nav(props) {
    var _a, _b;
    const [isPin, setIsPin] = (0, react_1.useState)(false);
    const [currentURL, setCurrentURL] = (0, react_1.useState)();
    const [isOpenPromptMenu, setIsOpenPromptMenu] = (0, react_1.useState)(false);
    const defaultPrompt = (0, react_1.useRef)();
    // const { Option } = Select;
    const navElement = (0, react_1.useRef)(null);
    const dictPrompt = {
        title: '词典',
        id: 'dict',
        getUnsplashImages: true,
        userPrompt: '',
    };
    console.log(props);
    console.log(dictPrompt);
    (0, react_1.useEffect)(() => {
        // 当不自动自行 Prompt，自动打开 Prompt 菜单供用户选择
        if (props.isOpenMenu) {
            onMenuOpenChange(props.isOpenMenu);
        }
    }, [props.isOpenMenu]);
    (0, react_1.useEffect)(() => {
        defaultPrompt.current = (0, util_1.getDefaultPrompt)(props.keyWord);
    }, []);
    // 点击保存到 Anki 按钮
    const handleSaveToAnkiBtnClick = () => {
        props.handleSaveToAnkiBtnClick();
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
                                    boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
                                    borderRadius: '6px',
                                    animationDuration: '400ms',
                                    MozAnimationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                                    willChange: 'transform, opacity'
                                } },
                                react_1.default.createElement(DropdownMenuItem_1.DropdownMenuItem, { key: (_a = defaultPrompt.current) === null || _a === void 0 ? void 0 : _a.id, data: defaultPrompt.current, onSelect: () => handleMenuItemClick(defaultPrompt.current), handleEditPrompt: () => openCustomPromptForm({ isOpen: true, data: defaultPrompt.current }) }, (_b = defaultPrompt.current) === null || _b === void 0 ? void 0 : _b.title),
                                react_1.default.createElement(DropdownMenuItem_1.DropdownMenuItem, { key: dictPrompt.id, data: dictPrompt, onSelect: () => handleMenuItemClick(dictPrompt), handleEditPrompt: () => openCustomPromptForm({ isOpen: true, data: dictPrompt }) }, "\u8BCD\u5178"),
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
                    props.addToAnkiStatus.status == 'success' ? react_1.default.createElement("span", null,
                        react_1.default.createElement(icons_1.CheckCircleTwoTone, { twoToneColor: "#52c41a" }),
                        " Added to ",
                        react_1.default.createElement("span", { style: {
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }, onClick: editNoteInAnki.bind(event, props.addToAnkiStatus.noteId) }, "Anki")) :
                        react_1.default.createElement(antd_1.Button, { size: "small", 
                            // type='text'
                            style: {
                                fontSize: '13.2px'
                            }, icon: react_1.default.createElement(icons_1.PlusSquareOutlined, null), 
                            // loading={props.addToAnkiStatus === 'loading' ? true : false}
                            disabled: props.addToAnkiStatus.status === 'standby' || props.addToAnkiStatus.status === 'loading' ? true : false, onClick: handleSaveToAnkiBtnClick }, props.addToAnkiStatus.status === 'loading' ? 'Adding...' : 'Add to Anki'),
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
                                alert('The current AI endpoint does not support image generation.');
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
            react_1.default.createElement(PromptButton, { disable: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified), handleMenuItemClick: () => {
                    const p = (0, util_1.getDefaultPrompt)(props.followUpData.keyWord);
                    handleMenuItemClick(p);
                } }, "Default"),
            react_1.default.createElement(PromptButton, { disable: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified), handleMenuItemClick: () => {
                    const p = {
                        title: '词典',
                        id: 'dict',
                        getUnsplashImages: true,
                        userPrompt: '',
                    };
                    handleMenuItemClick(p);
                } }, "\u8BCD\u5178"),
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
    // console.log('lastMessage:');
    // console.log(lastMessage);
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
    const [targetLanguage, setTargetLanguage] = (0, react_1.useState)('English');
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
            // 敲击回车键
            if (props.messages.length === 0 || (contents[contents.length - 1]['status'] !== 'begin' || contents[contents.length - 1]['status'] !== 'process') && isAnswerInputed) {
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
const lang_1 = __webpack_require__(/*! ../lib/lang */ "./src/lib/lang.ts");
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
font-size: 13.2px;
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
    // const [messages, setMessages] = useState<Array<{ content: string, role: string, loading: boolean, chatId: string, prompt: string, status: string }>>([{ 'content': '', 'role': 'user', 'loading': false, 'chatId': '', 'prompt': '', 'status': '' }])
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
    // 表示 GPT 生成的文字数据正在加载中
    // const [isLoading, setIsLoading] = useState(true);
    const [isPopoverOpen, setPopoverOpen] = (0, react_1.useState)(false);
    const [customPromptFormData, setCustomPromptFormData] = (0, react_1.useState)({ 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' });
    // standby,normal,loading,success
    const [addToAnkiStatus, setAddToAnkiStatus] = (0, react_1.useState)({ 'status': 'normal', 'noteId': 0 });
    // const [isAnswerDone, setAnswerDone] = useState(false);
    const [followUpData, setFollowUpData] = (0, react_1.useState)({ keyWord: '', sentence: '' });
    const [showFollowUpDataMenu, setShowFollowUpDataMenu] = (0, react_1.useState)({ show: false, style: {} });
    const [isApiErro, setIsApiErro] = (0, react_1.useState)(false);
    // const [isAnswerInputed, setIsAnswerInputed] = useState(false);
    // 窗口拖拽逻辑
    const [dragging, setDragging] = (0, react_1.useState)(false);
    const windowElement = (0, react_1.useRef)(null);
    const messagesList = (0, react_1.useRef)(null);
    const shouldStayAtBottomRef = (0, react_1.useRef)(false);
    // const userInfoRef = useRef();
    const lastPromptRef = (0, react_1.useRef)();
    const [form] = antd_1.Form.useForm();
    // 使用长连接
    let port = webextension_polyfill_1.default.runtime.connect({
        name: 'getGPT'
    });
    const userInfo = (0, userInfo_1.useUserInfoContext)();
    let Lang = (0, locale_1.useCurrentLanguage)();
    currentLanguage = Lang['current']['name'];
    targetLanguage = Lang['target']['name'];
    // const userInfo = useUserInfoContext()
    // 控制追问菜单
    (0, react_1.useEffect)(() => {
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
        if (props.runPrompt || props.runPrompt === undefined) {
            // 获取最近一次执行的 Prompt
            webextension_polyfill_1.default.storage.local.get({ "lastExecutedPrompt": '' }).then((item) => {
                if (item.lastExecutedPrompt === '') {
                    // 执行默认 Prompt、获取 Unsplash 图片
                    const pormpt = (0, util_1.getDefaultPrompt)(props.data.keyWord);
                    executivePrompt(pormpt);
                }
                else {
                    // 执行 Prompt、获取 Unsplash 图片
                    if (item.lastExecutedPrompt.id === "Default") {
                        const pormpt = (0, util_1.getDefaultPrompt)(props.data.keyWord);
                        executivePrompt(pormpt);
                    }
                    else {
                        executivePrompt(item.lastExecutedPrompt);
                    }
                }
            });
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
        if (messages.length === 1 && messages[0]['content'][0]['status'] === 'done') {
            // console.log('Save');
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
            if (keyWord !== '' && Sentence !== '' && messages[0]['content'][0]['content'] !== '') {
                webextension_polyfill_1.default.storage.local.get({ "history": [] }).then((item) => {
                    // console.log(item.history);
                    let newHistoryList = [];
                    let bingo = false;
                    newHistoryList.push(newHistory);
                    if (Array.isArray(item.history)) {
                        // 如果记录已存在，则不重复保存
                        for (let i = 0; i < item.history.length; i++) {
                            let obj = item.history[i];
                            if (obj.keyWord === newHistory['keyWord'] && obj.sentence === newHistory['sentence'] && obj.prompt === newHistory['prompt']) {
                                bingo = true;
                                break;
                            }
                        }
                        newHistoryList = item.history;
                        newHistoryList.unshift(newHistory);
                        newHistoryList.splice(8);
                        // console.log(newHistoryList);
                    }
                    if (!bingo) {
                        webextension_polyfill_1.default.storage.local.set({
                            history: newHistoryList
                        });
                    }
                });
            }
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
            console.log('showImagesBox:');
            console.log(showImagesBox);
            // 埋点
            webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'executivePrompt' });
            // 在消息历史中插入新记录
            setMessages(prevMessages => [...prevMessages,
                {
                    'content': [{
                            'chatId': Date.now().toString(),
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
                                    'chatId': Date.now().toString(),
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
                chatId: Date.now().toString(),
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
        // // 使用长连接
        // let port = browser.runtime.connect({
        //   name: 'fromPopupCard'
        // })
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
        // 接收信息
        port.onMessage.addListener((msg) => {
            // console.log('port.onMessage.addListener');
            if (msg.type === 'sendGPTData') {
                // 请求 GPT 数据失败
                if (msg.status === 'erro') {
                    // type === 'as2' ? setopenApiAnser2(msg.content) : setopenApiAnser(msg.content)
                    // setIsLoading(false)
                    setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 });
                    let newContentList = [...messages[messages.length - 1].content];
                    if (msg.code === 'invalid_api_key') {
                        // setIsApiErro(true)
                        newContentList[newContentList.length - 1].content = msg.content + '\
            After that, you need to set the correct Open API Key in the Scouter:';
                        newContentList[newContentList.length - 1].status = 'invalid_api_key';
                    }
                    console.log(newContentList);
                    setMessages(prevMessages => {
                        const lastMessage = prevMessages[prevMessages.length - 1];
                        // const newMsgList = lastMessage
                        const updatedLastMessage = Object.assign(Object.assign({}, lastMessage), { content: newContentList, prompt: prompt[0]['content'] });
                        // const newMsgList = [...prevMessages.slice(0, prevMessages.length - 1), lastMessage]
                        return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];
                    });
                    // setAnswerDone(true)
                }
                else if (isApiErro) {
                    // setIsApiErro(false)
                }
                // 请求 GPT 数据成功且数据流开始传输
                if (msg.status === 'begin') {
                }
                // 请求 GPT 数据成功且数据流传输中
                if (msg.status === 'process' || msg.status === 'end') {
                    try {
                        // 渲染数据
                        setMessages(prevMessages => {
                            const newMessages = [...prevMessages];
                            const lastMessage = newMessages[newMessages.length - 1];
                            // 深度拷贝
                            let contentList = JSON.parse(JSON.stringify(lastMessage.content));
                            let newContent = contentList[contentList.length - 1]['content'] + msg.content;
                            newContent = (0, util_1.handleHightlight)(newContent, props.data.keyWord, ankiCards, windowElement === null || windowElement === void 0 ? void 0 : windowElement.current);
                            contentList[contentList.length - 1]['content'] = newContent;
                            contentList[contentList.length - 1]['status'] = 'process';
                            const newContentList = [...contentList];
                            const updatedLastMessage = Object.assign(Object.assign({}, lastMessage), { content: newContentList, prompt: prompt[0]['content'] });
                            return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];
                        });
                    }
                    catch (error) {
                    }
                }
                // 请求 GPT 数据成功且数据流结束传输
                if (msg.status === 'end') {
                    // 记录消息回答完毕（触发保存历史记录）
                    // setAnswerDone(true)
                    // setIsLoading(false)
                    setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 });
                    setMessages(prevMessages => {
                        const lastMessage = prevMessages[prevMessages.length - 1];
                        if (prevMessages.length === 0) {
                            return [];
                        }
                        const lastContentList = lastMessage.content;
                        const updatedLastMessage = Object.assign(Object.assign({}, lastMessage), { 
                            // loading: false,
                            content: [...lastContentList.slice(0, lastContentList.length - 1), Object.assign(Object.assign({}, lastContentList[lastContentList.length - 1]), { status: 'done' })] });
                        return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];
                    });
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
                        chatId: Date.now().toString(),
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
                        chatId: Date.now().toString(),
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
    // 添加到 Anki
    const addToAnki = (deckName, modelName, front, back) => {
        var _a, _b, _c, _d, _e;
        const keyWord = props.data.keyWord;
        const Sentence = props.data.Sentence;
        let container = '';
        let images = '';
        let unsplash_download_location;
        let stc = keyWord.length <= 20 ? Sentence : '';
        // 在语境句子中将关键字突出显示
        stc = stc.replace(new RegExp(keyWord, 'g'), '<span class="keyWord">' + keyWord + '</span>');
        let ScouterSelection = '';
        if (windowElement.current) {
            // 选中的文字
            ScouterSelection = (_b = (_a = windowElement.current) === null || _a === void 0 ? void 0 : _a.querySelector('#ScouterSelection')) === null || _b === void 0 ? void 0 : _b.getElementsByTagName('span')[0].innerHTML;
            // console.log(windowElement.current);
            container = windowElement.current.innerHTML;
            container = windowElement.current.getElementsByClassName('messages')[0].innerHTML;
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
                    (_c = div.parentNode) === null || _c === void 0 ? void 0 : _c.replaceChild(newImg, div);
                }
            }
            else {
                // 没有图片
                const imgs = doc.getElementsByClassName('images')[0];
                if (imgs) {
                    (_d = imgs.parentNode) === null || _d === void 0 ? void 0 : _d.removeChild(imgs);
                }
            }
            // 删除预加载的图片
            elementsToRemove.forEach(el => { var _a; return (_a = el.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(el); });
            // 删除图片来源信息
            imageSource.forEach(el => { var _a; return (_a = el.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(el); });
            container = doc.body.innerHTML;
            // 处理样式，避免 Anki 内显示异常
            container = container.replace(/style=/g, '');
            if (windowElement.current.getElementsByClassName('imageBox')[0] !== undefined) {
                images = windowElement.current.getElementsByClassName('imageBox')[0].innerHTML;
                // 获取 unsplashApi 的 download_location
                unsplash_download_location = (_e = windowElement.current.getElementsByClassName('images')[0].getElementsByTagName('img')[0].parentElement) === null || _e === void 0 ? void 0 : _e.getAttribute('data-downloadlocation');
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
            filename = keyWord.length >= 10 ? keyWord.substring(0, 10) : keyWord;
            audio = [{
                    "url": audioUrl + keyWord,
                    "filename": "Scouter_" + filename + ".mp3",
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
        // 数据埋点
        // amplitude.track('addToAnki');
        webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'addToAnki' });
    };
    // 点击保存到 Anki
    const handleSaveToAnkiBtnClick = () => {
        var _a, _b, _c;
        // 根据是否为完形填空申请不同的卡片模板
        const container = (_a = windowElement.current) === null || _a === void 0 ? void 0 : _a.getElementsByClassName('messages')[0].innerHTML;
        const selectionText = (_c = (_b = windowElement.current) === null || _b === void 0 ? void 0 : _b.querySelector('#ScouterSelection')) === null || _c === void 0 ? void 0 : _c.getElementsByTagName('span')[0].innerHTML;
        let isAnkiSpace = false;
        if (container || selectionText) {
            if (container.indexOf('class="ankiSpace"') >= 0 || container.indexOf('{{c') >= 0 || selectionText.indexOf('class="ankiSpace') >= 0) {
                isAnkiSpace = true;
            }
        }
        setAddToAnkiStatus({ 'status': 'loading', 'noteId': 0 });
        function setAnkiInfo(models) {
            let defaultDeckName = '', modelName = '', field1 = '', field2 = '';
            models.forEach((model) => {
                if (model.isAnkiSpace === isAnkiSpace) {
                    defaultDeckName = model.defaultDeckName;
                    modelName = model.modelName;
                    field1 = model.field1;
                    field2 = model.field2;
                }
            });
            return {
                'defaultDeckName': defaultDeckName,
                'modelName': modelName,
                'field1': field1,
                'field2': field2
            };
        }
        if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.anki) {
            const ankiInfo = setAnkiInfo(userInfo === null || userInfo === void 0 ? void 0 : userInfo.anki);
            // 添加到 Anki 中
            addToAnki(ankiInfo.defaultDeckName, ankiInfo.modelName, ankiInfo.field1, ankiInfo.field2);
        }
        else {
            // 获取 Anki 牌组信息
            webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'setModel', 'messages': {}, }).then((result) => {
                if (result.result === 'success') {
                    const ankiInfo = setAnkiInfo(result.data);
                    // 添加到 Anki 中
                    addToAnki(ankiInfo.defaultDeckName, ankiInfo.modelName, ankiInfo.field1, ankiInfo.field2);
                }
                else {
                    // 反馈错误信息
                    alert(result.error.error);
                    setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 });
                }
            });
        }
    };
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
                react_1.default.createElement(Nav_1.Nav, { handleSaveToAnkiBtnClick: handleSaveToAnkiBtnClick, addToAnkiStatus: addToAnkiStatus, onMouseDown: handleMouseDown, handleMenuItemClick: executivePrompt, openCustomPromptForm: openCustomPromptForm, isOpenMenu: isOpenMenu, prompts: prompts, lastExecutedPrompt: lastExecutedPrompt, keyWord: props.data.keyWord }),
                react_1.default.createElement("div", { className: 'container flex-grow flex flex-col overflow-auto', style: {
                        marginTop: '48px'
                    } },
                    react_1.default.createElement("div", { className: 'flex-grow', ref: messagesList, style: {} },
                        react_1.default.createElement(Selection_1.Selection, { text: props.data.keyWord }),
                        react_1.default.createElement(Message_1.MessagesList, { messages: messages }),
                        react_1.default.createElement(RegenerateButton_1.RegenerateButton, { messages: messages, handleRegenerateButtonClick: handleRegenerateButtonClick }),
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

  margin-left: 10px;
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
  background-color: #CCCCCC;
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
exports.getDefaultPrompt = exports.handleHightlight = exports.getAnkiCards = exports.handlePromptVariables = exports.getUnsplashImages = exports.windowInitialization = exports.getClipboard = void 0;
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
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
        // console.log(props.selection.getRangeAt(0));
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
    // 处理 Anki 单词高亮
    const cards = ankiCards;
    if (windowElement && cards) {
        // 遍历每一个卡片
        cards.forEach((card) => {
            // setTimeout(() => {
            // console.log(card);
            const keys = Object.keys(card.fields);
            let firstKey = keys[0];
            // 找到卡片正面
            for (let i = 0; i < keys.length; i++) {
                if (card.fields[keys[i]].order === 0) {
                    firstKey = keys[i];
                    break;
                }
            }
            const cardFrontValue = card.fields[firstKey].value;
            if (cardFrontValue !== keyWord) {
                newStr = newStr.replace(new RegExp(cardFrontValue, 'gi'), `<mark>${cardFrontValue}</mark>`);
            }
            // }, 10);
            // // 创建一个用于包裹'o'的<span>元素
            // var spanElement = document.createElement('span');
            // spanElement.setAttribute('data-cardID', card.id);
            // spanElement.className = 'hello';
            // spanElement.style.color = 'red';
            // spanElement.style.cursor = 'pointer';
            // spanElement.textContent = cardFrontValue;
            // // newStr = newStr.replace(/o/gi, spanElement.outerHTML);
            // newStr = newStr.replace(new RegExp(cardFrontValue, 'gi'), spanElement.outerHTML);
        });
        // 对上述元素添加点击事件
        // let hightlightDom = windowElement.getElementsByClassName('hello')
        // for (let i = 0; i < hightlightDom.length; i++) {
        //     hightlightDom[i].removeEventListener('click', handleHightlightClick)
        //     hightlightDom[i].addEventListener('click', handleHightlightClick)
        // }
    }
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
const getDefaultPrompt = (keyWord) => {
    let getUnsplashImages = true;
    let userPrompt = `

        Please help me learn as a foreign language teacher. Sentences in examples should not be the same as the given sentence.

        Example：
        """
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
        
        """ 
        
        Word:{selection}, sentence: {sentence},You must reply in the specified language

        Please start teaching:

        `;
    // 关键字长度较长时，按照句子进行处理
    if (keyWord.length > 20) {
        getUnsplashImages = false;
        userPrompt = `
      
                  As a language teacher, I will provide an explanation of the grammar knowledge in the given sentence:
      
                  Example:
                  """
      
                  ## Translation
                  <Translate to {nativeLanguage}>
                  
                  ## Grammar
                  <- Point: Explain in {nativeLanguage}>
      
                  ## Examples of related grammar
                  -  <{targetLanguage} example sentence> - <Translation in {nativeLanguage}>
                  -  <{targetLanguage} example sentence> - <Translation in {nativeLanguage}>
      
                  """
                  
                  Sentence: {selection}`;
    }
    const defaultPrompt = {
        'title': 'Default', 'getUnsplashImages': getUnsplashImages, 'userPrompt': userPrompt,
        'id': 'Default'
    };
    return defaultPrompt;
};
exports.getDefaultPrompt = getDefaultPrompt;


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
const icon128_png_1 = __importDefault(__webpack_require__(/*! ../assets/icon128.png */ "./src/assets/icon128.png"));
const styled_components_2 = __importStar(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
const isFirefox = typeof InstallTrigger !== 'undefined';
// 记录当前窗口是否 Pin 住
let isPin = false;
// 设置当前窗口是否允许关闭
let donotClosePopupCard = false;
// 初始化主容器，主容器用来挂在全局样式，包括第三方组件的样式
let MyBox = document.getElementById('__jiang-scouter');
// console.log(MyBox);
// container 承载 UI 组件
let container = document.createElement('div');
container.className = 'container';
// 使用 shadow 来隔离样式
let shadowRoot = undefined;
if (MyBox === null || MyBox === undefined) {
    // 如果不存在容器
    // 创建主容器
    MyBox = document.createElement('div');
    MyBox.id = '__jiang-scouter';
    document.getElementsByTagName('html')[0].appendChild(MyBox);
    MyBox.style.display = 'none'; //默认隐藏
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
let USER_INFO = { userId: 'unknow', verified: false };
let ANKI_INFO;
const thisGetUserInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    // 获取用户信息
    USER_INFO = yield (0, util_1.getUserInfo)();
    // 获取 Anki 牌组信息
    webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'setModel', 'messages': {}, }).then((result) => {
        ANKI_INFO = result.data;
        // 更新 Anki style
        try {
            for (let i = 0; i < ANKI_INFO.length; i++) {
                const p = {
                    "model": {
                        "name": ANKI_INFO[i]['modelName'],
                        "css": util_2.cardStyle
                    }
                };
                // 获取 Anki 牌组信息
                webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'ankiAction', 'messages': { 'anki_action_type': 'updateModelStyling', 'anki_arguments': p }, }).then((result) => {
                    // console.log(result);
                });
            }
        }
        catch (error) {
        }
    });
});
thisGetUserInfo();
let port = webextension_polyfill_1.default.runtime.connect({
    name: 'fromContentScript'
});
// 接收 background 消息（目前是通过浏览器的右键菜单触发）
webextension_polyfill_1.default.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    var _a;
    // console.log('content script onMessage:');
    // console.log(msg);
    if (msg.type === 'open-scouter') {
        // 处理窗口
        if (MyBox !== null && MyBox !== undefined) {
            // 如果已存在容器
            if (((_a = MyBox.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.container')) === null) {
                // 如果不存在 PopupCard
                container = document.createElement('div');
                container.className = 'container';
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
            MyBox.style.display = 'block';
            // 移除旧内容，避免 2 次渲染混杂在一起
            // container.parentNode?.removeChild(container);
        }
        else {
            // console.log('不存在 Box 容器');
            container = document.createElement('div');
            container.className = 'container';
            shadowRoot === null || shadowRoot === void 0 ? void 0 : shadowRoot.appendChild(container);
        }
        // const selection = window.getSelection();
        const selection = getSelection();
        // 显示窗口
        if (selection && selection.keyWord !== '') {
            showPopupCard({ 'keyWord': selection === null || selection === void 0 ? void 0 : selection.keyWord, 'Sentence': selection.sentence }, window.getSelection(), container, shadowRoot, isPin, msg.runPrompt);
        }
        document.addEventListener('selectionchange', handleSelectionchange);
        document.addEventListener('mouseup', handleMouseup);
        // 监听页面点击事件
        document.onmousedown = function (event) {
            var _a;
            if (MyBox !== undefined && MyBox !== null && !isPin && !donotClosePopupCard) {
                // 如果点击的不是插件窗口及其子元素，则关闭窗口
                if (MyBox !== event.target && !MyBox.contains(event.target)) {
                    // 隐藏窗口
                    (_a = container.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(container);
                    document.removeEventListener('selectionchange', handleSelectionchange);
                    document.removeEventListener('mouseup', handleMouseup);
                    port.postMessage({ 'type': 'StopTheConversation', 'messages': '' });
                }
            }
        };
        container.onmousedown = (event) => {
            var _a;
            // 隐藏 setAnkiSpaceButton
            const contextBox = container.getElementsByClassName('contextBox2')[0];
            if (contextBox) {
                // 点击的不是 setAnkiSpaceButton 时才隐藏
                if (contextBox !== event.target && !contextBox.contains(event.target)) {
                    (_a = contextBox.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(contextBox);
                }
            }
        };
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
let isTextSelected = false;
const handleSelectionchange = () => {
    // let selection = window.getSelection();
    // if (selection) {
    //   console.log('selection.toString():');
    //   console.log(selection.toString());
    //   isTextSelected = selection.toString().length > 0;
    // }
};
const handleMouseup = (event) => {
    // console.log('handleMouseup');
    // console.log(isTextSelected);
    // console.log(donotClosePopupCard);
    var _a;
    // 获取用户在宿主网页上选中的内容
    const selection = getSelection();
    if (selection) {
        isTextSelected = selection.selection.toString().length > 0;
    }
    if (isTextSelected && !donotClosePopupCard) {
        // console.log('isTextSelected && !donotClosePopupCard');
        if (MyBox !== event.target && !(MyBox === null || MyBox === void 0 ? void 0 : MyBox.contains(event.target))) {
            // 在 PopupCard 范围外触发
            isTextSelected = false;
            // 停止旧的对话
            port.postMessage({ 'type': 'StopTheConversation', 'messages': '' });
            // 显示窗口
            if (selection && (selection === null || selection === void 0 ? void 0 : selection.keyWord.length) > 0 && ((_a = selection.selection.anchorNode) === null || _a === void 0 ? void 0 : _a.nodeName) === '#text') {
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
            const sentence = '';
            const PopupCardContainer = container.getElementsByClassName('container')[0];
            const messagesBox = container.getElementsByClassName('messages')[0];
            // console.log(selectedText);
            // console.log(messagesBox?.contains(selectedText.baseNode.parentNode as Node));
            let isInMessages = false;
            if (selectedText.baseNode) {
                if (messagesBox === selectedText.baseNode.parentNode || (messagesBox === null || messagesBox === void 0 ? void 0 : messagesBox.contains(selectedText.baseNode.parentNode))) {
                    //在 messages 容器内操作，则显示操作按钮
                    isInMessages = true;
                }
            }
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
};
const getSelection = (isInShadow) => {
    var _a, _b, _c, _d, _e, _f;
    let selection = window.getSelection();
    if (isInShadow) {
        selection = shadowRoot.getSelection();
    }
    if (selection !== null) {
        // 当前选中的文字
        let keyWord = selection.toString().trim();
        // 选中文字所在的段落
        let sentence = (_b = (_a = selection.anchorNode) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : '';
        if (sentence === undefined) {
            sentence = '';
        }
        else {
            sentence = sentence.length <= keyWord.length ? (_f = (_e = (_d = (_c = selection.anchorNode) === null || _c === void 0 ? void 0 : _c.parentNode) === null || _d === void 0 ? void 0 : _d.parentNode) === null || _e === void 0 ? void 0 : _e.innerText) !== null && _f !== void 0 ? _f : '' : sentence;
        }
        return { 'selection': selection, 'keyWord': keyWord, 'sentence': sentence };
    }
    else {
        return null;
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
        console.log(shadowRoot.querySelectorAll('.container'));
        const contextBox = ContextBox.current;
        const popupCard = container.querySelector('#LearningEnglish2023');
        const PopupCardContainer = container.getElementsByClassName('container')[0];
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
        const PopupCardContainer = container.getElementsByClassName('container')[0];
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
            console.log(error);
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
            react_1.default.createElement(antd_1.Tooltip, { placement: "bottom", title: 'Generate Images with AI', arrow: false },
                react_1.default.createElement(StyledButton, { style: { marginRight: '10px' }, onClick: () => handleSetAnkiSpaceButtonClick(event, false) }, "[...]")),
            react_1.default.createElement(StyledButton, { onClick: () => handleSetAnkiSpaceButtonClick(event, true) }, "[...]+")),
        react_1.default.createElement("div", null,
            react_1.default.createElement(StyledButton, { "$disable": (userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified) ? false : true, title: '\u26A1Pro', style: {
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
                react_1.default.createElement(icons_1.CustomerServiceOutlined, null))),
        react_1.default.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            } },
            react_1.default.createElement(IconButton, { title: '\u26A1Pro', className: 'lookUpButton', style: {
                    backgroundImage: `url(${icon128_png_1.default})`,
                }, onClick: handleFollowUpMenuClick })))));
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUI7QUFDdkI7O0FBRUE7QUFDQSx1QkFBdUI7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUIsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsZUFBZTtBQUNmO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVB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QTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQTs7Ozs7V0NWQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztXQ2hEQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvQ29tcG9uZW50cy9DdXN0b21Qcm9tcHRGb3JtLnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Db21wb25lbnRzL0Ryb3Bkb3duTWVudUl0ZW0udHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbXBvbmVudHMvSW1hZ2VzLnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Db21wb25lbnRzL05hdi50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvUG9wdXBDYXJkL01lc3NhZ2UudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC9Qcm9tcHRMaXN0LnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvUmVnZW5lcmF0ZUJ1dHRvbi50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvUG9wdXBDYXJkL1NlbGVjdGlvbi50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvUG9wdXBDYXJkL1VzZXJNZXNzYWdlSW5wdXQudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC9pbmRleC50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvUG9wdXBDYXJkL3N0eWxlLnRzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC91dGlsLnRzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2NvbnRlbnRTY3JpcHQvaW5kZXgudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2xpYi9sb2NhbGUudHMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvbGliL3VzZXJJbmZvLnRzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2Fzc2V0cy9pY29uMTI4LnBuZyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9hc3NldHMvc2V0dGluZ0d1aWRlLnBuZyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jcmVhdGUgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXJtb255IG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DdXN0b21Qcm9tcHRGb3JtID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmZ1bmN0aW9uIEN1c3RvbVByb21wdEZvcm0ocHJvcHMpIHtcbiAgICBjb25zdCBbZm9ybV0gPSBhbnRkXzEuRm9ybS51c2VGb3JtKCk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIC8vIOabtOaWsCBpbnB1dCDmlofmnKzmoYbnmoTpu5jorqTlgLxcbiAgICAgICAgZm9ybS5zZXRGaWVsZHNWYWx1ZSh7XG4gICAgICAgICAgICB0aXRsZTogcHJvcHMuZGF0YS50aXRsZSxcbiAgICAgICAgICAgIGdldFVuc3BsYXNoSW1hZ2VzOiBwcm9wcy5kYXRhLmdldFVuc3BsYXNoSW1hZ2VzLFxuICAgICAgICAgICAgdXNlclByb21wdDogcHJvcHMuZGF0YS51c2VyUHJvbXB0XG4gICAgICAgIH0pO1xuICAgIH0sIFtwcm9wcy5kYXRhXSk7XG4gICAgLy8g5L+d5a2YIFByb21wdFxuICAgIGNvbnN0IHNhdmVQcm9tcHQgPSAodmFsdWVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOWFs+mXreihqOWNlVxuICAgICAgICBwcm9wcy5vcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogZmFsc2UsIGRhdGE6IHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9IH0pO1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpO1xuICAgICAgICAvLyDojrflj5blt7Lkv53lrZjnmoQgUHJvbXB0IExpc3RcbiAgICAgICAgY29uc3QgcHJvbXB0TGlzdCA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7IFwicHJvbXB0TGlzdFwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5wcm9tcHRMaXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IG5ld1Byb21wdHMgPSBwcm9tcHRMaXN0O1xuICAgICAgICAvLyDlpoLmnpwgcHJvcHMg5Lit5YyF5ZCrIElE77yM5YiZ6K+05piO5b2T5YmN5piv5Zyo57yW6L6RIFByb21wdCDogIzkuI3mmK/mlrDlop4gUHJvbXB0XG4gICAgICAgIGlmIChwcm9wcy5kYXRhLmlkICE9PSAnJykge1xuICAgICAgICAgICAgLy8g5ZyoIFByb21wdCDorrDlvZXkuK3mib7liLDov5nmnaEgUHJvbXB0XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1Byb21wdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3UHJvbXB0c1tpXVsnaWQnXSA9PT0gcHJvcHMuZGF0YS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyDkv67mlLlcbiAgICAgICAgICAgICAgICAgICAgbmV3UHJvbXB0c1tpXVsndGl0bGUnXSA9IHZhbHVlc1sndGl0bGUnXTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UHJvbXB0c1tpXVsnZ2V0VW5zcGxhc2hJbWFnZXMnXSA9IHZhbHVlc1snZ2V0VW5zcGxhc2hJbWFnZXMnXTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UHJvbXB0c1tpXVsndXNlclByb21wdCddID0gdmFsdWVzWyd1c2VyUHJvbXB0J107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5ld1Byb21wdHMgPSBbT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB2YWx1ZXMpLCB7ICdpZCc6IHRpbWVzdGFtcCB9KSwgLi4ucHJvbXB0TGlzdF07XG4gICAgICAgIH1cbiAgICAgICAgLy8g5bCGIFByb21wdCDkv53lrZjkuIvmnaVcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuc2V0KHtcbiAgICAgICAgICAgIHByb21wdExpc3Q6IG5ld1Byb21wdHMubGVuZ3RoID4gNiA/IG5ld1Byb21wdHMuc3BsaWNlKDAsIDYpIDogbmV3UHJvbXB0cyxcbiAgICAgICAgfSkudGhlbihpdGVtID0+IHtcbiAgICAgICAgICAgIC8vIOWwhiBQcm9tcHQg5Lyg5Zue57uZ54i257uE5Lu277yM5Lul6K6pIFByb21wdCDliJfooaggVUkg6YeN5paw5riy5p+TXG4gICAgICAgICAgICBwcm9wcy5oYW5kbGVQcm9tcHRFZGl0ZWQocHJvcHMuZGF0YS5pZCA9PT0gJycpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGFsZXJ0KCfwn6WyU2F2ZSBmYWlsZWQsIHBvc3NpYmx5IGR1ZSB0byBhIHRvbyBsb25nIFByb21wdC4gWW91IGNhbiBkZWxldGUgb3RoZXIgUHJvbXB0cyBvciBzaG9ydGVuIHRoZSBQcm9tcHQgY2hhcmFjdGVycyBhbmQgdHJ5IGFnYWluLiBcXG4nICsgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyDliKDpmaQgUHJvbXB0XG4gICAgY29uc3QgaGFuZGxlRGVsZXRlQnV0dG9uQ2xpY2sgPSAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOWFs+mXreihqOWNlVxuICAgICAgICBwcm9wcy5vcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogZmFsc2UsIGRhdGE6IHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9IH0pO1xuICAgICAgICAvLyDojrflj5blt7Lkv53lrZjnmoQgUHJvbXB0IExpc3RcbiAgICAgICAgY29uc3QgcHJvbXB0TGlzdCA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7IFwicHJvbXB0TGlzdFwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5wcm9tcHRMaXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IG5ld1Byb21wdHMgPSBwcm9tcHRMaXN0O1xuICAgICAgICAvLyDlnKggUHJvbXB0IOiusOW9leS4reaJvuWIsOi/meadoSBQcm9tcHRcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdQcm9tcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobmV3UHJvbXB0c1tpXVsnaWQnXSA9PT0gcHJvcHMuZGF0YS5pZCkge1xuICAgICAgICAgICAgICAgIC8vIOWIoOmZpFxuICAgICAgICAgICAgICAgIG5ld1Byb21wdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIC8vIOWwhiBQcm9tcHQg5L+d5a2Y5LiL5p2lXG4gICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbXB0TGlzdDogbmV3UHJvbXB0cy5sZW5ndGggPiA2ID8gbmV3UHJvbXB0cy5zcGxpY2UoMCwgNikgOiBuZXdQcm9tcHRzLFxuICAgICAgICAgICAgICAgIH0pLnRoZW4oaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWwhiBQcm9tcHQg5Lyg5Zue57uZ54i257uE5Lu277yM5Lul6K6pIFByb21wdCDliJfooaggVUkg6YeN5paw5riy5p+TXG4gICAgICAgICAgICAgICAgICAgIHByb3BzLmhhbmRsZVByb21wdEVkaXRlZChwcm9wcy5kYXRhLmlkID09PSAnJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH07XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybSwgeyBvbkZpbmlzaDogc2F2ZVByb21wdCwgXG4gICAgICAgICAgICAvLyBsYXlvdXQ9J2hvcml6b250YWwnXG4gICAgICAgICAgICBsYWJlbENvbDoge1xuICAgICAgICAgICAgICAgIHhzOiB7IHNwYW46IDYgfSxcbiAgICAgICAgICAgICAgICBzbTogeyBzcGFuOiA1IH0sXG4gICAgICAgICAgICB9LCBmb3JtOiBmb3JtIH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwidGl0bGVcIiwgbGFiZWw6IFwiVGl0bGVcIiwgcnVsZXM6IFt7IHJlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAnUGxlYXNlIGlucHV0IHlvdXIgdGl0bGUnIH1dIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLklucHV0LCB7IG1heExlbmd0aDogNDAsIG9uS2V5RG93bjogaGFuZGxlS2V5RG93biwgcGxhY2Vob2xkZXI6IFwiSG93IHRvIG5hbWUgdGhlIFByb21wdFwiLCB0eXBlOiBcInRleHRcIiB9KSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IGV4dHJhOiBcIkRpc3BsYXkgSW1hZ2VzIFJlbGF0ZWQgdG8gdGhlIFNlbGVjdGVkIFRleHRcIiwgbmFtZTogXCJnZXRVbnNwbGFzaEltYWdlc1wiLCBsYWJlbDogXCJJbWFnZXNcIiwgdmFsdWVQcm9wTmFtZTogXCJjaGVja2VkXCIgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuU3dpdGNoLCBudWxsKSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwidXNlclByb21wdFwiLCBsYWJlbDogXCJQcm9tcHRcIiwgZXh0cmE6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYCR7J3tzZWxlY3Rpb259J306IFNlbGVjdGVkIHRleHRgLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJyXCIsIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICBgJHsne3NlbnRlbmNlfSd9OiBTZW50ZW5jZSBjb250YWluaW5nIHRoZSBzZWxlY3RlZCB0ZXh0YCxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJiclwiLCBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI0YwOEEyNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiAoKSA9PiB3aW5kb3cub3BlbignaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9EeW5hbWljLVBsYWNlaG9sZGVycy01ZjA3MDUxNjNmZjY0MGFmYmRkNTc3MTE1ZGM5NTc3OT9wdnM9NCcpIH0sIFwiTGVhcm4gTW9yZVwiKSksIHJ1bGVzOiBbeyByZXF1aXJlZDogdHJ1ZSwgbWVzc2FnZTogJ1BsZWFzZSBpbnB1dCB5b3VyIHByb21wdCcgfV0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuSW5wdXQuVGV4dEFyZWEsIHsgcGxhY2Vob2xkZXI6IFwiVHJhbnNsYXRlIHtzZWxlY3Rpb259IHRvIENoaW5lc2VcIiwgb25LZXlEb3duOiBoYW5kbGVLZXlEb3duLCByb3dzOiA0LCBtYXhMZW5ndGg6IDMwMDAgfSkpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBzdHlsZTogeyBtYXJnaW46ICcwJyB9IH0sXG4gICAgICAgICAgICAgICAgcHJvcHMuZGF0YS5pZCAhPT0gJycgJiYgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICcxMnB4J1xuICAgICAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiBoYW5kbGVEZWxldGVCdXR0b25DbGljaywgZGFuZ2VyOiB0cnVlIH0sIFwiRGVsZXRlXCIpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHsgbWluV2lkdGg6ICcxMjBweCcgfSwgdHlwZTogXCJwcmltYXJ5XCIsIGh0bWxUeXBlOiBcInN1Ym1pdFwiIH0sIFwiU2F2ZVwiKSkpKSk7XG59XG5leHBvcnRzLkN1c3RvbVByb21wdEZvcm0gPSBDdXN0b21Qcm9tcHRGb3JtO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRHJvcGRvd25NZW51SXRlbSA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IERyb3Bkb3duTWVudSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQHJhZGl4LXVpL3JlYWN0LWRyb3Bkb3duLW1lbnVcIikpO1xuY29uc3QgcmVhY3RfaWNvbnNfMSA9IHJlcXVpcmUoXCJAcmFkaXgtdWkvcmVhY3QtaWNvbnNcIik7XG5mdW5jdGlvbiBEcm9wZG93bk1lbnVJdGVtKHByb3BzKSB7XG4gICAgY29uc3QgW2lzSG92ZXJlZCwgc2V0SXNIb3ZlcmVkXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgfSk7XG4gICAgY29uc3Qgb25TZWxlY3QgPSAoKSA9PiB7XG4gICAgICAgIHByb3BzLm9uU2VsZWN0KCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVFZGl0UHJvbXB0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBwcm9wcy5oYW5kbGVFZGl0UHJvbXB0KCk7XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5JdGVtLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnNnB4JyxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzRweCcsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcycHgnXG4gICAgICAgIH0sIGNsYXNzTmFtZTogXCJEcm9wZG93bk1lbnVJdGVtXCIsIG9uTW91c2VFbnRlcjogKCkgPT4gc2V0SXNIb3ZlcmVkKHRydWUpLCBvbk1vdXNlTGVhdmU6ICgpID0+IHNldElzSG92ZXJlZChmYWxzZSksIG9uU2VsZWN0OiBvblNlbGVjdCB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgIGZsZXg6ICcxJyxcbiAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnXG4gICAgICAgICAgICB9IH0sIHByb3BzLmNoaWxkcmVuKSxcbiAgICAgICAgaXNIb3ZlcmVkICYmIChwcm9wcy5kYXRhLmlkID09PSAnRGVmYXVsdCcgfHwgcHJvcHMuZGF0YS5pZCA9PT0gJ2RpY3QnID8gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiB7IHdpbmRvdy5vcGVuKCdodHRwczovL2ppYW5nemlsb25nLm5vdGlvbi5zaXRlL1doYXQtaXMtdGhlLWRlZmF1bHQtUHJvbXB0LVByb21wdC01YjU1ZTNmYzMwM2Q0MjVmOGNjYTE2ZDViZWUxOWU3YycpOyB9IH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF9pY29uc18xLlF1ZXN0aW9uTWFya0NpcmNsZWRJY29uLCBudWxsKSkgOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IG9uQ2xpY2s6IGhhbmRsZUVkaXRQcm9tcHQgfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ljb25zXzEuUGVuY2lsMkljb24sIG51bGwpKSkpKTtcbn1cbmV4cG9ydHMuRHJvcGRvd25NZW51SXRlbSA9IERyb3Bkb3duTWVudUl0ZW07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5JbWFnZXMgPSB2b2lkIDA7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgaWNvbnNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9pY29uc1wiKTtcbmNvbnN0IFByb1RhZ18xID0gcmVxdWlyZShcIi4vUHJvVGFnXCIpO1xuY29uc3QgdXNlckluZm9fMSA9IHJlcXVpcmUoXCIuLi9saWIvdXNlckluZm9cIik7XG5jb25zdCByZWFjdF9zcHJpbmdfMSA9IHJlcXVpcmUoXCJyZWFjdC1zcHJpbmdcIik7XG5mdW5jdGlvbiBJbWFnZXMocHJvcHMpIHtcbiAgICAvLyBjb25zdCBbaW1hZ2VzLCBzZXRJbWFnZXNdID0gdXNlU3RhdGU8QXJyYXk8SW1hZ2VUeXBlPj4oW10pO1xuICAgIGNvbnN0IFtpbWFnZUluZGV4LCBzZXRJbWFnZUluZGV4XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgwKTtcbiAgICBjb25zdCBbc2hvd0NvbnRyb2wsIHNldFNob3dDb250cm9sXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3QgW2NoYW5nZUltYWdlLCBzZXRDaGFuZ2VJbWFnZVN0YXR1c10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtpbWFnZXNMb2FkaW5nLCBzZXRJbWFnZXNMb2FkaW5nXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh0cnVlKTtcbiAgICAvLyBjb25zdCBbc2VhcmNoSW1hZ2VJc0xvYWRpbmcsIHNldFNlYXJjaEltYWdlSXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICAgIGNvbnN0IHVzZXJJbmZvID0gKDAsIHVzZXJJbmZvXzEudXNlVXNlckluZm9Db250ZXh0KSgpO1xuICAgIC8vIGNvbnN0IFtjdXJyZW50VVJMLCBzZXRDdXJyZW50VVJMXSA9IHVzZVN0YXRlPHN0cmluZz4oKTtcbiAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSAoMCwgcmVhY3RfMS51c2VSZWYpKG51bGwpO1xuICAgIGNvbnN0IGltYWdlQm94RWxlbWVudCA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3QgY29tcG9zaW5nID0gKDAsIHJlYWN0XzEudXNlUmVmKShmYWxzZSk7XG4gICAgY29uc3QgaGFuZGxlQ29tcG9zaXRpb25TdGFydCA9ICgpID0+IHtcbiAgICAgICAgY29tcG9zaW5nLmN1cnJlbnQgPSB0cnVlO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlQ29tcG9zaXRpb25FbmQgPSAoKSA9PiB7XG4gICAgICAgIGNvbXBvc2luZy5jdXJyZW50ID0gZmFsc2U7XG4gICAgfTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgLy8gc2V0SW1hZ2VzKHByb3BzLmltYWdlcylcbiAgICAgICAgc2V0SW1hZ2VzTG9hZGluZyhmYWxzZSk7XG4gICAgfSwgW3Byb3BzLmltYWdlc10pO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGlucHV0RWxlbWVudCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGlucHV0RWxlbWVudC5jdXJyZW50KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coaW5wdXRFbGVtZW50LmN1cnJlbnQ/LmlucHV0KTtcbiAgICAgICAgaWYgKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSB7XG4gICAgICAgICAgICAoX2EgPSBpbnB1dEVsZW1lbnQuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9LCBbY2hhbmdlSW1hZ2VdKTtcbiAgICBjb25zdCBoYW5kbGVFZGl0SW1hZ2VzQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHNldENoYW5nZUltYWdlU3RhdHVzKHRydWUpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlU2VhcmNoSW5wdXQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVTZWFyY2hCdG5DbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBzZXRJbWFnZUluZGV4KDApO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSB7XG4gICAgICAgICAgICBsZXQgaW5wdXRWYWx1ZSA9IChfYiA9IChfYSA9IGlucHV0RWxlbWVudC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5wdXQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi52YWx1ZTtcbiAgICAgICAgICAgIGlmIChpbnB1dFZhbHVlICYmIGlucHV0VmFsdWUgIT09ICcnICYmICFjb21wb3NpbmcuY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHNldEltYWdlc0xvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgICAgICAgLy8g5pCc57Si5Zu+54mHXG4gICAgICAgICAgICAgICAgcHJvcHMuZ2V0VW5zcGxhc2hJbWFnZXMoaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgc2V0Q2hhbmdlSW1hZ2VTdGF0dXMoZmFsc2UpO1xuICAgICAgICAgICAgICAgIC8vIGFtcGxpdHVkZS50cmFjaygnaGFuZGxlU2VhcmNoSW1hZ2UnKTtcbiAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ2hhbmRsZVNlYXJjaEltYWdlJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KCdQbGVhc2UgYWN0aXZhdGUgUHJvJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUdlbmVyYXRpb25zSW1hZ2VzID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHNldEltYWdlSW5kZXgoMCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpIHtcbiAgICAgICAgICAgIGxldCBpbnB1dFZhbHVlID0gKF9iID0gKF9hID0gaW5wdXRFbGVtZW50LmN1cnJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pbnB1dCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnZhbHVlO1xuICAgICAgICAgICAgaWYgKGlucHV0VmFsdWUgJiYgaW5wdXRWYWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBzZXRJbWFnZXNMb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgICAgIC8vIOeUn+aIkOWbvueJh1xuICAgICAgICAgICAgICAgIHByb3BzLmdlbmVyYXRpb25zSW1hZ2VzKGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgICAgIHNldENoYW5nZUltYWdlU3RhdHVzKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ2hhbmRsZUdlbmVyYXRpb25zSW1hZ2VzJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KCdQbGVhc2UgYWN0aXZhdGUgUHJvJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUNoYW5nZUltYWdlc0NsaWNrID0gKG9mZnNldCkgPT4ge1xuICAgICAgICBzZXRJbWFnZUluZGV4KGluZGV4ID0+IHtcbiAgICAgICAgICAgIGluZGV4ID0gaW5kZXggKyBvZmZzZXQ7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gcHJvcHMuaW1hZ2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IHByb3BzLmltYWdlcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gYW1wbGl0dWRlLnRyYWNrKCdoYW5kbGVDaGFuZ2VJbWFnZScpO1xuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ2hhbmRsZUNoYW5nZUltYWdlJyB9KTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUltYWdlc0JveEhvdmVyID0gKGUpID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgaWYgKGUudHlwZSA9PT0gJ21vdXNlZW50ZXInKSB7XG4gICAgICAgICAgICBzZXRTaG93Q29udHJvbCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS50eXBlID09PSAnbW91c2VsZWF2ZScpIHtcbiAgICAgICAgICAgIC8vIOaYvuekuuWbvueJh+aQnOe0ouahhuaXtuS4jeiHquWKqOmakOiXj+aOp+S7tlxuICAgICAgICAgICAgaWYgKCFjaGFuZ2VJbWFnZSB8fCAoKF9iID0gKF9hID0gaW5wdXRFbGVtZW50LmN1cnJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pbnB1dCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnZhbHVlKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBzZXRTaG93Q29udHJvbChmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2V0Q2hhbmdlSW1hZ2VTdGF0dXMoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc2V0U2hvd0NvbnRyb2wodHJ1ZSlcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgYW5pbWF0aW9uU3R5bGUgPSAoMCwgcmVhY3Rfc3ByaW5nXzEudXNlU3ByaW5nKSh7XG4gICAgICAgIGZyb206IHsgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJyB9LFxuICAgICAgICB0bzogeyB0cmFuc2Zvcm06ICdyb3RhdGUoMzYwZGVnKScgfSxcbiAgICAgICAgY29uZmlnOiB7IGR1cmF0aW9uOiAxMDAwIH0sXG4gICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgIHdpZHRoOiAnMzJweCcsXG4gICAgICAgIGhlaWdodDogJzMycHgnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgcmVkJ1xuICAgIH0pO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiaW1hZ2VzXCIsIHJlZjogaW1hZ2VCb3hFbGVtZW50LCBzdHlsZToge1xuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMCcsXG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICcxOHB4J1xuICAgICAgICB9IH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IG9uTW91c2VFbnRlcjogaGFuZGxlSW1hZ2VzQm94SG92ZXIsIG9uTW91c2VMZWF2ZTogaGFuZGxlSW1hZ2VzQm94SG92ZXIgfSxcbiAgICAgICAgICAgICAgICBpbWFnZXNMb2FkaW5nICYmXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYigwLCAwLCAwLDAuNSknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6ICc5J1xuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3Rfc3ByaW5nXzEuYW5pbWF0ZWQuZGl2LCB7IHN0eWxlOiBhbmltYXRpb25TdHlsZSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuTG9hZGluZ091dGxpbmVkLCBudWxsKSkpLFxuICAgICAgICAgICAgICAgIHByb3BzLmltYWdlcy5sZW5ndGggPiAwID9cbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiaW1hZ2VCb3hcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbWFnZSwgeyBcImRhdGEtZG93bmxvYWRsb2NhdGlvblwiOiBwcm9wcy5pbWFnZXNbaW1hZ2VJbmRleF0ubGlua3MuZG93bmxvYWRfbG9jYXRpb24sIHNyYzogcHJvcHMuaW1hZ2VzW2ltYWdlSW5kZXhdLnVybHMuc21hbGwsIGFsdDogcHJvcHMuaW1hZ2VzW2ltYWdlSW5kZXhdWydkZXNjcmlwdGlvbiddLCBoZWlnaHQ6IDI0MCwgd2lkdGg6ICcxMDAlJywgcHJldmlldzogZmFsc2UsIHBsYWNlaG9sZGVyOiB0cnVlIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImltYWdlUXVldWVcIiwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBwcm9wcy5pbWFnZXMubWFwKGltZyA9PiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7IGtleTogaW1nLmlkLCBzcmM6IGltZy51cmxzLnNtYWxsIH0pKSkpXG4gICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMjQwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzJweCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkVtcHR5LCB7IHN0eWxlOiB7IG1hcmdpbjogJzAgYXV0bycgfSwgZGVzY3JpcHRpb246ICdObyByZWxhdGVkIHBpY3R1cmVzIGZvdW5kJywgaW1hZ2U6IGFudGRfMS5FbXB0eS5QUkVTRU5URURfSU1BR0VfU0lNUExFIH0pKSxcbiAgICAgICAgICAgICAgICBzaG93Q29udHJvbCAmJiAhaW1hZ2VzTG9hZGluZyAmJlxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzAgMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWFyb3VuZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBtYXJnaW46ICcwcHggMThweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMzYwZGVnLCByZ2JhKDAsIDAsIDAsIDApIDAlLCByZ2JhKDAsIDAsIDAsIDAuMSkgMjcuNiUsIHJnYmEoMCwgMCwgMCwgMC4yKSA1NC42OSUsIHJnYmEoMCwgMCwgMCwgMC4zNSkgMTAwJSknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBjaGFuZ2VJbWFnZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pi+56S65Zu+54mH5pCc57Si5o6n5Lu2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMnB4IDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyBmbGV4OiAnMScsIG1hcmdpblJpZ2h0OiAnMjBweCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLklucHV0LCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSA9PT0gZmFsc2UgPyAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkpJyA6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICcycHgnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgc3VmZml4OiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChQcm9UYWdfMS5Qcm9UYWcsIG51bGwpLCBkaXNhYmxlZDogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCksIHBsYWNlaG9sZGVyOiBcIlNlYXJjaCBpbWFnZXNcIiwgb25LZXlEb3duOiBoYW5kbGVTZWFyY2hJbnB1dCwgb25Db21wb3NpdGlvblN0YXJ0OiBoYW5kbGVDb21wb3NpdGlvblN0YXJ0LCBvbkNvbXBvc2l0aW9uRW5kOiBoYW5kbGVDb21wb3NpdGlvbkVuZCwgc2l6ZTogXCJzbWFsbFwiLCByZWY6IGlucHV0RWxlbWVudCwgb25QcmVzc0VudGVyOiBoYW5kbGVTZWFyY2hCdG5DbGljayB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Ub29sdGlwLCB7IHBsYWNlbWVudDogXCJib3R0b21cIiwgdGl0bGU6ICdTZWFyY2ggSW1hZ2VzKOKPjiknLCBhcnJvdzogZmFsc2UsIGdldFBvcHVwQ29udGFpbmVyOiAoKSA9PiBpbWFnZUJveEVsZW1lbnQuY3VycmVudCB8fCBkb2N1bWVudC5ib2R5IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBkaXNhYmxlZDogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCksIHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIHN0eWxlOiB7IGNvbG9yOiAnI2ZmZicsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgbWFyZ2luUmlnaHQ6ICcxMHB4Jywgb3BhY2l0eTogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCkgPyAnMC43JyA6ICcxJyB9LCBvbkNsaWNrOiBoYW5kbGVTZWFyY2hCdG5DbGljaywgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5TZWFyY2hPdXRsaW5lZCwgbnVsbCkgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlRvb2x0aXAsIHsgcGxhY2VtZW50OiBcImJvdHRvbVwiLCB0aXRsZTogJ0dlbmVyYXRlIEltYWdlcyB3aXRoIEFJJywgYXJyb3c6IGZhbHNlLCBnZXRQb3B1cENvbnRhaW5lcjogKCkgPT4gaW1hZ2VCb3hFbGVtZW50LmN1cnJlbnQgfHwgZG9jdW1lbnQuYm9keSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgZGlzYWJsZWQ6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpLCB0eXBlOiBcInRleHRcIiwgc2l6ZTogXCJzbWFsbFwiLCBzdHlsZTogeyBjb2xvcjogJyNmZmYnLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIG1hcmdpblJpZ2h0OiAnMTBweCcsIG9wYWNpdHk6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpID8gJzAuNycgOiAnMScgfSwgb25DbGljazogaGFuZGxlR2VuZXJhdGlvbnNJbWFnZXMsIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuVGh1bmRlcmJvbHRPdXRsaW5lZCwgbnVsbCkgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyB0eXBlOiBcInRleHRcIiwgc2l6ZTogXCJzbWFsbFwiLCBzdHlsZTogeyBjb2xvcjogJyNmZmYnLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfSwgb25DbGljazogKCkgPT4gc2V0Q2hhbmdlSW1hZ2VTdGF0dXMoZmFsc2UpLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkNsb3NlT3V0bGluZWQsIG51bGwpIH0pKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleEdyb3c6ICdpbmhlcml0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaW1hZ2VzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuTGVmdE91dGxpbmVkLCBudWxsKSwgb25DbGljazogKCkgPT4gaGFuZGxlQ2hhbmdlSW1hZ2VzQ2xpY2soLTEpIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzQwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzAgNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBpbWFnZUluZGV4ICsgMSArICcvJyArIHByb3BzLmltYWdlcy5sZW5ndGgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuUmlnaHRPdXRsaW5lZCwgbnVsbCksIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUNoYW5nZUltYWdlc0NsaWNrKDEpIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93LXJldmVyc2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogJzEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgdHlwZTogXCJ0ZXh0XCIsIHNpemU6IFwic21hbGxcIiwgc3R5bGU6IHsgY29sb3I6ICcjZmZmJywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH0sIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUVkaXRJbWFnZXNDbGljaygpLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkZvcm1PdXRsaW5lZCwgbnVsbCkgfSkpKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaW1hZ2VzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbWFnZVNvdXJjZVwiLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogJzEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2ZsZXgtZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMC45MGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiAnNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFNoYWRvdzogJzJweCAycHggNXB4IHJnYmEoMCwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBwcm9wcy5pbWFnZXNbaW1hZ2VJbmRleF0udHlwZSA9PT0gJ2FpJyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCwgXCJQaG90byBieSBBSVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQaG90byBieSBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBzdHlsZTogeyB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsIHBhZGRpbmc6ICcwIDJweCcgfSwgdGFyZ2V0OiAnX2JsYW5rJywgaHJlZjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9AXCIgKyBwcm9wcy5pbWFnZXNbaW1hZ2VJbmRleF0udXNlci51c2VybmFtZSArIFwiP3V0bV9zb3VyY2U9U2NvdXRlciZ1dG1fbWVkaXVtPXJlZmVycmFsXCIgfSwgcHJvcHMuaW1hZ2VzW2ltYWdlSW5kZXhdLnVzZXIubmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgb24gXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgc3R5bGU6IHsgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnLCBwYWRkaW5nOiAnMCAycHgnIH0sIHRhcmdldDogJ19ibGFuaycsIGhyZWY6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vP3V0bV9zb3VyY2U9U2NvdXRlciZ1dG1fbWVkaXVtPXJlZmVycmFsXCIgfSwgXCJVbnNwbGFzaFwiKSkpKSkpKSk7XG59XG5leHBvcnRzLkltYWdlcyA9IEltYWdlcztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk5hdiA9IHZvaWQgMDtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCBEcm9wZG93bk1lbnUgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIkByYWRpeC11aS9yZWFjdC1kcm9wZG93bi1tZW51XCIpKTtcbmNvbnN0IERyb3Bkb3duTWVudUl0ZW1fMSA9IHJlcXVpcmUoXCIuL0Ryb3Bkb3duTWVudUl0ZW1cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vUG9wdXBDYXJkL3V0aWxcIik7XG5jb25zdCByZWFjdF9pY29uc18xID0gcmVxdWlyZShcIkByYWRpeC11aS9yZWFjdC1pY29uc1wiKTtcbi8vIGltcG9ydCB0eXBlIHsgTWVudVByb3BzIH0gZnJvbSAnYW50ZCc7XG5jb25zdCBjb250ZW50U2NyaXB0XzEgPSByZXF1aXJlKFwiLi4vY29udGVudFNjcmlwdFwiKTtcbmNvbnN0IGljb25zXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7XG5mdW5jdGlvbiBOYXYocHJvcHMpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnN0IFtpc1Bpbiwgc2V0SXNQaW5dID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbY3VycmVudFVSTCwgc2V0Q3VycmVudFVSTF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoKTtcbiAgICBjb25zdCBbaXNPcGVuUHJvbXB0TWVudSwgc2V0SXNPcGVuUHJvbXB0TWVudV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IGRlZmF1bHRQcm9tcHQgPSAoMCwgcmVhY3RfMS51c2VSZWYpKCk7XG4gICAgLy8gY29uc3QgeyBPcHRpb24gfSA9IFNlbGVjdDtcbiAgICBjb25zdCBuYXZFbGVtZW50ID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICBjb25zdCBkaWN0UHJvbXB0ID0ge1xuICAgICAgICB0aXRsZTogJ+ivjeWFuCcsXG4gICAgICAgIGlkOiAnZGljdCcsXG4gICAgICAgIGdldFVuc3BsYXNoSW1hZ2VzOiB0cnVlLFxuICAgICAgICB1c2VyUHJvbXB0OiAnJyxcbiAgICB9O1xuICAgIGNvbnNvbGUubG9nKHByb3BzKTtcbiAgICBjb25zb2xlLmxvZyhkaWN0UHJvbXB0KTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgLy8g5b2T5LiN6Ieq5Yqo6Ieq6KGMIFByb21wdO+8jOiHquWKqOaJk+W8gCBQcm9tcHQg6I+c5Y2V5L6b55So5oi36YCJ5oupXG4gICAgICAgIGlmIChwcm9wcy5pc09wZW5NZW51KSB7XG4gICAgICAgICAgICBvbk1lbnVPcGVuQ2hhbmdlKHByb3BzLmlzT3Blbk1lbnUpO1xuICAgICAgICB9XG4gICAgfSwgW3Byb3BzLmlzT3Blbk1lbnVdKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgZGVmYXVsdFByb21wdC5jdXJyZW50ID0gKDAsIHV0aWxfMS5nZXREZWZhdWx0UHJvbXB0KShwcm9wcy5rZXlXb3JkKTtcbiAgICB9LCBbXSk7XG4gICAgLy8g54K55Ye75L+d5a2Y5YiwIEFua2kg5oyJ6ZKuXG4gICAgY29uc3QgaGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrID0gKCkgPT4ge1xuICAgICAgICBwcm9wcy5oYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2soKTtcbiAgICB9O1xuICAgIC8vIOeCueWHuyBQaW4g5oyJ6ZKuXG4gICAgY29uc3QgaGFuZGxlUGluQnRuQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGlmIChpc1Bpbikge1xuICAgICAgICAgICAgKDAsIGNvbnRlbnRTY3JpcHRfMS5waW5Qb3B1cENhcmQpKGZhbHNlKTtcbiAgICAgICAgICAgIHNldElzUGluKGZhbHNlKTtcbiAgICAgICAgICAgIC8vIGFtcGxpdHVkZS50cmFjaygncGluUG9wdXBDYXJkJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAoMCwgY29udGVudFNjcmlwdF8xLnBpblBvcHVwQ2FyZCkodHJ1ZSk7XG4gICAgICAgICAgICBzZXRJc1Bpbih0cnVlKTtcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAncGluUG9wdXBDYXJkJyB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8g5ZyoIEFua2kg5Lit5omT5byA56yU6K6wXG4gICAgY29uc3QgZWRpdE5vdGVJbkFua2kgPSAobm90ZUlkKSA9PiB7XG4gICAgICAgIGxldCBzZW5kaW5nID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnZ3VpRWRpdE5vdGUnLCAnbWVzc2FnZXMnOiB7ICdhbmtpX2FjdGlvbl90eXBlJzogJ2d1aUVkaXROb3RlJywgJ2Fua2lfYXJndW1lbnRzJzogeyAnbm90ZSc6IG5vdGVJZCB9LCB9IH0pO1xuICAgICAgICBzZW5kaW5nLnRoZW4oKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgLy9lcnJvclxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vIOaJk+W8gCBQcm9tcHQg57yW6L6R56qX5Y+jXG4gICAgY29uc3Qgb3BlbkN1c3RvbVByb21wdEZvcm0gPSAoZGF0YSkgPT4ge1xuICAgICAgICBwcm9wcy5vcGVuQ3VzdG9tUHJvbXB0Rm9ybShkYXRhKTtcbiAgICAgICAgc2V0SXNPcGVuUHJvbXB0TWVudShmYWxzZSk7XG4gICAgfTtcbiAgICAvLyBQcm9tcHQg6I+c5Y2VIGl0ZW0g54K55Ye7XG4gICAgY29uc3QgaGFuZGxlTWVudUl0ZW1DbGljayA9IChkYXRhKSA9PiB7XG4gICAgICAgIC8vIOesrCAzIOS4quWPguaVsCBmYWxzZSDooajnpLrkuI3ph43mlrDmuLLmn5Plm77niYdcbiAgICAgICAgLy8gLy8g5aaC5p6c5LiK5LiA5LiqIFByb21wdCDmmK/kuI3mmL7npLrlm77niYfvvIzkuJTlvZPliY0gUHJvbXB0IOmcgOimgeaYvuekuuWbvueJh++8jOWImeacrOasoeS7u+WKoemcgOimgea4suafk+WbvueJh++8jOWQpuWImeS4jemHjeaWsOa4suafk+WbvueJh1xuICAgICAgICAvLyBpZiAocHJvcHMubGFzdEV4ZWN1dGVkUHJvbXB0LmdldFVuc3BsYXNoSW1hZ2VzICE9PSB0cnVlICYmIGRhdGEuZ2V0VW5zcGxhc2hJbWFnZXMpIHtcbiAgICAgICAgLy8gICAgIHByb3BzLmhhbmRsZU1lbnVJdGVtQ2xpY2soZGF0YSlcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIHByb3BzLmhhbmRsZU1lbnVJdGVtQ2xpY2soZGF0YSwgdHJ1ZSwgZmFsc2UpXG4gICAgICAgIC8vIH1cbiAgICAgICAgcHJvcHMuaGFuZGxlTWVudUl0ZW1DbGljayhkYXRhKTtcbiAgICB9O1xuICAgIGNvbnN0IG9uTWVudU9wZW5DaGFuZ2UgPSAob3BlbikgPT4ge1xuICAgICAgICAvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBzZXRJc09wZW5Qcm9tcHRNZW51KG9wZW4pO1xuICAgIH07XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Db25maWdQcm92aWRlciwgeyB0aGVtZToge1xuICAgICAgICAgICAgICAgIHRva2VuOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yUHJpbWFyeTogJyNGMDhBMjQnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBcIlNjb3V0ZXJOYXZcIiwgcmVmOiBuYXZFbGVtZW50LCBjbGFzc05hbWU6ICdwLTQnLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnZmxleC1zdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiAnMTJweCcsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdCb3R0b206ICcxMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KScsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAnbW92ZScsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLCB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogOSxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEycHggMThweCdcbiAgICAgICAgICAgICAgICB9LCBvbk1vdXNlRG93bjogcHJvcHMub25Nb3VzZURvd24gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IHpJbmRleDogOSB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5Sb290LCB7IG9wZW46IGlzT3BlblByb21wdE1lbnUsIG1vZGFsOiBmYWxzZSwgb25PcGVuQ2hhbmdlOiBvbk1lbnVPcGVuQ2hhbmdlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnUuVHJpZ2dlciwgeyBhc0NoaWxkOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBjbGFzc05hbWU6IFwiSWNvbkJ1dHRvblwiLCBcImFyaWEtbGFiZWxcIjogXCJDdXN0b21pc2Ugb3B0aW9uc1wiLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF9pY29uc18xLkhhbWJ1cmdlck1lbnVJY29uLCBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiAnNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogJzE3MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sIHByb3BzLmxhc3RFeGVjdXRlZFByb21wdC50aXRsZSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5Qb3J0YWwsIHsgY29udGFpbmVyOiBuYXZFbGVtZW50LmN1cnJlbnQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnUuQ29udGVudCwgeyBjbGFzc05hbWU6IFwiRHJvcGRvd25NZW51Q29udGVudFwiLCBhbGlnbjogJ3N0YXJ0Jywgc2lkZU9mZnNldDogNSwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAnZGVmYXVsdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTgwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAnMHB4IDEwcHggMzhweCAtMTBweCByZ2JhKDIyLCAyMywgMjQsIDAuMzUpLCAwcHggMTBweCAyMHB4IC0xNXB4IHJnYmEoMjIsIDIzLCAyNCwgMC4yKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246ICc0MDBtcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb3pBbmltYXRpb25UaW1pbmdGdW5jdGlvbjogJ2N1YmljLWJlemllcigwLjE2LCAxLCAwLjMsIDEpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbGxDaGFuZ2U6ICd0cmFuc2Zvcm0sIG9wYWNpdHknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51SXRlbV8xLkRyb3Bkb3duTWVudUl0ZW0sIHsga2V5OiAoX2EgPSBkZWZhdWx0UHJvbXB0LmN1cnJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pZCwgZGF0YTogZGVmYXVsdFByb21wdC5jdXJyZW50LCBvblNlbGVjdDogKCkgPT4gaGFuZGxlTWVudUl0ZW1DbGljayhkZWZhdWx0UHJvbXB0LmN1cnJlbnQpLCBoYW5kbGVFZGl0UHJvbXB0OiAoKSA9PiBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogdHJ1ZSwgZGF0YTogZGVmYXVsdFByb21wdC5jdXJyZW50IH0pIH0sIChfYiA9IGRlZmF1bHRQcm9tcHQuY3VycmVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRpdGxlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51SXRlbV8xLkRyb3Bkb3duTWVudUl0ZW0sIHsga2V5OiBkaWN0UHJvbXB0LmlkLCBkYXRhOiBkaWN0UHJvbXB0LCBvblNlbGVjdDogKCkgPT4gaGFuZGxlTWVudUl0ZW1DbGljayhkaWN0UHJvbXB0KSwgaGFuZGxlRWRpdFByb21wdDogKCkgPT4gb3BlbkN1c3RvbVByb21wdEZvcm0oeyBpc09wZW46IHRydWUsIGRhdGE6IGRpY3RQcm9tcHQgfSkgfSwgXCJcXHU4QkNEXFx1NTE3OFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkRpdmlkZXIsIHsgc3R5bGU6IHsgbWFyZ2luOiAnOHB4IDAnIH0gfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLnByb21wdHMubWFwKGl0ZW0gPT4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51SXRlbV8xLkRyb3Bkb3duTWVudUl0ZW0sIHsga2V5OiBpdGVtLmlkLCBkYXRhOiBpdGVtLCBvblNlbGVjdDogKCkgPT4gaGFuZGxlTWVudUl0ZW1DbGljayhpdGVtKSwgaGFuZGxlRWRpdFByb21wdDogKCkgPT4gb3BlbkN1c3RvbVByb21wdEZvcm0oeyBpc09wZW46IHRydWUsIGRhdGE6IGl0ZW0gfSkgfSwgaXRlbS50aXRsZSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnUuU2VwYXJhdG9yLCB7IGNsYXNzTmFtZTogXCJEcm9wZG93bk1lbnVTZXBhcmF0b3JcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMucHJvbXB0cy5sZW5ndGggPCA2ID8gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZTogeyBtYXJnaW5Ub3A6ICc0cHgnIH0sIHNpemU6ICdzbWFsbCcsIG9uQ2xpY2s6ICgpID0+IG9wZW5DdXN0b21Qcm9tcHRGb3JtKHsgaXNPcGVuOiB0cnVlLCBkYXRhOiB7ICd0aXRsZSc6ICcnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBmYWxzZSwgJ3VzZXJQcm9tcHQnOiAnJywgJ2lkJzogJycgfSB9KSB9LCBcIkNyZWF0ZSBwcm9tcHRcIikgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZTogeyBtYXJnaW5Ub3A6ICc0cHgnIH0sIHNpemU6ICdzbWFsbCcsIGRpc2FibGVkOiB0cnVlIH0sIFwiQXQgbW9zdCA3IFByb21wdHNcIikpKSkpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInJpZ2h0QnRuQm94XCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdlbmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5hZGRUb0Fua2lTdGF0dXMuc3RhdHVzID09ICdzdWNjZXNzJyA/IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5DaGVja0NpcmNsZVR3b1RvbmUsIHsgdHdvVG9uZUNvbG9yOiBcIiM1MmM0MWFcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIEFkZGVkIHRvIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9uQ2xpY2s6IGVkaXROb3RlSW5BbmtpLmJpbmQoZXZlbnQsIHByb3BzLmFkZFRvQW5raVN0YXR1cy5ub3RlSWQpIH0sIFwiQW5raVwiKSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzaXplOiBcInNtYWxsXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHR5cGU9J3RleHQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMy4ycHgnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5QbHVzU3F1YXJlT3V0bGluZWQsIG51bGwpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsb2FkaW5nPXtwcm9wcy5hZGRUb0Fua2lTdGF0dXMgPT09ICdsb2FkaW5nJyA/IHRydWUgOiBmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogcHJvcHMuYWRkVG9BbmtpU3RhdHVzLnN0YXR1cyA9PT0gJ3N0YW5kYnknIHx8IHByb3BzLmFkZFRvQW5raVN0YXR1cy5zdGF0dXMgPT09ICdsb2FkaW5nJyA/IHRydWUgOiBmYWxzZSwgb25DbGljazogaGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrIH0sIHByb3BzLmFkZFRvQW5raVN0YXR1cy5zdGF0dXMgPT09ICdsb2FkaW5nJyA/ICdBZGRpbmcuLi4nIDogJ0FkZCB0byBBbmtpJyksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc2l6ZTogJ3NtYWxsJywgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogaXNQaW4gPyAnI0YwOEEyNCcgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzEzLjJweCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGljb246IGlzUGluID8gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5QdXNocGluRmlsbGVkLCB7IGNsYXNzTmFtZTogJ2lzUGluJyB9KSA6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuUHVzaHBpbk91dGxpbmVkLCBudWxsKSwgb25DbGljazogaGFuZGxlUGluQnRuQ2xpY2sgfSkpKSkpKTtcbn1cbmV4cG9ydHMuTmF2ID0gTmF2O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTWVzc2FnZXNMaXN0ID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBzdHlsZWRfY29tcG9uZW50c18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKSk7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IHJlYWN0X2ljb25zXzEgPSByZXF1aXJlKFwiQHJhZGl4LXVpL3JlYWN0LWljb25zXCIpO1xuY29uc3QgcmVhY3RfbWFya2Rvd25fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3QtbWFya2Rvd25cIikpO1xuY29uc3QgcmVtYXJrX2JyZWFrc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZW1hcmstYnJlYWtzXCIpKTtcbmNvbnN0IHJlaHlwZV9yYXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVoeXBlLXJhd1wiKSk7XG5jb25zdCByZW1hcmtfZ2ZtXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlbWFyay1nZm1cIikpO1xuY29uc3Qgc2V0dGluZ0d1aWRlX3BuZ18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9hc3NldHMvc2V0dGluZ0d1aWRlLnBuZ1wiKSk7XG5jb25zdCBJbWFnZXNfMSA9IHJlcXVpcmUoXCIuLi9Db21wb25lbnRzL0ltYWdlc1wiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5sZXQgSWNvbkJ1dHRvbiA9ICgwLCBzdHlsZWRfY29tcG9uZW50c18xLmRlZmF1bHQpKGFudGRfMS5CdXR0b24pIGBcblxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuYDtcbmNvbnN0IE1lc3NhZ2VCb3ggPSBzdHlsZWRfY29tcG9uZW50c18xLmRlZmF1bHQuZGl2IGBcbiAgICBcbiAgICBwYWRkaW5nOjE4cHggMDtcblxuICAgICY6aG92ZXJ7XG4gICAgICAgIC8vIGJhY2tncm91bmQtY29sb3I6IHJnYigwLDAsMCwwLjA0KTtcbiAgICB9XG4gICAgXG5cbmA7XG5mdW5jdGlvbiBNZXNzYWdlKHByb3BzKSB7XG4gICAgY29uc3QgW2ltYWdlcywgc2V0SW1hZ2VzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShbXSk7XG4gICAgY29uc3QgW21lc3NhZ2VJbmRleCwgc2V0TWVzc2FnZUluZGV4XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShwcm9wcy5tZXNzYWdlLmNvbnRlbnQubGVuZ3RoIC0gMSk7XG4gICAgY29uc3QgW2lzTWVzc2FnZUhvdmVyLCBzZXRJc01lc3NhZ2VIb3Zlcl0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICBzZXRJbWFnZXMocHJvcHMubWVzc2FnZS5pbWFnZXMpO1xuICAgICAgICBzZXRNZXNzYWdlSW5kZXgocHJvcHMubWVzc2FnZS5jb250ZW50Lmxlbmd0aCA8PSAwID8gMCA6IHByb3BzLm1lc3NhZ2UuY29udGVudC5sZW5ndGggLSAxKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ21lc3NhZ2VJbmRleDonKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZUluZGV4KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocHJvcHMubWVzc2FnZS5jb250ZW50KTtcbiAgICB9LCBbcHJvcHMubWVzc2FnZV0pO1xuICAgIGNvbnN0IGhhbmRsZU1lc3NhZ2VJbmRleENoYW5nZSA9IChuKSA9PiB7XG4gICAgICAgIGxldCBuZXdJbmRleCA9IG1lc3NhZ2VJbmRleDtcbiAgICAgICAgbmV3SW5kZXggKz0gbjtcbiAgICAgICAgaWYgKG5ld0luZGV4IDwgMCkge1xuICAgICAgICAgICAgbmV3SW5kZXggPSBwcm9wcy5tZXNzYWdlLmNvbnRlbnQubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3SW5kZXggPiBwcm9wcy5tZXNzYWdlLmNvbnRlbnQubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgbmV3SW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHNldE1lc3NhZ2VJbmRleChuZXdJbmRleCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNZXNzYWdlSG92ZXIgPSAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50eXBlID09PSAnbW91c2VsZWF2ZScpIHtcbiAgICAgICAgICAgIHNldElzTWVzc2FnZUhvdmVyKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldElzTWVzc2FnZUhvdmVyKHRydWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyBjb25zdCBsYXN0U3RhdHVzID0gcHJvcHMubWVzc2FnZS5jb250ZW50W3Byb3BzLm1lc3NhZ2UuY29udGVudC5sZW5ndGggLSAxXS5zdGF0dXNcbiAgICBsZXQgY29udGVudDtcbiAgICBpZiAobWVzc2FnZUluZGV4ID4gcHJvcHMubWVzc2FnZS5jb250ZW50Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgY29udGVudCA9IHByb3BzLm1lc3NhZ2UuY29udGVudFtwcm9wcy5tZXNzYWdlLmNvbnRlbnQubGVuZ3RoIC0gMV07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb250ZW50ID0gcHJvcHMubWVzc2FnZS5jb250ZW50W21lc3NhZ2VJbmRleF07XG4gICAgfVxuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICcnLCBzdHlsZTogcHJvcHMubWVzc2FnZS5yb2xlID09PSAndXNlcicgPyB7IGJhY2tncm91bmRDb2xvcjogJyNGNkY2RjYnLCBwYWRkaW5nVG9wOiAnMnB4JywgcGFkZGluZ0JvdHRvbTogJzJweCcgfSA6IHt9IH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Ta2VsZXRvbiwgeyBzdHlsZTogeyBtYXJnaW46ICcxOHB4IDAnIH0sIGxvYWRpbmc6IHByb3BzLm1lc3NhZ2UuY29udGVudFtwcm9wcy5tZXNzYWdlLmNvbnRlbnQubGVuZ3RoIC0gMV1bJ3N0YXR1cyddID09PSAnYmVnaW4nID8gdHJ1ZSA6IGZhbHNlLCBhY3RpdmU6IHRydWUsIHRpdGxlOiBmYWxzZSB9LFxuICAgICAgICAgICAgcHJvcHMubWVzc2FnZS5zaG93SW1hZ2VzQm94ICYmXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoSW1hZ2VzXzEuSW1hZ2VzLCB7IGltYWdlczogaW1hZ2VzLCBnZXRVbnNwbGFzaEltYWdlczogKGtleVdvcmQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICgwLCB1dGlsXzEuZ2V0VW5zcGxhc2hJbWFnZXMpKGtleVdvcmQpLnRoZW4oKGltZ3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlpITnkIblm77niYfnmoTmlbDmja7moLzlvI9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SW1hZ2VzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1ncy5mb3JFYWNoKChpbWcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Vuc3BsYXNoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpbWcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmxzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc21hbGw6IGltZy51cmxzLnNtYWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3dubG9hZF9sb2NhdGlvbjogaW1nLmxpbmtzLmRvd25sb2FkX2xvY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGltZy5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogaW1nLnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaW1nLnVzZXIubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdJbWFnZXMucHVzaChvYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEltYWdlcyhuZXdJbWFnZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGdlbmVyYXRpb25zSW1hZ2VzOiAoa2V5V29yZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnZ2VuZXJhdGlvbnNJbWFnZXMnLCAnZGF0YSc6IHsgJ3Byb21wdCc6IGtleVdvcmQgfSB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWkhOeQhuWbvueJh+eahOaVsOaNruagvOW8j1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdJbWFnZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2VlZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEuZGF0YS5mb3JFYWNoKChpbWcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYWknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpbWcudXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc21hbGw6IGltZy51cmxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvd25sb2FkX2xvY2F0aW9uOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6ICdBSScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBSSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3SW1hZ2VzLnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEltYWdlcyhuZXdJbWFnZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW1hZ2VzKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1RoZSBjdXJyZW50IEFJIGVuZHBvaW50IGRvZXMgbm90IHN1cHBvcnQgaW1hZ2UgZ2VuZXJhdGlvbi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSB9KSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VCb3gsIHsgc3R5bGU6IHt9LCBvbk1vdXNlRW50ZXI6IGhhbmRsZU1lc3NhZ2VIb3Zlciwgb25Nb3VzZUxlYXZlOiBoYW5kbGVNZXNzYWdlSG92ZXIgfSxcbiAgICAgICAgICAgICAgICBwcm9wcy5tZXNzYWdlLmNvbnRlbnQubGVuZ3RoID4gMSAmJiBpc01lc3NhZ2VIb3ZlciAmJlxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJy0zMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ2ZpdC1jb250ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6ICc5J1xuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnZml0LWNvbnRlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJ3JnYmEoMCwgMCwgMCwgMC4wOCkgMHB4IDZweCAxNnB4IDBweCwgcmdiYSgwLCAwLCAwLCAwLjEyKSAwcHggM3B4IDZweCAtNHB4LCByZ2JhKDAsIDAsIDAsIDAuMDUpIDBweCA5cHggMjhweCA4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChJY29uQnV0dG9uLCB7IHR5cGU6ICd0ZXh0Jywgc2l6ZTogJ3NtYWxsJywgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfaWNvbnNfMS5DaGV2cm9uTGVmdEljb24sIG51bGwpLCBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVNZXNzYWdlSW5kZXhDaGFuZ2UoLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgbWFyZ2luOiAnMCAycHgnIH0gfSwgbWVzc2FnZUluZGV4ICsgMSArICcvJyArIHByb3BzLm1lc3NhZ2UuY29udGVudC5sZW5ndGgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEljb25CdXR0b24sIHsgdHlwZTogJ3RleHQnLCBzaXplOiAnc21hbGwnLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF9pY29uc18xLkNoZXZyb25SaWdodEljb24sIG51bGwpLCBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVNZXNzYWdlSW5kZXhDaGFuZ2UoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlwUGF0aDogXCJwYXRoKCdNIDAgOCBBIDQgNCAwIDAgMCAyLjgyODQyNzEyNDc0NjE5IDYuODI4NDI3MTI0NzQ2MTkgTCA2LjU4NTc4NjQzNzYyNjkwNSAzLjA3MTA2NzgxMTg2NTQ3NTUgQSAyIDIgMCAwIDEgOS40MTQyMTM1NjIzNzMwOTYgMy4wNzEwNjc4MTE4NjU0NzU1IEwgMTMuMTcxNTcyODc1MjUzODEgNi44Mjg0MjcxMjQ3NDYxOSBBIDQgNCAwIDAgMCAxNiA4IFonKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzE2cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICc4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDE4MGRlZyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICdyZ2JhKDAsIDAsIDAsIDAuMDgpIDBweCA2cHggMTZweCAwcHgsIHJnYmEoMCwgMCwgMCwgMC4xMikgMHB4IDNweCA2cHggLTRweCwgcmdiYSgwLCAwLCAwLCAwLjA1KSAwcHggOXB4IDI4cHggOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJzI2cHgnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9KSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfbWFya2Rvd25fMS5kZWZhdWx0LCB7IHJlbWFya1BsdWdpbnM6IFtyZW1hcmtfYnJlYWtzXzEuZGVmYXVsdCwgcmVtYXJrX2dmbV8xLmRlZmF1bHRdLCByZWh5cGVQbHVnaW5zOiBbcmVoeXBlX3Jhd18xLmRlZmF1bHRdLCBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU6IChfYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeyBub2RlIH0gPSBfYSwgcHJvcHMgPSBfX3Jlc3QoX2EsIFtcIm5vZGVcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyBvdmVyZmxvd1g6ICdzY3JvbGwnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiwgT2JqZWN0LmFzc2lnbih7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnbWF4LWNvbnRlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogJzYyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjY2NjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBwcm9wcykpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBza2lwSHRtbDogZmFsc2UsIGNoaWxkcmVuOiBjb250ZW50Wydjb250ZW50J10gfSksXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRbJ3N0YXR1cyddID09PSAnaW52YWxpZF9hcGlfa2V5JyAmJiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsgc3JjOiBzZXR0aW5nR3VpZGVfcG5nXzEuZGVmYXVsdCwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSkpKSkpKSk7XG59XG47XG5mdW5jdGlvbiBNZXNzYWdlc0xpc3QocHJvcHMpIHtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnbWVzc2FnZXMnLCBzdHlsZToge1xuICAgICAgICAgICAgbGluZUhlaWdodDogJzInLFxuICAgICAgICAgICAgd29yZFdyYXA6ICdicmVhay13b3JkJyxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzQ4cHgnXG4gICAgICAgIH0gfSwgcHJvcHMubWVzc2FnZXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChNZXNzYWdlLCB7IGtleTogaXRlbS5jb250ZW50WzBdLmNoYXRJZCwgbWVzc2FnZTogaXRlbSB9KTtcbiAgICB9KSkpO1xufVxuZXhwb3J0cy5NZXNzYWdlc0xpc3QgPSBNZXNzYWdlc0xpc3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Qcm9tcHRMaXN0ID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IHN0eWxlZF9jb21wb25lbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInN0eWxlZC1jb21wb25lbnRzXCIpKTtcbmNvbnN0IHVzZXJJbmZvXzEgPSByZXF1aXJlKFwiLi4vbGliL3VzZXJJbmZvXCIpO1xuY29uc3QgUHJvVGFnXzEgPSByZXF1aXJlKFwiLi4vQ29tcG9uZW50cy9Qcm9UYWdcIik7XG5sZXQgTXlCdXR0b24gPSBzdHlsZWRfY29tcG9uZW50c18xLmRlZmF1bHQuYnV0dG9uIGBcblxuICAgIHBhZGRpbmc6IDZweDtcbiAgICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIGN1cnNvcjogdW5zZXQ7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjojRjZGNkY2O1xuICAgIH1cbmA7XG5mdW5jdGlvbiBQcm9tcHRCdXR0b24ocHJvcHMpIHtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE15QnV0dG9uLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxuICAgICAgICAgICAgcGFkZGluZzogJzRweCcsXG4gICAgICAgICAgICBwb2ludGVyRXZlbnRzOiBwcm9wcy5kaXNhYmxlID8gJ25vbmUnIDogJ2F1dG8nXG4gICAgICAgIH0sIG9uQ2xpY2s6IHByb3BzLmhhbmRsZU1lbnVJdGVtQ2xpY2sgfSwgcHJvcHMuY2hpbGRyZW4pKTtcbn1cbmZ1bmN0aW9uIFByb21wdExpc3QocHJvcHMpIHtcbiAgICBjb25zdCBQcm9tcHRMaXN0RE9NID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICBjb25zdCB1c2VySW5mbyA9ICgwLCB1c2VySW5mb18xLnVzZVVzZXJJbmZvQ29udGV4dCkoKTtcbiAgICAvLyBjb25zdCB1c2VySW5mbyA9IHVzZVVzZXJJbmZvQ29udGV4dCgpXG4gICAgLy8gY29uc29sZS5sb2coJ3VzZXJJbmZvOicpO1xuICAgIC8vIGNvbnNvbGUubG9nKHVzZXJJbmZvKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICB9LCBbcHJvcHMuc2hvd0ZvbGxvd1VwRGF0YU1lbnUuc2hvd10pO1xuICAgIC8vIFByb21wdCDoj5zljZUgaXRlbSDngrnlh7tcbiAgICBjb25zdCBoYW5kbGVNZW51SXRlbUNsaWNrID0gKGRhdGEpID0+IHtcbiAgICAgICAgaWYgKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSB7XG4gICAgICAgICAgICAvLyDnrKwgMyDkuKrlj4LmlbAgZmFsc2Ug6KGo56S65LiN6YeN5paw5riy5p+T5Zu+54mHXG4gICAgICAgICAgICBwcm9wcy5oYW5kbGVNZW51SXRlbUNsaWNrKGRhdGEsICd5ZXMnLCB0cnVlLCBwcm9wcy5mb2xsb3dVcERhdGEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgcmVmOiBQcm9tcHRMaXN0RE9NLCBjbGFzc05hbWU6ICdmb2xsb3dVcE1lbnUnLCBzdHlsZTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwcm9wcy5zaG93Rm9sbG93VXBEYXRhTWVudS5zdHlsZSksIHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIGRpc3BsYXk6IFwiZmxleFwiLCBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLCB3aWR0aDogJzEyMHB4JywgcGFkZGluZzogJzAnIH0pIH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdlbmQnLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHgnLFxuICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNiknLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzY2NidcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IHN0eWxlOiB7IGZsZXg6ICcxJyB9IH0sIFwiUHJvbXB0XCIpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvVGFnXzEuUHJvVGFnLCBudWxsKSksXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHggOHB4IDRweCcsXG4gICAgICAgICAgICAgICAgY3Vyc29yOiAhKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSA/ICdub3QtYWxsb3dlZCcgOiAnJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAhKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSA/ICcwLjcnIDogJzEnLFxuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvbXB0QnV0dG9uLCB7IGRpc2FibGU6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpLCBoYW5kbGVNZW51SXRlbUNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHAgPSAoMCwgdXRpbF8xLmdldERlZmF1bHRQcm9tcHQpKHByb3BzLmZvbGxvd1VwRGF0YS5rZXlXb3JkKTtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlTWVudUl0ZW1DbGljayhwKTtcbiAgICAgICAgICAgICAgICB9IH0sIFwiRGVmYXVsdFwiKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFByb21wdEJ1dHRvbiwgeyBkaXNhYmxlOiAhKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSwgaGFuZGxlTWVudUl0ZW1DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfor43lhbgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdkaWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFVuc3BsYXNoSW1hZ2VzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlclByb21wdDogJycsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZU1lbnVJdGVtQ2xpY2socCk7XG4gICAgICAgICAgICAgICAgfSB9LCBcIlxcdThCQ0RcXHU1MTc4XCIpLFxuICAgICAgICAgICAgcHJvcHMucHJvbXB0TGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVNZW51SXRlbUNsaWNrKGl0ZW0pfT57aXRlbS50aXRsZX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvbXB0QnV0dG9uLCB7IGtleTogaXRlbS5pZCwgZGlzYWJsZTogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCksIGhhbmRsZU1lbnVJdGVtQ2xpY2s6ICgpID0+IGhhbmRsZU1lbnVJdGVtQ2xpY2soaXRlbSkgfSwgaXRlbS50aXRsZSk7XG4gICAgICAgICAgICB9KSkpKTtcbn1cbmV4cG9ydHMuUHJvbXB0TGlzdCA9IFByb21wdExpc3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUmVnZW5lcmF0ZUJ1dHRvbiA9IHZvaWQgMDtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xuZnVuY3Rpb24gUmVnZW5lcmF0ZUJ1dHRvbihwcm9wcykge1xuICAgIGNvbnN0IGxhc3RNZXNzYWdlID0gcHJvcHMubWVzc2FnZXNbcHJvcHMubWVzc2FnZXMubGVuZ3RoIC0gMV07XG4gICAgLy8gY29uc29sZS5sb2coJ2xhc3RNZXNzYWdlOicpO1xuICAgIC8vIGNvbnNvbGUubG9nKGxhc3RNZXNzYWdlKTtcbiAgICBjb25zdCBsYXN0TWVzc2FnZVN0YXR1cyA9IGxhc3RNZXNzYWdlID8gbGFzdE1lc3NhZ2UuY29udGVudFtsYXN0TWVzc2FnZS5jb250ZW50Lmxlbmd0aCAtIDFdLnN0YXR1cyA6ICdiZWdpbic7XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBwcm9wcy5tZXNzYWdlcy5sZW5ndGggPj0gMSAmJiAobGFzdE1lc3NhZ2VTdGF0dXMgPT09ICdpbnZhbGlkX2FwaV9rZXknIHx8IGxhc3RNZXNzYWdlU3RhdHVzID09PSAnZG9uZScpICYmXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzEzLjJweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJzYwcHgnLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogJzE4cHgnLFxuICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICcwIDZweCAxNnB4IDAgcmdiYSgwLCAwLCAwLCAwLjA4KSwgMCAzcHggNnB4IC00cHggcmdiYSgwLCAwLCAwLCAwLjEyKSwgMCA5cHggMjhweCA4cHggcmdiYSgwLCAwLCAwLCAwLjA1KSdcbiAgICAgICAgICAgICAgICB9LCBzaXplOiAnc21hbGwnLCBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BzLmhhbmRsZVJlZ2VuZXJhdGVCdXR0b25DbGljaygpO1xuICAgICAgICAgICAgICAgIH0gfSwgXCJSZWdlbmVyYXRlXCIpKSkpO1xufVxuZXhwb3J0cy5SZWdlbmVyYXRlQnV0dG9uID0gUmVnZW5lcmF0ZUJ1dHRvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNlbGVjdGlvbiA9IHZvaWQgMDtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IGxvY2FsZV8xID0gcmVxdWlyZShcIi4uL2xpYi9sb2NhbGVcIik7XG5jb25zdCBsYW5nXzEgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG5jb25zdCBpY29uc18xID0gcmVxdWlyZShcIkBhbnQtZGVzaWduL2ljb25zXCIpO1xuLy8gY29uc3QgdXNlU3R5bGVzID0gY3JlYXRlVXNlU3R5bGVzKHtcbi8vICAgbW9yZUJ1dHRvbjoge1xuLy8gICAgIGNvbG9yOiAnI0YwOEEyNCcsXG4vLyAgICAgXCImOmhvdmVyXCI6IHtcbi8vICAgICAgIGNvbG9yOiAncmVkJ1xuLy8gICAgIH1cbi8vICAgfSxcbi8vIH0pXG5jb25zdCBzdHlsZSA9IGBcbiAgI1Njb3V0ZXJTZWxlY3Rpb24+c3BhbiB7XG4gICAgZm9udC1zaXRlOjEycHg7XG4gICAgY29sb3I6IzY2NjtcbiAgfVxuICAubW9yZUJ1dHRvbiB7XG4gICAgY29sb3I6ICNGMDhBMjQ7XG4gICAgY3Vyc29yOnBvaW50ZXI7XG4gICAgbWFyZ2luOjBweCAycHg7XG4gIH1cbiAgLm1vcmVCdXR0b246aG92ZXIge1xuICAgIG9wYWNpdHk6MC44O1xuICB9XG5cbmA7XG5mdW5jdGlvbiBTZWxlY3Rpb24ocHJvcHMpIHtcbiAgICBjb25zdCBbdGFyZ2V0TGFuZ3VhZ2UsIHNldFRhcmdldExhbmd1YWdlXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgnRW5nbGlzaCcpO1xuICAgIGNvbnN0IFtzaG93RnVsbFRleHQsIHNldFNob3dGdWxsVGV4dF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkodHJ1ZSk7XG4gICAgY29uc3QgW3BsYXlTdGF0dXMsIHNldFBsYXlTdGF0dXNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBsYXN0U3BlYWtUaW1lID0gKDAsIHJlYWN0XzEudXNlUmVmKShNYXRoLmZsb29yKERhdGUubm93KCkpKTtcbiAgICAvLyDojrflj5bnlKjmiLforr7nva7nmoTor63oqIDkv6Hmga9cbiAgICBsZXQgTGFuZyA9ICgwLCBsb2NhbGVfMS51c2VDdXJyZW50TGFuZ3VhZ2UpKCk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIHNldFRhcmdldExhbmd1YWdlKExhbmdbJ3RhcmdldCddWydpZCddKTtcbiAgICAgICAgc2V0U2hvd0Z1bGxUZXh0KHByb3BzLnRleHQubGVuZ3RoIDw9IDE0MCk7XG4gICAgICAgIHNldFBsYXlTdGF0dXMoZmFsc2UpO1xuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2Uub25DaGFuZ2VkLmFkZExpc3RlbmVyKG9uU3RvcmFnZUNoYW5nZSk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2Uub25DaGFuZ2VkLnJlbW92ZUxpc3RlbmVyKG9uU3RvcmFnZUNoYW5nZSk7XG4gICAgICAgIH07XG4gICAgfSwgW3Byb3BzLnRleHRdKTtcbiAgICAvLyDor63pn7Pmkq3miqVcbiAgICBjb25zdCBzcGVha2VyID0gKCkgPT4ge1xuICAgICAgICAvLyDor4bliKvor63oqIBcbiAgICAgICAgLy8gY29uc3QgbG5nRGV0ZWN0b3IgPSBuZXcgTGFuZ3VhZ2VEZXRlY3QoKTtcbiAgICAgICAgLy8gbG5nRGV0ZWN0b3Iuc2V0TGFuZ3VhZ2VUeXBlKCdpc28yJylcbiAgICAgICAgLy8gY29uc29sZS5sb2cobG5nRGV0ZWN0b3IuZGV0ZWN0KHByb3BzLnRleHQsIDIpKTtcbiAgICAgICAgaWYgKE1hdGguZmxvb3IoRGF0ZS5ub3coKSkgLSBsYXN0U3BlYWtUaW1lLmN1cnJlbnQgPCAxMDAwKSB7XG4gICAgICAgICAgICAvLyB4IOavq+enkuWGheWPquWPr+eCueWHu+S4gOasoVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAoMCwgdXRpbF8xLnBsYXlUZXh0VG9TcGVlY2gpKHByb3BzLnRleHQsIGxhbmdfMS5sYW5ndWFnZUNvZGVzW3RhcmdldExhbmd1YWdlXSwgdGFyZ2V0TGFuZ3VhZ2UpO1xuICAgICAgICAgICAgLy8gdGV4dFRvU3BlZWNoRG93bmxvYWQocHJvcHMudGV4dCwgbGFuZ3VhZ2VDb2Rlc1t0YXJnZXRMYW5ndWFnZSBhcyBrZXlvZiB0eXBlb2YgbGFuZ3VhZ2VDb2Rlc10pXG4gICAgICAgICAgICBsYXN0U3BlYWtUaW1lLmN1cnJlbnQgPSBNYXRoLmZsb29yKERhdGUubm93KCkpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8g5pqC5YGc5LiK5LiA5qyh5pKt5oql5Lu75YqhXG4gICAgICAgICAgICBzcGVlY2hTeW50aGVzaXMuY2FuY2VsKCk7XG4gICAgICAgICAgICBjb25zdCB1dHRlcmFuY2UgPSBuZXcgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKHByb3BzLnRleHQpO1xuICAgICAgICAgICAgLy8g6K+t56eNXG4gICAgICAgICAgICB1dHRlcmFuY2UubGFuZyA9IGxhbmdfMS5sYW5ndWFnZUNvZGVzW3RhcmdldExhbmd1YWdlXTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGxhbmd1YWdlQ29kZXNbdGFyZ2V0TGFuZ3VhZ2UgYXMga2V5b2YgdHlwZW9mIGxhbmd1YWdlQ29kZXNdKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRhcmdldExhbmd1YWdlKTtcbiAgICAgICAgICAgIC8vIOivremAn1xuICAgICAgICAgICAgaWYgKHBsYXlTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAvLyDln7rmlbDmrKHmkq3mlL7ml7bph4fnlKjmhaLpgJ/mkq3mlL7vvIzorqnnlKjmiLflj6/ku6XlkKznmoTmm7TmuIXmpZpcbiAgICAgICAgICAgICAgICB1dHRlcmFuY2UucmF0ZSA9IDAuNjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHV0dGVyYW5jZS5yYXRlID0gMC44NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFBsYXlTdGF0dXMoIXBsYXlTdGF0dXMpO1xuICAgICAgICAgICAgLy8g5byA5pKt5ZCnXG4gICAgICAgICAgICBzcGVlY2hTeW50aGVzaXMuc3BlYWsodXR0ZXJhbmNlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhbXBsaXR1ZGUudHJhY2soJ3NwZWFrJyk7XG4gICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAnc3BlYWsnIH0pO1xuICAgIH07XG4gICAgY29uc3Qgb25TdG9yYWdlQ2hhbmdlID0gKGNoYW5nZXMsIGFyZWEpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2hhbmdlcyk7XG4gICAgICAgIC8vIOabtOaWsOebruagh+ivreiogFxuICAgICAgICBpZiAoJ3RhcmdldExhbmd1YWdlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY2hhbmdlcycpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY2hhbmdlc1sndGFyZ2V0TGFuZ3VhZ2UnXVsnbmV3VmFsdWUnXSk7XG4gICAgICAgICAgICBzZXRUYXJnZXRMYW5ndWFnZShjaGFuZ2VzWyd0YXJnZXRMYW5ndWFnZSddWyduZXdWYWx1ZSddKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlVG9nZ2xlU2hvd0Z1blRleHQgPSAoKSA9PiB7XG4gICAgICAgIHNldFNob3dGdWxsVGV4dCghc2hvd0Z1bGxUZXh0KTtcbiAgICB9O1xuICAgIC8vIGNvbnN0IGNsYXNzZXMgPSB1c2VTdHlsZXMoKVxuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIsIG51bGwsIHN0eWxlKSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBpZDogXCJTY291dGVyU2VsZWN0aW9uXCIsIGNsYXNzTmFtZTogJycsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgbWFyZ2luVG9wOiAnMThweCcsXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzEuNSdcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHNob3dGdWxsVGV4dCA/IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgcHJvcHMudGV4dCksXG4gICAgICAgICAgICAgICAgcHJvcHMudGV4dC5sZW5ndGggPiAxNDAgJiYgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgY2xhc3NOYW1lOiAnbW9yZUJ1dHRvbicsIG9uQ2xpY2s6IGhhbmRsZVRvZ2dsZVNob3dGdW5UZXh0IH0sIFwiTGVzc1wiKSlcbiAgICAgICAgICAgICAgICA6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHByb3BzLnRleHQuc3Vic3RyaW5nKDAsIDE0MCkgKyAnLi4uJyksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGNsYXNzTmFtZTogJ21vcmVCdXR0b24nLCBvbkNsaWNrOiBoYW5kbGVUb2dnbGVTaG93RnVuVGV4dCB9LCBcIk1vcmVcIikpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJzJweCdcbiAgICAgICAgICAgICAgICB9LCBzaXplOiBcInNtYWxsXCIsIHR5cGU6IFwidGV4dFwiLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkN1c3RvbWVyU2VydmljZU91dGxpbmVkLCBudWxsKSwgb25DbGljazogc3BlYWtlciB9KSkpKTtcbn1cbmV4cG9ydHMuU2VsZWN0aW9uID0gU2VsZWN0aW9uO1xuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVXNlck1lc3NhZ2VJbnB1dCA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgaWNvbnNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9pY29uc1wiKTtcbmNvbnN0IHJlYWN0X3NwcmluZ18xID0gcmVxdWlyZShcInJlYWN0LXNwcmluZ1wiKTtcbmNvbnN0IHsgVGV4dEFyZWEgfSA9IGFudGRfMS5JbnB1dDtcbmZ1bmN0aW9uIFVzZXJNZXNzYWdlSW5wdXQocHJvcHMpIHtcbiAgICBjb25zdCBsYXN0TWVzc2FnZSA9IHByb3BzLm1lc3NhZ2VzW3Byb3BzLm1lc3NhZ2VzLmxlbmd0aCAtIDFdO1xuICAgIC8vIGNvbnN0IGxhc3RNZXNzYWdlU3RhdHVzID0gbGFzdE1lc3NhZ2UuY29udGVudFtsYXN0TWVzc2FnZS5jb250ZW50Lmxlbmd0aCAtIDFdLnN0YXR1c1xuICAgIGNvbnN0IFtmb3JtXSA9IGFudGRfMS5Gb3JtLnVzZUZvcm0oKTtcbiAgICBjb25zdCBbaXNBbnN3ZXJJbnB1dGVkLCBzZXRJc0Fuc3dlcklucHV0ZWRdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICAvLyDmlofmnKzmoYbkuIvmlbLlh7vmjInplK7ml7ZcbiAgICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIC8vIOmYu+atouS6i+S7tuWGkuazoVxuICAgICAgICAvLyBjb25zb2xlLmxvZygnaGFuZGxlS2V5RG93bicpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzICYmICFldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgY29uc3QgY29udGVudHMgPSBwcm9wcy5tZXNzYWdlc1twcm9wcy5tZXNzYWdlcy5sZW5ndGggLSAxXVsnY29udGVudCddO1xuICAgICAgICAgICAgLy8g5pWy5Ye75Zue6L2m6ZSuXG4gICAgICAgICAgICBpZiAocHJvcHMubWVzc2FnZXMubGVuZ3RoID09PSAwIHx8IChjb250ZW50c1tjb250ZW50cy5sZW5ndGggLSAxXVsnc3RhdHVzJ10gIT09ICdiZWdpbicgfHwgY29udGVudHNbY29udGVudHMubGVuZ3RoIC0gMV1bJ3N0YXR1cyddICE9PSAncHJvY2VzcycpICYmIGlzQW5zd2VySW5wdXRlZCkge1xuICAgICAgICAgICAgICAgIC8vIOmdnuWKoOi9veeKtuaAgeOAgUdQVCDmtojmga/lj5HpgIHlrozmr5Xml7bnlKjmiLflj6/lj5HpgIHmtojmga9cbiAgICAgICAgICAgICAgICBoYW5kbGVTZW5kTWVzc2FnZSh7ICdtc2cnOiBldmVudC50YXJnZXQudmFsdWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyDmlofmnKzmoYblgLzlj5jljJbml7ZcbiAgICBjb25zdCBvblRleHRBcmVhSW5wdXQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzZXRJc0Fuc3dlcklucHV0ZWQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXRJc0Fuc3dlcklucHV0ZWQoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVTZW5kTWVzc2FnZSA9ICh2YWx1ZXMpID0+IHtcbiAgICAgICAgLy8g5riF56m65paH5pys5qGGXG4gICAgICAgIGZvcm0ucmVzZXRGaWVsZHMoKTtcbiAgICAgICAgLy8g56aB55So5Y+R6YCB5oyJ6ZKuXG4gICAgICAgIHNldElzQW5zd2VySW5wdXRlZChmYWxzZSk7XG4gICAgICAgIC8vIOaJp+ihjOWPkea2iOaBr+S6i+S7tlxuICAgICAgICBwcm9wcy5oYW5kbGVTZW5kTWVzc2FnZSh2YWx1ZXMubXNnKTtcbiAgICB9O1xuICAgIC8vIGNvbnN0IEFuaW1hdGVkQnV0dG9uID0gYW5pbWF0ZWQoQnV0dG9uKTtcbiAgICBjb25zdCBhbmltYXRpb25TdHlsZSA9ICgwLCByZWFjdF9zcHJpbmdfMS51c2VTcHJpbmcpKHtcbiAgICAgICAgZnJvbTogeyB0cmFuc2Zvcm06ICdyb3RhdGUoMGRlZyknIH0sXG4gICAgICAgIHRvOiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgzNjBkZWcpJyB9LFxuICAgICAgICBjb25maWc6IHsgZHVyYXRpb246IDEwMDAgfSxcbiAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgd2lkdGg6ICczMnB4JyxcbiAgICAgICAgaGVpZ2h0OiAnMzJweCcsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCByZWQnXG4gICAgfSk7XG4gICAgY29uc3QgbGFzdFN0YXR1cyA9IGxhc3RNZXNzYWdlID8gbGFzdE1lc3NhZ2UuY29udGVudFtsYXN0TWVzc2FnZS5jb250ZW50Lmxlbmd0aCAtIDFdLnN0YXR1cyA6ICdiZWdpbic7XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ3ctZnVsbCcsIHN0eWxlOiB7IGJvcmRlclRvcDogJzFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNiknIH0gfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0sIHsgZm9ybTogZm9ybSwgb25GaW5pc2g6IGhhbmRsZVNlbmRNZXNzYWdlLCBcbiAgICAgICAgICAgIC8vIG9uS2V5RG93bj17aGFuZGxlRm9ybUtleURvd259XG4gICAgICAgICAgICBsYXlvdXQ6ICdpbmxpbmUnLCBzdHlsZTogeyBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9LCBjbGFzc05hbWU6ICdwLTInIH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwibXNnXCIsIHN0eWxlOiB7IG1hcmdpbjogJzAnLCBmbGV4R3JvdzogJzEnIH0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwgeyBwbGFjZWhvbGRlcjogXCJTZW5kIGEgbWVzc2FnZVwiLCBib3JkZXJlZDogZmFsc2UsIGF1dG9TaXplOiB7IG1pblJvd3M6IDEsIG1heFJvd3M6IDIgfSwgXG4gICAgICAgICAgICAgICAgICAgIC8vIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0Q29sb3I6ICcjRjA4QTI0JyxcbiAgICAgICAgICAgICAgICAgICAgfSwgb25LZXlEb3duOiBoYW5kbGVLZXlEb3duLCBvbklucHV0OiBvblRleHRBcmVhSW5wdXQgfSkpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBzdHlsZTogeyBtYXJnaW5SaWdodDogJzAnIH0gfSwgcHJvcHMubWVzc2FnZXMubGVuZ3RoID09PSAwIHx8IGxhc3RTdGF0dXMgIT09ICdiZWdpbicgJiYgbGFzdFN0YXR1cyAhPT0gJ3Byb2Nlc3MnID9cbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHR5cGU6IFwidGV4dFwiLCBodG1sVHlwZTogXCJzdWJtaXRcIiwgZGlzYWJsZWQ6IHByb3BzLm1lc3NhZ2VzLmxlbmd0aCA+IDAgPyBsYXN0U3RhdHVzID09PSAnYmVnaW4nIHx8IGxhc3RTdGF0dXMgPT09ICdwcm9jZXNzJyB8fCAhaXNBbnN3ZXJJbnB1dGVkIDogZmFsc2UsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbG9yOiAhaXNMb2FkaW5nICYmIGlzQW5zd2VySW5wdXRlZCA/ICcjRjA4QTI0JyA6ICcnXG4gICAgICAgICAgICAgICAgICAgIH0sIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuU2VuZE91dGxpbmVkLCBudWxsKSB9KSA6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgbWFyZ2luUmlnaHQ6ICc4cHgnIH0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF9zcHJpbmdfMS5hbmltYXRlZC5kaXYsIHsgc3R5bGU6IGFuaW1hdGlvblN0eWxlIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuTG9hZGluZ091dGxpbmVkLCBudWxsKSkpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgc3R5bGU6IHsgbWFyZ2luOiAnMCcgfSB9KSkpKTtcbn1cbmV4cG9ydHMuVXNlck1lc3NhZ2VJbnB1dCA9IFVzZXJNZXNzYWdlSW5wdXQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlBvcHVwQ2FyZCA9IHZvaWQgMDtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgY29udGVudFNjcmlwdF8xID0gcmVxdWlyZShcIi4uL2NvbnRlbnRTY3JpcHRcIik7XG5jb25zdCBOYXZfMSA9IHJlcXVpcmUoXCIuLi9Db21wb25lbnRzL05hdlwiKTtcbmNvbnN0IEN1c3RvbVByb21wdEZvcm1fMSA9IHJlcXVpcmUoXCIuLi9Db21wb25lbnRzL0N1c3RvbVByb21wdEZvcm1cIik7XG5jb25zdCBNZXNzYWdlXzEgPSByZXF1aXJlKFwiLi9NZXNzYWdlXCIpO1xuY29uc3QgUHJvbXB0TGlzdF8xID0gcmVxdWlyZShcIi4vUHJvbXB0TGlzdFwiKTtcbmNvbnN0IFJlZ2VuZXJhdGVCdXR0b25fMSA9IHJlcXVpcmUoXCIuL1JlZ2VuZXJhdGVCdXR0b25cIik7XG5jb25zdCBVc2VyTWVzc2FnZUlucHV0XzEgPSByZXF1aXJlKFwiLi9Vc2VyTWVzc2FnZUlucHV0XCIpO1xuY29uc3QgU2VsZWN0aW9uXzEgPSByZXF1aXJlKFwiLi9TZWxlY3Rpb25cIik7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IGxvY2FsZV8xID0gcmVxdWlyZShcIi4uL2xpYi9sb2NhbGVcIik7XG5jb25zdCB1c2VySW5mb18xID0gcmVxdWlyZShcIi4uL2xpYi91c2VySW5mb1wiKTtcbmNvbnN0IGxhbmdfMSA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5jb25zdCBzdHlsZWRfY29tcG9uZW50c18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKSk7XG5sZXQgY3VycmVudExhbmd1YWdlO1xubGV0IHRhcmdldExhbmd1YWdlO1xuLy8g6I635Y+WIEFua2kg5Y2h54mH77yM55So5LqO57yW5YaZ5pWF5LqLXG5sZXQgYW5raUNhcmRzO1xuKDAsIHV0aWxfMS5nZXRBbmtpQ2FyZHMpKCkudGhlbigoY2FyZHMpID0+IHtcbiAgICBhbmtpQ2FyZHMgPSBjYXJkcztcbn0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKGVycm9yKTtcbn0pO1xuLy8g5Yid5aeL5YyWIEFua2kg55qEIE1vZGVs77yM5Li65ZCO57ut5a+85YWl5YiwIEFua2kg5o+Q6YCfXG5jb25zdCB7IFRleHRBcmVhIH0gPSBhbnRkXzEuSW5wdXQ7XG4vLyBjb25zdCBBbmtpQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQobnVsbCk7XG5jb25zdCBTY291dGVyRGl2ID0gc3R5bGVkX2NvbXBvbmVudHNfMS5kZWZhdWx0LmRpdiBgXG5cbmxlZnQ6MTA7XG50b3A6MTA7XG5cbmZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xud2lkdGg6IDM5MHB4O1xuaGVpZ2h0OiA1NjBweDtcbmNvbG9yOiByZ2IoMCAwIDAgLyA4MCUpO1xucG9zaXRpb246IGZpeGVkO1xuZGlzcGxheTogZmxleDtcbmZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5mb250LXNpemU6IDEzLjJweDtcbmJhY2tncm91bmQtY29sb3I6ICNmZmY7XG56LWluZGV4OiA5OTk7XG5vdmVyZmxvdzogaGlkZGVuO1xuYm94LXNoYWRvdzogMHB4IDhweCAyOHB4IHJnYmEoMCwwLDAsLjE2KTtcbmJvcmRlci1yYWRpdXM6IDZweDtcbmJvcmRlcjoxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMDYpXG5cbmgxLGgyLGgye1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuaDEge1xuICBmb250LXNpemU6MjBweDtcbn1cblxuaDIge1xuICBmb250LXNpemU6MTdweDtcbn1cblxuYDtcbmZ1bmN0aW9uIFBvcHVwQ2FyZChwcm9wcykge1xuICAgIC8vIGNvbnN0IFttZXNzYWdlcywgc2V0TWVzc2FnZXNdID0gdXNlU3RhdGU8QXJyYXk8eyBjb250ZW50OiBzdHJpbmcsIHJvbGU6IHN0cmluZywgbG9hZGluZzogYm9vbGVhbiwgY2hhdElkOiBzdHJpbmcsIHByb21wdDogc3RyaW5nLCBzdGF0dXM6IHN0cmluZyB9Pj4oW3sgJ2NvbnRlbnQnOiAnJywgJ3JvbGUnOiAndXNlcicsICdsb2FkaW5nJzogZmFsc2UsICdjaGF0SWQnOiAnJywgJ3Byb21wdCc6ICcnLCAnc3RhdHVzJzogJycgfV0pXG4gICAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoW3tcbiAgICAgICAgICAgICdjb250ZW50JzogW3tcbiAgICAgICAgICAgICAgICAgICAgJ3N0YXR1cyc6ICdiZWdpbicsXG4gICAgICAgICAgICAgICAgICAgICdjaGF0SWQnOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQnOiAnJ1xuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgJ3JvbGUnOiAndXNlcicsXG4gICAgICAgICAgICAncHJvbXB0JzogJycsXG4gICAgICAgICAgICAnc2hvd0ltYWdlc0JveCc6IHRydWUsXG4gICAgICAgICAgICAnaW1hZ2VzJzogW11cbiAgICAgICAgfV0pO1xuICAgIGNvbnN0IFtwcm9tcHRzLCBzZXRQcm9tcHRzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShbXSk7XG4gICAgY29uc3QgW2xhc3RFeGVjdXRlZFByb21wdCwgc2V0TGFzdEV4ZWN1dGVkUHJvbXB0XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7ICd0aXRsZSc6ICfwn5GJ8J+PvCBQbGVhc2UgY2hvb3NlIGEgcHJvbXB0JywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZmFsc2UsICd1c2VyUHJvbXB0JzogJycsICdpZCc6ICcnIH0pO1xuICAgIGNvbnN0IFtpc09wZW5NZW51LCBzZXRJc09wZW5NZW51XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgLy8g6KGo56S6IEdQVCDnlJ/miJDnmoTmloflrZfmlbDmja7mraPlnKjliqDovb3kuK1cbiAgICAvLyBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gICAgY29uc3QgW2lzUG9wb3Zlck9wZW4sIHNldFBvcG92ZXJPcGVuXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3QgW2N1c3RvbVByb21wdEZvcm1EYXRhLCBzZXRDdXN0b21Qcm9tcHRGb3JtRGF0YV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoeyAndGl0bGUnOiAnJywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZmFsc2UsICd1c2VyUHJvbXB0JzogJycsICdpZCc6ICcnIH0pO1xuICAgIC8vIHN0YW5kYnksbm9ybWFsLGxvYWRpbmcsc3VjY2Vzc1xuICAgIGNvbnN0IFthZGRUb0Fua2lTdGF0dXMsIHNldEFkZFRvQW5raVN0YXR1c10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pO1xuICAgIC8vIGNvbnN0IFtpc0Fuc3dlckRvbmUsIHNldEFuc3dlckRvbmVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtmb2xsb3dVcERhdGEsIHNldEZvbGxvd1VwRGF0YV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoeyBrZXlXb3JkOiAnJywgc2VudGVuY2U6ICcnIH0pO1xuICAgIGNvbnN0IFtzaG93Rm9sbG93VXBEYXRhTWVudSwgc2V0U2hvd0ZvbGxvd1VwRGF0YU1lbnVdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHsgc2hvdzogZmFsc2UsIHN0eWxlOiB7fSB9KTtcbiAgICBjb25zdCBbaXNBcGlFcnJvLCBzZXRJc0FwaUVycm9dID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICAvLyBjb25zdCBbaXNBbnN3ZXJJbnB1dGVkLCBzZXRJc0Fuc3dlcklucHV0ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIC8vIOeql+WPo+aLluaLvemAu+i+kVxuICAgIGNvbnN0IFtkcmFnZ2luZywgc2V0RHJhZ2dpbmddID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCB3aW5kb3dFbGVtZW50ID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICBjb25zdCBtZXNzYWdlc0xpc3QgPSAoMCwgcmVhY3RfMS51c2VSZWYpKG51bGwpO1xuICAgIGNvbnN0IHNob3VsZFN0YXlBdEJvdHRvbVJlZiA9ICgwLCByZWFjdF8xLnVzZVJlZikoZmFsc2UpO1xuICAgIC8vIGNvbnN0IHVzZXJJbmZvUmVmID0gdXNlUmVmKCk7XG4gICAgY29uc3QgbGFzdFByb21wdFJlZiA9ICgwLCByZWFjdF8xLnVzZVJlZikoKTtcbiAgICBjb25zdCBbZm9ybV0gPSBhbnRkXzEuRm9ybS51c2VGb3JtKCk7XG4gICAgLy8g5L2/55So6ZW/6L+e5o6lXG4gICAgbGV0IHBvcnQgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgICAgIG5hbWU6ICdnZXRHUFQnXG4gICAgfSk7XG4gICAgY29uc3QgdXNlckluZm8gPSAoMCwgdXNlckluZm9fMS51c2VVc2VySW5mb0NvbnRleHQpKCk7XG4gICAgbGV0IExhbmcgPSAoMCwgbG9jYWxlXzEudXNlQ3VycmVudExhbmd1YWdlKSgpO1xuICAgIGN1cnJlbnRMYW5ndWFnZSA9IExhbmdbJ2N1cnJlbnQnXVsnbmFtZSddO1xuICAgIHRhcmdldExhbmd1YWdlID0gTGFuZ1sndGFyZ2V0J11bJ25hbWUnXTtcbiAgICAvLyBjb25zdCB1c2VySW5mbyA9IHVzZVVzZXJJbmZvQ29udGV4dCgpXG4gICAgLy8g5o6n5Yi26L+96Zeu6I+c5Y2VXG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgcG9ydCA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5jb25uZWN0KHtcbiAgICAgICAgICAgIG5hbWU6ICdmcm9tUG9wdXBDYXJkJ1xuICAgICAgICB9KTtcbiAgICAgICAgcG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1zZykgPT4ge1xuICAgICAgICAgICAgaWYgKG1zZy50eXBlID09PSBcIlVQREFURV9QT1BVUF9DQVJEXCIpIHtcbiAgICAgICAgICAgICAgICAvLyDmmL7npLogUHJvbXB0IOiPnOWNlVxuICAgICAgICAgICAgICAgIHNldEZvbGxvd1VwRGF0YShtc2cucGF5bG9hZC5mb2xsb3dVcERhdGEpO1xuICAgICAgICAgICAgICAgIC8v6K6+572u6I+c5Y2V55qE5L2N572uXG4gICAgICAgICAgICAgICAgc2V0U2hvd0ZvbGxvd1VwRGF0YU1lbnUocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IG1zZy5wYXlsb2FkLnN0eWxlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgKF9hID0gd2luZG93RWxlbWVudC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2FyZENsaWNrKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1c2VFZmZlY3QgcmV0dXJuJyk7XG4gICAgICAgICAgICAoX2EgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDYXJkQ2xpY2spO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGVQb3B1cENhcmRDbGljaygpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzaG93Rm9sbG93VXBEYXRhTWVudS5zaG93KSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFNob3dGb2xsb3dVcERhdGFNZW51KHByZXYgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld0RhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgfVxuICAgIH0sIFtzaG93Rm9sbG93VXBEYXRhTWVudV0pO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAvLyDmuLLmn5MgUHJvbXB0IOWIl+ihqFxuICAgICAgICBpbml0aWFsaXplUHJvbXB0TGlzdCgpO1xuICAgICAgICBpZiAocHJvcHMucnVuUHJvbXB0IHx8IHByb3BzLnJ1blByb21wdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyDojrflj5bmnIDov5HkuIDmrKHmiafooYznmoQgUHJvbXB0XG4gICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuZ2V0KHsgXCJsYXN0RXhlY3V0ZWRQcm9tcHRcIjogJycgfSkudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxhc3RFeGVjdXRlZFByb21wdCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5omn6KGM6buY6K6kIFByb21wdOOAgeiOt+WPliBVbnNwbGFzaCDlm77niYdcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9ybXB0ID0gKDAsIHV0aWxfMS5nZXREZWZhdWx0UHJvbXB0KShwcm9wcy5kYXRhLmtleVdvcmQpO1xuICAgICAgICAgICAgICAgICAgICBleGVjdXRpdmVQcm9tcHQocG9ybXB0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOaJp+ihjCBQcm9tcHTjgIHojrflj5YgVW5zcGxhc2gg5Zu+54mHXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmxhc3RFeGVjdXRlZFByb21wdC5pZCA9PT0gXCJEZWZhdWx0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvcm1wdCA9ICgwLCB1dGlsXzEuZ2V0RGVmYXVsdFByb21wdCkocHJvcHMuZGF0YS5rZXlXb3JkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWN1dGl2ZVByb21wdChwb3JtcHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhlY3V0aXZlUHJvbXB0KGl0ZW0ubGFzdEV4ZWN1dGVkUHJvbXB0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8g5LiN5omn6KGM5Lu75L2VIFByb21wdO+8jOeUseeUqOaIt+iHquihjOmAieaLqVxuICAgICAgICAgICAgZXhlY3V0aXZlUHJvbXB0KHsgJ3RpdGxlJzogJ0RlZmF1bHQnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiB0cnVlLCAndXNlclByb21wdCc6IGBXb3JkOlwie3trZXlXb3JkfX1cIiwgc2VudGVuY2U6IFwie3tzZW50ZW5jZX19XCJgLCAnaWQnOiAnRGVmYXVsdCcgfSwgJ25vJyk7XG4gICAgICAgICAgICBzZXRJc09wZW5NZW51KHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOiuvue9rueql+WPo+eahOm7mOiupOS9jee9ruOAgea3u+WKoOa7muWKqOS6i+S7tu+8jOiuqea2iOaBr+WIl+ihqOiHquWKqOa7muWKqOWIsOW6lemDqFxuICAgICAgICAoMCwgdXRpbF8xLndpbmRvd0luaXRpYWxpemF0aW9uKSh7ICdpc1Bpbic6IHByb3BzLmlzUGluLCAnd2luZG93RWxlbWVudCc6IHdpbmRvd0VsZW1lbnQsICdzZWxlY3Rpb24nOiBwcm9wcy5zZWxlY3Rpb24sICdtZXNzYWdlc0xpc3QnOiBtZXNzYWdlc0xpc3QgfSk7XG4gICAgfSwgW3Byb3BzLmRhdGEua2V5V29yZF0pO1xuICAgIC8vIOiBiuWkqeiusOW9leaUueWPmOaXtlxuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAvLyDorrDlvZXlvZPliY3liJfooajnmoTkvY3nva5cbiAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQuY3VycmVudCkge1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2luZG93RWxlbWVudC5jdXJyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250YWluZXInKVswXTtcbiAgICAgICAgICAgIHNob3VsZFN0YXlBdEJvdHRvbVJlZi5jdXJyZW50ID0gY29udGFpbmVyLnNjcm9sbEhlaWdodCAtIGNvbnRhaW5lci5zY3JvbGxUb3AgPD0gY29udGFpbmVyLmNsaWVudEhlaWdodCArIDIwO1xuICAgICAgICAgICAgY29uc3QgY29udGVudExlbmd0aCA9IG1lc3NhZ2VzLmxlbmd0aCA+IDAgPyBtZXNzYWdlc1ttZXNzYWdlcy5sZW5ndGggLSAxXS5jb250ZW50Lmxlbmd0aCA6IDA7XG4gICAgICAgICAgICAvLyDoh6rliqjmu5rliqjliLDmtojmga/lupXpg6jvvIzmlrnkvr/nnIvliLDmnIDmlrDnmoTmloflrZdcbiAgICAgICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2VzW21lc3NhZ2VzLmxlbmd0aCAtIDFdLmNvbnRlbnRbY29udGVudExlbmd0aCAtIDFdLnN0YXR1cyA9PT0gJ3Byb2Nlc3MnIHx8IG1lc3NhZ2VzW21lc3NhZ2VzLmxlbmd0aCAtIDFdLmNvbnRlbnRbY29udGVudExlbmd0aCAtIDFdLnN0YXR1cyA9PT0gJ2JlZ2luJykge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb0JvdHRvbSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvQm90dG9tKHNob3VsZFN0YXlBdEJvdHRvbVJlZi5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgLy8gICBpZiAoY29udGFpbmVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGNoZWNrSWZTaG91bGRTdGF5QXRCb3R0b20pO1xuICAgICAgICAgICAgLy8gICB9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICAgICAgLy8g5L+d5a2Y5Y6G5Y+y6K6w5b2V77yM5Y+q5L+d55WZ5raI5oGv6K6w5b2V55qE56ysIDEg5p2h77yM5aaC5p6c6L+Z5p2h5raI5aSx5piv6ZSZ6K+v5o+Q56S677yM5YiZ5LiN5L+d5a2YXG4gICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPT09IDEgJiYgbWVzc2FnZXNbMF1bJ2NvbnRlbnQnXVswXVsnc3RhdHVzJ10gPT09ICdkb25lJykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1NhdmUnKTtcbiAgICAgICAgICAgIGNvbnN0IGtleVdvcmQgPSBwcm9wcy5kYXRhLmtleVdvcmQ7XG4gICAgICAgICAgICBjb25zdCBTZW50ZW5jZSA9IHByb3BzLmRhdGEuU2VudGVuY2U7XG4gICAgICAgICAgICAvLyDlsIbmn6Xor6LorrDlvZXkv53lrZjotbfmnaVcbiAgICAgICAgICAgIGNvbnN0IG5ld0hpc3RvcnkgPSB7XG4gICAgICAgICAgICAgICAgJ2tleVdvcmQnOiBrZXlXb3JkLFxuICAgICAgICAgICAgICAgICdzZW50ZW5jZSc6IFNlbnRlbmNlLFxuICAgICAgICAgICAgICAgICdyb2xlJzogbWVzc2FnZXNbMF1bJ3JvbGUnXSxcbiAgICAgICAgICAgICAgICAnYW5zd2VyJzogbWVzc2FnZXNbMF1bJ2NvbnRlbnQnXVttZXNzYWdlc1swXVsnY29udGVudCddLmxlbmd0aCAtIDFdWydjb250ZW50J10sXG4gICAgICAgICAgICAgICAgJ3NvdXJjZSc6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgICAgICdwcm9tcHQnOiBtZXNzYWdlc1swXVsncHJvbXB0J10sXG4gICAgICAgICAgICAgICAgJ2ltYWdlcyc6IG1lc3NhZ2VzWzBdWydpbWFnZXMnXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChrZXlXb3JkICE9PSAnJyAmJiBTZW50ZW5jZSAhPT0gJycgJiYgbWVzc2FnZXNbMF1bJ2NvbnRlbnQnXVswXVsnY29udGVudCddICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5nZXQoeyBcImhpc3RvcnlcIjogW10gfSkudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpdGVtLmhpc3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SGlzdG9yeUxpc3QgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJpbmdvID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIG5ld0hpc3RvcnlMaXN0LnB1c2gobmV3SGlzdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0uaGlzdG9yeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOiusOW9leW3suWtmOWcqO+8jOWImeS4jemHjeWkjeS/neWtmFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtLmhpc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gaXRlbS5oaXN0b3J5W2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoua2V5V29yZCA9PT0gbmV3SGlzdG9yeVsna2V5V29yZCddICYmIG9iai5zZW50ZW5jZSA9PT0gbmV3SGlzdG9yeVsnc2VudGVuY2UnXSAmJiBvYmoucHJvbXB0ID09PSBuZXdIaXN0b3J5Wydwcm9tcHQnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5nbyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0hpc3RvcnlMaXN0ID0gaXRlbS5oaXN0b3J5O1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SGlzdG9yeUxpc3QudW5zaGlmdChuZXdIaXN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0hpc3RvcnlMaXN0LnNwbGljZSg4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld0hpc3RvcnlMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWJpbmdvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXN0b3J5OiBuZXdIaXN0b3J5TGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIFttZXNzYWdlc10pO1xuICAgIC8vIOeql+WPo+aLluaLveaXtuinpuWPkVxuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVNb3VzZU1vdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2VVcCk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndXNlRWZmZWN0IHJldHVybicpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZVVwKTtcbiAgICAgICAgfTtcbiAgICB9LCBbZHJhZ2dpbmddKTtcbiAgICAvLyDmiafooYwgUHJvbXB0XG4gICAgY29uc3QgZXhlY3V0aXZlUHJvbXB0ID0gKHByb21wdCwgcnVuUHJvbXB0LCBpbWFnZVRvUmVyZW5kZXIsIGRhdGEpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8g6K6+572u5Yqg6L2954q25oCBXG4gICAgICAgIC8vIHNldElzTG9hZGluZyh0cnVlKVxuICAgICAgICBsZXQgbmVlZFRvUnVuUHJvbXB0ID0gcnVuUHJvbXB0O1xuICAgICAgICBpZiAobmVlZFRvUnVuUHJvbXB0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG5lZWRUb1J1blByb21wdCA9ICd5ZXMnO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuZWVkVG9SZXJlbmRlckltYWdlID0gaW1hZ2VUb1JlcmVuZGVyO1xuICAgICAgICBpZiAobmVlZFRvUmVyZW5kZXJJbWFnZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBuZWVkVG9SZXJlbmRlckltYWdlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQga2V5V29yZCA9IHByb3BzLmRhdGEua2V5V29yZDtcbiAgICAgICAgbGV0IFNlbnRlbmNlID0gcHJvcHMuZGF0YS5TZW50ZW5jZTtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAga2V5V29yZCA9IGRhdGEua2V5V29yZDtcbiAgICAgICAgICAgIFNlbnRlbmNlID0gZGF0YS5zZW50ZW5jZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIOWIneWni+WMllxuICAgICAgICAgICAgc2V0TWVzc2FnZXMoW10pOyAvLyDlr7nor53liJfooahcbiAgICAgICAgfVxuICAgICAgICAvLyDlpoLmnpzpnIDopoHnq4vljbPmiafooYwgUHJvbXB0XG4gICAgICAgIGlmIChuZWVkVG9SdW5Qcm9tcHQgIT09ICdubycpIHtcbiAgICAgICAgICAgIC8v5Yid5aeL5YyW5Zu+54mH5a655ZmoXG4gICAgICAgICAgICBsZXQgc2hvd0ltYWdlc0JveCA9IHRydWU7XG4gICAgICAgICAgICBpZiAocHJvbXB0LmlkID09PSAnZGljdCcgfHwgcHJvbXB0LmlkID09PSAnRGVmYXVsdCcpIHtcbiAgICAgICAgICAgICAgICAvLyDnibnmrornmoTmlrnms5VcbiAgICAgICAgICAgICAgICBpZiAoa2V5V29yZC5sZW5ndGggPCAyMCkge1xuICAgICAgICAgICAgICAgICAgICBzaG93SW1hZ2VzQm94ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dJbWFnZXNCb3ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDoh6rlrprkuYkgUHJvbXB0XG4gICAgICAgICAgICAgICAgaWYgKHByb21wdC5nZXRVbnNwbGFzaEltYWdlcyAmJiBuZWVkVG9SdW5Qcm9tcHQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6c5b2T5YmNIFByb21wdCDpnIDopoHmmL7npLrlm77niYfvvIzkuJTlvZPliY3pnIDopoHnq4vljbPmiafooYwgUHJvbXB0XG4gICAgICAgICAgICAgICAgICAgIHNob3dJbWFnZXNCb3ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0ltYWdlc0JveCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaG93SW1hZ2VzQm94OicpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coc2hvd0ltYWdlc0JveCk7XG4gICAgICAgICAgICAvLyDln4vngrlcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAnZXhlY3V0aXZlUHJvbXB0JyB9KTtcbiAgICAgICAgICAgIC8vIOWcqOa2iOaBr+WOhuWPsuS4reaPkuWFpeaWsOiusOW9lVxuICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IFsuLi5wcmV2TWVzc2FnZXMsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAnY29udGVudCc6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NoYXRJZCc6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY29udGVudCc6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdGF0dXMnOiAnYmVnaW4nXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgJ3JvbGUnOiAnYXNzaXN0YW50JyxcbiAgICAgICAgICAgICAgICAgICAgJ3Byb21wdCc6ICcnLFxuICAgICAgICAgICAgICAgICAgICAnc2hvd0ltYWdlc0JveCc6IHNob3dJbWFnZXNCb3gsXG4gICAgICAgICAgICAgICAgICAgICdpbWFnZXMnOiBbXVxuICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgIC8vIOmdnui/vemXruaXtu+8jOaJjeS8muiusOW9leacgOi/keaJp+ihjOeahCBQcm9tcHRcbiAgICAgICAgICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyDorr7nva7mnIDov5HmiafooYznmoQgUHJvbXB0XG4gICAgICAgICAgICAgICAgc2V0TGFzdEV4ZWN1dGVkUHJvbXB0KHByb21wdCk7XG4gICAgICAgICAgICAgICAgLy8g6K6w5b2V5pyA6L+RIDEg5qyh5L2/55So55qEIFByb21wdO+8jOeUqOS6juS4i+asoeWQr+WKqOeql+WPo+aXtum7mOiupOaJp+ihjOatpCBQcm9tcHRcbiAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdEV4ZWN1dGVkUHJvbXB0OiBwcm9tcHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBuZXdQcm9tcHQ7XG4gICAgICAgICAgICBsZXQgcCA9IHByb21wdC51c2VyUHJvbXB0O1xuICAgICAgICAgICAgLy8g5aSE55CGIFByb21wdCDkuK3nmoTlj5jph49cbiAgICAgICAgICAgIHAgPSB5aWVsZCAoMCwgdXRpbF8xLmhhbmRsZVByb21wdFZhcmlhYmxlcykocCwga2V5V29yZCwgU2VudGVuY2UsIExhbmcpO1xuICAgICAgICAgICAgbmV3UHJvbXB0ID0gW3sgJ3JvbGUnOiAndXNlcicsICdjb250ZW50JzogcCB9XTtcbiAgICAgICAgICAgIC8vIOWmguaenOWOhuWPsuiusOW9leS4reWtmOWcqOiusOW9le+8jOWImeS4jemHjeWkjeivt+axgiBBUEnvvIznm7TmjqXmmL7npLrljoblj7LorrDlvZXnmoTkv6Hmga9cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5nZXQoeyBcImhpc3RvcnlcIjogW10gfSkudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgIC8vIOWmguaenOiusOW9leW3suWtmOWcqO+8jOWImeS4jemHjeWkjeS/neWtmFxuICAgICAgICAgICAgICAgIGxldCBiaW5nbyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGxldCB1cGRhdGVkTGFzdE1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtLmhpc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IGl0ZW0uaGlzdG9yeVtpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5rZXlXb3JkID09PSBrZXlXb3JkICYmIG9iai5zZW50ZW5jZSA9PT0gU2VudGVuY2UgJiYgb2JqLnByb21wdCA9PT0gbmV3UHJvbXB0WzBdWydjb250ZW50J10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgncm9sZScgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDml6fniYjmnKzkuK3lm6DkuLrmsqHmnInlrZjlgqggcm9sZSDvvIznm7TmjqXmmL7npLrljoblj7LmlbDmja7ml7bkvJrlr7zoh7TlkI7nu63mtYHnqIvlvILluLhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5nbyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYmluZ28gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+WOhuWPsuiusOW9le+8micpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOebtOaOpeaYvuekuuWOhuWPsuiusOW9leS4reeahOWbnuetlFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZExhc3RNZXNzYWdlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtZXNzYWdlc1ttZXNzYWdlcy5sZW5ndGggLSAxXSksIHsgcm9sZTogb2JqLnJvbGUsIGNvbnRlbnQ6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2hhdElkJzogRGF0ZS5ub3coKS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQnOiBvYmouYW5zd2VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0YXR1cyc6ICdkb25lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XSwgcHJvbXB0OiBuZXdQcm9tcHRbMF1bJ2NvbnRlbnQnXSwgc2hvd0ltYWdlc0JveDogc2hvd0ltYWdlc0JveCwgaW1hZ2VzOiBvYmouaW1hZ2VzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYmluZ286IGJpbmdvLCB1cGRhdGVkTGFzdE1lc3NhZ2U6IHVwZGF0ZWRMYXN0TWVzc2FnZSB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmJpbmdvKSB7XG4gICAgICAgICAgICAgICAgLy/mmL7npLrljoblj7LorrDlvZVcbiAgICAgICAgICAgICAgICBzZXRNZXNzYWdlcyhbcmVzdWx0LnVwZGF0ZWRMYXN0TWVzc2FnZV0pO1xuICAgICAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgICAgICAgICAgbGFzdFByb21wdFJlZi5jdXJyZW50ID0gbmV3UHJvbXB0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g6I635Y+W6K+t6KiA55+l6K+GXG4gICAgICAgICAgICAgICAgZ2V0S25vd2xlZGdlKG5ld1Byb21wdCwga2V5V29yZCwgcHJvbXB0LmlkKTtcbiAgICAgICAgICAgICAgICAvLyDor7fmsYLlm77niYdcbiAgICAgICAgICAgICAgICBpZiAocHJvbXB0LmlkID09ICdEZWZhdWx0JyB8fCBwcm9tcHQuaWQgPT0gJ2RpY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXlXb3JkLmxlbmd0aCA8PSAyMCAmJiBwcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMgJiYgbmVlZFRvUmVyZW5kZXJJbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5Zu+54mH5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmdldFVuc3BsYXNoSW1hZ2VzKShrZXlXb3JkKS50aGVuKChpbWdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0SW1hZ2VzKGltZ3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L+d5a2Y5Zu+54mH5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBwcmV2TWVzc2FnZXNbcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldk1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRMYXN0TWVzc2FnZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbGFzdE1lc3NhZ2UpLCB7IG5lZWRUb1Nob3dJbWc6IHRydWUsIGltYWdlczogaW1ncyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5wcmV2TWVzc2FnZXMuc2xpY2UoMCwgcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDEpLCB1cGRhdGVkTGFzdE1lc3NhZ2VdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMgJiYgbmVlZFRvUmVyZW5kZXJJbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5Zu+54mH5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmdldFVuc3BsYXNoSW1hZ2VzKShrZXlXb3JkKS50aGVuKChpbWdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0SW1hZ2VzKGltZ3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L+d5a2Y5Zu+54mH5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBwcmV2TWVzc2FnZXNbcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldk1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRMYXN0TWVzc2FnZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbGFzdE1lc3NhZ2UpLCB7IG5lZWRUb1Nob3dJbWc6IHRydWUsIGltYWdlczogaW1ncyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5wcmV2TWVzc2FnZXMuc2xpY2UoMCwgcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDEpLCB1cGRhdGVkTGFzdE1lc3NhZ2VdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyDmiZPlvIAgUG9wdXAg56qX5Y+j77yM5LiN6ZyA6KaB56uL5Y2z5omn6KGMIFByb21wdFxuICAgICAgICAgICAgc2V0TGFzdEV4ZWN1dGVkUHJvbXB0KHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9KTtcbiAgICAgICAgICAgIC8vIOaVsOaNruWfi+eCuVxuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdvcGVuUG9wdXBDYXJkJyB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIOeCueWHu+OAjOmHjeaWsOeUn+aIkOOAjeaMiemSrlxuICAgIGNvbnN0IGhhbmRsZVJlZ2VuZXJhdGVCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICAgICAgLy8g5Zyo5raI5oGv5Y6G5Y+y5Lit5o+S5YWl5paw6K6w5b2VXG4gICAgICAgIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiB7XG4gICAgICAgICAgICBsZXQgbmV3TWVzc2FnZXMgPSBbLi4ucHJldk1lc3NhZ2VzXTtcbiAgICAgICAgICAgIG5ld01lc3NhZ2VzW25ld01lc3NhZ2VzLmxlbmd0aCAtIDFdLmNvbnRlbnQucHVzaCh7XG4gICAgICAgICAgICAgICAgY2hhdElkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgY29udGVudDogJycsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnYmVnaW4nLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBiZWdpbiDnirbmgIHmiY3kvJrmmL7npLrliqDovb3liqjnlLtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBuZXdNZXNzYWdlc1tuZXdNZXNzYWdlcy5sZW5ndGggLSAxXS5jb250ZW50O1xuICAgICAgICAgICAgbmV3TWVzc2FnZXNbbmV3TWVzc2FnZXMubGVuZ3RoIC0gMV0uY29udGVudFtjb250ZW50Lmxlbmd0aCAtIDFdLnN0YXR1cyA9ICdiZWdpbic7XG4gICAgICAgICAgICByZXR1cm4gbmV3TWVzc2FnZXM7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyDojrflj5bmnIDov5HmiafooYznmoQgUHJvbXB077yM5YaN5qyh5omn6KGMXG4gICAgICAgIGdldEtub3dsZWRnZShsYXN0UHJvbXB0UmVmLmN1cnJlbnQsIHByb3BzLmRhdGEua2V5V29yZCwgbGFzdEV4ZWN1dGVkUHJvbXB0LmlkKTtcbiAgICB9O1xuICAgIGNvbnN0IGluaXRpYWxpemVQcm9tcHRMaXN0ID0gKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyDojrflj5blt7Lkv53lrZjnmoQgUHJvbXB0IExpc3RcbiAgICAgICAgY29uc3QgcHJvbXB0TGlzdCA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7IFwicHJvbXB0TGlzdFwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5wcm9tcHRMaXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgc2V0UHJvbXB0cyhwcm9tcHRMaXN0KTtcbiAgICB9KTtcbiAgICAvLyDnvJbovpHoh6rlrprkuYkgUHJvbXB0IOaIkOWKn+WQjlxuICAgIGNvbnN0IGhhbmRsZVByb21wdEVkaXRlZCA9IChpc05ldykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyDliJ3lp4vljJYgUHJvbXB0IOWIl+ihqFxuICAgICAgICBpbml0aWFsaXplUHJvbXB0TGlzdCgpO1xuICAgICAgICAvLyDmm7TmlrDmnIDov5Hkvb/nlKjnmoQgUHJvbXB077yI6ZKI5a+557yW6L6R55qE5Zy65pmv77yJXG4gICAgICAgIGlmICghaXNOZXcpIHtcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7IFwicHJvbXB0TGlzdFwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtLnByb21wdExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ucHJvbXB0TGlzdFtpXS5pZCA9PT0gbGFzdEV4ZWN1dGVkUHJvbXB0LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmm7TmlrBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldExhc3RFeGVjdXRlZFByb21wdChpdGVtLnByb21wdExpc3RbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6K6w5b2V5pyA6L+RIDEg5qyh5L2/55So55qEIFByb21wdFxuICAgICAgICAgICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLnNldCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEV4ZWN1dGVkUHJvbXB0OiBpdGVtLnByb21wdExpc3RbaV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ2hhbmRsZVByb21wdEVkaXRlZCcgfSk7XG4gICAgfSk7XG4gICAgLy8g6K+35rGCIEdQVCDmlbDmja5cbiAgICBjb25zdCBnZXRLbm93bGVkZ2UgPSAocHJvbXB0LCBrZXlXb3JkLCBwcm9tcHRJZCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyAvLyDkvb/nlKjplb/ov57mjqVcbiAgICAgICAgLy8gbGV0IHBvcnQgPSBicm93c2VyLnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgICAgIC8vICAgbmFtZTogJ2Zyb21Qb3B1cENhcmQnXG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIOiusOW9leacgOi/keaJp+ihjOeahCBQcm9tcHTvvIznlKjkuo7ph43mlrDnlJ/miJBcbiAgICAgICAgbGFzdFByb21wdFJlZi5jdXJyZW50ID0gcHJvbXB0O1xuICAgICAgICBjb25zdCB0aGlzS2V5V29yZCA9IGtleVdvcmQgfHwgJyc7XG4gICAgICAgIGNvbnN0IHRoaXNQcm9tcHRJZCA9IHByb21wdElkIHx8ICcnO1xuICAgICAgICAvLyDnpoHnlKjkv53lrZjliLAgQW5raSDmjInpkq5cbiAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdzdGFuZGJ5JywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgIGlmICh0aGlzUHJvbXB0SWQgPT09ICdkaWN0Jykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8g5L2/55SoIHBvc3RNcyDlj5HpgIHkv6Hmga9cbiAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnZ2V0RGljdGlvbmFyeURhdGEnLCAnbWVzc2FnZXMnOiBwcm9tcHQsICdrZXlXb3JkJzogdGhpc0tleVdvcmQgfSk7XG4gICAgICAgICAgICB9LCAyMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyDkvb/nlKggcG9zdE1zIOWPkemAgeS/oeaBr1xuICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdnZXRLbm93bGVkZ2UnLCAnbWVzc2FnZXMnOiBwcm9tcHQsICdrZXlXb3JkJzogdGhpc0tleVdvcmQgfSk7XG4gICAgICAgICAgICB9LCAyMCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5o6l5pS25L+h5oGvXG4gICAgICAgIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKChtc2cpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdwb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcicpO1xuICAgICAgICAgICAgaWYgKG1zZy50eXBlID09PSAnc2VuZEdQVERhdGEnKSB7XG4gICAgICAgICAgICAgICAgLy8g6K+35rGCIEdQVCDmlbDmja7lpLHotKVcbiAgICAgICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PT0gJ2Vycm8nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHR5cGUgPT09ICdhczInID8gc2V0b3BlbkFwaUFuc2VyMihtc2cuY29udGVudCkgOiBzZXRvcGVuQXBpQW5zZXIobXNnLmNvbnRlbnQpXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldElzTG9hZGluZyhmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdub3JtYWwnLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0NvbnRlbnRMaXN0ID0gWy4uLm1lc3NhZ2VzW21lc3NhZ2VzLmxlbmd0aCAtIDFdLmNvbnRlbnRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAobXNnLmNvZGUgPT09ICdpbnZhbGlkX2FwaV9rZXknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXRJc0FwaUVycm8odHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbnRlbnRMaXN0W25ld0NvbnRlbnRMaXN0Lmxlbmd0aCAtIDFdLmNvbnRlbnQgPSBtc2cuY29udGVudCArICdcXFxuICAgICAgICAgICAgQWZ0ZXIgdGhhdCwgeW91IG5lZWQgdG8gc2V0IHRoZSBjb3JyZWN0IE9wZW4gQVBJIEtleSBpbiB0aGUgU2NvdXRlcjonO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29udGVudExpc3RbbmV3Q29udGVudExpc3QubGVuZ3RoIC0gMV0uc3RhdHVzID0gJ2ludmFsaWRfYXBpX2tleSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobmV3Q29udGVudExpc3QpO1xuICAgICAgICAgICAgICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBwcmV2TWVzc2FnZXNbcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgbmV3TXNnTGlzdCA9IGxhc3RNZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkTGFzdE1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxhc3RNZXNzYWdlKSwgeyBjb250ZW50OiBuZXdDb250ZW50TGlzdCwgcHJvbXB0OiBwcm9tcHRbMF1bJ2NvbnRlbnQnXSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IG5ld01zZ0xpc3QgPSBbLi4ucHJldk1lc3NhZ2VzLnNsaWNlKDAsIHByZXZNZXNzYWdlcy5sZW5ndGggLSAxKSwgbGFzdE1lc3NhZ2VdXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWy4uLnByZXZNZXNzYWdlcy5zbGljZSgwLCBwcmV2TWVzc2FnZXMubGVuZ3RoIC0gMSksIHVwZGF0ZWRMYXN0TWVzc2FnZV07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyBzZXRBbnN3ZXJEb25lKHRydWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzQXBpRXJybykge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZXRJc0FwaUVycm8oZmFsc2UpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIOivt+axgiBHUFQg5pWw5o2u5oiQ5Yqf5LiU5pWw5o2u5rWB5byA5aeL5Lyg6L6TXG4gICAgICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT09ICdiZWdpbicpIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g6K+35rGCIEdQVCDmlbDmja7miJDlip/kuJTmlbDmja7mtYHkvKDovpPkuK1cbiAgICAgICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PT0gJ3Byb2Nlc3MnIHx8IG1zZy5zdGF0dXMgPT09ICdlbmQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmuLLmn5PmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TWVzc2FnZXMgPSBbLi4ucHJldk1lc3NhZ2VzXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0TWVzc2FnZSA9IG5ld01lc3NhZ2VzW25ld01lc3NhZ2VzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOa3seW6puaLt+i0nVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250ZW50TGlzdCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobGFzdE1lc3NhZ2UuY29udGVudCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdDb250ZW50ID0gY29udGVudExpc3RbY29udGVudExpc3QubGVuZ3RoIC0gMV1bJ2NvbnRlbnQnXSArIG1zZy5jb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbnRlbnQgPSAoMCwgdXRpbF8xLmhhbmRsZUhpZ2h0bGlnaHQpKG5ld0NvbnRlbnQsIHByb3BzLmRhdGEua2V5V29yZCwgYW5raUNhcmRzLCB3aW5kb3dFbGVtZW50ID09PSBudWxsIHx8IHdpbmRvd0VsZW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpbmRvd0VsZW1lbnQuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudExpc3RbY29udGVudExpc3QubGVuZ3RoIC0gMV1bJ2NvbnRlbnQnXSA9IG5ld0NvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudExpc3RbY29udGVudExpc3QubGVuZ3RoIC0gMV1bJ3N0YXR1cyddID0gJ3Byb2Nlc3MnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0NvbnRlbnRMaXN0ID0gWy4uLmNvbnRlbnRMaXN0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkTGFzdE1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxhc3RNZXNzYWdlKSwgeyBjb250ZW50OiBuZXdDb250ZW50TGlzdCwgcHJvbXB0OiBwcm9tcHRbMF1bJ2NvbnRlbnQnXSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWy4uLnByZXZNZXNzYWdlcy5zbGljZSgwLCBwcmV2TWVzc2FnZXMubGVuZ3RoIC0gMSksIHVwZGF0ZWRMYXN0TWVzc2FnZV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyDor7fmsYIgR1BUIOaVsOaNruaIkOWKn+S4lOaVsOaNrua1gee7k+adn+S8oOi+k1xuICAgICAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09PSAnZW5kJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDorrDlvZXmtojmga/lm57nrZTlrozmr5XvvIjop6blj5Hkv53lrZjljoblj7LorrDlvZXvvIlcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0QW5zd2VyRG9uZSh0cnVlKVxuICAgICAgICAgICAgICAgICAgICAvLyBzZXRJc0xvYWRpbmcoZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0TWVzc2FnZSA9IHByZXZNZXNzYWdlc1twcmV2TWVzc2FnZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldk1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RDb250ZW50TGlzdCA9IGxhc3RNZXNzYWdlLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkTGFzdE1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxhc3RNZXNzYWdlKSwgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBbLi4ubGFzdENvbnRlbnRMaXN0LnNsaWNlKDAsIGxhc3RDb250ZW50TGlzdC5sZW5ndGggLSAxKSwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBsYXN0Q29udGVudExpc3RbbGFzdENvbnRlbnRMaXN0Lmxlbmd0aCAtIDFdKSwgeyBzdGF0dXM6ICdkb25lJyB9KV0gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWy4uLnByZXZNZXNzYWdlcy5zbGljZSgwLCBwcmV2TWVzc2FnZXMubGVuZ3RoIC0gMSksIHVwZGF0ZWRMYXN0TWVzc2FnZV07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8g55So5oi35Y+R6YCB5raI5oGvXG4gICAgY29uc3QgaGFuZGxlU2VuZE1lc3NhZ2UgPSAodmFsdWVzKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHZhbHVlcyk7XG4gICAgICAgIGxldCBwcm9tcHQgPSB2YWx1ZXM7XG4gICAgICAgIC8vIC8vIOa4heepuuaWh+acrOahhlxuICAgICAgICAvLyBmb3JtLnJlc2V0RmllbGRzKCk7XG4gICAgICAgIC8vIOWumuS9jeWIsOW6lemDqFxuICAgICAgICBzY3JvbGxUb0JvdHRvbSh0cnVlKTtcbiAgICAgICAgLy8g5bCG55So5oi35Y+R6KiA5Y+R6YCB5Yiw5raI5oGv6K6w5b2V5LitXG4gICAgICAgIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkTGFzdE1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhdElkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB2YWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdkb25lJyxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcHJvbXB0OiBwcm9tcHQsXG4gICAgICAgICAgICAgICAgc2hvd0ltYWdlc0JveDogZmFsc2UsXG4gICAgICAgICAgICAgICAgaW1hZ2VzOiBbXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBbLi4ucHJldk1lc3NhZ2VzLCB1cGRhdGVkTGFzdE1lc3NhZ2VdO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8g5Zyo5raI5oGv5Y6G5Y+y5Lit5o+S5YWl5pawIEdQVCDmtojmga9cbiAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IFsuLi5wcmV2TWVzc2FnZXMsIHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhdElkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2JlZ2luJyxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgcm9sZTogJ2Fzc2lzdGFudCcsXG4gICAgICAgICAgICAgICAgcHJvbXB0OiAnJyxcbiAgICAgICAgICAgICAgICBzaG93SW1hZ2VzQm94OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpbWFnZXM6IFtdXG4gICAgICAgICAgICB9XSk7XG4gICAgICAgIGNvbnN0IG1zZ0hpc3RvcnkgPSBtZXNzYWdlcy5zbGljZSgtNSkubWFwKChpdGVtKSA9PiB7IHJldHVybiB7ICdyb2xlJzogaXRlbS5yb2xlLCAnY29udGVudCc6IGl0ZW0uY29udGVudFtpdGVtLmNvbnRlbnQubGVuZ3RoIC0gMV1bJ2NvbnRlbnQnXSB9OyB9KTtcbiAgICAgICAgZ2V0S25vd2xlZGdlKFsuLi5tc2dIaXN0b3J5LCB7IFwicm9sZVwiOiBcInVzZXJcIiwgXCJjb250ZW50XCI6IHZhbHVlcyB9XSk7XG4gICAgICAgIC8vIGFtcGxpdHVkZS50cmFjaygnaGFuZGxlU2VuZE1lc3NhZ2UnKTtcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdoYW5kbGVTZW5kTWVzc2FnZScgfSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNb3VzZURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1BvcHVwQ2FyZDpoYW5kbGVNb3VzZURvd24nKTtcbiAgICAgICAgc2V0RHJhZ2dpbmcodHJ1ZSk7XG4gICAgICAgIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRYID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFkgPSBldmVudC5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRYID0gU3RyaW5nKG9mZnNldFgpO1xuICAgICAgICAgICAgd2luZG93RWxlbWVudC5jdXJyZW50LmRhdGFzZXQub2Zmc2V0WSA9IFN0cmluZyhvZmZzZXRZKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXRPZmZzZXQoeyB4OiBldmVudC5jbGllbnRYIC0gcG9zaXRpb24ueCwgeTogZXZlbnQuY2xpZW50WSAtIHBvc2l0aW9uLnkgfSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNb3VzZU1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgLy8gLy8gY29uc29sZS5sb2coJ1BvcHVwQ2FyZDpoYW5kbGVNb3VzZU1vdmUnKTtcbiAgICAgICAgLy8gLy8gY29uc29sZS5sb2coZHJhZ2dpbmcpO1xuICAgICAgICBpZiAoZHJhZ2dpbmcgJiYgd2luZG93RWxlbWVudC5jdXJyZW50KSB7XG4gICAgICAgICAgICAvLyBVc2UgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHRvIHRocm90dGxlIHRoZSBtb3VzZW1vdmUgZXZlbnQgaGFuZGxpbmdcbiAgICAgICAgICAgIC8vIOm8oOagh+ebuOWvueeql+WPo+W3puS4iuinkueahOWBj+enu1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WCA9IHBhcnNlRmxvYXQod2luZG93RWxlbWVudC5jdXJyZW50LmRhdGFzZXQub2Zmc2V0WCB8fCAnJyk7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRZID0gcGFyc2VGbG9hdCh3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRZIHx8ICcnKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ggPSBldmVudC5jbGllbnRYIC0gb2Zmc2V0WDtcbiAgICAgICAgICAgIGNvbnN0IG5ld1kgPSBldmVudC5jbGllbnRZIC0gb2Zmc2V0WTtcbiAgICAgICAgICAgIC8vIENoZWNrIHRoZSBib3VuZGFyaWVzXG4gICAgICAgICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudFdpZHRoID0gd2luZG93RWxlbWVudC5jdXJyZW50LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudEhlaWdodCA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBtaW5YID0gLWVsZW1lbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICBjb25zdCBtaW5ZID0gMDtcbiAgICAgICAgICAgIGNvbnN0IG1heFggPSB3aW5kb3dXaWR0aCAtIGVsZW1lbnRXaWR0aCArIGVsZW1lbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICBjb25zdCBtYXhZID0gd2luZG93SGVpZ2h0IC0gZWxlbWVudEhlaWdodCArIGVsZW1lbnRIZWlnaHQgLyAxLjU7XG4gICAgICAgICAgICBjb25zdCBjbGFtcGVkWCA9IE1hdGgubWF4KG1pblgsIE1hdGgubWluKG5ld1gsIG1heFgpKTtcbiAgICAgICAgICAgIGNvbnN0IGNsYW1wZWRZID0gTWF0aC5tYXgobWluWSwgTWF0aC5taW4obmV3WSwgbWF4WSkpO1xuICAgICAgICAgICAgLy8gT25seSB1cGRhdGUgdGhlIHBvc2l0aW9uIGlmIGl0J3Mgd2l0aGluIHRoZSBib3VuZGFyaWVzXG4gICAgICAgICAgICAvLyBuZXdYID49IG1pblggJiYgbmV3WCA8PSBtYXhYICYmIG5ld1kgPj0gbWluWSAmJiBuZXdZIDw9IG1heFlcbiAgICAgICAgICAgIGlmICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgLy8gc2V0UG9zaXRpb24oeyB4OiBjbGFtcGVkWCwgeTogY2xhbXBlZFkgfSk7XG4gICAgICAgICAgICAgICAgd2luZG93RWxlbWVudC5jdXJyZW50LnN0eWxlLmxlZnQgPSBgJHtjbGFtcGVkWH1weGA7XG4gICAgICAgICAgICAgICAgd2luZG93RWxlbWVudC5jdXJyZW50LnN0eWxlLnRvcCA9IGAke2NsYW1wZWRZfXB4YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOWFg+e0oOWIsOi+vui+ueeVjFxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHJlY3QgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgLy8gY29uc3Qgb2Zmc2V0WCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICAgICAgICAgICAgLy8gY29uc3Qgb2Zmc2V0WSA9IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgICAgICAgICAgICAvLyB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRYID0gU3RyaW5nKG9mZnNldFgpO1xuICAgICAgICAgICAgICAgIC8vIHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFkgPSBTdHJpbmcob2Zmc2V0WSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU1vdXNlVXAgPSAoKSA9PiB7XG4gICAgICAgIC8vIC8vIGNvbnNvbGUubG9nKCdQb3B1cENhcmQ6aGFuZGxlTW91c2VVcCcpO1xuICAgICAgICBzZXREcmFnZ2luZyhmYWxzZSk7XG4gICAgfTtcbiAgICAvLyDmt7vliqDliLAgQW5raVxuICAgIGNvbnN0IGFkZFRvQW5raSA9IChkZWNrTmFtZSwgbW9kZWxOYW1lLCBmcm9udCwgYmFjaykgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lO1xuICAgICAgICBjb25zdCBrZXlXb3JkID0gcHJvcHMuZGF0YS5rZXlXb3JkO1xuICAgICAgICBjb25zdCBTZW50ZW5jZSA9IHByb3BzLmRhdGEuU2VudGVuY2U7XG4gICAgICAgIGxldCBjb250YWluZXIgPSAnJztcbiAgICAgICAgbGV0IGltYWdlcyA9ICcnO1xuICAgICAgICBsZXQgdW5zcGxhc2hfZG93bmxvYWRfbG9jYXRpb247XG4gICAgICAgIGxldCBzdGMgPSBrZXlXb3JkLmxlbmd0aCA8PSAyMCA/IFNlbnRlbmNlIDogJyc7XG4gICAgICAgIC8vIOWcqOivreWig+WPpeWtkOS4reWwhuWFs+mUruWtl+eqgeWHuuaYvuekulxuICAgICAgICBzdGMgPSBzdGMucmVwbGFjZShuZXcgUmVnRXhwKGtleVdvcmQsICdnJyksICc8c3BhbiBjbGFzcz1cImtleVdvcmRcIj4nICsga2V5V29yZCArICc8L3NwYW4+Jyk7XG4gICAgICAgIGxldCBTY291dGVyU2VsZWN0aW9uID0gJyc7XG4gICAgICAgIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vIOmAieS4reeahOaWh+Wtl1xuICAgICAgICAgICAgU2NvdXRlclNlbGVjdGlvbiA9IChfYiA9IChfYSA9IHdpbmRvd0VsZW1lbnQuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnF1ZXJ5U2VsZWN0b3IoJyNTY291dGVyU2VsZWN0aW9uJykpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpWzBdLmlubmVySFRNTDtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdpbmRvd0VsZW1lbnQuY3VycmVudCk7XG4gICAgICAgICAgICBjb250YWluZXIgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgY29udGFpbmVyID0gd2luZG93RWxlbWVudC5jdXJyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lc3NhZ2VzJylbMF0uaW5uZXJIVE1MO1xuICAgICAgICAgICAgLy8g5aSE55CGIGNvbnRhaW5lciDnmoTlhoXlrrlcbiAgICAgICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhjb250YWluZXIsICd0ZXh0L2h0bWwnKTtcbiAgICAgICAgICAgIGxldCBlbGVtZW50c1RvUmVtb3ZlID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbWFnZVF1ZXVlJyk7XG4gICAgICAgICAgICBsZXQgaW1hZ2VTb3VyY2UgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnLmltYWdlU291cmNlJyk7XG4gICAgICAgICAgICAvLyDliJvlu7rmlrDnmoQgaW1nIOagh+etvlxuICAgICAgICAgICAgLy8g6K6+572u5Zu+54mH55qE5bC65a+444CB5qC35byPXG4gICAgICAgICAgICBpZiAoZG9jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlQm94JykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBpbWcgPSBkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VCb3gnKVswXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF07XG4gICAgICAgICAgICAgICAgaW1nLndpZHRoID0gMDtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWdVcmwgPSBpbWcuc3JjO1xuICAgICAgICAgICAgICAgIGxldCBuZXdJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgICAgIG5ld0ltZy5zcmMgPSBpbWdVcmw7XG4gICAgICAgICAgICAgICAgLy8g6I635Y+W6KaB5pu/5o2i55qEIGRpdlxuICAgICAgICAgICAgICAgIGxldCBkaXYgPSBkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VCb3gnKVswXTtcbiAgICAgICAgICAgICAgICBpZiAoZGl2KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOS9v+eUqOaWsOeahCBpbWcg5qCH562+5pu/5o2iIGRpdlxuICAgICAgICAgICAgICAgICAgICAoX2MgPSBkaXYucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnJlcGxhY2VDaGlsZChuZXdJbWcsIGRpdik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5rKh5pyJ5Zu+54mHXG4gICAgICAgICAgICAgICAgY29uc3QgaW1ncyA9IGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXMnKVswXTtcbiAgICAgICAgICAgICAgICBpZiAoaW1ncykge1xuICAgICAgICAgICAgICAgICAgICAoX2QgPSBpbWdzLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5yZW1vdmVDaGlsZChpbWdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDliKDpmaTpooTliqDovb3nmoTlm77niYdcbiAgICAgICAgICAgIGVsZW1lbnRzVG9SZW1vdmUuZm9yRWFjaChlbCA9PiB7IHZhciBfYTsgcmV0dXJuIChfYSA9IGVsLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVDaGlsZChlbCk7IH0pO1xuICAgICAgICAgICAgLy8g5Yig6Zmk5Zu+54mH5p2l5rqQ5L+h5oGvXG4gICAgICAgICAgICBpbWFnZVNvdXJjZS5mb3JFYWNoKGVsID0+IHsgdmFyIF9hOyByZXR1cm4gKF9hID0gZWwucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZUNoaWxkKGVsKTsgfSk7XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2MuYm9keS5pbm5lckhUTUw7XG4gICAgICAgICAgICAvLyDlpITnkIbmoLflvI/vvIzpgb/lhY0gQW5raSDlhoXmmL7npLrlvILluLhcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lci5yZXBsYWNlKC9zdHlsZT0vZywgJycpO1xuICAgICAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZUJveCcpWzBdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbWFnZXMgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VCb3gnKVswXS5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgLy8g6I635Y+WIHVuc3BsYXNoQXBpIOeahCBkb3dubG9hZF9sb2NhdGlvblxuICAgICAgICAgICAgICAgIHVuc3BsYXNoX2Rvd25sb2FkX2xvY2F0aW9uID0gKF9lID0gd2luZG93RWxlbWVudC5jdXJyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlcycpWzBdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXS5wYXJlbnRFbGVtZW50KSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuZ2V0QXR0cmlidXRlKCdkYXRhLWRvd25sb2FkbG9jYXRpb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGltYWdlcyk7XG4gICAgICAgICAgICAvLyDlpITnkIbmoLflvI/vvIzpgb/lhY0gQW5raSDlhoXmmL7npLrlvILluLhcbiAgICAgICAgICAgIGltYWdlcyA9IGltYWdlcy5yZXBsYWNlKC9zdHlsZT0vZ2ksICcnKTtcbiAgICAgICAgICAgIGltYWdlcyA9IGltYWdlcy5yZXBsYWNlKC93aWR0aC9naSwgJycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNhcmRTdHlsZSA9IGBgO1xuICAgICAgICBjb25zdCB0aGlzTGFuZyA9IGxhbmdfMS5sYW5nO1xuICAgICAgICBsZXQgYXVkaW9VcmwgPSAnaHR0cDovL2RpY3QueW91ZGFvLmNvbS9kaWN0dm9pY2U/dHlwZT0wJmF1ZGlvPSc7XG4gICAgICAgIGxldCBhdWRpbywgZmlsZW5hbWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhdWRpb1VybCA9IHRoaXNMYW5nW0xhbmdbJ3RhcmdldCddWydpZCddXVsnYXVkaW9VUkwnXTtcbiAgICAgICAgICAgIGZpbGVuYW1lID0ga2V5V29yZC5sZW5ndGggPj0gMTAgPyBrZXlXb3JkLnN1YnN0cmluZygwLCAxMCkgOiBrZXlXb3JkO1xuICAgICAgICAgICAgYXVkaW8gPSBbe1xuICAgICAgICAgICAgICAgICAgICBcInVybFwiOiBhdWRpb1VybCArIGtleVdvcmQsXG4gICAgICAgICAgICAgICAgICAgIFwiZmlsZW5hbWVcIjogXCJTY291dGVyX1wiICsgZmlsZW5hbWUgKyBcIi5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmaWVsZHNcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJGcm9udFwiXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGF1ZGlvID0gW107XG4gICAgICAgIH1cbiAgICAgICAgLy8g5bi46KeE57G75Z6LXG4gICAgICAgIGxldCBhbmtpQmFjayA9ICc8cD4gPGJsb2NrcXVvdGU+JyArIHN0YyArICcg4oCU4oCUIDxhIGhyZWY9XCInICsgd2luZG93LmxvY2F0aW9uLmhyZWYgKyAnXCI+U291cmNlPC9hPjwvYmxvY2txdW90ZT48L3A+JyArIGNvbnRhaW5lcjtcbiAgICAgICAgaWYgKGtleVdvcmQubGVuZ3RoID4gMjApIHtcbiAgICAgICAgICAgIC8vIOWmguaenOmAieS4reeahOespuWPt+mVv+W6puWkp+S6jiAyMO+8iOivtOaYjuaYr+WPpeWtkO+8ieWImeS4jeaYvuekuuS4iuS4i+aWh+WPpeWtkO+8jOeEtuWQjuWwhuadpea6kOmTvuaOpeaUvuWIsOWwvumDqFxuICAgICAgICAgICAgYW5raUJhY2sgPSBjb250YWluZXIgKyAnPHA+PGEgaHJlZj1cIicgKyB3aW5kb3cubG9jYXRpb24uaHJlZiArICdcIj5Tb3VyY2U8L2E+PC9wPic7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHAgPSB7XG4gICAgICAgICAgICBcIm5vdGVcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVja05hbWVcIjogZGVja05hbWUsXG4gICAgICAgICAgICAgICAgXCJtb2RlbE5hbWVcIjogbW9kZWxOYW1lLFxuICAgICAgICAgICAgICAgIFwiZmllbGRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgW2Zyb250XToga2V5V29yZCxcbiAgICAgICAgICAgICAgICAgICAgW2JhY2tdOiBjYXJkU3R5bGUgKyBhbmtpQmFja1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJhdWRpb1wiOiBhdWRpbyxcbiAgICAgICAgICAgICAgICBcInRhZ3NcIjogW1xuICAgICAgICAgICAgICAgICAgICBcIlNjb3V0ZXJcIlxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8g5a6M5b2i5aGr56m657G75Z6LXG4gICAgICAgIGlmIChTY291dGVyU2VsZWN0aW9uLmluZGV4T2YoJ2NsYXNzPVwiYW5raVNwYWNlXCInKSA+PSAwIHx8IGNvbnRhaW5lci5pbmRleE9mKCdjbGFzcz1cImFua2lTcGFjZVwiJykgPj0gMCB8fCBjb250YWluZXIuaW5kZXhPZigne3tjJykgPj0gMCkge1xuICAgICAgICAgICAgbGV0IG5ld0Zyb250O1xuICAgICAgICAgICAgbmV3RnJvbnQgPSAnPHA+JyArIFNjb3V0ZXJTZWxlY3Rpb24gKyAnPC9wPicgKyAnPGJsb2NrcXVvdGU+JyArIHN0YyArICcg4oCU4oCUIDxhIGhyZWY9XCInICsgd2luZG93LmxvY2F0aW9uLmhyZWYgKyAnXCI+U291cmNlPC9hPjwvYmxvY2txdW90ZT4nICsgY29udGFpbmVyO1xuICAgICAgICAgICAgaWYgKGtleVdvcmQubGVuZ3RoID4gMjApIHtcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzpgInkuK3nmoTnrKblj7fplb/luqblpKfkuo4gMjDvvIjor7TmmI7mmK/lj6XlrZDvvInliJnkuI3mmL7npLrkuIrkuIvmloflj6XlrZDvvIznhLblkI7lsIbmnaXmupDpk77mjqXmlL7liLDlsL7pg6hcbiAgICAgICAgICAgICAgICBuZXdGcm9udCA9ICc8cD4nICsgU2NvdXRlclNlbGVjdGlvbiArICc8L3A+JyArIGNvbnRhaW5lciArICc8cD4gPGEgaHJlZj1cIicgKyB3aW5kb3cubG9jYXRpb24uaHJlZiArICdcIj5Tb3VyY2U8L2E+PC9wPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwID0ge1xuICAgICAgICAgICAgICAgIFwibm90ZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZGVja05hbWVcIjogZGVja05hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwibW9kZWxOYW1lXCI6IG1vZGVsTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJmaWVsZHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgW2Zyb250XTogbmV3RnJvbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBbYmFja106ICcnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiYXVkaW9cIjogW10sXG4gICAgICAgICAgICAgICAgICAgIFwidGFnc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlNjb3V0ZXJcIlxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyDlj5HpgIHmtojmga/nu5kgYmFja2dyb3VuZFxuICAgICAgICBsZXQgc2VuZGluZyA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FkZE5vdGUnLCAnbWVzc2FnZXMnOiB7ICdhbmtpX2FyZ3VtZW50cyc6IHAsICdhbmtpX2FjdGlvbl90eXBlJzogJ2FkZE5vdGUnLCAndW5zcGxhc2hfZG93bmxvYWRfbG9jYXRpb24nOiB1bnNwbGFzaF9kb3dubG9hZF9sb2NhdGlvbiB9LCB9KTtcbiAgICAgICAgc2VuZGluZy50aGVuKGhhbmRsZVJlc3BvbnNlLCBoYW5kbGVFcnJvcik7XG4gICAgICAgIC8vIOaVsOaNruWfi+eCuVxuICAgICAgICAvLyBhbXBsaXR1ZGUudHJhY2soJ2FkZFRvQW5raScpO1xuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ2FkZFRvQW5raScgfSk7XG4gICAgfTtcbiAgICAvLyDngrnlh7vkv53lrZjliLAgQW5raVxuICAgIGNvbnN0IGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljayA9ICgpID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIC8vIOagueaNruaYr+WQpuS4uuWujOW9ouWhq+epuueUs+ivt+S4jeWQjOeahOWNoeeJh+aooeadv1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSAoX2EgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZXNzYWdlcycpWzBdLmlubmVySFRNTDtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uVGV4dCA9IChfYyA9IChfYiA9IHdpbmRvd0VsZW1lbnQuY3VycmVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnF1ZXJ5U2VsZWN0b3IoJyNTY291dGVyU2VsZWN0aW9uJykpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpWzBdLmlubmVySFRNTDtcbiAgICAgICAgbGV0IGlzQW5raVNwYWNlID0gZmFsc2U7XG4gICAgICAgIGlmIChjb250YWluZXIgfHwgc2VsZWN0aW9uVGV4dCkge1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5pbmRleE9mKCdjbGFzcz1cImFua2lTcGFjZVwiJykgPj0gMCB8fCBjb250YWluZXIuaW5kZXhPZigne3tjJykgPj0gMCB8fCBzZWxlY3Rpb25UZXh0LmluZGV4T2YoJ2NsYXNzPVwiYW5raVNwYWNlJykgPj0gMCkge1xuICAgICAgICAgICAgICAgIGlzQW5raVNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ2xvYWRpbmcnLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgZnVuY3Rpb24gc2V0QW5raUluZm8obW9kZWxzKSB7XG4gICAgICAgICAgICBsZXQgZGVmYXVsdERlY2tOYW1lID0gJycsIG1vZGVsTmFtZSA9ICcnLCBmaWVsZDEgPSAnJywgZmllbGQyID0gJyc7XG4gICAgICAgICAgICBtb2RlbHMuZm9yRWFjaCgobW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobW9kZWwuaXNBbmtpU3BhY2UgPT09IGlzQW5raVNwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHREZWNrTmFtZSA9IG1vZGVsLmRlZmF1bHREZWNrTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxOYW1lID0gbW9kZWwubW9kZWxOYW1lO1xuICAgICAgICAgICAgICAgICAgICBmaWVsZDEgPSBtb2RlbC5maWVsZDE7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkMiA9IG1vZGVsLmZpZWxkMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgJ2RlZmF1bHREZWNrTmFtZSc6IGRlZmF1bHREZWNrTmFtZSxcbiAgICAgICAgICAgICAgICAnbW9kZWxOYW1lJzogbW9kZWxOYW1lLFxuICAgICAgICAgICAgICAgICdmaWVsZDEnOiBmaWVsZDEsXG4gICAgICAgICAgICAgICAgJ2ZpZWxkMic6IGZpZWxkMlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLmFua2kpIHtcbiAgICAgICAgICAgIGNvbnN0IGFua2lJbmZvID0gc2V0QW5raUluZm8odXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLmFua2kpO1xuICAgICAgICAgICAgLy8g5re75Yqg5YiwIEFua2kg5LitXG4gICAgICAgICAgICBhZGRUb0Fua2koYW5raUluZm8uZGVmYXVsdERlY2tOYW1lLCBhbmtpSW5mby5tb2RlbE5hbWUsIGFua2lJbmZvLmZpZWxkMSwgYW5raUluZm8uZmllbGQyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIOiOt+WPliBBbmtpIOeJjOe7hOS/oeaBr1xuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnc2V0TW9kZWwnLCAnbWVzc2FnZXMnOiB7fSwgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmtpSW5mbyA9IHNldEFua2lJbmZvKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgLy8g5re75Yqg5YiwIEFua2kg5LitXG4gICAgICAgICAgICAgICAgICAgIGFkZFRvQW5raShhbmtpSW5mby5kZWZhdWx0RGVja05hbWUsIGFua2lJbmZvLm1vZGVsTmFtZSwgYW5raUluZm8uZmllbGQxLCBhbmtpSW5mby5maWVsZDIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5Y+N6aaI6ZSZ6K+v5L+h5oGvXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KHJlc3VsdC5lcnJvci5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIOaOpeaUtiBiYWNrZ3JvdW5kIOeahOWbnuWkjVxuICAgIGZ1bmN0aW9uIGhhbmRsZVJlc3BvbnNlKG1lc3NhZ2UpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgIGlmIChtZXNzYWdlLmVycm9yID09PSBudWxsKSB7XG4gICAgICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ3N1Y2Nlc3MnLCAnbm90ZUlkJzogbWVzc2FnZS5kYXRhIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQobWVzc2FnZS5lcnJvcik7XG4gICAgICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycm8pIHtcbiAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdub3JtYWwnLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZXJybyk7XG4gICAgfVxuICAgIC8vIEdQVCDnlJ/miJDmtojmga/ml7bvvIzoh6rliqjlrprkvY3liLDmtojmga/liJfooajlupXpg6jvvIzmlrnkvr/nlKjmiLfpmIXor7tcbiAgICBmdW5jdGlvbiBzY3JvbGxUb0JvdHRvbShjYW5Tcm9sbCA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGFpbmVyJylbMF07XG4gICAgICAgICAgICBpZiAoY2FuU3JvbGwpIHtcbiAgICAgICAgICAgICAgICAvLyDkvY3kuo7lupXpg6jvvIzpnIDopoHoh6rliqjmu5rliqhcbiAgICAgICAgICAgICAgICBjb250YWluZXIuc2Nyb2xsVG9wID0gY29udGFpbmVyLnNjcm9sbEhlaWdodCArIDIwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IG9wZW5DdXN0b21Qcm9tcHRGb3JtID0gKGRhdGEpID0+IHtcbiAgICAgICAgLy8g5byA5ZCv5oiW5YWz6Zet6Ieq5a6a5LmJIFByb21wdCDooajljZVcbiAgICAgICAgc2V0UG9wb3Zlck9wZW4oZGF0YS5pc09wZW4pO1xuICAgICAgICAvLyDorr7nva7ooajljZXnmoTpu5jorqTorr7nva5cbiAgICAgICAgaWYgKGRhdGEuaXNPcGVuKSB7XG4gICAgICAgICAgICBzZXRDdXN0b21Qcm9tcHRGb3JtRGF0YShkYXRhLmRhdGEpO1xuICAgICAgICAgICAgLy8g5byA5ZCv6KGo5Y2VXG4gICAgICAgICAgICAvLyBhbXBsaXR1ZGUudHJhY2soJ29wZW5DdXN0b21Qcm9tcHRGb3JtJyk7XG4gICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ29wZW5DdXN0b21Qcm9tcHRGb3JtJyB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyDlvIDlkK/ooajljZXlkI7npoHmraLngrnlh7vnqpflj6PlpJbljLrln5/lhbPpl63nqpflj6NcbiAgICAgICAgKDAsIGNvbnRlbnRTY3JpcHRfMS5zZXREb25vdENsb3NlUG9wdXBDYXJkKShkYXRhLmlzT3Blbik7XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoU2NvdXRlckRpdiwgeyBpZDogXCJMZWFybmluZ0VuZ2xpc2gyMDIzXCIsIHJlZjogd2luZG93RWxlbWVudCwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBsZWZ0OiAxMCxcbiAgICAgICAgICAgICAgICB0b3A6IDEwLFxuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkNvbmZpZ1Byb3ZpZGVyLCB7IHRoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvclByaW1hcnk6ICcjRjA4QTI0JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoTmF2XzEuTmF2LCB7IGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljazogaGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrLCBhZGRUb0Fua2lTdGF0dXM6IGFkZFRvQW5raVN0YXR1cywgb25Nb3VzZURvd246IGhhbmRsZU1vdXNlRG93biwgaGFuZGxlTWVudUl0ZW1DbGljazogZXhlY3V0aXZlUHJvbXB0LCBvcGVuQ3VzdG9tUHJvbXB0Rm9ybTogb3BlbkN1c3RvbVByb21wdEZvcm0sIGlzT3Blbk1lbnU6IGlzT3Blbk1lbnUsIHByb21wdHM6IHByb21wdHMsIGxhc3RFeGVjdXRlZFByb21wdDogbGFzdEV4ZWN1dGVkUHJvbXB0LCBrZXlXb3JkOiBwcm9wcy5kYXRhLmtleVdvcmQgfSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdjb250YWluZXIgZmxleC1ncm93IGZsZXggZmxleC1jb2wgb3ZlcmZsb3ctYXV0bycsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6ICc0OHB4J1xuICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnZmxleC1ncm93JywgcmVmOiBtZXNzYWdlc0xpc3QsIHN0eWxlOiB7fSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0aW9uXzEuU2VsZWN0aW9uLCB7IHRleHQ6IHByb3BzLmRhdGEua2V5V29yZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VfMS5NZXNzYWdlc0xpc3QsIHsgbWVzc2FnZXM6IG1lc3NhZ2VzIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUmVnZW5lcmF0ZUJ1dHRvbl8xLlJlZ2VuZXJhdGVCdXR0b24sIHsgbWVzc2FnZXM6IG1lc3NhZ2VzLCBoYW5kbGVSZWdlbmVyYXRlQnV0dG9uQ2xpY2s6IGhhbmRsZVJlZ2VuZXJhdGVCdXR0b25DbGljayB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnZm9sbG93VXBNZW51Qm94Jywgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogc2hvd0ZvbGxvd1VwRGF0YU1lbnUuc2hvdyA/ICdibG9jaycgOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnZml0LWNvbnRlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChQcm9tcHRMaXN0XzEuUHJvbXB0TGlzdCwgeyBmb2xsb3dVcERhdGE6IGZvbGxvd1VwRGF0YSwgc2hvd0ZvbGxvd1VwRGF0YU1lbnU6IHNob3dGb2xsb3dVcERhdGFNZW51LCBwcm9tcHRMaXN0OiBwcm9tcHRzLCBoYW5kbGVNZW51SXRlbUNsaWNrOiBleGVjdXRpdmVQcm9tcHQgfSkpKSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoVXNlck1lc3NhZ2VJbnB1dF8xLlVzZXJNZXNzYWdlSW5wdXQsIHsgbWVzc2FnZXM6IG1lc3NhZ2VzLCBoYW5kbGVTZW5kTWVzc2FnZTogaGFuZGxlU2VuZE1lc3NhZ2UgfSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkRyYXdlciwgeyB0aXRsZTogY3VzdG9tUHJvbXB0Rm9ybURhdGEuaWQgPT09ICcnID8gXCJDcmVhdGUgUHJvbXB0XCIgOiBcIkVkaXQgUHJvbXB0XCIsIHBsYWNlbWVudDogXCJib3R0b21cIiwgY2xvc2FibGU6IGZhbHNlLCBoZWlnaHQ6ICcxMDAlJywgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogaXNQb3BvdmVyT3BlbiwgZ2V0Q29udGFpbmVyOiBmYWxzZSwgZXh0cmE6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5TcGFjZSwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7IHpJbmRleDogJzknIH0sIG9uQ2xpY2s6ICgpID0+IG9wZW5DdXN0b21Qcm9tcHRGb3JtKHsgaXNPcGVuOiBmYWxzZSwgZGF0YTogeyAndGl0bGUnOiAnJywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZmFsc2UsICd1c2VyUHJvbXB0JzogJycsICdpZCc6ICcnIH0gfSkgfSwgXCJDYW5jZWxcIikpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJhY2tncm91bmRDb2xvcjogJ3JlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICc2NHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAnYWxsLXNjcm9sbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBvbk1vdXNlRG93bjogaGFuZGxlTW91c2VEb3duIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoQ3VzdG9tUHJvbXB0Rm9ybV8xLkN1c3RvbVByb21wdEZvcm0sIHsgb3BlbkN1c3RvbVByb21wdEZvcm06IG9wZW5DdXN0b21Qcm9tcHRGb3JtLCBoYW5kbGVQcm9tcHRFZGl0ZWQ6IGhhbmRsZVByb21wdEVkaXRlZCwgZGF0YTogY3VzdG9tUHJvbXB0Rm9ybURhdGEgfSkpKSkpKSk7XG59XG5leHBvcnRzLlBvcHVwQ2FyZCA9IFBvcHVwQ2FyZDtcbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5wb3B1cENhcmRTdHlsZSA9IHZvaWQgMDtcbmV4cG9ydHMucG9wdXBDYXJkU3R5bGUgPSBgXG4uc2xpY2stYXJyb3c6OmJlZm9yZXtcbiAgY29udGVudDpcIlwiICFpbXBvcnRhbnQ7XG59XG5cbi5hbmtpU3BhY2Uge1xuICBjb2xvcjojRjA4QTI0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hbmtpU3BhY2U6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiNGMDhBMjQ7XG4gIGNvbG9yOiNmZmZmZmY7XG59XG5cbi5jb250ZXh0Qm94LC5mb2xsb3dVcE1lbnUge1xuICBkaXNwbGF5OiBmbGV4O1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gIHBhZGRpbmc6IDRweCA4cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBib3gtc2hhZG93OiAwcHggOHB4IDI4cHggcmdiYSgwLDAsMCwuMTYpO1xuICB6LWluZGV4Ojk7XG5cbn1cblxuLmNvbnRleHRCb3gge1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4vLyAuY29udGV4dEJveCAqIHtcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xuLy8gICBwYWRkaW5nOiAycHg7XG4vLyB9XG5cbi8vIC5hbmtpU3BhY2VCdXR0b25Cb3gge1xuLy8gICBkaXNwbGF5OiBmbGV4O1xuLy8gICBmbGV4LWRpcmVjdGlvbjogcm93O1xuLy8gICBtYXJnaW4tcmlnaHQ6IDhweDtcbi8vICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMTIpO1xuLy8gICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xuLy8gfVxuXG4vLyAuc2V0QW5raVNwYWNlQnV0dG9uOmZpcnN0LW9mLXR5cGUge1xuLy8gICBtYXJnaW4tcmlnaHQ6OHB4O1xuLy8gfVxuXG4vLyAubG9va1VwQnV0dG9uIHtcbi8vICAgd2lkdGg6IDE4cHg7XG4vLyAgIGhlaWdodDogMThweDtcbi8vICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuLy8gICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuLy8gICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4vLyB9XG5cbi8vIC5hbmtpU3BhY2VCdXR0b25Cb3ggKjpob3ZlciB7XG4gIFxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCw1OSwwLjA1MSk7XG4vLyAgIGJvcmRlci1yYWRpdXM6IDJweDtcblxuLy8gfVxuXG4uYW50LWNhcm91c2VsIC5zbGljay1wcmV2LFxuLmFudC1jYXJvdXNlbCAuc2xpY2stbmV4dCxcbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLXByZXY6aG92ZXIsXG4uYW50LWNhcm91c2VsIC5zbGljay1uZXh0OmhvdmVyIHtcbiAgZm9udC1zaXplOiBpbmhlcml0O1xuICBjb2xvcjogY3VycmVudENvbG9yO1xufVxuXG4uYW50LWNhcm91c2VsIC5zbGljay1wcmV2LFxuLmFudC1jYXJvdXNlbCAuc2xpY2stcHJldjpob3ZlciB7XG4gIGxlZnQ6IDEwcHg7XG4gIHotaW5kZXg6IDI7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmFudC1jYXJvdXNlbCAuc2xpY2stbmV4dCxcbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLW5leHQ6aG92ZXIge1xuICByaWdodDogMTBweDtcbiAgei1pbmRleDogMjtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uaW1hZ2VzIGltZyB7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG59XG5cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDEsI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDIsI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDN7XG4gIG1hcmdpbjogMTBweCAwO1xufVxuXG4vLyAjTGVhcm5pbmdFbmdsaXNoMjAyMyBoMXtcbi8vICAgZm9udC1zaXplOjIwcHg7XG4vLyB9XG4vLyAjTGVhcm5pbmdFbmdsaXNoMjAyMyBoMntcbi8vICAgZm9udC1zaXplOjE3cHg7XG4vLyB9XG5cbi8vICNMZWFybmluZ0VuZ2xpc2gyMDIzIHtcbi8vIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xuLy8gd2lkdGg6IDM5MHB4O1xuLy8gaGVpZ2h0OiA1NjBweDtcbi8vIGNvbG9yOiByZ2IoMCAwIDAgLyA4MCUpO1xuLy8gcG9zaXRpb246IGZpeGVkO1xuLy8gZGlzcGxheTogZmxleDtcbi8vIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4vLyBmb250LXNpemU6IDEzLjJweDtcbi8vIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4vLyB6LWluZGV4OiA5OTk5O1xuLy8gb3ZlcmZsb3c6IGhpZGRlbjtcbi8vIGJveC1zaGFkb3c6IDBweCA4cHggMjhweCByZ2JhKDAsMCwwLC4xNik7XG4vLyBib3JkZXItcmFkaXVzOiA2cHg7XG4vLyBib3JkZXI6MXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KVxuLy8gfVxuXG46OnNlbGVjdGlvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkQ1QjI7XG59XG5cbjo6LW1vei1zZWxlY3Rpb24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZENUIyO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAuY29udGFpbmVyOjotd2Via2l0LXNjcm9sbGJhciAge1xuICAvLyB3aWR0aDowcHg7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5jb250YWluZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrICB7XG4gIC8vIGJhY2tncm91bmQ6ICNmZmY7IC8qIOiuvue9rua7muWKqOadoei9qOmBk+iDjOaZr+iJsiAqL1xufVxuXG4vLyAjTGVhcm5pbmdFbmdsaXNoMjAyMyAuY29udGFpbmVyOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4vLyAgIGJhY2tncm91bmQ6ICM4ODg7IC8qIOiuvue9rua7muWKqOadoea7keWdl+iDjOaZr+iJsiAqL1xuLy8gfVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAuRHJvcGRvd25NZW51SXRlbTpob3ZlciB7XG4gIFxuICBiYWNrZ3JvdW5kLWNvbG9yOiNGNkY2RjY7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5Ecm9wZG93bk1lbnVJdGVtOmZvY3VzLXZpc2libGUge1xuICBvdXRsaW5lOiBub25lO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyBoMSwjTGVhcm5pbmdFbmdsaXNoMjAyMyBoMiwjTGVhcm5pbmdFbmdsaXNoMjAyMyBoMyB7XG5cbiAgY29sb3I6IHJnYmEoMCwgMCwgMCk7XG5cbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgI1Njb3V0ZXJTZWxlY3Rpb24sICNMZWFybmluZ0VuZ2xpc2gyMDIzIC5tZXNzYWdlcz5kaXYgIHtcbiAgcGFkZGluZy1sZWZ0OjE4cHg7XG4gIHBhZGRpbmctcmlnaHQ6MThweDtcbn1cblxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAudXNlcklucHV0IHtcbm1hcmdpbjogMTBweCAwO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAuY29udGVudEJveCB7XG5vdmVyZmxvdzogc2Nyb2xsO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAubWVzc2FnZXMgPiAqID4gKiB7XG4gIC8vIG1hcmdpbjogMThweCAwO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAjU2NvdXRlck5hdiB7XG4vLyBkaXNwbGF5OiBmbGV4O1xuLy8ganVzdGlmeS1jb250ZW50OiBzdGFydDtcbi8vIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4vLyBwYWRkaW5nLXRvcDogMTJweDtcbi8vIHBhZGRpbmctYm90dG9tOiAxMnB4O1xuLy8gYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KTtcbi8vIHVzZXItc2VsZWN0OiBub25lO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAjU2NvdXRlck5hdiBpbWcge1xuLy8gd2lkdGg6IGF1dG87XG4vLyBoZWlnaHQ6IDI0cHg7XG4vLyBtYXJnaW4tcmlnaHQ6IDZweDtcbn1cblxuLm1lc3NhZ2VzIHVse1xuICBsaXN0LXN0eWxlOmRpc2M7XG4gIHBhZGRpbmctbGVmdDogMjBweDtcbn1cblxuLm1lc3NhZ2VzIG9se1xuICBsaXN0LXN0eWxlOmF1dG87XG4gIHBhZGRpbmctbGVmdDogMjBweDtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLmlzUGluIHBhdGh7XG4gIGZpbGw6ICNGMDhBMjQ7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5yaWdodEJ0bkJveCBidXR0b24ge1xuXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAucmlnaHRCdG5Cb3ggYnV0dG9uIHNwYW46bGFzdC1vZi10eXBle1xuICBcbn1cblxudGFibGUgdHIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBwYWRkaW5nOiA1cHg7XG59XG50YWJsZSB0aCwgdGFibGUgdGQge1xuICBwYWRkaW5nOiAxMHB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxudGFibGUgdGgge1xuICAvLyBmb250LXNpemU6IDE0cHg7XG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi8vIC8qIOa7muWKqOadoeS7peWPiua7muWKqOadoei9qOmBk+eahOWuveW6piAqL1xuLy8gOjotd2Via2l0LXNjcm9sbGJhciB7XG4vLyAgICAgd2lkdGg6IDEwcHg7XG4vLyB9XG5cbi8vIC8qIOa7muWKqOadoei9qOmBk+eahOagt+W8jyovXG4vLyA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICBcbi8vIH1cblxuLy8gLyog5rua5Yqo5p2h55qE5qC35byPICovXG4vLyA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbi8vICAgICBiYWNrZ3JvdW5kOiAjODg4OyBcbi8vIH1cblxuLy8gLyog5b2T5L2g6byg5qCH5oKs5YGc5Zyo5rua5Yqo5p2h5LiK5pe255qE5qC35byPICovXG4vLyA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHtcbi8vICAgICBiYWNrZ3JvdW5kOiAjNTU1OyBcbi8vIH1cblxuLyog5rua5Yqo5p2hICovXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvcml6b250YWwgeyAvKuawtOW5s+a7muWKqOadoeeahOagt+W8jyovXG4gIHdpZHRoOiA0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNDQ0NDQ0M7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNnB4O1xufVxuOjotd2Via2l0LXNjcm9sbGJhci10cmFjay1waWVjZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7IC8q5rua5Yqo5p2h55qE6IOM5pmv6aKc6ImyKi9cbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAwOyAvKua7muWKqOadoeeahOWchuinkuWuveW6piovXG59XG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgd2lkdGg6IDEwcHg7IC8q5rua5Yqo5p2h55qE5a695bqmKi9cbiAgaGVpZ2h0OiA4cHg7IC8q5rua5Yqo5p2h55qE6auY5bqmKi9cbn1cbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6dmVydGljYWwgeyAvKuWeguebtOa7muWKqOadoeeahOagt+W8jyovXG4gIGhlaWdodDogNTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzk5OTtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA0cHg7XG4gIG91dGxpbmU6IDJweCBzb2xpZCAjZmZmO1xuICBvdXRsaW5lLW9mZnNldDogLTJweDtcbiAgYm9yZGVyOiAycHggc29saWQgI2ZmZjtcbn1cbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIgeyAvKua7muWKqOadoeeahGhvdmVy5qC35byPKi9cbiAgaGVpZ2h0OiA1MHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWY5ZjlmO1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxucHJlIHtcbmJhY2tncm91bmQtY29sb3I6ICNmMGYwZjA7XG5ib3JkZXItcmFkaXVzOiA1cHg7XG5wYWRkaW5nOiAxNXB4O1xuYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbmNvbG9yOiAjMzMzO1xuZm9udC1mYW1pbHk6IENvdXJpZXIsIG1vbm9zcGFjZTtcbmxpbmUtaGVpZ2h0OiAxLjI7XG5vdmVyZmxvdy14OiBhdXRvO1xud2hpdGUtc3BhY2U6IHByZTtcbn1cblxuYmxvY2txdW90ZSB7XG5wYWRkaW5nOiAxMHB4IDIwcHg7XG5tYXJnaW46IDAgMCAyMHB4O1xuYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCAjZjFmMWYxO1xuY29sb3I6ICM2NjY7XG5iYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xufVxuXG5gO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0RGVmYXVsdFByb21wdCA9IGV4cG9ydHMuaGFuZGxlSGlnaHRsaWdodCA9IGV4cG9ydHMuZ2V0QW5raUNhcmRzID0gZXhwb3J0cy5oYW5kbGVQcm9tcHRWYXJpYWJsZXMgPSBleHBvcnRzLmdldFVuc3BsYXNoSW1hZ2VzID0gZXhwb3J0cy53aW5kb3dJbml0aWFsaXphdGlvbiA9IGV4cG9ydHMuZ2V0Q2xpcGJvYXJkID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCBnZXRDbGlwYm9hcmQgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC5yZWFkVGV4dCgpXG4gICAgICAgICAgICAudGhlbih0ZXh0ID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUodGV4dCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5leHBvcnRzLmdldENsaXBib2FyZCA9IGdldENsaXBib2FyZDtcbmNvbnN0IHdpbmRvd0luaXRpYWxpemF0aW9uID0gKGRhdGEpID0+IHtcbiAgICAvLyDorr7nva7nqpflj6PnmoTpu5jorqTkvY3nva5cbiAgICBpZiAoZGF0YS53aW5kb3dFbGVtZW50LmN1cnJlbnQgJiYgIWRhdGEuaXNQaW4pIHtcbiAgICAgICAgLy8gQ2hlY2sgdGhlIGJvdW5kYXJpZXNcbiAgICAgICAgY29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICBjb25zdCBlbGVtZW50V2lkdGggPSBkYXRhLndpbmRvd0VsZW1lbnQuY3VycmVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgZWxlbWVudEhlaWdodCA9IGRhdGEud2luZG93RWxlbWVudC5jdXJyZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgY29uc3QgbWluWCA9IDA7XG4gICAgICAgIGNvbnN0IG1pblkgPSAwO1xuICAgICAgICBjb25zdCBtYXhYID0gd2luZG93V2lkdGggLSBlbGVtZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IG1heFkgPSB3aW5kb3dIZWlnaHQgLSBlbGVtZW50SGVpZ2h0O1xuICAgICAgICBsZXQgbmV3WCwgbmV3WSA9IDA7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb25PYmplY3QgPSBkYXRhLnNlbGVjdGlvbi5nZXRSYW5nZUF0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgbmV3WCA9IHNlbGVjdGlvbk9iamVjdC54ICsgc2VsZWN0aW9uT2JqZWN0LndpZHRoICsgMTA7XG4gICAgICAgICAgICBuZXdZID0gc2VsZWN0aW9uT2JqZWN0LnkgKyBzZWxlY3Rpb25PYmplY3QuaGVpZ2h0ICsgMTA7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2xhbXBlZFggPSBNYXRoLm1heChtaW5YLCBNYXRoLm1pbihuZXdYLCBtYXhYKSk7XG4gICAgICAgIGNvbnN0IGNsYW1wZWRZID0gTWF0aC5tYXgobWluWSwgTWF0aC5taW4obmV3WSwgbWF4WSkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9wcy5zZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKSk7XG4gICAgICAgIGRhdGEud2luZG93RWxlbWVudC5jdXJyZW50LnN0eWxlLmxlZnQgPSBgJHtjbGFtcGVkWH1weGA7XG4gICAgICAgIGRhdGEud2luZG93RWxlbWVudC5jdXJyZW50LnN0eWxlLnRvcCA9IGAke2NsYW1wZWRZfXB4YDtcbiAgICB9XG4gICAgLy8gLy8g5re75Yqg5rua5Yqo5LqL5Lu277yM6K6p5raI5oGv5YiX6KGo6Ieq5Yqo5rua5Yqo5Yiw5bqV6YOoXG4gICAgLy8gZGF0YS5tZXNzYWdlc0xpc3QuY3VycmVudD8uYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVTY3JvbGwpO1xuICAgIC8vIHJldHVybiAoKSA9PiB7XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKCd1c2VFZmZlY3QgcmV0dXJuJyk7XG4gICAgLy8gICAgIGRhdGEubWVzc2FnZXNMaXN0LmN1cnJlbnQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlU2Nyb2xsKTtcbiAgICAvLyB9O1xuICAgIC8vIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbCgpIHtcbiAgICAvLyAgICAgaWYgKGRhdGEubWVzc2FnZXNMaXN0LmN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAvLyAgICAgICAgIGNvbnN0IGlzQXRCb3R0b20gPSBkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50Py5zY3JvbGxUb3AgKyBkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50LmNsaWVudEhlaWdodCA+PSBkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50LnNjcm9sbEhlaWdodCAtIDAuNTtcbiAgICAvLyAgICAgICAgIGlmIChpc0F0Qm90dG9tKSB7XG4gICAgLy8gICAgICAgICAgICAgLy8g5bey57uP5L2N5LqO5bqV6YOo77yM5LiN6ZyA6KaB6Ieq5Yqo5rua5YqoXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICAvLyBzY3JvbGxUb0JvdHRvbSgpXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgLy8g5pyq5L2N5LqO5bqV6YOo77yM5LiN5omn6KGM6Ieq5Yqo5rua5YqoXG4gICAgLy8gfVxufTtcbmV4cG9ydHMud2luZG93SW5pdGlhbGl6YXRpb24gPSB3aW5kb3dJbml0aWFsaXphdGlvbjtcbi8qKlxuICog6I635Y+WIFVuc3BsYXNoIOWbvueJh1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlXb3JkIC0g5qC55o2u5q2k5YWz6ZSu5a2X5pCc57Si5Zu+54mHXG4gKiBAcmV0dXJucyB7QXJyYXl9IOWbvueJh+WIl+ihqFxuICogQHRocm93cyB75byC5bi457G75Z6LfSDlvILluLjmj4/ov7BcbiAqL1xuY29uc3QgZ2V0VW5zcGxhc2hJbWFnZXMgPSAoa2V5V29yZCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIOivt+axgiBiYWNrZ3JvdW5kIOiOt+WPluaVsOaNrlxuICAgICAgICAvLyDkvb/nlKjplb/ov57mjqVcbiAgICAgICAgLy8gbGV0IHBvcnQgPSBicm93c2VyLnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgICAgIC8vICAgICBuYW1lOiAnZnJvbVBvcHVwQ2FyZFV0aWwnXG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIOS9v+eUqCBwb3N0TXMg5Y+R6YCB5L+h5oGvXG4gICAgICAgIGxldCBzZW5kaW5nID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnZ2V0VW5zcGxhc2hJbWFnZXMnLCAnbWVzc2FnZXMnOiAnJywgJ2tleVdvcmQnOiBrZXlXb3JkIH0pO1xuICAgICAgICBzZW5kaW5nLnRoZW4oKG1zZykgPT4ge1xuICAgICAgICAgICAgaWYgKG1zZy50eXBlID09PSAnc2VuZEltZ0RhdGEnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCdpbWdzJyBpbiBtc2cpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3Vuc3BsYXNoU2VhcmNoUGhvdG9zJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobXNnLmltZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgLy9lcnJvclxuICAgICAgICB9KTtcbiAgICAgICAgLy8gLy8g5o6l5pS25L+h5oGvXG4gICAgICAgIC8vIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKG1zZyA9PiB7XG4gICAgICAgIC8vICAgICBpZiAobXNnLnR5cGUgPT09ICdzZW5kSW1nRGF0YScpIHtcbiAgICAgICAgLy8gICAgICAgICBpZiAoJ2ltZ3MnIGluIG1zZykge1xuICAgICAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndW5zcGxhc2hTZWFyY2hQaG90b3MnKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgcmVzb2x2ZShtc2cuaW1ncylcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pXG4gICAgfSk7XG59O1xuZXhwb3J0cy5nZXRVbnNwbGFzaEltYWdlcyA9IGdldFVuc3BsYXNoSW1hZ2VzO1xuLyoqXG4gKiDlpITnkIYgUHJvbXB0IOS4reeahOWPmOmHj1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9tcHRTdHIgLSDpnIDopoHlpITnkIbnmoQgUHJvbXB0IOWtl+espuS4slxuICogQHBhcmFtIHtzdHJpbmd9IGtleVdvcmQgLSDnlKjmiLfmiYDpgInkuK3nmoTlhbPplK7lrZdcbiAqIEBwYXJhbSB7c3RyaW5nfSBTZW50ZW5jZSAtIOS7jue9kemhteS4reaPkOWPlueahOWFs+mUruWtl+aJgOWcqOeahOWPpeWtkFxuICogQHJldHVybnMge3N0cmluZ30g5aSE55CG5ZCO55qEIFByb21wdCDlrZfnrKbkuLJcbiAqIEB0aHJvd3Mge+W8guW4uOexu+Wei30g5byC5bi45o+P6L+wXG4gKi9cbmNvbnN0IGhhbmRsZVByb21wdFZhcmlhYmxlcyA9IChwcm9tcHRTdHIsIGtleVdvcmQsIFNlbnRlbmNlLCBMYW5nKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBsZXQgbmV3UHJvbXB0U3RyID0gcHJvbXB0U3RyO1xuICAgIC8vIOWkhOeQhuWFs+mUruWtl+WSjOWPpeWtkFxuICAgIG5ld1Byb21wdFN0ciA9IHByb21wdFN0ci5yZXBsYWNlKC9cXHtzZWxlY3Rpb25cXH0vZywga2V5V29yZCk7XG4gICAgbmV3UHJvbXB0U3RyID0gbmV3UHJvbXB0U3RyLnJlcGxhY2UoL1xce3NlbnRlbmNlXFx9L2csIFNlbnRlbmNlKTtcbiAgICAvLyDlpITnkIbor63oqIBcbiAgICBuZXdQcm9tcHRTdHIgPSBuZXdQcm9tcHRTdHIucmVwbGFjZSgvXFx7bmF0aXZlTGFuZ3VhZ2VcXH0vZywgTGFuZ1snY3VycmVudCddWyduYW1lJ10pO1xuICAgIG5ld1Byb21wdFN0ciA9IG5ld1Byb21wdFN0ci5yZXBsYWNlKC9cXHtjdXJyZW50TGFuZ3VhZ2VcXH0vZywgTGFuZ1snY3VycmVudCddWyduYW1lJ10pO1xuICAgIG5ld1Byb21wdFN0ciA9IG5ld1Byb21wdFN0ci5yZXBsYWNlKC9cXHt0YXJnZXRMYW5ndWFnZVxcfS9nLCBMYW5nWyd0YXJnZXQnXVsnbmFtZSddKTtcbiAgICAvLyDlpITnkIYgQW5raSDljZXor41cbiAgICBpZiAobmV3UHJvbXB0U3RyLmluZGV4T2YoJ3thbmtpQ2FyZHN9JykgPj0gMCkge1xuICAgICAgICAvLyDojrflj5bnm67moIfljaHniYdcbiAgICAgICAgbGV0IHJhbmRvbVZhbHVlcztcbiAgICAgICAgbGV0IGFua2lDYXJkc1N0ciA9ICcnO1xuICAgICAgICB5aWVsZCAoMCwgZXhwb3J0cy5nZXRBbmtpQ2FyZHMpKCkudGhlbigoY2FyZHMpID0+IHtcbiAgICAgICAgICAgIHJhbmRvbVZhbHVlcyA9IGNhcmRzO1xuICAgICAgICAgICAgaWYgKHJhbmRvbVZhbHVlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChyYW5kb21WYWx1ZXMubGVuZ3RoID4gNSkge1xuICAgICAgICAgICAgICAgICAgICAvLyDpmo/mnLrlj5YgWCDkuKrljaHniYdcbiAgICAgICAgICAgICAgICAgICAgLy8g5rex5ou36LSd5pWw57uE5Lul6YG/5YWN5L+u5pS55rqQ5pWw57uEXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNodWZmbGVkQXJyYXkgPSByYW5kb21WYWx1ZXMuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8g5L2/55SoIEZpc2hlci1ZYXRlcyDmtJfniYznrpfms5Xlr7nmlbDnu4Tov5vooYzmiZPkubFcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHNodWZmbGVkQXJyYXkubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgW3NodWZmbGVkQXJyYXlbaV0sIHNodWZmbGVkQXJyYXlbal1dID0gW3NodWZmbGVkQXJyYXlbal0sIHNodWZmbGVkQXJyYXlbaV1dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIOWPluWJjSB4IOS4quWFg+e0oOS9nOS4uue7k+aenFxuICAgICAgICAgICAgICAgICAgICByYW5kb21WYWx1ZXMgPSBzaHVmZmxlZEFycmF5LnNsaWNlKDAsIDUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g5bCG5Y2V6K+N5pu/5o2i5YiwIHByb21wdCDkuK1cbiAgICAgICAgICAgICAgICByYW5kb21WYWx1ZXMgPT09IG51bGwgfHwgcmFuZG9tVmFsdWVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYW5kb21WYWx1ZXMuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY2FyZC5maWVsZHMpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3RLZXkgPSBrZXlzWzBdO1xuICAgICAgICAgICAgICAgICAgICAvLyDmib7liLDljaHniYfmraPpnaJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZC5maWVsZHNba2V5c1tpXV0ub3JkZXIgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYW5raUNhcmRzU3RyICs9IGNhcmQuZmllbGRzW2ZpcnN0S2V5XS52YWx1ZSArICcsJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBuZXdQcm9tcHRTdHIgPSBuZXdQcm9tcHRTdHIucmVwbGFjZSgvXFx7YW5raUNhcmRzXFx9L2csIGFua2lDYXJkc1N0cik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1Byb21wdFN0cjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBuZXdQcm9tcHRTdHIgPSBuZXdQcm9tcHRTdHIucmVwbGFjZSgvXFx7YW5raUNhcmRzXFx9L2csICcnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdQcm9tcHRTdHI7XG59KTtcbmV4cG9ydHMuaGFuZGxlUHJvbXB0VmFyaWFibGVzID0gaGFuZGxlUHJvbXB0VmFyaWFibGVzO1xuLyoqXG4gKiDojrflj5YgQW5raSDljaHniYdcbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0W119IOi/lOWbnuWNoeeJh+eahOWvueixoeWIl+ihqFxuICogQHRocm93cyB75byC5bi457G75Z6LfSDlvILluLjmj4/ov7BcbiAqL1xuY29uc3QgZ2V0QW5raUNhcmRzID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIOWIpOaWreacrOWcsOaYr+WQpuWtmOacieacqui/h+acn+eahOaVsOaNrlxuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuZ2V0KHsgXCJhbmtpQ2FyZHNcIjogeyAnY2FyZHMnOiBbXSwgJ3RpbWUnOiAwIH0gfSkudGhlbigoaXRlbSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAvLyDnvJPlrZggMSDlsI/ml7ZcbiAgICAgICAgICAgIGlmIChpdGVtLmFua2lDYXJkcy5jYXJkcy5sZW5ndGggPiAwICYmIERhdGUubm93KCkgLSBpdGVtLmFua2lDYXJkcy50aW1lIDwgMzYwMCAqIDEwMDApIHtcbiAgICAgICAgICAgICAgICAvLyDoi6XmnKzlnLDmnInlj6/nlKjnmoTmlbDmja7vvIzliJnnm7TmjqXlpITnkIZcbiAgICAgICAgICAgICAgICByZXNvbHZlKGl0ZW0uYW5raUNhcmRzLmNhcmRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOiLpeacrOWcsOaXoOWPr+eUqOeahOaVsOaNru+8jOWImemAmui/hyBBbmtpXG4gICAgICAgICAgICAgICAgeWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW5raUFjdGlvbicsICdtZXNzYWdlcyc6IHsgJ2Fua2lfYWN0aW9uX3R5cGUnOiAnZmluZENhcmRzJywgJ2Fua2lfYXJndW1lbnRzJzogeyAncXVlcnknOiAnaXM6ZHVlIHByb3A6ZHVlPi0yIHByb3A6ZHVlPDMnIH0gfSwgfSkudGhlbigobWVzc2FnZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmVycm9yID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmoLnmja7ljaHniYcgSUQg5p+l6K+i5Y2h54mH5L+h5oGvXG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbmtpQWN0aW9uJywgJ21lc3NhZ2VzJzogeyAnYW5raV9hY3Rpb25fdHlwZSc6ICdjYXJkc0luZm8nLCAnYW5raV9hcmd1bWVudHMnOiB7ICdjYXJkcyc6IG1lc3NhZ2UucmVzdWx0IH0gfSwgfSkudGhlbigobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYXJkcyA9IG1lc3NhZ2UucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWwhuaVsOaNruWtmOWCqOWIsOacrOWcsO+8jOmZkOWItuacgOWkp+S/neWtmOaVsOmHj++8jOmBv+WFjeacrOWcsOWtmOWCqOepuumXtOi+vuWIsOS4iumZkFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5zZXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmtpQ2FyZHM6IHsgJ3RpbWUnOiBEYXRlLm5vdygpLCAnY2FyZHMnOiBjYXJkcy5zbGljZSgwLCAzMCkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2FyZHMuc2xpY2UoMCwgMzApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9lcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlj43ppojplJnor6/kv6Hmga9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLCAobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2Vycm9yXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn07XG5leHBvcnRzLmdldEFua2lDYXJkcyA9IGdldEFua2lDYXJkcztcbi8qKlxuICog5aSE55CG5a2X56ym5Liy77yM5a+55oyH5a6a5a2X56ym6K6+572u5qC35byP44CB54K55Ye75LqL5Lu2XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIOmcgOimgeWkhOeQhueahOWtl+espuS4slxuICogQHBhcmFtIHtzdHJpbmd9IGtleVdvcmQgLSDlvZPliY3pgInkuK3nmoTlrZfnrKZcbiAqIEByZXR1cm5zIHtzdHJpbmd9IOWkhOeQhuWQjueahCBQcm9tcHQg5a2X56ym5LiyXG4gKiBAdGhyb3dzIHvlvILluLjnsbvlnot9IOW8guW4uOaPj+i/sFxuICovXG5jb25zdCBoYW5kbGVIaWdodGxpZ2h0ID0gKHN0ciwga2V5V29yZCwgYW5raUNhcmRzLCB3aW5kb3dFbGVtZW50KSA9PiB7XG4gICAgaWYgKHN0ciA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbGV0IG5ld1N0ciA9IHN0cjtcbiAgICAvLyDlpITnkIYga2V5d29yZCDpq5jkuq5cbiAgICBuZXdTdHIgPSBuZXdTdHIucmVwbGFjZShuZXcgUmVnRXhwKGAoXnxbXipdKSgke2tleVdvcmR9KShbXipdfCQpYCwgJ2dpJyksIGZ1bmN0aW9uIChtYXRjaCwgcDEsIHAyLCBwMykge1xuICAgICAgICAvLyDlpoLmnpzlhbPplK7or43liY3lkI7msqHmnIkq77yM5YiZ5re75YqgKirvvIzlkKbliJnkv53nlZnljp/moLdcbiAgICAgICAgaWYgKHAxICE9PSAnKicgJiYgcDMgIT09ICcqJykge1xuICAgICAgICAgICAgcmV0dXJuIHAxICsgJyoqJyArIHAyICsgJyoqJyArIHAzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoOyAvLyDkuI3ov5vooYzmm7/mjaJcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIOWkhOeQhiBBbmtpIOWNleivjemrmOS6rlxuICAgIGNvbnN0IGNhcmRzID0gYW5raUNhcmRzO1xuICAgIGlmICh3aW5kb3dFbGVtZW50ICYmIGNhcmRzKSB7XG4gICAgICAgIC8vIOmBjeWOhuavj+S4gOS4quWNoeeJh1xuICAgICAgICBjYXJkcy5mb3JFYWNoKChjYXJkKSA9PiB7XG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNhcmQpO1xuICAgICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGNhcmQuZmllbGRzKTtcbiAgICAgICAgICAgIGxldCBmaXJzdEtleSA9IGtleXNbMF07XG4gICAgICAgICAgICAvLyDmib7liLDljaHniYfmraPpnaJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChjYXJkLmZpZWxkc1trZXlzW2ldXS5vcmRlciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdEtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNhcmRGcm9udFZhbHVlID0gY2FyZC5maWVsZHNbZmlyc3RLZXldLnZhbHVlO1xuICAgICAgICAgICAgaWYgKGNhcmRGcm9udFZhbHVlICE9PSBrZXlXb3JkKSB7XG4gICAgICAgICAgICAgICAgbmV3U3RyID0gbmV3U3RyLnJlcGxhY2UobmV3IFJlZ0V4cChjYXJkRnJvbnRWYWx1ZSwgJ2dpJyksIGA8bWFyaz4ke2NhcmRGcm9udFZhbHVlfTwvbWFyaz5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIH0sIDEwKTtcbiAgICAgICAgICAgIC8vIC8vIOWIm+W7uuS4gOS4queUqOS6juWMheijuSdvJ+eahDxzcGFuPuWFg+e0oFxuICAgICAgICAgICAgLy8gdmFyIHNwYW5FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgLy8gc3BhbkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWNhcmRJRCcsIGNhcmQuaWQpO1xuICAgICAgICAgICAgLy8gc3BhbkVsZW1lbnQuY2xhc3NOYW1lID0gJ2hlbGxvJztcbiAgICAgICAgICAgIC8vIHNwYW5FbGVtZW50LnN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gICAgICAgICAgICAvLyBzcGFuRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgICAgICAvLyBzcGFuRWxlbWVudC50ZXh0Q29udGVudCA9IGNhcmRGcm9udFZhbHVlO1xuICAgICAgICAgICAgLy8gLy8gbmV3U3RyID0gbmV3U3RyLnJlcGxhY2UoL28vZ2ksIHNwYW5FbGVtZW50Lm91dGVySFRNTCk7XG4gICAgICAgICAgICAvLyBuZXdTdHIgPSBuZXdTdHIucmVwbGFjZShuZXcgUmVnRXhwKGNhcmRGcm9udFZhbHVlLCAnZ2knKSwgc3BhbkVsZW1lbnQub3V0ZXJIVE1MKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOWvueS4iui/sOWFg+e0oOa3u+WKoOeCueWHu+S6i+S7tlxuICAgICAgICAvLyBsZXQgaGlnaHRsaWdodERvbSA9IHdpbmRvd0VsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaGVsbG8nKVxuICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IGhpZ2h0bGlnaHREb20ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gICAgIGhpZ2h0bGlnaHREb21baV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVIaWdodGxpZ2h0Q2xpY2spXG4gICAgICAgIC8vICAgICBoaWdodGxpZ2h0RG9tW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlSGlnaHRsaWdodENsaWNrKVxuICAgICAgICAvLyB9XG4gICAgfVxuICAgIHJldHVybiBuZXdTdHI7XG4gICAgLy8gcmV0dXJuICd0cnVlJ1xufTtcbmV4cG9ydHMuaGFuZGxlSGlnaHRsaWdodCA9IGhhbmRsZUhpZ2h0bGlnaHQ7XG4vKipcbiAqIOiOt+WPluezu+e7n+eahOm7mOiupCBQcm9tcHRcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlXb3JkIC0g5b2T5YmN6YCJ5Lit55qE5a2X56ymXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBQcm9tcHQg5a2X56ym5LiyXG4gKiBAdGhyb3dzIHvlvILluLjnsbvlnot9IOW8guW4uOaPj+i/sFxuICovXG5jb25zdCBnZXREZWZhdWx0UHJvbXB0ID0gKGtleVdvcmQpID0+IHtcbiAgICBsZXQgZ2V0VW5zcGxhc2hJbWFnZXMgPSB0cnVlO1xuICAgIGxldCB1c2VyUHJvbXB0ID0gYFxuXG4gICAgICAgIFBsZWFzZSBoZWxwIG1lIGxlYXJuIGFzIGEgZm9yZWlnbiBsYW5ndWFnZSB0ZWFjaGVyLiBTZW50ZW5jZXMgaW4gZXhhbXBsZXMgc2hvdWxkIG5vdCBiZSB0aGUgc2FtZSBhcyB0aGUgZ2l2ZW4gc2VudGVuY2UuXG5cbiAgICAgICAgRXhhbXBsZe+8mlxuICAgICAgICBcIlwiXCJcbiAgICAgICAgLSAgTWVhbmluZzogPEV4cGxhaW4gdGhlIG1lYW5pbmcgdXNpbmcge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgLSAgUGFydCBvZiBTcGVlY2g6IDxJbmRpY2F0ZSB0aGUgcGFydCBvZiBzcGVlY2ggdXNpbmcge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgXG4gICAgICAgICMjIE1lYW5pbmcgaW4gdGhlIHNlbnRlbmNlXG4gICAgICAgIC0gIDxFeHBsYWluIHRoZSBtZWFuaW5nIG9mIHRoZSB3b3JkIGluIHRoZSBzZW50ZW5jZSB1c2luZyB7bmF0aXZlTGFuZ3VhZ2V9PlxuICAgICAgICBcbiAgICAgICAgIyMgRXhhbXBsZSBTZW50ZW5jZXNcbiAgICAgICAgLSAgPHt0YXJnZXRMYW5ndWFnZX0gZXhhbXBsZSBzZW50ZW5jZT4gLSA8VHJhbnNsYXRpb24gaW4ge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgLSAgPHt0YXJnZXRMYW5ndWFnZX0gZXhhbXBsZSBzZW50ZW5jZT4gLSA8VHJhbnNsYXRpb24gaW4ge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgXG4gICAgICAgICMjIFRyYW5zbGF0aW9uIEV4ZXJjaXNlXG4gICAgICAgIC0gIDx7bmF0aXZlTGFuZ3VhZ2V9IHNlbnRlbmNlPlxuICAgICAgICAtICA8e25hdGl2ZUxhbmd1YWdlfSBzZW50ZW5jZT5cbiAgICAgICAgXG4gICAgICAgIFwiXCJcIiBcbiAgICAgICAgXG4gICAgICAgIFdvcmQ6e3NlbGVjdGlvbn0sIHNlbnRlbmNlOiB7c2VudGVuY2V9LFlvdSBtdXN0IHJlcGx5IGluIHRoZSBzcGVjaWZpZWQgbGFuZ3VhZ2VcblxuICAgICAgICBQbGVhc2Ugc3RhcnQgdGVhY2hpbmc6XG5cbiAgICAgICAgYDtcbiAgICAvLyDlhbPplK7lrZfplb/luqbovoPplb/ml7bvvIzmjInnhaflj6XlrZDov5vooYzlpITnkIZcbiAgICBpZiAoa2V5V29yZC5sZW5ndGggPiAyMCkge1xuICAgICAgICBnZXRVbnNwbGFzaEltYWdlcyA9IGZhbHNlO1xuICAgICAgICB1c2VyUHJvbXB0ID0gYFxuICAgICAgXG4gICAgICAgICAgICAgICAgICBBcyBhIGxhbmd1YWdlIHRlYWNoZXIsIEkgd2lsbCBwcm92aWRlIGFuIGV4cGxhbmF0aW9uIG9mIHRoZSBncmFtbWFyIGtub3dsZWRnZSBpbiB0aGUgZ2l2ZW4gc2VudGVuY2U6XG4gICAgICBcbiAgICAgICAgICAgICAgICAgIEV4YW1wbGU6XG4gICAgICAgICAgICAgICAgICBcIlwiXCJcbiAgICAgIFxuICAgICAgICAgICAgICAgICAgIyMgVHJhbnNsYXRpb25cbiAgICAgICAgICAgICAgICAgIDxUcmFuc2xhdGUgdG8ge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgIyMgR3JhbW1hclxuICAgICAgICAgICAgICAgICAgPC0gUG9pbnQ6IEV4cGxhaW4gaW4ge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgIFxuICAgICAgICAgICAgICAgICAgIyMgRXhhbXBsZXMgb2YgcmVsYXRlZCBncmFtbWFyXG4gICAgICAgICAgICAgICAgICAtICA8e3RhcmdldExhbmd1YWdlfSBleGFtcGxlIHNlbnRlbmNlPiAtIDxUcmFuc2xhdGlvbiBpbiB7bmF0aXZlTGFuZ3VhZ2V9PlxuICAgICAgICAgICAgICAgICAgLSAgPHt0YXJnZXRMYW5ndWFnZX0gZXhhbXBsZSBzZW50ZW5jZT4gLSA8VHJhbnNsYXRpb24gaW4ge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgIFxuICAgICAgICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIFNlbnRlbmNlOiB7c2VsZWN0aW9ufWA7XG4gICAgfVxuICAgIGNvbnN0IGRlZmF1bHRQcm9tcHQgPSB7XG4gICAgICAgICd0aXRsZSc6ICdEZWZhdWx0JywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZ2V0VW5zcGxhc2hJbWFnZXMsICd1c2VyUHJvbXB0JzogdXNlclByb21wdCxcbiAgICAgICAgJ2lkJzogJ0RlZmF1bHQnXG4gICAgfTtcbiAgICByZXR1cm4gZGVmYXVsdFByb21wdDtcbn07XG5leHBvcnRzLmdldERlZmF1bHRQcm9tcHQgPSBnZXREZWZhdWx0UHJvbXB0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZXREb25vdENsb3NlUG9wdXBDYXJkID0gZXhwb3J0cy5waW5Qb3B1cENhcmQgPSB2b2lkIDA7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHJlYWN0X2RvbV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuY29uc3QgUG9wdXBDYXJkXzEgPSByZXF1aXJlKFwiLi4vUG9wdXBDYXJkXCIpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCBjc3NpbmpzXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vY3NzaW5qc1wiKTtcbmNvbnN0IHN0eWxlZF9jb21wb25lbnRzXzEgPSByZXF1aXJlKFwic3R5bGVkLWNvbXBvbmVudHNcIik7XG5jb25zdCB1c2VySW5mb18xID0gcmVxdWlyZShcIi4uL2xpYi91c2VySW5mb1wiKTtcbmNvbnN0IGxhbmdfMSA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbmNvbnN0IGxvY2FsZV8xID0gcmVxdWlyZShcIi4uL2xpYi9sb2NhbGVcIik7XG5jb25zdCB1c2VySW5mb18yID0gcmVxdWlyZShcIi4uL2xpYi91c2VySW5mb1wiKTtcbi8vIGltcG9ydCB7IEJ1dHRvbiwgbWVzc2FnZSB9IGZyb20gJ2FudGQnO1xuY29uc3QgaWNvbnNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9pY29uc1wiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuY29uc3QgbGFuZ18yID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xuY29uc3QgdXRpbF8yID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG5jb25zdCBzdHlsZV8xID0gcmVxdWlyZShcIi4uL1BvcHVwQ2FyZC9zdHlsZVwiKTtcbmNvbnN0IGljb24xMjhfcG5nXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2Fzc2V0cy9pY29uMTI4LnBuZ1wiKSk7XG5jb25zdCBzdHlsZWRfY29tcG9uZW50c18yID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKSk7XG5jb25zdCBpc0ZpcmVmb3ggPSB0eXBlb2YgSW5zdGFsbFRyaWdnZXIgIT09ICd1bmRlZmluZWQnO1xuLy8g6K6w5b2V5b2T5YmN56qX5Y+j5piv5ZCmIFBpbiDkvY9cbmxldCBpc1BpbiA9IGZhbHNlO1xuLy8g6K6+572u5b2T5YmN56qX5Y+j5piv5ZCm5YWB6K645YWz6ZetXG5sZXQgZG9ub3RDbG9zZVBvcHVwQ2FyZCA9IGZhbHNlO1xuLy8g5Yid5aeL5YyW5Li75a655Zmo77yM5Li75a655Zmo55So5p2l5oyC5Zyo5YWo5bGA5qC35byP77yM5YyF5ous56ys5LiJ5pa557uE5Lu255qE5qC35byPXG5sZXQgTXlCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnX19qaWFuZy1zY291dGVyJyk7XG4vLyBjb25zb2xlLmxvZyhNeUJveCk7XG4vLyBjb250YWluZXIg5om/6L29IFVJIOe7hOS7tlxubGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29udGFpbmVyLmNsYXNzTmFtZSA9ICdjb250YWluZXInO1xuLy8g5L2/55SoIHNoYWRvdyDmnaXpmpTnprvmoLflvI9cbmxldCBzaGFkb3dSb290ID0gdW5kZWZpbmVkO1xuaWYgKE15Qm94ID09PSBudWxsIHx8IE15Qm94ID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyDlpoLmnpzkuI3lrZjlnKjlrrnlmahcbiAgICAvLyDliJvlu7rkuLvlrrnlmahcbiAgICBNeUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIE15Qm94LmlkID0gJ19famlhbmctc2NvdXRlcic7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5hcHBlbmRDaGlsZChNeUJveCk7XG4gICAgTXlCb3guc3R5bGUuZGlzcGxheSA9ICdub25lJzsgLy/pu5jorqTpmpDol49cbiAgICBzaGFkb3dSb290ID0gTXlCb3ggPT09IG51bGwgfHwgTXlCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IE15Qm94LmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290ID09PSBudWxsIHx8IHNoYWRvd1Jvb3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAvLyBBbnQg57uE5Lu25qC35byPXG4gICAgLy8gY29uc3QgYW50U3R5bGVzaGVldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAvLyBhbnRTdHlsZXNoZWV0LnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICAvLyBhbnRTdHlsZXNoZWV0LmhyZWYgPSAnaHR0cHM6Ly9jZG4uYm9vdGNkbi5uZXQvYWpheC9saWJzL2FudGQvNC4xNy4xL2FudGQubWluLmNzcyc7XG4gICAgLy8gc2hhZG93Um9vdC5hcHBlbmRDaGlsZChhbnRTdHlsZXNoZWV0KTtcbiAgICAvLyBUYWlsd2luZFxuICAgIGNvbnN0IHRhaWx3aW5kU3R5bGVzaGVldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICB0YWlsd2luZFN0eWxlc2hlZXQucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIHRhaWx3aW5kU3R5bGVzaGVldC5ocmVmID0gJ2h0dHBzOi8vdW5wa2cuY29tL3RhaWx3aW5kY3NzQF4yL2Rpc3QvdGFpbHdpbmQubWluLmNzcyc7XG4gICAgc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0YWlsd2luZFN0eWxlc2hlZXQpO1xuICAgIC8vIOWcqCBTaGFkb3cgRE9NIOS4rea3u+WKoOagt+W8j++8mlxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZS50ZXh0Q29udGVudCA9IHN0eWxlXzEucG9wdXBDYXJkU3R5bGU7XG4gICAgc2hhZG93Um9vdCA9PT0gbnVsbCB8fCBzaGFkb3dSb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGFkb3dSb290LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbmxldCBVU0VSX0lORk8gPSB7IHVzZXJJZDogJ3Vua25vdycsIHZlcmlmaWVkOiBmYWxzZSB9O1xubGV0IEFOS0lfSU5GTztcbmNvbnN0IHRoaXNHZXRVc2VySW5mbyA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICAgIFVTRVJfSU5GTyA9IHlpZWxkICgwLCB1dGlsXzEuZ2V0VXNlckluZm8pKCk7XG4gICAgLy8g6I635Y+WIEFua2kg54mM57uE5L+h5oGvXG4gICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnc2V0TW9kZWwnLCAnbWVzc2FnZXMnOiB7fSwgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIEFOS0lfSU5GTyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAvLyDmm7TmlrAgQW5raSBzdHlsZVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBBTktJX0lORk8ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwID0ge1xuICAgICAgICAgICAgICAgICAgICBcIm1vZGVsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBBTktJX0lORk9baV1bJ21vZGVsTmFtZSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjc3NcIjogdXRpbF8yLmNhcmRTdHlsZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvLyDojrflj5YgQW5raSDniYznu4Tkv6Hmga9cbiAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbmtpQWN0aW9uJywgJ21lc3NhZ2VzJzogeyAnYW5raV9hY3Rpb25fdHlwZSc6ICd1cGRhdGVNb2RlbFN0eWxpbmcnLCAnYW5raV9hcmd1bWVudHMnOiBwIH0sIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcbnRoaXNHZXRVc2VySW5mbygpO1xubGV0IHBvcnQgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgbmFtZTogJ2Zyb21Db250ZW50U2NyaXB0J1xufSk7XG4vLyDmjqXmlLYgYmFja2dyb3VuZCDmtojmga/vvIjnm67liY3mmK/pgJrov4fmtY/op4jlmajnmoTlj7PplK7oj5zljZXop6blj5HvvIlcbndlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKG1zZywgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICB2YXIgX2E7XG4gICAgLy8gY29uc29sZS5sb2coJ2NvbnRlbnQgc2NyaXB0IG9uTWVzc2FnZTonKTtcbiAgICAvLyBjb25zb2xlLmxvZyhtc2cpO1xuICAgIGlmIChtc2cudHlwZSA9PT0gJ29wZW4tc2NvdXRlcicpIHtcbiAgICAgICAgLy8g5aSE55CG56qX5Y+jXG4gICAgICAgIGlmIChNeUJveCAhPT0gbnVsbCAmJiBNeUJveCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyDlpoLmnpzlt7LlrZjlnKjlrrnlmahcbiAgICAgICAgICAgIGlmICgoKF9hID0gTXlCb3guc2hhZG93Um9vdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXInKSkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzkuI3lrZjlnKggUG9wdXBDYXJkXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9ICdjb250YWluZXInO1xuICAgICAgICAgICAgICAgIHNoYWRvd1Jvb3QgPT09IG51bGwgfHwgc2hhZG93Um9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5YGc5q2i5pen55qE5a+56K+dXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvLyDph43mlrDpk77mjqVcbiAgICAgICAgICAgICAgICBwb3J0ID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLmNvbm5lY3Qoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZnJvbUNvbnRlbnRTY3JpcHQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ1N0b3BUaGVDb252ZXJzYXRpb24nLCAnbWVzc2FnZXMnOiAnJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE15Qm94LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgLy8g56e76Zmk5pen5YaF5a6577yM6YG/5YWNIDIg5qyh5riy5p+T5re35p2C5Zyo5LiA6LW3XG4gICAgICAgICAgICAvLyBjb250YWluZXIucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfkuI3lrZjlnKggQm94IOWuueWZqCcpO1xuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gJ2NvbnRhaW5lcic7XG4gICAgICAgICAgICBzaGFkb3dSb290ID09PSBudWxsIHx8IHNoYWRvd1Jvb3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IGdldFNlbGVjdGlvbigpO1xuICAgICAgICAvLyDmmL7npLrnqpflj6NcbiAgICAgICAgaWYgKHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24ua2V5V29yZCAhPT0gJycpIHtcbiAgICAgICAgICAgIHNob3dQb3B1cENhcmQoeyAna2V5V29yZCc6IHNlbGVjdGlvbiA9PT0gbnVsbCB8fCBzZWxlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbGVjdGlvbi5rZXlXb3JkLCAnU2VudGVuY2UnOiBzZWxlY3Rpb24uc2VudGVuY2UgfSwgd2luZG93LmdldFNlbGVjdGlvbigpLCBjb250YWluZXIsIHNoYWRvd1Jvb3QsIGlzUGluLCBtc2cucnVuUHJvbXB0KTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzZWxlY3Rpb25jaGFuZ2UnLCBoYW5kbGVTZWxlY3Rpb25jaGFuZ2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2V1cCk7XG4gICAgICAgIC8vIOebkeWQrOmhtemdoueCueWHu+S6i+S7tlxuICAgICAgICBkb2N1bWVudC5vbm1vdXNlZG93biA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgaWYgKE15Qm94ICE9PSB1bmRlZmluZWQgJiYgTXlCb3ggIT09IG51bGwgJiYgIWlzUGluICYmICFkb25vdENsb3NlUG9wdXBDYXJkKSB7XG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c54K55Ye755qE5LiN5piv5o+S5Lu256qX5Y+j5Y+K5YW25a2Q5YWD57Sg77yM5YiZ5YWz6Zet56qX5Y+jXG4gICAgICAgICAgICAgICAgaWYgKE15Qm94ICE9PSBldmVudC50YXJnZXQgJiYgIU15Qm94LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g6ZqQ6JeP56qX5Y+jXG4gICAgICAgICAgICAgICAgICAgIChfYSA9IGNvbnRhaW5lci5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2VsZWN0aW9uY2hhbmdlJywgaGFuZGxlU2VsZWN0aW9uY2hhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNldXApO1xuICAgICAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnU3RvcFRoZUNvbnZlcnNhdGlvbicsICdtZXNzYWdlcyc6ICcnIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29udGFpbmVyLm9ubW91c2Vkb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAvLyDpmpDol48gc2V0QW5raVNwYWNlQnV0dG9uXG4gICAgICAgICAgICBjb25zdCBjb250ZXh0Qm94ID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRleHRCb3gyJylbMF07XG4gICAgICAgICAgICBpZiAoY29udGV4dEJveCkge1xuICAgICAgICAgICAgICAgIC8vIOeCueWHu+eahOS4jeaYryBzZXRBbmtpU3BhY2VCdXR0b24g5pe25omN6ZqQ6JePXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHRCb3ggIT09IGV2ZW50LnRhcmdldCAmJiAhY29udGV4dEJveC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIChfYSA9IGNvbnRleHRCb3gucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZUNoaWxkKGNvbnRleHRCb3gpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59KTtcbi8vIOaYvuekuuW6lOeUqOeql+WPo1xuZnVuY3Rpb24gc2hvd1BvcHVwQ2FyZChkYXRhLCBtc2csIE15Qm94LCBzaGFkb3dSb290LCBpc1BpbiwgcnVuUHJvbXB0KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgbGV0IGxhbmcgPSB5aWVsZCAoMCwgbGFuZ18xLmZldGNoY3VycmVudExhbmd1YWdlKSgpO1xuICAgICAgICByZWFjdF9kb21fMS5kZWZhdWx0LnJlbmRlcihyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuU3RyaWN0TW9kZSwgbnVsbCxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGxvY2FsZV8xLkN1cnJlbnRMYW5ndWFnZUNvbnRleHQuUHJvdmlkZXIsIHsgdmFsdWU6IGxhbmcgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudCh1c2VySW5mb18yLlVzZXJJbmZvQ29udGV4dC5Qcm92aWRlciwgeyB2YWx1ZTogeyB1c2VyOiBVU0VSX0lORk8sIGFua2k6IEFOS0lfSU5GTyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGNzc2luanNfMS5TdHlsZVByb3ZpZGVyLCB7IGNvbnRhaW5lcjogc2hhZG93Um9vdCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoc3R5bGVkX2NvbXBvbmVudHNfMS5TdHlsZVNoZWV0TWFuYWdlciwgeyB0YXJnZXQ6IHNoYWRvd1Jvb3QgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChQb3B1cENhcmRfMS5Qb3B1cENhcmQsIHsgZGF0YTogZGF0YSwgc2VsZWN0aW9uOiBtc2csIHJ1blByb21wdDogcnVuUHJvbXB0LCBpc1BpbjogaXNQaW4gfSkpKSkpKSwgTXlCb3gpO1xuICAgIH0pO1xufVxuLy8gaW50ZXJmYWNlIFBvcHVwQ2FyZENvbnRleHRQcm9wcyB7XG4vLyAgIGRhdGE6IGFueTtcbi8vICAgc2VsZWN0aW9uOiBhbnk7XG4vLyAgIHJ1blByb21wdDogYm9vbGVhbjtcbi8vIH1cbi8vIGZ1bmN0aW9uIFBvcHVwQ2FyZENvbnRleHQocHJvcHM6IFBvcHVwQ2FyZENvbnRleHRQcm9wcykge1xuLy8gICBjb25zdCBbdXNlckluZm8sIHNldFVzZXJJbmZvXSA9IHVzZVN0YXRlPHVzZXJJbmZvVHlwZSB8IG51bGw+KG51bGwpO1xuLy8gICBjb25zdCBbbGFuZywgc2V0TGFuZ10gPSB1c2VTdGF0ZTxhbnk+KG51bGwpO1xuLy8gICB1c2VFZmZlY3QoKCkgPT4ge1xuLy8gICAgIGFzeW5jIGZ1bmN0aW9uIGZldGNoVXNlckluZm8oKSB7XG4vLyAgICAgICBjb25zdCBpbmZvID0gYXdhaXQgZ2V0VXNlckluZm8oKTtcbi8vICAgICAgIGNvbnN0IGxhbmcgPSBhd2FpdCBmZXRjaGN1cnJlbnRMYW5ndWFnZSgpXG4vLyAgICAgICBzZXRMYW5nKGxhbmcpXG4vLyAgICAgICBzZXRVc2VySW5mbyhpbmZvKTtcbi8vICAgICB9XG4vLyAgICAgZmV0Y2hVc2VySW5mbygpO1xuLy8gICB9LCBbXSk7ICAvLyDot5HkuIDmrKHvvIzkuI3kvp3otZbku7vkvZXlpJbpg6jlj5jph49cbi8vICAgcmV0dXJuIChcbi8vICAgICA8Q3VycmVudExhbmd1YWdlQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17bGFuZ30+XG4vLyAgICAgICA8VXNlckluZm9Db250ZXh0LlByb3ZpZGVyIHZhbHVlPXtVU0VSX0lORk99PlxuLy8gICAgICAgICA8U3R5bGVQcm92aWRlciBjb250YWluZXI9e3NoYWRvd1Jvb3R9PlxuLy8gICAgICAgICAgIDxTdHlsZVNoZWV0TWFuYWdlciB0YXJnZXQ9e3NoYWRvd1Jvb3R9PlxuLy8gICAgICAgICAgICAgPFBvcHVwQ2FyZCBkYXRhPXtwcm9wcy5kYXRhfSBzZWxlY3Rpb249e3Byb3BzLnNlbGVjdGlvbn0gcnVuUHJvbXB0PXtwcm9wcy5ydW5Qcm9tcHR9IGlzUGluPXtpc1Bpbn0gLz5cbi8vICAgICAgICAgICA8L1N0eWxlU2hlZXRNYW5hZ2VyPlxuLy8gICAgICAgICA8L1N0eWxlUHJvdmlkZXI+XG4vLyAgICAgICA8L1VzZXJJbmZvQ29udGV4dC5Qcm92aWRlcj5cbi8vICAgICA8L0N1cnJlbnRMYW5ndWFnZUNvbnRleHQuUHJvdmlkZXI+XG4vLyAgIClcbi8vIH1cbmNvbnN0IHBpblBvcHVwQ2FyZCA9ICh2YWx1ZSkgPT4ge1xuICAgIGlzUGluID0gdmFsdWU7XG59O1xuZXhwb3J0cy5waW5Qb3B1cENhcmQgPSBwaW5Qb3B1cENhcmQ7XG5jb25zdCBzZXREb25vdENsb3NlUG9wdXBDYXJkID0gKHZhbHVlKSA9PiB7XG4gICAgZG9ub3RDbG9zZVBvcHVwQ2FyZCA9IHZhbHVlO1xufTtcbmV4cG9ydHMuc2V0RG9ub3RDbG9zZVBvcHVwQ2FyZCA9IHNldERvbm90Q2xvc2VQb3B1cENhcmQ7XG5sZXQgaXNUZXh0U2VsZWN0ZWQgPSBmYWxzZTtcbmNvbnN0IGhhbmRsZVNlbGVjdGlvbmNoYW5nZSA9ICgpID0+IHtcbiAgICAvLyBsZXQgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgIC8vIGlmIChzZWxlY3Rpb24pIHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKCdzZWxlY3Rpb24udG9TdHJpbmcoKTonKTtcbiAgICAvLyAgIGNvbnNvbGUubG9nKHNlbGVjdGlvbi50b1N0cmluZygpKTtcbiAgICAvLyAgIGlzVGV4dFNlbGVjdGVkID0gc2VsZWN0aW9uLnRvU3RyaW5nKCkubGVuZ3RoID4gMDtcbiAgICAvLyB9XG59O1xuY29uc3QgaGFuZGxlTW91c2V1cCA9IChldmVudCkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVNb3VzZXVwJyk7XG4gICAgLy8gY29uc29sZS5sb2coaXNUZXh0U2VsZWN0ZWQpO1xuICAgIC8vIGNvbnNvbGUubG9nKGRvbm90Q2xvc2VQb3B1cENhcmQpO1xuICAgIHZhciBfYTtcbiAgICAvLyDojrflj5bnlKjmiLflnKjlrr/kuLvnvZHpobXkuIrpgInkuK3nmoTlhoXlrrlcbiAgICBjb25zdCBzZWxlY3Rpb24gPSBnZXRTZWxlY3Rpb24oKTtcbiAgICBpZiAoc2VsZWN0aW9uKSB7XG4gICAgICAgIGlzVGV4dFNlbGVjdGVkID0gc2VsZWN0aW9uLnNlbGVjdGlvbi50b1N0cmluZygpLmxlbmd0aCA+IDA7XG4gICAgfVxuICAgIGlmIChpc1RleHRTZWxlY3RlZCAmJiAhZG9ub3RDbG9zZVBvcHVwQ2FyZCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnaXNUZXh0U2VsZWN0ZWQgJiYgIWRvbm90Q2xvc2VQb3B1cENhcmQnKTtcbiAgICAgICAgaWYgKE15Qm94ICE9PSBldmVudC50YXJnZXQgJiYgIShNeUJveCA9PT0gbnVsbCB8fCBNeUJveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogTXlCb3guY29udGFpbnMoZXZlbnQudGFyZ2V0KSkpIHtcbiAgICAgICAgICAgIC8vIOWcqCBQb3B1cENhcmQg6IyD5Zu05aSW6Kem5Y+RXG4gICAgICAgICAgICBpc1RleHRTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgLy8g5YGc5q2i5pen55qE5a+56K+dXG4gICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnU3RvcFRoZUNvbnZlcnNhdGlvbicsICdtZXNzYWdlcyc6ICcnIH0pO1xuICAgICAgICAgICAgLy8g5pi+56S656qX5Y+jXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uICYmIChzZWxlY3Rpb24gPT09IG51bGwgfHwgc2VsZWN0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZWxlY3Rpb24ua2V5V29yZC5sZW5ndGgpID4gMCAmJiAoKF9hID0gc2VsZWN0aW9uLnNlbGVjdGlvbi5hbmNob3JOb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eubm9kZU5hbWUpID09PSAnI3RleHQnKSB7XG4gICAgICAgICAgICAgICAgc2hvd1BvcHVwQ2FyZCh7ICdrZXlXb3JkJzogc2VsZWN0aW9uID09PSBudWxsIHx8IHNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VsZWN0aW9uLmtleVdvcmQsICdTZW50ZW5jZSc6IHNlbGVjdGlvbi5zZW50ZW5jZSB9LCB3aW5kb3cuZ2V0U2VsZWN0aW9uKCksIGNvbnRhaW5lciwgc2hhZG93Um9vdCwgaXNQaW4sIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8g5ZyoIFBvcHVwQ2FyZCDojIPlm7TlhoXop6blj5FcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFRleHQ7XG4gICAgICAgICAgICAvLyDmmL7npLrlrozlvaLloavnqbrmk43kvZzmjInpkq5cbiAgICAgICAgICAgIGlmIChpc0ZpcmVmb3gpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFRleHQgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFRleHQgPSBzaGFkb3dSb290LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0U3RyaW5nID0gc2VsZWN0ZWRUZXh0LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBjb25zdCBzZW50ZW5jZSA9ICcnO1xuICAgICAgICAgICAgY29uc3QgUG9wdXBDYXJkQ29udGFpbmVyID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRhaW5lcicpWzBdO1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZXNCb3ggPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVzc2FnZXMnKVswXTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHNlbGVjdGVkVGV4dCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlc0JveD8uY29udGFpbnMoc2VsZWN0ZWRUZXh0LmJhc2VOb2RlLnBhcmVudE5vZGUgYXMgTm9kZSkpO1xuICAgICAgICAgICAgbGV0IGlzSW5NZXNzYWdlcyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkVGV4dC5iYXNlTm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlc0JveCA9PT0gc2VsZWN0ZWRUZXh0LmJhc2VOb2RlLnBhcmVudE5vZGUgfHwgKG1lc3NhZ2VzQm94ID09PSBudWxsIHx8IG1lc3NhZ2VzQm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNzYWdlc0JveC5jb250YWlucyhzZWxlY3RlZFRleHQuYmFzZU5vZGUucGFyZW50Tm9kZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8v5ZyoIG1lc3NhZ2VzIOWuueWZqOWGheaTjeS9nO+8jOWImeaYvuekuuaTjeS9nOaMiemSrlxuICAgICAgICAgICAgICAgICAgICBpc0luTWVzc2FnZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChQb3B1cENhcmRDb250YWluZXIgJiYgc2VsZWN0ZWRUZXh0LnR5cGUgPT09ICdSYW5nZScgJiYgIWNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY29udGV4dEJveDInKSkge1xuICAgICAgICAgICAgICAgIGxldCBjb250ZXh0Qm94MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGNvbnRleHRCb3gyLmNsYXNzTmFtZSA9ICdjb250ZXh0Qm94Mic7XG4gICAgICAgICAgICAgICAgY29udGV4dEJveDIuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICAgICAgICAgIFBvcHVwQ2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjb250ZXh0Qm94Mik7XG4gICAgICAgICAgICAgICAgbGV0IHJhbmdlID0gc2VsZWN0ZWRUZXh0LmdldFJhbmdlQXQoMCk7XG4gICAgICAgICAgICAgICAgcmVhY3RfZG9tXzEuZGVmYXVsdC5yZW5kZXIocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQodXNlckluZm9fMi5Vc2VySW5mb0NvbnRleHQuUHJvdmlkZXIsIHsgdmFsdWU6IHsgdXNlcjogVVNFUl9JTkZPLCBhbmtpOiBBTktJX0lORk8gfSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChzdHlsZWRfY29tcG9uZW50c18xLlN0eWxlU2hlZXRNYW5hZ2VyLCB7IHRhcmdldDogc2hhZG93Um9vdCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoVG9vbEJhciwgeyBzZWxlY3RlZFRleHQ6IHNlbGVjdGVkVGV4dC5nZXRSYW5nZUF0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBzZWxlY3RlZFRleHRTdHJpbmc6IHNlbGVjdGVkVGV4dFN0cmluZywgcmFuZ2U6IHJhbmdlIH0pKSksIGNvbnRleHRCb3gyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFxuICAgICAgICB9XG4gICAgfVxufTtcbmNvbnN0IGdldFNlbGVjdGlvbiA9IChpc0luU2hhZG93KSA9PiB7XG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2Y7XG4gICAgbGV0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICBpZiAoaXNJblNoYWRvdykge1xuICAgICAgICBzZWxlY3Rpb24gPSBzaGFkb3dSb290LmdldFNlbGVjdGlvbigpO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0aW9uICE9PSBudWxsKSB7XG4gICAgICAgIC8vIOW9k+WJjemAieS4reeahOaWh+Wtl1xuICAgICAgICBsZXQga2V5V29yZCA9IHNlbGVjdGlvbi50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgICAgLy8g6YCJ5Lit5paH5a2X5omA5Zyo55qE5q616JC9XG4gICAgICAgIGxldCBzZW50ZW5jZSA9IChfYiA9IChfYSA9IHNlbGVjdGlvbi5hbmNob3JOb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudGV4dENvbnRlbnQpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6ICcnO1xuICAgICAgICBpZiAoc2VudGVuY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VudGVuY2UgPSAnJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbnRlbmNlID0gc2VudGVuY2UubGVuZ3RoIDw9IGtleVdvcmQubGVuZ3RoID8gKF9mID0gKF9lID0gKF9kID0gKF9jID0gc2VsZWN0aW9uLmFuY2hvck5vZGUpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLmlubmVyVGV4dCkgIT09IG51bGwgJiYgX2YgIT09IHZvaWQgMCA/IF9mIDogJycgOiBzZW50ZW5jZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyAnc2VsZWN0aW9uJzogc2VsZWN0aW9uLCAna2V5V29yZCc6IGtleVdvcmQsICdzZW50ZW5jZSc6IHNlbnRlbmNlIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuY29uc3Qgc2V0QW5raVNwYWNlID0gKHJhbmdlLCBzZWxlY3RlZFRleHQsIGV2ZW50LCBpc0FkZE5ldykgPT4ge1xuICAgIGxldCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IGFua2lTcGFjZSA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhbmtpU3BhY2UnKTtcbiAgICAvLyDojrflj5blvZPliY3mnIDlpKfnmoQgaW5kZXhcbiAgICBsZXQgbWF4SW5kZXggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYW5raVNwYWNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRoaXNJbmRleCA9IE51bWJlcihhbmtpU3BhY2VbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykpO1xuICAgICAgICBpZiAodGhpc0luZGV4ID4gbWF4SW5kZXgpIHtcbiAgICAgICAgICAgIG1heEluZGV4ID0gdGhpc0luZGV4O1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBudW1iZXIgPSBtYXhJbmRleCA9PT0gMCA/IDEgOiBtYXhJbmRleDtcbiAgICBpZiAoaXNBZGROZXcpIHtcbiAgICAgICAgbnVtYmVyID0gbWF4SW5kZXggKyAxO1xuICAgIH1cbiAgICBzcGFuLnRleHRDb250ZW50ID0gJ3t7YycgKyBudW1iZXIgKyAnOjonICsgc2VsZWN0ZWRUZXh0ICsgJ319JztcbiAgICBzcGFuLmNsYXNzTmFtZSA9ICdhbmtpU3BhY2UnO1xuICAgIHNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgbnVtYmVyLnRvU3RyaW5nKCkpO1xuICAgIHNwYW4ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyDmgaLlpI3kuLrpu5jorqTmoLflvI9cbiAgICAgICAgLy8gc3Bhbi5pbm5lclRleHRcbiAgICAgICAgaWYgKHNwYW4udGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgIC8vIGxldCBvbGRUZXh0ID0gc3Bhbi50ZXh0Q29udGVudFxuICAgICAgICAgICAgLy8gb2xkVGV4dCA9IG9sZFRleHQucmVwbGFjZSgne3tjMTo6JywgJycpXG4gICAgICAgICAgICAvLyBvbGRUZXh0ID0gb2xkVGV4dC5yZXBsYWNlKCd9fScsICcnKVxuICAgICAgICAgICAgdmFyIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc2VsZWN0ZWRUZXh0KTtcbiAgICAgICAgICAgIChfYSA9IHNwYW4ucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlcGxhY2VDaGlsZCh0ZXh0Tm9kZSwgc3Bhbik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJhbmdlID09PSBudWxsIHx8IHJhbmdlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYW5nZS5kZWxldGVDb250ZW50cygpO1xuICAgIHJhbmdlID09PSBudWxsIHx8IHJhbmdlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYW5nZS5pbnNlcnROb2RlKHNwYW4pO1xufTtcbmNvbnN0IFN0eWxlZEJ1dHRvbiA9IHN0eWxlZF9jb21wb25lbnRzXzIuZGVmYXVsdC5idXR0b24gYFxuICAgIFxuICAgIHdpZHRoOiAxOHB4O1xuICAgIGhlaWdodDogMThweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICBwYWRkaW5nOiAycHg7XG4gICAgXG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDU5LDAuMDUxKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICB9XG5cbiAgICAke3Byb3BzID0+IHByb3BzLiRkaXNhYmxlICYmICgwLCBzdHlsZWRfY29tcG9uZW50c18yLmNzcykgYFxuICAgICAgb3BhY2l0eTogMC41O1xuICAgICAgY3Vyc29yOiBoZWxwO1xuICAgIGB9XG5cbiAgICAvLyAke3Byb3BzID0+ICFwcm9wcy4kZGlzYWJsZSAmJiAoMCwgc3R5bGVkX2NvbXBvbmVudHNfMi5jc3MpIGBcbiAgICAvLyAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICAvLyBgfVxuXG5cbmA7XG5jb25zdCBJY29uQnV0dG9uID0gc3R5bGVkX2NvbXBvbmVudHNfMi5kZWZhdWx0LmJ1dHRvbiBgXG4gICAgXG4gICAgd2lkdGg6IDE2cHg7XG4gICAgaGVpZ2h0OiAxNnB4O1xuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIG9wYWNpdHk6IDAuODtcbiAgICB9XG5gO1xuZnVuY3Rpb24gVG9vbEJhcihwcm9wcykge1xuICAgIGNvbnN0IFtzaG93TWVudSwgc2V0U2hvd01lbnVdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHRydWUpO1xuICAgIGNvbnN0IENvbnRleHRCb3ggPSAoMCwgcmVhY3RfMS51c2VSZWYpKG51bGwpO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gKDAsIHVzZXJJbmZvXzEudXNlVXNlckluZm9Db250ZXh0KSgpO1xuICAgIC8vIGxldCBwb3J0RnJvbU1lbnU6IGFueVxuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhzaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250YWluZXInKSk7XG4gICAgICAgIGNvbnN0IGNvbnRleHRCb3ggPSBDb250ZXh0Qm94LmN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IHBvcHVwQ2FyZCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjTGVhcm5pbmdFbmdsaXNoMjAyMycpO1xuICAgICAgICBjb25zdCBQb3B1cENhcmRDb250YWluZXIgPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGFpbmVyJylbMF07XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzQm94ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlcycpO1xuICAgICAgICAvL+iuvue9ruaMiemSrueahOS9jee9rlxuICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRYID0gcHJvcHMuc2VsZWN0ZWRUZXh0Lng7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dFkgPSBwcm9wcy5zZWxlY3RlZFRleHQueTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0V2lkdGggPSBwcm9wcy5zZWxlY3RlZFRleHQud2lkdGg7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dEhlaWdodCA9IHByb3BzLnNlbGVjdGVkVGV4dC5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IGJ1dHRvblggPSAoY29udGV4dEJveCA9PT0gbnVsbCB8fCBjb250ZXh0Qm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb250ZXh0Qm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLngpIHx8IDA7XG4gICAgICAgIGNvbnN0IGJ1dHRvblkgPSAoY29udGV4dEJveCA9PT0gbnVsbCB8fCBjb250ZXh0Qm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb250ZXh0Qm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnkpIHx8IDA7XG4gICAgICAgIC8vIOacgOWkpyBYIOWAvFxuICAgICAgICBjb25zdCBtYXhYID0gKChwb3B1cENhcmQgPT09IG51bGwgfHwgcG9wdXBDYXJkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwb3B1cENhcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpIHx8IDApIC0gY29udGV4dEJveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCAtIDIwO1xuICAgICAgICBjb25zdCBtZXNzYWdlQm94SGVpZ2h0ID0gbWVzc2FnZXNCb3ggPT09IG51bGwgfHwgbWVzc2FnZXNCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc3NhZ2VzQm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgY29uc3QgY29udGFpbmVyQm94SGVpZ2h0ID0gUG9wdXBDYXJkQ29udGFpbmVyID09PSBudWxsIHx8IFBvcHVwQ2FyZENvbnRhaW5lciA9PT0gdm9pZCAwID8gdm9pZCAwIDogUG9wdXBDYXJkQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gbWVzc2FnZUJveEhlaWdodCA+IGNvbnRhaW5lckJveEhlaWdodCA/IG1lc3NhZ2VCb3hIZWlnaHQgKyA2MCA6IGNvbnRhaW5lckJveEhlaWdodDtcbiAgICAgICAgY29uc3QgbWluWSA9IDAgLSBoZWlnaHQ7XG4gICAgICAgIGxldCBsZWZ0ID0gc2VsZWN0ZWRUZXh0WCAtIGJ1dHRvblggKyBzZWxlY3RlZFRleHRXaWR0aCAtIDYwO1xuICAgICAgICAvLyBsZWZ0ID0gbGVmdCA+IG1heFggPyBtYXhYIDogbGVmdFxuICAgICAgICBsZWZ0ID0gTWF0aC5tYXgoMTAsIE1hdGgubWluKG1heFgsIGxlZnQpKTtcbiAgICAgICAgbGV0IHRvcCA9IHNlbGVjdGVkVGV4dFkgLSBidXR0b25ZIC0gNDA7XG4gICAgICAgIC8vIHRvcCA9IHRvcCA8IG1pblkgPyBtaW5ZIDogdG9wXG4gICAgICAgIHRvcCA9IE1hdGgubWF4KG1pblksIE1hdGgubWluKDYwLCB0b3ApKTtcbiAgICAgICAgLy8gY29udGV4dEJveDIhLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xuICAgICAgICAvLyBjb250ZXh0Qm94IS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgICAgICAgY29udGV4dEJveC5zdHlsZS5sZWZ0ID0gbGVmdC50b1N0cmluZygpICsgJ3B4JztcbiAgICAgICAgY29udGV4dEJveC5zdHlsZS50b3AgPSB0b3AudG9TdHJpbmcoKSArICdweCc7XG4gICAgICAgIHNldFNob3dNZW51KHRydWUpO1xuICAgIH0sIFtdKTtcbiAgICBjb25zdCBoYW5kbGVTZXRBbmtpU3BhY2VCdXR0b25DbGljayA9IChldmVudCwgaXNBZGROZXcpID0+IHtcbiAgICAgICAgc2V0QW5raVNwYWNlKHByb3BzLnJhbmdlLCBwcm9wcy5zZWxlY3RlZFRleHRTdHJpbmcsIGV2ZW50LCBpc0FkZE5ldyk7XG4gICAgICAgIC8vIENvbnRleHRCb3guY3VycmVudCEucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQoQ29udGV4dEJveC5jdXJyZW50ISlcbiAgICAgICAgc2V0U2hvd01lbnUoZmFsc2UpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlRm9sbG93VXBNZW51Q2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBQb3B1cENhcmRDb250YWluZXIgPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGFpbmVyJylbMF07XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzQm94ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlcycpO1xuICAgICAgICBjb25zdCBzZW50ZW5jZSA9IGdldFNlbGVjdGlvbih0cnVlKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0WCA9IHByb3BzLnNlbGVjdGVkVGV4dC54O1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRZID0gcHJvcHMuc2VsZWN0ZWRUZXh0Lnk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dFdpZHRoID0gcHJvcHMuc2VsZWN0ZWRUZXh0LndpZHRoO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRIZWlnaHQgPSBwcm9wcy5zZWxlY3RlZFRleHQuaGVpZ2h0O1xuICAgICAgICBjb25zdCBmb2xsb3dVcE1lbnVCb3hYID0gKG1lc3NhZ2VzQm94ID09PSBudWxsIHx8IG1lc3NhZ2VzQm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNzYWdlc0JveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS54KSB8fCAwO1xuICAgICAgICBjb25zdCBmb2xsb3dVcE1lbnVCb3hZID0gKChtZXNzYWdlc0JveCA9PT0gbnVsbCB8fCBtZXNzYWdlc0JveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWVzc2FnZXNCb3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueSkgfHwgMCkgKyAoKG1lc3NhZ2VzQm94ID09PSBudWxsIHx8IG1lc3NhZ2VzQm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNzYWdlc0JveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQpIHx8IDApO1xuICAgICAgICBjb25zdCBmb2xsb3dVcE1lbnVCb3hXaWR0aCA9IDE0MDtcbiAgICAgICAgLy8gY29uc3QgZm9sbG93VXBNZW51Qm94SGVpZ2h0ID0gZm9sbG93VXBNZW51Qm94Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgfHwgMFxuICAgICAgICBjb25zdCBtYXhYID0gKChQb3B1cENhcmRDb250YWluZXIgPT09IG51bGwgfHwgUG9wdXBDYXJkQ29udGFpbmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBQb3B1cENhcmRDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpIHx8IDApIC0gZm9sbG93VXBNZW51Qm94V2lkdGggLSAxMDtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobWF4WCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKChtZXNzYWdlc0JveD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IHx8IDApKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZXNCb3g/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZvbGxvd1VwTWVudScpWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKVxuICAgICAgICBjb25zdCBtYXhZID0gKCgoUG9wdXBDYXJkQ29udGFpbmVyID09PSBudWxsIHx8IFBvcHVwQ2FyZENvbnRhaW5lciA9PT0gdm9pZCAwID8gdm9pZCAwIDogUG9wdXBDYXJkQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnkpIHx8IDApICsgKChQb3B1cENhcmRDb250YWluZXIgPT09IG51bGwgfHwgUG9wdXBDYXJkQ29udGFpbmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBQb3B1cENhcmRDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0KSB8fCAwKSkgLSAoKChtZXNzYWdlc0JveCA9PT0gbnVsbCB8fCBtZXNzYWdlc0JveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWVzc2FnZXNCb3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueSkgfHwgMCkgKyAoKG1lc3NhZ2VzQm94ID09PSBudWxsIHx8IG1lc3NhZ2VzQm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNzYWdlc0JveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQpIHx8IDApKSAtIDIzMDtcbiAgICAgICAgY29uc3QgbWVzc2FnZUJveEhlaWdodCA9IG1lc3NhZ2VzQm94ID09PSBudWxsIHx8IG1lc3NhZ2VzQm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNzYWdlc0JveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckJveEhlaWdodCA9IFBvcHVwQ2FyZENvbnRhaW5lciA9PT0gbnVsbCB8fCBQb3B1cENhcmRDb250YWluZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IFBvcHVwQ2FyZENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IG1lc3NhZ2VCb3hIZWlnaHQgPiBjb250YWluZXJCb3hIZWlnaHQgPyBtZXNzYWdlQm94SGVpZ2h0ICsgMTgwIDogY29udGFpbmVyQm94SGVpZ2h0O1xuICAgICAgICBjb25zdCBtaW5ZID0gMCAtIGhlaWdodCArIDEzMDtcbiAgICAgICAgbGV0IGxlZnQgPSAoc2VsZWN0ZWRUZXh0WCAtIGZvbGxvd1VwTWVudUJveFggKyBzZWxlY3RlZFRleHRXaWR0aCAtIDQwKTtcbiAgICAgICAgbGV0IHRvcCA9IChzZWxlY3RlZFRleHRZIC0gZm9sbG93VXBNZW51Qm94WSAtIHNlbGVjdGVkVGV4dEhlaWdodCk7XG4gICAgICAgIC8vIFgg5Z2Q5qCH55qE5pyA5aSn5pyA5bCP5YC8XG4gICAgICAgIGxlZnQgPSBNYXRoLm1heCgxMCwgTWF0aC5taW4obWF4WCwgbGVmdCkpO1xuICAgICAgICAvLyBZIOWdkOagh+eahOacgOWkp+WAvFxuICAgICAgICB0b3AgPSBNYXRoLm1heChtaW5ZLCBNYXRoLm1pbihtYXhZLCB0b3ApKTtcbiAgICAgICAgc2V0U2hvd01lbnUoZmFsc2UpO1xuICAgICAgICAvLyDlj5bmtojmloflrZfpgInkuK3vvIzpgb/lhY3mhI/lpJblvLnlh7roj5zljZXmoI9cbiAgICAgICAgKF9hID0gd2luZG93LmdldFNlbGVjdGlvbigpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdVUERBVEVfUE9QVVBfQ0FSRCcsIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGxlZnQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICAgICAgICAgICAgfSwgZm9sbG93VXBEYXRhOiB7IGtleVdvcmQ6IHByb3BzLnNlbGVjdGVkVGV4dFN0cmluZywgc2VudGVuY2U6IHNlbnRlbmNlID09PSBudWxsIHx8IHNlbnRlbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZW50ZW5jZS5zZW50ZW5jZSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLCBzaG93TWVudSAmJiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHJlZjogQ29udGV4dEJveCwgY2xhc3NOYW1lOiAnY29udGV4dEJveCcsIHN0eWxlOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgICAgICB9IH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiBcInJvd1wiLFxuICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiBcIjhweFwiLFxuICAgICAgICAgICAgICAgIGJvcmRlclJpZ2h0OiBcIjFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4xMilcIixcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IFwiMThweFwiXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuVG9vbHRpcCwgeyBwbGFjZW1lbnQ6IFwiYm90dG9tXCIsIHRpdGxlOiAnR2VuZXJhdGUgSW1hZ2VzIHdpdGggQUknLCBhcnJvdzogZmFsc2UgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChTdHlsZWRCdXR0b24sIHsgc3R5bGU6IHsgbWFyZ2luUmlnaHQ6ICcxMHB4JyB9LCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVTZXRBbmtpU3BhY2VCdXR0b25DbGljayhldmVudCwgZmFsc2UpIH0sIFwiWy4uLl1cIikpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoU3R5bGVkQnV0dG9uLCB7IG9uQ2xpY2s6ICgpID0+IGhhbmRsZVNldEFua2lTcGFjZUJ1dHRvbkNsaWNrKGV2ZW50LCB0cnVlKSB9LCBcIlsuLi5dK1wiKSksXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChTdHlsZWRCdXR0b24sIHsgXCIkZGlzYWJsZVwiOiAodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpID8gZmFsc2UgOiB0cnVlLCB0aXRsZTogJ1xcdTI2QTFQcm8nLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnMTBweCdcbiAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsYW5nID0geWllbGQgKDAsIGxhbmdfMS5mZXRjaGN1cnJlbnRMYW5ndWFnZSkoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFuZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldExhbmd1YWdlID0gbGFuZ1sndGFyZ2V0J11bJ2lkJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKDAsIHV0aWxfMS5wbGF5VGV4dFRvU3BlZWNoKShwcm9wcy5zZWxlY3RlZFRleHRTdHJpbmcsIGxhbmdfMi5sYW5ndWFnZUNvZGVzW3RhcmdldExhbmd1YWdlXSwgdGFyZ2V0TGFuZ3VhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dNZW51KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsZXJ0KCcgWW91IGFyZSBub3QgUHJvJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5DdXN0b21lclNlcnZpY2VPdXRsaW5lZCwgbnVsbCkpKSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcidcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEljb25CdXR0b24sIHsgdGl0bGU6ICdcXHUyNkExUHJvJywgY2xhc3NOYW1lOiAnbG9va1VwQnV0dG9uJywgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aWNvbjEyOF9wbmdfMS5kZWZhdWx0fSlgLFxuICAgICAgICAgICAgICAgIH0sIG9uQ2xpY2s6IGhhbmRsZUZvbGxvd1VwTWVudUNsaWNrIH0pKSkpKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVzZUN1cnJlbnRMYW5ndWFnZSA9IGV4cG9ydHMuQ3VycmVudExhbmd1YWdlQ29udGV4dCA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSByZXF1aXJlKFwicmVhY3RcIik7XG5jb25zdCBsYW5nXzEgPSByZXF1aXJlKFwiLi9sYW5nXCIpO1xuY29uc3QgYXN5bmNGZXRjaGN1cnJlbnRMYW5ndWFnZSA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHJldHVybiB5aWVsZCAoMCwgbGFuZ18xLmZldGNoY3VycmVudExhbmd1YWdlKSgpO1xufSk7XG4vLyDojrflj5blvZPliY3or63oqIBcbmV4cG9ydHMuQ3VycmVudExhbmd1YWdlQ29udGV4dCA9ICgwLCByZWFjdF8xLmNyZWF0ZUNvbnRleHQpKG51bGwpO1xuY29uc3QgdXNlQ3VycmVudExhbmd1YWdlID0gKCkgPT4gKDAsIHJlYWN0XzEudXNlQ29udGV4dCkoZXhwb3J0cy5DdXJyZW50TGFuZ3VhZ2VDb250ZXh0KTtcbmV4cG9ydHMudXNlQ3VycmVudExhbmd1YWdlID0gdXNlQ3VycmVudExhbmd1YWdlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVzZVVzZXJJbmZvQ29udGV4dCA9IGV4cG9ydHMuVXNlckluZm9Db250ZXh0ID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbmV4cG9ydHMuVXNlckluZm9Db250ZXh0ID0gKDAsIHJlYWN0XzEuY3JlYXRlQ29udGV4dCkobnVsbCk7XG5jb25zdCB1c2VVc2VySW5mb0NvbnRleHQgPSAoKSA9PiAoMCwgcmVhY3RfMS51c2VDb250ZXh0KShleHBvcnRzLlVzZXJJbmZvQ29udGV4dCk7XG5leHBvcnRzLnVzZVVzZXJJbmZvQ29udGV4dCA9IHVzZVVzZXJJbmZvQ29udGV4dDtcbiIsImV4cG9ydCBkZWZhdWx0IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFJQUFBQUNBQ0FZQUFBRERQbUhMQUFBQUNYQklXWE1BQUFzVEFBQUxFd0VBbXB3WUFBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQWpLU1VSQlZIZ0I3WjFQYkJSVkhNZC9WZm5US0xSc1FBSk55Z0RlVEVNSjNLeEptNGdYLytFRmszcWdQU2xlYkcvbHhIS0NlR205UUR5MVhEeDRhVkU0Y2JBRXJxWkY1YWhNU1pTWWtOSkdTRFZWNm54M2Q3WnZ4cG5PN3V6Nzg5dDU3NU04ZG1ZV0JQdSs4L3YzZm0rR3lPRndPQndPaDQxMGJQSGRZRERPMWo3OVlLd0VZNm4yNlF2WHdrOUhHNUltZ0F2QktGTnorT1NFMG5Za0NXQWtHTk9rRHArY1VOaVFKSUR2cVdyMlRlT1RFNHB5a2dTd0laNmNHK2ltNFpPN2FIWHRlV1U4ZkxJZWpIOHFuK0sxMWIrZWt5Rjhja0xKVGFZQWxpNGVvYTdPRnlpTHVoQ2NVTnFLVEFHc2ZQRWF5Y1FKaFJjdmtXWmdUZm82ZDJUK1BvTkM4V29qQzU4S0lCVHRBbWdVSnhROXNCVkFvemlodEViYkM2QlJDaUtVeGRxNEZveDVrb0QySUxBb01BaG0vV0JjRE1ZTXRZQVRnR0kwQ01XbkZvVGdCTUNFTEtHRTUxc3dFNHh4YWpKT2NBSm9JeUNFdTcrczBjMzdUK25ySC81TStpMStNSVpxbnczaEJOQ21QRnhlcDh1M2xwT0U0Rk1USW5BQ2FITWdoSGUvK2kzdUhueHFVQVRaUlg0SGEzcEwyK2pIOHg2ZGU2TmJ2T3dGWXpZWTNWbC8zZ21nSUZ6NllDOU52RlVTTC9VSFk0RXlhZ3RPQUFWaTR1MFNEWi9ZSlY3eXFOcmY0YVg5R1NlQWduSHAvWDNVdXlkUzRQV29Lb0pFZCtBRVVEQlE4cjV5Wm4vOHNoZU15YVRmN3dSUVFBYU9kdExBa2M3NDVaSGFpT0FFVUZBbVRwV1NMc01LUkZ5QkUwQkJnUldJeFFJQWt6OG1YbkFDS0REdnZQNUswdVhQeFJNbmdBS1RFQWNBV0lIQjhNUUpvTUQwOVd4UCsrcHNlTUNxSXdnclhYZC9YU05IOWU2RkgyK0ZycDB2cG4xMU9oaWpPR0FsZ0t0M1Y0S2x6bWZrUUVGbmIrc0NTTi9QQVRmZ0JjTm41UUt3M3UybzBuY3d1Myt4UlR6OHdzb0MvUFQ3My9Yai92NSs2dTdPWE13cUZQUHo4L1hqcnAzSzcwMFB2N0FSUUtVVlN1aUxtNTZlcm9qQUZoWVhGK240OGVQMTg5NDkyMGdIYkZ5QWVQY0RteVlmcks2dTFvL2h1eHZaanlrRE5nSVEvYjl0a3c4ZVBIaFFQOVoxOXdNK0Z1RFJwZ1d3emZlRHBhV2wrckd1dXgrd2RBRTJXZ0RmOSt2SFZsb0EwUVY0bmtlMkVSV0F2dGljcFFVNGR1d1kyY2JLeXVaK0R1c3NRRHdGdERFR1FCb1kwbHV5ekFMWW5nS0tkei9RVUFTcXc4WUNoTmdZQU42N2R5OXlycUVNWEllSEJWQ2NBbDYvZnAwNk9qcWtEZnozWkNKYUFKMHBJR0RuQWxSWUFMSEdMb05EaHc2UlRNUU1RT2ZkRDlpNUFCVXBvQmhneVVDMlNFVUI2UFQvZ01WaWtPb1VVQlFBZXVhYlhXZS8rZk5UT3YvZDQ4cXhDZ3RscWdnRWpBdEFkUXFJeVJkOWJOL0I3VTBYV2xTbnFKRWFRRW52bEJoM0FhcFR3SGlOUFkrUFZSMmptTFFBeGdXZ09nVVVBOEM4QWRiRDVjMjk5eXBpbEVnTTBHbFpES0E2QlJUOWY5K0JuQUo0c2w0L0xwZkxORFUxUmFySSsyL01pM2tCS0Rhdm9nRHlORm5HbitBRmZ4MnYzTW5FdWpxQXloUXdIZ0RtV1dVVHpiOXFkTmNBQUNzTElEc0ZsQkVBUWpSWHpyeEtPdWpxZkpGMFkxUUFxbE5BR1FFZ25zRXpYTklibWV2RXFBQlVwNENpLzRjcHg5TzBPRE44WW5mbDdTdzZNVzRCUWxRSGdOVW5iYTRUWi9CNkh0MFlEUUpWcG9EeEFMQWQwSjBCQURZdVFMWUZRRWFCelNXY1FaQ0t1a0tJN2hvQVlPTUNaS2VBc0Nnakl5UEVHYkd2UU9kbUVCR3pMc0R5UnRCSWxkSkFEUUFZRTRCckJEVzdDQlJpVEFDMk40SUNVM3NCUkl4YWdCQWJKeDlZN1FKczN3c1lYMVN5emdMWXZoZlFaQ3U0Q0FzWFlPTmVRRk5id2VLd3NBQzJwNEM2K3dCRmpQek44U1lMVk1SdTM3NU5uSUZJWmNZcU1qcVZaR0JHQUxFbUMrNFZPN0N3c0NBMVZqSFpDU3hpeEFWd1g1VkxRdVZTdGFrQUVCaHlBWnNXQUR0aFROVEFzeEFybGJJblA1NEM2dDROSkdKRUFHSUEyTmV6ZzI1ODBrUGNPUC90NDhxVFM0SHNMSVZMQ2dpTVNFOU1BZkY4WVB5d3VhR3lUaUUrRWN6azVBTVdNUUR1Tkc0UGlWWXBBRk5QQkV2Q2tBRCszMnI5OGJWSFdTOUgxa1o4cFZMMmRuQXVLU0RRTG9DMERBQS85TSsrK1lNNG9IcWxNcklLV0RMYm1hLzliNC9YQUNZbkoybDhmTHh5SE1ZRDU5NDB1emdrdWlQVm0wRk54d0Q2QlNCWUFQeHd4OGJHS3ExUllROC80b0V3K3VhQTdBd0FrODlsSFFBWWNBR2JGaUFzcmM3T3pySmRFRklaQUFKVHk4QWhSbU9BY05JaEJLNGR2RVd0QUlZWWpRSEV1MzV3Y0pBMk5qYW82SEJvQXhNeGFnRnNiQVNKTEFQdk1iL24wR2dNME5YVlJiWVJmVjZSZVJlZ1ZRRHhHc0RodzRmSk5yZzBnb1RvRlVDc0JpQzd3c2FkK1BNS1RWY0JnVllCMk40S0xyNFhDSEJZQnRmNkw3QzlGWnpUS21DSXNSakF4azVnY1RNb2h4UVFHSXNCYkJNQTh2KzV1Ym42ZWNxcjNiVmpMQWF3U1FDWS9LR2hvZm81OG4vZGo0Skp3MWdNWUVzR2dNZ2ZreTlXQUNkT2xZZ0wyZ1JnV3cwQSt4eEdSMGNycjRPTlR6Nlh1eDlvaTBUaU5RRHgwU2hGQXBVKzNQWGlwSWRnOGpuZC9VQ2JBT0t2aHArWm1TRmJRTnYzbFkvMkI0SGZ5OFFOYlFJUS9iOHRZT0x4NkRkME9ISGMrd0MwQ1FDRmorR1R1Nm5vSUwvSHdQOHZsMkxQVm1nVEFNd2ZSeE5vT3p6dGtrTWJUZ0NXa3lTQTlucStxcU1sa2dRUVdiUGtzbHZIb1lZa0FVUzZGbGJYL2lWSGNVa1N3THg0d20zVHBrTXVtUmJnNXYxbjVDZ3VhUmFnSGdoaW8yUzhqT3NvRG1scDRKZmhBU2FmMDE0OWgxelNCREJGZ2hXQUFKd1ZLQ1pwQXNEa1I2ekE1VnZMNUdndnJ0N0p0dHdkVzN5SHR0MkZZSGpoaFJ1Zjl0REFrZWJmdnVtUVExaVRxYndBYTNrOWRpMzl1eFJHZ3pHemxRQUFtdmNYd2hNc2FkNFo2MlhUMGRxdVNKN0l2RFFrQURBV2pNbndCQTJOc0FST0JHd21NaThmQm1PdUVRR0FjakF1aENld0JKZmUyOGVxdDYwVjJud2k4NEttVEw5UkFZQXlDU0lBYVBCQWp4c1hhMkRwUk9iaElsWG5rNW9SQUlpNGd4RFpRbkFUcVpUNjVJTm1CUUFTUlFEUUFqVnd0SlA2RG15dnZIUVp3RjBnalhRVHFRWGtmYXUxVHd5L2R0MnZuYzlRYkxrL2p3QkFtV0x1d0NHVnJJbGNTZm11YWZJS0FKVEppU0FMYlJPWmwxWUVBQWFEZ2NkN2VWUnMyRTlrWGxvVkFQQ29hZzNPRW44S081RjVrU0dBRUkvMENjRk5wQ1JrQ2lDa094aW5xZW9lK29PeDFTdkIzRVFhUm9VQWt2Qm9NMDd3WTU4T2g4UGhNTUovRU9TQ0ZnQVc4K0lBQUFBQVNVVk9SSzVDWUlJPVwiIiwiZXhwb3J0IGRlZmF1bHQgXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQWNjQUFBQ3BDQVlBQUFCZWRmWXNBQUFCcDJsVVdIUllUVXc2WTI5dExtRmtiMkpsTG5odGNBQUFBQUFBUEQ5NGNHRmphMlYwSUdKbFoybHVQU0x2dTc4aUlHbGtQU0pYTlUwd1RYQkRaV2hwU0hweVpWTjZUbFJqZW10ak9XUWlQejRLUEhnNmVHMXdiV1YwWVNCNGJXeHVjenA0UFNKaFpHOWlaVHB1Y3pwdFpYUmhMeUlnZURwNGJYQjBhejBpV0UxUUlFTnZjbVVnTmk0d0xqQWlQZ29nUEhKa1pqcFNSRVlnZUcxc2JuTTZjbVJtUFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eE9UazVMekF5THpJeUxYSmtaaTF6ZVc1MFlYZ3Ribk1qSWo0S0lDQThjbVJtT2tSbGMyTnlhWEIwYVc5dUlISmtaanBoWW05MWREMGlJZ29nSUNBZ2VHMXNibk02WlhocFpqMGlhSFIwY0RvdkwyNXpMbUZrYjJKbExtTnZiUzlsZUdsbUx6RXVNQzhpQ2lBZ0lHVjRhV1k2VlhObGNrTnZiVzFsYm5ROUlsTmpjbVZsYm5Ob2IzUWlDaUFnSUdWNGFXWTZVR2w0Wld4WlJHbHRaVzV6YVc5dVBTSXhOamtpQ2lBZ0lHVjRhV1k2VUdsNFpXeFlSR2x0Wlc1emFXOXVQU0kwTlRVaUx6NEtJRHd2Y21SbU9sSkVSajRLUEM5NE9uaHRjRzFsZEdFK0Nqdy9lSEJoWTJ0bGRDQmxibVE5SW5JaVB6NGVRckRlQUFBQlhXbERRMUJKUTBNZ1VISnZabWxzWlFBQUtKRjFrRThvZzNFWXh6OWppRTFSbE9Td2xES05abHR5M1NnVVdyUGx6MEc5ZXplalpuNjltK1FtRitVc1J5Zkp5WFVsQnpkWHBTaW5YZVNnWE5RdXJOZnpidGhHbm5wNlBuMTdudC92MnhjYW5KcFNhVHV3bWNrWmthbVFhMmw1eGRYeWpKMW1IQXpScXVsWkZReUhaMldGNzFsZnhYdHMxcndidHQ3eUhyeXMzbHpHQ3FYMlRpNzJUNmIvN3RkVld5S1oxV1YrU0FkMFplVEE1aFVPNytTVXhYdkNYWWFZRWo2eU9GWGhjNHZqRmI0cTcwUWpFOEszd2gzNnVwWVFMZ2g3NGpWNnFvWTMwOXY2bHdmTHZUT1ppUzNJN0pIdVk1NG9QZ0pNTVVlSVVjWVpsQ3pjLzl3RXlqY1RiS0hZeFdDREZPdmtjQkVVUlpFbUtUeERCcDBSUE1JK3ZOSitLK3ZmR1ZhMXcxZVlISk92dXF2YWpQZy8zb0RlcDZyV2Z3b0RjY2o3bFdab1A4bmFpdmJzbXQ5WFlVY2VtbzVOODIwUld0eFFlakROOTd4cGxzNmc4Ukd1aTUreGhHTXFISndXT1FBQVFBQkpSRUZVZUFIdFhRZDhWRlgyUHBPWmRDRDBFcW8wVVJCVVZCRGJXbEFFRlVUc3ZZdXU5ZThxN3Fvb0tGaXdnSzVkZDlIVkZidHJSUkc3Q01nS3dscG8wb1AwaFBSTVp2N251Mi9Pek10a0pwbEozcVNRYzM5NWMzdDUzN2s1M3p2MzNmZWVxMjNyQVg1U3B3Z29Bb3FBSXFBSUtBSkJCSktDSVEwb0FvcUFJcUFJS0FLS2dFRkF5VkVuZ2lLZ0NDZ0Npb0FpRUlhQWttTVlJQnBWQkJRQlJVQVJVQVNVSEhVT0tBS0tnQ0tnQ0NnQ1lRZ29PWVlCb2xGRlFCRlFCQlFCUlVESlVlZUFJcUFJS0FLS2dDSVFob0NTWXhnZ0dsVUVGQUZGUUJGUUJKUWNkUTRvQW9xQUlxQUlLQUpoQ0NnNWhnR2lVVVZBRVZBRUZBRkZRTWxSNTRBaW9BZ29Bb3FBSWhDR2dKSmpHQ0FhVlFRVUFVVkFFVkFFbEJ4MURpZ0Npb0Fpb0Fnb0FtRUlLRG1HQWFKUlJVQVJVQVFVQVVWQXlWSG5nQ0tnQ0NnQ2lvQWlFSWFBa21NWUlCcFZCQlFCUlVBUlVBU1VISFVPS0FLS2dDS2dDQ2dDWVFnb09ZWUJvbEZGUUJGUUJCUUJSVURKVWVlQUlxQUlLQUtLZ0NJUWhvQ1NZeGdnR2xVRUZBRkZRQkZRQkpRY2RRNG9Bb3FBSXFBSUtBSmhDQ2c1aGdHaVVVVkFFVkFFRkFGRlFNbFI1NEFpb0Fnb0FvcEFvMERnc2IvZlE0ODlmay9Vc1NMLzNpbTNSczJQSjBQSk1SNjB0S3dpb0Fnb0FvcEF2U0dRbDd1YnpqcDdkRVNDQkRHZWRkWm94OGJtemtodmY1ZGpyV2xEaW9BaW9BZ29Bb3BBZ2hDWSs5bTMxSzE3WjBPUTNicDFwbzgrbkd0NkVtSjg5ZFYzNmViL20reEk3eDVIV3RGR0ZBRkZRQkZRQkJTQk9rRGcybXR1TjczQWdoUUhpeEhFS0htU1hodGZ5YkUyNkdsZFJVQVJVQVFVZ1RwSFFFaFFDTkpwWXNRSktUbld1VmkxUTBWQUVWQUVGSUhhSWlBRWlYYnM0ZHEySy9WZGJWc1A4RXRFZlVWQUVWQUVGQUZGUUJFZzB0MnFPZ3NVQVVWQUVWQUVGSUV3QkpRY3d3RFJxQ0tnQ0NnQ2lvQWlvT1NvYzBBUlVBUVVBVVZBRVFoRFFNa3hEQkNOS2dLS2dDS2dDQ2dDU280NkJ4UUJSVUFSVUFRVWdUQUVsQnpEQU5Hb0lxQUlLQUtLZ0NLZ3p6bnFIRkFFRklFbWdrQmplV3JOMVVUazBiQlBVOG14WWN0SFI2Y0lLQUsxUnNCUEdTays2dGV4bE5LU2ZiVnVMWkVObEhpVDZOZWNGQ29veGFLZWttUWlzYTZ1YlNYSDZoRFNmRVZBRVdpa0NGaVc0dWhCdTJuQ2lkc29rd215TWJoQ0pzWUhacmVodDM1c0VSaXVrbVI5eUUzdk9kWUg2dHFuSXFBSTFBa0NnN3FVME4ybmJHazB4QWhRWU9WT1BHa3JIZGl0dUU0dzBrNGlJNkRrR0JrWFRWVUVGSUZHallCbE5aNHlLSStTR3FIaDVlSXhqOTUvZDBBQ2plVmVhYU9lTUpVR3IrUllDUkpOVUFRVWdjYU5RSWhNMmpVcmI3U24wcmFaMXpiMjBEblpFaldZUUFTVUhCTUlyamF0Q0NnQzlZZUFuL2tFRmxoamRSZzZ6a0ZkL1NEZ2FkMjZULzMwckwwcUFvcUFJdUE0QXY0QW9ZQlYvSlNjbk1kK2dlTzkxRVdEeWNrWjFMcDFMKzRLTk9rS0VIMGpadnU2QU0zQlBuUzNxb05nYWxPS2dDTFFlQkJZdWJVWjdTeE00UUhYRitINEtTdTlqUHEybDN1TGpRZTdwakJTSmNlbUlHVTlSMFZBRWFpRXdMUHpldEozdjdlcm1GNFg2N0MydGRJaFBiYlJ0TkZMS281Qll3MENBU1hIQmlFR0hZUWlvQWpVR3dKTWlDSGJNUlJLekhpc0c2SG1WcUloeVVUM2w1aXphQXF0ZW9wTEZqZUY4OVJ6VkFRVWdUMEdBZHgvY3pPaHBWSlNVZ1lmTGZob1hxT3pjeGxMVVFqSzhxc3lIdDF1TjkvSFRDYVB4OFY5SnBrREhmdDhQbk40dlg0cUt5dWo4dkxLdTJRdGd4RjkrQzB5bG01ck5IS3RsR2dFMUhKTU5NTGF2aUtnQ0RpTUFEYmRlSmxpdk9RcjU4MDI1VnVaTE5QSTdXNUhIbmZybVBzS0VhTnNkcEdxbFZrck5UV1pVdE5TZ21Rb0pjVlBZdExFNFVrbVNrdFBNVVJaVWx4S0pTVmxVb1RIS0Z0UFhjRmRxSGFiTlZoUUF3MENBU1hIQmlFR0hjU2Vod0FVWVdVbHUrZWRaOE00STcrL21MemU5VXlXTzhqdDZjd1AvcWZGUERETFVyVExLaFNHcFppUmtjcVdZbnlxMHMxV1pVYUdoMUpTdkZSWVdGTEprZ1JSMm00OXhqeFdMVmgzQ01Rbjhib2JsL2FrQ0RSeUJFSUt0cEdmU0tNYXZzOWZRTDZ5NVV4bVhjbWQxTEthc1VOR2RqbFZ0Q0JUVXBJcE16TzltamFxems1TzlsQldsb2Z5QzRxb3JMVE05cGdKOTF6VittM1Z6ZFpiTGl6MjhyS3RUUGE3MlRvdVlPdTlsQkhrSldaWE1yazh6Y2p0NGlWdVR4cyt0OFpQTFkzL0RPcHRtbWpIaW9BaTBEQVJ3SDIvZFVUSnNvd1pmWlFocTlGT2pDNjIrR3BQalBaZW0yVm04Tk9XaFZScUNGSUl1ZnJ4MmR1bzczQkIvbG9xS2x6UFM4djgvR2dLVzlOdUYxK0FKSkdmNzdmeVhWY3E5K2FSMTcrTFhDWHJLRG0xTXk4eFo5ZjNrR3ZWdjVKanJlRFR5b3FBSXRCUUVTZ3IyOENXVGJ4ZjRtQ0Z6MHVwdGJVWUkyR1N5UVJaWHA3UHk3K1ZOK3RFS3Q5UTBwSmNYanB5Y0RKMXlPcEphemUxcEkxYmQ5UEdMYnRvTnk4WEZ4V1ZrSjlQSjRXWkpEa3R5VmlSUHIrUHZLVTVmSjY3S0RXMUo3bVNZbC9pYmlqbmpIRW9PVFlrYWVoWUZBRkZvQUlDNmVuV3NtWlJVVkdGOU5naWZGL1BGOXVYTGV3cm5MakhHSXRyMTc2OUtiWjF5NVpZaXBzeWFIdjM3c0pHYzcvUjd5K2pYajI4TlA2TWc0bkt2TlNqYTBzcTNsMUVPVDl2cEUyOFpMenM5eDMwQTRlWHI5cENtM2ZrOGxKckdXVTFUK2VMQUtMQ290MXNLZjlDelp2djB5Z0pVc2t4NW1tdEJSV0Jwb2ZBNldlTU15LzRmUDMxTit2bDVQZmZmMy9UNzd4NTgyclVQM2EweHVPd0t6V1d6VGY3N2plQWpoOTVvbW42a3c4L29wK1hMb3VwRzdTTkpkdVNrdEtZeWt1aGlWUHU1dVZNNng1cFBQY3FKMDY0UTVxb2tWOVN0Sm5hdCs1RTNaZ1VuMzU1SGgyUzI1NEdkR3BsN3FOMjd0R1dodlZ2VDFlT0hVVEZoZVgwOVpJY21qMS9OZVZzemFWdkZ2NUdlL2ZxUUQyN2RLQjVQNjZodE14K05lcS9QaXNwT2RZbit0cTNJaEJBNE1JTHo2ZWhRNGRXd09PRDl6K2c5ei80MEtUMTZkdVhicnJ4ZW5yNGtlbTBZdm55Q3VVU0ZiR1BDUmJjaXkvK0sxRmRSVzMzcEpOR3NwWGxwNXFTWTlTR28yU2twc1ZtTmZZZk1DRFlRcTgrdldNbVIxUkNIL0dTWTdDek9nM3NaRXZRMmtpVTVDcWpFVU42MGFmL1hVa0RPelNuMG1SK2JNWE5qOUtVdXVsL3Y2Nm5qZHQzVTdmc3RuVGR1QU1wWjBjUkRUdGdMK3FWM1pvZW1qbVhTcjM1NU9abDF1U1VUbzZQL3VqampxWS9IWGNNZlRGbkxuMCs1M05IMjFkeWRCUk9iVXdScUJrQ0lFWllaK3MzYkFnMnNHUDc5bUM0cmdNbmpScEpnd1lOb2lWTGZqSmR3NExic1gxSGtLenJZank0SUdqZDJucHVFZUZFWHhSNFBHNnp3U1RTdVdFSjlZQ0RCbE9MckN5VDNUYXdwSXBJbDY3ZGFOelpaNW4wdk54Yyt2R0hSVlRWVWlzMnNhQXZyemMrcXhZZDNIWGJuYWFmU0Q5MzN6YzVVbklOMDN5ODh6U1ByVnczbGZ1VDZkNW5mNktManUvS2o2V1UwWmUvYk9Sbk9sUHA4OTl5S09lUFlpb285dEdCL1RzVFoxRlpZVEYxYUpkT2YyYXN4dC81SHExYXU1V1hWWlBKVzViREczVGFPYjZMRmNRSUIxL0pzWWFpMW1xS1FFTkhBTVNZYUFLSUZZUEZQLzFFT1BZZk9OQlVlZjMxTnlnOW8zYVBOY1RhdDVRYmR1Z1EyaGk0V0VBNDBkamd6VGZSM0FFSEQ2WjliZGFpdlJ3c3dTN2R1Z2FTMk9mVnowOCsrTWhlcEZJWWZkV0VIQ3MxbEtBRU54WHo0eGtwVEdZK0dqYTRKODE4N1VkYXN6NkgvbnJwbjhoZnRKT0ttZGZmK1hZRm5YL2lBRHJrb0o1OHpqNit2OHU3YjBINGZML3gxOTgyMDhKZjFsUHpGcW5HOHZkamswN1pEclllcmZ1MFRnMGJGcU5Zams2MUtlMm81U2hJcUs4SU5FQUV1blR0UW0xYnQ2RUMyNGFVL2RtaTI3WmpPMjFZSDdJeW5SbzYyaDdDUkpUSnk2aXZ2Ukc2endoaVBHUGNhV1ljOCtmTnA4VkxuSDlaTnM0MUk4MGk0RDU3OXpYTHpMS1VlOEVGNTlINmRSdG9RNEFzQzR1TEhEOS9qeWY2NTIyeldsZ1dZeXc0eDFLMnFyNWk2U1BSWlpLVCtTMCt2alJxMGN4RGcvdGwwYksrdk5PMjdkNUV6WnBUajNZK0tpMXowZlNiaDlNdnEzYlRVLzljU0M3ZW5OTWlneWlyVlFZZGMyaFBXck5wSnovYldVQnBhUjVlbXNXOVVuN2t3NS9QdnJQa0NHdlJhWXRSc0ZWeUZDVFVWd1FhSUFLbm56Nk91bmJwUXUrL2I5MTdSQmozNFdCbFB2THdvNDZPR09SMDVWVlgwUElWSy9nUmlNck96MXM2TXpJeVRKbDdwMHgxakp6YXRHbEQ0N25mem54dWRvZHhMRjVzdmZ0NUtCTzIyUnhrS3dDcjhzbW5ucUh0RGkwLzQxMnBkZVhxc3ErYW5KUFBWOGlXWGhtMWE5dUN1bmJJb0h2L01weTI1UG5KVFhsc05icjRmcU9mRnEvTm94bXZyS1FGMzN4TGw5eDZHNVV6b2U2VnRaenZxU2JUSDlzTEtEZVhuK3NzOFRCQnNnWEtnL0Ewc2xjQ0tUa0dadzdVQVVSWVgwNzdiOHI0NDBYVjJIZ1M3cDU2OG1tekVlZjAwMDh6K2FlZGRpcHQycmlSa082czg3TVNTemQ5MkVrWHk2b1lGNnhVU1gvaWljY3BQWjNOQkljY3lHM2FRNCtZOCt6U3RhdTVyL2xoWUNPU2RDRjlqK0lkb3FOT0dtVXdlSWd2RG1yMmlJZTBHc0liNXhqYUJTcnBvZy84OU1WbmN5a2xOWVgySDN3ZzllN2JoOHZDRXZJWkg2MGhqUG1MTm5BL2N1eVpaOUN2Ly91WmZsNFdlUmRyUXlmSDBqSmVPdVY3aVZuTk15bWQ5eWdWNWhkUWEzNk9NVGUvbUlyOExzcE1jMUhMekJRNmMwUXZhcGRaeU5abE9oM1l4VThadms3a0x5Nm10SXdVT3ZuNEE2aHJ1eXg2ZTg1UzNwUlR4aTlzZC83aVF6Zmt5RnhPcUMvL0NBbnRwSXJHdGY4cXdLbURyUHJGSDhveXBKeERwd3ZsangycTJLa0t5eXBuMHlZVHJ4MHBoTm9QaFN6RkhvcGJvVWlFalhGR1NnK3ZHMCs4bUJYcWxLbjNFM2JJWWpOUTJ6YXRLKzJPbGQyejMzLy9QYzJjK1ZJOHpWZGJGczg1aHZDWHVXQzkveFI1c3NGbTI5YXQxR2Z2dlhtcEVNUUlIRUlFaWE5dDRQb21oUjhINmRxOUszWHIwZDNVazdySWJ5ek83Y1lqTFY3eWxzc2pKeTYrbmVqbmgvcHhGbndoeDQra1pMZDEwVjdaelduRUVjZnltM00ybTN1TnhkNGszc2pqcGVHSDlhQVJSKzVEV2MxUzZLZmxXK2pYTlgvdy9jWjBLdVA3a1U2NlJHN0ljWjdLblR4emJVc1JVQVNNZFFTQ25EOS9Qb20xaEtWSVdGQ0pkaUNBRUdsWXZWVzBzcHdkQVVodjhlSWw1bjZqdkFBQVBTQThaTWdRczN2V09XSUVDWVlJQzRRSFp4RS8wdVhjaFN4TnRza1A0V0lScEZYV3VzQ3hyTXBRMlVESThzd3Z2N2NuMEpjdHNVRUZpNHJLK1FIK1lscisrelphdjNVSE5jL2lseGNVbFBKcitYanNmRUZRemtSWnpoWmtQbHVYQlVYOGpsVTNEeCtmRWNOYUpHL2tNVVNhVms1TGY5NUNhemIrd1lUcDR3MCtzVDBtRXc4UTJKQURKMzQ4ZGFzcjJ3aVhWYTFKVzkySnhaWmZrN1pxVWlmYWFHclNWazNxYVArUkVhZ0psaldwRTdsM1N6RlhWTHpSU3NKU3RFakI2cjgxaytQSUUwY1Fub1dzdWF0OEx1RVc0Ynp2NTRjMWp6cE91Y3I5bytXU2ttSnpIeEhuM0x0UEg5UFpTcjcvaU9YWGdnSnM2bkRHVlR4WFY4QWF0QWpPdWdBSW5XdTc5aDNZOGtuaHh6a080TTZ4QkpzVUtJK3hXREswckVsaVV2SFMrclZyYU5XS2xRUkxNMFRBSVRMMitXQkNoZHBIS3czSm5YZlJtWlNYdTVVdnlKYlIxR2Urby90dk9KeXkybVR5T1RNcCtyeFVVc3Izbi9rZVl4TEhYYnlSQ1hoNStaeFNQQ21jeHcvOXA3WG1SMzljTk9tSlR5aHZkeTQxeTJqT1Zxano1OXRrTnVSWUV6SmNXWVQvQTRYbmgwOHBLUzkrdEh5azI5dVNKUlI3R3NxRXR4T2VqekoySitYRnQrY2hiRSszdDZYOVkwa3EzRXFwaUJmd3MyT0dlTGdUZk1XUGxvOTBlMXYxaTM4QjcrenIzSWtma2c0dTExbjN3T1IvQXI3ZGRjbk9qbksvVGM1YmZIc3RoTzNwNGVkdnYrOW0xZHUrZlJzSDdPV3NjUGg0ck5MNGxmYkZEK1ZZSVh1NnZkMFEvdGgwdEo3dmNXS0g2aUdISEdLK29ZaVhBQ0N0YTVldTRRMkd4ZEUrbkwwZkt5WDhOelRYckw3THlyeGhiOGV4bG85UjdxaGpqcVpzM3JDRUpWWTQ2eDZqaEswK1VRNEV1WFh6Wm5ydnJYZHNaV1Zlb3g5clhMQ3NLdUpxdGRWUWZwTmNHVFRsZ1J0NHVUU2ZsaXhlU2R0ZE9aVHQzVUJ1UHkrYnBub0M5dzk1dnZETHgxMCsvZ0MwcDV5UytiR05YZHZXMDJ2dnorWDh0alR6VFg0T2Nsc3VwYmc5YkhHVzhNdklvejhxMDFETzJ6Nk9CbVU1eW1RVmhXQU5GTE14ZkNKWmt6RTB1ZXo1OGc4bnZweXV2WXpVUjU2VXd4S0tWZGJxWC9LUWFLK0xkS2t2ZGUzNWtpWSt5c1BaeTBoOXBFczU3YjhwNC8vaGh4L1QvZ2Z1VDRNT0dFU2RtZml3SzFRMmJWZ1dpVFZQU2twS2FPMjZkWmc0OU1FSDhpeWRmVzZGNXBNcEZQeXhsNGsyL3l3eXFHNytWMTRTdExkZG0vNnQ1ZE1PSFR0U1I3NVF3TGwreEs5bXczaU9PZllZczdRS1ROTFMwbml6Q042MUtuMkY5MitQQndHb0ZFQzc0akQzOEVKd0s4bmFYSVAvV2FTam5KU0Z4WWpOVTZ0WHJxRDMzLzRQNTd0bzFKaVRxVmVmdnR4VTZPSkNkQm5hdDc3ZEtIbFdXMlZsdUpjWDZoL2xHcEw3NFAyRmRNN2xZNmhGODVZMDhLRDlxS3hrYjlxOWJpa2w1NjJnRlA2SU05djNadlJKcWVtVXhJOXhiTmxaUW85UCs1cGF0RnhOS3pkNXFYbjZPbjdYYWluTERJU1laSlpVZlg3ZXhDVWljK2hrbTlDR0hHdFNXeFBMUHNHQnFIMGlXUWhqd2xvS05aU1B5VzJsWVZJakxIbWhxMENyTGFzTmhLV08rS2hqdFMxOVNoc2lVYXV1OXEvNE96WC9Qdjk4THMyZE81ZnduQ0VlcDRBQ0ZoSUNJVWc0aFpmMnZwajdCUzNoQi9TZG4zK1c0Z1l4RnhZV0dxVnV6ZmpRL01lT1ZsSDh6dmRQMUplWFVmRlZqQjkvWEV4dnZ2a1c3ZURuT2FGUnY1Ky9nTWJ4YzVZREIrN0hiNlRwU2xobWpkNi85WCtMLytlcUhHUm5sVUZCRjFzM1pieGs2T1BIRkt4bFFqL2ZVNE5EdWR5OFhaVHQ3MkxrZ3ZOZnZPaEh6ckYwQjhJOWUvY0p0TVZsYzNlWnNTSGYwaVZXRzlaNFhkeEhPUk94RUxEcEl1YWZ1NlpPQ3VJZmM2VWFGTVRMMFcrODRpNDY2ZFRENk5BamhwaWR1dDdtZzZrZ293OGw4MDdXWlA0QTEvclpYOUNHaitmd0czQ2EwU3IraHNYWHk3YlFmb1BUYVhEZlhQckhHOFhtdnFTTDU0dTNOSTA4R2J3cXd2Y2tuWGFKM0pCVDc1YWpUQmlBSnVRa2t6NlVaMDNDRUxDaFdTK1QyMUpTVmduN1B3WGFDS1FHcTB1ZFlJSUppQUt3aUJGSktHZjlBMGtiVWlNVWw3YTBmOEhHd2sxaWlyL01GZkVGbjFEY3dzcWFmMTI2ZERZS0dHa3kvMEdVOW5oMmRxZmdRL2hPenI4TjY5ZXpSVlpNRHp4d24ra1BQM0toYU84L1B6K2ZIKzFZYjhvNDJUK2ZNYitGSjhNOHBnTHloNVAvUDl4dmZQcnBaMmdRUDFyU2hsOHB0OExxMlB5UG9sNzQvMThnMjdRUjdjZWFteUFwM0dlMDVGSlNYRUx1akxSQUZjakkwZ2MvTGx4a3ZsdVlsZFhTeUtXRWNiS2NuNHI1M3VpbUFCNjVlYm4wMWR6UE9jdVNyOVVIMmdnVVo2K1krN0R5V2E4RnlvVnk3U0ZiSlh0eUhZVlhyY3lsajk2ZFMyZWVkUlFsOFFrVUZKZFJTWGttMzFOdHdYNFNkUnpWbTN6OFNhcHRDK2RUQ3o0bTc5K0xldDV4SzYxY3M1bkdwaXloNWIrdW9yVXJkMUgvZ1R0by9zSldDUmwxSXQrUTQrcldkYTg2bG9CMEIyVVFjcUlJck1ray94U2gvRWdobWREaTI4dEVTclBuSXl6LytGSlcvUEJ5MGVKU1hueDd1VWhwOW55RXRYK3gwQzNGRkF0bWRneWx2UGlSOHV4cDRXSEZ2ekwrc0F6eHlJaGdZOGNNYVhBZ1JteVdFZHpGcjFqV2txazlMVHdzZlVoOThjUExSWXRMZWZGRDVTd2RBMEo2ZU94dU9yeFhZU2pMRnBydzNpRDY3dmQybkdLUkk0Z1FybG16ZEw1bmxteUlpMjkybURUN0R3ak5Ta2NlK2dLTzhtZ0hpRm9lQWhCZGg5cFdXUzgvN3dlclROd2gzYmJTZzZOaGhWWjI4OWUyb1Z2K001Z3pVRmR1dTFRZVQrV2F6cVgwMktzOS9lT2w2L2dySENuV2g0MTVIUG41WHI0WDZhVlY2MHI1L21NeXRXdmZnbkw1WlEzYlAvK2N5dGI4UWdQR24wZTlocDlHdTNMWDBuZGYzRUl6WmhUVG1uWE9QUmZyM05sVjNWSTlXSTRoNFFvUnloRHRjVXhzK2VlUi9IQmZyc2JFdCtkSFNyUG5JeXo5U1ZueHc4dEZpMHQ1OGUzbElxWFo4eEhXL2kzbElWaUpINDVUdExpVUY5OWVMbEthUFI5aHhiOHkvaUE5TEZuRzRnUmo4ZTExSXFYWjh4Rk9QUDVNS09aRHV5RXlzby9CNmg4WXlCSW53aTRtL2hKK1NiWUhkQlFjbytnaWM0RmdGZU04MUlPVDVWUE9NT3JOc2dndEFyVkt5RzlSRWU3WG9SQ1hZWkRRVkhSbmxRczBHcjFZQW5QVy9MNkZMcm5nTVg0RzlXemFwMzlYakpyZmw1cEdMVnY0YUdjQjBWZHZmMDNISHV5aTVlWDdVT2J3RTZtai94aWlicjFwOGZMdmFPUFN1K2p4SjlJYkpURUMwam9peDhCc0Nnb1JFOE9LeUtRTFp0a0M4czlqUzlLZ0lxQUlLQUl4SVpDY3pCWXdyWWxlMXVnZys4VTYweEJIeTh2NTJiMzhRc3JNeEh0ZXJYd2hRdEZiNGJvcFNIUGNKajhKYVBvMHR5eURlbzc0TVpRaXZ0ZG9mWWxEaURuVWU2UmhvcktVQ0RRVWpFY3FuNWkwMzFmL1FXZWYrU2hkZS8xSXV2Q1NQM0VuZU5ZeGlmcjNhVTQ5cng5RjNxMHJhZU5ybStubEoxK2lkaDNLZVFOUEgycmJZaEg5YTFiYnhBeW9qbHF0STNLMHprWW1GQ1lnbkxVY0lrSzMwbUw5UlZ2bUtzNVVzRThpYWNHZVpvV3RPc2lYQ1lld3ZSemk0dXpwOXJDVnIvMHIvanIvNVArbzh2OUh4ZjhySzcvdS92LzQzWitlenJ3TVdNM0x3bm40RnVsWnk2cWlsekRPMGxMKy9oSTdFR1RGczBNTTlVTHozK1JieVp3RFRIQUVFemdNWXVUM2pKbzJUV21UWmd5RHNISW1vOUlQNnNoU2JhWE1Pa3Q0YlBxSDlOTE1MMm5VcUVObzZHRjlxVStmTHRTK1F4YWxadTlOWThaMm9EVXJodENYczcrbW5JOSs1N05xM01RSVVCTk1qaklSNU42RzljK0VpUldyQzAxQ3E0N1VOTVRLSWpEVDBDUktEcmNjbkp0V1dwQ0VyZTdOeEViL2x0V0tBSmV6VmJmeThDdi9CSllmYXBjenVDMXpIbUY5bVVwaGFkcS9EYXNBcHNCcHo4WS9OS0ZVL25VbmZ6eWY1L1prODZNRGFZYjRRbEl3LzVrVmYwd21mdkRHR3BBZHNrRkNTSE9aaC9tOTVmbVV5UnQwc0lQV0ZCRGR4WVd0LzMrakNMaUdWUWQxNWFMSnp6dGZzWmtLUzZteXFRcnRXdnBQeXFQUGFFNFVTZjBUbzR4dzE2NENldm5sejgwaGFSWDg1THI5ckZtRnZoMk9KSmdjeld3ems4R2FNS0hsVkp5SHpMT0s1MVN4akZVT0U2bWlreFR4SytTR0pRYjc0WFI3bGpWSnVhWTlNZENRVmNmS3NOY1A5aU4xeEE5bVZHN1BYdDllWFBzUG9HRUhaWS9CMzVyN09CMlZ2d2kxNHIrYWsvUGZ4V1RvZHJkaGF4RzdTUTNxZ1U2amUxaitOR1BnaStQUS9VR2tjUjNEU3o3eWxidjREUzhGbEpyaU1ZOHplSmdrVGI2NTMyanVTZ1k2c0loTStpNW5zaTB0S2VWbk5TMExWUFJmYURRZ1NibG5HVXF0RUFvT0JLbnlUeEthVnhYS2FzUnhCQkpNanBaQWcxZk9FWWFQeVlrRDcrc0x6VW9VbE1sZ1ZaTDVLamxtS2txUndIeVJhU05sSmR0cXdkWWtGNnhVTmxESm5pNzFrQmJlcGttVERnS1Y3SFdsanJSaGZGdjVTbVcxZnlNVU95NkNuV0FwUHRKTjJJYW5wTUVQUUJrMmd3SVpnWUwyZm9KdGNjQ2VqcUp3SnQvbUI5TzBmMEFSQk0yT25XQm1GUWo4MnZDcVZEWWdOSHU2MUpXMnhFZUhTZGdSNnVkUElmR0dtNlNrVEk1bkd2WGhMZWRITEtCVElIMzQ1alZ0MGxKRnY5eFh4dmNBK1dVQ3BxMkF4UmR4QVB6U2JYNm5hRUdoaXdrNHlieEZCODlDUXErNThNSjRidFpuK3VKWHEvRXIwc3A0UnlydVc4SkpjeWJDVm1sU0VyOS9sRjlBYXBFbGNnVVVxMFNGWDFNNUFJekpxTmhhaGJJYWNSd0JUMXJxL2c0MUdoSXl6eE16Y2VCYndnK2ZCRlpadkY4d2hkOUZlOVdWWjlGRmw1eEtMVnBrT2pRV2JVWVJVQVNhR2dMQkMrM0FjaWFXTWd0bW4wUGVkYk1qUXZINDQzK2oxTDFHbWpjUjRVVUxPR1JKTkdLRldpYm01UlhRekgrOFE4OCtPNHN0U2lqSjZoNktGektFdnJUclVBbExmaTBIcHRVaklsQkx5OUVpT1V0d0lqQVFvOXhqeE1WYktOMGFBU3hGaEt6UG44eWJQMHRKTWFKb05GRVJVQVFTaVVCNXp0ZjhuY0hkUmw5Qlo0RWNFK253SXJYTFRuRFIyWWVQcGluM1BzMXZrQ0hxMVRhZUY2bmJ5ZEFlVHVTb20yN2J0U1JIQUdjblB3bUQvVUNDOXJnRnNsbmo1NkNQbHpTdXZQSWNKVVlMRnYxVkJCU0JPa2JBKy9PelpEMVlVY2NkYzNlM0hSdERuMWlxWlZXSzVWdEx6OXI5R09wcmtWb2hVSXRMSlJDZ2tack5GNnRReG1STVJGcytCRzNWOGZuTGVTbDFyQlJVWHhGUUJCUUJSY0NPUUVDOVdnWUZkS3ZvVS9nU3RsZlFzSk1JZURyeVoxaHE2aUFzNjZJbXNJektEVmtpQ3dnT1Z6NmNaaTJ6Qm5hR0dZdlN6MnZ1K1dvMTFoUjRyYWNJS0FKN1BBSXBxV25Vb1hNMmIvcmhUVHg4dG1aSExaWitBK2FrMGI4QlkyT1BCNk1lVHREejVkd1pjWGNMb2RnRkEvTER6Vy81ZWdDK0lJQkQ0bmpidllTUmpycnJBeS9xamJ0enJhQUlLQUtLUURVSVFDZVp3OVA0M3VrcHB6YjRrSUgwOGQrbW1XY3NvVFB4cVM3NDBLWGgrbGZxcU84Y0FyVllWaFdMa0w4QXphOUVFb0lFK2VHQldSR2drQ1R5eGFGODZLRllTVlZmRVZBRUZBRm5FWEIzUHNyWkJ1dXd0YVNPUnhnalEzU3FHQ0F5Qk9oVWtLUzZ4Q0JRWTNJVW9ZQUVjY0NKRC9KRFBvUUtoekFFaXdOaE9VeW0vaWdDaW9BaTRDQUN4bUlNV0k0cGZjNGlkNWRZZHI4NE9BQUhtbkl4TVNiMVB0dm9WT2hWT1NjeEtxQkQ0VVRuT3RDbE5oR0dRSTEycTBKUXNBNUZVSWpEaVpVSUh3UXBRaFd5dEpjVDRZYU5SNk9LZ0NLZ0NOUVlBZWdZMFMwSUozbFNLT1A0bDZsMDFkdFVudk1kK2NvaWY2R2p4aDNXb3VLdVhic29QZDM2ZURUR2FzYWJuRUd1OW9kUWFwOXh2RFNIRndhRXpnZGRtZGZZQlh6b1gxTW5ZSnpVWWloYU5RSUNjWk1qSmg3SVQ0UXBiWW9RSlIzRWlMSTRFRVlkQ0JNSDRrS3NVbDk5UlVBUlVBU2NRRUIwa1BoSjdtUks2VDJPZkQzSEJuVVMraEVTZGFMUG1yU1JzMlFKZGU3YzJYdzdFanJSNC9HWU4rMmtwT0ROUDVacXhqa2dEejRjOUtqb1ZEay94Q1cvSnVQUU9wRVJpSnNjUlZob0RtRVJsZ2hNU0ZBSVVTeElFU0I4T1NJUFNWTVZBVVZBRVlnZkFlZ2o2Qlk0dTU2U3VPUkxHVk13eHAvcE01Nmd3c0lpdXY2NnF5a2pvK0xMdFpHTy9Nek1ETHJ1MnZFeHRtaFpnYkFFUVlyaThKRmxwR0dNNGtPbll1eUk0NUM0L1h3UVZ1Y3NBbkhmY3hReUZNRWdIaTVFRUNPRUt3SkRHSWNJMWRsVDBOWVVBVVZBRVFnaEFMMGpCM1NSSEVJdUlDTUp4K29YRnhmVDh1WEw2ZjRISHFMaTRwSmdmWVNSaGp4OEtEclc5bEJPeGdpOWlESGFTUkpuZ3pTVUFXRktIQ3R1b2x0RnA2S2NPdWNSaUJ0VkNBc09Bb1dEWUNBa0NjdHlLZEp3WUJKSVdSRXM0bExIVk5RZlJVQVJVQVFjUUVEMGt4QVBmT2lvZUVnclV0bWJicnlPdW5mdnpvK2diUWdTcEJBajBwQ0hNcEhxUmt2RHVFQjhJRVVoT0xPa0dpQkVxUWRZRUliZWxQTVRuU3IxSElCT213aER3TVVrVmFPOXdDSWN0QWVCZ2ZnZ1FDeWp3c2ttSENGQ2UzcHBhU2x0M0xpUkRqbmtFRk5XZnhRQlJVQVJjQklCVVd2Ui9KcjBoUThXVDc3blBscTNiajJUWVZmVHhOcTE2NmxidDY1MHgrMFR6TEpxUE8zT256K2ZldlRvWWZTbkVDSElFam9UUHZRcTB1RVF4N21BREhHSS9rVVpJY3g0K3RheTFTTVF0K1VvWkNkWExJakxFVzRaUW1oU1hxNThFRWU2MUs5K2lGcENFVkFFRklINEVCRENnQy82Um53aG1Iajk1czJiMGNRNy84ckUySTFBaWpnUVJocnk0bTFQZENCMEk4THdvVU5oUFNJY2ZnNUFRSFF0eWlOZjlHdDg2R2pwV0JBSTNRbU9wVFNYRVlISVJFTTFoSEZWZ3dQQ0VzRWhEMHNHZUVNT2hHNG5ScVNwVXdRVUFVVWdVUWhBTDhHSjlTangydlJuNmIyUXRaYVVGTHEvR1crNzBKT2lOMUVYK2xFSUVuSFJvL0NoTDZGTDRZUVFoVlNkT0MvVHNQNVVRQ0J1eTlHYUhKWnBMNVlpbGt4RlFCQ1lFQ1R5SVZSTUFMa1NRaGpsSVhCMWlvQWlvQWdrR2dIb0ppY083RXFkZk05VVdyTm1uYkVZWVRVaWpEVGt4ZHNIOUNNY2RDSDBveHlJSTA5MHBCZ1YwcjZVRjVLVWRoS05ZMU5yUDI2R2dpRGtTa3dFaXlzYUNFb2NoQWNDRkVLRVVGRVBQaHpxUzFqcXFLOElLQUtLUUVORkFQY2JKMDJlRWlSR0xLWEtFaXNJRW5rb0U0K0REb1NPaExPdnJvbHhZZGVUS0FjZEdrbi9TaHZ4OUsxbHEwY2dibktFSU9US0JzSzFreUtFaVFOcHlFTllCSWM2a3E3RVdMMWd0SVFpb0FnMEhBU21QZlJvQldMRU00MDQ3QVE1N2FIcGNRMFkrbEhJRHZvUkI1eVFKdlFsOHVGRWQ0citsZFU2cEt0TERBSnhreU9HQWFGQ2tCQWlEZ2dRdnFSQmdDZ0RKOEtWU1lCME9Vd0IvVkVFRkFGRm9JRWprSkdSUWZ2dTI4K1FJVWhSbkJBazhzSmZEaUJsb3ZuUW1kQ0Y0a3M1SVVYb1VhektJUitIT05RUlhZdDBKVWhCeGxrLzdrYzVRSElpR0NGRkRBa0NFeUtVc0Z6dDRORU5DV1A1QUhGOHNtcllzR0hPbmswamEyM2V2SG0wWWNOR092MTBmbytpT2tWQUVXaFNDSHo3N2JmOEdFZzNTazFOTlRwVlZ0bXdXeFU2RkhHUUgvUXR3a0tDQ0NOTmRLcWRPSnNVZ0FrKzJiaDNxMElvY0JDZU9BZ0pjZVNKdVkrNC9hb0dlYkt1anJDMEkyM1UxTC80NGt0cDd0elBJMVpmdTNaMXhQVHd4TVdMbDFCZVhoNGRlZVFSNFZrSmpULzg4S08wWU1GQ0dqTm1kUEF0R0FudFVCdFhCQlNCQm9NQW5sMkVFLzBKblNscFNCZjlhU2RHMFp0Q2xGSmYwaEZYNXd3Q2NaT2pDQXpkSXd5aHlCVU0waENIa0xFY0VHNWxRc2hJdzJFWEx1clYxUGw4Zm5QMWRlNjVaMWRvd3UyTy9kVCs5YStYQ1FRNVo4N3NDbTBrT25MLy9WTnB4NDZkRmY0aEV0Mm50cThJS0FJTkF3RXhKREFhNkUwaFJoZ1I4dGlHRUNQeW9XOUZoMG9kcEVIZnFuTWVnZGdaSk5BM0JBRkJ3UW5KSVc2LytrRVpITWlIOE9CUUJrSzNDOWxrT1BDejExNDk2S3Fycm5TZ3BjaE40RnprUENLWHFINEhicVEyZXZic1Nmd1gwVVVxSDE2d3VqTFY1WWUzcDNGRlFCR29Pd1JFaitML0ZBNzZFdVFuYjhPUmRCQ2xoRkZHZEtnWUdOSk8zWTI4YWZRVTk0WWNDQWtDRW1FQkpyRWNRU0J5SllOOGhFV0FFcGMwU1U4MHpGOTk5VFVkZmZTeE5IdjJKOEd1WnMxNnphVDkvdnNhT3ZQTWMrajExOStnRlN0V21MUm5uMzB1V082Zi81eEpwNXd5aG5yMDZFV1hYbm81TFZ6NFF6RHZrMDgrTmVYbnpQbU1SbzA2eFpTQnYyVEpUOEV5ZUZueGxDbjMwZENodzB6KzZhZWZhU3hVS1RCOStneTY0b3FLYi9GLy92a1hlSm4xTkZQKzdMUFBwYmZmZmtlS1UwN09adFBuTysrOFMrZWRkNEVwZzdiZmV1dnRZQmtFWG4xMUZoMTMzQWttSDM1NGZvWENHbEVFRklGNlFRQTZVS3hIRUJ4MEpId3hLa1Jub2h6QzRpTWZZWEgyc0tTcFgzc0U0aVpIdVdwQjE3aktFUjhDZzRPZ1VBWjVRcFltZzM4Z1lFd0crRTQ2OUJsK1NCKzRqOWluVDErNjhjYi9vNTA3ZDVwM3V0NXl5d1E2K2VTVGFhKzlldEMxMTE3RDVEV1VPblhxU0xmZi9qZjYwNStPTWtONzZxbW5hZUxFdSttb280Nml4eCtmd2VNdXAzSGp6cURmZmx0dTh2UHo4Mm4xNnQvcDdyc24wNFVYWGtCMzNuazdiZCsrelpDaEtjQS9qend5bmJCa2UrdXR0OURNbWY4d0h6WWRQZnBVUWwyNHJWdTNtdkdZQ1AvTW1QRVlUWnAwRDQ5bkNEMzU1TitwYTlldWRNTU5OeEhJRUs2c3JOVDBlZjMxTjlKaGh3MmpoeCtlUmgwN2RqTG5WbGhvUFdPRis2KzMzbm9ialI1OU1zMmE5WXE1ajRweng3MU5kWXFBSXRCd0VJQkZDRDBwaElnNDlCaDBGM1Fubk9neHhLV3M1S0VlblBnbW9qK09JUkQzc3FyMERBSFpMVWdJRG5FSUNnSVZzaFJCd3NlQkNZQThTWmYyYXVOLy9mVTNUSFM5S3pSeHdna24wRFBQUEduUzdyOS9DaDE3N1BHR2VIQ1BiOUNnZ1hUZGRYODJlWWNmZnBnaG4rM2J0M09aWTB3YWlIRHExUHZwK3V1dm81dHV1c0drSFgvOGNDYktvOW5LZk4yUXFFbmtud2NmaEdVNDFFU3hISExISFJOcHk1WXQxTDU5ZTJNbDl1N2R5eEN4eCtQbUY2MGZUQ3RYcmdwZVZFZ2I4TkhuUXc4OVFsZGVlUVZObUhDTHlSbzU4a1JENkxBd3NXbEhITVkwZnZ4VkpycnZ2dnZRaUJHajZNc3Z2NklUVHh4Qnk1WXRNK25ubm5zdXRXN2Rpb1lNR1VKang0NmhEaDA2U0hYMUZRRkZvQUVnSUlZQzlLRVFJL1Nua0ozb1NneFY5S3JkdHhPcDFHa0FwN1hIRENGdWNwU3JHdmdpS0VsREhJTEdJV2tJUTRoQ2hnakRpZThFa3Z2czA2OENZYUhOTm0xYUI1dHUxYW9WUGZiWWREcm5uUE5NMmhkZnpBM2U4QTRXc2dWV3JWcGxZczg5OXp4dDJyUXBtSU5semM4K20xdWhyLzc5K3dmekJ3NGNhTUovL0dHUjQ3aHhZK25tbTIraHd3OC9nbzQvL25nNjRvakRtV0NQTkM4V0RsWUtCRmF1WEdsQzRUdG1qem5tYU1JU3JsaWJLQVJ5Rjlldlh6OFRsSEVPSHo3Y2tPemhoeC9KUzZ2SGN0K0gwZkRoeHhFd1VLY0lLQUlOQndIb1NGbGh3NmlnRTZGRFJZOGlEV0hvVGxsK1JSaUhsRVViNmhLRFFOemtDTUZBSUNBOUNCWU9jVG5DaFNseHFRTmZCT3pVS2NGS0F3bFU1VnEyekFwbXU5MVZyeWJqT1V5NGd3OCttR0Q1aVR2Ly9ITnB3SUFCRWpVK3J1N0V3VHEwT3p5L3VQLytnK2pqajJjVDduM09uUGtpTC9IMm9UZmZmSTJ5c2tMalFSMnYxM29SdTcwOXBFc2MveHppUEI1ckN6aml3Tkx1Y0tHd2FORUMrdWlqMllUbnFQN3lsMXY1VFI2WnZNVDZiOXB2djRwanQ5ZlRzQ0tnQ05RdEFtSVpDa0hLYmxVUW4raEkrSWlMcnBYL2QraGY2Rlk0MGFsMU8vbzl2N2VRWm8veFhDRUlPQWhXaElnNHdwS0hPSVFvQ2gyQ2xlM0pLQ2N2QlVDNXVuRDRRdmVmLzN3ZG5YVFNLSDRGMUZwemoyN1dyRmY1SEVKa1ZsSlNFaHhLMzc1OVRCaUVlL25sbHdiVFlUbkc0elpzMk1EM0JEdnlmYzAvbXdQM0EvRmM1dno1QzlpU0hGNmhxYjU5KzVyNHdvVUx6VDFIeWZ6Kysvbm1VWldXTFZ1YVp6RWxQWnFQKzVqQUhrU09BMHU4Qng4OGxKZU8zMUZ5akFhYXBpc0M5WUNBRUIxOGtCMTg2RXJvVWVoWGhLRkQ1YVVBSUVNaFF1UkwySzUzNitFMDl0Z3U0eVpIQ0JEQ0FNbUpneEJGa0VqSElZS0cwTVhLaEtCUkYwSkdlYWZjcGswNVp1blIzaDdhbDN1SUR6NzRFR0dwODQwM1hxUE5temZUeUpFbjA3UFBQaHU4YndkckN6dFdjV0NqUzNaMnRpR1dlKzY1bHpmUnBCbnJEN3RRLy9yWDI4MDlTTnlMck03aFBDKzY2RklDNlU2YjlvQzU1d2RMRGs2STBONEcvZ0d3c1dmYXRJZU5WWW5sMm0rKytZYkgvQ2JmeDd6ZFhyVEtNRFlTUGZmY0MyWVpHVmJyb2tYL05lVmwrYlhLeXBxcENDZ0NkWVlBREFZNDZBcFlqZlpWTnRHallvU2dIUFFvNG5ESUY4dFJmSk9oUDQ0aEVEYzVRcEJ3RUloWWhqSWFJVVFJRGs1OHBBdEp3bmZTNFh0cUsxYXNZQXV2OG5PT2VFUE9kOS9ObytlZmY0RWVmZlJodmcvWnhoeFhYMzBWM1hmZkEveFl4TkhVcjkvZXhxTDg1cHR2emYxQmJIVEJocGk3N3JxTENkekRPMElmNVYybzI4MlFrWGZOTmRlWU1NNHAzTm5URUg3aWljY0pPMlBQT09Nc1V4UTdZckVMdFVlUDdoSGJ1UFBPTzh6a2YvVFJHYVpQbEwvbGxyL1FaWmRkRXJGOGVQK0lYM2ZkdGJ3TGRodGJxdGViYkN5cDNuREQ5WFRxcWFkR0txNXBpb0FpVUU4SUNOR0pMa1VjWVRFY29FT2dRMEdjOEpFUC9ZdDBsQkZkaXJnU3BQTkNyUEc3VlVWSUVBeUVCT0VoRFFmaUlsaUVrWVo4a0NsOExLdGl5ZkhRUXc5MS9veHEwU0oyalBMcEJDY25tc0xZZCt6WXdkWmNTNTZjTmJOMnNheUxjdzYvenhodHFPaHoxNjVkdGRwRWczUEp6ZDNGTzFaYkcxbEU2MHZURlFGRm9INFErTzY3NzZoTGx5NlVscFptL2tlaE0wR0FJRDZFaFJRbExxTkVIRG9DUGh6Q0tLL09XUVRpdGh4RkNQQkJkSEFJNHhBaFFhaFlNa0Fhcm1qa0NrZXVrRkN1SVY3cFJDSS9uQU1zenRxNDlQUjA4NHhqckcyZ3o5cnVMc1c1MUhiY3NZNVh5eWtDaWtEOENPRC9IQWVNQnBBaURra1QvWWk0T0tSQmQ4SWhYZlN2bEpWeTZqdURRTlhiTmlQMEljS0NMeVFuUWhLekgzRVJJbnlRb3h5STJ3VWJvUXROVWdRVUFVVmdqMGZBcmpmRkdzUkppNjYwNjFIb1REbFFSb2dTdnJTRGRIWE9JUkEzT2FKckVCd0VJbVFvZ3JMZmd4VHlSSG5rNDhBRWtLVUF4TlVwQW9xQUl0Q1VFWUFlQkJtSzdvUnVSWnFkQ0lVazdXVlFSd2hWZFdsaVpsQ05HUW9DZ2JBZ1RIRWlVQWhUQklaOElVUUlGSGx5U0QzMUZRRkZRQkZvYWdoQVgwSVhRaitLN29RUEo0WUh3cmhOQlNjNkZXSFVnVDYxNjEra3EzTU9nUnFSb3dnVndoS2hZa2gyNFVGd2tpY1AxZHNGYnkvcjNPbG9TNHFBSXFBSU5DNEVRSkNpVXlVTXcwT0lFejcwcWVoTWxKVzQ2TlRHZGNhTlk3UnhrNk5kR0JBV3Jsd2dTQkVZNHJqcUVXc1JjWlREZ1RKU0RnSlhwd2dvQW9wQVUwZEFkQ1IwSThMUWphSXpFY1lobGlMU3hVbDVFS1U2NXhFSUlSMWoyMEpxRUNJY2hDWUNFMStXVzFFV0FvUVRJVXZjSk9xUElxQUlLQUpORkFIUmhmQkZyNG8rdGV0TGV6a2hRdEcvUXFKTkZNS0VubmJjNUFoaFFGZ1FJa2hRaENVQ2xud3greEdISUhHSUlCRVdnU2YwN0xSeFJVQVJVQVFhS0FLaUEwR0VRbllZS25RblZ0L0UyZk9nZDBYL29weVFxcFJWM3prRTRpWkhDRXFFQWlHSmdNWEgwRUNDRUNMSzRoQ0JRcEFnVk1SVnFNNEpVVnRTQkJTQnhvZUFrSjdvUitoUTZGYlJuYUpmeGNjWlFtOUcwcitONyt3Yi9vampKa2NJU3F4RENCRU9Rb2JReEVxVWU1RElRMWdjOHRVcEFvcUFJcUFJaEJBUXZTZzZGRGxpUEFnUlNoeGxjWWdlUmxraFdZVFZPWWRBM0d3RklVRVlFQTdDT09SS0IyRzcwQkRHSVU3cWhhZEx2dnFLZ0NLZ0NEUWxCS0FUOFRZeCtLSkhFUlpkQ2l6a3NRNlFJc2dTK1FoTE9ZVFZPWTlBM0tnSzJVRjRjQ0lrQ1VONGNCQWNIQVF1WmNWSG51U2JRdnFqQ0NnQ2lrQVRRd0M2RlBvUk9oUmg2RTdSbHlCRXBJdCtSVHJ5UmYrS25rVyt1c1FnRURleUVJNElSQWhPQkNiQ0ZJRUtDVW9jQW9hekN6a3hwNld0S2dLS2dDTFFzQkVRZ2hNOUtYb1VvNFloZ1h6a1NUbWtvNHpvVWRHL1NGZm5QQUp4a3lPRUJxR0E4Q0FveENWTmhDaHh5VWQ1Q0JTKzFFVjlkWXFBSXFBSU5GVUVvQjlGSHlLTUEzczB4R29VWENRUHZ1aGI2Rk9Kb3cxMXppTVEyaThjWTlzaUVQaENjQWdMOFVGNGNKSUdJV0pOSGNRcDVJazhXV2VQc1ZzdHBnZ29Bb3JBSG9VQTlDQjBvdWhSaEtFdlpVYy8wb1U4b1MvbDhRNHhQbEFXWmRDT091Y1JpTnQ4Z3lBZ0VCd1FJZ1FGd2NHSklKR0dmUGdvZzNRUkpNckpKRUJZblNLZ0NDZ0NUUkVCTVJhZ0swVS9pbTYxa3liMEtQU3UvVUE1bExIcjJLYUlZU0xQT1c3TDBTNVFEQXhDZ3RCQWduQWdRamk4VHhWNWlPTVFrb1F3cFEyRTFTa0Npb0FpMEZRUmdPNkVIaXdwS2Ftd0sxWElEL25RbjdBYXhRaEJIaHpTUmY5S0hEN3FxS3M5QW5HVG93aEdDQTZraHpTZmoyOGU0MkNCSWMvNHpIMHNXdktWODRlUGVheGxaYVVtbmFjRGwyV3JrOVBWS1FLS2dDTFFGQkdBL2l2M2xySnV0RmJhZUUwdW9DdjVmbUtTaDd4bEpRWVdzOVRxdDNhcUd2M0xPcmEwcE5RUXB0Y1hldUVLU0ZISVZBbXk5alBLeFNRVzE5MWNGQmVMRCtIU0xZdXA0TnZieUx0NVBtK3hVcktydlVpMEJVVkFFVkFFWWtQQWxkeU1VdllhU2MwT3Y1L2NHZTJDUzYrb3JRUVpHNGJSU3NWRmppQkRXSVVDZXNuMjVaVDM1bEhrTDkwZHJYMU5Wd1FVQVVWQUVVZ3dBcDQyKzFHck03NGtsenRGQ2RJaHJKTnl6am1iY0d5KzZBSXErZkcvbFpyZCtkQTArdU9xSzhnZnVLY29aanRJc3ZpbnA1UVlLeUdtQ1lxQUlxQUkxQzBDM3UxTHFYajFoK2EyRll3WUhPcHFoNERIWDFJY2FJSEJEQVBVdTI0ZEZYNDJoMXo4SldvL2I3QnhwYWVicXhJUW85bFlzMnRGN1hyWDJvcUFJcUFJS0FLT0lPRGQrWnZSeS9aTk9vNDAzRVFiOFdTLytYYlVVOC8vNEgyVGwzN0VFWVlZY1RVQ1VvVDFpTU9YbnhlMXJtWW9Bb3FBSXFBSTFCMEMyT1FvRmlOOFdlV0RyeTUrQkpKS2xpMmw4czJiSzlYMEZ4Y2JxeEVabWFOT0R1WURkT3hRQlVsNi8vZ2ptSzRCUlVBUlVBUVVnZnBEQUxwWkRvd0NZWFUxUjhDejdaYS9tTnBwZ3dkVG0wbjNZSXVUaVJkK1BwZjhoWVdVM0xNWHBleXpEM2x6Y2lpcFE0ZWcxVmo4ODgva3o4OG5Tb3ZTdVF2UDRsUytZckVMVEs5b29tQ255WXFBSXJESEl5QzZNQzQ5Nk1lejRWV1RuclM3eHdPWTRCUDBwQTBaU2lXTGZxRGlSWXVvWVBiSGxEbmlSTk5sd1FjZkdEL3pwSk9vNk91dmFQdlVLWlIxM2ZXVWZ0eHdjMFdTLzg3YkxLTG9RdkllOWdMNTJ4MXEycEFYQklpUEIxNXptR3dQT3VpZ0JKK2VOcThJS0FLS1FNTkVZTUdDQlpTZG5VM0p2S2NEenpMS1czSWtERjl1WStFK29pRzlaWStRLzM4em9wNlFFQ1A4dUVnM2FvdE5OOFBUWnVKZGxQdkM4NVQveHV0VXVteVpJY2ZTWDM2aHN0V3JLQ2t6a3pLT1BvYnkzM3pESU9UZHNNRXkyOW1pTFBwaElhVU5ybXdaMnFHMFhnNFErc1lqQkliTlBCQTZuUGoyT2hwV0JCUUJSYUFwSUFEeVNrbEpNUzlSZ1M1RUhEN0lFcVFJaHpqMHFCZ1dWV2xjSWNhbWdGMWRuS041UTQ2blkwZlRsK3hjTGZqNEl4TjN0MjFIc0JCTGxpNDE4YklWeThtM2JTdVY3OWpCYjNid2tzdGprVnlrZ1VLZ2JuN2xVZmdWakJBaVhvY2tMOUtOVkYvVEZBRkZRQkhZa3hGSVRVMDFweWU2RUtRSVozUm5nQ3dSaGc0RmlZSXdmVXlnMGRmclRIWDljUWdCUTQ2d0NPR1NtcmN3ZnZtMmJjWXZXN3VHeW1iKzA0VHhVL0xUVC96US81dVVjZklwNUlHUTJBcU01aUJVQ0JNK0JJc3JuN1MwTkpOV1ZGUVV2RXFLVmwvVEZRRkZRQkhZa3hFQUtjSllFQ01CSklnNExFaFphc1g3Vk1XU2hDNHQzWk1CYVdEbjV0bCt4KzFVdlBoSE02eTBJVU9NMy9McWE2am9xeStERC82WHN1Vll6THRhVS9yM3ArWmp4aEMxYVV2dUhqMzR2ckJsVVVZNko3TkV3TUtIQTBsQ3dDQklFYndJUDFMZGVOTVc4ZjNTZWQ5K1JlM2FkYVRXYmR0U0I5NDQxSzVkTzJyUm9nVmw4dEp3UkljYjJ6d0pJMjBhaWxoZUV4VUJSVUFSY0JBQnVjVWtPaEhraHdNT2FjaUhuclRIa1c4dHVKcGsvVWtnQXA1aTNveURoL3Vianp1RHNEa0h6dE81TXpVLys1eGd0OFY4ZjdIa3QxK3AyY21qeWQyaG94RmFtMXNtVU43cmM3bE1ickNjUFFEaHdzR0hRR1U5WEpaWjdSUEJYcThtNFkvZWY0djY1cjFDeWV1SlZ1YjY2TWRTRHhWNFU2bkVsY0h2RzJ4RDdyVFdsSnpabWpLek9sQ0wxdTJwVmV0MjFJUEovZUNERDY1SmQxcEhFVkFFRklGYUk0QVZOZWhIV0k2eXlnYTlLTmFqZElCOFdKQW9MNjlza1R6MUU0ZUFwOE1ML3lBM1c0SjRDMDQwbDNiUXdkVHBqYmR3ZHpqMDJSUzJ6bEo2OXFMeW5FM1JxaG5CSXhNQ0YyY25TbnU2NU5mRVQwbEpwWDZkMGlnN2k4akxDL0tlTkNabTNBNzFGL0lQSDk3MVZGYmlwNkpTUCtYdDlOSG1kZVcwNEJNdnpmMWdMUDNsemtlQ3l4bzE2VHRhbmExYnQxSTZYM1EwYTlZc1doRk5Wd1NhTkFJLy8vd0xUWnA4WDBRTTdyeGpBdTI3N3o0Ujgrb2o4ZlUzM3FZMzMzeUhUanR0REowKzdsUkhobUFuUkpDay9VQUhzQnBoUGNweXE0UWQ2VndicVJZQmo2ZGpwMm9Mb1lDTHIxN0U2aE8vdW9vZ1B3Z2M1ZUZ3UllUdlBDTHVGREdpWFR4U2tsOVNSb1ZscVZUS2srbVgxU1cwYWFlWFVqejhGcDl5WHNkUFl1dlZ6ZXY0SE1kSTJtZWwwT21IcDlEblM5NmhLVk5hMFoxM1RrSXpqcml2dnZxYWJyengvMmo3OXUybXZVTU9PWmltVDMrVU9uV3lOajA1MG9tdEVaRHd1KysrUjVkZGRva3RWWU9LUU1OSG9IdjM3dFM5ZXpjejBBc3ZzRmFxWnI3NGlva2pyeUU1RUNNY2ZLZklVY2dRdDV0Z0hlS1FOTkdkRWhlZGliaTZ1a0hBdWlrWVIxOGlIUGhDZWxWVlJ4bGNJY0dYOGhBOHd0SldWZlZqeWNOMGNiTng2bVlDTEM4c29xOTM3RTNIbmZFMzhyaDlsTm1zbGZrMldtbHhQaFVYRjFDSjEwM3YvL3RPMnJ2Tkp1clZJWTMrL3Q0SE5ISGk1Rmk2cWJZTWxqN0dqNytHSmt5NGxjNDc3eHpDeHFNYmJyaUo3cnZ2ZnBveDQ5RnE2OWVrd0pZdFcraWVlKzZseXkrL3RDYlZ0WTRpVUc4SU5HdVd5WHNDTWt6Ly9mdnZhM3lKSTY4aHVYRnNMYjdCMWlOOHAvU1c2RUQ3L2d1MERYMEpaKzhIT2xQU0d4SXVlL0pZUXV1ZGNad2xoQXBCMllVWHFicWREQ0ZjV0k0NDRCQjMwdmw5c0F5VGFFZXVsL2JxZHdDTk92RTRPdUg0NDJuejJxVzBkTjY3bEo2V1RDZU9HRUZqVGhwT1hWdDdLSVdIVVZybUM0N0hpYkZzM2JxTkNnb0s2TWdqanpEbmg4MUE5OTkvSDF0MUllTDY1Sk5QYWN5WTAzakphRDhtdENzSmxoOGM2dDE4OHkwbWZjU0lrZlQ2NjlhenBjaWJ4Rzh1bWpYck5RU05lLzc1RitpaGh4Nmg1Y3RYMEFVWFhHelNoZzRkUmw5ODhhVUpmL3JwSERybGxER21yYi85N1k3Z1VqanFUSjU4ajhrYk5lb1Vxekg5VlFRVWdXb1JnTFU0NjlVWEhiTWFwVVBvUVN5WHluT00wSmxJZzI0Vi9RcGRpM1FwSTNYVlR5d0NOV1lvQ0ZESUw5SVFSYkFvSTRTSVNRQkJ5eEdwWGszVFREOThOcmxGUGtwdGxrMTRDODkzM3krbWp4NGZUNjZ2SDZMYnJqNlZ4bDgwa3M0ZE41eGN1V3ZKazRvSGJmRW9pclhrVzlOKzdmV3lzenZSZ0FFRDZPS0xMNkYvLy90VldydDJIYlZ1M1lvR0R0elBGUHZsbDE4TklaNTIybGpPZjlsTTlsdDRZeFBjaEFsLzVmSnJUZnJWVjQ4M1JQbjk5OStidkczOGFNM3UzZnlxdm9EYnZYczM3ZHk1ZzNyMDZFNzMzanZacEw3eXlyL01CaU1RNW1XWFhVSG5uMzhlSVczeDRpVTBiZHJEcHN5dVhUdnB1ZWRlb0lzdXVwQXQyVWVrT2ZVVkFVV2dIaENBam9RdWhINFVNaFM5aVNWVzBhK3lZeFU2VjEzZElSRDNzaXFHQmdHQzZFU1FrWVlMd1VvKzdqUEsxUkRLUXZDT0N4cHJxL3hXK2gwbGJ1cmQ3MERDQTdaNzkrMUJKMXp6QkRWdmxrTG5iOHJoWmM0Q1dybDZFelVyK2grZlJJb1pOZy9UVWZmaWkvK2dKNTk4bWkyMGU0MDFlTkJCZzlsNm5FcTllL2VtTDcvOGtrNDQ0UVFtcm5OTm53OC9QSTErL0hFeGsyUTUvZWMvNzlISEgzOUkrK3pUandZTkdrZy8vTENJNXN6NWpJWU90WFlRUnhva2RxOTE3ZHJGWlBYczJkUDRuMzMyR1IxenpORTBjdVJJRTcvdXVtdm90dHR1NStOV0V6L3Z2SE5wN0Zobk5oU1lCdlZIRVdnQ0NHQkRqaXlyT25YUFVXQVRnb1FQQjdJVUt4RzZFdW5RdDQ3clRCbUEraEVSaVB0U1JBZ3ZZbXUyUkNrSGtvUlFoUnlSTGhha3JYaXRnNGJrbUNCM0ZMdHAwYUtGOVBHSGI5RVA4NytnTHQxN3NpWFppYzY1K0VhNjVzYTdhZXlabDFLYWl5MUdKa1VlaXVPdVRaczJkUHZ0ZjZYLy9lOG5ldXV0Ti9oY2ZYVFZWZGVZZmxhdVhFVjkrL1lKOXRtcVZTdERaQnMzYmpScHNBVEY5ZTdkaTFhc1dDWFJtUDNac3orbHVYTS81eVhWQWVhNDRvcnhabk9RL0xPMWE5YzI1cmEwb0NLUVNBVFdyRmxuVmxkNjJEYmZJSXdWRitRMUpBZGloQlBmeWJHSmpvUnVSQmhrS0RvVFlSd2d6T29NRWlmSHBHMnhFUmN2Q0JBVUhJUlluUk1oaThBUkY5S3NybTY4K1dZMExqOXQyT21ucFM5TnBGdzJxUEpMK0tNaHZFbG42V1l2VGZqN2x6Umt5SUgweTAvZlVvYzBKa2NYbjdxL0xONXVxaXkvZXZWcVdyQmdJWjExMXBubVBBY1BQcENYUjIraWM4ODkzMHhzN014YnRXcDFzQTFzNE5uTW53dnIwS0c5U2Z2amp5MGtCTG1KTFYzWnlZZC9qRjI3ZGdYcllWazFtanY2NktPTTlUbDE2cjNSaW1pNkl0QWdFTGg3MGhRcTVQYzByMkV5dkh2UzFPQ1lDZ29LK1JHUEtmVEM4MDhGMCtvN1lOK1E0OVJZUkJmQ0Z3TEUvenFJVWZRczRuRFFvVUtlVHZXdjdWU05RTnlXbzFpQUVGcFZCQ25FaVBJb2gwT3Voa1RRVlE4dGpseWVYRzd1cDd6RVMyMjc3a1dUWHZpZVRwdjBLVjMwd0dkMDF0UlBhZXBMODNpVHpEQmVhazJqd3J3dDFES0RYK1RMSEMrVE00NmVxaXlha1pGQnQ5NTZHMi8zZnNzOHNwS2JtMHV2dmZZNjRYRU80RFZzMkRCNisrMTNDSTk3Z09DdzlJcmRySGl0M3JCaGgvSW1tNGNKZFpZdVhVWXZ2dmlTU1VPSElNdzVjK1lRQ0hQTm1yWGN4cnZCY2NENmhNTzlSVnhaWWhuMmxWZitUZlBuTHpEM1haOTU1bG02OU5MTGcrVTFvQWcwRkFSNjlPakdxeHY5ZURoK002OHh0eEZHbWx3WU5wU3hKbUpEanVnZjZFcTdMc1gvTVpaVHhkbnpwSTdrcVo4NEJFSVNpTEVQQ0FyQ2cwQ3JFcFNkRkVFTUtDLzFKQjVqbHpFVXM2NnF5bjEreW1FREs3K29tREtTVTdsUEVDQ1RjNm1YUHYzME05cVp1NXZ5VnMrbGpuMzQ3VGxsc2htbmVnczRoZ0dZSWgzNUJlNlBQejdERU9STk45MXMwbkFQOGFtbm5qUmhXSktUSjA4eWhJam5JUHYwNlVOUFBQRzR5WnMrL1JHNjVwcHJlZlBPQWVhVmQxZGNjUm1OR0hHQ3lUdjc3TFBvUFg3azVOQkREeU1zMitLZXBHRGZtZDltZE9LSkkyajA2RlBwNmFlZk5IVW1UcnlETndWZGF1NTVkdXZXalI1N2JMcHBSMzhVZ1lhRXdNUTcveG9jRHF4SU9IdGFNSE1QRFFqcFFSL2kveGtIZENUMkVpQlAwdVIvSFRCSW5UMFVrZ1oxV25HVEl3UWx4QmZMbWVCZWwxd0ZvUjVJMG1tSENaV2N6RXNUU1NrMHJPMWErdlVGZnMwZGJHTG1QWmxrU1p6QUZFMm45RXlqcEpRMFN1YmwxclFVdlBnM2JnaXFIUDdKSjU5RW8wYU5OTityaENVcGxwMVV1dUNDODh5R0hDd24yZC83MnI1OWUzNThZNVo1TmhLYmlZQ1ZPT1RObVRQYldKdW9ZODlEbWFlZWVzSThyaUU0WDNMSnhVeU9GNW55ZUwrc09CQ3pPa1ZBRVlnZmdVUnV5SkgvWitoR0VDV2M2RW5vTmpzaDJva3kvclBRR3ZFZ0VEY3pRR2hDT05WMUJFSGFoU24xd3RPcmE2ZTYvSjY5K3REbUpXWFV2WU9ML3RRdm5TaVZkOXBFM0d6am90SUNIeFVVZS9uTk9TN2FubDlPdVhtNTFUVWZkejRtT3l5NmFBN25ieWRHZXptOGNpNmFhOTY4ZWJTczRBdUtwUUQ2c0JPanBLdXZDQ2dDOFNNZ0czSGdPN2xiRlRvUmV3OXdZUXRpUkZ3T2lTTVBaYUJYa0tldWJoQ0lteHlGN09US3BycGhRc0JTVm53UmZuVjFZODAvNDh6emFOclAzOVBXSDk0M3I0emJWY0N2a3l2MlVSNGYyL045SFBiVHJvSnlLdkh6dXdxSkQzNk1Jem0xR2ZrOWFYVDRFZEVmbFlpMWZ5Mm5DQ2dDdFVNQXF5d04yU1ZxUXc3MEkwZ1BldFZhQWJNK2RDd3ZKUmRkaVhJZ1NIVjFoMENOeUJIQ2hDQ3JjaUpVbEpIeUVERHE0UkNTcmFxTldMaWJHQkFBQUFSclNVUkJWUE13a1c2OTUwbDY4TUdlTkcvZVBQTzVxcmJkMjVyN2MzdnpKNnhhdG14WjRjakt5aktiWUxCOGlUR3BVd1FVZ2ZwRjRPcnhWOVR2QUtycEhkYWlreFlqdWhNZEtyclNyaFBGa0VBYXd0Q2hjUFl5SmtGL0VvWkEzT1FJUVVHWUlxeXFSbVlYTEVnSTl4K2xiaXoxcTJvN1BBL3RUNWhndlcwbVBFL2ppb0FpMExBUmtIZXFOdXhST2pzNjZFZlJod2pqZ0k2VVBRZDJncFI4bEZkWE53akVUWTRRRW9RbWdvczJUSlNEdzNvNXJwRHNkWkNISlFJVmREVDBORjBSVUFUMmRBU2dCNkVieFZCQVdJd0krRWdYOG9TK0ZKMjZwK1BTVU02dlJ1UW93cXp1SkNCc0hIQVF0aEFrcm81RThOVzFvZm1LZ0NLZ0NPeUpDTWhLR2tnUCtoQytIR0pCZ2h4RmgrNkpHRFRrYzRxYkhDR29XQ3crbEV0bWdZdUZLVGVUVVJkcG1BU3h0Tk9Rd2RPeEtRS0tnQ0pRVXdTRUZLRUg4ZjVwZVJRTGNaQ2xrQ0wwSmVMUW9hSlBhOXFuMW9zZGdiakpFUllnSElSWmxYT1Y1cEd2Y0lzaFFVT0dYQmhYUTNCSldDSW8yVTdlL00wbXJqK0tnQ0tnQ0RRMUJLQURmWVZwNU9OYlQ4WmlUT2FkcXFWc1BVTEg4bEhHcEFpSFBCTmkwblNWRnpZMW1PcnRmT01tUjR4VXJteXFHclgvdTZ2NXNZbUtUaDVyVCtYazduenNXRkl4WDJPS2dDS2dDRFFWQkhyaVJKZUZ6bGIwcFdWQ2hOSTFWRDhJQ0YvRjNMdVkrcmlhVWFjSUtBS0tnQ0tnQ095SkNNUk5qbGo3aHRQN2hYdmlkTkJ6VWdRVUFVVkFFUUFDY1pNakxFWVFveUhIcEJxdHlpcnlpb0Fpb0Fnb0FnNGo0SEpiSDNCM3VOa20yMXpjNUFoU3hLWWNISzVXK3pSWjRQVEVGUUZGUUJGb1NBZ2tzVDZXMjEzaU42VHhOYmF4eEUyT09FRzU3NWpTL3lweXBiZHJiT2VzNDFVRUZBRkZZSTlDd04xeEdDVjNHMjdPU1luUkdkRzYyQktNNlgxRUtDYUhQTHlLUnpSS2Q2Nmkwa1ZUcWZ5UCtmeWRsWXFQZDRRM2JZK2pyanpYNDh5cGFDdUtnQ0tnQ0RRZUJLQkhaUThIUmgySjFDS2wyYy9RbGRLQzNOMUdVUHJnVzhtZDJ0eTBaMWIxK1BhWHRGMWRHL2IyTkJ4Q0lDNXlSRFVRbkR5dmlJZFNFUWJSU1RwOEhMQXV3OE5DcW5oR01pY25odzQ2NktEUVNEU2tDQ2dDaWtBVFFtREJnZ1dVbloxdFBqY250NnBBYUJLR0Q5MktOQnpRcDBpeit5QStwTUhRa0hMaUkwK0pzZVlUS3VZZE5RQlp5QTdnaStXSGRDRkNoSVVzSVRCN1hJU0xzc2lERTcvbXc5ZWFpb0Fpb0FnMFRnU2dINVA1d1gvb1FkR1g4SkVHL1FvbmVYYVNSRDBjMEtuMnNKMFVHeWNpRFd2VU1aT2pERnVJRVVRcEFrSlloSWZQUnlFTWtoVEJvUzdLd0tHK0NCeStPa1ZBRVZBRW1pSUMwSlZ3MElPdy9FQ0tjTkNiZGtzUWFWSVcraE1PT3RaK1c4cE9qSGE5YXdyclQ0MFFpSXNjQVRxRUFoK0NGQ3RRTEVxa3d3bnBDVUdpTE1MNEZBdnFGeFVWbVRha1hJMUdycFVVQVVWQUVXakVDSURjaEJoeEd0Q2ppSXQrUlJoNkU4U0lQQkFnOHNLUFNIbG9UL1F4d3VyaVJ5QXVja1R6QUR5Y0RFRitFRFFFQ2ZJRGFjcVZEOEpJRjRKRVhZUnhLRG5HTHpDdG9RZ29BbnNHQW1KY1FLZENINHIxaDdOREduUXBpQkZoSEhCMm5SbE9sc2lYY3VJalRWM05FUGgvOEU2NDdpZENpQ3NBQUFBQVNVVk9SSzVDWUlJPVwiIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlID0gT2JqZWN0LmNyZWF0ZShtb2R1bGUpO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsICdleHBvcnRzJywge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0c2V0OiAoKSA9PiB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VTIE1vZHVsZXMgbWF5IG5vdCBhc3NpZ24gbW9kdWxlLmV4cG9ydHMgb3IgZXhwb3J0cy4qLCBVc2UgRVNNIGV4cG9ydCBzeW50YXgsIGluc3RlYWQ6ICcgKyBtb2R1bGUuaWQpO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJjb250ZW50X3NjcmlwdFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjaHJvbWVfZXh0ZW5zaW9uX3R5cGVzY3JpcHRfc3RhcnRlclwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjaHJvbWVfZXh0ZW5zaW9uX3R5cGVzY3JpcHRfc3RhcnRlclwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvY29udGVudFNjcmlwdC9pbmRleC50c3hcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==