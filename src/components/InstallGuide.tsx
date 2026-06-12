import { useState } from 'react'
import { Typography, Space, Drawer } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ShareAltOutlined,
    PlusSquareOutlined,
    AndroidOutlined,
    AppleOutlined,
    CheckCircleOutlined,
    CloseOutlined,
} from '@ant-design/icons'

const { Text, Title } = Typography

const STORAGE_KEY = 'pwa-install-guide-seen'

function detectPlatform(): 'ios' | 'android' | 'other' {
    const ua = navigator.userAgent
    if (/iPad|iPhone|iPod/.test(ua)) return 'ios'
    if (/Android/.test(ua)) return 'android'
    return 'other'
}

function isInStandaloneMode(): boolean {
    return (
        window.matchMedia('(display-mode: standalone)').matches ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (navigator as any).standalone === true
    )
}

interface Step {
    icon: React.ReactNode
    text: React.ReactNode
}

const IOS_STEPS: Step[] = [
    {
        icon: <ShareAltOutlined style={{ fontSize: 20, color: '#3b82f6' }} />,
        text: (
            <>
                Нажмите кнопку{' '}
                <Text strong style={{ color: 'rgba(255,255,255,0.9)' }}>
                    «Поделиться»
                </Text>{' '}
                в Safari (квадрат со стрелкой вверх)
            </>
        ),
    },
    {
        icon: <PlusSquareOutlined style={{ fontSize: 20, color: '#3b82f6' }} />,
        text: (
            <>
                Выберите{' '}
                <Text strong style={{ color: 'rgba(255,255,255,0.9)' }}>
                    «На экран «Домой»»
                </Text>{' '}
                в списке действий
            </>
        ),
    },
    {
        icon: (
            <CheckCircleOutlined style={{ fontSize: 20, color: '#52c41a' }} />
        ),
        text: (
            <>
                Нажмите{' '}
                <Text strong style={{ color: 'rgba(255,255,255,0.9)' }}>
                    «Добавить»
                </Text>{' '}
                — приложение появится на главном экране
            </>
        ),
    },
]

const ANDROID_STEPS: Step[] = [
    {
        icon: <AndroidOutlined style={{ fontSize: 20, color: '#3b82f6' }} />,
        text: (
            <>
                Откройте сайт в{' '}
                <Text strong style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Chrome
                </Text>
            </>
        ),
    },
    {
        icon: <PlusSquareOutlined style={{ fontSize: 20, color: '#3b82f6' }} />,
        text: (
            <>
                Нажмите{' '}
                <Text strong style={{ color: 'rgba(255,255,255,0.9)' }}>
                    ⋮ → «Добавить на главный экран»
                </Text>
            </>
        ),
    },
    {
        icon: (
            <CheckCircleOutlined style={{ fontSize: 20, color: '#52c41a' }} />
        ),
        text: (
            <>
                Нажмите{' '}
                <Text strong style={{ color: 'rgba(255,255,255,0.9)' }}>
                    «Установить»
                </Text>{' '}
                — приложение появится как обычное
            </>
        ),
    },
]

const OTHER_STEPS: Step[] = [
    {
        icon: <AppleOutlined style={{ fontSize: 20, color: '#3b82f6' }} />,
        text: (
            <>
                На{' '}
                <Text strong style={{ color: 'rgba(255,255,255,0.9)' }}>
                    iOS (Safari):
                </Text>{' '}
                «Поделиться» → «На экран «Домой»»
            </>
        ),
    },
    {
        icon: <AndroidOutlined style={{ fontSize: 20, color: '#3b82f6' }} />,
        text: (
            <>
                На{' '}
                <Text strong style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Android (Chrome):
                </Text>{' '}
                ⋮ → «Добавить на главный экран»
            </>
        ),
    },
    {
        icon: (
            <CheckCircleOutlined style={{ fontSize: 20, color: '#52c41a' }} />
        ),
        text: <>Приложение работает офлайн и открывается без браузера</>,
    },
]

const itemVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.1 + 0.15,
            duration: 0.3,
            ease: 'easeOut' as const,
        },
    }),
}

interface InstallGuideProps {
    forceOpen?: boolean
    onClose?: () => void
}

export function InstallGuide({ forceOpen, onClose }: InstallGuideProps) {
    const alreadySeen = localStorage.getItem(STORAGE_KEY) === 'true'
    const [open, setOpen] = useState(!alreadySeen && !isInStandaloneMode())

    const platform = detectPlatform()
    const steps =
        platform === 'ios'
            ? IOS_STEPS
            : platform === 'android'
              ? ANDROID_STEPS
              : OTHER_STEPS

    const platformLabel =
        platform === 'ios'
            ? 'iOS'
            : platform === 'android'
              ? 'Android'
              : 'устройство'

    const handleClose = () => {
        localStorage.setItem(STORAGE_KEY, 'true')
        setOpen(false)
        onClose?.()
    }

    return (
        <Drawer
            open={forceOpen || open}
            onClose={handleClose}
            placement="bottom"
            height="auto"
            closable={false}
            styles={{
                body: { padding: 0, background: '#1a1a2e' },
                mask: { backdropFilter: 'blur(4px)' },
            }}
            style={{ borderRadius: '20px 20px 0 0', overflow: 'hidden' }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{ padding: '24px 20px 32px' }}
            >
                {/* Хэндл и кнопка закрытия */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 20,
                    }}
                >
                    <div
                        style={{
                            width: 36,
                            height: 4,
                            borderRadius: 2,
                            background: 'rgba(255,255,255,0.15)',
                            margin: '0 auto',
                            position: 'absolute',
                            left: '50%',
                            top: 10,
                            transform: 'translateX(-50%)',
                        }}
                    />
                    <div />
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleClose}
                        style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: 'none',
                            borderRadius: '50%',
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'rgba(255,255,255,0.4)',
                            marginLeft: 'auto',
                        }}
                    >
                        <CloseOutlined style={{ fontSize: 13 }} />
                    </motion.button>
                </div>

                {/* Иконка */}
                <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.05, type: 'spring', stiffness: 220 }}
                    style={{ textAlign: 'center', marginBottom: 16 }}
                >
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: 16,
                            background: 'rgba(59,130,246,0.15)',
                            border: '1px solid rgba(59,130,246,0.3)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 28,
                        }}
                    >
                        📱
                    </div>
                </motion.div>

                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Title
                        level={4}
                        style={{ margin: 0, color: 'rgba(255,255,255,0.95)' }}
                    >
                        Установите приложение
                    </Title>
                    <Text type="secondary" style={{ fontSize: 13 }}>
                        Добавьте TransList на {platformLabel} как приложение —
                        удобно и быстро
                    </Text>
                </div>

                {/* Шаги */}
                <Space
                    direction="vertical"
                    size={14}
                    style={{ width: '100%', marginBottom: 24 }}
                >
                    {steps.map((step, i) => (
                        <AnimatePresence key={i}>
                            <motion.div
                                custom={i}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 14,
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    borderRadius: 12,
                                    padding: '12px 14px',
                                }}
                            >
                                <div
                                    style={{
                                        flexShrink: 0,
                                        width: 36,
                                        height: 36,
                                        borderRadius: 10,
                                        background: 'rgba(59,130,246,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {step.icon}
                                </div>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: 'rgba(255,255,255,0.65)',
                                        lineHeight: 1.6,
                                        paddingTop: 2,
                                    }}
                                >
                                    {step.text}
                                </Text>
                            </motion.div>
                        </AnimatePresence>
                    ))}
                </Space>

                {/* Кнопка */}
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClose}
                    style={{
                        width: '100%',
                        height: 50,
                        borderRadius: 14,
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
                    Понятно
                </motion.button>
            </motion.div>
        </Drawer>
    )
}
