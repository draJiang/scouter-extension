export const getCaption = (): { captions: string[], lang: string } | null => {

    // 字幕的语言
    const windowElement = document.querySelector('.caption-window');
    const langValue = windowElement?.getAttribute('lang') || 'en';

    // 字幕信息
    const captionNodes = document.querySelectorAll('.caption-visual-line');

    if (captionNodes) {

        const captionTextList = Array.from(captionNodes).map(item => item.textContent || '');
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