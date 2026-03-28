export const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, "");

  if (numbers.length < 4) return numbers;
  if (numbers.length < 8) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  }
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};

export const formatStatus = (status: string) => {
  if (status === "ACTIVE") return { badge: "bg-success", label: "재직" };
  else if (status === "RESIGNED") return { badge: "bg-danger", label: "퇴사" };
  else if (status === "ON_LEAVE")
    return { badge: "bg-secondary", label: "휴직" };
};
