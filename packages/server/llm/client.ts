import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

type LlmInput = {
  prompt: string;
  instructions?: string;
  previousResponseId?: string;
};
type Ouput = {
  id: string;
  text: string;
};

export const llmClient = async ({
  prompt,
  instructions,
  previousResponseId,
}: LlmInput): Promise<Ouput> => {
  // (debug logs removed)

  const response = await client.responses.create({
    model: "gpt-4o-mini",
    // Pass instructions (system-level guidance) through the Responses API so the model follows them.
    // If instructions is undefined, the API will simply run without an explicit system instruction.
    instructions: instructions ?? undefined,
    max_output_tokens: 500,
    // Provide the user prompt as the input. The Responses API accepts a string or a structured array.
    input: prompt,
    previous_response_id: previousResponseId ?? undefined,
  });

  // Normalize text output: prefer `output_text`, otherwise attempt to extract text from the output array.
  let text = response.output_text ?? "";
  if (!text) {
    try {
      const rawOut = (response as any).output;
      if (Array.isArray(rawOut)) {
        text = rawOut
          .map((item: any) => {
            if (!item) return "";
            // item.content may be an array of objects with `text` values
            const content = item.content ?? item;
            if (Array.isArray(content)) {
              return content.map((c: any) => c?.text ?? "").join("");
            }
            return typeof content === "string" ? content : content?.text ?? "";
          })
          .filter(Boolean)
          .join("\n");
      }
    } catch (err) {
      // ignore and return empty string if we can't normalize
    }
  }

  return { id: response.id, text };
};
