"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";
import { 
  LayoutDashboard, FileText, ShoppingBag, Mail, Check, X, 
  Loader2, ExternalLink, MessageSquare, BookOpen, UserPlus 
} from "lucide-react";

export default function Dashboard() {
  const { user, token, getMySubmissions, getAllSubmissions, updateSubmissionStatus, getOrders, apiUrl } = useApp();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("submissions"); // 'submissions', 'orders', 'messages' (admin only)
  const [submissions, setSubmissions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(null); // ID of submission being reviewed
  const [reviewStatus, setReviewStatus] = useState("under-review");
  const [reviewComments, setReviewComments] = useState("");

  const loadDashboardData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      if (user?.role === "admin") {
        // Load admin submissions, orders, and contact inquiries
        const subs = await getAllSubmissions();
        setSubmissions(subs);
        
        const ords = await getOrders();
        setOrders(ords);

        // Fetch contact messages
        const msgRes = await fetch(`${apiUrl}/contacts`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const msgData = await msgRes.json();
        if (msgData.success) {
          setMessages(msgData.data);
        }
      } else {
        // Load author submissions and orders
        const subs = await getMySubmissions();
        setSubmissions(subs);

        const ords = await getOrders();
        setOrders(ords);
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    loadDashboardData();
  }, [token, user]);

  const handleReviewSubmit = async (e, submissionId) => {
    e.preventDefault();
    try {
      const res = await updateSubmissionStatus(submissionId, reviewStatus, reviewComments);
      if (res.success) {
        setSubmittingReview(null);
        setReviewComments("");
        // Reload
        loadDashboardData();
      } else {
        alert(res.error || "Review update failed.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
        <Loader2 className="animate-spin" size={40} style={{ color: "var(--primary-color)" }} />
      </div>
    );
  }

  return (
    <div className="container">
      {/* Welcome Banner */}
      <div 
        style={{
          background: "linear-gradient(135deg, var(--secondary-color), #374151)",
          color: "white",
          padding: "30px 40px",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--box-shadow)",
          marginBottom: "40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px"
        }}
      >
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800 }}>Welcome, {user.name}</h1>
          <p style={{ opacity: 0.8, fontSize: "14px", marginTop: "5px" }}>
            Role: <strong style={{ textTransform: "capitalize", color: "var(--primary-color)" }}>{user.role}</strong> | Portal ID: {user.id}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {user.role !== "user" && (
            <button onClick={() => router.push("/publish-chapter")} className="btn btn-primary" style={{ padding: "10px 20px" }}>
              Submit Chapter
            </button>
          )}
        </div>
      </div>

      {/* Dashboard Sub-tabs */}
      <div 
        style={{ 
          display: "flex", 
          borderBottom: "2px solid var(--border-color)", 
          marginBottom: "30px",
          gap: "10px" 
        }}
      >
        <button
          onClick={() => setActiveTab("submissions")}
          style={{
            background: "none",
            border: "none",
            borderBottom: activeTab === "submissions" ? "3px solid var(--primary-color)" : "3px solid transparent",
            color: activeTab === "submissions" ? "var(--primary-color)" : "var(--text-light)",
            padding: "12px 20px",
            fontSize: "15px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <FileText size={18} /> Submissions
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          style={{
            background: "none",
            border: "none",
            borderBottom: activeTab === "orders" ? "3px solid var(--primary-color)" : "3px solid transparent",
            color: activeTab === "orders" ? "var(--primary-color)" : "var(--text-light)",
            padding: "12px 20px",
            fontSize: "15px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <ShoppingBag size={18} /> Bookstore Orders
        </button>

        {user.role === "admin" && (
          <button
            onClick={() => setActiveTab("messages")}
            style={{
              background: "none",
              border: "none",
              borderBottom: activeTab === "messages" ? "3px solid var(--primary-color)" : "3px solid transparent",
              color: activeTab === "messages" ? "var(--primary-color)" : "var(--text-light)",
              padding: "12px 20px",
              fontSize: "15px",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <Mail size={18} /> Inquiries Messages
          </button>
        )}
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
          <Loader2 className="animate-spin" size={40} style={{ color: "var(--primary-color)" }} />
        </div>
      ) : (
        <>
          {/* Submissions Tab */}
          {activeTab === "submissions" && (
            <div>
              {submissions.length === 0 ? (
                <div className="card-glass" style={{ background: "white", textAlign: "center", padding: "60px 20px" }}>
                  <FileText size={48} style={{ color: "var(--text-light)", marginBottom: "15px" }} />
                  <h3>No Submissions Found</h3>
                  <p style={{ color: "var(--text-light)", marginTop: "8px" }}>
                    {user.role === "admin" ? "Authors have not proposed any papers yet." : "You have not submitted any manuscripts or chapters."}
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Title / Format</th>
                        {user.role === "admin" && <th>Submitted By</th>}
                        <th>Authors</th>
                        <th>Target Pub</th>
                        <th>Status</th>
                        <th>File / Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((sub) => (
                        <tr key={sub._id}>
                          <td>
                            <div style={{ fontWeight: "bold" }}>{sub.title}</div>
                            <div style={{ fontSize: "11px", color: "var(--text-light)", textTransform: "uppercase", marginTop: "2px" }}>
                              {sub.type} &bull; {new Date(sub.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          {user.role === "admin" && (
                            <td>
                              <div>{sub.submittedBy?.name}</div>
                              <div style={{ fontSize: "12px", color: "var(--text-light)" }}>{sub.submittedBy?.email}</div>
                            </td>
                          )}
                          <td>{sub.authors}</td>
                          <td>{sub.targetPublication}</td>
                          <td>
                            <span className={`status-badge ${sub.status}`}>
                              {sub.status.replace("-", " ")}
                            </span>
                            {sub.adminComments && (
                              <div style={{ fontSize: "12px", color: "var(--text-light)", marginTop: "5px", fontStyle: "italic" }}>
                                Note: {sub.adminComments}
                              </div>
                            )}
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                              <a 
                                href={`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}${sub.fileUrl}`} 
                                target="_blank" 
                                className="btn btn-outline" 
                                style={{ padding: "6px 12px", fontSize: "12px", display: "inline-flex", gap: "4px" }}
                              >
                                <ExternalLink size={12} /> View File
                              </a>
                              {user.role === "admin" && (
                                <button 
                                  onClick={() => {
                                    setSubmittingReview(sub._id);
                                    setReviewStatus(sub.status);
                                    setReviewComments(sub.adminComments || "");
                                  }}
                                  className="btn btn-secondary" 
                                  style={{ padding: "6px 12px", fontSize: "12px" }}
                                >
                                  Review
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div>
              {orders.length === 0 ? (
                <div className="card-glass" style={{ background: "white", textAlign: "center", padding: "60px 20px" }}>
                  <ShoppingBag size={48} style={{ color: "var(--text-light)", marginBottom: "15px" }} />
                  <h3>No Orders Found</h3>
                  <p style={{ color: "var(--text-light)", marginTop: "8px" }}>
                    Your purchase history is empty.
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Order ID / Date</th>
                        {user.role === "admin" && <th>Customer</th>}
                        <th>Items</th>
                        <th>Total Amount</th>
                        <th>Payment Status</th>
                        <th>Delivery Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>
                            <div style={{ fontWeight: "bold", fontSize: "13px" }}>#{order._id}</div>
                            <div style={{ fontSize: "11px", color: "var(--text-light)", marginTop: "2px" }}>
                              {new Date(order.createdAt).toLocaleString()}
                            </div>
                          </td>
                          {user.role === "admin" && (
                            <td>
                              <div>{order.user?.name}</div>
                              <div style={{ fontSize: "12px", color: "var(--text-light)" }}>{order.user?.email}</div>
                            </td>
                          )}
                          <td>
                            <ul style={{ paddingLeft: "15px", margin: 0, fontSize: "13px" }}>
                              {order.items.map((it, idx) => (
                                <li key={idx}>
                                  {it.book?.title} ({it.book?.type}) x {it.quantity}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td style={{ fontWeight: "bold" }}>${order.totalAmount.toFixed(2)}</td>
                          <td>
                            <span className="status-badge accepted" style={{ fontSize: "10px", padding: "4px 8px" }}>
                              {order.paymentStatus}
                            </span>
                          </td>
                          <td>
                            <span 
                              className="status-badge" 
                              style={{ 
                                fontSize: "10px", 
                                padding: "4px 8px",
                                backgroundColor: order.orderStatus === "delivered" ? "#d1fae5" : "#fef3c7",
                                color: order.orderStatus === "delivered" ? "#059669" : "#d97706"
                              }}
                            >
                              {order.orderStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Admin Inquiries Tab */}
          {activeTab === "messages" && user.role === "admin" && (
            <div>
              {messages.length === 0 ? (
                <div className="card-glass" style={{ background: "white", textAlign: "center", padding: "60px 20px" }}>
                  <Mail size={48} style={{ color: "var(--text-light)", marginBottom: "15px" }} />
                  <h3>No Messages Found</h3>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {messages.map((msg) => (
                    <div key={msg._id} className="card-glass" style={{ background: "white", padding: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
                        <div>
                          <strong style={{ fontSize: "16px" }}>{msg.name}</strong> ({msg.email})
                          <div style={{ fontSize: "13px", color: "var(--primary-color)", marginTop: "2px" }}>Subject: {msg.subject}</div>
                        </div>
                        <span style={{ fontSize: "12px", color: "var(--text-light)" }}>
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p style={{ fontSize: "14px", color: "var(--text-dark)", whiteSpace: "pre-wrap" }}>{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Admin Review Popup Modal */}
      {submittingReview && (
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
          <div className="card-glass" style={{ width: "100%", maxWidth: "500px", background: "white", padding: "30px" }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "20px" }}>Publishing Review Form</h3>
            
            <form onSubmit={(e) => handleReviewSubmit(e, submittingReview)}>
              <div className="form-group">
                <label className="form-label" htmlFor="review-status">Review Decision</label>
                <select
                  id="review-status"
                  className="form-control form-select"
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="under-review">Under Review</option>
                  <option value="accepted">Accepted / Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: "25px" }}>
                <label className="form-label" htmlFor="review-comments">Reviewer Feedback & Comments</label>
                <textarea
                  id="review-comments"
                  rows="4"
                  className="form-control"
                  placeholder="Provide feedback details for the authors..."
                  value={reviewComments}
                  onChange={(e) => setReviewComments(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button 
                  type="button" 
                  onClick={() => setSubmittingReview(null)}
                  className="btn btn-outline"
                  style={{ padding: "8px 16px" }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ padding: "8px 20px" }}
                >
                  Save Decision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
