import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

// Re-fetch params to ensure we have the absolute latest from URL/Storage
const { appId, serverUrl, token, functionsVersion } = appParams;

console.log("[Base44 Client] Initializing with AppID:", appId);
if (token) console.log("[Base44 Client] Token detected, enabling authenticated session.");

//Create a client with authentication required
export const base44 = createClient({
  appId,
  serverUrl,
  token,
  functionsVersion,
  requiresAuth: false,
  headers: {
    "api_key": import.meta.env.VITE_BASE44_API_KEY
  }
});

// Helper to manually update token if it arrives late
export const setBase44Token = (newToken) => {
    if (base44 && base44.setToken) {
        base44.setToken(newToken);
    }
};
