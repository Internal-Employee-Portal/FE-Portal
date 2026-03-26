"use client";

import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <div
      className="d-flex flex-column bg-light p-3"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      <h5 className="mb-4">메뉴</h5>

      <ul className="nav nav-pills flex-column">
        {/* 관리자 */}
        {user?.role === "ADMIN" && (
          <li className="nav-item">
            <a className="nav-link active">직원 목록</a>
          </li>
        )}

        {/* 일반 사용자 */}
        {user?.role === "USER" && (
          <li className="nav-item">
            <a className="nav-link active">내 정보</a>
          </li>
        )}
      </ul>
    </div>
  );
}
