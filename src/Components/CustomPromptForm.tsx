import browser from "webextension-polyfill";
import React, { useEffect, useState, useRef } from "react";

import { Select, Input, Space, Form, Button, Switch } from "antd";

interface CustomPromptFormProps {
  handlePromptEdited: (isNew: boolean) => void;
  openCustomPromptForm: (data: {
    isOpen: boolean;
    data: {
      title: string;
      getUnsplashImages: boolean;
      dictionary?: any;
      userPrompt: string;
      id: string;
    };
  }) => void;
  data: {
    title: string;
    getUnsplashImages: boolean;
    dictionary?: any;
    userPrompt: string;
    id: string;
  };
}

export function CustomPromptForm(props: CustomPromptFormProps) {
  const [form] = Form.useForm();
  //   const { Option } = Select;
  const formBoxElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 更新 input 文本框的默认值
    form.setFieldsValue({
      title: props.data.title,
      getUnsplashImages: props.data.getUnsplashImages,
      dictionary: props.data.dictionary,
      userPrompt: props.data.userPrompt,
    });
  }, [props.data]);

  // 保存 Prompt
  const savePrompt = async (values: any) => {
    console.log(values);
    
    // 关闭表单
    props.openCustomPromptForm({
      isOpen: false,
      data: { title: "", getUnsplashImages: false, userPrompt: "", id: "" },
    });

    const timestamp = new Date().getTime().toString();

    // 获取已保存的 Prompt List
    const promptList = await browser.storage.sync
      .get({ promptList: [] })
      .then((item) => {
        return item.promptList;
      });

    let newPrompts = promptList;

    // 如果 props 中包含 ID，则说明当前是在编辑 Prompt 而不是新增 Prompt
    if (props.data.id !== "") {
      // 在 Prompt 记录中找到这条 Prompt
      for (let i = 0; i < newPrompts.length; i++) {
        if (newPrompts[i]["id"] === props.data.id) {
          // 修改
          newPrompts[i]["title"] = values["title"];
          newPrompts[i]["dictionary"] = values["dictionary"];
          newPrompts[i]["getUnsplashImages"] = values["getUnsplashImages"];
          newPrompts[i]["userPrompt"] = values["userPrompt"];

          break;
        }
      }
    } else {
      newPrompts = [{ ...values, id: timestamp }, ...promptList];
    }
    console.log('newPrompts:');
    console.log(newPrompts);
    
    // 将 Prompt 保存下来
    browser.storage.sync
      .set({
        promptList:
          newPrompts.length > 6 ? newPrompts.splice(0, 6) : newPrompts,
      })
      .then((item) => {
        // 将 Prompt 传回给父组件，以让 Prompt 列表 UI 重新渲染
        props.handlePromptEdited(props.data.id === "");
      })
      .catch((error) => {
        alert(
          "🥲Save failed, possibly due to a too long Prompt. You can delete other Prompts or shorten the Prompt characters and try again. \n" +
            error
        );
      });
  };

  // 删除 Prompt
  const handleDeleteButtonClick = async () => {
    // 关闭表单
    props.openCustomPromptForm({
      isOpen: false,
      data: { title: "", getUnsplashImages: false, userPrompt: "", id: "" },
    });

    // 获取已保存的 Prompt List
    const promptList = await browser.storage.sync
      .get({ promptList: [] })
      .then((item) => {
        return item.promptList;
      });

    let newPrompts = promptList;

    // 在 Prompt 记录中找到这条 Prompt
    for (let i = 0; i < newPrompts.length; i++) {
      if (newPrompts[i]["id"] === props.data.id) {
        // 删除
        newPrompts.splice(i, 1);

        // 将 Prompt 保存下来
        browser.storage.sync
          .set({
            promptList:
              newPrompts.length > 6 ? newPrompts.splice(0, 6) : newPrompts,
          })
          .then((item) => {
            // 将 Prompt 传回给父组件，以让 Prompt 列表 UI 重新渲染
            props.handlePromptEdited(props.data.id === "");
          });

        break;
      }
    }
  };

  const handleKeyDown = (event: any) => {
    event.stopPropagation();
  };

  return (
    <div ref={formBoxElement}>
      <Form
        onFinish={savePrompt}
        // layout='horizontal'
        labelCol={{
          xs: { span: 6 },
          sm: { span: 5 },
        }}
        form={form}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input your title" }]}
        >
          <Input
            maxLength={24}
            onKeyDown={handleKeyDown}
            placeholder="How to name the Prompt"
            type="text"
          />
        </Form.Item>

        <Form.Item
          extra="Display Images Related to the Selected Text"
          name="getUnsplashImages"
          label="Images"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          //   extra="Display Images Related to the Selected Text"
          name="dictionary"
          label="Dictionary"
        >
          <Select
            getPopupContainer={() => formBoxElement.current as HTMLDivElement}
            placeholder="Dictionary"
            mode="tags"
            options={[
              { value: "youdao", label: "--> Chinese" },
            //   { value: "english", label: "--> Englishe" },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="userPrompt"
          label="Prompt"
          extra={
            <>
              {`${"{selection}"}: Selected text`}
              <br />
              {`${"{sentence}"}: Sentence containing the selected text`}
              <br />
              <a
                style={{
                  opacity: 1,
                  color: "#F08A24",
                  textDecoration: "underline",
                }}
                onClick={() =>
                  window.open(
                    "https://jiangzilong.notion.site/Dynamic-Placeholders-5f0705163ff640afbdd577115dc95779?pvs=4"
                  )
                }
              >
                Learn More
              </a>
            </>
          }
          rules={[{ required: true, message: "Please input your prompt" }]}
        >
          <Input.TextArea
            placeholder="Translate {selection} to Chinese"
            onKeyDown={handleKeyDown}
            rows={4}
            maxLength={3000}
          />
        </Form.Item>

        <Form.Item style={{ margin: "0" }}>
          {props.data.id !== "" && (
            <Button
              style={{
                marginRight: "12px",
              }}
              onClick={handleDeleteButtonClick}
              danger
            >
              Delete
            </Button>
          )}

          <Button
            style={{ minWidth: "120px" }}
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
