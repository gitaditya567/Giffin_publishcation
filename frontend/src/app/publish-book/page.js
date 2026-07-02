"use client";

import Link from "next/link";
import { 
  BookOpen, Award, HeartHandshake, FileText, UserCheck, MailCheck, Sparkles, ArrowRight,
  Check, X, Star, Crown, Sprout, Globe, CheckCircle2, Mail, Phone, MessageSquare, ShieldCheck, Zap
} from "lucide-react";

export default function PublishBook() {
  const guidelines = [
    {
      step: 1,
      title: "Query Form",
      description: "Fill the query form on our website with your book details.",
      icon: FileText,
    },
    {
      step: 2,
      title: "Sample Chapters",
      description: "Send us the best three chapters / poems / episodes of your book.",
      icon: BookOpen,
    },
    {
      step: 3,
      title: "Synopsis",
      description: "Send us a detailed and clear synopsis of your book.",
      icon: FileText,
    },
    {
      step: 4,
      title: "Author Profile",
      description: "Send us your personal details with a brief description of your profile.",
      icon: UserCheck,
    },
  ];

  const packages = [
    {
      id: "starter",
      badge: "🌿 Package 1",
      name: "Starter Publishing",
      price: "₹18,000",
      description: "Ideal for first-time authors who want global paperback availability with professional essentials.",
      icon: Sprout,
      popular: false,
      color: "#10b981",
      includes: [
        "ISBN Allocation",
        "Professional Cover Page Design",
        "Interior Typesetting & Formatting",
        "Paperback Publishing (Global Availability)",
        "Book Launch Promotion & Social Media promotion"
      ],
      excludes: [
        "Kindle / eBook Not Included"
      ],
      keyBenefit: "Get your book professionally published and globally available in paperback on Amazon and leading platforms."
    },
    {
      id: "advanced",
      badge: "✨ Package 2",
      name: "Advanced Publishing",
      price: "₹25,000",
      description: "For authors looking to expand reach with digital presence and media exposure.",
      icon: Sparkles,
      popular: false,
      color: "#2563eb",
      plusHeader: "Includes Everything in Starter Package PLUS:",
      includes: [
        "Basic Editing & Proofreading",
        "Paperback + eBook + Kindle Version (Global Availability)",
        "Author Interview (Websites)",
        "Author Talk Show Appearance",
        "Enhanced Book Launch Promotion"
      ],
      excludes: [],
      keyBenefit: "Boost your author visibility through interviews, talk shows, and multi-format publishing worldwide."
    },
    {
      id: "premium",
      badge: "🌟 Package 3",
      name: "Premium Publishing",
      price: "₹35,000",
      description: "For authors ready to create a buzz with full-scale promotions and multimedia engagement.",
      icon: Star,
      popular: true,
      popularText: "MOST POPULAR",
      color: "#d97706",
      plusHeader: "Includes Everything in Advanced Package PLUS:",
      includes: [
        "Editing & Proofreading",
        "Book Trailer (Professional Video)",
        "Podcast Promotion",
        "Exclusive Author Talk Show Appearance",
        "Extended digital Media Coverage (Social Media, Press, YouTube)"
      ],
      excludes: [],
      keyBenefit: "Transform your book into a brand — with your story reaching readers across all media formats."
    },
    {
      id: "elite",
      badge: "💫 Package 4",
      name: "Elite Author Package",
      price: "₹50,000",
      description: "For authors who want maximum exposure and professional branding support.",
      icon: Crown,
      popular: false,
      popularText: "ELITE CHOICE",
      color: "#7c3aed",
      plusHeader: "Includes Everything in Premium Package PLUS:",
      includes: [
        "Professional Book Reviews (Media & Blogs)",
        "Featured Author Interviews (Websites & YouTube Channels)",
        "Global Distribution – Paperback + eBook + Kindle",
        "Priority Marketing & PR Campaign",
        "Podcast & Talk Show Network Appearances",
        "Exclusive Launch Event Assistance"
      ],
      excludes: [],
      keyBenefit: "A complete author branding solution — from editing to interviews to global book launch promotions."
    }
  ];

  const whyPublishWithUs = [
    {
      title: "End-to-End Guidance",
      desc: "Complete professional support from manuscript editing and layout to global release and post-launch promotion.",
      icon: ShieldCheck,
      color: "#0284c7"
    },
    {
      title: "Global Reach",
      desc: "Worldwide availability on Amazon, Kindle network, Griffin Books Store, and leading international distribution channels.",
      icon: Globe,
      color: "#16a34a"
    },
    {
      title: "Author Branding Support",
      desc: "Media interviews, video book trailers, talk show appearances, and podcast features to build your personal author brand.",
      icon: Award,
      color: "#9333ea"
    },
    {
      title: "Transparent Pricing",
      desc: "Clear, all-inclusive package pricing with guaranteed deliverables and absolutely no hidden fees.",
      icon: CheckCircle2,
      color: "#e11d48"
    }
  ];

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", paddingBottom: "80px" }}>
      {/* Banner / Header */}
      <section 
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "white",
          padding: "80px 20px 100px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div 
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(223, 31, 55, 0.25) 0%, rgba(0,0,0,0) 70%)",
            borderRadius: "50%",
          }}
        />
        <div 
          style={{
            position: "absolute",
            bottom: "-50px",
            left: "-50px",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(0,0,0,0) 70%)",
            borderRadius: "50%",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "900px", margin: "0 auto" }}>
          <div 
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              borderRadius: "30px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#f59e0b",
              marginBottom: "20px",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <Sparkles size={16} />
            <span>EMPOWER YOUR STORY • REACH THE WORLD</span>
          </div>

          <h1 
            style={{
              fontSize: "3rem",
              fontWeight: 800,
              fontFamily: "var(--font-outfit)",
              lineHeight: "1.2",
              marginBottom: "15px",
              letterSpacing: "-0.5px"
            }}
          >
            Book Publishing Packages
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#cbd5e1", lineHeight: "1.6", maxWidth: "750px", margin: "0 auto" }}>
            Choose the perfect publishing plan tailored for your book. From professional editing to global distribution and multimedia author branding.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="container" style={{ maxWidth: "1200px", margin: "-60px auto 0", padding: "0 20px", position: "relative", zIndex: 3 }}>
        
        {/* Packages Grid */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "24px", alignItems: "stretch" }}>
            {packages.map((pkg) => {
              const IconComp = pkg.icon;
              return (
                <div 
                  key={pkg.id}
                  style={{
                    background: "white",
                    borderRadius: "20px",
                    padding: "32px 26px",
                    border: pkg.popular ? "2px solid #f59e0b" : "1px solid #e2e8f0",
                    boxShadow: pkg.popular 
                      ? "0 20px 25px -5px rgba(245, 158, 11, 0.15), 0 10px 10px -5px rgba(245, 158, 11, 0.04)" 
                      : "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  {pkg.popular && (
                    <div 
                      style={{
                        position: "absolute",
                        top: "-14px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)",
                        color: "white",
                        padding: "4px 16px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        boxShadow: "0 4px 10px rgba(245, 158, 11, 0.4)"
                      }}
                    >
                      {pkg.popularText}
                    </div>
                  )}

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: pkg.color, background: `${pkg.color}15`, padding: "4px 12px", borderRadius: "20px" }}>
                      {pkg.badge}
                    </span>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${pkg.color}10`, display: "flex", alignItems: "center", justifyContent: "center", color: pkg.color }}>
                      <IconComp size={22} />
                    </div>
                  </div>

                  <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px", fontFamily: "var(--font-outfit)" }}>
                    {pkg.name}
                  </h3>

                  <div style={{ marginBottom: "16px" }}>
                    <span style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", fontFamily: "var(--font-outfit)" }}>{pkg.price}</span>
                    <span style={{ fontSize: "13px", color: "#64748b", marginLeft: "6px" }}>/ package</span>
                  </div>

                  <p style={{ fontSize: "0.92rem", color: "#64748b", lineHeight: "1.5", marginBottom: "20px", minHeight: "42px" }}>
                    {pkg.description}
                  </p>

                  <hr style={{ border: "none", borderTop: "1px solid #f1f5f9", margin: "0 0 20px 0" }} />

                  {/* Features List */}
                  <div style={{ flexGrow: 1, marginBottom: "20px" }}>
                    {pkg.plusHeader && (
                      <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary-color)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>
                        {pkg.plusHeader}
                      </p>
                    )}
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                      {pkg.includes.map((feat, idx) => (
                        <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9rem", color: "#334155", lineHeight: "1.4" }}>
                          <Check size={16} style={{ color: "#10b981", flexShrink: 0, marginTop: "2px" }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                      {pkg.excludes.map((ex, idx) => (
                        <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9rem", color: "#94a3b8", lineHeight: "1.4" }}>
                          <X size={16} style={{ color: "#ef4444", flexShrink: 0, marginTop: "2px" }} />
                          <span style={{ textDecoration: "line-through" }}>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Benefit Box */}
                  <div 
                    style={{
                      background: "#f8fafc",
                      borderRadius: "12px",
                      padding: "14px",
                      borderLeft: `3px solid ${pkg.color}`,
                      marginBottom: "24px"
                    }}
                  >
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                      Key Benefit
                    </span>
                    <p style={{ fontSize: "0.85rem", color: "#334155", lineHeight: "1.4", margin: 0 }}>
                      {pkg.keyBenefit}
                    </p>
                  </div>

                  <a 
                    href={`https://wa.me/918800711108?text=Hello%20Griffin%20Publication,%20I%20want%20to%20inquire%20about%20${encodeURIComponent(pkg.name)}%20(${pkg.price}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "12px",
                      fontWeight: 700,
                      fontSize: "14px",
                      textAlign: "center",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      background: pkg.popular ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" : "var(--primary-color)",
                      color: "white",
                      border: "none",
                      textDecoration: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                    }}
                  >
                    <span>Choose Plan</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Publish With Us Section */}
        <div 
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "50px 40px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
            marginBottom: "50px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 40px" }}>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", fontFamily: "var(--font-outfit)", marginBottom: "10px" }}>
              Why Publish With Us?
            </h2>
            <p style={{ color: "#64748b", fontSize: "1.05rem" }}>
              We empower authors with complete end-to-end publishing support, high transparency, and global exposure.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "25px" }}>
            {whyPublishWithUs.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={index}
                  style={{
                    background: "#f8fafc",
                    borderRadius: "16px",
                    padding: "28px 22px",
                    border: "1px solid #e2e8f0",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <div 
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "14px",
                      background: `${item.color}15`,
                      color: item.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "18px"
                    }}
                  >
                    <IconComp size={26} />
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: "1.6", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submission Guidelines Card */}
        <div 
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "50px 40px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
            marginBottom: "50px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", fontFamily: "var(--font-outfit)" }}>
              SUBMISSION GUIDELINES
            </h2>
            <p style={{ color: "#64748b", marginTop: "8px", fontSize: "1.05rem" }}>
              Follow these straightforward steps to submit your manuscript for evaluation
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "25px", marginBottom: "40px" }}>
            {guidelines.map((item) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={item.step}
                  style={{
                    background: "#f8fafc",
                    borderRadius: "16px",
                    padding: "30px 20px",
                    textAlign: "center",
                    border: "1px solid #e2e8f0",
                    position: "relative",
                  }}
                >
                  <div 
                    style={{
                      position: "absolute",
                      top: "-15px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "var(--primary-color)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 10px rgba(223, 31, 55, 0.3)",
                    }}
                  >
                    {item.step}
                  </div>

                  <div style={{ margin: "15px 0 15px", color: "#0f172a", display: "flex", justifyContent: "center" }}>
                    <IconComp size={32} style={{ color: "var(--primary-color)" }} />
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: "1.5", margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 7 Days Notice Box */}
          <div 
            style={{
              background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
              border: "1px solid #bfdbfe",
              borderRadius: "14px",
              padding: "20px 25px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <MailCheck size={28} style={{ color: "#2563eb", flexShrink: 0 }} />
            <p style={{ fontSize: "1.05rem", color: "#1e3a8a", fontWeight: 600, margin: 0 }}>
              If we find your script eligible to publish, we will email you within 7 days.
            </p>
          </div>
        </div>

        {/* Contact Us & Closing CTA Card */}
        <div 
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            borderRadius: "24px",
            padding: "50px 30px",
            textAlign: "center",
            color: "white",
            boxShadow: "0 20px 25px -5px rgba(15, 23, 42, 0.3)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div 
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle, rgba(223, 31, 55, 0.2) 0%, rgba(0,0,0,0) 70%)",
              borderRadius: "50%",
            }}
          />

          <div style={{ position: "relative", zIndex: 2, maxWidth: "750px", margin: "0 auto" }}>
            <HeartHandshake size={48} style={{ color: "#f59e0b", marginBottom: "15px" }} />
            <h2 
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                letterSpacing: "0.5px",
                fontFamily: "var(--font-outfit)",
                color: "#ffffff",
                marginBottom: "10px",
              }}
            >
              Contact Us Today!
            </h2>
            <p style={{ fontSize: "1.2rem", color: "#cbd5e1", marginBottom: "30px" }}>
              Let your words travel the world. Get in touch with our publishing experts.
            </p>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "30px" }}>
              <a 
                href="mailto:griffin.publication21@gmail.com" 
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  padding: "14px 24px",
                  borderRadius: "30px",
                  color: "white",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "15px",
                  fontWeight: 600,
                  transition: "all 0.3s ease"
                }}
              >
                <Mail size={18} style={{ color: "#f59e0b" }} />
                <span>griffin.publication21@gmail.com</span>
              </a>

              <a 
                href="https://wa.me/918800711108?text=Hello%20Griffin%20Publication,%20I%20want%20to%20inquire%20about%20publishing%20my%20book." 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#25d366",
                  padding: "14px 24px",
                  borderRadius: "30px",
                  color: "white",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "15px",
                  fontWeight: 700,
                  boxShadow: "0 4px 14px rgba(37, 211, 102, 0.4)",
                  transition: "all 0.3s ease"
                }}
              >
                <MessageSquare size={18} />
                <span>WhatsApp: 8800711108</span>
              </a>
            </div>

            <p style={{ fontSize: "13px", color: "#94a3b8", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
              TRUST US AND WE WILL RESPECT YOUR TRUST
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

