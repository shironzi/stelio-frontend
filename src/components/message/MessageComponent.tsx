const MessageComponent = ({
  message,
  timestamp,
  isOwn,
  name,
}: {
  message: string;
  timestamp: string;
  isOwn: boolean;
  name: string;
}) => {
  const messageLines = message.split("\n");

  const timeText = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={
        isOwn
          ? "chatbox-bubble chatbox-bubble--own"
          : "chatbox-bubble chatbox-bubble--other"
      }
    >
      {!isOwn && <h5 className="chatbox-name">{name}</h5>}
      {messageLines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
      <h6 className="chatbox-time">{timeText}</h6>
    </div>
  );
};

export default MessageComponent;
