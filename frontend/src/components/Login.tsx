import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import styles from "../components/styles/Login.module.css";

interface LoginProps {
    setRole: (role: string | null) => void;
}

export const Login: React.FC<LoginProps> = ({ setRole }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await login(username, password);
            console.log("Zalogowany użytkownik:", user);

            // ✅ Zapisanie roli w localStorage i aktualizacja stanu
            localStorage.setItem("role", user.role);
            setRole(user.role);

            // ✅ Wysłanie eventu do innych komponentów (np. App.tsx)
            window.dispatchEvent(new Event("storage"));

            // ✅ Przekierowanie użytkownika
            navigate(user.role === "admin" ? "/admin" : "/parts");
        } catch (error) {
            alert("Błąd logowania, spróbuj ponownie.");
        }
    };

    return (
        <div>
            <h1>Car Parts Shop</h1>
            <div className={styles.container}>
                <div className={styles.loginBox}>
                    <h2>Logowanie</h2>
                    <form onSubmit={handleLogin} className="relative z-10">
                        <div className="mb-4">
                            <label className="block text-white text-sm font-medium mb-1" htmlFor="username">Login</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Wprowadź login"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={styles.inputField}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-white text-sm font-medium mb-1" htmlFor="password">Hasło</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Wprowadź hasło"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.inputField}
                            />
                        </div>
                        <button type="submit" className={styles.button}>
                            Zaloguj się
                        </button>
                    </form>
                    <p className={styles.link}>
                        Nie masz konta? <a href="/register">Zarejestruj się</a>
                    </p>
                </div>
            </div>
        </div>
    );
};
