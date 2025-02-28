import DashboardLayout from "@/components/dashboard/Layout";
import { withAdmin } from "@/utils/withAdmin";

export const getServerSideProps = withAdmin();

export default function Dashboard({ user }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      <p>Welcome to the admin panel! {user.name}</p>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
