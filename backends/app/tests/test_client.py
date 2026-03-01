import os
import pytest
from app.llm.client import LLMClient

def test_llmclient_missing_env(monkeypatch):
    monkeypatch.delenv("LLM_API_KEY", raising=False)
    monkeypatch.delenv("LLM_MODEL", raising=False)
    monkeypatch.delenv("LLM_ENDPOINT", raising=False)
    client = LLMClient.from_env()
    result = client.generate("sys", "user")
    assert result is None

def test_llmclient_missing_api_key(monkeypatch):
    monkeypatch.setenv("LLM_MODEL", "test-model")
    monkeypatch.setenv("LLM_ENDPOINT", "http://localhost")
    monkeypatch.delenv("LLM_API_KEY", raising=False)
    client = LLMClient.from_env()
    result = client.generate("sys", "user")
    assert result is None

def test_llmclient_missing_model(monkeypatch):
    monkeypatch.setenv("LLM_API_KEY", "test-key")
    monkeypatch.setenv("LLM_ENDPOINT", "http://localhost")
    monkeypatch.delenv("LLM_MODEL", raising=False)
    client = LLMClient.from_env()
    result = client.generate("sys", "user")
    assert result is None

def test_llmclient_missing_endpoint(monkeypatch):
    monkeypatch.setenv("LLM_API_KEY", "test-key")
    monkeypatch.setenv("LLM_MODEL", "test-model")
    monkeypatch.delenv("LLM_ENDPOINT", raising=False)
    client = LLMClient.from_env()
    result = client.generate("sys", "user")
    assert result is None
