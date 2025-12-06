import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/property/scheduleProperty.css";

interface Props {
  startDate: Date | null;
  setStartDate: (date: Date) => void;
  endDate: Date | null;
  setEndDate: (date: Date) => void;
  onBook: () => void;
  price: number;
}

const ScheduleProperty = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onBook,
  price,
}: Props) => {
  const [totalNights, setTotalNights] = useState<number>(2);

  useEffect(() => {
    if (startDate && endDate) {
      const diffTime = endDate.getTime() - startDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalNights(diffDays);
    }
  }, [startDate, endDate]);

  return (
    <div className="property-date-picker-card">
      <h3>
        ₱{(price * totalNights).toLocaleString("en-PH")} for {totalNights}{" "}
        nights
      </h3>

      <h4 className="property-date-title">Select your stay dates</h4>

      <div className="property-date-inputs">
        <div className="property-date-field">
          <label>Check-in</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              if (date) setStartDate(date);
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Add date"
            minDate={new Date()}
            dateFormat="MMM d, yyyy"
          />
        </div>

        <div className="property-date-field">
          <label>Checkout</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              if (date) setEndDate(date);
            }}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || new Date()}
            placeholderText="Add date"
            dateFormat="MMM d, yyyy"
          />
        </div>
      </div>

      <div className="property-date-actions">
        <button
          className="clear-btn"
          onClick={() => {
            const date = new Date();
            date.setDate(date.getDate() + 2);

            setStartDate(new Date());
            setEndDate(date);
          }}
        >
          Clear dates
        </button>
      </div>

      <button className="rent-btn" onClick={onBook}>
        Rent this property
      </button>
    </div>
  );
};

export default ScheduleProperty;
