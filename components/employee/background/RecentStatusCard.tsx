export const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return {
        text: "조회 중",
        className: "bg-warning text-dark",
      };
    case "clear":
      return {
        text: "정상",
        className: "bg-success",
      };
    case "flagged":
      return {
        text: "확인 필요",
        className: "bg-danger",
      };
    default:
      return {
        text: status,
        className: "bg-secondary",
      };
  }
};

export default function RecentStatusCard({ data }: any) {
  const badge = getStatusBadge(data.status);

  return (
    <div className="card mb-3">
      <div className="card-body p-3">
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted small">최근 조회 상태</span>

          <span className={`badge ${badge.className}`}>{badge.text}</span>
        </div>

        <div className="small">
          실행:{" "}
          {data.requested_at
            ? new Date(data.requested_at).toLocaleString()
            : "-"}
        </div>
      </div>
    </div>
  );
}
