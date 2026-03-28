"use client";

import EmployeeRow from "./EmployeeRow";
import FilterDropdown from "./FilterDropdown";

export default function EmployeeTable({
  employees,
  onSelect,
  filters,
  setFilters,
  activeFilterColumn,
  setActiveFilterColumn,
  departments,
}: any) {
  const handleFilterSelect = (column: string, value: string) => {
    setFilters((prev: any) => {
      const current = prev[column] ?? []; // 🔥 핵심

      // 전체 클릭
      if (value === "전체") {
        return { ...prev, [column]: [] };
      }

      // toggle
      const exists = current.includes(value);

      const updated = exists
        ? current.filter((v: string) => v !== value)
        : [...current, value];

      return { ...prev, [column]: updated };
    });
  };
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>이름</th>
          <th>이메일</th>
          <FilterDropdown
            column="department"
            label="부서"
            options={departments.map((d: any) => ({
              label: d.name,
              value: d.name,
            }))}
            filters={filters}
            activeFilterColumn={activeFilterColumn}
            setActiveFilterColumn={setActiveFilterColumn}
            onSelect={handleFilterSelect}
          />
          <th>직급</th>
          <th>전화번호</th>
          <FilterDropdown
            column="status"
            label="상태"
            options={[
              { label: "재직", value: "ACTIVE" },
              { label: "휴직", value: "ON_LEAVE" },
              { label: "퇴사", value: "RESIGNED" },
            ]}
            filters={filters}
            activeFilterColumn={activeFilterColumn}
            setActiveFilterColumn={setActiveFilterColumn}
            onSelect={handleFilterSelect}
          />
          <FilterDropdown
            column="role"
            label="역할"
            options={[
              { label: "직원", value: "USER" },
              { label: "관리자", value: "ADMIN" },
            ]}
            filters={filters}
            activeFilterColumn={activeFilterColumn}
            setActiveFilterColumn={setActiveFilterColumn}
            onSelect={handleFilterSelect}
          />
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
