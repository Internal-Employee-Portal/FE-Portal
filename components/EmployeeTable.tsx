"use client";

export default function EmployeeTable({ employees, onSelect }: any) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>이름</th>
          <th>직책</th>
          <th>상태</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp: any) => (
          <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>{emp.position}</td>
            <td>{emp.status}</td>
            <td>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => onSelect(emp.id)}
              >
                상세
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
