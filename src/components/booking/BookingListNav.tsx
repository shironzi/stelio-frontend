import type { BookingListFilter } from "../../types/booking";

interface Props {
  update: (filter: BookingListFilter) => void;
  filter: BookingListFilter;
}

export default function BookingListNav({ update, filter }: Props) {
  return (
    <div className="BookingList-navbar">
      <button
        className={`btn-white-outline ${filter === "ALL" && "active"}`}
        onClick={() => update("ALL")}
      >
        <span>🟦</span> All
      </button>
      <button
        className={`btn-white-outline ${filter === "COMPLETED" && "active"}`}
        onClick={() => update("COMPLETED")}
      >
        <span>🟩</span> Completed
      </button>
      <button
        className={`btn-white-outline ${filter === "PENDING" && "active"}`}
        onClick={() => update("PENDING")}
      >
        <span>🟨</span> Pending
      </button>
      <button
        className={`btn-white-outline ${filter === "APPROVED" && "active"}`}
        onClick={() => update("APPROVED")}
      >
        <span>🟩</span> Approved
      </button>
      <button
        className={`btn-white-outline ${filter === "REJECTED" && "active"}`}
        onClick={() => update("REJECTED")}
      >
        <span>🟥</span> REJECTED
      </button>
      <button
        className={`btn-white-outline ${filter === "CANCELLED" && "active"}`}
        onClick={() => update("CANCELLED")}
      >
        <span>⚪</span> Cancelled
      </button>
    </div>
  );
}
