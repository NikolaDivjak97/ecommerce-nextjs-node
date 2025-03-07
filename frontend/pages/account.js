import { withAuth } from "@/utils/withAuth";
import { useAuth } from "@/context/authContext";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { showSuccessMessage, showErrorMessage } from "@/utils/toastMessages";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/router";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getServerSideProps = withAuth();

export default function Account() {
  const router = useRouter();
  const { user, setUser } = useAuth();

  // Update account
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Change password
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Delete account
  const [deletePassword, setDeletePassword] = useState("");
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAddress(user.address || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const updateAccountInfo = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrors([]);

    try {
      const response = await fetch(`${API_URL}/api/users/account/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, address, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors);
        throw new Error("Something went wrong.");
      }

      showSuccessMessage(data.message);
    } catch (err) {
      showErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    setIsUpdatingPassword(true);
    setErrors([]);

    try {
      const response = await fetch(`${API_URL}/api/users/account/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors);
        throw new Error("Something went wrong.");
      }

      showSuccessMessage(data.message);
    } catch (err) {
      showErrorMessage(err.message);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const deleteAccount = async (e) => {
    e.preventDefault();

    if (!confirm("Are you sure you want to delete your account?")) return;

    setIsDeleting(true);
    setErrors([]);

    try {
      const response = await fetch(`${API_URL}/api/users/account/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password: deletePassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors);
        throw new Error("Something went wrong.");
      }
      setUser(null);
      router.push("/");
    } catch (err) {
      showErrorMessage(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mb-10 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Account Information</h2>
        </div>
        <form onSubmit={updateAccountInfo} className="px-6 py-4" noValidate="novalidate">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" />
            {errors?.name && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="john.doe@example.com" />
            {errors?.email && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="123 Main St" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="tel" placeholder="+1 (555) 555-5555" />
          </div>
          <div className="flex items-center justify-between">
            <button disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {isSubmitting ? "Submitting..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-2xl mb-10 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Change password</h2>
        </div>
        <form onSubmit={updatePassword} className="px-6 py-4" noValidate="novalidate">
          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Old Password
            </label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors?.password && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="new-password" className="block text-gray-700 text-sm font-bold mb-2">
              New Password
            </label>
            <div className="relative">
              <input type={showNewPassword ? "text" : "password"} id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500" onClick={() => setShowNewPassword(!showNewPassword)}>
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors?.newPassword && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.newPassword}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button disabled={isUpdatingPassword} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {isUpdatingPassword ? "Submitting..." : "Save new password"}
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-2xl mb-10 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Delete account</h2>
        </div>
        <form onSubmit={deleteAccount} className="px-6 py-4" noValidate="novalidate">
          <div className="mb-5">
            <label htmlFor="delete-password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <input type={showDeletePassword ? "text" : "password"} id="delete-password" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500" onClick={() => setShowDeletePassword(!showDeletePassword)}>
                {showDeletePassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors?.deletePassword && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.deletePassword}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button disabled={isDeleting} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {isDeleting ? "Submitting..." : "Delete account"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
