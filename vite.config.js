import { defineConfig } from "rollup";
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()]
})