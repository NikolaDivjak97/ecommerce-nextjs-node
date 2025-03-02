import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/dashboard/Layout";
import Select from "react-select";
import { withAdmin } from "@/utils/withAdmin";
import { ToastContainer, toast } from "react-toastify";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiPlusCircle } from "react-icons/fi";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getServerSideProps = withAdmin(editProductSideProps);

export async function editProductSideProps(context) {
  const { id } = context.params;

  const res = await fetch(`${API_URL}/api/products/edit/${id}`);
  const { product, categories } = await res.json();

  return {
    props: { product, categories },
  };
}

export default function EditProduct({ product, categories }) {
  const [activeTab, setActiveTab] = useState("info");
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleImageClick = () => {
    setIsFullscreen(!isFullscreen);
  };
  const router = useRouter();

  useEffect(() => {
    setUpdatedProduct(product);
    setSelectedCategories(
      product.Categories.map((category) => {
        return { value: category.id, label: category.name };
      })
    );
    setSelectedImages(
      product.images.map((image) => {
        return { id: image.id, path: image.path };
      })
    );
  }, []);

  const updateProduct = async (e) => {
    e.preventDefault();

    const id = product.id;
    const categories = selectedCategories.map((category) => category.value);

    try {
      const res = await fetch(`${API_URL}/api/products/update/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: updatedProduct.name, description: updatedProduct.description, stock: updatedProduct.stock, price: updatedProduct.price, categories }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "An error occurred.");

      showSuccessMessage("Product updated successfully.");
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteProduct = async (e) => {
    e.preventDefault();

    if (!confirm("Are you sure you want to delete this product?")) return;

    const id = product.id;

    try {
      const res = await fetch(`${API_URL}/api/products/delete/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "An error occurred.");

      router.push({
        pathname: "/dashboard/products",
        query: { message: "Product deleted successfully." },
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const addImage = async (e) => {
    const image = e.target.files[0];

    try {
      const formData = new FormData();

      formData.append("productId", product.id);
      formData.append("image", image);

      const response = await fetch(`${API_URL}/api/images/store`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      console.log(data);

      setSelectedImages([...selectedImages, { id: data.id, path: data.path }]);

      showSuccessMessage("Image added successfully.");
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteImage = async (id) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`${API_URL}/api/images/delete/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "An error occurred.");

      setSelectedImages(selectedImages.filter((image) => image.id != id));

      showSuccessMessage("Image deleted successfully.");
    } catch (err) {
      setError(err.message);
    }
  };

  const showSuccessMessage = (message) => {
    toast.success(message, {
      position: "top-right",
    });
  };

  if (!updatedProduct) return <p>Product not found.</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Product: {product.name}</h1>
        <a onClick={(e) => deleteProduct(e)} className="px-3 py-2 cursor-pointer bg-red-500 text-white rounded-lg inline-flex items-center justify-center">
          <RiDeleteBin6Fill className="mr-2" /> Delete product
        </a>
      </div>

      <div className="flex space-x-4 border-b border-gray-200">
        <button className={`py-2 px-4 text-sm font-medium ${activeTab === "info" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-500 hover:text-gray-700"} focus:outline-none`} onClick={() => setActiveTab("info")}>
          Product Information
        </button>
        <button className={`py-2 px-4 text-sm font-medium ${activeTab === "images" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-500 hover:text-gray-700"} focus:outline-none`} onClick={() => setActiveTab("images")}>
          Images
        </button>
      </div>

      <div className="mt-6">
        {activeTab === "info" && (
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input type="text" id="name" name="name" value={updatedProduct.name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea id="description" name="description" value={updatedProduct.description} onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })} rows="5" className="mt-1 block w-full resize-none px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input type="number" id="price" name="price" value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input type="number" id="stock" name="stock" value={updatedProduct.stock} onChange={(e) => setUpdatedProduct({ ...updatedProduct, stock: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
                Categories
              </label>
              <Select id="categories" name="categories" options={categories} isMulti={true} value={selectedCategories} onChange={setSelectedCategories} />
            </div>

            <div>
              <button type="submit" onClick={(e) => updateProduct(e)} className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Save Changes
              </button>
            </div>
          </form>
        )}

        {activeTab === "images" && (
          <div className="grid grid-cols-4 gap-4">
            {selectedImages &&
              selectedImages.map((img, index) => (
                <div key={index} className="relative">
                  <img src={API_URL + img.path} alt={`Image ${index}`} className="w-full h-32 object-cover rounded-lg shadow-sm cursor-pointer" onClick={handleImageClick} />{" "}
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      deleteImage(img.id);
                    }}
                    className="mt-2 w-full cursor-pointer bg-red-500 text-white py-1 rounded-lg inline-flex items-center justify-center"
                  >
                    <RiDeleteBin6Fill className="mr-2" />
                    Delete
                  </a>
                  {isFullscreen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm" onClick={handleImageClick}>
                      <div className="max-h-[80vh] w-auto">
                        <img src={API_URL + img.path} alt={`Image ${index}`} className="w-auto h-full object-contain" />
                      </div>
                    </div>
                  )}
                </div>
              ))}

            <input type="file" accept="image/*" onChange={(e) => addImage(e)} className="hidden" id="add-image" />

            <div className="bg-gray-100 h-32 rounded-lg">
              <label htmlFor="add-image" className="w-full h-full cursor-pointer flex items-center justify-center ">
                <FiPlusCircle className="mr-2" size={24} /> Add image
              </label>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

EditProduct.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
