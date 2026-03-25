"use client";

export default function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom">
      <h5 className="mb-0">직원 관리 시스템</h5>

      <div className="d-flex align-items-center gap-2">
        <span>관리자</span>
        <div
          className="rounded-circle bg-secondary"
          style={{ width: "32px", height: "32px" }}
        ></div>
      </div>
    </div>
  );
}
