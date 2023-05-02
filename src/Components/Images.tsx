import React, { useEffect, useState } from "react";
import { Button, Image } from 'antd';
import { RightOutlined, LeftOutlined } from "@ant-design/icons";


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
}

export function Images(props: ImagesProps) {

    const [images, setImages] = useState<Array<Image>>([]);
    const [imageIndex, setImageIndex] = useState(0);
    const [showControl, setShowControl] = useState(false)
    // const [currentURL, setCurrentURL] = useState<string>();

    useEffect(() => {

        setImages(props.images)

    }, [props.images]);

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
        } else {
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

            <div>
                {images.length === 0 ? '' : <>
                    <div onMouseEnter={handleImagesBoxHover} onMouseLeave={handleImagesBoxHover}>
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


                        {/* 后台加载所有图片，提升渲染速度 */}
                        <div
                            style={{
                                display: 'none'
                            }}>
                            {images.map(img => <img key={img.id}
                                src={img.urls.small}></img>)}

                        </div>


                        {showControl ?
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '100%',
                                    height:'100%',
                                    left: 0,
                                    display: 'flex',
                                    justifyContent:'space-around',
                                    flexDirection: 'column',
                                    padding: '10px'
                                }}
                            >
                                <div></div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        width: '100%'
                                    }}
                                >
                                    <Button
                                        style={{
                                            background: 'rgba(0, 0, 0, 0.5)',
                                            lineHeight: '100%'
                                        }}
                                        type="primary" size="small" shape="circle" icon={<LeftOutlined />} onClick={() => handleChangeImagesClick(-1)} />

                                    <Button
                                        style={{
                                            background: 'rgba(0, 0, 0, 0.5)',
                                            lineHeight: '100%'
                                        }}
                                        type="primary" size="small" shape="circle" icon={<RightOutlined />} onClick={() => handleChangeImagesClick(1)} />

                                </div>
                                <div
                                    style={{
                                        textAlign:'center',
                                        color:'#fff',
                                        fontWeight:'500'
                                    }}
                                >{imageIndex + 1 + '/' + images.length}</div>
                            </div> : ''}

                    </div>
                    <div
                        style={{
                            fontSize: '0.92em',
                            color: 'rgba(0, 0, 0, 0.4)'
                        }}
                    >
                        Photo by <a style={{ textDecoration: 'underline' }} target='_blank' href={"https://unsplash.com/@" + images[imageIndex].user.username + "?utm_source=Scouter&utm_medium=referral"}>{images[imageIndex].user.name}</a> on <a style={{ textDecoration: 'underline' }} target='_blank' href="https://unsplash.com/?utm_source=Scouter&utm_medium=referral">Unsplash</a>

                        {/* By <a style={{ textDecoration: 'underline' }} target='_blank' href={images[imageIndex].user.links.html}>{images[imageIndex].user.name}</a>  on Unsplash */}
                    </div>
                </>
                }
            </div>



        </div>
    )

}
