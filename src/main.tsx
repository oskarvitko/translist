import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App } from './App'

import 'antd/dist/reset.css'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
            retry: false,
        },
    },
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                    token: {
                        colorPrimary: '#3b82f6',
                        borderRadius: 12,
                        fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    },
                }}
            >
                <App />
            </ConfigProvider>
        </QueryClientProvider>
    </StrictMode>,
)
