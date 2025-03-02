import { useState } from "react";
import DashboardLayout from "@/components/dashboard/Layout";
import Select from "react-select";
import { withAdmin } from "@/utils/withAdmin";
import { useRouter } from "next/router";

export const getServerSideProps = withAdmin(CreateProductSideProps);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function CreateProductSideProps() {
  const res = await fetch(`${API_URL}/api/categories/select`);
  const categories = await res.json();

  return {
    props: { categories },
  };
}

export default function CreateProduct({ categories }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
    setPreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrors(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("stock", stock);
      formData.append("price", price);

      selectedCategories.forEach((category) => {
        formData.append("categories", category.value);
      });

      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await fetch(`${API_URL}/api/products/store`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors);
        throw new Error("Something went wrong.");
      }

      router.push({
        pathname: "/dashboard/products",
        query: { message: "Product created successfully." },
      });
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl mb-5">New product</h1>
      <form onSubmit={handleSubmit} className="w-100 mx-auto">
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input type="text" id="name" onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          {errors?.name && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.name}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea id="description" rows="5" onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full resize-none px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
          {errors?.description && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.description}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input type="number" id="price" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          {errors?.price && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.price}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input type="number" id="stock" value={stock} onChange={(e) => setStock(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          {errors?.stock && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.stock}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
            Categories
          </label>
          <Select options={categories} isMulti={true} onChange={setSelectedCategories} />
          {errors?.categories && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.categories}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="images" class="block text-sm font-medium text-gray-700">
            Product images
          </label>
          <input id="images" type="file" multiple onChange={handleFileChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>

        {previews && (
          <div className="mb-3 flex gap-3">
            {previews.map((preview, idx) => (
              <img key={idx} src={preview} alt="Preview" style={{ width: "100px" }} />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "10px 20px",
            backgroundColor: isSubmitting ? "#ccc" : "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isSubmitting ? "Submitting..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

CreateProduct.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
