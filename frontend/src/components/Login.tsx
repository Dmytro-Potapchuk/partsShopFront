import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import styles from "../components/styles/Login.module.css";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Dodajemy preventDefault, aby zapobiec domyślnemu działaniu formularza
        try {
            const user = await login(username, password); // Zaloguj użytkownika
            console.log("Zalogowany użytkownik:", user);

            // Jeśli rola to 'admin' lub 'client', przechodzimy na stronę parts
            if (user.role === "admin") {
                console.log("Przekierowanie do /admin");
                navigate("/admin");
            } else {
                console.log("Przekierowanie do /parts");
                navigate("/parts");
            }
        } catch (error) {
            alert("Błąd logowania, spróbuj ponownie.");
        }
    };

    return (
        <div className={styles.container}>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Logowanie</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Login"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />

                        <input
                            type="password"
                            placeholder="Hasło"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />

                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
                        >
                            Zaloguj
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Nie masz konta? <a href="/register" className="text-red-500 hover:underline">Zarejestruj się</a>
                    </p>
                </div>
            </div>
        </div>
    );
};
