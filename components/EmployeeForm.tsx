"use client";

import { useState } from "react";

export default function EmployeeForm({ employee, onSubmit }: any) {
  const [name, setName] = useState(employee.name);
  const [position, setPosition] = useState(employee.position || "");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    onSubmit({
      name,
      position,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3">
      <h5>정보 수정</h5>

      <div className="mb-3">
        <label className="form-label">이름</label>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">직책</label>
        <input
          className="form-control"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>

      <button className="btn btn-primary">저장</button>
    </form>
  );
}
