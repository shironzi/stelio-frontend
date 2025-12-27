import MessageHead from "../../components/message/MessageHead";
import "@/styles/message/message.css";

export default function Messages() {
  return (
    <div className="message">
      {/* Chat Heads */}
      <div className="message_chat-heads">
        <div className="message-chat-heads-list">
          <MessageHead />
          <MessageHead />
          <MessageHead />
          <MessageHead />
          <MessageHead />
          <MessageHead />
          <MessageHead />
          <MessageHead />
          <MessageHead />
        </div>
      </div>

      {/* Messages */}
      <div className="message-content">
        {/* Here you can display your messages */}
      </div>
    </div>
  );
}
