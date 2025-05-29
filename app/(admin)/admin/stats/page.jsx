import VeyloStats from "./_components/veylo-stats";
import { getDashboardData } from "@/actions/admin";

const metadata = {
  title: "Veylo | Admin Stats",
  description: "View statistics and analytics in Veylo Admin Dashboard",
};

export default async function StatsPage() {
  const stats = await getDashboardData();
  if (!stats || !stats.success) {
    return <div className="p-8 text-red-500">Failed to load stats.</div>;
  }
  const { cars, testDrives } = stats.data;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Stats</h1>
      <VeyloStats cars={cars} testDrives={testDrives} />
    </div>
  );
}
