import "@/styles/message/chatbox.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getMessageById, sendMessage } from "../../api/message";
import type { Message } from "../../pages/messages/MessagesTypes";
import { useUserData } from "../../context/UserContext";
import MessageComponent from "./MessageComponent";

export default function ChatBox() {
  const { id } = useParams();
  const { userData } = useUserData();
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [draftMessage, setDraftMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const baseTextareaHeightRef = useRef<number | null>(null);

  const chatboxMessagesRef = useRef<HTMLDivElement | null>(null); // Reference for chatbox messages container

  const fetchMessages = async () => {
    if (!id) return;
    setError(null);

    try {
      const res = await getMessageById(id);
      setMessages(res?.messages ?? []);
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

  // Scroll to the bottom when messages or the component changes
  useEffect(() => {
    const container = chatboxMessagesRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight; // Scroll to the bottom
    }
  }, [messages]); // Run this effect whenever the messages array changes (e.g., after fetching messages or sending a new one)

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    if (baseTextareaHeightRef.current === null) {
      el.style.height = "auto";
      baseTextareaHeightRef.current = el.scrollHeight;
      el.style.height = `${baseTextareaHeightRef.current}px`;
      el.style.overflowY = "hidden";
    }
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!draftMessage.trim() || !id) return;
    const res = await sendMessage(id, draftMessage);

    if (res?.success) {
      setDraftMessage("");
      setMessages((message) => [...message, res?.message]);
    } else {
      console.log("send message failed");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    const baseHeight = baseTextareaHeightRef.current;
    if (baseHeight === null) return;

    // Always measure overflow against the collapsed height, otherwise
    // scrollHeight will match the expanded height and "stick" expanded.
    el.style.height = `${baseHeight}px`;
    const needsExpand = el.scrollHeight > baseHeight + 1;

    setIsExpanded((prev) => (prev === needsExpand ? prev : needsExpand));
    el.style.height = needsExpand ? "50px" : `${baseHeight}px`;
    el.style.overflowY = needsExpand ? "auto" : "hidden";
  }, [draftMessage]);

  return (
    <div className="chat-box">
      {error && <h5 className="chatbox-error">{error}</h5>}

      <div ref={chatboxMessagesRef} className="chatbox-messages">
        {messages.map((message) => (
          <MessageComponent
            key={message.id}
            userId={userData.id}
            message={message}
          />
        ))}
      </div>

      <form className="chat-box-input-container" onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          className={
            isExpanded
              ? "chatbox-textarea chatbox-textarea--expanded"
              : "chatbox-textarea"
          }
          value={draftMessage}
          onChange={(e) => setDraftMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          cols={50}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
