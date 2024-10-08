import Sidebar from "@/components/SideBar/Sidebar";
import NavBar from "@/components/NavBar/NavBar";
import { inter } from "@/utils/fonts";
import { Toaster } from "@/components/ui/toaster"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logoutAction } from "@/actions/auth";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = cookies().get("token");
  if (!cookie) redirect("/");
  return (
    <html lang="en" className="bg-[#04040D]">
      <body className={`${inter.className} antialiased`}>
        <div className="flex flex-row">
          <Sidebar logout={logoutAction} />
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
