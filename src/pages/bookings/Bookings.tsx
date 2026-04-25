import "@/styles/booking/calendar.css";
import "@/styles/booking/bookings.css";

const Bookings = () => {
  return (
    <div className="s-screen bg-dark-800 min-h-[520px] p-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-[24px] text-white">
          Bookings Management
        </h2>
        <div className="flex gap-3">
          <select className="bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-[13px] text-muted outline-none">
            <option>All Properties</option>
            <option>Luxury Condo BGC</option>
            <option>Modern Studio Makati</option>
          </select>
          <select className="bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-[13px] text-muted outline-none">
            <option>All Status</option>
            <option>Upcoming</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-dark-700 border border-white/[0.07] rounded-2xl p-6">
          <div className="text-[11px] text-muted-faint uppercase tracking-widest mb-2">
            Upcoming Check-ins
          </div>
          <div className="font-serif text-[32px] text-white leading-none mb-1">
            3
          </div>
          <div className="text-[11px] text-emerald-400">Next in 2 hours</div>
        </div>
        <div className="bg-dark-700 border border-white/[0.07] rounded-2xl p-6">
          <div className="text-[11px] text-muted-faint uppercase tracking-widest mb-2">
            Current Guests
          </div>
          <div className="font-serif text-[32px] text-white leading-none mb-1">
            9
          </div>
          <div className="text-[11px] text-muted-faint">
            5 checking out today
          </div>
        </div>
      </div>

      <div className="bg-dark-700 border border-white/[0.07] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-[20px] text-white">
            Active & Upcoming Bookings
          </h3>
          <button className="text-[12px] text-gold hover:text-gold-light transition-colors">
            View Calendar →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-4 px-4 text-[11px] text-muted-faint uppercase tracking-widest font-medium">
                  Guest
                </th>
                <th className="text-left py-4 px-4 text-[11px] text-muted-faint uppercase tracking-widest font-medium">
                  Property
                </th>
                <th className="text-left py-4 px-4 text-[11px] text-muted-faint uppercase tracking-widest font-medium">
                  Check-in
                </th>
                <th className="text-left py-4 px-4 text-[11px] text-muted-faint uppercase tracking-widest font-medium">
                  Check-out
                </th>
                <th className="text-left py-4 px-4 text-[11px] text-muted-faint uppercase tracking-widest font-medium">
                  Amount
                </th>
                <th className="text-left py-4 px-4 text-[11px] text-muted-faint uppercase tracking-widest font-medium">
                  Status
                </th>
                <th className="text-left py-4 px-4 text-[11px] text-muted-faint uppercase tracking-widest font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center font-semibold text-[14px] text-dark-900">
                      MS
                    </div>
                    <div>
                      <div className="text-[13px] text-white font-medium">
                        Maria Santos
                      </div>
                      <div className="text-[11px] text-muted-faint">
                        maria.s@email.com
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-[13px] text-white">Luxury Condo BGC</div>
                  <div className="text-[11px] text-muted-faint">
                    📍 BGC, Taguig
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-[13px] text-white">Apr 24, 2026</div>
                  <div className="text-[11px] text-muted-faint">2:00 PM</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-[13px] text-white">Apr 27, 2026</div>
                  <div className="text-[11px] text-muted-faint">11:00 AM</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-[14px] text-gold font-medium">
                    ₱12,500
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-[10px] px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Upcoming
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="bg-dark-900 border border-white/10 text-muted px-3 py-1.5 rounded-lg text-[11px] hover:bg-dark-800 transition-colors">
                    View Details
                  </button>
                </td>
              </tr>

              <tr className="border-b border-white/5">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center font-semibold text-[14px] text-white">
                      JC
                    </div>
                    <div>
                      <div className="text-[13px] text-white font-medium">
                        John Cruz
                      </div>
                      <div className="text-[11px] text-muted-faint">
                        john.c@email.com
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-[13px] text-white">
                    Modern Studio Makati
                  </div>
                  <div className="text-[11px] text-muted-faint">
                    📍 Makati City
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-[13px] text-white">Apr 23, 2026</div>
                  <div className="text-[11px] text-muted-faint">3:00 PM</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-[13px] text-white">Apr 25, 2026</div>
                  <div className="text-[11px] text-muted-faint">12:00 PM</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-[14px] text-gold font-medium">
                    ₱8,400
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    In Progress
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="bg-dark-900 border border-white/10 text-muted px-3 py-1.5 rounded-lg text-[11px] hover:bg-dark-800 transition-colors">
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
