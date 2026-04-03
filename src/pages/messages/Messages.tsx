import { useEffect, useState } from "react";
import MessageHead from "../../components/message/MessageHead";
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
    <div className="h-[90vh] bg-dark-800" id="sc-messages">
      <div
        className="grid min-h-[520px]"
        style={{ gridTemplateColumns: "280px 1fr" }}
      >
        {/* Sidebar */}
        <div className="border-r border-white/[0.07] p-4 h-[90vh]">
          <input
            className="s-msg-input w-full bg-dark-900 border border-white/[0.08] rounded-lg px-[14px] py-[9px] text-[#e8e6e1] text-[12px] font-sans mb-3"
            placeholder="Search conversations..."
          />
          <div className="message-chat-heads-list">
            {chatHeads.length > 0 &&
              chatHeads.map((headInfo) => (
                <Link
                  key={headInfo.conversationId}
                  to={`/messages/${headInfo.conversationId}`}
                  onClick={() => setActive(headInfo.conversationId)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer ${
                    headInfo.conversationId === active ? "bg-white/[0.05]" : ""
                  }`}
                >
                  <MessageHead head={headInfo} />
                </Link>
              ))}
          </div>
        </div>

        {/* Chat Main */}
        <div className="flex flex-col">
          <div className="px-5 py-[14px] border-b border-white/[0.07] flex items-center gap-2.5">
            <div className="w-[38px] h-[38px] rounded-full bg-dark-600 flex items-center justify-center text-[14px] font-medium text-gold">
              TT
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#e8e6e1]">
                test test
              </div>
              <div className="text-[11px] text-muted-faint">
                Booking for Luxury Condo
              </div>
            </div>
          </div>

          {/* Messages */}
          {active != null && <ChatBox />}
        </div>
      </div>
    </div>
  );
}
