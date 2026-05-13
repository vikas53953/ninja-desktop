const fs = require("fs");

function resolveKeyword() {
  const customKeyword = process.env.NINJA_WAKEWORD_KEYWORD_PATH;
  if (customKeyword && fs.existsSync(customKeyword)) {
    return { keyword: customKeyword, label: "custom" };
  }

  const { BuiltinKeyword } = require("@picovoice/porcupine-node");
  const builtinName = String(process.env.NINJA_WAKEWORD_BUILTIN || "COMPUTER").toUpperCase();
  const keyword = BuiltinKeyword[builtinName] || BuiltinKeyword.COMPUTER;
  return { keyword, label: keyword };
}

async function startWakeWord(onDetected, options = {}) {
  if (!process.env.PORCUPINE_ACCESS_KEY) {
    return { status: "disabled", reason: "PORCUPINE_ACCESS_KEY is not configured.", stop() {} };
  }

  let porcupine;
  let recorder;
  let stopped = false;

  try {
    const { Porcupine } = require("@picovoice/porcupine-node");
    const { PvRecorder } = require("@picovoice/pvrecorder-node");
    const { keyword, label } = resolveKeyword();
    const sensitivity = Number(process.env.NINJA_WAKEWORD_SENSITIVITY || 0.65);

    porcupine = new Porcupine(process.env.PORCUPINE_ACCESS_KEY, [keyword], [sensitivity]);
    recorder = new PvRecorder(porcupine.frameLength, Number(process.env.NINJA_WAKEWORD_DEVICE_INDEX || -1));
    recorder.start();

    const loop = async () => {
      while (!stopped && recorder && recorder.isRecording) {
        const frame = await recorder.read();
        const keywordIndex = porcupine.process(frame);
        if (keywordIndex >= 0 && !stopped) {
          onDetected({ keyword: label, detectedAt: new Date().toISOString() });
        }
      }
    };

    loop().catch(() => {
      stopped = true;
    });

    return {
      status: label === "custom" ? "listening_hey_ninja" : `listening_${label.replace(/\s+/g, "_")}`,
      keyword: label,
      frameLength: porcupine.frameLength,
      sampleRate: porcupine.sampleRate,
      stop() {
        stopped = true;
        if (recorder) recorder.stop();
        if (recorder) recorder.release();
        if (porcupine) porcupine.release();
      }
    };
  } catch (error) {
    stopped = true;
    if (recorder) {
      try {
        recorder.release();
      } catch (_releaseError) {}
    }
    if (porcupine) {
      try {
        porcupine.release();
      } catch (_releaseError) {}
    }
    return {
      status: "disabled",
      reason: options.verbose ? error.message : "Porcupine wake-word startup failed.",
      stop() {}
    };
  }
}

module.exports = { resolveKeyword, startWakeWord };
