"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function NavBar(): JSX.Element {
    const [search, setSearch] = useState("");
    const pathname = usePathname();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        console.log(search);
    };

    function resolvePathname(pathname: string): string {
        if (pathname === "/dashboard") return "Home";
        if (pathname === "/dashboard/assets") return "My Assets";
        if (pathname === "/dashboard/transactions") return "Transactions";
        if (pathname === "/dashboard/explore") return "Explore";
        return "Page Not Found";
    }

  return (
    <header className="flex flex-row justify-between items-center bg-[#04040D] text-white pt-10 pb-4 border-b-2 border-[#212121]">
      <h2 className="text-3xl ml-4">{resolvePathname(pathname)}</h2>
      <div className="flex flex-row items-center">
        <div className="relative">
        <Search size={20} className="absolute ml-2 mt-2"/>
        <Input className="pl-8" type="text" placeholder='Search' onChange={handleSearch} value={search} />
        </div>
        <Avatar className="mx-4">
          <AvatarImage src="https://glory.pinkyellow.network/cache/containers/files/pereira-avatar.png/a4fe211f02afd65ceddd20449604fce1/pereira-avatar.webp" />
          <AvatarFallback>OD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
