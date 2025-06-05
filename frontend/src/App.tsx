import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { PartForm } from "./components/PartForm";
import { PartsList } from "./components/PartList";
import { getRole, logout } from "./services/authService";

const App: React.FC = () => {
  const [role, setRole] = useState<string | null>(getRole());
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(getRole());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    logout();
    setRole(null);
  };

  return (
    <Router>
      <div
        style={{
          background: darkMode
            ? "linear-gradient(to bottom right, #1e1e2f, #0f1123)"
            : "#f4f4f4",
          minHeight: "100vh",
          color: darkMode ? "white" : "#111",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "40px",
          position: "relative",
        }}
      >
        {/* Tryb jasny/ciemny */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "none",
            border: "1px solid #fff",
            borderRadius: "10px",
            padding: "6px 12px",
            color: "#fff",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {darkMode ? "☀️ Jasny" : "🌙 Ciemny"}
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <img
            src="/logo.png"
            alt="Logo sklepu"
            style={{ width: "250px", height: "250px", objectFit: "contain" }}
          />
          <h1 style={{ fontSize: "3.5rem", margin: 0 }}>
            Sklep z częściami samochodowymi
          </h1>
        </div>

        {role && (
          <button
            onClick={handleLogout}
            style={{
              background: "#e74c3c",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            Wyloguj
          </button>
        )}

        <Routes>
          <Route path="/login" element={<Login setRole={setRole} />} />
          <Route path="/parts" element={role ? <PartsList /> : <Navigate to="/login" />} />
          <Route
            path="/admin"
            element={
              role === "admin" ? (
                <>
                  <PartForm onPartAdded={() => setRole(getRole())} />
                  <PartsList />
                </>
              ) : (
                <Navigate to={role ? "/parts" : "/login"} />
              )
            }
          />
          <Route path="*" element={<Navigate to={role ? "/parts" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
