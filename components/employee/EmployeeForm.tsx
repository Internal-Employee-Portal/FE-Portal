"use client";

import { formatPhone } from "@/utils/format";

export default function EmployeeForm({ formData, onChange }: any) {
  return (
    <div className="row">
      {/* 이름 */}
      <div className="col-md-6 mb-3">
        <label className="form-label">이름 *</label>

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

      {/* 사번 */}
      <Input
        col
        label="사번"
        value={formData.employee_code}
        onChange={(v: any) => onChange("employee_code", v)}
      />

      {/* 전화번호 */}
      <Input
        col
        label="전화번호"
        value={formData.phone}
        onChange={(v: any) => onChange("phone", formatPhone(v))}
      />

      {/* 생년월일 */}
      <div className="col-md-6 mb-3">
        <label className="form-label">생년월일</label>
        <input
          type="date"
          className="form-control"
          value={formData.birth_date || ""}
          onChange={(e) => onChange("birth_date", e.target.value)}
        />
      </div>

      {/* 이메일 */}
      <Input
        col
        label="이메일 *"
        value={formData.email}
        onChange={(v: any) => onChange("email", v)}
      />

      {/* 비밀번호 */}
      <Input
        col
        type="password"
        label="비밀번호 *"
        value={formData.password}
        onChange={(v: any) => onChange("password", v)}
      />

      {/* 부서 */}
      <Input
        col
        label="부서 ID"
        value={formData.department_id}
        onChange={(v: any) => onChange("department_id", v)}
      />

      {/* 직급 */}
      <Input
        col
        label="직급"
        value={formData.position}
        onChange={(v: any) => onChange("position", v)}
      />

      {/* 입사일 */}
      <div className="col-md-6 mb-3">
        <label className="form-label">입사일 *</label>
        <input
          type="date"
          className="form-control"
          value={formData.hire_date}
          onChange={(e) => onChange("hire_date", e.target.value)}
        />
      </div>

      {/* 역할 */}
      <div className="col-md-6 mb-3">
        <label className="form-label">역할 *</label>
        <select
          className="form-select"
          value={formData.role}
          onChange={(e) => onChange("role", e.target.value)}
        >
          <option value="USER">직원</option>
          <option value="ADMIN">관리자</option>
        </select>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", col, autoFocus }: any) {
  return (
    <div className={`${col ? "col-md-6" : ""} mb-3`}>
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-control"
        value={value || ""}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
