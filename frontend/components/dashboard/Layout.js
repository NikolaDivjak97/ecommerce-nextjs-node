import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { FiHome, FiBox, FiUsers, FiShoppingCart, FiLogOut } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardLayout({ children }) {
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
    <div className="flex bg-gray-100 h-full min-h-screen">
      <aside className={`w-64 bg-white shadow-md transition-transform translate-x-0 md:translate-x-0 fixed md:relative z-10 h-100`}>
        <div className="p-4 text-xl font-bold border-b">Admin Panel</div>
        <nav className="mt-4">
          <Link href="/dashboard" className="flex items-center p-3 hover:bg-gray-200">
            <FiHome className="mr-3" /> Dashboard
          </Link>
          <Link href="/dashboard/products" className="flex items-center p-3 hover:bg-gray-200">
            <FiBox className="mr-3" /> Products
          </Link>
          <Link href="/dashboard/categories" className="flex items-center p-3 hover:bg-gray-200">
            <BiCategoryAlt className="mr-3" /> Categories
          </Link>
          <Link href="/dashboard/users" className="flex items-center p-3 hover:bg-gray-200">
            <FiUsers className="mr-3" /> Users
          </Link>
          <Link href="/dashboard/orders" className="flex items-center p-3 hover:bg-gray-200">
            <FiShoppingCart className="mr-3" /> Orders
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center p-3 hover:bg-red-200 text-red-600 mt-4">
            <FiLogOut className="mr-3" /> Logout
          </button>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">Admin Dashboard</h1>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
