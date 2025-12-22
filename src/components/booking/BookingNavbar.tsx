import type { Tab } from "../../pages/bookings/BookingTypes";
import "@/styles/booking/bookingNavbar.css";

interface Props {
  tab: Tab;
  onChange: (tab: Tab) => void;
}

const BookingNavbar = ({ tab, onChange }: Props) => {
  const tabs: { label: Tab["tab"]; icon: string }[] = [
    { label: "Dashboard", icon: "🏠" },
    { label: "Calendar", icon: "📅" },
    { label: "Bookings", icon: "📘" },
    { label: "Earnings", icon: "💰" },
    { label: "Reviews", icon: "⭐" },
    { label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="booking-navbar-container">
      {tabs.map((bookingTab) => (
        <button
          key={bookingTab.label}
          className={tab.tab === bookingTab.label ? "active" : ""}
          onClick={() => onChange({ tab: bookingTab.label })}
        >
          {bookingTab.icon} {bookingTab.label}
        </button>
      ))}
    </div>
  );
};

export default BookingNavbar;
