import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/SideBar/Sidebar";
import NavBar from "@/components/NavBar/NavBar";
import { inter } from "@/utils/fonts";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "stocks",
  description: "My Stock Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#04040D]">
      <body className={`${inter.className} antialiased`}>
        <div className="flex flex-row">
          <Sidebar />
          <div className="flex flex-col h-full w-full">
            <NavBar />
            {children}
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
