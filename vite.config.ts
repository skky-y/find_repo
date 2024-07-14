// https://vitejs.dev/config/
import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()] as Array<PluginOption>,
});
