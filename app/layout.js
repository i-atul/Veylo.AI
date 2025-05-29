import { Geist } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import { Github } from "lucide-react";

const geist = Geist({
  subsets: ["latin"]
});


export const metadata = {
  title: "Veylo",
  description: "Next-Gen Vehicle Marketplace Powered By AI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geist.className}`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Toaster richColors/>
        <a
          href="https://github.com/i-atul" 
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-black rounded-full shadow-lg p-3 hover:bg-gray-800 transition-colors flex items-center justify-center"
          aria-label="View on GitHub"
        >
          <Github className="text-white" size={32} />
        </a>
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}
