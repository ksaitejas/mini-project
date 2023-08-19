import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function StudentHome() {
    const [id, setId] = useState("");
    useEffect(() => {
        let id = Cookies.get("id");
        setId(id);
    }, []);
    return (
        <div class="container">
            <div className="navbar">
                <Link
                    className="btn btn-primary"
                    to={`/student-home/view-marks/${id}`}
                >
                    View Marks
                </Link>
                {/* <Link
                    className="btn btn-primary"
                    to={`/student-home/view-attendance/${id}`}
                >
                    View Attendance
                </Link> */}
            </div>
            <Outlet />
        </div>
    );
}
