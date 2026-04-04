const Profile = () => {
  return (
    <div className="s-screen bg-dark-800 min-h-[520px]" id="sc-profile">
      <div className="p-8 max-w-[900px] mx-auto">
        {/* Profile hero */}
        <div className="bg-dark-700 border border-white/[0.07] rounded-2xl overflow-hidden mb-6">
          {/* Cover banner */}
          <div
            className="h-[120px] w-full relative"
            style={{
              background:
                "linear-gradient(135deg, #1c2030 0%, #2a2d3a 50%, #1a1e2a 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, #c9a96e 0%, transparent 50%), radial-gradient(circle at 80% 20%, #a07840 0%, transparent 40%)",
              }}
            ></div>
            <button className="absolute top-3 right-3 bg-dark-900/60 border border-white/[0.1] text-muted-faint text-[11px] px-3 py-1.5 rounded-lg cursor-pointer hover:bg-dark-900/80 transition-colors backdrop-blur-sm">
              Edit cover
            </button>
          </div>

          {/* Avatar + name row */}
          <div className="px-6 pb-6 flex items-end gap-5 -mt-10 relative">
            <div
              className="w-20 h-20 rounded-2xl border-4 border-dark-700 flex-shrink-0 flex items-center justify-center font-serif text-[28px] text-dark-900 relative"
              style={{
                background: "linear-gradient(135deg, #c9a96e, #a07840)",
              }}
            >
              TT
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 rounded-full border-2 border-dark-700"></div>
            </div>
            <div className="flex-1 mb-1">
              <h2 className="font-serif text-[22px] text-[#e8e6e1]">
                test test
              </h2>
              <div className="text-[13px] text-muted-faint">
                test@gmail.com · Member since Jan 2025
              </div>
              <div className="flex gap-3 mt-2">
                <span className="text-[12px] text-muted-faint">
                  ★ <span className="text-[#e8e6e1]">4.9</span> guest rating
                </span>
                <span className="text-muted-ghost">·</span>
                <span className="text-[12px] text-muted-faint">
                  <span className="text-[#e8e6e1]">8</span> stays
                </span>
                <span className="text-muted-ghost">·</span>
                <span className="text-[12px] text-muted-faint">
                  <span className="text-[#e8e6e1]">1</span> property hosted
                </span>
              </div>
            </div>
            <button className="bg-gold text-dark-900 border-none rounded-lg px-4 py-2 text-[13px] font-semibold cursor-pointer hover:bg-gold-light transition-colors flex-shrink-0 mb-1">
              Edit profile
            </button>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-[1fr_320px] gap-6">
          {/* Left column */}
          <div className="flex flex-col gap-5">
            {/* Personal information */}
            <div className="bg-dark-700 border border-white/[0.07] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[15px] font-medium text-[#e8e6e1]">
                  Personal Information
                </h3>
                <button className="text-[12px] text-gold cursor-pointer hover:text-gold-light transition-colors">
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] text-muted-faint uppercase tracking-[0.07em] mb-1.5">
                    First name
                  </div>
                  <input
                    className="s-input w-full bg-dark-900 border border-white/[0.1] rounded-xl px-4 py-3 text-[#e8e6e1] text-[13px] font-sans transition-colors"
                    value="test"
                  />
                </div>
                <div>
                  <div className="text-[11px] text-muted-faint uppercase tracking-[0.07em] mb-1.5">
                    Last name
                  </div>
                  <input
                    className="s-input w-full bg-dark-900 border border-white/[0.1] rounded-xl px-4 py-3 text-[#e8e6e1] text-[13px] font-sans transition-colors"
                    value="test"
                  />
                </div>
                <div className="col-span-2">
                  <div className="text-[11px] text-muted-faint uppercase tracking-[0.07em] mb-1.5">
                    Email address
                  </div>
                  <input
                    className="s-input w-full bg-dark-900 border border-white/[0.1] rounded-xl px-4 py-3 text-[#e8e6e1] text-[13px] font-sans transition-colors"
                    value="test@gmail.com"
                  />
                </div>
                <div>
                  <div className="text-[11px] text-muted-faint uppercase tracking-[0.07em] mb-1.5">
                    Phone number
                  </div>
                  <input
                    className="s-input w-full bg-dark-900 border border-white/[0.1] rounded-xl px-4 py-3 text-[#e8e6e1] text-[13px] font-sans transition-colors"
                    placeholder="+63 9XX XXX XXXX"
                  />
                </div>
                <div>
                  <div className="text-[11px] text-muted-faint uppercase tracking-[0.07em] mb-1.5">
                    City
                  </div>
                  <input
                    className="s-input w-full bg-dark-900 border border-white/[0.1] rounded-xl px-4 py-3 text-[#e8e6e1] text-[13px] font-sans transition-colors"
                    placeholder="Quezon City"
                  />
                </div>
                <div className="col-span-2">
                  <div className="text-[11px] text-muted-faint uppercase tracking-[0.07em] mb-1.5">
                    Bio
                  </div>
                  <textarea
                    className="s-textarea w-full bg-dark-900 border border-white/[0.1] rounded-xl px-4 py-3 text-[#e8e6e1] text-[13px] font-sans resize-none min-h-[80px] transition-colors"
                    placeholder="Tell hosts a little about yourself..."
                  ></textarea>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="bg-gold text-dark-900 border-none rounded-xl px-6 py-2.5 text-[13px] font-semibold cursor-pointer hover:bg-gold-light transition-colors">
                  Save changes
                </button>
              </div>
            </div>

            {/* Security */}
            <div className="bg-dark-700 border border-white/[0.07] rounded-2xl p-6">
              <h3 className="text-[15px] font-medium text-[#e8e6e1] mb-5">
                Security
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                  <div>
                    <div className="text-[13px] text-[#e8e6e1]">Password</div>
                    <div className="text-[12px] text-muted-faint mt-0.5">
                      Last changed 3 months ago
                    </div>
                  </div>
                  <button className="text-[12px] text-gold cursor-pointer border border-gold/30 px-3 py-1.5 rounded-lg hover:bg-gold/10 transition-colors">
                    Change
                  </button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-[13px] text-[#e8e6e1]">
                      Two-factor authentication
                    </div>
                    <div className="text-[12px] text-muted-faint mt-0.5">
                      Add an extra layer of security
                    </div>
                  </div>
                  {/* Toggle switch */}
                  <div className="w-10 h-5 bg-white/[0.1] border border-white/[0.1] rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-muted rounded-full absolute top-0.5 left-0.5 transition-all"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            {/* Quick stats card */}
            <div className="bg-dark-700 border border-white/[0.07] rounded-2xl p-5">
              <h3 className="text-[14px] font-medium text-[#e8e6e1] mb-4">
                Activity
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-muted-faint">
                    Bookings made
                  </span>
                  <span className="text-[13px] font-medium text-[#e8e6e1]">
                    8
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-muted-faint">
                    Nights stayed
                  </span>
                  <span className="text-[13px] font-medium text-[#e8e6e1]">
                    24
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-muted-faint">
                    Upcoming stays
                  </span>
                  <span className="text-[13px] font-medium text-gold">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-muted-faint">
                    Reviews given
                  </span>
                  <span className="text-[13px] font-medium text-[#e8e6e1]">
                    5
                  </span>
                </div>
                <div className="border-t border-white/[0.06] pt-3 mt-1 flex items-center justify-between">
                  <span className="text-[12px] text-muted-faint">
                    Total spent
                  </span>
                  <span className="font-serif text-[16px] text-gold">
                    ₱420,000
                  </span>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-dark-700 border border-white/[0.07] rounded-2xl p-5">
              <h3 className="text-[14px] font-medium text-[#e8e6e1] mb-4">
                Preferences
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-muted-faint">
                    Booking reminders
                  </span>
                  <div
                    className="w-10 h-5 rounded-full relative cursor-pointer"
                    style={{ background: "#c9a96e" }}
                  >
                    <div className="w-4 h-4 bg-dark-900 rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-muted-faint">
                    Message notifications
                  </span>
                  <div
                    className="w-10 h-5 rounded-full relative cursor-pointer"
                    style={{ background: "#c9a96e" }}
                  >
                    <div className="w-4 h-4 bg-dark-900 rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-muted-faint">
                    Promotional emails
                  </span>
                  <div className="w-10 h-5 bg-white/[0.1] border border-white/[0.1] rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-muted rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger zone */}
            <div className="bg-dark-700 border border-red-500/10 rounded-2xl p-5">
              <h3 className="text-[14px] font-medium text-red-400 mb-3">
                Danger Zone
              </h3>
              <p className="text-[12px] text-muted-faint mb-4 leading-relaxed">
                Deleting your account is permanent and cannot be undone. All
                your data will be removed.
              </p>
              <button className="w-full bg-transparent border border-red-500/30 text-red-400 rounded-xl py-2.5 text-[13px] cursor-pointer hover:bg-red-900/10 transition-colors">
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
