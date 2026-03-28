"use client";

export default function DepartmentRow({ dept, onClick }: any) {
  return (
    <tr style={{ cursor: "pointer" }} onClick={() => onClick(dept.id)}>
      <td>{dept.name}</td>
      <td>{dept.description}</td>
      <td>{dept.manager_full_name ?? "-"}</td>
      <td>{dept.employeeCount ?? 0}</td>
      <td>{dept.created_at?.split("T")[0]}</td>
    </tr>
  );
}
