"use client";

export default function ProfileInfoRow({ label, value }: any) {
  return (
    <div className="row mb-4">
      <div className="col-sm-3 fw-bold">{label}</div>
      <div className="col-sm-9">{value || "-"}</div>
    </div>
  );
}
