# Agent ops audit memo (self-run)

_Generated locally by agent-ops-check 0.1.0 on 2026-10-13T08:21:57.131Z. No network calls were made. Nothing left this machine._

> Heuristic regex and static checks, not a security audit. It can miss problems and can flag harmless code.

Rules 2026.10.13 (2026-10-13). Rules are 0 day(s) old.

**Overall score:** 28/100 · files scanned: 360 · agents: customer-support-agent-with-agentcore, end-to-end-customer-service-agent, multitenant-agentic-platform, shopping-concierge-agent, travel-concierge-agent

| Area | Score | High | Medium | Low |
|---|---|---|---|---|
| Personal-to-work data crossover | 40 | 6 | 0 | 0 |
| Irreversible actions | 0 | 47 | 433 | 0 |
| Governance + cost | 44 | 0 | 12 | 8 |
| Agent Health Checker + Labs tools | 98 | 0 | 0 | 2 |
| Prompt-injection scan (ADSF) | 0 | 27 | 1 | 11 |
| Simplified Technical English (STE) | 0 | 0 | 237 | 562 |

## 1. Agent and connector inventory

| Agent | Connectors | Credentials (names only) | Scopes |
|---|---|---|---|
| customer-support-agent-with-agentcore | - | - | - |
| end-to-end-customer-service-agent | - | COGNITO_PASSWORD, TAVILY_API_KEY | - |
| multitenant-agentic-platform | work_email | API_KEY_ID, RDS_SECRET_ARN | - |
| shopping-concierge-agent | work_email | API_KEY | - |
| travel-concierge-agent | work_email | AMADEUS_SECRET, API_KEY, GOOGLE_MAPS_KEY, OPENWEATHER_API_KEY, SERP_API_KEY, TAVILY_API_KEY, VITE_GOOGLE_MAPS_API_KEY, VITE_VISA_API_KEY | - |

### Source-to-sink matrix (personal data → work destinations)

No agent both reads a personal source and writes to a work sink.

## 2. Human-in-the-loop gate map

| Agent | Action | Where | Approval | Dry-run | Rate limit | Domain allowlist |
|---|---|---|---|---|---|---|
| customer-support-agent-with-agentcore | `process_refund` | awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/lib/stacks/agentcore-stack.ts:260 | **no** | **no** | **no** | **no** |
| customer-support-agent-with-agentcore | `process_refund` | awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/mcp/lambda/handler.py:215 | **no** | **no** | **no** | **no** |
| customer-support-agent-with-agentcore | `process_refund` | awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/mcp/lambda/order_handler.py:230 | **no** | **no** | **no** | **no** |
| end-to-end-customer-service-agent | `delete` | awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-backend/cx_agent_backend/domain/repositories/conversation_repository.py:28 | **no** | **no** | yes | **no** |
| end-to-end-customer-service-agent | `send_message` | awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-backend/cx_agent_backend/domain/services/conversation_service.py:42 | **no** | **no** | yes | **no** |
| end-to-end-customer-service-agent | `delete` | awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-backend/cx_agent_backend/infrastructure/adapters/memory_conversation_repository.py:31 | **no** | **no** | yes | **no** |
| end-to-end-customer-service-agent | `send_message` | awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-backend/cx_agent_backend/presentation/api/conversation_router.py:97 | **no** | **no** | yes | **no** |
| end-to-end-customer-service-agent | `send_message` | awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-frontend/src/services/agentcore_client.py:21 | **no** | **no** | yes | **no** |
| end-to-end-customer-service-agent | `submit_feedback` | awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-frontend/src/services/agentcore_client.py:67 | **no** | **no** | yes | **no** |
| end-to-end-customer-service-agent | `send_message` | awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-frontend/src/services/conversation_client.py:16 | **no** | **no** | yes | **no** |
| end-to-end-customer-service-agent | `submit_feedback` | awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-frontend/src/services/conversation_client.py:64 | **no** | **no** | yes | **no** |
| multitenant-agentic-platform | `send_usage_to_sqs` | awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/templates/main.py:30 | **no** | **no** | yes | yes |
| multitenant-agentic-platform | `send_email` | awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/tools/email-sender/tool.py:8 | **no** | **no** | yes | yes |
| multitenant-agentic-platform | `send_usage_to_sqs` | awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/build_deploy_agent/handler.py:364 | **no** | **no** | yes | yes |
| multitenant-agentic-platform | `delete_existing_agent` | awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/build_deploy_agent/handler.py:561 | **no** | **no** | yes | yes |
| multitenant-agentic-platform | `send_response` | awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/config_injector/handler.py:108 | **no** | **no** | yes | yes |
| multitenant-agentic-platform | `_setup_deploy_endpoint` | awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/stacks/api.py:68 | **no** | **no** | yes | yes |
| shopping-concierge-agent | `vic_initiate_purchase_endpoint` | awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/server.py:757 | **no** | **no** | yes | yes |
| shopping-concierge-agent | `vic_initiate_purchase_instructions` | awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/visa/flow.py:1188 | **no** | **no** | yes | yes |
| shopping-concierge-agent | `generate_x_pay_token` | awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/visa/helpers.py:68 | **no** | **no** | yes | yes |
| shopping-concierge-agent | `remove_from_cart` | awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/mcp_cart_tools/server.py:139 | **no** | **no** | yes | yes |
| shopping-concierge-agent | `request_purchase_confirmation` | awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/mcp_cart_tools/server.py:205 | yes | **no** | yes | yes |
| shopping-concierge-agent | `confirm_purchase` | awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/mcp_cart_tools/server.py:281 | **no** | **no** | yes | yes |
| shopping-concierge-agent | `send_purchase_confirmation_email` | awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/mcp_cart_tools/server.py:343 | **no** | **no** | yes | yes |
| shopping-concierge-agent | `remove_wishlist_items_by_asin` | awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/supervisor_agent/dynamodb_manager.py:99 | **no** | **no** | yes | yes |
| shopping-concierge-agent | `method: 'POST` | awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:73 | **no** | **no** | yes | yes |
| shopping-concierge-agent | `delete_oauth_provider` | awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/agent-stack/lambdas/oauth-provider/index.py:129 | **no** | **no** | yes | yes |
| shopping-concierge-agent | `send_response` | awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/agent-stack/lambdas/oauth-provider/index.py:142 | **no** | **no** | yes | yes |
| shopping-concierge-agent | `requestSubmit(` | awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/components/Chat.tsx:699 | **no** | **no** | yes | yes |
| shopping-concierge-agent | `method: 'POST` | awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/components/PurchaseConfirmation.tsx:180 | **no** | **no** | yes | yes |
| shopping-concierge-agent | `method: 'POST` | awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/components/VisaIframeAuth.tsx:161 | **no** | **no** | yes | yes |
| shopping-concierge-agent | `method: 'POST` | awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/services/awsCalls.ts:137 | **no** | **no** | yes | yes |
| travel-concierge-agent | `vic_initiate_purchase_endpoint` | awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/server.py:733 | **no** | **no** | yes | yes |
| travel-concierge-agent | `vic_initiate_purchase_instructions` | awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/visa/flow.py:1195 | **no** | **no** | yes | yes |
| travel-concierge-agent | `generate_x_pay_token` | awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/visa/helpers.py:68 | **no** | **no** | yes | yes |
| travel-concierge-agent | `remove_from_cart` | awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_cart_tools/server.py:314 | **no** | **no** | yes | yes |
| travel-concierge-agent | `request_purchase_confirmation` | awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_cart_tools/server.py:387 | yes | **no** | yes | yes |
| travel-concierge-agent | `confirm_purchase` | awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_cart_tools/server.py:463 | **no** | **no** | yes | yes |
| travel-concierge-agent | `send_purchase_confirmation_email` | awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_cart_tools/server.py:525 | **no** | **no** | yes | yes |
| travel-concierge-agent | `remove_itinerary_item` | awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_itinerary_tools/dynamodb_manager.py:76 | **no** | **no** | yes | yes |
| travel-concierge-agent | `itinerary_remove` | awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_itinerary_tools/server.py:111 | **no** | **no** | yes | yes |
| travel-concierge-agent | `remove_wishlist_items_by_asin` | awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/supervisor_agent/dynamodb_manager.py:99 | **no** | **no** | yes | yes |
| travel-concierge-agent | `method: 'POST` | awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:73 | **no** | **no** | yes | yes |
| travel-concierge-agent | `delete_oauth_provider` | awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/agent-stack/lambdas/oauth-provider/index.py:129 | **no** | **no** | yes | yes |
| travel-concierge-agent | `send_response` | awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/agent-stack/lambdas/oauth-provider/index.py:142 | **no** | **no** | yes | yes |
| travel-concierge-agent | `requestSubmit(` | awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/components/Chat.tsx:726 | **no** | **no** | yes | yes |
| travel-concierge-agent | `method: 'POST` | awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/components/PurchaseConfirmation.tsx:169 | **no** | **no** | yes | yes |
| travel-concierge-agent | `method: 'POST` | awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/components/VisaIframeAuth.tsx:161 | **no** | **no** | yes | yes |
| travel-concierge-agent | `method: 'POST` | awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/services/awsCalls.ts:137 | **no** | **no** | yes | yes |

## 3. AI inventory

- Providers: anthropic, aws_bedrock, openai
- Frameworks/SDKs: langgraph, langchain, vercel_ai_sdk, mcp
- Models: `claude-sonnet-4-5-20250929-v1`, `claude-haiku-4-5-20251001-v1`, `claude-sonnet-4-6`, `claude-3-sonnet-20240229-v1`, `claude-3-7-sonnet-20250219-v1`, `gpt-4o-mini`, `gpt-4o`, `claude-3-5-sonnet-20240620-v1`, `claude-3-5-haiku-20241022-v1`, `claude-sonnet-4-20250514-v1`

## STE (Simplified Technical English) style

_Style checks inspired by ASD-STE100 writing rules. Not a certified ASD-STE100 checker; no specification text or dictionary is included._

- awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md: 100 sentences, 49 findings
- awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/mcp/lambda/requirements.txt: 0 sentences, 0 findings
- awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CODE_OF_CONDUCT.md: 3 sentences, 2 findings
- awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md: 37 sentences, 25 findings
- awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md: 161 sentences, 101 findings
- awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/README.md: 15 sentences, 2 findings
- awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/SETUP.md: 42 sentences, 6 findings
- awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/catalog.json: 5 sentences, 0 findings
- awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/tools/database-query/config.json: 1 sentences, 0 findings
- awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/tools/datetime/config.json: 2 sentences, 1 findings
- awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/tools/email-sender/config.json: 1 sentences, 1 findings
- awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/tools/web-crawler/config.json: 4 sentences, 1 findings
- awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/tools/web-search/config.json: 2 sentences, 0 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md: 133 sentences, 25 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/README.md: 27 sentences, 7 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/README.md: 23 sentences, 8 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/requirements.txt: 3 sentences, 0 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/mcp_cart_tools/requirements.txt: 1 sentences, 0 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/mcp_shopping_tools/requirements.txt: 1 sentences, 0 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/supervisor_agent/requirements.txt: 1 sentences, 0 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/deployment-config.json: 2 sentences, 0 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md: 196 sentences, 38 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/FRONTEND_MOCK_MODE.md: 47 sentences, 6 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_FEATURE_FLAG.md: 17 sentences, 4 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md: 24 sentences, 7 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md: 29 sentences, 8 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_LOCAL_SETUP.md: 14 sentences, 1 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md: 100 sentences, 18 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/README.md: 12 sentences, 2 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package.json: 1 sentences, 0 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/README.md: 41 sentences, 10 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/shopping-sequence-diagram.md: 16 sentences, 4 findings
- awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md: 306 sentences, 159 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md: 137 sentences, 25 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/README.md: 31 sentences, 10 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/README.md: 23 sentences, 8 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/requirements.txt: 3 sentences, 0 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_cart_tools/requirements.txt: 1 sentences, 0 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_itinerary_tools/requirements.txt: 1 sentences, 0 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_travel_tools/requirements.txt: 0 sentences, 0 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/supervisor_agent/requirements.txt: 1 sentences, 0 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/deployment-config.json: 2 sentences, 0 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md: 206 sentences, 49 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/FRONTEND_MOCK_MODE.md: 47 sentences, 6 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_FEATURE_FLAG.md: 17 sentences, 4 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md: 24 sentences, 7 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md: 29 sentences, 8 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_LOCAL_SETUP.md: 14 sentences, 1 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_SECRETS_SETUP.md: 5 sentences, 2 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/README.md: 91 sentences, 16 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/README.md: 12 sentences, 2 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package.json: 1 sentences, 0 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/README.md: 36 sentences, 8 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/travel-booking-sequence-diagram.md: 20 sentences, 9 findings
- awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md: 306 sentences, 159 findings

## Document-wide prompt-injection scan (ADSF)

_Regex and Unicode checks over every file. It flags suspicious content; a clean result does not prove a file is safe._

360 files scanned, 39 findings.

## Standards map (maps to, not compliance)

✅ covered by a check · 🟡 partly · ⬜ not checked. Numbers = findings in this scan that map to the item.

### Anthropic / Claude agent guidance (summarized)

_Practices summarized from Anthropic's public docs and engineering posts on building and securing agents._ (7 ✅ · 1 🟡 · 0 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| AN-CONFIRM Ask a human before consequential or irreversible actions | ✅ | 480 (47 high) | Gate map |
| AN-LEASTPRIV Least-privilege tools and credentials | ✅ | 430 (2 high) | Shared tokens, reach, wildcards |
| AN-UNTRUSTED Treat tool results and web/doc content as untrusted (prompt injection) | ✅ | 39 (27 high) | Injection scan |
| AN-SANDBOX Run in a sandbox / isolated environment | 🟡 | - | Real browser profile use |
| AN-PROMPT Clear system prompt with explicit constraints | ✅ | 804 | Deny-list check, STE clarity |
| AN-EVALS Build evaluations with test cases | ✅ | - | Generates functional + security eval sets (not run) |
| AN-LIMITS Limit cost and steps | ✅ | 10 | Caps and budgets |
| AN-OBSERVE Log and monitor agent actions | ✅ | 1 | Tracing |

### Microsoft Copilot Studio governance areas (summarized)

