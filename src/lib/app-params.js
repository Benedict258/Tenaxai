const isNode = typeof window === 'undefined';
const windowObj = isNode ? { localStorage: new Map() } : window;
const storage = windowObj.localStorage;

const toSnakeCase = (str) => {
	return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

const getAppParamValue = (paramName, { defaultValue = undefined, removeFromUrl = false } = {}) => {
	if (isNode) return defaultValue;
	
	const storageKey = `base44_${toSnakeCase(paramName)}`;
	const urlParams = new URLSearchParams(window.location.search);
	
	// Check query params
	let value = urlParams.get(paramName);

	// Fallback for 'token' vs 'access_token'
	if (!value && (paramName === "access_token" || paramName === "token")) {
		value = urlParams.get("token") || urlParams.get("access_token");
	}

	// Check hash (Base44 redirects often use hash for tokens)
	if (!value && window.location.hash) {
		const hashParams = new URLSearchParams(window.location.hash.substring(1));
		value = hashParams.get(paramName) || hashParams.get("token") || hashParams.get("access_token");
	}

	if (value) {
		console.log(`[Base44] Found ${paramName} in URL:`, value.substring(0, 10) + "...");
		storage.setItem(storageKey, value);
		
		if (removeFromUrl) {
			const newUrl = window.location.pathname + window.location.search.replace(new RegExp(`[?&](${paramName}|token|access_token)=[^&]*`, 'g'), '').replace(/^&/, '?') + window.location.hash;
			window.history.replaceState({}, document.title, newUrl);
		}
		return value;
	}

	const storedValue = storage.getItem(storageKey);
	if (storedValue) return storedValue;

	return defaultValue || null;
}

const getAppParams = () => {
	return {
		appId: getAppParamValue("app_id", { defaultValue: import.meta.env.VITE_BASE44_APP_ID }),
		serverUrl: getAppParamValue("server_url", { defaultValue: import.meta.env.VITE_BASE44_BACKEND_URL }),
		token: getAppParamValue("access_token", { removeFromUrl: true }),
		fromUrl: getAppParamValue("from_url", { defaultValue: window.location.href }),
		functionsVersion: getAppParamValue("functions_version"),
	}
}

export const appParams = { ...getAppParams() }
