interface DatamuseWord {
    word: string
    score: number
}

export async function fetchSpellingSuggestions(
    word: string,
): Promise<string[]> {
    const response = await fetch(
        `https://api.datamuse.com/words?sp=${encodeURIComponent(word.trim())}&max=5`,
    )

    if (!response.ok) return []

    const data: DatamuseWord[] = await response.json()
    return data
        .map((item) => item.word)
        .filter((w) => w.toLowerCase() !== word.toLowerCase())
}
