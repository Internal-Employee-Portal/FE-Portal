"use client";

export default function ProfileForm({ formData, onChange }: any) {
  return (
    <form>
      {/* 이름 */}
      <div className="mb-4">
        <label className="form-label fw-bold">이름</label>
        <input
          className="form-control"
          value={formData.name || ""}
          onChange={(e) => onChange("name", e.target.value)}
          disabled
        />
      </div>

      {/* 이메일 (수정 불가) */}
      <div className="mb-4">
        <label className="form-label fw-bold">이메일</label>
        <input
          type="email"
          className="form-control bg-light"
          value={formData.email || ""}
          disabled
        />
        <div className="form-text text-muted">이메일은 수정할 수 없습니다.</div>
      </div>

      {/* 전화번호 */}
      <div className="mb-4">
        <label className="form-label fw-bold">전화번호</label>
        <input
          className="form-control"
          value={formData.phone || ""}
          onChange={(e) => onChange("phone", e.target.value)}
        />
      </div>

      {/* 부서 */}
      <div className="mb-4">
        <label className="form-label fw-bold">부서</label>
        <input
          className="form-control"
          value={formData.department || ""}
          onChange={(e) => onChange("department", e.target.value)}
        />
      </div>

      {/* 직급 */}
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
