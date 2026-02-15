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
  const text = inputText.value.trim();
  if (!text) {
    setError("Enter requirement text before sending.");
    return;
  }

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