/// <reference types="vite/client" />

// Frontend environment variables defined here
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_WEBSOCKET_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}