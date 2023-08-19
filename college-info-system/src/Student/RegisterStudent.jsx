import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RegisterStudent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword]=useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [department, setDepartment] = useState("ECE");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password, mobile, address, department);
        try {
            const response = await axios.post(
                "http://localhost:9000/students",
                {
                    name,
                    email,
                    password,
                    mobile,
                    address,
                    department,
                }
            );
            console.log(response.data);
            alert("Student registered successfully!");
            setName("");
            setEmail("");
            setMobile("");
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3>Register Student</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Password:</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">Mobile:</label>
                            <input
                                type="text"
                                id="mobile"
                                className="form-control"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address:</label>
                            <input
                                type="text"
                                id="address"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department">Department:</label>
                            <input 
                                type="text"
                                id="department"
                                className="form-control"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value.toUpperCase())}
                            />
                        </div>
                        <br />
                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                        >
                            Register
                        </button>
                    </form>
                    <p>
                        Have an account?{" "}
                        <Link className="link" to="/">
                            Login
                        </Link>{" "}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterStudent;
