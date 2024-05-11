export type PromptType = {
    title: string;
    getUnsplashImages: boolean;
    userPrompt: string;
    id: string;
};

export type FormPropsType = {
    settings: Record<string, any> | undefined;
    saveOptions: (values: any) => Promise<void>;
};

export type runPromptType = 'yes' | 'no' | 'regenerate' | undefined

export type ChatMessage = {
    role: string,
    content: Array<{
        chatId: string,
        content: string,
        status: 'begin' | 'loading' | 'process' | 'done' | 'invalid_api_key',
    }>,
    // loading: boolean,ty
    prompt: string,
    showImagesBox: boolean,
    images: Array<ImageType>
};

export type BackgroundToPopup = {
    type: string,
    status: string,
    content: string,
    chatId: string
}

export type AnkiModelType = {
    modelName: string,
    field1: string,
    field2: string | null,
    isAnkiSpace: boolean
}

export type AnkiInfoType = {
    defaultDeckName: string,
    decks: Array<string>,
    models: Array<AnkiModelType>
}



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
    verified: boolean,
    contextMenu: boolean,
    showYoutubeButton: boolean
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
            body: BodyType
        },
        imagesGenerations: {
            url: string,
            headers: HeadersInit,
        }
    }
}

export type MessageForGPTType =
    { role: string, content: string }
// |
// { id: string, role: string, content: { content_type: string, parts: any[] }[] }

type BodyType1 = {
    model: string;
    messages: MessageForGPTType[];
    temperature?: number;
    max_tokens?: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    stream?: boolean;
}

type BodyType2 = {
    action: string;
    messages: MessageForGPTWebType
    model: string;
    parent_message_id: string;
    history_and_training_disabled: boolean;
}

export type MessageForGPTWebType = { id: string, role: string, content: { content_type: string, parts: any[] } }[];

export type BodyType = BodyType1 | BodyType2;

export type addToAnkiStatusType = {
    status: 'standby' | 'normal' | 'success' | 'loading',
    noteId: number
}