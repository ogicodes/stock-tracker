"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Transaction {
  icon: string;
  name: string;
  type: string;
  amount: string;
  date: string;
}

const data: Transaction[] = [
  {
    icon: "Apple",
    name: "Apple",
    type: "Bought",
    amount: "-CA$8412.30",
    date: "2024-01-01",
  },
  {
    icon: "Blizard",
    name: "Blizard",
    type: "Sold",
    amount: "+CA$1236.23",
    date: "2024-02-02",
  },
  {
    icon: "Crowdstrike",
    name: "Crowdstrike",
    type: "Bought",
    amount: "-CA$4126.23",
    date: "2024-03-03",
  },
  {
    icon: "Nvidia",
    name: "Nvidia",
    type: "Sold",
    amount: "+CA$3216.12",
    date: "2024-04-04",
  },
  {
    icon: "Tesla",
    name: "Tesla",
    type: "Sold",
    amount: "+CA$4412.00",
    date: "2024-05-05",
  },
];

function getIcon(name: string) {
  switch (name) {
    case "nvidia":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M5.64 5.64h12.73v12.73H5.64z" />
          <path d="M5.64 5.64L12 12l6.36-6.36" />
          <path d="M12 12l-6.36 6.36 12.72-.01L12 12z" />
        </svg>
      );
    case "meta":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "tesla":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Transactions(): JSX.Element {
  const [transactions, setTransactions] = useState<Transaction[]>(data);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction;
    direction: "ascending" | "descending" | null;
  }>({
    key: "date",
    direction: null,
  });

  const sortBy = (key: keyof Transaction) => {
    let direction: "ascending" | "descending" | null = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = null;
    }
    setSortConfig({ key, direction });
    if (direction === null) {
      setTransactions([...data]);
    } else {
      const sortedTransactions = [...transactions].sort((a, b) => {
        if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
        if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
        return 0;
      });
      setTransactions(sortedTransactions);
    }
  };
  const getSortIcon = (key: keyof Transaction) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending")
        return <ChevronUp className="ml-2 h-4 w-4" />;
      if (sortConfig.direction === "descending")
        return <ChevronDown className="ml-2 h-4 w-4" />;
    }
    return <ChevronDown className="ml-2 h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-[#04040D] text-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Activity</h1>
      <div className="flex space-x-4 mb-8">
        {["Type", "Date"].map((filter) => (
          <Button
            key={filter}
            variant="outline"
            className="bg-gray-800 text-gray-300 border-gray-700"
            onClick={() => sortBy(filter.toLowerCase() as keyof Transaction)}
          >
            {filter}
            {getSortIcon(filter.toLowerCase() as keyof Transaction)}
          </Button>
        ))}
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 text-sm text-gray-400 mb-2">
          <div>Details</div>
          <div className="text-right">Amount</div>
          <div className="text-right">Date</div>
        </div>
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="grid grid-cols-3 items-center py-4 border-b border-gray-800"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                {getIcon(transaction.icon)}
              </div>
              <div>
                <div className="font-medium">{transaction.name}</div>
                <div className="text-sm text-gray-400">{transaction.type}</div>
              </div>
            </div>
            <div
              className={`text-right ${
                transaction.amount.startsWith("+")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {transaction.amount}
            </div>
            <div className="text-right text-gray-400">{transaction.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
