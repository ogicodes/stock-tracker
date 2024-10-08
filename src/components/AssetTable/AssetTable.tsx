"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Line, LineChart } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

import { Star } from "lucide-react";
import { useState, useEffect } from "react";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import PaymentCard from "../paymentCard/PaymentCard";
import getUserId from "@/actions/sessionActions";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/hooks/use-toast";

interface Stock {
  id: number,
  name: string,
  price: number,
  userId: number,
}

const graph = [
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
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function AssetTable( {stocks}: {stocks: Stock[]} ): JSX.Element {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [isBuy, setIsBuy] = useState<boolean>(true);
  const [selectedAsset, setSelectedAsset] = useState<Stock | null>(null);
  const { toast } = useToast();
  const [amount, setAmount] = useState("")
  const [formattedAmount, setFormattedAmount] = useState("")

  function handleSheetOpen(transaction: boolean, data: Stock) {
    setSheetOpen(true);
    setIsBuy(transaction);
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

  async function handlePurchase(stock: Stock) {
    try {
      const userId = await getUserId()
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/`, {method: 'POST', body: JSON.stringify({userId: parseInt(userId), stockId: stock.name , stockPrice: stock.price , amount: isBuy ? parseFloat(formattedAmount) : -parseFloat(formattedAmount) }),})
      if (!res.ok) {
        throw new Error("An error occurred. Please try again.")
      } else {
      setSheetOpen(false);
      toast({
        title: "Congratulations!",
        description: `You've ${isBuy ? 'purchased' : 'sold' } ${selectedAsset?.name} stocks!`,
      });
    }
    } 
  catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
      });
      console.error(error);
    }
  }


  return (
    <>
      <Table>
        <TableBody>
          {stocks.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>
                {" "}
                <ChartContainer className="w-[25%] h-full" config={chartConfig}>
                  <LineChart
                    data={graph}
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
              </TableCell>
              <TableCell>updown</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleSheetOpen(true, item)}
                  className="text-[#616FFF]"
                  variant="link"
                >
                  Buy
                </Button>
                <Button
                  onClick={() => handleSheetOpen(false, item)}
                  className="text-white"
                  variant="link"
                >
                  Sell
                </Button>
              </TableCell>
              <TableCell>
                <Button className="text-[#616FFF]" variant="link">
                  <Star />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Sheet onOpenChange={setSheetOpen} open={sheetOpen}>
        <SheetContent className="w-[1000px] bg-[#04040D] text-white border-[#212121]">
          <div className="text-5xl my-8">{isBuy ? 'Purchase' : "Sell"}</div>
            <div className="flex flex-row rounded-full m-1 justify-between items-center">
              <div>
                <Button
                  onClick={() => setIsBuy(true)}
                  className="rounded-r-none"
                  variant={isBuy ? "secondary" : "ghost"}
                >
                  Buy
                </Button>
                <Button
                  onClick={() => setIsBuy(false)}
                  className="rounded-l-none"
                  variant={isBuy ? "ghost" : "secondary"}
                >
                  Sell
                </Button>
              </div>
              <Select>
              <SelectTrigger className="w-[110px] rounded-full">
                <SelectValue placeholder="One-time" />
              </SelectTrigger>
              <SelectContent className="w-[100px] rounded-full">
                <SelectItem value="light">One-time</SelectItem>
              </SelectContent>
              </Select>
            </div>
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
              onClick={() => {
                handlePurchase(selectedAsset!)
              }}
              className="text-[#616FFF] w-full mb-8"
              variant="default"
            >
              {isBuy? 'Purchase': 'Sell'}
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
