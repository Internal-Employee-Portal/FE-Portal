"use client";

export default function AuthToggle({ isActive, onToggle }: any) {
  return (
    <div className="card p-3 mt-3">
      <h5>로그인 제어</h5>
      <p>
        현재 상태:{" "}
        <strong className={isActive ? "text-success" : "text-danger"}>
          {isActive ? "활성" : "차단됨"}
        </strong>
      </p>

      <button
        className={`btn ${isActive ? "btn-danger" : "btn-success"}`}
        onClick={onToggle}
      >
        {isActive ? "로그인 차단" : "로그인 허용"}
      </button>
    </div>
  );
}
