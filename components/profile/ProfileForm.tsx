"use client";

import ProfileInfoRow from "./ProfileInfoRow";
import { formatPhone } from "@/utils/format";

export default function ProfileForm({ formData, onChange }: any) {
  return (
    <form>
      <div className="col-md-6 mb-3">
        <label className="form-label fw-bold">이름</label>

        <div className="d-flex gap-2">
          <input
            className="form-control"
            placeholder="성"
            value={formData.last_name || ""}
            onChange={(e) => onChange("last_name", e.target.value)}
          />

          <input
            className="form-control"
            placeholder="이름"
            value={formData.first_name || ""}
            onChange={(e) => onChange("first_name", e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <ProfileInfoRow label="사번" value={formData.employee_code} />
      </div>

      <div className="mb-4">
        <ProfileInfoRow label="이메일" value={formData.email} />
      </div>

      <div className="col-md-6 mb-3">
        <label className="form-label fw-bold">생년월일</label>
        <input
          type="date"
          className="form-control"
          value={formData.birth_date || ""}
          onChange={(e) => onChange("birth_date", e.target.value)}
        />
      </div>

      <div className="col-md-6 mb-3">
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
        <ProfileInfoRow label="부서" value={formData.department} />
      </div>

      <div className="mb-4">
        <ProfileInfoRow label="직급" value={formData.position} />
      </div>

      <div className="mb-4">
        <ProfileInfoRow label="입사일" value={formData.hire_date} />
      </div>
    </form>
  );
}
