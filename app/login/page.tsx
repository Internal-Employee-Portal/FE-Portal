"use client";

import { apiFetch } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      localStorage.setItem("token", data.access_token);

      const me = await apiFetch("/employees/me", {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      if (!me.is_active) {
        localStorage.removeItem("token");
        setError("비활성화 계정입니다. 관리자에게 문의하세요.");
        return;
      }

      setUser(me);

      if (me.role === "USER") {
        router.replace("/my-info");
      } else if (me.role === "ADMIN") {
        router.replace("/admin/employees");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
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

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
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
            setPassword("admin1234");
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
            setPassword("user1234");
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
