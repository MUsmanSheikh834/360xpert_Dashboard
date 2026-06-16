"use client";

export function BookingDetail() {
  return (
    <div className="px-6 py-5">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h1 className="text-2xl font-bold text-[#0A3D6B]">Booking Details</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Plan Your Next Trip With Ease. Manage Your Bookings. Explore New Flights, And Keep Track
            Of Your Journeys In One Place.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-[#0A3D6B] text-white text-xs font-semibold px-8 py-2 rounded-full hover:opacity-90 whitespace-nowrap">
            Upload Ticket
          </button>
          <button className="bg-[#00C6B0] text-white text-xs font-semibold px-8 py-2 rounded-full hover:opacity-90 whitespace-nowrap">
            Preview Send Mail
          </button>
          <button className="bg-gray-100 border border-gray-200 text-gray-400 text-xs font-semibold px-8 py-2 rounded-full hover:bg-gray-200 whitespace-nowrap">
            Send Email
          </button>
        </div>
      </div>
      <hr className="border-gray-100 mt-4" />
    </div>
  );
}
