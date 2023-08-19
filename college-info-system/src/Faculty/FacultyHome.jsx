import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function FacultyHome() {
    return (
        <div class="container">
            <div className="navbar">
                <Link
                    className="btn btn-primary"
                    to="/faculty-home/student-list"
                >
                    Students List
                </Link>
                {/* <Link
                    className="btn btn-primary"
                    to="/faculty-home/add-attendace"
                >
                    Add attendance
                </Link> */}
                <Link
                    className="btn btn-primary"
                    to="/faculty-home/department-list"
                >
                    Departments
                </Link>
            </div>
            <Outlet />
        </div>
    );
}

export default FacultyHome;
