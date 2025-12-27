import { Link } from "react-router-dom";
import type { UserContextTypes } from "../../context/UserContext";

import "@/styles/Navbar.css";

interface Props {
  userData: UserContextTypes;
  logout: () => void;
}

export default function NavbarMenu({ userData, logout }: Props) {
  return (
    <ul className="dropdown-menu">
      <li>
        <Link to="/profile" className="link">
          Profile
        </Link>
      </li>

      {userData.role === "OWNER" && (
        <li>
          <Link to="/property/manage" className="link">
            Manage Property
          </Link>
        </li>
      )}

      {userData.role === "OWNER" && (
        <li>
          <Link to="/bookings" className="link">
            Property Bookings
          </Link>
        </li>
      )}

      {userData.role === "RENTER" && (
        <li>
          <Link to="/bookings" className="link">
            My Bookings
          </Link>
        </li>
      )}
      <li>
        <Link to="/settings" className="link">
          Settings
        </Link>
      </li>
      <li onClick={logout} className="logout-btn">
        Logout
      </li>
    </ul>
  );
}
