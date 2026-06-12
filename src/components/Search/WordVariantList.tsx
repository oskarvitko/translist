import { useState } from 'react'
import { Space, Typography, Tag } from 'antd'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { WordCard } from './WordCard'
import { POS_COLORS_HEX, posLabel } from '../../constants/pos'
import type { SearchResult } from '../../types'

const { Text } = Typography

interface WordVariantListProps {
    result: SearchResult
}

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.07 },
    },
}

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -16 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.25, ease: 'easeOut' as const },
    },
}

export function WordVariantList({ result }: WordVariantListProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    return (
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Space direction="vertical" size={6} style={{ width: '100%' }}>
                    {result.meanings.map((meaning, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <div
                                onClick={() =>
                                    setSelectedIndex(
                                        selectedIndex === index ? null : index,
                                    )
                                }
                                style={{
                                    background:
                                        selectedIndex === index
                                            ? 'rgba(59, 130, 246, 0.12)'
                                            : 'rgba(255,255,255,0.04)',
                                    border: `1px solid ${
                                        selectedIndex === index
                                            ? 'rgba(59,130,246,0.5)'
                                            : 'rgba(255,255,255,0.08)'
                                    }`,
                                    borderRadius: 12,
                                    padding: '12px 14px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <Space
                                    direction="vertical"
                                    size={4}
                                    style={{ width: '100%' }}
                                >
                                    {result.translation && (
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 600,
                                                color: '#93c5fd',
                                                display: 'block',
                                            }}
                                        >
                                            {result.translation}
                                        </Text>
                                    )}
                                    <Space size={8} align="center">
                                        <Tag
                                            style={{
                                                borderRadius: 6,
                                                fontSize: 11,
                                                color:
                                                    POS_COLORS_HEX[
                                                        meaning.partOfSpeech
                                                    ] ?? '#888',
                                                background: 'transparent',
                                                border: `1px solid ${POS_COLORS_HEX[meaning.partOfSpeech] ?? '#555'}`,
                                                margin: 0,
                                                flexShrink: 0,
                                            }}
                                        >
                                            {posLabel(meaning.partOfSpeech)}
                                        </Tag>
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: 'rgba(255,255,255,0.5)',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                maxWidth: '200px',
                                                display: 'block',
                                            }}
                                        >
                                            {meaning.definitionRu ||
                                                meaning.definition}
                                        </Text>
                                    </Space>
                                </Space>
                            </div>

                            <AnimatePresence>
                                {selectedIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{
                                            duration: 0.25,
                                            ease: 'easeInOut',
                                        }}
                                        style={{
                                            overflow: 'hidden',
                                            marginTop: 8,
                                        }}
                                    >
                                        <WordCard
                                            result={result}
                                            meaningIndex={index}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </Space>
            </motion.div>
        </Space>
    )
}
