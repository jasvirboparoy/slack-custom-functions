import { Manifest } from "deno-slack-sdk/mod.ts";
import { InterpretColorFunction } from "./functions/interpret_color.ts";
import { SendMessageFunction } from "./functions/my_send_message.ts";
import { UnpinMessageFunction } from "./functions/unpin_message.ts";
import { CalculateTimeDiffFunction } from "./functions/calculate_time_diff.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "Thread Wisely",
  description: "Supercharge your Slack",
  icon: "assets/thread-wisely-logo",
  functions: [
    InterpretColorFunction,
    SendMessageFunction,
    UnpinMessageFunction,
    CalculateTimeDiffFunction,
  ],
  workflows: [],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public", "pins:write"],
});
