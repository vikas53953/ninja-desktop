function sendNotification(params = {}, context = {}) {
  const title = String(params.title || "NINJA");
  const body = String(params.body || "Done bhai.");
  if (context.notify) context.notify(title, body);
  return { title, body };
}

module.exports = { sendNotification };

