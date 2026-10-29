import { createContext, useContext, useState } from "react";
import {
  clearSession,
  getCurrentAccount,
  loginAccount,
  signUpAccount,
} from "../utils/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentAccount());

  const signUp = async ({ username, password, role }) => {
    const account = await signUpAccount({ username, password, role });
    setUser(account);
    return account;
  };

  const login = async ({ username, password }) => {
    const account = await loginAccount({ username, password });
    setUser(account);
    return account;
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  const value = { user, signUp, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
