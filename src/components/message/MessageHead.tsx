import "@/styles/message/messageHead.css";
import type ChatHead from "../../pages/messages/MessagesTypes";
import { chatDateFormatted } from "../../utils/DateFormat";

export default function MessageHead({ head }: { head: ChatHead }) {
  return (
    <div className="message-head">
      <img
        src={
          head.profileLink
            ? `${head.profileLink}`
            : "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
        }
        alt="Profile"
        className="message-head_profile"
      />
      <div className="message-head_info">
        <h4 className="message-head_name">{head.chatName}</h4>
        <div className="message-head_message">
          <h5 className="message-head_preview">
            {head.messagePreview && head.messagePreview.length > 20
              ? head.messagePreview.slice(0, 20) + "..."
              : head.messagePreview}
          </h5>
          <h5 className="message-head_time">{chatDateFormatted(head.date)}</h5>
        </div>
      </div>
    </div>
  );
}
