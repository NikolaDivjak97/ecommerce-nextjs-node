import DashboardLayout from "@/components/dashboard/Layout";
import { useAuth } from '@/context/authContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      <p>Welcome to the admin panel! {user?.name}</p>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
