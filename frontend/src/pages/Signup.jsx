
// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import Icons from '../icons';

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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
    try {
      const res = await api.post("/auth/signup", formData);
      if (res.data.success) {
        login(res.data.user);
        navigate("/");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-neutral-100">
      <form onSubmit={handleSubmit} className="bg-neutral-0 shadow-md p-8 rounded-xl w-[22rem]">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-base mb-3">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full rounded mb-3"
          required
        />
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
            className="border p-2 w-full rounded mb-4 focus:outline-none focus:border-[1.5px] pr-10"
            required
          />

          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-7/20 -translate-y-1/2 text-[#525866] cursor-pointer hover:text-neutral-950"
          >
            {showPassword ? <Icons.Hide /> : <Icons.Show />}
          </span>
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded cursor-pointer">
          Sign Up
        </button>

        <p className="text-sm text-center mt-3">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-500 hover:underline">
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
}
