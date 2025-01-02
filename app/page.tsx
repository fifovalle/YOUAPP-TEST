"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState(""); // Manages the email input
  const [password, setPassword] = useState(""); // Manages the password input
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Toggles password visibility

  // Toggle password visibility function
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <section className="min-h-screen flex items-center justify-center font-sans px-4 bg-radial-custom">
      <main className="w-full max-w-md rounded-lg">
        <h1 className="text-2xl text-white font-bold mb-6 ml-4">Login</h1>

        <form className="space-y-4">
          {/* Email Input */}
          <input
            type="text"
            placeholder="Enter Username/Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-md bg-[rgba(255,255,255,0.06)] text-white placeholder:text-gray-300 border border-transparent focus:ring-2"
          />

          {/* Password Input */}
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-md bg-[rgba(255,255,255,0.06)] text-white placeholder:text-gray-300 border border-transparent focus:ring-2 pr-10"
            />

            {/* Toggle Button for Password Visibility */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm"
              style={{
                background: "transparent",
                borderRadius: "50%",
                padding: "0.5rem",
              }}
            >
              {isPasswordVisible ? (
                <FaEye className="w-5 h-5" style={{ fill: "url(#grad1)" }} />
              ) : (
                <FaEyeSlash
                  className="w-5 h-5"
                  style={{ fill: "url(#grad1)" }}
                />
              )}
            </button>

            {/* Gradient for icon fill */}
            <svg width="0" height="0">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#94783E", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#D5BE88", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={() => router.push("/about")}
            disabled={!email || !password}
            className={`w-full py-2 bg-gradient-to-r from-[#62CDCB] to-[#4599DB] hover:bg-blue-700 rounded-md text-lg font-semibold text-white transition-all duration-300 ${
              !email || !password
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-xl hover:shadow-[#4599DB]/50"
            }`}
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-400 mt-4">
          No account?{" "}
          <a
            onClick={() => router.push("/register")}
            className="text-transparent bg-clip-text bg-[linear-gradient(74.08deg,_#94783E_-6.8%,_#F3EDA6_16.76%,_#F8FAE5_30.5%,_#FFE2BE_49.6%,_#D5BE88_78.56%,_#F8FAE5_89.01%,_#D5BE88_100.43%)] hover:underline cursor-pointer"
          >
            Register here
          </a>
        </p>
      </main>
    </section>
  );
}
