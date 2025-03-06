import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/Layout";
import { withAdmin } from "@/utils/withAdmin";
import { useRouter } from "next/router";
import Select from "react-select";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getServerSideProps = withAdmin(editUserSideProps);

export async function editUserSideProps(context) {
  const { id } = context.params;

  const res = await fetch(`${API_URL}/api/users/${id}`, {
    headers: { Cookie: context.req.headers.cookie || "" },
  });

  if (!res.ok) {
    return {
      redirect: {
        destination: "/dashboard/users",
        permanent: false,
      },
    };
  }

  const { user } = await res.json();

  return {
    props: { user },
  };
}

export default function EditUser({ authUser, user }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [admin, setIsAdmin] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  const adminOptions = [
    { value: "0", label: "No" },
    { value: "1", label: "Yes" },
  ];

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setIsAdmin({ value: user.isAdmin, label: user.isAdmin ? "Yes" : "No" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.id === authUser.id) {
      showErrorMessage("Cannot update your profile here!");
      return;
    }

    setIsSubmitting(true);
    setErrors(null);

    const isAdmin = admin?.value || false;

    try {
      const response = await fetch(`${API_URL}/api/users/update/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password, isAdmin }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors);
        throw new Error("Something went wrong.");
      }

      showSuccessMessage("User updated successfully.");
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteUser = async (e) => {
    e.preventDefault();

    if (!confirm("Are you sure you want to delete this user?")) return;

    const id = user.id;

    if (user.id === authUser.id) {
      showErrorMessage("Cannot delete your profile!");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/users/delete/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "An error occurred.");

      router.push({
        pathname: "/dashboard/users",
        query: { message: "User deleted successfully." },
      });
    } catch (err) {
      showErrorMessage(err.message);
    }
  };

  const showSuccessMessage = (message) => {
    toast.success(message, {
      position: "top-right",
    });
  };

  const showErrorMessage = (message) => {
    toast.error(message, {
      position: "top-right",
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit User: {user.name}</h1>
        <a onClick={(e) => deleteUser(e)} className="px-3 py-2 cursor-pointer bg-red-500 text-white rounded-lg inline-flex items-center justify-center">
          <RiDeleteBin6Fill className="mr-2" /> Delete user
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          {errors?.email && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} id="password" onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10" />
            <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors?.password && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="admin" className="block text-sm font-medium text-gray-700">
            Admin
          </label>
          <Select options={adminOptions} value={admin} onChange={setIsAdmin} />
          {errors?.admin && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.admin}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="inline-flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          {isSubmitting ? "Submitting..." : "Save changes"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}

EditUser.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
