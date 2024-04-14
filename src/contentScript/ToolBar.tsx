import browser from 'webextension-polyfill'
import React, { useEffect, useRef, useState } from "react";
import { Tooltip } from 'antd';
import styled, { css } from 'styled-components';

import { ConfigProvider, Dropdown } from 'antd';
import type { MenuProps } from 'antd';

import { useUserInfoContext } from '../lib/userInfo'
import { userInfoType, AnkiInfoType } from '../types'

import { CONTAINER_CLASSNAME, getSelection } from './index'
import { fetchcurrentLanguage } from '../lib/lang';
import { languageCodes } from "../lib/lang"
import { playTextToSpeech } from '../util'
import { getDefaultPrompt, dictionaryPrompt } from '../PopupCard/util'

import { PromptType } from "../types"

import { useCurrentLanguage } from '../lib/locale'

import {
  CustomerServiceOutlined
} from '@ant-design/icons';

import LOGO from '../assets/icon128.png'

interface ToolBarProps {
  selectedText: any;
  range: any;
  selectedTextString: string;
  selectedSentence: string;
}


const StyledButton = styled.button<{ $disable?: boolean }>`
      
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
  
      ${props => props.$disable && css`
        opacity: 0.5;
        cursor: help;
      `}
  
      // ${props => !props.$disable && css`
      //   cursor: default;
      // `}
  
  
  `;

const IconButton = styled.button`
      
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

