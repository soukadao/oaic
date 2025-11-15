import OpenAI from "openai";
import { Chat } from "../lib/chat.js";
import { STOP_QUERIES } from "../lib/constants.js";

export async function base(model: string) {
  console.log("Using Model: " + model);
  const chat = new Chat(STOP_QUERIES);
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  try {
    while (true) {
      const input = await chat.askQuestion("> ");

      if (chat.isStopQueries(input)) {
        break;
      }

      const stream = await client.responses.create({
        model,
        input,
        stream: true
      });

      for await (const event of stream) {
        if (event.type === "response.output_text.delta") {
          process.stdout.write(event.delta);
        }
        if (
          event.type === "response.output_text.done" ||
          event.type === "response.completed"
        ) {
          process.stdout.write("\n");
        }
      }
    }
  } finally {
    console.log("Closing the command-line interface.");
    chat.close();
  }
}