_Areas summarized from Microsoft's public documentation. This tool scans exported agent files/configs only; it does not read your tenant._ (2 ✅ · 5 🟡 · 2 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| CS-DLP Data policies for connectors | 🟡 | - | Source-to-sink reach in exported configs |
| CS-AUTH Agent authentication | 🟡 | 2 (2 high) | Credentials in files |
| CS-SHARE Maker permissions and sharing | ⬜ | - | Not checked (tenant setting) |
| CS-ENV Environment strategy (dev/test/prod) | ⬜ | - | Not checked |
| CS-AUDIT Audit logging and monitoring | 🟡 | 1 | Tracing references |
| CS-KNOW Knowledge sources for generative answers | 🟡 | 39 (27 high) | Injection scan over knowledge files you point it at |
| CS-MOD Content moderation and instructions | 🟡 | 39 (27 high) | Prompt checks |
| CS-HANDOFF Escalation / human handoff | ✅ | - | Handoff rules and transcripts |
| CS-ACTIONS Actions and flows that change data | ✅ | 480 (47 high) | Gate map |

### CSA AI Controls Matrix (AICM) domains

_Domain names only._ (3 ✅ · 9 🟡 · 6 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| A&A Audit & Assurance | 🟡 | - | Audit memo + SARIF |
| AIS Application & Interface Security | 🟡 | 519 (74 high) | Gates, injection |
| BCR Business Continuity & Operational Resilience | 🟡 | - | Single-LLM fallback |
| CCC Change Control & Configuration | 🟡 | 4 | Pinning, review record |
| CEK Cryptography, Encryption & Key Management | 🟡 | - | Hardcoded keys |
| DCS Datacenter Security | ⬜ | - | Not checked |
| DSP Data Security & Privacy Lifecycle | ✅ | 6 (6 high) | PII, secrets, data paths |
| GRC Governance, Risk & Compliance | 🟡 | 1 | Owner, inventory |
| HRS Human Resources | ⬜ | - | Not checked |
| IAM Identity & Access Management | ✅ | 2 (2 high) | Shared credentials, scopes, profiles |
| IPY Interoperability & Portability | ⬜ | - | Not checked |
| I&S Infrastructure Security | ⬜ | - | Not checked |
| LOG Logging & Monitoring | ✅ | 3 | Tracing, observability gaps |
| MDS Model Security | 🟡 | 42 (27 high) | Injection, pinning |
| SEF Security Incident Management & Forensics | ⬜ | - | Not checked |
| STA Supply Chain, Transparency & Accountability | 🟡 | 20 | Inventory, disclosure |
| TVM Threat & Vulnerability Management | 🟡 | 519 (74 high) | Static findings |
| UEM Universal Endpoint Management | ⬜ | - | Not checked |

### EU AI Act basics (selected articles)

_Selected articles for orientation. Not legal advice; maps to, not compliant with._ (3 ✅ · 4 🟡 · 2 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| Art.4 AI literacy | ⬜ | - | Not checked |
| Art.5 Prohibited practices | ⬜ | - | Not checked |
| Art.9 Risk management system (high-risk) | 🟡 | - | Audit memo is an input |
| Art.10 Data and data governance | 🟡 | 4 (4 high) | Personal data in agent files |
| Art.12 Record-keeping (logging) | ✅ | 3 | Tracing/logging checks |
| Art.13 Transparency and information to deployers | 🟡 | 1 | Owner docs |
| Art.14 Human oversight | ✅ | 480 (47 high) | Approval gates, handoff |
| Art.15 Accuracy, robustness and cybersecurity | 🟡 | 39 (27 high) | Injection, secrets, grounding |
| Art.50 Transparency: tell people they are talking to AI | ✅ | - | Bot disclosure checks |

### ISO/IEC 42001:2023 Annex A control areas

_Annex A area names only (the standard text is copyrighted and not included). Maps to, not compliant with._ (2 ✅ · 6 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| A.2 Policies related to AI | ⬜ | - | Not checked |
| A.3 Internal organization (roles, responsibilities) | 🟡 | 1 | Owner/maintainer recorded |
| A.4 Resources for AI systems (inventory of tools, data, compute) | ✅ | 26 (6 high) | AI and connector inventory |
| A.5 Assessing impacts of AI systems | 🟡 | - | Audit memo is a starting input |
| A.6 AI system life cycle (verification, deployment, operation, monitoring) | 🟡 | 6 | Tracing, pinning; generated eval sets |
| A.7 Data for AI systems | 🟡 | 4 (4 high) | Personal data reach |
| A.8 Information for interested parties | 🟡 | - | Bot disclosure |
| A.9 Use of AI systems (responsible use, human oversight) | ✅ | 480 (47 high) | Approval gates, handoff rules |
| A.10 Third-party and customer relationships | 🟡 | 20 | Provider inventory |

### MITRE ATLAS (selected techniques)

_Selected agent techniques; IDs/names per ATLAS data (via framework-pitch research)._ (9 ✅ · 4 🟡 · 0 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| AML.T0051 LLM Prompt Injection (direct and indirect) | ✅ | 39 (27 high) | Injection scan + untrusted-input rules + eval cases |
| AML.T0054 LLM Jailbreak | 🟡 | - | Obeyed overrides in transcripts; jailbreak eval cases |
| AML.T0056 LLM Meta Prompt Extraction | ✅ | - | Secrets in prompts, leaks in transcripts |
| AML.T0057 LLM Data Leakage | ✅ | 6 (6 high) | Personal-to-work paths, other customers' data |
| AML.T0053 AI Agent Tool Invocation | ✅ | 482 (49 high) | Tool gates and credential sharing |
| AML.T0034 Cost Harvesting | ✅ | 5 | Caps and budgets |
| AML.T0029 Denial of ML Service | 🟡 | 5 | Timeouts and step caps |
| AML.T0055 Unsecured Credentials | ✅ | - | Hardcoded secrets |
| AML.T0010 ML Supply Chain Compromise | 🟡 | 3 | Pinning only |
| AML.T0083 Credentials from AI Agent Configuration | ✅ | - | Secrets in agent/MCP configs, .env present |
| AML.T0086 Exfiltration via AI Agent Tool Invocation | ✅ | 3 (3 high) | Source-to-sink paths, hardcoded webhooks, exfil instructions/links in docs |
| AML.T0101 Data Destruction via AI Agent Tool Invocation | ✅ | 37 (37 high) | Ungated delete/drop/destroy/purge tools |
| AML.T0100 AI Agent Clickbait | 🟡 | 438 (10 high) | Browser writes, shorteners, allowlists |

### NIST AI RMF 1.0 (functions) + Generative AI Profile (NIST AI 600-1) risks

_Function names from AI RMF 1.0; risk names from the GenAI Profile. This tool supports a few outcomes; it does not implement the framework._ (4 ✅ · 6 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| GOVERN Govern: policies, accountability, oversight | 🟡 | 2 | Owner and review records; AI inventory |
| MAP Map: context, components, third parties | ✅ | 26 (6 high) | AI inventory (providers, SDKs, models), connector inventory and source-to-sink map |
| MEASURE Measure: test and evaluate | 🟡 | 3 | Generates eval sets (functional + security) from the source; does not run them |
| MANAGE Manage: prioritize and respond to risks | 🟡 | - | P0–P2 audit memo and SARIF for CI; no incident workflow |
| GAI-Confabulation GenAI risk: Confabulation | 🟡 | - | Grounding rule checks |
| GAI-DataPrivacy GenAI risk: Data Privacy | ✅ | 6 (6 high) | PII, secrets, personal-to-work paths |
| GAI-HumanAI GenAI risk: Human-AI Configuration | ✅ | 480 (47 high) | Approval gates, disclosure, handoff |
| GAI-InfoIntegrity GenAI risk: Information Integrity | 🟡 | - | FAQ grounding; STE information-loss compare |
| GAI-InfoSecurity GenAI risk: Information Security | ✅ | 39 (27 high) | Injection scan, secrets, token lifting |
| GAI-ValueChain GenAI risk: Value Chain and Component Integration | 🟡 | 3 | Provider/SDK/model inventory and pinning |
| GAI-Harmful GenAI risks: CBRN, violent/hateful, obscene, bias, IP, environmental | ⬜ | - | Not checked |

### OWASP Top 10 for Agentic Applications 2026 (ASI01–ASI10)

_Item names as listed in the OWASP GenAI Security Project document (via framework-pitch research)._ (3 ✅ · 6 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| ASI01 Agent Goal Hijack | ✅ | 44 (27 high) | ADSF injection scan over all docs, untrusted-input rule, deny-list check |
| ASI02 Tool Misuse and Exploitation | ✅ | 480 (47 high) | Gate map, rate limits, allowlists, wildcard domains, URL shorteners |
| ASI03 Identity and Privilege Abuse | ✅ | 2 (2 high) | Shared credentials, scopes, browser profiles, cookie reads |
| ASI04 Agentic Supply Chain Vulnerabilities | 🟡 | 3 | MCP/provider inventory, unpinned models; no registry integrity check |
| ASI05 Unexpected Code Execution | 🟡 | - | Free-form shell/exec/SQL tools |
| ASI06 Memory and Context Poisoning | 🟡 | 39 (27 high) | ADSF scan of knowledge/memory files you point it at; no runtime memory check |
| ASI07 Insecure Inter-Agent Communication | ⬜ | - | Not checked |
| ASI08 Cascading Failures | 🟡 | 9 | Step, loop and retry caps, timeouts, single-provider fallback |
| ASI09 Human-Agent Trust Exploitation | 🟡 | - | Bot disclosure, human claims, unrecorded handoffs |
| ASI10 Rogue Agents | 🟡 | 4 | Tracing, owner, observability; no stop-switch check |

### OWASP Agentic AI – Threats and Mitigations (T1–T15)

_Threat names from the OWASP Agentic Security Initiative taxonomy._ (5 ✅ · 7 🟡 · 3 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| T1 Memory Poisoning | 🟡 | 39 (27 high) | Hidden instructions in files an agent may load as memory/knowledge |
| T2 Tool Misuse | ✅ | 480 (47 high) | Gate map: approval, dry-run, rate limit, allowlist per tool |
| T3 Privilege Compromise | ✅ | 2 (2 high) | Shared tokens, broad reach, real browser profiles, cookie reads |
| T4 Resource Overload | ✅ | 10 | Caps, timeouts, loops, budgets |
| T5 Cascading Hallucination Attacks | 🟡 | - | Grounding rules only |
| T6 Intent Breaking & Goal Manipulation | ✅ | 39 (27 high) | Injection scan, untrusted-input rule, obeyed overrides |
| T7 Misaligned & Deceptive Behaviors | 🟡 | - | Bot-disclosure / human-persona checks |
| T8 Repudiation & Untraceability | ✅ | 3 | Tracing and logging checks |
| T9 Identity Spoofing & Impersonation | 🟡 | 2 (2 high) | Shared credentials; claims to be human |
| T10 Overwhelming Human in the Loop | ⬜ | - | Not checked |
| T11 Unexpected RCE and Code Attacks | 🟡 | - | Shell/exec/SQL tools fed by model output |
| T12 Agent Communication Poisoning | 🟡 | 39 (27 high) | Injection patterns in shared files only; no runtime message checks |
| T13 Rogue Agents in Multi-Agent Systems | ⬜ | - | Not checked |
| T14 Human Attacks on Multi-Agent Systems | ⬜ | - | Not checked |
| T15 Human Manipulation | 🟡 | - | Persona, unsafe advice |

### OWASP Top 10 for LLM Applications 2025

_Item names from the OWASP 2025 list. Status = what this tool checks statically, not whether your app is safe._ (5 ✅ · 4 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| LLM01 Prompt Injection | ✅ | 44 (27 high) | Document-wide injection scan (ADSF tab), untrusted-input rule in prompts, obeyed overrides in transcripts, injection eval cases |
| LLM02 Sensitive Information Disclosure | ✅ | 6 (6 high) | Secrets/PII in files, personal-to-work source-to-sink paths, confidential text in prompts, leaks in transcripts |
| LLM03 Supply Chain | 🟡 | 3 | Model pinning and SDK inventory only; no dependency or model-provenance scan |
| LLM04 Data and Model Poisoning | 🟡 | 39 (27 high) | Poisoned instructions hidden in docs/knowledge files; no training-data checks |
| LLM05 Improper Output Handling | 🟡 | 37 (37 high) | Shell/SQL/exec tools and ungated actions that consume model output; no taint tracking |
| LLM06 Excessive Agency | ✅ | 482 (49 high) | Gate map for irreversible tools and browser actions, shared credentials, scopes |
| LLM07 System Prompt Leakage | ✅ | - | Secrets and internal notes in prompts; leaked prompt text in transcripts |
| LLM08 Vector and Embedding Weaknesses | ⬜ | - | Not checked |
| LLM09 Misinformation | 🟡 | 799 | 'I don't know' rule, made-up prices/policies vs your FAQ; STE clarity checks |
| LLM10 Unbounded Consumption | ✅ | 14 | Token caps, timeouts, retry/step caps, infinite loops, budget alerts, bill smells |


## Generated eval sets

36 functional and 67 security test cases in `evals/` (JSONL + README.md). Generated from the source; not run.

## 4. Findings (P0 = fix before real traffic)

### Personal-to-work data crossover

- **P0** `crossover.shared_credential` (across agents) — Credential TAVILY_API_KEY is used by 2 agents: end-to-end-customer-service-agent, travel-concierge-agent. They are not really separate agents if they share connections. Give each its own scoped token. (`TAVILY_API_KEY`)
- **P0** `crossover.shared_credential` (across agents) — Credential API_KEY is used by 2 agents: shopping-concierge-agent, travel-concierge-agent. They are not really separate agents if they share connections. Give each its own scoped token. (`API_KEY`)
- **P0** `crossover.pii.card_number` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/server.py:181 — Possible personal data (card_number) in agent code, prompt or fixture. (`4622…59 (masked)`)
- **P0** `crossover.pii.card_number` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/components/CardOnboardingTest.tsx:69 — Possible personal data (card_number) in agent code, prompt or fixture. (`4622…59 (masked)`)
- **P0** `crossover.pii.card_number` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/server.py:180 — Possible personal data (card_number) in agent code, prompt or fixture. (`4622…59 (masked)`)
- **P0** `crossover.pii.card_number` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/components/CardOnboardingTest.tsx:69 — Possible personal data (card_number) in agent code, prompt or fixture. (`4622…59 (masked)`)

### Irreversible actions

- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/lib/stacks/agentcore-stack.ts:260 — Irreversible tool process_refund has no approval gate or dry-run mode. Add a human confirm step before it runs. (`name: "process_refund",`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/mcp/lambda/handler.py:215 — Irreversible tool process_refund has no approval gate or dry-run mode. Add a human confirm step before it runs. (`def process_refund(event: Dict[str, Any]):`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/mcp/lambda/order_handler.py:230 — Irreversible tool process_refund has no approval gate or dry-run mode. Add a human confirm step before it runs. (`def process_refund(event: Dict[str, Any]):`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-backend/cx_agent_backend/domain/repositories/conversation_repository.py:28 — Irreversible tool delete has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`async def delete(self, conversation_id: UUID) -> None:`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-backend/cx_agent_backend/domain/services/conversation_service.py:42 — Irreversible tool send_message has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`async def send_message(`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-backend/cx_agent_backend/infrastructure/adapters/memory_conversation_repository.py:31 — Irreversible tool delete has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`async def delete(self, conversation_id: UUID) -> None:`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-backend/cx_agent_backend/presentation/api/conversation_router.py:97 — Irreversible tool send_message has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`async def send_message(`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-frontend/src/services/agentcore_client.py:21 — Irreversible tool send_message has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def send_message(`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-frontend/src/services/agentcore_client.py:67 — Irreversible tool submit_feedback has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def submit_feedback(`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-frontend/src/services/conversation_client.py:16 — Irreversible tool send_message has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def send_message(`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-frontend/src/services/conversation_client.py:64 — Irreversible tool submit_feedback has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def submit_feedback(`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/templates/main.py:30 — Irreversible tool send_usage_to_sqs has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def send_usage_to_sqs(input_tokens, output_tokens, total_tokens, user_message, response_message, tenant_id):`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/tools/email-sender/tool.py:8 — Irreversible tool send_email has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def send_email(to: str, subject: str, body: str, from_email: str = "noreply@example.com") -> str:`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/build_deploy_agent/handler.py:364 — Irreversible tool send_usage_to_sqs has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def send_usage_to_sqs(input_tokens, output_tokens, total_tokens, user_message, response_message, tenant_id):`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/build_deploy_agent/handler.py:561 — Irreversible tool delete_existing_agent has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def delete_existing_agent(agent_name):`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/config_injector/handler.py:108 — Irreversible tool send_response has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def send_response(event, context, response_status, response_data):`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/stacks/api.py:68 — Irreversible tool _setup_deploy_endpoint has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def _setup_deploy_endpoint(self, lambda_fn: lambda_.Function) -> None:`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/server.py:757 — Irreversible tool vic_initiate_purchase_endpoint has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def vic_initiate_purchase_endpoint():`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/visa/flow.py:1188 — Irreversible tool vic_initiate_purchase_instructions has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def vic_initiate_purchase_instructions(`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/visa/helpers.py:68 — Irreversible tool generate_x_pay_token has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def generate_x_pay_token(shared_secret, resource_path, query_string, request_body=""):`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/mcp_cart_tools/server.py:139 — Irreversible tool remove_from_cart has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def remove_from_cart(user_id: str, identifiers: List[str], item_type: str = "product") -> None:`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/mcp_cart_tools/server.py:281 — Irreversible tool confirm_purchase has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def confirm_purchase(user_id: str) -> Dict[str, Any]:`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/mcp_cart_tools/server.py:343 — Irreversible tool send_purchase_confirmation_email has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def send_purchase_confirmation_email(`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/supervisor_agent/dynamodb_manager.py:99 — Irreversible tool remove_wishlist_items_by_asin has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def remove_wishlist_items_by_asin(self, user_id: str, asin: str):`)
- **P0** `actions.browser_write` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:73 — Browser write action method: 'POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`method: 'POST',`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/agent-stack/lambdas/oauth-provider/index.py:129 — Irreversible tool delete_oauth_provider has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def delete_oauth_provider(event):`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/agent-stack/lambdas/oauth-provider/index.py:142 — Irreversible tool send_response has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def send_response(event, status, reason=None, data=None, physical_resource_id=None):`)
- **P0** `actions.browser_write` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/components/Chat.tsx:699 — Browser write action requestSubmit( has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`form.requestSubmit()`)
- **P0** `actions.browser_write` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/components/PurchaseConfirmation.tsx:180 — Browser write action method: 'POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`method: 'POST',`)
- **P0** `actions.browser_write` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/components/VisaIframeAuth.tsx:161 — Browser write action method: 'POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`method: 'POST',`)
- **P0** `actions.browser_write` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/services/awsCalls.ts:137 — Browser write action method: 'POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`method: 'POST',`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/server.py:733 — Irreversible tool vic_initiate_purchase_endpoint has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def vic_initiate_purchase_endpoint():`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/visa/flow.py:1195 — Irreversible tool vic_initiate_purchase_instructions has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def vic_initiate_purchase_instructions(`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/visa/helpers.py:68 — Irreversible tool generate_x_pay_token has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def generate_x_pay_token(shared_secret, resource_path, query_string, request_body=""):`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_cart_tools/server.py:314 — Irreversible tool remove_from_cart has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def remove_from_cart(user_id: str, identifiers: List[str], item_type: str = "product") -> None:`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_cart_tools/server.py:463 — Irreversible tool confirm_purchase has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def confirm_purchase(user_id: str) -> Dict[str, Any]:`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_cart_tools/server.py:525 — Irreversible tool send_purchase_confirmation_email has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def send_purchase_confirmation_email(`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_itinerary_tools/dynamodb_manager.py:76 — Irreversible tool remove_itinerary_item has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def remove_itinerary_item(self, user_id: str, item_id: str):`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_itinerary_tools/server.py:111 — Irreversible tool itinerary_remove has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def itinerary_remove(user_id: str, item_id: str) -> Dict[str, Any]:`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/supervisor_agent/dynamodb_manager.py:99 — Irreversible tool remove_wishlist_items_by_asin has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def remove_wishlist_items_by_asin(self, user_id: str, asin: str):`)
- **P0** `actions.browser_write` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:73 — Browser write action method: 'POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`method: 'POST',`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/agent-stack/lambdas/oauth-provider/index.py:129 — Irreversible tool delete_oauth_provider has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def delete_oauth_provider(event):`)
- **P0** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/agent-stack/lambdas/oauth-provider/index.py:142 — Irreversible tool send_response has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def send_response(event, status, reason=None, data=None, physical_resource_id=None):`)
- **P0** `actions.browser_write` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/components/Chat.tsx:726 — Browser write action requestSubmit( has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`form.requestSubmit()`)
- **P0** `actions.browser_write` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/components/PurchaseConfirmation.tsx:169 — Browser write action method: 'POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`method: 'POST',`)
- **P0** `actions.browser_write` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/components/VisaIframeAuth.tsx:161 — Browser write action method: 'POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`method: 'POST',`)
- **P0** `actions.browser_write` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/services/awsCalls.ts:137 — Browser write action method: 'POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`method: 'POST',`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/cdk.json:5 — Wildcard domain or host permission. (`"**"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/cdk.json:10 — Wildcard domain or host permission. (`"**/*.d.ts"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/cdk.json:11 — Wildcard domain or host permission. (`"**/*.js"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/lib/stacks/agentcore-stack.ts:362 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/lib/stacks/agentcore-stack.ts:372 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/lib/stacks/agentcore-stack.ts:377 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:61 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:590 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:611 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:655 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:695 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:731 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:853 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:962 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:963 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:964 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:1001 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:1016 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:1025 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:1059 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:1384 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:1419 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:2219 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:2527 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:2614 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:2678 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:2703 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:2775 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:2791 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:2852 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:2886 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:2956 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:3003 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:3020 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:3223 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/package-lock.json:3891 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.no_deny_list` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-frontend/src/components/chat.py:31 — Wildcard domain or host permission. (`"**Was this helpful?**"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-frontend/src/components/chat.py:120 — Wildcard domain or host permission. (`"**📚 Sources:**"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-frontend/src/components/chat.py:130 — Wildcard domain or host permission. (`"**📁 Document:** '{citation['`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-frontend/src/components/chat.py:147 — Wildcard domain or host permission. (`"**🔧 Tools Used:**"`)
- **P1** `actions.no_deny_list` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:110 — Wildcard domain or host permission. (`"* configurations and make changes as needed - but the default values should be `)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:112 — Wildcard domain or host permission. (`"* component configurations, see the sections below.

Finally, note that in [inf`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/tools/datetime/tool.py:42 — Wildcard domain or host permission. (`"**Current Date & Time Information**{timezone_note}"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/tools/web-crawler/tool.py:68 — Wildcard domain or host permission. (`"**URL:** {url}\n"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:840 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:973 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:974 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:993 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:1008 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:1026 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:1027 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:1049 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:1064 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:1082 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:1097 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:3560 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:3561 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:3562 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:3620 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:3635 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:3644 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:3813 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:3951 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:4473 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:4530 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:5266 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:5813 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:6021 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:6023 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:6024 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:6025 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:6026 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:6545 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:6547 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:6548 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:6549 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:6550 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:6618 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:6622 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:6623 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:7101 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:7103 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:7104 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:7105 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/frontend/package-lock.json:7106 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.no_deny_list` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/async_deploy_agent/handler.py:31 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/async_deploy_agent/handler.py:60 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/async_deploy_agent/handler.py:80 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/delete_agent/handler.py:13 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/get_agent_details/handler.py:12 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/infrastructure_costs/handler.py:192 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/infrastructure_costs/handler.py:209 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/infrastructure_costs/handler.py:222 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/invoke_agent/handler.py:194 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/list_agents/handler.py:11 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/set_tenant_limit/handler.py:22 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/shared/utils.py:11 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/token_usage/handler.py:39 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/token_usage/handler.py:51 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/update_agent_config/handler.py:12 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/stacks/agent_runtime.py:45 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/stacks/helpers.py:24 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/stacks/lambdas.py:108 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/stacks/lambdas.py:140 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/stacks/lambdas.py:175 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/stacks/lambdas.py:213 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/stacks/lambdas.py:248 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/amplify/backend.ts:32 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/amplify/tsconfig.json:13 — Wildcard domain or host permission. (`"**/*.ts"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/handler.py:44 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/handler.py:67 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/handler.py:87 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/server.py:650 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/visa/helpers.py:29 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/mcp_cart_tools/server.py:262 — Wildcard domain or host permission. (`"****"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/mcp_cart_tools/server.py:320 — Wildcard domain or host permission. (`"****"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/mcp_cart_tools/server.py:418 — Wildcard domain or host permission. (`"***"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/mcp_cart_tools/server.py:497 — Wildcard domain or host permission. (`"****"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/mcp_cart_tools/server.py:503 — Wildcard domain or host permission. (`"****"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/supervisor_agent/dynamodb_manager.py:199 — Wildcard domain or host permission. (`"****"`)
- **P1** `actions.no_deny_list` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/supervisor_agent/prompt_manager.py:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/FRONTEND_MOCK_MODE.md:5 — Wildcard domain or host permission. (`"** button **without Visa API credentials or local Visa server**! The frontend c`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/FRONTEND_MOCK_MODE.md:33 — Wildcard domain or host permission. (`"** or **"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/FRONTEND_MOCK_MODE.md:33 — Wildcard domain or host permission. (`"**
5. Fill in any test card details
6. Complete the flow (all steps are mocked `)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md:5 — Wildcard domain or host permission. (`"** button:

1. ✅ Frontend calls agent: '"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/agent-stack/lib/agent-stack.ts:75 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/agent-stack/lib/agent-stack.ts:165 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/agent-stack/lib/agent-stack.ts:176 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/agent-stack/package-lock.json:85 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/agent-stack/package-lock.json:441 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/agent-stack/package-lock.json:476 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/agent-stack/package-lock.json:679 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/frontend-stack/lib/frontend-stack.ts:47 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/frontend-stack/package-lock.json:70 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/frontend-stack/package-lock.json:426 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/frontend-stack/package-lock.json:461 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/frontend-stack/package-lock.json:664 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/mcp-servers/package-lock.json:85 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/mcp-servers/package-lock.json:441 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/mcp-servers/package-lock.json:476 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/mcp-servers/package-lock.json:679 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/cdk.json:5 — Wildcard domain or host permission. (`"**"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/cdk.json:10 — Wildcard domain or host permission. (`"**/*.d.ts"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/cdk.json:11 — Wildcard domain or host permission. (`"**/*.js"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/jest.config.js:4 — Wildcard domain or host permission. (`'**/*.test.ts'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/lib/visa-lambda-stack.ts:28 — Wildcard domain or host permission. (`"*.pyc"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/lib/visa-lambda-stack.ts:28 — Wildcard domain or host permission. (`"*.pyo"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/lib/visa-lambda-stack.ts:89 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:61 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:630 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:652 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:697 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:740 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:778 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:906 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:1028 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:1029 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:1030 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:1071 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:1088 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:1098 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:1136 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:1475 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:1510 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:2369 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:2703 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:2792 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:2860 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:2887 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:2963 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:2980 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:3045 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:3080 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:3153 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:3203 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:3221 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:3444 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:4170 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:99 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:205 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:244 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:6712 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:6761 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:7167 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:13215 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:13264 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:15755 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:15782 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:15898 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:28519 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:28752 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:29207 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30175 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30176 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30201 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30202 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30221 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30236 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30251 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30273 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30274 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30302 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30303 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30322 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30342 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30343 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30365 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30400 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30401 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30432 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30433 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30456 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30457 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30480 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30481 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30503 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30504 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30534 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30535 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30567 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30568 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30590 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30605 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30624 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30642 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30660 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30675 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30690 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30708 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:30726 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:32455 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:32456 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:32457 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:32553 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:32568 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:32577 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:32598 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:32628 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:33681 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:33716 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:33962 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:34401 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:34758 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:35587 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:36035 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:37664 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:40660 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:40682 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:40704 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:41113 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:41128 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:42108 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:42140 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:42498 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:42754 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:42790 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:43951 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:43953 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:43954 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:43955 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/package-lock.json:43956 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:187 — Wildcard domain or host permission. (`"**PSMS"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/components/UserProfile.tsx:90 — Wildcard domain or host permission. (`'***'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/components/UserProfile.tsx:106 — Wildcard domain or host permission. (`'***'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/components/UserProfile.tsx:230 — Wildcard domain or host permission. (`'***'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/components/UserProfile.tsx:245 — Wildcard domain or host permission. (`'***'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/components/UserProfile.tsx:754 — Wildcard domain or host permission. (`'***'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/services/userProfileService.ts:243 — Wildcard domain or host permission. (`'***'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/services/visaMockService.ts:130 — Wildcard domain or host permission. (`'***-***-1234'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/amplify/backend.ts:32 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/amplify/tsconfig.json:13 — Wildcard domain or host permission. (`"**/*.ts"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/handler.py:44 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/handler.py:67 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/handler.py:87 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/server.py:632 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/visa/helpers.py:29 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_cart_tools/server.py:444 — Wildcard domain or host permission. (`"****"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_cart_tools/server.py:502 — Wildcard domain or host permission. (`"****"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_cart_tools/server.py:600 — Wildcard domain or host permission. (`"***"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_cart_tools/server.py:679 — Wildcard domain or host permission. (`"****"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_cart_tools/server.py:685 — Wildcard domain or host permission. (`"****"`)
- **P1** `actions.no_deny_list` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/supervisor_agent/prompt_manager.py:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/FRONTEND_MOCK_MODE.md:5 — Wildcard domain or host permission. (`"** button **without Visa API credentials or local Visa server**! The frontend c`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/FRONTEND_MOCK_MODE.md:33 — Wildcard domain or host permission. (`"** or **"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/FRONTEND_MOCK_MODE.md:33 — Wildcard domain or host permission. (`"**
5. Fill in any test card details
6. Complete the flow (all steps are mocked `)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md:5 — Wildcard domain or host permission. (`"** button:

1. ✅ Frontend calls agent: '"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/agent-stack/lib/agent-stack.ts:77 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/agent-stack/lib/agent-stack.ts:169 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/agent-stack/lib/agent-stack.ts:180 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/agent-stack/package-lock.json:85 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/agent-stack/package-lock.json:441 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/agent-stack/package-lock.json:476 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/agent-stack/package-lock.json:679 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/frontend-stack/lib/frontend-stack.ts:47 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/frontend-stack/package-lock.json:70 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/frontend-stack/package-lock.json:426 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/frontend-stack/package-lock.json:461 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/frontend-stack/package-lock.json:664 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/mcp-servers/package-lock.json:85 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/mcp-servers/package-lock.json:441 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/mcp-servers/package-lock.json:476 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/mcp-servers/package-lock.json:679 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/cdk.json:5 — Wildcard domain or host permission. (`"**"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/cdk.json:10 — Wildcard domain or host permission. (`"**/*.d.ts"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/cdk.json:11 — Wildcard domain or host permission. (`"**/*.js"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/jest.config.js:4 — Wildcard domain or host permission. (`'**/*.test.ts'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/lib/visa-lambda-stack.ts:28 — Wildcard domain or host permission. (`"*.pyc"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/lib/visa-lambda-stack.ts:28 — Wildcard domain or host permission. (`"*.pyo"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/lib/visa-lambda-stack.ts:89 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:61 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:630 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:652 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:697 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:740 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:778 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:906 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:1028 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:1029 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:1030 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:1071 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:1088 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:1098 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:1136 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:1475 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:1510 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:2366 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:2700 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:2789 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:2857 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:2884 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:2960 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:2977 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:3042 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:3077 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:3150 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:3200 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:3218 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:3440 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/package-lock.json:4165 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:99 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:205 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:244 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:6712 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:6761 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:7167 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:13215 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:13264 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:15755 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:15782 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:15898 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:28519 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:28752 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:29207 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30175 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30176 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30201 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30202 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30221 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30236 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30251 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30273 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30274 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30302 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30303 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30322 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30342 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30343 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30365 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30400 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30401 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30432 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30433 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30456 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30457 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30480 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30481 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30503 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30504 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30534 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30535 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30567 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30568 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30590 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30605 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30624 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30642 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30660 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30675 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30690 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30708 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:30726 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:32455 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:32456 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:32457 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:32553 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:32568 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:32577 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:32598 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:32628 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:33681 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:33716 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:33962 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:34401 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:34758 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:35587 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:36035 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:37664 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:40660 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:40682 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:40704 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:41113 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:41128 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:42108 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:42140 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:42498 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:42754 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:42790 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:43951 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:43953 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:43954 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:43955 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/package-lock.json:43956 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:187 — Wildcard domain or host permission. (`"**PSMS"`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/components/UserProfile.tsx:90 — Wildcard domain or host permission. (`'***'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/components/UserProfile.tsx:106 — Wildcard domain or host permission. (`'***'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/components/UserProfile.tsx:230 — Wildcard domain or host permission. (`'***'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/components/UserProfile.tsx:245 — Wildcard domain or host permission. (`'***'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/components/UserProfile.tsx:754 — Wildcard domain or host permission. (`'***'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/services/userProfileService.ts:243 — Wildcard domain or host permission. (`'***'`)
- **P1** `actions.wildcard_domain` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/services/visaMockService.ts:130 — Wildcard domain or host permission. (`'***-***-1234'`)
- **OK** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/mcp_cart_tools/server.py:205 — Irreversible tool request_purchase_confirmation has a gate (approval, rate_limit, domain_allowlist). (`def request_purchase_confirmation(user_id: str) -> Dict[str, Any]:`)
- **OK** `actions.irreversible_tool` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_cart_tools/server.py:387 — Irreversible tool request_purchase_confirmation has a gate (approval, rate_limit, domain_allowlist). (`def request_purchase_confirmation(user_id: str) -> Dict[str, Any]:`)

### Governance + cost

- **P1** `governance.no_owner` (project) — No owner/maintainer documented. Every agent needs a named person who answers for it.
- **P1** `governance.no_max_tokens` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:1 — [customer-support-agent-with-agentcore] No max_tokens / output cap set on model calls.
- **P1** `governance.no_recursion_cap` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:1 — [customer-support-agent-with-agentcore] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:1 — [customer-support-agent-with-agentcore] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_recursion_cap` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-backend/cx_agent_backend/infrastructure/adapters/openai_llm_service.py:20 — [end-to-end-customer-service-agent] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_max_tokens` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/async_deploy_agent/handler.py:50 — [multitenant-agentic-platform] No max_tokens / output cap set on model calls.
- **P1** `governance.no_recursion_cap` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/async_deploy_agent/handler.py:50 — [multitenant-agentic-platform] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_tracing` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/src/lambda_functions/async_deploy_agent/handler.py:50 — [multitenant-agentic-platform] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_max_tokens` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:1 — [shopping-concierge-agent] No max_tokens / output cap set on model calls.
- **P1** `governance.no_recursion_cap` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:1 — [shopping-concierge-agent] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_max_tokens` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:1 — [travel-concierge-agent] No max_tokens / output cap set on model calls.
- **P1** `governance.no_recursion_cap` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:1 — [travel-concierge-agent] No step / iteration / recursion cap for the agent loop.
- **P2** `governance.no_review_record` (project) — No documented review (reviewed-by / review date / changelog).
- **P2** `governance.no_retry_cap` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:1 — [customer-support-agent-with-agentcore] No explicit retry limit or backoff.
- **P2** `governance.unpinned_model` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:87 — Model 'claude-sonnet-4-6' is not pinned to a dated version, so behavior and price can change under you. (`claude-sonnet-4-6`)
- **P2** `governance.no_retry_cap` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-backend/cx_agent_backend/infrastructure/adapters/openai_llm_service.py:20 — [end-to-end-customer-service-agent] No explicit retry limit or backoff.
- **P2** `governance.unpinned_model` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-backend/cx_agent_backend/presentation/schemas/conversation_schemas.py:77 — Model 'gpt-4o-mini' is not pinned to a dated version, so behavior and price can change under you. (`gpt-4o-mini`)
- **P2** `governance.unpinned_model` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-frontend/src/components/chat.py:168 — Model 'gpt-4o' is not pinned to a dated version, so behavior and price can change under you. (`gpt-4o`)
- **P2** `governance.no_retry_cap` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:1 — [shopping-concierge-agent] No explicit retry limit or backoff.
- **P2** `governance.no_retry_cap` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:1 — [travel-concierge-agent] No explicit retry limit or backoff.

### Agent Health Checker + Labs tools

- **P2** `observability.prometheus` (whole input) — Gap — no clear signal for Prometheus metrics / alerts.
- **P2** `observability.runbooks_alerts` (whole input) — Gap — no clear signal for Alerts tied to runbooks.

### Prompt-injection scan (ADSF)

- **P0** `injection.llmail_tool_call_syntax` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-backend/cx_agent_backend/infrastructure/adapters/langgraph_agent_service.py:126 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`call_tool`)
- **P0** `injection.exfil_instruction` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/templates/main.py:31 — Instruction to send secrets or conversation data somewhere. (`Send token usage metrics to`)
- **P0** `injection.llmail_tool_call_syntax` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/tools/email-sender/tool.py:8 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`send_email(`)
- **P0** `injection.llmail_tool_call_syntax` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/tools/email-sender/tool.py:24 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`send_email(`)
- **P0** `injection.llmail_tool_call_syntax` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/tools/email-sender/tool.py:57 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`send_email(`)
- **P0** `injection.llmail_tool_call_syntax` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/visa/secure_token.py:81 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API CALL`)
- **P0** `injection.llmail_tool_call_syntax` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/visa/secure_token.py:115 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API call`)
- **P0** `injection.llmail_tool_call_syntax` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/visa/secure_token.py:158 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API call`)
- **P0** `injection.llmail_tool_call_syntax` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/mcp_cart_tools/server.py:368 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`send_email(`)
- **P0** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/supervisor_agent/prompt_manager.py:75 — URL with a template slot for the agent to fill in. (`https://www.amazon.com/dp/{{ASIN}}`)
- **P0** `injection.exfil_instruction` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:71 — Instruction to send secrets or conversation data somewhere. (`Send token back to agent to`)
- **P0** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/components/DynamicMap.tsx:25 — URL with a template slot for the agent to fill in. (`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}`)
- **P0** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/components/DynamicMap.tsx:26 — URL with a template slot for the agent to fill in. (`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(destination)}`)
- **P0** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/web-ui/src/services/awsCalls.ts:16 — URL with a template slot for the agent to fill in. (`https://bedrock-agentcore.${AGENT_CONFIG.AWS_REGION}`)
- **P0** `injection.llmail_tool_call_syntax` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/visa/secure_token.py:81 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API CALL`)
- **P0** `injection.llmail_tool_call_syntax` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/visa/secure_token.py:115 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API call`)
- **P0** `injection.llmail_tool_call_syntax` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/visa/secure_token.py:158 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API call`)
- **P0** `injection.llmail_tool_call_syntax` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/mcp_cart_tools/server.py:550 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`send_email(`)
- **P0** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/supervisor_agent/prompt_manager.py:80 — URL with a template slot for the agent to fill in. (`https://www.amazon.com/dp/{{ASIN}}`)
- **P0** `injection.exfil_instruction` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:71 — Instruction to send secrets or conversation data somewhere. (`Send token back to agent to`)
- **P0** `injection.llmail_tool_call_syntax` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_SECRETS_SETUP.md:74 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API call`)
- **P0** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/components/DynamicMap.tsx:25 — URL with a template slot for the agent to fill in. (`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}`)
- **P0** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/components/DynamicMap.tsx:26 — URL with a template slot for the agent to fill in. (`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(destination)}`)
- **P0** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/components/TabbedSidebar.tsx:475 — URL with a template slot for the agent to fill in. (`https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}&waypoints=${waypoints}`)
- **P0** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/components/TabbedSidebar.tsx:476 — URL with a template slot for the agent to fill in. (`https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}`)
- **P0** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/components/TabbedSidebar.tsx:481 — URL with a template slot for the agent to fill in. (`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(location)}`)
- **P0** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/web-ui/src/services/awsCalls.ts:16 — URL with a template slot for the agent to fill in. (`https://bedrock-agentcore.${AGENT_CONFIG.AWS_REGION}`)
- **P1** `injection.css_hidden` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/cx-agent-frontend/src/components/chat.py:104 — CSS that hides text from people but not from an agent. (`font-size: 0`)
- **P2** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/lib/stacks/agentcore-stack.ts:166 — URL with a template slot for the agent to fill in. (infrastructure-as-code template: lowered) (`https://cognito-idp.${region}.amazonaws.com/${cognitoUserPool.userPoolId}`)
- **P2** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/lib/stacks/agentcore-stack.ts:447 — URL with a template slot for the agent to fill in. (infrastructure-as-code template: lowered) (`https://cognito-idp.${region}.amazonaws.com/${cognitoUserPool.userPoolId}`)
- **P2** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/cdk/lib/stacks/agentcore-stack.ts:499 — URL with a template slot for the agent to fill in. (infrastructure-as-code template: lowered) (`https://cognito-idp.${region}.amazonaws.com/${cognitoUserPool.userPoolId}`)
- **P2** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/agent-stack/lib/agent-stack.ts:32 — URL with a template slot for the agent to fill in. (infrastructure-as-code template: lowered) (`https://cognito-idp.${cognitoRegion}.amazonaws.com/${userPoolId}`)
- **P2** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/agent-stack/lib/constructs/gateway-construct.ts:167 — URL with a template slot for the agent to fill in. (infrastructure-as-code template: lowered) (`https://bedrock-agentcore.${region}`)
- **P2** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/frontend-stack/lib/frontend-stack.ts:65 — URL with a template slot for the agent to fill in. (infrastructure-as-code template: lowered) (`https://main.${this.amplifyApp.appId}`)
- **P2** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/mcp-servers/lib/base-mcp-stack.ts:39 — URL with a template slot for the agent to fill in. (infrastructure-as-code template: lowered) (`https://cognito-idp.${cognitoRegion}.amazonaws.com/${userPoolId}`)
- **P2** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/agent-stack/lib/agent-stack.ts:32 — URL with a template slot for the agent to fill in. (infrastructure-as-code template: lowered) (`https://cognito-idp.${cognitoRegion}.amazonaws.com/${userPoolId}`)
- **P2** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/agent-stack/lib/constructs/gateway-construct.ts:166 — URL with a template slot for the agent to fill in. (infrastructure-as-code template: lowered) (`https://bedrock-agentcore.${region}`)
- **P2** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/frontend-stack/lib/frontend-stack.ts:65 — URL with a template slot for the agent to fill in. (infrastructure-as-code template: lowered) (`https://main.${this.amplifyApp.appId}`)
- **P2** `injection.templated_url` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/mcp-servers/lib/base-mcp-stack.ts:39 — URL with a template slot for the agent to fill in. (infrastructure-as-code template: lowered) (`https://cognito-idp.${cognitoRegion}.amazonaws.com/${userPoolId}`)

### Simplified Technical English (STE)

- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:3 — Descriptive sentence has 26 words (limit 25). Split it. (`This demo walks through deploying an agent, authenticating a user, invoking the agent, and then adding an AgentCore Policy to enforce refund limits in real time`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:25 — Passive voice. Say who does the action (active voice). (`is installed`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:31 — Passive voice. Say who does the action (active voice). (`is not installed`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:49 — Descriptive sentence has 31 words (limit 25). Split it. (`> **Tip:** CODE runs pre-flight checks for all of the above — tools, CLI version, AWS credentials, Docker, and Bedrock model access — and will warn you with act`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:70 — Passive voice. Say who does the action (active voice). (`is attached`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:74 — Descriptive sentence has 33 words (limit 25). Split it. (`The agent uses **Anthropic Claude Sonnet 4.5** via a [global inference profile](URL Since October 2025, Amazon Bedrock [auto-enables all serverless foundation m`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:81 — Passive voice. Say who does the action (active voice). (`is configured`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:187 — Passive voice. Say who does the action (active voice). (`are enforced`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:191 — Procedural sentence has 25 words (limit 20). Split it. (`Open the **AWS Console** (confirm region), search for **Amazon Bedrock AgentCore** in the search bar, then navigate to **Policy Engine** and click **Create poli`)
- **P1** `ste.multiple_instructions` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:191 — More than one instruction in one sentence. Write one instruction per sentence. (`Open the **AWS Console** (confirm region), search for **Amazon Bedrock AgentCore** in the search bar, then navigate to **Policy Engine** and click **Create poli`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:199 — Procedural sentence has 23 words (limit 20). Split it. (`Type in prompt "Allow all authenticated users to call get_customer, list_customers, get_order, and list_orders" > Click Generate Cedar > Create policy`)
- **P1** `ste.multiple_instructions` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:199 — More than one instruction in one sentence. Write one instruction per sentence. (`Type in prompt "Allow all authenticated users to call get_customer, list_customers, get_order, and list_orders" > Click Generate Cedar > Create policy`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:205 — Procedural sentence has 29 words (limit 20). Split it. (`Type in prompt "Allow users in the standard cognito:groups to call process_refund only when the amount is less than or equal to 100" > Click Generate Cedar > Cr`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:265 — Passive voice. Say who does the action (active voice). (`is instrumented`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:270 — Descriptive sentence has 26 words (limit 25). Split it. (`> **Note:** If this is your first time using traces, CloudWatch will show a banner prompting you to enable **Transaction Search** — this is a one-time account s`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:279 — Descriptive sentence has 26 words (limit 25). Split it. (`After Step 6, look for the CODE tool call trace — you'll see the Gateway's policy evaluation returning a deny decision with the Cedar policy that blocked it.`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:281 — Passive voice. Say who does the action (active voice). (`is required`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:294 — Passive voice. Say who does the action (active voice). (`is scoped`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:18 — Passive voice. Say who does the action (active voice). (`being used`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:28 — Passive voice. Say who does the action (active voice). (`be wasted`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:44 — Descriptive sentence has 31 words (limit 25). Split it. (`As our projects, by default, use the default GitHub issue labels (enhancement/bug/duplicate/help wanted/invalid/question/wontfix), looking at any 'help wanted' `)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:54 — Descriptive sentence has 32 words (limit 25). Split it. (`If you discover a potential security issue in this project we ask that you notify AWS/Amazon Security via our [vulnerability reporting page](URL Please do **not`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:6 — Descriptive sentence has 29 words (limit 25). Split it. (`![](assets/agent01.png "Screenshot of Streamlit-based chat UI showing controls for configuring where the backend agent is hosted and to send feedback on AI resp`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:6 — Passive voice. Say who does the action (active voice). (`is hosted`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:25 — Descriptive sentence has 43 words (limit 25). Split it. (`The right choices will depend on your needs, and there are also different ways to handle these choices: From committing to a particular preferred tool, to build`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:27 — Descriptive sentence has 37 words (limit 25). Split it. (`In this sample we've tried to choose tools that are popular with our customers, and keep the code simple (avoid introducing extra abstraction layers) - so switc`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:29 — Descriptive sentence has 50 words (limit 25). Split it. (`Components include a (local) Streamlit application; Langfuse; Amazon Cognito; Amazon Bedrock AgentCore; Amazon Bedrock Guardrails; Amazon Bedrock Knowledge Base`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:33 — Descriptive sentence has 34 words (limit 25). Split it. (`![](assets/sample_sequence_diagram.png "Sequence diagram: Users log in and enter a question in the Streamlit frontend app, which raises a POST request to the '/`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:33 — Descriptive sentence has 28 words (limit 25). Split it. (`The agent starts a tracing span in Langfuse, then validates the input with Amazon Bedrock Guardrails before starting initial LLM processing of the prompt via th`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:33 — Descriptive sentence has 31 words (limit 25). Split it. (`The LLM returns tool call request(s) which the agent orchestrates via the Bedrock AgentCore Gateway to the relevant provider: Bedrock Knowledge Base, Tavily Web`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:33 — Descriptive sentence has 55 words (limit 25). Split it. (`After tool call(s), the Agent makes another LLM call to the GenAI Gateway to generate the final response.This final response is again checked with Amazon Bedroc`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:52 — Descriptive sentence has 29 words (limit 25). Split it. (`![](assets/llmgateway01.png "Screenshot of LiteLLM dashboard tracking capabilities, showing graphs of token usage over time; requests per day; spend per day; an`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:55 — Descriptive sentence has 33 words (limit 25). Split it. (`We combine [Amazon Bedrock AgentCore Observability](URL together with [Langfuse](URL (Open Source Edition deployed on AWS as shown [here](URL to collect and ana`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:64 — Descriptive sentence has 26 words (limit 25). Split it. (`![](assets/langfuse01.png "Screenshot of Langfuse UI, showing a nested trace of a multi-step agentic answer generation process including LLM calls, tool calls, `)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:64 — Descriptive sentence has 28 words (limit 25). Split it. (`The overall parent span is selected, and a detail pane shows the overall input and output of the request as well as estimated cost, latency, and other metadata.`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:64 — Passive voice. Say who does the action (active voice). (`is selected`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:81 — Descriptive sentence has 36 words (limit 25). Split it. (`You'll need access to your target AWS account with broad/administrative permissions - including e.g. to create IAM roles and policies, and to deploy and manage `)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:91 — Passive voice. Say who does the action (active voice). (`are optimized`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:91 — Passive voice. Say who does the action (active voice). (`been thoroughly tested`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:99 — Descriptive sentence has 30 words (limit 25). Split it. (`> ℹ️ **Note:** We suggest using [mise-en-place](URL to manage installation of Terraform and UV in case you need to work across projects using different versions`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:104 — Passive voice. Say who does the action (active voice). (`be performed`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:125 — Passive voice. Say who does the action (active voice). (`be prompted`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:125 — Descriptive sentence has 31 words (limit 25). Split it. (`You can [create a bucket](URL to use for this purpose, or if you prefer to just use Terraform's [local filesystem backend](URL then simply delete or comment-out`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:132 — Passive voice. Say who does the action (active voice). (`is deployed`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:148 — Passive voice. Say who does the action (active voice). (`is hosted`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:155 — Descriptive sentence has 26 words (limit 25). Split it. (`To enable your agent to search the web, you could sign up to [Tavily](URL and add your CODE to [infra/terraform.tfvars](infra/terraform.tfvars).`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:160 — Descriptive sentence has 36 words (limit 25). Split it. (`If you have a Zendesk environment, you could enable your agent to log and manage tickets by setting up an [API token](URL In [infra/terraform.tfvars](infra/terr`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:165 — Descriptive sentence has 29 words (limit 25). Split it. (`Once your tfvars configuration is set up and any external components you want to connect configured, you can deploy the core solution from your terminal via Ter`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:165 — Passive voice. Say who does the action (active voice). (`is set`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:181 — Passive voice. Say who does the action (active voice). (`is initialized`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:192 — Descriptive sentence has 30 words (limit 25). Split it. (`If you have internal documents your agent should be able to search over to help generate answers for users, You can ingest them into the created Amazon Bedrock `)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:200 — Passive voice. Say who does the action (active voice). (`are uploaded`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:208 — Descriptive sentence has 34 words (limit 25). Split it. (`You can check the progress of sync jobs via the [Amazon Bedrock Console](URL or the [GetIngestionJob API](URL Once it completes successfully, your documents sho`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:215 — Passive voice. Say who does the action (active voice). (`is provided`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:215 — Descriptive sentence has 26 words (limit 25). Split it. (`You'll need to set CODE to your email address, and CODE to a conformant password (8+ characters, containing upper- and lower-case characters and numbers and spe`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:217 — Descriptive sentence has 28 words (limit 25). Split it. (`> ⚠️ **Note:** These configurations are security-relevant, and the most appropriate settings will depend on your situation (applicable policies, whether you are`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:219 — Descriptive sentence has 29 words (limit 25). Split it. (`> In particular, the below commands are **not** recommended for setting up multiple users: Cognito can handle generating temporary credentials for you and shari`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:248 — Descriptive sentence has 34 words (limit 25). Split it. (`You can talk to your deployed agent either through the basic [chat_to_agentcore.ipynb](chat_to_agentcore.ipynb) Python notebook, or running the provided Streaml`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:278 — Descriptive sentence has 32 words (limit 25). Split it. (`So far we've focussed on the initial deployment and testing of the demo agent, but how would you use this sample to iteratively refine your own agents and evalu`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:285 — Descriptive sentence has 30 words (limit 25). Split it. (`Note that as configured by default, re-running CODE will replace your agent container image/tag in Amazon ECR, but will **not re-deploy** your AgentCore Runtime`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:287 — Descriptive sentence has 33 words (limit 25). Split it. (`![](assets/agentcore-v2-deployed.png "Screenshot of Agent Runtime detail page in Bedrock AgentCore console, showing 'Update hosting' action button and a banner `)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:287 — Passive voice. Say who does the action (active voice). (`been successfully deployed`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:384 — Passive voice. Say who does the action (active voice). (`be deleted`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:385 — Descriptive sentence has 26 words (limit 25). Split it. (`You **may** see an error that your S3 bucket(s) for knowledge base (document) storage and access logs storage can't be deleted because they contain data.`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:385 — Passive voice. Say who does the action (active voice). (`be deleted`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:387 — Descriptive sentence has 27 words (limit 25). Split it. (`If you created an Amazon S3 bucket to store the Terraform backend state, then after the infrastructure is destroyed remember to also empty and delete that bucke`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:387 — Passive voice. Say who does the action (active voice). (`is destroyed`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:389 — Passive voice. Say who does the action (active voice). (`is deleted`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:403 — Passive voice. Say who does the action (active voice). (`is licensed`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/SETUP.md:5 — Passive voice. Say who does the action (active voice). (`be pushed`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/tools/web-crawler/config.json:4 — Passive voice. Say who does the action (active voice). (`be included`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/README.md:26 — Passive voice. Say who does the action (active voice). (`is required`)
- **P1** `ste.multiple_instructions` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/README.md:33 — More than one instruction in one sentence. Write one instruction per sentence. (`Create virtual environment and install dependencies`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/README.md:41 — Passive voice. Say who does the action (active voice). (`is required`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/README.md:101 — Passive voice. Say who does the action (active voice). (`are stored`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/README.md:102 — Passive voice. Say who does the action (active voice). (`is restricted`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/README.md:103 — Passive voice. Say who does the action (active voice). (`are not logged`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:25 — Passive voice. Say who does the action (active voice). (`are not required`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:473 — Passive voice. Say who does the action (active voice). (`is configured`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:475 — Passive voice. Say who does the action (active voice). (`are enabled`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:126 — Passive voice. Say who does the action (active voice). (`is integrated`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:269 — Passive voice. Say who does the action (active voice). (`are tokenized`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/FRONTEND_MOCK_MODE.md:17 — Passive voice. Say who does the action (active voice). (`is enabled`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/FRONTEND_MOCK_MODE.md:35 — Passive voice. Say who does the action (active voice). (`are mocked`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_FEATURE_FLAG.md:37 — Passive voice. Say who does the action (active voice). (`is controlled`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_FEATURE_FLAG.md:40 — Passive voice. Say who does the action (active voice). (`are mocked`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_FEATURE_FLAG.md:41 — Passive voice. Say who does the action (active voice). (`are made`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_FEATURE_FLAG.md:42 — Passive voice. Say who does the action (active voice). (`are required`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:145 — Passive voice. Say who does the action (active voice). (`is received`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:211 — Passive voice. Say who does the action (active voice). (`is supported`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md:64 — Passive voice. Say who does the action (active voice). (`is registered`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md:203 — Passive voice. Say who does the action (active voice). (`is stored`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md:284 — Passive voice. Say who does the action (active voice). (`are deployed`)
- **P1** `ste.multiple_instructions` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/README.md:29 — More than one instruction in one sentence. Write one instruction per sentence. (`After deployment, copy the API Gateway URL from the output and update CODE:`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/README.md:5 — Passive voice. Say who does the action (active voice). (`are aligned`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/README.md:75 — Passive voice. Say who does the action (active voice). (`is provided`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/shopping-sequence-diagram.md:115 — Passive voice. Say who does the action (active voice). (`is replaced`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:5 — Descriptive sentence has 28 words (limit 25). Split it. (`This comprehensive guide explains the complete process flow for integrating Visa’s Intelligent Commers suite which includes tokenization,  authentication, payme`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:25 — Descriptive sentence has 30 words (limit 25). Split it. (`Before proceeding with these phases, ensure you have completed Phase 1 by onboarding to Visa Intelligent Commerce and obtaining all necessary credentials as des`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:45 — Passive voice. Say who does the action (active voice). (`is compromised`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:45 — Passive voice. Say who does the action (active voice). (`be used`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:45 — Descriptive sentence has 29 words (limit 25). Split it. (`VTS also handles the step-up authentication flows, including OTP verification, that establish identify of the consumer linked to the payment credential as well `)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:47 — Descriptive sentence has 29 words (limit 25). Split it. (`It manages purchase instructions, which are essentially pre-authorized payment intents that prove a user has verified their identity and has consented to a spec`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:49 — Descriptive sentence has 29 words (limit 25). Split it. (`It handles all the complex FIDO2 protocol interactions with the user's device, manages the secure display of authentication prompts, and returns only the necess`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:69 — Descriptive sentence has 26 words (limit 25). Split it. (`To begin integration, you must complete the agent onboarding process through Visa's Developer Portal at [developer.visa.com](URL To receive access email GDLAICo`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:121 — Passive voice. Say who does the action (active voice). (`be safely stored`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:127 — Passive voice. Say who does the action (active voice). (`be securely tokenized`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:141 — Passive voice. Say who does the action (active voice). (`is cryptographically linked`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:143 — Descriptive sentence has 34 words (limit 25). Split it. (`You also receive token metadata including the last 4 digits (for displaying to users), expiration date, and optionally, card art URLs that you can use in your U`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:145 — Passive voice. Say who does the action (active voice). (`be renewed`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:147 — Descriptive sentence has 38 words (limit 25). Split it. (`Even if your database is completely compromised, attackers cannot use this information to make fraudulent purchases because they don't have the passkey authenti`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:147 — Passive voice. Say who does the action (active voice). (`is completely compromised`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:158 — Passive voice. Say who does the action (active voice). (`is properly initialized`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:160 — Descriptive sentence has 28 words (limit 25). Split it. (`The CODE is an encrypted session token that will be used in subsequent VTS API calls to prove that you have an active, authenticated session with the iFrame.`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:162 — Descriptive sentence has 30 words (limit 25). Split it. (`This means every transaction requires a fresh session, which might seem inefficient but is crucial for security - it prevents token reuse attacks and ensures th`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:162 — Passive voice. Say who does the action (active voice). (`is independently authenticated`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:170 — Descriptive sentence has 27 words (limit 25). Split it. (`This request includes the secure token from Step 3, comprehensive browser data (timezone, screen dimensions, user agent, color depth, JavaScript capabilities), `)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:170 — Passive voice. Say who does the action (active voice). (`is included`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:172 — Descriptive sentence has 28 words (limit 25). Split it. (`If the action is "REGISTER", it means this device hasn't been bound to this token yet, and you need to proceed with the full device binding flow (Steps 5-9).`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:181 — Passive voice. Say who does the action (active voice). (`is done`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:187 — Descriptive sentence has 37 words (limit 25). Split it. (`Each method comes with an identifier that you'll use to select it, and a masked value showing where the OTP will be sent (like "**PSMS" for a phone number endin`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:187 — Passive voice. Say who does the action (active voice). (`is required`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:195 — Descriptive sentence has 46 words (limit 25). Split it. (`VTS responds with important constraints: CODE (typically 3) tells you how many times the user can request a new OTP, CODE (also typically 3) tells you how many `)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:197 — Passive voice. Say who does the action (active voice). (`was sent`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:197 — Passive voice. Say who does the action (active voice). (`is delayed`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:205 — Descriptive sentence has 26 words (limit 25). Split it. (`**Sandbox Testing**: In Visa's sandbox environment, you can use a "golden OTP" value of CODE that always works, bypassing the need for actual SMS/email delivery`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:213 — Descriptive sentence has 36 words (limit 25). Split it. (`This payload contains all the information needed for the browser to create a passkey: the relying party information (Visa's domain), the challenge itself (a ran`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:215 — Descriptive sentence has 34 words (limit 25). Split it. (`**What You Receive**: The response includes three critical pieces: an CODE (the specific iFrame URL to use for passkey creation), an CODE (the device identifier`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:226 — Descriptive sentence has 26 words (limit 25). Split it. (`**What to Store in Your Database**: Store the CODE (encrypted at rest), device identifier, and creation timestamp, all linked to the user profile and token ID.`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:241 — Passive voice. Say who does the action (active voice). (`is compromised`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:257 — Descriptive sentence has 33 words (limit 25). Split it. (`**The Authentication Payload**: Along with the action, VTS returns an CODE, CODE, and CODE - just like in Step 8, but this time the payload contains a FIDO2 aut`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:267 — Passive voice. Say who does the action (active voice). (`was used`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:272 — Descriptive sentence has 29 words (limit 25). Split it. (`This instruction is like a pre-authorization that proves the user has verified their identity and has consented to these specific purchase terms and intends to `)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:278 — Descriptive sentence has 27 words (limit 25). Split it. (`**Device and Risk Information**: The CODE section includes detailed device information - country code, device ID, IP address, device model and type, user agent,`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:282 — Descriptive sentence has 47 words (limit 25). Split it. (`**What the Instruction Represents**: Think of the instruction ID as a ticket that says "this user has been authenticated, they intend to purchase X amount from `)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:282 — Passive voice. Say who does the action (active voice). (`been authenticated`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:286 — Descriptive sentence has 26 words (limit 25). Split it. (`If you don't use the instruction ID to get payment credentials within this window, it expires and you'll need to start over with a new authentication.`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:291 — Passive voice. Say who does the action (active voice). (`is generated`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:297 — Descriptive sentence has 37 words (limit 25). Split it. (`**The Credentials Request**: You send a request to VIC that includes the CODE (identifying the payment method), the CODE (proving authorization), and detailed C`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:299 — Passive voice. Say who does the action (active voice). (`been fulfilled`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:313 — Passive voice. Say who does the action (active voice). (`been used`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:315 — Passive voice. Say who does the action (active voice). (`is declined`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:315 — Descriptive sentence has 28 words (limit 25). Split it. (`You should present this to the user in a clear way and give them options - try a different payment method, update their card information, or contact their bank.`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:325 — Procedural sentence has 28 words (limit 20). Split it. (`Include the instruction ID (for reference), the transaction amount and currency, the merchant name, the transaction status ("COMPLETED"), and timestamps for whe`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:325 — Passive voice. Say who does the action (active voice). (`was created`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:327 — Descriptive sentence has 27 words (limit 25). Split it. (`The user has successfully made a purchase using tokenized payment credentials and passkey authentication, without ever exposing their actual card number to your`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:332 — Passive voice. Say who does the action (active voice). (`be persisted`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:338 — Passive voice. Say who does the action (active voice). (`is required`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:340 — Passive voice. Say who does the action (active voice). (`are needed`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:351 — Passive voice. Say who does the action (active voice). (`are designed`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:363 — Descriptive sentence has 31 words (limit 25). Split it. (`For actual implementation, you'll need Visa's detailed API documentation, which includes exact request/response schemas, error codes and their meanings, encrypt`)
- **P1** `ste.multiple_instructions` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:371 — More than one instruction in one sentence. Write one instruction per sentence. (`Start with Phase 2 (tokenization) and verify you can successfully enroll cards and provision tokens.`)
- **P1** `ste.multiple_instructions` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:371 — More than one instruction in one sentence. Write one instruction per sentence. (`Then add Phase 3 (passkey setup) and test the complete device binding flow including OTP verification.`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/README.md:26 — Passive voice. Say who does the action (active voice). (`is required`)
- **P1** `ste.multiple_instructions` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/README.md:33 — More than one instruction in one sentence. Write one instruction per sentence. (`Create virtual environment and install dependencies`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/README.md:41 — Passive voice. Say who does the action (active voice). (`is required`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/README.md:101 — Passive voice. Say who does the action (active voice). (`are stored`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/README.md:102 — Passive voice. Say who does the action (active voice). (`is restricted`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/README.md:103 — Passive voice. Say who does the action (active voice). (`are not logged`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:25 — Passive voice. Say who does the action (active voice). (`are not required`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:476 — Passive voice. Say who does the action (active voice). (`is configured`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:478 — Passive voice. Say who does the action (active voice). (`are enabled`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:82 — Passive voice. Say who does the action (active voice). (`is created`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:316 — Passive voice. Say who does the action (active voice). (`are tokenized`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/FRONTEND_MOCK_MODE.md:17 — Passive voice. Say who does the action (active voice). (`is enabled`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/FRONTEND_MOCK_MODE.md:35 — Passive voice. Say who does the action (active voice). (`are mocked`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_FEATURE_FLAG.md:37 — Passive voice. Say who does the action (active voice). (`is controlled`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_FEATURE_FLAG.md:40 — Passive voice. Say who does the action (active voice). (`are mocked`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_FEATURE_FLAG.md:41 — Passive voice. Say who does the action (active voice). (`are made`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_FEATURE_FLAG.md:42 — Passive voice. Say who does the action (active voice). (`are required`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:145 — Passive voice. Say who does the action (active voice). (`is received`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:211 — Passive voice. Say who does the action (active voice). (`is supported`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md:64 — Passive voice. Say who does the action (active voice). (`is registered`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_SECRETS_SETUP.md:32 — Passive voice. Say who does the action (active voice). (`are automatically created`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/README.md:199 — Passive voice. Say who does the action (active voice). (`is stored`)
- **P1** `ste.multiple_instructions` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/README.md:29 — More than one instruction in one sentence. Write one instruction per sentence. (`After deployment, copy the API Gateway URL from the output and update CODE:`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/README.md:5 — Descriptive sentence has 31 words (limit 25). Split it. (`The travel assistant specializes in all travel-related queries including destination research, weather information, flight and hotel searches, and local recomme`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/README.md:5 — Passive voice. Say who does the action (active voice). (`are aligned`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/README.md:122 — Passive voice. Say who does the action (active voice). (`is provided`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/travel-booking-sequence-diagram.md:101 — Passive voice. Say who does the action (active voice). (`is enrolled`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/travel-booking-sequence-diagram.md:118 — Passive voice. Say who does the action (active voice). (`is replaced`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:5 — Descriptive sentence has 28 words (limit 25). Split it. (`This comprehensive guide explains the complete process flow for integrating Visa’s Intelligent Commers suite which includes tokenization,  authentication, payme`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:25 — Descriptive sentence has 30 words (limit 25). Split it. (`Before proceeding with these phases, ensure you have completed Phase 1 by onboarding to Visa Intelligent Commerce and obtaining all necessary credentials as des`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:45 — Passive voice. Say who does the action (active voice). (`is compromised`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:45 — Passive voice. Say who does the action (active voice). (`be used`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:45 — Descriptive sentence has 29 words (limit 25). Split it. (`VTS also handles the step-up authentication flows, including OTP verification, that establish identify of the consumer linked to the payment credential as well `)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:47 — Descriptive sentence has 29 words (limit 25). Split it. (`It manages purchase instructions, which are essentially pre-authorized payment intents that prove a user has verified their identity and has consented to a spec`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:49 — Descriptive sentence has 29 words (limit 25). Split it. (`It handles all the complex FIDO2 protocol interactions with the user's device, manages the secure display of authentication prompts, and returns only the necess`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:69 — Descriptive sentence has 26 words (limit 25). Split it. (`To begin integration, you must complete the agent onboarding process through Visa's Developer Portal at [developer.visa.com](URL To receive access email GDLAICo`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:121 — Passive voice. Say who does the action (active voice). (`be safely stored`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:127 — Passive voice. Say who does the action (active voice). (`be securely tokenized`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:141 — Passive voice. Say who does the action (active voice). (`is cryptographically linked`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:143 — Descriptive sentence has 34 words (limit 25). Split it. (`You also receive token metadata including the last 4 digits (for displaying to users), expiration date, and optionally, card art URLs that you can use in your U`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:145 — Passive voice. Say who does the action (active voice). (`be renewed`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:147 — Descriptive sentence has 38 words (limit 25). Split it. (`Even if your database is completely compromised, attackers cannot use this information to make fraudulent purchases because they don't have the passkey authenti`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:147 — Passive voice. Say who does the action (active voice). (`is completely compromised`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:158 — Passive voice. Say who does the action (active voice). (`is properly initialized`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:160 — Descriptive sentence has 28 words (limit 25). Split it. (`The CODE is an encrypted session token that will be used in subsequent VTS API calls to prove that you have an active, authenticated session with the iFrame.`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:162 — Descriptive sentence has 30 words (limit 25). Split it. (`This means every transaction requires a fresh session, which might seem inefficient but is crucial for security - it prevents token reuse attacks and ensures th`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:162 — Passive voice. Say who does the action (active voice). (`is independently authenticated`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:170 — Descriptive sentence has 27 words (limit 25). Split it. (`This request includes the secure token from Step 3, comprehensive browser data (timezone, screen dimensions, user agent, color depth, JavaScript capabilities), `)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:170 — Passive voice. Say who does the action (active voice). (`is included`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:172 — Descriptive sentence has 28 words (limit 25). Split it. (`If the action is "REGISTER", it means this device hasn't been bound to this token yet, and you need to proceed with the full device binding flow (Steps 5-9).`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:181 — Passive voice. Say who does the action (active voice). (`is done`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:187 — Descriptive sentence has 37 words (limit 25). Split it. (`Each method comes with an identifier that you'll use to select it, and a masked value showing where the OTP will be sent (like "**PSMS" for a phone number endin`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:187 — Passive voice. Say who does the action (active voice). (`is required`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:195 — Descriptive sentence has 46 words (limit 25). Split it. (`VTS responds with important constraints: CODE (typically 3) tells you how many times the user can request a new OTP, CODE (also typically 3) tells you how many `)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:197 — Passive voice. Say who does the action (active voice). (`was sent`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:197 — Passive voice. Say who does the action (active voice). (`is delayed`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:205 — Descriptive sentence has 26 words (limit 25). Split it. (`**Sandbox Testing**: In Visa's sandbox environment, you can use a "golden OTP" value of CODE that always works, bypassing the need for actual SMS/email delivery`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:213 — Descriptive sentence has 36 words (limit 25). Split it. (`This payload contains all the information needed for the browser to create a passkey: the relying party information (Visa's domain), the challenge itself (a ran`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:215 — Descriptive sentence has 34 words (limit 25). Split it. (`**What You Receive**: The response includes three critical pieces: an CODE (the specific iFrame URL to use for passkey creation), an CODE (the device identifier`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:226 — Descriptive sentence has 26 words (limit 25). Split it. (`**What to Store in Your Database**: Store the CODE (encrypted at rest), device identifier, and creation timestamp, all linked to the user profile and token ID.`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:241 — Passive voice. Say who does the action (active voice). (`is compromised`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:257 — Descriptive sentence has 33 words (limit 25). Split it. (`**The Authentication Payload**: Along with the action, VTS returns an CODE, CODE, and CODE - just like in Step 8, but this time the payload contains a FIDO2 aut`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:267 — Passive voice. Say who does the action (active voice). (`was used`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:272 — Descriptive sentence has 29 words (limit 25). Split it. (`This instruction is like a pre-authorization that proves the user has verified their identity and has consented to these specific purchase terms and intends to `)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:278 — Descriptive sentence has 27 words (limit 25). Split it. (`**Device and Risk Information**: The CODE section includes detailed device information - country code, device ID, IP address, device model and type, user agent,`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:282 — Descriptive sentence has 47 words (limit 25). Split it. (`**What the Instruction Represents**: Think of the instruction ID as a ticket that says "this user has been authenticated, they intend to purchase X amount from `)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:282 — Passive voice. Say who does the action (active voice). (`been authenticated`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:286 — Descriptive sentence has 26 words (limit 25). Split it. (`If you don't use the instruction ID to get payment credentials within this window, it expires and you'll need to start over with a new authentication.`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:291 — Passive voice. Say who does the action (active voice). (`is generated`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:297 — Descriptive sentence has 37 words (limit 25). Split it. (`**The Credentials Request**: You send a request to VIC that includes the CODE (identifying the payment method), the CODE (proving authorization), and detailed C`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:299 — Passive voice. Say who does the action (active voice). (`been fulfilled`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:313 — Passive voice. Say who does the action (active voice). (`been used`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:315 — Passive voice. Say who does the action (active voice). (`is declined`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:315 — Descriptive sentence has 28 words (limit 25). Split it. (`You should present this to the user in a clear way and give them options - try a different payment method, update their card information, or contact their bank.`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:325 — Procedural sentence has 28 words (limit 20). Split it. (`Include the instruction ID (for reference), the transaction amount and currency, the merchant name, the transaction status ("COMPLETED"), and timestamps for whe`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:325 — Passive voice. Say who does the action (active voice). (`was created`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:327 — Descriptive sentence has 27 words (limit 25). Split it. (`The user has successfully made a purchase using tokenized payment credentials and passkey authentication, without ever exposing their actual card number to your`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:332 — Passive voice. Say who does the action (active voice). (`be persisted`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:338 — Passive voice. Say who does the action (active voice). (`is required`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:340 — Passive voice. Say who does the action (active voice). (`are needed`)
- **P1** `ste.passive_voice` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:351 — Passive voice. Say who does the action (active voice). (`are designed`)
- **P1** `ste.sentence_length` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:363 — Descriptive sentence has 31 words (limit 25). Split it. (`For actual implementation, you'll need Visa's detailed API documentation, which includes exact request/response schemas, error codes and their meanings, encrypt`)
- **P1** `ste.multiple_instructions` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:371 — More than one instruction in one sentence. Write one instruction per sentence. (`Start with Phase 2 (tokenization) and verify you can successfully enroll cards and provision tokens.`)
- **P1** `ste.multiple_instructions` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:371 — More than one instruction in one sentence. Write one instruction per sentence. (`Then add Phase 3 (passkey setup) and test the complete device binding flow including OTP verification.`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:3 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`customer support agent built`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:3 — "authenticating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, authenticating a`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:3 — "invoking" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, invoking the`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:3 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`demo walks through deploying`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:49 — Progressive tense (be + -ing). Use simple present. (`is missing`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:55 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:70 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:70 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`together require broad permissions`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:70 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:74 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:74 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:74 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`agent uses Anthropic Claude Sonnet`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:79 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`enables Anthropic models across`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:106 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent running Claude Sonnet`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:122 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`demo uses Amazon Cognito`)
- **P2** `ste.phrasal_verb` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:130 — Phrasal verb "look up". Try: find. (`look up`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:137 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:157 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`user identity flows end-to-end`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:159 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Now try fetching orders`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:181 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`refund goes through because`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:181 — Perfect tense. Use simple past or present. (`has unrestricted`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:187 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent cannot bypass them`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:225 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:225 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`User authenticates via Cognito`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:227 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Gateway sends user claims`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:228 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Policy Engine evaluates Cedar policies`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:270 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`first time using traces`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:274 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:281 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:294 — "Using" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Using the`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/customer-support-agent-with-agentcore/README.md:294 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent reference earlier parts`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CODE_OF_CONDUCT.md:2 — Perfect tense. Use simple past or present. (`has adopted`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CODE_OF_CONDUCT.md:4 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:3 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:6 — "submitting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before submitting any`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:6 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:14 — "filing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`When filing an`)
- **P2** `ste.phrasal_verb` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:14 — Phrasal verb "make sure". Try: verify / ensure. (`make sure`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:15 — Vague word "try to". Give the exact condition, value or action. (`try to`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:24 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:24 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Contributions via pull requests`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:24 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:26 — Progressive tense (be + -ing). Use simple present. (`are working`)
- **P2** `ste.phrasal_verb` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:27 — Phrasal verb "make sure". Try: verify / ensure. (`make sure`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:33 — Progressive tense (be + -ing). Use simple present. (`are contributing`)
- **P2** `ste.semicolon` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:33 — Semicolon. Use two sentences. (`Modify the source; please focus on the specific change you are contributing.`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:33 — "Modify" → change (plain-word hint). (`Modify`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:34 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:35 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`fork using clear commit messages`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:36 — "answering" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, answering any`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:39 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:48 — Perfect tense. Use simple past or present. (`has adopted`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:50 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/CONTRIBUTING.md:54 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:4 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`intelligent customer experience platform built`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:4 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`customer service capabilities through`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:25 — Modal + be + past participle. Use an active verb. (`could be used`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:27 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.semicolon` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:29 — Semicolon. Use two sentences. (`Components include a (local) Streamlit application; Langfuse; Amazon Cognito; Amazon Bedrock AgentCore; Amazon Bedrock Guardrails; Amazon Bedrock Knowledge Base`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:29 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:29 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Amazon Bedrock Knowledge Base`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:29 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Amazon Bedrock Foundation Models`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:33 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:33 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:37 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:37 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`customer service agent integrating`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:39 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`cross-project governance like cost tracking`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:40 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`real-time like prompt injection attempts`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:41 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:45 — "numerous" → many (plain-word hint). (`numerous`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:46 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Intelligent request distribution across model endpoints`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:47 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`cost tracking across providers`)
- **P2** `ste.semicolon` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:52 — Semicolon. Use two sentences. (`![](assets/llmgateway01.png "Screenshot of LiteLLM dashboard tracking capabilities, showing graphs of token usage over time; requests per day; spend per day; an`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:57 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent execution tracing including`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:64 — "showing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, showing a`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:81 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:97 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`container image build tool`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:99 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`work across projects using different versions`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:104 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:104 — Vague word "generally". Give the exact condition, value or action. (`generally`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:110 — Vague word "as needed". Give the exact condition, value or action. (`as needed`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:114 — Perfect tense. Use simple past or present. (`have configured`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:125 — "deploying" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`when deploying the`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:125 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Amazon S Bucket name`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:135 — Vague word "probably". Give the exact condition, value or action. (`probably`)
- **P2** `ste.phrasal_verb` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:165 — Phrasal verb "set up". Try: prepare / install. (`set up`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:165 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:187 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:192 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Amazon Bedrock Knowledge Base`)
- **P2** `ste.phrasal_verb` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:194 — Phrasal verb "look up". Try: find. (`look up`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:194 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Amazon S data bucket`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:208 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:213 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Amazon Cognito User Pool`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:217 — Progressive tense (be + -ing). Use simple present. (`are generating`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:217 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:217 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:219 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`handle generating temporary credentials`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:243 — Perfect tense. Use simple past or present. (`have completed`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:243 — Vague word "usually". Give the exact condition, value or action. (`usually`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:252 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent through Python notebook`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:273 — Progressive tense (be + -ing). Use simple present. (`is running`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:285 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:287 — Perfect tense. Use simple past or present. (`has been`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:287 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Agent Runtime detail page`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:292 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`assess agent performance across multiple dimensions`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:303 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`traces including tool calls`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:304 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Evaluate response quality using Bedrock`)
- **P2** `ste.phrasal_verb` awslabs__agentcore-samples/05-blueprints/end-to-end-customer-service-agent/README.md:393 — Phrasal verb "set up". Try: prepare / install. (`set up`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/README.md:3 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`repository contains modular tools`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/README.md:25 — "Perform" → do (plain-word hint). (`Perform`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/SETUP.md:9 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/SETUP.md:82 — "Perform" → do (plain-word hint). (`Perform`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/SETUP.md:83 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/SETUP.md:83 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Supports common math functions sqrt`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/SETUP.md:95 — Modal + be + past participle. Use an active verb. (`must be verified`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/tools/datetime/config.json:2 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/multitenant-agentic-platform/agent-tools-repo/tools/email-sender/config.json:1 — Modal + be + past participle. Use an active verb. (`must be verified`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/README.md:22 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`hosts entry one-time setup`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/concierge_agent/local-visa-server/README.md:40 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa iframe one-time setup`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:15 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:19 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:25 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:27 — Modal + be + past participle. Use an active verb. (`will be disabled`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:38 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Systems Manager Parameter Store`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:73 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:78 — Modal + be + past participle. Use an active verb. (`must be obtained`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:90 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Deploy Visa Lambda proxy`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:173 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa Secrets Manager access`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:190 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Deploys main supervisor agent`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:231 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:273 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa Integration Requires Step`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:301 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa Lambda proxy Step`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:308 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:317 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`deploy multiple independent instances`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:404 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Issue Docker build fails`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:473 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:475 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:477 — Modal + be + past participle. Use an active verb. (`must be set`)
- **P2** `ste.semicolon` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:534 — Semicolon. Use two sentences. (`find concierge_agent/mcp_* -name Dockerfile -exec touch {} \;`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:534 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`name Dockerfile exec touch`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/DEPLOYMENT.md:612 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`npx ampx pipeline-deploy branch main`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:5 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Concierge Agent system consists`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:16 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:21 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:27 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:30 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Manages tool invocations across`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:34 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:34 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:34 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`appropriate agent via Gateway`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:52 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`product information including prices`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:62 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`language product search query`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:73 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Product search requires Product Advertising`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:73 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`returns placeholder response directing users`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:80 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:111 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`generation requires Product Advertising`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:115 — Progressive tense (be + -ing). Use simple present. (`is pending`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:119 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Assistant recognizes product search intent`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:121 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Internet Search returns articles`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:122 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`cart using product names`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:130 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`prices across different sellers`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:215 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Returns summary requiring user confirmation`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:235 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:235 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Processes payment via Visa tokenization`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:254 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:254 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Sends purchase confirmation via`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:269 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:289 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:293 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Assistant returns product recommendations`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:298 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:298 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Cart Manager via Gateway`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:328 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:334 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`data flows through Supervisor`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:343 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:344 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:367 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Maintain conversation context across agent calls`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:417 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`prices across multiple sellers`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/AGENT_CAPABILITIES_SHOPPING.md:438 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`handle complex multi-step workflows while maintaining`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/FRONTEND_MOCK_MODE.md:5 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Payment Method button without Visa`)
- **P2** `ste.phrasal_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/FRONTEND_MOCK_MODE.md:34 — Phrasal verb "Fill in". Try: write / enter. (`Fill in`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/FRONTEND_MOCK_MODE.md:97 — Vague word "probably". Give the exact condition, value or action. (`probably`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/FRONTEND_MOCK_MODE.md:144 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa iframe integration details`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:5 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`secure card onboarding during`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:193 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:202 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:207 — Perfect tense. Use simple past or present. (`has loaded`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:207 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md:12 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Secure token sent back`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md:13 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Agent completes card onboarding`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md:34 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent mentions card onboarding`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md:37 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`see Visa secure checkout iframe`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md:68 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`iframe origin matches Visa domain`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md:69 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`browser allows iframe embedding`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md:70 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/docs/VISA_LOCAL_SETUP.md:53 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md:3 — "deploying" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for deploying the`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md:21 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Main supervisor agent infrastructure`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md:23 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Conversation persistence short-term memory`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md:36 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md:49 — Modal + be + past participle. Use an active verb. (`Must be deployed`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md:67 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`project root using npm scripts`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md:142 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md:153 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`servers imports Cognito config`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md:154 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Agent stack imports Cognito`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md:237 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Deploy Amplify backend first`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md:252 — Progressive tense (be + -ing). Use simple present. (`is running`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md:252 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md:278 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md:284 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md:307 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/README.md:310 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Secrets Manager secrets Visa credentials`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/infrastructure/visa-lambda-stack/README.md:69 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`See full deployment guide`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/README.md:5 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`queries including reviews research`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/README.md:20 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa tokenization support feature`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/README.md:21 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Persistent chat history across sessions`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/README.md:67 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Visa Payment Integration Mock vs`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/README.md:76 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/README.md:8 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa payment integration process`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/README.md:18 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Card tokenization one-time setup`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/README.md:19 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Passkey creation one-time setup`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/README.md:25 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Card tokenization one-time setup`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/README.md:26 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Passkey creation one-time setup`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/README.md:34 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa Payment Integration Guide`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/README.md:42 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa Payment Integration Guide`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/README.md:43 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa Payment Integration Guide`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/README.md:50 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Provides secure passkey creation`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/README.md:64 — "updating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`When updating this`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/shopping-sequence-diagram.md:115 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/shopping-sequence-diagram.md:116 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/shopping-sequence-diagram.md:116 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`verification via Visa Auth`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:5 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`secure payments while protecting`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:9 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa payment integration consists`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:13 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa Intelligent Commerce platform`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:17 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`secure token one-time setup per card`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:19 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`one-time setup per device`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:25 — Perfect tense. Use simple past or present. (`have completed`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:25 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:33 — "orchestrating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, orchestrating the`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:33 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`intelligent intermediary between users`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:33 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`entire payment flow while maintaining security`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:33 — "building" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for building this`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:35 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`provides built-in state management`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:37 — Modal + be + past participle. Use an active verb. (`can be deployed`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:39 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`payment integration flow itself`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:47 — Perfect tense. Use simple past or present. (`has verified`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:47 — Perfect tense. Use simple past or present. (`has consented`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:47 — "utilize" → use (plain-word hint). (`utilize`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:49 — "ensuring" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, ensuring that`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:55 — "implementing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Before implementing the`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:55 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa Intelligent Commerce platform`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:59 — "facilitate" → help (plain-word hint). (`facilitate`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:63 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:63 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`ensure payment requests match`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:69 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent onboarding process through`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:77 — "Obtain" → get (plain-word hint). (`Obtain`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:80 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:104 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa services requires valid`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:115 — "obtain" → get (plain-word hint). (`obtain`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:125 — Modal + be + past participle. Use an active verb. (`should be encrypted`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:129 — Modal + be + past participle. Use an active verb. (`must be encrypted`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:131 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`basic card metadata like`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:133 — Modal + be + past participle. Use an active verb. (`should be kept`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:133 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:133 — Vague word "a few". Give the exact condition, value or action. (`a few`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:137 — Modal + be + past participle. Use an active verb. (`will be used`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:139 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:139 — Modal + be + past participle. Use an active verb. (`will be used`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:139 — "indicate" → show (plain-word hint). (`indicate`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:143 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:143 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:145 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`digits help users identify`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:147 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`generate valid cryptograms without going through`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:160 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:160 — Modal + be + past participle. Use an active verb. (`will be used`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:160 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`device fingerprint session identifier`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:162 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`current operation either passkey creation`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:162 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`prevents token reuse attacks`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:164 — Modal + be + past participle. Use an active verb. (`should be kept`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:172 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`full device binding flow Steps`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:174 — Modal + be + past participle. Use an active verb. (`will be used`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:176 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`prevents unnecessary device binding attempts`)
- **P2** `ste.phrasal_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:176 — Phrasal verb "set up". Try: prepare / install. (`set up`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:176 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`improves user experience while maintaining security`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:185 — "including" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, including the`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:185 — "indicate" → show (plain-word hint). (`indicate`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:187 — Vague word "Typically". Give the exact condition, value or action. (`Typically`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:187 — Modal + be + past participle. Use an active verb. (`will be sent`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:187 — "indicating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, indicating that`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:189 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`email gives users flexibility`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:191 — "Selecting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`: Selecting the`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:195 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:195 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:195 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.phrasal_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:197 — Phrasal verb "Make sure". Try: verify / ensure. (`Make sure`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:199 — "Validating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`: Validating the`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:205 — "bypassing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, bypassing the`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:211 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`another device attestation request`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:213 — Modal + be + past participle. Use an active verb. (`must be signed`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:215 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`identifier ties everything back`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:215 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`specific device binding session`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:217 — Modal + be + past participle. Use an active verb. (`should be kept`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:235 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`happen once per card per device`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:241 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Security best practices dictate`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:241 — "requiring" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`By requiring a`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:243 — Progressive tense (be + -ing). Use simple present. (`be authenticating`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:253 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`passkey verification without going through`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:257 — "making" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, making it`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:272 — Perfect tense. Use simple past or present. (`has verified`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:272 — Perfect tense. Use simple past or present. (`has consented`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:274 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`constraints like decline thresholds`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:274 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`section provides device information`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:274 — Progressive tense (be + -ing). Use simple present. (`is purchasing`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:276 — Modal + be + past participle. Use an active verb. (`can be charged`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:276 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:278 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:282 — Perfect tense. Use simple past or present. (`has been authenticated`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:284 — Modal + be + past participle. Use an active verb. (`should be kept`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:286 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:286 — Vague word "a few". Give the exact condition, value or action. (`a few`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:286 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`get payment credentials within`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:297 — "creating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, creating a`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:297 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:299 — Perfect tense. Use simple past or present. (`has been fulfilled`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:301 — "indicate" → show (plain-word hint). (`indicate`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:315 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:342 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`store transaction history including instruction`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:347 — "implementing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`When implementing this`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:349 — Modal + be + past participle. Use an active verb. (`should be encrypted`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:367 — "Obtain" → get (plain-word hint). (`Obtain`)
- **P2** `ste.phrasal_verb` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:367 — Phrasal verb "Set up". Try: prepare / install. (`Set up`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:371 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`complete device binding flow including`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:375 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`document covers agent orchestration patterns`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/shopping-concierge-agent/visa-documentation/visa-payment-integration-guide.md:383 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`See separate architecture guide`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/README.md:22 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`hosts entry one-time setup`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/concierge_agent/local-visa-server/README.md:40 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa iframe one-time setup`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:15 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:19 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:25 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:30 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Enables travel search functionality`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:35 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Application uses mock mode`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:74 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:79 — Modal + be + past participle. Use an active verb. (`must be obtained`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:91 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Deploy Visa Lambda proxy`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:174 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa Secrets Manager access`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:193 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Deploys main supervisor agent`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:234 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:276 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa Integration Requires Step`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:304 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa Lambda proxy Step`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:311 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:320 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`deploy multiple independent instances`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:407 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Issue Docker build fails`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:476 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:478 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:480 — Modal + be + past participle. Use an active verb. (`must be set`)
- **P2** `ste.semicolon` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:537 — Semicolon. Use two sentences. (`find concierge_agent/mcp_* -name Dockerfile -exec touch {} \;`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:537 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`name Dockerfile exec touch`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/DEPLOYMENT.md:615 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`npx ampx pipeline-deploy branch main`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:5 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Concierge Agent system consists`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:16 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:21 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:32 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Supports multiple item types`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:33 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Stores details like title`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:72 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:75 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Manages tool invocations across`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:79 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:79 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:79 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`appropriate agent via Gateway`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:89 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`queries including destination research`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:95 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Retrieves day weather forecast`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:109 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Performs web searches using`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:112 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`relevant results per query`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:122 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`place information including ratings`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:127 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Coffee shops near Eiffel Tower`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:135 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Returns flight details including airlines`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:136 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:139 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:140 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:143 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Maximum price filter default`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:150 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Returns hotel details including name`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:151 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:154 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:155 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:156 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:157 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Maximum price per night default`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:213 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Normalizes pricing removes night suffix`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:266 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Returns summary requiring user confirmation`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:282 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:282 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Processes payment via Visa tokenization`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:301 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:301 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Sends purchase confirmation via`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:316 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:333 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`User Request I want`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:336 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:336 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Travel Assistant via Gateway`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:342 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Travel Assistant compiles complete day itinerary`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:347 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:347 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Cart Manager via Gateway`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:378 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:384 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`data flows through Supervisor`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:393 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:394 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:417 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:418 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Maintain conversation context across agent calls`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/AGENT_CAPABILITIES.md:457 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`handle complex multi-step workflows while maintaining`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/FRONTEND_MOCK_MODE.md:5 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Payment Method button without Visa`)
- **P2** `ste.phrasal_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/FRONTEND_MOCK_MODE.md:34 — Phrasal verb "Fill in". Try: write / enter. (`Fill in`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/FRONTEND_MOCK_MODE.md:97 — Vague word "probably". Give the exact condition, value or action. (`probably`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/FRONTEND_MOCK_MODE.md:144 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa iframe integration details`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:5 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`secure card onboarding during`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:193 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:202 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:207 — Perfect tense. Use simple past or present. (`has loaded`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_INTEGRATION.md:207 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md:12 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Secure token sent back`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md:13 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Agent completes card onboarding`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md:34 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent mentions card onboarding`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md:37 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`see Visa secure checkout iframe`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md:68 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`iframe origin matches Visa domain`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md:69 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`browser allows iframe embedding`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_IFRAME_QUICKSTART.md:70 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_LOCAL_SETUP.md:53 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/docs/VISA_SECRETS_SETUP.md:73 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`per secret per month`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/README.md:3 — "deploying" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for deploying the`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/README.md:16 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Travel planning tools weather`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/README.md:22 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Main supervisor agent infrastructure`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/README.md:24 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Conversation persistence short-term memory`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/README.md:37 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/README.md:49 — Modal + be + past participle. Use an active verb. (`Must be deployed`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/README.md:67 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`project root using npm scripts`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/README.md:140 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/README.md:150 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`servers imports Cognito config`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/README.md:151 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Agent stack imports Cognito`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/README.md:225 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Deploy Amplify backend first`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/README.md:238 — Progressive tense (be + -ing). Use simple present. (`is running`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/README.md:238 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/README.md:263 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/README.md:276 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/infrastructure/visa-lambda-stack/README.md:69 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`See full deployment guide`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/README.md:5 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`queries including destination research`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/README.md:5 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`recommendations leveraging Online Travel Agency`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/README.md:22 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa tokenization support feature`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/README.md:23 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Persistent chat history across sessions`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/README.md:61 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Complete step-by-step deployment instructions`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/README.md:99 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/README.md:123 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/README.md:8 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa payment integration process`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/README.md:18 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Card tokenization one-time setup`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/README.md:19 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Passkey creation one-time setup`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/README.md:28 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa Payment Integration Guide`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/README.md:36 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa Payment Integration Guide`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/README.md:37 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa Payment Integration Guide`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/README.md:44 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Provides secure passkey creation`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/README.md:58 — "updating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`When updating this`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/travel-booking-sequence-diagram.md:97 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`secure payment flow using tokenization`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/travel-booking-sequence-diagram.md:100 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/travel-booking-sequence-diagram.md:105 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/travel-booking-sequence-diagram.md:114 — Possible noun cluster of 7 words. Break it up with "of", "for" or a verb. (`Merchants process payment without seeing card details`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/travel-booking-sequence-diagram.md:118 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/travel-booking-sequence-diagram.md:119 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/travel-booking-sequence-diagram.md:119 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`authentication via Visa Auth`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:5 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`secure payments while protecting`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:9 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa payment integration consists`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:13 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa Intelligent Commerce platform`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:17 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`secure token one-time setup per card`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:19 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`one-time setup per device`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:25 — Perfect tense. Use simple past or present. (`have completed`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:25 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:33 — "orchestrating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, orchestrating the`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:33 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`intelligent intermediary between users`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:33 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`entire payment flow while maintaining security`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:33 — "building" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for building this`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:35 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`provides built-in state management`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:37 — Modal + be + past participle. Use an active verb. (`can be deployed`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:39 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`payment integration flow itself`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:47 — Perfect tense. Use simple past or present. (`has verified`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:47 — Perfect tense. Use simple past or present. (`has consented`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:47 — "utilize" → use (plain-word hint). (`utilize`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:49 — "ensuring" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, ensuring that`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:55 — "implementing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Before implementing the`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:55 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa Intelligent Commerce platform`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:59 — "facilitate" → help (plain-word hint). (`facilitate`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:63 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:63 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`ensure payment requests match`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:69 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent onboarding process through`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:77 — "Obtain" → get (plain-word hint). (`Obtain`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:80 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:104 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Visa services requires valid`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:115 — "obtain" → get (plain-word hint). (`obtain`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:125 — Modal + be + past participle. Use an active verb. (`should be encrypted`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:129 — Modal + be + past participle. Use an active verb. (`must be encrypted`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:131 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`basic card metadata like`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:133 — Modal + be + past participle. Use an active verb. (`should be kept`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:133 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:133 — Vague word "a few". Give the exact condition, value or action. (`a few`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:137 — Modal + be + past participle. Use an active verb. (`will be used`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:139 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:139 — Modal + be + past participle. Use an active verb. (`will be used`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:139 — "indicate" → show (plain-word hint). (`indicate`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:143 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:143 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:145 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`digits help users identify`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:147 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`generate valid cryptograms without going through`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:160 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:160 — Modal + be + past participle. Use an active verb. (`will be used`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:160 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`device fingerprint session identifier`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:162 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`current operation either passkey creation`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:162 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`prevents token reuse attacks`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:164 — Modal + be + past participle. Use an active verb. (`should be kept`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:172 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`full device binding flow Steps`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:174 — Modal + be + past participle. Use an active verb. (`will be used`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:176 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`prevents unnecessary device binding attempts`)
- **P2** `ste.phrasal_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:176 — Phrasal verb "set up". Try: prepare / install. (`set up`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:176 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`improves user experience while maintaining security`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:185 — "including" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, including the`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:185 — "indicate" → show (plain-word hint). (`indicate`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:187 — Vague word "Typically". Give the exact condition, value or action. (`Typically`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:187 — Modal + be + past participle. Use an active verb. (`will be sent`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:187 — "indicating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, indicating that`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:189 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`email gives users flexibility`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:191 — "Selecting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`: Selecting the`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:195 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:195 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:195 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.phrasal_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:197 — Phrasal verb "Make sure". Try: verify / ensure. (`Make sure`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:199 — "Validating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`: Validating the`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:205 — "bypassing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, bypassing the`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:211 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`another device attestation request`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:213 — Modal + be + past participle. Use an active verb. (`must be signed`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:215 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`identifier ties everything back`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:215 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`specific device binding session`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:217 — Modal + be + past participle. Use an active verb. (`should be kept`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:235 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`happen once per card per device`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:241 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Security best practices dictate`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:241 — "requiring" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`By requiring a`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:243 — Progressive tense (be + -ing). Use simple present. (`be authenticating`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:253 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`passkey verification without going through`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:257 — "making" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, making it`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:272 — Perfect tense. Use simple past or present. (`has verified`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:272 — Perfect tense. Use simple past or present. (`has consented`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:274 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`constraints like decline thresholds`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:274 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`section provides device information`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:274 — Progressive tense (be + -ing). Use simple present. (`is purchasing`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:276 — Modal + be + past participle. Use an active verb. (`can be charged`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:276 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:278 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:282 — Perfect tense. Use simple past or present. (`has been authenticated`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:284 — Modal + be + past participle. Use an active verb. (`should be kept`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:286 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:286 — Vague word "a few". Give the exact condition, value or action. (`a few`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:286 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`get payment credentials within`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:297 — "creating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, creating a`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:297 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:299 — Perfect tense. Use simple past or present. (`has been fulfilled`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:301 — "indicate" → show (plain-word hint). (`indicate`)
- **P2** `ste.hedge` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:315 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:342 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`store transaction history including instruction`)
- **P2** `ste.ing_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:347 — "implementing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`When implementing this`)
- **P2** `ste.complex_tense` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:349 — Modal + be + past participle. Use an active verb. (`should be encrypted`)
- **P2** `ste.word_hint` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:367 — "Obtain" → get (plain-word hint). (`Obtain`)
- **P2** `ste.phrasal_verb` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:367 — Phrasal verb "Set up". Try: prepare / install. (`Set up`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:371 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`complete device binding flow including`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:375 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`document covers agent orchestration patterns`)
- **P2** `ste.noun_cluster` awslabs__agentcore-samples/05-blueprints/travel-concierge-agent/visa-documentation/visa-payment-integration-guide.md:383 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`See separate architecture guide`)

## 5. Labs tool runs

- Observability Gap Finder · (whole input) · score 72 · Baseline present — close remaining high gaps.

