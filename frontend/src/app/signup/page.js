"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";
import { UserPlus, User, Mail, Lock, UserCheck, Loader2 } from "lucide-react";

export default function Signup() {
  const { signup, user } = useApp();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  if (user) {
    router.push("/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const res = await signup(name, email, password, role);
    setLoading(false);

    if (res.success) {
      router.push("/dashboard");
    } else {
      setError(res.error || "Registration failed");
    }
  };

  return (
    <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div className="card-glass" style={{ width: "100%", maxWidth: "480px" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ background: "rgba(223, 31, 55, 0.1)", width: "50px", height: "50px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 15px", color: "var(--primary-color)" }}>
            <UserPlus size={24} />
          </div>
          <h2 style={{ fontSize: "28px", fontWeight: 800 }}>Create Account</h2>
          <p style={{ color: "var(--text-light)", fontSize: "14px", marginTop: "5px" }}>Join Griffin Publication as an author or reader</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)", display: "flex" }}>
                <User size={18} />
              </span>
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Dr. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ paddingLeft: "45px" }}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)", display: "flex" }}>
                <Mail size={18} />
              </span>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="yourname@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: "45px" }}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)", display: "flex" }}>
                <Lock size={18} />
              </span>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: "45px" }}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "25px" }}>
            <label className="form-label" htmlFor="role">Register As</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)", display: "flex" }}>
                <UserCheck size={18} />
              </span>
              <select
                id="role"
                className="form-control form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ paddingLeft: "45px" }}
              >
                <option value="user">Reader / Buyer (User)</option>
                <option value="author">Academic Author / Researcher</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", padding: "14px", borderRadius: "var(--radius-md)" }}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign Up"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--primary-color)", fontWeight: "bold" }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
