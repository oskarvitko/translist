import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    base: '/translist/',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['16x16.png', '32x32.png', '180x180.png'],
            manifest: {
                name: 'TransList',
                short_name: 'TransList',
                description: 'Помощник при просмотре сериалов в оригинале',
                theme_color: '#141414',
                background_color: '#141414',
                display: 'standalone',
                orientation: 'portrait',
                icons: [
                    { src: '72x72.png', sizes: '72x72', type: 'image/png' },
                    { src: '96x96.png', sizes: '96x96', type: 'image/png' },
                    { src: '120x120.png', sizes: '120x120', type: 'image/png' },
                    { src: '128x128.png', sizes: '128x128', type: 'image/png' },
                    { src: '144x144.png', sizes: '144x144', type: 'image/png' },
                    { src: '152x152.png', sizes: '152x152', type: 'image/png' },
                    { src: '180x180.png', sizes: '180x180', type: 'image/png' },
                    { src: '192x192.png', sizes: '192x192', type: 'image/png' },
                    { src: '384x384.png', sizes: '384x384', type: 'image/png' },
                    {
                        src: '512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
            },
        }),
    ],
})
