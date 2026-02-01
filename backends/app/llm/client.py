import logging
import os
from typing import Optional

import httpx


_log = logging.getLogger(__name__)


class LLMClient:
	"""Minimal wrapper for a fast completion API."""

	def __init__(self, api_key: Optional[str], model: str, endpoint: str):
		self.api_key = api_key
		self.model = model
		self.endpoint = endpoint.rstrip("/")

	@classmethod
	def from_env(cls) -> "LLMClient":
		return cls(
			api_key=os.getenv("LLM_API_KEY"),
			model=os.getenv("LLM_MODEL", "gpt-4o-mini"),
			endpoint=os.getenv("LLM_ENDPOINT", "https://api.openai.com/v1/chat/completions"),
		)

	def generate(self, system_prompt: str, user_prompt: str, timeout: float = 30.0) -> Optional[str]:
		if not self.api_key:
			_log.warning("LLM_API_KEY missing; skipping rewrite")
			return None

		payload = {
			"model": self.model,
			"messages": [
				{"role": "system", "content": system_prompt},
				{"role": "user", "content": user_prompt},
			],
			"temperature": 0.2,
			"max_tokens": 900,
		}

		headers = {
			"Authorization": f"Bearer {self.api_key}",
			"Content-Type": "application/json",
		}

		try:
			with httpx.Client(timeout=timeout) as client:
				response = client.post(self.endpoint, json=payload, headers=headers)
				response.raise_for_status()
				data = response.json()
		except httpx.HTTPError as exc:
			_log.warning("LLM call failed", exc_info=exc)
			return None

		choices = data.get("choices") or []
		if not choices:
			_log.warning("LLM returned no choices: %s", data)
			return None

		message = choices[0].get("message") or {}
		return message.get("content")
