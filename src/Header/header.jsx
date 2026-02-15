import React from "react";
import LoginFile from "../Auth/LoginFile";
import { useState, useEffect } from "react";
import { getProfile } from "../Routes/routes";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await getProfile();
        setUser(res.data);
      } catch (error) {
        localStorage.removeItem("token");
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="h-15 border-b-[0.5px] border-white  flex items-center px-90 justify-between">
      <div className="heading text-white font-bold text-2xl cursor-pointer">
        JustSingIn
      </div>
      <div className="Singhin text-white flex gap-2 cursor-pointer">
        {user ? (
          <>
            <span className="font-semibold">{user.fullName}</span>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                setUser(null);
              }}
              className="bg-red-500 px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="text-white rounded-xl"
          >
            Login
          </button>
        )}

        {open && (
          <LoginFile
            onClose={() => setOpen(false)}
            onLoginSuccess={(userData) => {
              setUser(userData);
              setOpen(false);
            }}
          />
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Header;
