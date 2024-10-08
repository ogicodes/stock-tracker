import AssetTable from "@/components/AssetTable/AssetTable";
import { DashboardChart } from "@/components/DashboardChart/DashboardChart";
import { cookies } from "next/headers";
import * as jose from "jose";
import db from "@/lib/db";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export default async function Assets() {
  const token = cookies().get("token")?.value;


  const { payload } = await jose.jwtVerify(token!, secret, {});
  const { id } = payload as { id: string };
  const transactions = await db.transactions.groupBy({
    by: ['stockId'],
    _sum: {
      price: true,
    },
    having: {
      price: {
        _sum: {
          gt: 0,
        },
      },
    },
  });

  const stockIds = transactions.map(transaction => transaction.stockId);
  console.log(stockIds);

  const stocks = await db.stocks.findMany({
    where: {
      userId: parseInt(id),
      id: {
        in: stockIds,
      },
    },
  });
  
  console.log(stocks);

  let currentValue = 0;

  for (const stock of stocks) {
    currentValue += stock.price;
  }

  return (
    <main className="flex flex-col bg-[#04040D] text-white pt-6 overflow-y-hidden w-[85%]">
      <div className="ml-6 mb-6">
        <h1 className="text-5xl mb-6">Portfolio</h1>
        <h3 className="text-2xl mb-6">Portfolio Value</h3>
        <div className="flex flex-row mb-4">
          <div className="mr-8">
            <p className="text-xs">Invested Amount</p>
            <p className="text-2xl">${currentValue}</p>
          </div>
          <div>
            <p className="text-xs">Current Value</p>
            <p className="text-2xl">${currentValue}</p>
          </div>
        </div>
        <DashboardChart />
      </div>
      <div className="ml-6">
        <h3 className="text-2xl mb-6">Portfolio Breakdown</h3>
        <AssetTable stocks={stocks} />
      </div>

    </main>
  );
}
