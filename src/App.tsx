import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/auth/Register";

import { Navbar } from "./components/common/Navbar";
import "./styles/global.css";
import PropertyForm from "./pages/property/PropertyForm";
import PropertyImage from "./pages/property/PropertyImage";
import PropertyView from "./pages/property/PropertyView";
import PropertyReview from "./pages/property/PropertyReview";
import ManageProperty from "./pages/property/ManageProperty";
import PageNotFound from "./PageNotFound";
import Bookings from "./pages/bookings/Bookings";
import Messages from "./pages/messages/Messages";
import MyBookings from "./pages/bookings/MyBookings";
import Profile from "./pages/Profile";
import { useUserData } from "./context/UserContext";
import OwnerHome from "./pages/Home/OwnerHome";
import Analytics from "./pages/Analytics";
import Guests from "./pages/Guests";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  return <Outlet />;
};

function App() {
  const { userData } = useUserData();

  const isOwner = userData.role === "OWNER";
  const isRenter = userData.role === "RENTER";

  return (
    <Router>
      <div className="w-screen">
        <Navbar />
        <Routes>
          {/* Home Page */}
          <Route path="/" element={isOwner ? <OwnerHome /> : <Home />} />

          {/* Auth Page */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Owner Routes */}
          <Route element={<ProtectedRoutes />}>
            {isOwner && (
              <>
                <Route path="/property/form" element={<PropertyForm />} />
                <Route path="/property/image" element={<PropertyImage />} />
                <Route path="/property/review" element={<PropertyReview />} />
                <Route path="/manage" element={<ManageProperty />} />
                <Route
                  path="/property/edit/info/:id"
                  element={<PropertyForm />}
                />
                <Route
                  path="/property/edit/image/:id"
                  element={<PropertyImage />}
                />
                <Route
                  path="/property/edit/review/:id"
                  element={<PropertyReview />}
                />

                <Route path="/bookings" element={<Bookings />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/guests" element={<Guests />} />
              </>
            )}

            {/* Renter Routes */}
            {isRenter && (
              <>
                <Route path="/my-bookings" element={<MyBookings />} />
              </>
            )}
            <Route path="/property/:id" element={<PropertyView />} />

            {/* Messages Routes */}
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:id" element={<Messages />} />

            <Route path="/profile" element={<Profile />} />

            {/* Page not found */}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
