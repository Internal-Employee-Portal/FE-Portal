"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/services/api";
import ConfirmModal from "../layout/ConfirmModal";

/* =========================
   DETAIL VIEW
========================= */
function DetailView({ data }: any) {
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Field label="부서명" value={data.name} />
      <Field label="설명" value={data.description} />
      <Field label="담당자" value={data.manager_full_name} />

      <hr />

      <div className="fw-bold mb-2">
        👥 소속 직원 ({data.employees?.length || 0})
      </div>

      {data.employees?.map((emp: any, idx: number) => (
        <div key={idx} className="card mb-2">
          <div className="p-2">
            <div className="fw-bold">
              {emp.last_name} {emp.first_name}
            </div>
            <div className="text-muted small">{emp.position}</div>
            <div className="text-muted small">
              {emp.employee_code} | {emp.phone}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

/* =========================
   EDIT FORM
========================= */
function EditForm({ formData, setFormData, admins }: any) {
  if (!formData) return null;

  return (
    <>
      <Input
        label="부서명"
        value={formData.name}
        onChange={(v: any) => setFormData({ ...formData, name: v })}
      />

      <div className="mb-3">
        <label className="form-label">설명</label>
        <textarea
          className="form-control"
          rows={4}
          value={formData.description || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />
      </div>

      {/* 담당자 */}
      <div className="mb-3">
        <label className="form-label">부서 담당자</label>

        <select
          className="form-select"
          value={formData.manager_id ?? ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              manager_id: e.target.value ? String(e.target.value) : null,
            })
          }
        >
          <option value="">선택 안함</option>

          {admins.map((a: any) => (
            <option key={a.id} value={a.id}>
              {a.last_name} {a.first_name} ({a.employee_code})
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

/* =========================
   UI COMPONENTS
========================= */
function Input({ label, value, onChange }: any) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        className="form-control"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
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

/* =========================
   MAIN PANEL
========================= */
export default function DepartmentDetailPanel({
  isOpen,
  onSuccess,
  deptId,
  onClose,
}: any) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [admins, setAdmins] = useState<any[]>([]);
  const [dept, setDept] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  /* =========================
     RESET WHEN CLOSE
  ========================= */
  useEffect(() => {
    if (!isOpen) {
      setEditMode(false);
      setFormData(null);
      setDept(null);
      setAdmins([]);
    }
  }, [isOpen]);

  /* =========================
     FETCH DEPT
  ========================= */
  const fetchDept = async () => {
    if (!deptId) return;

    try {
      const res = await apiFetch(`/departments/${deptId}`);

      setDept(res);
      setFormData(res);
    } catch (err: any) {
      alert(err.message);
    }
  };

  /* =========================
     FETCH ADMINS
  ========================= */
  const fetchAdmins = async () => {
    const res = await apiFetch("/employees/admin/list");
    setAdmins(res);
  };

  /* =========================
     INIT LOAD
  ========================= */
  useEffect(() => {
    if (isOpen && deptId) {
      fetchDept();
    }
  }, [isOpen, deptId]);

  useEffect(() => {
    if (isOpen && admins.length === 0) {
      fetchAdmins();
    }
  }, [isOpen]);

  /* =========================
     SAVE
  ========================= */
  const handleSave = async () => {
    if (!formData || loading) return;

    setLoading(true);

    try {
      await apiFetch(`/departments/${deptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          manager_id: formData.manager_id,
        }),
      });

      setEditMode(false);
      await fetchDept();
      onSuccess();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    setIsConfirmOpen(false);

    try {
      await apiFetch(`/departments/${deptId}`, {
        method: "DELETE",
      });

      onClose();
      onSuccess();
    } catch (err: any) {
      alert(err?.message || "삭제 실패");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* overlay */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040 }}
        onClick={onClose}
      />

      {/* panel */}
      <div
        className="position-fixed top-0 end-0 h-100 bg-white shadow d-flex flex-column"
        style={{ width: "420px", zIndex: 1050 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
          <h5 className="mb-0 fw-bold">부서 상세</h5>

          <div className="d-flex align-items-center gap-3">
            {/* 삭제 버튼 */}
            <i
              className="bi bi-trash"
              style={{ cursor: "pointer" }}
              onClick={() => setIsConfirmOpen(true)}
            ></i>
            <ConfirmModal
              isOpen={isConfirmOpen}
              title="부서 삭제"
              message={
                <>
                  부서를 삭제하시겠습니까? <br />
                  <span className="text-danger small">
                    부서에 소속된 직원들의 부서 정보는 제거됩니다.
                  </span>
                </>
              }
              onCancel={() => setIsConfirmOpen(false)}
              onConfirm={handleConfirmDelete}
            />

            {/* 닫기 버튼 */}
            <button className="btn-close" onClick={onClose} />
          </div>
        </div>

        {/* body */}
        <div className="p-4 flex-grow-1 overflow-auto">
          {!editMode ? (
            <DetailView data={dept} />
          ) : (
            <EditForm
              formData={formData}
              setFormData={setFormData}
              admins={admins}
            />
          )}

          {/* buttons */}
          <div className="mt-4">
            {!editMode ? (
              <button
                className="btn btn-primary w-100"
                onClick={() => setEditMode(true)}
              >
                수정
              </button>
            ) : (
              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary w-50"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "저장중..." : "저장"}
                </button>

                <button
                  className="btn btn-outline-secondary w-50"
                  onClick={() => {
                    setEditMode(false);
                    setFormData(dept);
                  }}
                >
                  취소
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
