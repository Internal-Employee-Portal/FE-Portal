"use client";

import { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import { apiFetch } from "@/services/api";

export default function CreateEmployeeModal({
  isOpen,
  onClose,
  onSuccess,
  departments,
}: any) {
  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    employee_code: "",
    phone: "",
    birth_date: "",
    email: "",
    password: "",
    department_id: "",
    position: "",
    hire_date: "",
    role: "USER",
  });

  const handleChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    // 🔥 기본 validation
    const required = [
      "last_name",
      "first_name",
      "email",
      "password",
      "hire_date",
      "role",
    ];

    for (const key of required) {
      if (!formData[key as keyof typeof formData]) {
        alert("필수 값을 입력해주세요.");
        return;
      }
    }

    try {
      await apiFetch("/employees", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          employee_code: formData.employee_code || null,
          phone: formData.phone || null,
          birth_date: formData.birth_date || null,
          department_id: formData.department_id || null,
          position: formData.position || null,
        }),
      });

      alert("직원 생성 완료");

      // 초기화
      setFormData({
        last_name: "",
        first_name: "",
        employee_code: "",
        phone: "",
        birth_date: "",
        email: "",
        password: "",
        department_id: "",
        position: "",
        hire_date: "",
        role: "USER",
      });

      onClose();
      onSuccess(); // 리스트 새로고침
    } catch (err) {
      alert("생성 실패");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* OVERLAY */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className="position-fixed top-50 start-50 translate-middle w-100"
        style={{ maxWidth: "720px", zIndex: 1050 }}
      >
        <div
          className="bg-white rounded shadow"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
            <h5 className="mb-0">새 직원 생성</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="p-3">
            <EmployeeForm
              formData={formData}
              onChange={handleChange}
              departments={departments}
            />
          </div>

          {/* FOOTER */}
          <div className="d-flex justify-content-end gap-2 p-3 border-top">
            <button className="btn btn-secondary" onClick={onClose}>
              취소
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              생성
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
