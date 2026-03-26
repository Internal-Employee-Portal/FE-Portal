"use client";

export default function EmployeeRow({ emp, onClick }: any) {
  return (
    <tr style={{ cursor: "pointer" }} onClick={() => onClick(emp.id)}>
      <td>{emp.name}</td>
      <td>{emp.email || "-"}</td>
      <td>{emp.department || "-"}</td>
      <td>{emp.position || "-"}</td>
      <td>{emp.phone || "-"}</td>
      <td>{emp.hire_date || "-"}</td>

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
