"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/services/api";
import RecentStatusCard from "./RecentStatusCard";
import HistoryList from "./HistoryList";
import HistoryDetail from "./HistoryDetail";

export default function BackgroundSection({ employee }: any) {
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const [historyList, setHistoryList] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<any>(null);

  const fetchHistory = async () => {
    setError(null);
    try {
      const res = await apiFetch(`/background?employeeId=${employee.id}`);
      setHistoryList(res.backgrounds || []);
    } catch (e) {
      console.error(e);
      setError("이력 조회 중 오류가 발생했습니다.");
    }
  };

  const fetchDetail = async (checkId: string) => {
    try {
      setError(null);

      const res = await apiFetch(`/background/${checkId}`);
      setDetail(res);
    } catch (e) {
      setError("상세 조회 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (!employee) return;
    fetchHistory();
  }, [employee]);

  const handleRunCheck = async () => {
    setIsChecking(true);
    setError(null);
    try {
      await apiFetch("/background/", {
        method: "POST",
        body: JSON.stringify({
          employeeId: employee.id,
        }),
      });
      await fetchHistory();
    } catch (e) {
      setError("배경 조회 실행 중 오류가 발생했습니다.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleSync = async () => {
    if (!employee?.id) return;

    setError(null);

    try {
      await apiFetch(`/background/sync?employeeId=${employee.id}`);
      await fetchHistory();
    } catch (e) {
      setError("이력 동기화 중 오류가 발생했습니다.");
    }
  };

  const handleToggleHistory = () => {
    const willShow = !showHistory;
    setShowHistory(willShow);

    if (showHistory) {
      setSelectedId(null);
      setDetail(null);
    }
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    fetchDetail(id);
  };

  return (
    <div>
      <hr className="my-4" />

      <h6 className="fw-bold mb-3">배경 조회</h6>

      {/* 최근 상태 */}
      {employee?.latest_background && (
        <RecentStatusCard data={employee.latest_background} />
      )}

      {/* 버튼 */}
      <div className="d-flex flex-column gap-2 mb-4">
        <button
          className="btn btn-outline-primary"
          onClick={handleRunCheck}
          disabled={isChecking}
        >
          {isChecking ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              조회 중...
            </>
          ) : (
            "배경 조회 실행"
          )}
        </button>

        <button
          className="btn btn-outline-secondary w-100 text-dark"
          onClick={handleSync}
        >
          이력 동기화
        </button>

        {historyList.length > 0 && (
          <button
            className="btn btn-outline-info w-100"
            onClick={handleToggleHistory}
          >
            {showHistory
              ? "이력 숨기기"
              : `조회 이력 보기 (${historyList.length}건)`}
          </button>
        )}
      </div>

      {/* 이력 영역 */}
      {showHistory && (
        <>
          <h6 className="fw-bold mb-2">배경 조회 이력</h6>
          {error && (
            <div className="alert alert-danger py-2 small">{error}</div>
          )}

          <HistoryList
            list={historyList}
            selectedId={selectedId}
            onSelect={handleSelect}
          />

          {detail && <HistoryDetail data={detail} />}
        </>
      )}
    </div>
  );
}
