import { Input, Typography, Space, Spin } from 'antd'
import {
    SearchOutlined,
    CloseCircleOutlined,
    HistoryOutlined,
} from '@ant-design/icons'
import { motion, AnimatePresence } from 'framer-motion'
import { useWordSearch } from '../../hooks/useWordSearch'
import { useVocabWords } from '../../hooks/useVocab'
import { WordVariantList } from './WordVariantList'
import { VocabItem } from '../Vocab/VocabItem'

const { Text, Title } = Typography

const RECENT_COUNT = 5

export function SearchPage() {
    const { query, setQuery, result, isLoading, error, suggestions, clear } =
        useWordSearch()
    const { data: allWords } = useVocabWords()
    const recentWords = allWords?.slice(0, RECENT_COUNT) ?? []

    return (
        <div
            style={{ padding: '0 16px 24px', maxWidth: 480, margin: '0 auto' }}
        >
            {/* Заголовок */}
            <div style={{ paddingTop: 24, paddingBottom: 20 }}>
                <Title
                    level={4}
                    style={{ margin: 0, color: 'rgba(255,255,255,0.9)' }}
                >
                    Поиск слова
                </Title>
                <Text type="secondary" style={{ fontSize: 13 }}>
                    Введите слово из субтитров
                </Text>
            </div>

            {/* Поле ввода */}
            <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="слово или фраза"
                size="large"
                prefix={<SearchOutlined style={{ color: '#3b82f6' }} />}
                suffix={
                    query ? (
                        <CloseCircleOutlined
                            style={{
                                color: 'rgba(255,255,255,0.3)',
                                cursor: 'pointer',
                            }}
                            onClick={clear}
                        />
                    ) : null
                }
                style={{
                    borderRadius: 14,
                    fontSize: 16,
                    height: 52,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                }}
                autoFocus
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
            />

            {/* Контент под инпутом */}
            <div style={{ marginTop: 20 }}>
                <AnimatePresence mode="wait">
                    {isLoading && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ textAlign: 'center', paddingTop: 48 }}
                        >
                            <Space
                                direction="vertical"
                                size={12}
                                align="center"
                            >
                                <Spin size="large" />
                                <Text type="secondary">Ищем...</Text>
                            </Space>
                        </motion.div>
                    )}

                    {!isLoading && error && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={{ textAlign: 'center', paddingTop: 40 }}
                        >
                            <Text type="secondary">{error}</Text>

                            {suggestions.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    style={{ marginTop: 16 }}
                                >
                                    <Text
                                        type="secondary"
                                        style={{
                                            fontSize: 12,
                                            textTransform: 'uppercase',
                                            letterSpacing: 1,
                                            display: 'block',
                                            marginBottom: 10,
                                        }}
                                    >
                                        Имели в виду?
                                    </Text>
                                    <Space
                                        size={8}
                                        wrap
                                        style={{ justifyContent: 'center' }}
                                    >
                                        {suggestions.map((s) => (
                                            <motion.button
                                                key={s}
                                                whileTap={{ scale: 0.94 }}
                                                onClick={() => setQuery(s)}
                                                style={{
                                                    background:
                                                        'rgba(59,130,246,0.15)',
                                                    border: '1px solid rgba(59,130,246,0.4)',
                                                    borderRadius: 20,
                                                    padding: '6px 14px',
                                                    color: '#93c5fd',
                                                    fontSize: 14,
                                                    cursor: 'pointer',
                                                    fontFamily: 'inherit',
                                                    WebkitTapHighlightColor:
                                                        'transparent',
                                                }}
                                            >
                                                {s}
                                            </motion.button>
                                        ))}
                                    </Space>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {!isLoading && result && (
                        <motion.div
                            key={result.word}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {result.isPhrase ? (
                                /* Перевод фразы */
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: 16,
                                        padding: '20px 16px',
                                    }}
                                >
                                    <Text
                                        type="secondary"
                                        style={{
                                            fontSize: 11,
                                            textTransform: 'uppercase',
                                            letterSpacing: 1,
                                            display: 'block',
                                            marginBottom: 10,
                                        }}
                                    >
                                        Перевод фразы
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: 'rgba(255,255,255,0.7)',
                                            display: 'block',
                                            marginBottom: 12,
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        {result.word}
                                    </Text>
                                    <div
                                        style={{
                                            background:
                                                'rgba(59, 130, 246, 0.15)',
                                            borderRadius: 10,
                                            padding: '12px 14px',
                                            borderLeft: '3px solid #3b82f6',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                fontWeight: 600,
                                                color: '#93c5fd',
                                            }}
                                        >
                                            {result.translation}
                                        </Text>
                                    </div>
                                </motion.div>
                            ) : (
                                <>
                                    {/* Заголовок результата */}
                                    <div style={{ marginBottom: 12 }}>
                                        <Text
                                            type="secondary"
                                            style={{
                                                fontSize: 12,
                                                textTransform: 'uppercase',
                                                letterSpacing: 1,
                                            }}
                                        >
                                            Варианты для «{result.word}»
                                        </Text>
                                    </div>

                                    {result.meanings.length > 0 ? (
                                        <WordVariantList result={result} />
                                    ) : (
                                        <div
                                            style={{
                                                background:
                                                    'rgba(59, 130, 246, 0.15)',
                                                borderRadius: 12,
                                                padding: '16px',
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
                                </>
                            )}
                        </motion.div>
                    )}

                    {!isLoading && !result && !error && !query && (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {recentWords.length > 0 ? (
                                <>
                                    <Space
                                        size={6}
                                        align="center"
                                        style={{ marginBottom: 12 }}
                                    >
                                        <HistoryOutlined
                                            style={{
                                                color: 'rgba(255,255,255,0.3)',
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
                                            Недавние слова
                                        </Text>
                                    </Space>
                                    <Space
                                        direction="vertical"
                                        size={8}
                                        style={{ width: '100%' }}
                                    >
                                        {recentWords.map((word) => (
                                            <VocabItem
                                                key={word.id}
                                                word={word}
                                            />
                                        ))}
                                    </Space>
                                </>
                            ) : (
                                <div
                                    style={{
                                        textAlign: 'center',
                                        paddingTop: 64,
                                    }}
                                >
                                    <Text style={{ fontSize: 40 }}>🎬</Text>
                                    <div style={{ marginTop: 12 }}>
                                        <Text
                                            type="secondary"
                                            style={{ fontSize: 14 }}
                                        >
                                            Встретили незнакомое слово?
                                        </Text>
                                        <br />
                                        <Text
                                            type="secondary"
                                            style={{ fontSize: 13 }}
                                        >
                                            Введите его выше — переведём и
                                            сохраним
                                        </Text>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
