"use client"

import { useState, useEffect } from "react"

export function SimpleCurrencyInput() {
  const [amount, setAmount] = useState("")
  const [formattedAmount, setFormattedAmount] = useState("")

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

  return (
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
  )
}