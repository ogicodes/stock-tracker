"use client"

import { Line, LineChart } from "recharts"

import {
    ChartConfig,
    ChartContainer,
  } from "@/components/ui/chart"

import truncateText from "@/utils/truncate"

export const description = "A line chart"

interface StockData {
  c: number | null,
  d: number | null,
  dp: number | null,
  h: number | null,
  l: number | null,
  o: number | null,
  pc: number | null,
  t: number | null,
  symbolName: string,
  companyName: string,
}


const stockData = {
    chartData: [
        { name: "9am", value: 140.86 },
        { name: "9:30", value: 120.86 },
        { name: "10am", value: 170.86 },
        { name: "10:30", value: 120.86 },
        { name: "11am", value: 150.86 },
        { name: "11:30am", value: 120.86 },
        { name: "noon", value: 160.86 },
        { name: "12:30am", value: 120.86 },
        { name: "1pm", value: 190.86 },
        { name: "1:30pm", value: 120.86 },
        { name: "2pm", value: 100.86 },
        { name: "2:30pm", value: 120.86 },
        { name: "3pm", value: 170.86 },
        { name: "3:30pm", value: 120.86 },
        { name: "4pm", value: 145.86 },
        { name: "4:30pm", value: 120.86 },
        { name: "5pm", value: 180.86 },
    ],
};

const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  function setChange(stock: number | null): string {
    if (stock === null) {
      return "yellow";
    }
    else if (stock < 0) {
      return "red";
    }
    else {
      return "green";
    }
  }

export default function StockCard({stock}: { stock: StockData }) {
  return (
    <article className="flex flex-row justify-between p-3 w-[226px] h-[95px] rounded-md bg-[#121533] cursor-pointer text-white mb-6 mr-6">
      <div className="flex flex-col justify-between">
        <h3 className="text-xs">{truncateText(stock.companyName, 10)}</h3>
        <p className="text-xs text-[#BDBDBD]">Value</p>
        <h3 className="text-md">${stock.c}</h3>
      </div>
      <div className="flex flex-col h-full justify-between items-end">
        <h3 className="text-xs">{stock.symbolName}</h3>
        <p className="text-xs" style={{ color: setChange(stock.d)}}>{stock.d}</p>
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
