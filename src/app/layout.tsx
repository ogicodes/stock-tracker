import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/SideBar/Sidebar";
import NavBar from "@/components/NavBar/NavBar";
import { inter } from "@/utils/fonts";

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
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex flex-row">
          <Sidebar />
          <div className="flex flex-col">
            <NavBar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
