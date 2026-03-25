"use client";

import { useState } from "react";

export default function EmployeeCreateForm({ onSubmit }: any) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    onSubmit({
      name,
      position,
      email,
      password,
      role,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <h5>직원 생성</h5>

      <div className="mb-3">
        <label>이름</label>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>직책</label>
        <input
          className="form-control"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>이메일</label>
        <input
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>비밀번호</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>권한</label>
        <select
          className="form-control"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      <button className="btn btn-success">생성</button>
    </form>
  );
}
