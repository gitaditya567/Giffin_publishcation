import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col footer-about">
          <div style={{ marginBottom: "15px" }}>
            <img 
              src="/logo-transparent.png" 
              alt="Griffin Publication Logo" 
              style={{ height: "65px", width: "auto", objectFit: "contain" }}
            />
          </div>
          <p>
            Griffin Publication is a premier global academic publisher dedicated to supporting researchers, 
            authors, and institutions by delivering ethical, high-quality, and transparent publishing solutions.
          </p>
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <span style={{ fontSize: "12px", background: "#1f2937", padding: "4px 8px", borderRadius: "4px" }}>Scopus Indexed (Applied)</span>
            <span style={{ fontSize: "12px", background: "#1f2937", padding: "4px 8px", borderRadius: "4px" }}>Open Access</span>
          </div>
        </div>
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/book-store">Book Store</Link></li>
            <li><Link href="/e-book">E-Books</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Publish With Us</h3>
          <ul className="footer-links">
            <li><Link href="/publish-book">Publish Book</Link></li>
            <li><Link href="/contact">Inquiries</Link></li>
            <li><Link href="/login">Author Login</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Contact Us</h3>
          <ul className="footer-contact">
            <li>
              <MapPin size={18} />
              <span>Plot No. 12, Knowledge Park III, Greater Noida, UP, India</span>
            </li>
            <li>
              <Phone size={18} />
              <span>+91-9911126113</span>
            </li>
            <li>
              <Mail size={18} />
              <span>support@griffinpublication.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>
          &copy; {new Date().getFullYear()} Griffin Publication. All rights reserved.
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            Privacy Policy <ExternalLink size={12} />
          </a>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            Terms of Service <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
