import browser from 'webextension-polyfill'

import React, { useEffect, useState, useRef, createContext, useContext } from "react";

import { userInfoType, addToAnkiStatusType, langType, AnkiInfoType, AnkiModelType } from '../../types'

import { v4 as uuidv4 } from 'uuid';

import { setDonotClosePopupCard } from '..'

import { Nav } from "../../Components/Nav"
import { CustomPromptForm } from "../../Components/CustomPromptForm"

import { Images } from "../../Components/Images"
import { MessagesList } from "./Message"
import { PromptList } from "./PromptList"
import Notice from '../../Components/Notice';
import { RegenerateButton } from "./RegenerateButton"
import { UserMessageInput } from "./UserMessageInput"
import { Selection } from "./Selection"
import { ErroTips } from "./ErroTips"

import { Skeleton, Input, message, ConfigProvider, theme, Result, Select, Drawer, Space, Form, Button } from 'antd';
import { SendOutlined, LoadingOutlined } from '@ant-design/icons';


import { useCurrentLanguage } from '../../lib/locale'
import { useUserInfoContext } from '../../lib/userInfo'


import { windowInitialization, getInitialPrompt, getUnsplashImages, handleHightlight, handlePromptVariables, getAnkiCards } from './util'

import { PromptType, ChatMessage, ImageType, runPromptType } from "../../types"

import styled, { css } from 'styled-components';


let currentLanguage: string
let targetLanguage: string

// 获取 Anki 卡片，用于编写故事
let ankiCards: Array<{}>
getAnkiCards().then((cards: any) => {
  ankiCards = cards
}).catch((error) => {
  // console.log(error);

})

// 初始化 Anki 的 Model，为后续导入到 Anki 提速

const { TextArea } = Input;

// const AnkiContext = createContext(null);

