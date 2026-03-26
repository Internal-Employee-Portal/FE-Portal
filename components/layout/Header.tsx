"use client";

import UserDropdown from "./UserDropdown";

export default function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom">
      <h5 className="mb-0">직원 관리 시스템</h5>

      <UserDropdown />
    </div>
  );
}
