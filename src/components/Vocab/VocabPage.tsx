import { Space, Typography, Skeleton } from 'antd'
import { motion } from 'framer-motion'
import { useVocabWords } from '../../hooks/useVocab'
import { VocabItem } from './VocabItem'
import type { Word } from '../../types'

const { Text, Title } = Typography

function formatDateLabel(date: Date): string {
    const now = new Date()
    const d = new Date(date)
    const diffDays = Math.floor(
        (now.setHours(0, 0, 0, 0) - d.setHours(0, 0, 0, 0)) / 86400000,
    )
    if (diffDays === 0) return 'Сегодня'
    if (diffDays === 1) return 'Вчера'
    return new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
    })
}

function groupByDate(words: Word[]): { label: string; words: Word[] }[] {
    const groups = new Map<string, Word[]>()

    for (const word of words) {
        const label = formatDateLabel(word.lastViewed)
        if (!groups.has(label)) groups.set(label, [])
        groups.get(label)!.push(word)
    }

    return Array.from(groups.entries()).map(([label, words]) => ({
        label,
        words,
    }))
}

export function VocabPage() {
    const { data: words, isLoading } = useVocabWords()
    const groups = words && words.length > 0 ? groupByDate(words) : []

    return (
        <div
            style={{ padding: '0 16px 24px', maxWidth: 480, margin: '0 auto' }}
        >
            {/* Заголовок */}
            <div style={{ paddingTop: 24, paddingBottom: 20 }}>
                <div
                    style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}
                >
                    <Title
                        level={4}
                        style={{ margin: 0, color: 'rgba(255,255,255,0.9)' }}
                    >
                        Мои слова
                    </Title>
                    {words && words.length > 0 && (
                        <Text type="secondary" style={{ fontSize: 13 }}>
                            {words.length}
                        </Text>
                    )}
                </div>
            </div>

            {isLoading && (
                <Space direction="vertical" size={8} style={{ width: '100%' }}>
                    {[1, 2, 3].map((i) => (
                        <Skeleton.Input
                            key={i}
                            active
                            size="large"
                            style={{
                                width: '100%',
                                borderRadius: 14,
                                height: 72,
                            }}
                        />
                    ))}
                </Space>
            )}

            {!isLoading && (!words || words.length === 0) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ textAlign: 'center', paddingTop: 64 }}
                >
                    <Text style={{ fontSize: 40 }}>📚</Text>
                    <div style={{ marginTop: 12 }}>
                        <Text type="secondary" style={{ fontSize: 14 }}>
                            Пока пусто
                        </Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 13 }}>
                            Ищите слова на вкладке «Поиск»
                        </Text>
                    </div>
                </motion.div>
            )}

            {!isLoading && words && words.length > 0 && (
                <Space direction="vertical" size={20} style={{ width: '100%' }}>
                    {groups.map(({ label, words: groupWords }) => (
                        <div key={label}>
                            <Text
                                type="secondary"
                                style={{
                                    fontSize: 11,
                                    textTransform: 'uppercase',
                                    letterSpacing: 1,
                                    display: 'block',
                                    marginBottom: 8,
                                    paddingLeft: 2,
                                }}
                            >
                                {label}
                            </Text>
                            <Space
                                direction="vertical"
                                size={8}
                                style={{ width: '100%' }}
                            >
                                {groupWords.map((word) => (
                                    <VocabItem key={word.id} word={word} />
                                ))}
                            </Space>
                        </div>
                    ))}
                </Space>
            )}
        </div>
    )
}
