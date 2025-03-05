import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { PartForm } from "./components/PartForm";
import { PartsList } from "./components/PartList";
import { getRole, logout } from "./services/authService";

const App: React.FC = () => {
    const [role, setRole] = useState<string | null>(getRole());

    useEffect(() => {
        const storedRole = getRole();
        console.log("Ustawiona rola:", storedRole); // Debugowanie
        setRole(storedRole);
    }, []);

    const handleLogout = () => {
        logout();
        setRole(null);
    };

    return (
        <Router>
            <div>
                <h1>Car Parts Shop</h1>
                {role && <button onClick={handleLogout}>Wyloguj</button>}

                <Routes>
                    <Route path="/login" element={<Login />} />

                    {/* Klient i admin mogą zobaczyć części */}
                    <Route path="/parts" element={role ? <PartsList /> : <Navigate to="/login" />} />

                    {/* Admin może zarządzać częściami */}
                    <Route path="/admin" element={role === "admin" ? (
                        <>
                            <PartForm onPartAdded={() => setRole(getRole())} />
                            <PartsList />
                        </>
                    ) : <Navigate to={role ? "/parts" : "/login"} />} />

                    {/* Domyślne przekierowanie */}
                    <Route path="*" element={<Navigate to={role ? "/parts" : "/login"} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
