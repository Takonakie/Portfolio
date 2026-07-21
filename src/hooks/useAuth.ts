import { useState, useCallback } from "react";

interface AuthState {
  authenticated: boolean;
  expiry: number;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("portfolio-auth");
      if (!stored) return false;
      const auth: AuthState = JSON.parse(stored);
      if (Date.now() > auth.expiry) {
        localStorage.removeItem("portfolio-auth");
        return false;
      }
      return auth.authenticated;
    } catch {
      return false;
    }
  });

  const login = useCallback(() => {
    const auth: AuthState = {
      authenticated: true,
      expiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };
    localStorage.setItem("portfolio-auth", JSON.stringify(auth));
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("portfolio-auth");
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
}
