import { useState } from "react";
import { loginUser } from "../../api";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
    const [loginFormData, setLoginFormData] = useState({ email: "", password: ""});
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setStatus("submitting");
        loginUser(loginFormData)
            .then(data => {
                navigate("/host");
            })
            .catch(err => setError(err))
            .finally(() => setStatus("idle"));
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
                <h3 className="login-error">{location.state.message}</h3>
            }
            <h1>Sign in to your account</h1>
            { error ?.message && <h2 className="login-error">There was an error: {error.message}</h2>}
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
                <button disabled={status === "submitting" ? true : false}>
                    {status === "submitting" ? "Loggin in..." : "Log in"}
                </button>
            </form>
        </div>
    )
}