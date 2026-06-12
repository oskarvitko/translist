import { useState } from 'react'
import {
    SearchOutlined,
    BookOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { SearchPage } from '../Search/SearchPage'
import { VocabPage } from '../Vocab/VocabPage'

type Tab = 'search' | 'vocab'

interface AppLayoutProps {
    onOpenGuide: () => void
}

export function AppLayout({ onOpenGuide }: AppLayoutProps) {
    const [activeTab, setActiveTab] = useState<Tab>('search')

    return (
        <div
            style={{
                minHeight: '100dvh',
                background: '#141414',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: 600,
            }}
        >
            {/* Кнопка гайда — fixed сверху справа */}
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onOpenGuide}
                style={{
                    position: 'fixed',
                    top: 16,
                    right: 16,
                    zIndex: 200,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.3)',
                    WebkitTapHighlightColor: 'transparent',
                }}
            >
                <QuestionCircleOutlined style={{ fontSize: 17 }} />
            </motion.button>

            {/* Контент */}
            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 72 }}>
                {activeTab === 'search' ? <SearchPage /> : <VocabPage />}
            </div>

            {/* Bottom navigation */}
            <div
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 64,
                    background: 'rgba(20, 20, 20, 0.92)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    zIndex: 100,
                    maxWidth: 600,
                    margin: '0 auto',
                }}
            >
                {(['search', 'vocab'] as Tab[]).map((tab) => {
                    const isActive = activeTab === tab
                    const Icon =
                        tab === 'search' ? SearchOutlined : BookOutlined
                    const label = tab === 'search' ? 'Поиск' : 'Мои слова'

                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 4,
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: isActive
                                    ? '#3b82f6'
                                    : 'rgba(255,255,255,0.3)',
                                transition: 'color 0.2s',
                                WebkitTapHighlightColor: 'transparent',
                                padding: '8px 0',
                            }}
                        >
                            <motion.div
                                animate={{ scale: isActive ? 1.1 : 1 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 20,
                                }}
                            >
                                <Icon style={{ fontSize: 22 }} />
                            </motion.div>
                            <span
                                style={{
                                    fontSize: 11,
                                    fontWeight: isActive ? 600 : 400,
                                    letterSpacing: 0.3,
                                }}
                            >
                                {label}
                            </span>

                            {isActive && (
                                <motion.div
                                    layoutId="tabIndicator"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        width: 32,
                                        height: 2,
                                        background: '#3b82f6',
                                        borderRadius: '0 0 2px 2px',
                                    }}
                                />
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
