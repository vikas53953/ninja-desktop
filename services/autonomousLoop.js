function msUntilNextIstHour(targetHour) {
  const now = new Date();
  const istNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const target = new Date(istNow);
  target.setHours(targetHour, 0, 0, 0);
  if (target <= istNow) target.setDate(target.getDate() + 1);
  return target.getTime() - istNow.getTime();
}

function startAutonomousLoop({ notify }) {
  const timers = [];

  const scheduleMorningBrief = () => {
    const timeout = setTimeout(() => {
      if (notify) notify("NINJA", "Bhai, your brief is ready");
      scheduleMorningBrief();
    }, msUntilNextIstHour(7));
    timers.push(timeout);
  };

  const idleInterval = setInterval(() => {
    // Phase 1 keeps this lightweight. Future milestones add configured checks.
  }, 30 * 60 * 1000);

  timers.push(idleInterval);
  scheduleMorningBrief();

  return {
    stop() {
      for (const timer of timers) clearTimeout(timer);
    }
  };
}

module.exports = { msUntilNextIstHour, startAutonomousLoop };

