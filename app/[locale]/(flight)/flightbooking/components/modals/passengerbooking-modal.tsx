"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import BookingConfirmedModal from "@/app/[locale]/(flight)/flightbooking/components/modals/confirmation/ticketconfirm";

// ─── Icons ────────────────────────────────────────────────────────────────────

const UserIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const PhoneIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const MailIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const CalendarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const PostalCodeIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 100 100"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5,15 35,5 65,15 95,5 95,85 65,95 35,85 5,95" />
    <line x1="35" y1="5" x2="35" y2="85" />
    <line x1="65" y1="15" x2="65" y2="95" />
    <path
      d="M50 20 C43 20 37 26 37 34 C37 45 50 58 50 58 C50 58 63 45 63 34 C63 26 57 20 50 20Z"
      fill="#94a3b8"
      stroke="none"
    />
    <circle cx="50" cy="34" r="5" fill="white" stroke="none" />
  </svg>
);
const MapPinIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const PlaneIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L11 8 2.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L6 12l-2 3H1l-1 1 3 1 1 3 1-1v-3l3-2 3.5 4.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const PlusIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const XIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = {
  overlay: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(15,23,42,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
    padding: "16px",
  },
  modal: {
    background: "#fff",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "900px",
    padding: "32px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
    position: "relative" as const,
    maxHeight: "90vh",
    overflowY: "auto" as const,
  },
  closeBtn: {
    position: "absolute" as const,
    top: "20px",
    right: "20px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#94a3b8",
    padding: "4px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: "22px", fontWeight: 700, color: "#0ea5c8", margin: 0 },
  subtitle: { fontSize: "13px", color: "#64748b", marginTop: "4px" },
  sectionLabel: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#1e293b",
    marginBottom: "12px",
    marginTop: "24px",
  },
  row: { display: "flex", gap: "8px", flexWrap: "nowrap" as const, alignItems: "center" },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "0 10px",
    height: "40px",
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    background: "#fff",
  },
  input: {
    border: "none",
    outline: "none",
    fontSize: "13px",
    color: "#1e293b",
    width: "100%",
    background: "transparent",
    minWidth: 0,
  },
  dropdownTrigger: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "0 12px",
    height: "40px",
    background: "#fff",
    cursor: "pointer",
    fontSize: "13px",
    color: "#1e293b",
    flexShrink: 0,
    minWidth: "70px",
  },
  addMoreBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#0ea5c8",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    marginTop: "12px",
  },
  divider: { height: "1px", background: "#f1f5f9", margin: "20px 0" },
  radioGroup: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginTop: "20px",
    marginBottom: "16px",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: "#475569",
    cursor: "pointer",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "28px",
    paddingTop: "20px",
    borderTop: "1px solid #f1f5f9",
  },
  discardBtn: {
    padding: "10px 24px",
    border: "1.5px solid #0ea5c8",
    borderRadius: "999px",
    background: "#fff",
    color: "#0ea5c8",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
  },
  saveBtn: {
    padding: "10px 32px",
    border: "none",
    borderRadius: "999px",
    background: "#0ea5c8",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
  },
  errorText: { fontSize: "12px", color: "#ef4444", marginTop: "8px" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SalutationDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button style={s.dropdownTrigger}>
          {value} <ChevronDownIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {["Mr", "Ms", "Mrs", "Dr"].map((t) => (
          <DropdownMenuItem key={t} onClick={() => onChange(t)}>
            {t}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const CLASSES = ["Economy", "Business", "First Class"];

function ClassDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          style={{
            ...s.dropdownTrigger,
            flex: 1,
            minWidth: 0,
            justifyContent: "space-between",
            color: value ? "#1e293b" : "#94a3b8",
          }}
        >
          <span>{value || "Class"}</span>
          <ChevronDownIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" style={{ minWidth: "140px" }}>
        {CLASSES.map((c) => (
          <DropdownMenuItem key={c} onClick={() => onChange(c)}>
            {c}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface PassengerRowProps {
  salutation: string;
  onSalutationChange: (v: string) => void;
  fields: { icon: React.ReactNode; placeholder: string; value: string; type?: string }[];
  onFieldChange: (i: number, v: string) => void;
}

function PassengerRow({
  salutation,
  onSalutationChange,
  fields,
  onFieldChange,
}: PassengerRowProps) {
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
  return (
    <div style={s.row}>
      <SalutationDropdown value={salutation} onChange={onSalutationChange} />
      {fields.map((f, i) => {
        const isDate = f.type === "date";
        const effectiveType =
          isDate && focusedIndex !== i && !f.value ? "text" : (f.type ?? "text");
        return (
          <div key={i} style={s.inputWrap}>
            {f.icon}
            <input
              style={s.input}
              placeholder={f.placeholder}
              value={f.value}
              type={effectiveType}
              onFocus={() => setFocusedIndex(i)}
              onBlur={() => setFocusedIndex(null)}
              onChange={(e) => onFieldChange(i, e.target.value)}
            />
          </div>
        );
      })}
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

function blankPassenger() {
  return { salutation: "Mr", name: "", phone: "", email: "", dob: "", postalCode: "", country: "" };
}
function blankTicket() {
  return { from: "", to: "", date: "", class: "" };
}

type Passenger = ReturnType<typeof blankPassenger>;
type Ticket = ReturnType<typeof blankTicket>;
type TripType = "one-way" | "round-trip" | "multi-city";

// ─── Component ────────────────────────────────────────────────────────────────

interface PassengerBookingModalProps {
  onClose: () => void;
}

export default function PassengerBookingModal({ onClose }: PassengerBookingModalProps) {
  const [lead, setLead] = React.useState<Passenger>(blankPassenger());
  const [passengers, setPassengers] = React.useState<Passenger[]>([]);
  const [tripType, setTripType] = React.useState<TripType>("one-way");
  const [tickets, setTickets] = React.useState<Ticket[]>([blankTicket()]);

  // ── API state ──────────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmed, setShowConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    flightNo: string;
    route: string;
    departureDate: string;
  } | null>(null);

  const updateLead = (field: keyof Passenger, value: string) =>
    setLead((p) => ({ ...p, [field]: value }));

  const updatePassenger = (idx: number, field: keyof Passenger, value: string) =>
    setPassengers((prev) => prev.map((g, i) => (i === idx ? { ...g, [field]: value } : g)));

  const updateTicket = (idx: number, field: keyof Ticket, value: string) =>
    setTickets((prev) => prev.map((t, i) => (i === idx ? { ...t, [field]: value } : t)));

  const fieldKeys: (keyof Passenger)[] = ["name", "phone", "email", "dob", "postalCode", "country"];

  const buildFields = (p: Passenger) => [
    { icon: <UserIcon />, placeholder: "Full Name", value: p.name },
    { icon: <PhoneIcon />, placeholder: "Phone Number", value: p.phone, type: "tel" },
    { icon: <MailIcon />, placeholder: "Email Address", value: p.email, type: "email" },
    { icon: <CalendarIcon />, placeholder: "Date of Birth", value: p.dob, type: "date" },
    { icon: <PostalCodeIcon />, placeholder: "Postal Code", value: p.postalCode },
    { icon: <MapPinIcon />, placeholder: "Country", value: p.country },
  ];

  const handleTripTypeChange = (type: TripType) => {
    setTripType(type);
    setTickets(type === "multi-city" ? [blankTicket(), blankTicket()] : [blankTicket()]);
  };

  // ── Save handler ───────────────────────────────────────────────────────────
  const handleSave = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/flight-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadPassenger: lead,
          additionalPassengers: passengers,
          tripType,
          tickets,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      // Store confirmed booking details for the confirmation modal
      setConfirmedBooking({
        flightNo: json.data.flightNo,
        route: `${json.data.airportFrom} - ${json.data.airportTo}`,
        departureDate: json.data.departureDatetime,
      });

      setShowConfirmed(true);
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>
        <button style={s.closeBtn} onClick={onClose}>
          <XIcon />
        </button>

        <h2 style={s.title}>Add New Booking</h2>
        <p style={s.subtitle}>Add details of passengers traveling with the lead passenger.</p>

        <p style={s.sectionLabel}>Lead New Passenger Details</p>
        <PassengerRow
          salutation={lead.salutation}
          onSalutationChange={(v) => updateLead("salutation", v)}
          fields={buildFields(lead)}
          onFieldChange={(i, v) => updateLead(fieldKeys[i], v)}
        />

        <p style={{ ...s.sectionLabel, marginTop: "24px" }}>Add New Passenger Details</p>
        {passengers.map((p, idx) => (
          <div key={idx} style={{ marginBottom: "12px" }}>
            <PassengerRow
              salutation={p.salutation}
              onSalutationChange={(v) => updatePassenger(idx, "salutation", v)}
              fields={buildFields(p)}
              onFieldChange={(i, v) => updatePassenger(idx, fieldKeys[i], v)}
            />
          </div>
        ))}

        <button style={s.addMoreBtn} onClick={() => setPassengers((p) => [...p, blankPassenger()])}>
          <PlusIcon /> Add More
        </button>

        <div style={s.divider} />

        <div style={s.radioGroup}>
          {(["one-way", "round-trip", "multi-city"] as TripType[]).map((type) => (
            <label key={type} style={s.radioLabel}>
              <input
                type="radio"
                name="tripType"
                checked={tripType === type}
                onChange={() => handleTripTypeChange(type)}
                style={{ width: "15px", height: "15px", accentColor: "#0ea5c8", cursor: "pointer" }}
              />
              {type === "one-way" ? "One Way" : type === "round-trip" ? "Round Trip" : "Multi City"}
            </label>
          ))}
        </div>

        <p style={{ ...s.sectionLabel, marginTop: 0 }}>Ticket Information</p>

        {tickets.map((ticket, idx) => (
          <div key={idx} style={{ ...s.row, marginBottom: "10px" }}>
            <div style={s.inputWrap}>
              <PlaneIcon />
              <input
                style={s.input}
                placeholder="From"
                value={ticket.from}
                onChange={(e) => updateTicket(idx, "from", e.target.value)}
              />
            </div>
            <div style={s.inputWrap}>
              <PlaneIcon />
              <input
                style={s.input}
                placeholder="To"
                value={ticket.to}
                onChange={(e) => updateTicket(idx, "to", e.target.value)}
              />
            </div>
            <div style={s.inputWrap}>
              <CalendarIcon />
              <input
                style={s.input}
                placeholder="Departure Date"
                type="date"
                value={ticket.date}
                onChange={(e) => updateTicket(idx, "date", e.target.value)}
              />
            </div>
            <ClassDropdown value={ticket.class} onChange={(v) => updateTicket(idx, "class", v)} />
          </div>
        ))}

        {tripType === "multi-city" && (
          <button
            style={{
              ...s.addMoreBtn,
              background: "transparent",
              color: "#0ea5c8",
              border: "1px dashed #0ea5c8",
            }}
            onClick={() => setTickets((p) => [...p, blankTicket()])}
          >
            <PlusIcon /> Add Flight
          </button>
        )}

        {/* Error message */}
        {error && <p style={s.errorText}>{error}</p>}

        <div style={s.footer}>
          <button style={s.discardBtn} onClick={onClose} disabled={loading}>
            Discard
          </button>
          <button
            style={{
              ...s.saveBtn,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

        {/* Confirmation modal — shown after successful API response */}
        {showConfirmed && confirmedBooking && (
          <BookingConfirmedModal
            onClose={() => {
              setShowConfirmed(false);
              onClose();
            }}
            passengerName={lead.name || "Passenger"}
            flightNo={confirmedBooking.flightNo}
            route={confirmedBooking.route}
            departureDate={confirmedBooking.departureDate}
            seatNumber="5A"
          />
        )}
      </div>
    </div>
  );
}
