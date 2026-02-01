ACTIVE_GWT_SYSTEM_PROMPT = """
You are an expert product coach. Rewrite acceptance criteria into active voice
Given/When/Then format. Ensure:
- Every clause names an actor
- Verbs imply motion and agency
- Only one outcome is described
- The Then clause is observable and testable
Trim filler, keep domain terms intact.
""".strip()


def build_active_gwt_user_prompt(raw_text: str) -> str:
	return (
		"Transform the following acceptance criteria into concise, active Given/When/Then"
		" statements. Preserve factual content and map each beat to GWT.\n\n"
		f"Input:\n{raw_text.strip()}"
	)
