import "@/styles/message/chatbox.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMessageById } from "../../api/message";
import type { Message } from "../../pages/messages/MessagesTypes";
import { useUserData } from "../../context/UserContext";
import MessageComponent from "./MessageComponent";

export default function ChatBox() {
  const { id } = useParams();
  const { userData } = useUserData();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const res = await getMessageById(id);
      setMessages(res?.messages ?? []);
      setLoading(false);

      console.log(res.messages);
    } catch {
      setError("Failed to load messages");
      setMessages([]);
    }
  };

  useEffect(() => {
    if (!id) return;

    fetchMessages();
  }, [id]);

  return (
    <div className="chat-box">
      {!id && <h4 className="chatbox-empty">Select a conversation</h4>}

      {id && loading && <h5 className="chatbox-loading">Loading...</h5>}
      {id && !loading && error && <h5 className="chatbox-error">{error}</h5>}

      {id && !loading && !error && (
        <div className="chatbox-messages" role="log" aria-live="polite">
          {messages.map((message) => {
            const isOwn =
              Boolean(userData?.id) && message.userId === userData.id;

            return (
              <div
                key={message.id}
                className={
                  isOwn
                    ? "chatbox-row chatbox-row--own"
                    : "chatbox-row chatbox-row--other"
                }
              >
                <MessageComponent
                  isOwn={isOwn}
                  message={message.message}
                  timestamp={message.timestamp}
                  name={message.name}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
