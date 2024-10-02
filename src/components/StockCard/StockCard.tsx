"use client"

import { Line, LineChart } from "recharts"

import {
    ChartConfig,
    ChartContainer,
  } from "@/components/ui/chart"

export const description = "A line chart"


const stockData = {
  name: "Apple Inc.",
  symbol: "AAPL",
  currentValue: 145.86,
  currency: "USD",
  change: 0.86,
    chartData: [
        { name: "Jan", value: 140.86 },
        { name: "Feb", value: 170.86 },
        { name: "Mar", value: 150.86 },
        { name: "Apr", value: 160.86 },
        { name: "May", value: 190.86 },
        { name: "Jun", value: 100.86 },
        { name: "Jul", value: 170.86 },
        { name: "Aug", value: 145.86 },
        { name: "Sep", value: 180.86 },
        { name: "Oct", value: 120.86 },
        { name: "Nov", value: 190.86 },
        { name: "Dec", value: 195.86 },
    ],
};

const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

export default function StockCard() {
  return (
    <article className="flex flex-row justify-between p-3 w-[226px] h-[95px] rounded-md bg-[#121533] cursor-pointer text-white mb-6 mr-6">
      <div className="flex flex-col justify-between">
        <h3 className="text-xs">{stockData.name}</h3>
        <p className="text-xs text-[#BDBDBD]">Current Value</p>
        <h3 className="text-md">${stockData.currentValue}</h3>
      </div>
      <div className="flex flex-col h-full justify-between items-end">
        <h3 className="text-xs">{stockData.symbol}</h3>
        <p className="text-xs" style={{ color: stockData.change < 0 ? 'red': 'limegreen' }}>{stockData.change}</p>
        <ChartContainer className="w-[50%] h-full" config={chartConfig}>
          <LineChart
            data={stockData.chartData}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <Line
              dataKey="value"
              type="natural"
              stroke="green"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </article>
  );
}
