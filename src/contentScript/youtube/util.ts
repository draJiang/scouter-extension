
export const getCaption = (): { captions: string[], lang: string } | null => {

    // 字幕的语言
    const langValue =  'en';

    // 字幕信息
    const captionNodes = document.querySelectorAll('.caption-visual-line');
    const captionsArray = Array.from(captionNodes); // 转换 NodeList 为真正的数组
    const lastFourCaptions = captionsArray.slice(-4); // 获取数组中最后四个元素

    if (lastFourCaptions) {

        const captionTextList = Array.from(lastFourCaptions).map(item => item.textContent || '');
        return {
            captions: captionTextList,
            lang: langValue
        };

    }

    return null


}

export const captureVideoScreenshot = (): string | null => {

    // 获取页面上的第一个视频元素
    const video = document.querySelector('video');
    if (!video) {
        console.log("No video found on the page.");
        return null;
    }

    // 创建canvas元素
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 将视频的当前帧画到canvas上
    const ctx = canvas.getContext('2d');
    ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 将canvas转换为图片（DataURL）
    const imageDataUrl = canvas.toDataURL('image/png');
    return imageDataUrl

}