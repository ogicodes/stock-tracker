"use client";

import { Origami, ChartPie, ReceiptText, Compass, House, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation";

interface Url {
    href: string;
    icon: JSX.Element;
    text: string;
}


const urls:Url[] = [
    { href: '/', icon: <House />, text: 'Dashboard' },
    { href: '/assets', icon: <ChartPie />, text: 'My Assets' },
    { href: '/transactions', icon: <ReceiptText />, text: 'Transactions' },
    { href: '/Explore', icon: <Compass />, text: 'Explore' },
]

export default function Sidebar(): JSX.Element {
    const router = useRouter();
    const pathname = usePathname();

    function navigate(href: string): void {
        router.push(href);
    }
    return (
        <aside className="flex flex-col w-64 h-screen bg-[#04040D] text-white pt-10 border-r-2 border-[#212121]">
        <div className="flex flex-row justify-start items-center gap-2 px-10">
        <Origami size={22} />
        <h1 className="text-2xl font-medium text-center tracking-tight">Stocks</h1>
        </div>
        <nav className="flex flex-col justify-between h-full mt-10">
        <div className="px-10">
        {urls.map((url, index) => (
            <Button
            key={index}
            className="flex flex-row items-center justify-start w-full h-12 text-md font-medium mb-4"
            onClick={() => navigate(url.href)}
            variant={pathname === url.href ? "default" : "ghost"}
            >
            {url.icon}
            <span className="pl-2">{url.text}</span>
            </Button>
        ))}
        </div>
        <div className="border-t-2 border-[#212121]">
        <Button onClick={() => navigate("/landing")} className="flex flex-row items-center justify-start w-full h-12 text-lg font-medium" variant="link"><DoorOpen className="mr-2"/>Log Out</Button>
        </div>
        </nav>
        </aside>
    );
}