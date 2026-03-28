"use client";

import DepartmentRow from "./DepartmentRow";

export default function DepartmentTable({ departments, onSelect }: any) {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>부서명</th>
          <th>설명</th>
          <th>담당자</th>
          <th>직원 수</th>
          <th>생성일</th>
        </tr>
      </thead>

      <tbody>
        {departments.map((dept: any) => (
          <DepartmentRow key={dept.id} dept={dept} onClick={onSelect} />
        ))}
      </tbody>
    </table>
  );
}
