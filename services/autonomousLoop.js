const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

function msUntilNextUtcTime(targetHourUtc, targetMinuteUtc, now = new Date()) {
  const target = new Date(now);
  target.setUTCHours(targetHourUtc, targetMinuteUtc, 0, 0);
  if (target <= now) target.setUTCDate(target.getUTCDate() + 1);
  return target.getTime() - now.getTime();
}

function msUntilNextIstHour(targetHour, now = new Date()) {
  const utcTotalMinutes = (targetHour * 60 - 330 + 1440) % 1440;
  return msUntilNextUtcTime(Math.floor(utcTotalMinutes / 60), utcTotalMinutes % 60, now);
}

function startAutonomousLoop({ notify }) {
  const cleanup = [];

  const scheduleDaily = ({ hourUtc, minuteUtc, callback }) => {
    const timeout = setTimeout(() => {
      callback();
      scheduleDaily({ hourUtc, minuteUtc, callback });
    }, msUntilNextUtcTime(hourUtc, minuteUtc));
    cleanup.push(() => clearTimeout(timeout));
  };

  if (process.env.NINJA_CRON_TEST === "true") {
    const morningTest = setTimeout(() => notify && notify("NINJA", "Bhai, your brief is ready"), 250);
    const cisspTest = setTimeout(() => notify && notify("NINJA", "Bhai, time for CISSP practice"), 500);
    cleanup.push(() => clearTimeout(morningTest), () => clearTimeout(cisspTest));
  }

  // 7:00 AM IST = 01:30 UTC.
  scheduleDaily({
    hourUtc: 1,
    minuteUtc: 30,
    callback: () => notify && notify("NINJA", "Bhai, your brief is ready")
  });

  // 10:00 PM IST = 16:30 UTC.
  scheduleDaily({
    hourUtc: 16,
    minuteUtc: 30,
    callback: () => notify && notify("NINJA", "Bhai, time for CISSP practice")
  });

  const idleInterval = setInterval(() => {
    // Phase 1 keeps this lightweight. Future milestones add configured checks.
  }, 30 * 60 * 1000);

  cleanup.push(() => clearInterval(idleInterval));

  return {
    stop() {
      for (const stopTimer of cleanup) stopTimer();
    }
  };
}

module.exports = { msUntilNextUtcTime, msUntilNextIstHour, startAutonomousLoop };
