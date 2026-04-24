const Guests = () => {
  return (
    <div className="s-screen bg-dark-800 min-h-[520px] p-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-[24px] text-white">Guest Management</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search guests..."
            className="bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-[13px] text-white outline-none w-64"
          />
          <select className="bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-[13px] text-muted outline-none">
            <option>All Guests</option>
            <option>Active</option>
            <option>Past Guests</option>
            <option>VIP</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-dark-700 border border-white/[0.07] rounded-2xl p-6">
          <div className="text-[11px] text-muted-faint uppercase tracking-widest mb-2">
            Total Guests
          </div>
          <div className="font-serif text-[32px] text-white leading-none mb-1">
            247
          </div>
          <div className="text-[11px] text-emerald-400">+23 this month</div>
        </div>
        <div className="bg-dark-700 border border-white/[0.07] rounded-2xl p-6">
          <div className="text-[11px] text-muted-faint uppercase tracking-widest mb-2">
            Repeat Guests
          </div>
          <div className="font-serif text-[32px] text-white leading-none mb-1">
            79
          </div>
          <div className="text-[11px] text-muted-faint">32% of total</div>
        </div>
        <div className="bg-dark-700 border border-white/[0.07] rounded-2xl p-6">
          <div className="text-[11px] text-muted-faint uppercase tracking-widest mb-2">
            VIP Guests
          </div>
          <div className="font-serif text-[32px] text-white leading-none mb-1">
            12
          </div>
          <div className="text-[11px] text-muted-faint">5+ bookings</div>
        </div>
        <div className="bg-dark-700 border border-white/[0.07] rounded-2xl p-6">
          <div className="text-[11px] text-muted-faint uppercase tracking-widest mb-2">
            Average Rating Given
          </div>
          <div className="font-serif text-[32px] text-white leading-none mb-1">
            4.8⭐
          </div>
          <div className="text-[11px] text-emerald-400">Excellent feedback</div>
        </div>
      </div>

      <div className="bg-dark-700 border border-white/[0.07] rounded-2xl p-6">
        <h3 className="font-serif text-[20px] text-white mb-6">Guest List</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Guest Card 1 */}
          <div className="bg-dark-900 border border-white/[0.07] rounded-xl p-5">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center font-semibold text-[18px] text-dark-900 flex-shrink-0">
                MS
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-[15px] text-white font-medium">
                    Maria Santos
                  </h4>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20">
                    VIP
                  </span>
                </div>
                <div className="text-[12px] text-muted-faint mb-2">
                  maria.s@email.com
                </div>
                <div className="flex gap-4 text-[11px] text-muted-faint">
                  <span>📅 8 bookings</span>
                  <span>⭐ 5.0 rating</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-dark-800 border border-white/10 text-muted px-3 py-2 rounded-lg text-[11px] hover:bg-dark-700 transition-colors">
                View History
              </button>
              <button className="flex-1 bg-gold/10 border border-gold/20 text-gold px-3 py-2 rounded-lg text-[11px] hover:bg-gold/20 transition-colors">
                Message
              </button>
            </div>
          </div>

          {/* Guest Card 2 */}
          <div className="bg-dark-900 border border-white/[0.07] rounded-xl p-5">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center font-semibold text-[18px] text-white flex-shrink-0">
                JC
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-[15px] text-white font-medium">
                    John Cruz
                  </h4>
                </div>
                <div className="text-[12px] text-muted-faint mb-2">
                  john.c@email.com
                </div>
                <div className="flex gap-4 text-[11px] text-muted-faint">
                  <span>📅 3 bookings</span>
                  <span>⭐ 4.9 rating</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-dark-800 border border-white/10 text-muted px-3 py-2 rounded-lg text-[11px] hover:bg-dark-700 transition-colors">
                View History
              </button>
              <button className="flex-1 bg-gold/10 border border-gold/20 text-gold px-3 py-2 rounded-lg text-[11px] hover:bg-gold/20 transition-colors">
                Message
              </button>
            </div>
          </div>

          {/* Guest Card 3 */}
          <div className="bg-dark-900 border border-white/[0.07] rounded-xl p-5">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center font-semibold text-[18px] text-white flex-shrink-0">
                AR
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-[15px] text-white font-medium">
                    Anna Reyes
                  </h4>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20">
                    VIP
                  </span>
                </div>
                <div className="text-[12px] text-muted-faint mb-2">
                  anna.r@email.com
                </div>
                <div className="flex gap-4 text-[11px] text-muted-faint">
                  <span>📅 6 bookings</span>
                  <span>⭐ 5.0 rating</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-dark-800 border border-white/10 text-muted px-3 py-2 rounded-lg text-[11px] hover:bg-dark-700 transition-colors">
                View History
              </button>
              <button className="flex-1 bg-gold/10 border border-gold/20 text-gold px-3 py-2 rounded-lg text-[11px] hover:bg-gold/20 transition-colors">
                Message
              </button>
            </div>
          </div>

          {/* Guest Card 4 */}
          <div className="bg-dark-900 border border-white/[0.07] rounded-xl p-5">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center font-semibold text-[18px] text-dark-900 flex-shrink-0">
                PL
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-[15px] text-white font-medium">
                    Peter Lim
                  </h4>
                </div>
                <div className="text-[12px] text-muted-faint mb-2">
                  peter.l@email.com
                </div>
                <div className="flex gap-4 text-[11px] text-muted-faint">
                  <span>📅 2 bookings</span>
                  <span>⭐ 4.7 rating</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-dark-800 border border-white/10 text-muted px-3 py-2 rounded-lg text-[11px] hover:bg-dark-700 transition-colors">
                View History
              </button>
              <button className="flex-1 bg-gold/10 border border-gold/20 text-gold px-3 py-2 rounded-lg text-[11px] hover:bg-gold/20 transition-colors">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guests;
