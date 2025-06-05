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
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(username, password);
      console.log("Zalogowany użytkownik:", user);

      localStorage.setItem("role", user.role);
      setRole(user.role);
      window.dispatchEvent(new Event("storage"));
      navigate(user.role === "admin" ? "/admin" : "/parts");
    } catch (error) {
      alert("Błąd logowania, hasło jest niepoprawne. Spróbuj ponownie.");
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <h2>Zaloguj do portalu!</h2>
          <form onSubmit={handleLogin} className="relative z-10">
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-1" htmlFor="username">
                Login
              </label>
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
              <label className="block text-white text-sm font-medium mb-1" htmlFor="password">
                Hasło
              </label>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Wprowadź hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.inputField}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    top: "35%",
                    right: "22px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#000000",
                    fontSize: "16px",
                    userSelect: "none"
                  }}
                >
                  {showPassword ? "Ukryj" : "Pokaż hasło"}
                </span>
              </div>
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
