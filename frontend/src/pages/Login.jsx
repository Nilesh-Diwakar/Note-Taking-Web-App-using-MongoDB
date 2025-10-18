

import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import Icons from '../icons';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", formData);

      if (res.data.success) {
        login(res.data.user); // update context
        navigate("/");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.log(err.response?.data?.message);
      console.error(err);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-neutral-100">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-0 shadow-md p-8 rounded-xl w-[22rem]"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 text-base mb-3">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full rounded mb-3 focus:outline-none focus:border-[1.5px]"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} 
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 w-full rounded mb-3 focus:outline-none focus:border-[1.5px] pr-10"
            required
          />

          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-2/5 -translate-y-1/2 text-[#525866] cursor-pointer hover:text-neutral-950"
          >
            {showPassword ? <Icons.Hide /> : <Icons.Show />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded cursor-pointer"
        >
          Login
        </button>

        <p className="text-sm text-center mt-3">
          Don’t have an account?{" "}
          <NavLink to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </NavLink>
        </p>
      </form>
    </div>
  );
}
