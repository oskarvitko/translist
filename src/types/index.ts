export interface Word {
    id: string // `${language}:${word}` e.g. "en:hello"
    word: string
    language: string // ISO 639-1
    translation: string
    phonetic: string
    partOfSpeech: string
    definition: string
    definitionRu: string
    examples: string[]
    viewCount: number
    lastViewed: Date
    createdAt: Date
}

export interface WordMeaning {
    partOfSpeech: string
    definition: string
    definitionRu: string
    examples: string[]
    synonyms: string[]
}

export interface SearchResult {
    word: string
    phonetic: string
    meanings: WordMeaning[]
    translation: string
    isPhrase: boolean
}
