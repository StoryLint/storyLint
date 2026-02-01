from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Literal
from uuid import UUID
from .enums import Pattern, IssueCode

class Issue(BaseModel):
    code: IssueCode
    message: str
    severity: Literal["low","medium","high"]

class FieldValue(BaseModel):
    value: Optional[str] = None
    confidence: float = Field(ge=0.0, le=1.0)

class ExtractedFields(BaseModel):
    actor: FieldValue = Field(default_factory=lambda: FieldValue(confidence=0))
    trigger: FieldValue = Field(default_factory=lambda: FieldValue(confidence=0))
    behavior: FieldValue = Field(default_factory=lambda: FieldValue(confidence=0))
    end_condition: FieldValue = Field(default_factory=lambda: FieldValue(confidence=0))

class Rewrites(BaseModel):
    plain: List[str] = []
    gwt: List[str] = []
    qa_assertions: List[str] = []

class Question(BaseModel):
    key: str
    ask: str
    choices: Optional[List[str]] = None

class CoachingReport(BaseModel):
    report_id: UUID
    score: int
    pattern: Pattern
    issues: List[Issue]
    fields: ExtractedFields
    rewrites: Rewrites
    questions: List[Question] = []
    versions: Dict[str, str]
