import { useEffect } from 'react'
import { Tag, Typography, Divider, Space } from 'antd'
import { SoundOutlined, BookOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import {
    useSaveWordIfNew,
    useIncrementViewCount,
    CURRENT_LANGUAGE,
} from '../../hooks/useVocab'
import { POS_COLORS, posLabel } from '../../constants/pos'
import type { SearchResult, WordMeaning } from '../../types'

const { Title, Text, Paragraph } = Typography

interface WordCardProps {
    result: SearchResult
    meaningIndex?: number
}

export function WordCard({ result, meaningIndex = 0 }: WordCardProps) {
    const saveWordIfNew = useSaveWordIfNew()
    const incrementViewCount = useIncrementViewCount()
    const meaning: WordMeaning | undefined = result.meanings[meaningIndex]
    const wordId = `${CURRENT_LANGUAGE}:${result.word.toLowerCase()}`

    useEffect(() => {
        const now = new Date()

        saveWordIfNew.mutate({
            id: wordId,
            word: result.word.toLowerCase(),
            language: CURRENT_LANGUAGE,
            translation: result.translation,
            phonetic: result.phonetic,
            partOfSpeech: meaning?.partOfSpeech ?? '',
            definition: meaning?.definition ?? '',
            definitionRu: meaning?.definitionRu ?? '',
            examples: meaning?.examples ?? [],
            viewCount: 1,
            lastViewed: now,
            createdAt: now,
        })

        incrementViewCount.mutate(wordId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wordId])

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 16,
                padding: '20px 16px',
                border: '1px solid rgba(255,255,255,0.08)',
            }}
        >
            <Space direction="vertical" size={12} style={{ width: '100%' }}>
                {/* Слово + транскрипция */}
                <div>
                    <Title
                        level={2}
                        style={{ margin: 0, fontSize: 28, lineHeight: 1.2 }}
                    >
                        {result.word}
                    </Title>
                    {result.phonetic && (
                        <Space size={6} style={{ marginTop: 4 }}>
                            <SoundOutlined
                                style={{ color: '#3b82f6', fontSize: 14 }}
                            />
                            <Text type="secondary" style={{ fontSize: 15 }}>
                                {result.phonetic}
                            </Text>
                        </Space>
                    )}
                </div>

                {/* Перевод */}
                {result.translation && (
                    <div
                        style={{
                            background: 'rgba(59, 130, 246, 0.15)',
                            borderRadius: 10,
                            padding: '10px 14px',
                            borderLeft: '3px solid #3b82f6',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 600,
                                color: '#93c5fd',
                            }}
                        >
                            {result.translation}
                        </Text>
                    </div>
                )}

                {/* Часть речи */}
                {meaning && (
                    <>
                        <div>
                            <Tag
                                color={
                                    POS_COLORS[meaning.partOfSpeech] ??
                                    'default'
                                }
                                style={{
                                    borderRadius: 6,
                                    fontSize: 12,
                                    marginBottom: 8,
                                }}
                            >
                                {posLabel(meaning.partOfSpeech)}
                            </Tag>
                            <Paragraph
                                style={{
                                    margin: 0,
                                    color: 'rgba(255,255,255,0.75)',
                                    fontSize: 14,
                                    lineHeight: 1.6,
                                }}
                            >
                                {meaning.definitionRu || meaning.definition}
                            </Paragraph>
                        </div>

                        {/* Примеры */}
                        {meaning.examples.length > 0 && (
                            <>
                                <Divider
                                    style={{
                                        margin: '4px 0',
                                        borderColor: 'rgba(255,255,255,0.08)',
                                    }}
                                />
                                <div>
                                    <Space size={4} style={{ marginBottom: 8 }}>
                                        <BookOutlined
                                            style={{
                                                color: '#3b82f6',
                                                fontSize: 13,
                                            }}
                                        />
                                        <Text
                                            type="secondary"
                                            style={{
                                                fontSize: 12,
                                                textTransform: 'uppercase',
                                                letterSpacing: 1,
                                            }}
                                        >
                                            Примеры
                                        </Text>
                                    </Space>
                                    <Space
                                        direction="vertical"
                                        size={6}
                                        style={{ width: '100%' }}
                                    >
                                        {meaning.examples.map((example, i) => (
                                            <Text
                                                key={i}
                                                style={{
                                                    fontSize: 13,
                                                    color: 'rgba(255,255,255,0.55)',
                                                    fontStyle: 'italic',
                                                    display: 'block',
                                                }}
                                            >
                                                "{example}"
                                            </Text>
                                        ))}
                                    </Space>
                                </div>
                            </>
                        )}
                    </>
                )}
            </Space>
        </motion.div>
    )
}
