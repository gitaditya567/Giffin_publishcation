"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "../../context/AppContext";
import { Trash2, ShoppingCart, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

export default function Cart() {
  const { cart, token, updateCartQuantity, removeFromCart, checkoutCart } = useApp();

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("India");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 5.0 : 0;
  const total = subtotal + shipping;

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!token) {
      setError("Please log in to finalize your purchase.");
      setLoading(false);
      return;
    }

    if (!street || !city || !state || !zipCode) {
      setError("Please complete all fields in your shipping address.");
      setLoading(false);
      return;
    }

    const shippingAddress = { street, city, state, zipCode, country };
    const res = await checkoutCart(shippingAddress);
    setLoading(false);

    if (res.success) {
      setSuccess("Order placed successfully! Thank you for purchasing from Griffin Publication.");
    } else {
      setError(res.error || "Order checkout failed.");
    }
  };

  if (success) {
    return (
      <div className="container" style={{ textAlign: "center", padding: "80px 20px" }}>
        <CheckCircle size={64} style={{ color: "#10b981", marginBottom: "20px" }} />
        <h2>Purchase Complete!</h2>
        <p style={{ color: "var(--text-light)", margin: "10px 0 30px", maxWidth: "500px", marginLeft: "auto", marginRight: "auto" }}>
          {success} Your books will be prepared for delivery shortly. If you purchased E-Books, download links are active in your author dashboard under Orders.
        </p>
        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <Link href="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
          <Link href="/book-store" className="btn btn-outline" style={{ background: "white" }}>Back to Book Store</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container" style={{ textAlign: "center", padding: "80px 20px" }}>
        <ShoppingCart size={48} style={{ color: "var(--text-light)", marginBottom: "15px" }} />
        <h2>Your Cart is Empty</h2>
        <p style={{ color: "var(--text-light)", margin: "10px 0 25px" }}>
          Browse our book store or e-book library to find your next academic read.
        </p>
        <Link href="/book-store" className="btn btn-primary">
          <ArrowLeft size={16} /> Go to Book Store
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ fontSize: "36px", fontWeight: 800, marginBottom: "30px", fontFamily: "var(--font-outfit)" }}>
        Shopping Cart
      </h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr", gap: "40px" }}>
        {/* Cart items list */}
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {cart.map((item) => (
              <div 
                key={item.book._id} 
                className="card-glass" 
                style={{ 
                  background: "white", 
                  padding: "20px", 
                  display: "flex", 
                  gap: "20px",
                  alignItems: "center",
                  flexWrap: "wrap"
                }}
              >
                <div style={{ width: "80px", height: "100px", borderRadius: "4px", overflow: "hidden", background: "#eee", flexShrink: 0 }}>
                  <img 
                    src={item.book.coverImage} 
                    alt={item.book.title} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: "200px" }}>
                  <span style={{ fontSize: "11px", fontWeight: "bold", background: "#f3f4f6", padding: "2px 8px", borderRadius: "10px", textTransform: "uppercase" }}>
                    {item.book.type}
                  </span>
                  <h3 style={{ fontSize: "16px", fontWeight: "bold", marginTop: "5px", color: "var(--secondary-color)" }}>
                    {item.book.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-light)" }}>By {item.book.author}</p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
                  {/* Quantity controls */}
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-color)", borderRadius: "6px", overflow: "hidden" }}>
                    <button 
                      onClick={() => updateCartQuantity(item.book._id, item.quantity - 1)}
                      style={{ padding: "4px 10px", border: "none", background: "#f9fafb", cursor: "pointer" }}
                    >
                      -
                    </button>
                    <span style={{ padding: "0 12px", fontSize: "14px", fontWeight: "bold" }}>{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.book._id, item.quantity + 1)}
                      style={{ padding: "4px 10px", border: "none", background: "#f9fafb", cursor: "pointer" }}
                    >
                      +
                    </button>
                  </div>

                  <span style={{ fontWeight: "bold", fontSize: "16px", minWidth: "70px", textAlign: "right" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  <button 
                    onClick={() => removeFromCart(item.book._id)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626" }}
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Summary Form */}
        <div>
          <div className="card-glass" style={{ background: "white", position: "sticky", top: "120px" }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "20px", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
              Order Summary
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", color: "var(--text-dark)", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Simulated Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "18px", borderTop: "1px solid var(--border-color)", paddingTop: "12px", color: "var(--secondary-color)" }}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Address fields */}
            <form onSubmit={handleCheckout}>
              <h4 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "12px", color: "var(--text-dark)" }}>Shipping Details</h4>
              
              <div className="form-group" style={{ marginBottom: "12px" }}>
                <input
                  type="text"
                  placeholder="Street Address"
                  className="form-control"
                  style={{ padding: "8px 12px", fontSize: "13px" }}
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                <input
                  type="text"
                  placeholder="City"
                  className="form-control"
                  style={{ padding: "8px 12px", fontSize: "13px" }}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="State"
                  className="form-control"
                  style={{ padding: "8px 12px", fontSize: "13px" }}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "10px", marginBottom: "20px" }}>
                <input
                  type="text"
                  placeholder="ZIP / Postal Code"
                  className="form-control"
                  style={{ padding: "8px 12px", fontSize: "13px" }}
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Country"
                  className="form-control"
                  style={{ padding: "8px 12px", fontSize: "13px" }}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>

              {token ? (
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "12px" }}
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : "Simulate Payment & Order"}
                </button>
              ) : (
                <Link href="/login" className="btn btn-secondary" style={{ width: "100%", textAlign: "center" }}>
                  Log In to Checkout
                </Link>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
