import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";
import { FaUser, FaShoppingCart, FaCaretDown } from "react-icons/fa";
import Logo from "@/assets/logoipsum.svg";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Navbar({ cart }) {
  const router = useRouter();

  const { user, setUser } = useAuth();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleLogout = async () => {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);

    router.push("/");
  };

  useEffect(() => {
    const fetchUserCartCount = async () => {
      if (user) {
        const res = await fetch(`${API_URL}/api/cart/cart-count`, {
          credentials: "include",
        });

        if (!res.ok) {
          return;
        }

        const data = await res.json();
        const count = data.count || 0;

        setCartCount(count);
      } else {
        const cartData = localStorage.getItem("cart");

        if (cartData) {
          const cart = JSON.parse(cartData);
          setCartCount(cart.length);
        }
      }
    };

    fetchUserCartCount();
  }, [user]);

  useEffect(() => {
    setIsAccountOpen(false);
  }, [router.asPath]);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-lg mr-3 font-semibold text-gray-800 hover:text-gray-600">
              Home
            </Link>

            <Link href="/shop" className="text-lg font-semibold text-gray-800 hover:text-gray-600">
              Shop
            </Link>
          </div>

          <Link href="/">
            <Logo />
          </Link>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <div className="ml-6 relative">
                  <button className="text-gray-800 hover:text-gray-600 flex items-center focus:outline-none" onClick={() => setIsAccountOpen(!isAccountOpen)}>
                    {user.name} <FaCaretDown className="ml-1" />
                  </button>
                  {isAccountOpen && (
                    <div className="absolute z-10 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                      {user.isAdmin && (
                        <Link href="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                          Dashboard
                        </Link>
                      )}
                      <Link href="/account" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Account
                      </Link>
                      <Link href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        My orders
                      </Link>

                      <a onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Logout
                      </a>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-800 hover:text-gray-600 flex items-center">
                  <FaUser className="mr-2" /> Login
                </Link>
                <Link href="/register" className="text-gray-800 hover:text-gray-600 flex items-center">
                  <FaUser className="mr-2" /> Register
                </Link>
              </>
            )}

            <Link href="/cart" className="text-gray-800 hover:text-gray-600 flex items-center relative">
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
