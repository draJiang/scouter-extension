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
                marginTop: '14px',
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
        const port = webextension_polyfill_1.default.runtime.connect({
            name: 'fromPopupCard'
        });
        const handleMessage = (msg) => {
            if (msg.type === "UPDATE_POPUP_CARD") {
                // 根据 id 获取 Prompt
                if (msg.payload.prompt) {
                    executivePrompt(msg.payload.prompt, 'yes', msg.payload.prompt.getUnsplashImages, { keyWord: msg.payload.followUpData.keyWord, sentence: msg.payload.followUpData.sentence });
                }
            }
        };
        port.onMessage.addListener(handleMessage);
        return () => {
            port.onMessage.removeListener(handleMessage);
        };
    });
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
                        marginTop: '50px'
                    } },
                    react_1.default.createElement("div", { className: 'scouterContentBox flex-grow', ref: messagesList, style: {} },
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
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
  0 3px 6px -4px rgba(0, 0, 0, 0.12),
  0 9px 28px 8px rgba(0, 0, 0, 0.05);
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
  background-color: rgba(0,0,0,.25);
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

/***/ "./src/contentScript/ToolBar.tsx":
/*!***************************************!*\
  !*** ./src/contentScript/ToolBar.tsx ***!
  \***************************************/
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
exports.ToolBar = void 0;
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const styled_components_1 = __importStar(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
const antd_2 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const userInfo_1 = __webpack_require__(/*! ../lib/userInfo */ "./src/lib/userInfo.ts");
const index_1 = __webpack_require__(/*! ./index */ "./src/contentScript/index.tsx");
const lang_1 = __webpack_require__(/*! ../lib/lang */ "./src/lib/lang.ts");
const lang_2 = __webpack_require__(/*! ../lib/lang */ "./src/lib/lang.ts");
const util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");
const util_2 = __webpack_require__(/*! ../PopupCard/util */ "./src/PopupCard/util.ts");
const locale_1 = __webpack_require__(/*! ../lib/locale */ "./src/lib/locale.ts");
const icons_1 = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
const StyledButton = styled_components_1.default.button `
      
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
  
      ${props => props.$disable && (0, styled_components_1.css) `
        opacity: 0.5;
        cursor: help;
      `}
  
      // ${props => !props.$disable && (0, styled_components_1.css) `
      //   cursor: default;
      // `}
  
  
  `;
const IconButton = styled_components_1.default.button `
      
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
    const [showPromptsMenu, setShowPromptsMenu] = (0, react_1.useState)(false);
    const ContextBox = (0, react_1.useRef)(null);
    const [prompts, setPrompts] = (0, react_1.useState)([]);
    const [executedPromptHistoryInToolBar, setExecutedPromptHistoryInToolBar] = (0, react_1.useState)([]);
    const userInfo = (0, userInfo_1.useUserInfoContext)();
    // let portFromMenu: any
    // 获取包含 shadow DOM 的元素
    const shadowHost = document.querySelector('#__jiang-scouter');
    const shadowRoot = shadowHost === null || shadowHost === void 0 ? void 0 : shadowHost.shadowRoot;
    const container = shadowRoot === null || shadowRoot === void 0 ? void 0 : shadowRoot.querySelector('.container');
    let Lang = (0, locale_1.useCurrentLanguage)();
    const currentLanguage = Lang['current']['name'];
    const defaultPrompt = (0, util_2.getDefaultPrompt)(props.selectedTextString, currentLanguage);
    (0, react_1.useEffect)(() => {
        (() => __awaiter(this, void 0, void 0, function* () {
            let promptList = yield webextension_polyfill_1.default.storage.sync.get({ "promptList": [] }).then((item) => {
                return item.promptList;
            });
            promptList.unshift(util_2.dictionaryPrompt);
            promptList.unshift(defaultPrompt);
            setPrompts(promptList);
        }))();
        if (container) {
            const contextBox = ContextBox.current;
            const popupCard = container.querySelector('#LearningEnglish2023');
            const PopupCardContainer = container.getElementsByClassName(index_1.CONTAINER_CLASSNAME)[0];
            const scouterContentBox = container.querySelector('.scouterContentBox');
            //设置按钮的位置
            const selectedTextX = props.selectedText.x;
            const selectedTextY = props.selectedText.y;
            const selectedTextWidth = props.selectedText.width;
            const selectedTextHeight = props.selectedText.height;
            const buttonX = (contextBox === null || contextBox === void 0 ? void 0 : contextBox.getBoundingClientRect().x) || 0;
            const buttonY = (contextBox === null || contextBox === void 0 ? void 0 : contextBox.getBoundingClientRect().y) || 0;
            const buttonWidth = (contextBox === null || contextBox === void 0 ? void 0 : contextBox.getBoundingClientRect().width) || 0;
            // 选中文字相对窗口的偏移
            const offsetTop = popupCard.getBoundingClientRect().y - selectedTextY > -70 ? 30 : 0;
            // 最大 X 值
            const maxX = ((popupCard === null || popupCard === void 0 ? void 0 : popupCard.getBoundingClientRect().width) || 0) - buttonWidth - 10;
            const messageBoxHeight = scouterContentBox === null || scouterContentBox === void 0 ? void 0 : scouterContentBox.getBoundingClientRect().height;
            const containerBoxHeight = PopupCardContainer === null || PopupCardContainer === void 0 ? void 0 : PopupCardContainer.getBoundingClientRect().height;
            const height = messageBoxHeight > containerBoxHeight ? messageBoxHeight - 5 : containerBoxHeight - 4;
            const minY = 0 - height + offsetTop;
            let left = selectedTextX - buttonX + selectedTextWidth - 60;
            // left = left > maxX ? maxX : left
            left = Math.max(10, Math.min(maxX, left));
            let top = selectedTextY - buttonY - 40;
            // top = top < minY ? minY : top
            top = Math.max(minY, Math.min(80, top));
            // contextBox2!.style.position = 'relative'
            // contextBox!.style.position = 'absolute'
            contextBox.style.left = left.toString() + 'px';
            contextBox.style.top = top.toString() + 'px';
            setShowMenu(true);
        }
    }, []);
    const handleSetAnkiSpaceButtonClick = (event, isAddNew) => {
        setAnkiSpace(props.range, props.selectedTextString, event, isAddNew);
        // ContextBox.current!.parentNode?.removeChild(ContextBox.current!)
        setShowMenu(false);
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
    const executivePrompt = (prompt) => __awaiter(this, void 0, void 0, function* () {
        webextension_polyfill_1.default.runtime.sendMessage({
            type: 'UPDATE_POPUP_CARD', payload: {
                prompt: prompt,
                followUpData: {
                    keyWord: props.selectedTextString,
                    sentence: props.selectedSentence
                }
            }
        });
        setShowMenu(false);
    });
    const handleMenuClick = (e) => {
        const promptId = e.key;
        const prompt = prompts.find((item) => item.id === promptId);
        if (prompt) {
            executivePrompt(prompt);
            //记录历史记录
            webextension_polyfill_1.default.storage.local.set({
                executedPromptHistoryInToolBar: [prompt]
            });
        }
    };
    let items = [];
    items = prompts.map(item => { return { 'key': item.id, 'label': item.title }; });
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(antd_2.ConfigProvider, { theme: {
                token: {
                    colorPrimary: '#F08A24',
                },
            } }, showMenu && react_1.default.createElement("div", { ref: ContextBox, className: 'contextBox', style: {
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
                react_1.default.createElement(antd_1.Tooltip, { placement: "bottom", title: 'Prompt(⚡Pro)', arrow: false, open: showPromptsMenu },
                    react_1.default.createElement("div", { onMouseEnter: () => {
                            if (!(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified)) {
                                setShowPromptsMenu(true);
                            }
                        }, onMouseLeave: () => {
                            if (!(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified)) {
                                setShowPromptsMenu(false);
                            }
                        } },
                        react_1.default.createElement(antd_2.Dropdown.Button, { size: "small", overlayStyle: {
                                maxWidth: '180px',
                            }, getPopupContainer: () => ContextBox.current, disabled: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.user.verified), menu: menuProps, onClick: () => {
                                executivePrompt(props.executedPromptHistoryInToolBar[0]);
                            } }, props.executedPromptHistoryInToolBar.length > 0 && (props.executedPromptHistoryInToolBar[0].title.length > 10 ?
                            props.executedPromptHistoryInToolBar[0].title.substring(0, 10) + '...' :
                            props.executedPromptHistoryInToolBar[0].title)))))))));
}
exports.ToolBar = ToolBar;


/***/ }),

/***/ "./src/contentScript/index.tsx":
/*!*************************************!*\
  !*** ./src/contentScript/index.tsx ***!
  \*************************************/
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
exports.getSelection = exports.setDonotClosePopupCard = exports.pinPopupCard = exports.CONTAINER_CLASSNAME = void 0;
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
const PopupCard_1 = __webpack_require__(/*! ../PopupCard */ "./src/PopupCard/index.tsx");
const cssinjs_1 = __webpack_require__(/*! @ant-design/cssinjs */ "./node_modules/@ant-design/cssinjs/es/index.js");
const styled_components_1 = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
const util_1 = __webpack_require__(/*! ../PopupCard/util */ "./src/PopupCard/util.ts");
const lang_1 = __webpack_require__(/*! ../lib/lang */ "./src/lib/lang.ts");
const locale_1 = __webpack_require__(/*! ../lib/locale */ "./src/lib/locale.ts");
const userInfo_1 = __webpack_require__(/*! ../lib/userInfo */ "./src/lib/userInfo.ts");
const ToolBar_1 = __webpack_require__(/*! ./ToolBar */ "./src/contentScript/ToolBar.tsx");
const util_2 = __webpack_require__(/*! ../util */ "./src/util.ts");
const style_1 = __webpack_require__(/*! ../PopupCard/style */ "./src/PopupCard/style.ts");
const ShortcutButton_1 = __webpack_require__(/*! ./ShortcutButton */ "./src/contentScript/ShortcutButton.tsx");
const isFirefox = typeof InstallTrigger !== 'undefined';
// 容器类目
exports.CONTAINER_CLASSNAME = 'container';
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
container.className = exports.CONTAINER_CLASSNAME;
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
let executedPromptHistoryInToolBar = [util_1.dictionaryPrompt];
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
    // 在上下文菜单中最近执行的 Prompt
    const result = yield webextension_polyfill_1.default.storage.local.get({ "executedPromptHistoryInToolBar": [util_1.dictionaryPrompt] });
    executedPromptHistoryInToolBar = result.executedPromptHistoryInToolBar;
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
            if (((_a = MyBox.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.' + exports.CONTAINER_CLASSNAME)) === null) {
                // 如果不存在 PopupCard
                container = document.createElement('div');
                container.className = exports.CONTAINER_CLASSNAME;
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
            container.className = exports.CONTAINER_CLASSNAME;
            shadowRoot === null || shadowRoot === void 0 ? void 0 : shadowRoot.appendChild(container);
        }
        // const selection = window.getSelection();
        const selection = (0, exports.getSelection)();
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
                react_1.default.createElement(userInfo_1.UserInfoContext.Provider, { value: { user: USER_INFO, anki: ANKI_INFO } },
                    react_1.default.createElement(cssinjs_1.StyleProvider, { container: shadowRoot },
                        react_1.default.createElement(styled_components_1.StyleSheetManager, { target: shadowRoot },
                            react_1.default.createElement(PopupCard_1.PopupCard, { data: data, selection: msg, runPrompt: runPrompt, isPin: isPin })))))), MyBox);
    });
}
const pinPopupCard = (value) => {
    isPin = value;
};
exports.pinPopupCard = pinPopupCard;
const setDonotClosePopupCard = (value) => {
    donotClosePopupCard = value;
};
exports.setDonotClosePopupCard = setDonotClosePopupCard;
let isTextSelected = false;
let lastSelection = {
    anchorNode: null,
    anchorOffset: 0,
    focusNode: null,
    focusOffset: 0,
};
const handleMouseup = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // 是否在窗口中触发
    const isInShadow = MyBox === event.target || (MyBox === null || MyBox === void 0 ? void 0 : MyBox.contains(event.target));
    // 是否在快捷按钮上触发
    const path = event.composedPath();
    const isClickedInsideShortcutButton = path.some((element) => {
        return element.classList && element.classList.contains('ShortcutButton');
    });
    // 获取用户在宿主网页上选中的内容
    const selection = (0, exports.getSelection)(isInShadow);
    const range = selection === null || selection === void 0 ? void 0 : selection.selection.getRangeAt(0);
    lastSelection = {
        // 保存各个属性的引用和值
        anchorNode: selection === null || selection === void 0 ? void 0 : selection.selection.anchorNode,
        anchorOffset: selection === null || selection === void 0 ? void 0 : selection.selection.anchorOffset,
        focusNode: selection === null || selection === void 0 ? void 0 : selection.selection.focusNode,
        focusOffset: selection === null || selection === void 0 ? void 0 : selection.selection.focusOffset,
    };
    if (selection) {
        isTextSelected = selection.selection.toString().length > 0;
    }
    // 有选中文字且未开启 Prompt 设置界面（如果开启 Prompt 设置界面而仍然执行查询任务时，会导致不必要的任务执行）
    if (isTextSelected && !donotClosePopupCard) {
        if (!isInShadow || isClickedInsideShortcutButton) {
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
            // if (isFirefox) {
            //   selectedText = window.getSelection()
            // } else {
            //   selectedText = shadowRoot.getSelection()
            // }
            const selectedTextString = selection.keyWord.toString();
            // const sentence = ''
            const PopupCardContainer = container.getElementsByClassName(exports.CONTAINER_CLASSNAME)[0];
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
            if (PopupCardContainer && (selection === null || selection === void 0 ? void 0 : selection.selection.type) === 'Range' && !container.querySelector('.contextBox2')) {
                let contextBox2 = document.createElement('div');
                contextBox2.className = 'contextBox2';
                contextBox2.style.position = 'relative';
                PopupCardContainer.appendChild(contextBox2);
                let range = selection === null || selection === void 0 ? void 0 : selection.selection.getRangeAt(0);
                // console.log(selection);
                let lang = yield (0, lang_1.fetchcurrentLanguage)();
                react_dom_1.default.render(react_1.default.createElement(locale_1.CurrentLanguageContext.Provider, { value: lang },
                    react_1.default.createElement(userInfo_1.UserInfoContext.Provider, { value: { user: USER_INFO, anki: ANKI_INFO } },
                        react_1.default.createElement(styled_components_1.StyleSheetManager, { target: shadowRoot },
                            react_1.default.createElement(ToolBar_1.ToolBar, { selectedText: selection === null || selection === void 0 ? void 0 : selection.selection.getRangeAt(0).getBoundingClientRect(), selectedTextString: selectedTextString, selectedSentence: selection === null || selection === void 0 ? void 0 : selection.sentence, executedPromptHistoryInToolBar: executedPromptHistoryInToolBar, range: range })))), contextBox2);
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
                                if (((_a = MyBox === null || MyBox === void 0 ? void 0 : MyBox.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.' + exports.CONTAINER_CLASSNAME)) === null) {
                                    // 如果不存在 PopupCard
                                    container = document.createElement('div');
                                    container.className = exports.CONTAINER_CLASSNAME;
                                    shadowRoot === null || shadowRoot === void 0 ? void 0 : shadowRoot.appendChild(container);
                                }
                                // const newSelection = window.getSelection();
                                const selection = (0, exports.getSelection)(isInShadow);
                                const newSelection = selection === null || selection === void 0 ? void 0 : selection.selection;
                                // 重新选中划词区域
                                if (lastSelection) {
                                    // console.log('===============');
                                    // 创建一个范围对象
                                    const newRange = document.createRange();
                                    const anchorNode = lastSelection.anchorNode;
                                    const focusNode = lastSelection.focusNode;
                                    // console.log(lastSelection)
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
});
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
exports.getSelection = getSelection;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudF9zY3JpcHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG9DQUFvQztBQUNuRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSwwQ0FBMEMsNEJBQTRCO0FBQ3RFLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx3QkFBd0I7QUFDeEIsZ0RBQWdELG1CQUFPLENBQUMsNEZBQXVCO0FBQy9FLDZCQUE2QixtQkFBTyxDQUFDLDRDQUFPO0FBQzVDLGVBQWUsbUJBQU8sQ0FBQyw2Q0FBTTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsdUJBQXVCLHVFQUF1RTtBQUNuSTtBQUNBO0FBQ0Esb0ZBQW9GLGtCQUFrQjtBQUN0RztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsYUFBYSxpQkFBaUI7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHVCQUF1Qix1RUFBdUU7QUFDbkk7QUFDQSxvRkFBb0Ysa0JBQWtCO0FBQ3RHO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0Esc0JBQXNCLFNBQVM7QUFDL0Isc0JBQXNCLFNBQVM7QUFDL0IsYUFBYSxjQUFjO0FBQzNCLDhEQUE4RCx5Q0FBeUMsb0RBQW9ELEdBQUc7QUFDOUosOERBQThELDhGQUE4RjtBQUM1Siw4REFBOEQsNEhBQTRIO0FBQzFMO0FBQ0EsOERBQThEO0FBQzlELHVCQUF1QixFQUFFLFVBQVUsRUFBRTtBQUNyQztBQUNBLHVCQUF1QixFQUFFLFNBQVMsRUFBRTtBQUNwQztBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsNkhBQTZILDRCQUE0QixxREFBcUQsR0FBRztBQUMxTyx1RUFBdUUseUJBQXlCLFdBQVcsaUVBQWlFO0FBQzVLLDhEQUE4RCxTQUFTLGVBQWU7QUFDdEYsdUZBQXVGO0FBQ3ZGO0FBQ0EscUJBQXFCLGtEQUFrRDtBQUN2RSwrREFBK0QsU0FBUyxtQkFBbUIsdUNBQXVDO0FBQ2xJO0FBQ0Esd0JBQXdCOzs7Ozs7Ozs7OztBQy9JWDtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxvQ0FBb0M7QUFDbkQ7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsMENBQTBDLDRCQUE0QjtBQUN0RSxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsd0JBQXdCO0FBQ3hCLDZCQUE2QixtQkFBTyxDQUFDLDRDQUFPO0FBQzVDLGVBQWUsbUJBQU8sQ0FBQyxrREFBbUI7QUFDMUMsa0NBQWtDLG1CQUFPLENBQUMsaUdBQStCO0FBQ3pFLHNCQUFzQixtQkFBTyxDQUFDLDJGQUF1QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLHNJQUFzSTtBQUMvSSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRTtBQUNsRTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQSxzRUFBc0UsMkJBQTJCO0FBQ2pHO0FBQ0E7QUFDQSx3QkFBd0I7Ozs7Ozs7Ozs7O0FDdkVYO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG9DQUFvQztBQUNuRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSwwQ0FBMEMsNEJBQTRCO0FBQ3RFLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGNBQWM7QUFDZCw2QkFBNkIsbUJBQU8sQ0FBQyw0Q0FBTztBQUM1QyxnREFBZ0QsbUJBQU8sQ0FBQyw0RkFBdUI7QUFDL0UsZUFBZSxtQkFBTyxDQUFDLDZDQUFNO0FBQzdCLGdCQUFnQixtQkFBTyxDQUFDLHVFQUFtQjtBQUMzQyxpQkFBaUIsbUJBQU8sQ0FBQyw2Q0FBVTtBQUNuQyxtQkFBbUIsbUJBQU8sQ0FBQyw4Q0FBaUI7QUFDNUMsdUJBQXVCLG1CQUFPLENBQUMsbUVBQWM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLHVEQUF1RDtBQUM3SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLDZEQUE2RDtBQUNuSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLDhEQUE4RCx1REFBdUQ7QUFDckg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsMkJBQTJCO0FBQzNDLGNBQWMsNkJBQTZCO0FBQzNDLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLG1EQUFtRCx3RUFBd0U7QUFDM0g7QUFDQSwyREFBMkQ7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLHFGQUFxRix1QkFBdUI7QUFDNUc7QUFDQTtBQUNBO0FBQ0EsK0RBQStELHVCQUF1QjtBQUN0RiwwRUFBMEUsa09BQWtPO0FBQzVTLCtEQUErRDtBQUMvRDtBQUNBLCtCQUErQixpRUFBaUUsa0NBQWtDO0FBQ2xJO0FBQ0EsK0RBQStEO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLDBFQUEwRSxTQUFTLGtCQUFrQix3RkFBd0Y7QUFDN0w7QUFDQSwyREFBMkQ7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0IsK0RBQStEO0FBQy9EO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBLG1FQUFtRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkMsdUVBQXVFLFNBQVMsa0NBQWtDO0FBQ2xILGtGQUFrRjtBQUNsRjtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsK1dBQStXO0FBQ3haLHVFQUF1RTtBQUN2RTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDLG9GQUFvRixpSUFBaUk7QUFDck4sdUZBQXVGLCtIQUErSCwyTUFBMk0sb0dBQW9HO0FBQ3JnQixvRkFBb0Ysd0lBQXdJO0FBQzVOLHVGQUF1RiwrSEFBK0gsMk1BQTJNLDRHQUE0RztBQUM3Z0IsbUZBQW1GLHNDQUFzQyxnRkFBZ0YsZ0hBQWdIO0FBQ3pUO0FBQ0E7QUFDQSwyRUFBMkU7QUFDM0U7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0EsbUZBQW1GO0FBQ25GO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQsK0ZBQStGO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsNElBQTRJO0FBQ2pNLHVGQUF1RjtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZELCtGQUErRjtBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELDRJQUE0STtBQUNqTSwrRUFBK0U7QUFDL0U7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DLDJGQUEyRixzQ0FBc0MsZ0ZBQWdGLDJHQUEyRztBQUM1VDtBQUNBLG1FQUFtRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RUFBNkUsU0FBUywrQ0FBK0MseUlBQXlJO0FBQzlRO0FBQ0EsNkVBQTZFLFNBQVMsK0NBQStDLDBGQUEwRjtBQUMvTjtBQUNBLGNBQWM7Ozs7Ozs7Ozs7O0FDL1JEO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG9DQUFvQztBQUNuRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSwwQ0FBMEMsNEJBQTRCO0FBQ3RFLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELFdBQVc7QUFDWCxnREFBZ0QsbUJBQU8sQ0FBQyw0RkFBdUI7QUFDL0UsNkJBQTZCLG1CQUFPLENBQUMsNENBQU87QUFDNUMsZUFBZSxtQkFBTyxDQUFDLDZDQUFNO0FBQzdCLGVBQWUsbUJBQU8sQ0FBQyxzQ0FBYTtBQUNwQyxtQkFBbUIsbUJBQU8sQ0FBQyw4Q0FBaUI7QUFDNUMsa0NBQWtDLG1CQUFPLENBQUMsaUdBQStCO0FBQ3pFLDJCQUEyQixtQkFBTyxDQUFDLGlFQUFvQjtBQUN2RCxlQUFlLG1CQUFPLENBQUMsa0RBQW1CO0FBQzFDLHNCQUFzQixtQkFBTyxDQUFDLDJGQUF1QjtBQUNyRCxpQkFBaUIsWUFBWTtBQUM3Qix3QkFBd0IsbUJBQU8sQ0FBQyx1REFBa0I7QUFDbEQsZ0JBQWdCLG1CQUFPLENBQUMsdUVBQW1CO0FBQzNDLGlCQUFpQixtQkFBTyxDQUFDLDBDQUFlO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRSxpQ0FBaUM7QUFDM0csZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0dBQXdHLFNBQVMsK0JBQStCO0FBQ2hKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsc0JBQXNCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFFBQVEsc0ZBQXNGO0FBQzNJO0FBQ0Esd0NBQXdDLFFBQVEsc0ZBQXNGO0FBQ3RJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0lBQXNJO0FBQ3RJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEUsaUNBQWlDLDhHQUE4RyxHQUFHO0FBQzlOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsNkNBQTZDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxpQ0FBaUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGlDQUFpQztBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCwrQ0FBK0M7QUFDN0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRkFBb0Y7QUFDcEY7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGtDQUFrQztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRSxrQ0FBa0MsR0FBRztBQUN2RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsaUNBQWlDO0FBQzFFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRSxrREFBa0Q7QUFDcEg7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEUscUNBQXFDLHVEQUF1RCxnQkFBZ0IsS0FBSztBQUM3TDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStEO0FBQy9EO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsZUFBZTtBQUNmLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQ0FBa0M7QUFDbkQsdURBQXVELFNBQVMsYUFBYTtBQUM3RSx1RUFBdUUsc0VBQXNFO0FBQzdJLDhFQUE4RSw4REFBOEQ7QUFDNUksc0VBQXNFO0FBQ3RFO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQSx3RUFBd0U7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2Qyw2RUFBNkUsK0JBQStCO0FBQzVHLGtGQUFrRjtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGtEQUFrRDtBQUNuRixxR0FBcUcsc05BQXNOLDJDQUEyQyxHQUFHO0FBQ3pXLHFHQUFxRyw2S0FBNkssNkNBQTZDLEdBQUc7QUFDbFUsZ0ZBQWdGLFNBQVMsbUJBQW1CO0FBQzVHLCtIQUErSCxvSEFBb0gsMEJBQTBCLEdBQUc7QUFDaFIsd0ZBQXdGLG9DQUFvQztBQUM1SCwwR0FBMEcsU0FBUyxrQkFBa0IsdURBQXVELHNCQUFzQix1RUFBdUUsR0FBRztBQUM1UixtRkFBbUYsU0FBUyxrQkFBa0IsaUNBQWlDO0FBQy9JLHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLDJEQUEyRDtBQUMzRDtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBLHdGQUF3Rix5QkFBeUI7QUFDakg7QUFDQSxvRUFBb0U7QUFDcEU7QUFDQTtBQUNBLGlDQUFpQywrREFBK0Q7QUFDaEc7QUFDQSxvRkFBb0YsK0JBQStCLGNBQWM7QUFDakk7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyx5Q0FBeUM7QUFDekMsd01BQXdNO0FBQ3hNLG1FQUFtRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qix1RUFBdUUsb0JBQW9CLDhGQUE4RjtBQUNsTjtBQUNBLFdBQVc7Ozs7Ozs7Ozs7O0FDM1pFO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG9DQUFvQztBQUNuRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSwwQ0FBMEMsNEJBQTRCO0FBQ3RFLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsY0FBYztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsb0JBQW9CO0FBQ3BCLGdEQUFnRCxtQkFBTyxDQUFDLDRGQUF1QjtBQUMvRSw2QkFBNkIsbUJBQU8sQ0FBQyw0Q0FBTztBQUM1Qyw0Q0FBNEMsbUJBQU8sQ0FBQyxpR0FBbUI7QUFDdkUsZUFBZSxtQkFBTyxDQUFDLDZDQUFNO0FBQzdCLHNCQUFzQixtQkFBTyxDQUFDLDJGQUF1QjtBQUNyRCx5Q0FBeUMsbUJBQU8sQ0FBQyw4REFBZ0I7QUFDakUsd0NBQXdDLG1CQUFPLENBQUMsNERBQWU7QUFDL0QscUNBQXFDLG1CQUFPLENBQUMsc0RBQVk7QUFDekQscUNBQXFDLG1CQUFPLENBQUMsc0RBQVk7QUFDekQsMkNBQTJDLG1CQUFPLENBQUMsaUVBQTRCO0FBQy9FLGlCQUFpQixtQkFBTyxDQUFDLHlEQUFzQjtBQUMvQyxlQUFlLG1CQUFPLENBQUMsdUNBQVE7QUFDL0I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELHdEQUF3RCxzRUFBc0UsTUFBTTtBQUN2TCx5REFBeUQsU0FBUyxrQkFBa0IscUlBQXFJO0FBQ3pOO0FBQ0EsaUVBQWlFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0EseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQiw4RUFBOEUsdUNBQXVDLHFCQUFxQjtBQUMxSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLHVCQUF1QjtBQUN2Qix3REFBd0QsU0FBUyxzRUFBc0U7QUFDdkk7QUFDQSwyREFBMkQ7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQiwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQix3RUFBd0U7QUFDeEU7QUFDQSxtQ0FBbUM7QUFDbkMsbUVBQW1FLFNBQVMsbUJBQW1CO0FBQy9GLHdFQUF3RTtBQUN4RTtBQUNBLG1DQUFtQztBQUNuQywrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBLDhFQUE4RTtBQUM5RTtBQUNBLHNDQUFzQyxPQUFPO0FBQzdDLDhFQUE4RSxTQUFTLHVCQUF1QjtBQUM5RywyRkFBMkY7QUFDM0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDLDZCQUE2QjtBQUM3QjtBQUNBLHNDQUFzQyxPQUFPO0FBQzdDLDBGQUEwRiw0QkFBNEIsb0JBQW9CO0FBQzFJO0FBQ0EseUJBQXlCLGlEQUFpRDtBQUMxRSxzR0FBc0csZUFBZTtBQUNySCwrREFBK0Q7QUFDL0Q7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCx3REFBd0QsNENBQTRDO0FBQ3BHLEtBQUs7QUFDTDtBQUNBLG9CQUFvQjs7Ozs7Ozs7Ozs7QUNuUFA7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsb0NBQW9DO0FBQ25EO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLDBDQUEwQyw0QkFBNEI7QUFDdEUsQ0FBQztBQUNEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQiw2QkFBNkIsbUJBQU8sQ0FBQyw0Q0FBTztBQUM1QyxlQUFlLG1CQUFPLENBQUMsdUNBQVE7QUFDL0IsNENBQTRDLG1CQUFPLENBQUMsaUdBQW1CO0FBQ3ZFLG1CQUFtQixtQkFBTyxDQUFDLDhDQUFpQjtBQUM1QyxpQkFBaUIsbUJBQU8sQ0FBQyx5REFBc0I7QUFDL0MsaUJBQWlCLG1CQUFPLENBQUMsMENBQWU7QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLHNDQUFzQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxvRkFBb0YsdUNBQXVDLDhGQUE4RixHQUFHO0FBQy9RLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLG9EQUFvRCxTQUFTLGFBQWE7QUFDMUU7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZiwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBLGlCQUFpQixHQUFHO0FBQ3BCLDBEQUEwRDtBQUMxRDtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBLDJDQUEyQyxnQ0FBZ0MsRUFBRSxXQUFXO0FBQ3hGLHFFQUFxRSw0SkFBNEo7QUFDak8sYUFBYTtBQUNiO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQy9HTDtBQUNiO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHdCQUF3QjtBQUN4QixlQUFlLG1CQUFPLENBQUMsNkNBQU07QUFDN0IsZ0NBQWdDLG1CQUFPLENBQUMsNENBQU87QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0Esd0JBQXdCOzs7Ozs7Ozs7OztBQ3ZCWDtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxvQ0FBb0M7QUFDbkQ7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsMENBQTBDLDRCQUE0QjtBQUN0RSxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQkFBaUI7QUFDakIsZ0RBQWdELG1CQUFPLENBQUMsNEZBQXVCO0FBQy9FLDZCQUE2QixtQkFBTyxDQUFDLDRDQUFPO0FBQzVDLGVBQWUsbUJBQU8sQ0FBQyw4QkFBUztBQUNoQyxlQUFlLG1CQUFPLENBQUMsNkNBQU07QUFDN0IsaUJBQWlCLG1CQUFPLENBQUMsMENBQWU7QUFDeEMsZUFBZSxtQkFBTyxDQUFDLHNDQUFhO0FBQ3BDLGdCQUFnQixtQkFBTyxDQUFDLHVFQUFtQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCwyQ0FBMkM7QUFDekc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsZ0ZBQWdGLDJEQUEyRDtBQUMzSTtBQUNBO0FBQ0EseURBQXlELDJEQUEyRDtBQUNwSCwyREFBMkQ7QUFDM0Q7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDZIQUE2SDtBQUM5STtBQUNBLGlCQUFpQjtBQUNqQjs7Ozs7Ozs7Ozs7QUNqSmE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsb0NBQW9DO0FBQ25EO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLDBDQUEwQyw0QkFBNEI7QUFDdEUsQ0FBQztBQUNEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHdCQUF3QjtBQUN4Qiw2QkFBNkIsbUJBQU8sQ0FBQyw0Q0FBTztBQUM1QyxlQUFlLG1CQUFPLENBQUMsNkNBQU07QUFDN0IsZ0JBQWdCLG1CQUFPLENBQUMsdUVBQW1CO0FBQzNDLHVCQUF1QixtQkFBTyxDQUFDLG1FQUFjO0FBQzdDLFFBQVEsV0FBVztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsMkJBQTJCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDJCQUEyQjtBQUMzQyxjQUFjLDZCQUE2QjtBQUMzQyxrQkFBa0IsZ0JBQWdCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsbURBQW1ELDhCQUE4Qiw2Q0FBNkM7QUFDOUgscURBQXFEO0FBQ3JELDBCQUEwQjtBQUMxQix1Q0FBdUMsc0JBQXNCLG9CQUFvQjtBQUNqRiw4REFBOEQsc0JBQXNCLDhCQUE4QjtBQUNsSCwwREFBMEQsNERBQTRELHdCQUF3QjtBQUM5SSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLHFCQUFxQixzREFBc0Q7QUFDM0UsOERBQThELFNBQVMsb0JBQW9CO0FBQzNGLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtRUFBbUUsMkNBQTJDLFNBQVMsc0JBQXNCO0FBQ2xLLDZFQUE2RSx1QkFBdUI7QUFDcEc7QUFDQSw4REFBOEQsU0FBUyxlQUFlO0FBQ3RGO0FBQ0Esd0JBQXdCOzs7Ozs7Ozs7OztBQ3pHWDtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxvQ0FBb0M7QUFDbkQ7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsMENBQTBDLDRCQUE0QjtBQUN0RSxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsaUJBQWlCO0FBQ2pCLGdEQUFnRCxtQkFBTyxDQUFDLDRGQUF1QjtBQUMvRSw2QkFBNkIsbUJBQU8sQ0FBQyw0Q0FBTztBQUM1QyxlQUFlLG1CQUFPLENBQUMsZ0VBQU07QUFDN0Isd0JBQXdCLG1CQUFPLENBQUMsdURBQWtCO0FBQ2xELGNBQWMsbUJBQU8sQ0FBQyxtREFBbUI7QUFDekMsMkJBQTJCLG1CQUFPLENBQUMsNkVBQWdDO0FBQ25FLGtCQUFrQixtQkFBTyxDQUFDLDhDQUFXO0FBQ3JDLHFCQUFxQixtQkFBTyxDQUFDLG9EQUFjO0FBQzNDLDJCQUEyQixtQkFBTyxDQUFDLGdFQUFvQjtBQUN2RCwyQkFBMkIsbUJBQU8sQ0FBQyxnRUFBb0I7QUFDdkQsb0JBQW9CLG1CQUFPLENBQUMsa0RBQWE7QUFDekMsZUFBZSxtQkFBTyxDQUFDLDZDQUFNO0FBQzdCLGlCQUFpQixtQkFBTyxDQUFDLDBDQUFlO0FBQ3hDLG1CQUFtQixtQkFBTyxDQUFDLDhDQUFpQjtBQUM1QyxlQUFlLG1CQUFPLENBQUMsdUNBQVE7QUFDL0IsNENBQTRDLG1CQUFPLENBQUMsaUdBQW1CO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBLFFBQVEsV0FBVztBQUNuQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGdGQUFnRixnR0FBZ0c7QUFDaEw7QUFDQTtBQUNBLG9GQUFvRixxRUFBcUU7QUFDeko7QUFDQSwwRUFBMEUsaUNBQWlDO0FBQzNHLG9FQUFvRSwyQkFBMkI7QUFDL0Ysb0ZBQW9GLHdCQUF3QjtBQUM1RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVHQUF1Ryx3RkFBd0Y7QUFDL0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsaUNBQWlDO0FBQ2pFO0FBQ0E7QUFDQSxnRUFBZ0UsMEJBQTBCO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsc0VBQXNFLFNBQVMsZ0JBQWdCLFVBQVUscUJBQXFCO0FBQzVKO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxrSEFBa0g7QUFDN0osS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEZBQTBGLHlDQUF5QztBQUNuSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLDRCQUE0QjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRSxxREFBcUQ7QUFDdkg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiw4QkFBOEI7QUFDekQ7QUFDQSxxRkFBcUYsZUFBZTtBQUNwRztBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyx5QkFBeUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyRUFBMkUsb0NBQW9DO0FBQy9HO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxzRkFBc0Y7QUFDdkg7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsaUNBQWlDO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRkFBcUYsa0JBQWtCLG1DQUFtQztBQUMxSTtBQUNBLHlCQUF5QjtBQUN6QixxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlGQUF5RixrQkFBa0IsbUNBQW1DO0FBQzlJO0FBQ0EsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlGQUF5RixrQkFBa0IsbUNBQW1DO0FBQzlJO0FBQ0EsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MscUVBQXFFO0FBQ3pHO0FBQ0Esa0VBQWtFLG1EQUFtRDtBQUNySDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRixrQkFBa0I7QUFDdEc7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELGtCQUFrQjtBQUNqRixnQ0FBZ0MsNEJBQTRCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSw4REFBOEQsd0RBQXdEO0FBQ3RILEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsa0NBQWtDO0FBQy9EO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx5RUFBeUU7QUFDNUcsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLG9FQUFvRTtBQUN2RyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRixrQkFBa0IsdURBQXVEO0FBQzFKO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxpQ0FBaUM7QUFDMUU7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYiw4REFBOEQsU0FBUyxtRkFBbUY7QUFDMUosdUNBQXVDLG1DQUFtQztBQUMxRTtBQUNBLDhEQUE4RCx1REFBdUQ7QUFDckg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qiw4REFBOEQ7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLElBQUk7QUFDcEIsaUNBQWlDLDBCQUEwQjtBQUMzRCxzREFBc0QsU0FBUztBQUMvRCxxREFBcUQsU0FBUztBQUM5RDtBQUNBLGlCQUFpQixFQU9KO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFLDBEQUEwRDtBQUM1SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsbUVBQW1FO0FBQ25FO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsbUJBQW1CO0FBQ25CO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsaURBQWlEO0FBQ2pELDBWQUEwVjtBQUMxVix1REFBdUQ7QUFDdkQ7QUFDQSx1QkFBdUI7QUFDdkIsMkRBQTJELHdFQUF3RTtBQUNuSSwrRUFBK0UsMEJBQTBCO0FBQ3pHLGdGQUFnRixvQkFBb0I7QUFDcEc7QUFDQTtBQUNBO0FBQ0EseUdBQXlHLDhFQUE4RTtBQUN2TCwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0IscUZBQXFGLG1JQUFtSTtBQUN4TixxRkFBcUYsMERBQTBEO0FBQy9JO0FBQ0EsbUVBQW1FO0FBQ25FLG9DQUFvQztBQUNwQztBQUNBLDJFQUEyRSxTQUFTLGFBQWEsd0NBQXdDLHVCQUF1Qix1RUFBdUUsR0FBRyxjQUFjO0FBQ3hQLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixnQ0FBZ0M7QUFDN0QsNkZBQTZGLGdIQUFnSDtBQUM3TTtBQUNBLGlCQUFpQjtBQUNqQjs7Ozs7Ozs7Ozs7QUNwc0JhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHNCQUFzQjtBQUN0QixzQkFBc0I7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCO0FBQ3ZCOztBQUVBO0FBQ0EsdUJBQXVCO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRDtXQUN0RCxzQ0FBc0MsaUVBQWlFO1dBQ3ZHO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7Ozs7O1dDVkE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7V0NoREE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbXBvbmVudHMvQ3VzdG9tUHJvbXB0Rm9ybS50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvQ29tcG9uZW50cy9Ecm9wZG93bk1lbnVJdGVtLnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Db21wb25lbnRzL0ltYWdlcy50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvQ29tcG9uZW50cy9OYXYudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC9NZXNzYWdlLnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvUHJvbXB0TGlzdC50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvUG9wdXBDYXJkL1JlZ2VuZXJhdGVCdXR0b24udHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC9TZWxlY3Rpb24udHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC9Vc2VyTWVzc2FnZUlucHV0LnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvaW5kZXgudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC9zdHlsZS50cyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvdXRpbC50cyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9jb250ZW50U2NyaXB0L1Nob3J0Y3V0QnV0dG9uLnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9jb250ZW50U2NyaXB0L1Rvb2xCYXIudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2NvbnRlbnRTY3JpcHQvaW5kZXgudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2xpYi9sb2NhbGUudHMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvYXNzZXRzL3NldHRpbmdHdWlkZS5wbmciLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvY3JlYXRlIGZha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFybW9ueSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ3VzdG9tUHJvbXB0Rm9ybSA9IHZvaWQgMDtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5mdW5jdGlvbiBDdXN0b21Qcm9tcHRGb3JtKHByb3BzKSB7XG4gICAgY29uc3QgW2Zvcm1dID0gYW50ZF8xLkZvcm0udXNlRm9ybSgpO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAvLyDmm7TmlrAgaW5wdXQg5paH5pys5qGG55qE6buY6K6k5YC8XG4gICAgICAgIGZvcm0uc2V0RmllbGRzVmFsdWUoe1xuICAgICAgICAgICAgdGl0bGU6IHByb3BzLmRhdGEudGl0bGUsXG4gICAgICAgICAgICBnZXRVbnNwbGFzaEltYWdlczogcHJvcHMuZGF0YS5nZXRVbnNwbGFzaEltYWdlcyxcbiAgICAgICAgICAgIHVzZXJQcm9tcHQ6IHByb3BzLmRhdGEudXNlclByb21wdFxuICAgICAgICB9KTtcbiAgICB9LCBbcHJvcHMuZGF0YV0pO1xuICAgIC8vIOS/neWtmCBQcm9tcHRcbiAgICBjb25zdCBzYXZlUHJvbXB0ID0gKHZhbHVlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyDlhbPpl63ooajljZVcbiAgICAgICAgcHJvcHMub3BlbkN1c3RvbVByb21wdEZvcm0oeyBpc09wZW46IGZhbHNlLCBkYXRhOiB7ICd0aXRsZSc6ICcnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBmYWxzZSwgJ3VzZXJQcm9tcHQnOiAnJywgJ2lkJzogJycgfSB9KTtcbiAgICAgICAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoKTtcbiAgICAgICAgLy8g6I635Y+W5bey5L+d5a2Y55qEIFByb21wdCBMaXN0XG4gICAgICAgIGNvbnN0IHByb21wdExpc3QgPSB5aWVsZCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2Uuc3luYy5nZXQoeyBcInByb21wdExpc3RcIjogW10gfSkudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucHJvbXB0TGlzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBuZXdQcm9tcHRzID0gcHJvbXB0TGlzdDtcbiAgICAgICAgLy8g5aaC5p6cIHByb3BzIOS4reWMheWQqyBJRO+8jOWImeivtOaYjuW9k+WJjeaYr+WcqOe8lui+kSBQcm9tcHQg6ICM5LiN5piv5paw5aKeIFByb21wdFxuICAgICAgICBpZiAocHJvcHMuZGF0YS5pZCAhPT0gJycpIHtcbiAgICAgICAgICAgIC8vIOWcqCBQcm9tcHQg6K6w5b2V5Lit5om+5Yiw6L+Z5p2hIFByb21wdFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdQcm9tcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1Byb21wdHNbaV1bJ2lkJ10gPT09IHByb3BzLmRhdGEuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5L+u5pS5XG4gICAgICAgICAgICAgICAgICAgIG5ld1Byb21wdHNbaV1bJ3RpdGxlJ10gPSB2YWx1ZXNbJ3RpdGxlJ107XG4gICAgICAgICAgICAgICAgICAgIG5ld1Byb21wdHNbaV1bJ2dldFVuc3BsYXNoSW1hZ2VzJ10gPSB2YWx1ZXNbJ2dldFVuc3BsYXNoSW1hZ2VzJ107XG4gICAgICAgICAgICAgICAgICAgIG5ld1Byb21wdHNbaV1bJ3VzZXJQcm9tcHQnXSA9IHZhbHVlc1sndXNlclByb21wdCddO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuZXdQcm9tcHRzID0gW09iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdmFsdWVzKSwgeyAnaWQnOiB0aW1lc3RhbXAgfSksIC4uLnByb21wdExpc3RdO1xuICAgICAgICB9XG4gICAgICAgIC8vIOWwhiBQcm9tcHQg5L+d5a2Y5LiL5p2lXG4gICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLnNldCh7XG4gICAgICAgICAgICBwcm9tcHRMaXN0OiBuZXdQcm9tcHRzLmxlbmd0aCA+IDYgPyBuZXdQcm9tcHRzLnNwbGljZSgwLCA2KSA6IG5ld1Byb21wdHMsXG4gICAgICAgIH0pLnRoZW4oaXRlbSA9PiB7XG4gICAgICAgICAgICAvLyDlsIYgUHJvbXB0IOS8oOWbnue7meeItue7hOS7tu+8jOS7peiuqSBQcm9tcHQg5YiX6KGoIFVJIOmHjeaWsOa4suafk1xuICAgICAgICAgICAgcHJvcHMuaGFuZGxlUHJvbXB0RWRpdGVkKHByb3BzLmRhdGEuaWQgPT09ICcnKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBhbGVydCgn8J+lslNhdmUgZmFpbGVkLCBwb3NzaWJseSBkdWUgdG8gYSB0b28gbG9uZyBQcm9tcHQuIFlvdSBjYW4gZGVsZXRlIG90aGVyIFByb21wdHMgb3Igc2hvcnRlbiB0aGUgUHJvbXB0IGNoYXJhY3RlcnMgYW5kIHRyeSBhZ2Fpbi4gXFxuJyArIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8g5Yig6ZmkIFByb21wdFxuICAgIGNvbnN0IGhhbmRsZURlbGV0ZUJ1dHRvbkNsaWNrID0gKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyDlhbPpl63ooajljZVcbiAgICAgICAgcHJvcHMub3BlbkN1c3RvbVByb21wdEZvcm0oeyBpc09wZW46IGZhbHNlLCBkYXRhOiB7ICd0aXRsZSc6ICcnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBmYWxzZSwgJ3VzZXJQcm9tcHQnOiAnJywgJ2lkJzogJycgfSB9KTtcbiAgICAgICAgLy8g6I635Y+W5bey5L+d5a2Y55qEIFByb21wdCBMaXN0XG4gICAgICAgIGNvbnN0IHByb21wdExpc3QgPSB5aWVsZCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2Uuc3luYy5nZXQoeyBcInByb21wdExpc3RcIjogW10gfSkudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucHJvbXB0TGlzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBuZXdQcm9tcHRzID0gcHJvbXB0TGlzdDtcbiAgICAgICAgLy8g5ZyoIFByb21wdCDorrDlvZXkuK3mib7liLDov5nmnaEgUHJvbXB0XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3UHJvbXB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKG5ld1Byb21wdHNbaV1bJ2lkJ10gPT09IHByb3BzLmRhdGEuaWQpIHtcbiAgICAgICAgICAgICAgICAvLyDliKDpmaRcbiAgICAgICAgICAgICAgICBuZXdQcm9tcHRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAvLyDlsIYgUHJvbXB0IOS/neWtmOS4i+adpVxuICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLnNldCh7XG4gICAgICAgICAgICAgICAgICAgIHByb21wdExpc3Q6IG5ld1Byb21wdHMubGVuZ3RoID4gNiA/IG5ld1Byb21wdHMuc3BsaWNlKDAsIDYpIDogbmV3UHJvbXB0cyxcbiAgICAgICAgICAgICAgICB9KS50aGVuKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyDlsIYgUHJvbXB0IOS8oOWbnue7meeItue7hOS7tu+8jOS7peiuqSBQcm9tcHQg5YiX6KGoIFVJIOmHjeaWsOa4suafk1xuICAgICAgICAgICAgICAgICAgICBwcm9wcy5oYW5kbGVQcm9tcHRFZGl0ZWQocHJvcHMuZGF0YS5pZCA9PT0gJycpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9O1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0sIHsgb25GaW5pc2g6IHNhdmVQcm9tcHQsIFxuICAgICAgICAgICAgLy8gbGF5b3V0PSdob3Jpem9udGFsJ1xuICAgICAgICAgICAgbGFiZWxDb2w6IHtcbiAgICAgICAgICAgICAgICB4czogeyBzcGFuOiA2IH0sXG4gICAgICAgICAgICAgICAgc206IHsgc3BhbjogNSB9LFxuICAgICAgICAgICAgfSwgZm9ybTogZm9ybSB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBuYW1lOiBcInRpdGxlXCIsIGxhYmVsOiBcIlRpdGxlXCIsIHJ1bGVzOiBbeyByZXF1aXJlZDogdHJ1ZSwgbWVzc2FnZTogJ1BsZWFzZSBpbnB1dCB5b3VyIHRpdGxlJyB9XSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbnB1dCwgeyBtYXhMZW5ndGg6IDQwLCBvbktleURvd246IGhhbmRsZUtleURvd24sIHBsYWNlaG9sZGVyOiBcIkhvdyB0byBuYW1lIHRoZSBQcm9tcHRcIiwgdHlwZTogXCJ0ZXh0XCIgfSkpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBleHRyYTogXCJEaXNwbGF5IEltYWdlcyBSZWxhdGVkIHRvIHRoZSBTZWxlY3RlZCBUZXh0XCIsIG5hbWU6IFwiZ2V0VW5zcGxhc2hJbWFnZXNcIiwgbGFiZWw6IFwiSW1hZ2VzXCIsIHZhbHVlUHJvcE5hbWU6IFwiY2hlY2tlZFwiIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlN3aXRjaCwgbnVsbCkpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBuYW1lOiBcInVzZXJQcm9tcHRcIiwgbGFiZWw6IFwiUHJvbXB0XCIsIGV4dHJhOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGAkeyd7c2VsZWN0aW9ufSd9OiBTZWxlY3RlZCB0ZXh0YCxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJiclwiLCBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgYCR7J3tzZW50ZW5jZX0nfTogU2VudGVuY2UgY29udGFpbmluZyB0aGUgc2VsZWN0ZWQgdGV4dGAsXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYnJcIiwgbnVsbCksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNGMDhBMjQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgb25DbGljazogKCkgPT4gd2luZG93Lm9wZW4oJ2h0dHBzOi8vamlhbmd6aWxvbmcubm90aW9uLnNpdGUvRHluYW1pYy1QbGFjZWhvbGRlcnMtNWYwNzA1MTYzZmY2NDBhZmJkZDU3NzExNWRjOTU3Nzk/cHZzPTQnKSB9LCBcIkxlYXJuIE1vcmVcIikpLCBydWxlczogW3sgcmVxdWlyZWQ6IHRydWUsIG1lc3NhZ2U6ICdQbGVhc2UgaW5wdXQgeW91ciBwcm9tcHQnIH1dIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLklucHV0LlRleHRBcmVhLCB7IHBsYWNlaG9sZGVyOiBcIlRyYW5zbGF0ZSB7c2VsZWN0aW9ufSB0byBDaGluZXNlXCIsIG9uS2V5RG93bjogaGFuZGxlS2V5RG93biwgcm93czogNCwgbWF4TGVuZ3RoOiAzMDAwIH0pKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgc3R5bGU6IHsgbWFyZ2luOiAnMCcgfSB9LFxuICAgICAgICAgICAgICAgIHByb3BzLmRhdGEuaWQgIT09ICcnICYmIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnMTJweCdcbiAgICAgICAgICAgICAgICAgICAgfSwgb25DbGljazogaGFuZGxlRGVsZXRlQnV0dG9uQ2xpY2ssIGRhbmdlcjogdHJ1ZSB9LCBcIkRlbGV0ZVwiKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7IG1pbldpZHRoOiAnMTIwcHgnIH0sIHR5cGU6IFwicHJpbWFyeVwiLCBodG1sVHlwZTogXCJzdWJtaXRcIiB9LCBcIlNhdmVcIikpKSkpO1xufVxuZXhwb3J0cy5DdXN0b21Qcm9tcHRGb3JtID0gQ3VzdG9tUHJvbXB0Rm9ybTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRyb3Bkb3duTWVudUl0ZW0gPSB2b2lkIDA7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vUG9wdXBDYXJkL3V0aWxcIik7XG5jb25zdCBEcm9wZG93bk1lbnUgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIkByYWRpeC11aS9yZWFjdC1kcm9wZG93bi1tZW51XCIpKTtcbmNvbnN0IHJlYWN0X2ljb25zXzEgPSByZXF1aXJlKFwiQHJhZGl4LXVpL3JlYWN0LWljb25zXCIpO1xuZnVuY3Rpb24gRHJvcGRvd25NZW51SXRlbShwcm9wcykge1xuICAgIGNvbnN0IFtpc0hvdmVyZWQsIHNldElzSG92ZXJlZF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgIH0pO1xuICAgIGNvbnN0IG9uU2VsZWN0ID0gKCkgPT4ge1xuICAgICAgICBwcm9wcy5vblNlbGVjdCgpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlRWRpdFByb21wdCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcHJvcHMuaGFuZGxlRWRpdFByb21wdCgpO1xuICAgIH07XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnUuSXRlbSwgeyBzdHlsZToge1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgcGFkZGluZzogJzZweCcsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc0cHgnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4J1xuICAgICAgICB9LCBjbGFzc05hbWU6IFwiRHJvcGRvd25NZW51SXRlbVwiLCBvbk1vdXNlRW50ZXI6ICgpID0+IHNldElzSG92ZXJlZCh0cnVlKSwgb25Nb3VzZUxlYXZlOiAoKSA9PiBzZXRJc0hvdmVyZWQoZmFsc2UpLCBvblNlbGVjdDogb25TZWxlY3QgfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBmbGV4OiAnMScsXG4gICAgICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJ1xuICAgICAgICAgICAgfSB9LCBwcm9wcy5jaGlsZHJlbiksXG4gICAgICAgIGlzSG92ZXJlZCAmJlxuICAgICAgICAgICAgKHByb3BzLmRhdGEuaWQgPT09ICdEZWZhdWx0JyA/XG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oJ2h0dHBzOi8vamlhbmd6aWxvbmcubm90aW9uLnNpdGUvV2hhdC1pcy10aGUtZGVmYXVsdC1Qcm9tcHQtUHJvbXB0LTViNTVlM2ZjMzAzZDQyNWY4Y2NhMTZkNWJlZTE5ZTdjJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfaWNvbnNfMS5RdWVzdGlvbk1hcmtDaXJjbGVkSWNvbiwgbnVsbCkpXG4gICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5kYXRhLmlkID09PSB1dGlsXzEuZGljdGlvbmFyeVByb21wdC5pZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IG9uQ2xpY2s6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oJ2h0dHBzOi8vamlhbmd6aWxvbmcubm90aW9uLnNpdGUvT25saW5lLURpY3Rpb25hcnktNDM3Mzc1MjdkYzEzNGJjZWIyZDQwZWQ3OWJlMWUwZTM/cHZzPTQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfaWNvbnNfMS5RdWVzdGlvbk1hcmtDaXJjbGVkSWNvbiwgbnVsbCkpXG4gICAgICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBvbkNsaWNrOiBoYW5kbGVFZGl0UHJvbXB0IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ljb25zXzEuUGVuY2lsMkljb24sIG51bGwpKSkpKTtcbn1cbmV4cG9ydHMuRHJvcGRvd25NZW51SXRlbSA9IERyb3Bkb3duTWVudUl0ZW07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5JbWFnZXMgPSB2b2lkIDA7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgaWNvbnNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9pY29uc1wiKTtcbmNvbnN0IFByb1RhZ18xID0gcmVxdWlyZShcIi4vUHJvVGFnXCIpO1xuY29uc3QgdXNlckluZm9fMSA9IHJlcXVpcmUoXCIuLi9saWIvdXNlckluZm9cIik7XG5jb25zdCByZWFjdF9zcHJpbmdfMSA9IHJlcXVpcmUoXCJyZWFjdC1zcHJpbmdcIik7XG5mdW5jdGlvbiBJbWFnZXMocHJvcHMpIHtcbiAgICAvLyBjb25zdCBbaW1hZ2VzLCBzZXRJbWFnZXNdID0gdXNlU3RhdGU8QXJyYXk8SW1hZ2VUeXBlPj4oW10pO1xuICAgIGNvbnN0IFtpbWFnZUluZGV4LCBzZXRJbWFnZUluZGV4XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgwKTtcbiAgICBjb25zdCBbc2hvd0NvbnRyb2wsIHNldFNob3dDb250cm9sXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3QgW2NoYW5nZUltYWdlLCBzZXRDaGFuZ2VJbWFnZVN0YXR1c10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtpbWFnZXNMb2FkaW5nLCBzZXRJbWFnZXNMb2FkaW5nXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh0cnVlKTtcbiAgICAvLyBjb25zdCBbc2VhcmNoSW1hZ2VJc0xvYWRpbmcsIHNldFNlYXJjaEltYWdlSXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICAgIGNvbnN0IHVzZXJJbmZvID0gKDAsIHVzZXJJbmZvXzEudXNlVXNlckluZm9Db250ZXh0KSgpO1xuICAgIC8vIGNvbnN0IFtjdXJyZW50VVJMLCBzZXRDdXJyZW50VVJMXSA9IHVzZVN0YXRlPHN0cmluZz4oKTtcbiAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSAoMCwgcmVhY3RfMS51c2VSZWYpKG51bGwpO1xuICAgIGNvbnN0IGltYWdlQm94RWxlbWVudCA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3QgY29tcG9zaW5nID0gKDAsIHJlYWN0XzEudXNlUmVmKShmYWxzZSk7XG4gICAgY29uc3QgaGFuZGxlQ29tcG9zaXRpb25TdGFydCA9ICgpID0+IHtcbiAgICAgICAgY29tcG9zaW5nLmN1cnJlbnQgPSB0cnVlO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlQ29tcG9zaXRpb25FbmQgPSAoKSA9PiB7XG4gICAgICAgIGNvbXBvc2luZy5jdXJyZW50ID0gZmFsc2U7XG4gICAgfTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgLy8gc2V0SW1hZ2VzKHByb3BzLmltYWdlcylcbiAgICAgICAgc2V0SW1hZ2VzTG9hZGluZyhmYWxzZSk7XG4gICAgfSwgW3Byb3BzLmltYWdlc10pO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGlucHV0RWxlbWVudCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGlucHV0RWxlbWVudC5jdXJyZW50KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coaW5wdXRFbGVtZW50LmN1cnJlbnQ/LmlucHV0KTtcbiAgICAgICAgaWYgKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSB7XG4gICAgICAgICAgICAoX2EgPSBpbnB1dEVsZW1lbnQuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9LCBbY2hhbmdlSW1hZ2VdKTtcbiAgICBjb25zdCBoYW5kbGVFZGl0SW1hZ2VzQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHNldENoYW5nZUltYWdlU3RhdHVzKHRydWUpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlU2VhcmNoSW5wdXQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVTZWFyY2hCdG5DbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBzZXRJbWFnZUluZGV4KDApO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSB7XG4gICAgICAgICAgICBsZXQgaW5wdXRWYWx1ZSA9IChfYiA9IChfYSA9IGlucHV0RWxlbWVudC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5wdXQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi52YWx1ZTtcbiAgICAgICAgICAgIGlmIChpbnB1dFZhbHVlICYmIGlucHV0VmFsdWUgIT09ICcnICYmICFjb21wb3NpbmcuY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHNldEltYWdlc0xvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgICAgICAgLy8g5pCc57Si5Zu+54mHXG4gICAgICAgICAgICAgICAgcHJvcHMuZ2V0VW5zcGxhc2hJbWFnZXMoaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgc2V0Q2hhbmdlSW1hZ2VTdGF0dXMoZmFsc2UpO1xuICAgICAgICAgICAgICAgIC8vIGFtcGxpdHVkZS50cmFjaygnaGFuZGxlU2VhcmNoSW1hZ2UnKTtcbiAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ2hhbmRsZVNlYXJjaEltYWdlJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KCdQbGVhc2UgYWN0aXZhdGUgUHJvJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUdlbmVyYXRpb25zSW1hZ2VzID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHNldEltYWdlSW5kZXgoMCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpIHtcbiAgICAgICAgICAgIGxldCBpbnB1dFZhbHVlID0gKF9iID0gKF9hID0gaW5wdXRFbGVtZW50LmN1cnJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pbnB1dCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnZhbHVlO1xuICAgICAgICAgICAgaWYgKGlucHV0VmFsdWUgJiYgaW5wdXRWYWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBzZXRJbWFnZXNMb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgICAgIC8vIOeUn+aIkOWbvueJh1xuICAgICAgICAgICAgICAgIHByb3BzLmdlbmVyYXRpb25zSW1hZ2VzKGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgICAgIHNldENoYW5nZUltYWdlU3RhdHVzKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ2hhbmRsZUdlbmVyYXRpb25zSW1hZ2VzJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KCdQbGVhc2UgYWN0aXZhdGUgUHJvJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUNoYW5nZUltYWdlc0NsaWNrID0gKG9mZnNldCkgPT4ge1xuICAgICAgICBzZXRJbWFnZUluZGV4KGluZGV4ID0+IHtcbiAgICAgICAgICAgIGluZGV4ID0gaW5kZXggKyBvZmZzZXQ7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gcHJvcHMuaW1hZ2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IHByb3BzLmltYWdlcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gYW1wbGl0dWRlLnRyYWNrKCdoYW5kbGVDaGFuZ2VJbWFnZScpO1xuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ2hhbmRsZUNoYW5nZUltYWdlJyB9KTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUltYWdlc0JveEhvdmVyID0gKGUpID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgaWYgKGUudHlwZSA9PT0gJ21vdXNlZW50ZXInKSB7XG4gICAgICAgICAgICBzZXRTaG93Q29udHJvbCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS50eXBlID09PSAnbW91c2VsZWF2ZScpIHtcbiAgICAgICAgICAgIC8vIOaYvuekuuWbvueJh+aQnOe0ouahhuaXtuS4jeiHquWKqOmakOiXj+aOp+S7tlxuICAgICAgICAgICAgaWYgKCFjaGFuZ2VJbWFnZSB8fCAoKF9iID0gKF9hID0gaW5wdXRFbGVtZW50LmN1cnJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pbnB1dCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnZhbHVlKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBzZXRTaG93Q29udHJvbChmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2V0Q2hhbmdlSW1hZ2VTdGF0dXMoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc2V0U2hvd0NvbnRyb2wodHJ1ZSlcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgYW5pbWF0aW9uU3R5bGUgPSAoMCwgcmVhY3Rfc3ByaW5nXzEudXNlU3ByaW5nKSh7XG4gICAgICAgIGZyb206IHsgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJyB9LFxuICAgICAgICB0bzogeyB0cmFuc2Zvcm06ICdyb3RhdGUoMzYwZGVnKScgfSxcbiAgICAgICAgY29uZmlnOiB7IGR1cmF0aW9uOiAxMDAwIH0sXG4gICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgIHdpZHRoOiAnMzJweCcsXG4gICAgICAgIGhlaWdodDogJzMycHgnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgcmVkJ1xuICAgIH0pO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiaW1hZ2VzXCIsIHJlZjogaW1hZ2VCb3hFbGVtZW50LCBzdHlsZToge1xuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMCcsXG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICcxOHB4J1xuICAgICAgICB9IH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IG9uTW91c2VFbnRlcjogaGFuZGxlSW1hZ2VzQm94SG92ZXIsIG9uTW91c2VMZWF2ZTogaGFuZGxlSW1hZ2VzQm94SG92ZXIgfSxcbiAgICAgICAgICAgICAgICBpbWFnZXNMb2FkaW5nICYmXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYigwLCAwLCAwLDAuNSknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6ICc5J1xuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3Rfc3ByaW5nXzEuYW5pbWF0ZWQuZGl2LCB7IHN0eWxlOiBhbmltYXRpb25TdHlsZSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuTG9hZGluZ091dGxpbmVkLCBudWxsKSkpLFxuICAgICAgICAgICAgICAgIHByb3BzLmltYWdlcy5sZW5ndGggPiAwID9cbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiaW1hZ2VCb3hcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbWFnZSwgeyBcImRhdGEtZG93bmxvYWRsb2NhdGlvblwiOiBwcm9wcy5pbWFnZXNbaW1hZ2VJbmRleF0ubGlua3MuZG93bmxvYWRfbG9jYXRpb24sIHNyYzogcHJvcHMuaW1hZ2VzW2ltYWdlSW5kZXhdLnVybHMuc21hbGwsIGFsdDogcHJvcHMuaW1hZ2VzW2ltYWdlSW5kZXhdWydkZXNjcmlwdGlvbiddLCBoZWlnaHQ6IDI0MCwgd2lkdGg6ICcxMDAlJywgcHJldmlldzogZmFsc2UsIHBsYWNlaG9sZGVyOiB0cnVlIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImltYWdlUXVldWVcIiwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBwcm9wcy5pbWFnZXMubWFwKGltZyA9PiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7IGtleTogaW1nLmlkLCBzcmM6IGltZy51cmxzLnNtYWxsIH0pKSkpXG4gICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMjQwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzJweCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkVtcHR5LCB7IHN0eWxlOiB7IG1hcmdpbjogJzAgYXV0bycgfSwgZGVzY3JpcHRpb246ICdObyByZWxhdGVkIHBpY3R1cmVzIGZvdW5kJywgaW1hZ2U6IGFudGRfMS5FbXB0eS5QUkVTRU5URURfSU1BR0VfU0lNUExFIH0pKSxcbiAgICAgICAgICAgICAgICBzaG93Q29udHJvbCAmJiAhaW1hZ2VzTG9hZGluZyAmJlxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzAgMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWFyb3VuZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBtYXJnaW46ICcwcHggMThweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMzYwZGVnLCByZ2JhKDAsIDAsIDAsIDApIDAlLCByZ2JhKDAsIDAsIDAsIDAuMSkgMjcuNiUsIHJnYmEoMCwgMCwgMCwgMC4yKSA1NC42OSUsIHJnYmEoMCwgMCwgMCwgMC4zNSkgMTAwJSknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBjaGFuZ2VJbWFnZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pi+56S65Zu+54mH5pCc57Si5o6n5Lu2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMnB4IDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyBmbGV4OiAnMScsIG1hcmdpblJpZ2h0OiAnMjBweCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLklucHV0LCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSA9PT0gZmFsc2UgPyAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkpJyA6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICcycHgnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgc3VmZml4OiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChQcm9UYWdfMS5Qcm9UYWcsIG51bGwpLCBkaXNhYmxlZDogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCksIHBsYWNlaG9sZGVyOiBcIlNlYXJjaCBpbWFnZXNcIiwgb25LZXlEb3duOiBoYW5kbGVTZWFyY2hJbnB1dCwgb25Db21wb3NpdGlvblN0YXJ0OiBoYW5kbGVDb21wb3NpdGlvblN0YXJ0LCBvbkNvbXBvc2l0aW9uRW5kOiBoYW5kbGVDb21wb3NpdGlvbkVuZCwgc2l6ZTogXCJzbWFsbFwiLCByZWY6IGlucHV0RWxlbWVudCwgb25QcmVzc0VudGVyOiBoYW5kbGVTZWFyY2hCdG5DbGljayB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Ub29sdGlwLCB7IHBsYWNlbWVudDogXCJib3R0b21cIiwgdGl0bGU6ICdTZWFyY2ggSW1hZ2VzKOKPjiknLCBhcnJvdzogZmFsc2UsIGdldFBvcHVwQ29udGFpbmVyOiAoKSA9PiBpbWFnZUJveEVsZW1lbnQuY3VycmVudCB8fCBkb2N1bWVudC5ib2R5IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBkaXNhYmxlZDogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCksIHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIHN0eWxlOiB7IGNvbG9yOiAnI2ZmZicsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgbWFyZ2luUmlnaHQ6ICcxMHB4Jywgb3BhY2l0eTogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCkgPyAnMC43JyA6ICcxJyB9LCBvbkNsaWNrOiBoYW5kbGVTZWFyY2hCdG5DbGljaywgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5TZWFyY2hPdXRsaW5lZCwgbnVsbCkgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlRvb2x0aXAsIHsgcGxhY2VtZW50OiBcImJvdHRvbVwiLCB0aXRsZTogJ0dlbmVyYXRlIEltYWdlcyB3aXRoIEFJJywgYXJyb3c6IGZhbHNlLCBnZXRQb3B1cENvbnRhaW5lcjogKCkgPT4gaW1hZ2VCb3hFbGVtZW50LmN1cnJlbnQgfHwgZG9jdW1lbnQuYm9keSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgZGlzYWJsZWQ6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpLCB0eXBlOiBcInRleHRcIiwgc2l6ZTogXCJzbWFsbFwiLCBzdHlsZTogeyBjb2xvcjogJyNmZmYnLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIG1hcmdpblJpZ2h0OiAnMTBweCcsIG9wYWNpdHk6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpID8gJzAuNycgOiAnMScgfSwgb25DbGljazogaGFuZGxlR2VuZXJhdGlvbnNJbWFnZXMsIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuVGh1bmRlcmJvbHRPdXRsaW5lZCwgbnVsbCkgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyB0eXBlOiBcInRleHRcIiwgc2l6ZTogXCJzbWFsbFwiLCBzdHlsZTogeyBjb2xvcjogJyNmZmYnLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfSwgb25DbGljazogKCkgPT4gc2V0Q2hhbmdlSW1hZ2VTdGF0dXMoZmFsc2UpLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkNsb3NlT3V0bGluZWQsIG51bGwpIH0pKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleEdyb3c6ICdpbmhlcml0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaW1hZ2VzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuTGVmdE91dGxpbmVkLCBudWxsKSwgb25DbGljazogKCkgPT4gaGFuZGxlQ2hhbmdlSW1hZ2VzQ2xpY2soLTEpIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzQwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzAgNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBpbWFnZUluZGV4ICsgMSArICcvJyArIHByb3BzLmltYWdlcy5sZW5ndGgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuUmlnaHRPdXRsaW5lZCwgbnVsbCksIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUNoYW5nZUltYWdlc0NsaWNrKDEpIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93LXJldmVyc2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogJzEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgdHlwZTogXCJ0ZXh0XCIsIHNpemU6IFwic21hbGxcIiwgc3R5bGU6IHsgY29sb3I6ICcjZmZmJywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH0sIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUVkaXRJbWFnZXNDbGljaygpLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkZvcm1PdXRsaW5lZCwgbnVsbCkgfSkpKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaW1hZ2VzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbWFnZVNvdXJjZVwiLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogJzEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2ZsZXgtZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMC45MGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiAnNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFNoYWRvdzogJzJweCAycHggNXB4IHJnYmEoMCwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBwcm9wcy5pbWFnZXNbaW1hZ2VJbmRleF0udHlwZSA9PT0gJ2FpJyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCwgXCJQaG90byBieSBBSVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQaG90byBieSBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBzdHlsZTogeyB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsIHBhZGRpbmc6ICcwIDJweCcgfSwgdGFyZ2V0OiAnX2JsYW5rJywgaHJlZjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9AXCIgKyBwcm9wcy5pbWFnZXNbaW1hZ2VJbmRleF0udXNlci51c2VybmFtZSArIFwiP3V0bV9zb3VyY2U9U2NvdXRlciZ1dG1fbWVkaXVtPXJlZmVycmFsXCIgfSwgcHJvcHMuaW1hZ2VzW2ltYWdlSW5kZXhdLnVzZXIubmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgb24gXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgc3R5bGU6IHsgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnLCBwYWRkaW5nOiAnMCAycHgnIH0sIHRhcmdldDogJ19ibGFuaycsIGhyZWY6IFwiaHR0cHM6Ly91bnNwbGFzaC5jb20vP3V0bV9zb3VyY2U9U2NvdXRlciZ1dG1fbWVkaXVtPXJlZmVycmFsXCIgfSwgXCJVbnNwbGFzaFwiKSkpKSkpKSk7XG59XG5leHBvcnRzLkltYWdlcyA9IEltYWdlcztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk5hdiA9IHZvaWQgMDtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCBsYW5nXzEgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG5jb25zdCB1c2VySW5mb18xID0gcmVxdWlyZShcIi4uL2xpYi91c2VySW5mb1wiKTtcbmNvbnN0IERyb3Bkb3duTWVudSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQHJhZGl4LXVpL3JlYWN0LWRyb3Bkb3duLW1lbnVcIikpO1xuY29uc3QgRHJvcGRvd25NZW51SXRlbV8xID0gcmVxdWlyZShcIi4vRHJvcGRvd25NZW51SXRlbVwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi9Qb3B1cENhcmQvdXRpbFwiKTtcbmNvbnN0IHJlYWN0X2ljb25zXzEgPSByZXF1aXJlKFwiQHJhZGl4LXVpL3JlYWN0LWljb25zXCIpO1xuLy8gaW1wb3J0IHR5cGUgeyBNZW51UHJvcHMgfSBmcm9tICdhbnRkJztcbmNvbnN0IGNvbnRlbnRTY3JpcHRfMSA9IHJlcXVpcmUoXCIuLi9jb250ZW50U2NyaXB0XCIpO1xuY29uc3QgaWNvbnNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9pY29uc1wiKTtcbmNvbnN0IGxvY2FsZV8xID0gcmVxdWlyZShcIi4uL2xpYi9sb2NhbGVcIik7XG5mdW5jdGlvbiBOYXYocHJvcHMpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnN0IFtpc1Bpbiwgc2V0SXNQaW5dID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbY3VycmVudFVSTCwgc2V0Q3VycmVudFVSTF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoKTtcbiAgICBjb25zdCBbaXNPcGVuUHJvbXB0TWVudSwgc2V0SXNPcGVuUHJvbXB0TWVudV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IGRlZmF1bHRQcm9tcHQgPSAoMCwgcmVhY3RfMS51c2VSZWYpKCk7XG4gICAgY29uc3QgW2FkZFRvQW5raVN0YXR1cywgc2V0QWRkVG9BbmtpU3RhdHVzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgLy8gY29uc3QgeyBPcHRpb24gfSA9IFNlbGVjdDtcbiAgICBjb25zdCBuYXZFbGVtZW50ID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICBjb25zdCB1c2VySW5mbyA9ICgwLCB1c2VySW5mb18xLnVzZVVzZXJJbmZvQ29udGV4dCkoKTtcbiAgICBsZXQgTGFuZyA9ICgwLCBsb2NhbGVfMS51c2VDdXJyZW50TGFuZ3VhZ2UpKCk7XG4gICAgY29uc3QgY3VycmVudExhbmd1YWdlID0gTGFuZ1snY3VycmVudCddWyduYW1lJ107XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIC8vIOW9k+S4jeiHquWKqOiHquihjCBQcm9tcHTvvIzoh6rliqjmiZPlvIAgUHJvbXB0IOiPnOWNleS+m+eUqOaIt+mAieaLqVxuICAgICAgICBpZiAocHJvcHMuaXNPcGVuTWVudSkge1xuICAgICAgICAgICAgb25NZW51T3BlbkNoYW5nZShwcm9wcy5pc09wZW5NZW51KTtcbiAgICAgICAgfVxuICAgIH0sIFtwcm9wcy5pc09wZW5NZW51XSk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIGRlZmF1bHRQcm9tcHQuY3VycmVudCA9ICgwLCB1dGlsXzEuZ2V0RGVmYXVsdFByb21wdCkocHJvcHMua2V5V29yZCwgY3VycmVudExhbmd1YWdlKTtcbiAgICAgICAgLy8g6K6+572u5re75Yqg5YiwIEFua2kg55qE5pON5L2c54q25oCBXG4gICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyhwcm9wcy5hZGRUb0Fua2lTdGF0dXMpO1xuICAgIH0sIFtwcm9wcy5hZGRUb0Fua2lTdGF0dXNdKTtcbiAgICBjb25zdCBoYW5kbGVNZW51Q2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBoYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2soZS5rZXkpO1xuICAgIH07XG4gICAgbGV0IGl0ZW1zID0gW107XG4gICAgaWYgKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby5hbmtpLmRlY2tzKSB7XG4gICAgICAgIGl0ZW1zID0gdXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLmFua2kuZGVja3MubWFwKChkZWNrKSA9PiB7IHJldHVybiB7ICdrZXknOiBkZWNrLCAnbGFiZWwnOiBkZWNrIH07IH0pO1xuICAgIH1cbiAgICBjb25zdCBtZW51UHJvcHMgPSB7XG4gICAgICAgIGl0ZW1zLFxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVNZW51Q2xpY2ssXG4gICAgfTtcbiAgICAvLyAvLyDngrnlh7vkv53lrZjliLAgQW5raSDmjInpkq5cbiAgICAvLyBjb25zdCBoYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2sgPSAoKSA9PiB7XG4gICAgLy8gICAgIHByb3BzLmhhbmRsZVNhdmVUb0Fua2lCdG5DbGljaygpXG4gICAgLy8gfTtcbiAgICAvLyDmt7vliqDliLAgQW5raVxuICAgIGNvbnN0IGFkZFRvQW5raSA9IChkZWNrTmFtZSwgbW9kZWxOYW1lLCBmcm9udCwgYmFjaykgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgIGNvbnN0IGtleVdvcmQgPSBwcm9wcy5rZXlXb3JkO1xuICAgICAgICBjb25zdCBTZW50ZW5jZSA9IHByb3BzLlNlbnRlbmNlO1xuICAgICAgICBjb25zdCB3aW5kb3dFbGVtZW50ID0gcHJvcHMud2luZG93RWxlbWVudDtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9ICcnO1xuICAgICAgICBsZXQgaW1hZ2VzID0gJyc7XG4gICAgICAgIGxldCB1bnNwbGFzaF9kb3dubG9hZF9sb2NhdGlvbjtcbiAgICAgICAgbGV0IHN0YyA9IGtleVdvcmQubGVuZ3RoIDw9IDIwID8gU2VudGVuY2UgOiAnJztcbiAgICAgICAgLy8g6L2s56e7IEhUTUwg5qCH562+77yM5oyJ54Wn5pmu6YCa5a2X56ym5Liy5aSE55CGXG4gICAgICAgIHN0YyA9IHN0Yy5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKTtcbiAgICAgICAgLy8g5Zyo6K+t5aKD5Y+l5a2Q5Lit5bCG5YWz6ZSu5a2X56qB5Ye65pi+56S6XG4gICAgICAgIHN0YyA9IHN0Yy5yZXBsYWNlKG5ldyBSZWdFeHAoa2V5V29yZCwgJ2cnKSwgJzxzcGFuIGNsYXNzPVwia2V5V29yZFwiPicgKyBrZXlXb3JkICsgJzwvc3Bhbj4nKTtcbiAgICAgICAgbGV0IFNjb3V0ZXJTZWxlY3Rpb24gPSAnJztcbiAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIOmAieS4reeahOaWh+Wtl1xuICAgICAgICAgICAgU2NvdXRlclNlbGVjdGlvbiA9IChfYSA9IHdpbmRvd0VsZW1lbnQgPT09IG51bGwgfHwgd2luZG93RWxlbWVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2luZG93RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjU2NvdXRlclNlbGVjdGlvbicpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NwYW4nKVswXS5pbm5lckhUTUw7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3aW5kb3dFbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IHdpbmRvd0VsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgY29udGFpbmVyID0gd2luZG93RWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZXNzYWdlcycpWzBdLmlubmVySFRNTDtcbiAgICAgICAgICAgIC8vIOWkhOeQhiBjb250YWluZXIg55qE5YaF5a65XG4gICAgICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICAgICAgbGV0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoY29udGFpbmVyLCAndGV4dC9odG1sJyk7XG4gICAgICAgICAgICBsZXQgZWxlbWVudHNUb1JlbW92ZSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCcuaW1hZ2VRdWV1ZScpO1xuICAgICAgICAgICAgbGV0IGltYWdlU291cmNlID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbWFnZVNvdXJjZScpO1xuICAgICAgICAgICAgLy8g5Yib5bu65paw55qEIGltZyDmoIfnrb5cbiAgICAgICAgICAgIC8vIOiuvue9ruWbvueJh+eahOWwuuWvuOOAgeagt+W8j1xuICAgICAgICAgICAgaWYgKGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZUJveCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgaW1nID0gZG9jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlQm94JylbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdO1xuICAgICAgICAgICAgICAgIGltZy53aWR0aCA9IDA7XG4gICAgICAgICAgICAgICAgY29uc3QgaW1nVXJsID0gaW1nLnNyYztcbiAgICAgICAgICAgICAgICBsZXQgbmV3SW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgICAgICBuZXdJbWcuc3JjID0gaW1nVXJsO1xuICAgICAgICAgICAgICAgIC8vIOiOt+WPluimgeabv+aNoueahCBkaXZcbiAgICAgICAgICAgICAgICBsZXQgZGl2ID0gZG9jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlQm94JylbMF07XG4gICAgICAgICAgICAgICAgaWYgKGRpdikge1xuICAgICAgICAgICAgICAgICAgICAvLyDkvb/nlKjmlrDnmoQgaW1nIOagh+etvuabv+aNoiBkaXZcbiAgICAgICAgICAgICAgICAgICAgKF9iID0gZGl2LnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5yZXBsYWNlQ2hpbGQobmV3SW1nLCBkaXYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOayoeacieWbvueJh1xuICAgICAgICAgICAgICAgIGNvbnN0IGltZ3MgPSBkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzJylbMF07XG4gICAgICAgICAgICAgICAgaWYgKGltZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9jID0gaW1ncy5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucmVtb3ZlQ2hpbGQoaW1ncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5Yig6Zmk6aKE5Yqg6L2955qE5Zu+54mHXG4gICAgICAgICAgICBlbGVtZW50c1RvUmVtb3ZlLmZvckVhY2goZWwgPT4geyB2YXIgX2E7IHJldHVybiAoX2EgPSBlbC5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlQ2hpbGQoZWwpOyB9KTtcbiAgICAgICAgICAgIC8vIOWIoOmZpOWbvueJh+adpea6kOS/oeaBr1xuICAgICAgICAgICAgaW1hZ2VTb3VyY2UuZm9yRWFjaChlbCA9PiB7IHZhciBfYTsgcmV0dXJuIChfYSA9IGVsLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVDaGlsZChlbCk7IH0pO1xuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jLmJvZHkuaW5uZXJIVE1MO1xuICAgICAgICAgICAgLy8g5aSE55CG5qC35byP77yM6YG/5YWNIEFua2kg5YaF5pi+56S65byC5bi4XG4gICAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXIucmVwbGFjZSgvc3R5bGU9L2csICcnKTtcbiAgICAgICAgICAgIGlmICh3aW5kb3dFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlQm94JylbMF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGltYWdlcyA9IHdpbmRvd0VsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VCb3gnKVswXS5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgLy8g6I635Y+WIHVuc3BsYXNoQXBpIOeahCBkb3dubG9hZF9sb2NhdGlvblxuICAgICAgICAgICAgICAgIHVuc3BsYXNoX2Rvd25sb2FkX2xvY2F0aW9uID0gKF9kID0gd2luZG93RWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXMnKVswXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0ucGFyZW50RWxlbWVudCkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmdldEF0dHJpYnV0ZSgnZGF0YS1kb3dubG9hZGxvY2F0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpbWFnZXMpO1xuICAgICAgICAgICAgLy8g5aSE55CG5qC35byP77yM6YG/5YWNIEFua2kg5YaF5pi+56S65byC5bi4XG4gICAgICAgICAgICBpbWFnZXMgPSBpbWFnZXMucmVwbGFjZSgvc3R5bGU9L2dpLCAnJyk7XG4gICAgICAgICAgICBpbWFnZXMgPSBpbWFnZXMucmVwbGFjZSgvd2lkdGgvZ2ksICcnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjYXJkU3R5bGUgPSBgYDtcbiAgICAgICAgY29uc3QgdGhpc0xhbmcgPSBsYW5nXzEubGFuZztcbiAgICAgICAgbGV0IGF1ZGlvVXJsID0gJ2h0dHA6Ly9kaWN0LnlvdWRhby5jb20vZGljdHZvaWNlP3R5cGU9MCZhdWRpbz0nO1xuICAgICAgICBsZXQgYXVkaW8sIGZpbGVuYW1lO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXVkaW9VcmwgPSB0aGlzTGFuZ1tMYW5nWyd0YXJnZXQnXVsnaWQnXV1bJ2F1ZGlvVVJMJ107XG4gICAgICAgICAgICAvLyBmaWxlbmFtZSA9IERhdGUubm93KCkudG9TdHJpbmcoKVxuICAgICAgICAgICAgZmlsZW5hbWUgPSAnJztcbiAgICAgICAgICAgIGF1ZGlvID0gW3tcbiAgICAgICAgICAgICAgICAgICAgXCJ1cmxcIjogYXVkaW9VcmwgKyBrZXlXb3JkLFxuICAgICAgICAgICAgICAgICAgICBcImZpbGVuYW1lXCI6IFwiU2NvdXRlclwiICsgZmlsZW5hbWUgKyBcIi5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmaWVsZHNcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJGcm9udFwiXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGF1ZGlvID0gW107XG4gICAgICAgIH1cbiAgICAgICAgLy8g5bi46KeE57G75Z6LXG4gICAgICAgIGxldCBhbmtpQmFjayA9ICc8cD4gPGJsb2NrcXVvdGU+JyArIHN0YyArICcg4oCU4oCUIDxhIGhyZWY9XCInICsgd2luZG93LmxvY2F0aW9uLmhyZWYgKyAnXCI+U291cmNlPC9hPjwvYmxvY2txdW90ZT48L3A+JyArIGNvbnRhaW5lcjtcbiAgICAgICAgaWYgKGtleVdvcmQubGVuZ3RoID4gMjApIHtcbiAgICAgICAgICAgIC8vIOWmguaenOmAieS4reeahOespuWPt+mVv+W6puWkp+S6jiAyMO+8iOivtOaYjuaYr+WPpeWtkO+8ieWImeS4jeaYvuekuuS4iuS4i+aWh+WPpeWtkO+8jOeEtuWQjuWwhuadpea6kOmTvuaOpeaUvuWIsOWwvumDqFxuICAgICAgICAgICAgYW5raUJhY2sgPSBjb250YWluZXIgKyAnPHA+PGEgaHJlZj1cIicgKyB3aW5kb3cubG9jYXRpb24uaHJlZiArICdcIj5Tb3VyY2U8L2E+PC9wPic7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHAgPSB7XG4gICAgICAgICAgICBcIm5vdGVcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVja05hbWVcIjogZGVja05hbWUsXG4gICAgICAgICAgICAgICAgXCJtb2RlbE5hbWVcIjogbW9kZWxOYW1lLFxuICAgICAgICAgICAgICAgIFwiZmllbGRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgW2Zyb250XToga2V5V29yZCxcbiAgICAgICAgICAgICAgICAgICAgW2JhY2tdOiBjYXJkU3R5bGUgKyBhbmtpQmFja1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJhdWRpb1wiOiBhdWRpbyxcbiAgICAgICAgICAgICAgICBcInRhZ3NcIjogW1xuICAgICAgICAgICAgICAgICAgICBcIlNjb3V0ZXJcIlxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8g5a6M5b2i5aGr56m657G75Z6LXG4gICAgICAgIGlmIChTY291dGVyU2VsZWN0aW9uLmluZGV4T2YoJ2NsYXNzPVwiYW5raVNwYWNlXCInKSA+PSAwIHx8IGNvbnRhaW5lci5pbmRleE9mKCdjbGFzcz1cImFua2lTcGFjZVwiJykgPj0gMCB8fCBjb250YWluZXIuaW5kZXhPZigne3tjJykgPj0gMCkge1xuICAgICAgICAgICAgbGV0IG5ld0Zyb250O1xuICAgICAgICAgICAgbmV3RnJvbnQgPSAnPHA+JyArIFNjb3V0ZXJTZWxlY3Rpb24gKyAnPC9wPicgKyAnPGJsb2NrcXVvdGU+JyArIHN0YyArICcg4oCU4oCUIDxhIGhyZWY9XCInICsgd2luZG93LmxvY2F0aW9uLmhyZWYgKyAnXCI+U291cmNlPC9hPjwvYmxvY2txdW90ZT4nICsgY29udGFpbmVyO1xuICAgICAgICAgICAgaWYgKGtleVdvcmQubGVuZ3RoID4gMjApIHtcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzpgInkuK3nmoTnrKblj7fplb/luqblpKfkuo4gMjDvvIjor7TmmI7mmK/lj6XlrZDvvInliJnkuI3mmL7npLrkuIrkuIvmloflj6XlrZDvvIznhLblkI7lsIbmnaXmupDpk77mjqXmlL7liLDlsL7pg6hcbiAgICAgICAgICAgICAgICBuZXdGcm9udCA9ICc8cD4nICsgU2NvdXRlclNlbGVjdGlvbiArICc8L3A+JyArIGNvbnRhaW5lciArICc8cD4gPGEgaHJlZj1cIicgKyB3aW5kb3cubG9jYXRpb24uaHJlZiArICdcIj5Tb3VyY2U8L2E+PC9wPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwID0ge1xuICAgICAgICAgICAgICAgIFwibm90ZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZGVja05hbWVcIjogZGVja05hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwibW9kZWxOYW1lXCI6IG1vZGVsTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJmaWVsZHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgW2Zyb250XTogbmV3RnJvbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBbYmFja106ICcnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiYXVkaW9cIjogW10sXG4gICAgICAgICAgICAgICAgICAgIFwidGFnc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlNjb3V0ZXJcIlxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyDlj5HpgIHmtojmga/nu5kgYmFja2dyb3VuZFxuICAgICAgICBsZXQgc2VuZGluZyA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FkZE5vdGUnLCAnbWVzc2FnZXMnOiB7ICdhbmtpX2FyZ3VtZW50cyc6IHAsICdhbmtpX2FjdGlvbl90eXBlJzogJ2FkZE5vdGUnLCAndW5zcGxhc2hfZG93bmxvYWRfbG9jYXRpb24nOiB1bnNwbGFzaF9kb3dubG9hZF9sb2NhdGlvbiB9LCB9KTtcbiAgICAgICAgc2VuZGluZy50aGVuKGhhbmRsZVJlc3BvbnNlLCBoYW5kbGVFcnJvcik7XG4gICAgICAgIC8vIOaOpeaUtiBiYWNrZ3JvdW5kIOeahOWbnuWkjVxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVSZXNwb25zZShtZXNzYWdlKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmVycm9yID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdzdWNjZXNzJywgJ25vdGVJZCc6IG1lc3NhZ2UuZGF0YSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KG1lc3NhZ2UuZXJyb3IpO1xuICAgICAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlRXJyb3IoZXJybykge1xuICAgICAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdub3JtYWwnLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVycm8pO1xuICAgICAgICB9XG4gICAgICAgIC8vIOaVsOaNruWfi+eCuVxuICAgICAgICAvLyBhbXBsaXR1ZGUudHJhY2soJ2FkZFRvQW5raScpO1xuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ2FkZFRvQW5raScgfSk7XG4gICAgfTtcbiAgICAvLyDngrnlh7vkv53lrZjliLAgQW5raVxuICAgIGNvbnN0IGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljayA9IChkZWNrKSA9PiB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3Qgd2luZG93RWxlbWVudCA9IHByb3BzLndpbmRvd0VsZW1lbnQ7XG4gICAgICAgIC8vIOagueaNruaYr+WQpuS4uuWujOW9ouWhq+epuueUs+ivt+S4jeWQjOeahOWNoeeJh+aooeadv1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB3aW5kb3dFbGVtZW50ID09PSBudWxsIHx8IHdpbmRvd0VsZW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpbmRvd0VsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVzc2FnZXMnKVswXS5pbm5lckhUTUw7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvblRleHQgPSAoX2EgPSB3aW5kb3dFbGVtZW50ID09PSBudWxsIHx8IHdpbmRvd0VsZW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpbmRvd0VsZW1lbnQucXVlcnlTZWxlY3RvcignI1Njb3V0ZXJTZWxlY3Rpb24nKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzcGFuJylbMF0uaW5uZXJIVE1MO1xuICAgICAgICBsZXQgaXNBbmtpU3BhY2UgPSBmYWxzZTtcbiAgICAgICAgaWYgKGNvbnRhaW5lciB8fCBzZWxlY3Rpb25UZXh0KSB7XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLmluZGV4T2YoJ2NsYXNzPVwiYW5raVNwYWNlXCInKSA+PSAwIHx8IGNvbnRhaW5lci5pbmRleE9mKCd7e2MnKSA+PSAwIHx8IHNlbGVjdGlvblRleHQuaW5kZXhPZignY2xhc3M9XCJhbmtpU3BhY2UnKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgaXNBbmtpU3BhY2UgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbG9hZGluZycsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICBmdW5jdGlvbiBzZXRBbmtpSW5mbyhhbmtpSW5mbykge1xuICAgICAgICAgICAgY29uc3QgbW9kZWxzID0gYW5raUluZm8ubW9kZWxzO1xuICAgICAgICAgICAgbGV0IG1vZGVsTmFtZSA9ICcnLCBmaWVsZDEgPSAnJywgZmllbGQyID0gJyc7XG4gICAgICAgICAgICBtb2RlbHMuZm9yRWFjaCgobW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobW9kZWwuaXNBbmtpU3BhY2UgPT09IGlzQW5raVNwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsTmFtZSA9IG1vZGVsLm1vZGVsTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQxID0gbW9kZWwuZmllbGQxO1xuICAgICAgICAgICAgICAgICAgICBmaWVsZDIgPSBtb2RlbC5maWVsZDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICdtb2RlbE5hbWUnOiBtb2RlbE5hbWUsXG4gICAgICAgICAgICAgICAgJ2ZpZWxkMSc6IGZpZWxkMSxcbiAgICAgICAgICAgICAgICAnZmllbGQyJzogZmllbGQyXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8uYW5raSkge1xuICAgICAgICAgICAgY29uc3QgdGhpc0RlY2sgPSBkZWNrID8gZGVjayA6IHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby5hbmtpLmRlZmF1bHREZWNrTmFtZTtcbiAgICAgICAgICAgIGNvbnN0IGFua2lJbmZvID0gc2V0QW5raUluZm8odXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLmFua2kpO1xuICAgICAgICAgICAgLy8g5re75Yqg5YiwIEFua2kg5LitXG4gICAgICAgICAgICBhZGRUb0Fua2kodGhpc0RlY2ssIGFua2lJbmZvLm1vZGVsTmFtZSwgYW5raUluZm8uZmllbGQxLCBhbmtpSW5mby5maWVsZDIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8g6I635Y+WIEFua2kg54mM57uE5L+h5oGvXG4gICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdzZXRNb2RlbCcsICdtZXNzYWdlcyc6IHt9LCB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFua2lJbmZvID0gc2V0QW5raUluZm8ocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGlzRGVjayA9IGRlY2sgPyBkZWNrIDogdXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLmFua2kuZGVmYXVsdERlY2tOYW1lO1xuICAgICAgICAgICAgICAgICAgICAvLyDmt7vliqDliLAgQW5raSDkuK1cbiAgICAgICAgICAgICAgICAgICAgYWRkVG9BbmtpKHRoaXNEZWNrLCBhbmtpSW5mby5tb2RlbE5hbWUsIGFua2lJbmZvLmZpZWxkMSwgYW5raUluZm8uZmllbGQyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWPjemmiOmUmeivr+S/oeaBr1xuICAgICAgICAgICAgICAgICAgICBhbGVydChyZXN1bHQuZXJyb3IuZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyDngrnlh7sgUGluIOaMiemSrlxuICAgIGNvbnN0IGhhbmRsZVBpbkJ0bkNsaWNrID0gKCkgPT4ge1xuICAgICAgICBpZiAoaXNQaW4pIHtcbiAgICAgICAgICAgICgwLCBjb250ZW50U2NyaXB0XzEucGluUG9wdXBDYXJkKShmYWxzZSk7XG4gICAgICAgICAgICBzZXRJc1BpbihmYWxzZSk7XG4gICAgICAgICAgICAvLyBhbXBsaXR1ZGUudHJhY2soJ3BpblBvcHVwQ2FyZCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgKDAsIGNvbnRlbnRTY3JpcHRfMS5waW5Qb3B1cENhcmQpKHRydWUpO1xuICAgICAgICAgICAgc2V0SXNQaW4odHJ1ZSk7XG4gICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ3BpblBvcHVwQ2FyZCcgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIOWcqCBBbmtpIOS4reaJk+W8gOeslOiusFxuICAgIGNvbnN0IGVkaXROb3RlSW5BbmtpID0gKG5vdGVJZCkgPT4ge1xuICAgICAgICBsZXQgc2VuZGluZyA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2d1aUVkaXROb3RlJywgJ21lc3NhZ2VzJzogeyAnYW5raV9hY3Rpb25fdHlwZSc6ICdndWlFZGl0Tm90ZScsICdhbmtpX2FyZ3VtZW50cyc6IHsgJ25vdGUnOiBub3RlSWQgfSwgfSB9KTtcbiAgICAgICAgc2VuZGluZy50aGVuKChtZXNzYWdlKSA9PiB7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIC8vZXJyb3JcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvLyDmiZPlvIAgUHJvbXB0IOe8lui+keeql+WPo1xuICAgIGNvbnN0IG9wZW5DdXN0b21Qcm9tcHRGb3JtID0gKGRhdGEpID0+IHtcbiAgICAgICAgcHJvcHMub3BlbkN1c3RvbVByb21wdEZvcm0oZGF0YSk7XG4gICAgICAgIHNldElzT3BlblByb21wdE1lbnUoZmFsc2UpO1xuICAgIH07XG4gICAgLy8gUHJvbXB0IOiPnOWNlSBpdGVtIOeCueWHu1xuICAgIGNvbnN0IGhhbmRsZU1lbnVJdGVtQ2xpY2sgPSAoZGF0YSkgPT4ge1xuICAgICAgICAvLyDnrKwgMyDkuKrlj4LmlbAgZmFsc2Ug6KGo56S65LiN6YeN5paw5riy5p+T5Zu+54mHXG4gICAgICAgIC8vIC8vIOWmguaenOS4iuS4gOS4qiBQcm9tcHQg5piv5LiN5pi+56S65Zu+54mH77yM5LiU5b2T5YmNIFByb21wdCDpnIDopoHmmL7npLrlm77niYfvvIzliJnmnKzmrKHku7vliqHpnIDopoHmuLLmn5Plm77niYfvvIzlkKbliJnkuI3ph43mlrDmuLLmn5Plm77niYdcbiAgICAgICAgLy8gaWYgKHByb3BzLmxhc3RFeGVjdXRlZFByb21wdC5nZXRVbnNwbGFzaEltYWdlcyAhPT0gdHJ1ZSAmJiBkYXRhLmdldFVuc3BsYXNoSW1hZ2VzKSB7XG4gICAgICAgIC8vICAgICBwcm9wcy5oYW5kbGVNZW51SXRlbUNsaWNrKGRhdGEpXG4gICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICBwcm9wcy5oYW5kbGVNZW51SXRlbUNsaWNrKGRhdGEsIHRydWUsIGZhbHNlKVxuICAgICAgICAvLyB9XG4gICAgICAgIHByb3BzLmhhbmRsZU1lbnVJdGVtQ2xpY2soZGF0YSk7XG4gICAgfTtcbiAgICBjb25zdCBvbk1lbnVPcGVuQ2hhbmdlID0gKG9wZW4pID0+IHtcbiAgICAgICAgLy8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgc2V0SXNPcGVuUHJvbXB0TWVudShvcGVuKTtcbiAgICB9O1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQ29uZmlnUHJvdmlkZXIsIHsgdGhlbWU6IHtcbiAgICAgICAgICAgICAgICB0b2tlbjoge1xuICAgICAgICAgICAgICAgICAgICBjb2xvclByaW1hcnk6ICcjRjA4QTI0JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBpZDogXCJTY291dGVyTmF2XCIsIHJlZjogbmF2RWxlbWVudCwgY2xhc3NOYW1lOiAncC00Jywgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogJzEycHgnLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nQm90dG9tOiAnMTJweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNiknLFxuICAgICAgICAgICAgICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ21vdmUnLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJywgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDksXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4IDE4cHgnXG4gICAgICAgICAgICAgICAgfSwgb25Nb3VzZURvd246IHByb3BzLm9uTW91c2VEb3duIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyB6SW5kZXg6IDkgfSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnUuUm9vdCwgeyBvcGVuOiBpc09wZW5Qcm9tcHRNZW51LCBtb2RhbDogZmFsc2UsIG9uT3BlbkNoYW5nZTogb25NZW51T3BlbkNoYW5nZSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51LlRyaWdnZXIsIHsgYXNDaGlsZDogdHJ1ZSwgb25Nb3VzZUVudGVyOiAoKSA9PiBzZXRJc09wZW5Qcm9tcHRNZW51KHRydWUpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBjbGFzc05hbWU6IFwiSWNvbkJ1dHRvblwiLCBcImFyaWEtbGFiZWxcIjogXCJDdXN0b21pc2Ugb3B0aW9uc1wiLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF9pY29uc18xLkhhbWJ1cmdlck1lbnVJY29uLCBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiAnNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogJzE3MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sIHByb3BzLmxhc3RFeGVjdXRlZFByb21wdC50aXRsZSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5Qb3J0YWwsIHsgY29udGFpbmVyOiBuYXZFbGVtZW50LmN1cnJlbnQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnUuQ29udGVudCwgeyBjbGFzc05hbWU6IFwiRHJvcGRvd25NZW51Q29udGVudFwiLCBhbGlnbjogJ3N0YXJ0Jywgc2lkZU9mZnNldDogNSwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAnZGVmYXVsdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTgwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAncmdiYSgwLCAwLCAwLCAwLjA4KSAwcHggNnB4IDE2cHggMHB4LCByZ2JhKDAsIDAsIDAsIDAuMTIpIDBweCAzcHggNnB4IC00cHgsIHJnYmEoMCwgMCwgMCwgMC4wNSkgMHB4IDlweCAyOHB4IDhweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246ICc0MDBtcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb3pBbmltYXRpb25UaW1pbmdGdW5jdGlvbjogJ2N1YmljLWJlemllcigwLjE2LCAxLCAwLjMsIDEpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbGxDaGFuZ2U6ICd0cmFuc2Zvcm0sIG9wYWNpdHknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9uTW91c2VMZWF2ZTogKCkgPT4gc2V0SXNPcGVuUHJvbXB0TWVudShmYWxzZSkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51SXRlbV8xLkRyb3Bkb3duTWVudUl0ZW0sIHsga2V5OiAoX2EgPSBkZWZhdWx0UHJvbXB0LmN1cnJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pZCwgZGF0YTogZGVmYXVsdFByb21wdC5jdXJyZW50LCBvblNlbGVjdDogKCkgPT4gaGFuZGxlTWVudUl0ZW1DbGljayhkZWZhdWx0UHJvbXB0LmN1cnJlbnQpLCBoYW5kbGVFZGl0UHJvbXB0OiAoKSA9PiBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogdHJ1ZSwgZGF0YTogZGVmYXVsdFByb21wdC5jdXJyZW50IH0pIH0sIChfYiA9IGRlZmF1bHRQcm9tcHQuY3VycmVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRpdGxlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51SXRlbV8xLkRyb3Bkb3duTWVudUl0ZW0sIHsga2V5OiB1dGlsXzEuZGljdGlvbmFyeVByb21wdC5pZCwgZGF0YTogdXRpbF8xLmRpY3Rpb25hcnlQcm9tcHQsIG9uU2VsZWN0OiAoKSA9PiBoYW5kbGVNZW51SXRlbUNsaWNrKHV0aWxfMS5kaWN0aW9uYXJ5UHJvbXB0KSwgaGFuZGxlRWRpdFByb21wdDogKCkgPT4gb3BlbkN1c3RvbVByb21wdEZvcm0oeyBpc09wZW46IHRydWUsIGRhdGE6IHV0aWxfMS5kaWN0aW9uYXJ5UHJvbXB0IH0pIH0sIHV0aWxfMS5kaWN0aW9uYXJ5UHJvbXB0LnRpdGxlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkRpdmlkZXIsIHsgc3R5bGU6IHsgbWFyZ2luOiAnOHB4IDAnIH0gfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLnByb21wdHMubWFwKGl0ZW0gPT4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51SXRlbV8xLkRyb3Bkb3duTWVudUl0ZW0sIHsga2V5OiBpdGVtLmlkLCBkYXRhOiBpdGVtLCBvblNlbGVjdDogKCkgPT4gaGFuZGxlTWVudUl0ZW1DbGljayhpdGVtKSwgaGFuZGxlRWRpdFByb21wdDogKCkgPT4gb3BlbkN1c3RvbVByb21wdEZvcm0oeyBpc09wZW46IHRydWUsIGRhdGE6IGl0ZW0gfSkgfSwgaXRlbS50aXRsZSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnUuU2VwYXJhdG9yLCB7IGNsYXNzTmFtZTogXCJEcm9wZG93bk1lbnVTZXBhcmF0b3JcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMucHJvbXB0cy5sZW5ndGggPCA2ID8gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZTogeyBtYXJnaW5Ub3A6ICc0cHgnIH0sIHNpemU6ICdzbWFsbCcsIG9uQ2xpY2s6ICgpID0+IG9wZW5DdXN0b21Qcm9tcHRGb3JtKHsgaXNPcGVuOiB0cnVlLCBkYXRhOiB7ICd0aXRsZSc6ICcnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBmYWxzZSwgJ3VzZXJQcm9tcHQnOiAnJywgJ2lkJzogJycgfSB9KSB9LCBcIkNyZWF0ZSBwcm9tcHRcIikgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZTogeyBtYXJnaW5Ub3A6ICc0cHgnIH0sIHNpemU6ICdzbWFsbCcsIGRpc2FibGVkOiB0cnVlIH0sIFwiQXQgbW9zdCA3IFByb21wdHNcIikpKSkpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInJpZ2h0QnRuQm94XCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdlbmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICcxMHB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBhZGRUb0Fua2lTdGF0dXMuc3RhdHVzID09PSAnc3VjY2VzcycgP1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5DaGVja0NpcmNsZVR3b1RvbmUsIHsgdHdvVG9uZUNvbG9yOiBcIiM1MmM0MWFcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBBZGRlZCB0byBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgb25DbGljazogZWRpdE5vdGVJbkFua2kuYmluZChldmVudCwgYWRkVG9BbmtpU3RhdHVzLm5vdGVJZCkgfSwgXCJBbmtpXCIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Ecm9wZG93bi5CdXR0b24sIHsgc2l6ZTogXCJzbWFsbFwiLCBvdmVybGF5U3R5bGU6IHsgd2lkdGg6ICc1MCUnIH0sIGdldFBvcHVwQ29udGFpbmVyOiAoKSA9PiBuYXZFbGVtZW50LmN1cnJlbnQsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzEzLjJweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWNvbj17PFBsdXNTcXVhcmVPdXRsaW5lZCAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGFkZFRvQW5raVN0YXR1cy5zdGF0dXMgPT09ICdzdGFuZGJ5JyB8fCBhZGRUb0Fua2lTdGF0dXMuc3RhdHVzID09PSAnbG9hZGluZycgPyB0cnVlIDogZmFsc2UsIG1lbnU6IG1lbnVQcm9wcywgb25DbGljazogKGV2ZW50KSA9PiBoYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2soKSB9LCBhZGRUb0Fua2lTdGF0dXMuc3RhdHVzID09PSAnbG9hZGluZycgPyAnQWRkaW5nLi4uJyA6ICdBZGQgdG8gQW5raScpKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzaXplOiAnc21hbGwnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHR5cGU9J3RleHQnXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBpc1BpbiA/ICcjRjA4QTI0JyA6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTMuMnB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgaWNvbjogaXNQaW4gPyByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLlB1c2hwaW5GaWxsZWQsIHsgY2xhc3NOYW1lOiAnaXNQaW4nIH0pIDogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5QdXNocGluT3V0bGluZWQsIG51bGwpLCBvbkNsaWNrOiBoYW5kbGVQaW5CdG5DbGljayB9KSkpKSkpO1xufVxuZXhwb3J0cy5OYXYgPSBOYXY7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5NZXNzYWdlc0xpc3QgPSB2b2lkIDA7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHN0eWxlZF9jb21wb25lbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInN0eWxlZC1jb21wb25lbnRzXCIpKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgcmVhY3RfaWNvbnNfMSA9IHJlcXVpcmUoXCJAcmFkaXgtdWkvcmVhY3QtaWNvbnNcIik7XG5jb25zdCByZWFjdF9tYXJrZG93bl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdC1tYXJrZG93blwiKSk7XG5jb25zdCByZW1hcmtfYnJlYWtzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlbWFyay1icmVha3NcIikpO1xuY29uc3QgcmVoeXBlX3Jhd18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWh5cGUtcmF3XCIpKTtcbmNvbnN0IHJlbWFya19nZm1fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVtYXJrLWdmbVwiKSk7XG5jb25zdCBzZXR0aW5nR3VpZGVfcG5nXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2Fzc2V0cy9zZXR0aW5nR3VpZGUucG5nXCIpKTtcbmNvbnN0IEltYWdlc18xID0gcmVxdWlyZShcIi4uL0NvbXBvbmVudHMvSW1hZ2VzXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmxldCBJY29uQnV0dG9uID0gKDAsIHN0eWxlZF9jb21wb25lbnRzXzEuZGVmYXVsdCkoYW50ZF8xLkJ1dHRvbikgYFxuXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG5gO1xuY29uc3QgTWVzc2FnZUJveCA9IHN0eWxlZF9jb21wb25lbnRzXzEuZGVmYXVsdC5kaXYgYFxuICAgIFxuICAgIHBhZGRpbmc6MThweCAwO1xuXG4gICAgJjpob3ZlcntcbiAgICAgICAgLy8gYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsMCwwLDAuMDQpO1xuICAgIH1cbiAgICBcblxuYDtcbmZ1bmN0aW9uIE1lc3NhZ2UocHJvcHMpIHtcbiAgICBjb25zdCBbaW1hZ2VzLCBzZXRJbWFnZXNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKFtdKTtcbiAgICBjb25zdCBbbWVzc2FnZUluZGV4LCBzZXRNZXNzYWdlSW5kZXhdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHByb3BzLm1lc3NhZ2UuY29udGVudC5sZW5ndGggLSAxKTtcbiAgICBjb25zdCBbaXNNZXNzYWdlSG92ZXIsIHNldElzTWVzc2FnZUhvdmVyXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIHNldEltYWdlcyhwcm9wcy5tZXNzYWdlLmltYWdlcyk7XG4gICAgICAgIHNldE1lc3NhZ2VJbmRleChwcm9wcy5tZXNzYWdlLmNvbnRlbnQubGVuZ3RoIDw9IDAgPyAwIDogcHJvcHMubWVzc2FnZS5jb250ZW50Lmxlbmd0aCAtIDEpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnbWVzc2FnZUluZGV4OicpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlSW5kZXgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9wcy5tZXNzYWdlLmNvbnRlbnQpO1xuICAgIH0sIFtwcm9wcy5tZXNzYWdlXSk7XG4gICAgY29uc3QgaGFuZGxlTWVzc2FnZUluZGV4Q2hhbmdlID0gKG4pID0+IHtcbiAgICAgICAgbGV0IG5ld0luZGV4ID0gbWVzc2FnZUluZGV4O1xuICAgICAgICBuZXdJbmRleCArPSBuO1xuICAgICAgICBpZiAobmV3SW5kZXggPCAwKSB7XG4gICAgICAgICAgICBuZXdJbmRleCA9IHByb3BzLm1lc3NhZ2UuY29udGVudC5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdJbmRleCA+IHByb3BzLm1lc3NhZ2UuY29udGVudC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBuZXdJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgc2V0TWVzc2FnZUluZGV4KG5ld0luZGV4KTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU1lc3NhZ2VIb3ZlciA9IChlKSA9PiB7XG4gICAgICAgIGlmIChlLnR5cGUgPT09ICdtb3VzZWxlYXZlJykge1xuICAgICAgICAgICAgc2V0SXNNZXNzYWdlSG92ZXIoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2V0SXNNZXNzYWdlSG92ZXIodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIGNvbnN0IGxhc3RTdGF0dXMgPSBwcm9wcy5tZXNzYWdlLmNvbnRlbnRbcHJvcHMubWVzc2FnZS5jb250ZW50Lmxlbmd0aCAtIDFdLnN0YXR1c1xuICAgIGxldCBjb250ZW50O1xuICAgIGlmIChtZXNzYWdlSW5kZXggPiBwcm9wcy5tZXNzYWdlLmNvbnRlbnQubGVuZ3RoIC0gMSkge1xuICAgICAgICBjb250ZW50ID0gcHJvcHMubWVzc2FnZS5jb250ZW50W3Byb3BzLm1lc3NhZ2UuY29udGVudC5sZW5ndGggLSAxXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnRlbnQgPSBwcm9wcy5tZXNzYWdlLmNvbnRlbnRbbWVzc2FnZUluZGV4XTtcbiAgICB9XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJycsIHN0eWxlOiBwcm9wcy5tZXNzYWdlLnJvbGUgPT09ICd1c2VyJyA/IHsgYmFja2dyb3VuZENvbG9yOiAnI0Y2RjZGNicsIHBhZGRpbmdUb3A6ICcycHgnLCBwYWRkaW5nQm90dG9tOiAnMnB4JyB9IDoge30gfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlNrZWxldG9uLCB7IHN0eWxlOiB7IG1hcmdpbjogJzE4cHggMCcgfSwgbG9hZGluZzogcHJvcHMubWVzc2FnZS5jb250ZW50W3Byb3BzLm1lc3NhZ2UuY29udGVudC5sZW5ndGggLSAxXVsnc3RhdHVzJ10gPT09ICdiZWdpbicgPyB0cnVlIDogZmFsc2UsIGFjdGl2ZTogdHJ1ZSwgdGl0bGU6IGZhbHNlIH0sXG4gICAgICAgICAgICBwcm9wcy5tZXNzYWdlLnNob3dJbWFnZXNCb3ggJiZcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChJbWFnZXNfMS5JbWFnZXMsIHsgaW1hZ2VzOiBpbWFnZXMsIGdldFVuc3BsYXNoSW1hZ2VzOiAoa2V5V29yZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgKDAsIHV0aWxfMS5nZXRVbnNwbGFzaEltYWdlcykoa2V5V29yZCkudGhlbigoaW1ncykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWkhOeQhuWbvueJh+eahOaVsOaNruagvOW8j1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdJbWFnZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdzLmZvckVhY2goKGltZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndW5zcGxhc2gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGltZy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbWFsbDogaW1nLnVybHMuc21hbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvd25sb2FkX2xvY2F0aW9uOiBpbWcubGlua3MuZG93bmxvYWRfbG9jYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogaW1nLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBpbWcudXNlci51c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpbWcudXNlci5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ltYWdlcy5wdXNoKG9iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW1hZ2VzKG5ld0ltYWdlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZ2VuZXJhdGlvbnNJbWFnZXM6IChrZXlXb3JkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdnZW5lcmF0aW9uc0ltYWdlcycsICdkYXRhJzogeyAncHJvbXB0Jzoga2V5V29yZCB9IH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aSE55CG5Zu+54mH55qE5pWw5o2u5qC85byPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0ltYWdlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZWVkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5kYXRhLmZvckVhY2goKGltZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdhaScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGltZy51cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbWFsbDogaW1nLnVybFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG93bmxvYWRfbG9jYXRpb246ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogJ0FJJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0FJJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdJbWFnZXMucHVzaChvYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW1hZ2VzKG5ld0ltYWdlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJbWFnZXMoW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJ21lc3NhZ2UnIGluIHJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHJlc3BvbnNlLmRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnVGhlIGN1cnJlbnQgQUkgZW5kcG9pbnQgZG9lcyBub3Qgc3VwcG9ydCBpbWFnZSBnZW5lcmF0aW9uLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gfSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChNZXNzYWdlQm94LCB7IHN0eWxlOiB7fSwgb25Nb3VzZUVudGVyOiBoYW5kbGVNZXNzYWdlSG92ZXIsIG9uTW91c2VMZWF2ZTogaGFuZGxlTWVzc2FnZUhvdmVyIH0sXG4gICAgICAgICAgICAgICAgcHJvcHMubWVzc2FnZS5jb250ZW50Lmxlbmd0aCA+IDEgJiYgaXNNZXNzYWdlSG92ZXIgJiZcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICctMzBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICdmaXQtY29udGVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAnOSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ2ZpdC1jb250ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICdyZ2JhKDAsIDAsIDAsIDAuMDgpIDBweCA2cHggMTZweCAwcHgsIHJnYmEoMCwgMCwgMCwgMC4xMikgMHB4IDNweCA2cHggLTRweCwgcmdiYSgwLCAwLCAwLCAwLjA1KSAwcHggOXB4IDI4cHggOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoSWNvbkJ1dHRvbiwgeyB0eXBlOiAndGV4dCcsIHNpemU6ICdzbWFsbCcsIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ljb25zXzEuQ2hldnJvbkxlZnRJY29uLCBudWxsKSwgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlTWVzc2FnZUluZGV4Q2hhbmdlKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IG1hcmdpbjogJzAgMnB4JyB9IH0sIG1lc3NhZ2VJbmRleCArIDEgKyAnLycgKyBwcm9wcy5tZXNzYWdlLmNvbnRlbnQubGVuZ3RoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChJY29uQnV0dG9uLCB7IHR5cGU6ICd0ZXh0Jywgc2l6ZTogJ3NtYWxsJywgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfaWNvbnNfMS5DaGV2cm9uUmlnaHRJY29uLCBudWxsKSwgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlTWVzc2FnZUluZGV4Q2hhbmdlKDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpcFBhdGg6IFwicGF0aCgnTSAwIDggQSA0IDQgMCAwIDAgMi44Mjg0MjcxMjQ3NDYxOSA2LjgyODQyNzEyNDc0NjE5IEwgNi41ODU3ODY0Mzc2MjY5MDUgMy4wNzEwNjc4MTE4NjU0NzU1IEEgMiAyIDAgMCAxIDkuNDE0MjEzNTYyMzczMDk2IDMuMDcxMDY3ODExODY1NDc1NSBMIDEzLjE3MTU3Mjg3NTI1MzgxIDYuODI4NDI3MTI0NzQ2MTkgQSA0IDQgMCAwIDAgMTYgOCBaJylcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxNnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgxODBkZWcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAncmdiYSgwLCAwLCAwLCAwLjA4KSAwcHggNnB4IDE2cHggMHB4LCByZ2JhKDAsIDAsIDAsIDAuMTIpIDBweCAzcHggNnB4IC00cHgsIHJnYmEoMCwgMCwgMCwgMC4wNSkgMHB4IDlweCAyOHB4IDhweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICcyNnB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSkpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X21hcmtkb3duXzEuZGVmYXVsdCwgeyByZW1hcmtQbHVnaW5zOiBbcmVtYXJrX2JyZWFrc18xLmRlZmF1bHQsIHJlbWFya19nZm1fMS5kZWZhdWx0XSwgcmVoeXBlUGx1Z2luczogW3JlaHlwZV9yYXdfMS5kZWZhdWx0XSwgY29tcG9uZW50czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiAoX2EpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHsgbm9kZSB9ID0gX2EsIHByb3BzID0gX19yZXN0KF9hLCBbXCJub2RlXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgb3ZlcmZsb3dYOiAnc2Nyb2xsJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIsIE9iamVjdC5hc3NpZ24oeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ21heC1jb250ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6ICc2MjBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWQgI2NjY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgcHJvcHMpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhOiAoX2EpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHsgbm9kZSB9ID0gX2EsIHByb3BzID0gX19yZXN0KF9hLCBbXCJub2RlXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCBPYmplY3QuYXNzaWduKHsgdGFyZ2V0OiAnX19ibGFuaycsIHN0eWxlOiB7IGNvbG9yOiAnI0YwOEEyNCcgfSB9LCBwcm9wcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHNraXBIdG1sOiBmYWxzZSwgY2hpbGRyZW46IGNvbnRlbnRbJ2NvbnRlbnQnXSB9KSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudFsnc3RhdHVzJ10gPT09ICdpbnZhbGlkX2FwaV9rZXknICYmIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBzcmM6IHNldHRpbmdHdWlkZV9wbmdfMS5kZWZhdWx0LCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHgnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9KSkpKSkpKTtcbn1cbjtcbmZ1bmN0aW9uIE1lc3NhZ2VzTGlzdChwcm9wcykge1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdtZXNzYWdlcycsIHN0eWxlOiB7XG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMicsXG4gICAgICAgICAgICB3b3JkV3JhcDogJ2JyZWFrLXdvcmQnLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnNDhweCdcbiAgICAgICAgfSB9LCBwcm9wcy5tZXNzYWdlcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2UsIHsga2V5OiBpdGVtLmNvbnRlbnRbMF0uY2hhdElkLCBtZXNzYWdlOiBpdGVtIH0pO1xuICAgIH0pKSk7XG59XG5leHBvcnRzLk1lc3NhZ2VzTGlzdCA9IE1lc3NhZ2VzTGlzdDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUHJvbXB0TGlzdCA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5jb25zdCBzdHlsZWRfY29tcG9uZW50c18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKSk7XG5jb25zdCB1c2VySW5mb18xID0gcmVxdWlyZShcIi4uL2xpYi91c2VySW5mb1wiKTtcbmNvbnN0IFByb1RhZ18xID0gcmVxdWlyZShcIi4uL0NvbXBvbmVudHMvUHJvVGFnXCIpO1xuY29uc3QgbG9jYWxlXzEgPSByZXF1aXJlKFwiLi4vbGliL2xvY2FsZVwiKTtcbmxldCBNeUJ1dHRvbiA9IHN0eWxlZF9jb21wb25lbnRzXzEuZGVmYXVsdC5idXR0b24gYFxuXG4gICAgcGFkZGluZzogNnB4O1xuICAgIG1hcmdpbi1ib3R0b206IDRweDtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgY3Vyc29yOiB1bnNldDtcblxuICAgICY6aG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiNGNkY2RjY7XG4gICAgfVxuYDtcbmZ1bmN0aW9uIFByb21wdEJ1dHRvbihwcm9wcykge1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoTXlCdXR0b24sIHsgc3R5bGU6IHtcbiAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLFxuICAgICAgICAgICAgdGV4dEFsaWduOiAnbGVmdCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnNHB4JyxcbiAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6IHByb3BzLmRpc2FibGUgPyAnbm9uZScgOiAnYXV0bydcbiAgICAgICAgfSwgb25DbGljazogcHJvcHMuaGFuZGxlTWVudUl0ZW1DbGljayB9LCBwcm9wcy5jaGlsZHJlbikpO1xufVxuZnVuY3Rpb24gUHJvbXB0TGlzdChwcm9wcykge1xuICAgIGNvbnN0IFByb21wdExpc3RET00gPSAoMCwgcmVhY3RfMS51c2VSZWYpKG51bGwpO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gKDAsIHVzZXJJbmZvXzEudXNlVXNlckluZm9Db250ZXh0KSgpO1xuICAgIGxldCBMYW5nID0gKDAsIGxvY2FsZV8xLnVzZUN1cnJlbnRMYW5ndWFnZSkoKTtcbiAgICBjb25zdCBjdXJyZW50TGFuZ3VhZ2UgPSBMYW5nWydjdXJyZW50J11bJ25hbWUnXTtcbiAgICAvLyBjb25zdCB1c2VySW5mbyA9IHVzZVVzZXJJbmZvQ29udGV4dCgpXG4gICAgLy8gY29uc29sZS5sb2coJ3VzZXJJbmZvOicpO1xuICAgIC8vIGNvbnNvbGUubG9nKHVzZXJJbmZvKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICB9LCBbcHJvcHMuc2hvd0ZvbGxvd1VwRGF0YU1lbnUuc2hvd10pO1xuICAgIC8vIFByb21wdCDoj5zljZUgaXRlbSDngrnlh7tcbiAgICBjb25zdCBoYW5kbGVNZW51SXRlbUNsaWNrID0gKGRhdGEpID0+IHtcbiAgICAgICAgaWYgKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSB7XG4gICAgICAgICAgICAvLyDnrKwgMyDkuKrlj4LmlbAgZmFsc2Ug6KGo56S65LiN6YeN5paw5riy5p+T5Zu+54mHXG4gICAgICAgICAgICBwcm9wcy5oYW5kbGVNZW51SXRlbUNsaWNrKGRhdGEsICd5ZXMnLCB0cnVlLCBwcm9wcy5mb2xsb3dVcERhdGEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgcmVmOiBQcm9tcHRMaXN0RE9NLCBjbGFzc05hbWU6ICdmb2xsb3dVcE1lbnUnLCBzdHlsZTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwcm9wcy5zaG93Rm9sbG93VXBEYXRhTWVudS5zdHlsZSksIHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIGRpc3BsYXk6IFwiZmxleFwiLCBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLCB3aWR0aDogJzEyMHB4JywgcGFkZGluZzogJzAnIH0pIH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdlbmQnLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHgnLFxuICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNiknLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzY2NidcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IHN0eWxlOiB7IGZsZXg6ICcxJyB9IH0sIFwiUHJvbXB0XCIpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvVGFnXzEuUHJvVGFnLCBudWxsKSksXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHggOHB4IDRweCcsXG4gICAgICAgICAgICAgICAgY3Vyc29yOiAhKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSA/ICdub3QtYWxsb3dlZCcgOiAnJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAhKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSA/ICcwLjcnIDogJzEnLFxuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvbXB0QnV0dG9uLCB7IGRpc2FibGU6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpLCBoYW5kbGVNZW51SXRlbUNsaWNrOiAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHAgPSAoMCwgdXRpbF8xLmdldERlZmF1bHRQcm9tcHQpKHByb3BzLmZvbGxvd1VwRGF0YS5rZXlXb3JkLCBjdXJyZW50TGFuZ3VhZ2UpO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVNZW51SXRlbUNsaWNrKHApO1xuICAgICAgICAgICAgICAgIH0pIH0sIFwiRGVmYXVsdFwiKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFByb21wdEJ1dHRvbiwgeyBkaXNhYmxlOiAhKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSwgaGFuZGxlTWVudUl0ZW1DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVNZW51SXRlbUNsaWNrKHV0aWxfMS5kaWN0aW9uYXJ5UHJvbXB0KTtcbiAgICAgICAgICAgICAgICB9IH0sIHV0aWxfMS5kaWN0aW9uYXJ5UHJvbXB0LnRpdGxlKSxcbiAgICAgICAgICAgIHByb3BzLnByb21wdExpc3QubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIDxidXR0b24gb25DbGljaz17KCkgPT4gaGFuZGxlTWVudUl0ZW1DbGljayhpdGVtKX0+e2l0ZW0udGl0bGV9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFByb21wdEJ1dHRvbiwgeyBrZXk6IGl0ZW0uaWQsIGRpc2FibGU6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpLCBoYW5kbGVNZW51SXRlbUNsaWNrOiAoKSA9PiBoYW5kbGVNZW51SXRlbUNsaWNrKGl0ZW0pIH0sIGl0ZW0udGl0bGUpO1xuICAgICAgICAgICAgfSkpKSk7XG59XG5leHBvcnRzLlByb21wdExpc3QgPSBQcm9tcHRMaXN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlJlZ2VuZXJhdGVCdXR0b24gPSB2b2lkIDA7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlYWN0XCIpKTtcbmZ1bmN0aW9uIFJlZ2VuZXJhdGVCdXR0b24ocHJvcHMpIHtcbiAgICBjb25zdCBsYXN0TWVzc2FnZSA9IHByb3BzLm1lc3NhZ2VzW3Byb3BzLm1lc3NhZ2VzLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IGxhc3RNZXNzYWdlU3RhdHVzID0gbGFzdE1lc3NhZ2UgPyBsYXN0TWVzc2FnZS5jb250ZW50W2xhc3RNZXNzYWdlLmNvbnRlbnQubGVuZ3RoIC0gMV0uc3RhdHVzIDogJ2JlZ2luJztcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIHByb3BzLm1lc3NhZ2VzLmxlbmd0aCA+PSAxICYmIChsYXN0TWVzc2FnZVN0YXR1cyA9PT0gJ2ludmFsaWRfYXBpX2tleScgfHwgbGFzdE1lc3NhZ2VTdGF0dXMgPT09ICdkb25lJykgJiZcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTMuMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnNjBweCcsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnMThweCcsXG4gICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgNnB4IDE2cHggMCByZ2JhKDAsIDAsIDAsIDAuMDgpLCAwIDNweCA2cHggLTRweCByZ2JhKDAsIDAsIDAsIDAuMTIpLCAwIDlweCAyOHB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMDUpJ1xuICAgICAgICAgICAgICAgIH0sIHNpemU6ICdzbWFsbCcsIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuaGFuZGxlUmVnZW5lcmF0ZUJ1dHRvbkNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfSB9LCBcIlJlZ2VuZXJhdGVcIikpKSk7XG59XG5leHBvcnRzLlJlZ2VuZXJhdGVCdXR0b24gPSBSZWdlbmVyYXRlQnV0dG9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2VsZWN0aW9uID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgbG9jYWxlXzEgPSByZXF1aXJlKFwiLi4vbGliL2xvY2FsZVwiKTtcbmNvbnN0IGxhbmdfMSA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbmNvbnN0IGljb25zXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7XG4vLyBjb25zdCB1c2VTdHlsZXMgPSBjcmVhdGVVc2VTdHlsZXMoe1xuLy8gICBtb3JlQnV0dG9uOiB7XG4vLyAgICAgY29sb3I6ICcjRjA4QTI0Jyxcbi8vICAgICBcIiY6aG92ZXJcIjoge1xuLy8gICAgICAgY29sb3I6ICdyZWQnXG4vLyAgICAgfVxuLy8gICB9LFxuLy8gfSlcbmNvbnN0IHN0eWxlID0gYFxuICAjU2NvdXRlclNlbGVjdGlvbj5zcGFuIHtcbiAgICBmb250LXNpdGU6MTJweDtcbiAgICBjb2xvcjojNjY2O1xuICB9XG4gIC5tb3JlQnV0dG9uIHtcbiAgICBjb2xvcjogI0YwOEEyNDtcbiAgICBjdXJzb3I6cG9pbnRlcjtcbiAgICBtYXJnaW46MHB4IDJweDtcbiAgfVxuICAubW9yZUJ1dHRvbjpob3ZlciB7XG4gICAgb3BhY2l0eTowLjg7XG4gIH1cblxuYDtcbmZ1bmN0aW9uIFNlbGVjdGlvbihwcm9wcykge1xuICAgIGNvbnN0IFt0YXJnZXRMYW5ndWFnZSwgc2V0VGFyZ2V0TGFuZ3VhZ2VdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKCdVbml0ZWQgU3RhdGVzJyk7XG4gICAgY29uc3QgW3Nob3dGdWxsVGV4dCwgc2V0U2hvd0Z1bGxUZXh0XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh0cnVlKTtcbiAgICBjb25zdCBbcGxheVN0YXR1cywgc2V0UGxheVN0YXR1c10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IGxhc3RTcGVha1RpbWUgPSAoMCwgcmVhY3RfMS51c2VSZWYpKE1hdGguZmxvb3IoRGF0ZS5ub3coKSkpO1xuICAgIC8vIOiOt+WPlueUqOaIt+iuvue9rueahOivreiogOS/oeaBr1xuICAgIGxldCBMYW5nID0gKDAsIGxvY2FsZV8xLnVzZUN1cnJlbnRMYW5ndWFnZSkoKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgc2V0VGFyZ2V0TGFuZ3VhZ2UoTGFuZ1sndGFyZ2V0J11bJ2lkJ10pO1xuICAgICAgICBzZXRTaG93RnVsbFRleHQocHJvcHMudGV4dC5sZW5ndGggPD0gMTQwKTtcbiAgICAgICAgc2V0UGxheVN0YXR1cyhmYWxzZSk7XG4gICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIob25TdG9yYWdlQ2hhbmdlKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5vbkNoYW5nZWQucmVtb3ZlTGlzdGVuZXIob25TdG9yYWdlQ2hhbmdlKTtcbiAgICAgICAgfTtcbiAgICB9LCBbcHJvcHMudGV4dF0pO1xuICAgIC8vIOivremfs+aSreaKpVxuICAgIGNvbnN0IHNwZWFrZXIgPSAoKSA9PiB7XG4gICAgICAgIC8vIOivhuWIq+ivreiogFxuICAgICAgICAvLyBjb25zdCBsbmdEZXRlY3RvciA9IG5ldyBMYW5ndWFnZURldGVjdCgpO1xuICAgICAgICAvLyBsbmdEZXRlY3Rvci5zZXRMYW5ndWFnZVR5cGUoJ2lzbzInKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhsbmdEZXRlY3Rvci5kZXRlY3QocHJvcHMudGV4dCwgMikpO1xuICAgICAgICBpZiAoTWF0aC5mbG9vcihEYXRlLm5vdygpKSAtIGxhc3RTcGVha1RpbWUuY3VycmVudCA8IDEwMDApIHtcbiAgICAgICAgICAgIC8vIHgg5q+r56eS5YaF5Y+q5Y+v54K55Ye75LiA5qyhXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICgwLCB1dGlsXzEucGxheVRleHRUb1NwZWVjaCkocHJvcHMudGV4dCwgbGFuZ18xLmxhbmd1YWdlQ29kZXNbdGFyZ2V0TGFuZ3VhZ2VdLCB0YXJnZXRMYW5ndWFnZSk7XG4gICAgICAgICAgICAvLyB0ZXh0VG9TcGVlY2hEb3dubG9hZChwcm9wcy50ZXh0LCBsYW5ndWFnZUNvZGVzW3RhcmdldExhbmd1YWdlIGFzIGtleW9mIHR5cGVvZiBsYW5ndWFnZUNvZGVzXSlcbiAgICAgICAgICAgIGxhc3RTcGVha1RpbWUuY3VycmVudCA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyDmmoLlgZzkuIrkuIDmrKHmkq3miqXku7vliqFcbiAgICAgICAgICAgIHNwZWVjaFN5bnRoZXNpcy5jYW5jZWwoKTtcbiAgICAgICAgICAgIGNvbnN0IHV0dGVyYW5jZSA9IG5ldyBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UocHJvcHMudGV4dCk7XG4gICAgICAgICAgICAvLyDor63np41cbiAgICAgICAgICAgIHV0dGVyYW5jZS5sYW5nID0gbGFuZ18xLmxhbmd1YWdlQ29kZXNbdGFyZ2V0TGFuZ3VhZ2VdO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobGFuZ3VhZ2VDb2Rlc1t0YXJnZXRMYW5ndWFnZSBhcyBrZXlvZiB0eXBlb2YgbGFuZ3VhZ2VDb2Rlc10pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGFyZ2V0TGFuZ3VhZ2UpO1xuICAgICAgICAgICAgLy8g6K+t6YCfXG4gICAgICAgICAgICBpZiAocGxheVN0YXR1cykge1xuICAgICAgICAgICAgICAgIC8vIOWfuuaVsOasoeaSreaUvuaXtumHh+eUqOaFoumAn+aSreaUvu+8jOiuqeeUqOaIt+WPr+S7peWQrOeahOabtOa4healmlxuICAgICAgICAgICAgICAgIHV0dGVyYW5jZS5yYXRlID0gMC42O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXR0ZXJhbmNlLnJhdGUgPSAwLjg1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0UGxheVN0YXR1cyghcGxheVN0YXR1cyk7XG4gICAgICAgICAgICAvLyDlvIDmkq3lkKdcbiAgICAgICAgICAgIHNwZWVjaFN5bnRoZXNpcy5zcGVhayh1dHRlcmFuY2UpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFtcGxpdHVkZS50cmFjaygnc3BlYWsnKTtcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdzcGVhaycgfSk7XG4gICAgfTtcbiAgICBjb25zdCBvblN0b3JhZ2VDaGFuZ2UgPSAoY2hhbmdlcywgYXJlYSkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjaGFuZ2VzKTtcbiAgICAgICAgLy8g5pu05paw55uu5qCH6K+t6KiAXG4gICAgICAgIGlmICgndGFyZ2V0TGFuZ3VhZ2UnIGluIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjaGFuZ2VzJyk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjaGFuZ2VzWyd0YXJnZXRMYW5ndWFnZSddWyduZXdWYWx1ZSddKTtcbiAgICAgICAgICAgIHNldFRhcmdldExhbmd1YWdlKGNoYW5nZXNbJ3RhcmdldExhbmd1YWdlJ11bJ25ld1ZhbHVlJ10pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVUb2dnbGVTaG93RnVuVGV4dCA9ICgpID0+IHtcbiAgICAgICAgc2V0U2hvd0Z1bGxUZXh0KCFzaG93RnVsbFRleHQpO1xuICAgIH07XG4gICAgLy8gY29uc3QgY2xhc3NlcyA9IHVzZVN0eWxlcygpXG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIiwgbnVsbCwgc3R5bGUpLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBcIlNjb3V0ZXJTZWxlY3Rpb25cIiwgY2xhc3NOYW1lOiAnJywgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6ICcxNHB4JyxcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMS41J1xuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgc2hvd0Z1bGxUZXh0ID8gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBwcm9wcy50ZXh0KSxcbiAgICAgICAgICAgICAgICBwcm9wcy50ZXh0Lmxlbmd0aCA+IDE0MCAmJiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBjbGFzc05hbWU6ICdtb3JlQnV0dG9uJywgb25DbGljazogaGFuZGxlVG9nZ2xlU2hvd0Z1blRleHQgfSwgXCJMZXNzXCIpKVxuICAgICAgICAgICAgICAgIDogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgcHJvcHMudGV4dC5zdWJzdHJpbmcoMCwgMTQwKSArICcuLi4nKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgY2xhc3NOYW1lOiAnbW9yZUJ1dHRvbicsIG9uQ2xpY2s6IGhhbmRsZVRvZ2dsZVNob3dGdW5UZXh0IH0sIFwiTW9yZVwiKSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnMnB4J1xuICAgICAgICAgICAgICAgIH0sIHNpemU6IFwic21hbGxcIiwgdHlwZTogXCJ0ZXh0XCIsIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuQ3VzdG9tZXJTZXJ2aWNlT3V0bGluZWQsIG51bGwpLCBvbkNsaWNrOiBzcGVha2VyIH0pKSkpO1xufVxuZXhwb3J0cy5TZWxlY3Rpb24gPSBTZWxlY3Rpb247XG47XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Vc2VyTWVzc2FnZUlucHV0ID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCBpY29uc18xID0gcmVxdWlyZShcIkBhbnQtZGVzaWduL2ljb25zXCIpO1xuY29uc3QgcmVhY3Rfc3ByaW5nXzEgPSByZXF1aXJlKFwicmVhY3Qtc3ByaW5nXCIpO1xuY29uc3QgeyBUZXh0QXJlYSB9ID0gYW50ZF8xLklucHV0O1xuZnVuY3Rpb24gVXNlck1lc3NhZ2VJbnB1dChwcm9wcykge1xuICAgIGNvbnN0IGxhc3RNZXNzYWdlID0gcHJvcHMubWVzc2FnZXNbcHJvcHMubWVzc2FnZXMubGVuZ3RoIC0gMV07XG4gICAgLy8gY29uc3QgbGFzdE1lc3NhZ2VTdGF0dXMgPSBsYXN0TWVzc2FnZS5jb250ZW50W2xhc3RNZXNzYWdlLmNvbnRlbnQubGVuZ3RoIC0gMV0uc3RhdHVzXG4gICAgY29uc3QgW2Zvcm1dID0gYW50ZF8xLkZvcm0udXNlRm9ybSgpO1xuICAgIGNvbnN0IFtpc0Fuc3dlcklucHV0ZWQsIHNldElzQW5zd2VySW5wdXRlZF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIC8vIOaWh+acrOahhuS4i+aVsuWHu+aMiemUruaXtlxuICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgLy8g6Zi75q2i5LqL5Lu25YaS5rOhXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVLZXlEb3duJyk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgJiYgIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50cyA9IHByb3BzLm1lc3NhZ2VzW3Byb3BzLm1lc3NhZ2VzLmxlbmd0aCAtIDFdWydjb250ZW50J107XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9wcy5tZXNzYWdlcyk7XG4gICAgICAgICAgICAvLyDmlbLlh7vlm57ovabplK5cbiAgICAgICAgICAgIGlmIChwcm9wcy5tZXNzYWdlcy5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgICAgICAoY29udGVudHNbY29udGVudHMubGVuZ3RoIC0gMV1bJ3N0YXR1cyddICE9PSAnYmVnaW4nICYmXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRzW2NvbnRlbnRzLmxlbmd0aCAtIDFdWydzdGF0dXMnXSAhPT0gJ3Byb2Nlc3MnKSAmJiBpc0Fuc3dlcklucHV0ZWQpIHtcbiAgICAgICAgICAgICAgICAvLyDpnZ7liqDovb3nirbmgIHjgIFHUFQg5raI5oGv5Y+R6YCB5a6M5q+V5pe255So5oi35Y+v5Y+R6YCB5raI5oGvXG4gICAgICAgICAgICAgICAgaGFuZGxlU2VuZE1lc3NhZ2UoeyAnbXNnJzogZXZlbnQudGFyZ2V0LnZhbHVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8g5paH5pys5qGG5YC85Y+Y5YyW5pe2XG4gICAgY29uc3Qgb25UZXh0QXJlYUlucHV0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQudmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2V0SXNBbnN3ZXJJbnB1dGVkKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2V0SXNBbnN3ZXJJbnB1dGVkKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlU2VuZE1lc3NhZ2UgPSAodmFsdWVzKSA9PiB7XG4gICAgICAgIC8vIOa4heepuuaWh+acrOahhlxuICAgICAgICBmb3JtLnJlc2V0RmllbGRzKCk7XG4gICAgICAgIC8vIOemgeeUqOWPkemAgeaMiemSrlxuICAgICAgICBzZXRJc0Fuc3dlcklucHV0ZWQoZmFsc2UpO1xuICAgICAgICAvLyDmiafooYzlj5Hmtojmga/kuovku7ZcbiAgICAgICAgcHJvcHMuaGFuZGxlU2VuZE1lc3NhZ2UodmFsdWVzLm1zZyk7XG4gICAgfTtcbiAgICAvLyBjb25zdCBBbmltYXRlZEJ1dHRvbiA9IGFuaW1hdGVkKEJ1dHRvbik7XG4gICAgY29uc3QgYW5pbWF0aW9uU3R5bGUgPSAoMCwgcmVhY3Rfc3ByaW5nXzEudXNlU3ByaW5nKSh7XG4gICAgICAgIGZyb206IHsgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJyB9LFxuICAgICAgICB0bzogeyB0cmFuc2Zvcm06ICdyb3RhdGUoMzYwZGVnKScgfSxcbiAgICAgICAgY29uZmlnOiB7IGR1cmF0aW9uOiAxMDAwIH0sXG4gICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgIHdpZHRoOiAnMzJweCcsXG4gICAgICAgIGhlaWdodDogJzMycHgnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgcmVkJ1xuICAgIH0pO1xuICAgIGNvbnN0IGxhc3RTdGF0dXMgPSBsYXN0TWVzc2FnZSA/IGxhc3RNZXNzYWdlLmNvbnRlbnRbbGFzdE1lc3NhZ2UuY29udGVudC5sZW5ndGggLSAxXS5zdGF0dXMgOiAnYmVnaW4nO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICd3LWZ1bGwnLCBzdHlsZTogeyBib3JkZXJUb3A6ICcxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMDYpJyB9IH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLCB7IGZvcm06IGZvcm0sIG9uRmluaXNoOiBoYW5kbGVTZW5kTWVzc2FnZSwgXG4gICAgICAgICAgICAvLyBvbktleURvd249e2hhbmRsZUZvcm1LZXlEb3dufVxuICAgICAgICAgICAgbGF5b3V0OiAnaW5saW5lJywgc3R5bGU6IHsgYWxpZ25JdGVtczogJ2NlbnRlcicgfSwgY2xhc3NOYW1lOiAncC0yJyB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBuYW1lOiBcIm1zZ1wiLCBzdHlsZTogeyBtYXJnaW46ICcwJywgZmxleEdyb3c6ICcxJyB9IH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHsgcGxhY2Vob2xkZXI6IFwiU2VuZCBhIG1lc3NhZ2VcIiwgYm9yZGVyZWQ6IGZhbHNlLCBhdXRvU2l6ZTogeyBtaW5Sb3dzOiAxLCBtYXhSb3dzOiAyIH0sIFxuICAgICAgICAgICAgICAgICAgICAvLyBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJldENvbG9yOiAnI0YwOEEyNCcsXG4gICAgICAgICAgICAgICAgICAgIH0sIG9uS2V5RG93bjogaGFuZGxlS2V5RG93biwgb25JbnB1dDogb25UZXh0QXJlYUlucHV0IH0pKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgc3R5bGU6IHsgbWFyZ2luUmlnaHQ6ICcwJyB9IH0sIHByb3BzLm1lc3NhZ2VzLmxlbmd0aCA9PT0gMCB8fCBsYXN0U3RhdHVzICE9PSAnYmVnaW4nICYmIGxhc3RTdGF0dXMgIT09ICdwcm9jZXNzJyA/XG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyB0eXBlOiBcInRleHRcIiwgaHRtbFR5cGU6IFwic3VibWl0XCIsIGRpc2FibGVkOiBwcm9wcy5tZXNzYWdlcy5sZW5ndGggPiAwID8gbGFzdFN0YXR1cyA9PT0gJ2JlZ2luJyB8fCBsYXN0U3RhdHVzID09PSAncHJvY2VzcycgfHwgIWlzQW5zd2VySW5wdXRlZCA6IGZhbHNlLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb2xvcjogIWlzTG9hZGluZyAmJiBpc0Fuc3dlcklucHV0ZWQgPyAnI0YwOEEyNCcgOiAnJ1xuICAgICAgICAgICAgICAgICAgICB9LCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLlNlbmRPdXRsaW5lZCwgbnVsbCkgfSkgOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IG1hcmdpblJpZ2h0OiAnOHB4JyB9IH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3Rfc3ByaW5nXzEuYW5pbWF0ZWQuZGl2LCB7IHN0eWxlOiBhbmltYXRpb25TdHlsZSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkxvYWRpbmdPdXRsaW5lZCwgbnVsbCkpKSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IHN0eWxlOiB7IG1hcmdpbjogJzAnIH0gfSkpKSk7XG59XG5leHBvcnRzLlVzZXJNZXNzYWdlSW5wdXQgPSBVc2VyTWVzc2FnZUlucHV0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Qb3B1cENhcmQgPSB2b2lkIDA7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHV1aWRfMSA9IHJlcXVpcmUoXCJ1dWlkXCIpO1xuY29uc3QgY29udGVudFNjcmlwdF8xID0gcmVxdWlyZShcIi4uL2NvbnRlbnRTY3JpcHRcIik7XG5jb25zdCBOYXZfMSA9IHJlcXVpcmUoXCIuLi9Db21wb25lbnRzL05hdlwiKTtcbmNvbnN0IEN1c3RvbVByb21wdEZvcm1fMSA9IHJlcXVpcmUoXCIuLi9Db21wb25lbnRzL0N1c3RvbVByb21wdEZvcm1cIik7XG5jb25zdCBNZXNzYWdlXzEgPSByZXF1aXJlKFwiLi9NZXNzYWdlXCIpO1xuY29uc3QgUHJvbXB0TGlzdF8xID0gcmVxdWlyZShcIi4vUHJvbXB0TGlzdFwiKTtcbmNvbnN0IFJlZ2VuZXJhdGVCdXR0b25fMSA9IHJlcXVpcmUoXCIuL1JlZ2VuZXJhdGVCdXR0b25cIik7XG5jb25zdCBVc2VyTWVzc2FnZUlucHV0XzEgPSByZXF1aXJlKFwiLi9Vc2VyTWVzc2FnZUlucHV0XCIpO1xuY29uc3QgU2VsZWN0aW9uXzEgPSByZXF1aXJlKFwiLi9TZWxlY3Rpb25cIik7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IGxvY2FsZV8xID0gcmVxdWlyZShcIi4uL2xpYi9sb2NhbGVcIik7XG5jb25zdCB1c2VySW5mb18xID0gcmVxdWlyZShcIi4uL2xpYi91c2VySW5mb1wiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5jb25zdCBzdHlsZWRfY29tcG9uZW50c18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKSk7XG5sZXQgY3VycmVudExhbmd1YWdlO1xubGV0IHRhcmdldExhbmd1YWdlO1xuLy8g6I635Y+WIEFua2kg5Y2h54mH77yM55So5LqO57yW5YaZ5pWF5LqLXG5sZXQgYW5raUNhcmRzO1xuKDAsIHV0aWxfMS5nZXRBbmtpQ2FyZHMpKCkudGhlbigoY2FyZHMpID0+IHtcbiAgICBhbmtpQ2FyZHMgPSBjYXJkcztcbn0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKGVycm9yKTtcbn0pO1xuLy8g5Yid5aeL5YyWIEFua2kg55qEIE1vZGVs77yM5Li65ZCO57ut5a+85YWl5YiwIEFua2kg5o+Q6YCfXG5jb25zdCB7IFRleHRBcmVhIH0gPSBhbnRkXzEuSW5wdXQ7XG4vLyBjb25zdCBBbmtpQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQobnVsbCk7XG5jb25zdCBTY291dGVyRGl2ID0gc3R5bGVkX2NvbXBvbmVudHNfMS5kZWZhdWx0LmRpdiBgXG5cbmxlZnQ6MTA7XG50b3A6MTA7XG5cbmZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xud2lkdGg6IDM5MHB4O1xuaGVpZ2h0OiA1NjBweDtcbmNvbG9yOiByZ2IoMCAwIDAgLyA4MCUpO1xucG9zaXRpb246IGZpeGVkO1xuZGlzcGxheTogZmxleDtcbmZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5mb250LXNpemU6IDE0cHg7XG5iYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuei1pbmRleDogOTk5O1xub3ZlcmZsb3c6IGhpZGRlbjtcbmJveC1zaGFkb3c6IDBweCA4cHggMjhweCByZ2JhKDAsMCwwLC4xNik7XG5ib3JkZXItcmFkaXVzOiA2cHg7XG5ib3JkZXI6MXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KVxuXG5oMSxoMixoMntcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbmgxIHtcbiAgZm9udC1zaXplOjIwcHg7XG59XG5cbmgyIHtcbiAgZm9udC1zaXplOjE3cHg7XG59XG5cbmA7XG5mdW5jdGlvbiBQb3B1cENhcmQocHJvcHMpIHtcbiAgICBjb25zdCBbbWVzc2FnZXMsIHNldE1lc3NhZ2VzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShbe1xuICAgICAgICAgICAgJ2NvbnRlbnQnOiBbe1xuICAgICAgICAgICAgICAgICAgICAnc3RhdHVzJzogJ2JlZ2luJyxcbiAgICAgICAgICAgICAgICAgICAgJ2NoYXRJZCc6ICcnLFxuICAgICAgICAgICAgICAgICAgICAnY29udGVudCc6ICcnXG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAncm9sZSc6ICd1c2VyJyxcbiAgICAgICAgICAgICdwcm9tcHQnOiAnJyxcbiAgICAgICAgICAgICdzaG93SW1hZ2VzQm94JzogdHJ1ZSxcbiAgICAgICAgICAgICdpbWFnZXMnOiBbXVxuICAgICAgICB9XSk7XG4gICAgY29uc3QgW3Byb21wdHMsIHNldFByb21wdHNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKFtdKTtcbiAgICBjb25zdCBbbGFzdEV4ZWN1dGVkUHJvbXB0LCBzZXRMYXN0RXhlY3V0ZWRQcm9tcHRdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHsgJ3RpdGxlJzogJ/CfkYnwn4+8IFBsZWFzZSBjaG9vc2UgYSBwcm9tcHQnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBmYWxzZSwgJ3VzZXJQcm9tcHQnOiAnJywgJ2lkJzogJycgfSk7XG4gICAgY29uc3QgW2lzT3Blbk1lbnUsIHNldElzT3Blbk1lbnVdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbaXNQb3BvdmVyT3Blbiwgc2V0UG9wb3Zlck9wZW5dID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbY3VzdG9tUHJvbXB0Rm9ybURhdGEsIHNldEN1c3RvbVByb21wdEZvcm1EYXRhXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7ICd0aXRsZSc6ICcnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBmYWxzZSwgJ3VzZXJQcm9tcHQnOiAnJywgJ2lkJzogJycgfSk7XG4gICAgLy8gc3RhbmRieSxub3JtYWwsbG9hZGluZyxzdWNjZXNzXG4gICAgY29uc3QgW2FkZFRvQW5raVN0YXR1cywgc2V0QWRkVG9BbmtpU3RhdHVzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgY29uc3QgW2ZvbGxvd1VwRGF0YSwgc2V0Rm9sbG93VXBEYXRhXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7IGtleVdvcmQ6ICcnLCBzZW50ZW5jZTogJycgfSk7XG4gICAgY29uc3QgW3Nob3dGb2xsb3dVcERhdGFNZW51LCBzZXRTaG93Rm9sbG93VXBEYXRhTWVudV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoeyBzaG93OiBmYWxzZSwgc3R5bGU6IHt9IH0pO1xuICAgIC8vIOeql+WPo+aLluaLvemAu+i+kVxuICAgIGNvbnN0IFtkcmFnZ2luZywgc2V0RHJhZ2dpbmddID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCB3aW5kb3dFbGVtZW50ID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICBjb25zdCBtZXNzYWdlc0xpc3QgPSAoMCwgcmVhY3RfMS51c2VSZWYpKG51bGwpO1xuICAgIGNvbnN0IHNob3VsZFN0YXlBdEJvdHRvbVJlZiA9ICgwLCByZWFjdF8xLnVzZVJlZikoZmFsc2UpO1xuICAgIC8vIGNvbnN0IHVzZXJJbmZvUmVmID0gdXNlUmVmKCk7XG4gICAgY29uc3QgbGFzdFByb21wdFJlZiA9ICgwLCByZWFjdF8xLnVzZVJlZikoKTtcbiAgICBjb25zdCBbZm9ybV0gPSBhbnRkXzEuRm9ybS51c2VGb3JtKCk7XG4gICAgY29uc3QgdXNlckluZm8gPSAoMCwgdXNlckluZm9fMS51c2VVc2VySW5mb0NvbnRleHQpKCk7XG4gICAgbGV0IExhbmcgPSAoMCwgbG9jYWxlXzEudXNlQ3VycmVudExhbmd1YWdlKSgpO1xuICAgIGN1cnJlbnRMYW5ndWFnZSA9IExhbmdbJ2N1cnJlbnQnXVsnbmFtZSddO1xuICAgIHRhcmdldExhbmd1YWdlID0gTGFuZ1sndGFyZ2V0J11bJ25hbWUnXTtcbiAgICAvLyDmjqfliLbov73pl67oj5zljZVcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgY29uc3QgcG9ydCA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5jb25uZWN0KHtcbiAgICAgICAgICAgIG5hbWU6ICdmcm9tUG9wdXBDYXJkJ1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgaGFuZGxlTWVzc2FnZSA9IChtc2cpID0+IHtcbiAgICAgICAgICAgIGlmIChtc2cudHlwZSA9PT0gXCJVUERBVEVfUE9QVVBfQ0FSRFwiKSB7XG4gICAgICAgICAgICAgICAgLy8g5qC55o2uIGlkIOiOt+WPliBQcm9tcHRcbiAgICAgICAgICAgICAgICBpZiAobXNnLnBheWxvYWQucHJvbXB0KSB7XG4gICAgICAgICAgICAgICAgICAgIGV4ZWN1dGl2ZVByb21wdChtc2cucGF5bG9hZC5wcm9tcHQsICd5ZXMnLCBtc2cucGF5bG9hZC5wcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMsIHsga2V5V29yZDogbXNnLnBheWxvYWQuZm9sbG93VXBEYXRhLmtleVdvcmQsIHNlbnRlbmNlOiBtc2cucGF5bG9hZC5mb2xsb3dVcERhdGEuc2VudGVuY2UgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBwb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihoYW5kbGVNZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHBvcnQub25NZXNzYWdlLnJlbW92ZUxpc3RlbmVyKGhhbmRsZU1lc3NhZ2UpO1xuICAgICAgICB9O1xuICAgIH0pO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAvLyDmuLLmn5MgUHJvbXB0IOWIl+ihqFxuICAgICAgICBpbml0aWFsaXplUHJvbXB0TGlzdCgpO1xuICAgICAgICAvLyDph43lpI3mt7vliqDliLAgQW5raSDmjInpkq7nmoTnirbmgIFcbiAgICAgICAgLy8gc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdub3JtYWwnLCAnbm90ZUlkJzogMCB9KVxuICAgICAgICBpZiAocHJvcHMucnVuUHJvbXB0IHx8IHByb3BzLnJ1blByb21wdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyDojrflj5bmnIDov5HkuIDmrKHmiafooYznmoQgUHJvbXB0XG4gICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuZ2V0KHsgXCJsYXN0RXhlY3V0ZWRQcm9tcHRcIjogJycgfSkudGhlbigoaXRlbSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxhc3RFeGVjdXRlZFByb21wdCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5omn6KGM6buY6K6kIFByb21wdOOAgeiOt+WPliBVbnNwbGFzaCDlm77niYdcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9ybXB0ID0geWllbGQgKDAsIHV0aWxfMS5nZXRJbml0aWFsUHJvbXB0KShwcm9wcy5kYXRhLmtleVdvcmQsIGN1cnJlbnRMYW5ndWFnZSk7XG4gICAgICAgICAgICAgICAgICAgIGV4ZWN1dGl2ZVByb21wdChwb3JtcHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5omn6KGMIFByb21wdOOAgeiOt+WPliBVbnNwbGFzaCDlm77niYdcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGFzdEV4ZWN1dGVkUHJvbXB0LmlkID09PSBcIkRlZmF1bHRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9ybXB0ID0geWllbGQgKDAsIHV0aWxfMS5nZXRJbml0aWFsUHJvbXB0KShwcm9wcy5kYXRhLmtleVdvcmQsIGN1cnJlbnRMYW5ndWFnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBleGVjdXRpdmVQcm9tcHQocG9ybXB0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWN1dGl2ZVByb21wdChpdGVtLmxhc3RFeGVjdXRlZFByb21wdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyDkuI3miafooYzku7vkvZUgUHJvbXB077yM55Sx55So5oi36Ieq6KGM6YCJ5oupXG4gICAgICAgICAgICBleGVjdXRpdmVQcm9tcHQoeyAndGl0bGUnOiAnRGVmYXVsdCcsICdnZXRVbnNwbGFzaEltYWdlcyc6IHRydWUsICd1c2VyUHJvbXB0JzogYFdvcmQ6XCJ7e2tleVdvcmR9fVwiLCBzZW50ZW5jZTogXCJ7e3NlbnRlbmNlfX1cImAsICdpZCc6ICdEZWZhdWx0JyB9LCAnbm8nKTtcbiAgICAgICAgICAgIC8vIHNldElzT3Blbk1lbnUodHJ1ZSlcbiAgICAgICAgfVxuICAgICAgICAvLyDorr7nva7nqpflj6PnmoTpu5jorqTkvY3nva7jgIHmt7vliqDmu5rliqjkuovku7bvvIzorqnmtojmga/liJfooajoh6rliqjmu5rliqjliLDlupXpg6hcbiAgICAgICAgKDAsIHV0aWxfMS53aW5kb3dJbml0aWFsaXphdGlvbikoeyAnaXNQaW4nOiBwcm9wcy5pc1BpbiwgJ3dpbmRvd0VsZW1lbnQnOiB3aW5kb3dFbGVtZW50LCAnc2VsZWN0aW9uJzogcHJvcHMuc2VsZWN0aW9uLCAnbWVzc2FnZXNMaXN0JzogbWVzc2FnZXNMaXN0IH0pO1xuICAgIH0sIFtwcm9wcy5kYXRhLmtleVdvcmRdKTtcbiAgICAvLyDogYrlpKnorrDlvZXmlLnlj5jml7ZcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgLy8g6K6w5b2V5b2T5YmN5YiX6KGo55qE5L2N572uXG4gICAgICAgIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGFpbmVyJylbMF07XG4gICAgICAgICAgICBzaG91bGRTdGF5QXRCb3R0b21SZWYuY3VycmVudCA9IGNvbnRhaW5lci5zY3JvbGxIZWlnaHQgLSBjb250YWluZXIuc2Nyb2xsVG9wIDw9IGNvbnRhaW5lci5jbGllbnRIZWlnaHQgKyAyMDtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRMZW5ndGggPSBtZXNzYWdlcy5sZW5ndGggPiAwID8gbWVzc2FnZXNbbWVzc2FnZXMubGVuZ3RoIC0gMV0uY29udGVudC5sZW5ndGggOiAwO1xuICAgICAgICAgICAgLy8g6Ieq5Yqo5rua5Yqo5Yiw5raI5oGv5bqV6YOo77yM5pa55L6/55yL5Yiw5pyA5paw55qE5paH5a2XXG4gICAgICAgICAgICBpZiAobWVzc2FnZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlc1ttZXNzYWdlcy5sZW5ndGggLSAxXS5jb250ZW50W2NvbnRlbnRMZW5ndGggLSAxXS5zdGF0dXMgPT09ICdwcm9jZXNzJyB8fCBtZXNzYWdlc1ttZXNzYWdlcy5sZW5ndGggLSAxXS5jb250ZW50W2NvbnRlbnRMZW5ndGggLSAxXS5zdGF0dXMgPT09ICdiZWdpbicpIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9Cb3R0b20odHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb0JvdHRvbShzaG91bGRTdGF5QXRCb3R0b21SZWYuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIC8vICAgaWYgKGNvbnRhaW5lciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBjaGVja0lmU2hvdWxkU3RheUF0Qm90dG9tKTtcbiAgICAgICAgICAgIC8vICAgfVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgICAgIC8vIOS/neWtmOWOhuWPsuiusOW9le+8jOWPquS/neeVmea2iOaBr+iusOW9leeahOesrCAxIOadoe+8jOWmguaenOi/meadoea2iOWkseaYr+mUmeivr+aPkOekuu+8jOWImeS4jeS/neWtmFxuICAgICAgICBpZiAobWVzc2FnZXMubGVuZ3RoID09PSAxICYmIG1lc3NhZ2VzWzBdWydjb250ZW50J11bbWVzc2FnZXNbMF1bJ2NvbnRlbnQnXS5sZW5ndGggLSAxXVsnc3RhdHVzJ10gPT09ICdkb25lJykge1xuICAgICAgICAgICAgKCgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdG9yYWdlID0geWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLmdldCh7IFwiaGlzdG9yeVwiOiBbXSwgXCJsYXN0RXhlY3V0ZWRQcm9tcHRcIjogJycgfSk7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5V29yZCA9IHByb3BzLmRhdGEua2V5V29yZDtcbiAgICAgICAgICAgICAgICBjb25zdCBTZW50ZW5jZSA9IHByb3BzLmRhdGEuU2VudGVuY2U7XG4gICAgICAgICAgICAgICAgLy8g5bCG5p+l6K+i6K6w5b2V5L+d5a2Y6LW35p2lXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SGlzdG9yeSA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ2tleVdvcmQnOiBrZXlXb3JkLFxuICAgICAgICAgICAgICAgICAgICAnc2VudGVuY2UnOiBTZW50ZW5jZSxcbiAgICAgICAgICAgICAgICAgICAgJ3JvbGUnOiBtZXNzYWdlc1swXVsncm9sZSddLFxuICAgICAgICAgICAgICAgICAgICAnYW5zd2VyJzogbWVzc2FnZXNbMF1bJ2NvbnRlbnQnXVttZXNzYWdlc1swXVsnY29udGVudCddLmxlbmd0aCAtIDFdWydjb250ZW50J10sXG4gICAgICAgICAgICAgICAgICAgICdzb3VyY2UnOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICAgICAgICAgICAgICAgICAgJ3Byb21wdCc6IG1lc3NhZ2VzWzBdWydwcm9tcHQnXSxcbiAgICAgICAgICAgICAgICAgICAgJ2ltYWdlcyc6IG1lc3NhZ2VzWzBdWydpbWFnZXMnXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKGtleVdvcmQgIT09ICcnICYmIFNlbnRlbmNlICE9PSAnJyAmJiBtZXNzYWdlc1swXVsnY29udGVudCddW21lc3NhZ2VzWzBdWydjb250ZW50J10ubGVuZ3RoIC0gMV1bJ2NvbnRlbnQnXSAhPT0gJycgJiYgc3RvcmFnZS5sYXN0RXhlY3V0ZWRQcm9tcHQuaWQgIT09ICdkaWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpdGVtLmhpc3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SGlzdG9yeUxpc3QgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJpbmdvID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIG5ld0hpc3RvcnlMaXN0LnB1c2gobmV3SGlzdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOacgOi/keaJp+ihjOeahOaYr+WcqOe6v+ivjeWFuO+8jOWImeS4jeS/neWtmOWOhuWPsuiusOW9lVxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzdG9yYWdlLmhpc3RvcnkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlpoLmnpzorrDlvZXlt7LlrZjlnKjvvIzliJnkuI3ph43lpI3kv53lrZhcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcmFnZS5oaXN0b3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IHN0b3JhZ2UuaGlzdG9yeVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmtleVdvcmQgPT09IG5ld0hpc3RvcnlbJ2tleVdvcmQnXSAmJiBvYmouc2VudGVuY2UgPT09IG5ld0hpc3RvcnlbJ3NlbnRlbmNlJ10gJiYgb2JqLnByb21wdCA9PT0gbmV3SGlzdG9yeVsncHJvbXB0J10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZ28gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdIaXN0b3J5TGlzdCA9IHN0b3JhZ2UuaGlzdG9yeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0hpc3RvcnlMaXN0LnVuc2hpZnQobmV3SGlzdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdIaXN0b3J5TGlzdC5zcGxpY2UoOCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdIaXN0b3J5TGlzdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFiaW5nbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLnNldCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlzdG9yeTogbmV3SGlzdG9yeUxpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpKCk7XG4gICAgICAgIH1cbiAgICB9LCBbbWVzc2FnZXNdKTtcbiAgICAvLyDnqpflj6Pmi5bmi73ml7bop6blj5FcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlTW91c2VNb3ZlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNlVXApO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3VzZUVmZmVjdCByZXR1cm4nKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2VVcCk7XG4gICAgICAgIH07XG4gICAgfSwgW2RyYWdnaW5nXSk7XG4gICAgLy8g5omn6KGMIFByb21wdFxuICAgIGNvbnN0IGV4ZWN1dGl2ZVByb21wdCA9IChwcm9tcHQsIHJ1blByb21wdCwgaW1hZ2VUb1JlcmVuZGVyLCBkYXRhKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOiuvue9ruWKoOi9veeKtuaAgVxuICAgICAgICAvLyBzZXRJc0xvYWRpbmcodHJ1ZSlcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBsZXQgbmVlZFRvUnVuUHJvbXB0ID0gcnVuUHJvbXB0O1xuICAgICAgICBpZiAobmVlZFRvUnVuUHJvbXB0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG5lZWRUb1J1blByb21wdCA9ICd5ZXMnO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuZWVkVG9SZXJlbmRlckltYWdlID0gaW1hZ2VUb1JlcmVuZGVyO1xuICAgICAgICBpZiAobmVlZFRvUmVyZW5kZXJJbWFnZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBuZWVkVG9SZXJlbmRlckltYWdlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQga2V5V29yZCA9IHByb3BzLmRhdGEua2V5V29yZDtcbiAgICAgICAgbGV0IFNlbnRlbmNlID0gcHJvcHMuZGF0YS5TZW50ZW5jZTtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAga2V5V29yZCA9IGRhdGEua2V5V29yZDtcbiAgICAgICAgICAgIFNlbnRlbmNlID0gZGF0YS5zZW50ZW5jZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIOWIneWni+WMllxuICAgICAgICAgICAgc2V0TWVzc2FnZXMoW10pOyAvLyDlr7nor53liJfooahcbiAgICAgICAgfVxuICAgICAgICAvLyDlpoLmnpzpnIDopoHnq4vljbPmiafooYwgUHJvbXB0XG4gICAgICAgIGlmIChuZWVkVG9SdW5Qcm9tcHQgIT09ICdubycpIHtcbiAgICAgICAgICAgIC8v5Yid5aeL5YyW5Zu+54mH5a655ZmoXG4gICAgICAgICAgICBsZXQgc2hvd0ltYWdlc0JveCA9IHRydWU7XG4gICAgICAgICAgICBpZiAocHJvbXB0LmlkID09PSAnZGljdCcgfHwgcHJvbXB0LmlkID09PSAnRGVmYXVsdCcpIHtcbiAgICAgICAgICAgICAgICAvLyDnibnmrornmoTmlrnms5VcbiAgICAgICAgICAgICAgICBpZiAoa2V5V29yZC5sZW5ndGggPCAyMCkge1xuICAgICAgICAgICAgICAgICAgICBzaG93SW1hZ2VzQm94ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dJbWFnZXNCb3ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDoh6rlrprkuYkgUHJvbXB0XG4gICAgICAgICAgICAgICAgaWYgKHByb21wdC5nZXRVbnNwbGFzaEltYWdlcyAmJiBuZWVkVG9SdW5Qcm9tcHQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6c5b2T5YmNIFByb21wdCDpnIDopoHmmL7npLrlm77niYfvvIzkuJTlvZPliY3pnIDopoHnq4vljbPmiafooYwgUHJvbXB0XG4gICAgICAgICAgICAgICAgICAgIHNob3dJbWFnZXNCb3ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0ltYWdlc0JveCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOWfi+eCuVxuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdleGVjdXRpdmVQcm9tcHQnIH0pO1xuICAgICAgICAgICAgLy8g5Zyo5raI5oGv5Y6G5Y+y5Lit5o+S5YWl5paw6K6w5b2VXG4gICAgICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4gWy4uLnByZXZNZXNzYWdlcyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICdjb250ZW50JzogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2hhdElkJzogKDAsIHV1aWRfMS52NCkoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY29udGVudCc6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdGF0dXMnOiAnYmVnaW4nXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgJ3JvbGUnOiAnYXNzaXN0YW50JyxcbiAgICAgICAgICAgICAgICAgICAgJ3Byb21wdCc6ICcnLFxuICAgICAgICAgICAgICAgICAgICAnc2hvd0ltYWdlc0JveCc6IHNob3dJbWFnZXNCb3gsXG4gICAgICAgICAgICAgICAgICAgICdpbWFnZXMnOiBbXVxuICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgIC8vIOmdnui/vemXruaXtu+8jOaJjeS8muiusOW9leacgOi/keaJp+ihjOeahCBQcm9tcHRcbiAgICAgICAgICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyDorr7nva7mnIDov5HmiafooYznmoQgUHJvbXB0XG4gICAgICAgICAgICAgICAgc2V0TGFzdEV4ZWN1dGVkUHJvbXB0KHByb21wdCk7XG4gICAgICAgICAgICAgICAgLy8g6K6w5b2V5pyA6L+RIDEg5qyh5L2/55So55qEIFByb21wdO+8jOeUqOS6juS4i+asoeWQr+WKqOeql+WPo+aXtum7mOiupOaJp+ihjOatpCBQcm9tcHRcbiAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdEV4ZWN1dGVkUHJvbXB0OiBwcm9tcHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBuZXdQcm9tcHQ7XG4gICAgICAgICAgICBsZXQgcCA9IHByb21wdC51c2VyUHJvbXB0O1xuICAgICAgICAgICAgLy8g5aSE55CGIFByb21wdCDkuK3nmoTlj5jph49cbiAgICAgICAgICAgIHAgPSB5aWVsZCAoMCwgdXRpbF8xLmhhbmRsZVByb21wdFZhcmlhYmxlcykocCwga2V5V29yZCwgU2VudGVuY2UsIExhbmcpO1xuICAgICAgICAgICAgbmV3UHJvbXB0ID0gW3sgJ3JvbGUnOiAndXNlcicsICdjb250ZW50JzogcCB9XTtcbiAgICAgICAgICAgIC8vIOWmguaenOWOhuWPsuiusOW9leS4reWtmOWcqOiusOW9le+8jOWImeS4jemHjeWkjeivt+axgiBBUEnvvIznm7TmjqXmmL7npLrljoblj7LorrDlvZXnmoTkv6Hmga9cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5nZXQoeyBcImhpc3RvcnlcIjogW10gfSkudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgIC8vIOWmguaenOiusOW9leW3suWtmOWcqO+8jOWImeS4jemHjeWkjeS/neWtmFxuICAgICAgICAgICAgICAgIGxldCBiaW5nbyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGxldCB1cGRhdGVkTGFzdE1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtLmhpc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IGl0ZW0uaGlzdG9yeVtpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5rZXlXb3JkID09PSBrZXlXb3JkICYmIG9iai5zZW50ZW5jZSA9PT0gU2VudGVuY2UgJiYgb2JqLnByb21wdCA9PT0gbmV3UHJvbXB0WzBdWydjb250ZW50J10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgncm9sZScgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDml6fniYjmnKzkuK3lm6DkuLrmsqHmnInlrZjlgqggcm9sZSDvvIznm7TmjqXmmL7npLrljoblj7LmlbDmja7ml7bkvJrlr7zoh7TlkI7nu63mtYHnqIvlvILluLhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5nbyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYmluZ28gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+WOhuWPsuiusOW9le+8micpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOebtOaOpeaYvuekuuWOhuWPsuiusOW9leS4reeahOWbnuetlFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZExhc3RNZXNzYWdlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtZXNzYWdlc1ttZXNzYWdlcy5sZW5ndGggLSAxXSksIHsgcm9sZTogb2JqLnJvbGUsIGNvbnRlbnQ6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2hhdElkJzogKDAsIHV1aWRfMS52NCkoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjb250ZW50Jzogb2JqLmFuc3dlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdGF0dXMnOiAnZG9uZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV0sIHByb21wdDogbmV3UHJvbXB0WzBdWydjb250ZW50J10sIHNob3dJbWFnZXNCb3g6IHNob3dJbWFnZXNCb3gsIGltYWdlczogb2JqLmltYWdlcyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7IGJpbmdvOiBiaW5nbywgdXBkYXRlZExhc3RNZXNzYWdlOiB1cGRhdGVkTGFzdE1lc3NhZ2UgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5iaW5nbykge1xuICAgICAgICAgICAgICAgIC8v5pi+56S65Y6G5Y+y6K6w5b2VXG4gICAgICAgICAgICAgICAgc2V0TWVzc2FnZXMoW3Jlc3VsdC51cGRhdGVkTGFzdE1lc3NhZ2VdKTtcbiAgICAgICAgICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICAgICAgICAgIGxhc3RQcm9tcHRSZWYuY3VycmVudCA9IG5ld1Byb21wdDtcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzpnIDopoHmmL7npLrlm77niYfvvIzkuJTljoblj7LorrDlvZXkuK3msqHmnInlm77niYfvvIzliJnojrflj5blm77niYdcbiAgICAgICAgICAgICAgICBpZiAoc2hvd0ltYWdlc0JveCAmJiAoKF9hID0gcmVzdWx0LnVwZGF0ZWRMYXN0TWVzc2FnZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmltYWdlcy5sZW5ndGgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOiOt+WPluWbvueJh+aVsOaNrlxuICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmdldFVuc3BsYXNoSW1hZ2VzKShrZXlXb3JkKS50aGVuKChpbWdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDkv53lrZjlm77niYfmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBwcmV2TWVzc2FnZXNbcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2TWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlZExhc3RNZXNzYWdlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBsYXN0TWVzc2FnZSksIHsgbmVlZFRvU2hvd0ltZzogdHJ1ZSwgaW1hZ2VzOiBpbWdzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbLi4ucHJldk1lc3NhZ2VzLnNsaWNlKDAsIHByZXZNZXNzYWdlcy5sZW5ndGggLSAxKSwgdXBkYXRlZExhc3RNZXNzYWdlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDojrflj5bor63oqIDnn6Xor4ZcbiAgICAgICAgICAgICAgICBnZXRLbm93bGVkZ2UobmV3UHJvbXB0LCBrZXlXb3JkLCBwcm9tcHQuaWQpO1xuICAgICAgICAgICAgICAgIC8vIOivt+axguWbvueJh1xuICAgICAgICAgICAgICAgIGlmIChwcm9tcHQuaWQgPT0gJ0RlZmF1bHQnIHx8IHByb21wdC5pZCA9PSAnZGljdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleVdvcmQubGVuZ3RoIDw9IDIwICYmIHByb21wdC5nZXRVbnNwbGFzaEltYWdlcyAmJiBuZWVkVG9SZXJlbmRlckltYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDojrflj5blm77niYfmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgICAgICgwLCB1dGlsXzEuZ2V0VW5zcGxhc2hJbWFnZXMpKGtleVdvcmQpLnRoZW4oKGltZ3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXRJbWFnZXMoaW1ncylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDkv53lrZjlm77niYfmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0TWVzc2FnZSA9IHByZXZNZXNzYWdlc1twcmV2TWVzc2FnZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2TWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlZExhc3RNZXNzYWdlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBsYXN0TWVzc2FnZSksIHsgbmVlZFRvU2hvd0ltZzogdHJ1ZSwgaW1hZ2VzOiBpbWdzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWy4uLnByZXZNZXNzYWdlcy5zbGljZSgwLCBwcmV2TWVzc2FnZXMubGVuZ3RoIC0gMSksIHVwZGF0ZWRMYXN0TWVzc2FnZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb21wdC5nZXRVbnNwbGFzaEltYWdlcyAmJiBuZWVkVG9SZXJlbmRlckltYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDojrflj5blm77niYfmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgICAgICgwLCB1dGlsXzEuZ2V0VW5zcGxhc2hJbWFnZXMpKGtleVdvcmQpLnRoZW4oKGltZ3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXRJbWFnZXMoaW1ncylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDkv53lrZjlm77niYfmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0TWVzc2FnZSA9IHByZXZNZXNzYWdlc1twcmV2TWVzc2FnZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2TWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlZExhc3RNZXNzYWdlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBsYXN0TWVzc2FnZSksIHsgbmVlZFRvU2hvd0ltZzogdHJ1ZSwgaW1hZ2VzOiBpbWdzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWy4uLnByZXZNZXNzYWdlcy5zbGljZSgwLCBwcmV2TWVzc2FnZXMubGVuZ3RoIC0gMSksIHVwZGF0ZWRMYXN0TWVzc2FnZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIOaJk+W8gCBQb3B1cCDnqpflj6PvvIzkuI3pnIDopoHnq4vljbPmiafooYwgUHJvbXB0XG4gICAgICAgICAgICBzZXRMYXN0RXhlY3V0ZWRQcm9tcHQoeyAndGl0bGUnOiAnJywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZmFsc2UsICd1c2VyUHJvbXB0JzogJycsICdpZCc6ICcnIH0pO1xuICAgICAgICAgICAgLy8g5pWw5o2u5Z+L54K5XG4gICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ29wZW5Qb3B1cENhcmQnIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8g54K55Ye744CM6YeN5paw55Sf5oiQ44CN5oyJ6ZKuXG4gICAgY29uc3QgaGFuZGxlUmVnZW5lcmF0ZUJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgICAgICAvLyDlnKjmtojmga/ljoblj7LkuK3mj5LlhaXmlrDorrDlvZVcbiAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdNZXNzYWdlcyA9IFsuLi5wcmV2TWVzc2FnZXNdO1xuICAgICAgICAgICAgbmV3TWVzc2FnZXNbbmV3TWVzc2FnZXMubGVuZ3RoIC0gMV0uY29udGVudC5wdXNoKHtcbiAgICAgICAgICAgICAgICBjaGF0SWQ6ICgwLCB1dWlkXzEudjQpKCksXG4gICAgICAgICAgICAgICAgY29udGVudDogJycsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnYmVnaW4nLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBiZWdpbiDnirbmgIHmiY3kvJrmmL7npLrliqDovb3liqjnlLtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBuZXdNZXNzYWdlc1tuZXdNZXNzYWdlcy5sZW5ndGggLSAxXS5jb250ZW50O1xuICAgICAgICAgICAgbmV3TWVzc2FnZXNbbmV3TWVzc2FnZXMubGVuZ3RoIC0gMV0uY29udGVudFtjb250ZW50Lmxlbmd0aCAtIDFdLnN0YXR1cyA9ICdiZWdpbic7XG4gICAgICAgICAgICByZXR1cm4gbmV3TWVzc2FnZXM7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyDojrflj5bmnIDov5HmiafooYznmoQgUHJvbXB077yM5YaN5qyh5omn6KGMXG4gICAgICAgIGdldEtub3dsZWRnZShsYXN0UHJvbXB0UmVmLmN1cnJlbnQsIHByb3BzLmRhdGEua2V5V29yZCwgbGFzdEV4ZWN1dGVkUHJvbXB0LmlkKTtcbiAgICB9O1xuICAgIGNvbnN0IGluaXRpYWxpemVQcm9tcHRMaXN0ID0gKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyDojrflj5blt7Lkv53lrZjnmoQgUHJvbXB0IExpc3RcbiAgICAgICAgY29uc3QgcHJvbXB0TGlzdCA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7IFwicHJvbXB0TGlzdFwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5wcm9tcHRMaXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgc2V0UHJvbXB0cyhwcm9tcHRMaXN0KTtcbiAgICB9KTtcbiAgICAvLyDnvJbovpHoh6rlrprkuYkgUHJvbXB0IOaIkOWKn+WQjlxuICAgIGNvbnN0IGhhbmRsZVByb21wdEVkaXRlZCA9IChpc05ldykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyDliJ3lp4vljJYgUHJvbXB0IOWIl+ihqFxuICAgICAgICBpbml0aWFsaXplUHJvbXB0TGlzdCgpO1xuICAgICAgICAvLyDmm7TmlrDmnIDov5Hkvb/nlKjnmoQgUHJvbXB077yI6ZKI5a+557yW6L6R55qE5Zy65pmv77yJXG4gICAgICAgIGlmICghaXNOZXcpIHtcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7IFwicHJvbXB0TGlzdFwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtLnByb21wdExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ucHJvbXB0TGlzdFtpXS5pZCA9PT0gbGFzdEV4ZWN1dGVkUHJvbXB0LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmm7TmlrBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldExhc3RFeGVjdXRlZFByb21wdChpdGVtLnByb21wdExpc3RbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6K6w5b2V5pyA6L+RIDEg5qyh5L2/55So55qEIFByb21wdFxuICAgICAgICAgICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLnNldCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEV4ZWN1dGVkUHJvbXB0OiBpdGVtLnByb21wdExpc3RbaV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ2hhbmRsZVByb21wdEVkaXRlZCcgfSk7XG4gICAgfSk7XG4gICAgLy8g6K+35rGCIEdQVCDmlbDmja5cbiAgICBjb25zdCBnZXRLbm93bGVkZ2UgPSAocHJvbXB0LCBrZXlXb3JkLCBwcm9tcHRJZCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyDkvb/nlKjplb/ov57mjqVcbiAgICAgICAgY29uc3QgcG9ydCA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5jb25uZWN0KHtcbiAgICAgICAgICAgIG5hbWU6ICdnZXRHUFQnXG4gICAgICAgIH0pO1xuICAgICAgICAvLyDorrDlvZXmnIDov5HmiafooYznmoQgUHJvbXB077yM55So5LqO6YeN5paw55Sf5oiQXG4gICAgICAgIGxhc3RQcm9tcHRSZWYuY3VycmVudCA9IHByb21wdDtcbiAgICAgICAgY29uc3QgdGhpc0tleVdvcmQgPSBrZXlXb3JkIHx8ICcnO1xuICAgICAgICBjb25zdCB0aGlzUHJvbXB0SWQgPSBwcm9tcHRJZCB8fCAnJztcbiAgICAgICAgLy8g56aB55So5L+d5a2Y5YiwIEFua2kg5oyJ6ZKuXG4gICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnc3RhbmRieScsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICBpZiAodGhpc1Byb21wdElkID09PSAnZGljdCcpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIOS9v+eUqCBwb3N0TXMg5Y+R6YCB5L+h5oGvXG4gICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ2dldERpY3Rpb25hcnlEYXRhJywgJ21lc3NhZ2VzJzogcHJvbXB0LCAna2V5V29yZCc6IHRoaXNLZXlXb3JkIH0pO1xuICAgICAgICAgICAgfSwgMjApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8g5L2/55SoIHBvc3RNcyDlj5HpgIHkv6Hmga9cbiAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnZ2V0S25vd2xlZGdlJywgJ21lc3NhZ2VzJzogcHJvbXB0LCAna2V5V29yZCc6IHRoaXNLZXlXb3JkIH0pO1xuICAgICAgICAgICAgfSwgMjApO1xuICAgICAgICB9XG4gICAgICAgIC8vIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKG1zZywgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICAgICAgLy8gICAvLyBjb25zb2xlLmxvZyhtc2cpO1xuICAgICAgICAvLyB9KVxuICAgICAgICAvLyDmjqXmlLbkv6Hmga9cbiAgICAgICAgcG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1zZykgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3BvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyJyk7XG4gICAgICAgICAgICBpZiAobXNnLnR5cGUgPT09ICdzZW5kR1BURGF0YScpIHtcbiAgICAgICAgICAgICAgICAvLyDor7fmsYIgR1BUIOaVsOaNruaIkOWKn+S4lOaVsOaNrua1geS8oOi+k+S4rVxuICAgICAgICAgICAgICAgIC8vIGlmIChtc2cuc3RhdHVzID09PSAncHJvY2VzcycgfHwgbXNnLnN0YXR1cyA9PT0gJ2VuZCcpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAvLyDmuLLmn5PmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld01lc3NhZ2VzID0gWy4uLnByZXZNZXNzYWdlc107XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0TWVzc2FnZSA9IG5ld01lc3NhZ2VzW25ld01lc3NhZ2VzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5rex5bqm5ou36LSdXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudExpc3QgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxhc3RNZXNzYWdlLmNvbnRlbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdDb250ZW50ID0gbXNnLkFwaVR5cGUgPT09ICdjaGF0R1BUV2ViJyA/IG1zZy5jb250ZW50IDogY29udGVudExpc3RbY29udGVudExpc3QubGVuZ3RoIC0gMV1bJ2NvbnRlbnQnXSArIG1zZy5jb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29udGVudCA9ICgwLCB1dGlsXzEuaGFuZGxlSGlnaHRsaWdodCkobmV3Q29udGVudCwgcHJvcHMuZGF0YS5rZXlXb3JkLCBhbmtpQ2FyZHMsIHdpbmRvd0VsZW1lbnQgPT09IG51bGwgfHwgd2luZG93RWxlbWVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2luZG93RWxlbWVudC5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRMaXN0W2NvbnRlbnRMaXN0Lmxlbmd0aCAtIDFdWydjb250ZW50J10gPSBuZXdDb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudExpc3RbY29udGVudExpc3QubGVuZ3RoIC0gMV1bJ3N0YXR1cyddID0gbXNnLnN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0NvbnRlbnRMaXN0ID0gWy4uLmNvbnRlbnRMaXN0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRMYXN0TWVzc2FnZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbGFzdE1lc3NhZ2UpLCB7IGNvbnRlbnQ6IG5ld0NvbnRlbnRMaXN0LCBwcm9tcHQ6IHByb21wdFswXVsnY29udGVudCddIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5wcmV2TWVzc2FnZXMuc2xpY2UoMCwgcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDEpLCB1cGRhdGVkTGFzdE1lc3NhZ2VdO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAvLyDor7fmsYIgR1BUIOaVsOaNruaIkOWKn+S4lOaVsOaNrua1gee7k+adn+S8oOi+k1xuICAgICAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09PSAnZG9uZScgfHwgbXNnLnN0YXR1cyA9PT0gJ2Vycm8nKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyDnlKjmiLflj5HpgIHmtojmga9cbiAgICBjb25zdCBoYW5kbGVTZW5kTWVzc2FnZSA9ICh2YWx1ZXMpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codmFsdWVzKTtcbiAgICAgICAgbGV0IHByb21wdCA9IHZhbHVlcztcbiAgICAgICAgLy8gLy8g5riF56m65paH5pys5qGGXG4gICAgICAgIC8vIGZvcm0ucmVzZXRGaWVsZHMoKTtcbiAgICAgICAgLy8g5a6a5L2N5Yiw5bqV6YOoXG4gICAgICAgIHNjcm9sbFRvQm90dG9tKHRydWUpO1xuICAgICAgICAvLyDlsIbnlKjmiLflj5HoqIDlj5HpgIHliLDmtojmga/orrDlvZXkuK1cbiAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRMYXN0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgY29udGVudDogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGF0SWQ6ICgwLCB1dWlkXzEudjQpKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB2YWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdkb25lJyxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcHJvbXB0OiBwcm9tcHQsXG4gICAgICAgICAgICAgICAgc2hvd0ltYWdlc0JveDogZmFsc2UsXG4gICAgICAgICAgICAgICAgaW1hZ2VzOiBbXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBbLi4ucHJldk1lc3NhZ2VzLCB1cGRhdGVkTGFzdE1lc3NhZ2VdO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8g5Zyo5raI5oGv5Y6G5Y+y5Lit5o+S5YWl5pawIEdQVCDmtojmga9cbiAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IFsuLi5wcmV2TWVzc2FnZXMsIHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhdElkOiAoMCwgdXVpZF8xLnY0KSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdiZWdpbicsXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdhc3Npc3RhbnQnLFxuICAgICAgICAgICAgICAgIHByb21wdDogJycsXG4gICAgICAgICAgICAgICAgc2hvd0ltYWdlc0JveDogZmFsc2UsXG4gICAgICAgICAgICAgICAgaW1hZ2VzOiBbXVxuICAgICAgICAgICAgfV0pO1xuICAgICAgICBjb25zdCBtc2dIaXN0b3J5ID0gbWVzc2FnZXMuc2xpY2UoLTUpLm1hcCgoaXRlbSkgPT4geyByZXR1cm4geyAncm9sZSc6IGl0ZW0ucm9sZSwgJ2NvbnRlbnQnOiBpdGVtLmNvbnRlbnRbaXRlbS5jb250ZW50Lmxlbmd0aCAtIDFdWydjb250ZW50J10gfTsgfSk7XG4gICAgICAgIGdldEtub3dsZWRnZShbLi4ubXNnSGlzdG9yeSwgeyBcInJvbGVcIjogXCJ1c2VyXCIsIFwiY29udGVudFwiOiB2YWx1ZXMgfV0pO1xuICAgICAgICAvLyBhbXBsaXR1ZGUudHJhY2soJ2hhbmRsZVNlbmRNZXNzYWdlJyk7XG4gICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAnaGFuZGxlU2VuZE1lc3NhZ2UnIH0pO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlTW91c2VEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdQb3B1cENhcmQ6aGFuZGxlTW91c2VEb3duJyk7XG4gICAgICAgIHNldERyYWdnaW5nKHRydWUpO1xuICAgICAgICBpZiAod2luZG93RWxlbWVudC5jdXJyZW50KSB7XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gd2luZG93RWxlbWVudC5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRZID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICAgICAgd2luZG93RWxlbWVudC5jdXJyZW50LmRhdGFzZXQub2Zmc2V0WCA9IFN0cmluZyhvZmZzZXRYKTtcbiAgICAgICAgICAgIHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFkgPSBTdHJpbmcob2Zmc2V0WSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2V0T2Zmc2V0KHsgeDogZXZlbnQuY2xpZW50WCAtIHBvc2l0aW9uLngsIHk6IGV2ZW50LmNsaWVudFkgLSBwb3NpdGlvbi55IH0pO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlTW91c2VNb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIC8vIC8vIGNvbnNvbGUubG9nKCdQb3B1cENhcmQ6aGFuZGxlTW91c2VNb3ZlJyk7XG4gICAgICAgIC8vIC8vIGNvbnNvbGUubG9nKGRyYWdnaW5nKTtcbiAgICAgICAgaWYgKGRyYWdnaW5nICYmIHdpbmRvd0VsZW1lbnQuY3VycmVudCkge1xuICAgICAgICAgICAgLy8gVXNlIHJlcXVlc3RBbmltYXRpb25GcmFtZSB0byB0aHJvdHRsZSB0aGUgbW91c2Vtb3ZlIGV2ZW50IGhhbmRsaW5nXG4gICAgICAgICAgICAvLyDpvKDmoIfnm7jlr7nnqpflj6Plt6bkuIrop5LnmoTlgY/np7tcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFggPSBwYXJzZUZsb2F0KHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFggfHwgJycpO1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WSA9IHBhcnNlRmxvYXQod2luZG93RWxlbWVudC5jdXJyZW50LmRhdGFzZXQub2Zmc2V0WSB8fCAnJyk7XG4gICAgICAgICAgICBjb25zdCBuZXdYID0gZXZlbnQuY2xpZW50WCAtIG9mZnNldFg7XG4gICAgICAgICAgICBjb25zdCBuZXdZID0gZXZlbnQuY2xpZW50WSAtIG9mZnNldFk7XG4gICAgICAgICAgICAvLyBDaGVjayB0aGUgYm91bmRhcmllc1xuICAgICAgICAgICAgY29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRXaWR0aCA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRIZWlnaHQgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgbWluWCA9IC1lbGVtZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgY29uc3QgbWluWSA9IDA7XG4gICAgICAgICAgICBjb25zdCBtYXhYID0gd2luZG93V2lkdGggLSBlbGVtZW50V2lkdGggKyBlbGVtZW50V2lkdGggLyAyO1xuICAgICAgICAgICAgY29uc3QgbWF4WSA9IHdpbmRvd0hlaWdodCAtIGVsZW1lbnRIZWlnaHQgKyBlbGVtZW50SGVpZ2h0IC8gMS41O1xuICAgICAgICAgICAgY29uc3QgY2xhbXBlZFggPSBNYXRoLm1heChtaW5YLCBNYXRoLm1pbihuZXdYLCBtYXhYKSk7XG4gICAgICAgICAgICBjb25zdCBjbGFtcGVkWSA9IE1hdGgubWF4KG1pblksIE1hdGgubWluKG5ld1ksIG1heFkpKTtcbiAgICAgICAgICAgIC8vIE9ubHkgdXBkYXRlIHRoZSBwb3NpdGlvbiBpZiBpdCdzIHdpdGhpbiB0aGUgYm91bmRhcmllc1xuICAgICAgICAgICAgLy8gbmV3WCA+PSBtaW5YICYmIG5ld1ggPD0gbWF4WCAmJiBuZXdZID49IG1pblkgJiYgbmV3WSA8PSBtYXhZXG4gICAgICAgICAgICBpZiAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIC8vIHNldFBvc2l0aW9uKHsgeDogY2xhbXBlZFgsIHk6IGNsYW1wZWRZIH0pO1xuICAgICAgICAgICAgICAgIHdpbmRvd0VsZW1lbnQuY3VycmVudC5zdHlsZS5sZWZ0ID0gYCR7Y2xhbXBlZFh9cHhgO1xuICAgICAgICAgICAgICAgIHdpbmRvd0VsZW1lbnQuY3VycmVudC5zdHlsZS50b3AgPSBgJHtjbGFtcGVkWX1weGA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDlhYPntKDliLDovr7ovrnnlYxcbiAgICAgICAgICAgICAgICAvLyBjb25zdCByZWN0ID0gd2luZG93RWxlbWVudC5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IG9mZnNldFggPSBldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IG9mZnNldFkgPSBldmVudC5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgICAgICAgICAgICAgLy8gd2luZG93RWxlbWVudC5jdXJyZW50LmRhdGFzZXQub2Zmc2V0WCA9IFN0cmluZyhvZmZzZXRYKTtcbiAgICAgICAgICAgICAgICAvLyB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRZID0gU3RyaW5nKG9mZnNldFkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNb3VzZVVwID0gKCkgPT4ge1xuICAgICAgICAvLyAvLyBjb25zb2xlLmxvZygnUG9wdXBDYXJkOmhhbmRsZU1vdXNlVXAnKTtcbiAgICAgICAgc2V0RHJhZ2dpbmcoZmFsc2UpO1xuICAgIH07XG4gICAgLy8gR1BUIOeUn+aIkOa2iOaBr+aXtu+8jOiHquWKqOWumuS9jeWIsOa2iOaBr+WIl+ihqOW6lemDqO+8jOaWueS+v+eUqOaIt+mYheivu1xuICAgIGZ1bmN0aW9uIHNjcm9sbFRvQm90dG9tKGNhblNyb2xsID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQuY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2luZG93RWxlbWVudC5jdXJyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250YWluZXInKVswXTtcbiAgICAgICAgICAgIGlmIChjYW5Tcm9sbCkge1xuICAgICAgICAgICAgICAgIC8vIOS9jeS6juW6lemDqO+8jOmcgOimgeiHquWKqOa7muWKqFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSBjb250YWluZXIuc2Nyb2xsSGVpZ2h0ICsgMjA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgb3BlbkN1c3RvbVByb21wdEZvcm0gPSAoZGF0YSkgPT4ge1xuICAgICAgICAvLyDlvIDlkK/miJblhbPpl63oh6rlrprkuYkgUHJvbXB0IOihqOWNlVxuICAgICAgICBzZXRQb3BvdmVyT3BlbihkYXRhLmlzT3Blbik7XG4gICAgICAgIC8vIOiuvue9ruihqOWNleeahOm7mOiupOiuvue9rlxuICAgICAgICBpZiAoZGF0YS5pc09wZW4pIHtcbiAgICAgICAgICAgIHNldEN1c3RvbVByb21wdEZvcm1EYXRhKGRhdGEuZGF0YSk7XG4gICAgICAgICAgICAvLyDlvIDlkK/ooajljZVcbiAgICAgICAgICAgIC8vIGFtcGxpdHVkZS50cmFjaygnb3BlbkN1c3RvbVByb21wdEZvcm0nKTtcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAnb3BlbkN1c3RvbVByb21wdEZvcm0nIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIOW8gOWQr+ihqOWNleWQjuemgeatoueCueWHu+eql+WPo+WkluWMuuWfn+WFs+mXreeql+WPo1xuICAgICAgICAoMCwgY29udGVudFNjcmlwdF8xLnNldERvbm90Q2xvc2VQb3B1cENhcmQpKGRhdGEuaXNPcGVuKTtcbiAgICB9O1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChTY291dGVyRGl2LCB7IGlkOiBcIkxlYXJuaW5nRW5nbGlzaDIwMjNcIiwgcmVmOiB3aW5kb3dFbGVtZW50LCBzdHlsZToge1xuICAgICAgICAgICAgICAgIGxlZnQ6IDEwLFxuICAgICAgICAgICAgICAgIHRvcDogMTAsXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQ29uZmlnUHJvdmlkZXIsIHsgdGhlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yUHJpbWFyeTogJyNGMDhBMjQnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChOYXZfMS5OYXZcbiAgICAgICAgICAgICAgICAvLyBoYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2s9e2hhbmRsZVNhdmVUb0Fua2lCdG5DbGlja31cbiAgICAgICAgICAgICAgICAsIHsgXG4gICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljaz17aGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrfVxuICAgICAgICAgICAgICAgICAgICBhZGRUb0Fua2lTdGF0dXM6IGFkZFRvQW5raVN0YXR1cywgb25Nb3VzZURvd246IGhhbmRsZU1vdXNlRG93biwgaGFuZGxlTWVudUl0ZW1DbGljazogZXhlY3V0aXZlUHJvbXB0LCBvcGVuQ3VzdG9tUHJvbXB0Rm9ybTogb3BlbkN1c3RvbVByb21wdEZvcm0sIGlzT3Blbk1lbnU6IGlzT3Blbk1lbnUsIHByb21wdHM6IHByb21wdHMsIGxhc3RFeGVjdXRlZFByb21wdDogbGFzdEV4ZWN1dGVkUHJvbXB0LCBrZXlXb3JkOiBwcm9wcy5kYXRhLmtleVdvcmQsIFNlbnRlbmNlOiBwcm9wcy5kYXRhLlNlbnRlbmNlLCB3aW5kb3dFbGVtZW50OiB3aW5kb3dFbGVtZW50LmN1cnJlbnQgfSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdjb250YWluZXIgZmxleC1ncm93IGZsZXggZmxleC1jb2wgb3ZlcmZsb3ctYXV0bycsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6ICc1MHB4J1xuICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnc2NvdXRlckNvbnRlbnRCb3ggZmxleC1ncm93JywgcmVmOiBtZXNzYWdlc0xpc3QsIHN0eWxlOiB7fSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0aW9uXzEuU2VsZWN0aW9uLCB7IHRleHQ6IHByb3BzLmRhdGEua2V5V29yZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VfMS5NZXNzYWdlc0xpc3QsIHsgbWVzc2FnZXM6IG1lc3NhZ2VzIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtZXNzYWdlc1ttZXNzYWdlcy5sZW5ndGggLSAxXS5wcm9tcHQgPT09ICcnID8gJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUmVnZW5lcmF0ZUJ1dHRvbl8xLlJlZ2VuZXJhdGVCdXR0b24sIHsgbWVzc2FnZXM6IG1lc3NhZ2VzLCBoYW5kbGVSZWdlbmVyYXRlQnV0dG9uQ2xpY2s6IGhhbmRsZVJlZ2VuZXJhdGVCdXR0b25DbGljayB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2ZvbGxvd1VwTWVudUJveCcsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHNob3dGb2xsb3dVcERhdGFNZW51LnNob3cgPyAnYmxvY2snIDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ2ZpdC1jb250ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvbXB0TGlzdF8xLlByb21wdExpc3QsIHsgZm9sbG93VXBEYXRhOiBmb2xsb3dVcERhdGEsIHNob3dGb2xsb3dVcERhdGFNZW51OiBzaG93Rm9sbG93VXBEYXRhTWVudSwgcHJvbXB0TGlzdDogcHJvbXB0cywgaGFuZGxlTWVudUl0ZW1DbGljazogZXhlY3V0aXZlUHJvbXB0IH0pKSkpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFVzZXJNZXNzYWdlSW5wdXRfMS5Vc2VyTWVzc2FnZUlucHV0LCB7IG1lc3NhZ2VzOiBtZXNzYWdlcywgaGFuZGxlU2VuZE1lc3NhZ2U6IGhhbmRsZVNlbmRNZXNzYWdlIH0pLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5EcmF3ZXIsIHsgdGl0bGU6IGN1c3RvbVByb21wdEZvcm1EYXRhLmlkID09PSAnJyA/IFwiQ3JlYXRlIFByb21wdFwiIDogXCJFZGl0IFByb21wdFwiLCBwbGFjZW1lbnQ6IFwiYm90dG9tXCIsIGNsb3NhYmxlOiBmYWxzZSwgaGVpZ2h0OiAnMTAwJScsIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25DbG9zZT17b25DbG9zZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46IGlzUG9wb3Zlck9wZW4sIGdldENvbnRhaW5lcjogZmFsc2UsIGV4dHJhOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuU3BhY2UsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZTogeyB6SW5kZXg6ICc5JyB9LCBvbkNsaWNrOiAoKSA9PiBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogZmFsc2UsIGRhdGE6IHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9IH0pIH0sIFwiQ2FuY2VsXCIpKSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBiYWNrZ3JvdW5kQ29sb3I6ICdyZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICcwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnNjRweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ2FsbC1zY3JvbGwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgb25Nb3VzZURvd246IGhhbmRsZU1vdXNlRG93biB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEN1c3RvbVByb21wdEZvcm1fMS5DdXN0b21Qcm9tcHRGb3JtLCB7IG9wZW5DdXN0b21Qcm9tcHRGb3JtOiBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSwgaGFuZGxlUHJvbXB0RWRpdGVkOiBoYW5kbGVQcm9tcHRFZGl0ZWQsIGRhdGE6IGN1c3RvbVByb21wdEZvcm1EYXRhIH0pKSkpKSkpO1xufVxuZXhwb3J0cy5Qb3B1cENhcmQgPSBQb3B1cENhcmQ7XG47XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucG9wdXBDYXJkU3R5bGUgPSB2b2lkIDA7XG5leHBvcnRzLnBvcHVwQ2FyZFN0eWxlID0gYFxuLnNsaWNrLWFycm93OjpiZWZvcmV7XG4gIGNvbnRlbnQ6XCJcIiAhaW1wb3J0YW50O1xufVxuXG4uYW5raVNwYWNlIHtcbiAgY29sb3I6I0YwOEEyNDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYW5raVNwYWNlOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjojRjA4QTI0O1xuICBjb2xvcjojZmZmZmZmO1xufVxuXG4uY29udGV4dEJveCwuZm9sbG93VXBNZW51IHtcbiAgZGlzcGxheTogZmxleDtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuICBwYWRkaW5nOiA0cHggOHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNik7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm94LXNoYWRvdzogMCA2cHggMTZweCAwIHJnYmEoMCwgMCwgMCwgMC4wOCksXG4gIDAgM3B4IDZweCAtNHB4IHJnYmEoMCwgMCwgMCwgMC4xMiksXG4gIDAgOXB4IDI4cHggOHB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XG4gIHotaW5kZXg6OTtcblxufVxuXG4uY29udGV4dEJveCB7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi8vIC5jb250ZXh0Qm94ICoge1xuLy8gICBjdXJzb3I6IGRlZmF1bHQ7XG4vLyAgIHBhZGRpbmc6IDJweDtcbi8vIH1cblxuLy8gLmFua2lTcGFjZUJ1dHRvbkJveCB7XG4vLyAgIGRpc3BsYXk6IGZsZXg7XG4vLyAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4vLyAgIG1hcmdpbi1yaWdodDogOHB4O1xuLy8gICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4xMik7XG4vLyAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XG4vLyB9XG5cbi8vIC5zZXRBbmtpU3BhY2VCdXR0b246Zmlyc3Qtb2YtdHlwZSB7XG4vLyAgIG1hcmdpbi1yaWdodDo4cHg7XG4vLyB9XG5cbi8vIC5sb29rVXBCdXR0b24ge1xuLy8gICB3aWR0aDogMThweDtcbi8vICAgaGVpZ2h0OiAxOHB4O1xuLy8gICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4vLyAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4vLyAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbi8vIH1cblxuLy8gLmFua2lTcGFjZUJ1dHRvbkJveCAqOmhvdmVyIHtcbiAgXG4vLyAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDU5LDAuMDUxKTtcbi8vICAgYm9yZGVyLXJhZGl1czogMnB4O1xuXG4vLyB9XG5cbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLXByZXYsXG4uYW50LWNhcm91c2VsIC5zbGljay1uZXh0LFxuLmFudC1jYXJvdXNlbCAuc2xpY2stcHJldjpob3Zlcixcbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLW5leHQ6aG92ZXIge1xuICBmb250LXNpemU6IGluaGVyaXQ7XG4gIGNvbG9yOiBjdXJyZW50Q29sb3I7XG59XG5cbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLXByZXYsXG4uYW50LWNhcm91c2VsIC5zbGljay1wcmV2OmhvdmVyIHtcbiAgbGVmdDogMTBweDtcbiAgei1pbmRleDogMjtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uYW50LWNhcm91c2VsIC5zbGljay1uZXh0LFxuLmFudC1jYXJvdXNlbCAuc2xpY2stbmV4dDpob3ZlciB7XG4gIHJpZ2h0OiAxMHB4O1xuICB6LWluZGV4OiAyO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5pbWFnZXMgaW1nIHtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbn1cblxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyBoMSwjTGVhcm5pbmdFbmdsaXNoMjAyMyBoMiwjTGVhcm5pbmdFbmdsaXNoMjAyMyBoM3tcbiAgbWFyZ2luOiAxMHB4IDA7XG59XG5cbi8vICNMZWFybmluZ0VuZ2xpc2gyMDIzIGgxe1xuLy8gICBmb250LXNpemU6MjBweDtcbi8vIH1cbi8vICNMZWFybmluZ0VuZ2xpc2gyMDIzIGgye1xuLy8gICBmb250LXNpemU6MTdweDtcbi8vIH1cblxuLy8gI0xlYXJuaW5nRW5nbGlzaDIwMjMge1xuLy8gZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG4vLyB3aWR0aDogMzkwcHg7XG4vLyBoZWlnaHQ6IDU2MHB4O1xuLy8gY29sb3I6IHJnYigwIDAgMCAvIDgwJSk7XG4vLyBwb3NpdGlvbjogZml4ZWQ7XG4vLyBkaXNwbGF5OiBmbGV4O1xuLy8gZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbi8vIGZvbnQtc2l6ZTogMTMuMnB4O1xuLy8gYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbi8vIHotaW5kZXg6IDk5OTk7XG4vLyBvdmVyZmxvdzogaGlkZGVuO1xuLy8gYm94LXNoYWRvdzogMHB4IDhweCAyOHB4IHJnYmEoMCwwLDAsLjE2KTtcbi8vIGJvcmRlci1yYWRpdXM6IDZweDtcbi8vIGJvcmRlcjoxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMDYpXG4vLyB9XG5cbjo6c2VsZWN0aW9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRDVCMjtcbn1cblxuOjotbW96LXNlbGVjdGlvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkQ1QjI7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5jb250YWluZXI6Oi13ZWJraXQtc2Nyb2xsYmFyICB7XG4gIC8vIHdpZHRoOjBweDtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLmNvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sgIHtcbiAgLy8gYmFja2dyb3VuZDogI2ZmZjsgLyog6K6+572u5rua5Yqo5p2h6L2o6YGT6IOM5pmv6ImyICovXG59XG5cbi8vICNMZWFybmluZ0VuZ2xpc2gyMDIzIC5jb250YWluZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbi8vICAgYmFja2dyb3VuZDogIzg4ODsgLyog6K6+572u5rua5Yqo5p2h5ruR5Z2X6IOM5pmv6ImyICovXG4vLyB9XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5Ecm9wZG93bk1lbnVJdGVtOmhvdmVyIHtcbiAgXG4gIGJhY2tncm91bmQtY29sb3I6I0Y2RjZGNjtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLkRyb3Bkb3duTWVudUl0ZW06Zm9jdXMtdmlzaWJsZSB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIGgxLCNMZWFybmluZ0VuZ2xpc2gyMDIzIGgyLCNMZWFybmluZ0VuZ2xpc2gyMDIzIGgzIHtcblxuICBjb2xvcjogcmdiYSgwLCAwLCAwKTtcblxufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAjU2NvdXRlclNlbGVjdGlvbiwgI0xlYXJuaW5nRW5nbGlzaDIwMjMgLm1lc3NhZ2VzPmRpdiAge1xuICBwYWRkaW5nLWxlZnQ6MThweDtcbiAgcGFkZGluZy1yaWdodDoxOHB4O1xufVxuXG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC51c2VySW5wdXQge1xubWFyZ2luOiAxMHB4IDA7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5jb250ZW50Qm94IHtcbm92ZXJmbG93OiBzY3JvbGw7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5tZXNzYWdlcyA+ICogPiAqIHtcbiAgLy8gbWFyZ2luOiAxOHB4IDA7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzICNTY291dGVyTmF2IHtcbi8vIGRpc3BsYXk6IGZsZXg7XG4vLyBqdXN0aWZ5LWNvbnRlbnQ6IHN0YXJ0O1xuLy8gYWxpZ24taXRlbXM6IGNlbnRlcjtcbi8vIHBhZGRpbmctdG9wOiAxMnB4O1xuLy8gcGFkZGluZy1ib3R0b206IDEycHg7XG4vLyBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMDYpO1xuLy8gdXNlci1zZWxlY3Q6IG5vbmU7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzICNTY291dGVyTmF2IGltZyB7XG4vLyB3aWR0aDogYXV0bztcbi8vIGhlaWdodDogMjRweDtcbi8vIG1hcmdpbi1yaWdodDogNnB4O1xufVxuXG4ubWVzc2FnZXMgdWx7XG4gIGxpc3Qtc3R5bGU6ZGlzYztcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xufVxuXG4ubWVzc2FnZXMgb2x7XG4gIGxpc3Qtc3R5bGU6YXV0bztcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAuaXNQaW4gcGF0aHtcbiAgZmlsbDogI0YwOEEyNDtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLnJpZ2h0QnRuQm94IGJ1dHRvbiB7XG5cbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLnJpZ2h0QnRuQm94IGJ1dHRvbiBzcGFuOmxhc3Qtb2YtdHlwZXtcbiAgXG59XG5cbnRhYmxlIHRyIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgcGFkZGluZzogNXB4O1xufVxudGFibGUgdGgsIHRhYmxlIHRkIHtcbiAgcGFkZGluZzogMTBweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbnRhYmxlIHRoIHtcbiAgLy8gZm9udC1zaXplOiAxNHB4O1xuICBsZXR0ZXItc3BhY2luZzogMXB4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG4vLyAvKiDmu5rliqjmnaHku6Xlj4rmu5rliqjmnaHovajpgZPnmoTlrr3luqYgKi9cbi8vIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xuLy8gICAgIHdpZHRoOiAxMHB4O1xuLy8gfVxuXG4vLyAvKiDmu5rliqjmnaHovajpgZPnmoTmoLflvI8qL1xuLy8gOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgXG4vLyB9XG5cbi8vIC8qIOa7muWKqOadoeeahOagt+W8jyAqL1xuLy8gOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4vLyAgICAgYmFja2dyb3VuZDogIzg4ODsgXG4vLyB9XG5cbi8vIC8qIOW9k+S9oOm8oOagh+aCrOWBnOWcqOa7muWKqOadoeS4iuaXtueahOagt+W8jyAqL1xuLy8gOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7XG4vLyAgICAgYmFja2dyb3VuZDogIzU1NTsgXG4vLyB9XG5cbi8qIOa7muWKqOadoSAqL1xuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3Jpem9udGFsIHsgLyrmsLTlubPmu5rliqjmnaHnmoTmoLflvI8qL1xuICB3aWR0aDogNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQzFDMUMxO1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDZweDtcbn1cbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2stcGllY2Uge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyAvKua7muWKqOadoeeahOiDjOaZr+minOiJsiovXG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMDsgLyrmu5rliqjmnaHnmoTlnIbop5Llrr3luqYqL1xufVxuOjotd2Via2l0LXNjcm9sbGJhciB7XG4gIHdpZHRoOiAxMHB4OyAvKua7muWKqOadoeeahOWuveW6piovXG4gIGhlaWdodDogOHB4OyAvKua7muWKqOadoeeahOmrmOW6piovXG59XG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOnZlcnRpY2FsIHsgLyrlnoLnm7Tmu5rliqjmnaHnmoTmoLflvI8qL1xuICBoZWlnaHQ6IDUwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsLjI1KTtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA0cHg7XG4gIG91dGxpbmU6IDJweCBzb2xpZCAjZmZmO1xuICBvdXRsaW5lLW9mZnNldDogLTJweDtcbiAgYm9yZGVyOiAycHggc29saWQgI2ZmZjtcbn1cbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIgeyAvKua7muWKqOadoeeahGhvdmVy5qC35byPKi9cbiAgaGVpZ2h0OiA1MHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWY5ZjlmO1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxucHJlIHtcbmJhY2tncm91bmQtY29sb3I6ICNmMGYwZjA7XG5ib3JkZXItcmFkaXVzOiA1cHg7XG5wYWRkaW5nOiAxNXB4O1xuYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbmNvbG9yOiAjMzMzO1xuZm9udC1mYW1pbHk6IENvdXJpZXIsIG1vbm9zcGFjZTtcbmxpbmUtaGVpZ2h0OiAxLjI7XG5vdmVyZmxvdy14OiBhdXRvO1xud2hpdGUtc3BhY2U6IHByZTtcbn1cblxuYmxvY2txdW90ZSB7XG5wYWRkaW5nOiAxMHB4IDIwcHg7XG5tYXJnaW46IDAgMCAyMHB4O1xuYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCAjZjFmMWYxO1xuY29sb3I6ICM2NjY7XG5iYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xufVxuXG5gO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0SW5pdGlhbFByb21wdCA9IGV4cG9ydHMuZ2V0RGVmYXVsdFByb21wdCA9IGV4cG9ydHMuaGFuZGxlSGlnaHRsaWdodCA9IGV4cG9ydHMuZ2V0QW5raUNhcmRzID0gZXhwb3J0cy5oYW5kbGVQcm9tcHRWYXJpYWJsZXMgPSBleHBvcnRzLmdldFVuc3BsYXNoSW1hZ2VzID0gZXhwb3J0cy53aW5kb3dJbml0aWFsaXphdGlvbiA9IGV4cG9ydHMuZ2V0Q2xpcGJvYXJkID0gZXhwb3J0cy5kZWZhdWx0UHJvbXB0ID0gZXhwb3J0cy5kaWN0aW9uYXJ5UHJvbXB0ID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vT3B0aW9ucy91dGlsXCIpO1xuZXhwb3J0cy5kaWN0aW9uYXJ5UHJvbXB0ID0ge1xuICAgIHRpdGxlOiAnRGljdGlvbmFyeScsXG4gICAgaWQ6ICdkaWN0JyxcbiAgICBnZXRVbnNwbGFzaEltYWdlczogdHJ1ZSxcbiAgICB1c2VyUHJvbXB0OiAnJyxcbn07XG5leHBvcnRzLmRlZmF1bHRQcm9tcHQgPSB7XG4gICAgdGl0bGU6ICdEaWN0aW9uYXJ5JyxcbiAgICBpZDogJ2RpY3QnLFxuICAgIGdldFVuc3BsYXNoSW1hZ2VzOiB0cnVlLFxuICAgIHVzZXJQcm9tcHQ6ICcnLFxufTtcbmNvbnN0IGdldENsaXBib2FyZCA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLnJlYWRUZXh0KClcbiAgICAgICAgICAgIC50aGVuKHRleHQgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0ZXh0KTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbmV4cG9ydHMuZ2V0Q2xpcGJvYXJkID0gZ2V0Q2xpcGJvYXJkO1xuY29uc3Qgd2luZG93SW5pdGlhbGl6YXRpb24gPSAoZGF0YSkgPT4ge1xuICAgIC8vIOiuvue9rueql+WPo+eahOm7mOiupOS9jee9rlxuICAgIGlmIChkYXRhLndpbmRvd0VsZW1lbnQuY3VycmVudCAmJiAhZGF0YS5pc1Bpbikge1xuICAgICAgICAvLyBDaGVjayB0aGUgYm91bmRhcmllc1xuICAgICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRXaWR0aCA9IGRhdGEud2luZG93RWxlbWVudC5jdXJyZW50LmNsaWVudFdpZHRoO1xuICAgICAgICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gZGF0YS53aW5kb3dFbGVtZW50LmN1cnJlbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICBjb25zdCBtaW5YID0gMDtcbiAgICAgICAgY29uc3QgbWluWSA9IDA7XG4gICAgICAgIGNvbnN0IG1heFggPSB3aW5kb3dXaWR0aCAtIGVsZW1lbnRXaWR0aDtcbiAgICAgICAgY29uc3QgbWF4WSA9IHdpbmRvd0hlaWdodCAtIGVsZW1lbnRIZWlnaHQ7XG4gICAgICAgIGxldCBuZXdYLCBuZXdZID0gMDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbk9iamVjdCA9IGRhdGEuc2VsZWN0aW9uLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBuZXdYID0gc2VsZWN0aW9uT2JqZWN0LnggKyBzZWxlY3Rpb25PYmplY3Qud2lkdGggKyAxMDtcbiAgICAgICAgICAgIG5ld1kgPSBzZWxlY3Rpb25PYmplY3QueSArIHNlbGVjdGlvbk9iamVjdC5oZWlnaHQgKyAxMDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjbGFtcGVkWCA9IE1hdGgubWF4KG1pblgsIE1hdGgubWluKG5ld1gsIG1heFgpKTtcbiAgICAgICAgY29uc3QgY2xhbXBlZFkgPSBNYXRoLm1heChtaW5ZLCBNYXRoLm1pbihuZXdZLCBtYXhZKSk7XG4gICAgICAgIGRhdGEud2luZG93RWxlbWVudC5jdXJyZW50LnN0eWxlLmxlZnQgPSBgJHtjbGFtcGVkWH1weGA7XG4gICAgICAgIGRhdGEud2luZG93RWxlbWVudC5jdXJyZW50LnN0eWxlLnRvcCA9IGAke2NsYW1wZWRZfXB4YDtcbiAgICB9XG4gICAgLy8gLy8g5re75Yqg5rua5Yqo5LqL5Lu277yM6K6p5raI5oGv5YiX6KGo6Ieq5Yqo5rua5Yqo5Yiw5bqV6YOoXG4gICAgLy8gZGF0YS5tZXNzYWdlc0xpc3QuY3VycmVudD8uYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVTY3JvbGwpO1xuICAgIC8vIHJldHVybiAoKSA9PiB7XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKCd1c2VFZmZlY3QgcmV0dXJuJyk7XG4gICAgLy8gICAgIGRhdGEubWVzc2FnZXNMaXN0LmN1cnJlbnQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlU2Nyb2xsKTtcbiAgICAvLyB9O1xuICAgIC8vIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbCgpIHtcbiAgICAvLyAgICAgaWYgKGRhdGEubWVzc2FnZXNMaXN0LmN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAvLyAgICAgICAgIGNvbnN0IGlzQXRCb3R0b20gPSBkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50Py5zY3JvbGxUb3AgKyBkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50LmNsaWVudEhlaWdodCA+PSBkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50LnNjcm9sbEhlaWdodCAtIDAuNTtcbiAgICAvLyAgICAgICAgIGlmIChpc0F0Qm90dG9tKSB7XG4gICAgLy8gICAgICAgICAgICAgLy8g5bey57uP5L2N5LqO5bqV6YOo77yM5LiN6ZyA6KaB6Ieq5Yqo5rua5YqoXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICAvLyBzY3JvbGxUb0JvdHRvbSgpXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgLy8g5pyq5L2N5LqO5bqV6YOo77yM5LiN5omn6KGM6Ieq5Yqo5rua5YqoXG4gICAgLy8gfVxufTtcbmV4cG9ydHMud2luZG93SW5pdGlhbGl6YXRpb24gPSB3aW5kb3dJbml0aWFsaXphdGlvbjtcbi8qKlxuICog6I635Y+WIFVuc3BsYXNoIOWbvueJh1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlXb3JkIC0g5qC55o2u5q2k5YWz6ZSu5a2X5pCc57Si5Zu+54mHXG4gKiBAcmV0dXJucyB7QXJyYXl9IOWbvueJh+WIl+ihqFxuICogQHRocm93cyB75byC5bi457G75Z6LfSDlvILluLjmj4/ov7BcbiAqL1xuY29uc3QgZ2V0VW5zcGxhc2hJbWFnZXMgPSAoa2V5V29yZCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIOivt+axgiBiYWNrZ3JvdW5kIOiOt+WPluaVsOaNrlxuICAgICAgICAvLyDkvb/nlKjplb/ov57mjqVcbiAgICAgICAgLy8gbGV0IHBvcnQgPSBicm93c2VyLnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgICAgIC8vICAgICBuYW1lOiAnZnJvbVBvcHVwQ2FyZFV0aWwnXG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIOS9v+eUqCBwb3N0TXMg5Y+R6YCB5L+h5oGvXG4gICAgICAgIGxldCBzZW5kaW5nID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnZ2V0VW5zcGxhc2hJbWFnZXMnLCAnbWVzc2FnZXMnOiAnJywgJ2tleVdvcmQnOiBrZXlXb3JkIH0pO1xuICAgICAgICBzZW5kaW5nLnRoZW4oKG1zZykgPT4ge1xuICAgICAgICAgICAgaWYgKG1zZy50eXBlID09PSAnc2VuZEltZ0RhdGEnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCdpbWdzJyBpbiBtc2cpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3Vuc3BsYXNoU2VhcmNoUGhvdG9zJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobXNnLmltZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgLy9lcnJvclxuICAgICAgICB9KTtcbiAgICAgICAgLy8gLy8g5o6l5pS25L+h5oGvXG4gICAgICAgIC8vIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKG1zZyA9PiB7XG4gICAgICAgIC8vICAgICBpZiAobXNnLnR5cGUgPT09ICdzZW5kSW1nRGF0YScpIHtcbiAgICAgICAgLy8gICAgICAgICBpZiAoJ2ltZ3MnIGluIG1zZykge1xuICAgICAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndW5zcGxhc2hTZWFyY2hQaG90b3MnKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgcmVzb2x2ZShtc2cuaW1ncylcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pXG4gICAgfSk7XG59O1xuZXhwb3J0cy5nZXRVbnNwbGFzaEltYWdlcyA9IGdldFVuc3BsYXNoSW1hZ2VzO1xuLyoqXG4gKiDlpITnkIYgUHJvbXB0IOS4reeahOWPmOmHj1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9tcHRTdHIgLSDpnIDopoHlpITnkIbnmoQgUHJvbXB0IOWtl+espuS4slxuICogQHBhcmFtIHtzdHJpbmd9IGtleVdvcmQgLSDnlKjmiLfmiYDpgInkuK3nmoTlhbPplK7lrZdcbiAqIEBwYXJhbSB7c3RyaW5nfSBTZW50ZW5jZSAtIOS7jue9kemhteS4reaPkOWPlueahOWFs+mUruWtl+aJgOWcqOeahOWPpeWtkFxuICogQHJldHVybnMge3N0cmluZ30g5aSE55CG5ZCO55qEIFByb21wdCDlrZfnrKbkuLJcbiAqIEB0aHJvd3Mge+W8guW4uOexu+Wei30g5byC5bi45o+P6L+wXG4gKi9cbmNvbnN0IGhhbmRsZVByb21wdFZhcmlhYmxlcyA9IChwcm9tcHRTdHIsIGtleVdvcmQsIFNlbnRlbmNlLCBMYW5nKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBsZXQgbmV3UHJvbXB0U3RyID0gcHJvbXB0U3RyO1xuICAgIC8vIOWkhOeQhuWFs+mUruWtl+WSjOWPpeWtkFxuICAgIG5ld1Byb21wdFN0ciA9IHByb21wdFN0ci5yZXBsYWNlKC9cXHtzZWxlY3Rpb25cXH0vZywga2V5V29yZCk7XG4gICAgbmV3UHJvbXB0U3RyID0gbmV3UHJvbXB0U3RyLnJlcGxhY2UoL1xce3NlbnRlbmNlXFx9L2csIFNlbnRlbmNlKTtcbiAgICAvLyDlpITnkIbor63oqIBcbiAgICBuZXdQcm9tcHRTdHIgPSBuZXdQcm9tcHRTdHIucmVwbGFjZSgvXFx7bmF0aXZlTGFuZ3VhZ2VcXH0vZywgTGFuZ1snY3VycmVudCddWyduYW1lJ10pO1xuICAgIG5ld1Byb21wdFN0ciA9IG5ld1Byb21wdFN0ci5yZXBsYWNlKC9cXHtjdXJyZW50TGFuZ3VhZ2VcXH0vZywgTGFuZ1snY3VycmVudCddWyduYW1lJ10pO1xuICAgIG5ld1Byb21wdFN0ciA9IG5ld1Byb21wdFN0ci5yZXBsYWNlKC9cXHt0YXJnZXRMYW5ndWFnZVxcfS9nLCBMYW5nWyd0YXJnZXQnXVsnbmFtZSddKTtcbiAgICAvLyDlpITnkIYgQW5raSDljZXor41cbiAgICBpZiAobmV3UHJvbXB0U3RyLmluZGV4T2YoJ3thbmtpQ2FyZHN9JykgPj0gMCkge1xuICAgICAgICAvLyDojrflj5bnm67moIfljaHniYdcbiAgICAgICAgbGV0IHJhbmRvbVZhbHVlcztcbiAgICAgICAgbGV0IGFua2lDYXJkc1N0ciA9ICcnO1xuICAgICAgICB5aWVsZCAoMCwgZXhwb3J0cy5nZXRBbmtpQ2FyZHMpKCkudGhlbigoY2FyZHMpID0+IHtcbiAgICAgICAgICAgIHJhbmRvbVZhbHVlcyA9IGNhcmRzO1xuICAgICAgICAgICAgaWYgKHJhbmRvbVZhbHVlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChyYW5kb21WYWx1ZXMubGVuZ3RoID4gNSkge1xuICAgICAgICAgICAgICAgICAgICAvLyDpmo/mnLrlj5YgWCDkuKrljaHniYdcbiAgICAgICAgICAgICAgICAgICAgLy8g5rex5ou36LSd5pWw57uE5Lul6YG/5YWN5L+u5pS55rqQ5pWw57uEXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNodWZmbGVkQXJyYXkgPSByYW5kb21WYWx1ZXMuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8g5L2/55SoIEZpc2hlci1ZYXRlcyDmtJfniYznrpfms5Xlr7nmlbDnu4Tov5vooYzmiZPkubFcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHNodWZmbGVkQXJyYXkubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgW3NodWZmbGVkQXJyYXlbaV0sIHNodWZmbGVkQXJyYXlbal1dID0gW3NodWZmbGVkQXJyYXlbal0sIHNodWZmbGVkQXJyYXlbaV1dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIOWPluWJjSB4IOS4quWFg+e0oOS9nOS4uue7k+aenFxuICAgICAgICAgICAgICAgICAgICByYW5kb21WYWx1ZXMgPSBzaHVmZmxlZEFycmF5LnNsaWNlKDAsIDUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g5bCG5Y2V6K+N5pu/5o2i5YiwIHByb21wdCDkuK1cbiAgICAgICAgICAgICAgICByYW5kb21WYWx1ZXMgPT09IG51bGwgfHwgcmFuZG9tVmFsdWVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYW5kb21WYWx1ZXMuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY2FyZC5maWVsZHMpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3RLZXkgPSBrZXlzWzBdO1xuICAgICAgICAgICAgICAgICAgICAvLyDmib7liLDljaHniYfmraPpnaJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZC5maWVsZHNba2V5c1tpXV0ub3JkZXIgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYW5raUNhcmRzU3RyICs9IGNhcmQuZmllbGRzW2ZpcnN0S2V5XS52YWx1ZSArICcsJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBuZXdQcm9tcHRTdHIgPSBuZXdQcm9tcHRTdHIucmVwbGFjZSgvXFx7YW5raUNhcmRzXFx9L2csIGFua2lDYXJkc1N0cik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1Byb21wdFN0cjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBuZXdQcm9tcHRTdHIgPSBuZXdQcm9tcHRTdHIucmVwbGFjZSgvXFx7YW5raUNhcmRzXFx9L2csICcnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdQcm9tcHRTdHI7XG59KTtcbmV4cG9ydHMuaGFuZGxlUHJvbXB0VmFyaWFibGVzID0gaGFuZGxlUHJvbXB0VmFyaWFibGVzO1xuLyoqXG4gKiDojrflj5YgQW5raSDljaHniYdcbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0W119IOi/lOWbnuWNoeeJh+eahOWvueixoeWIl+ihqFxuICogQHRocm93cyB75byC5bi457G75Z6LfSDlvILluLjmj4/ov7BcbiAqL1xuY29uc3QgZ2V0QW5raUNhcmRzID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIOWIpOaWreacrOWcsOaYr+WQpuWtmOacieacqui/h+acn+eahOaVsOaNrlxuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuZ2V0KHsgXCJhbmtpQ2FyZHNcIjogeyAnY2FyZHMnOiBbXSwgJ3RpbWUnOiAwIH0gfSkudGhlbigoaXRlbSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAvLyDnvJPlrZggMSDlsI/ml7ZcbiAgICAgICAgICAgIGlmIChpdGVtLmFua2lDYXJkcy5jYXJkcy5sZW5ndGggPiAwICYmIERhdGUubm93KCkgLSBpdGVtLmFua2lDYXJkcy50aW1lIDwgMzYwMCAqIDEwMDApIHtcbiAgICAgICAgICAgICAgICAvLyDoi6XmnKzlnLDmnInlj6/nlKjnmoTmlbDmja7vvIzliJnnm7TmjqXlpITnkIZcbiAgICAgICAgICAgICAgICByZXNvbHZlKGl0ZW0uYW5raUNhcmRzLmNhcmRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOiLpeacrOWcsOaXoOWPr+eUqOeahOaVsOaNru+8jOWImemAmui/hyBBbmtpXG4gICAgICAgICAgICAgICAgeWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW5raUFjdGlvbicsICdtZXNzYWdlcyc6IHsgJ2Fua2lfYWN0aW9uX3R5cGUnOiAnZmluZENhcmRzJywgJ2Fua2lfYXJndW1lbnRzJzogeyAncXVlcnknOiAnaXM6ZHVlIHByb3A6ZHVlPi0yIHByb3A6ZHVlPDMnIH0gfSwgfSkudGhlbigobWVzc2FnZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmVycm9yID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmoLnmja7ljaHniYcgSUQg5p+l6K+i5Y2h54mH5L+h5oGvXG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbmtpQWN0aW9uJywgJ21lc3NhZ2VzJzogeyAnYW5raV9hY3Rpb25fdHlwZSc6ICdjYXJkc0luZm8nLCAnYW5raV9hcmd1bWVudHMnOiB7ICdjYXJkcyc6IG1lc3NhZ2UucmVzdWx0IH0gfSwgfSkudGhlbigobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYXJkcyA9IG1lc3NhZ2UucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWwhuaVsOaNruWtmOWCqOWIsOacrOWcsO+8jOmZkOWItuacgOWkp+S/neWtmOaVsOmHj++8jOmBv+WFjeacrOWcsOWtmOWCqOepuumXtOi+vuWIsOS4iumZkFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5zZXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmtpQ2FyZHM6IHsgJ3RpbWUnOiBEYXRlLm5vdygpLCAnY2FyZHMnOiBjYXJkcy5zbGljZSgwLCAzMCkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2FyZHMuc2xpY2UoMCwgMzApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9lcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlj43ppojplJnor6/kv6Hmga9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLCAobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2Vycm9yXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn07XG5leHBvcnRzLmdldEFua2lDYXJkcyA9IGdldEFua2lDYXJkcztcbi8qKlxuICog5aSE55CG5a2X56ym5Liy77yM5a+55oyH5a6a5a2X56ym6K6+572u5qC35byP44CB54K55Ye75LqL5Lu2XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIOmcgOimgeWkhOeQhueahOWtl+espuS4slxuICogQHBhcmFtIHtzdHJpbmd9IGtleVdvcmQgLSDlvZPliY3pgInkuK3nmoTlrZfnrKZcbiAqIEByZXR1cm5zIHtzdHJpbmd9IOWkhOeQhuWQjueahCBQcm9tcHQg5a2X56ym5LiyXG4gKiBAdGhyb3dzIHvlvILluLjnsbvlnot9IOW8guW4uOaPj+i/sFxuICovXG5jb25zdCBoYW5kbGVIaWdodGxpZ2h0ID0gKHN0ciwga2V5V29yZCwgYW5raUNhcmRzLCB3aW5kb3dFbGVtZW50KSA9PiB7XG4gICAgaWYgKHN0ciA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbGV0IG5ld1N0ciA9IHN0cjtcbiAgICAvLyDlpITnkIYga2V5d29yZCDpq5jkuq5cbiAgICBuZXdTdHIgPSBuZXdTdHIucmVwbGFjZShuZXcgUmVnRXhwKGAoXnxbXipdKSgke2tleVdvcmR9KShbXipdfCQpYCwgJ2dpJyksIGZ1bmN0aW9uIChtYXRjaCwgcDEsIHAyLCBwMykge1xuICAgICAgICAvLyDlpoLmnpzlhbPplK7or43liY3lkI7msqHmnIkq77yM5YiZ5re75YqgKirvvIzlkKbliJnkv53nlZnljp/moLdcbiAgICAgICAgaWYgKHAxICE9PSAnKicgJiYgcDMgIT09ICcqJykge1xuICAgICAgICAgICAgcmV0dXJuIHAxICsgJyoqJyArIHAyICsgJyoqJyArIHAzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoOyAvLyDkuI3ov5vooYzmm7/mjaJcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIC8vIOWkhOeQhiBBbmtpIOWNleivjemrmOS6rlxuICAgIC8vIGNvbnN0IGNhcmRzID0gYW5raUNhcmRzXG4gICAgLy8gaWYgKHdpbmRvd0VsZW1lbnQgJiYgY2FyZHMpIHtcbiAgICAvLyAgICAgLy8g6YGN5Y6G5q+P5LiA5Liq5Y2h54mHXG4gICAgLy8gICAgIGNhcmRzLmZvckVhY2goKGNhcmQ6IGFueSkgPT4ge1xuICAgIC8vICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgLy8gICAgICAgICAvLyBjb25zb2xlLmxvZyhjYXJkKTtcbiAgICAvLyAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjYXJkLmZpZWxkcyk7XG4gICAgLy8gICAgICAgICBsZXQgZmlyc3RLZXkgPSBrZXlzWzBdO1xuICAgIC8vICAgICAgICAgLy8g5om+5Yiw5Y2h54mH5q2j6Z2iXG4gICAgLy8gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyAgICAgICAgICAgICBpZiAoY2FyZC5maWVsZHNba2V5c1tpXV0ub3JkZXIgPT09IDApIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgZmlyc3RLZXkgPSBrZXlzW2ldXG4gICAgLy8gICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgY29uc3QgY2FyZEZyb250VmFsdWUgPSBjYXJkLmZpZWxkc1tmaXJzdEtleV0udmFsdWVcbiAgICAvLyAgICAgICAgIGNvbnN0IGVzY2FwZWRDYXJkRnJvbnRWYWx1ZSA9IGVzY2FwZVJlZ0V4cChjYXJkRnJvbnRWYWx1ZSk7XG4gICAgLy8gICAgICAgICBpZiAoY2FyZEZyb250VmFsdWUgIT09IGtleVdvcmQpIHtcbiAgICAvLyAgICAgICAgICAgICBuZXdTdHIgPSBuZXdTdHIucmVwbGFjZShuZXcgUmVnRXhwKGVzY2FwZWRDYXJkRnJvbnRWYWx1ZSwgJ2dpJyksIGA8bWFyaz4ke2NhcmRGcm9udFZhbHVlfTwvbWFyaz5gKVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgLy8gfSwgMTApO1xuICAgIC8vICAgICAgICAgZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZzogc3RyaW5nKSB7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpOyAvLyAkJiBtZWFucyB0aGUgd2hvbGUgbWF0Y2hlZCBzdHJpbmdcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICAgIC8vIOWvueS4iui/sOWFg+e0oOa3u+WKoOeCueWHu+S6i+S7tlxuICAgIC8vICAgICAvLyBsZXQgaGlnaHRsaWdodERvbSA9IHdpbmRvd0VsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaGVsbG8nKVxuICAgIC8vICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IGhpZ2h0bGlnaHREb20ubGVuZ3RoOyBpKyspIHtcbiAgICAvLyAgICAgLy8gICAgIGhpZ2h0bGlnaHREb21baV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVIaWdodGxpZ2h0Q2xpY2spXG4gICAgLy8gICAgIC8vICAgICBoaWdodGxpZ2h0RG9tW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlSGlnaHRsaWdodENsaWNrKVxuICAgIC8vICAgICAvLyB9XG4gICAgLy8gfVxuICAgIHJldHVybiBuZXdTdHI7XG4gICAgLy8gcmV0dXJuICd0cnVlJ1xufTtcbmV4cG9ydHMuaGFuZGxlSGlnaHRsaWdodCA9IGhhbmRsZUhpZ2h0bGlnaHQ7XG4vKipcbiAqIOiOt+WPluezu+e7n+eahOm7mOiupCBQcm9tcHRcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlXb3JkIC0g5b2T5YmN6YCJ5Lit55qE5a2X56ymXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBQcm9tcHQg5a2X56ym5LiyXG4gKiBAdGhyb3dzIHvlvILluLjnsbvlnot9IOW8guW4uOaPj+i/sFxuICovXG5jb25zdCBnZXREZWZhdWx0UHJvbXB0ID0gKGtleVdvcmQsIGN1cnJlbnRMYW5ndWFnZSkgPT4ge1xuICAgIGxldCBnZXRVbnNwbGFzaEltYWdlcyA9IHRydWU7XG4gICAgbGV0IHVzZXJQcm9tcHQgPSBgXG5cbiAgICAgICAgUGxlYXNlIGhlbHAgbWUgbGVhcm4gYXMgYSBmb3JlaWduIGxhbmd1YWdlIHRlYWNoZXIuIFNlbnRlbmNlcyBpbiBleGFtcGxlcyBzaG91bGQgbm90IGJlIHRoZSBzYW1lIGFzIHRoZSBnaXZlbiBzZW50ZW5jZSwgQWJzb2x1dGVseSBObyBFeHRyYSBUZXh0LCBPbmx5IFByb3ZpZGUgSW5mb3JtYXRpb24gYXMgaW4gdGhlIEV4YW1wbGVzLCBLZWVwIExhbmd1YWdlIENvbmNpc2UuXG5cbiAgICAgICAgRXhhbXBsZe+8mlxuICAgICAgICBcbiAgICAgICAgLSAgTWVhbmluZzogPEV4cGxhaW4gdGhlIG1lYW5pbmcgdXNpbmcge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgLSAgUGFydCBvZiBTcGVlY2g6IDxJbmRpY2F0ZSB0aGUgcGFydCBvZiBzcGVlY2ggdXNpbmcge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgXG4gICAgICAgICMjIE1lYW5pbmcgaW4gdGhlIHNlbnRlbmNlXG4gICAgICAgIC0gIDxFeHBsYWluIHRoZSBtZWFuaW5nIG9mIHRoZSB3b3JkIGluIHRoZSBzZW50ZW5jZSB1c2luZyB7bmF0aXZlTGFuZ3VhZ2V9PlxuICAgICAgICBcbiAgICAgICAgIyMgRXhhbXBsZSBTZW50ZW5jZXNcbiAgICAgICAgLSAgPHt0YXJnZXRMYW5ndWFnZX0gZXhhbXBsZSBzZW50ZW5jZT4gLSA8VHJhbnNsYXRpb24gaW4ge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgLSAgPHt0YXJnZXRMYW5ndWFnZX0gZXhhbXBsZSBzZW50ZW5jZT4gLSA8VHJhbnNsYXRpb24gaW4ge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgXG4gICAgICAgICMjIFRyYW5zbGF0aW9uIEV4ZXJjaXNlXG4gICAgICAgIC0gIDx7bmF0aXZlTGFuZ3VhZ2V9IHNlbnRlbmNlPlxuICAgICAgICAtICA8e25hdGl2ZUxhbmd1YWdlfSBzZW50ZW5jZT5cbiAgICAgICAgXG4gICAgICAgIC0tLVxuICAgICAgICBcbiAgICAgICAgV29yZDp7c2VsZWN0aW9ufSwgc2VudGVuY2U6IHtzZW50ZW5jZX0sWW91IG11c3QgcmVwbHkgaW4gdGhlIHNwZWNpZmllZCBsYW5ndWFnZVxuXG4gICAgICAgIFBsZWFzZSBzdGFydCB0ZWFjaGluZzpcblxuICAgICAgICBgO1xuICAgIHN3aXRjaCAoY3VycmVudExhbmd1YWdlKSB7XG4gICAgICAgIGNhc2UgJ+eugOS9k+S4reaWhyc6XG4gICAgICAgICAgICB1c2VyUHJvbXB0ID0gYFxuICAgICAgICAgICAg5L2c5Li65LiA5ZCN5aSW6K+t5pWZ5biI77yM5oiR5biM5pyb5b6X5Yiw5L2g55qE5biu5Yqp44CC5L2g5o+Q5L6b55qE5L6L5Y+l5LiN6IO95LiO5oiR5o+Q5L6b55qE5Y+l5a2Q55u45ZCM77yM5Lil56aB5re75Yqg5Lu75L2V6aKd5aSW55qE5paH5pys77yM5Y+q5oyJ54Wn56S65L6L5Lit55qE5pa55byP57uZ5Ye65L+h5oGv77yM56Gu5L+d6K+t6KiA566A5rSB44CCXG5cbiAgICAgICAgICAgIOekuuS+i++8mlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAtICDlkKvkuYnvvJo855SoIHtuYXRpdmVMYW5ndWFnZX0g6Kej6YeK5ZCr5LmJPlxuICAgICAgICAgICAgLSAg6K+N5oCn77yaPOeUqCB7bmF0aXZlTGFuZ3VhZ2V9IOihqOaYjuivjeaApz5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgIyMg5Zyo5Y+l5Lit55qE5ZCr5LmJXG4gICAgICAgICAgICAtICA855SoIHtuYXRpdmVMYW5ndWFnZX0g6Kej6YeK5Y+l5Lit55qE6K+N5rGH5ZCr5LmJPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAjIyDnpLrkvovlj6XlrZBcbiAgICAgICAgICAgIC0gIDx7dGFyZ2V0TGFuZ3VhZ2V9IOeahOekuuS+i+WPpeWtkD4gLSA855SoIHtuYXRpdmVMYW5ndWFnZX0g57+76K+RPlxuICAgICAgICAgICAgLSAgPHt0YXJnZXRMYW5ndWFnZX0g55qE56S65L6L5Y+l5a2QPiAtIDznlKgge25hdGl2ZUxhbmd1YWdlfSDnv7vor5E+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICMjIOe/u+ivkee7g+S5oFxuICAgICAgICAgICAgLSAgPHtuYXRpdmVMYW5ndWFnZX0g5Y+l5a2QPlxuICAgICAgICAgICAgLSAgPHtuYXRpdmVMYW5ndWFnZX0g5Y+l5a2QPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAtLS1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAg5Y2V6K+N77yaXCJ7c2VsZWN0aW9ufVwi77yM5Y+l5a2Q77yaXCJ7c2VudGVuY2V9XCLvvIzkvaDlv4XpobvnlKjop4TlrprnmoTor63oqIDov5vooYzlm57lpI3jgIJcbiAgICBcbiAgICAgICAgICAgIOivt+W8gOWni+aVmeWtpu+8mlxuICAgIFxuICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICfnuYHpq5TkuK3mlocnOlxuICAgICAgICAgICAgdXNlclByb21wdCA9IGBcbiAgICAgICAgICAgIOS9nOeCuuS4gOWQjeWkluiqnuiAgeW4q++8jOaIkeW4jOacm+W+l+WIsOS9oOeahOW5q+WKqeOAguS9oOaPkOS+m+eahOS+i+WPpeS4jeaHieiIh+aIkeaPkOS+m+eahOWPpeWtkOebuOWQjO+8jOWatOemgea3u+WKoOS7u+S9lemhjeWklueahOaWh+Wtl++8jOWPquaMieeFp+evhOS+i+S4reeahOaWueW8j+e1puWHuuizh+ioiu+8jOeiuuS/neiqnuiogOewoea9lOOAglxuXG4gICAgICAgICAgICDnr4TkvovvvJpcblxuICAgICAgICAgICAgLSAg5ZCr576p77yaPOeUqCB7bmF0aXZlTGFuZ3VhZ2V9IOino+mHi+WQq+e+qT5cbiAgICAgICAgICAgIC0gIOipnuaAp++8mjznlKgge25hdGl2ZUxhbmd1YWdlfSDooajmmI7oqZ7mgKc+XG5cbiAgICAgICAgICAgICMjIOWcqOWPpeWtkOS4reeahOWQq+e+qVxuICAgICAgICAgICAgLSAgPOeUqCB7bmF0aXZlTGFuZ3VhZ2V9IOino+mHi+WPpeS4reeahOipnuW9meWQq+e+qT5cblxuICAgICAgICAgICAgIyMg56+E5L6L5Y+l5a2QXG4gICAgICAgICAgICAtICA8e3RhcmdldExhbmd1YWdlfSDnmoTnr4Tkvovlj6XlrZA+IC0gPOeUqCB7bmF0aXZlTGFuZ3VhZ2V9IOe/u+itrz5cbiAgICAgICAgICAgIC0gIDx7dGFyZ2V0TGFuZ3VhZ2V9IOeahOevhOS+i+WPpeWtkD4gLSA855SoIHtuYXRpdmVMYW5ndWFnZX0g57+76K2vPlxuXG4gICAgICAgICAgICAjIyDnv7vora/nt7Tnv5JcbiAgICAgICAgICAgIC0gIDx7bmF0aXZlTGFuZ3VhZ2V9IOWPpeWtkD5cbiAgICAgICAgICAgIC0gIDx7bmF0aXZlTGFuZ3VhZ2V9IOWPpeWtkD5cblxuICAgICAgICAgICAgLS0tXG5cbiAgICAgICAgICAgIOWtl+ipnu+8mlwie3NlbGVjdGlvbn1cIu+8jOWPpeWtkO+8mlwie3NlbnRlbmNlfVwi77yM5L2g5b+F6aCI55So6KaP5a6a55qE6Kqe6KiA6YCy6KGM5Zue6KaG44CCXG5cbiAgICAgICAgICAgIOiri+mWi+Wni+aVmeWtuO+8mlxuXG4gICAgICAgICAgICBgO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgLy8g5YWz6ZSu5a2X6ZW/5bqm6L6D6ZW/5pe277yM5oyJ54Wn5Y+l5a2Q6L+b6KGM5aSE55CGXG4gICAgaWYgKGtleVdvcmQubGVuZ3RoID4gMjApIHtcbiAgICAgICAgZ2V0VW5zcGxhc2hJbWFnZXMgPSBmYWxzZTtcbiAgICAgICAgdXNlclByb21wdCA9IGBcbiAgICAgIFxuICAgICAgICAgICAgQXMgYSBsYW5ndWFnZSB0ZWFjaGVyLCBJIHdpbGwgcHJvdmlkZSBhbiBleHBsYW5hdGlvbiBvZiB0aGUgZ3JhbW1hciBrbm93bGVkZ2UgaW4gdGhlIGdpdmVuIHNlbnRlbmNlLCBBYnNvbHV0ZWx5IE5vIEV4dHJhIFRleHQsIE9ubHkgUHJvdmlkZSBJbmZvcm1hdGlvbiBhcyBpbiB0aGUgRXhhbXBsZXMsIEtlZXAgTGFuZ3VhZ2UgQ29uY2lzZS5cblxuICAgICAgICAgICAgRXhhbXBsZTpcblxuICAgICAgICAgICAgIyMgVHJhbnNsYXRpb25cbiAgICAgICAgICAgIDxUcmFuc2xhdGUgdG8ge25hdGl2ZUxhbmd1YWdlfT5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgIyMgR3JhbW1hclxuICAgICAgICAgICAgPC0gUG9pbnQ6IEV4cGxhaW4gaW4ge25hdGl2ZUxhbmd1YWdlfT5cblxuICAgICAgICAgICAgIyMgRXhhbXBsZXMgb2YgcmVsYXRlZCBncmFtbWFyXG4gICAgICAgICAgICAtICA8e3RhcmdldExhbmd1YWdlfSBleGFtcGxlIHNlbnRlbmNlPiAtIDxUcmFuc2xhdGlvbiBpbiB7bmF0aXZlTGFuZ3VhZ2V9PlxuICAgICAgICAgICAgLSAgPHt0YXJnZXRMYW5ndWFnZX0gZXhhbXBsZSBzZW50ZW5jZT4gLSA8VHJhbnNsYXRpb24gaW4ge25hdGl2ZUxhbmd1YWdlfT5cblxuICAgICAgICAgICAgLS0tXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFNlbnRlbmNlOiB7c2VsZWN0aW9ufVxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBgO1xuICAgICAgICBzd2l0Y2ggKGN1cnJlbnRMYW5ndWFnZSkge1xuICAgICAgICAgICAgY2FzZSAn566A5L2T5Lit5paHJzpcbiAgICAgICAgICAgICAgICB1c2VyUHJvbXB0ID0gYFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIOivt+S9oOS9nOS4uuS4gOWQjeWkluivreaVmeW4iOWvuee7meWumuWPpeWtkOS4reeahOivreazleefpeivhui/m+ihjOino+mHiu+8jOe7neWvueS4jeiDveacieS7u+S9lemineWklueahOaWh+acrO+8jOWPquaMieeFp+ekuuS+i+aPkOS+m+S/oeaBr++8jOS/neaMgeivreiogOeugOa0geOAglxuXG4gICAgICAgICAgICAgICAg56S65L6L77yaXG5cbiAgICAgICAgICAgICAgICAjIyDnv7vor5FcbiAgICAgICAgICAgICAgICA857+76K+R5oiQe25hdGl2ZUxhbmd1YWdlfT5cblxuICAgICAgICAgICAgICAgICMjIOivreazlVxuICAgICAgICAgICAgICAgIDwtIOeCue+8mueUqHtuYXRpdmVMYW5ndWFnZX3op6Pph4o+XG5cbiAgICAgICAgICAgICAgICAjIyDnm7jlhbPor63ms5XnpLrkvotcbiAgICAgICAgICAgICAgICAtICAgPHt0YXJnZXRMYW5ndWFnZX3nmoTnpLrkvovlj6XlrZA+IC0gPOeUqHtuYXRpdmVMYW5ndWFnZX3nv7vor5E+XG4gICAgICAgICAgICAgICAgLSAgIDx7dGFyZ2V0TGFuZ3VhZ2V955qE56S65L6L5Y+l5a2QPiAtIDznlKh7bmF0aXZlTGFuZ3VhZ2V957+76K+RPlxuXG4gICAgICAgICAgICAgICAgLS0tXG5cbiAgICAgICAgICAgICAgICDlj6XlrZDvvJrigJ17c2VsZWN0aW9ufeKAnFxuXG4gICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ+e5gemrlOS4reaWhyc6XG4gICAgICAgICAgICAgICAgdXNlclByb21wdCA9IGBcbiAgICAgICAgICAgICAgICDoq4vkvaDkvZzngrrkuIDlkI3lpJboqp7mlZnluKvlsI3ntablrprlj6XlrZDkuK3nmoToqp7ms5Xnn6XorZjpgLLooYzop6Pph4vvvIzntZXlsI3kuI3og73mnInku7vkvZXpoY3lpJbnmoTmlofmnKzvvIzlj6rmjInnhafnr4Tkvovmj5Dkvpvos4foqIrvvIzkv53mjIHoqp7oqIDnsKHmvZTjgIJcblxuICAgICAgICAgICAgICAgIOevhOS+i++8mlxuXG4gICAgICAgICAgICAgICAgIyMg57+76K2vXG4gICAgICAgICAgICAgICAgPOe/u+itr+aIkHtuYXRpdmVMYW5ndWFnZX0+XG5cbiAgICAgICAgICAgICAgICAjIyDoqp7ms5VcbiAgICAgICAgICAgICAgICA8LSDpu57vvJrnlKh7bmF0aXZlTGFuZ3VhZ2V96Kej6YeLPlxuXG4gICAgICAgICAgICAgICAgIyMg55u46Zec6Kqe5rOV56+E5L6LXG4gICAgICAgICAgICAgICAgLSAgIDx7dGFyZ2V0TGFuZ3VhZ2V955qE56+E5L6L5Y+l5a2QPiAtIDznlKh7bmF0aXZlTGFuZ3VhZ2V957+76K2vPlxuICAgICAgICAgICAgICAgIC0gICA8e3RhcmdldExhbmd1YWdlfeeahOevhOS+i+WPpeWtkD4gLSA855Soe25hdGl2ZUxhbmd1YWdlfee/u+itrz5cblxuICAgICAgICAgICAgICAgIC0tLVxuXG4gICAgICAgICAgICAgICAg5Y+l5a2Q77yaXCJ7c2VsZWN0aW9ufVwiXG5cbiAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBkZWZhdWx0UHJvbXB0ID0ge1xuICAgICAgICAndGl0bGUnOiAnRGVmYXVsdCcsICdnZXRVbnNwbGFzaEltYWdlcyc6IGdldFVuc3BsYXNoSW1hZ2VzLCAndXNlclByb21wdCc6IHVzZXJQcm9tcHQsXG4gICAgICAgICdpZCc6ICdEZWZhdWx0J1xuICAgIH07XG4gICAgcmV0dXJuIGRlZmF1bHRQcm9tcHQ7XG59O1xuZXhwb3J0cy5nZXREZWZhdWx0UHJvbXB0ID0gZ2V0RGVmYXVsdFByb21wdDtcbmNvbnN0IGdldEluaXRpYWxQcm9tcHQgPSAoa2V5V29yZCwgY3VycmVudExhbmd1YWdlKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAvL+WIpOaWreeUqOaIt+aYr+WQpuiuvue9ruS6hiBBUEkgS2V577yM5pyq6K6+572u5YiZ6buY6K6k5L2/55So5Zyo57q/6K+N5YW4XG4gICAgY29uc3QgaXNTZXRLZXkgPSB5aWVsZCAoMCwgdXRpbF8xLmdldFNldHRpbmdzKSgpLnRoZW4oKGl0ZW1zKSA9PiB7XG4gICAgICAgIGlmIChpdGVtcy5hcGlLZXlTZWxlY3Rpb24gPT09ICdsaWNlbnNlS2V5JyAmJiBpdGVtcy5saWNlbnNlS2V5Lmxlbmd0aCA8IDUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpdGVtcy5hcGlLZXlTZWxlY3Rpb24gPT09ICdteU93bk9wZW5BaUtleScgJiYgaXRlbXMub3BlbkFwaUtleS5sZW5ndGggPCA1KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChpc1NldEtleSkge1xuICAgICAgICBjb25zdCBkZWZhdWx0UHJvbXB0ID0gKDAsIGV4cG9ydHMuZ2V0RGVmYXVsdFByb21wdCkoa2V5V29yZCwgY3VycmVudExhbmd1YWdlKTtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRQcm9tcHQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyDmsqHmnInorr7nva4gQXBpIEtleVxuICAgICAgICByZXR1cm4gZXhwb3J0cy5kaWN0aW9uYXJ5UHJvbXB0O1xuICAgIH1cbn0pO1xuZXhwb3J0cy5nZXRJbml0aWFsUHJvbXB0ID0gZ2V0SW5pdGlhbFByb21wdDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNob3J0Y3V0QnV0dG9uID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3Qgc3R5bGVkX2NvbXBvbmVudHNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwic3R5bGVkLWNvbXBvbmVudHNcIikpO1xuY29uc3QgcmVhY3RfaWNvbnNfMSA9IHJlcXVpcmUoXCJAcmFkaXgtdWkvcmVhY3QtaWNvbnNcIik7XG5jb25zdCBTY291dGVyQnV0dG9uID0gc3R5bGVkX2NvbXBvbmVudHNfMS5kZWZhdWx0LmJ1dHRvbiBgXG4gICAgXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICBwYWRkaW5nOiA0cHggOHB4O1xuXG4gICAgJjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGNkY2RjY7XG4gICAgfVxuXG5gO1xuY29uc3QgU2NvdXRlckJ1dHRvbkJveCA9IHN0eWxlZF9jb21wb25lbnRzXzEuZGVmYXVsdC5kaXYgYFxuXG5mb250LWZhbWlseTogc2Fucy1zZXJpZjtcbmJhY2tncm91bmQtY29sb3I6ICNmZmY7XG5jb2xvcjogcmdiKDAgMCAwIC8gODAlKTtcbmhlaWdodDozMnB4O1xuXG5mb250LXNpemU6MTRweDtcblxuZGlzcGxheTogZmxleDtcbmZsZXgtZGlyZWN0aW9uOiByb3c7XG5hbGlnbi1pdGVtczogY2VudGVyO1xuXG5wb3NpdGlvbjogYWJzb2x1dGU7XG50b3A6ICR7cHJvcHMgPT4gcHJvcHMudG9wfXB4O1xubGVmdDogJHtwcm9wcyA9PiBwcm9wcy5sZWZ0fXB4O1xuei1pbmRleDogOTk5O1xuXG5ib3gtc2hhZG93OiAwcHggOHB4IDI4cHggcmdiYSgwLDAsMCwuMTYpO1xuYm9yZGVyLXJhZGl1czogNHB4O1xuYm9yZGVyOjFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNilcblxuYDtcbmZ1bmN0aW9uIFNob3J0Y3V0QnV0dG9uKHByb3BzKSB7XG4gICAgLy8gLy8g6K6+572u5Yid5aeL5Z2Q5qCH5Li6ICgwLCAwKVxuICAgIGNvbnN0IFtwb3NpdGlvbiwgc2V0UG9zaXRpb25dID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHsgeDogMCwgeTogMCB9KTtcbiAgICBjb25zdCBidXR0b25SZWYgPSAoMCwgcmVhY3RfMS51c2VSZWYpKG51bGwpO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAvL+iuvue9ruaMiemSruS9jee9rlxuICAgICAgICBsZXQgbGVmdCA9IHByb3BzLnBvc2l0aW9uLng7XG4gICAgICAgIGxldCB0b3AgPSBwcm9wcy5wb3NpdGlvbi55O1xuICAgICAgICBpZiAoYnV0dG9uUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbldpZHRoID0gYnV0dG9uUmVmLmN1cnJlbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICBjb25zdCBidXR0b25IZWlnaHQgPSBidXR0b25SZWYuY3VycmVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAvLyDlpoLmnpzotoXlh7rlj7PkvqfovrnnlYzvvIzlkJHlt6bosIPmlbRcbiAgICAgICAgICAgIGlmIChsZWZ0ICsgYnV0dG9uV2lkdGggPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xuICAgICAgICAgICAgICAgIGxlZnQgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIGJ1dHRvbldpZHRoIC0gMTA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAvLyDlpoLmnpzotoXlh7rlupXpg6jovrnnlYzvvIzlkJHkuIrosIPmlbRcbiAgICAgICAgICAgIC8vIGlmICh0b3AgKyBidXR0b25IZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgICAgIC8vICAgICB0b3AgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSBidXR0b25IZWlnaHQ7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICAgICAgc2V0UG9zaXRpb24oeyB4OiBsZWZ0LCB5OiB0b3AgfSk7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoU2NvdXRlckJ1dHRvbkJveCwgeyByZWY6IGJ1dHRvblJlZiwgbGVmdDogcG9zaXRpb24ueCwgdG9wOiBwb3NpdGlvbi55IH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4JyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdycsXG4gICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFNjb3V0ZXJCdXR0b24sIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAvLyBtYXJnaW5SaWdodDogJzRweCdcbiAgICAgICAgICAgICAgICB9LCBjbGFzc05hbWU6IFwiU2hvcnRjdXRCdXR0b25cIiwgb25DbGljazogKCkgPT4gcHJvcHMuaGFuZGxlU2hvcnRjdXRCdXR0b25DbGljayh0cnVlKSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ljb25zXzEuUGFwZXJQbGFuZUljb24sIHsgc3R5bGU6IHsgbWFyZ2luUmlnaHQ6ICc0cHgnIH0gfSksXG4gICAgICAgICAgICAgICAgXCJSdW5cIiksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChTY291dGVyQnV0dG9uLCB7IGNsYXNzTmFtZTogXCJTaG9ydGN1dEJ1dHRvblwiLCBvbkNsaWNrOiAoKSA9PiBwcm9wcy5oYW5kbGVTaG9ydGN1dEJ1dHRvbkNsaWNrKGZhbHNlKSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ljb25zXzEuT3BlbkluTmV3V2luZG93SWNvbiwgeyBzdHlsZTogeyBtYXJnaW5SaWdodDogJzRweCcgfSB9KSxcbiAgICAgICAgICAgICAgICBcIiBPcGVuXCIpKSkpO1xufVxuZXhwb3J0cy5TaG9ydGN1dEJ1dHRvbiA9IFNob3J0Y3V0QnV0dG9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Ub29sQmFyID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IHN0eWxlZF9jb21wb25lbnRzXzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInN0eWxlZC1jb21wb25lbnRzXCIpKTtcbmNvbnN0IGFudGRfMiA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgdXNlckluZm9fMSA9IHJlcXVpcmUoXCIuLi9saWIvdXNlckluZm9cIik7XG5jb25zdCBpbmRleF8xID0gcmVxdWlyZShcIi4vaW5kZXhcIik7XG5jb25zdCBsYW5nXzEgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG5jb25zdCBsYW5nXzIgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbmNvbnN0IHV0aWxfMiA9IHJlcXVpcmUoXCIuLi9Qb3B1cENhcmQvdXRpbFwiKTtcbmNvbnN0IGxvY2FsZV8xID0gcmVxdWlyZShcIi4uL2xpYi9sb2NhbGVcIik7XG5jb25zdCBpY29uc18xID0gcmVxdWlyZShcIkBhbnQtZGVzaWduL2ljb25zXCIpO1xuY29uc3QgU3R5bGVkQnV0dG9uID0gc3R5bGVkX2NvbXBvbmVudHNfMS5kZWZhdWx0LmJ1dHRvbiBgXG4gICAgICBcbiAgICAgIHdpZHRoOiAxOHB4O1xuICAgICAgaGVpZ2h0OiAxOHB4O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgcGFkZGluZzogMnB4O1xuICAgICAgXG4gIFxuICAgICAgJjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDU5LDAuMDUxKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgfVxuICBcbiAgICAgICR7cHJvcHMgPT4gcHJvcHMuJGRpc2FibGUgJiYgKDAsIHN0eWxlZF9jb21wb25lbnRzXzEuY3NzKSBgXG4gICAgICAgIG9wYWNpdHk6IDAuNTtcbiAgICAgICAgY3Vyc29yOiBoZWxwO1xuICAgICAgYH1cbiAgXG4gICAgICAvLyAke3Byb3BzID0+ICFwcm9wcy4kZGlzYWJsZSAmJiAoMCwgc3R5bGVkX2NvbXBvbmVudHNfMS5jc3MpIGBcbiAgICAgIC8vICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgLy8gYH1cbiAgXG4gIFxuICBgO1xuY29uc3QgSWNvbkJ1dHRvbiA9IHN0eWxlZF9jb21wb25lbnRzXzEuZGVmYXVsdC5idXR0b24gYFxuICAgICAgXG4gICAgICB3aWR0aDogMTZweDtcbiAgICAgIGhlaWdodDogMTZweDtcbiAgICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gIFxuICAgICAgJjpob3ZlciB7XG4gICAgICAgIG9wYWNpdHk6IDAuODtcbiAgICAgIH1cbiAgYDtcbmZ1bmN0aW9uIFRvb2xCYXIocHJvcHMpIHtcbiAgICBjb25zdCBbc2hvd01lbnUsIHNldFNob3dNZW51XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh0cnVlKTtcbiAgICBjb25zdCBbc2hvd1Byb21wdHNNZW51LCBzZXRTaG93UHJvbXB0c01lbnVdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBDb250ZXh0Qm94ID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICBjb25zdCBbcHJvbXB0cywgc2V0UHJvbXB0c10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoW10pO1xuICAgIGNvbnN0IFtleGVjdXRlZFByb21wdEhpc3RvcnlJblRvb2xCYXIsIHNldEV4ZWN1dGVkUHJvbXB0SGlzdG9yeUluVG9vbEJhcl0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoW10pO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gKDAsIHVzZXJJbmZvXzEudXNlVXNlckluZm9Db250ZXh0KSgpO1xuICAgIC8vIGxldCBwb3J0RnJvbU1lbnU6IGFueVxuICAgIC8vIOiOt+WPluWMheWQqyBzaGFkb3cgRE9NIOeahOWFg+e0oFxuICAgIGNvbnN0IHNoYWRvd0hvc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjX19qaWFuZy1zY291dGVyJyk7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHNoYWRvd0hvc3QgPT09IG51bGwgfHwgc2hhZG93SG9zdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hhZG93SG9zdC5zaGFkb3dSb290O1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHNoYWRvd1Jvb3QgPT09IG51bGwgfHwgc2hhZG93Um9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcuY29udGFpbmVyJyk7XG4gICAgbGV0IExhbmcgPSAoMCwgbG9jYWxlXzEudXNlQ3VycmVudExhbmd1YWdlKSgpO1xuICAgIGNvbnN0IGN1cnJlbnRMYW5ndWFnZSA9IExhbmdbJ2N1cnJlbnQnXVsnbmFtZSddO1xuICAgIGNvbnN0IGRlZmF1bHRQcm9tcHQgPSAoMCwgdXRpbF8yLmdldERlZmF1bHRQcm9tcHQpKHByb3BzLnNlbGVjdGVkVGV4dFN0cmluZywgY3VycmVudExhbmd1YWdlKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgKCgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGxldCBwcm9tcHRMaXN0ID0geWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuZ2V0KHsgXCJwcm9tcHRMaXN0XCI6IFtdIH0pLnRoZW4oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5wcm9tcHRMaXN0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwcm9tcHRMaXN0LnVuc2hpZnQodXRpbF8yLmRpY3Rpb25hcnlQcm9tcHQpO1xuICAgICAgICAgICAgcHJvbXB0TGlzdC51bnNoaWZ0KGRlZmF1bHRQcm9tcHQpO1xuICAgICAgICAgICAgc2V0UHJvbXB0cyhwcm9tcHRMaXN0KTtcbiAgICAgICAgfSkpKCk7XG4gICAgICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRleHRCb3ggPSBDb250ZXh0Qm94LmN1cnJlbnQ7XG4gICAgICAgICAgICBjb25zdCBwb3B1cENhcmQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignI0xlYXJuaW5nRW5nbGlzaDIwMjMnKTtcbiAgICAgICAgICAgIGNvbnN0IFBvcHVwQ2FyZENvbnRhaW5lciA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGluZGV4XzEuQ09OVEFJTkVSX0NMQVNTTkFNRSlbMF07XG4gICAgICAgICAgICBjb25zdCBzY291dGVyQ29udGVudEJveCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc2NvdXRlckNvbnRlbnRCb3gnKTtcbiAgICAgICAgICAgIC8v6K6+572u5oyJ6ZKu55qE5L2N572uXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRYID0gcHJvcHMuc2VsZWN0ZWRUZXh0Lng7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRZID0gcHJvcHMuc2VsZWN0ZWRUZXh0Lnk7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRXaWR0aCA9IHByb3BzLnNlbGVjdGVkVGV4dC53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dEhlaWdodCA9IHByb3BzLnNlbGVjdGVkVGV4dC5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBidXR0b25YID0gKGNvbnRleHRCb3ggPT09IG51bGwgfHwgY29udGV4dEJveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29udGV4dEJveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS54KSB8fCAwO1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uWSA9IChjb250ZXh0Qm94ID09PSBudWxsIHx8IGNvbnRleHRCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRleHRCb3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueSkgfHwgMDtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbldpZHRoID0gKGNvbnRleHRCb3ggPT09IG51bGwgfHwgY29udGV4dEJveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29udGV4dEJveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkgfHwgMDtcbiAgICAgICAgICAgIC8vIOmAieS4reaWh+Wtl+ebuOWvueeql+WPo+eahOWBj+enu1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0VG9wID0gcG9wdXBDYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnkgLSBzZWxlY3RlZFRleHRZID4gLTcwID8gMzAgOiAwO1xuICAgICAgICAgICAgLy8g5pyA5aSnIFgg5YC8XG4gICAgICAgICAgICBjb25zdCBtYXhYID0gKChwb3B1cENhcmQgPT09IG51bGwgfHwgcG9wdXBDYXJkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwb3B1cENhcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpIHx8IDApIC0gYnV0dG9uV2lkdGggLSAxMDtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VCb3hIZWlnaHQgPSBzY291dGVyQ29udGVudEJveCA9PT0gbnVsbCB8fCBzY291dGVyQ29udGVudEJveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2NvdXRlckNvbnRlbnRCb3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyQm94SGVpZ2h0ID0gUG9wdXBDYXJkQ29udGFpbmVyID09PSBudWxsIHx8IFBvcHVwQ2FyZENvbnRhaW5lciA9PT0gdm9pZCAwID8gdm9pZCAwIDogUG9wdXBDYXJkQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IG1lc3NhZ2VCb3hIZWlnaHQgPiBjb250YWluZXJCb3hIZWlnaHQgPyBtZXNzYWdlQm94SGVpZ2h0IC0gNSA6IGNvbnRhaW5lckJveEhlaWdodCAtIDQ7XG4gICAgICAgICAgICBjb25zdCBtaW5ZID0gMCAtIGhlaWdodCArIG9mZnNldFRvcDtcbiAgICAgICAgICAgIGxldCBsZWZ0ID0gc2VsZWN0ZWRUZXh0WCAtIGJ1dHRvblggKyBzZWxlY3RlZFRleHRXaWR0aCAtIDYwO1xuICAgICAgICAgICAgLy8gbGVmdCA9IGxlZnQgPiBtYXhYID8gbWF4WCA6IGxlZnRcbiAgICAgICAgICAgIGxlZnQgPSBNYXRoLm1heCgxMCwgTWF0aC5taW4obWF4WCwgbGVmdCkpO1xuICAgICAgICAgICAgbGV0IHRvcCA9IHNlbGVjdGVkVGV4dFkgLSBidXR0b25ZIC0gNDA7XG4gICAgICAgICAgICAvLyB0b3AgPSB0b3AgPCBtaW5ZID8gbWluWSA6IHRvcFxuICAgICAgICAgICAgdG9wID0gTWF0aC5tYXgobWluWSwgTWF0aC5taW4oODAsIHRvcCkpO1xuICAgICAgICAgICAgLy8gY29udGV4dEJveDIhLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xuICAgICAgICAgICAgLy8gY29udGV4dEJveCEuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgICAgICAgICBjb250ZXh0Qm94LnN0eWxlLmxlZnQgPSBsZWZ0LnRvU3RyaW5nKCkgKyAncHgnO1xuICAgICAgICAgICAgY29udGV4dEJveC5zdHlsZS50b3AgPSB0b3AudG9TdHJpbmcoKSArICdweCc7XG4gICAgICAgICAgICBzZXRTaG93TWVudSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sIFtdKTtcbiAgICBjb25zdCBoYW5kbGVTZXRBbmtpU3BhY2VCdXR0b25DbGljayA9IChldmVudCwgaXNBZGROZXcpID0+IHtcbiAgICAgICAgc2V0QW5raVNwYWNlKHByb3BzLnJhbmdlLCBwcm9wcy5zZWxlY3RlZFRleHRTdHJpbmcsIGV2ZW50LCBpc0FkZE5ldyk7XG4gICAgICAgIC8vIENvbnRleHRCb3guY3VycmVudCEucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQoQ29udGV4dEJveC5jdXJyZW50ISlcbiAgICAgICAgc2V0U2hvd01lbnUoZmFsc2UpO1xuICAgIH07XG4gICAgY29uc3Qgc2V0QW5raVNwYWNlID0gKHJhbmdlLCBzZWxlY3RlZFRleHQsIGV2ZW50LCBpc0FkZE5ldykgPT4ge1xuICAgICAgICBsZXQgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgY29uc3QgYW5raVNwYWNlID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Fua2lTcGFjZScpO1xuICAgICAgICAvLyDojrflj5blvZPliY3mnIDlpKfnmoQgaW5kZXhcbiAgICAgICAgbGV0IG1heEluZGV4ID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbmtpU3BhY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRoaXNJbmRleCA9IE51bWJlcihhbmtpU3BhY2VbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykpO1xuICAgICAgICAgICAgaWYgKHRoaXNJbmRleCA+IG1heEluZGV4KSB7XG4gICAgICAgICAgICAgICAgbWF4SW5kZXggPSB0aGlzSW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG51bWJlciA9IG1heEluZGV4ID09PSAwID8gMSA6IG1heEluZGV4O1xuICAgICAgICBpZiAoaXNBZGROZXcpIHtcbiAgICAgICAgICAgIG51bWJlciA9IG1heEluZGV4ICsgMTtcbiAgICAgICAgfVxuICAgICAgICBzcGFuLnRleHRDb250ZW50ID0gJ3t7YycgKyBudW1iZXIgKyAnOjonICsgc2VsZWN0ZWRUZXh0ICsgJ319JztcbiAgICAgICAgc3Bhbi5jbGFzc05hbWUgPSAnYW5raVNwYWNlJztcbiAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBudW1iZXIudG9TdHJpbmcoKSk7XG4gICAgICAgIHNwYW4ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIC8vIOaBouWkjeS4uum7mOiupOagt+W8j1xuICAgICAgICAgICAgLy8gc3Bhbi5pbm5lclRleHRcbiAgICAgICAgICAgIGlmIChzcGFuLnRleHRDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gbGV0IG9sZFRleHQgPSBzcGFuLnRleHRDb250ZW50XG4gICAgICAgICAgICAgICAgLy8gb2xkVGV4dCA9IG9sZFRleHQucmVwbGFjZSgne3tjMTo6JywgJycpXG4gICAgICAgICAgICAgICAgLy8gb2xkVGV4dCA9IG9sZFRleHQucmVwbGFjZSgnfX0nLCAnJylcbiAgICAgICAgICAgICAgICB2YXIgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzZWxlY3RlZFRleHQpO1xuICAgICAgICAgICAgICAgIChfYSA9IHNwYW4ucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlcGxhY2VDaGlsZCh0ZXh0Tm9kZSwgc3Bhbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJhbmdlID09PSBudWxsIHx8IHJhbmdlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYW5nZS5kZWxldGVDb250ZW50cygpO1xuICAgICAgICByYW5nZSA9PT0gbnVsbCB8fCByYW5nZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmFuZ2UuaW5zZXJ0Tm9kZShzcGFuKTtcbiAgICB9O1xuICAgIGNvbnN0IGV4ZWN1dGl2ZVByb21wdCA9IChwcm9tcHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6ICdVUERBVEVfUE9QVVBfQ0FSRCcsIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICBwcm9tcHQ6IHByb21wdCxcbiAgICAgICAgICAgICAgICBmb2xsb3dVcERhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAga2V5V29yZDogcHJvcHMuc2VsZWN0ZWRUZXh0U3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBzZW50ZW5jZTogcHJvcHMuc2VsZWN0ZWRTZW50ZW5jZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNldFNob3dNZW51KGZhbHNlKTtcbiAgICB9KTtcbiAgICBjb25zdCBoYW5kbGVNZW51Q2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9tcHRJZCA9IGUua2V5O1xuICAgICAgICBjb25zdCBwcm9tcHQgPSBwcm9tcHRzLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IHByb21wdElkKTtcbiAgICAgICAgaWYgKHByb21wdCkge1xuICAgICAgICAgICAgZXhlY3V0aXZlUHJvbXB0KHByb21wdCk7XG4gICAgICAgICAgICAvL+iusOW9leWOhuWPsuiusOW9lVxuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLnNldCh7XG4gICAgICAgICAgICAgICAgZXhlY3V0ZWRQcm9tcHRIaXN0b3J5SW5Ub29sQmFyOiBbcHJvbXB0XVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxldCBpdGVtcyA9IFtdO1xuICAgIGl0ZW1zID0gcHJvbXB0cy5tYXAoaXRlbSA9PiB7IHJldHVybiB7ICdrZXknOiBpdGVtLmlkLCAnbGFiZWwnOiBpdGVtLnRpdGxlIH07IH0pO1xuICAgIGNvbnN0IG1lbnVQcm9wcyA9IHtcbiAgICAgICAgaXRlbXMsXG4gICAgICAgIG9uQ2xpY2s6IGhhbmRsZU1lbnVDbGljayxcbiAgICB9O1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzIuQ29uZmlnUHJvdmlkZXIsIHsgdGhlbWU6IHtcbiAgICAgICAgICAgICAgICB0b2tlbjoge1xuICAgICAgICAgICAgICAgICAgICBjb2xvclByaW1hcnk6ICcjRjA4QTI0JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSB9LCBzaG93TWVudSAmJiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHJlZjogQ29udGV4dEJveCwgY2xhc3NOYW1lOiAnY29udGV4dEJveCcsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwicm93XCIsXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiBcIjhweFwiLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJSaWdodDogXCIxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMTIpXCIsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogXCIxOHB4XCJcbiAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlRvb2x0aXAsIHsgcGxhY2VtZW50OiBcImJvdHRvbVwiLCB0aXRsZTogJ0Nsb3plIGRlbGV0aW9uKHNhbWUgY2FyZCknLCBhcnJvdzogZmFsc2UgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoU3R5bGVkQnV0dG9uLCB7IHN0eWxlOiB7IG1hcmdpblJpZ2h0OiAnMTBweCcgfSwgb25DbGljazogKCkgPT4gaGFuZGxlU2V0QW5raVNwYWNlQnV0dG9uQ2xpY2soZXZlbnQsIGZhbHNlKSB9LCBcIlsuLi5dXCIpKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuVG9vbHRpcCwgeyBwbGFjZW1lbnQ6IFwiYm90dG9tXCIsIHRpdGxlOiAnQ2xvemUgZGVsZXRpb24obmV3IGNhcmQpJywgYXJyb3c6IGZhbHNlIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFN0eWxlZEJ1dHRvbiwgeyBvbkNsaWNrOiAoKSA9PiBoYW5kbGVTZXRBbmtpU3BhY2VCdXR0b25DbGljayhldmVudCwgdHJ1ZSkgfSwgXCJbLi4uXStcIikpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlRvb2x0aXAsIHsgcGxhY2VtZW50OiBcImJvdHRvbVwiLCB0aXRsZTogJ1Byb251bmNpYXRpb24o4pqhUHJvKScsIGFycm93OiBmYWxzZSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChTdHlsZWRCdXR0b24sIHsgXCIkZGlzYWJsZVwiOiAodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpID8gZmFsc2UgOiB0cnVlLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogJzEwcHgnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxhbmcgPSB5aWVsZCAoMCwgbGFuZ18xLmZldGNoY3VycmVudExhbmd1YWdlKSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFuZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0TGFuZ3VhZ2UgPSBsYW5nWyd0YXJnZXQnXVsnaWQnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgwLCB1dGlsXzEucGxheVRleHRUb1NwZWVjaCkocHJvcHMuc2VsZWN0ZWRUZXh0U3RyaW5nLCBsYW5nXzIubGFuZ3VhZ2VDb2Rlc1t0YXJnZXRMYW5ndWFnZV0sIHRhcmdldExhbmd1YWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dNZW51KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxlcnQoJyBZb3UgYXJlIG5vdCBQcm8nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkN1c3RvbWVyU2VydmljZU91dGxpbmVkLCBudWxsKSkpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Ub29sdGlwLCB7IHBsYWNlbWVudDogXCJib3R0b21cIiwgdGl0bGU6ICdQcm9tcHQo4pqhUHJvKScsIGFycm93OiBmYWxzZSwgb3Blbjogc2hvd1Byb21wdHNNZW51IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgb25Nb3VzZUVudGVyOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnVzZXIudmVyaWZpZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dQcm9tcHRzTWVudSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBvbk1vdXNlTGVhdmU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udXNlci52ZXJpZmllZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd1Byb21wdHNNZW51KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzIuRHJvcGRvd24uQnV0dG9uLCB7IHNpemU6IFwic21hbGxcIiwgb3ZlcmxheVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAnMTgwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGdldFBvcHVwQ29udGFpbmVyOiAoKSA9PiBDb250ZXh0Qm94LmN1cnJlbnQsIGRpc2FibGVkOiAhKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby51c2VyLnZlcmlmaWVkKSwgbWVudTogbWVudVByb3BzLCBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWN1dGl2ZVByb21wdChwcm9wcy5leGVjdXRlZFByb21wdEhpc3RvcnlJblRvb2xCYXJbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgcHJvcHMuZXhlY3V0ZWRQcm9tcHRIaXN0b3J5SW5Ub29sQmFyLmxlbmd0aCA+IDAgJiYgKHByb3BzLmV4ZWN1dGVkUHJvbXB0SGlzdG9yeUluVG9vbEJhclswXS50aXRsZS5sZW5ndGggPiAxMCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuZXhlY3V0ZWRQcm9tcHRIaXN0b3J5SW5Ub29sQmFyWzBdLnRpdGxlLnN1YnN0cmluZygwLCAxMCkgKyAnLi4uJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuZXhlY3V0ZWRQcm9tcHRIaXN0b3J5SW5Ub29sQmFyWzBdLnRpdGxlKSkpKSkpKSkpO1xufVxuZXhwb3J0cy5Ub29sQmFyID0gVG9vbEJhcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldFNlbGVjdGlvbiA9IGV4cG9ydHMuc2V0RG9ub3RDbG9zZVBvcHVwQ2FyZCA9IGV4cG9ydHMucGluUG9wdXBDYXJkID0gZXhwb3J0cy5DT05UQUlORVJfQ0xBU1NOQU1FID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCByZWFjdF9kb21fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3QtZG9tXCIpKTtcbmNvbnN0IFBvcHVwQ2FyZF8xID0gcmVxdWlyZShcIi4uL1BvcHVwQ2FyZFwiKTtcbmNvbnN0IGNzc2luanNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9jc3NpbmpzXCIpO1xuY29uc3Qgc3R5bGVkX2NvbXBvbmVudHNfMSA9IHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi9Qb3B1cENhcmQvdXRpbFwiKTtcbmNvbnN0IGxhbmdfMSA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbmNvbnN0IGxvY2FsZV8xID0gcmVxdWlyZShcIi4uL2xpYi9sb2NhbGVcIik7XG5jb25zdCB1c2VySW5mb18xID0gcmVxdWlyZShcIi4uL2xpYi91c2VySW5mb1wiKTtcbmNvbnN0IFRvb2xCYXJfMSA9IHJlcXVpcmUoXCIuL1Rvb2xCYXJcIik7XG5jb25zdCB1dGlsXzIgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbmNvbnN0IHN0eWxlXzEgPSByZXF1aXJlKFwiLi4vUG9wdXBDYXJkL3N0eWxlXCIpO1xuY29uc3QgU2hvcnRjdXRCdXR0b25fMSA9IHJlcXVpcmUoXCIuL1Nob3J0Y3V0QnV0dG9uXCIpO1xuY29uc3QgaXNGaXJlZm94ID0gdHlwZW9mIEluc3RhbGxUcmlnZ2VyICE9PSAndW5kZWZpbmVkJztcbi8vIOWuueWZqOexu+ebrlxuZXhwb3J0cy5DT05UQUlORVJfQ0xBU1NOQU1FID0gJ2NvbnRhaW5lcic7XG5jb25zdCBTSE9SVENVVF9CVVRUT05fQ0xBU1NOQU1FID0gJ1Nob3J0Y3V0QnV0dG9uQ29udGFpbmVyJztcbi8vIOiusOW9leW9k+WJjeeql+WPo+aYr+WQpiBQaW4g5L2PXG5sZXQgaXNQaW4gPSBmYWxzZTtcbi8vIOiuvue9ruW9k+WJjeeql+WPo+aYr+WQpuWFgeiuuOWFs+mXrVxubGV0IGRvbm90Q2xvc2VQb3B1cENhcmQgPSBmYWxzZTtcbi8vIOWIneWni+WMluS4u+WuueWZqO+8jOS4u+WuueWZqOeUqOadpeaMguWcqOWFqOWxgOagt+W8j++8jOWMheaLrOesrOS4ieaWuee7hOS7tueahOagt+W8j1xubGV0IE15Qm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ19famlhbmctc2NvdXRlcicpO1xuLy8gY29uc29sZS5sb2coTXlCb3gpO1xuLy8gY29udGFpbmVyIOaJv+i9veS4u+eql+WPo+eahCBVSSDnu4Tku7ZcbmxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnRhaW5lci5jbGFzc05hbWUgPSBleHBvcnRzLkNPTlRBSU5FUl9DTEFTU05BTUU7XG4vLyDkvb/nlKggc2hhZG93IOadpemalOemu+agt+W8j1xubGV0IHNoYWRvd1Jvb3QgPSB1bmRlZmluZWQ7XG5pZiAoTXlCb3ggPT09IG51bGwgfHwgTXlCb3ggPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIOWmguaenOS4jeWtmOWcqOWuueWZqFxuICAgIC8vIOWIm+W7uuS4u+WuueWZqFxuICAgIE15Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgTXlCb3guaWQgPSAnX19qaWFuZy1zY291dGVyJztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdLmFwcGVuZENoaWxkKE15Qm94KTtcbiAgICAvLyBNeUJveC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnIC8v6buY6K6k6ZqQ6JePXG4gICAgTXlCb3guc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgc2hhZG93Um9vdCA9IE15Qm94ID09PSBudWxsIHx8IE15Qm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBNeUJveC5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdCA9PT0gbnVsbCB8fCBzaGFkb3dSb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgLy8gQW50IOe7hOS7tuagt+W8j1xuICAgIC8vIGNvbnN0IGFudFN0eWxlc2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgLy8gYW50U3R5bGVzaGVldC5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgLy8gYW50U3R5bGVzaGVldC5ocmVmID0gJ2h0dHBzOi8vY2RuLmJvb3RjZG4ubmV0L2FqYXgvbGlicy9hbnRkLzQuMTcuMS9hbnRkLm1pbi5jc3MnO1xuICAgIC8vIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoYW50U3R5bGVzaGVldCk7XG4gICAgLy8gVGFpbHdpbmRcbiAgICBjb25zdCB0YWlsd2luZFN0eWxlc2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgdGFpbHdpbmRTdHlsZXNoZWV0LnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICB0YWlsd2luZFN0eWxlc2hlZXQuaHJlZiA9ICdodHRwczovL3VucGtnLmNvbS90YWlsd2luZGNzc0BeMi9kaXN0L3RhaWx3aW5kLm1pbi5jc3MnO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGFpbHdpbmRTdHlsZXNoZWV0KTtcbiAgICAvLyDlnKggU2hhZG93IERPTSDkuK3mt7vliqDmoLflvI/vvJpcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBzdHlsZV8xLnBvcHVwQ2FyZFN0eWxlO1xuICAgIHNoYWRvd1Jvb3QgPT09IG51bGwgfHwgc2hhZG93Um9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hhZG93Um9vdC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG4vLyDnlKjmiLfku5jotLnnirbmgIHnrYnkv6Hmga/jgIHnlKjmiLfnmoQgQW5raSDkv6Hmga9cbmxldCBVU0VSX0lORk8gPSB7IHVzZXJJZDogJ3Vua25vdycsIHZlcmlmaWVkOiBmYWxzZSwgY29udGV4dE1lbnU6IGZhbHNlIH07XG5sZXQgQU5LSV9JTkZPID0geyBkZWZhdWx0RGVja05hbWU6ICcnLCBkZWNrczogW10sIG1vZGVsczogW10gfTtcbmxldCBleGVjdXRlZFByb21wdEhpc3RvcnlJblRvb2xCYXIgPSBbdXRpbF8xLmRpY3Rpb25hcnlQcm9tcHRdO1xuLy8g6I635Y+W55So5oi35L+h5oGvXG5jb25zdCB0aGlzR2V0VXNlckluZm8gPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICB0cnkge1xuICAgICAgICAvLyDojrflj5bnlKjmiLfkv6Hmga9cbiAgICAgICAgLy8gVVNFUl9JTkZPID0gYXdhaXQgZ2V0VXNlckluZm8oKVxuICAgICAgICBVU0VSX0lORk8gPSB5aWVsZCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdnZXRVc2VySW5mbycsICdtZXNzYWdlcyc6IHt9LCB9KTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gICAgLy8g5Zyo5LiK5LiL5paH6I+c5Y2V5Lit5pyA6L+R5omn6KGM55qEIFByb21wdFxuICAgIGNvbnN0IHJlc3VsdCA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5nZXQoeyBcImV4ZWN1dGVkUHJvbXB0SGlzdG9yeUluVG9vbEJhclwiOiBbdXRpbF8xLmRpY3Rpb25hcnlQcm9tcHRdIH0pO1xuICAgIGV4ZWN1dGVkUHJvbXB0SGlzdG9yeUluVG9vbEJhciA9IHJlc3VsdC5leGVjdXRlZFByb21wdEhpc3RvcnlJblRvb2xCYXI7XG4gICAgLy8g6I635Y+WIEFua2kgZGVja3NcbiAgICBjb25zdCBkZWNrcyA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2Fua2lBY3Rpb24nLCAnbWVzc2FnZXMnOiB7ICdhbmtpX2FjdGlvbl90eXBlJzogJ2RlY2tOYW1lcycsICdhbmtpX2FyZ3VtZW50cyc6IHt9IH0sIH0pO1xuICAgIEFOS0lfSU5GTy5kZWNrcyA9IGRlY2tzLnJlc3VsdDtcbiAgICAvLyDojrflj5YgQW5raSBtb2RlbHMg5ZKM6buY6K6k55qEIERlY2sg5ZCN56ewXG4gICAgY29uc3QgbW9kZWxzQW5kRGVjayA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ3NldE1vZGVsJywgJ21lc3NhZ2VzJzoge30sIH0pO1xuICAgIEFOS0lfSU5GTy5tb2RlbHMgPSBtb2RlbHNBbmREZWNrLmRhdGEubW9kZWxEYXRhO1xuICAgIEFOS0lfSU5GTy5kZWZhdWx0RGVja05hbWUgPSBtb2RlbHNBbmREZWNrLmRhdGEuZGVmYXVsdERlY2tOYW1lO1xuICAgIC8vIOabtOaWsCBBbmtpIHN0eWxlXG4gICAgdHJ5IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBBTktJX0lORk8ubW9kZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwID0ge1xuICAgICAgICAgICAgICAgIFwibW9kZWxcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogQU5LSV9JTkZPLm1vZGVsc1tpXVsnbW9kZWxOYW1lJ10sXG4gICAgICAgICAgICAgICAgICAgIFwiY3NzXCI6IHV0aWxfMi5jYXJkU3R5bGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8g5pu05pawIHN0eWxlXG4gICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbmtpQWN0aW9uJywgJ21lc3NhZ2VzJzogeyAnYW5raV9hY3Rpb25fdHlwZSc6ICd1cGRhdGVNb2RlbFN0eWxpbmcnLCAnYW5raV9hcmd1bWVudHMnOiBwIH0sIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgfVxufSk7XG5sZXQgcG9ydCA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5jb25uZWN0KHtcbiAgICBuYW1lOiAnZnJvbUNvbnRlbnRTY3JpcHQnXG59KTtcbi8vIOaOpeaUtiBiYWNrZ3JvdW5kIOa2iOaBr++8iOebruWJjeaYr+mAmui/h+a1j+iniOWZqOeahOWPs+mUruiPnOWNleOAgeW/q+aNt+mUruinpuWPke+8iVxud2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAobXNnLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIHZhciBfYTtcbiAgICAvLyBjb25zb2xlLmxvZygnY29udGVudCBzY3JpcHQgb25NZXNzYWdlOicpO1xuICAgIC8vIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgaWYgKG1zZy50eXBlID09PSAnb3Blbi1zY291dGVyJykge1xuICAgICAgICAvLyDlpITnkIbnqpflj6NcbiAgICAgICAgaWYgKE15Qm94ICE9PSBudWxsICYmIE15Qm94ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIOWmguaenOW3suWtmOWcqOWuueWZqFxuICAgICAgICAgICAgaWYgKCgoX2EgPSBNeUJveC5zaGFkb3dSb290KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucXVlcnlTZWxlY3RvcignLicgKyBleHBvcnRzLkNPTlRBSU5FUl9DTEFTU05BTUUpKSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIOWmguaenOS4jeWtmOWcqCBQb3B1cENhcmRcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gZXhwb3J0cy5DT05UQUlORVJfQ0xBU1NOQU1FO1xuICAgICAgICAgICAgICAgIHNoYWRvd1Jvb3QgPT09IG51bGwgfHwgc2hhZG93Um9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5YGc5q2i5pen55qE5a+56K+dXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvLyDph43mlrDpk77mjqVcbiAgICAgICAgICAgICAgICBwb3J0ID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLmNvbm5lY3Qoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZnJvbUNvbnRlbnRTY3JpcHQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ1N0b3BUaGVDb252ZXJzYXRpb24nLCAnbWVzc2FnZXMnOiAnJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE15Qm94LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICAgICAgICAvLyDnp7vpmaTml6flhoXlrrnvvIzpgb/lhY0gMiDmrKHmuLLmn5Pmt7fmnYLlnKjkuIDotbdcbiAgICAgICAgICAgIC8vIGNvbnRhaW5lci5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+S4jeWtmOWcqCBCb3gg5a655ZmoJyk7XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBleHBvcnRzLkNPTlRBSU5FUl9DTEFTU05BTUU7XG4gICAgICAgICAgICBzaGFkb3dSb290ID09PSBudWxsIHx8IHNoYWRvd1Jvb3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9ICgwLCBleHBvcnRzLmdldFNlbGVjdGlvbikoKTtcbiAgICAgICAgLy8g5pi+56S656qX5Y+jXG4gICAgICAgIGlmIChzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmtleVdvcmQgIT09ICcnKSB7XG4gICAgICAgICAgICBzaG93UG9wdXBDYXJkKHsgJ2tleVdvcmQnOiBzZWxlY3Rpb24gPT09IG51bGwgfHwgc2VsZWN0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZWxlY3Rpb24ua2V5V29yZCwgJ1NlbnRlbmNlJzogc2VsZWN0aW9uLnNlbnRlbmNlIH0sIHdpbmRvdy5nZXRTZWxlY3Rpb24oKSwgY29udGFpbmVyLCBzaGFkb3dSb290LCBpc1BpbiwgbXNnLnJ1blByb21wdCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gLy8g55uR5ZCs6aG16Z2i54K55Ye75LqL5Lu2XG4gICAgICAgIC8vIGRvY3VtZW50Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vICAgaWYgKE15Qm94ICE9PSB1bmRlZmluZWQgJiYgTXlCb3ggIT09IG51bGwgJiYgIWlzUGluICYmICFkb25vdENsb3NlUG9wdXBDYXJkKSB7XG4gICAgICAgIC8vICAgICAvLyDlpoLmnpzngrnlh7vnmoTkuI3mmK/mj5Lku7bnqpflj6Plj4rlhbblrZDlhYPntKDvvIzliJnlhbPpl63nqpflj6NcbiAgICAgICAgLy8gICAgIGlmIChNeUJveCAhPT0gZXZlbnQudGFyZ2V0ICYmICFNeUJveC5jb250YWlucyhldmVudC50YXJnZXQgYXMgTm9kZSkpIHtcbiAgICAgICAgLy8gICAgICAgLy8g6ZqQ6JeP56qX5Y+jXG4gICAgICAgIC8vICAgICAgIGNvbnRhaW5lci5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgICAgICAvLyAgICAgICAvLyBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzZWxlY3Rpb25jaGFuZ2UnLCBoYW5kbGVTZWxlY3Rpb25jaGFuZ2UpO1xuICAgICAgICAvLyAgICAgICAvLyBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2V1cCk7XG4gICAgICAgIC8vICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSlcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gY29udGFpbmVyLm9ubW91c2Vkb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIC8vICAgLy8g6ZqQ6JePIHNldEFua2lTcGFjZUJ1dHRvblxuICAgICAgICAvLyAgIGNvbnN0IGNvbnRleHRCb3ggPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGV4dEJveDInKVswXVxuICAgICAgICAvLyAgIGlmIChjb250ZXh0Qm94KSB7XG4gICAgICAgIC8vICAgICAvLyDngrnlh7vnmoTkuI3mmK8gc2V0QW5raVNwYWNlQnV0dG9uIOaXtuaJjemakOiXj1xuICAgICAgICAvLyAgICAgaWYgKGNvbnRleHRCb3ggIT09IGV2ZW50LnRhcmdldCAmJiAhY29udGV4dEJveC5jb250YWlucyhldmVudC50YXJnZXQgYXMgTm9kZSkpIHtcbiAgICAgICAgLy8gICAgICAgY29udGV4dEJveC5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChjb250ZXh0Qm94KVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gfVxuICAgIH1cbn0pO1xuLy8g5pi+56S65bqU55So56qX5Y+jXG5mdW5jdGlvbiBzaG93UG9wdXBDYXJkKGRhdGEsIG1zZywgTXlCb3gsIHNoYWRvd1Jvb3QsIGlzUGluLCBydW5Qcm9tcHQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBsZXQgbGFuZyA9IHlpZWxkICgwLCBsYW5nXzEuZmV0Y2hjdXJyZW50TGFuZ3VhZ2UpKCk7XG4gICAgICAgIHJlYWN0X2RvbV8xLmRlZmF1bHQucmVuZGVyKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5TdHJpY3RNb2RlLCBudWxsLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQobG9jYWxlXzEuQ3VycmVudExhbmd1YWdlQ29udGV4dC5Qcm92aWRlciwgeyB2YWx1ZTogbGFuZyB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHVzZXJJbmZvXzEuVXNlckluZm9Db250ZXh0LlByb3ZpZGVyLCB7IHZhbHVlOiB7IHVzZXI6IFVTRVJfSU5GTywgYW5raTogQU5LSV9JTkZPIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoY3NzaW5qc18xLlN0eWxlUHJvdmlkZXIsIHsgY29udGFpbmVyOiBzaGFkb3dSb290IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChzdHlsZWRfY29tcG9uZW50c18xLlN0eWxlU2hlZXRNYW5hZ2VyLCB7IHRhcmdldDogc2hhZG93Um9vdCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFBvcHVwQ2FyZF8xLlBvcHVwQ2FyZCwgeyBkYXRhOiBkYXRhLCBzZWxlY3Rpb246IG1zZywgcnVuUHJvbXB0OiBydW5Qcm9tcHQsIGlzUGluOiBpc1BpbiB9KSkpKSkpLCBNeUJveCk7XG4gICAgfSk7XG59XG5jb25zdCBwaW5Qb3B1cENhcmQgPSAodmFsdWUpID0+IHtcbiAgICBpc1BpbiA9IHZhbHVlO1xufTtcbmV4cG9ydHMucGluUG9wdXBDYXJkID0gcGluUG9wdXBDYXJkO1xuY29uc3Qgc2V0RG9ub3RDbG9zZVBvcHVwQ2FyZCA9ICh2YWx1ZSkgPT4ge1xuICAgIGRvbm90Q2xvc2VQb3B1cENhcmQgPSB2YWx1ZTtcbn07XG5leHBvcnRzLnNldERvbm90Q2xvc2VQb3B1cENhcmQgPSBzZXREb25vdENsb3NlUG9wdXBDYXJkO1xubGV0IGlzVGV4dFNlbGVjdGVkID0gZmFsc2U7XG5sZXQgbGFzdFNlbGVjdGlvbiA9IHtcbiAgICBhbmNob3JOb2RlOiBudWxsLFxuICAgIGFuY2hvck9mZnNldDogMCxcbiAgICBmb2N1c05vZGU6IG51bGwsXG4gICAgZm9jdXNPZmZzZXQ6IDAsXG59O1xuY29uc3QgaGFuZGxlTW91c2V1cCA9IChldmVudCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICAvLyDmmK/lkKblnKjnqpflj6PkuK3op6blj5FcbiAgICBjb25zdCBpc0luU2hhZG93ID0gTXlCb3ggPT09IGV2ZW50LnRhcmdldCB8fCAoTXlCb3ggPT09IG51bGwgfHwgTXlCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IE15Qm94LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpO1xuICAgIC8vIOaYr+WQpuWcqOW/q+aNt+aMiemSruS4iuinpuWPkVxuICAgIGNvbnN0IHBhdGggPSBldmVudC5jb21wb3NlZFBhdGgoKTtcbiAgICBjb25zdCBpc0NsaWNrZWRJbnNpZGVTaG9ydGN1dEJ1dHRvbiA9IHBhdGguc29tZSgoZWxlbWVudCkgPT4ge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QgJiYgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ1Nob3J0Y3V0QnV0dG9uJyk7XG4gICAgfSk7XG4gICAgLy8g6I635Y+W55So5oi35Zyo5a6/5Li7572R6aG15LiK6YCJ5Lit55qE5YaF5a65XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gKDAsIGV4cG9ydHMuZ2V0U2VsZWN0aW9uKShpc0luU2hhZG93KTtcbiAgICBjb25zdCByYW5nZSA9IHNlbGVjdGlvbiA9PT0gbnVsbCB8fCBzZWxlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbGVjdGlvbi5zZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcbiAgICBsYXN0U2VsZWN0aW9uID0ge1xuICAgICAgICAvLyDkv53lrZjlkITkuKrlsZ7mgKfnmoTlvJXnlKjlkozlgLxcbiAgICAgICAgYW5jaG9yTm9kZTogc2VsZWN0aW9uID09PSBudWxsIHx8IHNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VsZWN0aW9uLnNlbGVjdGlvbi5hbmNob3JOb2RlLFxuICAgICAgICBhbmNob3JPZmZzZXQ6IHNlbGVjdGlvbiA9PT0gbnVsbCB8fCBzZWxlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbGVjdGlvbi5zZWxlY3Rpb24uYW5jaG9yT2Zmc2V0LFxuICAgICAgICBmb2N1c05vZGU6IHNlbGVjdGlvbiA9PT0gbnVsbCB8fCBzZWxlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbGVjdGlvbi5zZWxlY3Rpb24uZm9jdXNOb2RlLFxuICAgICAgICBmb2N1c09mZnNldDogc2VsZWN0aW9uID09PSBudWxsIHx8IHNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VsZWN0aW9uLnNlbGVjdGlvbi5mb2N1c09mZnNldCxcbiAgICB9O1xuICAgIGlmIChzZWxlY3Rpb24pIHtcbiAgICAgICAgaXNUZXh0U2VsZWN0ZWQgPSBzZWxlY3Rpb24uc2VsZWN0aW9uLnRvU3RyaW5nKCkubGVuZ3RoID4gMDtcbiAgICB9XG4gICAgLy8g5pyJ6YCJ5Lit5paH5a2X5LiU5pyq5byA5ZCvIFByb21wdCDorr7nva7nlYzpnaLvvIjlpoLmnpzlvIDlkK8gUHJvbXB0IOiuvue9rueVjOmdouiAjOS7jeeEtuaJp+ihjOafpeivouS7u+WKoeaXtu+8jOS8muWvvOiHtOS4jeW/heimgeeahOS7u+WKoeaJp+ihjO+8iVxuICAgIGlmIChpc1RleHRTZWxlY3RlZCAmJiAhZG9ub3RDbG9zZVBvcHVwQ2FyZCkge1xuICAgICAgICBpZiAoIWlzSW5TaGFkb3cgfHwgaXNDbGlja2VkSW5zaWRlU2hvcnRjdXRCdXR0b24pIHtcbiAgICAgICAgICAgIC8vIOWcqCBQb3B1cENhcmQg6IyD5Zu05aSW6Kem5Y+RXG4gICAgICAgICAgICAvLyBpc1RleHRTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgLy8g5YGc5q2i5pen55qE5a+56K+dXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvLyDph43mlrDpk77mjqVcbiAgICAgICAgICAgICAgICBwb3J0ID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLmNvbm5lY3Qoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZnJvbUNvbnRlbnRTY3JpcHQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ1N0b3BUaGVDb252ZXJzYXRpb24nLCAnbWVzc2FnZXMnOiAnJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOaYvuekuueql+WPoy/mm7TmlrDnqpflj6Pkv6Hmga9cbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24gJiYgKHNlbGVjdGlvbiA9PT0gbnVsbCB8fCBzZWxlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbGVjdGlvbi5rZXlXb3JkLmxlbmd0aCkgPiAwICYmIGlzUGluICYmICgoX2EgPSBzZWxlY3Rpb24uc2VsZWN0aW9uLmFuY2hvck5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5ub2RlTmFtZSkgPT09ICcjdGV4dCcpIHtcbiAgICAgICAgICAgICAgICBzaG93UG9wdXBDYXJkKHsgJ2tleVdvcmQnOiBzZWxlY3Rpb24gPT09IG51bGwgfHwgc2VsZWN0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZWxlY3Rpb24ua2V5V29yZCwgJ1NlbnRlbmNlJzogc2VsZWN0aW9uLnNlbnRlbmNlIH0sIHdpbmRvdy5nZXRTZWxlY3Rpb24oKSwgY29udGFpbmVyLCBzaGFkb3dSb290LCBpc1BpbiwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyDlnKggUG9wdXBDYXJkIOiMg+WbtOWGheinpuWPkVxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkVGV4dDtcbiAgICAgICAgICAgIC8vIOaYvuekuuWujOW9ouWhq+epuuaTjeS9nOaMiemSrlxuICAgICAgICAgICAgLy8gaWYgKGlzRmlyZWZveCkge1xuICAgICAgICAgICAgLy8gICBzZWxlY3RlZFRleHQgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgIHNlbGVjdGVkVGV4dCA9IHNoYWRvd1Jvb3QuZ2V0U2VsZWN0aW9uKClcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dFN0cmluZyA9IHNlbGVjdGlvbi5rZXlXb3JkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAvLyBjb25zdCBzZW50ZW5jZSA9ICcnXG4gICAgICAgICAgICBjb25zdCBQb3B1cENhcmRDb250YWluZXIgPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShleHBvcnRzLkNPTlRBSU5FUl9DTEFTU05BTUUpWzBdO1xuICAgICAgICAgICAgLy8gY29uc3QgbWVzc2FnZXNCb3ggPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVzc2FnZXMnKVswXVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc2VsZWN0ZWRUZXh0KTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2VzQm94Py5jb250YWlucyhzZWxlY3RlZFRleHQuYmFzZU5vZGUucGFyZW50Tm9kZSBhcyBOb2RlKSk7XG4gICAgICAgICAgICAvLyBsZXQgaXNJbk1lc3NhZ2VzID0gZmFsc2VcbiAgICAgICAgICAgIC8vIGlmIChzZWxlY3RlZFRleHQuYmFzZU5vZGUpIHtcbiAgICAgICAgICAgIC8vICAgaWYgKG1lc3NhZ2VzQm94ID09PSBzZWxlY3RlZFRleHQuYmFzZU5vZGUucGFyZW50Tm9kZSB8fCBtZXNzYWdlc0JveD8uY29udGFpbnMoc2VsZWN0ZWRUZXh0LmJhc2VOb2RlLnBhcmVudE5vZGUgYXMgTm9kZSkpIHtcbiAgICAgICAgICAgIC8vICAgICAvL+WcqCBtZXNzYWdlcyDlrrnlmajlhoXmk43kvZzvvIzliJnmmL7npLrmk43kvZzmjInpkq5cbiAgICAgICAgICAgIC8vICAgICBpc0luTWVzc2FnZXMgPSB0cnVlXG4gICAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGlmIChQb3B1cENhcmRDb250YWluZXIgJiYgKHNlbGVjdGlvbiA9PT0gbnVsbCB8fCBzZWxlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbGVjdGlvbi5zZWxlY3Rpb24udHlwZSkgPT09ICdSYW5nZScgJiYgIWNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY29udGV4dEJveDInKSkge1xuICAgICAgICAgICAgICAgIGxldCBjb250ZXh0Qm94MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGNvbnRleHRCb3gyLmNsYXNzTmFtZSA9ICdjb250ZXh0Qm94Mic7XG4gICAgICAgICAgICAgICAgY29udGV4dEJveDIuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICAgICAgICAgIFBvcHVwQ2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjb250ZXh0Qm94Mik7XG4gICAgICAgICAgICAgICAgbGV0IHJhbmdlID0gc2VsZWN0aW9uID09PSBudWxsIHx8IHNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VsZWN0aW9uLnNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgbGV0IGxhbmcgPSB5aWVsZCAoMCwgbGFuZ18xLmZldGNoY3VycmVudExhbmd1YWdlKSgpO1xuICAgICAgICAgICAgICAgIHJlYWN0X2RvbV8xLmRlZmF1bHQucmVuZGVyKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGxvY2FsZV8xLkN1cnJlbnRMYW5ndWFnZUNvbnRleHQuUHJvdmlkZXIsIHsgdmFsdWU6IGxhbmcgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQodXNlckluZm9fMS5Vc2VySW5mb0NvbnRleHQuUHJvdmlkZXIsIHsgdmFsdWU6IHsgdXNlcjogVVNFUl9JTkZPLCBhbmtpOiBBTktJX0lORk8gfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoc3R5bGVkX2NvbXBvbmVudHNfMS5TdHlsZVNoZWV0TWFuYWdlciwgeyB0YXJnZXQ6IHNoYWRvd1Jvb3QgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChUb29sQmFyXzEuVG9vbEJhciwgeyBzZWxlY3RlZFRleHQ6IHNlbGVjdGlvbiA9PT0gbnVsbCB8fCBzZWxlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbGVjdGlvbi5zZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgc2VsZWN0ZWRUZXh0U3RyaW5nOiBzZWxlY3RlZFRleHRTdHJpbmcsIHNlbGVjdGVkU2VudGVuY2U6IHNlbGVjdGlvbiA9PT0gbnVsbCB8fCBzZWxlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbGVjdGlvbi5zZW50ZW5jZSwgZXhlY3V0ZWRQcm9tcHRIaXN0b3J5SW5Ub29sQmFyOiBleGVjdXRlZFByb21wdEhpc3RvcnlJblRvb2xCYXIsIHJhbmdlOiByYW5nZSB9KSkpKSwgY29udGV4dEJveDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFpc1RleHRTZWxlY3RlZCkge1xuICAgICAgICAvLyDmsqHmnInpgInkuK3ku7vkvZXmloflrZdcbiAgICAgICAgLy8g56e76Zmk5b+r5o235oyJ6ZKuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgU2hvcnRjdXRCdXR0b25Db250YWluZXIgPSBzaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy4nICsgU0hPUlRDVVRfQlVUVE9OX0NMQVNTTkFNRSk7XG4gICAgICAgICAgICBpZiAoU2hvcnRjdXRCdXR0b25Db250YWluZXIpIHtcbiAgICAgICAgICAgICAgICAoX2EgPSBTaG9ydGN1dEJ1dHRvbkNvbnRhaW5lci5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlQ2hpbGQoU2hvcnRjdXRCdXR0b25Db250YWluZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyDmnInpgInkuK3mloflrZdcbiAgICAgICAgLy8g5pi+56S65b+r5o235oyJ6ZKuXG4gICAgICAgIGlmICgoKF9iID0gTXlCb3ggPT09IG51bGwgfHwgTXlCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IE15Qm94LnNoYWRvd1Jvb3QpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5xdWVyeVNlbGVjdG9yKCcuJyArIFNIT1JUQ1VUX0JVVFRPTl9DTEFTU05BTUUpKSA9PT0gbnVsbCAmJiBVU0VSX0lORk8uY29udGV4dE1lbnUgJiYgIWlzSW5TaGFkb3cgJiYgIWlzUGluKSB7XG4gICAgICAgICAgICAvLyDorrDlvZXmnIDov5HpgInkuK3nmoTmloflrZdcbiAgICAgICAgICAgIC8vIOWmguaenOS4jeWtmOWcqOaMiemSrlxuICAgICAgICAgICAgbGV0IFNob3J0Y3V0QnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBTaG9ydGN1dEJ1dHRvbkNvbnRhaW5lci5jbGFzc05hbWUgPSBTSE9SVENVVF9CVVRUT05fQ0xBU1NOQU1FO1xuICAgICAgICAgICAgc2hhZG93Um9vdCA9PT0gbnVsbCB8fCBzaGFkb3dSb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGFkb3dSb290LmFwcGVuZENoaWxkKFNob3J0Y3V0QnV0dG9uQ29udGFpbmVyKTtcbiAgICAgICAgICAgIHJlYWN0X2RvbV8xLmRlZmF1bHQucmVuZGVyKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5TdHJpY3RNb2RlLCBudWxsLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHN0eWxlZF9jb21wb25lbnRzXzEuU3R5bGVTaGVldE1hbmFnZXIsIHsgdGFyZ2V0OiBzaGFkb3dSb290IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFNob3J0Y3V0QnV0dG9uXzEuU2hvcnRjdXRCdXR0b24sIHsgcG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBldmVudC5wYWdlWCArIDEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LnBhZ2VZICsgMTBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGhhbmRsZVNob3J0Y3V0QnV0dG9uQ2xpY2s6IChydW5Qcm9tcHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyAvLyDpmLvmraLkuovku7blhpLms6FcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoKF9hID0gTXlCb3ggPT09IG51bGwgfHwgTXlCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IE15Qm94LnNoYWRvd1Jvb3QpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5xdWVyeVNlbGVjdG9yKCcuJyArIGV4cG9ydHMuQ09OVEFJTkVSX0NMQVNTTkFNRSkpID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlpoLmnpzkuI3lrZjlnKggUG9wdXBDYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBleHBvcnRzLkNPTlRBSU5FUl9DTEFTU05BTUU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dSb290ID09PSBudWxsIHx8IHNoYWRvd1Jvb3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBuZXdTZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9ICgwLCBleHBvcnRzLmdldFNlbGVjdGlvbikoaXNJblNoYWRvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1NlbGVjdGlvbiA9IHNlbGVjdGlvbiA9PT0gbnVsbCB8fCBzZWxlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbGVjdGlvbi5zZWxlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOmHjeaWsOmAieS4reWIkuivjeWMuuWfn1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJz09PT09PT09PT09PT09PScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Yib5bu65LiA5Liq6IyD5Zu05a+56LGhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdSYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmNob3JOb2RlID0gbGFzdFNlbGVjdGlvbi5hbmNob3JOb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9jdXNOb2RlID0gbGFzdFNlbGVjdGlvbi5mb2N1c05vZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhsYXN0U2VsZWN0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFuY2hvck5vZGUgJiYgZm9jdXNOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L2/55So5L+d5a2Y55qEIHNlbGVjdGVkIFJhbmdlIOaBouWkjVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1JhbmdlLnNldFN0YXJ0KGFuY2hvck5vZGUsIGxhc3RTZWxlY3Rpb24gPT09IG51bGwgfHwgbGFzdFNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogbGFzdFNlbGVjdGlvbi5hbmNob3JPZmZzZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1JhbmdlLnNldEVuZChmb2N1c05vZGUsIGxhc3RTZWxlY3Rpb24gPT09IG51bGwgfHwgbGFzdFNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogbGFzdFNlbGVjdGlvbi5mb2N1c09mZnNldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+WIFNlbGVjdGlvbiDlr7nosaFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDnp7vpmaTmiYDmnInnjrDmnInnmoTpgInmi6lcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5re75Yqg5paw55qE6YCJ5Yy6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2VsZWN0aW9uLmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDnp7vpmaTlv6vmjbfmjInpkq5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgU2hvcnRjdXRCdXR0b25Db250YWluZXIgPSBzaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy4nICsgU0hPUlRDVVRfQlVUVE9OX0NMQVNTTkFNRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChTaG9ydGN1dEJ1dHRvbkNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKF9iID0gU2hvcnRjdXRCdXR0b25Db250YWluZXIucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnJlbW92ZUNoaWxkKFNob3J0Y3V0QnV0dG9uQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmmL7npLrnqpflj6NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1BvcHVwQ2FyZCh7ICdrZXlXb3JkJzogc2VsZWN0aW9uID09PSBudWxsIHx8IHNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VsZWN0aW9uLmtleVdvcmQsICdTZW50ZW5jZSc6IHNlbGVjdGlvbi5zZW50ZW5jZSB9LCBuZXdTZWxlY3Rpb24sIGNvbnRhaW5lciwgc2hhZG93Um9vdCwgaXNQaW4sIHJ1blByb21wdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSB9KSkpLCBTaG9ydGN1dEJ1dHRvbkNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbmNvbnN0IGdldFNlbGVjdGlvbiA9IChpc0luU2hhZG93KSA9PiB7XG4gICAgbGV0IHNlbGVjdGlvbjtcbiAgICBpZiAoaXNJblNoYWRvdykge1xuICAgICAgICBzZWxlY3Rpb24gPSBzaGFkb3dSb290LmdldFNlbGVjdGlvbigpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0aW9uICE9PSBudWxsICYmIHNlbGVjdGlvbi5yYW5nZUNvdW50ID4gMCkge1xuICAgICAgICAvLyDlvZPliY3pgInkuK3nmoTmloflrZdcbiAgICAgICAgbGV0IGtleVdvcmQgPSBzZWxlY3Rpb24udG9TdHJpbmcoKS50cmltKCk7XG4gICAgICAgIGxldCBzZW50ZW5jZSA9ICcnO1xuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHNlbGVjdGlvbi5mb2N1c05vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgLy8g5aaC5p6c6YCJ5Lit55qE5piv5LiA5Liq5pu05bCP55qE5YWD57Sg77yI5aaCPGVtPu+8ie+8jOaIkeS7rOmcgOimgeWQkeS4iuWvu+aJvlxuICAgICAgICB3aGlsZSAocGFyZW50Tm9kZS50YWdOYW1lICYmICghaXNCbG9ja0xldmVsKChwYXJlbnROb2RlLnRhZ05hbWUgfHwgdW5kZWZpbmVkKS50b0xvd2VyQ2FzZSgpKSAmJiAocGFyZW50Tm9kZS50YWdOYW1lIHx8IHVuZGVmaW5lZCkudG9Mb3dlckNhc2UoKSAhPT0gJ2JvZHknKSkge1xuICAgICAgICAgICAgcGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VudGVuY2VzID0gc3BsaXRJbnRvU2VudGVuY2VzKHBhcmVudE5vZGUpO1xuICAgICAgICBsZXQgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgbGV0IHN0YXJ0T2Zmc2V0U2hpZnQgPSAzO1xuICAgICAgICBsZXQgZW5kT2Zmc2V0U2hpZnQgPSAzO1xuICAgICAgICBpZiAocmFuZ2Uuc3RhcnRPZmZzZXQgPj0gMSkge1xuICAgICAgICAgICAgY29uc3QgY2hhckJlZm9yZSA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyLnRleHRDb250ZW50W3JhbmdlLnN0YXJ0T2Zmc2V0IC0gMV07XG4gICAgICAgICAgICBzdGFydE9mZnNldFNoaWZ0ID0gL1vjgIIu77yBIT/vvJ9dLy50ZXN0KGNoYXJCZWZvcmUpID8gMCA6IDM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmdlLmVuZE9mZnNldCA8IHJhbmdlLmVuZENvbnRhaW5lci50ZXh0Q29udGVudC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFyQWZ0ZXIgPSByYW5nZS5lbmRDb250YWluZXIudGV4dENvbnRlbnRbcmFuZ2UuZW5kT2Zmc2V0XTtcbiAgICAgICAgICAgIGVuZE9mZnNldFNoaWZ0ID0gL1vjgIIu77yBIT/vvJ9dLy50ZXN0KGNoYXJBZnRlcikgPyAwIDogMztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZ2UuZW5kT2Zmc2V0ID09PSAwIHx8IGlzSW5TaGFkb3cpIHtcbiAgICAgICAgICAgIGVuZE9mZnNldFNoaWZ0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZXhwYW5kZWRSYW5nZSA9IHJhbmdlLmNsb25lUmFuZ2UoKTsgLy8g5aSN5Yi25b2T5YmN6YCJ5Lit55qE6IyD5Zu05a+56LGhXG4gICAgICAgIC8vIGV4cGFuZFJhbmdl55qE6IyD5Zu05YmN5ZCO5ZCE56e75YqoM+S4quWtl+espu+8iOWmguaenOWPr+S7peeahOivne+8iVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZXhwYW5kZWRSYW5nZS5zZXRTdGFydChyYW5nZS5zdGFydENvbnRhaW5lciwgTWF0aC5tYXgocmFuZ2Uuc3RhcnRPZmZzZXQgLSBzdGFydE9mZnNldFNoaWZ0LCAwKSk7XG4gICAgICAgICAgICBleHBhbmRlZFJhbmdlLnNldEVuZChyYW5nZS5lbmRDb250YWluZXIsIE1hdGgubWluKHJhbmdlLmVuZE9mZnNldCArIGVuZE9mZnNldFNoaWZ0LCByYW5nZS5lbmRDb250YWluZXIudGV4dENvbnRlbnQubGVuZ3RoIC0gMSkpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOiOt+WPluWMheaLrOWFs+mUruivjeWJjeWQjuWtl+espueahOWtl+espuS4slxuICAgICAgICBsZXQgZXhwYW5kZWRTZWxlY3RlZFRleHQgPSBleHBhbmRlZFJhbmdlLnRvU3RyaW5nKCk7XG4gICAgICAgIGZvciAobGV0IHMgb2Ygc2VudGVuY2VzKSB7XG4gICAgICAgICAgICBpZiAocy5pbmNsdWRlcyhleHBhbmRlZFNlbGVjdGVkVGV4dCkpIHtcbiAgICAgICAgICAgICAgICBzZW50ZW5jZSA9IHM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbnRlbmNlID09PSAnJykge1xuICAgICAgICAgICAgc2VudGVuY2UgPSBzZWxlY3Rpb24uYW5jaG9yTm9kZS5kYXRhO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHsgJ3NlbGVjdGlvbic6IHNlbGVjdGlvbiwgJ2tleVdvcmQnOiBrZXlXb3JkLCAnc2VudGVuY2UnOiBzZW50ZW5jZSB9KTtcbiAgICAgICAgcmV0dXJuIHsgJ3NlbGVjdGlvbic6IHNlbGVjdGlvbiwgJ2tleVdvcmQnOiBrZXlXb3JkLCAnc2VudGVuY2UnOiBzZW50ZW5jZSB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIOaLhuWIhuaWh+acrOS4uuWPpeWtkOeahOWHveaVsFxuICAgIGZ1bmN0aW9uIHNwbGl0SW50b1NlbnRlbmNlcyhub2RlKSB7XG4gICAgICAgIGxldCB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGVtcERpdi5pbm5lckhUTUwgPSBub2RlLmlubmVySFRNTDtcbiAgICAgICAgbGV0IHBsYWluVGV4dCA9IHRlbXBEaXYuaW5uZXJUZXh0O1xuICAgICAgICAvLyDlr7noi7Hmloflkozml6Xor63nmoTlpITnkIZcbiAgICAgICAgbGV0IHNlbnRlbmNlcyA9IHBsYWluVGV4dC5zcGxpdCgvW+OAgi7vvIEhP++8n10vKTtcbiAgICAgICAgLy8g5Yig6Zmk56m65Y+l5a2QXG4gICAgICAgIHNlbnRlbmNlcyA9IHNlbnRlbmNlcy5maWx0ZXIoKHNlbnRlbmNlKSA9PiBzZW50ZW5jZS50cmltKCkgIT09IFwiXCIpO1xuICAgICAgICByZXR1cm4gc2VudGVuY2VzO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0Jsb2NrTGV2ZWwodGFnTmFtZSkge1xuICAgICAgICBjb25zdCBibG9ja0xldmVsRWxlbWVudHMgPSBbXG4gICAgICAgICAgICAnYWRkcmVzcycsICdhcnRpY2xlJywgJ2FzaWRlJywgJ2Jsb2NrcXVvdGUnLCAnY2FudmFzJywgJ2RkJywgJ2RpdicsICdkbCcsXG4gICAgICAgICAgICAnZHQnLCAnZmllbGRzZXQnLCAnZmlnY2FwdGlvbicsICdmaWd1cmUnLCAnZm9vdGVyJywgJ2Zvcm0nLCAnaDEnLCAnaDInLFxuICAgICAgICAgICAgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JywgJ2hlYWRlcicsICdocicsICdsaScsICdtYWluJywgJ25hdicsICdub3NjcmlwdCcsXG4gICAgICAgICAgICAnb2wnLCAnb3V0cHV0JywgJ3AnLCAncHJlJywgJ3NlY3Rpb24nLCAndGFibGUnLCAndGhlYWQnLCAndHInLCAndWwnXG4gICAgICAgIF07XG4gICAgICAgIHJldHVybiBibG9ja0xldmVsRWxlbWVudHMuaW5jbHVkZXModGFnTmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9XG59O1xuZXhwb3J0cy5nZXRTZWxlY3Rpb24gPSBnZXRTZWxlY3Rpb247XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyDojrflj5bnlKjmiLfkv6Hmga9cbnRoaXNHZXRVc2VySW5mbygpO1xuLy8g55uR5ZCs6aG16Z2i6byg5qCH5oqs6LW35LqL5Lu2XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2V1cCk7XG4vLyDnm5HlkKzpobXpnaLpvKDmoIfmjInkuIvkuovku7ZcbmRvY3VtZW50Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBjb25zdCBlbGVtZW50ID0gZXZlbnQuY29tcG9zZWRQYXRoKClbMF07XG4gICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiAhZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ1Nob3J0Y3V0QnV0dG9uJykgJiYgTXlCb3ggIT09IHVuZGVmaW5lZCAmJiBNeUJveCAhPT0gbnVsbCAmJiAhaXNQaW4gJiYgIWRvbm90Q2xvc2VQb3B1cENhcmQpIHtcbiAgICAgICAgLy8g5aaC5p6c54K55Ye755qE5LiN5piv5b+r5o235oyJ6ZKu44CB5o+S5Lu256qX5Y+j5Y+K5YW25a2Q5YWD57Sg77yM5YiZ5YWz6Zet56qX5Y+jXG4gICAgICAgIGlmIChNeUJveCAhPT0gZXZlbnQudGFyZ2V0ICYmICFNeUJveC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAvLyDpmpDol4/nqpflj6NcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfpmpDol4/nqpflj6MnKVxuICAgICAgICAgICAgKF9hID0gY29udGFpbmVyLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgICAgICAgICAgLy8gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2VsZWN0aW9uY2hhbmdlJywgaGFuZGxlU2VsZWN0aW9uY2hhbmdlKTtcbiAgICAgICAgICAgIC8vIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZXVwKTtcbiAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgY29udGV4dEJveCA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZXh0Qm94MicpWzBdO1xuICAgIC8vIOeCueWHu+aPkuS7tueql+WPo+S4lOS4jeaYryBUb29sQmFyXG4gICAgY29uc3QgaXNJblNoYWRvdyA9IE15Qm94ID09PSBldmVudC50YXJnZXQgfHwgKE15Qm94ID09PSBudWxsIHx8IE15Qm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBNeUJveC5jb250YWlucyhldmVudC50YXJnZXQpKTtcbiAgICBjb25zdCBpc0luVG9vbEJhciA9IGNvbnRleHRCb3ggPT09IGV2ZW50LmNvbXBvc2VkUGF0aCgpWzBdIHx8IChjb250ZXh0Qm94ID09PSBudWxsIHx8IGNvbnRleHRCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRleHRCb3guY29udGFpbnMoZXZlbnQuY29tcG9zZWRQYXRoKClbMF0pKTtcbiAgICBpZiAoaXNJblNoYWRvdyAmJiAhaXNJblRvb2xCYXIpIHtcbiAgICAgICAgLy8g6ZqQ6JePIFRvb2xCYXJcbiAgICAgICAgaWYgKGNvbnRleHRCb3gpIHtcbiAgICAgICAgICAgIC8vIOeCueWHu+eahOS4jeaYryBzZXRBbmtpU3BhY2VCdXR0b24g5pe25omN6ZqQ6JePXG4gICAgICAgICAgICBpZiAoY29udGV4dEJveCAhPT0gZXZlbnQudGFyZ2V0ICYmICFjb250ZXh0Qm94LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAoX2IgPSBjb250ZXh0Qm94LnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5yZW1vdmVDaGlsZChjb250ZXh0Qm94KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzZWxlY3Rpb25jaGFuZ2UnLCBoYW5kbGVTZWxlY3Rpb25jaGFuZ2UpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudXNlQ3VycmVudExhbmd1YWdlID0gZXhwb3J0cy5DdXJyZW50TGFuZ3VhZ2VDb250ZXh0ID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbmNvbnN0IGxhbmdfMSA9IHJlcXVpcmUoXCIuL2xhbmdcIik7XG5jb25zdCBhc3luY0ZldGNoY3VycmVudExhbmd1YWdlID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgcmV0dXJuIHlpZWxkICgwLCBsYW5nXzEuZmV0Y2hjdXJyZW50TGFuZ3VhZ2UpKCk7XG59KTtcbi8vIOiOt+WPluW9k+WJjeivreiogFxuZXhwb3J0cy5DdXJyZW50TGFuZ3VhZ2VDb250ZXh0ID0gKDAsIHJlYWN0XzEuY3JlYXRlQ29udGV4dCkobnVsbCk7XG5jb25zdCB1c2VDdXJyZW50TGFuZ3VhZ2UgPSAoKSA9PiAoMCwgcmVhY3RfMS51c2VDb250ZXh0KShleHBvcnRzLkN1cnJlbnRMYW5ndWFnZUNvbnRleHQpO1xuZXhwb3J0cy51c2VDdXJyZW50TGFuZ3VhZ2UgPSB1c2VDdXJyZW50TGFuZ3VhZ2U7XG4iLCJleHBvcnQgZGVmYXVsdCBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBY2NBQUFDcENBWUFBQUJlZGZZc0FBQUJwMmxVV0hSWVRVdzZZMjl0TG1Ga2IySmxMbmh0Y0FBQUFBQUFQRDk0Y0dGamEyVjBJR0psWjJsdVBTTHZ1NzhpSUdsa1BTSlhOVTB3VFhCRFpXaHBTSHB5WlZONlRsUmplbXRqT1dRaVB6NEtQSGc2ZUcxd2JXVjBZU0I0Yld4dWN6cDRQU0poWkc5aVpUcHVjenB0WlhSaEx5SWdlRHA0YlhCMGF6MGlXRTFRSUVOdmNtVWdOaTR3TGpBaVBnb2dQSEprWmpwU1JFWWdlRzFzYm5NNmNtUm1QU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUx6QXlMekl5TFhKa1ppMXplVzUwWVhndGJuTWpJajRLSUNBOGNtUm1Pa1JsYzJOeWFYQjBhVzl1SUhKa1pqcGhZbTkxZEQwaUlnb2dJQ0FnZUcxc2JuTTZaWGhwWmowaWFIUjBjRG92TDI1ekxtRmtiMkpsTG1OdmJTOWxlR2xtTHpFdU1DOGlDaUFnSUdWNGFXWTZWWE5sY2tOdmJXMWxiblE5SWxOamNtVmxibk5vYjNRaUNpQWdJR1Y0YVdZNlVHbDRaV3haUkdsdFpXNXphVzl1UFNJeE5qa2lDaUFnSUdWNGFXWTZVR2w0Wld4WVJHbHRaVzV6YVc5dVBTSTBOVFVpTHo0S0lEd3ZjbVJtT2xKRVJqNEtQQzk0T25odGNHMWxkR0UrQ2p3L2VIQmhZMnRsZENCbGJtUTlJbklpUHo0ZVFyRGVBQUFCWFdsRFExQkpRME1nVUhKdlptbHNaUUFBS0pGMWtFOG9nM0VZeHo5amlFMVJsT1N3bERLTlpsdHkzU2dVV3JQbHowRzllemVqWm42OW0rUW1GK1VzUnlmSnlYVWxCemRYcFNpblhlU2dYTlF1ck5memJ0aEdubnA2UG4xN250L3YyeGNhbkpwU2FUdXdtY2taa2FtUWEybDV4ZFh5akoxbUhBelJxdWxaRlF5SFoyV0Y3MWxmeFh0czFyd2J0dDd5SHJ5czNsekdDcVgyVGk3MlQ2Yi83dGRWV3lLWjFXVitTQWQwWmVUQTVoVU83K1NVeFh2Q1hZYVlFajZ5T0ZYaGM0dmpGYjRxNzBRakU4SzN3aDM2dXBZUUxnaDc0alY2cW9ZMzA5djZsd2ZMdlRPWmlTM0k3Skh1WTU0b1BnSk1NVWVJVWNZWmxDemMvOXdFeWpjVGJLSFl4V0NERk92a2NCRVVSWkVtS1R4REJwMFJQTUkrdk5KK0srdmZHVmExdzFlWUhKT3Z1cXZhalBnLzNvRGVwNnJXZndvRGNjajdsV1pvUDhuYWl2YnNtdDlYWVVjZW1vNU44MjBSV3R4UWVqRE45N3hwbHM2ZzhSR3VpNSt4aEdNcUhKd1dPUUFBUUFCSlJFRlVlQUh0WFFkOFZGWDJQcE9aZENEMEVxbzBVUkJVVkJEYldsQUVGVVRzdll1dTllOHE3cW9vS0Zpd2dLNWRkOUhWRmJ0clJSRzdDTWdLd2xwbzBvUDBoUFJNWnY3bnUyL096TXRrSnBsSjNxU1FjMzk1YzN0NTM3azUzenYzM2ZlZXEyM3JBWDVTcHdnb0FvcUFJcUFJS0FKQkJKS0NJUTBvQW9xQUlxQUlLQUtLZ0VGQXlWRW5naUtnQ0NnQ2lvQWlFSWFBa21NWUlCcFZCQlFCUlVBUlVBU1VISFVPS0FLS2dDS2dDQ2dDWVFnb09ZWUJvbEZGUUJGUUJCUUJSVURKVWVlQUlxQUlLQUtLZ0NJUWhvQ1NZeGdnR2xVRUZBRkZRQkZRQkpRY2RRNG9Bb3FBSXFBSUtBSmhDQ2c1aGdHaVVVVkFFVkFFRkFGRlFNbFI1NEFpb0Fnb0FvcUFJaENHZ0pKakdDQWFWUVFVQVVWQUVWQUVsQngxRGlnQ2lvQWlvQWdvQW1FSUtEbUdBYUpSUlVBUlVBUVVBVVZBeVZIbmdDS2dDQ2dDaW9BaUVJYUFrbU1ZSUJwVkJCUUJSVUFSVUFTVUhIVU9LQUtLZ0NLZ0NDZ0NZUWdvT1lZQm9sRkZRQkZRQkJRQlJVREpVZWVBSXFBSUtBS0tnQ0lRaG9DU1l4Z2dHbFVFRkFGRlFCRlFCSlFjZFE0b0FvcUFJcUFJS0FKaENDZzVoZ0dpVVVWQUVWQUVGQUZGUU1sUjU0QWlvQWdvQW9wQW8wRGdzYi9mUTQ4OWZrL1VzU0wvM2ltM1JzMlBKMFBKTVI2MHRLd2lvQWdvQW9wQXZTR1FsN3ViempwN2RFU0NCREdlZGRab3g4Ym16a2h2ZjVkanJXbERpb0Fpb0Fnb0FvcEFnaENZKzltMzFLMTdaME9RM2JwMXBvOCtuR3Q2RW1KODlkVjM2ZWIvbSt4STd4NUhXdEZHRkFGRlFCRlFCQlNCT2tEZzJtdHVONzNBZ2hRSGl4SEVLSG1TWGh0ZnliRTI2R2xkUlVBUlVBUVVnVHBIUUVoUUNOSnBZc1FKS1RuV3VWaTFRMFZBRVZBRUZJSGFJaUFFaVhiczRkcTJLL1ZkYlZzUDhFdEVmVVZBRVZBRUZBRkZRQkVnMHQycU9nc1VBVVZBRVZBRUZJRXdCSlFjd3dEUnFDS2dDQ2dDaW9BaW9PU29jMEFSVUFRVUFVVkFFUWhEUU1reERCQ05LZ0tLZ0NLZ0NDZ0NTbzQ2QnhRQlJVQVJVQVFVZ1RBRWxCekRBTkdvSXFBSUtBS0tnQ0tnenpucUhGQUVGSUVtZ2tCamVXck4xVVRrMGJCUFU4bXhZY3RIUjZjSUtBSzFSc0JQR1NrKzZ0ZXhsTktTZmJWdUxaRU5sSGlUNk5lY0ZDb294YUtla21RaXNhNnViU1hINmhEU2ZFVkFFV2lrQ0ZpVzR1aEJ1Mm5DaWRzb2t3bXlNYmhDSnNZSFpyZWh0MzVzRVJpdWttUjl5RTN2T2RZSDZ0cW5JcUFJMUFrQ2c3cVUwTjJuYkdrMHhBaFFZT1ZPUEdrckhkaXR1RTR3MGs0aUk2RGtHQmtYVFZVRUZJRkdqWUJsTlo0eUtJK1NHcUhoNWVJeGo5NS9kMEFDamVWZWFhT2VNSlVHcitSWUNSSk5VQVFVZ2NhTlFJaE0yalVyYjdTbjByYVoxemIyMERuWkVqV1lRQVNVSEJNSXJqYXRDQ2dDOVllQW4va0VGbGhqZFJnNnprRmQvU0RnYWQyNlQvMzByTDBxQW9xQUl1QTRBdjRBb1lCVi9KU2NuTWQrZ2VPOTFFV0R5Y2taMUxwMUwrNEtOT2tLRUgwalp2dTZBTTNCUG5TM3FvTmdhbE9LZ0NMUWVCQll1YlVaN1N4TTRRSFhGK0g0S1N1OWpQcTJsM3VMalFlN3BqQlNKY2VtSUdVOVIwVkFFYWlFd0xQemV0SjN2N2VybUY0WDY3QzJ0ZEloUGJiUnRORkxLbzVCWXcwQ0FTWEhCaUVHSFlRaW9BalVHd0pNaUNIYk1SUkt6SGlzRzZIbVZxSWh5VVQzbDVpemFBcXRlb3BMRmplRjg5UnpWQVFVZ1QwR0FkeC9jek9ocFZKU1VnWWZMZmhvWHFPemN4bExVUWpLOHFzeUh0MXVOOS9IVENhUHg4VjlKcGtESGZ0OFBuTjR2WDRxS3l1ajh2TEt1MlF0Z3hGOStDMHlsbTVyTkhLdGxHZ0UxSEpNTk1MYXZpS2dDRGlNQURiZGVKbGl2T1FyNTgwMjVWdVpMTlBJN1c1SEhuZnJtUHNLRWFOc2RwR3FsVmtyTlRXWlV0TlNnbVFvSmNWUFl0TEU0VWttU2t0UE1VUlpVbHhLSlNWbFVvVEhLRnRQWGNGZHFIYWJOVmhRQXcwQ0FTWEhCaUVHSGNTZWh3QVVZV1VsdStlZFo4TTRJNysvbUx6ZTlVeVdPOGp0NmN3UC9xZkZQRERMVXJUTEtoU0dwWmlSa2NxV1lueXEwczFXWlVhR2gxSlN2RlJZV0ZMSmtnUlIybTQ5eGp4V0xWaDNDTVFuOGJvYmwvYWtDRFJ5QkVJS3RwR2ZTS01hdnM5ZlFMNnk1VXhtWGNtZDFMS2FzVU5HZGpsVnRDQlRVcElwTXpPOW1qYXF6azVPOWxCV2xvZnlDNHFvckxUTTlwZ0o5MXpWK20zVnpkWmJMaXoyOHJLdFRQYTcyVG91WU91OWxCSGtKV1pYTXJrOHpjanQ0aVZ1VHhzK3Q4WlBMWTMvRE9wdG1takhpb0FpMERBUndIMi9kVVRKc293WmZaUWhxOUZPakM2MitHcFBqUFplbTJWbThOT1doVlJxQ0ZJSXVmcngyZHVvNzNCQi9sb3FLbHpQUzh2OC9HZ0tXOU51RjErQUpKR2Y3N2Z5WFZjcTkrYVIxNytMWENYcktEbTFNeTh4WjlmM2tHdlZ2NUpqcmVEVHlvcUFJdEJRRVNncjI4Q1dUYnhmNG1DRnowdXB0YlVZSTJHU3lRUlpYcDdQeTcrVk4rdEVLdDlRMHBKY1hqcHljREoxeU9wSmF6ZTFwSTFiZDlQR0xidG9OeThYRnhXVmtKOVBKNFdaSkRrdHlWaVJQcitQdktVNWZKNjdLRFcxSjdtU1lsL2liaWpuakhFb09UWWthZWhZRkFGRm9BSUM2ZW5Xc21aUlVWR0Y5TmdpZkYvUEY5dVhMZXdybkxqSEdJdHIxNzY5S2JaMXk1WllpcHN5YUh2MzdzSkdjNy9SN3kralhqMjhOUDZNZzRuS3ZOU2phMHNxM2wxRU9UOXZwRTI4Wkx6czl4MzBBNGVYcjlwQ20zZms4bEpyR1dVMVQrZUxBS0xDb3Qxc0tmOUN6WnZ2MHlnSlVza3g1bW10QlJXQnBvZkE2V2VNTXkvNGZQMzFOK3ZsNVBmZmYzL1Q3N3g1ODJyVVAzYTB4dU93S3pXV3pUZjc3amVBamg5NW9tbjZrdzgvb3ArWExvdXBHN1NOSmR1U2t0S1l5a3VoaVZQdTV1Vk02eDVwUFBjcUowNjRRNXFva1Y5U3RKbmF0KzVFM1pnVW4zNTVIaDJTMjU0R2RHcGw3cU4yN3RHV2h2VnZUMWVPSFVURmhlWDA5WkljbWoxL05lVnN6YVZ2RnY1R2UvZnFRRDI3ZEtCNVA2Nmh0TXgrTmVxL1Bpc3BPZFluK3RxM0loQkE0TUlMejZlaFE0ZFd3T09EOXorZzl6LzQwS1QxNmR1WGJycnhlbnI0a2VtMFl2bnlDdVVTRmJHUENSYmNpeS8rSzFGZFJXMzNwSk5Hc3BYbHA1cVNZOVNHbzJTa3BzVm1OZllmTUNEWVFxOCt2V01tUjFSQ0gvR1NZN0N6T2czc1pFdlEya2lVNUNxakVVTjYwYWYvWFVrRE96U24wbVIrYk1YTmo5S1V1dWwvdjY2bmpkdDNVN2ZzdG5UZHVBTXBaMGNSRFR0Z0wrcVYzWm9lbWptWFNyMzU1T1psMXVTVVRvNlAvdWpqanFZL0hYY01mVEZuTG4wKzUzTkgyMWR5ZEJST2JVd1JxQmtDSUVaWVorczNiQWcyc0dQNzltQzRyZ01ualJwSmd3WU5vaVZMZmpKZHc0TGJzWDFIa0t6cllqeTRJR2pkMm5wdUVlRkVYeFI0UEc2endTVFN1V0VKOVlDREJsT0xyQ3lUM1Rhd3BJcElsNjdkYU56Wlo1bjB2TnhjK3ZHSFJWVFZVaXMyc2FBdnJ6YytxeFlkM0hYYm5hYWZTRDkzM3pjNVVuSU4wM3k4OHpTUHJWdzNsZnVUNmQ1bmY2S0xqdS9LajZXVTBaZS9iT1JuT2xQcDg5OXlLT2VQWWlvbzl0R0IvVHNUWjFGWllURjFhSmRPZjJhc3h0LzVIcTFhdTVXWFZaUEpXNWJERzNUYU9iNkxGY1FJQjEvSnNZYWkxbXFLUUVOSEFNU1lhQUtJRllQRlAvMUVPUFlmT05CVWVmMzFOeWc5bzNhUE5jVGF0NVFiZHVnUTJoaTRXRUE0MGRqZ3pUZlIzQUVIRDZaOWJkYWl2Undzd1M3ZHVnYVMyT2ZWejA4KytNaGVwRklZZmRXRUhDczFsS0FFTnhYejR4a3BUR1krR2phNEo4MTg3VWRhc3o2SC9ucnBuOGhmdEpPS21kZmYrWFlGblgvaUFEcmtvSjU4emo2K3Y4dTdiMEg0ZkwveDE5ODIwOEpmMWxQekZxbkc4dmRqazA3WkRyWWVyZnUwVGcwYkZxTllqazYxS2UybzVTaElxSzhJTkVBRXVuVHRRbTFidDZFQzI0YVUvZG1pMjdaak8yMVlIN0l5blJvNjJoN0NSSlRKeTZpdnZSRzZ6d2hpUEdQY2FXWWM4K2ZOcDhWTG5IOVpOczQxSTgwaTRENTc5elhMekxLVWU4RUY1OUg2ZFJ0b1E0QXNDNHVMSEQ5L2p5ZjY1MjJ6V2xnV1l5dzR4MUsycXI1aTZTUFJaWktUK1MwK3ZqUnEwY3hEZy90bDBiSyt2Tk8yN2Q1RXpacFRqM1krS2kxejBmU2JoOU12cTNiVFUvOWNTQzdlbk5NaWd5aXJWUVlkYzJoUFdyTnBKei9iV1VCcGFSNWVtc1c5VW43a3c1L1B2clBrQ0d2UmFZdFJzRlZ5RkNUVVZ3UWFJQUtubno2T3VuYnBRdSsvYjkxN1JCajM0V0JsUHZMd280Nk9HT1IwNVZWWDBQSVZLL2dSaU1yT3oxczZNekl5VEpsN3AweDFqSnphdEdsRDQ3bmZ6bnh1ZG9keExGNXN2ZnQ1S0JPMjJSeGtLd0NyOHNtbm5xSHREaTAvNDEycGRlWHFzcSthbkpQUFY4aVdYaG0xYTl1Q3VuYklvSHYvTXB5MjVQbkpUWGxzTmJyNGZxT2ZGcS9Ob3htdnJLUUYzM3hMbDl4Nkc1VXpvZTZWdFp6dnFTYlRIOXNMS0RlWG4rc3M4VEJCc2dYS2cvQTBzbGNDS1RrR1p3N1VBVVJZWDA3N2I4cjQ0MFhWMkhnUzdwNTY4bW16RWVmMDAwOHorYWVkZGlwdDJyaVJrTzZzODdNU1N6ZDkyRWtYeTZvWUY2eFVTWC9paWNjcFBaM05CSWNjeUczYVE0K1k4K3pTdGF1NXIvbGhZQ09TZENGOWorSWRvcU5PR21Vd2VJZ3ZEbXIyaUllMEdzSWI1eGphQlNycG9nLzg5TVZuY3lrbE5ZWDJIM3dnOWU3Ymg4dkNFdklaSDYwaGpQbUxObkEvY3V5Wlo5Q3YvL3VaZmw0V2VSZHJReWZIMGpKZU91VjdpVm5OTXltZDl5Z1Y1aGRRYTM2T01UZS9tSXI4THNwTWMxSEx6QlE2YzBRdmFwZFp5TlpsT2gzWXhVOFp2azdrTHk2bXRJd1VPdm40QTZocnV5eDZlODVTM3BSVHhpOXNkLzdpUXpma3lGeE9xQy8vQ0FudHBJckd0Zjhxd0ttRHJQckZIOG95cEp4RHB3dmxqeDJxMktrS3l5cG4weVlUcngwcGhOb1BoU3pGSG9wYm9VaUVqWEZHU2crdkcwKzhtQlhxbEtuM0UzYklZak5RMnphdEsrMk9sZDJ6MzMvL1BjMmMrVkk4elZkYkZzODVodkNYdVdDOS94UjVzc0ZtMjlhdDFHZnZ2WG1wRU1RSUhFSUVpYTl0NFBvbWhSOEg2ZHE5SzNYcjBkM1VrN3JJYnl6TzdjWWpMVjd5bHNzakp5NituZWpuaC9weEZud2h4NCtrWkxkMTBWN1p6V25FRWNmeW0zTTJtM3VOeGQ0azNzampwZUdIOWFBUlIrNURXYzFTNktmbFcralhOWC93L2NaMEt1UDdrVTY2Ukc3SWNaN0tuVHh6YlVzUlVBU01kUVNDbkQ5L1BvbTFoS1ZJV0ZDSmRpQ0FFR2xZdlZXMHNwd2RBVWh2OGVJbDVuNmp2QUFBUFNBOFpNZ1FzM3ZXT1dJRUNZWUlDNFFIWnhFLzB1WGNoU3hOdHNrUDRXSVJwRlhXdXNDeHJNcFEyVURJOHN3dnY3Y24wSmN0c1VFRmk0cksrUUgrWWxyKyt6WmF2M1VITmMvaWx4Y1VsUEpyK1hqc2ZFRlF6a1Jaemhaa1BsdVhCVVg4amxVM0R4K2ZFY05hSkcva01VU2FWazVMZjk1Q2F6Yit3WVRwNHcwK3NUMG1FdzhRMkpBREozNDhkYXNyMndpWFZhMUpXOTJKeFpaZms3WnFVaWZhYUdyU1ZrM3FhUCtSRWFnSmxqV3BFN2wzU3pGWFZMelJTc0pTdEVqQjZyODFrK1BJRTBjUW5vV3N1YXQ4THVFVzRienY1NGMxanpwT3VjcjlvK1dTa21Kekh4SG4zTHRQSDlQWlNyNy9pT1hYZ2dKczZuREdWVHhYVjhBYXRBak91Z0FJbld1NzloM1k4a25oeHprTzRNNnhCSnNVS0kreFdESzByRWxpVXZIUytyVnJhTldLbFFSTE0wVEFJVEwyK1dCQ2hkcEhLdzNKblhmUm1aU1h1NVV2eUpiUjFHZStvL3R2T0p5eTJtVHlPVE1wK3J4VVVzcjNuL2tlWXhMSFhieVJDWGg1K1p4U1BDbWN4dy85cDdYbVIzOWNOT21KVHlodmR5NDF5MmpPVnFqejU5dGtOdVJZRXpKY1dZVC9BNFhuaDA4cEtTOSt0SHlrMjl1U0pSUjdHc3FFdHhPZWp6SjJKK1hGdCtjaGJFKzN0Nlg5WTBrcTNFcXBpQmZ3czJPR2VMZ1RmTVdQbG85MGUxdjFpMzhCNyt6cjNJa2ZrZzR1MTFuM3dPUi9BcjdkZGNuT2puSy9UYzViZkhzdGhPM3A0ZWR2dis5bTFkdStmUnNIN09Xc2NQaDRyTkw0bGZiRkQrVllJWHU2dmQwUS90aDB0Sjd2Y1dLSDZpR0hIR0srb1lpWEFDQ3RhNWV1NFEyR3hkRStuTDBmS3lYOE56VFhyTDdMeXJ4aGI4ZXhsbzlSN3FoampxWnMzckNFSlZZNDZ4NmpoSzArVVE0RXVYWHpabnJ2clhkc1pXVmVveDlyWExDc0t1SnF0ZFZRZnBOY0dUVGxnUnQ0dVRTZmxpeGVTZHRkT1pUdDNVQnVQeSticG5vQzl3OTV2dkRMeDEwKy9nQzBwNXlTK2JHTlhkdlcwMnZ2eitYOHRqVHpUWDRPY2xzdXBiZzliSEdXOE12SW96OHEwMURPMno2T0JtVTV5bVFWaFdBTkZMTXhmQ0paa3pFMHVlejU4ZzhudnB5dXZZelVSNTZVd3hLS1ZkYnFYL0tRYUsrTGRLa3ZkZTM1a2lZK3lzUFp5MGg5cEVzNTdiOHA0Ly9oaHgvVC9nZnVUNE1PR0VTZG1maXdLMVEyYlZnV2lUVlBTa3BLYU8yNmRaZzQ5TUVIOGl5ZGZXNkY1cE1wRlB5eGw0azIveXd5cUc3K1YxNFN0TGRkbS82dDVkTU9IVHRTUjc1UXdMbCt4SzltdzNpT09mWVlzN1FLVE5MUzBuaXpDTjYxS24yRjkyK1BCd0dvRkVDNzRqRDM4RUp3SzhuYVhJUC9XYVNqbkpTRnhZak5VNnRYcnFEMzMvNFA1N3RvMUppVHFWZWZ2dHhVNk9KQ2RCbmF0NzdkS0hsV1cyVmx1SmNYNmgvbEdwTDc0UDJGZE03bFk2aEY4NVkwOEtEOXFLeGtiOXE5YmlrbDU2MmdGUDZJTTl2M1p2UkpxZW1VeEk5eGJObFpRbzlQKzVwYXRGeE5LemQ1cVhuNk9uN1hhaW5MRElTWVpKWlVmWDdleENVaWMraGttOUNHSEd0U1d4UExQc0dCcUgwaVdRaGp3bG9LTlpTUHlXMmxZVklqTEhtaHEwQ3JMYXNOaEtXTytLaGp0UzE5U2hzaVVhdXU5cS80T3pYL1B2OThMczJkTzVmd25DRWVwNEFDRmhJQ0lVZzRoWmYydnBqN0JTM2hCL1NkbjMrVzRnWXhGeFlXR3FWdXpmalEvTWVPVmxIOHp2ZFAxSmVYVWZGVmpCOS9YRXh2dnZrVzdlRG5PYUZSdjUrL2dNYnhjNVlEQis3SGI2VHBTbGhtamQ2LzlYK0wvK2VxSEdSbmxVRkJGMXMzWmJ4azZPUEhGS3hsUWovZlU0TkR1ZHk4WFpUdDcyTGtndk5mdk9oSHpyRjBCOEk5ZS9jSnRNVmxjM2Vac1NIZjBpVldHOVo0WGR4SE9ST3hFTERwSXVhZnU2Wk9DdUlmYzZVYUZNVEwwVys4NGk0NjZkVEQ2TkFqaHBpZHV0N21nNmtnb3c4bDgwN1daUDRBMS9yWlg5Q0dqK2Z3RzNDYTBTcitoc1hYeTdiUWZvUFRhWERmWFBySEc4WG12cVNMNTR1M05JMDhHYndxd3Zja25YYUozSkJUNzVhalRCaUFKdVFra3o2VVowM0NFTENoV1MrVDIxSlNWZ243UHdYYUNLUUdxMHVkWUlJSmlBS3dpQkZKS0dmOUEwa2JVaU1VbDdhMGY4SEd3azFpaXIvTUZmRUZuMURjd3NxYWYxMjZkRFlLR0dreS8wR1U5bmgyZHFmZ1EvaE96cjhONjllelJWWk1Eenh3bitrUFAzS2hhTzgvUHorZkgrMVliOG80MlQrZk1iK0ZKOE04cGdMeWg1UC9QOXh2ZlBycFoyZ1FQMXJTaGw4cHQ4THEyUHlQb2w3NC8xOGcyN1FSN2NlYW15QXAzR2UwNUZKU1hFTHVqTFJBRmNqSTBnYy9MbHhrdmx1WWxkWFN5S1dFY2JLY240cjUzdWltQUI2NWVibjAxZHpQT2N1U3I5VUgyZ2dVWjYrWSs3RHlXYThGeW9WeTdTRmJKWHR5SFlWWHJjeWxqOTZkUzJlZWRSUWw4UWtVRkpkUlNYa20zMU50d1g0U2RSelZtM3o4U2FwdEMrZFRDejRtNzkrTGV0NXhLNjFjczVuR3BpeWg1Yit1b3JVcmQxSC9nVHRvL3NKV0NSbDFJdCtRNCtyV2RhODZsb0IwQjJVUWNxSUlyTWtrL3hTaC9FZ2htZERpMjh0RVNyUG5JeXovK0ZKVy9QQnkwZUpTWG54N3VVaHA5bnlFdFgreDBDM0ZGQXRtZGd5bHZQaVI4dXhwNFdIRnZ6TCtzQXp4eUloZ1k4Y01hWEFnUm15V0VkekZyMWpXa3FrOUxUd3NmVWg5OGNQTFJZdExlZkZENVN3ZEEwSjZlT3h1T3J4WFlTakxGcHJ3M2lENjd2ZDJuR0tSSTRnUXJsbXpkTDVubG15SWkyOTJtRFQ3RHdqTlNrY2UrZ0tPOG1nSGlGb2VBaEJkaDlwV1dTOC83d2VyVE53aDNiYlNnNk5oaFZaMjg5ZTJvVnYrTTVnelVGZHV1MVFlVCtXYXpxWDAyS3M5L2VPbDYvZ3JIQ25XaDQxNUhQbjVYcjRYNmFWVjYwcjUvbU15dFd2ZmduTDVaUTNiUC8rY3l0YjhRZ1BHbjBlOWhwOUd1M0xYMG5kZjNFSXpaaFRUbW5YT1BSZnIzTmxWM1ZJOVdJNGg0UW9SeWhEdGNVeHMrZWVSL0hCZnJzYkV0K2RIU3JQbkl5ejlTVm54dzh0RmkwdDU4ZTNsSXFYWjh4SFcvaTNsSVZpSkg0NVR0TGlVRjk5ZUxsS2FQUjloeGI4eS9pQTlMRm5HNGdSajhlMTFJcVhaOHhGT1BQNU1LT1pEdXlFeXNvL0I2aDhZeUJJbndpNG0vaEorU2JZSGRCUWNvK2dpYzRGZ0ZlTTgxSU9UNVZQT01Pck5zZ2d0QXJWS3lHOVJFZTdYb1JDWFlaRFFWSFJubFFzMEdyMVlBblBXL0w2RkxybmdNWDRHOVd6YXAzOVhqSnJmbDVwR0xWdjRhR2NCMFZkdmYwM0hIdXlpNWVYN1VPYndFNm1qL3hpaWJyMXA4Zkx2YU9QU3UranhKOUliSlRFQzBqb2l4OEJzQ2dvUkU4T0t5S1FMWnRrQzhzOWpTOUtnSXFBSUtBSXhJWkNjekJZd3JZbGUxdWdnKzhVNjB4Qkh5OHY1MmIzOFFzck14SHRlclh3aFF0RmI0Ym9wU0hQY0pqOEphUG8wdHl5RGVvNzRNWlFpdnRkb2ZZbERpRG5VZTZSaG9yS1VDRFFVakVjcW41aTAzMWYvUVdlZitTaGRlLzFJdXZDU1AzRW5lTll4aWZyM2FVNDlyeDlGM3EwcmFlTnJtK25sSjEraWRoM0tlUU5QSDJyYlloSDlhMWJieEF5b2pscXRJM0swemtZbUZDWWduTFVjSWtLMzBtTDlSVnZtS3M1VXNFOGlhY0dlWm9XdE9zaVhDWWV3dlJ6aTR1enA5ckNWci8wci9qci81UCtvOHY5SHhmOHJLNy91L3YvNDNaK2V6cndNV00zTHdubjRGdWxaeTZxaWx6RE8wbEwrL2hJN0VHVEZzME1NOVVMejMrUmJ5WndEVEhBRUV6Z01ZdVQzakpvMlRXbVRaZ3lEc0hJbW85SVA2c2hTYmFYTU9rdDRiUHFIOU5MTUwyblVxRU5vNkdGOXFVK2ZMdFMrUXhhbFp1OU5ZOFoyb0RVcmh0Q1hzNyttbkk5KzU3TnEzTVFJVUJOTWpqSVI1TjZHOWMrRWlSV3JDMDFDcTQ3VU5NVEtJakRUMENSS0RyY2NuSnRXV3BDRXJlN054RWIvbHRXS0FKZXpWYmZ5OEN2L0JKWWZhcGN6dUMxekhtRjltVXBoYWRxL0Rhc0Fwc0JwejhZL05LRlUvblVuZnp5ZjUvWms4Nk1EYVliNFFsSXcvNWtWZjB3bWZ2REdHcEFkc2tGQ1NIT1poL205NWZtVXlSdDBzSVBXRkJEZHhZV3QvMytqQ0xpR1ZRZDE1YUxKenp0ZnNaa0tTNm15cVFydFd2cFB5cVBQYUU0VVNmMFRvNHh3MTY0Q2V2bmx6ODBoYVJYODVMcjlyRm1GdmgyT0pKZ2N6V3d6azhHYU1LSGxWSnlIekxPSzUxU3hqRlVPRTZtaWt4VHhLK1NHSlFiNzRYUjdsalZKdWFZOU1kQ1FWY2ZLc05jUDlpTjF4QTltVkc3UFh0OWVYUHNQb0dFSFpZL0IzNXI3T0IyVnZ3aTE0cithay9QZnhXVG9kcmRoYXhHN1NRM3FnVTZqZTFqK05HUGdpK1BRL1VHa2NSM0RTejd5bGJ2NERTOEZsSnJpTVk4emVKZ2tUYjY1MzJqdVNnWTZzSWhNK2k1bnNpMHRLZVZuTlMwTFZQUmZhRFFnU2JsbkdVcXRFQW9PQktueVR4S2FWeFhLYXNSeEJCSk1qcFpBZzFmT0VZYVB5WWtENytzTHpVb1VsTWxnVlpMNUtqbG1La3FSd0h5UmFTTmxKZHRxd2RZa0Y2eFVObERKbmk3MWtCYmVwa21URGdLVjdIV2xqclJoZkZ2NVNtVzFmeU1VT3k2Q25XQXBQdEpOMklhbnBNRVBRQmsyZ3dJWmdZTDJmb0p0Y2NDZWpxSndKdC9tQjlPMGYwQVJCTTJPbldCbUZRajgydkNxVkRZZ05IdTYxSlcyeEVlSFNkZ1I2dWRQSWZHR202U2tUSTVuR3ZYaExlZEhMS0JUSUgzNDVqVnQwbEpGdjl4WHh2Y0ErV1VDcHEyQXhSZHhBUHpTYlg2bmFFR2hpd2s0eWJ4RkI4OUNRcSs1OE1KNGJ0Wm4rdUpYcS9FcjBzcDRSeXJ1VzhKSmN5YkNWbWxTRXI5L2xGOUFhcEVsY2dVVXEwU0ZYMU01QUl6SnFOaGFoYklhY1J3QlQxcnEvZzQxR2hJeXp4TXpjZUJid2crZkJGWlp2Rjh3aGQ5RmU5V1ZaOUZGbDV4S0xWcGtPalFXYlVZUlVBU2FHZ0xCQyszQWNpYVdNZ3RtbjBQZWRiTWpRdkg0NDMrajFMMUdtamNSNFVVTE9HUkpOR0tGV2libTVSWFF6SCs4UTg4K080c3RTaWpKNmg2S0Z6S0V2clRyVUFsTGZpMEhwdFVqSWxCTHk5RWlPVXR3SWpBUW85eGp4TVZiS04wYUFTeEZoS3pQbjh5YlAwdEpNYUpvTkZFUlVBUVNpVUI1enRmOG5jSGRSbDlCWjRFY0UrbndJclhMVG5EUjJZZVBwaW4zUHMxdmtDSHExVGFlRjZuYnlkQWVUdVNvbTI3YnRTUkhBR2NuUHdtRC9VQ0M5cmdGc2xuajU2Q1BselN1dlBJY0pVWUxGdjFWQkJTQk9rYkErL096WkQxWVVjY2RjM2UzSFJ0RG4xaXFaVldLNVZ0THo5cjlHT3Bya1ZvaFVJdExKUkNna1pyTkY2dFF4bVJNUkZzK0JHM1Y4Zm5MZVNsMXJCUlVYeEZRQkJRQlJjQ09RRUM5V2dZRmRLdm9VL2dTdGxmUXNKTUllRHJ5WjFocTZpQXM2Nkltc0l6S0RWa2lDd2dPVno2Y1ppMnpCbmFHR1l2U3oydnUrV28xMWhSNHJhY0lLQUo3UEFJcHFXblVvWE0yYi9yaFRUeDh0bVpITFpaK0ErYWswYjhCWTJPUEI2TWVUdER6NWR3WmNYY0xvZGdGQS9MRHpXLzVlZ0MrSUlCRDRuamJ2WVNSanJyckF5L3FqYnR6cmFBSUtBS0tRRFVJUUNlWnc5UDQzdWtwcHpiNGtJSDA4ZCttbVdjc29UUHhxUzc0MEtYaCtsZnFxTzhjQXJWWVZoV0xrTDhBemE5RUVvSUUrZUdCV1JHZ2tDVHl4YUY4NktGWVNWVmZFVkFFRkFGbkVYQjNQc3JaQnV1d3RhU09SeGdqUTNTcUdDQXlCT2hVa0tTNnhDQlFZM0lVb1lBRWNjQ0pEL0pEUG9RS2h6QUVpd05oT1V5bS9pZ0Npb0FpNENBQ3htSU1XSTRwZmM0aWQ1ZFlkcjg0T0FBSG1uSXhNU2IxUHR2b1ZPaFZPU2N4S3FCRDRVVG5PdENsTmhHR1FJMTJxMEpRc0E1RlVJakRpWlVJSHdRcFFoV3l0SmNUNFlhTlI2T0tnQ0tnQ05RWUFlZ1kwUzBJSjNsU0tPUDRsNmwwMWR0VW52TWQrY29pZjZHanhoM1dvdUt1WGJzb1BkMzZlRFRHYXNhYm5FR3U5b2RRYXA5eHZEU0hGd2FFemdkZG1kZllCWHpvWDFNbllKelVZaWhhTlFJQ2NaTWpKaDdJVDRRcGJZb1FKUjNFaUxJNEVFWWRDQk1INGtLc1VsOTlSVUFSVUFTY1FFQjBrUGhKN21SSzZUMk9mRDNIQm5VUytoRVNkYUxQbXJTUnMyUUpkZTdjMlh3N0VqclI0L0dZTisya3BPRE5QNVpxeGprZ0R6NGM5S2pvVkRrL3hDVy9KdVBRT3BFUmlKc2NSVmhvRG1FUmxnaE1TRkFJVVN4SUVTQjhPU0lQU1ZNVkFVVkFFWWdmQWVnajZCWTR1NTZTdU9STEdWTXd4cC9wTTU2Z3dzSWl1djY2cXlram8rTEx0WkdPL016TURMcnUydkV4dG1oWmdiQUVRWXJpOEpGbHBHR000a09uWXV5STQ1QzQvWHdRVnVjc0FuSGZjeFF5Rk1FZ0hpNUVFQ09FS3dKREdJY0kxZGxUME5ZVUFVVkFFUWdoQUwwakIzU1JIRUl1SUNNSngrb1hGeGZUOHVYTDZmNEhIcUxpNHBKZ2ZZU1Joang4S0RyVzlsQk94Z2k5aURIYVNSSm5nelNVQVdGS0hDdHVvbHRGcDZLY091Y1JpQnRWQ0FzT0FvV0RZQ0FrQ2N0eUtkSndZQkpJV1JFczRsTEhWTlFmUlVBUlVBUWNRRUQwa3hBUGZPaW9lRWdyVXRtYmJyeU91bmZ2em8rZ2JRZ1NwQkFqMHBDSE1wSHFSa3ZEdUVCOElFVWhPTE9rR2lCRXFRZFlFSWJlbFBNVG5TcjFISUJPbXdoRHdNVWtWYU85d0NJY3RBZUJnZmdnUUN5andza21IQ0ZDZTNwcGFTbHQzTGlSRGpua0VGTldmeFFCUlVBUmNCSUJVV3ZSL0pyMGhROFdUNzduUGxxM2JqMlRZVmZUeE5xMTY2bGJ0NjUweCswVHpMSnFQTzNPbnorZmV2VG9ZZlNuRUNISUVqb1RQdlFxMHVFUXg3bUFESEdJL2tVWkljeDQrdGF5MVNNUXQrVW9aQ2RYTElqTEVXNFpRbWhTWHE1OEVFZTYxSzkraUZwQ0VWQUVGSUg0RUJEQ2dDLzZSbndobUhqOTVzMmIwY1E3LzhyRTJJMUFpamdRUmhyeTRtMVBkQ0IwSThMd29VTmhQU0ljZmc1QVFIUXR5aU5mOUd0ODZHanBXQkFJM1FtT3BUU1hFWUhJUkVNMWhIRlZnd1BDRXNFaEQwc0dlRU1PaEc0blJxU3BVd1FVQVVVZ1VRaEFMOEdKOVNqeDJ2Um42YjJRdFphVUZMcS9HVys3MEpPaU4xRVgrbEVJRW5IUm8vQ2hMNkZMNFlRUWhWU2RPQy9Uc1A1VVFDQnV5OUdhSEpacEw1WWlsa3hGUUJDWUVDVHlJVlJNQUxrU1FoamxJWEIxaW9BaW9BZ2tHZ0hvSmljTzdFcWRmTTlVV3JObW5iRVlZVFVpakRUa3hkc0g5Q01jZENIMG94eUlJMDkwcEJnVjByNlVGNUtVZGhLTlkxTnJQMjZHZ2lEa1Nrd0VpeXNhQ0VvY2hBY0NGRUtFVUZFUFBoenFTMWpxcUs4SUtBS0tRRU5GQVBjYkowMmVFaVJHTEtYS0Vpc0lFbmtvRTQrRERvU09oTE92cm9seFlkZVRLQWNkR2tuL1Nodng5SzFscTBjZ2JuS0VJT1RLQnNLMWt5S0VpUU5weUVOWUJJYzZrcTdFV0wxZ3RJUWlvQWcwSEFTbVBmUm9CV0xFTTQwNDdBUTU3YUhwY1EwWStsSElEdm9SQjV5UUp2UWw4dUZFZDRyK2xkVTZwS3RMREFKeGt5T0dBYUZDa0JBaURnZ1F2cVJCZ0NnREo4S1ZTWUIwT1V3Qi9WRUVGQUZGb0lFamtKR1JRZnZ1MjgrUUlVaFJuQkFrOHNKZkRpQmxvdm5RbWRDRjRrczVJVVhvVWF6S0lSK0hPTlFSWFl0MEpVaEJ4bGsvN2tjNVFISWlHQ0ZGREFrQ0V5S1VzRnp0NE5FTkNXUDVBSEY4c21yWXNHSE9uazBqYTIzZXZIbTBZY05HT3YxMGZvK2lPa1ZBRVdoU0NIejc3YmY4R0VnM1NrMU5OVHBWVnRtd1d4VTZGSEdRSC9RdHdrS0NDQ05OZEtxZE9Kc1VnQWsrMmJoM3EwSW9jQkNlT0FnSmNlU0p1WSs0L2FvR2ViS3VqckMwSTIzVTFMLzQ0a3RwN3R6UEkxWmZ1M1oxeFBUd3hNV0xsMUJlWGg0ZGVlUVI0VmtKalQvODhLTzBZTUZDR2pObWRQQXRHQW50VUJ0WEJCU0JCb01BbmwyRUUvMEpuU2xwU0JmOWFTZEcwWnRDbEZKZjBoRlg1d3dDY1pPakNBemRJd3loeUJVTTBoQ0hrTEVjRUc1bFFzaEl3MkVYTHVyVjFQbDhmblAxZGU2NVoxZG93dTJPL2RUKzlhK1hDUVE1Wjg3c0NtMGtPbkwvL1ZOcHg0NmRGZjRoRXQybnRxOElLQUlOQXdFeEpEQWE2RTBoUmhnUjh0aUdFQ1B5b1c5Rmgwb2RwRUhmcW5NZWdkZ1pKTkEzQkFGQndRbkpJVzYvK2tFWkhNaUg4T0JRQmtLM0M5bGtPUEN6MTE0OTZLcXJyblNncGNoTjRGemtQQ0tYcUg0SGJxUTJldmJzU2Z3WDBVVXFIMTZ3dWpMVjVZZTNwM0ZGUUJHb093UkVqK0wvRkE3NkV1UW5iOE9SZEJDbGhGRkdkS2dZR05KTzNZMjhhZlFVOTRZY0NBa0NFbUVCSnJFY1FTQnlKWU44aEVXQUVwYzBTVTgwekY5OTlUVWRmZlN4Tkh2Mko4R3VaczE2emFUOS92c2FPdlBNYytqMTE5K2dGU3RXbUxSbm4zMHVXTzZmLzV4SnA1d3lobnIwNkVXWFhubzVMVno0UXpEdmswOCtOZVhuelBtTVJvMDZ4WlNCdjJUSlQ4RXllRm54bENuMzBkQ2h3MHorNmFlZmFTeFVLVEI5K2d5NjRvcUtiL0YvL3ZrWGVKbjFORlArN0xQUHBiZmZma2VLVTA3T1p0UG5PKys4UytlZGQ0RXBnN2JmZXV2dFlCa0VYbjExRmgxMzNBa21IMzU0Zm9YQ0dsRUVGSUY2UVFBNlVLeEhFQngwSkh3eEtrUm5vaHpDNGlNZllYSDJzS1NwWDNzRTRpWkh1V3BCMTdqS0VSOENnNE9nVUFaNVFwWW1nMzhnWUV3RytFNDY5QmwrU0IrNGo5aW5UMSs2OGNiL281MDdkNXAzdXQ1eXl3UTYrZVNUYWErOWV0QzExMTdENURXVU9uWHFTTGZmL2pmNjA1K09Na043NnFtbmFlTEV1K21vbzQ2aXh4K2Z3ZU11cDNIanpxRGZmbHR1OHZQejgybjE2dC9wN3JzbjA0VVhYa0IzM25rN2JkKyt6WkNoS2NBL2p6d3luYkJrZSt1dHQ5RE1tZjh3SHpZZFBmcFVRbDI0clZ1M212R1lDUC9NbVBFWVRacDBENDluQ0QzNTVOK3BhOWV1ZE1NTk54SElFSzZzck5UMGVmMzFOOUpoaHcyamh4K2VSaDA3ZGpMblZsaG9QV09GKzYrMzNub2JqUjU5TXMyYTlZcTVqNHB6eDcxTmRZcUFJdEJ3RUlCRkNEMHBoSWc0OUJoMEYzUW5uT2d4eEtXczVLRWVuUGdtb2orT0lSRDNzcXIwREFIWkxVZ0lEbkVJQ2dJVnNoUkJ3c2VCQ1lBOFNaZjJhdU4vL2ZVM1RIUzlLelJ4d2drbjBEUFBQR25TN3I5L0NoMTc3UEdHZUhDUGI5Q2dnWFRkZFg4MmVZY2ZmcGdobiszYnQzT1pZMHdhaUhEcTFQdnArdXV2bzV0dXVzR2tIWC84Y0NiS285bktmTjJRcUVua253Y2ZoR1U0MUVTeEhITEhIUk5weTVZdDFMNTllMk1sOXU3ZHl4Q3h4K1BtRjYwZlRDdFhyZ3BlVkVnYjhOSG5Rdzg5UWxkZWVRVk5tSENMeVJvNThrUkQ2TEF3c1dsSEhNWTBmdnhWSnJydnZ2dlFpQkdqNk1zdnY2SVRUeHhCeTVZdE0rbm5ubnN1dFc3ZGlvWU1HVUpqeDQ2aERoMDZTSFgxRlFGRm9BRWdJSVlDOUtFUUkvU25rSjNvU2d4VjlLcmR0eE9wMUdrQXA3WEhEQ0Z1Y3BTckd2Z2lLRWxESElMR0lXa0lRNGhDaGdqRGllOEVrdnZzMDY4Q1lhSE5ObTFhQjV0dTFhb1ZQZmJZZERybm5QTk0yaGRmekEzZThBNFdzZ1ZXclZwbFlzODk5enh0MnJRcG1JTmx6YzgrbTF1aHIvNzkrd2Z6Qnc0Y2FNSi8vR0dSNDdoeFkrbm1tMitod3c4L2dvNC8vbmc2NG9qRG1XQ1BOQzhXRGxZS0JGYXVYR2xDNFR0bWp6bm1hTUlTcmxpYktBUnlGOWV2WHo4VGxIRU9Iejdja096aGh4L0pTNnZIY3QrSDBmRGh4eEV3VUtjSUtBSU5Cd0hvU0ZsaHc2aWdFNkZEUlk4aURXSG9UbGwrUlJpSGxFVWI2aEtEUU56a0NNRkFJQ0E5Q0JZT2NUbkNoU2x4cVFOZkJPelVLY0ZLQXdsVTVWcTJ6QXBtdTkxVnJ5YmpPVXk0Z3c4K21HRDVpVHYvL0hOcHdJQUJFalUrcnU3RXdUcTBPenkvdVAvK2crampqMmNUN24zT25Qa2lML0gyb1RmZmZJMnlza0xqUVIydjEzb1J1NzA5cEVzYy94emlQQjVyQ3pqaXdOTHVjS0d3YU5FQyt1aWoyWVRucVA3eWwxdjVUUjZadk1UNmI5cHZ2NHBqdDlmVHNDS2dDTlF0QW1JWkNrSEtibFVRbitoSStJaUxycFgvZCtoZjZGWTQwYWwxTy9vOXY3ZVFaby94WENFSU9BaFdoSWc0d3BLSE9JUW9DaDJDbGUzSktDY3ZCVUM1dW5ENFF2ZWYvM3dkblhUU0tINEYxRnB6ajI3V3JGZjVIRUprVmxKU0VoeEszNzU5VEJpRWUvbmxsd2JUWVRuRzR6WnMyTUQzQkR2eWZjMC9td1AzQS9GYzV2ejVDOWlTSEY2aHFiNTkrNXI0d29VTHpUMUh5ZnorKy9ubVVaV1dMVnVhWnpFbFBacVArNWpBSGtTT0EwdThCeDg4bEplTzMxRnlqQWFhcGlzQzlZQ0FFQjE4a0IxODZFcm9VZWhYaEtGRDVhVUFJRU1oUXVSTDJLNTM2K0UwOXRndTR5WkhDQkRDQU1tSmd4QkZrRWpISVlLRzBNWEtoS0JSRjBKR2VhZmNwazA1WnVuUjNoN2FsM3VJRHo3NEVHR3A4NDAzWHFQTm16ZlR5SkVuMDdQUFBodThid2RyQ3p0V2NXQ2pTM1oydGlHV2UrNjVsemZScEJuckQ3dFEvL3JYMjgwOVNOeUxyTTdoUEMrNjZGSUM2VTZiOW9DNTV3ZExEazZJME40Ry9nR3dzV2ZhdEllTlZZbmwybSsrK1liSC9DYmZ4N3pkWHJUS01EWVNQZmZjQzJZWkdWYnJva1gvTmVWbCtiWEt5cHFwQ0NnQ2RZWUFEQVk0NkFwWWpmWlZOdEdqWW9TZ0hQUW80bkRJRjh0UmZKT2hQNDRoRURjNVFwQndFSWhZaGpJYUlVUUlEazU4cEF0SnduZlM0WHRxSzFhc1lBdXY4bk9PZUVQT2Q5L05vK2VmZjRFZWZmUmh2Zy9aeGh4WFgzMFYzWGZmQS94WXhOSFVyOS9leHFMODVwdHZ6ZjFCYkhUQmhwaTc3cnFMQ2R6RE8wSWY1VjJvMjgyUWtYZk5OZGVZTU00cDNOblRFSDdpaWNjSk8yUFBPT01zVXhRN1lyRUx0VWVQN2hIYnVQUE9POHprZi9UUkdhWlBsTC9sbHIvUVpaZGRFckY4ZVArSVgzZmR0YndMZGh0YnF0ZWJiQ3lwM25ERDlYVHFxYWRHS3E1cGlvQWlVRThJQ05HSkxrVWNZVEVjb0VPZ1EwR2M4SkVQL1l0MGxCRmRpcmdTcFBOQ3JQRzdWVVZJRUF5RUJPRWhEUWZpSWxpRWtZWjhrQ2w4TEt0aXlmSFFRdzkxL294cTBTSjJqUExwQkNjbm1zTFlkK3pZd2RaY1M1NmNOYk4yc2F5TGN3Ni96eGh0cU9oejE2NWR0ZHBFZzNQSnpkM0ZPMVpiRzFsRTYwdlRGUUZGb0g0UStPNjc3NmhMbHk2VWxwWm0va2VoTTBHQUlENkVoUlFsTHFORUhEb0NQaHpDS0svT1dRVGl0aHhGQ1BCQmRIQUk0eEFoUWFoWU1rQWFybWprQ2tldWtGQ3VJVjdwUkNJL25BTXN6dHE0OVBSMDg0eGpyRzJnejlydUxzVzUxSGJjc1k1WHl5a0Npa0Q4Q09EL0hBZU1CcEFpRGtrVC9ZaTRPS1JCZDhJaFhmU3ZsSlZ5Nmp1RFFOWGJOaVAwSWNLQ0x5UW5RaEt6SDNFUklueVFveHlJMndVYm9RdE5VZ1FVQVVWZ2owZkFyamZGR3NSSmk2NjA2MUhvVERsUVJvZ1N2clNEZEhYT0lSQTNPYUpyRUJ3RUltUW9nckxmZ3hUeVJIbms0OEFFa0tVQXhOVXBBb3FBSXRDVUVZQWVCQm1LN29SdVJacWRDSVVrN1dWUVJ3aFZkV2xpWmxDTkdRb0NnYkFnVEhFaVVBaFRCSVo4SVVRSUZIbHlTRDMxRlFGRlFCRm9hZ2hBWDBJWFFqK0s3b1FQSjRZSHdyaE5CU2M2RldIVWdUNjE2MStrcTNNT2dScVJvd2dWd2hLaFlraDI0VUZ3a2ljUDFkc0ZieS9yM09sb1M0cUFJcUFJTkM0RVFKQ2lVeVVNdzBPSUV6NzBxZWhNbEpXNDZOVEdkY2FOWTdSeGs2TmRHQkFXcmx3Z1NCRVk0cmpxRVdzUmNaVERnVEpTRGdKWHB3Z29Bb3BBVTBkQWRDUjBJOExRamFJekVjWWhsaUxTeFVsNUVLVTY1eEVJSVIxajIwSnFFQ0ljaENZQ0UxK1dXMUVXQW9RVElVdmNKT3FQSXFBSUtBSk5GQUhSaGZCRnI0byt0ZXRMZXpraFF0Ry9RcUpORk1LRW5uYmM1QWhoUUZnUUlraFFoQ1VDbG53eCt4R0hJSEdJSUJFV2dTZjA3TFJ4UlVBUlVBUWFLQUtpQTBHRVFuWVlLblFuVnQvRTJmT2dkMFgvb3B5UXFwUlYzemtFNGlaSENFcUVBaUdKZ01YSDBFQ0NFQ0xLNGhDQlFwQWdWTVJWcU00SlVWdFNCQlNCeG9lQWtKN29SK2hRNkZiUm5hSmZ4Y2NaUW05RzByK043K3diL29qakprY0lTcXhEQ0JFT1FvYlF4RXFVZTVESVExZ2M4dFVwQW9xQUlxQUloQkFRdlNnNkZEbGlQQWdSU2h4bGNZZ2VSbGtoV1lUVk9ZZEEzR3dGSVVFWUVBN0NPT1JLQjJHNzBCREdJVTdxaGFkTHZ2cUtnQ0tnQ0RRbEJLQVQ4VFl4K0tKSEVSWmRDaXprc1E2UUlzZ1MrUWhMT1lUVk9ZOUEzS2dLMlVGNGNDSWtDVU40Y0JBY0hBUXVaY1ZIbnVTYlF2cWpDQ2dDaWtBVFF3QzZGUG9ST2hSaDZFN1JseUJFcEl0K1JUcnlSZitLbmtXK3VzUWdFRGV5RUk0SVJBaE9CQ2JDRklFS0NVb2NBb2F6Q3preHA2V3RLZ0tLZ0NMUXNCRVFnaE05S1hvVW80WWhnWHprU1Rta280em9VZEcvU0ZmblBBSnhreU9FQnFHQThDQW94Q1ZOaENoeHlVZDVDQlMrMUVWOWRZcUFJcUFJTkZVRW9COUZIeUtNQTNzMHhHb1VYQ1FQdnVoYjZGT0pvdzExemlNUTJpOGNZOXNpRVBoQ2NBZ0w4VUY0Y0pJR0lXSk5IY1FwNUlrOFdXZVBzVnN0cGdnb0FvckFIb1VBOUNCMG91aFJoS0V2WlVjLzBvVThvUy9sOFE0eFBsQVdaZENPT3VjUmlOdDhneUFnRUJ3UUlnUUZ3Y0dKSUpHR2ZQZ29nM1FSSk1ySkpFQlluU0tnQ0NnQ1RSRUJNUmFnSzBVL2ltNjFreWIwS1BTdS9VQTVsTEhyMkthSVlTTFBPVzdMMFM1UURBeENndEJBZ25BZ1FqaThUeFY1aU9NUWtvUXdwUTJFMVNrQ2lvQWkwRlFSZ082RUhpd3BLYW13SzFYSUQvblFuN0FheFFoQkhoelNSZjlLSEQ3cXFLczlBbkdUb3doR0NBNmtoelNmajI4ZTQyQ0JJYy80ekgwc1d2S1Y4NGVQZWF4bFphVW1uYWNEbDJXcms5UFZLUUtLZ0NMUUZCR0EvaXYzbHJKdXRGYmFlRTB1b0N2NWZtS1NoN3hsSlFZV3M5VHF0M2FxR3YzTE9yYTBwTlFRcHRjWGV1RUtTRkhJVkFteTlqUEt4U1FXMTkxY0ZCZUxEK0hTTFl1cDROdmJ5THQ1UG0reFVyS3J2VWkwQlVWQUVWQUVZa1BBbGR5TVV2WWFTYzBPdjUvY0dlMkNTNitvclFRWkc0YlJTc1ZGamlCRFdJVUNlc24yNVpUMzVsSGtMOTBkclgxTlZ3UVVBVVZBRVVnd0FwNDIrMUdyTTc0a2x6dEZDZElockpOeXpqbWJjR3krNkFJcStmRy9sWnJkK2RBMCt1T3FLOGdmdUtjb1pqdElzdmlucDVRWUt5R21DWXFBSXFBSTFDMEMzdTFMcVhqMWgrYTJGWXdZSE9wcWg0REhYMUljYUlIQkRBUFV1MjRkRlg0MmgxejhKV28vYjdCeHBhZWJxeElRbzlsWXMydEY3WHJYMm9xQUlxQUlLQUtPSU9EZCtadlJ5L1pOT280MDNFUWI4V1MvK1hiVVU4Ly80SDJUbDM3RUVZWVljVFVDVW9UMWlNT1hueGUxcm1Zb0FvcUFJcUFJMUIwQzJPUW9GaU44V2VXRHJ5NStCSkpLbGkybDhzMmJLOVgwRnhjYnF4RVptYU5PRHVZRGRPeFFCVWw2Ly9nam1LNEJSVUFSVUFRVWdmcERBTHBaRG93Q1lYVTFSOEN6N1phL21OcHBnd2RUbTBuM1lJdVRpUmQrUHBmOGhZV1UzTE1YcGV5ekQzbHpjaWlwUTRlZzFWajg4OC9rejg4blNvdlN1UXZQNGxTK1lyRUxUSzlvb21DbnlZcUFJckRISXlDNk1DNDk2TWV6NFZXVG5yUzd4d09ZNEJQMHBBMFpTaVdMZnFEaVJZdW9ZUGJIbERuaVJOTmx3UWNmR0QvenBKT282T3V2YVB2VUtaUjEzZldVZnR4d2MwV1MvODdiTEtMb1F2SWU5Z0w1MngxcTJwQVhCSWlQQjE1em1Hd1BPdWlnQkorZU5xOElLQUtLUU1ORVlNR0NCWlNkblUzSnZLY0R6ekxLVzNJa0RGOXVZK0Urb2lHOVpZK1EvMzh6b3A2UUVDUDh1RWczYW90Tk44UFRadUpkbFB2Qzg1VC94dXRVdW15WkljZlNYMzZoc3RXcktDa3prektPUG9ieTMzekRJT1Rkc01FeTI5bWlMUHBoSWFVTnJtd1oycUcwWGc0UStzWWpCSWJOUEJBNm5QajJPaHBXQkJRQlJhQXBJQUR5U2tsSk1TOVJnUzVFSEQ3SUVxUUloemowcUJnV1ZXbGNJY2FtZ0YxZG5LTjVRNDZuWTBmVGwreGNMZmo0SXhOM3QyMUhzQkJMbGk0MThiSVZ5OG0zYlN1Vjc5akJiM2J3a3N0amtWeWtnVUtnYm43bFVmZ1ZqQkFpWG9ja0w5S05WRi9URkFGRlFCSFlreEZJVFUwMXB5ZTZFS1FJWjNSbmdDd1JoZzRGaVlJd2ZVeWcwZGZyVEhYOWNRZ0JRNDZ3Q09HU21yY3dmdm0yYmNZdlc3dUd5bWIrMDRUeFUvTFRUL3pRLzV1VWNmSXA1SUdRMkFxTTVpQlVDQk0rQklzcm43UzBOSk5XVkZRVXZFcUtWbC9URlFGRlFCSFlreEVBS2NKWUVDTUJKSWc0TEVoWmFzWDdWTVdTaEM0dDNaTUJhV0RuNXRsK3grMVV2UGhITTZ5MElVT00zL0xxYTZqb3F5K0RELzZYc3VWWXpMdGFVL3IzcCtaanhoQzFhVXZ1SGozNHZyQmxVVVk2SjdORXdNS0hBMGxDd0NCSUVid0lQMUxkZU5NVzhmM1NlZDkrUmUzYWRhVFdiZHRTQjk0NDFLNWRPMnJSb2dWbDh0SndSSWNiMnp3SkkyMGFpbGhlRXhVQlJVQVJjQkFCdWNVa09oSGtod01PYWNpSG5yVEhrVzh0dUpway9Va2dBcDVpM295RGgvdWJqenVEc0RrSHp0TzVNelUvKzV4Z3Q4VjhmN0hrdDErcDJjbWp5ZDJob3hGYW0xc21VTjdyYzdsTWJyQ2NQUURod3NHSFFHVTlYSlpaN1JQQlhxOG00WS9lZjR2NjVyMUN5ZXVKVnViNjZNZFNEeFY0VTZuRWxjSHZHMnhEN3JUV2xKelptakt6T2xDTDF1MnBWZXQyMUlQSi9lQ0RENjVKZDFwSEVWQUVGSUZhSTRBVk5laEhXSTZ5eWdhOUtOYWpkSUI4V0pBb0w2OXNrVHoxRTRlQXA4TUwveUEzVzRKNEMwNDBsM2JRd2RUcGpiZHdkemowMlJTMnpsSjY5cUx5bkUzUnFobkJJeE1DRjJjblNudTY1TmZFVDBsSnBYNmQwaWc3aThqTEMvS2VOQ1ptM0E3MUYvSVBIOTcxVkZiaXA2SlNQK1h0OU5IbWRlVzA0Qk12emYxZ0xQM2x6a2VDeXhvMTZUdGFuYTFidDFJNlgzUTBhOVlzV2hGTlZ3U2FOQUkvLy93TFRacDhYMFFNN3J4akF1Mjc3ejRSOCtvajhmVTMzcVkzMzN5SFRqdHRESjArN2xSSGhtQW5SSkNrL1VBSHNCcGhQY3B5cTRRZDZWd2JxUllCajZkanAyb0xvWUNMcjE3RTZoTy91b29nUHdnYzVlRndSWVR2UENMdUZER2lYVHhTa2w5U1JvVmxxVlRLayttWDFTVzBhYWVYVWp6OEZwOXlYc2RQWXV2VnpldjRITWRJMm1lbDBPbUhwOURuUzk2aEtWTmEwWjEzVGtJempyaXZ2dnFhYnJ6eC8yajc5dTJtdlVNT09aaW1UMytVT25XeU5qMDUwb210RVpEd3UrKytSNWRkZG9rdFZZT0tRTU5Ib0h2Mzd0UzllemN6MEFzdnNGYXFacjc0aW9ranJ5RTVFQ01jZktmSVVjZ1F0NXRnSGVLUU5OR2RFaGVkaWJpNnVrSEF1aWtZUjE4aUhQaENlbFZWUnhsY0ljR1g4aEE4d3RKV1ZmVmp5Y04wY2JOeDZtWUNMQzhzb3E5MzdFM0huZkUzOHJoOWxObXNsZmsyV21seFBoVVhGMUNKMTAzdi8vdE8ycnZOSnVyVklZMysvdDRITkhIaTVGaTZxYllNbGo3R2o3K0dKa3k0bGM0Nzd4ekN4cU1iYnJpSjdydnZmcG94NDlGcTY5ZWt3Sll0VytpZWUrNmx5eSsvdENiVnRZNGlVRzhJTkd1V3lYc0NNa3ovL2Z2dmEzeUpJNjhodVhGc0xiN0IxaU44cC9TVzZFRDcvZ3UwRFgwSlorOEhPbFBTR3hJdWUvSllRdXVkY1p3bGhBcEIyWVVYcWJxZERDRmNXSTQ0NEJCMzB2bDlzQXlUYUVldWwvYnFkd0NOT3ZFNE91SDQ0Mm56MnFXMGRONjdsSjZXVENlT0dFRmpUaHBPWFZ0N0tJV0hVVnJtQzQ3SGliRnMzYnFOQ2dvSzZNZ2pqekRuaDgxQTk5OS9IMXQxSWVMNjVKTlBhY3lZMDNqSmFEOG10Q3NKbGg4YzZ0MTg4eTBtZmNTSWtmVDY2OWF6cGNpYnhHOHVtalhyTlFTTmUvNzVGK2loaHg2aDVjdFgwQVVYWEd6U2hnNGRSbDk4OGFVSmYvcnBIRHJsbERHbXJiLzk3WTdnVWpqcVRKNThqOGtiTmVvVXF6SDlWUVFVZ1dvUmdMVTQ2OVVYSGJNYXBVUG9RU3lYeW5PTTBKbElnMjRWL1FwZGkzUXBJM1hWVHl3Q05XWW9DRkRJTDlJUVJiQW9JNFNJU1FCQnl4R3BYazNUVEQ5OE5ybEZQa3B0bGsxNEM4OTMzeSttang0ZlQ2NnZINkxicmo2VnhsODBrczRkTjV4Y3VXdkprNG9IYmZFb2lyWGtXOU4rN2ZXeXN6dlJnQUVENk9LTEw2Ri8vL3RWV3J0MkhiVnUzWW9HRHR6UEZQdmxsMThOSVo1MjJsak9mOWxNOWx0NFl4UGNoQWwvNWZKclRmclZWNDgzUlBuOTk5K2J2RzM4YU0zdTNmeXF2b0RidlhzMzdkeTVnM3IwNkU3MzNqdlpwTDd5eXIvTUJpTVE1bVdYWFVIbm4zOGVJVzN4NGlVMGJkckRwc3l1WFR2cHVlZGVvSXN1dXBBdDJVZWtPZlVWQVVXZ0hoQ0Fqb1F1aEg0VU1oUzlpU1ZXMGEreVl4VTZWMTNkSVJEM3NpcUdCZ0dDNkVTUWtZWUx3VW8rN2pQSzFSREtRdkNPQ3hwcnEveFcraDBsYnVyZDcwRENBN1o3OSsxQkoxenpCRFZ2bGtMbmI4cmhaYzRDV3JsNkV6VXIraCtmUklvWk5nL1RVZmZpaS8rZ0o1OThtaTIwZTQwMWVOQkJnOWw2bkVxOWUvZW1MNy84a2s0NDRRUW1ybk5Obnc4L1BJMSsvSEV4azJRNS9lYy83OUhISDM5SSsrelRqd1lOR2tnLy9MQ0k1c3o1aklZT3RYWVFSeG9rZHE5MTdkckZaUFhzMmRQNG4zMzJHUjF6ek5FMGN1UklFNy91dW12b3R0dHU1K05XRXovdnZITnA3RmhuTmhTWUJ2VkhFV2dDQ0dCRGppeXJPblhQVVdBVGdvUVBCN0lVS3hHNkV1blF0NDdyVEJtQStoRVJpUHRTUkFndlltdTJSQ2tIa29SUWhSeVJMaGFrclhpdGc0YmttQ0IzRkx0cDBhS0Y5UEdIYjlFUDg3K2dMdDE3c2lYWmljNjUrRWE2NXNhN2FleVpsMUthaXkxR0prVWVpdU91VFpzMmRQdnRmNlgvL2U4bmV1dXROL2hjZlhUVlZkZVlmbGF1WEVWOSsvWUo5dG1xVlN0RFpCczNialJwc0FURjllN2RpMWFzV0NYUm1QM1pzeitsdVhNLzV5WFZBZWE0NG9yeFpuT1EvTE8xYTljMjVyYTBvQ0tRU0FUV3JGbG5WbGQ2MkRiZklJd1ZGK1ExSkFkaWhCUGZ5YkdKam9SdVJCaGtLRG9UWVJ3Z3pPb01FaWZIcEcyeEVSY3ZDQkFVSElSWW5STWhpOEFSRjlLc3JtNjgrV1kwTGo5dDJPbW5wUzlOcEZ3MnFQSkwrS01odkVsbjZXWXZUZmo3bHpSa3lJSDB5MC9mVW9jMEprY1huN3EvTE41dXFpeS9ldlZxV3JCZ0laMTExcG5tUEFjUFBwQ1hSMitpYzg4OTMweHM3TXhidFdwMXNBMXM0Tm5Nbnd2cjBLRzlTZnZqankwa0JMbUpMVjNaeVlkL2pGMjdkZ1hyWVZrMW1qdjY2S09NOVRsMTZyM1JpbWk2SXRBZ0VMaDcwaFFxNVBjMHIyRXl2SHZTMU9DWUNnb0srUkdQS2ZUQzgwOEYwK283WU4rUTQ5UllSQmZDRndMRS96cUlVZlFzNG5EUW9VS2VUdld2N1ZTTlFOeVdvMWlBRUZwVkJDbkVpUElvaDBPdWhrVFFWUTh0amx5ZVhHN3VwN3pFUzIyNzdrV1RYdmllVHB2MEtWMzB3R2QwMXRSUGFlcEw4M2lUekRCZWFrMmp3cnd0MURLRFgrVExIQytUTTQ2ZXFpeWFrWkZCdDk1NkcyLzNmc3M4c3BLYm0wdXZ2Zlk2NFhFTzREVnMyREI2KysxM0NJOTdnT0N3OUlyZHJIaXQzckJoaC9JbW00Y0pkWll1WFVZdnZ2aVNTVU9ISU13NWMrWVFDSFBObXJYY3hydkJjY0Q2aE1POVJWeFpZaG4ybFZmK1RmUG5MekQzWFo5NTVsbTY5TkxMZytVMW9BZzBGQVI2OU9qR3F4djllRGgrTTY4eHR4RkdtbHdZTnBTeEptSkRqdWdmNkVxN0xzWC9NWlpUeGRuenBJN2txWjg0QkVJU2lMRVBDQXJDZzBDckVwU2RGRUVNS0MvMUpCNWpsekVVczY2cXluMSt5bUVESzcrb21ES1NVN2xQRUNDVGM2bVhQdjMwTTlxWnU1dnlWcytsam4zNDdUbGxzaG1uZWdzNGhnR1lJaDM1QmU2UFB6N0RFT1JOTjkxczBuQVA4YW1ubmpSaFdKS1RKMDh5aElqbklQdjA2VU5QUFBHNHlacysvUkc2NXBwcmVmUE9BZWFWZDFkY2NSbU5HSEdDeVR2NzdMUG9QWDdrNU5CRER5TXMyK0tlcEdEZm1kOW1kT0tKSTJqMDZGUHA2YWVmTkhVbVRyeUROd1ZkYXU1NWR1dldqUjU3YkxwcFIzOFVnWWFFd01RNy94b2NEcXhJT0h0YU1ITVBEUWpwUVIvaS94a0hkQ1QyRWlCUDB1Ui9IVEJJblQwVWtnWjFXbkdUSXdRbHhCZkxtZUJlbDF3Rm9SNUkwbW1IQ1pXY3pFc1RTU2swck8xYSt2VUZmczBkYkdMbVBabGtTWnpBRkUybjlFeWpwSlEwU3VibDFyUVV2UGczYmdpcUhQN0pKNTlFbzBhTk5OK3JoQ1VwbHAxVXV1Q0M4OHlHSEN3bjJkLzcycjU5ZTM1OFk1WjVOaEtiaVlDVk9PVE5tVFBiV0p1b1k4OURtYWVlZXNJOHJpRTRYM0xKeFV5T0Y1bnllTCtzT0JDek9rVkFFWWdmZ1VSdXlKSC9aK2hHRUNXYzZFbm9OanNoMm9reS9yUFFHdkVnRURjelFHaENPTlYxQkVIYWhTbjF3dE9yYTZlNi9KNjkrdERtSldYVXZZT0wvdFF2blNpVmQ5cEUzR3pqb3RJQ0h4VVVlL25OT1M3YW5sOU91WG01MVRVZmR6NG1PeXk2YUE3bmJ5ZEdlem04Y2k2YWE5NjhlYlNzNEF1S3BRRDZzQk9qcEt1dkNDZ0M4U01nRzNIZ083bGJGVG9SZXc5d1lRdGlSRndPaVNNUFphQlhrS2V1YmhDSW14eUY3T1RLcHJwaFFzQlNWbndSZm5WMVk4MC80OHp6YU5yUDM5UFdIOTQzcjR6YlZjQ3ZreXYyVVI0ZjIvTjlIUGJUcm9KeUt2SHp1d3FKRDM2TUl6bTFHZms5YVhUNEVkRWZsWWkxZnkybkNDZ0N0VU1BcXl3TjJTVnFRdzcwSTBnUGV0VmFBYk0rZEN3dkpSZGRpWElnU0hWMWgwQ055QkhDaENDcmNpSlVsSkh5RUREcTRSQ1NyYXFOV0xpYkdCQUFBQVJyU1VSQlZQTXdrVzY5NTBsNjhNR2VORy9lUFBPNXFyYmQyNXI3YzN2eko2eGF0bXhaNGNqS3lqS2JZTEI4aVRHcFV3UVVnZnBGNE9yeFY5VHZBS3JwSGRhaWt4WWp1aE1kS3JyU3JoUEZrRUFhd3RDaGNQWXlKa0YvRW9aQTNPUUlRVUdZSXF5cVJtWVhMRWdJOXgrbGJpejFxMm83UEEvdFQ1aGd2VzBtUEUvamlvQWkwTEFSa0hlcU51eFJPanM2NkVmUmh3ampnSTZVUFFkMmdwUjhsRmRYTndqRVRZNFFFb1FtZ29zMlRKU0R3M281cnBEc2RaQ0hKUUlWZERUME5GMFJVQVQyZEFTZ0I2RWJ4VkJBV0l3SStFZ1g4b1MrRkoyNnArUFNVTTZ2UnVRb3dxenVKQ0JzSEhBUXRoQWtybzVFOE5XMW9mbUtnQ0tnQ095SkNNaEtHa2dQK2hDK0hHSkJnaHhGaCs2SkdEVGtjNHFiSENHb1dDdytsRXRtZ1l1RktUZVRVUmRwbUFTeHROT1F3ZE94S1FLS2dDSlFVd1NFRktFSDhmNXBlUlFMY1pDbGtDTDBKZUxRb2FKUGE5cW4xb3NkZ2JqSkVSWWdISVJabFhPVjVwR3ZjSXNoUVVPR1hCaFhRM0JKV0NJbzJVN2UvTTBtcmorS2dDS2dDRFExQktBRGZZVnA1T05iVDhaaVRPYWRxcVZzUFVMSDhsSEdwQWlIUEJOaTBuU1ZGelkxbU9ydGZPTW1SNHhVcm15cUdyWC91NnY1c1ltS1RoNXJUK1hrN256c1dGSXhYMk9LZ0NLZ0NEUVZCSHJpUkplRnpsYjBwV1ZDaE5JMVZEOElDRi9GM0x1WStyaWFVYWNJS0FLS2dDS2dDT3lKQ01STmpsajdodFA3aFh2aWROQnpVZ1FVQVVWQUVRQUNjWk1qTEVZUW95SEhwQnF0eWlyeWlvQWlvQWdvQWc0ajRISmJIM0IzdU5rbTIxemM1QWhTeEtZY0hLNVcrelJaNFBURUZRRkZRQkZvU0Fna3NUNlcyMTNpTjZUeE5iYXh4RTJPT0VHNTc1alMveXB5cGJkcmJPZXM0MVVFRkFGRllJOUN3TjF4R0NWM0cyN09TWW5SR2RHNjJCS002WDFFS0NhSFBMeUtSelJLZDY2aTBrVlRxZnlQK2Z5ZGxZcVBkNFEzYlkranJqelg0OHlwYUN1S2dDS2dDRFFlQktCSFpROEhSaDJKMUNLbDJjL1FsZEtDM04xR1VQcmdXOG1kMnR5MFoxYjErUGFYdEYxZEcvYjJOQnhDSUM1eVJEVVFuRHl2aUlkU0VRYlJTVHA4SExBdXc4TkNxbmhHTWljbmh3NDY2S0RRU0RTa0NDZ0Npa0FUUW1EQmdnV1VuWjF0UGpjbnQ2cEFhQktHRDkyS05CelFwMGl6K3lBK3BNSFFrSExpSTArSnNlWVRLdVlkTlFCWnlBN2dpK1dIZENGQ2hJVXNJVEI3WElTTHNzaURFNy9tdzllYWlvQWlvQWcwVGdTZ0g1UDV3WC9vUWRHWDhKRUcvUW9uZVhhU1JEMGMwS24yc0owVUd5Y2lEV3ZVTVpPakRGdUlFVVFwQWtKWWhJZlBSeUVNa2hUQm9TN0t3S0crQ0J5K09rVkFFVkFFbWlJQzBKVncwSU93L0VDS2NOQ2Jka3NRYVZJVytoTU9PdForVzhwT2pIYTlhd3JyVDQwUWlJc2NBVHFFQWgrQ0ZDdFFMRXFrd3ducENVR2lMTUw0RkF2cUZ4VVZtVGFrWEkxR3JwVVVBVVZBRVdqRUNJRGNoQmh4R3RDamlJdCtSUmg2RThTSVBCQWc4c0tQU0hsb1QvUXh3dXJpUnlBdWNrVHpBRHljREVGK0VEUUVDZklEYWNxVkQ4SklGNEpFWFlSeEtEbkdMekN0b1Fnb0Fuc0dBbUpjUUtkQ0g0cjFoN05ER25RcGlCRmhISEIyblJsT2xzaVhjdUlqVFYzTkVQaC84RTY0N2lkQ2lDc0FBQUFBU1VWT1JLNUNZSUk9XCIiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCJ2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyAob2JqKSA9PiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIDogKG9iaikgPT4gKG9iai5fX3Byb3RvX18pO1xudmFyIGxlYWZQcm90b3R5cGVzO1xuLy8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuLy8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vLyBtb2RlICYgMTY6IHJldHVybiB2YWx1ZSB3aGVuIGl0J3MgUHJvbWlzZS1saWtlXG4vLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuXHRpZihtb2RlICYgMSkgdmFsdWUgPSB0aGlzKHZhbHVlKTtcblx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcblx0aWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuXHRcdGlmKChtb2RlICYgNCkgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmKChtb2RlICYgMTYpICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdH1cblx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcblx0dmFyIGRlZiA9IHt9O1xuXHRsZWFmUHJvdG90eXBlcyA9IGxlYWZQcm90b3R5cGVzIHx8IFtudWxsLCBnZXRQcm90byh7fSksIGdldFByb3RvKFtdKSwgZ2V0UHJvdG8oZ2V0UHJvdG8pXTtcblx0Zm9yKHZhciBjdXJyZW50ID0gbW9kZSAmIDIgJiYgdmFsdWU7IHR5cGVvZiBjdXJyZW50ID09ICdvYmplY3QnICYmICF+bGVhZlByb3RvdHlwZXMuaW5kZXhPZihjdXJyZW50KTsgY3VycmVudCA9IGdldFByb3RvKGN1cnJlbnQpKSB7XG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCkuZm9yRWFjaCgoa2V5KSA9PiAoZGVmW2tleV0gPSAoKSA9PiAodmFsdWVba2V5XSkpKTtcblx0fVxuXHRkZWZbJ2RlZmF1bHQnXSA9ICgpID0+ICh2YWx1ZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChucywgZGVmKTtcblx0cmV0dXJuIG5zO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18uaG1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUgPSBPYmplY3QuY3JlYXRlKG1vZHVsZSk7XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgJ2V4cG9ydHMnLCB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRzZXQ6ICgpID0+IHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignRVMgTW9kdWxlcyBtYXkgbm90IGFzc2lnbiBtb2R1bGUuZXhwb3J0cyBvciBleHBvcnRzLiosIFVzZSBFU00gZXhwb3J0IHN5bnRheCwgaW5zdGVhZDogJyArIG1vZHVsZS5pZCk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImNvbnRlbnRfc2NyaXB0XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2Nocm9tZV9leHRlbnNpb25fdHlwZXNjcmlwdF9zdGFydGVyXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2Nocm9tZV9leHRlbnNpb25fdHlwZXNjcmlwdF9zdGFydGVyXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9jb250ZW50U2NyaXB0L2luZGV4LnRzeFwiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9