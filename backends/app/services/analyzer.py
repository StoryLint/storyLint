from uuid import uuid4
from app.schemas.request import AnalyzeRequest
from app.schemas.report import CoachingReport, Rewrites
from app.rules.engine import run_rules
from app.services.questions import generate_questions
from app.llm.client import LLMClient
from app.llm.prompts import ACTIVE_GWT_SYSTEM_PROMPT, build_active_gwt_user_prompt

_llm_client = LLMClient.from_env()

def analyze_requirement(req: AnalyzeRequest) -> CoachingReport:
    rule_out = run_rules(req.text)

    questions = []
    rewrites = Rewrites()

    if rule_out["score"] < 70:
        questions = generate_questions()

    if req.text.strip():
        rewrite = _llm_client.generate(
            system_prompt=ACTIVE_GWT_SYSTEM_PROMPT,
            user_prompt=build_active_gwt_user_prompt(req.text),
        )
        if rewrite:
            rewrites.gwt = [rewrite]

    return CoachingReport(
        report_id=uuid4(),
        score=rule_out["score"],
        pattern=rule_out["pattern"],
        issues=rule_out["issues"],
        fields=rule_out["fields"],
        rewrites=rewrites,
        questions=questions,
        versions={
            "ruleset": "0.1.0",
            "schema": "coach-1"
        }
    )
