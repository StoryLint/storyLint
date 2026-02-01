from app.schemas.enums import IssueCode, Pattern
from app.schemas.report import Issue, ExtractedFields
from app.schemas.validation import contains_banned_phrases

def run_rules(text: str):
    issues = []
    score = 100

    if contains_banned_phrases(text):
        issues.append(Issue(
            code=IssueCode.BANNED_PHRASE_ABILITY_TO,
            message="Non-testable phrase used",
            severity="high"
        ))
        score -= 30

    fields = ExtractedFields()
    pattern = Pattern.MultiBehavior if "and" in text.lower() else Pattern.ScopedAssociation

    return {
        "issues": issues,
        "score": max(score, 0),
        "pattern": pattern,
        "fields": fields
    }
