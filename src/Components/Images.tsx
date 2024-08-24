import React, { useEffect, useState, useRef } from "react";
import browser, { downloads, idle } from "webextension-polyfill";
import { Button, Image, Input, Empty, Tag, Tooltip } from "antd";
import {
  LoadingOutlined,
  ThunderboltOutlined,
  RightOutlined,
  LeftOutlined,
  CloseOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styled, { css } from "styled-components";
import { InputRef } from "antd/lib/input";
import { ProTag } from "./ProTag";

import { ImageType, userInfoType } from "../types";

import { useUserInfoContext } from "../lib/userInfo";

import { useSpring, animated } from "react-spring";

const IconButton = styled(Button)`
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

interface ImagesProps {
  images: Array<ImageType>;
  // keyWord: string;
  getUnsplashImages: (keyword: string) => void;
  generationsImages: (keyword: string) => void;
}

export function Images(props: ImagesProps) {
  const [images, setImages] = useState<Array<ImageType>>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [showControl, setShowControl] = useState(false);
  const [showImages, setShowImages] = useState(true);
  const [changeImage, setChangeImageStatus] = useState(false);

  const [imagesLoading, setImagesLoading] = useState(true);
  // const [searchImageIsLoading, setSearchImageIsLoading] = useState(false)

  const userInfo: { user: userInfoType; anki: any } | null =
    useUserInfoContext();
  // const [currentURL, setCurrentURL] = useState<string>();
  const inputElement = useRef<InputRef>(null);

  const imageBoxElement = useRef<HTMLDivElement>(null);

  const composing = useRef(false);

  const handleCompositionStart = () => {
    composing.current = true;
  };

  const handleCompositionEnd = () => {
    composing.current = false;
  };

  useEffect(() => {
    setImages(props.images);
    setImagesLoading(false);
  }, [props.images]);

  useEffect(() => {
    // console.log(inputElement);
    // console.log(inputElement.current);
    // console.log(inputElement.current?.input);
    if (userInfo?.user.verified) {
      inputElement.current?.focus();
    }
  }, [changeImage]);

  const handleEditImagesClick = () => {
    setChangeImageStatus(true);
  };

  const handleSearchInput = (event: any) => {
    event.stopPropagation();
  };

  const handleSearchBtnClick = (event: any) => {
    setImageIndex(0);

    event.stopPropagation();

    if (userInfo?.user.verified) {
      let inputValue = inputElement.current?.input?.value;

      if (inputValue && inputValue !== "" && !composing.current) {
        setImagesLoading(true);

        // 搜索图片
        props.getUnsplashImages(inputValue);
        setChangeImageStatus(false);

        // amplitude.track('handleSearchImage');
        browser.runtime.sendMessage({
          type: "amplitudeTrack",
          name: "handleSearchImage",
        });
      }
    } else {
      alert("Please activate Pro");
    }
  };

  const handleGenerationsImages = (event: any) => {
    setImageIndex(0);

    event.stopPropagation();

    if (userInfo?.user.verified) {
      let inputValue = inputElement.current?.input?.value;

      if (inputValue && inputValue !== "") {
        setImagesLoading(true);

        // 生成图片
        props.generationsImages(inputValue);
        setChangeImageStatus(false);

        browser.runtime.sendMessage({
          type: "amplitudeTrack",
          name: "handleGenerationsImages",
        });
      }
    } else {
      alert("Please activate Pro");
    }
  };

  const convertBlobToBase64 = (blob: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handlePasteImage = async () => {
    console.log("handlePasteImage");
    try {
      // 检查浏览器是否支持 clipboard API
      if (navigator.clipboard && navigator.clipboard.read) {
        const items = await navigator.clipboard.read();
        console.log(items);

        for (const item of items) {
          // 检查 item 是否是图片
          if (item.types.includes("image/png")) {
            const blob = await item.getType("image/png");
            const url = await convertBlobToBase64(blob);

            const imageObj: ImageType = {
              type: "clipboard",
              id: Date.now().toString(),
              urls: {
                small: url as string,
              },
              links: {
                download_location: "",
              },
              description: "",
              user: {
                username: "Clipboard",
                name: "Clipboard",
              },
            };
            setImages((oldList) => {
              return [imageObj, ...oldList];
            });
            setImageIndex(0);
          }
        }
      } else {
        console.log("Clipboard API is not supported in this browser.");
      }
    } catch (error) {
      console.error("Error reading clipboard contents: ", error);
    }
  };

  const handleChangeImagesClick = (offset: number) => {
    setImageIndex((index) => {
      index = index + offset;
      if (index >= images.length) {
        index = 0;
      }
      if (index < 0) {
        index = images.length - 1;
      }

      return index;
    });

    // amplitude.track('handleChangeImage');
    browser.runtime.sendMessage({
      type: "amplitudeTrack",
      name: "handleChangeImage",
    });
  };

  const handleImagesBoxHover = (e: any) => {
    if (e.type === "mouseenter") {
      setShowControl(true);
    }

    if (e.type === "mouseleave") {
      // 显示图片搜索框时不自动隐藏控件

      if (!changeImage || inputElement.current?.input?.value === "") {
        setShowControl(false);
        setChangeImageStatus(false);
      }

      // setShowControl(true)
    }
  };

  const animationStyle = useSpring({
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
    config: { duration: 1000 },
    loop: true,
    width: "32px",
    height: "32px",
    border: "1px solid red",
  });

  return (
    <>
      <div
        className="images"
        ref={imageBoxElement}
        style={{
          position: "relative",
          lineHeight: "0",
          marginTop: "18px",
        }}
      >
        {showImages ? (
          <div>
            <div
              onMouseEnter={handleImagesBoxHover}
              onMouseLeave={handleImagesBoxHover}
            >
              {imagesLoading && (
                <div
                  style={{
                    position: "absolute",
                    color: "#ffffff",
                    backgroundColor: "rgb(0, 0, 0,0.5)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: "9",
                  }}
                >
                  <animated.div style={animationStyle}>
                    <LoadingOutlined />
                  </animated.div>
                </div>
              )}

              {/* 图片 */}
              {images.length > 0 ? (
                <>
                  <div className="imageBox">
                    <Image
                      data-downloadlocation={
                        images[imageIndex].links.download_location
                      }
                      src={images[imageIndex].urls.small}
                      alt={images[imageIndex]["description"]}
                      height={240}
                      width={"100%"}
                      preview={false}
                      placeholder
                    />
                  </div>

                  <div
                    className="imageQueue"
                    style={{
                      display: "none",
                    }}
                  >
                    {images.map((img) => (
                      <img key={img.id} src={img.urls.small}></img>
                    ))}
                  </div>
                </>
              ) : (
                <div
                  style={{
                    height: "240px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    border: "1px solid rgba(5, 5, 5, .06)",
                    borderRadius: "2px",
                  }}
                >
                  <Empty
                    style={{ margin: "0 auto" }}
                    description="No related pictures found"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                </div>
              )}

              {/* 图片控制控件 */}
              {showControl && !imagesLoading && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "100%",
                    height: "100%",
                    left: 0,
                    display: "flex",
                    borderRadius: "0 2px",
                    // justifyContent: 'space-around',
                    flexDirection: "column",
                  }}
                >
                  {/* 图片控制 */}
                  <div
                    style={{
                      padding: "8px",
                      // margin: '0px 18px',
                      background:
                        "linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 27.6%, rgba(0, 0, 0, 0.2) 54.69%, rgba(0, 0, 0, 0.35) 100%)",
                    }}
                  >
                    {changeImage ? (
                      // 显示图片搜索控件
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "2px 0",
                        }}
                      >
                        <div style={{ flex: "1", marginRight: "20px" }}>
                          <Input
                            style={{
                              backgroundColor:
                                userInfo?.user.verified === false
                                  ? "rgba(255, 255, 255, 0.9)"
                                  : "",
                              width: "100%",
                              paddingRight: "2px",
                            }}
                            suffix={<ProTag />}
                            disabled={!userInfo?.user.verified}
                            placeholder="Search images"
                            onKeyDown={handleSearchInput}
                            onCompositionStart={handleCompositionStart}
                            onCompositionEnd={handleCompositionEnd}
                            size="small"
                            ref={inputElement}
                            onPressEnter={handleSearchBtnClick}
                          />
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <Tooltip
                            placement="bottom"
                            title={"Search Images(⏎)"}
                            arrow={false}
                            getPopupContainer={() =>
                              imageBoxElement.current || document.body
                            }
                          >
                            <Button
                              
                              type="text"
                              size="small"
                              style={{
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: userInfo?.user.verified ? "pointer" : "not-allowed",
                                opacity: !userInfo?.user.verified ? "0.7" : "1",
                              }}
                              onClick={handleSearchBtnClick}
                              icon={<SearchOutlined />}
                            />
                          </Tooltip>

                          {/* <Tooltip
                            placement="bottom"
                            title={"Generate Images with AI"}
                            arrow={false}
                            getPopupContainer={() =>
                              imageBoxElement.current || document.body
                            }
                          >
                            <Button
                              disabled={!userInfo?.user.verified}
                              type="text"
                              size="small"
                              style={{
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: "10px",
                                opacity: !userInfo?.user.verified ? "0.7" : "1",
                              }}
                              onClick={handleGenerationsImages}
                              icon={<ThunderboltOutlined />}
                            />
                          </Tooltip> */}

                          <Tooltip
                            placement="bottom"
                            title={"Chancel"}
                            arrow={false}
                            getPopupContainer={() =>
                              imageBoxElement.current || document.body
                            }
                          >
                            <Button
                              type="text"
                              size="small"
                              style={{
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              onClick={() => setChangeImageStatus(false)}
                              icon={<CloseOutlined />}
                            />
                          </Tooltip>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {/* 显示图片导航控件 */}

                        <div
                          style={{
                            display: "flex",
                            flexGrow: "inherit",
                            alignItems: "center",
                          }}
                        >
                          {/* Left Box */}

                          {images.length > 0 && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Button
                                style={{
                                  color: "#fff",
                                  lineHeight: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                type="text"
                                size="small"
                                icon={<LeftOutlined />}
                                onClick={() => handleChangeImagesClick(-1)}
                              />

                              <div
                                style={{
                                  width: "40px",
                                  textAlign: "center",
                                  color: "#fff",
                                  fontWeight: "500",
                                  padding: "0 4px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {imageIndex + 1 + "/" + images.length}
                              </div>

                              <Button
                                style={{
                                  color: "#fff",
                                  lineHeight: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                type="text"
                                size="small"
                                icon={<RightOutlined />}
                                onClick={() => handleChangeImagesClick(1)}
                              />
                            </div>
                          )}

                          {/* Right Box */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row-reverse",
                              flex: "1",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <Tooltip
                              placement="bottom"
                              title={"Hide images"}
                              arrow={false}
                              getPopupContainer={() =>
                                imageBoxElement.current || document.body
                              }
                            >
                              <Button
                                type="text"
                                size="small"
                                style={{
                                  color: "#fff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                onClick={() => setShowImages(false)}
                                icon={<EyeInvisibleOutlined />}
                              />
                            </Tooltip>

                            <Tooltip
                              placement="bottom"
                              title={"Paste image(Pro⚡)"}
                              arrow={false}
                              getPopupContainer={() =>
                                imageBoxElement.current || document.body
                              }
                            >
                              <Button
                                type="text"
                                size="small"
                                style={{
                                  color: "#fff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  cursor: userInfo?.user.verified ? "pointer" : "not-allowed",
                                  opacity: !userInfo?.user.verified
                                    ? "0.7"
                                    : "1",
                                }}
                                onClick={handlePasteImage}
                                icon={
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.875"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-clipboard-paste"
                                  >
                                    <path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z" />
                                    <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10" />
                                    <path d="m17 10 4 4-4 4" />
                                  </svg>
                                }
                              />
                            </Tooltip>

                            <Tooltip
                              placement="bottom"
                              title={"Search"}
                              arrow={false}
                              getPopupContainer={() =>
                                imageBoxElement.current || document.body
                              }
                            >
                              <Button
                                type="text"
                                size="small"
                                style={{
                                  color: "#fff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                onClick={() => handleEditImagesClick()}
                                icon={<SearchOutlined />}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 图片来源信息 */}
                  {images.length > 0 && (
                    <div
                      className="imageSource"
                      style={{
                        flex: "1",
                        display: "flex",
                        alignItems: "flex-end",
                        fontSize: "0.90em",
                        color: "rgba(255, 255, 255, 0.8)",
                        padding: "8px",
                        marginTop: "4px",
                        lineHeight: "normal",
                        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {images[imageIndex].type === "ai" ||
                      images[imageIndex].type === "youtube" ||
                      images[imageIndex].type === "clipboard" ? (
                        <>Photo by {images[imageIndex].user.name}</>
                      ) : (
                        <>
                          Photo by{" "}
                          <a
                            style={{
                              textDecoration: "underline",
                              padding: "0 2px",
                            }}
                            target="_blank"
                            href={
                              "https://unsplash.com/@" +
                              images[imageIndex].user.username +
                              "?utm_source=Scouter&utm_medium=referral"
                            }
                          >
                            {images[imageIndex].user.name}
                          </a>{" "}
                          on{" "}
                          <a
                            style={{
                              textDecoration: "underline",
                              padding: "0 2px",
                            }}
                            target="_blank"
                            href="https://unsplash.com/?utm_source=Scouter&utm_medium=referral"
                          >
                            Unsplash
                          </a>
                        </>
                      )}

                      {/* By <a style={{ textDecoration: 'underline' }} target='_blank' href={images[imageIndex].user.links.html}>{images[imageIndex].user.name}</a>  on Unsplash */}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: "4px 6px",
              border: "1px dashed rgba(5, 5, 5, 0.1)",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <IconButton
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              type="text"
              size="small"
              // style={{ color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={() => setShowImages(true)}
              icon={<EyeOutlined />}
            />
          </div>
        )}
      </div>
    </>
  );
}
