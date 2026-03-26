"use client";

import { useState } from "react";
import ProfileInfoRow from "./ProfileInfoRow";
import ProfileForm from "./ProfileForm";
import { apiFetch } from "@/services/api";

export default function ProfileCard({ profile }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSave = async () => {
    try {
      await apiFetch("/employees/me", {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      alert("수정 완료");
      setIsEditing(false);
    } catch {
      alert("수정 실패");
    }
  };

  const handleCancel = () => {
    setFormData(profile); // 원복
    setIsEditing(false);
  };

  return (
    <div
      className="card shadow-sm"
      style={{ maxWidth: "800px", width: "100%" }}
    >
      {/* 🔥 HEADER */}
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center p-3">
        <h5 className="mb-0 fw-bold">내 정보</h5>

        {!isEditing ? (
          <button
            className="btn btn-light btn-sm px-3"
            onClick={() => setIsEditing(true)}
          >
            수정
          </button>
        ) : (
          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm px-3" onClick={handleSave}>
              저장
            </button>
            <button
              className="btn btn-outline-light btn-sm px-3"
              onClick={handleCancel}
            >
              취소
            </button>
          </div>
        )}
      </div>

      {/* 🔥 BODY */}
      <div className="card-body p-5">
        {isEditing ? (
          <ProfileForm formData={formData} onChange={handleChange} />
        ) : (
          <>
            <ProfileInfoRow label="이름" value={profile.name} />
            <ProfileInfoRow label="사번" value={profile.employee_code} />
            <ProfileInfoRow label="이메일" value={profile.email} />
            <ProfileInfoRow label="전화번호" value={profile.phone} />
            <ProfileInfoRow label="부서" value={profile.department} />
            <ProfileInfoRow label="직급" value={profile.position} />
            <ProfileInfoRow label="입사일" value={profile.hireDate} />
          </>
        )}
      </div>
    </div>
  );
}
