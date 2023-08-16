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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Images = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const icons_1 = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
function Images(props) {
    const [images, setImages] = (0, react_1.useState)([]);
    const [imageIndex, setImageIndex] = (0, react_1.useState)(0);
    const [showControl, setShowControl] = (0, react_1.useState)(false);
    const [changeImage, setChangeImageStatus] = (0, react_1.useState)(false);
    // const [searchImageIsLoading, setSearchImageIsLoading] = useState(false)
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
        (_a = inputElement.current) === null || _a === void 0 ? void 0 : _a.focus();
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
        let inputValue = (_b = (_a = inputElement.current) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.value;
        if (inputValue && inputValue !== '') {
            props.getUnsplashImages(inputValue);
            setChangeImageStatus(false);
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
        // 预加载下一张图
    };
    const handleImagesBoxHover = (e) => {
        if (e.type === 'mouseenter') {
            setShowControl(true);
        }
        if (e.type === 'mouseleave') {
            setShowControl(false);
        }
    };
    return (react_1.default.createElement("div", { className: "images", style: {
            position: 'relative',
            paddingBottom: '8px'
        } },
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", { onMouseEnter: handleImagesBoxHover, onMouseLeave: handleImagesBoxHover },
                images.length > 0 ?
                    react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("div", { className: "imageBox" },
                            react_1.default.createElement(antd_1.Image, { "data-downloadlocation": images[imageIndex].links.download_location, src: images[imageIndex].urls.small, alt: images[imageIndex]['description'], height: 240, width: '100%', preview: false, placeholder: true })),
                        react_1.default.createElement("div", { style: {
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
                                padding: '6px 12px',
                                margin: '0px 18px',
                                background: 'linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 27.6%, rgba(0, 0, 0, 0.2) 54.69%, rgba(0, 0, 0, 0.35) 100%)'
                            } }, changeImage ?
                            // 显示图片搜索控件
                            react_1.default.createElement("div", { style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '2px 0'
                                } },
                                react_1.default.createElement("div", { style: { flex: '1', marginRight: '20px' } },
                                    react_1.default.createElement(antd_1.Input, { prefix: react_1.default.createElement(icons_1.SearchOutlined, null), placeholder: "Search images", onKeyDown: handleSearchInput, size: "small", style: { width: '100%' }, ref: inputElement, onPressEnter: handleSearchBtnClick })),
                                react_1.default.createElement("div", { style: {
                                        display: 'flex',
                                    } },
                                    react_1.default.createElement(antd_1.Button, { type: "text", size: "small", style: { color: '#fff', marginBottom: '4px', marginRight: '10px' }, onClick: handleSearchBtnClick, icon: react_1.default.createElement(icons_1.CheckOutlined, null) }),
                                    react_1.default.createElement(antd_1.Button, { type: "text", size: "small", style: { color: '#fff', marginBottom: '4px' }, onClick: () => setChangeImageStatus(false), icon: react_1.default.createElement(icons_1.CloseOutlined, null) })))
                            :
                                // 显示图片导航控件
                                react_1.default.createElement("div", { style: {
                                        display: 'flex',
                                        flexGrow: 'inherit',
                                    } },
                                    images.length > 0 &&
                                        react_1.default.createElement("div", { style: {
                                                display: 'flex',
                                                alignItems: 'center'
                                            } },
                                            react_1.default.createElement(antd_1.Button, { style: {
                                                    color: '#fff',
                                                    lineHeight: '100%'
                                                }, type: "text", size: "small", icon: react_1.default.createElement(icons_1.LeftOutlined, null), onClick: () => handleChangeImagesClick(-1) }),
                                            react_1.default.createElement("div", { style: {
                                                    width: '40px',
                                                    textAlign: 'center',
                                                    color: '#fff',
                                                    fontWeight: '500',
                                                    padding: '0 4px',
                                                    marginTop: '4px'
                                                } }, imageIndex + 1 + '/' + images.length),
                                            react_1.default.createElement(antd_1.Button, { style: {
                                                    color: '#fff',
                                                    lineHeight: '100%'
                                                }, type: "text", size: "small", icon: react_1.default.createElement(icons_1.RightOutlined, null), onClick: () => handleChangeImagesClick(1) })),
                                    react_1.default.createElement("div", { style: {
                                            display: 'flex',
                                            flexDirection: 'row-reverse',
                                            flex: '1',
                                            alignItems: 'end'
                                        } },
                                        react_1.default.createElement(antd_1.Button, { type: "text", size: "small", style: { color: '#fff' }, onClick: () => handleEditImagesClick(), icon: react_1.default.createElement(icons_1.FormOutlined, null) })))))),
            images.length > 0 &&
                react_1.default.createElement("div", { style: {
                        fontSize: '0.92em',
                        color: 'rgba(0, 0, 0, 0.4)',
                        marginTop: '4px'
                    } },
                    "Photo by ",
                    react_1.default.createElement("a", { style: { textDecoration: 'underline' }, target: '_blank', href: "https://unsplash.com/@" + images[imageIndex].user.username + "?utm_source=Scouter&utm_medium=referral" }, images[imageIndex].user.name),
                    " on ",
                    react_1.default.createElement("a", { style: { textDecoration: 'underline' }, target: '_blank', href: "https://unsplash.com/?utm_source=Scouter&utm_medium=referral" }, "Unsplash")))));
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
    const [isPin, setIsPin] = (0, react_1.useState)(false);
    const [currentURL, setCurrentURL] = (0, react_1.useState)();
    const [isOpenPromptMenu, setIsOpenPromptMenu] = (0, react_1.useState)(false);
    // const { Option } = Select;
    const navElement = (0, react_1.useRef)(null);
    const defaultPrompt = (0, util_1.getDefaultPrompt)('');
    (0, react_1.useEffect)(() => {
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
        }
        else {
            (0, content_script_1.pinPopupCard)(true);
            setIsPin(true);
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
                                react_1.default.createElement("span", { style: {
                                        marginRight: '2px',
                                        maxWidth: '170px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    } }, props.lastExecutedPrompt.title),
                                react_1.default.createElement(react_icons_1.HamburgerMenuIcon, null))),
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
                                react_1.default.createElement(DropdownMenuItem_1.DropdownMenuItem, { key: defaultPrompt.id, data: defaultPrompt, onSelect: () => handleMenuItemClick(defaultPrompt), handleEditPrompt: () => openCustomPromptForm({ isOpen: true, data: defaultPrompt }) }, defaultPrompt.title),
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
                paddingBottom: '10px'
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
exports.PopupCard = void 0;
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
// import ReactDOM from "react-dom";
const react_markdown_1 = __importDefault(__webpack_require__(/*! react-markdown */ "./node_modules/react-markdown/index.js"));
const remark_breaks_1 = __importDefault(__webpack_require__(/*! remark-breaks */ "./node_modules/remark-breaks/index.js"));
const rehype_raw_1 = __importDefault(__webpack_require__(/*! rehype-raw */ "./node_modules/rehype-raw/index.js"));
const remark_gfm_1 = __importDefault(__webpack_require__(/*! remark-gfm */ "./node_modules/remark-gfm/index.js"));
const react_spring_1 = __webpack_require__(/*! react-spring */ "./node_modules/react-spring/dist/cjs/index.js");
const content_script_1 = __webpack_require__(/*! ../content_script */ "./src/content_script.tsx");
const Nav_1 = __webpack_require__(/*! ../Components/Nav */ "./src/Components/Nav.tsx");
const CustomPromptForm_1 = __webpack_require__(/*! ../Components/CustomPromptForm */ "./src/Components/CustomPromptForm.tsx");
const Images_1 = __webpack_require__(/*! ../Components/Images */ "./src/Components/Images.tsx");
const Selection_1 = __webpack_require__(/*! ./Selection */ "./src/PopupCard/Selection.tsx");
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const icons_1 = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
const settingGuide_png_1 = __importDefault(__webpack_require__(/*! ../assets/settingGuide.png */ "./src/assets/settingGuide.png"));
const locale_1 = __webpack_require__(/*! ../lib/locale */ "./src/lib/locale.ts");
const util_1 = __webpack_require__(/*! ./util */ "./src/PopupCard/util.ts");
let currentLanguage;
let targetLanguage;
// // 使用长连接
// let port = browser.runtime.connect({
//   name: 'fromPopupCard'
// })
let ankiCards;
(0, util_1.getAnkiCards)().then((cards) => {
    ankiCards = cards;
}).catch((error) => {
    // console.log(error);
});
const { TextArea } = antd_1.Input;
const AnkiContext = (0, react_1.createContext)(null);
function PopupCard(props) {
    const [messages, setMessages] = (0, react_1.useState)([{ 'content': '', 'role': 'user', 'loading': false, 'chatId': '', 'prompt': '', 'status': '' }]);
    const [images, setImages] = (0, react_1.useState)([]);
    const [showImagesBox, setShowImagesBox] = (0, react_1.useState)(false);
    const [prompts, setPrompts] = (0, react_1.useState)([]);
    const [lastExecutedPrompt, setLastExecutedPrompt] = (0, react_1.useState)({ 'title': '👉🏼 Please choose a prompt', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' });
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [isPopoverOpen, setPopoverOpen] = (0, react_1.useState)(false);
    const [customPromptFormData, setCustomPromptFormData] = (0, react_1.useState)({ 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' });
    // standby,normal,loading,success
    const [addToAnkiStatus, setAddToAnkiStatus] = (0, react_1.useState)({ 'status': 'standby', 'noteId': 0 });
    const [isAnswerDone, setAnswerDone] = (0, react_1.useState)(false);
    const [isApiErro, setIsApiErro] = (0, react_1.useState)(false);
    const [isAnswerInputed, setIsAnswerInputed] = (0, react_1.useState)(false);
    // 窗口拖拽逻辑
    const [dragging, setDragging] = (0, react_1.useState)(false);
    const windowElement = (0, react_1.useRef)(null);
    const messagesList = (0, react_1.useRef)(null);
    const inputRef = (0, react_1.useRef)(null);
    const shouldStayAtBottomRef = (0, react_1.useRef)(false);
    const [form] = antd_1.Form.useForm();
    let Lang = (0, locale_1.useCurrentLanguage)();
    currentLanguage = Lang['current']['name'];
    targetLanguage = Lang['target']['name'];
    (0, react_1.useEffect)(() => {
        // console.log('useEffect');
        // console.log(props);
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
        if (messages.length > 0 && isAnswerDone && messages[0]['status'] !== 'erro') {
            // console.log('Save');
            // console.log(messages);
            const keyWord = props.data.keyWord;
            const Sentence = props.data.Sentence;
            // 将查询记录保存起来
            const newHistory = {
                'keyWord': keyWord,
                'sentence': Sentence,
                'role': messages[0]['role'],
                'answer': messages[0]['content'],
                'source': window.location.href,
                'prompt': messages[0]['prompt']
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
    const executivePrompt = (prompt, runPrompt, imageToRerender) => __awaiter(this, void 0, void 0, function* () {
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
        // console.log('executivePrompt:');
        // console.log(needToRunPrompt);
        // console.log(prompt);
        // promptRef.current = prompt
        const keyWord = props.data.keyWord;
        const Sentence = props.data.Sentence;
        // 初始化
        setMessages([]); // 对话列表
        if (needToRerenderImage) {
            setImages([]); // 图片列表
        }
        if (prompt.getUnsplashImages && needToRunPrompt) {
            // 如果当前 Prompt 需要显示图片，且当前需要立即执行 Prompt
            setShowImagesBox(true);
        }
        else {
            setShowImagesBox(false);
        }
        if (needToRunPrompt) {
            // 在消息历史中插入新记录
            setMessages(prevMessages => [...prevMessages, { 'content': '', 'role': 'assistant', 'loading': true, 'chatId': '', 'prompt': '', 'status': '' }]);
            // 设置最近执行的 Prompt
            setLastExecutedPrompt(prompt);
            // 记录最近 1 次使用的 Prompt
            webextension_polyfill_1.default.storage.local.set({
                lastExecutedPrompt: prompt
            });
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
                            const updatedLastMessage = Object.assign(Object.assign({}, lastMessage), { chatId: Date.now().toString(), role: obj.role, content: obj.answer, prompt: newPrompt[0]['content'], loading: false, status: 'success' });
                            return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];
                        });
                        setIsLoading(false);
                        setAnswerDone(true);
                        setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 });
                        break;
                    }
                }
                if (!bingo) {
                    // 请求 AI 数据
                    getGPTMsg(newPrompt, keyWord);
                }
                if (prompt.id == 'Default') {
                    if (keyWord.length <= 20 && prompt.getUnsplashImages && needToRerenderImage) {
                        // 获取图片数据
                        (0, util_1.getUnsplashImages)(keyWord).then((imgs) => {
                            setImages(imgs);
                        });
                    }
                }
                else {
                    if (prompt.getUnsplashImages && needToRerenderImage) {
                        // 获取图片数据
                        (0, util_1.getUnsplashImages)(keyWord).then((imgs) => {
                            setImages(imgs);
                        });
                    }
                }
            });
        }
        else {
            setLastExecutedPrompt({ 'title': '👉🏼 Please choose a prompt', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' });
            setAnswerDone(true);
            setIsLoading(false);
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
    });
    // 请求 GPT 数据
    const getGPTMsg = (prompt, keyWord) => __awaiter(this, void 0, void 0, function* () {
        // 使用长连接
        let port = webextension_polyfill_1.default.runtime.connect({
            name: 'fromPopupCard'
        });
        keyWord = keyWord || '';
        // 设置为回答中
        setAnswerDone(false);
        // 禁用保存到 Anki 按钮
        setAddToAnkiStatus({ 'status': 'standby', 'noteId': 0 });
        // 在消息历史中插入新记录
        // setMessages(prevMessages => [...prevMessages, { 'content': '', 'role': 'assistant', 'loading': true, 'chatId': '', 'prompt': '' }])
        setTimeout(() => {
            // 使用 postMs 发送信息
            port.postMessage({ 'type': 'getGPTMsg', 'messages': prompt, 'keyWord': keyWord });
        }, 20);
        // 接收信息
        port.onMessage.addListener(msg => {
            // console.log('port.onMessage.addListener');
            if (msg.type === 'sendGPTData') {
                // 请求 GPT 数据失败
                if (msg.status === 'erro') {
                    // type === 'as2' ? setopenApiAnser2(msg.content) : setopenApiAnser(msg.content)
                    setIsLoading(false);
                    setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 });
                    if (msg.code === 'invalid_api_key') {
                        setIsApiErro(true);
                        msg.content += '\
            After that, you need to set the correct Open API Key in the Scouter:';
                    }
                    setMessages(prevMessages => {
                        const lastMessage = prevMessages[prevMessages.length - 1];
                        // const newMsgList = lastMessage
                        const updatedLastMessage = Object.assign(Object.assign({}, lastMessage), { chatId: msg.chatId, content: msg.content, loading: false, status: 'erro', prompt: prompt[0]['content'] });
                        // const newMsgList = [...prevMessages.slice(0, prevMessages.length - 1), lastMessage]
                        return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];
                    });
                    setAnswerDone(true);
                }
                else if (isApiErro) {
                    setIsApiErro(false);
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
                    // type === 'as2' ? setopenApiAnser2('') : setopenApiAnser('')
                    // console.log('begin');
                }
                // 请求 GPT 数据成功且数据流传输中
                if (msg.status === 'process') {
                    // if (windowElement.current) {
                    //   const container = windowElement.current.querySelectorAll('.container')[0]
                    //   shouldStayAtBottomRef.current = container.scrollHeight - container.scrollTop <= container.clientHeight + 20;
                    // }
                    try {
                        // 渲染数据
                        setMessages(prevMessages => {
                            const lastMessage = prevMessages[prevMessages.length - 1];
                            if (prevMessages.length === 0) {
                                return [];
                            }
                            const newMsgList = lastMessage;
                            let newContent = newMsgList.content + msg.content;
                            // if (prompt[0]['content'].indexOf('{ankiCards}') >= 0) {
                            //   newContent = handleHightlight(newContent, props.data.keyWord, ankiCards, windowElement?.current)
                            // }else{
                            //   newContent = newContent.replace(new RegExp(props.data.keyWord, 'gi'), `**${props.data.keyWord}**`)
                            // }
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
                prompt: prompt
            };
            // const newMsgList = [...prevMessages.slice(0, prevMessages.length - 1), lastMessage]
            return [...prevMessages, updatedLastMessage];
        });
        // 在消息历史中插入新记录
        setMessages(prevMessages => [...prevMessages, { 'content': '', 'role': 'assistant', 'loading': true, 'chatId': '', 'prompt': '', 'status': '' }]);
        // console.log(messages);
        const msgHistory = messages.slice(-5).map((item) => { return { 'role': item.role, 'content': item.content }; });
        getGPTMsg([...msgHistory, { "role": "user", "content": values.msg }]);
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
        var _a;
        const keyWord = props.data.keyWord;
        const Sentence = props.data.Sentence;
        let container = '';
        let images = '';
        let unsplash_download_location;
        const stc = keyWord.length <= 20 ? Sentence : '';
        if (windowElement.current) {
            // console.log(windowElement.current);
            container = windowElement.current.innerHTML;
            container = windowElement.current.getElementsByClassName('messages')[0].innerHTML;
            // 处理样式，避免 Anki 内显示异常
            container = container.replace(/style=/g, '');
            if (windowElement.current.getElementsByClassName('imageBox')[0] !== undefined) {
                images = windowElement.current.getElementsByClassName('imageBox')[0].innerHTML;
                // 获取 unsplashApi 的 download_location
                unsplash_download_location = (_a = windowElement.current.getElementsByClassName('images')[0].getElementsByTagName('img')[0].parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute('data-downloadlocation');
            }
            // console.log(images);
            // 处理样式，避免 Anki 内显示异常
            images = images.replace(/style=/gi, '');
            images = images.replace(/width/gi, '');
        }
        const cardStyle = `<style>

    .sentence{
      opacity:0.65;
    }
    .ankiSpace {
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
        let p = {
            "note": {
                "deckName": deckName,
                "modelName": modelName,
                "fields": {
                    [front]: keyWord,
                    [back]: cardStyle + '<p class="sentence">' + stc + '</p>' + images + container + '<a href="' + window.location.href + '">Source</a>'
                },
                "tags": [
                    "Scouter"
                ]
            }
        };
        if (container.indexOf('class="ankiSpace"') >= 0) {
            p = {
                "note": {
                    "deckName": deckName,
                    "modelName": modelName,
                    "fields": {
                        [front]: cardStyle + '<p class="sentence">' + stc + '</p>' + images + container + '<a href="' + window.location.href + '">Source</a>',
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
    };
    // 点击保存到 Anki
    const handleSaveToAnkiBtnClick = () => {
        var _a;
        // 根据是否为完形填空申请不同的卡片模板
        const container = (_a = windowElement.current) === null || _a === void 0 ? void 0 : _a.getElementsByClassName('messages')[0].innerHTML;
        let isAnkiSpace = false;
        if (container) {
            if (container.indexOf('class="ankiSpace"') >= 0) {
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
            // const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 14;
            // console.log('isAtBottom ====== ');
            // console.log(canSroll);
            // console.log(isAtBottom);
            // console.log(container.scrollHeight);
            // console.log(container.scrollTop);
            // console.log(container.clientHeight);
            if (canSroll) {
                // 位于底部，需要自动滚动
                // const childElements = windowElement.current.querySelectorAll('.messages > :last-child');
                // if (childElements.length > 0) {
                //   const lastChildElement = childElements[childElements.length - 1];
                //   lastChildElement.scrollIntoView();
                // }
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
                react_1.default.createElement(Nav_1.Nav, { handleSaveToAnkiBtnClick: handleSaveToAnkiBtnClick, addToAnkiStatus: addToAnkiStatus, onMouseDown: handleMouseDown, handleMenuItemClick: executivePrompt, openCustomPromptForm: openCustomPromptForm, title: 'Scouter', prompts: prompts, lastExecutedPrompt: lastExecutedPrompt }),
                react_1.default.createElement("div", { className: 'container flex-grow flex flex-col overflow-auto' },
                    react_1.default.createElement("div", { className: 'flex-grow', ref: messagesList, style: { paddingTop: '54px' } },
                        react_1.default.createElement(Selection_1.Selection, { text: props.data.keyWord }),
                        showImagesBox && react_1.default.createElement(Images_1.Images, { images: images, keyWord: props.data.keyWord, getUnsplashImages: (keyWord) => {
                                (0, util_1.getUnsplashImages)(keyWord).then((imgs) => {
                                    setImages(imgs);
                                });
                            } }),
                        react_1.default.createElement("div", { className: 'messages', style: {
                                lineHeight: '28px',
                                wordWrap: 'break-word',
                                margin: '0.4em 0'
                            } },
                            messages.map((item) => {
                                return react_1.default.createElement("div", { key: item.chatId, className: '', style: item.role === 'user' ? { backgroundColor: '#F6F6F6', paddingTop: '2px', paddingBottom: '2px' } : {} },
                                    react_1.default.createElement(antd_1.Skeleton, { loading: item.loading, active: true, title: false },
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
                                            }, skipHtml: false, children: item.content })));
                            }),
                            isApiErro ? react_1.default.createElement("div", { className: '' },
                                " ",
                                react_1.default.createElement("img", { src: settingGuide_png_1.default, style: {
                                        borderRadius: '4px'
                                    } })) : ''))),
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

.ankiSpaceButtonBox {
  display: flex;
  width: fit-content;
  padding: 4px 8px;
  background-color: #fff;
  border: 1px solid rgba(5, 5, 5, .06);
  border-radius: 4px;
  box-shadow: 0px 8px 28px rgba(0,0,0,.16);
}

.setAnkiSpaceButton:first-of-type {
  margin-right:8px;
}

.setAnkiSpaceButton {
  cursor: pointer;
  padding: 2px;
}

.setAnkiSpaceButton:hover {
  
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
  width:0px;
}

#LearningEnglish2023 .container::-webkit-scrollbar-track  {
  background: #fff; /* 设置滚动条轨道背景色 */
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

#LearningEnglish2023 #ScouterNav,#LearningEnglish2023 .images,#LearningEnglish2023 #ScouterSelection, #LearningEnglish2023 .messages>div  {
  padding-left:18px;
  padding-right:18px;
}

#LearningEnglish2023 .openAIAnswer {
line-height: 30px;
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
        let port = webextension_polyfill_1.default.runtime.connect({
            name: 'fromPopupCardUtil'
        });
        // 使用 postMs 发送信息
        port.postMessage({ 'type': 'getUnsplashImages', 'messages': '', 'keyWord': keyWord });
        // 接收信息
        port.onMessage.addListener(msg => {
            if (msg.type === 'sendImgData') {
                if ('imgs' in msg) {
                    // console.log('unsplashSearchPhotos');
                    resolve(msg.imgs);
                }
            }
        });
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
    console.log(newStr);
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
    let userPrompt = `

        Please help me learn as a foreign language teacher. Sentences in examples should not be the same as the given sentence.

        Example：
        """
        -  Meaning: <Explain the meaning using {currentLanguage}>
        -  Part of Speech: <Indicate the part of speech using {currentLanguage}>
        
        ## Meaning in the sentence
        -  <Explain the meaning of the word in the sentence using {currentLanguage}>
        
        ## Example Sentences
        -  <{targetLanguage} example sentence> - <Translation in {currentLanguage}>
        -  <{targetLanguage} example sentence> - <Translation in {currentLanguage}>
        
        ## Translation Exercise
        -  <{currentLanguage} sentence>
        -  <{currentLanguage} sentence>
        
        """ 
        
        Word:{selection}, sentence: {sentence},You must reply in the specified language

        Please start teaching:

        `;
    // 关键字长度较长时，按照句子进行处理
    if (keyWord.length > 20) {
        userPrompt = `
      
                  As a language teacher, I will provide an explanation of the grammar knowledge in the given sentence:
      
                  Example:
                  """
      
                  ## Translation
                  <Translate to {currentLanguage}>
                  
                  ## Grammar
                  <- Point: Explain in {currentLanguage}>
      
                  ## Examples of related grammar
                  -  <{targetLanguage} example sentence> - <Translation in {currentLanguage}>
                  -  <{targetLanguage} example sentence> - <Translation in {currentLanguage}>
      
                  """
                  
                  Sentence: {selection}`;
    }
    const defaultPrompt = {
        'title': 'Default', 'getUnsplashImages': true, 'userPrompt': userPrompt,
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
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
const PopupCard_1 = __webpack_require__(/*! ./PopupCard */ "./src/PopupCard/index.tsx");
const cssinjs_1 = __webpack_require__(/*! @ant-design/cssinjs */ "./node_modules/@ant-design/cssinjs/es/index.js");
const lang_1 = __webpack_require__(/*! ./lib/lang */ "./src/lib/lang.ts");
const locale_1 = __webpack_require__(/*! ./lib/locale */ "./src/lib/locale.ts");
const style_1 = __webpack_require__(/*! ./PopupCard/style */ "./src/PopupCard/style.ts");
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
            console.log('container.onmousedown');
            // 隐藏 setAnkiSpaceButton
            const ankiSpaceButtonBox = container.getElementsByClassName('ankiSpaceButtonBox')[0];
            if (ankiSpaceButtonBox) {
                // 点击的不是 setAnkiSpaceButton 时才隐藏
                if (ankiSpaceButtonBox !== event.target && !ankiSpaceButtonBox.contains(event.target)) {
                    (_a = ankiSpaceButtonBox.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(ankiSpaceButtonBox);
                }
            }
        };
    }
});
// 显示应用窗口
function showPopupCard(data, msg, MyBox, shadowRoot, isPin, runPrompt) {
    return __awaiter(this, void 0, void 0, function* () {
        // let a = await fetchcurrentLanguage()
        // console.log(a);
        const lang = yield (0, lang_1.fetchcurrentLanguage)();
        react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null,
            react_1.default.createElement(locale_1.CurrentLanguageContext.Provider, { value: lang },
                react_1.default.createElement(cssinjs_1.StyleProvider, { container: shadowRoot },
                    react_1.default.createElement(PopupCard_1.PopupCard, { data: data, selection: msg, runPrompt: runPrompt, isPin: isPin })))), MyBox);
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
            console.log('PopupCard');
            // 显示完形填空操作按钮
            console.log(shadowRoot.getElementById('__jiang-scouter'));
            console.log(document.getElementById('__jiang-scouter'));
            console.log(container);
            const selectedText = shadowRoot.getSelection();
            const selectedTextString = selectedText.toString();
            console.log('selectedTextString:');
            console.log(selectedTextString);
            const PopupCardContainer = container.getElementsByClassName('container')[0];
            if (PopupCardContainer && selectedTextString.length > 0) {
                let ankiSpaceButtonBox = document.createElement('div');
                ankiSpaceButtonBox.className = 'ankiSpaceButtonBox';
                let setAnkiSpaceButton = document.createElement('div');
                setAnkiSpaceButton.textContent = '[...]';
                setAnkiSpaceButton.className = 'setAnkiSpaceButton';
                let newAnkiSpaceButton = document.createElement('div');
                newAnkiSpaceButton.textContent = '[...]+';
                newAnkiSpaceButton.className = 'setAnkiSpaceButton';
                //设置按钮的位置
                const selectedTextX = selectedText.getRangeAt(0).getBoundingClientRect().x;
                const selectedTextY = selectedText.getRangeAt(0).getBoundingClientRect().y;
                const selectedTextWidth = selectedText.getRangeAt(0).getBoundingClientRect().width;
                const selectedTextHeight = selectedText.getRangeAt(0).getBoundingClientRect().height;
                ankiSpaceButtonBox.appendChild(setAnkiSpaceButton);
                ankiSpaceButtonBox.appendChild(newAnkiSpaceButton);
                PopupCardContainer.appendChild(ankiSpaceButtonBox);
                const buttonX = ankiSpaceButtonBox.getBoundingClientRect().x;
                const buttonY = ankiSpaceButtonBox.getBoundingClientRect().y;
                console.log((selectedTextX - buttonX).toString());
                ankiSpaceButtonBox.style.position = 'relative';
                ankiSpaceButtonBox.style.left = (selectedTextX - buttonX + selectedTextWidth - 40).toString() + 'px';
                ankiSpaceButtonBox.style.top = (selectedTextY - buttonY - selectedTextHeight - 20).toString() + 'px';
                let range = selectedText.getRangeAt(0);
                setAnkiSpaceButton.addEventListener('click', (event) => {
                    var _a;
                    setAnkiSpace(range, selectedTextString, event, false);
                    (_a = ankiSpaceButtonBox.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(ankiSpaceButtonBox);
                });
                newAnkiSpaceButton.addEventListener('click', (event) => {
                    var _a;
                    setAnkiSpace(range, selectedTextString, event, true);
                    (_a = ankiSpaceButtonBox.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(ankiSpaceButtonBox);
                });
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
    console.log(selectedText);
    let span = document.createElement('span');
    const ankiSpace = container.getElementsByClassName('ankiSpace');
    console.log(ankiSpace);
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
    console.log(range);
    range === null || range === void 0 ? void 0 : range.deleteContents();
    range === null || range === void 0 ? void 0 : range.insertNode(span);
};


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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/content_script.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7QUN6eEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHNCQUFzQjtBQUN0QixzQkFBc0I7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQjtBQUNwQjs7QUFFQTtBQUNBLHVCQUF1QjtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FB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Q0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBOzs7OztXQ1ZBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1dDaERBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Db21wb25lbnRzL0N1c3RvbVByb21wdEZvcm0udHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbXBvbmVudHMvRHJvcGRvd25NZW51SXRlbS50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvQ29tcG9uZW50cy9JbWFnZXMudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbXBvbmVudHMvTmF2LnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvU2VsZWN0aW9uLnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvaW5kZXgudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC9zdHlsZS50cyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvdXRpbC50cyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9jb250ZW50X3NjcmlwdC50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvbGliL2xvY2FsZS50cyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9hc3NldHMvc2V0dGluZ0d1aWRlLnBuZyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jcmVhdGUgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXJtb255IG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DdXN0b21Qcm9tcHRGb3JtID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmZ1bmN0aW9uIEN1c3RvbVByb21wdEZvcm0ocHJvcHMpIHtcbiAgICBjb25zdCBbZm9ybV0gPSBhbnRkXzEuRm9ybS51c2VGb3JtKCk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIC8vIOabtOaWsCBpbnB1dCDmlofmnKzmoYbnmoTpu5jorqTlgLxcbiAgICAgICAgZm9ybS5zZXRGaWVsZHNWYWx1ZSh7XG4gICAgICAgICAgICB0aXRsZTogcHJvcHMuZGF0YS50aXRsZSxcbiAgICAgICAgICAgIGdldFVuc3BsYXNoSW1hZ2VzOiBwcm9wcy5kYXRhLmdldFVuc3BsYXNoSW1hZ2VzLFxuICAgICAgICAgICAgdXNlclByb21wdDogcHJvcHMuZGF0YS51c2VyUHJvbXB0XG4gICAgICAgIH0pO1xuICAgIH0sIFtwcm9wcy5kYXRhXSk7XG4gICAgLy8g5L+d5a2YIFByb21wdFxuICAgIGNvbnN0IHNhdmVQcm9tcHQgPSAodmFsdWVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOWFs+mXreihqOWNlVxuICAgICAgICBwcm9wcy5vcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogZmFsc2UsIGRhdGE6IHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9IH0pO1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpO1xuICAgICAgICAvLyDojrflj5blt7Lkv53lrZjnmoQgUHJvbXB0IExpc3RcbiAgICAgICAgY29uc3QgcHJvbXB0TGlzdCA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7IFwicHJvbXB0TGlzdFwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5wcm9tcHRMaXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IG5ld1Byb21wdHMgPSBwcm9tcHRMaXN0O1xuICAgICAgICAvLyDlpoLmnpwgcHJvcHMg5Lit5YyF5ZCrIElE77yM5YiZ6K+05piO5b2T5YmN5piv5Zyo57yW6L6RIFByb21wdCDogIzkuI3mmK/mlrDlop4gUHJvbXB0XG4gICAgICAgIGlmIChwcm9wcy5kYXRhLmlkICE9PSAnJykge1xuICAgICAgICAgICAgLy8g5ZyoIFByb21wdCDorrDlvZXkuK3mib7liLDov5nmnaEgUHJvbXB0XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1Byb21wdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3UHJvbXB0c1tpXVsnaWQnXSA9PT0gcHJvcHMuZGF0YS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyDkv67mlLlcbiAgICAgICAgICAgICAgICAgICAgbmV3UHJvbXB0c1tpXVsndGl0bGUnXSA9IHZhbHVlc1sndGl0bGUnXTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UHJvbXB0c1tpXVsnZ2V0VW5zcGxhc2hJbWFnZXMnXSA9IHZhbHVlc1snZ2V0VW5zcGxhc2hJbWFnZXMnXTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UHJvbXB0c1tpXVsndXNlclByb21wdCddID0gdmFsdWVzWyd1c2VyUHJvbXB0J107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5ld1Byb21wdHMgPSBbT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB2YWx1ZXMpLCB7ICdpZCc6IHRpbWVzdGFtcCB9KSwgLi4ucHJvbXB0TGlzdF07XG4gICAgICAgIH1cbiAgICAgICAgLy8g5bCGIFByb21wdCDkv53lrZjkuIvmnaVcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuc2V0KHtcbiAgICAgICAgICAgIHByb21wdExpc3Q6IG5ld1Byb21wdHMubGVuZ3RoID4gNiA/IG5ld1Byb21wdHMuc3BsaWNlKDAsIDYpIDogbmV3UHJvbXB0cyxcbiAgICAgICAgfSkudGhlbihpdGVtID0+IHtcbiAgICAgICAgICAgIC8vIOWwhiBQcm9tcHQg5Lyg5Zue57uZ54i257uE5Lu277yM5Lul6K6pIFByb21wdCDliJfooaggVUkg6YeN5paw5riy5p+TXG4gICAgICAgICAgICBwcm9wcy5oYW5kbGVQcm9tcHRFZGl0ZWQocHJvcHMuZGF0YS5pZCA9PT0gJycpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGFsZXJ0KCfwn6WyU2F2ZSBmYWlsZWQsIHBvc3NpYmx5IGR1ZSB0byBhIHRvbyBsb25nIFByb21wdC4gWW91IGNhbiBkZWxldGUgb3RoZXIgUHJvbXB0cyBvciBzaG9ydGVuIHRoZSBQcm9tcHQgY2hhcmFjdGVycyBhbmQgdHJ5IGFnYWluLiBcXG4nICsgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyDliKDpmaQgUHJvbXB0XG4gICAgY29uc3QgaGFuZGxlRGVsZXRlQnV0dG9uQ2xpY2sgPSAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOWFs+mXreihqOWNlVxuICAgICAgICBwcm9wcy5vcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogZmFsc2UsIGRhdGE6IHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9IH0pO1xuICAgICAgICAvLyDojrflj5blt7Lkv53lrZjnmoQgUHJvbXB0IExpc3RcbiAgICAgICAgY29uc3QgcHJvbXB0TGlzdCA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7IFwicHJvbXB0TGlzdFwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5wcm9tcHRMaXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IG5ld1Byb21wdHMgPSBwcm9tcHRMaXN0O1xuICAgICAgICAvLyDlnKggUHJvbXB0IOiusOW9leS4reaJvuWIsOi/meadoSBQcm9tcHRcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdQcm9tcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobmV3UHJvbXB0c1tpXVsnaWQnXSA9PT0gcHJvcHMuZGF0YS5pZCkge1xuICAgICAgICAgICAgICAgIC8vIOWIoOmZpFxuICAgICAgICAgICAgICAgIG5ld1Byb21wdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIC8vIOWwhiBQcm9tcHQg5L+d5a2Y5LiL5p2lXG4gICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbXB0TGlzdDogbmV3UHJvbXB0cy5sZW5ndGggPiA2ID8gbmV3UHJvbXB0cy5zcGxpY2UoMCwgNikgOiBuZXdQcm9tcHRzLFxuICAgICAgICAgICAgICAgIH0pLnRoZW4oaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWwhiBQcm9tcHQg5Lyg5Zue57uZ54i257uE5Lu277yM5Lul6K6pIFByb21wdCDliJfooaggVUkg6YeN5paw5riy5p+TXG4gICAgICAgICAgICAgICAgICAgIHByb3BzLmhhbmRsZVByb21wdEVkaXRlZChwcm9wcy5kYXRhLmlkID09PSAnJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH07XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybSwgeyBvbkZpbmlzaDogc2F2ZVByb21wdCwgXG4gICAgICAgICAgICAvLyBsYXlvdXQ9J2hvcml6b250YWwnXG4gICAgICAgICAgICBsYWJlbENvbDoge1xuICAgICAgICAgICAgICAgIHhzOiB7IHNwYW46IDYgfSxcbiAgICAgICAgICAgICAgICBzbTogeyBzcGFuOiA1IH0sXG4gICAgICAgICAgICB9LCBmb3JtOiBmb3JtIH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwidGl0bGVcIiwgbGFiZWw6IFwiVGl0bGVcIiwgcnVsZXM6IFt7IHJlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAnUGxlYXNlIGlucHV0IHlvdXIgdGl0bGUnIH1dIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLklucHV0LCB7IG1heExlbmd0aDogNDAsIG9uS2V5RG93bjogaGFuZGxlS2V5RG93biwgcGxhY2Vob2xkZXI6IFwiSG93IHRvIG5hbWUgdGhlIFByb21wdFwiLCB0eXBlOiBcInRleHRcIiB9KSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IGV4dHJhOiBcIkRpc3BsYXkgSW1hZ2VzIFJlbGF0ZWQgdG8gdGhlIFNlbGVjdGVkIFRleHRcIiwgbmFtZTogXCJnZXRVbnNwbGFzaEltYWdlc1wiLCBsYWJlbDogXCJJbWFnZXNcIiwgdmFsdWVQcm9wTmFtZTogXCJjaGVja2VkXCIgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuU3dpdGNoLCBudWxsKSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwidXNlclByb21wdFwiLCBsYWJlbDogXCJQcm9tcHRcIiwgZXh0cmE6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYCR7J3tzZWxlY3Rpb259J306IFNlbGVjdGVkIHRleHRgLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJyXCIsIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICBgJHsne3NlbnRlbmNlfSd9OiBTZW50ZW5jZSBjb250YWluaW5nIHRoZSBzZWxlY3RlZCB0ZXh0YCxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJiclwiLCBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI0YwOEEyNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiAoKSA9PiB3aW5kb3cub3BlbignaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9EeW5hbWljLVBsYWNlaG9sZGVycy01ZjA3MDUxNjNmZjY0MGFmYmRkNTc3MTE1ZGM5NTc3OT9wdnM9NCcpIH0sIFwiTGVhcm4gTW9yZVwiKSksIHJ1bGVzOiBbeyByZXF1aXJlZDogdHJ1ZSwgbWVzc2FnZTogJ1BsZWFzZSBpbnB1dCB5b3VyIHByb21wdCcgfV0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuSW5wdXQuVGV4dEFyZWEsIHsgcGxhY2Vob2xkZXI6IFwiVHJhbnNsYXRlIHtzZWxlY3Rpb259IHRvIENoaW5lc2VcIiwgb25LZXlEb3duOiBoYW5kbGVLZXlEb3duLCByb3dzOiA0LCBtYXhMZW5ndGg6IDMwMDAgfSkpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBzdHlsZTogeyBtYXJnaW46ICcwJyB9IH0sXG4gICAgICAgICAgICAgICAgcHJvcHMuZGF0YS5pZCAhPT0gJycgJiYgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICcxMnB4J1xuICAgICAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiBoYW5kbGVEZWxldGVCdXR0b25DbGljaywgZGFuZ2VyOiB0cnVlIH0sIFwiRGVsZXRlXCIpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHsgbWluV2lkdGg6ICcxMjBweCcgfSwgdHlwZTogXCJwcmltYXJ5XCIsIGh0bWxUeXBlOiBcInN1Ym1pdFwiIH0sIFwiU2F2ZVwiKSkpKSk7XG59XG5leHBvcnRzLkN1c3RvbVByb21wdEZvcm0gPSBDdXN0b21Qcm9tcHRGb3JtO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRHJvcGRvd25NZW51SXRlbSA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IERyb3Bkb3duTWVudSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQHJhZGl4LXVpL3JlYWN0LWRyb3Bkb3duLW1lbnVcIikpO1xuY29uc3QgcmVhY3RfaWNvbnNfMSA9IHJlcXVpcmUoXCJAcmFkaXgtdWkvcmVhY3QtaWNvbnNcIik7XG5mdW5jdGlvbiBEcm9wZG93bk1lbnVJdGVtKHByb3BzKSB7XG4gICAgY29uc3QgW2lzSG92ZXJlZCwgc2V0SXNIb3ZlcmVkXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgfSk7XG4gICAgY29uc3Qgb25TZWxlY3QgPSAoKSA9PiB7XG4gICAgICAgIHByb3BzLm9uU2VsZWN0KCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVFZGl0UHJvbXB0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBwcm9wcy5oYW5kbGVFZGl0UHJvbXB0KCk7XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5JdGVtLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnNnB4JyxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzRweCcsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcycHgnXG4gICAgICAgIH0sIGNsYXNzTmFtZTogXCJEcm9wZG93bk1lbnVJdGVtXCIsIG9uTW91c2VFbnRlcjogKCkgPT4gc2V0SXNIb3ZlcmVkKHRydWUpLCBvbk1vdXNlTGVhdmU6ICgpID0+IHNldElzSG92ZXJlZChmYWxzZSksIG9uU2VsZWN0OiBvblNlbGVjdCB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgIGZsZXg6ICcxJyxcbiAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnXG4gICAgICAgICAgICB9IH0sIHByb3BzLmNoaWxkcmVuKSxcbiAgICAgICAgaXNIb3ZlcmVkICYmIChwcm9wcy5kYXRhLmlkID09PSAnRGVmYXVsdCcgPyByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IG9uQ2xpY2s6ICgpID0+IHsgd2luZG93Lm9wZW4oJ2h0dHBzOi8vamlhbmd6aWxvbmcubm90aW9uLnNpdGUvV2hhdC1pcy10aGUtZGVmYXVsdC1Qcm9tcHQtUHJvbXB0LTViNTVlM2ZjMzAzZDQyNWY4Y2NhMTZkNWJlZTE5ZTdjJyk7IH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ljb25zXzEuUXVlc3Rpb25NYXJrQ2lyY2xlZEljb24sIG51bGwpKSA6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgb25DbGljazogaGFuZGxlRWRpdFByb21wdCB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfaWNvbnNfMS5QZW5jaWwySWNvbiwgbnVsbCkpKSkpO1xufVxuZXhwb3J0cy5Ecm9wZG93bk1lbnVJdGVtID0gRHJvcGRvd25NZW51SXRlbTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkltYWdlcyA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgaWNvbnNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9pY29uc1wiKTtcbmZ1bmN0aW9uIEltYWdlcyhwcm9wcykge1xuICAgIGNvbnN0IFtpbWFnZXMsIHNldEltYWdlc10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoW10pO1xuICAgIGNvbnN0IFtpbWFnZUluZGV4LCBzZXRJbWFnZUluZGV4XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgwKTtcbiAgICBjb25zdCBbc2hvd0NvbnRyb2wsIHNldFNob3dDb250cm9sXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3QgW2NoYW5nZUltYWdlLCBzZXRDaGFuZ2VJbWFnZVN0YXR1c10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIC8vIGNvbnN0IFtzZWFyY2hJbWFnZUlzTG9hZGluZywgc2V0U2VhcmNoSW1hZ2VJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gICAgLy8gY29uc3QgW2N1cnJlbnRVUkwsIHNldEN1cnJlbnRVUkxdID0gdXNlU3RhdGU8c3RyaW5nPigpO1xuICAgIGNvbnN0IGlucHV0RWxlbWVudCA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIHNldEltYWdlcyhwcm9wcy5pbWFnZXMpO1xuICAgICAgICBzZXRJbWFnZUluZGV4KDApO1xuICAgIH0sIFtwcm9wcy5pbWFnZXNdKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpbnB1dEVsZW1lbnQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpbnB1dEVsZW1lbnQuY3VycmVudCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGlucHV0RWxlbWVudC5jdXJyZW50Py5pbnB1dCk7XG4gICAgICAgIChfYSA9IGlucHV0RWxlbWVudC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9jdXMoKTtcbiAgICB9LCBbY2hhbmdlSW1hZ2VdKTtcbiAgICBjb25zdCBoYW5kbGVFZGl0SW1hZ2VzQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHNldENoYW5nZUltYWdlU3RhdHVzKHRydWUpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlU2VhcmNoSW5wdXQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVTZWFyY2hCdG5DbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgbGV0IGlucHV0VmFsdWUgPSAoX2IgPSAoX2EgPSBpbnB1dEVsZW1lbnQuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlucHV0KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudmFsdWU7XG4gICAgICAgIGlmIChpbnB1dFZhbHVlICYmIGlucHV0VmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICBwcm9wcy5nZXRVbnNwbGFzaEltYWdlcyhpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgIHNldENoYW5nZUltYWdlU3RhdHVzKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlSW1hZ2VzQ2xpY2sgPSAob2Zmc2V0KSA9PiB7XG4gICAgICAgIHNldEltYWdlSW5kZXgoaW5kZXggPT4ge1xuICAgICAgICAgICAgaW5kZXggPSBpbmRleCArIG9mZnNldDtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSBpbWFnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaW1hZ2VzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyDpooTliqDovb3kuIvkuIDlvKDlm75cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUltYWdlc0JveEhvdmVyID0gKGUpID0+IHtcbiAgICAgICAgaWYgKGUudHlwZSA9PT0gJ21vdXNlZW50ZXInKSB7XG4gICAgICAgICAgICBzZXRTaG93Q29udHJvbCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS50eXBlID09PSAnbW91c2VsZWF2ZScpIHtcbiAgICAgICAgICAgIHNldFNob3dDb250cm9sKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbWFnZXNcIiwgc3R5bGU6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogJzhweCdcbiAgICAgICAgfSB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBvbk1vdXNlRW50ZXI6IGhhbmRsZUltYWdlc0JveEhvdmVyLCBvbk1vdXNlTGVhdmU6IGhhbmRsZUltYWdlc0JveEhvdmVyIH0sXG4gICAgICAgICAgICAgICAgaW1hZ2VzLmxlbmd0aCA+IDAgP1xuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbWFnZUJveFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkltYWdlLCB7IFwiZGF0YS1kb3dubG9hZGxvY2F0aW9uXCI6IGltYWdlc1tpbWFnZUluZGV4XS5saW5rcy5kb3dubG9hZF9sb2NhdGlvbiwgc3JjOiBpbWFnZXNbaW1hZ2VJbmRleF0udXJscy5zbWFsbCwgYWx0OiBpbWFnZXNbaW1hZ2VJbmRleF1bJ2Rlc2NyaXB0aW9uJ10sIGhlaWdodDogMjQwLCB3aWR0aDogJzEwMCUnLCBwcmV2aWV3OiBmYWxzZSwgcGxhY2Vob2xkZXI6IHRydWUgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sIGltYWdlcy5tYXAoaW1nID0+IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsga2V5OiBpbWcuaWQsIHNyYzogaW1nLnVybHMuc21hbGwgfSkpKSlcbiAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcyNDBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMDYpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRW1wdHksIHsgc3R5bGU6IHsgbWFyZ2luOiAnMCBhdXRvJyB9LCBkZXNjcmlwdGlvbjogJ05vIHJlbGF0ZWQgcGljdHVyZXMgZm91bmQnLCBpbWFnZTogYW50ZF8xLkVtcHR5LlBSRVNFTlRFRF9JTUFHRV9TSU1QTEUgfSkpLFxuICAgICAgICAgICAgICAgIHNob3dDb250cm9sICYmXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICc1MCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMCAycHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYXJvdW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzZweCAxMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAnMHB4IDE4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDM2MGRlZywgcmdiYSgwLCAwLCAwLCAwKSAwJSwgcmdiYSgwLCAwLCAwLCAwLjEpIDI3LjYlLCByZ2JhKDAsIDAsIDAsIDAuMikgNTQuNjklLCByZ2JhKDAsIDAsIDAsIDAuMzUpIDEwMCUpJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgY2hhbmdlSW1hZ2UgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaYvuekuuWbvueJh+aQnOe0ouaOp+S7tlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzJweCAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgZmxleDogJzEnLCBtYXJnaW5SaWdodDogJzIwcHgnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbnB1dCwgeyBwcmVmaXg6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuU2VhcmNoT3V0bGluZWQsIG51bGwpLCBwbGFjZWhvbGRlcjogXCJTZWFyY2ggaW1hZ2VzXCIsIG9uS2V5RG93bjogaGFuZGxlU2VhcmNoSW5wdXQsIHNpemU6IFwic21hbGxcIiwgc3R5bGU6IHsgd2lkdGg6ICcxMDAlJyB9LCByZWY6IGlucHV0RWxlbWVudCwgb25QcmVzc0VudGVyOiBoYW5kbGVTZWFyY2hCdG5DbGljayB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIHN0eWxlOiB7IGNvbG9yOiAnI2ZmZicsIG1hcmdpbkJvdHRvbTogJzRweCcsIG1hcmdpblJpZ2h0OiAnMTBweCcgfSwgb25DbGljazogaGFuZGxlU2VhcmNoQnRuQ2xpY2ssIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuQ2hlY2tPdXRsaW5lZCwgbnVsbCkgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIHN0eWxlOiB7IGNvbG9yOiAnI2ZmZicsIG1hcmdpbkJvdHRvbTogJzRweCcgfSwgb25DbGljazogKCkgPT4gc2V0Q2hhbmdlSW1hZ2VTdGF0dXMoZmFsc2UpLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkNsb3NlT3V0bGluZWQsIG51bGwpIH0pKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaYvuekuuWbvueJh+WvvOiIquaOp+S7tlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhHcm93OiAnaW5oZXJpdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzEwMCUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0eXBlOiBcInRleHRcIiwgc2l6ZTogXCJzbWFsbFwiLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkxlZnRPdXRsaW5lZCwgbnVsbCksIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUNoYW5nZUltYWdlc0NsaWNrKC0xKSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnNDBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICc1MDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcwIDRweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiAnNHB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBpbWFnZUluZGV4ICsgMSArICcvJyArIGltYWdlcy5sZW5ndGgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMTAwJSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuUmlnaHRPdXRsaW5lZCwgbnVsbCksIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUNoYW5nZUltYWdlc0NsaWNrKDEpIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93LXJldmVyc2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiAnMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdlbmQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgdHlwZTogXCJ0ZXh0XCIsIHNpemU6IFwic21hbGxcIiwgc3R5bGU6IHsgY29sb3I6ICcjZmZmJyB9LCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVFZGl0SW1hZ2VzQ2xpY2soKSwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5Gb3JtT3V0bGluZWQsIG51bGwpIH0pKSkpKSksXG4gICAgICAgICAgICBpbWFnZXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMC45MmVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjQpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJzRweCdcbiAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICBcIlBob3RvIGJ5IFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBzdHlsZTogeyB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScgfSwgdGFyZ2V0OiAnX2JsYW5rJywgaHJlZjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9AXCIgKyBpbWFnZXNbaW1hZ2VJbmRleF0udXNlci51c2VybmFtZSArIFwiP3V0bV9zb3VyY2U9U2NvdXRlciZ1dG1fbWVkaXVtPXJlZmVycmFsXCIgfSwgaW1hZ2VzW2ltYWdlSW5kZXhdLnVzZXIubmFtZSksXG4gICAgICAgICAgICAgICAgICAgIFwiIG9uIFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBzdHlsZTogeyB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScgfSwgdGFyZ2V0OiAnX2JsYW5rJywgaHJlZjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS8/dXRtX3NvdXJjZT1TY291dGVyJnV0bV9tZWRpdW09cmVmZXJyYWxcIiB9LCBcIlVuc3BsYXNoXCIpKSkpKTtcbn1cbmV4cG9ydHMuSW1hZ2VzID0gSW1hZ2VzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTmF2ID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IERyb3Bkb3duTWVudSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQHJhZGl4LXVpL3JlYWN0LWRyb3Bkb3duLW1lbnVcIikpO1xuY29uc3QgRHJvcGRvd25NZW51SXRlbV8xID0gcmVxdWlyZShcIi4vRHJvcGRvd25NZW51SXRlbVwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi9Qb3B1cENhcmQvdXRpbFwiKTtcbmNvbnN0IHJlYWN0X2ljb25zXzEgPSByZXF1aXJlKFwiQHJhZGl4LXVpL3JlYWN0LWljb25zXCIpO1xuLy8gaW1wb3J0IHR5cGUgeyBNZW51UHJvcHMgfSBmcm9tICdhbnRkJztcbmNvbnN0IGNvbnRlbnRfc2NyaXB0XzEgPSByZXF1aXJlKFwiLi4vY29udGVudF9zY3JpcHRcIik7XG5jb25zdCBpY29uc18xID0gcmVxdWlyZShcIkBhbnQtZGVzaWduL2ljb25zXCIpO1xuZnVuY3Rpb24gTmF2KHByb3BzKSB7XG4gICAgY29uc3QgW2lzUGluLCBzZXRJc1Bpbl0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtjdXJyZW50VVJMLCBzZXRDdXJyZW50VVJMXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgpO1xuICAgIGNvbnN0IFtpc09wZW5Qcm9tcHRNZW51LCBzZXRJc09wZW5Qcm9tcHRNZW51XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgLy8gY29uc3QgeyBPcHRpb24gfSA9IFNlbGVjdDtcbiAgICBjb25zdCBuYXZFbGVtZW50ID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICBjb25zdCBkZWZhdWx0UHJvbXB0ID0gKDAsIHV0aWxfMS5nZXREZWZhdWx0UHJvbXB0KSgnJyk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgfSwgW10pO1xuICAgIC8vIOeCueWHu+S/neWtmOWIsCBBbmtpIOaMiemSrlxuICAgIGNvbnN0IGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljayA9ICgpID0+IHtcbiAgICAgICAgcHJvcHMuaGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrKCk7XG4gICAgfTtcbiAgICAvLyDngrnlh7sgUGluIOaMiemSrlxuICAgIGNvbnN0IGhhbmRsZVBpbkJ0bkNsaWNrID0gKCkgPT4ge1xuICAgICAgICBpZiAoaXNQaW4pIHtcbiAgICAgICAgICAgICgwLCBjb250ZW50X3NjcmlwdF8xLnBpblBvcHVwQ2FyZCkoZmFsc2UpO1xuICAgICAgICAgICAgc2V0SXNQaW4oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgKDAsIGNvbnRlbnRfc2NyaXB0XzEucGluUG9wdXBDYXJkKSh0cnVlKTtcbiAgICAgICAgICAgIHNldElzUGluKHRydWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyDlnKggQW5raSDkuK3miZPlvIDnrJTorrBcbiAgICBjb25zdCBlZGl0Tm90ZUluQW5raSA9IChub3RlSWQpID0+IHtcbiAgICAgICAgbGV0IHNlbmRpbmcgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdndWlFZGl0Tm90ZScsICdtZXNzYWdlcyc6IHsgJ2Fua2lfYWN0aW9uX3R5cGUnOiAnZ3VpRWRpdE5vdGUnLCAnYW5raV9hcmd1bWVudHMnOiB7ICdub3RlJzogbm90ZUlkIH0sIH0gfSk7XG4gICAgICAgIHNlbmRpbmcudGhlbigobWVzc2FnZSkgPT4ge1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAvL2Vycm9yXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy8g5omT5byAIFByb21wdCDnvJbovpHnqpflj6NcbiAgICBjb25zdCBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSA9IChkYXRhKSA9PiB7XG4gICAgICAgIHByb3BzLm9wZW5DdXN0b21Qcm9tcHRGb3JtKGRhdGEpO1xuICAgICAgICBzZXRJc09wZW5Qcm9tcHRNZW51KGZhbHNlKTtcbiAgICB9O1xuICAgIC8vIFByb21wdCDoj5zljZUgaXRlbSDngrnlh7tcbiAgICBjb25zdCBoYW5kbGVNZW51SXRlbUNsaWNrID0gKGRhdGEpID0+IHtcbiAgICAgICAgLy8g56ysIDMg5Liq5Y+C5pWwIGZhbHNlIOihqOekuuS4jemHjeaWsOa4suafk+WbvueJh1xuICAgICAgICAvLyDlpoLmnpzkuIrkuIDkuKogUHJvbXB0IOaYr+S4jeaYvuekuuWbvueJh++8jOS4lOW9k+WJjSBQcm9tcHQg6ZyA6KaB5pi+56S65Zu+54mH77yM5YiZ5pys5qyh5Lu75Yqh6ZyA6KaB5riy5p+T5Zu+54mH77yM5ZCm5YiZ5LiN6YeN5paw5riy5p+T5Zu+54mHXG4gICAgICAgIGlmIChwcm9wcy5sYXN0RXhlY3V0ZWRQcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMgIT09IHRydWUgJiYgZGF0YS5nZXRVbnNwbGFzaEltYWdlcykge1xuICAgICAgICAgICAgcHJvcHMuaGFuZGxlTWVudUl0ZW1DbGljayhkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHByb3BzLmhhbmRsZU1lbnVJdGVtQ2xpY2soZGF0YSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBvbk1lbnVPcGVuQ2hhbmdlID0gKG9wZW4pID0+IHtcbiAgICAgICAgLy8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgc2V0SXNPcGVuUHJvbXB0TWVudShvcGVuKTtcbiAgICB9O1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQ29uZmlnUHJvdmlkZXIsIHsgdGhlbWU6IHtcbiAgICAgICAgICAgICAgICB0b2tlbjoge1xuICAgICAgICAgICAgICAgICAgICBjb2xvclByaW1hcnk6ICcjRjA4QTI0JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBpZDogXCJTY291dGVyTmF2XCIsIHJlZjogbmF2RWxlbWVudCwgY2xhc3NOYW1lOiAncC00Jywgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAnbW92ZScsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLCB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogOVxuICAgICAgICAgICAgICAgIH0sIG9uTW91c2VEb3duOiBwcm9wcy5vbk1vdXNlRG93biB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgekluZGV4OiA5IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51LlJvb3QsIHsgb3BlbjogaXNPcGVuUHJvbXB0TWVudSwgbW9kYWw6IGZhbHNlLCBvbk9wZW5DaGFuZ2U6IG9uTWVudU9wZW5DaGFuZ2UgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5UcmlnZ2VyLCB7IGFzQ2hpbGQ6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJJY29uQnV0dG9uXCIsIFwiYXJpYS1sYWJlbFwiOiBcIkN1c3RvbWlzZSBvcHRpb25zXCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICcycHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAnMTcwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgcHJvcHMubGFzdEV4ZWN1dGVkUHJvbXB0LnRpdGxlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfaWNvbnNfMS5IYW1idXJnZXJNZW51SWNvbiwgbnVsbCkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5Qb3J0YWwsIHsgY29udGFpbmVyOiBuYXZFbGVtZW50LmN1cnJlbnQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnUuQ29udGVudCwgeyBjbGFzc05hbWU6IFwiRHJvcGRvd25NZW51Q29udGVudFwiLCBhbGlnbjogJ3N0YXJ0Jywgc2lkZU9mZnNldDogNSwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAnZGVmYXVsdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTgwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAnMHB4IDEwcHggMzhweCAtMTBweCByZ2JhKDIyLCAyMywgMjQsIDAuMzUpLCAwcHggMTBweCAyMHB4IC0xNXB4IHJnYmEoMjIsIDIzLCAyNCwgMC4yKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246ICc0MDBtcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb3pBbmltYXRpb25UaW1pbmdGdW5jdGlvbjogJ2N1YmljLWJlemllcigwLjE2LCAxLCAwLjMsIDEpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbGxDaGFuZ2U6ICd0cmFuc2Zvcm0sIG9wYWNpdHknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51SXRlbV8xLkRyb3Bkb3duTWVudUl0ZW0sIHsga2V5OiBkZWZhdWx0UHJvbXB0LmlkLCBkYXRhOiBkZWZhdWx0UHJvbXB0LCBvblNlbGVjdDogKCkgPT4gaGFuZGxlTWVudUl0ZW1DbGljayhkZWZhdWx0UHJvbXB0KSwgaGFuZGxlRWRpdFByb21wdDogKCkgPT4gb3BlbkN1c3RvbVByb21wdEZvcm0oeyBpc09wZW46IHRydWUsIGRhdGE6IGRlZmF1bHRQcm9tcHQgfSkgfSwgZGVmYXVsdFByb21wdC50aXRsZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLnByb21wdHMubWFwKGl0ZW0gPT4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51SXRlbV8xLkRyb3Bkb3duTWVudUl0ZW0sIHsga2V5OiBpdGVtLmlkLCBkYXRhOiBpdGVtLCBvblNlbGVjdDogKCkgPT4gaGFuZGxlTWVudUl0ZW1DbGljayhpdGVtKSwgaGFuZGxlRWRpdFByb21wdDogKCkgPT4gb3BlbkN1c3RvbVByb21wdEZvcm0oeyBpc09wZW46IHRydWUsIGRhdGE6IGl0ZW0gfSkgfSwgaXRlbS50aXRsZSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnUuU2VwYXJhdG9yLCB7IGNsYXNzTmFtZTogXCJEcm9wZG93bk1lbnVTZXBhcmF0b3JcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMucHJvbXB0cy5sZW5ndGggPCA2ID8gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZTogeyBtYXJnaW5Ub3A6ICc0cHgnIH0sIHNpemU6ICdzbWFsbCcsIG9uQ2xpY2s6ICgpID0+IG9wZW5DdXN0b21Qcm9tcHRGb3JtKHsgaXNPcGVuOiB0cnVlLCBkYXRhOiB7ICd0aXRsZSc6ICcnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBmYWxzZSwgJ3VzZXJQcm9tcHQnOiAnJywgJ2lkJzogJycgfSB9KSB9LCBcIkNyZWF0ZSBwcm9tcHRcIikgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZTogeyBtYXJnaW5Ub3A6ICc0cHgnIH0sIHNpemU6ICdzbWFsbCcsIGRpc2FibGVkOiB0cnVlIH0sIFwiQXQgbW9zdCA3IFByb21wdHNcIikpKSkpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInJpZ2h0QnRuQm94XCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdlbmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5hZGRUb0Fua2lTdGF0dXMuc3RhdHVzID09ICdzdWNjZXNzJyA/IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5DaGVja0NpcmNsZVR3b1RvbmUsIHsgdHdvVG9uZUNvbG9yOiBcIiM1MmM0MWFcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIEFkZGVkIHRvIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9uQ2xpY2s6IGVkaXROb3RlSW5BbmtpLmJpbmQoZXZlbnQsIHByb3BzLmFkZFRvQW5raVN0YXR1cy5ub3RlSWQpIH0sIFwiQW5raVwiKSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzaXplOiBcInNtYWxsXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHR5cGU9J3RleHQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMy4ycHgnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5QbHVzU3F1YXJlT3V0bGluZWQsIG51bGwpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsb2FkaW5nPXtwcm9wcy5hZGRUb0Fua2lTdGF0dXMgPT09ICdsb2FkaW5nJyA/IHRydWUgOiBmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogcHJvcHMuYWRkVG9BbmtpU3RhdHVzLnN0YXR1cyA9PT0gJ3N0YW5kYnknIHx8IHByb3BzLmFkZFRvQW5raVN0YXR1cy5zdGF0dXMgPT09ICdsb2FkaW5nJyA/IHRydWUgOiBmYWxzZSwgb25DbGljazogaGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrIH0sIHByb3BzLmFkZFRvQW5raVN0YXR1cy5zdGF0dXMgPT09ICdsb2FkaW5nJyA/ICdBZGRpbmcuLi4nIDogJ0FkZCB0byBBbmtpJyksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc2l6ZTogJ3NtYWxsJywgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogaXNQaW4gPyAnI0YwOEEyNCcgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzEzLjJweCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGljb246IGlzUGluID8gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5QdXNocGluRmlsbGVkLCB7IGNsYXNzTmFtZTogJ2lzUGluJyB9KSA6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuUHVzaHBpbk91dGxpbmVkLCBudWxsKSwgb25DbGljazogaGFuZGxlUGluQnRuQ2xpY2sgfSkpKSkpKTtcbn1cbmV4cG9ydHMuTmF2ID0gTmF2O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2VsZWN0aW9uID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgbG9jYWxlXzEgPSByZXF1aXJlKFwiLi4vbGliL2xvY2FsZVwiKTtcbmNvbnN0IGxhbmdfMSA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbmNvbnN0IGljb25zXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7XG4vLyBjb25zdCB1c2VTdHlsZXMgPSBjcmVhdGVVc2VTdHlsZXMoe1xuLy8gICBtb3JlQnV0dG9uOiB7XG4vLyAgICAgY29sb3I6ICcjRjA4QTI0Jyxcbi8vICAgICBcIiY6aG92ZXJcIjoge1xuLy8gICAgICAgY29sb3I6ICdyZWQnXG4vLyAgICAgfVxuLy8gICB9LFxuLy8gfSlcbmNvbnN0IHN0eWxlID0gYFxuICAjU2NvdXRlclNlbGVjdGlvbj5zcGFuIHtcbiAgICBmb250LXNpdGU6MTJweDtcbiAgICBjb2xvcjojNjY2O1xuICB9XG4gIC5tb3JlQnV0dG9uIHtcbiAgICBjb2xvcjogI0YwOEEyNDtcbiAgICBjdXJzb3I6cG9pbnRlcjtcbiAgICBtYXJnaW46MHB4IDJweDtcbiAgfVxuICAubW9yZUJ1dHRvbjpob3ZlciB7XG4gICAgb3BhY2l0eTowLjg7XG4gIH1cblxuYDtcbmZ1bmN0aW9uIFNlbGVjdGlvbihwcm9wcykge1xuICAgIGNvbnN0IFt0YXJnZXRMYW5ndWFnZSwgc2V0VGFyZ2V0TGFuZ3VhZ2VdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKCdFbmdsaXNoJyk7XG4gICAgY29uc3QgW3Nob3dGdWxsVGV4dCwgc2V0U2hvd0Z1bGxUZXh0XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh0cnVlKTtcbiAgICBjb25zdCBbcGxheVN0YXR1cywgc2V0UGxheVN0YXR1c10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIC8vIOiOt+WPlueUqOaIt+iuvue9rueahOivreiogOS/oeaBr1xuICAgIGxldCBMYW5nID0gKDAsIGxvY2FsZV8xLnVzZUN1cnJlbnRMYW5ndWFnZSkoKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgc2V0VGFyZ2V0TGFuZ3VhZ2UoTGFuZ1sndGFyZ2V0J11bJ2lkJ10pO1xuICAgICAgICBzZXRTaG93RnVsbFRleHQocHJvcHMudGV4dC5sZW5ndGggPD0gMTQwKTtcbiAgICAgICAgc2V0UGxheVN0YXR1cyhmYWxzZSk7XG4gICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIob25TdG9yYWdlQ2hhbmdlKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5vbkNoYW5nZWQucmVtb3ZlTGlzdGVuZXIob25TdG9yYWdlQ2hhbmdlKTtcbiAgICAgICAgfTtcbiAgICB9LCBbcHJvcHMudGV4dF0pO1xuICAgIC8vIOivremfs+aSreaKpVxuICAgIGNvbnN0IHNwZWFrZXIgPSAoKSA9PiB7XG4gICAgICAgIC8vIOivhuWIq+ivreiogFxuICAgICAgICAvLyBjb25zdCBsbmdEZXRlY3RvciA9IG5ldyBMYW5ndWFnZURldGVjdCgpO1xuICAgICAgICAvLyBsbmdEZXRlY3Rvci5zZXRMYW5ndWFnZVR5cGUoJ2lzbzInKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhsbmdEZXRlY3Rvci5kZXRlY3QocHJvcHMudGV4dCwgMikpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgKDAsIHV0aWxfMS5wbGF5VGV4dFRvU3BlZWNoKShwcm9wcy50ZXh0LCBsYW5nXzEubGFuZ3VhZ2VDb2Rlc1t0YXJnZXRMYW5ndWFnZV0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8g5pqC5YGc5LiK5LiA5qyh5pKt5oql5Lu75YqhXG4gICAgICAgICAgICBzcGVlY2hTeW50aGVzaXMuY2FuY2VsKCk7XG4gICAgICAgICAgICBjb25zdCB1dHRlcmFuY2UgPSBuZXcgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKHByb3BzLnRleHQpO1xuICAgICAgICAgICAgLy8g6K+t56eNXG4gICAgICAgICAgICB1dHRlcmFuY2UubGFuZyA9IGxhbmdfMS5sYW5ndWFnZUNvZGVzW3RhcmdldExhbmd1YWdlXTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGxhbmd1YWdlQ29kZXNbdGFyZ2V0TGFuZ3VhZ2UgYXMga2V5b2YgdHlwZW9mIGxhbmd1YWdlQ29kZXNdKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRhcmdldExhbmd1YWdlKTtcbiAgICAgICAgICAgIC8vIOivremAn1xuICAgICAgICAgICAgaWYgKHBsYXlTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAvLyDln7rmlbDmrKHmkq3mlL7ml7bph4fnlKjmhaLpgJ/mkq3mlL7vvIzorqnnlKjmiLflj6/ku6XlkKznmoTmm7TmuIXmpZpcbiAgICAgICAgICAgICAgICB1dHRlcmFuY2UucmF0ZSA9IDAuNjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHV0dGVyYW5jZS5yYXRlID0gMC44NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFBsYXlTdGF0dXMoIXBsYXlTdGF0dXMpO1xuICAgICAgICAgICAgLy8g5byA5pKt5ZCnXG4gICAgICAgICAgICBzcGVlY2hTeW50aGVzaXMuc3BlYWsodXR0ZXJhbmNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3Qgb25TdG9yYWdlQ2hhbmdlID0gKGNoYW5nZXMsIGFyZWEpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2hhbmdlcyk7XG4gICAgICAgIC8vIOabtOaWsOebruagh+ivreiogFxuICAgICAgICBpZiAoJ3RhcmdldExhbmd1YWdlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY2hhbmdlcycpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY2hhbmdlc1sndGFyZ2V0TGFuZ3VhZ2UnXVsnbmV3VmFsdWUnXSk7XG4gICAgICAgICAgICBzZXRUYXJnZXRMYW5ndWFnZShjaGFuZ2VzWyd0YXJnZXRMYW5ndWFnZSddWyduZXdWYWx1ZSddKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlVG9nZ2xlU2hvd0Z1blRleHQgPSAoKSA9PiB7XG4gICAgICAgIHNldFNob3dGdWxsVGV4dCghc2hvd0Z1bGxUZXh0KTtcbiAgICB9O1xuICAgIC8vIGNvbnN0IGNsYXNzZXMgPSB1c2VTdHlsZXMoKVxuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIsIG51bGwsIHN0eWxlKSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBpZDogXCJTY291dGVyU2VsZWN0aW9uXCIsIGNsYXNzTmFtZTogJycsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogJzEwcHgnXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICBzaG93RnVsbFRleHQgPyByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHByb3BzLnRleHQpLFxuICAgICAgICAgICAgICAgIHByb3BzLnRleHQubGVuZ3RoID4gMTQwICYmIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGNsYXNzTmFtZTogJ21vcmVCdXR0b24nLCBvbkNsaWNrOiBoYW5kbGVUb2dnbGVTaG93RnVuVGV4dCB9LCBcIkxlc3NcIikpXG4gICAgICAgICAgICAgICAgOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBwcm9wcy50ZXh0LnN1YnN0cmluZygwLCAxNDApICsgJy4uLicpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBjbGFzc05hbWU6ICdtb3JlQnV0dG9uJywgb25DbGljazogaGFuZGxlVG9nZ2xlU2hvd0Z1blRleHQgfSwgXCJNb3JlXCIpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICcycHgnXG4gICAgICAgICAgICAgICAgfSwgc2l6ZTogXCJzbWFsbFwiLCB0eXBlOiBcInRleHRcIiwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5DdXN0b21lclNlcnZpY2VPdXRsaW5lZCwgbnVsbCksIG9uQ2xpY2s6IHNwZWFrZXIgfSkpKSk7XG59XG5leHBvcnRzLlNlbGVjdGlvbiA9IFNlbGVjdGlvbjtcbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUG9wdXBDYXJkID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG4vLyBpbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuY29uc3QgcmVhY3RfbWFya2Rvd25fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3QtbWFya2Rvd25cIikpO1xuY29uc3QgcmVtYXJrX2JyZWFrc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZW1hcmstYnJlYWtzXCIpKTtcbmNvbnN0IHJlaHlwZV9yYXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVoeXBlLXJhd1wiKSk7XG5jb25zdCByZW1hcmtfZ2ZtXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlbWFyay1nZm1cIikpO1xuY29uc3QgcmVhY3Rfc3ByaW5nXzEgPSByZXF1aXJlKFwicmVhY3Qtc3ByaW5nXCIpO1xuY29uc3QgY29udGVudF9zY3JpcHRfMSA9IHJlcXVpcmUoXCIuLi9jb250ZW50X3NjcmlwdFwiKTtcbmNvbnN0IE5hdl8xID0gcmVxdWlyZShcIi4uL0NvbXBvbmVudHMvTmF2XCIpO1xuY29uc3QgQ3VzdG9tUHJvbXB0Rm9ybV8xID0gcmVxdWlyZShcIi4uL0NvbXBvbmVudHMvQ3VzdG9tUHJvbXB0Rm9ybVwiKTtcbmNvbnN0IEltYWdlc18xID0gcmVxdWlyZShcIi4uL0NvbXBvbmVudHMvSW1hZ2VzXCIpO1xuY29uc3QgU2VsZWN0aW9uXzEgPSByZXF1aXJlKFwiLi9TZWxlY3Rpb25cIik7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IGljb25zXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7XG5jb25zdCBzZXR0aW5nR3VpZGVfcG5nXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2Fzc2V0cy9zZXR0aW5nR3VpZGUucG5nXCIpKTtcbmNvbnN0IGxvY2FsZV8xID0gcmVxdWlyZShcIi4uL2xpYi9sb2NhbGVcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xubGV0IGN1cnJlbnRMYW5ndWFnZTtcbmxldCB0YXJnZXRMYW5ndWFnZTtcbi8vIC8vIOS9v+eUqOmVv+i/nuaOpVxuLy8gbGV0IHBvcnQgPSBicm93c2VyLnJ1bnRpbWUuY29ubmVjdCh7XG4vLyAgIG5hbWU6ICdmcm9tUG9wdXBDYXJkJ1xuLy8gfSlcbmxldCBhbmtpQ2FyZHM7XG4oMCwgdXRpbF8xLmdldEFua2lDYXJkcykoKS50aGVuKChjYXJkcykgPT4ge1xuICAgIGFua2lDYXJkcyA9IGNhcmRzO1xufSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coZXJyb3IpO1xufSk7XG5jb25zdCB7IFRleHRBcmVhIH0gPSBhbnRkXzEuSW5wdXQ7XG5jb25zdCBBbmtpQ29udGV4dCA9ICgwLCByZWFjdF8xLmNyZWF0ZUNvbnRleHQpKG51bGwpO1xuZnVuY3Rpb24gUG9wdXBDYXJkKHByb3BzKSB7XG4gICAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoW3sgJ2NvbnRlbnQnOiAnJywgJ3JvbGUnOiAndXNlcicsICdsb2FkaW5nJzogZmFsc2UsICdjaGF0SWQnOiAnJywgJ3Byb21wdCc6ICcnLCAnc3RhdHVzJzogJycgfV0pO1xuICAgIGNvbnN0IFtpbWFnZXMsIHNldEltYWdlc10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoW10pO1xuICAgIGNvbnN0IFtzaG93SW1hZ2VzQm94LCBzZXRTaG93SW1hZ2VzQm94XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3QgW3Byb21wdHMsIHNldFByb21wdHNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKFtdKTtcbiAgICBjb25zdCBbbGFzdEV4ZWN1dGVkUHJvbXB0LCBzZXRMYXN0RXhlY3V0ZWRQcm9tcHRdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHsgJ3RpdGxlJzogJ/CfkYnwn4+8IFBsZWFzZSBjaG9vc2UgYSBwcm9tcHQnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBmYWxzZSwgJ3VzZXJQcm9tcHQnOiAnJywgJ2lkJzogJycgfSk7XG4gICAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh0cnVlKTtcbiAgICBjb25zdCBbaXNQb3BvdmVyT3Blbiwgc2V0UG9wb3Zlck9wZW5dID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbY3VzdG9tUHJvbXB0Rm9ybURhdGEsIHNldEN1c3RvbVByb21wdEZvcm1EYXRhXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7ICd0aXRsZSc6ICcnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBmYWxzZSwgJ3VzZXJQcm9tcHQnOiAnJywgJ2lkJzogJycgfSk7XG4gICAgLy8gc3RhbmRieSxub3JtYWwsbG9hZGluZyxzdWNjZXNzXG4gICAgY29uc3QgW2FkZFRvQW5raVN0YXR1cywgc2V0QWRkVG9BbmtpU3RhdHVzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7ICdzdGF0dXMnOiAnc3RhbmRieScsICdub3RlSWQnOiAwIH0pO1xuICAgIGNvbnN0IFtpc0Fuc3dlckRvbmUsIHNldEFuc3dlckRvbmVdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbaXNBcGlFcnJvLCBzZXRJc0FwaUVycm9dID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbaXNBbnN3ZXJJbnB1dGVkLCBzZXRJc0Fuc3dlcklucHV0ZWRdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICAvLyDnqpflj6Pmi5bmi73pgLvovpFcbiAgICBjb25zdCBbZHJhZ2dpbmcsIHNldERyYWdnaW5nXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3Qgd2luZG93RWxlbWVudCA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3QgbWVzc2FnZXNMaXN0ID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICBjb25zdCBpbnB1dFJlZiA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3Qgc2hvdWxkU3RheUF0Qm90dG9tUmVmID0gKDAsIHJlYWN0XzEudXNlUmVmKShmYWxzZSk7XG4gICAgY29uc3QgW2Zvcm1dID0gYW50ZF8xLkZvcm0udXNlRm9ybSgpO1xuICAgIGxldCBMYW5nID0gKDAsIGxvY2FsZV8xLnVzZUN1cnJlbnRMYW5ndWFnZSkoKTtcbiAgICBjdXJyZW50TGFuZ3VhZ2UgPSBMYW5nWydjdXJyZW50J11bJ25hbWUnXTtcbiAgICB0YXJnZXRMYW5ndWFnZSA9IExhbmdbJ3RhcmdldCddWyduYW1lJ107XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd1c2VFZmZlY3QnKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocHJvcHMpO1xuICAgICAgICAvLyDmuLLmn5MgUHJvbXB0IOWIl+ihqFxuICAgICAgICBpbml0aWFsaXplUHJvbXB0TGlzdCgpO1xuICAgICAgICBpZiAocHJvcHMucnVuUHJvbXB0IHx8IHByb3BzLnJ1blByb21wdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyDojrflj5bmnIDov5HkuIDmrKHmiafooYznmoQgUHJvbXB0XG4gICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuZ2V0KHsgXCJsYXN0RXhlY3V0ZWRQcm9tcHRcIjogJycgfSkudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxhc3RFeGVjdXRlZFByb21wdCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5omn6KGM6buY6K6kIFByb21wdOOAgeiOt+WPliBVbnNwbGFzaCDlm77niYdcbiAgICAgICAgICAgICAgICAgICAgZXhlY3V0aXZlUHJvbXB0KHsgJ3RpdGxlJzogJ0RlZmF1bHQnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiB0cnVlLCAndXNlclByb21wdCc6IGBXb3JkOlwie3trZXlXb3JkfX1cIiwgc2VudGVuY2U6IFwie3tzZW50ZW5jZX19XCJgLCAnaWQnOiAnRGVmYXVsdCcgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyDmiafooYwgUHJvbXB044CB6I635Y+WIFVuc3BsYXNoIOWbvueJh1xuICAgICAgICAgICAgICAgICAgICBleGVjdXRpdmVQcm9tcHQoaXRlbS5sYXN0RXhlY3V0ZWRQcm9tcHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8g5LiN5omn6KGM5Lu75L2VIFByb21wdO+8jOeUseeUqOaIt+iHquihjOmAieaLqVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+S4jeaJp+ihjOS7u+S9lSBQcm9tcHTvvIznlLHnlKjmiLfoh6rooYzpgInmi6knKTtcbiAgICAgICAgICAgIC8vIOaJp+ihjOm7mOiupCBQcm9tcHTjgIHojrflj5YgVW5zcGxhc2gg5Zu+54mHXG4gICAgICAgICAgICBleGVjdXRpdmVQcm9tcHQoeyAndGl0bGUnOiAnRGVmYXVsdCcsICdnZXRVbnNwbGFzaEltYWdlcyc6IHRydWUsICd1c2VyUHJvbXB0JzogYFdvcmQ6XCJ7e2tleVdvcmR9fVwiLCBzZW50ZW5jZTogXCJ7e3NlbnRlbmNlfX1cImAsICdpZCc6ICdEZWZhdWx0JyB9LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6K6+572u56qX5Y+j55qE6buY6K6k5L2N572u44CB5re75Yqg5rua5Yqo5LqL5Lu277yM6K6p5raI5oGv5YiX6KGo6Ieq5Yqo5rua5Yqo5Yiw5bqV6YOoXG4gICAgICAgICgwLCB1dGlsXzEud2luZG93SW5pdGlhbGl6YXRpb24pKHsgJ2lzUGluJzogcHJvcHMuaXNQaW4sICd3aW5kb3dFbGVtZW50Jzogd2luZG93RWxlbWVudCwgJ3NlbGVjdGlvbic6IHByb3BzLnNlbGVjdGlvbiwgJ21lc3NhZ2VzTGlzdCc6IG1lc3NhZ2VzTGlzdCB9KTtcbiAgICB9LCBbcHJvcHNdKTtcbiAgICAvLyDogYrlpKnorrDlvZXmlLnlj5jml7ZcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgLy8g6K6w5b2V5b2T5YmN5YiX6KGo55qE5L2N572uXG4gICAgICAgIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGFpbmVyJylbMF07XG4gICAgICAgICAgICBzaG91bGRTdGF5QXRCb3R0b21SZWYuY3VycmVudCA9IGNvbnRhaW5lci5zY3JvbGxIZWlnaHQgLSBjb250YWluZXIuc2Nyb2xsVG9wIDw9IGNvbnRhaW5lci5jbGllbnRIZWlnaHQgKyAyMDtcbiAgICAgICAgICAgIC8vIOiHquWKqOa7muWKqOWIsOa2iOaBr+W6lemDqO+8jOaWueS+v+eci+WIsOacgOaWsOeahOaWh+Wtl1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZXNbbWVzc2FnZXMubGVuZ3RoIC0gMV0ubG9hZGluZykge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb0JvdHRvbSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvQm90dG9tKHNob3VsZFN0YXlBdEJvdHRvbVJlZi5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgLy8gICBpZiAoY29udGFpbmVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGNoZWNrSWZTaG91bGRTdGF5QXRCb3R0b20pO1xuICAgICAgICAgICAgLy8gICB9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICB9LCBbbWVzc2FnZXNdKTtcbiAgICAvLyDnqpflj6Pmi5bmi73ml7bop6blj5FcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlTW91c2VNb3ZlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNlVXApO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3VzZUVmZmVjdCByZXR1cm4nKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2VVcCk7XG4gICAgICAgIH07XG4gICAgfSwgW2RyYWdnaW5nXSk7XG4gICAgLy8g5L+d5a2Y5Y6G5Y+y6K6w5b2VXG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIC8vIOWcqCBvcGVuQXBpQW5zZXIg5pu05paw5ZCO5bCG5YW25L+d5a2Y5Yiw5rWP6KeI5Zmo5a2Y5YKo5LitXG4gICAgICAgIC8vIOWPquS/neeVmea2iOaBr+iusOW9leeahOesrCAxIOadoe+8jOWmguaenOi/meadoea2iOWkseaYr+mUmeivr+aPkOekuu+8jOWImeS4jeS/neWtmFxuICAgICAgICBpZiAobWVzc2FnZXMubGVuZ3RoID4gMCAmJiBpc0Fuc3dlckRvbmUgJiYgbWVzc2FnZXNbMF1bJ3N0YXR1cyddICE9PSAnZXJybycpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTYXZlJyk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlcyk7XG4gICAgICAgICAgICBjb25zdCBrZXlXb3JkID0gcHJvcHMuZGF0YS5rZXlXb3JkO1xuICAgICAgICAgICAgY29uc3QgU2VudGVuY2UgPSBwcm9wcy5kYXRhLlNlbnRlbmNlO1xuICAgICAgICAgICAgLy8g5bCG5p+l6K+i6K6w5b2V5L+d5a2Y6LW35p2lXG4gICAgICAgICAgICBjb25zdCBuZXdIaXN0b3J5ID0ge1xuICAgICAgICAgICAgICAgICdrZXlXb3JkJzoga2V5V29yZCxcbiAgICAgICAgICAgICAgICAnc2VudGVuY2UnOiBTZW50ZW5jZSxcbiAgICAgICAgICAgICAgICAncm9sZSc6IG1lc3NhZ2VzWzBdWydyb2xlJ10sXG4gICAgICAgICAgICAgICAgJ2Fuc3dlcic6IG1lc3NhZ2VzWzBdWydjb250ZW50J10sXG4gICAgICAgICAgICAgICAgJ3NvdXJjZSc6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgICAgICdwcm9tcHQnOiBtZXNzYWdlc1swXVsncHJvbXB0J11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoa2V5V29yZCAhPT0gJycgJiYgU2VudGVuY2UgIT09ICcnICYmIG1lc3NhZ2VzWzBdWydjb250ZW50J10gIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLmdldCh7IFwiaGlzdG9yeVwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0uaGlzdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdIaXN0b3J5TGlzdCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmluZ28gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbmV3SGlzdG9yeUxpc3QucHVzaChuZXdIaXN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbS5oaXN0b3J5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6c6K6w5b2V5bey5a2Y5Zyo77yM5YiZ5LiN6YeN5aSN5L+d5a2YXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW0uaGlzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBpdGVtLmhpc3RvcnlbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5rZXlXb3JkID09PSBuZXdIaXN0b3J5WydrZXlXb3JkJ10gJiYgb2JqLnNlbnRlbmNlID09PSBuZXdIaXN0b3J5WydzZW50ZW5jZSddICYmIG9iai5wcm9tcHQgPT09IG5ld0hpc3RvcnlbJ3Byb21wdCddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmdvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SGlzdG9yeUxpc3QgPSBpdGVtLmhpc3Rvcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdIaXN0b3J5TGlzdC51bnNoaWZ0KG5ld0hpc3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SGlzdG9yeUxpc3Quc3BsaWNlKDgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobmV3SGlzdG9yeUxpc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghYmluZ28pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5zZXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpc3Rvcnk6IG5ld0hpc3RvcnlMaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgW2lzQW5zd2VyRG9uZV0pO1xuICAgIGNvbnN0IGV4ZWN1dGl2ZVByb21wdCA9IChwcm9tcHQsIHJ1blByb21wdCwgaW1hZ2VUb1JlcmVuZGVyKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSlcbiAgICAgICAgLy8g6K6+572u5Yqg6L2954q25oCBXG4gICAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgICAgbGV0IG5lZWRUb1J1blByb21wdCA9IHJ1blByb21wdDtcbiAgICAgICAgaWYgKG5lZWRUb1J1blByb21wdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBuZWVkVG9SdW5Qcm9tcHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuZWVkVG9SZXJlbmRlckltYWdlID0gaW1hZ2VUb1JlcmVuZGVyO1xuICAgICAgICBpZiAobmVlZFRvUmVyZW5kZXJJbWFnZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBuZWVkVG9SZXJlbmRlckltYWdlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZygnZXhlY3V0aXZlUHJvbXB0OicpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhuZWVkVG9SdW5Qcm9tcHQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9tcHQpO1xuICAgICAgICAvLyBwcm9tcHRSZWYuY3VycmVudCA9IHByb21wdFxuICAgICAgICBjb25zdCBrZXlXb3JkID0gcHJvcHMuZGF0YS5rZXlXb3JkO1xuICAgICAgICBjb25zdCBTZW50ZW5jZSA9IHByb3BzLmRhdGEuU2VudGVuY2U7XG4gICAgICAgIC8vIOWIneWni+WMllxuICAgICAgICBzZXRNZXNzYWdlcyhbXSk7IC8vIOWvueivneWIl+ihqFxuICAgICAgICBpZiAobmVlZFRvUmVyZW5kZXJJbWFnZSkge1xuICAgICAgICAgICAgc2V0SW1hZ2VzKFtdKTsgLy8g5Zu+54mH5YiX6KGoXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb21wdC5nZXRVbnNwbGFzaEltYWdlcyAmJiBuZWVkVG9SdW5Qcm9tcHQpIHtcbiAgICAgICAgICAgIC8vIOWmguaenOW9k+WJjSBQcm9tcHQg6ZyA6KaB5pi+56S65Zu+54mH77yM5LiU5b2T5YmN6ZyA6KaB56uL5Y2z5omn6KGMIFByb21wdFxuICAgICAgICAgICAgc2V0U2hvd0ltYWdlc0JveCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldFNob3dJbWFnZXNCb3goZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZWVkVG9SdW5Qcm9tcHQpIHtcbiAgICAgICAgICAgIC8vIOWcqOa2iOaBr+WOhuWPsuS4reaPkuWFpeaWsOiusOW9lVxuICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IFsuLi5wcmV2TWVzc2FnZXMsIHsgJ2NvbnRlbnQnOiAnJywgJ3JvbGUnOiAnYXNzaXN0YW50JywgJ2xvYWRpbmcnOiB0cnVlLCAnY2hhdElkJzogJycsICdwcm9tcHQnOiAnJywgJ3N0YXR1cyc6ICcnIH1dKTtcbiAgICAgICAgICAgIC8vIOiuvue9ruacgOi/keaJp+ihjOeahCBQcm9tcHRcbiAgICAgICAgICAgIHNldExhc3RFeGVjdXRlZFByb21wdChwcm9tcHQpO1xuICAgICAgICAgICAgLy8g6K6w5b2V5pyA6L+RIDEg5qyh5L2/55So55qEIFByb21wdFxuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLnNldCh7XG4gICAgICAgICAgICAgICAgbGFzdEV4ZWN1dGVkUHJvbXB0OiBwcm9tcHRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8g5aSE55CGIFByb21wdCDkuK3nmoTlj5jph49cbiAgICAgICAgICAgIGxldCBuZXdQcm9tcHQ7XG4gICAgICAgICAgICBsZXQgcCA9IHByb21wdC51c2VyUHJvbXB0O1xuICAgICAgICAgICAgaWYgKHByb21wdC5pZCA9PSAnRGVmYXVsdCcpIHtcbiAgICAgICAgICAgICAgICBwID0gKDAsIHV0aWxfMS5nZXREZWZhdWx0UHJvbXB0KShrZXlXb3JkKVsndXNlclByb21wdCddO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5aSE55CGIFByb21wdCDkuK3nmoTlj5jph49cbiAgICAgICAgICAgIHAgPSB5aWVsZCAoMCwgdXRpbF8xLmhhbmRsZVByb21wdFZhcmlhYmxlcykocCwga2V5V29yZCwgU2VudGVuY2UsIExhbmcpO1xuICAgICAgICAgICAgbmV3UHJvbXB0ID0gW3sgJ3JvbGUnOiAndXNlcicsICdjb250ZW50JzogcCB9XTtcbiAgICAgICAgICAgIC8vIOWmguaenOWOhuWPsuiusOW9leS4reWtmOWcqOiusOW9le+8jOWImeS4jemHjeWkjeivt+axgiBBUEnvvIznm7TmjqXmmL7npLrljoblj7LorrDlvZXnmoTkv6Hmga9cbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5nZXQoeyBcImhpc3RvcnlcIjogW10gfSkudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgIC8vIOWmguaenOiusOW9leW3suWtmOWcqO+8jOWImeS4jemHjeWkjeS/neWtmFxuICAgICAgICAgICAgICAgIGxldCBiaW5nbyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbS5oaXN0b3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBpdGVtLmhpc3RvcnlbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmoua2V5V29yZCA9PT0ga2V5V29yZCAmJiBvYmouc2VudGVuY2UgPT09IFNlbnRlbmNlICYmIG9iai5wcm9tcHQgPT09IG5ld1Byb21wdFswXVsnY29udGVudCddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJ3JvbGUnIGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pen54mI5pys5Lit5Zug5Li65rKh5pyJ5a2Y5YKoIHJvbGUg77yM55u05o6l5pi+56S65Y6G5Y+y5pWw5o2u5pe25Lya5a+86Ie05ZCO57ut5rWB56iL5byC5bi4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZ28gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmdvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOebtOaOpeaYvuekuuWOhuWPsuiusOW9leS4reeahOWbnuetlFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0TWVzc2FnZSA9IHByZXZNZXNzYWdlc1twcmV2TWVzc2FnZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlZExhc3RNZXNzYWdlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBsYXN0TWVzc2FnZSksIHsgY2hhdElkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksIHJvbGU6IG9iai5yb2xlLCBjb250ZW50OiBvYmouYW5zd2VyLCBwcm9tcHQ6IG5ld1Byb21wdFswXVsnY29udGVudCddLCBsb2FkaW5nOiBmYWxzZSwgc3RhdHVzOiAnc3VjY2VzcycgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5wcmV2TWVzc2FnZXMuc2xpY2UoMCwgcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDEpLCB1cGRhdGVkTGFzdE1lc3NhZ2VdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0QW5zd2VyRG9uZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWJpbmdvKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOivt+axgiBBSSDmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgZ2V0R1BUTXNnKG5ld1Byb21wdCwga2V5V29yZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwcm9tcHQuaWQgPT0gJ0RlZmF1bHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXlXb3JkLmxlbmd0aCA8PSAyMCAmJiBwcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMgJiYgbmVlZFRvUmVyZW5kZXJJbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5Zu+54mH5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmdldFVuc3BsYXNoSW1hZ2VzKShrZXlXb3JkKS50aGVuKChpbWdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW1hZ2VzKGltZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMgJiYgbmVlZFRvUmVyZW5kZXJJbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5Zu+54mH5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmdldFVuc3BsYXNoSW1hZ2VzKShrZXlXb3JkKS50aGVuKChpbWdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW1hZ2VzKGltZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldExhc3RFeGVjdXRlZFByb21wdCh7ICd0aXRsZSc6ICfwn5GJ8J+PvCBQbGVhc2UgY2hvb3NlIGEgcHJvbXB0JywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZmFsc2UsICd1c2VyUHJvbXB0JzogJycsICdpZCc6ICcnIH0pO1xuICAgICAgICAgICAgc2V0QW5zd2VyRG9uZSh0cnVlKTtcbiAgICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBpbml0aWFsaXplUHJvbXB0TGlzdCA9ICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8g6I635Y+W5bey5L+d5a2Y55qEIFByb21wdCBMaXN0XG4gICAgICAgIGNvbnN0IHByb21wdExpc3QgPSB5aWVsZCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2Uuc3luYy5nZXQoeyBcInByb21wdExpc3RcIjogW10gfSkudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucHJvbXB0TGlzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFByb21wdHMocHJvbXB0TGlzdCk7XG4gICAgfSk7XG4gICAgY29uc3QgaGFuZGxlUHJvbXB0RWRpdGVkID0gKGlzTmV3KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOWIneWni+WMliBQcm9tcHQg5YiX6KGoXG4gICAgICAgIGluaXRpYWxpemVQcm9tcHRMaXN0KCk7XG4gICAgICAgIC8vIOabtOaWsOacgOi/keS9v+eUqOeahCBQcm9tcHTvvIjpkojlr7nnvJbovpHnmoTlnLrmma/vvIlcbiAgICAgICAgaWYgKCFpc05ldykge1xuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuZ2V0KHsgXCJwcm9tcHRMaXN0XCI6IFtdIH0pLnRoZW4oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW0ucHJvbXB0TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5wcm9tcHRMaXN0W2ldLmlkID09PSBsYXN0RXhlY3V0ZWRQcm9tcHQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOabtOaWsFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TGFzdEV4ZWN1dGVkUHJvbXB0KGl0ZW0ucHJvbXB0TGlzdFtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDorrDlvZXmnIDov5EgMSDmrKHkvb/nlKjnmoQgUHJvbXB0XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RXhlY3V0ZWRQcm9tcHQ6IGl0ZW0ucHJvbXB0TGlzdFtpXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8g6K+35rGCIEdQVCDmlbDmja5cbiAgICBjb25zdCBnZXRHUFRNc2cgPSAocHJvbXB0LCBrZXlXb3JkKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOS9v+eUqOmVv+i/nuaOpVxuICAgICAgICBsZXQgcG9ydCA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5jb25uZWN0KHtcbiAgICAgICAgICAgIG5hbWU6ICdmcm9tUG9wdXBDYXJkJ1xuICAgICAgICB9KTtcbiAgICAgICAga2V5V29yZCA9IGtleVdvcmQgfHwgJyc7XG4gICAgICAgIC8vIOiuvue9ruS4uuWbnuetlOS4rVxuICAgICAgICBzZXRBbnN3ZXJEb25lKGZhbHNlKTtcbiAgICAgICAgLy8g56aB55So5L+d5a2Y5YiwIEFua2kg5oyJ6ZKuXG4gICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnc3RhbmRieScsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICAvLyDlnKjmtojmga/ljoblj7LkuK3mj5LlhaXmlrDorrDlvZVcbiAgICAgICAgLy8gc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IFsuLi5wcmV2TWVzc2FnZXMsIHsgJ2NvbnRlbnQnOiAnJywgJ3JvbGUnOiAnYXNzaXN0YW50JywgJ2xvYWRpbmcnOiB0cnVlLCAnY2hhdElkJzogJycsICdwcm9tcHQnOiAnJyB9XSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyDkvb/nlKggcG9zdE1zIOWPkemAgeS/oeaBr1xuICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ2dldEdQVE1zZycsICdtZXNzYWdlcyc6IHByb21wdCwgJ2tleVdvcmQnOiBrZXlXb3JkIH0pO1xuICAgICAgICB9LCAyMCk7XG4gICAgICAgIC8vIOaOpeaUtuS/oeaBr1xuICAgICAgICBwb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihtc2cgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3BvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyJyk7XG4gICAgICAgICAgICBpZiAobXNnLnR5cGUgPT09ICdzZW5kR1BURGF0YScpIHtcbiAgICAgICAgICAgICAgICAvLyDor7fmsYIgR1BUIOaVsOaNruWksei0pVxuICAgICAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09PSAnZXJybycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdHlwZSA9PT0gJ2FzMicgPyBzZXRvcGVuQXBpQW5zZXIyKG1zZy5jb250ZW50KSA6IHNldG9wZW5BcGlBbnNlcihtc2cuY29udGVudClcbiAgICAgICAgICAgICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdub3JtYWwnLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1zZy5jb2RlID09PSAnaW52YWxpZF9hcGlfa2V5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SXNBcGlFcnJvKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbXNnLmNvbnRlbnQgKz0gJ1xcXG4gICAgICAgICAgICBBZnRlciB0aGF0LCB5b3UgbmVlZCB0byBzZXQgdGhlIGNvcnJlY3QgT3BlbiBBUEkgS2V5IGluIHRoZSBTY291dGVyOic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RNZXNzYWdlID0gcHJldk1lc3NhZ2VzW3ByZXZNZXNzYWdlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IG5ld01zZ0xpc3QgPSBsYXN0TWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlZExhc3RNZXNzYWdlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBsYXN0TWVzc2FnZSksIHsgY2hhdElkOiBtc2cuY2hhdElkLCBjb250ZW50OiBtc2cuY29udGVudCwgbG9hZGluZzogZmFsc2UsIHN0YXR1czogJ2Vycm8nLCBwcm9tcHQ6IHByb21wdFswXVsnY29udGVudCddIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgbmV3TXNnTGlzdCA9IFsuLi5wcmV2TWVzc2FnZXMuc2xpY2UoMCwgcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDEpLCBsYXN0TWVzc2FnZV1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbLi4ucHJldk1lc3NhZ2VzLnNsaWNlKDAsIHByZXZNZXNzYWdlcy5sZW5ndGggLSAxKSwgdXBkYXRlZExhc3RNZXNzYWdlXTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNldEFuc3dlckRvbmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzQXBpRXJybykge1xuICAgICAgICAgICAgICAgICAgICBzZXRJc0FwaUVycm8oZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyDor7fmsYIgR1BUIOaVsOaNruaIkOWKn+S4lOaVsOaNrua1gee7k+adn+S8oOi+k1xuICAgICAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09PSAnZW5kJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDorrDlvZXmtojmga/lm57nrZTlrozmr5XvvIjop6blj5Hkv53lrZjljoblj7LorrDlvZXvvIlcbiAgICAgICAgICAgICAgICAgICAgc2V0QW5zd2VyRG9uZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdub3JtYWwnLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g6K+35rGCIEdQVCDmlbDmja7miJDlip/kuJTmlbDmja7mtYHlvIDlp4vkvKDovpNcbiAgICAgICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PT0gJ2JlZ2luJykge1xuICAgICAgICAgICAgICAgICAgICAvLyB0eXBlID09PSAnYXMyJyA/IHNldG9wZW5BcGlBbnNlcjIoJycpIDogc2V0b3BlbkFwaUFuc2VyKCcnKVxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYmVnaW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g6K+35rGCIEdQVCDmlbDmja7miJDlip/kuJTmlbDmja7mtYHkvKDovpPkuK1cbiAgICAgICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PT0gJ3Byb2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICBjb25zdCBjb250YWluZXIgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRhaW5lcicpWzBdXG4gICAgICAgICAgICAgICAgICAgIC8vICAgc2hvdWxkU3RheUF0Qm90dG9tUmVmLmN1cnJlbnQgPSBjb250YWluZXIuc2Nyb2xsSGVpZ2h0IC0gY29udGFpbmVyLnNjcm9sbFRvcCA8PSBjb250YWluZXIuY2xpZW50SGVpZ2h0ICsgMjA7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOa4suafk+aVsOaNrlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0TWVzc2FnZSA9IHByZXZNZXNzYWdlc1twcmV2TWVzc2FnZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZNZXNzYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdNc2dMaXN0ID0gbGFzdE1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0NvbnRlbnQgPSBuZXdNc2dMaXN0LmNvbnRlbnQgKyBtc2cuY29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAocHJvbXB0WzBdWydjb250ZW50J10uaW5kZXhPZigne2Fua2lDYXJkc30nKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBuZXdDb250ZW50ID0gaGFuZGxlSGlnaHRsaWdodChuZXdDb250ZW50LCBwcm9wcy5kYXRhLmtleVdvcmQsIGFua2lDYXJkcywgd2luZG93RWxlbWVudD8uY3VycmVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIG5ld0NvbnRlbnQgPSBuZXdDb250ZW50LnJlcGxhY2UobmV3IFJlZ0V4cChwcm9wcy5kYXRhLmtleVdvcmQsICdnaScpLCBgKioke3Byb3BzLmRhdGEua2V5V29yZH0qKmApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbnRlbnQgPSAoMCwgdXRpbF8xLmhhbmRsZUhpZ2h0bGlnaHQpKG5ld0NvbnRlbnQsIHByb3BzLmRhdGEua2V5V29yZCwgYW5raUNhcmRzLCB3aW5kb3dFbGVtZW50ID09PSBudWxsIHx8IHdpbmRvd0VsZW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpbmRvd0VsZW1lbnQuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV3Q29udGVudCA9IG5ld0NvbnRlbnQucmVwbGFjZSgvby9nLCAnPHNwYW4gc3R5bGU9XCJjb2xvcjpyZWQ7XCI+bzwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkTGFzdE1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxhc3RNZXNzYWdlKSwgeyBjaGF0SWQ6IG1zZy5jaGF0SWQsIGNvbnRlbnQ6IG5ld0NvbnRlbnQsIGxvYWRpbmc6IGZhbHNlLCBzdGF0dXM6ICdzdWNjZXNzJywgcHJvbXB0OiBwcm9tcHRbMF1bJ2NvbnRlbnQnXSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBuZXdNc2dMaXN0ID0gWy4uLnByZXZNZXNzYWdlcy5zbGljZSgwLCBwcmV2TWVzc2FnZXMubGVuZ3RoIC0gMSksIGxhc3RNZXNzYWdlXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbLi4ucHJldk1lc3NhZ2VzLnNsaWNlKDAsIHByZXZNZXNzYWdlcy5sZW5ndGggLSAxKSwgdXBkYXRlZExhc3RNZXNzYWdlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyDnlKjmiLflj5HpgIHmtojmga9cbiAgICBjb25zdCBoYW5kbGVTZW5kTWVzc2FnZSA9ICh2YWx1ZXMpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codmFsdWVzKTtcbiAgICAgICAgbGV0IHByb21wdCA9IHZhbHVlcy5tc2c7XG4gICAgICAgIC8vIOa4heepuuaWh+acrOahhlxuICAgICAgICBmb3JtLnJlc2V0RmllbGRzKCk7XG4gICAgICAgIC8vIOemgeeUqOWPkemAgeaMiemSrlxuICAgICAgICBzZXRJc0Fuc3dlcklucHV0ZWQoZmFsc2UpO1xuICAgICAgICAvLyDlsIbnlKjmiLflj5HoqIDlj5HpgIHliLDmtojmga/orrDlvZXkuK1cbiAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRMYXN0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgY2hhdElkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgY29udGVudDogdmFsdWVzLm1zZyxcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICBwcm9tcHQ6IHByb21wdFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIGNvbnN0IG5ld01zZ0xpc3QgPSBbLi4ucHJldk1lc3NhZ2VzLnNsaWNlKDAsIHByZXZNZXNzYWdlcy5sZW5ndGggLSAxKSwgbGFzdE1lc3NhZ2VdXG4gICAgICAgICAgICByZXR1cm4gWy4uLnByZXZNZXNzYWdlcywgdXBkYXRlZExhc3RNZXNzYWdlXTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOWcqOa2iOaBr+WOhuWPsuS4reaPkuWFpeaWsOiusOW9lVxuICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4gWy4uLnByZXZNZXNzYWdlcywgeyAnY29udGVudCc6ICcnLCAncm9sZSc6ICdhc3Npc3RhbnQnLCAnbG9hZGluZyc6IHRydWUsICdjaGF0SWQnOiAnJywgJ3Byb21wdCc6ICcnLCAnc3RhdHVzJzogJycgfV0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlcyk7XG4gICAgICAgIGNvbnN0IG1zZ0hpc3RvcnkgPSBtZXNzYWdlcy5zbGljZSgtNSkubWFwKChpdGVtKSA9PiB7IHJldHVybiB7ICdyb2xlJzogaXRlbS5yb2xlLCAnY29udGVudCc6IGl0ZW0uY29udGVudCB9OyB9KTtcbiAgICAgICAgZ2V0R1BUTXNnKFsuLi5tc2dIaXN0b3J5LCB7IFwicm9sZVwiOiBcInVzZXJcIiwgXCJjb250ZW50XCI6IHZhbHVlcy5tc2cgfV0pO1xuICAgIH07XG4gICAgLy8g5paH5pys5qGG5LiL5pWy5Ye75oyJ6ZSu5pe2XG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyDpmLvmraLkuovku7blhpLms6FcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZUtleURvd24nKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMyAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIC8vIOaVsuWHu+Wbnui9pumUrlxuICAgICAgICAgICAgaWYgKCFpc0xvYWRpbmcgJiYgaXNBbnN3ZXJJbnB1dGVkKSB7XG4gICAgICAgICAgICAgICAgLy8g6Z2e5Yqg6L2954q25oCB44CBR1BUIOa2iOaBr+WPkemAgeWujOavleaXtueUqOaIt+WPr+WPkemAgea2iOaBr1xuICAgICAgICAgICAgICAgIGhhbmRsZVNlbmRNZXNzYWdlKHsgJ21zZyc6IGV2ZW50LnRhcmdldC52YWx1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU1vdXNlRG93biA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnUG9wdXBDYXJkOmhhbmRsZU1vdXNlRG93bicpO1xuICAgICAgICBzZXREcmFnZ2luZyh0cnVlKTtcbiAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQuY3VycmVudCkge1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFggPSBldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WSA9IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgICAgICAgIHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFggPSBTdHJpbmcob2Zmc2V0WCk7XG4gICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRZID0gU3RyaW5nKG9mZnNldFkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldE9mZnNldCh7IHg6IGV2ZW50LmNsaWVudFggLSBwb3NpdGlvbi54LCB5OiBldmVudC5jbGllbnRZIC0gcG9zaXRpb24ueSB9KTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU1vdXNlTW92ZSA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyAvLyBjb25zb2xlLmxvZygnUG9wdXBDYXJkOmhhbmRsZU1vdXNlTW92ZScpO1xuICAgICAgICAvLyAvLyBjb25zb2xlLmxvZyhkcmFnZ2luZyk7XG4gICAgICAgIGlmIChkcmFnZ2luZyAmJiB3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vIFVzZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgdG8gdGhyb3R0bGUgdGhlIG1vdXNlbW92ZSBldmVudCBoYW5kbGluZ1xuICAgICAgICAgICAgLy8g6byg5qCH55u45a+556qX5Y+j5bem5LiK6KeS55qE5YGP56e7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRYID0gcGFyc2VGbG9hdCh3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRYIHx8ICcnKTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFkgPSBwYXJzZUZsb2F0KHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFkgfHwgJycpO1xuICAgICAgICAgICAgY29uc3QgbmV3WCA9IGV2ZW50LmNsaWVudFggLSBvZmZzZXRYO1xuICAgICAgICAgICAgY29uc3QgbmV3WSA9IGV2ZW50LmNsaWVudFkgLSBvZmZzZXRZO1xuICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIGJvdW5kYXJpZXNcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50V2lkdGggPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gd2luZG93RWxlbWVudC5jdXJyZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IG1pblggPSAtZWxlbWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGNvbnN0IG1pblkgPSAwO1xuICAgICAgICAgICAgY29uc3QgbWF4WCA9IHdpbmRvd1dpZHRoIC0gZWxlbWVudFdpZHRoICsgZWxlbWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGNvbnN0IG1heFkgPSB3aW5kb3dIZWlnaHQgLSBlbGVtZW50SGVpZ2h0ICsgZWxlbWVudEhlaWdodCAvIDEuNTtcbiAgICAgICAgICAgIGNvbnN0IGNsYW1wZWRYID0gTWF0aC5tYXgobWluWCwgTWF0aC5taW4obmV3WCwgbWF4WCkpO1xuICAgICAgICAgICAgY29uc3QgY2xhbXBlZFkgPSBNYXRoLm1heChtaW5ZLCBNYXRoLm1pbihuZXdZLCBtYXhZKSk7XG4gICAgICAgICAgICAvLyBPbmx5IHVwZGF0ZSB0aGUgcG9zaXRpb24gaWYgaXQncyB3aXRoaW4gdGhlIGJvdW5kYXJpZXNcbiAgICAgICAgICAgIC8vIG5ld1ggPj0gbWluWCAmJiBuZXdYIDw9IG1heFggJiYgbmV3WSA+PSBtaW5ZICYmIG5ld1kgPD0gbWF4WVxuICAgICAgICAgICAgaWYgKHRydWUpIHtcbiAgICAgICAgICAgICAgICAvLyBzZXRQb3NpdGlvbih7IHg6IGNsYW1wZWRYLCB5OiBjbGFtcGVkWSB9KTtcbiAgICAgICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuc3R5bGUubGVmdCA9IGAke2NsYW1wZWRYfXB4YDtcbiAgICAgICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuc3R5bGUudG9wID0gYCR7Y2xhbXBlZFl9cHhgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5YWD57Sg5Yiw6L6+6L6555WMXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgcmVjdCA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBvZmZzZXRYID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBvZmZzZXRZID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICAgICAgICAgIC8vIHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFggPSBTdHJpbmcob2Zmc2V0WCk7XG4gICAgICAgICAgICAgICAgLy8gd2luZG93RWxlbWVudC5jdXJyZW50LmRhdGFzZXQub2Zmc2V0WSA9IFN0cmluZyhvZmZzZXRZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlTW91c2VVcCA9ICgpID0+IHtcbiAgICAgICAgLy8gLy8gY29uc29sZS5sb2coJ1BvcHVwQ2FyZDpoYW5kbGVNb3VzZVVwJyk7XG4gICAgICAgIHNldERyYWdnaW5nKGZhbHNlKTtcbiAgICB9O1xuICAgIC8vIOaWh+acrOahhuWAvOWPmOWMluaXtlxuICAgIGNvbnN0IG9uVGV4dEFyZWFJbnB1dCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNldElzQW5zd2VySW5wdXRlZCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldElzQW5zd2VySW5wdXRlZChmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIOa3u+WKoOWIsCBBbmtpXG4gICAgY29uc3QgYWRkVG9BbmtpID0gKGRlY2tOYW1lLCBtb2RlbE5hbWUsIGZyb250LCBiYWNrKSA9PiB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3Qga2V5V29yZCA9IHByb3BzLmRhdGEua2V5V29yZDtcbiAgICAgICAgY29uc3QgU2VudGVuY2UgPSBwcm9wcy5kYXRhLlNlbnRlbmNlO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gJyc7XG4gICAgICAgIGxldCBpbWFnZXMgPSAnJztcbiAgICAgICAgbGV0IHVuc3BsYXNoX2Rvd25sb2FkX2xvY2F0aW9uO1xuICAgICAgICBjb25zdCBzdGMgPSBrZXlXb3JkLmxlbmd0aCA8PSAyMCA/IFNlbnRlbmNlIDogJyc7XG4gICAgICAgIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdpbmRvd0VsZW1lbnQuY3VycmVudCk7XG4gICAgICAgICAgICBjb250YWluZXIgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgY29udGFpbmVyID0gd2luZG93RWxlbWVudC5jdXJyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lc3NhZ2VzJylbMF0uaW5uZXJIVE1MO1xuICAgICAgICAgICAgLy8g5aSE55CG5qC35byP77yM6YG/5YWNIEFua2kg5YaF5pi+56S65byC5bi4XG4gICAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXIucmVwbGFjZSgvc3R5bGU9L2csICcnKTtcbiAgICAgICAgICAgIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VCb3gnKVswXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VzID0gd2luZG93RWxlbWVudC5jdXJyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlQm94JylbMF0uaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgIC8vIOiOt+WPliB1bnNwbGFzaEFwaSDnmoQgZG93bmxvYWRfbG9jYXRpb25cbiAgICAgICAgICAgICAgICB1bnNwbGFzaF9kb3dubG9hZF9sb2NhdGlvbiA9IChfYSA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXMnKVswXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0ucGFyZW50RWxlbWVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEF0dHJpYnV0ZSgnZGF0YS1kb3dubG9hZGxvY2F0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpbWFnZXMpO1xuICAgICAgICAgICAgLy8g5aSE55CG5qC35byP77yM6YG/5YWNIEFua2kg5YaF5pi+56S65byC5bi4XG4gICAgICAgICAgICBpbWFnZXMgPSBpbWFnZXMucmVwbGFjZSgvc3R5bGU9L2dpLCAnJyk7XG4gICAgICAgICAgICBpbWFnZXMgPSBpbWFnZXMucmVwbGFjZSgvd2lkdGgvZ2ksICcnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjYXJkU3R5bGUgPSBgPHN0eWxlPlxuXG4gICAgLnNlbnRlbmNle1xuICAgICAgb3BhY2l0eTowLjY1O1xuICAgIH1cbiAgICAuYW5raVNwYWNlIHtcbiAgICAgIGNvbG9yOiNGMDhBMjQ7XG4gICAgfVxuXG4gICAgdGFibGUge1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gICAgICBtYXJnaW46MDtcbiAgICAgIHBhZGRpbmc6MDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbiAgICB0YWJsZSB0ciB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICAgICAgcGFkZGluZzogNXB4O1xuICAgIH1cbiAgICB0YWJsZSB0aCwgdGFibGUgdGQge1xuICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgfVxuICAgIHRhYmxlIHRoIHtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIH1cbiAgICA8L3N0eWxlPlxuICAgIGA7XG4gICAgICAgIC8vIOivt+axgiBiYWNrZ3JvdW5kIOWwhuaVsOaNruS/neWtmOWIsCBBbmtpXG4gICAgICAgIGxldCBwID0ge1xuICAgICAgICAgICAgXCJub3RlXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlY2tOYW1lXCI6IGRlY2tOYW1lLFxuICAgICAgICAgICAgICAgIFwibW9kZWxOYW1lXCI6IG1vZGVsTmFtZSxcbiAgICAgICAgICAgICAgICBcImZpZWxkc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFtmcm9udF06IGtleVdvcmQsXG4gICAgICAgICAgICAgICAgICAgIFtiYWNrXTogY2FyZFN0eWxlICsgJzxwIGNsYXNzPVwic2VudGVuY2VcIj4nICsgc3RjICsgJzwvcD4nICsgaW1hZ2VzICsgY29udGFpbmVyICsgJzxhIGhyZWY9XCInICsgd2luZG93LmxvY2F0aW9uLmhyZWYgKyAnXCI+U291cmNlPC9hPidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwidGFnc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiU2NvdXRlclwiXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAoY29udGFpbmVyLmluZGV4T2YoJ2NsYXNzPVwiYW5raVNwYWNlXCInKSA+PSAwKSB7XG4gICAgICAgICAgICBwID0ge1xuICAgICAgICAgICAgICAgIFwibm90ZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZGVja05hbWVcIjogZGVja05hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwibW9kZWxOYW1lXCI6IG1vZGVsTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJmaWVsZHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgW2Zyb250XTogY2FyZFN0eWxlICsgJzxwIGNsYXNzPVwic2VudGVuY2VcIj4nICsgc3RjICsgJzwvcD4nICsgaW1hZ2VzICsgY29udGFpbmVyICsgJzxhIGhyZWY9XCInICsgd2luZG93LmxvY2F0aW9uLmhyZWYgKyAnXCI+U291cmNlPC9hPicsXG4gICAgICAgICAgICAgICAgICAgICAgICBbYmFja106ICcnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwidGFnc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlNjb3V0ZXJcIlxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyDlj5HpgIHmtojmga/nu5kgYmFja2dyb3VuZFxuICAgICAgICBsZXQgc2VuZGluZyA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FkZE5vdGUnLCAnbWVzc2FnZXMnOiB7ICdhbmtpX2FyZ3VtZW50cyc6IHAsICdhbmtpX2FjdGlvbl90eXBlJzogJ2FkZE5vdGUnLCAndW5zcGxhc2hfZG93bmxvYWRfbG9jYXRpb24nOiB1bnNwbGFzaF9kb3dubG9hZF9sb2NhdGlvbiB9LCB9KTtcbiAgICAgICAgc2VuZGluZy50aGVuKGhhbmRsZVJlc3BvbnNlLCBoYW5kbGVFcnJvcik7XG4gICAgfTtcbiAgICAvLyDngrnlh7vkv53lrZjliLAgQW5raVxuICAgIGNvbnN0IGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljayA9ICgpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyDmoLnmja7mmK/lkKbkuLrlrozlvaLloavnqbrnlLPor7fkuI3lkIznmoTljaHniYfmqKHmnb9cbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gKF9hID0gd2luZG93RWxlbWVudC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVzc2FnZXMnKVswXS5pbm5lckhUTUw7XG4gICAgICAgIGxldCBpc0Fua2lTcGFjZSA9IGZhbHNlO1xuICAgICAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLmluZGV4T2YoJ2NsYXNzPVwiYW5raVNwYWNlXCInKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgaXNBbmtpU3BhY2UgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbG9hZGluZycsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICAvLyDlhYjpooTlpITnkIYgQW5raSDnmoQgbW9kZWxcbiAgICAgICAgbGV0IHNlbmRpbmcgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdzZXRNb2RlbCcsICdtZXNzYWdlcyc6IHsgJ2lzQW5raVNwYWNlJzogaXNBbmtpU3BhY2UgfSwgfSk7XG4gICAgICAgIHNlbmRpbmcudGhlbigobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UucmVzdWx0ID09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgIC8vIOa3u+WKoOWIsCBBbmtpIOS4rVxuICAgICAgICAgICAgICAgIGFkZFRvQW5raShtZXNzYWdlLmRhdGEuZGVmYXVsdERlY2tOYW1lLCBtZXNzYWdlLmRhdGEubW9kZWxOYW1lLCBtZXNzYWdlLmRhdGEuZmllbGQxLCBtZXNzYWdlLmRhdGEuZmllbGQyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOWPjemmiOmUmeivr+S/oeaBr1xuICAgICAgICAgICAgICAgIGFsZXJ0KG1lc3NhZ2UuZXJyb3IpO1xuICAgICAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIC8vZXJyb3JcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvLyDmjqXmlLYgYmFja2dyb3VuZCDnmoTlm57lpI1cbiAgICBmdW5jdGlvbiBoYW5kbGVSZXNwb25zZShtZXNzYWdlKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICBpZiAobWVzc2FnZS5lcnJvciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdzdWNjZXNzJywgJ25vdGVJZCc6IG1lc3NhZ2UuZGF0YSB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KG1lc3NhZ2UuZXJyb3IpO1xuICAgICAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdub3JtYWwnLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVFcnJvcihlcnJvKSB7XG4gICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGVycm8pO1xuICAgIH1cbiAgICAvLyBHUFQg55Sf5oiQ5raI5oGv5pe277yM6Ieq5Yqo5a6a5L2N5Yiw5raI5oGv5YiX6KGo5bqV6YOo77yM5pa55L6/55So5oi36ZiF6K+7XG4gICAgZnVuY3Rpb24gc2Nyb2xsVG9Cb3R0b20oY2FuU3JvbGwgPSBmYWxzZSkge1xuICAgICAgICBpZiAod2luZG93RWxlbWVudC5jdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRhaW5lcicpWzBdO1xuICAgICAgICAgICAgLy8gY29uc3QgaXNBdEJvdHRvbSA9IGNvbnRhaW5lci5zY3JvbGxIZWlnaHQgLSBjb250YWluZXIuc2Nyb2xsVG9wIDw9IGNvbnRhaW5lci5jbGllbnRIZWlnaHQgKyAxNDtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdpc0F0Qm90dG9tID09PT09PSAnKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNhblNyb2xsKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGlzQXRCb3R0b20pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY29udGFpbmVyLnNjcm9sbEhlaWdodCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjb250YWluZXIuc2Nyb2xsVG9wKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbnRhaW5lci5jbGllbnRIZWlnaHQpO1xuICAgICAgICAgICAgaWYgKGNhblNyb2xsKSB7XG4gICAgICAgICAgICAgICAgLy8g5L2N5LqO5bqV6YOo77yM6ZyA6KaB6Ieq5Yqo5rua5YqoXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgY2hpbGRFbGVtZW50cyA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVzc2FnZXMgPiA6bGFzdC1jaGlsZCcpO1xuICAgICAgICAgICAgICAgIC8vIGlmIChjaGlsZEVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyAgIGNvbnN0IGxhc3RDaGlsZEVsZW1lbnQgPSBjaGlsZEVsZW1lbnRzW2NoaWxkRWxlbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgLy8gICBsYXN0Q2hpbGRFbGVtZW50LnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSBjb250YWluZXIuc2Nyb2xsSGVpZ2h0ICsgMjA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgb3BlbkN1c3RvbVByb21wdEZvcm0gPSAoZGF0YSkgPT4ge1xuICAgICAgICAvLyDlvIDlkK/miJblhbPpl63oh6rlrprkuYkgUHJvbXB0IOihqOWNlVxuICAgICAgICBzZXRQb3BvdmVyT3BlbihkYXRhLmlzT3Blbik7XG4gICAgICAgIC8vIOiuvue9ruihqOWNleeahOm7mOiupOiuvue9rlxuICAgICAgICBpZiAoZGF0YS5pc09wZW4pIHtcbiAgICAgICAgICAgIHNldEN1c3RvbVByb21wdEZvcm1EYXRhKGRhdGEuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5byA5ZCv6KGo5Y2V5ZCO56aB5q2i54K55Ye756qX5Y+j5aSW5Yy65Z+f5YWz6Zet56qX5Y+jXG4gICAgICAgICgwLCBjb250ZW50X3NjcmlwdF8xLnNldERvbm90Q2xvc2VQb3B1cENhcmQpKGRhdGEuaXNPcGVuKTtcbiAgICB9O1xuICAgIGNvbnN0IEFuaW1hdGVkQnV0dG9uID0gKDAsIHJlYWN0X3NwcmluZ18xLmFuaW1hdGVkKShhbnRkXzEuQnV0dG9uKTtcbiAgICBjb25zdCBhbmltYXRpb25TdHlsZSA9ICgwLCByZWFjdF9zcHJpbmdfMS51c2VTcHJpbmcpKHtcbiAgICAgICAgZnJvbTogeyB0cmFuc2Zvcm06ICdyb3RhdGUoMGRlZyknIH0sXG4gICAgICAgIHRvOiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgzNjBkZWcpJyB9LFxuICAgICAgICBjb25maWc6IHsgZHVyYXRpb246IDEwMDAgfSxcbiAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgd2lkdGg6ICczMnB4JyxcbiAgICAgICAgaGVpZ2h0OiAnMzJweCcsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCByZWQnXG4gICAgfSk7XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgaWQ6IFwiTGVhcm5pbmdFbmdsaXNoMjAyM1wiLCByZWY6IHdpbmRvd0VsZW1lbnQsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgbGVmdDogMTAsXG4gICAgICAgICAgICAgICAgdG9wOiAxMCxcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Db25maWdQcm92aWRlciwgeyB0aGVtZToge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JQcmltYXJ5OiAnI0YwOEEyNCcsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE5hdl8xLk5hdiwgeyBoYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2s6IGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljaywgYWRkVG9BbmtpU3RhdHVzOiBhZGRUb0Fua2lTdGF0dXMsIG9uTW91c2VEb3duOiBoYW5kbGVNb3VzZURvd24sIGhhbmRsZU1lbnVJdGVtQ2xpY2s6IGV4ZWN1dGl2ZVByb21wdCwgb3BlbkN1c3RvbVByb21wdEZvcm06IG9wZW5DdXN0b21Qcm9tcHRGb3JtLCB0aXRsZTogJ1Njb3V0ZXInLCBwcm9tcHRzOiBwcm9tcHRzLCBsYXN0RXhlY3V0ZWRQcm9tcHQ6IGxhc3RFeGVjdXRlZFByb21wdCB9KSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2NvbnRhaW5lciBmbGV4LWdyb3cgZmxleCBmbGV4LWNvbCBvdmVyZmxvdy1hdXRvJyB9LFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2ZsZXgtZ3JvdycsIHJlZjogbWVzc2FnZXNMaXN0LCBzdHlsZTogeyBwYWRkaW5nVG9wOiAnNTRweCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0aW9uXzEuU2VsZWN0aW9uLCB7IHRleHQ6IHByb3BzLmRhdGEua2V5V29yZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dJbWFnZXNCb3ggJiYgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoSW1hZ2VzXzEuSW1hZ2VzLCB7IGltYWdlczogaW1hZ2VzLCBrZXlXb3JkOiBwcm9wcy5kYXRhLmtleVdvcmQsIGdldFVuc3BsYXNoSW1hZ2VzOiAoa2V5V29yZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmdldFVuc3BsYXNoSW1hZ2VzKShrZXlXb3JkKS50aGVuKChpbWdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJbWFnZXMoaW1ncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ21lc3NhZ2VzJywgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzI4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JkV3JhcDogJ2JyZWFrLXdvcmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46ICcwLjRlbSAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsga2V5OiBpdGVtLmNoYXRJZCwgY2xhc3NOYW1lOiAnJywgc3R5bGU6IGl0ZW0ucm9sZSA9PT0gJ3VzZXInID8geyBiYWNrZ3JvdW5kQ29sb3I6ICcjRjZGNkY2JywgcGFkZGluZ1RvcDogJzJweCcsIHBhZGRpbmdCb3R0b206ICcycHgnIH0gOiB7fSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlNrZWxldG9uLCB7IGxvYWRpbmc6IGl0ZW0ubG9hZGluZywgYWN0aXZlOiB0cnVlLCB0aXRsZTogZmFsc2UgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF9tYXJrZG93bl8xLmRlZmF1bHQsIHsgcmVtYXJrUGx1Z2luczogW3JlbWFya19icmVha3NfMS5kZWZhdWx0LCByZW1hcmtfZ2ZtXzEuZGVmYXVsdF0sIHJlaHlwZVBsdWdpbnM6IFtyZWh5cGVfcmF3XzEuZGVmYXVsdF0sIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiAoX2EpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeyBub2RlIH0gPSBfYSwgcHJvcHMgPSBfX3Jlc3QoX2EsIFtcIm5vZGVcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IG92ZXJmbG93WDogJ3Njcm9sbCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIsIE9iamVjdC5hc3NpZ24oeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnbWF4LWNvbnRlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAnNjIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWQgI2NjY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBwcm9wcykpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgc2tpcEh0bWw6IGZhbHNlLCBjaGlsZHJlbjogaXRlbS5jb250ZW50IH0pKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNBcGlFcnJvID8gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7IHNyYzogc2V0dGluZ0d1aWRlX3BuZ18xLmRlZmF1bHQsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9KSkgOiAnJykpKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ3ctZnVsbCcsIHJlZjogaW5wdXRSZWYsIHN0eWxlOiB7IGJvcmRlclRvcDogJzFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNiknIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0sIHsgZm9ybTogZm9ybSwgb25GaW5pc2g6IGhhbmRsZVNlbmRNZXNzYWdlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uS2V5RG93bj17aGFuZGxlRm9ybUtleURvd259XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQ6ICdpbmxpbmUnLCBzdHlsZTogeyBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9LCBjbGFzc05hbWU6ICdwLTInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwibXNnXCIsIHN0eWxlOiB7IG1hcmdpbjogJzAnLCBmbGV4R3JvdzogJzEnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwgeyBwbGFjZWhvbGRlcjogXCJTZW5kIGEgbWVzc2FnZVwiLCBib3JkZXJlZDogZmFsc2UsIGF1dG9TaXplOiB7IG1pblJvd3M6IDEsIG1heFJvd3M6IDIgfSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0Q29sb3I6ICcjRjA4QTI0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgb25LZXlEb3duOiBoYW5kbGVLZXlEb3duLCBvbklucHV0OiBvblRleHRBcmVhSW5wdXQgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBzdHlsZTogeyBtYXJnaW5SaWdodDogJzAnIH0gfSwgaXNBbnN3ZXJEb25lID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHR5cGU6IFwidGV4dFwiLCBodG1sVHlwZTogXCJzdWJtaXRcIiwgZGlzYWJsZWQ6IGlzTG9hZGluZyB8fCAhaXNBbnN3ZXJJbnB1dGVkLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogIWlzTG9hZGluZyAmJiBpc0Fuc3dlcklucHV0ZWQgPyAnI0YwOEEyNCcgOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLlNlbmRPdXRsaW5lZCwgbnVsbCkgfSkgOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IG1hcmdpblJpZ2h0OiAnOHB4JyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3Rfc3ByaW5nXzEuYW5pbWF0ZWQuZGl2LCB7IHN0eWxlOiBhbmltYXRpb25TdHlsZSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkxvYWRpbmdPdXRsaW5lZCwgbnVsbCkpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IHN0eWxlOiB7IG1hcmdpbjogJzAnIH0gfSkpKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRHJhd2VyLCB7IHRpdGxlOiBjdXN0b21Qcm9tcHRGb3JtRGF0YS5pZCA9PT0gJycgPyBcIkNyZWF0ZSBQcm9tcHRcIiA6IFwiRWRpdCBQcm9tcHRcIiwgcGxhY2VtZW50OiBcImJvdHRvbVwiLCBjbG9zYWJsZTogZmFsc2UsIGhlaWdodDogJzEwMCUnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uQ2xvc2U9e29uQ2xvc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuOiBpc1BvcG92ZXJPcGVuLCBnZXRDb250YWluZXI6IGZhbHNlLCBleHRyYTogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLlNwYWNlLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHsgekluZGV4OiAnOScgfSwgb25DbGljazogKCkgPT4gb3BlbkN1c3RvbVByb21wdEZvcm0oeyBpc09wZW46IGZhbHNlLCBkYXRhOiB7ICd0aXRsZSc6ICcnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBmYWxzZSwgJ3VzZXJQcm9tcHQnOiAnJywgJ2lkJzogJycgfSB9KSB9LCBcIkNhbmNlbFwiKSkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmFja2dyb3VuZENvbG9yOiAncmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzY0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdhbGwtc2Nyb2xsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9uTW91c2VEb3duOiBoYW5kbGVNb3VzZURvd24gfSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChDdXN0b21Qcm9tcHRGb3JtXzEuQ3VzdG9tUHJvbXB0Rm9ybSwgeyBvcGVuQ3VzdG9tUHJvbXB0Rm9ybTogb3BlbkN1c3RvbVByb21wdEZvcm0sIGhhbmRsZVByb21wdEVkaXRlZDogaGFuZGxlUHJvbXB0RWRpdGVkLCBkYXRhOiBjdXN0b21Qcm9tcHRGb3JtRGF0YSB9KSkpKSkpKTtcbn1cbmV4cG9ydHMuUG9wdXBDYXJkID0gUG9wdXBDYXJkO1xuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnBvcHVwQ2FyZFN0eWxlID0gdm9pZCAwO1xuZXhwb3J0cy5wb3B1cENhcmRTdHlsZSA9IGBcbi5zbGljay1hcnJvdzo6YmVmb3Jle1xuICBjb250ZW50OlwiXCIgIWltcG9ydGFudDtcbn1cblxuLmFua2lTcGFjZSB7XG4gIGNvbG9yOiNGMDhBMjQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFua2lTcGFjZTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6I0YwOEEyNDtcbiAgY29sb3I6I2ZmZmZmZjtcbn1cblxuLmFua2lTcGFjZUJ1dHRvbkJveCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcbiAgcGFkZGluZzogNHB4IDhweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMDYpO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJveC1zaGFkb3c6IDBweCA4cHggMjhweCByZ2JhKDAsMCwwLC4xNik7XG59XG5cbi5zZXRBbmtpU3BhY2VCdXR0b246Zmlyc3Qtb2YtdHlwZSB7XG4gIG1hcmdpbi1yaWdodDo4cHg7XG59XG5cbi5zZXRBbmtpU3BhY2VCdXR0b24ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDJweDtcbn1cblxuLnNldEFua2lTcGFjZUJ1dHRvbjpob3ZlciB7XG4gIFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCw1OSwwLjA1MSk7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcblxufVxuXG4uYW50LWNhcm91c2VsIC5zbGljay1wcmV2LFxuLmFudC1jYXJvdXNlbCAuc2xpY2stbmV4dCxcbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLXByZXY6aG92ZXIsXG4uYW50LWNhcm91c2VsIC5zbGljay1uZXh0OmhvdmVyIHtcbiAgZm9udC1zaXplOiBpbmhlcml0O1xuICBjb2xvcjogY3VycmVudENvbG9yO1xufVxuXG4uYW50LWNhcm91c2VsIC5zbGljay1wcmV2LFxuLmFudC1jYXJvdXNlbCAuc2xpY2stcHJldjpob3ZlciB7XG4gIGxlZnQ6IDEwcHg7XG4gIHotaW5kZXg6IDI7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmFudC1jYXJvdXNlbCAuc2xpY2stbmV4dCxcbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLW5leHQ6aG92ZXIge1xuICByaWdodDogMTBweDtcbiAgei1pbmRleDogMjtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uaW1hZ2VzIGltZyB7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG59XG5cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDEsI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDIsI0xlYXJuaW5nRW5nbGlzaDIwMjMgaDN7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyBoMXtcbiAgZm9udC1zaXplOjIwcHg7XG59XG4jTGVhcm5pbmdFbmdsaXNoMjAyMyBoMntcbiAgZm9udC1zaXplOjE3cHg7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIHtcbmZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xud2lkdGg6IDM5MHB4O1xuaGVpZ2h0OiA1NjBweDtcbmNvbG9yOiByZ2IoMCAwIDAgLyA4MCUpO1xucG9zaXRpb246IGZpeGVkO1xuZGlzcGxheTogZmxleDtcbmZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5mb250LXNpemU6IDEzLjJweDtcbmJhY2tncm91bmQtY29sb3I6ICNmZmY7XG56LWluZGV4OiA5OTk5O1xub3ZlcmZsb3c6IGhpZGRlbjtcbmJveC1zaGFkb3c6IDBweCA4cHggMjhweCByZ2JhKDAsMCwwLC4xNik7XG5ib3JkZXItcmFkaXVzOiA2cHg7XG5ib3JkZXI6MXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KVxufVxuXG46OnNlbGVjdGlvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkQ1QjI7XG59XG5cbjo6LW1vei1zZWxlY3Rpb24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZENUIyO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAuY29udGFpbmVyOjotd2Via2l0LXNjcm9sbGJhciAge1xuICB3aWR0aDowcHg7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5jb250YWluZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrICB7XG4gIGJhY2tncm91bmQ6ICNmZmY7IC8qIOiuvue9rua7muWKqOadoei9qOmBk+iDjOaZr+iJsiAqL1xufVxuXG4vLyAjTGVhcm5pbmdFbmdsaXNoMjAyMyAuY29udGFpbmVyOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4vLyAgIGJhY2tncm91bmQ6ICM4ODg7IC8qIOiuvue9rua7muWKqOadoea7keWdl+iDjOaZr+iJsiAqL1xuLy8gfVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAuRHJvcGRvd25NZW51SXRlbTpob3ZlciB7XG4gIFxuICBiYWNrZ3JvdW5kLWNvbG9yOiNGNkY2RjY7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5Ecm9wZG93bk1lbnVJdGVtOmZvY3VzLXZpc2libGUge1xuICBvdXRsaW5lOiBub25lO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyBoMSwjTGVhcm5pbmdFbmdsaXNoMjAyMyBoMiwjTGVhcm5pbmdFbmdsaXNoMjAyMyBoMyB7XG5cbiAgY29sb3I6IHJnYmEoMCwgMCwgMCk7XG5cbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgI1Njb3V0ZXJOYXYsI0xlYXJuaW5nRW5nbGlzaDIwMjMgLmltYWdlcywjTGVhcm5pbmdFbmdsaXNoMjAyMyAjU2NvdXRlclNlbGVjdGlvbiwgI0xlYXJuaW5nRW5nbGlzaDIwMjMgLm1lc3NhZ2VzPmRpdiAge1xuICBwYWRkaW5nLWxlZnQ6MThweDtcbiAgcGFkZGluZy1yaWdodDoxOHB4O1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAub3BlbkFJQW5zd2VyIHtcbmxpbmUtaGVpZ2h0OiAzMHB4O1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAudXNlcklucHV0IHtcbm1hcmdpbjogMTBweCAwO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAuY29udGVudEJveCB7XG5vdmVyZmxvdzogc2Nyb2xsO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAubWVzc2FnZXMgPiAqID4gKiB7XG4gIG1hcmdpbjogMC43ZW0gMDtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgI1Njb3V0ZXJOYXYge1xuZGlzcGxheTogZmxleDtcbmp1c3RpZnktY29udGVudDogc3RhcnQ7XG5hbGlnbi1pdGVtczogY2VudGVyO1xucGFkZGluZy10b3A6IDEwcHg7XG5wYWRkaW5nLWJvdHRvbTogMTBweDtcbmJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDUsIDUsIDUsIC4wNik7XG51c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgI1Njb3V0ZXJOYXYgaW1nIHtcbndpZHRoOiBhdXRvO1xuaGVpZ2h0OiAyNHB4O1xubWFyZ2luLXJpZ2h0OiA2cHg7XG59XG5cbi5tZXNzYWdlcyB1bHtcbiAgbGlzdC1zdHlsZTpkaXNjO1xuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG59XG5cbi5tZXNzYWdlcyBvbHtcbiAgbGlzdC1zdHlsZTphdXRvO1xuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5pc1BpbiBwYXRoe1xuICBmaWxsOiAjRjA4QTI0O1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAucmlnaHRCdG5Cb3ggYnV0dG9uIHtcblxuICBtYXJnaW4tbGVmdDogMTBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLnJpZ2h0QnRuQm94IGJ1dHRvbiBzcGFuOmxhc3Qtb2YtdHlwZXtcbiAgXG59XG5cbnRhYmxlIHRyIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgcGFkZGluZzogNXB4O1xufVxudGFibGUgdGgsIHRhYmxlIHRkIHtcbiAgcGFkZGluZzogMTBweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbnRhYmxlIHRoIHtcbiAgLy8gZm9udC1zaXplOiAxNHB4O1xuICBsZXR0ZXItc3BhY2luZzogMXB4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG4vLyAvKiDmu5rliqjmnaHku6Xlj4rmu5rliqjmnaHovajpgZPnmoTlrr3luqYgKi9cbi8vIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xuLy8gICAgIHdpZHRoOiAxMHB4O1xuLy8gfVxuXG4vLyAvKiDmu5rliqjmnaHovajpgZPnmoTmoLflvI8qL1xuLy8gOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgXG4vLyB9XG5cbi8vIC8qIOa7muWKqOadoeeahOagt+W8jyAqL1xuLy8gOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4vLyAgICAgYmFja2dyb3VuZDogIzg4ODsgXG4vLyB9XG5cbi8vIC8qIOW9k+S9oOm8oOagh+aCrOWBnOWcqOa7muWKqOadoeS4iuaXtueahOagt+W8jyAqL1xuLy8gOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7XG4vLyAgICAgYmFja2dyb3VuZDogIzU1NTsgXG4vLyB9XG5cbi8qIOa7muWKqOadoSAqL1xuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3Jpem9udGFsIHsgLyrmsLTlubPmu5rliqjmnaHnmoTmoLflvI8qL1xuICB3aWR0aDogNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQ0NDQ0NDO1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDZweDtcbn1cbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2stcGllY2Uge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyAvKua7muWKqOadoeeahOiDjOaZr+minOiJsiovXG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMDsgLyrmu5rliqjmnaHnmoTlnIbop5Llrr3luqYqL1xufVxuOjotd2Via2l0LXNjcm9sbGJhciB7XG4gIHdpZHRoOiAxMHB4OyAvKua7muWKqOadoeeahOWuveW6piovXG4gIGhlaWdodDogOHB4OyAvKua7muWKqOadoeeahOmrmOW6piovXG59XG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOnZlcnRpY2FsIHsgLyrlnoLnm7Tmu5rliqjmnaHnmoTmoLflvI8qL1xuICBoZWlnaHQ6IDUwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5OTk7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNHB4O1xuICBvdXRsaW5lOiAycHggc29saWQgI2ZmZjtcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7XG4gIGJvcmRlcjogMnB4IHNvbGlkICNmZmY7XG59XG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHsgLyrmu5rliqjmnaHnmoRob3Zlcuagt+W8jyovXG4gIGhlaWdodDogNTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzlmOWY5ZjtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA0cHg7XG59XG5cbnByZSB7XG5iYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwO1xuYm9yZGVyLXJhZGl1czogNXB4O1xucGFkZGluZzogMTVweDtcbmJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG5jb2xvcjogIzMzMztcbmZvbnQtZmFtaWx5OiBDb3VyaWVyLCBtb25vc3BhY2U7XG5saW5lLWhlaWdodDogMS4yO1xub3ZlcmZsb3cteDogYXV0bztcbndoaXRlLXNwYWNlOiBwcmU7XG59XG5cbmJsb2NrcXVvdGUge1xucGFkZGluZzogMTBweCAyMHB4O1xubWFyZ2luOiAwIDAgMjBweDtcbmJvcmRlci1sZWZ0OiA1cHggc29saWQgI2YxZjFmMTtcbmNvbG9yOiAjNjY2O1xuYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTtcbn1cblxuYDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldERlZmF1bHRQcm9tcHQgPSBleHBvcnRzLmhhbmRsZUhpZ2h0bGlnaHQgPSBleHBvcnRzLmdldEFua2lDYXJkcyA9IGV4cG9ydHMuaGFuZGxlUHJvbXB0VmFyaWFibGVzID0gZXhwb3J0cy5nZXRVbnNwbGFzaEltYWdlcyA9IGV4cG9ydHMud2luZG93SW5pdGlhbGl6YXRpb24gPSBleHBvcnRzLmdldENsaXBib2FyZCA9IHZvaWQgMDtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgZ2V0Q2xpcGJvYXJkID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQoKVxuICAgICAgICAgICAgLnRoZW4odGV4dCA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHRleHQpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5nZXRDbGlwYm9hcmQgPSBnZXRDbGlwYm9hcmQ7XG5jb25zdCB3aW5kb3dJbml0aWFsaXphdGlvbiA9IChkYXRhKSA9PiB7XG4gICAgLy8g6K6+572u56qX5Y+j55qE6buY6K6k5L2N572uXG4gICAgaWYgKGRhdGEud2luZG93RWxlbWVudC5jdXJyZW50ICYmICFkYXRhLmlzUGluKSB7XG4gICAgICAgIC8vIENoZWNrIHRoZSBib3VuZGFyaWVzXG4gICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgY29uc3QgZWxlbWVudFdpZHRoID0gZGF0YS53aW5kb3dFbGVtZW50LmN1cnJlbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRIZWlnaHQgPSBkYXRhLndpbmRvd0VsZW1lbnQuY3VycmVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IG1pblggPSAwO1xuICAgICAgICBjb25zdCBtaW5ZID0gMDtcbiAgICAgICAgY29uc3QgbWF4WCA9IHdpbmRvd1dpZHRoIC0gZWxlbWVudFdpZHRoO1xuICAgICAgICBjb25zdCBtYXhZID0gd2luZG93SGVpZ2h0IC0gZWxlbWVudEhlaWdodDtcbiAgICAgICAgbGV0IG5ld1gsIG5ld1kgPSAwO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uT2JqZWN0ID0gZGF0YS5zZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIG5ld1ggPSBzZWxlY3Rpb25PYmplY3QueCArIHNlbGVjdGlvbk9iamVjdC53aWR0aCArIDEwO1xuICAgICAgICAgICAgbmV3WSA9IHNlbGVjdGlvbk9iamVjdC55ICsgc2VsZWN0aW9uT2JqZWN0LmhlaWdodCArIDEwO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNsYW1wZWRYID0gTWF0aC5tYXgobWluWCwgTWF0aC5taW4obmV3WCwgbWF4WCkpO1xuICAgICAgICBjb25zdCBjbGFtcGVkWSA9IE1hdGgubWF4KG1pblksIE1hdGgubWluKG5ld1ksIG1heFkpKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocHJvcHMuc2VsZWN0aW9uLmdldFJhbmdlQXQoMCkpO1xuICAgICAgICBkYXRhLndpbmRvd0VsZW1lbnQuY3VycmVudC5zdHlsZS5sZWZ0ID0gYCR7Y2xhbXBlZFh9cHhgO1xuICAgICAgICBkYXRhLndpbmRvd0VsZW1lbnQuY3VycmVudC5zdHlsZS50b3AgPSBgJHtjbGFtcGVkWX1weGA7XG4gICAgfVxuICAgIC8vIC8vIOa3u+WKoOa7muWKqOS6i+S7tu+8jOiuqea2iOaBr+WIl+ihqOiHquWKqOa7muWKqOWIsOW6lemDqFxuICAgIC8vIGRhdGEubWVzc2FnZXNMaXN0LmN1cnJlbnQ/LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlU2Nyb2xsKTtcbiAgICAvLyByZXR1cm4gKCkgPT4ge1xuICAgIC8vICAgICAvLyBjb25zb2xlLmxvZygndXNlRWZmZWN0IHJldHVybicpO1xuICAgIC8vICAgICBkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50Py5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZVNjcm9sbCk7XG4gICAgLy8gfTtcbiAgICAvLyBmdW5jdGlvbiBoYW5kbGVTY3JvbGwoKSB7XG4gICAgLy8gICAgIGlmIChkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50ICE9PSBudWxsKSB7XG4gICAgLy8gICAgICAgICBjb25zdCBpc0F0Qm90dG9tID0gZGF0YS5tZXNzYWdlc0xpc3QuY3VycmVudD8uc2Nyb2xsVG9wICsgZGF0YS5tZXNzYWdlc0xpc3QuY3VycmVudC5jbGllbnRIZWlnaHQgPj0gZGF0YS5tZXNzYWdlc0xpc3QuY3VycmVudC5zY3JvbGxIZWlnaHQgLSAwLjU7XG4gICAgLy8gICAgICAgICBpZiAoaXNBdEJvdHRvbSkge1xuICAgIC8vICAgICAgICAgICAgIC8vIOW3sue7j+S9jeS6juW6lemDqO+8jOS4jemcgOimgeiHquWKqOa7muWKqFxuICAgIC8vICAgICAgICAgICAgIHJldHVybjtcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICAgICAgLy8gc2Nyb2xsVG9Cb3R0b20oKVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIC8vIOacquS9jeS6juW6lemDqO+8jOS4jeaJp+ihjOiHquWKqOa7muWKqFxuICAgIC8vIH1cbn07XG5leHBvcnRzLndpbmRvd0luaXRpYWxpemF0aW9uID0gd2luZG93SW5pdGlhbGl6YXRpb247XG4vKipcbiAqIOiOt+WPliBVbnNwbGFzaCDlm77niYdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5V29yZCAtIOagueaNruatpOWFs+mUruWtl+aQnOe0ouWbvueJh1xuICogQHJldHVybnMge0FycmF5fSDlm77niYfliJfooahcbiAqIEB0aHJvd3Mge+W8guW4uOexu+Wei30g5byC5bi45o+P6L+wXG4gKi9cbmNvbnN0IGdldFVuc3BsYXNoSW1hZ2VzID0gKGtleVdvcmQpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyDor7fmsYIgYmFja2dyb3VuZCDojrflj5bmlbDmja5cbiAgICAgICAgLy8g5L2/55So6ZW/6L+e5o6lXG4gICAgICAgIGxldCBwb3J0ID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLmNvbm5lY3Qoe1xuICAgICAgICAgICAgbmFtZTogJ2Zyb21Qb3B1cENhcmRVdGlsJ1xuICAgICAgICB9KTtcbiAgICAgICAgLy8g5L2/55SoIHBvc3RNcyDlj5HpgIHkv6Hmga9cbiAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ2dldFVuc3BsYXNoSW1hZ2VzJywgJ21lc3NhZ2VzJzogJycsICdrZXlXb3JkJzoga2V5V29yZCB9KTtcbiAgICAgICAgLy8g5o6l5pS25L+h5oGvXG4gICAgICAgIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKG1zZyA9PiB7XG4gICAgICAgICAgICBpZiAobXNnLnR5cGUgPT09ICdzZW5kSW1nRGF0YScpIHtcbiAgICAgICAgICAgICAgICBpZiAoJ2ltZ3MnIGluIG1zZykge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndW5zcGxhc2hTZWFyY2hQaG90b3MnKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShtc2cuaW1ncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5leHBvcnRzLmdldFVuc3BsYXNoSW1hZ2VzID0gZ2V0VW5zcGxhc2hJbWFnZXM7XG4vKipcbiAqIOWkhOeQhiBQcm9tcHQg5Lit55qE5Y+Y6YePXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb21wdFN0ciAtIOmcgOimgeWkhOeQhueahCBQcm9tcHQg5a2X56ym5LiyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5V29yZCAtIOeUqOaIt+aJgOmAieS4reeahOWFs+mUruWtl1xuICogQHBhcmFtIHtzdHJpbmd9IFNlbnRlbmNlIC0g5LuO572R6aG15Lit5o+Q5Y+W55qE5YWz6ZSu5a2X5omA5Zyo55qE5Y+l5a2QXG4gKiBAcmV0dXJucyB7c3RyaW5nfSDlpITnkIblkI7nmoQgUHJvbXB0IOWtl+espuS4slxuICogQHRocm93cyB75byC5bi457G75Z6LfSDlvILluLjmj4/ov7BcbiAqL1xuY29uc3QgaGFuZGxlUHJvbXB0VmFyaWFibGVzID0gKHByb21wdFN0ciwga2V5V29yZCwgU2VudGVuY2UsIExhbmcpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGxldCBuZXdQcm9tcHRTdHIgPSBwcm9tcHRTdHI7XG4gICAgLy8g5aSE55CG5YWz6ZSu5a2X5ZKM5Y+l5a2QXG4gICAgbmV3UHJvbXB0U3RyID0gcHJvbXB0U3RyLnJlcGxhY2UoL1xce3NlbGVjdGlvblxcfS9nLCBrZXlXb3JkKTtcbiAgICBuZXdQcm9tcHRTdHIgPSBuZXdQcm9tcHRTdHIucmVwbGFjZSgvXFx7c2VudGVuY2VcXH0vZywgU2VudGVuY2UpO1xuICAgIC8vIOWkhOeQhuivreiogFxuICAgIG5ld1Byb21wdFN0ciA9IG5ld1Byb21wdFN0ci5yZXBsYWNlKC9cXHtjdXJyZW50TGFuZ3VhZ2VcXH0vZywgTGFuZ1snY3VycmVudCddWyduYW1lJ10pO1xuICAgIG5ld1Byb21wdFN0ciA9IG5ld1Byb21wdFN0ci5yZXBsYWNlKC9cXHt0YXJnZXRMYW5ndWFnZVxcfS9nLCBMYW5nWyd0YXJnZXQnXVsnbmFtZSddKTtcbiAgICAvLyDlpITnkIYgQW5raSDljZXor41cbiAgICBpZiAobmV3UHJvbXB0U3RyLmluZGV4T2YoJ3thbmtpQ2FyZHN9JykgPj0gMCkge1xuICAgICAgICAvLyDojrflj5bnm67moIfljaHniYdcbiAgICAgICAgbGV0IHJhbmRvbVZhbHVlcztcbiAgICAgICAgbGV0IGFua2lDYXJkc1N0ciA9ICcnO1xuICAgICAgICB5aWVsZCAoMCwgZXhwb3J0cy5nZXRBbmtpQ2FyZHMpKCkudGhlbigoY2FyZHMpID0+IHtcbiAgICAgICAgICAgIHJhbmRvbVZhbHVlcyA9IGNhcmRzO1xuICAgICAgICAgICAgaWYgKHJhbmRvbVZhbHVlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChyYW5kb21WYWx1ZXMubGVuZ3RoID4gNSkge1xuICAgICAgICAgICAgICAgICAgICAvLyDpmo/mnLrlj5YgWCDkuKrljaHniYdcbiAgICAgICAgICAgICAgICAgICAgLy8g5rex5ou36LSd5pWw57uE5Lul6YG/5YWN5L+u5pS55rqQ5pWw57uEXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNodWZmbGVkQXJyYXkgPSByYW5kb21WYWx1ZXMuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8g5L2/55SoIEZpc2hlci1ZYXRlcyDmtJfniYznrpfms5Xlr7nmlbDnu4Tov5vooYzmiZPkubFcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHNodWZmbGVkQXJyYXkubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgW3NodWZmbGVkQXJyYXlbaV0sIHNodWZmbGVkQXJyYXlbal1dID0gW3NodWZmbGVkQXJyYXlbal0sIHNodWZmbGVkQXJyYXlbaV1dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIOWPluWJjSB4IOS4quWFg+e0oOS9nOS4uue7k+aenFxuICAgICAgICAgICAgICAgICAgICByYW5kb21WYWx1ZXMgPSBzaHVmZmxlZEFycmF5LnNsaWNlKDAsIDUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g5bCG5Y2V6K+N5pu/5o2i5YiwIHByb21wdCDkuK1cbiAgICAgICAgICAgICAgICByYW5kb21WYWx1ZXMgPT09IG51bGwgfHwgcmFuZG9tVmFsdWVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYW5kb21WYWx1ZXMuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY2FyZC5maWVsZHMpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3RLZXkgPSBrZXlzWzBdO1xuICAgICAgICAgICAgICAgICAgICAvLyDmib7liLDljaHniYfmraPpnaJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZC5maWVsZHNba2V5c1tpXV0ub3JkZXIgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYW5raUNhcmRzU3RyICs9IGNhcmQuZmllbGRzW2ZpcnN0S2V5XS52YWx1ZSArICcsJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBuZXdQcm9tcHRTdHIgPSBuZXdQcm9tcHRTdHIucmVwbGFjZSgvXFx7YW5raUNhcmRzXFx9L2csIGFua2lDYXJkc1N0cik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1Byb21wdFN0cjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBuZXdQcm9tcHRTdHIgPSBuZXdQcm9tcHRTdHIucmVwbGFjZSgvXFx7YW5raUNhcmRzXFx9L2csICcnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdQcm9tcHRTdHI7XG59KTtcbmV4cG9ydHMuaGFuZGxlUHJvbXB0VmFyaWFibGVzID0gaGFuZGxlUHJvbXB0VmFyaWFibGVzO1xuLyoqXG4gKiDojrflj5YgQW5raSDljaHniYdcbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0W119IOi/lOWbnuWNoeeJh+eahOWvueixoeWIl+ihqFxuICogQHRocm93cyB75byC5bi457G75Z6LfSDlvILluLjmj4/ov7BcbiAqL1xuY29uc3QgZ2V0QW5raUNhcmRzID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIOWIpOaWreacrOWcsOaYr+WQpuWtmOacieacqui/h+acn+eahOaVsOaNrlxuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuZ2V0KHsgXCJhbmtpQ2FyZHNcIjogeyAnY2FyZHMnOiBbXSwgJ3RpbWUnOiAwIH0gfSkudGhlbigoaXRlbSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAvLyDnvJPlrZggMSDlsI/ml7ZcbiAgICAgICAgICAgIGlmIChpdGVtLmFua2lDYXJkcy5jYXJkcy5sZW5ndGggPiAwICYmIERhdGUubm93KCkgLSBpdGVtLmFua2lDYXJkcy50aW1lIDwgMzYwMCAqIDEwMDApIHtcbiAgICAgICAgICAgICAgICAvLyDoi6XmnKzlnLDmnInlj6/nlKjnmoTmlbDmja7vvIzliJnnm7TmjqXlpITnkIZcbiAgICAgICAgICAgICAgICByZXNvbHZlKGl0ZW0uYW5raUNhcmRzLmNhcmRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOiLpeacrOWcsOaXoOWPr+eUqOeahOaVsOaNru+8jOWImemAmui/hyBBbmtpXG4gICAgICAgICAgICAgICAgeWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnYW5raUFjdGlvbicsICdtZXNzYWdlcyc6IHsgJ2Fua2lfYWN0aW9uX3R5cGUnOiAnZmluZENhcmRzJywgJ2Fua2lfYXJndW1lbnRzJzogeyAncXVlcnknOiAnaXM6ZHVlIHByb3A6ZHVlPi0yIHByb3A6ZHVlPDMnIH0gfSwgfSkudGhlbigobWVzc2FnZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmVycm9yID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmoLnmja7ljaHniYcgSUQg5p+l6K+i5Y2h54mH5L+h5oGvXG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbmtpQWN0aW9uJywgJ21lc3NhZ2VzJzogeyAnYW5raV9hY3Rpb25fdHlwZSc6ICdjYXJkc0luZm8nLCAnYW5raV9hcmd1bWVudHMnOiB7ICdjYXJkcyc6IG1lc3NhZ2UucmVzdWx0IH0gfSwgfSkudGhlbigobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYXJkcyA9IG1lc3NhZ2UucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWwhuaVsOaNruWtmOWCqOWIsOacrOWcsO+8jOmZkOWItuacgOWkp+S/neWtmOaVsOmHj++8jOmBv+WFjeacrOWcsOWtmOWCqOepuumXtOi+vuWIsOS4iumZkFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5zZXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmtpQ2FyZHM6IHsgJ3RpbWUnOiBEYXRlLm5vdygpLCAnY2FyZHMnOiBjYXJkcy5zbGljZSgwLCAzMCkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2FyZHMuc2xpY2UoMCwgMzApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9lcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlj43ppojplJnor6/kv6Hmga9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLCAobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2Vycm9yXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn07XG5leHBvcnRzLmdldEFua2lDYXJkcyA9IGdldEFua2lDYXJkcztcbi8qKlxuICog5aSE55CG5a2X56ym5Liy77yM5a+55oyH5a6a5a2X56ym6K6+572u5qC35byP44CB54K55Ye75LqL5Lu2XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIOmcgOimgeWkhOeQhueahOWtl+espuS4slxuICogQHBhcmFtIHtzdHJpbmd9IGtleVdvcmQgLSDlvZPliY3pgInkuK3nmoTlrZfnrKZcbiAqIEByZXR1cm5zIHtzdHJpbmd9IOWkhOeQhuWQjueahCBQcm9tcHQg5a2X56ym5LiyXG4gKiBAdGhyb3dzIHvlvILluLjnsbvlnot9IOW8guW4uOaPj+i/sFxuICovXG5jb25zdCBoYW5kbGVIaWdodGxpZ2h0ID0gKHN0ciwga2V5V29yZCwgYW5raUNhcmRzLCB3aW5kb3dFbGVtZW50KSA9PiB7XG4gICAgaWYgKHN0ciA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbGV0IG5ld1N0ciA9IHN0cjtcbiAgICAvLyDlpITnkIYga2V5d29yZCDpq5jkuq5cbiAgICBuZXdTdHIgPSBuZXdTdHIucmVwbGFjZShuZXcgUmVnRXhwKGAoXnxbXipdKSgke2tleVdvcmR9KShbXipdfCQpYCwgJ2dpJyksIGZ1bmN0aW9uIChtYXRjaCwgcDEsIHAyLCBwMykge1xuICAgICAgICAvLyDlpoLmnpzlhbPplK7or43liY3lkI7msqHmnIkq77yM5YiZ5re75YqgKirvvIzlkKbliJnkv53nlZnljp/moLdcbiAgICAgICAgaWYgKHAxICE9PSAnKicgJiYgcDMgIT09ICcqJykge1xuICAgICAgICAgICAgcmV0dXJuIHAxICsgJyoqJyArIHAyICsgJyoqJyArIHAzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoOyAvLyDkuI3ov5vooYzmm7/mjaJcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG5ld1N0cik7XG4gICAgLy8g5aSE55CGIEFua2kg5Y2V6K+N6auY5LquXG4gICAgY29uc3QgY2FyZHMgPSBhbmtpQ2FyZHM7XG4gICAgaWYgKHdpbmRvd0VsZW1lbnQgJiYgY2FyZHMpIHtcbiAgICAgICAgLy8g6YGN5Y6G5q+P5LiA5Liq5Y2h54mHXG4gICAgICAgIGNhcmRzLmZvckVhY2goKGNhcmQpID0+IHtcbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY2FyZCk7XG4gICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY2FyZC5maWVsZHMpO1xuICAgICAgICAgICAgbGV0IGZpcnN0S2V5ID0ga2V5c1swXTtcbiAgICAgICAgICAgIC8vIOaJvuWIsOWNoeeJh+ato+mdolxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhcmQuZmllbGRzW2tleXNbaV1dLm9yZGVyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0S2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY2FyZEZyb250VmFsdWUgPSBjYXJkLmZpZWxkc1tmaXJzdEtleV0udmFsdWU7XG4gICAgICAgICAgICBpZiAoY2FyZEZyb250VmFsdWUgIT09IGtleVdvcmQpIHtcbiAgICAgICAgICAgICAgICBuZXdTdHIgPSBuZXdTdHIucmVwbGFjZShuZXcgUmVnRXhwKGNhcmRGcm9udFZhbHVlLCAnZ2knKSwgYDxtYXJrPiR7Y2FyZEZyb250VmFsdWV9PC9tYXJrPmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gfSwgMTApO1xuICAgICAgICAgICAgLy8gLy8g5Yib5bu65LiA5Liq55So5LqO5YyF6KO5J28n55qEPHNwYW4+5YWD57SgXG4gICAgICAgICAgICAvLyB2YXIgc3BhbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAvLyBzcGFuRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY2FyZElEJywgY2FyZC5pZCk7XG4gICAgICAgICAgICAvLyBzcGFuRWxlbWVudC5jbGFzc05hbWUgPSAnaGVsbG8nO1xuICAgICAgICAgICAgLy8gc3BhbkVsZW1lbnQuc3R5bGUuY29sb3IgPSAncmVkJztcbiAgICAgICAgICAgIC8vIHNwYW5FbGVtZW50LnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgICAgIC8vIHNwYW5FbGVtZW50LnRleHRDb250ZW50ID0gY2FyZEZyb250VmFsdWU7XG4gICAgICAgICAgICAvLyAvLyBuZXdTdHIgPSBuZXdTdHIucmVwbGFjZSgvby9naSwgc3BhbkVsZW1lbnQub3V0ZXJIVE1MKTtcbiAgICAgICAgICAgIC8vIG5ld1N0ciA9IG5ld1N0ci5yZXBsYWNlKG5ldyBSZWdFeHAoY2FyZEZyb250VmFsdWUsICdnaScpLCBzcGFuRWxlbWVudC5vdXRlckhUTUwpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8g5a+55LiK6L+w5YWD57Sg5re75Yqg54K55Ye75LqL5Lu2XG4gICAgICAgIC8vIGxldCBoaWdodGxpZ2h0RG9tID0gd2luZG93RWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdoZWxsbycpXG4gICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgaGlnaHRsaWdodERvbS5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyAgICAgaGlnaHRsaWdodERvbVtpXS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUhpZ2h0bGlnaHRDbGljaylcbiAgICAgICAgLy8gICAgIGhpZ2h0bGlnaHREb21baV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVIaWdodGxpZ2h0Q2xpY2spXG4gICAgICAgIC8vIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld1N0cjtcbiAgICAvLyByZXR1cm4gJ3RydWUnXG59O1xuZXhwb3J0cy5oYW5kbGVIaWdodGxpZ2h0ID0gaGFuZGxlSGlnaHRsaWdodDtcbi8qKlxuICog6I635Y+W57O757uf55qE6buY6K6kIFByb21wdFxuICogQHBhcmFtIHtzdHJpbmd9IGtleVdvcmQgLSDlvZPliY3pgInkuK3nmoTlrZfnrKZcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFByb21wdCDlrZfnrKbkuLJcbiAqIEB0aHJvd3Mge+W8guW4uOexu+Wei30g5byC5bi45o+P6L+wXG4gKi9cbmNvbnN0IGdldERlZmF1bHRQcm9tcHQgPSAoa2V5V29yZCkgPT4ge1xuICAgIGxldCB1c2VyUHJvbXB0ID0gYFxuXG4gICAgICAgIFBsZWFzZSBoZWxwIG1lIGxlYXJuIGFzIGEgZm9yZWlnbiBsYW5ndWFnZSB0ZWFjaGVyLiBTZW50ZW5jZXMgaW4gZXhhbXBsZXMgc2hvdWxkIG5vdCBiZSB0aGUgc2FtZSBhcyB0aGUgZ2l2ZW4gc2VudGVuY2UuXG5cbiAgICAgICAgRXhhbXBsZe+8mlxuICAgICAgICBcIlwiXCJcbiAgICAgICAgLSAgTWVhbmluZzogPEV4cGxhaW4gdGhlIG1lYW5pbmcgdXNpbmcge2N1cnJlbnRMYW5ndWFnZX0+XG4gICAgICAgIC0gIFBhcnQgb2YgU3BlZWNoOiA8SW5kaWNhdGUgdGhlIHBhcnQgb2Ygc3BlZWNoIHVzaW5nIHtjdXJyZW50TGFuZ3VhZ2V9PlxuICAgICAgICBcbiAgICAgICAgIyMgTWVhbmluZyBpbiB0aGUgc2VudGVuY2VcbiAgICAgICAgLSAgPEV4cGxhaW4gdGhlIG1lYW5pbmcgb2YgdGhlIHdvcmQgaW4gdGhlIHNlbnRlbmNlIHVzaW5nIHtjdXJyZW50TGFuZ3VhZ2V9PlxuICAgICAgICBcbiAgICAgICAgIyMgRXhhbXBsZSBTZW50ZW5jZXNcbiAgICAgICAgLSAgPHt0YXJnZXRMYW5ndWFnZX0gZXhhbXBsZSBzZW50ZW5jZT4gLSA8VHJhbnNsYXRpb24gaW4ge2N1cnJlbnRMYW5ndWFnZX0+XG4gICAgICAgIC0gIDx7dGFyZ2V0TGFuZ3VhZ2V9IGV4YW1wbGUgc2VudGVuY2U+IC0gPFRyYW5zbGF0aW9uIGluIHtjdXJyZW50TGFuZ3VhZ2V9PlxuICAgICAgICBcbiAgICAgICAgIyMgVHJhbnNsYXRpb24gRXhlcmNpc2VcbiAgICAgICAgLSAgPHtjdXJyZW50TGFuZ3VhZ2V9IHNlbnRlbmNlPlxuICAgICAgICAtICA8e2N1cnJlbnRMYW5ndWFnZX0gc2VudGVuY2U+XG4gICAgICAgIFxuICAgICAgICBcIlwiXCIgXG4gICAgICAgIFxuICAgICAgICBXb3JkOntzZWxlY3Rpb259LCBzZW50ZW5jZToge3NlbnRlbmNlfSxZb3UgbXVzdCByZXBseSBpbiB0aGUgc3BlY2lmaWVkIGxhbmd1YWdlXG5cbiAgICAgICAgUGxlYXNlIHN0YXJ0IHRlYWNoaW5nOlxuXG4gICAgICAgIGA7XG4gICAgLy8g5YWz6ZSu5a2X6ZW/5bqm6L6D6ZW/5pe277yM5oyJ54Wn5Y+l5a2Q6L+b6KGM5aSE55CGXG4gICAgaWYgKGtleVdvcmQubGVuZ3RoID4gMjApIHtcbiAgICAgICAgdXNlclByb21wdCA9IGBcbiAgICAgIFxuICAgICAgICAgICAgICAgICAgQXMgYSBsYW5ndWFnZSB0ZWFjaGVyLCBJIHdpbGwgcHJvdmlkZSBhbiBleHBsYW5hdGlvbiBvZiB0aGUgZ3JhbW1hciBrbm93bGVkZ2UgaW4gdGhlIGdpdmVuIHNlbnRlbmNlOlxuICAgICAgXG4gICAgICAgICAgICAgICAgICBFeGFtcGxlOlxuICAgICAgICAgICAgICAgICAgXCJcIlwiXG4gICAgICBcbiAgICAgICAgICAgICAgICAgICMjIFRyYW5zbGF0aW9uXG4gICAgICAgICAgICAgICAgICA8VHJhbnNsYXRlIHRvIHtjdXJyZW50TGFuZ3VhZ2V9PlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAjIyBHcmFtbWFyXG4gICAgICAgICAgICAgICAgICA8LSBQb2ludDogRXhwbGFpbiBpbiB7Y3VycmVudExhbmd1YWdlfT5cbiAgICAgIFxuICAgICAgICAgICAgICAgICAgIyMgRXhhbXBsZXMgb2YgcmVsYXRlZCBncmFtbWFyXG4gICAgICAgICAgICAgICAgICAtICA8e3RhcmdldExhbmd1YWdlfSBleGFtcGxlIHNlbnRlbmNlPiAtIDxUcmFuc2xhdGlvbiBpbiB7Y3VycmVudExhbmd1YWdlfT5cbiAgICAgICAgICAgICAgICAgIC0gIDx7dGFyZ2V0TGFuZ3VhZ2V9IGV4YW1wbGUgc2VudGVuY2U+IC0gPFRyYW5zbGF0aW9uIGluIHtjdXJyZW50TGFuZ3VhZ2V9PlxuICAgICAgXG4gICAgICAgICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgU2VudGVuY2U6IHtzZWxlY3Rpb259YDtcbiAgICB9XG4gICAgY29uc3QgZGVmYXVsdFByb21wdCA9IHtcbiAgICAgICAgJ3RpdGxlJzogJ0RlZmF1bHQnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiB0cnVlLCAndXNlclByb21wdCc6IHVzZXJQcm9tcHQsXG4gICAgICAgICdpZCc6ICdEZWZhdWx0J1xuICAgIH07XG4gICAgcmV0dXJuIGRlZmF1bHRQcm9tcHQ7XG59O1xuZXhwb3J0cy5nZXREZWZhdWx0UHJvbXB0ID0gZ2V0RGVmYXVsdFByb21wdDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNldERvbm90Q2xvc2VQb3B1cENhcmQgPSBleHBvcnRzLnBpblBvcHVwQ2FyZCA9IHZvaWQgMDtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgcmVhY3RfZG9tXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlYWN0LWRvbVwiKSk7XG5jb25zdCBQb3B1cENhcmRfMSA9IHJlcXVpcmUoXCIuL1BvcHVwQ2FyZFwiKTtcbmNvbnN0IGNzc2luanNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9jc3NpbmpzXCIpO1xuY29uc3QgbGFuZ18xID0gcmVxdWlyZShcIi4vbGliL2xhbmdcIik7XG5jb25zdCBsb2NhbGVfMSA9IHJlcXVpcmUoXCIuL2xpYi9sb2NhbGVcIik7XG5jb25zdCBzdHlsZV8xID0gcmVxdWlyZShcIi4vUG9wdXBDYXJkL3N0eWxlXCIpO1xuLy8gaW1wb3J0ICcuL2Fzc2V0cy90YWlsd2luZC5jc3MnO1xuLy8g6aG16Z2i6L295YWl5ZCO5Lya5rOo5YWl5qyh6ISa5pys77yM5oiWIGJhY2tncm91bmQg5Y+v6IO95Lya5Zyo5LiA5Lqb5oOF5Ya15LiL5rOo5YWl5q2k6ISa5pysXG4vLyBjb25zb2xlLmxvZygnYmVmb3JlIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXInKTtcbi8vIOiusOW9leW9k+WJjeeql+WPo+aYr+WQpiBQaW4g5L2PXG5sZXQgaXNQaW4gPSBmYWxzZTtcbi8vIOiuvue9ruW9k+WJjeeql+WPo+aYr+WQpuWFgeiuuOWFs+mXrVxubGV0IGRvbm90Q2xvc2VQb3B1cENhcmQgPSBmYWxzZTtcbi8vIOWIneWni+WMluS4u+WuueWZqO+8jOS4u+WuueWZqOeUqOadpeaMguWcqOWFqOWxgOagt+W8j++8jOWMheaLrOesrOS4ieaWuee7hOS7tueahOagt+W8j1xubGV0IE15Qm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ19famlhbmctc2NvdXRlcicpO1xuLy8gY29uc29sZS5sb2coTXlCb3gpO1xuLy8gY29udGFpbmVyIOaJv+i9vSBVSSDnu4Tku7ZcbmxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnRhaW5lci5jbGFzc05hbWUgPSAnY29udGFpbmVyJztcbi8vIOS9v+eUqCBzaGFkb3cg5p2l6ZqU56a75qC35byPXG5sZXQgc2hhZG93Um9vdCA9IHVuZGVmaW5lZDtcbmlmIChNeUJveCA9PT0gbnVsbCB8fCBNeUJveCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8g5aaC5p6c5LiN5a2Y5Zyo5a655ZmoXG4gICAgLy8g5Yib5bu65Li75a655ZmoXG4gICAgTXlCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBNeUJveC5pZCA9ICdfX2ppYW5nLXNjb3V0ZXInO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uYXBwZW5kQ2hpbGQoTXlCb3gpO1xuICAgIE15Qm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IC8v6buY6K6k6ZqQ6JePXG4gICAgc2hhZG93Um9vdCA9IE15Qm94ID09PSBudWxsIHx8IE15Qm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBNeUJveC5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdCA9PT0gbnVsbCB8fCBzaGFkb3dSb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgLy8gQW50IOe7hOS7tuagt+W8j1xuICAgIC8vIGNvbnN0IGFudFN0eWxlc2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgLy8gYW50U3R5bGVzaGVldC5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgLy8gYW50U3R5bGVzaGVldC5ocmVmID0gJ2h0dHBzOi8vY2RuLmJvb3RjZG4ubmV0L2FqYXgvbGlicy9hbnRkLzQuMTcuMS9hbnRkLm1pbi5jc3MnO1xuICAgIC8vIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoYW50U3R5bGVzaGVldCk7XG4gICAgLy8gVGFpbHdpbmRcbiAgICBjb25zdCB0YWlsd2luZFN0eWxlc2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgdGFpbHdpbmRTdHlsZXNoZWV0LnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICB0YWlsd2luZFN0eWxlc2hlZXQuaHJlZiA9ICdodHRwczovL3VucGtnLmNvbS90YWlsd2luZGNzc0BeMi9kaXN0L3RhaWx3aW5kLm1pbi5jc3MnO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGFpbHdpbmRTdHlsZXNoZWV0KTtcbiAgICAvLyDlnKggU2hhZG93IERPTSDkuK3mt7vliqDmoLflvI/vvJpcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBzdHlsZV8xLnBvcHVwQ2FyZFN0eWxlO1xuICAgIHNoYWRvd1Jvb3QgPT09IG51bGwgfHwgc2hhZG93Um9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hhZG93Um9vdC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5sZXQgcG9ydCA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5jb25uZWN0KHtcbiAgICBuYW1lOiAnZnJvbUNvbnRlbnRTY3JpcHQnXG59KTtcbi8vIOaOpeaUtiBiYWNrZ3JvdW5kIOa2iOaBr++8iOebruWJjeaYr+mAmui/h+a1j+iniOWZqOeahOWPs+mUruiPnOWNleinpuWPke+8iVxud2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAobXNnLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIHZhciBfYTtcbiAgICAvLyBjb25zb2xlLmxvZygnY29udGVudCBzY3JpcHQgb25NZXNzYWdlOicpO1xuICAgIC8vIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgaWYgKG1zZy50eXBlID09PSAnb3Blbi1zY291dGVyJykge1xuICAgICAgICAvLyDlpITnkIbnqpflj6NcbiAgICAgICAgaWYgKE15Qm94ICE9PSBudWxsICYmIE15Qm94ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIOWmguaenOW3suWtmOWcqOWuueWZqFxuICAgICAgICAgICAgaWYgKCgoX2EgPSBNeUJveC5zaGFkb3dSb290KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lcicpKSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIOWmguaenOS4jeWtmOWcqCBQb3B1cENhcmRcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gJ2NvbnRhaW5lcic7XG4gICAgICAgICAgICAgICAgc2hhZG93Um9vdCA9PT0gbnVsbCB8fCBzaGFkb3dSb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDlgZzmraLml6fnmoTlr7nor51cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ1N0b3BUaGVDb252ZXJzYXRpb24nLCAnbWVzc2FnZXMnOiAnJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIC8vIOmHjeaWsOmTvuaOpVxuICAgICAgICAgICAgICAgIHBvcnQgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdmcm9tQ29udGVudFNjcmlwdCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnU3RvcFRoZUNvbnZlcnNhdGlvbicsICdtZXNzYWdlcyc6ICcnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgTXlCb3guc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAvLyDnp7vpmaTml6flhoXlrrnvvIzpgb/lhY0gMiDmrKHmuLLmn5Pmt7fmnYLlnKjkuIDotbdcbiAgICAgICAgICAgIC8vIGNvbnRhaW5lci5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+S4jeWtmOWcqCBCb3gg5a655ZmoJyk7XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSAnY29udGFpbmVyJztcbiAgICAgICAgICAgIHNoYWRvd1Jvb3QgPT09IG51bGwgfHwgc2hhZG93Um9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIC8vIOaYvuekuueql+WPo1xuICAgICAgICBpZiAoc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5rZXlXb3JkICE9PSAnJykge1xuICAgICAgICAgICAgc2hvd1BvcHVwQ2FyZCh7ICdrZXlXb3JkJzogc2VsZWN0aW9uID09PSBudWxsIHx8IHNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VsZWN0aW9uLmtleVdvcmQsICdTZW50ZW5jZSc6IHNlbGVjdGlvbi5zZW50ZW5jZSB9LCB3aW5kb3cuZ2V0U2VsZWN0aW9uKCksIGNvbnRhaW5lciwgc2hhZG93Um9vdCwgaXNQaW4sIG1zZy5ydW5Qcm9tcHQpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3NlbGVjdGlvbmNoYW5nZScsIGhhbmRsZVNlbGVjdGlvbmNoYW5nZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZXVwKTtcbiAgICAgICAgLy8g55uR5ZCs6aG16Z2i54K55Ye75LqL5Lu2XG4gICAgICAgIGRvY3VtZW50Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBpZiAoTXlCb3ggIT09IHVuZGVmaW5lZCAmJiBNeUJveCAhPT0gbnVsbCAmJiAhaXNQaW4gJiYgIWRvbm90Q2xvc2VQb3B1cENhcmQpIHtcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzngrnlh7vnmoTkuI3mmK/mj5Lku7bnqpflj6Plj4rlhbblrZDlhYPntKDvvIzliJnlhbPpl63nqpflj6NcbiAgICAgICAgICAgICAgICBpZiAoTXlCb3ggIT09IGV2ZW50LnRhcmdldCAmJiAhTXlCb3guY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAvLyDpmpDol4/nqpflj6NcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gY29udGFpbmVyLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzZWxlY3Rpb25jaGFuZ2UnLCBoYW5kbGVTZWxlY3Rpb25jaGFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2V1cCk7XG4gICAgICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb250YWluZXIub25tb3VzZWRvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb250YWluZXIub25tb3VzZWRvd24nKTtcbiAgICAgICAgICAgIC8vIOmakOiXjyBzZXRBbmtpU3BhY2VCdXR0b25cbiAgICAgICAgICAgIGNvbnN0IGFua2lTcGFjZUJ1dHRvbkJveCA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhbmtpU3BhY2VCdXR0b25Cb3gnKVswXTtcbiAgICAgICAgICAgIGlmIChhbmtpU3BhY2VCdXR0b25Cb3gpIHtcbiAgICAgICAgICAgICAgICAvLyDngrnlh7vnmoTkuI3mmK8gc2V0QW5raVNwYWNlQnV0dG9uIOaXtuaJjemakOiXj1xuICAgICAgICAgICAgICAgIGlmIChhbmtpU3BhY2VCdXR0b25Cb3ggIT09IGV2ZW50LnRhcmdldCAmJiAhYW5raVNwYWNlQnV0dG9uQm94LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gYW5raVNwYWNlQnV0dG9uQm94LnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVDaGlsZChhbmtpU3BhY2VCdXR0b25Cb3gpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59KTtcbi8vIOaYvuekuuW6lOeUqOeql+WPo1xuZnVuY3Rpb24gc2hvd1BvcHVwQ2FyZChkYXRhLCBtc2csIE15Qm94LCBzaGFkb3dSb290LCBpc1BpbiwgcnVuUHJvbXB0KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8gbGV0IGEgPSBhd2FpdCBmZXRjaGN1cnJlbnRMYW5ndWFnZSgpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGEpO1xuICAgICAgICBjb25zdCBsYW5nID0geWllbGQgKDAsIGxhbmdfMS5mZXRjaGN1cnJlbnRMYW5ndWFnZSkoKTtcbiAgICAgICAgcmVhY3RfZG9tXzEuZGVmYXVsdC5yZW5kZXIocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LlN0cmljdE1vZGUsIG51bGwsXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChsb2NhbGVfMS5DdXJyZW50TGFuZ3VhZ2VDb250ZXh0LlByb3ZpZGVyLCB7IHZhbHVlOiBsYW5nIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoY3NzaW5qc18xLlN0eWxlUHJvdmlkZXIsIHsgY29udGFpbmVyOiBzaGFkb3dSb290IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFBvcHVwQ2FyZF8xLlBvcHVwQ2FyZCwgeyBkYXRhOiBkYXRhLCBzZWxlY3Rpb246IG1zZywgcnVuUHJvbXB0OiBydW5Qcm9tcHQsIGlzUGluOiBpc1BpbiB9KSkpKSwgTXlCb3gpO1xuICAgIH0pO1xufVxuY29uc3QgcGluUG9wdXBDYXJkID0gKHZhbHVlKSA9PiB7XG4gICAgaXNQaW4gPSB2YWx1ZTtcbn07XG5leHBvcnRzLnBpblBvcHVwQ2FyZCA9IHBpblBvcHVwQ2FyZDtcbmNvbnN0IHNldERvbm90Q2xvc2VQb3B1cENhcmQgPSAodmFsdWUpID0+IHtcbiAgICBkb25vdENsb3NlUG9wdXBDYXJkID0gdmFsdWU7XG59O1xuZXhwb3J0cy5zZXREb25vdENsb3NlUG9wdXBDYXJkID0gc2V0RG9ub3RDbG9zZVBvcHVwQ2FyZDtcbmxldCBpc1RleHRTZWxlY3RlZCA9IGZhbHNlO1xuY29uc3QgaGFuZGxlU2VsZWN0aW9uY2hhbmdlID0gKCkgPT4ge1xuICAgIC8vIGxldCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgLy8gaWYgKHNlbGVjdGlvbikge1xuICAgIC8vICAgY29uc29sZS5sb2coJ3NlbGVjdGlvbi50b1N0cmluZygpOicpO1xuICAgIC8vICAgY29uc29sZS5sb2coc2VsZWN0aW9uLnRvU3RyaW5nKCkpO1xuICAgIC8vICAgaXNUZXh0U2VsZWN0ZWQgPSBzZWxlY3Rpb24udG9TdHJpbmcoKS5sZW5ndGggPiAwO1xuICAgIC8vIH1cbn07XG5jb25zdCBoYW5kbGVNb3VzZXVwID0gKGV2ZW50KSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZU1vdXNldXAnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhpc1RleHRTZWxlY3RlZCk7XG4gICAgLy8gY29uc29sZS5sb2coZG9ub3RDbG9zZVBvcHVwQ2FyZCk7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNlbGVjdGlvbikge1xuICAgICAgICBpc1RleHRTZWxlY3RlZCA9IHNlbGVjdGlvbi5zZWxlY3Rpb24udG9TdHJpbmcoKS5sZW5ndGggPiAwO1xuICAgIH1cbiAgICBpZiAoaXNUZXh0U2VsZWN0ZWQgJiYgIWRvbm90Q2xvc2VQb3B1cENhcmQpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2lzVGV4dFNlbGVjdGVkICYmICFkb25vdENsb3NlUG9wdXBDYXJkJyk7XG4gICAgICAgIGlmIChNeUJveCAhPT0gZXZlbnQudGFyZ2V0ICYmICEoTXlCb3ggPT09IG51bGwgfHwgTXlCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IE15Qm94LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpKSB7XG4gICAgICAgICAgICAvLyDlnKggUG9wdXBDYXJkIOiMg+WbtOWkluinpuWPkVxuICAgICAgICAgICAgaXNUZXh0U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIOWBnOatouaXp+eahOWvueivnVxuICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ1N0b3BUaGVDb252ZXJzYXRpb24nLCAnbWVzc2FnZXMnOiAnJyB9KTtcbiAgICAgICAgICAgIC8vIOaYvuekuueql+WPo1xuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbiAmJiAoc2VsZWN0aW9uID09PSBudWxsIHx8IHNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VsZWN0aW9uLmtleVdvcmQubGVuZ3RoKSA+IDApIHtcbiAgICAgICAgICAgICAgICBzaG93UG9wdXBDYXJkKHsgJ2tleVdvcmQnOiBzZWxlY3Rpb24gPT09IG51bGwgfHwgc2VsZWN0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZWxlY3Rpb24ua2V5V29yZCwgJ1NlbnRlbmNlJzogc2VsZWN0aW9uLnNlbnRlbmNlIH0sIHdpbmRvdy5nZXRTZWxlY3Rpb24oKSwgY29udGFpbmVyLCBzaGFkb3dSb290LCBpc1BpbiwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyDlnKggUG9wdXBDYXJkIOiMg+WbtOWGheinpuWPkVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1BvcHVwQ2FyZCcpO1xuICAgICAgICAgICAgLy8g5pi+56S65a6M5b2i5aGr56m65pON5L2c5oyJ6ZKuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKCdfX2ppYW5nLXNjb3V0ZXInKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnX19qaWFuZy1zY291dGVyJykpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY29udGFpbmVyKTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IHNoYWRvd1Jvb3QuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRTdHJpbmcgPSBzZWxlY3RlZFRleHQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZWxlY3RlZFRleHRTdHJpbmc6Jyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxlY3RlZFRleHRTdHJpbmcpO1xuICAgICAgICAgICAgY29uc3QgUG9wdXBDYXJkQ29udGFpbmVyID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRhaW5lcicpWzBdO1xuICAgICAgICAgICAgaWYgKFBvcHVwQ2FyZENvbnRhaW5lciAmJiBzZWxlY3RlZFRleHRTdHJpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBhbmtpU3BhY2VCdXR0b25Cb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBhbmtpU3BhY2VCdXR0b25Cb3guY2xhc3NOYW1lID0gJ2Fua2lTcGFjZUJ1dHRvbkJveCc7XG4gICAgICAgICAgICAgICAgbGV0IHNldEFua2lTcGFjZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHNldEFua2lTcGFjZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdbLi4uXSc7XG4gICAgICAgICAgICAgICAgc2V0QW5raVNwYWNlQnV0dG9uLmNsYXNzTmFtZSA9ICdzZXRBbmtpU3BhY2VCdXR0b24nO1xuICAgICAgICAgICAgICAgIGxldCBuZXdBbmtpU3BhY2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBuZXdBbmtpU3BhY2VCdXR0b24udGV4dENvbnRlbnQgPSAnWy4uLl0rJztcbiAgICAgICAgICAgICAgICBuZXdBbmtpU3BhY2VCdXR0b24uY2xhc3NOYW1lID0gJ3NldEFua2lTcGFjZUJ1dHRvbic7XG4gICAgICAgICAgICAgICAgLy/orr7nva7mjInpkq7nmoTkvY3nva5cbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRYID0gc2VsZWN0ZWRUZXh0LmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueDtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRZID0gc2VsZWN0ZWRUZXh0LmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRXaWR0aCA9IHNlbGVjdGVkVGV4dC5nZXRSYW5nZUF0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dEhlaWdodCA9IHNlbGVjdGVkVGV4dC5nZXRSYW5nZUF0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgICAgICAgICBhbmtpU3BhY2VCdXR0b25Cb3guYXBwZW5kQ2hpbGQoc2V0QW5raVNwYWNlQnV0dG9uKTtcbiAgICAgICAgICAgICAgICBhbmtpU3BhY2VCdXR0b25Cb3guYXBwZW5kQ2hpbGQobmV3QW5raVNwYWNlQnV0dG9uKTtcbiAgICAgICAgICAgICAgICBQb3B1cENhcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoYW5raVNwYWNlQnV0dG9uQm94KTtcbiAgICAgICAgICAgICAgICBjb25zdCBidXR0b25YID0gYW5raVNwYWNlQnV0dG9uQm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLng7XG4gICAgICAgICAgICAgICAgY29uc3QgYnV0dG9uWSA9IGFua2lTcGFjZUJ1dHRvbkJveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKChzZWxlY3RlZFRleHRYIC0gYnV0dG9uWCkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgYW5raVNwYWNlQnV0dG9uQm94LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgICAgICAgICAgICBhbmtpU3BhY2VCdXR0b25Cb3guc3R5bGUubGVmdCA9IChzZWxlY3RlZFRleHRYIC0gYnV0dG9uWCArIHNlbGVjdGVkVGV4dFdpZHRoIC0gNDApLnRvU3RyaW5nKCkgKyAncHgnO1xuICAgICAgICAgICAgICAgIGFua2lTcGFjZUJ1dHRvbkJveC5zdHlsZS50b3AgPSAoc2VsZWN0ZWRUZXh0WSAtIGJ1dHRvblkgLSBzZWxlY3RlZFRleHRIZWlnaHQgLSAyMCkudG9TdHJpbmcoKSArICdweCc7XG4gICAgICAgICAgICAgICAgbGV0IHJhbmdlID0gc2VsZWN0ZWRUZXh0LmdldFJhbmdlQXQoMCk7XG4gICAgICAgICAgICAgICAgc2V0QW5raVNwYWNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICAgICAgc2V0QW5raVNwYWNlKHJhbmdlLCBzZWxlY3RlZFRleHRTdHJpbmcsIGV2ZW50LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIChfYSA9IGFua2lTcGFjZUJ1dHRvbkJveC5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlQ2hpbGQoYW5raVNwYWNlQnV0dG9uQm94KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBuZXdBbmtpU3BhY2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgICAgICBzZXRBbmtpU3BhY2UocmFuZ2UsIHNlbGVjdGVkVGV4dFN0cmluZywgZXZlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSBhbmtpU3BhY2VCdXR0b25Cb3gucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZUNoaWxkKGFua2lTcGFjZUJ1dHRvbkJveCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBcbiAgICAgICAgfVxuICAgIH1cbn07XG5jb25zdCBnZXRTZWxlY3Rpb24gPSAoKSA9PiB7XG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2Y7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgIGlmIChzZWxlY3Rpb24gIT09IG51bGwpIHtcbiAgICAgICAgLy8g5b2T5YmN6YCJ5Lit55qE5paH5a2XXG4gICAgICAgIGxldCBrZXlXb3JkID0gc2VsZWN0aW9uLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgICAgICAvLyDpgInkuK3mloflrZfmiYDlnKjnmoTmrrXokL1cbiAgICAgICAgbGV0IHNlbnRlbmNlID0gKF9iID0gKF9hID0gc2VsZWN0aW9uLmFuY2hvck5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50ZXh0Q29udGVudCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogJyc7XG4gICAgICAgIGlmIChzZW50ZW5jZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZW50ZW5jZSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VudGVuY2UgPSBzZW50ZW5jZS5sZW5ndGggPD0ga2V5V29yZC5sZW5ndGggPyAoX2YgPSAoX2UgPSAoX2QgPSAoX2MgPSBzZWxlY3Rpb24uYW5jaG9yTm9kZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuaW5uZXJUZXh0KSAhPT0gbnVsbCAmJiBfZiAhPT0gdm9pZCAwID8gX2YgOiAnJyA6IHNlbnRlbmNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7ICdzZWxlY3Rpb24nOiBzZWxlY3Rpb24sICdrZXlXb3JkJzoga2V5V29yZCwgJ3NlbnRlbmNlJzogc2VudGVuY2UgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn07XG5jb25zdCBzZXRBbmtpU3BhY2UgPSAocmFuZ2UsIHNlbGVjdGVkVGV4dCwgZXZlbnQsIGlzQWRkTmV3KSA9PiB7XG4gICAgY29uc29sZS5sb2coc2VsZWN0ZWRUZXh0KTtcbiAgICBsZXQgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCBhbmtpU3BhY2UgPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYW5raVNwYWNlJyk7XG4gICAgY29uc29sZS5sb2coYW5raVNwYWNlKTtcbiAgICAvLyDojrflj5blvZPliY3mnIDlpKfnmoQgaW5kZXhcbiAgICBsZXQgbWF4SW5kZXggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYW5raVNwYWNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRoaXNJbmRleCA9IE51bWJlcihhbmtpU3BhY2VbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykpO1xuICAgICAgICBpZiAodGhpc0luZGV4ID4gbWF4SW5kZXgpIHtcbiAgICAgICAgICAgIG1heEluZGV4ID0gdGhpc0luZGV4O1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBudW1iZXIgPSBtYXhJbmRleCA9PT0gMCA/IDEgOiBtYXhJbmRleDtcbiAgICBpZiAoaXNBZGROZXcpIHtcbiAgICAgICAgbnVtYmVyID0gbWF4SW5kZXggKyAxO1xuICAgIH1cbiAgICBzcGFuLnRleHRDb250ZW50ID0gJ3t7YycgKyBudW1iZXIgKyAnOjonICsgc2VsZWN0ZWRUZXh0ICsgJ319JztcbiAgICBzcGFuLmNsYXNzTmFtZSA9ICdhbmtpU3BhY2UnO1xuICAgIHNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgbnVtYmVyLnRvU3RyaW5nKCkpO1xuICAgIHNwYW4ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyDmgaLlpI3kuLrpu5jorqTmoLflvI9cbiAgICAgICAgLy8gc3Bhbi5pbm5lclRleHRcbiAgICAgICAgaWYgKHNwYW4udGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgIC8vIGxldCBvbGRUZXh0ID0gc3Bhbi50ZXh0Q29udGVudFxuICAgICAgICAgICAgLy8gb2xkVGV4dCA9IG9sZFRleHQucmVwbGFjZSgne3tjMTo6JywgJycpXG4gICAgICAgICAgICAvLyBvbGRUZXh0ID0gb2xkVGV4dC5yZXBsYWNlKCd9fScsICcnKVxuICAgICAgICAgICAgdmFyIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc2VsZWN0ZWRUZXh0KTtcbiAgICAgICAgICAgIChfYSA9IHNwYW4ucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlcGxhY2VDaGlsZCh0ZXh0Tm9kZSwgc3Bhbik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnNvbGUubG9nKHJhbmdlKTtcbiAgICByYW5nZSA9PT0gbnVsbCB8fCByYW5nZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcbiAgICByYW5nZSA9PT0gbnVsbCB8fCByYW5nZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmFuZ2UuaW5zZXJ0Tm9kZShzcGFuKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy51c2VDdXJyZW50TGFuZ3VhZ2UgPSBleHBvcnRzLkN1cnJlbnRMYW5ndWFnZUNvbnRleHQgPSB2b2lkIDA7XG5jb25zdCByZWFjdF8xID0gcmVxdWlyZShcInJlYWN0XCIpO1xuY29uc3QgbGFuZ18xID0gcmVxdWlyZShcIi4vbGFuZ1wiKTtcbmNvbnN0IGFzeW5jRmV0Y2hjdXJyZW50TGFuZ3VhZ2UgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICByZXR1cm4geWllbGQgKDAsIGxhbmdfMS5mZXRjaGN1cnJlbnRMYW5ndWFnZSkoKTtcbn0pO1xuLy8g6I635Y+W5b2T5YmN6K+t6KiAXG5leHBvcnRzLkN1cnJlbnRMYW5ndWFnZUNvbnRleHQgPSAoMCwgcmVhY3RfMS5jcmVhdGVDb250ZXh0KShudWxsKTtcbmNvbnN0IHVzZUN1cnJlbnRMYW5ndWFnZSA9ICgpID0+ICgwLCByZWFjdF8xLnVzZUNvbnRleHQpKGV4cG9ydHMuQ3VycmVudExhbmd1YWdlQ29udGV4dCk7XG5leHBvcnRzLnVzZUN1cnJlbnRMYW5ndWFnZSA9IHVzZUN1cnJlbnRMYW5ndWFnZTtcbiIsImV4cG9ydCBkZWZhdWx0IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFjY0FBQUNwQ0FZQUFBQmVkZllzQUFBQnAybFVXSFJZVFV3NlkyOXRMbUZrYjJKbExuaHRjQUFBQUFBQVBEOTRjR0ZqYTJWMElHSmxaMmx1UFNMdnU3OGlJR2xrUFNKWE5VMHdUWEJEWldocFNIcHlaVk42VGxSamVtdGpPV1FpUHo0S1BIZzZlRzF3YldWMFlTQjRiV3h1Y3pwNFBTSmhaRzlpWlRwdWN6cHRaWFJoTHlJZ2VEcDRiWEIwYXowaVdFMVFJRU52Y21VZ05pNHdMakFpUGdvZ1BISmtaanBTUkVZZ2VHMXNibk02Y21SbVBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHhPVGs1THpBeUx6SXlMWEprWmkxemVXNTBZWGd0Ym5NaklqNEtJQ0E4Y21SbU9rUmxjMk55YVhCMGFXOXVJSEprWmpwaFltOTFkRDBpSWdvZ0lDQWdlRzFzYm5NNlpYaHBaajBpYUhSMGNEb3ZMMjV6TG1Ga2IySmxMbU52YlM5bGVHbG1MekV1TUM4aUNpQWdJR1Y0YVdZNlZYTmxja052YlcxbGJuUTlJbE5qY21WbGJuTm9iM1FpQ2lBZ0lHVjRhV1k2VUdsNFpXeFpSR2x0Wlc1emFXOXVQU0l4TmpraUNpQWdJR1Y0YVdZNlVHbDRaV3hZUkdsdFpXNXphVzl1UFNJME5UVWlMejRLSUR3dmNtUm1PbEpFUmo0S1BDOTRPbmh0Y0cxbGRHRStDancvZUhCaFkydGxkQ0JsYm1ROUluSWlQejRlUXJEZUFBQUJYV2xEUTFCSlEwTWdVSEp2Wm1sc1pRQUFLSkYxa0U4b2czRVl4ejlqaUUxUmxPU3dsREtOWmx0eTNTZ1VXclBsejBHOWV6ZWpabjY5bStRbUYrVXNSeWZKeVhVbEJ6ZFhwU2luWGVTZ1hOUXVyTmZ6YnRoR25ucDZQbjE3bnQvdjJ4Y2FuSnBTYVR1d21ja1prYW1RYTJsNXhkWHlqSjFtSEF6UnF1bFpGUXlIWjJXRjcxbGZ4WHRzMXJ3YnR0N3lIcnlzM2x6R0NxWDJUaTcyVDZiLzd0ZFZXeUtaMVdWK1NBZDBaZVRBNWhVTzcrU1V4WHZDWFlhWUVqNnlPRlhoYzR2akZiNHE3MFFqRThLM3doMzZ1cFlRTGdoNzRqVjZxb1kzMDl2Nmx3Zkx2VE9aaVMzSTdKSHVZNTRvUGdKTU1VZUlVY1labEN6Yy85d0V5amNUYktIWXhXQ0RGT3ZrY0JFVVJaRW1LVHhEQnAwUlBNSSt2TkorSyt2ZkdWYTF3MWVZSEpPdnVxdmFqUGcvM29EZXA2cldmd29EY2NqN2xXWm9QOG5haXZic210OVhZVWNlbW81TjgyMFJXdHhRZWpETjk3eHBsczZnOFJHdWk1K3hoR01xSEp3V09RQUFRQUJKUkVGVWVBSHRYUWQ4VkZYMlBwT1pkQ0QwRXFvMFVSQlVWQkRiV2xBRUZVVHN2WXV1OWU4cTdxb29LRml3Z0s1ZGQ5SFZGYnRyUlJHN0NNZ0t3bHBvMG9QMGhQUk1adjdudTIvT3pNdGtKcGxKM3FTUWMzOTVjM3Q1MzdrNTN6djMzZmVlcTIzckFYNVNwd2dvQW9xQUlxQUlLQUpCQkpLQ0lRMG9Bb3FBSXFBSUtBS0tnRUZBeVZFbmdpS2dDQ2dDaW9BaUVJYUFrbU1ZSUJwVkJCUUJSVUFSVUFTVUhIVU9LQUtLZ0NLZ0NDZ0NZUWdvT1lZQm9sRkZRQkZRQkJRQlJVREpVZWVBSXFBSUtBS0tnQ0lRaG9DU1l4Z2dHbFVFRkFGRlFCRlFCSlFjZFE0b0FvcUFJcUFJS0FKaENDZzVoZ0dpVVVWQUVWQUVGQUZGUU1sUjU0QWlvQWdvQW9xQUloQ0dnSkpqR0NBYVZRUVVBVVZBRVZBRWxCeDFEaWdDaW9BaW9BZ29BbUVJS0RtR0FhSlJSVUFSVUFRVUFVVkF5VkhuZ0NLZ0NDZ0Npb0FpRUlhQWttTVlJQnBWQkJRQlJVQVJVQVNVSEhVT0tBS0tnQ0tnQ0NnQ1lRZ29PWVlCb2xGRlFCRlFCQlFCUlVESlVlZUFJcUFJS0FLS2dDSVFob0NTWXhnZ0dsVUVGQUZGUUJGUUJKUWNkUTRvQW9xQUlxQUlLQUpoQ0NnNWhnR2lVVVZBRVZBRUZBRkZRTWxSNTRBaW9BZ29Bb3BBbzBEZ3NiL2ZRNDg5ZmsvVXNTTC8zaW0zUnMyUEowUEpNUjYwdEt3aW9BZ29Bb3BBdlNHUWw3dWJ6anA3ZEVTQ0JER2VkZFpveDhibXpraHZmNWRqcldsRGlvQWlvQWdvQW9wQWdoQ1krOW0zMUsxN1owT1EzYnAxcG84K25HdDZFbUo4OWRWMzZlYi9tK3hJN3g1SFd0RkdGQUZGUUJGUUJCU0JPa0RnMm10dU43M0FnaFFIaXhIRUtIbVNYaHRmeWJFMjZHbGRSVUFSVUFRVWdUcEhRRWhRQ05KcFlzUUpLVG5XdVZpMVEwVkFFVkFFRklIYUlpQUVpWGJzNGRxMksvVmRiVnNQOEV0RWZVVkFFVkFFRkFGRlFCRWcwdDJxT2dzVUFVVkFFVkFFRklFd0JKUWN3d0RScUNLZ0NDZ0Npb0Fpb09Tb2MwQVJVQVFVQVVWQUVRaERRTWt4REJDTktnS0tnQ0tnQ0NnQ1NvNDZCeFFCUlVBUlVBUVVnVEFFbEJ6REFOR29JcUFJS0FLS2dDS2d6em5xSEZBRUZJRW1na0JqZVdyTjFVVGswYkJQVThteFljdEhSNmNJS0FLMVJzQlBHU2srNnRleGxOS1NmYlZ1TFpFTmxIaVQ2TmVjRkNvb3hhS2VrbVFpc2E2dWJTWEg2aERTZkVWQUVXaWtDRmlXNHVoQnUybkNpZHNva3dteU1iaENKc1lIWnJlaHQzNXNFUml1a21SOXlFM3ZPZFlINnRxbklxQUkxQWtDZzdxVTBOMm5iR2sweEFoUVlPVk9QR2tySGRpdHVFNHcwazRpSTZEa0dCa1hUVlVFRklGR2pZQmxOWjR5S0krU0dxSGg1ZUl4ajk1L2QwQUNqZVZlYWFPZU1KVUdyK1JZQ1JKTlVBUVVnY2FOUUloTTJqVXJiN1NuMHJhWjF6YjIwRG5aRWpXWVFBU1VIQk1JcmphdENDZ0M5WWVBbi9rRUZsaGpkUmc2emtGZC9TRGdhZDI2VC8zMHJMMHFBb3FBSXVBNEF2NEFvWUJWL0pTY25NZCtnZU85MUVXRHlja1oxTHAxTCs0S05Pa0tFSDBqWnZ1NkFNM0JQblMzcW9OZ2FsT0tnQ0xRZUJCWXViVVo3U3hNNFFIWEYrSDRLU3U5alBxMmwzdUxqUWU3cGpCU0pjZW1JR1U5UjBWQUVhaUV3TFB6ZXRKM3Y3ZXJtRjRYNjdDMnRkSWhQYmJSdE5GTEtvNUJZdzBDQVNYSEJpRUdIWVFpb0FqVUd3Sk1pQ0hiTVJSS3pIaXNHNkhtVnFJaHlVVDNsNWl6YUFxdGVvcExGamVGODlSelZBUVVnVDBHQWR4L2N6T2hwVkpTVWdZZkxmaG9YcU96Y3hsTFVRaks4cXN5SHQxdU45L0hUQ2FQeDhWOUpwa0RIZnQ4UG5ONHZYNHFLeXVqOHZMS3UyUXRneEY5K0MweWxtNXJOSEt0bEdnRTFISk1OTUxhdmlLZ0NEaU1BRGJkZUpsaXZPUXI1ODAyNVZ1WkxOUEk3VzVISG5mcm1Qc0tFYU5zZHBHcWxWa3JOVFdaVXROU2dtUW9KY1ZQWXRMRTRVa21Ta3RQTVVSWlVseEtKU1ZsVW9USEtGdFBYY0ZkcUhhYk5WaFFBdzBDQVNYSEJpRUdIY1NlaHdBVVlXVWx1K2VkWjhNNEk3Ky9tTHplOVV5V084anQ2Y3dQL3FmRlBERExVclRMS2hTR3BaaVJrY3FXWW55cTBzMVdaVWFHaDFKU3ZGUllXRkxKa2dSUjJtNDl4anhXTFZoM0NNUW44Ym9ibC9ha0NEUnlCRUlLdHBHZlNLTWF2czlmUUw2eTVVeG1YY21kMUxLYXNVTkdkamxWdENCVFVwSXBNek85bWphcXprNU85bEJXbG9meUM0cW9yTFRNOXBnSjkxelYrbTNWemRaYkxpejI4ckt0VFBhNzJUb3VZT3U5bEJIa0pXWlhNcms4emNqdDRpVnVUeHMrdDhaUExZMy9ET3B0bW1qSGlvQWkwREFSd0gyL2RVVEpzb3daZlpRaHE5Rk9qQzYyK0dwUGpQWmVtMlZtOE5PV2hWUnFDRklJdWZyeDJkdW83M0JCL2xvcUtselBTOHY4L0dnS1c5TnVGMStBSkpHZjc3ZnlYVmNxOSthUjE3K0xYQ1hyS0RtMU15OHhaOWYza0d2VnY1SmpyZURUeW9xQUl0QlFFU2dyMjhDV1RieGY0bUNGejB1cHRiVVlJMkdTeVFSWlhwN1B5NytWTit0RUt0OVEwcEpjWGpweWNESjF5T3BKYXplMXBJMWJkOVBHTGJ0b055OFhGeFdWa0o5UEo0V1pKRGt0eVZpUlByK1B2S1U1Zko2N0tEVzFKN21TWWwvaWJpam5qSEVvT1RZa2FlaFlGQUZGb0FJQzZlbldzbVpSVVZHRjlOZ2lmRi9QRjl1WExld3JuTGpIR0l0cjE3NjlLYloxeTVaWWlwc3lhSHYzN3NKR2M3L1I3eStqWGoyOE5QNk1nNG5Ldk5TamEwc3EzbDFFT1Q5dnBFMjhaTHpzOXgzMEE0ZVhyOXBDbTNmazhsSnJHV1UxVCtlTEFLTENvdDFzS2Y5Q3padnYweWdKVXNreDVtbXRCUldCcG9mQTZXZU1NeS80ZlAzMU4rdmw1UGZmZjMvVDc3eDU4MnJVUDNhMHh1T3dLeldXelRmNzdqZUFqaDk1b21uNmt3OC9vcCtYTG91cEc3U05KZHVTa3RLWXlrdWhpVlB1NXVWTTZ4NXBQUGNxSjA2NFE1cW9rVjlTdEpuYXQrNUUzWmdVbjM1NUhoMlMyNTRHZEdwbDdxTjI3dEdXaHZWdlQxZU9IVVRGaGVYMDlaSWNtajEvTmVWc3phVnZGdjVHZS9mcVFEMjdkS0I1UDY2aHRNeCtOZXEvUGlzcE9kWW4rdHEzSWhCQTRNSUx6NmVoUTRkV3dPT0Q5eitnOXovNDBLVDE2ZHVYYnJyeGVucjRrZW0wWXZueUN1VVNGYkdQQ1JiY2l5LytLMUZkUlczM3BKTkdzcFhscDVxU1k5U0dvMlNrcHNWbU5mWWZNQ0RZUXE4K3ZXTW1SMVJDSC9HU1k3Q3pPZzNzWkV2UTJraVU1Q3FqRVVONjBhZi9YVWtET3pTbjBtUitiTVhOajlLVXV1bC92NjZuamR0M1U3ZnN0blRkdUFNcFowY1JEVHRnTCtxVjNab2Vtam1YU3IzNTVPWmwxdVNVVG82UC91ampqcVkvSFhjTWZURm5MbjArNTNOSDIxZHlkQlJPYlV3UnFCa0NJRVpZWitzM2JBZzJzR1A3OW1DNHJnTW5qUnBKZ3dZTm9pVkxmakpkdzRMYnNYMUhrS3pyWWp5NElHamQybnB1RWVGRVh4UjRQRzZ6d1NUU3VXRUo5WUNEQmxPTHJDeVQzVGF3cElwSWw2N2RhTnpaWjVuMHZOeGMrdkdIUlZUVlVpczJzYUF2cnpjK3F4WWQzSFhibmFhZlNEOTMzemM1VW5JTjAzeTg4elNQclZ3M2xmdVQ2ZDVuZjZLTGp1L0tqNldVMFplL2JPUm5PbFBwODk5eUtPZVBZaW9vOXRHQi9Uc1RaMUZaWVRGMWFKZE9mMmFzeHQvNUhxMWF1NVdYVlpQSlc1YkRHM1RhT2I2TEZjUUlCMS9Kc1lhaTFtcUtRRU5IQU1TWWFBS0lGWVBGUC8xRU9QWWZPTkJVZWYzMU55ZzlvM2FQTmNUYXQ1UWJkdWdRMmhpNFdFQTQwZGpnelRmUjNBRUhENlo5YmRhaXZSd3N3UzdkdWdhUzJPZlZ6MDgrK01oZXBGSVlmZFdFSENzMWxLQUVOeFh6NHhrcFRHWStHamE0SjgxODdVZGFzejZIL25ycG44aGZ0Sk9LbWRmZitYWUZuWC9pQURya29KNTh6ajYrdjh1N2IwSDRmTC94MTk4MjA4SmYxbFB6RnFuRzh2ZGprMDdaRHJZZXJmdTBUZzBiRnFOWWprNjFLZTJvNVNoSXFLOElORUFFdW5UdFFtMWJ0NkVDMjRhVS9kbWkyN1pqTzIxWUg3SXluUm82Mmg3Q1JKVEp5Nml2dlJHNnp3aGlQR1BjYVdZYzgrZk5wOFZMbkg5Wk5zNDFJODBpNEQ1Nzl6WEx6TEtVZThFRjU5SDZkUnRvUTRBc0M0dUxIRDkvanlmNjUyMnpXbGdXWXl3NHgxSzJxcjVpNlNQUlpaS1QrUzArdmpScTBjeERnL3RsMGJLK3ZOTzI3ZDVFelpwVGozWStLaTF6MGZTYmg5TXZxM2JUVS85Y1NDN2VuTk1pZ3lpclZRWWRjMmhQV3JOcEp6L2JXVUJwYVI1ZW1zVzlVbjdrdzUvUHZyUGtDR3ZSYVl0UnNGVnlGQ1RVVndRYUlBS25uejZPdW5icFF1Ky9iOTE3UkJqMzRXQmxQdkx3bzQ2T0dPUjA1VlZYMFBJVksvZ1JpTXJPejFzNk16SXlUSmw3cDB4MWpKemF0R2xENDduZnpueHVkb2R4TEY1c3ZmdDVLQk8yMlJ4a0t3Q3I4c21ubnFIdERpMC80MTJwZGVYcXNxK2FuSlBQVjhpV1hobTFhOXVDdW5iSW9Idi9NcHkyNVBuSlRYbHNOYnI0ZnFPZkZxL05veG12cktRRjMzeExsOXg2RzVVem9lNlZ0Wnp2cVNiVEg5c0xLRGVYbitzczhUQkJzZ1hLZy9BMHNsY0NLVGtHWnc3VUFVUllYMDc3YjhyNDQwWFYySGdTN3A1NjhtbXpFZWYwMDA4eithZWRkaXB0MnJpUmtPNnM4N01TU3pkOTJFa1h5Nm9ZRjZ4VVNYL2lpY2NwUFozTkJJY2N5RzNhUTQrWTgrelN0YXU1ci9saFlDT1NkQ0Y5aitJZG9xTk9HbVV3ZUlndkRtcjJpSWUwR3NJYjV4amFCU3Jwb2cvODlNVm5jeWtsTllYMkgzd2c5ZTdiaDh2Q0V2SVpINjBoalBtTE5uQS9jdXlaWjlDdi8vdVpmbDRXZVJkclF5ZkgwakplT3VWN2lWbk5NeW1kOXlnVjVoZFFhMzZPTVRlL21JcjhMc3BNYzFITHpCUTZjMFF2YXBkWnlOWmxPaDNZeFU4WnZrN2tMeTZtdEl3VU92bjRBNmhydXl4NmU4NVMzcFJUeGk5c2QvN2lRemZreUZ4T3FDLy9DQW50cElyR3RmOHF3S21EclByRkg4b3lwSnhEcHd2bGp4MnEyS2tLeXlwbjB5WVRyeDBwaE5vUGhTekZIb3Bib1VpRWpYRkdTZyt2RzArOG1CWHFsS24zRTNiSVlqTlEyemF0SysyT2xkMnozMy8vUGMyYytWSTh6VmRiRnM4NWh2Q1h1V0M5L3hSNXNzRm0yOWF0MUdmdnZYbXBFTVFJSEVJRWlhOXQ0UG9taFI4SDZkcTlLM1hyMGQzVWs3cklieXpPN2NZakxWN3lsc3NqSnk2K25lam5oL3B4Rm53aHg0K2taTGQxMFY3WnpXbkVFY2Z5bTNNMm0zdU54ZDRrM3NqanBlR0g5YUFSUis1RFdjMVM2S2ZsVytqWE5YL3cvY1owS3VQN2tVNjZSRzdJY1o3S25UeHpiVXNSVUFTTWRRU0NuRDkvUG9tMWhLVklXRkNKZGlDQUVHbFl2Vlcwc3B3ZEFVaHY4ZUlsNW42anZBQUFQU0E4Wk1nUXMzdldPV0lFQ1lZSUM0UUhaeEUvMHVYY2hTeE50c2tQNFdJUnBGWFd1c0N4ck1wUTJVREk4c3d2djdjbjBKY3RzVUVGaTRySytRSCtZbHIrK3paYXYzVUhOYy9pbHhjVWxQSnIrWGpzZkVGUXprUlp6aFprUGx1WEJVWDhqbFUzRHgrZkVjTmFKRy9rTVVTYVZrNUxmOTVDYXpiK3dZVHA0dzArc1QwbUV3OFEySkFESjM0OGRhc3Iyd2lYVmExSlc5Mkp4WlpmazdacVVpZmFhR3JTVmszcWFQK1JFYWdKbGpXcEU3bDNTekZYVkx6UlNzSlN0RWpCNnI4MWsrUElFMGNRbm9Xc3VhdDhMdUVXNGJ6djU0YzFqenBPdWNyOW8rV1NrbUp6SHhIbjNMdFBIOVBaU3I3L2lPWFhnZ0pzNm5ER1ZUeFhWOEFhdEFqT3VnQUluV3U3OWgzWThrbmh4emtPNE02eEJKc1VLSSt4V0RLMHJFbGlVdkhTK3JWcmFOV0tsUVJMTTBUQUlUTDIrV0JDaGRwSEt3M0puWGZSbVpTWHU1VXZ5SmJSMUdlK28vdHZPSnl5Mm1UeU9UTXArcnhVVXNyM24va2VZeExIWGJ5UkNYaDUrWnhTUENtY3h3LzlwN1htUjM5Y05PbUpUeWh2ZHk0MXkyak9WcWp6NTl0a051UllFekpjV1lUL0E0WG5oMDhwS1M5K3RIeWsyOXVTSlJSN0dzcUV0eE9lanpKMkorWEZ0K2NoYkUrM3Q2WDlZMGtxM0VxcGlCZndzMk9HZUxnVGZNV1BsbzkwZTF2MWkzOEI3K3pyM0lrZmtnNHUxMW4zd09SL0FyN2RkY25Pam5LL1RjNWJmSHN0aE8zcDRlZHZ2KzltMWR1K2ZSc0g3T1dzY1BoNHJOTDRsZmJGRCtWWUlYdTZ2ZDBRL3RoMHRKN3ZjV0tINmlHSEhHSytvWWlYQUNDdGE1ZXU0UTJHeGRFK25MMGZLeVg4TnpUWHJMN0x5cnhoYjhleGxvOVI3cWhqanFaczNyQ0VKVlk0Nng2amhLMCtVUTRFdVhYelpucnZyWGRzWldWZW94OXJYTENzS3VKcXRkVlFmcE5jR1RUbGdSdDR1VFNmbGl4ZVNkdGRPWlR0M1VCdVB5K2Jwbm9DOXc5NXZ2REx4MTArL2dDMHA1eVMrYkdOWGR2VzAydnZ6K1g4dGpUelRYNE9jbHN1cGJnOWJIR1c4TXZJb3o4cTAxRE8yejZPQm1VNXltUVZoV0FORkxNeGZDSlprekUwdWV6NThnOG52cHl1dll6VVI1NlV3eEtLVmRicVgvS1FhSytMZEtrdmRlMzVraVkreXNQWnkwaDlwRXM1N2I4cDQvL2hoeC9UL2dmdVQ0TU9HRVNkbWZpd0sxUTJiVmdXaVRWUFNrcEthTzI2ZFpnNDlNRUg4aXlkZlc2RjVwTXBGUHl4bDRrMi95d3lxRzcrVjE0U3RMZGRtLzZ0NWRNT0hUdFNSNzVRd0xsK3hLOW13M2lPT2ZZWXM3UUtUTkxTMG5pekNONjFLbjJGOTIrUEJ3R29GRUM3NGpEMzhFSndLOG5hWElQL1dhU2puSlNGeFlqTlU2dFhycUQzMy80UDU3dG8xSmlUcVZlZnZ0eFU2T0pDZEJuYXQ3N2RLSGxXVzJWbHVKY1g2aC9sR3BMNzRQMkZkTTdsWTZoRjg1WTA4S0Q5cUt4a2I5cTliaWtsNTYyZ0ZQNklNOXYzWnZSSnFlbVV4STl4Yk5sWlFvOVArNXBhdEZ4Tkt6ZDVxWG42T243WGFpbkxESVNZWkpaVWZYN2V4Q1VpYytoa205Q0dIR3RTV3hQTFBzR0JxSDBpV1Foandsb0tOWlNQeVcybFlWSWpMSG1ocTBDckxhc05oS1dPK0toanRTMTlTaHNpVWF1dTlxLzRPelgvUHY5OExzMmRPNWZ3bkNFZXA0QUNGaElDSVVnNGhaZjJ2cGo3QlMzaEIvU2RuMytXNGdZeEZ4WVdHcVZ1emZqUS9NZU9WbEg4enZkUDFKZVhVZkZWakI5L1hFeHZ2dmtXN2VEbk9hRlJ2NSsvZ01ieGM1WURCKzdIYjZUcFNsaG1qZDYvOVgrTC8rZXFIR1JubFVGQkYxczNaYnhrNk9QSEZLeGxRai9mVTRORHVkeThYWlR0NzJMa2d2TmZ2T2hIenJGMEI4STllL2NKdE1WbGMzZVpzU0hmMGlWV0c5WjRYZHhIT1JPeEVMRHBJdWFmdTZaT0N1SWZjNlVhRk1UTDBXKzg0aTQ2NmRURDZOQWpocGlkdXQ3bWc2a2dvdzhsODA3V1pQNEExL3JaWDlDR2orZndHM0NhMFNyK2hzWFh5N2JRZm9QVGFYRGZYUHJIRzhYbXZxU0w1NHUzTkkwOEdid3F3dmNrblhhSjNKQlQ3NWFqVEJpQUp1UWtrejZVWjAzQ0VMQ2hXUytUMjFKU1ZnbjdQd1hhQ0tRR3EwdWRZSUlKaUFLd2lCRkpLR2Y5QTBrYlVpTVVsN2EwZjhIR3drMWlpci9NRmZFRm4xRGN3c3FhZjEyNmREWUtHR2t5LzBHVTluaDJkcWZnUS9oT3pyOE42OWV6UlZaTUR6eHduK2tQUDNLaGFPOC9QeitmSCsxWWI4bzQyVCtmTWIrRko4TThwZ0x5aDVQL1A5eHZmUHJwWjJnUVAxclNobDhwdDhMcTJQeVBvbDc0LzE4ZzI3UVI3Y2VhbXlBcDNHZTA1RkpTWEVMdWpMUkFGY2pJMGdjL0xseGt2bHVZbGRYU3lLV0VjYktjbjRyNTN1aW1BQjY1ZWJuMDFkelBPY3VTcjlVSDJnZ1VaNitZKzdEeVdhOEZ5b1Z5N1NGYkpYdHlIWVZYcmN5bGo5NmRTMmVlZFJRbDhRa1VGSmRSU1hrbTMxTnR3WDRTZFJ6Vm0zejhTYXB0QytkVEN6NG03OStMZXQ1eEs2MWNzNW5HcGl5aDViK3VvclVyZDFIL2dUdG8vc0pXQ1JsMUl0K1E0K3JXZGE4NmxvQjBCMlVRY3FJSXJNa2sveFNoL0VnaG1kRGkyOHRFU3JQbkl5ei8rRkpXL1BCeTBlSlNYbng3dVVocDlueUV0WCt4MEMzRkZBdG1kZ3lsdlBpUjh1eHA0V0hGdnpMK3NBenh5SWhnWThjTWFYQWdSbXlXRWR6RnIxaldrcWs5TFR3c2ZVaDk4Y1BMUll0TGVmRkQ1U3dkQTBKNmVPeHVPcnhYWVNqTEZwcnczaUQ2N3ZkMm5HS1JJNGdRcmxtemRMNW5sbXlJaTI5Mm1EVDdEd2pOU2tjZStnS084bWdIaUZvZUFoQmRoOXBXV1M4Lzd3ZXJUTndoM2JiU2c2TmhoVloyODllMm9WditNNWd6VUZkdXUxUWVUK1dhenFYMDJLczkvZU9sNi9nckhDbldoNDE1SFBuNVhyNFg2YVZWNjByNS9tTXl0V3ZmZ25MNVpRM2JQLytjeXRiOFFnUEduMGU5aHA5R3UzTFgwbmRmM0VJelpoVFRtblhPUFJmcjNObFYzVkk5V0k0aDRRb1J5aER0Y1V4cytlZVIvSEJmcnNiRXQrZEhTclBuSXl6OVNWbnh3OHRGaTB0NThlM2xJcVhaOHhIVy9pM2xJVmlKSDQ1VHRMaVVGOTllTGxLYVBSOWh4Yjh5L2lBOUxGbkc0Z1JqOGUxMUlxWFo4eEZPUFA1TUtPWkR1eUV5c28vQjZoOFl5Qklud2k0bS9oSitTYllIZEJRY28rZ2ljNEZnRmVNODFJT1Q1VlBPTU9yTnNnZ3RBclZLeUc5UkVlN1hvUkNYWVpEUVZIUm5sUXMwR3IxWUFuUFcvTDZGTHJuZ01YNEc5V3phcDM5WGpKcmZsNXBHTFZ2NGFHY0IwVmR2ZjAzSEh1eWk1ZVg3VU9id0U2bWoveGlpYnIxcDhmTHZhT1BTdStqeEo5SWJKVEVDMGpvaXg4QnNDZ29SRThPS3lLUUxadGtDOHM5alM5S2dJcUFJS0FJeElaQ2N6Qll3cllsZTF1Z2crOFU2MHhCSHk4djUyYjM4UXNyTXhIdGVyWHdoUXRGYjRib3BTSFBjSmo4SmFQbzB0eXlEZW83NE1aUWl2dGRvZllsRGlEblVlNlJob3JLVUNEUVVqRWNxbjVpMDMxZi9RV2VmK1NoZGUvMUl1dkNTUDNFbmVOWXhpZnIzYVU0OXJ4OUYzcTByYWVOcm0rbmxKMStpZGgzS2VRTlBIMnJiWWhIOWExYmJ4QXlvamxxdEkzSzB6a1ltRkNZZ25MVWNJa0szMG1MOVJWdm1LczVVc0U4aWFjR2Vab1d0T3NpWENZZXd2UnppNHV6cDlyQ1ZyLzByL2pyLzVQK284djlIeGY4cks3L3Uvdi80M1orZXpyd01XTTNMd25uNEZ1bFp5NnFpbHpETzBsTCsvaEk3RUdURnMwTU05VUx6MytSYnlad0RUSEFFRXpnTVl1VDNqSm8yVFdtVFpneURzSEltbzlJUDZzaFNiYVhNT2t0NGJQcUg5TkxNTDJuVXFFTm82R0Y5cVUrZkx0UytReGFsWnU5Tlk4WjJvRFVyaHRDWHM3K21uSTkrNTdOcTNNUUlVQk5NampJUjVONkc5YytFaVJXckMwMUNxNDdVTk1US0lqRFQwQ1JLRHJjY25KdFdXcENFcmU3TnhFYi9sdFdLQUplelZiZnk4Q3YvQkpZZmFwY3p1QzF6SG1GOW1VcGhhZHEvRGFzQXBzQnB6OFkvTktGVS9uVW5menlmNS9aazg2TURhWWI0UWxJdy81a1ZmMHdtZnZER0dwQWRza0ZDU0hPWmgvbTk1Zm1VeVJ0MHNJUFdGQkRkeFlXdC8zK2pDTGlHVlFkMTVhTEp6enRmc1prS1M2bXlxUXJ0V3ZwUHlxUFBhRTRVU2YwVG80eHcxNjRDZXZubHo4MGhhUlg4NUxyOXJGbUZ2aDJPSkpnY3pXd3prOEdhTUtIbFZKeUh6TE9LNTFTeGpGVU9FNm1pa3hUeEsrU0dKUWI3NFhSN2xqVkp1YVk5TWRDUVZjZktzTmNQOWlOMXhBOW1WRzdQWHQ5ZVhQc1BvR0VIWlkvQjM1cjdPQjJWdndpMTRyK2FrL1BmeFdUb2RyZGhheEc3U1EzcWdVNmplMWorTkdQZ2krUFEvVUdrY1IzRFN6N3lsYnY0RFM4RmxKcmlNWTh6ZUpna1RiNjUzMmp1U2dZNnNJaE0raTVuc2kwdEtlVm5OUzBMVlBSZmFEUWdTYmxuR1VxdEVBb09CS255VHhLYVZ4WEthc1J4QkJKTWpwWkFnMWZPRVlhUHlZa0Q3K3NMelVvVWxNbGdWWkw1S2psbUtrcVJ3SHlSYVNObEpkdHF3ZFlrRjZ4VU5sREpuaTcxa0JiZXBrbVREZ0tWN0hXbGpyUmhmRnY1U21XMWZ5TVVPeTZDbldBcFB0Sk4ySWFucE1FUFFCazJnd0laZ1lMMmZvSnRjY0NlanFKd0p0L21COU8wZjBBUkJNMk9uV0JtRlFqODJ2Q3FWRFlnTkh1NjFKVzJ4RWVIU2RnUjZ1ZFBJZkdHbTZTa1RJNW5HdlhoTGVkSExLQlRJSDM0NWpWdDBsSkZ2OXhYeHZjQStXVUNwcTJBeFJkeEFQelNiWDZuYUVHaGl3azR5YnhGQjg5Q1FxKzU4TUo0YnRabit1SlhxL0VyMHNwNFJ5cnVXOEpKY3liQ1ZtbFNFcjkvbEY5QWFwRWxjZ1VVcTBTRlgxTTVBSXpKcU5oYWhiSWFjUndCVDFycS9nNDFHaEl5enhNemNlQmJ3ZytmQkZaWnZGOHdoZDlGZTlXVlo5RkZsNXhLTFZwa09qUVdiVVlSVUFTYUdnTEJDKzNBY2lhV01ndG1uMFBlZGJNalF2SDQ0MytqMUwxR21qY1I0VVVMT0dSSk5HS0ZXaWJtNVJYUXpIKzhRODgrTzRzdFNpako2aDZLRnpLRXZyVHJVQWxMZmkwSHB0VWpJbEJMeTlFaU9VdHdJakFRbzl4anhNVmJLTjBhQVN4RmhLelBuOHliUDB0Sk1hSm9ORkVSVUFRU2lVQjV6dGY4bmNIZFJsOUJaNEVjRStud0lyWExUbkRSMlllUHBpbjNQczF2a0NIcTFUYWVGNm5ieWRBZVR1U29tMjdidFNSSEFHY25Qd21EL1VDQzlyZ0ZzbG5qNTZDUGx6U3V2UEljSlVZTEZ2MVZCQlNCT2tiQSsvT3paRDFZVWNjZGMzZTNIUnREbjFpcVpWV0s1VnRMejlyOUdPcHJrVm9oVUl0TEpSQ2drWnJORjZ0UXhtUk1SRnMrQkczVjhmbkxlU2wxckJSVVh4RlFCQlFCUmNDT1FFQzlXZ1lGZEt2b1UvZ1N0bGZRc0pNSWVEcnlaMWhxNmlBczY2SW1zSXpLRFZraUN3Z09WejZjWmkyekJuYUdHWXZTejJ2dStXbzExaFI0cmFjSUtBSjdQQUlwcVduVW9YTTJiL3JoVFR4OHRtWkhMWlorQSthazBiOEJZMk9QQjZNZVR0RHo1ZHdaY1hjTG9kZ0ZBL0xEelcvNWVnQytJSUJENG5qYnZZU1JqcnJyQXkvcWpidHpyYUFJS0FLS1FEVUlRQ2VadzlQNDN1a3BwemI0a0lIMDhkK21tV2Nzb1RQeHFTNzQwS1hoK2xmcXFPOGNBclZZVmhXTGtMOEF6YTlFRW9JRStlR0JXUkdna0NUeXhhRjg2S0ZZU1ZWZkVWQUVGQUZuRVhCM1BzclpCdXV3dGFTT1J4Z2pRM1NxR0NBeUJPaFVrS1M2eENCUVkzSVVvWUFFY2NDSkQvSkRQb1FLaHpBRWl3TmhPVXltL2lnQ2lvQWk0Q0FDeG1JTVdJNHBmYzRpZDVkWWRyODRPQUFIbW5JeE1TYjFQdHZvVk9oVk9TY3hLcUJENFVUbk90Q2xOaEdHUUkxMnEwSlFzQTVGVUlqRGlaVUlId1FwUWhXeXRKY1Q0WWFOUjZPS2dDS2dDTlFZQWVnWTBTMElKM2xTS09QNGw2bDAxZHRVbnZNZCtjb2lmNkdqeGgzV291S3VYYnNvUGQzNmVEVEdhc2FibkVHdTlvZFFhcDl4dkRTSEZ3YUV6Z2RkbWRmWUJYem9YMU1uWUp6VVlpaGFOUUlDY1pNakpoN0lUNFFwYllvUUpSM0VpTEk0RUVZZENCTUg0a0tzVWw5OVJVQVJVQVNjUUVCMGtQaEo3bVJLNlQyT2ZEM0hCblVTK2hFU2RhTFBtclNSczJRSmRlN2MyWHc3RWpyUjQvR1lOKzJrcE9ETlA1WnF4amtnRHo0YzlLam9WRGsveENXL0p1UFFPcEVSaUpzY1JWaG9EbUVSbGdoTVNGQUlVU3hJRVNCOE9TSVBTVk1WQVVWQUVZZ2ZBZWdqNkJZNHU1NlN1T1JMR1ZNd3hwL3BNNTZnd3NJaXV2NjZxeWtqbytMTHRaR08vTXpNRExydTJ2RXh0bWhaZ2JBRVFZcmk4SkZscEdHTTRrT25ZdXlJNDVDNC9Yd1FWdWNzQW5IZmN4UXlGTUVnSGk1RUVDT0VLd0pER0ljSTFkbFQwTllVQVVWQUVRZ2hBTDBqQjNTUkhFSXVJQ01KeCtvWEZ4ZlQ4dVhMNmY0SEhxTGk0cEpnZllTUmhqeDhLRHJXOWxCT3hnaTlpREhhU1JKbmd6U1VBV0ZLSEN0dW9sdEZwNktjT3VjUmlCdFZDQXNPQW9XRFlDQWtDY3R5S2RKd1lCSklXUkVzNGxMSFZOUWZSVUFSVUFRY1FFRDBreEFQZk9pb2VFZ3JVdG1iYnJ5T3VuZnZ6bytnYlFnU3BCQWowcENITXBIcVJrdkR1RUI4SUVVaE9MT2tHaUJFcVFkWUVJYmVsUE1UblNyMUhJQk9td2hEd01Va1ZhTzl3Q0ljdEFlQmdmZ2dRQ3lqd3NrbUhDRkNlM3BwYVNsdDNMaVJEam5rRUZOV2Z4UUJSVUFSY0JJQlVXdlIvSnIwaFE4V1Q3N25QbHEzYmoyVFlWZlR4TnExNjZsYnQ2NTB4KzBUekxKcVBPM09ueitmZXZUb1lmU25FQ0hJRWpvVFB2UXEwdUVReDdtQURIR0kva1VaSWN4NCt0YXkxU01RdCtVb1pDZFhMSWpMRVc0WlFtaFNYcTU4RUVlNjFLOStpRnBDRVZBRUZJSDRFQkRDZ0MvNlJud2htSGo5NXMyYjBjUTcvOHJFMkkxQWlqZ1FSaHJ5NG0xUGRDQjBJOEx3b1VOaFBTSWNmZzVBUUhRdHlpTmY5R3Q4NkdqcFdCQUkzUW1PcFRTWEVZSElSRU0xaEhGVmd3UENFc0VoRDBzR2VFTU9oRzRuUnFTcFV3UVVBVVVnVVFoQUw4R0o5U2p4MnZSbjZiMlF0WmFVRkxxL0dXKzcwSk9pTjFFWCtsRUlFbkhSby9DaEw2Rkw0WVFRaFZTZE9DL1RzUDVVUUNCdXk5R2FISlpwTDVZaWxreEZRQkNZRUNUeUlWUk1BTGtTUWhqbElYQjFpb0Fpb0Fna0dnSG9KaWNPN0VxZGZNOVVXck5tbmJFWVlUVWlqRFRreGRzSDlDTWNkQ0gwb3h5SUkwOTBwQmdWMHI2VUY1S1VkaEtOWTFOclAyNkdnaURrU2t3RWl5c2FDRW9jaEFjQ0ZFS0VVRkVQUGh6cVMxanFxSzhJS0FLS1FFTkZBUGNiSjAyZUVpUkdMS1hLRWlzSUVua29FNCtERG9TT2hMT3Zyb2x4WWRlVEtBY2RHa24vU2h2eDlLMWxxMGNnYm5LRUlPVEtCc0sxa3lLRWlRTnB5RU5ZQkljNmtxN0VXTDFndElRaW9BZzBIQVNtUGZSb0JXTEVNNDA0N0FRNTdhSHBjUTBZK2xISUR2b1JCNXlRSnZRbDh1RkVkNHIrbGRVNnBLdExEQUp4a3lPR0FhRkNrQkFpRGdnUXZxUkJnQ2dESjhLVlNZQjBPVXdCL1ZFRUZBRkZvSUVqa0pHUlFmdnUyOCtRSVVoUm5CQWs4c0pmRGlCbG92blFtZENGNGtzNUlVWG9VYXpLSVIrSE9OUVJYWXQwSlVoQnhsay83a2M1UUhJaUdDRkZEQWtDRXlLVXNGenQ0TkVOQ1dQNUFIRjhzbXJZc0dIT25rMGphMjNldkhtMFljTkdPdjEwZm8raU9rVkFFV2hTQ0h6NzdiZjhHRWczU2sxTk5UcFZWdG13V3hVNkZIR1FIL1F0d2tLQ0NDTk5kS3FkT0pzVWdBaysyYmgzcTBJb2NCQ2VPQWdKY2VTSnVZKzQvYW9HZWJLdWpyQzBJMjNVMUwvNDRrdHA3dHpQSTFaZnUzWjF4UFR3eE1XTGwxQmVYaDRkZWVRUjRWa0pqVC84OEtPMFlNRkNHak5tZFBBdEdBbnRVQnRYQkJTQkJvTUFubDJFRS8wSm5TbHBTQmY5YVNkRzBadENsRkpmMGhGWDV3d0NjWk9qQ0F6ZEl3eWh5QlVNMGhDSGtMRWNFRzVsUXNoSXcyRVhMdXJWMVBsOGZuUDFkZTY1WjFkb3d1Mk8vZFQrOWErWENRUTVaODdzQ20wa09uTC8vVk5weDQ2ZEZmNGhFdDJudHE4SUtBSU5Bd0V4SkRBYTZFMGhSaGdSOHRpR0VDUHlvVzlGaDBvZHBFSGZxbk1lZ2RnWkpOQTNCQUZCd1FuSklXNi8ra0VaSE1pSDhPQlFCa0szQzlsa09QQ3oxMTQ5NktxcnJuU2dwY2hONEZ6a1BDS1hxSDRIYnFRMmV2YnNTZndYMFVVcUgxNnd1akxWNVllM3AzRkZRQkdvT3dSRWorTC9GQTc2RXVRbmI4T1JkQkNsaEZGR2RLZ1lHTkpPM1kyOGFmUVU5NFljQ0FrQ0VtRUJKckVjUVNCeUpZTjhoRVdBRXBjMFNVODB6Rjk5OVRVZGZmU3hOSHYySjhHdVpzMTZ6YVQ5L3ZzYU92UE1jK2oxMTkrZ0ZTdFdtTFJubjMwdVdPNmYvNXhKcDV3eWhucjA2RVdYWG5vNUxWejRRekR2azA4K05lWG56UG1NUm8wNnhaU0J2MlRKVDhFeWVGbnhsQ24zMGRDaHcweis2YWVmYVN4VUtUQjkrZ3k2NG9xS2IvRi8vdmtYZUpuMU5GUCs3TFBQcGJmZmZrZUtVMDdPWnRQbk8rKzhTK2VkZDRFcGc3YmZldXZ0WUJrRVhuMTFGaDEzM0FrbUgzNTRmb1hDR2xFRUZJRjZRUUE2VUt4SEVCeDBKSHd4S2tSbm9oekM0aU1mWVhIMnNLU3BYM3NFNGlaSHVXcEIxN2pLRVI4Q2c0T2dVQVo1UXBZbWczOGdZRXdHK0U0NjlCbCtTQis0ajlpblQxKzY4Y2IvbzUwN2Q1cDN1dDV5eXdRNitlU1RhYSs5ZXRDMTExN0Q1RFdVT25YcVNMZmYvamY2MDUrT01rTjc2cW1uYWVMRXUrbW9vNDZpeHgrZndlTXVwM0hqenFEZmZsdHU4dlB6ODJuMTZ0L3A3cnNuMDRVWFhrQjMzbms3YmQrK3paQ2hLY0Evanp3eW5iQmtlK3V0dDlETW1mOHdIellkUGZwVVFsMjRyVnUzbXZHWUNQL01tUEVZVFpwMEQ0OW5DRDM1NU4rcGE5ZXVkTU1OTnhISUVLNnNyTlQwZWYzMU45SmhodzJqaHgrZVJoMDdkakxuVmxob1BXT0YrNiszM25vYmpSNTlNczJhOVlxNWo0cHp4NzFOZFlxQUl0QndFSUJGQ0QwcGhJZzQ5QmgwRjNRbm5PZ3h4S1dzNUtFZW5QZ21vaitPSVJEM3NxcjBEQUhaTFVnSURuRUlDZ0lWc2hSQndzZUJDWUE4U1pmMmF1Ti8vZlUzVEhTOUt6Unh3Z2tuMERQUFBHblM3cjkvQ2gxNzdQR0dlSENQYjlDZ2dYVGRkWDgyZVljZmZwZ2huKzNidDNPWlkwd2FpSERxMVB2cCt1dXZvNXR1dXNHa0hYLzhjQ2JLbzluS2ZOMlFxRW5rbndjZmhHVTQxRVN4SEhMSEhSTnB5NVl0MUw1OWUyTWw5dTdkeXhDeHgrUG1GNjBmVEN0WHJncGVWRWdiOE5IblF3ODlRbGRlZVFWTm1IQ0x5Um81OGtSRDZMQXdzV2xISE1ZMGZ2eFZKcnJ2dnZ2UWlCR2o2TXN2djZJVFR4eEJ5NVl0TStubm5uc3V0VzdkaW9ZTUdVSmp4NDZoRGgwNlNIWDFGUUZGb0FFZ0lJWUM5S0VRSS9TbmtKM29TZ3hWOUtyZHR4T3AxR2tBcDdYSERDRnVjcFNyR3ZnaUtFbERISUxHSVdrSVE0aENoZ2pEaWU4RWt2dnMwNjhDWWFITk5tMWFCNXR1MWFvVlBmYllkRHJublBOTTJoZGZ6QTNlOEE0V3NnVldyVnBsWXM4OTl6eHQyclFwbUlObHpjOCttMXVoci83OSt3ZnpCdzRjYU1KLy9HR1I0N2h4WStubW0yK2h3dzgvZ280Ly9uZzY0b2pEbVdDUE5DOFdEbFlLQkZhdVhHbEM0VHRtanpubWFNSVNybGliS0FSeUY5ZXZYejhUbEhFT0h6N2NrT3poaHgvSlM2dkhjdCtIMGZEaHh4RXdVS2NJS0FJTkJ3SG9TRmxodzZpZ0U2RkRSWThpRFdIb1RsbCtSUmlIbEVVYjZoS0RRTnprQ01GQUlDQTlDQllPY1RuQ2hTbHhxUU5mQk96VUtjRktBd2xVNVZxMnpBcG11OTFWcnliak9VeTRndzgrbUdENWlUdi8vSE5wd0lBQkVqVStydTdFd1RxME96eS91UC8rZytqamoyY1Q3bjNPblBraUwvSDJvVGZmZkkyeXNrTGpRUjJ2MTNvUnU3MDlwRXNjL3h6aVBCNXJDemppd05MdWNLR3dhTkVDK3VpajJZVG5xUDd5bDF2NVRSNlp2TVQ2YjlwdnY0cGp0OWZUc0NLZ0NOUXRBbUlaQ2tIS2JsVVFuK2hJK0lpTHJwWC9kK2hmNkZZNDBhbDFPL285djdlUVpvL3hYQ0VJT0FoV2hJZzR3cEtIT0lRb0NoMkNsZTNKS0NjdkJVQzV1bkQ0UXZlZi8zd2RuWFRTS0g0RjFGcHpqMjdXckZmNUhFSmtWbEpTRWh4SzM3NTlUQmlFZS9ubGx3YlRZVG5HNHpaczJNRDNCRHZ5ZmMwL213UDNBL0ZjNXZ6NUM5aVNIRjZocWI1OSs1cjR3b1VMelQxSHlmeisrL25tVVpXV0xWdWFaekVsUFpxUCs1akFIa1NPQTB1OEJ4ODhsSmVPMzFGeWpBYWFwaXNDOVlDQUVCMThrQjE4NkVyb1VlaFhoS0ZENWFVQUlFTWhRdVJMMks1MzYrRTA5dGd1NHlaSENCRENBTW1KZ3hCRmtFakhJWUtHME1YS2hLQlJGMEpHZWFmY3BrMDVadW5SM2g3YWwzdUlEejc0RUdHcDg0MDNYcVBObXpmVHlKRW4wN1BQUGh1OGJ3ZHJDenRXY1dDalMzWjJ0aUdXZSs2NWx6ZlJwQm5yRDd0US8vclgyODA5U055THJNN2hQQys2NkZJQzZVNmI5b0M1NXdkTERrNkkwTjRHL2dHd3NXZmF0SWVOVllubDJtKysrWWJIL0NiZng3emRYclRLTURZU1BmZmNDMllaR1Zicm9rWC9OZVZsK2JYS3lwcXBDQ2dDZFlZQURBWTQ2QXBZamZaVk50R2pZb1NnSFBRbzRuRElGOHRSZkpPaFA0NGhFRGM1UXBCd0VJaFloaklhSVVRSURrNThwQXRKd25mUzRYdHFLMWFzWUF1djhuT09lRVBPZDkvTm8rZWZmNEVlZmZSaHZnL1p4aHhYWDMwVjNYZmZBL3hZeE5IVXI5L2V4cUw4NXB0dnpmMUJiSFRCaHBpNzdycUxDZHpETzBJZjVWMm8yODJRa1hmTk5kZVlNTTRwM05uVEVIN2lpY2NKTzJQUE9PTXNVeFE3WXJFTHRVZVA3aEhidVBQT084emtmL1RSR2FaUGxML2xsci9RWlpkZEVyRjhlUCtJWDNmZHRid0xkaHRicXRlYmJDeXAzbkREOVhUcXFhZEdLcTVwaW9BaVVFOElDTkdKTGtVY1lURWNvRU9nUTBHYzhKRVAvWXQwbEJGZGlyZ1NwUE5DclBHN1ZVVklFQXlFQk9FaERRZmlJbGlFa1laOGtDbDhMS3RpeWZIUVF3OTEvb3hxMFNKMmpQTHBCQ2NubXNMWWQrell3ZFpjUzU2Y05iTjJzYXlMY3c2L3p4aHRxT2h6MTY1ZHRkcEVnM1BKemQzRk8xWmJHMWxFNjB2VEZRRkZvSDRRK082Nzc2aExseTZVbHBabS9rZWhNMEdBSUQ2RWhSUWxMcU5FSERvQ1BoekNLSy9PV1FUaXRoeEZDUEJCZEhBSTR4QWhRYWhZTWtBYXJtamtDa2V1a0ZDdUlWN3BSQ0kvbkFNc3p0cTQ5UFIwODR4anJHMmd6OXJ1THNXNTFIYmNzWTVYeXlrQ2lrRDhDT0QvSEFlTUJwQWlEa2tUL1lpNE9LUkJkOEloWGZTdmxKVnk2anVEUU5YYk5pUDBJY0tDTHlRblFoS3pIM0VSSW55UW94eUkyd1Vib1F0TlVnUVVBVVZnajBmQXJqZkZHc1JKaTY2MDYxSG9URGxRUm9nU3ZyU0RkSFhPSVJBM09hSnJFQndFSW1Rb2dyTGZneFR5UkhuazQ4QUVrS1VBeE5VcEFvcUFJdENVRVlBZUJCbUs3b1J1UlpxZENJVWs3V1ZRUndoVmRXbGlabENOR1FvQ2diQWdUSEVpVUFoVEJJWjhJVVFJRkhseVNEMzFGUUZGUUJGb2FnaEFYMElYUWorSzdvUVBKNFlId3JoTkJTYzZGV0hVZ1Q2MTYxK2txM01PZ1JxUm93Z1Z3aEtoWWtoMjRVRndraWNQMWRzRmJ5L3IzT2xvUzRxQUlxQUlOQzRFUUpDaVV5VU13ME9JRXo3MHFlaE1sSlc0Nk5UR2RjYU5ZN1J4azZOZEdCQVdybHdnU0JFWTRyanFFV3NSY1pURGdUSlNEZ0pYcHdnb0FvcEFVMGRBZENSMEk4TFFqYUl6RWNZaGxpTFN4VWw1RUtVNjV4RUlJUjFqMjBKcUVDSWNoQ1lDRTErV1cxRVdBb1FUSVV2Y0pPcVBJcUFJS0FKTkZBSFJoZkJGcjRvK3RldExlemtoUXRHL1FxSk5GTUtFbm5iYzVBaGhRRmdRSWtoUWhDVUNsbnd4K3hHSElIR0lJQkVXZ1NmMDdMUnhSVUFSVUFRYUtBS2lBMEdFUW5ZWUtuUW5WdC9FMmZPZ2QwWC9vcHlRcXBSVjN6a0U0aVpIQ0VxRUFpR0pnTVhIMEVDQ0VDTEs0aENCUXBBZ1ZNUlZxTTRKVVZ0U0JCU0J4b2VBa0o3b1IraFE2RmJSbmFKZnhjY1pRbTlHMHIrTjcrd2Ivb2pqSmtjSVNxeERDQkVPUW9iUXhFcVVlNURJUTFnYzh0VXBBb3FBSXFBSWhCQVF2U2c2RkRsaVBBZ1JTaHhsY1lnZVJsa2hXWVRWT1lkQTNHd0ZJVUVZRUE3Q09PUktCMkc3MEJER0lVN3FoYWRMdnZxS2dDS2dDRFFsQktBVDhUWXgrS0pIRVJaZENpemtzUTZRSXNnUytRaExPWVRWT1k5QTNLZ0syVUY0Y0NJa0NVTjRjQkFjSEFRdVpjVkhudVNiUXZxakNDZ0Npa0FUUXdDNkZQb1JPaFJoNkU3Umx5QkVwSXQrUlRyeVJmK0tua1crdXNRZ0VEZXlFSTRJUkFoT0JDYkNGSUVLQ1VvY0FvYXpDemt4cDZXdEtnS0tnQ0xRc0JFUWdoTTlLWG9VbzRZaGdYemtTVG1rbzR6b1VkRy9TRmZuUEFKeGt5T0VCcUdBOENBb3hDVk5oQ2h4eVVkNUNCUysxRVY5ZFlxQUlxQUlORlVFb0I5Rkh5S01BM3MweEdvVVhDUVB2dWhiNkZPSm93MTF6aU1RMmk4Y1k5c2lFUGhDY0FnTDhVRjRjSklHSVdKTkhjUXA1SWs4V1dlUHNWc3RwZ2dvQW9yQUhvVUE5Q0Iwb3VoUmhLRXZaVWMvMG9VOG9TL2w4UTR4UGxBV1pkQ09PdWNSaU50OGd5QWdFQndRSWdRRndjR0pJSkdHZlBnb2czUVJKTXJKSkVCWW5TS2dDQ2dDVFJFQk1SYWdLMFUvaW02MWt5YjBLUFN1L1VBNWxMSHIyS2FJWVNMUE9XN0wwUzVRREF4Q2d0QkFnbkFnUWppOFR4VjVpT01Ra29Rd3BRMkUxU2tDaW9BaTBGUVJnTzZFSGl3cEthbXdLMVhJRC9uUW43QWF4UWhCSGh6U1JmOUtIRDdxcUtzOUFuR1Rvd2hHQ0E2a2h6U2ZqMjhlNDJDQkljLzR6SDBzV3ZLVjg0ZVBlYXhsWmFVbW5hY0RsMldyazlQVktRS0tnQ0xRRkJHQS9pdjNsckp1dEZiYWVFMHVvQ3Y1Zm1LU2g3eGxKUVlXczlUcXQzYXFHdjNMT3JhMHBOUVFwdGNYZXVFS1NGSElWQW15OWpQS3hTUVcxOTFjRkJlTEQrSFNMWXVwNE52YnlMdDVQbSt4VXJLcnZVaTBCVVZBRVZBRVlrUEFsZHlNVXZZYVNjME92NS9jR2UyQ1M2K29yUVFaRzRiUlNzVkZqaUJEV0lVQ2VzbjI1WlQzNWxIa0w5MGRyWDFOVndRVUFVVkFFVWd3QXA0MisxR3JNNzRrbHp0RkNkSWhySk55emptYmNHeSs2QUlxK2ZHL2xacmQrZEEwK3VPcUs4Z2Z1S2NvWmp0SXN2aW5wNVFZS3lHbUNZcUFJcUFJMUMwQzN1MUxxWGoxaCthMkZZd1lIT3BxaDRESFgxSWNhSUhCREFQVXUyNGRGWDQyaDF6OEpXby9iN0J4cGFlYnF4SVFvOWxZczJ0RjdYclgyb3FBSXFBSUtBS09JT0RkK1p2UnkvWk5PbzQwM0VRYjhXUy8rWGJVVTgvLzRIMlRsMzdFRVlZWWNUVUNVb1QxaU1PWG54ZTFybVlvQW9xQUlxQUkxQjBDMk9Rb0ZpTjhXZVdEcnk1K0JKSktsaTJsOHMyYks5WDBGeGNicXhFWm1hTk9EdVlEZE94UUJVbDYvL2dqbUs0QlJVQVJVQVFVZ2ZwREFMcFpEb3dDWVhVMVI4Q3o3WmEvbU5wcGd3ZFRtMG4zWUl1VGlSZCtQcGY4aFlXVTNMTVhwZXl6RDNsemNpaXBRNGVnMVZqODg4L2t6ODhuU292U3VRdlA0bFMrWXJFTFRLOW9vbUNueVlxQUlyREhJeUM2TUM0OTZNZXo0VldUbnJTN3h3T1k0QlAwcEEwWlNpV0xmcURpUll1b1lQYkhsRG5pUk5ObHdRY2ZHRC96cEpPbzZPdXZhUHZVS1pSMTNmV1VmdHh3YzBXUy84N2JMS0xvUXZJZTlnTDUyeDFxMnBBWEJJaVBCMTV6bUd3UE91aWdCSitlTnE4SUtBS0tRTU5FWU1HQ0JaU2RuVTNKdktjRHp6TEtXM0lrREY5dVkrRStvaUc5WlkrUS8zOHpvcDZRRUNQOHVFZzNhb3ROTjhQVFp1SmRsUHZDODVUL3h1dFV1bXlaSWNmU1gzNmhzdFdyS0Nremt6S09Qb2J5MzN6RElPVGRzTUV5MjltaUxQcGhJYVVOcm13WjJxRzBYZzRRK3NZakJJYk5QQkE2blBqMk9ocFdCQlFCUmFBcElBRHlTa2xKTVM5UmdTNUVIRDdJRXFRSWh6ajBxQmdXVldsY0ljYW1nRjFkbktONVE0Nm5ZMGZUbCt4Y0xmajRJeE4zdDIxSHNCQkxsaTQxOGJJVnk4bTNiU3VWNzlqQmIzYndrc3Rqa1Z5a2dVS2dibjdsVWZnVmpCQWlYb2NrTDlLTlZGL1RGQUZGUUJIWWt4RklUVTAxcHllNkVLUUlaM1JuZ0N3UmhnNEZpWUl3ZlV5ZzBkZnJUSFg5Y1FnQlE0NndDT0dTbXJjd2Z2bTJiY1l2Vzd1R3ltYiswNFR4VS9MVFQvelEvNXVVY2ZJcDVJR1EyQXFNNWlCVUNCTStCSXNybjdTME5KTldWRlFVdkVxS1ZsL1RGUUZGUUJIWWt4RUFLY0pZRUNNQkpJZzRMRWhaYXNYN1ZNV1NoQzR0M1pNQmFXRG41dGwreCsxVXZQaEhNNnkwSVVPTTMvTHFhNmpvcXkrREQvNlhzdVZZekx0YVUvcjNwK1pqeGhDMWFVdnVIajM0dnJCbFVVWTZKN05Fd01LSEEwbEN3Q0JJRWJ3SVAxTGRlTk1XOGYzU2VkOStSZTNhZGFUV2JkdFNCOTQ0MUs1ZE8yclJvZ1ZsOHRKd1JJY2IyendKSTIwYWlsaGVFeFVCUlVBUmNCQUJ1Y1VrT2hIa2h3TU9hY2lIbnJUSGtXOHR1SnBrL1VrZ0FwNWkzb3lEaC91Ymp6dURzRGtIenRPNU16VS8rNXhndDhWOGY3SGt0MStwMmNtanlkMmhveEZhbTFzbVVON3JjN2xNYnJDY1BRRGh3c0dIUUdVOVhKWlo3UlBCWHE4bTRZL2VmNHY2NXIxQ3lldUpWdWI2Nk1kU0R4VjRVNm5FbGNIdkcyeEQ3clRXbEp6Wm1qS3pPbENMMXUycFZldDIxSVBKL2VDREQ2NUpkMXBIRVZBRUZJRmFJNEFWTmVoSFdJNnl5Z2E5S05hamRJQjhXSkFvTDY5c2tUejFFNGVBcDhNTC95QTNXNEo0QzA0MGwzYlF3ZFRwamJkd2R6ajAyUlMyemxKNjlxTHluRTNScWhuQkl4TUNGMmNuU251NjVOZkVUMGxKcFg2ZDBpZzdpOGpMQy9LZU5DWm0zQTcxRi9JUEg5NzFWRmJpcDZKU1ArWHQ5TkhtZGVXMDRCTXZ6ZjFnTFAzbHprZUN5eG8xNlR0YW5hMWJ0MUk2WDNRMGE5WXNXaEZOVndTYU5BSS8vL3dMVFpwOFgwUU03cnhqQXUyNzd6NFI4K29qOGZVMzNxWTMzM3lIVGp0dERKMCs3bFJIaG1BblJKQ2svVUFIc0JwaFBjcHlxNFFkNlZ3YnFSWUJqNmRqcDJvTG9ZQ0xyMTdFNmhPL3Vvb2dQd2djNWVGd1JZVHZQQ0x1RkRHaVhUeFNrbDlTUm9WbHFWVEtrK21YMVNXMGFhZVhVano4RnA5eVhzZFBZdXZWemV2NEhNZEkybWVsME9tSHA5RG5TOTZoS1ZOYTBaMTNUa0l6anJpdnZ2cWFicnp4LzJqNzl1Mm12VU1PT1ppbVQzK1VPbld5TmowNTBvbXRFWkR3dSsrK1I1ZGRkb2t0VllPS1FNTkhvSHYzN3RTOWV6Y3owQXN2c0ZhcVpyNzRpb2tqcnlFNUVDTWNmS2ZJVWNnUXQ1dGdIZUtRTk5HZEVoZWRpYmk2dWtIQXVpa1lSMThpSFBoQ2VsVlZSeGxjSWNHWDhoQTh3dEpXVmZWanljTjBjYk54Nm1ZQ0xDOHNvcTkzN0UzSG5mRTM4cmg5bE5tc2xmazJXbWx4UGhVWEYxQ0oxMDN2Ly90TzJydk5KdXJWSVkzKy90NEhOSEhpNUZpNnFiWU1sajdHajcrR0preTRsYzQ3N3h6Q3hxTWJicmlKN3J2dmZwb3g0OUZxNjlla3dKWXRXK2llZSs2bHl5Ky90Q2JWdFk0aVVHOElOR3VXeVhzQ01rei8vZnZ2YTN5Skk2OGh1WEZzTGI3QjFpTjhwL1NXNkVENy9ndTBEWDBKWis4SE9sUFNHeEl1ZS9KWVF1dWRjWndsaEFwQjJZVVhxYnFkRENGY1dJNDQ0QkIzMHZsOXNBeVRhRWV1bC9icWR3Q05PdkU0T3VINDQybnoycVcwZE42N2xKNldUQ2VPR0VGalRocE9YVnQ3S0lXSFVWcm1DNDdIaWJGczNicU5DZ29LNk1namp6RG5oODFBOTk5L0gxdDFJZUw2NUpOUGFjeVkwM2pKYUQ4bXRDc0psaDhjNnQxODh5MG1mY1NJa2ZUNjY5YXpwY2lieEc4dW1qWHJOUVNOZS83NUYraWhoeDZoNWN0WDBBVVhYR3pTaGc0ZFJsOTg4YVVKZi9ycEhEcmxsREdtcmIvOTdZN2dVampxVEo1OGo4a2JOZW9VcXpIOVZRUVVnV29SZ0xVNDY5VVhIYk1hcFVQb1FTeVh5bk9NMEpsSWcyNFYvUXBkaTNRcEkzWFZUeXdDTldZb0NGRElMOUlRUmJBb0k0U0lTUUJCeXhHcFhrM1RURDk4TnJsRlBrcHRsazE0Qzg5MzN5K21qeDRmVDY2dkg2TGJyajZWeGw4MGtzNGRONXhjdVd2Sms0b0hiZkVvaXJYa1c5Tis3Zld5c3p2UmdBRUQ2T0tMTDZGLy8vdFZXcnQySGJWdTNZb0dEdHpQRlB2bGwxOE5JWjUyMmxqT2Y5bE05bHQ0WXhQY2hBbC81ZkpyVGZyVlY0ODNSUG45OTkrYnZHMzhhTTN1M2Z5cXZvRGJ2WHMzN2R5NWczcjA2RTczM2p2WnBMN3l5ci9NQmlNUTVtV1hYVUhubjM4ZUlXM3g0aVUwYmRyRHBzeXVYVHZwdWVkZW9Jc3V1cEF0MlVla09mVVZBVVdnSGhDQWpvUXVoSDRVTWhTOWlTVlcwYSt5WXhVNlYxM2RJUkQzc2lxR0JnR0M2RVNRa1lZTHdVbys3alBLMVJES1F2Q09DeHBycS94VytoMGxidXJkNzBEQ0E3Wjc5KzFCSjF6ekJEVnZsa0xuYjhyaFpjNENXcmw2RXpVcitoK2ZSSW9aTmcvVFVmZmlpLytnSjU5OG1pMjBlNDAxZU5CQmc5bDZuRXE5ZS9lbUw3LzhrazQ0NFFRbXJuTk5udzgvUEkxKy9IRXhrMlE1L2VjLzc5SEhIMzlJKyt6VGp3WU5Ha2cvL0xDSTVzejVqSVlPdFhZUVJ4b2tkcTkxN2RyRlpQWHMyZFA0bjMzMkdSMXp6TkUwY3VSSUU3L3V1bXZvdHR0dTUrTldFei92dkhOcDdGaG5OaFNZQnZWSEVXZ0NDR0JEaml5ck9uWFBVV0FUZ29RUEI3SVVLeEc2RXVuUXQ0N3JUQm1BK2hFUmlQdFNSQWd2WW11MlJDa0hrb1JRaFJ5UkxoYWtyWGl0ZzRia21DQjNGTHRwMGFLRjlQR0hiOUVQODcrZ0x0MTdzaVhaaWM2NStFYTY1c2E3YWV5WmwxS2FpeTFHSmtVZWl1T3VUWnMyZFB2dGY2WC8vZThuZXV1dE4vaGNmWFRWVmRlWWZsYXVYRVY5Ky9ZSjl0bXFWU3REWkJzM2JqUnBzQVRGOWU3ZGkxYXNXQ1hSbVAzWnN6K2x1WE0vNXlYVkFlYTQ0b3J4Wm5PUS9MTzFhOWMyNXJhMG9DS1FTQVRXckZsblZsZDYyRGJmSUl3VkYrUTFKQWRpaEJQZnliR0pqb1J1UkJoa0tEb1RZUndnek9vTUVpZkhwRzJ4RVJjdkNCQVVISVJZblJNaGk4QVJGOUtzcm02OCtXWTBMajl0Mk9tbnBTOU5wRncycVBKTCtLTWh2RWxuNldZdlRmajdselJreUlIMHkwL2ZVb2MwSmtjWG43cS9MTjV1cWl5L2V2VnFXckJnSVoxMTFwbm1QQWNQUHBDWFIyK2ljODg5MzB4czdNeGJ0V3Axc0ExczRObk1ud3ZyMEtHOVNmdmpqeTBrQkxtSkxWM1p5WWQvakYyN2RnWHJZVmsxbWp2NjZLT005VGwxNnIzUmltaTZJdEFnRUxoNzBoUXE1UGMwcjJFeXZIdlMxT0NZQ2dvSytSR1BLZlRDODA4RjArbzdZTitRNDlSWVJCZkNGd0xFL3pxSVVmUXM0bkRRb1VLZVR2V3Y3VlNOUU55V28xaUFFRnBWQkNuRWlQSW9oME91aGtUUVZROHRqbHllWEc3dXA3ekVTMjI3N2tXVFh2aWVUcHYwS1YzMHdHZDAxdFJQYWVwTDgzaVR6REJlYWsyandyd3QxREtEWCtUTEhDK1RNNDZlcWl5YWtaRkJ0OTU2RzIvM2ZzczhzcEtibTB1dnZmWTY0WEVPNERWczJEQjYrKzEzQ0k5N2dPQ3c5SXJkckhpdDNyQmhoL0ltbTRjSmRaWXVYVVl2dnZpU1NVT0hJTXc1YytZUUNIUE5tclhjeHJ2QmNjRDZoTU85UlZ4WllobjJsVmYrVGZQbkx6RDNYWjk1NWxtNjlOTExnK1Uxb0FnMEZBUjY5T2pHcXh2OWVEaCtNNjh4dHhGR21sd1lOcFN4Sm1KRGp1Z2Y2RXE3THNYL01aWlR4ZG56cEk3a3FaODRCRUlTaUxFUENBckNnMENyRXBTZEZFRU1LQy8xSkI1amx6RVVzNjZxeW4xK3ltRURLNytvbURLU1U3bFBFQ0NUYzZtWFB2MzBNOXFadTV2eVZzK2xqbjM0N1RsbHNobW5lZ3M0aGdHWUloMzVCZTZQUHo3REVPUk5OOTFzMG5BUDhhbW5ualJoV0pLVEowOHloSWpuSVB2MDZVTlBQUEc0eVpzKy9SRzY1cHByZWZQT0FlYVZkMWRjY1JtTkdIR0N5VHY3N0xQb1BYN2s1TkJERHlNczIrS2VwR0RmbWQ5bWRPS0pJMmowNkZQcDZhZWZOSFVtVHJ5RE53VmRhdTU1ZHV2V2pSNTdiTHBwUjM4VWdZYUV3TVE3L3hvY0RxeElPSHRhTUhNUERRanBRUi9pL3hrSGRDVDJFaUJQMHVSL0hUQkluVDBVa2daMVduR1RJd1FseEJmTG1lQmVsMXdGb1I1STBtbUhDWldjekVzVFNTazByTzFhK3ZVRmZzMGRiR0xtUFpsa1NaekFGRTJuOUV5anBKUTBTdWJsMXJRVXZQZzNiZ2lxSFA3Sko1OUVvMGFOTk4rcmhDVXBscDFVdXVDQzg4eUdIQ3duMmQvNzJyNTllMzU4WTVaNU5oS2JpWUNWT09UTm1UUGJXSnVvWTg5RG1hZWVlc0k4cmlFNFgzTEp4VXlPRjVueWVMK3NPQkN6T2tWQUVZZ2ZnVVJ1eUpIL1oraEdFQ1djNkVub05qc2gyb2t5L3JQUUd2RWdFRGN6UUdoQ09OVjFCRUhhaFNuMXd0T3JhNmU2L0o2OSt0RG1KV1hVdllPTC90UXZuU2lWZDlwRTNHempvdElDSHhVVWUvbk5PUzdhbmw5T3VYbTUxVFVmZHo0bU95eTZhQTduYnlkR2V6bThjaTZhYTk2OGViU3M0QXVLcFFENnNCT2pwS3V2Q0NnQzhTTWdHM0hnTzdsYkZUb1Jldzl3WVF0aVJGd09pU01QWmFCWGtLZXViaENJbXh5RjdPVEtwcnBoUXNCU1Zud1JmblYxWTgwLzQ4enphTnJQMzlQV0g5NDNyNHpiVmNDdmt5djJVUjRmMi9OOUhQYlRyb0p5S3ZIenV3cUpEMzZNSXptMUdmazlhWFQ0RWRFZmxZaTFmeTJuQ0NnQ3RVTUFxeXdOMlNWcVF3NzBJMGdQZXRWYUFiTStkQ3d2SlJkZGlYSWdTSFYxaDBDTnlCSENoQ0NyY2lKVWxKSHlFRERxNFJDU3JhcU5XTGliR0JBQUFBUnJTVVJCVlBNd2tXNjk1MGw2OE1HZU5HL2VQUE81cXJiZDI1cjdjM3Z6SjZ4YXRteFo0Y2pLeWpLYllMQjhpVEdwVXdRVWdmcEY0T3J4VjlUdkFLcnBIZGFpa3hZanVoTWRLcnJTcmhQRmtFQWF3dENoY1BZeUprRi9Fb1pBM09RSVFVR1lJcXlxUm1ZWExFZ0k5eCtsYml6MXEybzdQQS90VDVoZ3ZXMG1QRS9qaW9BaTBMQVJrSGVxTnV4Uk9qczY2RWZSaHdqamdJNlVQUWQyZ3BSOGxGZFhOd2pFVFk0UUVvUW1nb3MyVEpTRHczbzVycERzZFpDSEpRSVZkRFQwTkYwUlVBVDJkQVNnQjZFYnhWQkFXSXdJK0VnWDhvUytGSjI2cCtQU1VNNnZSdVFvd3F6dUpDQnNISEFRdGhBa3JvNUU4Tlcxb2ZtS2dDS2dDT3lKQ01oS0drZ1AraEMrSEdKQmdoeEZoKzZKR0RUa2M0cWJIQ0dvV0N3K2xFdG1nWXVGS1RlVFVSZHBtQVN4dE5PUXdkT3hLUUtLZ0NKUVV3U0VGS0VIOGY1cGVSUUxjWkNsa0NMMEplTFFvYUpQYTlxbjFvc2RnYmpKRVJZZ0hJUlpsWE9WNXBHdmNJc2hRVU9HWEJoWFEzQkpXQ0lvMlU3ZS9NMG1yaitLZ0NLZ0NEUTFCS0FEZllWcDVPTmJUOFppVE9hZHFxVnNQVUxIOGxIR3BBaUhQQk5pMG5TVkZ6WTFtT3J0Zk9NbVI0eFVybXlxR3JYL3U2djVzWW1LVGg1clQrWGs3bnpzV0ZJeFgyT0tnQ0tnQ0RRVkJIcmlSSmVGemxiMHBXVkNoTkkxVkQ4SUNGL0YzTHVZK3JpYVVhY0lLQUtLZ0NLZ0NPeUpDTVJOamxqN2h0UDdoWHZpZE5CelVnUVVBVVZBRVFBQ2NaTWpMRVlRb3lISHBCcXR5aXJ5aW9BaW9BZ29BZzRqNEhKYkgzQjN1TmttMjF6YzVBaFN4S1ljSEs1Vyt6Ulo0UFRFRlFGRlFCRm9TQWdrc1Q2VzIxM2lONlR4TmJheHhFMk9PRUc1NzVqUy95cHlwYmRyYk9lczQxVUVGQUZGWUk5Q3dOMXhHQ1YzRzI3T1NZblJHZEc2MkJLTTZYMUVLQ2FIUEx5S1J6UktkNjZpMGtWVHFmeVArZnlkbFlxUGQ0UTNiWStqcmp6WDQ4eXBhQ3VLZ0NLZ0NEUWVCS0JIWlE4SFJoMkoxQ0tsMmMvUWxkS0MzTjFHVVByZ1c4bWQydHkwWjFiMStQYVh0RjFkRy9iMk5CeENJQzV5UkRVUW5EeXZpSWRTRVFiUlNUcDhITEF1dzhOQ3FuaEdNaWNuaHc0NjZLRFFTRFNrQ0NnQ2lrQVRRbURCZ2dXVW5aMXRQamNudDZwQWFCS0dEOTJLTkJ6UXAwaXoreUErcE1IUWtITGlJMCtKc2VZVEt1WWROUUJaeUE3Z2krV0hkQ0ZDaElVc0lUQjdYSVNMc3NpREU3L213OWVhaW9BaW9BZzBUZ1NnSDVQNXdYL29RZEdYOEpFRy9Rb25lWGFTUkQwYzBLbjJzSjBVR3ljaURXdlVNWk9qREZ1SUVVUXBBa0pZaElmUFJ5RU1raFRCb1M3S3dLRytDQnkrT2tWQUVWQUVtaUlDMEpWdzBJT3cvRUNLY05DYmRrc1FhVklXK2hNT090WitXOHBPakhhOWF3cnJUNDBRaUlzY0FUcUVBaCtDRkN0UUxFcWt3d25wQ1VHaUxNTDRGQXZxRnhVVm1UYWtYSTFHcnBVVUFVVkFFV2pFQ0lEY2hCaHhHdENqaUl0K1JSaDZFOFNJUEJBZzhzS1BTSGxvVC9ReHd1cmlSeUF1Y2tUekFEeWNERUYrRURRRUNmSURhY3FWRDhKSUY0SkVYWVJ4S0RuR0x6Q3RvUWdvQW5zR0FtSmNRS2RDSDRyMWg3TkRHblFwaUJGaEhIQjJuUmxPbHNpWGN1SWpUVjNORVBoLzhFNjQ3aWRDaUNzQUFBQUFTVVZPUks1Q1lJST1cIiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsInZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiA/IChvYmopID0+IChPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSkgOiAob2JqKSA9PiAob2JqLl9fcHJvdG9fXyk7XG52YXIgbGVhZlByb3RvdHlwZXM7XG4vLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3Rcbi8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuLy8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4vLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3Rcbi8vIG1vZGUgJiAxNjogcmV0dXJuIHZhbHVlIHdoZW4gaXQncyBQcm9taXNlLWxpa2Vcbi8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbl9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG5cdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IHRoaXModmFsdWUpO1xuXHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuXHRpZih0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlKSB7XG5cdFx0aWYoKG1vZGUgJiA0KSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG5cdFx0aWYoKG1vZGUgJiAxNikgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicpIHJldHVybiB2YWx1ZTtcblx0fVxuXHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuXHR2YXIgZGVmID0ge307XG5cdGxlYWZQcm90b3R5cGVzID0gbGVhZlByb3RvdHlwZXMgfHwgW251bGwsIGdldFByb3RvKHt9KSwgZ2V0UHJvdG8oW10pLCBnZXRQcm90byhnZXRQcm90byldO1xuXHRmb3IodmFyIGN1cnJlbnQgPSBtb2RlICYgMiAmJiB2YWx1ZTsgdHlwZW9mIGN1cnJlbnQgPT0gJ29iamVjdCcgJiYgIX5sZWFmUHJvdG90eXBlcy5pbmRleE9mKGN1cnJlbnQpOyBjdXJyZW50ID0gZ2V0UHJvdG8oY3VycmVudCkpIHtcblx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdXJyZW50KS5mb3JFYWNoKChrZXkpID0+IChkZWZba2V5XSA9ICgpID0+ICh2YWx1ZVtrZXldKSkpO1xuXHR9XG5cdGRlZlsnZGVmYXVsdCddID0gKCkgPT4gKHZhbHVlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBkZWYpO1xuXHRyZXR1cm4gbnM7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5obWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZSA9IE9iamVjdC5jcmVhdGUobW9kdWxlKTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCAnZXhwb3J0cycsIHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHNldDogKCkgPT4ge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdFUyBNb2R1bGVzIG1heSBub3QgYXNzaWduIG1vZHVsZS5leHBvcnRzIG9yIGV4cG9ydHMuKiwgVXNlIEVTTSBleHBvcnQgc3ludGF4LCBpbnN0ZWFkOiAnICsgbW9kdWxlLmlkKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiY29udGVudF9zY3JpcHRcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2hyb21lX2V4dGVuc2lvbl90eXBlc2NyaXB0X3N0YXJ0ZXJcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2hyb21lX2V4dGVuc2lvbl90eXBlc2NyaXB0X3N0YXJ0ZXJcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvbnRlbnRfc2NyaXB0LnRzeFwiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9