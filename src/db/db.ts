import Dexie, { type Table } from 'dexie'
import type { Word } from '../types'

class TransListDB extends Dexie {
    words!: Table<Word>

    constructor() {
        super('translist')

        this.version(1).stores({
            words: '&id, word, language, viewCount, lastViewed',
        })
    }
}

export const db = new TransListDB()
