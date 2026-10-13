# Excerpt from anthropics/claude-quickstarts @ 9ec32b9, agents/agent.py (MIT). Used as a false-positive regression fixture.
        await self.history.add_message("user", user_input, None)

        tool_dict = {tool.name: tool for tool in self.tools}

        while True:
            self.history.truncate()
            params = self._prepare_message_params()

            # Merge headers properly - default beta header can be overridden by message_params
            default_headers = {"anthropic-beta": "code-execution-2025-05-22"}
            if "extra_headers" in params:
                # Pop extra_headers from params and merge with defaults
                custom_headers = params.pop("extra_headers")
                merged_headers = {**default_headers, **custom_headers}
            else:
                merged_headers = default_headers

            response = self.client.messages.create(
                **params,
                extra_headers=merged_headers
            )
            tool_calls = [
                block for block in response.content if block.type == "tool_use"
            ]

            if self.verbose:
                for block in response.content:
                    if block.type == "text":
                        print(f"\n[{self.name}] Output: {block.text}")
                    elif block.type == "tool_use":
                        params_str = ", ".join(
                            [f"{k}={v}" for k, v in block.input.items()]
                        )
                        print(
                            f"\n[{self.name}] Tool call: "
                            f"{block.name}({params_str})"
                        )

            await self.history.add_message(
                "assistant", response.content, response.usage
            )

            if tool_calls:
                tool_results = await execute_tools(
                    tool_calls,
                    tool_dict,
                )
                if self.verbose:
                    for block in tool_results:
                        print(
                            f"\n[{self.name}] Tool result: "
                            f"{block.get('content')}"
                        )
                await self.history.add_message("user", tool_results)
            else:
                return response

