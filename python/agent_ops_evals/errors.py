"""User-facing errors. The CLI prints these without a traceback."""


class ConfigError(Exception):
    """The YAML config, a pack path, or a safety check is wrong."""


class AgentError(Exception):
    """One case failed because the agent call itself failed."""
