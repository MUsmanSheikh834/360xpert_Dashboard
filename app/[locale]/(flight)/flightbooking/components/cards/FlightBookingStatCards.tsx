import { MdPending, MdCheckCircle, MdCancel, MdPublic } from "react-icons/md";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const cardClass = "flex-1 basis-0 min-w-0 rounded-2xl p-5 flex flex-col justify-between h-[120px]";
const cardStyle = { background: "#EBF5FB", border: "0.5px solid #C8E3F5" };
const whiteCardStyle = { background: "#FFFFFF", border: "0.5px solid #C8E3F5" };
const iconStyle = { background: "#00C6B0" };

const titleStyle: React.CSSProperties = { color: "#0A3D6B", fontSize: "13px", fontWeight: 700 };
const badgeStylePos: React.CSSProperties = { color: "#0A7A6E", fontSize: "11px", fontWeight: 500 };
const badgeStyleNeg: React.CSSProperties = { color: "#e53e3e", fontSize: "11px", fontWeight: 500 };

export function FlightBookingStatCards() {
  const { stats } = useSelector((s: RootState) => s.flightBookings);

  const cards = [
    {
      title: "Pending",
      value: `+${stats.pending.toLocaleString()}`,
      badge: `${stats.pendingBadge > 0 ? "+" : ""}${stats.pendingBadge}%`,
      positive: stats.pendingBadge >= 0,
      Icon: MdPending,
      style: cardStyle,
    },
    {
      title: "Confirmed",
      value: `+${stats.confirmed.toLocaleString()}`,
      badge: `${stats.confirmedBadge > 0 ? "+" : ""}${stats.confirmedBadge}%`,
      positive: stats.confirmedBadge >= 0,
      Icon: MdCheckCircle,
      style: whiteCardStyle,
    },
    {
      title: "Cancelled",
      value: `${stats.cancelled.toLocaleString()}`,
      badge: `${stats.cancelledBadge > 0 ? "+" : ""}${stats.cancelledBadge}%`,
      positive: stats.cancelledBadge >= 0,
      Icon: MdCancel,
      style: cardStyle,
    },
    {
      title: "Manuals",
      value: `+${stats.manual.toLocaleString()}`,
      badge: `${stats.manualBadge > 0 ? "+" : ""}${stats.manualBadge}%`,
      positive: stats.manualBadge >= 0,
      Icon: MdPublic,
      style: whiteCardStyle,
    },
  ];

  return (
    <div className="flex gap-4 w-full">
      {cards.map(({ title, value, badge, positive, Icon, style }) => (
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
            <span style={{ color: "#0A3D6B", fontSize: "22px", fontWeight: 700 }}>{value}</span>
            <div
              className="ml-auto flex items-center gap-1"
              style={positive ? badgeStylePos : badgeStyleNeg}
            >
              {badge}
              {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
