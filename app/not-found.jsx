import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 text-center bg-gradient-to-b from-[#f8fafc] to-white">
      <div className="max-w-lg w-full p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-7xl font-extrabold gradient-title mb-2">404</h1>
        <h2 className="text-2xl font-bold mb-3 text-gray-900">Page Not Found</h2>
        <p className="text-gray-600 mb-6 text-base">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.<br />
          <span className="font-semibold text-cyan-700">Veylo</span> is your trusted vehicle marketplace for smart car buying and test drives.
        </p>
        <p className="text-gray-500 mb-8 text-sm">
          Discover thousands of verified cars, seamless test drive booking, and a secure, AI-powered experience—only on <span className="font-semibold text-cyan-700">Veylo</span>.
        </p>
        <Link href="/">
          <Button className="bg-gradient-to-r from-[#2af598] to-[#009efd] text-white font-semibold px-8 cursor-pointer py-3 text-lg shadow-md hover:from-gray-900 hover:to-gray-700 transition">
            Return to Veylo Home
          </Button>
        </Link>
      </div>
    </div>
  );
}