import React, { useEffect, useState } from "react";
import browser from "webextension-polyfill";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { summarizePrompt } from "../PopupCard/util";
import { getDocumentContent } from "../util";

import { userInfoType } from "../../types";
import { useCurrentLanguage } from "../../lib/locale";
import { useUserInfoContext } from "../../lib/userInfo";

import styled, { css } from "styled-components";

const Button = styled.button`
  &:hover {
    background-color: red;
  }
`;

const Summarize: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [responseData, setResponseData] = useState<string>("");
  const userInfo: { user: userInfoType; anki: any } | null =
    useUserInfoContext();
  let Lang = useCurrentLanguage()!;

  useEffect(() => {
    (async () => {
      let prompt = summarizePrompt.userPrompt;
      const document = await getDocumentContent();
      const content = document.content;
      prompt = prompt.replace(/\{article\}/g, content);

      const targetLanguage = Lang["target"]["name"];
      prompt = prompt.replace(/\{targetLanguage\}/g, targetLanguage);
      sendMessageToBackground([{ role: "user", content: prompt }]);
    })();
  }, []);

  const sendMessageToBackground = async (
    messages: Array<{ role: string; content: string }>
  ) => {
    const newMessages = [...messages];

    // 使用长连接
    const port = browser.runtime.connect({
      name: "getGPT",
    });

    // 使用 postMs 发送信息
    port.postMessage({
      type: "getKnowledge",
      messages: newMessages,
    });

    // 接收信息
    port.onMessage.addListener((msg: any) => {
      if (msg.type === "sendGPTData") {
        try {
          // 处理接收到的数据并更新状态
          setResponseData((old) => old + msg.content);
          //   console.log("Received data:", msg.content);
        } catch (error) {
          console.error("Error processing message:", error);
        }
      }
    });
  };

  return (
    <div
      style={{
        color: "oklch(0.216 0.006 56.043)",
        fontFamily:
          'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize: "14px",
        lineHeight: 1.6,
        width: "320px",
        height: "560px",
        position: "fixed",
        top: "50%",
        right: "-1px",
        transform: "translateY(-50%)",
        zIndex: "99",
        backgroundColor: "white",
        boxShadow:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        overflowY: userInfo?.user.verified ? "auto" : "hidden",
        border: "1px solid oklch(0.381 0.176 304.987 / 0.1) ",
        borderRadius: "4px 0 0 4px",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          background: "#fff",
          padding: "0 calc(1rem - 6px) 0 1rem",
          borderBottom: "1px solid oklch(0.381 0.176 304.987 / 0.1) ",
          height: "2rem",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          Summary
        </div>
        <Button
          style={{
            color: "oklch(0.216 0.006 56.043)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            background: "none",
            border: "none",
            height: "20px",
            width: "24px",
            justifyContent: "center",
          }}
          onClick={() => onClose()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </Button>
      </div>
      <div style={{ padding: "1rem" }}>
        {responseData !== "" ? (
          <div style={{}}>
            <ReactMarkdown
              remarkPlugins={[breaks, remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              skipHtml={false}
              children={responseData}
            />
          </div>
        ) : (
          <div style={{ color: "#333" }}>loading...</div>
        )}
      </div>
      {/* 付费提示 */}
      {!userInfo?.user.verified && (
        <div
          style={{
            color: "#fff",
            fontWeight: "bold",
            width: "100%",
            height: "100%",
            backgroundColor: "oklch(0.147 0.004 49.25/0.3)",
            position: "fixed",
            top: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          🚀 Subscribe to Unlock
          <a
            target="_blank"
            href="https://jiangzilong.notion.site/1b1596b28b348073b66dd6d91b3fe60a?pvs=4"
            style={{
              color: "#fff",
              textDecoration: "underline",
              padding: "0.25rem",
            }}
          >
            Learn More
          </a>
        </div>
      )}
    </div>
  );
};

export default Summarize;
