import browser from 'webextension-polyfill'


import React, { useEffect, useState, useRef, createContext, useContext } from "react";
// import ReactDOM from "react-dom";

import ReactMarkdown from 'react-markdown'
import breaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw'


import { Nav } from "../Components/Nav"
import { CustomPromptForm } from "../Components/CustomPromptForm"

import { Images } from "../Components/Images"
import Notice from '../Components/Notice';

import { Selection } from "./Selection"
import { ErroTips } from "./ErroTips"

import { Skeleton, Input, message, ConfigProvider, theme, Result, Select, Drawer, Space, Form, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';


import settingGuide from '../assets/settingGuide.png'

import { useCurrentLanguage } from '../lib/locale'

import { getClipboard } from './util'

import "./index.css"





let currentLanguage: string
let targetLanguage: string

const { TextArea } = Input;

const AnkiContext = createContext(null);


export function PopupCard(props: any) {


  const [messages, setMessages] = useState<Array<{ content: string, role: string, loading: boolean, chatId: string, prompt: string }>>([{ 'content': '', 'role': 'user', 'loading': false, 'chatId': '', 'prompt': '' }])
  const [images, setImages] = useState([])
  const [prompts, setPrompts] = useState<Array<{ title: string, getUnsplashImages: boolean, userPrompt: string, id: string }>>([])



  const [isLoading, setIsLoading] = useState(true);

  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [customPromptFormData, setCustomPromptFormData] = useState<{ title: string, getUnsplashImages: boolean, userPrompt: string, id: string }>({ 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' });


  // standby,normal,loading,success
  const [addToAnkiStatus, setAddToAnkiStatus] = useState<{ status: string, noteId: number }>({ 'status': 'standby', 'noteId': 0 });


  const [isAnswerDone, setAnswerDone] = useState(false);

  const [isApiErro, setIsApiErro] = useState(false);

  const [isAnswerInputed, setIsAnswerInputed] = useState(false);

  // const [keyWord, setKeyWord] = useState('');
  // const [sentence, setSentence] = useState('');

  let promptRef = useRef<{ prompt: Array<{ role: string, content: string }>, getUnsplashImages: boolean }>();


  // 窗口拖拽逻辑
  const [dragging, setDragging] = useState(false);

  const windowElement = useRef<HTMLDivElement>(null);
  const messagesList = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const [form] = Form.useForm();





  // const [conversationList, setConversationList] = useState<{ type: string, isLoading: boolean, content: string }[]>([{ 'type': 'ai', 'isLoading': true, 'content': '' }]);

  let Lang = useCurrentLanguage()!

  currentLanguage = Lang['current']['name']
  targetLanguage = Lang['target']['name']


  useEffect(() => {
    console.log('useEffect');

    // // 当前选中的文字
    // let keyWord = props.selection.toString().trim()

    // // 选中文字所在的段落
    // let sentence = props.selection.anchorNode.data

    // if (sentence === undefined) {
    //   sentence = ''
    // } else {
    //   sentence = sentence.length <= keyWord.length ? props.selection.anchorNode.parentNode.parentNode.innerText : sentence
    // }

    // setKeyWord(keyWord)
    // setSentence(sentence)

    initializePromptList()

    // 设置窗口的默认位置
    if (windowElement.current && !props.isPin) {

      // Check the boundaries
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const elementWidth = windowElement.current.clientWidth;
      const elementHeight = windowElement.current.clientHeight;

      const minX = 0;
      const minY = 0;
      const maxX = windowWidth - elementWidth;
      const maxY = windowHeight - elementHeight;

      const newX = maxX - 20
      const newY = props.selection.anchorNode.parentElement.offsetTop + props.selection.anchorNode.parentElement.clientHeight + 20

      const clampedX = Math.max(minX, Math.min(newX, maxX));
      const clampedY = Math.max(minY, Math.min(newY, maxY));
      // console.log(props.selection.getRangeAt(0));

      windowElement.current.style.left = `${clampedX}px`;
      windowElement.current.style.top = `${clampedY}px`;
    }

    // 执行上一次的 prompt 或默认不执行由用户手动选择 prompt

    let systemPrompt = {
      "role": "system", "content": `作为语言老师，给你一个单词和句子，你需要：
      - 说明单词的词性
      - 解释单词在句子中的含义
      - 提供例句
      - 提供简单的翻译题
      
      让我们一步一步来，如果你是 A 语言的老师使用 B 语言教学。
      - 说明部分需要使用 B 语言。
      - 提供 A 语言的例句并显示其 B 语言的翻译。
      - 翻译题显示 B 语言的句子，要求翻译为 A 语言，句子尽量简单，翻译后的句子需要包含上述单词。
      - ## 表示标题，你需要使用 B 语言表示。
      
      ---
      例子：
      
      用户输入：
      单词：called
      句子：This syntax is called “destructuring”

      示例回复：
      
      含义：“被称作”或“被叫做”
      词性：动词的过去分词形式，也可以作为形容词或名词使用
      
      ## 在句子中的含义
      这里的 called 是一个被动语态的形式，表示“被称作”或“被叫做”的意思。句子的意思是“这种语法结构被称作‘解构’”。
      
      ## 例句
      
      - The movie is called “The Godfather”. - 这部电影叫做“教父”
      - I was called to the principal’s office this morning. - 我今天早上被叫去校长办公室了。
      
      ## 翻译题
      - 我刚刚打电话给我的姐姐。
      - 她的朋友们都叫她 "小兔子"。
      
      ---
      
      接下来，请使用指定语言回复：
      A 语言：${Lang['target']['name']}
      B 语言：${Lang['current']['name']}`
    }

    let userPrompt = {
      "role": "user", "content": `Word:"{{keyWord}}", sentence: "{{sentence}}"
      `
    }

    // 关键字长度较长时，按照句子进行处理
    if (props.data.keyWord.length > 20) {

      systemPrompt = {
        "role": "system", "content": `作为语言老师，给你一个句子，你需要：
        - 解释句子的语法知识
        - 提供例句
        - 提供测试题测试学生的理解程度。
        
        让我们一步一步来，如果你是 A 语言的老师使用 B 语言教学。
        - 翻译部分需要翻译为 B 语言。
        - 分析**用户提供的句子**
        - 提供 A 语言的例句并显示其 B 语言的翻译。
        
        
        下面是一个案例：
        用户提供的句子：My parents are busier than my grandparents.
        
        ## 翻译
        我的父母比我的祖父母更忙。
        
        ## 分析
        - 主语：[My parents]
        - 谓语：[are busier]
        - 比较结构：[than my grandparents]
        
        ## 例句
        1. My sister is smarter than my brother. - 我妹妹比我哥哥更聪明。
        2. This car is faster than that one. - 这辆车比那辆车跑得快。
        
        ## 练习题
        1. 翻译句子。
        The new restaurant is much busier than the old one.
        2. 把下面的句子改写为否定句和疑问句。
        My sister is taller than my brother.
        
        ---
        
        现在你是一名${Lang['target']['name']}老师，使用${Lang['current']['name']}教学。`
      }

      // userPrompt = {
      //   "role": "user", "content": `1. ${Lang['current']['Prompt2']['translate']} 2. Explanation: ${Lang['current']['Prompt2']['explanation']} 
      //     3. Example sentences: Provide 2 ${Lang['target']['name']} example sentences and show their translations. 
      //     4. Translation question: Based on the grammar knowledge points mentioned, Provide 2 simple test questions to translate the ${Lang['current']['name']} sentences into ${Lang['target']['name']}
      //     Please reply "Yes" if you understand.`
      // }

      userPrompt = {
        "role": "user", "content": `Sentence: "{{keyWord}}"`
      }


    }

    let prompt = [systemPrompt, userPrompt]

    executivePrompt({ 'prompt': prompt, 'getUnsplashImages': true })


    // 添加滚动事件，让消息列表自动滚动到底部
    messagesList.current?.addEventListener("scroll", handleScroll);
    return () => {
      // console.log('useEffect return');
      messagesList.current?.removeEventListener("scroll", handleScroll);
    };


  }, [props]);

  // 窗口拖拽时触发
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      // console.log('useEffect return');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  // 保存历史记录
  useEffect(() => {
    // 在 openApiAnser 更新后将其保存到浏览器存储中

    // 只保留消息记录的第 1 条
    if (messages.length > 0 && isAnswerDone) {

      console.log('Save');
      console.log(messages);

      const keyWord = props.data.keyWord
      const Sentence = props.data.Sentence


      // 将查询记录保存起来
      const newHistory = { 'keyWord': keyWord, 'sentence': Sentence, 'role': messages[0]['role'], 'answer': messages[0]['content'], 'source': window.location.href, 'prompt': messages[0]['prompt'] }


      if (keyWord !== '' && Sentence !== '' && messages[0]['content'] !== '') {
        browser.storage.local.get({ "history": [] }).then((item) => {

          // console.log(item.history);

          let newHistoryList: any = []
          let bingo = false
          newHistoryList.push(newHistory)
          if (Array.isArray(item.history)) {

            // 如果记录已存在，则不重复保存
            for (let i = 0; i < item.history.length; i++) {

              let obj = item.history[i]


              if (obj.keyWord === newHistory['keyWord'] && obj.sentence === newHistory['sentence'] && obj.prompt === promptRef.current?.prompt[0]['content']) {

                bingo = true
                break

              }

            }

            newHistoryList = item.history
            newHistoryList.unshift(newHistory)
            newHistoryList.splice(8)

            console.log(newHistoryList);

          }

          if (!bingo) {
            browser.storage.local.set(
              {
                history: newHistoryList
              }
            )
          }

        })
      }

    }

  }, [isAnswerDone]);

  const executivePrompt = (prompt: { prompt: Array<{ role: string, content: string }>, getUnsplashImages: boolean }) => {
    console.log('executivePrompt:');
    console.log(prompt);

    promptRef.current = prompt

    const keyWord = props.data.keyWord
    const Sentence = props.data.Sentence


    // 初始化
    setMessages([])
    setImages([])


    // 如果历史记录中存在记录，则不重复请求 API，直接显示历史记录的信息
    browser.storage.local.get({ "history": [] }).then((item) => {
      console.log(item);

      // 如果记录已存在，则不重复保存
      let bingo = false
      for (let i = 0; i < item.history.length; i++) {
        let obj = item.history[i]
        if (obj.keyWord === keyWord && obj.sentence === Sentence && obj.prompt === prompt.prompt[0]['content']) {

          if ('role' in obj) {

          } else {
            // 旧版本中因为没有存储 role ，直接显示历史数据时会导致后续流程异常
            bingo = false
            break
          }

          bingo = true

          // 直接显示历史记录中的回答
          setMessages(prevMessages => {

            const lastMessage = prevMessages[prevMessages.length - 1];
            const updatedLastMessage = {
              ...lastMessage,
              chatId: Date.now().toString(),
              role: obj.role,
              content: obj.answer,
              loading: false
            };

            return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];

          })

          setIsLoading(false)
          setAnswerDone(true)

          setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 })
          break
        }
      }

      if (!bingo) {

        getGPTMsg(prompt.prompt, keyWord)

      }

      if (keyWord.length <= 20 && getUnsplashImages) {
        getUnsplashImages(keyWord)
      }




    })




  }

  const initializePromptList = async () => {
    // 获取已保存的 Prompt List
    const promptList = await browser.storage.sync.get({ "promptList": [] }).then((item) => {
      return item.promptList
    })

    setPrompts(promptList)


  }

  const getUnsplashImages = (keyWord: string) => {
    // 请求 background 获取数据
    // 使用长连接
    let port = browser.runtime.connect({
      name: 'popup-name'
    })

    // 使用 postMs 发送信息
    port.postMessage({ 'type': 'getUnsplashImages', 'messages': '', 'keyWord': keyWord })

    // 接收信息
    port.onMessage.addListener(msg => {

      if (msg.type === 'sendImgData') {
        console.log('sendImgData');

        if ('imgs' in msg) {
          // console.log('unsplashSearchPhotos');
          console.log('imgs:');
          // setImages([])
          setImages(msg.imgs)
        }
      }

    })

  }

  // 请求 GPT 数据
  const getGPTMsg = async (prompt: Array<{ role: string, content: string }>, keyWord?: string) => {

    keyWord = keyWord || '';

    // 设置加载状态
    setIsLoading(true)
    // 设置为回答中
    setAnswerDone(false)
    // 禁用保存到 Anki 按钮
    setAddToAnkiStatus({ 'status': 'standby', 'noteId': 0 })

    // 请求 background 获取数据
    // 使用长连接
    let port = browser.runtime.connect({
      name: 'popup-name'
    })

    // 在消息历史中插入新记录
    setMessages(prevMessages => [...prevMessages, { 'content': '', 'role': 'assistant', 'loading': true, 'chatId': '', 'prompt': '' }])

    setTimeout(() => {
      // 使用 postMs 发送信息
      port.postMessage({ 'type': 'getGPTMsg', 'messages': prompt, 'keyWord': keyWord })
    }, 20);


    // 接收信息
    port.onMessage.addListener(msg => {

      // console.log('port.onMessage.addListener');
      if (msg.type === 'sendGPTData') {
        // 请求 GPT 数据失败
        if (msg.status === 'erro') {

          // type === 'as2' ? setopenApiAnser2(msg.content) : setopenApiAnser(msg.content)
          setIsLoading(false)
          setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 })

          if (msg.code === 'invalid_api_key') {
            setIsApiErro(true)
            msg.content += '\
            After that, you need to set the correct Open API Key in the Scouter:'
          }

          setMessages(prevMessages => {

            const lastMessage = prevMessages[prevMessages.length - 1];
            // const newMsgList = lastMessage
            const updatedLastMessage = {
              ...lastMessage,
              chatId: msg.chatId,
              content: msg.content,
              loading: false,
              prompt: prompt[0]['content']
            };
            // const newMsgList = [...prevMessages.slice(0, prevMessages.length - 1), lastMessage]
            return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];

          })



          scrollToBottom()

          // setIsLoading(false)
        }

        // 请求 GPT 数据成功且数据流结束传输
        if (msg.status === 'end') {

          // 记录消息回答完毕（触发保存历史记录）
          setAnswerDone(true)

          setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 })
          setIsLoading(false)

        }

        // 请求 GPT 数据成功且数据流开始传输
        if (msg.status === 'begin') {

          // type === 'as2' ? setopenApiAnser2('') : setopenApiAnser('')

          console.log('begin');

        }

        // 请求 GPT 数据成功且数据流传输中
        if (msg.status === 'process') {

          try {

            setMessages(prevMessages => {

              console.log(msg);


              const lastMessage = prevMessages[prevMessages.length - 1];

              console.log(prevMessages)
              console.log(lastMessage)

              if (prevMessages.length === 0) {
                return []
              }

              const newMsgList = lastMessage
              const updatedLastMessage = {
                ...lastMessage,
                chatId: msg.chatId,
                content: newMsgList.content + msg.content,
                loading: false,
                prompt: prompt[0]['content']
              };
              // const newMsgList = [...prevMessages.slice(0, prevMessages.length - 1), lastMessage]
              return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];

            })

          } catch (error) {

          }




          scrollToBottom()

        }
      }


      // if (msg.type === 'sendImgData') {
      //   console.log('sendImgData');

      //   if ('imgs' in msg) {
      //     // console.log('unsplashSearchPhotos');
      //     console.log('imgs:');
      //     console.log(msg);
      //     setImages(msg.imgs)
      //   }
      // }


    })

  };

  // 发送消息
  const handleSendMessage = (values: any) => {

    // console.log(values);
    let prompt = `${Lang['current']['Prompt3']['validation']}"${values.msg}"`

    // 清空文本框
    form.resetFields();
    // 禁用发送按钮
    setIsAnswerInputed(false)


    // 将用户发言发送到消息记录中
    setMessages(prevMessages => {

      const updatedLastMessage = {
        role: 'user',
        chatId: Date.now().toString(),
        content: values.msg,
        'loading': false,
        'prompt': prompt
      };
      // const newMsgList = [...prevMessages.slice(0, prevMessages.length - 1), lastMessage]
      return [...prevMessages, updatedLastMessage];

    });

    // console.log(messages);

    const msgHistory = messages.slice(-5).map((item) => { return { 'role': item.role, 'content': item.content } })

    getGPTMsg([...msgHistory, { "role": "user", "content": values.msg }])

    setTimeout(() => {
      scrollToBottom(true)
    }, 10);


  }

  // 文本框下敲击按键时
  const handleKeyDown = (event: any) => {
    // 阻止事件冒泡
    console.log('handleKeyDown');

    event.stopPropagation()

    if (event.keyCode === 13 && !event.shiftKey) {


      // 敲击回车键
      if (!isLoading && isAnswerInputed) {
        // 非加载状态、GPT 消息发送完毕时用户可发送消息
        handleSendMessage({ 'msg': event.target.value })
      } else {
        event.preventDefault();
      }

    }
  }

  // const handleFormKeyDown = (event: any) => {
  //   // console.log('handleFormKeyDown');

  // }

  const handleMouseDown = (event: any) => {
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

  const handleMouseMove = (event: any) => {
    // // console.log('PopupCard:handleMouseMove');
    // // console.log(dragging);


    if (dragging && windowElement.current) {

      // Use requestAnimationFrame to throttle the mousemove event handling
      // 鼠标相对窗口左上角的偏移
      const offsetX = parseFloat(windowElement.current.dataset.offsetX || '');
      const offsetY = parseFloat(windowElement.current.dataset.offsetY || '');

      const newX = event.clientX - offsetX
      const newY = event.clientY - offsetY

      // Check the boundaries
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const elementWidth = windowElement.current.clientWidth;
      const elementHeight = windowElement.current.clientHeight;

      const minX = 0;
      const minY = 0;
      const maxX = windowWidth - elementWidth;
      const maxY = windowHeight - elementHeight;

      const clampedX = Math.max(minX, Math.min(newX, maxX));
      const clampedY = Math.max(minY, Math.min(newY, maxY));

      // Only update the position if it's within the boundaries
      // newX >= minX && newX <= maxX && newY >= minY && newY <= maxY
      if (true) {
        // setPosition({ x: clampedX, y: clampedY });
        windowElement.current.style.left = `${clampedX}px`;
        windowElement.current.style.top = `${clampedY}px`;

      } else {
        // 元素到达边界
        // const rect = windowElement.current.getBoundingClientRect();
        // const offsetX = event.clientX - rect.left;
        // const offsetY = event.clientY - rect.top;
        // windowElement.current.dataset.offsetX = String(offsetX);
        // windowElement.current.dataset.offsetY = String(offsetY);
      }

    }


  };

  const handleMouseUp = () => {
    // // console.log('PopupCard:handleMouseUp');
    setDragging(false);
  };

  // 文本框值变化时
  const onTextAreaInput = (event: any) => {
    console.log('onTextAreaInput');


    if (event.target.value.length > 0) {
      setIsAnswerInputed(true)
    } else {
      setIsAnswerInputed(false)
    }
  }

  const addToAnki = (deckName: string, modelName: string, front: string, back: string) => {

    const keyWord = props.data.keyWord
    const Sentence = props.data.Sentence

    let container = ''
    let images = ''
    let unsplash_download_location
    const stc = keyWord.length <= 20 ? Sentence : ''

    if (windowElement.current) {
      // console.log(windowElement.current);
      container = windowElement.current.innerHTML
      container = windowElement.current.getElementsByClassName('messages')[0].innerHTML
      // 处理样式，避免 Anki 内显示异常
      container = container.replace(/style=/g, '');

      if (windowElement.current.getElementsByClassName('imageBox')[0] !== undefined) {
        images = windowElement.current.getElementsByClassName('imageBox')[0].innerHTML
        // 获取 unsplashApi 的 download_location
        unsplash_download_location = windowElement.current.getElementsByClassName('images')[0].getElementsByTagName('img')[0].parentElement?.getAttribute('data-downloadlocation')
      }

      console.log(images);

      // 处理样式，避免 Anki 内显示异常
      images = images.replace(/style=/gi, '');
      images = images.replace(/width/gi, '');

    }


    // 请求 background 将数据保存到 Anki
    const p = {
      "note": {
        "deckName": deckName,
        "modelName": modelName,
        "fields": {
          [front]: keyWord,
          [back]: '<p>' + stc + '</p>' + images + container + '<a href="' + window.location.href + '">Source</a>'
        },
        "tags": [
          "Scouter"
        ]
      }
    }

    // 发送消息给 background
    let sending = browser.runtime.sendMessage({ 'type': 'addNote', 'messages': { 'anki_arguments': p, 'anki_action_type': 'addNote', 'unsplash_download_location': unsplash_download_location }, })
    sending.then(handleResponse, handleError);

  }

  // 点击保存到 Anki
  const handleSaveToAnkiBtnClick = () => {

    setAddToAnkiStatus({ 'status': 'loading', 'noteId': 0 })

    // 先预处理 Anki 的 model
    let sending = browser.runtime.sendMessage({ 'type': 'setModel', 'messages': {}, })
    sending.then((message: any) => {


      console.log(message);
      if (message.result == 'success') {
        // 添加到 Anki 中
        addToAnki(message.data.defaultDeckName, message.data.modelName, message.data.field1, message.data.field2)
      } else {
        // 反馈错误信息
        alert(message.error)
        setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 })
      }


    }, () => {
      //error
    });



  }

  // 接收 background 的回复
  function handleResponse(message: any) {

    // console.log(message);

    if (message.error === null) {

      setAddToAnkiStatus({ 'status': 'success', 'noteId': message.data })

    } else {
      alert(message.error)
      setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 })
    }

  }

  function handleError(erro: any) {
    setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 })
    // console.log(erro);
  }


  function scrollToBottom(canSroll: boolean = false) {

    if (messagesList.current !== null) {
      const isAtBottom = messagesList.current?.scrollTop + messagesList.current.clientHeight >= messagesList.current.scrollHeight - 1;

      // console.log('isAtBottom:');
      // console.log(isAtBottom);


      if (isAtBottom || canSroll) {
        // 位于底部，需要自动滚动
        messagesList.current.scrollTop = messagesList.current.scrollHeight;

      }
    }


  }

  function handleScroll() {

    if (messagesList.current !== null) {
      const isAtBottom = messagesList.current?.scrollTop + messagesList.current.clientHeight >= messagesList.current.scrollHeight - 0.5;
      if (isAtBottom) {
        // 已经位于底部，不需要自动滚动
        console.log('isAtBottom');
        return;
      } else {
        // scrollToBottom()
      }
    }
    // 未位于底部，不执行自动滚动
  }

  const openCustomPromptForm = (data: { isOpen: boolean, data: { title: string, getUnsplashImages: boolean, userPrompt: string, id: string } }) => {
    setPopoverOpen(data.isOpen)
    setCustomPromptFormData(data.data)
  }

  return (
    <>

      <div id="LearningEnglish2023"
        ref={windowElement}

        style={{
          left: 10,
          top: 10,
          color: 'rgba(0, 0, 0, 0.80)',
        }}
      >

        {/* <Notice type='info' message='hello' actionName='action' action={() => {
          console.log('hello')
        }} /> */}

        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#F08A24',
            },
          }}
        >

          <Nav handleSaveToAnkiBtnClick={handleSaveToAnkiBtnClick}
            addToAnkiStatus={addToAnkiStatus}
            onMouseDown={handleMouseDown}
            handleMenuItemClick={executivePrompt}
            openCustomPromptForm={openCustomPromptForm}
            title='Scouter'
            prompts={prompts}
          />

          <div className='flex-grow flex flex-col overflow-scroll'>
            <div className='flex-grow overflow-scroll'
              ref={messagesList}
              style={{ paddingTop: '54px' }}
            >

              <Selection text={props.data.keyWord} />

              <Images images={images} keyWord={props.data.keyWord} getUnsplashImages={getUnsplashImages} />

              <div
                className='messages'
                style={{
                  lineHeight: '2em',
                  wordWrap: 'break-word',
                  margin: '0.4em 0'
                }}
              >
                {messages.map((item) => {

                  return <div key={item.chatId} className='p-4' style={item.role === 'user' ? { backgroundColor: '#F5F5F5' } : {}}>
                    <Skeleton loading={item.loading} active={true} title={false}>

                      <ReactMarkdown remarkPlugins={[breaks]} skipHtml={false} children={item.content.replace(new RegExp(props.data.keyWord, 'gi'), `**${props.data.keyWord}**`)} />

                    </Skeleton>

                  </div>


                }



                )}

                {isApiErro ? <div className='p-4'> <img src={settingGuide} style={{
                  borderRadius: '4px'
                }} /></div> : ''}


              </div>
            </div>
          </div>

          <div className='w-full'
            ref={inputRef}
            style={{ borderTop: '1px solid rgba(5, 5, 5, .06)' }}
          >
            <Form
              form={form}
              onFinish={handleSendMessage}
              // onKeyDown={handleFormKeyDown}
              layout='inline'
              style={{ alignItems: 'center' }}
              className='p-2'
            >
              <Form.Item
                name="msg"
                style={{ margin: '0', flexGrow: '1' }}
              >
                <TextArea
                  placeholder="Send a message"
                  bordered={false}
                  autoSize={{ minRows: 1, maxRows: 2 }}
                  // onChange={handleInputChange}
                  style={{
                    caretColor: '#F08A24',
                  }}
                  onKeyDown={handleKeyDown} onInput={onTextAreaInput}

                />

              </Form.Item>

              <Form.Item
                style={{ marginRight: '0' }}
              >
                <Button
                  type="text"
                  htmlType="submit"
                  disabled={isLoading || !isAnswerInputed}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: !isLoading && isAnswerInputed ? '#F08A24' : ''
                  }}
                  icon={<SendOutlined />}
                />

              </Form.Item>

              <Form.Item
                style={{ margin: '0' }}
              >

              </Form.Item>
            </Form>
          </div>

          <div>

            <Drawer
              title="Create Prompt"
              placement="bottom"
              closable={false}
              height={440}
              // onClose={onClose}
              open={isPopoverOpen}
              getContainer={false}
              extra={
                <Space>
                  <Button onClick={() => openCustomPromptForm({ isOpen: false, data: { 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' } })}>Cancel</Button>

                  {/* <Button type="primary">
                    OK
                  </Button> */}

                </Space>
              }
            >
              <CustomPromptForm openCustomPromptForm={openCustomPromptForm} initializePromptList={initializePromptList} data={customPromptFormData} />

            </Drawer>

          </div>


        </ConfigProvider >

      </div >
    </>

  );
};