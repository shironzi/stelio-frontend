import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import { logout, verifyToken } from "../../utils/auth";
import { useUserData } from "../../context/UserContext";
import { TbMessage } from "react-icons/tb";
import NavbarMenu from "./NavbarMenu";

import "@/styles/Navbar.css";

export function Navbar() {
  const navigate = useNavigate();

  const { userData, setUserData } = useUserData();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    await logout();
    setUserData({ name: "", email: "", role: "", isAuthenticated: false });

    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const verifyUser = async () => {
      const res = await verifyToken();

      setUserData({
        name: res.name,
        email: res.email,
        role: res.role,
        isAuthenticated: true,
      });
    };

    if (token) {
      verifyUser();
    }
  }, [setUserData]);

  return (
    <nav>
      {/* Logo */}
      <Link to={"/"} className="logo link">
        STELIO
      </Link>

      {/* Navigations */}
      <div className="nav-mid">
        <Link to={"/"} className="link">
          Homes
        </Link>
        <Link to={"/experience"} className="link">
          Experience
        </Link>
        <Link to={"./services"} className="link">
          Services
        </Link>
      </div>

      {/* User Menu */}
      <div className="nav-account">
        {userData.isAuthenticated ? (
          <>
            {/* Message Icon */}
            <Link to={"/messages/"} className="nav-message">
              <TbMessage size={30} color="#000" />
            </Link>

            {/* Profile Icon */}
            <div
              className="dropdown"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <BsPersonCircle size={30} className="dropdown-icon" />
              {isDropdownOpen && (
                <NavbarMenu userData={userData} logout={handleLogout} />
              )}
            </div>
          </>
        ) : (
          <Link to={"/login"} className="authentication link">
            Login / Signup
          </Link>
        )}
      </div>
    </nav>
  );
}
