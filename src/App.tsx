import { useState } from 'react'
import { AppLayout } from './components/Layout/AppLayout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { InstallGuide } from './components/InstallGuide'
import { Flex } from 'antd'

export const App = () => {
    const [guideOpen, setGuideOpen] = useState(false)

    return (
        <Flex
            align="center"
            justify="center"
            style={{
                minWidth: '100%',
                minHeight: '100%',
                background: '#141414',
            }}
        >
            <ErrorBoundary>
                <AppLayout onOpenGuide={() => setGuideOpen(true)} />
                <InstallGuide
                    forceOpen={guideOpen}
                    onClose={() => setGuideOpen(false)}
                />
            </ErrorBoundary>
        </Flex>
    )
}
