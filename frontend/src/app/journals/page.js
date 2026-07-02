"use client";

import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { BookOpen, Calendar, Award, Globe, FileText, Send, X, Loader2, Upload } from "lucide-react";

export default function Journals() {
  const { apiUrl, token, submitProposal } = useApp();
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Submit modal states
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [abstract, setAbstract] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchJournals = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/journals`);
      const data = await res.json();
      if (data.success) {
        setJournals(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const handleOpenSubmit = (journal) => {
    setSelectedJournal(journal);
    setError("");
    setSuccess("");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitPaper = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    if (!title || !authors || !abstract || !file) {
      setError("Please fill in all fields and upload a file.");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("authors", authors);
    formData.append("abstract", abstract);
    formData.append("type", "journal");
    formData.append("targetPublication", selectedJournal.title);
    formData.append("file", file);

    const res = await submitProposal(formData);
    setSubmitting(false);

    if (res.success) {
      setSuccess("Your research paper was submitted successfully! Redirecting...");
      setTitle("");
      setAuthors("");
      setAbstract("");
      setFile(null);
      setTimeout(() => setSelectedJournal(null), 2000);
    } else {
      setError(res.error || "Paper submission failed");
    }
  };

  return (
    <div className="container">
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 800, color: "var(--secondary-color)", fontFamily: "var(--font-outfit)" }}>
          Indexed Academic Journals
        </h1>
        <p style={{ color: "var(--text-light)", marginTop: "10px", maxWidth: "600px", margin: "10px auto 0" }}>
          Submit your research papers to our peer-reviewed, open-access journals. Track publication stages and indexings.
        </p>
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
          <Loader2 className="animate-spin" size={40} style={{ color: "var(--primary-color)" }} />
        </div>
      ) : journals.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <BookOpen size={48} style={{ color: "var(--text-light)", marginBottom: "15px" }} />
          <h3>No Journals Registered</h3>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px" }}>
          {journals.map((journal) => (
            <div 
              key={journal._id} 
              className="card-glass" 
              style={{ 
                background: "white", 
                padding: "30px", 
                display: "flex",
                flexDirection: "column",
                gap: "20px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "15px" }}>
                <div>
                  <span style={{ background: "rgba(223,31,55,0.1)", color: "var(--primary-color)", padding: "4px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase" }}>
                    ISSN: {journal.issn}
                  </span>
                  <h2 style={{ fontSize: "22px", fontWeight: 800, color: "var(--secondary-color)", marginTop: "8px" }}>
                    {journal.title}
                  </h2>
                </div>
                <div style={{ display: "flex", gap: "15px" }}>
                  <div style={{ textAlign: "center", background: "#f9fafb", padding: "8px 15px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "10px", textTransform: "uppercase", color: "var(--text-light)" }}>Impact Factor</div>
                    <div style={{ fontSize: "18px", fontWeight: "bold", color: "var(--primary-color)" }}>{journal.impactFactor}</div>
                  </div>
                  <div style={{ textAlign: "center", background: "#f9fafb", padding: "8px 15px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "10px", textTransform: "uppercase", color: "var(--text-light)" }}>Frequency</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold" }}>{journal.frequency}</div>
                  </div>
                </div>
              </div>

              <p style={{ color: "var(--text-light)", fontSize: "15px" }}>{journal.description}</p>

              <div>
                <h4 style={{ fontSize: "13px", textTransform: "uppercase", color: "var(--text-dark)", marginBottom: "8px", fontWeight: "bold" }}>Indexed In:</h4>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {journal.indexing.map((idx, index) => (
                    <span key={index} style={{ background: "#f3f4f6", color: "var(--text-dark)", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", border: "1px solid var(--border-color)" }}>
                      {idx}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                {token ? (
                  <button 
                    onClick={() => handleOpenSubmit(journal)}
                    className="btn btn-primary"
                    style={{ padding: "10px 24px" }}
                  >
                    <FileText size={16} /> Submit Research Paper
                  </button>
                ) : (
                  <a href="/login" className="btn btn-outline" style={{ background: "white" }}>
                    Log in to Submit Paper
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paper Submission Modal */}
      {selectedJournal && (
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
            className="card-glass" 
            style={{ 
              width: "100%", 
              maxWidth: "650px", 
              background: "white", 
              padding: "30px", 
              maxHeight: "90vh",
              overflowY: "auto"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid var(--border-color)", paddingBottom: "15px" }}>
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Paper Submission</h3>
                <p style={{ fontSize: "13px", color: "var(--text-light)" }}>Journal: {selectedJournal.title}</p>
              </div>
              <button onClick={() => setSelectedJournal(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={24} />
              </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmitPaper}>
              <div className="form-group">
                <label className="form-label" htmlFor="paper-title">Paper Title</label>
                <input
                  id="paper-title"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Synthesis of Silver Nanoparticles using Eucalyptus Extracts"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="paper-authors">Authors List</label>
                <input
                  id="paper-authors"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Dr. Jane Smith, Prof. Robert Paul"
                  value={authors}
                  onChange={(e) => setAuthors(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="paper-abstract">Abstract</label>
                <textarea
                  id="paper-abstract"
                  rows="5"
                  className="form-control"
                  placeholder="Insert manuscript abstract (min 100 words)..."
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: "25px" }}>
                <label className="form-label" htmlFor="paper-file">Manuscript Document (PDF/DOCX)</label>
                <input
                  id="paper-file"
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", padding: "12px", display: "flex", gap: "8px", justifyContent: "center" }}
                disabled={submitting}
              >
                {submitting ? <Loader2 className="animate-spin" size={20} /> : <><Send size={16} /> Submit Manuscript</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
