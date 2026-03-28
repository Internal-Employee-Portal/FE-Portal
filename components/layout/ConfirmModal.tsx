"use client";

export default function ConfirmModal({
  isOpen,
  title = "확인",
  message,
  onCancel,
  onConfirm,
}: any) {
  if (!isOpen) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        style={{ zIndex: 2000 }}
        onClick={onCancel}
      />

      {/* MODAL */}
      <div
        className="position-fixed top-50 start-50 translate-middle"
        style={{ zIndex: 2001, width: "100%", maxWidth: "400px" }}
      >
        <div className="bg-white rounded shadow">
          {/* HEADER */}
          <div className="p-3 border-bottom fw-bold">{title}</div>

          {/* BODY */}
          <div className="p-3">
            <div>{message}</div>
          </div>

          {/* FOOTER */}
          <div className="d-flex justify-content-end gap-2 p-3 border-top">
            <button className="btn btn-secondary" onClick={onCancel}>
              취소
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
