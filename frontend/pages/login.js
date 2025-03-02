import { useState } from "react";
import { useRouter } from "next/router";
import { getUserFromClient } from "@/utils/auth";
import { useAuth } from "../context/authContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const { user, setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      const userData = await getUserFromClient();
      const user = userData.user;

      if (user) {
        setUser(user);

        if (user.isAdmin) {
          router.push("/dashboard");
        }
      }

      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded shadow-lg w-96">
        <h2 className="text-white text-xl mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input type="email" placeholder="Email" className="w-full p-2 mb-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 mb-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
}
