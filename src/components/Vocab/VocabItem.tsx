import { useState } from 'react'
import { Space, Typography, Tag, Popconfirm, Divider } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import {
    DeleteOutlined,
    SoundOutlined,
    BookOutlined,
    DownOutlined,
} from '@ant-design/icons'
import { useDeleteWord } from '../../hooks/useVocab'
import { POS_COLORS, posLabel } from '../../constants/pos'
import type { Word } from '../../types'

const { Text } = Typography

interface VocabItemProps {
    word: Word
}

export function VocabItem({ word }: VocabItemProps) {
    const [expanded, setExpanded] = useState(false)
    const deleteWord = useDeleteWord()

    const handleDelete = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        deleteWord.mutate(word.id)
    }

    return (
        <motion.div
            layout
            onClick={() => setExpanded((v) => !v)}
            style={{
                background: expanded
                    ? 'rgba(59, 130, 246, 0.08)'
                    : 'rgba(255,255,255,0.04)',
                border: `1px solid ${expanded ? 'rgba(59,130,246,0.35)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 14,
                padding: '14px 16px',
                cursor: 'pointer',
                overflow: 'hidden',
                userSelect: 'none',
            }}
            transition={{ layout: { duration: 0.3, ease: 'easeInOut' } }}
            whileTap={{ scale: 0.985 }}
        >
            {/* Верхняя строка — всегда видна */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Space
                    direction="vertical"
                    size={2}
                    style={{ flex: 1, minWidth: 0 }}
                >
                    <Space size={8} align="center">
                        <Text
                            strong
                            style={{
                                fontSize: 16,
                                color: 'rgba(255,255,255,0.9)',
                            }}
                        >
                            {word.word}
                        </Text>
                        {word.phonetic && (
                            <Space size={4}>
                                <SoundOutlined
                                    style={{ color: '#3b82f6', fontSize: 12 }}
                                />
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    {word.phonetic}
                                </Text>
                            </Space>
                        )}
                    </Space>

                    <AnimatePresence mode="wait">
                        {!expanded ? (
                            <motion.div
                                key="compact"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: '#93c5fd',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        display: 'block',
                                        maxWidth: '220px',
                                    }}
                                >
                                    {word.translation}
                                </Text>
                                {word.partOfSpeech && (
                                    <Tag
                                        style={{
                                            borderRadius: 5,
                                            fontSize: 11,
                                            marginTop: 4,
                                            background: 'transparent',
                                            border: '1px solid rgba(255,255,255,0.15)',
                                            color: 'rgba(255,255,255,0.45)',
                                        }}
                                    >
                                        {posLabel(word.partOfSpeech)}
                                    </Tag>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="translation-expanded"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                <Text
                                    style={{ fontSize: 14, color: '#93c5fd' }}
                                >
                                    {word.translation}
                                </Text>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Space>

                <Space
                    size={12}
                    align="center"
                    style={{ flexShrink: 0, marginLeft: 8 }}
                >
                    <Popconfirm
                        title="Удалить слово?"
                        okText="Удалить"
                        cancelText="Отмена"
                        okButtonProps={{ danger: true }}
                        onConfirm={handleDelete}
                        onPopupClick={(e) => e.stopPropagation()}
                    >
                        <DeleteOutlined
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                color: 'rgba(255,255,255,0.2)',
                                fontSize: 15,
                            }}
                        />
                    </Popconfirm>

                    <motion.div
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <DownOutlined
                            style={{
                                color: 'rgba(255,255,255,0.25)',
                                fontSize: 14,
                            }}
                        />
                    </motion.div>
                </Space>
            </div>

            {/* Раскрывающийся контент */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Divider
                            style={{
                                margin: '12px 0',
                                borderColor: 'rgba(255,255,255,0.08)',
                            }}
                        />

                        <Space
                            direction="vertical"
                            size={10}
                            style={{ width: '100%' }}
                        >
                            {word.partOfSpeech && (
                                <Tag
                                    color={
                                        POS_COLORS[word.partOfSpeech] ??
                                        'default'
                                    }
                                    style={{ borderRadius: 6, fontSize: 12 }}
                                >
                                    {posLabel(word.partOfSpeech)}
                                </Tag>
                            )}

                            {(word.definitionRu || word.definition) && (
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: 'rgba(255,255,255,0.7)',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {word.definitionRu || word.definition}
                                </Text>
                            )}

                            {word.examples.length > 0 && (
                                <>
                                    <Space size={4}>
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
                                        {word.examples.map((ex, i) => (
                                            <Text
                                                key={i}
                                                style={{
                                                    fontSize: 13,
                                                    color: 'rgba(255,255,255,0.5)',
                                                    fontStyle: 'italic',
                                                    display: 'block',
                                                }}
                                            >
                                                "{ex}"
                                            </Text>
                                        ))}
                                    </Space>
                                </>
                            )}
                        </Space>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
