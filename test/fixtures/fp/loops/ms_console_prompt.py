# Excerpt from microsoft/ai-agents-for-beginners @ 92d833e, 11-agentic-protocols/code_samples/mcp-agents/client/client.py (MIT). Used as a false-positive regression fixture.
            async def elicitation_callback(context, params):
                try:
                    console.print(f"\n💬 [bold yellow]Server is asking for confirmation:[/bold yellow]")
                    console.print(f"   [cyan]{params.message}[/cyan]")
                    
                    # Get user's decision
                    while True:
                        response = console.input("\n[bold]Do you accept? (y/n/details): [/bold]").strip().lower()
                        
                        if response in ['y', 'yes', 'accept']:
                            user_notes = console.input("[dim]Any additional notes (optional): [/dim]").strip()
                            console.print(f"[dim]✅ Sending acceptance with notes: '{user_notes or 'Confirmed by user'}'[/dim]")
                            return types.ElicitResult(
                                action="accept",
                                content={
                                    "confirm": True, 
                                    "notes": user_notes if user_notes else "Confirmed by user"
                                }
                            )
                        elif response in ['n', 'no', 'decline']:
                            reason = console.input("[dim]Reason for declining (optional): [/dim]").strip()
                            return types.ElicitResult(
                                action="decline",
                                content={
                                    "confirm": False,
                                    "notes": reason if reason else "Declined by user"
                                }
                            )
                        elif response in ['d', 'details']:
                            console.print(f"[dim]Schema: {params.requestedSchema if hasattr(params, 'requestedSchema') else 'Not specified'}[/dim]")
                        else:
