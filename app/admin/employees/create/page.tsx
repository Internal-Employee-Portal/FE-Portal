"use client";

import { useRouter } from "next/navigation";
import { apiFetch } from "@/services/api";
import EmployeeCreateForm from "@/components/EmployeeCreateForm";

export default function CreateEmployee() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    await apiFetch("/employees", {
      method: "POST",
      body: JSON.stringify(data),
    });

    alert("생성 완료");
    router.push("/admin/employees");
  };

  return (
    <div className="container mt-5">
      <h3>직원 생성</h3>

      <EmployeeCreateForm onSubmit={handleCreate} />
    </div>
  );
}
