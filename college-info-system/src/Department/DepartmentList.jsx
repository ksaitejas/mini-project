import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TreeView from 'react-treeview';
import 'react-treeview/react-treeview.css';
import "./DepartmentList.css";
import "bootstrap/dist/css/bootstrap.min.css";


function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://localhost:9000/departments");
        const data = await response.json();
        setDepartments(data);
        console.log(data);
      } catch( error) {
        console.error(error);
      }
    }
    fetchDepartments();
  }, []);

  const renderSubjects = (subjects) => {
    return subjects.map(subject => (
      <div key={subject._id}>
        {subject.name}
      </div>
    ));
  }

  const renderSemesters = (semesters) => {
    return semesters.map(semester => (
      <TreeView
        key={semester._id}
        nodeLabel={"semester " + semester.no}
        defaultCollapsed={true}
      >
        {renderSubjects(semester.subjects)}
      </TreeView>
    ));
  }

  const renderDepartments = () => {
    return departments.map(department => (
      <TreeView
        key={department._id}
        nodeLabel={department.name}
        defaultCollapsed={true}
      >
        {renderSemesters(department.semesters)}
      </TreeView>
    ));
  }

  return (
    <div>
      <h1>Department List</h1>
      {renderDepartments()}
    </div>
  );
}

export default DepartmentList;
