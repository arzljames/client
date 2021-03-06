import React, { useContext, useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import "../Students/Students.css";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import Axios from "axios";

const Teachers = () => {
  const [showExport, setShowExport] = useState(false);
  const { loginRole, valueTeachers } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const [teachers, setTeachers] = valueTeachers;

  useEffect(() => {
    Axios.get("https://ecplc2021.herokuapp.com/teacher-list").then(
      (response) => {
        if (response.data.length === 0) {
          setTeachers([]);
        } else {
          setTeachers(response.data);
        }
      }
    );
  }, []);

  return (
    <>
      {role !== "Admin" ? (
        <BrokenPage />
      ) : (
        <div className="students-wrapper">
          <Dashboard />
          <div className="students-content">
            <DashboardHeader />
            <div className="students-content-lists-body-header">
              <div className="div-class-search">
                <i class="fas fa-search"></i>
                <input type="search" placeholder="Search for a teacher"></input>
              </div>
              <div className="add-student-span-wrapper">
                <span
                  onClick={() => setShowExport(!showExport)}
                  className="add-students-span-two"
                >
                  Export <i class="fas fa-caret-square-down"></i>
                  <ul
                    className={
                      showExport ? "add-students-span-two-after" : "hidinger"
                    }
                  >
                    <li>.CSV</li>
                    <li>.pdf</li>
                    <li>.docx</li>
                  </ul>
                </span>
              </div>
            </div>
            <div className="students-content-lists-body">
              <div className="student-list-header">
                <div className="student-list-id">Teacher ID</div>
                <div className="student-list-name">Name</div>

                <div className="student-list-gradelevel">Gender</div>
                <div className="student-list-action">Action</div>
              </div>
              {teachers.map((value, key) => {
                return (
                  <>
                    <div key={value.username} className="student-list-body">
                      <div className="student-list-id-span">
                        {value.username}
                      </div>
                      <div className="student-list-name-span">
                        {value.fullname}
                      </div>
                      <div className="student-list-gradelevel-span">
                        {value.gender}
                      </div>
                      <div className="student-list-action-span">
                        <Link
                          className="student-list-action-link"
                          to={"/admin/edit-user/" + value._id}
                        >
                          <i className="fas fa-pen"></i>
                        </Link>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(Teachers);
