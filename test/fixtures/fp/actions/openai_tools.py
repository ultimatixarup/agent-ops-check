# Excerpt from openai/openai-cs-agents-demo @ bd7bfca, python-backend/airline/tools.py (MIT). Used as a false-positive regression fixture.
@function_tool(
    name_override="cancel_flight",
    description_override="Cancel a flight."
)
async def cancel_flight(
    context: RunContextWrapper[AirlineAgentChatContext]
) -> str:
    """Cancel the flight in the context."""
    apply_itinerary_defaults(context.context.state)
    fn = context.context.state.flight_number
    assert fn is not None, "Flight number is required"
    confirmation = context.context.state.confirmation_number or "".join(
        random.choices(string.ascii_uppercase + string.digits, k=6)
    )
    context.context.state.confirmation_number = confirmation
    return f"Flight {fn} successfully cancelled for confirmation {confirmation}"
