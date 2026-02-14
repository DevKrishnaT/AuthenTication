import React, { useState } from "react";

const LoginFile = ({ onClose }) => {
  const [isSignup, setIsSignup] = useState(false);

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

        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-400 bg-transparent focus:outline-white"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-400 bg-transparent focus:outline-white"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 rounded-lg border border-gray-400 bg-transparent focus:outline-white"
        />

        <button className="w-full bg-white py-2 rounded-full hover:bg-gray-100 transition text-black">
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
