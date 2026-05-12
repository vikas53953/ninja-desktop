async function startWakeWord(onDetected) {
  if (!process.env.PORCUPINE_ACCESS_KEY) {
    return { status: "disabled", reason: "PORCUPINE_ACCESS_KEY is not configured." };
  }

  try {
    require.resolve("@picovoice/porcupine-node");
    return {
      status: "ready_manual",
      reason:
        "Porcupine dependency is available, but always-on microphone streaming is not started in this milestone yet.",
      onDetected
    };
  } catch (_error) {
    return { status: "disabled", reason: "Porcupine Node binding is not installed." };
  }
}

module.exports = { startWakeWord };

