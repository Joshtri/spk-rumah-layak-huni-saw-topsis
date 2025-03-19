import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // Pastikan alias @ menunjuk ke src
        },
        extensions: ['.js', '.jsx'], // ✅ Tambahkan ini agar ekstensi bisa diabaikan
    },
    plugins: [react()],
    css: {
        postcss: path.resolve(__dirname, 'postcss.config.js'),
    },
});
