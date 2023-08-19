import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // import useHistory from React Router
import "./LoginForm.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Student");
    const [name, setName] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        console.log({ email, password, role });
        try {
            const response = await axios.post("http://localhost:9000/login", {
                email,
                password,
                role,
            });
            console.log("Login successful:", response.data);
            toast.success("Login successful!");
            Cookies.set("id", response.data.id);
            Cookies.set("role", response.data.role);
            Cookies.set("name", response.data.name);
            Cookies.set("pwd", password);
            if (role == "Faculty") {
                navigate("/faculty-home");
            } else if (role == "Student") {
                navigate("/student-home");
            } else {
                navigate("/admin-home");
            }
        } catch (error) {
            console.log(error);
            toast.error(JSON.parse(error.request.response).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3>Login</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                className="form-control"
                                type="email"
                                id="email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                className="form-control"
                                type="password"
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select
                                onChange={(e) => setRole(e.target.value)}
                                className="form-control"
                                name="role"
                                id="role"
                            >
                                <option value="Student">Student</option>
                                <option value="Faculty">Faculty</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <br />
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        <br />
                        <p>
                            Create an account for{" "}
                            <Link className="link" to="register-student">
                                Student
                            </Link>{" "}
                            /{" "}
                            <Link className="link" to="register-faculty">
                                Faculty
                            </Link>
                        </p>
                    </form>
                </div>
                {loading && <div className="loading-spinner"></div>}
            </div>
        </div>
    );
}

export default LoginForm;
