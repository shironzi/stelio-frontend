import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "@/styles/auth.css";
import { register } from "../../utils/auth";
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

    console.log(password);

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
        confirmPassword
      );

      setIsError(false);
      setMessage(res?.data?.message ?? "Registration successful");

      // Start countdown (5 seconds)
      setCountdown(5);
    } catch (err: any) {
      e.preventDefault();
      setMessage(err.message);
      setIsError(true);
    }
  };

  // Countdown effect
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

  // Redirect to homepage, if logged in
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/");
      console.log(token);
    }
  }, []);

  return (
    <div>
      <h1 className="text-center">Register</h1>

      {message && (
        <h4 className={isError ? "error" : "success"}>
          {message}{" "}
          {!isError && countdown > 0 && (
            <span>Redirecting to login in {countdown}...</span>
          )}
        </h4>
      )}

      <form onSubmit={onSubmit} className="registration_container auth-form">
        <div className="name_container">
          <input
            type="text"
            value={firstname}
            onInput={(e) => setFirstname((e.target as HTMLInputElement).value)}
            placeholder="Firstname"
            className="input"
            required
          />
          <input
            type="text"
            value={lastname}
            onInput={(e) => setLastname((e.target as HTMLInputElement).value)}
            placeholder="Lastname"
            className="input"
            required
          />
        </div>

        <input
          className="input"
          type="email"
          name="email"
          value={email}
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          placeholder="Email"
          required
        />

        <div className="password_container">
          <input
            className="password_input"
            name="passwordInput"
            type={showPassword ? "text" : "password"}
            value={password}
            onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
            placeholder="Password"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="password_visibility"
          >
            {showPassword ? (
              <FaEye color="#e0e0e0" size={16} />
            ) : (
              <FaEyeSlash color="#e0e0e0" size={16} />
            )}
          </button>
        </div>

        <div className="password_container">
          <input
            className="password_input"
            name="passwordInput"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onInput={(e) =>
              setConfirmPassword((e.target as HTMLInputElement).value)
            }
            placeholder="Confirm Password"
            required
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="password_visibility"
          >
            {showConfirmPassword ? (
              <FaEye color="#e0e0e0" size={16} />
            ) : (
              <FaEyeSlash color="#e0e0e0" size={16} />
            )}
          </button>
        </div>

        <Link to="/login" className="auth-redirect">
          <h4>Have an account?</h4>
        </Link>

        <button className="auth-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
