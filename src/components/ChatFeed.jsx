export default function ChatFeed({ messages }) {
  return (
    <section className="chat-feed" aria-label="NINJA conversation">
      {messages.map((message) => (
        <article key={message.id} className={`chat-bubble ${message.role}`}>
          <p>{message.content}</p>
        </article>
      ))}
    </section>
  );
}

