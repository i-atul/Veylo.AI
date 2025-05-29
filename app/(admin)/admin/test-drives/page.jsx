import { CalendarRange } from "lucide-react";
import { TestDrivesList } from "./_components/test-drive-list";

export const metadata = {
  title: "Test Drives | Veylo Admin",
  description: "Manage test drive bookings",
};

export default function TestDrivesPage() {
  return (
    <div className="p-6">
      
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2"> 
        <CalendarRange className="h-6 w-6"/> 
         Test Drive Schedule
      </h1>
      <TestDrivesList />
    </div>
  );
}