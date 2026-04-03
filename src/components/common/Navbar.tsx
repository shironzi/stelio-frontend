import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import { logout, verifyToken } from "../../api/auth";
import { useUserData } from "../../context/UserContext";
import { LuMessageSquareText } from "react-icons/lu";
import NavbarMenu from "./NavbarMenu";
import { becomeHost } from "../../api/user";

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
    <nav className="bg-dark-900 border-b border-white/[0.08] flex items-center justify-between px-8 h-[10vh] sticky top-0 z-50">
      {/* Logo */}
      <Link
        to={"/"}
        className="font-serif text-[28px] font-medium tracking-widest text-[#e8e6e1] transition-all duration-300 ease-in-out hover:text-[#00ADB5]"
        style={{ fontFamily: "Bristol" }}
      >
        STELIO
      </Link>

      {/* User Menu */}
      <div className="flex items-center gap-2">
        {userData.isAuthenticated ? (
          <>
            {userData.role.toLowerCase() === "renter" && (
              <button
                onClick={handleBecomeHost}
                className="bg-white/[0.06] border border-white/[0.12] text-[#e8e6e1] rounded-lg px-[14px] py-[7px] text-[13px] cursor-pointer hover:bg-white/10 transition-colors"
              >
                Want to become a host?
              </button>
            )}
            {/* Message Icon */}
            <Link
              to={"/messages/"}
              className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer text-muted text-[15px]"
            >
              <LuMessageSquareText size={24} color="white" />
            </Link>

            {/* Profile Icon (Dropdown) */}
            <div
              className="relative"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <BsPersonCircle
                size={30}
                className="text-[#e8e6e1] cursor-pointer"
              />
              {isDropdownOpen && (
                <NavbarMenu userData={userData} logout={handleLogout} />
              )}
            </div>
          </>
        ) : (
          <Link
            to={"/login"}
            className="text-[#e8e6e1] text-[13px] font-medium"
          >
            Login / Signup
          </Link>
        )}
      </div>
    </nav>
  );
}
