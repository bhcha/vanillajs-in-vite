// vite.config.js
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy';

export default defineConfig({
    root: 'src',
    resolve: {
        alias: { // 기본 디렉토리 정의
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: { // 개발 서버 포트 설정
        port: 7600,
    },
    build: {
        outDir: '../dist',
        rollupOptions :{
            plugins: [
                copy({
                    targets: [
                        { src: 'src/statics/*', dest: 'dist/statics/' },
                    ],
                    // 위에서 복사할 파일의 소스(src) 및 대상(dest) 경로를 지정
                    // 이 예에서는 소스 경로(src)에서 파일을 복사하여 대상 경로(dest)에 저장
                }),
            ],
        },

        // console.log 제거
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
    },
});