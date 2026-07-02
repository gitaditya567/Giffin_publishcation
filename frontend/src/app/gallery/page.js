"use client";

import { useState } from "react";
import { Image as ImageIcon, Sparkles, Award, BookOpen, Globe } from "lucide-react";

export default function GalleryPage() {
  const galleryItems = [
    {
      id: 1,
      title: "Oxford University Honour & Literary Convention",
      category: "International Events",
      image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=600",
      description: "Recognizing visionary authors and global literary excellence at Oxford, UK.",
    },
    {
      id: 2,
      title: "LOSD Excellence Awards at Lord's Cricket Ground",
      category: "Awards",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600",
      description: "Celebrating Women Icon awards and international publishing achievements in London.",
    },
    {
      id: 3,
      title: "Annual Global Book Release & Author Summit",
      category: "Book Launches",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600",
      description: "Unveiling multidisciplinary academic volumes and fostering research collaborations.",
    },
    {
      id: 4,
      title: "Youth Empowerment & Skill Development Workshops",
      category: "Workshops",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600",
      description: "Interactive seminars and literature promotion sessions conducted in academic institutions.",
    },
    {
      id: 5,
      title: "Gujarat Sahitya Academy & Writing Forum Felicitation",
      category: "Awards",
      image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=600",
      description: "Felicitation ceremony recognizing literary acumen and community missionary services.",
    },
    {
      id: 6,
      title: "Healthcare Warriors Book Distribution Drive",
      category: "Social Mission",
      image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&q=80&w=600",
      description: "Distributing dedicated medical welfare books for cancer survivors and caregivers.",
    },
  ];

  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", "International Events", "Awards", "Book Launches", "Workshops", "Social Mission"];

  const filteredItems = activeFilter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", paddingBottom: "80px" }}>
      {/* Top Banner */}
      <section 
        style={{
          background: "linear-gradient(rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.9)), url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "80px 20px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div className="container" style={{ maxWidth: "850px", margin: "0 auto" }}>
          <div 
            className="write-reveal-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
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
            <span>MOMENTS & MILESTONES</span>
          </div>

          <h1 style={{ fontSize: "2.8rem", fontWeight: 800, fontFamily: "var(--font-outfit)", marginBottom: "15px" }}>
            Photo & Event Gallery
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#cbd5e1", lineHeight: "1.6" }}>
            Highlights from international conferences, award ceremonies, book launches, and educational workshops.
          </p>
        </div>
      </section>

      {/* Main Gallery Container */}
      <div className="container" style={{ maxWidth: "1100px", margin: "-30px auto 0", padding: "0 20px", position: "relative", zIndex: 3 }}>
        
        {/* Category Filters */}
        <div 
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            marginBottom: "40px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            border: "1px solid #e2e8f0",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="btn-animate"
              style={{
                padding: "8px 20px",
                borderRadius: "25px",
                fontSize: "14px",
                fontWeight: "600",
                border: "1px solid",
                borderColor: activeFilter === cat ? "var(--primary-color)" : "#cbd5e1",
                backgroundColor: activeFilter === cat ? "var(--primary-color)" : "transparent",
                color: activeFilter === cat ? "white" : "#475569",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "30px" }}>
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="card-hover-effect animate-fade-in"
              style={{
                background: "white",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="img-hover-zoom"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span 
                  style={{
                    position: "absolute",
                    top: "15px",
                    left: "15px",
                    background: "rgba(15, 23, 42, 0.85)",
                    backdropFilter: "blur(4px)",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {item.category}
                </span>
              </div>

              <div style={{ padding: "25px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "10px", lineHeight: "1.4" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: "1.6", margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
