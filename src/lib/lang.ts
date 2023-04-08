import browser from 'webextension-polyfill'

// 多语言信息
export const lang = {
    'Arabic': {
        'name': 'Arabic',
        'Prompt1': {
            'explanation': 'استخدام اللغة العربية لتفسير معنى الكلمات ودورها النحوي في الجملة'
        },
        'Prompt2': {
            'translate': 'ترجمة الجمل إلى العربية',
            'explanation': 'شرح المعرفة النحوية'
        },
        'Prompt3': {
            'validation': 'بوصفك خبيرًا في اللغة، يرجى التحقق من الجمل التي قدمتها. إذا كانت الجملة غير صحيحة، فأشر على الخطأ باللغة العربية وقدم الجملة المصححة. الجملة:'
        }
    },
    'Chinese Simplified': {
        'name': 'Chinese Simplified',
        'Prompt1': {
            'explanation': '使用中文解释单词在句子中的含义和语法作用'
        },
        'Prompt2': {
            'translate': '将句子翻译为中文',
            'explanation': '解释语法知识'
        },
        'Prompt3': {
            'validation': '作为一个语言专家，请检查我提供的句子。如果句子不正确，那么用中文指出错误，并提供修改后的句子。句子：'
        }
    },
    'Chinese Traditional': {
        'name': 'Chinese Traditional',
        'Prompt1': {
            'explanation': '使用繁體中文解釋單詞在句子中的含義和語法作用'
        },
        'Prompt2': {
            'translate': '將句子翻譯為繁體中文',
            'explanation': '解釋語法知識'
        },
        'Prompt3': {
            'validation': '作為一個語言專家，請檢查我提供的句子。如果句子不正確，那麼用繁體中文指出錯誤，並提供修改後的句子。句子：'
        }
    },
    'Dutch': {
        'name': 'Dutch',
        'Prompt1': {
            'explanation': 'Gebruik het Nederlands om de betekenis van woorden en hun grammaticale rol in de zin uit te leggen'
        },
        'Prompt2': {
            'translate': 'Vertaal de zin naar het Nederlands',
            'explanation': 'Leg de grammaticale kennis uit'
        },
        'Prompt3': {
            'validation': 'Als taalexpert, controleer de zin die ik heb gegeven. Als de zin onjuist is, wijs dan de fout aan in het Nederlands en geef de gecorrigeerde zin. Zin:'
        }
    },
    'English': {
        'name': 'English',
        'Prompt1': {
            'explanation': 'Use English to explain the meaning and grammatical role of words in sentences'
        },
        'Prompt2': {
            'translate': 'Translate sentences into English',
            'explanation': 'Explain grammatical knowledge'
        },
        'Prompt3': {
            'validation': 'As a language expert, please check the sentences I provided. If the sentence is incorrect, then point out the error in English and provide the corrected sentence. Sentence:'
        }
    },
    'French': {
        'name': 'French',
        'Prompt1': {
            'explanation': 'Utilisez le français pour expliquer la signification des mots et leur rôle grammatical dans la phrase'
        },
        'Prompt2': {
            'translate': 'Traduisez la phrase en français',
            'explanation': 'Expliquez les connaissances grammaticales'
        },
        'Prompt3': {
            'validation': "En tant qu'expert en langues, veuillez vérifier la phrase que j'ai fournie. Si la phrase est incorrecte, veuillez indiquer l'erreur en français et fournir la phrase corrigée.La phrase: "
        }
    },
    'German': {
        'name': 'German',
        'Prompt1': {
            'explanation': 'Verwenden Sie Deutsch, um die Bedeutung von Wörtern und ihre grammatikalische Rolle im Satz zu erklären'
        },
        'Prompt2': {
            'translate': 'Übersetzen Sie den Satz ins Deutsche',
            'explanation': 'Erklären Sie grammatikalische Kenntnisse'
        },
        'Prompt3': {
            'validation': 'Als Sprachexperte überprüfen Sie bitte den von mir bereitgestellten Satz. Wenn der Satz falsch ist, geben Sie bitte den Fehler auf Deutsch an und geben Sie den korrigierten Satz an. Der Satz:'
        }
    },
    'Hindi': {
        'name': 'Hindi',
        'Prompt1': {
            'explanation': 'शब्दों के अर्थ और वाक्य में उनकी व्याकरणिक भूमिका का विवरण देने के लिए हिंदी का उपयोग करें'
        },
        'Prompt2': {
            'translate': 'वाक्य का हिंदी में अनुवाद करें',
            'explanation': 'व्याकरण ज्ञान का विवरण दें'
        },
        'Prompt3': {
            'validation': 'भाषा विशेषज्ञ के रूप में, कृपया मैंने पेश किए गए वाक्यों की जांच करें। यदि वाक्य गलत है, तो कृपया हिंदी में त्रुटि बताएं और सही किए गए वाक्य प्रदान करें। वाक्य:'
        }
    },
    'Indonesian': {
        'name': 'Indonesian',
        'Prompt1': {
            'explanation': 'Menggunakan bahasa Indonesia untuk menjelaskan makna kata dan peran gramatikalnya dalam kalimat'
        },
        'Prompt2': {
            'translate': 'Menerjemahkan kalimat ke dalam bahasa Indonesia',
            'explanation': 'Menjelaskan pengetahuan tata bahasa'
        },
        'Prompt3': {
            'validation': 'Sebagai ahli bahasa, mohon periksa kalimat yang saya berikan. Jika kalimat tidak benar, tolong tunjukkan kesalahannya dalam bahasa Indonesia dan berikan kalimat yang benar. Kalimat:'
        }
    },
    'Italian': {
        'name': 'Italian',
        'Prompt1': {
            'explanation': 'Usa l\'italiano per spiegare il significato delle parole e il loro ruolo grammaticale nella frase'
        },
        'Prompt2': {
            'translate': 'Tradurre la frase in italiano',
            'explanation': 'Spiegazione della conoscenza grammaticale'
        },
        'Prompt3': {
            'validation': 'In quanto esperto di lingua, controlla la frase che ho fornito. Se la frase non è corretta, indica l\'errore in italiano e fornisci la frase corretta. Frase:'
        }
    },
    'Japanese': {
        'name': 'Japanese',
        'Prompt1': {
            'explanation': '単語の意味と文法上の役割を説明するために日本語を使用する'
        },
        'Prompt2': {
            'translate': '文を日本語に翻訳する',
            'explanation': '文法的な知識の説明'
        },
        'Prompt3': {
            'validation': '言語の専門家として、提供された文章を確認してください。文章が正しくない場合は、日本語でエラーを指摘し、修正後の文章を提供してください。文章：'
        }
    },
    'Korean': {
        'name': 'Korean',
        'Prompt1': {
            'explanation': '단어의 의미와 문장에서의 문법적 역할을 설명하기 위해 한국어를 사용합니다.'
        },
        'Prompt2': {
            'translate': '문장을 한국어로 번역하세요.',
            'explanation': '문법 지식 설명'
        },
        'Prompt3': {
            'validation': '언어 전문가로서 제시한 문장을 확인해 주세요. 만약 문장이 틀렸다면, 한국어로 오류를 지적하고 수정된 문장을 제시해 주세요. 문장: '
        }
    },
    'Portuguese': {
        'name': 'Portuguese',
        'Prompt1': {
            'explanation': 'Usar o português para explicar o significado das palavras e o papel gramatical delas na frase'
        },
        'Prompt2': {
            'translate': 'Traduza a frase para o português',
            'explanation': 'Explicação do conhecimento gramatical'
        },
        'Prompt3': {
            'validation': 'Como especialista em linguagem, verifique a frase que eu forneci. Se a frase estiver incorreta, indique o erro em português e forneça a frase corrigida. Frase: '
        }
    },
    'Russian': {
        'name': 'Russian',
        'Prompt1': {
            'explanation': 'Используйте русский язык, чтобы объяснить значение слов и их грамматическую роль в предложении'
        },
        'Prompt2': {
            'translate': 'Перевести предложение на русский язык',
            'explanation': 'Объяснение грамматических знаний'
        },
        'Prompt3': {
            'validation': 'В качестве эксперта по языку, пожалуйста, проверьте предложение, которое я представил. Если предложение неверное, то пожалуйста, указывайте ошибку на русском языке и предоставляйте исправленное предложение. Предложение:'
        }
    },
    'Spanish': {
        'name': 'Spanish',
        'Prompt1': {
            'explanation': 'Utilice el español para explicar el significado de las palabras y su función gramatical en la oración'
        },
        'Prompt2': {
            'translate': 'Traducir la oración al español',
            'explanation': 'Explicación de conocimientos gramaticales'
        },
        'Prompt3': {
            'validation': 'Como experto en idiomas, por favor, compruebe la oración que he proporcionado. Si la oración es incorrecta, por favor, indique el error en español y proporcione la oración corregida. Oración:'
        }
    },
    'Turkish': {
        'name': 'Turkish',
        'Prompt1': {
            'explanation': 'Kelimelerin anlamını ve cümledeki dilbilgisel rolünü açıklamak için Türkçeyi kullanın'
        },
        'Prompt2': {
            'translate': 'Cümleyi Türkçeye çevirin',
            'explanation': 'Dilbilgisi bilgisi açıklaması'
        },
        'Prompt3': {
            'validation': 'Dil uzmanı olarak, lütfen sunduğum cümleyi kontrol edin. Eğer cümle yanlışsa, lütfen hatayı Türkçe olarak belirtin ve düzeltilmiş cümleyi sağlayın. Cümle:'
        }
    }

}

