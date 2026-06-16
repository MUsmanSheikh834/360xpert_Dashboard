"use client";
import { MdAirplaneTicket, MdHotel, MdAttachMoney, MdCheckCircle } from "react-icons/md";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const cardClass = "flex-1 basis-0 min-w-0 rounded-2xl p-5 flex flex-col justify-between h-[120px]";
const cardStyle = { background: "#EBF5FB", border: "0.5px solid #C8E3F5" };
const whiteCardStyle = { background: "#FFFFFF", border: "0.5px solid #C8E3F5" };
const iconStyle = { background: "#00C6B0" };
const titleStyle: React.CSSProperties = { color: "#0A3D6B", fontSize: "13px", fontWeight: 700 };
const valueStyle: React.CSSProperties = { color: "#0A3D6B", fontSize: "22px", fontWeight: 700 };
const badgeStylePos: React.CSSProperties = { color: "#0A7A6E", fontSize: "11px", fontWeight: 500 };
const badgeStyleNeg: React.CSSProperties = { color: "#e53e3e", fontSize: "11px", fontWeight: 500 };

export function BookingStatCards() {
  const { stats } = useSelector((state: RootState) => state.hotelBookings);

  const cards = [
    {
      title: "Total Booking",
      value: stats.totalbookings.toLocaleString(),
      badge: stats.totalbookingsbadge,
      Icon: MdAirplaneTicket,
      style: cardStyle,
    },
    {
      title: "Occupied Rooms",
      value: stats.occupied.toLocaleString(),
      badge: stats.occupiedbadge,
      Icon: MdHotel,
      style: whiteCardStyle,
    },
    {
      title: "Check-In",
      value: stats.checkin.toLocaleString(),
      badge: stats.checkinbadge,
      Icon: MdAttachMoney,
      style: cardStyle,
    },
    {
      title: "Check-outs",
      value: stats.checkout.toLocaleString(),
      badge: stats.checkoutbadge,
      Icon: MdCheckCircle,
      style: whiteCardStyle,
    },
  ];

  return (
    <div className="flex gap-4 w-full">
      {cards.map(({ title, value, badge, Icon, style }) => {
        const positive = badge >= 0;
        return (
          <div key={title} className={cardClass} style={style}>
            <div className="flex justify-between items-start">
              <p style={titleStyle}>{title}</p>
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                style={iconStyle}
              >
                <Icon style={{ color: "#fff", width: "20px", height: "20px" }} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span style={valueStyle}>{value}</span>
              <div
                className="ml-auto flex items-center gap-1"
                style={positive ? badgeStylePos : badgeStyleNeg}
              >
                {positive ? "+" : ""}
                {badge}%
                {positive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
