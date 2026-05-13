const { readMemory, appendMemory } = require("./memory");

function selectedProvider() {
  if (process.env.LLM_PROVIDER) return process.env.LLM_PROVIDER.toLowerCase();
  if (process.env.OPENCODE_API_KEY) return "opencode";
  return "openai";
}

function providerConfig() {
  const provider = selectedProvider();
  if (provider === "opencode") {
    const baseUrl = process.env.OPENCODE_BASE_URL || "https://opencode.ai/zen/go/v1";
    const endpoint = baseUrl.endsWith("/chat/completions") ? baseUrl : `${baseUrl.replace(/\/$/, "")}/chat/completions`;
    return {
      provider,
      model: process.env.OPENCODE_MODEL || "kimi-k2.5",
      endpoint,
      apiKey: process.env.OPENCODE_API_KEY,
      missingKeyName: "OPENCODE_API_KEY"
    };
  }

  return {
    provider: "openai",
    model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
    endpoint: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1/chat/completions",
    apiKey: process.env.OPENAI_API_KEY,
    missingKeyName: "OPENAI_API_KEY"
  };
}

function missingLlmResponse(message, config = providerConfig()) {
  appendMemory(`Conversation fallback: Vikas asked "${message.slice(0, 160)}"; ${config.missingKeyName} was missing.`);
  return {
    ok: true,
    reply:
      `Bhai, NINJA shell is alive, but ${config.missingKeyName} is not configured yet. Add it in .env and I will answer with ${config.provider}/${config.model}. Your message was: ` +
      message,
    usedProvider: "fallback"
  };
}

const missingOpenAiResponse = missingLlmResponse;

async function askBrain(message) {
  const cleanMessage = String(message || "").trim();
  if (!cleanMessage) return { ok: false, error: "Message is required." };

  const { soul, brain } = readMemory();
  const config = providerConfig();
  if (!config.apiKey) return missingLlmResponse(cleanMessage, config);

  try {
    const response = await fetch(config.endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: "system", content: `${soul}\n\nCurrent memory:\n${brain}` },
          { role: "user", content: cleanMessage }
        ],
        temperature: 0.6
      })
    });

    if (!response.ok) {
      return { ok: false, error: `${config.provider} request failed with status ${response.status}.` };
    }

    const data = await response.json();
    const reply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    if (!reply) return { ok: false, error: `${config.provider} returned an empty response.` };

    appendMemory(`Conversation: Vikas asked "${cleanMessage.slice(0, 160)}"; NINJA replied with ${config.provider}/${config.model}.`);
    return { ok: true, reply, usedProvider: config.provider, model: config.model };
  } catch (_error) {
    return { ok: false, error: `NINJA could not reach ${config.provider} right now.` };
  }
}

module.exports = { askBrain, missingLlmResponse, missingOpenAiResponse, providerConfig, selectedProvider };
