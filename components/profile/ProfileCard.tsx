"use client";

import { useState } from "react";
import ProfileInfoRow from "./ProfileInfoRow";
import ProfileForm from "./ProfileForm";
import { apiFetch } from "@/services/api";

export default function ProfileCard({ profile }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [currentProfile, setCurrentProfile] = useState(profile);

  const handleChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSave = async () => {
    try {
      await apiFetch(`/employees/${profile.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          phone: formData.phone,
          birth_date: formData.birth_date,
        }),
      });

      const updated = await apiFetch(`/employees/${profile.id}`);
      setCurrentProfile(updated);
      setFormData(updated);

      setIsEditing(false);
    } catch (err) {
      alert(err?.message || "수정 실패");
    }
  };

  const handleCancel = () => {
    setFormData(profile);
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

      <div className="card-body p-5">
        {!isEditing ? (
          <>
            <ProfileInfoRow label="이름" value={currentProfile.name} />
            <ProfileInfoRow label="사번" value={currentProfile.employee_code} />
            <ProfileInfoRow label="이메일" value={currentProfile.email} />
            <ProfileInfoRow
              label="생년월일"
              value={currentProfile.birth_date}
            />
            <ProfileInfoRow label="전화번호" value={currentProfile.phone} />
            <ProfileInfoRow
              label="부서"
              value={currentProfile.department_name}
            />
            <ProfileInfoRow label="직급" value={currentProfile.position} />
            <ProfileInfoRow label="입사일" value={currentProfile.hire_date} />
          </>
        ) : (
          <ProfileForm formData={formData} onChange={handleChange} />
        )}
      </div>
    </div>
  );
}
