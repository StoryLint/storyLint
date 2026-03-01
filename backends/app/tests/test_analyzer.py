import pytest
from app.services.analyzer import analyze_requirement
from app.schemas.request import AnalyzeRequest
from app.schemas.report import CoachingReport

def test_analyze_requirement_basic():
    req = AnalyzeRequest(text="User clicks and system loads", gwt_required=False)
    report = analyze_requirement(req)
    assert isinstance(report, CoachingReport)
    assert report.score == 100 or report.score == 70  # depends on banned phrases
    assert report.pattern.name in ["MultiBehavior", "ScopedAssociation"]
    assert isinstance(report.issues, list)
    assert hasattr(report, "fields")
    assert hasattr(report, "rewrites")
    assert hasattr(report, "questions")
    assert hasattr(report, "versions")

# Add more tests for edge cases, banned phrases, empty text, etc.
