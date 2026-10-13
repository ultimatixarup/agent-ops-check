# Excerpt from anthropics/claude-quickstarts @ 9ec32b9, agents/agent.py (MIT). Used as a false-positive regression fixture.
class Agent:
    """Claude-powered agent with tool use capabilities."""

    def __init__(
        self,
        name: str,
        system: str,
        tools: list[Tool] | None = None,
        mcp_servers: list[dict[str, Any]] | None = None,
        config: ModelConfig | None = None,
        verbose: bool = False,
        client: Anthropic | None = None,
        message_params: dict[str, Any] | None = None,
    ):
        """Initialize an Agent.
        
        Args:
            name: Agent identifier for logging
            system: System prompt for the agent
            tools: List of tools available to the agent
            mcp_servers: MCP server configurations
