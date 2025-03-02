import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/authContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Navbar() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);

    router.push("/");
  };

  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-between">
      <div className="flex space-x-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>

        <div className="relative group">
          <button className="hover:underline">Categories</button>
          <div className="absolute hidden group-hover:block bg-gray-800 text-white mt-2 rounded shadow-lg">
            <Link href="/category/electronics" className="block px-4 py-2 hover:bg-gray-700">
              Electronics
            </Link>
            <Link href="/category/clothing" className="block px-4 py-2 hover:bg-gray-700">
              Clothing
            </Link>
            <Link href="/category/books" className="block px-4 py-2 hover:bg-gray-700">
              Books
            </Link>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        {user ? (
          <>
            <div className="relative group">
              <button className="hover:underline">{user.name}</button>
              <div className="absolute hidden group-hover:block bg-gray-800 text-white mt-2 rounded shadow-lg">
                {user.is_admin && (
                  <Link href="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                )}
                <Link href="/orders" className="block px-4 py-2 hover:bg-gray-700">
                  My orders
                </Link>
              </div>
            </div>

            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
