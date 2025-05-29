import { Dashboard } from "./_components/dashboard";
import { getDashboardData } from "@/actions/admin";

export const metadata = {
  title: "Veylo | Admin Test Drives",
  description: "Manage Test Drives in Veylo Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const dashboardData = await getDashboardData();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <Dashboard initialData={dashboardData} />
    </div>
  );
}