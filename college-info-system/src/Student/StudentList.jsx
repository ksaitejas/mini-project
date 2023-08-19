import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function StudentList() {
    const [students, setStudents] = useState([]);
    const [deptName, setdeptName] = useState([]);

    var funSearch=()=>{
        getStudents(deptName.toUpperCase())
    }
    var getStudents=(dname)=>{
        const fetchStudents = async () => {
            var dtt=dname
            try {
                const response = await fetch(`http://localhost:9000/students/${dtt}`);
                const data = await response.json();
                setStudents(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStudents();
    }

    useEffect(() => {
        getStudents('0')
    }, []);

    return (
        <div class="container mt-4">
            <input type="text" class="form-control"
             placeholder="Department Name..."  
             onChange={(e)=>setdeptName(e.target.value)}
            />
            <input type="button" style={{marginTop:'10px'}} value="Search"
             class="btn btn-secondary" onClick={funSearch}/>
            <br />
            <h2>Students List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Mobile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student._id}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.department}</td>
                            <td> {student.mobile} </td>
                            <td>
                                <Link to={`../add-marks/${student._id}`} className="btn btn-primary">
                                    Add marks
                                </Link>
                            </td>
                            <td>
                                <Link to={`../view-marks/${student._id}`} className="btn btn-primary">
                                    View marks
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;
