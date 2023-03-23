import React, { useEffect, useState } from "react";
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import ReactDOM from "react-dom";

import "../index.css"

import { Nav } from "../Components/Nav"

import { Options } from "../Options"

import { Selection } from "./Selection"
import { ErroTips } from "./ErroTips"

import { Divider, Skeleton, Input } from 'antd';

const { TextArea } = Input;

export function PopupCard(props: any) {

  const [openApiAnser, setopenApiAnser] = useState('');
  const [openApiAnser2, setopenApiAnser2] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [isAnswerDone1, setAnswerDone1] = useState(false);
  const [isAnswerDone2, setAnswerDone2] = useState(false);

  const [keyWord, setKeyWord] = useState('');

  // const [conversationList, setConversationList] = useState<{ type: string, isLoading: boolean, content: string }[]>([{ 'type': 'ai', 'isLoading': true, 'content': '' }]);



  useEffect(() => {
    // New Task
    console.log('## PopupCard useEffect')

    // 初始化
    setAnswerDone1(false)
    setAnswerDone2(false)
    setopenApiAnser2('')

    // 当前选中的文字
    let keyWord = props.selection.toString()
    setKeyWord(keyWord)
    // 选中文字所在的段落
    let sentens = props.selection.anchorNode.data

    let prompt = "我想学习有关 '" + keyWord + "'相关的英语知识\
    * 请解释 '"+ keyWord + "' 在下面句子中的作用\
    * 请使用 CEFR A2 级别的英语解释单词（注意这个解释要用英文）\
    * 使用图像记忆法描述单词\
    * 请提供 3 个例句。 \
    * 最后提供 '"+ keyWord + "' 相关的 2 道将中文翻译为英文的测试题，(你作为 AI 模型不要提供测试题的答案)。\
    这个句子是：'"+ sentens + "'"

    getGPTMsg(prompt)
    console.log(props);

  }, [props]);

  const getGPTMsg = async (prompt: string, type = 'as1') => {
    console.log('getGPTMsg:');
    console.log(type);

    console.log(isAnswerDone2);
    console.log(isAnswerDone1);
    console.log(isLoading);

    // 设置加载状态
    setIsLoading(true)

    chrome.storage.sync.get(["openApiKey"]).then((result) => {
      console.log(result);

      fetch('https://api.openai.com/v1/chat/completions', {

        method: "POST",
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [{ "role": "user", "content": prompt }],
          "temperature": 0,
          "top_p": 0.52,
          "frequency_penalty": 0.87,
          "presence_penalty": 0.3,
          "stream": true
        }),
        headers: { 'Authorization': 'Bearer ' + result.openApiKey, 'Content-Type': 'application/json', }

      }).then(async (response) => {

        console.log('response:');
        console.log(response);
        console.log(response.status);
        console.log(response.status === 401);
        if (response.status === 401) {
          // API KEY Error
          setIsLoading(false)
          if (type === 'as2') {
            setopenApiAnser2('API Key Error')
          } else {
            setopenApiAnser('API Key Error')
          }

          return
        }

        // 处理 server-sent events
        const parser = createParser((event) => {
          if (event.type === 'event') {
            // console.log('createParser:');
            try {
              console.log(JSON.parse(event.data)['choices'][0]['delta']['content']);
              let new_msg = JSON.parse(event.data)['choices'][0]['delta']['content']
              if (new_msg !== undefined) {

                // 渲染内容
                if (type === 'as2') {
                  setopenApiAnser2(oa => oa += JSON.parse(event.data)['choices'][0]['delta']['content'])
                } else {
                  setopenApiAnser(oa => oa += JSON.parse(event.data)['choices'][0]['delta']['content'])
                }


              }

            } catch {
              console.log(' createParser JSON.parse errow')
            }

          }
        })

        const reader = response.body?.getReader();
        if (reader !== undefined) {
          try {

            // eslint-disable-next-line no-constant-condition
            if (type === 'as2') {
              setopenApiAnser2('')
            } else {
              setopenApiAnser('')
            }

            setIsLoading(false)

            while (true) {
              const { done, value } = await reader.read()

              if (done) {
                if (type === 'as2') {
                  setAnswerDone2(true)
                } else {
                  setAnswerDone1(true)
                }

                break

              }

              const str = new TextDecoder().decode(value)
              parser.feed(str)


            }
          } finally {
            reader.releaseLock()
          }
          parser.reset()
        }


      })
        .catch((error) => {
          console.log('error');
          console.log(error);

          setIsLoading(false)

          if (type === 'as2') {
            setopenApiAnser2('🥲 Something Error')
          } else {
            setopenApiAnser('🥲 Something Error')
          }


        })

    });



  };

  // 提交答案
  const onPressEnter = (event: any) => {
    console.log(event);

    const a = 'hello'
    // 同时按下 Shirt 时，不提交答案
    if (!event.shiftKey && event.target.defaultValue.replace(/(\r\n|\n|\r)/gm, '') !== '') {
      let prompt = `请检查我的语法和单词是否有误 "${event.target.defaultValue} "`

      console.log(prompt);

      getGPTMsg(prompt, 'as2')
    }

  }

  return (
    <div id="LearningEnglish2023">
      <Nav title={keyWord} />
      {/* <Selection /> */}

      <Divider style={{ margin: '20px 0' }} />

      {isLoading && !isAnswerDone1 ? <Skeleton active /> : <div className="openAIAnswer" style={{ whiteSpace: 'pre-wrap' }}>
        {openApiAnser.replace(/\n\n/g, "\n").replace(/(^\s*)|(\s*$)/g, "")}
      </div>}

      {isAnswerDone1 ? <div className="userInput">
        <TextArea rows={3} placeholder="Press Enter to " onPressEnter={onPressEnter} disabled={isLoading || isAnswerDone2} />
      </div> : ''}

      {isLoading && !isAnswerDone2 && isAnswerDone1 ? <Skeleton active /> : <div className="openAIAnswer" style={{ whiteSpace: 'pre-wrap' }}>
        {openApiAnser2.replace(/\n\n/g, "\n").replace(/(^\s*)|(\s*$)/g, "")}
      </div>}

      <Options />
      
    </div>
  );
};

function ConversationItem(props: any) {
  console.log('hello');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('## ConversationItem useEffect');
    console.log(props);

  }, [props]);

  return (

    <li>{props.isLoading ?
      <Skeleton active /> : props.type === 'ai' ?
        props.content : <HumanInput content={props.content} />}</li>
  )

}

function HumanInput(props: any) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('## ConversationItem useEffect');
    console.log(props);

  }, [props]);

  return (
    <span>human input</span>
  )

}