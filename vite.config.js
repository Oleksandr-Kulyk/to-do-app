import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Встановлюємо порт, на якому сервер буде працювати (зручно для Electron)
    port: 5173,
    // Включаємо HMR для коректної роботи в Electron
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
  build: {
    // Визначаємо цільову платформу для оптимальної роботи
    target: 'esnext',
    // Директорія для зібраних файлів у виробничому режимі
    outDir: 'dist',
  },
});
