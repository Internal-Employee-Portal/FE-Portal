"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/services/api";
import { formatPhone, formatStatus } from "@/utils/format";
import ConfirmModal from "../layout/ConfirmModal";
import BackgroundSection from "./background/BackgroundSection";

function DetailView({ employee }: any) {
  if (!employee) return <div>Loading...</div>;

  return (
    <>
      <Field
        label="이름"
        value={`${employee.last_name} ${employee.first_name}`}
      />
      <Field label="사번" value={employee.employee_code} />
      <Field label="이메일" value={employee.email} />
      <Field label="전화번호" value={employee.phone} />
      <Field label="생년월일" value={employee.birth_date} />
      <Field label="부서" value={employee.department_name} />
      <Field label="직급" value={employee.position} />
      <Field label="입사일" value={employee.hire_date} />
      <Field label="상태" value={formatStatus(employee.status)?.label} />

      <div className="mb-3">
        <div className="text-muted small">역할</div>
        <span
          className={`badge ${
            employee.role === "ADMIN" ? "bg-danger" : "bg-secondary"
          }`}
        >
          {employee.role}
        </span>
      </div>
    </>
  );
}

function EditForm({ formData, setFormData, departments }: any) {
  return (
    <>
      <div className="mb-3">
        <label className="form-label">이름</label>

        <div className="d-flex gap-2">
          <input
            className="form-control"
            placeholder="성"
            value={formData.last_name || ""}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          />

          <input
            className="form-control"
            placeholder="이름"
            value={formData.first_name || ""}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
          />
        </div>
      </div>

      <Input
        label="사번"
        value={formData.employee_code}
        onChange={(v: any) => setFormData({ ...formData, employee_code: v })}
      />

      <Field label="이메일" value={formData.email} />

      <Input
        label="전화번호"
        value={formData.phone}
        onChange={(v: any) =>
          setFormData({ ...formData, phone: formatPhone(v) })
        }
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

      <div className="mb-3">
        <label className="form-label">부서</label>

        <select
          className="form-select"
          value={formData.department_id ?? ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              department_id: e.target.value || null,
            })
          }
        >
          <option value="">부서 선택</option>

          {departments.map((dept: any) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

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
        <label className="form-label">상태</label>

        <select
          className="form-select"
          value={formData.status ?? "ACTIVE"}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value || null,
            })
          }
        >
          <option value="ACTIVE">재직</option>
          <option value="ON_LEAVE">휴직</option>
          <option value="RESIGNED">퇴사</option>
        </select>

        {formData.status === "RESIGNED" && (
          <div className="alert alert-danger mt-2">
            <span className="form-text small text-muted">
              퇴사 처리 시 계정은 기본적으로 비활성화됩니다. <br />
              필요한 경우 관리자 권한으로 다시 활성화할 수 있습니다.
            </span>
          </div>
        )}
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
  setIsOpen,
  setSelectedId,
  fetchListData,
  onClose,
  departments,
}: any) {
  const [employee, setEmployee] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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

    setEmployee(emp);
    setFormData(emp);
  };

  const handleSave = async () => {
    try {
      await apiFetch(`/employees/${employeeId}`, {
        method: "PATCH",
        body: JSON.stringify({
          last_name: formData.last_name,
          first_name: formData.first_name,
          employee_code: formData.employee_code,
          phone: formData.phone,
          birth_date: formData.birth_date,
          department_id: formData.department_id,
          position: formData.position,
          hire_date: formData.hire_date,
          status: formData.status,
          role: formData.role,
        }),
      });

      setEditMode(false);
      fetchData();
      setIsOpen(false);
      setSelectedId(null);
      fetchListData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleConfirmDelete = async () => {
    setIsConfirmOpen(false);

    try {
      onClose();
      setIsOpen(false);
      setSelectedId(null);

      await apiFetch(`/employees/${employeeId}`, {
        method: "DELETE",
      });

      fetchListData();
    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
  };

  const toggleActive = async () => {
    await apiFetch(`/auth/${employeeId}`, {
      method: "PATCH",
      body: JSON.stringify({
        is_active: !employee.is_active,
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

          <div className="d-flex align-items-center gap-3">
            {/* 삭제 버튼 */}
            <i
              className="bi bi-trash"
              style={{ cursor: "pointer" }}
              onClick={() => setIsConfirmOpen(true)}
            ></i>
            <ConfirmModal
              isOpen={isConfirmOpen}
              title="직원 삭제"
              message={
                <>
                  직원을 삭제하시겠습니까? <br />
                </>
              }
              onCancel={() => setIsConfirmOpen(false)}
              onConfirm={handleConfirmDelete}
            />

            {/* 닫기 버튼 */}
            <button className="btn-close" onClick={onClose} />
          </div>
        </div>

        <div className="flex-grow-1 overflow-auto">
          <div className="p-4">
            {employee && employee.status == "RESIGNED" && employee.is_active ? (
              <div className="alert alert-danger mt-2">
                <b className="form-text">
                  관리자에 의해 일시적으로 활성화된 퇴사자 계정입니다. <br />
                  작업 완료 후 계정을 다시 비활성화해 주세요.
                </b>
              </div>
            ) : (
              ""
            )}

            {!editMode ? (
              <DetailView employee={employee} />
            ) : (
              <EditForm
                formData={formData}
                setFormData={setFormData}
                departments={departments}
              />
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

            {!editMode ? (
              <>
                <div className="mt-2">
                  <button
                    className={`btn ${
                      employee?.is_active ? "btn-danger" : "btn-success"
                    } w-100 py-2`}
                    onClick={toggleActive}
                  >
                    {employee?.is_active
                      ? "계정 비활성화하기"
                      : "계정 활성화하기"}
                  </button>
                </div>

                <BackgroundSection employee={employee} />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
