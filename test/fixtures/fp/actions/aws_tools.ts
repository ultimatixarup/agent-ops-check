// Excerpt from awslabs/agentcore-samples @ f33b4f1, 05-blueprints/customer-support-agent-with-agentcore/cdk/lib/stacks/agentcore-stack.ts (Apache-2.0). Used as a false-positive regression fixture.
                                {
                                    name: "get_order",
                                    description: "Look up order details by order ID. Returns order information including items, status, total, and delivery date.",
                                    inputSchema: {
                                        type: "object",
                                        properties: {
                                            order_id: { type: 'string', description: 'The order ID to look up (e.g., ORD-12345)' }
                                        },
                                        required: ['order_id']
                                    }
                                },
                                {
                                    name: "list_orders",
                                    description: "List orders for a customer. Returns a list of orders with order ID, total, status, and order date.",
                                    inputSchema: {
                                        type: "object",
                                        properties: {
                                            customer_id: { type: 'string', description: 'The customer ID to list orders for (e.g., CUST-001)' },
                                            limit: { type: 'integer', description: 'Maximum number of orders to return (default: 10)' }
                                        },
                                        required: ['customer_id']
                                    }
                                },
                                {
                                    name: "process_refund",
                                    description: "Process a refund for an order. Requires order ID, refund amount, and reason. Returns refund confirmation with refund ID.",
                                    inputSchema: {
                                        type: "object",
                                        properties: {
                                            order_id: { type: 'string', description: 'The order ID to refund (e.g., ORD-12345)' },
                                            amount: { type: 'number', description: 'The refund amount in dollars (must include decimal point, e.g., 50.0, 100.0)' },
                                            reason: { type: 'string', description: 'The reason for the refund (e.g., damaged_item, wrong_item, customer_request)' }
                                        },
                                        required: ['order_id', 'amount', 'reason']
                                    }
