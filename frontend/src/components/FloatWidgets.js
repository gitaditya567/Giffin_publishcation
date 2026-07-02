"use client";

import { Phone, MessageSquareCode } from "lucide-react";

export default function FloatWidgets() {
  const handlePhoneClick = () => {
    window.location.href = "tel:+919911126113";
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919911126113?text=Hello%20Griffin%20Publication,%20I%20have%20an%20inquiry.", "_blank");
  };

  return (
    <>
      {/* Left side Phone widget */}
      <div 
        style={{
          position: "fixed",
          bottom: "30px",
          left: "30px",
          zIndex: 999,
        }}
      >
        <button 
          onClick={handlePhoneClick}
          className="float-btn phone" 
          aria-label="Call Support"
          style={{
            border: "none",
            outline: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Phone size={24} />
        </button>
      </div>

      {/* Right side WhatsApp widget */}
      <div 
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 999,
        }}
      >
        <button 
          onClick={handleWhatsAppClick}
          className="float-btn whatsapp" 
          aria-label="Chat on WhatsApp"
          style={{
            border: "none",
            outline: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Custom SVG WhatsApp icon or Lucide MessageSquareCode */}
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        </button>
      </div>
    </>
  );
}
