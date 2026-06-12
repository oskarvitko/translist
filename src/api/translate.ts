interface MyMemoryResponse {
    responseStatus: number
    responseData: {
        translatedText: string
        match: number
    }
}

export async function fetchTranslation(
    word: string,
    from = 'en',
    to = 'ru',
): Promise<string> {
    const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word.trim())}&langpair=${from}|${to}`,
    )

    if (!response.ok) {
        return ''
    }

    const data: MyMemoryResponse = await response.json()

    if (data.responseStatus !== 200) {
        return ''
    }

    return data.responseData.translatedText
}
