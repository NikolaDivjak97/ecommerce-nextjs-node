import { useAuth } from "@/context/authContext";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { showErrorMessage, showSuccessMessage } from "@/utils/toastMessages";
import { FiPlus, FiMinus } from "react-icons/fi";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServerSideProps(context) {
  const { slug } = context.params;

  const res = await fetch(`${API_URL}/api/products/slug/` + slug);

  if (!res.ok) {
    return { notFound: true };
  }

  const { product } = await res.json();

  if (!product) {
    return { notFound: true };
  }

  return { props: { product } };
}

export default function ProductPage({ product }) {
  const { user, setUser } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const addProductToLocalStorage = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let currentProduct = cart.find((el) => el.id == product.id);

    if (currentProduct) {
      showErrorMessage("Product already in cart.");

      return;
    }

    cart.push({ id: product.id, main_image: product.main_image, name: product.name, quantity });
    localStorage.setItem("cart", JSON.stringify(cart));

    showSuccessMessage("Product added to cart.");
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async (e) => {
    e.preventDefault();

    const productId = product.id;

    if (!user) {
      addProductToLocalStorage();

      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/cart/items/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "An error occurred.");

      showSuccessMessage("Product added to cart successfully.");
    } catch (err) {
      showErrorMessage(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <img src={API_URL + product.main_image} alt={product.name} className="w-full max-w-md rounded-lg shadow-lg" />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-600 mt-2">${product.price}</p>
          <p className={`mt-2 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button onClick={decreaseQuantity} className="p-2 text-gray-600 hover:text-black">
                <FiMinus size={18} />
              </button>
              <span className="px-4 py-2 text-lg">{quantity}</span>
              <button onClick={increaseQuantity} className="p-2 text-gray-600 hover:text-black">
                <FiPlus size={18} />
              </button>
            </div>

            <button onClick={addToCart} className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition" disabled={product.stock === 0}>
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>

      <div className="my-12">
        <div className="flex space-x-4 border-b">
          <button className={`px-4 py-2 ${activeTab === "description" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`} onClick={() => setActiveTab("description")}>
            Description
          </button>
          <button className={`px-4 py-2 ${activeTab === "categories" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`} onClick={() => setActiveTab("categories")}>
            Categories
          </button>
        </div>

        <div className="mt-4">
          {activeTab === "description" && (
            <div>
              <p>{product.description}</p>
            </div>
          )}
          {activeTab === "categories" && (
            <div>
              <ul className="list-disc list-inside">{product.Categories && product.Categories.map((category, index) => <li key={index}>{category.name}</li>)}</ul>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
