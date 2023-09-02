import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const CalculateTimeDiffFunction = DefineFunction({
  callback_id: "calculate_time_diff_function",
  source_file: "functions/calculate_time_diff.ts",
  title: "Calculate Time Difference",
  input_parameters: {
    properties: {
      timestamp_one: { type: Schema.types.string },
      timestamp_two: { type: Schema.types.string },
    },
    required: ["timestamp_one", "timestamp_two"],
  },
  output_parameters: {
    properties: {
      result: {
        type: Schema.types.string,
      },
    },
    required: ["result"],
  },
});

export default SlackFunction(
  CalculateTimeDiffFunction,
  ({ inputs }) => {
    console.log("Inputs is: ", inputs);
    const timestamp_one = Number(inputs.timestamp_one);
    const timestamp_two = Number(inputs.timestamp_two);

    const time_difference = timestamp_two - timestamp_one;
    const difference_date = new Date(time_difference * 1000);
    const diff_hours = difference_date.getUTCHours();
    const diff_minutes = difference_date.getUTCMinutes();
    const diff_seconds = difference_date.getUTCSeconds();

    return {
      outputs: {
        result:
          `${diff_hours} hours, ${diff_minutes} minute, ${diff_seconds} second`,
      },
    };
  },
);
