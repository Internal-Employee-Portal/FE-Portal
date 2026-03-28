"use client";

import { formatStatus } from "@/utils/format";

export default function EmployeeRow({ emp, onClick }: any) {
  const statusRes = formatStatus(emp.status);

  return (
    <tr style={{ cursor: "pointer" }} onClick={() => onClick(emp.id)}>
      <td>{emp.name}</td>
      <td>{emp.email || "-"}</td>
      <td>{emp.department_name || "-"}</td>
      <td>{emp.position || "-"}</td>
      <td>{emp.phone || "-"}</td>
      <td>
        <span className={`badge ${statusRes?.badge}`}>
          {emp.role ? statusRes?.label : "-"}
        </span>
      </td>

      <td>
        <span
          className={`badge ${
            emp.role === "ADMIN" ? "bg-danger" : "bg-secondary"
          }`}
        >
          {emp.role === "ADMIN" ? "관리자" : "직원"}
        </span>
      </td>
    </tr>
  );
}
