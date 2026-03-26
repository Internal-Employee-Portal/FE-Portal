"use client";

import { useState } from "react";
import ProfileInfoRow from "./ProfileInfoRow";

export default function ProfileCard({ profile }: any) {
  const [editMode, setEditMode] = useState(false);

  return (
    <div
      className="card shadow-sm"
      style={{ maxWidth: "800px", width: "100%" }}
    >
      {/* HEADER */}
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center p-3">
        <h5 className="mb-0 fw-bold">내 정보</h5>

        <button
          className="btn btn-light btn-sm px-3"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "취소" : "수정"}
        </button>
      </div>

      {/* BODY */}
      <div className="card-body p-5">
        <ProfileInfoRow label="이름" value={profile.name} />
        <ProfileInfoRow label="이메일" value={profile.email} />
        <ProfileInfoRow label="전화번호" value={profile.phone} />
        <ProfileInfoRow label="부서" value={profile.department} />
        <ProfileInfoRow label="직급" value={profile.position} />
        <ProfileInfoRow label="입사일" value={profile.hireDate} />
      </div>
    </div>
  );
}
