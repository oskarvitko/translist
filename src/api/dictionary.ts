import type { WordMeaning } from '../types'
import { fetchTranslation } from './translate'

interface DictionaryApiDefinition {
    definition: string
    example?: string
    synonyms: string[]
}

interface DictionaryApiMeaning {
    partOfSpeech: string
    definitions: DictionaryApiDefinition[]
}

interface DictionaryApiPhonetic {
    text?: string
}

interface DictionaryApiEntry {
    word: string
    phonetics: DictionaryApiPhonetic[]
    meanings: DictionaryApiMeaning[]
}

export async function fetchDictionary(
    word: string,
): Promise<{ phonetic: string; meanings: WordMeaning[] }> {
    const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.trim())}`,
    )

    if (!response.ok) {
        return { phonetic: '', meanings: [] }
    }

    const data: DictionaryApiEntry[] = await response.json()
    const entry = data[0]

    const phonetic = entry.phonetics.find((p) => p.text)?.text ?? ''

    const rawMeanings = entry.meanings.map((m) => ({
        partOfSpeech: m.partOfSpeech,
        definition: m.definitions[0]?.definition ?? '',
        examples: m.definitions
            .map((d) => d.example)
            .filter((e): e is string => Boolean(e))
            .slice(0, 3),
        synonyms: m.definitions.flatMap((d) => d.synonyms).slice(0, 5),
    }))

    const definitionRuList = await Promise.all(
        rawMeanings.map((m) =>
            m.definition ? fetchTranslation(m.definition) : Promise.resolve(''),
        ),
    )

    const meanings: WordMeaning[] = rawMeanings.map((m, i) => ({
        ...m,
        definitionRu: definitionRuList[i],
    }))

    return { phonetic, meanings }
}
