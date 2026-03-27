import { getStatusBadge } from "./RecentStatusCard";

export default function HistoryDetail({ data }: any) {
  const badge = getStatusBadge(data.status);

  return (
    <div className="card">
      <div className="card-header bg-light fw-bold">이력 상세 정보</div>

      <div className="card-body p-3">
        {/* 기본 정보 */}
        <div className="mb-2">
          <div className="text-muted small">요청 일시</div>
          <div className="fw-bold">
            {new Date(data.requested_at).toLocaleString()}
          </div>
        </div>

        <div className="mb-2">
          <div className="text-muted small">완료 일시</div>
          <div className="fw-bold">
            {data.completed_at
              ? new Date(data.completed_at).toLocaleString()
              : "-"}
          </div>
        </div>

        <div className="mb-2">
          <div className="text-muted small">상태</div>
          <span className={`badge ${badge.className}`}>{badge.text}</span>
        </div>

        <hr className="my-3" />

        {/* 결과 */}
        <div className="text-muted small mb-2">조회 결과</div>

        <ul className="list-unstyled d-flex flex-column gap-2">
          <li>
            학력 검증 여부:{" "}
            {data.education_verified == null
              ? "확인 전"
              : data.education_verified
                ? "✅ 확인 완료"
                : "🚨 검증 실패"}
          </li>

          <li>
            경력 검증 여부:{" "}
            {data.employment_verified == null
              ? "확인 전"
              : data.employment_verified
                ? "✅ 확인 완료"
                : "🚨 검증 실패"}
          </li>

          <li>
            범죄 기록 여부:{" "}
            {data.criminal_record == null
              ? "확인 전"
              : data.criminal_record
                ? "🚨 범죄 이력 있음"
                : "✅ 확인 완료"}
          </li>

          <li>신용 상태: {data.credit_score ?? "확인 전"}</li>
        </ul>

        <div className="mt-3">
          <div className="text-muted small mb-1">비고</div>
          <div className="bg-light p-2 rounded small">
            {data.status === "pending"
              ? "현재 배경 조회가 진행 중입니다."
              : data.status === "clear"
                ? "모든 조회가 완료되었으며 문제 없습니다."
                : data.status === "flagged"
                  ? "주의가 필요한 항목이 발견되었습니다."
                  : "상태를 확인할 수 없습니다."}
          </div>
        </div>
      </div>
    </div>
  );
}
