"use client";

export default function FilterDropdown({
  column,
  label,
  options = [],
  filters = {},
  activeFilterColumn,
  setActiveFilterColumn,
  onSelect,
}: any) {
  const isOpen = activeFilterColumn === column;

  // 🔥 핵심: undefined 방어
  const current = filters[column] ?? [];

  return (
    <th className="position-relative">
      {/* 헤더 */}
      <div
        className="d-flex align-items-center gap-1"
        style={{ cursor: "pointer" }}
        onClick={() => setActiveFilterColumn(isOpen ? null : column)}
      >
        {label} ▼
      </div>

      {/* 드롭다운 */}
      {isOpen && (
        <div
          className="position-absolute bg-white shadow rounded p-1"
          style={{
            top: "100%",
            left: 0,
            zIndex: 1050,
            minWidth: 150,
          }}
        >
          <ul className="list-unstyled mb-0">
            {/* 전체 */}
            <li
              className={`p-2 rounded ${
                current.length === 0 ? "bg-primary text-white" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => onSelect(column, "전체")}
            >
              전체
            </li>

            {/* 옵션 */}
            {options.map((opt: any) => (
              <li
                key={opt.value}
                className={`p-2 rounded ${
                  current.includes(opt.value) ? "bg-primary text-white" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => onSelect(column, opt.value)} // 🔥 value 전달
              >
                {opt.label} {/* 🔥 화면 표시 */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </th>
  );
}
