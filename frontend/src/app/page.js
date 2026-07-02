"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Star, ShieldCheck, Zap, Award, TrendingUp, Inbox, ClipboardCheck, Settings, Truck, Megaphone, Sparkles } from "lucide-react";

export default function Home() {
  const slides = [
    {
      title: "Elevate Your Academic & Research Publications with Griffin Publication",
      subtitle: "Supporting authors, researchers, and institutions with ethical, transparent, and timely academic publishing solutions.",
      buttonText: "PUBLISH YOUR CHAPTER",
      link: "/publish-chapter",
    },
    {
      title: "Griffin Publication | Open Access & High Impact Journals",
      subtitle: "Submit your research papers to indexed peer-reviewed journals. Fast-track reviews and global citation impact.",
      buttonText: "SUBMIT MANUSCRIPT",
      link: "/journals",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState({ books: 0, citations: 0, journals: 0, satisfaction: 0 });
  const [activeFaq, setActiveFaq] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setStats({
        books: Math.min(Math.floor((500 / steps) * step), 500),
        citations: Math.min(Math.floor((12000 / steps) * step), 12000),
        journals: Math.min(Math.floor((50 / steps) * step), 50),
        satisfaction: Math.min(Math.floor((98 / steps) * step), 98),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const carouselRef = useRef(null);
  const [carouselHovered, setCarouselHovered] = useState(false);

  const recentBooks = [
    {
      title: "Food Value Chain and Traceability",
      author: "Dr. Clara Higgins",
      bgColor: "#1e293b",
      img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Protected Cultivation & Agriculture",
      author: "Dr. Chandra Singh Ahlawat",
      bgColor: "#9b2c2c",
      img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Multidisciplinary Research (Vol - 3)",
      author: "Dr. MS Dayanandaswamy",
      bgColor: "#df1f37",
      img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "A Text Book of Plant Breeding",
      author: "Dr. U. K. Sharma",
      bgColor: "#1c4532",
      img: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Advance Vegetables Crops",
      author: "Prof. Robert Jenkins",
      bgColor: "#134e5e",
      img: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Modern Academic Writing & Ethics",
      author: "Prof. Clara Higgins",
      bgColor: "#2563eb",
      img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Sustainable Green Energy Frontiers",
      author: "Engr. Sarah Connor",
      bgColor: "#0f766e",
      img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=400"
    }
  ];

  useEffect(() => {
    if (carouselHovered) return;
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 15) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 275, behavior: "smooth" });
        }
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [carouselHovered]);

  const scrollLeftCarousel = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -275, behavior: "smooth" });
    }
  };

  const scrollRightCarousel = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 275, behavior: "smooth" });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div>
      {/* Hero Section with HD Video Background */}
      <section 
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "650px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Background HD Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay for optimal text readability */}
        <div 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(30, 41, 59, 0.65) 100%)",
            zIndex: 1,
          }}
        />

        {slides.map((slide, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: idx === currentSlide ? 1 : 0,
              pointerEvents: idx === currentSlide ? "auto" : "none",
              transform: `scale(${idx === currentSlide ? 1 : 1.05})`,
              transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 10%",
              zIndex: 2,
            }}
          >
            {idx === currentSlide && (
              <div 
                key={`slide-content-${currentSlide}`}
                style={{
                  maxWidth: "900px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <div className="hero-badge write-reveal-badge">
                  <Sparkles size={16} color="#f59e0b" />
                  <span>Global Academic & Research Publishing</span>
                </div>

                <h1 className="hero-glow-title write-reveal-title">
                  {slide.title}
                </h1>

                <p className="hero-glow-subtitle write-reveal-subtitle">
                  {slide.subtitle}
                </p>

                <div className="write-reveal-btn" style={{ marginTop: "10px" }}>
                  <Link href={slide.link} className="hero-glow-btn">
                    <span>{slide.buttonText}</span>
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Left Arrow */}
        <button 
          onClick={prevSlide}
          style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "50%",
            width: "55px",
            height: "55px",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "var(--transition)",
            zIndex: 3,
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--primary-color)";
            e.currentTarget.style.boxShadow = "0 0 20px var(--primary-color)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.15)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
          }}
          aria-label="Previous Slide"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Right Arrow */}
        <button 
          onClick={nextSlide}
          style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "50%",
            width: "55px",
            height: "55px",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "var(--transition)",
            zIndex: 3,
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--primary-color)";
            e.currentTarget.style.boxShadow = "0 0 20px var(--primary-color)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.15)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
          }}
          aria-label="Next Slide"
        >
          <ArrowRight size={24} />
        </button>

        {/* Interactive Dots Navigation */}
        <div className="hero-dots-container">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`hero-dot-btn ${idx === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Trusted Publishing Partner Section */}
      <section className="trusted-section">
        <div className="trusted-grid">
          {/* Left Column: Animated Book Stack & Circle BG */}
          <div className="trusted-left">
            <div className="trusted-circle-bg"></div>
            <div className="trusted-float-wrap">
              <div className="trusted-image-container">
                <img 
                  src="/trusted_partner_books.png" 
                  alt="Trusted Academic Books Stack" 
                  className="trusted-img"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Title, Description, Check List, Button */}
          <div className="trusted-right">
            <h2 className="trusted-title">Your Trusted Publishing Partner</h2>
            <div className="trusted-divider"></div>
            
            <p className="trusted-desc">
              Griffin Publication is an academic-focused publishing house serving researchers, faculty members and institutions. We specialize in books, edited volumes, chapters, journals and conference proceedings. Our goal is to simplify publishing while maintaining academic integrity and global visibility.
            </p>

            <div className="trusted-list">
              <div className="trusted-item">
                <span className="trusted-check">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span>Ethical academic publishing</span>
              </div>
              <div className="trusted-item">
                <span className="trusted-check">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span>Author copyright protection</span>
              </div>
              <div className="trusted-item">
                <span className="trusted-check">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span>Global online distribution</span>
              </div>
              <div className="trusted-item">
                <span className="trusted-check">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span>Dedicated editorial support</span>
              </div>
            </div>

            <Link href="/contact" className="btn btn-primary" style={{ padding: "12px 30px", borderRadius: "8px" }}>
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Our Publishing Services Section */}
      <section className="services-section">
        <div className="services-title-wrap">
          <h2 className="services-title">Our Publishing Services</h2>
          <p className="services-subtitle">Comprehensive solutions for all your publishing needs</p>
        </div>

        <div className="services-grid">
          {/* Card 1: Book Publishing */}
          <div className="service-card">
            <div className="service-img-wrap">
              <img src="/service_book_pub.png" alt="Book Publishing" className="service-img" />
            </div>
            <h3>Book Publishing</h3>
            <p className="service-desc">
              We publish academic and professional books across multiple disciplines, supporting authors throughout the publishing lifecycle. Our book publishing services include ISBN allotment, professional editing, formatting, cover page design and print as well as digital publication. Each title is prepared according to academic standards and distributed globally to ensure wider readership and long-term scholarly value.
            </p>
            <Link href="/publish-book" className="service-btn">
              Learn More
            </Link>
          </div>

          {/* Card 2: Chapter Publishing */}
          <div className="service-card">
            <div className="service-img-wrap">
              <img src="/service_chapter_pub.png" alt="Chapter Publishing" className="service-img" />
            </div>
            <h3>Chapter Publishing</h3>
            <p className="service-desc">
              Our chapter publishing service is ideal for researchers contributing to edited volumes. We provide structured editorial support, ISBN/DOI allocation (where applicable), acceptance letters and publication certificates. Each chapter is carefully formatted and published to maintain consistency, academic quality and proper author recognition.
            </p>
            <Link href="/publish-chapter" className="service-btn">
              Learn More
            </Link>
          </div>

          {/* Card 3: Conference Proceedings */}
          <div className="service-card">
            <div className="service-img-wrap">
              <img src="/service_conference_pub.png" alt="Conference Proceedings" className="service-img" />
            </div>
            <h3>Conference Proceedings</h3>
            <p className="service-desc">
              We publish conference proceedings for national and international seminars, conferences and symposia. Our services include ISBN allotment, editorial support, formatting and e-proceedings publication. Conference papers are compiled into professionally designed volumes to ensure proper documentation, academic recognition and long-term accessibility.
            </p>
            <Link href="/contact" className="service-btn">
              Learn More
            </Link>
          </div>

          {/* Card 4: Journal Publishing */}
          <div className="service-card">
            <div className="service-img-wrap">
              <img src="/service_journal_pub.png" alt="Journal Publishing" className="service-img" />
            </div>
            <h3>Journal Publishing</h3>
            <p className="service-desc">
              We support institutions, editors and research groups in launching and managing academic journals. Our services include editorial workflow guidance, ISSN assistance, manuscript handling support and publication management. We focus on maintaining ethical standards, regular publication schedules and academic credibility.
            </p>
            <Link href="/journals" className="service-btn">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mv-section">
        <div className="mv-grid">
          {/* Row 1: Mission */}
          <div className="mv-row">
            <div className="mv-illustration-wrap">
              <div className="mv-illustration-card">
                <img src="/mission_illustration.png" alt="Our Mission" className="mv-img" />
              </div>
            </div>
            <div className="mv-content">
              <h2 className="mv-title">Our Mission</h2>
              <p className="mv-desc">
                Our mission is to provide reliable, ethical and affordable academic publishing services to researchers, scholars and institutions across disciplines. We aim to simplify the publishing journey by offering transparent processes, editorial support and global dissemination, while ensuring that every published work meets scholarly and academic standards. Through our services, we strive to enhance research visibility, academic credibility and long-term impact for authors worldwide.
              </p>
            </div>
          </div>

          {/* Row 2: Vision */}
          <div className="mv-row reverse">
            <div className="mv-content">
              <h2 className="mv-title">Our Vision</h2>
              <p className="mv-desc">
                Our vision is to become a trusted and recognized global academic publishing platform that supports multidisciplinary research and scholarly communication. We aspire to create an inclusive publishing ecosystem where researchers from diverse academic backgrounds can share knowledge, contribute to innovation and gain international visibility. By embracing quality, integrity and author-centric values, we aim to support the growth of academic communities and knowledge dissemination worldwide.
              </p>
            </div>
            <div className="mv-illustration-wrap">
              <div className="mv-illustration-card">
                <img src="/vision_illustration.png" alt="Our Vision" className="mv-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Publication Process Section */}
      <section className="process-section">
        <div className="services-title-wrap">
          <h2 className="services-title">Our Publication Process</h2>
          <p className="services-subtitle">Simple, transparent steps from manuscript to published work</p>
        </div>

        <div className="process-grid">
          {/* Card 1: Consultation */}
          <div className="process-card">
            <div className="process-icon-wrap">
              <TrendingUp size={24} />
            </div>
            <h3>Consultation</h3>
            <p className="process-desc">
              We start with an initial consultation to understand your manuscript, subject area and publication goals. Our team advises on the most suitable publishing route book, chapter, conference proceedings and journal along with timelines, documentation and academic requirements.
            </p>
          </div>

          {/* Card 2: Submission */}
          <div className="process-card">
            <div className="process-icon-wrap">
              <Inbox size={24} />
            </div>
            <h3>Submission</h3>
            <p className="process-desc">
              Authors submit manuscripts in Word format through a secure channel. We ensure confidentiality and provide clear submission guidelines to avoid delays. At this stage, basic checks are performed to confirm completeness and scope alignment.
            </p>
          </div>

          {/* Card 3: Evaluation */}
          <div className="process-card">
            <div className="process-icon-wrap">
              <ClipboardCheck size={24} />
            </div>
            <h3>Evaluation</h3>
            <p className="process-desc">
              Each manuscript undergoes an editorial evaluation for academic relevance, structure and originality. For edited volumes and scholarly works, peer review support is arranged where applicable to maintain academic quality and consistency.
            </p>
          </div>

          {/* Card 4: Production */}
          <div className="process-card">
            <div className="process-icon-wrap">
              <Settings size={24} />
            </div>
            <h3>Production</h3>
            <p className="process-desc">
              After approval, the manuscript enters production. This includes professional editing, formatting as per academic standards and cover page design. Our production team ensures accuracy, readability and a polished final output.
            </p>
          </div>

          {/* Card 5: Distribution */}
          <div className="process-card">
            <div className="process-icon-wrap">
              <Truck size={24} />
            </div>
            <h3>Distribution</h3>
            <p className="process-desc">
              Published works are made available in print and digital formats. We ensure global distribution through major online platforms and academic channels, enabling wider access for researchers, institutions and libraries.
            </p>
          </div>

          {/* Card 6: Marketing & Visibility */}
          <div className="process-card">
            <div className="process-icon-wrap">
              <Megaphone size={24} />
            </div>
            <h3>Marketing & Visibility</h3>
            <p className="process-desc">
              We support basic academic marketing through catalog listings, platform indexing and online visibility. This helps improve discoverability among scholars while maintaining ethical, non-promotional academic standards.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="wcu-section">
        <div className="services-title-wrap">
          <h2 className="services-title">Why Choose Us?</h2>
          <p className="services-subtitle">Delivering high quality, transparent and author-centric academic publishing services</p>
        </div>

        <div className="wcu-timeline">
          {/* Card 1: Transparent Process (Left) */}
          <div className="wcu-block left">
            <div className="wcu-pointer"></div>
            <div className="wcu-card">
              <h3>Transparent Process</h3>
              <p>
                We follow a clear and well-defined publication process from manuscript submission to final publication. All publication steps, timelines and charges are communicated in advance to maintain complete transparency. There are no hidden costs or unclear commitments, ensuring authors feel confident and informed throughout the publishing journey.
              </p>
            </div>
          </div>

          {/* Card 2: Fast Publication (Right) */}
          <div className="wcu-block right">
            <div className="wcu-pointer"></div>
            <div className="wcu-card">
              <h3>Fast publication</h3>
              <p>
                Our publication workflow is designed to meet academic and professional timelines. With a structured editorial and production process, we ensure timely processing without compromising academic quality. This makes our services suitable for researchers, faculty members and institutions working within academic deadlines.
              </p>
            </div>
          </div>

          {/* Card 3: Academic Focus (Left) */}
          <div className="wcu-block left">
            <div className="wcu-pointer"></div>
            <div className="wcu-card">
              <h3>Academic Focus</h3>
              <p>
                Griffin Publication is exclusively focused on academic and scholarly publishing. Our services are designed to meet the needs of Ph.D scholars, faculty members, researchers and academic institutions. We understand academic requirements, documentation needs and research standards, ensuring publications align with scholarly expectations.
              </p>
            </div>
          </div>

          {/* Card 4: Dedicated Support (Right) */}
          <div className="wcu-block right">
            <div className="wcu-pointer"></div>
            <div className="wcu-card">
              <h3>Dedicated Support</h3>
              <p>
                We provide personalized support at every stage of the publication process. From initial guidance and manuscript handling to final publication and distribution, our team remains available to assist authors. This ensures a smooth, stress-free experience and builds long-term relationships with our contributors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Publish Books Section */}
      <section className="recent-section">
        <div className="services-title-wrap">
          <h2 className="services-title">Recent Publish Books</h2>
        </div>

        <div className="recent-slider-container">
          <div className="recent-carousel">
            <div className="marquee-track">
              {[...recentBooks, ...recentBooks].map((book, index) => (
                <div key={index} className="recent-book-card">
                  <div className="recent-book-cover" style={{ backgroundColor: book.bgColor }}>
                    <div className="recent-book-header">Academic Textbook Series</div>
                    
                    <div>
                      <h3 className="recent-book-title">{book.title}</h3>
                      <div className="recent-book-img-wrap">
                        <img src={book.img} alt={book.title} className="recent-book-img" />
                      </div>
                    </div>

                    <div className="recent-book-footer">
                      <div className="recent-book-author">{book.author}</div>
                      <div className="recent-book-logo">Griffin</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Distribution Network Section */}
      <section className="dist-section">
        <div className="services-title-wrap">
          <h2 className="services-title">Distribution Network</h2>
          <p className="services-subtitle">
            We do not just publish your book, we ensure it reaches readers worldwide. Once published, your book will be made available through major national and international e-commerce platforms, enhancing its visibility and accessibility.
          </p>
        </div>

        <div className="dist-box">
          {/* Logo 1: Amazon */}
          <div className="dist-logo" aria-label="Amazon">
            <span style={{ fontSize: "22px", fontWeight: "900", color: "#111", letterSpacing: "-1px" }}>amazon</span>
            <span style={{ color: "#ff9900", fontSize: "20px", fontWeight: "bold", marginLeft: "-3px" }}>➔</span>
          </div>

          {/* Logo 2: Flipkart */}
          <div className="dist-logo" aria-label="Flipkart">
            <span style={{ fontSize: "20px", fontWeight: "bold", color: "#2874f0", fontStyle: "italic" }}>Flipkart</span>
            <div style={{ background: "#ffe11b", color: "#2874f0", padding: "2px 6px", borderRadius: "3px", fontSize: "10px", fontWeight: "bold", marginLeft: "4px" }}>
              Plus
            </div>
          </div>

          {/* Logo 3: Google Play */}
          <div className="dist-logo" aria-label="Google Play">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 2.5v19l15-9.5L3 2.5z" fill="#4285F4"/>
              <path d="M3 2.5l11.5 11.5 3.5-2.2L3 2.5z" fill="#EA4335"/>
              <path d="M14.5 14L3 21.5l15-9.5-3.5-2z" fill="#FBBC05"/>
              <path d="M18 12l4-2.5-4-2.5v5z" fill="#34A853"/>
            </svg>
            <span style={{ fontSize: "18px", fontWeight: "600", color: "#5f6368", marginLeft: "6px" }}>Google Play</span>
          </div>

          {/* Logo 4: Amazon Kindle */}
          <div className="dist-logo" aria-label="Amazon Kindle">
            <span style={{ fontSize: "18px", fontWeight: "bold", color: "#333", letterSpacing: "-0.5px" }}>amazon</span>
            <span style={{ fontSize: "18px", color: "#ff9900", fontWeight: "300", marginLeft: "4px" }}>kindle</span>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="faq-section">
        <div className="services-title-wrap" style={{ alignItems: "flex-start", textAlign: "left", margin: "0 auto 40px", maxWidth: "950px" }}>
          <h2 className="services-title" style={{ display: "inline-block" }}>FAQs</h2>
        </div>

        <div className="faq-container">
          {/* FAQ Item 1 */}
          <div className="faq-item">
            <div 
              onClick={() => setActiveFaq(activeFaq === 0 ? -1 : 0)} 
              className={`faq-header ${activeFaq === 0 ? "active" : "inactive"}`}
            >
              <span>How do I publish with Griffin Publication?</span>
              <span>{activeFaq === 0 ? "▲" : "▼"}</span>
            </div>
            {activeFaq === 0 && (
              <div className="faq-content">
                To publish with Griffin Publication, authors need to submit their manuscript in Word format. Our team manages the complete publishing process, including editorial evaluation, editing, formatting, ISBN allocation and final publication. We guide authors at every stage to ensure a smooth and transparent experience.
              </div>
            )}
          </div>

          {/* FAQ Item 2 */}
          <div className="faq-item">
            <div 
              onClick={() => setActiveFaq(activeFaq === 1 ? -1 : 1)} 
              className={`faq-header ${activeFaq === 1 ? "active" : "inactive"}`}
            >
              <span>Do you provide ISBN and DOI?</span>
              <span>{activeFaq === 1 ? "▲" : "▼"}</span>
            </div>
            {activeFaq === 1 && (
              <div className="faq-content">
                Yes, we assign unique International Standard Book Numbers (ISBN) for all book publications, and Digital Object Identifiers (DOIs) for chapters and journal submissions where applicable to ensure academic cross-referencing and database discoverability.
              </div>
            )}
          </div>

          {/* FAQ Item 3 */}
          <div className="faq-item">
            <div 
              onClick={() => setActiveFaq(activeFaq === 2 ? -1 : 2)} 
              className={`faq-header ${activeFaq === 2 ? "active" : "inactive"}`}
            >
              <span>Do you support international publications?</span>
              <span>{activeFaq === 2 ? "▲" : "▼"}</span>
            </div>
            {activeFaq === 2 && (
              <div className="faq-content">
                Yes, we distribute globally through digital and print-on-demand networks, making your research accessible to international scholars, universities, and institutions worldwide.
              </div>
            )}
          </div>

          {/* FAQ Item 4 */}
          <div className="faq-item">
            <div 
              onClick={() => setActiveFaq(activeFaq === 3 ? -1 : 3)} 
              className={`faq-header ${activeFaq === 3 ? "active" : "inactive"}`}
            >
              <span>Do you accept regional and non-English language content?</span>
              <span>{activeFaq === 3 ? "▲" : "▼"}</span>
            </div>
            {activeFaq === 3 && (
              <div className="faq-content">
                While our primary academic indexing is in English, we accept and publish high-quality monographs and edited compilations in regional languages after rigorous review and verification.
              </div>
            )}
          </div>

          {/* FAQ Item 5 */}
          <div className="faq-item">
            <div 
              onClick={() => setActiveFaq(activeFaq === 4 ? -1 : 4)} 
              className={`faq-header ${activeFaq === 4 ? "active" : "inactive"}`}
            >
              <span>Can I become an editor or reviewer with Griffin Publication?</span>
              <span>{activeFaq === 4 ? "▲" : "▼"}</span>
            </div>
            {activeFaq === 4 && (
              <div className="faq-content">
                Yes, we invite qualified researchers and faculty members to join our peer-review boards. Please contact our editorial desk via the Contact Us form with your resume and research specialties.
              </div>
            )}
          </div>

          {/* FAQ Item 6 */}
          <div className="faq-item">
            <div 
              onClick={() => setActiveFaq(activeFaq === 5 ? -1 : 5)} 
              className={`faq-header ${activeFaq === 5 ? "active" : "inactive"}`}
            >
              <span>Is Griffin Publication suitable for Ph.D scholars and faculty members?</span>
              <span>{activeFaq === 5 ? "▲" : "▼"}</span>
            </div>
            {activeFaq === 5 && (
              <div className="faq-content">
                Absolutely. We tailor our services to help scholars publish doctoral theses, research proceedings, and edited collections in compliance with international academic index criteria.
              </div>
            )}
          </div>

          {/* FAQ Item 7 */}
          <div className="faq-item">
            <div 
              onClick={() => setActiveFaq(activeFaq === 6 ? -1 : 6)} 
              className={`faq-header ${activeFaq === 6 ? "active" : "inactive"}`}
            >
              <span>Authors often ask for an &quot;international ISBN.&quot; Is a foreign ISBN required for international publication?</span>
              <span>{activeFaq === 6 ? "▲" : "▼"}</span>
            </div>
            {activeFaq === 6 && (
              <div className="faq-content">
                An ISBN is inherently international in scope; there is no separate category called an &quot;international ISBN.&quot; The standard ISBN allotted by the national agency is valid globally and allows books to be cataloged in libraries and bookstores worldwide.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Global Impact Tracker Section (Something New!) */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="services-title-wrap" style={{ marginBottom: "50px" }}>
            <h2 className="services-title" style={{ color: "white" }}>Our Global Academic Impact</h2>
            <p className="services-subtitle" style={{ color: "#94a3b8" }}>Real-time statistics demonstrating our global research reach</p>
          </div>

          <div className="stats-grid">
            {/* Stat Card 1 */}
            <div className="stat-card">
              <div className="stat-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </div>
              <div className="stat-number">{stats.books}<span>+</span></div>
              <div className="stat-label">Published Books</div>
              <div className="stat-desc">Peer-reviewed academic monographs & volumes</div>
            </div>

            {/* Stat Card 2 */}
            <div className="stat-card">
              <div className="stat-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div className="stat-number">{(stats.citations / 1000).toFixed(1)}K<span>+</span></div>
              <div className="stat-label">Research Citations</div>
              <div className="stat-desc">Global citation records across leading indexes</div>
            </div>

            {/* Stat Card 3 */}
            <div className="stat-card">
              <div className="stat-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
              </div>
              <div className="stat-number">{stats.journals}<span>+</span></div>
              <div className="stat-label">Indexed Journals</div>
              <div className="stat-desc">International open-access research databases</div>
            </div>

            {/* Stat Card 4 */}
            <div className="stat-card">
              <div className="stat-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <div className="stat-number">{stats.satisfaction}<span>%</span></div>
              <div className="stat-label">Author Satisfaction</div>
              <div className="stat-desc">Based on feedback surveys from 500+ authors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section style={{ padding: "80px 0", backgroundColor: "white" }}>
        <div className="container" style={{ padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 800, marginBottom: "15px" }}>Why Publish With Griffin?</h2>
            <p style={{ color: "var(--text-light)", maxWidth: "600px", margin: "0 auto" }}>
              We offer world-class academic support services ensuring your manuscript reaches global scientific communities.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
            <div className="card-glass" style={{ textAlign: "center", padding: "40px 30px" }}>
              <div style={{ background: "rgba(223, 31, 55, 0.1)", width: "60px", height: "60px", borderRadius: "50%", display: "flex", alignItems: "center", justifyCenter: "center", margin: "0 auto 20px", color: "var(--primary-color)", justifyContent: "center" }}>
                <ShieldCheck size={32} />
              </div>
              <h3 style={{ fontSize: "20px", marginBottom: "12px", fontWeight: 700 }}>Ethical Standards</h3>
              <p style={{ color: "var(--text-light)" }}>
                Strict adherence to COPE publishing guidelines. Double-blind peer-review workflow ensures high academic integrity.
              </p>
            </div>

            <div className="card-glass" style={{ textAlign: "center", padding: "40px 30px" }}>
              <div style={{ background: "rgba(245, 158, 11, 0.1)", width: "60px", height: "60px", borderRadius: "50%", display: "flex", alignItems: "center", justifyCenter: "center", margin: "0 auto 20px", color: "var(--accent-color)", justifyContent: "center" }}>
                <Award size={32} />
              </div>
              <h3 style={{ fontSize: "20px", marginBottom: "12px", fontWeight: 700 }}>High Impact</h3>
              <p style={{ color: "var(--text-light)" }}>
                Global indexing (Google Scholar, Crossref DOIs) makes your work searchable and citeable by researchers worldwide.
              </p>
            </div>

            <div className="card-glass" style={{ textAlign: "center", padding: "40px 30px" }}>
              <div style={{ background: "rgba(37, 99, 235, 0.1)", width: "60px", height: "60px", borderRadius: "50%", display: "flex", alignItems: "center", justifyCenter: "center", margin: "0 auto 20px", color: "#2563eb", justifyContent: "center" }}>
                <Zap size={32} />
              </div>
              <h3 style={{ fontSize: "20px", marginBottom: "12px", fontWeight: 700 }}>Timely Publication</h3>
              <p style={{ color: "var(--text-light)" }}>
                Fast-track processing routes without compromising peer review quality. Keep your research ahead of schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Showcase CTA */}
      <section style={{ padding: "80px 0", backgroundColor: "var(--bg-light)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 800, marginBottom: "20px", lineHeight: "1.2" }}>
                Supportive Publishing For Researchers Worldwide
              </h2>
              <p style={{ color: "var(--text-light)", marginBottom: "25px", fontSize: "17px" }}>
                We provide a comprehensive framework to assist you from abstract formulation to printing. Submit whole edited books, research chapters, or individual papers to our indexed academic journals.
              </p>
              <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                <Link href="/publish-book" className="btn btn-secondary">
                  Publish Book
                </Link>
                <Link href="/book-store" className="btn btn-outline" style={{ background: "white" }}>
                  Browse Book Store
                </Link>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              {/* Stacked books mockup image with CSS glass frame */}
              <div style={{
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                boxShadow: "var(--box-shadow-hover)",
                border: "6px solid white"
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800" 
                  alt="Academic books"
                  style={{ width: "100%", height: "400px", objectFit: "cover" }}
                />
              </div>
              <div style={{
                position: "absolute",
                bottom: "-20px",
                right: "-20px",
                backgroundColor: "var(--primary-color)",
                color: "white",
                padding: "20px 30px",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--box-shadow)",
                fontWeight: "bold",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "36px", lineHeight: "1" }}>500+</div>
                <div style={{ fontSize: "14px", fontWeight: "normal", opacity: "0.9" }}>Published Authors</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
