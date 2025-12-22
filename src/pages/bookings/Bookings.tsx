import "@/styles/booking/calendar.css";
import "@/styles/booking/bookings.css";
import BookingRequest from "../../components/booking/BookingRequest";
import BookingCalendar from "../../components/booking/BookingCalendar";
import BookingNavbar from "../../components/booking/BookingNavbar";
import { useState } from "react";
import { defaultTab, type Tab } from "./BookingTypes";
import BookingList from "../../components/booking/BookingList";
import BookingDashboard from "../../components/booking/BookingDashboard";
import BookingReviews from "../../components/booking/BookingReviews";

const Bookings = () => {
  const [tab, setTab] = useState<Tab>(defaultTab);

  return (
    <div className="booking-container">
      <BookingNavbar tab={tab} onChange={setTab} />
      {tab.tab === "Dashboard" && <BookingDashboard />}

      {tab.tab === "Calendar" && (
        <div className="booking-calendar-container">
          <BookingCalendar />
          <BookingRequest />
        </div>
      )}

      {tab.tab === "Bookings" && <BookingList />}

      {tab.tab === "Reviews" && <BookingReviews />}
    </div>
  );
};

export default Bookings;
