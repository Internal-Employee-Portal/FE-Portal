"use client";

import ProfileInfoRow from "./ProfileInfoRow";
import { formatPhone } from "@/utils/format";

export default function ProfileForm({ formData, onChange }: any) {
  return (
    <form>
      <div className="mb-4">
        <ProfileInfoRow label="이름" value={formData.name} />
      </div>

      <div className="mb-4">
        <ProfileInfoRow label="사번" value={formData.employee_code} />
      </div>

      <div className="mb-4">
        <ProfileInfoRow label="이메일" value={formData.email} />
      </div>

      <div className="mb-4">
        <ProfileInfoRow label="생년월일" value={formData.birth_date} />
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">전화번호</label>
        <input
          type="tel"
          inputMode="numeric"
          className="form-control"
          placeholder="010-1234-5678"
          maxLength={13}
          value={formData.phone || ""}
          onChange={(e) => {
            const formatted = formatPhone(e.target.value);
            onChange("phone", formatted);
          }}
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">부서</label>
        <input
          className="form-control"
          value={formData.department || ""}
          onChange={(e) => onChange("department", e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">직급</label>
        <input
          className="form-control"
          value={formData.position || ""}
          onChange={(e) => onChange("position", e.target.value)}
        />
      </div>
    </form>
  );
}
