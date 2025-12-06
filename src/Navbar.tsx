import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import "./styles/Navbar.css";
import { useEffect, useState } from "react";
import { logout, verifyToken } from "./utils/auth";
import { useUserData } from "./context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { userData, setUserData } = useUserData();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();

  const handleCloseModal = () => {
    setShowModal(!showModal);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUserData({ name: "", email: "", role: "", isAuthenticated: false });

      navigate("/");
    } catch (err: any) {
      setMessage(err.message);
      setShowModal(true);
    }
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
  }, []);

  return (
    <nav>
      {/* <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Success
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {message}
          </Typography>
        </Box>
      </Modal> */}

      {/* Logo */}
      <Link to={"/"} className="logo link">
        Shironzi
      </Link>
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

      <div className="nav-account">
        {userData.isAuthenticated ? (
          <div
            className="dropdown"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <BsPersonCircle size={30} className="dropdown-icon" />
            {isDropdownOpen && (
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
                <li onClick={handleLogout} className="logout-btn">
                  Logout
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to={"/login"} className="authentication link">
            Login / Signup
          </Link>
        )}
      </div>
    </nav>
  );
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default Navbar;
