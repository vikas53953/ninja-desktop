const { readMemory, appendMemory } = require("./memory");

function missingOpenAiResponse(message) {
  appendMemory(`Conversation fallback: Vikas asked "${message.slice(0, 160)}"; OpenAI key was missing.`);
  return {
    ok: true,
    reply:
      "Bhai, NINJA shell is alive, but OPENAI_API_KEY is not configured yet. Add it in .env and I will answer with GPT-4o. Your message was: " +
      message,
    usedProvider: "fallback"
  };
}

async function askBrain(message) {
  const cleanMessage = String(message || "").trim();
  if (!cleanMessage) return { ok: false, error: "Message is required." };

  const { soul, brain } = readMemory();
  if (!process.env.OPENAI_API_KEY) return missingOpenAiResponse(cleanMessage);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: `${soul}\n\nCurrent memory:\n${brain}` },
          { role: "user", content: cleanMessage }
        ],
        temperature: 0.6
      })
    });

    if (!response.ok) {
      return { ok: false, error: `OpenAI request failed with status ${response.status}.` };
    }

    const data = await response.json();
    const reply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    if (!reply) return { ok: false, error: "OpenAI returned an empty response." };

    appendMemory(`Conversation: Vikas asked "${cleanMessage.slice(0, 160)}"; NINJA replied with GPT-4o.`);
    return { ok: true, reply, usedProvider: "openai" };
  } catch (_error) {
    return { ok: false, error: "NINJA could not reach OpenAI right now." };
  }
}

module.exports = { askBrain, missingOpenAiResponse };
