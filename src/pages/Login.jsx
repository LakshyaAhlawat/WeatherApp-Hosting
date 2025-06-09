import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../services/apiConnector";
import { login as loginAction } from "../redux/slices/authSlice";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form.email, form.password);
      if (res.success) {
        localStorage.setItem("token", res.token);
        dispatch(loginAction({ username: res.user?.username || "User" }));
        navigate("/dashboard");
      } else {
        setMessage(res.message || "Login failed");
      }
    } catch {
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-950/80 backdrop-blur-md border border-gray-800 p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-semibold text-center text-white mb-8">
          Welcome Back
        </h2>

        <div className="space-y-5">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-300 transform hover:scale-[1.02]"
        >
          Login
        </button>

        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.includes("failed") ? "text-red-400" : "text-green-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
