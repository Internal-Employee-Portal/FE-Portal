"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch } from "@/services/api";
import ProfileCard from "@/components/profile/ProfileCard";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function MyInfoPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      alert("로그인 후 접근 가능합니다.");
      router.push("/login");
      return;
    }

    fetchData();
  }, [user]);

  const fetchData = async () => {
    const data = await apiFetch("/employees/me");

    setProfile({
      id: data.id,
      name: data.name,
      last_name: data.last_name,
      first_name: data.first_name,
      email: data.email,
      phone: data.phone,
      department: data.department_name,
      position: data.position,
      hire_date: data.hire_date,
      employee_code: data.employee_code,
      birth_date: data.birth_date,
    });
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="d-flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-grow-1">
        <Header />

        <div className="bg-light p-5 min-vh-100 d-flex justify-content-center">
          <ProfileCard profile={profile} />
        </div>
      </div>
    </div>
  );
}
