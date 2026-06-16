"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

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
    {/* map outline */}
    <polygon points="5,15 35,5 65,15 95,5 95,85 65,95 35,85 5,95" />
    <line x1="35" y1="5" x2="35" y2="85" />
    <line x1="65" y1="15" x2="65" y2="95" />
    {/* pin */}
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
    maxWidth: "860px",
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
  title: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#0ea5c8",
    margin: 0,
  },
  subtitle: {
    fontSize: "13px",
    color: "#64748b",
    marginTop: "4px",
  },
  sectionLabel: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#1e293b",
    marginBottom: "12px",
    marginTop: "24px",
  },
  row: {
    display: "flex",
    gap: "10px",
    flexWrap: "nowrap" as const,
    alignItems: "center",
  },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "0 12px",
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
};

// ─── Salutation dropdown ──────────────────────────────────────────────────────

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

// ─── Guest row ────────────────────────────────────────────────────────────────

interface GuestRowProps {
  salutation: string;
  onSalutationChange: (v: string) => void;
  fields: { icon: React.ReactNode; placeholder: string; value: string; type?: string }[];
  onFieldChange: (i: number, v: string) => void;
}

function GuestRow({ salutation, onSalutationChange, fields, onFieldChange }: GuestRowProps) {
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

// ─── Blank guest helper ───────────────────────────────────────────────────────

function blankGuest() {
  return { salutation: "Mr", name: "", phone: "", email: "", dob: "", postalCode: "", country: "" };
}

type Guest = ReturnType<typeof blankGuest>;

// ─── Component ────────────────────────────────────────────────────────────────

interface HotelBookingModalProps {
  onClose: () => void;
}

export default function HotelBookingModal({ onClose }: HotelBookingModalProps) {
  const [lead, setLead] = React.useState<Guest>(blankGuest());
  const [guests, setGuests] = React.useState<Guest[]>([]);

  const updateLead = (field: keyof Guest, value: string) =>
    setLead((p) => ({ ...p, [field]: value }));

  const updateGuest = (idx: number, field: keyof Guest, value: string) =>
    setGuests((prev) => prev.map((g, i) => (i === idx ? { ...g, [field]: value } : g)));

  const fieldKeys: (keyof Guest)[] = ["name", "phone", "email", "dob", "postalCode", "country"];

  const buildFields = (g: Guest) => [
    { icon: <UserIcon />, placeholder: "Full Name", value: g.name },
    { icon: <PhoneIcon />, placeholder: "Phone Number", value: g.phone, type: "tel" },
    { icon: <MailIcon />, placeholder: "Email Address", value: g.email, type: "email" },
    { icon: <CalendarIcon />, placeholder: "Date of Birth", value: g.dob, type: "date" },
    { icon: <PostalCodeIcon />, placeholder: "Postal Code", value: g.postalCode },
    { icon: <MapPinIcon />, placeholder: "Country", value: g.country },
  ];

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>
        <button style={s.closeBtn} onClick={onClose}>
          <XIcon />
        </button>

        <h2 style={s.title}>Add New Booking</h2>
        <p style={s.subtitle}>Add details of Hotel's guests with the lead guest.</p>

        <p style={s.sectionLabel}>Lead New Guest Details</p>
        <GuestRow
          salutation={lead.salutation}
          onSalutationChange={(v) => updateLead("salutation", v)}
          fields={buildFields(lead)}
          onFieldChange={(i, v) => updateLead(fieldKeys[i], v)}
        />

        <p style={{ ...s.sectionLabel, marginTop: "24px" }}>Add New Guest Details</p>

        {guests.map((g, idx) => (
          <div key={idx} style={{ marginBottom: "12px" }}>
            <GuestRow
              salutation={g.salutation}
              onSalutationChange={(v) => updateGuest(idx, "salutation", v)}
              fields={buildFields(g)}
              onFieldChange={(i, v) => updateGuest(idx, fieldKeys[i], v)}
            />
          </div>
        ))}

        <button style={s.addMoreBtn} onClick={() => setGuests((p) => [...p, blankGuest()])}>
          <PlusIcon /> Add More
        </button>

        <div style={s.footer}>
          <button style={s.discardBtn} onClick={onClose}>
            Discard
          </button>
          <button style={s.saveBtn} onClick={onClose}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
