"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function ClientInfo() {
  const { leadPassenger, passengers, entryMethod, status } = useSelector(
    (state: RootState) => state.hotelBookingDetail
  );

  if (!leadPassenger) return null;

  return (
    <div className="px-6 pb-6">
      <Card className="border border-gray-100 rounded-xl shadow-sm">
        <CardContent className="p-5">
          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#0A3D6B]">Client Information</h2>
              {entryMethod === "manually" && (
                <span className="bg-[#00C6B0] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                  Manually
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 border border-green-200 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full cursor-pointer">
              {status}
              <svg
                className="h-3 w-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <hr className="border-gray-100 mb-4" />

          {/* Lead Passenger */}
          <div className="grid grid-cols-7 gap-x-4 gap-y-1 py-3 border-b border-gray-50">
            <div>
              <p className="text-xs text-gray-400">Lead Passenger</p>
              <p className="text-sm font-bold text-gray-800">{leadPassenger.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm font-bold text-gray-800">{leadPassenger.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Phone Number</p>
              <p className="text-sm font-bold text-gray-800">{leadPassenger.phoneNumber}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Date Of Birth</p>
              <p className="text-sm font-bold text-gray-800">{leadPassenger.dateOfBirth}</p>
            </div>
            <div className="col-span-1">
              <p className="text-xs text-gray-400">Address/Postal Code</p>
              <p className="text-sm font-bold text-gray-800">{leadPassenger.address}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Country</p>
              <p className="text-sm font-bold text-gray-800">{leadPassenger.country}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Passenger Type</p>
              <p className="text-sm font-bold text-gray-800">{leadPassenger.passengerType}</p>
            </div>
          </div>

          {/* Additional Passengers */}
          {passengers.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-7 gap-x-4 gap-y-1 py-3 border-b border-gray-50 last:border-0"
            >
              <div>
                <p className="text-xs text-gray-400">Passenger {i + 1}</p>
                <p className="text-sm font-bold text-gray-800">{p.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Email Address</p>
                <p className="text-sm font-bold text-gray-800">{p.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Phone Number</p>
                <p className="text-sm font-bold text-gray-800">{p.phoneNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Date Of Birth</p>
                <p className="text-sm font-bold text-gray-800">{p.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Contact Number</p>
                <p className="text-sm font-bold text-gray-800">{p.contactNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Country</p>
                <p className="text-sm font-bold text-gray-800">{p.country}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Passenger Type</p>
                <p className="text-sm font-bold text-gray-800">{p.passengerType}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
