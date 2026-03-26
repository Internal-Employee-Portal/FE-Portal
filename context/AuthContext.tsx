"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/services/api";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const loadUser = async () => {
    try {
      const data = await apiFetch("/employees/me");
      setUser(data);

      // 🔥 계정 비활성 체크
      if (!data.is_active) {
        alert("비활성화된 계정입니다.");
        logout();
      }
    } catch (err) {
      logout("세션이 만료되었습니다.");
    }
  };

  const logout = (message?: string) => {
    localStorage.removeItem("token");

    if (message) alert(message);

    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      loadUser();
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
