"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";

interface Transaction {
  stock: string;
  price: number;
  date: string;
};


export default function Transactions(): JSX.Element {
  useEffect(() => {
    async function getTransactions() {
      const response = await fetch("/api/transactions/1");
      const data = await response.json();
      setTransactions(data);
    }
    getTransactions();
  }, []);



  const [transactions, setTransactions] = useState<Transaction[]>([]);
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
      setTransactions(transactions);
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

  if (!transactions) return <div>Loading...</div>;
  return (
    <div className="min-h-screen bg-[#04040D] text-gray-100 p-6 w-[85%]">
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
                
              </div>
              <div>
                <div className="font-medium">{transaction.stock}</div>
                <div className="text-sm text-gray-400">{transaction.price > 0 ? "Bought" : "Sold"}</div>
              </div>
            </div>
            <div
              className={`text-right ${
                transaction.price > 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {transaction.price > 0 ? `+${transaction.price}` : `${transaction.price}`}
            </div>
            <div className="text-right text-gray-400">{format(transaction.date, 'MMM do, yyyy')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
