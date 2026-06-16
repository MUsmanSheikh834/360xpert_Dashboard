"use client";
import React from "react";

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

const DownloadIcon = () => (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IdIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M16 10h2M16 14h2M7 10h4v4H7z" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const STEPS = ["Pending", "Issued", "Cancelled", "Confirmed", "Ticket Booked"];
const ACTIVE_FROM = 3; // "Confirmed" index onwards are active

interface BookingConfirmedModalProps {
  onClose: () => void;
  passengerName?: string;
  flightNo?: string;
  route?: string;
  departureDate?: string;
  seatNumber?: string;
}

export default function BookingConfirmedModal({
  onClose,
  passengerName = "Taha Khan",
  flightNo = "TRA - 304",
  route = "KHI - DXB",
  departureDate = "15 September 2025",
  seatNumber = "5A",
}: BookingConfirmedModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "420px",
          padding: "36px 32px 28px",
          position: "relative",
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#94a3b8",
          }}
        >
          <XIcon />
        </button>

        {/* Check circle */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "#0eb8a0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <CheckIcon />
        </div>

        <p style={{ fontSize: "22px", fontWeight: 700, color: "#1e293b", margin: "0 0 6px" }}>
          Booking Confirmed
        </p>
        <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 24px" }}>
          Your flight has been successfully booked
        </p>

        {/* Ticket summary card */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: "12px",
            padding: "20px",
            textAlign: "left",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div>
              <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 4px" }}>
                Ticket Summary
              </p>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e293b", margin: 0 }}>
                {passengerName}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 4px" }}>Flight No</p>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e293b", margin: "0 0 2px" }}>
                {flightNo}
              </p>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e293b", margin: 0 }}>
                {route}
              </p>
            </div>
            <div>
              <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 4px" }}>
                Departure Date
              </p>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e293b", margin: 0 }}>
                {departureDate}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 4px" }}>Seat Number</p>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e293b", margin: 0 }}>
                {seatNumber}
              </p>
            </div>
          </div>

          {/* Status tracker */}
          <div
            style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}
          >
            {STEPS.map((step, i) => {
              const isActive = i >= ACTIVE_FROM;
              const isLast = i === STEPS.length - 1;
              return (
                <React.Fragment key={step}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: isLast ? "14px" : "12px",
                        height: isLast ? "14px" : "12px",
                        borderRadius: "50%",
                        background: isActive ? "#0eb8a0" : "#d1d5db",
                        border: isLast ? "3px solid #fff" : "none",
                        boxShadow: isLast ? "0 0 0 2px #0eb8a0" : "none",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "10px",
                        color: isActive ? "#0eb8a0" : "#94a3b8",
                        fontWeight: isActive ? 600 : 400,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {step}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      style={{
                        flex: 1,
                        height: "2px",
                        background: i >= ACTIVE_FROM - 1 ? "#0eb8a0" : "#d1d5db",
                        marginTop: "5px",
                        marginBottom: "16px",
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Download button */}
        <button
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            background: "#0eb8a0",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <DownloadIcon /> Download Ticket
        </button>

        {/* Info notes */}
        <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <IdIcon />
            <span style={{ fontSize: "12px", color: "#64748b" }}>
              Please carry a Valid ID at the airport
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ClockIcon />
            <span style={{ fontSize: "12px", color: "#64748b" }}>
              Arrive 2 hours before departure for international
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
