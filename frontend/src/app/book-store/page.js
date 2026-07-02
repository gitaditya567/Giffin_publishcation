"use client";

import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { Search, Filter, BookOpen, ShoppingBag, Loader2 } from "lucide-react";

export default function BookStore() {
  const { addToCart, apiUrl } = useApp();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all"); // 'all', 'paperback', 'ebook'
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [addedBookId, setAddedBookId] = useState(null);

  // Fetch books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      let queryParams = [];
      if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
      if (filterType !== "all") queryParams.push(`type=${filterType}`);
      if (category !== "all") queryParams.push(`category=${encodeURIComponent(category)}`);

      const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
      const res = await fetch(`${apiUrl}/books${queryString}`);
      const data = await res.json();
      if (data.success) {
        setBooks(data.data);

        // Extract unique categories for filtering if first load
        if (categories.length === 0) {
          const cats = [...new Set(data.data.map((b) => b.category))];
          setCategories(cats);
        }
      }
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search, filterType, category]);

  const handleAddToCart = (book) => {
    addToCart(book);
    setAddedBookId(book._id);
    setTimeout(() => setAddedBookId(null), 1500);
  };

  return (
    <div className="container">
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 800, color: "var(--secondary-color)", fontFamily: "var(--font-outfit)" }}>
          Academic & Research Book Store
        </h1>
        <p style={{ color: "var(--text-light)", marginTop: "10px", maxWidth: "600px", margin: "10px auto 0" }}>
          Browse our collection of peer-reviewed textbooks, monographs, and research proceedings in printed and digital formats.
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div 
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          background: "white",
          padding: "20px",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--box-shadow)",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative", flex: "1", minWidth: "280px" }}>
          <span style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)", display: "flex" }}>
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search by title, author, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ paddingLeft: "45px" }}
          />
        </div>

        {/* Filter Selection */}
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Filter size={16} style={{ color: "var(--text-light)" }} />
            <span style={{ fontSize: "14px", fontWeight: 500 }}>Filters:</span>
          </div>

          <select
            className="form-control form-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{ width: "150px", padding: "10px 16px" }}
          >
            <option value="all">All Formats</option>
            <option value="paperback">Paperback</option>
            <option value="ebook">E-Book</option>
          </select>

          <select
            className="form-control form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "180px", padding: "10px 16px" }}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Books Grid */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
          <Loader2 className="animate-spin" size={40} style={{ color: "var(--primary-color)" }} />
        </div>
      ) : books.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <BookOpen size={48} style={{ color: "var(--text-light)", marginBottom: "15px" }} />
          <h3>No Books Found</h3>
          <p style={{ color: "var(--text-light)", marginTop: "8px" }}>Try adjusting your search terms or filters.</p>
        </div>
      ) : (
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "30px",
          }}
        >
          {books.map((book) => (
            <div 
              key={book._id} 
              className="card-glass" 
              style={{ 
                padding: "20px",
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between", 
                height: "100%",
                background: "white" 
              }}
            >
              <div>
                {/* Cover Image */}
                <div 
                  style={{
                    height: "220px",
                    width: "100%",
                    borderRadius: "var(--radius-sm)",
                    overflow: "hidden",
                    marginBottom: "15px",
                    position: "relative",
                    background: "#f3f4f6",
                  }}
                >
                  <img
                    src={book.coverImage || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400"}
                    alt={book.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span 
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: book.type === "ebook" ? "var(--accent-color)" : "var(--primary-color)",
                      color: "white",
                      fontSize: "11px",
                      fontWeight: "bold",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      textTransform: "uppercase",
                    }}
                  >
                    {book.type}
                  </span>
                </div>

                {/* Category & Title */}
                <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--primary-color)", textTransform: "uppercase", marginBottom: "5px" }}>
                  {book.category}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "5px", color: "var(--secondary-color)", lineHeight: "1.3" }}>
                  {book.title}
                </h3>
                <div style={{ fontSize: "14px", color: "var(--text-light)", fontStyle: "italic", marginBottom: "12px" }}>
                  By {book.author}
                </div>
                <p style={{ fontSize: "14px", color: "var(--text-light)", lineBreak: "anywhere", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "3", WebkitBoxOrient: "vertical", marginBottom: "20px" }}>
                  {book.description}
                </p>
              </div>

              {/* Price and Button */}
              <div 
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "between",
                  borderTop: "1px solid var(--border-color)",
                  paddingTop: "15px",
                  marginTop: "15px",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: "20px", fontWeight: 800, color: "var(--secondary-color)" }}>
                  ${book.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCart(book)}
                  className="btn btn-primary"
                  style={{
                    padding: "8px 16px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "13px",
                    background: addedBookId === book._id ? "#10b981" : "var(--primary-color)",
                  }}
                >
                  <ShoppingBag size={14} style={{ marginRight: "4px" }} />
                  {addedBookId === book._id ? "Added!" : "Buy Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
