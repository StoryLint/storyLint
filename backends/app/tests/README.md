# Tests for Analyzer and Related Modules

This directory contains unit and integration tests for the backend application modules, including:
- Analyzer logic
- LLM client
- Rule engine and patterns
- Schemas and validation
- Services (analyzer, questions, scoring)
- Storage models and repository

## How to Run Tests

1. Activate the Python virtual environment:
   ```bash
   source ../../.venv/bin/activate
   ```
2. Run tests using pytest:
   ```bash
   pytest
   ```
   Or run a specific test file:
   ```bash
   pytest test_analyzer.py
   ```

## Adding New Tests
- Place new test files in this directory.
- Name test files with the `test_` prefix (e.g., `test_newfeature.py`).
- Use descriptive test function names.

## Test Coverage
Tests should cover:
- Core logic and edge cases
- Error handling
- Integration between modules

## Contact
For questions, contact the backend maintainers.
