"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  user: any;
  setUser: (user: any) => void;
  isLoadingAuth: boolean;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
  isLoadingAuth: true
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const expiry = localStorage.getItem("token_expiry");
    const storedUser = localStorage.getItem("user");

    if (storedToken && expiry) {
      const now = Date.now();
      if (now > parseInt(expiry)) {
        localStorage.removeItem("token");
        localStorage.removeItem("token_expiry");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
      } else {
        setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser));
      }
    }

    setIsLoadingAuth(false);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, isLoadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
