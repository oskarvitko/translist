import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { wordService } from '../services/wordService'
import type { Word } from '../types'

const CURRENT_LANGUAGE = 'en'

export function useVocabWords() {
    return useQuery({
        queryKey: ['words', CURRENT_LANGUAGE],
        queryFn: () => wordService.getWords(CURRENT_LANGUAGE),
    })
}

export function useSaveWordIfNew() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (word: Word) => wordService.saveWordIfNew(word),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['words'] })
        },
    })
}

export function useIncrementViewCount() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => wordService.incrementViewCount(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['words'] })
        },
    })
}

export function useDeleteWord() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => wordService.deleteWord(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['words'] })
        },
    })
}

export function useGetWord(id: string) {
    return useQuery({
        queryKey: ['word', id],
        queryFn: () => wordService.getWord(id),
        enabled: Boolean(id),
    })
}

export { CURRENT_LANGUAGE }
