import { Component, type ReactNode } from 'react'
import { Typography, Space } from 'antd'
import { motion } from 'framer-motion'
import { ReloadOutlined, BugOutlined } from '@ant-design/icons'

const { Text, Title } = Typography

interface Props {
    children: ReactNode
}

interface State {
    error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = { error: null }

    static getDerivedStateFromError(error: Error): State {
        return { error }
    }

    private handleReload = () => {
        window.location.reload()
    }

    private handleReset = () => {
        this.setState({ error: null })
    }

    render() {
        const { error } = this.state

        if (!error) return this.props.children

        return (
            <div
                style={{
                    minHeight: '100dvh',
                    background: '#141414',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px',
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{
                        width: '100%',
                        maxWidth: 360,
                        textAlign: 'center',
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            delay: 0.1,
                            type: 'spring',
                            stiffness: 200,
                        }}
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: '50%',
                            background: 'rgba(255, 77, 79, 0.12)',
                            border: '1px solid rgba(255, 77, 79, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                        }}
                    >
                        <BugOutlined
                            style={{ fontSize: 32, color: '#ff4d4f' }}
                        />
                    </motion.div>

                    <Space
                        direction="vertical"
                        size={8}
                        style={{ width: '100%' }}
                    >
                        <Title
                            level={4}
                            style={{
                                margin: 0,
                                color: 'rgba(255,255,255,0.9)',
                            }}
                        >
                            Что-то пошло не так
                        </Title>
                        <Text type="secondary" style={{ fontSize: 14 }}>
                            Приложение упало с ошибкой
                        </Text>
                    </Space>

                    {/* Сообщение об ошибке */}
                    <div
                        style={{
                            marginTop: 20,
                            marginBottom: 28,
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: 12,
                            padding: '12px 14px',
                            textAlign: 'left',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                color: 'rgba(255,77,79,0.8)',
                                fontFamily: 'monospace',
                                wordBreak: 'break-word',
                                display: 'block',
                            }}
                        >
                            {error.message}
                        </Text>
                    </div>

                    <Space
                        direction="vertical"
                        size={10}
                        style={{ width: '100%' }}
                    >
                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            onClick={this.handleReset}
                            style={{
                                width: '100%',
                                height: 48,
                                borderRadius: 12,
                                background: 'rgba(59,130,246,0.2)',
                                border: '1px solid rgba(59,130,246,0.5)',
                                color: '#93c5fd',
                                fontSize: 15,
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                WebkitTapHighlightColor: 'transparent',
                            }}
                        >
                            Попробовать снова
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            onClick={this.handleReload}
                            style={{
                                width: '100%',
                                height: 44,
                                borderRadius: 12,
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'rgba(255,255,255,0.4)',
                                fontSize: 14,
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8,
                                WebkitTapHighlightColor: 'transparent',
                            }}
                        >
                            <ReloadOutlined style={{ fontSize: 13 }} />
                            Перезагрузить приложение
                        </motion.button>
                    </Space>
                </motion.div>
            </div>
        )
    }
}
