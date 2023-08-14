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
        const p = {
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
        // 发送消息给 background
        let sending = webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'addNote', 'messages': { 'anki_arguments': p, 'anki_action_type': 'addNote', 'unsplash_download_location': unsplash_download_location }, });
        sending.then(handleResponse, handleError);
    };
    // 点击保存到 Anki
    const handleSaveToAnkiBtnClick = () => {
        setAddToAnkiStatus({ 'status': 'loading', 'noteId': 0 });
        // 先预处理 Anki 的 model
        let sending = webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'setModel', 'messages': {}, });
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
    newStr = newStr.replace(new RegExp(keyWord, 'gi'), `**${keyWord}**`);
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
            isTextSelected = false;
            // console.log('(MyBox !== event.target && !MyBox?.contains(event.target as Node)');
            // 停止旧的对话
            port.postMessage({ 'type': 'StopTheConversation', 'messages': '' });
            // 显示窗口
            if (selection && (selection === null || selection === void 0 ? void 0 : selection.keyWord.length) > 0) {
                showPopupCard({ 'keyWord': selection === null || selection === void 0 ? void 0 : selection.keyWord, 'Sentence': selection.sentence }, window.getSelection(), container, shadowRoot, isPin, true);
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCOztBQUVBO0FBQ0EsdUJBQXVCO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0EsZUFBZTtBQUNmLGVBQWU7QUFDZjtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTs7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Q0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBOzs7OztXQ1ZBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1dDaERBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Db21wb25lbnRzL0N1c3RvbVByb21wdEZvcm0udHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbXBvbmVudHMvRHJvcGRvd25NZW51SXRlbS50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvQ29tcG9uZW50cy9JbWFnZXMudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbXBvbmVudHMvTmF2LnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvU2VsZWN0aW9uLnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvaW5kZXgudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL1BvcHVwQ2FyZC9zdHlsZS50cyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Qb3B1cENhcmQvdXRpbC50cyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9jb250ZW50X3NjcmlwdC50c3giLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvbGliL2xvY2FsZS50cyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9hc3NldHMvc2V0dGluZ0d1aWRlLnBuZyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jcmVhdGUgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXJtb255IG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DdXN0b21Qcm9tcHRGb3JtID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmZ1bmN0aW9uIEN1c3RvbVByb21wdEZvcm0ocHJvcHMpIHtcbiAgICBjb25zdCBbZm9ybV0gPSBhbnRkXzEuRm9ybS51c2VGb3JtKCk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIC8vIOabtOaWsCBpbnB1dCDmlofmnKzmoYbnmoTpu5jorqTlgLxcbiAgICAgICAgZm9ybS5zZXRGaWVsZHNWYWx1ZSh7XG4gICAgICAgICAgICB0aXRsZTogcHJvcHMuZGF0YS50aXRsZSxcbiAgICAgICAgICAgIGdldFVuc3BsYXNoSW1hZ2VzOiBwcm9wcy5kYXRhLmdldFVuc3BsYXNoSW1hZ2VzLFxuICAgICAgICAgICAgdXNlclByb21wdDogcHJvcHMuZGF0YS51c2VyUHJvbXB0XG4gICAgICAgIH0pO1xuICAgIH0sIFtwcm9wcy5kYXRhXSk7XG4gICAgLy8g5L+d5a2YIFByb21wdFxuICAgIGNvbnN0IHNhdmVQcm9tcHQgPSAodmFsdWVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOWFs+mXreihqOWNlVxuICAgICAgICBwcm9wcy5vcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogZmFsc2UsIGRhdGE6IHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9IH0pO1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpO1xuICAgICAgICAvLyDojrflj5blt7Lkv53lrZjnmoQgUHJvbXB0IExpc3RcbiAgICAgICAgY29uc3QgcHJvbXB0TGlzdCA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7IFwicHJvbXB0TGlzdFwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5wcm9tcHRMaXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IG5ld1Byb21wdHMgPSBwcm9tcHRMaXN0O1xuICAgICAgICAvLyDlpoLmnpwgcHJvcHMg5Lit5YyF5ZCrIElE77yM5YiZ6K+05piO5b2T5YmN5piv5Zyo57yW6L6RIFByb21wdCDogIzkuI3mmK/mlrDlop4gUHJvbXB0XG4gICAgICAgIGlmIChwcm9wcy5kYXRhLmlkICE9PSAnJykge1xuICAgICAgICAgICAgLy8g5ZyoIFByb21wdCDorrDlvZXkuK3mib7liLDov5nmnaEgUHJvbXB0XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1Byb21wdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3UHJvbXB0c1tpXVsnaWQnXSA9PT0gcHJvcHMuZGF0YS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyDkv67mlLlcbiAgICAgICAgICAgICAgICAgICAgbmV3UHJvbXB0c1tpXVsndGl0bGUnXSA9IHZhbHVlc1sndGl0bGUnXTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UHJvbXB0c1tpXVsnZ2V0VW5zcGxhc2hJbWFnZXMnXSA9IHZhbHVlc1snZ2V0VW5zcGxhc2hJbWFnZXMnXTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UHJvbXB0c1tpXVsndXNlclByb21wdCddID0gdmFsdWVzWyd1c2VyUHJvbXB0J107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5ld1Byb21wdHMgPSBbT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB2YWx1ZXMpLCB7ICdpZCc6IHRpbWVzdGFtcCB9KSwgLi4ucHJvbXB0TGlzdF07XG4gICAgICAgIH1cbiAgICAgICAgLy8g5bCGIFByb21wdCDkv53lrZjkuIvmnaVcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuc2V0KHtcbiAgICAgICAgICAgIHByb21wdExpc3Q6IG5ld1Byb21wdHMubGVuZ3RoID4gNiA/IG5ld1Byb21wdHMuc3BsaWNlKDAsIDYpIDogbmV3UHJvbXB0cyxcbiAgICAgICAgfSkudGhlbihpdGVtID0+IHtcbiAgICAgICAgICAgIC8vIOWwhiBQcm9tcHQg5Lyg5Zue57uZ54i257uE5Lu277yM5Lul6K6pIFByb21wdCDliJfooaggVUkg6YeN5paw5riy5p+TXG4gICAgICAgICAgICBwcm9wcy5oYW5kbGVQcm9tcHRFZGl0ZWQocHJvcHMuZGF0YS5pZCA9PT0gJycpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGFsZXJ0KCfwn6WyU2F2ZSBmYWlsZWQsIHBvc3NpYmx5IGR1ZSB0byBhIHRvbyBsb25nIFByb21wdC4gWW91IGNhbiBkZWxldGUgb3RoZXIgUHJvbXB0cyBvciBzaG9ydGVuIHRoZSBQcm9tcHQgY2hhcmFjdGVycyBhbmQgdHJ5IGFnYWluLiBcXG4nICsgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyDliKDpmaQgUHJvbXB0XG4gICAgY29uc3QgaGFuZGxlRGVsZXRlQnV0dG9uQ2xpY2sgPSAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOWFs+mXreihqOWNlVxuICAgICAgICBwcm9wcy5vcGVuQ3VzdG9tUHJvbXB0Rm9ybSh7IGlzT3BlbjogZmFsc2UsIGRhdGE6IHsgJ3RpdGxlJzogJycsICdnZXRVbnNwbGFzaEltYWdlcyc6IGZhbHNlLCAndXNlclByb21wdCc6ICcnLCAnaWQnOiAnJyB9IH0pO1xuICAgICAgICAvLyDojrflj5blt7Lkv53lrZjnmoQgUHJvbXB0IExpc3RcbiAgICAgICAgY29uc3QgcHJvbXB0TGlzdCA9IHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5zeW5jLmdldCh7IFwicHJvbXB0TGlzdFwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5wcm9tcHRMaXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IG5ld1Byb21wdHMgPSBwcm9tcHRMaXN0O1xuICAgICAgICAvLyDlnKggUHJvbXB0IOiusOW9leS4reaJvuWIsOi/meadoSBQcm9tcHRcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdQcm9tcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobmV3UHJvbXB0c1tpXVsnaWQnXSA9PT0gcHJvcHMuZGF0YS5pZCkge1xuICAgICAgICAgICAgICAgIC8vIOWIoOmZpFxuICAgICAgICAgICAgICAgIG5ld1Byb21wdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIC8vIOWwhiBQcm9tcHQg5L+d5a2Y5LiL5p2lXG4gICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbXB0TGlzdDogbmV3UHJvbXB0cy5sZW5ndGggPiA2ID8gbmV3UHJvbXB0cy5zcGxpY2UoMCwgNikgOiBuZXdQcm9tcHRzLFxuICAgICAgICAgICAgICAgIH0pLnRoZW4oaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWwhiBQcm9tcHQg5Lyg5Zue57uZ54i257uE5Lu277yM5Lul6K6pIFByb21wdCDliJfooaggVUkg6YeN5paw5riy5p+TXG4gICAgICAgICAgICAgICAgICAgIHByb3BzLmhhbmRsZVByb21wdEVkaXRlZChwcm9wcy5kYXRhLmlkID09PSAnJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH07XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybSwgeyBvbkZpbmlzaDogc2F2ZVByb21wdCwgXG4gICAgICAgICAgICAvLyBsYXlvdXQ9J2hvcml6b250YWwnXG4gICAgICAgICAgICBsYWJlbENvbDoge1xuICAgICAgICAgICAgICAgIHhzOiB7IHNwYW46IDYgfSxcbiAgICAgICAgICAgICAgICBzbTogeyBzcGFuOiA1IH0sXG4gICAgICAgICAgICB9LCBmb3JtOiBmb3JtIH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwidGl0bGVcIiwgbGFiZWw6IFwiVGl0bGVcIiwgcnVsZXM6IFt7IHJlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAnUGxlYXNlIGlucHV0IHlvdXIgdGl0bGUnIH1dIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLklucHV0LCB7IG1heExlbmd0aDogNDAsIG9uS2V5RG93bjogaGFuZGxlS2V5RG93biwgcGxhY2Vob2xkZXI6IFwiSG93IHRvIG5hbWUgdGhlIFByb21wdFwiLCB0eXBlOiBcInRleHRcIiB9KSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IGV4dHJhOiBcIkRpc3BsYXkgSW1hZ2VzIFJlbGF0ZWQgdG8gdGhlIFNlbGVjdGVkIFRleHRcIiwgbmFtZTogXCJnZXRVbnNwbGFzaEltYWdlc1wiLCBsYWJlbDogXCJJbWFnZXNcIiwgdmFsdWVQcm9wTmFtZTogXCJjaGVja2VkXCIgfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuU3dpdGNoLCBudWxsKSksXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRm9ybS5JdGVtLCB7IG5hbWU6IFwidXNlclByb21wdFwiLCBsYWJlbDogXCJQcm9tcHRcIiwgZXh0cmE6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYCR7J3tzZWxlY3Rpb259J306IFNlbGVjdGVkIHRleHRgLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJyXCIsIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICBgJHsne3NlbnRlbmNlfSd9OiBTZW50ZW5jZSBjb250YWluaW5nIHRoZSBzZWxlY3RlZCB0ZXh0YCxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJiclwiLCBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI0YwOEEyNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiAoKSA9PiB3aW5kb3cub3BlbignaHR0cHM6Ly9qaWFuZ3ppbG9uZy5ub3Rpb24uc2l0ZS9EeW5hbWljLVBsYWNlaG9sZGVycy01ZjA3MDUxNjNmZjY0MGFmYmRkNTc3MTE1ZGM5NTc3OT9wdnM9NCcpIH0sIFwiTGVhcm4gTW9yZVwiKSksIHJ1bGVzOiBbeyByZXF1aXJlZDogdHJ1ZSwgbWVzc2FnZTogJ1BsZWFzZSBpbnB1dCB5b3VyIHByb21wdCcgfV0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuSW5wdXQuVGV4dEFyZWEsIHsgcGxhY2Vob2xkZXI6IFwiVHJhbnNsYXRlIHtzZWxlY3Rpb259IHRvIENoaW5lc2VcIiwgb25LZXlEb3duOiBoYW5kbGVLZXlEb3duLCByb3dzOiA0LCBtYXhMZW5ndGg6IDMwMDAgfSkpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBzdHlsZTogeyBtYXJnaW46ICcwJyB9IH0sXG4gICAgICAgICAgICAgICAgcHJvcHMuZGF0YS5pZCAhPT0gJycgJiYgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICcxMnB4J1xuICAgICAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiBoYW5kbGVEZWxldGVCdXR0b25DbGljaywgZGFuZ2VyOiB0cnVlIH0sIFwiRGVsZXRlXCIpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHsgbWluV2lkdGg6ICcxMjBweCcgfSwgdHlwZTogXCJwcmltYXJ5XCIsIGh0bWxUeXBlOiBcInN1Ym1pdFwiIH0sIFwiU2F2ZVwiKSkpKSk7XG59XG5leHBvcnRzLkN1c3RvbVByb21wdEZvcm0gPSBDdXN0b21Qcm9tcHRGb3JtO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRHJvcGRvd25NZW51SXRlbSA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IERyb3Bkb3duTWVudSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQHJhZGl4LXVpL3JlYWN0LWRyb3Bkb3duLW1lbnVcIikpO1xuY29uc3QgcmVhY3RfaWNvbnNfMSA9IHJlcXVpcmUoXCJAcmFkaXgtdWkvcmVhY3QtaWNvbnNcIik7XG5mdW5jdGlvbiBEcm9wZG93bk1lbnVJdGVtKHByb3BzKSB7XG4gICAgY29uc3QgW2lzSG92ZXJlZCwgc2V0SXNIb3ZlcmVkXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgfSk7XG4gICAgY29uc3Qgb25TZWxlY3QgPSAoKSA9PiB7XG4gICAgICAgIHByb3BzLm9uU2VsZWN0KCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVFZGl0UHJvbXB0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBwcm9wcy5oYW5kbGVFZGl0UHJvbXB0KCk7XG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5JdGVtLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnNnB4JyxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzRweCcsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcycHgnXG4gICAgICAgIH0sIGNsYXNzTmFtZTogXCJEcm9wZG93bk1lbnVJdGVtXCIsIG9uTW91c2VFbnRlcjogKCkgPT4gc2V0SXNIb3ZlcmVkKHRydWUpLCBvbk1vdXNlTGVhdmU6ICgpID0+IHNldElzSG92ZXJlZChmYWxzZSksIG9uU2VsZWN0OiBvblNlbGVjdCB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgIGZsZXg6ICcxJyxcbiAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnXG4gICAgICAgICAgICB9IH0sIHByb3BzLmNoaWxkcmVuKSxcbiAgICAgICAgaXNIb3ZlcmVkICYmIChwcm9wcy5kYXRhLmlkID09PSAnRGVmYXVsdCcgPyByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IG9uQ2xpY2s6ICgpID0+IHsgd2luZG93Lm9wZW4oJ2h0dHBzOi8vamlhbmd6aWxvbmcubm90aW9uLnNpdGUvV2hhdC1pcy10aGUtZGVmYXVsdC1Qcm9tcHQtUHJvbXB0LTViNTVlM2ZjMzAzZDQyNWY4Y2NhMTZkNWJlZTE5ZTdjJyk7IH0gfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ljb25zXzEuUXVlc3Rpb25NYXJrQ2lyY2xlZEljb24sIG51bGwpKSA6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgb25DbGljazogaGFuZGxlRWRpdFByb21wdCB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfaWNvbnNfMS5QZW5jaWwySWNvbiwgbnVsbCkpKSkpO1xufVxuZXhwb3J0cy5Ecm9wZG93bk1lbnVJdGVtID0gRHJvcGRvd25NZW51SXRlbTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkltYWdlcyA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgaWNvbnNfMSA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9pY29uc1wiKTtcbmZ1bmN0aW9uIEltYWdlcyhwcm9wcykge1xuICAgIGNvbnN0IFtpbWFnZXMsIHNldEltYWdlc10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoW10pO1xuICAgIGNvbnN0IFtpbWFnZUluZGV4LCBzZXRJbWFnZUluZGV4XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgwKTtcbiAgICBjb25zdCBbc2hvd0NvbnRyb2wsIHNldFNob3dDb250cm9sXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3QgW2NoYW5nZUltYWdlLCBzZXRDaGFuZ2VJbWFnZVN0YXR1c10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIC8vIGNvbnN0IFtzZWFyY2hJbWFnZUlzTG9hZGluZywgc2V0U2VhcmNoSW1hZ2VJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gICAgLy8gY29uc3QgW2N1cnJlbnRVUkwsIHNldEN1cnJlbnRVUkxdID0gdXNlU3RhdGU8c3RyaW5nPigpO1xuICAgIGNvbnN0IGlucHV0RWxlbWVudCA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIHNldEltYWdlcyhwcm9wcy5pbWFnZXMpO1xuICAgICAgICBzZXRJbWFnZUluZGV4KDApO1xuICAgIH0sIFtwcm9wcy5pbWFnZXNdKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpbnB1dEVsZW1lbnQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpbnB1dEVsZW1lbnQuY3VycmVudCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGlucHV0RWxlbWVudC5jdXJyZW50Py5pbnB1dCk7XG4gICAgICAgIChfYSA9IGlucHV0RWxlbWVudC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9jdXMoKTtcbiAgICB9LCBbY2hhbmdlSW1hZ2VdKTtcbiAgICBjb25zdCBoYW5kbGVFZGl0SW1hZ2VzQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHNldENoYW5nZUltYWdlU3RhdHVzKHRydWUpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlU2VhcmNoSW5wdXQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVTZWFyY2hCdG5DbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgbGV0IGlucHV0VmFsdWUgPSAoX2IgPSAoX2EgPSBpbnB1dEVsZW1lbnQuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlucHV0KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudmFsdWU7XG4gICAgICAgIGlmIChpbnB1dFZhbHVlICYmIGlucHV0VmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICBwcm9wcy5nZXRVbnNwbGFzaEltYWdlcyhpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgIHNldENoYW5nZUltYWdlU3RhdHVzKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlSW1hZ2VzQ2xpY2sgPSAob2Zmc2V0KSA9PiB7XG4gICAgICAgIHNldEltYWdlSW5kZXgoaW5kZXggPT4ge1xuICAgICAgICAgICAgaW5kZXggPSBpbmRleCArIG9mZnNldDtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSBpbWFnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaW1hZ2VzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyDpooTliqDovb3kuIvkuIDlvKDlm75cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUltYWdlc0JveEhvdmVyID0gKGUpID0+IHtcbiAgICAgICAgaWYgKGUudHlwZSA9PT0gJ21vdXNlZW50ZXInKSB7XG4gICAgICAgICAgICBzZXRTaG93Q29udHJvbCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS50eXBlID09PSAnbW91c2VsZWF2ZScpIHtcbiAgICAgICAgICAgIHNldFNob3dDb250cm9sKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbWFnZXNcIiwgc3R5bGU6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogJzhweCdcbiAgICAgICAgfSB9LFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBvbk1vdXNlRW50ZXI6IGhhbmRsZUltYWdlc0JveEhvdmVyLCBvbk1vdXNlTGVhdmU6IGhhbmRsZUltYWdlc0JveEhvdmVyIH0sXG4gICAgICAgICAgICAgICAgaW1hZ2VzLmxlbmd0aCA+IDAgP1xuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbWFnZUJveFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkltYWdlLCB7IFwiZGF0YS1kb3dubG9hZGxvY2F0aW9uXCI6IGltYWdlc1tpbWFnZUluZGV4XS5saW5rcy5kb3dubG9hZF9sb2NhdGlvbiwgc3JjOiBpbWFnZXNbaW1hZ2VJbmRleF0udXJscy5zbWFsbCwgYWx0OiBpbWFnZXNbaW1hZ2VJbmRleF1bJ2Rlc2NyaXB0aW9uJ10sIGhlaWdodDogMjQwLCB3aWR0aDogJzEwMCUnLCBwcmV2aWV3OiBmYWxzZSwgcGxhY2Vob2xkZXI6IHRydWUgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sIGltYWdlcy5tYXAoaW1nID0+IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsga2V5OiBpbWcuaWQsIHNyYzogaW1nLnVybHMuc21hbGwgfSkpKSlcbiAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcyNDBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMDYpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRW1wdHksIHsgc3R5bGU6IHsgbWFyZ2luOiAnMCBhdXRvJyB9LCBkZXNjcmlwdGlvbjogJ05vIHJlbGF0ZWQgcGljdHVyZXMgZm91bmQnLCBpbWFnZTogYW50ZF8xLkVtcHR5LlBSRVNFTlRFRF9JTUFHRV9TSU1QTEUgfSkpLFxuICAgICAgICAgICAgICAgIHNob3dDb250cm9sICYmXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICc1MCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMCAycHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYXJvdW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzZweCAxMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAnMHB4IDE4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDM2MGRlZywgcmdiYSgwLCAwLCAwLCAwKSAwJSwgcmdiYSgwLCAwLCAwLCAwLjEpIDI3LjYlLCByZ2JhKDAsIDAsIDAsIDAuMikgNTQuNjklLCByZ2JhKDAsIDAsIDAsIDAuMzUpIDEwMCUpJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgY2hhbmdlSW1hZ2UgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaYvuekuuWbvueJh+aQnOe0ouaOp+S7tlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzJweCAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgZmxleDogJzEnLCBtYXJnaW5SaWdodDogJzIwcHgnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5JbnB1dCwgeyBwcmVmaXg6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuU2VhcmNoT3V0bGluZWQsIG51bGwpLCBwbGFjZWhvbGRlcjogXCJTZWFyY2ggaW1hZ2VzXCIsIG9uS2V5RG93bjogaGFuZGxlU2VhcmNoSW5wdXQsIHNpemU6IFwic21hbGxcIiwgc3R5bGU6IHsgd2lkdGg6ICcxMDAlJyB9LCByZWY6IGlucHV0RWxlbWVudCwgb25QcmVzc0VudGVyOiBoYW5kbGVTZWFyY2hCdG5DbGljayB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIHN0eWxlOiB7IGNvbG9yOiAnI2ZmZicsIG1hcmdpbkJvdHRvbTogJzRweCcsIG1hcmdpblJpZ2h0OiAnMTBweCcgfSwgb25DbGljazogaGFuZGxlU2VhcmNoQnRuQ2xpY2ssIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuQ2hlY2tPdXRsaW5lZCwgbnVsbCkgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIHN0eWxlOiB7IGNvbG9yOiAnI2ZmZicsIG1hcmdpbkJvdHRvbTogJzRweCcgfSwgb25DbGljazogKCkgPT4gc2V0Q2hhbmdlSW1hZ2VTdGF0dXMoZmFsc2UpLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkNsb3NlT3V0bGluZWQsIG51bGwpIH0pKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaYvuekuuWbvueJh+WvvOiIquaOp+S7tlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhHcm93OiAnaW5oZXJpdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzEwMCUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0eXBlOiBcInRleHRcIiwgc2l6ZTogXCJzbWFsbFwiLCBpY29uOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChpY29uc18xLkxlZnRPdXRsaW5lZCwgbnVsbCksIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUNoYW5nZUltYWdlc0NsaWNrKC0xKSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnNDBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICc1MDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcwIDRweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiAnNHB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBpbWFnZUluZGV4ICsgMSArICcvJyArIGltYWdlcy5sZW5ndGgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMTAwJSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHR5cGU6IFwidGV4dFwiLCBzaXplOiBcInNtYWxsXCIsIGljb246IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuUmlnaHRPdXRsaW5lZCwgbnVsbCksIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUNoYW5nZUltYWdlc0NsaWNrKDEpIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93LXJldmVyc2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiAnMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdlbmQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgdHlwZTogXCJ0ZXh0XCIsIHNpemU6IFwic21hbGxcIiwgc3R5bGU6IHsgY29sb3I6ICcjZmZmJyB9LCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVFZGl0SW1hZ2VzQ2xpY2soKSwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5Gb3JtT3V0bGluZWQsIG51bGwpIH0pKSkpKSksXG4gICAgICAgICAgICBpbWFnZXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMC45MmVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjQpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJzRweCdcbiAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICBcIlBob3RvIGJ5IFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBzdHlsZTogeyB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScgfSwgdGFyZ2V0OiAnX2JsYW5rJywgaHJlZjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS9AXCIgKyBpbWFnZXNbaW1hZ2VJbmRleF0udXNlci51c2VybmFtZSArIFwiP3V0bV9zb3VyY2U9U2NvdXRlciZ1dG1fbWVkaXVtPXJlZmVycmFsXCIgfSwgaW1hZ2VzW2ltYWdlSW5kZXhdLnVzZXIubmFtZSksXG4gICAgICAgICAgICAgICAgICAgIFwiIG9uIFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBzdHlsZTogeyB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScgfSwgdGFyZ2V0OiAnX2JsYW5rJywgaHJlZjogXCJodHRwczovL3Vuc3BsYXNoLmNvbS8/dXRtX3NvdXJjZT1TY291dGVyJnV0bV9tZWRpdW09cmVmZXJyYWxcIiB9LCBcIlVuc3BsYXNoXCIpKSkpKTtcbn1cbmV4cG9ydHMuSW1hZ2VzID0gSW1hZ2VzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTmF2ID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IERyb3Bkb3duTWVudSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQHJhZGl4LXVpL3JlYWN0LWRyb3Bkb3duLW1lbnVcIikpO1xuY29uc3QgRHJvcGRvd25NZW51SXRlbV8xID0gcmVxdWlyZShcIi4vRHJvcGRvd25NZW51SXRlbVwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi9Qb3B1cENhcmQvdXRpbFwiKTtcbmNvbnN0IHJlYWN0X2ljb25zXzEgPSByZXF1aXJlKFwiQHJhZGl4LXVpL3JlYWN0LWljb25zXCIpO1xuLy8gaW1wb3J0IHR5cGUgeyBNZW51UHJvcHMgfSBmcm9tICdhbnRkJztcbmNvbnN0IGNvbnRlbnRfc2NyaXB0XzEgPSByZXF1aXJlKFwiLi4vY29udGVudF9zY3JpcHRcIik7XG5jb25zdCBpY29uc18xID0gcmVxdWlyZShcIkBhbnQtZGVzaWduL2ljb25zXCIpO1xuZnVuY3Rpb24gTmF2KHByb3BzKSB7XG4gICAgY29uc3QgW2lzUGluLCBzZXRJc1Bpbl0gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIGNvbnN0IFtjdXJyZW50VVJMLCBzZXRDdXJyZW50VVJMXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgpO1xuICAgIGNvbnN0IFtpc09wZW5Qcm9tcHRNZW51LCBzZXRJc09wZW5Qcm9tcHRNZW51XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgLy8gY29uc3QgeyBPcHRpb24gfSA9IFNlbGVjdDtcbiAgICBjb25zdCBuYXZFbGVtZW50ID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICBjb25zdCBkZWZhdWx0UHJvbXB0ID0gKDAsIHV0aWxfMS5nZXREZWZhdWx0UHJvbXB0KSgnJyk7XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgfSwgW10pO1xuICAgIC8vIOeCueWHu+S/neWtmOWIsCBBbmtpIOaMiemSrlxuICAgIGNvbnN0IGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljayA9ICgpID0+IHtcbiAgICAgICAgcHJvcHMuaGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrKCk7XG4gICAgfTtcbiAgICAvLyDngrnlh7sgUGluIOaMiemSrlxuICAgIGNvbnN0IGhhbmRsZVBpbkJ0bkNsaWNrID0gKCkgPT4ge1xuICAgICAgICBpZiAoaXNQaW4pIHtcbiAgICAgICAgICAgICgwLCBjb250ZW50X3NjcmlwdF8xLnBpblBvcHVwQ2FyZCkoZmFsc2UpO1xuICAgICAgICAgICAgc2V0SXNQaW4oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgKDAsIGNvbnRlbnRfc2NyaXB0XzEucGluUG9wdXBDYXJkKSh0cnVlKTtcbiAgICAgICAgICAgIHNldElzUGluKHRydWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyDlnKggQW5raSDkuK3miZPlvIDnrJTorrBcbiAgICBjb25zdCBlZGl0Tm90ZUluQW5raSA9IChub3RlSWQpID0+IHtcbiAgICAgICAgbGV0IHNlbmRpbmcgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdndWlFZGl0Tm90ZScsICdtZXNzYWdlcyc6IHsgJ2Fua2lfYWN0aW9uX3R5cGUnOiAnZ3VpRWRpdE5vdGUnLCAnYW5raV9hcmd1bWVudHMnOiB7ICdub3RlJzogbm90ZUlkIH0sIH0gfSk7XG4gICAgICAgIHNlbmRpbmcudGhlbigobWVzc2FnZSkgPT4ge1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAvL2Vycm9yXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy8g5omT5byAIFByb21wdCDnvJbovpHnqpflj6NcbiAgICBjb25zdCBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSA9IChkYXRhKSA9PiB7XG4gICAgICAgIHByb3BzLm9wZW5DdXN0b21Qcm9tcHRGb3JtKGRhdGEpO1xuICAgICAgICBzZXRJc09wZW5Qcm9tcHRNZW51KGZhbHNlKTtcbiAgICB9O1xuICAgIC8vIFByb21wdCDoj5zljZUgaXRlbSDngrnlh7tcbiAgICBjb25zdCBoYW5kbGVNZW51SXRlbUNsaWNrID0gKGRhdGEpID0+IHtcbiAgICAgICAgLy8g56ysIDMg5Liq5Y+C5pWwIGZhbHNlIOihqOekuuS4jemHjeaWsOa4suafk+WbvueJh1xuICAgICAgICAvLyDlpoLmnpzkuIrkuIDkuKogUHJvbXB0IOaYr+S4jeaYvuekuuWbvueJh++8jOS4lOW9k+WJjSBQcm9tcHQg6ZyA6KaB5pi+56S65Zu+54mH77yM5YiZ5pys5qyh5Lu75Yqh6ZyA6KaB5riy5p+T5Zu+54mH77yM5ZCm5YiZ5LiN6YeN5paw5riy5p+T5Zu+54mHXG4gICAgICAgIGlmIChwcm9wcy5sYXN0RXhlY3V0ZWRQcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMgIT09IHRydWUgJiYgZGF0YS5nZXRVbnNwbGFzaEltYWdlcykge1xuICAgICAgICAgICAgcHJvcHMuaGFuZGxlTWVudUl0ZW1DbGljayhkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHByb3BzLmhhbmRsZU1lbnVJdGVtQ2xpY2soZGF0YSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBvbk1lbnVPcGVuQ2hhbmdlID0gKG9wZW4pID0+IHtcbiAgICAgICAgLy8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgc2V0SXNPcGVuUHJvbXB0TWVudShvcGVuKTtcbiAgICB9O1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQ29uZmlnUHJvdmlkZXIsIHsgdGhlbWU6IHtcbiAgICAgICAgICAgICAgICB0b2tlbjoge1xuICAgICAgICAgICAgICAgICAgICBjb2xvclByaW1hcnk6ICcjRjA4QTI0JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBpZDogXCJTY291dGVyTmF2XCIsIHJlZjogbmF2RWxlbWVudCwgY2xhc3NOYW1lOiAncC00Jywgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAnbW92ZScsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLCB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogOVxuICAgICAgICAgICAgICAgIH0sIG9uTW91c2VEb3duOiBwcm9wcy5vbk1vdXNlRG93biB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgekluZGV4OiA5IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51LlJvb3QsIHsgb3BlbjogaXNPcGVuUHJvbXB0TWVudSwgbW9kYWw6IGZhbHNlLCBvbk9wZW5DaGFuZ2U6IG9uTWVudU9wZW5DaGFuZ2UgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5UcmlnZ2VyLCB7IGFzQ2hpbGQ6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJJY29uQnV0dG9uXCIsIFwiYXJpYS1sYWJlbFwiOiBcIkN1c3RvbWlzZSBvcHRpb25zXCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICcycHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAnMTcwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgcHJvcHMubGFzdEV4ZWN1dGVkUHJvbXB0LnRpdGxlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfaWNvbnNfMS5IYW1idXJnZXJNZW51SWNvbiwgbnVsbCkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duTWVudS5Qb3J0YWwsIHsgY29udGFpbmVyOiBuYXZFbGVtZW50LmN1cnJlbnQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnUuQ29udGVudCwgeyBjbGFzc05hbWU6IFwiRHJvcGRvd25NZW51Q29udGVudFwiLCBhbGlnbjogJ3N0YXJ0Jywgc2lkZU9mZnNldDogNSwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAnZGVmYXVsdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTgwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAnMHB4IDEwcHggMzhweCAtMTBweCByZ2JhKDIyLCAyMywgMjQsIDAuMzUpLCAwcHggMTBweCAyMHB4IC0xNXB4IHJnYmEoMjIsIDIzLCAyNCwgMC4yKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246ICc0MDBtcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb3pBbmltYXRpb25UaW1pbmdGdW5jdGlvbjogJ2N1YmljLWJlemllcigwLjE2LCAxLCAwLjMsIDEpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbGxDaGFuZ2U6ICd0cmFuc2Zvcm0sIG9wYWNpdHknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51SXRlbV8xLkRyb3Bkb3duTWVudUl0ZW0sIHsga2V5OiBkZWZhdWx0UHJvbXB0LmlkLCBkYXRhOiBkZWZhdWx0UHJvbXB0LCBvblNlbGVjdDogKCkgPT4gaGFuZGxlTWVudUl0ZW1DbGljayhkZWZhdWx0UHJvbXB0KSwgaGFuZGxlRWRpdFByb21wdDogKCkgPT4gb3BlbkN1c3RvbVByb21wdEZvcm0oeyBpc09wZW46IHRydWUsIGRhdGE6IGRlZmF1bHRQcm9tcHQgfSkgfSwgZGVmYXVsdFByb21wdC50aXRsZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLnByb21wdHMubWFwKGl0ZW0gPT4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25NZW51SXRlbV8xLkRyb3Bkb3duTWVudUl0ZW0sIHsga2V5OiBpdGVtLmlkLCBkYXRhOiBpdGVtLCBvblNlbGVjdDogKCkgPT4gaGFuZGxlTWVudUl0ZW1DbGljayhpdGVtKSwgaGFuZGxlRWRpdFByb21wdDogKCkgPT4gb3BlbkN1c3RvbVByb21wdEZvcm0oeyBpc09wZW46IHRydWUsIGRhdGE6IGl0ZW0gfSkgfSwgaXRlbS50aXRsZSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChEcm9wZG93bk1lbnUuU2VwYXJhdG9yLCB7IGNsYXNzTmFtZTogXCJEcm9wZG93bk1lbnVTZXBhcmF0b3JcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMucHJvbXB0cy5sZW5ndGggPCA2ID8gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZTogeyBtYXJnaW5Ub3A6ICc0cHgnIH0sIHNpemU6ICdzbWFsbCcsIG9uQ2xpY2s6ICgpID0+IG9wZW5DdXN0b21Qcm9tcHRGb3JtKHsgaXNPcGVuOiB0cnVlLCBkYXRhOiB7ICd0aXRsZSc6ICcnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBmYWxzZSwgJ3VzZXJQcm9tcHQnOiAnJywgJ2lkJzogJycgfSB9KSB9LCBcIkNyZWF0ZSBwcm9tcHRcIikgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzdHlsZTogeyBtYXJnaW5Ub3A6ICc0cHgnIH0sIHNpemU6ICdzbWFsbCcsIGRpc2FibGVkOiB0cnVlIH0sIFwiQXQgbW9zdCA3IFByb21wdHNcIikpKSkpLFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInJpZ2h0QnRuQm94XCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdlbmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5hZGRUb0Fua2lTdGF0dXMuc3RhdHVzID09ICdzdWNjZXNzJyA/IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5DaGVja0NpcmNsZVR3b1RvbmUsIHsgdHdvVG9uZUNvbG9yOiBcIiM1MmM0MWFcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIEFkZGVkIHRvIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9uQ2xpY2s6IGVkaXROb3RlSW5BbmtpLmJpbmQoZXZlbnQsIHByb3BzLmFkZFRvQW5raVN0YXR1cy5ub3RlSWQpIH0sIFwiQW5raVwiKSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyBzaXplOiBcInNtYWxsXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHR5cGU9J3RleHQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMy4ycHgnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5QbHVzU3F1YXJlT3V0bGluZWQsIG51bGwpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsb2FkaW5nPXtwcm9wcy5hZGRUb0Fua2lTdGF0dXMgPT09ICdsb2FkaW5nJyA/IHRydWUgOiBmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogcHJvcHMuYWRkVG9BbmtpU3RhdHVzLnN0YXR1cyA9PT0gJ3N0YW5kYnknIHx8IHByb3BzLmFkZFRvQW5raVN0YXR1cy5zdGF0dXMgPT09ICdsb2FkaW5nJyA/IHRydWUgOiBmYWxzZSwgb25DbGljazogaGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrIH0sIHByb3BzLmFkZFRvQW5raVN0YXR1cy5zdGF0dXMgPT09ICdsb2FkaW5nJyA/ICdBZGRpbmcuLi4nIDogJ0FkZCB0byBBbmtpJyksXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc2l6ZTogJ3NtYWxsJywgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogaXNQaW4gPyAnI0YwOEEyNCcgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzEzLjJweCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGljb246IGlzUGluID8gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5QdXNocGluRmlsbGVkLCB7IGNsYXNzTmFtZTogJ2lzUGluJyB9KSA6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGljb25zXzEuUHVzaHBpbk91dGxpbmVkLCBudWxsKSwgb25DbGljazogaGFuZGxlUGluQnRuQ2xpY2sgfSkpKSkpKTtcbn1cbmV4cG9ydHMuTmF2ID0gTmF2O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2VsZWN0aW9uID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgbG9jYWxlXzEgPSByZXF1aXJlKFwiLi4vbGliL2xvY2FsZVwiKTtcbmNvbnN0IGxhbmdfMSA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbmNvbnN0IGljb25zXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7XG4vLyBjb25zdCB1c2VTdHlsZXMgPSBjcmVhdGVVc2VTdHlsZXMoe1xuLy8gICBtb3JlQnV0dG9uOiB7XG4vLyAgICAgY29sb3I6ICcjRjA4QTI0Jyxcbi8vICAgICBcIiY6aG92ZXJcIjoge1xuLy8gICAgICAgY29sb3I6ICdyZWQnXG4vLyAgICAgfVxuLy8gICB9LFxuLy8gfSlcbmNvbnN0IHN0eWxlID0gYFxuICAjU2NvdXRlclNlbGVjdGlvbj5zcGFuIHtcbiAgICBmb250LXNpdGU6MTJweDtcbiAgICBjb2xvcjojNjY2O1xuICB9XG4gIC5tb3JlQnV0dG9uIHtcbiAgICBjb2xvcjogI0YwOEEyNDtcbiAgICBjdXJzb3I6cG9pbnRlcjtcbiAgICBtYXJnaW46MHB4IDJweDtcbiAgfVxuICAubW9yZUJ1dHRvbjpob3ZlciB7XG4gICAgb3BhY2l0eTowLjg7XG4gIH1cblxuYDtcbmZ1bmN0aW9uIFNlbGVjdGlvbihwcm9wcykge1xuICAgIGNvbnN0IFt0YXJnZXRMYW5ndWFnZSwgc2V0VGFyZ2V0TGFuZ3VhZ2VdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKCdFbmdsaXNoJyk7XG4gICAgY29uc3QgW3Nob3dGdWxsVGV4dCwgc2V0U2hvd0Z1bGxUZXh0XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh0cnVlKTtcbiAgICBjb25zdCBbcGxheVN0YXR1cywgc2V0UGxheVN0YXR1c10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoZmFsc2UpO1xuICAgIC8vIOiOt+WPlueUqOaIt+iuvue9rueahOivreiogOS/oeaBr1xuICAgIGxldCBMYW5nID0gKDAsIGxvY2FsZV8xLnVzZUN1cnJlbnRMYW5ndWFnZSkoKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgc2V0VGFyZ2V0TGFuZ3VhZ2UoTGFuZ1sndGFyZ2V0J11bJ2lkJ10pO1xuICAgICAgICBzZXRTaG93RnVsbFRleHQocHJvcHMudGV4dC5sZW5ndGggPD0gMTQwKTtcbiAgICAgICAgc2V0UGxheVN0YXR1cyhmYWxzZSk7XG4gICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIob25TdG9yYWdlQ2hhbmdlKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5vbkNoYW5nZWQucmVtb3ZlTGlzdGVuZXIob25TdG9yYWdlQ2hhbmdlKTtcbiAgICAgICAgfTtcbiAgICB9LCBbcHJvcHMudGV4dF0pO1xuICAgIC8vIOivremfs+aSreaKpVxuICAgIGNvbnN0IHNwZWFrZXIgPSAoKSA9PiB7XG4gICAgICAgIC8vIOivhuWIq+ivreiogFxuICAgICAgICAvLyBjb25zdCBsbmdEZXRlY3RvciA9IG5ldyBMYW5ndWFnZURldGVjdCgpO1xuICAgICAgICAvLyBsbmdEZXRlY3Rvci5zZXRMYW5ndWFnZVR5cGUoJ2lzbzInKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhsbmdEZXRlY3Rvci5kZXRlY3QocHJvcHMudGV4dCwgMikpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgKDAsIHV0aWxfMS5wbGF5VGV4dFRvU3BlZWNoKShwcm9wcy50ZXh0LCBsYW5nXzEubGFuZ3VhZ2VDb2Rlc1t0YXJnZXRMYW5ndWFnZV0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8g5pqC5YGc5LiK5LiA5qyh5pKt5oql5Lu75YqhXG4gICAgICAgICAgICBzcGVlY2hTeW50aGVzaXMuY2FuY2VsKCk7XG4gICAgICAgICAgICBjb25zdCB1dHRlcmFuY2UgPSBuZXcgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKHByb3BzLnRleHQpO1xuICAgICAgICAgICAgLy8g6K+t56eNXG4gICAgICAgICAgICB1dHRlcmFuY2UubGFuZyA9IGxhbmdfMS5sYW5ndWFnZUNvZGVzW3RhcmdldExhbmd1YWdlXTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGxhbmd1YWdlQ29kZXNbdGFyZ2V0TGFuZ3VhZ2UgYXMga2V5b2YgdHlwZW9mIGxhbmd1YWdlQ29kZXNdKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRhcmdldExhbmd1YWdlKTtcbiAgICAgICAgICAgIC8vIOivremAn1xuICAgICAgICAgICAgaWYgKHBsYXlTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAvLyDln7rmlbDmrKHmkq3mlL7ml7bph4fnlKjmhaLpgJ/mkq3mlL7vvIzorqnnlKjmiLflj6/ku6XlkKznmoTmm7TmuIXmpZpcbiAgICAgICAgICAgICAgICB1dHRlcmFuY2UucmF0ZSA9IDAuNjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHV0dGVyYW5jZS5yYXRlID0gMC44NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFBsYXlTdGF0dXMoIXBsYXlTdGF0dXMpO1xuICAgICAgICAgICAgLy8g5byA5pKt5ZCnXG4gICAgICAgICAgICBzcGVlY2hTeW50aGVzaXMuc3BlYWsodXR0ZXJhbmNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3Qgb25TdG9yYWdlQ2hhbmdlID0gKGNoYW5nZXMsIGFyZWEpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2hhbmdlcyk7XG4gICAgICAgIC8vIOabtOaWsOebruagh+ivreiogFxuICAgICAgICBpZiAoJ3RhcmdldExhbmd1YWdlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY2hhbmdlcycpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY2hhbmdlc1sndGFyZ2V0TGFuZ3VhZ2UnXVsnbmV3VmFsdWUnXSk7XG4gICAgICAgICAgICBzZXRUYXJnZXRMYW5ndWFnZShjaGFuZ2VzWyd0YXJnZXRMYW5ndWFnZSddWyduZXdWYWx1ZSddKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlVG9nZ2xlU2hvd0Z1blRleHQgPSAoKSA9PiB7XG4gICAgICAgIHNldFNob3dGdWxsVGV4dCghc2hvd0Z1bGxUZXh0KTtcbiAgICB9O1xuICAgIC8vIGNvbnN0IGNsYXNzZXMgPSB1c2VTdHlsZXMoKVxuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIsIG51bGwsIHN0eWxlKSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBpZDogXCJTY291dGVyU2VsZWN0aW9uXCIsIGNsYXNzTmFtZTogJycsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogJzEwcHgnXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICBzaG93RnVsbFRleHQgPyByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHByb3BzLnRleHQpLFxuICAgICAgICAgICAgICAgIHByb3BzLnRleHQubGVuZ3RoID4gMTQwICYmIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGNsYXNzTmFtZTogJ21vcmVCdXR0b24nLCBvbkNsaWNrOiBoYW5kbGVUb2dnbGVTaG93RnVuVGV4dCB9LCBcIkxlc3NcIikpXG4gICAgICAgICAgICAgICAgOiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBwcm9wcy50ZXh0LnN1YnN0cmluZygwLCAxNDApICsgJy4uLicpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgeyBjbGFzc05hbWU6ICdtb3JlQnV0dG9uJywgb25DbGljazogaGFuZGxlVG9nZ2xlU2hvd0Z1blRleHQgfSwgXCJNb3JlXCIpKSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICcycHgnXG4gICAgICAgICAgICAgICAgfSwgc2l6ZTogXCJzbWFsbFwiLCB0eXBlOiBcInRleHRcIiwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5DdXN0b21lclNlcnZpY2VPdXRsaW5lZCwgbnVsbCksIG9uQ2xpY2s6IHNwZWFrZXIgfSkpKSk7XG59XG5leHBvcnRzLlNlbGVjdGlvbiA9IFNlbGVjdGlvbjtcbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUG9wdXBDYXJkID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG4vLyBpbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuY29uc3QgcmVhY3RfbWFya2Rvd25fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3QtbWFya2Rvd25cIikpO1xuY29uc3QgcmVtYXJrX2JyZWFrc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZW1hcmstYnJlYWtzXCIpKTtcbmNvbnN0IHJlaHlwZV9yYXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVoeXBlLXJhd1wiKSk7XG5jb25zdCByZW1hcmtfZ2ZtXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlbWFyay1nZm1cIikpO1xuY29uc3QgcmVhY3Rfc3ByaW5nXzEgPSByZXF1aXJlKFwicmVhY3Qtc3ByaW5nXCIpO1xuY29uc3QgY29udGVudF9zY3JpcHRfMSA9IHJlcXVpcmUoXCIuLi9jb250ZW50X3NjcmlwdFwiKTtcbmNvbnN0IE5hdl8xID0gcmVxdWlyZShcIi4uL0NvbXBvbmVudHMvTmF2XCIpO1xuY29uc3QgQ3VzdG9tUHJvbXB0Rm9ybV8xID0gcmVxdWlyZShcIi4uL0NvbXBvbmVudHMvQ3VzdG9tUHJvbXB0Rm9ybVwiKTtcbmNvbnN0IEltYWdlc18xID0gcmVxdWlyZShcIi4uL0NvbXBvbmVudHMvSW1hZ2VzXCIpO1xuY29uc3QgU2VsZWN0aW9uXzEgPSByZXF1aXJlKFwiLi9TZWxlY3Rpb25cIik7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IGljb25zXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7XG5jb25zdCBzZXR0aW5nR3VpZGVfcG5nXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2Fzc2V0cy9zZXR0aW5nR3VpZGUucG5nXCIpKTtcbmNvbnN0IGxvY2FsZV8xID0gcmVxdWlyZShcIi4uL2xpYi9sb2NhbGVcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xubGV0IGN1cnJlbnRMYW5ndWFnZTtcbmxldCB0YXJnZXRMYW5ndWFnZTtcbi8vIC8vIOS9v+eUqOmVv+i/nuaOpVxuLy8gbGV0IHBvcnQgPSBicm93c2VyLnJ1bnRpbWUuY29ubmVjdCh7XG4vLyAgIG5hbWU6ICdmcm9tUG9wdXBDYXJkJ1xuLy8gfSlcbmxldCBhbmtpQ2FyZHM7XG4oMCwgdXRpbF8xLmdldEFua2lDYXJkcykoKS50aGVuKChjYXJkcykgPT4ge1xuICAgIGFua2lDYXJkcyA9IGNhcmRzO1xufSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coZXJyb3IpO1xufSk7XG5jb25zdCB7IFRleHRBcmVhIH0gPSBhbnRkXzEuSW5wdXQ7XG5jb25zdCBBbmtpQ29udGV4dCA9ICgwLCByZWFjdF8xLmNyZWF0ZUNvbnRleHQpKG51bGwpO1xuZnVuY3Rpb24gUG9wdXBDYXJkKHByb3BzKSB7XG4gICAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoW3sgJ2NvbnRlbnQnOiAnJywgJ3JvbGUnOiAndXNlcicsICdsb2FkaW5nJzogZmFsc2UsICdjaGF0SWQnOiAnJywgJ3Byb21wdCc6ICcnLCAnc3RhdHVzJzogJycgfV0pO1xuICAgIGNvbnN0IFtpbWFnZXMsIHNldEltYWdlc10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoW10pO1xuICAgIGNvbnN0IFtzaG93SW1hZ2VzQm94LCBzZXRTaG93SW1hZ2VzQm94XSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3QgW3Byb21wdHMsIHNldFByb21wdHNdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKFtdKTtcbiAgICBjb25zdCBbbGFzdEV4ZWN1dGVkUHJvbXB0LCBzZXRMYXN0RXhlY3V0ZWRQcm9tcHRdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKHsgJ3RpdGxlJzogJ/CfkYnwn4+8IFBsZWFzZSBjaG9vc2UgYSBwcm9tcHQnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBmYWxzZSwgJ3VzZXJQcm9tcHQnOiAnJywgJ2lkJzogJycgfSk7XG4gICAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh0cnVlKTtcbiAgICBjb25zdCBbaXNQb3BvdmVyT3Blbiwgc2V0UG9wb3Zlck9wZW5dID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbY3VzdG9tUHJvbXB0Rm9ybURhdGEsIHNldEN1c3RvbVByb21wdEZvcm1EYXRhXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7ICd0aXRsZSc6ICcnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiBmYWxzZSwgJ3VzZXJQcm9tcHQnOiAnJywgJ2lkJzogJycgfSk7XG4gICAgLy8gc3RhbmRieSxub3JtYWwsbG9hZGluZyxzdWNjZXNzXG4gICAgY29uc3QgW2FkZFRvQW5raVN0YXR1cywgc2V0QWRkVG9BbmtpU3RhdHVzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7ICdzdGF0dXMnOiAnc3RhbmRieScsICdub3RlSWQnOiAwIH0pO1xuICAgIGNvbnN0IFtpc0Fuc3dlckRvbmUsIHNldEFuc3dlckRvbmVdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbaXNBcGlFcnJvLCBzZXRJc0FwaUVycm9dID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbaXNBbnN3ZXJJbnB1dGVkLCBzZXRJc0Fuc3dlcklucHV0ZWRdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICAvLyDnqpflj6Pmi5bmi73pgLvovpFcbiAgICBjb25zdCBbZHJhZ2dpbmcsIHNldERyYWdnaW5nXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmYWxzZSk7XG4gICAgY29uc3Qgd2luZG93RWxlbWVudCA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3QgbWVzc2FnZXNMaXN0ID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICBjb25zdCBpbnB1dFJlZiA9ICgwLCByZWFjdF8xLnVzZVJlZikobnVsbCk7XG4gICAgY29uc3Qgc2hvdWxkU3RheUF0Qm90dG9tUmVmID0gKDAsIHJlYWN0XzEudXNlUmVmKShmYWxzZSk7XG4gICAgY29uc3QgW2Zvcm1dID0gYW50ZF8xLkZvcm0udXNlRm9ybSgpO1xuICAgIGxldCBMYW5nID0gKDAsIGxvY2FsZV8xLnVzZUN1cnJlbnRMYW5ndWFnZSkoKTtcbiAgICBjdXJyZW50TGFuZ3VhZ2UgPSBMYW5nWydjdXJyZW50J11bJ25hbWUnXTtcbiAgICB0YXJnZXRMYW5ndWFnZSA9IExhbmdbJ3RhcmdldCddWyduYW1lJ107XG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd1c2VFZmZlY3QnKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocHJvcHMpO1xuICAgICAgICAvLyDmuLLmn5MgUHJvbXB0IOWIl+ihqFxuICAgICAgICBpbml0aWFsaXplUHJvbXB0TGlzdCgpO1xuICAgICAgICBpZiAocHJvcHMucnVuUHJvbXB0IHx8IHByb3BzLnJ1blByb21wdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyDojrflj5bmnIDov5HkuIDmrKHmiafooYznmoQgUHJvbXB0XG4gICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuZ2V0KHsgXCJsYXN0RXhlY3V0ZWRQcm9tcHRcIjogJycgfSkudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxhc3RFeGVjdXRlZFByb21wdCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5omn6KGM6buY6K6kIFByb21wdOOAgeiOt+WPliBVbnNwbGFzaCDlm77niYdcbiAgICAgICAgICAgICAgICAgICAgZXhlY3V0aXZlUHJvbXB0KHsgJ3RpdGxlJzogJ0RlZmF1bHQnLCAnZ2V0VW5zcGxhc2hJbWFnZXMnOiB0cnVlLCAndXNlclByb21wdCc6IGBXb3JkOlwie3trZXlXb3JkfX1cIiwgc2VudGVuY2U6IFwie3tzZW50ZW5jZX19XCJgLCAnaWQnOiAnRGVmYXVsdCcgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyDmiafooYwgUHJvbXB044CB6I635Y+WIFVuc3BsYXNoIOWbvueJh1xuICAgICAgICAgICAgICAgICAgICBleGVjdXRpdmVQcm9tcHQoaXRlbS5sYXN0RXhlY3V0ZWRQcm9tcHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8g5LiN5omn6KGM5Lu75L2VIFByb21wdO+8jOeUseeUqOaIt+iHquihjOmAieaLqVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+S4jeaJp+ihjOS7u+S9lSBQcm9tcHTvvIznlLHnlKjmiLfoh6rooYzpgInmi6knKTtcbiAgICAgICAgICAgIC8vIOaJp+ihjOm7mOiupCBQcm9tcHTjgIHojrflj5YgVW5zcGxhc2gg5Zu+54mHXG4gICAgICAgICAgICBleGVjdXRpdmVQcm9tcHQoeyAndGl0bGUnOiAnRGVmYXVsdCcsICdnZXRVbnNwbGFzaEltYWdlcyc6IHRydWUsICd1c2VyUHJvbXB0JzogYFdvcmQ6XCJ7e2tleVdvcmR9fVwiLCBzZW50ZW5jZTogXCJ7e3NlbnRlbmNlfX1cImAsICdpZCc6ICdEZWZhdWx0JyB9LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6K6+572u56qX5Y+j55qE6buY6K6k5L2N572u44CB5re75Yqg5rua5Yqo5LqL5Lu277yM6K6p5raI5oGv5YiX6KGo6Ieq5Yqo5rua5Yqo5Yiw5bqV6YOoXG4gICAgICAgICgwLCB1dGlsXzEud2luZG93SW5pdGlhbGl6YXRpb24pKHsgJ2lzUGluJzogcHJvcHMuaXNQaW4sICd3aW5kb3dFbGVtZW50Jzogd2luZG93RWxlbWVudCwgJ3NlbGVjdGlvbic6IHByb3BzLnNlbGVjdGlvbiwgJ21lc3NhZ2VzTGlzdCc6IG1lc3NhZ2VzTGlzdCB9KTtcbiAgICB9LCBbcHJvcHNdKTtcbiAgICAvLyDogYrlpKnorrDlvZXmlLnlj5jml7ZcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgLy8g6K6w5b2V5b2T5YmN5YiX6KGo55qE5L2N572uXG4gICAgICAgIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGFpbmVyJylbMF07XG4gICAgICAgICAgICBzaG91bGRTdGF5QXRCb3R0b21SZWYuY3VycmVudCA9IGNvbnRhaW5lci5zY3JvbGxIZWlnaHQgLSBjb250YWluZXIuc2Nyb2xsVG9wIDw9IGNvbnRhaW5lci5jbGllbnRIZWlnaHQgKyAyMDtcbiAgICAgICAgICAgIC8vIOiHquWKqOa7muWKqOWIsOa2iOaBr+W6lemDqO+8jOaWueS+v+eci+WIsOacgOaWsOeahOaWh+Wtl1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZXNbbWVzc2FnZXMubGVuZ3RoIC0gMV0ubG9hZGluZykge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb0JvdHRvbSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvQm90dG9tKHNob3VsZFN0YXlBdEJvdHRvbVJlZi5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgLy8gICBpZiAoY29udGFpbmVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGNoZWNrSWZTaG91bGRTdGF5QXRCb3R0b20pO1xuICAgICAgICAgICAgLy8gICB9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICB9LCBbbWVzc2FnZXNdKTtcbiAgICAvLyDnqpflj6Pmi5bmi73ml7bop6blj5FcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlTW91c2VNb3ZlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNlVXApO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3VzZUVmZmVjdCByZXR1cm4nKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2VVcCk7XG4gICAgICAgIH07XG4gICAgfSwgW2RyYWdnaW5nXSk7XG4gICAgLy8g5L+d5a2Y5Y6G5Y+y6K6w5b2VXG4gICAgKDAsIHJlYWN0XzEudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIC8vIOWcqCBvcGVuQXBpQW5zZXIg5pu05paw5ZCO5bCG5YW25L+d5a2Y5Yiw5rWP6KeI5Zmo5a2Y5YKo5LitXG4gICAgICAgIC8vIOWPquS/neeVmea2iOaBr+iusOW9leeahOesrCAxIOadoe+8jOWmguaenOi/meadoea2iOWkseaYr+mUmeivr+aPkOekuu+8jOWImeS4jeS/neWtmFxuICAgICAgICBpZiAobWVzc2FnZXMubGVuZ3RoID4gMCAmJiBpc0Fuc3dlckRvbmUgJiYgbWVzc2FnZXNbMF1bJ3N0YXR1cyddICE9PSAnZXJybycpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTYXZlJyk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlcyk7XG4gICAgICAgICAgICBjb25zdCBrZXlXb3JkID0gcHJvcHMuZGF0YS5rZXlXb3JkO1xuICAgICAgICAgICAgY29uc3QgU2VudGVuY2UgPSBwcm9wcy5kYXRhLlNlbnRlbmNlO1xuICAgICAgICAgICAgLy8g5bCG5p+l6K+i6K6w5b2V5L+d5a2Y6LW35p2lXG4gICAgICAgICAgICBjb25zdCBuZXdIaXN0b3J5ID0ge1xuICAgICAgICAgICAgICAgICdrZXlXb3JkJzoga2V5V29yZCxcbiAgICAgICAgICAgICAgICAnc2VudGVuY2UnOiBTZW50ZW5jZSxcbiAgICAgICAgICAgICAgICAncm9sZSc6IG1lc3NhZ2VzWzBdWydyb2xlJ10sXG4gICAgICAgICAgICAgICAgJ2Fuc3dlcic6IG1lc3NhZ2VzWzBdWydjb250ZW50J10sXG4gICAgICAgICAgICAgICAgJ3NvdXJjZSc6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgICAgICdwcm9tcHQnOiBtZXNzYWdlc1swXVsncHJvbXB0J11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoa2V5V29yZCAhPT0gJycgJiYgU2VudGVuY2UgIT09ICcnICYmIG1lc3NhZ2VzWzBdWydjb250ZW50J10gIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLmdldCh7IFwiaGlzdG9yeVwiOiBbXSB9KS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0uaGlzdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdIaXN0b3J5TGlzdCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmluZ28gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbmV3SGlzdG9yeUxpc3QucHVzaChuZXdIaXN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbS5oaXN0b3J5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6c6K6w5b2V5bey5a2Y5Zyo77yM5YiZ5LiN6YeN5aSN5L+d5a2YXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW0uaGlzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBpdGVtLmhpc3RvcnlbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5rZXlXb3JkID09PSBuZXdIaXN0b3J5WydrZXlXb3JkJ10gJiYgb2JqLnNlbnRlbmNlID09PSBuZXdIaXN0b3J5WydzZW50ZW5jZSddICYmIG9iai5wcm9tcHQgPT09IG5ld0hpc3RvcnlbJ3Byb21wdCddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmdvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SGlzdG9yeUxpc3QgPSBpdGVtLmhpc3Rvcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdIaXN0b3J5TGlzdC51bnNoaWZ0KG5ld0hpc3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SGlzdG9yeUxpc3Quc3BsaWNlKDgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobmV3SGlzdG9yeUxpc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghYmluZ28pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5zZXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpc3Rvcnk6IG5ld0hpc3RvcnlMaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgW2lzQW5zd2VyRG9uZV0pO1xuICAgIGNvbnN0IGV4ZWN1dGl2ZVByb21wdCA9IChwcm9tcHQsIHJ1blByb21wdCwgaW1hZ2VUb1JlcmVuZGVyKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSlcbiAgICAgICAgLy8g6K6+572u5Yqg6L2954q25oCBXG4gICAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgICAgbGV0IG5lZWRUb1J1blByb21wdCA9IHJ1blByb21wdDtcbiAgICAgICAgaWYgKG5lZWRUb1J1blByb21wdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBuZWVkVG9SdW5Qcm9tcHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuZWVkVG9SZXJlbmRlckltYWdlID0gaW1hZ2VUb1JlcmVuZGVyO1xuICAgICAgICBpZiAobmVlZFRvUmVyZW5kZXJJbWFnZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBuZWVkVG9SZXJlbmRlckltYWdlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZygnZXhlY3V0aXZlUHJvbXB0OicpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhuZWVkVG9SdW5Qcm9tcHQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9tcHQpO1xuICAgICAgICAvLyBwcm9tcHRSZWYuY3VycmVudCA9IHByb21wdFxuICAgICAgICBjb25zdCBrZXlXb3JkID0gcHJvcHMuZGF0YS5rZXlXb3JkO1xuICAgICAgICBjb25zdCBTZW50ZW5jZSA9IHByb3BzLmRhdGEuU2VudGVuY2U7XG4gICAgICAgIC8vIOWIneWni+WMllxuICAgICAgICBzZXRNZXNzYWdlcyhbXSk7IC8vIOWvueivneWIl+ihqFxuICAgICAgICBpZiAobmVlZFRvUmVyZW5kZXJJbWFnZSkge1xuICAgICAgICAgICAgc2V0SW1hZ2VzKFtdKTsgLy8g5Zu+54mH5YiX6KGoXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb21wdC5nZXRVbnNwbGFzaEltYWdlcyAmJiBuZWVkVG9SdW5Qcm9tcHQpIHtcbiAgICAgICAgICAgIC8vIOWmguaenOW9k+WJjSBQcm9tcHQg6ZyA6KaB5pi+56S65Zu+54mH77yM5LiU5b2T5YmN6ZyA6KaB56uL5Y2z5omn6KGMIFByb21wdFxuICAgICAgICAgICAgc2V0U2hvd0ltYWdlc0JveCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldFNob3dJbWFnZXNCb3goZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZWVkVG9SdW5Qcm9tcHQpIHtcbiAgICAgICAgICAgIC8vIOWcqOa2iOaBr+WOhuWPsuS4reaPkuWFpeaWsOiusOW9lVxuICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IFsuLi5wcmV2TWVzc2FnZXMsIHsgJ2NvbnRlbnQnOiAnJywgJ3JvbGUnOiAnYXNzaXN0YW50JywgJ2xvYWRpbmcnOiB0cnVlLCAnY2hhdElkJzogJycsICdwcm9tcHQnOiAnJywgJ3N0YXR1cyc6ICcnIH1dKTtcbiAgICAgICAgICAgIC8vIOiuvue9ruacgOi/keaJp+ihjOeahCBQcm9tcHRcbiAgICAgICAgICAgIHNldExhc3RFeGVjdXRlZFByb21wdChwcm9tcHQpO1xuICAgICAgICAgICAgLy8g6K6w5b2V5pyA6L+RIDEg5qyh5L2/55So55qEIFByb21wdFxuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLnNldCh7XG4gICAgICAgICAgICAgICAgbGFzdEV4ZWN1dGVkUHJvbXB0OiBwcm9tcHRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8g5aSE55CGIFByb21wdCDkuK3nmoTlj5jph49cbiAgICAgICAgICAgIGxldCBuZXdQcm9tcHQ7XG4gICAgICAgICAgICBsZXQgcCA9IHByb21wdC51c2VyUHJvbXB0O1xuICAgICAgICAgICAgaWYgKHByb21wdC5pZCA9PSAnRGVmYXVsdCcpIHtcbiAgICAgICAgICAgICAgICBwID0gKDAsIHV0aWxfMS5nZXREZWZhdWx0UHJvbXB0KShrZXlXb3JkKVsndXNlclByb21wdCddO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5aSE55CGIFByb21wdCDkuK3nmoTlj5jph49cbiAgICAgICAgICAgIHAgPSB5aWVsZCAoMCwgdXRpbF8xLmhhbmRsZVByb21wdFZhcmlhYmxlcykocCwga2V5V29yZCwgU2VudGVuY2UsIExhbmcpO1xuICAgICAgICAgICAgbmV3UHJvbXB0ID0gW3sgJ3JvbGUnOiAndXNlcicsICdjb250ZW50JzogcCB9XTtcbiAgICAgICAgICAgIC8vIOWmguaenOWOhuWPsuiusOW9leS4reWtmOWcqOiusOW9le+8jOWImeS4jemHjeWkjeivt+axgiBBUEnvvIznm7TmjqXmmL7npLrljoblj7LorrDlvZXnmoTkv6Hmga9cbiAgICAgICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5nZXQoeyBcImhpc3RvcnlcIjogW10gfSkudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgIC8vIOWmguaenOiusOW9leW3suWtmOWcqO+8jOWImeS4jemHjeWkjeS/neWtmFxuICAgICAgICAgICAgICAgIGxldCBiaW5nbyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbS5oaXN0b3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSBpdGVtLmhpc3RvcnlbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmoua2V5V29yZCA9PT0ga2V5V29yZCAmJiBvYmouc2VudGVuY2UgPT09IFNlbnRlbmNlICYmIG9iai5wcm9tcHQgPT09IG5ld1Byb21wdFswXVsnY29udGVudCddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJ3JvbGUnIGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pen54mI5pys5Lit5Zug5Li65rKh5pyJ5a2Y5YKoIHJvbGUg77yM55u05o6l5pi+56S65Y6G5Y+y5pWw5o2u5pe25Lya5a+86Ie05ZCO57ut5rWB56iL5byC5bi4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZ28gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmdvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOebtOaOpeaYvuekuuWOhuWPsuiusOW9leS4reeahOWbnuetlFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0TWVzc2FnZSA9IHByZXZNZXNzYWdlc1twcmV2TWVzc2FnZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlZExhc3RNZXNzYWdlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBsYXN0TWVzc2FnZSksIHsgY2hhdElkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksIHJvbGU6IG9iai5yb2xlLCBjb250ZW50OiBvYmouYW5zd2VyLCBwcm9tcHQ6IG5ld1Byb21wdFswXVsnY29udGVudCddLCBsb2FkaW5nOiBmYWxzZSwgc3RhdHVzOiAnc3VjY2VzcycgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5wcmV2TWVzc2FnZXMuc2xpY2UoMCwgcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDEpLCB1cGRhdGVkTGFzdE1lc3NhZ2VdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0QW5zd2VyRG9uZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWJpbmdvKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOivt+axgiBBSSDmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgZ2V0R1BUTXNnKG5ld1Byb21wdCwga2V5V29yZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwcm9tcHQuaWQgPT0gJ0RlZmF1bHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXlXb3JkLmxlbmd0aCA8PSAyMCAmJiBwcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMgJiYgbmVlZFRvUmVyZW5kZXJJbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5Zu+54mH5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmdldFVuc3BsYXNoSW1hZ2VzKShrZXlXb3JkKS50aGVuKChpbWdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW1hZ2VzKGltZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9tcHQuZ2V0VW5zcGxhc2hJbWFnZXMgJiYgbmVlZFRvUmVyZW5kZXJJbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5Zu+54mH5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmdldFVuc3BsYXNoSW1hZ2VzKShrZXlXb3JkKS50aGVuKChpbWdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW1hZ2VzKGltZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldExhc3RFeGVjdXRlZFByb21wdCh7ICd0aXRsZSc6ICfwn5GJ8J+PvCBQbGVhc2UgY2hvb3NlIGEgcHJvbXB0JywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZmFsc2UsICd1c2VyUHJvbXB0JzogJycsICdpZCc6ICcnIH0pO1xuICAgICAgICAgICAgc2V0QW5zd2VyRG9uZSh0cnVlKTtcbiAgICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBpbml0aWFsaXplUHJvbXB0TGlzdCA9ICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8g6I635Y+W5bey5L+d5a2Y55qEIFByb21wdCBMaXN0XG4gICAgICAgIGNvbnN0IHByb21wdExpc3QgPSB5aWVsZCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2Uuc3luYy5nZXQoeyBcInByb21wdExpc3RcIjogW10gfSkudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucHJvbXB0TGlzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFByb21wdHMocHJvbXB0TGlzdCk7XG4gICAgfSk7XG4gICAgY29uc3QgaGFuZGxlUHJvbXB0RWRpdGVkID0gKGlzTmV3KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOWIneWni+WMliBQcm9tcHQg5YiX6KGoXG4gICAgICAgIGluaXRpYWxpemVQcm9tcHRMaXN0KCk7XG4gICAgICAgIC8vIOabtOaWsOacgOi/keS9v+eUqOeahCBQcm9tcHTvvIjpkojlr7nnvJbovpHnmoTlnLrmma/vvIlcbiAgICAgICAgaWYgKCFpc05ldykge1xuICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLnN5bmMuZ2V0KHsgXCJwcm9tcHRMaXN0XCI6IFtdIH0pLnRoZW4oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW0ucHJvbXB0TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5wcm9tcHRMaXN0W2ldLmlkID09PSBsYXN0RXhlY3V0ZWRQcm9tcHQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOabtOaWsFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TGFzdEV4ZWN1dGVkUHJvbXB0KGl0ZW0ucHJvbXB0TGlzdFtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDorrDlvZXmnIDov5EgMSDmrKHkvb/nlKjnmoQgUHJvbXB0XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnN0b3JhZ2UubG9jYWwuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RXhlY3V0ZWRQcm9tcHQ6IGl0ZW0ucHJvbXB0TGlzdFtpXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8g6K+35rGCIEdQVCDmlbDmja5cbiAgICBjb25zdCBnZXRHUFRNc2cgPSAocHJvbXB0LCBrZXlXb3JkKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOS9v+eUqOmVv+i/nuaOpVxuICAgICAgICBsZXQgcG9ydCA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5jb25uZWN0KHtcbiAgICAgICAgICAgIG5hbWU6ICdmcm9tUG9wdXBDYXJkJ1xuICAgICAgICB9KTtcbiAgICAgICAga2V5V29yZCA9IGtleVdvcmQgfHwgJyc7XG4gICAgICAgIC8vIOiuvue9ruS4uuWbnuetlOS4rVxuICAgICAgICBzZXRBbnN3ZXJEb25lKGZhbHNlKTtcbiAgICAgICAgLy8g56aB55So5L+d5a2Y5YiwIEFua2kg5oyJ6ZKuXG4gICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnc3RhbmRieScsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICAvLyDlnKjmtojmga/ljoblj7LkuK3mj5LlhaXmlrDorrDlvZVcbiAgICAgICAgLy8gc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IFsuLi5wcmV2TWVzc2FnZXMsIHsgJ2NvbnRlbnQnOiAnJywgJ3JvbGUnOiAnYXNzaXN0YW50JywgJ2xvYWRpbmcnOiB0cnVlLCAnY2hhdElkJzogJycsICdwcm9tcHQnOiAnJyB9XSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyDkvb/nlKggcG9zdE1zIOWPkemAgeS/oeaBr1xuICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ2dldEdQVE1zZycsICdtZXNzYWdlcyc6IHByb21wdCwgJ2tleVdvcmQnOiBrZXlXb3JkIH0pO1xuICAgICAgICB9LCAyMCk7XG4gICAgICAgIC8vIOaOpeaUtuS/oeaBr1xuICAgICAgICBwb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihtc2cgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3BvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyJyk7XG4gICAgICAgICAgICBpZiAobXNnLnR5cGUgPT09ICdzZW5kR1BURGF0YScpIHtcbiAgICAgICAgICAgICAgICAvLyDor7fmsYIgR1BUIOaVsOaNruWksei0pVxuICAgICAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09PSAnZXJybycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdHlwZSA9PT0gJ2FzMicgPyBzZXRvcGVuQXBpQW5zZXIyKG1zZy5jb250ZW50KSA6IHNldG9wZW5BcGlBbnNlcihtc2cuY29udGVudClcbiAgICAgICAgICAgICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdub3JtYWwnLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1zZy5jb2RlID09PSAnaW52YWxpZF9hcGlfa2V5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SXNBcGlFcnJvKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbXNnLmNvbnRlbnQgKz0gJ1xcXG4gICAgICAgICAgICBBZnRlciB0aGF0LCB5b3UgbmVlZCB0byBzZXQgdGhlIGNvcnJlY3QgT3BlbiBBUEkgS2V5IGluIHRoZSBTY291dGVyOic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RNZXNzYWdlID0gcHJldk1lc3NhZ2VzW3ByZXZNZXNzYWdlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IG5ld01zZ0xpc3QgPSBsYXN0TWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlZExhc3RNZXNzYWdlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBsYXN0TWVzc2FnZSksIHsgY2hhdElkOiBtc2cuY2hhdElkLCBjb250ZW50OiBtc2cuY29udGVudCwgbG9hZGluZzogZmFsc2UsIHN0YXR1czogJ2Vycm8nLCBwcm9tcHQ6IHByb21wdFswXVsnY29udGVudCddIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgbmV3TXNnTGlzdCA9IFsuLi5wcmV2TWVzc2FnZXMuc2xpY2UoMCwgcHJldk1lc3NhZ2VzLmxlbmd0aCAtIDEpLCBsYXN0TWVzc2FnZV1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbLi4ucHJldk1lc3NhZ2VzLnNsaWNlKDAsIHByZXZNZXNzYWdlcy5sZW5ndGggLSAxKSwgdXBkYXRlZExhc3RNZXNzYWdlXTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNldEFuc3dlckRvbmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzQXBpRXJybykge1xuICAgICAgICAgICAgICAgICAgICBzZXRJc0FwaUVycm8oZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyDor7fmsYIgR1BUIOaVsOaNruaIkOWKn+S4lOaVsOaNrua1gee7k+adn+S8oOi+k1xuICAgICAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09PSAnZW5kJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDorrDlvZXmtojmga/lm57nrZTlrozmr5XvvIjop6blj5Hkv53lrZjljoblj7LorrDlvZXvvIlcbiAgICAgICAgICAgICAgICAgICAgc2V0QW5zd2VyRG9uZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdub3JtYWwnLCAnbm90ZUlkJzogMCB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g6K+35rGCIEdQVCDmlbDmja7miJDlip/kuJTmlbDmja7mtYHlvIDlp4vkvKDovpNcbiAgICAgICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PT0gJ2JlZ2luJykge1xuICAgICAgICAgICAgICAgICAgICAvLyB0eXBlID09PSAnYXMyJyA/IHNldG9wZW5BcGlBbnNlcjIoJycpIDogc2V0b3BlbkFwaUFuc2VyKCcnKVxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYmVnaW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g6K+35rGCIEdQVCDmlbDmja7miJDlip/kuJTmlbDmja7mtYHkvKDovpPkuK1cbiAgICAgICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PT0gJ3Byb2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICBjb25zdCBjb250YWluZXIgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRhaW5lcicpWzBdXG4gICAgICAgICAgICAgICAgICAgIC8vICAgc2hvdWxkU3RheUF0Qm90dG9tUmVmLmN1cnJlbnQgPSBjb250YWluZXIuc2Nyb2xsSGVpZ2h0IC0gY29udGFpbmVyLnNjcm9sbFRvcCA8PSBjb250YWluZXIuY2xpZW50SGVpZ2h0ICsgMjA7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOa4suafk+aVsOaNrlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0TWVzc2FnZSA9IHByZXZNZXNzYWdlc1twcmV2TWVzc2FnZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZNZXNzYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdNc2dMaXN0ID0gbGFzdE1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0NvbnRlbnQgPSBuZXdNc2dMaXN0LmNvbnRlbnQgKyBtc2cuY29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAocHJvbXB0WzBdWydjb250ZW50J10uaW5kZXhPZigne2Fua2lDYXJkc30nKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBuZXdDb250ZW50ID0gaGFuZGxlSGlnaHRsaWdodChuZXdDb250ZW50LCBwcm9wcy5kYXRhLmtleVdvcmQsIGFua2lDYXJkcywgd2luZG93RWxlbWVudD8uY3VycmVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIG5ld0NvbnRlbnQgPSBuZXdDb250ZW50LnJlcGxhY2UobmV3IFJlZ0V4cChwcm9wcy5kYXRhLmtleVdvcmQsICdnaScpLCBgKioke3Byb3BzLmRhdGEua2V5V29yZH0qKmApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbnRlbnQgPSAoMCwgdXRpbF8xLmhhbmRsZUhpZ2h0bGlnaHQpKG5ld0NvbnRlbnQsIHByb3BzLmRhdGEua2V5V29yZCwgYW5raUNhcmRzLCB3aW5kb3dFbGVtZW50ID09PSBudWxsIHx8IHdpbmRvd0VsZW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpbmRvd0VsZW1lbnQuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV3Q29udGVudCA9IG5ld0NvbnRlbnQucmVwbGFjZSgvby9nLCAnPHNwYW4gc3R5bGU9XCJjb2xvcjpyZWQ7XCI+bzwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkTGFzdE1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxhc3RNZXNzYWdlKSwgeyBjaGF0SWQ6IG1zZy5jaGF0SWQsIGNvbnRlbnQ6IG5ld0NvbnRlbnQsIGxvYWRpbmc6IGZhbHNlLCBzdGF0dXM6ICdzdWNjZXNzJywgcHJvbXB0OiBwcm9tcHRbMF1bJ2NvbnRlbnQnXSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBuZXdNc2dMaXN0ID0gWy4uLnByZXZNZXNzYWdlcy5zbGljZSgwLCBwcmV2TWVzc2FnZXMubGVuZ3RoIC0gMSksIGxhc3RNZXNzYWdlXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbLi4ucHJldk1lc3NhZ2VzLnNsaWNlKDAsIHByZXZNZXNzYWdlcy5sZW5ndGggLSAxKSwgdXBkYXRlZExhc3RNZXNzYWdlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyDnlKjmiLflj5HpgIHmtojmga9cbiAgICBjb25zdCBoYW5kbGVTZW5kTWVzc2FnZSA9ICh2YWx1ZXMpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codmFsdWVzKTtcbiAgICAgICAgbGV0IHByb21wdCA9IHZhbHVlcy5tc2c7XG4gICAgICAgIC8vIOa4heepuuaWh+acrOahhlxuICAgICAgICBmb3JtLnJlc2V0RmllbGRzKCk7XG4gICAgICAgIC8vIOemgeeUqOWPkemAgeaMiemSrlxuICAgICAgICBzZXRJc0Fuc3dlcklucHV0ZWQoZmFsc2UpO1xuICAgICAgICAvLyDlsIbnlKjmiLflj5HoqIDlj5HpgIHliLDmtojmga/orrDlvZXkuK1cbiAgICAgICAgc2V0TWVzc2FnZXMocHJldk1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRMYXN0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgY2hhdElkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgY29udGVudDogdmFsdWVzLm1zZyxcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICBwcm9tcHQ6IHByb21wdFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIGNvbnN0IG5ld01zZ0xpc3QgPSBbLi4ucHJldk1lc3NhZ2VzLnNsaWNlKDAsIHByZXZNZXNzYWdlcy5sZW5ndGggLSAxKSwgbGFzdE1lc3NhZ2VdXG4gICAgICAgICAgICByZXR1cm4gWy4uLnByZXZNZXNzYWdlcywgdXBkYXRlZExhc3RNZXNzYWdlXTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOWcqOa2iOaBr+WOhuWPsuS4reaPkuWFpeaWsOiusOW9lVxuICAgICAgICBzZXRNZXNzYWdlcyhwcmV2TWVzc2FnZXMgPT4gWy4uLnByZXZNZXNzYWdlcywgeyAnY29udGVudCc6ICcnLCAncm9sZSc6ICdhc3Npc3RhbnQnLCAnbG9hZGluZyc6IHRydWUsICdjaGF0SWQnOiAnJywgJ3Byb21wdCc6ICcnLCAnc3RhdHVzJzogJycgfV0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlcyk7XG4gICAgICAgIGNvbnN0IG1zZ0hpc3RvcnkgPSBtZXNzYWdlcy5zbGljZSgtNSkubWFwKChpdGVtKSA9PiB7IHJldHVybiB7ICdyb2xlJzogaXRlbS5yb2xlLCAnY29udGVudCc6IGl0ZW0uY29udGVudCB9OyB9KTtcbiAgICAgICAgZ2V0R1BUTXNnKFsuLi5tc2dIaXN0b3J5LCB7IFwicm9sZVwiOiBcInVzZXJcIiwgXCJjb250ZW50XCI6IHZhbHVlcy5tc2cgfV0pO1xuICAgIH07XG4gICAgLy8g5paH5pys5qGG5LiL5pWy5Ye75oyJ6ZSu5pe2XG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyDpmLvmraLkuovku7blhpLms6FcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZUtleURvd24nKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMyAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIC8vIOaVsuWHu+Wbnui9pumUrlxuICAgICAgICAgICAgaWYgKCFpc0xvYWRpbmcgJiYgaXNBbnN3ZXJJbnB1dGVkKSB7XG4gICAgICAgICAgICAgICAgLy8g6Z2e5Yqg6L2954q25oCB44CBR1BUIOa2iOaBr+WPkemAgeWujOavleaXtueUqOaIt+WPr+WPkemAgea2iOaBr1xuICAgICAgICAgICAgICAgIGhhbmRsZVNlbmRNZXNzYWdlKHsgJ21zZyc6IGV2ZW50LnRhcmdldC52YWx1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU1vdXNlRG93biA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnUG9wdXBDYXJkOmhhbmRsZU1vdXNlRG93bicpO1xuICAgICAgICBzZXREcmFnZ2luZyh0cnVlKTtcbiAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQuY3VycmVudCkge1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFggPSBldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WSA9IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgICAgICAgIHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFggPSBTdHJpbmcob2Zmc2V0WCk7XG4gICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRZID0gU3RyaW5nKG9mZnNldFkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldE9mZnNldCh7IHg6IGV2ZW50LmNsaWVudFggLSBwb3NpdGlvbi54LCB5OiBldmVudC5jbGllbnRZIC0gcG9zaXRpb24ueSB9KTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU1vdXNlTW92ZSA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyAvLyBjb25zb2xlLmxvZygnUG9wdXBDYXJkOmhhbmRsZU1vdXNlTW92ZScpO1xuICAgICAgICAvLyAvLyBjb25zb2xlLmxvZyhkcmFnZ2luZyk7XG4gICAgICAgIGlmIChkcmFnZ2luZyAmJiB3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vIFVzZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgdG8gdGhyb3R0bGUgdGhlIG1vdXNlbW92ZSBldmVudCBoYW5kbGluZ1xuICAgICAgICAgICAgLy8g6byg5qCH55u45a+556qX5Y+j5bem5LiK6KeS55qE5YGP56e7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRYID0gcGFyc2VGbG9hdCh3aW5kb3dFbGVtZW50LmN1cnJlbnQuZGF0YXNldC5vZmZzZXRYIHx8ICcnKTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFkgPSBwYXJzZUZsb2F0KHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFkgfHwgJycpO1xuICAgICAgICAgICAgY29uc3QgbmV3WCA9IGV2ZW50LmNsaWVudFggLSBvZmZzZXRYO1xuICAgICAgICAgICAgY29uc3QgbmV3WSA9IGV2ZW50LmNsaWVudFkgLSBvZmZzZXRZO1xuICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIGJvdW5kYXJpZXNcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50V2lkdGggPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gd2luZG93RWxlbWVudC5jdXJyZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IG1pblggPSAtZWxlbWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGNvbnN0IG1pblkgPSAwO1xuICAgICAgICAgICAgY29uc3QgbWF4WCA9IHdpbmRvd1dpZHRoIC0gZWxlbWVudFdpZHRoICsgZWxlbWVudFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGNvbnN0IG1heFkgPSB3aW5kb3dIZWlnaHQgLSBlbGVtZW50SGVpZ2h0ICsgZWxlbWVudEhlaWdodCAvIDEuNTtcbiAgICAgICAgICAgIGNvbnN0IGNsYW1wZWRYID0gTWF0aC5tYXgobWluWCwgTWF0aC5taW4obmV3WCwgbWF4WCkpO1xuICAgICAgICAgICAgY29uc3QgY2xhbXBlZFkgPSBNYXRoLm1heChtaW5ZLCBNYXRoLm1pbihuZXdZLCBtYXhZKSk7XG4gICAgICAgICAgICAvLyBPbmx5IHVwZGF0ZSB0aGUgcG9zaXRpb24gaWYgaXQncyB3aXRoaW4gdGhlIGJvdW5kYXJpZXNcbiAgICAgICAgICAgIC8vIG5ld1ggPj0gbWluWCAmJiBuZXdYIDw9IG1heFggJiYgbmV3WSA+PSBtaW5ZICYmIG5ld1kgPD0gbWF4WVxuICAgICAgICAgICAgaWYgKHRydWUpIHtcbiAgICAgICAgICAgICAgICAvLyBzZXRQb3NpdGlvbih7IHg6IGNsYW1wZWRYLCB5OiBjbGFtcGVkWSB9KTtcbiAgICAgICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuc3R5bGUubGVmdCA9IGAke2NsYW1wZWRYfXB4YDtcbiAgICAgICAgICAgICAgICB3aW5kb3dFbGVtZW50LmN1cnJlbnQuc3R5bGUudG9wID0gYCR7Y2xhbXBlZFl9cHhgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5YWD57Sg5Yiw6L6+6L6555WMXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgcmVjdCA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBvZmZzZXRYID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBvZmZzZXRZID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICAgICAgICAgIC8vIHdpbmRvd0VsZW1lbnQuY3VycmVudC5kYXRhc2V0Lm9mZnNldFggPSBTdHJpbmcob2Zmc2V0WCk7XG4gICAgICAgICAgICAgICAgLy8gd2luZG93RWxlbWVudC5jdXJyZW50LmRhdGFzZXQub2Zmc2V0WSA9IFN0cmluZyhvZmZzZXRZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlTW91c2VVcCA9ICgpID0+IHtcbiAgICAgICAgLy8gLy8gY29uc29sZS5sb2coJ1BvcHVwQ2FyZDpoYW5kbGVNb3VzZVVwJyk7XG4gICAgICAgIHNldERyYWdnaW5nKGZhbHNlKTtcbiAgICB9O1xuICAgIC8vIOaWh+acrOahhuWAvOWPmOWMluaXtlxuICAgIGNvbnN0IG9uVGV4dEFyZWFJbnB1dCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNldElzQW5zd2VySW5wdXRlZCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldElzQW5zd2VySW5wdXRlZChmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIOa3u+WKoOWIsCBBbmtpXG4gICAgY29uc3QgYWRkVG9BbmtpID0gKGRlY2tOYW1lLCBtb2RlbE5hbWUsIGZyb250LCBiYWNrKSA9PiB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3Qga2V5V29yZCA9IHByb3BzLmRhdGEua2V5V29yZDtcbiAgICAgICAgY29uc3QgU2VudGVuY2UgPSBwcm9wcy5kYXRhLlNlbnRlbmNlO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gJyc7XG4gICAgICAgIGxldCBpbWFnZXMgPSAnJztcbiAgICAgICAgbGV0IHVuc3BsYXNoX2Rvd25sb2FkX2xvY2F0aW9uO1xuICAgICAgICBjb25zdCBzdGMgPSBrZXlXb3JkLmxlbmd0aCA8PSAyMCA/IFNlbnRlbmNlIDogJyc7XG4gICAgICAgIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdpbmRvd0VsZW1lbnQuY3VycmVudCk7XG4gICAgICAgICAgICBjb250YWluZXIgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgY29udGFpbmVyID0gd2luZG93RWxlbWVudC5jdXJyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lc3NhZ2VzJylbMF0uaW5uZXJIVE1MO1xuICAgICAgICAgICAgLy8g5aSE55CG5qC35byP77yM6YG/5YWNIEFua2kg5YaF5pi+56S65byC5bi4XG4gICAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXIucmVwbGFjZSgvc3R5bGU9L2csICcnKTtcbiAgICAgICAgICAgIGlmICh3aW5kb3dFbGVtZW50LmN1cnJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VCb3gnKVswXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VzID0gd2luZG93RWxlbWVudC5jdXJyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlQm94JylbMF0uaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgIC8vIOiOt+WPliB1bnNwbGFzaEFwaSDnmoQgZG93bmxvYWRfbG9jYXRpb25cbiAgICAgICAgICAgICAgICB1bnNwbGFzaF9kb3dubG9hZF9sb2NhdGlvbiA9IChfYSA9IHdpbmRvd0VsZW1lbnQuY3VycmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXMnKVswXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0ucGFyZW50RWxlbWVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEF0dHJpYnV0ZSgnZGF0YS1kb3dubG9hZGxvY2F0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpbWFnZXMpO1xuICAgICAgICAgICAgLy8g5aSE55CG5qC35byP77yM6YG/5YWNIEFua2kg5YaF5pi+56S65byC5bi4XG4gICAgICAgICAgICBpbWFnZXMgPSBpbWFnZXMucmVwbGFjZSgvc3R5bGU9L2dpLCAnJyk7XG4gICAgICAgICAgICBpbWFnZXMgPSBpbWFnZXMucmVwbGFjZSgvd2lkdGgvZ2ksICcnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjYXJkU3R5bGUgPSBgPHN0eWxlPlxuXG4gICAgLnNlbnRlbmNle1xuICAgICAgb3BhY2l0eTowLjY1O1xuICAgIH1cblxuICAgIHRhYmxlIHtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gICAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICAgICAgbWFyZ2luOjA7XG4gICAgICBwYWRkaW5nOjA7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG4gICAgdGFibGUgdHIge1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgICAgIHBhZGRpbmc6IDVweDtcbiAgICB9XG4gICAgdGFibGUgdGgsIHRhYmxlIHRkIHtcbiAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIH1cbiAgICB0YWJsZSB0aCB7XG4gICAgICBsZXR0ZXItc3BhY2luZzogMXB4O1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICB9XG4gICAgPC9zdHlsZT5cbiAgICBgO1xuICAgICAgICAvLyDor7fmsYIgYmFja2dyb3VuZCDlsIbmlbDmja7kv53lrZjliLAgQW5raVxuICAgICAgICBjb25zdCBwID0ge1xuICAgICAgICAgICAgXCJub3RlXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlY2tOYW1lXCI6IGRlY2tOYW1lLFxuICAgICAgICAgICAgICAgIFwibW9kZWxOYW1lXCI6IG1vZGVsTmFtZSxcbiAgICAgICAgICAgICAgICBcImZpZWxkc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFtmcm9udF06IGtleVdvcmQsXG4gICAgICAgICAgICAgICAgICAgIFtiYWNrXTogY2FyZFN0eWxlICsgJzxwIGNsYXNzPVwic2VudGVuY2VcIj4nICsgc3RjICsgJzwvcD4nICsgaW1hZ2VzICsgY29udGFpbmVyICsgJzxhIGhyZWY9XCInICsgd2luZG93LmxvY2F0aW9uLmhyZWYgKyAnXCI+U291cmNlPC9hPidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwidGFnc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiU2NvdXRlclwiXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvLyDlj5HpgIHmtojmga/nu5kgYmFja2dyb3VuZFxuICAgICAgICBsZXQgc2VuZGluZyA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2FkZE5vdGUnLCAnbWVzc2FnZXMnOiB7ICdhbmtpX2FyZ3VtZW50cyc6IHAsICdhbmtpX2FjdGlvbl90eXBlJzogJ2FkZE5vdGUnLCAndW5zcGxhc2hfZG93bmxvYWRfbG9jYXRpb24nOiB1bnNwbGFzaF9kb3dubG9hZF9sb2NhdGlvbiB9LCB9KTtcbiAgICAgICAgc2VuZGluZy50aGVuKGhhbmRsZVJlc3BvbnNlLCBoYW5kbGVFcnJvcik7XG4gICAgfTtcbiAgICAvLyDngrnlh7vkv53lrZjliLAgQW5raVxuICAgIGNvbnN0IGhhbmRsZVNhdmVUb0Fua2lCdG5DbGljayA9ICgpID0+IHtcbiAgICAgICAgc2V0QWRkVG9BbmtpU3RhdHVzKHsgJ3N0YXR1cyc6ICdsb2FkaW5nJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgIC8vIOWFiOmihOWkhOeQhiBBbmtpIOeahCBtb2RlbFxuICAgICAgICBsZXQgc2VuZGluZyA9IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ3NldE1vZGVsJywgJ21lc3NhZ2VzJzoge30sIH0pO1xuICAgICAgICBzZW5kaW5nLnRoZW4oKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnJlc3VsdCA9PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAvLyDmt7vliqDliLAgQW5raSDkuK1cbiAgICAgICAgICAgICAgICBhZGRUb0Fua2kobWVzc2FnZS5kYXRhLmRlZmF1bHREZWNrTmFtZSwgbWVzc2FnZS5kYXRhLm1vZGVsTmFtZSwgbWVzc2FnZS5kYXRhLmZpZWxkMSwgbWVzc2FnZS5kYXRhLmZpZWxkMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDlj43ppojplJnor6/kv6Hmga9cbiAgICAgICAgICAgICAgICBhbGVydChtZXNzYWdlLmVycm9yKTtcbiAgICAgICAgICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAvL2Vycm9yXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy8g5o6l5pS2IGJhY2tncm91bmQg55qE5Zue5aSNXG4gICAgZnVuY3Rpb24gaGFuZGxlUmVzcG9uc2UobWVzc2FnZSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UuZXJyb3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnc3VjY2VzcycsICdub3RlSWQnOiBtZXNzYWdlLmRhdGEgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhbGVydChtZXNzYWdlLmVycm9yKTtcbiAgICAgICAgICAgIHNldEFkZFRvQW5raVN0YXR1cyh7ICdzdGF0dXMnOiAnbm9ybWFsJywgJ25vdGVJZCc6IDAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaGFuZGxlRXJyb3IoZXJybykge1xuICAgICAgICBzZXRBZGRUb0Fua2lTdGF0dXMoeyAnc3RhdHVzJzogJ25vcm1hbCcsICdub3RlSWQnOiAwIH0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnJvKTtcbiAgICB9XG4gICAgLy8gR1BUIOeUn+aIkOa2iOaBr+aXtu+8jOiHquWKqOWumuS9jeWIsOa2iOaBr+WIl+ihqOW6lemDqO+8jOaWueS+v+eUqOaIt+mYheivu1xuICAgIGZ1bmN0aW9uIHNjcm9sbFRvQm90dG9tKGNhblNyb2xsID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHdpbmRvd0VsZW1lbnQuY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2luZG93RWxlbWVudC5jdXJyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250YWluZXInKVswXTtcbiAgICAgICAgICAgIC8vIGNvbnN0IGlzQXRCb3R0b20gPSBjb250YWluZXIuc2Nyb2xsSGVpZ2h0IC0gY29udGFpbmVyLnNjcm9sbFRvcCA8PSBjb250YWluZXIuY2xpZW50SGVpZ2h0ICsgMTQ7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaXNBdEJvdHRvbSA9PT09PT0gJyk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjYW5Tcm9sbCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpc0F0Qm90dG9tKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbnRhaW5lci5zY3JvbGxIZWlnaHQpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY29udGFpbmVyLnNjcm9sbFRvcCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjb250YWluZXIuY2xpZW50SGVpZ2h0KTtcbiAgICAgICAgICAgIGlmIChjYW5Tcm9sbCkge1xuICAgICAgICAgICAgICAgIC8vIOS9jeS6juW6lemDqO+8jOmcgOimgeiHquWKqOa7muWKqFxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGNoaWxkRWxlbWVudHMgPSB3aW5kb3dFbGVtZW50LmN1cnJlbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lc3NhZ2VzID4gOmxhc3QtY2hpbGQnKTtcbiAgICAgICAgICAgICAgICAvLyBpZiAoY2hpbGRFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gICBjb25zdCBsYXN0Q2hpbGRFbGVtZW50ID0gY2hpbGRFbGVtZW50c1tjaGlsZEVsZW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIC8vICAgbGFzdENoaWxkRWxlbWVudC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBjb250YWluZXIuc2Nyb2xsVG9wID0gY29udGFpbmVyLnNjcm9sbEhlaWdodCArIDIwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IG9wZW5DdXN0b21Qcm9tcHRGb3JtID0gKGRhdGEpID0+IHtcbiAgICAgICAgLy8g5byA5ZCv5oiW5YWz6Zet6Ieq5a6a5LmJIFByb21wdCDooajljZVcbiAgICAgICAgc2V0UG9wb3Zlck9wZW4oZGF0YS5pc09wZW4pO1xuICAgICAgICAvLyDorr7nva7ooajljZXnmoTpu5jorqTorr7nva5cbiAgICAgICAgaWYgKGRhdGEuaXNPcGVuKSB7XG4gICAgICAgICAgICBzZXRDdXN0b21Qcm9tcHRGb3JtRGF0YShkYXRhLmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOW8gOWQr+ihqOWNleWQjuemgeatoueCueWHu+eql+WPo+WkluWMuuWfn+WFs+mXreeql+WPo1xuICAgICAgICAoMCwgY29udGVudF9zY3JpcHRfMS5zZXREb25vdENsb3NlUG9wdXBDYXJkKShkYXRhLmlzT3Blbik7XG4gICAgfTtcbiAgICBjb25zdCBBbmltYXRlZEJ1dHRvbiA9ICgwLCByZWFjdF9zcHJpbmdfMS5hbmltYXRlZCkoYW50ZF8xLkJ1dHRvbik7XG4gICAgY29uc3QgYW5pbWF0aW9uU3R5bGUgPSAoMCwgcmVhY3Rfc3ByaW5nXzEudXNlU3ByaW5nKSh7XG4gICAgICAgIGZyb206IHsgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJyB9LFxuICAgICAgICB0bzogeyB0cmFuc2Zvcm06ICdyb3RhdGUoMzYwZGVnKScgfSxcbiAgICAgICAgY29uZmlnOiB7IGR1cmF0aW9uOiAxMDAwIH0sXG4gICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgIHdpZHRoOiAnMzJweCcsXG4gICAgICAgIGhlaWdodDogJzMycHgnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgcmVkJ1xuICAgIH0pO1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBcIkxlYXJuaW5nRW5nbGlzaDIwMjNcIiwgcmVmOiB3aW5kb3dFbGVtZW50LCBzdHlsZToge1xuICAgICAgICAgICAgICAgIGxlZnQ6IDEwLFxuICAgICAgICAgICAgICAgIHRvcDogMTAsXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQ29uZmlnUHJvdmlkZXIsIHsgdGhlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yUHJpbWFyeTogJyNGMDhBMjQnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChOYXZfMS5OYXYsIHsgaGFuZGxlU2F2ZVRvQW5raUJ0bkNsaWNrOiBoYW5kbGVTYXZlVG9BbmtpQnRuQ2xpY2ssIGFkZFRvQW5raVN0YXR1czogYWRkVG9BbmtpU3RhdHVzLCBvbk1vdXNlRG93bjogaGFuZGxlTW91c2VEb3duLCBoYW5kbGVNZW51SXRlbUNsaWNrOiBleGVjdXRpdmVQcm9tcHQsIG9wZW5DdXN0b21Qcm9tcHRGb3JtOiBvcGVuQ3VzdG9tUHJvbXB0Rm9ybSwgdGl0bGU6ICdTY291dGVyJywgcHJvbXB0czogcHJvbXB0cywgbGFzdEV4ZWN1dGVkUHJvbXB0OiBsYXN0RXhlY3V0ZWRQcm9tcHQgfSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdjb250YWluZXIgZmxleC1ncm93IGZsZXggZmxleC1jb2wgb3ZlcmZsb3ctYXV0bycgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdmbGV4LWdyb3cnLCByZWY6IG1lc3NhZ2VzTGlzdCwgc3R5bGU6IHsgcGFkZGluZ1RvcDogJzU0cHgnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFNlbGVjdGlvbl8xLlNlbGVjdGlvbiwgeyB0ZXh0OiBwcm9wcy5kYXRhLmtleVdvcmQgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93SW1hZ2VzQm94ICYmIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEltYWdlc18xLkltYWdlcywgeyBpbWFnZXM6IGltYWdlcywga2V5V29yZDogcHJvcHMuZGF0YS5rZXlXb3JkLCBnZXRVbnNwbGFzaEltYWdlczogKGtleVdvcmQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKDAsIHV0aWxfMS5nZXRVbnNwbGFzaEltYWdlcykoa2V5V29yZCkudGhlbigoaW1ncykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW1hZ2VzKGltZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdtZXNzYWdlcycsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcyOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29yZFdyYXA6ICdicmVhay13b3JkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAnMC40ZW0gMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGtleTogaXRlbS5jaGF0SWQsIGNsYXNzTmFtZTogJycsIHN0eWxlOiBpdGVtLnJvbGUgPT09ICd1c2VyJyA/IHsgYmFja2dyb3VuZENvbG9yOiAnI0Y2RjZGNicsIHBhZGRpbmdUb3A6ICcycHgnLCBwYWRkaW5nQm90dG9tOiAnMnB4JyB9IDoge30gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Ta2VsZXRvbiwgeyBsb2FkaW5nOiBpdGVtLmxvYWRpbmcsIGFjdGl2ZTogdHJ1ZSwgdGl0bGU6IGZhbHNlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfbWFya2Rvd25fMS5kZWZhdWx0LCB7IHJlbWFya1BsdWdpbnM6IFtyZW1hcmtfYnJlYWtzXzEuZGVmYXVsdCwgcmVtYXJrX2dmbV8xLmRlZmF1bHRdLCByZWh5cGVQbHVnaW5zOiBbcmVoeXBlX3Jhd18xLmRlZmF1bHRdLCBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZTogKF9hKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHsgbm9kZSB9ID0gX2EsIHByb3BzID0gX19yZXN0KF9hLCBbXCJub2RlXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyBvdmVyZmxvd1g6ICdzY3JvbGwnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiLCBPYmplY3QuYXNzaWduKHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ21heC1jb250ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogJzYyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkICNjY2NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgcHJvcHMpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHNraXBIdG1sOiBmYWxzZSwgY2hpbGRyZW46IGl0ZW0uY29udGVudCB9KSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQXBpRXJybyA/IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBzcmM6IHNldHRpbmdHdWlkZV9wbmdfMS5kZWZhdWx0LCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSkpIDogJycpKSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICd3LWZ1bGwnLCByZWY6IGlucHV0UmVmLCBzdHlsZTogeyBib3JkZXJUb3A6ICcxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMDYpJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLCB7IGZvcm06IGZvcm0sIG9uRmluaXNoOiBoYW5kbGVTZW5kTWVzc2FnZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbktleURvd249e2hhbmRsZUZvcm1LZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0OiAnaW5saW5lJywgc3R5bGU6IHsgYWxpZ25JdGVtczogJ2NlbnRlcicgfSwgY2xhc3NOYW1lOiAncC0yJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBuYW1lOiBcIm1zZ1wiLCBzdHlsZTogeyBtYXJnaW46ICcwJywgZmxleEdyb3c6ICcxJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHsgcGxhY2Vob2xkZXI6IFwiU2VuZCBhIG1lc3NhZ2VcIiwgYm9yZGVyZWQ6IGZhbHNlLCBhdXRvU2l6ZTogeyBtaW5Sb3dzOiAxLCBtYXhSb3dzOiAyIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldENvbG9yOiAnI0YwOEEyNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9uS2V5RG93bjogaGFuZGxlS2V5RG93biwgb25JbnB1dDogb25UZXh0QXJlYUlucHV0IH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5Gb3JtLkl0ZW0sIHsgc3R5bGU6IHsgbWFyZ2luUmlnaHQ6ICcwJyB9IH0sIGlzQW5zd2VyRG9uZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkJ1dHRvbiwgeyB0eXBlOiBcInRleHRcIiwgaHRtbFR5cGU6IFwic3VibWl0XCIsIGRpc2FibGVkOiBpc0xvYWRpbmcgfHwgIWlzQW5zd2VySW5wdXRlZCwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICFpc0xvYWRpbmcgJiYgaXNBbnN3ZXJJbnB1dGVkID8gJyNGMDhBMjQnIDogJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5TZW5kT3V0bGluZWQsIG51bGwpIH0pIDogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyBtYXJnaW5SaWdodDogJzhweCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0X3NwcmluZ18xLmFuaW1hdGVkLmRpdiwgeyBzdHlsZTogYW5pbWF0aW9uU3R5bGUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoaWNvbnNfMS5Mb2FkaW5nT3V0bGluZWQsIG51bGwpKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkZvcm0uSXRlbSwgeyBzdHlsZTogeyBtYXJnaW46ICcwJyB9IH0pKSksXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoYW50ZF8xLkRyYXdlciwgeyB0aXRsZTogY3VzdG9tUHJvbXB0Rm9ybURhdGEuaWQgPT09ICcnID8gXCJDcmVhdGUgUHJvbXB0XCIgOiBcIkVkaXQgUHJvbXB0XCIsIHBsYWNlbWVudDogXCJib3R0b21cIiwgY2xvc2FibGU6IGZhbHNlLCBoZWlnaHQ6ICcxMDAlJywgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogaXNQb3BvdmVyT3BlbiwgZ2V0Q29udGFpbmVyOiBmYWxzZSwgZXh0cmE6IHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5TcGFjZSwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7IHpJbmRleDogJzknIH0sIG9uQ2xpY2s6ICgpID0+IG9wZW5DdXN0b21Qcm9tcHRGb3JtKHsgaXNPcGVuOiBmYWxzZSwgZGF0YTogeyAndGl0bGUnOiAnJywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogZmFsc2UsICd1c2VyUHJvbXB0JzogJycsICdpZCc6ICcnIH0gfSkgfSwgXCJDYW5jZWxcIikpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJhY2tncm91bmRDb2xvcjogJ3JlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICc2NHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAnYWxsLXNjcm9sbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBvbk1vdXNlRG93bjogaGFuZGxlTW91c2VEb3duIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoQ3VzdG9tUHJvbXB0Rm9ybV8xLkN1c3RvbVByb21wdEZvcm0sIHsgb3BlbkN1c3RvbVByb21wdEZvcm06IG9wZW5DdXN0b21Qcm9tcHRGb3JtLCBoYW5kbGVQcm9tcHRFZGl0ZWQ6IGhhbmRsZVByb21wdEVkaXRlZCwgZGF0YTogY3VzdG9tUHJvbXB0Rm9ybURhdGEgfSkpKSkpKSk7XG59XG5leHBvcnRzLlBvcHVwQ2FyZCA9IFBvcHVwQ2FyZDtcbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5wb3B1cENhcmRTdHlsZSA9IHZvaWQgMDtcbmV4cG9ydHMucG9wdXBDYXJkU3R5bGUgPSBgXG4uc2xpY2stYXJyb3c6OmJlZm9yZXtcbiAgY29udGVudDpcIlwiICFpbXBvcnRhbnQ7XG59XG5cbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLXByZXYsXG4uYW50LWNhcm91c2VsIC5zbGljay1uZXh0LFxuLmFudC1jYXJvdXNlbCAuc2xpY2stcHJldjpob3Zlcixcbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLW5leHQ6aG92ZXIge1xuICBmb250LXNpemU6IGluaGVyaXQ7XG4gIGNvbG9yOiBjdXJyZW50Q29sb3I7XG59XG5cbi5hbnQtY2Fyb3VzZWwgLnNsaWNrLXByZXYsXG4uYW50LWNhcm91c2VsIC5zbGljay1wcmV2OmhvdmVyIHtcbiAgbGVmdDogMTBweDtcbiAgei1pbmRleDogMjtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uYW50LWNhcm91c2VsIC5zbGljay1uZXh0LFxuLmFudC1jYXJvdXNlbCAuc2xpY2stbmV4dDpob3ZlciB7XG4gIHJpZ2h0OiAxMHB4O1xuICB6LWluZGV4OiAyO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5pbWFnZXMgaW1nIHtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbn1cblxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyBoMSwjTGVhcm5pbmdFbmdsaXNoMjAyMyBoMiwjTGVhcm5pbmdFbmdsaXNoMjAyMyBoM3tcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIGgxe1xuICBmb250LXNpemU6MjBweDtcbn1cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIGgye1xuICBmb250LXNpemU6MTdweDtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMge1xuZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG53aWR0aDogMzkwcHg7XG5oZWlnaHQ6IDU2MHB4O1xuY29sb3I6IHJnYigwIDAgMCAvIDgwJSk7XG5wb3NpdGlvbjogZml4ZWQ7XG5kaXNwbGF5OiBmbGV4O1xuZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbmZvbnQtc2l6ZTogMTMuMnB4O1xuYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbnotaW5kZXg6IDk5OTk7XG5vdmVyZmxvdzogaGlkZGVuO1xuYm94LXNoYWRvdzogMHB4IDhweCAyOHB4IHJnYmEoMCwwLDAsLjE2KTtcbmJvcmRlci1yYWRpdXM6IDZweDtcbmJvcmRlcjoxcHggc29saWQgcmdiYSg1LCA1LCA1LCAuMDYpXG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5jb250YWluZXI6Oi13ZWJraXQtc2Nyb2xsYmFyICB7XG4gIHdpZHRoOjBweDtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLmNvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sgIHtcbiAgYmFja2dyb3VuZDogI2ZmZjsgLyog6K6+572u5rua5Yqo5p2h6L2o6YGT6IOM5pmv6ImyICovXG59XG5cbi8vICNMZWFybmluZ0VuZ2xpc2gyMDIzIC5jb250YWluZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbi8vICAgYmFja2dyb3VuZDogIzg4ODsgLyog6K6+572u5rua5Yqo5p2h5ruR5Z2X6IOM5pmv6ImyICovXG4vLyB9XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5Ecm9wZG93bk1lbnVJdGVtOmhvdmVyIHtcbiAgXG4gIGJhY2tncm91bmQtY29sb3I6I0Y2RjZGNjtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLkRyb3Bkb3duTWVudUl0ZW06Zm9jdXMtdmlzaWJsZSB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIGgxLCNMZWFybmluZ0VuZ2xpc2gyMDIzIGgyLCNMZWFybmluZ0VuZ2xpc2gyMDIzIGgzIHtcblxuICBjb2xvcjogcmdiYSgwLCAwLCAwKTtcblxufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAjU2NvdXRlck5hdiwjTGVhcm5pbmdFbmdsaXNoMjAyMyAuaW1hZ2VzLCNMZWFybmluZ0VuZ2xpc2gyMDIzICNTY291dGVyU2VsZWN0aW9uLCAjTGVhcm5pbmdFbmdsaXNoMjAyMyAubWVzc2FnZXM+ZGl2ICB7XG4gIHBhZGRpbmctbGVmdDoxOHB4O1xuICBwYWRkaW5nLXJpZ2h0OjE4cHg7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5vcGVuQUlBbnN3ZXIge1xubGluZS1oZWlnaHQ6IDMwcHg7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC51c2VySW5wdXQge1xubWFyZ2luOiAxMHB4IDA7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5jb250ZW50Qm94IHtcbm92ZXJmbG93OiBzY3JvbGw7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5tZXNzYWdlcyA+ICogPiAqIHtcbiAgbWFyZ2luOiAwLjdlbSAwO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAjU2NvdXRlck5hdiB7XG5kaXNwbGF5OiBmbGV4O1xuanVzdGlmeS1jb250ZW50OiBzdGFydDtcbmFsaWduLWl0ZW1zOiBjZW50ZXI7XG5wYWRkaW5nLXRvcDogMTBweDtcbnBhZGRpbmctYm90dG9tOiAxMHB4O1xuYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoNSwgNSwgNSwgLjA2KTtcbnVzZXItc2VsZWN0OiBub25lO1xufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAjU2NvdXRlck5hdiBpbWcge1xud2lkdGg6IGF1dG87XG5oZWlnaHQ6IDI0cHg7XG5tYXJnaW4tcmlnaHQ6IDZweDtcbn1cblxuLm1lc3NhZ2VzIHVse1xuICBsaXN0LXN0eWxlOmRpc2M7XG4gIHBhZGRpbmctbGVmdDogMjBweDtcbn1cblxuLm1lc3NhZ2VzIG9se1xuICBsaXN0LXN0eWxlOmF1dG87XG4gIHBhZGRpbmctbGVmdDogMjBweDtcbn1cblxuI0xlYXJuaW5nRW5nbGlzaDIwMjMgLmlzUGluIHBhdGh7XG4gIGZpbGw6ICNGMDhBMjQ7XG59XG5cbiNMZWFybmluZ0VuZ2xpc2gyMDIzIC5yaWdodEJ0bkJveCBidXR0b24ge1xuXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxufVxuXG4jTGVhcm5pbmdFbmdsaXNoMjAyMyAucmlnaHRCdG5Cb3ggYnV0dG9uIHNwYW46bGFzdC1vZi10eXBle1xuICBcbn1cblxudGFibGUgdHIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBwYWRkaW5nOiA1cHg7XG59XG50YWJsZSB0aCwgdGFibGUgdGQge1xuICBwYWRkaW5nOiAxMHB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxudGFibGUgdGgge1xuICAvLyBmb250LXNpemU6IDE0cHg7XG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi8vIC8qIOa7muWKqOadoeS7peWPiua7muWKqOadoei9qOmBk+eahOWuveW6piAqL1xuLy8gOjotd2Via2l0LXNjcm9sbGJhciB7XG4vLyAgICAgd2lkdGg6IDEwcHg7XG4vLyB9XG5cbi8vIC8qIOa7muWKqOadoei9qOmBk+eahOagt+W8jyovXG4vLyA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICBcbi8vIH1cblxuLy8gLyog5rua5Yqo5p2h55qE5qC35byPICovXG4vLyA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbi8vICAgICBiYWNrZ3JvdW5kOiAjODg4OyBcbi8vIH1cblxuLy8gLyog5b2T5L2g6byg5qCH5oKs5YGc5Zyo5rua5Yqo5p2h5LiK5pe255qE5qC35byPICovXG4vLyA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHtcbi8vICAgICBiYWNrZ3JvdW5kOiAjNTU1OyBcbi8vIH1cblxuLyog5rua5Yqo5p2hICovXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvcml6b250YWwgeyAvKuawtOW5s+a7muWKqOadoeeahOagt+W8jyovXG4gIHdpZHRoOiA0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNDQ0NDQ0M7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNnB4O1xufVxuOjotd2Via2l0LXNjcm9sbGJhci10cmFjay1waWVjZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7IC8q5rua5Yqo5p2h55qE6IOM5pmv6aKc6ImyKi9cbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAwOyAvKua7muWKqOadoeeahOWchuinkuWuveW6piovXG59XG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgd2lkdGg6IDEwcHg7IC8q5rua5Yqo5p2h55qE5a695bqmKi9cbiAgaGVpZ2h0OiA4cHg7IC8q5rua5Yqo5p2h55qE6auY5bqmKi9cbn1cbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6dmVydGljYWwgeyAvKuWeguebtOa7muWKqOadoeeahOagt+W8jyovXG4gIGhlaWdodDogNTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzk5OTtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA0cHg7XG4gIG91dGxpbmU6IDJweCBzb2xpZCAjZmZmO1xuICBvdXRsaW5lLW9mZnNldDogLTJweDtcbiAgYm9yZGVyOiAycHggc29saWQgI2ZmZjtcbn1cbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIgeyAvKua7muWKqOadoeeahGhvdmVy5qC35byPKi9cbiAgaGVpZ2h0OiA1MHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWY5ZjlmO1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxucHJlIHtcbmJhY2tncm91bmQtY29sb3I6ICNmMGYwZjA7XG5ib3JkZXItcmFkaXVzOiA1cHg7XG5wYWRkaW5nOiAxNXB4O1xuYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbmNvbG9yOiAjMzMzO1xuZm9udC1mYW1pbHk6IENvdXJpZXIsIG1vbm9zcGFjZTtcbmxpbmUtaGVpZ2h0OiAxLjI7XG5vdmVyZmxvdy14OiBhdXRvO1xud2hpdGUtc3BhY2U6IHByZTtcbn1cblxuYmxvY2txdW90ZSB7XG5wYWRkaW5nOiAxMHB4IDIwcHg7XG5tYXJnaW46IDAgMCAyMHB4O1xuYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCAjZjFmMWYxO1xuY29sb3I6ICM2NjY7XG5iYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xufVxuXG5gO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0RGVmYXVsdFByb21wdCA9IGV4cG9ydHMuaGFuZGxlSGlnaHRsaWdodCA9IGV4cG9ydHMuZ2V0QW5raUNhcmRzID0gZXhwb3J0cy5oYW5kbGVQcm9tcHRWYXJpYWJsZXMgPSBleHBvcnRzLmdldFVuc3BsYXNoSW1hZ2VzID0gZXhwb3J0cy53aW5kb3dJbml0aWFsaXphdGlvbiA9IGV4cG9ydHMuZ2V0Q2xpcGJvYXJkID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCBnZXRDbGlwYm9hcmQgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC5yZWFkVGV4dCgpXG4gICAgICAgICAgICAudGhlbih0ZXh0ID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUodGV4dCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5leHBvcnRzLmdldENsaXBib2FyZCA9IGdldENsaXBib2FyZDtcbmNvbnN0IHdpbmRvd0luaXRpYWxpemF0aW9uID0gKGRhdGEpID0+IHtcbiAgICAvLyDorr7nva7nqpflj6PnmoTpu5jorqTkvY3nva5cbiAgICBpZiAoZGF0YS53aW5kb3dFbGVtZW50LmN1cnJlbnQgJiYgIWRhdGEuaXNQaW4pIHtcbiAgICAgICAgLy8gQ2hlY2sgdGhlIGJvdW5kYXJpZXNcbiAgICAgICAgY29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICBjb25zdCBlbGVtZW50V2lkdGggPSBkYXRhLndpbmRvd0VsZW1lbnQuY3VycmVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgZWxlbWVudEhlaWdodCA9IGRhdGEud2luZG93RWxlbWVudC5jdXJyZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgY29uc3QgbWluWCA9IDA7XG4gICAgICAgIGNvbnN0IG1pblkgPSAwO1xuICAgICAgICBjb25zdCBtYXhYID0gd2luZG93V2lkdGggLSBlbGVtZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IG1heFkgPSB3aW5kb3dIZWlnaHQgLSBlbGVtZW50SGVpZ2h0O1xuICAgICAgICBsZXQgbmV3WCwgbmV3WSA9IDA7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb25PYmplY3QgPSBkYXRhLnNlbGVjdGlvbi5nZXRSYW5nZUF0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgbmV3WCA9IHNlbGVjdGlvbk9iamVjdC54ICsgc2VsZWN0aW9uT2JqZWN0LndpZHRoICsgMTA7XG4gICAgICAgICAgICBuZXdZID0gc2VsZWN0aW9uT2JqZWN0LnkgKyBzZWxlY3Rpb25PYmplY3QuaGVpZ2h0ICsgMTA7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2xhbXBlZFggPSBNYXRoLm1heChtaW5YLCBNYXRoLm1pbihuZXdYLCBtYXhYKSk7XG4gICAgICAgIGNvbnN0IGNsYW1wZWRZID0gTWF0aC5tYXgobWluWSwgTWF0aC5taW4obmV3WSwgbWF4WSkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9wcy5zZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKSk7XG4gICAgICAgIGRhdGEud2luZG93RWxlbWVudC5jdXJyZW50LnN0eWxlLmxlZnQgPSBgJHtjbGFtcGVkWH1weGA7XG4gICAgICAgIGRhdGEud2luZG93RWxlbWVudC5jdXJyZW50LnN0eWxlLnRvcCA9IGAke2NsYW1wZWRZfXB4YDtcbiAgICB9XG4gICAgLy8gLy8g5re75Yqg5rua5Yqo5LqL5Lu277yM6K6p5raI5oGv5YiX6KGo6Ieq5Yqo5rua5Yqo5Yiw5bqV6YOoXG4gICAgLy8gZGF0YS5tZXNzYWdlc0xpc3QuY3VycmVudD8uYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVTY3JvbGwpO1xuICAgIC8vIHJldHVybiAoKSA9PiB7XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKCd1c2VFZmZlY3QgcmV0dXJuJyk7XG4gICAgLy8gICAgIGRhdGEubWVzc2FnZXNMaXN0LmN1cnJlbnQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlU2Nyb2xsKTtcbiAgICAvLyB9O1xuICAgIC8vIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbCgpIHtcbiAgICAvLyAgICAgaWYgKGRhdGEubWVzc2FnZXNMaXN0LmN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAvLyAgICAgICAgIGNvbnN0IGlzQXRCb3R0b20gPSBkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50Py5zY3JvbGxUb3AgKyBkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50LmNsaWVudEhlaWdodCA+PSBkYXRhLm1lc3NhZ2VzTGlzdC5jdXJyZW50LnNjcm9sbEhlaWdodCAtIDAuNTtcbiAgICAvLyAgICAgICAgIGlmIChpc0F0Qm90dG9tKSB7XG4gICAgLy8gICAgICAgICAgICAgLy8g5bey57uP5L2N5LqO5bqV6YOo77yM5LiN6ZyA6KaB6Ieq5Yqo5rua5YqoXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICAvLyBzY3JvbGxUb0JvdHRvbSgpXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgLy8g5pyq5L2N5LqO5bqV6YOo77yM5LiN5omn6KGM6Ieq5Yqo5rua5YqoXG4gICAgLy8gfVxufTtcbmV4cG9ydHMud2luZG93SW5pdGlhbGl6YXRpb24gPSB3aW5kb3dJbml0aWFsaXphdGlvbjtcbi8qKlxuICog6I635Y+WIFVuc3BsYXNoIOWbvueJh1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlXb3JkIC0g5qC55o2u5q2k5YWz6ZSu5a2X5pCc57Si5Zu+54mHXG4gKiBAcmV0dXJucyB7QXJyYXl9IOWbvueJh+WIl+ihqFxuICogQHRocm93cyB75byC5bi457G75Z6LfSDlvILluLjmj4/ov7BcbiAqL1xuY29uc3QgZ2V0VW5zcGxhc2hJbWFnZXMgPSAoa2V5V29yZCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIOivt+axgiBiYWNrZ3JvdW5kIOiOt+WPluaVsOaNrlxuICAgICAgICAvLyDkvb/nlKjplb/ov57mjqVcbiAgICAgICAgbGV0IHBvcnQgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgICAgICAgICBuYW1lOiAnZnJvbVBvcHVwQ2FyZFV0aWwnXG4gICAgICAgIH0pO1xuICAgICAgICAvLyDkvb/nlKggcG9zdE1zIOWPkemAgeS/oeaBr1xuICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnZ2V0VW5zcGxhc2hJbWFnZXMnLCAnbWVzc2FnZXMnOiAnJywgJ2tleVdvcmQnOiBrZXlXb3JkIH0pO1xuICAgICAgICAvLyDmjqXmlLbkv6Hmga9cbiAgICAgICAgcG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIobXNnID0+IHtcbiAgICAgICAgICAgIGlmIChtc2cudHlwZSA9PT0gJ3NlbmRJbWdEYXRhJykge1xuICAgICAgICAgICAgICAgIGlmICgnaW1ncycgaW4gbXNnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1bnNwbGFzaFNlYXJjaFBob3RvcycpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG1zZy5pbWdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbmV4cG9ydHMuZ2V0VW5zcGxhc2hJbWFnZXMgPSBnZXRVbnNwbGFzaEltYWdlcztcbi8qKlxuICog5aSE55CGIFByb21wdCDkuK3nmoTlj5jph49cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvbXB0U3RyIC0g6ZyA6KaB5aSE55CG55qEIFByb21wdCDlrZfnrKbkuLJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlXb3JkIC0g55So5oi35omA6YCJ5Lit55qE5YWz6ZSu5a2XXG4gKiBAcGFyYW0ge3N0cmluZ30gU2VudGVuY2UgLSDku47nvZHpobXkuK3mj5Dlj5bnmoTlhbPplK7lrZfmiYDlnKjnmoTlj6XlrZBcbiAqIEByZXR1cm5zIHtzdHJpbmd9IOWkhOeQhuWQjueahCBQcm9tcHQg5a2X56ym5LiyXG4gKiBAdGhyb3dzIHvlvILluLjnsbvlnot9IOW8guW4uOaPj+i/sFxuICovXG5jb25zdCBoYW5kbGVQcm9tcHRWYXJpYWJsZXMgPSAocHJvbXB0U3RyLCBrZXlXb3JkLCBTZW50ZW5jZSwgTGFuZykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgbGV0IG5ld1Byb21wdFN0ciA9IHByb21wdFN0cjtcbiAgICAvLyDlpITnkIblhbPplK7lrZflkozlj6XlrZBcbiAgICBuZXdQcm9tcHRTdHIgPSBwcm9tcHRTdHIucmVwbGFjZSgvXFx7c2VsZWN0aW9uXFx9L2csIGtleVdvcmQpO1xuICAgIG5ld1Byb21wdFN0ciA9IG5ld1Byb21wdFN0ci5yZXBsYWNlKC9cXHtzZW50ZW5jZVxcfS9nLCBTZW50ZW5jZSk7XG4gICAgLy8g5aSE55CG6K+t6KiAXG4gICAgbmV3UHJvbXB0U3RyID0gbmV3UHJvbXB0U3RyLnJlcGxhY2UoL1xce2N1cnJlbnRMYW5ndWFnZVxcfS9nLCBMYW5nWydjdXJyZW50J11bJ25hbWUnXSk7XG4gICAgbmV3UHJvbXB0U3RyID0gbmV3UHJvbXB0U3RyLnJlcGxhY2UoL1xce3RhcmdldExhbmd1YWdlXFx9L2csIExhbmdbJ3RhcmdldCddWyduYW1lJ10pO1xuICAgIC8vIOWkhOeQhiBBbmtpIOWNleivjVxuICAgIGlmIChuZXdQcm9tcHRTdHIuaW5kZXhPZigne2Fua2lDYXJkc30nKSA+PSAwKSB7XG4gICAgICAgIC8vIOiOt+WPluebruagh+WNoeeJh1xuICAgICAgICBsZXQgcmFuZG9tVmFsdWVzO1xuICAgICAgICBsZXQgYW5raUNhcmRzU3RyID0gJyc7XG4gICAgICAgIHlpZWxkICgwLCBleHBvcnRzLmdldEFua2lDYXJkcykoKS50aGVuKChjYXJkcykgPT4ge1xuICAgICAgICAgICAgcmFuZG9tVmFsdWVzID0gY2FyZHM7XG4gICAgICAgICAgICBpZiAocmFuZG9tVmFsdWVzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJhbmRvbVZhbHVlcy5sZW5ndGggPiA1KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOmaj+acuuWPliBYIOS4quWNoeeJh1xuICAgICAgICAgICAgICAgICAgICAvLyDmt7Hmi7fotJ3mlbDnu4Tku6Xpgb/lhY3kv67mlLnmupDmlbDnu4RcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2h1ZmZsZWRBcnJheSA9IHJhbmRvbVZhbHVlcy5zbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICAvLyDkvb/nlKggRmlzaGVyLVlhdGVzIOa0l+eJjOeul+azleWvueaVsOe7hOi/m+ihjOaJk+S5sVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gc2h1ZmZsZWRBcnJheS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBbc2h1ZmZsZWRBcnJheVtpXSwgc2h1ZmZsZWRBcnJheVtqXV0gPSBbc2h1ZmZsZWRBcnJheVtqXSwgc2h1ZmZsZWRBcnJheVtpXV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8g5Y+W5YmNIHgg5Liq5YWD57Sg5L2c5Li657uT5p6cXG4gICAgICAgICAgICAgICAgICAgIHJhbmRvbVZhbHVlcyA9IHNodWZmbGVkQXJyYXkuc2xpY2UoMCwgNSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyDlsIbljZXor43mm7/mjaLliLAgcHJvbXB0IOS4rVxuICAgICAgICAgICAgICAgIHJhbmRvbVZhbHVlcyA9PT0gbnVsbCB8fCByYW5kb21WYWx1ZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJhbmRvbVZhbHVlcy5mb3JFYWNoKChjYXJkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjYXJkLmZpZWxkcyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaXJzdEtleSA9IGtleXNbMF07XG4gICAgICAgICAgICAgICAgICAgIC8vIOaJvuWIsOWNoeeJh+ato+mdolxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYXJkLmZpZWxkc1trZXlzW2ldXS5vcmRlciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0S2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhbmtpQ2FyZHNTdHIgKz0gY2FyZC5maWVsZHNbZmlyc3RLZXldLnZhbHVlICsgJywnO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG5ld1Byb21wdFN0ciA9IG5ld1Byb21wdFN0ci5yZXBsYWNlKC9cXHthbmtpQ2FyZHNcXH0vZywgYW5raUNhcmRzU3RyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3UHJvbXB0U3RyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIG5ld1Byb21wdFN0ciA9IG5ld1Byb21wdFN0ci5yZXBsYWNlKC9cXHthbmtpQ2FyZHNcXH0vZywgJycpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1Byb21wdFN0cjtcbn0pO1xuZXhwb3J0cy5oYW5kbGVQcm9tcHRWYXJpYWJsZXMgPSBoYW5kbGVQcm9tcHRWYXJpYWJsZXM7XG4vKipcbiAqIOiOt+WPliBBbmtpIOWNoeeJh1xuICpcbiAqIEByZXR1cm5zIHtvYmplY3RbXX0g6L+U5Zue5Y2h54mH55qE5a+56LGh5YiX6KGoXG4gKiBAdGhyb3dzIHvlvILluLjnsbvlnot9IOW8guW4uOaPj+i/sFxuICovXG5jb25zdCBnZXRBbmtpQ2FyZHMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8g5Yik5pat5pys5Zyw5piv5ZCm5a2Y5pyJ5pyq6L+H5pyf55qE5pWw5o2uXG4gICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQuc3RvcmFnZS5sb2NhbC5nZXQoeyBcImFua2lDYXJkc1wiOiB7ICdjYXJkcyc6IFtdLCAndGltZSc6IDAgfSB9KS50aGVuKChpdGVtKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIC8vIOe8k+WtmCAxIOWwj+aXtlxuICAgICAgICAgICAgaWYgKGl0ZW0uYW5raUNhcmRzLmNhcmRzLmxlbmd0aCA+IDAgJiYgRGF0ZS5ub3coKSAtIGl0ZW0uYW5raUNhcmRzLnRpbWUgPCAzNjAwICogMTAwMCkge1xuICAgICAgICAgICAgICAgIC8vIOiLpeacrOWcsOacieWPr+eUqOeahOaVsOaNru+8jOWImeebtOaOpeWkhOeQhlxuICAgICAgICAgICAgICAgIHJlc29sdmUoaXRlbS5hbmtpQ2FyZHMuY2FyZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g6Iul5pys5Zyw5peg5Y+v55So55qE5pWw5o2u77yM5YiZ6YCa6L+HIEFua2lcbiAgICAgICAgICAgICAgICB5aWVsZCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyAndHlwZSc6ICdhbmtpQWN0aW9uJywgJ21lc3NhZ2VzJzogeyAnYW5raV9hY3Rpb25fdHlwZSc6ICdmaW5kQ2FyZHMnLCAnYW5raV9hcmd1bWVudHMnOiB7ICdxdWVyeSc6ICdpczpkdWUgcHJvcDpkdWU+LTIgcHJvcDpkdWU8MycgfSB9LCB9KS50aGVuKChtZXNzYWdlKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZXJyb3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOagueaNruWNoeeJhyBJRCDmn6Xor6LljaHniYfkv6Hmga9cbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7ICd0eXBlJzogJ2Fua2lBY3Rpb24nLCAnbWVzc2FnZXMnOiB7ICdhbmtpX2FjdGlvbl90eXBlJzogJ2NhcmRzSW5mbycsICdhbmtpX2FyZ3VtZW50cyc6IHsgJ2NhcmRzJzogbWVzc2FnZS5yZXN1bHQgfSB9LCB9KS50aGVuKChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhcmRzID0gbWVzc2FnZS5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5bCG5pWw5o2u5a2Y5YKo5Yiw5pys5Zyw77yM6ZmQ5Yi25pyA5aSn5L+d5a2Y5pWw6YeP77yM6YG/5YWN5pys5Zyw5a2Y5YKo56m66Ze06L6+5Yiw5LiK6ZmQXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5zdG9yYWdlLmxvY2FsLnNldCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFua2lDYXJkczogeyAndGltZSc6IERhdGUubm93KCksICdjYXJkcyc6IGNhcmRzLnNsaWNlKDAsIDMwKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjYXJkcy5zbGljZSgwLCAzMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Vycm9yXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWPjemmiOmUmeivr+S/oeaBr1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksIChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vZXJyb3JcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH0pO1xufTtcbmV4cG9ydHMuZ2V0QW5raUNhcmRzID0gZ2V0QW5raUNhcmRzO1xuLyoqXG4gKiDlpITnkIblrZfnrKbkuLLvvIzlr7nmjIflrprlrZfnrKborr7nva7moLflvI/jgIHngrnlh7vkuovku7ZcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0g6ZyA6KaB5aSE55CG55qE5a2X56ym5LiyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5V29yZCAtIOW9k+WJjemAieS4reeahOWtl+esplxuICogQHJldHVybnMge3N0cmluZ30g5aSE55CG5ZCO55qEIFByb21wdCDlrZfnrKbkuLJcbiAqIEB0aHJvd3Mge+W8guW4uOexu+Wei30g5byC5bi45o+P6L+wXG4gKi9cbmNvbnN0IGhhbmRsZUhpZ2h0bGlnaHQgPSAoc3RyLCBrZXlXb3JkLCBhbmtpQ2FyZHMsIHdpbmRvd0VsZW1lbnQpID0+IHtcbiAgICBpZiAoc3RyID09PSAnJykge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBsZXQgbmV3U3RyID0gc3RyO1xuICAgIC8vIOWkhOeQhiBrZXl3b3JkIOmrmOS6rlxuICAgIG5ld1N0ciA9IG5ld1N0ci5yZXBsYWNlKG5ldyBSZWdFeHAoa2V5V29yZCwgJ2dpJyksIGAqKiR7a2V5V29yZH0qKmApO1xuICAgIC8vIOWkhOeQhiBBbmtpIOWNleivjemrmOS6rlxuICAgIGNvbnN0IGNhcmRzID0gYW5raUNhcmRzO1xuICAgIGlmICh3aW5kb3dFbGVtZW50ICYmIGNhcmRzKSB7XG4gICAgICAgIC8vIOmBjeWOhuavj+S4gOS4quWNoeeJh1xuICAgICAgICBjYXJkcy5mb3JFYWNoKChjYXJkKSA9PiB7XG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNhcmQpO1xuICAgICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGNhcmQuZmllbGRzKTtcbiAgICAgICAgICAgIGxldCBmaXJzdEtleSA9IGtleXNbMF07XG4gICAgICAgICAgICAvLyDmib7liLDljaHniYfmraPpnaJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChjYXJkLmZpZWxkc1trZXlzW2ldXS5vcmRlciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdEtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNhcmRGcm9udFZhbHVlID0gY2FyZC5maWVsZHNbZmlyc3RLZXldLnZhbHVlO1xuICAgICAgICAgICAgaWYgKGNhcmRGcm9udFZhbHVlICE9PSBrZXlXb3JkKSB7XG4gICAgICAgICAgICAgICAgbmV3U3RyID0gbmV3U3RyLnJlcGxhY2UobmV3IFJlZ0V4cChjYXJkRnJvbnRWYWx1ZSwgJ2dpJyksIGA8bWFyaz4ke2NhcmRGcm9udFZhbHVlfTwvbWFyaz5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIH0sIDEwKTtcbiAgICAgICAgICAgIC8vIC8vIOWIm+W7uuS4gOS4queUqOS6juWMheijuSdvJ+eahDxzcGFuPuWFg+e0oFxuICAgICAgICAgICAgLy8gdmFyIHNwYW5FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgLy8gc3BhbkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWNhcmRJRCcsIGNhcmQuaWQpO1xuICAgICAgICAgICAgLy8gc3BhbkVsZW1lbnQuY2xhc3NOYW1lID0gJ2hlbGxvJztcbiAgICAgICAgICAgIC8vIHNwYW5FbGVtZW50LnN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gICAgICAgICAgICAvLyBzcGFuRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgICAgICAvLyBzcGFuRWxlbWVudC50ZXh0Q29udGVudCA9IGNhcmRGcm9udFZhbHVlO1xuICAgICAgICAgICAgLy8gLy8gbmV3U3RyID0gbmV3U3RyLnJlcGxhY2UoL28vZ2ksIHNwYW5FbGVtZW50Lm91dGVySFRNTCk7XG4gICAgICAgICAgICAvLyBuZXdTdHIgPSBuZXdTdHIucmVwbGFjZShuZXcgUmVnRXhwKGNhcmRGcm9udFZhbHVlLCAnZ2knKSwgc3BhbkVsZW1lbnQub3V0ZXJIVE1MKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOWvueS4iui/sOWFg+e0oOa3u+WKoOeCueWHu+S6i+S7tlxuICAgICAgICAvLyBsZXQgaGlnaHRsaWdodERvbSA9IHdpbmRvd0VsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaGVsbG8nKVxuICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IGhpZ2h0bGlnaHREb20ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gICAgIGhpZ2h0bGlnaHREb21baV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVIaWdodGxpZ2h0Q2xpY2spXG4gICAgICAgIC8vICAgICBoaWdodGxpZ2h0RG9tW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlSGlnaHRsaWdodENsaWNrKVxuICAgICAgICAvLyB9XG4gICAgfVxuICAgIHJldHVybiBuZXdTdHI7XG4gICAgLy8gcmV0dXJuICd0cnVlJ1xufTtcbmV4cG9ydHMuaGFuZGxlSGlnaHRsaWdodCA9IGhhbmRsZUhpZ2h0bGlnaHQ7XG4vKipcbiAqIOiOt+WPluezu+e7n+eahOm7mOiupCBQcm9tcHRcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlXb3JkIC0g5b2T5YmN6YCJ5Lit55qE5a2X56ymXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBQcm9tcHQg5a2X56ym5LiyXG4gKiBAdGhyb3dzIHvlvILluLjnsbvlnot9IOW8guW4uOaPj+i/sFxuICovXG5jb25zdCBnZXREZWZhdWx0UHJvbXB0ID0gKGtleVdvcmQpID0+IHtcbiAgICBsZXQgdXNlclByb21wdCA9IGBcblxuICAgICAgICBQbGVhc2UgaGVscCBtZSBsZWFybiBhcyBhIGZvcmVpZ24gbGFuZ3VhZ2UgdGVhY2hlci4gU2VudGVuY2VzIGluIGV4YW1wbGVzIHNob3VsZCBub3QgYmUgdGhlIHNhbWUgYXMgdGhlIGdpdmVuIHNlbnRlbmNlLlxuXG4gICAgICAgIEV4YW1wbGXvvJpcbiAgICAgICAgXCJcIlwiXG4gICAgICAgIC0gIE1lYW5pbmc6IDxFeHBsYWluIHRoZSBtZWFuaW5nIHVzaW5nIHtjdXJyZW50TGFuZ3VhZ2V9PlxuICAgICAgICAtICBQYXJ0IG9mIFNwZWVjaDogPEluZGljYXRlIHRoZSBwYXJ0IG9mIHNwZWVjaCB1c2luZyB7Y3VycmVudExhbmd1YWdlfT5cbiAgICAgICAgXG4gICAgICAgICMjIE1lYW5pbmcgaW4gdGhlIHNlbnRlbmNlXG4gICAgICAgIC0gIDxFeHBsYWluIHRoZSBtZWFuaW5nIG9mIHRoZSB3b3JkIGluIHRoZSBzZW50ZW5jZSB1c2luZyB7Y3VycmVudExhbmd1YWdlfT5cbiAgICAgICAgXG4gICAgICAgICMjIEV4YW1wbGUgU2VudGVuY2VzXG4gICAgICAgIC0gIDx7dGFyZ2V0TGFuZ3VhZ2V9IGV4YW1wbGUgc2VudGVuY2U+IC0gPFRyYW5zbGF0aW9uIGluIHtjdXJyZW50TGFuZ3VhZ2V9PlxuICAgICAgICAtICA8e3RhcmdldExhbmd1YWdlfSBleGFtcGxlIHNlbnRlbmNlPiAtIDxUcmFuc2xhdGlvbiBpbiB7Y3VycmVudExhbmd1YWdlfT5cbiAgICAgICAgXG4gICAgICAgICMjIFRyYW5zbGF0aW9uIEV4ZXJjaXNlXG4gICAgICAgIC0gIDx7Y3VycmVudExhbmd1YWdlfSBzZW50ZW5jZT5cbiAgICAgICAgLSAgPHtjdXJyZW50TGFuZ3VhZ2V9IHNlbnRlbmNlPlxuICAgICAgICBcbiAgICAgICAgXCJcIlwiIFxuICAgICAgICBcbiAgICAgICAgV29yZDp7c2VsZWN0aW9ufSwgc2VudGVuY2U6IHtzZW50ZW5jZX0sWW91IG11c3QgcmVwbHkgaW4gdGhlIHNwZWNpZmllZCBsYW5ndWFnZVxuXG4gICAgICAgIFBsZWFzZSBzdGFydCB0ZWFjaGluZzpcblxuICAgICAgICBgO1xuICAgIC8vIOWFs+mUruWtl+mVv+W6pui+g+mVv+aXtu+8jOaMieeFp+WPpeWtkOi/m+ihjOWkhOeQhlxuICAgIGlmIChrZXlXb3JkLmxlbmd0aCA+IDIwKSB7XG4gICAgICAgIHVzZXJQcm9tcHQgPSBgXG4gICAgICBcbiAgICAgICAgICAgICAgICAgIEFzIGEgbGFuZ3VhZ2UgdGVhY2hlciwgSSB3aWxsIHByb3ZpZGUgYW4gZXhwbGFuYXRpb24gb2YgdGhlIGdyYW1tYXIga25vd2xlZGdlIGluIHRoZSBnaXZlbiBzZW50ZW5jZTpcbiAgICAgIFxuICAgICAgICAgICAgICAgICAgRXhhbXBsZTpcbiAgICAgICAgICAgICAgICAgIFwiXCJcIlxuICAgICAgXG4gICAgICAgICAgICAgICAgICAjIyBUcmFuc2xhdGlvblxuICAgICAgICAgICAgICAgICAgPFRyYW5zbGF0ZSB0byB7Y3VycmVudExhbmd1YWdlfT5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgIyMgR3JhbW1hclxuICAgICAgICAgICAgICAgICAgPC0gUG9pbnQ6IEV4cGxhaW4gaW4ge2N1cnJlbnRMYW5ndWFnZX0+XG4gICAgICBcbiAgICAgICAgICAgICAgICAgICMjIEV4YW1wbGVzIG9mIHJlbGF0ZWQgZ3JhbW1hclxuICAgICAgICAgICAgICAgICAgLSAgPHt0YXJnZXRMYW5ndWFnZX0gZXhhbXBsZSBzZW50ZW5jZT4gLSA8VHJhbnNsYXRpb24gaW4ge2N1cnJlbnRMYW5ndWFnZX0+XG4gICAgICAgICAgICAgICAgICAtICA8e3RhcmdldExhbmd1YWdlfSBleGFtcGxlIHNlbnRlbmNlPiAtIDxUcmFuc2xhdGlvbiBpbiB7Y3VycmVudExhbmd1YWdlfT5cbiAgICAgIFxuICAgICAgICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIFNlbnRlbmNlOiB7c2VsZWN0aW9ufWA7XG4gICAgfVxuICAgIGNvbnN0IGRlZmF1bHRQcm9tcHQgPSB7XG4gICAgICAgICd0aXRsZSc6ICdEZWZhdWx0JywgJ2dldFVuc3BsYXNoSW1hZ2VzJzogdHJ1ZSwgJ3VzZXJQcm9tcHQnOiB1c2VyUHJvbXB0LFxuICAgICAgICAnaWQnOiAnRGVmYXVsdCdcbiAgICB9O1xuICAgIHJldHVybiBkZWZhdWx0UHJvbXB0O1xufTtcbmV4cG9ydHMuZ2V0RGVmYXVsdFByb21wdCA9IGdldERlZmF1bHRQcm9tcHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZXREb25vdENsb3NlUG9wdXBDYXJkID0gZXhwb3J0cy5waW5Qb3B1cENhcmQgPSB2b2lkIDA7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IHJlYWN0X2RvbV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuY29uc3QgUG9wdXBDYXJkXzEgPSByZXF1aXJlKFwiLi9Qb3B1cENhcmRcIik7XG5jb25zdCBjc3NpbmpzXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vY3NzaW5qc1wiKTtcbmNvbnN0IGxhbmdfMSA9IHJlcXVpcmUoXCIuL2xpYi9sYW5nXCIpO1xuY29uc3QgbG9jYWxlXzEgPSByZXF1aXJlKFwiLi9saWIvbG9jYWxlXCIpO1xuY29uc3Qgc3R5bGVfMSA9IHJlcXVpcmUoXCIuL1BvcHVwQ2FyZC9zdHlsZVwiKTtcbi8vIGltcG9ydCAnLi9hc3NldHMvdGFpbHdpbmQuY3NzJztcbi8vIOmhtemdoui9veWFpeWQjuS8muazqOWFpeasoeiEmuacrO+8jOaIliBiYWNrZ3JvdW5kIOWPr+iDveS8muWcqOS4gOS6m+aDheWGteS4i+azqOWFpeatpOiEmuacrFxuLy8gY29uc29sZS5sb2coJ2JlZm9yZSBicm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyJyk7XG4vLyDorrDlvZXlvZPliY3nqpflj6PmmK/lkKYgUGluIOS9j1xubGV0IGlzUGluID0gZmFsc2U7XG4vLyDorr7nva7lvZPliY3nqpflj6PmmK/lkKblhYHorrjlhbPpl61cbmxldCBkb25vdENsb3NlUG9wdXBDYXJkID0gZmFsc2U7XG4vLyDliJ3lp4vljJbkuLvlrrnlmajvvIzkuLvlrrnlmajnlKjmnaXmjILlnKjlhajlsYDmoLflvI/vvIzljIXmi6znrKzkuInmlrnnu4Tku7bnmoTmoLflvI9cbmxldCBNeUJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdfX2ppYW5nLXNjb3V0ZXInKTtcbi8vIGNvbnNvbGUubG9nKE15Qm94KTtcbi8vIGNvbnRhaW5lciDmib/ovb0gVUkg57uE5Lu2XG5sZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb250YWluZXIuY2xhc3NOYW1lID0gJ2NvbnRhaW5lcic7XG4vLyDkvb/nlKggc2hhZG93IOadpemalOemu+agt+W8j1xubGV0IHNoYWRvd1Jvb3QgPSB1bmRlZmluZWQ7XG5pZiAoTXlCb3ggPT09IG51bGwgfHwgTXlCb3ggPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIOWmguaenOS4jeWtmOWcqOWuueWZqFxuICAgIC8vIOWIm+W7uuS4u+WuueWZqFxuICAgIE15Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgTXlCb3guaWQgPSAnX19qaWFuZy1zY291dGVyJztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdLmFwcGVuZENoaWxkKE15Qm94KTtcbiAgICBNeUJveC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyAvL+m7mOiupOmakOiXj1xuICAgIHNoYWRvd1Jvb3QgPSBNeUJveCA9PT0gbnVsbCB8fCBNeUJveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogTXlCb3guYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QgPT09IG51bGwgfHwgc2hhZG93Um9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgIC8vIEFudCDnu4Tku7bmoLflvI9cbiAgICAvLyBjb25zdCBhbnRTdHlsZXNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgIC8vIGFudFN0eWxlc2hlZXQucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIC8vIGFudFN0eWxlc2hlZXQuaHJlZiA9ICdodHRwczovL2Nkbi5ib290Y2RuLm5ldC9hamF4L2xpYnMvYW50ZC80LjE3LjEvYW50ZC5taW4uY3NzJztcbiAgICAvLyBzaGFkb3dSb290LmFwcGVuZENoaWxkKGFudFN0eWxlc2hlZXQpO1xuICAgIC8vIFRhaWx3aW5kXG4gICAgY29uc3QgdGFpbHdpbmRTdHlsZXNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgIHRhaWx3aW5kU3R5bGVzaGVldC5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgdGFpbHdpbmRTdHlsZXNoZWV0LmhyZWYgPSAnaHR0cHM6Ly91bnBrZy5jb20vdGFpbHdpbmRjc3NAXjIvZGlzdC90YWlsd2luZC5taW4uY3NzJztcbiAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKHRhaWx3aW5kU3R5bGVzaGVldCk7XG4gICAgLy8g5ZyoIFNoYWRvdyBET00g5Lit5re75Yqg5qC35byP77yaXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlLnRleHRDb250ZW50ID0gc3R5bGVfMS5wb3B1cENhcmRTdHlsZTtcbiAgICBzaGFkb3dSb290ID09PSBudWxsIHx8IHNoYWRvd1Jvb3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubGV0IHBvcnQgPSB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuY29ubmVjdCh7XG4gICAgbmFtZTogJ2Zyb21Db250ZW50U2NyaXB0J1xufSk7XG4vLyDmjqXmlLYgYmFja2dyb3VuZCDmtojmga/vvIjnm67liY3mmK/pgJrov4fmtY/op4jlmajnmoTlj7PplK7oj5zljZXop6blj5HvvIlcbndlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKG1zZywgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICB2YXIgX2E7XG4gICAgLy8gY29uc29sZS5sb2coJ2NvbnRlbnQgc2NyaXB0IG9uTWVzc2FnZTonKTtcbiAgICAvLyBjb25zb2xlLmxvZyhtc2cpO1xuICAgIGlmIChtc2cudHlwZSA9PT0gJ29wZW4tc2NvdXRlcicpIHtcbiAgICAgICAgLy8g5aSE55CG56qX5Y+jXG4gICAgICAgIGlmIChNeUJveCAhPT0gbnVsbCAmJiBNeUJveCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyDlpoLmnpzlt7LlrZjlnKjlrrnlmahcbiAgICAgICAgICAgIGlmICgoKF9hID0gTXlCb3guc2hhZG93Um9vdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXInKSkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzkuI3lrZjlnKggUG9wdXBDYXJkXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9ICdjb250YWluZXInO1xuICAgICAgICAgICAgICAgIHNoYWRvd1Jvb3QgPT09IG51bGwgfHwgc2hhZG93Um9vdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5YGc5q2i5pen55qE5a+56K+dXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvLyDph43mlrDpk77mjqVcbiAgICAgICAgICAgICAgICBwb3J0ID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLmNvbm5lY3Qoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZnJvbUNvbnRlbnRTY3JpcHQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7ICd0eXBlJzogJ1N0b3BUaGVDb252ZXJzYXRpb24nLCAnbWVzc2FnZXMnOiAnJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE15Qm94LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgLy8g56e76Zmk5pen5YaF5a6577yM6YG/5YWNIDIg5qyh5riy5p+T5re35p2C5Zyo5LiA6LW3XG4gICAgICAgICAgICAvLyBjb250YWluZXIucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfkuI3lrZjlnKggQm94IOWuueWZqCcpO1xuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gJ2NvbnRhaW5lcic7XG4gICAgICAgICAgICBzaGFkb3dSb290ID09PSBudWxsIHx8IHNoYWRvd1Jvb3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IGdldFNlbGVjdGlvbigpO1xuICAgICAgICAvLyDmmL7npLrnqpflj6NcbiAgICAgICAgaWYgKHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24ua2V5V29yZCAhPT0gJycpIHtcbiAgICAgICAgICAgIHNob3dQb3B1cENhcmQoeyAna2V5V29yZCc6IHNlbGVjdGlvbiA9PT0gbnVsbCB8fCBzZWxlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbGVjdGlvbi5rZXlXb3JkLCAnU2VudGVuY2UnOiBzZWxlY3Rpb24uc2VudGVuY2UgfSwgd2luZG93LmdldFNlbGVjdGlvbigpLCBjb250YWluZXIsIHNoYWRvd1Jvb3QsIGlzUGluLCBtc2cucnVuUHJvbXB0KTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzZWxlY3Rpb25jaGFuZ2UnLCBoYW5kbGVTZWxlY3Rpb25jaGFuZ2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2V1cCk7XG4gICAgICAgIC8vIOebkeWQrOmhtemdoueCueWHu+S6i+S7tlxuICAgICAgICBkb2N1bWVudC5vbm1vdXNlZG93biA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgaWYgKE15Qm94ICE9PSB1bmRlZmluZWQgJiYgTXlCb3ggIT09IG51bGwgJiYgIWlzUGluICYmICFkb25vdENsb3NlUG9wdXBDYXJkKSB7XG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c54K55Ye755qE5LiN5piv5o+S5Lu256qX5Y+j5Y+K5YW25a2Q5YWD57Sg77yM5YiZ5YWz6Zet56qX5Y+jXG4gICAgICAgICAgICAgICAgaWYgKE15Qm94ICE9PSBldmVudC50YXJnZXQgJiYgIU15Qm94LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g6ZqQ6JeP56qX5Y+jXG4gICAgICAgICAgICAgICAgICAgIChfYSA9IGNvbnRhaW5lci5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2VsZWN0aW9uY2hhbmdlJywgaGFuZGxlU2VsZWN0aW9uY2hhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNldXApO1xuICAgICAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgJ3R5cGUnOiAnU3RvcFRoZUNvbnZlcnNhdGlvbicsICdtZXNzYWdlcyc6ICcnIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59KTtcbi8vIOaYvuekuuW6lOeUqOeql+WPo1xuZnVuY3Rpb24gc2hvd1BvcHVwQ2FyZChkYXRhLCBtc2csIE15Qm94LCBzaGFkb3dSb290LCBpc1BpbiwgcnVuUHJvbXB0KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8gbGV0IGEgPSBhd2FpdCBmZXRjaGN1cnJlbnRMYW5ndWFnZSgpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGEpO1xuICAgICAgICBjb25zdCBsYW5nID0geWllbGQgKDAsIGxhbmdfMS5mZXRjaGN1cnJlbnRMYW5ndWFnZSkoKTtcbiAgICAgICAgcmVhY3RfZG9tXzEuZGVmYXVsdC5yZW5kZXIocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LlN0cmljdE1vZGUsIG51bGwsXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChsb2NhbGVfMS5DdXJyZW50TGFuZ3VhZ2VDb250ZXh0LlByb3ZpZGVyLCB7IHZhbHVlOiBsYW5nIH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoY3NzaW5qc18xLlN0eWxlUHJvdmlkZXIsIHsgY29udGFpbmVyOiBzaGFkb3dSb290IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFBvcHVwQ2FyZF8xLlBvcHVwQ2FyZCwgeyBkYXRhOiBkYXRhLCBzZWxlY3Rpb246IG1zZywgcnVuUHJvbXB0OiBydW5Qcm9tcHQsIGlzUGluOiBpc1BpbiB9KSkpKSwgTXlCb3gpO1xuICAgIH0pO1xufVxuY29uc3QgcGluUG9wdXBDYXJkID0gKHZhbHVlKSA9PiB7XG4gICAgaXNQaW4gPSB2YWx1ZTtcbn07XG5leHBvcnRzLnBpblBvcHVwQ2FyZCA9IHBpblBvcHVwQ2FyZDtcbmNvbnN0IHNldERvbm90Q2xvc2VQb3B1cENhcmQgPSAodmFsdWUpID0+IHtcbiAgICBkb25vdENsb3NlUG9wdXBDYXJkID0gdmFsdWU7XG59O1xuZXhwb3J0cy5zZXREb25vdENsb3NlUG9wdXBDYXJkID0gc2V0RG9ub3RDbG9zZVBvcHVwQ2FyZDtcbmxldCBpc1RleHRTZWxlY3RlZCA9IGZhbHNlO1xuY29uc3QgaGFuZGxlU2VsZWN0aW9uY2hhbmdlID0gKCkgPT4ge1xuICAgIC8vIGxldCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgLy8gaWYgKHNlbGVjdGlvbikge1xuICAgIC8vICAgY29uc29sZS5sb2coJ3NlbGVjdGlvbi50b1N0cmluZygpOicpO1xuICAgIC8vICAgY29uc29sZS5sb2coc2VsZWN0aW9uLnRvU3RyaW5nKCkpO1xuICAgIC8vICAgaXNUZXh0U2VsZWN0ZWQgPSBzZWxlY3Rpb24udG9TdHJpbmcoKS5sZW5ndGggPiAwO1xuICAgIC8vIH1cbn07XG5jb25zdCBoYW5kbGVNb3VzZXVwID0gKGV2ZW50KSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZU1vdXNldXAnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhpc1RleHRTZWxlY3RlZCk7XG4gICAgLy8gY29uc29sZS5sb2coZG9ub3RDbG9zZVBvcHVwQ2FyZCk7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNlbGVjdGlvbikge1xuICAgICAgICBpc1RleHRTZWxlY3RlZCA9IHNlbGVjdGlvbi5zZWxlY3Rpb24udG9TdHJpbmcoKS5sZW5ndGggPiAwO1xuICAgIH1cbiAgICBpZiAoaXNUZXh0U2VsZWN0ZWQgJiYgIWRvbm90Q2xvc2VQb3B1cENhcmQpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2lzVGV4dFNlbGVjdGVkICYmICFkb25vdENsb3NlUG9wdXBDYXJkJyk7XG4gICAgICAgIGlmIChNeUJveCAhPT0gZXZlbnQudGFyZ2V0ICYmICEoTXlCb3ggPT09IG51bGwgfHwgTXlCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IE15Qm94LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpKSB7XG4gICAgICAgICAgICBpc1RleHRTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJyhNeUJveCAhPT0gZXZlbnQudGFyZ2V0ICYmICFNeUJveD8uY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIE5vZGUpJyk7XG4gICAgICAgICAgICAvLyDlgZzmraLml6fnmoTlr7nor51cbiAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyAndHlwZSc6ICdTdG9wVGhlQ29udmVyc2F0aW9uJywgJ21lc3NhZ2VzJzogJycgfSk7XG4gICAgICAgICAgICAvLyDmmL7npLrnqpflj6NcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24gJiYgKHNlbGVjdGlvbiA9PT0gbnVsbCB8fCBzZWxlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbGVjdGlvbi5rZXlXb3JkLmxlbmd0aCkgPiAwKSB7XG4gICAgICAgICAgICAgICAgc2hvd1BvcHVwQ2FyZCh7ICdrZXlXb3JkJzogc2VsZWN0aW9uID09PSBudWxsIHx8IHNlbGVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VsZWN0aW9uLmtleVdvcmQsICdTZW50ZW5jZSc6IHNlbGVjdGlvbi5zZW50ZW5jZSB9LCB3aW5kb3cuZ2V0U2VsZWN0aW9uKCksIGNvbnRhaW5lciwgc2hhZG93Um9vdCwgaXNQaW4sIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbmNvbnN0IGdldFNlbGVjdGlvbiA9ICgpID0+IHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNlbGVjdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAvLyDlvZPliY3pgInkuK3nmoTmloflrZdcbiAgICAgICAgbGV0IGtleVdvcmQgPSBzZWxlY3Rpb24udG9TdHJpbmcoKS50cmltKCk7XG4gICAgICAgIC8vIOmAieS4reaWh+Wtl+aJgOWcqOeahOauteiQvVxuICAgICAgICBsZXQgc2VudGVuY2UgPSAoX2IgPSAoX2EgPSBzZWxlY3Rpb24uYW5jaG9yTm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRleHRDb250ZW50KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJztcbiAgICAgICAgaWYgKHNlbnRlbmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNlbnRlbmNlID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZW50ZW5jZSA9IHNlbnRlbmNlLmxlbmd0aCA8PSBrZXlXb3JkLmxlbmd0aCA/IChfZiA9IChfZSA9IChfZCA9IChfYyA9IHNlbGVjdGlvbi5hbmNob3JOb2RlKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5pbm5lclRleHQpICE9PSBudWxsICYmIF9mICE9PSB2b2lkIDAgPyBfZiA6ICcnIDogc2VudGVuY2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgJ3NlbGVjdGlvbic6IHNlbGVjdGlvbiwgJ2tleVdvcmQnOiBrZXlXb3JkLCAnc2VudGVuY2UnOiBzZW50ZW5jZSB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVzZUN1cnJlbnRMYW5ndWFnZSA9IGV4cG9ydHMuQ3VycmVudExhbmd1YWdlQ29udGV4dCA9IHZvaWQgMDtcbmNvbnN0IHJlYWN0XzEgPSByZXF1aXJlKFwicmVhY3RcIik7XG5jb25zdCBsYW5nXzEgPSByZXF1aXJlKFwiLi9sYW5nXCIpO1xuY29uc3QgYXN5bmNGZXRjaGN1cnJlbnRMYW5ndWFnZSA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHJldHVybiB5aWVsZCAoMCwgbGFuZ18xLmZldGNoY3VycmVudExhbmd1YWdlKSgpO1xufSk7XG4vLyDojrflj5blvZPliY3or63oqIBcbmV4cG9ydHMuQ3VycmVudExhbmd1YWdlQ29udGV4dCA9ICgwLCByZWFjdF8xLmNyZWF0ZUNvbnRleHQpKG51bGwpO1xuY29uc3QgdXNlQ3VycmVudExhbmd1YWdlID0gKCkgPT4gKDAsIHJlYWN0XzEudXNlQ29udGV4dCkoZXhwb3J0cy5DdXJyZW50TGFuZ3VhZ2VDb250ZXh0KTtcbmV4cG9ydHMudXNlQ3VycmVudExhbmd1YWdlID0gdXNlQ3VycmVudExhbmd1YWdlO1xuIiwiZXhwb3J0IGRlZmF1bHQgXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQWNjQUFBQ3BDQVlBQUFCZWRmWXNBQUFCcDJsVVdIUllUVXc2WTI5dExtRmtiMkpsTG5odGNBQUFBQUFBUEQ5NGNHRmphMlYwSUdKbFoybHVQU0x2dTc4aUlHbGtQU0pYTlUwd1RYQkRaV2hwU0hweVpWTjZUbFJqZW10ak9XUWlQejRLUEhnNmVHMXdiV1YwWVNCNGJXeHVjenA0UFNKaFpHOWlaVHB1Y3pwdFpYUmhMeUlnZURwNGJYQjBhejBpV0UxUUlFTnZjbVVnTmk0d0xqQWlQZ29nUEhKa1pqcFNSRVlnZUcxc2JuTTZjbVJtUFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eE9UazVMekF5THpJeUxYSmtaaTF6ZVc1MFlYZ3Ribk1qSWo0S0lDQThjbVJtT2tSbGMyTnlhWEIwYVc5dUlISmtaanBoWW05MWREMGlJZ29nSUNBZ2VHMXNibk02WlhocFpqMGlhSFIwY0RvdkwyNXpMbUZrYjJKbExtTnZiUzlsZUdsbUx6RXVNQzhpQ2lBZ0lHVjRhV1k2VlhObGNrTnZiVzFsYm5ROUlsTmpjbVZsYm5Ob2IzUWlDaUFnSUdWNGFXWTZVR2w0Wld4WlJHbHRaVzV6YVc5dVBTSXhOamtpQ2lBZ0lHVjRhV1k2VUdsNFpXeFlSR2x0Wlc1emFXOXVQU0kwTlRVaUx6NEtJRHd2Y21SbU9sSkVSajRLUEM5NE9uaHRjRzFsZEdFK0Nqdy9lSEJoWTJ0bGRDQmxibVE5SW5JaVB6NGVRckRlQUFBQlhXbERRMUJKUTBNZ1VISnZabWxzWlFBQUtKRjFrRThvZzNFWXh6OWppRTFSbE9Td2xES05abHR5M1NnVVdyUGx6MEc5ZXplalpuNjltK1FtRitVc1J5Zkp5WFVsQnpkWHBTaW5YZVNnWE5RdXJOZnpidGhHbm5wNlBuMTdudC92MnhjYW5KcFNhVHV3bWNrWmthbVFhMmw1eGRYeWpKMW1IQXpScXVsWkZReUhaMldGNzFsZnhYdHMxcndidHQ3eUhyeXMzbHpHQ3FYMlRpNzJUNmIvN3RkVld5S1oxV1YrU0FkMFplVEE1aFVPNytTVXhYdkNYWWFZRWo2eU9GWGhjNHZqRmI0cTcwUWpFOEszd2gzNnVwWVFMZ2g3NGpWNnFvWTMwOXY2bHdmTHZUT1ppUzNJN0pIdVk1NG9QZ0pNTVVlSVVjWVpsQ3pjLzl3RXlqY1RiS0hZeFdDREZPdmtjQkVVUlpFbUtUeERCcDBSUE1JK3ZOSitLK3ZmR1ZhMXcxZVlISk92dXF2YWpQZy8zb0RlcDZyV2Z3b0RjY2o3bFdab1A4bmFpdmJzbXQ5WFlVY2VtbzVOODIwUld0eFFlakROOTd4cGxzNmc4Ukd1aTUreGhHTXFISndXT1FBQVFBQkpSRUZVZUFIdFhRZDhWRlgyUHBPWmRDRDBFcW8wVVJCVVZCRGJXbEFFRlVUc3ZZdXU5ZThxN3Fvb0tGaXdnSzVkZDlIVkZidHJSUkc3Q01nS3dscG8wb1AwaFBSTVp2N251Mi9Pek10a0pwbEozcVNRYzM5NWMzdDUzN2s1M3p2MzNmZWVxMjNyQVg1U3B3Z29Bb3FBSXFBSUtBSkJCSktDSVEwb0FvcUFJcUFJS0FLS2dFRkF5VkVuZ2lLZ0NDZ0Npb0FpRUlhQWttTVlJQnBWQkJRQlJVQVJVQVNVSEhVT0tBS0tnQ0tnQ0NnQ1lRZ29PWVlCb2xGRlFCRlFCQlFCUlVESlVlZUFJcUFJS0FLS2dDSVFob0NTWXhnZ0dsVUVGQUZGUUJGUUJKUWNkUTRvQW9xQUlxQUlLQUpoQ0NnNWhnR2lVVVZBRVZBRUZBRkZRTWxSNTRBaW9BZ29Bb3FBSWhDR2dKSmpHQ0FhVlFRVUFVVkFFVkFFbEJ4MURpZ0Npb0Fpb0Fnb0FtRUlLRG1HQWFKUlJVQVJVQVFVQVVWQXlWSG5nQ0tnQ0NnQ2lvQWlFSWFBa21NWUlCcFZCQlFCUlVBUlVBU1VISFVPS0FLS2dDS2dDQ2dDWVFnb09ZWUJvbEZGUUJGUUJCUUJSVURKVWVlQUlxQUlLQUtLZ0NJUWhvQ1NZeGdnR2xVRUZBRkZRQkZRQkpRY2RRNG9Bb3FBSXFBSUtBSmhDQ2c1aGdHaVVVVkFFVkFFRkFGRlFNbFI1NEFpb0Fnb0FvcEFvMERnc2IvZlE0ODlmay9Vc1NMLzNpbTNSczJQSjBQSk1SNjB0S3dpb0Fnb0FvcEF2U0dRbDd1YnpqcDdkRVNDQkRHZWRkWm94OGJtemtodmY1ZGpyV2xEaW9BaW9BZ29Bb3BBZ2hDWSs5bTMxSzE3WjBPUTNicDFwbzgrbkd0NkVtSjg5ZFYzNmViL20reEk3eDVIV3RGR0ZBRkZRQkZRQkJTQk9rRGcybXR1TjczQWdoUUhpeEhFS0htU1hodGZ5YkUyNkdsZFJVQVJVQVFVZ1RwSFFFaFFDTkpwWXNRSktUbld1VmkxUTBWQUVWQUVGSUhhSWlBRWlYYnM0ZHEySy9WZGJWc1A4RXRFZlVWQUVWQUVGQUZGUUJFZzB0MnFPZ3NVQVVWQUVWQUVGSUV3QkpRY3d3RFJxQ0tnQ0NnQ2lvQWlvT1NvYzBBUlVBUVVBVVZBRVFoRFFNa3hEQkNOS2dLS2dDS2dDQ2dDU280NkJ4UUJSVUFSVUFRVWdUQUVsQnpEQU5Hb0lxQUlLQUtLZ0NLZ3p6bnFIRkFFRklFbWdrQmplV3JOMVVUazBiQlBVOG14WWN0SFI2Y0lLQUsxUnNCUEdTays2dGV4bE5LU2ZiVnVMWkVObEhpVDZOZWNGQ29veGFLZWttUWlzYTZ1YlNYSDZoRFNmRVZBRVdpa0NGaVc0dWhCdTJuQ2lkc29rd215TWJoQ0pzWUhacmVodDM1c0VSaXVrbVI5eUUzdk9kWUg2dHFuSXFBSTFBa0NnN3FVME4ybmJHazB4QWhRWU9WT1BHa3JIZGl0dUU0dzBrNGlJNkRrR0JrWFRWVUVGSUZHallCbE5aNHlLSStTR3FIaDVlSXhqOTUvZDBBQ2plVmVhYU9lTUpVR3IrUllDUkpOVUFRVWdjYU5RSWhNMmpVcmI3U24wcmFaMXpiMjBEblpFaldZUUFTVUhCTUlyamF0Q0NnQzlZZUFuL2tFRmxoamRSZzZ6a0ZkL1NEZ2FkMjZULzMwckwwcUFvcUFJdUE0QXY0QW9ZQlYvSlNjbk1kK2dlTzkxRVdEeWNrWjFMcDFMKzRLTk9rS0VIMGpadnU2QU0zQlBuUzNxb05nYWxPS2dDTFFlQkJZdWJVWjdTeE00UUhYRitINEtTdTlqUHEybDN1TGpRZTdwakJTSmNlbUlHVTlSMFZBRWFpRXdMUHpldEozdjdlcm1GNFg2N0MydGRJaFBiYlJ0TkZMS281Qll3MENBU1hIQmlFR0hZUWlvQWpVR3dKTWlDSGJNUlJLekhpc0c2SG1WcUloeVVUM2w1aXphQXF0ZW9wTEZqZUY4OVJ6VkFRVWdUMEdBZHgvY3pPaHBWSlNVZ1lmTGZob1hxT3pjeGxMVVFqSzhxc3lIdDF1TjkvSFRDYVB4OFY5SnBrREhmdDhQbk40dlg0cUt5dWo4dkxLdTJRdGd4RjkrQzB5bG01ck5IS3RsR2dFMUhKTU5NTGF2aUtnQ0RpTUFEYmRlSmxpdk9RcjU4MDI1VnVaTE5QSTdXNUhIbmZybVBzS0VhTnNkcEdxbFZrck5UV1pVdE5TZ21Rb0pjVlBZdExFNFVrbVNrdFBNVVJaVWx4S0pTVmxVb1RIS0Z0UFhjRmRxSGFiTlZoUUF3MENBU1hIQmlFR0hjU2Vod0FVWVdVbHUrZWRaOE00STcrL21MemU5VXlXTzhqdDZjd1AvcWZGUERETFVyVExLaFNHcFppUmtjcVdZbnlxMHMxV1pVYUdoMUpTdkZSWVdGTEprZ1JSMm00OXhqeFdMVmgzQ01Rbjhib2JsL2FrQ0RSeUJFSUt0cEdmU0tNYXZzOWZRTDZ5NVV4bVhjbWQxTEthc1VOR2RqbFZ0Q0JUVXBJcE16TzltamFxems1TzlsQldsb2Z5QzRxb3JMVE05cGdKOTF6VittM1Z6ZFpiTGl6MjhyS3RUUGE3MlRvdVlPdTlsQkhrSldaWE1yazh6Y2p0NGlWdVR4cyt0OFpQTFkzL0RPcHRtbWpIaW9BaTBEQVJ3SDIvZFVUSnNvd1pmWlFocTlGT2pDNjIrR3BQalBaZW0yVm04Tk9XaFZScUNGSUl1ZnJ4MmR1bzczQkIvbG9xS2x6UFM4djgvR2dLVzlOdUYxK0FKSkdmNzdmeVhWY3E5K2FSMTcrTFhDWHJLRG0xTXk4eFo5ZjNrR3ZWdjVKanJlRFR5b3FBSXRCUUVTZ3IyOENXVGJ4ZjRtQ0Z6MHVwdGJVWUkyR1N5UVJaWHA3UHk3K1ZOK3RFS3Q5UTBwSmNYanB5Y0RKMXlPcEphemUxcEkxYmQ5UEdMYnRvTnk4WEZ4V1ZrSjlQSjRXWkpEa3R5VmlSUHIrUHZLVTVmSjY3S0RXMUo3bVNZbC9pYmlqbmpIRW9PVFlrYWVoWUZBRkZvQUlDNmVuV3NtWlJVVkdGOU5naWZGL1BGOXVYTGV3cm5MakhHSXRyMTc2OUtiWjF5NVpZaXBzeWFIdjM3c0pHYzcvUjd5K2pYajI4TlA2TWc0bkt2TlNqYTBzcTNsMUVPVDl2cEUyOFpMenM5eDMwQTRlWHI5cENtM2ZrOGxKckdXVTFUK2VMQUtMQ290MXNLZjlDelp2djB5Z0pVc2t4NW1tdEJSV0Jwb2ZBNldlTU15LzRmUDMxTit2bDVQZmZmMy9UNzd4NTgyclVQM2EweHVPd0t6V1d6VGY3N2plQWpoOTVvbW42a3c4L29wK1hMb3VwRzdTTkpkdVNrdEtZeWt1aGlWUHU1dVZNNng1cFBQY3FKMDY0UTVxb2tWOVN0Sm5hdCs1RTNaZ1VuMzU1SGgyUzI1NEdkR3BsN3FOMjd0R1dodlZ2VDFlT0hVVEZoZVgwOVpJY21qMS9OZVZzemFWdkZ2NUdlL2ZxUUQyN2RLQjVQNjZodE14K05lcS9QaXNwT2RZbit0cTNJaEJBNE1JTHo2ZWhRNGRXd09PRDl6K2c5ei80MEtUMTZkdVhicnJ4ZW5yNGtlbTBZdm55Q3VVU0ZiR1BDUmJjaXkvK0sxRmRSVzMzcEpOR3NwWGxwNXFTWTlTR28yU2twc1ZtTmZZZk1DRFlRcTgrdldNbVIxUkNIL0dTWTdDek9nM3NaRXZRMmtpVTVDcWpFVU42MGFmL1hVa0RPelNuMG1SK2JNWE5qOUtVdXVsL3Y2Nm5qZHQzVTdmc3RuVGR1QU1wWjBjUkRUdGdMK3FWM1pvZW1qbVhTcjM1NU9abDF1U1VUbzZQL3VqampxWS9IWGNNZlRGbkxuMCs1M05IMjFkeWRCUk9iVXdScUJrQ0lFWllaK3MzYkFnMnNHUDc5bUM0cmdNbmpScEpnd1lOb2lWTGZqSmR3NExic1gxSGtLenJZank0SUdqZDJucHVFZUZFWHhSNFBHNnp3U1RTdVdFSjlZQ0RCbE9MckN5VDNUYXdwSXBJbDY3ZGFOelpaNW4wdk54Yyt2R0hSVlRWVWlzMnNhQXZyemMrcXhZZDNIWGJuYWFmU0Q5MzN6YzVVbklOMDN5ODh6U1ByVnczbGZ1VDZkNW5mNktManUvS2o2V1UwWmUvYk9Sbk9sUHA4OTl5S09lUFlpb285dEdCL1RzVFoxRlpZVEYxYUpkT2YyYXN4dC81SHExYXU1V1hWWlBKVzViREczVGFPYjZMRmNRSUIxL0pzWWFpMW1xS1FFTkhBTVNZYUFLSUZZUEZQLzFFT1BZZk9OQlVlZjMxTnlnOW8zYVBOY1RhdDVRYmR1Z1EyaGk0V0VBNDBkamd6VGZSM0FFSEQ2WjliZGFpdlJ3c3dTN2R1Z2FTMk9mVnowOCsrTWhlcEZJWWZkV0VIQ3MxbEtBRU54WHo0eGtwVEdZK0dqYTRKODE4N1VkYXN6NkgvbnJwbjhoZnRKT0ttZGZmK1hZRm5YL2lBRHJrb0o1OHpqNit2OHU3YjBINGZML3gxOTgyMDhKZjFsUHpGcW5HOHZkamswN1pEclllcmZ1MFRnMGJGcU5Zams2MUtlMm81U2hJcUs4SU5FQUV1blR0UW0xYnQ2RUMyNGFVL2RtaTI3WmpPMjFZSDdJeW5SbzYyaDdDUkpUSnk2aXZ2Ukc2endoaVBHUGNhV1ljOCtmTnA4VkxuSDlaTnM0MUk4MGk0RDU3OXpYTHpMS1VlOEVGNTlINmRSdG9RNEFzQzR1TEhEOS9qeWY2NTIyeldsZ1dZeXc0eDFLMnFyNWk2U1BSWlpLVCtTMCt2alJxMGN4RGcvdGwwYksrdk5PMjdkNUV6WnBUajNZK0tpMXowZlNiaDlNdnEzYlRVLzljU0M3ZW5OTWlneWlyVlFZZGMyaFBXck5wSnovYldVQnBhUjVlbXNXOVVuN2t3NS9QdnJQa0NHdlJhWXRSc0ZWeUZDVFVWd1FhSUFLbm56Nk91bmJwUXUrL2I5MTdSQmozNFdCbFB2THdvNDZPR09SMDVWVlgwUElWSy9nUmlNck96MXM2TXpJeVRKbDdwMHgxakp6YXRHbEQ0N25mem54dWRvZHhMRjVzdmZ0NUtCTzIyUnhrS3dDcjhzbW5ucUh0RGkwLzQxMnBkZVhxc3ErYW5KUFBWOGlXWGhtMWE5dUN1bmJJb0h2L01weTI1UG5KVFhsc05icjRmcU9mRnEvTm94bXZyS1FGMzN4TGw5eDZHNVV6b2U2VnRaenZxU2JUSDlzTEtEZVhuK3NzOFRCQnNnWEtnL0Ewc2xjQ0tUa0dadzdVQVVSWVgwNzdiOHI0NDBYVjJIZ1M3cDU2OG1tekVlZjAwMDh6K2FlZGRpcHQycmlSa082czg3TVNTemQ5MkVrWHk2b1lGNnhVU1gvaWljY3BQWjNOQkljY3lHM2FRNCtZOCt6U3RhdTVyL2xoWUNPU2RDRjlqK0lkb3FOT0dtVXdlSWd2RG1yMmlJZTBHc0liNXhqYUJTcnBvZy84OU1WbmN5a2xOWVgySDN3ZzllN2JoOHZDRXZJWkg2MGhqUG1MTm5BL2N1eVpaOUN2Ly91WmZsNFdlUmRyUXlmSDBqSmVPdVY3aVZuTk15bWQ5eWdWNWhkUWEzNk9NVGUvbUlyOExzcE1jMUhMekJRNmMwUXZhcGRaeU5abE9oM1l4VThadms3a0x5Nm10SXdVT3ZuNEE2aHJ1eXg2ZTg1UzNwUlR4aTlzZC83aVF6Zmt5RnhPcUMvL0NBbnRwSXJHdGY4cXdLbURyUHJGSDhveXBKeERwd3ZsangycTJLa0t5eXBuMHlZVHJ4MHBoTm9QaFN6RkhvcGJvVWlFalhGR1NnK3ZHMCs4bUJYcWxLbjNFM2JJWWpOUTJ6YXRLKzJPbGQyejMzLy9QYzJjK1ZJOHpWZGJGczg1aHZDWHVXQzkveFI1c3NGbTI5YXQxR2Z2dlhtcEVNUUlIRUlFaWE5dDRQb21oUjhINmRxOUszWHIwZDNVazdySWJ5ek83Y1lqTFY3eWxzc2pKeTYrbmVqbmgvcHhGbndoeDQra1pMZDEwVjdaelduRUVjZnltM00ybTN1TnhkNGszc2pqcGVHSDlhQVJSKzVEV2MxUzZLZmxXK2pYTlgvdy9jWjBLdVA3a1U2NlJHN0ljWjdLblR4emJVc1JVQVNNZFFTQ25EOS9Qb20xaEtWSVdGQ0pkaUNBRUdsWXZWVzBzcHdkQVVodjhlSWw1bjZqdkFBQVBTQThaTWdRczN2V09XSUVDWVlJQzRRSFp4RS8wdVhjaFN4TnRza1A0V0lScEZYV3VzQ3hyTXBRMlVESThzd3Z2N2NuMEpjdHNVRUZpNHJLK1FIK1lscisrelphdjNVSE5jL2lseGNVbFBKcitYanNmRUZRemtSWnpoWmtQbHVYQlVYOGpsVTNEeCtmRWNOYUpHL2tNVVNhVms1TGY5NUNhemIrd1lUcDR3MCtzVDBtRXc4UTJKQURKMzQ4ZGFzcjJ3aVhWYTFKVzkySnhaWmZrN1pxVWlmYWFHclNWazNxYVArUkVhZ0psaldwRTdsM1N6RlhWTHpSU3NKU3RFakI2cjgxaytQSUUwY1Fub1dzdWF0OEx1RVc0Ynp2NTRjMWp6cE91Y3I5bytXU2ttSnpIeEhuM0x0UEg5UFpTcjcvaU9YWGdnSnM2bkRHVlR4WFY4QWF0QWpPdWdBSW5XdTc5aDNZOGtuaHh6a080TTZ4QkpzVUtJK3hXREswckVsaVV2SFMrclZyYU5XS2xRUkxNMFRBSVRMMitXQkNoZHBIS3czSm5YZlJtWlNYdTVVdnlKYlIxR2Urby90dk9KeXkybVR5T1RNcCtyeFVVc3Izbi9rZVl4TEhYYnlSQ1hoNStaeFNQQ21jeHcvOXA3WG1SMzljTk9tSlR5aHZkeTQxeTJqT1Zxano1OXRrTnVSWUV6SmNXWVQvQTRYbmgwOHBLUzkrdEh5azI5dVNKUlI3R3NxRXR4T2VqekoySitYRnQrY2hiRSszdDZYOVkwa3EzRXFwaUJmd3MyT0dlTGdUZk1XUGxvOTBlMXYxaTM4QjcrenIzSWtma2c0dTExbjN3T1IvQXI3ZGRjbk9qbksvVGM1YmZIc3RoTzNwNGVkdnYrOW0xZHUrZlJzSDdPV3NjUGg0ck5MNGxmYkZEK1ZZSVh1NnZkMFEvdGgwdEo3dmNXS0g2aUdISEdLK29ZaVhBQ0N0YTVldTRRMkd4ZEUrbkwwZkt5WDhOelRYckw3THlyeGhiOGV4bG85UjdxaGpqcVpzM3JDRUpWWTQ2eDZqaEswK1VRNEV1WFh6Wm5ydnJYZHNaV1Zlb3g5clhMQ3NLdUpxdGRWUWZwTmNHVFRsZ1J0NHVUU2ZsaXhlU2R0ZE9aVHQzVUJ1UHkrYnBub0M5dzk1dnZETHgxMCsvZ0MwcDV5UytiR05YZHZXMDJ2dnorWDh0alR6VFg0T2Nsc3VwYmc5YkhHVzhNdklvejhxMDFETzJ6Nk9CbVU1eW1RVmhXQU5GTE14ZkNKWmt6RTB1ZXo1OGc4bnZweXV2WXpVUjU2VXd4S0tWZGJxWC9LUWFLK0xkS2t2ZGUzNWtpWSt5c1BaeTBoOXBFczU3YjhwNC8vaGh4L1QvZ2Z1VDRNT0dFU2RtZml3SzFRMmJWZ1dpVFZQU2twS2FPMjZkWmc0OU1FSDhpeWRmVzZGNXBNcEZQeXhsNGsyL3l3eXFHNytWMTRTdExkZG0vNnQ1ZE1PSFR0U1I3NVF3TGwreEs5bXczaU9PZllZczdRS1ROTFMwbml6Q042MUtuMkY5MitQQndHb0ZFQzc0akQzOEVKd0s4bmFYSVAvV2FTam5KU0Z4WWpOVTZ0WHJxRDMzLzRQNTd0bzFKaVRxVmVmdnR4VTZPSkNkQm5hdDc3ZEtIbFdXMlZsdUpjWDZoL2xHcEw3NFAyRmRNN2xZNmhGODVZMDhLRDlxS3hrYjlxOWJpa2w1NjJnRlA2SU05djNadlJKcWVtVXhJOXhiTmxaUW85UCs1cGF0RnhOS3pkNXFYbjZPbjdYYWluTERJU1laSlpVZlg3ZXhDVWljK2hrbTlDR0hHdFNXeFBMUHNHQnFIMGlXUWhqd2xvS05aU1B5VzJsWVZJakxIbWhxMENyTGFzTmhLV08rS2hqdFMxOVNoc2lVYXV1OXEvNE96WC9Qdjk4THMyZE81ZnduQ0VlcDRBQ0ZoSUNJVWc0aFpmMnZwajdCUzNoQi9TZG4zK1c0Z1l4RnhZV0dxVnV6ZmpRL01lT1ZsSDh6dmRQMUplWFVmRlZqQjkvWEV4dnZ2a1c3ZURuT2FGUnY1Ky9nTWJ4YzVZREIrN0hiNlRwU2xobWpkNi85WCtMLytlcUhHUm5sVUZCRjFzM1pieGs2T1BIRkt4bFFqL2ZVNE5EdWR5OFhaVHQ3MkxrZ3ZOZnZPaEh6ckYwQjhJOWUvY0p0TVZsYzNlWnNTSGYwaVZXRzlaNFhkeEhPUk94RUxEcEl1YWZ1NlpPQ3VJZmM2VWFGTVRMMFcrODRpNDY2ZFRENk5BamhwaWR1dDdtZzZrZ293OGw4MDdXWlA0QTEvclpYOUNHaitmd0czQ2EwU3IraHNYWHk3YlFmb1BUYVhEZlhQckhHOFhtdnFTTDU0dTNOSTA4R2J3cXd2Y2tuWGFKM0pCVDc1YWpUQmlBSnVRa2t6NlVaMDNDRUxDaFdTK1QyMUpTVmduN1B3WGFDS1FHcTB1ZFlJSUppQUt3aUJGSktHZjlBMGtiVWlNVWw3YTBmOEhHd2sxaWlyL01GZkVGbjFEY3dzcWFmMTI2ZERZS0dHa3kvMEdVOW5oMmRxZmdRL2hPenI4TjY5ZXpSVlpNRHp4d24ra1BQM0toYU84L1B6K2ZIKzFZYjhvNDJUK2ZNYitGSjhNOHBnTHloNVAvUDl4dmZQcnBaMmdRUDFyU2hsOHB0OExxMlB5UG9sNzQvMThnMjdRUjdjZWFteUFwM0dlMDVGSlNYRUx1akxSQUZjakkwZ2MvTGx4a3ZsdVlsZFhTeUtXRWNiS2NuNHI1M3VpbUFCNjVlYm4wMWR6UE9jdVNyOVVIMmdnVVo2K1krN0R5V2E4RnlvVnk3U0ZiSlh0eUhZVlhyY3lsajk2ZFMyZWVkUlFsOFFrVUZKZFJTWGttMzFOdHdYNFNkUnpWbTN6OFNhcHRDK2RUQ3o0bTc5K0xldDV4SzYxY3M1bkdwaXloNWIrdW9yVXJkMUgvZ1R0by9zSldDUmwxSXQrUTQrcldkYTg2bG9CMEIyVVFjcUlJck1ray94U2gvRWdobWREaTI4dEVTclBuSXl6LytGSlcvUEJ5MGVKU1hueDd1VWhwOW55RXRYK3gwQzNGRkF0bWRneWx2UGlSOHV4cDRXSEZ2ekwrc0F6eHlJaGdZOGNNYVhBZ1JteVdFZHpGcjFqV2txazlMVHdzZlVoOThjUExSWXRMZWZGRDVTd2RBMEo2ZU94dU9yeFhZU2pMRnBydzNpRDY3dmQybkdLUkk0Z1FybG16ZEw1bmxteUlpMjkybURUN0R3ak5Ta2NlK2dLTzhtZ0hpRm9lQWhCZGg5cFdXUzgvN3dlclROd2gzYmJTZzZOaGhWWjI4OWUyb1Z2K001Z3pVRmR1dTFRZVQrV2F6cVgwMktzOS9lT2w2L2dySENuV2g0MTVIUG41WHI0WDZhVlY2MHI1L21NeXRXdmZnbkw1WlEzYlAvK2N5dGI4UWdQR24wZTlocDlHdTNMWDBuZGYzRUl6WmhUVG1uWE9QUmZyM05sVjNWSTlXSTRoNFFvUnloRHRjVXhzK2VlUi9IQmZyc2JFdCtkSFNyUG5JeXo5U1ZueHc4dEZpMHQ1OGUzbElxWFo4eEhXL2kzbElWaUpINDVUdExpVUY5OWVMbEthUFI5aHhiOHkvaUE5TEZuRzRnUmo4ZTExSXFYWjh4Rk9QUDVNS09aRHV5RXlzby9CNmg4WXlCSW53aTRtL2hKK1NiWUhkQlFjbytnaWM0RmdGZU04MUlPVDVWUE9NT3JOc2dndEFyVkt5RzlSRWU3WG9SQ1hZWkRRVkhSbmxRczBHcjFZQW5QVy9MNkZMcm5nTVg0RzlXemFwMzlYakpyZmw1cEdMVnY0YUdjQjBWZHZmMDNISHV5aTVlWDdVT2J3RTZtai94aWlicjFwOGZMdmFPUFN1K2p4SjlJYkpURUMwam9peDhCc0Nnb1JFOE9LeUtRTFp0a0M4czlqUzlLZ0lxQUlLQUl4SVpDY3pCWXdyWWxlMXVnZys4VTYweEJIeTh2NTJiMzhRc3JNeEh0ZXJYd2hRdEZiNGJvcFNIUGNKajhKYVBvMHR5eURlbzc0TVpRaXZ0ZG9mWWxEaURuVWU2UmhvcktVQ0RRVWpFY3FuNWkwMzFmL1FXZWYrU2hkZS8xSXV2Q1NQM0VuZU5ZeGlmcjNhVTQ5cng5RjNxMHJhZU5ybStubEoxK2lkaDNLZVFOUEgycmJZaEg5YTFiYnhBeW9qbHF0STNLMHprWW1GQ1lnbkxVY0lrSzMwbUw5UlZ2bUtzNVVzRThpYWNHZVpvV3RPc2lYQ1lld3ZSemk0dXpwOXJDVnIvMHIvanIvNVArbzh2OUh4ZjhySzcvdS92LzQzWitlenJ3TVdNM0x3bm40RnVsWnk2cWlsekRPMGxMKy9oSTdFR1RGczBNTTlVTHozK1JieVp3RFRIQUVFemdNWXVUM2pKbzJUV21UWmd5RHNISW1vOUlQNnNoU2JhWE1Pa3Q0YlBxSDlOTE1MMm5VcUVObzZHRjlxVStmTHRTK1F4YWxadTlOWThaMm9EVXJodENYczcrbW5JOSs1N05xM01RSVVCTk1qaklSNU42RzljK0VpUldyQzAxQ3E0N1VOTVRLSWpEVDBDUktEcmNjbkp0V1dwQ0VyZTdOeEViL2x0V0tBSmV6VmJmeThDdi9CSllmYXBjenVDMXpIbUY5bVVwaGFkcS9EYXNBcHNCcHo4WS9OS0ZVL25VbmZ6eWY1L1prODZNRGFZYjRRbEl3LzVrVmYwd21mdkRHR3BBZHNrRkNTSE9aaC9tOTVmbVV5UnQwc0lQV0ZCRGR4WVd0LzMrakNMaUdWUWQxNWFMSnp6dGZzWmtLUzZteXFRcnRXdnBQeXFQUGFFNFVTZjBUbzR4dzE2NENldm5sejgwaGFSWDg1THI5ckZtRnZoMk9KSmdjeld3ems4R2FNS0hsVkp5SHpMT0s1MVN4akZVT0U2bWlreFR4SytTR0pRYjc0WFI3bGpWSnVhWTlNZENRVmNmS3NOY1A5aU4xeEE5bVZHN1BYdDllWFBzUG9HRUhaWS9CMzVyN09CMlZ2d2kxNHIrYWsvUGZ4V1RvZHJkaGF4RzdTUTNxZ1U2amUxaitOR1BnaStQUS9VR2tjUjNEU3o3eWxidjREUzhGbEpyaU1ZOHplSmdrVGI2NTMyanVTZ1k2c0loTStpNW5zaTB0S2VWbk5TMExWUFJmYURRZ1NibG5HVXF0RUFvT0JLbnlUeEthVnhYS2FzUnhCQkpNanBaQWcxZk9FWWFQeVlrRDcrc0x6VW9VbE1sZ1ZaTDVLamxtS2txUndIeVJhU05sSmR0cXdkWWtGNnhVTmxESm5pNzFrQmJlcGttVERnS1Y3SFdsanJSaGZGdjVTbVcxZnlNVU95NkNuV0FwUHRKTjJJYW5wTUVQUUJrMmd3SVpnWUwyZm9KdGNjQ2VqcUp3SnQvbUI5TzBmMEFSQk0yT25XQm1GUWo4MnZDcVZEWWdOSHU2MUpXMnhFZUhTZGdSNnVkUElmR0dtNlNrVEk1bkd2WGhMZWRITEtCVElIMzQ1alZ0MGxKRnY5eFh4dmNBK1dVQ3BxMkF4UmR4QVB6U2JYNm5hRUdoaXdrNHlieEZCODlDUXErNThNSjRidFpuK3VKWHEvRXIwc3A0UnlydVc4SkpjeWJDVm1sU0VyOS9sRjlBYXBFbGNnVVVxMFNGWDFNNUFJekpxTmhhaGJJYWNSd0JUMXJxL2c0MUdoSXl6eE16Y2VCYndnK2ZCRlpadkY4d2hkOUZlOVdWWjlGRmw1eEtMVnBrT2pRV2JVWVJVQVNhR2dMQkMrM0FjaWFXTWd0bW4wUGVkYk1qUXZINDQzK2oxTDFHbWpjUjRVVUxPR1JKTkdLRldpYm01UlhRekgrOFE4OCtPNHN0U2lqSjZoNktGektFdnJUclVBbExmaTBIcHRVaklsQkx5OUVpT1V0d0lqQVFvOXhqeE1WYktOMGFBU3hGaEt6UG44eWJQMHRKTWFKb05GRVJVQVFTaVVCNXp0ZjhuY0hkUmw5Qlo0RWNFK253SXJYTFRuRFIyWWVQcGluM1BzMXZrQ0hxMVRhZUY2bmJ5ZEFlVHVTb20yN2J0U1JIQUdjblB3bUQvVUNDOXJnRnNsbmo1NkNQbHpTdXZQSWNKVVlMRnYxVkJCU0JPa2JBKy9PelpEMVlVY2NkYzNlM0hSdERuMWlxWlZXSzVWdEx6OXI5R09wcmtWb2hVSXRMSlJDZ2tack5GNnRReG1STVJGcytCRzNWOGZuTGVTbDFyQlJVWHhGUUJCUUJSY0NPUUVDOVdnWUZkS3ZvVS9nU3RsZlFzSk1JZURyeVoxaHE2aUFzNjZJbXNJektEVmtpQ3dnT1Z6NmNaaTJ6Qm5hR0dZdlN6MnZ1K1dvMTFoUjRyYWNJS0FKN1BBSXBxV25Vb1hNMmIvcmhUVHg4dG1aSExaWitBK2FrMGI4QlkyT1BCNk1lVHREejVkd1pjWGNMb2RnRkEvTER6Vy81ZWdDK0lJQkQ0bmpidllTUmpycnJBeS9xamJ0enJhQUlLQUtLUURVSVFDZVp3OVA0M3VrcHB6YjRrSUgwOGQrbW1XY3NvVFB4cVM3NDBLWGgrbGZxcU84Y0FyVllWaFdMa0w4QXphOUVFb0lFK2VHQldSR2drQ1R5eGFGODZLRllTVlZmRVZBRUZBRm5FWEIzUHNyWkJ1dXd0YVNPUnhnalEzU3FHQ0F5Qk9oVWtLUzZ4Q0JRWTNJVW9ZQUVjY0NKRC9KRFBvUUtoekFFaXdOaE9VeW0vaWdDaW9BaTRDQUN4bUlNV0k0cGZjNGlkNWRZZHI4NE9BQUhtbkl4TVNiMVB0dm9WT2hWT1NjeEtxQkQ0VVRuT3RDbE5oR0dRSTEycTBKUXNBNUZVSWpEaVpVSUh3UXBRaFd5dEpjVDRZYU5SNk9LZ0NLZ0NOUVlBZWdZMFMwSUozbFNLT1A0bDZsMDFkdFVudk1kK2NvaWY2R2p4aDNXb3VLdVhic29QZDM2ZURUR2FzYWJuRUd1OW9kUWFwOXh2RFNIRndhRXpnZGRtZGZZQlh6b1gxTW5ZSnpVWWloYU5RSUNjWk1qSmg3SVQ0UXBiWW9RSlIzRWlMSTRFRVlkQ0JNSDRrS3NVbDk5UlVBUlVBU2NRRUIwa1BoSjdtUks2VDJPZkQzSEJuVVMraEVTZGFMUG1yU1JzMlFKZGU3YzJYdzdFanJSNC9HWU4rMmtwT0ROUDVacXhqa2dEejRjOUtqb1ZEay94Q1cvSnVQUU9wRVJpSnNjUlZob0RtRVJsZ2hNU0ZBSVVTeElFU0I4T1NJUFNWTVZBVVZBRVlnZkFlZ2o2Qlk0dTU2U3VPUkxHVk13eHAvcE01Nmd3c0lpdXY2NnF5a2pvK0xMdFpHTy9Nek1ETHJ1MnZFeHRtaFpnYkFFUVlyaThKRmxwR0dNNGtPbll1eUk0NUM0L1h3UVZ1Y3NBbkhmY3hReUZNRWdIaTVFRUNPRUt3SkRHSWNJMWRsVDBOWVVBVVZBRVFnaEFMMGpCM1NSSEVJdUlDTUp4K29YRnhmVDh1WEw2ZjRISHFMaTRwSmdmWVNSaGp4OEtEclc5bEJPeGdpOWlESGFTUkpuZ3pTVUFXRktIQ3R1b2x0RnA2S2NPdWNSaUJ0VkNBc09Bb1dEWUNBa0NjdHlLZEp3WUJKSVdSRXM0bExIVk5RZlJVQVJVQVFjUUVEMGt4QVBmT2lvZUVnclV0bWJicnlPdW5mdnpvK2diUWdTcEJBajBwQ0hNcEhxUmt2RHVFQjhJRVVoT0xPa0dpQkVxUWRZRUliZWxQTVRuU3IxSElCT213aER3TVVrVmFPOXdDSWN0QWVCZ2ZnZ1FDeWp3c2ttSENGQ2UzcHBhU2x0M0xpUkRqbmtFRk5XZnhRQlJVQVJjQklCVVd2Ui9KcjBoUThXVDc3blBscTNiajJUWVZmVHhOcTE2NmxidDY1MHgrMFR6TEpxUE8zT256K2ZldlRvWWZTbkVDSElFam9UUHZRcTB1RVF4N21BREhHSS9rVVpJY3g0K3RheTFTTVF0K1VvWkNkWExJakxFVzRaUW1oU1hxNThFRWU2MUs5K2lGcENFVkFFRklINEVCRENnQy82Um53aG1Iajk1czJiMGNRNy84ckUySTFBaWpnUVJocnk0bTFQZENCMEk4THdvVU5oUFNJY2ZnNUFRSFF0eWlOZjlHdDg2R2pwV0JBSTNRbU9wVFNYRVlISVJFTTFoSEZWZ3dQQ0VzRWhEMHNHZUVNT2hHNG5ScVNwVXdRVUFVVWdVUWhBTDhHSjlTangydlJuNmIyUXRaYVVGTHEvR1crNzBKT2lOMUVYK2xFSUVuSFJvL0NoTDZGTDRZUVFoVlNkT0MvVHNQNVVRQ0J1eTlHYUhKWnBMNVlpbGt4RlFCQ1lFQ1R5SVZSTUFMa1NRaGpsSVhCMWlvQWlvQWdrR2dIb0ppY083RXFkZk05VVdyTm1uYkVZWVRVaWpEVGt4ZHNIOUNNY2RDSDBveHlJSTA5MHBCZ1YwcjZVRjVLVWRoS05ZMU5yUDI2R2dpRGtTa3dFaXlzYUNFb2NoQWNDRkVLRVVGRVBQaHpxUzFqcXFLOElLQUtLUUVORkFQY2JKMDJlRWlSR0xLWEtFaXNJRW5rb0U0K0REb1NPaExPdnJvbHhZZGVUS0FjZEdrbi9TaHZ4OUsxbHEwY2dibktFSU9US0JzSzFreUtFaVFOcHlFTllCSWM2a3E3RVdMMWd0SVFpb0FnMEhBU21QZlJvQldMRU00MDQ3QVE1N2FIcGNRMFkrbEhJRHZvUkI1eVFKdlFsOHVGRWQ0citsZFU2cEt0TERBSnhreU9HQWFGQ2tCQWlEZ2dRdnFSQmdDZ0RKOEtWU1lCME9Vd0IvVkVFRkFGRm9JRWprSkdSUWZ2dTI4K1FJVWhSbkJBazhzSmZEaUJsb3ZuUW1kQ0Y0a3M1SVVYb1VhektJUitIT05RUlhZdDBKVWhCeGxrLzdrYzVRSElpR0NGRkRBa0NFeUtVc0Z6dDRORU5DV1A1QUhGOHNtcllzR0hPbmswamEyM2V2SG0wWWNOR092MTBmbytpT2tWQUVXaFNDSHo3N2JmOEdFZzNTazFOTlRwVlZ0bXdXeFU2RkhHUUgvUXR3a0tDQ0NOTmRLcWRPSnNVZ0FrKzJiaDNxMElvY0JDZU9BZ0pjZVNKdVkrNC9hb0dlYkt1anJDMEkyM1UxTC80NGt0cDd0elBJMVpmdTNaMXhQVHd4TVdMbDFCZVhoNGRlZVFSNFZrSmpULzg4S08wWU1GQ0dqTm1kUEF0R0FudFVCdFhCQlNCQm9NQW5sMkVFLzBKblNscFNCZjlhU2RHMFp0Q2xGSmYwaEZYNXd3Q2NaT2pDQXpkSXd5aHlCVU0waENIa0xFY0VHNWxRc2hJdzJFWEx1clYxUGw4Zm5QMWRlNjVaMWRvd3UyTy9kVCs5YStYQ1FRNVo4N3NDbTBrT25MLy9WTnB4NDZkRmY0aEV0Mm50cThJS0FJTkF3RXhKREFhNkUwaFJoZ1I4dGlHRUNQeW9XOUZoMG9kcEVIZnFuTWVnZGdaSk5BM0JBRkJ3UW5KSVc2LytrRVpITWlIOE9CUUJrSzNDOWxrT1BDejExNDk2S3Fycm5TZ3BjaE40RnprUENLWHFINEhicVEyZXZic1Nmd1gwVVVxSDE2d3VqTFY1WWUzcDNGRlFCR29Pd1JFaitML0ZBNzZFdVFuYjhPUmRCQ2xoRkZHZEtnWUdOSk8zWTI4YWZRVTk0WWNDQWtDRW1FQkpyRWNRU0J5SllOOGhFV0FFcGMwU1U4MHpGOTk5VFVkZmZTeE5IdjJKOEd1WnMxNnphVDkvdnNhT3ZQTWMrajExOStnRlN0V21MUm5uMzB1V082Zi81eEpwNXd5aG5yMDZFV1hYbm81TFZ6NFF6RHZrMDgrTmVYbnpQbU1SbzA2eFpTQnYyVEpUOEV5ZUZueGxDbjMwZENodzB6KzZhZWZhU3hVS1RCOStneTY0b3FLYi9GLy92a1hlSm4xTkZQKzdMUFBwYmZmZmtlS1UwN09adFBuTysrOFMrZWRkNEVwZzdiZmV1dnRZQmtFWG4xMUZoMTMzQWttSDM1NGZvWENHbEVFRklGNlFRQTZVS3hIRUJ4MEpId3hLa1Jub2h6QzRpTWZZWEgyc0tTcFgzc0U0aVpIdVdwQjE3aktFUjhDZzRPZ1VBWjVRcFltZzM4Z1lFd0crRTQ2OUJsK1NCKzRqOWluVDErNjhjYi9vNTA3ZDVwM3V0NXl5d1E2K2VTVGFhKzlldEMxMTE3RDVEV1VPblhxU0xmZi9qZjYwNStPTWtONzZxbW5hZUxFdSttb280Nml4eCtmd2VNdXAzSGp6cURmZmx0dTh2UHo4Mm4xNnQvcDdyc24wNFVYWGtCMzNuazdiZCsrelpDaEtjQS9qend5bmJCa2UrdXR0OURNbWY4d0h6WWRQZnBVUWwyNHJWdTNtdkdZQ1AvTW1QRVlUWnAwRDQ5bkNEMzU1TitwYTlldWRNTU5OeEhJRUs2c3JOVDBlZjMxTjlKaGh3MmpoeCtlUmgwN2RqTG5WbGhvUFdPRis2KzMzbm9ialI1OU1zMmE5WXE1ajRweng3MU5kWXFBSXRCd0VJQkZDRDBwaElnNDlCaDBGM1Fubk9neHhLV3M1S0VlblBnbW9qK09JUkQzc3FyMERBSFpMVWdJRG5FSUNnSVZzaFJCd3NlQkNZQThTWmYyYXVOLy9mVTNUSFM5S3pSeHdna24wRFBQUEduUzdyOS9DaDE3N1BHR2VIQ1BiOUNnZ1hUZGRYODJlWWNmZnBnaG4rM2J0M09aWTB3YWlIRHExUHZwK3V1dm81dHV1c0drSFgvOGNDYktvOW5LZk4yUXFFbmtud2NmaEdVNDFFU3hISExISFJOcHk1WXQxTDU5ZTJNbDl1N2R5eEN4eCtQbUY2MGZUQ3RYcmdwZVZFZ2I4TkhuUXc4OVFsZGVlUVZObUhDTHlSbzU4a1JENkxBd3NXbEhITVkwZnZ4VkpycnZ2dnZRaUJHajZNc3Z2NklUVHh4Qnk1WXRNK25ubm5zdXRXN2Rpb1lNR1VKang0NmhEaDA2U0hYMUZRRkZvQUVnSUlZQzlLRVFJL1Nua0ozb1NneFY5S3JkdHhPcDFHa0FwN1hIRENGdWNwU3JHdmdpS0VsREhJTEdJV2tJUTRoQ2hnakRpZThFa3Z2czA2OENZYUhOTm0xYUI1dHUxYW9WUGZiWWREcm5uUE5NMmhkZnpBM2U4QTRXc2dWV3JWcGxZczg5OXp4dDJyUXBtSU5semM4K20xdWhyLzc5K3dmekJ3NGNhTUovL0dHUjQ3aHhZK25tbTIraHd3OC9nbzQvL25nNjRvakRtV0NQTkM4V0RsWUtCRmF1WEdsQzRUdG1qem5tYU1JU3JsaWJLQVJ5Rjlldlh6OFRsSEVPSHo3Y2tPemhoeC9KUzZ2SGN0K0gwZkRoeHhFd1VLY0lLQUlOQndIb1NGbGh3NmlnRTZGRFJZOGlEV0hvVGxsK1JSaUhsRVViNmhLRFFOemtDTUZBSUNBOUNCWU9jVG5DaFNseHFRTmZCT3pVS2NGS0F3bFU1VnEyekFwbXU5MVZyeWJqT1V5NGd3OCttR0Q1aVR2Ly9ITnB3SUFCRWpVK3J1N0V3VHEwT3p5L3VQLytnK2pqajJjVDduM09uUGtpTC9IMm9UZmZmSTJ5c2tMalFSMnYxM29SdTcwOXBFc2MveHppUEI1ckN6aml3Tkx1Y0tHd2FORUMrdWlqMllUbnFQN3lsMXY1VFI2WnZNVDZiOXB2djRwanQ5ZlRzQ0tnQ05RdEFtSVpDa0hLYmxVUW4raEkrSWlMcnBYL2QraGY2Rlk0MGFsMU8vbzl2N2VRWm8veFhDRUlPQWhXaElnNHdwS0hPSVFvQ2gyQ2xlM0pLQ2N2QlVDNXVuRDRRdmVmLzN3ZG5YVFNLSDRGMUZwemoyN1dyRmY1SEVKa1ZsSlNFaHhLMzc1OVRCaUVlL25sbHdiVFlUbkc0elpzMk1EM0JEdnlmYzAvbXdQM0EvRmM1dno1QzlpU0hGNmhxYjU5KzVyNHdvVUx6VDFIeWZ6Kysvbm1VWldXTFZ1YVp6RWxQWnFQKzVqQUhrU09BMHU4Qng4OGxKZU8zMUZ5akFhYXBpc0M5WUNBRUIxOGtCMTg2RXJvVWVoWGhLRkQ1YVVBSUVNaFF1UkwySzUzNitFMDl0Z3U0eVpIQ0JEQ0FNbUpneEJGa0VqSElZS0cwTVhLaEtCUkYwSkdlYWZjcGswNVp1blIzaDdhbDN1SUR6NzRFR0dwODQwM1hxUE5temZUeUpFbjA3UFBQaHU4YndkckN6dFdjV0NqUzNaMnRpR1dlKzY1bHpmUnBCbnJEN3RRLy9yWDI4MDlTTnlMck03aFBDKzY2RklDNlU2YjlvQzU1d2RMRGs2STBONEcvZ0d3c1dmYXRJZU5WWW5sMm0rKytZYkgvQ2JmeDd6ZFhyVEtNRFlTUGZmY0MyWVpHVmJyb2tYL05lVmwrYlhLeXBxcENDZ0NkWVlBREFZNDZBcFlqZlpWTnRHallvU2dIUFFvNG5ESUY4dFJmSk9oUDQ0aEVEYzVRcEJ3RUloWWhqSWFJVVFJRGs1OHBBdEp3bmZTNFh0cUsxYXNZQXV2OG5PT2VFUE9kOS9ObytlZmY0RWVmZlJodmcvWnhoeFhYMzBWM1hmZkEveFl4TkhVcjkvZXhxTDg1cHR2emYxQmJIVEJocGk3N3JxTENkekRPMElmNVYybzI4MlFrWGZOTmRlWU1NNHAzTm5URUg3aWljY0pPMlBQT09Nc1V4UTdZckVMdFVlUDdoSGJ1UFBPTzh6a2YvVFJHYVpQbEwvbGxyL1FaWmRkRXJGOGVQK0lYM2ZkdGJ3TGRodGJxdGViYkN5cDNuREQ5WFRxcWFkR0txNXBpb0FpVUU4SUNOR0pMa1VjWVRFY29FT2dRMEdjOEpFUC9ZdDBsQkZkaXJnU3BQTkNyUEc3VlVWSUVBeUVCT0VoRFFmaUlsaUVrWVo4a0NsOExLdGl5ZkhRUXc5MS9veHEwU0oyalBMcEJDY25tc0xZZCt6WXdkWmNTNTZjTmJOMnNheUxjdzYvenhodHFPaHoxNjVkdGRwRWczUEp6ZDNGTzFaYkcxbEU2MHZURlFGRm9INFErTzY3NzZoTGx5NlVscFptL2tlaE0wR0FJRDZFaFJRbExxTkVIRG9DUGh6Q0tLL09XUVRpdGh4RkNQQkJkSEFJNHhBaFFhaFlNa0Fhcm1qa0NrZXVrRkN1SVY3cFJDSS9uQU1zenRxNDlQUjA4NHhqckcyZ3o5cnVMc1c1MUhiY3NZNVh5eWtDaWtEOENPRC9IQWVNQnBBaURra1QvWWk0T0tSQmQ4SWhYZlN2bEpWeTZqdURRTlhiTmlQMEljS0NMeVFuUWhLekgzRVJJbnlRb3h5STJ3VWJvUXROVWdRVUFVVmdqMGZBcmpmRkdzUkppNjYwNjFIb1REbFFSb2dTdnJTRGRIWE9JUkEzT2FKckVCd0VJbVFvZ3JMZmd4VHlSSG5rNDhBRWtLVUF4TlVwQW9xQUl0Q1VFWUFlQkJtSzdvUnVSWnFkQ0lVazdXVlFSd2hWZFdsaVpsQ05HUW9DZ2JBZ1RIRWlVQWhUQklaOElVUUlGSGx5U0QzMUZRRkZRQkZvYWdoQVgwSVhRaitLN29RUEo0WUh3cmhOQlNjNkZXSFVnVDYxNjEra3EzTU9nUnFSb3dnVndoS2hZa2gyNFVGd2tpY1AxZHNGYnkvcjNPbG9TNHFBSXFBSU5DNEVRSkNpVXlVTXcwT0lFejcwcWVoTWxKVzQ2TlRHZGNhTlk3UnhrNk5kR0JBV3Jsd2dTQkVZNHJqcUVXc1JjWlREZ1RKU0RnSlhwd2dvQW9wQVUwZEFkQ1IwSThMUWphSXpFY1lobGlMU3hVbDVFS1U2NXhFSUlSMWoyMEpxRUNJY2hDWUNFMStXVzFFV0FvUVRJVXZjSk9xUElxQUlLQUpORkFIUmhmQkZyNG8rdGV0TGV6a2hRdEcvUXFKTkZNS0VubmJjNUFoaFFGZ1FJa2hRaENVQ2xud3greEdISUhHSUlCRVdnU2YwN0xSeFJVQVJVQVFhS0FLaUEwR0VRbllZS25RblZ0L0UyZk9nZDBYL29weVFxcFJWM3prRTRpWkhDRXFFQWlHSmdNWEgwRUNDRUNMSzRoQ0JRcEFnVk1SVnFNNEpVVnRTQkJTQnhvZUFrSjdvUitoUTZGYlJuYUpmeGNjWlFtOUcwcitONyt3Yi9vampKa2NJU3F4RENCRU9Rb2JReEVxVWU1RElRMWdjOHRVcEFvcUFJcUFJaEJBUXZTZzZGRGxpUEFnUlNoeGxjWWdlUmxraFdZVFZPWWRBM0d3RklVRVlFQTdDT09SS0IyRzcwQkRHSVU3cWhhZEx2dnFLZ0NLZ0NEUWxCS0FUOFRZeCtLSkhFUlpkQ2l6a3NRNlFJc2dTK1FoTE9ZVFZPWTlBM0tnSzJVRjRjQ0lrQ1VONGNCQWNIQVF1WmNWSG51U2JRdnFqQ0NnQ2lrQVRRd0M2RlBvUk9oUmg2RTdSbHlCRXBJdCtSVHJ5UmYrS25rVyt1c1FnRURleUVJNElSQWhPQkNiQ0ZJRUtDVW9jQW9hekN6a3hwNld0S2dLS2dDTFFzQkVRZ2hNOUtYb1VvNFloZ1h6a1NUbWtvNHpvVWRHL1NGZm5QQUp4a3lPRUJxR0E4Q0FveENWTmhDaHh5VWQ1Q0JTKzFFVjlkWXFBSXFBSU5GVUVvQjlGSHlLTUEzczB4R29VWENRUHZ1aGI2Rk9Kb3cxMXppTVEyaThjWTlzaUVQaENjQWdMOFVGNGNKSUdJV0pOSGNRcDVJazhXV2VQc1ZzdHBnZ29Bb3JBSG9VQTlDQjBvdWhSaEtFdlpVYy8wb1U4b1MvbDhRNHhQbEFXWmRDT091Y1JpTnQ4Z3lBZ0VCd1FJZ1FGd2NHSklKR0dmUGdvZzNRUkpNckpKRUJZblNLZ0NDZ0NUUkVCTVJhZ0swVS9pbTYxa3liMEtQU3UvVUE1bExIcjJLYUlZU0xQT1c3TDBTNVFEQXhDZ3RCQWduQWdRamk4VHhWNWlPTVFrb1F3cFEyRTFTa0Npb0FpMEZRUmdPNkVIaXdwS2Ftd0sxWElEL25RbjdBYXhRaEJIaHpTUmY5S0hEN3FxS3M5QW5HVG93aEdDQTZraHpTZmoyOGU0MkNCSWMvNHpIMHNXdktWODRlUGVheGxaYVVtbmFjRGwyV3JrOVBWS1FLS2dDTFFGQkdBL2l2M2xySnV0RmJhZUUwdW9DdjVmbUtTaDd4bEpRWVdzOVRxdDNhcUd2M0xPcmEwcE5RUXB0Y1hldUVLU0ZISVZBbXk5alBLeFNRVzE5MWNGQmVMRCtIU0xZdXA0TnZieUx0NVBtK3hVcktydlVpMEJVVkFFVkFFWWtQQWxkeU1VdllhU2MwT3Y1L2NHZTJDUzYrb3JRUVpHNGJSU3NWRmppQkRXSVVDZXNuMjVaVDM1bEhrTDkwZHJYMU5Wd1FVQVVWQUVVZ3dBcDQyKzFHck03NGtsenRGQ2RJaHJKTnl6am1iY0d5KzZBSXErZkcvbFpyZCtkQTArdU9xSzhnZnVLY29aanRJc3ZpbnA1UVlLeUdtQ1lxQUlxQUkxQzBDM3UxTHFYajFoK2EyRll3WUhPcHFoNERIWDFJY2FJSEJEQVBVdTI0ZEZYNDJoMXo4SldvL2I3QnhwYWVicXhJUW85bFlzMnRGN1hyWDJvcUFJcUFJS0FLT0lPRGQrWnZSeS9aTk9vNDAzRVFiOFdTLytYYlVVOC8vNEgyVGwzN0VFWVlZY1RVQ1VvVDFpTU9YbnhlMXJtWW9Bb3FBSXFBSTFCMEMyT1FvRmlOOFdlV0RyeTUrQkpKS2xpMmw4czJiSzlYMEZ4Y2JxeEVabWFOT0R1WURkT3hRQlVsNi8vZ2ptSzRCUlVBUlVBUVVnZnBEQUxwWkRvd0NZWFUxUjhDejdaYS9tTnBwZ3dkVG0wbjNZSXVUaVJkK1BwZjhoWVdVM0xNWHBleXpEM2x6Y2lpcFE0ZWcxVmo4ODgva3o4OG5Tb3ZTdVF2UDRsUytZckVMVEs5b29tQ255WXFBSXJESEl5QzZNQzQ5Nk1lejRWV1RuclM3eHdPWTRCUDBwQTBaU2lXTGZxRGlSWXVvWVBiSGxEbmlSTk5sd1FjZkdEL3pwSk9vNk91dmFQdlVLWlIxM2ZXVWZ0eHdjMFdTLzg3YkxLTG9RdkllOWdMNTJ4MXEycEFYQklpUEIxNXptR3dQT3VpZ0JKK2VOcThJS0FLS1FNTkVZTUdDQlpTZG5VM0p2S2NEenpMS1czSWtERjl1WStFK29pRzlaWStRLzM4em9wNlFFQ1A4dUVnM2FvdE5OOFBUWnVKZGxQdkM4NVQveHV0VXVteVpJY2ZTWDM2aHN0V3JLQ2t6a3pLT1BvYnkzM3pESU9UZHNNRXkyOW1pTFBwaElhVU5ybXdaMnFHMFhnNFErc1lqQkliTlBCQTZuUGoyT2hwV0JCUUJSYUFwSUFEeVNrbEpNUzlSZ1M1RUhEN0lFcVFJaHpqMHFCZ1dWV2xjSWNhbWdGMWRuS041UTQ2blkwZlRsK3hjTGZqNEl4TjN0MjFIc0JCTGxpNDE4YklWeThtM2JTdVY3OWpCYjNid2tzdGprVnlrZ1VLZ2JuN2xVZmdWakJBaVhvY2tMOUtOVkYvVEZBRkZRQkhZa3hGSVRVMDFweWU2RUtRSVozUm5nQ3dSaGc0RmlZSXdmVXlnMGRmclRIWDljUWdCUTQ2d0NPR1NtcmN3ZnZtMmJjWXZXN3VHeW1iKzA0VHhVL0xUVC96US81dVVjZklwNUlHUTJBcU01aUJVQ0JNK0JJc3JuN1MwTkpOV1ZGUVV2RXFLVmwvVEZRRkZRQkhZa3hFQUtjSllFQ01CSklnNExFaFphc1g3Vk1XU2hDNHQzWk1CYVdEbjV0bCt4KzFVdlBoSE02eTBJVU9NMy9McWE2am9xeStERC82WHN1Vll6THRhVS9yM3ArWmp4aEMxYVV2dUhqMzR2ckJsVVVZNko3TkV3TUtIQTBsQ3dDQklFYndJUDFMZGVOTVc4ZjNTZWQ5K1JlM2FkYVRXYmR0U0I5NDQxSzVkTzJyUm9nVmw4dEp3UkljYjJ6d0pJMjBhaWxoZUV4VUJSVUFSY0JBQnVjVWtPaEhraHdNT2FjaUhuclRIa1c4dHVKcGsvVWtnQXA1aTNveURoL3Vianp1RHNEa0h6dE81TXpVLys1eGd0OFY4ZjdIa3QxK3AyY21qeWQyaG94RmFtMXNtVU43cmM3bE1ickNjUFFEaHdzR0hRR1U5WEpaWjdSUEJYcThtNFkvZWY0djY1cjFDeWV1SlZ1YjY2TWRTRHhWNFU2bkVsY0h2RzJ4RDdyVFdsSnpabWpLek9sQ0wxdTJwVmV0MjFJUEovZUNERDY1SmQxcEhFVkFFRklGYUk0QVZOZWhIV0k2eXlnYTlLTmFqZElCOFdKQW9MNjlza1R6MUU0ZUFwOE1ML3lBM1c0SjRDMDQwbDNiUXdkVHBqYmR3ZHpqMDJSUzJ6bEo2OXFMeW5FM1JxaG5CSXhNQ0YyY25TbnU2NU5mRVQwbEpwWDZkMGlnN2k4akxDL0tlTkNabTNBNzFGL0lQSDk3MVZGYmlwNkpTUCtYdDlOSG1kZVcwNEJNdnpmMWdMUDNsemtlQ3l4bzE2VHRhbmExYnQxSTZYM1EwYTlZc1doRk5Wd1NhTkFJLy8vd0xUWnA4WDBRTTdyeGpBdTI3N3o0Ujgrb2o4ZlUzM3FZMzMzeUhUanR0REowKzdsUkhobUFuUkpDay9VQUhzQnBoUGNweXE0UWQ2VndicVJZQmo2ZGpwMm9Mb1lDTHIxN0U2aE8vdW9vZ1B3Z2M1ZUZ3UllUdlBDTHVGREdpWFR4U2tsOVNSb1ZscVZUS2srbVgxU1cwYWFlWFVqejhGcDl5WHNkUFl1dlZ6ZXY0SE1kSTJtZWwwT21IcDlEblM5NmhLVk5hMFoxM1RrSXpqcml2dnZxYWJyengvMmo3OXUybXZVTU9PWmltVDMrVU9uV3lOajA1MG9tdEVaRHd1KysrUjVkZGRva3RWWU9LUU1OSG9IdjM3dFM5ZXpjejBBc3ZzRmFxWnI3NGlva2pyeUU1RUNNY2ZLZklVY2dRdDV0Z0hlS1FOTkdkRWhlZGliaTZ1a0hBdWlrWVIxOGlIUGhDZWxWVlJ4bGNJY0dYOGhBOHd0SldWZlZqeWNOMGNiTng2bVlDTEM4c29xOTM3RTNIbmZFMzhyaDlsTm1zbGZrMldtbHhQaFVYRjFDSjEwM3YvL3RPMnJ2Tkp1clZJWTMrL3Q0SE5ISGk1Rmk2cWJZTWxqN0dqNytHSmt5NGxjNDc3eHpDeHFNYmJyaUo3cnZ2ZnBveDQ5RnE2OWVrd0pZdFcraWVlKzZseXkrL3RDYlZ0WTRpVUc4SU5HdVd5WHNDTWt6Ly9mdnZhM3lKSTY4aHVYRnNMYjdCMWlOOHAvU1c2RUQ3L2d1MERYMEpaKzhIT2xQU0d4SXVlL0pZUXV1ZGNad2xoQXBCMllVWHFicWREQ0ZjV0k0NDRCQjMwdmw5c0F5VGFFZXVsL2JxZHdDTk92RTRPdUg0NDJuejJxVzBkTjY3bEo2V1RDZU9HRUZqVGhwT1hWdDdLSVdIVVZybUM0N0hpYkZzM2JxTkNnb0s2TWdqanpEbmg4MUE5OTkvSDF0MUllTDY1Sk5QYWN5WTAzakphRDhtdENzSmxoOGM2dDE4OHkwbWZjU0lrZlQ2NjlhenBjaWJ4Rzh1bWpYck5RU05lLzc1RitpaGh4Nmg1Y3RYMEFVWFhHelNoZzRkUmw5ODhhVUpmL3JwSERybGxER21yYi85N1k3Z1VqanFUSjU4ajhrYk5lb1Vxekg5VlFRVWdXb1JnTFU0NjlVWEhiTWFwVVBvUVN5WHluT00wSmxJZzI0Vi9RcGRpM1FwSTNYVlR5d0NOV1lvQ0ZESUw5SVFSYkFvSTRTSVNRQkJ5eEdwWGszVFREOThOcmxGUGtwdGxrMTRDODkzM3krbWp4NGZUNjZ2SDZMYnJqNlZ4bDgwa3M0ZE41eGN1V3ZKazRvSGJmRW9pclhrVzlOKzdmV3lzenZSZ0FFRDZPS0xMNkYvLy90VldydDJIYlZ1M1lvR0R0elBGUHZsbDE4TklaNTIybGpPZjlsTTlsdDRZeFBjaEFsLzVmSnJUZnJWVjQ4M1JQbjk5OStidkczOGFNM3UzZnlxdm9EYnZYczM3ZHk1ZzNyMDZFNzMzanZacEw3eXlyL01CaU1RNW1XWFhVSG5uMzhlSVczeDRpVTBiZHJEcHN5dVhUdnB1ZWRlb0lzdXVwQXQyVWVrT2ZVVkFVV2dIaENBam9RdWhINFVNaFM5aVNWVzBhK3lZeFU2VjEzZElSRDNzaXFHQmdHQzZFU1FrWVlMd1VvKzdqUEsxUkRLUXZDT0N4cHJxL3hXK2gwbGJ1cmQ3MERDQTdaNzkrMUJKMXp6QkRWdmxrTG5iOHJoWmM0Q1dybDZFelVyK2grZlJJb1pOZy9UVWZmaWkvK2dKNTk4bWkyMGU0MDFlTkJCZzlsNm5FcTllL2VtTDcvOGtrNDQ0UVFtcm5OTm53OC9QSTErL0hFeGsyUTUvZWMvNzlISEgzOUkrK3pUandZTkdrZy8vTENJNXN6NWpJWU90WFlRUnhva2RxOTE3ZHJGWlBYczJkUDRuMzMyR1IxenpORTBjdVJJRTcvdXVtdm90dHR1NStOV0V6L3Z2SE5wN0Zobk5oU1lCdlZIRVdnQ0NHQkRqaXlyT25YUFVXQVRnb1FQQjdJVUt4RzZFdW5RdDQ3clRCbUEraEVSaVB0U1JBZ3ZZbXUyUkNrSGtvUlFoUnlSTGhha3JYaXRnNGJrbUNCM0ZMdHAwYUtGOVBHSGI5RVA4NytnTHQxN3NpWFppYzY1K0VhNjVzYTdhZXlabDFLYWl5MUdKa1VlaXVPdVRaczJkUHZ0ZjZYLy9lOG5ldXV0Ti9oY2ZYVFZWZGVZZmxhdVhFVjkrL1lKOXRtcVZTdERaQnMzYmpScHNBVEY5ZTdkaTFhc1dDWFJtUDNac3orbHVYTS81eVhWQWVhNDRvcnhabk9RL0xPMWE5YzI1cmEwb0NLUVNBVFdyRmxuVmxkNjJEYmZJSXdWRitRMUpBZGloQlBmeWJHSmpvUnVSQmhrS0RvVFlSd2d6T29NRWlmSHBHMnhFUmN2Q0JBVUhJUlluUk1oaThBUkY5S3NybTY4K1dZMExqOXQyT21ucFM5TnBGdzJxUEpMK0tNaHZFbG42V1l2VGZqN2x6Umt5SUgweTAvZlVvYzBKa2NYbjdxL0xONXVxaXkvZXZWcVdyQmdJWjExMXBubVBBY1BQcENYUjIraWM4ODkzMHhzN014YnRXcDFzQTFzNE5uTW53dnIwS0c5U2Z2amp5MGtCTG1KTFYzWnlZZC9qRjI3ZGdYcllWazFtanY2NktPTTlUbDE2cjNSaW1pNkl0QWdFTGg3MGhRcTVQYzByMkV5dkh2UzFPQ1lDZ29LK1JHUEtmVEM4MDhGMCtvN1lOK1E0OVJZUkJmQ0Z3TEUvenFJVWZRczRuRFFvVUtlVHZXdjdWU05RTnlXbzFpQUVGcFZCQ25FaVBJb2gwT3Voa1RRVlE4dGpseWVYRzd1cDd6RVMyMjc3a1dUWHZpZVRwdjBLVjMwd0dkMDF0UlBhZXBMODNpVHpEQmVhazJqd3J3dDFES0RYK1RMSEMrVE00NmVxaXlha1pGQnQ5NTZHMi8zZnNzOHNwS2JtMHV2dmZZNjRYRU80RFZzMkRCNisrMTNDSTk3Z09DdzlJcmRySGl0M3JCaGgvSW1tNGNKZFpZdVhVWXZ2dmlTU1VPSElNdzVjK1lRQ0hQTm1yWGN4cnZCY2NENmhNTzlSVnhaWWhuMmxWZitUZlBuTHpEM1haOTU1bG02OU5MTGcrVTFvQWcwRkFSNjlPakdxeHY5ZURoK002OHh0eEZHbWx3WU5wU3hKbUpEanVnZjZFcTdMc1gvTVpaVHhkbnpwSTdrcVo4NEJFSVNpTEVQQ0FyQ2cwQ3JFcFNkRkVFTUtDLzFKQjVqbHpFVXM2NnF5bjEreW1FREs3K29tREtTVTdsUEVDQ1RjNm1YUHYzME05cVp1NXZ5VnMrbGpuMzQ3VGxsc2htbmVnczRoZ0dZSWgzNUJlNlBQejdERU9STk45MXMwbkFQOGFtbm5qUmhXSktUSjA4eWhJam5JUHYwNlVOUFBQRzR5WnMrL1JHNjVwcHJlZlBPQWVhVmQxZGNjUm1OR0hHQ3lUdjc3TFBvUFg3azVOQkREeU1zMitLZXBHRGZtZDltZE9LSkkyajA2RlBwNmFlZk5IVW1UcnlETndWZGF1NTVkdXZXalI1N2JMcHBSMzhVZ1lhRXdNUTcveG9jRHF4SU9IdGFNSE1QRFFqcFFSL2kveGtIZENUMkVpQlAwdVIvSFRCSW5UMFVrZ1oxV25HVEl3UWx4QmZMbWVCZWwxd0ZvUjVJMG1tSENaV2N6RXNUU1NrMHJPMWErdlVGZnMwZGJHTG1QWmxrU1p6QUZFMm45RXlqcEpRMFN1YmwxclFVdlBnM2JnaXFIUDdKSjU5RW8wYU5OTityaENVcGxwMVV1dUNDODh5R0hDd24yZC83MnI1OWUzNThZNVo1TmhLYmlZQ1ZPT1RObVRQYldKdW9ZODlEbWFlZWVzSThyaUU0WDNMSnhVeU9GNW55ZUwrc09CQ3pPa1ZBRVlnZmdVUnV5SkgvWitoR0VDV2M2RW5vTmpzaDJva3kvclBRR3ZFZ0VEY3pRR2hDT05WMUJFSGFoU24xd3RPcmE2ZTYvSjY5K3REbUpXWFV2WU9ML3RRdm5TaVZkOXBFM0d6am90SUNIeFVVZS9uTk9TN2FubDlPdVhtNTFUVWZkejRtT3l5NmFBN25ieWRHZXptOGNpNmFhOTY4ZWJTczRBdUtwUUQ2c0JPanBLdXZDQ2dDOFNNZ0czSGdPN2xiRlRvUmV3OXdZUXRpUkZ3T2lTTVBaYUJYa0tldWJoQ0lteHlGN09US3BycGhRc0JTVm53UmZuVjFZODAvNDh6emFOclAzOVBXSDk0M3I0emJWY0N2a3l2MlVSNGYyL045SFBiVHJvSnlLdkh6dXdxSkQzNk1Jem0xR2ZrOWFYVDRFZEVmbFlpMWZ5Mm5DQ2dDdFVNQXF5d04yU1ZxUXc3MEkwZ1BldFZhQWJNK2RDd3ZKUmRkaVhJZ1NIVjFoMENOeUJIQ2hDQ3JjaUpVbEpIeUVERHE0UkNTcmFxTldMaWJHQkFBQUFSclNVUkJWUE13a1c2OTUwbDY4TUdlTkcvZVBQTzVxcmJkMjVyN2MzdnpKNnhhdG14WjRjakt5aktiWUxCOGlUR3BVd1FVZ2ZwRjRPcnhWOVR2QUtycEhkYWlreFlqdWhNZEtyclNyaFBGa0VBYXd0Q2hjUFl5SmtGL0VvWkEzT1FJUVVHWUlxeXFSbVlYTEVnSTl4K2xiaXoxcTJvN1BBL3RUNWhndlcwbVBFL2ppb0FpMExBUmtIZXFOdXhST2pzNjZFZlJod2pqZ0k2VVBRZDJncFI4bEZkWE53akVUWTRRRW9RbWdvczJUSlNEdzNvNXJwRHNkWkNISlFJVmREVDBORjBSVUFUMmRBU2dCNkVieFZCQVdJd0krRWdYOG9TK0ZKMjZwK1BTVU02dlJ1UW93cXp1SkNCc0hIQVF0aEFrcm81RThOVzFvZm1LZ0NLZ0NPeUpDTWhLR2tnUCtoQytIR0pCZ2h4RmgrNkpHRFRrYzRxYkhDR29XQ3crbEV0bWdZdUZLVGVUVVJkcG1BU3h0Tk9Rd2RPeEtRS0tnQ0pRVXdTRUZLRUg4ZjVwZVJRTGNaQ2xrQ0wwSmVMUW9hSlBhOXFuMW9zZGdiakpFUllnSElSWmxYT1Y1cEd2Y0lzaFFVT0dYQmhYUTNCSldDSW8yVTdlL00wbXJqK0tnQ0tnQ0RRMUJLQURmWVZwNU9OYlQ4WmlUT2FkcXFWc1BVTEg4bEhHcEFpSFBCTmkwblNWRnpZMW1PcnRmT01tUjR4VXJteXFHclgvdTZ2NXNZbUtUaDVyVCtYazduenNXRkl4WDJPS2dDS2dDRFFWQkhyaVJKZUZ6bGIwcFdWQ2hOSTFWRDhJQ0YvRjNMdVkrcmlhVWFjSUtBS0tnQ0tnQ095SkNNUk5qbGo3aHRQN2hYdmlkTkJ6VWdRVUFVVkFFUUFDY1pNakxFWVFveUhIcEJxdHlpcnlpb0Fpb0Fnb0FnNGo0SEpiSDNCM3VOa20yMXpjNUFoU3hLWWNISzVXK3pSWjRQVEVGUUZGUUJGb1NBZ2tzVDZXMjEzaU42VHhOYmF4eEUyT09FRzU3NWpTL3lweXBiZHJiT2VzNDFVRUZBRkZZSTlDd04xeEdDVjNHMjdPU1luUkdkRzYyQktNNlgxRUtDYUhQTHlLUnpSS2Q2Nmkwa1ZUcWZ5UCtmeWRsWXFQZDRRM2JZK2pyanpYNDh5cGFDdUtnQ0tnQ0RRZUJLQkhaUThIUmgySjFDS2wyYy9RbGRLQzNOMUdVUHJnVzhtZDJ0eTBaMWIxK1BhWHRGMWRHL2IyTkJ4Q0lDNXlSRFVRbkR5dmlJZFNFUWJSU1RwOEhMQXV3OE5DcW5oR01pY25odzQ2NktEUVNEU2tDQ2dDaWtBVFFtREJnZ1dVbloxdFBqY250NnBBYUJLR0Q5MktOQnpRcDBpeit5QStwTUhRa0hMaUkwK0pzZVlUS3VZZE5RQlp5QTdnaStXSGRDRkNoSVVzSVRCN1hJU0xzc2lERTcvbXc5ZWFpb0Fpb0FnMFRnU2dINVA1d1gvb1FkR1g4SkVHL1FvbmVYYVNSRDBjMEtuMnNKMFVHeWNpRFd2VU1aT2pERnVJRVVRcEFrSlloSWZQUnlFTWtoVEJvUzdLd0tHK0NCeStPa1ZBRVZBRW1pSUMwSlZ3MElPdy9FQ0tjTkNiZGtzUWFWSVcraE1PT3RaK1c4cE9qSGE5YXdyclQ0MFFpSXNjQVRxRUFoK0NGQ3RRTEVxa3d3bnBDVUdpTE1MNEZBdnFGeFVWbVRha1hJMUdycFVVQVVWQUVXakVDSURjaEJoeEd0Q2ppSXQrUlJoNkU4U0lQQkFnOHNLUFNIbG9UL1F4d3VyaVJ5QXVja1R6QUR5Y0RFRitFRFFFQ2ZJRGFjcVZEOEpJRjRKRVhZUnhLRG5HTHpDdG9RZ29BbnNHQW1KY1FLZENINHIxaDdOREduUXBpQkZoSEhCMm5SbE9sc2lYY3VJalRWM05FUGgvOEU2NDdpZENpQ3NBQUFBQVNVVk9SSzVDWUlJPVwiIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlID0gT2JqZWN0LmNyZWF0ZShtb2R1bGUpO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsICdleHBvcnRzJywge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0c2V0OiAoKSA9PiB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VTIE1vZHVsZXMgbWF5IG5vdCBhc3NpZ24gbW9kdWxlLmV4cG9ydHMgb3IgZXhwb3J0cy4qLCBVc2UgRVNNIGV4cG9ydCBzeW50YXgsIGluc3RlYWQ6ICcgKyBtb2R1bGUuaWQpO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJjb250ZW50X3NjcmlwdFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjaHJvbWVfZXh0ZW5zaW9uX3R5cGVzY3JpcHRfc3RhcnRlclwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjaHJvbWVfZXh0ZW5zaW9uX3R5cGVzY3JpcHRfc3RhcnRlclwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvY29udGVudF9zY3JpcHQudHN4XCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=