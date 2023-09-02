import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const UnpinMessageFunction = DefineFunction({
  callback_id: "unpin_message",
  title: "Unpin a message",
  source_file: "functions/unpin_message.ts",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.slack.types.channel_id },
      timestamp: { type: Schema.types.string },
    },
    required: ["channel_id", "timestamp"],
  },
  output_parameters: {
    properties: {},
    required: [],
  },
});

export default SlackFunction(
  UnpinMessageFunction,
  async ({ inputs, client }) => {
    const response = await client.pins.remove({
      channel: inputs.channel_id,
      timestamp: inputs.timestamp,
    });
    console.log(
      `pins.remove result: ${JSON.stringify(response, null, 2)}`,
    );
    if (response.error) {
      const error = `Failed to unpin a message due to ${response.error}`;
      return { error };
    }
    return { outputs: { ts: response.ts } };
  },
);
