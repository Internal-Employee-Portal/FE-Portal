"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/services/api";

import EmployeeDetail from "@/components/EmployeeDetail";
import EmployeeForm from "@/components/EmployeeForm";
import AuthToggle from "@/components/AuthToggle";

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<any>(null);
  const [auth, setAuth] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const emp = await apiFetch(`/employees/${id}`);
    setEmployee(emp);

    // 🔥 auth 정보 API 필요 (추가 필요)
    const authData = await apiFetch(`/auth/${id}`);
    setAuth(authData);
  };

  const handleUpdate = async (data: any) => {
    await apiFetch(`/employees/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    alert("수정 완료");
    fetchData();
  };

  const toggleAuth = async () => {
    await apiFetch(`/auth/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        is_active: !auth.is_active,
      }),
    });

    fetchData();
  };

  if (!employee || !auth) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h3>직원 상세</h3>

      <EmployeeDetail employee={employee} />

      <EmployeeForm employee={employee} onSubmit={handleUpdate} />

      <AuthToggle isActive={auth.is_active} onToggle={toggleAuth} />
    </div>
  );
}
