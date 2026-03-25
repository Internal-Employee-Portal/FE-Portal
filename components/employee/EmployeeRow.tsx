"use client";

export default function EmployeeRow({ emp, onClick }: any) {
  return (
    <tr>
      <td>{emp.name}</td>
      <td>{emp.email || "-"}</td>
      <td>{emp.department || "-"}</td>
      <td>{emp.position || "-"}</td>
      <td>-</td>
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

      <td>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => onClick(emp.id)}
        >
          상세보기
        </button>
      </td>
    </tr>
  );
}
