import { useState } from "react";
import "./Login.css";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = [
            {username: "admin", password: "12345"},
            {username: "player1", password: "password1"},
        ];

        const user = users.find(
            (u) => u.username === username && u.password === password
        );

        if (user) {
            onLogin(user);
        } else {
            setError("Невірний логін або пароль");
        }
    };

    return (
        <div className="login">
            <div className="wrapper">
                <section>
                    <div className="form-box">
                        <div className="form-value">
                            <form onSubmit={handleSubmit}>
                                <h2>Login</h2>
                                <div className="inputbox">
                                    <ion-icon name="mail-outline"></ion-icon>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <label htmlFor="">Email</label>
                                </div>
                                <div className="inputbox">
                                    <ion-icon name="lock-closed-outline"></ion-icon>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label for="">Password</label>
                                </div>
                                <button type="submit">Log in</button>
                            </form>
                            {error && <p className="error">{error}</p>}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
