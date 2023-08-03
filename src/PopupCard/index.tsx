import browser from 'webextension-polyfill'


import React, { useEffect, useState, useRef, createContext, useContext } from "react";
// import ReactDOM from "react-dom";

import ReactMarkdown from 'react-markdown'
import breaks from 'remark-breaks';
import rehypeParse from 'rehype-parse'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { useSpring, animated } from 'react-spring';


import { setDonotClosePopupCard } from '../content_script'

import { Nav } from "../Components/Nav"
import { CustomPromptForm } from "../Components/CustomPromptForm"

import { Images } from "../Components/Images"
import Notice from '../Components/Notice';

import { Selection } from "./Selection"
import { ErroTips } from "./ErroTips"

import { Skeleton, Input, message, ConfigProvider, theme, Result, Select, Drawer, Space, Form, Button } from 'antd';
import { SendOutlined, LoadingOutlined } from '@ant-design/icons';


import settingGuide from '../assets/settingGuide.png'

import { useCurrentLanguage } from '../lib/locale'

import { windowInitialization, getUnsplashImages, handleHightlight, handlePromptVariables, getAnkiCards } from './util'

import "./index.css"


let currentLanguage: string
let targetLanguage: string

// // 使用长连接
// let port = browser.runtime.connect({
//   name: 'fromPopupCard'
// })

let ankiCards: Array<{}>
getAnkiCards().then((cards: any) => {
  ankiCards = cards
}).catch((error) => {
  // console.log(error);

})

const { TextArea } = Input;

const AnkiContext = createContext(null);

type PromptType = {
  title: string;
  getUnsplashImages: boolean;
  userPrompt: string;
  id: string;
};


