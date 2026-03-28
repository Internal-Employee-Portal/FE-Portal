"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <div
      className="d-flex flex-column bg-light p-3"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      <h5 className="mb-4">메뉴</h5>

      <ul className="nav nav-pills flex-column">
        {/* 관리자 */}
        {user?.role === "ADMIN" && (
          <>
            <li className="nav-item">
              <Link
                href="/admin/employees"
                className={`nav-link ${
                  pathname === "/admin/employees" ? "active" : ""
                }`}
              >
                직원 목록
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/admin/departments"
                className={`nav-link ${
                  pathname === "/admin/departments" ? "active" : ""
                }`}
              >
                부서 관리
              </Link>
            </li>
          </>
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
