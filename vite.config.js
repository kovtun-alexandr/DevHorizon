import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    // Вказуємо назву репозиторію, щоб шляхи під час деплою не ламалися
    base: '/DevHorizon/',

    build: {
        rollupOptions: {
            input: {
                // Явно вказуємо всі вхідні HTML-файли вашого проєкту
                main: resolve(import.meta.dirname, 'index.html'),
                schedule: resolve(import.meta.dirname, 'schedule.html'),
                speakers: resolve(import.meta.dirname, 'speakers.html'),
            },
        },
    },
});
