import { Link } from "react-router-dom";
import type { UserContextTypes } from "../../context/UserContext";

interface Props {
  userData: UserContextTypes;
  logout: () => void;
}

export default function NavbarMenu({ userData, logout }: Props) {
  return (
    <ul className="dropdown-menu absolute right-0 mt-2 bg-dark-700 border border-white/[0.12] rounded-lg shadow-lg w-[150px] grid col-1">
      <Link
        to="/profile"
        className="link px-6 py-3 text-[#e8e6e1] text-sm hover:bg-[#00ADB5]/[0.1] rounded-lg transition-colors duration-300 w-full text-center"
      >
        Profile
      </Link>

      {userData.role === "RENTER" && (
        <Link
          to="/my-bookings"
          className="link px-6 py-3 text-[#e8e6e1] text-sm hover:bg-[#00ADB5]/[0.1] rounded-lg transition-colors duration-300 w-full text-center"
        >
          My Bookings
        </Link>
      )}

      <div
        onClick={logout}
        className="px-6 py-3 w-full text-[#e6e6e6] text-sm cursor-pointer hover:bg-[#00ADB5]/[0.1] rounded-lg transition-colors duration-300 text-center"
      >
        Logout
      </div>
    </ul>
  );
}
