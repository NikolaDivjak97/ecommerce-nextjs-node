const cookie = require("cookie");

export async function getUserFromClient() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      credentials: "include",
    });

    if (!res.ok) {
      new Error("Not authenticated");
    }

    return await res.json();
  } catch {
    return null;
  }
}

export async function getUser(context) {
  try {
    const { req } = context;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: { Cookie: req.headers.cookie || "" },
    });

    if (!res.ok) throw new Error("Not authenticated");

    return await res.json();
  } catch (error) {
    return null;
  }
}
