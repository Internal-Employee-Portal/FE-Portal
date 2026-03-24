"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/services/api";
import EmployeeTable from "@/components/EmployeeTable";

export default function AdminEmployees() {
  const [employees, setEmployees] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const data = await apiFetch("/employees");
    setEmployees(data);
  };

  return (
    <div className="container mt-5">
      <h3>직원 관리</h3>

      <button
        className="btn btn-success mb-3"
        onClick={() => router.push("/admin/employees/create")}
      >
        직원 생성
      </button>

      <EmployeeTable
        employees={employees}
        onSelect={(id: string) => router.push(`/admin/employees/${id}`)}
      />
    </div>
  );
}
