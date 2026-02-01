# No phrases are hard-blocked anymore; the analyzer will lean on downstream
# interpretation (e.g., future LLM passes) instead of static filters.
BANNED_PHRASES = []

def contains_banned_phrases(text: str) -> bool:
    t = text.lower()
    return any(p in t for p in BANNED_PHRASES)
