import { useState, useEffect, useRef } from 'react'
import { fetchDictionary } from '../api/dictionary'
import { fetchTranslation } from '../api/translate'
import { fetchSpellingSuggestions } from '../api/suggestions'
import type { SearchResult } from '../types'

interface UseWordSearchResult {
    query: string
    setQuery: (value: string) => void
    result: SearchResult | null
    isLoading: boolean
    error: string | null
    suggestions: string[]
    clear: () => void
}

export function useWordSearch(): UseWordSearchResult {
    const [query, setQuery] = useState('')
    const [result, setResult] = useState<SearchResult | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [suggestions, setSuggestions] = useState<string[]>([])
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const trimmed = query.trim()

        if (!trimmed) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setResult(null)
            setError(null)
            return
        }

        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }

        debounceRef.current = setTimeout(async () => {
            setIsLoading(true)
            setError(null)

            try {
                const isPhrase = trimmed.includes(' ')

                if (isPhrase) {
                    const translation = await fetchTranslation(trimmed)
                    setSuggestions([])
                    if (!translation) {
                        setError('Не удалось перевести')
                        setResult(null)
                    } else {
                        setResult({
                            word: trimmed,
                            phonetic: '',
                            meanings: [],
                            translation,
                            isPhrase: true,
                        })
                    }
                } else {
                    const [dictData, translation, spellSuggestions] =
                        await Promise.all([
                            fetchDictionary(trimmed),
                            fetchTranslation(trimmed),
                            fetchSpellingSuggestions(trimmed),
                        ])

                    if (dictData.meanings.length === 0) {
                        setSuggestions(spellSuggestions)
                        setError('Слово не найдено')
                        setResult(null)
                    } else {
                        setSuggestions([])
                        setResult({
                            word: trimmed,
                            phonetic: dictData.phonetic,
                            meanings: dictData.meanings,
                            translation,
                            isPhrase: false,
                        })
                    }
                }
            } catch {
                setError('Ошибка при поиске. Проверьте соединение.')
                setResult(null)
            } finally {
                setIsLoading(false)
            }
        }, 400)

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current)
            }
        }
    }, [query])

    const clear = () => {
        setQuery('')
        setResult(null)
        setError(null)
        setSuggestions([])
    }

    return { query, setQuery, result, isLoading, error, suggestions, clear }
}
