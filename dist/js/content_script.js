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
function Images(props) {
    const [images, setImages] = (0, react_1.useState)([]);
    const [imageIndex, setImageIndex] = (0, react_1.useState)(0);
    const [showControl, setShowControl] = (0, react_1.useState)(false);
    const [changeImage, setChangeImageStatus] = (0, react_1.useState)(false);
    // const [searchImageIsLoading, setSearchImageIsLoading] = useState(false)
    const userInfo = (0, userInfo_1.useUserInfoContext)();
    // const [currentURL, setCurrentURL] = useState<string>();
    const inputElement = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        setImages(props.images);
        setImageIndex(0);
    }, [props.images]);
    (0, react_1.useEffect)(() => {
        var _a;
        // console.log(inputElement);
        // console.log(inputElement.current);
        // console.log(inputElement.current?.input);
        if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.verified) {
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
        if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.verified) {
            let inputValue = (_b = (_a = inputElement.current) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.value;
            if (inputValue && inputValue !== '') {
                props.getUnsplashImages(inputValue);
                setChangeImageStatus(false);
                // amplitude.track('handleSearchImage');
                webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'handleSearchImage' });
            }
        }
        else {
            alert('Is not verified');
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
        if (e.type === 'mouseenter') {
            setShowControl(true);
        }
        if (e.type === 'mouseleave') {
            setShowControl(false);
            // setShowControl(true)
        }
    };
    return (react_1.default.createElement("div", { className: "images", style: {
            position: 'relative',
            lineHeight: '0'
            // paddingBottom: '8px'
        } },
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", { onMouseEnter: handleImagesBoxHover, onMouseLeave: handleImagesBoxHover },
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
                showControl &&
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
                                            backgroundColor: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.verified) === false ? 'rgba(255, 255, 255, 0.9)' : '',
                                            width: '100%',
                                            paddingRight: '2px'
                                        }, suffix: react_1.default.createElement(ProTag_1.ProTag, null), disabled: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.verified), prefix: react_1.default.createElement(icons_1.SearchOutlined, null), placeholder: "Search images", onKeyDown: handleSearchInput, size: "small", ref: inputElement, onPressEnter: handleSearchBtnClick })),
                                react_1.default.createElement("div", { style: {
                                        display: 'flex',
                                        alignItems: 'center'
                                    } },
                                    react_1.default.createElement(antd_1.Button, { disabled: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.verified), type: "text", size: "small", style: { color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', opacity: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.verified) ? '0.7' : '1' }, onClick: handleSearchBtnClick, icon: react_1.default.createElement(icons_1.CheckOutlined, null) }),
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
                                } },
                                "Photo by ",
                                react_1.default.createElement("a", { style: { textDecoration: 'underline', padding: '0 2px' }, target: '_blank', href: "https://unsplash.com/@" + images[imageIndex].user.username + "?utm_source=Scouter&utm_medium=referral" }, images[imageIndex].user.name),
                                " on ",
                                react_1.default.createElement("a", { style: { textDecoration: 'underline', padding: '0 2px' }, target: '_blank', href: "https://unsplash.com/?utm_source=Scouter&utm_medium=referral" }, "Unsplash")))))));
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
const content_script_1 = __webpack_require__(/*! ../content_script */ "./src/content_script.tsx");
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
            (0, content_script_1.pinPopupCard)(false);
            setIsPin(false);
            // amplitude.track('pinPopupCard');
        }
        else {
            (0, content_script_1.pinPopupCard)(true);
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
        // 如果上一个 Prompt 是不显示图片，且当前 Prompt 需要显示图片，则本次任务需要渲染图片，否则不重新渲染图片
        if (props.lastExecutedPrompt.getUnsplashImages !== true && data.getUnsplashImages) {
            props.handleMenuItemClick(data);
        }
        else {
            props.handleMenuItemClick(data, true, false);
        }
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
                    cursor: 'move',
                    position: 'absolute',
                    width: '100%', top: 0,
                    background: 'white',
                    zIndex: 9
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
                            setImages(imgs);
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
    });
    return (react_1.default.createElement("div", { className: 'messages', style: {
            lineHeight: '1.8',
            wordWrap: 'break-word',
            margin: '0.4em 0'
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
        if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.verified) {
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
                cursor: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.verified) ? 'not-allowed' : '',
                opacity: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.verified) ? '0.7' : '1',
            } },
            react_1.default.createElement(PromptButton, { disable: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.verified), handleMenuItemClick: () => {
                    const p = (0, util_1.getDefaultPrompt)(props.followUpData.keyWord);
                    handleMenuItemClick(p);
                } }, "Default"),
            props.promptList.map((item) => {
                // return <button onClick={() => handleMenuItemClick(item)}>{item.title}</button>
                return react_1.default.createElement(PromptButton, { disable: !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.verified), handleMenuItemClick: () => handleMenuItemClick(item) }, item.title);
            }))));
}
exports.PromptList = PromptList;
const StyledButton = styled_components_1.default.button `

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
        try {
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
                paddingBottom: '6px',
                margin: '8px 0',
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
const content_script_1 = __webpack_require__(/*! ../content_script */ "./src/content_script.tsx");
const Nav_1 = __webpack_require__(/*! ../Components/Nav */ "./src/Components/Nav.tsx");
const CustomPromptForm_1 = __webpack_require__(/*! ../Components/CustomPromptForm */ "./src/Components/CustomPromptForm.tsx");
const Message_1 = __webpack_require__(/*! ./Message */ "./src/PopupCard/Message.tsx");
const PromptList_1 = __webpack_require__(/*! ./PromptList */ "./src/PopupCard/PromptList.tsx");
const Selection_1 = __webpack_require__(/*! ./Selection */ "./src/PopupCard/Selection.tsx");
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const icons_1 = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
const locale_1 = __webpack_require__(/*! ../lib/locale */ "./src/lib/locale.ts");
const util_1 = __webpack_require__(/*! ./util */ "./src/PopupCard/util.ts");
let currentLanguage;
let targetLanguage;
let ankiCards;
(0, util_1.getAnkiCards)().then((cards) => {
    ankiCards = cards;
}).catch((error) => {
    // console.log(error);
});
const { TextArea } = antd_1.Input;
// const AnkiContext = createContext(null);
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
    const [addToAnkiStatus, setAddToAnkiStatus] = (0, react_1.useState)({ 'status': 'standby', 'noteId': 0 });
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
    let Lang = (0, locale_1.useCurrentLanguage)();
    currentLanguage = Lang['current']['name'];
    targetLanguage = Lang['target']['name'];
    // const userInfo = useUserInfoContext()
    // console.log('userInfo:');
    // console.log(userInfo);
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
                    executivePrompt({ 'title': 'Default', 'getUnsplashImages': true, 'userPrompt': `Word:"{{keyWord}}", sentence: "{{sentence}}"`, 'id': 'Default' });
                }
                else {
                    // 执行 Prompt、获取 Unsplash 图片
                    executivePrompt(item.lastExecutedPrompt);
                }
            });
        }
        else {
            // 不执行任何 Prompt，由用户自行选择
            // console.log('不执行任何 Prompt，由用户自行选择');
            // 执行默认 Prompt、获取 Unsplash 图片
            executivePrompt({ 'title': 'Default', 'getUnsplashImages': true, 'userPrompt': `Word:"{{keyWord}}", sentence: "{{sentence}}"`, 'id': 'Default' }, false);
            setIsOpenMenu(true);
        }
        // 设置窗口的默认位置、添加滚动事件，让消息列表自动滚动到底部
        (0, util_1.windowInitialization)({ 'isPin': props.isPin, 'windowElement': windowElement, 'selection': props.selection, 'messagesList': messagesList });
    }, [props]);
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
        let showImagesBox = true;
        if (prompt.getUnsplashImages && needToRunPrompt) {
            // 如果当前 Prompt 需要显示图片，且当前需要立即执行 Prompt
            showImagesBox = true;
        }
        else {
            showImagesBox = false;
        }
        if (needToRunPrompt) {
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
            if (prompt.id == 'Default') {
                p = (0, util_1.getDefaultPrompt)(keyWord)['userPrompt'];
            }
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
                        const updatedLastMessage = Object.assign(Object.assign({}, lastMessage), { chatId: msg.chatId, content: msg.content, loading: false, status: 'invalid_api_key', prompt: prompt[0]['content'], images: [] });
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
        var _a, _b, _c;
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
            // 设置图片的尺寸、样式
            if (doc.getElementsByClassName('imageBox').length > 0) {
                let img = doc.getElementsByClassName('imageBox')[0].getElementsByTagName('img')[0];
                img.width = 0;
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
                unsplash_download_location = (_c = windowElement.current.getElementsByClassName('images')[0].getElementsByTagName('img')[0].parentElement) === null || _c === void 0 ? void 0 : _c.getAttribute('data-downloadlocation');
            }
            // console.log(images);
            // 处理样式，避免 Anki 内显示异常
            images = images.replace(/style=/gi, '');
            images = images.replace(/width/gi, '');
        }
        const cardStyle = `<style>

    .sentence span{
      opacity:0.75;
      text-align: left;
    }
    img {
      width:auto;
    }
    .ankiSpace {
      color:#F08A24;
    }
    .keyWord {
      color:#F08A24;
    }

    table {
      border: 1px solid #ccc;
      border-collapse: collapse;
      margin:0;
      padding:0;
      width: 100%;
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
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    </style>
    `;
        // 请求 background 将数据保存到 Anki
        // 常规类型
        let ankiBack = '<p class="sentence"> <span>' + stc + '</span><a href="' + window.location.href + '">[Source]</a></p>' + container;
        if (keyWord.length > 20) {
            // 如果选中的符号长度大于 20（说明是句子）则不显示上下文句子，然后将来源链接放到尾部
            ankiBack = container + '<p class="sentence" <span>' + stc + '</span><a href="' + window.location.href + '">[Source]</a></p>';
        }
        let p = {
            "note": {
                "deckName": deckName,
                "modelName": modelName,
                "fields": {
                    [front]: keyWord,
                    [back]: cardStyle + ankiBack
                },
                "tags": [
                    "Scouter"
                ]
            }
        };
        // 完形填空类型
        if (container.indexOf('class="ankiSpace"') >= 0 || container.indexOf('{{c') >= 0) {
            let newFront;
            newFront = '<p>' + ScouterSelection + '</p>' + cardStyle + '<p class="sentence">' + stc + '<a href="' + window.location.href + '">[Source]</a></p>' + container;
            if (keyWord.length > 20) {
                // 如果选中的符号长度大于 20（说明是句子）则不显示上下文句子，然后将来源链接放到尾部
                newFront = '<p>' + ScouterSelection + '</p>' + cardStyle + container + '<p class="sentence">' + stc + '<a href="' + window.location.href + '">[Source]</a></p>';
            }
            p = {
                "note": {
                    "deckName": deckName,
                    "modelName": modelName,
                    "fields": {
                        [front]: newFront,
                        [back]: ''
                    },
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
        var _a;
        // 根据是否为完形填空申请不同的卡片模板
        const container = (_a = windowElement.current) === null || _a === void 0 ? void 0 : _a.getElementsByClassName('messages')[0].innerHTML;
        let isAnkiSpace = false;
        if (container) {
            if (container.indexOf('class="ankiSpace"') >= 0 || container.indexOf('{{c') >= 0) {
                isAnkiSpace = true;
            }
        }
        setAddToAnkiStatus({ 'status': 'loading', 'noteId': 0 });
        // 先预处理 Anki 的 model
        let sending = webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'setModel', 'messages': { 'isAnkiSpace': isAnkiSpace }, });
        sending.then((message) => {
            if (message.result == 'success') {
                // 添加到 Anki 中
                addToAnki(message.data.defaultDeckName, message.data.modelName, message.data.field1, message.data.field2);
            }
            else {
                // 反馈错误信息
                alert(message.error);
                setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 });
            }
        }, () => {
            //error
        });
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
        (0, content_script_1.setDonotClosePopupCard)(data.isOpen);
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
        react_1.default.createElement("div", { id: "LearningEnglish2023", ref: windowElement, style: {
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

.contextBox * {
  cursor: default;
  padding: 2px;
}

.ankiSpaceButtonBox {
  display: flex;
  flex-direction: row;
  margin-right: 8px;
  border-right: 1px solid rgba(5, 5, 5, .12);
  padding-right: 10px;
}

.setAnkiSpaceButton:first-of-type {
  margin-right:8px;
}

// .lookUpButton {
//   width: 18px;
//   height: 18px;
//   background-size: contain;
//   background-repeat: no-repeat;
//   background-position: center;
// }

.ankiSpaceButtonBox *:hover {
  
  background-color: rgba(0,0,59,0.051);
  border-radius: 2px;

}

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
  font-weight: bold;
}

#LearningEnglish2023 h1{
  font-size:20px;
}
#LearningEnglish2023 h2{
  font-size:17px;
}

#LearningEnglish2023 {
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
}

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

#LearningEnglish2023 #ScouterNav,#LearningEnglish2023 #ScouterSelection, #LearningEnglish2023 .messages>div  {
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
display: flex;
justify-content: start;
align-items: center;
padding-top: 10px;
padding-bottom: 10px;
border-bottom: 1px solid rgba(5, 5, 5, .06);
user-select: none;
}

#LearningEnglish2023 #ScouterNav img {
width: auto;
height: 24px;
margin-right: 6px;
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

/***/ "./src/content_script.tsx":
/*!********************************!*\
  !*** ./src/content_script.tsx ***!
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
const PopupCard_1 = __webpack_require__(/*! ./PopupCard */ "./src/PopupCard/index.tsx");
const cssinjs_1 = __webpack_require__(/*! @ant-design/cssinjs */ "./node_modules/@ant-design/cssinjs/es/index.js");
const styled_components_1 = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
const lang_1 = __webpack_require__(/*! ./lib/lang */ "./src/lib/lang.ts");
const locale_1 = __webpack_require__(/*! ./lib/locale */ "./src/lib/locale.ts");
const userInfo_1 = __webpack_require__(/*! ./lib/userInfo */ "./src/lib/userInfo.ts");
const util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
const style_1 = __webpack_require__(/*! ./PopupCard/style */ "./src/PopupCard/style.ts");
const icon128_png_1 = __importDefault(__webpack_require__(/*! ./assets/icon128.png */ "./src/assets/icon128.png"));
const styled_components_2 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
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
let USER_INFO;
const thisGetUserInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    USER_INFO = yield (0, util_1.getUserInfo)();
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
                react_1.default.createElement(userInfo_1.UserInfoContext.Provider, { value: USER_INFO },
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
            if (selection && (selection === null || selection === void 0 ? void 0 : selection.keyWord.length) > 0) {
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
            if (messagesBox === selectedText.baseNode.parentNode || (messagesBox === null || messagesBox === void 0 ? void 0 : messagesBox.contains(selectedText.baseNode.parentNode))) {
                //在 messages 容器内操作，则显示操作按钮
                isInMessages = true;
            }
            if (PopupCardContainer && selectedTextString.length > 0 && !container.querySelector('.contextBox2')) {
                let contextBox2 = document.createElement('div');
                contextBox2.className = 'contextBox2';
                contextBox2.style.position = 'relative';
                PopupCardContainer.appendChild(contextBox2);
                let range = selectedText.getRangeAt(0);
                react_dom_1.default.render(react_1.default.createElement(styled_components_1.StyleSheetManager, { target: shadowRoot },
                    react_1.default.createElement(ToolBar, { selectedText: selectedText.getRangeAt(0).getBoundingClientRect(), selectedTextString: selectedTextString, range: range })), contextBox2);
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
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    &:hover {
      opacity: 0.8;
    }
`;
function ToolBar(props) {
    const [showMenu, setShowMenu] = (0, react_1.useState)(true);
    const ContextBox = (0, react_1.useRef)(null);
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
    const handleFollowUpMenuClick = () => {
        // ContextBox.current!.parentNode?.removeChild(ContextBox.current!)
        var _a;
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
        let top = (selectedTextY - followUpMenuBoxY - selectedTextHeight - 10);
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
        port.postMessage({
            type: 'UPDATE_POPUP_CARD', payload: {
                style: {
                    left: left,
                    top: top,
                }, followUpData: { keyWord: props.selectedTextString, sentence: sentence }
            }
        });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null, showMenu && react_1.default.createElement("div", { ref: ContextBox, className: 'contextBox', style: {
            position: 'absolute'
        } },
        react_1.default.createElement("div", { className: 'ankiSpaceButtonBox' },
            react_1.default.createElement("div", { className: 'setAnkiSpaceButton', onClick: () => handleSetAnkiSpaceButtonClick(event, false) }, "[...]"),
            react_1.default.createElement("div", { className: 'setAnkiSpaceButton', onClick: () => handleSetAnkiSpaceButtonClick(event, true) }, "[...]+")),
        react_1.default.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            } },
            react_1.default.createElement(StyledButton, { className: 'lookUpButton', style: {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAjKSURBVHgB7Z1PbBRVHMd/VfnTKLRsQAJNygDeTEMJ3KxJm4gX/+EFk3qgPSlebG/lxHKCeGm9QDy1XDx4aVE4cbAErqZF5ahMSZSYkNJGSDVV6nx3d7ZvxpnO7uz789t575M8dmYWBPu+8/v3fm+GyOFwOBwOh410bPHdYDDO1j79YKwEY6n26QvXwk9HG5ImgAvBKFNz+OSE0nYkCWAkGNOkDp+cUNiQJIDvqWr2TeOTE4pykgSwIZ6cG+im4ZO7aHXteWU8fLIejH8qn+K11b+ekyF8ckLJTaYAli4eoa7OFyiLuhCcUNqKTAGsfPEaycQJhRcvkWZgTfo6d2T+PoNC8WojC58KIBTtAmgUJxQ9sBVAozihtEbbC6BRCiKUxdq4Fox5koD2ILAoMAhm/WBcDMYMtYATgGI0CMWnFoTgBMCELKGE51swE4xxajJOcAJoIyCEu7+s0c37T+nrH/5M+i1+MIZqnw3hBNCmPFxep8u3lpOE4FMTInACaHMghHe/+i3uHnxqUATZRX4Ha3pL2+jH8x6de6NbvOwFYzYY3Vl/3gmgIFz6YC9NvFUSL/UHY4EyagtOAAVi4u0SDZ/YJV7yqNrf4aX9GSeAgnHp/X3UuydS4PWoKoJEd+AEUDBQ8r5yZn/8sheMyaTf7wRQQAaOdtLAkc745ZHaiOAEUFAmTpWSLsMKRFyBE0BBgRWIxQIAkz8mXnACKDDvvP5K0uXPxRMngAKTEAcAWIHB8MQJoMD09WxP++pseMCqIwgrXXd/XSNH9e6FH2+Frp0vpn11OhijOGAlgKt3V4KlzmfkQEFnb+sCSN/PATfgBcNn5QKw3u2o0ncwu3+xRTz8wsoC/PT73/Xj/v5+6u7OXMwqFPPz8/Xjrp3K700Pv7ARQKUVSuiLm56erojAFhYXF+n48eP1894920gHbFyAePcDmyYfrK6u1o/huxvZjykDNgIQ/b9tkw8ePHhQP9Z19wM+FuDRpgWwzfeDpaWl+rGuux+wdAE2WgDf9+vHVloA0QV4nke2ERWAvticpQU4duwY2cbKyuZ+DussQDwFtDEGQBoY0luyzALYngKKdz/QUASqw8YChNgYAN67dy9yrqEMXIeHBVCcAl6/fp06OjqkDfz3ZCJaAJ0pIGDnAlRYALHGLoNDhw6RTMQMQOfdD9i5ABUpoBhgyUC2SEUB6PT/gMVikOoUUBQAeuabXWe/+fNTOv/d48qxCgtlqggEjAtAdQqIyRd9bN/B7U0XWlSnqJEaQEnvlBh3AapTwHiNPY+PVR2jmLQAxgWgOgUUA8C8AdbD5c299ypilEgM0GlZDKA6BRT9f9+BnAJ4sl4/LpfLNDU1RarI+2/Mi3kBKDavogDyNFnGn+AFfx2v3MnEujqAyhQwHgDmWWUTzb9qdNcAACsLIDsFlBEAQjRXzrxKOujqfJF0Y1QAqlNAGQEgnsEzXNIbmevEqABUp4Ci/4cpx9O0ODN8Ynfl7Sw6MW4BQlQHgNUnba4TZ/B6Ht0YDQJVpoDxALAd0J0BADYuQLYFQEaBzSWcQZCKukKI7hoAYOMCZKeAsCgjIyPEGbGvQOdmEBGzLsDyRtBIldJADQAYE4BrBDW7CBRiTAC2N4ICU3sBRIxagBAbJx9Y7QJs3wsYX1SyzgLYvhfQZCu4CAsXYONeQFNbweKwsAC2p4C6+wBFjPzN8SYLVMRu375NnIFIZcYqMjqVZGBGALEmC+4VO7CwsCA1VjHZCSxixAVwX5VLQuVStakAEBhyAZsWADthTNTAsxArlbInP54C6t4NJGJEAGIA2Nezg2580kPcOP/t48qTS4HsLIVLCgiMSE9MAfF8YPywuaGyTiE+Eczk5AMWMQDuNG4PiVYpAFNPBEvCkAD+32r98bVHWS9H1kZ8pVL2dnAuKSDQLoC0DAA/9M+++YM4oHqlMrIKWDLbma/9b4/XACYnJ2l8fLxyHMYD5940uzgkuiPVm0FNxwD6BSBYAPxwx8bGKq1RYQ8/4oEw+uaA7AwAk89lHQAYcAGbFiAsrc7OzrJdEFIZAAJTy8AhRmOAcNIhBK4dvEWtAIYYjQHEu35wcJA2Njao6HBoAxMxagFsbASJLAPvMb/n0GgM0NXVRbYRfV6ReRegVQDxGsDhw4fJNrg0goToFUCsBiC7wsad+PMKTVcBgVYB2N4KLr4XCHBYBtf6L7C9FZzTKmCIsRjAxk5gcTMohxQQGIsBbBMA8v+5ubn6ecqr3bVjLAawSQCY/KGhofo58n/dj4JJw1gMYEsGgMgfky9WACdOlYgL2gRgWw0A+xxGR0crr4ONTz6Xux9oi0TiNQDx0ShFApU+3PXipIdg8jnd/UCbAOKvhp+ZmSFbQNv3lY/2B4Hfy8QNbQIQ/b8tYOLx6Dd0OHHc+wC0CQCFj+GTu6noIL/HwP8vl2LPVmgTAMwfRxNoOzztkkMbTgCWkySA9nq+qqMlkgQQWbPkslvHoYYkAUS6FlbX/iVHcUkSwLx4wm3TpkMumRbg5v1n5CguaRagHghio2S8jOsoDmlp4JfhASaf0149h1zSBDBFghWAAJwVKCZpAsDkR6zA5VvL5Ggvrt7JttwdW3yHtt2FYHjhhRuf9tDAkebfvumQQ1iTqbwAa3k9di39uxRGgzGzlQAAmvcXwhMsad4Z62XT0dquSJ7IvDQkADAWjMnwBA2NsAROBGwmMi8fBmOuEQGAcjAuhCewBJfe28eqt60V2nwi84KmTL9RAYAyCSIAaPBAjxsXa2DpRObhIlXnk5oRAIi4gxDZQnATqZT65INmBQASRQDQAjVwtJP6DmyvvHQZwF0gjXQTqQXkfau1Twy/dt2vnc9QbLk/jwBAmWLuwCGVrIlcSfmuafIKAJTJiSALbROZl1YEAAaDgcd7eVRs2E9kXloVAPCoag3OEn8KO5F5kSGAEI/0CcFNpCRkCiCkOxinqeoe+oOx1SvB3EQaRoUAkvBoM07wY58Oh8PhMMJ/EOSCFgAW8+IAAAAASUVORK5CYII=");

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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/content_script.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7O0FDcDJCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxzQkFBc0I7QUFDdEIsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCO0FBQ3ZCOztBQUVBO0FBQ0EsdUJBQXVCO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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QUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztXQ2hEQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvQ29tcG9uZW50cy9DdXN0b21Qcm9tcHRGb3JtLnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Db21wb25lbnRzL0Ryb3Bkb3duTWVudUl0ZW0udHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbXBvbmVudHMvSW1hZ2VzLnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Db21wb25lbnRzL05hdi50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvUG9wdXBDYXJkL01lc3NhZ2UudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC9Qcm9tcHRMaXN0LnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvU2VsZWN0aW9uLnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvaW5kZXgudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC9zdHlsZS50cyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvdXRpbC50cyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9jb250ZW50X3NjcmlwdC50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvbGliL2xvY2FsZS50cyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9saWIvdXNlckluZm8udHMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvYXNzZXRzL2ljb24xMjgucG5nIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2Fzc2V0cy9zZXR0aW5nR3VpZGUucG5nIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NyZWF0ZSBmYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhcm1vbnkgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkN1c3RvbVByb21wdEZvcm0gPSB2b2lkIDA7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuZnVuY3Rpb24gQ3VzdG9tUHJvbXB0Rm9ybShwcm9wcykge1xuICAgIGNvbnN0IFtmb3JtXSA9IGFudGRfMS5Gb3JtLnVzZUZvcm0oKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgLy8g5pu05pawIGlucHV0IOaWh+acrOahhueahOm7mOiupOWAvFxuICAgICAgICBmb3JtLnNldEZpZWxkc1ZhbHVlKHtcbiAgICAgICAgICAgIHRpdGxlOiBwcm9wcy5kYXRhLnRpdGxlLFxuICAgICAgICAgICAgZ2V0VW5zcGxhc2hJbWFnZXM6IHByb3BzLmRhdGEuZ2V0VW5zcGxhc2hJbWFnZXMsXG4gICAgICAgICAgICB1c2VyUHJvbXB0OiBwcm9wcy5kYXRhLnVzZXJQcm9tcHRcbiAgICAgICAgfSk7XG4gICAgfSwgW3Byb3BzLmRhdGFdKTtcbiAgICAvLyDkv53lrZggUHJvbXB0XG4gICAgY29uc3Qgc2F2ZVByb21wdCA9ICh2YWx1ZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8g5YWz6Zet6KGo5Y2VXG4gICAgICAgIHByb3BzLm9wZW5DdXN0b21Qcm9tcHRGb3JtKHsgaXNPcGVuOiBmYWxzZSwgZGF0YTogeyAndGl0bGUnOiAnJywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZmFsc2UsICd1c2VyUHJvbXB0JzogJycsICdpZCc6ICcnIH0gfSk7XG4gICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgIC8vIOiOt+WPluW3suS/neWtmOeahCBQcm9tcHQgTGlzdFxuICAgICAgICBjb25zdCBwcm9tcHRMaXN0ID0geWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuZ2V0KHsgXCJwcm9tcHRMaXN0XCI6IFtdIH0pLnRoZW4oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnByb21wdExpc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgbmV3UHJvbXB0cyA9IHByb21wdExpc3Q7XG4gICAgICAgIC8vIOWmguaenCBwcm9wcyDkuK3ljIXlkKsgSUTvvIzliJnor7TmmI7lvZPliY3mmK/lnKjnvJbovpEgUHJvbXB0IOiAjOS4jeaYr+aWsOWiniBQcm9tcHRcbiAgICAgICAgaWYgKHByb3BzLmRhdGEuaWQgIT09ICcnKSB7XG4gICAgICAgICAgICAvLyDlnKggUHJvbXB0IOiusOW9leS4reaJvuWIsOi/meadoSBQcm9tcHRcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3UHJvbXB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChuZXdQcm9tcHRzW2ldWydpZCddID09PSBwcm9wcy5kYXRhLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOS/ruaUuVxuICAgICAgICAgICAgICAgICAgICBuZXdQcm9tcHRzW2ldWyd0aXRsZSddID0gdmFsdWVzWyd0aXRsZSddO1xuICAgICAgICAgICAgICAgICAgICBuZXdQcm9tcHRzW2ldWydnZXRVbnNwbGFzaEltYWdlcyddID0gdmFsdWVzWydnZXRVbnNwbGFzaEltYWdlcyddO1xuICAgICAgICAgICAgICAgICAgICBuZXdQcm9tcHRzW2ldWyd1c2VyUHJvbXB0J10gPSB2YWx1ZXNbJ3VzZXJQcm9tcHQnXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbmV3UHJvbXB0cyA9IFtPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHZhbHVlcyksIHsgJ2lkJzogdGltZXN0YW1wIH0pLCAuLi5wcm9tcHRMaXN0XTtcbiAgICAgICAgfVxuICAgICAgICAvLyDlsIYgUHJvbXB0IOS/neWtmOS4i+adpVxuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2Uuc3luYy5zZXQoe1xuICAgICAgICAgICAgcHJvbXB0TGlzdDogbmV3UHJvbXB0cy5sZW5ndGggPiA2ID8gbmV3UHJvbXB0cy5zcGxpY2UoMCwgNikgOiBuZXdQcm9tcHRzLFxuICAgICAgICB9KS50aGVuKGl0ZW0gPT4ge1xuICAgICAgICAgICAgLy8g5bCGIFByb21wdCDkvKDlm57nu5nniLbnu4Tku7bvvIzku6XorqkgUHJvbXB0IOWIl+ihqCBVSSDph43mlrDmuLLmn5NcbiAgICAgICAgICAgIHByb3BzLmhhbmRsZVByb21wdEVkaXRlZChwcm9wcy5kYXRhLmlkID09PSAnJyk7XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgYWxlcnQoJ/CfpbJTYXZlIGZhaWxlZCwgcG9zc2libHkgZHVlIHRvIGEgdG9vIGxvbmcgUHJvbXB0LiBZb3UgY2FuIGRlbGV0ZSBvdGhlciBQcm9tcHRzIG9yIHNob3J0ZW4gdGhlIFByb21wdCBjaGFyYWN0ZXJzIGFuZCB0cnkgYWdhaW4uIFxcbicgKyBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIOWIoOmZpCBQcm9tcHRcbiAgICBjb25zdCBoYW5kbGVEZWxldGVCdXR0b25DbGljayA9ICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8g5YWz6Zet6KGo5Y2VXG4gICAgICAgIHByb3BzLm9wZW5DdXN0b21Qcm9tcHRGb3JtKHsgaXNPcGVuOiBmYWxzZSwgZGF0YTogeyAndGl0bGUnOiAnJywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZmFsc2UsICd1c2VyUHJvbXB0JzogJycsICdpZCc6ICcnIH0gfSk7XG4gICAgICAgIC8vIOiOt+WPluW3suS/neWtmOeahCBQcm9tcHQgTGlzdFxuICAgICAgICBjb25zdCBwcm9tcHRMaXN0ID0geWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuZ2V0KHsgXCJwcm9tcHRMaXN0XCI6IFtdIH0pLnRoZW4oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnByb21wdExpc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgbmV3UHJvbXB0cyA9IHByb21wdExpc3Q7XG4gICAgICAgIC8vIOWcqCBQcm9tcHQg6K6w5b2V5Lit5om+5Yiw6L+Z5p2hIFByb21wdFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1Byb21wdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChuZXdQcm9tcHRzW2ldWydpZCddID09PSBwcm9wcy5kYXRhLmlkKSB7XG4gICAgICAgICAgICAgICAgLy8g5Yig6ZmkXG4gICAgICAgICAgICAgICAgbmV3UHJvbXB0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgLy8g5bCGIFByb21wdCDkv53lrZjkuIvmnaVcbiAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2Uuc3luYy5zZXQoe1xuICAgICAgICAgICAgICAgICAgICBwcm9tcHRMaXN0OiBuZXdQcm9tcHRzLmxlbmd0aCA+IDYgPyBuZXdQcm9tcHRzLnNwbGljZSgwLCA2KSA6IG5ld1Byb21wdHMsXG4gICAgICAgICAgICAgICAgfSkudGhlbihpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5bCGIFByb21wdCDkvKDlm57nu5nniLbnu4Tku7bvvIzku6XorqkgUHJvbXB0IOWIl+ihqCBVSSDph43mlrDmuLLmn5NcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuaGFuZGxlUHJvbXB0RWRpdGVkKHByb3BzLmRhdGEuaWQgPT09ICcnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLCB7IG9uRmluaXNoOiBzYXZlUHJvbXB0LCBcbiAgICAgICAgICAgIC8vIGxheW91dD0naG9yaXpvbnRhbCdcbiAgICAgICAgICAgIGxhYmVsQ29sOiB7XG4gICAgICAgICAgICAgICAgeHM6IHsgc3BhbjogNiB9LFxuICAgICAgICAgICAgICAgIHNtOiB7IHNwYW46IDUgfSxcbiAgICAgICAgICAgIH0sIGZvcm06IGZvcm0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgbmFtZTogXCJ0aXRsZVwiLCBsYWJlbDogXCJUaXRsZVwiLCBydWxlczogW3sgcmVxdWlyZWQ6IHRydWUsIG1lc3NhZ2U6ICdQbGVhc2UgaW5wdXQgeW91ciB0aXRsZScgfV0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuSW5wdXQsIHsgbWF4TGVuZ3RoOiA0MCwgb25LZXlEb3duOiBoYW5kbGVLZXlEb3duLCBwbGFjZWhvbGRlcjogXCJIb3cgdG8gbmFtZSB0aGUgUHJvbXB0XCIsIHR5cGU6IFwidGV4dFwiIH0pKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgZXh0cmE6IFwiRGlzcGxheSBJbWFnZXMgUmVsYXRlZCB0byB0aGUgU2VsZWN0ZWQgVGV4dFwiLCBuYW1lOiBcImdldFVuc3BsYXNoSW1hZ2VzXCIsIGxhYmVsOiBcIkltYWdlc1wiLCB2YWx1ZVByb3BOYW1lOiBcImNoZWNrZWRcIiB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Td2l0Y2gsIG51bGwpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgbmFtZTogXCJ1c2VyUHJvbXB0XCIsIGxhYmVsOiBcIlByb21wdFwiLCBleHRyYTogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICBgJHsne3NlbGVjdGlvbn0nfTogU2VsZWN0ZWQgdGV4dGAsXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYnJcIiwgbnVsbCksXG4gICAgICAgICAgICAgICAgICAgIGAkeyd7c2VudGVuY2V9J306IFNlbnRlbmNlIGNvbnRhaW5pbmcgdGhlIHNlbGVjdGVkIHRleHRgLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJyXCIsIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjRjA4QTI0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9uQ2xpY2s6ICgpID0+IHdpbmRvdy5vcGVuKCdodHRwczovL2ppYW5nemlsb25nLm5vdGlvbi5zaXRlL0R5bmFtaWMtUGxhY2Vob2xkZXJzLTVmMDcwNTE2M2ZmNjQwYWZiZGQ1NzcxMTVkYzk1Nzc5P3B2cz00JykgfSwgXCJMZWFybiBNb3JlXCIpKSwgcnVsZXM6IFt7IHJlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAnUGxlYXNlIGlucHV0IHlvdXIgcHJvbXB0JyB9XSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbnB1dC5UZXh0QXJlYSwgeyBwbGFjZWhvbGRlcjogXCJUcmFuc2xhdGUge3NlbGVjdGlvbn0gdG8gQ2hpbmVzZVwiLCBvbktleURvd246IGhhbmRsZUtleURvd24sIHJvd3M6IDQsIG1heExlbmd0aDogMzAwMCB9KSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IHN0eWxlOiB7IG1hcmdpbjogJzAnIH0gfSxcbiAgICAgICAgICAgICAgICBwcm9wcy5kYXRhLmlkICE9PSAnJyAmJiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogJzEycHgnXG4gICAgICAgICAgICAgICAgICAgIH0sIG9uQ2xpY2s6IGhhbmRsZURlbGV0ZUJ1dHRvbkNsaWNrLCBkYW5nZXI6IHRydWUgfSwgXCJEZWxldGVcIiksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZTogeyBtaW5XaWR0aDogJzEyMHB4JyB9LCB0eXBlOiBcInByaW1hcnlcIiwgaHRtbFR5cGU6IFwic3VibWl0XCIgfSwgXCJTYXZlXCIpKSkpKTtcbn1cbmV4cG9ydHMuQ3VzdG9tUHJvbXB0Rm9ybSA9IEN1c3RvbVByb21wdEZvcm07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Ecm9wZG93bk1lbnVJdGVtID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgRHJvcGRvd25NZW51ID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJAcmFkaXgtdWkvcmVhY3QtZHJvcGRvd24tbWVudVwiKSk7XG5jb25zdCByZWFjdF9pY29uc18xID0gcmVxdWlyZShcIkByYWRpeC11aS9yZWFjdC1pY29uc1wiKTtcbmZ1bmN0aW9uIERyb3Bkb3duTWVudUl0ZW0ocHJvcHMpIHtcbiAgICBjb25zdCBbaXNIb3ZlcmVkLCBzZXRJc0hvdmVyZWRdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICB9KTtcbiAgICBjb25zdCBvblNlbGVjdCA9ICgpID0+IHtcbiAgICAgICAgcHJvcHMub25TZWxlY3QoKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUVkaXRQcm9tcHQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHByb3BzLmhhbmRsZUVkaXRQcm9tcHQoKTtcbiAgICB9O1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51Lkl0ZW0sIHsgc3R5bGU6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICc2cHgnLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnNHB4JyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzJweCdcbiAgICAgICAgfSwgY2xhc3NOYW1lOiBcIkRyb3Bkb3duTWVudUl0ZW1cIiwgb25Nb3VzZUVudGVyOiAoKSA9PiBzZXRJc0hvdmVyZWQodHJ1ZSksIG9uTW91c2VMZWF2ZTogKCkgPT4gc2V0SXNIb3ZlcmVkKGZhbHNlKSwgb25TZWxlY3Q6IG9uU2VsZWN0IH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgZmxleDogJzEnLFxuICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcydcbiAgICAgICAgICAgIH0gfSwgcHJvcHMuY2hpbGRyZW4pLFxuICAgICAgICBpc0hvdmVyZWQgJiYgKHByb3BzLmRhdGEuaWQgPT09ICdEZWZhdWx0JyA/IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4geyB3aW5kb3cub3BlbignaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9XaGF0LWlzLXRoZS1kZWZhdWx0LVByb21wdC1Qcm9tcHQtNWI1NWUzZmMzMDNkNDI1ZjhjY2ExNmQ1YmVlMTllN2MnKTsgfSB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfaWNvbnNfMS5RdWVzdGlvbk1hcmtDaXJjbGVkSWNvbiwgbnVsbCkpIDogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBvbkNsaWNrOiBoYW5kbGVFZGl0UHJvbXB0IH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF9pY29uc18xLlBlbmNpbDJJY29uLCBudWxsKSkpKSk7XG59XG5leHBvcnRzLkRyb3Bkb3duTWVudUl0ZW0gPSBEcm9wZG93bk1lbnVJdGVtO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSW1hZ2VzID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IGljb25zXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7XG5jb25zdCBQcm9UYWdfMSA9IHJlcXVpcmUoXCIuL1Byb1RhZ1wiKTtcbmNvbnN0IHVzZXJJbmZvXzEgPSByZXF1aXJlKFwiLi4vbGliL3VzZXJJbmZvXCIpO1xuZnVuY3Rpb24gSW1hZ2VzKHByb3BzKSB7XG4gICAgY29uc3QgW2ltYWdlcywgc2V0SW1hZ2VzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShbXSk7XG4gICAgY29uc3QgW2ltYWdlSW5kZXgsIHNldEltYWdlSW5kZXhdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKDApO1xuICAgIGNvbnN0IFtzaG93Q29udHJvbCwgc2V0U2hvd0NvbnRyb2xdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbY2hhbmdlSW1hZ2UsIHNldENoYW5nZUltYWdlU3RhdHVzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgLy8gY29uc3QgW3NlYXJjaEltYWdlSXNMb2FkaW5nLCBzZXRTZWFyY2hJbWFnZUlzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgICBjb25zdCB1c2VySW5mbyA9ICgwLCB1c2VySW5mb18xLnVzZVVzZXJJbmZvQ29udGV4dCkoKTtcbiAgICAvLyBjb25zdCBbY3VycmVudFVSTCwgc2V0Q3VycmVudFVSTF0gPSB1c2VTdGF0ZTxzdHJpbmc+KCk7XG4gICAgY29uc3QgaW5wdXRFbGVtZW50ID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgc2V0SW1hZ2VzKHByb3BzLmltYWdlcyk7XG4gICAgICAgIHNldEltYWdlSW5kZXgoMCk7XG4gICAgfSwgW3Byb3BzLmltYWdlc10pO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGlucHV0RWxlbWVudCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGlucHV0RWxlbWVudC5jdXJyZW50KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coaW5wdXRFbGVtZW50LmN1cnJlbnQ/LmlucHV0KTtcbiAgICAgICAgaWYgKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby52ZXJpZmllZCkge1xuICAgICAgICAgICAgKF9hID0gaW5wdXRFbGVtZW50LmN1cnJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfSwgW2NoYW5nZUltYWdlXSk7XG4gICAgY29uc3QgaGFuZGxlRWRpdEltYWdlc0NsaWNrID0gKCkgPT4ge1xuICAgICAgICBzZXRDaGFuZ2VJbWFnZVN0YXR1cyh0cnVlKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVNlYXJjaElucHV0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlU2VhcmNoQnRuQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmICh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udmVyaWZpZWQpIHtcbiAgICAgICAgICAgIGxldCBpbnB1dFZhbHVlID0gKF9iID0gKF9hID0gaW5wdXRFbGVtZW50LmN1cnJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pbnB1dCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnZhbHVlO1xuICAgICAgICAgICAgaWYgKGlucHV0VmFsdWUgJiYgaW5wdXRWYWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBwcm9wcy5nZXRVbnNwbGFzaEltYWdlcyhpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZXRDaGFuZ2VJbWFnZVN0YXR1cyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgLy8gYW1wbGl0dWRlLnRyYWNrKCdoYW5kbGVTZWFyY2hJbWFnZScpO1xuICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAnaGFuZGxlU2VhcmNoSW1hZ2UnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoJ0lzIG5vdCB2ZXJpZmllZCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVDaGFuZ2VJbWFnZXNDbGljayA9IChvZmZzZXQpID0+IHtcbiAgICAgICAgc2V0SW1hZ2VJbmRleChpbmRleCA9PiB7XG4gICAgICAgICAgICBpbmRleCA9IGluZGV4ICsgb2Zmc2V0O1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IGltYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpbWFnZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGFtcGxpdHVkZS50cmFjaygnaGFuZGxlQ2hhbmdlSW1hZ2UnKTtcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdoYW5kbGVDaGFuZ2VJbWFnZScgfSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVJbWFnZXNCb3hIb3ZlciA9IChlKSA9PiB7XG4gICAgICAgIGlmIChlLnR5cGUgPT09ICdtb3VzZWVudGVyJykge1xuICAgICAgICAgICAgc2V0U2hvd0NvbnRyb2wodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudHlwZSA9PT0gJ21vdXNlbGVhdmUnKSB7XG4gICAgICAgICAgICBzZXRTaG93Q29udHJvbChmYWxzZSk7XG4gICAgICAgICAgICAvLyBzZXRTaG93Q29udHJvbCh0cnVlKVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImltYWdlc1wiLCBzdHlsZToge1xuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMCdcbiAgICAgICAgICAgIC8vIHBhZGRpbmdCb3R0b206ICc4cHgnXG4gICAgICAgIH0gfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgb25Nb3VzZUVudGVyOiBoYW5kbGVJbWFnZXNCb3hIb3Zlciwgb25Nb3VzZUxlYXZlOiBoYW5kbGVJbWFnZXNCb3hIb3ZlciB9LFxuICAgICAgICAgICAgICAgIGltYWdlcy5sZW5ndGggPiAwID9cbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiaW1hZ2VCb3hcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbWFnZSwgeyBcImRhdGEtZG93bmxvYWRsb2NhdGlvblwiOiBpbWFnZXNbaW1hZ2VJbmRleF0ubGlua3MuZG93bmxvYWRfbG9jYXRpb24sIHNyYzogaW1hZ2VzW2ltYWdlSW5kZXhdLnVybHMuc21hbGwsIGFsdDogaW1hZ2VzW2ltYWdlSW5kZXhdWydkZXNjcmlwdGlvbiddLCBoZWlnaHQ6IDI0MCwgd2lkdGg6ICcxMDAlJywgcHJldmlldzogZmFsc2UsIHBsYWNlaG9sZGVyOiB0cnVlIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImltYWdlUXVldWVcIiwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBpbWFnZXMubWFwKGltZyA9PiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7IGtleTogaW1nLmlkLCBzcmM6IGltZy51cmxzLnNtYWxsIH0pKSkpXG4gICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMjQwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzJweCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkVtcHR5LCB7IHN0eWxlOiB7IG1hcmdpbjogJzAgYXV0bycgfSwgZGVzY3JpcHRpb246ICdObyByZWxhdGVkIHBpY3R1cmVzIGZvdW5kJywgaW1hZ2U6IGFudGRfMS5FbXB0eS5QUkVTRU5URURfSU1BR0VfU0lNUExFIH0pKSxcbiAgICAgICAgICAgICAgICBzaG93Q29udHJvbCAmJlxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzAgMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWFyb3VuZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBtYXJnaW46ICcwcHggMThweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMzYwZGVnLCByZ2JhKDAsIDAsIDAsIDApIDAlLCByZ2JhKDAsIDAsIDAsIDAuMSkgMjcuNiUsIHJnYmEoMCwgMCwgMCwgMC4yKSA1NC42OSUsIHJnYmEoMCwgMCwgMCwgMC4zNSkgMTAwJSknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBjaGFuZ2VJbWFnZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pi+56S65Zu+54mH5pCc57Si5o6n5Lu2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMnB4IDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyBmbGV4OiAnMScsIG1hcmdpblJpZ2h0OiAnMjBweCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLklucHV0LCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby52ZXJpZmllZCkgPT09IGZhbHNlID8gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC45KScgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiAnMnB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHN1ZmZpeDogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvVGFnXzEuUHJvVGFnLCBudWxsKSwgZGlzYWJsZWQ6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnZlcmlmaWVkKSwgcHJlZml4OiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLlNlYXJjaE91dGxpbmVkLCBudWxsKSwgcGxhY2Vob2xkZXI6IFwiU2VhcmNoIGltYWdlc1wiLCBvbktleURvd246IGhhbmRsZVNlYXJjaElucHV0LCBzaXplOiBcInNtYWxsXCIsIHJlZjogaW5wdXRFbGVtZW50LCBvblByZXNzRW50ZXI6IGhhbmRsZVNlYXJjaEJ0bkNsaWNrIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBkaXNhYmxlZDogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udmVyaWZpZWQpLCB0eXBlOiBcInRleHRcIiwgc2l6ZTogXCJzbWFsbFwiLCBzdHlsZTogeyBjb2xvcjogJyNmZmYnLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIG1hcmdpblJpZ2h0OiAnMTBweCcsIG9wYWNpdHk6ICEodXNlckluZm8gPT09IG51bGwgfHwgdXNlckluZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJJbmZvLnZlcmlmaWVkKSA/ICcwLjcnIDogJzEnIH0sIG9uQ2xpY2s6IGhhbmRsZVNlYXJjaEJ0bkNsaWNrLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkNoZWNrT3V0bGluZWQsIG51bGwpIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyB0eXBlOiBcInRleHRcIiwgc2l6ZTogXCJzbWFsbFwiLCBzdHlsZTogeyBjb2xvcjogJyNmZmYnLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfSwgb25DbGljazogKCkgPT4gc2V0Q2hhbmdlSW1hZ2VTdGF0dXMoZmFsc2UpLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkNsb3NlT3V0bGluZWQsIG51bGwpIH0pKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleEdyb3c6ICdpbmhlcml0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuTGVmdE91dGxpbmVkLCBudWxsKSwgb25DbGljazogKCkgPT4gaGFuZGxlQ2hhbmdlSW1hZ2VzQ2xpY2soLTEpIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzQwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzAgNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBpbWFnZUluZGV4ICsgMSArICcvJyArIGltYWdlcy5sZW5ndGgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuUmlnaHRPdXRsaW5lZCwgbnVsbCksIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUNoYW5nZUltYWdlc0NsaWNrKDEpIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93LXJldmVyc2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogJzEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgdHlwZTogXCJ0ZXh0XCIsIHNpemU6IFwic21hbGxcIiwgc3R5bGU6IHsgY29sb3I6ICcjZmZmJywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH0sIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUVkaXRJbWFnZXNDbGljaygpLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkZvcm1PdXRsaW5lZCwgbnVsbCkgfSkpKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbWFnZVNvdXJjZVwiLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogJzEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2ZsZXgtZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMC45MGVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiAnNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFNoYWRvdzogJzJweCAycHggNXB4IHJnYmEoMCwgMCwgMCwgMC4zKSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBob3RvIGJ5IFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBzdHlsZTogeyB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsIHBhZGRpbmc6ICcwIDJweCcgfSwgdGFyZ2V0OiAnX2JsYW5rJywgaHJlZjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9AXCIgKyBpbWFnZXNbaW1hZ2VJbmRleF0udXNlci51c2VybmFtZSArIFwiP3V0bV9zb3VyY2U9U2NvdXRlciZ1dG1fbWVkaXVtPXJlZmVycmFsXCIgfSwgaW1hZ2VzW2ltYWdlSW5kZXhdLnVzZXIubmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIG9uIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBzdHlsZTogeyB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsIHBhZGRpbmc6ICcwIDJweCcgfSwgdGFyZ2V0OiAnX2JsYW5rJywgaHJlZjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS8/dXRtX3NvdXJjZT1TY291dGVyJnV0bV9tZWRpdW09cmVmZXJyYWxcIiB9LCBcIlVuc3BsYXNoXCIpKSkpKSkpO1xufVxuZXhwb3J0cy5JbWFnZXMgPSBJbWFnZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5OYXYgPSB2b2lkIDA7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgRHJvcGRvd25NZW51ID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJAcmFkaXgtdWkvcmVhY3QtZHJvcGRvd24tbWVudVwiKSk7XG5jb25zdCBEcm9wZG93bk1lbnVJdGVtXzEgPSByZXF1aXJlKFwiLi9Ecm9wZG93bk1lbnVJdGVtXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uL1BvcHVwQ2FyZC91dGlsXCIpO1xuY29uc3QgcmVhY3RfaWNvbnNfMSA9IHJlcXVpcmUoXCJAcmFkaXgtdWkvcmVhY3QtaWNvbnNcIik7XG4vLyBpbXBvcnQgdHlwZSB7IE1lbnVQcm9wcyB9IGZyb20gJ2FudGQnO1xuY29uc3QgY29udGVudF9zY3JpcHRfMSA9IHJlcXVpcmUoXCIuLi9jb250ZW50X3NjcmlwdFwiKTtcbmNvbnN0IGljb25zXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7XG5mdW5jdGlvbiBOYXYocHJvcHMpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnN0IFtpc1Bpbiwgc2V0SXNQaW5dID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbY3VycmVudFVSTCwgc2V0Q3VycmVudFVSTF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoKTtcbiAgICBjb25zdCBbaXNPcGVuUHJvbXB0TWVudSwgc2V0SXNPcGVuUHJvbXB0TWVudV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IGRlZmF1bHRQcm9tcHQgPSAoMCwgcmVhY3RfMS51c2VSZWYpKCk7XG4gICAgLy8gY29uc3QgeyBPcHRpb24gfSA9IFNlbGVjdDtcbiAgICBjb25zdCBuYXZFbGVtZW50ID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgLy8g5b2T5LiN6Ieq5Yqo6Ieq6KGMIFByb21wdO+8jOiHquWKqOaJk+W8gCBQcm9tcHQg6I+c5Y2V5L6b55So5oi36YCJ5oupXG4gICAgICAgIGlmIChwcm9wcy5pc09wZW5NZW51KSB7XG4gICAgICAgICAgICBvbk1lbnVPcGVuQ2hhbmdlKHByb3BzLmlzT3Blbk1lbnUpO1xuICAgICAgICB9XG4gICAgfSwgW3Byb3BzLmlzT3Blbk1lbnVdKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgZGVmYXVsdFByb21wdC5jdXJyZW50ID0gKDAsIHV0aWxfMS5nZXREZWZhdWx0UHJvbXB0KShwcm9wcy5rZXlXb3JkKTtcbiAgICB9LCBbXSk7XG4gICAgLy8g54K55Ye75L+d5a2Y5YiwIEFua2kg5oyJ6ZKuXG4gICAgY29uc3QgaGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrID0gKCkgPT4ge1xuICAgICAgICBwcm9wcy5oYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2soKTtcbiAgICB9O1xuICAgIC8vIOeCueWHuyBQaW4g5oyJ6ZKuXG4gICAgY29uc3QgaGFuZGxlUGluQnRuQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGlmIChpc1Bpbikge1xuICAgICAgICAgICAgKDAsIGNvbnRlbnRfc2NyaXB0XzEucGluUG9wdXBDYXJkKShmYWxzZSk7XG4gICAgICAgICAgICBzZXRJc1BpbihmYWxzZSk7XG4gICAgICAgICAgICAvLyBhbXBsaXR1ZGUudHJhY2soJ3BpblBvcHVwQ2FyZCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgKDAsIGNvbnRlbnRfc2NyaXB0XzEucGluUG9wdXBDYXJkKSh0cnVlKTtcbiAgICAgICAgICAgIHNldElzUGluKHRydWUpO1xuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdwaW5Qb3B1cENhcmQnIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyDlnKggQW5raSDkuK3miZPlvIDnrJTorrBcbiAgICBjb25zdCBlZGl0Tm90ZUluQW5raSA9IChub3RlSWQpID0+IHtcbiAgICAgICAgbGV0IHNlbmRpbmcgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdndWlFZGl0Tm90ZScsICdtZXNzYWdlcyc6IHsgJ2Fua2lfYWN0aW9uX3R5cGUnOiAnZ3VpRWRpdE5vdGUnLCAnYW5raV9hcmd1bWVudHMnOiB7ICdub3RlJzogbm90ZUlkIH0sIH0gfSk7XG4gICAgICAgIHNlbmRpbmcudGhlbigobWVzc2FnZSkgPT4ge1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAvL2Vycm9yXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy8g5omT5byAIFByb21wdCDnvJbovpHnqpflj6NcbiAgICBjb25zdCBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSA9IChkYXRhKSA9PiB7XG4gICAgICAgIHByb3BzLm9wZW5DdXN0b21Qcm9tcHRGb3JtKGRhdGEpO1xuICAgICAgICBzZXRJc09wZW5Qcm9tcHRNZW51KGZhbHNlKTtcbiAgICB9O1xuICAgIC8vIFByb21wdCDoj5zljZUgaXRlbSDngrnlh7tcbiAgICBjb25zdCBoYW5kbGVNZW51SXRlbUNsaWNrID0gKGRhdGEpID0+IHtcbiAgICAgICAgLy8g56ysIDMg5Liq5Y+C5pWwIGZhbHNlIOihqOekuuS4jemHjeaWsOa4suafk+WbvueJh1xuICAgICAgICAvLyDlpoLmnpzkuIrkuIDkuKogUHJvbXB0IOaYr+S4jeaYvuekuuWbvueJh++8jOS4lOW9k+WJjSBQcm9tcHQg6ZyA6KaB5pi+56S65Zu+54mH77yM5YiZ5pys5qyh5Lu75Yqh6ZyA6KaB5riy5p+T5Zu+54mH77yM5ZCm5YiZ5LiN6YeN5paw5riy5p+T5Zu+54mHXG4gICAgICAgIGlmIChwcm9wcy5sYXN0RXhlY3V0ZWRQcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMgIT09IHRydWUgJiYgZGF0YS5nZXRVbnNwbGFzaEltYWdlcykge1xuICAgICAgICAgICAgcHJvcHMuaGFuZGxlTWVudUl0ZW1DbGljayhkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHByb3BzLmhhbmRsZU1lbnVJdGVtQ2xpY2soZGF0YSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBvbk1lbnVPcGVuQ2hhbmdlID0gKG9wZW4pID0+IHtcbiAgICAgICAgLy8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgc2V0SXNPcGVuUHJvbXB0TWVudShvcGVuKTtcbiAgICB9O1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQ29uZmlnUHJvdmlkZXIsIHsgdGhlbWU6IHtcbiAgICAgICAgICAgICAgICB0b2tlbjoge1xuICAgICAgICAgICAgICAgICAgICBjb2xvclByaW1hcnk6ICcjRjA4QTI0JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBpZDogXCJTY291dGVyTmF2XCIsIHJlZjogbmF2RWxlbWVudCwgY2xhc3NOYW1lOiAncC00Jywgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAnbW92ZScsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLCB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogOVxuICAgICAgICAgICAgICAgIH0sIG9uTW91c2VEb3duOiBwcm9wcy5vbk1vdXNlRG93biB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgekluZGV4OiA5IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51LlJvb3QsIHsgb3BlbjogaXNPcGVuUHJvbXB0TWVudSwgbW9kYWw6IGZhbHNlLCBvbk9wZW5DaGFuZ2U6IG9uTWVudU9wZW5DaGFuZ2UgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5UcmlnZ2VyLCB7IGFzQ2hpbGQ6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJJY29uQnV0dG9uXCIsIFwiYXJpYS1sYWJlbFwiOiBcIkN1c3RvbWlzZSBvcHRpb25zXCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ljb25zXzEuSGFtYnVyZ2VyTWVudUljb24sIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6ICc0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAnMTcwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgcHJvcHMubGFzdEV4ZWN1dGVkUHJvbXB0LnRpdGxlKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51LlBvcnRhbCwgeyBjb250YWluZXI6IG5hdkVsZW1lbnQuY3VycmVudCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5Db250ZW50LCB7IGNsYXNzTmFtZTogXCJEcm9wZG93bk1lbnVDb250ZW50XCIsIGFsaWduOiAnc3RhcnQnLCBzaWRlT2Zmc2V0OiA1LCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxODBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICcwcHggMTBweCAzOHB4IC0xMHB4IHJnYmEoMjIsIDIzLCAyNCwgMC4zNSksIDBweCAxMHB4IDIwcHggLTE1cHggcmdiYSgyMiwgMjMsIDI0LCAwLjIpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogJzQwMG1zJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vekFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uOiAnY3ViaWMtYmV6aWVyKDAuMTYsIDEsIDAuMywgMSknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lsbENoYW5nZTogJ3RyYW5zZm9ybSwgb3BhY2l0eSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnVJdGVtXzEuRHJvcGRvd25NZW51SXRlbSwgeyBrZXk6IChfYSA9IGRlZmF1bHRQcm9tcHQuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkLCBkYXRhOiBkZWZhdWx0UHJvbXB0LmN1cnJlbnQsIG9uU2VsZWN0OiAoKSA9PiBoYW5kbGVNZW51SXRlbUNsaWNrKGRlZmF1bHRQcm9tcHQuY3VycmVudCksIGhhbmRsZUVkaXRQcm9tcHQ6ICgpID0+IG9wZW5DdXN0b21Qcm9tcHRGb3JtKHsgaXNPcGVuOiB0cnVlLCBkYXRhOiBkZWZhdWx0UHJvbXB0LmN1cnJlbnQgfSkgfSwgKF9iID0gZGVmYXVsdFByb21wdC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudGl0bGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5wcm9tcHRzLm1hcChpdGVtID0+IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudUl0ZW1fMS5Ecm9wZG93bk1lbnVJdGVtLCB7IGtleTogaXRlbS5pZCwgZGF0YTogaXRlbSwgb25TZWxlY3Q6ICgpID0+IGhhbmRsZU1lbnVJdGVtQ2xpY2soaXRlbSksIGhhbmRsZUVkaXRQcm9tcHQ6ICgpID0+IG9wZW5DdXN0b21Qcm9tcHRGb3JtKHsgaXNPcGVuOiB0cnVlLCBkYXRhOiBpdGVtIH0pIH0sIGl0ZW0udGl0bGUpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51LlNlcGFyYXRvciwgeyBjbGFzc05hbWU6IFwiRHJvcGRvd25NZW51U2VwYXJhdG9yXCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLnByb21wdHMubGVuZ3RoIDwgNiA/IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHsgbWFyZ2luVG9wOiAnNHB4JyB9LCBzaXplOiAnc21hbGwnLCBvbkNsaWNrOiAoKSA9PiBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogdHJ1ZSwgZGF0YTogeyAndGl0bGUnOiAnJywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZmFsc2UsICd1c2VyUHJvbXB0JzogJycsICdpZCc6ICcnIH0gfSkgfSwgXCJDcmVhdGUgcHJvbXB0XCIpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHsgbWFyZ2luVG9wOiAnNHB4JyB9LCBzaXplOiAnc21hbGwnLCBkaXNhYmxlZDogdHJ1ZSB9LCBcIkF0IG1vc3QgNyBQcm9tcHRzXCIpKSkpKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJyaWdodEJ0bkJveFwiLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuYWRkVG9BbmtpU3RhdHVzLnN0YXR1cyA9PSAnc3VjY2VzcycgPyByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuQ2hlY2tDaXJjbGVUd29Ub25lLCB7IHR3b1RvbmVDb2xvcjogXCIjNTJjNDFhXCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBBZGRlZCB0byBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiBlZGl0Tm90ZUluQW5raS5iaW5kKGV2ZW50LCBwcm9wcy5hZGRUb0Fua2lTdGF0dXMubm90ZUlkKSB9LCBcIkFua2lcIikpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc2l6ZTogXCJzbWFsbFwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTMuMnB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuUGx1c1NxdWFyZU91dGxpbmVkLCBudWxsKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbG9hZGluZz17cHJvcHMuYWRkVG9BbmtpU3RhdHVzID09PSAnbG9hZGluZycgPyB0cnVlIDogZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHByb3BzLmFkZFRvQW5raVN0YXR1cy5zdGF0dXMgPT09ICdzdGFuZGJ5JyB8fCBwcm9wcy5hZGRUb0Fua2lTdGF0dXMuc3RhdHVzID09PSAnbG9hZGluZycgPyB0cnVlIDogZmFsc2UsIG9uQ2xpY2s6IGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljayB9LCBwcm9wcy5hZGRUb0Fua2lTdGF0dXMuc3RhdHVzID09PSAnbG9hZGluZycgPyAnQWRkaW5nLi4uJyA6ICdBZGQgdG8gQW5raScpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHNpemU6ICdzbWFsbCcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHlwZT0ndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IGlzUGluID8gJyNGMDhBMjQnIDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMy4ycHgnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBpY29uOiBpc1BpbiA/IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuUHVzaHBpbkZpbGxlZCwgeyBjbGFzc05hbWU6ICdpc1BpbicgfSkgOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLlB1c2hwaW5PdXRsaW5lZCwgbnVsbCksIG9uQ2xpY2s6IGhhbmRsZVBpbkJ0bkNsaWNrIH0pKSkpKSk7XG59XG5leHBvcnRzLk5hdiA9IE5hdjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1lc3NhZ2VzTGlzdCA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgcmVhY3RfbWFya2Rvd25fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3QtbWFya2Rvd25cIikpO1xuY29uc3QgcmVtYXJrX2JyZWFrc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZW1hcmstYnJlYWtzXCIpKTtcbmNvbnN0IHJlaHlwZV9yYXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVoeXBlLXJhd1wiKSk7XG5jb25zdCByZW1hcmtfZ2ZtXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlbWFyay1nZm1cIikpO1xuY29uc3Qgc2V0dGluZ0d1aWRlX3BuZ18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9hc3NldHMvc2V0dGluZ0d1aWRlLnBuZ1wiKSk7XG5jb25zdCBJbWFnZXNfMSA9IHJlcXVpcmUoXCIuLi9Db21wb25lbnRzL0ltYWdlc1wiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5mdW5jdGlvbiBNZXNzYWdlKHByb3BzKSB7XG4gICAgY29uc3QgW2ltYWdlcywgc2V0SW1hZ2VzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShbXSk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIHNldEltYWdlcyhwcm9wcy5tZXNzYWdlLmltYWdlcyk7XG4gICAgfSwgW3Byb3BzLm1lc3NhZ2UuaW1hZ2VzXSk7XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGtleTogcHJvcHMubWVzc2FnZS5jaGF0SWQsIGNsYXNzTmFtZTogJycsIHN0eWxlOiBwcm9wcy5tZXNzYWdlLnJvbGUgPT09ICd1c2VyJyA/IHsgYmFja2dyb3VuZENvbG9yOiAnI0Y2RjZGNicsIHBhZGRpbmdUb3A6ICcycHgnLCBwYWRkaW5nQm90dG9tOiAnMnB4JyB9IDoge30gfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlNrZWxldG9uLCB7IGxvYWRpbmc6IHByb3BzLm1lc3NhZ2UubG9hZGluZywgYWN0aXZlOiB0cnVlLCB0aXRsZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHByb3BzLm1lc3NhZ2Uuc2hvd0ltYWdlc0JveCAmJlxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEltYWdlc18xLkltYWdlcywgeyBpbWFnZXM6IGltYWdlcywgZ2V0VW5zcGxhc2hJbWFnZXM6IChrZXlXb3JkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmdldFVuc3BsYXNoSW1hZ2VzKShrZXlXb3JkKS50aGVuKChpbWdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW1hZ2VzKGltZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gfSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF9tYXJrZG93bl8xLmRlZmF1bHQsIHsgcmVtYXJrUGx1Z2luczogW3JlbWFya19icmVha3NfMS5kZWZhdWx0LCByZW1hcmtfZ2ZtXzEuZGVmYXVsdF0sIHJlaHlwZVBsdWdpbnM6IFtyZWh5cGVfcmF3XzEuZGVmYXVsdF0sIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgdGFibGU6IChfYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHsgbm9kZSB9ID0gX2EsIHByb3BzID0gX19yZXN0KF9hLCBbXCJub2RlXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IG92ZXJmbG93WDogJ3Njcm9sbCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiwgT2JqZWN0LmFzc2lnbih7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ21heC1jb250ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAnNjIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjY2NjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgcHJvcHMpKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBza2lwSHRtbDogZmFsc2UsIGNoaWxkcmVuOiBwcm9wcy5tZXNzYWdlLmNvbnRlbnQgfSksXG4gICAgICAgICAgICBwcm9wcy5tZXNzYWdlLnN0YXR1cyA9PT0gJ2ludmFsaWRfYXBpX2tleScgJiYgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICcnIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBzcmM6IHNldHRpbmdHdWlkZV9wbmdfMS5kZWZhdWx0LCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4J1xuICAgICAgICAgICAgICAgICAgICB9IH0pKSkpKTtcbn1cbjtcbmZ1bmN0aW9uIE1lc3NhZ2VzTGlzdChwcm9wcykge1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgIH0pO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdtZXNzYWdlcycsIHN0eWxlOiB7XG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMS44JyxcbiAgICAgICAgICAgIHdvcmRXcmFwOiAnYnJlYWstd29yZCcsXG4gICAgICAgICAgICBtYXJnaW46ICcwLjRlbSAwJ1xuICAgICAgICB9IH0sIHByb3BzLm1lc3NhZ2VzLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoTWVzc2FnZSwgeyBrZXk6IGl0ZW0uY2hhdElkLCBtZXNzYWdlOiBpdGVtIH0pO1xuICAgIH0pKSk7XG59XG5leHBvcnRzLk1lc3NhZ2VzTGlzdCA9IE1lc3NhZ2VzTGlzdDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlByb21wdExpc3QgPSB2b2lkIDA7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuY29uc3Qgc3R5bGVkX2NvbXBvbmVudHNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwic3R5bGVkLWNvbXBvbmVudHNcIikpO1xuY29uc3QgdXNlckluZm9fMSA9IHJlcXVpcmUoXCIuLi9saWIvdXNlckluZm9cIik7XG5jb25zdCBQcm9UYWdfMSA9IHJlcXVpcmUoXCIuLi9Db21wb25lbnRzL1Byb1RhZ1wiKTtcbmZ1bmN0aW9uIFByb21wdExpc3QocHJvcHMpIHtcbiAgICBjb25zdCBQcm9tcHRMaXN0RE9NID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICBjb25zdCB1c2VySW5mbyA9ICgwLCB1c2VySW5mb18xLnVzZVVzZXJJbmZvQ29udGV4dCkoKTtcbiAgICAvLyBjb25zdCB1c2VySW5mbyA9IHVzZVVzZXJJbmZvQ29udGV4dCgpXG4gICAgLy8gY29uc29sZS5sb2coJ3VzZXJJbmZvOicpO1xuICAgIC8vIGNvbnNvbGUubG9nKHVzZXJJbmZvKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coUHJvbXB0TGlzdERPTS5jdXJyZW50KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coUHJvbXB0TGlzdERPTS5jdXJyZW50Py5jbGllbnRIZWlnaHQpO1xuICAgICAgICAvLyAvL+iuvue9ruiPnOWNleeahOS9jee9rlxuICAgICAgICAvLyBpZiAoUHJvbXB0TGlzdERPTS5jdXJyZW50KSB7XG4gICAgICAgIC8vICAgICBQcm9tcHRMaXN0RE9NLmN1cnJlbnQuc3R5bGUudG9wID0gKHBhcnNlSW50KFByb21wdExpc3RET00uY3VycmVudC5zdHlsZS50b3AsIDEwKSAtIFByb21wdExpc3RET00uY3VycmVudC5jbGllbnRIZWlnaHQpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIC8vIH1cbiAgICB9LCBbcHJvcHMuc2hvd0ZvbGxvd1VwRGF0YU1lbnUuc2hvd10pO1xuICAgIC8vIFByb21wdCDoj5zljZUgaXRlbSDngrnlh7tcbiAgICBjb25zdCBoYW5kbGVNZW51SXRlbUNsaWNrID0gKGRhdGEpID0+IHtcbiAgICAgICAgaWYgKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby52ZXJpZmllZCkge1xuICAgICAgICAgICAgLy8g56ysIDMg5Liq5Y+C5pWwIGZhbHNlIOihqOekuuS4jemHjeaWsOa4suafk+WbvueJh1xuICAgICAgICAgICAgcHJvcHMuaGFuZGxlTWVudUl0ZW1DbGljayhkYXRhLCB0cnVlLCB0cnVlLCBwcm9wcy5mb2xsb3dVcERhdGEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgcmVmOiBQcm9tcHRMaXN0RE9NLCBjbGFzc05hbWU6ICdmb2xsb3dVcE1lbnUnLCBzdHlsZTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwcm9wcy5zaG93Rm9sbG93VXBEYXRhTWVudS5zdHlsZSksIHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIGRpc3BsYXk6IFwiZmxleFwiLCBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLCB3aWR0aDogJzEyMHB4JywgcGFkZGluZzogJzAnIH0pIH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdlbmQnLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHgnLFxuICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNiknLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzY2NidcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IHN0eWxlOiB7IGZsZXg6ICcxJyB9IH0sIFwiUHJvbXB0XCIpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvVGFnXzEuUHJvVGFnLCBudWxsKSksXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHggOHB4IDRweCcsXG4gICAgICAgICAgICAgICAgY3Vyc29yOiAhKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby52ZXJpZmllZCkgPyAnbm90LWFsbG93ZWQnIDogJycsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udmVyaWZpZWQpID8gJzAuNycgOiAnMScsXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChQcm9tcHRCdXR0b24sIHsgZGlzYWJsZTogISh1c2VySW5mbyA9PT0gbnVsbCB8fCB1c2VySW5mbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlckluZm8udmVyaWZpZWQpLCBoYW5kbGVNZW51SXRlbUNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHAgPSAoMCwgdXRpbF8xLmdldERlZmF1bHRQcm9tcHQpKHByb3BzLmZvbGxvd1VwRGF0YS5rZXlXb3JkKTtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlTWVudUl0ZW1DbGljayhwKTtcbiAgICAgICAgICAgICAgICB9IH0sIFwiRGVmYXVsdFwiKSxcbiAgICAgICAgICAgIHByb3BzLnByb21wdExpc3QubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIDxidXR0b24gb25DbGljaz17KCkgPT4gaGFuZGxlTWVudUl0ZW1DbGljayhpdGVtKX0+e2l0ZW0udGl0bGV9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFByb21wdEJ1dHRvbiwgeyBkaXNhYmxlOiAhKHVzZXJJbmZvID09PSBudWxsIHx8IHVzZXJJbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VySW5mby52ZXJpZmllZCksIGhhbmRsZU1lbnVJdGVtQ2xpY2s6ICgpID0+IGhhbmRsZU1lbnVJdGVtQ2xpY2soaXRlbSkgfSwgaXRlbS50aXRsZSk7XG4gICAgICAgICAgICB9KSkpKTtcbn1cbmV4cG9ydHMuUHJvbXB0TGlzdCA9IFByb21wdExpc3Q7XG5jb25zdCBTdHlsZWRCdXR0b24gPSBzdHlsZWRfY29tcG9uZW50c18xLmRlZmF1bHQuYnV0dG9uIGBcblxuICAgIHBhZGRpbmc6IDZweDtcbiAgICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIGN1cnNvcjogdW5zZXQ7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjojRjZGNkY2O1xuICAgIH1cbmA7XG5mdW5jdGlvbiBQcm9tcHRCdXR0b24ocHJvcHMpIHtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFN0eWxlZEJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICc0cHgnLFxuICAgICAgICAgICAgcG9pbnRlckV2ZW50czogcHJvcHMuZGlzYWJsZSA/ICdub25lJyA6ICdhdXRvJ1xuICAgICAgICB9LCBvbkNsaWNrOiBwcm9wcy5oYW5kbGVNZW51SXRlbUNsaWNrIH0sIHByb3BzLmNoaWxkcmVuKSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TZWxlY3Rpb24gPSB2b2lkIDA7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCBsb2NhbGVfMSA9IHJlcXVpcmUoXCIuLi9saWIvbG9jYWxlXCIpO1xuY29uc3QgbGFuZ18xID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xuY29uc3QgaWNvbnNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9pY29uc1wiKTtcbi8vIGNvbnN0IHVzZVN0eWxlcyA9IGNyZWF0ZVVzZVN0eWxlcyh7XG4vLyAgIG1vcmVCdXR0b246IHtcbi8vICAgICBjb2xvcjogJyNGMDhBMjQnLFxuLy8gICAgIFwiJjpob3ZlclwiOiB7XG4vLyAgICAgICBjb2xvcjogJ3JlZCdcbi8vICAgICB9XG4vLyAgIH0sXG4vLyB9KVxuY29uc3Qgc3R5bGUgPSBgXG4gICNTY291dGVyU2VsZWN0aW9uPnNwYW4ge1xuICAgIGZvbnQtc2l0ZToxMnB4O1xuICAgIGNvbG9yOiM2NjY7XG4gIH1cbiAgLm1vcmVCdXR0b24ge1xuICAgIGNvbG9yOiAjRjA4QTI0O1xuICAgIGN1cnNvcjpwb2ludGVyO1xuICAgIG1hcmdpbjowcHggMnB4O1xuICB9XG4gIC5tb3JlQnV0dG9uOmhvdmVyIHtcbiAgICBvcGFjaXR5OjAuODtcbiAgfVxuXG5gO1xuZnVuY3Rpb24gU2VsZWN0aW9uKHByb3BzKSB7XG4gICAgY29uc3QgW3RhcmdldExhbmd1YWdlLCBzZXRUYXJnZXRMYW5ndWFnZV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoJ0VuZ2xpc2gnKTtcbiAgICBjb25zdCBbc2hvd0Z1bGxUZXh0LCBzZXRTaG93RnVsbFRleHRdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHRydWUpO1xuICAgIGNvbnN0IFtwbGF5U3RhdHVzLCBzZXRQbGF5U3RhdHVzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgLy8g6I635Y+W55So5oi36K6+572u55qE6K+t6KiA5L+h5oGvXG4gICAgbGV0IExhbmcgPSAoMCwgbG9jYWxlXzEudXNlQ3VycmVudExhbmd1YWdlKSgpO1xuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICBzZXRUYXJnZXRMYW5ndWFnZShMYW5nWyd0YXJnZXQnXVsnaWQnXSk7XG4gICAgICAgIHNldFNob3dGdWxsVGV4dChwcm9wcy50ZXh0Lmxlbmd0aCA8PSAxNDApO1xuICAgICAgICBzZXRQbGF5U3RhdHVzKGZhbHNlKTtcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcihvblN0b3JhZ2VDaGFuZ2UpO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLm9uQ2hhbmdlZC5yZW1vdmVMaXN0ZW5lcihvblN0b3JhZ2VDaGFuZ2UpO1xuICAgICAgICB9O1xuICAgIH0sIFtwcm9wcy50ZXh0XSk7XG4gICAgLy8g6K+t6Z+z5pKt5oqlXG4gICAgY29uc3Qgc3BlYWtlciA9ICgpID0+IHtcbiAgICAgICAgLy8g6K+G5Yir6K+t6KiAXG4gICAgICAgIC8vIGNvbnN0IGxuZ0RldGVjdG9yID0gbmV3IExhbmd1YWdlRGV0ZWN0KCk7XG4gICAgICAgIC8vIGxuZ0RldGVjdG9yLnNldExhbmd1YWdlVHlwZSgnaXNvMicpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGxuZ0RldGVjdG9yLmRldGVjdChwcm9wcy50ZXh0LCAyKSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAoMCwgdXRpbF8xLnBsYXlUZXh0VG9TcGVlY2gpKHByb3BzLnRleHQsIGxhbmdfMS5sYW5ndWFnZUNvZGVzW3RhcmdldExhbmd1YWdlXSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyDmmoLlgZzkuIrkuIDmrKHmkq3miqXku7vliqFcbiAgICAgICAgICAgIHNwZWVjaFN5bnRoZXNpcy5jYW5jZWwoKTtcbiAgICAgICAgICAgIGNvbnN0IHV0dGVyYW5jZSA9IG5ldyBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UocHJvcHMudGV4dCk7XG4gICAgICAgICAgICAvLyDor63np41cbiAgICAgICAgICAgIHV0dGVyYW5jZS5sYW5nID0gbGFuZ18xLmxhbmd1YWdlQ29kZXNbdGFyZ2V0TGFuZ3VhZ2VdO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobGFuZ3VhZ2VDb2Rlc1t0YXJnZXRMYW5ndWFnZSBhcyBrZXlvZiB0eXBlb2YgbGFuZ3VhZ2VDb2Rlc10pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGFyZ2V0TGFuZ3VhZ2UpO1xuICAgICAgICAgICAgLy8g6K+t6YCfXG4gICAgICAgICAgICBpZiAocGxheVN0YXR1cykge1xuICAgICAgICAgICAgICAgIC8vIOWfuuaVsOasoeaSreaUvuaXtumHh+eUqOaFoumAn+aSreaUvu+8jOiuqeeUqOaIt+WPr+S7peWQrOeahOabtOa4healmlxuICAgICAgICAgICAgICAgIHV0dGVyYW5jZS5yYXRlID0gMC42O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXR0ZXJhbmNlLnJhdGUgPSAwLjg1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0UGxheVN0YXR1cyghcGxheVN0YXR1cyk7XG4gICAgICAgICAgICAvLyDlvIDmkq3lkKdcbiAgICAgICAgICAgIHNwZWVjaFN5bnRoZXNpcy5zcGVhayh1dHRlcmFuY2UpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFtcGxpdHVkZS50cmFjaygnc3BlYWsnKTtcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdzcGVhaycgfSk7XG4gICAgfTtcbiAgICBjb25zdCBvblN0b3JhZ2VDaGFuZ2UgPSAoY2hhbmdlcywgYXJlYSkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjaGFuZ2VzKTtcbiAgICAgICAgLy8g5pu05paw55uu5qCH6K+t6KiAXG4gICAgICAgIGlmICgndGFyZ2V0TGFuZ3VhZ2UnIGluIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjaGFuZ2VzJyk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjaGFuZ2VzWyd0YXJnZXRMYW5ndWFnZSddWyduZXdWYWx1ZSddKTtcbiAgICAgICAgICAgIHNldFRhcmdldExhbmd1YWdlKGNoYW5nZXNbJ3RhcmdldExhbmd1YWdlJ11bJ25ld1ZhbHVlJ10pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVUb2dnbGVTaG93RnVuVGV4dCA9ICgpID0+IHtcbiAgICAgICAgc2V0U2hvd0Z1bGxUZXh0KCFzaG93RnVsbFRleHQpO1xuICAgIH07XG4gICAgLy8gY29uc3QgY2xhc3NlcyA9IHVzZVN0eWxlcygpXG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIiwgbnVsbCwgc3R5bGUpLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBcIlNjb3V0ZXJTZWxlY3Rpb25cIiwgY2xhc3NOYW1lOiAnJywgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nQm90dG9tOiAnNnB4JyxcbiAgICAgICAgICAgICAgICBtYXJnaW46ICc4cHggMCcsXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzEuNSdcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHNob3dGdWxsVGV4dCA/IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgcHJvcHMudGV4dCksXG4gICAgICAgICAgICAgICAgcHJvcHMudGV4dC5sZW5ndGggPiAxNDAgJiYgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgY2xhc3NOYW1lOiAnbW9yZUJ1dHRvbicsIG9uQ2xpY2s6IGhhbmRsZVRvZ2dsZVNob3dGdW5UZXh0IH0sIFwiTGVzc1wiKSlcbiAgICAgICAgICAgICAgICA6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHByb3BzLnRleHQuc3Vic3RyaW5nKDAsIDE0MCkgKyAnLi4uJyksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGNsYXNzTmFtZTogJ21vcmVCdXR0b24nLCBvbkNsaWNrOiBoYW5kbGVUb2dnbGVTaG93RnVuVGV4dCB9LCBcIk1vcmVcIikpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJzJweCdcbiAgICAgICAgICAgICAgICB9LCBzaXplOiBcInNtYWxsXCIsIHR5cGU6IFwidGV4dFwiLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkN1c3RvbWVyU2VydmljZU91dGxpbmVkLCBudWxsKSwgb25DbGljazogc3BlYWtlciB9KSkpKTtcbn1cbmV4cG9ydHMuU2VsZWN0aW9uID0gU2VsZWN0aW9uO1xuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Qb3B1cENhcmQgPSB2b2lkIDA7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHJlYWN0X3NwcmluZ18xID0gcmVxdWlyZShcInJlYWN0LXNwcmluZ1wiKTtcbmNvbnN0IGNvbnRlbnRfc2NyaXB0XzEgPSByZXF1aXJlKFwiLi4vY29udGVudF9zY3JpcHRcIik7XG5jb25zdCBOYXZfMSA9IHJlcXVpcmUoXCIuLi9Db21wb25lbnRzL05hdlwiKTtcbmNvbnN0IEN1c3RvbVByb21wdEZvcm1fMSA9IHJlcXVpcmUoXCIuLi9Db21wb25lbnRzL0N1c3RvbVByb21wdEZvcm1cIik7XG5jb25zdCBNZXNzYWdlXzEgPSByZXF1aXJlKFwiLi9NZXNzYWdlXCIpO1xuY29uc3QgUHJvbXB0TGlzdF8xID0gcmVxdWlyZShcIi4vUHJvbXB0TGlzdFwiKTtcbmNvbnN0IFNlbGVjdGlvbl8xID0gcmVxdWlyZShcIi4vU2VsZWN0aW9uXCIpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCBpY29uc18xID0gcmVxdWlyZShcIkBhbnQtZGVzaWduL2ljb25zXCIpO1xuY29uc3QgbG9jYWxlXzEgPSByZXF1aXJlKFwiLi4vbGliL2xvY2FsZVwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5sZXQgY3VycmVudExhbmd1YWdlO1xubGV0IHRhcmdldExhbmd1YWdlO1xubGV0IGFua2lDYXJkcztcbigwLCB1dGlsXzEuZ2V0QW5raUNhcmRzKSgpLnRoZW4oKGNhcmRzKSA9PiB7XG4gICAgYW5raUNhcmRzID0gY2FyZHM7XG59KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhlcnJvcik7XG59KTtcbmNvbnN0IHsgVGV4dEFyZWEgfSA9IGFudGRfMS5JbnB1dDtcbi8vIGNvbnN0IEFua2lDb250ZXh0ID0gY3JlYXRlQ29udGV4dChudWxsKTtcbmZ1bmN0aW9uIFBvcHVwQ2FyZChwcm9wcykge1xuICAgIC8vIGNvbnN0IFttZXNzYWdlcywgc2V0TWVzc2FnZXNdID0gdXNlU3RhdGU8QXJyYXk8eyBjb250ZW50OiBzdHJpbmcsIHJvbGU6IHN0cmluZywgbG9hZGluZzogYm9vbGVhbiwgY2hhdElkOiBzdHJpbmcsIHByb21wdDogc3RyaW5nLCBzdGF0dXM6IHN0cmluZyB9Pj4oW3sgJ2NvbnRlbnQnOiAnJywgJ3JvbGUnOiAndXNlcicsICdsb2FkaW5nJzogZmFsc2UsICdjaGF0SWQnOiAnJywgJ3Byb21wdCc6ICcnLCAnc3RhdHVzJzogJycgfV0pXG4gICAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoW3sgJ2NvbnRlbnQnOiAnJywgJ3JvbGUnOiAndXNlcicsICdsb2FkaW5nJzogZmFsc2UsICdjaGF0SWQnOiAnJywgJ3Byb21wdCc6ICcnLCAnc3RhdHVzJzogJycsICdzaG93SW1hZ2VzQm94JzogdHJ1ZSwgJ2ltYWdlcyc6IFtdIH1dKTtcbiAgICBjb25zdCBbaW1hZ2VzLCBzZXRJbWFnZXNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKFtdKTtcbiAgICBjb25zdCBbc2hvd0ltYWdlc0JveCwgc2V0U2hvd0ltYWdlc0JveF0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtwcm9tcHRzLCBzZXRQcm9tcHRzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShbXSk7XG4gICAgY29uc3QgW2xhc3RFeGVjdXRlZFByb21wdCwgc2V0TGFzdEV4ZWN1dGVkUHJvbXB0XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7ICd0aXRsZSc6ICfwn5GJ8J+PvCBQbGVhc2UgY2hvb3NlIGEgcHJvbXB0JywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZmFsc2UsICd1c2VyUHJvbXB0JzogJycsICdpZCc6ICcnIH0pO1xuICAgIGNvbnN0IFtpc09wZW5NZW51LCBzZXRJc09wZW5NZW51XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh0cnVlKTtcbiAgICBjb25zdCBbaXNQb3BvdmVyT3Blbiwgc2V0UG9wb3Zlck9wZW5dID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbY3VzdG9tUHJvbXB0Rm9ybURhdGEsIHNldEN1c3RvbVByb21wdEZvcm1EYXRhXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7ICd0aXRsZSc6ICcnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBmYWxzZSwgJ3VzZXJQcm9tcHQnOiAnJywgJ2lkJzogJycgfSk7XG4gICAgLy8gc3RhbmRieSxub3JtYWwsbG9hZGluZyxzdWNjZXNzXG4gICAgY29uc3QgW2FkZFRvQW5raVN0YXR1cywgc2V0QWRkVG9BbmtpU3RhdHVzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7ICdzdGF0dXMnOiAnc3RhbmRieScsICdub3RlSWQnOiAwIH0pO1xuICAgIGNvbnN0IFtpc0Fuc3dlckRvbmUsIHNldEFuc3dlckRvbmVdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbZm9sbG93VXBEYXRhLCBzZXRGb2xsb3dVcERhdGFdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHsga2V5V29yZDogJycsIHNlbnRlbmNlOiAnJyB9KTtcbiAgICBjb25zdCBbc2hvd0ZvbGxvd1VwRGF0YU1lbnUsIHNldFNob3dGb2xsb3dVcERhdGFNZW51XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7IHNob3c6IGZhbHNlLCBzdHlsZToge30gfSk7XG4gICAgY29uc3QgW2lzQXBpRXJybywgc2V0SXNBcGlFcnJvXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3QgW2lzQW5zd2VySW5wdXRlZCwgc2V0SXNBbnN3ZXJJbnB1dGVkXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgLy8g56qX5Y+j5ouW5ou96YC76L6RXG4gICAgY29uc3QgW2RyYWdnaW5nLCBzZXREcmFnZ2luZ10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IHdpbmRvd0VsZW1lbnQgPSAoMCwgcmVhY3RfMS51c2VSZWYpKG51bGwpO1xuICAgIGNvbnN0IG1lc3NhZ2VzTGlzdCA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3QgaW5wdXRSZWYgPSAoMCwgcmVhY3RfMS51c2VSZWYpKG51bGwpO1xuICAgIGNvbnN0IHNob3VsZFN0YXlBdEJvdHRvbVJlZiA9ICgwLCByZWFjdF8xLnVzZVJlZikoZmFsc2UpO1xuICAgIGNvbnN0IHVzZXJJbmZvUmVmID0gKDAsIHJlYWN0XzEudXNlUmVmKSgpO1xuICAgIGNvbnN0IFtmb3JtXSA9IGFudGRfMS5Gb3JtLnVzZUZvcm0oKTtcbiAgICAvLyDkvb/nlKjplb/ov57mjqVcbiAgICBsZXQgcG9ydCA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5jb25uZWN0KHtcbiAgICAgICAgbmFtZTogJ2dldEdQVCdcbiAgICB9KTtcbiAgICBsZXQgTGFuZyA9ICgwLCBsb2NhbGVfMS51c2VDdXJyZW50TGFuZ3VhZ2UpKCk7XG4gICAgY3VycmVudExhbmd1YWdlID0gTGFuZ1snY3VycmVudCddWyduYW1lJ107XG4gICAgdGFyZ2V0TGFuZ3VhZ2UgPSBMYW5nWyd0YXJnZXQnXVsnbmFtZSddO1xuICAgIC8vIGNvbnN0IHVzZXJJbmZvID0gdXNlVXNlckluZm9Db250ZXh0KClcbiAgICAvLyBjb25zb2xlLmxvZygndXNlckluZm86Jyk7XG4gICAgLy8gY29uc29sZS5sb2codXNlckluZm8pO1xuICAgIC8vIOaOp+WItui/vemXruiPnOWNlVxuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHBvcnQgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgICAgICAgICBuYW1lOiAnZnJvbVBvcHVwQ2FyZCdcbiAgICAgICAgfSk7XG4gICAgICAgIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKChtc2cpID0+IHtcbiAgICAgICAgICAgIGlmIChtc2cudHlwZSA9PT0gXCJVUERBVEVfUE9QVVBfQ0FSRFwiKSB7XG4gICAgICAgICAgICAgICAgLy8g5pi+56S6IFByb21wdCDoj5zljZVcbiAgICAgICAgICAgICAgICBzZXRGb2xsb3dVcERhdGEobXNnLnBheWxvYWQuZm9sbG93VXBEYXRhKTtcbiAgICAgICAgICAgICAgICAvL+iuvue9ruiPnOWNleeahOS9jee9rlxuICAgICAgICAgICAgICAgIHNldFNob3dGb2xsb3dVcERhdGFNZW51KHByZXYgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBtc2cucGF5bG9hZC5zdHlsZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIChfYSA9IHdpbmRvd0VsZW1lbnQuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENhcmRDbGljayk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndXNlRWZmZWN0IHJldHVybicpO1xuICAgICAgICAgICAgKF9hID0gd2luZG93RWxlbWVudC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2FyZENsaWNrKTtcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUG9wdXBDYXJkQ2xpY2soKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2hvd0ZvbGxvd1VwRGF0YU1lbnUuc2hvdykge1xuICAgICAgICAgICAgICAgICAgICBzZXRTaG93Rm9sbG93VXBEYXRhTWVudShwcmV2ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgIH1cbiAgICB9LCBbc2hvd0ZvbGxvd1VwRGF0YU1lbnVdKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgLy8g5riy5p+TIFByb21wdCDliJfooahcbiAgICAgICAgaW5pdGlhbGl6ZVByb21wdExpc3QoKTtcbiAgICAgICAgaWYgKHByb3BzLnJ1blByb21wdCB8fCBwcm9wcy5ydW5Qcm9tcHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8g6I635Y+W5pyA6L+R5LiA5qyh5omn6KGM55qEIFByb21wdFxuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLmdldCh7IFwibGFzdEV4ZWN1dGVkUHJvbXB0XCI6ICcnIH0pLnRoZW4oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5sYXN0RXhlY3V0ZWRQcm9tcHQgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOaJp+ihjOm7mOiupCBQcm9tcHTjgIHojrflj5YgVW5zcGxhc2gg5Zu+54mHXG4gICAgICAgICAgICAgICAgICAgIGV4ZWN1dGl2ZVByb21wdCh7ICd0aXRsZSc6ICdEZWZhdWx0JywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogdHJ1ZSwgJ3VzZXJQcm9tcHQnOiBgV29yZDpcInt7a2V5V29yZH19XCIsIHNlbnRlbmNlOiBcInt7c2VudGVuY2V9fVwiYCwgJ2lkJzogJ0RlZmF1bHQnIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5omn6KGMIFByb21wdOOAgeiOt+WPliBVbnNwbGFzaCDlm77niYdcbiAgICAgICAgICAgICAgICAgICAgZXhlY3V0aXZlUHJvbXB0KGl0ZW0ubGFzdEV4ZWN1dGVkUHJvbXB0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIOS4jeaJp+ihjOS7u+S9lSBQcm9tcHTvvIznlLHnlKjmiLfoh6rooYzpgInmi6lcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfkuI3miafooYzku7vkvZUgUHJvbXB077yM55Sx55So5oi36Ieq6KGM6YCJ5oupJyk7XG4gICAgICAgICAgICAvLyDmiafooYzpu5jorqQgUHJvbXB044CB6I635Y+WIFVuc3BsYXNoIOWbvueJh1xuICAgICAgICAgICAgZXhlY3V0aXZlUHJvbXB0KHsgJ3RpdGxlJzogJ0RlZmF1bHQnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiB0cnVlLCAndXNlclByb21wdCc6IGBXb3JkOlwie3trZXlXb3JkfX1cIiwgc2VudGVuY2U6IFwie3tzZW50ZW5jZX19XCJgLCAnaWQnOiAnRGVmYXVsdCcgfSwgZmFsc2UpO1xuICAgICAgICAgICAgc2V0SXNPcGVuTWVudSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyDorr7nva7nqpflj6PnmoTpu5jorqTkvY3nva7jgIHmt7vliqDmu5rliqjkuovku7bvvIzorqnmtojmga/liJfooajoh6rliqjmu5rliqjliLDlupXpg6hcbiAgICAgICAgKDAsIHV0aWxfMS53aW5kb3dJbml0aWFsaXphdGlvbikoeyAnaXNQaW4nOiBwcm9wcy5pc1BpbiwgJ3dpbmRvd0VsZW1lbnQnOiB3aW5kb3dFbGVtZW50LCAnc2VsZWN0aW9uJzogcHJvcHMuc2VsZWN0aW9uLCAnbWVzc2FnZXNMaXN0JzogbWVzc2FnZXNMaXN0IH0pO1xuICAgIH0sIFtwcm9wc10pO1xuICAgIC8vIOiBiuWkqeiusOW9leaUueWPmOaXtlxuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICAvLyDorrDlvZXlvZPliY3liJfooajnmoTkvY3nva5cbiAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQuY3VycmVudCkge1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2luZG93RWxlbWVudC5jdXJyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250YWluZXInKVswXTtcbiAgICAgICAgICAgIHNob3VsZFN0YXlBdEJvdHRvbVJlZi5jdXJyZW50ID0gY29udGFpbmVyLnNjcm9sbEhlaWdodCAtIGNvbnRhaW5lci5zY3JvbGxUb3AgPD0gY29udGFpbmVyLmNsaWVudEhlaWdodCArIDIwO1xuICAgICAgICAgICAgLy8g6Ieq5Yqo5rua5Yqo5Yiw5raI5oGv5bqV6YOo77yM5pa55L6/55yL5Yiw5pyA5paw55qE5paH5a2XXG4gICAgICAgICAgICBpZiAobWVzc2FnZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlc1ttZXNzYWdlcy5sZW5ndGggLSAxXS5sb2FkaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvQm90dG9tKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9Cb3R0b20oc2hvdWxkU3RheUF0Qm90dG9tUmVmLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICAvLyAgIGlmIChjb250YWluZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgY2hlY2tJZlNob3VsZFN0YXlBdEJvdHRvbSk7XG4gICAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfVxuICAgIH0sIFttZXNzYWdlc10pO1xuICAgIC8vIOeql+WPo+aLluaLveaXtuinpuWPkVxuICAgICgwLCByZWFjdF8xLnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVNb3VzZU1vdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2VVcCk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndXNlRWZmZWN0IHJldHVybicpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZVVwKTtcbiAgICAgICAgfTtcbiAgICB9LCBbZHJhZ2dpbmddKTtcbiAgICAvLyDkv53lrZjljoblj7LorrDlvZVcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgLy8g5ZyoIG9wZW5BcGlBbnNlciDmm7TmlrDlkI7lsIblhbbkv53lrZjliLDmtY/op4jlmajlrZjlgqjkuK1cbiAgICAgICAgLy8g5Y+q5L+d55WZ5raI5oGv6K6w5b2V55qE56ysIDEg5p2h77yM5aaC5p6c6L+Z5p2h5raI5aSx5piv6ZSZ6K+v5o+Q56S677yM5YiZ5LiN5L+d5a2YXG4gICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPiAwICYmIGlzQW5zd2VyRG9uZSAmJiBtZXNzYWdlc1swXVsnc3RhdHVzJ10gPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1NhdmUnKTtcbiAgICAgICAgICAgIGNvbnN0IGtleVdvcmQgPSBwcm9wcy5kYXRhLmtleVdvcmQ7XG4gICAgICAgICAgICBjb25zdCBTZW50ZW5jZSA9IHByb3BzLmRhdGEuU2VudGVuY2U7XG4gICAgICAgICAgICAvLyDlsIbmn6Xor6LorrDlvZXkv53lrZjotbfmnaVcbiAgICAgICAgICAgIGNvbnN0IG5ld0hpc3RvcnkgPSB7XG4gICAgICAgICAgICAgICAgJ2tleVdvcmQnOiBrZXlXb3JkLFxuICAgICAgICAgICAgICAgICdzZW50ZW5jZSc6IFNlbnRlbmNlLFxuICAgICAgICAgICAgICAgICdyb2xlJzogbWVzc2FnZXNbMF1bJ3JvbGUnXSxcbiAgICAgICAgICAgICAgICAnYW5zd2VyJzogbWVzc2FnZXNbMF1bJ2NvbnRlbnQnXSxcbiAgICAgICAgICAgICAgICAnc291cmNlJzogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICAgICAgJ3Byb21wdCc6IG1lc3NhZ2VzWzBdWydwcm9tcHQnXSxcbiAgICAgICAgICAgICAgICAnaW1hZ2VzJzogbWVzc2FnZXNbMF1bJ2ltYWdlcyddXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGtleVdvcmQgIT09ICcnICYmIFNlbnRlbmNlICE9PSAnJyAmJiBtZXNzYWdlc1swXVsnY29udGVudCddICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5nZXQoeyBcImhpc3RvcnlcIjogW10gfSkudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpdGVtLmhpc3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SGlzdG9yeUxpc3QgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJpbmdvID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIG5ld0hpc3RvcnlMaXN0LnB1c2gobmV3SGlzdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0uaGlzdG9yeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOiusOW9leW3suWtmOWcqO+8jOWImeS4jemHjeWkjeS/neWtmFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtLmhpc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gaXRlbS5oaXN0b3J5W2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoua2V5V29yZCA9PT0gbmV3SGlzdG9yeVsna2V5V29yZCddICYmIG9iai5zZW50ZW5jZSA9PT0gbmV3SGlzdG9yeVsnc2VudGVuY2UnXSAmJiBvYmoucHJvbXB0ID09PSBuZXdIaXN0b3J5Wydwcm9tcHQnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5nbyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0hpc3RvcnlMaXN0ID0gaXRlbS5oaXN0b3J5O1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SGlzdG9yeUxpc3QudW5zaGlmdChuZXdIaXN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0hpc3RvcnlMaXN0LnNwbGljZSg4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld0hpc3RvcnlMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWJpbmdvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXN0b3J5OiBuZXdIaXN0b3J5TGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIFtpc0Fuc3dlckRvbmVdKTtcbiAgICBjb25zdCBleGVjdXRpdmVQcm9tcHQgPSAocHJvbXB0LCBydW5Qcm9tcHQsIGltYWdlVG9SZXJlbmRlciwgZGF0YSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnU3RvcFRoZUNvbnZlcnNhdGlvbicsICdtZXNzYWdlcyc6ICcnIH0pXG4gICAgICAgIC8vIOiuvue9ruWKoOi9veeKtuaAgVxuICAgICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICAgIGxldCBuZWVkVG9SdW5Qcm9tcHQgPSBydW5Qcm9tcHQ7XG4gICAgICAgIGlmIChuZWVkVG9SdW5Qcm9tcHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbmVlZFRvUnVuUHJvbXB0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmVlZFRvUmVyZW5kZXJJbWFnZSA9IGltYWdlVG9SZXJlbmRlcjtcbiAgICAgICAgaWYgKG5lZWRUb1JlcmVuZGVySW1hZ2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbmVlZFRvUmVyZW5kZXJJbWFnZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGtleVdvcmQgPSBwcm9wcy5kYXRhLmtleVdvcmQ7XG4gICAgICAgIGxldCBTZW50ZW5jZSA9IHByb3BzLmRhdGEuU2VudGVuY2U7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGtleVdvcmQgPSBkYXRhLmtleVdvcmQ7XG4gICAgICAgICAgICBTZW50ZW5jZSA9IGRhdGEuc2VudGVuY2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyDliJ3lp4vljJZcbiAgICAgICAgICAgIHNldE1lc3NhZ2VzKFtdKTsgLy8g5a+56K+d5YiX6KGoXG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgKG5lZWRUb1JlcmVuZGVySW1hZ2UpIHtcbiAgICAgICAgLy8gICBzZXRJbWFnZXMoW10pICAgICAvLyDlm77niYfliJfooahcbiAgICAgICAgLy8gfVxuICAgICAgICBsZXQgc2hvd0ltYWdlc0JveCA9IHRydWU7XG4gICAgICAgIGlmIChwcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMgJiYgbmVlZFRvUnVuUHJvbXB0KSB7XG4gICAgICAgICAgICAvLyDlpoLmnpzlvZPliY0gUHJvbXB0IOmcgOimgeaYvuekuuWbvueJh++8jOS4lOW9k+WJjemcgOimgeeri+WNs+aJp+ihjCBQcm9tcHRcbiAgICAgICAgICAgIHNob3dJbWFnZXNCb3ggPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2hvd0ltYWdlc0JveCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZWVkVG9SdW5Qcm9tcHQpIHtcbiAgICAgICAgICAgIC8vIGFtcGxpdHVkZS50cmFjaygnZXhlY3V0aXZlUHJvbXB0Jyk7XG4gICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ2V4ZWN1dGl2ZVByb21wdCcgfSk7XG4gICAgICAgICAgICAvLyDlnKjmtojmga/ljoblj7LkuK3mj5LlhaXmlrDorrDlvZVcbiAgICAgICAgICAgIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiBbLi4ucHJldk1lc3NhZ2VzLCB7ICdjb250ZW50JzogJycsICdyb2xlJzogJ2Fzc2lzdGFudCcsICdsb2FkaW5nJzogdHJ1ZSwgJ2NoYXRJZCc6ICcnLCAncHJvbXB0JzogJycsICdzdGF0dXMnOiAnJywgJ3Nob3dJbWFnZXNCb3gnOiBzaG93SW1hZ2VzQm94LCAnaW1hZ2VzJzogW10gfV0pO1xuICAgICAgICAgICAgLy8g6Z2e6L+96Zeu5pe277yM5omN5Lya6K6w5b2V5pyA6L+R5omn6KGM55qEIFByb21wdFxuICAgICAgICAgICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIOiuvue9ruacgOi/keaJp+ihjOeahCBQcm9tcHRcbiAgICAgICAgICAgICAgICBzZXRMYXN0RXhlY3V0ZWRQcm9tcHQocHJvbXB0KTtcbiAgICAgICAgICAgICAgICAvLyDorrDlvZXmnIDov5EgMSDmrKHkvb/nlKjnmoQgUHJvbXB0XG4gICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLnNldCh7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RFeGVjdXRlZFByb21wdDogcHJvbXB0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDlpITnkIYgUHJvbXB0IOS4reeahOWPmOmHj1xuICAgICAgICAgICAgbGV0IG5ld1Byb21wdDtcbiAgICAgICAgICAgIGxldCBwID0gcHJvbXB0LnVzZXJQcm9tcHQ7XG4gICAgICAgICAgICBpZiAocHJvbXB0LmlkID09ICdEZWZhdWx0Jykge1xuICAgICAgICAgICAgICAgIHAgPSAoMCwgdXRpbF8xLmdldERlZmF1bHRQcm9tcHQpKGtleVdvcmQpWyd1c2VyUHJvbXB0J107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDlpITnkIYgUHJvbXB0IOS4reeahOWPmOmHj1xuICAgICAgICAgICAgcCA9IHlpZWxkICgwLCB1dGlsXzEuaGFuZGxlUHJvbXB0VmFyaWFibGVzKShwLCBrZXlXb3JkLCBTZW50ZW5jZSwgTGFuZyk7XG4gICAgICAgICAgICBuZXdQcm9tcHQgPSBbeyAncm9sZSc6ICd1c2VyJywgJ2NvbnRlbnQnOiBwIH1dO1xuICAgICAgICAgICAgLy8g5aaC5p6c5Y6G5Y+y6K6w5b2V5Lit5a2Y5Zyo6K6w5b2V77yM5YiZ5LiN6YeN5aSN6K+35rGCIEFQSe+8jOebtOaOpeaYvuekuuWOhuWPsuiusOW9leeahOS/oeaBr1xuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLmdldCh7IFwiaGlzdG9yeVwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c6K6w5b2V5bey5a2Y5Zyo77yM5YiZ5LiN6YeN5aSN5L+d5a2YXG4gICAgICAgICAgICAgICAgbGV0IGJpbmdvID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtLmhpc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IGl0ZW0uaGlzdG9yeVtpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5rZXlXb3JkID09PSBrZXlXb3JkICYmIG9iai5zZW50ZW5jZSA9PT0gU2VudGVuY2UgJiYgb2JqLnByb21wdCA9PT0gbmV3UHJvbXB0WzBdWydjb250ZW50J10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgncm9sZScgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDml6fniYjmnKzkuK3lm6DkuLrmsqHmnInlrZjlgqggcm9sZSDvvIznm7TmjqXmmL7npLrljoblj7LmlbDmja7ml7bkvJrlr7zoh7TlkI7nu63mtYHnqIvlvILluLhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5nbyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYmluZ28gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g55u05o6l5pi+56S65Y6G5Y+y6K6w5b2V5Lit55qE5Zue562UXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RNZXNzYWdlID0gcHJldk1lc3NhZ2VzW3ByZXZNZXNzYWdlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkTGFzdE1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxhc3RNZXNzYWdlKSwgeyBjaGF0SWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSwgcm9sZTogb2JqLnJvbGUsIGNvbnRlbnQ6IG9iai5hbnN3ZXIsIHByb21wdDogbmV3UHJvbXB0WzBdWydjb250ZW50J10sIGxvYWRpbmc6IGZhbHNlLCBzdGF0dXM6ICdzdWNjZXNzJywgaW1hZ2VzOiBvYmouaW1hZ2VzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbLi4ucHJldk1lc3NhZ2VzLnNsaWNlKDAsIHByZXZNZXNzYWdlcy5sZW5ndGggLSAxKSwgdXBkYXRlZExhc3RNZXNzYWdlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEFuc3dlckRvbmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g5peg5Y6G5Y+y6K6w5b2VXG4gICAgICAgICAgICAgICAgaWYgKCFiaW5nbykge1xuICAgICAgICAgICAgICAgICAgICAvLyDor7fmsYIgQUkg5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgIGdldEdQVE1zZyhuZXdQcm9tcHQsIGtleVdvcmQpO1xuICAgICAgICAgICAgICAgICAgICAvLyDor7fmsYLlm77niYdcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb21wdC5pZCA9PSAnRGVmYXVsdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXlXb3JkLmxlbmd0aCA8PSAyMCAmJiBwcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMgJiYgbmVlZFRvUmVyZW5kZXJJbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOiOt+WPluWbvueJh+aVsOaNrlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgwLCB1dGlsXzEuZ2V0VW5zcGxhc2hJbWFnZXMpKGtleVdvcmQpLnRoZW4oKGltZ3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0SW1hZ2VzKGltZ3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS/neWtmOWbvueJh+aVsOaNrlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBwcmV2TWVzc2FnZXNbcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZNZXNzYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkTGFzdE1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxhc3RNZXNzYWdlKSwgeyBuZWVkVG9TaG93SW1nOiB0cnVlLCBpbWFnZXM6IGltZ3MgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWy4uLnByZXZNZXNzYWdlcy5zbGljZSgwLCBwcmV2TWVzc2FnZXMubGVuZ3RoIC0gMSksIHVwZGF0ZWRMYXN0TWVzc2FnZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb21wdC5nZXRVbnNwbGFzaEltYWdlcyAmJiBuZWVkVG9SZXJlbmRlckltYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5Zu+54mH5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKDAsIHV0aWxfMS5nZXRVbnNwbGFzaEltYWdlcykoa2V5V29yZCkudGhlbigoaW1ncykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXRJbWFnZXMoaW1ncylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L+d5a2Y5Zu+54mH5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0TWVzc2FnZSA9IHByZXZNZXNzYWdlc1twcmV2TWVzc2FnZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldk1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRMYXN0TWVzc2FnZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbGFzdE1lc3NhZ2UpLCB7IG5lZWRUb1Nob3dJbWc6IHRydWUsIGltYWdlczogaW1ncyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbLi4ucHJldk1lc3NhZ2VzLnNsaWNlKDAsIHByZXZNZXNzYWdlcy5sZW5ndGggLSAxKSwgdXBkYXRlZExhc3RNZXNzYWdlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldExhc3RFeGVjdXRlZFByb21wdCh7ICd0aXRsZSc6ICcnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBmYWxzZSwgJ3VzZXJQcm9tcHQnOiAnJywgJ2lkJzogJycgfSk7XG4gICAgICAgICAgICBzZXRBbnN3ZXJEb25lKHRydWUpO1xuICAgICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgIC8vIOaVsOaNruWfi+eCuVxuICAgICAgICAgICAgLy8gYW1wbGl0dWRlLnRyYWNrKCdvcGVuUG9wdXBDYXJkJyk7XG4gICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ29wZW5Qb3B1cENhcmQnIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgaW5pdGlhbGl6ZVByb21wdExpc3QgPSAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOiOt+WPluW3suS/neWtmOeahCBQcm9tcHQgTGlzdFxuICAgICAgICBjb25zdCBwcm9tcHRMaXN0ID0geWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuZ2V0KHsgXCJwcm9tcHRMaXN0XCI6IFtdIH0pLnRoZW4oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnByb21wdExpc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRQcm9tcHRzKHByb21wdExpc3QpO1xuICAgIH0pO1xuICAgIGNvbnN0IGhhbmRsZVByb21wdEVkaXRlZCA9IChpc05ldykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyDliJ3lp4vljJYgUHJvbXB0IOWIl+ihqFxuICAgICAgICBpbml0aWFsaXplUHJvbXB0TGlzdCgpO1xuICAgICAgICAvLyDmm7TmlrDmnIDov5Hkvb/nlKjnmoQgUHJvbXB077yI6ZKI5a+557yW6L6R55qE5Zy65pmv77yJXG4gICAgICAgIGlmICghaXNOZXcpIHtcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7IFwicHJvbXB0TGlzdFwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtLnByb21wdExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ucHJvbXB0TGlzdFtpXS5pZCA9PT0gbGFzdEV4ZWN1dGVkUHJvbXB0LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmm7TmlrBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldExhc3RFeGVjdXRlZFByb21wdChpdGVtLnByb21wdExpc3RbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6K6w5b2V5pyA6L+RIDEg5qyh5L2/55So55qEIFByb21wdFxuICAgICAgICAgICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLnNldCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEV4ZWN1dGVkUHJvbXB0OiBpdGVtLnByb21wdExpc3RbaV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhbXBsaXR1ZGUudHJhY2soJ2hhbmRsZVByb21wdEVkaXRlZCcpO1xuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbXBsaXR1ZGVUcmFjaycsICduYW1lJzogJ2hhbmRsZVByb21wdEVkaXRlZCcgfSk7XG4gICAgfSk7XG4gICAgLy8g6K+35rGCIEdQVCDmlbDmja5cbiAgICBjb25zdCBnZXRHUFRNc2cgPSAocHJvbXB0LCBrZXlXb3JkKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIC8vIOS9v+eUqOmVv+i/nuaOpVxuICAgICAgICAvLyBsZXQgcG9ydCA9IGJyb3dzZXIucnVudGltZS5jb25uZWN0KHtcbiAgICAgICAgLy8gICBuYW1lOiAnZnJvbVBvcHVwQ2FyZCdcbiAgICAgICAgLy8gfSlcbiAgICAgICAgY29uc3QgdGhpc0tleVdvcmQgPSBrZXlXb3JkIHx8ICcnO1xuICAgICAgICAvLyDorr7nva7kuLrlm57nrZTkuK1cbiAgICAgICAgc2V0QW5zd2VyRG9uZShmYWxzZSk7XG4gICAgICAgIC8vIOemgeeUqOS/neWtmOWIsCBBbmtpIOaMiemSrlxuICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ3N0YW5kYnknLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgLy8g5Zyo5raI5oGv5Y6G5Y+y5Lit5o+S5YWl5paw6K6w5b2VXG4gICAgICAgIC8vIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiBbLi4ucHJldk1lc3NhZ2VzLCB7ICdjb250ZW50JzogJycsICdyb2xlJzogJ2Fzc2lzdGFudCcsICdsb2FkaW5nJzogdHJ1ZSwgJ2NoYXRJZCc6ICcnLCAncHJvbXB0JzogJycgfV0pXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgLy8g5L2/55SoIHBvc3RNcyDlj5HpgIHkv6Hmga9cbiAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdnZXRHUFRNc2cnLCAnbWVzc2FnZXMnOiBwcm9tcHQsICdrZXlXb3JkJzogdGhpc0tleVdvcmQgfSk7XG4gICAgICAgIH0sIDIwKTtcbiAgICAgICAgLy8g5o6l5pS25L+h5oGvXG4gICAgICAgIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKChtc2cpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdwb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcicpO1xuICAgICAgICAgICAgaWYgKG1zZy50eXBlID09PSAnc2VuZEdQVERhdGEnKSB7XG4gICAgICAgICAgICAgICAgLy8g6K+35rGCIEdQVCDmlbDmja7lpLHotKVcbiAgICAgICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PT0gJ2Vycm8nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHR5cGUgPT09ICdhczInID8gc2V0b3BlbkFwaUFuc2VyMihtc2cuY29udGVudCkgOiBzZXRvcGVuQXBpQW5zZXIobXNnLmNvbnRlbnQpXG4gICAgICAgICAgICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtc2cuY29kZSA9PT0gJ2ludmFsaWRfYXBpX2tleScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldElzQXBpRXJybyh0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgbXNnLmNvbnRlbnQgKz0gJ1xcXG4gICAgICAgICAgICBBZnRlciB0aGF0LCB5b3UgbmVlZCB0byBzZXQgdGhlIGNvcnJlY3QgT3BlbiBBUEkgS2V5IGluIHRoZSBTY291dGVyOic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RNZXNzYWdlID0gcHJldk1lc3NhZ2VzW3ByZXZNZXNzYWdlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IG5ld01zZ0xpc3QgPSBsYXN0TWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlZExhc3RNZXNzYWdlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBsYXN0TWVzc2FnZSksIHsgY2hhdElkOiBtc2cuY2hhdElkLCBjb250ZW50OiBtc2cuY29udGVudCwgbG9hZGluZzogZmFsc2UsIHN0YXR1czogJ2ludmFsaWRfYXBpX2tleScsIHByb21wdDogcHJvbXB0WzBdWydjb250ZW50J10sIGltYWdlczogW10gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBuZXdNc2dMaXN0ID0gWy4uLnByZXZNZXNzYWdlcy5zbGljZSgwLCBwcmV2TWVzc2FnZXMubGVuZ3RoIC0gMSksIGxhc3RNZXNzYWdlXVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5wcmV2TWVzc2FnZXMuc2xpY2UoMCwgcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDEpLCB1cGRhdGVkTGFzdE1lc3NhZ2VdO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2V0QW5zd2VyRG9uZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNBcGlFcnJvKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNldElzQXBpRXJybyhmYWxzZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g6K+35rGCIEdQVCDmlbDmja7miJDlip/kuJTmlbDmja7mtYHnu5PmnZ/kvKDovpNcbiAgICAgICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PT0gJ2VuZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6w5b2V5raI5oGv5Zue562U5a6M5q+V77yI6Kem5Y+R5L+d5a2Y5Y6G5Y+y6K6w5b2V77yJXG4gICAgICAgICAgICAgICAgICAgIHNldEFuc3dlckRvbmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIOivt+axgiBHUFQg5pWw5o2u5oiQ5Yqf5LiU5pWw5o2u5rWB5byA5aeL5Lyg6L6TXG4gICAgICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT09ICdiZWdpbicpIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g6K+35rGCIEdQVCDmlbDmja7miJDlip/kuJTmlbDmja7mtYHkvKDovpPkuK1cbiAgICAgICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PT0gJ3Byb2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmuLLmn5PmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldE1lc3NhZ2VzKHByZXZNZXNzYWdlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBwcmV2TWVzc2FnZXNbcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2TWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TXNnTGlzdCA9IGxhc3RNZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdDb250ZW50ID0gbmV3TXNnTGlzdC5jb250ZW50ICsgbXNnLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29udGVudCA9ICgwLCB1dGlsXzEuaGFuZGxlSGlnaHRsaWdodCkobmV3Q29udGVudCwgcHJvcHMuZGF0YS5rZXlXb3JkLCBhbmtpQ2FyZHMsIHdpbmRvd0VsZW1lbnQgPT09IG51bGwgfHwgd2luZG93RWxlbWVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2luZG93RWxlbWVudC5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXdDb250ZW50ID0gbmV3Q29udGVudC5yZXBsYWNlKC9vL2csICc8c3BhbiBzdHlsZT1cImNvbG9yOnJlZDtcIj5vPC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRMYXN0TWVzc2FnZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbGFzdE1lc3NhZ2UpLCB7IGNoYXRJZDogbXNnLmNoYXRJZCwgY29udGVudDogbmV3Q29udGVudCwgbG9hZGluZzogZmFsc2UsIHN0YXR1czogJ3N1Y2Nlc3MnLCBwcm9tcHQ6IHByb21wdFswXVsnY29udGVudCddIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IG5ld01zZ0xpc3QgPSBbLi4ucHJldk1lc3NhZ2VzLnNsaWNlKDAsIHByZXZNZXNzYWdlcy5sZW5ndGggLSAxKSwgbGFzdE1lc3NhZ2VdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5wcmV2TWVzc2FnZXMuc2xpY2UoMCwgcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDEpLCB1cGRhdGVkTGFzdE1lc3NhZ2VdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIOeUqOaIt+WPkemAgea2iOaBr1xuICAgIGNvbnN0IGhhbmRsZVNlbmRNZXNzYWdlID0gKHZhbHVlcykgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZXMpO1xuICAgICAgICBsZXQgcHJvbXB0ID0gdmFsdWVzLm1zZztcbiAgICAgICAgLy8g5riF56m65paH5pys5qGGXG4gICAgICAgIGZvcm0ucmVzZXRGaWVsZHMoKTtcbiAgICAgICAgLy8g56aB55So5Y+R6YCB5oyJ6ZKuXG4gICAgICAgIHNldElzQW5zd2VySW5wdXRlZChmYWxzZSk7XG4gICAgICAgIC8vIOWwhueUqOaIt+WPkeiogOWPkemAgeWIsOa2iOaBr+iusOW9leS4rVxuICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlZExhc3RNZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICBjaGF0SWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB2YWx1ZXMubXNnLFxuICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXR1czogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgIHByb21wdDogcHJvbXB0LFxuICAgICAgICAgICAgICAgIHNob3dJbWFnZXNCb3g6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGltYWdlczogW11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBjb25zdCBuZXdNc2dMaXN0ID0gWy4uLnByZXZNZXNzYWdlcy5zbGljZSgwLCBwcmV2TWVzc2FnZXMubGVuZ3RoIC0gMSksIGxhc3RNZXNzYWdlXVxuICAgICAgICAgICAgcmV0dXJuIFsuLi5wcmV2TWVzc2FnZXMsIHVwZGF0ZWRMYXN0TWVzc2FnZV07XG4gICAgICAgIH0pO1xuICAgICAgICAvLyDlnKjmtojmga/ljoblj7LkuK3mj5LlhaXmlrAgR1BUIOa2iOaBr1xuICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4gWy4uLnByZXZNZXNzYWdlcywge1xuICAgICAgICAgICAgICAgICdjb250ZW50JzogJycsXG4gICAgICAgICAgICAgICAgJ3JvbGUnOiAnYXNzaXN0YW50JyxcbiAgICAgICAgICAgICAgICAnbG9hZGluZyc6IHRydWUsXG4gICAgICAgICAgICAgICAgJ2NoYXRJZCc6ICcnLCAncHJvbXB0JzogJycsICdzdGF0dXMnOiAnJyxcbiAgICAgICAgICAgICAgICAnc2hvd0ltYWdlc0JveCc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdpbWFnZXMnOiBbXVxuICAgICAgICAgICAgfV0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlcyk7XG4gICAgICAgIGNvbnN0IG1zZ0hpc3RvcnkgPSBtZXNzYWdlcy5zbGljZSgtNSkubWFwKChpdGVtKSA9PiB7IHJldHVybiB7ICdyb2xlJzogaXRlbS5yb2xlLCAnY29udGVudCc6IGl0ZW0uY29udGVudCB9OyB9KTtcbiAgICAgICAgZ2V0R1BUTXNnKFsuLi5tc2dIaXN0b3J5LCB7IFwicm9sZVwiOiBcInVzZXJcIiwgXCJjb250ZW50XCI6IHZhbHVlcy5tc2cgfV0pO1xuICAgICAgICAvLyBhbXBsaXR1ZGUudHJhY2soJ2hhbmRsZVNlbmRNZXNzYWdlJyk7XG4gICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAnaGFuZGxlU2VuZE1lc3NhZ2UnIH0pO1xuICAgIH07XG4gICAgLy8g5paH5pys5qGG5LiL5pWy5Ye75oyJ6ZSu5pe2XG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyDpmLvmraLkuovku7blhpLms6FcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZUtleURvd24nKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMyAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIC8vIOaVsuWHu+Wbnui9pumUrlxuICAgICAgICAgICAgaWYgKCFpc0xvYWRpbmcgJiYgaXNBbnN3ZXJJbnB1dGVkKSB7XG4gICAgICAgICAgICAgICAgLy8g6Z2e5Yqg6L2954q25oCB44CBR1BUIOa2iOaBr+WPkemAgeWujOavleaXtueUqOaIt+WPr+WPkemAgea2iOaBr1xuICAgICAgICAgICAgICAgIGhhbmRsZVNlbmRNZXNzYWdlKHsgJ21zZyc6IGV2ZW50LnRhcmdldC52YWx1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU1vdXNlRG93biA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnUG9wdXBDYXJkOmhhbmRsZU1vdXNlRG93bicpO1xuICAgICAgICBzZXREcmFnZ2luZyh0cnVlKTtcbiAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQuY3VycmVudCkge1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFggPSBldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WSA9IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgICAgICAgIHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFggPSBTdHJpbmcob2Zmc2V0WCk7XG4gICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRZID0gU3RyaW5nKG9mZnNldFkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldE9mZnNldCh7IHg6IGV2ZW50LmNsaWVudFggLSBwb3NpdGlvbi54LCB5OiBldmVudC5jbGllbnRZIC0gcG9zaXRpb24ueSB9KTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU1vdXNlTW92ZSA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyAvLyBjb25zb2xlLmxvZygnUG9wdXBDYXJkOmhhbmRsZU1vdXNlTW92ZScpO1xuICAgICAgICAvLyAvLyBjb25zb2xlLmxvZyhkcmFnZ2luZyk7XG4gICAgICAgIGlmIChkcmFnZ2luZyAmJiB3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vIFVzZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgdG8gdGhyb3R0bGUgdGhlIG1vdXNlbW92ZSBldmVudCBoYW5kbGluZ1xuICAgICAgICAgICAgLy8g6byg5qCH55u45a+556qX5Y+j5bem5LiK6KeS55qE5YGP56e7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRYID0gcGFyc2VGbG9hdCh3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRYIHx8ICcnKTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFkgPSBwYXJzZUZsb2F0KHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFkgfHwgJycpO1xuICAgICAgICAgICAgY29uc3QgbmV3WCA9IGV2ZW50LmNsaWVudFggLSBvZmZzZXRYO1xuICAgICAgICAgICAgY29uc3QgbmV3WSA9IGV2ZW50LmNsaWVudFkgLSBvZmZzZXRZO1xuICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIGJvdW5kYXJpZXNcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50V2lkdGggPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gd2luZG93RWxlbWVudC5jdXJyZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IG1pblggPSAtZWxlbWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGNvbnN0IG1pblkgPSAwO1xuICAgICAgICAgICAgY29uc3QgbWF4WCA9IHdpbmRvd1dpZHRoIC0gZWxlbWVudFdpZHRoICsgZWxlbWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGNvbnN0IG1heFkgPSB3aW5kb3dIZWlnaHQgLSBlbGVtZW50SGVpZ2h0ICsgZWxlbWVudEhlaWdodCAvIDEuNTtcbiAgICAgICAgICAgIGNvbnN0IGNsYW1wZWRYID0gTWF0aC5tYXgobWluWCwgTWF0aC5taW4obmV3WCwgbWF4WCkpO1xuICAgICAgICAgICAgY29uc3QgY2xhbXBlZFkgPSBNYXRoLm1heChtaW5ZLCBNYXRoLm1pbihuZXdZLCBtYXhZKSk7XG4gICAgICAgICAgICAvLyBPbmx5IHVwZGF0ZSB0aGUgcG9zaXRpb24gaWYgaXQncyB3aXRoaW4gdGhlIGJvdW5kYXJpZXNcbiAgICAgICAgICAgIC8vIG5ld1ggPj0gbWluWCAmJiBuZXdYIDw9IG1heFggJiYgbmV3WSA+PSBtaW5ZICYmIG5ld1kgPD0gbWF4WVxuICAgICAgICAgICAgaWYgKHRydWUpIHtcbiAgICAgICAgICAgICAgICAvLyBzZXRQb3NpdGlvbih7IHg6IGNsYW1wZWRYLCB5OiBjbGFtcGVkWSB9KTtcbiAgICAgICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuc3R5bGUubGVmdCA9IGAke2NsYW1wZWRYfXB4YDtcbiAgICAgICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuc3R5bGUudG9wID0gYCR7Y2xhbXBlZFl9cHhgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5YWD57Sg5Yiw6L6+6L6555WMXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgcmVjdCA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBvZmZzZXRYID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBvZmZzZXRZID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICAgICAgICAgIC8vIHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFggPSBTdHJpbmcob2Zmc2V0WCk7XG4gICAgICAgICAgICAgICAgLy8gd2luZG93RWxlbWVudC5jdXJyZW50LmRhdGFzZXQub2Zmc2V0WSA9IFN0cmluZyhvZmZzZXRZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlTW91c2VVcCA9ICgpID0+IHtcbiAgICAgICAgLy8gLy8gY29uc29sZS5sb2coJ1BvcHVwQ2FyZDpoYW5kbGVNb3VzZVVwJyk7XG4gICAgICAgIHNldERyYWdnaW5nKGZhbHNlKTtcbiAgICB9O1xuICAgIC8vIOaWh+acrOahhuWAvOWPmOWMluaXtlxuICAgIGNvbnN0IG9uVGV4dEFyZWFJbnB1dCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNldElzQW5zd2VySW5wdXRlZCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldElzQW5zd2VySW5wdXRlZChmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIOa3u+WKoOWIsCBBbmtpXG4gICAgY29uc3QgYWRkVG9BbmtpID0gKGRlY2tOYW1lLCBtb2RlbE5hbWUsIGZyb250LCBiYWNrKSA9PiB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBjb25zdCBrZXlXb3JkID0gcHJvcHMuZGF0YS5rZXlXb3JkO1xuICAgICAgICBjb25zdCBTZW50ZW5jZSA9IHByb3BzLmRhdGEuU2VudGVuY2U7XG4gICAgICAgIGxldCBjb250YWluZXIgPSAnJztcbiAgICAgICAgbGV0IGltYWdlcyA9ICcnO1xuICAgICAgICBsZXQgdW5zcGxhc2hfZG93bmxvYWRfbG9jYXRpb247XG4gICAgICAgIGxldCBzdGMgPSBrZXlXb3JkLmxlbmd0aCA8PSAyMCA/IFNlbnRlbmNlIDogJyc7XG4gICAgICAgIC8vIOWcqOivreWig+WPpeWtkOS4reWwhuWFs+mUruWtl+eqgeWHuuaYvuekulxuICAgICAgICBzdGMgPSBzdGMucmVwbGFjZShuZXcgUmVnRXhwKGtleVdvcmQsICdnJyksICc8c3BhbiBjbGFzcz1cImtleVdvcmRcIj4nICsga2V5V29yZCArICc8L3NwYW4+Jyk7XG4gICAgICAgIGxldCBTY291dGVyU2VsZWN0aW9uID0gJyc7XG4gICAgICAgIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vIOmAieS4reeahOaWh+Wtl1xuICAgICAgICAgICAgU2NvdXRlclNlbGVjdGlvbiA9IChfYiA9IChfYSA9IHdpbmRvd0VsZW1lbnQuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnF1ZXJ5U2VsZWN0b3IoJyNTY291dGVyU2VsZWN0aW9uJykpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpWzBdLmlubmVySFRNTDtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdpbmRvd0VsZW1lbnQuY3VycmVudCk7XG4gICAgICAgICAgICBjb250YWluZXIgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgY29udGFpbmVyID0gd2luZG93RWxlbWVudC5jdXJyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lc3NhZ2VzJylbMF0uaW5uZXJIVE1MO1xuICAgICAgICAgICAgLy8g5aSE55CGIGNvbnRhaW5lciDnmoTlhoXlrrlcbiAgICAgICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhjb250YWluZXIsICd0ZXh0L2h0bWwnKTtcbiAgICAgICAgICAgIGxldCBlbGVtZW50c1RvUmVtb3ZlID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbWFnZVF1ZXVlJyk7XG4gICAgICAgICAgICBsZXQgaW1hZ2VTb3VyY2UgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnLmltYWdlU291cmNlJyk7XG4gICAgICAgICAgICAvLyDorr7nva7lm77niYfnmoTlsLrlr7jjgIHmoLflvI9cbiAgICAgICAgICAgIGlmIChkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VCb3gnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGltZyA9IGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZUJveCcpWzBdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXTtcbiAgICAgICAgICAgICAgICBpbWcud2lkdGggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5Yig6Zmk6aKE5Yqg6L2955qE5Zu+54mHXG4gICAgICAgICAgICBlbGVtZW50c1RvUmVtb3ZlLmZvckVhY2goZWwgPT4geyB2YXIgX2E7IHJldHVybiAoX2EgPSBlbC5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlQ2hpbGQoZWwpOyB9KTtcbiAgICAgICAgICAgIC8vIOWIoOmZpOWbvueJh+adpea6kOS/oeaBr1xuICAgICAgICAgICAgaW1hZ2VTb3VyY2UuZm9yRWFjaChlbCA9PiB7IHZhciBfYTsgcmV0dXJuIChfYSA9IGVsLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVDaGlsZChlbCk7IH0pO1xuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jLmJvZHkuaW5uZXJIVE1MO1xuICAgICAgICAgICAgLy8g5aSE55CG5qC35byP77yM6YG/5YWNIEFua2kg5YaF5pi+56S65byC5bi4XG4gICAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXIucmVwbGFjZSgvc3R5bGU9L2csICcnKTtcbiAgICAgICAgICAgIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VCb3gnKVswXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VzID0gd2luZG93RWxlbWVudC5jdXJyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlQm94JylbMF0uaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgIC8vIOiOt+WPliB1bnNwbGFzaEFwaSDnmoQgZG93bmxvYWRfbG9jYXRpb25cbiAgICAgICAgICAgICAgICB1bnNwbGFzaF9kb3dubG9hZF9sb2NhdGlvbiA9IChfYyA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXMnKVswXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0ucGFyZW50RWxlbWVudCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmdldEF0dHJpYnV0ZSgnZGF0YS1kb3dubG9hZGxvY2F0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpbWFnZXMpO1xuICAgICAgICAgICAgLy8g5aSE55CG5qC35byP77yM6YG/5YWNIEFua2kg5YaF5pi+56S65byC5bi4XG4gICAgICAgICAgICBpbWFnZXMgPSBpbWFnZXMucmVwbGFjZSgvc3R5bGU9L2dpLCAnJyk7XG4gICAgICAgICAgICBpbWFnZXMgPSBpbWFnZXMucmVwbGFjZSgvd2lkdGgvZ2ksICcnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjYXJkU3R5bGUgPSBgPHN0eWxlPlxuXG4gICAgLnNlbnRlbmNlIHNwYW57XG4gICAgICBvcGFjaXR5OjAuNzU7XG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIH1cbiAgICBpbWcge1xuICAgICAgd2lkdGg6YXV0bztcbiAgICB9XG4gICAgLmFua2lTcGFjZSB7XG4gICAgICBjb2xvcjojRjA4QTI0O1xuICAgIH1cbiAgICAua2V5V29yZCB7XG4gICAgICBjb2xvcjojRjA4QTI0O1xuICAgIH1cblxuICAgIHRhYmxlIHtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gICAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICAgICAgbWFyZ2luOjA7XG4gICAgICBwYWRkaW5nOjA7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG4gICAgdGFibGUgdHIge1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgICAgIHBhZGRpbmc6IDVweDtcbiAgICB9XG4gICAgdGFibGUgdGgsIHRhYmxlIHRkIHtcbiAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIH1cbiAgICB0YWJsZSB0aCB7XG4gICAgICBsZXR0ZXItc3BhY2luZzogMXB4O1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICB9XG4gICAgPC9zdHlsZT5cbiAgICBgO1xuICAgICAgICAvLyDor7fmsYIgYmFja2dyb3VuZCDlsIbmlbDmja7kv53lrZjliLAgQW5raVxuICAgICAgICAvLyDluLjop4TnsbvlnotcbiAgICAgICAgbGV0IGFua2lCYWNrID0gJzxwIGNsYXNzPVwic2VudGVuY2VcIj4gPHNwYW4+JyArIHN0YyArICc8L3NwYW4+PGEgaHJlZj1cIicgKyB3aW5kb3cubG9jYXRpb24uaHJlZiArICdcIj5bU291cmNlXTwvYT48L3A+JyArIGNvbnRhaW5lcjtcbiAgICAgICAgaWYgKGtleVdvcmQubGVuZ3RoID4gMjApIHtcbiAgICAgICAgICAgIC8vIOWmguaenOmAieS4reeahOespuWPt+mVv+W6puWkp+S6jiAyMO+8iOivtOaYjuaYr+WPpeWtkO+8ieWImeS4jeaYvuekuuS4iuS4i+aWh+WPpeWtkO+8jOeEtuWQjuWwhuadpea6kOmTvuaOpeaUvuWIsOWwvumDqFxuICAgICAgICAgICAgYW5raUJhY2sgPSBjb250YWluZXIgKyAnPHAgY2xhc3M9XCJzZW50ZW5jZVwiIDxzcGFuPicgKyBzdGMgKyAnPC9zcGFuPjxhIGhyZWY9XCInICsgd2luZG93LmxvY2F0aW9uLmhyZWYgKyAnXCI+W1NvdXJjZV08L2E+PC9wPic7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHAgPSB7XG4gICAgICAgICAgICBcIm5vdGVcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVja05hbWVcIjogZGVja05hbWUsXG4gICAgICAgICAgICAgICAgXCJtb2RlbE5hbWVcIjogbW9kZWxOYW1lLFxuICAgICAgICAgICAgICAgIFwiZmllbGRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgW2Zyb250XToga2V5V29yZCxcbiAgICAgICAgICAgICAgICAgICAgW2JhY2tdOiBjYXJkU3R5bGUgKyBhbmtpQmFja1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJ0YWdzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJTY291dGVyXCJcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIOWujOW9ouWhq+epuuexu+Wei1xuICAgICAgICBpZiAoY29udGFpbmVyLmluZGV4T2YoJ2NsYXNzPVwiYW5raVNwYWNlXCInKSA+PSAwIHx8IGNvbnRhaW5lci5pbmRleE9mKCd7e2MnKSA+PSAwKSB7XG4gICAgICAgICAgICBsZXQgbmV3RnJvbnQ7XG4gICAgICAgICAgICBuZXdGcm9udCA9ICc8cD4nICsgU2NvdXRlclNlbGVjdGlvbiArICc8L3A+JyArIGNhcmRTdHlsZSArICc8cCBjbGFzcz1cInNlbnRlbmNlXCI+JyArIHN0YyArICc8YSBocmVmPVwiJyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgJ1wiPltTb3VyY2VdPC9hPjwvcD4nICsgY29udGFpbmVyO1xuICAgICAgICAgICAgaWYgKGtleVdvcmQubGVuZ3RoID4gMjApIHtcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzpgInkuK3nmoTnrKblj7fplb/luqblpKfkuo4gMjDvvIjor7TmmI7mmK/lj6XlrZDvvInliJnkuI3mmL7npLrkuIrkuIvmloflj6XlrZDvvIznhLblkI7lsIbmnaXmupDpk77mjqXmlL7liLDlsL7pg6hcbiAgICAgICAgICAgICAgICBuZXdGcm9udCA9ICc8cD4nICsgU2NvdXRlclNlbGVjdGlvbiArICc8L3A+JyArIGNhcmRTdHlsZSArIGNvbnRhaW5lciArICc8cCBjbGFzcz1cInNlbnRlbmNlXCI+JyArIHN0YyArICc8YSBocmVmPVwiJyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgJ1wiPltTb3VyY2VdPC9hPjwvcD4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcCA9IHtcbiAgICAgICAgICAgICAgICBcIm5vdGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImRlY2tOYW1lXCI6IGRlY2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICBcIm1vZGVsTmFtZVwiOiBtb2RlbE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwiZmllbGRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtmcm9udF06IG5ld0Zyb250LFxuICAgICAgICAgICAgICAgICAgICAgICAgW2JhY2tdOiAnJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcInRhZ3NcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJTY291dGVyXCJcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8g5Y+R6YCB5raI5oGv57uZIGJhY2tncm91bmRcbiAgICAgICAgbGV0IHNlbmRpbmcgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhZGROb3RlJywgJ21lc3NhZ2VzJzogeyAnYW5raV9hcmd1bWVudHMnOiBwLCAnYW5raV9hY3Rpb25fdHlwZSc6ICdhZGROb3RlJywgJ3Vuc3BsYXNoX2Rvd25sb2FkX2xvY2F0aW9uJzogdW5zcGxhc2hfZG93bmxvYWRfbG9jYXRpb24gfSwgfSk7XG4gICAgICAgIHNlbmRpbmcudGhlbihoYW5kbGVSZXNwb25zZSwgaGFuZGxlRXJyb3IpO1xuICAgICAgICAvLyDmlbDmja7ln4vngrlcbiAgICAgICAgLy8gYW1wbGl0dWRlLnRyYWNrKCdhZGRUb0Fua2knKTtcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW1wbGl0dWRlVHJhY2snLCAnbmFtZSc6ICdhZGRUb0Fua2knIH0pO1xuICAgIH07XG4gICAgLy8g54K55Ye75L+d5a2Y5YiwIEFua2lcbiAgICBjb25zdCBoYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgLy8g5qC55o2u5piv5ZCm5Li65a6M5b2i5aGr56m655Sz6K+35LiN5ZCM55qE5Y2h54mH5qih5p2/XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IChfYSA9IHdpbmRvd0VsZW1lbnQuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lc3NhZ2VzJylbMF0uaW5uZXJIVE1MO1xuICAgICAgICBsZXQgaXNBbmtpU3BhY2UgPSBmYWxzZTtcbiAgICAgICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5pbmRleE9mKCdjbGFzcz1cImFua2lTcGFjZVwiJykgPj0gMCB8fCBjb250YWluZXIuaW5kZXhPZigne3tjJykgPj0gMCkge1xuICAgICAgICAgICAgICAgIGlzQW5raVNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ2xvYWRpbmcnLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgLy8g5YWI6aKE5aSE55CGIEFua2kg55qEIG1vZGVsXG4gICAgICAgIGxldCBzZW5kaW5nID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnc2V0TW9kZWwnLCAnbWVzc2FnZXMnOiB7ICdpc0Fua2lTcGFjZSc6IGlzQW5raVNwYWNlIH0sIH0pO1xuICAgICAgICBzZW5kaW5nLnRoZW4oKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnJlc3VsdCA9PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAvLyDmt7vliqDliLAgQW5raSDkuK1cbiAgICAgICAgICAgICAgICBhZGRUb0Fua2kobWVzc2FnZS5kYXRhLmRlZmF1bHREZWNrTmFtZSwgbWVzc2FnZS5kYXRhLm1vZGVsTmFtZSwgbWVzc2FnZS5kYXRhLmZpZWxkMSwgbWVzc2FnZS5kYXRhLmZpZWxkMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDlj43ppojplJnor6/kv6Hmga9cbiAgICAgICAgICAgICAgICBhbGVydChtZXNzYWdlLmVycm9yKTtcbiAgICAgICAgICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAvL2Vycm9yXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy8g5o6l5pS2IGJhY2tncm91bmQg55qE5Zue5aSNXG4gICAgZnVuY3Rpb24gaGFuZGxlUmVzcG9uc2UobWVzc2FnZSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UuZXJyb3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnc3VjY2VzcycsICdub3RlSWQnOiBtZXNzYWdlLmRhdGEgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhbGVydChtZXNzYWdlLmVycm9yKTtcbiAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaGFuZGxlRXJyb3IoZXJybykge1xuICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnJvKTtcbiAgICB9XG4gICAgLy8gR1BUIOeUn+aIkOa2iOaBr+aXtu+8jOiHquWKqOWumuS9jeWIsOa2iOaBr+WIl+ihqOW6lemDqO+8jOaWueS+v+eUqOaIt+mYheivu1xuICAgIGZ1bmN0aW9uIHNjcm9sbFRvQm90dG9tKGNhblNyb2xsID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQuY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2luZG93RWxlbWVudC5jdXJyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250YWluZXInKVswXTtcbiAgICAgICAgICAgIGlmIChjYW5Tcm9sbCkge1xuICAgICAgICAgICAgICAgIC8vIOS9jeS6juW6lemDqO+8jOmcgOimgeiHquWKqOa7muWKqFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSBjb250YWluZXIuc2Nyb2xsSGVpZ2h0ICsgMjA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgb3BlbkN1c3RvbVByb21wdEZvcm0gPSAoZGF0YSkgPT4ge1xuICAgICAgICAvLyDlvIDlkK/miJblhbPpl63oh6rlrprkuYkgUHJvbXB0IOihqOWNlVxuICAgICAgICBzZXRQb3BvdmVyT3BlbihkYXRhLmlzT3Blbik7XG4gICAgICAgIC8vIOiuvue9ruihqOWNleeahOm7mOiupOiuvue9rlxuICAgICAgICBpZiAoZGF0YS5pc09wZW4pIHtcbiAgICAgICAgICAgIHNldEN1c3RvbVByb21wdEZvcm1EYXRhKGRhdGEuZGF0YSk7XG4gICAgICAgICAgICAvLyDlvIDlkK/ooajljZVcbiAgICAgICAgICAgIC8vIGFtcGxpdHVkZS50cmFjaygnb3BlbkN1c3RvbVByb21wdEZvcm0nKTtcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FtcGxpdHVkZVRyYWNrJywgJ25hbWUnOiAnb3BlbkN1c3RvbVByb21wdEZvcm0nIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIOW8gOWQr+ihqOWNleWQjuemgeatoueCueWHu+eql+WPo+WkluWMuuWfn+WFs+mXreeql+WPo1xuICAgICAgICAoMCwgY29udGVudF9zY3JpcHRfMS5zZXREb25vdENsb3NlUG9wdXBDYXJkKShkYXRhLmlzT3Blbik7XG4gICAgfTtcbiAgICBjb25zdCBBbmltYXRlZEJ1dHRvbiA9ICgwLCByZWFjdF9zcHJpbmdfMS5hbmltYXRlZCkoYW50ZF8xLkJ1dHRvbik7XG4gICAgY29uc3QgYW5pbWF0aW9uU3R5bGUgPSAoMCwgcmVhY3Rfc3ByaW5nXzEudXNlU3ByaW5nKSh7XG4gICAgICAgIGZyb206IHsgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJyB9LFxuICAgICAgICB0bzogeyB0cmFuc2Zvcm06ICdyb3RhdGUoMzYwZGVnKScgfSxcbiAgICAgICAgY29uZmlnOiB7IGR1cmF0aW9uOiAxMDAwIH0sXG4gICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgIHdpZHRoOiAnMzJweCcsXG4gICAgICAgIGhlaWdodDogJzMycHgnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgcmVkJ1xuICAgIH0pO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBcIkxlYXJuaW5nRW5nbGlzaDIwMjNcIiwgcmVmOiB3aW5kb3dFbGVtZW50LCBzdHlsZToge1xuICAgICAgICAgICAgICAgIGxlZnQ6IDEwLFxuICAgICAgICAgICAgICAgIHRvcDogMTAsXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQ29uZmlnUHJvdmlkZXIsIHsgdGhlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yUHJpbWFyeTogJyNGMDhBMjQnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChOYXZfMS5OYXYsIHsgaGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrOiBoYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2ssIGFkZFRvQW5raVN0YXR1czogYWRkVG9BbmtpU3RhdHVzLCBvbk1vdXNlRG93bjogaGFuZGxlTW91c2VEb3duLCBoYW5kbGVNZW51SXRlbUNsaWNrOiBleGVjdXRpdmVQcm9tcHQsIG9wZW5DdXN0b21Qcm9tcHRGb3JtOiBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSwgaXNPcGVuTWVudTogaXNPcGVuTWVudSwgcHJvbXB0czogcHJvbXB0cywgbGFzdEV4ZWN1dGVkUHJvbXB0OiBsYXN0RXhlY3V0ZWRQcm9tcHQsIGtleVdvcmQ6IHByb3BzLmRhdGEua2V5V29yZCB9KSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2NvbnRhaW5lciBmbGV4LWdyb3cgZmxleCBmbGV4LWNvbCBvdmVyZmxvdy1hdXRvJywgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJzQ4cHgnXG4gICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdmbGV4LWdyb3cnLCByZWY6IG1lc3NhZ2VzTGlzdCwgc3R5bGU6IHt9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChTZWxlY3Rpb25fMS5TZWxlY3Rpb24sIHsgdGV4dDogcHJvcHMuZGF0YS5rZXlXb3JkIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoTWVzc2FnZV8xLk1lc3NhZ2VzTGlzdCwgeyBtZXNzYWdlczogbWVzc2FnZXMgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2ZvbGxvd1VwTWVudUJveCcsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHNob3dGb2xsb3dVcERhdGFNZW51LnNob3cgPyAnYmxvY2snIDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ2ZpdC1jb250ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoUHJvbXB0TGlzdF8xLlByb21wdExpc3QsIHsgZm9sbG93VXBEYXRhOiBmb2xsb3dVcERhdGEsIHNob3dGb2xsb3dVcERhdGFNZW51OiBzaG93Rm9sbG93VXBEYXRhTWVudSwgcHJvbXB0TGlzdDogcHJvbXB0cywgaGFuZGxlTWVudUl0ZW1DbGljazogZXhlY3V0aXZlUHJvbXB0IH0pKSkpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAndy1mdWxsJywgcmVmOiBpbnB1dFJlZiwgc3R5bGU6IHsgYm9yZGVyVG9wOiAnMXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KScgfSB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybSwgeyBmb3JtOiBmb3JtLCBvbkZpbmlzaDogaGFuZGxlU2VuZE1lc3NhZ2UsIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25LZXlEb3duPXtoYW5kbGVGb3JtS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dDogJ2lubGluZScsIHN0eWxlOiB7IGFsaWduSXRlbXM6ICdjZW50ZXInIH0sIGNsYXNzTmFtZTogJ3AtMicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgbmFtZTogXCJtc2dcIiwgc3R5bGU6IHsgbWFyZ2luOiAnMCcsIGZsZXhHcm93OiAnMScgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7IHBsYWNlaG9sZGVyOiBcIlNlbmQgYSBtZXNzYWdlXCIsIGJvcmRlcmVkOiBmYWxzZSwgYXV0b1NpemU6IHsgbWluUm93czogMSwgbWF4Um93czogMiB9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXRDb2xvcjogJyNGMDhBMjQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBvbktleURvd246IGhhbmRsZUtleURvd24sIG9uSW5wdXQ6IG9uVGV4dEFyZWFJbnB1dCB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IHN0eWxlOiB7IG1hcmdpblJpZ2h0OiAnMCcgfSB9LCBpc0Fuc3dlckRvbmUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgdHlwZTogXCJ0ZXh0XCIsIGh0bWxUeXBlOiBcInN1Ym1pdFwiLCBkaXNhYmxlZDogaXNMb2FkaW5nIHx8ICFpc0Fuc3dlcklucHV0ZWQsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAhaXNMb2FkaW5nICYmIGlzQW5zd2VySW5wdXRlZCA/ICcjRjA4QTI0JyA6ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuU2VuZE91dGxpbmVkLCBudWxsKSB9KSA6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgbWFyZ2luUmlnaHQ6ICc4cHgnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF9zcHJpbmdfMS5hbmltYXRlZC5kaXYsIHsgc3R5bGU6IGFuaW1hdGlvblN0eWxlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuTG9hZGluZ091dGxpbmVkLCBudWxsKSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgc3R5bGU6IHsgbWFyZ2luOiAnMCcgfSB9KSkpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5EcmF3ZXIsIHsgdGl0bGU6IGN1c3RvbVByb21wdEZvcm1EYXRhLmlkID09PSAnJyA/IFwiQ3JlYXRlIFByb21wdFwiIDogXCJFZGl0IFByb21wdFwiLCBwbGFjZW1lbnQ6IFwiYm90dG9tXCIsIGNsb3NhYmxlOiBmYWxzZSwgaGVpZ2h0OiAnMTAwJScsIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25DbG9zZT17b25DbG9zZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46IGlzUG9wb3Zlck9wZW4sIGdldENvbnRhaW5lcjogZmFsc2UsIGV4dHJhOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuU3BhY2UsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZTogeyB6SW5kZXg6ICc5JyB9LCBvbkNsaWNrOiAoKSA9PiBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogZmFsc2UsIGRhdGE6IHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9IH0pIH0sIFwiQ2FuY2VsXCIpKSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBiYWNrZ3JvdW5kQ29sb3I6ICdyZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICcwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnNjRweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ2FsbC1zY3JvbGwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgb25Nb3VzZURvd246IGhhbmRsZU1vdXNlRG93biB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEN1c3RvbVByb21wdEZvcm1fMS5DdXN0b21Qcm9tcHRGb3JtLCB7IG9wZW5DdXN0b21Qcm9tcHRGb3JtOiBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSwgaGFuZGxlUHJvbXB0RWRpdGVkOiBoYW5kbGVQcm9tcHRFZGl0ZWQsIGRhdGE6IGN1c3RvbVByb21wdEZvcm1EYXRhIH0pKSkpKSkpO1xufVxuZXhwb3J0cy5Qb3B1cENhcmQgPSBQb3B1cENhcmQ7XG47XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucG9wdXBDYXJkU3R5bGUgPSB2b2lkIDA7XG5leHBvcnRzLnBvcHVwQ2FyZFN0eWxlID0gYFxuLnNsaWNrLWFycm93OjpiZWZvcmV7XG4gIGNvbnRlbnQ6XCJcIiAhaW1wb3J0YW50O1xufVxuXG4uYW5raVNwYWNlIHtcbiAgY29sb3I6I0YwOEEyNDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYW5raVNwYWNlOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjojRjA4QTI0O1xuICBjb2xvcjojZmZmZmZmO1xufVxuXG4uY29udGV4dEJveCwuZm9sbG93VXBNZW51IHtcbiAgZGlzcGxheTogZmxleDtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuICBwYWRkaW5nOiA0cHggOHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNik7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm94LXNoYWRvdzogMHB4IDhweCAyOHB4IHJnYmEoMCwwLDAsLjE2KTtcbiAgei1pbmRleDo5O1xuXG59XG5cbi5jb250ZXh0Qm94IHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmNvbnRleHRCb3ggKiB7XG4gIGN1cnNvcjogZGVmYXVsdDtcbiAgcGFkZGluZzogMnB4O1xufVxuXG4uYW5raVNwYWNlQnV0dG9uQm94IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjEyKTtcbiAgcGFkZGluZy1yaWdodDogMTBweDtcbn1cblxuLnNldEFua2lTcGFjZUJ1dHRvbjpmaXJzdC1vZi10eXBlIHtcbiAgbWFyZ2luLXJpZ2h0OjhweDtcbn1cblxuLy8gLmxvb2tVcEJ1dHRvbiB7XG4vLyAgIHdpZHRoOiAxOHB4O1xuLy8gICBoZWlnaHQ6IDE4cHg7XG4vLyAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbi8vICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbi8vICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuLy8gfVxuXG4uYW5raVNwYWNlQnV0dG9uQm94ICo6aG92ZXIge1xuICBcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLDAsNTksMC4wNTEpO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG5cbn1cblxuLmFudC1jYXJvdXNlbCAuc2xpY2stcHJldixcbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLW5leHQsXG4uYW50LWNhcm91c2VsIC5zbGljay1wcmV2OmhvdmVyLFxuLmFudC1jYXJvdXNlbCAuc2xpY2stbmV4dDpob3ZlciB7XG4gIGZvbnQtc2l6ZTogaW5oZXJpdDtcbiAgY29sb3I6IGN1cnJlbnRDb2xvcjtcbn1cblxuLmFudC1jYXJvdXNlbCAuc2xpY2stcHJldixcbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLXByZXY6aG92ZXIge1xuICBsZWZ0OiAxMHB4O1xuICB6LWluZGV4OiAyO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLW5leHQsXG4uYW50LWNhcm91c2VsIC5zbGljay1uZXh0OmhvdmVyIHtcbiAgcmlnaHQ6IDEwcHg7XG4gIHotaW5kZXg6IDI7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmltYWdlcyBpbWcge1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xufVxuXG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIGgxLCNMZWFybmluZ0VuZ2xpc2gyMDIzIGgyLCNMZWFybmluZ0VuZ2xpc2gyMDIzIGgze1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDF7XG4gIGZvbnQtc2l6ZToyMHB4O1xufVxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDJ7XG4gIGZvbnQtc2l6ZToxN3B4O1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyB7XG5mb250LWZhbWlseTogc2Fucy1zZXJpZjtcbndpZHRoOiAzOTBweDtcbmhlaWdodDogNTYwcHg7XG5jb2xvcjogcmdiKDAgMCAwIC8gODAlKTtcbnBvc2l0aW9uOiBmaXhlZDtcbmRpc3BsYXk6IGZsZXg7XG5mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuZm9udC1zaXplOiAxMy4ycHg7XG5iYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuei1pbmRleDogOTk5OTtcbm92ZXJmbG93OiBoaWRkZW47XG5ib3gtc2hhZG93OiAwcHggOHB4IDI4cHggcmdiYSgwLDAsMCwuMTYpO1xuYm9yZGVyLXJhZGl1czogNnB4O1xuYm9yZGVyOjFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNilcbn1cblxuOjpzZWxlY3Rpb24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZENUIyO1xufVxuXG46Oi1tb3otc2VsZWN0aW9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRDVCMjtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLmNvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXIgIHtcbiAgLy8gd2lkdGg6MHB4O1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAuY29udGFpbmVyOjotd2Via2l0LXNjcm9sbGJhci10cmFjayAge1xuICAvLyBiYWNrZ3JvdW5kOiAjZmZmOyAvKiDorr7nva7mu5rliqjmnaHovajpgZPog4zmma/oibIgKi9cbn1cblxuLy8gI0xlYXJuaW5nRW5nbGlzaDIwMjMgLmNvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuLy8gICBiYWNrZ3JvdW5kOiAjODg4OyAvKiDorr7nva7mu5rliqjmnaHmu5HlnZfog4zmma/oibIgKi9cbi8vIH1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLkRyb3Bkb3duTWVudUl0ZW06aG92ZXIge1xuICBcbiAgYmFja2dyb3VuZC1jb2xvcjojRjZGNkY2O1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAuRHJvcGRvd25NZW51SXRlbTpmb2N1cy12aXNpYmxlIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDEsI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDIsI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDMge1xuXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDApO1xuXG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzICNTY291dGVyTmF2LCNMZWFybmluZ0VuZ2xpc2gyMDIzICNTY291dGVyU2VsZWN0aW9uLCAjTGVhcm5pbmdFbmdsaXNoMjAyMyAubWVzc2FnZXM+ZGl2ICB7XG4gIHBhZGRpbmctbGVmdDoxOHB4O1xuICBwYWRkaW5nLXJpZ2h0OjE4cHg7XG59XG5cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLnVzZXJJbnB1dCB7XG5tYXJnaW46IDEwcHggMDtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLmNvbnRlbnRCb3gge1xub3ZlcmZsb3c6IHNjcm9sbDtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLm1lc3NhZ2VzID4gKiA+ICoge1xuICBtYXJnaW46IDAuN2VtIDA7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzICNTY291dGVyTmF2IHtcbmRpc3BsYXk6IGZsZXg7XG5qdXN0aWZ5LWNvbnRlbnQ6IHN0YXJ0O1xuYWxpZ24taXRlbXM6IGNlbnRlcjtcbnBhZGRpbmctdG9wOiAxMHB4O1xucGFkZGluZy1ib3R0b206IDEwcHg7XG5ib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMDYpO1xudXNlci1zZWxlY3Q6IG5vbmU7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzICNTY291dGVyTmF2IGltZyB7XG53aWR0aDogYXV0bztcbmhlaWdodDogMjRweDtcbm1hcmdpbi1yaWdodDogNnB4O1xufVxuXG4ubWVzc2FnZXMgdWx7XG4gIGxpc3Qtc3R5bGU6ZGlzYztcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xufVxuXG4ubWVzc2FnZXMgb2x7XG4gIGxpc3Qtc3R5bGU6YXV0bztcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAuaXNQaW4gcGF0aHtcbiAgZmlsbDogI0YwOEEyNDtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLnJpZ2h0QnRuQm94IGJ1dHRvbiB7XG5cbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5yaWdodEJ0bkJveCBidXR0b24gc3BhbjpsYXN0LW9mLXR5cGV7XG4gIFxufVxuXG50YWJsZSB0ciB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gIHBhZGRpbmc6IDVweDtcbn1cbnRhYmxlIHRoLCB0YWJsZSB0ZCB7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG50YWJsZSB0aCB7XG4gIC8vIGZvbnQtc2l6ZTogMTRweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuLy8gLyog5rua5Yqo5p2h5Lul5Y+K5rua5Yqo5p2h6L2o6YGT55qE5a695bqmICovXG4vLyA6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbi8vICAgICB3aWR0aDogMTBweDtcbi8vIH1cblxuLy8gLyog5rua5Yqo5p2h6L2o6YGT55qE5qC35byPKi9cbi8vIDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xuICAgIFxuLy8gfVxuXG4vLyAvKiDmu5rliqjmnaHnmoTmoLflvI8gKi9cbi8vIDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuLy8gICAgIGJhY2tncm91bmQ6ICM4ODg7IFxuLy8gfVxuXG4vLyAvKiDlvZPkvaDpvKDmoIfmgqzlgZzlnKjmu5rliqjmnaHkuIrml7bnmoTmoLflvI8gKi9cbi8vIDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIge1xuLy8gICAgIGJhY2tncm91bmQ6ICM1NTU7IFxuLy8gfVxuXG4vKiDmu5rliqjmnaEgKi9cbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG9yaXpvbnRhbCB7IC8q5rC05bmz5rua5Yqo5p2h55qE5qC35byPKi9cbiAgd2lkdGg6IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0NDQ0NDQztcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA2cHg7XG59XG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrLXBpZWNlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsgLyrmu5rliqjmnaHnmoTog4zmma/popzoibIqL1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDA7IC8q5rua5Yqo5p2h55qE5ZyG6KeS5a695bqmKi9cbn1cbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICB3aWR0aDogMTBweDsgLyrmu5rliqjmnaHnmoTlrr3luqYqL1xuICBoZWlnaHQ6IDhweDsgLyrmu5rliqjmnaHnmoTpq5jluqYqL1xufVxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjp2ZXJ0aWNhbCB7IC8q5Z6C55u05rua5Yqo5p2h55qE5qC35byPKi9cbiAgaGVpZ2h0OiA1MHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTk5O1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDRweDtcbiAgb3V0bGluZTogMnB4IHNvbGlkICNmZmY7XG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4O1xuICBib3JkZXI6IDJweCBzb2xpZCAjZmZmO1xufVxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7IC8q5rua5Yqo5p2h55qEaG92ZXLmoLflvI8qL1xuICBoZWlnaHQ6IDUwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5ZjlmOWY7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNHB4O1xufVxuXG5wcmUge1xuYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMDtcbmJvcmRlci1yYWRpdXM6IDVweDtcbnBhZGRpbmc6IDE1cHg7XG5ib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuY29sb3I6ICMzMzM7XG5mb250LWZhbWlseTogQ291cmllciwgbW9ub3NwYWNlO1xubGluZS1oZWlnaHQ6IDEuMjtcbm92ZXJmbG93LXg6IGF1dG87XG53aGl0ZS1zcGFjZTogcHJlO1xufVxuXG5ibG9ja3F1b3RlIHtcbnBhZGRpbmc6IDEwcHggMjBweDtcbm1hcmdpbjogMCAwIDIwcHg7XG5ib3JkZXItbGVmdDogNXB4IHNvbGlkICNmMWYxZjE7XG5jb2xvcjogIzY2NjtcbmJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XG59XG5cbmA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXREZWZhdWx0UHJvbXB0ID0gZXhwb3J0cy5oYW5kbGVIaWdodGxpZ2h0ID0gZXhwb3J0cy5nZXRBbmtpQ2FyZHMgPSBleHBvcnRzLmhhbmRsZVByb21wdFZhcmlhYmxlcyA9IGV4cG9ydHMuZ2V0VW5zcGxhc2hJbWFnZXMgPSBleHBvcnRzLndpbmRvd0luaXRpYWxpemF0aW9uID0gZXhwb3J0cy5nZXRDbGlwYm9hcmQgPSB2b2lkIDA7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IGdldENsaXBib2FyZCA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLnJlYWRUZXh0KClcbiAgICAgICAgICAgIC50aGVuKHRleHQgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0ZXh0KTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbmV4cG9ydHMuZ2V0Q2xpcGJvYXJkID0gZ2V0Q2xpcGJvYXJkO1xuY29uc3Qgd2luZG93SW5pdGlhbGl6YXRpb24gPSAoZGF0YSkgPT4ge1xuICAgIC8vIOiuvue9rueql+WPo+eahOm7mOiupOS9jee9rlxuICAgIGlmIChkYXRhLndpbmRvd0VsZW1lbnQuY3VycmVudCAmJiAhZGF0YS5pc1Bpbikge1xuICAgICAgICAvLyBDaGVjayB0aGUgYm91bmRhcmllc1xuICAgICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRXaWR0aCA9IGRhdGEud2luZG93RWxlbWVudC5jdXJyZW50LmNsaWVudFdpZHRoO1xuICAgICAgICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gZGF0YS53aW5kb3dFbGVtZW50LmN1cnJlbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICBjb25zdCBtaW5YID0gMDtcbiAgICAgICAgY29uc3QgbWluWSA9IDA7XG4gICAgICAgIGNvbnN0IG1heFggPSB3aW5kb3dXaWR0aCAtIGVsZW1lbnRXaWR0aDtcbiAgICAgICAgY29uc3QgbWF4WSA9IHdpbmRvd0hlaWdodCAtIGVsZW1lbnRIZWlnaHQ7XG4gICAgICAgIGxldCBuZXdYLCBuZXdZID0gMDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbk9iamVjdCA9IGRhdGEuc2VsZWN0aW9uLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBuZXdYID0gc2VsZWN0aW9uT2JqZWN0LnggKyBzZWxlY3Rpb25PYmplY3Qud2lkdGggKyAxMDtcbiAgICAgICAgICAgIG5ld1kgPSBzZWxlY3Rpb25PYmplY3QueSArIHNlbGVjdGlvbk9iamVjdC5oZWlnaHQgKyAxMDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjbGFtcGVkWCA9IE1hdGgubWF4KG1pblgsIE1hdGgubWluKG5ld1gsIG1heFgpKTtcbiAgICAgICAgY29uc3QgY2xhbXBlZFkgPSBNYXRoLm1heChtaW5ZLCBNYXRoLm1pbihuZXdZLCBtYXhZKSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByb3BzLnNlbGVjdGlvbi5nZXRSYW5nZUF0KDApKTtcbiAgICAgICAgZGF0YS53aW5kb3dFbGVtZW50LmN1cnJlbnQuc3R5bGUubGVmdCA9IGAke2NsYW1wZWRYfXB4YDtcbiAgICAgICAgZGF0YS53aW5kb3dFbGVtZW50LmN1cnJlbnQuc3R5bGUudG9wID0gYCR7Y2xhbXBlZFl9cHhgO1xuICAgIH1cbiAgICAvLyAvLyDmt7vliqDmu5rliqjkuovku7bvvIzorqnmtojmga/liJfooajoh6rliqjmu5rliqjliLDlupXpg6hcbiAgICAvLyBkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50Py5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZVNjcm9sbCk7XG4gICAgLy8gcmV0dXJuICgpID0+IHtcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJ3VzZUVmZmVjdCByZXR1cm4nKTtcbiAgICAvLyAgICAgZGF0YS5tZXNzYWdlc0xpc3QuY3VycmVudD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVTY3JvbGwpO1xuICAgIC8vIH07XG4gICAgLy8gZnVuY3Rpb24gaGFuZGxlU2Nyb2xsKCkge1xuICAgIC8vICAgICBpZiAoZGF0YS5tZXNzYWdlc0xpc3QuY3VycmVudCAhPT0gbnVsbCkge1xuICAgIC8vICAgICAgICAgY29uc3QgaXNBdEJvdHRvbSA9IGRhdGEubWVzc2FnZXNMaXN0LmN1cnJlbnQ/LnNjcm9sbFRvcCArIGRhdGEubWVzc2FnZXNMaXN0LmN1cnJlbnQuY2xpZW50SGVpZ2h0ID49IGRhdGEubWVzc2FnZXNMaXN0LmN1cnJlbnQuc2Nyb2xsSGVpZ2h0IC0gMC41O1xuICAgIC8vICAgICAgICAgaWYgKGlzQXRCb3R0b20pIHtcbiAgICAvLyAgICAgICAgICAgICAvLyDlt7Lnu4/kvY3kuo7lupXpg6jvvIzkuI3pnIDopoHoh6rliqjmu5rliqhcbiAgICAvLyAgICAgICAgICAgICByZXR1cm47XG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgICAgIC8vIHNjcm9sbFRvQm90dG9tKClcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vICAgICAvLyDmnKrkvY3kuo7lupXpg6jvvIzkuI3miafooYzoh6rliqjmu5rliqhcbiAgICAvLyB9XG59O1xuZXhwb3J0cy53aW5kb3dJbml0aWFsaXphdGlvbiA9IHdpbmRvd0luaXRpYWxpemF0aW9uO1xuLyoqXG4gKiDojrflj5YgVW5zcGxhc2gg5Zu+54mHXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleVdvcmQgLSDmoLnmja7mraTlhbPplK7lrZfmkJzntKLlm77niYdcbiAqIEByZXR1cm5zIHtBcnJheX0g5Zu+54mH5YiX6KGoXG4gKiBAdGhyb3dzIHvlvILluLjnsbvlnot9IOW8guW4uOaPj+i/sFxuICovXG5jb25zdCBnZXRVbnNwbGFzaEltYWdlcyA9IChrZXlXb3JkKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8g6K+35rGCIGJhY2tncm91bmQg6I635Y+W5pWw5o2uXG4gICAgICAgIC8vIOS9v+eUqOmVv+i/nuaOpVxuICAgICAgICAvLyBsZXQgcG9ydCA9IGJyb3dzZXIucnVudGltZS5jb25uZWN0KHtcbiAgICAgICAgLy8gICAgIG5hbWU6ICdmcm9tUG9wdXBDYXJkVXRpbCdcbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8g5L2/55SoIHBvc3RNcyDlj5HpgIHkv6Hmga9cbiAgICAgICAgbGV0IHNlbmRpbmcgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdnZXRVbnNwbGFzaEltYWdlcycsICdtZXNzYWdlcyc6ICcnLCAna2V5V29yZCc6IGtleVdvcmQgfSk7XG4gICAgICAgIHNlbmRpbmcudGhlbigobXNnKSA9PiB7XG4gICAgICAgICAgICBpZiAobXNnLnR5cGUgPT09ICdzZW5kSW1nRGF0YScpIHtcbiAgICAgICAgICAgICAgICBpZiAoJ2ltZ3MnIGluIG1zZykge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndW5zcGxhc2hTZWFyY2hQaG90b3MnKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShtc2cuaW1ncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAvL2Vycm9yXG4gICAgICAgIH0pO1xuICAgICAgICAvLyAvLyDmjqXmlLbkv6Hmga9cbiAgICAgICAgLy8gcG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIobXNnID0+IHtcbiAgICAgICAgLy8gICAgIGlmIChtc2cudHlwZSA9PT0gJ3NlbmRJbWdEYXRhJykge1xuICAgICAgICAvLyAgICAgICAgIGlmICgnaW1ncycgaW4gbXNnKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1bnNwbGFzaFNlYXJjaFBob3RvcycpO1xuICAgICAgICAvLyAgICAgICAgICAgICByZXNvbHZlKG1zZy5pbWdzKVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSlcbiAgICB9KTtcbn07XG5leHBvcnRzLmdldFVuc3BsYXNoSW1hZ2VzID0gZ2V0VW5zcGxhc2hJbWFnZXM7XG4vKipcbiAqIOWkhOeQhiBQcm9tcHQg5Lit55qE5Y+Y6YePXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb21wdFN0ciAtIOmcgOimgeWkhOeQhueahCBQcm9tcHQg5a2X56ym5LiyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5V29yZCAtIOeUqOaIt+aJgOmAieS4reeahOWFs+mUruWtl1xuICogQHBhcmFtIHtzdHJpbmd9IFNlbnRlbmNlIC0g5LuO572R6aG15Lit5o+Q5Y+W55qE5YWz6ZSu5a2X5omA5Zyo55qE5Y+l5a2QXG4gKiBAcmV0dXJucyB7c3RyaW5nfSDlpITnkIblkI7nmoQgUHJvbXB0IOWtl+espuS4slxuICogQHRocm93cyB75byC5bi457G75Z6LfSDlvILluLjmj4/ov7BcbiAqL1xuY29uc3QgaGFuZGxlUHJvbXB0VmFyaWFibGVzID0gKHByb21wdFN0ciwga2V5V29yZCwgU2VudGVuY2UsIExhbmcpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGxldCBuZXdQcm9tcHRTdHIgPSBwcm9tcHRTdHI7XG4gICAgLy8g5aSE55CG5YWz6ZSu5a2X5ZKM5Y+l5a2QXG4gICAgbmV3UHJvbXB0U3RyID0gcHJvbXB0U3RyLnJlcGxhY2UoL1xce3NlbGVjdGlvblxcfS9nLCBrZXlXb3JkKTtcbiAgICBuZXdQcm9tcHRTdHIgPSBuZXdQcm9tcHRTdHIucmVwbGFjZSgvXFx7c2VudGVuY2VcXH0vZywgU2VudGVuY2UpO1xuICAgIC8vIOWkhOeQhuivreiogFxuICAgIG5ld1Byb21wdFN0ciA9IG5ld1Byb21wdFN0ci5yZXBsYWNlKC9cXHtuYXRpdmVMYW5ndWFnZVxcfS9nLCBMYW5nWydjdXJyZW50J11bJ25hbWUnXSk7XG4gICAgbmV3UHJvbXB0U3RyID0gbmV3UHJvbXB0U3RyLnJlcGxhY2UoL1xce2N1cnJlbnRMYW5ndWFnZVxcfS9nLCBMYW5nWydjdXJyZW50J11bJ25hbWUnXSk7XG4gICAgbmV3UHJvbXB0U3RyID0gbmV3UHJvbXB0U3RyLnJlcGxhY2UoL1xce3RhcmdldExhbmd1YWdlXFx9L2csIExhbmdbJ3RhcmdldCddWyduYW1lJ10pO1xuICAgIC8vIOWkhOeQhiBBbmtpIOWNleivjVxuICAgIGlmIChuZXdQcm9tcHRTdHIuaW5kZXhPZigne2Fua2lDYXJkc30nKSA+PSAwKSB7XG4gICAgICAgIC8vIOiOt+WPluebruagh+WNoeeJh1xuICAgICAgICBsZXQgcmFuZG9tVmFsdWVzO1xuICAgICAgICBsZXQgYW5raUNhcmRzU3RyID0gJyc7XG4gICAgICAgIHlpZWxkICgwLCBleHBvcnRzLmdldEFua2lDYXJkcykoKS50aGVuKChjYXJkcykgPT4ge1xuICAgICAgICAgICAgcmFuZG9tVmFsdWVzID0gY2FyZHM7XG4gICAgICAgICAgICBpZiAocmFuZG9tVmFsdWVzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJhbmRvbVZhbHVlcy5sZW5ndGggPiA1KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOmaj+acuuWPliBYIOS4quWNoeeJh1xuICAgICAgICAgICAgICAgICAgICAvLyDmt7Hmi7fotJ3mlbDnu4Tku6Xpgb/lhY3kv67mlLnmupDmlbDnu4RcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2h1ZmZsZWRBcnJheSA9IHJhbmRvbVZhbHVlcy5zbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICAvLyDkvb/nlKggRmlzaGVyLVlhdGVzIOa0l+eJjOeul+azleWvueaVsOe7hOi/m+ihjOaJk+S5sVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gc2h1ZmZsZWRBcnJheS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBbc2h1ZmZsZWRBcnJheVtpXSwgc2h1ZmZsZWRBcnJheVtqXV0gPSBbc2h1ZmZsZWRBcnJheVtqXSwgc2h1ZmZsZWRBcnJheVtpXV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8g5Y+W5YmNIHgg5Liq5YWD57Sg5L2c5Li657uT5p6cXG4gICAgICAgICAgICAgICAgICAgIHJhbmRvbVZhbHVlcyA9IHNodWZmbGVkQXJyYXkuc2xpY2UoMCwgNSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyDlsIbljZXor43mm7/mjaLliLAgcHJvbXB0IOS4rVxuICAgICAgICAgICAgICAgIHJhbmRvbVZhbHVlcyA9PT0gbnVsbCB8fCByYW5kb21WYWx1ZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJhbmRvbVZhbHVlcy5mb3JFYWNoKChjYXJkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjYXJkLmZpZWxkcyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaXJzdEtleSA9IGtleXNbMF07XG4gICAgICAgICAgICAgICAgICAgIC8vIOaJvuWIsOWNoeeJh+ato+mdolxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYXJkLmZpZWxkc1trZXlzW2ldXS5vcmRlciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0S2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhbmtpQ2FyZHNTdHIgKz0gY2FyZC5maWVsZHNbZmlyc3RLZXldLnZhbHVlICsgJywnO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG5ld1Byb21wdFN0ciA9IG5ld1Byb21wdFN0ci5yZXBsYWNlKC9cXHthbmtpQ2FyZHNcXH0vZywgYW5raUNhcmRzU3RyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3UHJvbXB0U3RyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIG5ld1Byb21wdFN0ciA9IG5ld1Byb21wdFN0ci5yZXBsYWNlKC9cXHthbmtpQ2FyZHNcXH0vZywgJycpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1Byb21wdFN0cjtcbn0pO1xuZXhwb3J0cy5oYW5kbGVQcm9tcHRWYXJpYWJsZXMgPSBoYW5kbGVQcm9tcHRWYXJpYWJsZXM7XG4vKipcbiAqIOiOt+WPliBBbmtpIOWNoeeJh1xuICpcbiAqIEByZXR1cm5zIHtvYmplY3RbXX0g6L+U5Zue5Y2h54mH55qE5a+56LGh5YiX6KGoXG4gKiBAdGhyb3dzIHvlvILluLjnsbvlnot9IOW8guW4uOaPj+i/sFxuICovXG5jb25zdCBnZXRBbmtpQ2FyZHMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8g5Yik5pat5pys5Zyw5piv5ZCm5a2Y5pyJ5pyq6L+H5pyf55qE5pWw5o2uXG4gICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5nZXQoeyBcImFua2lDYXJkc1wiOiB7ICdjYXJkcyc6IFtdLCAndGltZSc6IDAgfSB9KS50aGVuKChpdGVtKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIC8vIOe8k+WtmCAxIOWwj+aXtlxuICAgICAgICAgICAgaWYgKGl0ZW0uYW5raUNhcmRzLmNhcmRzLmxlbmd0aCA+IDAgJiYgRGF0ZS5ub3coKSAtIGl0ZW0uYW5raUNhcmRzLnRpbWUgPCAzNjAwICogMTAwMCkge1xuICAgICAgICAgICAgICAgIC8vIOiLpeacrOWcsOacieWPr+eUqOeahOaVsOaNru+8jOWImeebtOaOpeWkhOeQhlxuICAgICAgICAgICAgICAgIHJlc29sdmUoaXRlbS5hbmtpQ2FyZHMuY2FyZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g6Iul5pys5Zyw5peg5Y+v55So55qE5pWw5o2u77yM5YiZ6YCa6L+HIEFua2lcbiAgICAgICAgICAgICAgICB5aWVsZCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbmtpQWN0aW9uJywgJ21lc3NhZ2VzJzogeyAnYW5raV9hY3Rpb25fdHlwZSc6ICdmaW5kQ2FyZHMnLCAnYW5raV9hcmd1bWVudHMnOiB7ICdxdWVyeSc6ICdpczpkdWUgcHJvcDpkdWU+LTIgcHJvcDpkdWU8MycgfSB9LCB9KS50aGVuKChtZXNzYWdlKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZXJyb3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOagueaNruWNoeeJhyBJRCDmn6Xor6LljaHniYfkv6Hmga9cbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2Fua2lBY3Rpb24nLCAnbWVzc2FnZXMnOiB7ICdhbmtpX2FjdGlvbl90eXBlJzogJ2NhcmRzSW5mbycsICdhbmtpX2FyZ3VtZW50cyc6IHsgJ2NhcmRzJzogbWVzc2FnZS5yZXN1bHQgfSB9LCB9KS50aGVuKChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhcmRzID0gbWVzc2FnZS5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5bCG5pWw5o2u5a2Y5YKo5Yiw5pys5Zyw77yM6ZmQ5Yi25pyA5aSn5L+d5a2Y5pWw6YeP77yM6YG/5YWN5pys5Zyw5a2Y5YKo56m66Ze06L6+5Yiw5LiK6ZmQXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLnNldCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFua2lDYXJkczogeyAndGltZSc6IERhdGUubm93KCksICdjYXJkcyc6IGNhcmRzLnNsaWNlKDAsIDMwKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjYXJkcy5zbGljZSgwLCAzMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Vycm9yXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWPjemmiOmUmeivr+S/oeaBr1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksIChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vZXJyb3JcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH0pO1xufTtcbmV4cG9ydHMuZ2V0QW5raUNhcmRzID0gZ2V0QW5raUNhcmRzO1xuLyoqXG4gKiDlpITnkIblrZfnrKbkuLLvvIzlr7nmjIflrprlrZfnrKborr7nva7moLflvI/jgIHngrnlh7vkuovku7ZcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0g6ZyA6KaB5aSE55CG55qE5a2X56ym5LiyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5V29yZCAtIOW9k+WJjemAieS4reeahOWtl+esplxuICogQHJldHVybnMge3N0cmluZ30g5aSE55CG5ZCO55qEIFByb21wdCDlrZfnrKbkuLJcbiAqIEB0aHJvd3Mge+W8guW4uOexu+Wei30g5byC5bi45o+P6L+wXG4gKi9cbmNvbnN0IGhhbmRsZUhpZ2h0bGlnaHQgPSAoc3RyLCBrZXlXb3JkLCBhbmtpQ2FyZHMsIHdpbmRvd0VsZW1lbnQpID0+IHtcbiAgICBpZiAoc3RyID09PSAnJykge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBsZXQgbmV3U3RyID0gc3RyO1xuICAgIC8vIOWkhOeQhiBrZXl3b3JkIOmrmOS6rlxuICAgIG5ld1N0ciA9IG5ld1N0ci5yZXBsYWNlKG5ldyBSZWdFeHAoYChefFteKl0pKCR7a2V5V29yZH0pKFteKl18JClgLCAnZ2knKSwgZnVuY3Rpb24gKG1hdGNoLCBwMSwgcDIsIHAzKSB7XG4gICAgICAgIC8vIOWmguaenOWFs+mUruivjeWJjeWQjuayoeaciSrvvIzliJnmt7vliqAqKu+8jOWQpuWImeS/neeVmeWOn+agt1xuICAgICAgICBpZiAocDEgIT09ICcqJyAmJiBwMyAhPT0gJyonKSB7XG4gICAgICAgICAgICByZXR1cm4gcDEgKyAnKionICsgcDIgKyAnKionICsgcDM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7IC8vIOS4jei/m+ihjOabv+aNolxuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8g5aSE55CGIEFua2kg5Y2V6K+N6auY5LquXG4gICAgY29uc3QgY2FyZHMgPSBhbmtpQ2FyZHM7XG4gICAgaWYgKHdpbmRvd0VsZW1lbnQgJiYgY2FyZHMpIHtcbiAgICAgICAgLy8g6YGN5Y6G5q+P5LiA5Liq5Y2h54mHXG4gICAgICAgIGNhcmRzLmZvckVhY2goKGNhcmQpID0+IHtcbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY2FyZCk7XG4gICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY2FyZC5maWVsZHMpO1xuICAgICAgICAgICAgbGV0IGZpcnN0S2V5ID0ga2V5c1swXTtcbiAgICAgICAgICAgIC8vIOaJvuWIsOWNoeeJh+ato+mdolxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhcmQuZmllbGRzW2tleXNbaV1dLm9yZGVyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0S2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY2FyZEZyb250VmFsdWUgPSBjYXJkLmZpZWxkc1tmaXJzdEtleV0udmFsdWU7XG4gICAgICAgICAgICBpZiAoY2FyZEZyb250VmFsdWUgIT09IGtleVdvcmQpIHtcbiAgICAgICAgICAgICAgICBuZXdTdHIgPSBuZXdTdHIucmVwbGFjZShuZXcgUmVnRXhwKGNhcmRGcm9udFZhbHVlLCAnZ2knKSwgYDxtYXJrPiR7Y2FyZEZyb250VmFsdWV9PC9tYXJrPmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gfSwgMTApO1xuICAgICAgICAgICAgLy8gLy8g5Yib5bu65LiA5Liq55So5LqO5YyF6KO5J28n55qEPHNwYW4+5YWD57SgXG4gICAgICAgICAgICAvLyB2YXIgc3BhbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAvLyBzcGFuRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY2FyZElEJywgY2FyZC5pZCk7XG4gICAgICAgICAgICAvLyBzcGFuRWxlbWVudC5jbGFzc05hbWUgPSAnaGVsbG8nO1xuICAgICAgICAgICAgLy8gc3BhbkVsZW1lbnQuc3R5bGUuY29sb3IgPSAncmVkJztcbiAgICAgICAgICAgIC8vIHNwYW5FbGVtZW50LnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgICAgIC8vIHNwYW5FbGVtZW50LnRleHRDb250ZW50ID0gY2FyZEZyb250VmFsdWU7XG4gICAgICAgICAgICAvLyAvLyBuZXdTdHIgPSBuZXdTdHIucmVwbGFjZSgvby9naSwgc3BhbkVsZW1lbnQub3V0ZXJIVE1MKTtcbiAgICAgICAgICAgIC8vIG5ld1N0ciA9IG5ld1N0ci5yZXBsYWNlKG5ldyBSZWdFeHAoY2FyZEZyb250VmFsdWUsICdnaScpLCBzcGFuRWxlbWVudC5vdXRlckhUTUwpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8g5a+55LiK6L+w5YWD57Sg5re75Yqg54K55Ye75LqL5Lu2XG4gICAgICAgIC8vIGxldCBoaWdodGxpZ2h0RG9tID0gd2luZG93RWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdoZWxsbycpXG4gICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgaGlnaHRsaWdodERvbS5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyAgICAgaGlnaHRsaWdodERvbVtpXS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUhpZ2h0bGlnaHRDbGljaylcbiAgICAgICAgLy8gICAgIGhpZ2h0bGlnaHREb21baV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVIaWdodGxpZ2h0Q2xpY2spXG4gICAgICAgIC8vIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld1N0cjtcbiAgICAvLyByZXR1cm4gJ3RydWUnXG59O1xuZXhwb3J0cy5oYW5kbGVIaWdodGxpZ2h0ID0gaGFuZGxlSGlnaHRsaWdodDtcbi8qKlxuICog6I635Y+W57O757uf55qE6buY6K6kIFByb21wdFxuICogQHBhcmFtIHtzdHJpbmd9IGtleVdvcmQgLSDlvZPliY3pgInkuK3nmoTlrZfnrKZcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFByb21wdCDlrZfnrKbkuLJcbiAqIEB0aHJvd3Mge+W8guW4uOexu+Wei30g5byC5bi45o+P6L+wXG4gKi9cbmNvbnN0IGdldERlZmF1bHRQcm9tcHQgPSAoa2V5V29yZCkgPT4ge1xuICAgIGxldCBnZXRVbnNwbGFzaEltYWdlcyA9IHRydWU7XG4gICAgbGV0IHVzZXJQcm9tcHQgPSBgXG5cbiAgICAgICAgUGxlYXNlIGhlbHAgbWUgbGVhcm4gYXMgYSBmb3JlaWduIGxhbmd1YWdlIHRlYWNoZXIuIFNlbnRlbmNlcyBpbiBleGFtcGxlcyBzaG91bGQgbm90IGJlIHRoZSBzYW1lIGFzIHRoZSBnaXZlbiBzZW50ZW5jZS5cblxuICAgICAgICBFeGFtcGxl77yaXG4gICAgICAgIFwiXCJcIlxuICAgICAgICAtICBNZWFuaW5nOiA8RXhwbGFpbiB0aGUgbWVhbmluZyB1c2luZyB7bmF0aXZlTGFuZ3VhZ2V9PlxuICAgICAgICAtICBQYXJ0IG9mIFNwZWVjaDogPEluZGljYXRlIHRoZSBwYXJ0IG9mIHNwZWVjaCB1c2luZyB7bmF0aXZlTGFuZ3VhZ2V9PlxuICAgICAgICBcbiAgICAgICAgIyMgTWVhbmluZyBpbiB0aGUgc2VudGVuY2VcbiAgICAgICAgLSAgPEV4cGxhaW4gdGhlIG1lYW5pbmcgb2YgdGhlIHdvcmQgaW4gdGhlIHNlbnRlbmNlIHVzaW5nIHtuYXRpdmVMYW5ndWFnZX0+XG4gICAgICAgIFxuICAgICAgICAjIyBFeGFtcGxlIFNlbnRlbmNlc1xuICAgICAgICAtICA8e3RhcmdldExhbmd1YWdlfSBleGFtcGxlIHNlbnRlbmNlPiAtIDxUcmFuc2xhdGlvbiBpbiB7bmF0aXZlTGFuZ3VhZ2V9PlxuICAgICAgICAtICA8e3RhcmdldExhbmd1YWdlfSBleGFtcGxlIHNlbnRlbmNlPiAtIDxUcmFuc2xhdGlvbiBpbiB7bmF0aXZlTGFuZ3VhZ2V9PlxuICAgICAgICBcbiAgICAgICAgIyMgVHJhbnNsYXRpb24gRXhlcmNpc2VcbiAgICAgICAgLSAgPHtuYXRpdmVMYW5ndWFnZX0gc2VudGVuY2U+XG4gICAgICAgIC0gIDx7bmF0aXZlTGFuZ3VhZ2V9IHNlbnRlbmNlPlxuICAgICAgICBcbiAgICAgICAgXCJcIlwiIFxuICAgICAgICBcbiAgICAgICAgV29yZDp7c2VsZWN0aW9ufSwgc2VudGVuY2U6IHtzZW50ZW5jZX0sWW91IG11c3QgcmVwbHkgaW4gdGhlIHNwZWNpZmllZCBsYW5ndWFnZVxuXG4gICAgICAgIFBsZWFzZSBzdGFydCB0ZWFjaGluZzpcblxuICAgICAgICBgO1xuICAgIC8vIOWFs+mUruWtl+mVv+W6pui+g+mVv+aXtu+8jOaMieeFp+WPpeWtkOi/m+ihjOWkhOeQhlxuICAgIGlmIChrZXlXb3JkLmxlbmd0aCA+IDIwKSB7XG4gICAgICAgIGdldFVuc3BsYXNoSW1hZ2VzID0gZmFsc2U7XG4gICAgICAgIHVzZXJQcm9tcHQgPSBgXG4gICAgICBcbiAgICAgICAgICAgICAgICAgIEFzIGEgbGFuZ3VhZ2UgdGVhY2hlciwgSSB3aWxsIHByb3ZpZGUgYW4gZXhwbGFuYXRpb24gb2YgdGhlIGdyYW1tYXIga25vd2xlZGdlIGluIHRoZSBnaXZlbiBzZW50ZW5jZTpcbiAgICAgIFxuICAgICAgICAgICAgICAgICAgRXhhbXBsZTpcbiAgICAgICAgICAgICAgICAgIFwiXCJcIlxuICAgICAgXG4gICAgICAgICAgICAgICAgICAjIyBUcmFuc2xhdGlvblxuICAgICAgICAgICAgICAgICAgPFRyYW5zbGF0ZSB0byB7bmF0aXZlTGFuZ3VhZ2V9PlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAjIyBHcmFtbWFyXG4gICAgICAgICAgICAgICAgICA8LSBQb2ludDogRXhwbGFpbiBpbiB7bmF0aXZlTGFuZ3VhZ2V9PlxuICAgICAgXG4gICAgICAgICAgICAgICAgICAjIyBFeGFtcGxlcyBvZiByZWxhdGVkIGdyYW1tYXJcbiAgICAgICAgICAgICAgICAgIC0gIDx7dGFyZ2V0TGFuZ3VhZ2V9IGV4YW1wbGUgc2VudGVuY2U+IC0gPFRyYW5zbGF0aW9uIGluIHtuYXRpdmVMYW5ndWFnZX0+XG4gICAgICAgICAgICAgICAgICAtICA8e3RhcmdldExhbmd1YWdlfSBleGFtcGxlIHNlbnRlbmNlPiAtIDxUcmFuc2xhdGlvbiBpbiB7bmF0aXZlTGFuZ3VhZ2V9PlxuICAgICAgXG4gICAgICAgICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgU2VudGVuY2U6IHtzZWxlY3Rpb259YDtcbiAgICB9XG4gICAgY29uc3QgZGVmYXVsdFByb21wdCA9IHtcbiAgICAgICAgJ3RpdGxlJzogJ0RlZmF1bHQnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBnZXRVbnNwbGFzaEltYWdlcywgJ3VzZXJQcm9tcHQnOiB1c2VyUHJvbXB0LFxuICAgICAgICAnaWQnOiAnRGVmYXVsdCdcbiAgICB9O1xuICAgIHJldHVybiBkZWZhdWx0UHJvbXB0O1xufTtcbmV4cG9ydHMuZ2V0RGVmYXVsdFByb21wdCA9IGdldERlZmF1bHRQcm9tcHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNldERvbm90Q2xvc2VQb3B1cENhcmQgPSBleHBvcnRzLnBpblBvcHVwQ2FyZCA9IHZvaWQgMDtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgcmVhY3RfZG9tXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlYWN0LWRvbVwiKSk7XG5jb25zdCBQb3B1cENhcmRfMSA9IHJlcXVpcmUoXCIuL1BvcHVwQ2FyZFwiKTtcbmNvbnN0IGNzc2luanNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9jc3NpbmpzXCIpO1xuY29uc3Qgc3R5bGVkX2NvbXBvbmVudHNfMSA9IHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKTtcbmNvbnN0IGxhbmdfMSA9IHJlcXVpcmUoXCIuL2xpYi9sYW5nXCIpO1xuY29uc3QgbG9jYWxlXzEgPSByZXF1aXJlKFwiLi9saWIvbG9jYWxlXCIpO1xuY29uc3QgdXNlckluZm9fMSA9IHJlcXVpcmUoXCIuL2xpYi91c2VySW5mb1wiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5jb25zdCBzdHlsZV8xID0gcmVxdWlyZShcIi4vUG9wdXBDYXJkL3N0eWxlXCIpO1xuY29uc3QgaWNvbjEyOF9wbmdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9hc3NldHMvaWNvbjEyOC5wbmdcIikpO1xuY29uc3Qgc3R5bGVkX2NvbXBvbmVudHNfMiA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwic3R5bGVkLWNvbXBvbmVudHNcIikpO1xuLy8gaW1wb3J0ICcuL2Fzc2V0cy90YWlsd2luZC5jc3MnO1xuLy8g6aG16Z2i6L295YWl5ZCO5Lya5rOo5YWl5qyh6ISa5pys77yM5oiWIGJhY2tncm91bmQg5Y+v6IO95Lya5Zyo5LiA5Lqb5oOF5Ya15LiL5rOo5YWl5q2k6ISa5pysXG4vLyBjb25zb2xlLmxvZygnYmVmb3JlIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXInKTtcbi8vIOiusOW9leW9k+WJjeeql+WPo+aYr+WQpiBQaW4g5L2PXG5sZXQgaXNQaW4gPSBmYWxzZTtcbi8vIOiuvue9ruW9k+WJjeeql+WPo+aYr+WQpuWFgeiuuOWFs+mXrVxubGV0IGRvbm90Q2xvc2VQb3B1cENhcmQgPSBmYWxzZTtcbi8vIOWIneWni+WMluS4u+WuueWZqO+8jOS4u+WuueWZqOeUqOadpeaMguWcqOWFqOWxgOagt+W8j++8jOWMheaLrOesrOS4ieaWuee7hOS7tueahOagt+W8j1xubGV0IE15Qm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ19famlhbmctc2NvdXRlcicpO1xuLy8gY29uc29sZS5sb2coTXlCb3gpO1xuLy8gY29udGFpbmVyIOaJv+i9vSBVSSDnu4Tku7ZcbmxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnRhaW5lci5jbGFzc05hbWUgPSAnY29udGFpbmVyJztcbi8vIOS9v+eUqCBzaGFkb3cg5p2l6ZqU56a75qC35byPXG5sZXQgc2hhZG93Um9vdCA9IHVuZGVmaW5lZDtcbmlmIChNeUJveCA9PT0gbnVsbCB8fCBNeUJveCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8g5aaC5p6c5LiN5a2Y5Zyo5a655ZmoXG4gICAgLy8g5Yib5bu65Li75a655ZmoXG4gICAgTXlCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBNeUJveC5pZCA9ICdfX2ppYW5nLXNjb3V0ZXInO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uYXBwZW5kQ2hpbGQoTXlCb3gpO1xuICAgIE15Qm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IC8v6buY6K6k6ZqQ6JePXG4gICAgc2hhZG93Um9vdCA9IE15Qm94ID09PSBudWxsIHx8IE15Qm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBNeUJveC5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdCA9PT0gbnVsbCB8fCBzaGFkb3dSb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgLy8gQW50IOe7hOS7tuagt+W8j1xuICAgIC8vIGNvbnN0IGFudFN0eWxlc2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgLy8gYW50U3R5bGVzaGVldC5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgLy8gYW50U3R5bGVzaGVldC5ocmVmID0gJ2h0dHBzOi8vY2RuLmJvb3RjZG4ubmV0L2FqYXgvbGlicy9hbnRkLzQuMTcuMS9hbnRkLm1pbi5jc3MnO1xuICAgIC8vIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoYW50U3R5bGVzaGVldCk7XG4gICAgLy8gVGFpbHdpbmRcbiAgICBjb25zdCB0YWlsd2luZFN0eWxlc2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgdGFpbHdpbmRTdHlsZXNoZWV0LnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICB0YWlsd2luZFN0eWxlc2hlZXQuaHJlZiA9ICdodHRwczovL3VucGtnLmNvbS90YWlsd2luZGNzc0BeMi9kaXN0L3RhaWx3aW5kLm1pbi5jc3MnO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGFpbHdpbmRTdHlsZXNoZWV0KTtcbiAgICAvLyDlnKggU2hhZG93IERPTSDkuK3mt7vliqDmoLflvI/vvJpcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBzdHlsZV8xLnBvcHVwQ2FyZFN0eWxlO1xuICAgIHNoYWRvd1Jvb3QgPT09IG51bGwgfHwgc2hhZG93Um9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hhZG93Um9vdC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5sZXQgVVNFUl9JTkZPO1xuY29uc3QgdGhpc0dldFVzZXJJbmZvID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgVVNFUl9JTkZPID0geWllbGQgKDAsIHV0aWxfMS5nZXRVc2VySW5mbykoKTtcbn0pO1xudGhpc0dldFVzZXJJbmZvKCk7XG5sZXQgcG9ydCA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5jb25uZWN0KHtcbiAgICBuYW1lOiAnZnJvbUNvbnRlbnRTY3JpcHQnXG59KTtcbi8vIOaOpeaUtiBiYWNrZ3JvdW5kIOa2iOaBr++8iOebruWJjeaYr+mAmui/h+a1j+iniOWZqOeahOWPs+mUruiPnOWNleinpuWPke+8iVxud2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAobXNnLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIHZhciBfYTtcbiAgICAvLyBjb25zb2xlLmxvZygnY29udGVudCBzY3JpcHQgb25NZXNzYWdlOicpO1xuICAgIC8vIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgaWYgKG1zZy50eXBlID09PSAnb3Blbi1zY291dGVyJykge1xuICAgICAgICAvLyDlpITnkIbnqpflj6NcbiAgICAgICAgaWYgKE15Qm94ICE9PSBudWxsICYmIE15Qm94ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIOWmguaenOW3suWtmOWcqOWuueWZqFxuICAgICAgICAgICAgaWYgKCgoX2EgPSBNeUJveC5zaGFkb3dSb290KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lcicpKSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIOWmguaenOS4jeWtmOWcqCBQb3B1cENhcmRcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gJ2NvbnRhaW5lcic7XG4gICAgICAgICAgICAgICAgc2hhZG93Um9vdCA9PT0gbnVsbCB8fCBzaGFkb3dSb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDlgZzmraLml6fnmoTlr7nor51cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ1N0b3BUaGVDb252ZXJzYXRpb24nLCAnbWVzc2FnZXMnOiAnJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIC8vIOmHjeaWsOmTvuaOpVxuICAgICAgICAgICAgICAgIHBvcnQgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdmcm9tQ29udGVudFNjcmlwdCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnU3RvcFRoZUNvbnZlcnNhdGlvbicsICdtZXNzYWdlcyc6ICcnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgTXlCb3guc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAvLyDnp7vpmaTml6flhoXlrrnvvIzpgb/lhY0gMiDmrKHmuLLmn5Pmt7fmnYLlnKjkuIDotbdcbiAgICAgICAgICAgIC8vIGNvbnRhaW5lci5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+S4jeWtmOWcqCBCb3gg5a655ZmoJyk7XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSAnY29udGFpbmVyJztcbiAgICAgICAgICAgIHNoYWRvd1Jvb3QgPT09IG51bGwgfHwgc2hhZG93Um9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIC8vIOaYvuekuueql+WPo1xuICAgICAgICBpZiAoc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5rZXlXb3JkICE9PSAnJykge1xuICAgICAgICAgICAgc2hvd1BvcHVwQ2FyZCh7ICdrZXlXb3JkJzogc2VsZWN0aW9uID09PSBudWxsIHx8IHNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VsZWN0aW9uLmtleVdvcmQsICdTZW50ZW5jZSc6IHNlbGVjdGlvbi5zZW50ZW5jZSB9LCB3aW5kb3cuZ2V0U2VsZWN0aW9uKCksIGNvbnRhaW5lciwgc2hhZG93Um9vdCwgaXNQaW4sIG1zZy5ydW5Qcm9tcHQpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3NlbGVjdGlvbmNoYW5nZScsIGhhbmRsZVNlbGVjdGlvbmNoYW5nZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZXVwKTtcbiAgICAgICAgLy8g55uR5ZCs6aG16Z2i54K55Ye75LqL5Lu2XG4gICAgICAgIGRvY3VtZW50Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBpZiAoTXlCb3ggIT09IHVuZGVmaW5lZCAmJiBNeUJveCAhPT0gbnVsbCAmJiAhaXNQaW4gJiYgIWRvbm90Q2xvc2VQb3B1cENhcmQpIHtcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzngrnlh7vnmoTkuI3mmK/mj5Lku7bnqpflj6Plj4rlhbblrZDlhYPntKDvvIzliJnlhbPpl63nqpflj6NcbiAgICAgICAgICAgICAgICBpZiAoTXlCb3ggIT09IGV2ZW50LnRhcmdldCAmJiAhTXlCb3guY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAvLyDpmpDol4/nqpflj6NcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gY29udGFpbmVyLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzZWxlY3Rpb25jaGFuZ2UnLCBoYW5kbGVTZWxlY3Rpb25jaGFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2V1cCk7XG4gICAgICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb250YWluZXIub25tb3VzZWRvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIC8vIOmakOiXjyBzZXRBbmtpU3BhY2VCdXR0b25cbiAgICAgICAgICAgIGNvbnN0IGNvbnRleHRCb3ggPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGV4dEJveDInKVswXTtcbiAgICAgICAgICAgIGlmIChjb250ZXh0Qm94KSB7XG4gICAgICAgICAgICAgICAgLy8g54K55Ye755qE5LiN5pivIHNldEFua2lTcGFjZUJ1dHRvbiDml7bmiY3pmpDol49cbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dEJveCAhPT0gZXZlbnQudGFyZ2V0ICYmICFjb250ZXh0Qm94LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gY29udGV4dEJveC5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlQ2hpbGQoY29udGV4dEJveCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn0pO1xuLy8g5pi+56S65bqU55So56qX5Y+jXG5mdW5jdGlvbiBzaG93UG9wdXBDYXJkKGRhdGEsIG1zZywgTXlCb3gsIHNoYWRvd1Jvb3QsIGlzUGluLCBydW5Qcm9tcHQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBsZXQgbGFuZyA9IHlpZWxkICgwLCBsYW5nXzEuZmV0Y2hjdXJyZW50TGFuZ3VhZ2UpKCk7XG4gICAgICAgIHJlYWN0X2RvbV8xLmRlZmF1bHQucmVuZGVyKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5TdHJpY3RNb2RlLCBudWxsLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQobG9jYWxlXzEuQ3VycmVudExhbmd1YWdlQ29udGV4dC5Qcm92aWRlciwgeyB2YWx1ZTogbGFuZyB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHVzZXJJbmZvXzEuVXNlckluZm9Db250ZXh0LlByb3ZpZGVyLCB7IHZhbHVlOiBVU0VSX0lORk8gfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoY3NzaW5qc18xLlN0eWxlUHJvdmlkZXIsIHsgY29udGFpbmVyOiBzaGFkb3dSb290IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChzdHlsZWRfY29tcG9uZW50c18xLlN0eWxlU2hlZXRNYW5hZ2VyLCB7IHRhcmdldDogc2hhZG93Um9vdCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFBvcHVwQ2FyZF8xLlBvcHVwQ2FyZCwgeyBkYXRhOiBkYXRhLCBzZWxlY3Rpb246IG1zZywgcnVuUHJvbXB0OiBydW5Qcm9tcHQsIGlzUGluOiBpc1BpbiB9KSkpKSkpLCBNeUJveCk7XG4gICAgfSk7XG59XG4vLyBpbnRlcmZhY2UgUG9wdXBDYXJkQ29udGV4dFByb3BzIHtcbi8vICAgZGF0YTogYW55O1xuLy8gICBzZWxlY3Rpb246IGFueTtcbi8vICAgcnVuUHJvbXB0OiBib29sZWFuO1xuLy8gfVxuLy8gZnVuY3Rpb24gUG9wdXBDYXJkQ29udGV4dChwcm9wczogUG9wdXBDYXJkQ29udGV4dFByb3BzKSB7XG4vLyAgIGNvbnN0IFt1c2VySW5mbywgc2V0VXNlckluZm9dID0gdXNlU3RhdGU8dXNlckluZm9UeXBlIHwgbnVsbD4obnVsbCk7XG4vLyAgIGNvbnN0IFtsYW5nLCBzZXRMYW5nXSA9IHVzZVN0YXRlPGFueT4obnVsbCk7XG4vLyAgIHVzZUVmZmVjdCgoKSA9PiB7XG4vLyAgICAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hVc2VySW5mbygpIHtcbi8vICAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCBnZXRVc2VySW5mbygpO1xuLy8gICAgICAgY29uc3QgbGFuZyA9IGF3YWl0IGZldGNoY3VycmVudExhbmd1YWdlKClcbi8vICAgICAgIHNldExhbmcobGFuZylcbi8vICAgICAgIHNldFVzZXJJbmZvKGluZm8pO1xuLy8gICAgIH1cbi8vICAgICBmZXRjaFVzZXJJbmZvKCk7XG4vLyAgIH0sIFtdKTsgIC8vIOi3keS4gOasoe+8jOS4jeS+nei1luS7u+S9leWklumDqOWPmOmHj1xuLy8gICByZXR1cm4gKFxuLy8gICAgIDxDdXJyZW50TGFuZ3VhZ2VDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXtsYW5nfT5cbi8vICAgICAgIDxVc2VySW5mb0NvbnRleHQuUHJvdmlkZXIgdmFsdWU9e1VTRVJfSU5GT30+XG4vLyAgICAgICAgIDxTdHlsZVByb3ZpZGVyIGNvbnRhaW5lcj17c2hhZG93Um9vdH0+XG4vLyAgICAgICAgICAgPFN0eWxlU2hlZXRNYW5hZ2VyIHRhcmdldD17c2hhZG93Um9vdH0+XG4vLyAgICAgICAgICAgICA8UG9wdXBDYXJkIGRhdGE9e3Byb3BzLmRhdGF9IHNlbGVjdGlvbj17cHJvcHMuc2VsZWN0aW9ufSBydW5Qcm9tcHQ9e3Byb3BzLnJ1blByb21wdH0gaXNQaW49e2lzUGlufSAvPlxuLy8gICAgICAgICAgIDwvU3R5bGVTaGVldE1hbmFnZXI+XG4vLyAgICAgICAgIDwvU3R5bGVQcm92aWRlcj5cbi8vICAgICAgIDwvVXNlckluZm9Db250ZXh0LlByb3ZpZGVyPlxuLy8gICAgIDwvQ3VycmVudExhbmd1YWdlQ29udGV4dC5Qcm92aWRlcj5cbi8vICAgKVxuLy8gfVxuY29uc3QgcGluUG9wdXBDYXJkID0gKHZhbHVlKSA9PiB7XG4gICAgaXNQaW4gPSB2YWx1ZTtcbn07XG5leHBvcnRzLnBpblBvcHVwQ2FyZCA9IHBpblBvcHVwQ2FyZDtcbmNvbnN0IHNldERvbm90Q2xvc2VQb3B1cENhcmQgPSAodmFsdWUpID0+IHtcbiAgICBkb25vdENsb3NlUG9wdXBDYXJkID0gdmFsdWU7XG59O1xuZXhwb3J0cy5zZXREb25vdENsb3NlUG9wdXBDYXJkID0gc2V0RG9ub3RDbG9zZVBvcHVwQ2FyZDtcbmxldCBpc1RleHRTZWxlY3RlZCA9IGZhbHNlO1xuY29uc3QgaGFuZGxlU2VsZWN0aW9uY2hhbmdlID0gKCkgPT4ge1xuICAgIC8vIGxldCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgLy8gaWYgKHNlbGVjdGlvbikge1xuICAgIC8vICAgY29uc29sZS5sb2coJ3NlbGVjdGlvbi50b1N0cmluZygpOicpO1xuICAgIC8vICAgY29uc29sZS5sb2coc2VsZWN0aW9uLnRvU3RyaW5nKCkpO1xuICAgIC8vICAgaXNUZXh0U2VsZWN0ZWQgPSBzZWxlY3Rpb24udG9TdHJpbmcoKS5sZW5ndGggPiAwO1xuICAgIC8vIH1cbn07XG5jb25zdCBoYW5kbGVNb3VzZXVwID0gKGV2ZW50KSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZU1vdXNldXAnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhpc1RleHRTZWxlY3RlZCk7XG4gICAgLy8gY29uc29sZS5sb2coZG9ub3RDbG9zZVBvcHVwQ2FyZCk7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNlbGVjdGlvbikge1xuICAgICAgICBpc1RleHRTZWxlY3RlZCA9IHNlbGVjdGlvbi5zZWxlY3Rpb24udG9TdHJpbmcoKS5sZW5ndGggPiAwO1xuICAgIH1cbiAgICBpZiAoaXNUZXh0U2VsZWN0ZWQgJiYgIWRvbm90Q2xvc2VQb3B1cENhcmQpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2lzVGV4dFNlbGVjdGVkICYmICFkb25vdENsb3NlUG9wdXBDYXJkJyk7XG4gICAgICAgIGlmIChNeUJveCAhPT0gZXZlbnQudGFyZ2V0ICYmICEoTXlCb3ggPT09IG51bGwgfHwgTXlCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IE15Qm94LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpKSB7XG4gICAgICAgICAgICAvLyDlnKggUG9wdXBDYXJkIOiMg+WbtOWkluinpuWPkVxuICAgICAgICAgICAgaXNUZXh0U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIOWBnOatouaXp+eahOWvueivnVxuICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ1N0b3BUaGVDb252ZXJzYXRpb24nLCAnbWVzc2FnZXMnOiAnJyB9KTtcbiAgICAgICAgICAgIC8vIOaYvuekuueql+WPo1xuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbiAmJiAoc2VsZWN0aW9uID09PSBudWxsIHx8IHNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VsZWN0aW9uLmtleVdvcmQubGVuZ3RoKSA+IDApIHtcbiAgICAgICAgICAgICAgICBzaG93UG9wdXBDYXJkKHsgJ2tleVdvcmQnOiBzZWxlY3Rpb24gPT09IG51bGwgfHwgc2VsZWN0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZWxlY3Rpb24ua2V5V29yZCwgJ1NlbnRlbmNlJzogc2VsZWN0aW9uLnNlbnRlbmNlIH0sIHdpbmRvdy5nZXRTZWxlY3Rpb24oKSwgY29udGFpbmVyLCBzaGFkb3dSb290LCBpc1BpbiwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyDlnKggUG9wdXBDYXJkIOiMg+WbtOWGheinpuWPkVxuICAgICAgICAgICAgLy8g5pi+56S65a6M5b2i5aGr56m65pON5L2c5oyJ6ZKuXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRleHQgPSBzaGFkb3dSb290LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0U3RyaW5nID0gc2VsZWN0ZWRUZXh0LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBjb25zdCBzZW50ZW5jZSA9ICcnO1xuICAgICAgICAgICAgY29uc3QgUG9wdXBDYXJkQ29udGFpbmVyID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRhaW5lcicpWzBdO1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZXNCb3ggPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVzc2FnZXMnKVswXTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHNlbGVjdGVkVGV4dCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlc0JveD8uY29udGFpbnMoc2VsZWN0ZWRUZXh0LmJhc2VOb2RlLnBhcmVudE5vZGUgYXMgTm9kZSkpO1xuICAgICAgICAgICAgbGV0IGlzSW5NZXNzYWdlcyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzQm94ID09PSBzZWxlY3RlZFRleHQuYmFzZU5vZGUucGFyZW50Tm9kZSB8fCAobWVzc2FnZXNCb3ggPT09IG51bGwgfHwgbWVzc2FnZXNCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc3NhZ2VzQm94LmNvbnRhaW5zKHNlbGVjdGVkVGV4dC5iYXNlTm9kZS5wYXJlbnROb2RlKSkpIHtcbiAgICAgICAgICAgICAgICAvL+WcqCBtZXNzYWdlcyDlrrnlmajlhoXmk43kvZzvvIzliJnmmL7npLrmk43kvZzmjInpkq5cbiAgICAgICAgICAgICAgICBpc0luTWVzc2FnZXMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFBvcHVwQ2FyZENvbnRhaW5lciAmJiBzZWxlY3RlZFRleHRTdHJpbmcubGVuZ3RoID4gMCAmJiAhY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5jb250ZXh0Qm94MicpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRleHRCb3gyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY29udGV4dEJveDIuY2xhc3NOYW1lID0gJ2NvbnRleHRCb3gyJztcbiAgICAgICAgICAgICAgICBjb250ZXh0Qm94Mi5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICAgICAgICAgICAgUG9wdXBDYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRleHRCb3gyKTtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZ2UgPSBzZWxlY3RlZFRleHQuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgICAgICAgICByZWFjdF9kb21fMS5kZWZhdWx0LnJlbmRlcihyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChzdHlsZWRfY29tcG9uZW50c18xLlN0eWxlU2hlZXRNYW5hZ2VyLCB7IHRhcmdldDogc2hhZG93Um9vdCB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChUb29sQmFyLCB7IHNlbGVjdGVkVGV4dDogc2VsZWN0ZWRUZXh0LmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIHNlbGVjdGVkVGV4dFN0cmluZzogc2VsZWN0ZWRUZXh0U3RyaW5nLCByYW5nZTogcmFuZ2UgfSkpLCBjb250ZXh0Qm94Mik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBcbiAgICAgICAgfVxuICAgIH1cbn07XG5jb25zdCBnZXRTZWxlY3Rpb24gPSAoKSA9PiB7XG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2Y7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgIGlmIChzZWxlY3Rpb24gIT09IG51bGwpIHtcbiAgICAgICAgLy8g5b2T5YmN6YCJ5Lit55qE5paH5a2XXG4gICAgICAgIGxldCBrZXlXb3JkID0gc2VsZWN0aW9uLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgICAgICAvLyDpgInkuK3mloflrZfmiYDlnKjnmoTmrrXokL1cbiAgICAgICAgbGV0IHNlbnRlbmNlID0gKF9iID0gKF9hID0gc2VsZWN0aW9uLmFuY2hvck5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50ZXh0Q29udGVudCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogJyc7XG4gICAgICAgIGlmIChzZW50ZW5jZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZW50ZW5jZSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VudGVuY2UgPSBzZW50ZW5jZS5sZW5ndGggPD0ga2V5V29yZC5sZW5ndGggPyAoX2YgPSAoX2UgPSAoX2QgPSAoX2MgPSBzZWxlY3Rpb24uYW5jaG9yTm9kZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuaW5uZXJUZXh0KSAhPT0gbnVsbCAmJiBfZiAhPT0gdm9pZCAwID8gX2YgOiAnJyA6IHNlbnRlbmNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7ICdzZWxlY3Rpb24nOiBzZWxlY3Rpb24sICdrZXlXb3JkJzoga2V5V29yZCwgJ3NlbnRlbmNlJzogc2VudGVuY2UgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn07XG5jb25zdCBzZXRBbmtpU3BhY2UgPSAocmFuZ2UsIHNlbGVjdGVkVGV4dCwgZXZlbnQsIGlzQWRkTmV3KSA9PiB7XG4gICAgbGV0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgYW5raVNwYWNlID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Fua2lTcGFjZScpO1xuICAgIC8vIOiOt+WPluW9k+WJjeacgOWkp+eahCBpbmRleFxuICAgIGxldCBtYXhJbmRleCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbmtpU3BhY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdGhpc0luZGV4ID0gTnVtYmVyKGFua2lTcGFjZVtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSk7XG4gICAgICAgIGlmICh0aGlzSW5kZXggPiBtYXhJbmRleCkge1xuICAgICAgICAgICAgbWF4SW5kZXggPSB0aGlzSW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IG51bWJlciA9IG1heEluZGV4ID09PSAwID8gMSA6IG1heEluZGV4O1xuICAgIGlmIChpc0FkZE5ldykge1xuICAgICAgICBudW1iZXIgPSBtYXhJbmRleCArIDE7XG4gICAgfVxuICAgIHNwYW4udGV4dENvbnRlbnQgPSAne3tjJyArIG51bWJlciArICc6OicgKyBzZWxlY3RlZFRleHQgKyAnfX0nO1xuICAgIHNwYW4uY2xhc3NOYW1lID0gJ2Fua2lTcGFjZSc7XG4gICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBudW1iZXIudG9TdHJpbmcoKSk7XG4gICAgc3Bhbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIOaBouWkjeS4uum7mOiupOagt+W8j1xuICAgICAgICAvLyBzcGFuLmlubmVyVGV4dFxuICAgICAgICBpZiAoc3Bhbi50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgLy8gbGV0IG9sZFRleHQgPSBzcGFuLnRleHRDb250ZW50XG4gICAgICAgICAgICAvLyBvbGRUZXh0ID0gb2xkVGV4dC5yZXBsYWNlKCd7e2MxOjonLCAnJylcbiAgICAgICAgICAgIC8vIG9sZFRleHQgPSBvbGRUZXh0LnJlcGxhY2UoJ319JywgJycpXG4gICAgICAgICAgICB2YXIgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzZWxlY3RlZFRleHQpO1xuICAgICAgICAgICAgKF9hID0gc3Bhbi5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVwbGFjZUNoaWxkKHRleHROb2RlLCBzcGFuKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmFuZ2UgPT09IG51bGwgfHwgcmFuZ2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7XG4gICAgcmFuZ2UgPT09IG51bGwgfHwgcmFuZ2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJhbmdlLmluc2VydE5vZGUoc3Bhbik7XG59O1xuY29uc3QgU3R5bGVkQnV0dG9uID0gc3R5bGVkX2NvbXBvbmVudHNfMi5kZWZhdWx0LmJ1dHRvbiBgXG4gICAgXG4gICAgd2lkdGg6IDE4cHg7XG4gICAgaGVpZ2h0OiAxOHB4O1xuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcblxuICAgICY6aG92ZXIge1xuICAgICAgb3BhY2l0eTogMC44O1xuICAgIH1cbmA7XG5mdW5jdGlvbiBUb29sQmFyKHByb3BzKSB7XG4gICAgY29uc3QgW3Nob3dNZW51LCBzZXRTaG93TWVudV0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkodHJ1ZSk7XG4gICAgY29uc3QgQ29udGV4dEJveCA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRleHRCb3ggPSBDb250ZXh0Qm94LmN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IHBvcHVwQ2FyZCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjTGVhcm5pbmdFbmdsaXNoMjAyMycpO1xuICAgICAgICBjb25zdCBQb3B1cENhcmRDb250YWluZXIgPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGFpbmVyJylbMF07XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzQm94ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlcycpO1xuICAgICAgICAvL+iuvue9ruaMiemSrueahOS9jee9rlxuICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRYID0gcHJvcHMuc2VsZWN0ZWRUZXh0Lng7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dFkgPSBwcm9wcy5zZWxlY3RlZFRleHQueTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0V2lkdGggPSBwcm9wcy5zZWxlY3RlZFRleHQud2lkdGg7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dEhlaWdodCA9IHByb3BzLnNlbGVjdGVkVGV4dC5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IGJ1dHRvblggPSAoY29udGV4dEJveCA9PT0gbnVsbCB8fCBjb250ZXh0Qm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb250ZXh0Qm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLngpIHx8IDA7XG4gICAgICAgIGNvbnN0IGJ1dHRvblkgPSAoY29udGV4dEJveCA9PT0gbnVsbCB8fCBjb250ZXh0Qm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb250ZXh0Qm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnkpIHx8IDA7XG4gICAgICAgIC8vIOacgOWkpyBYIOWAvFxuICAgICAgICBjb25zdCBtYXhYID0gKChwb3B1cENhcmQgPT09IG51bGwgfHwgcG9wdXBDYXJkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwb3B1cENhcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpIHx8IDApIC0gY29udGV4dEJveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCAtIDIwO1xuICAgICAgICBjb25zdCBtZXNzYWdlQm94SGVpZ2h0ID0gbWVzc2FnZXNCb3ggPT09IG51bGwgfHwgbWVzc2FnZXNCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc3NhZ2VzQm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgY29uc3QgY29udGFpbmVyQm94SGVpZ2h0ID0gUG9wdXBDYXJkQ29udGFpbmVyID09PSBudWxsIHx8IFBvcHVwQ2FyZENvbnRhaW5lciA9PT0gdm9pZCAwID8gdm9pZCAwIDogUG9wdXBDYXJkQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gbWVzc2FnZUJveEhlaWdodCA+IGNvbnRhaW5lckJveEhlaWdodCA/IG1lc3NhZ2VCb3hIZWlnaHQgKyA2MCA6IGNvbnRhaW5lckJveEhlaWdodDtcbiAgICAgICAgY29uc3QgbWluWSA9IDAgLSBoZWlnaHQ7XG4gICAgICAgIGxldCBsZWZ0ID0gc2VsZWN0ZWRUZXh0WCAtIGJ1dHRvblggKyBzZWxlY3RlZFRleHRXaWR0aCAtIDYwO1xuICAgICAgICAvLyBsZWZ0ID0gbGVmdCA+IG1heFggPyBtYXhYIDogbGVmdFxuICAgICAgICBsZWZ0ID0gTWF0aC5tYXgoMTAsIE1hdGgubWluKG1heFgsIGxlZnQpKTtcbiAgICAgICAgbGV0IHRvcCA9IHNlbGVjdGVkVGV4dFkgLSBidXR0b25ZIC0gNDA7XG4gICAgICAgIC8vIHRvcCA9IHRvcCA8IG1pblkgPyBtaW5ZIDogdG9wXG4gICAgICAgIHRvcCA9IE1hdGgubWF4KG1pblksIE1hdGgubWluKDYwLCB0b3ApKTtcbiAgICAgICAgLy8gY29udGV4dEJveDIhLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xuICAgICAgICAvLyBjb250ZXh0Qm94IS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgICAgICAgY29udGV4dEJveC5zdHlsZS5sZWZ0ID0gbGVmdC50b1N0cmluZygpICsgJ3B4JztcbiAgICAgICAgY29udGV4dEJveC5zdHlsZS50b3AgPSB0b3AudG9TdHJpbmcoKSArICdweCc7XG4gICAgICAgIHNldFNob3dNZW51KHRydWUpO1xuICAgIH0sIFtdKTtcbiAgICBjb25zdCBoYW5kbGVTZXRBbmtpU3BhY2VCdXR0b25DbGljayA9IChldmVudCwgaXNBZGROZXcpID0+IHtcbiAgICAgICAgc2V0QW5raVNwYWNlKHByb3BzLnJhbmdlLCBwcm9wcy5zZWxlY3RlZFRleHRTdHJpbmcsIGV2ZW50LCBpc0FkZE5ldyk7XG4gICAgICAgIC8vIENvbnRleHRCb3guY3VycmVudCEucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQoQ29udGV4dEJveC5jdXJyZW50ISlcbiAgICAgICAgc2V0U2hvd01lbnUoZmFsc2UpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlRm9sbG93VXBNZW51Q2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIC8vIENvbnRleHRCb3guY3VycmVudCEucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQoQ29udGV4dEJveC5jdXJyZW50ISlcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBQb3B1cENhcmRDb250YWluZXIgPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGFpbmVyJylbMF07XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzQm94ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlcycpO1xuICAgICAgICBjb25zdCBzZW50ZW5jZSA9ICcnO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRYID0gcHJvcHMuc2VsZWN0ZWRUZXh0Lng7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dFkgPSBwcm9wcy5zZWxlY3RlZFRleHQueTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0V2lkdGggPSBwcm9wcy5zZWxlY3RlZFRleHQud2lkdGg7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dEhlaWdodCA9IHByb3BzLnNlbGVjdGVkVGV4dC5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IGZvbGxvd1VwTWVudUJveFggPSAobWVzc2FnZXNCb3ggPT09IG51bGwgfHwgbWVzc2FnZXNCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc3NhZ2VzQm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLngpIHx8IDA7XG4gICAgICAgIGNvbnN0IGZvbGxvd1VwTWVudUJveFkgPSAoKG1lc3NhZ2VzQm94ID09PSBudWxsIHx8IG1lc3NhZ2VzQm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNzYWdlc0JveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55KSB8fCAwKSArICgobWVzc2FnZXNCb3ggPT09IG51bGwgfHwgbWVzc2FnZXNCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc3NhZ2VzQm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCkgfHwgMCk7XG4gICAgICAgIGNvbnN0IGZvbGxvd1VwTWVudUJveFdpZHRoID0gMTQwO1xuICAgICAgICAvLyBjb25zdCBmb2xsb3dVcE1lbnVCb3hIZWlnaHQgPSBmb2xsb3dVcE1lbnVCb3g/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCB8fCAwXG4gICAgICAgIGNvbnN0IG1heFggPSAoKFBvcHVwQ2FyZENvbnRhaW5lciA9PT0gbnVsbCB8fCBQb3B1cENhcmRDb250YWluZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IFBvcHVwQ2FyZENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkgfHwgMCkgLSBmb2xsb3dVcE1lbnVCb3hXaWR0aCAtIDEwO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXhYKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coKG1lc3NhZ2VzQm94Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgfHwgMCkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlc0JveD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZm9sbG93VXBNZW51JylbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpXG4gICAgICAgIGNvbnN0IG1heFkgPSAoKChQb3B1cENhcmRDb250YWluZXIgPT09IG51bGwgfHwgUG9wdXBDYXJkQ29udGFpbmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBQb3B1cENhcmRDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueSkgfHwgMCkgKyAoKFBvcHVwQ2FyZENvbnRhaW5lciA9PT0gbnVsbCB8fCBQb3B1cENhcmRDb250YWluZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IFBvcHVwQ2FyZENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQpIHx8IDApKSAtICgoKG1lc3NhZ2VzQm94ID09PSBudWxsIHx8IG1lc3NhZ2VzQm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNzYWdlc0JveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55KSB8fCAwKSArICgobWVzc2FnZXNCb3ggPT09IG51bGwgfHwgbWVzc2FnZXNCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc3NhZ2VzQm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCkgfHwgMCkpIC0gMjMwO1xuICAgICAgICBjb25zdCBtZXNzYWdlQm94SGVpZ2h0ID0gbWVzc2FnZXNCb3ggPT09IG51bGwgfHwgbWVzc2FnZXNCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc3NhZ2VzQm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgY29uc3QgY29udGFpbmVyQm94SGVpZ2h0ID0gUG9wdXBDYXJkQ29udGFpbmVyID09PSBudWxsIHx8IFBvcHVwQ2FyZENvbnRhaW5lciA9PT0gdm9pZCAwID8gdm9pZCAwIDogUG9wdXBDYXJkQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gbWVzc2FnZUJveEhlaWdodCA+IGNvbnRhaW5lckJveEhlaWdodCA/IG1lc3NhZ2VCb3hIZWlnaHQgKyAxODAgOiBjb250YWluZXJCb3hIZWlnaHQ7XG4gICAgICAgIGNvbnN0IG1pblkgPSAwIC0gaGVpZ2h0ICsgMTMwO1xuICAgICAgICBsZXQgbGVmdCA9IChzZWxlY3RlZFRleHRYIC0gZm9sbG93VXBNZW51Qm94WCArIHNlbGVjdGVkVGV4dFdpZHRoIC0gNDApO1xuICAgICAgICBsZXQgdG9wID0gKHNlbGVjdGVkVGV4dFkgLSBmb2xsb3dVcE1lbnVCb3hZIC0gc2VsZWN0ZWRUZXh0SGVpZ2h0IC0gMTApO1xuICAgICAgICAvLyBYIOWdkOagh+eahOacgOWkp+acgOWwj+WAvFxuICAgICAgICBsZWZ0ID0gTWF0aC5tYXgoMTAsIE1hdGgubWluKG1heFgsIGxlZnQpKTtcbiAgICAgICAgLy8gWSDlnZDmoIfnmoTmnIDlpKflgLxcbiAgICAgICAgdG9wID0gTWF0aC5tYXgobWluWSwgTWF0aC5taW4obWF4WSwgdG9wKSk7XG4gICAgICAgIC8vIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIC8vICAgdHlwZTogJ1VQREFURV9QT1BVUF9DQVJEJywgcGF5bG9hZDoge1xuICAgICAgICAvLyAgICAgc3R5bGU6IHtcbiAgICAgICAgLy8gICAgICAgbGVmdDogbGVmdCxcbiAgICAgICAgLy8gICAgICAgdG9wOiB0b3AsXG4gICAgICAgIC8vICAgICB9LCBmb2xsb3dVcERhdGE6IHsga2V5V29yZDogcHJvcHMuc2VsZWN0ZWRUZXh0U3RyaW5nLCBzZW50ZW5jZTogc2VudGVuY2UgfVxuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gfSk7XG4gICAgICAgIHNldFNob3dNZW51KGZhbHNlKTtcbiAgICAgICAgLy8g5Y+W5raI5paH5a2X6YCJ5Lit77yM6YG/5YWN5oSP5aSW5by55Ye66I+c5Y2V5qCPXG4gICAgICAgIChfYSA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6ICdVUERBVEVfUE9QVVBfQ0FSRCcsIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBsZWZ0LFxuICAgICAgICAgICAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICAgICAgICB9LCBmb2xsb3dVcERhdGE6IHsga2V5V29yZDogcHJvcHMuc2VsZWN0ZWRUZXh0U3RyaW5nLCBzZW50ZW5jZTogc2VudGVuY2UgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLCBzaG93TWVudSAmJiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHJlZjogQ29udGV4dEJveCwgY2xhc3NOYW1lOiAnY29udGV4dEJveCcsIHN0eWxlOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgICAgICB9IH0sXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnYW5raVNwYWNlQnV0dG9uQm94JyB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdzZXRBbmtpU3BhY2VCdXR0b24nLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVTZXRBbmtpU3BhY2VCdXR0b25DbGljayhldmVudCwgZmFsc2UpIH0sIFwiWy4uLl1cIiksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ3NldEFua2lTcGFjZUJ1dHRvbicsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZVNldEFua2lTcGFjZUJ1dHRvbkNsaWNrKGV2ZW50LCB0cnVlKSB9LCBcIlsuLi5dK1wiKSksXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChTdHlsZWRCdXR0b24sIHsgY2xhc3NOYW1lOiAnbG9va1VwQnV0dG9uJywgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aWNvbjEyOF9wbmdfMS5kZWZhdWx0fSlgLFxuICAgICAgICAgICAgICAgIH0sIG9uQ2xpY2s6IGhhbmRsZUZvbGxvd1VwTWVudUNsaWNrIH0pKSkpKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVzZUN1cnJlbnRMYW5ndWFnZSA9IGV4cG9ydHMuQ3VycmVudExhbmd1YWdlQ29udGV4dCA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSByZXF1aXJlKFwicmVhY3RcIik7XG5jb25zdCBsYW5nXzEgPSByZXF1aXJlKFwiLi9sYW5nXCIpO1xuY29uc3QgYXN5bmNGZXRjaGN1cnJlbnRMYW5ndWFnZSA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHJldHVybiB5aWVsZCAoMCwgbGFuZ18xLmZldGNoY3VycmVudExhbmd1YWdlKSgpO1xufSk7XG4vLyDojrflj5blvZPliY3or63oqIBcbmV4cG9ydHMuQ3VycmVudExhbmd1YWdlQ29udGV4dCA9ICgwLCByZWFjdF8xLmNyZWF0ZUNvbnRleHQpKG51bGwpO1xuY29uc3QgdXNlQ3VycmVudExhbmd1YWdlID0gKCkgPT4gKDAsIHJlYWN0XzEudXNlQ29udGV4dCkoZXhwb3J0cy5DdXJyZW50TGFuZ3VhZ2VDb250ZXh0KTtcbmV4cG9ydHMudXNlQ3VycmVudExhbmd1YWdlID0gdXNlQ3VycmVudExhbmd1YWdlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVzZVVzZXJJbmZvQ29udGV4dCA9IGV4cG9ydHMuVXNlckluZm9Db250ZXh0ID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbmV4cG9ydHMuVXNlckluZm9Db250ZXh0ID0gKDAsIHJlYWN0XzEuY3JlYXRlQ29udGV4dCkobnVsbCk7XG5jb25zdCB1c2VVc2VySW5mb0NvbnRleHQgPSAoKSA9PiAoMCwgcmVhY3RfMS51c2VDb250ZXh0KShleHBvcnRzLlVzZXJJbmZvQ29udGV4dCk7XG5leHBvcnRzLnVzZVVzZXJJbmZvQ29udGV4dCA9IHVzZVVzZXJJbmZvQ29udGV4dDtcbiIsImV4cG9ydCBkZWZhdWx0IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFJQUFBQUNBQ0FZQUFBRERQbUhMQUFBQUNYQklXWE1BQUFzVEFBQUxFd0VBbXB3WUFBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQWpLU1VSQlZIZ0I3WjFQYkJSVkhNZC9WZm5US0xSc1FBSk55Z0RlVEVNSjNLeEptNGdYLytFRmszcWdQU2xlYkcvbHhIS0NlR205UUR5MVhEeDRhVkU0Y2JBRXJxWkY1YWhNU1pTWWtOSkdTRFZWNm54M2Q3WnZ4cG5PN3V6Nzg5dDU3NU04ZG1ZV0JQdSs4L3YzZm0rR3lPRndPQndPaDQxMGJQSGRZRERPMWo3OVlLd0VZNm4yNlF2WHdrOUhHNUltZ0F2QktGTnorT1NFMG5Za0NXQWtHTk9rRHArY1VOaVFKSUR2cVdyMlRlT1RFNHB5a2dTd0laNmNHK2ltNFpPN2FIWHRlV1U4ZkxJZWpIOHFuK0sxMWIrZWt5Rjhja0xKVGFZQWxpNGVvYTdPRnlpTHVoQ2NVTnFLVEFHc2ZQRWF5Y1FKaFJjdmtXWmdUZm82ZDJUK1BvTkM4V29qQzU4S0lCVHRBbWdVSnhROXNCVkFvemlodEViYkM2QlJDaUtVeGRxNEZveDVrb0QySUxBb01BaG0vV0JjRE1ZTXRZQVRnR0kwQ01XbkZvVGdCTUNFTEtHRTUxc3dFNHh4YWpKT2NBSm9JeUNFdTcrczBjMzdUK25ySC81TStpMStNSVpxbnczaEJOQ21QRnhlcDh1M2xwT0U0Rk1USW5BQ2FITWdoSGUvK2kzdUhueHFVQVRaUlg0SGEzcEwyK2pIOHg2ZGU2TmJ2T3dGWXpZWTNWbC8zZ21nSUZ6NllDOU52RlVTTC9VSFk0RXlhZ3RPQUFWaTR1MFNEWi9ZSlY3eXFOcmY0YVg5R1NlQWduSHAvWDNVdXlkUzRQV29Lb0pFZCtBRVVEQlE4cjV5Wm4vOHNoZU15YVRmN3dSUVFBYU9kdExBa2M3NDVaSGFpT0FFVUZBbVRwV1NMc01LUkZ5QkUwQkJnUldJeFFJQWt6OG1YbkFDS0REdnZQNUswdVhQeFJNbmdBS1RFQWNBV0lIQjhNUUpvTUQwOVd4UCsrcHNlTUNxSXdnclhYZC9YU05IOWU2RkgyK0ZycDB2cG4xMU9oaWpPR0FsZ0t0M1Y0S2x6bWZrUUVGbmIrc0NTTi9QQVRmZ0JjTm41UUt3M3UybzBuY3d1Myt4UlR6OHdzb0MvUFQ3My9Yai92NSs2dTdPWE13cUZQUHo4L1hqcnAzSzcwMFB2N0FSUUtVVlN1aUxtNTZlcm9qQUZoWVhGK240OGVQMTg5NDkyMGdIYkZ5QWVQY0RteVlmcks2dTFvL2h1eHZaanlrRE5nSVEvYjl0a3c4ZVBIaFFQOVoxOXdNK0Z1RFJwZ1d3emZlRHBhV2wrckd1dXgrd2RBRTJXZ0RmOSt2SFZsb0EwUVY0bmtlMkVSV0F2dGljcFFVNGR1d1kyY2JLeXVaK0R1c3NRRHdGdERFR1FCb1kwbHV5ekFMWW5nS0tkei9RVUFTcXc4WUNoTmdZQU42N2R5OXlycUVNWEllSEJWQ2NBbDYvZnAwNk9qcWtEZnozWkNKYUFKMHBJR0RuQWxSWUFMSEdMb05EaHc2UlRNUU1RT2ZkRDlpNUFCVXBvQmhneVVDMlNFVUI2UFQvZ01WaWtPb1VVQlFBZXVhYlhXZS8rZk5UT3YvZDQ4cXhDZ3RscWdnRWpBdEFkUXFJeVJkOWJOL0I3VTBYV2xTbnFKRWFRRW52bEJoM0FhcFR3SGlOUFkrUFZSMmptTFFBeGdXZ09nVVVBOEM4QWRiRDVjMjk5eXBpbEVnTTBHbFpES0E2QlJUOWY5K0JuQUo0c2w0L0xwZkxORFUxUmFySSsyL01pM2tCS0Rhdm9nRHlORm5HbitBRmZ4MnYzTW5FdWpxQXloUXdIZ0RtV1dVVHpiOXFkTmNBQUNzTElEc0ZsQkVBUWpSWHpyeEtPdWpxZkpGMFkxUUFxbE5BR1FFZ25zRXpYTklibWV2RXFBQlVwNENpLzRjcHg5TzBPRE44WW5mbDdTdzZNVzRCUWxRSGdOVW5iYTRUWi9CNkh0MFlEUUpWcG9EeEFMQWQwSjBCQURZdVFMWUZRRWFCelNXY1FaQ0t1a0tJN2hvQVlPTUNaS2VBc0Nnakl5UEVHYkd2UU9kbUVCR3pMc0R5UnRCSWxkSkFEUUFZRTRCckJEVzdDQlJpVEFDMk40SUNVM3NCUkl4YWdCQWJKeDlZN1FKczN3c1lYMVN5emdMWXZoZlFaQ3U0Q0FzWFlPTmVRRk5id2VLd3NBQzJwNEM2K3dCRmpQek44U1lMVk1SdTM3NU5uSUZJWmNZcU1qcVZaR0JHQUxFbUMrNFZPN0N3c0NBMVZqSFpDU3hpeEFWd1g1VkxRdVZTdGFrQUVCaHlBWnNXQUR0aFROVEFzeEFybGJJblA1NEM2dDROSkdKRUFHSUEyTmV6ZzI1ODBrUGNPUC90NDhxVFM0SHNMSVZMQ2dpTVNFOU1BZkY4WVB5d3VhR3lUaUUrRWN6azVBTVdNUUR1Tkc0UGlWWXBBRk5QQkV2Q2tBRCszMnI5OGJWSFdTOUgxa1o4cFZMMmRuQXVLU0RRTG9DMERBQS85TSsrK1lNNG9IcWxNcklLV0RMYm1hLzliNC9YQUNZbkoybDhmTHh5SE1ZRDU5NDB1emdrdWlQVm0wRk54d0Q2QlNCWUFQeHd4OGJHS3ExUllROC80b0V3K3VhQTdBd0FrODlsSFFBWWNBR2JGaUFzcmM3T3pySmRFRklaQUFKVHk4QWhSbU9BY05JaEJLNGR2RVd0QUlZWWpRSEV1MzV3Y0pBMk5qYW82SEJvQXhNeGFnRnNiQVNKTEFQdk1iL24wR2dNME5YVlJiWVJmVjZSZVJlZ1ZRRHhHc0RodzRmSk5yZzBnb1RvRlVDc0JpQzd3c2FkK1BNS1RWY0JnVllCMk40S0xyNFhDSEJZQnRmNkw3QzlGWnpUS21DSXNSakF4azVnY1RNb2h4UVFHSXNCYkJNQTh2KzV1Ym42ZWNxcjNiVmpMQWF3U1FDWS9LR2hvZm81OG4vZGo0Skp3MWdNWUVzR2dNZ2ZreTlXQUNkT2xZZ0wyZ1JnV3cwQSt4eEdSMGNycjRPTlR6Nlh1eDlvaTBUaU5RRHgwU2hGQXBVKzNQWGlwSWRnOGpuZC9VQ2JBT0t2aHArWm1TRmJRTnYzbFkvMkI0SGZ5OFFOYlFJUS9iOHRZT0x4NkRkME9ISGMrd0MwQ1FDRmorR1R1Nm5vSUwvSHdQOHZsMkxQVm1nVEFNd2ZSeE5vT3p6dGtrTWJUZ0NXa3lTQTlucStxcU1sa2dRUVdiUGtzbHZIb1lZa0FVUzZGbGJYL2lWSGNVa1N3THg0d20zVHBrTXVtUmJnNXYxbjVDZ3VhUmFnSGdoaW8yUzhqT3NvRG1scDRKZmhBU2FmMDE0OWgxelNCREJGZ2hXQUFKd1ZLQ1pwQXNEa1I2ekE1VnZMNUdndnJ0N0p0dHdkVzN5SHR0MkZZSGpoaFJ1Zjl0REFrZWJmdnVtUVExaVRxYndBYTNrOWRpMzl1eFJHZ3pHemxRQUFtdmNYd2hNc2FkNFo2MlhUMGRxdVNKN0l2RFFrQURBV2pNbndCQTJOc0FST0JHd21NaThmQm1PdUVRR0FjakF1aENld0JKZmUyOGVxdDYwVjJud2k4NEttVEw5UkFZQXlDU0lBYVBCQWp4c1hhMkRwUk9iaElsWG5rNW9SQUlpNGd4RFpRbkFUcVpUNjVJTm1CUUFTUlFEUUFqVnd0SlA2RG15dnZIUVp3RjBnalhRVHFRWGtmYXUxVHd5L2R0MnZuYzlRYkxrL2p3QkFtV0x1d0NHVnJJbGNTZm11YWZJS0FKVEppU0FMYlJPWmwxWUVBQWFEZ2NkN2VWUnMyRTlrWGxvVkFQQ29hZzNPRW44S081RjVrU0dBRUkvMENjRk5wQ1JrQ2lDa094aW5xZW9lK29PeDFTdkIzRVFhUm9VQWt2Qm9NMDd3WTU4T2g4UGhNTUovRU9TQ0ZnQVc4K0lBQUFBQVNVVk9SSzVDWUlJPVwiIiwiZXhwb3J0IGRlZmF1bHQgXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQWNjQUFBQ3BDQVlBQUFCZWRmWXNBQUFCcDJsVVdIUllUVXc2WTI5dExtRmtiMkpsTG5odGNBQUFBQUFBUEQ5NGNHRmphMlYwSUdKbFoybHVQU0x2dTc4aUlHbGtQU0pYTlUwd1RYQkRaV2hwU0hweVpWTjZUbFJqZW10ak9XUWlQejRLUEhnNmVHMXdiV1YwWVNCNGJXeHVjenA0UFNKaFpHOWlaVHB1Y3pwdFpYUmhMeUlnZURwNGJYQjBhejBpV0UxUUlFTnZjbVVnTmk0d0xqQWlQZ29nUEhKa1pqcFNSRVlnZUcxc2JuTTZjbVJtUFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eE9UazVMekF5THpJeUxYSmtaaTF6ZVc1MFlYZ3Ribk1qSWo0S0lDQThjbVJtT2tSbGMyTnlhWEIwYVc5dUlISmtaanBoWW05MWREMGlJZ29nSUNBZ2VHMXNibk02WlhocFpqMGlhSFIwY0RvdkwyNXpMbUZrYjJKbExtTnZiUzlsZUdsbUx6RXVNQzhpQ2lBZ0lHVjRhV1k2VlhObGNrTnZiVzFsYm5ROUlsTmpjbVZsYm5Ob2IzUWlDaUFnSUdWNGFXWTZVR2w0Wld4WlJHbHRaVzV6YVc5dVBTSXhOamtpQ2lBZ0lHVjRhV1k2VUdsNFpXeFlSR2x0Wlc1emFXOXVQU0kwTlRVaUx6NEtJRHd2Y21SbU9sSkVSajRLUEM5NE9uaHRjRzFsZEdFK0Nqdy9lSEJoWTJ0bGRDQmxibVE5SW5JaVB6NGVRckRlQUFBQlhXbERRMUJKUTBNZ1VISnZabWxzWlFBQUtKRjFrRThvZzNFWXh6OWppRTFSbE9Td2xES05abHR5M1NnVVdyUGx6MEc5ZXplalpuNjltK1FtRitVc1J5Zkp5WFVsQnpkWHBTaW5YZVNnWE5RdXJOZnpidGhHbm5wNlBuMTdudC92MnhjYW5KcFNhVHV3bWNrWmthbVFhMmw1eGRYeWpKMW1IQXpScXVsWkZReUhaMldGNzFsZnhYdHMxcndidHQ3eUhyeXMzbHpHQ3FYMlRpNzJUNmIvN3RkVld5S1oxV1YrU0FkMFplVEE1aFVPNytTVXhYdkNYWWFZRWo2eU9GWGhjNHZqRmI0cTcwUWpFOEszd2gzNnVwWVFMZ2g3NGpWNnFvWTMwOXY2bHdmTHZUT1ppUzNJN0pIdVk1NG9QZ0pNTVVlSVVjWVpsQ3pjLzl3RXlqY1RiS0hZeFdDREZPdmtjQkVVUlpFbUtUeERCcDBSUE1JK3ZOSitLK3ZmR1ZhMXcxZVlISk92dXF2YWpQZy8zb0RlcDZyV2Z3b0RjY2o3bFdab1A4bmFpdmJzbXQ5WFlVY2VtbzVOODIwUld0eFFlakROOTd4cGxzNmc4Ukd1aTUreGhHTXFISndXT1FBQVFBQkpSRUZVZUFIdFhRZDhWRlgyUHBPWmRDRDBFcW8wVVJCVVZCRGJXbEFFRlVUc3ZZdXU5ZThxN3Fvb0tGaXdnSzVkZDlIVkZidHJSUkc3Q01nS3dscG8wb1AwaFBSTVp2N251Mi9Pek10a0pwbEozcVNRYzM5NWMzdDUzN2s1M3p2MzNmZWVxMjNyQVg1U3B3Z29Bb3FBSXFBSUtBSkJCSktDSVEwb0FvcUFJcUFJS0FLS2dFRkF5VkVuZ2lLZ0NDZ0Npb0FpRUlhQWttTVlJQnBWQkJRQlJVQVJVQVNVSEhVT0tBS0tnQ0tnQ0NnQ1lRZ29PWVlCb2xGRlFCRlFCQlFCUlVESlVlZUFJcUFJS0FLS2dDSVFob0NTWXhnZ0dsVUVGQUZGUUJGUUJKUWNkUTRvQW9xQUlxQUlLQUpoQ0NnNWhnR2lVVVZBRVZBRUZBRkZRTWxSNTRBaW9BZ29Bb3FBSWhDR2dKSmpHQ0FhVlFRVUFVVkFFVkFFbEJ4MURpZ0Npb0Fpb0Fnb0FtRUlLRG1HQWFKUlJVQVJVQVFVQVVWQXlWSG5nQ0tnQ0NnQ2lvQWlFSWFBa21NWUlCcFZCQlFCUlVBUlVBU1VISFVPS0FLS2dDS2dDQ2dDWVFnb09ZWUJvbEZGUUJGUUJCUUJSVURKVWVlQUlxQUlLQUtLZ0NJUWhvQ1NZeGdnR2xVRUZBRkZRQkZRQkpRY2RRNG9Bb3FBSXFBSUtBSmhDQ2c1aGdHaVVVVkFFVkFFRkFGRlFNbFI1NEFpb0Fnb0FvcEFvMERnc2IvZlE0ODlmay9Vc1NMLzNpbTNSczJQSjBQSk1SNjB0S3dpb0Fnb0FvcEF2U0dRbDd1YnpqcDdkRVNDQkRHZWRkWm94OGJtemtodmY1ZGpyV2xEaW9BaW9BZ29Bb3BBZ2hDWSs5bTMxSzE3WjBPUTNicDFwbzgrbkd0NkVtSjg5ZFYzNmViL20reEk3eDVIV3RGR0ZBRkZRQkZRQkJTQk9rRGcybXR1TjczQWdoUUhpeEhFS0htU1hodGZ5YkUyNkdsZFJVQVJVQVFVZ1RwSFFFaFFDTkpwWXNRSktUbld1VmkxUTBWQUVWQUVGSUhhSWlBRWlYYnM0ZHEySy9WZGJWc1A4RXRFZlVWQUVWQUVGQUZGUUJFZzB0MnFPZ3NVQVVWQUVWQUVGSUV3QkpRY3d3RFJxQ0tnQ0NnQ2lvQWlvT1NvYzBBUlVBUVVBVVZBRVFoRFFNa3hEQkNOS2dLS2dDS2dDQ2dDU280NkJ4UUJSVUFSVUFRVWdUQUVsQnpEQU5Hb0lxQUlLQUtLZ0NLZ3p6bnFIRkFFRklFbWdrQmplV3JOMVVUazBiQlBVOG14WWN0SFI2Y0lLQUsxUnNCUEdTays2dGV4bE5LU2ZiVnVMWkVObEhpVDZOZWNGQ29veGFLZWttUWlzYTZ1YlNYSDZoRFNmRVZBRVdpa0NGaVc0dWhCdTJuQ2lkc29rd215TWJoQ0pzWUhacmVodDM1c0VSaXVrbVI5eUUzdk9kWUg2dHFuSXFBSTFBa0NnN3FVME4ybmJHazB4QWhRWU9WT1BHa3JIZGl0dUU0dzBrNGlJNkRrR0JrWFRWVUVGSUZHallCbE5aNHlLSStTR3FIaDVlSXhqOTUvZDBBQ2plVmVhYU9lTUpVR3IrUllDUkpOVUFRVWdjYU5RSWhNMmpVcmI3U24wcmFaMXpiMjBEblpFaldZUUFTVUhCTUlyamF0Q0NnQzlZZUFuL2tFRmxoamRSZzZ6a0ZkL1NEZ2FkMjZULzMwckwwcUFvcUFJdUE0QXY0QW9ZQlYvSlNjbk1kK2dlTzkxRVdEeWNrWjFMcDFMKzRLTk9rS0VIMGpadnU2QU0zQlBuUzNxb05nYWxPS2dDTFFlQkJZdWJVWjdTeE00UUhYRitINEtTdTlqUHEybDN1TGpRZTdwakJTSmNlbUlHVTlSMFZBRWFpRXdMUHpldEozdjdlcm1GNFg2N0MydGRJaFBiYlJ0TkZMS281Qll3MENBU1hIQmlFR0hZUWlvQWpVR3dKTWlDSGJNUlJLekhpc0c2SG1WcUloeVVUM2w1aXphQXF0ZW9wTEZqZUY4OVJ6VkFRVWdUMEdBZHgvY3pPaHBWSlNVZ1lmTGZob1hxT3pjeGxMVVFqSzhxc3lIdDF1TjkvSFRDYVB4OFY5SnBrREhmdDhQbk40dlg0cUt5dWo4dkxLdTJRdGd4RjkrQzB5bG01ck5IS3RsR2dFMUhKTU5NTGF2aUtnQ0RpTUFEYmRlSmxpdk9RcjU4MDI1VnVaTE5QSTdXNUhIbmZybVBzS0VhTnNkcEdxbFZrck5UV1pVdE5TZ21Rb0pjVlBZdExFNFVrbVNrdFBNVVJaVWx4S0pTVmxVb1RIS0Z0UFhjRmRxSGFiTlZoUUF3MENBU1hIQmlFR0hjU2Vod0FVWVdVbHUrZWRaOE00STcrL21MemU5VXlXTzhqdDZjd1AvcWZGUERETFVyVExLaFNHcFppUmtjcVdZbnlxMHMxV1pVYUdoMUpTdkZSWVdGTEprZ1JSMm00OXhqeFdMVmgzQ01Rbjhib2JsL2FrQ0RSeUJFSUt0cEdmU0tNYXZzOWZRTDZ5NVV4bVhjbWQxTEthc1VOR2RqbFZ0Q0JUVXBJcE16TzltamFxems1TzlsQldsb2Z5QzRxb3JMVE05cGdKOTF6VittM1Z6ZFpiTGl6MjhyS3RUUGE3MlRvdVlPdTlsQkhrSldaWE1yazh6Y2p0NGlWdVR4cyt0OFpQTFkzL0RPcHRtbWpIaW9BaTBEQVJ3SDIvZFVUSnNvd1pmWlFocTlGT2pDNjIrR3BQalBaZW0yVm04Tk9XaFZScUNGSUl1ZnJ4MmR1bzczQkIvbG9xS2x6UFM4djgvR2dLVzlOdUYxK0FKSkdmNzdmeVhWY3E5K2FSMTcrTFhDWHJLRG0xTXk4eFo5ZjNrR3ZWdjVKanJlRFR5b3FBSXRCUUVTZ3IyOENXVGJ4ZjRtQ0Z6MHVwdGJVWUkyR1N5UVJaWHA3UHk3K1ZOK3RFS3Q5UTBwSmNYanB5Y0RKMXlPcEphemUxcEkxYmQ5UEdMYnRvTnk4WEZ4V1ZrSjlQSjRXWkpEa3R5VmlSUHIrUHZLVTVmSjY3S0RXMUo3bVNZbC9pYmlqbmpIRW9PVFlrYWVoWUZBRkZvQUlDNmVuV3NtWlJVVkdGOU5naWZGL1BGOXVYTGV3cm5MakhHSXRyMTc2OUtiWjF5NVpZaXBzeWFIdjM3c0pHYzcvUjd5K2pYajI4TlA2TWc0bkt2TlNqYTBzcTNsMUVPVDl2cEUyOFpMenM5eDMwQTRlWHI5cENtM2ZrOGxKckdXVTFUK2VMQUtMQ290MXNLZjlDelp2djB5Z0pVc2t4NW1tdEJSV0Jwb2ZBNldlTU15LzRmUDMxTit2bDVQZmZmMy9UNzd4NTgyclVQM2EweHVPd0t6V1d6VGY3N2plQWpoOTVvbW42a3c4L29wK1hMb3VwRzdTTkpkdVNrdEtZeWt1aGlWUHU1dVZNNng1cFBQY3FKMDY0UTVxb2tWOVN0Sm5hdCs1RTNaZ1VuMzU1SGgyUzI1NEdkR3BsN3FOMjd0R1dodlZ2VDFlT0hVVEZoZVgwOVpJY21qMS9OZVZzemFWdkZ2NUdlL2ZxUUQyN2RLQjVQNjZodE14K05lcS9QaXNwT2RZbit0cTNJaEJBNE1JTHo2ZWhRNGRXd09PRDl6K2c5ei80MEtUMTZkdVhicnJ4ZW5yNGtlbTBZdm55Q3VVU0ZiR1BDUmJjaXkvK0sxRmRSVzMzcEpOR3NwWGxwNXFTWTlTR28yU2twc1ZtTmZZZk1DRFlRcTgrdldNbVIxUkNIL0dTWTdDek9nM3NaRXZRMmtpVTVDcWpFVU42MGFmL1hVa0RPelNuMG1SK2JNWE5qOUtVdXVsL3Y2Nm5qZHQzVTdmc3RuVGR1QU1wWjBjUkRUdGdMK3FWM1pvZW1qbVhTcjM1NU9abDF1U1VUbzZQL3VqampxWS9IWGNNZlRGbkxuMCs1M05IMjFkeWRCUk9iVXdScUJrQ0lFWllaK3MzYkFnMnNHUDc5bUM0cmdNbmpScEpnd1lOb2lWTGZqSmR3NExic1gxSGtLenJZank0SUdqZDJucHVFZUZFWHhSNFBHNnp3U1RTdVdFSjlZQ0RCbE9MckN5VDNUYXdwSXBJbDY3ZGFOelpaNW4wdk54Yyt2R0hSVlRWVWlzMnNhQXZyemMrcXhZZDNIWGJuYWFmU0Q5MzN6YzVVbklOMDN5ODh6U1ByVnczbGZ1VDZkNW5mNktManUvS2o2V1UwWmUvYk9Sbk9sUHA4OTl5S09lUFlpb285dEdCL1RzVFoxRlpZVEYxYUpkT2YyYXN4dC81SHExYXU1V1hWWlBKVzViREczVGFPYjZMRmNRSUIxL0pzWWFpMW1xS1FFTkhBTVNZYUFLSUZZUEZQLzFFT1BZZk9OQlVlZjMxTnlnOW8zYVBOY1RhdDVRYmR1Z1EyaGk0V0VBNDBkamd6VGZSM0FFSEQ2WjliZGFpdlJ3c3dTN2R1Z2FTMk9mVnowOCsrTWhlcEZJWWZkV0VIQ3MxbEtBRU54WHo0eGtwVEdZK0dqYTRKODE4N1VkYXN6NkgvbnJwbjhoZnRKT0ttZGZmK1hZRm5YL2lBRHJrb0o1OHpqNit2OHU3YjBINGZML3gxOTgyMDhKZjFsUHpGcW5HOHZkamswN1pEclllcmZ1MFRnMGJGcU5Zams2MUtlMm81U2hJcUs4SU5FQUV1blR0UW0xYnQ2RUMyNGFVL2RtaTI3WmpPMjFZSDdJeW5SbzYyaDdDUkpUSnk2aXZ2Ukc2endoaVBHUGNhV1ljOCtmTnA4VkxuSDlaTnM0MUk4MGk0RDU3OXpYTHpMS1VlOEVGNTlINmRSdG9RNEFzQzR1TEhEOS9qeWY2NTIyeldsZ1dZeXc0eDFLMnFyNWk2U1BSWlpLVCtTMCt2alJxMGN4RGcvdGwwYksrdk5PMjdkNUV6WnBUajNZK0tpMXowZlNiaDlNdnEzYlRVLzljU0M3ZW5OTWlneWlyVlFZZGMyaFBXck5wSnovYldVQnBhUjVlbXNXOVVuN2t3NS9QdnJQa0NHdlJhWXRSc0ZWeUZDVFVWd1FhSUFLbm56Nk91bmJwUXUrL2I5MTdSQmozNFdCbFB2THdvNDZPR09SMDVWVlgwUElWSy9nUmlNck96MXM2TXpJeVRKbDdwMHgxakp6YXRHbEQ0N25mem54dWRvZHhMRjVzdmZ0NUtCTzIyUnhrS3dDcjhzbW5ucUh0RGkwLzQxMnBkZVhxc3ErYW5KUFBWOGlXWGhtMWE5dUN1bmJJb0h2L01weTI1UG5KVFhsc05icjRmcU9mRnEvTm94bXZyS1FGMzN4TGw5eDZHNVV6b2U2VnRaenZxU2JUSDlzTEtEZVhuK3NzOFRCQnNnWEtnL0Ewc2xjQ0tUa0dadzdVQVVSWVgwNzdiOHI0NDBYVjJIZ1M3cDU2OG1tekVlZjAwMDh6K2FlZGRpcHQycmlSa082czg3TVNTemQ5MkVrWHk2b1lGNnhVU1gvaWljY3BQWjNOQkljY3lHM2FRNCtZOCt6U3RhdTVyL2xoWUNPU2RDRjlqK0lkb3FOT0dtVXdlSWd2RG1yMmlJZTBHc0liNXhqYUJTcnBvZy84OU1WbmN5a2xOWVgySDN3ZzllN2JoOHZDRXZJWkg2MGhqUG1MTm5BL2N1eVpaOUN2Ly91WmZsNFdlUmRyUXlmSDBqSmVPdVY3aVZuTk15bWQ5eWdWNWhkUWEzNk9NVGUvbUlyOExzcE1jMUhMekJRNmMwUXZhcGRaeU5abE9oM1l4VThadms3a0x5Nm10SXdVT3ZuNEE2aHJ1eXg2ZTg1UzNwUlR4aTlzZC83aVF6Zmt5RnhPcUMvL0NBbnRwSXJHdGY4cXdLbURyUHJGSDhveXBKeERwd3ZsangycTJLa0t5eXBuMHlZVHJ4MHBoTm9QaFN6RkhvcGJvVWlFalhGR1NnK3ZHMCs4bUJYcWxLbjNFM2JJWWpOUTJ6YXRLKzJPbGQyejMzLy9QYzJjK1ZJOHpWZGJGczg1aHZDWHVXQzkveFI1c3NGbTI5YXQxR2Z2dlhtcEVNUUlIRUlFaWE5dDRQb21oUjhINmRxOUszWHIwZDNVazdySWJ5ek83Y1lqTFY3eWxzc2pKeTYrbmVqbmgvcHhGbndoeDQra1pMZDEwVjdaelduRUVjZnltM00ybTN1TnhkNGszc2pqcGVHSDlhQVJSKzVEV2MxUzZLZmxXK2pYTlgvdy9jWjBLdVA3a1U2NlJHN0ljWjdLblR4emJVc1JVQVNNZFFTQ25EOS9Qb20xaEtWSVdGQ0pkaUNBRUdsWXZWVzBzcHdkQVVodjhlSWw1bjZqdkFBQVBTQThaTWdRczN2V09XSUVDWVlJQzRRSFp4RS8wdVhjaFN4TnRza1A0V0lScEZYV3VzQ3hyTXBRMlVESThzd3Z2N2NuMEpjdHNVRUZpNHJLK1FIK1lscisrelphdjNVSE5jL2lseGNVbFBKcitYanNmRUZRemtSWnpoWmtQbHVYQlVYOGpsVTNEeCtmRWNOYUpHL2tNVVNhVms1TGY5NUNhemIrd1lUcDR3MCtzVDBtRXc4UTJKQURKMzQ4ZGFzcjJ3aVhWYTFKVzkySnhaWmZrN1pxVWlmYWFHclNWazNxYVArUkVhZ0psaldwRTdsM1N6RlhWTHpSU3NKU3RFakI2cjgxaytQSUUwY1Fub1dzdWF0OEx1RVc0Ynp2NTRjMWp6cE91Y3I5bytXU2ttSnpIeEhuM0x0UEg5UFpTcjcvaU9YWGdnSnM2bkRHVlR4WFY4QWF0QWpPdWdBSW5XdTc5aDNZOGtuaHh6a080TTZ4QkpzVUtJK3hXREswckVsaVV2SFMrclZyYU5XS2xRUkxNMFRBSVRMMitXQkNoZHBIS3czSm5YZlJtWlNYdTVVdnlKYlIxR2Urby90dk9KeXkybVR5T1RNcCtyeFVVc3Izbi9rZVl4TEhYYnlSQ1hoNStaeFNQQ21jeHcvOXA3WG1SMzljTk9tSlR5aHZkeTQxeTJqT1Zxano1OXRrTnVSWUV6SmNXWVQvQTRYbmgwOHBLUzkrdEh5azI5dVNKUlI3R3NxRXR4T2VqekoySitYRnQrY2hiRSszdDZYOVkwa3EzRXFwaUJmd3MyT0dlTGdUZk1XUGxvOTBlMXYxaTM4QjcrenIzSWtma2c0dTExbjN3T1IvQXI3ZGRjbk9qbksvVGM1YmZIc3RoTzNwNGVkdnYrOW0xZHUrZlJzSDdPV3NjUGg0ck5MNGxmYkZEK1ZZSVh1NnZkMFEvdGgwdEo3dmNXS0g2aUdISEdLK29ZaVhBQ0N0YTVldTRRMkd4ZEUrbkwwZkt5WDhOelRYckw3THlyeGhiOGV4bG85UjdxaGpqcVpzM3JDRUpWWTQ2eDZqaEswK1VRNEV1WFh6Wm5ydnJYZHNaV1Zlb3g5clhMQ3NLdUpxdGRWUWZwTmNHVFRsZ1J0NHVUU2ZsaXhlU2R0ZE9aVHQzVUJ1UHkrYnBub0M5dzk1dnZETHgxMCsvZ0MwcDV5UytiR05YZHZXMDJ2dnorWDh0alR6VFg0T2Nsc3VwYmc5YkhHVzhNdklvejhxMDFETzJ6Nk9CbVU1eW1RVmhXQU5GTE14ZkNKWmt6RTB1ZXo1OGc4bnZweXV2WXpVUjU2VXd4S0tWZGJxWC9LUWFLK0xkS2t2ZGUzNWtpWSt5c1BaeTBoOXBFczU3YjhwNC8vaGh4L1QvZ2Z1VDRNT0dFU2RtZml3SzFRMmJWZ1dpVFZQU2twS2FPMjZkWmc0OU1FSDhpeWRmVzZGNXBNcEZQeXhsNGsyL3l3eXFHNytWMTRTdExkZG0vNnQ1ZE1PSFR0U1I3NVF3TGwreEs5bXczaU9PZllZczdRS1ROTFMwbml6Q042MUtuMkY5MitQQndHb0ZFQzc0akQzOEVKd0s4bmFYSVAvV2FTam5KU0Z4WWpOVTZ0WHJxRDMzLzRQNTd0bzFKaVRxVmVmdnR4VTZPSkNkQm5hdDc3ZEtIbFdXMlZsdUpjWDZoL2xHcEw3NFAyRmRNN2xZNmhGODVZMDhLRDlxS3hrYjlxOWJpa2w1NjJnRlA2SU05djNadlJKcWVtVXhJOXhiTmxaUW85UCs1cGF0RnhOS3pkNXFYbjZPbjdYYWluTERJU1laSlpVZlg3ZXhDVWljK2hrbTlDR0hHdFNXeFBMUHNHQnFIMGlXUWhqd2xvS05aU1B5VzJsWVZJakxIbWhxMENyTGFzTmhLV08rS2hqdFMxOVNoc2lVYXV1OXEvNE96WC9Qdjk4THMyZE81ZnduQ0VlcDRBQ0ZoSUNJVWc0aFpmMnZwajdCUzNoQi9TZG4zK1c0Z1l4RnhZV0dxVnV6ZmpRL01lT1ZsSDh6dmRQMUplWFVmRlZqQjkvWEV4dnZ2a1c3ZURuT2FGUnY1Ky9nTWJ4YzVZREIrN0hiNlRwU2xobWpkNi85WCtMLytlcUhHUm5sVUZCRjFzM1pieGs2T1BIRkt4bFFqL2ZVNE5EdWR5OFhaVHQ3MkxrZ3ZOZnZPaEh6ckYwQjhJOWUvY0p0TVZsYzNlWnNTSGYwaVZXRzlaNFhkeEhPUk94RUxEcEl1YWZ1NlpPQ3VJZmM2VWFGTVRMMFcrODRpNDY2ZFRENk5BamhwaWR1dDdtZzZrZ293OGw4MDdXWlA0QTEvclpYOUNHaitmd0czQ2EwU3IraHNYWHk3YlFmb1BUYVhEZlhQckhHOFhtdnFTTDU0dTNOSTA4R2J3cXd2Y2tuWGFKM0pCVDc1YWpUQmlBSnVRa2t6NlVaMDNDRUxDaFdTK1QyMUpTVmduN1B3WGFDS1FHcTB1ZFlJSUppQUt3aUJGSktHZjlBMGtiVWlNVWw3YTBmOEhHd2sxaWlyL01GZkVGbjFEY3dzcWFmMTI2ZERZS0dHa3kvMEdVOW5oMmRxZmdRL2hPenI4TjY5ZXpSVlpNRHp4d24ra1BQM0toYU84L1B6K2ZIKzFZYjhvNDJUK2ZNYitGSjhNOHBnTHloNVAvUDl4dmZQcnBaMmdRUDFyU2hsOHB0OExxMlB5UG9sNzQvMThnMjdRUjdjZWFteUFwM0dlMDVGSlNYRUx1akxSQUZjakkwZ2MvTGx4a3ZsdVlsZFhTeUtXRWNiS2NuNHI1M3VpbUFCNjVlYm4wMWR6UE9jdVNyOVVIMmdnVVo2K1krN0R5V2E4RnlvVnk3U0ZiSlh0eUhZVlhyY3lsajk2ZFMyZWVkUlFsOFFrVUZKZFJTWGttMzFOdHdYNFNkUnpWbTN6OFNhcHRDK2RUQ3o0bTc5K0xldDV4SzYxY3M1bkdwaXloNWIrdW9yVXJkMUgvZ1R0by9zSldDUmwxSXQrUTQrcldkYTg2bG9CMEIyVVFjcUlJck1ray94U2gvRWdobWREaTI4dEVTclBuSXl6LytGSlcvUEJ5MGVKU1hueDd1VWhwOW55RXRYK3gwQzNGRkF0bWRneWx2UGlSOHV4cDRXSEZ2ekwrc0F6eHlJaGdZOGNNYVhBZ1JteVdFZHpGcjFqV2txazlMVHdzZlVoOThjUExSWXRMZWZGRDVTd2RBMEo2ZU94dU9yeFhZU2pMRnBydzNpRDY3dmQybkdLUkk0Z1FybG16ZEw1bmxteUlpMjkybURUN0R3ak5Ta2NlK2dLTzhtZ0hpRm9lQWhCZGg5cFdXUzgvN3dlclROd2gzYmJTZzZOaGhWWjI4OWUyb1Z2K001Z3pVRmR1dTFRZVQrV2F6cVgwMktzOS9lT2w2L2dySENuV2g0MTVIUG41WHI0WDZhVlY2MHI1L21NeXRXdmZnbkw1WlEzYlAvK2N5dGI4UWdQR24wZTlocDlHdTNMWDBuZGYzRUl6WmhUVG1uWE9QUmZyM05sVjNWSTlXSTRoNFFvUnloRHRjVXhzK2VlUi9IQmZyc2JFdCtkSFNyUG5JeXo5U1ZueHc4dEZpMHQ1OGUzbElxWFo4eEhXL2kzbElWaUpINDVUdExpVUY5OWVMbEthUFI5aHhiOHkvaUE5TEZuRzRnUmo4ZTExSXFYWjh4Rk9QUDVNS09aRHV5RXlzby9CNmg4WXlCSW53aTRtL2hKK1NiWUhkQlFjbytnaWM0RmdGZU04MUlPVDVWUE9NT3JOc2dndEFyVkt5RzlSRWU3WG9SQ1hZWkRRVkhSbmxRczBHcjFZQW5QVy9MNkZMcm5nTVg0RzlXemFwMzlYakpyZmw1cEdMVnY0YUdjQjBWZHZmMDNISHV5aTVlWDdVT2J3RTZtai94aWlicjFwOGZMdmFPUFN1K2p4SjlJYkpURUMwam9peDhCc0Nnb1JFOE9LeUtRTFp0a0M4czlqUzlLZ0lxQUlLQUl4SVpDY3pCWXdyWWxlMXVnZys4VTYweEJIeTh2NTJiMzhRc3JNeEh0ZXJYd2hRdEZiNGJvcFNIUGNKajhKYVBvMHR5eURlbzc0TVpRaXZ0ZG9mWWxEaURuVWU2UmhvcktVQ0RRVWpFY3FuNWkwMzFmL1FXZWYrU2hkZS8xSXV2Q1NQM0VuZU5ZeGlmcjNhVTQ5cng5RjNxMHJhZU5ybStubEoxK2lkaDNLZVFOUEgycmJZaEg5YTFiYnhBeW9qbHF0STNLMHprWW1GQ1lnbkxVY0lrSzMwbUw5UlZ2bUtzNVVzRThpYWNHZVpvV3RPc2lYQ1lld3ZSemk0dXpwOXJDVnIvMHIvanIvNVArbzh2OUh4ZjhySzcvdS92LzQzWitlenJ3TVdNM0x3bm40RnVsWnk2cWlsekRPMGxMKy9oSTdFR1RGczBNTTlVTHozK1JieVp3RFRIQUVFemdNWXVUM2pKbzJUV21UWmd5RHNISW1vOUlQNnNoU2JhWE1Pa3Q0YlBxSDlOTE1MMm5VcUVObzZHRjlxVStmTHRTK1F4YWxadTlOWThaMm9EVXJodENYczcrbW5JOSs1N05xM01RSVVCTk1qaklSNU42RzljK0VpUldyQzAxQ3E0N1VOTVRLSWpEVDBDUktEcmNjbkp0V1dwQ0VyZTdOeEViL2x0V0tBSmV6VmJmeThDdi9CSllmYXBjenVDMXpIbUY5bVVwaGFkcS9EYXNBcHNCcHo4WS9OS0ZVL25VbmZ6eWY1L1prODZNRGFZYjRRbEl3LzVrVmYwd21mdkRHR3BBZHNrRkNTSE9aaC9tOTVmbVV5UnQwc0lQV0ZCRGR4WVd0LzMrakNMaUdWUWQxNWFMSnp6dGZzWmtLUzZteXFRcnRXdnBQeXFQUGFFNFVTZjBUbzR4dzE2NENldm5sejgwaGFSWDg1THI5ckZtRnZoMk9KSmdjeld3ems4R2FNS0hsVkp5SHpMT0s1MVN4akZVT0U2bWlreFR4SytTR0pRYjc0WFI3bGpWSnVhWTlNZENRVmNmS3NOY1A5aU4xeEE5bVZHN1BYdDllWFBzUG9HRUhaWS9CMzVyN09CMlZ2d2kxNHIrYWsvUGZ4V1RvZHJkaGF4RzdTUTNxZ1U2amUxaitOR1BnaStQUS9VR2tjUjNEU3o3eWxidjREUzhGbEpyaU1ZOHplSmdrVGI2NTMyanVTZ1k2c0loTStpNW5zaTB0S2VWbk5TMExWUFJmYURRZ1NibG5HVXF0RUFvT0JLbnlUeEthVnhYS2FzUnhCQkpNanBaQWcxZk9FWWFQeVlrRDcrc0x6VW9VbE1sZ1ZaTDVLamxtS2txUndIeVJhU05sSmR0cXdkWWtGNnhVTmxESm5pNzFrQmJlcGttVERnS1Y3SFdsanJSaGZGdjVTbVcxZnlNVU95NkNuV0FwUHRKTjJJYW5wTUVQUUJrMmd3SVpnWUwyZm9KdGNjQ2VqcUp3SnQvbUI5TzBmMEFSQk0yT25XQm1GUWo4MnZDcVZEWWdOSHU2MUpXMnhFZUhTZGdSNnVkUElmR0dtNlNrVEk1bkd2WGhMZWRITEtCVElIMzQ1alZ0MGxKRnY5eFh4dmNBK1dVQ3BxMkF4UmR4QVB6U2JYNm5hRUdoaXdrNHlieEZCODlDUXErNThNSjRidFpuK3VKWHEvRXIwc3A0UnlydVc4SkpjeWJDVm1sU0VyOS9sRjlBYXBFbGNnVVVxMFNGWDFNNUFJekpxTmhhaGJJYWNSd0JUMXJxL2c0MUdoSXl6eE16Y2VCYndnK2ZCRlpadkY4d2hkOUZlOVdWWjlGRmw1eEtMVnBrT2pRV2JVWVJVQVNhR2dMQkMrM0FjaWFXTWd0bW4wUGVkYk1qUXZINDQzK2oxTDFHbWpjUjRVVUxPR1JKTkdLRldpYm01UlhRekgrOFE4OCtPNHN0U2lqSjZoNktGektFdnJUclVBbExmaTBIcHRVaklsQkx5OUVpT1V0d0lqQVFvOXhqeE1WYktOMGFBU3hGaEt6UG44eWJQMHRKTWFKb05GRVJVQVFTaVVCNXp0ZjhuY0hkUmw5Qlo0RWNFK253SXJYTFRuRFIyWWVQcGluM1BzMXZrQ0hxMVRhZUY2bmJ5ZEFlVHVTb20yN2J0U1JIQUdjblB3bUQvVUNDOXJnRnNsbmo1NkNQbHpTdXZQSWNKVVlMRnYxVkJCU0JPa2JBKy9PelpEMVlVY2NkYzNlM0hSdERuMWlxWlZXSzVWdEx6OXI5R09wcmtWb2hVSXRMSlJDZ2tack5GNnRReG1STVJGcytCRzNWOGZuTGVTbDFyQlJVWHhGUUJCUUJSY0NPUUVDOVdnWUZkS3ZvVS9nU3RsZlFzSk1JZURyeVoxaHE2aUFzNjZJbXNJektEVmtpQ3dnT1Z6NmNaaTJ6Qm5hR0dZdlN6MnZ1K1dvMTFoUjRyYWNJS0FKN1BBSXBxV25Vb1hNMmIvcmhUVHg4dG1aSExaWitBK2FrMGI4QlkyT1BCNk1lVHREejVkd1pjWGNMb2RnRkEvTER6Vy81ZWdDK0lJQkQ0bmpidllTUmpycnJBeS9xamJ0enJhQUlLQUtLUURVSVFDZVp3OVA0M3VrcHB6YjRrSUgwOGQrbW1XY3NvVFB4cVM3NDBLWGgrbGZxcU84Y0FyVllWaFdMa0w4QXphOUVFb0lFK2VHQldSR2drQ1R5eGFGODZLRllTVlZmRVZBRUZBRm5FWEIzUHNyWkJ1dXd0YVNPUnhnalEzU3FHQ0F5Qk9oVWtLUzZ4Q0JRWTNJVW9ZQUVjY0NKRC9KRFBvUUtoekFFaXdOaE9VeW0vaWdDaW9BaTRDQUN4bUlNV0k0cGZjNGlkNWRZZHI4NE9BQUhtbkl4TVNiMVB0dm9WT2hWT1NjeEtxQkQ0VVRuT3RDbE5oR0dRSTEycTBKUXNBNUZVSWpEaVpVSUh3UXBRaFd5dEpjVDRZYU5SNk9LZ0NLZ0NOUVlBZWdZMFMwSUozbFNLT1A0bDZsMDFkdFVudk1kK2NvaWY2R2p4aDNXb3VLdVhic29QZDM2ZURUR2FzYWJuRUd1OW9kUWFwOXh2RFNIRndhRXpnZGRtZGZZQlh6b1gxTW5ZSnpVWWloYU5RSUNjWk1qSmg3SVQ0UXBiWW9RSlIzRWlMSTRFRVlkQ0JNSDRrS3NVbDk5UlVBUlVBU2NRRUIwa1BoSjdtUks2VDJPZkQzSEJuVVMraEVTZGFMUG1yU1JzMlFKZGU3YzJYdzdFanJSNC9HWU4rMmtwT0ROUDVacXhqa2dEejRjOUtqb1ZEay94Q1cvSnVQUU9wRVJpSnNjUlZob0RtRVJsZ2hNU0ZBSVVTeElFU0I4T1NJUFNWTVZBVVZBRVlnZkFlZ2o2Qlk0dTU2U3VPUkxHVk13eHAvcE01Nmd3c0lpdXY2NnF5a2pvK0xMdFpHTy9Nek1ETHJ1MnZFeHRtaFpnYkFFUVlyaThKRmxwR0dNNGtPbll1eUk0NUM0L1h3UVZ1Y3NBbkhmY3hReUZNRWdIaTVFRUNPRUt3SkRHSWNJMWRsVDBOWVVBVVZBRVFnaEFMMGpCM1NSSEVJdUlDTUp4K29YRnhmVDh1WEw2ZjRISHFMaTRwSmdmWVNSaGp4OEtEclc5bEJPeGdpOWlESGFTUkpuZ3pTVUFXRktIQ3R1b2x0RnA2S2NPdWNSaUJ0VkNBc09Bb1dEWUNBa0NjdHlLZEp3WUJKSVdSRXM0bExIVk5RZlJVQVJVQVFjUUVEMGt4QVBmT2lvZUVnclV0bWJicnlPdW5mdnpvK2diUWdTcEJBajBwQ0hNcEhxUmt2RHVFQjhJRVVoT0xPa0dpQkVxUWRZRUliZWxQTVRuU3IxSElCT213aER3TVVrVmFPOXdDSWN0QWVCZ2ZnZ1FDeWp3c2ttSENGQ2UzcHBhU2x0M0xpUkRqbmtFRk5XZnhRQlJVQVJjQklCVVd2Ui9KcjBoUThXVDc3blBscTNiajJUWVZmVHhOcTE2NmxidDY1MHgrMFR6TEpxUE8zT256K2ZldlRvWWZTbkVDSElFam9UUHZRcTB1RVF4N21BREhHSS9rVVpJY3g0K3RheTFTTVF0K1VvWkNkWExJakxFVzRaUW1oU1hxNThFRWU2MUs5K2lGcENFVkFFRklINEVCRENnQy82Um53aG1Iajk1czJiMGNRNy84ckUySTFBaWpnUVJocnk0bTFQZENCMEk4THdvVU5oUFNJY2ZnNUFRSFF0eWlOZjlHdDg2R2pwV0JBSTNRbU9wVFNYRVlISVJFTTFoSEZWZ3dQQ0VzRWhEMHNHZUVNT2hHNG5ScVNwVXdRVUFVVWdVUWhBTDhHSjlTangydlJuNmIyUXRaYVVGTHEvR1crNzBKT2lOMUVYK2xFSUVuSFJvL0NoTDZGTDRZUVFoVlNkT0MvVHNQNVVRQ0J1eTlHYUhKWnBMNVlpbGt4RlFCQ1lFQ1R5SVZSTUFMa1NRaGpsSVhCMWlvQWlvQWdrR2dIb0ppY083RXFkZk05VVdyTm1uYkVZWVRVaWpEVGt4ZHNIOUNNY2RDSDBveHlJSTA5MHBCZ1YwcjZVRjVLVWRoS05ZMU5yUDI2R2dpRGtTa3dFaXlzYUNFb2NoQWNDRkVLRVVGRVBQaHpxUzFqcXFLOElLQUtLUUVORkFQY2JKMDJlRWlSR0xLWEtFaXNJRW5rb0U0K0REb1NPaExPdnJvbHhZZGVUS0FjZEdrbi9TaHZ4OUsxbHEwY2dibktFSU9US0JzSzFreUtFaVFOcHlFTllCSWM2a3E3RVdMMWd0SVFpb0FnMEhBU21QZlJvQldMRU00MDQ3QVE1N2FIcGNRMFkrbEhJRHZvUkI1eVFKdlFsOHVGRWQ0citsZFU2cEt0TERBSnhreU9HQWFGQ2tCQWlEZ2dRdnFSQmdDZ0RKOEtWU1lCME9Vd0IvVkVFRkFGRm9JRWprSkdSUWZ2dTI4K1FJVWhSbkJBazhzSmZEaUJsb3ZuUW1kQ0Y0a3M1SVVYb1VhektJUitIT05RUlhZdDBKVWhCeGxrLzdrYzVRSElpR0NGRkRBa0NFeUtVc0Z6dDRORU5DV1A1QUhGOHNtcllzR0hPbmswamEyM2V2SG0wWWNOR092MTBmbytpT2tWQUVXaFNDSHo3N2JmOEdFZzNTazFOTlRwVlZ0bXdXeFU2RkhHUUgvUXR3a0tDQ0NOTmRLcWRPSnNVZ0FrKzJiaDNxMElvY0JDZU9BZ0pjZVNKdVkrNC9hb0dlYkt1anJDMEkyM1UxTC80NGt0cDd0elBJMVpmdTNaMXhQVHd4TVdMbDFCZVhoNGRlZVFSNFZrSmpULzg4S08wWU1GQ0dqTm1kUEF0R0FudFVCdFhCQlNCQm9NQW5sMkVFLzBKblNscFNCZjlhU2RHMFp0Q2xGSmYwaEZYNXd3Q2NaT2pDQXpkSXd5aHlCVU0waENIa0xFY0VHNWxRc2hJdzJFWEx1clYxUGw4Zm5QMWRlNjVaMWRvd3UyTy9kVCs5YStYQ1FRNVo4N3NDbTBrT25MLy9WTnB4NDZkRmY0aEV0Mm50cThJS0FJTkF3RXhKREFhNkUwaFJoZ1I4dGlHRUNQeW9XOUZoMG9kcEVIZnFuTWVnZGdaSk5BM0JBRkJ3UW5KSVc2LytrRVpITWlIOE9CUUJrSzNDOWxrT1BDejExNDk2S3Fycm5TZ3BjaE40RnprUENLWHFINEhicVEyZXZic1Nmd1gwVVVxSDE2d3VqTFY1WWUzcDNGRlFCR29Pd1JFaitML0ZBNzZFdVFuYjhPUmRCQ2xoRkZHZEtnWUdOSk8zWTI4YWZRVTk0WWNDQWtDRW1FQkpyRWNRU0J5SllOOGhFV0FFcGMwU1U4MHpGOTk5VFVkZmZTeE5IdjJKOEd1WnMxNnphVDkvdnNhT3ZQTWMrajExOStnRlN0V21MUm5uMzB1V082Zi81eEpwNXd5aG5yMDZFV1hYbm81TFZ6NFF6RHZrMDgrTmVYbnpQbU1SbzA2eFpTQnYyVEpUOEV5ZUZueGxDbjMwZENodzB6KzZhZWZhU3hVS1RCOStneTY0b3FLYi9GLy92a1hlSm4xTkZQKzdMUFBwYmZmZmtlS1UwN09adFBuTysrOFMrZWRkNEVwZzdiZmV1dnRZQmtFWG4xMUZoMTMzQWttSDM1NGZvWENHbEVFRklGNlFRQTZVS3hIRUJ4MEpId3hLa1Jub2h6QzRpTWZZWEgyc0tTcFgzc0U0aVpIdVdwQjE3aktFUjhDZzRPZ1VBWjVRcFltZzM4Z1lFd0crRTQ2OUJsK1NCKzRqOWluVDErNjhjYi9vNTA3ZDVwM3V0NXl5d1E2K2VTVGFhKzlldEMxMTE3RDVEV1VPblhxU0xmZi9qZjYwNStPTWtONzZxbW5hZUxFdSttb280Nml4eCtmd2VNdXAzSGp6cURmZmx0dTh2UHo4Mm4xNnQvcDdyc24wNFVYWGtCMzNuazdiZCsrelpDaEtjQS9qend5bmJCa2UrdXR0OURNbWY4d0h6WWRQZnBVUWwyNHJWdTNtdkdZQ1AvTW1QRVlUWnAwRDQ5bkNEMzU1TitwYTlldWRNTU5OeEhJRUs2c3JOVDBlZjMxTjlKaGh3MmpoeCtlUmgwN2RqTG5WbGhvUFdPRis2KzMzbm9ialI1OU1zMmE5WXE1ajRweng3MU5kWXFBSXRCd0VJQkZDRDBwaElnNDlCaDBGM1Fubk9neHhLV3M1S0VlblBnbW9qK09JUkQzc3FyMERBSFpMVWdJRG5FSUNnSVZzaFJCd3NlQkNZQThTWmYyYXVOLy9mVTNUSFM5S3pSeHdna24wRFBQUEduUzdyOS9DaDE3N1BHR2VIQ1BiOUNnZ1hUZGRYODJlWWNmZnBnaG4rM2J0M09aWTB3YWlIRHExUHZwK3V1dm81dHV1c0drSFgvOGNDYktvOW5LZk4yUXFFbmtud2NmaEdVNDFFU3hISExISFJOcHk1WXQxTDU5ZTJNbDl1N2R5eEN4eCtQbUY2MGZUQ3RYcmdwZVZFZ2I4TkhuUXc4OVFsZGVlUVZObUhDTHlSbzU4a1JENkxBd3NXbEhITVkwZnZ4VkpycnZ2dnZRaUJHajZNc3Z2NklUVHh4Qnk1WXRNK25ubm5zdXRXN2Rpb1lNR1VKang0NmhEaDA2U0hYMUZRRkZvQUVnSUlZQzlLRVFJL1Nua0ozb1NneFY5S3JkdHhPcDFHa0FwN1hIRENGdWNwU3JHdmdpS0VsREhJTEdJV2tJUTRoQ2hnakRpZThFa3Z2czA2OENZYUhOTm0xYUI1dHUxYW9WUGZiWWREcm5uUE5NMmhkZnpBM2U4QTRXc2dWV3JWcGxZczg5OXp4dDJyUXBtSU5semM4K20xdWhyLzc5K3dmekJ3NGNhTUovL0dHUjQ3aHhZK25tbTIraHd3OC9nbzQvL25nNjRvakRtV0NQTkM4V0RsWUtCRmF1WEdsQzRUdG1qem5tYU1JU3JsaWJLQVJ5Rjlldlh6OFRsSEVPSHo3Y2tPemhoeC9KUzZ2SGN0K0gwZkRoeHhFd1VLY0lLQUlOQndIb1NGbGh3NmlnRTZGRFJZOGlEV0hvVGxsK1JSaUhsRVViNmhLRFFOemtDTUZBSUNBOUNCWU9jVG5DaFNseHFRTmZCT3pVS2NGS0F3bFU1VnEyekFwbXU5MVZyeWJqT1V5NGd3OCttR0Q1aVR2Ly9ITnB3SUFCRWpVK3J1N0V3VHEwT3p5L3VQLytnK2pqajJjVDduM09uUGtpTC9IMm9UZmZmSTJ5c2tMalFSMnYxM29SdTcwOXBFc2MveHppUEI1ckN6aml3Tkx1Y0tHd2FORUMrdWlqMllUbnFQN3lsMXY1VFI2WnZNVDZiOXB2djRwanQ5ZlRzQ0tnQ05RdEFtSVpDa0hLYmxVUW4raEkrSWlMcnBYL2QraGY2Rlk0MGFsMU8vbzl2N2VRWm8veFhDRUlPQWhXaElnNHdwS0hPSVFvQ2gyQ2xlM0pLQ2N2QlVDNXVuRDRRdmVmLzN3ZG5YVFNLSDRGMUZwemoyN1dyRmY1SEVKa1ZsSlNFaHhLMzc1OVRCaUVlL25sbHdiVFlUbkc0elpzMk1EM0JEdnlmYzAvbXdQM0EvRmM1dno1QzlpU0hGNmhxYjU5KzVyNHdvVUx6VDFIeWZ6Kysvbm1VWldXTFZ1YVp6RWxQWnFQKzVqQUhrU09BMHU4Qng4OGxKZU8zMUZ5akFhYXBpc0M5WUNBRUIxOGtCMTg2RXJvVWVoWGhLRkQ1YVVBSUVNaFF1UkwySzUzNitFMDl0Z3U0eVpIQ0JEQ0FNbUpneEJGa0VqSElZS0cwTVhLaEtCUkYwSkdlYWZjcGswNVp1blIzaDdhbDN1SUR6NzRFR0dwODQwM1hxUE5temZUeUpFbjA3UFBQaHU4YndkckN6dFdjV0NqUzNaMnRpR1dlKzY1bHpmUnBCbnJEN3RRLy9yWDI4MDlTTnlMck03aFBDKzY2RklDNlU2YjlvQzU1d2RMRGs2STBONEcvZ0d3c1dmYXRJZU5WWW5sMm0rKytZYkgvQ2JmeDd6ZFhyVEtNRFlTUGZmY0MyWVpHVmJyb2tYL05lVmwrYlhLeXBxcENDZ0NkWVlBREFZNDZBcFlqZlpWTnRHallvU2dIUFFvNG5ESUY4dFJmSk9oUDQ0aEVEYzVRcEJ3RUloWWhqSWFJVVFJRGs1OHBBdEp3bmZTNFh0cUsxYXNZQXV2OG5PT2VFUE9kOS9ObytlZmY0RWVmZlJodmcvWnhoeFhYMzBWM1hmZkEveFl4TkhVcjkvZXhxTDg1cHR2emYxQmJIVEJocGk3N3JxTENkekRPMElmNVYybzI4MlFrWGZOTmRlWU1NNHAzTm5URUg3aWljY0pPMlBQT09Nc1V4UTdZckVMdFVlUDdoSGJ1UFBPTzh6a2YvVFJHYVpQbEwvbGxyL1FaWmRkRXJGOGVQK0lYM2ZkdGJ3TGRodGJxdGViYkN5cDNuREQ5WFRxcWFkR0txNXBpb0FpVUU4SUNOR0pMa1VjWVRFY29FT2dRMEdjOEpFUC9ZdDBsQkZkaXJnU3BQTkNyUEc3VlVWSUVBeUVCT0VoRFFmaUlsaUVrWVo4a0NsOExLdGl5ZkhRUXc5MS9veHEwU0oyalBMcEJDY25tc0xZZCt6WXdkWmNTNTZjTmJOMnNheUxjdzYvenhodHFPaHoxNjVkdGRwRWczUEp6ZDNGTzFaYkcxbEU2MHZURlFGRm9INFErTzY3NzZoTGx5NlVscFptL2tlaE0wR0FJRDZFaFJRbExxTkVIRG9DUGh6Q0tLL09XUVRpdGh4RkNQQkJkSEFJNHhBaFFhaFlNa0Fhcm1qa0NrZXVrRkN1SVY3cFJDSS9uQU1zenRxNDlQUjA4NHhqckcyZ3o5cnVMc1c1MUhiY3NZNVh5eWtDaWtEOENPRC9IQWVNQnBBaURra1QvWWk0T0tSQmQ4SWhYZlN2bEpWeTZqdURRTlhiTmlQMEljS0NMeVFuUWhLekgzRVJJbnlRb3h5STJ3VWJvUXROVWdRVUFVVmdqMGZBcmpmRkdzUkppNjYwNjFIb1REbFFSb2dTdnJTRGRIWE9JUkEzT2FKckVCd0VJbVFvZ3JMZmd4VHlSSG5rNDhBRWtLVUF4TlVwQW9xQUl0Q1VFWUFlQkJtSzdvUnVSWnFkQ0lVazdXVlFSd2hWZFdsaVpsQ05HUW9DZ2JBZ1RIRWlVQWhUQklaOElVUUlGSGx5U0QzMUZRRkZRQkZvYWdoQVgwSVhRaitLN29RUEo0WUh3cmhOQlNjNkZXSFVnVDYxNjEra3EzTU9nUnFSb3dnVndoS2hZa2gyNFVGd2tpY1AxZHNGYnkvcjNPbG9TNHFBSXFBSU5DNEVRSkNpVXlVTXcwT0lFejcwcWVoTWxKVzQ2TlRHZGNhTlk3UnhrNk5kR0JBV3Jsd2dTQkVZNHJqcUVXc1JjWlREZ1RKU0RnSlhwd2dvQW9wQVUwZEFkQ1IwSThMUWphSXpFY1lobGlMU3hVbDVFS1U2NXhFSUlSMWoyMEpxRUNJY2hDWUNFMStXVzFFV0FvUVRJVXZjSk9xUElxQUlLQUpORkFIUmhmQkZyNG8rdGV0TGV6a2hRdEcvUXFKTkZNS0VubmJjNUFoaFFGZ1FJa2hRaENVQ2xud3greEdISUhHSUlCRVdnU2YwN0xSeFJVQVJVQVFhS0FLaUEwR0VRbllZS25RblZ0L0UyZk9nZDBYL29weVFxcFJWM3prRTRpWkhDRXFFQWlHSmdNWEgwRUNDRUNMSzRoQ0JRcEFnVk1SVnFNNEpVVnRTQkJTQnhvZUFrSjdvUitoUTZGYlJuYUpmeGNjWlFtOUcwcitONyt3Yi9vampKa2NJU3F4RENCRU9Rb2JReEVxVWU1RElRMWdjOHRVcEFvcUFJcUFJaEJBUXZTZzZGRGxpUEFnUlNoeGxjWWdlUmxraFdZVFZPWWRBM0d3RklVRVlFQTdDT09SS0IyRzcwQkRHSVU3cWhhZEx2dnFLZ0NLZ0NEUWxCS0FUOFRZeCtLSkhFUlpkQ2l6a3NRNlFJc2dTK1FoTE9ZVFZPWTlBM0tnSzJVRjRjQ0lrQ1VONGNCQWNIQVF1WmNWSG51U2JRdnFqQ0NnQ2lrQVRRd0M2RlBvUk9oUmg2RTdSbHlCRXBJdCtSVHJ5UmYrS25rVyt1c1FnRURleUVJNElSQWhPQkNiQ0ZJRUtDVW9jQW9hekN6a3hwNld0S2dLS2dDTFFzQkVRZ2hNOUtYb1VvNFloZ1h6a1NUbWtvNHpvVWRHL1NGZm5QQUp4a3lPRUJxR0E4Q0FveENWTmhDaHh5VWQ1Q0JTKzFFVjlkWXFBSXFBSU5GVUVvQjlGSHlLTUEzczB4R29VWENRUHZ1aGI2Rk9Kb3cxMXppTVEyaThjWTlzaUVQaENjQWdMOFVGNGNKSUdJV0pOSGNRcDVJazhXV2VQc1ZzdHBnZ29Bb3JBSG9VQTlDQjBvdWhSaEtFdlpVYy8wb1U4b1MvbDhRNHhQbEFXWmRDT091Y1JpTnQ4Z3lBZ0VCd1FJZ1FGd2NHSklKR0dmUGdvZzNRUkpNckpKRUJZblNLZ0NDZ0NUUkVCTVJhZ0swVS9pbTYxa3liMEtQU3UvVUE1bExIcjJLYUlZU0xQT1c3TDBTNVFEQXhDZ3RCQWduQWdRamk4VHhWNWlPTVFrb1F3cFEyRTFTa0Npb0FpMEZRUmdPNkVIaXdwS2Ftd0sxWElEL25RbjdBYXhRaEJIaHpTUmY5S0hEN3FxS3M5QW5HVG93aEdDQTZraHpTZmoyOGU0MkNCSWMvNHpIMHNXdktWODRlUGVheGxaYVVtbmFjRGwyV3JrOVBWS1FLS2dDTFFGQkdBL2l2M2xySnV0RmJhZUUwdW9DdjVmbUtTaDd4bEpRWVdzOVRxdDNhcUd2M0xPcmEwcE5RUXB0Y1hldUVLU0ZISVZBbXk5alBLeFNRVzE5MWNGQmVMRCtIU0xZdXA0TnZieUx0NVBtK3hVcktydlVpMEJVVkFFVkFFWWtQQWxkeU1VdllhU2MwT3Y1L2NHZTJDUzYrb3JRUVpHNGJSU3NWRmppQkRXSVVDZXNuMjVaVDM1bEhrTDkwZHJYMU5Wd1FVQVVWQUVVZ3dBcDQyKzFHck03NGtsenRGQ2RJaHJKTnl6am1iY0d5KzZBSXErZkcvbFpyZCtkQTArdU9xSzhnZnVLY29aanRJc3ZpbnA1UVlLeUdtQ1lxQUlxQUkxQzBDM3UxTHFYajFoK2EyRll3WUhPcHFoNERIWDFJY2FJSEJEQVBVdTI0ZEZYNDJoMXo4SldvL2I3QnhwYWVicXhJUW85bFlzMnRGN1hyWDJvcUFJcUFJS0FLT0lPRGQrWnZSeS9aTk9vNDAzRVFiOFdTLytYYlVVOC8vNEgyVGwzN0VFWVlZY1RVQ1VvVDFpTU9YbnhlMXJtWW9Bb3FBSXFBSTFCMEMyT1FvRmlOOFdlV0RyeTUrQkpKS2xpMmw4czJiSzlYMEZ4Y2JxeEVabWFOT0R1WURkT3hRQlVsNi8vZ2ptSzRCUlVBUlVBUVVnZnBEQUxwWkRvd0NZWFUxUjhDejdaYS9tTnBwZ3dkVG0wbjNZSXVUaVJkK1BwZjhoWVdVM0xNWHBleXpEM2x6Y2lpcFE0ZWcxVmo4ODgva3o4OG5Tb3ZTdVF2UDRsUytZckVMVEs5b29tQ255WXFBSXJESEl5QzZNQzQ5Nk1lejRWV1RuclM3eHdPWTRCUDBwQTBaU2lXTGZxRGlSWXVvWVBiSGxEbmlSTk5sd1FjZkdEL3pwSk9vNk91dmFQdlVLWlIxM2ZXVWZ0eHdjMFdTLzg3YkxLTG9RdkllOWdMNTJ4MXEycEFYQklpUEIxNXptR3dQT3VpZ0JKK2VOcThJS0FLS1FNTkVZTUdDQlpTZG5VM0p2S2NEenpMS1czSWtERjl1WStFK29pRzlaWStRLzM4em9wNlFFQ1A4dUVnM2FvdE5OOFBUWnVKZGxQdkM4NVQveHV0VXVteVpJY2ZTWDM2aHN0V3JLQ2t6a3pLT1BvYnkzM3pESU9UZHNNRXkyOW1pTFBwaElhVU5ybXdaMnFHMFhnNFErc1lqQkliTlBCQTZuUGoyT2hwV0JCUUJSYUFwSUFEeVNrbEpNUzlSZ1M1RUhEN0lFcVFJaHpqMHFCZ1dWV2xjSWNhbWdGMWRuS041UTQ2blkwZlRsK3hjTGZqNEl4TjN0MjFIc0JCTGxpNDE4YklWeThtM2JTdVY3OWpCYjNid2tzdGprVnlrZ1VLZ2JuN2xVZmdWakJBaVhvY2tMOUtOVkYvVEZBRkZRQkhZa3hGSVRVMDFweWU2RUtRSVozUm5nQ3dSaGc0RmlZSXdmVXlnMGRmclRIWDljUWdCUTQ2d0NPR1NtcmN3ZnZtMmJjWXZXN3VHeW1iKzA0VHhVL0xUVC96US81dVVjZklwNUlHUTJBcU01aUJVQ0JNK0JJc3JuN1MwTkpOV1ZGUVV2RXFLVmwvVEZRRkZRQkhZa3hFQUtjSllFQ01CSklnNExFaFphc1g3Vk1XU2hDNHQzWk1CYVdEbjV0bCt4KzFVdlBoSE02eTBJVU9NMy9McWE2am9xeStERC82WHN1Vll6THRhVS9yM3ArWmp4aEMxYVV2dUhqMzR2ckJsVVVZNko3TkV3TUtIQTBsQ3dDQklFYndJUDFMZGVOTVc4ZjNTZWQ5K1JlM2FkYVRXYmR0U0I5NDQxSzVkTzJyUm9nVmw4dEp3UkljYjJ6d0pJMjBhaWxoZUV4VUJSVUFSY0JBQnVjVWtPaEhraHdNT2FjaUhuclRIa1c4dHVKcGsvVWtnQXA1aTNveURoL3Vianp1RHNEa0h6dE81TXpVLys1eGd0OFY4ZjdIa3QxK3AyY21qeWQyaG94RmFtMXNtVU43cmM3bE1ickNjUFFEaHdzR0hRR1U5WEpaWjdSUEJYcThtNFkvZWY0djY1cjFDeWV1SlZ1YjY2TWRTRHhWNFU2bkVsY0h2RzJ4RDdyVFdsSnpabWpLek9sQ0wxdTJwVmV0MjFJUEovZUNERDY1SmQxcEhFVkFFRklGYUk0QVZOZWhIV0k2eXlnYTlLTmFqZElCOFdKQW9MNjlza1R6MUU0ZUFwOE1ML3lBM1c0SjRDMDQwbDNiUXdkVHBqYmR3ZHpqMDJSUzJ6bEo2OXFMeW5FM1JxaG5CSXhNQ0YyY25TbnU2NU5mRVQwbEpwWDZkMGlnN2k4akxDL0tlTkNabTNBNzFGL0lQSDk3MVZGYmlwNkpTUCtYdDlOSG1kZVcwNEJNdnpmMWdMUDNsemtlQ3l4bzE2VHRhbmExYnQxSTZYM1EwYTlZc1doRk5Wd1NhTkFJLy8vd0xUWnA4WDBRTTdyeGpBdTI3N3o0Ujgrb2o4ZlUzM3FZMzMzeUhUanR0REowKzdsUkhobUFuUkpDay9VQUhzQnBoUGNweXE0UWQ2VndicVJZQmo2ZGpwMm9Mb1lDTHIxN0U2aE8vdW9vZ1B3Z2M1ZUZ3UllUdlBDTHVGREdpWFR4U2tsOVNSb1ZscVZUS2srbVgxU1cwYWFlWFVqejhGcDl5WHNkUFl1dlZ6ZXY0SE1kSTJtZWwwT21IcDlEblM5NmhLVk5hMFoxM1RrSXpqcml2dnZxYWJyengvMmo3OXUybXZVTU9PWmltVDMrVU9uV3lOajA1MG9tdEVaRHd1KysrUjVkZGRva3RWWU9LUU1OSG9IdjM3dFM5ZXpjejBBc3ZzRmFxWnI3NGlva2pyeUU1RUNNY2ZLZklVY2dRdDV0Z0hlS1FOTkdkRWhlZGliaTZ1a0hBdWlrWVIxOGlIUGhDZWxWVlJ4bGNJY0dYOGhBOHd0SldWZlZqeWNOMGNiTng2bVlDTEM4c29xOTM3RTNIbmZFMzhyaDlsTm1zbGZrMldtbHhQaFVYRjFDSjEwM3YvL3RPMnJ2Tkp1clZJWTMrL3Q0SE5ISGk1Rmk2cWJZTWxqN0dqNytHSmt5NGxjNDc3eHpDeHFNYmJyaUo3cnZ2ZnBveDQ5RnE2OWVrd0pZdFcraWVlKzZseXkrL3RDYlZ0WTRpVUc4SU5HdVd5WHNDTWt6Ly9mdnZhM3lKSTY4aHVYRnNMYjdCMWlOOHAvU1c2RUQ3L2d1MERYMEpaKzhIT2xQU0d4SXVlL0pZUXV1ZGNad2xoQXBCMllVWHFicWREQ0ZjV0k0NDRCQjMwdmw5c0F5VGFFZXVsL2JxZHdDTk92RTRPdUg0NDJuejJxVzBkTjY3bEo2V1RDZU9HRUZqVGhwT1hWdDdLSVdIVVZybUM0N0hpYkZzM2JxTkNnb0s2TWdqanpEbmg4MUE5OTkvSDF0MUllTDY1Sk5QYWN5WTAzakphRDhtdENzSmxoOGM2dDE4OHkwbWZjU0lrZlQ2NjlhenBjaWJ4Rzh1bWpYck5RU05lLzc1RitpaGh4Nmg1Y3RYMEFVWFhHelNoZzRkUmw5ODhhVUpmL3JwSERybGxER21yYi85N1k3Z1VqanFUSjU4ajhrYk5lb1Vxekg5VlFRVWdXb1JnTFU0NjlVWEhiTWFwVVBvUVN5WHluT00wSmxJZzI0Vi9RcGRpM1FwSTNYVlR5d0NOV1lvQ0ZESUw5SVFSYkFvSTRTSVNRQkJ5eEdwWGszVFREOThOcmxGUGtwdGxrMTRDODkzM3krbWp4NGZUNjZ2SDZMYnJqNlZ4bDgwa3M0ZE41eGN1V3ZKazRvSGJmRW9pclhrVzlOKzdmV3lzenZSZ0FFRDZPS0xMNkYvLy90VldydDJIYlZ1M1lvR0R0elBGUHZsbDE4TklaNTIybGpPZjlsTTlsdDRZeFBjaEFsLzVmSnJUZnJWVjQ4M1JQbjk5OStidkczOGFNM3UzZnlxdm9EYnZYczM3ZHk1ZzNyMDZFNzMzanZacEw3eXlyL01CaU1RNW1XWFhVSG5uMzhlSVczeDRpVTBiZHJEcHN5dVhUdnB1ZWRlb0lzdXVwQXQyVWVrT2ZVVkFVV2dIaENBam9RdWhINFVNaFM5aVNWVzBhK3lZeFU2VjEzZElSRDNzaXFHQmdHQzZFU1FrWVlMd1VvKzdqUEsxUkRLUXZDT0N4cHJxL3hXK2gwbGJ1cmQ3MERDQTdaNzkrMUJKMXp6QkRWdmxrTG5iOHJoWmM0Q1dybDZFelVyK2grZlJJb1pOZy9UVWZmaWkvK2dKNTk4bWkyMGU0MDFlTkJCZzlsNm5FcTllL2VtTDcvOGtrNDQ0UVFtcm5OTm53OC9QSTErL0hFeGsyUTUvZWMvNzlISEgzOUkrK3pUandZTkdrZy8vTENJNXN6NWpJWU90WFlRUnhva2RxOTE3ZHJGWlBYczJkUDRuMzMyR1IxenpORTBjdVJJRTcvdXVtdm90dHR1NStOV0V6L3Z2SE5wN0Zobk5oU1lCdlZIRVdnQ0NHQkRqaXlyT25YUFVXQVRnb1FQQjdJVUt4RzZFdW5RdDQ3clRCbUEraEVSaVB0U1JBZ3ZZbXUyUkNrSGtvUlFoUnlSTGhha3JYaXRnNGJrbUNCM0ZMdHAwYUtGOVBHSGI5RVA4NytnTHQxN3NpWFppYzY1K0VhNjVzYTdhZXlabDFLYWl5MUdKa1VlaXVPdVRaczJkUHZ0ZjZYLy9lOG5ldXV0Ti9oY2ZYVFZWZGVZZmxhdVhFVjkrL1lKOXRtcVZTdERaQnMzYmpScHNBVEY5ZTdkaTFhc1dDWFJtUDNac3orbHVYTS81eVhWQWVhNDRvcnhabk9RL0xPMWE5YzI1cmEwb0NLUVNBVFdyRmxuVmxkNjJEYmZJSXdWRitRMUpBZGloQlBmeWJHSmpvUnVSQmhrS0RvVFlSd2d6T29NRWlmSHBHMnhFUmN2Q0JBVUhJUlluUk1oaThBUkY5S3NybTY4K1dZMExqOXQyT21ucFM5TnBGdzJxUEpMK0tNaHZFbG42V1l2VGZqN2x6Umt5SUgweTAvZlVvYzBKa2NYbjdxL0xONXVxaXkvZXZWcVdyQmdJWjExMXBubVBBY1BQcENYUjIraWM4ODkzMHhzN014YnRXcDFzQTFzNE5uTW53dnIwS0c5U2Z2amp5MGtCTG1KTFYzWnlZZC9qRjI3ZGdYcllWazFtanY2NktPTTlUbDE2cjNSaW1pNkl0QWdFTGg3MGhRcTVQYzByMkV5dkh2UzFPQ1lDZ29LK1JHUEtmVEM4MDhGMCtvN1lOK1E0OVJZUkJmQ0Z3TEUvenFJVWZRczRuRFFvVUtlVHZXdjdWU05RTnlXbzFpQUVGcFZCQ25FaVBJb2gwT3Voa1RRVlE4dGpseWVYRzd1cDd6RVMyMjc3a1dUWHZpZVRwdjBLVjMwd0dkMDF0UlBhZXBMODNpVHpEQmVhazJqd3J3dDFES0RYK1RMSEMrVE00NmVxaXlha1pGQnQ5NTZHMi8zZnNzOHNwS2JtMHV2dmZZNjRYRU80RFZzMkRCNisrMTNDSTk3Z09DdzlJcmRySGl0M3JCaGgvSW1tNGNKZFpZdVhVWXZ2dmlTU1VPSElNdzVjK1lRQ0hQTm1yWGN4cnZCY2NENmhNTzlSVnhaWWhuMmxWZitUZlBuTHpEM1haOTU1bG02OU5MTGcrVTFvQWcwRkFSNjlPakdxeHY5ZURoK002OHh0eEZHbWx3WU5wU3hKbUpEanVnZjZFcTdMc1gvTVpaVHhkbnpwSTdrcVo4NEJFSVNpTEVQQ0FyQ2cwQ3JFcFNkRkVFTUtDLzFKQjVqbHpFVXM2NnF5bjEreW1FREs3K29tREtTVTdsUEVDQ1RjNm1YUHYzME05cVp1NXZ5VnMrbGpuMzQ3VGxsc2htbmVnczRoZ0dZSWgzNUJlNlBQejdERU9STk45MXMwbkFQOGFtbm5qUmhXSktUSjA4eWhJam5JUHYwNlVOUFBQRzR5WnMrL1JHNjVwcHJlZlBPQWVhVmQxZGNjUm1OR0hHQ3lUdjc3TFBvUFg3azVOQkREeU1zMitLZXBHRGZtZDltZE9LSkkyajA2RlBwNmFlZk5IVW1UcnlETndWZGF1NTVkdXZXalI1N2JMcHBSMzhVZ1lhRXdNUTcveG9jRHF4SU9IdGFNSE1QRFFqcFFSL2kveGtIZENUMkVpQlAwdVIvSFRCSW5UMFVrZ1oxV25HVEl3UWx4QmZMbWVCZWwxd0ZvUjVJMG1tSENaV2N6RXNUU1NrMHJPMWErdlVGZnMwZGJHTG1QWmxrU1p6QUZFMm45RXlqcEpRMFN1YmwxclFVdlBnM2JnaXFIUDdKSjU5RW8wYU5OTityaENVcGxwMVV1dUNDODh5R0hDd24yZC83MnI1OWUzNThZNVo1TmhLYmlZQ1ZPT1RObVRQYldKdW9ZODlEbWFlZWVzSThyaUU0WDNMSnhVeU9GNW55ZUwrc09CQ3pPa1ZBRVlnZmdVUnV5SkgvWitoR0VDV2M2RW5vTmpzaDJva3kvclBRR3ZFZ0VEY3pRR2hDT05WMUJFSGFoU24xd3RPcmE2ZTYvSjY5K3REbUpXWFV2WU9ML3RRdm5TaVZkOXBFM0d6am90SUNIeFVVZS9uTk9TN2FubDlPdVhtNTFUVWZkejRtT3l5NmFBN25ieWRHZXptOGNpNmFhOTY4ZWJTczRBdUtwUUQ2c0JPanBLdXZDQ2dDOFNNZ0czSGdPN2xiRlRvUmV3OXdZUXRpUkZ3T2lTTVBaYUJYa0tldWJoQ0lteHlGN09US3BycGhRc0JTVm53UmZuVjFZODAvNDh6emFOclAzOVBXSDk0M3I0emJWY0N2a3l2MlVSNGYyL045SFBiVHJvSnlLdkh6dXdxSkQzNk1Jem0xR2ZrOWFYVDRFZEVmbFlpMWZ5Mm5DQ2dDdFVNQXF5d04yU1ZxUXc3MEkwZ1BldFZhQWJNK2RDd3ZKUmRkaVhJZ1NIVjFoMENOeUJIQ2hDQ3JjaUpVbEpIeUVERHE0UkNTcmFxTldMaWJHQkFBQUFSclNVUkJWUE13a1c2OTUwbDY4TUdlTkcvZVBQTzVxcmJkMjVyN2MzdnpKNnhhdG14WjRjakt5aktiWUxCOGlUR3BVd1FVZ2ZwRjRPcnhWOVR2QUtycEhkYWlreFlqdWhNZEtyclNyaFBGa0VBYXd0Q2hjUFl5SmtGL0VvWkEzT1FJUVVHWUlxeXFSbVlYTEVnSTl4K2xiaXoxcTJvN1BBL3RUNWhndlcwbVBFL2ppb0FpMExBUmtIZXFOdXhST2pzNjZFZlJod2pqZ0k2VVBRZDJncFI4bEZkWE53akVUWTRRRW9RbWdvczJUSlNEdzNvNXJwRHNkWkNISlFJVmREVDBORjBSVUFUMmRBU2dCNkVieFZCQVdJd0krRWdYOG9TK0ZKMjZwK1BTVU02dlJ1UW93cXp1SkNCc0hIQVF0aEFrcm81RThOVzFvZm1LZ0NLZ0NPeUpDTWhLR2tnUCtoQytIR0pCZ2h4RmgrNkpHRFRrYzRxYkhDR29XQ3crbEV0bWdZdUZLVGVUVVJkcG1BU3h0Tk9Rd2RPeEtRS0tnQ0pRVXdTRUZLRUg4ZjVwZVJRTGNaQ2xrQ0wwSmVMUW9hSlBhOXFuMW9zZGdiakpFUllnSElSWmxYT1Y1cEd2Y0lzaFFVT0dYQmhYUTNCSldDSW8yVTdlL00wbXJqK0tnQ0tnQ0RRMUJLQURmWVZwNU9OYlQ4WmlUT2FkcXFWc1BVTEg4bEhHcEFpSFBCTmkwblNWRnpZMW1PcnRmT01tUjR4VXJteXFHclgvdTZ2NXNZbUtUaDVyVCtYazduenNXRkl4WDJPS2dDS2dDRFFWQkhyaVJKZUZ6bGIwcFdWQ2hOSTFWRDhJQ0YvRjNMdVkrcmlhVWFjSUtBS0tnQ0tnQ095SkNNUk5qbGo3aHRQN2hYdmlkTkJ6VWdRVUFVVkFFUUFDY1pNakxFWVFveUhIcEJxdHlpcnlpb0Fpb0Fnb0FnNGo0SEpiSDNCM3VOa20yMXpjNUFoU3hLWWNISzVXK3pSWjRQVEVGUUZGUUJGb1NBZ2tzVDZXMjEzaU42VHhOYmF4eEUyT09FRzU3NWpTL3lweXBiZHJiT2VzNDFVRUZBRkZZSTlDd04xeEdDVjNHMjdPU1luUkdkRzYyQktNNlgxRUtDYUhQTHlLUnpSS2Q2Nmkwa1ZUcWZ5UCtmeWRsWXFQZDRRM2JZK2pyanpYNDh5cGFDdUtnQ0tnQ0RRZUJLQkhaUThIUmgySjFDS2wyYy9RbGRLQzNOMUdVUHJnVzhtZDJ0eTBaMWIxK1BhWHRGMWRHL2IyTkJ4Q0lDNXlSRFVRbkR5dmlJZFNFUWJSU1RwOEhMQXV3OE5DcW5oR01pY25odzQ2NktEUVNEU2tDQ2dDaWtBVFFtREJnZ1dVbloxdFBqY250NnBBYUJLR0Q5MktOQnpRcDBpeit5QStwTUhRa0hMaUkwK0pzZVlUS3VZZE5RQlp5QTdnaStXSGRDRkNoSVVzSVRCN1hJU0xzc2lERTcvbXc5ZWFpb0Fpb0FnMFRnU2dINVA1d1gvb1FkR1g4SkVHL1FvbmVYYVNSRDBjMEtuMnNKMFVHeWNpRFd2VU1aT2pERnVJRVVRcEFrSlloSWZQUnlFTWtoVEJvUzdLd0tHK0NCeStPa1ZBRVZBRW1pSUMwSlZ3MElPdy9FQ0tjTkNiZGtzUWFWSVcraE1PT3RaK1c4cE9qSGE5YXdyclQ0MFFpSXNjQVRxRUFoK0NGQ3RRTEVxa3d3bnBDVUdpTE1MNEZBdnFGeFVWbVRha1hJMUdycFVVQVVWQUVXakVDSURjaEJoeEd0Q2ppSXQrUlJoNkU4U0lQQkFnOHNLUFNIbG9UL1F4d3VyaVJ5QXVja1R6QUR5Y0RFRitFRFFFQ2ZJRGFjcVZEOEpJRjRKRVhZUnhLRG5HTHpDdG9RZ29BbnNHQW1KY1FLZENINHIxaDdOREduUXBpQkZoSEhCMm5SbE9sc2lYY3VJalRWM05FUGgvOEU2NDdpZENpQ3NBQUFBQVNVVk9SSzVDWUlJPVwiIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlID0gT2JqZWN0LmNyZWF0ZShtb2R1bGUpO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsICdleHBvcnRzJywge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0c2V0OiAoKSA9PiB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VTIE1vZHVsZXMgbWF5IG5vdCBhc3NpZ24gbW9kdWxlLmV4cG9ydHMgb3IgZXhwb3J0cy4qLCBVc2UgRVNNIGV4cG9ydCBzeW50YXgsIGluc3RlYWQ6ICcgKyBtb2R1bGUuaWQpO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJjb250ZW50X3NjcmlwdFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjaHJvbWVfZXh0ZW5zaW9uX3R5cGVzY3JpcHRfc3RhcnRlclwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjaHJvbWVfZXh0ZW5zaW9uX3R5cGVzY3JpcHRfc3RhcnRlclwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvY29udGVudF9zY3JpcHQudHN4XCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=