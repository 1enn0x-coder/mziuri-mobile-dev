import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type AuthState = {
  isSignedIn: boolean;
  signIn: (username: string, password: string) => boolean;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  function signIn(username: string, password: string) {
    if (username.trim() !== "progamer2010" || password !== "mziuri123") {
      return false;
    }

    setIsSignedIn(true);
    return true;
  }

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);

  if (auth === null) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return auth;
}
