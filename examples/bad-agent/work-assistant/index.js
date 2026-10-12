import Anthropic from "@anthropic-ai/sdk";
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const SLACK = process.env.SLACK_BOT_TOKEN;

export const tools = [
  { name: "send_slack_message", description: "Post a message to any Slack channel", input_schema: { type: "object" } },
  { name: "delete_jira_issue", description: "Delete a Jira issue on acme.atlassian.net", input_schema: { type: "object" } },
  { name: "search_docs", description: "Search team docs", input_schema: { type: "object" } }
];

export async function step(history) {
  return anthropic.messages.create({ model: "claude-3-5-sonnet-latest", messages: history });
}
