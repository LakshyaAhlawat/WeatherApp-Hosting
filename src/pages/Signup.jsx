import { useState } from "react";
import { signup } from "../services/apiConnector";

export default function Signup() {
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(form.email, form.username, form.password);
    setSuccess(res.success);
    setMessage(res.message || (res.success ? "Signup successful!" : "Signup failed"));
    if (res.token) localStorage.setItem("token", res.token);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-950 border border-gray-800 p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Create Account
        </h2>

        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="mb-4 w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
        />
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="mb-4 w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-6 w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Sign Up
        </button>

        {message && (
          <div
            className={`mt-4 text-center text-sm font-medium ${
              success ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
