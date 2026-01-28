//Sitemap
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const directusUrl =
  process.env.PUBLIC_DIRECTUS_URL ||
  process.env.DIRECTUS_URL ||
  'https://gsivalore.asoloweb.it';
let directusProtocol = 'https';
let directusHostname = 'gsivalore.asoloweb.it';

try {
  const parsed = new URL(directusUrl);
  directusProtocol = parsed.protocol.replace(':', '');
  directusHostname = parsed.hostname;
} catch {
  // Fall back to defaults if env is invalid.
}

// https://astro.build/config
export default defineConfig({
  site: 'https://gsivalore.it', // IMPORTANTISSIMO
  integrations: [sitemap({ entryLimit: 50000 })],
  image: {
    domains: [directusHostname],
    remotePatterns: [
      {
        protocol: directusProtocol,
        hostname: directusHostname,
        port: '',
        pathname: '/assets/**'
      }
    ]
  },
  vite: {
    ssr: {
      noExternal: ['astro/jsx-runtime']
    }
  }
});
