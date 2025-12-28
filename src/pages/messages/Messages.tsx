import { useEffect, useState } from "react";
import MessageHead from "../../components/message/MessageHead";
import "@/styles/message/message.css";
import type ChatHead from "./MessagesTypes";
import { getChatHeads } from "../../utils/message";

export default function Messages() {
  const [chatHeads, setChatHeads] = useState<ChatHead[]>([]);

  useEffect(() => {
    const fetchChatHeads = async () => {
      const res = await getChatHeads();

      if (res.success) {
        setChatHeads(res.chats);
      }
    };

    fetchChatHeads();
  }, []);

  return (
    <div className="message">
      {/* Chat Heads */}
      <div className="message_chat-heads">
        <div className="message-chat-heads-list">
          {chatHeads.length > 1 &&
            chatHeads.map((headInfo) => <MessageHead head={headInfo} />)}
        </div>
      </div>

      {/* Messages */}
      <div className="message-content">
        {/* Here you can display your messages */}
      </div>
    </div>
  );
}