export function ToolBar(props: ToolBarProps) {

  const [showMenu, setShowMenu] = useState(true)
  const [showPromptsMenu, setShowPromptsMenu] = useState(false)
  const ContextBox = useRef<HTMLDivElement>(null);
  const [prompts, setPrompts] = useState<Array<PromptType>>([]);
  const [executedPromptHistoryInToolBar, setExecutedPromptHistoryInToolBar] = useState<Array<PromptType>>([]);
  const userInfo: { user: userInfoType, anki: any } | null = useUserInfoContext()

  // let portFromMenu: any

  // 获取包含 shadow DOM 的元素
  const shadowHost = document.querySelector('#__jiang-scouter');
  const shadowRoot = shadowHost?.shadowRoot;
  const container = shadowRoot?.querySelector('.container');

  let Lang = useCurrentLanguage()!
  const currentLanguage = Lang['current']['name']
  const defaultPrompt = getDefaultPrompt(props.selectedTextString, currentLanguage)

  useEffect(() => {

    if (container) {

      const contextBox = ContextBox.current
      const popupCard = container.querySelector('#LearningEnglish2023')
      const PopupCardContainer = container.getElementsByClassName(CONTAINER_CLASSNAME)[0]
      const scouterContentBox = container.querySelector('.scouterContentBox')



      //设置按钮的位置
      const selectedTextX = props.selectedText.x
      const selectedTextY = props.selectedText.y

      const selectedTextWidth = props.selectedText.width
      const selectedTextHeight = props.selectedText.height

      const buttonX = contextBox?.getBoundingClientRect().x || 0
      const buttonY = contextBox?.getBoundingClientRect().y || 0

      // 选中文字相对窗口的偏移
      const offsetTop = popupCard!.getBoundingClientRect().y - selectedTextY > -70 ? 30 : 0

      // 最大 X 值
      const maxX = (popupCard?.getBoundingClientRect().width || 0) - contextBox!.getBoundingClientRect().width - 110

      const messageBoxHeight = scouterContentBox?.getBoundingClientRect().height!
      const containerBoxHeight = PopupCardContainer?.getBoundingClientRect().height!
      const height = messageBoxHeight > containerBoxHeight ? messageBoxHeight - 5 : containerBoxHeight - 4

      const minY = 0 - height + offsetTop

      let left = selectedTextX - buttonX + selectedTextWidth - 60
      // left = left > maxX ? maxX : left
      left = Math.max(10, Math.min(maxX, left));

      let top = selectedTextY - buttonY - 40
      // top = top < minY ? minY : top
      top = Math.max(minY, Math.min(80, top));



      // contextBox2!.style.position = 'relative'
      // contextBox!.style.position = 'absolute'

      contextBox!.style.left = left.toString() + 'px'
      contextBox!.style.top = top.toString() + 'px'

      setShowMenu(true)
    }

    // 默认 Prompt



    (async () => {
      let promptList = await browser.storage.sync.get({ "promptList": [] }).then((item) => {
        return item.promptList
      })
      promptList.unshift(dictionaryPrompt)
      promptList.unshift(defaultPrompt)
      setPrompts(promptList)

      const result = await browser.storage.local.get({ "executedPromptHistoryInToolBar": [dictionaryPrompt] })
      setExecutedPromptHistoryInToolBar(result.executedPromptHistoryInToolBar)

    })()


  }, [])


  const handleSetAnkiSpaceButtonClick = (event: any, isAddNew: boolean) => {
    setAnkiSpace(props.range, props.selectedTextString, event, isAddNew)
    // ContextBox.current!.parentNode?.removeChild(ContextBox.current!)
    setShowMenu(false)
  }

  const handleFollowUpMenuClick = (event: any) => {

    const PopupCardContainer = container?.getElementsByClassName(CONTAINER_CLASSNAME)[0]
    const messagesBox = container?.querySelector('.messages')

    const sentence = getSelection(true)

    const selectedTextX = props.selectedText.x
    const selectedTextY = props.selectedText.y

    const selectedTextWidth = props.selectedText.width
    const selectedTextHeight = props.selectedText.height

    const followUpMenuBoxX = messagesBox?.getBoundingClientRect().x || 0
    const followUpMenuBoxY = (messagesBox?.getBoundingClientRect().y || 0) + (messagesBox?.getBoundingClientRect().height || 0)
    const followUpMenuBoxWidth = 140
    // const followUpMenuBoxHeight = followUpMenuBox?.getBoundingClientRect().height || 0

    const maxX = (PopupCardContainer?.getBoundingClientRect().width || 0) - followUpMenuBoxWidth - 10
    // console.log(maxX);
    // console.log((messagesBox?.getBoundingClientRect().height || 0));
    // console.log(messagesBox?.getBoundingClientRect());
    // console.log(container.getElementsByClassName('followUpMenu')[0].getBoundingClientRect())
    const maxY = ((PopupCardContainer?.getBoundingClientRect().y || 0) + (PopupCardContainer?.getBoundingClientRect().height || 0)) - ((messagesBox?.getBoundingClientRect().y || 0) + (messagesBox?.getBoundingClientRect().height || 0)) - 230

    const messageBoxHeight = messagesBox?.getBoundingClientRect().height!
    const containerBoxHeight = PopupCardContainer?.getBoundingClientRect().height!
    const height = messageBoxHeight > containerBoxHeight ? messageBoxHeight + 180 : containerBoxHeight

    const minY = 0 - height + 130

    let left = (selectedTextX - followUpMenuBoxX + selectedTextWidth - 40)
    let top = (selectedTextY - followUpMenuBoxY - selectedTextHeight)

    // X 坐标的最大最小值
    left = Math.max(10, Math.min(maxX, left));

    // Y 坐标的最大值
    top = Math.max(minY, Math.min(maxY, top));

    setShowMenu(false)

    // 取消文字选中，避免意外弹出菜单栏
    window.getSelection()?.removeAllRanges();


    try {

      browser.runtime.sendMessage({
        type: 'UPDATE_POPUP_CARD', payload: {
          style: {
            left: left,
            top: top,
          }, followUpData: { keyWord: props.selectedTextString, sentence: sentence?.sentence }
        }
      });

    } catch (error) {

      // console.log(error);

    }





  }

  const setAnkiSpace = (range: Range, selectedText: string, event: Event, isAddNew: boolean) => {

    let span = document.createElement('span');
    const ankiSpace = container!.getElementsByClassName('ankiSpace')

    // 获取当前最大的 index
    let maxIndex = 0
    for (let i = 0; i < ankiSpace.length; i++) {
      const thisIndex = Number(ankiSpace[i].getAttribute('data-index'))
      if (thisIndex > maxIndex) {
        maxIndex = thisIndex
      }
    }

    let number = maxIndex === 0 ? 1 : maxIndex

    if (isAddNew) {
      number = maxIndex + 1
    }

    span.textContent = '{{c' + number + '::' + selectedText + '}}';
    span.className = 'ankiSpace'
    span.setAttribute('data-index', number.toString())

    span.onclick = function () {

      // 恢复为默认样式
      // span.innerText
      if (span.textContent) {

        // let oldText = span.textContent
        // oldText = oldText.replace('{{c1::', '')
        // oldText = oldText.replace('}}', '')

        var textNode = document.createTextNode(selectedText);
        span.parentNode?.replaceChild(textNode, span);
      }

    };

    range?.deleteContents();
    range?.insertNode(span);

  }

  const executivePrompt = async (prompt: PromptType) => {

    browser.runtime.sendMessage({
      type: 'UPDATE_POPUP_CARD', payload: {
        prompt: prompt,
        followUpData: {
          keyWord: props.selectedTextString,
          sentence: props.selectedSentence
        }
      }
    });

    setShowMenu(false)
  }

  const handleMenuClick: MenuProps['onClick'] = (e) => {

    const promptId = e.key
    const prompt = prompts.find((item) => item.id === promptId)
    if (prompt) {
      executivePrompt(prompt)
      //记录历史记录
      browser.storage.local.set(
        {
          executedPromptHistoryInToolBar: [prompt]
        }
      )
    }

  };
  let items: MenuProps['items'] = []
  items = prompts.map(item => { return { 'key': item.id, 'label': item.title } })

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#F08A24',
          },
        }}
      >
        {showMenu && <div ref={ContextBox}
          className='contextBox' style={{
            position: 'absolute'
          }}>
          <div style={{
            display: "flex",
            flexDirection: "row",
            marginRight: "8px",
            borderRight: "1px solid rgba(5, 5, 5, .12)",
            paddingRight: "18px"
          }}>

            <Tooltip placement="bottom"
              title={'Cloze deletion(same card)'}
              arrow={false}
            >
              <StyledButton style={{ marginRight: '10px' }} onClick={() => handleSetAnkiSpaceButtonClick(event, false)}>
                [...]
              </StyledButton>
            </Tooltip>

            <Tooltip placement="bottom"
              title={'Cloze deletion(new card)'}
              arrow={false}
            >
              <StyledButton onClick={() => handleSetAnkiSpaceButtonClick(event, true)}>
                [...]+
              </StyledButton>
            </Tooltip>

          </div>

          <div>

            <Tooltip placement="bottom"
              title={'Pronunciation(⚡Pro)'}
              arrow={false}
            >
              <StyledButton $disable={userInfo?.user.verified ? false : true} style={{
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '10px'
              }}

                onClick={async () => {

                  let lang = await fetchcurrentLanguage()
                  if (userInfo?.user.verified) {
                    if (lang) {

                      const targetLanguage = lang['target']['id']
                      playTextToSpeech(props.selectedTextString, languageCodes[targetLanguage as keyof typeof languageCodes], targetLanguage)
                      setShowMenu(false)

                    }
                  } else {
                    // alert(' You are not Pro')
                  }



                }}
              >
                <CustomerServiceOutlined />
              </StyledButton>
            </Tooltip>

          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}

          >
            <Tooltip placement="bottom"
              title={'Prompt(⚡Pro)'}
              arrow={false}
              open={showPromptsMenu}
            >

              <div
                onMouseEnter={() => {
                  if (!userInfo?.user.verified) {
                    setShowPromptsMenu(true)
                  }
                }}
                onMouseLeave={() => {
                  if (!userInfo?.user.verified) {
                    setShowPromptsMenu(false)
                  }
                }}
              >
                <Dropdown.Button
                  size="small"
                  overlayStyle={{ width: '66%' }}
                  getPopupContainer={() => ContextBox.current as HTMLDivElement}
                  disabled={!userInfo?.user.verified}
                  menu={menuProps} onClick={() => {
                    executivePrompt(executedPromptHistoryInToolBar[0])
                  }}
                >
                  {executedPromptHistoryInToolBar.length > 0 && (
                    executedPromptHistoryInToolBar[0].title.length > 10 ?
                      executedPromptHistoryInToolBar[0].title.substring(0, 10) + '...' :
                      executedPromptHistoryInToolBar[0].title)}
                </Dropdown.Button>
              </div>
            </Tooltip>
          </div>
        </div >
        }
      </ConfigProvider>
    </>

  )
}

