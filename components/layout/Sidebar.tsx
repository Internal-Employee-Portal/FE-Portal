"use client";

export default function Sidebar() {
  return (
    <div
      className="d-flex flex-column bg-light p-3"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      <h5 className="mb-4">메뉴</h5>

      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <a className="nav-link active">직원 관리</a>
        </li>
      </ul>
    </div>
  );
}
