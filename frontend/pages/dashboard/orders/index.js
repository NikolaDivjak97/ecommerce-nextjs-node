import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/common/Table";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { withAdmin } from "@/utils/withAdmin";
import { ToastContainer, toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getServerSideProps = withAdmin(OrdersSideProps);

export async function OrdersSideProps({ req, query }) {
  const { page = 1, pageSize = 10, message = null } = query;
  const res = await fetch(`${API_URL}/api/orders/table?page=${page}&pageSize=${pageSize}`, {
    headers: { Cookie: req.headers.cookie || "" },
  });

  const orders = await res.json();

  return {
    props: { orders, page: parseInt(page), pageSize: parseInt(pageSize), message },
  };
}

export default function Orders({ orders, page, pageSize, message }) {
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
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      <Table columns={orders.columns} data={orders.orders} editRoute={"/dashboard/orders/edit"} currentPage={page} pageSize={pageSize} total={orders.total} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} />
      <ToastContainer />
    </div>
  );
}

Orders.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
