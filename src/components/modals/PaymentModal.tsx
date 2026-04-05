import { memo, useCallback, useEffect, useState, useRef } from "react";
import type { Booking } from "../../pages/bookings/BookingTypes";

interface PaymentModalProps {
  booking: Booking;
  action: {
    payment: (bookingId: string, amount: number) => void;
    coupon: (coupon: string) => void;
    onClose: () => void;
  };
  isOpen: boolean;
}

const PaymentModal = ({ booking, action, isOpen }: PaymentModalProps) => {
  const startDate = new Date(booking.start);
  const endDate = new Date(booking.end);

  const [timeRemaining, setTimeRemaining] = useState<number>(600);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toMonthStr = (month: number) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month - 1] || "Invalid month";
  };

  const formatPHP = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setTimeRemaining(600);
      clearInterval(intervalRef.current!);
      return;
    }

    const expiresAt = new Date(booking.expiresAt);
    const now = new Date();
    const initialSeconds = Math.max(
      0,
      Math.floor((expiresAt.getTime() - now.getTime()) / 1000),
    );
    setTimeRemaining(initialSeconds);

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          action.onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [isOpen, booking.expiresAt, action]);

  if (!isOpen) return null;

  const totalNights = endDate.getDate() - startDate.getDate();
  const totalPrice = Math.max(0, booking.price * totalNights);
  const pct = (timeRemaining / 600) * 100;
  const barColor = pct < 30 ? "#e24b4a" : pct < 60 ? "#ef9f27" : "#c9a96e";

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={(e) => e.target === e.currentTarget && action.onClose()}
    >
      <div
        className="w-full max-w-[460px] bg-dark-700 border border-white/10 rounded-[20px] overflow-hidden"
        style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}
      >
        {/* Gold bar */}
        <div
          className="h-[3px] w-full"
          style={{
            background: "linear-gradient(90deg, #a07840, #c9a96e, #d9b87e)",
          }}
        />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2
                className="text-[20px] font-medium text-[#e8e6e1] leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Payment Details
              </h2>
              <p className="text-[12px] text-muted-faint mt-1">
                Complete your reservation to confirm
              </p>
            </div>
            <button
              onClick={action.onClose}
              className="w-[30px] h-[30px] rounded-full bg-white/[0.07] border border-white/10 text-muted-dim text-[13px] flex items-center justify-center cursor-pointer hover:bg-white/[0.12] hover:text-[#e8e6e1] transition-all flex-shrink-0"
            >
              ✕
            </button>
          </div>

          {/* Status + Timer */}
          <div className="flex items-center justify-between bg-dark-900 border border-white/[0.07] rounded-xl px-4 py-3 mb-3">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full bg-gold flex-shrink-0"
                style={{ animation: "statusPulse 2s ease-in-out infinite" }}
              />
              <span className="text-[11px] font-semibold text-gold uppercase tracking-[0.05em]">
                {booking.paymentStatus}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle
                  cx="7"
                  cy="7.5"
                  r="5.5"
                  stroke="#6b6a64"
                  strokeWidth="1.2"
                />
                <path
                  d="M7 4.5V7.5L9 9"
                  stroke="#c9a96e"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              <div>
                <div
                  className="text-[14px] font-semibold text-[#e8e6e1] tabular-nums leading-none"
                  style={{ color: pct < 30 ? "#e24b4a" : "#e8e6e1" }}
                >
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-[10px] text-muted-faint">remaining</div>
              </div>
            </div>
          </div>

          {/* Timer progress bar */}
          <div className="h-[3px] bg-white/[0.07] rounded-full overflow-hidden mb-5">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${pct}%`, background: barColor }}
            />
          </div>

          {/* Booking Info */}
          <div className="bg-dark-900 border border-white/[0.07] rounded-xl p-4 mb-4 flex gap-4 items-start">
            {/* Thumbnail */}
            <div className="w-[25%] min-w-[80px] aspect-square rounded-[10px] bg-dark-600 flex-shrink-0 overflow-hidden">
              {booking.images?.[0] ? (
                <img
                  src={booking.images[0]}
                  alt={booking.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-dark-600" />
              )}
            </div>

            {/* Booking details */}
            <div className="flex flex-col justify-between text-[13px] text-white my-auto">
              <div>
                <span className="text-muted-faint">Property:</span>{" "}
                <span className="font-medium">{booking.title}</span>
              </div>
              <div>
                <span className="text-muted-faint">Dates:</span>{" "}
                <span className="font-medium">
                  {toMonthStr(startDate.getMonth() + 1)} {startDate.getDate()} –{" "}
                  {toMonthStr(endDate.getMonth() + 1)} {endDate.getDate()}
                </span>
              </div>
              <div>
                <span className="text-muted-faint">Guests:</span>{" "}
                <span className="font-medium">{booking.totalGuests}</span>
              </div>
              <div>
                <span className="text-muted-faint">Contact:</span>{" "}
                <span className="font-medium">{booking.contactPhone}</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-dark-900 border border-white/[0.07] rounded-xl px-4 py-4 mb-5">
            <div className="flex justify-between text-[13px] py-1">
              <span className="text-muted-dim">Property Rate</span>
              <span className="text-[#e8e6e1]">{formatPHP(booking.price)}</span>
            </div>
            <div className="flex justify-between text-[13px] py-1">
              <span className="text-muted-dim">Applied Discount</span>
              <span className="text-emerald-400">
                –{formatPHP(booking.price - totalPrice)}
              </span>
            </div>
            <div className="border-t border-white/[0.06] mt-2 pt-3 flex items-center justify-between">
              <span className="text-[14px] font-medium text-[#e8e6e1]">
                Total due
              </span>
              <span
                className="text-[22px] text-gold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {formatPHP(totalPrice)}
              </span>
            </div>
          </div>

          {/* Pay button */}
          <button
            onClick={() => action.payment(booking.id, booking.price)}
            disabled={timeRemaining === 0}
            className="w-full bg-gold text-dark-900 border-none rounded-xl py-[14px] text-[14px] font-semibold cursor-pointer hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
          >
            Pay now
          </button>
        </div>
      </div>

      <style>{`
        @keyframes statusPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
};

export default memo(PaymentModal);
