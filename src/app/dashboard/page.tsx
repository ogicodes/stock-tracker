import { DashboardChart } from "@/components/DashboardChart/DashboardChart";
import StockCard from "@/components/StockCard/StockCard";
import Footer from "@/components/Footer/Footer";

export default async function Home() {
  const api_key = process.env.FINHUB_API_KEY;

  // api call to get all of the companies in the us stock exchange
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${api_key}`,
    { method: "GET" }
  );
  const data = await response.json();

  let stockDetails = [];

  // api call to get the stock details of the first 20 companies
  for (let i = 0; i < 10; i++) {
    const symbol = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${data[i].symbol}&token=${api_key}`,
      { method: "GET" }
    );
    const symbolData = await symbol.json();

      const formatedSymbolData = {
        ...symbolData,
        symbolName: data[i].symbol,
        companyName: data[i].description,
      };
      stockDetails.push(formatedSymbolData);

  }


  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return (
    <main className="flex flex-col bg-[#04040D] text-white pt-6 overflow-y-hidden">
      <section className=" pl-6 border-b-2 border-[#212121]">
        <h1 className="text-5xl mb-6">Good Afternoon, Ogi</h1>
        <div className="pl-2">
          <h3 className="text-2xl mb-6">Top Movers Today</h3>
          <div className="flex flex-row overflow-x-scroll w-[85%]">
            {stockDetails.map((stock) => (
              <StockCard key={stock.symbolName} stock={stock} />
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-row pl-6 border-b-2 border-[#212121] w-[85%]">
        <div className="flex flex-col w-full h-full pb-6">
          <h3 className="text-2xl my-6">Watchlist</h3>
          <section className="bg-[#121533] rounded-lg">
            <DashboardChart />
          </section>
        </div>
        <div>
          <div className="flex flex-col mt-24 ml-6">
            {stockDetails.slice(0, 4).map((stock) => (
              <StockCard key={stock.symbolName} stock={stock} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
