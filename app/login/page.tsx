"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();

      // 토큰 저장
      localStorage.setItem("token", data.access_token);

      const payload = JSON.parse(atob(data.access_token.split(".")[1]));

      const me = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/employees/me`,
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        },
      ).then((res) => res.json());

      setUser(me);

      if (payload.role === "USER") {
        router.replace("/my-info");
      } else if (payload.role === "ADMIN") {
        router.replace("/admin/employees");
      }
    } catch (err) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">로그인</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">이메일</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">비밀번호</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            로그인
          </button>
        </form>

        {/* 🔥 안내 문구 */}
        <div className="mt-4 mb-2 text-center">
          <div className="small text-muted">
            테스트용 계정으로 클릭 시 자동 입력됩니다.
          </div>
        </div>

        {/* 관리자 계정 */}
        <div
          className="p-3 rounded bg-light border mb-2"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setEmail("admin@test.com");
            setPassword("1234");
          }}
        >
          <div className="text-muted small mb-2 fw-semibold">관리자 계정</div>

          <div className="small">
            <div>
              <span className="text-muted">이메일:</span>{" "}
              <code>admin@test.com</code>
            </div>
            <div>
              <span className="text-muted">비밀번호:</span>{" "}
              <code>admin1234</code>
            </div>
          </div>
        </div>

        {/* 일반 사용자 계정 */}
        <div
          className="p-3 rounded bg-light border"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setEmail("user@test.com");
            setPassword("1234");
          }}
        >
          <div className="text-muted small mb-2 fw-semibold">
            일반 사용자 계정
          </div>

          <div className="small">
            <div>
              <span className="text-muted">이메일:</span>{" "}
              <code>user@test.com</code>
            </div>
            <div>
              <span className="text-muted">비밀번호:</span>{" "}
              <code>user1234</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
