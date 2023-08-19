import React, { useEffect, useState } from "react";

export default function ViewAttendance() {
    const [departments, setDepartments] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const bold = {
        fontWeight: "bold",
    };
    useEffect(() => {
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
    }, []);

    const handleSemesterChange = (event) => {
        let semNo = event.target.value;
        setSelectedSemester(semNo);
        let s = semesters.filter((sem) => {
            return sem.no === semNo;
        });
        // console.log(s[0].subjects);
        setSubjects(s[0].subjects);
    };

    const handleDateChange = (event) => {
        console.log(event.target.value);
        setSelectedDate(event.target.value);
    };

    const handleSubjectChange = (event) => {
        let subject = event.target.value;
        setSelectedSubject(subject);
    };
    
    const handleClick = event => {
      event.preventDefault();
      console.log(selectedSemester + " " + selectedDate + " " + selectedSubject);
    }
    return (
        <div>
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
                                        type="month"
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
                                                <option
                                                    value={sub.name}
                                                    key={index}
                                                >
                                                    {sub.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button onClick={handleClick} className="btn btn-primary">
                                    Get attendance
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
