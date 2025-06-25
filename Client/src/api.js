
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function signupUser(data) {
  const res = await fetch(`${apiUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Signup failed");
  return res.json();
}