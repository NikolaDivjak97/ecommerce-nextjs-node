import { FiPlus, FiMinus, FiTrash } from "react-icons/fi";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServerSideProps(context) {
  const res = await fetch(`${API_URL}/api/cart/items`, {
    headers: { Cookie: context.req.headers.cookie || "" },
  });

  if (!res.ok) {
    return { props: { cartProducts: [], fromLocalStorage: true } };
  }

  const { cartProducts } = await res.json();

  return { props: { cartProducts, fromLocalStorage: false } };
}

export default function CartPage({ cartProducts, fromLocalStorage }) {
  const router = useRouter();

  const [cartItems, setCartItems] = useState(cartProducts);

  useEffect(() => {
    if (fromLocalStorage) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(cart);
    }
  }, [fromLocalStorage]);

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) return;

    const res = await fetch(`${API_URL}/api/cart/items/update-quantity`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId, quantity }),
    });

    const updatedCart = cartItems.map((item) => (item.id === productId ? { ...item, quantity } : item));

    if (!res.ok) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    setCartItems(updatedCart);
  };

  const removeItem = async (productId) => {
    if (!confirm("Are you sure you want to remove this product from cart?")) return;

    const res = await fetch(`${API_URL}/api/cart/items/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId }),
    });

    const updatedCart = cartItems.filter((item) => item.id !== productId);

    if (!res.ok) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    setCartItems(updatedCart);
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">
          Your cart is empty.{" "}
          <Link href="/shop" className="text-blue-600 hover:underline">
            Go to shop
          </Link>
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border p-4 rounded-lg shadow-sm">
                <img src={API_URL + item.main_image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />

                <div className="flex-1 px-4">
                  <p className="text-lg font-medium">{item.name}</p>
                </div>

                <div className="flex items-center border rounded-lg">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-gray-600 hover:text-black disabled:opacity-50" disabled={item.quantity <= 1}>
                    <FiMinus size={18} />
                  </button>
                  <span className="px-4 py-2 text-lg">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-gray-600 hover:text-black">
                    <FiPlus size={18} />
                  </button>
                </div>

                <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 p-2">
                  <FiTrash size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-right">
            <Link href="/checkout" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
