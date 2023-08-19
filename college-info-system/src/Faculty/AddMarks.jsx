import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddMarks() {
    const { id } = useParams();
    const [departments, setDepartments] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [marks, setMarks] = useState({});
    const [credits, setCredits] = useState({});
    const [selectedSemester, setSelectedSemester] = useState("");
    const [faculty, setFaculty] = useState([]);
    const userId = Cookies.get("id");
    const role = Cookies.get("role");
    const [sgpa,setSgpa]=useState(0)
    const [cgpa,setCgpa]=useState(0)
    const containerStyle = {
        width: "40%",
    };
    const bold = {
        fontWeight: "bold",
    };

    const handleMarksChange = (event) => {
        const subject = event.target.name;
        const value = event.target.value;
        // console.log(subject +  value);
        setMarks({ ...marks, [subject]: value });
        // console.log(marks);
    };

    const handleCreditsChange = (event) => {
        const credit = event.target.name;
        const value = event.target.value;
        // console.log(subject +  value);
        setCredits({ ...credits, [credit]: value });
        // console.log(marks);
    };

    useEffect(() => {
        // console.log(id);
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
                console.log(data);
                setFaculty(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFaculty();
    }, []);

    const handleSemesterChange = (event) => {
        let semNo = event.target.value;
        if (semNo) {
            setSelectedSemester(semNo);
            let s = semesters.filter((sem) => {
                return sem.no === semNo;
            });
            // console.log(s[0].subjects);
            setSubjects(s[0].subjects);
        } else {
            toast.error("Please select the semester");
            setSubjects([]);
            setSelectedSemester("")
        }
    };

    const handleSubmit = async () => {
        console.log(selectedSemester);
        console.log(marks);
       console.log(credits)
       console.log(sgpa)
       console.log(cgpa)
       // console.log(id);
        let m = subjects.map((sub) => {
            if(sub.name==null || sub.name=="")
            sub.name=0
            return {
                name: sub.name,
                mark: marks[sub.name],
                credit:credits[`credit-${sub.name}`]
            };
        });
        try {
            const response = await axios.post("http://localhost:9000/marks", {
                studentId: id,
                sgpa:sgpa,
                cgpa:cgpa,
                semesters: [
                    {
                        no: selectedSemester,
                        marks: m,
                    },
                ],
            });
            toast.success(`Marks added for Semester ${selectedSemester}`);
            console.log(response.data);
            setMarks([]);
        } catch (error) {
            toast.error("Error in saving!");
            console.error(error);
        }
    };
    return (
        <div className="container" style={containerStyle}>
            <table className="table">
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
                                <option value="">--select semester--</option>
                                {semesters.map((sem, index) => {
                                    return (
                                        <option key={index} value={sem.no}>
                                            {sem.no}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </td>
                </tr>
            </table>
            {selectedSemester && (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Subject Name</th>
                            <th>Marks</th>
                            <th>Credits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject, index) => (
                            <tr key={index}>
                                <td>{subject.name}</td>
                                <td>
                                    <input
                                        disabled={
                                            !faculty.subjects.includes(
                                                subject.name
                                            )
                                        }
                                        type="text"
                                        name={subject.name}
                                        value={marks[subject]}
                                        onChange={handleMarksChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        disabled={
                                            !faculty.subjects.includes(
                                                subject.name
                                            )
                                        }
                                        type="text"
                                        name={`credit-${subject.name}`}
                                        value={credits[subject]}
                                        onChange={handleCreditsChange}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              

                
            )}
            {selectedSemester && (
                <div>
                  <span>SGPA : <input type="text" name="txtSGPA" value={sgpa} onChange={(e)=>setSgpa(e.target.value)}/></span>
                  <br />
                  <span>CGPA : <input type="text" name="txtCGPA" value={cgpa} onChange={(e)=>setCgpa(e.target.value)}/></span>
                  <br /><br />
                <button onClick={handleSubmit} className="btn btn-primary">
                    Submit
                </button>
                </div>
            )}
        </div>
    );
}
