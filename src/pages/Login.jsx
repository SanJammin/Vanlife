import { useState } from "react";
import { loginUser } from "../../api";
import { useLocation } from "react-router-dom";

export default function Login() {
    const [loginFormData, setLoginFormData] = useState({ email: "", password: ""});
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);
    const location = useLocation();

    function handleSubmit(e) {
        e.preventDefault();
        setStatus("submitting");
        loginUser(loginFormData)
            .then(data => console.log(data))
            .catch(err => setError(err))
            .finally(setStatus("idle"))
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div className="login-container">
            {
                location.state?.message &&
                <h3 className="login-first">{location.state.message}</h3>
            }
            <h1>Sign in to your account</h1>
            { error && <h2>There was an error: {error.message}</h2>}
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button disabled={status === "submitting" ? true : false}>Log in</button>
            </form>
        </div>
    )
}