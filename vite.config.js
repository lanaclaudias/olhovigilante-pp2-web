import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

// Previous config
/* export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: 'assets'
  },
  define: {
    __APP_ENV__: JSON.stringify(env.APP_ENV),
  },
})
 */

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    build: {
      assetsDir: "assets",
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});
