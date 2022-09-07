import axios from "axios";
import React, {useContext, useState} from "react";
import AuthContext from "../../context/AuthContext";
import {useHistory} from "react-router-dom";
import styles from './auth.module.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState(null);

    const {getLoggedIn} = useContext(AuthContext);

    const history = useHistory()

    async function login(e) {
        e.preventDefault();

        try {
            const loginData = {
                email,
                password,
            };

            // await axios.post("http://localhost:5000/auth/", registerData);
            await axios.post(
                "http://localhost:4000/auth/login",
                loginData
            );
            await getLoggedIn();
            history.push("/")
        } catch (err) {
            setError(err)
        }
    }

    return (
        <div>
            <h1>login</h1>
            <form onSubmit={login}>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button type="submit">Login</button>
            </form>

            <div className={styles.alertim}>{error ? "Şifreler uyuşmuyor" : ""}</div>
        </div>
    );
}

export default Login;