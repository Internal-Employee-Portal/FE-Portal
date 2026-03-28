"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import EmployeeTable from "@/components/employee/EmployeeTable";
import EmployeeDetailPanel from "@/components/employee/EmployeeDetailPanel";
import { apiFetch } from "@/services/api";
import CreateEmployeeModal from "@/components/employee/CreateEmployeeModal";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departments, setDepartments] = useState([]);

  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(
    null,
  );

  const [filters, setFilters] = useState({
    department: [] as string[],
    status: [] as string[],
    role: [] as string[],
  });

  const router = useRouter();

  useEffect(() => {
    fetchData();
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (!user) return;

    if (user.role !== "ADMIN") {
      alert("관리자만 접근 가능합니다.");
      router.push("/my-info");
    }
  }, [user]);

  const fetchData = async () => {
    const data = await apiFetch("/employees/full");
    setEmployees(data);
  };

  const fetchDepartments = async () => {
    const res = await apiFetch("/departments/");
    setDepartments(res.departments);
  };

  const filteredEmployees = useMemo(() => {
    const keyword = search.toLowerCase();

    return employees.filter((emp: any) => {
      // 🔍 검색 (이름 + 이메일)
      const matchSearch =
        (emp.name || "").toLowerCase().includes(keyword) ||
        (emp.email || "").toLowerCase().includes(keyword);

      // 🏢 부서 필터
      const matchDept =
        filters.department.length === 0 ||
        filters.department.includes(emp.department_name);

      // 📊 상태 필터
      const matchStatus =
        filters.status.length === 0 || filters.status.includes(emp.status);

      // 🔐 역할 필터
      const matchRole =
        filters.role.length === 0 || filters.role.includes(emp.role);

      return matchSearch && matchDept && matchStatus && matchRole;
    });
  }, [employees, search, filters]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Header />

        <div className="p-4">
          <div className="card">
            {/* HEADER */}
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">전체 직원 목록</h5>

              <button
                className="btn btn-primary"
                onClick={() => setIsModalOpen(true)}
              >
                새 직원 생성
              </button>

              <CreateEmployeeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchData}
                departments={departments}
              />
            </div>

            {/* SEARCH */}
            <div className="p-3">
              <input
                className="form-control"
                placeholder="이름 또는 이메일로 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* TABLE */}
            <EmployeeTable
              employees={filteredEmployees}
              onSelect={(id: string) => {
                setSelectedId(id);
                setIsOpen(true);
              }}
              filters={filters}
              setFilters={setFilters}
              activeFilterColumn={activeFilterColumn}
              setActiveFilterColumn={setActiveFilterColumn}
              departments={departments}
            />

            <EmployeeDetailPanel
              employeeId={selectedId}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              departments={departments}
            />

            {/* FOOTER */}
            <div className="card-footer text-muted">
              총 {filteredEmployees.length}명의 직원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
