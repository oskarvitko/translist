import { db } from '../db/db'
import type { Word } from '../types'

export const wordService = {
    async getWords(language: string): Promise<Word[]> {
        const words = await db.words
            .where('language')
            .equals(language)
            .toArray()
        return words.sort(
            (a, b) =>
                new Date(b.lastViewed).getTime() -
                new Date(a.lastViewed).getTime(),
        )
    },

    async saveWordIfNew(word: Word): Promise<void> {
        const existing = await db.words.get(word.id)
        if (!existing) {
            await db.words.add(word)
        }
    },

    async incrementViewCount(id: string): Promise<void> {
        await db.words
            .where('id')
            .equals(id)
            .modify((word) => {
                word.viewCount += 1
                word.lastViewed = new Date()
            })
    },

    async deleteWord(id: string): Promise<void> {
        await db.words.delete(id)
    },

    async getWord(id: string): Promise<Word | undefined> {
        return db.words.get(id)
    },
}
