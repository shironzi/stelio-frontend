import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import { logout, verifyToken } from "../../api/auth";
import { useUserData } from "../../context/UserContext";
import { TbMessage } from "react-icons/tb";
import NavbarMenu from "./NavbarMenu";

import { becomeHost } from "../../api/user";

import "@/styles/Navbar.css";

export function Navbar() {
  const navigate = useNavigate();

  const { userData, setUserData } = useUserData();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    await logout();
    setUserData({
      id: "",
      name: "",
      email: "",
      role: "",
      isAuthenticated: false,
    });

    navigate("/");
  };

  const handleBecomeHost = async () => {
    const res = await becomeHost(userData.id);

    if (res.success) {
      setUserData({
        id: res.id,
        name: res.name,
        email: res.email,
        role: res.role,
        isAuthenticated: true,
      });

      window.location.reload();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const verifyUser = async () => {
      const res = await verifyToken();

      setUserData({
        id: res.id,
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
            {userData.role.toLocaleLowerCase() === "renter" && (
              <button className="nav-renter" onClick={handleBecomeHost}>
                Want to become a host?
              </button>
            )}
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
