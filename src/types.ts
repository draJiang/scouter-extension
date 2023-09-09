export type PromptType = {
    title: string;
    getUnsplashImages: boolean;
    userPrompt: string;
    id: string;
};

export type ChatMessage = {
    chatId: string,
    role: string,
    content: string,
    // loading: boolean,
    prompt: string,
    status: string,
    showImagesBox: boolean,
    images: Array<ImageType>
};

// export type ImageType = {
//     id: string;
//     created_at: string;
//     updated_at: string;
//     promoted_at: string | null;
//     width: number;
//     height: number;
//     color: string;
//     blur_hash: string;
//     description: string;
//     alt_description: string;
//     urls: {
//         raw: string;
//         full: string;
//         regular: string;
//         small: string;
//         thumb: string;
//         small_s3: string;
//     };
//     links: {
//         self: string;
//         html: string;
//         download: string;
//         download_location: string;
//     };
//     likes: number;
//     liked_by_user: boolean;
//     current_user_collections: any[];
//     sponsorship: null;
//     topic_submissions: any;
//     user: {
//         id: string;
//         updated_at: string;
//         username: string;
//         name: string;
//         first_name: string;
//         last_name: string;
//         twitter_username: string;
//         portfolio_url: string;
//         bio: string;
//         location: string;
//         links: {
//             self: string;
//             html: string;
//             photos: string;
//             likes: string;
//             portfolio: string;
//             following: string;
//             followers: string;
//         };
//         profile_image: {
//             small: string;
//             medium: string;
//             large: string;
//         };
//         instagram_username: string;
//         total_collections: number;
//         total_likes: number;
//         total_photos: number;
//         accepted_tos: boolean;
//         for_hire: boolean;
//     };
// }

export type ImageType = {
    type: string,
    id: string,
    urls: {
        small: string
    },
    links: {
        download_location: string
    },
    description: string,
    user: {
        username: string,
        name: string
    }
}

export type userInfoType = {
    userId: string,
    verified: boolean
};

export type langType = {
    name: string;
    id: string;
    Prompt1: { explanation: string; };
    Prompt2: { translate: string; explanation: string; };
    Prompt3: { validation: string; };
    audioURL: string;
}

export type aiParameterType = {
    result: string,
    apiKeySelection: string,
    data: null | {
        chatCompletions: {
            url: string,
            headers: HeadersInit,
            body: {
                model: string,
                messages: any,
                temperature: Number,
                max_tokens: Number,
                top_p: Number,
                frequency_penalty: Number,
                presence_penalty: Number,
                stream: boolean
            }
        },
        imagesGenerations: {
            url: string,
            headers: HeadersInit,
        }
    }
}