import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterSection.css";

function RegisterSection() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            alert("confirm Passwords do not match with passwords");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);

                // Clear the form
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });

                // Go to login page
                navigate("/login");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Unable to connect to the server.");
        }
    };

    return (
        <section className="register">
            <div className="register-card">
                <h1>Create Account</h1>

                <p className="subtitle">
                    Sign up to start managing your tasks and projects in one place.
                </p>

                <form
                    className="register-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>

                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        className="register-btn"
                        type="submit"
                    >
                        Create Account →
                    </button>
                </form>

                <p className="login-link">
                    Already have an account?{" "}
                    <Link to="/login">
                        Log In
                    </Link>
                </p>
            </div>
        </section>
    );
}

export default RegisterSection;