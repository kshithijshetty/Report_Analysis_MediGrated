import { useState } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setError("");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/analyze`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.error) {
        setError(response.data.details || response.data.error);
        setAnalysis("");
        setOcrText("");
      } else {
        setAnalysis(response.data.analysis || "");
        setOcrText(response.data.ocr_text || "");
      }
    } catch (err) {
      setError(
        err.response?.data?.details || err.message || "Error analyzing report."
      );
      setAnalysis("");
      setOcrText("");
    }

    setLoading(false);
  };

  return (
    <div className="app-root">
      <div className="container">
        <header className="header">
          <h1>Medical Report Analyzer</h1>
          <p className="subtitle">Fast OCR + AI-driven analysis</p>
        </header>

        <section className="uploader">
          <div className="file-input">
            <input
              id="file"
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file" className="file-label">
              {file ? file.name : "Choose a PDF or image file"}
            </label>
          </div>

          <div className="actions">
            <button className="primary" onClick={handleUpload} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Report"}
            </button>
          </div>

          {error && <div className="error">{error}</div>}
        </section>

        <section className="results">
          <div className="pane">
            <h2>Extracted Text (OCR)</h2>
            <pre className="ocr-box">{ocrText || "No OCR output yet."}</pre>
          </div>

          <div className="pane">
            <h2>AI Analysis</h2>
            <pre className="analysis-box">{analysis || "No analysis yet."}</pre>
          </div>
        </section>

        <footer className="footer">Disclaimer: This tool is for informational purposes only. Consult a licensed doctor for medical advice.</footer>
      </div>
    </div>
  );
}

export default App;
