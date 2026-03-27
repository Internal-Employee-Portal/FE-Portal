import { getStatusBadge } from "./RecentStatusCard";

export default function HistoryList({ list, selectedId, onSelect }: any) {
  return (
    <div className="list-group mb-3">
      {list.map((item: any) => {
        const isActive = selectedId === item.checkId;
        const badge = getStatusBadge(item.status);

        return (
          <button
            key={item.checkId}
            onClick={() => onSelect(item.checkId)}
            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
              isActive ? "active" : ""
            }`}
          >
            <span>
              {new Date(
                item.completed_at || item.requested_at,
              ).toLocaleString()}
            </span>

            <span className={`badge ${badge.className}`}>{badge.text}</span>
          </button>
        );
      })}
    </div>
  );
}
