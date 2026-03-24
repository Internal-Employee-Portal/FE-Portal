export default function EmployeeDetail({ employee }: any) {
  return (
    <div className="card p-3 mb-3">
      <h5>내 정보</h5>
      <p>
        <strong>이름:</strong> {employee.name}
      </p>
      <p>
        <strong>직책:</strong> {employee.position}
      </p>
      <p>
        <strong>상태:</strong> {employee.status}
      </p>
    </div>
  );
}
