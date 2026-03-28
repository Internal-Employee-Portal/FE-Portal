"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import ChangePasswordModal from "../auth/ChangePasswordModal";

export default function UserDropdown() {
  const { user, logout } = useAuth();
  const [isPwModalOpen, setIsPwModalOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="position-relative" ref={ref}>
      <div
        className="d-flex align-items-center gap-2"
        style={{ cursor: "pointer" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{user.name}</span>

        <div
          className="rounded-circle bg-secondary"
          style={{ width: "32px", height: "32px" }}
        />
      </div>

      {isOpen && (
        <div
          className="dropdown-menu show position-absolute end-0 mt-2 shadow rounded"
          style={{ width: "240px" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 👤 USER INFO */}
          <div className="px-3 py-2">
            <div className="fw-semibold">{user.name}</div>
            <div className="text-muted small">{user.email}</div>
          </div>
          <div className="dropdown-divider" />
          <button
            className="dropdown-item"
            onClick={() => setIsPwModalOpen(true)}
          >
            비밀번호 변경
          </button>
          <ChangePasswordModal
            isOpen={isPwModalOpen}
            onClose={() => setIsPwModalOpen(false)}
          />
          <button
            className="dropdown-item text-danger"
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
