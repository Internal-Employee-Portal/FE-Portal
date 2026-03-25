"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/services/api";
import EmployeeDetail from "@/components/EmployeeDetail";
import EmployeeForm from "@/components/EmployeeForm";
import LogoutButton from "@/components/LogoutButton";

export default function MyPage() {
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await apiFetch("/employees/me");
      setEmployee(data);
    } catch (err) {
      alert("인증 오류");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedData: any) => {
    try {
      await apiFetch(`/employees/${employee.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });

      alert("수정 완료");
      fetchData();
    } catch (err) {
      alert("수정 실패");
    }
  };

  if (loading) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <LogoutButton />
      <h3 className="mb-4">마이페이지</h3>
      <EmployeeDetail employee={employee} />
      <EmployeeForm employee={employee} onSubmit={handleUpdate} />
    </div>
  );
}
