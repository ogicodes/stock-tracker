import { DashboardChart } from "@/components/DashboardChart/DashboardChart";
import StockCard from "@/components/StockCard/StockCard";
import Footer from "@/components/Footer/Footer";
import { MoveLeft, MoveRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col bg-[#04040D] text-white pt-6 overflow-y-hidden">
      <section className=" pl-6 border-b-2 border-[#212121]">
      <h1 className="text-5xl mb-6">Good Afternoon, Ogi</h1>
      <div className="pl-2">
        <h3 className="text-2xl mb-6">Top Movers Today</h3>
        <div className="flex flex-row">
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        </div>
      </div>
      </section>
      <section className="flex flex-row pl-6 border-b-2 border-[#212121]">
        <div className="flex flex-col w-full h-full pb-6">
        <h3 className="text-2xl my-6">Watchlist</h3>
        <DashboardChart />
        </div>
        <div>
          <div className="flex flex-col mt-28 ml-6">
            <StockCard />
            <StockCard />
            <StockCard />
          </div>
        </div>
      </section>
      <Footer />

    </main>
  );
}
