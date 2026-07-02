"use client";

import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Mail, Phone, MapPin, Send, HelpCircle, Loader2 } from "lucide-react";

export default function Contact() {
  const { submitContactForm } = useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!name || !email || !subject || !message) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const res = await submitContactForm(name, email, subject, message);
    setLoading(false);

    if (res.success) {
      setSuccess("Your message was sent successfully! We will get back to you shortly.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      setError(res.error || "Failed to send message.");
    }
  };

  return (
    <div className="container">
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 800, color: "var(--secondary-color)", fontFamily: "var(--font-outfit)" }}>
          Contact Our Editorial Office
        </h1>
        <p style={{ color: "var(--text-light)", marginTop: "10px", maxWidth: "600px", margin: "10px auto 0" }}>
          Have questions regarding manuscript submissions, indexing requests, or book orders? Reach out to our teams.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "50px" }}>
        {/* Contact Details */}
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "25px" }}>Get In Touch</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "15px" }}>
              <div style={{ width: "48px", height: "48px", background: "rgba(223, 31, 55, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary-color)", flexShrink: 0 }}>
                <MapPin size={20} />
              </div>
              <div>
                <h4 style={{ fontWeight: "bold", fontSize: "16px" }}>Office Address</h4>
                <p style={{ color: "var(--text-light)", marginTop: "4px", fontSize: "14px" }}>
                  Plot No. 12, Knowledge Park III, Greater Noida, UP, India
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "15px" }}>
              <div style={{ width: "48px", height: "48px", background: "rgba(223, 31, 55, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary-color)", flexShrink: 0 }}>
                <Phone size={20} />
              </div>
              <div>
                <h4 style={{ fontWeight: "bold", fontSize: "16px" }}>Phone Number</h4>
                <p style={{ color: "var(--text-light)", marginTop: "4px", fontSize: "14px" }}>
                  +91-9911126113
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "15px" }}>
              <div style={{ width: "48px", height: "48px", background: "rgba(223, 31, 55, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary-color)", flexShrink: 0 }}>
                <Mail size={20} />
              </div>
              <div>
                <h4 style={{ fontWeight: "bold", fontSize: "16px" }}>Email Support</h4>
                <p style={{ color: "var(--text-light)", marginTop: "4px", fontSize: "14px" }}>
                  support@griffinpublication.com
                </p>
              </div>
            </div>
          </div>

          {/* Location Map Placeholder Card */}
          <div 
            className="card-glass" 
            style={{ 
              marginTop: "40px", 
              padding: "20px", 
              background: "#1e293b", 
              color: "white", 
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <HelpCircle size={28} style={{ color: "var(--primary-color)" }} />
            <h4 style={{ fontWeight: "bold" }}>Visiting Greater Noida Campus?</h4>
            <p style={{ fontSize: "13px", color: "#cbd5e1" }}>
              Our offices are open Monday to Friday, 9:00 AM to 5:30 PM IST. Scheduling an appointment beforehand is recommended.
            </p>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="card-glass" style={{ background: "white" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>Send Us a Message</h3>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                type="text"
                className="form-control"
                placeholder="Dr. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                type="email"
                className="form-control"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                className="form-control"
                placeholder="Inquiry about book publishing process"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: "25px" }}>
              <label className="form-label" htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                rows="5"
                className="form-control"
                placeholder="Write your detailed query..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "12px", display: "flex", gap: "8px", justifyContent: "center" }}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <><Send size={16} /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
