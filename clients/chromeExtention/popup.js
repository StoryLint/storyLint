const ANALYZE_URL = "http://localhost:8000/analyze";

const inputText = document.getElementById("inputText");
const sendBtn = document.getElementById("sendBtn");
const copyBtn = document.getElementById("copyBtn");
const status = document.getElementById("status");
const outputText = document.getElementById("outputText");
const errorBox = document.getElementById("errorBox");

function setLoading(isLoading) {
  status.classList.toggle("hidden", !isLoading);
  sendBtn.disabled = isLoading || !inputText.value.trim();
  inputText.disabled = isLoading;
}

function setError(message) {
  if (!message) {
    errorBox.textContent = "";
    errorBox.classList.add("hidden");
    return;
  }
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

function setOutput(text) {
  outputText.textContent = text || "";
  copyBtn.disabled = !text;
}

function sanitizeInput(rawText) {
  if (typeof rawText !== "string") {
    return "";
  }

  return rawText
    .normalize("NFKC")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .replace(/[\u2028\u2029]/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function formatResponse(report) {
  if (Array.isArray(report?.rewrites?.gwt) && report.rewrites.gwt.length > 0) {
    return report.rewrites.gwt.join("\n\n");
  }

  const pattern = report?.pattern ? `Pattern: ${report.pattern}` : "Pattern: Unknown";
  const score = Number.isFinite(report?.score) ? `Score: ${report.score}` : "Score: N/A";
  const issues = Array.isArray(report?.issues) ? report.issues : [];

  if (issues.length === 0) {
    return `${score}\n${pattern}\n\nNo rewrite returned.`;
  }

  const issueLines = issues
    .map((issue, index) => `${index + 1}. ${issue.code ?? "UNKNOWN"}: ${issue.message ?? "No details"}`)
    .join("\n");

  return `${score}\n${pattern}\n\nIssues:\n${issueLines}`;
}

async function handleSend() {
  const text = sanitizeInput(inputText.value);
  if (!text) {
    setError("Enter requirement text before sending.");
    return;
  }

  inputText.value = text;

  setError("");
  setLoading(true);

  try {
    const response = await fetch(ANALYZE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        gwt_required: true
      })
    });

    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`);
    }

    const report = await response.json();
    const rendered = formatResponse(report);
    setOutput(rendered);
  } catch (error) {
    setError(error.message || "Unable to process request.");
  } finally {
    setLoading(false);
  }
}

async function handleCopy() {
  const text = outputText.textContent;
  if (!text) {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "Copied";
    setTimeout(() => {
      copyBtn.textContent = "Copy Text";
    }, 1000);
  } catch (error) {
    setError("Copy failed. Please copy manually.");
  }
}

inputText.addEventListener("input", () => {
  sendBtn.disabled = !inputText.value.trim();
});

sendBtn.addEventListener("click", handleSend);
copyBtn.addEventListener("click", handleCopy);

sendBtn.disabled = true;
setOutput("");
setError("");