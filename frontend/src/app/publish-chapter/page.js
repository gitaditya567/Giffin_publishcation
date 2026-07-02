"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";
import { Upload, Send, HelpCircle, Loader2 } from "lucide-react";

export default function PublishChapter() {
  const { token, user, submitProposal } = useApp();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [abstract, setAbstract] = useState("");
  const [targetPublication, setTargetPublication] = useState("Advances in Biotechnology - Vol II");
  const [file, setFile] = useState(null);
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div className="container" style={{ textAlign: "center", padding: "80px 20px" }}>
        <HelpCircle size={48} style={{ color: "var(--primary-color)", marginBottom: "15px" }} />
        <h2>Authentication Required</h2>
        <p style={{ color: "var(--text-light)", margin: "10px 0 25px" }}>
          You must log in to submit a book chapter or track manuscript reviews.
        </p>
        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <button onClick={() => router.push("/login")} className="btn btn-primary">Log In</button>
          <button onClick={() => router.push("/signup")} className="btn btn-outline" style={{ background: "white" }}>Sign Up</button>
        </div>
      </div>
    );
  }

  if (user && user.role !== "author" && user.role !== "admin") {
    return (
      <div className="container" style={{ textAlign: "center", padding: "80px 20px" }}>
        <HelpCircle size={48} style={{ color: "var(--primary-color)", marginBottom: "15px" }} />
        <h2>Author Account Needed</h2>
        <p style={{ color: "var(--text-light)", margin: "10px 0 25px" }}>
          To publish research chapters, please sign up as an Author.
        </p>
      </div>
    );
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!title || !authors || !abstract || !file) {
      setError("Please fill in all fields and upload a file.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("authors", authors);
    formData.append("abstract", abstract);
    formData.append("type", "chapter");
    formData.append("targetPublication", targetPublication);
    formData.append("file", file);

    const res = await submitProposal(formData);
    setLoading(false);

    if (res.success) {
      setSuccess("Your chapter proposal has been successfully submitted to the edited book compilation!");
      setTitle("");
      setAuthors("");
      setAbstract("");
      setFile(null);
      const fileInput = document.getElementById("chapter-file");
      if (fileInput) fileInput.value = "";
    } else {
      setError(res.error || "Submission failed");
    }
  };

  return (
    <div className="container">
      <div style={{ maxWidth: "750px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: 800, color: "var(--secondary-color)", fontFamily: "var(--font-outfit)" }}>
            Submit Book Chapter
          </h1>
          <p style={{ color: "var(--text-light)", marginTop: "10px" }}>
            Submit your research chapter drafts for peer-reviewed academic multi-author books.
          </p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="card-glass" style={{ background: "white" }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="title">Proposed Chapter Title</label>
              <input
                id="title"
                type="text"
                className="form-control"
                placeholder="e.g. Chapter 3: CRISPR Case Studies in Agriculture"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="authors">Chapter Authors</label>
              <input
                id="authors"
                type="text"
                className="form-control"
                placeholder="e.g. Dr. Jennifer Doudna, Dr. Sarah Connor"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="targetPub">Select Target Edited Book</label>
              <select
                id="targetPub"
                className="form-control form-select"
                value={targetPublication}
                onChange={(e) => setTargetPublication(e.target.value)}
              >
                <option value="Advances in Biotechnology - Vol II">Advances in Biotechnology - Vol II</option>
                <option value="Smart Materials and Systems Compendium">Smart Materials and Systems Compendium</option>
                <option value="Socio-Economic Policies in the 21st Century">Socio-Economic Policies in the 21st Century</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="abstract">Chapter Abstract</label>
              <textarea
                id="abstract"
                rows="6"
                className="form-control"
                placeholder="Detail key hypotheses, empirical methodologies, findings, and target conclusion in under 300 words."
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: "30px" }}>
              <label className="form-label" htmlFor="chapter-file">Chapter Draft (PDF or DOCX)</label>
              <div 
                style={{
                  border: "2px dashed var(--border-color)",
                  borderRadius: "var(--radius-md)",
                  padding: "30px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: "#f9fafb",
                  transition: "var(--transition)",
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  setFile(e.dataTransfer.files[0]);
                }}
              >
                <Upload size={32} style={{ color: "var(--text-light)", marginBottom: "10px" }} />
                <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                  {file ? file.name : "Drag & drop file here, or click to choose"}
                </p>
                <p style={{ fontSize: "12px", color: "var(--text-light)", marginTop: "5px" }}>
                  Supported formats: PDF, DOC, DOCX. Max: 10MB.
                </p>
                <input
                  id="chapter-file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  style={{ display: "none" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("chapter-file").click()}
                  className="btn btn-outline"
                  style={{ padding: "6px 16px", marginTop: "15px", background: "white", fontSize: "13px" }}
                >
                  Browse Files
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "14px", display: "flex", gap: "8px", justifyContent: "center" }}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <><Send size={16} /> Submit Chapter</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
