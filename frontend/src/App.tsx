import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { PartForm } from "./components/PartForm";
import { PartsList } from "./components/PartList";
import { getRole, logout } from "./services/authService";

const App: React.FC = () => {
    const [role, setRole] = useState<string | null>(getRole());

    // Aktualizacja roli po zmianie w localStorage (np. po logowaniu)
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
  <div style={{
    background: "linear-gradient(to bottom right, #1e1e2f, #0f1123)",
    minHeight: "100vh",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "40px"
  }}>
    <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>Sklep z częściami samochodowymi</h1>

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
          marginBottom: "20px"
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
        element={role === "admin" ? (
          <>
            <PartForm onPartAdded={() => setRole(getRole())} />
            <PartsList />
          </>
        ) : <Navigate to={role ? "/parts" : "/login"} />}
      />
      <Route path="*" element={<Navigate to={role ? "/parts" : "/login"} />} />
    </Routes>
  </div>
</Router>

    );
};

export default App;
