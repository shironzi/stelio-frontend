import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { login } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../../context/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const { setUserData } = useUserData();
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("password.");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await login(email, password);
      const userDetails = res.userDetails;

      setUserData({
        id: userDetails.id,
        name: userDetails?.name,
        email: userDetails?.email,
        role: userDetails?.role,
        isAuthenticated: true,
      });

      navigate("/");
    } catch (err: any) {
      setError(err.message);
      e.preventDefault();
    }
  };

  // Redirect to homepage, if logged in
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="s-screen bg-dark-800 min-h-screen h-full" id="sc-login">
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="bg-dark-700 border border-white/[0.09] rounded-[16px] px-10 py-9 w-full max-w-[400px]">
          <h1 className="font-serif text-[26px] text-[#e8e6e1] mb-1.5">
            Welcome back
          </h1>
          <p className="text-[13px] text-muted-faint mb-7">
            Sign in to your Stelio account
          </p>

          {error.length > 0 && <h4 className="error">{error}</h4>}

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <div className="text-[11px] text-white uppercase tracking-[0.07em] mb-1.5">
                Email
              </div>
              <input
                className="s-input w-full bg-dark-900 border border-white/10 rounded-lg px-[14px] py-[11px] text-[#e8e6e1] text-[13px] font-sans transition-colors"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="mb-3">
              <div className="text-[11px] text-white uppercase tracking-[0.07em] mb-1.5">
                Password
              </div>
              <div className="relative">
                <input
                  className="s-input w-full bg-dark-900 border border-white/10 rounded-lg px-[14px] py-[11px] pr-10 text-[#e8e6e1] text-[13px] font-sans transition-colors"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-faint text-[14px] cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-[12px] text-gold cursor-pointer">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-gold text-dark-900 border-none rounded-[10px] py-[13px] text-[14px] font-semibold font-sans cursor-pointer hover:bg-gold-light transition-colors mb-4"
            >
              Sign in
            </button>

            <div className="text-center text-[11px] text-muted-deep my-4">
              or
            </div>

            <div className="text-center text-[12px] text-muted-faint">
              Don't have an account?{" "}
              <Link to="/register" className="text-gold cursor-pointer">
                Create one →
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
