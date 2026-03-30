"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

import DepartmentTable from "@/components/departments/DepartmentTable";
import DepartmentCreateModal from "@/components/departments/DepartmentCreateModal";
import DepartmentDetailPanel from "@/components/departments/DepartmentDetailPanel";

export type Admin = {
  id: string;
  first_name: string;
  last_name: string;
  employee_code: string;
};

type Department = {
  id: string;
  name: string;
  description: string;
  manager_id: string | null;
  created_at?: string;
  deleted_at?: string | null;
};

export default function DepartmentPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { user } = useAuth();
  const router = useRouter();

  // =====================
  // FETCH LIST
  // =====================

  useEffect(() => {
    if (!user) return;

    if (user.role !== "ADMIN") {
      alert("관리자만 접근 가능합니다.");
      router.push("/my-info");
      return;
    }

    fetchDepartments();
    fetchAdmins();
  }, [user]);

  const fetchDepartments = async () => {
    const data = await apiFetch("/departments");
    setDepartments(data.departments || []);
  };

  const fetchAdmins = async () => {
    const data = await apiFetch("/employees/admin/list");
    setAdmins(data || []);
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Header />

        <div className="container mt-4">
          {/* TABLE */}
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">전체 부서 목록</h5>

              <button
                className="btn btn-primary"
                onClick={() => setIsModalOpen(true)}
              >
                새 부서 생성
              </button>
            </div>

            <div className="card-body p-0">
              <DepartmentTable
                departments={departments}
                onSelect={(id: string) => {
                  setSelectedId(id);
                  setIsOpen(true);
                }}
              />
            </div>

            <div className="card-footer bg-light text-muted small">
              총 {departments.length}개
            </div>
          </div>
        </div>

        {/* DETAIL PANEL */}
        <DepartmentDetailPanel
          isOpen={isOpen}
          onSuccess={fetchDepartments}
          deptId={selectedId}
          onClose={() => {
            setIsOpen(false);
          }}
        />

        {/* CREATE MODAL */}
        <DepartmentCreateModal
          isOpen={isModalOpen}
          onSuccess={fetchDepartments}
          admins={admins}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}
