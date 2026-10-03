import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    // Вказуємо назву репозиторію, щоб шляхи під час деплою не ламалися
    base: '/DevHorizon/',

    build: {
        rollupOptions: {
            input: {
                // Явно вказуємо всі вхідні HTML-файли вашого проєкту
                main: resolve(__dirname, 'index.html'),
                schedule: resolve(__dirname, 'schedule.html'),
                speakers: resolve(__dirname, 'speakers.html'),
            },
        },
    },
});