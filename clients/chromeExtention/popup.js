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

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderInlineBold(text) {
  const escaped = escapeHtml(text);
  return escaped
    .replace(/\*\*([^*\n][^\n]*?)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_\n][^\n]*?)__/g, "<strong>$1</strong>")
    .replace(/(?<!\*)\*([^*\n][^\n]*?)\*(?!\*)/g, "<em>$1</em>")
    .replace(/(?<!_)_([^_\n][^\n]*?)_(?!_)/g, "<em>$1</em>")
    .replace(/(^|\s)\*\*(?=\s|$)/gm, "$1")
    .replace(/(^|\n)(\s*)(given|when|then):/gi, (match, lineStart, indent, keyword) => {
      const titleKeyword = `${keyword.charAt(0).toUpperCase()}${keyword.slice(1).toLowerCase()}`;
      return `${lineStart}${indent}<strong>${titleKeyword}:</strong>`;
    });
}

function setOutput(text) {
  const rawText = text || "";
  outputText.innerHTML = renderInlineBold(rawText);
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

function normalizeWhitespace(text) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "  ")
    .split("\n")
    .map((line) => line.replace(/\s+$/g, ""))
    .join("\n")
    .trim();
}

function stripFormattingChars(text) {
  return text
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s*[*•]\s+/gm, "- ")
    .replace(/^\s*\d+\.\s+/gm, "- ");
}

function beautifyGwtText(rawText) {
  if (typeof rawText !== "string") {
    return "";
  }

  const cleaned = stripFormattingChars(normalizeWhitespace(rawText));

  return cleaned
    .replace(/(^|\s)\*\*(?=\s|$)/gm, "$1")
    .replace(/(^|\s)__(?=\s|$)/gm, "$1")
    .replace(/:\s*\*\*(?=\s|$)/g, ": ")
    .replace(/:\s*__(?=\s|$)/g, ": ")
    .replace(/\b(given)\b\s*:?/gi, "Given: ")
    .replace(/\b(when)\b\s*:?/gi, "\nWhen: ")
    .replace(/\b(then)\b\s*:?/gi, "\nThen: ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function formatIssue(issue, index) {
  const code = issue?.code ?? "UNKNOWN";
  const message = issue?.message ?? "No details";
  const severity = issue?.severity ? ` (${issue.severity})` : "";
  return `- ${index + 1}. ${code}${severity}: ${message}`;
}

function formatResponse(report) {
  if (Array.isArray(report?.rewrites?.gwt) && report.rewrites.gwt.length > 0) {
    const formattedGwt = report.rewrites.gwt
      .map((item) => beautifyGwtText(String(item ?? "")))
      .filter(Boolean)
      .join("\n\n");

    if (formattedGwt) {
      return formattedGwt;
    }
  }

  const pattern = report?.pattern ? `Pattern: ${report.pattern}` : "Pattern: Unknown";
  const score = Number.isFinite(report?.score) ? `Score: ${report.score}` : "Score: N/A";
  const issues = Array.isArray(report?.issues) ? report.issues : [];

  if (issues.length === 0) {
    return `${score}\n${pattern}\n\nNo rewrite returned by API.`;
  }

  const issueLines = issues.map(formatIssue).join("\n");

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