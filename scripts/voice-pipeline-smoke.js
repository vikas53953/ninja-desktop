const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { askBrain } = require("../services/brain");
const { synthesizeSpeech, transcribeAudio } = require("../services/voice");

dotenv.config({ path: path.join(process.cwd(), ".env") });

async function measure(label, fn) {
  const startedAt = Date.now();
  const result = await fn();
  return { label, durationMs: Date.now() - startedAt, result: summarizeResult(result) };
}

function summarizeResult(result) {
  if (!result || typeof result !== "object") return result;
  const summary = { ...result };
  if (summary.audioDataUrl) {
    summary.audioDataUrlPresent = true;
    summary.audioBytesApprox = Math.floor(String(summary.audioDataUrl).length * 0.75);
    delete summary.audioDataUrl;
  }
  if (summary.reply && summary.reply.length > 240) summary.reply = `${summary.reply.slice(0, 240)}...`;
  return summary;
}

async function main() {
  const report = {
    testedAt: new Date().toISOString(),
    llmProvider: process.env.LLM_PROVIDER || (process.env.OPENCODE_API_KEY ? "opencode" : "openai"),
    opencodeKeyPresent: Boolean(process.env.OPENCODE_API_KEY),
    openaiKeyPresent: Boolean(process.env.OPENAI_API_KEY),
    elevenLabsKeyPresent: Boolean(process.env.ELEVEN_LABS_API_KEY && process.env.ELEVEN_LABS_VOICE_ID),
    audioSamplePresent: Boolean(process.env.NINJA_VOICE_TEST_AUDIO && fs.existsSync(process.env.NINJA_VOICE_TEST_AUDIO)),
    steps: []
  };

  if (report.audioSamplePresent) {
    const audioPath = process.env.NINJA_VOICE_TEST_AUDIO;
    const ext = path.extname(audioPath).toLowerCase();
    const mimeType = ext === ".wav" ? "audio/wav" : ext === ".mp3" ? "audio/mpeg" : "audio/webm";
    report.steps.push(
      await measure("whisper", () => transcribeAudio(fs.readFileSync(audioPath), mimeType))
    );
  } else {
    report.steps.push({ label: "whisper", skipped: true, reason: "Set NINJA_VOICE_TEST_AUDIO to a short audio file." });
  }

  if (report.opencodeKeyPresent || report.openaiKeyPresent) {
    report.steps.push(await measure("llm", () => askBrain("Reply in one short sentence: NINJA voice smoke.")));
  } else {
    report.steps.push({ label: "llm", skipped: true, reason: "No LLM key is configured." });
  }

  if (report.elevenLabsKeyPresent) {
    report.steps.push(await measure("elevenlabs", () => synthesizeSpeech("Haan bhai, NINJA voice smoke passed.")));
  } else {
    report.steps.push({ label: "elevenlabs", skipped: true, reason: "ElevenLabs key or voice id is missing." });
  }

  const measuredTotal = report.steps
    .filter((step) => typeof step.durationMs === "number")
    .reduce((sum, step) => sum + step.durationMs, 0);
  report.totalMeasuredMs = measuredTotal;
  report.passUnder3000ms = measuredTotal > 0 && measuredTotal < 3000 && report.steps.every((step) => step.skipped || step.result.ok);

  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
