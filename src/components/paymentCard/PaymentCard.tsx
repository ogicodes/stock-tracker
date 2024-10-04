import { ChevronRight } from "lucide-react";
import visa from "@/svg/visa-pay-logo-svgrepo-com.svg";
import mastercard from "@/svg/mastercard-svgrepo-com.svg";
import amex from "@/svg/american-express-logo-svgrepo-com.svg";
import Image from "next/image";

interface PaymentType {
    type: any;
    lastFourDigits: string;
    limit: string;
    }

const paymentTypes: PaymentType[] = [
    {
        type: visa,
        lastFourDigits: "1234",
        limit: "CA$3000",
    },
    {
        type: mastercard,
        lastFourDigits: "5678",
        limit: "CA$5000",
    },
    {
        type: amex,
        lastFourDigits: "9012",
        limit: "CA$1000",
    },
];

export default function PaymentCard(): JSX.Element {
  return (
    <>
    {paymentTypes.map((paymentType) => (
    <div className="p-4 hover:bg-zinc-900/90 cursor-pointer rounded-sm transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
            <Image src={paymentType.type} alt="payment type" width={40} height={40} />
            <div className="ml-2">
          <h3 className="text-sm font-medium text-white">Pay with</h3>
          <p className="text-xs text-gray-400">{paymentType.lastFourDigits}</p>
          </div>
        </div>
        <div className="relative pr-6">
          <h3 className="text-sm font-medium text-white">{paymentType.limit}</h3>
          <p className="text-xs text-gray-400">Limit</p>
          <ChevronRight size={20} className=" absolute right-0 top-2" />
        </div>
      </div>
    </div>
    ))}
    </>
  );
}
