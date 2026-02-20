import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../api/client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (form) => {
    const data = await apiFetch("/login", {
      method: "POST",
      body: JSON.stringify(form)
    });

    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // 🔑 Auto-login al recargar
  useEffect(() => {
    const validate = async () => {
      try {
        const data = await apiFetch("/auth/me");
        setUser(data);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    validate();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);