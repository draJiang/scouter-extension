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
        isHovered && (props.data.id === 'Default' ? react_1.default.createElement("button", { onClick: () => { window.open('https://jiangzilong.notion.site/What-is-the-default-Prompt-Prompt-5b55e3fc303d425f8cca16d5bee19e7c'); } },
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
    const [images, setImages] = (0, react_1.useState)([]);
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
        setTimeout(() => {
            setImagesLoading(false);
        }, 1000);
        setImages(props.images);
        setImageIndex(0);
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
            if (index >= images.length) {
                index = 0;
            }
            if (index < 0) {
                index = images.length - 1;
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
            lineHeight: '0'
            // paddingBottom: '8px'
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
                images.length > 0 ?
                    react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("div", { className: "imageBox" },
                            react_1.default.createElement(antd_1.Image, { "data-downloadlocation": images[imageIndex].links.download_location, src: images[imageIndex].urls.small, alt: images[imageIndex]['description'], height: 240, width: '100%', preview: false, placeholder: true })),
                        react_1.default.createElement("div", { className: "imageQueue", style: {
                                display: 'none'
                            } }, images.map(img => react_1.default.createElement("img", { key: img.id, src: img.urls.small }))))
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
                                    react_1.default.createElement(antd_1.Tooltip, { placement: "bottom", title: 'Search Images(Enter ⏎)', getPopupContainer: () => imageBoxElement.current || document.body },
                                        react_1.default.createElement(antd_1.Button, { disabled: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified), type: "text", size: "small", style: { color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', opacity: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified) ? '0.7' : '1' }, onClick: handleSearchBtnClick, icon: react_1.default.createElement(icons_1.SearchOutlined, null) })),
                                    react_1.default.createElement(antd_1.Tooltip, { placement: "bottom", title: 'Generate Images with AI', getPopupContainer: () => imageBoxElement.current || document.body },
                                        react_1.default.createElement(antd_1.Button, { disabled: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified), type: "text", size: "small", style: { color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', opacity: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified) ? '0.7' : '1' }, onClick: handleGenerationsImages, icon: react_1.default.createElement(icons_1.ThunderboltOutlined, null) })),
                                    react_1.default.createElement(antd_1.Button, { type: "text", size: "small", style: { color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }, onClick: () => setChangeImageStatus(false), icon: react_1.default.createElement(icons_1.CloseOutlined, null) })))
                            :
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement("div", { style: {
                                            display: 'flex',
                                            flexGrow: 'inherit',
                                            alignItems: 'center'
                                        } },
                                        images.length > 0 &&
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
                                                    } }, imageIndex + 1 + '/' + images.length),
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
                        images.length > 0 &&
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
                                } }, images[imageIndex].type === 'ai' ?
                                react_1.default.createElement(react_1.default.Fragment, null, "Photo by AI")
                                :
                                    react_1.default.createElement(react_1.default.Fragment, null,
                                        "Photo by ",
                                        react_1.default.createElement("a", { style: { textDecoration: 'underline', padding: '0 2px' }, target: '_blank', href: "https://unsplash.com/@" + images[imageIndex].user.username + "?utm_source=Scouter&utm_medium=referral" }, images[imageIndex].user.name),
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
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const react_markdown_1 = __importDefault(__webpack_require__(/*! react-markdown */ "./node_modules/react-markdown/index.js"));
const remark_breaks_1 = __importDefault(__webpack_require__(/*! remark-breaks */ "./node_modules/remark-breaks/index.js"));
const rehype_raw_1 = __importDefault(__webpack_require__(/*! rehype-raw */ "./node_modules/rehype-raw/index.js"));
const remark_gfm_1 = __importDefault(__webpack_require__(/*! remark-gfm */ "./node_modules/remark-gfm/index.js"));
const settingGuide_png_1 = __importDefault(__webpack_require__(/*! ../assets/settingGuide.png */ "./src/assets/settingGuide.png"));
const Images_1 = __webpack_require__(/*! ../Components/Images */ "./src/Components/Images.tsx");
const util_1 = __webpack_require__(/*! ./util */ "./src/PopupCard/util.ts");
function Message(props) {
    const [images, setImages] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        setImages(props.message.images);
    }, [props.message.images]);
    return (react_1.default.createElement("div", { key: props.message.chatId, className: '', style: props.message.role === 'user' ? { backgroundColor: '#F6F6F6', paddingTop: '2px', paddingBottom: '2px' } : {} },
        react_1.default.createElement(antd_1.Skeleton, { loading: props.message.loading, active: true, title: false },
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
                }, skipHtml: false, children: props.message.content }),
            props.message.status === 'invalid_api_key' && react_1.default.createElement("div", { className: '' },
                react_1.default.createElement("img", { src: settingGuide_png_1.default, style: {
                        borderRadius: '4px'
                    } })))));
}
;
function MessagesList(props) {
    (0, react_1.useEffect)(() => {
    }, []);
    return (react_1.default.createElement("div", { className: 'messages', style: {
            lineHeight: '1.8',
            wordWrap: 'break-word',
            marginBottom: '18px'
        } }, props.messages.map((item) => {
        return react_1.default.createElement(Message, { key: item.chatId, message: item });
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
let StyledButton = styled_components_1.default.button `

    padding: 6px;
    margin-bottom: 4px;
    border-radius: 2px;
    cursor: unset;

    &:hover {
        background-color:#F6F6F6;
    }
`;
function PromptButton(props) {
    return (react_1.default.createElement(StyledButton, { style: {
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
        // console.log(PromptListDOM.current);
        // console.log(PromptListDOM.current?.clientHeight);
        // //设置菜单的位置
        // if (PromptListDOM.current) {
        //     PromptListDOM.current.style.top = (parseInt(PromptListDOM.current.style.top, 10) - PromptListDOM.current.clientHeight).toString() + 'px'
        // }
    }, [props.showFollowUpDataMenu.show]);
    // Prompt 菜单 item 点击
    const handleMenuItemClick = (data) => {
        if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified) {
            // 第 3 个参数 false 表示不重新渲染图片
            props.handleMenuItemClick(data, true, true, props.followUpData);
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
            props.promptList.map((item) => {
                // return <button onClick={() => handleMenuItemClick(item)}>{item.title}</button>
                return react_1.default.createElement(PromptButton, { key: item.id, disable: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified), handleMenuItemClick: () => handleMenuItemClick(item) }, item.title);
            }))));
}
exports.PromptList = PromptList;


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
        console.log(Math.floor(Date.now()));
        console.log(lastSpeakTime.current);
        if (Math.floor(Date.now()) - lastSpeakTime.current < 1800) {
            // x 毫秒内只可点击一次
            return;
        }
        try {
            lastSpeakTime.current = Math.floor(Date.now());
            (0, util_1.playTextToSpeech)(props.text, lang_1.languageCodes[targetLanguage]);
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
                margin: '18px 0',
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
const react_spring_1 = __webpack_require__(/*! react-spring */ "./node_modules/react-spring/dist/cjs/index.js");
const contentScript_1 = __webpack_require__(/*! ../contentScript */ "./src/contentScript/index.tsx");
const Nav_1 = __webpack_require__(/*! ../Components/Nav */ "./src/Components/Nav.tsx");
const CustomPromptForm_1 = __webpack_require__(/*! ../Components/CustomPromptForm */ "./src/Components/CustomPromptForm.tsx");
const Message_1 = __webpack_require__(/*! ./Message */ "./src/PopupCard/Message.tsx");
const PromptList_1 = __webpack_require__(/*! ./PromptList */ "./src/PopupCard/PromptList.tsx");
const Selection_1 = __webpack_require__(/*! ./Selection */ "./src/PopupCard/Selection.tsx");
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const icons_1 = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
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
z-index: 9999;
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
    const [messages, setMessages] = (0, react_1.useState)([{ 'content': '', 'role': 'user', 'loading': false, 'chatId': '', 'prompt': '', 'status': '', 'showImagesBox': true, 'images': [] }]);
    const [images, setImages] = (0, react_1.useState)([]);
    const [showImagesBox, setShowImagesBox] = (0, react_1.useState)(false);
    const [prompts, setPrompts] = (0, react_1.useState)([]);
    const [lastExecutedPrompt, setLastExecutedPrompt] = (0, react_1.useState)({ 'title': '👉🏼 Please choose a prompt', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' });
    const [isOpenMenu, setIsOpenMenu] = (0, react_1.useState)(false);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [isPopoverOpen, setPopoverOpen] = (0, react_1.useState)(false);
    const [customPromptFormData, setCustomPromptFormData] = (0, react_1.useState)({ 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' });
    // standby,normal,loading,success
    const [addToAnkiStatus, setAddToAnkiStatus] = (0, react_1.useState)({ 'status': 'normal', 'noteId': 0 });
    const [isAnswerDone, setAnswerDone] = (0, react_1.useState)(false);
    const [followUpData, setFollowUpData] = (0, react_1.useState)({ keyWord: '', sentence: '' });
    const [showFollowUpDataMenu, setShowFollowUpDataMenu] = (0, react_1.useState)({ show: false, style: {} });
    const [isApiErro, setIsApiErro] = (0, react_1.useState)(false);
    const [isAnswerInputed, setIsAnswerInputed] = (0, react_1.useState)(false);
    // 窗口拖拽逻辑
    const [dragging, setDragging] = (0, react_1.useState)(false);
    const windowElement = (0, react_1.useRef)(null);
    const messagesList = (0, react_1.useRef)(null);
    const inputRef = (0, react_1.useRef)(null);
    const shouldStayAtBottomRef = (0, react_1.useRef)(false);
    const userInfoRef = (0, react_1.useRef)();
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
            executivePrompt({ 'title': 'Default', 'getUnsplashImages': true, 'userPrompt': `Word:"{{keyWord}}", sentence: "{{sentence}}"`, 'id': 'Default' }, false);
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
            // 自动滚动到消息底部，方便看到最新的文字
            if (messages.length > 1) {
                if (messages[messages.length - 1].loading) {
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
    // 保存历史记录
    (0, react_1.useEffect)(() => {
        // 在 openApiAnser 更新后将其保存到浏览器存储中
        // 只保留消息记录的第 1 条，如果这条消失是错误提示，则不保存
        if (messages.length > 0 && isAnswerDone && messages[0]['status'] === 'success') {
            // console.log('Save');
            const keyWord = props.data.keyWord;
            const Sentence = props.data.Sentence;
            // 将查询记录保存起来
            const newHistory = {
                'keyWord': keyWord,
                'sentence': Sentence,
                'role': messages[0]['role'],
                'answer': messages[0]['content'],
                'source': window.location.href,
                'prompt': messages[0]['prompt'],
                'images': messages[0]['images']
            };
            if (keyWord !== '' && Sentence !== '' && messages[0]['content'] !== '') {
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
    }, [isAnswerDone]);
    const executivePrompt = (prompt, runPrompt, imageToRerender, data) => __awaiter(this, void 0, void 0, function* () {
        // port.postMessage({ 'type': 'StopTheConversation', 'messages': '' })
        // 设置加载状态
        setIsLoading(true);
        let needToRunPrompt = runPrompt;
        if (needToRunPrompt === undefined) {
            needToRunPrompt = true;
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
        // if (needToRerenderImage) {
        //   setImages([])     // 图片列表
        // }
        if (needToRunPrompt) {
            let showImagesBox = true;
            if (prompt.getUnsplashImages && needToRunPrompt) {
                // 如果当前 Prompt 需要显示图片，且当前需要立即执行 Prompt
                showImagesBox = true;
            }
            else {
                showImagesBox = false;
            }
            // amplitude.track('executivePrompt');
            webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'executivePrompt' });
            // 在消息历史中插入新记录
            setMessages(prevMessages => [...prevMessages, { 'content': '', 'role': 'assistant', 'loading': true, 'chatId': '', 'prompt': '', 'status': '', 'showImagesBox': showImagesBox, 'images': [] }]);
            // 非追问时，才会记录最近执行的 Prompt
            if (data === undefined) {
                // 设置最近执行的 Prompt
                setLastExecutedPrompt(prompt);
                // 记录最近 1 次使用的 Prompt
                webextension_polyfill_1.default.storage.local.set({
                    lastExecutedPrompt: prompt
                });
            }
            // 处理 Prompt 中的变量
            let newPrompt;
            let p = prompt.userPrompt;
            // if (prompt.id == 'Default') {
            //   p = defaultPrompt['userPrompt']
            // }
            // 处理 Prompt 中的变量
            p = yield (0, util_1.handlePromptVariables)(p, keyWord, Sentence, Lang);
            newPrompt = [{ 'role': 'user', 'content': p }];
            // 如果历史记录中存在记录，则不重复请求 API，直接显示历史记录的信息
            webextension_polyfill_1.default.storage.local.get({ "history": [] }).then((item) => {
                // console.log(item);
                // 如果记录已存在，则不重复保存
                let bingo = false;
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
                        // 直接显示历史记录中的回答
                        setMessages(prevMessages => {
                            const lastMessage = prevMessages[prevMessages.length - 1];
                            const updatedLastMessage = Object.assign(Object.assign({}, lastMessage), { chatId: Date.now().toString(), role: obj.role, content: obj.answer, prompt: newPrompt[0]['content'], loading: false, status: 'success', images: obj.images });
                            return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];
                        });
                        setIsLoading(false);
                        setAnswerDone(true);
                        setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 });
                        break;
                    }
                }
                // 无历史记录
                if (!bingo) {
                    // 请求 AI 数据
                    getGPTMsg(newPrompt, keyWord);
                    // 请求图片
                    if (prompt.id == 'Default') {
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
            });
        }
        else {
            setLastExecutedPrompt({ 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' });
            setAnswerDone(true);
            setIsLoading(false);
            // 数据埋点
            // amplitude.track('openPopupCard');
            webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'openPopupCard' });
        }
    });
    const initializePromptList = () => __awaiter(this, void 0, void 0, function* () {
        // 获取已保存的 Prompt List
        const promptList = yield webextension_polyfill_1.default.storage.sync.get({ "promptList": [] }).then((item) => {
            return item.promptList;
        });
        setPrompts(promptList);
    });
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
        // amplitude.track('handlePromptEdited');
        webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'handlePromptEdited' });
    });
    // 请求 GPT 数据
    const getGPTMsg = (prompt, keyWord) => __awaiter(this, void 0, void 0, function* () {
        // // 使用长连接
        // let port = browser.runtime.connect({
        //   name: 'fromPopupCard'
        // })
        const thisKeyWord = keyWord || '';
        // 设置为回答中
        setAnswerDone(false);
        // 禁用保存到 Anki 按钮
        setAddToAnkiStatus({ 'status': 'standby', 'noteId': 0 });
        // 在消息历史中插入新记录
        // setMessages(prevMessages => [...prevMessages, { 'content': '', 'role': 'assistant', 'loading': true, 'chatId': '', 'prompt': '' }])
        setTimeout(() => {
            // 使用 postMs 发送信息
            port.postMessage({ 'type': 'getGPTMsg', 'messages': prompt, 'keyWord': thisKeyWord });
        }, 20);
        // 接收信息
        port.onMessage.addListener((msg) => {
            // console.log('port.onMessage.addListener');
            if (msg.type === 'sendGPTData') {
                // 请求 GPT 数据失败
                if (msg.status === 'erro') {
                    // type === 'as2' ? setopenApiAnser2(msg.content) : setopenApiAnser(msg.content)
                    setIsLoading(false);
                    setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 });
                    if (msg.code === 'invalid_api_key') {
                        // setIsApiErro(true)
                        msg.content += '\
            After that, you need to set the correct Open API Key in the Scouter:';
                    }
                    setMessages(prevMessages => {
                        const lastMessage = prevMessages[prevMessages.length - 1];
                        // const newMsgList = lastMessage
                        const updatedLastMessage = Object.assign(Object.assign({}, lastMessage), { chatId: msg.chatId, content: msg.content, loading: false, status: 'invalid_api_key', prompt: prompt[0]['content'] });
                        // const newMsgList = [...prevMessages.slice(0, prevMessages.length - 1), lastMessage]
                        return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];
                    });
                    setAnswerDone(true);
                }
                else if (isApiErro) {
                    // setIsApiErro(false)
                }
                // 请求 GPT 数据成功且数据流结束传输
                if (msg.status === 'end') {
                    // 记录消息回答完毕（触发保存历史记录）
                    setAnswerDone(true);
                    setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 });
                    setIsLoading(false);
                }
                // 请求 GPT 数据成功且数据流开始传输
                if (msg.status === 'begin') {
                }
                // 请求 GPT 数据成功且数据流传输中
                if (msg.status === 'process') {
                    try {
                        // 渲染数据
                        setMessages(prevMessages => {
                            const lastMessage = prevMessages[prevMessages.length - 1];
                            if (prevMessages.length === 0) {
                                return [];
                            }
                            const newMsgList = lastMessage;
                            let newContent = newMsgList.content + msg.content;
                            newContent = (0, util_1.handleHightlight)(newContent, props.data.keyWord, ankiCards, windowElement === null || windowElement === void 0 ? void 0 : windowElement.current);
                            // newContent = newContent.replace(/o/g, '<span style="color:red;">o</span>');
                            const updatedLastMessage = Object.assign(Object.assign({}, lastMessage), { chatId: msg.chatId, content: newContent, loading: false, status: 'success', prompt: prompt[0]['content'] });
                            // const newMsgList = [...prevMessages.slice(0, prevMessages.length - 1), lastMessage]
                            return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];
                        });
                    }
                    catch (error) {
                    }
                }
            }
        });
    });
    // 用户发送消息
    const handleSendMessage = (values) => {
        // console.log(values);
        let prompt = values.msg;
        // 清空文本框
        form.resetFields();
        // 禁用发送按钮
        setIsAnswerInputed(false);
        // 将用户发言发送到消息记录中
        setMessages(prevMessages => {
            const updatedLastMessage = {
                role: 'user',
                chatId: Date.now().toString(),
                content: values.msg,
                loading: false,
                status: 'success',
                prompt: prompt,
                showImagesBox: false,
                images: []
            };
            // const newMsgList = [...prevMessages.slice(0, prevMessages.length - 1), lastMessage]
            return [...prevMessages, updatedLastMessage];
        });
        // 在消息历史中插入新 GPT 消息
        setMessages(prevMessages => [...prevMessages, {
                'content': '',
                'role': 'assistant',
                'loading': true,
                'chatId': '', 'prompt': '', 'status': '',
                'showImagesBox': false,
                'images': []
            }]);
        // console.log(messages);
        const msgHistory = messages.slice(-5).map((item) => { return { 'role': item.role, 'content': item.content }; });
        getGPTMsg([...msgHistory, { "role": "user", "content": values.msg }]);
        // amplitude.track('handleSendMessage');
        webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'handleSendMessage' });
    };
    // 文本框下敲击按键时
    const handleKeyDown = (event) => {
        // 阻止事件冒泡
        // console.log('handleKeyDown');
        event.stopPropagation();
        if (event.keyCode === 13 && !event.shiftKey) {
            // 敲击回车键
            if (!isLoading && isAnswerInputed) {
                // 非加载状态、GPT 消息发送完毕时用户可发送消息
                handleSendMessage({ 'msg': event.target.value });
            }
            else {
                event.preventDefault();
            }
        }
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
    // 文本框值变化时
    const onTextAreaInput = (event) => {
        if (event.target.value.length > 0) {
            setIsAnswerInputed(true);
        }
        else {
            setIsAnswerInputed(false);
        }
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
        // 先预处理 Anki 的 model
        // let sending = browser.runtime.sendMessage({ 'type': 'setModel', 'messages': { 'isAnkiSpace': isAnkiSpace }, })
        // sending.then((message: any) => {
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
        // }, () => {
        //   //error
        // });
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
    const AnimatedButton = (0, react_spring_1.animated)(antd_1.Button);
    const animationStyle = (0, react_spring_1.useSpring)({
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
        config: { duration: 1000 },
        loop: true,
        width: '32px',
        height: '32px',
        border: '1px solid red'
    });
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
                        react_1.default.createElement("div", { className: 'followUpMenuBox', style: {
                                display: showFollowUpDataMenu.show ? 'block' : 'none',
                                position: "relative",
                                width: 'fit-content',
                                height: '0'
                            } },
                            react_1.default.createElement(PromptList_1.PromptList, { followUpData: followUpData, showFollowUpDataMenu: showFollowUpDataMenu, promptList: prompts, handleMenuItemClick: executivePrompt })))),
                react_1.default.createElement("div", { className: 'w-full', ref: inputRef, style: { borderTop: '1px solid rgba(5, 5, 5, .06)' } },
                    react_1.default.createElement(antd_1.Form, { form: form, onFinish: handleSendMessage, 
                        // onKeyDown={handleFormKeyDown}
                        layout: 'inline', style: { alignItems: 'center' }, className: 'p-2' },
                        react_1.default.createElement(antd_1.Form.Item, { name: "msg", style: { margin: '0', flexGrow: '1' } },
                            react_1.default.createElement(TextArea, { placeholder: "Send a message", bordered: false, autoSize: { minRows: 1, maxRows: 2 }, 
                                // onChange={handleInputChange}
                                style: {
                                    caretColor: '#F08A24',
                                }, onKeyDown: handleKeyDown, onInput: onTextAreaInput })),
                        react_1.default.createElement(antd_1.Form.Item, { style: { marginRight: '0' } }, isAnswerDone ?
                            react_1.default.createElement(antd_1.Button, { type: "text", htmlType: "submit", disabled: isLoading || !isAnswerInputed, style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: !isLoading && isAnswerInputed ? '#F08A24' : ''
                                }, icon: react_1.default.createElement(icons_1.SendOutlined, null) }) : react_1.default.createElement("div", { style: { marginRight: '8px' } },
                            react_1.default.createElement(react_spring_1.animated.div, { style: animationStyle },
                                react_1.default.createElement(icons_1.LoadingOutlined, null)))),
                        react_1.default.createElement(antd_1.Form.Item, { style: { margin: '0' } }))),
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


// #LearningEnglish2023 h1,#LearningEnglish2023 h2,#LearningEnglish2023 h3{
//   font-weight: bold;
// }

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
  margin: 0.7em 0;
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
// import './assets/tailwind.css';
// 页面载入后会注入次脚本，或 background 可能会在一些情况下注入此脚本
// console.log('before browser.runtime.onMessage.addListener');
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
                    console.log(result);
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
            // 显示完形填空操作按钮
            const selectedText = shadowRoot.getSelection();
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
const getSelection = () => {
    var _a, _b, _c, _d, _e, _f;
    const selection = window.getSelection();
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
        // portFromMenu = browser.runtime.connect({
        //   name: 'fromContentScript'
        // })
        var _a;
        // ContextBox.current!.parentNode?.removeChild(ContextBox.current!)
        const PopupCardContainer = container.getElementsByClassName('container')[0];
        const messagesBox = container.querySelector('.messages');
        const sentence = '';
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
        // browser.runtime.sendMessage({
        //   type: 'UPDATE_POPUP_CARD', payload: {
        //     style: {
        //       left: left,
        //       top: top,
        //     }, followUpData: { keyWord: props.selectedTextString, sentence: sentence }
        //   }
        // });
        setShowMenu(false);
        // 取消文字选中，避免意外弹出菜单栏
        (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
        try {
            // portFromMenu.postMessage({
            //   type: 'UPDATE_POPUP_CARD', payload: {
            //     style: {
            //       left: left,
            //       top: top,
            //     }, followUpData: { keyWord: props.selectedTextString, sentence: sentence }
            //   }
            // })
            webextension_polyfill_1.default.runtime.sendMessage({
                type: 'UPDATE_POPUP_CARD', payload: {
                    style: {
                        left: left,
                        top: top,
                    }, followUpData: { keyWord: props.selectedTextString, sentence: sentence }
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
            react_1.default.createElement(StyledButton, { style: { marginRight: '10px' }, onClick: () => handleSetAnkiSpaceButtonClick(event, false) }, "[...]"),
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
                            (0, util_1.playTextToSpeech)(props.selectedTextString, lang_2.languageCodes[targetLanguage]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QjtBQUN2Qjs7QUFFQTtBQUNBLHVCQUF1QjtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQiw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBLGVBQWU7QUFDZixlQUFlO0FBQ2Y7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7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Q0E7V0FDQSxzREFBc0Q7V0FDdEQsc0NBQXNDLGlFQUFpRTtXQUN2RztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBOzs7OztXQ1ZBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1dDaERBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Db21wb25lbnRzL0N1c3RvbVByb21wdEZvcm0udHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbXBvbmVudHMvRHJvcGRvd25NZW51SXRlbS50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvQ29tcG9uZW50cy9JbWFnZXMudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbXBvbmVudHMvTmF2LnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvTWVzc2FnZS50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvUG9wdXBDYXJkL1Byb21wdExpc3QudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC9TZWxlY3Rpb24udHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC9pbmRleC50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvUG9wdXBDYXJkL3N0eWxlLnRzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC91dGlsLnRzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2NvbnRlbnRTY3JpcHQvaW5kZXgudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2xpYi9sb2NhbGUudHMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvbGliL3VzZXJJbmZvLnRzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2Fzc2V0cy9pY29uMTI4LnBuZyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9hc3NldHMvc2V0dGluZ0d1aWRlLnBuZyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jcmVhdGUgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXJtb255IG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DdXN0b21Qcm9tcHRGb3JtID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmZ1bmN0aW9uIEN1c3RvbVByb21wdEZvcm0ocHJvcHMpIHtcbiAgICBjb25zdCBbZm9ybV0gPSBhbnRkXzEuRm9ybS51c2VGb3JtKCk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIC8vIOabtOaWsCBpbnB1dCDmlofmnKzmoYbnmoTpu5jorqTlgLxcbiAgICAgICAgZm9ybS5zZXRGaWVsZHNWYWx1ZSh7XG4gICAgICAgICAgICB0aXRsZTogcHJvcHMuZGF0YS50aXRsZSxcbiAgICAgICAgICAgIGdldFVuc3BsYXNoSW1hZ2VzOiBwcm9wcy5kYXRhLmdldFVuc3BsYXNoSW1hZ2VzLFxuICAgICAgICAgICAgdXNlclByb21wdDogcHJvcHMuZGF0YS51c2VyUHJvbXB0XG4gICAgICAgIH0pO1xuICAgIH0sIFtwcm9wcy5kYXRhXSk7XG4gICAgLy8g5L+d5a2YIFByb21wdFxuICAgIGNvbnN0IHNhdmVQcm9tcHQgPSAodmFsdWVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOWFs+mXreihqOWNlVxuICAgICAgICBwcm9wcy5vcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogZmFsc2UsIGRhdGE6IHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9IH0pO1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpO1xuICAgICAgICAvLyDojrflj5blt7Lkv53lrZjnmoQgUHJvbXB0IExpc3RcbiAgICAgICAgY29uc3QgcHJvbXB0TGlzdCA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7IFwicHJvbXB0TGlzdFwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5wcm9tcHRMaXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IG5ld1Byb21wdHMgPSBwcm9tcHRMaXN0O1xuICAgICAgICAvLyDlpoLmnpwgcHJvcHMg5Lit5YyF5ZCrIElE77yM5YiZ6K+05piO5b2T5YmN5piv5Zyo57yW6L6RIFByb21wdCDogIzkuI3mmK/mlrDlop4gUHJvbXB0XG4gICAgICAgIGlmIChwcm9wcy5kYXRhLmlkICE9PSAnJykge1xuICAgICAgICAgICAgLy8g5ZyoIFByb21wdCDorrDlvZXkuK3mib7liLDov5nmnaEgUHJvbXB0XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1Byb21wdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3UHJvbXB0c1tpXVsnaWQnXSA9PT0gcHJvcHMuZGF0YS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyDkv67mlLlcbiAgICAgICAgICAgICAgICAgICAgbmV3UHJvbXB0c1tpXVsndGl0bGUnXSA9IHZhbHVlc1sndGl0bGUnXTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UHJvbXB0c1tpXVsnZ2V0VW5zcGxhc2hJbWFnZXMnXSA9IHZhbHVlc1snZ2V0VW5zcGxhc2hJbWFnZXMnXTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UHJvbXB0c1tpXVsndXNlclByb21wdCddID0gdmFsdWVzWyd1c2VyUHJvbXB0J107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5ld1Byb21wdHMgPSBbT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB2YWx1ZXMpLCB7ICdpZCc6IHRpbWVzdGFtcCB9KSwgLi4ucHJvbXB0TGlzdF07XG4gICAgICAgIH1cbiAgICAgICAgLy8g5bCGIFByb21wdCDkv53lrZjkuIvmnaVcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuc2V0KHtcbiAgICAgICAgICAgIHByb21wdExpc3Q6IG5ld1Byb21wdHMubGVuZ3RoID4gNiA/IG5ld1Byb21wdHMuc3BsaWNlKDAsIDYpIDogbmV3UHJvbXB0cyxcbiAgICAgICAgfSkudGhlbihpdGVtID0+IHtcbiAgICAgICAgICAgIC8vIOWwhiBQcm9tcHQg5Lyg5Zue57uZ54i257uE5Lu277yM5Lul6K6pIFByb21wdCDliJfooaggVUkg6YeN5paw5riy5p+TXG4gICAgICAgICAgICBwcm9wcy5oYW5kbGVQcm9tcHRFZGl0ZWQocHJvcHMuZGF0YS5pZCA9PT0gJycpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGFsZXJ0KCfwn6WyU2F2ZSBmYWlsZWQsIHBvc3NpYmx5IGR1ZSB0byBhIHRvbyBsb25nIFByb21wdC4gWW91IGNhbiBkZWxldGUgb3RoZXIgUHJvbXB0cyBvciBzaG9ydGVuIHRoZSBQcm9tcHQgY2hhcmFjdGVycyBhbmQgdHJ5IGFnYWluLiBcXG4nICsgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyDliKDpmaQgUHJvbXB0XG4gICAgY29uc3QgaGFuZGxlRGVsZXRlQnV0dG9uQ2xpY2sgPSAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOWFs+mXreihqOWNlVxuICAgICAgICBwcm9wcy5vcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogZmFsc2UsIGRhdGE6IHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9IH0pO1xuICAgICAgICAvLyDojrflj5blt7Lkv53lrZjnmoQgUHJvbXB0IExpc3RcbiAgICAgICAgY29uc3QgcHJvbXB0TGlzdCA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7IFwicHJvbXB0TGlzdFwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5wcm9tcHRMaXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IG5ld1Byb21wdHMgPSBwcm9tcHRMaXN0O1xuICAgICAgICAvLyDlnKggUHJvbXB0IOiusOW9leS4reaJvuWIsOi/meadoSBQcm9tcHRcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdQcm9tcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobmV3UHJvbXB0c1tpXVsnaWQnXSA9PT0gcHJvcHMuZGF0YS5pZCkge1xuICAgICAgICAgICAgICAgIC8vIOWIoOmZpFxuICAgICAgICAgICAgICAgIG5ld1Byb21wdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIC8vIOWwhiBQcm9tcHQg5L+d5a2Y5LiL5p2lXG4gICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbXB0TGlzdDogbmV3UHJvbXB0cy5sZW5ndGggPiA2ID8gbmV3UHJvbXB0cy5zcGxpY2UoMCwgNikgOiBuZXdQcm9tcHRzLFxuICAgICAgICAgICAgICAgIH0pLnRoZW4oaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWwhiBQcm9tcHQg5Lyg5Zue57uZ54i257uE5Lu277yM5Lul6K6pIFByb21wdCDliJfooaggVUkg6YeN5paw5riy5p+TXG4gICAgICAgICAgICAgICAgICAgIHByb3BzLmhhbmRsZVByb21wdEVkaXRlZChwcm9wcy5kYXRhLmlkID09PSAnJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH07XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybSwgeyBvbkZpbmlzaDogc2F2ZVByb21wdCwgXG4gICAgICAgICAgICAvLyBsYXlvdXQ9J2hvcml6b250YWwnXG4gICAgICAgICAgICBsYWJlbENvbDoge1xuICAgICAgICAgICAgICAgIHhzOiB7IHNwYW46IDYgfSxcbiAgICAgICAgICAgICAgICBzbTogeyBzcGFuOiA1IH0sXG4gICAgICAgICAgICB9LCBmb3JtOiBmb3JtIH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwidGl0bGVcIiwgbGFiZWw6IFwiVGl0bGVcIiwgcnVsZXM6IFt7IHJlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAnUGxlYXNlIGlucHV0IHlvdXIgdGl0bGUnIH1dIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLklucHV0LCB7IG1heExlbmd0aDogNDAsIG9uS2V5RG93bjogaGFuZGxlS2V5RG93biwgcGxhY2Vob2xkZXI6IFwiSG93IHRvIG5hbWUgdGhlIFByb21wdFwiLCB0eXBlOiBcInRleHRcIiB9KSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IGV4dHJhOiBcIkRpc3BsYXkgSW1hZ2VzIFJlbGF0ZWQgdG8gdGhlIFNlbGVjdGVkIFRleHRcIiwgbmFtZTogXCJnZXRVbnNwbGFzaEltYWdlc1wiLCBsYWJlbDogXCJJbWFnZXNcIiwgdmFsdWVQcm9wTmFtZTogXCJjaGVja2VkXCIgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuU3dpdGNoLCBudWxsKSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwidXNlclByb21wdFwiLCBsYWJlbDogXCJQcm9tcHRcIiwgZXh0cmE6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYCR7J3tzZWxlY3Rpb259J306IFNlbGVjdGVkIHRleHRgLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJyXCIsIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICBgJHsne3NlbnRlbmNlfSd9OiBTZW50ZW5jZSBjb250YWluaW5nIHRoZSBzZWxlY3RlZCB0ZXh0YCxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJiclwiLCBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI0YwOEEyNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiAoKSA9PiB3aW5kb3cub3BlbignaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9EeW5hbWljLVBsYWNlaG9sZGVycy01ZjA3MDUxNjNmZjY0MGFmYmRkNTc3MTE1ZGM5NTc3OT9wdnM9NCcpIH0sIFwiTGVhcm4gTW9yZVwiKSksIHJ1bGVzOiBbeyByZXF1aXJlZDogdHJ1ZSwgbWVzc2FnZTogJ1BsZWFzZSBpbnB1dCB5b3VyIHByb21wdCcgfV0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuSW5wdXQuVGV4dEFyZWEsIHsgcGxhY2Vob2xkZXI6IFwiVHJhbnNsYXRlIHtzZWxlY3Rpb259IHRvIENoaW5lc2VcIiwgb25LZXlEb3duOiBoYW5kbGVLZXlEb3duLCByb3dzOiA0LCBtYXhMZW5ndGg6IDMwMDAgfSkpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBzdHlsZTogeyBtYXJnaW46ICcwJyB9IH0sXG4gICAgICAgICAgICAgICAgcHJvcHMuZGF0YS5pZCAhPT0gJycgJiYgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICcxMnB4J1xuICAgICAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiBoYW5kbGVEZWxldGVCdXR0b25DbGljaywgZGFuZ2VyOiB0cnVlIH0sIFwiRGVsZXRlXCIpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHsgbWluV2lkdGg6ICcxMjBweCcgfSwgdHlwZTogXCJwcmltYXJ5XCIsIGh0bWxUeXBlOiBcInN1Ym1pdFwiIH0sIFwiU2F2ZVwiKSkpKSk7XG59XG5leHBvcnRzLkN1c3RvbVByb21wdEZvcm0gPSBDdXN0b21Qcm9tcHRGb3JtO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRHJvcGRvd25NZW51SXRlbSA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IERyb3Bkb3duTWVudSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQHJhZGl4LXVpL3JlYWN0LWRyb3Bkb3duLW1lbnVcIikpO1xuY29uc3QgcmVhY3RfaWNvbnNfMSA9IHJlcXVpcmUoXCJAcmFkaXgtdWkvcmVhY3QtaWNvbnNcIik7XG5mdW5jdGlvbiBEcm9wZG93bk1lbnVJdGVtKHByb3BzKSB7XG4gICAgY29uc3QgW2lzSG92ZXJlZCwgc2V0SXNIb3ZlcmVkXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgfSk7XG4gICAgY29uc3Qgb25TZWxlY3QgPSAoKSA9PiB7XG4gICAgICAgIHByb3BzLm9uU2VsZWN0KCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVFZGl0UHJvbXB0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBwcm9wcy5oYW5kbGVFZGl0UHJvbXB0KCk7XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5JdGVtLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnNnB4JyxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzRweCcsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcycHgnXG4gICAgICAgIH0sIGNsYXNzTmFtZTogXCJEcm9wZG93bk1lbnVJdGVtXCIsIG9uTW91c2VFbnRlcjogKCkgPT4gc2V0SXNIb3ZlcmVkKHRydWUpLCBvbk1vdXNlTGVhdmU6ICgpID0+IHNldElzSG92ZXJlZChmYWxzZSksIG9uU2VsZWN0OiBvblNlbGVjdCB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgIGZsZXg6ICcxJyxcbiAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnXG4gICAgICAgICAgICB9IH0sIHByb3BzLmNoaWxkcmVuKSxcbiAgICAgICAgaXNIb3ZlcmVkICYmIChwcm9wcy5kYXRhLmlkID09PSAnRGVmYXVsdCcgPyByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IG9uQ2xpY2s6ICgpID0+IHsgd2luZG93Lm9wZW4oJ2h0dHBzOi8vamlhbmd6aWxvbmcubm90aW9uLnNpdGUvV2hhdC1pcy10aGUtZGVmYXVsdC1Qcm9tcHQtUHJvbXB0LTViNTVlM2ZjMzAzZDQyNWY4Y2NhMTZkNWJlZTE5ZTdjJyk7IH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ljb25zXzEuUXVlc3Rpb25NYXJrQ2lyY2xlZEljb24sIG51bGwpKSA6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgb25DbGljazogaGFuZGxlRWRpdFByb21wdCB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfaWNvbnNfMS5QZW5jaWwySWNvbiwgbnVsbCkpKSkpO1xufVxuZXhwb3J0cy5Ecm9wZG93bk1lbnVJdGVtID0gRHJvcGRvd25NZW51SXRlbTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkltYWdlcyA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCBpY29uc18xID0gcmVxdWlyZShcIkBhbnQtZGVzaWduL2ljb25zXCIpO1xuY29uc3QgUHJvVGFnXzEgPSByZXF1aXJlKFwiLi9Qcm9UYWdcIik7XG5jb25zdCB1c2VySW5mb18xID0gcmVxdWlyZShcIi4uL2xpYi91c2VySW5mb1wiKTtcbmNvbnN0IHJlYWN0X3NwcmluZ18xID0gcmVxdWlyZShcInJlYWN0LXNwcmluZ1wiKTtcbmZ1bmN0aW9uIEltYWdlcyhwcm9wcykge1xuICAgIGNvbnN0IFtpbWFnZXMsIHNldEltYWdlc10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoW10pO1xuICAgIGNvbnN0IFtpbWFnZUluZGV4LCBzZXRJbWFnZUluZGV4XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgwKTtcbiAgICBjb25zdCBbc2hvd0NvbnRyb2wsIHNldFNob3dDb250cm9sXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3QgW2NoYW5nZUltYWdlLCBzZXRDaGFuZ2VJbWFnZVN0YXR1c10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtpbWFnZXNMb2FkaW5nLCBzZXRJbWFnZXNMb2FkaW5nXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh0cnVlKTtcbiAgICAvLyBjb25zdCBbc2VhcmNoSW1hZ2VJc0xvYWRpbmcsIHNldFNlYXJjaEltYWdlSXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICAgIGNvbnN0IHVzZXJJbmZvID0gKDAsIHVzZXJJbmZvXzEudXNlVXNlckluZm9Db250ZXh0KSgpO1xuICAgIC8vIGNvbnN0IFtjdXJyZW50VVJMLCBzZXRDdXJyZW50VVJMXSA9IHVzZVN0YXRlPHN0cmluZz4oKTtcbiAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSAoMCwgcmVhY3RfMS51c2VSZWYpKG51bGwpO1xuICAgIGNvbnN0IGltYWdlQm94RWxlbWVudCA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3QgY29tcG9zaW5nID0gKDAsIHJlYWN0XzEudXNlUmVmKShmYWxzZSk7XG4gICAgY29uc3QgaGFuZGxlQ29tcG9zaXRpb25TdGFydCA9ICgpID0+IHtcbiAgICAgICAgY29tcG9zaW5nLmN1cnJlbnQgPSB0cnVlO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlQ29tcG9zaXRpb25FbmQgPSAoKSA9PiB7XG4gICAgICAgIGNvbXBvc2luZy5jdXJyZW50ID0gZmFsc2U7XG4gICAgfTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBzZXRJbWFnZXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIHNldEltYWdlcyhwcm9wcy5pbWFnZXMpO1xuICAgICAgICBzZXRJbWFnZUluZGV4KDApO1xuICAgIH0sIFtwcm9wcy5pbWFnZXNdKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpbnB1dEVsZW1lbnQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpbnB1dEVsZW1lbnQuY3VycmVudCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGlucHV0RWxlbWVudC5jdXJyZW50Py5pbnB1dCk7XG4gICAgICAgIGlmICh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCkge1xuICAgICAgICAgICAgKF9hID0gaW5wdXRFbGVtZW50LmN1cnJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfSwgW2NoYW5nZUltYWdlXSk7XG4gICAgY29uc3QgaGFuZGxlRWRpdEltYWdlc0NsaWNrID0gKCkgPT4ge1xuICAgICAgICBzZXRDaGFuZ2VJbWFnZVN0YXR1cyh0cnVlKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVNlYXJjaElucHV0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlU2VhcmNoQnRuQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmICh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCkge1xuICAgICAgICAgICAgbGV0IGlucHV0VmFsdWUgPSAoX2IgPSAoX2EgPSBpbnB1dEVsZW1lbnQuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlucHV0KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudmFsdWU7XG4gICAgICAgICAgICBpZiAoaW5wdXRWYWx1ZSAmJiBpbnB1dFZhbHVlICE9PSAnJyAmJiAhY29tcG9zaW5nLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBzZXRJbWFnZXNMb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgICAgIC8vIOaQnOe0ouWbvueJh1xuICAgICAgICAgICAgICAgIHByb3BzLmdldFVuc3BsYXNoSW1hZ2VzKGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgICAgIHNldENoYW5nZUltYWdlU3RhdHVzKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAvLyBhbXBsaXR1ZGUudHJhY2soJ2hhbmRsZVNlYXJjaEltYWdlJyk7XG4gICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdoYW5kbGVTZWFyY2hJbWFnZScgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhbGVydCgnUGxlYXNlIGFjdGl2YXRlIFBybycpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVHZW5lcmF0aW9uc0ltYWdlcyA9IChldmVudCkgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSB7XG4gICAgICAgICAgICBsZXQgaW5wdXRWYWx1ZSA9IChfYiA9IChfYSA9IGlucHV0RWxlbWVudC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5wdXQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi52YWx1ZTtcbiAgICAgICAgICAgIGlmIChpbnB1dFZhbHVlICYmIGlucHV0VmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgc2V0SW1hZ2VzTG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgICAgICAvLyDnlJ/miJDlm77niYdcbiAgICAgICAgICAgICAgICBwcm9wcy5nZW5lcmF0aW9uc0ltYWdlcyhpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZXRDaGFuZ2VJbWFnZVN0YXR1cyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdoYW5kbGVHZW5lcmF0aW9uc0ltYWdlcycgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhbGVydCgnUGxlYXNlIGFjdGl2YXRlIFBybycpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVDaGFuZ2VJbWFnZXNDbGljayA9IChvZmZzZXQpID0+IHtcbiAgICAgICAgc2V0SW1hZ2VJbmRleChpbmRleCA9PiB7XG4gICAgICAgICAgICBpbmRleCA9IGluZGV4ICsgb2Zmc2V0O1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IGltYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpbWFnZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGFtcGxpdHVkZS50cmFjaygnaGFuZGxlQ2hhbmdlSW1hZ2UnKTtcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdoYW5kbGVDaGFuZ2VJbWFnZScgfSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVJbWFnZXNCb3hIb3ZlciA9IChlKSA9PiB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmIChlLnR5cGUgPT09ICdtb3VzZWVudGVyJykge1xuICAgICAgICAgICAgc2V0U2hvd0NvbnRyb2wodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudHlwZSA9PT0gJ21vdXNlbGVhdmUnKSB7XG4gICAgICAgICAgICAvLyDmmL7npLrlm77niYfmkJzntKLmoYbml7bkuI3oh6rliqjpmpDol4/mjqfku7ZcbiAgICAgICAgICAgIGlmICghY2hhbmdlSW1hZ2UgfHwgKChfYiA9IChfYSA9IGlucHV0RWxlbWVudC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5wdXQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi52YWx1ZSkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgc2V0U2hvd0NvbnRyb2woZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNldENoYW5nZUltYWdlU3RhdHVzKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNldFNob3dDb250cm9sKHRydWUpXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGFuaW1hdGlvblN0eWxlID0gKDAsIHJlYWN0X3NwcmluZ18xLnVzZVNwcmluZykoe1xuICAgICAgICBmcm9tOiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScgfSxcbiAgICAgICAgdG86IHsgdHJhbnNmb3JtOiAncm90YXRlKDM2MGRlZyknIH0sXG4gICAgICAgIGNvbmZpZzogeyBkdXJhdGlvbjogMTAwMCB9LFxuICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICB3aWR0aDogJzMycHgnLFxuICAgICAgICBoZWlnaHQ6ICczMnB4JyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHJlZCdcbiAgICB9KTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImltYWdlc1wiLCByZWY6IGltYWdlQm94RWxlbWVudCwgc3R5bGU6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgbGluZUhlaWdodDogJzAnXG4gICAgICAgICAgICAvLyBwYWRkaW5nQm90dG9tOiAnOHB4J1xuICAgICAgICB9IH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IG9uTW91c2VFbnRlcjogaGFuZGxlSW1hZ2VzQm94SG92ZXIsIG9uTW91c2VMZWF2ZTogaGFuZGxlSW1hZ2VzQm94SG92ZXIgfSxcbiAgICAgICAgICAgICAgICBpbWFnZXNMb2FkaW5nICYmXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYigwLCAwLCAwLDAuNSknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6ICc5J1xuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3Rfc3ByaW5nXzEuYW5pbWF0ZWQuZGl2LCB7IHN0eWxlOiBhbmltYXRpb25TdHlsZSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuTG9hZGluZ091dGxpbmVkLCBudWxsKSkpLFxuICAgICAgICAgICAgICAgIGltYWdlcy5sZW5ndGggPiAwID9cbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiaW1hZ2VCb3hcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbWFnZSwgeyBcImRhdGEtZG93bmxvYWRsb2NhdGlvblwiOiBpbWFnZXNbaW1hZ2VJbmRleF0ubGlua3MuZG93bmxvYWRfbG9jYXRpb24sIHNyYzogaW1hZ2VzW2ltYWdlSW5kZXhdLnVybHMuc21hbGwsIGFsdDogaW1hZ2VzW2ltYWdlSW5kZXhdWydkZXNjcmlwdGlvbiddLCBoZWlnaHQ6IDI0MCwgd2lkdGg6ICcxMDAlJywgcHJldmlldzogZmFsc2UsIHBsYWNlaG9sZGVyOiB0cnVlIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImltYWdlUXVldWVcIiwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBpbWFnZXMubWFwKGltZyA9PiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7IGtleTogaW1nLmlkLCBzcmM6IGltZy51cmxzLnNtYWxsIH0pKSkpXG4gICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMjQwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzJweCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkVtcHR5LCB7IHN0eWxlOiB7IG1hcmdpbjogJzAgYXV0bycgfSwgZGVzY3JpcHRpb246ICdObyByZWxhdGVkIHBpY3R1cmVzIGZvdW5kJywgaW1hZ2U6IGFudGRfMS5FbXB0eS5QUkVTRU5URURfSU1BR0VfU0lNUExFIH0pKSxcbiAgICAgICAgICAgICAgICBzaG93Q29udHJvbCAmJiAhaW1hZ2VzTG9hZGluZyAmJlxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzAgMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWFyb3VuZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBtYXJnaW46ICcwcHggMThweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMzYwZGVnLCByZ2JhKDAsIDAsIDAsIDApIDAlLCByZ2JhKDAsIDAsIDAsIDAuMSkgMjcuNiUsIHJnYmEoMCwgMCwgMCwgMC4yKSA1NC42OSUsIHJnYmEoMCwgMCwgMCwgMC4zNSkgMTAwJSknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBjaGFuZ2VJbWFnZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pi+56S65Zu+54mH5pCc57Si5o6n5Lu2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMnB4IDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyBmbGV4OiAnMScsIG1hcmdpblJpZ2h0OiAnMjBweCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLklucHV0LCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSA9PT0gZmFsc2UgPyAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkpJyA6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICcycHgnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgc3VmZml4OiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChQcm9UYWdfMS5Qcm9UYWcsIG51bGwpLCBkaXNhYmxlZDogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCksIHBsYWNlaG9sZGVyOiBcIlNlYXJjaCBpbWFnZXNcIiwgb25LZXlEb3duOiBoYW5kbGVTZWFyY2hJbnB1dCwgb25Db21wb3NpdGlvblN0YXJ0OiBoYW5kbGVDb21wb3NpdGlvblN0YXJ0LCBvbkNvbXBvc2l0aW9uRW5kOiBoYW5kbGVDb21wb3NpdGlvbkVuZCwgc2l6ZTogXCJzbWFsbFwiLCByZWY6IGlucHV0RWxlbWVudCwgb25QcmVzc0VudGVyOiBoYW5kbGVTZWFyY2hCdG5DbGljayB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Ub29sdGlwLCB7IHBsYWNlbWVudDogXCJib3R0b21cIiwgdGl0bGU6ICdTZWFyY2ggSW1hZ2VzKEVudGVyIOKPjiknLCBnZXRQb3B1cENvbnRhaW5lcjogKCkgPT4gaW1hZ2VCb3hFbGVtZW50LmN1cnJlbnQgfHwgZG9jdW1lbnQuYm9keSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgZGlzYWJsZWQ6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpLCB0eXBlOiBcInRleHRcIiwgc2l6ZTogXCJzbWFsbFwiLCBzdHlsZTogeyBjb2xvcjogJyNmZmYnLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIG1hcmdpblJpZ2h0OiAnMTBweCcsIG9wYWNpdHk6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpID8gJzAuNycgOiAnMScgfSwgb25DbGljazogaGFuZGxlU2VhcmNoQnRuQ2xpY2ssIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuU2VhcmNoT3V0bGluZWQsIG51bGwpIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Ub29sdGlwLCB7IHBsYWNlbWVudDogXCJib3R0b21cIiwgdGl0bGU6ICdHZW5lcmF0ZSBJbWFnZXMgd2l0aCBBSScsIGdldFBvcHVwQ29udGFpbmVyOiAoKSA9PiBpbWFnZUJveEVsZW1lbnQuY3VycmVudCB8fCBkb2N1bWVudC5ib2R5IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBkaXNhYmxlZDogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCksIHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIHN0eWxlOiB7IGNvbG9yOiAnI2ZmZicsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgbWFyZ2luUmlnaHQ6ICcxMHB4Jywgb3BhY2l0eTogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCkgPyAnMC43JyA6ICcxJyB9LCBvbkNsaWNrOiBoYW5kbGVHZW5lcmF0aW9uc0ltYWdlcywgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5UaHVuZGVyYm9sdE91dGxpbmVkLCBudWxsKSB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIHN0eWxlOiB7IGNvbG9yOiAnI2ZmZicsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9LCBvbkNsaWNrOiAoKSA9PiBzZXRDaGFuZ2VJbWFnZVN0YXR1cyhmYWxzZSksIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuQ2xvc2VPdXRsaW5lZCwgbnVsbCkgfSkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4R3JvdzogJ2luaGVyaXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdHlwZTogXCJ0ZXh0XCIsIHNpemU6IFwic21hbGxcIiwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5MZWZ0T3V0bGluZWQsIG51bGwpLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVDaGFuZ2VJbWFnZXNDbGljaygtMSkgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnNDBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICc1MDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMCA0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sIGltYWdlSW5kZXggKyAxICsgJy8nICsgaW1hZ2VzLmxlbmd0aCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdHlwZTogXCJ0ZXh0XCIsIHNpemU6IFwic21hbGxcIiwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5SaWdodE91dGxpbmVkLCBudWxsKSwgb25DbGljazogKCkgPT4gaGFuZGxlQ2hhbmdlSW1hZ2VzQ2xpY2soMSkgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3ctcmV2ZXJzZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiAnMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyB0eXBlOiBcInRleHRcIiwgc2l6ZTogXCJzbWFsbFwiLCBzdHlsZTogeyBjb2xvcjogJyNmZmYnLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfSwgb25DbGljazogKCkgPT4gaGFuZGxlRWRpdEltYWdlc0NsaWNrKCksIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuRm9ybU91dGxpbmVkLCBudWxsKSB9KSkpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImltYWdlU291cmNlXCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiAnMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnZmxleC1lbmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcwLjkwZW0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOCknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzhweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6ICc0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogJ25vcm1hbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U2hhZG93OiAnMnB4IDJweCA1cHggcmdiYSgwLCAwLCAwLCAwLjMpJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sIGltYWdlc1tpbWFnZUluZGV4XS50eXBlID09PSAnYWknID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLCBcIlBob3RvIGJ5IEFJXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBob3RvIGJ5IFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IHN0eWxlOiB7IHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJywgcGFkZGluZzogJzAgMnB4JyB9LCB0YXJnZXQ6ICdfYmxhbmsnLCBocmVmOiBcImh0dHBzOi8vdW5zcGxhc2guY29tL0BcIiArIGltYWdlc1tpbWFnZUluZGV4XS51c2VyLnVzZXJuYW1lICsgXCI/dXRtX3NvdXJjZT1TY291dGVyJnV0bV9tZWRpdW09cmVmZXJyYWxcIiB9LCBpbWFnZXNbaW1hZ2VJbmRleF0udXNlci5uYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBvbiBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBzdHlsZTogeyB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsIHBhZGRpbmc6ICcwIDJweCcgfSwgdGFyZ2V0OiAnX2JsYW5rJywgaHJlZjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS8/dXRtX3NvdXJjZT1TY291dGVyJnV0bV9tZWRpdW09cmVmZXJyYWxcIiB9LCBcIlVuc3BsYXNoXCIpKSkpKSkpKTtcbn1cbmV4cG9ydHMuSW1hZ2VzID0gSW1hZ2VzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTmF2ID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IERyb3Bkb3duTWVudSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQHJhZGl4LXVpL3JlYWN0LWRyb3Bkb3duLW1lbnVcIikpO1xuY29uc3QgRHJvcGRvd25NZW51SXRlbV8xID0gcmVxdWlyZShcIi4vRHJvcGRvd25NZW51SXRlbVwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi9Qb3B1cENhcmQvdXRpbFwiKTtcbmNvbnN0IHJlYWN0X2ljb25zXzEgPSByZXF1aXJlKFwiQHJhZGl4LXVpL3JlYWN0LWljb25zXCIpO1xuLy8gaW1wb3J0IHR5cGUgeyBNZW51UHJvcHMgfSBmcm9tICdhbnRkJztcbmNvbnN0IGNvbnRlbnRTY3JpcHRfMSA9IHJlcXVpcmUoXCIuLi9jb250ZW50U2NyaXB0XCIpO1xuY29uc3QgaWNvbnNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9pY29uc1wiKTtcbmZ1bmN0aW9uIE5hdihwcm9wcykge1xuICAgIHZhciBfYSwgX2I7XG4gICAgY29uc3QgW2lzUGluLCBzZXRJc1Bpbl0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtjdXJyZW50VVJMLCBzZXRDdXJyZW50VVJMXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgpO1xuICAgIGNvbnN0IFtpc09wZW5Qcm9tcHRNZW51LCBzZXRJc09wZW5Qcm9tcHRNZW51XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3QgZGVmYXVsdFByb21wdCA9ICgwLCByZWFjdF8xLnVzZVJlZikoKTtcbiAgICAvLyBjb25zdCB7IE9wdGlvbiB9ID0gU2VsZWN0O1xuICAgIGNvbnN0IG5hdkVsZW1lbnQgPSAoMCwgcmVhY3RfMS51c2VSZWYpKG51bGwpO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAvLyDlvZPkuI3oh6rliqjoh6rooYwgUHJvbXB077yM6Ieq5Yqo5omT5byAIFByb21wdCDoj5zljZXkvpvnlKjmiLfpgInmi6lcbiAgICAgICAgaWYgKHByb3BzLmlzT3Blbk1lbnUpIHtcbiAgICAgICAgICAgIG9uTWVudU9wZW5DaGFuZ2UocHJvcHMuaXNPcGVuTWVudSk7XG4gICAgICAgIH1cbiAgICB9LCBbcHJvcHMuaXNPcGVuTWVudV0pO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICBkZWZhdWx0UHJvbXB0LmN1cnJlbnQgPSAoMCwgdXRpbF8xLmdldERlZmF1bHRQcm9tcHQpKHByb3BzLmtleVdvcmQpO1xuICAgIH0sIFtdKTtcbiAgICAvLyDngrnlh7vkv53lrZjliLAgQW5raSDmjInpkq5cbiAgICBjb25zdCBoYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHByb3BzLmhhbmRsZVNhdmVUb0Fua2lCdG5DbGljaygpO1xuICAgIH07XG4gICAgLy8g54K55Ye7IFBpbiDmjInpkq5cbiAgICBjb25zdCBoYW5kbGVQaW5CdG5DbGljayA9ICgpID0+IHtcbiAgICAgICAgaWYgKGlzUGluKSB7XG4gICAgICAgICAgICAoMCwgY29udGVudFNjcmlwdF8xLnBpblBvcHVwQ2FyZCkoZmFsc2UpO1xuICAgICAgICAgICAgc2V0SXNQaW4oZmFsc2UpO1xuICAgICAgICAgICAgLy8gYW1wbGl0dWRlLnRyYWNrKCdwaW5Qb3B1cENhcmQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICgwLCBjb250ZW50U2NyaXB0XzEucGluUG9wdXBDYXJkKSh0cnVlKTtcbiAgICAgICAgICAgIHNldElzUGluKHRydWUpO1xuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdwaW5Qb3B1cENhcmQnIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyDlnKggQW5raSDkuK3miZPlvIDnrJTorrBcbiAgICBjb25zdCBlZGl0Tm90ZUluQW5raSA9IChub3RlSWQpID0+IHtcbiAgICAgICAgbGV0IHNlbmRpbmcgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdndWlFZGl0Tm90ZScsICdtZXNzYWdlcyc6IHsgJ2Fua2lfYWN0aW9uX3R5cGUnOiAnZ3VpRWRpdE5vdGUnLCAnYW5raV9hcmd1bWVudHMnOiB7ICdub3RlJzogbm90ZUlkIH0sIH0gfSk7XG4gICAgICAgIHNlbmRpbmcudGhlbigobWVzc2FnZSkgPT4ge1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAvL2Vycm9yXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy8g5omT5byAIFByb21wdCDnvJbovpHnqpflj6NcbiAgICBjb25zdCBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSA9IChkYXRhKSA9PiB7XG4gICAgICAgIHByb3BzLm9wZW5DdXN0b21Qcm9tcHRGb3JtKGRhdGEpO1xuICAgICAgICBzZXRJc09wZW5Qcm9tcHRNZW51KGZhbHNlKTtcbiAgICB9O1xuICAgIC8vIFByb21wdCDoj5zljZUgaXRlbSDngrnlh7tcbiAgICBjb25zdCBoYW5kbGVNZW51SXRlbUNsaWNrID0gKGRhdGEpID0+IHtcbiAgICAgICAgLy8g56ysIDMg5Liq5Y+C5pWwIGZhbHNlIOihqOekuuS4jemHjeaWsOa4suafk+WbvueJh1xuICAgICAgICAvLyAvLyDlpoLmnpzkuIrkuIDkuKogUHJvbXB0IOaYr+S4jeaYvuekuuWbvueJh++8jOS4lOW9k+WJjSBQcm9tcHQg6ZyA6KaB5pi+56S65Zu+54mH77yM5YiZ5pys5qyh5Lu75Yqh6ZyA6KaB5riy5p+T5Zu+54mH77yM5ZCm5YiZ5LiN6YeN5paw5riy5p+T5Zu+54mHXG4gICAgICAgIC8vIGlmIChwcm9wcy5sYXN0RXhlY3V0ZWRQcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMgIT09IHRydWUgJiYgZGF0YS5nZXRVbnNwbGFzaEltYWdlcykge1xuICAgICAgICAvLyAgICAgcHJvcHMuaGFuZGxlTWVudUl0ZW1DbGljayhkYXRhKVxuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgcHJvcHMuaGFuZGxlTWVudUl0ZW1DbGljayhkYXRhLCB0cnVlLCBmYWxzZSlcbiAgICAgICAgLy8gfVxuICAgICAgICBwcm9wcy5oYW5kbGVNZW51SXRlbUNsaWNrKGRhdGEpO1xuICAgIH07XG4gICAgY29uc3Qgb25NZW51T3BlbkNoYW5nZSA9IChvcGVuKSA9PiB7XG4gICAgICAgIC8vIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHNldElzT3BlblByb21wdE1lbnUob3Blbik7XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkNvbmZpZ1Byb3ZpZGVyLCB7IHRoZW1lOiB7XG4gICAgICAgICAgICAgICAgdG9rZW46IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3JQcmltYXJ5OiAnI0YwOEEyNCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgaWQ6IFwiU2NvdXRlck5hdlwiLCByZWY6IG5hdkVsZW1lbnQsIGNsYXNzTmFtZTogJ3AtNCcsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LXN0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6ICcxMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogJzEycHgnLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMDYpJyxcbiAgICAgICAgICAgICAgICAgICAgdXNlclNlbGVjdDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdtb3ZlJyxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsIHRvcDogMCxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgekluZGV4OiA5LFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTJweCAxOHB4J1xuICAgICAgICAgICAgICAgIH0sIG9uTW91c2VEb3duOiBwcm9wcy5vbk1vdXNlRG93biB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgekluZGV4OiA5IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51LlJvb3QsIHsgb3BlbjogaXNPcGVuUHJvbXB0TWVudSwgbW9kYWw6IGZhbHNlLCBvbk9wZW5DaGFuZ2U6IG9uTWVudU9wZW5DaGFuZ2UgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5UcmlnZ2VyLCB7IGFzQ2hpbGQ6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJJY29uQnV0dG9uXCIsIFwiYXJpYS1sYWJlbFwiOiBcIkN1c3RvbWlzZSBvcHRpb25zXCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ljb25zXzEuSGFtYnVyZ2VyTWVudUljb24sIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6ICc0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAnMTcwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgcHJvcHMubGFzdEV4ZWN1dGVkUHJvbXB0LnRpdGxlKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51LlBvcnRhbCwgeyBjb250YWluZXI6IG5hdkVsZW1lbnQuY3VycmVudCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5Db250ZW50LCB7IGNsYXNzTmFtZTogXCJEcm9wZG93bk1lbnVDb250ZW50XCIsIGFsaWduOiAnc3RhcnQnLCBzaWRlT2Zmc2V0OiA1LCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxODBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICcwcHggMTBweCAzOHB4IC0xMHB4IHJnYmEoMjIsIDIzLCAyNCwgMC4zNSksIDBweCAxMHB4IDIwcHggLTE1cHggcmdiYSgyMiwgMjMsIDI0LCAwLjIpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogJzQwMG1zJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vekFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uOiAnY3ViaWMtYmV6aWVyKDAuMTYsIDEsIDAuMywgMSknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lsbENoYW5nZTogJ3RyYW5zZm9ybSwgb3BhY2l0eSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnVJdGVtXzEuRHJvcGRvd25NZW51SXRlbSwgeyBrZXk6IChfYSA9IGRlZmF1bHRQcm9tcHQuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkLCBkYXRhOiBkZWZhdWx0UHJvbXB0LmN1cnJlbnQsIG9uU2VsZWN0OiAoKSA9PiBoYW5kbGVNZW51SXRlbUNsaWNrKGRlZmF1bHRQcm9tcHQuY3VycmVudCksIGhhbmRsZUVkaXRQcm9tcHQ6ICgpID0+IG9wZW5DdXN0b21Qcm9tcHRGb3JtKHsgaXNPcGVuOiB0cnVlLCBkYXRhOiBkZWZhdWx0UHJvbXB0LmN1cnJlbnQgfSkgfSwgKF9iID0gZGVmYXVsdFByb21wdC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudGl0bGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5wcm9tcHRzLm1hcChpdGVtID0+IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudUl0ZW1fMS5Ecm9wZG93bk1lbnVJdGVtLCB7IGtleTogaXRlbS5pZCwgZGF0YTogaXRlbSwgb25TZWxlY3Q6ICgpID0+IGhhbmRsZU1lbnVJdGVtQ2xpY2soaXRlbSksIGhhbmRsZUVkaXRQcm9tcHQ6ICgpID0+IG9wZW5DdXN0b21Qcm9tcHRGb3JtKHsgaXNPcGVuOiB0cnVlLCBkYXRhOiBpdGVtIH0pIH0sIGl0ZW0udGl0bGUpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51LlNlcGFyYXRvciwgeyBjbGFzc05hbWU6IFwiRHJvcGRvd25NZW51U2VwYXJhdG9yXCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLnByb21wdHMubGVuZ3RoIDwgNiA/IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHsgbWFyZ2luVG9wOiAnNHB4JyB9LCBzaXplOiAnc21hbGwnLCBvbkNsaWNrOiAoKSA9PiBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogdHJ1ZSwgZGF0YTogeyAndGl0bGUnOiAnJywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZmFsc2UsICd1c2VyUHJvbXB0JzogJycsICdpZCc6ICcnIH0gfSkgfSwgXCJDcmVhdGUgcHJvbXB0XCIpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHsgbWFyZ2luVG9wOiAnNHB4JyB9LCBzaXplOiAnc21hbGwnLCBkaXNhYmxlZDogdHJ1ZSB9LCBcIkF0IG1vc3QgNyBQcm9tcHRzXCIpKSkpKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJyaWdodEJ0bkJveFwiLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuYWRkVG9BbmtpU3RhdHVzLnN0YXR1cyA9PSAnc3VjY2VzcycgPyByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuQ2hlY2tDaXJjbGVUd29Ub25lLCB7IHR3b1RvbmVDb2xvcjogXCIjNTJjNDFhXCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBBZGRlZCB0byBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiBlZGl0Tm90ZUluQW5raS5iaW5kKGV2ZW50LCBwcm9wcy5hZGRUb0Fua2lTdGF0dXMubm90ZUlkKSB9LCBcIkFua2lcIikpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc2l6ZTogXCJzbWFsbFwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTMuMnB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuUGx1c1NxdWFyZU91dGxpbmVkLCBudWxsKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbG9hZGluZz17cHJvcHMuYWRkVG9BbmtpU3RhdHVzID09PSAnbG9hZGluZycgPyB0cnVlIDogZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHByb3BzLmFkZFRvQW5raVN0YXR1cy5zdGF0dXMgPT09ICdzdGFuZGJ5JyB8fCBwcm9wcy5hZGRUb0Fua2lTdGF0dXMuc3RhdHVzID09PSAnbG9hZGluZycgPyB0cnVlIDogZmFsc2UsIG9uQ2xpY2s6IGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljayB9LCBwcm9wcy5hZGRUb0Fua2lTdGF0dXMuc3RhdHVzID09PSAnbG9hZGluZycgPyAnQWRkaW5nLi4uJyA6ICdBZGQgdG8gQW5raScpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHNpemU6ICdzbWFsbCcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHlwZT0ndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IGlzUGluID8gJyNGMDhBMjQnIDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMy4ycHgnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBpY29uOiBpc1BpbiA/IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuUHVzaHBpbkZpbGxlZCwgeyBjbGFzc05hbWU6ICdpc1BpbicgfSkgOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLlB1c2hwaW5PdXRsaW5lZCwgbnVsbCksIG9uQ2xpY2s6IGhhbmRsZVBpbkJ0bkNsaWNrIH0pKSkpKSk7XG59XG5leHBvcnRzLk5hdiA9IE5hdjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1lc3NhZ2VzTGlzdCA9IHZvaWQgMDtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCByZWFjdF9tYXJrZG93bl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdC1tYXJrZG93blwiKSk7XG5jb25zdCByZW1hcmtfYnJlYWtzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlbWFyay1icmVha3NcIikpO1xuY29uc3QgcmVoeXBlX3Jhd18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWh5cGUtcmF3XCIpKTtcbmNvbnN0IHJlbWFya19nZm1fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVtYXJrLWdmbVwiKSk7XG5jb25zdCBzZXR0aW5nR3VpZGVfcG5nXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2Fzc2V0cy9zZXR0aW5nR3VpZGUucG5nXCIpKTtcbmNvbnN0IEltYWdlc18xID0gcmVxdWlyZShcIi4uL0NvbXBvbmVudHMvSW1hZ2VzXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmZ1bmN0aW9uIE1lc3NhZ2UocHJvcHMpIHtcbiAgICBjb25zdCBbaW1hZ2VzLCBzZXRJbWFnZXNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKFtdKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgc2V0SW1hZ2VzKHByb3BzLm1lc3NhZ2UuaW1hZ2VzKTtcbiAgICB9LCBbcHJvcHMubWVzc2FnZS5pbWFnZXNdKTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsga2V5OiBwcm9wcy5tZXNzYWdlLmNoYXRJZCwgY2xhc3NOYW1lOiAnJywgc3R5bGU6IHByb3BzLm1lc3NhZ2Uucm9sZSA9PT0gJ3VzZXInID8geyBiYWNrZ3JvdW5kQ29sb3I6ICcjRjZGNkY2JywgcGFkZGluZ1RvcDogJzJweCcsIHBhZGRpbmdCb3R0b206ICcycHgnIH0gOiB7fSB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuU2tlbGV0b24sIHsgbG9hZGluZzogcHJvcHMubWVzc2FnZS5sb2FkaW5nLCBhY3RpdmU6IHRydWUsIHRpdGxlOiBmYWxzZSB9LFxuICAgICAgICAgICAgcHJvcHMubWVzc2FnZS5zaG93SW1hZ2VzQm94ICYmXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoSW1hZ2VzXzEuSW1hZ2VzLCB7IGltYWdlczogaW1hZ2VzLCBnZXRVbnNwbGFzaEltYWdlczogKGtleVdvcmQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICgwLCB1dGlsXzEuZ2V0VW5zcGxhc2hJbWFnZXMpKGtleVdvcmQpLnRoZW4oKGltZ3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlpITnkIblm77niYfnmoTmlbDmja7moLzlvI9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SW1hZ2VzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1ncy5mb3JFYWNoKChpbWcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Vuc3BsYXNoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpbWcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmxzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc21hbGw6IGltZy51cmxzLnNtYWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3dubG9hZF9sb2NhdGlvbjogaW1nLmxpbmtzLmRvd25sb2FkX2xvY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGltZy5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogaW1nLnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaW1nLnVzZXIubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdJbWFnZXMucHVzaChvYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEltYWdlcyhuZXdJbWFnZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGdlbmVyYXRpb25zSW1hZ2VzOiAoa2V5V29yZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnZ2VuZXJhdGlvbnNJbWFnZXMnLCAnZGF0YSc6IHsgJ3Byb21wdCc6IGtleVdvcmQgfSB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWkhOeQhuWbvueJh+eahOaVsOaNruagvOW8j1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdJbWFnZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2VlZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEuZGF0YS5mb3JFYWNoKChpbWcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYWknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpbWcudXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc21hbGw6IGltZy51cmxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvd25sb2FkX2xvY2F0aW9uOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6ICdBSScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBSSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3SW1hZ2VzLnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEltYWdlcyhuZXdJbWFnZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW1hZ2VzKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1RoZSBjdXJyZW50IEFJIGVuZHBvaW50IGRvZXMgbm90IHN1cHBvcnQgaW1hZ2UgZ2VuZXJhdGlvbi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSB9KSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X21hcmtkb3duXzEuZGVmYXVsdCwgeyByZW1hcmtQbHVnaW5zOiBbcmVtYXJrX2JyZWFrc18xLmRlZmF1bHQsIHJlbWFya19nZm1fMS5kZWZhdWx0XSwgcmVoeXBlUGx1Z2luczogW3JlaHlwZV9yYXdfMS5kZWZhdWx0XSwgY29tcG9uZW50czoge1xuICAgICAgICAgICAgICAgICAgICB0YWJsZTogKF9hKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgeyBub2RlIH0gPSBfYSwgcHJvcHMgPSBfX3Jlc3QoX2EsIFtcIm5vZGVcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgb3ZlcmZsb3dYOiAnc2Nyb2xsJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiLCBPYmplY3QuYXNzaWduKHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnbWF4LWNvbnRlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6ICc2MjBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkICNjY2NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBwcm9wcykpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHNraXBIdG1sOiBmYWxzZSwgY2hpbGRyZW46IHByb3BzLm1lc3NhZ2UuY29udGVudCB9KSxcbiAgICAgICAgICAgIHByb3BzLm1lc3NhZ2Uuc3RhdHVzID09PSAnaW52YWxpZF9hcGlfa2V5JyAmJiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJycgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7IHNyYzogc2V0dGluZ0d1aWRlX3BuZ18xLmRlZmF1bHQsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHgnXG4gICAgICAgICAgICAgICAgICAgIH0gfSkpKSkpO1xufVxuO1xuZnVuY3Rpb24gTWVzc2FnZXNMaXN0KHByb3BzKSB7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdtZXNzYWdlcycsIHN0eWxlOiB7XG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMS44JyxcbiAgICAgICAgICAgIHdvcmRXcmFwOiAnYnJlYWstd29yZCcsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206ICcxOHB4J1xuICAgICAgICB9IH0sIHByb3BzLm1lc3NhZ2VzLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoTWVzc2FnZSwgeyBrZXk6IGl0ZW0uY2hhdElkLCBtZXNzYWdlOiBpdGVtIH0pO1xuICAgIH0pKSk7XG59XG5leHBvcnRzLk1lc3NhZ2VzTGlzdCA9IE1lc3NhZ2VzTGlzdDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlByb21wdExpc3QgPSB2b2lkIDA7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuY29uc3Qgc3R5bGVkX2NvbXBvbmVudHNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwic3R5bGVkLWNvbXBvbmVudHNcIikpO1xuY29uc3QgdXNlckluZm9fMSA9IHJlcXVpcmUoXCIuLi9saWIvdXNlckluZm9cIik7XG5jb25zdCBQcm9UYWdfMSA9IHJlcXVpcmUoXCIuLi9Db21wb25lbnRzL1Byb1RhZ1wiKTtcbmxldCBTdHlsZWRCdXR0b24gPSBzdHlsZWRfY29tcG9uZW50c18xLmRlZmF1bHQuYnV0dG9uIGBcblxuICAgIHBhZGRpbmc6IDZweDtcbiAgICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIGN1cnNvcjogdW5zZXQ7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjojRjZGNkY2O1xuICAgIH1cbmA7XG5mdW5jdGlvbiBQcm9tcHRCdXR0b24ocHJvcHMpIHtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFN0eWxlZEJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICc0cHgnLFxuICAgICAgICAgICAgcG9pbnRlckV2ZW50czogcHJvcHMuZGlzYWJsZSA/ICdub25lJyA6ICdhdXRvJ1xuICAgICAgICB9LCBvbkNsaWNrOiBwcm9wcy5oYW5kbGVNZW51SXRlbUNsaWNrIH0sIHByb3BzLmNoaWxkcmVuKSk7XG59XG5mdW5jdGlvbiBQcm9tcHRMaXN0KHByb3BzKSB7XG4gICAgY29uc3QgUHJvbXB0TGlzdERPTSA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3QgdXNlckluZm8gPSAoMCwgdXNlckluZm9fMS51c2VVc2VySW5mb0NvbnRleHQpKCk7XG4gICAgLy8gY29uc3QgdXNlckluZm8gPSB1c2VVc2VySW5mb0NvbnRleHQoKVxuICAgIC8vIGNvbnNvbGUubG9nKCd1c2VySW5mbzonKTtcbiAgICAvLyBjb25zb2xlLmxvZyh1c2VySW5mbyk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFByb21wdExpc3RET00uY3VycmVudCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFByb21wdExpc3RET00uY3VycmVudD8uY2xpZW50SGVpZ2h0KTtcbiAgICAgICAgLy8gLy/orr7nva7oj5zljZXnmoTkvY3nva5cbiAgICAgICAgLy8gaWYgKFByb21wdExpc3RET00uY3VycmVudCkge1xuICAgICAgICAvLyAgICAgUHJvbXB0TGlzdERPTS5jdXJyZW50LnN0eWxlLnRvcCA9IChwYXJzZUludChQcm9tcHRMaXN0RE9NLmN1cnJlbnQuc3R5bGUudG9wLCAxMCkgLSBQcm9tcHRMaXN0RE9NLmN1cnJlbnQuY2xpZW50SGVpZ2h0KS50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICAvLyB9XG4gICAgfSwgW3Byb3BzLnNob3dGb2xsb3dVcERhdGFNZW51LnNob3ddKTtcbiAgICAvLyBQcm9tcHQg6I+c5Y2VIGl0ZW0g54K55Ye7XG4gICAgY29uc3QgaGFuZGxlTWVudUl0ZW1DbGljayA9IChkYXRhKSA9PiB7XG4gICAgICAgIGlmICh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCkge1xuICAgICAgICAgICAgLy8g56ysIDMg5Liq5Y+C5pWwIGZhbHNlIOihqOekuuS4jemHjeaWsOa4suafk+WbvueJh1xuICAgICAgICAgICAgcHJvcHMuaGFuZGxlTWVudUl0ZW1DbGljayhkYXRhLCB0cnVlLCB0cnVlLCBwcm9wcy5mb2xsb3dVcERhdGEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgcmVmOiBQcm9tcHRMaXN0RE9NLCBjbGFzc05hbWU6ICdmb2xsb3dVcE1lbnUnLCBzdHlsZTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwcm9wcy5zaG93Rm9sbG93VXBEYXRhTWVudS5zdHlsZSksIHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIGRpc3BsYXk6IFwiZmxleFwiLCBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLCB3aWR0aDogJzEyMHB4JywgcGFkZGluZzogJzAnIH0pIH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdlbmQnLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHgnLFxuICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNiknLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzY2NidcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IHN0eWxlOiB7IGZsZXg6ICcxJyB9IH0sIFwiUHJvbXB0XCIpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvVGFnXzEuUHJvVGFnLCBudWxsKSksXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHggOHB4IDRweCcsXG4gICAgICAgICAgICAgICAgY3Vyc29yOiAhKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSA/ICdub3QtYWxsb3dlZCcgOiAnJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAhKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSA/ICcwLjcnIDogJzEnLFxuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvbXB0QnV0dG9uLCB7IGRpc2FibGU6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpLCBoYW5kbGVNZW51SXRlbUNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHAgPSAoMCwgdXRpbF8xLmdldERlZmF1bHRQcm9tcHQpKHByb3BzLmZvbGxvd1VwRGF0YS5rZXlXb3JkKTtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlTWVudUl0ZW1DbGljayhwKTtcbiAgICAgICAgICAgICAgICB9IH0sIFwiRGVmYXVsdFwiKSxcbiAgICAgICAgICAgIHByb3BzLnByb21wdExpc3QubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIDxidXR0b24gb25DbGljaz17KCkgPT4gaGFuZGxlTWVudUl0ZW1DbGljayhpdGVtKX0+e2l0ZW0udGl0bGV9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFByb21wdEJ1dHRvbiwgeyBrZXk6IGl0ZW0uaWQsIGRpc2FibGU6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpLCBoYW5kbGVNZW51SXRlbUNsaWNrOiAoKSA9PiBoYW5kbGVNZW51SXRlbUNsaWNrKGl0ZW0pIH0sIGl0ZW0udGl0bGUpO1xuICAgICAgICAgICAgfSkpKSk7XG59XG5leHBvcnRzLlByb21wdExpc3QgPSBQcm9tcHRMaXN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2VsZWN0aW9uID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgbG9jYWxlXzEgPSByZXF1aXJlKFwiLi4vbGliL2xvY2FsZVwiKTtcbmNvbnN0IGxhbmdfMSA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbmNvbnN0IGljb25zXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7XG4vLyBjb25zdCB1c2VTdHlsZXMgPSBjcmVhdGVVc2VTdHlsZXMoe1xuLy8gICBtb3JlQnV0dG9uOiB7XG4vLyAgICAgY29sb3I6ICcjRjA4QTI0Jyxcbi8vICAgICBcIiY6aG92ZXJcIjoge1xuLy8gICAgICAgY29sb3I6ICdyZWQnXG4vLyAgICAgfVxuLy8gICB9LFxuLy8gfSlcbmNvbnN0IHN0eWxlID0gYFxuICAjU2NvdXRlclNlbGVjdGlvbj5zcGFuIHtcbiAgICBmb250LXNpdGU6MTJweDtcbiAgICBjb2xvcjojNjY2O1xuICB9XG4gIC5tb3JlQnV0dG9uIHtcbiAgICBjb2xvcjogI0YwOEEyNDtcbiAgICBjdXJzb3I6cG9pbnRlcjtcbiAgICBtYXJnaW46MHB4IDJweDtcbiAgfVxuICAubW9yZUJ1dHRvbjpob3ZlciB7XG4gICAgb3BhY2l0eTowLjg7XG4gIH1cblxuYDtcbmZ1bmN0aW9uIFNlbGVjdGlvbihwcm9wcykge1xuICAgIGNvbnN0IFt0YXJnZXRMYW5ndWFnZSwgc2V0VGFyZ2V0TGFuZ3VhZ2VdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKCdFbmdsaXNoJyk7XG4gICAgY29uc3QgW3Nob3dGdWxsVGV4dCwgc2V0U2hvd0Z1bGxUZXh0XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh0cnVlKTtcbiAgICBjb25zdCBbcGxheVN0YXR1cywgc2V0UGxheVN0YXR1c10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IGxhc3RTcGVha1RpbWUgPSAoMCwgcmVhY3RfMS51c2VSZWYpKE1hdGguZmxvb3IoRGF0ZS5ub3coKSkpO1xuICAgIC8vIOiOt+WPlueUqOaIt+iuvue9rueahOivreiogOS/oeaBr1xuICAgIGxldCBMYW5nID0gKDAsIGxvY2FsZV8xLnVzZUN1cnJlbnRMYW5ndWFnZSkoKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgc2V0VGFyZ2V0TGFuZ3VhZ2UoTGFuZ1sndGFyZ2V0J11bJ2lkJ10pO1xuICAgICAgICBzZXRTaG93RnVsbFRleHQocHJvcHMudGV4dC5sZW5ndGggPD0gMTQwKTtcbiAgICAgICAgc2V0UGxheVN0YXR1cyhmYWxzZSk7XG4gICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIob25TdG9yYWdlQ2hhbmdlKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5vbkNoYW5nZWQucmVtb3ZlTGlzdGVuZXIob25TdG9yYWdlQ2hhbmdlKTtcbiAgICAgICAgfTtcbiAgICB9LCBbcHJvcHMudGV4dF0pO1xuICAgIC8vIOivremfs+aSreaKpVxuICAgIGNvbnN0IHNwZWFrZXIgPSAoKSA9PiB7XG4gICAgICAgIC8vIOivhuWIq+ivreiogFxuICAgICAgICAvLyBjb25zdCBsbmdEZXRlY3RvciA9IG5ldyBMYW5ndWFnZURldGVjdCgpO1xuICAgICAgICAvLyBsbmdEZXRlY3Rvci5zZXRMYW5ndWFnZVR5cGUoJ2lzbzInKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhsbmdEZXRlY3Rvci5kZXRlY3QocHJvcHMudGV4dCwgMikpO1xuICAgICAgICBjb25zb2xlLmxvZyhNYXRoLmZsb29yKERhdGUubm93KCkpKTtcbiAgICAgICAgY29uc29sZS5sb2cobGFzdFNwZWFrVGltZS5jdXJyZW50KTtcbiAgICAgICAgaWYgKE1hdGguZmxvb3IoRGF0ZS5ub3coKSkgLSBsYXN0U3BlYWtUaW1lLmN1cnJlbnQgPCAxODAwKSB7XG4gICAgICAgICAgICAvLyB4IOavq+enkuWGheWPquWPr+eCueWHu+S4gOasoVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsYXN0U3BlYWtUaW1lLmN1cnJlbnQgPSBNYXRoLmZsb29yKERhdGUubm93KCkpO1xuICAgICAgICAgICAgKDAsIHV0aWxfMS5wbGF5VGV4dFRvU3BlZWNoKShwcm9wcy50ZXh0LCBsYW5nXzEubGFuZ3VhZ2VDb2Rlc1t0YXJnZXRMYW5ndWFnZV0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8g5pqC5YGc5LiK5LiA5qyh5pKt5oql5Lu75YqhXG4gICAgICAgICAgICBzcGVlY2hTeW50aGVzaXMuY2FuY2VsKCk7XG4gICAgICAgICAgICBjb25zdCB1dHRlcmFuY2UgPSBuZXcgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKHByb3BzLnRleHQpO1xuICAgICAgICAgICAgLy8g6K+t56eNXG4gICAgICAgICAgICB1dHRlcmFuY2UubGFuZyA9IGxhbmdfMS5sYW5ndWFnZUNvZGVzW3RhcmdldExhbmd1YWdlXTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGxhbmd1YWdlQ29kZXNbdGFyZ2V0TGFuZ3VhZ2UgYXMga2V5b2YgdHlwZW9mIGxhbmd1YWdlQ29kZXNdKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRhcmdldExhbmd1YWdlKTtcbiAgICAgICAgICAgIC8vIOivremAn1xuICAgICAgICAgICAgaWYgKHBsYXlTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAvLyDln7rmlbDmrKHmkq3mlL7ml7bph4fnlKjmhaLpgJ/mkq3mlL7vvIzorqnnlKjmiLflj6/ku6XlkKznmoTmm7TmuIXmpZpcbiAgICAgICAgICAgICAgICB1dHRlcmFuY2UucmF0ZSA9IDAuNjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHV0dGVyYW5jZS5yYXRlID0gMC44NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFBsYXlTdGF0dXMoIXBsYXlTdGF0dXMpO1xuICAgICAgICAgICAgLy8g5byA5pKt5ZCnXG4gICAgICAgICAgICBzcGVlY2hTeW50aGVzaXMuc3BlYWsodXR0ZXJhbmNlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhbXBsaXR1ZGUudHJhY2soJ3NwZWFrJyk7XG4gICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAnc3BlYWsnIH0pO1xuICAgIH07XG4gICAgY29uc3Qgb25TdG9yYWdlQ2hhbmdlID0gKGNoYW5nZXMsIGFyZWEpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2hhbmdlcyk7XG4gICAgICAgIC8vIOabtOaWsOebruagh+ivreiogFxuICAgICAgICBpZiAoJ3RhcmdldExhbmd1YWdlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY2hhbmdlcycpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY2hhbmdlc1sndGFyZ2V0TGFuZ3VhZ2UnXVsnbmV3VmFsdWUnXSk7XG4gICAgICAgICAgICBzZXRUYXJnZXRMYW5ndWFnZShjaGFuZ2VzWyd0YXJnZXRMYW5ndWFnZSddWyduZXdWYWx1ZSddKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlVG9nZ2xlU2hvd0Z1blRleHQgPSAoKSA9PiB7XG4gICAgICAgIHNldFNob3dGdWxsVGV4dCghc2hvd0Z1bGxUZXh0KTtcbiAgICB9O1xuICAgIC8vIGNvbnN0IGNsYXNzZXMgPSB1c2VTdHlsZXMoKVxuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIsIG51bGwsIHN0eWxlKSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBpZDogXCJTY291dGVyU2VsZWN0aW9uXCIsIGNsYXNzTmFtZTogJycsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAnMThweCAwJyxcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMS41J1xuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgc2hvd0Z1bGxUZXh0ID8gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBwcm9wcy50ZXh0KSxcbiAgICAgICAgICAgICAgICBwcm9wcy50ZXh0Lmxlbmd0aCA+IDE0MCAmJiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBjbGFzc05hbWU6ICdtb3JlQnV0dG9uJywgb25DbGljazogaGFuZGxlVG9nZ2xlU2hvd0Z1blRleHQgfSwgXCJMZXNzXCIpKVxuICAgICAgICAgICAgICAgIDogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgcHJvcHMudGV4dC5zdWJzdHJpbmcoMCwgMTQwKSArICcuLi4nKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgY2xhc3NOYW1lOiAnbW9yZUJ1dHRvbicsIG9uQ2xpY2s6IGhhbmRsZVRvZ2dsZVNob3dGdW5UZXh0IH0sIFwiTW9yZVwiKSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnMnB4J1xuICAgICAgICAgICAgICAgIH0sIHNpemU6IFwic21hbGxcIiwgdHlwZTogXCJ0ZXh0XCIsIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuQ3VzdG9tZXJTZXJ2aWNlT3V0bGluZWQsIG51bGwpLCBvbkNsaWNrOiBzcGVha2VyIH0pKSkpO1xufVxuZXhwb3J0cy5TZWxlY3Rpb24gPSBTZWxlY3Rpb247XG47XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlBvcHVwQ2FyZCA9IHZvaWQgMDtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgcmVhY3Rfc3ByaW5nXzEgPSByZXF1aXJlKFwicmVhY3Qtc3ByaW5nXCIpO1xuY29uc3QgY29udGVudFNjcmlwdF8xID0gcmVxdWlyZShcIi4uL2NvbnRlbnRTY3JpcHRcIik7XG5jb25zdCBOYXZfMSA9IHJlcXVpcmUoXCIuLi9Db21wb25lbnRzL05hdlwiKTtcbmNvbnN0IEN1c3RvbVByb21wdEZvcm1fMSA9IHJlcXVpcmUoXCIuLi9Db21wb25lbnRzL0N1c3RvbVByb21wdEZvcm1cIik7XG5jb25zdCBNZXNzYWdlXzEgPSByZXF1aXJlKFwiLi9NZXNzYWdlXCIpO1xuY29uc3QgUHJvbXB0TGlzdF8xID0gcmVxdWlyZShcIi4vUHJvbXB0TGlzdFwiKTtcbmNvbnN0IFNlbGVjdGlvbl8xID0gcmVxdWlyZShcIi4vU2VsZWN0aW9uXCIpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCBpY29uc18xID0gcmVxdWlyZShcIkBhbnQtZGVzaWduL2ljb25zXCIpO1xuY29uc3QgbG9jYWxlXzEgPSByZXF1aXJlKFwiLi4vbGliL2xvY2FsZVwiKTtcbmNvbnN0IHVzZXJJbmZvXzEgPSByZXF1aXJlKFwiLi4vbGliL3VzZXJJbmZvXCIpO1xuY29uc3QgbGFuZ18xID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IHN0eWxlZF9jb21wb25lbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInN0eWxlZC1jb21wb25lbnRzXCIpKTtcbmxldCBjdXJyZW50TGFuZ3VhZ2U7XG5sZXQgdGFyZ2V0TGFuZ3VhZ2U7XG4vLyDojrflj5YgQW5raSDljaHniYfvvIznlKjkuo7nvJblhpnmlYXkuotcbmxldCBhbmtpQ2FyZHM7XG4oMCwgdXRpbF8xLmdldEFua2lDYXJkcykoKS50aGVuKChjYXJkcykgPT4ge1xuICAgIGFua2lDYXJkcyA9IGNhcmRzO1xufSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coZXJyb3IpO1xufSk7XG4vLyDliJ3lp4vljJYgQW5raSDnmoQgTW9kZWzvvIzkuLrlkI7nu63lr7zlhaXliLAgQW5raSDmj5DpgJ9cbmNvbnN0IHsgVGV4dEFyZWEgfSA9IGFudGRfMS5JbnB1dDtcbi8vIGNvbnN0IEFua2lDb250ZXh0ID0gY3JlYXRlQ29udGV4dChudWxsKTtcbmNvbnN0IFNjb3V0ZXJEaXYgPSBzdHlsZWRfY29tcG9uZW50c18xLmRlZmF1bHQuZGl2IGBcblxubGVmdDoxMDtcbnRvcDoxMDtcblxuZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG53aWR0aDogMzkwcHg7XG5oZWlnaHQ6IDU2MHB4O1xuY29sb3I6IHJnYigwIDAgMCAvIDgwJSk7XG5wb3NpdGlvbjogZml4ZWQ7XG5kaXNwbGF5OiBmbGV4O1xuZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbmZvbnQtc2l6ZTogMTMuMnB4O1xuYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbnotaW5kZXg6IDk5OTk7XG5vdmVyZmxvdzogaGlkZGVuO1xuYm94LXNoYWRvdzogMHB4IDhweCAyOHB4IHJnYmEoMCwwLDAsLjE2KTtcbmJvcmRlci1yYWRpdXM6IDZweDtcbmJvcmRlcjoxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMDYpXG5cbmgxLGgyLGgye1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuaDEge1xuICBmb250LXNpemU6MjBweDtcbn1cblxuaDIge1xuICBmb250LXNpemU6MTdweDtcbn1cblxuYDtcbmZ1bmN0aW9uIFBvcHVwQ2FyZChwcm9wcykge1xuICAgIC8vIGNvbnN0IFttZXNzYWdlcywgc2V0TWVzc2FnZXNdID0gdXNlU3RhdGU8QXJyYXk8eyBjb250ZW50OiBzdHJpbmcsIHJvbGU6IHN0cmluZywgbG9hZGluZzogYm9vbGVhbiwgY2hhdElkOiBzdHJpbmcsIHByb21wdDogc3RyaW5nLCBzdGF0dXM6IHN0cmluZyB9Pj4oW3sgJ2NvbnRlbnQnOiAnJywgJ3JvbGUnOiAndXNlcicsICdsb2FkaW5nJzogZmFsc2UsICdjaGF0SWQnOiAnJywgJ3Byb21wdCc6ICcnLCAnc3RhdHVzJzogJycgfV0pXG4gICAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoW3sgJ2NvbnRlbnQnOiAnJywgJ3JvbGUnOiAndXNlcicsICdsb2FkaW5nJzogZmFsc2UsICdjaGF0SWQnOiAnJywgJ3Byb21wdCc6ICcnLCAnc3RhdHVzJzogJycsICdzaG93SW1hZ2VzQm94JzogdHJ1ZSwgJ2ltYWdlcyc6IFtdIH1dKTtcbiAgICBjb25zdCBbaW1hZ2VzLCBzZXRJbWFnZXNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKFtdKTtcbiAgICBjb25zdCBbc2hvd0ltYWdlc0JveCwgc2V0U2hvd0ltYWdlc0JveF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtwcm9tcHRzLCBzZXRQcm9tcHRzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShbXSk7XG4gICAgY29uc3QgW2xhc3RFeGVjdXRlZFByb21wdCwgc2V0TGFzdEV4ZWN1dGVkUHJvbXB0XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7ICd0aXRsZSc6ICfwn5GJ8J+PvCBQbGVhc2UgY2hvb3NlIGEgcHJvbXB0JywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZmFsc2UsICd1c2VyUHJvbXB0JzogJycsICdpZCc6ICcnIH0pO1xuICAgIGNvbnN0IFtpc09wZW5NZW51LCBzZXRJc09wZW5NZW51XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh0cnVlKTtcbiAgICBjb25zdCBbaXNQb3BvdmVyT3Blbiwgc2V0UG9wb3Zlck9wZW5dID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbY3VzdG9tUHJvbXB0Rm9ybURhdGEsIHNldEN1c3RvbVByb21wdEZvcm1EYXRhXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7ICd0aXRsZSc6ICcnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBmYWxzZSwgJ3VzZXJQcm9tcHQnOiAnJywgJ2lkJzogJycgfSk7XG4gICAgLy8gc3RhbmRieSxub3JtYWwsbG9hZGluZyxzdWNjZXNzXG4gICAgY29uc3QgW2FkZFRvQW5raVN0YXR1cywgc2V0QWRkVG9BbmtpU3RhdHVzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgY29uc3QgW2lzQW5zd2VyRG9uZSwgc2V0QW5zd2VyRG9uZV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtmb2xsb3dVcERhdGEsIHNldEZvbGxvd1VwRGF0YV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoeyBrZXlXb3JkOiAnJywgc2VudGVuY2U6ICcnIH0pO1xuICAgIGNvbnN0IFtzaG93Rm9sbG93VXBEYXRhTWVudSwgc2V0U2hvd0ZvbGxvd1VwRGF0YU1lbnVdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHsgc2hvdzogZmFsc2UsIHN0eWxlOiB7fSB9KTtcbiAgICBjb25zdCBbaXNBcGlFcnJvLCBzZXRJc0FwaUVycm9dID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbaXNBbnN3ZXJJbnB1dGVkLCBzZXRJc0Fuc3dlcklucHV0ZWRdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICAvLyDnqpflj6Pmi5bmi73pgLvovpFcbiAgICBjb25zdCBbZHJhZ2dpbmcsIHNldERyYWdnaW5nXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3Qgd2luZG93RWxlbWVudCA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3QgbWVzc2FnZXNMaXN0ID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICBjb25zdCBpbnB1dFJlZiA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3Qgc2hvdWxkU3RheUF0Qm90dG9tUmVmID0gKDAsIHJlYWN0XzEudXNlUmVmKShmYWxzZSk7XG4gICAgY29uc3QgdXNlckluZm9SZWYgPSAoMCwgcmVhY3RfMS51c2VSZWYpKCk7XG4gICAgY29uc3QgW2Zvcm1dID0gYW50ZF8xLkZvcm0udXNlRm9ybSgpO1xuICAgIC8vIOS9v+eUqOmVv+i/nuaOpVxuICAgIGxldCBwb3J0ID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLmNvbm5lY3Qoe1xuICAgICAgICBuYW1lOiAnZ2V0R1BUJ1xuICAgIH0pO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gKDAsIHVzZXJJbmZvXzEudXNlVXNlckluZm9Db250ZXh0KSgpO1xuICAgIGxldCBMYW5nID0gKDAsIGxvY2FsZV8xLnVzZUN1cnJlbnRMYW5ndWFnZSkoKTtcbiAgICBjdXJyZW50TGFuZ3VhZ2UgPSBMYW5nWydjdXJyZW50J11bJ25hbWUnXTtcbiAgICB0YXJnZXRMYW5ndWFnZSA9IExhbmdbJ3RhcmdldCddWyduYW1lJ107XG4gICAgLy8gY29uc3QgdXNlckluZm8gPSB1c2VVc2VySW5mb0NvbnRleHQoKVxuICAgIC8vIOaOp+WItui/vemXruiPnOWNlVxuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHBvcnQgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgICAgICAgICBuYW1lOiAnZnJvbVBvcHVwQ2FyZCdcbiAgICAgICAgfSk7XG4gICAgICAgIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKChtc2cpID0+IHtcbiAgICAgICAgICAgIGlmIChtc2cudHlwZSA9PT0gXCJVUERBVEVfUE9QVVBfQ0FSRFwiKSB7XG4gICAgICAgICAgICAgICAgLy8g5pi+56S6IFByb21wdCDoj5zljZVcbiAgICAgICAgICAgICAgICBzZXRGb2xsb3dVcERhdGEobXNnLnBheWxvYWQuZm9sbG93VXBEYXRhKTtcbiAgICAgICAgICAgICAgICAvL+iuvue9ruiPnOWNleeahOS9jee9rlxuICAgICAgICAgICAgICAgIHNldFNob3dGb2xsb3dVcERhdGFNZW51KHByZXYgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBtc2cucGF5bG9hZC5zdHlsZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIChfYSA9IHdpbmRvd0VsZW1lbnQuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENhcmRDbGljayk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndXNlRWZmZWN0IHJldHVybicpO1xuICAgICAgICAgICAgKF9hID0gd2luZG93RWxlbWVudC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2FyZENsaWNrKTtcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUG9wdXBDYXJkQ2xpY2soKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2hvd0ZvbGxvd1VwRGF0YU1lbnUuc2hvdykge1xuICAgICAgICAgICAgICAgICAgICBzZXRTaG93Rm9sbG93VXBEYXRhTWVudShwcmV2ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgIH1cbiAgICB9LCBbc2hvd0ZvbGxvd1VwRGF0YU1lbnVdKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgLy8g5riy5p+TIFByb21wdCDliJfooahcbiAgICAgICAgaW5pdGlhbGl6ZVByb21wdExpc3QoKTtcbiAgICAgICAgaWYgKHByb3BzLnJ1blByb21wdCB8fCBwcm9wcy5ydW5Qcm9tcHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8g6I635Y+W5pyA6L+R5LiA5qyh5omn6KGM55qEIFByb21wdFxuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLmdldCh7IFwibGFzdEV4ZWN1dGVkUHJvbXB0XCI6ICcnIH0pLnRoZW4oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5sYXN0RXhlY3V0ZWRQcm9tcHQgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOaJp+ihjOm7mOiupCBQcm9tcHTjgIHojrflj5YgVW5zcGxhc2gg5Zu+54mHXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvcm1wdCA9ICgwLCB1dGlsXzEuZ2V0RGVmYXVsdFByb21wdCkocHJvcHMuZGF0YS5rZXlXb3JkKTtcbiAgICAgICAgICAgICAgICAgICAgZXhlY3V0aXZlUHJvbXB0KHBvcm1wdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyDmiafooYwgUHJvbXB044CB6I635Y+WIFVuc3BsYXNoIOWbvueJh1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5sYXN0RXhlY3V0ZWRQcm9tcHQuaWQgPT09IFwiRGVmYXVsdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3JtcHQgPSAoMCwgdXRpbF8xLmdldERlZmF1bHRQcm9tcHQpKHByb3BzLmRhdGEua2V5V29yZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBleGVjdXRpdmVQcm9tcHQocG9ybXB0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWN1dGl2ZVByb21wdChpdGVtLmxhc3RFeGVjdXRlZFByb21wdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIOS4jeaJp+ihjOS7u+S9lSBQcm9tcHTvvIznlLHnlKjmiLfoh6rooYzpgInmi6lcbiAgICAgICAgICAgIGV4ZWN1dGl2ZVByb21wdCh7ICd0aXRsZSc6ICdEZWZhdWx0JywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogdHJ1ZSwgJ3VzZXJQcm9tcHQnOiBgV29yZDpcInt7a2V5V29yZH19XCIsIHNlbnRlbmNlOiBcInt7c2VudGVuY2V9fVwiYCwgJ2lkJzogJ0RlZmF1bHQnIH0sIGZhbHNlKTtcbiAgICAgICAgICAgIHNldElzT3Blbk1lbnUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6K6+572u56qX5Y+j55qE6buY6K6k5L2N572u44CB5re75Yqg5rua5Yqo5LqL5Lu277yM6K6p5raI5oGv5YiX6KGo6Ieq5Yqo5rua5Yqo5Yiw5bqV6YOoXG4gICAgICAgICgwLCB1dGlsXzEud2luZG93SW5pdGlhbGl6YXRpb24pKHsgJ2lzUGluJzogcHJvcHMuaXNQaW4sICd3aW5kb3dFbGVtZW50Jzogd2luZG93RWxlbWVudCwgJ3NlbGVjdGlvbic6IHByb3BzLnNlbGVjdGlvbiwgJ21lc3NhZ2VzTGlzdCc6IG1lc3NhZ2VzTGlzdCB9KTtcbiAgICB9LCBbcHJvcHMuZGF0YS5rZXlXb3JkXSk7XG4gICAgLy8g6IGK5aSp6K6w5b2V5pS55Y+Y5pe2XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIC8vIOiusOW9leW9k+WJjeWIl+ihqOeahOS9jee9rlxuICAgICAgICBpZiAod2luZG93RWxlbWVudC5jdXJyZW50KSB7XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRhaW5lcicpWzBdO1xuICAgICAgICAgICAgc2hvdWxkU3RheUF0Qm90dG9tUmVmLmN1cnJlbnQgPSBjb250YWluZXIuc2Nyb2xsSGVpZ2h0IC0gY29udGFpbmVyLnNjcm9sbFRvcCA8PSBjb250YWluZXIuY2xpZW50SGVpZ2h0ICsgMjA7XG4gICAgICAgICAgICAvLyDoh6rliqjmu5rliqjliLDmtojmga/lupXpg6jvvIzmlrnkvr/nnIvliLDmnIDmlrDnmoTmloflrZdcbiAgICAgICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2VzW21lc3NhZ2VzLmxlbmd0aCAtIDFdLmxvYWRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9Cb3R0b20odHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb0JvdHRvbShzaG91bGRTdGF5QXRCb3R0b21SZWYuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIC8vICAgaWYgKGNvbnRhaW5lciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBjaGVja0lmU2hvdWxkU3RheUF0Qm90dG9tKTtcbiAgICAgICAgICAgIC8vICAgfVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgfSwgW21lc3NhZ2VzXSk7XG4gICAgLy8g56qX5Y+j5ouW5ou95pe26Kem5Y+RXG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZVVwKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1c2VFZmZlY3QgcmV0dXJuJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVNb3VzZU1vdmUpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNlVXApO1xuICAgICAgICB9O1xuICAgIH0sIFtkcmFnZ2luZ10pO1xuICAgIC8vIOS/neWtmOWOhuWPsuiusOW9lVxuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAvLyDlnKggb3BlbkFwaUFuc2VyIOabtOaWsOWQjuWwhuWFtuS/neWtmOWIsOa1j+iniOWZqOWtmOWCqOS4rVxuICAgICAgICAvLyDlj6rkv53nlZnmtojmga/orrDlvZXnmoTnrKwgMSDmnaHvvIzlpoLmnpzov5nmnaHmtojlpLHmmK/plJnor6/mj5DnpLrvvIzliJnkuI3kv53lrZhcbiAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA+IDAgJiYgaXNBbnN3ZXJEb25lICYmIG1lc3NhZ2VzWzBdWydzdGF0dXMnXSA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU2F2ZScpO1xuICAgICAgICAgICAgY29uc3Qga2V5V29yZCA9IHByb3BzLmRhdGEua2V5V29yZDtcbiAgICAgICAgICAgIGNvbnN0IFNlbnRlbmNlID0gcHJvcHMuZGF0YS5TZW50ZW5jZTtcbiAgICAgICAgICAgIC8vIOWwhuafpeivouiusOW9leS/neWtmOi1t+adpVxuICAgICAgICAgICAgY29uc3QgbmV3SGlzdG9yeSA9IHtcbiAgICAgICAgICAgICAgICAna2V5V29yZCc6IGtleVdvcmQsXG4gICAgICAgICAgICAgICAgJ3NlbnRlbmNlJzogU2VudGVuY2UsXG4gICAgICAgICAgICAgICAgJ3JvbGUnOiBtZXNzYWdlc1swXVsncm9sZSddLFxuICAgICAgICAgICAgICAgICdhbnN3ZXInOiBtZXNzYWdlc1swXVsnY29udGVudCddLFxuICAgICAgICAgICAgICAgICdzb3VyY2UnOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICAgICAgICAgICAgICAncHJvbXB0JzogbWVzc2FnZXNbMF1bJ3Byb21wdCddLFxuICAgICAgICAgICAgICAgICdpbWFnZXMnOiBtZXNzYWdlc1swXVsnaW1hZ2VzJ11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoa2V5V29yZCAhPT0gJycgJiYgU2VudGVuY2UgIT09ICcnICYmIG1lc3NhZ2VzWzBdWydjb250ZW50J10gIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLmdldCh7IFwiaGlzdG9yeVwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0uaGlzdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdIaXN0b3J5TGlzdCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmluZ28gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbmV3SGlzdG9yeUxpc3QucHVzaChuZXdIaXN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbS5oaXN0b3J5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6c6K6w5b2V5bey5a2Y5Zyo77yM5YiZ5LiN6YeN5aSN5L+d5a2YXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW0uaGlzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBpdGVtLmhpc3RvcnlbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5rZXlXb3JkID09PSBuZXdIaXN0b3J5WydrZXlXb3JkJ10gJiYgb2JqLnNlbnRlbmNlID09PSBuZXdIaXN0b3J5WydzZW50ZW5jZSddICYmIG9iai5wcm9tcHQgPT09IG5ld0hpc3RvcnlbJ3Byb21wdCddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmdvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SGlzdG9yeUxpc3QgPSBpdGVtLmhpc3Rvcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdIaXN0b3J5TGlzdC51bnNoaWZ0KG5ld0hpc3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SGlzdG9yeUxpc3Quc3BsaWNlKDgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobmV3SGlzdG9yeUxpc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghYmluZ28pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5zZXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpc3Rvcnk6IG5ld0hpc3RvcnlMaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgW2lzQW5zd2VyRG9uZV0pO1xuICAgIGNvbnN0IGV4ZWN1dGl2ZVByb21wdCA9IChwcm9tcHQsIHJ1blByb21wdCwgaW1hZ2VUb1JlcmVuZGVyLCBkYXRhKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSlcbiAgICAgICAgLy8g6K6+572u5Yqg6L2954q25oCBXG4gICAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgICAgbGV0IG5lZWRUb1J1blByb21wdCA9IHJ1blByb21wdDtcbiAgICAgICAgaWYgKG5lZWRUb1J1blByb21wdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBuZWVkVG9SdW5Qcm9tcHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuZWVkVG9SZXJlbmRlckltYWdlID0gaW1hZ2VUb1JlcmVuZGVyO1xuICAgICAgICBpZiAobmVlZFRvUmVyZW5kZXJJbWFnZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBuZWVkVG9SZXJlbmRlckltYWdlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQga2V5V29yZCA9IHByb3BzLmRhdGEua2V5V29yZDtcbiAgICAgICAgbGV0IFNlbnRlbmNlID0gcHJvcHMuZGF0YS5TZW50ZW5jZTtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAga2V5V29yZCA9IGRhdGEua2V5V29yZDtcbiAgICAgICAgICAgIFNlbnRlbmNlID0gZGF0YS5zZW50ZW5jZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIOWIneWni+WMllxuICAgICAgICAgICAgc2V0TWVzc2FnZXMoW10pOyAvLyDlr7nor53liJfooahcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiAobmVlZFRvUmVyZW5kZXJJbWFnZSkge1xuICAgICAgICAvLyAgIHNldEltYWdlcyhbXSkgICAgIC8vIOWbvueJh+WIl+ihqFxuICAgICAgICAvLyB9XG4gICAgICAgIGlmIChuZWVkVG9SdW5Qcm9tcHQpIHtcbiAgICAgICAgICAgIGxldCBzaG93SW1hZ2VzQm94ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChwcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMgJiYgbmVlZFRvUnVuUHJvbXB0KSB7XG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c5b2T5YmNIFByb21wdCDpnIDopoHmmL7npLrlm77niYfvvIzkuJTlvZPliY3pnIDopoHnq4vljbPmiafooYwgUHJvbXB0XG4gICAgICAgICAgICAgICAgc2hvd0ltYWdlc0JveCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaG93SW1hZ2VzQm94ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBhbXBsaXR1ZGUudHJhY2soJ2V4ZWN1dGl2ZVByb21wdCcpO1xuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdleGVjdXRpdmVQcm9tcHQnIH0pO1xuICAgICAgICAgICAgLy8g5Zyo5raI5oGv5Y6G5Y+y5Lit5o+S5YWl5paw6K6w5b2VXG4gICAgICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4gWy4uLnByZXZNZXNzYWdlcywgeyAnY29udGVudCc6ICcnLCAncm9sZSc6ICdhc3Npc3RhbnQnLCAnbG9hZGluZyc6IHRydWUsICdjaGF0SWQnOiAnJywgJ3Byb21wdCc6ICcnLCAnc3RhdHVzJzogJycsICdzaG93SW1hZ2VzQm94Jzogc2hvd0ltYWdlc0JveCwgJ2ltYWdlcyc6IFtdIH1dKTtcbiAgICAgICAgICAgIC8vIOmdnui/vemXruaXtu+8jOaJjeS8muiusOW9leacgOi/keaJp+ihjOeahCBQcm9tcHRcbiAgICAgICAgICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyDorr7nva7mnIDov5HmiafooYznmoQgUHJvbXB0XG4gICAgICAgICAgICAgICAgc2V0TGFzdEV4ZWN1dGVkUHJvbXB0KHByb21wdCk7XG4gICAgICAgICAgICAgICAgLy8g6K6w5b2V5pyA6L+RIDEg5qyh5L2/55So55qEIFByb21wdFxuICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5zZXQoe1xuICAgICAgICAgICAgICAgICAgICBsYXN0RXhlY3V0ZWRQcm9tcHQ6IHByb21wdFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5aSE55CGIFByb21wdCDkuK3nmoTlj5jph49cbiAgICAgICAgICAgIGxldCBuZXdQcm9tcHQ7XG4gICAgICAgICAgICBsZXQgcCA9IHByb21wdC51c2VyUHJvbXB0O1xuICAgICAgICAgICAgLy8gaWYgKHByb21wdC5pZCA9PSAnRGVmYXVsdCcpIHtcbiAgICAgICAgICAgIC8vICAgcCA9IGRlZmF1bHRQcm9tcHRbJ3VzZXJQcm9tcHQnXVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8g5aSE55CGIFByb21wdCDkuK3nmoTlj5jph49cbiAgICAgICAgICAgIHAgPSB5aWVsZCAoMCwgdXRpbF8xLmhhbmRsZVByb21wdFZhcmlhYmxlcykocCwga2V5V29yZCwgU2VudGVuY2UsIExhbmcpO1xuICAgICAgICAgICAgbmV3UHJvbXB0ID0gW3sgJ3JvbGUnOiAndXNlcicsICdjb250ZW50JzogcCB9XTtcbiAgICAgICAgICAgIC8vIOWmguaenOWOhuWPsuiusOW9leS4reWtmOWcqOiusOW9le+8jOWImeS4jemHjeWkjeivt+axgiBBUEnvvIznm7TmjqXmmL7npLrljoblj7LorrDlvZXnmoTkv6Hmga9cbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5nZXQoeyBcImhpc3RvcnlcIjogW10gfSkudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgIC8vIOWmguaenOiusOW9leW3suWtmOWcqO+8jOWImeS4jemHjeWkjeS/neWtmFxuICAgICAgICAgICAgICAgIGxldCBiaW5nbyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbS5oaXN0b3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBpdGVtLmhpc3RvcnlbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmoua2V5V29yZCA9PT0ga2V5V29yZCAmJiBvYmouc2VudGVuY2UgPT09IFNlbnRlbmNlICYmIG9iai5wcm9tcHQgPT09IG5ld1Byb21wdFswXVsnY29udGVudCddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJ3JvbGUnIGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pen54mI5pys5Lit5Zug5Li65rKh5pyJ5a2Y5YKoIHJvbGUg77yM55u05o6l5pi+56S65Y6G5Y+y5pWw5o2u5pe25Lya5a+86Ie05ZCO57ut5rWB56iL5byC5bi4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZ28gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmdvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOebtOaOpeaYvuekuuWOhuWPsuiusOW9leS4reeahOWbnuetlFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0TWVzc2FnZSA9IHByZXZNZXNzYWdlc1twcmV2TWVzc2FnZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlZExhc3RNZXNzYWdlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBsYXN0TWVzc2FnZSksIHsgY2hhdElkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksIHJvbGU6IG9iai5yb2xlLCBjb250ZW50OiBvYmouYW5zd2VyLCBwcm9tcHQ6IG5ld1Byb21wdFswXVsnY29udGVudCddLCBsb2FkaW5nOiBmYWxzZSwgc3RhdHVzOiAnc3VjY2VzcycsIGltYWdlczogb2JqLmltYWdlcyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWy4uLnByZXZNZXNzYWdlcy5zbGljZSgwLCBwcmV2TWVzc2FnZXMubGVuZ3RoIC0gMSksIHVwZGF0ZWRMYXN0TWVzc2FnZV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRBbnN3ZXJEb25lKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdub3JtYWwnLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIOaXoOWOhuWPsuiusOW9lVxuICAgICAgICAgICAgICAgIGlmICghYmluZ28pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g6K+35rGCIEFJIOaVsOaNrlxuICAgICAgICAgICAgICAgICAgICBnZXRHUFRNc2cobmV3UHJvbXB0LCBrZXlXb3JkKTtcbiAgICAgICAgICAgICAgICAgICAgLy8g6K+35rGC5Zu+54mHXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9tcHQuaWQgPT0gJ0RlZmF1bHQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5V29yZC5sZW5ndGggPD0gMjAgJiYgcHJvbXB0LmdldFVuc3BsYXNoSW1hZ2VzICYmIG5lZWRUb1JlcmVuZGVySW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDojrflj5blm77niYfmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmdldFVuc3BsYXNoSW1hZ2VzKShrZXlXb3JkKS50aGVuKChpbWdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldEltYWdlcyhpbWdzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDkv53lrZjlm77niYfmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RNZXNzYWdlID0gcHJldk1lc3NhZ2VzW3ByZXZNZXNzYWdlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2TWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlZExhc3RNZXNzYWdlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBsYXN0TWVzc2FnZSksIHsgbmVlZFRvU2hvd0ltZzogdHJ1ZSwgaW1hZ2VzOiBpbWdzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5wcmV2TWVzc2FnZXMuc2xpY2UoMCwgcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDEpLCB1cGRhdGVkTGFzdE1lc3NhZ2VdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMgJiYgbmVlZFRvUmVyZW5kZXJJbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOiOt+WPluWbvueJh+aVsOaNrlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgwLCB1dGlsXzEuZ2V0VW5zcGxhc2hJbWFnZXMpKGtleVdvcmQpLnRoZW4oKGltZ3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0SW1hZ2VzKGltZ3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS/neWtmOWbvueJh+aVsOaNrlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBwcmV2TWVzc2FnZXNbcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZNZXNzYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkTGFzdE1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxhc3RNZXNzYWdlKSwgeyBuZWVkVG9TaG93SW1nOiB0cnVlLCBpbWFnZXM6IGltZ3MgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWy4uLnByZXZNZXNzYWdlcy5zbGljZSgwLCBwcmV2TWVzc2FnZXMubGVuZ3RoIC0gMSksIHVwZGF0ZWRMYXN0TWVzc2FnZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXRMYXN0RXhlY3V0ZWRQcm9tcHQoeyAndGl0bGUnOiAnJywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZmFsc2UsICd1c2VyUHJvbXB0JzogJycsICdpZCc6ICcnIH0pO1xuICAgICAgICAgICAgc2V0QW5zd2VyRG9uZSh0cnVlKTtcbiAgICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAvLyDmlbDmja7ln4vngrlcbiAgICAgICAgICAgIC8vIGFtcGxpdHVkZS50cmFjaygnb3BlblBvcHVwQ2FyZCcpO1xuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdvcGVuUG9wdXBDYXJkJyB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGluaXRpYWxpemVQcm9tcHRMaXN0ID0gKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyDojrflj5blt7Lkv53lrZjnmoQgUHJvbXB0IExpc3RcbiAgICAgICAgY29uc3QgcHJvbXB0TGlzdCA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7IFwicHJvbXB0TGlzdFwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5wcm9tcHRMaXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgc2V0UHJvbXB0cyhwcm9tcHRMaXN0KTtcbiAgICB9KTtcbiAgICBjb25zdCBoYW5kbGVQcm9tcHRFZGl0ZWQgPSAoaXNOZXcpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8g5Yid5aeL5YyWIFByb21wdCDliJfooahcbiAgICAgICAgaW5pdGlhbGl6ZVByb21wdExpc3QoKTtcbiAgICAgICAgLy8g5pu05paw5pyA6L+R5L2/55So55qEIFByb21wdO+8iOmSiOWvuee8lui+keeahOWcuuaZr++8iVxuICAgICAgICBpZiAoIWlzTmV3KSB7XG4gICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2Uuc3luYy5nZXQoeyBcInByb21wdExpc3RcIjogW10gfSkudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbS5wcm9tcHRMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnByb21wdExpc3RbaV0uaWQgPT09IGxhc3RFeGVjdXRlZFByb21wdC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pu05pawXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRMYXN0RXhlY3V0ZWRQcm9tcHQoaXRlbS5wcm9tcHRMaXN0W2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOiusOW9leacgOi/kSAxIOasoeS9v+eUqOeahCBQcm9tcHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5zZXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RFeGVjdXRlZFByb21wdDogaXRlbS5wcm9tcHRMaXN0W2ldXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYW1wbGl0dWRlLnRyYWNrKCdoYW5kbGVQcm9tcHRFZGl0ZWQnKTtcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdoYW5kbGVQcm9tcHRFZGl0ZWQnIH0pO1xuICAgIH0pO1xuICAgIC8vIOivt+axgiBHUFQg5pWw5o2uXG4gICAgY29uc3QgZ2V0R1BUTXNnID0gKHByb21wdCwga2V5V29yZCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyAvLyDkvb/nlKjplb/ov57mjqVcbiAgICAgICAgLy8gbGV0IHBvcnQgPSBicm93c2VyLnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgICAgIC8vICAgbmFtZTogJ2Zyb21Qb3B1cENhcmQnXG4gICAgICAgIC8vIH0pXG4gICAgICAgIGNvbnN0IHRoaXNLZXlXb3JkID0ga2V5V29yZCB8fCAnJztcbiAgICAgICAgLy8g6K6+572u5Li65Zue562U5LitXG4gICAgICAgIHNldEFuc3dlckRvbmUoZmFsc2UpO1xuICAgICAgICAvLyDnpoHnlKjkv53lrZjliLAgQW5raSDmjInpkq5cbiAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdzdGFuZGJ5JywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgIC8vIOWcqOa2iOaBr+WOhuWPsuS4reaPkuWFpeaWsOiusOW9lVxuICAgICAgICAvLyBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4gWy4uLnByZXZNZXNzYWdlcywgeyAnY29udGVudCc6ICcnLCAncm9sZSc6ICdhc3Npc3RhbnQnLCAnbG9hZGluZyc6IHRydWUsICdjaGF0SWQnOiAnJywgJ3Byb21wdCc6ICcnIH1dKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vIOS9v+eUqCBwb3N0TXMg5Y+R6YCB5L+h5oGvXG4gICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnZ2V0R1BUTXNnJywgJ21lc3NhZ2VzJzogcHJvbXB0LCAna2V5V29yZCc6IHRoaXNLZXlXb3JkIH0pO1xuICAgICAgICB9LCAyMCk7XG4gICAgICAgIC8vIOaOpeaUtuS/oeaBr1xuICAgICAgICBwb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobXNnKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXInKTtcbiAgICAgICAgICAgIGlmIChtc2cudHlwZSA9PT0gJ3NlbmRHUFREYXRhJykge1xuICAgICAgICAgICAgICAgIC8vIOivt+axgiBHUFQg5pWw5o2u5aSx6LSlXG4gICAgICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT09ICdlcnJvJykge1xuICAgICAgICAgICAgICAgICAgICAvLyB0eXBlID09PSAnYXMyJyA/IHNldG9wZW5BcGlBbnNlcjIobXNnLmNvbnRlbnQpIDogc2V0b3BlbkFwaUFuc2VyKG1zZy5jb250ZW50KVxuICAgICAgICAgICAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobXNnLmNvZGUgPT09ICdpbnZhbGlkX2FwaV9rZXknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXRJc0FwaUVycm8odHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zZy5jb250ZW50ICs9ICdcXFxuICAgICAgICAgICAgQWZ0ZXIgdGhhdCwgeW91IG5lZWQgdG8gc2V0IHRoZSBjb3JyZWN0IE9wZW4gQVBJIEtleSBpbiB0aGUgU2NvdXRlcjonO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0TWVzc2FnZSA9IHByZXZNZXNzYWdlc1twcmV2TWVzc2FnZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBuZXdNc2dMaXN0ID0gbGFzdE1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRMYXN0TWVzc2FnZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbGFzdE1lc3NhZ2UpLCB7IGNoYXRJZDogbXNnLmNoYXRJZCwgY29udGVudDogbXNnLmNvbnRlbnQsIGxvYWRpbmc6IGZhbHNlLCBzdGF0dXM6ICdpbnZhbGlkX2FwaV9rZXknLCBwcm9tcHQ6IHByb21wdFswXVsnY29udGVudCddIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgbmV3TXNnTGlzdCA9IFsuLi5wcmV2TWVzc2FnZXMuc2xpY2UoMCwgcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDEpLCBsYXN0TWVzc2FnZV1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbLi4ucHJldk1lc3NhZ2VzLnNsaWNlKDAsIHByZXZNZXNzYWdlcy5sZW5ndGggLSAxKSwgdXBkYXRlZExhc3RNZXNzYWdlXTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNldEFuc3dlckRvbmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzQXBpRXJybykge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZXRJc0FwaUVycm8oZmFsc2UpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIOivt+axgiBHUFQg5pWw5o2u5oiQ5Yqf5LiU5pWw5o2u5rWB57uT5p2f5Lyg6L6TXG4gICAgICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT09ICdlbmQnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOiusOW9lea2iOaBr+WbnuetlOWujOavle+8iOinpuWPkeS/neWtmOWOhuWPsuiusOW9le+8iVxuICAgICAgICAgICAgICAgICAgICBzZXRBbnN3ZXJEb25lKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICAgICAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyDor7fmsYIgR1BUIOaVsOaNruaIkOWKn+S4lOaVsOaNrua1geW8gOWni+S8oOi+k1xuICAgICAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09PSAnYmVnaW4nKSB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIOivt+axgiBHUFQg5pWw5o2u5oiQ5Yqf5LiU5pWw5o2u5rWB5Lyg6L6T5LitXG4gICAgICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT09ICdwcm9jZXNzJykge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5riy5p+T5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RNZXNzYWdlID0gcHJldk1lc3NhZ2VzW3ByZXZNZXNzYWdlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldk1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld01zZ0xpc3QgPSBsYXN0TWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3Q29udGVudCA9IG5ld01zZ0xpc3QuY29udGVudCArIG1zZy5jb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbnRlbnQgPSAoMCwgdXRpbF8xLmhhbmRsZUhpZ2h0bGlnaHQpKG5ld0NvbnRlbnQsIHByb3BzLmRhdGEua2V5V29yZCwgYW5raUNhcmRzLCB3aW5kb3dFbGVtZW50ID09PSBudWxsIHx8IHdpbmRvd0VsZW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpbmRvd0VsZW1lbnQuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV3Q29udGVudCA9IG5ld0NvbnRlbnQucmVwbGFjZSgvby9nLCAnPHNwYW4gc3R5bGU9XCJjb2xvcjpyZWQ7XCI+bzwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkTGFzdE1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxhc3RNZXNzYWdlKSwgeyBjaGF0SWQ6IG1zZy5jaGF0SWQsIGNvbnRlbnQ6IG5ld0NvbnRlbnQsIGxvYWRpbmc6IGZhbHNlLCBzdGF0dXM6ICdzdWNjZXNzJywgcHJvbXB0OiBwcm9tcHRbMF1bJ2NvbnRlbnQnXSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBuZXdNc2dMaXN0ID0gWy4uLnByZXZNZXNzYWdlcy5zbGljZSgwLCBwcmV2TWVzc2FnZXMubGVuZ3RoIC0gMSksIGxhc3RNZXNzYWdlXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbLi4ucHJldk1lc3NhZ2VzLnNsaWNlKDAsIHByZXZNZXNzYWdlcy5sZW5ndGggLSAxKSwgdXBkYXRlZExhc3RNZXNzYWdlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyDnlKjmiLflj5HpgIHmtojmga9cbiAgICBjb25zdCBoYW5kbGVTZW5kTWVzc2FnZSA9ICh2YWx1ZXMpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codmFsdWVzKTtcbiAgICAgICAgbGV0IHByb21wdCA9IHZhbHVlcy5tc2c7XG4gICAgICAgIC8vIOa4heepuuaWh+acrOahhlxuICAgICAgICBmb3JtLnJlc2V0RmllbGRzKCk7XG4gICAgICAgIC8vIOemgeeUqOWPkemAgeaMiemSrlxuICAgICAgICBzZXRJc0Fuc3dlcklucHV0ZWQoZmFsc2UpO1xuICAgICAgICAvLyDlsIbnlKjmiLflj5HoqIDlj5HpgIHliLDmtojmga/orrDlvZXkuK1cbiAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRMYXN0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgY2hhdElkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgY29udGVudDogdmFsdWVzLm1zZyxcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICBwcm9tcHQ6IHByb21wdCxcbiAgICAgICAgICAgICAgICBzaG93SW1hZ2VzQm94OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpbWFnZXM6IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gY29uc3QgbmV3TXNnTGlzdCA9IFsuLi5wcmV2TWVzc2FnZXMuc2xpY2UoMCwgcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDEpLCBsYXN0TWVzc2FnZV1cbiAgICAgICAgICAgIHJldHVybiBbLi4ucHJldk1lc3NhZ2VzLCB1cGRhdGVkTGFzdE1lc3NhZ2VdO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8g5Zyo5raI5oGv5Y6G5Y+y5Lit5o+S5YWl5pawIEdQVCDmtojmga9cbiAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IFsuLi5wcmV2TWVzc2FnZXMsIHtcbiAgICAgICAgICAgICAgICAnY29udGVudCc6ICcnLFxuICAgICAgICAgICAgICAgICdyb2xlJzogJ2Fzc2lzdGFudCcsXG4gICAgICAgICAgICAgICAgJ2xvYWRpbmcnOiB0cnVlLFxuICAgICAgICAgICAgICAgICdjaGF0SWQnOiAnJywgJ3Byb21wdCc6ICcnLCAnc3RhdHVzJzogJycsXG4gICAgICAgICAgICAgICAgJ3Nob3dJbWFnZXNCb3gnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnaW1hZ2VzJzogW11cbiAgICAgICAgICAgIH1dKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZXMpO1xuICAgICAgICBjb25zdCBtc2dIaXN0b3J5ID0gbWVzc2FnZXMuc2xpY2UoLTUpLm1hcCgoaXRlbSkgPT4geyByZXR1cm4geyAncm9sZSc6IGl0ZW0ucm9sZSwgJ2NvbnRlbnQnOiBpdGVtLmNvbnRlbnQgfTsgfSk7XG4gICAgICAgIGdldEdQVE1zZyhbLi4ubXNnSGlzdG9yeSwgeyBcInJvbGVcIjogXCJ1c2VyXCIsIFwiY29udGVudFwiOiB2YWx1ZXMubXNnIH1dKTtcbiAgICAgICAgLy8gYW1wbGl0dWRlLnRyYWNrKCdoYW5kbGVTZW5kTWVzc2FnZScpO1xuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ2hhbmRsZVNlbmRNZXNzYWdlJyB9KTtcbiAgICB9O1xuICAgIC8vIOaWh+acrOahhuS4i+aVsuWHu+aMiemUruaXtlxuICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgLy8g6Zi75q2i5LqL5Lu25YaS5rOhXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVLZXlEb3duJyk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgJiYgIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAvLyDmlbLlh7vlm57ovabplK5cbiAgICAgICAgICAgIGlmICghaXNMb2FkaW5nICYmIGlzQW5zd2VySW5wdXRlZCkge1xuICAgICAgICAgICAgICAgIC8vIOmdnuWKoOi9veeKtuaAgeOAgUdQVCDmtojmga/lj5HpgIHlrozmr5Xml7bnlKjmiLflj6/lj5HpgIHmtojmga9cbiAgICAgICAgICAgICAgICBoYW5kbGVTZW5kTWVzc2FnZSh7ICdtc2cnOiBldmVudC50YXJnZXQudmFsdWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNb3VzZURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1BvcHVwQ2FyZDpoYW5kbGVNb3VzZURvd24nKTtcbiAgICAgICAgc2V0RHJhZ2dpbmcodHJ1ZSk7XG4gICAgICAgIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRYID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFkgPSBldmVudC5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRYID0gU3RyaW5nKG9mZnNldFgpO1xuICAgICAgICAgICAgd2luZG93RWxlbWVudC5jdXJyZW50LmRhdGFzZXQub2Zmc2V0WSA9IFN0cmluZyhvZmZzZXRZKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXRPZmZzZXQoeyB4OiBldmVudC5jbGllbnRYIC0gcG9zaXRpb24ueCwgeTogZXZlbnQuY2xpZW50WSAtIHBvc2l0aW9uLnkgfSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNb3VzZU1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgLy8gLy8gY29uc29sZS5sb2coJ1BvcHVwQ2FyZDpoYW5kbGVNb3VzZU1vdmUnKTtcbiAgICAgICAgLy8gLy8gY29uc29sZS5sb2coZHJhZ2dpbmcpO1xuICAgICAgICBpZiAoZHJhZ2dpbmcgJiYgd2luZG93RWxlbWVudC5jdXJyZW50KSB7XG4gICAgICAgICAgICAvLyBVc2UgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHRvIHRocm90dGxlIHRoZSBtb3VzZW1vdmUgZXZlbnQgaGFuZGxpbmdcbiAgICAgICAgICAgIC8vIOm8oOagh+ebuOWvueeql+WPo+W3puS4iuinkueahOWBj+enu1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WCA9IHBhcnNlRmxvYXQod2luZG93RWxlbWVudC5jdXJyZW50LmRhdGFzZXQub2Zmc2V0WCB8fCAnJyk7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRZID0gcGFyc2VGbG9hdCh3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRZIHx8ICcnKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ggPSBldmVudC5jbGllbnRYIC0gb2Zmc2V0WDtcbiAgICAgICAgICAgIGNvbnN0IG5ld1kgPSBldmVudC5jbGllbnRZIC0gb2Zmc2V0WTtcbiAgICAgICAgICAgIC8vIENoZWNrIHRoZSBib3VuZGFyaWVzXG4gICAgICAgICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudFdpZHRoID0gd2luZG93RWxlbWVudC5jdXJyZW50LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudEhlaWdodCA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBtaW5YID0gLWVsZW1lbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICBjb25zdCBtaW5ZID0gMDtcbiAgICAgICAgICAgIGNvbnN0IG1heFggPSB3aW5kb3dXaWR0aCAtIGVsZW1lbnRXaWR0aCArIGVsZW1lbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICBjb25zdCBtYXhZID0gd2luZG93SGVpZ2h0IC0gZWxlbWVudEhlaWdodCArIGVsZW1lbnRIZWlnaHQgLyAxLjU7XG4gICAgICAgICAgICBjb25zdCBjbGFtcGVkWCA9IE1hdGgubWF4KG1pblgsIE1hdGgubWluKG5ld1gsIG1heFgpKTtcbiAgICAgICAgICAgIGNvbnN0IGNsYW1wZWRZID0gTWF0aC5tYXgobWluWSwgTWF0aC5taW4obmV3WSwgbWF4WSkpO1xuICAgICAgICAgICAgLy8gT25seSB1cGRhdGUgdGhlIHBvc2l0aW9uIGlmIGl0J3Mgd2l0aGluIHRoZSBib3VuZGFyaWVzXG4gICAgICAgICAgICAvLyBuZXdYID49IG1pblggJiYgbmV3WCA8PSBtYXhYICYmIG5ld1kgPj0gbWluWSAmJiBuZXdZIDw9IG1heFlcbiAgICAgICAgICAgIGlmICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgLy8gc2V0UG9zaXRpb24oeyB4OiBjbGFtcGVkWCwgeTogY2xhbXBlZFkgfSk7XG4gICAgICAgICAgICAgICAgd2luZG93RWxlbWVudC5jdXJyZW50LnN0eWxlLmxlZnQgPSBgJHtjbGFtcGVkWH1weGA7XG4gICAgICAgICAgICAgICAgd2luZG93RWxlbWVudC5jdXJyZW50LnN0eWxlLnRvcCA9IGAke2NsYW1wZWRZfXB4YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOWFg+e0oOWIsOi+vui+ueeVjFxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHJlY3QgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgLy8gY29uc3Qgb2Zmc2V0WCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICAgICAgICAgICAgLy8gY29uc3Qgb2Zmc2V0WSA9IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgICAgICAgICAgICAvLyB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRYID0gU3RyaW5nKG9mZnNldFgpO1xuICAgICAgICAgICAgICAgIC8vIHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFkgPSBTdHJpbmcob2Zmc2V0WSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU1vdXNlVXAgPSAoKSA9PiB7XG4gICAgICAgIC8vIC8vIGNvbnNvbGUubG9nKCdQb3B1cENhcmQ6aGFuZGxlTW91c2VVcCcpO1xuICAgICAgICBzZXREcmFnZ2luZyhmYWxzZSk7XG4gICAgfTtcbiAgICAvLyDmlofmnKzmoYblgLzlj5jljJbml7ZcbiAgICBjb25zdCBvblRleHRBcmVhSW5wdXQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzZXRJc0Fuc3dlcklucHV0ZWQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXRJc0Fuc3dlcklucHV0ZWQoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyDmt7vliqDliLAgQW5raVxuICAgIGNvbnN0IGFkZFRvQW5raSA9IChkZWNrTmFtZSwgbW9kZWxOYW1lLCBmcm9udCwgYmFjaykgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lO1xuICAgICAgICBjb25zdCBrZXlXb3JkID0gcHJvcHMuZGF0YS5rZXlXb3JkO1xuICAgICAgICBjb25zdCBTZW50ZW5jZSA9IHByb3BzLmRhdGEuU2VudGVuY2U7XG4gICAgICAgIGxldCBjb250YWluZXIgPSAnJztcbiAgICAgICAgbGV0IGltYWdlcyA9ICcnO1xuICAgICAgICBsZXQgdW5zcGxhc2hfZG93bmxvYWRfbG9jYXRpb247XG4gICAgICAgIGxldCBzdGMgPSBrZXlXb3JkLmxlbmd0aCA8PSAyMCA/IFNlbnRlbmNlIDogJyc7XG4gICAgICAgIC8vIOWcqOivreWig+WPpeWtkOS4reWwhuWFs+mUruWtl+eqgeWHuuaYvuekulxuICAgICAgICBzdGMgPSBzdGMucmVwbGFjZShuZXcgUmVnRXhwKGtleVdvcmQsICdnJyksICc8c3BhbiBjbGFzcz1cImtleVdvcmRcIj4nICsga2V5V29yZCArICc8L3NwYW4+Jyk7XG4gICAgICAgIGxldCBTY291dGVyU2VsZWN0aW9uID0gJyc7XG4gICAgICAgIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vIOmAieS4reeahOaWh+Wtl1xuICAgICAgICAgICAgU2NvdXRlclNlbGVjdGlvbiA9IChfYiA9IChfYSA9IHdpbmRvd0VsZW1lbnQuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnF1ZXJ5U2VsZWN0b3IoJyNTY291dGVyU2VsZWN0aW9uJykpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpWzBdLmlubmVySFRNTDtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdpbmRvd0VsZW1lbnQuY3VycmVudCk7XG4gICAgICAgICAgICBjb250YWluZXIgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgY29udGFpbmVyID0gd2luZG93RWxlbWVudC5jdXJyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lc3NhZ2VzJylbMF0uaW5uZXJIVE1MO1xuICAgICAgICAgICAgLy8g5aSE55CGIGNvbnRhaW5lciDnmoTlhoXlrrlcbiAgICAgICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhjb250YWluZXIsICd0ZXh0L2h0bWwnKTtcbiAgICAgICAgICAgIGxldCBlbGVtZW50c1RvUmVtb3ZlID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbWFnZVF1ZXVlJyk7XG4gICAgICAgICAgICBsZXQgaW1hZ2VTb3VyY2UgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnLmltYWdlU291cmNlJyk7XG4gICAgICAgICAgICAvLyDliJvlu7rmlrDnmoQgaW1nIOagh+etvlxuICAgICAgICAgICAgLy8g6K6+572u5Zu+54mH55qE5bC65a+444CB5qC35byPXG4gICAgICAgICAgICBpZiAoZG9jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlQm94JykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBpbWcgPSBkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VCb3gnKVswXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF07XG4gICAgICAgICAgICAgICAgaW1nLndpZHRoID0gMDtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWdVcmwgPSBpbWcuc3JjO1xuICAgICAgICAgICAgICAgIGxldCBuZXdJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgICAgIG5ld0ltZy5zcmMgPSBpbWdVcmw7XG4gICAgICAgICAgICAgICAgLy8g6I635Y+W6KaB5pu/5o2i55qEIGRpdlxuICAgICAgICAgICAgICAgIGxldCBkaXYgPSBkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VCb3gnKVswXTtcbiAgICAgICAgICAgICAgICBpZiAoZGl2KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOS9v+eUqOaWsOeahCBpbWcg5qCH562+5pu/5o2iIGRpdlxuICAgICAgICAgICAgICAgICAgICAoX2MgPSBkaXYucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnJlcGxhY2VDaGlsZChuZXdJbWcsIGRpdik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5rKh5pyJ5Zu+54mHXG4gICAgICAgICAgICAgICAgY29uc3QgaW1ncyA9IGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXMnKVswXTtcbiAgICAgICAgICAgICAgICBpZiAoaW1ncykge1xuICAgICAgICAgICAgICAgICAgICAoX2QgPSBpbWdzLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5yZW1vdmVDaGlsZChpbWdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDliKDpmaTpooTliqDovb3nmoTlm77niYdcbiAgICAgICAgICAgIGVsZW1lbnRzVG9SZW1vdmUuZm9yRWFjaChlbCA9PiB7IHZhciBfYTsgcmV0dXJuIChfYSA9IGVsLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVDaGlsZChlbCk7IH0pO1xuICAgICAgICAgICAgLy8g5Yig6Zmk5Zu+54mH5p2l5rqQ5L+h5oGvXG4gICAgICAgICAgICBpbWFnZVNvdXJjZS5mb3JFYWNoKGVsID0+IHsgdmFyIF9hOyByZXR1cm4gKF9hID0gZWwucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZUNoaWxkKGVsKTsgfSk7XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2MuYm9keS5pbm5lckhUTUw7XG4gICAgICAgICAgICAvLyDlpITnkIbmoLflvI/vvIzpgb/lhY0gQW5raSDlhoXmmL7npLrlvILluLhcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lci5yZXBsYWNlKC9zdHlsZT0vZywgJycpO1xuICAgICAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZUJveCcpWzBdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbWFnZXMgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VCb3gnKVswXS5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgLy8g6I635Y+WIHVuc3BsYXNoQXBpIOeahCBkb3dubG9hZF9sb2NhdGlvblxuICAgICAgICAgICAgICAgIHVuc3BsYXNoX2Rvd25sb2FkX2xvY2F0aW9uID0gKF9lID0gd2luZG93RWxlbWVudC5jdXJyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlcycpWzBdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXS5wYXJlbnRFbGVtZW50KSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuZ2V0QXR0cmlidXRlKCdkYXRhLWRvd25sb2FkbG9jYXRpb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGltYWdlcyk7XG4gICAgICAgICAgICAvLyDlpITnkIbmoLflvI/vvIzpgb/lhY0gQW5raSDlhoXmmL7npLrlvILluLhcbiAgICAgICAgICAgIGltYWdlcyA9IGltYWdlcy5yZXBsYWNlKC9zdHlsZT0vZ2ksICcnKTtcbiAgICAgICAgICAgIGltYWdlcyA9IGltYWdlcy5yZXBsYWNlKC93aWR0aC9naSwgJycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNhcmRTdHlsZSA9IGBgO1xuICAgICAgICBjb25zdCB0aGlzTGFuZyA9IGxhbmdfMS5sYW5nO1xuICAgICAgICBsZXQgYXVkaW9VcmwgPSAnaHR0cDovL2RpY3QueW91ZGFvLmNvbS9kaWN0dm9pY2U/dHlwZT0wJmF1ZGlvPSc7XG4gICAgICAgIGxldCBhdWRpbywgZmlsZW5hbWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhdWRpb1VybCA9IHRoaXNMYW5nW0xhbmdbJ3RhcmdldCddWydpZCddXVsnYXVkaW9VUkwnXTtcbiAgICAgICAgICAgIGZpbGVuYW1lID0ga2V5V29yZC5sZW5ndGggPj0gMTAgPyBrZXlXb3JkLnN1YnN0cmluZygwLCAxMCkgOiBrZXlXb3JkO1xuICAgICAgICAgICAgYXVkaW8gPSBbe1xuICAgICAgICAgICAgICAgICAgICBcInVybFwiOiBhdWRpb1VybCArIGtleVdvcmQsXG4gICAgICAgICAgICAgICAgICAgIFwiZmlsZW5hbWVcIjogXCJTY291dGVyX1wiICsgZmlsZW5hbWUgKyBcIi5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmaWVsZHNcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJGcm9udFwiXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGF1ZGlvID0gW107XG4gICAgICAgIH1cbiAgICAgICAgLy8g5bi46KeE57G75Z6LXG4gICAgICAgIGxldCBhbmtpQmFjayA9ICc8cD4gPGJsb2NrcXVvdGU+JyArIHN0YyArICcg4oCU4oCUIDxhIGhyZWY9XCInICsgd2luZG93LmxvY2F0aW9uLmhyZWYgKyAnXCI+U291cmNlPC9hPjwvYmxvY2txdW90ZT48L3A+JyArIGNvbnRhaW5lcjtcbiAgICAgICAgaWYgKGtleVdvcmQubGVuZ3RoID4gMjApIHtcbiAgICAgICAgICAgIC8vIOWmguaenOmAieS4reeahOespuWPt+mVv+W6puWkp+S6jiAyMO+8iOivtOaYjuaYr+WPpeWtkO+8ieWImeS4jeaYvuekuuS4iuS4i+aWh+WPpeWtkO+8jOeEtuWQjuWwhuadpea6kOmTvuaOpeaUvuWIsOWwvumDqFxuICAgICAgICAgICAgYW5raUJhY2sgPSBjb250YWluZXIgKyAnPHA+PGEgaHJlZj1cIicgKyB3aW5kb3cubG9jYXRpb24uaHJlZiArICdcIj5Tb3VyY2U8L2E+PC9wPic7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHAgPSB7XG4gICAgICAgICAgICBcIm5vdGVcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVja05hbWVcIjogZGVja05hbWUsXG4gICAgICAgICAgICAgICAgXCJtb2RlbE5hbWVcIjogbW9kZWxOYW1lLFxuICAgICAgICAgICAgICAgIFwiZmllbGRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgW2Zyb250XToga2V5V29yZCxcbiAgICAgICAgICAgICAgICAgICAgW2JhY2tdOiBjYXJkU3R5bGUgKyBhbmtpQmFja1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJhdWRpb1wiOiBhdWRpbyxcbiAgICAgICAgICAgICAgICBcInRhZ3NcIjogW1xuICAgICAgICAgICAgICAgICAgICBcIlNjb3V0ZXJcIlxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8g5a6M5b2i5aGr56m657G75Z6LXG4gICAgICAgIGlmIChTY291dGVyU2VsZWN0aW9uLmluZGV4T2YoJ2NsYXNzPVwiYW5raVNwYWNlXCInKSA+PSAwIHx8IGNvbnRhaW5lci5pbmRleE9mKCdjbGFzcz1cImFua2lTcGFjZVwiJykgPj0gMCB8fCBjb250YWluZXIuaW5kZXhPZigne3tjJykgPj0gMCkge1xuICAgICAgICAgICAgbGV0IG5ld0Zyb250O1xuICAgICAgICAgICAgbmV3RnJvbnQgPSAnPHA+JyArIFNjb3V0ZXJTZWxlY3Rpb24gKyAnPC9wPicgKyAnPGJsb2NrcXVvdGU+JyArIHN0YyArICcg4oCU4oCUIDxhIGhyZWY9XCInICsgd2luZG93LmxvY2F0aW9uLmhyZWYgKyAnXCI+U291cmNlPC9hPjwvYmxvY2txdW90ZT4nICsgY29udGFpbmVyO1xuICAgICAgICAgICAgaWYgKGtleVdvcmQubGVuZ3RoID4gMjApIHtcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzpgInkuK3nmoTnrKblj7fplb/luqblpKfkuo4gMjDvvIjor7TmmI7mmK/lj6XlrZDvvInliJnkuI3mmL7npLrkuIrkuIvmloflj6XlrZDvvIznhLblkI7lsIbmnaXmupDpk77mjqXmlL7liLDlsL7pg6hcbiAgICAgICAgICAgICAgICBuZXdGcm9udCA9ICc8cD4nICsgU2NvdXRlclNlbGVjdGlvbiArICc8L3A+JyArIGNvbnRhaW5lciArICc8cD4gPGEgaHJlZj1cIicgKyB3aW5kb3cubG9jYXRpb24uaHJlZiArICdcIj5Tb3VyY2U8L2E+PC9wPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwID0ge1xuICAgICAgICAgICAgICAgIFwibm90ZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZGVja05hbWVcIjogZGVja05hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwibW9kZWxOYW1lXCI6IG1vZGVsTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJmaWVsZHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgW2Zyb250XTogbmV3RnJvbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBbYmFja106ICcnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiYXVkaW9cIjogW10sXG4gICAgICAgICAgICAgICAgICAgIFwidGFnc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlNjb3V0ZXJcIlxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyDlj5HpgIHmtojmga/nu5kgYmFja2dyb3VuZFxuICAgICAgICBsZXQgc2VuZGluZyA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FkZE5vdGUnLCAnbWVzc2FnZXMnOiB7ICdhbmtpX2FyZ3VtZW50cyc6IHAsICdhbmtpX2FjdGlvbl90eXBlJzogJ2FkZE5vdGUnLCAndW5zcGxhc2hfZG93bmxvYWRfbG9jYXRpb24nOiB1bnNwbGFzaF9kb3dubG9hZF9sb2NhdGlvbiB9LCB9KTtcbiAgICAgICAgc2VuZGluZy50aGVuKGhhbmRsZVJlc3BvbnNlLCBoYW5kbGVFcnJvcik7XG4gICAgICAgIC8vIOaVsOaNruWfi+eCuVxuICAgICAgICAvLyBhbXBsaXR1ZGUudHJhY2soJ2FkZFRvQW5raScpO1xuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ2FkZFRvQW5raScgfSk7XG4gICAgfTtcbiAgICAvLyDngrnlh7vkv53lrZjliLAgQW5raVxuICAgIGNvbnN0IGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljayA9ICgpID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIC8vIOagueaNruaYr+WQpuS4uuWujOW9ouWhq+epuueUs+ivt+S4jeWQjOeahOWNoeeJh+aooeadv1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSAoX2EgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZXNzYWdlcycpWzBdLmlubmVySFRNTDtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uVGV4dCA9IChfYyA9IChfYiA9IHdpbmRvd0VsZW1lbnQuY3VycmVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnF1ZXJ5U2VsZWN0b3IoJyNTY291dGVyU2VsZWN0aW9uJykpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpWzBdLmlubmVySFRNTDtcbiAgICAgICAgbGV0IGlzQW5raVNwYWNlID0gZmFsc2U7XG4gICAgICAgIGlmIChjb250YWluZXIgfHwgc2VsZWN0aW9uVGV4dCkge1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5pbmRleE9mKCdjbGFzcz1cImFua2lTcGFjZVwiJykgPj0gMCB8fCBjb250YWluZXIuaW5kZXhPZigne3tjJykgPj0gMCB8fCBzZWxlY3Rpb25UZXh0LmluZGV4T2YoJ2NsYXNzPVwiYW5raVNwYWNlJykgPj0gMCkge1xuICAgICAgICAgICAgICAgIGlzQW5raVNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ2xvYWRpbmcnLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgLy8g5YWI6aKE5aSE55CGIEFua2kg55qEIG1vZGVsXG4gICAgICAgIC8vIGxldCBzZW5kaW5nID0gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnc2V0TW9kZWwnLCAnbWVzc2FnZXMnOiB7ICdpc0Fua2lTcGFjZSc6IGlzQW5raVNwYWNlIH0sIH0pXG4gICAgICAgIC8vIHNlbmRpbmcudGhlbigobWVzc2FnZTogYW55KSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIHNldEFua2lJbmZvKG1vZGVscykge1xuICAgICAgICAgICAgbGV0IGRlZmF1bHREZWNrTmFtZSA9ICcnLCBtb2RlbE5hbWUgPSAnJywgZmllbGQxID0gJycsIGZpZWxkMiA9ICcnO1xuICAgICAgICAgICAgbW9kZWxzLmZvckVhY2goKG1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsLmlzQW5raVNwYWNlID09PSBpc0Fua2lTcGFjZSkge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0RGVja05hbWUgPSBtb2RlbC5kZWZhdWx0RGVja05hbWU7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsTmFtZSA9IG1vZGVsLm1vZGVsTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQxID0gbW9kZWwuZmllbGQxO1xuICAgICAgICAgICAgICAgICAgICBmaWVsZDIgPSBtb2RlbC5maWVsZDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICdkZWZhdWx0RGVja05hbWUnOiBkZWZhdWx0RGVja05hbWUsXG4gICAgICAgICAgICAgICAgJ21vZGVsTmFtZSc6IG1vZGVsTmFtZSxcbiAgICAgICAgICAgICAgICAnZmllbGQxJzogZmllbGQxLFxuICAgICAgICAgICAgICAgICdmaWVsZDInOiBmaWVsZDJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby5hbmtpKSB7XG4gICAgICAgICAgICBjb25zdCBhbmtpSW5mbyA9IHNldEFua2lJbmZvKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby5hbmtpKTtcbiAgICAgICAgICAgIC8vIOa3u+WKoOWIsCBBbmtpIOS4rVxuICAgICAgICAgICAgYWRkVG9BbmtpKGFua2lJbmZvLmRlZmF1bHREZWNrTmFtZSwgYW5raUluZm8ubW9kZWxOYW1lLCBhbmtpSW5mby5maWVsZDEsIGFua2lJbmZvLmZpZWxkMik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyDojrflj5YgQW5raSDniYznu4Tkv6Hmga9cbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ3NldE1vZGVsJywgJ21lc3NhZ2VzJzoge30sIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5raUluZm8gPSBzZXRBbmtpSW5mbyhyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIOa3u+WKoOWIsCBBbmtpIOS4rVxuICAgICAgICAgICAgICAgICAgICBhZGRUb0Fua2koYW5raUluZm8uZGVmYXVsdERlY2tOYW1lLCBhbmtpSW5mby5tb2RlbE5hbWUsIGFua2lJbmZvLmZpZWxkMSwgYW5raUluZm8uZmllbGQyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWPjemmiOmUmeivr+S/oeaBr1xuICAgICAgICAgICAgICAgICAgICBhbGVydChyZXN1bHQuZXJyb3IuZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIH0sICgpID0+IHtcbiAgICAgICAgLy8gICAvL2Vycm9yXG4gICAgICAgIC8vIH0pO1xuICAgIH07XG4gICAgLy8g5o6l5pS2IGJhY2tncm91bmQg55qE5Zue5aSNXG4gICAgZnVuY3Rpb24gaGFuZGxlUmVzcG9uc2UobWVzc2FnZSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UuZXJyb3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnc3VjY2VzcycsICdub3RlSWQnOiBtZXNzYWdlLmRhdGEgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhbGVydChtZXNzYWdlLmVycm9yKTtcbiAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaGFuZGxlRXJyb3IoZXJybykge1xuICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnJvKTtcbiAgICB9XG4gICAgLy8gR1BUIOeUn+aIkOa2iOaBr+aXtu+8jOiHquWKqOWumuS9jeWIsOa2iOaBr+WIl+ihqOW6lemDqO+8jOaWueS+v+eUqOaIt+mYheivu1xuICAgIGZ1bmN0aW9uIHNjcm9sbFRvQm90dG9tKGNhblNyb2xsID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQuY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2luZG93RWxlbWVudC5jdXJyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250YWluZXInKVswXTtcbiAgICAgICAgICAgIGlmIChjYW5Tcm9sbCkge1xuICAgICAgICAgICAgICAgIC8vIOS9jeS6juW6lemDqO+8jOmcgOimgeiHquWKqOa7muWKqFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSBjb250YWluZXIuc2Nyb2xsSGVpZ2h0ICsgMjA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgb3BlbkN1c3RvbVByb21wdEZvcm0gPSAoZGF0YSkgPT4ge1xuICAgICAgICAvLyDlvIDlkK/miJblhbPpl63oh6rlrprkuYkgUHJvbXB0IOihqOWNlVxuICAgICAgICBzZXRQb3BvdmVyT3BlbihkYXRhLmlzT3Blbik7XG4gICAgICAgIC8vIOiuvue9ruihqOWNleeahOm7mOiupOiuvue9rlxuICAgICAgICBpZiAoZGF0YS5pc09wZW4pIHtcbiAgICAgICAgICAgIHNldEN1c3RvbVByb21wdEZvcm1EYXRhKGRhdGEuZGF0YSk7XG4gICAgICAgICAgICAvLyDlvIDlkK/ooajljZVcbiAgICAgICAgICAgIC8vIGFtcGxpdHVkZS50cmFjaygnb3BlbkN1c3RvbVByb21wdEZvcm0nKTtcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAnb3BlbkN1c3RvbVByb21wdEZvcm0nIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIOW8gOWQr+ihqOWNleWQjuemgeatoueCueWHu+eql+WPo+WkluWMuuWfn+WFs+mXreeql+WPo1xuICAgICAgICAoMCwgY29udGVudFNjcmlwdF8xLnNldERvbm90Q2xvc2VQb3B1cENhcmQpKGRhdGEuaXNPcGVuKTtcbiAgICB9O1xuICAgIGNvbnN0IEFuaW1hdGVkQnV0dG9uID0gKDAsIHJlYWN0X3NwcmluZ18xLmFuaW1hdGVkKShhbnRkXzEuQnV0dG9uKTtcbiAgICBjb25zdCBhbmltYXRpb25TdHlsZSA9ICgwLCByZWFjdF9zcHJpbmdfMS51c2VTcHJpbmcpKHtcbiAgICAgICAgZnJvbTogeyB0cmFuc2Zvcm06ICdyb3RhdGUoMGRlZyknIH0sXG4gICAgICAgIHRvOiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgzNjBkZWcpJyB9LFxuICAgICAgICBjb25maWc6IHsgZHVyYXRpb246IDEwMDAgfSxcbiAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgd2lkdGg6ICczMnB4JyxcbiAgICAgICAgaGVpZ2h0OiAnMzJweCcsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCByZWQnXG4gICAgfSk7XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFNjb3V0ZXJEaXYsIHsgaWQ6IFwiTGVhcm5pbmdFbmdsaXNoMjAyM1wiLCByZWY6IHdpbmRvd0VsZW1lbnQsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgbGVmdDogMTAsXG4gICAgICAgICAgICAgICAgdG9wOiAxMCxcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Db25maWdQcm92aWRlciwgeyB0aGVtZToge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JQcmltYXJ5OiAnI0YwOEEyNCcsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE5hdl8xLk5hdiwgeyBoYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2s6IGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljaywgYWRkVG9BbmtpU3RhdHVzOiBhZGRUb0Fua2lTdGF0dXMsIG9uTW91c2VEb3duOiBoYW5kbGVNb3VzZURvd24sIGhhbmRsZU1lbnVJdGVtQ2xpY2s6IGV4ZWN1dGl2ZVByb21wdCwgb3BlbkN1c3RvbVByb21wdEZvcm06IG9wZW5DdXN0b21Qcm9tcHRGb3JtLCBpc09wZW5NZW51OiBpc09wZW5NZW51LCBwcm9tcHRzOiBwcm9tcHRzLCBsYXN0RXhlY3V0ZWRQcm9tcHQ6IGxhc3RFeGVjdXRlZFByb21wdCwga2V5V29yZDogcHJvcHMuZGF0YS5rZXlXb3JkIH0pLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnY29udGFpbmVyIGZsZXgtZ3JvdyBmbGV4IGZsZXgtY29sIG92ZXJmbG93LWF1dG8nLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiAnNDhweCdcbiAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2ZsZXgtZ3JvdycsIHJlZjogbWVzc2FnZXNMaXN0LCBzdHlsZToge30gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFNlbGVjdGlvbl8xLlNlbGVjdGlvbiwgeyB0ZXh0OiBwcm9wcy5kYXRhLmtleVdvcmQgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChNZXNzYWdlXzEuTWVzc2FnZXNMaXN0LCB7IG1lc3NhZ2VzOiBtZXNzYWdlcyB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnZm9sbG93VXBNZW51Qm94Jywgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogc2hvd0ZvbGxvd1VwRGF0YU1lbnUuc2hvdyA/ICdibG9jaycgOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnZml0LWNvbnRlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChQcm9tcHRMaXN0XzEuUHJvbXB0TGlzdCwgeyBmb2xsb3dVcERhdGE6IGZvbGxvd1VwRGF0YSwgc2hvd0ZvbGxvd1VwRGF0YU1lbnU6IHNob3dGb2xsb3dVcERhdGFNZW51LCBwcm9tcHRMaXN0OiBwcm9tcHRzLCBoYW5kbGVNZW51SXRlbUNsaWNrOiBleGVjdXRpdmVQcm9tcHQgfSkpKSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICd3LWZ1bGwnLCByZWY6IGlucHV0UmVmLCBzdHlsZTogeyBib3JkZXJUb3A6ICcxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMDYpJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLCB7IGZvcm06IGZvcm0sIG9uRmluaXNoOiBoYW5kbGVTZW5kTWVzc2FnZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbktleURvd249e2hhbmRsZUZvcm1LZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0OiAnaW5saW5lJywgc3R5bGU6IHsgYWxpZ25JdGVtczogJ2NlbnRlcicgfSwgY2xhc3NOYW1lOiAncC0yJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBuYW1lOiBcIm1zZ1wiLCBzdHlsZTogeyBtYXJnaW46ICcwJywgZmxleEdyb3c6ICcxJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHsgcGxhY2Vob2xkZXI6IFwiU2VuZCBhIG1lc3NhZ2VcIiwgYm9yZGVyZWQ6IGZhbHNlLCBhdXRvU2l6ZTogeyBtaW5Sb3dzOiAxLCBtYXhSb3dzOiAyIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldENvbG9yOiAnI0YwOEEyNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9uS2V5RG93bjogaGFuZGxlS2V5RG93biwgb25JbnB1dDogb25UZXh0QXJlYUlucHV0IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgc3R5bGU6IHsgbWFyZ2luUmlnaHQ6ICcwJyB9IH0sIGlzQW5zd2VyRG9uZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyB0eXBlOiBcInRleHRcIiwgaHRtbFR5cGU6IFwic3VibWl0XCIsIGRpc2FibGVkOiBpc0xvYWRpbmcgfHwgIWlzQW5zd2VySW5wdXRlZCwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICFpc0xvYWRpbmcgJiYgaXNBbnN3ZXJJbnB1dGVkID8gJyNGMDhBMjQnIDogJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5TZW5kT3V0bGluZWQsIG51bGwpIH0pIDogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyBtYXJnaW5SaWdodDogJzhweCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X3NwcmluZ18xLmFuaW1hdGVkLmRpdiwgeyBzdHlsZTogYW5pbWF0aW9uU3R5bGUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5Mb2FkaW5nT3V0bGluZWQsIG51bGwpKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBzdHlsZTogeyBtYXJnaW46ICcwJyB9IH0pKSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkRyYXdlciwgeyB0aXRsZTogY3VzdG9tUHJvbXB0Rm9ybURhdGEuaWQgPT09ICcnID8gXCJDcmVhdGUgUHJvbXB0XCIgOiBcIkVkaXQgUHJvbXB0XCIsIHBsYWNlbWVudDogXCJib3R0b21cIiwgY2xvc2FibGU6IGZhbHNlLCBoZWlnaHQ6ICcxMDAlJywgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogaXNQb3BvdmVyT3BlbiwgZ2V0Q29udGFpbmVyOiBmYWxzZSwgZXh0cmE6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5TcGFjZSwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7IHpJbmRleDogJzknIH0sIG9uQ2xpY2s6ICgpID0+IG9wZW5DdXN0b21Qcm9tcHRGb3JtKHsgaXNPcGVuOiBmYWxzZSwgZGF0YTogeyAndGl0bGUnOiAnJywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZmFsc2UsICd1c2VyUHJvbXB0JzogJycsICdpZCc6ICcnIH0gfSkgfSwgXCJDYW5jZWxcIikpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJhY2tncm91bmRDb2xvcjogJ3JlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICc2NHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAnYWxsLXNjcm9sbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBvbk1vdXNlRG93bjogaGFuZGxlTW91c2VEb3duIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoQ3VzdG9tUHJvbXB0Rm9ybV8xLkN1c3RvbVByb21wdEZvcm0sIHsgb3BlbkN1c3RvbVByb21wdEZvcm06IG9wZW5DdXN0b21Qcm9tcHRGb3JtLCBoYW5kbGVQcm9tcHRFZGl0ZWQ6IGhhbmRsZVByb21wdEVkaXRlZCwgZGF0YTogY3VzdG9tUHJvbXB0Rm9ybURhdGEgfSkpKSkpKSk7XG59XG5leHBvcnRzLlBvcHVwQ2FyZCA9IFBvcHVwQ2FyZDtcbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5wb3B1cENhcmRTdHlsZSA9IHZvaWQgMDtcbmV4cG9ydHMucG9wdXBDYXJkU3R5bGUgPSBgXG4uc2xpY2stYXJyb3c6OmJlZm9yZXtcbiAgY29udGVudDpcIlwiICFpbXBvcnRhbnQ7XG59XG5cbi5hbmtpU3BhY2Uge1xuICBjb2xvcjojRjA4QTI0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hbmtpU3BhY2U6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiNGMDhBMjQ7XG4gIGNvbG9yOiNmZmZmZmY7XG59XG5cbi5jb250ZXh0Qm94LC5mb2xsb3dVcE1lbnUge1xuICBkaXNwbGF5OiBmbGV4O1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gIHBhZGRpbmc6IDRweCA4cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBib3gtc2hhZG93OiAwcHggOHB4IDI4cHggcmdiYSgwLDAsMCwuMTYpO1xuICB6LWluZGV4Ojk7XG5cbn1cblxuLmNvbnRleHRCb3gge1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4vLyAuY29udGV4dEJveCAqIHtcbi8vICAgY3Vyc29yOiBkZWZhdWx0O1xuLy8gICBwYWRkaW5nOiAycHg7XG4vLyB9XG5cbi8vIC5hbmtpU3BhY2VCdXR0b25Cb3gge1xuLy8gICBkaXNwbGF5OiBmbGV4O1xuLy8gICBmbGV4LWRpcmVjdGlvbjogcm93O1xuLy8gICBtYXJnaW4tcmlnaHQ6IDhweDtcbi8vICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMTIpO1xuLy8gICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xuLy8gfVxuXG4vLyAuc2V0QW5raVNwYWNlQnV0dG9uOmZpcnN0LW9mLXR5cGUge1xuLy8gICBtYXJnaW4tcmlnaHQ6OHB4O1xuLy8gfVxuXG4vLyAubG9va1VwQnV0dG9uIHtcbi8vICAgd2lkdGg6IDE4cHg7XG4vLyAgIGhlaWdodDogMThweDtcbi8vICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuLy8gICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuLy8gICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4vLyB9XG5cbi8vIC5hbmtpU3BhY2VCdXR0b25Cb3ggKjpob3ZlciB7XG4gIFxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCw1OSwwLjA1MSk7XG4vLyAgIGJvcmRlci1yYWRpdXM6IDJweDtcblxuLy8gfVxuXG4uYW50LWNhcm91c2VsIC5zbGljay1wcmV2LFxuLmFudC1jYXJvdXNlbCAuc2xpY2stbmV4dCxcbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLXByZXY6aG92ZXIsXG4uYW50LWNhcm91c2VsIC5zbGljay1uZXh0OmhvdmVyIHtcbiAgZm9udC1zaXplOiBpbmhlcml0O1xuICBjb2xvcjogY3VycmVudENvbG9yO1xufVxuXG4uYW50LWNhcm91c2VsIC5zbGljay1wcmV2LFxuLmFudC1jYXJvdXNlbCAuc2xpY2stcHJldjpob3ZlciB7XG4gIGxlZnQ6IDEwcHg7XG4gIHotaW5kZXg6IDI7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmFudC1jYXJvdXNlbCAuc2xpY2stbmV4dCxcbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLW5leHQ6aG92ZXIge1xuICByaWdodDogMTBweDtcbiAgei1pbmRleDogMjtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uaW1hZ2VzIGltZyB7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG59XG5cblxuLy8gI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDEsI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDIsI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDN7XG4vLyAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuLy8gfVxuXG4vLyAjTGVhcm5pbmdFbmdsaXNoMjAyMyBoMXtcbi8vICAgZm9udC1zaXplOjIwcHg7XG4vLyB9XG4vLyAjTGVhcm5pbmdFbmdsaXNoMjAyMyBoMntcbi8vICAgZm9udC1zaXplOjE3cHg7XG4vLyB9XG5cbi8vICNMZWFybmluZ0VuZ2xpc2gyMDIzIHtcbi8vIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xuLy8gd2lkdGg6IDM5MHB4O1xuLy8gaGVpZ2h0OiA1NjBweDtcbi8vIGNvbG9yOiByZ2IoMCAwIDAgLyA4MCUpO1xuLy8gcG9zaXRpb246IGZpeGVkO1xuLy8gZGlzcGxheTogZmxleDtcbi8vIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4vLyBmb250LXNpemU6IDEzLjJweDtcbi8vIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4vLyB6LWluZGV4OiA5OTk5O1xuLy8gb3ZlcmZsb3c6IGhpZGRlbjtcbi8vIGJveC1zaGFkb3c6IDBweCA4cHggMjhweCByZ2JhKDAsMCwwLC4xNik7XG4vLyBib3JkZXItcmFkaXVzOiA2cHg7XG4vLyBib3JkZXI6MXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KVxuLy8gfVxuXG46OnNlbGVjdGlvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkQ1QjI7XG59XG5cbjo6LW1vei1zZWxlY3Rpb24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZENUIyO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAuY29udGFpbmVyOjotd2Via2l0LXNjcm9sbGJhciAge1xuICAvLyB3aWR0aDowcHg7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5jb250YWluZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrICB7XG4gIC8vIGJhY2tncm91bmQ6ICNmZmY7IC8qIOiuvue9rua7muWKqOadoei9qOmBk+iDjOaZr+iJsiAqL1xufVxuXG4vLyAjTGVhcm5pbmdFbmdsaXNoMjAyMyAuY29udGFpbmVyOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4vLyAgIGJhY2tncm91bmQ6ICM4ODg7IC8qIOiuvue9rua7muWKqOadoea7keWdl+iDjOaZr+iJsiAqL1xuLy8gfVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAuRHJvcGRvd25NZW51SXRlbTpob3ZlciB7XG4gIFxuICBiYWNrZ3JvdW5kLWNvbG9yOiNGNkY2RjY7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5Ecm9wZG93bk1lbnVJdGVtOmZvY3VzLXZpc2libGUge1xuICBvdXRsaW5lOiBub25lO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyBoMSwjTGVhcm5pbmdFbmdsaXNoMjAyMyBoMiwjTGVhcm5pbmdFbmdsaXNoMjAyMyBoMyB7XG5cbiAgY29sb3I6IHJnYmEoMCwgMCwgMCk7XG5cbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgI1Njb3V0ZXJTZWxlY3Rpb24sICNMZWFybmluZ0VuZ2xpc2gyMDIzIC5tZXNzYWdlcz5kaXYgIHtcbiAgcGFkZGluZy1sZWZ0OjE4cHg7XG4gIHBhZGRpbmctcmlnaHQ6MThweDtcbn1cblxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAudXNlcklucHV0IHtcbm1hcmdpbjogMTBweCAwO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAuY29udGVudEJveCB7XG5vdmVyZmxvdzogc2Nyb2xsO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAubWVzc2FnZXMgPiAqID4gKiB7XG4gIG1hcmdpbjogMC43ZW0gMDtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgI1Njb3V0ZXJOYXYge1xuLy8gZGlzcGxheTogZmxleDtcbi8vIGp1c3RpZnktY29udGVudDogc3RhcnQ7XG4vLyBhbGlnbi1pdGVtczogY2VudGVyO1xuLy8gcGFkZGluZy10b3A6IDEycHg7XG4vLyBwYWRkaW5nLWJvdHRvbTogMTJweDtcbi8vIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNik7XG4vLyB1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgI1Njb3V0ZXJOYXYgaW1nIHtcbi8vIHdpZHRoOiBhdXRvO1xuLy8gaGVpZ2h0OiAyNHB4O1xuLy8gbWFyZ2luLXJpZ2h0OiA2cHg7XG59XG5cbi5tZXNzYWdlcyB1bHtcbiAgbGlzdC1zdHlsZTpkaXNjO1xuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG59XG5cbi5tZXNzYWdlcyBvbHtcbiAgbGlzdC1zdHlsZTphdXRvO1xuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5pc1BpbiBwYXRoe1xuICBmaWxsOiAjRjA4QTI0O1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAucmlnaHRCdG5Cb3ggYnV0dG9uIHtcblxuICBtYXJnaW4tbGVmdDogMTBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLnJpZ2h0QnRuQm94IGJ1dHRvbiBzcGFuOmxhc3Qtb2YtdHlwZXtcbiAgXG59XG5cbnRhYmxlIHRyIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgcGFkZGluZzogNXB4O1xufVxudGFibGUgdGgsIHRhYmxlIHRkIHtcbiAgcGFkZGluZzogMTBweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbnRhYmxlIHRoIHtcbiAgLy8gZm9udC1zaXplOiAxNHB4O1xuICBsZXR0ZXItc3BhY2luZzogMXB4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG4vLyAvKiDmu5rliqjmnaHku6Xlj4rmu5rliqjmnaHovajpgZPnmoTlrr3luqYgKi9cbi8vIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xuLy8gICAgIHdpZHRoOiAxMHB4O1xuLy8gfVxuXG4vLyAvKiDmu5rliqjmnaHovajpgZPnmoTmoLflvI8qL1xuLy8gOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgXG4vLyB9XG5cbi8vIC8qIOa7muWKqOadoeeahOagt+W8jyAqL1xuLy8gOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4vLyAgICAgYmFja2dyb3VuZDogIzg4ODsgXG4vLyB9XG5cbi8vIC8qIOW9k+S9oOm8oOagh+aCrOWBnOWcqOa7muWKqOadoeS4iuaXtueahOagt+W8jyAqL1xuLy8gOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7XG4vLyAgICAgYmFja2dyb3VuZDogIzU1NTsgXG4vLyB9XG5cbi8qIOa7muWKqOadoSAqL1xuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3Jpem9udGFsIHsgLyrmsLTlubPmu5rliqjmnaHnmoTmoLflvI8qL1xuICB3aWR0aDogNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQ0NDQ0NDO1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDZweDtcbn1cbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2stcGllY2Uge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyAvKua7muWKqOadoeeahOiDjOaZr+minOiJsiovXG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMDsgLyrmu5rliqjmnaHnmoTlnIbop5Llrr3luqYqL1xufVxuOjotd2Via2l0LXNjcm9sbGJhciB7XG4gIHdpZHRoOiAxMHB4OyAvKua7muWKqOadoeeahOWuveW6piovXG4gIGhlaWdodDogOHB4OyAvKua7muWKqOadoeeahOmrmOW6piovXG59XG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOnZlcnRpY2FsIHsgLyrlnoLnm7Tmu5rliqjmnaHnmoTmoLflvI8qL1xuICBoZWlnaHQ6IDUwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5OTk7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNHB4O1xuICBvdXRsaW5lOiAycHggc29saWQgI2ZmZjtcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7XG4gIGJvcmRlcjogMnB4IHNvbGlkICNmZmY7XG59XG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHsgLyrmu5rliqjmnaHnmoRob3Zlcuagt+W8jyovXG4gIGhlaWdodDogNTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzlmOWY5ZjtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA0cHg7XG59XG5cbnByZSB7XG5iYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwO1xuYm9yZGVyLXJhZGl1czogNXB4O1xucGFkZGluZzogMTVweDtcbmJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG5jb2xvcjogIzMzMztcbmZvbnQtZmFtaWx5OiBDb3VyaWVyLCBtb25vc3BhY2U7XG5saW5lLWhlaWdodDogMS4yO1xub3ZlcmZsb3cteDogYXV0bztcbndoaXRlLXNwYWNlOiBwcmU7XG59XG5cbmJsb2NrcXVvdGUge1xucGFkZGluZzogMTBweCAyMHB4O1xubWFyZ2luOiAwIDAgMjBweDtcbmJvcmRlci1sZWZ0OiA1cHggc29saWQgI2YxZjFmMTtcbmNvbG9yOiAjNjY2O1xuYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTtcbn1cblxuYDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldERlZmF1bHRQcm9tcHQgPSBleHBvcnRzLmhhbmRsZUhpZ2h0bGlnaHQgPSBleHBvcnRzLmdldEFua2lDYXJkcyA9IGV4cG9ydHMuaGFuZGxlUHJvbXB0VmFyaWFibGVzID0gZXhwb3J0cy5nZXRVbnNwbGFzaEltYWdlcyA9IGV4cG9ydHMud2luZG93SW5pdGlhbGl6YXRpb24gPSBleHBvcnRzLmdldENsaXBib2FyZCA9IHZvaWQgMDtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgZ2V0Q2xpcGJvYXJkID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQoKVxuICAgICAgICAgICAgLnRoZW4odGV4dCA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHRleHQpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5nZXRDbGlwYm9hcmQgPSBnZXRDbGlwYm9hcmQ7XG5jb25zdCB3aW5kb3dJbml0aWFsaXphdGlvbiA9IChkYXRhKSA9PiB7XG4gICAgLy8g6K6+572u56qX5Y+j55qE6buY6K6k5L2N572uXG4gICAgaWYgKGRhdGEud2luZG93RWxlbWVudC5jdXJyZW50ICYmICFkYXRhLmlzUGluKSB7XG4gICAgICAgIC8vIENoZWNrIHRoZSBib3VuZGFyaWVzXG4gICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgY29uc3QgZWxlbWVudFdpZHRoID0gZGF0YS53aW5kb3dFbGVtZW50LmN1cnJlbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRIZWlnaHQgPSBkYXRhLndpbmRvd0VsZW1lbnQuY3VycmVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IG1pblggPSAwO1xuICAgICAgICBjb25zdCBtaW5ZID0gMDtcbiAgICAgICAgY29uc3QgbWF4WCA9IHdpbmRvd1dpZHRoIC0gZWxlbWVudFdpZHRoO1xuICAgICAgICBjb25zdCBtYXhZID0gd2luZG93SGVpZ2h0IC0gZWxlbWVudEhlaWdodDtcbiAgICAgICAgbGV0IG5ld1gsIG5ld1kgPSAwO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uT2JqZWN0ID0gZGF0YS5zZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIG5ld1ggPSBzZWxlY3Rpb25PYmplY3QueCArIHNlbGVjdGlvbk9iamVjdC53aWR0aCArIDEwO1xuICAgICAgICAgICAgbmV3WSA9IHNlbGVjdGlvbk9iamVjdC55ICsgc2VsZWN0aW9uT2JqZWN0LmhlaWdodCArIDEwO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNsYW1wZWRYID0gTWF0aC5tYXgobWluWCwgTWF0aC5taW4obmV3WCwgbWF4WCkpO1xuICAgICAgICBjb25zdCBjbGFtcGVkWSA9IE1hdGgubWF4KG1pblksIE1hdGgubWluKG5ld1ksIG1heFkpKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocHJvcHMuc2VsZWN0aW9uLmdldFJhbmdlQXQoMCkpO1xuICAgICAgICBkYXRhLndpbmRvd0VsZW1lbnQuY3VycmVudC5zdHlsZS5sZWZ0ID0gYCR7Y2xhbXBlZFh9cHhgO1xuICAgICAgICBkYXRhLndpbmRvd0VsZW1lbnQuY3VycmVudC5zdHlsZS50b3AgPSBgJHtjbGFtcGVkWX1weGA7XG4gICAgfVxuICAgIC8vIC8vIOa3u+WKoOa7muWKqOS6i+S7tu+8jOiuqea2iOaBr+WIl+ihqOiHquWKqOa7muWKqOWIsOW6lemDqFxuICAgIC8vIGRhdGEubWVzc2FnZXNMaXN0LmN1cnJlbnQ/LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlU2Nyb2xsKTtcbiAgICAvLyByZXR1cm4gKCkgPT4ge1xuICAgIC8vICAgICAvLyBjb25zb2xlLmxvZygndXNlRWZmZWN0IHJldHVybicpO1xuICAgIC8vICAgICBkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50Py5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZVNjcm9sbCk7XG4gICAgLy8gfTtcbiAgICAvLyBmdW5jdGlvbiBoYW5kbGVTY3JvbGwoKSB7XG4gICAgLy8gICAgIGlmIChkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50ICE9PSBudWxsKSB7XG4gICAgLy8gICAgICAgICBjb25zdCBpc0F0Qm90dG9tID0gZGF0YS5tZXNzYWdlc0xpc3QuY3VycmVudD8uc2Nyb2xsVG9wICsgZGF0YS5tZXNzYWdlc0xpc3QuY3VycmVudC5jbGllbnRIZWlnaHQgPj0gZGF0YS5tZXNzYWdlc0xpc3QuY3VycmVudC5zY3JvbGxIZWlnaHQgLSAwLjU7XG4gICAgLy8gICAgICAgICBpZiAoaXNBdEJvdHRvbSkge1xuICAgIC8vICAgICAgICAgICAgIC8vIOW3sue7j+S9jeS6juW6lemDqO+8jOS4jemcgOimgeiHquWKqOa7muWKqFxuICAgIC8vICAgICAgICAgICAgIHJldHVybjtcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICAgICAgLy8gc2Nyb2xsVG9Cb3R0b20oKVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIC8vIOacquS9jeS6juW6lemDqO+8jOS4jeaJp+ihjOiHquWKqOa7muWKqFxuICAgIC8vIH1cbn07XG5leHBvcnRzLndpbmRvd0luaXRpYWxpemF0aW9uID0gd2luZG93SW5pdGlhbGl6YXRpb247XG4vKipcbiAqIOiOt+WPliBVbnNwbGFzaCDlm77niYdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5V29yZCAtIOagueaNruatpOWFs+mUruWtl+aQnOe0ouWbvueJh1xuICogQHJldHVybnMge0FycmF5fSDlm77niYfliJfooahcbiAqIEB0aHJvd3Mge+W8guW4uOexu+Wei30g5byC5bi45o+P6L+wXG4gKi9cbmNvbnN0IGdldFVuc3BsYXNoSW1hZ2VzID0gKGtleVdvcmQpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyDor7fmsYIgYmFja2dyb3VuZCDojrflj5bmlbDmja5cbiAgICAgICAgLy8g5L2/55So6ZW/6L+e5o6lXG4gICAgICAgIC8vIGxldCBwb3J0ID0gYnJvd3Nlci5ydW50aW1lLmNvbm5lY3Qoe1xuICAgICAgICAvLyAgICAgbmFtZTogJ2Zyb21Qb3B1cENhcmRVdGlsJ1xuICAgICAgICAvLyB9KVxuICAgICAgICAvLyDkvb/nlKggcG9zdE1zIOWPkemAgeS/oeaBr1xuICAgICAgICBsZXQgc2VuZGluZyA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2dldFVuc3BsYXNoSW1hZ2VzJywgJ21lc3NhZ2VzJzogJycsICdrZXlXb3JkJzoga2V5V29yZCB9KTtcbiAgICAgICAgc2VuZGluZy50aGVuKChtc2cpID0+IHtcbiAgICAgICAgICAgIGlmIChtc2cudHlwZSA9PT0gJ3NlbmRJbWdEYXRhJykge1xuICAgICAgICAgICAgICAgIGlmICgnaW1ncycgaW4gbXNnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1bnNwbGFzaFNlYXJjaFBob3RvcycpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG1zZy5pbWdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIC8vZXJyb3JcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIC8vIOaOpeaUtuS/oeaBr1xuICAgICAgICAvLyBwb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihtc2cgPT4ge1xuICAgICAgICAvLyAgICAgaWYgKG1zZy50eXBlID09PSAnc2VuZEltZ0RhdGEnKSB7XG4gICAgICAgIC8vICAgICAgICAgaWYgKCdpbWdzJyBpbiBtc2cpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3Vuc3BsYXNoU2VhcmNoUGhvdG9zJyk7XG4gICAgICAgIC8vICAgICAgICAgICAgIHJlc29sdmUobXNnLmltZ3MpXG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KVxuICAgIH0pO1xufTtcbmV4cG9ydHMuZ2V0VW5zcGxhc2hJbWFnZXMgPSBnZXRVbnNwbGFzaEltYWdlcztcbi8qKlxuICog5aSE55CGIFByb21wdCDkuK3nmoTlj5jph49cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvbXB0U3RyIC0g6ZyA6KaB5aSE55CG55qEIFByb21wdCDlrZfnrKbkuLJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlXb3JkIC0g55So5oi35omA6YCJ5Lit55qE5YWz6ZSu5a2XXG4gKiBAcGFyYW0ge3N0cmluZ30gU2VudGVuY2UgLSDku47nvZHpobXkuK3mj5Dlj5bnmoTlhbPplK7lrZfmiYDlnKjnmoTlj6XlrZBcbiAqIEByZXR1cm5zIHtzdHJpbmd9IOWkhOeQhuWQjueahCBQcm9tcHQg5a2X56ym5LiyXG4gKiBAdGhyb3dzIHvlvILluLjnsbvlnot9IOW8guW4uOaPj+i/sFxuICovXG5jb25zdCBoYW5kbGVQcm9tcHRWYXJpYWJsZXMgPSAocHJvbXB0U3RyLCBrZXlXb3JkLCBTZW50ZW5jZSwgTGFuZykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgbGV0IG5ld1Byb21wdFN0ciA9IHByb21wdFN0cjtcbiAgICAvLyDlpITnkIblhbPplK7lrZflkozlj6XlrZBcbiAgICBuZXdQcm9tcHRTdHIgPSBwcm9tcHRTdHIucmVwbGFjZSgvXFx7c2VsZWN0aW9uXFx9L2csIGtleVdvcmQpO1xuICAgIG5ld1Byb21wdFN0ciA9IG5ld1Byb21wdFN0ci5yZXBsYWNlKC9cXHtzZW50ZW5jZVxcfS9nLCBTZW50ZW5jZSk7XG4gICAgLy8g5aSE55CG6K+t6KiAXG4gICAgbmV3UHJvbXB0U3RyID0gbmV3UHJvbXB0U3RyLnJlcGxhY2UoL1xce25hdGl2ZUxhbmd1YWdlXFx9L2csIExhbmdbJ2N1cnJlbnQnXVsnbmFtZSddKTtcbiAgICBuZXdQcm9tcHRTdHIgPSBuZXdQcm9tcHRTdHIucmVwbGFjZSgvXFx7Y3VycmVudExhbmd1YWdlXFx9L2csIExhbmdbJ2N1cnJlbnQnXVsnbmFtZSddKTtcbiAgICBuZXdQcm9tcHRTdHIgPSBuZXdQcm9tcHRTdHIucmVwbGFjZSgvXFx7dGFyZ2V0TGFuZ3VhZ2VcXH0vZywgTGFuZ1sndGFyZ2V0J11bJ25hbWUnXSk7XG4gICAgLy8g5aSE55CGIEFua2kg5Y2V6K+NXG4gICAgaWYgKG5ld1Byb21wdFN0ci5pbmRleE9mKCd7YW5raUNhcmRzfScpID49IDApIHtcbiAgICAgICAgLy8g6I635Y+W55uu5qCH5Y2h54mHXG4gICAgICAgIGxldCByYW5kb21WYWx1ZXM7XG4gICAgICAgIGxldCBhbmtpQ2FyZHNTdHIgPSAnJztcbiAgICAgICAgeWllbGQgKDAsIGV4cG9ydHMuZ2V0QW5raUNhcmRzKSgpLnRoZW4oKGNhcmRzKSA9PiB7XG4gICAgICAgICAgICByYW5kb21WYWx1ZXMgPSBjYXJkcztcbiAgICAgICAgICAgIGlmIChyYW5kb21WYWx1ZXMgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAocmFuZG9tVmFsdWVzLmxlbmd0aCA+IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g6ZqP5py65Y+WIFgg5Liq5Y2h54mHXG4gICAgICAgICAgICAgICAgICAgIC8vIOa3seaLt+i0neaVsOe7hOS7pemBv+WFjeS/ruaUuea6kOaVsOe7hFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaHVmZmxlZEFycmF5ID0gcmFuZG9tVmFsdWVzLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIOS9v+eUqCBGaXNoZXItWWF0ZXMg5rSX54mM566X5rOV5a+55pWw57uE6L+b6KGM5omT5LmxXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBzaHVmZmxlZEFycmF5Lmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtzaHVmZmxlZEFycmF5W2ldLCBzaHVmZmxlZEFycmF5W2pdXSA9IFtzaHVmZmxlZEFycmF5W2pdLCBzaHVmZmxlZEFycmF5W2ldXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyDlj5bliY0geCDkuKrlhYPntKDkvZzkuLrnu5PmnpxcbiAgICAgICAgICAgICAgICAgICAgcmFuZG9tVmFsdWVzID0gc2h1ZmZsZWRBcnJheS5zbGljZSgwLCA1KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIOWwhuWNleivjeabv+aNouWIsCBwcm9tcHQg5LitXG4gICAgICAgICAgICAgICAgcmFuZG9tVmFsdWVzID09PSBudWxsIHx8IHJhbmRvbVZhbHVlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmFuZG9tVmFsdWVzLmZvckVhY2goKGNhcmQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGNhcmQuZmllbGRzKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpcnN0S2V5ID0ga2V5c1swXTtcbiAgICAgICAgICAgICAgICAgICAgLy8g5om+5Yiw5Y2h54mH5q2j6Z2iXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmQuZmllbGRzW2tleXNbaV1dLm9yZGVyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RLZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFua2lDYXJkc1N0ciArPSBjYXJkLmZpZWxkc1tmaXJzdEtleV0udmFsdWUgKyAnLCc7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbmV3UHJvbXB0U3RyID0gbmV3UHJvbXB0U3RyLnJlcGxhY2UoL1xce2Fua2lDYXJkc1xcfS9nLCBhbmtpQ2FyZHNTdHIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdQcm9tcHRTdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgbmV3UHJvbXB0U3RyID0gbmV3UHJvbXB0U3RyLnJlcGxhY2UoL1xce2Fua2lDYXJkc1xcfS9nLCAnJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3UHJvbXB0U3RyO1xufSk7XG5leHBvcnRzLmhhbmRsZVByb21wdFZhcmlhYmxlcyA9IGhhbmRsZVByb21wdFZhcmlhYmxlcztcbi8qKlxuICog6I635Y+WIEFua2kg5Y2h54mHXG4gKlxuICogQHJldHVybnMge29iamVjdFtdfSDov5Tlm57ljaHniYfnmoTlr7nosaHliJfooahcbiAqIEB0aHJvd3Mge+W8guW4uOexu+Wei30g5byC5bi45o+P6L+wXG4gKi9cbmNvbnN0IGdldEFua2lDYXJkcyA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyDliKTmlq3mnKzlnLDmmK/lkKblrZjmnInmnKrov4fmnJ/nmoTmlbDmja5cbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLmdldCh7IFwiYW5raUNhcmRzXCI6IHsgJ2NhcmRzJzogW10sICd0aW1lJzogMCB9IH0pLnRoZW4oKGl0ZW0pID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgLy8g57yT5a2YIDEg5bCP5pe2XG4gICAgICAgICAgICBpZiAoaXRlbS5hbmtpQ2FyZHMuY2FyZHMubGVuZ3RoID4gMCAmJiBEYXRlLm5vdygpIC0gaXRlbS5hbmtpQ2FyZHMudGltZSA8IDM2MDAgKiAxMDAwKSB7XG4gICAgICAgICAgICAgICAgLy8g6Iul5pys5Zyw5pyJ5Y+v55So55qE5pWw5o2u77yM5YiZ55u05o6l5aSE55CGXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpdGVtLmFua2lDYXJkcy5jYXJkcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDoi6XmnKzlnLDml6Dlj6/nlKjnmoTmlbDmja7vvIzliJnpgJrov4cgQW5raVxuICAgICAgICAgICAgICAgIHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2Fua2lBY3Rpb24nLCAnbWVzc2FnZXMnOiB7ICdhbmtpX2FjdGlvbl90eXBlJzogJ2ZpbmRDYXJkcycsICdhbmtpX2FyZ3VtZW50cyc6IHsgJ3F1ZXJ5JzogJ2lzOmR1ZSBwcm9wOmR1ZT4tMiBwcm9wOmR1ZTwzJyB9IH0sIH0pLnRoZW4oKG1lc3NhZ2UpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5lcnJvciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5qC55o2u5Y2h54mHIElEIOafpeivouWNoeeJh+S/oeaBr1xuICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW5raUFjdGlvbicsICdtZXNzYWdlcyc6IHsgJ2Fua2lfYWN0aW9uX3R5cGUnOiAnY2FyZHNJbmZvJywgJ2Fua2lfYXJndW1lbnRzJzogeyAnY2FyZHMnOiBtZXNzYWdlLnJlc3VsdCB9IH0sIH0pLnRoZW4oKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FyZHMgPSBtZXNzYWdlLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlsIbmlbDmja7lrZjlgqjliLDmnKzlnLDvvIzpmZDliLbmnIDlpKfkv53lrZjmlbDph4/vvIzpgb/lhY3mnKzlnLDlrZjlgqjnqbrpl7Tovr7liLDkuIrpmZBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5raUNhcmRzOiB7ICd0aW1lJzogRGF0ZS5ub3coKSwgJ2NhcmRzJzogY2FyZHMuc2xpY2UoMCwgMzApIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNhcmRzLnNsaWNlKDAsIDMwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Y+N6aaI6ZSZ6K+v5L+h5oGvXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSwgKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9lcnJvclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5nZXRBbmtpQ2FyZHMgPSBnZXRBbmtpQ2FyZHM7XG4vKipcbiAqIOWkhOeQhuWtl+espuS4su+8jOWvueaMh+WumuWtl+espuiuvue9ruagt+W8j+OAgeeCueWHu+S6i+S7tlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSDpnIDopoHlpITnkIbnmoTlrZfnrKbkuLJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlXb3JkIC0g5b2T5YmN6YCJ5Lit55qE5a2X56ymXG4gKiBAcmV0dXJucyB7c3RyaW5nfSDlpITnkIblkI7nmoQgUHJvbXB0IOWtl+espuS4slxuICogQHRocm93cyB75byC5bi457G75Z6LfSDlvILluLjmj4/ov7BcbiAqL1xuY29uc3QgaGFuZGxlSGlnaHRsaWdodCA9IChzdHIsIGtleVdvcmQsIGFua2lDYXJkcywgd2luZG93RWxlbWVudCkgPT4ge1xuICAgIGlmIChzdHIgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIGxldCBuZXdTdHIgPSBzdHI7XG4gICAgLy8g5aSE55CGIGtleXdvcmQg6auY5LquXG4gICAgbmV3U3RyID0gbmV3U3RyLnJlcGxhY2UobmV3IFJlZ0V4cChgKF58W14qXSkoJHtrZXlXb3JkfSkoW14qXXwkKWAsICdnaScpLCBmdW5jdGlvbiAobWF0Y2gsIHAxLCBwMiwgcDMpIHtcbiAgICAgICAgLy8g5aaC5p6c5YWz6ZSu6K+N5YmN5ZCO5rKh5pyJKu+8jOWImea3u+WKoCoq77yM5ZCm5YiZ5L+d55WZ5Y6f5qC3XG4gICAgICAgIGlmIChwMSAhPT0gJyonICYmIHAzICE9PSAnKicpIHtcbiAgICAgICAgICAgIHJldHVybiBwMSArICcqKicgKyBwMiArICcqKicgKyBwMztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDsgLy8g5LiN6L+b6KGM5pu/5o2iXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyDlpITnkIYgQW5raSDljZXor43pq5jkuq5cbiAgICBjb25zdCBjYXJkcyA9IGFua2lDYXJkcztcbiAgICBpZiAod2luZG93RWxlbWVudCAmJiBjYXJkcykge1xuICAgICAgICAvLyDpgY3ljobmr4/kuIDkuKrljaHniYdcbiAgICAgICAgY2FyZHMuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjYXJkKTtcbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjYXJkLmZpZWxkcyk7XG4gICAgICAgICAgICBsZXQgZmlyc3RLZXkgPSBrZXlzWzBdO1xuICAgICAgICAgICAgLy8g5om+5Yiw5Y2h54mH5q2j6Z2iXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FyZC5maWVsZHNba2V5c1tpXV0ub3JkZXIgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RLZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjYXJkRnJvbnRWYWx1ZSA9IGNhcmQuZmllbGRzW2ZpcnN0S2V5XS52YWx1ZTtcbiAgICAgICAgICAgIGlmIChjYXJkRnJvbnRWYWx1ZSAhPT0ga2V5V29yZCkge1xuICAgICAgICAgICAgICAgIG5ld1N0ciA9IG5ld1N0ci5yZXBsYWNlKG5ldyBSZWdFeHAoY2FyZEZyb250VmFsdWUsICdnaScpLCBgPG1hcms+JHtjYXJkRnJvbnRWYWx1ZX08L21hcms+YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB9LCAxMCk7XG4gICAgICAgICAgICAvLyAvLyDliJvlu7rkuIDkuKrnlKjkuo7ljIXoo7knbyfnmoQ8c3Bhbj7lhYPntKBcbiAgICAgICAgICAgIC8vIHZhciBzcGFuRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIC8vIHNwYW5FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1jYXJkSUQnLCBjYXJkLmlkKTtcbiAgICAgICAgICAgIC8vIHNwYW5FbGVtZW50LmNsYXNzTmFtZSA9ICdoZWxsbyc7XG4gICAgICAgICAgICAvLyBzcGFuRWxlbWVudC5zdHlsZS5jb2xvciA9ICdyZWQnO1xuICAgICAgICAgICAgLy8gc3BhbkVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICAgICAgLy8gc3BhbkVsZW1lbnQudGV4dENvbnRlbnQgPSBjYXJkRnJvbnRWYWx1ZTtcbiAgICAgICAgICAgIC8vIC8vIG5ld1N0ciA9IG5ld1N0ci5yZXBsYWNlKC9vL2dpLCBzcGFuRWxlbWVudC5vdXRlckhUTUwpO1xuICAgICAgICAgICAgLy8gbmV3U3RyID0gbmV3U3RyLnJlcGxhY2UobmV3IFJlZ0V4cChjYXJkRnJvbnRWYWx1ZSwgJ2dpJyksIHNwYW5FbGVtZW50Lm91dGVySFRNTCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyDlr7nkuIrov7DlhYPntKDmt7vliqDngrnlh7vkuovku7ZcbiAgICAgICAgLy8gbGV0IGhpZ2h0bGlnaHREb20gPSB3aW5kb3dFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hlbGxvJylcbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCBoaWdodGxpZ2h0RG9tLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICAgICBoaWdodGxpZ2h0RG9tW2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlSGlnaHRsaWdodENsaWNrKVxuICAgICAgICAvLyAgICAgaGlnaHRsaWdodERvbVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUhpZ2h0bGlnaHRDbGljaylcbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICByZXR1cm4gbmV3U3RyO1xuICAgIC8vIHJldHVybiAndHJ1ZSdcbn07XG5leHBvcnRzLmhhbmRsZUhpZ2h0bGlnaHQgPSBoYW5kbGVIaWdodGxpZ2h0O1xuLyoqXG4gKiDojrflj5bns7vnu5/nmoTpu5jorqQgUHJvbXB0XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5V29yZCAtIOW9k+WJjemAieS4reeahOWtl+esplxuICogQHJldHVybnMge3N0cmluZ30gUHJvbXB0IOWtl+espuS4slxuICogQHRocm93cyB75byC5bi457G75Z6LfSDlvILluLjmj4/ov7BcbiAqL1xuY29uc3QgZ2V0RGVmYXVsdFByb21wdCA9IChrZXlXb3JkKSA9PiB7XG4gICAgbGV0IGdldFVuc3BsYXNoSW1hZ2VzID0gdHJ1ZTtcbiAgICBsZXQgdXNlclByb21wdCA9IGBcblxuICAgICAgICBQbGVhc2UgaGVscCBtZSBsZWFybiBhcyBhIGZvcmVpZ24gbGFuZ3VhZ2UgdGVhY2hlci4gU2VudGVuY2VzIGluIGV4YW1wbGVzIHNob3VsZCBub3QgYmUgdGhlIHNhbWUgYXMgdGhlIGdpdmVuIHNlbnRlbmNlLlxuXG4gICAgICAgIEV4YW1wbGXvvJpcbiAgICAgICAgXCJcIlwiXG4gICAgICAgIC0gIE1lYW5pbmc6IDxFeHBsYWluIHRoZSBtZWFuaW5nIHVzaW5nIHtuYXRpdmVMYW5ndWFnZX0+XG4gICAgICAgIC0gIFBhcnQgb2YgU3BlZWNoOiA8SW5kaWNhdGUgdGhlIHBhcnQgb2Ygc3BlZWNoIHVzaW5nIHtuYXRpdmVMYW5ndWFnZX0+XG4gICAgICAgIFxuICAgICAgICAjIyBNZWFuaW5nIGluIHRoZSBzZW50ZW5jZVxuICAgICAgICAtICA8RXhwbGFpbiB0aGUgbWVhbmluZyBvZiB0aGUgd29yZCBpbiB0aGUgc2VudGVuY2UgdXNpbmcge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgXG4gICAgICAgICMjIEV4YW1wbGUgU2VudGVuY2VzXG4gICAgICAgIC0gIDx7dGFyZ2V0TGFuZ3VhZ2V9IGV4YW1wbGUgc2VudGVuY2U+IC0gPFRyYW5zbGF0aW9uIGluIHtuYXRpdmVMYW5ndWFnZX0+XG4gICAgICAgIC0gIDx7dGFyZ2V0TGFuZ3VhZ2V9IGV4YW1wbGUgc2VudGVuY2U+IC0gPFRyYW5zbGF0aW9uIGluIHtuYXRpdmVMYW5ndWFnZX0+XG4gICAgICAgIFxuICAgICAgICAjIyBUcmFuc2xhdGlvbiBFeGVyY2lzZVxuICAgICAgICAtICA8e25hdGl2ZUxhbmd1YWdlfSBzZW50ZW5jZT5cbiAgICAgICAgLSAgPHtuYXRpdmVMYW5ndWFnZX0gc2VudGVuY2U+XG4gICAgICAgIFxuICAgICAgICBcIlwiXCIgXG4gICAgICAgIFxuICAgICAgICBXb3JkOntzZWxlY3Rpb259LCBzZW50ZW5jZToge3NlbnRlbmNlfSxZb3UgbXVzdCByZXBseSBpbiB0aGUgc3BlY2lmaWVkIGxhbmd1YWdlXG5cbiAgICAgICAgUGxlYXNlIHN0YXJ0IHRlYWNoaW5nOlxuXG4gICAgICAgIGA7XG4gICAgLy8g5YWz6ZSu5a2X6ZW/5bqm6L6D6ZW/5pe277yM5oyJ54Wn5Y+l5a2Q6L+b6KGM5aSE55CGXG4gICAgaWYgKGtleVdvcmQubGVuZ3RoID4gMjApIHtcbiAgICAgICAgZ2V0VW5zcGxhc2hJbWFnZXMgPSBmYWxzZTtcbiAgICAgICAgdXNlclByb21wdCA9IGBcbiAgICAgIFxuICAgICAgICAgICAgICAgICAgQXMgYSBsYW5ndWFnZSB0ZWFjaGVyLCBJIHdpbGwgcHJvdmlkZSBhbiBleHBsYW5hdGlvbiBvZiB0aGUgZ3JhbW1hciBrbm93bGVkZ2UgaW4gdGhlIGdpdmVuIHNlbnRlbmNlOlxuICAgICAgXG4gICAgICAgICAgICAgICAgICBFeGFtcGxlOlxuICAgICAgICAgICAgICAgICAgXCJcIlwiXG4gICAgICBcbiAgICAgICAgICAgICAgICAgICMjIFRyYW5zbGF0aW9uXG4gICAgICAgICAgICAgICAgICA8VHJhbnNsYXRlIHRvIHtuYXRpdmVMYW5ndWFnZX0+XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICMjIEdyYW1tYXJcbiAgICAgICAgICAgICAgICAgIDwtIFBvaW50OiBFeHBsYWluIGluIHtuYXRpdmVMYW5ndWFnZX0+XG4gICAgICBcbiAgICAgICAgICAgICAgICAgICMjIEV4YW1wbGVzIG9mIHJlbGF0ZWQgZ3JhbW1hclxuICAgICAgICAgICAgICAgICAgLSAgPHt0YXJnZXRMYW5ndWFnZX0gZXhhbXBsZSBzZW50ZW5jZT4gLSA8VHJhbnNsYXRpb24gaW4ge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgICAgICAgICAgIC0gIDx7dGFyZ2V0TGFuZ3VhZ2V9IGV4YW1wbGUgc2VudGVuY2U+IC0gPFRyYW5zbGF0aW9uIGluIHtuYXRpdmVMYW5ndWFnZX0+XG4gICAgICBcbiAgICAgICAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICBTZW50ZW5jZToge3NlbGVjdGlvbn1gO1xuICAgIH1cbiAgICBjb25zdCBkZWZhdWx0UHJvbXB0ID0ge1xuICAgICAgICAndGl0bGUnOiAnRGVmYXVsdCcsICdnZXRVbnNwbGFzaEltYWdlcyc6IGdldFVuc3BsYXNoSW1hZ2VzLCAndXNlclByb21wdCc6IHVzZXJQcm9tcHQsXG4gICAgICAgICdpZCc6ICdEZWZhdWx0J1xuICAgIH07XG4gICAgcmV0dXJuIGRlZmF1bHRQcm9tcHQ7XG59O1xuZXhwb3J0cy5nZXREZWZhdWx0UHJvbXB0ID0gZ2V0RGVmYXVsdFByb21wdDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2V0RG9ub3RDbG9zZVBvcHVwQ2FyZCA9IGV4cG9ydHMucGluUG9wdXBDYXJkID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCByZWFjdF9kb21fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3QtZG9tXCIpKTtcbmNvbnN0IFBvcHVwQ2FyZF8xID0gcmVxdWlyZShcIi4uL1BvcHVwQ2FyZFwiKTtcbmNvbnN0IGNzc2luanNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9jc3NpbmpzXCIpO1xuY29uc3Qgc3R5bGVkX2NvbXBvbmVudHNfMSA9IHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKTtcbmNvbnN0IHVzZXJJbmZvXzEgPSByZXF1aXJlKFwiLi4vbGliL3VzZXJJbmZvXCIpO1xuY29uc3QgbGFuZ18xID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xuY29uc3QgbG9jYWxlXzEgPSByZXF1aXJlKFwiLi4vbGliL2xvY2FsZVwiKTtcbmNvbnN0IHVzZXJJbmZvXzIgPSByZXF1aXJlKFwiLi4vbGliL3VzZXJJbmZvXCIpO1xuLy8gaW1wb3J0IHsgQnV0dG9uLCBtZXNzYWdlIH0gZnJvbSAnYW50ZCc7XG5jb25zdCBpY29uc18xID0gcmVxdWlyZShcIkBhbnQtZGVzaWduL2ljb25zXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG5jb25zdCBsYW5nXzIgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG5jb25zdCB1dGlsXzIgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbmNvbnN0IHN0eWxlXzEgPSByZXF1aXJlKFwiLi4vUG9wdXBDYXJkL3N0eWxlXCIpO1xuY29uc3QgaWNvbjEyOF9wbmdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vYXNzZXRzL2ljb24xMjgucG5nXCIpKTtcbmNvbnN0IHN0eWxlZF9jb21wb25lbnRzXzIgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInN0eWxlZC1jb21wb25lbnRzXCIpKTtcbi8vIGltcG9ydCAnLi9hc3NldHMvdGFpbHdpbmQuY3NzJztcbi8vIOmhtemdoui9veWFpeWQjuS8muazqOWFpeasoeiEmuacrO+8jOaIliBiYWNrZ3JvdW5kIOWPr+iDveS8muWcqOS4gOS6m+aDheWGteS4i+azqOWFpeatpOiEmuacrFxuLy8gY29uc29sZS5sb2coJ2JlZm9yZSBicm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyJyk7XG4vLyDorrDlvZXlvZPliY3nqpflj6PmmK/lkKYgUGluIOS9j1xubGV0IGlzUGluID0gZmFsc2U7XG4vLyDorr7nva7lvZPliY3nqpflj6PmmK/lkKblhYHorrjlhbPpl61cbmxldCBkb25vdENsb3NlUG9wdXBDYXJkID0gZmFsc2U7XG4vLyDliJ3lp4vljJbkuLvlrrnlmajvvIzkuLvlrrnlmajnlKjmnaXmjILlnKjlhajlsYDmoLflvI/vvIzljIXmi6znrKzkuInmlrnnu4Tku7bnmoTmoLflvI9cbmxldCBNeUJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdfX2ppYW5nLXNjb3V0ZXInKTtcbi8vIGNvbnNvbGUubG9nKE15Qm94KTtcbi8vIGNvbnRhaW5lciDmib/ovb0gVUkg57uE5Lu2XG5sZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb250YWluZXIuY2xhc3NOYW1lID0gJ2NvbnRhaW5lcic7XG4vLyDkvb/nlKggc2hhZG93IOadpemalOemu+agt+W8j1xubGV0IHNoYWRvd1Jvb3QgPSB1bmRlZmluZWQ7XG5pZiAoTXlCb3ggPT09IG51bGwgfHwgTXlCb3ggPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIOWmguaenOS4jeWtmOWcqOWuueWZqFxuICAgIC8vIOWIm+W7uuS4u+WuueWZqFxuICAgIE15Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgTXlCb3guaWQgPSAnX19qaWFuZy1zY291dGVyJztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdLmFwcGVuZENoaWxkKE15Qm94KTtcbiAgICBNeUJveC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyAvL+m7mOiupOmakOiXj1xuICAgIHNoYWRvd1Jvb3QgPSBNeUJveCA9PT0gbnVsbCB8fCBNeUJveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogTXlCb3guYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QgPT09IG51bGwgfHwgc2hhZG93Um9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgIC8vIEFudCDnu4Tku7bmoLflvI9cbiAgICAvLyBjb25zdCBhbnRTdHlsZXNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgIC8vIGFudFN0eWxlc2hlZXQucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIC8vIGFudFN0eWxlc2hlZXQuaHJlZiA9ICdodHRwczovL2Nkbi5ib290Y2RuLm5ldC9hamF4L2xpYnMvYW50ZC80LjE3LjEvYW50ZC5taW4uY3NzJztcbiAgICAvLyBzaGFkb3dSb290LmFwcGVuZENoaWxkKGFudFN0eWxlc2hlZXQpO1xuICAgIC8vIFRhaWx3aW5kXG4gICAgY29uc3QgdGFpbHdpbmRTdHlsZXNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgIHRhaWx3aW5kU3R5bGVzaGVldC5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgdGFpbHdpbmRTdHlsZXNoZWV0LmhyZWYgPSAnaHR0cHM6Ly91bnBrZy5jb20vdGFpbHdpbmRjc3NAXjIvZGlzdC90YWlsd2luZC5taW4uY3NzJztcbiAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKHRhaWx3aW5kU3R5bGVzaGVldCk7XG4gICAgLy8g5ZyoIFNoYWRvdyBET00g5Lit5re75Yqg5qC35byP77yaXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlLnRleHRDb250ZW50ID0gc3R5bGVfMS5wb3B1cENhcmRTdHlsZTtcbiAgICBzaGFkb3dSb290ID09PSBudWxsIHx8IHNoYWRvd1Jvb3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubGV0IFVTRVJfSU5GTyA9IHsgdXNlcklkOiAndW5rbm93JywgdmVyaWZpZWQ6IGZhbHNlIH07XG5sZXQgQU5LSV9JTkZPO1xuY29uc3QgdGhpc0dldFVzZXJJbmZvID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgLy8g6I635Y+W55So5oi35L+h5oGvXG4gICAgVVNFUl9JTkZPID0geWllbGQgKDAsIHV0aWxfMS5nZXRVc2VySW5mbykoKTtcbiAgICAvLyDojrflj5YgQW5raSDniYznu4Tkv6Hmga9cbiAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdzZXRNb2RlbCcsICdtZXNzYWdlcyc6IHt9LCB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgQU5LSV9JTkZPID0gcmVzdWx0LmRhdGE7XG4gICAgICAgIC8vIOabtOaWsCBBbmtpIHN0eWxlXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEFOS0lfSU5GTy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHAgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwibW9kZWxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IEFOS0lfSU5GT1tpXVsnbW9kZWxOYW1lJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNzc1wiOiB1dGlsXzIuY2FyZFN0eWxlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8vIOiOt+WPliBBbmtpIOeJjOe7hOS/oeaBr1xuICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2Fua2lBY3Rpb24nLCAnbWVzc2FnZXMnOiB7ICdhbmtpX2FjdGlvbl90eXBlJzogJ3VwZGF0ZU1vZGVsU3R5bGluZycsICdhbmtpX2FyZ3VtZW50cyc6IHAgfSwgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xudGhpc0dldFVzZXJJbmZvKCk7XG5sZXQgcG9ydCA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5jb25uZWN0KHtcbiAgICBuYW1lOiAnZnJvbUNvbnRlbnRTY3JpcHQnXG59KTtcbi8vIOaOpeaUtiBiYWNrZ3JvdW5kIOa2iOaBr++8iOebruWJjeaYr+mAmui/h+a1j+iniOWZqOeahOWPs+mUruiPnOWNleinpuWPke+8iVxud2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAobXNnLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIHZhciBfYTtcbiAgICAvLyBjb25zb2xlLmxvZygnY29udGVudCBzY3JpcHQgb25NZXNzYWdlOicpO1xuICAgIC8vIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgaWYgKG1zZy50eXBlID09PSAnb3Blbi1zY291dGVyJykge1xuICAgICAgICAvLyDlpITnkIbnqpflj6NcbiAgICAgICAgaWYgKE15Qm94ICE9PSBudWxsICYmIE15Qm94ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIOWmguaenOW3suWtmOWcqOWuueWZqFxuICAgICAgICAgICAgaWYgKCgoX2EgPSBNeUJveC5zaGFkb3dSb290KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lcicpKSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIOWmguaenOS4jeWtmOWcqCBQb3B1cENhcmRcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gJ2NvbnRhaW5lcic7XG4gICAgICAgICAgICAgICAgc2hhZG93Um9vdCA9PT0gbnVsbCB8fCBzaGFkb3dSb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDlgZzmraLml6fnmoTlr7nor51cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ1N0b3BUaGVDb252ZXJzYXRpb24nLCAnbWVzc2FnZXMnOiAnJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIC8vIOmHjeaWsOmTvuaOpVxuICAgICAgICAgICAgICAgIHBvcnQgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdmcm9tQ29udGVudFNjcmlwdCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnU3RvcFRoZUNvbnZlcnNhdGlvbicsICdtZXNzYWdlcyc6ICcnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgTXlCb3guc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAvLyDnp7vpmaTml6flhoXlrrnvvIzpgb/lhY0gMiDmrKHmuLLmn5Pmt7fmnYLlnKjkuIDotbdcbiAgICAgICAgICAgIC8vIGNvbnRhaW5lci5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+S4jeWtmOWcqCBCb3gg5a655ZmoJyk7XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSAnY29udGFpbmVyJztcbiAgICAgICAgICAgIHNoYWRvd1Jvb3QgPT09IG51bGwgfHwgc2hhZG93Um9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIC8vIOaYvuekuueql+WPo1xuICAgICAgICBpZiAoc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5rZXlXb3JkICE9PSAnJykge1xuICAgICAgICAgICAgc2hvd1BvcHVwQ2FyZCh7ICdrZXlXb3JkJzogc2VsZWN0aW9uID09PSBudWxsIHx8IHNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VsZWN0aW9uLmtleVdvcmQsICdTZW50ZW5jZSc6IHNlbGVjdGlvbi5zZW50ZW5jZSB9LCB3aW5kb3cuZ2V0U2VsZWN0aW9uKCksIGNvbnRhaW5lciwgc2hhZG93Um9vdCwgaXNQaW4sIG1zZy5ydW5Qcm9tcHQpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3NlbGVjdGlvbmNoYW5nZScsIGhhbmRsZVNlbGVjdGlvbmNoYW5nZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZXVwKTtcbiAgICAgICAgLy8g55uR5ZCs6aG16Z2i54K55Ye75LqL5Lu2XG4gICAgICAgIGRvY3VtZW50Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBpZiAoTXlCb3ggIT09IHVuZGVmaW5lZCAmJiBNeUJveCAhPT0gbnVsbCAmJiAhaXNQaW4gJiYgIWRvbm90Q2xvc2VQb3B1cENhcmQpIHtcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzngrnlh7vnmoTkuI3mmK/mj5Lku7bnqpflj6Plj4rlhbblrZDlhYPntKDvvIzliJnlhbPpl63nqpflj6NcbiAgICAgICAgICAgICAgICBpZiAoTXlCb3ggIT09IGV2ZW50LnRhcmdldCAmJiAhTXlCb3guY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAvLyDpmpDol4/nqpflj6NcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gY29udGFpbmVyLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzZWxlY3Rpb25jaGFuZ2UnLCBoYW5kbGVTZWxlY3Rpb25jaGFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2V1cCk7XG4gICAgICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb250YWluZXIub25tb3VzZWRvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIC8vIOmakOiXjyBzZXRBbmtpU3BhY2VCdXR0b25cbiAgICAgICAgICAgIGNvbnN0IGNvbnRleHRCb3ggPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGV4dEJveDInKVswXTtcbiAgICAgICAgICAgIGlmIChjb250ZXh0Qm94KSB7XG4gICAgICAgICAgICAgICAgLy8g54K55Ye755qE5LiN5pivIHNldEFua2lTcGFjZUJ1dHRvbiDml7bmiY3pmpDol49cbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dEJveCAhPT0gZXZlbnQudGFyZ2V0ICYmICFjb250ZXh0Qm94LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gY29udGV4dEJveC5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlQ2hpbGQoY29udGV4dEJveCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn0pO1xuLy8g5pi+56S65bqU55So56qX5Y+jXG5mdW5jdGlvbiBzaG93UG9wdXBDYXJkKGRhdGEsIG1zZywgTXlCb3gsIHNoYWRvd1Jvb3QsIGlzUGluLCBydW5Qcm9tcHQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBsZXQgbGFuZyA9IHlpZWxkICgwLCBsYW5nXzEuZmV0Y2hjdXJyZW50TGFuZ3VhZ2UpKCk7XG4gICAgICAgIHJlYWN0X2RvbV8xLmRlZmF1bHQucmVuZGVyKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5TdHJpY3RNb2RlLCBudWxsLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQobG9jYWxlXzEuQ3VycmVudExhbmd1YWdlQ29udGV4dC5Qcm92aWRlciwgeyB2YWx1ZTogbGFuZyB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHVzZXJJbmZvXzIuVXNlckluZm9Db250ZXh0LlByb3ZpZGVyLCB7IHZhbHVlOiB7IHVzZXI6IFVTRVJfSU5GTywgYW5raTogQU5LSV9JTkZPIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoY3NzaW5qc18xLlN0eWxlUHJvdmlkZXIsIHsgY29udGFpbmVyOiBzaGFkb3dSb290IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChzdHlsZWRfY29tcG9uZW50c18xLlN0eWxlU2hlZXRNYW5hZ2VyLCB7IHRhcmdldDogc2hhZG93Um9vdCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFBvcHVwQ2FyZF8xLlBvcHVwQ2FyZCwgeyBkYXRhOiBkYXRhLCBzZWxlY3Rpb246IG1zZywgcnVuUHJvbXB0OiBydW5Qcm9tcHQsIGlzUGluOiBpc1BpbiB9KSkpKSkpLCBNeUJveCk7XG4gICAgfSk7XG59XG4vLyBpbnRlcmZhY2UgUG9wdXBDYXJkQ29udGV4dFByb3BzIHtcbi8vICAgZGF0YTogYW55O1xuLy8gICBzZWxlY3Rpb246IGFueTtcbi8vICAgcnVuUHJvbXB0OiBib29sZWFuO1xuLy8gfVxuLy8gZnVuY3Rpb24gUG9wdXBDYXJkQ29udGV4dChwcm9wczogUG9wdXBDYXJkQ29udGV4dFByb3BzKSB7XG4vLyAgIGNvbnN0IFt1c2VySW5mbywgc2V0VXNlckluZm9dID0gdXNlU3RhdGU8dXNlckluZm9UeXBlIHwgbnVsbD4obnVsbCk7XG4vLyAgIGNvbnN0IFtsYW5nLCBzZXRMYW5nXSA9IHVzZVN0YXRlPGFueT4obnVsbCk7XG4vLyAgIHVzZUVmZmVjdCgoKSA9PiB7XG4vLyAgICAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hVc2VySW5mbygpIHtcbi8vICAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCBnZXRVc2VySW5mbygpO1xuLy8gICAgICAgY29uc3QgbGFuZyA9IGF3YWl0IGZldGNoY3VycmVudExhbmd1YWdlKClcbi8vICAgICAgIHNldExhbmcobGFuZylcbi8vICAgICAgIHNldFVzZXJJbmZvKGluZm8pO1xuLy8gICAgIH1cbi8vICAgICBmZXRjaFVzZXJJbmZvKCk7XG4vLyAgIH0sIFtdKTsgIC8vIOi3keS4gOasoe+8jOS4jeS+nei1luS7u+S9leWklumDqOWPmOmHj1xuLy8gICByZXR1cm4gKFxuLy8gICAgIDxDdXJyZW50TGFuZ3VhZ2VDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXtsYW5nfT5cbi8vICAgICAgIDxVc2VySW5mb0NvbnRleHQuUHJvdmlkZXIgdmFsdWU9e1VTRVJfSU5GT30+XG4vLyAgICAgICAgIDxTdHlsZVByb3ZpZGVyIGNvbnRhaW5lcj17c2hhZG93Um9vdH0+XG4vLyAgICAgICAgICAgPFN0eWxlU2hlZXRNYW5hZ2VyIHRhcmdldD17c2hhZG93Um9vdH0+XG4vLyAgICAgICAgICAgICA8UG9wdXBDYXJkIGRhdGE9e3Byb3BzLmRhdGF9IHNlbGVjdGlvbj17cHJvcHMuc2VsZWN0aW9ufSBydW5Qcm9tcHQ9e3Byb3BzLnJ1blByb21wdH0gaXNQaW49e2lzUGlufSAvPlxuLy8gICAgICAgICAgIDwvU3R5bGVTaGVldE1hbmFnZXI+XG4vLyAgICAgICAgIDwvU3R5bGVQcm92aWRlcj5cbi8vICAgICAgIDwvVXNlckluZm9Db250ZXh0LlByb3ZpZGVyPlxuLy8gICAgIDwvQ3VycmVudExhbmd1YWdlQ29udGV4dC5Qcm92aWRlcj5cbi8vICAgKVxuLy8gfVxuY29uc3QgcGluUG9wdXBDYXJkID0gKHZhbHVlKSA9PiB7XG4gICAgaXNQaW4gPSB2YWx1ZTtcbn07XG5leHBvcnRzLnBpblBvcHVwQ2FyZCA9IHBpblBvcHVwQ2FyZDtcbmNvbnN0IHNldERvbm90Q2xvc2VQb3B1cENhcmQgPSAodmFsdWUpID0+IHtcbiAgICBkb25vdENsb3NlUG9wdXBDYXJkID0gdmFsdWU7XG59O1xuZXhwb3J0cy5zZXREb25vdENsb3NlUG9wdXBDYXJkID0gc2V0RG9ub3RDbG9zZVBvcHVwQ2FyZDtcbmxldCBpc1RleHRTZWxlY3RlZCA9IGZhbHNlO1xuY29uc3QgaGFuZGxlU2VsZWN0aW9uY2hhbmdlID0gKCkgPT4ge1xuICAgIC8vIGxldCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgLy8gaWYgKHNlbGVjdGlvbikge1xuICAgIC8vICAgY29uc29sZS5sb2coJ3NlbGVjdGlvbi50b1N0cmluZygpOicpO1xuICAgIC8vICAgY29uc29sZS5sb2coc2VsZWN0aW9uLnRvU3RyaW5nKCkpO1xuICAgIC8vICAgaXNUZXh0U2VsZWN0ZWQgPSBzZWxlY3Rpb24udG9TdHJpbmcoKS5sZW5ndGggPiAwO1xuICAgIC8vIH1cbn07XG5jb25zdCBoYW5kbGVNb3VzZXVwID0gKGV2ZW50KSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZU1vdXNldXAnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhpc1RleHRTZWxlY3RlZCk7XG4gICAgLy8gY29uc29sZS5sb2coZG9ub3RDbG9zZVBvcHVwQ2FyZCk7XG4gICAgdmFyIF9hO1xuICAgIC8vIOiOt+WPlueUqOaIt+WcqOWuv+S4u+e9kemhteS4iumAieS4reeahOWGheWuuVxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IGdldFNlbGVjdGlvbigpO1xuICAgIGlmIChzZWxlY3Rpb24pIHtcbiAgICAgICAgaXNUZXh0U2VsZWN0ZWQgPSBzZWxlY3Rpb24uc2VsZWN0aW9uLnRvU3RyaW5nKCkubGVuZ3RoID4gMDtcbiAgICB9XG4gICAgaWYgKGlzVGV4dFNlbGVjdGVkICYmICFkb25vdENsb3NlUG9wdXBDYXJkKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdpc1RleHRTZWxlY3RlZCAmJiAhZG9ub3RDbG9zZVBvcHVwQ2FyZCcpO1xuICAgICAgICBpZiAoTXlCb3ggIT09IGV2ZW50LnRhcmdldCAmJiAhKE15Qm94ID09PSBudWxsIHx8IE15Qm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBNeUJveC5jb250YWlucyhldmVudC50YXJnZXQpKSkge1xuICAgICAgICAgICAgLy8g5ZyoIFBvcHVwQ2FyZCDojIPlm7TlpJbop6blj5FcbiAgICAgICAgICAgIGlzVGV4dFNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAvLyDlgZzmraLml6fnmoTlr7nor51cbiAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSk7XG4gICAgICAgICAgICAvLyDmmL7npLrnqpflj6NcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24gJiYgKHNlbGVjdGlvbiA9PT0gbnVsbCB8fCBzZWxlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbGVjdGlvbi5rZXlXb3JkLmxlbmd0aCkgPiAwICYmICgoX2EgPSBzZWxlY3Rpb24uc2VsZWN0aW9uLmFuY2hvck5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5ub2RlTmFtZSkgPT09ICcjdGV4dCcpIHtcbiAgICAgICAgICAgICAgICBzaG93UG9wdXBDYXJkKHsgJ2tleVdvcmQnOiBzZWxlY3Rpb24gPT09IG51bGwgfHwgc2VsZWN0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZWxlY3Rpb24ua2V5V29yZCwgJ1NlbnRlbmNlJzogc2VsZWN0aW9uLnNlbnRlbmNlIH0sIHdpbmRvdy5nZXRTZWxlY3Rpb24oKSwgY29udGFpbmVyLCBzaGFkb3dSb290LCBpc1BpbiwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyDlnKggUG9wdXBDYXJkIOiMg+WbtOWGheinpuWPkVxuICAgICAgICAgICAgLy8g5pi+56S65a6M5b2i5aGr56m65pON5L2c5oyJ6ZKuXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRleHQgPSBzaGFkb3dSb290LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0U3RyaW5nID0gc2VsZWN0ZWRUZXh0LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBjb25zdCBzZW50ZW5jZSA9ICcnO1xuICAgICAgICAgICAgY29uc3QgUG9wdXBDYXJkQ29udGFpbmVyID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRhaW5lcicpWzBdO1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZXNCb3ggPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVzc2FnZXMnKVswXTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHNlbGVjdGVkVGV4dCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlc0JveD8uY29udGFpbnMoc2VsZWN0ZWRUZXh0LmJhc2VOb2RlLnBhcmVudE5vZGUgYXMgTm9kZSkpO1xuICAgICAgICAgICAgbGV0IGlzSW5NZXNzYWdlcyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkVGV4dC5iYXNlTm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlc0JveCA9PT0gc2VsZWN0ZWRUZXh0LmJhc2VOb2RlLnBhcmVudE5vZGUgfHwgKG1lc3NhZ2VzQm94ID09PSBudWxsIHx8IG1lc3NhZ2VzQm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNzYWdlc0JveC5jb250YWlucyhzZWxlY3RlZFRleHQuYmFzZU5vZGUucGFyZW50Tm9kZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8v5ZyoIG1lc3NhZ2VzIOWuueWZqOWGheaTjeS9nO+8jOWImeaYvuekuuaTjeS9nOaMiemSrlxuICAgICAgICAgICAgICAgICAgICBpc0luTWVzc2FnZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChQb3B1cENhcmRDb250YWluZXIgJiYgc2VsZWN0ZWRUZXh0LnR5cGUgPT09ICdSYW5nZScgJiYgIWNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY29udGV4dEJveDInKSkge1xuICAgICAgICAgICAgICAgIGxldCBjb250ZXh0Qm94MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGNvbnRleHRCb3gyLmNsYXNzTmFtZSA9ICdjb250ZXh0Qm94Mic7XG4gICAgICAgICAgICAgICAgY29udGV4dEJveDIuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICAgICAgICAgIFBvcHVwQ2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjb250ZXh0Qm94Mik7XG4gICAgICAgICAgICAgICAgbGV0IHJhbmdlID0gc2VsZWN0ZWRUZXh0LmdldFJhbmdlQXQoMCk7XG4gICAgICAgICAgICAgICAgcmVhY3RfZG9tXzEuZGVmYXVsdC5yZW5kZXIocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQodXNlckluZm9fMi5Vc2VySW5mb0NvbnRleHQuUHJvdmlkZXIsIHsgdmFsdWU6IHsgdXNlcjogVVNFUl9JTkZPLCBhbmtpOiBBTktJX0lORk8gfSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChzdHlsZWRfY29tcG9uZW50c18xLlN0eWxlU2hlZXRNYW5hZ2VyLCB7IHRhcmdldDogc2hhZG93Um9vdCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoVG9vbEJhciwgeyBzZWxlY3RlZFRleHQ6IHNlbGVjdGVkVGV4dC5nZXRSYW5nZUF0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBzZWxlY3RlZFRleHRTdHJpbmc6IHNlbGVjdGVkVGV4dFN0cmluZywgcmFuZ2U6IHJhbmdlIH0pKSksIGNvbnRleHRCb3gyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFxuICAgICAgICB9XG4gICAgfVxufTtcbmNvbnN0IGdldFNlbGVjdGlvbiA9ICgpID0+IHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNlbGVjdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAvLyDlvZPliY3pgInkuK3nmoTmloflrZdcbiAgICAgICAgbGV0IGtleVdvcmQgPSBzZWxlY3Rpb24udG9TdHJpbmcoKS50cmltKCk7XG4gICAgICAgIC8vIOmAieS4reaWh+Wtl+aJgOWcqOeahOauteiQvVxuICAgICAgICBsZXQgc2VudGVuY2UgPSAoX2IgPSAoX2EgPSBzZWxlY3Rpb24uYW5jaG9yTm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRleHRDb250ZW50KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJztcbiAgICAgICAgaWYgKHNlbnRlbmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNlbnRlbmNlID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZW50ZW5jZSA9IHNlbnRlbmNlLmxlbmd0aCA8PSBrZXlXb3JkLmxlbmd0aCA/IChfZiA9IChfZSA9IChfZCA9IChfYyA9IHNlbGVjdGlvbi5hbmNob3JOb2RlKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5pbm5lclRleHQpICE9PSBudWxsICYmIF9mICE9PSB2b2lkIDAgPyBfZiA6ICcnIDogc2VudGVuY2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgJ3NlbGVjdGlvbic6IHNlbGVjdGlvbiwgJ2tleVdvcmQnOiBrZXlXb3JkLCAnc2VudGVuY2UnOiBzZW50ZW5jZSB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufTtcbmNvbnN0IHNldEFua2lTcGFjZSA9IChyYW5nZSwgc2VsZWN0ZWRUZXh0LCBldmVudCwgaXNBZGROZXcpID0+IHtcbiAgICBsZXQgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBhbmtpU3BhY2UgPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYW5raVNwYWNlJyk7XG4gICAgLy8g6I635Y+W5b2T5YmN5pyA5aSn55qEIGluZGV4XG4gICAgbGV0IG1heEluZGV4ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFua2lTcGFjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB0aGlzSW5kZXggPSBOdW1iZXIoYW5raVNwYWNlW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpKTtcbiAgICAgICAgaWYgKHRoaXNJbmRleCA+IG1heEluZGV4KSB7XG4gICAgICAgICAgICBtYXhJbmRleCA9IHRoaXNJbmRleDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgbnVtYmVyID0gbWF4SW5kZXggPT09IDAgPyAxIDogbWF4SW5kZXg7XG4gICAgaWYgKGlzQWRkTmV3KSB7XG4gICAgICAgIG51bWJlciA9IG1heEluZGV4ICsgMTtcbiAgICB9XG4gICAgc3Bhbi50ZXh0Q29udGVudCA9ICd7e2MnICsgbnVtYmVyICsgJzo6JyArIHNlbGVjdGVkVGV4dCArICd9fSc7XG4gICAgc3Bhbi5jbGFzc05hbWUgPSAnYW5raVNwYWNlJztcbiAgICBzcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIG51bWJlci50b1N0cmluZygpKTtcbiAgICBzcGFuLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgLy8g5oGi5aSN5Li66buY6K6k5qC35byPXG4gICAgICAgIC8vIHNwYW4uaW5uZXJUZXh0XG4gICAgICAgIGlmIChzcGFuLnRleHRDb250ZW50KSB7XG4gICAgICAgICAgICAvLyBsZXQgb2xkVGV4dCA9IHNwYW4udGV4dENvbnRlbnRcbiAgICAgICAgICAgIC8vIG9sZFRleHQgPSBvbGRUZXh0LnJlcGxhY2UoJ3t7YzE6OicsICcnKVxuICAgICAgICAgICAgLy8gb2xkVGV4dCA9IG9sZFRleHQucmVwbGFjZSgnfX0nLCAnJylcbiAgICAgICAgICAgIHZhciB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHNlbGVjdGVkVGV4dCk7XG4gICAgICAgICAgICAoX2EgPSBzcGFuLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZXBsYWNlQ2hpbGQodGV4dE5vZGUsIHNwYW4pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByYW5nZSA9PT0gbnVsbCB8fCByYW5nZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcbiAgICByYW5nZSA9PT0gbnVsbCB8fCByYW5nZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmFuZ2UuaW5zZXJ0Tm9kZShzcGFuKTtcbn07XG5jb25zdCBTdHlsZWRCdXR0b24gPSBzdHlsZWRfY29tcG9uZW50c18yLmRlZmF1bHQuYnV0dG9uIGBcbiAgICBcbiAgICB3aWR0aDogMThweDtcbiAgICBoZWlnaHQ6IDE4cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgcGFkZGluZzogMnB4O1xuICAgIFxuXG4gICAgJjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCw1OSwwLjA1MSk7XG4gICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgfVxuXG4gICAgJHtwcm9wcyA9PiBwcm9wcy4kZGlzYWJsZSAmJiAoMCwgc3R5bGVkX2NvbXBvbmVudHNfMi5jc3MpIGBcbiAgICAgIG9wYWNpdHk6IDAuNTtcbiAgICAgIGN1cnNvcjogaGVscDtcbiAgICBgfVxuXG4gICAgLy8gJHtwcm9wcyA9PiAhcHJvcHMuJGRpc2FibGUgJiYgKDAsIHN0eWxlZF9jb21wb25lbnRzXzIuY3NzKSBgXG4gICAgLy8gICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgLy8gYH1cblxuXG5gO1xuY29uc3QgSWNvbkJ1dHRvbiA9IHN0eWxlZF9jb21wb25lbnRzXzIuZGVmYXVsdC5idXR0b24gYFxuICAgIFxuICAgIHdpZHRoOiAxNnB4O1xuICAgIGhlaWdodDogMTZweDtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuXG4gICAgJjpob3ZlciB7XG4gICAgICBvcGFjaXR5OiAwLjg7XG4gICAgfVxuYDtcbmZ1bmN0aW9uIFRvb2xCYXIocHJvcHMpIHtcbiAgICBjb25zdCBbc2hvd01lbnUsIHNldFNob3dNZW51XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh0cnVlKTtcbiAgICBjb25zdCBDb250ZXh0Qm94ID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICBjb25zdCB1c2VySW5mbyA9ICgwLCB1c2VySW5mb18xLnVzZVVzZXJJbmZvQ29udGV4dCkoKTtcbiAgICAvLyBsZXQgcG9ydEZyb21NZW51OiBhbnlcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgY29uc3QgY29udGV4dEJveCA9IENvbnRleHRCb3guY3VycmVudDtcbiAgICAgICAgY29uc3QgcG9wdXBDYXJkID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNMZWFybmluZ0VuZ2xpc2gyMDIzJyk7XG4gICAgICAgIGNvbnN0IFBvcHVwQ2FyZENvbnRhaW5lciA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250YWluZXInKVswXTtcbiAgICAgICAgY29uc3QgbWVzc2FnZXNCb3ggPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VzJyk7XG4gICAgICAgIC8v6K6+572u5oyJ6ZKu55qE5L2N572uXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dFggPSBwcm9wcy5zZWxlY3RlZFRleHQueDtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0WSA9IHByb3BzLnNlbGVjdGVkVGV4dC55O1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRXaWR0aCA9IHByb3BzLnNlbGVjdGVkVGV4dC53aWR0aDtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0SGVpZ2h0ID0gcHJvcHMuc2VsZWN0ZWRUZXh0LmhlaWdodDtcbiAgICAgICAgY29uc3QgYnV0dG9uWCA9IChjb250ZXh0Qm94ID09PSBudWxsIHx8IGNvbnRleHRCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRleHRCb3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueCkgfHwgMDtcbiAgICAgICAgY29uc3QgYnV0dG9uWSA9IChjb250ZXh0Qm94ID09PSBudWxsIHx8IGNvbnRleHRCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRleHRCb3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueSkgfHwgMDtcbiAgICAgICAgLy8g5pyA5aSnIFgg5YC8XG4gICAgICAgIGNvbnN0IG1heFggPSAoKHBvcHVwQ2FyZCA9PT0gbnVsbCB8fCBwb3B1cENhcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBvcHVwQ2FyZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkgfHwgMCkgLSBjb250ZXh0Qm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIC0gMjA7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VCb3hIZWlnaHQgPSBtZXNzYWdlc0JveCA9PT0gbnVsbCB8fCBtZXNzYWdlc0JveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWVzc2FnZXNCb3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICBjb25zdCBjb250YWluZXJCb3hIZWlnaHQgPSBQb3B1cENhcmRDb250YWluZXIgPT09IG51bGwgfHwgUG9wdXBDYXJkQ29udGFpbmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBQb3B1cENhcmRDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICBjb25zdCBoZWlnaHQgPSBtZXNzYWdlQm94SGVpZ2h0ID4gY29udGFpbmVyQm94SGVpZ2h0ID8gbWVzc2FnZUJveEhlaWdodCArIDYwIDogY29udGFpbmVyQm94SGVpZ2h0O1xuICAgICAgICBjb25zdCBtaW5ZID0gMCAtIGhlaWdodDtcbiAgICAgICAgbGV0IGxlZnQgPSBzZWxlY3RlZFRleHRYIC0gYnV0dG9uWCArIHNlbGVjdGVkVGV4dFdpZHRoIC0gNjA7XG4gICAgICAgIC8vIGxlZnQgPSBsZWZ0ID4gbWF4WCA/IG1heFggOiBsZWZ0XG4gICAgICAgIGxlZnQgPSBNYXRoLm1heCgxMCwgTWF0aC5taW4obWF4WCwgbGVmdCkpO1xuICAgICAgICBsZXQgdG9wID0gc2VsZWN0ZWRUZXh0WSAtIGJ1dHRvblkgLSA0MDtcbiAgICAgICAgLy8gdG9wID0gdG9wIDwgbWluWSA/IG1pblkgOiB0b3BcbiAgICAgICAgdG9wID0gTWF0aC5tYXgobWluWSwgTWF0aC5taW4oNjAsIHRvcCkpO1xuICAgICAgICAvLyBjb250ZXh0Qm94MiEuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnXG4gICAgICAgIC8vIGNvbnRleHRCb3ghLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgICBjb250ZXh0Qm94LnN0eWxlLmxlZnQgPSBsZWZ0LnRvU3RyaW5nKCkgKyAncHgnO1xuICAgICAgICBjb250ZXh0Qm94LnN0eWxlLnRvcCA9IHRvcC50b1N0cmluZygpICsgJ3B4JztcbiAgICAgICAgc2V0U2hvd01lbnUodHJ1ZSk7XG4gICAgfSwgW10pO1xuICAgIGNvbnN0IGhhbmRsZVNldEFua2lTcGFjZUJ1dHRvbkNsaWNrID0gKGV2ZW50LCBpc0FkZE5ldykgPT4ge1xuICAgICAgICBzZXRBbmtpU3BhY2UocHJvcHMucmFuZ2UsIHByb3BzLnNlbGVjdGVkVGV4dFN0cmluZywgZXZlbnQsIGlzQWRkTmV3KTtcbiAgICAgICAgLy8gQ29udGV4dEJveC5jdXJyZW50IS5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChDb250ZXh0Qm94LmN1cnJlbnQhKVxuICAgICAgICBzZXRTaG93TWVudShmYWxzZSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVGb2xsb3dVcE1lbnVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyBwb3J0RnJvbU1lbnUgPSBicm93c2VyLnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgICAgIC8vICAgbmFtZTogJ2Zyb21Db250ZW50U2NyaXB0J1xuICAgICAgICAvLyB9KVxuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIENvbnRleHRCb3guY3VycmVudCEucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQoQ29udGV4dEJveC5jdXJyZW50ISlcbiAgICAgICAgY29uc3QgUG9wdXBDYXJkQ29udGFpbmVyID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRhaW5lcicpWzBdO1xuICAgICAgICBjb25zdCBtZXNzYWdlc0JveCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZXMnKTtcbiAgICAgICAgY29uc3Qgc2VudGVuY2UgPSAnJztcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0WCA9IHByb3BzLnNlbGVjdGVkVGV4dC54O1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRZID0gcHJvcHMuc2VsZWN0ZWRUZXh0Lnk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dFdpZHRoID0gcHJvcHMuc2VsZWN0ZWRUZXh0LndpZHRoO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRIZWlnaHQgPSBwcm9wcy5zZWxlY3RlZFRleHQuaGVpZ2h0O1xuICAgICAgICBjb25zdCBmb2xsb3dVcE1lbnVCb3hYID0gKG1lc3NhZ2VzQm94ID09PSBudWxsIHx8IG1lc3NhZ2VzQm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNzYWdlc0JveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS54KSB8fCAwO1xuICAgICAgICBjb25zdCBmb2xsb3dVcE1lbnVCb3hZID0gKChtZXNzYWdlc0JveCA9PT0gbnVsbCB8fCBtZXNzYWdlc0JveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWVzc2FnZXNCb3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueSkgfHwgMCkgKyAoKG1lc3NhZ2VzQm94ID09PSBudWxsIHx8IG1lc3NhZ2VzQm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNzYWdlc0JveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQpIHx8IDApO1xuICAgICAgICBjb25zdCBmb2xsb3dVcE1lbnVCb3hXaWR0aCA9IDE0MDtcbiAgICAgICAgLy8gY29uc3QgZm9sbG93VXBNZW51Qm94SGVpZ2h0ID0gZm9sbG93VXBNZW51Qm94Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgfHwgMFxuICAgICAgICBjb25zdCBtYXhYID0gKChQb3B1cENhcmRDb250YWluZXIgPT09IG51bGwgfHwgUG9wdXBDYXJkQ29udGFpbmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBQb3B1cENhcmRDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpIHx8IDApIC0gZm9sbG93VXBNZW51Qm94V2lkdGggLSAxMDtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobWF4WCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKChtZXNzYWdlc0JveD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IHx8IDApKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZXNCb3g/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZvbGxvd1VwTWVudScpWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKVxuICAgICAgICBjb25zdCBtYXhZID0gKCgoUG9wdXBDYXJkQ29udGFpbmVyID09PSBudWxsIHx8IFBvcHVwQ2FyZENvbnRhaW5lciA9PT0gdm9pZCAwID8gdm9pZCAwIDogUG9wdXBDYXJkQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnkpIHx8IDApICsgKChQb3B1cENhcmRDb250YWluZXIgPT09IG51bGwgfHwgUG9wdXBDYXJkQ29udGFpbmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBQb3B1cENhcmRDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0KSB8fCAwKSkgLSAoKChtZXNzYWdlc0JveCA9PT0gbnVsbCB8fCBtZXNzYWdlc0JveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWVzc2FnZXNCb3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueSkgfHwgMCkgKyAoKG1lc3NhZ2VzQm94ID09PSBudWxsIHx8IG1lc3NhZ2VzQm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNzYWdlc0JveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQpIHx8IDApKSAtIDIzMDtcbiAgICAgICAgY29uc3QgbWVzc2FnZUJveEhlaWdodCA9IG1lc3NhZ2VzQm94ID09PSBudWxsIHx8IG1lc3NhZ2VzQm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNzYWdlc0JveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckJveEhlaWdodCA9IFBvcHVwQ2FyZENvbnRhaW5lciA9PT0gbnVsbCB8fCBQb3B1cENhcmRDb250YWluZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IFBvcHVwQ2FyZENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IG1lc3NhZ2VCb3hIZWlnaHQgPiBjb250YWluZXJCb3hIZWlnaHQgPyBtZXNzYWdlQm94SGVpZ2h0ICsgMTgwIDogY29udGFpbmVyQm94SGVpZ2h0O1xuICAgICAgICBjb25zdCBtaW5ZID0gMCAtIGhlaWdodCArIDEzMDtcbiAgICAgICAgbGV0IGxlZnQgPSAoc2VsZWN0ZWRUZXh0WCAtIGZvbGxvd1VwTWVudUJveFggKyBzZWxlY3RlZFRleHRXaWR0aCAtIDQwKTtcbiAgICAgICAgbGV0IHRvcCA9IChzZWxlY3RlZFRleHRZIC0gZm9sbG93VXBNZW51Qm94WSAtIHNlbGVjdGVkVGV4dEhlaWdodCk7XG4gICAgICAgIC8vIFgg5Z2Q5qCH55qE5pyA5aSn5pyA5bCP5YC8XG4gICAgICAgIGxlZnQgPSBNYXRoLm1heCgxMCwgTWF0aC5taW4obWF4WCwgbGVmdCkpO1xuICAgICAgICAvLyBZIOWdkOagh+eahOacgOWkp+WAvFxuICAgICAgICB0b3AgPSBNYXRoLm1heChtaW5ZLCBNYXRoLm1pbihtYXhZLCB0b3ApKTtcbiAgICAgICAgLy8gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgLy8gICB0eXBlOiAnVVBEQVRFX1BPUFVQX0NBUkQnLCBwYXlsb2FkOiB7XG4gICAgICAgIC8vICAgICBzdHlsZToge1xuICAgICAgICAvLyAgICAgICBsZWZ0OiBsZWZ0LFxuICAgICAgICAvLyAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgLy8gICAgIH0sIGZvbGxvd1VwRGF0YTogeyBrZXlXb3JkOiBwcm9wcy5zZWxlY3RlZFRleHRTdHJpbmcsIHNlbnRlbmNlOiBzZW50ZW5jZSB9XG4gICAgICAgIC8vICAgfVxuICAgICAgICAvLyB9KTtcbiAgICAgICAgc2V0U2hvd01lbnUoZmFsc2UpO1xuICAgICAgICAvLyDlj5bmtojmloflrZfpgInkuK3vvIzpgb/lhY3mhI/lpJblvLnlh7roj5zljZXmoI9cbiAgICAgICAgKF9hID0gd2luZG93LmdldFNlbGVjdGlvbigpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBwb3J0RnJvbU1lbnUucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgLy8gICB0eXBlOiAnVVBEQVRFX1BPUFVQX0NBUkQnLCBwYXlsb2FkOiB7XG4gICAgICAgICAgICAvLyAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIC8vICAgICAgIGxlZnQ6IGxlZnQsXG4gICAgICAgICAgICAvLyAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICAgIC8vICAgICB9LCBmb2xsb3dVcERhdGE6IHsga2V5V29yZDogcHJvcHMuc2VsZWN0ZWRUZXh0U3RyaW5nLCBzZW50ZW5jZTogc2VudGVuY2UgfVxuICAgICAgICAgICAgLy8gICB9XG4gICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnVVBEQVRFX1BPUFVQX0NBUkQnLCBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBsZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgICAgICAgICAgIH0sIGZvbGxvd1VwRGF0YTogeyBrZXlXb3JkOiBwcm9wcy5zZWxlY3RlZFRleHRTdHJpbmcsIHNlbnRlbmNlOiBzZW50ZW5jZSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLCBzaG93TWVudSAmJiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHJlZjogQ29udGV4dEJveCwgY2xhc3NOYW1lOiAnY29udGV4dEJveCcsIHN0eWxlOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgICAgICB9IH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiBcInJvd1wiLFxuICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiBcIjhweFwiLFxuICAgICAgICAgICAgICAgIGJvcmRlclJpZ2h0OiBcIjFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4xMilcIixcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IFwiMThweFwiXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChTdHlsZWRCdXR0b24sIHsgc3R5bGU6IHsgbWFyZ2luUmlnaHQ6ICcxMHB4JyB9LCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVTZXRBbmtpU3BhY2VCdXR0b25DbGljayhldmVudCwgZmFsc2UpIH0sIFwiWy4uLl1cIiksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChTdHlsZWRCdXR0b24sIHsgb25DbGljazogKCkgPT4gaGFuZGxlU2V0QW5raVNwYWNlQnV0dG9uQ2xpY2soZXZlbnQsIHRydWUpIH0sIFwiWy4uLl0rXCIpKSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFN0eWxlZEJ1dHRvbiwgeyBcIiRkaXNhYmxlXCI6ICh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCkgPyBmYWxzZSA6IHRydWUsIHRpdGxlOiAnXFx1MjZBMVBybycsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICcxMHB4J1xuICAgICAgICAgICAgICAgIH0sIG9uQ2xpY2s6ICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhbmcgPSB5aWVsZCAoMCwgbGFuZ18xLmZldGNoY3VycmVudExhbmd1YWdlKSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0TGFuZ3VhZ2UgPSBsYW5nWyd0YXJnZXQnXVsnaWQnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLnBsYXlUZXh0VG9TcGVlY2gpKHByb3BzLnNlbGVjdGVkVGV4dFN0cmluZywgbGFuZ18yLmxhbmd1YWdlQ29kZXNbdGFyZ2V0TGFuZ3VhZ2VdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TWVudShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbGVydCgnIFlvdSBhcmUgbm90IFBybycpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuQ3VzdG9tZXJTZXJ2aWNlT3V0bGluZWQsIG51bGwpKSksXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChJY29uQnV0dG9uLCB7IHRpdGxlOiAnXFx1MjZBMVBybycsIGNsYXNzTmFtZTogJ2xvb2tVcEJ1dHRvbicsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke2ljb24xMjhfcG5nXzEuZGVmYXVsdH0pYCxcbiAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiBoYW5kbGVGb2xsb3dVcE1lbnVDbGljayB9KSkpKSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy51c2VDdXJyZW50TGFuZ3VhZ2UgPSBleHBvcnRzLkN1cnJlbnRMYW5ndWFnZUNvbnRleHQgPSB2b2lkIDA7XG5jb25zdCByZWFjdF8xID0gcmVxdWlyZShcInJlYWN0XCIpO1xuY29uc3QgbGFuZ18xID0gcmVxdWlyZShcIi4vbGFuZ1wiKTtcbmNvbnN0IGFzeW5jRmV0Y2hjdXJyZW50TGFuZ3VhZ2UgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICByZXR1cm4geWllbGQgKDAsIGxhbmdfMS5mZXRjaGN1cnJlbnRMYW5ndWFnZSkoKTtcbn0pO1xuLy8g6I635Y+W5b2T5YmN6K+t6KiAXG5leHBvcnRzLkN1cnJlbnRMYW5ndWFnZUNvbnRleHQgPSAoMCwgcmVhY3RfMS5jcmVhdGVDb250ZXh0KShudWxsKTtcbmNvbnN0IHVzZUN1cnJlbnRMYW5ndWFnZSA9ICgpID0+ICgwLCByZWFjdF8xLnVzZUNvbnRleHQpKGV4cG9ydHMuQ3VycmVudExhbmd1YWdlQ29udGV4dCk7XG5leHBvcnRzLnVzZUN1cnJlbnRMYW5ndWFnZSA9IHVzZUN1cnJlbnRMYW5ndWFnZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy51c2VVc2VySW5mb0NvbnRleHQgPSBleHBvcnRzLlVzZXJJbmZvQ29udGV4dCA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSByZXF1aXJlKFwicmVhY3RcIik7XG5leHBvcnRzLlVzZXJJbmZvQ29udGV4dCA9ICgwLCByZWFjdF8xLmNyZWF0ZUNvbnRleHQpKG51bGwpO1xuY29uc3QgdXNlVXNlckluZm9Db250ZXh0ID0gKCkgPT4gKDAsIHJlYWN0XzEudXNlQ29udGV4dCkoZXhwb3J0cy5Vc2VySW5mb0NvbnRleHQpO1xuZXhwb3J0cy51c2VVc2VySW5mb0NvbnRleHQgPSB1c2VVc2VySW5mb0NvbnRleHQ7XG4iLCJleHBvcnQgZGVmYXVsdCBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSUFBQUFDQUNBWUFBQUREUG1ITEFBQUFDWEJJV1hNQUFBc1RBQUFMRXdFQW1wd1lBQUFBQVhOU1IwSUFyczRjNlFBQUFBUm5RVTFCQUFDeGp3djhZUVVBQUFqS1NVUkJWSGdCN1oxUGJCUlZITWQvVmZuVEtMUnNRQUpOeWdEZVRFTUozS3hKbTRnWC8rRUZrM3FnUFNsZWJHL2x4SEtDZUdtOVFEeTFYRHg0YVZFNGNiQUVycVpGNWFoTVNaU1lrTkpHU0RWVjZueDNkN1p2eHBuTzd1ejc4OXQ1NzVNOGRtWVdCUHUrOC92M2ZtK0d5T0Z3T0J3T2g0MTBiUEhkWURETzFqNzlZS3dFWTZuMjZRdlh3azlIRzVJbWdBdkJLRk56K09TRTBuWWtDV0FrR05Pa0RwK2NVTmlRSklEdnFXcjJUZU9URTRweWtnU3dJWjZjRytpbTRaTzdhSFh0ZVdVOGZMSWVqSDhxbitLMTFiK2VreUY4Y2tMSlRhWUFsaTRlb2E3T0Z5aUx1aENjVU5xS1RBR3NmUEVheWNRSmhSY3ZrV1pnVGZvNmQyVCtQb05DOFdvakM1OEtJQlR0QW1nVUp4UTlzQlZBb3ppaHRFYmJDNkJSQ2lLVXhkcTRGb3g1a29EMklMQW9NQWhtL1dCY0RNWU10WUFUZ0dJMENNV25Gb1RnQk1DRUxLR0U1MXN3RTR4eGFqSk9jQUpvSXlDRXU3K3MwYzM3VCtuckgvNU0raTErTUlacW53M2hCTkNtUEZ4ZXA4dTNscE9FNEZNVEluQUNhSE1naEhlLytpM3VIbnhxVUFUWlJYNEhhM3BMMitqSDh4NmRlNk5idk93Rll6WVkzVmwvM2dtZ0lGejZZQzlOdkZVU0wvVUhZNEV5YWd0T0FBVmk0dTBTRFovWUpWN3lxTnJmNGFYOUdTZUFnbkhwL1gzVXV5ZFM0UFdvS29KRWQrQUVVREJROHI1eVpuLzhzaGVNeWFUZjd3UlFRQWFPZHRMQWtjNzQ1WkhhaU9BRVVGQW1UcFdTTHNNS1JGeUJFMEJCZ1JXSXhRSUFrejhtWG5BQ0tERHZ2UDVLMHVYUHhSTW5nQUtURUFjQVdJSEI4TVFKb01EMDlXeFArK3BzZU1DcUl3Z3JYWGQvWFNOSDllNkZIMitGcnAwdnBuMTFPaGlqT0dBbGdLdDNWNEtsem1ma1FFRm5iK3NDU04vUEFUZmdCY05uNVFLdzN1Mm8wbmN3dTMreFJUejh3c29DL1BUNzMvWGovdjUrNnU3T1hNd3FGUFB6OC9YanJwM0s3MDBQdjdBUlFLVVZTdWlMbTU2ZXJvakFGaFlYRituNDhlUDE4OTQ5MjBnSGJGeUFlUGNEbXlZZnJLNnUxby9odXh2Wmp5a0ROZ0lRL2I5dGt3OGVQSGhRUDlaMTl3TStGdURScGdXd3pmZURwYVdsK3JHdXV4K3dkQUUyV2dEZjkrdkhWbG9BMFFWNG5rZTJFUldBdnRpY3BRVTRkdXdZMmNiS3l1WitEdXNzUUR3RnRERUdRQm9ZMGx1eXpBTFluZ0tLZHovUVVBU3F3OFlDaE5nWUFONjdkeTl5cnFFTVhJZUhCVkNjQWw2L2ZwMDZPanFrRGZ6M1pDSmFBSjBwSUdEbkFsUllBTEhHTG9ORGh3NlJUTVFNUU9mZEQ5aTVBQlVwb0JoZ3lVQzJTRVVCNlBUL2dNVmlrT29VVUJRQWV1YWJYV2UvK2ZOVE92L2Q0OHF4Q2d0bHFnZ0VqQXRBZFFxSXlSZDliTi9CN1UwWFdsU25xSkVhUUVudmxCaDNBYXBUd0hpTlBZK1BWUjJqbUxRQXhnV2dPZ1VVQThDOEFkYkQ1YzI5OXlwaWxFZ00wR2xaREtBNkJSVDlmOStCbkFKNHNsNC9McGZMTkRVMVJhckkrMi9NaTNrQktEYXZvZ0R5TkZuR24rQUZmeDJ2M01uRXVqcUF5aFF3SGdEbVdXVVR6YjlxZE5jQUFDc0xJRHNGbEJFQVFqUlh6cnhLT3VqcWZKRjBZMVFBcWxOQUdRRWduc0V6WE5JYm1ldkVxQUJVcDRDaS80Y3B4OU8wT0ROOFluZmw3U3c2TVc0QlFsUUhnTlVuYmE0VFovQjZIdDBZRFFKVnBvRHhBTEFkMEowQkFEWXVRTFlGUUVhQnpTV2NRWkNLdWtLSTdob0FZT01DWktlQXNDZ2pJeVBFR2JHdlFPZG1FQkd6THNEeVJ0QklsZEpBRFFBWUU0QnJCRFc3Q0JSaVRBQzJONElDVTNzQlJJeGFnQkFiSng5WTdRSnMzd3NZWDFTeXpnTFl2aGZRWkN1NENBc1hZT05lUUZOYndlS3dzQUMycDRDNit3QkZqUHpOOFNZTFZNUnUzNzVObklGSVpjWXFNanFWWkdCR0FMRW1DKzRWTzdDd3NDQTFWakhaQ1N4aXhBVndYNVZMUXVWU3Rha0FFQmh5QVpzV0FEdGhUTlRBc3hBcmxiSW5QNTRDNnQ0TkpHSkVBR0lBMk5lemcyNTgwa1BjT1AvdDQ4cVRTNEhzTElWTENnaU1TRTlNQWZGOFlQeXd1YUd5VGlFK0Vjems1QU1XTVFEdU5HNFBpVllwQUZOUEJFdkNrQUQrMzJyOThiVkhXUzlIMWtaOHBWTDJkbkF1S1NEUUxvQzBEQUEvOU0rKytZTTRvSHFsTXJJS1dETGJtYS85YjQvWEFDWW5KMmw4Zkx4eUhNWUQ1OTQwdXpna3VpUFZtMEZOeHdENkJTQllBUHh3eDhiR0txMVJZUTgvNG9Fdyt1YUE3QXdBazg5bEhRQVljQUdiRmlBc3JjN096ckpkRUZJWkFBSlR5OEFoUm1PQWNOSWhCSzRkdkVXdEFJWVlqUUhFdTM1d2NKQTJOamFvNkhCb0F4TXhhZ0ZzYkFTSkxBUHZNYi9uMEdnTTBOWFZSYllSZlY2UmVSZWdWUUR4R3NEaHc0ZkpOcmcwZ29Ub0ZVQ3NCaUM3d3NhZCtQTUtUVmNCZ1ZZQjJONEtMcjRYQ0hCWUJ0ZjZMN0M5Rlp6VEttQ0lzUmpBeGs1Z2NUTW9oeFFRR0lzQmJCTUE4dis1dWJuNmVjcXIzYlZqTEFhd1NRQ1kvS0dob2ZvNThuL2RqNEpKdzFnTVlFc0dnTWdma3k5V0FDZE9sWWdMMmdSZ1d3MEEreHhHUjBjcnI0T05UejZYdXg5b2kwVGlOUUR4MFNoRkFwVSszUFhpcElkZzhqbmQvVUNiQU9LdmhwK1ptU0ZiUU52M2xZLzJCNEhmeThRTmJRSVEvYjh0WU9MeDZEZDBPSEhjK3dDMENRQ0ZqK0dUdTZub0lML0h3UDh2bDJMUFZtZ1RBTXdmUnhOb096enRra01iVGdDV2t5U0E5bnErcXFNbGtnUVFXYlBrc2x2SG9ZWWtBVVM2RmxiWC9pVkhjVWtTd0x4NHdtM1Rwa011bVJiZzV2MW41Q2d1YVJhZ0hnaGlvMlM4ak9zb0RtbHA0SmZoQVNhZjAxNDloMXpTQkRCRmdoV0FBSndWS0NacEFzRGtSNnpBNVZ2TDVHZ3ZydDdKdHR3ZFczeUh0dDJGWUhqaGhSdWY5dERBa2ViZnZ1bVFRMWlUcWJ3QWEzazlkaTM5dXhSR2d6R3psUUFBbXZjWHdoTXNhZDRaNjJYVDBkcXVTSjdJdkRRa0FEQVdqTW53QkEyTnNBUk9CR3dtTWk4ZkJtT3VFUUdBY2pBdWhDZXdCSmZlMjhlcXQ2MFYybndpODRLbVRMOVJBWUF5Q1NJQWFQQkFqeHNYYTJEcFJPYmhJbFhuazVvUkFJaTRneERaUW5BVHFaVDY1SU5tQlFBU1JRRFFBalZ3dEpQNkRteXZ2SFFad0YwZ2pYUVRxUVhrZmF1MVR3eS9kdDJ2bmM5UWJMay9qd0JBbVdMdXdDR1ZySWxjU2ZtdWFmSUtBSlRKaVNBTGJST1psMVlFQUFhRGdjZDdlVlJzMkU5a1hsb1ZBUENvYWczT0VuOEtPNUY1a1NHQUVJLzBDY0ZOcENSa0NpQ2tPeGlucWVvZStvT3gxU3ZCM0VRYVJvVUFrdkJvTTA3d1k1OE9oOFBoTU1KL0VPU0NGZ0FXOCtJQUFBQUFTVVZPUks1Q1lJST1cIiIsImV4cG9ydCBkZWZhdWx0IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFjY0FBQUNwQ0FZQUFBQmVkZllzQUFBQnAybFVXSFJZVFV3NlkyOXRMbUZrYjJKbExuaHRjQUFBQUFBQVBEOTRjR0ZqYTJWMElHSmxaMmx1UFNMdnU3OGlJR2xrUFNKWE5VMHdUWEJEWldocFNIcHlaVk42VGxSamVtdGpPV1FpUHo0S1BIZzZlRzF3YldWMFlTQjRiV3h1Y3pwNFBTSmhaRzlpWlRwdWN6cHRaWFJoTHlJZ2VEcDRiWEIwYXowaVdFMVFJRU52Y21VZ05pNHdMakFpUGdvZ1BISmtaanBTUkVZZ2VHMXNibk02Y21SbVBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHhPVGs1THpBeUx6SXlMWEprWmkxemVXNTBZWGd0Ym5NaklqNEtJQ0E4Y21SbU9rUmxjMk55YVhCMGFXOXVJSEprWmpwaFltOTFkRDBpSWdvZ0lDQWdlRzFzYm5NNlpYaHBaajBpYUhSMGNEb3ZMMjV6TG1Ga2IySmxMbU52YlM5bGVHbG1MekV1TUM4aUNpQWdJR1Y0YVdZNlZYTmxja052YlcxbGJuUTlJbE5qY21WbGJuTm9iM1FpQ2lBZ0lHVjRhV1k2VUdsNFpXeFpSR2x0Wlc1emFXOXVQU0l4TmpraUNpQWdJR1Y0YVdZNlVHbDRaV3hZUkdsdFpXNXphVzl1UFNJME5UVWlMejRLSUR3dmNtUm1PbEpFUmo0S1BDOTRPbmh0Y0cxbGRHRStDancvZUhCaFkydGxkQ0JsYm1ROUluSWlQejRlUXJEZUFBQUJYV2xEUTFCSlEwTWdVSEp2Wm1sc1pRQUFLSkYxa0U4b2czRVl4ejlqaUUxUmxPU3dsREtOWmx0eTNTZ1VXclBsejBHOWV6ZWpabjY5bStRbUYrVXNSeWZKeVhVbEJ6ZFhwU2luWGVTZ1hOUXVyTmZ6YnRoR25ucDZQbjE3bnQvdjJ4Y2FuSnBTYVR1d21ja1prYW1RYTJsNXhkWHlqSjFtSEF6UnF1bFpGUXlIWjJXRjcxbGZ4WHRzMXJ3YnR0N3lIcnlzM2x6R0NxWDJUaTcyVDZiLzd0ZFZXeUtaMVdWK1NBZDBaZVRBNWhVTzcrU1V4WHZDWFlhWUVqNnlPRlhoYzR2akZiNHE3MFFqRThLM3doMzZ1cFlRTGdoNzRqVjZxb1kzMDl2Nmx3Zkx2VE9aaVMzSTdKSHVZNTRvUGdKTU1VZUlVY1labEN6Yy85d0V5amNUYktIWXhXQ0RGT3ZrY0JFVVJaRW1LVHhEQnAwUlBNSSt2TkorSyt2ZkdWYTF3MWVZSEpPdnVxdmFqUGcvM29EZXA2cldmd29EY2NqN2xXWm9QOG5haXZic210OVhZVWNlbW81TjgyMFJXdHhRZWpETjk3eHBsczZnOFJHdWk1K3hoR01xSEp3V09RQUFRQUJKUkVGVWVBSHRYUWQ4VkZYMlBwT1pkQ0QwRXFvMFVSQlVWQkRiV2xBRUZVVHN2WXV1OWU4cTdxb29LRml3Z0s1ZGQ5SFZGYnRyUlJHN0NNZ0t3bHBvMG9QMGhQUk1adjdudTIvT3pNdGtKcGxKM3FTUWMzOTVjM3Q1MzdrNTN6djMzZmVlcTIzckFYNVNwd2dvQW9xQUlxQUlLQUpCQkpLQ0lRMG9Bb3FBSXFBSUtBS0tnRUZBeVZFbmdpS2dDQ2dDaW9BaUVJYUFrbU1ZSUJwVkJCUUJSVUFSVUFTVUhIVU9LQUtLZ0NLZ0NDZ0NZUWdvT1lZQm9sRkZRQkZRQkJRQlJVREpVZWVBSXFBSUtBS0tnQ0lRaG9DU1l4Z2dHbFVFRkFGRlFCRlFCSlFjZFE0b0FvcUFJcUFJS0FKaENDZzVoZ0dpVVVWQUVWQUVGQUZGUU1sUjU0QWlvQWdvQW9xQUloQ0dnSkpqR0NBYVZRUVVBVVZBRVZBRWxCeDFEaWdDaW9BaW9BZ29BbUVJS0RtR0FhSlJSVUFSVUFRVUFVVkF5VkhuZ0NLZ0NDZ0Npb0FpRUlhQWttTVlJQnBWQkJRQlJVQVJVQVNVSEhVT0tBS0tnQ0tnQ0NnQ1lRZ29PWVlCb2xGRlFCRlFCQlFCUlVESlVlZUFJcUFJS0FLS2dDSVFob0NTWXhnZ0dsVUVGQUZGUUJGUUJKUWNkUTRvQW9xQUlxQUlLQUpoQ0NnNWhnR2lVVVZBRVZBRUZBRkZRTWxSNTRBaW9BZ29Bb3BBbzBEZ3NiL2ZRNDg5ZmsvVXNTTC8zaW0zUnMyUEowUEpNUjYwdEt3aW9BZ29Bb3BBdlNHUWw3dWJ6anA3ZEVTQ0JER2VkZFpveDhibXpraHZmNWRqcldsRGlvQWlvQWdvQW9wQWdoQ1krOW0zMUsxN1owT1EzYnAxcG84K25HdDZFbUo4OWRWMzZlYi9tK3hJN3g1SFd0RkdGQUZGUUJGUUJCU0JPa0RnMm10dU43M0FnaFFIaXhIRUtIbVNYaHRmeWJFMjZHbGRSVUFSVUFRVWdUcEhRRWhRQ05KcFlzUUpLVG5XdVZpMVEwVkFFVkFFRklIYUlpQUVpWGJzNGRxMksvVmRiVnNQOEV0RWZVVkFFVkFFRkFGRlFCRWcwdDJxT2dzVUFVVkFFVkFFRklFd0JKUWN3d0RScUNLZ0NDZ0Npb0Fpb09Tb2MwQVJVQVFVQVVWQUVRaERRTWt4REJDTktnS0tnQ0tnQ0NnQ1NvNDZCeFFCUlVBUlVBUVVnVEFFbEJ6REFOR29JcUFJS0FLS2dDS2d6em5xSEZBRUZJRW1na0JqZVdyTjFVVGswYkJQVThteFljdEhSNmNJS0FLMVJzQlBHU2srNnRleGxOS1NmYlZ1TFpFTmxIaVQ2TmVjRkNvb3hhS2VrbVFpc2E2dWJTWEg2aERTZkVWQUVXaWtDRmlXNHVoQnUybkNpZHNva3dteU1iaENKc1lIWnJlaHQzNXNFUml1a21SOXlFM3ZPZFlINnRxbklxQUkxQWtDZzdxVTBOMm5iR2sweEFoUVlPVk9QR2tySGRpdHVFNHcwazRpSTZEa0dCa1hUVlVFRklGR2pZQmxOWjR5S0krU0dxSGg1ZUl4ajk1L2QwQUNqZVZlYWFPZU1KVUdyK1JZQ1JKTlVBUVVnY2FOUUloTTJqVXJiN1NuMHJhWjF6YjIwRG5aRWpXWVFBU1VIQk1JcmphdENDZ0M5WWVBbi9rRUZsaGpkUmc2emtGZC9TRGdhZDI2VC8zMHJMMHFBb3FBSXVBNEF2NEFvWUJWL0pTY25NZCtnZU85MUVXRHlja1oxTHAxTCs0S05Pa0tFSDBqWnZ1NkFNM0JQblMzcW9OZ2FsT0tnQ0xRZUJCWXViVVo3U3hNNFFIWEYrSDRLU3U5alBxMmwzdUxqUWU3cGpCU0pjZW1JR1U5UjBWQUVhaUV3TFB6ZXRKM3Y3ZXJtRjRYNjdDMnRkSWhQYmJSdE5GTEtvNUJZdzBDQVNYSEJpRUdIWVFpb0FqVUd3Sk1pQ0hiTVJSS3pIaXNHNkhtVnFJaHlVVDNsNWl6YUFxdGVvcExGamVGODlSelZBUVVnVDBHQWR4L2N6T2hwVkpTVWdZZkxmaG9YcU96Y3hsTFVRaks4cXN5SHQxdU45L0hUQ2FQeDhWOUpwa0RIZnQ4UG5ONHZYNHFLeXVqOHZMS3UyUXRneEY5K0MweWxtNXJOSEt0bEdnRTFISk1OTUxhdmlLZ0NEaU1BRGJkZUpsaXZPUXI1ODAyNVZ1WkxOUEk3VzVISG5mcm1Qc0tFYU5zZHBHcWxWa3JOVFdaVXROU2dtUW9KY1ZQWXRMRTRVa21Ta3RQTVVSWlVseEtKU1ZsVW9USEtGdFBYY0ZkcUhhYk5WaFFBdzBDQVNYSEJpRUdIY1NlaHdBVVlXVWx1K2VkWjhNNEk3Ky9tTHplOVV5V084anQ2Y3dQL3FmRlBERExVclRMS2hTR3BaaVJrY3FXWW55cTBzMVdaVWFHaDFKU3ZGUllXRkxKa2dSUjJtNDl4anhXTFZoM0NNUW44Ym9ibC9ha0NEUnlCRUlLdHBHZlNLTWF2czlmUUw2eTVVeG1YY21kMUxLYXNVTkdkamxWdENCVFVwSXBNek85bWphcXprNU85bEJXbG9meUM0cW9yTFRNOXBnSjkxelYrbTNWemRaYkxpejI4ckt0VFBhNzJUb3VZT3U5bEJIa0pXWlhNcms4emNqdDRpVnVUeHMrdDhaUExZMy9ET3B0bW1qSGlvQWkwREFSd0gyL2RVVEpzb3daZlpRaHE5Rk9qQzYyK0dwUGpQWmVtMlZtOE5PV2hWUnFDRklJdWZyeDJkdW83M0JCL2xvcUtselBTOHY4L0dnS1c5TnVGMStBSkpHZjc3ZnlYVmNxOSthUjE3K0xYQ1hyS0RtMU15OHhaOWYza0d2VnY1SmpyZURUeW9xQUl0QlFFU2dyMjhDV1RieGY0bUNGejB1cHRiVVlJMkdTeVFSWlhwN1B5NytWTit0RUt0OVEwcEpjWGpweWNESjF5T3BKYXplMXBJMWJkOVBHTGJ0b055OFhGeFdWa0o5UEo0V1pKRGt0eVZpUlByK1B2S1U1Zko2N0tEVzFKN21TWWwvaWJpam5qSEVvT1RZa2FlaFlGQUZGb0FJQzZlbldzbVpSVVZHRjlOZ2lmRi9QRjl1WExld3JuTGpIR0l0cjE3NjlLYloxeTVaWWlwc3lhSHYzN3NKR2M3L1I3eStqWGoyOE5QNk1nNG5Ldk5TamEwc3EzbDFFT1Q5dnBFMjhaTHpzOXgzMEE0ZVhyOXBDbTNmazhsSnJHV1UxVCtlTEFLTENvdDFzS2Y5Q3padnYweWdKVXNreDVtbXRCUldCcG9mQTZXZU1NeS80ZlAzMU4rdmw1UGZmZjMvVDc3eDU4MnJVUDNhMHh1T3dLeldXelRmNzdqZUFqaDk1b21uNmt3OC9vcCtYTG91cEc3U05KZHVTa3RLWXlrdWhpVlB1NXVWTTZ4NXBQUGNxSjA2NFE1cW9rVjlTdEpuYXQrNUUzWmdVbjM1NUhoMlMyNTRHZEdwbDdxTjI3dEdXaHZWdlQxZU9IVVRGaGVYMDlaSWNtajEvTmVWc3phVnZGdjVHZS9mcVFEMjdkS0I1UDY2aHRNeCtOZXEvUGlzcE9kWW4rdHEzSWhCQTRNSUx6NmVoUTRkV3dPT0Q5eitnOXovNDBLVDE2ZHVYYnJyeGVucjRrZW0wWXZueUN1VVNGYkdQQ1JiY2l5LytLMUZkUlczM3BKTkdzcFhscDVxU1k5U0dvMlNrcHNWbU5mWWZNQ0RZUXE4K3ZXTW1SMVJDSC9HU1k3Q3pPZzNzWkV2UTJraVU1Q3FqRVVONjBhZi9YVWtET3pTbjBtUitiTVhOajlLVXV1bC92NjZuamR0M1U3ZnN0blRkdUFNcFowY1JEVHRnTCtxVjNab2Vtam1YU3IzNTVPWmwxdVNVVG82UC91ampqcVkvSFhjTWZURm5MbjArNTNOSDIxZHlkQlJPYlV3UnFCa0NJRVpZWitzM2JBZzJzR1A3OW1DNHJnTW5qUnBKZ3dZTm9pVkxmakpkdzRMYnNYMUhrS3pyWWp5NElHamQybnB1RWVGRVh4UjRQRzZ6d1NUU3VXRUo5WUNEQmxPTHJDeVQzVGF3cElwSWw2N2RhTnpaWjVuMHZOeGMrdkdIUlZUVlVpczJzYUF2cnpjK3F4WWQzSFhibmFhZlNEOTMzemM1VW5JTjAzeTg4elNQclZ3M2xmdVQ2ZDVuZjZLTGp1L0tqNldVMFplL2JPUm5PbFBwODk5eUtPZVBZaW9vOXRHQi9Uc1RaMUZaWVRGMWFKZE9mMmFzeHQvNUhxMWF1NVdYVlpQSlc1YkRHM1RhT2I2TEZjUUlCMS9Kc1lhaTFtcUtRRU5IQU1TWWFBS0lGWVBGUC8xRU9QWWZPTkJVZWYzMU55ZzlvM2FQTmNUYXQ1UWJkdWdRMmhpNFdFQTQwZGpnelRmUjNBRUhENlo5YmRhaXZSd3N3UzdkdWdhUzJPZlZ6MDgrK01oZXBGSVlmZFdFSENzMWxLQUVOeFh6NHhrcFRHWStHamE0SjgxODdVZGFzejZIL25ycG44aGZ0Sk9LbWRmZitYWUZuWC9pQURya29KNTh6ajYrdjh1N2IwSDRmTC94MTk4MjA4SmYxbFB6RnFuRzh2ZGprMDdaRHJZZXJmdTBUZzBiRnFOWWprNjFLZTJvNVNoSXFLOElORUFFdW5UdFFtMWJ0NkVDMjRhVS9kbWkyN1pqTzIxWUg3SXluUm82Mmg3Q1JKVEp5Nml2dlJHNnp3aGlQR1BjYVdZYzgrZk5wOFZMbkg5Wk5zNDFJODBpNEQ1Nzl6WEx6TEtVZThFRjU5SDZkUnRvUTRBc0M0dUxIRDkvanlmNjUyMnpXbGdXWXl3NHgxSzJxcjVpNlNQUlpaS1QrUzArdmpScTBjeERnL3RsMGJLK3ZOTzI3ZDVFelpwVGozWStLaTF6MGZTYmg5TXZxM2JUVS85Y1NDN2VuTk1pZ3lpclZRWWRjMmhQV3JOcEp6L2JXVUJwYVI1ZW1zVzlVbjdrdzUvUHZyUGtDR3ZSYVl0UnNGVnlGQ1RVVndRYUlBS25uejZPdW5icFF1Ky9iOTE3UkJqMzRXQmxQdkx3bzQ2T0dPUjA1VlZYMFBJVksvZ1JpTXJPejFzNk16SXlUSmw3cDB4MWpKemF0R2xENDduZnpueHVkb2R4TEY1c3ZmdDVLQk8yMlJ4a0t3Q3I4c21ubnFIdERpMC80MTJwZGVYcXNxK2FuSlBQVjhpV1hobTFhOXVDdW5iSW9Idi9NcHkyNVBuSlRYbHNOYnI0ZnFPZkZxL05veG12cktRRjMzeExsOXg2RzVVem9lNlZ0Wnp2cVNiVEg5c0xLRGVYbitzczhUQkJzZ1hLZy9BMHNsY0NLVGtHWnc3VUFVUllYMDc3YjhyNDQwWFYySGdTN3A1NjhtbXpFZWYwMDA4eithZWRkaXB0MnJpUmtPNnM4N01TU3pkOTJFa1h5Nm9ZRjZ4VVNYL2lpY2NwUFozTkJJY2N5RzNhUTQrWTgrelN0YXU1ci9saFlDT1NkQ0Y5aitJZG9xTk9HbVV3ZUlndkRtcjJpSWUwR3NJYjV4amFCU3Jwb2cvODlNVm5jeWtsTllYMkgzd2c5ZTdiaDh2Q0V2SVpINjBoalBtTE5uQS9jdXlaWjlDdi8vdVpmbDRXZVJkclF5ZkgwakplT3VWN2lWbk5NeW1kOXlnVjVoZFFhMzZPTVRlL21JcjhMc3BNYzFITHpCUTZjMFF2YXBkWnlOWmxPaDNZeFU4WnZrN2tMeTZtdEl3VU92bjRBNmhydXl4NmU4NVMzcFJUeGk5c2QvN2lRemZreUZ4T3FDLy9DQW50cElyR3RmOHF3S21EclByRkg4b3lwSnhEcHd2bGp4MnEyS2tLeXlwbjB5WVRyeDBwaE5vUGhTekZIb3Bib1VpRWpYRkdTZyt2RzArOG1CWHFsS24zRTNiSVlqTlEyemF0SysyT2xkMnozMy8vUGMyYytWSTh6VmRiRnM4NWh2Q1h1V0M5L3hSNXNzRm0yOWF0MUdmdnZYbXBFTVFJSEVJRWlhOXQ0UG9taFI4SDZkcTlLM1hyMGQzVWs3cklieXpPN2NZakxWN3lsc3NqSnk2K25lam5oL3B4Rm53aHg0K2taTGQxMFY3WnpXbkVFY2Z5bTNNMm0zdU54ZDRrM3NqanBlR0g5YUFSUis1RFdjMVM2S2ZsVytqWE5YL3cvY1owS3VQN2tVNjZSRzdJY1o3S25UeHpiVXNSVUFTTWRRU0NuRDkvUG9tMWhLVklXRkNKZGlDQUVHbFl2Vlcwc3B3ZEFVaHY4ZUlsNW42anZBQUFQU0E4Wk1nUXMzdldPV0lFQ1lZSUM0UUhaeEUvMHVYY2hTeE50c2tQNFdJUnBGWFd1c0N4ck1wUTJVREk4c3d2djdjbjBKY3RzVUVGaTRySytRSCtZbHIrK3paYXYzVUhOYy9pbHhjVWxQSnIrWGpzZkVGUXprUlp6aFprUGx1WEJVWDhqbFUzRHgrZkVjTmFKRy9rTVVTYVZrNUxmOTVDYXpiK3dZVHA0dzArc1QwbUV3OFEySkFESjM0OGRhc3Iyd2lYVmExSlc5Mkp4WlpmazdacVVpZmFhR3JTVmszcWFQK1JFYWdKbGpXcEU3bDNTekZYVkx6UlNzSlN0RWpCNnI4MWsrUElFMGNRbm9Xc3VhdDhMdUVXNGJ6djU0YzFqenBPdWNyOW8rV1NrbUp6SHhIbjNMdFBIOVBaU3I3L2lPWFhnZ0pzNm5ER1ZUeFhWOEFhdEFqT3VnQUluV3U3OWgzWThrbmh4emtPNE02eEJKc1VLSSt4V0RLMHJFbGlVdkhTK3JWcmFOV0tsUVJMTTBUQUlUTDIrV0JDaGRwSEt3M0puWGZSbVpTWHU1VXZ5SmJSMUdlK28vdHZPSnl5Mm1UeU9UTXArcnhVVXNyM24va2VZeExIWGJ5UkNYaDUrWnhTUENtY3h3LzlwN1htUjM5Y05PbUpUeWh2ZHk0MXkyak9WcWp6NTl0a051UllFekpjV1lUL0E0WG5oMDhwS1M5K3RIeWsyOXVTSlJSN0dzcUV0eE9lanpKMkorWEZ0K2NoYkUrM3Q2WDlZMGtxM0VxcGlCZndzMk9HZUxnVGZNV1BsbzkwZTF2MWkzOEI3K3pyM0lrZmtnNHUxMW4zd09SL0FyN2RkY25Pam5LL1RjNWJmSHN0aE8zcDRlZHZ2KzltMWR1K2ZSc0g3T1dzY1BoNHJOTDRsZmJGRCtWWUlYdTZ2ZDBRL3RoMHRKN3ZjV0tINmlHSEhHSytvWWlYQUNDdGE1ZXU0UTJHeGRFK25MMGZLeVg4TnpUWHJMN0x5cnhoYjhleGxvOVI3cWhqanFaczNyQ0VKVlk0Nng2amhLMCtVUTRFdVhYelpucnZyWGRzWldWZW94OXJYTENzS3VKcXRkVlFmcE5jR1RUbGdSdDR1VFNmbGl4ZVNkdGRPWlR0M1VCdVB5K2Jwbm9DOXc5NXZ2REx4MTArL2dDMHA1eVMrYkdOWGR2VzAydnZ6K1g4dGpUelRYNE9jbHN1cGJnOWJIR1c4TXZJb3o4cTAxRE8yejZPQm1VNXltUVZoV0FORkxNeGZDSlprekUwdWV6NThnOG52cHl1dll6VVI1NlV3eEtLVmRicVgvS1FhSytMZEtrdmRlMzVraVkreXNQWnkwaDlwRXM1N2I4cDQvL2hoeC9UL2dmdVQ0TU9HRVNkbWZpd0sxUTJiVmdXaVRWUFNrcEthTzI2ZFpnNDlNRUg4aXlkZlc2RjVwTXBGUHl4bDRrMi95d3lxRzcrVjE0U3RMZGRtLzZ0NWRNT0hUdFNSNzVRd0xsK3hLOW13M2lPT2ZZWXM3UUtUTkxTMG5pekNONjFLbjJGOTIrUEJ3R29GRUM3NGpEMzhFSndLOG5hWElQL1dhU2puSlNGeFlqTlU2dFhycUQzMy80UDU3dG8xSmlUcVZlZnZ0eFU2T0pDZEJuYXQ3N2RLSGxXVzJWbHVKY1g2aC9sR3BMNzRQMkZkTTdsWTZoRjg1WTA4S0Q5cUt4a2I5cTliaWtsNTYyZ0ZQNklNOXYzWnZSSnFlbVV4STl4Yk5sWlFvOVArNXBhdEZ4Tkt6ZDVxWG42T243WGFpbkxESVNZWkpaVWZYN2V4Q1VpYytoa205Q0dIR3RTV3hQTFBzR0JxSDBpV1Foandsb0tOWlNQeVcybFlWSWpMSG1ocTBDckxhc05oS1dPK0toanRTMTlTaHNpVWF1dTlxLzRPelgvUHY5OExzMmRPNWZ3bkNFZXA0QUNGaElDSVVnNGhaZjJ2cGo3QlMzaEIvU2RuMytXNGdZeEZ4WVdHcVZ1emZqUS9NZU9WbEg4enZkUDFKZVhVZkZWakI5L1hFeHZ2dmtXN2VEbk9hRlJ2NSsvZ01ieGM1WURCKzdIYjZUcFNsaG1qZDYvOVgrTC8rZXFIR1JubFVGQkYxczNaYnhrNk9QSEZLeGxRai9mVTRORHVkeThYWlR0NzJMa2d2TmZ2T2hIenJGMEI4STllL2NKdE1WbGMzZVpzU0hmMGlWV0c5WjRYZHhIT1JPeEVMRHBJdWFmdTZaT0N1SWZjNlVhRk1UTDBXKzg0aTQ2NmRURDZOQWpocGlkdXQ3bWc2a2dvdzhsODA3V1pQNEExL3JaWDlDR2orZndHM0NhMFNyK2hzWFh5N2JRZm9QVGFYRGZYUHJIRzhYbXZxU0w1NHUzTkkwOEdid3F3dmNrblhhSjNKQlQ3NWFqVEJpQUp1UWtrejZVWjAzQ0VMQ2hXUytUMjFKU1ZnbjdQd1hhQ0tRR3EwdWRZSUlKaUFLd2lCRkpLR2Y5QTBrYlVpTVVsN2EwZjhIR3drMWlpci9NRmZFRm4xRGN3c3FhZjEyNmREWUtHR2t5LzBHVTluaDJkcWZnUS9oT3pyOE42OWV6UlZaTUR6eHduK2tQUDNLaGFPOC9QeitmSCsxWWI4bzQyVCtmTWIrRko4TThwZ0x5aDVQL1A5eHZmUHJwWjJnUVAxclNobDhwdDhMcTJQeVBvbDc0LzE4ZzI3UVI3Y2VhbXlBcDNHZTA1RkpTWEVMdWpMUkFGY2pJMGdjL0xseGt2bHVZbGRYU3lLV0VjYktjbjRyNTN1aW1BQjY1ZWJuMDFkelBPY3VTcjlVSDJnZ1VaNitZKzdEeVdhOEZ5b1Z5N1NGYkpYdHlIWVZYcmN5bGo5NmRTMmVlZFJRbDhRa1VGSmRSU1hrbTMxTnR3WDRTZFJ6Vm0zejhTYXB0QytkVEN6NG03OStMZXQ1eEs2MWNzNW5HcGl5aDViK3VvclVyZDFIL2dUdG8vc0pXQ1JsMUl0K1E0K3JXZGE4NmxvQjBCMlVRY3FJSXJNa2sveFNoL0VnaG1kRGkyOHRFU3JQbkl5ei8rRkpXL1BCeTBlSlNYbng3dVVocDlueUV0WCt4MEMzRkZBdG1kZ3lsdlBpUjh1eHA0V0hGdnpMK3NBenh5SWhnWThjTWFYQWdSbXlXRWR6RnIxaldrcWs5TFR3c2ZVaDk4Y1BMUll0TGVmRkQ1U3dkQTBKNmVPeHVPcnhYWVNqTEZwcnczaUQ2N3ZkMm5HS1JJNGdRcmxtemRMNW5sbXlJaTI5Mm1EVDdEd2pOU2tjZStnS084bWdIaUZvZUFoQmRoOXBXV1M4Lzd3ZXJUTndoM2JiU2c2TmhoVloyODllMm9WditNNWd6VUZkdXUxUWVUK1dhenFYMDJLczkvZU9sNi9nckhDbldoNDE1SFBuNVhyNFg2YVZWNjByNS9tTXl0V3ZmZ25MNVpRM2JQLytjeXRiOFFnUEduMGU5aHA5R3UzTFgwbmRmM0VJelpoVFRtblhPUFJmcjNObFYzVkk5V0k0aDRRb1J5aER0Y1V4cytlZVIvSEJmcnNiRXQrZEhTclBuSXl6OVNWbnh3OHRGaTB0NThlM2xJcVhaOHhIVy9pM2xJVmlKSDQ1VHRMaVVGOTllTGxLYVBSOWh4Yjh5L2lBOUxGbkc0Z1JqOGUxMUlxWFo4eEZPUFA1TUtPWkR1eUV5c28vQjZoOFl5Qklud2k0bS9oSitTYllIZEJRY28rZ2ljNEZnRmVNODFJT1Q1VlBPTU9yTnNnZ3RBclZLeUc5UkVlN1hvUkNYWVpEUVZIUm5sUXMwR3IxWUFuUFcvTDZGTHJuZ01YNEc5V3phcDM5WGpKcmZsNXBHTFZ2NGFHY0IwVmR2ZjAzSEh1eWk1ZVg3VU9id0U2bWoveGlpYnIxcDhmTHZhT1BTdStqeEo5SWJKVEVDMGpvaXg4QnNDZ29SRThPS3lLUUxadGtDOHM5alM5S2dJcUFJS0FJeElaQ2N6Qll3cllsZTF1Z2crOFU2MHhCSHk4djUyYjM4UXNyTXhIdGVyWHdoUXRGYjRib3BTSFBjSmo4SmFQbzB0eXlEZW83NE1aUWl2dGRvZllsRGlEblVlNlJob3JLVUNEUVVqRWNxbjVpMDMxZi9RV2VmK1NoZGUvMUl1dkNTUDNFbmVOWXhpZnIzYVU0OXJ4OUYzcTByYWVOcm0rbmxKMStpZGgzS2VRTlBIMnJiWWhIOWExYmJ4QXlvamxxdEkzSzB6a1ltRkNZZ25MVWNJa0szMG1MOVJWdm1LczVVc0U4aWFjR2Vab1d0T3NpWENZZXd2UnppNHV6cDlyQ1ZyLzByL2pyLzVQK284djlIeGY4cks3L3Uvdi80M1orZXpyd01XTTNMd25uNEZ1bFp5NnFpbHpETzBsTCsvaEk3RUdURnMwTU05VUx6MytSYnlad0RUSEFFRXpnTVl1VDNqSm8yVFdtVFpneURzSEltbzlJUDZzaFNiYVhNT2t0NGJQcUg5TkxNTDJuVXFFTm82R0Y5cVUrZkx0UytReGFsWnU5Tlk4WjJvRFVyaHRDWHM3K21uSTkrNTdOcTNNUUlVQk5NampJUjVONkc5YytFaVJXckMwMUNxNDdVTk1US0lqRFQwQ1JLRHJjY25KdFdXcENFcmU3TnhFYi9sdFdLQUplelZiZnk4Q3YvQkpZZmFwY3p1QzF6SG1GOW1VcGhhZHEvRGFzQXBzQnB6OFkvTktGVS9uVW5menlmNS9aazg2TURhWWI0UWxJdy81a1ZmMHdtZnZER0dwQWRza0ZDU0hPWmgvbTk1Zm1VeVJ0MHNJUFdGQkRkeFlXdC8zK2pDTGlHVlFkMTVhTEp6enRmc1prS1M2bXlxUXJ0V3ZwUHlxUFBhRTRVU2YwVG80eHcxNjRDZXZubHo4MGhhUlg4NUxyOXJGbUZ2aDJPSkpnY3pXd3prOEdhTUtIbFZKeUh6TE9LNTFTeGpGVU9FNm1pa3hUeEsrU0dKUWI3NFhSN2xqVkp1YVk5TWRDUVZjZktzTmNQOWlOMXhBOW1WRzdQWHQ5ZVhQc1BvR0VIWlkvQjM1cjdPQjJWdndpMTRyK2FrL1BmeFdUb2RyZGhheEc3U1EzcWdVNmplMWorTkdQZ2krUFEvVUdrY1IzRFN6N3lsYnY0RFM4RmxKcmlNWTh6ZUpna1RiNjUzMmp1U2dZNnNJaE0raTVuc2kwdEtlVm5OUzBMVlBSZmFEUWdTYmxuR1VxdEVBb09CS255VHhLYVZ4WEthc1J4QkJKTWpwWkFnMWZPRVlhUHlZa0Q3K3NMelVvVWxNbGdWWkw1S2psbUtrcVJ3SHlSYVNObEpkdHF3ZFlrRjZ4VU5sREpuaTcxa0JiZXBrbVREZ0tWN0hXbGpyUmhmRnY1U21XMWZ5TVVPeTZDbldBcFB0Sk4ySWFucE1FUFFCazJnd0laZ1lMMmZvSnRjY0NlanFKd0p0L21COU8wZjBBUkJNMk9uV0JtRlFqODJ2Q3FWRFlnTkh1NjFKVzJ4RWVIU2RnUjZ1ZFBJZkdHbTZTa1RJNW5HdlhoTGVkSExLQlRJSDM0NWpWdDBsSkZ2OXhYeHZjQStXVUNwcTJBeFJkeEFQelNiWDZuYUVHaGl3azR5YnhGQjg5Q1FxKzU4TUo0YnRabit1SlhxL0VyMHNwNFJ5cnVXOEpKY3liQ1ZtbFNFcjkvbEY5QWFwRWxjZ1VVcTBTRlgxTTVBSXpKcU5oYWhiSWFjUndCVDFycS9nNDFHaEl5enhNemNlQmJ3ZytmQkZaWnZGOHdoZDlGZTlXVlo5RkZsNXhLTFZwa09qUVdiVVlSVUFTYUdnTEJDKzNBY2lhV01ndG1uMFBlZGJNalF2SDQ0MytqMUwxR21qY1I0VVVMT0dSSk5HS0ZXaWJtNVJYUXpIKzhRODgrTzRzdFNpako2aDZLRnpLRXZyVHJVQWxMZmkwSHB0VWpJbEJMeTlFaU9VdHdJakFRbzl4anhNVmJLTjBhQVN4RmhLelBuOHliUDB0Sk1hSm9ORkVSVUFRU2lVQjV6dGY4bmNIZFJsOUJaNEVjRStud0lyWExUbkRSMlllUHBpbjNQczF2a0NIcTFUYWVGNm5ieWRBZVR1U29tMjdidFNSSEFHY25Qd21EL1VDQzlyZ0ZzbG5qNTZDUGx6U3V2UEljSlVZTEZ2MVZCQlNCT2tiQSsvT3paRDFZVWNjZGMzZTNIUnREbjFpcVpWV0s1VnRMejlyOUdPcHJrVm9oVUl0TEpSQ2drWnJORjZ0UXhtUk1SRnMrQkczVjhmbkxlU2wxckJSVVh4RlFCQlFCUmNDT1FFQzlXZ1lGZEt2b1UvZ1N0bGZRc0pNSWVEcnlaMWhxNmlBczY2SW1zSXpLRFZraUN3Z09WejZjWmkyekJuYUdHWXZTejJ2dStXbzExaFI0cmFjSUtBSjdQQUlwcVduVW9YTTJiL3JoVFR4OHRtWkhMWlorQSthazBiOEJZMk9QQjZNZVR0RHo1ZHdaY1hjTG9kZ0ZBL0xEelcvNWVnQytJSUJENG5qYnZZU1JqcnJyQXkvcWpidHpyYUFJS0FLS1FEVUlRQ2VadzlQNDN1a3BwemI0a0lIMDhkK21tV2Nzb1RQeHFTNzQwS1hoK2xmcXFPOGNBclZZVmhXTGtMOEF6YTlFRW9JRStlR0JXUkdna0NUeXhhRjg2S0ZZU1ZWZkVWQUVGQUZuRVhCM1BzclpCdXV3dGFTT1J4Z2pRM1NxR0NBeUJPaFVrS1M2eENCUVkzSVVvWUFFY2NDSkQvSkRQb1FLaHpBRWl3TmhPVXltL2lnQ2lvQWk0Q0FDeG1JTVdJNHBmYzRpZDVkWWRyODRPQUFIbW5JeE1TYjFQdHZvVk9oVk9TY3hLcUJENFVUbk90Q2xOaEdHUUkxMnEwSlFzQTVGVUlqRGlaVUlId1FwUWhXeXRKY1Q0WWFOUjZPS2dDS2dDTlFZQWVnWTBTMElKM2xTS09QNGw2bDAxZHRVbnZNZCtjb2lmNkdqeGgzV291S3VYYnNvUGQzNmVEVEdhc2FibkVHdTlvZFFhcDl4dkRTSEZ3YUV6Z2RkbWRmWUJYem9YMU1uWUp6VVlpaGFOUUlDY1pNakpoN0lUNFFwYllvUUpSM0VpTEk0RUVZZENCTUg0a0tzVWw5OVJVQVJVQVNjUUVCMGtQaEo3bVJLNlQyT2ZEM0hCblVTK2hFU2RhTFBtclNSczJRSmRlN2MyWHc3RWpyUjQvR1lOKzJrcE9ETlA1WnF4amtnRHo0YzlLam9WRGsveENXL0p1UFFPcEVSaUpzY1JWaG9EbUVSbGdoTVNGQUlVU3hJRVNCOE9TSVBTVk1WQVVWQUVZZ2ZBZWdqNkJZNHU1NlN1T1JMR1ZNd3hwL3BNNTZnd3NJaXV2NjZxeWtqbytMTHRaR08vTXpNRExydTJ2RXh0bWhaZ2JBRVFZcmk4SkZscEdHTTRrT25ZdXlJNDVDNC9Yd1FWdWNzQW5IZmN4UXlGTUVnSGk1RUVDT0VLd0pER0ljSTFkbFQwTllVQVVWQUVRZ2hBTDBqQjNTUkhFSXVJQ01KeCtvWEZ4ZlQ4dVhMNmY0SEhxTGk0cEpnZllTUmhqeDhLRHJXOWxCT3hnaTlpREhhU1JKbmd6U1VBV0ZLSEN0dW9sdEZwNktjT3VjUmlCdFZDQXNPQW9XRFlDQWtDY3R5S2RKd1lCSklXUkVzNGxMSFZOUWZSVUFSVUFRY1FFRDBreEFQZk9pb2VFZ3JVdG1iYnJ5T3VuZnZ6bytnYlFnU3BCQWowcENITXBIcVJrdkR1RUI4SUVVaE9MT2tHaUJFcVFkWUVJYmVsUE1UblNyMUhJQk9td2hEd01Va1ZhTzl3Q0ljdEFlQmdmZ2dRQ3lqd3NrbUhDRkNlM3BwYVNsdDNMaVJEam5rRUZOV2Z4UUJSVUFSY0JJQlVXdlIvSnIwaFE4V1Q3N25QbHEzYmoyVFlWZlR4TnExNjZsYnQ2NTB4KzBUekxKcVBPM09ueitmZXZUb1lmU25FQ0hJRWpvVFB2UXEwdUVReDdtQURIR0kva1VaSWN4NCt0YXkxU01RdCtVb1pDZFhMSWpMRVc0WlFtaFNYcTU4RUVlNjFLOStpRnBDRVZBRUZJSDRFQkRDZ0MvNlJud2htSGo5NXMyYjBjUTcvOHJFMkkxQWlqZ1FSaHJ5NG0xUGRDQjBJOEx3b1VOaFBTSWNmZzVBUUhRdHlpTmY5R3Q4NkdqcFdCQUkzUW1PcFRTWEVZSElSRU0xaEhGVmd3UENFc0VoRDBzR2VFTU9oRzRuUnFTcFV3UVVBVVVnVVFoQUw4R0o5U2p4MnZSbjZiMlF0WmFVRkxxL0dXKzcwSk9pTjFFWCtsRUlFbkhSby9DaEw2Rkw0WVFRaFZTZE9DL1RzUDVVUUNCdXk5R2FISlpwTDVZaWxreEZRQkNZRUNUeUlWUk1BTGtTUWhqbElYQjFpb0Fpb0Fna0dnSG9KaWNPN0VxZGZNOVVXck5tbmJFWVlUVWlqRFRreGRzSDlDTWNkQ0gwb3h5SUkwOTBwQmdWMHI2VUY1S1VkaEtOWTFOclAyNkdnaURrU2t3RWl5c2FDRW9jaEFjQ0ZFS0VVRkVQUGh6cVMxanFxSzhJS0FLS1FFTkZBUGNiSjAyZUVpUkdMS1hLRWlzSUVua29FNCtERG9TT2hMT3Zyb2x4WWRlVEtBY2RHa24vU2h2eDlLMWxxMGNnYm5LRUlPVEtCc0sxa3lLRWlRTnB5RU5ZQkljNmtxN0VXTDFndElRaW9BZzBIQVNtUGZSb0JXTEVNNDA0N0FRNTdhSHBjUTBZK2xISUR2b1JCNXlRSnZRbDh1RkVkNHIrbGRVNnBLdExEQUp4a3lPR0FhRkNrQkFpRGdnUXZxUkJnQ2dESjhLVlNZQjBPVXdCL1ZFRUZBRkZvSUVqa0pHUlFmdnUyOCtRSVVoUm5CQWs4c0pmRGlCbG92blFtZENGNGtzNUlVWG9VYXpLSVIrSE9OUVJYWXQwSlVoQnhsay83a2M1UUhJaUdDRkZEQWtDRXlLVXNGenQ0TkVOQ1dQNUFIRjhzbXJZc0dIT25rMGphMjNldkhtMFljTkdPdjEwZm8raU9rVkFFV2hTQ0h6NzdiZjhHRWczU2sxTk5UcFZWdG13V3hVNkZIR1FIL1F0d2tLQ0NDTk5kS3FkT0pzVWdBaysyYmgzcTBJb2NCQ2VPQWdKY2VTSnVZKzQvYW9HZWJLdWpyQzBJMjNVMUwvNDRrdHA3dHpQSTFaZnUzWjF4UFR3eE1XTGwxQmVYaDRkZWVRUjRWa0pqVC84OEtPMFlNRkNHak5tZFBBdEdBbnRVQnRYQkJTQkJvTUFubDJFRS8wSm5TbHBTQmY5YVNkRzBadENsRkpmMGhGWDV3d0NjWk9qQ0F6ZEl3eWh5QlVNMGhDSGtMRWNFRzVsUXNoSXcyRVhMdXJWMVBsOGZuUDFkZTY1WjFkb3d1Mk8vZFQrOWErWENRUTVaODdzQ20wa09uTC8vVk5weDQ2ZEZmNGhFdDJudHE4SUtBSU5Bd0V4SkRBYTZFMGhSaGdSOHRpR0VDUHlvVzlGaDBvZHBFSGZxbk1lZ2RnWkpOQTNCQUZCd1FuSklXNi8ra0VaSE1pSDhPQlFCa0szQzlsa09QQ3oxMTQ5NktxcnJuU2dwY2hONEZ6a1BDS1hxSDRIYnFRMmV2YnNTZndYMFVVcUgxNnd1akxWNVllM3AzRkZRQkdvT3dSRWorTC9GQTc2RXVRbmI4T1JkQkNsaEZGR2RLZ1lHTkpPM1kyOGFmUVU5NFljQ0FrQ0VtRUJKckVjUVNCeUpZTjhoRVdBRXBjMFNVODB6Rjk5OVRVZGZmU3hOSHYySjhHdVpzMTZ6YVQ5L3ZzYU92UE1jK2oxMTkrZ0ZTdFdtTFJubjMwdVdPNmYvNXhKcDV3eWhucjA2RVdYWG5vNUxWejRRekR2azA4K05lWG56UG1NUm8wNnhaU0J2MlRKVDhFeWVGbnhsQ24zMGRDaHcweis2YWVmYVN4VUtUQjkrZ3k2NG9xS2IvRi8vdmtYZUpuMU5GUCs3TFBQcGJmZmZrZUtVMDdPWnRQbk8rKzhTK2VkZDRFcGc3YmZldXZ0WUJrRVhuMTFGaDEzM0FrbUgzNTRmb1hDR2xFRUZJRjZRUUE2VUt4SEVCeDBKSHd4S2tSbm9oekM0aU1mWVhIMnNLU3BYM3NFNGlaSHVXcEIxN2pLRVI4Q2c0T2dVQVo1UXBZbWczOGdZRXdHK0U0NjlCbCtTQis0ajlpblQxKzY4Y2IvbzUwN2Q1cDN1dDV5eXdRNitlU1RhYSs5ZXRDMTExN0Q1RFdVT25YcVNMZmYvamY2MDUrT01rTjc2cW1uYWVMRXUrbW9vNDZpeHgrZndlTXVwM0hqenFEZmZsdHU4dlB6ODJuMTZ0L3A3cnNuMDRVWFhrQjMzbms3YmQrK3paQ2hLY0Evanp3eW5iQmtlK3V0dDlETW1mOHdIellkUGZwVVFsMjRyVnUzbXZHWUNQL01tUEVZVFpwMEQ0OW5DRDM1NU4rcGE5ZXVkTU1OTnhISUVLNnNyTlQwZWYzMU45SmhodzJqaHgrZVJoMDdkakxuVmxob1BXT0YrNiszM25vYmpSNTlNczJhOVlxNWo0cHp4NzFOZFlxQUl0QndFSUJGQ0QwcGhJZzQ5QmgwRjNRbm5PZ3h4S1dzNUtFZW5QZ21vaitPSVJEM3NxcjBEQUhaTFVnSURuRUlDZ0lWc2hSQndzZUJDWUE4U1pmMmF1Ti8vZlUzVEhTOUt6Unh3Z2tuMERQUFBHblM3cjkvQ2gxNzdQR0dlSENQYjlDZ2dYVGRkWDgyZVljZmZwZ2huKzNidDNPWlkwd2FpSERxMVB2cCt1dXZvNXR1dXNHa0hYLzhjQ2JLbzluS2ZOMlFxRW5rbndjZmhHVTQxRVN4SEhMSEhSTnB5NVl0MUw1OWUyTWw5dTdkeXhDeHgrUG1GNjBmVEN0WHJncGVWRWdiOE5IblF3ODlRbGRlZVFWTm1IQ0x5Um81OGtSRDZMQXdzV2xISE1ZMGZ2eFZKcnJ2dnZ2UWlCR2o2TXN2djZJVFR4eEJ5NVl0TStubm5uc3V0VzdkaW9ZTUdVSmp4NDZoRGgwNlNIWDFGUUZGb0FFZ0lJWUM5S0VRSS9TbmtKM29TZ3hWOUtyZHR4T3AxR2tBcDdYSERDRnVjcFNyR3ZnaUtFbERISUxHSVdrSVE0aENoZ2pEaWU4RWt2dnMwNjhDWWFITk5tMWFCNXR1MWFvVlBmYllkRHJublBOTTJoZGZ6QTNlOEE0V3NnVldyVnBsWXM4OTl6eHQyclFwbUlObHpjOCttMXVoci83OSt3ZnpCdzRjYU1KLy9HR1I0N2h4WStubW0yK2h3dzgvZ280Ly9uZzY0b2pEbVdDUE5DOFdEbFlLQkZhdVhHbEM0VHRtanpubWFNSVNybGliS0FSeUY5ZXZYejhUbEhFT0h6N2NrT3poaHgvSlM2dkhjdCtIMGZEaHh4RXdVS2NJS0FJTkJ3SG9TRmxodzZpZ0U2RkRSWThpRFdIb1RsbCtSUmlIbEVVYjZoS0RRTnprQ01GQUlDQTlDQllPY1RuQ2hTbHhxUU5mQk96VUtjRktBd2xVNVZxMnpBcG11OTFWcnliak9VeTRndzgrbUdENWlUdi8vSE5wd0lBQkVqVStydTdFd1RxME96eS91UC8rZytqamoyY1Q3bjNPblBraUwvSDJvVGZmZkkyeXNrTGpRUjJ2MTNvUnU3MDlwRXNjL3h6aVBCNXJDemppd05MdWNLR3dhTkVDK3VpajJZVG5xUDd5bDF2NVRSNlp2TVQ2YjlwdnY0cGp0OWZUc0NLZ0NOUXRBbUlaQ2tIS2JsVVFuK2hJK0lpTHJwWC9kK2hmNkZZNDBhbDFPL285djdlUVpvL3hYQ0VJT0FoV2hJZzR3cEtIT0lRb0NoMkNsZTNKS0NjdkJVQzV1bkQ0UXZlZi8zd2RuWFRTS0g0RjFGcHpqMjdXckZmNUhFSmtWbEpTRWh4SzM3NTlUQmlFZS9ubGx3YlRZVG5HNHpaczJNRDNCRHZ5ZmMwL213UDNBL0ZjNXZ6NUM5aVNIRjZocWI1OSs1cjR3b1VMelQxSHlmeisrL25tVVpXV0xWdWFaekVsUFpxUCs1akFIa1NPQTB1OEJ4ODhsSmVPMzFGeWpBYWFwaXNDOVlDQUVCMThrQjE4NkVyb1VlaFhoS0ZENWFVQUlFTWhRdVJMMks1MzYrRTA5dGd1NHlaSENCRENBTW1KZ3hCRmtFakhJWUtHME1YS2hLQlJGMEpHZWFmY3BrMDVadW5SM2g3YWwzdUlEejc0RUdHcDg0MDNYcVBObXpmVHlKRW4wN1BQUGh1OGJ3ZHJDenRXY1dDalMzWjJ0aUdXZSs2NWx6ZlJwQm5yRDd0US8vclgyODA5U055THJNN2hQQys2NkZJQzZVNmI5b0M1NXdkTERrNkkwTjRHL2dHd3NXZmF0SWVOVllubDJtKysrWWJIL0NiZng3emRYclRLTURZU1BmZmNDMllaR1Zicm9rWC9OZVZsK2JYS3lwcXBDQ2dDZFlZQURBWTQ2QXBZamZaVk50R2pZb1NnSFBRbzRuRElGOHRSZkpPaFA0NGhFRGM1UXBCd0VJaFloaklhSVVRSURrNThwQXRKd25mUzRYdHFLMWFzWUF1djhuT09lRVBPZDkvTm8rZWZmNEVlZmZSaHZnL1p4aHhYWDMwVjNYZmZBL3hZeE5IVXI5L2V4cUw4NXB0dnpmMUJiSFRCaHBpNzdycUxDZHpETzBJZjVWMm8yODJRa1hmTk5kZVlNTTRwM05uVEVIN2lpY2NKTzJQUE9PTXNVeFE3WXJFTHRVZVA3aEhidVBQT084emtmL1RSR2FaUGxML2xsci9RWlpkZEVyRjhlUCtJWDNmZHRid0xkaHRicXRlYmJDeXAzbkREOVhUcXFhZEdLcTVwaW9BaVVFOElDTkdKTGtVY1lURWNvRU9nUTBHYzhKRVAvWXQwbEJGZGlyZ1NwUE5DclBHN1ZVVklFQXlFQk9FaERRZmlJbGlFa1laOGtDbDhMS3RpeWZIUVF3OTEvb3hxMFNKMmpQTHBCQ2NubXNMWWQrell3ZFpjUzU2Y05iTjJzYXlMY3c2L3p4aHRxT2h6MTY1ZHRkcEVnM1BKemQzRk8xWmJHMWxFNjB2VEZRRkZvSDRRK082Nzc2aExseTZVbHBabS9rZWhNMEdBSUQ2RWhSUWxMcU5FSERvQ1BoekNLSy9PV1FUaXRoeEZDUEJCZEhBSTR4QWhRYWhZTWtBYXJtamtDa2V1a0ZDdUlWN3BSQ0kvbkFNc3p0cTQ5UFIwODR4anJHMmd6OXJ1THNXNTFIYmNzWTVYeXlrQ2lrRDhDT0QvSEFlTUJwQWlEa2tUL1lpNE9LUkJkOEloWGZTdmxKVnk2anVEUU5YYk5pUDBJY0tDTHlRblFoS3pIM0VSSW55UW94eUkyd1Vib1F0TlVnUVVBVVZnajBmQXJqZkZHc1JKaTY2MDYxSG9URGxRUm9nU3ZyU0RkSFhPSVJBM09hSnJFQndFSW1Rb2dyTGZneFR5UkhuazQ4QUVrS1VBeE5VcEFvcUFJdENVRVlBZUJCbUs3b1J1UlpxZENJVWs3V1ZRUndoVmRXbGlabENOR1FvQ2diQWdUSEVpVUFoVEJJWjhJVVFJRkhseVNEMzFGUUZGUUJGb2FnaEFYMElYUWorSzdvUVBKNFlId3JoTkJTYzZGV0hVZ1Q2MTYxK2txM01PZ1JxUm93Z1Z3aEtoWWtoMjRVRndraWNQMWRzRmJ5L3IzT2xvUzRxQUlxQUlOQzRFUUpDaVV5VU13ME9JRXo3MHFlaE1sSlc0Nk5UR2RjYU5ZN1J4azZOZEdCQVdybHdnU0JFWTRyanFFV3NSY1pURGdUSlNEZ0pYcHdnb0FvcEFVMGRBZENSMEk4TFFqYUl6RWNZaGxpTFN4VWw1RUtVNjV4RUlJUjFqMjBKcUVDSWNoQ1lDRTErV1cxRVdBb1FUSVV2Y0pPcVBJcUFJS0FKTkZBSFJoZkJGcjRvK3RldExlemtoUXRHL1FxSk5GTUtFbm5iYzVBaGhRRmdRSWtoUWhDVUNsbnd4K3hHSElIR0lJQkVXZ1NmMDdMUnhSVUFSVUFRYUtBS2lBMEdFUW5ZWUtuUW5WdC9FMmZPZ2QwWC9vcHlRcXBSVjN6a0U0aVpIQ0VxRUFpR0pnTVhIMEVDQ0VDTEs0aENCUXBBZ1ZNUlZxTTRKVVZ0U0JCU0J4b2VBa0o3b1IraFE2RmJSbmFKZnhjY1pRbTlHMHIrTjcrd2Ivb2pqSmtjSVNxeERDQkVPUW9iUXhFcVVlNURJUTFnYzh0VXBBb3FBSXFBSWhCQVF2U2c2RkRsaVBBZ1JTaHhsY1lnZVJsa2hXWVRWT1lkQTNHd0ZJVUVZRUE3Q09PUktCMkc3MEJER0lVN3FoYWRMdnZxS2dDS2dDRFFsQktBVDhUWXgrS0pIRVJaZENpemtzUTZRSXNnUytRaExPWVRWT1k5QTNLZ0syVUY0Y0NJa0NVTjRjQkFjSEFRdVpjVkhudVNiUXZxakNDZ0Npa0FUUXdDNkZQb1JPaFJoNkU3Umx5QkVwSXQrUlRyeVJmK0tua1crdXNRZ0VEZXlFSTRJUkFoT0JDYkNGSUVLQ1VvY0FvYXpDemt4cDZXdEtnS0tnQ0xRc0JFUWdoTTlLWG9VbzRZaGdYemtTVG1rbzR6b1VkRy9TRmZuUEFKeGt5T0VCcUdBOENBb3hDVk5oQ2h4eVVkNUNCUysxRVY5ZFlxQUlxQUlORlVFb0I5Rkh5S01BM3MweEdvVVhDUVB2dWhiNkZPSm93MTF6aU1RMmk4Y1k5c2lFUGhDY0FnTDhVRjRjSklHSVdKTkhjUXA1SWs4V1dlUHNWc3RwZ2dvQW9yQUhvVUE5Q0Iwb3VoUmhLRXZaVWMvMG9VOG9TL2w4UTR4UGxBV1pkQ09PdWNSaU50OGd5QWdFQndRSWdRRndjR0pJSkdHZlBnb2czUVJKTXJKSkVCWW5TS2dDQ2dDVFJFQk1SYWdLMFUvaW02MWt5YjBLUFN1L1VBNWxMSHIyS2FJWVNMUE9XN0wwUzVRREF4Q2d0QkFnbkFnUWppOFR4VjVpT01Ra29Rd3BRMkUxU2tDaW9BaTBGUVJnTzZFSGl3cEthbXdLMVhJRC9uUW43QWF4UWhCSGh6U1JmOUtIRDdxcUtzOUFuR1Rvd2hHQ0E2a2h6U2ZqMjhlNDJDQkljLzR6SDBzV3ZLVjg0ZVBlYXhsWmFVbW5hY0RsMldyazlQVktRS0tnQ0xRRkJHQS9pdjNsckp1dEZiYWVFMHVvQ3Y1Zm1LU2g3eGxKUVlXczlUcXQzYXFHdjNMT3JhMHBOUVFwdGNYZXVFS1NGSElWQW15OWpQS3hTUVcxOTFjRkJlTEQrSFNMWXVwNE52YnlMdDVQbSt4VXJLcnZVaTBCVVZBRVZBRVlrUEFsZHlNVXZZYVNjME92NS9jR2UyQ1M2K29yUVFaRzRiUlNzVkZqaUJEV0lVQ2VzbjI1WlQzNWxIa0w5MGRyWDFOVndRVUFVVkFFVWd3QXA0MisxR3JNNzRrbHp0RkNkSWhySk55emptYmNHeSs2QUlxK2ZHL2xacmQrZEEwK3VPcUs4Z2Z1S2NvWmp0SXN2aW5wNVFZS3lHbUNZcUFJcUFJMUMwQzN1MUxxWGoxaCthMkZZd1lIT3BxaDRESFgxSWNhSUhCREFQVXUyNGRGWDQyaDF6OEpXby9iN0J4cGFlYnF4SVFvOWxZczJ0RjdYclgyb3FBSXFBSUtBS09JT0RkK1p2UnkvWk5PbzQwM0VRYjhXUy8rWGJVVTgvLzRIMlRsMzdFRVlZWWNUVUNVb1QxaU1PWG54ZTFybVlvQW9xQUlxQUkxQjBDMk9Rb0ZpTjhXZVdEcnk1K0JKSktsaTJsOHMyYks5WDBGeGNicXhFWm1hTk9EdVlEZE94UUJVbDYvL2dqbUs0QlJVQVJVQVFVZ2ZwREFMcFpEb3dDWVhVMVI4Q3o3WmEvbU5wcGd3ZFRtMG4zWUl1VGlSZCtQcGY4aFlXVTNMTVhwZXl6RDNsemNpaXBRNGVnMVZqODg4L2t6ODhuU292U3VRdlA0bFMrWXJFTFRLOW9vbUNueVlxQUlyREhJeUM2TUM0OTZNZXo0VldUbnJTN3h3T1k0QlAwcEEwWlNpV0xmcURpUll1b1lQYkhsRG5pUk5ObHdRY2ZHRC96cEpPbzZPdXZhUHZVS1pSMTNmV1VmdHh3YzBXUy84N2JMS0xvUXZJZTlnTDUyeDFxMnBBWEJJaVBCMTV6bUd3UE91aWdCSitlTnE4SUtBS0tRTU5FWU1HQ0JaU2RuVTNKdktjRHp6TEtXM0lrREY5dVkrRStvaUc5WlkrUS8zOHpvcDZRRUNQOHVFZzNhb3ROTjhQVFp1SmRsUHZDODVUL3h1dFV1bXlaSWNmU1gzNmhzdFdyS0Nremt6S09Qb2J5MzN6RElPVGRzTUV5MjltaUxQcGhJYVVOcm13WjJxRzBYZzRRK3NZakJJYk5QQkE2blBqMk9ocFdCQlFCUmFBcElBRHlTa2xKTVM5UmdTNUVIRDdJRXFRSWh6ajBxQmdXVldsY0ljYW1nRjFkbktONVE0Nm5ZMGZUbCt4Y0xmajRJeE4zdDIxSHNCQkxsaTQxOGJJVnk4bTNiU3VWNzlqQmIzYndrc3Rqa1Z5a2dVS2dibjdsVWZnVmpCQWlYb2NrTDlLTlZGL1RGQUZGUUJIWWt4RklUVTAxcHllNkVLUUlaM1JuZ0N3UmhnNEZpWUl3ZlV5ZzBkZnJUSFg5Y1FnQlE0NndDT0dTbXJjd2Z2bTJiY1l2Vzd1R3ltYiswNFR4VS9MVFQvelEvNXVVY2ZJcDVJR1EyQXFNNWlCVUNCTStCSXNybjdTME5KTldWRlFVdkVxS1ZsL1RGUUZGUUJIWWt4RUFLY0pZRUNNQkpJZzRMRWhaYXNYN1ZNV1NoQzR0M1pNQmFXRG41dGwreCsxVXZQaEhNNnkwSVVPTTMvTHFhNmpvcXkrREQvNlhzdVZZekx0YVUvcjNwK1pqeGhDMWFVdnVIajM0dnJCbFVVWTZKN05Fd01LSEEwbEN3Q0JJRWJ3SVAxTGRlTk1XOGYzU2VkOStSZTNhZGFUV2JkdFNCOTQ0MUs1ZE8yclJvZ1ZsOHRKd1JJY2IyendKSTIwYWlsaGVFeFVCUlVBUmNCQUJ1Y1VrT2hIa2h3TU9hY2lIbnJUSGtXOHR1SnBrL1VrZ0FwNWkzb3lEaC91Ymp6dURzRGtIenRPNU16VS8rNXhndDhWOGY3SGt0MStwMmNtanlkMmhveEZhbTFzbVVON3JjN2xNYnJDY1BRRGh3c0dIUUdVOVhKWlo3UlBCWHE4bTRZL2VmNHY2NXIxQ3lldUpWdWI2Nk1kU0R4VjRVNm5FbGNIdkcyeEQ3clRXbEp6Wm1qS3pPbENMMXUycFZldDIxSVBKL2VDREQ2NUpkMXBIRVZBRUZJRmFJNEFWTmVoSFdJNnl5Z2E5S05hamRJQjhXSkFvTDY5c2tUejFFNGVBcDhNTC95QTNXNEo0QzA0MGwzYlF3ZFRwamJkd2R6ajAyUlMyemxKNjlxTHluRTNScWhuQkl4TUNGMmNuU251NjVOZkVUMGxKcFg2ZDBpZzdpOGpMQy9LZU5DWm0zQTcxRi9JUEg5NzFWRmJpcDZKU1ArWHQ5TkhtZGVXMDRCTXZ6ZjFnTFAzbHprZUN5eG8xNlR0YW5hMWJ0MUk2WDNRMGE5WXNXaEZOVndTYU5BSS8vL3dMVFpwOFgwUU03cnhqQXUyNzd6NFI4K29qOGZVMzNxWTMzM3lIVGp0dERKMCs3bFJIaG1BblJKQ2svVUFIc0JwaFBjcHlxNFFkNlZ3YnFSWUJqNmRqcDJvTG9ZQ0xyMTdFNmhPL3Vvb2dQd2djNWVGd1JZVHZQQ0x1RkRHaVhUeFNrbDlTUm9WbHFWVEtrK21YMVNXMGFhZVhVano4RnA5eVhzZFBZdXZWemV2NEhNZEkybWVsME9tSHA5RG5TOTZoS1ZOYTBaMTNUa0l6anJpdnZ2cWFicnp4LzJqNzl1Mm12VU1PT1ppbVQzK1VPbld5TmowNTBvbXRFWkR3dSsrK1I1ZGRkb2t0VllPS1FNTkhvSHYzN3RTOWV6Y3owQXN2c0ZhcVpyNzRpb2tqcnlFNUVDTWNmS2ZJVWNnUXQ1dGdIZUtRTk5HZEVoZWRpYmk2dWtIQXVpa1lSMThpSFBoQ2VsVlZSeGxjSWNHWDhoQTh3dEpXVmZWanljTjBjYk54Nm1ZQ0xDOHNvcTkzN0UzSG5mRTM4cmg5bE5tc2xmazJXbWx4UGhVWEYxQ0oxMDN2Ly90TzJydk5KdXJWSVkzKy90NEhOSEhpNUZpNnFiWU1sajdHajcrR0preTRsYzQ3N3h6Q3hxTWJicmlKN3J2dmZwb3g0OUZxNjlla3dKWXRXK2llZSs2bHl5Ky90Q2JWdFk0aVVHOElOR3VXeVhzQ01rei8vZnZ2YTN5Skk2OGh1WEZzTGI3QjFpTjhwL1NXNkVENy9ndTBEWDBKWis4SE9sUFNHeEl1ZS9KWVF1dWRjWndsaEFwQjJZVVhxYnFkRENGY1dJNDQ0QkIzMHZsOXNBeVRhRWV1bC9icWR3Q05PdkU0T3VINDQybnoycVcwZE42N2xKNldUQ2VPR0VGalRocE9YVnQ3S0lXSFVWcm1DNDdIaWJGczNicU5DZ29LNk1namp6RG5oODFBOTk5L0gxdDFJZUw2NUpOUGFjeVkwM2pKYUQ4bXRDc0psaDhjNnQxODh5MG1mY1NJa2ZUNjY5YXpwY2lieEc4dW1qWHJOUVNOZS83NUYraWhoeDZoNWN0WDBBVVhYR3pTaGc0ZFJsOTg4YVVKZi9ycEhEcmxsREdtcmIvOTdZN2dVampxVEo1OGo4a2JOZW9VcXpIOVZRUVVnV29SZ0xVNDY5VVhIYk1hcFVQb1FTeVh5bk9NMEpsSWcyNFYvUXBkaTNRcEkzWFZUeXdDTldZb0NGRElMOUlRUmJBb0k0U0lTUUJCeXhHcFhrM1RURDk4TnJsRlBrcHRsazE0Qzg5MzN5K21qeDRmVDY2dkg2TGJyajZWeGw4MGtzNGRONXhjdVd2Sms0b0hiZkVvaXJYa1c5Tis3Zld5c3p2UmdBRUQ2T0tMTDZGLy8vdFZXcnQySGJWdTNZb0dEdHpQRlB2bGwxOE5JWjUyMmxqT2Y5bE05bHQ0WXhQY2hBbC81ZkpyVGZyVlY0ODNSUG45OTkrYnZHMzhhTTN1M2Z5cXZvRGJ2WHMzN2R5NWczcjA2RTczM2p2WnBMN3l5ci9NQmlNUTVtV1hYVUhubjM4ZUlXM3g0aVUwYmRyRHBzeXVYVHZwdWVkZW9Jc3V1cEF0MlVla09mVVZBVVdnSGhDQWpvUXVoSDRVTWhTOWlTVlcwYSt5WXhVNlYxM2RJUkQzc2lxR0JnR0M2RVNRa1lZTHdVbys3alBLMVJES1F2Q09DeHBycS94VytoMGxidXJkNzBEQ0E3Wjc5KzFCSjF6ekJEVnZsa0xuYjhyaFpjNENXcmw2RXpVcitoK2ZSSW9aTmcvVFVmZmlpLytnSjU5OG1pMjBlNDAxZU5CQmc5bDZuRXE5ZS9lbUw3LzhrazQ0NFFRbXJuTk5udzgvUEkxKy9IRXhrMlE1L2VjLzc5SEhIMzlJKyt6VGp3WU5Ha2cvL0xDSTVzejVqSVlPdFhZUVJ4b2tkcTkxN2RyRlpQWHMyZFA0bjMzMkdSMXp6TkUwY3VSSUU3L3V1bXZvdHR0dTUrTldFei92dkhOcDdGaG5OaFNZQnZWSEVXZ0NDR0JEaml5ck9uWFBVV0FUZ29RUEI3SVVLeEc2RXVuUXQ0N3JUQm1BK2hFUmlQdFNSQWd2WW11MlJDa0hrb1JRaFJ5UkxoYWtyWGl0ZzRia21DQjNGTHRwMGFLRjlQR0hiOUVQODcrZ0x0MTdzaVhaaWM2NStFYTY1c2E3YWV5WmwxS2FpeTFHSmtVZWl1T3VUWnMyZFB2dGY2WC8vZThuZXV1dE4vaGNmWFRWVmRlWWZsYXVYRVY5Ky9ZSjl0bXFWU3REWkJzM2JqUnBzQVRGOWU3ZGkxYXNXQ1hSbVAzWnN6K2x1WE0vNXlYVkFlYTQ0b3J4Wm5PUS9MTzFhOWMyNXJhMG9DS1FTQVRXckZsblZsZDYyRGJmSUl3VkYrUTFKQWRpaEJQZnliR0pqb1J1UkJoa0tEb1RZUndnek9vTUVpZkhwRzJ4RVJjdkNCQVVISVJZblJNaGk4QVJGOUtzcm02OCtXWTBMajl0Mk9tbnBTOU5wRncycVBKTCtLTWh2RWxuNldZdlRmajdselJreUlIMHkwL2ZVb2MwSmtjWG43cS9MTjV1cWl5L2V2VnFXckJnSVoxMTFwbm1QQWNQUHBDWFIyK2ljODg5MzB4czdNeGJ0V3Axc0ExczRObk1ud3ZyMEtHOVNmdmpqeTBrQkxtSkxWM1p5WWQvakYyN2RnWHJZVmsxbWp2NjZLT005VGwxNnIzUmltaTZJdEFnRUxoNzBoUXE1UGMwcjJFeXZIdlMxT0NZQ2dvSytSR1BLZlRDODA4RjArbzdZTitRNDlSWVJCZkNGd0xFL3pxSVVmUXM0bkRRb1VLZVR2V3Y3VlNOUU55V28xaUFFRnBWQkNuRWlQSW9oME91aGtUUVZROHRqbHllWEc3dXA3ekVTMjI3N2tXVFh2aWVUcHYwS1YzMHdHZDAxdFJQYWVwTDgzaVR6REJlYWsyandyd3QxREtEWCtUTEhDK1RNNDZlcWl5YWtaRkJ0OTU2RzIvM2ZzczhzcEtibTB1dnZmWTY0WEVPNERWczJEQjYrKzEzQ0k5N2dPQ3c5SXJkckhpdDNyQmhoL0ltbTRjSmRaWXVYVVl2dnZpU1NVT0hJTXc1YytZUUNIUE5tclhjeHJ2QmNjRDZoTU85UlZ4WllobjJsVmYrVGZQbkx6RDNYWjk1NWxtNjlOTExnK1Uxb0FnMEZBUjY5T2pHcXh2OWVEaCtNNjh4dHhGR21sd1lOcFN4Sm1KRGp1Z2Y2RXE3THNYL01aWlR4ZG56cEk3a3FaODRCRUlTaUxFUENBckNnMENyRXBTZEZFRU1LQy8xSkI1amx6RVVzNjZxeW4xK3ltRURLNytvbURLU1U3bFBFQ0NUYzZtWFB2MzBNOXFadTV2eVZzK2xqbjM0N1RsbHNobW5lZ3M0aGdHWUloMzVCZTZQUHo3REVPUk5OOTFzMG5BUDhhbW5ualJoV0pLVEowOHloSWpuSVB2MDZVTlBQUEc0eVpzKy9SRzY1cHByZWZQT0FlYVZkMWRjY1JtTkdIR0N5VHY3N0xQb1BYN2s1TkJERHlNczIrS2VwR0RmbWQ5bWRPS0pJMmowNkZQcDZhZWZOSFVtVHJ5RE53VmRhdTU1ZHV2V2pSNTdiTHBwUjM4VWdZYUV3TVE3L3hvY0RxeElPSHRhTUhNUERRanBRUi9pL3hrSGRDVDJFaUJQMHVSL0hUQkluVDBVa2daMVduR1RJd1FseEJmTG1lQmVsMXdGb1I1STBtbUhDWldjekVzVFNTazByTzFhK3ZVRmZzMGRiR0xtUFpsa1NaekFGRTJuOUV5anBKUTBTdWJsMXJRVXZQZzNiZ2lxSFA3Sko1OUVvMGFOTk4rcmhDVXBscDFVdXVDQzg4eUdIQ3duMmQvNzJyNTllMzU4WTVaNU5oS2JpWUNWT09UTm1UUGJXSnVvWTg5RG1hZWVlc0k4cmlFNFgzTEp4VXlPRjVueWVMK3NPQkN6T2tWQUVZZ2ZnVVJ1eUpIL1oraEdFQ1djNkVub05qc2gyb2t5L3JQUUd2RWdFRGN6UUdoQ09OVjFCRUhhaFNuMXd0T3JhNmU2L0o2OSt0RG1KV1hVdllPTC90UXZuU2lWZDlwRTNHempvdElDSHhVVWUvbk5PUzdhbmw5T3VYbTUxVFVmZHo0bU95eTZhQTduYnlkR2V6bThjaTZhYTk2OGViU3M0QXVLcFFENnNCT2pwS3V2Q0NnQzhTTWdHM0hnTzdsYkZUb1Jldzl3WVF0aVJGd09pU01QWmFCWGtLZXViaENJbXh5RjdPVEtwcnBoUXNCU1Zud1JmblYxWTgwLzQ4enphTnJQMzlQV0g5NDNyNHpiVmNDdmt5djJVUjRmMi9OOUhQYlRyb0p5S3ZIenV3cUpEMzZNSXptMUdmazlhWFQ0RWRFZmxZaTFmeTJuQ0NnQ3RVTUFxeXdOMlNWcVF3NzBJMGdQZXRWYUFiTStkQ3d2SlJkZGlYSWdTSFYxaDBDTnlCSENoQ0NyY2lKVWxKSHlFRERxNFJDU3JhcU5XTGliR0JBQUFBUnJTVVJCVlBNd2tXNjk1MGw2OE1HZU5HL2VQUE81cXJiZDI1cjdjM3Z6SjZ4YXRteFo0Y2pLeWpLYllMQjhpVEdwVXdRVWdmcEY0T3J4VjlUdkFLcnBIZGFpa3hZanVoTWRLcnJTcmhQRmtFQWF3dENoY1BZeUprRi9Fb1pBM09RSVFVR1lJcXlxUm1ZWExFZ0k5eCtsYml6MXEybzdQQS90VDVoZ3ZXMG1QRS9qaW9BaTBMQVJrSGVxTnV4Uk9qczY2RWZSaHdqamdJNlVQUWQyZ3BSOGxGZFhOd2pFVFk0UUVvUW1nb3MyVEpTRHczbzVycERzZFpDSEpRSVZkRFQwTkYwUlVBVDJkQVNnQjZFYnhWQkFXSXdJK0VnWDhvUytGSjI2cCtQU1VNNnZSdVFvd3F6dUpDQnNISEFRdGhBa3JvNUU4Tlcxb2ZtS2dDS2dDT3lKQ01oS0drZ1AraEMrSEdKQmdoeEZoKzZKR0RUa2M0cWJIQ0dvV0N3K2xFdG1nWXVGS1RlVFVSZHBtQVN4dE5PUXdkT3hLUUtLZ0NKUVV3U0VGS0VIOGY1cGVSUUxjWkNsa0NMMEplTFFvYUpQYTlxbjFvc2RnYmpKRVJZZ0hJUlpsWE9WNXBHdmNJc2hRVU9HWEJoWFEzQkpXQ0lvMlU3ZS9NMG1yaitLZ0NLZ0NEUTFCS0FEZllWcDVPTmJUOFppVE9hZHFxVnNQVUxIOGxIR3BBaUhQQk5pMG5TVkZ6WTFtT3J0Zk9NbVI0eFVybXlxR3JYL3U2djVzWW1LVGg1clQrWGs3bnpzV0ZJeFgyT0tnQ0tnQ0RRVkJIcmlSSmVGemxiMHBXVkNoTkkxVkQ4SUNGL0YzTHVZK3JpYVVhY0lLQUtLZ0NLZ0NPeUpDTVJOamxqN2h0UDdoWHZpZE5CelVnUVVBVVZBRVFBQ2NaTWpMRVlRb3lISHBCcXR5aXJ5aW9BaW9BZ29BZzRqNEhKYkgzQjN1TmttMjF6YzVBaFN4S1ljSEs1Vyt6Ulo0UFRFRlFGRlFCRm9TQWdrc1Q2VzIxM2lONlR4TmJheHhFMk9PRUc1NzVqUy95cHlwYmRyYk9lczQxVUVGQUZGWUk5Q3dOMXhHQ1YzRzI3T1NZblJHZEc2MkJLTTZYMUVLQ2FIUEx5S1J6UktkNjZpMGtWVHFmeVArZnlkbFlxUGQ0UTNiWStqcmp6WDQ4eXBhQ3VLZ0NLZ0NEUWVCS0JIWlE4SFJoMkoxQ0tsMmMvUWxkS0MzTjFHVVByZ1c4bWQydHkwWjFiMStQYVh0RjFkRy9iMk5CeENJQzV5UkRVUW5EeXZpSWRTRVFiUlNUcDhITEF1dzhOQ3FuaEdNaWNuaHc0NjZLRFFTRFNrQ0NnQ2lrQVRRbURCZ2dXVW5aMXRQamNudDZwQWFCS0dEOTJLTkJ6UXAwaXoreUErcE1IUWtITGlJMCtKc2VZVEt1WWROUUJaeUE3Z2krV0hkQ0ZDaElVc0lUQjdYSVNMc3NpREU3L213OWVhaW9BaW9BZzBUZ1NnSDVQNXdYL29RZEdYOEpFRy9Rb25lWGFTUkQwYzBLbjJzSjBVR3ljaURXdlVNWk9qREZ1SUVVUXBBa0pZaElmUFJ5RU1raFRCb1M3S3dLRytDQnkrT2tWQUVWQUVtaUlDMEpWdzBJT3cvRUNLY05DYmRrc1FhVklXK2hNT090WitXOHBPakhhOWF3cnJUNDBRaUlzY0FUcUVBaCtDRkN0UUxFcWt3d25wQ1VHaUxNTDRGQXZxRnhVVm1UYWtYSTFHcnBVVUFVVkFFV2pFQ0lEY2hCaHhHdENqaUl0K1JSaDZFOFNJUEJBZzhzS1BTSGxvVC9ReHd1cmlSeUF1Y2tUekFEeWNERUYrRURRRUNmSURhY3FWRDhKSUY0SkVYWVJ4S0RuR0x6Q3RvUWdvQW5zR0FtSmNRS2RDSDRyMWg3TkRHblFwaUJGaEhIQjJuUmxPbHNpWGN1SWpUVjNORVBoLzhFNjQ3aWRDaUNzQUFBQUFTVVZPUks1Q1lJST1cIiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsInZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiA/IChvYmopID0+IChPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSkgOiAob2JqKSA9PiAob2JqLl9fcHJvdG9fXyk7XG52YXIgbGVhZlByb3RvdHlwZXM7XG4vLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3Rcbi8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuLy8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4vLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3Rcbi8vIG1vZGUgJiAxNjogcmV0dXJuIHZhbHVlIHdoZW4gaXQncyBQcm9taXNlLWxpa2Vcbi8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbl9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG5cdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IHRoaXModmFsdWUpO1xuXHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuXHRpZih0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlKSB7XG5cdFx0aWYoKG1vZGUgJiA0KSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG5cdFx0aWYoKG1vZGUgJiAxNikgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicpIHJldHVybiB2YWx1ZTtcblx0fVxuXHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuXHR2YXIgZGVmID0ge307XG5cdGxlYWZQcm90b3R5cGVzID0gbGVhZlByb3RvdHlwZXMgfHwgW251bGwsIGdldFByb3RvKHt9KSwgZ2V0UHJvdG8oW10pLCBnZXRQcm90byhnZXRQcm90byldO1xuXHRmb3IodmFyIGN1cnJlbnQgPSBtb2RlICYgMiAmJiB2YWx1ZTsgdHlwZW9mIGN1cnJlbnQgPT0gJ29iamVjdCcgJiYgIX5sZWFmUHJvdG90eXBlcy5pbmRleE9mKGN1cnJlbnQpOyBjdXJyZW50ID0gZ2V0UHJvdG8oY3VycmVudCkpIHtcblx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdXJyZW50KS5mb3JFYWNoKChrZXkpID0+IChkZWZba2V5XSA9ICgpID0+ICh2YWx1ZVtrZXldKSkpO1xuXHR9XG5cdGRlZlsnZGVmYXVsdCddID0gKCkgPT4gKHZhbHVlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBkZWYpO1xuXHRyZXR1cm4gbnM7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5obWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZSA9IE9iamVjdC5jcmVhdGUobW9kdWxlKTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCAnZXhwb3J0cycsIHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHNldDogKCkgPT4ge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdFUyBNb2R1bGVzIG1heSBub3QgYXNzaWduIG1vZHVsZS5leHBvcnRzIG9yIGV4cG9ydHMuKiwgVXNlIEVTTSBleHBvcnQgc3ludGF4LCBpbnN0ZWFkOiAnICsgbW9kdWxlLmlkKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiY29udGVudF9zY3JpcHRcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2hyb21lX2V4dGVuc2lvbl90eXBlc2NyaXB0X3N0YXJ0ZXJcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2hyb21lX2V4dGVuc2lvbl90eXBlc2NyaXB0X3N0YXJ0ZXJcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvbnRlbnRTY3JpcHQvaW5kZXgudHN4XCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=