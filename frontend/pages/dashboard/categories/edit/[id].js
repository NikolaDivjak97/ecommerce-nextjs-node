import { useState } from "react";
import DashboardLayout from "@/components/dashboard/Layout";
import { withAdmin } from "@/utils/withAdmin";
import { useRouter } from "next/router";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import { showSuccessMessage, showErrorMessage } from "@/utils/toastMessages";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getServerSideProps = withAdmin(editCategorySideProps);

export async function editCategorySideProps(context) {
  const { id } = context.params;

  const res = await fetch(`${API_URL}/api/categories/${id}`);

  if (!res.ok) {
    return {
      redirect: {
        destination: "/dashboard/categories",
        permanent: false,
      },
    };
  }

  const { category } = await res.json();

  return {
    props: { category },
  };
}

export default function EditCategory({ category }) {
  const router = useRouter();

  const [name, setName] = useState(category?.name);
  const [description, setDescription] = useState(category?.description);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrors(null);

    try {
      const response = await fetch(`${API_URL}/api/categories/update/${category.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors);
        throw new Error("Something went wrong.");
      }

      showSuccessMessage("Category updated successfully.");
    } catch (err) {
      showErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteCategory = async (e) => {
    e.preventDefault();

    if (!confirm("Are you sure you want to delete this category?")) return;

    const id = category.id;

    try {
      const res = await fetch(`${API_URL}/api/categories/delete/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "An error occurred.");

      router.push({
        pathname: "/dashboard/categories",
        query: { message: "Category deleted successfully." },
      });
    } catch (err) {
      showErrorMessage(err.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Category: {category?.name}</h1>
        <a onClick={(e) => deleteCategory(e)} className="px-3 py-2 cursor-pointer bg-red-500 text-white rounded-lg inline-flex items-center justify-center">
          <RiDeleteBin6Fill className="mr-2" /> Delete category
        </a>
      </div>
      <form onSubmit={handleSubmit} className="w-100 mx-auto">
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          {errors?.name && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.name}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea id="description" rows="5" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full resize-none px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
          {errors?.description && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.description}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="inline-flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          {isSubmitting ? "Submitting..." : "Save changes"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}

EditCategory.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