const ScouterDiv = styled.div`

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


export function PopupCard(props:
  {
    data: { keyWord: string, Sentence: string },
    selection: any,
    options: {
      isPin?: boolean,
      runPrompt?: boolean,
      isYoutube?: boolean,
      youtubeData?: { keyWord: string, sencence: string, image: string }
    }
  }
) {


  const [messages, setMessages] = useState<Array<ChatMessage>>([{
    'content': [{
      'status': 'begin',
      'chatId': '',
      'content': ''
    }],
    'role': 'user',
    'prompt': '',
    'showImagesBox': true,
    'images': []
  }])

  const [prompts, setPrompts] = useState<Array<PromptType>>([]);
  const [lastExecutedPrompt, setLastExecutedPrompt] = useState<PromptType>({ 'title': '👉🏼 Please choose a prompt', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' })

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [customPromptFormData, setCustomPromptFormData] = useState<PromptType>({ 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' });

  // standby,normal,loading,success
  const [addToAnkiStatus, setAddToAnkiStatus] = useState<addToAnkiStatusType>({ 'status': 'normal', 'noteId': 0 });

  const [followUpData, setFollowUpData] = useState({ keyWord: '', sentence: '' });
  const [showFollowUpDataMenu, setShowFollowUpDataMenu] = useState({ show: false, style: {} })

  // 窗口拖拽逻辑
  const [dragging, setDragging] = useState(false);

  const windowElement = useRef<HTMLDivElement>(null);
  const messagesList = useRef<HTMLDivElement>(null);

  const shouldStayAtBottomRef = useRef(false);
  // const userInfoRef = useRef();

  const lastPromptRef = useRef<Array<{ role: string, content: string }>>();

  const [form] = Form.useForm();

  const userInfo: { user: userInfoType, anki: AnkiInfoType } | null = useUserInfoContext()

  let Lang = useCurrentLanguage()!
  currentLanguage = Lang['current']['name']
  targetLanguage = Lang['target']['name']

  // 控制追问菜单
  useEffect(() => {

    const port = browser.runtime.connect({
      name: 'fromPopupCard'
    })

    const handleMessage = (msg: { type: string, payload: { prompt: any, followUpData: { keyWord: string, sentence: string } } }) => {

      if (msg.type === "UPDATE_POPUP_CARD") {
        // 根据 id 获取 Prompt
        if (msg.payload.prompt) {
          executivePrompt(msg.payload.prompt, 'yes', msg.payload.prompt.getUnsplashImages, { keyWord: msg.payload.followUpData.keyWord, sentence: msg.payload.followUpData.sentence })
        }
      }

    }

    port.onMessage.addListener(handleMessage);

    return () => {
      port.onMessage.removeListener(handleMessage);
    };

  }, []);



  useEffect(() => {
    // 渲染 Prompt 列表
    initializePromptList()

    // 重复添加到 Anki 按钮的状态
    // setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 })

    if (props.options.runPrompt || props.options.runPrompt === undefined) {


      // 获取最近一次执行的 Prompt
      browser.storage.local.get({ "lastExecutedPrompt": '' }).then(async (item) => {

        if (item.lastExecutedPrompt === '') {

          // 执行默认 Prompt、获取 Unsplash 图片
          const pormpt = await getInitialPrompt(props.data.keyWord, currentLanguage)
          executivePrompt(pormpt)

        } else {
          // 执行 Prompt、获取 Unsplash 图片
          if (item.lastExecutedPrompt.id === "Default") {
            const pormpt = await getInitialPrompt(props.data.keyWord, currentLanguage)
            executivePrompt(pormpt)
          } else {
            executivePrompt(item.lastExecutedPrompt)
          }

        }



      })


    } else {

      // 不执行任何 Prompt，由用户自行选择

      executivePrompt({ 'title': 'Default', 'getUnsplashImages': true, 'userPrompt': `Word:"{{keyWord}}", sentence: "{{sentence}}"`, 'id': 'Default' }, 'no')
      // setIsOpenMenu(true)


    }


    // 设置窗口的默认位置、添加滚动事件，让消息列表自动滚动到底部
    windowInitialization(
      {
        'isPin': props.options.isPin || false,
        'windowElement': windowElement,
        'selection': props.selection,
        'messagesList': messagesList
      }, props.options.isYoutube
    )


  }, [props.data.keyWord]);

  // 聊天记录改变时
  useEffect(() => {

    // 记录当前列表的位置
    if (windowElement.current) {
      const container = windowElement.current.querySelectorAll('.container')[0]
      shouldStayAtBottomRef.current = container.scrollHeight - container.scrollTop <= container.clientHeight + 20;

      const contentLength = messages.length > 0 ? messages[messages.length - 1].content.length : 0

      // 自动滚动到消息底部，方便看到最新的文字
      if (messages.length > 1) {

        if (messages[messages.length - 1].content[contentLength - 1].status === 'process' || messages[messages.length - 1].content[contentLength - 1].status === 'begin') {
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


    // 保存历史记录，只保留消息记录的第 1 条，如果这条消失是错误提示，则不保存
    if (messages.length === 1 && messages[0]['content'][messages[0]['content'].length - 1]['status'] === 'done') {

      (async () => {

        const storage = await browser.storage.local.get({ "history": [], "lastExecutedPrompt": '' })

        const keyWord = props.data.keyWord
        const Sentence = props.data.Sentence

        // 将查询记录保存起来
        const newHistory = {
          'keyWord': keyWord,
          'sentence': Sentence,
          'role': messages[0]['role'],
          'answer': messages[0]['content'][messages[0]['content'].length - 1]['content'],
          'source': window.location.href,
          'prompt': messages[0]['prompt'],
          'images': messages[0]['images']
        }

        if (keyWord !== '' && Sentence !== '' && messages[0]['content'][messages[0]['content'].length - 1]['content'] !== '' && storage.lastExecutedPrompt.id !== 'dict') {

          // console.log(item.history);

          let newHistoryList: any = []
          let bingo = false
          newHistoryList.push(newHistory)
          // 如果最近执行的是在线词典，则不保存历史记录
          if (Array.isArray(storage.history)) {

            // 如果记录已存在，则不重复保存
            for (let i = 0; i < storage.history.length; i++) {

              let obj = storage.history[i]


              if (obj.keyWord === newHistory['keyWord'] && obj.sentence === newHistory['sentence'] && obj.prompt === newHistory['prompt']) {

                bingo = true
                break

              }

            }

            newHistoryList = storage.history
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

        }

      }
      )()



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

  // 执行 Prompt
  const executivePrompt = async (prompt: PromptType,
    runPrompt?: runPromptType,
    imageToRerender?: boolean,
    data?: { keyWord: string, sentence: string }) => {

    // 设置加载状态
    // setIsLoading(true)

    let needToRunPrompt = runPrompt
    if (needToRunPrompt === undefined) {
      needToRunPrompt = 'yes'
    }

    let needToRerenderImage = imageToRerender
    if (needToRerenderImage === undefined) {
      needToRerenderImage = true
    }

    let keyWord = props.data.keyWord
    let Sentence = props.data.Sentence

    if (data !== undefined) {
      keyWord = data.keyWord
      Sentence = data.sentence
    } else {
      // 初始化
      setMessages([])   // 对话列表
    }


    // 如果需要立即执行 Prompt
    if (needToRunPrompt !== 'no') {

      //初始化图片容器
      let showImagesBox = true
      if (prompt.id === 'dict' || prompt.id === 'Default') {

        // 关键字过长时不显示图片
        if (keyWord.length < 20) {
          showImagesBox = true
        } else {
          showImagesBox = false
        }

      } else {
        // 自定义 Prompt
        if (prompt.getUnsplashImages && needToRunPrompt) {
          // 如果当前 Prompt 需要显示图片，且当前需要立即执行 Prompt
          showImagesBox = true

        } else {

          showImagesBox = false

        }
      }



      // 埋点
      browser.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'executivePrompt' })

      // 在消息历史中插入新记录
      setMessages(prevMessages => [...prevMessages,
      {
        'content': [{
          'chatId': uuidv4(),
          'content': '',
          'status': 'begin'
        }],
        'role': 'assistant',
        'prompt': '',
        'showImagesBox': showImagesBox,
        'images': []
      }])

      // 非追问时，才会记录最近执行的 Prompt
      if (data === undefined) {

        // 设置最近执行的 Prompt
        setLastExecutedPrompt(prompt)

        // 记录最近 1 次使用的 Prompt，用于下次启动窗口时默认执行此 Prompt
        browser.storage.local.set(
          {
            lastExecutedPrompt: prompt
          }
        )
      }

      let newPrompt: Array<{ role: string, content: string }>;
      let p = prompt.userPrompt
      // 处理 Prompt 中的变量
      p = await handlePromptVariables(p, keyWord, Sentence, Lang)
      newPrompt = [{ 'role': 'user', 'content': p }]

      // 如果历史记录中存在记录，则不重复请求 API，直接显示历史记录的信息
      const result = await browser.storage.local.get({ "history": [] }).then((item) => {
        // console.log(item);

        // 如果记录已存在，则不重复保存
        let bingo = false
        let updatedLastMessage: ChatMessage | undefined
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

            // console.log('历史记录：');
            // console.log(obj);

            // 直接显示历史记录中的回答
            updatedLastMessage = {
              ...messages[messages.length - 1],
              role: obj.role,
              content: [{

                'chatId': uuidv4(),
                'content': obj.answer,
                'status': 'done'

              }],
              prompt: newPrompt[0]['content'],
              showImagesBox: showImagesBox,
              images: obj.images
            };

            break
          }
        }

        return { bingo: bingo, updatedLastMessage: updatedLastMessage }

      })

      if (result.bingo) {
        //显示历史记录
        setMessages([result.updatedLastMessage!])

        setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 })

        lastPromptRef.current = newPrompt

        // 如果需要显示图片，且历史记录中没有图片，则获取图片
        if (showImagesBox && result.updatedLastMessage?.images.length === 0) {
          // 获取图片数据
          getUnsplashImages(keyWord).then((imgs: any) => {
            // 保存图片数据
            setMessages(prevMessages => {

              const lastMessage = prevMessages[prevMessages.length - 1];

              if (prevMessages.length === 0) {
                return []
              }

              const updatedLastMessage = {
                ...lastMessage,
                needToShowImg: true,
                images: imgs
              };

              return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];

            })

          })
        }

      } else {


        // 获取语言知识
        getKnowledge(newPrompt, keyWord, prompt.id)


        // 请求图片
        if (prompt.id == 'Default' || prompt.id == 'dict') {

          if (keyWord.length <= 20 && prompt.getUnsplashImages && needToRerenderImage) {
            // 获取图片数据
            handleImages(keyWord)
            // getUnsplashImages(keyWord).then((imgs: any) => {
            //   // setImages(imgs)

            //   // 保存图片数据
            //   setMessages(prevMessages => {

            //     const lastMessage = prevMessages[prevMessages.length - 1];

            //     if (prevMessages.length === 0) {
            //       return []
            //     }

            //     const updatedLastMessage = {
            //       ...lastMessage,
            //       needToShowImg: true,
            //       images: imgs
            //     };

            //     return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];

            //   })

            // })

          }

        } else {

          if (prompt.getUnsplashImages && needToRerenderImage) {
            // 获取图片数据
            handleImages(keyWord)

            // getUnsplashImages(keyWord).then((imgs: any) => {
            //   // setImages(imgs)

            //   // 保存图片数据
            //   setMessages(prevMessages => {

            //     const lastMessage = prevMessages[prevMessages.length - 1];

            //     if (prevMessages.length === 0) {
            //       return []
            //     }

            //     const updatedLastMessage = {
            //       ...lastMessage,
            //       needToShowImg: true,
            //       images: imgs
            //     };

            //     return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];

            //   })

            // })

          }

        }

      }



    } else {
      // 打开 Popup 窗口，不需要立即执行 Prompt
      setLastExecutedPrompt({ 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' })
      // 数据埋点
      browser.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'openPopupCard' })

    }

  }

  // 点击「重新生成」按钮
  const handleRegenerateButtonClick = () => {

    // 在消息历史中插入新记录
    setMessages(prevMessages => {


      let newMessages = [...prevMessages]
      newMessages[newMessages.length - 1].content.push({
        chatId: uuidv4(),
        content: '',
        status: 'begin',
      })

      // begin 状态才会显示加载动画
      const content = newMessages[newMessages.length - 1].content
      newMessages[newMessages.length - 1].content[content.length - 1].status = 'begin'

      return newMessages

    })

    // 获取最近执行的 Prompt，再次执行
    getKnowledge(lastPromptRef.current!, props.data.keyWord)

  }

  const initializePromptList = async () => {
    // 获取已保存的 Prompt List
    const promptList = await browser.storage.sync.get({ "promptList": [] }).then((item) => {
      return item.promptList
    })

    setPrompts(promptList)

  }

  // 编辑自定义 Prompt 成功后
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

    browser.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'handlePromptEdited' })

  }

  // 请求 GPT 数据
  const getKnowledge = async (prompt: Array<{ role: string, content: string }>, keyWord?: string, promptId?: string) => {

    // 使用长连接
    const port = browser.runtime.connect({
      name: 'getGPT'
    })

    // 记录最近执行的 Prompt，用于重新生成
    lastPromptRef.current = prompt

    const thisKeyWord = keyWord || '';
    const thisPromptId = promptId || '';


    // 禁用保存到 Anki 按钮
    setAddToAnkiStatus({ 'status': 'standby', 'noteId': 0 })

    if (thisPromptId === 'dict') {
      setTimeout(() => {
        // 使用 postMs 发送信息
        port.postMessage({ 'type': 'getDictionaryData', 'messages': prompt, 'keyWord': thisKeyWord })
      }, 20);
    } else {
      setTimeout(() => {
        // 使用 postMs 发送信息
        port.postMessage({ 'type': 'getKnowledge', 'messages': prompt, 'keyWord': thisKeyWord })
      }, 20);
    }


    // browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

    //   // console.log(msg);

    // })
    // 接收信息
    port.onMessage.addListener((msg: any) => {

      // console.log('port.onMessage.addListener');

      if (msg.type === 'sendGPTData') {

        // 请求 GPT 数据成功且数据流传输中
        // if (msg.status === 'process' || msg.status === 'end') {

        try {

          // 渲染数据
          setMessages(prevMessages => {

            const newMessages = [...prevMessages]
            const lastMessage = newMessages[newMessages.length - 1];

            // 深度拷贝
            let contentList = JSON.parse(JSON.stringify(lastMessage.content));

            let newContent = msg.ApiType === 'chatGPTWeb' ? msg.content : contentList[contentList.length - 1]['content'] + msg.content
            newContent = handleHightlight(newContent, props.data.keyWord, ankiCards, windowElement?.current)

            contentList[contentList.length - 1]['content'] = newContent
            contentList[contentList.length - 1]['status'] = msg.status

            const newContentList = [...contentList]

            const updatedLastMessage: ChatMessage = {
              ...lastMessage,
              content: newContentList,
              prompt: prompt[0]['content']
            };

            return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];


          })

        } catch (error) {

        }


        // }


        // 请求 GPT 数据成功且数据流结束传输
        if (msg.status === 'done' || msg.status === 'erro') {

          setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 })

        }


      }

    })

  };

  // 渲染图片
  const handleImages = (keyWord: string) => {

    getUnsplashImages(keyWord).then((imgs: any) => {
      // setImages(imgs)

      let newImages = imgs

      if (props.options.isYoutube && props.options.youtubeData) {

        const youtubeImage: ImageType = {
          type: 'youtube',
          id: 'youtube',
          urls: {
            small: props.options.youtubeData.image,
          },
          links: {
            download_location: '',
          },
          description: '',
          user: {
            username: 'Youtube',
            name: 'Youtube',
          }
        }

        newImages.unshift(youtubeImage)

      }

      // 保存图片数据
      setMessages(prevMessages => {

        const lastMessage = prevMessages[prevMessages.length - 1];

        if (prevMessages.length === 0) {
          return []
        }

        const updatedLastMessage = {
          ...lastMessage,
          needToShowImg: true,
          images: newImages
        };

        return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];

      })

    })

  }

  // 用户发送消息
  const handleSendMessage = (values: string, getFeedback: boolean = true) => {

    // console.log(values);
    let prompt = values

    // // 清空文本框
    // form.resetFields();

    // 定位到底部
    scrollToBottom(true)

    // 将用户发言发送到消息记录中
    setMessages(prevMessages => {

      const updatedLastMessage: ChatMessage = {
        role: 'user',
        content: [
          {
            chatId: uuidv4(),
            content: values,
            status: 'done',
          }
        ],
        prompt: prompt,
        showImagesBox: false, // 用户发言不需要显示图片
        images: []
      };

      return [...prevMessages, updatedLastMessage];

    });

    // 是否需要获取 AI 的反馈
    if (getFeedback) {
      // 在消息历史中插入新 GPT 消息
      setMessages(prevMessages => [...prevMessages, {
        content: [{
          chatId: uuidv4(),
          content: '',
          status: 'begin',
        }],
        role: 'assistant',
        prompt: '',
        showImagesBox: false,
        images: []
      }])

      const msgHistory = messages.slice(-5).map((item) => { return { 'role': item.role, 'content': item.content[item.content.length - 1]['content'] } })

      getKnowledge([...msgHistory, { "role": "user", "content": values }])
    }

    // amplitude.track('handleSendMessage');
    browser.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'handleSendMessage' })

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

  // GPT 生成消息时，自动定位到消息列表底部，方便用户阅读
  const scrollToBottom = (canSroll: boolean = false) => {

    if (windowElement.current !== null) {
      const container = windowElement.current.querySelectorAll('.container')[0]

      if (canSroll) {
        // 位于底部，需要自动滚动

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
      // 开启表单
      // amplitude.track('openCustomPromptForm');
      browser.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'openCustomPromptForm' })
    }
    // 开启表单后禁止点击窗口外区域关闭窗口
    setDonotClosePopupCard(data.isOpen)

  }

  return (
    <>

      <ScouterDiv id="LearningEnglish2023"
        ref={windowElement}

        style={{
          left: 10,
          top: 10,
        }}

      >

        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#F08A24',
            },
          }}
        >

          <Nav
            // handleSaveToAnkiBtnClick={handleSaveToAnkiBtnClick}
            addToAnkiStatus={addToAnkiStatus}
            onMouseDown={handleMouseDown}
            handleMenuItemClick={executivePrompt}
            openCustomPromptForm={openCustomPromptForm}
            isOpenMenu={isOpenMenu}
            prompts={prompts}
            lastExecutedPrompt={lastExecutedPrompt}
            keyWord={props.data.keyWord}
            Sentence={props.data.Sentence}
            windowElement={windowElement.current}
          />

          <div className='container flex-grow flex flex-col overflow-auto'
            style={{
              marginTop: '50px'
            }}
          >
            <div className='scouterContentBox flex-grow'
              ref={messagesList}
              style={{}}
            >

              <Selection text={props.data.keyWord} />

              <MessagesList messages={messages} />

              {/* 当只有 1 条消息且是在线词典触发的则不显示「重新生成」按钮 */}
              {messages.length > 0 &&
                (messages[messages.length - 1].prompt === '' || messages[messages.length - 1].role === 'user' ? ''
                  :
                  <RegenerateButton messages={messages} handleRegenerateButtonClick={handleRegenerateButtonClick} />)}

              <div className='followUpMenuBox' style={{
                display: showFollowUpDataMenu.show ? 'block' : 'none',
                position: "relative",
                width: 'fit-content',
                height: '0'
              }}>

                <PromptList followUpData={followUpData} showFollowUpDataMenu={showFollowUpDataMenu}
                  promptList={prompts} handleMenuItemClick={executivePrompt} />

              </div>

            </div>
          </div>

          <UserMessageInput messages={messages} handleSendMessage={handleSendMessage} />

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

      </ScouterDiv >
    </>

  );
};