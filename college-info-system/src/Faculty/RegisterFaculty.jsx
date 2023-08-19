import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RegisterFaculty() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [department, setDepartment] = useState("ECE");
    const [subjects, setSubjects] = useState([]);
    const [subs, setSubs] = useState([]);
    const [depts, setDepts] = useState([]);

    const [selectedSubs, setSelectedSubs] = useState([]);

    useEffect(() => {
        const fetchDepts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:9000/departments"
                );
                const data = await response.json();
                setDepts(data);
                console.log(data);
                // getSubs(data);
                let s = [];
                // console.log("called");
                data.map((dept) => {
                    // console.log(dept._id);
                    dept.semesters.map((sem) => {
                        // console.log(sem._id);
                        sem.subjects.map((sub) => {
                            s.push(sub.name);
                            // return sub.name;
                        });
                    });
                });
                setSubs(s);
                console.log(s);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDepts();
    }, []);

    const handleSubmit = async (e) => {
        // setSubjects(selectedSubs);
        // let subs = [];
        // subs = subjects.map(sub => {
        //     console.log(sub);
        //     return {"name": sub}
        // })
        // console.log("arrayed subs: " + subs);
        e.preventDefault();
        console.log(
            name,
            email,
            password,
            mobile,
            address,
            department,
            subjects
        );
        try {
            const response = await axios.post(
                "http://localhost:9000/faculty",
                {
                    name,
                    email,
                    password,
                    mobile,
                    address,
                    department,
                    subjects
                }
            );
            console.log(response.data);
            alert("Faculty registered successfully!");
            setName("");
            setEmail("");
            setMobile("");
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };

    const handleSubSelected = (event) => {
        let sub = event.target.value;
        // console.log(sub);
        if (!subjects.includes(sub))
            setSubjects((oldArray) => [...oldArray, sub]);
        // console.log(selectedSubs);

    };

    return (
        <div className="container">
            {subs &&
                subs.map((sub) => {
                    <span>{sub}</span>;
                })}
            <div className="card">
                <div className="card-header">
                    <h3>Register Faculty</h3>
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
                                required
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
                                required
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
                                required
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
                                required
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
                                required
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department">Department:</label>
                            <input
                                readOnly
                                type="text"
                                id="department"
                                className="form-control"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subjects">Subjects</label>
                            <select multiple
                                onChange={handleSubSelected}
                                className="form-control"
                                name="sub"
                                id="sub"
                            >
                                <option value="">--select subjects--</option>
                                {subs.map((option, index) => {
                                    return (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <p>Selected subjects: {subjects.join(", ")}</p>
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

export default RegisterFaculty;
