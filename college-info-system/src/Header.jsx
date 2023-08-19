import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Header() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [role, setRole ] = useState("");

    useEffect(() => {
        let id = Cookies.get("id");
        let role = Cookies.get("role");
        setId(id);
        setRole(role);
    }, []);

    const handleLogout = () => {
        Cookies.remove("role");
        Cookies.remove("id");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="navbar-brand" style={{marginLeft:'20px'}}>Student Management System</div>
            {id && (
                <button className="btn btn-light" style={{marginRight:'20px'}} onClick={handleLogout}>
                    Log out
                </button>
            )}
        </nav>
    );
}
