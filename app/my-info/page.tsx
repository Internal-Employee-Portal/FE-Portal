"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/services/api";
import ProfileCard from "@/components/profile/ProfileCard";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function MyInfoPage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await apiFetch("/employees/me");

    setProfile({
      name: data.name,
      email: data.email,
      phone: data.phone,
      department: data.department_id,
      position: data.position,
      hireDate: data.hire_date,
      employee_code: data.employee_code,
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
