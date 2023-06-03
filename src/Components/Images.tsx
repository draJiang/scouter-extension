import React, { useEffect, useState, useRef } from "react";
import { Button, Image, Input, Empty } from 'antd';
import { LoadingOutlined, RightOutlined, LeftOutlined, CloseOutlined, CheckOutlined, FormOutlined, SearchOutlined } from "@ant-design/icons";

import { InputRef } from 'antd/lib/input';


interface Image {
    id: string;
    created_at: string;
    updated_at: string;
    promoted_at: string | null;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string;
    alt_description: string;
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
        small_s3: string;
    };
    links: {
        self: string;
        html: string;
        download: string;
        download_location: string;
    };
    likes: number;
    liked_by_user: boolean;
    current_user_collections: any[];
    sponsorship: null;
    topic_submissions: any;
    user: {
        id: string;
        updated_at: string;
        username: string;
        name: string;
        first_name: string;
        last_name: string;
        twitter_username: string;
        portfolio_url: string;
        bio: string;
        location: string;
        links: {
            self: string;
            html: string;
            photos: string;
            likes: string;
            portfolio: string;
            following: string;
            followers: string;
        };
        profile_image: {
            small: string;
            medium: string;
            large: string;
        };
        instagram_username: string;
        total_collections: number;
        total_likes: number;
        total_photos: number;
        accepted_tos: boolean;
        for_hire: boolean;
    };
}

interface ImagesProps {
    images: Image[];
    keyWord: string;
    getUnsplashImages: (keyword: string) => void;
}

