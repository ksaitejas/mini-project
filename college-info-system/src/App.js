import "./App.css";
import LoginForm from "./login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FacultyHome from "./Faculty/FacultyHome";
import StudentList from "./Student/StudentList";
import RegisterStudent from "./Student/RegisterStudent";
import StudentHome from "./Student/StudentHome";
import AdminHome from "./Admin/AdminHome";
import RegisterFaculty from "./Faculty/RegisterFaculty";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import DepartmentList from "./Department/DepartmentList";
import AddMarks from "./Faculty/AddMarks";
import ViewMarks from "./Student/ViewMarks";
import ViewAttendance from "./Student/ViewAttendance";
import AddAttendance from "./Faculty/AddAttendance";
import Certificate from "./certificate"
function App() {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Header />
            <Routes>
                <Route exact path="/" element={<LoginForm />} />
                <Route path="register-student" element={<RegisterStudent />} />
                <Route path="register-faculty" element={<RegisterFaculty />} />
                <Route path="certificate" element={<Certificate />} />

                <Route path="faculty-home" element={<FacultyHome />}>
                    <Route path="student-list" element={<StudentList />} />
                    <Route
                        path="department-list"
                        element={<DepartmentList />}
                    />
                    <Route path="add-marks/:id" element={<AddMarks />} />
                    <Route path="view-marks/:id" element={<ViewMarks />} />
                    <Route path="add-attendace" element={<AddAttendance />} />
                </Route>
                <Route path="student-home" element={<StudentHome />}>
                    <Route path="view-marks/:id" element={<ViewMarks />} />
                    <Route path="view-attendance/:id" element={<ViewAttendance />} />
                </Route>
                <Route path="admin-home" element={<AdminHome />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
