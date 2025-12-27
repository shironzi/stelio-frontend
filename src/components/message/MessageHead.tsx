import "@/styles/message/messageHead.css";

export default function MessageHead() {
  return (
    <div className="message-head">
      <img
        src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
        alt="Profile"
        className="message-head_profile"
      />
      <div className="message-head_info">
        <h4 className="message-head_name">Conversation name</h4>
        <div className="message-head_message">
          <h5 className="message-head_sender">Who sent</h5>
          <h5 className="message-head_preview">Message preview</h5>
          <h5 className="message-head_time">Time</h5>
        </div>
      </div>
    </div>
  );
}