export function Images(props: ImagesProps) {

    const [images, setImages] = useState<Array<Image>>([]);
    const [imageIndex, setImageIndex] = useState(0);
    const [showControl, setShowControl] = useState(false)
    const [changeImage, setChangeImageStatus] = useState(false)
    // const [searchImageIsLoading, setSearchImageIsLoading] = useState(false)

    // const [currentURL, setCurrentURL] = useState<string>();

    const inputElement = useRef<InputRef>(null);

    useEffect(() => {

        setImages(props.images)
        setImageIndex(0)

    }, [props.images]);

    useEffect(() => {

        console.log(inputElement);
        console.log(inputElement.current);
        console.log(inputElement.current?.input);
        inputElement.current?.focus()

    }, [changeImage]);


    const handleEditImagesClick = () => {

        setChangeImageStatus(true)

    }

    const handleSearchInput = (event: any) => {
        console.log('handleSearchInput');
        event.stopPropagation()
    }

    const handleSearchBtnClick = (event: any) => {

        event.stopPropagation()

        let inputValue = inputElement.current?.input?.value

        if (inputValue && inputValue !== '') {
            props.getUnsplashImages(inputValue)
            setChangeImageStatus(false)
        }


    }

    const handleChangeImagesClick = (offset: number) => {

        setImageIndex(index => {
            index = index + offset
            if (index >= images.length) {
                index = 0
            }
            if (index < 0) {
                index = images.length - 1
            }


            return index

        })

        // 预加载下一张图

    };

    const handleImagesBoxHover = (e: any) => {


        if (e.type === 'mouseenter') {

            setShowControl(true)

        }


        if (e.type === 'mouseleave') {

            setShowControl(false)

        }

    }

    return (
        <div className="images p-4"
            style={{
                position: 'relative',
                paddingBottom: 0
            }}
        >
            {props.keyWord.length <= 20 &&
                <div>

                    <div onMouseEnter={handleImagesBoxHover} onMouseLeave={handleImagesBoxHover}>

                        {/* 图片 */}
                        {images.length > 0 ?
                            <>
                                <div className="imageBox">
                                    <Image
                                        data-downloadlocation={images[imageIndex].links.download_location}
                                        src={images[imageIndex].urls.small}
                                        alt={images[imageIndex]['description']}
                                        height={240}
                                        width={'100%'}
                                        preview={false}
                                        placeholder />
                                </div>


                                <div
                                    style={{
                                        display: 'none'
                                    }}>
                                    {images.map(img => <img key={img.id}
                                        src={img.urls.small}></img>)}

                                </div>
                            </>

                            :

                            <div
                                style={{
                                    height: '240px',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    border: '1px solid rgba(5, 5, 5, .06)',
                                    borderRadius: '2px'
                                }}
                            >
                                <Empty style={{ margin: '0 auto' }} description='No related pictures found' image={Empty.PRESENTED_IMAGE_SIMPLE} />

                            </div>

                        }

                        {/* 图片控制控件 */}
                        {showControl &&
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '100%',
                                    height: '100%',
                                    left: 0,
                                    display: 'flex',
                                    // justifyContent: 'space-around',
                                    flexDirection: 'column',
                                }}
                            >
                                <div
                                    style={{
                                        padding: '6px 12px',
                                        margin: '4px 14px',
                                        background: 'linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 27.6%, rgba(0, 0, 0, 0.2) 54.69%, rgba(0, 0, 0, 0.35) 100%)'
                                    }}
                                >


                                    {changeImage ?
                                        // 显示图片搜索控件
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '2px 0'
                                            }}
                                        >
                                            <div style={{ flex: '1', marginRight: '20px' }}>
                                                <Input prefix={<SearchOutlined />} placeholder="Search images" onKeyDown={handleSearchInput} size="small" style={{ width: '100%' }} ref={inputElement} onPressEnter={handleSearchBtnClick} />
                                            </div>

                                            <div style={{
                                                display: 'flex',
                                            }}>

                                                <Button type="text" size="small" style={{ color: '#fff', marginBottom: '4px', marginRight: '10px' }} onClick={handleSearchBtnClick} icon={<CheckOutlined />} />
                                                <Button type="text" size="small" style={{ color: '#fff', marginBottom: '4px' }} onClick={() => setChangeImageStatus(false)} icon={<CloseOutlined />} />

                                            </div>


                                        </div>

                                        :

                                        // 显示图片导航控件
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexGrow: 'inherit',
                                            }}
                                        >

                                            {/* Left Box */}

                                            {images.length > 0 &&

                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >

                                                    <Button
                                                        style={{
                                                            color: '#fff',
                                                            lineHeight: '100%'
                                                        }}
                                                        type="text" size="small" icon={<LeftOutlined />} onClick={() => handleChangeImagesClick(-1)} />

                                                    <div
                                                        style={{
                                                            width: '40px',
                                                            textAlign: 'center',
                                                            color: '#fff',
                                                            fontWeight: '500',
                                                            padding: '0 4px',
                                                            marginTop: '4px'
                                                        }}
                                                    >{imageIndex + 1 + '/' + images.length}
                                                    </div>

                                                    <Button
                                                        style={{
                                                            color: '#fff',
                                                            lineHeight: '100%'
                                                        }}
                                                        type="text" size="small" icon={<RightOutlined />} onClick={() => handleChangeImagesClick(1)} />

                                                </div>

                                            }

                                            {/* Right Box */}
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row-reverse',
                                                    flex: '1',
                                                    alignItems: 'end'
                                                }}

                                            >

                                                <Button type="text" size="small" style={{ color: '#fff' }} onClick={() => handleEditImagesClick()} icon={<FormOutlined />} />



                                            </div>

                                        </div>
                                    }
                                </div>


                            </div>
                        }

                    </div>

                    {images.length > 0 &&

                        <div
                            style={{
                                fontSize: '0.92em',
                                color: 'rgba(0, 0, 0, 0.4)',
                                marginTop: '4px'
                            }}
                        >
                            Photo by <a style={{ textDecoration: 'underline' }} target='_blank' href={"https://unsplash.com/@" + images[imageIndex].user.username + "?utm_source=Scouter&utm_medium=referral"}>{images[imageIndex].user.name}</a> on <a style={{ textDecoration: 'underline' }} target='_blank' href="https://unsplash.com/?utm_source=Scouter&utm_medium=referral">Unsplash</a>

                            {/* By <a style={{ textDecoration: 'underline' }} target='_blank' href={images[imageIndex].user.links.html}>{images[imageIndex].user.name}</a>  on Unsplash */}
                        </div>
                    }


                </div>

            }

        </div>
    )

}
