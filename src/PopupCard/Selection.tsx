import browser from 'webextension-polyfill'

import React, { useEffect, useState, useRef } from "react";
import { playTextToSpeech, textToSpeechDownload } from '../util'

import { Button } from 'antd';

import { useCurrentLanguage } from '../lib/locale'
import { languageCodes } from "../lib/lang"

import {
  CustomerServiceOutlined
} from '@ant-design/icons';

interface SelectionProps {
  text: string;
}

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

`



export function Selection(props: SelectionProps) {

  const [targetLanguage, setTargetLanguage] = useState('United States');
  const [showFullText, setShowFullText] = useState(true);
  const [playStatus, setPlayStatus] = useState(false);

  const lastSpeakTime = useRef<number>(Math.floor(Date.now()))

  // 获取用户设置的语言信息
  let Lang = useCurrentLanguage()!

  useEffect(() => {

    setTargetLanguage(Lang['target']['id'])
    setShowFullText(props.text.length <= 140)
    setPlayStatus(false)

    browser.storage.onChanged.addListener(onStorageChange)

    return () => {
      browser.storage.onChanged.removeListener(onStorageChange)
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
      return
    }


    try {


      playTextToSpeech(props.text, languageCodes[targetLanguage as keyof typeof languageCodes], targetLanguage)
      // textToSpeechDownload(props.text, languageCodes[targetLanguage as keyof typeof languageCodes])
      lastSpeakTime.current = Math.floor(Date.now())

    } catch (error) {

      // 暂停上一次播报任务
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(props.text);

      // 语种
      utterance.lang = languageCodes[targetLanguage as keyof typeof languageCodes];
      // console.log(languageCodes[targetLanguage as keyof typeof languageCodes]);
      // console.log(targetLanguage);

      // 语速
      if (playStatus) {
        // 基数次播放时采用慢速播放，让用户可以听的更清楚
        utterance.rate = 0.6

      } else {
        utterance.rate = 0.85
      }

      setPlayStatus(!playStatus)

      // 开播吧
      speechSynthesis.speak(utterance);

    }


    // amplitude.track('speak');
    browser.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'speak' })



  }

  const onStorageChange = (changes: any, area: any) => {

    // console.log(changes);

    // 更新目标语言
    if ('targetLanguage' in changes) {
      // console.log('changes');
      // console.log(changes['targetLanguage']['newValue']);
      setTargetLanguage(changes['targetLanguage']['newValue'])
    }

  }

  const handleToggleShowFunText = () => {
    setShowFullText(!showFullText)
  }

  // const classes = useStyles()
  return (
    <>
      <style>{style}</style>
      <div id="ScouterSelection" className=''
        style={{
          marginTop: '18px',
          lineHeight: '1.5'
        }}
      >

        {showFullText ? <><span>{props.text}</span>{props.text.length > 140 && <a className='moreButton' onClick={handleToggleShowFunText}>Less</a>}</>
          : <><span>{props.text.substring(0, 140) + '...'}</span><a className='moreButton' onClick={handleToggleShowFunText}>More</a></>}

        <Button style={{
          display: 'inline-block',
          position: 'relative',
          bottom: '2px'
        }}
          size="small" type="text" icon={<CustomerServiceOutlined />} onClick={speaker} />
      </div>
    </>
  );
};