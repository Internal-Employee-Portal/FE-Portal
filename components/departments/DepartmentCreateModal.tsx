"use client";

import { useState } from "react";
import { apiFetch } from "@/services/api";
import DepartmentForm from "./DepartmentForm";

export default function DepartmentCreateModal({
  isOpen,
  admins,
  onClose,
}: any) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    manager_id: null as string | null,
  });

  const handleChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    // validation
    if (!formData.name) {
      alert("부서명을 입력해주세요.");
      return;
    }

    try {
      await apiFetch("/departments", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      alert("부서 생성 완료");

      // reset
      setFormData({
        name: "",
        description: "",
        manager_id: null,
      });

      onClose();
    } catch (err) {
      console.error(err);
      alert("부서 생성 실패");
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
            <h5 className="mb-0">새 부서 생성</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY (Employee 방식과 동일하게 분리) */}
          <div className="p-3">
            <DepartmentForm
              formData={formData}
              onChange={handleChange}
              admins={admins}
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
