import pytest
from app.rules.engine import run_rules
from app.schemas.enums import IssueCode, Pattern

def test_run_rules_no_banned_phrase():
    result = run_rules("User clicks button")
    assert result["score"] == 100
    assert result["issues"] == []
    assert result["pattern"] == Pattern.ScopedAssociation

def test_run_rules_multi_behavior():
    result = run_rules("User clicks and system loads")
    assert result["pattern"] == Pattern.MultiBehavior

def test_run_rules_banned_phrase(monkeypatch):
    monkeypatch.setattr("app.schemas.validation.BANNED_PHRASES", ["forbidden"])
    result = run_rules("This is forbidden")
    assert result["score"] == 70
    assert any(issue.code == IssueCode.BANNED_PHRASE_ABILITY_TO for issue in result["issues"])
