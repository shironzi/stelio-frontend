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
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} gap-2`}>
      {/* Message Bubble */}
      <div
        className={`${
          isOwn
            ? "bg-gold/20 border border-gold/25 text-[#e8e6e1] rounded-xl p-[14px] max-w-[300px] text-[13px] leading-[1.5]"
            : "bg-dark-700 border border-gold/25 text-white rounded-xl p-[14px] max-w-[300px] text-[13px] leading-[1.5]"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Sender's Name (Only for incoming messages) */}
        {!isOwn && (
          <h5 className="font-medium text-[#e8e6e1] text-[13px] mb-1">
            {message.name}
          </h5>
        )}

        {/* Message Content */}
        {messageLines.map((line, index) => (
          <p key={index} className="mb-1">
            {line}
          </p>
        ))}

        {/* Time Display (Appears on hover) */}
        <h6
          className={`text-[10px] text-muted-faint ${showTime ? "block" : "hidden"}`}
        >
          {timeText}
        </h6>
      </div>
    </div>
  );
};

export default MessageComponent;
