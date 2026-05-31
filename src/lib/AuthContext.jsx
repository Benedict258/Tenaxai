import React, { createContext, useState, useContext, useEffect } from 'react';
import { base44, setBase44Token } from '@/api/base44Client';
import { appParams } from '@/lib/app-params';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = async () => {
    setIsLoadingAuth(true);
    setAuthError(null);

    // 1. Check if we just received a token in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const token = urlParams.get("token") || urlParams.get("access_token") || 
                  hashParams.get("token") || hashParams.get("access_token");

    if (token) {
        console.log("[Auth] New token detected in URL, updating client...");
        setBase44Token(token);
    }

    // 2. Try to fetch user profile
    try {
      console.log("[Auth] Validating session...");
      const currentUser = await base44.auth.me();
      console.log("[Auth] Session valid, welcome:", currentUser.full_name);
      setUser(currentUser);
      setIsAuthenticated(true);
      setAuthError(null);
    } catch (error) {
      console.warn("[Auth] Session validation failed:", error.message);
      setIsAuthenticated(false);
      
      // Check if it's a specific registration issue
      if (error.status === 403 && error.data?.extra_data?.reason === 'user_not_registered') {
        setAuthError({ 
            type: 'user_not_registered', 
            message: 'Your account is verified, but you haven\'t been granted access to this specific app.' 
        });
      } else {
        setAuthError({ 
            type: 'auth_required', 
            message: 'Authentication required' 
        });
      }
    }

    setIsLoadingAuth(false);
    setIsLoadingPublicSettings(false);
  };

  const logout = (shouldRedirect = true) => {
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
    base44.auth.logout(shouldRedirect ? window.location.href : undefined);
  };

  const navigateToLogin = () => {
    base44.auth.redirectToLogin(window.location.href);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      logout,
      navigateToLogin,
      checkAppState: initAuth // Rename for compatibility
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
