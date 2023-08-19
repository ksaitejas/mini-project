import axios from "axios";
import Cookies from "js-cookie";
import React, { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddAttendance() {
    const [faculty, setFaculty] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [facultySubjects, setFacultySubjects] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState("");
    const [departments, setDepartments] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const userId = Cookies.get("id");
    const [attendance, setAttendance] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [isPosted, setIsPosted] = useState(true);
    const [viewAttendance, setViewAttendance] = useState([]);
    const [isView, setIsView] = useState(false);

    const containerStyle = {
        width: "40%",
    };
    const bold = {
        fontWeight: "bold",
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:9000/students");
                const data = await response.json();
                setStudents(data);
                let arr = [];
                data.map((st) => {
                    arr.push({
                        id: st._id,
                        name: st.name,
                        present: false,
                    });
                });
                setAttendance(arr);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStudents();
        const fetchDepartments = async () => {
            try {
                const response = await fetch(
                    "http://localhost:9000/departments"
                );
                const data = await response.json();
                setDepartments(data);
                setSemesters(data[0].semesters);
                // console.log(data[0].semesters);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDepartments();
        const fetchFaculty = async () => {
            try {
                const response = await fetch(
                    `http://localhost:9000/faculty/${userId}`
                );
                const data = await response.json();
                // console.log(data);
                setFaculty(data);
                setFacultySubjects(data.subjects);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFaculty();
    }, []);

    const handleSubjectChange = (event) => {
        let subject = event.target.value;
        setSelectedSubject(subject);
    };

    const handleSemesterChange = (event) => {
        let semNo = event.target.value;
        setSelectedSemester(semNo);
        let s = semesters.filter((sem) => {
            return sem.no === semNo;
        });
        // console.log(s[0].subjects);
        setSubjects(s[0].subjects);
    };

    const handleCheck = (event) => {
        // let val = event.target.value;
        // console.log(event);
        let checked = event.target.checked;
        let id = event.target.id;
        let name = event.target.name;
        console.log(checked + " " + id + " " + name);
        if (checked) {
            if (!checkId(id)) {
                setAttendance((old) => [
                    ...old,
                    { id: id, name: name, present: true },
                ]);
            } else {
                attendance.map((at) => {
                    if (at.id === id) at.present = true;
                });
            }
        } else {
            if (checkId(id)) {
                attendance.map((at) => {
                    if (at.id === id) at.present = false;
                });
            }
        }
        // console.log(attendance);
        // console.log(event.target.id + " " + event.target.checked);
    };

    const checkId = (id) => {
        let present = false;
        attendance.map((at) => {
            if (at.id === id) present = true;
        });
        console.log("checkid: " + id + " " + present);
        return present;
    };

    const handleDateChange = (event) => {
        // console.log(event.target.value);
        setSelectedDate(event.target.value);
    };

    const handleCheckAttendance = async () => {
        setIsView(false);
        try {
            let response = await fetch(
                `http://localhost:9000/attendance/${selectedSemester}/${selectedDate}/${selectedSubject}`
            );
            const data = await response.json();
            // console.log(data);
            if (data.length > 0) {
                setIsPosted(true);
                toast.error(`Attendance already posted on ${selectedDate}`);
            } else {
                setIsPosted(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleViewAttendance = async () => {
        try {
            let response = await fetch(
                `http://localhost:9000/attendance/${selectedSemester}/${selectedDate}/${selectedSubject}`
            );
            const data = await response.json();
            console.log(data);
            if (data.length != 0) {
                console.log(data[0].attendance);
                setViewAttendance(data[0].attendance);
                setIsView(true);
            } else {
                toast.error(`No attendance posted on ${selectedDate}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        let res = {
            semNo: selectedSemester,
            subject: selectedSubject,
            date: selectedDate,
            attendance: attendance,
        };
        console.log(res);
        try {
            const response = await axios.post(
                "http://localhost:9000/attendance",
                res
            );
            console.log(response.data);
            toast.success(`Attendance posted on ${selectedDate}`);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container" style={containerStyle}>
            <div className="card">
                <table className="table">
                    <tbody>
                        <tr>
                            <td style={bold}>Semester</td>
                            <td>
                                <div className="form-group">
                                    <select
                                        onChange={handleSemesterChange}
                                        className="form-control"
                                        name="sem"
                                        id="sem"
                                    >
                                        <option value="">
                                            --select semester--
                                        </option>
                                        {semesters.map((sem, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={sem.no}
                                                >
                                                    {sem.no}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={bold}>Date of lecture</td>
                            <td>
                                <div className="form-group">
                                    <input
                                        onChange={handleDateChange}
                                        type="date"
                                        name="date"
                                        id="date"
                                        className="form-control"
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={bold}>Subject</td>
                            <td>
                                <div className="form-group">
                                    <select
                                        onChange={handleSubjectChange}
                                        className="form-control"
                                        name="sub"
                                        id="sub"
                                    >
                                        <option value="">
                                            --select subject--
                                        </option>
                                        {subjects.map((sub, index) => {
                                            return (
                                                facultySubjects.includes(
                                                    sub.name
                                                ) && (
                                                    <option
                                                        value={sub.name}
                                                        key={index}
                                                    >
                                                        {sub.name}
                                                    </option>
                                                )
                                            );
                                        })}
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button
                                    disabled={
                                        !selectedDate ||
                                        !selectedSemester ||
                                        !selectedSubject
                                    }
                                    className="btn btn-primary"
                                    onClick={handleCheckAttendance}
                                >
                                    Check if posted
                                </button>
                            </td>
                            <td>
                                <button
                                    disabled={
                                        !selectedDate ||
                                        !selectedSemester ||
                                        !selectedSubject
                                    }
                                    onClick={handleViewAttendance}
                                    className="btn btn-primary"
                                >
                                    View Attendance
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            {!isPosted &&
                selectedDate &&
                selectedSemester &&
                selectedSubject && (
                    <div>
                        <h5>
                            Student list{" "}
                            <small>
                                (Please tick the checkbox for present)
                            </small>
                        </h5>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>S. No</th>
                                    <th>Student name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((std, index) => {
                                    return (
                                        <tr key={index}>
                                            <td> {index + 1} </td>
                                            <td> {std.name} </td>
                                            <td>
                                                <div className="form-group">
                                                    <input
                                                        onChange={handleCheck}
                                                        type="checkbox"
                                                        name={std.name}
                                                        id={std._id}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            {!isPosted &&
                selectedSemester &&
                selectedDate &&
                selectedSubject && (
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Post Attendance
                    </button>
                )}
            {isView && (
                <div style={{ textAlign: "center" }}>
                    <h5>Attendance Report</h5>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>S. No</th>
                                <th>Student Name</th>
                                <th>Is Present</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewAttendance.map((att, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{att.name}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={att.present}
                                                name=""
                                                id=""
                                                readOnly
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
