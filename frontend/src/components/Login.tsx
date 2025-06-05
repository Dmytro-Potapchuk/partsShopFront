import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import styles from "../components/styles/Login.module.css";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

interface LoginProps {
  setRole: (role: string | null) => void;
}

export const Login: React.FC<LoginProps> = ({ setRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Uzupełnij oba pola.");
      return;
    }

    try {
      const user = await login(username, password);

      if (rememberMe) {
        localStorage.setItem("role", user.role);
      } else {
        sessionStorage.setItem("role", user.role);
      }

      setRole(user.role);
      window.dispatchEvent(new Event("storage"));
      navigate(user.role === "admin" ? "/admin" : "/parts");
    } catch (error) {
      setError("Nieprawidłowy login lub hasło.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>Zaloguj do portalu!</h2>
        <form onSubmit={handleLogin}>
          <div style={{ width: "100%", position: "relative", marginBottom: "18px" }}>
            <label htmlFor="username" className="block text-white text-sm font-medium mb-1">
              Login
            </label>
            <AiOutlineUser style={{ position: "absolute", top: "32px", left: "20px", color: "#000" }} />
            <input
              type="text"
              id="username"
              placeholder="Wprowadź login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.inputField}
              style={{ paddingLeft: "36px" }}
            />
          </div>

          <div style={{ width: "100%", position: "relative", marginBottom: "10px" }}>
            <label htmlFor="password" className="block text-white text-sm font-medium mb-1">
              Hasło
            </label>
            <AiOutlineLock style={{ position: "absolute", top: "32px", left: "20px", color: "#000" }} />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Wprowadź hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
              style={{ paddingLeft: "36px" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "32px",
                right: "15px",
                cursor: "pointer",
                color: "#000",
                fontSize: "16px",
                userSelect: "none"
              }}
            >
              {showPassword ? "Ukryj hasło" : "Pokaż hasło"}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ marginRight: "15px" }}
            />
            <label htmlFor="rememberMe" style={{ color: "white", fontSize: "12px" }}>
              Zapamiętaj mnie
            </label>
          </div>

          {error && (
            <div style={{ color: "#ff4d4f", marginBottom: "12px", fontSize: "14px" }}>
              {error}
            </div>
          )}

          <button type="submit" className={styles.button}>
            Zaloguj się
          </button>
        </form>

        <p className={styles.link}>
          Nie masz konta? <a href="/register">Zarejestruj się</a>
        </p>
      </div>
    </div>
  );
};
