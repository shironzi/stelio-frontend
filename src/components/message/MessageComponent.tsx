import { useState } from "react";
import type { Message } from "../../pages/messages/MessagesTypes";

const MessageComponent = ({
  message,
  userId,
}: {
  message: Message;
  userId: string;
}) => {
  const [showTime, setShowTime] = useState<Boolean>(false);

  const messageLines = message.message.split("\n");

  const timeText = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isOwn = message.userId === userId;

  const handleMouseEnter = () => {
    setShowTime(true);
  };

  const handleMouseLeave = () => {
    setShowTime(false);
  };

  return (
    <div
      className={
        isOwn
          ? "chatbox-row chatbox-row--own"
          : "chatbox-row chatbox-row--other"
      }
    >
      <div
        className={
          isOwn
            ? "chatbox-bubble chatbox-bubble--own"
            : "chatbox-bubble chatbox-bubble--other"
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {!isOwn && <h5 className="chatbox-name">{message.name}</h5>}
        {messageLines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}

        <h6 className="chatbox-time">{showTime && timeText}</h6>
      </div>
    </div>
  );
};

export default MessageComponent;
