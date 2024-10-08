"use client"

import { Line, LineChart } from "recharts"

import {
    ChartConfig,
    ChartContainer,
  } from "@/components/ui/chart"

import truncateText from "@/utils/truncate"
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import PaymentCard from "../paymentCard/PaymentCard";

import { useToast } from "@/hooks/use-toast";

import { useState, useEffect } from "react";

import getUserId from "@/actions/sessionActions";

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
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<StockData | null>(null);
  const { toast } = useToast();
  const [amount, setAmount] = useState("")
  const [formattedAmount, setFormattedAmount] = useState("")

  function handleSheetOpen(transaction: boolean, data: StockData) {
    setSheetOpen(true);
    setSelectedAsset(data);
  }

  const formatAmount = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, "")
    
    // Convert to a number and format with 2 decimal places
    const formatted = (parseFloat(digits) / 100).toFixed(2)
    
    // Add thousand separators
    return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  useEffect(() => {
    if (amount) {
      setFormattedAmount(formatAmount(amount))
    } else {
      setFormattedAmount("")
    }
  }, [amount])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }
  
  async function handlePurchase(stock: StockData) {
    try {
      const userId = await getUserId()
      const res = await fetch(`/api/transactions/`, {method: 'POST', body: JSON.stringify({userId: parseInt(userId), stockId: stock.symbolName , stockPrice: stock.c, amount: parseFloat(formattedAmount) }),})
      if (!res.ok) {
        throw new Error("An error occurred. Please try again.")
      } else {
      setSheetOpen(false);
      toast({
        title: "Congratulations!",
        description: `You've purchased ${selectedAsset?.companyName} stocks!`,
      });
    }
    } 
  catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
      });
    }
  }
  return (
    <>
    <article onClick={() => handleSheetOpen(true, stock)} className="flex flex-row justify-between p-3 w-[226px] h-[95px] rounded-md bg-[#121533] cursor-pointer text-white mb-6 mr-6">
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
    <Sheet onOpenChange={setSheetOpen} open={sheetOpen}>
        <SheetContent className="w-[1000px] bg-[#04040D] text-white border-[#212121]">
          <div className="text-5xl my-8">Purchase</div>
              <div className="border-b-2 border-[#212121]">
              <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-2xl text-gray-500">$</span>
              </div>
              <input
                type="text"
                value={formattedAmount}
                onChange={handleAmountChange}
                className="w-full my-10 px-4 py-4 text-3xl font-bold text-left bg-transparent rounded-lg pl-9 focus:outline-none"
                placeholder="0.00"
                aria-label="Currency amount input"
              />
            </div>            
            <Button
              onClick={() => handlePurchase(stock)}
              className="text-[#616FFF] w-full mb-8"
              variant="default"
            >
              Purchase
            </Button>
          </div>
          <div>
            <PaymentCard />
          </div>
          <Button
            onClick={() => setSheetOpen(false)}
            className=" mb-8 fixed bottom-0 right-0 mr-6"
            variant="destructive"
          >
            Cancel order
          </Button>
        </SheetContent>
      </Sheet>
    </>
  );
}
