import { useState } from "react";
import Calendar from "react-calendar";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const BookingCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <Calendar
      onChange={onChange}
      value={value}
      className="booking-calendar"
      showNeighboringMonth={false}
    />
  );
};

export default BookingCalendar;
