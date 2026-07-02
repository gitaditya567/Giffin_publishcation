"use client";

import Link from "next/link";
import { 
  BookOpen, Award, Sparkles, ArrowRight, ShieldCheck, Users, 
  Star, Phone, Mail, Heart, GraduationCap, Handshake, Building2 
} from "lucide-react";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Padmashree Vishnu Pandya",
      role: "Advisor",
      image: "/team/vishnu-pandya.png",
      initials: "VP",
      bio: "Renowned author, journalist, and historian guiding our editorial vision and publishing ethics.",
    },
    {
      name: "Parul Chandra",
      role: "Program / Project Head",
      image: "/team/parul-chandra.jpg",
      initials: "PC",
      bio: "Oversees strategic publishing projects, author onboarding, and execution workflows.",
    },
    {
      name: "Kirat Kaur",
      role: "Communication Head",
      image: "/team/kirat-kaur.png",
      initials: "KK",
      bio: "Leads global author communications, public relations, and editorial board outreach.",
    },
  ];

  const partners = [
    {
      name: "Motivational Strips",
      type: "World's Largest Writing Forum",
      desc: "Strategic partner in international author felicitation & global poetry anthologies.",
    },
    {
      name: "Gujarat Sahitya Academy",
      type: "Government Literary Academy",
      desc: "Joint partner for Independence Day literary honours and cultural research initiatives.",
    },
    {
      name: "The Global i News",
      type: "Broadcasting & Media Platform",
      desc: "Media broadcasting partner delivering sharp insights on key international affairs.",
    },
    {
      name: "Union Hispanomundial de Escritores",
      type: "Peru Writers Union",
      desc: "International literary exchange partner celebrating world poetry and literary acumen.",
    },
    {
      name: "Suryadatta Group of Institutes",
      type: "Pune Research Institute",
      desc: "Academic partner for skill development training & community missionary services.",
    },
    {
      name: "Foxpro Media",
      type: "Global Publishing Partner",
      desc: "Promoting author excellence and international award platforms.",
    },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", paddingBottom: "80px" }}>
      {/* Banner / Header */}
      <section 
        style={{
          background: "linear-gradient(rgba(15, 23, 42, 0.82), rgba(30, 41, 59, 0.88)), url('/about_banner_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "90px 20px 100px",
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

        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "850px", margin: "0 auto" }}>
          <div 
            className="write-reveal-badge"
            style={{
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
            <span>EXCELLENCE IN PUBLISHING</span>
          </div>

          <h1 
            className="write-reveal-title"
            style={{
              fontSize: "2.8rem",
              fontWeight: 800,
              fontFamily: "var(--font-outfit)",
              lineHeight: "1.2",
              marginBottom: "15px",
            }}
          >
            About Griffin Publication
          </h1>
          <p className="write-reveal-subtitle" style={{ fontSize: "1.2rem", color: "#cbd5e1", lineHeight: "1.6" }}>
            Dedicated to promoting research, literature, and academic innovation worldwide.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="container" style={{ maxWidth: "1050px", margin: "-40px auto 0", padding: "0 20px", position: "relative", zIndex: 3 }}>
        
        {/* Quick Navigation Sub-Tabs */}
        <div 
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "15px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            marginBottom: "30px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            border: "1px solid #e2e8f0",
          }}
        >
          <button onClick={() => scrollToSection("who-we-are")} className="btn-animate" style={{ padding: "8px 20px", borderRadius: "20px", border: "1px solid #cbd5e1", background: "#f8fafc", color: "#0f172a", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>Who We Are</button>
          <button onClick={() => scrollToSection("about-founder")} className="btn-animate" style={{ padding: "8px 20px", borderRadius: "20px", border: "1px solid #cbd5e1", background: "#f8fafc", color: "#0f172a", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>About Founder</button>
          <button onClick={() => scrollToSection("our-team")} className="btn-animate" style={{ padding: "8px 20px", borderRadius: "20px", border: "1px solid #cbd5e1", background: "#f8fafc", color: "#0f172a", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>Meet Our Team</button>
          <button onClick={() => scrollToSection("our-partners")} className="btn-animate" style={{ padding: "8px 20px", borderRadius: "20px", border: "1px solid var(--primary-color)", background: "var(--primary-color)", color: "white", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>Our Partners</button>
        </div>

        {/* Who We Are Card */}
        <div 
          id="who-we-are"
          className="card-hover-effect animate-fade-in"
          style={{
            scrollMarginTop: "100px",
            background: "white",
            borderRadius: "16px",
            padding: "50px 40px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
            marginBottom: "40px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", fontFamily: "var(--font-outfit)", marginBottom: "20px" }}>
            Who We Are
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#334155", lineHeight: "1.8", marginBottom: "20px" }}>
            Griffin Publication is an international publishing platform committed to disseminating high-quality academic books, textbooks, research monographs, and literary works across diverse disciplines.
          </p>
          <p style={{ fontSize: "1.1rem", color: "#334155", lineHeight: "1.8", marginBottom: "30px" }}>
            Our mission is to bridge the gap between visionary authors and eager readers globally by providing transparent publishing services, double-blind peer reviews, and wide international distribution.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "30px" }}>
            <div className="card-hover-effect" style={{ background: "#f8fafc", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <Award size={32} style={{ color: "var(--primary-color)", marginBottom: "12px" }} />
              <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>Quality First</h4>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6" }}>Strict editorial review standards to ensure publication excellence.</p>
            </div>
            <div className="card-hover-effect" style={{ background: "#f8fafc", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <ShieldCheck size={32} style={{ color: "#2563eb", marginBottom: "12px" }} />
              <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>Transparency</h4>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6" }}>Ethical publishing practices with zero hidden terms or misleading claims.</p>
            </div>
            <div className="card-hover-effect" style={{ background: "#f8fafc", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <BookOpen size={32} style={{ color: "#f59e0b", marginBottom: "12px" }} />
              <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>Global Impact</h4>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6" }}>Broad distribution networks reaching academic and global reader communities.</p>
            </div>
          </div>
        </div>

        {/* About Founder Card */}
        <div 
          id="about-founder"
          className="card-hover-effect animate-fade-in"
          style={{
            scrollMarginTop: "100px",
            background: "white",
            borderRadius: "16px",
            padding: "50px 40px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
            marginBottom: "40px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "35px" }}>
            {/* Founder Header Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "35px", alignItems: "center" }}>
              <div>
                <div 
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 16px",
                    background: "rgba(223, 31, 55, 0.1)",
                    borderRadius: "30px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "var(--primary-color)",
                    marginBottom: "15px",
                  }}
                >
                  <Star size={16} />
                  <span>FOUNDER & DIRECTOR</span>
                </div>
                <h2 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0f172a", fontFamily: "var(--font-outfit)", lineHeight: "1.2", marginBottom: "8px" }}>
                  Mousumi Kalita Sachdeva
                </h2>
                <p style={{ fontSize: "1.1rem", color: "var(--primary-color)", fontWeight: "700", marginBottom: "20px" }}>
                  Founder-Director of GRIFFIN Publication, India | Chief Editor of &lsquo;The Globali News&rsquo;
                </p>
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginBottom: "20px" }}>
                  <a 
                    href="tel:8800711108" 
                    className="btn btn-outline btn-animate"
                    style={{ fontSize: "14px", padding: "8px 18px", borderRadius: "25px", display: "inline-flex", alignItems: "center", gap: "8px", borderColor: "#cbd5e1" }}
                  >
                    <Phone size={16} style={{ color: "var(--primary-color)" }} />
                    <span>8800711108</span>
                  </a>
                  <a 
                    href="mailto:griffin.publication21@gmail.com" 
                    className="btn btn-outline btn-animate"
                    style={{ fontSize: "14px", padding: "8px 18px", borderRadius: "25px", display: "inline-flex", alignItems: "center", gap: "8px", borderColor: "#cbd5e1" }}
                  >
                    <Mail size={16} style={{ color: "#2563eb" }} />
                    <span>griffin.publication21@gmail.com</span>
                  </a>
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <div 
                  style={{
                    position: "relative",
                    width: "280px",
                    height: "320px",
                    margin: "0 auto",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 20px 30px rgba(15, 23, 42, 0.15)",
                    border: "5px solid white",
                    background: "#0f172a",
                  }}
                >
                  <img 
                    src="/team/mousumi-sachdeva.jpg" 
                    alt="Mousumi Kalita Sachdeva - Founder Director"
                    className="img-hover-zoom"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
              </div>
            </div>

            <hr style={{ border: 0, borderTop: "1px solid #e2e8f0", margin: "10px 0" }} />

            {/* Detailed Bio Paragraphs */}
            <div style={{ color: "#334155", fontSize: "1.05rem", lineHeight: "1.85", display: "flex", flexDirection: "column", gap: "20px" }}>
              <p>
                Mousumi Kalita Sachdeva is the Founder-Director of GRIFFIN publication, India. She is the Chief editor of &lsquo;The Globali News&rsquo;, a premier news and broadcasting platform that delivers sharp insights and fosters meaningful discussions on key national & international affairs. She is the author of eight books, a contributing author to more than 30 International Anthologies, and an internationally acclaimed poet. She is an Author Coach, Skill Development Trainer, Counsellor, Columnist at leading newspapers, a Foreign Affairs Expert, Television Spokesperson, internationally published poet, motivational speaker, and content writer. She is a ghostwriter too and has contributed richly to writing many books for prominent personalities. She is a published poet in international magazines and journals in the USA, Tokyo, Philippines, Peru, Spain, Bangladesh, etc. She is popular for her Japanese forms of poetry, and her work has been published in the Anthology &lsquo;World Gogyoshi&rsquo; in Tokyo. She is a revolutionary writer who voices the rights of the people and projects the truth of society through her literary works.
              </p>

              <div className="card-hover-effect" style={{ background: "#f8fafc", padding: "25px", borderRadius: "14px", borderLeft: "5px solid var(--primary-color)" }}>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Award size={20} style={{ color: "var(--primary-color)" }} />
                  Accolades & International Recognition
                </h4>
                <p style={{ margin: 0, fontSize: "1rem", lineHeight: "1.8", color: "#475569" }}>
                  Having been two times awarded by Gujarat Sahitya Academy in collaboration with the World&rsquo;s largest Writing Forum Motivational Strips on the 74th as well as 75th Independence Day of India, Author Mousumi has also been honoured with the prestigious &lsquo;Suryagaurav Rashtriya Puraskar 2020&rsquo; by Suryadatta Group of Institutes, Pune for her &lsquo;Valuable contribution in the field of Global Literary Acumen, Skill Development Training & Missionary Services for the Community&rsquo;. She has recently been honoured with the most prestigious World Literary Award by Union Hispanomundial de Escritorio- Peru in fond memory of Cesar Abraham Vallejo (1892-1938), Peruvian poet, writer, and the greatest exponent of letters in Peru. She was awarded as one of India&rsquo;s most inspirational writers in 2018 by The Indian Awaz.
                </p>
              </div>

              <p>
                Mousumi has been recently honoured with India&rsquo;s Prime Women Icon Award, 2023 by Foxpro. She was honoured with the LOSD Excellence Awards 2023 as a Women Icon at Lord&rsquo;s Cricket Ground, London, United Kingdom in December 2023. She has been chosen among the World&rsquo;s 24 prominent personalities in 2024. She has been featured in a reputed Coffee Table Magazine of London and was honoured at Oxford University, England, and London Houses of Parliament, on 24 March 2024.
              </p>

              <p style={{ fontStyle: "italic", color: "#475569", background: "#fff", padding: "12px 18px", borderRadius: "8px", border: "1px dashed #cbd5e1" }}>
                Her achievements and interviews are published in many National and International Magazines, Newspapers and broadcast on various Television Channels.
              </p>

              <div className="card-hover-effect" style={{ background: "#f0fdf4", padding: "25px", borderRadius: "14px", borderLeft: "5px solid #16a34a" }}>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#065f46", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Heart size={20} style={{ color: "#16a34a" }} />
                  Youth & Women Empowerment and Social Mission
                </h4>
                <p style={{ margin: "0 0 15px 0", fontSize: "1rem", lineHeight: "1.8", color: "#166534" }}>
                  Mousumi is working toward uplifting youth, women Empowerment and promoting the importance of Language and Literature spreading across the schools, conducting workshops for students on Future Skills and Entrepreneurial Mindset, and publishing books for free to encourage budding authors. With fervour and determination, she tirelessly conducts workshops across schools, igniting the passion for linguistic expression among students. But her efforts don&apos;t stop there; she goes above and beyond by distributing books for free, nurturing the talents of budding authors and poets. Mousumi&apos;s passion knows no bounds as she continues to inspire and empower the next generation of writers, leaving an indelible mark on the landscape of Language and Literature.
                </p>
                <p style={{ margin: 0, fontSize: "1rem", lineHeight: "1.8", color: "#166534" }}>
                  Mousumi works for the welfare of Cancer patients and caretakers through the benefits of her books, in collaboration with the late Dr. Nilakanta Siva, an ISRO scientist and author dedicated to the cancer warriors/survivors, doctors, nurses, and all the caretakers involved. Dr. Siva lost his life a few months back, and Author Mousumi holds the entire responsibility for this service.
                </p>
                <div style={{ marginTop: "15px", paddingTop: "12px", borderTop: "1px dashed #bbf7d0" }}>
                  <span style={{ fontWeight: 700, color: "#065f46", fontSize: "14px", display: "block", marginBottom: "6px" }}>Books Dedicated to Healthcare Warriors:</span>
                  <span style={{ fontSize: "14px", color: "#15803d", fontStyle: "italic" }}>
                    &bull; No One Fights Alone Vol I & II &nbsp;|&nbsp; &bull; The Agony and Ecstasy of Caregivers &nbsp;|&nbsp; &bull; Ostomy Management & Stoma Care &nbsp;|&nbsp; &bull; Doctors, No Less than God: Those Hands that Heal
                  </span>
                </div>
              </div>

              <div className="card-hover-effect" style={{ background: "#f8fafc", padding: "20px 25px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <GraduationCap size={18} style={{ color: "#2563eb" }} />
                  Academic Excellence & Education
                </h4>
                <p style={{ margin: 0, fontSize: "0.98rem", color: "#475569", lineHeight: "1.7" }}>
                  She has done her Masters in English, Psychology, Mass Communication & Journalism, B.Ed, IT, CISELT, and is presently specializing in Organizational and Industrial Psychology. She has been training and teaching in many institutions in various parts of India and has established herself as a writer contributing to many Newspapers, Media Portals, Magazines, and Anthologies. Life is travel for Mousumi, filled with teaching, training, social service, and attending and delivering training workshops at various universities, colleges, and organizations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Team Card */}
        <div 
          id="our-team"
          className="card-hover-effect animate-fade-in"
          style={{
            scrollMarginTop: "100px",
            background: "white",
            borderRadius: "16px",
            padding: "50px 40px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
            marginBottom: "40px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div 
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                background: "rgba(223, 31, 55, 0.1)",
                borderRadius: "30px",
                fontSize: "14px",
                fontWeight: "600",
                color: "var(--primary-color)",
                marginBottom: "12px",
              }}
            >
              <Users size={16} />
              <span>LEADERSHIP & EDITORIAL BOARD</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", fontFamily: "var(--font-outfit)" }}>
              Meet Our Team
            </h2>
            <p style={{ color: "#64748b", marginTop: "8px", fontSize: "1.05rem", maxWidth: "600px", margin: "8px auto 0" }}>
              Our dedicated team of advisors, program heads, and communication leaders guiding Griffin Publication.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "30px" }}>
            {teamMembers.map((member, idx) => (
              <div 
                key={idx}
                className="card-hover-effect"
                style={{
                  background: "#f8fafc",
                  borderRadius: "16px",
                  padding: "35px 24px",
                  textAlign: "center",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                }}
              >
                <div 
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    margin: "0 auto 20px",
                    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.15)",
                    border: "4px solid white",
                    background: "linear-gradient(135deg, #0f172a 0%, #334155 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="img-hover-zoom"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                    />
                  ) : (
                    <span style={{ color: "white", fontSize: "26px", fontWeight: "700" }}>{member.initials}</span>
                  )}
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
                  {member.name}
                </h3>
                <span style={{ fontSize: "14px", color: "var(--primary-color)", fontWeight: "700", display: "block", marginBottom: "14px" }}>
                  {member.role}
                </span>
                <p style={{ fontSize: "0.92rem", color: "#64748b", lineHeight: "1.6", margin: 0 }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Partners Card */}
        <div 
          id="our-partners"
          className="card-hover-effect animate-fade-in"
          style={{
            scrollMarginTop: "100px",
            background: "white",
            borderRadius: "16px",
            padding: "50px 40px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
            marginBottom: "40px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "35px" }}>
            <div 
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                background: "rgba(37, 99, 235, 0.1)",
                borderRadius: "30px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#2563eb",
                marginBottom: "12px",
              }}
            >
              <Handshake size={16} />
              <span>GLOBAL COLLABORATIONS</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", fontFamily: "var(--font-outfit)" }}>
              Our Partners & Collaborators
            </h2>
            <p style={{ color: "#64748b", marginTop: "8px", fontSize: "1.05rem", maxWidth: "650px", margin: "8px auto 0" }}>
              Proudly associated with esteemed international literary forums, academic institutions, and broadcasting networks.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {partners.map((partner, idx) => (
              <div 
                key={idx}
                className="card-hover-effect"
                style={{
                  background: "#f8fafc",
                  borderRadius: "14px",
                  padding: "24px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Building2 size={24} style={{ color: "var(--primary-color)" }} />
                  <div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                      {partner.name}
                    </h4>
                    <span style={{ fontSize: "12px", color: "var(--primary-color)", fontWeight: "600", display: "block" }}>
                      {partner.type}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: "0.92rem", color: "#64748b", lineHeight: "1.6", margin: 0 }}>
                  {partner.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action card */}
        <div 
          className="card-hover-effect animate-fade-in"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            borderRadius: "16px",
            padding: "45px 30px",
            textAlign: "center",
            color: "white",
            boxShadow: "0 20px 25px -5px rgba(15, 23, 42, 0.3)",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, fontFamily: "var(--font-outfit)", marginBottom: "15px" }}>
            Ready to Publish Your Work?
          </h2>
          <p style={{ color: "#cbd5e1", marginBottom: "25px", fontSize: "1.05rem" }}>
            Explore our publishing guidelines and submit your book proposal today.
          </p>
          <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link 
              href="/publish-book" 
              className="btn btn-primary btn-animate" 
              style={{ padding: "14px 32px", fontSize: "16px", borderRadius: "30px", display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <span>Publish Book</span>
              <ArrowRight size={18} />
            </Link>
            <Link 
              href="/contact" 
              className="btn btn-outline btn-animate" 
              style={{ padding: "14px 32px", fontSize: "16px", borderRadius: "30px", color: "white", borderColor: "rgba(255,255,255,0.4)" }}
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
