import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { register } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(true);
  const [countdown, setCountdown] = useState(0);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setCountdown(0);

    if (password !== confirmPassword) {
      setMessage("Password does not match.");
      return;
    }

    try {
      const res = await register(
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
      );

      setIsError(false);
      setMessage(res?.data?.message ?? "Registration successful");

      setCountdown(5);
    } catch (err: any) {
      e.preventDefault();
      setMessage(err.message);
      console.log(err.message);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (countdown === 0 && !isError && message) {
      navigate("/login");
    }
  }, [countdown, isError, message, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-[90vh] bg-dark-800" id="sc-register">
      <div className="flex items-center justify-center p-8">
        <div className="bg-dark-700 border border-white/[0.09] rounded-[16px] px-10 py-9 w-full max-w-[440px]">
          <h1 className="font-serif text-[26px] text-[#e8e6e1] mb-1.5">
            Create account
          </h1>
          <p className="text-[13px] text-muted-faint mb-7">
            Join Stelio and start exploring
          </p>

          {message && (
            <h4
              className={`p-4 rounded-md mb-3 ${isError ? "bg-red-100 text-red-700 border-l-4 border-red-500" : "bg-green-100 text-green-700 border-l-4 border-green-500"}`}
            >
              {message}
              {!isError && countdown > 0 && (
                <span className="ml-2 text-sm text-gray-600">
                  Redirecting to login in {countdown}...
                </span>
              )}
            </h4>
          )}

          <form onSubmit={onSubmit} className="grid gap-3">
            <div className="grid grid-cols-2 gap-2.5 mb-3">
              <div>
                <div className="text-[11px] text-white uppercase tracking-[0.07em] mb-1.5">
                  First name
                </div>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.currentTarget.value)}
                  placeholder="First name"
                  className="s-input w-full bg-dark-900 border border-white/10 rounded-lg px-[14px] py-[11px] text-[#e8e6e1] text-[13px] font-sans transition-colors"
                  required
                />
              </div>
              <div>
                <div className="text-[11px] text-white uppercase tracking-[0.07em] mb-1.5">
                  Last name
                </div>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.currentTarget.value)}
                  placeholder="Last name"
                  className="s-input w-full bg-dark-900 border border-white/10 rounded-lg px-[14px] py-[11px] text-[#e8e6e1] text-[13px] font-sans transition-colors"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="text-[11px] text-white uppercase tracking-[0.07em] mb-1.5">
                Email
              </div>
              <input
                className="s-input w-full bg-dark-900 border border-white/10 rounded-lg px-[14px] py-[11px] text-[#e8e6e1] text-[13px] font-sans transition-colors"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
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
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder="Password"
                  required
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-faint text-[14px] cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEye color="#ffffff" />
                  ) : (
                    <FaEyeSlash color="#ffffff" />
                  )}
                </span>
              </div>
            </div>

            <div className="mb-5">
              <div className="text-[11px] text-white uppercase tracking-[0.07em] mb-1.5">
                Confirm Password
              </div>
              <div className="relative">
                <input
                  className="s-input w-full bg-dark-900 border border-white/10 rounded-lg px-[14px] py-[11px] pr-10 text-[#e8e6e1] text-[13px] font-sans transition-colors"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                  placeholder="Confirm password"
                  required
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-faint text-[14px] cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <FaEye color="#ffffff" />
                  ) : (
                    <FaEyeSlash color="#ffffff" />
                  )}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gold text-dark-900 border-none rounded-[10px] py-[13px] text-[14px] font-semibold font-sans cursor-pointer hover:bg-gold-light transition-colors"
            >
              Create account
            </button>

            <div className="text-center text-[12px] text-muted-faint mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-gold cursor-pointer">
                Sign in →
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
