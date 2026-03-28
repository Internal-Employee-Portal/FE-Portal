"use client";

function Input({ label, value, onChange, type = "text", col }: any) {
  return (
    <div className={`${col ? "col-md" : ""} mb-3`}>
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-control"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function TextArea({ label, value, onChange }: any) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <textarea
        className="form-control"
        rows={4}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Select({ label, value, onChange, options }: any) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <select
        className="form-select"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
      >
        <option value="">선택 안함</option>

        {options.map((opt: any) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function DepartmentForm({ formData, onChange, admins }: any) {
  return (
    <div className="row">
      {/* 부서명 */}
      <Input
        col
        label="부서명 *"
        value={formData.name}
        onChange={(v: any) => onChange("name", v)}
      />

      {/* 설명 */}
      <TextArea
        label="설명"
        value={formData.description}
        onChange={(v: any) => onChange("description", v)}
      />

      {/* 담당자 */}
      <Select
        label="담당자"
        value={formData.manager_id}
        onChange={(v: any) => onChange("manager_id", v ? v : null)}
        options={admins.map((a: any) => ({
          id: a.id,
          label: `${a.last_name} ${a.first_name} (${a.employee_code})`,
        }))}
      />
    </div>
  );
}
