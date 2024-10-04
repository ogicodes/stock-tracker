import AssetTable from "@/components/AssetTable/AssetTable";
import { DashboardChart } from "@/components/DashboardChart/DashboardChart";



export default function Assets(): JSX.Element {
  return (
    <main className="flex flex-col bg-[#04040D] text-white pt-6 overflow-y-hidden">
      <div className="ml-6 mb-6">
        <h1 className="text-5xl mb-6">Portfolio</h1>
        <h3 className="text-2xl mb-6">Portfolio Value</h3>
        <div className="flex flex-row mb-4">
          <div className="mr-8">
            <p className="text-xs">Invested Amount</p>
            <p className="text-2xl">$5,000.00</p>
          </div>
          <div>
            <p className="text-xs">Current Value</p>
            <p className="text-2xl">$31,560.98</p>
          </div>
        </div>
        <DashboardChart />
      </div>
      <div className="ml-6">
        <h3 className="text-2xl mb-6">Portfolio Breakdown</h3>
        <AssetTable />
      </div>

    </main>
  );
}
