"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/services/api";
import BackgroundSection from "./background/BackgroundSection";

function DetailView({ employee, auth }: any) {
  if (!employee || !auth) return <div>Loading...</div>;

  return (
    <>
      <Field
        label="이름"
        value={`${employee.last_name} ${employee.first_name}`}
      />
      <Field label="사번" value={employee.employee_code} />
      <Field label="이메일" value={auth.email} />
      <Field label="전화번호" value={employee.phone} />
      <Field label="생년월일" value={employee.birth_date} />
      <Field label="부서" value={employee.department_id} />
      <Field label="직급" value={employee.position} />
      <Field label="입사일" value={employee.hire_date} />

      <div className="mb-3">
        <div className="text-muted small">역할</div>
        <span
          className={`badge ${
            auth.role === "ADMIN" ? "bg-danger" : "bg-secondary"
          }`}
        >
          {auth.role}
        </span>
      </div>
    </>
  );
}

function EditForm({ formData, setFormData }: any) {
  return (
    <>
      <Input
        label="이름"
        value={`${formData.last_name} ${formData.first_name}`}
        onChange={(v: any) => setFormData({ ...formData, name: v })}
      />

      <Input
        label="사번"
        value={formData.employee_code}
        onChange={(v: any) => setFormData({ ...formData, employee_code: v })}
      />

      <Input
        label="이메일"
        value={formData.email}
        style={{ cursor: "not-allowed" }}
        disabled
      />

      <Input
        label="전화번호"
        value={formData.phone}
        onChange={(v: any) => setFormData({ ...formData, phone: v })}
      />

      <div className="mb-3">
        <label className="form-label">생년월일</label>
        <input
          type="date"
          className="form-control"
          value={formData.birth_date || ""}
          onChange={(e) =>
            setFormData({ ...formData, birth_date: e.target.value })
          }
        />
      </div>

      <Input
        label="부서"
        value={formData.department_id}
        onChange={(v: any) => setFormData({ ...formData, department_id: v })}
      />

      <Input
        label="직급"
        value={formData.position}
        onChange={(v: any) => setFormData({ ...formData, position: v })}
      />

      <div className="mb-3">
        <label className="form-label">입사일</label>
        <input
          type="date"
          className="form-control"
          value={formData.hire_date || ""}
          onChange={(e) =>
            setFormData({ ...formData, hire_date: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">역할</label>
        <select
          className="form-select"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>
    </>
  );
}

function Input({ label, value, onChange, disabled }: any) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        className={`form-control ${disabled ? "bg-light" : ""}`}
        value={value || ""}
        disabled={disabled}
        style={{ cursor: disabled ? "not-allowed" : "text" }}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}

function Field({ label, value }: any) {
  return (
    <div className="mb-3">
      <div className="text-muted small">{label}</div>
      <div className="fw-semibold">{value || "-"}</div>
    </div>
  );
}

export default function EmployeeDetailPanel({
  employeeId,
  isOpen,
  onClose,
}: any) {
  const [employee, setEmployee] = useState<any>(null);
  const [auth, setAuth] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (!isOpen) {
      setEditMode(false);
      setFormData(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (employeeId && isOpen) {
      fetchData();
    }
  }, [employeeId, isOpen]);

  const fetchData = async () => {
    const emp = await apiFetch(`/employees/${employeeId}`);
    const authData = await apiFetch(`/auth/${employeeId}`);

    setEmployee(emp);
    setAuth(authData);
    setFormData({
      ...emp,
      email: authData.email,
      role: authData.role,
    });
  };

  const handleSave = async () => {
    await apiFetch(`/employees/${employeeId}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: formData.name,
        department_id: formData.department_id,
        position: formData.position,
        hire_date: formData.hire_date,
        status: formData.status,
        role: formData.role,
      }),
    });

    setEditMode(false);
    fetchData();
  };

  const toggleActive = async () => {
    await apiFetch(`/auth/${employeeId}`, {
      method: "PUT",
      body: JSON.stringify({
        is_active: !auth.is_active,
      }),
    });

    fetchData();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        onClick={onClose}
      />

      <div
        className="position-fixed top-0 end-0 h-100 bg-white shadow d-flex flex-column"
        style={{ width: "420px", zIndex: 1050 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 className="mb-0">직원 상세 정보</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <div className="flex-grow-1 overflow-auto">
          <div className="p-4">
            {!editMode ? (
              <DetailView employee={employee} auth={auth} />
            ) : (
              <EditForm formData={formData} setFormData={setFormData} />
            )}

            <div className="mt-4">
              {!editMode ? (
                <button
                  className="btn btn-primary w-100 py-2"
                  onClick={() => setEditMode(true)}
                >
                  수정
                </button>
              ) : (
                <div className="d-flex gap-2">
                  <button className="btn btn-primary w-50" onClick={handleSave}>
                    저장
                  </button>
                  <button
                    className="btn btn-outline-secondary w-50"
                    onClick={() => {
                      setEditMode(false);
                      setFormData(employee);
                    }}
                  >
                    취소
                  </button>
                </div>
              )}
            </div>

            <div className="mt-2">
              <button
                className={`btn ${
                  auth?.is_active ? "btn-danger" : "btn-success"
                } w-100 py-2`}
                onClick={toggleActive}
              >
                {auth?.is_active ? "계정 비활성화" : "계정 활성화"}
              </button>
            </div>

            <BackgroundSection employee={employee} />
          </div>
        </div>
      </div>
    </>
  );
}
