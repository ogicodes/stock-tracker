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
import { useState } from "react";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import PaymentCard from "../paymentCard/PaymentCard";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/hooks/use-toast";
import { SimpleCurrencyInput } from "../simple-currency-input";

export const description = "A line chart";

interface Graph {
  name: string;
  value: number;
}

interface Asset {
  company: string;
  investedAmount: string;
  graph: Graph[];
  upDown: React.ReactNode;
}

const data: Asset[] = [
  {
    company: "Nvidia",
    investedAmount: "CA$8412.1230",
    graph: [
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
    upDown: "up",
  },
  {
    company: "Nvidia",
    investedAmount: "CA$8412.1230",
    graph: [
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
    upDown: "up",
  },
  {
    company: "Nvidia",
    investedAmount: "CA$8412.1230",
    graph: [
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
    upDown: "up",
  },
  {
    company: "Nvidia",
    investedAmount: "CA$8412.1230",
    graph: [
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
    upDown: "up",
  },
  {
    company: "Nvidia",
    investedAmount: "CA$8412.1230",
    graph: [
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
    upDown: "up",
  },
  {
    company: "Nvidia",
    investedAmount: "CA$8412.1230",
    graph: [
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
    upDown: "up",
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function AssetTable(): JSX.Element {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [isBuy, setIsBuy] = useState<boolean>(true);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const { toast } = useToast();

  function handleSheetOpen(transaction: boolean, data: Asset) {
    setSheetOpen(true);
    setIsBuy(transaction);
    setSelectedAsset(data);
  }

  return (
    <>
      <Table>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.company}</TableCell>
              <TableCell>{item.investedAmount}</TableCell>
              <TableCell>
                {" "}
                <ChartContainer className="w-[25%] h-full" config={chartConfig}>
                  <LineChart
                    data={item.graph}
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
              <TableCell>{item.upDown}</TableCell>
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
          <div className="text-5xl my-8">Purchase</div>
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
            <SimpleCurrencyInput />
            <Button
              onClick={() => {
                setSheetOpen(false);
                toast({
                  title: "Congratulations!",
                  description: `You've ${isBuy? 'purchased': 'sold'} ${selectedAsset?.company} stocks!`,
                });
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
