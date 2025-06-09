import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CityMapPage from "./pages/CityMapPage";
import CityMap from "./pages/CityMap";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import "./App.css";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const [showModal, setShowModal] = useState(true);
  const [usedFeatureOnce, setUsedFeatureOnce] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
    setUsedFeatureOnce(true);
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showModal && !usedFeatureOnce && (
                  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 text-center max-w-md w-full">
                      <h2 className="text-xl font-bold mb-4">Limited Access</h2>
                      <p className="text-gray-300 mb-6">
                        You can use this feature only once without signing up or logging in.
                      </p>
                      <button
                        onClick={handleModalClose}
                        className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}
                <Home />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/city-map"
            element={
              <ProtectedRoute>
                <CityMap />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