// 获取语言
export const fetchcurrentLanguage = async () => {
    let r = null
    await browser.storage.sync.get({ 'currentLanguage': 'English', 'targetLanguage': 'Spanish' }).then((result) => {

        console.log('browser.storage.sync.get');

        // r =  { 'current': 'c', 'target': 't' }

        let c = lang['Chinese Simplified']
        let t = lang['English']

        c = switchLang(result.currentLanguage)
        t = switchLang(result.targetLanguage)

        r = { 'current': c, 'target': t }
    })

    return r;


}

const switchLang = (str: string) => {

    switch (str) {
        case 'Arabic':
            return lang['Arabic']
        case 'Chinese Simplified':
            return lang['Chinese Simplified']
        case 'Chinese Traditional':
            return lang['Chinese Traditional']
        case 'Dutch':
            return lang['Dutch']
        case 'English':
            return lang['English']
        case 'French':
            return lang['French']
        case 'German':
            return lang['German']
        case 'Hindi':
            return lang['Hindi']
        case 'Indonesian':
            return lang['Indonesian']
        case 'Italian':
            return lang['Italian']
        case 'Japanese':
            return lang['Japanese']
        case 'Korean':
            return lang['Korean']
        case 'Portuguese':
            return lang['Portuguese']
        case 'Russian':
            return lang['Russian']
        case 'Spanish':
            return lang['Spanish']
        case 'Turkish':
            return lang['Turkish']
        default:
            return lang['Chinese Simplified']
    }

}