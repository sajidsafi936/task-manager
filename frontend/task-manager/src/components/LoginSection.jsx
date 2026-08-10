import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import "./LoginSection.css";

function LoginSection() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            toast.success(data.message);

            // save token and user for later authenticated requests
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            console.log("Logged in user:", data.user);

            navigate("/HomeDashboard");
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.error(error);
        alert("Unable to connect to the server.");
    }
};

    return (
        <div className="login">
            <div className="login-card">
                <h1>Welcome Back</h1>

                <p>
                    Log in to continue managing your tasks and projects.
                </p>

                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) =>
                                    setRememberMe(e.target.checked)
                                }
                            />

                            Remember me
                        </label>

                        <a
                            href="/forgot-password"
                            className="forgot-link"
                        >
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                    >
                        Log In ➜
                    </button>
                </form>

                <p className="register-link">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginSection;