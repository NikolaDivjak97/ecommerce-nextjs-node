import { useState } from "react";
import DashboardLayout from "@/components/dashboard/Layout";
import { withAdmin } from "@/utils/withAdmin";
import { useRouter } from "next/router";

export const getServerSideProps = withAdmin();

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CreateCategory() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [icon, setIcon] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = Array.from(e.target.files);
    setIcon(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrors([]);
    setSuccess(false);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);

      if (icon.length) {
        formData.append("icon", icon[0]);
      }

      const response = await fetch(`${API_URL}/api/categories/store`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors);
        throw new Error("Something went wrong.");
      }

      router.push({
        pathname: "/dashboard/categories",
        query: { message: "Category created successfully." },
      });
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl mb-5">New category</h1>
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
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Icon (Image)
          </label>
          <input id="icon" type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          {errors?.icon && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.icon}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="inline-flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          {isSubmitting ? "Submitting..." : "Create category"}
        </button>
      </form>
    </div>
  );
}

CreateCategory.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
