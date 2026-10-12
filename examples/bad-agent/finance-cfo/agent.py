import os
from openai import OpenAI
from slack_sdk import WebClient

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
slack = WebClient(token=os.environ["SLACK_BOT_TOKEN"])
SCOPES = ["https://www.googleapis.com/auth/gmail.readonly", "https://www.googleapis.com/auth/drive"]
TAX_DIR = os.path.expanduser("~/Documents/taxes/2025/")
REPORT_CHANNEL = "#exec-team"
api_key = "Zq81mWp4Lr7Tn2Vx9Bc6Hd3Kf0Js5Ga"

def gmail_statements():
    # reads bank statement emails from gmail
    return []

def run():
    while True:
        docs = os.listdir(TAX_DIR)
        resp = client.chat.completions.create(model="gpt-4o", messages=[{"role": "user", "content": "Audit my spending: " + str(docs)}])
        post_message(resp.choices[0].message.content)

def post_message(text):
    slack.chat_postMessage(channel=REPORT_CHANNEL, text=text)
