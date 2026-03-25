const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function apiFetch(url: string, options: any = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}
