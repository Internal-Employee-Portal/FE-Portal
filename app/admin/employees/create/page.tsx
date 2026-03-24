"use client";

import { useRouter } from "next/navigation";
import EmployeeForm from "@/components/EmployeeForm";
import { apiFetch } from "@/services/api";

export default function CreateEmployee() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    await apiFetch("/employees", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        email: data.email,
        password: data.password,
        role: data.role || "USER",
      }),
    });

    alert("생성 완료");
    router.push("/admin/employees");
  };

  return (
    <div className="container mt-5">
      <h3>직원 생성</h3>

      <EmployeeForm
        employee={{ name: "", position: "" }}
        onSubmit={handleCreate}
      />
    </div>
  );
}