export function PopupCard(props: any) {


  const [messages, setMessages] = useState<Array<{ content: string, role: string, loading: boolean, chatId: string, prompt: string }>>([{ 'content': '', 'role': 'user', 'loading': false, 'chatId': '', 'prompt': '' }])
  const [images, setImages] = useState([])
  const [showImagesBox, setShowImagesBox] = useState(false)
  const [prompts, setPrompts] = useState<Array<PromptType>>([]);
  const [lastExecutedPrompt, setLastExecutedPrompt] = useState<PromptType>({ 'title': '👉🏼 Please choose a prompt', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' })

  const [isLoading, setIsLoading] = useState(true);

  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [customPromptFormData, setCustomPromptFormData] = useState<PromptType>({ 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' });

  // standby,normal,loading,success
  const [addToAnkiStatus, setAddToAnkiStatus] = useState<{ status: string, noteId: number }>({ 'status': 'standby', 'noteId': 0 });


  const [isAnswerDone, setAnswerDone] = useState(false);

  const [isApiErro, setIsApiErro] = useState(false);

  const [isAnswerInputed, setIsAnswerInputed] = useState(false);

  // 窗口拖拽逻辑
  const [dragging, setDragging] = useState(false);

  const windowElement = useRef<HTMLDivElement>(null);
  const messagesList = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const shouldStayAtBottomRef = useRef(false);

  const [form] = Form.useForm();


  let Lang = useCurrentLanguage()!
  currentLanguage = Lang['current']['name']
  targetLanguage = Lang['target']['name']


  useEffect(() => {
    // console.log('useEffect');
    // console.log(props);

    // 渲染 Prompt 列表
    initializePromptList()

    if (props.runPrompt || props.runPrompt === undefined) {


      // 获取最近一次执行的 Prompt
      browser.storage.local.get({ "lastExecutedPrompt": '' }).then((item) => {


        if (item.lastExecutedPrompt === '') {

          // 执行默认 Prompt、获取 Unsplash 图片
          executivePrompt({ 'title': 'Default', 'getUnsplashImages': true, 'userPrompt': `Word:"{{keyWord}}", sentence: "{{sentence}}"`, 'id': 'Default' })

        } else {
          // 执行 Prompt、获取 Unsplash 图片
          executivePrompt(item.lastExecutedPrompt)
        }



      })


    } else {

      // 不执行任何 Prompt，由用户自行选择
      // console.log('不执行任何 Prompt，由用户自行选择');

      // 执行默认 Prompt、获取 Unsplash 图片
      executivePrompt({ 'title': 'Default', 'getUnsplashImages': true, 'userPrompt': `Word:"{{keyWord}}", sentence: "{{sentence}}"`, 'id': 'Default' }, false)

    }


    // 设置窗口的默认位置、添加滚动事件，让消息列表自动滚动到底部
    windowInitialization({ 'isPin': props.isPin, 'windowElement': windowElement, 'selection': props.selection, 'messagesList': messagesList })


  }, [props]);

  // 聊天记录改变时
  useEffect(() => {

    // 记录当前列表的位置
    if (windowElement.current) {
      const container = windowElement.current.querySelectorAll('.container')[0]
      shouldStayAtBottomRef.current = container.scrollHeight - container.scrollTop <= container.clientHeight + 20;

      
      // if (!shouldStayAtBottomRef.current) {
      //   console.log('---');
      //   console.log(container.scrollHeight - container.scrollTop - container.clientHeight);
      // }



      // const checkIfShouldStayAtBottom = () => {
      //   if (container !== null) {
      //     shouldStayAtBottomRef.current = Math.abs((container.scrollTop + container.clientHeight) - container.scrollHeight) < 2;
      //   }
      // };

      // 自动滚动到消息底部，方便看到最新的文字
      if (messages.length > 1) {

        // checkIfShouldStayAtBottom();  // 初始检查
        // container.addEventListener('scroll', checkIfShouldStayAtBottom);  // 每次滚动时检查

        // console.log(shouldStayAtBottomRef.current);


        if (messages[messages.length - 1].loading) {
          scrollToBottom(true)
        } else {
          scrollToBottom(shouldStayAtBottomRef.current)
        }

      }

      // return () => {
      //   if (container !== null) {
      //     container.removeEventListener('scroll', checkIfShouldStayAtBottom);
      //   }
      // }

    }


  }, [messages])

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

      // console.log('Save');
      // console.log(messages);

      const keyWord = props.data.keyWord
      const Sentence = props.data.Sentence


      // 将查询记录保存起来
      const newHistory = {
        'keyWord': keyWord,
        'sentence': Sentence,
        'role': messages[0]['role'],
        'answer': messages[0]['content'],
        'source': window.location.href,
        'prompt': messages[0]['prompt']
      }


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


              if (obj.keyWord === newHistory['keyWord'] && obj.sentence === newHistory['sentence'] && obj.prompt === newHistory['prompt']) {

                bingo = true
                break

              }

            }

            newHistoryList = item.history
            newHistoryList.unshift(newHistory)
            newHistoryList.splice(8)

            // console.log(newHistoryList);

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

  const executivePrompt = async (prompt: PromptType, runPrompt?: boolean, imageToRerender?: boolean) => {

    // port.postMessage({ 'type': 'StopTheConversation', 'messages': '' })

    // 设置加载状态
    setIsLoading(true)

    let needToRunPrompt = runPrompt
    if (needToRunPrompt === undefined) {
      needToRunPrompt = true
    }

    let needToRerenderImage = imageToRerender
    if (needToRerenderImage === undefined) {
      needToRerenderImage = true
    }

    // console.log('executivePrompt:');
    // console.log(needToRunPrompt);
    // console.log(prompt);

    // promptRef.current = prompt

    const keyWord = props.data.keyWord
    const Sentence = props.data.Sentence

    // 初始化
    setMessages([])   // 对话列表
    if (needToRerenderImage) {
      setImages([])     // 图片列表
    }




    if (prompt.getUnsplashImages && needToRunPrompt) {
      // 如果当前 Prompt 需要显示图片，且当前需要立即执行 Prompt
      setShowImagesBox(true)
    } else {
      setShowImagesBox(false)
    }



    if (needToRunPrompt) {

      // 在消息历史中插入新记录
      setMessages(prevMessages => [...prevMessages, { 'content': '', 'role': 'assistant', 'loading': true, 'chatId': '', 'prompt': '' }])

      // 设置最近执行的 Prompt
      setLastExecutedPrompt(prompt)
      // 记录最近 1 次使用的 Prompt
      browser.storage.local.set(
        {
          lastExecutedPrompt: prompt
        }
      )


      // 处理 Prompt 中的变量
      let newPrompt: Array<{ role: string, content: string }>;

      if (prompt.id == 'Default') {

        let userPrompt = {
          "role": "user", "content": `

          Please help me learn as a foreign language teacher.

          Example：
          """
          -  Meaning: <Explain the meaning using ${Lang['current']['name']}>
          -  Part of Speech: <Indicate the part of speech using ${Lang['current']['name']}>
          
          ## Meaning in the sentence
          -  <Explain the meaning of the word in the sentence using ${Lang['current']['name']}>
          
          ## Example Sentences
          -  <${Lang['target']['name']} example sentence> - <Translation in ${Lang['current']['name']}>
          -  <${Lang['target']['name']} example sentence> - <Translation in ${Lang['current']['name']}>
          
          ## Translation Exercise
          -  <${Lang['current']['name']} sentence>
          -  <${Lang['current']['name']} sentence>
          
          """ 
          
          Word:${keyWord}, sentence: ${Sentence},You must reply in the specified language

          Please start teaching:

          `

        }

        // 关键字长度较长时，按照句子进行处理
        if (props.data.keyWord.length > 20) {

          userPrompt = {
            "role": "user", "content": `

            As a language teacher, I will provide an explanation of the grammar knowledge in the given sentence:

            Example:
            """

            ## Translation
            <Translate to ${Lang['current']['name']}>
            
            ## Grammar
            <- Point: Explain in ${Lang['current']['name']}>

            ## Examples of related grammar
            -  <${Lang['target']['name']} example sentence> - <Translation in ${Lang['current']['name']}>
            -  <${Lang['target']['name']} example sentence> - <Translation in ${Lang['current']['name']}>

            """
            
            Sentence: ${keyWord}`
          }


        }

        // newPrompt = [systemPrompt, userPrompt]
        newPrompt = [userPrompt]

      } else {

        // 处理 Prompt 中的变量
        let p = await handlePromptVariables(prompt.userPrompt, keyWord, Sentence)
        newPrompt = [{ 'role': 'user', 'content': p }]

      }

      // 如果历史记录中存在记录，则不重复请求 API，直接显示历史记录的信息
      browser.storage.local.get({ "history": [] }).then((item) => {
        // console.log(item);

        // 如果记录已存在，则不重复保存
        let bingo = false
        for (let i = 0; i < item.history.length; i++) {
          let obj = item.history[i]
          if (obj.keyWord === keyWord && obj.sentence === Sentence && obj.prompt === newPrompt[0]['content']) {

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
                prompt: newPrompt[0]['content'],
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

          // 请求 AI 数据
          getGPTMsg(newPrompt, keyWord)

        }

        if (prompt.id == 'Default') {

          if (keyWord.length <= 20 && prompt.getUnsplashImages && needToRerenderImage) {
            // 获取图片数据
            getUnsplashImages(keyWord).then((imgs: any) => {
              setImages(imgs)
            })

          }

        } else {

          if (prompt.getUnsplashImages && needToRerenderImage) {
            // 获取图片数据
            getUnsplashImages(keyWord).then((imgs: any) => {
              setImages(imgs)
            })

          }

        }



      })






    } else {
      setLastExecutedPrompt({ 'title': '👉🏼 Please choose a prompt', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' })
    }

  }

  const initializePromptList = async () => {
    // 获取已保存的 Prompt List
    const promptList = await browser.storage.sync.get({ "promptList": [] }).then((item) => {
      return item.promptList
    })

    setPrompts(promptList)

  }

  const handlePromptEdited = async (isNew: boolean) => {
    // 初始化 Prompt 列表
    initializePromptList()

    // 更新最近使用的 Prompt（针对编辑的场景）
    if (!isNew) {
      browser.storage.sync.get({ "promptList": [] }).then((item) => {

        for (let i = 0; i < item.promptList.length; i++) {
          if (item.promptList[i].id === lastExecutedPrompt.id) {
            // 更新
            setLastExecutedPrompt(item.promptList[i])

            // 记录最近 1 次使用的 Prompt
            browser.storage.local.set(
              {
                lastExecutedPrompt: item.promptList[i]
              }
            )
            break
          }
        }

      })
    }



  }

  // 请求 GPT 数据
  const getGPTMsg = async (prompt: Array<{ role: string, content: string }>, keyWord?: string) => {
    // 使用长连接
    let port = browser.runtime.connect({
      name: 'fromPopupCard'
    })

    keyWord = keyWord || '';

    // 设置为回答中
    setAnswerDone(false)
    // 禁用保存到 Anki 按钮
    setAddToAnkiStatus({ 'status': 'standby', 'noteId': 0 })


    // 在消息历史中插入新记录
    // setMessages(prevMessages => [...prevMessages, { 'content': '', 'role': 'assistant', 'loading': true, 'chatId': '', 'prompt': '' }])

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



        } else if (isApiErro) {
          setIsApiErro(false)
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
                return []
              }

              const newMsgList = lastMessage
              let newContent = newMsgList.content + msg.content

              // if (prompt[0]['content'].indexOf('{ankiCards}') >= 0) {
              //   newContent = handleHightlight(newContent, props.data.keyWord, ankiCards, windowElement?.current)
              // }else{
              //   newContent = newContent.replace(new RegExp(props.data.keyWord, 'gi'), `**${props.data.keyWord}**`)
              // }

              newContent = handleHightlight(newContent, props.data.keyWord, ankiCards, windowElement?.current)

              // newContent = newContent.replace(/o/g, '<span style="color:red;">o</span>');

              const updatedLastMessage = {
                ...lastMessage,
                chatId: msg.chatId,
                content: newContent,
                loading: false,
                prompt: prompt[0]['content']
              };
              // const newMsgList = [...prevMessages.slice(0, prevMessages.length - 1), lastMessage]
              return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];

            })

          } catch (error) {

          }


        }
      }

    })

  };

  // 用户发送消息
  const handleSendMessage = (values: any) => {

    // console.log(values);
    let prompt = values.msg

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

    // 在消息历史中插入新记录
    setMessages(prevMessages => [...prevMessages, { 'content': '', 'role': 'assistant', 'loading': true, 'chatId': '', 'prompt': '' }])

    // console.log(messages);

    const msgHistory = messages.slice(-5).map((item) => { return { 'role': item.role, 'content': item.content } })

    getGPTMsg([...msgHistory, { "role": "user", "content": values.msg }])

  }

  // 文本框下敲击按键时
  const handleKeyDown = (event: any) => {
    // 阻止事件冒泡
    // console.log('handleKeyDown');

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

      const minX = - elementWidth / 2;
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

    if (event.target.value.length > 0) {
      setIsAnswerInputed(true)
    } else {
      setIsAnswerInputed(false)
    }
  }

  // 添加到 Anki
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
    `

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

  // GPT 生成消息时，自动定位到消息列表底部，方便用户阅读
  function scrollToBottom(canSroll: boolean = false) {

    if (windowElement.current !== null) {
      const container = windowElement.current.querySelectorAll('.container')[0]
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



  const openCustomPromptForm = (data: { isOpen: boolean, data: PromptType }) => {
    // 开启或关闭自定义 Prompt 表单
    setPopoverOpen(data.isOpen)
    // 设置表单的默认设置
    if (data.isOpen) {
      setCustomPromptFormData(data.data)
    }
    // 开启表单后禁止点击窗口外区域关闭窗口
    setDonotClosePopupCard(data.isOpen)

  }

  const AnimatedButton = animated(Button);
  const animationStyle = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    config: { duration: 1000 },
    loop: true,
    width: '32px',
    height: '32px',
    border: '1px solid red'
  });

  return (
    <>

      <div id="LearningEnglish2023"
        ref={windowElement}

        style={{
          left: 10,
          top: 10,
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
            lastExecutedPrompt={lastExecutedPrompt}
          />

          <div className='container flex-grow flex flex-col overflow-auto'>
            <div className='flex-grow'
              ref={messagesList}
              style={{ paddingTop: '54px' }}
            >

              <Selection text={props.data.keyWord} />


              {showImagesBox && <Images images={images} keyWord={props.data.keyWord} getUnsplashImages={(keyWord) => {
                getUnsplashImages(keyWord).then((imgs: any) => {
                  setImages(imgs)
                })
              }} />}

              <div
                className='messages'
                style={{
                  lineHeight: '28px',
                  wordWrap: 'break-word',
                  margin: '0.4em 0'
                }}
              >
                {messages.map((item) => {

                  return <div key={item.chatId} className='' style={item.role === 'user' ? { backgroundColor: '#F6F6F6', paddingTop: '2px', paddingBottom: '2px' } : {}}>
                    <Skeleton loading={item.loading} active={true} title={false}>

                      <ReactMarkdown
                        remarkPlugins={[breaks, remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                          table: ({ node, ...props }) => <div style={{ overflowX: 'scroll' }}>
                            <table style={{
                              width: 'max-content',
                              maxWidth: '620px',
                              border: "1px solid #ccc",
                              borderCollapse: 'collapse',
                              margin: 0,
                              padding: 0,
                            }} {...props} />
                          </div>
                        }}
                        skipHtml={false}
                        children={item.content} />

                    </Skeleton>

                  </div>

                }

                )}

                {isApiErro ? <div className=''> <img src={settingGuide} style={{
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
                {isAnswerDone ?
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
                  /> : <div style={{ marginRight: '8px' }}>
                    <animated.div style={animationStyle}><LoadingOutlined /></animated.div>
                  </div>
                }



              </Form.Item>

              <Form.Item
                style={{ margin: '0' }}
              >

              </Form.Item>
            </Form>
          </div>

          <div>


            <Drawer
              title={customPromptFormData.id === '' ? "Create Prompt" : "Edit Prompt"}
              placement="bottom"
              closable={false}
              height={'100%'}
              // onClose={onClose}
              open={isPopoverOpen}
              getContainer={false}
              extra={
                <Space>

                  <Button style={{ zIndex: '9' }} onClick={() => openCustomPromptForm({ isOpen: false, data: { 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' } })}>Cancel</Button>

                  {/* <Button type="primary">
                    OK
                  </Button> */}

                </Space>
              }
            >
              <div style={{
                // backgroundColor: 'red',
                position: 'absolute',
                left: '0',
                top: '0',
                width: '100%',
                height: '64px',
                cursor: 'all-scroll'
              }}
                onMouseDown={handleMouseDown}
              ></div>

              <CustomPromptForm openCustomPromptForm={openCustomPromptForm} handlePromptEdited={handlePromptEdited} data={customPromptFormData} />

            </Drawer>

          </div>


        </ConfigProvider >

      </div >
    </>

  );
};