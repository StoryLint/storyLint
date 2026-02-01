from fastapi import FastAPI
from app.schemas.request import AnalyzeRequest
from app.schemas.report import CoachingReport
from app.services.analyzer import analyze_requirement

app = FastAPI(title="Requirements Coach")

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/analyze", response_model=CoachingReport)
def analyze(req: AnalyzeRequest):
    return analyze_requirement(req)
