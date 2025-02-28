const cookie = require("cookie");

export async function getUserFromClient() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    new Error("Not authenticated");
  }

  return await res.json();
}

export async function getUser(req) {
  if (!req || !req.headers || !req.headers.cookie) return null;

  const cookies = cookie.parse(req.headers.cookie);
  const token = cookies.token;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Not authenticated");

    return await res.json();
  } catch (error) {
    return null;
  }
}
