"use client";

import EmployeeRow from "./EmployeeRow";

export default function EmployeeTable({ employees, onSelect }: any) {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>이름</th>
          <th>이메일</th>
          <th>부서</th>
          <th>직급</th>
          <th>전화번호</th>
          <th>입사일</th>
          <th>역할</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp: any) => (
          <EmployeeRow key={emp.id} emp={emp} onClick={onSelect} />
        ))}
      </tbody>
    </table>
  );
}
