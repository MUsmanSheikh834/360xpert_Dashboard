"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function formatAmount(amount: number) {
  return Math.abs(amount).toLocaleString();
}

export function PaymentInfo() {
  const { paymentInfo, paymentSummary, status } = useSelector(
    (state: RootState) => state.hotelBookingDetail
  );

  if (!paymentInfo || !paymentSummary) return null;

  return (
    <div className="px-6 pb-6">
      <Card className="border border-gray-100 rounded-xl shadow-sm">
        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-[#0A3D6B]">Payment Information</h2>
            <div className="flex items-center gap-1 border border-green-200 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full cursor-pointer">
              {status}
              <ChevronDown className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-4 px-2 pb-2 border-b border-gray-100">
            {["Name", "Date", "Transaction ID", "Total Payment"].map((col) => (
              <p key={col} className="text-xs text-[#378ADD]">
                {col}
              </p>
            ))}
          </div>

          {/* Table row */}
          <div className="grid grid-cols-4 px-2 py-4 bg-gray-50 rounded-lg mt-2">
            <p className="text-sm font-semibold text-gray-800">{paymentInfo.name}</p>
            <p className="text-sm text-gray-500">{paymentInfo.date}</p>
            <p className="text-sm font-semibold text-gray-800">{paymentInfo.transactionId}</p>
            <p className="text-sm font-semibold text-gray-800">
              {formatAmount(paymentInfo.totalPayment)}
            </p>
          </div>

          {/* Payment Summary */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-[#0A3D6B] mb-4">Payment Summary</h3>
            <div className="space-y-3">
              {[
                { label: "Payment", value: paymentSummary.payment },
                { label: "Subtotal", value: paymentSummary.subtotal },
                { label: "Discount", value: paymentSummary.discount },
                { label: "Taxes", value: paymentSummary.taxes },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-center border-b border-gray-50 pb-3"
                >
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className={`text-sm ${value < 0 ? "text-red-500" : "text-gray-700"}`}>
                    {value < 0 ? `-${formatAmount(value)}` : `${formatAmount(value)}`}
                  </p>
                </div>
              ))}
              <div className="flex justify-between items-center pt-1">
                <p className="text-base font-bold text-gray-800">Received</p>
                <p className="text-base font-bold text-gray-800">
                  {formatAmount(paymentSummary.received)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
