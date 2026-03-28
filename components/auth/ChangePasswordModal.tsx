"use client";

import { useState } from "react";
import { apiFetch } from "@/services/api";

export default function ChangePasswordModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    // =========================
    // validation
    // =========================
    if (
      !form.current_password ||
      !form.new_password ||
      !form.confirm_password
    ) {
      alert("모든 값을 입력해주세요.");
      return;
    }

    if (form.new_password !== form.confirm_password) {
      alert("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      await apiFetch("/auth/change-password", {
        method: "PATCH",
        body: JSON.stringify(form),
      });

      alert("비밀번호 변경 완료");

      // 초기화
      setForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });

      onClose();
    } catch (err: any) {
      alert(err?.message || "비밀번호 변경 실패");
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
        style={{ maxWidth: "500px", zIndex: 1050 }}
      >
        <div
          className="bg-white rounded shadow"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
            <h5 className="mb-0">비밀번호 변경</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="p-3">
            {/* 현재 비밀번호 */}
            <Input
              type="password"
              label="현재 비밀번호"
              value={form.current_password}
              onChange={(v: string) => handleChange("current_password", v)}
            />

            {/* 새 비밀번호 */}
            <Input
              type="password"
              label="새 비밀번호"
              value={form.new_password}
              onChange={(v: string) => handleChange("new_password", v)}
            />

            {/* 비밀번호 확인 */}
            <Input
              type="password"
              label="비밀번호 확인"
              value={form.confirm_password}
              onChange={(v: string) => handleChange("confirm_password", v)}
            />
          </div>

          {/* FOOTER */}
          <div className="d-flex justify-content-end gap-2 p-3 border-top">
            <button className="btn btn-secondary" onClick={onClose}>
              취소
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              변경
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================
   공통 Input 컴포넌트
========================= */
function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
