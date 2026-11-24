import { useCallback, useEffect, useState } from "react";

const TOKEN_KEY = "token";

export const hasToken = () => {
  try {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  } catch {
    return false;
  }
};

export const setToken = (token = "21234") => {
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event("auth-token-changed"));
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event("auth-token-changed"));
};

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(hasToken);

  const refresh = useCallback(() => setIsAuthenticated(hasToken()), []);

  useEffect(() => {
    window.addEventListener("auth-token-changed", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("auth-token-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  const login = useCallback(() => setToken(), []);
  const logout = useCallback(() => clearToken(), []);

  return { isAuthenticated, login, logout };
};

export default useAuth;
