"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Handshake, Users, Award, Star } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const mainLinks = [
    { name: "Home", href: "/" },
    { 
      name: "About Us", 
      href: "/about", 
      isDropdown: true,
      subLinks: [
        { name: "Who We Are", href: "/about#who-we-are", icon: Award },
        { name: "About Founder", href: "/about#about-founder", icon: Star },
        { name: "Meet Our Team", href: "/about#our-team", icon: Users },
        { name: "Our Partners", href: "/about#our-partners", icon: Handshake },
      ]
    },
    { name: "Gallery", href: "/gallery" },
    { name: "Book Store", href: "/book-store" },
    { name: "E-Book", href: "/e-book" },
    { name: "Publish Book", href: "/publish-book" },
    { name: "Research papers/Journals", href: "/journals" },
    { name: "Contact us", href: "/contact" },
  ];

  return (
    <nav className={`navbar ${isHome && !scrolled ? "is-transparent" : "is-solid"}`}>
      <Link href="/" className="logo-container">
        <img 
          src="/logo-transparent.png" 
          alt="Griffin Publication Logo" 
          className="navbar-logo"
        />
      </Link>

      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        {mainLinks.map((link) => {
          const isActive = pathname === link.href;

          if (link.isDropdown) {
            return (
              <li 
                key={link.href} 
                className="nav-dropdown-wrapper"
                onMouseEnter={() => setAboutHovered(true)}
                onMouseLeave={() => setAboutHovered(false)}
                style={{ position: "relative", display: "flex", alignItems: "center" }}
              >
                <Link
                  href={link.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  onClick={() => setIsOpen(false)}
                  style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  <span>{link.name}</span>
                  <ChevronDown size={14} style={{ transition: "transform 0.2s ease", transform: aboutHovered ? "rotate(180deg)" : "rotate(0deg)" }} />
                </Link>

                {/* Dropdown Menu */}
                <div 
                  className={`nav-dropdown-menu ${aboutHovered ? "show" : ""}`}
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "-15px",
                    width: "220px",
                    background: "white",
                    borderRadius: "14px",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
                    border: "1px solid #e2e8f0",
                    padding: "10px 0",
                    opacity: aboutHovered ? 1 : 0,
                    visibility: aboutHovered ? "visible" : "hidden",
                    transform: aboutHovered ? "translateY(5px)" : "translateY(15px)",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    zIndex: 200,
                  }}
                >
                  {link.subLinks.map((sub) => {
                    const Icon = sub.icon;
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 20px",
                          fontSize: "14px",
                          color: "#334155",
                          fontWeight: "600",
                          transition: "all 0.2s ease",
                          textDecoration: "none",
                        }}
                        className="dropdown-item-link"
                        onClick={() => {
                          setIsOpen(false);
                          setAboutHovered(false);
                        }}
                      >
                        <Icon size={16} style={{ color: "var(--primary-color)" }} />
                        <span>{sub.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </li>
            );
          }

          return (
            <li key={link.href} style={{ display: "flex", alignItems: "center" }}>
              <Link
                href={link.href}
                className={`nav-link ${isActive ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
