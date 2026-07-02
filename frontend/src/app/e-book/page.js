"use client";

import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { Search, BookOpen, Download, X, Eye, Loader2 } from "lucide-react";

export default function EBookStore() {
  const { addToCart, apiUrl } = useApp();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const defaultEBooks = [
    {
      id: "ebook-1",
      title: "Latest Trends in Multidisciplinary Research & Development (Volume - 3)",
      author: "Dr. MS Dayanandaswamy",
      isbn: "978-93-94375-46-8",
      publishYear: "2023",
      language: "English",
      pages: "188",
      price: 29.99,
      category: "Multidisciplinary",
      coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400",
      description: "A comprehensive volume compiling groundbreaking multidisciplinary research methodologies and technical advancements.",
    },
    {
      id: "ebook-2",
      title: "Modern Academic Writing and Ethical Publishing (Volume - 1)",
      author: "Prof. Clara Higgins",
      isbn: "978-93-89123-12-4",
      publishYear: "2023",
      language: "English",
      pages: "210",
      price: 19.99,
      category: "Academic Writing",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
      description: "An essential textbook outlining standard referencing, plagiarism checks, journal selection guidelines, and revision strategies.",
    },
    {
      id: "ebook-3",
      title: "Sustainable Engineering and Green Energy Frontiers (Volume - 2)",
      author: "Engr. Sarah Connor",
      isbn: "978-93-51204-89-1",
      publishYear: "2024",
      language: "English",
      pages: "245",
      price: 34.50,
      category: "Engineering",
      coverImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=400",
      description: "Peer-reviewed research chapters on photovoltaic tech, smart grids, wind energy conversion systems, and eco-friendly structural design.",
    },
  ];

  const fetchEBooks = async () => {
    setLoading(true);
    try {
      let query = "?type=ebook";
      if (search) query += `&search=${encodeURIComponent(search)}`;

      const res = await fetch(`${apiUrl}/books${query}`);
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        setBooks(data.data);
      } else {
        if (search) {
          const filtered = defaultEBooks.filter(b => 
            b.title.toLowerCase().includes(search.toLowerCase()) || 
            b.author.toLowerCase().includes(search.toLowerCase())
          );
          setBooks(filtered);
        } else {
          setBooks(defaultEBooks);
        }
      }
    } catch (err) {
      console.error("Error fetching ebooks:", err);
      setBooks(defaultEBooks);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEBooks();
  }, [search]);

  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 800, color: "var(--secondary-color)", fontFamily: "var(--font-outfit)" }}>
          Academic E-Book Library
        </h1>
        <p style={{ color: "var(--text-light)", marginTop: "10px", maxWidth: "600px", margin: "10px auto 0" }}>
          Access instantly downloadable digital manuscripts, research volumes, and chapters. Reads perfectly on tablets, laptops, and e-readers.
        </p>
      </div>

      {/* Search Bar */}
      <div 
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--box-shadow)",
          marginBottom: "40px",
          border: "1px solid #e2e8f0",
        }}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <span style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)", display: "flex" }}>
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search digital library by title, editor, key topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ paddingLeft: "45px" }}
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
          <Loader2 className="animate-spin" size={40} style={{ color: "var(--primary-color)" }} />
        </div>
      ) : books.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <BookOpen size={48} style={{ color: "var(--text-light)", marginBottom: "15px" }} />
          <h3>No E-Books Found</h3>
          <p style={{ color: "var(--text-light)" }}>Search for another keyword or topic.</p>
        </div>
      ) : (
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {books.map((book) => (
            <div 
              key={book.id || book._id} 
              className="card-glass card-hover-effect animate-fade-in" 
              style={{ 
                padding: "25px",
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between", 
                height: "100%",
                background: "white",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div>
                <div 
                  style={{
                    height: "220px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    marginBottom: "20px",
                    background: "#f1f5f9",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  }}
                >
                  <img
                    src={book.coverImage || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400"}
                    alt={book.title}
                    className="img-hover-zoom"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* Title */}
                <h3 style={{ fontSize: "17px", fontWeight: 800, marginBottom: "8px", color: "#0f172a", lineHeight: "1.4" }}>
                  📖 {book.title}
                </h3>

                {/* Chief Editor / Author */}
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#475569", marginBottom: "15px" }}>
                  Chief Editor: <span style={{ color: "#0f172a" }}>{book.author || book.editor || "Dr. MS Dayanandaswamy"}</span>
                </div>

                {/* Metadata block matching exact requested format */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", color: "#334155", background: "#f8fafc", padding: "14px 16px", borderRadius: "12px", marginBottom: "20px", border: "1px solid #f1f5f9" }}>
                  <div>📚 <strong>ISBN:</strong> {book.isbn || "978-93-94375-46-8"}</div>
                  <div>📅 <strong>Publish Year:</strong> {book.publishYear || "2023"}</div>
                  <div>🗣 <strong>Language:</strong> {book.language || "English"}</div>
                  <div>📄 <strong>Pages:</strong> {book.pages || "188"}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => setSelectedBook(book)}
                    className="btn btn-primary btn-animate"
                    style={{ flex: 1, padding: "10px", fontSize: "14px", fontWeight: 700, borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                  >
                    <BookOpen size={16} /> Read Now
                  </button>
                  <button
                    onClick={() => addToCart(book)}
                    className="btn btn-outline btn-animate"
                    style={{ flex: 1, padding: "10px", fontSize: "14px", fontWeight: 600, borderRadius: "25px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "white", borderColor: "#cbd5e1" }}
                  >
                    <Download size={15} /> Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* E-Book PDF Preview Reader Modal */}
      {selectedBook && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(5px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div 
            className="card-glass animate-fade-in" 
            style={{ 
              width: "100%", 
              maxWidth: "750px", 
              height: "85vh", 
              background: "white", 
              padding: "0", 
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              borderRadius: "20px",
            }}
          >
            {/* Header */}
            <div 
              style={{ 
                padding: "20px 25px", 
                borderBottom: "1px solid var(--border-color)", 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                background: "#0f172a",
                color: "white"
              }}
            >
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>📖 {selectedBook.title}</h3>
                <p style={{ fontSize: "13px", color: "#cbd5e1" }}>Chief Editor: {selectedBook.author || selectedBook.editor} | ISBN: {selectedBook.isbn || "978-93-94375-46-8"}</p>
              </div>
              <button 
                onClick={() => setSelectedBook(null)}
                style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", padding: "6px", cursor: "pointer", color: "white" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Document Reader Area */}
            <div style={{ flex: 1, overflowY: "auto", padding: "40px 20px", backgroundColor: "#f3f4f6", fontFamily: "Georgia, serif" }}>
              <div 
                style={{ 
                  background: "white", 
                  padding: "40px", 
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)", 
                  maxWidth: "650px", 
                  margin: "0 auto",
                  minHeight: "100%",
                  borderRadius: "12px",
                }}
              >
                <h2 style={{ textAlign: "center", fontSize: "24px", marginBottom: "10px", color: "#0f172a" }}>{selectedBook.title}</h2>
                <div style={{ textAlign: "center", fontStyle: "italic", marginBottom: "30px", color: "#64748b" }}>Chief Editor: {selectedBook.author || selectedBook.editor}</div>
                
                <div style={{ background: "#f8fafc", padding: "15px 20px", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "30px", fontFamily: "sans-serif", fontSize: "14px", color: "#334155" }}>
                  <div>📚 <strong>ISBN:</strong> {selectedBook.isbn || "978-93-94375-46-8"}</div>
                  <div>📅 <strong>Publish Year:</strong> {selectedBook.publishYear || "2023"}</div>
                  <div>🗣 <strong>Language:</strong> {selectedBook.language || "English"}</div>
                  <div>📄 <strong>Pages:</strong> {selectedBook.pages || "188"}</div>
                </div>

                <h3 style={{ fontSize: "18px", marginTop: "20px", marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "5px", color: "#0f172a" }}>
                  Volume Introduction & Overview
                </h3>
                <p style={{ textIndent: "2em", marginBottom: "20px", lineHeight: "1.8", color: "#374151" }}>
                  This multidisciplinary volume compiles pioneer studies across emerging domains. Designed for academic scholars, researchers, and university faculties, each paper undergoes double-blind peer reviews to uphold rigorous standards of research methodology and empirical data validation.
                </p>
                <p style={{ textIndent: "2em", marginBottom: "20px", lineHeight: "1.8", color: "#374151" }}>
                  The topics span contemporary technological solutions, pedagogical enhancements in modern education, socio-economic impact analyses, and sustainable green engineering models.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div 
              style={{ 
                padding: "20px 25px", 
                borderTop: "1px solid var(--border-color)", 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                background: "white" 
              }}
            >
              <span style={{ fontSize: "14px", color: "var(--text-light)" }}>Full access available upon download/purchase.</span>
              <button
                onClick={() => {
                  addToCart(selectedBook);
                  setSelectedBook(null);
                }}
                className="btn btn-primary btn-animate"
                style={{ padding: "10px 24px", borderRadius: "25px", fontWeight: 700 }}
              >
                Download Full E-Book (${selectedBook.price ? selectedBook.price.toFixed(2) : "29.99"})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
