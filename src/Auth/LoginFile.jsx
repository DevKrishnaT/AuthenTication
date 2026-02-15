import React, { useState } from "react";
import { login, signup, getProfile } from "../Routes/routes";


const LoginFile = ({ onClose, onLoginSuccess }) => {
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    setError("");

    try {
      if (isSignup) {
        await signup({ fullName, email, password });

        setIsSignup(false);
      } else {
        const res = await login({ email, password });
        localStorage.setItem("token", res.data.token);
        const profileRes = await getProfile();

        onLoginSuccess(profileRes.data);
       
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[1px] z-40"
        onClick={onClose}
      ></div>

      <div className="relative z-50  w-[400px] bg-[#212121] shadow-2xl rounded-3xl text-white p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        {isSignup && (
          <input
            type="text"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            placeholder="Full Name"
            className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-400 bg-transparent focus:outline-white"
          />
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-400 bg-transparent focus:outline-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 rounded-lg border border-gray-400 bg-transparent focus:outline-white"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-white py-2 rounded-full hover:bg-gray-100 transition text-black"
        >
          {isSignup ? "Create Account" : "Login"}
        </button>

        <p className="text-sm text-center mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="ml-2 text-blue-400 cursor-pointer hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default LoginFile;
