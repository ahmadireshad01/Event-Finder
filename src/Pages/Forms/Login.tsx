import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// Helper validation functions
interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

const validateSignup = (data: SignupData): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.name) errors.name = "Name is required";
  else if (data.name.length < 2)
    errors.name = "Name must be at least 2 characters";
  else if (data.name.length > 50)
    errors.name = "Name cannot exceed 50 characters";
  else if (!/^[a-zA-Z\s]+$/.test(data.name))
    errors.name = "Name can only contain letters and spaces";

  if (!data.email) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please provide a valid email address";

  if (!data.password) errors.password = "Password is required";
  else if (data.password.length < 6)
    errors.password = "Password must be at least 6 characters";
  else if (data.password.length > 30)
    errors.password = "Password cannot exceed 30 characters";
  else if (!passwordRegex.test(data.password))
    errors.password =
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)";

  return { isValid: Object.keys(errors).length === 0, errors };
};

const validateLogin = (data: LoginData): ValidationResult => {
  const errors: Record<string, string> = {};
  if (!data.email) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please provide a valid email address";

  if (!data.password) errors.password = "Password is required";

  return { isValid: Object.keys(errors).length === 0, errors };
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname.toLowerCase();
  const [activeTab, setActiveTab] = useState<"login" | "signup">(
    path.includes("signup") ? "signup" : "login"
  );

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
  });

  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (path.includes("signup")) setActiveTab("signup");
    else setActiveTab("login");
  }, [path]);

  const handleTabClick = (tab: "login" | "signup") => {
    setActiveTab(tab);
    navigate(tab === "login" ? "/Login" : "/Signup");
    setMessage({ text: "", type: "" });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.id]: e.target.value });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors } = validateLogin(loginData);
    if (!isValid) {
      setMessage({ text: Object.values(errors).join(", "), type: "error" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://172.30.10.42:8000/users/login",
        loginData
      );
      localStorage.setItem("token", response.data.token);
      setMessage({ text: "Login successful!", type: "success" });
      navigate("/");
    } catch (error: any) {
      setMessage({
        text: error.response?.data?.error || "Login failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async () => {
    if (!signupData.email) {
      setMessage({ text: "Please enter your email first", type: "error" });
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://172.30.10.42:8000/users/send-code", {
        email: signupData.email,
      });
      setShowVerification(true);
      setMessage({
        text: "Verification code sent to your email",
        type: "success",
      });
    } catch (error: any) {
      setMessage({
        text: error.response?.data?.error || "Failed to send code",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setMessage({ text: "Please enter the verification code", type: "error" });
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://172.30.10.42:8000/users/verify-code", {
        email: signupData.email,
        code: verificationCode,
      });
      setMessage({ text: "Email verified successfully!", type: "success" });
      setEmailVerified(true);
      setShowVerification(false);
    } catch (error: any) {
      setMessage({
        text: error.response?.data?.error || "Invalid verification code",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailVerified) {
      setMessage({
        text: "Please verify your email before signing up",
        type: "error",
      });
      return;
    }

    const { isValid, errors } = validateSignup(signupData);
    if (!isValid) {
      setMessage({ text: Object.values(errors).join(", "), type: "error" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://172.30.10.42:8000/users",
        signupData
      );
      localStorage.setItem("token", response.data.token);
      setMessage({ text: "Sign up successful!", type: "success" });
      navigate("/");
    } catch (error: any) {
      setMessage({
        text: error.response?.data?.error || "Sign up failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-md p-8 text-gray-300">
        {message.text && (
          <div
            className={`mb-4 p-3 rounded-md text-center ${
              message.type === "success"
                ? "bg-green-800 text-green-200"
                : "bg-red-800 text-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            className={`flex-1 py-2 text-center text-lg font-semibold ${
              activeTab === "login"
                ? "border-b-2 border-blue-500 text-white"
                : "text-gray-400"
            }`}
            onClick={() => handleTabClick("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-center text-lg font-semibold ${
              activeTab === "signup"
                ? "border-b-2 border-blue-500 text-white"
                : "text-gray-400"
            }`}
            onClick={() => handleTabClick("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {activeTab === "login" && (
          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-400"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={loginData.email}
                onChange={handleLoginChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm text-gray-400"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}

        {/* Signup Form */}
        {activeTab === "signup" && (
          <form className="space-y-6" onSubmit={handleSignupSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm text-gray-400"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Full name"
                value={signupData.name}
                onChange={handleSignupChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-400"
              >
                Email address
              </label>
              <div className="flex space-x-2">
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  className="flex-1 px-4 py-2 bg-gray-700 rounded-md border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={loading}
                  className="px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Code"}
                </button>
              </div>
            </div>

            {showVerification && (
              <div>
                <label
                  htmlFor="verification-code"
                  className="block mb-2 text-sm text-gray-400"
                >
                  Verification Code
                </label>
                <div className="flex space-x-2">
                  <input
                    id="verification-code"
                    type="text"
                    placeholder="Enter code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-700 rounded-md border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={loading}
                    className="px-3 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify"}
                  </button>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm text-gray-400"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password (min. 6 characters, uppercase, number, special char)"
                value={signupData.password}
                onChange={handleSignupChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !emailVerified}
              className="w-full py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
