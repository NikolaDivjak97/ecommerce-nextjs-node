import { useState } from "react";
import DashboardLayout from "@/components/dashboard/Layout";
import Select from "react-select";
import { withAdmin } from "@/utils/withAdmin";

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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categories = selectedCategories.map((category) => category.value);

    setIsSubmitting(true);
    setErrors(null);
    setSuccess(false);

    try {
      const response = await fetch(`${API_URL}/api/products/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          stock,
          price,
          categories,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        setErrors(data.errors);
      }
    } catch (err) {
      setErrors(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-5">New product</h1>
      {success && <p style={{ color: "green" }}>Product created successfully!</p>}
      <form onSubmit={handleSubmit} className="w-100 mx-auto">
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input type="text" id="name" onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {errors?.name && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.name}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea id="description" rows="5" onChange={(e) => setDescription(e.target.value)} className="block p-2.5 w-full resize-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
          {errors?.description && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.description}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Price
          </label>
          <input type="number" id="price" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {errors?.price && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.price}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Stock
          </label>
          <input type="number" id="stock" value={stock} onChange={(e) => setStock(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {errors?.stock && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.stock}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Categories
          </label>
          <Select options={categories} isMulti={true} onChange={setSelectedCategories} />
          {errors?.categories && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.categories}</p>}
        </div>

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
