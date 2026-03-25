"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔥 핵심

    router.push("/login");
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleLogout}>
      로그아웃
    </button>
  );
}
