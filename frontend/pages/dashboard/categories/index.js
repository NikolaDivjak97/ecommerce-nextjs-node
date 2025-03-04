import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/common/Table";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { withAdmin } from "@/utils/withAdmin";
import { ToastContainer, toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getServerSideProps = withAdmin(CategoriesSideProps);

export async function CategoriesSideProps({ req, query }) {
  const { page = 1, pageSize = 10, message = null } = query;
  const res = await fetch(`${API_URL}/api/categories/table?page=${page}&pageSize=${pageSize}`, {
    headers: { Cookie: req.headers.cookie || "" },
  });

  const categories = await res.json();

  return {
    props: { categories, page: parseInt(page), pageSize: parseInt(pageSize), message },
  };
}

export default function Categories({ categories, page, pageSize, message }) {
  const router = useRouter();

  const handlePageChange = (newPage) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  const handlePageSizeChange = (newPageSize) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, pageSize: newPageSize, page: 1 },
    });
  };

  useEffect(() => {
    const showToastMessage = () => {
      if (message) {
        toast.success(message, {
          position: "top-right",
        });
      }
    };

    showToastMessage();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link href="/dashboard/categories/create" className="inline-flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          <FiPlus className="mr-2" size={24} /> Add category
        </Link>
      </div>

      <Table columns={categories.columns} data={categories.categories} editRoute={"/dashboard/categories/edit"} currentPage={page} pageSize={pageSize} total={categories.total} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} />
      <ToastContainer />
    </div>
  );
}

Categories.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
