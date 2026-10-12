"""Fictional well-behaved agent: reads a work ticket queue, drafts replies, a person approves each send."""
import os
from openai import OpenAI
from opentelemetry import trace

OWNER = "owner: Jane Doe (example)"
client = OpenAI(api_key=os.environ["TEAM_BOT_OPENAI_KEY"], timeout=30, max_retries=2)
MODEL = "gpt-4o-mini-2024-07-18"
MAX_STEPS = 8
ALLOWED_DOMAINS = ["support.example.com"]
MONTHLY_BUDGET_USD = 20  # usage alert set in provider console

def draft(ticket):
    return client.chat.completions.create(model=MODEL, max_tokens=400, messages=[{"role": "user", "content": ticket}])

def send_reply(ticket_id, text, dry_run=True):
    if not require_approval(f"Send reply to {ticket_id}?"):
        return "skipped"
    if dry_run:
        return "preview: " + text

def require_approval(question):
    return input(question + " [y/N] ").lower() == "y"
