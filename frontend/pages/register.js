import { useState } from "react";
import { useRouter } from "next/router";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      document.cookie = `token=${data.token}; path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=86400`;

      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleRegister} className="bg-gray-800 p-6 rounded shadow-lg w-96">
        <h2 className="text-white text-xl mb-4">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input type="text" placeholder="Name" className="w-full p-2 mb-2" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" className="w-full p-2 mb-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 mb-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
          Register
        </button>
      </form>
    </div>
  );
}
