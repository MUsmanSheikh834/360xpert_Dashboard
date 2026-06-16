import {
  MdAirplaneTicket,
  MdApartment,
  MdFlight,
  MdHotel,
  MdAttachMoney,
  MdCheckCircle,
} from "react-icons/md";
import { TrendingUp } from "lucide-react";

const cardClass = "flex-1 basis-0 min-w-0 rounded-2xl p-4 flex flex-col justify-between h-[110px]";
const cardStyle = { background: "#EBF5FB", border: "0.5px solid #C8E3F5" };
const whiteCardStyle = { background: "#FFFFFF", border: "0.5px solid #C8E3F5" };
const iconStyle = { background: "#00C6B0" };
const titleStyle = {
  color: "#0A3D6B",
  fontSize: "12px",
  fontWeight: 700,
  lineHeight: "1.4",
  minHeight: "36px",
};
const valueStyle = { color: "#0A3D6B", fontSize: "14px", fontWeight: 700 };
const badgeStyle = { color: "#0A7A6E", fontSize: "10px", fontWeight: 400 };
const statIconStyle = { color: "#0A3D6B", width: "16px", height: "16px" };

export function AllStatCards() {
  return (
    <div className="flex gap-3 w-full">
      {/* Card 1 */}
      <div className={cardClass} style={cardStyle}>
        <div className="flex justify-between items-start">
          <p style={titleStyle}>Hotel & Flight Booking</p>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={iconStyle}
          >
            <MdAirplaneTicket style={{ color: "#fff", width: "18px", height: "18px" }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <MdAirplaneTicket style={statIconStyle} />
            <span style={valueStyle}>3700</span>
          </div>
          <div className="flex items-center gap-1">
            <MdApartment style={statIconStyle} />
            <span style={valueStyle}>3650</span>
          </div>
          <div className="ml-auto flex items-center gap-1" style={badgeStyle}>
            +11.01% <TrendingUp className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className={cardClass} style={whiteCardStyle}>
        <div className="flex justify-between items-start">
          <p style={titleStyle}>Active flight & Occupied Rooms</p>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={iconStyle}
          >
            <MdFlight style={{ color: "#fff", width: "18px", height: "18px" }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <MdFlight style={statIconStyle} />
            <span style={valueStyle}>3650</span>
          </div>
          <div className="flex items-center gap-1">
            <MdHotel style={statIconStyle} />
            <span style={valueStyle}>3650</span>
          </div>
          <div className="ml-auto flex items-center gap-1" style={badgeStyle}>
            +6.08% <TrendingUp className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className={cardClass} style={cardStyle}>
        <div className="flex justify-between items-start">
          <p style={titleStyle}>Flight & Hotel Revenue</p>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={iconStyle}
          >
            <MdAttachMoney style={{ color: "#fff", width: "18px", height: "18px" }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span style={valueStyle}>$15040</span>
          <div className="ml-auto flex items-center gap-1" style={badgeStyle}>
            +15.03% <TrendingUp className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Card 4 */}
      <div className={cardClass} style={whiteCardStyle}>
        <div className="flex justify-between items-start">
          <p style={titleStyle}>Completed Flights & Hotel Checkouts</p>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={iconStyle}
          >
            <MdCheckCircle style={{ color: "#fff", width: "18px", height: "18px" }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span style={valueStyle}>316</span>
          <div className="ml-auto flex items-center gap-1" style={badgeStyle}>
            +6.08% <TrendingUp className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
