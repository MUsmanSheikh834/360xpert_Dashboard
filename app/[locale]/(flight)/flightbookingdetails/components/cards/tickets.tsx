"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function Tickets() {
  const { ticket } = useSelector((state: RootState) => state.flightBookingDetail);

  if (!ticket) return null;

  return (
    <div className="px-6 pb-6">
      <Card className="border border-gray-100 rounded-xl shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-base font-bold text-[#0A3D6B]">
              {ticket.from} ({ticket.fromCode}) - {ticket.to} ({ticket.toCode})
            </h2>
            <span className="bg-[#00C6B0] text-white text-[10px] font-semibold px-3 py-0.5 rounded-full">
              {ticket.class}
            </span>
          </div>

          {ticket.flights.map((f, i) => (
            <div key={i} className="border border-gray-100 rounded-lg mb-3 last:mb-0">
              <div className="grid grid-cols-8 gap-3 items-center px-4 py-3">
                {/* Airline logo + name */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100">
                    <img
                      src={f.airlineLogo}
                      alt={f.airline}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    {f.airline.split(" ").map((word, wi) => (
                      <p
                        key={wi}
                        className="text-xs font-bold text-gray-800 leading-tight uppercase"
                      >
                        {word}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Departure */}
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    {f.departureCode} {f.departureTime}
                  </p>
                  <p className="text-xs text-gray-400">{f.departureAirline}</p>
                </div>

                {/* Stops */}
                <div>
                  <p className="text-sm font-bold text-gray-800">{f.stops} Stop</p>
                  <p className="text-xs text-gray-400">{f.stopRoute}</p>
                </div>

                {/* Duration */}
                <div>
                  <p className="text-sm font-bold text-gray-800">{f.duration}</p>
                  <p className="text-xs text-gray-400">{f.durationRoute}</p>
                </div>

                {/* Arrival */}
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    {f.arrivalCode} {f.arrivalTime}
                  </p>
                  <p className="text-xs text-gray-400">{f.arrivalAirline}</p>
                </div>

                {/* PNR */}
                <div>
                  <p className="text-sm font-bold text-gray-800">PNR</p>
                  <p className="text-xs text-gray-400">{f.pnr}</p>
                </div>

                {/* Baggage */}
                <div className="col-span-2">
                  <p className="text-sm font-bold text-gray-800">Checked Baggage</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <svg
                      className="h-3.5 w-3.5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="6" y="7" width="12" height="14" rx="2" />
                      <path d="M9 7V5a3 3 0 016 0v2" />
                      <line x1="12" y1="11" x2="12" y2="17" />
                      <line x1="9" y1="14" x2="15" y2="14" />
                    </svg>
                    <p className="text-xs text-gray-400">{f.baggage}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
