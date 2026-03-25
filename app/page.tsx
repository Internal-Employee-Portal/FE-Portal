"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    // role 확인
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // JWT decode

      if (payload.role === "USER") {
        router.replace("/employee/me");
      } else if (payload.role === "ADMIN") {
        router.replace("/admin/employees");
      } else {
        router.replace("/login");
      }
    } catch (e) {
      router.replace("/login");
    }
  }, []);

  return <div>Loading...</div>;
}
