import { useEffect, useState } from "react";
import MessageHead from "../../components/message/MessageHead";
import "@/styles/message/message.css";
import type ChatHead from "./MessagesTypes";
import { getChatHeads } from "../../api/message";
import { Link, useParams } from "react-router-dom";
import ChatBox from "../../components/message/ChatBox";

export default function Messages() {
  const [chatHeads, setChatHeads] = useState<ChatHead[]>([]);
  const [active, setActive] = useState<String | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchChatHeads = async () => {
      const res = await getChatHeads();

      if (res.success) {
        setChatHeads(res.chats);
      }
    };

    fetchChatHeads();
  }, []);

  useEffect(() => {
    setActive(id ?? null);
  }, [id]);

  return (
    <div className="message">
      {/* Chat Heads */}
      <div className="message_chat-heads">
        <div className="message-chat-heads-list">
          {chatHeads.length > 0 &&
            chatHeads.map((headInfo) => (
              <Link
                key={headInfo.conversationId}
                to={`/messages/${headInfo.conversationId}`}
                onClick={() => setActive(headInfo.conversationId)}
                className={
                  headInfo.conversationId === active
                    ? "message-chat-active"
                    : ""
                }
              >
                <MessageHead head={headInfo} />
              </Link>
            ))}
        </div>
      </div>

      {/* Messages */}
      <>{active != null && <ChatBox />}</>
    </div>
  );
}
