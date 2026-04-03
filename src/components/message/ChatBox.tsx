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
  const baseTextareaHeightRef = useRef<number | null>(null);
  const chatboxMessagesRef = useRef<HTMLDivElement | null>(null); // Reference for chatbox messages container

  const fetchMessages = async () => {
    if (!id) return;
    setError(null);
    try {
      const res = await getMessageById(id);
      setMessages(res?.messages ?? []);
    } catch {
      setError("Failed to load messages");
      setMessages([]);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchMessages();
  }, [id]);

  useEffect(() => {
    const container = chatboxMessagesRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight; // Scroll to the bottom
    }
  }, [messages]);

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
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col flex-1 p-5 gap-3">
      {error && <h5 className="chatbox-error text-red-500">{error}</h5>}

      <div
        ref={chatboxMessagesRef}
        className="chatbox-messages overflow-y-auto flex-1 flex flex-col gap-1.5"
      >
        {messages.map((message) => (
          <MessageComponent
            key={message.id}
            userId={userData.id}
            message={message}
          />
        ))}
      </div>

      <form
        className="chat-box-input-container flex items-center gap-3"
        onSubmit={handleSubmit}
      >
        <textarea
          ref={textareaRef}
          className={`s-msg-input bg-dark-900 border border-white/[0.08] rounded-lg px-[14px] py-[9px] text-white text-[12px] font-sans flex-1`}
          placeholder="Type a message..."
          value={draftMessage}
          onChange={(e) => setDraftMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className="w-[38px] h-[38px] bg-gold rounded-full text-dark-900 flex items-center justify-center cursor-pointer"
        >
          →
        </button>
      </form>
    </div>
  );
}
