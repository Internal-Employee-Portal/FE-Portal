"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import EmployeeTable from "@/components/employee/EmployeeTable";
import EmployeeDetailPanel from "@/components/employee/EmployeeDetailPanel";
import { apiFetch } from "@/services/api";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!user) return;

    if (user.role !== "ADMIN") {
      alert("관리자만 접근 가능합니다.");
      router.push("/employees/me");
    }
  }, [user]);

  const fetchData = async () => {
    const data = await apiFetch("/employees/full");
    setEmployees(data);
  };

  const filtered = employees.filter((emp: any) =>
    emp.name.toLowerCase().includes(search.toLowerCase()),
  );

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
                onClick={() => router.push("/admin/employees/create")}
              >
                새 직원 생성
              </button>
            </div>

            {/* SEARCH */}
            <div className="p-3">
              <input
                className="form-control"
                placeholder="이름으로 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* TABLE */}
            <EmployeeTable
              employees={filtered}
              onSelect={(id: string) => {
                setSelectedId(id);
                setIsOpen(true);
              }}
            />

            <EmployeeDetailPanel
              employeeId={selectedId}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            />

            {/* FOOTER */}
            <div className="card-footer text-muted">
              총 {filtered.length}명의 직원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
