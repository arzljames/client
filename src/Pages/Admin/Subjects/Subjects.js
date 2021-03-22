import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./Subjects.css";
import Axios from "axios";
import { SchoolYearContext } from "../../../ContextFiles/SchoolYearContext";

const Subjects = () => {
  const [subjectList, setSubjectList] = useState("");
  const [showForm, setShowForm] = useState(false);

  const addSubject = () => {
    Axios.post("http://localhost:3001/add-subject");
  };
  return (
    <>
      <div className="subject-wrapper">
        {showForm ? (
          <>
            <form className="add-subject-form">
              <div className="add-subject-form-header">
                <h2>Add Subject</h2>
              </div>
              <div className="add-subject-form-body">
                <div className="add-subject-input">
                  <div className="add-subject-left">
                    <label>Subject Code *</label>
                  </div>
                  <div className="add-subject-right">
                    <input type="text" className="subject-code" />
                  </div>
                </div>

                <div className="add-subject-input">
                  <div className="add-subject-left">
                    <label>Subject *</label>
                  </div>
                  <div className="add-subject-right">
                    <input type="text" className="subject-name" />
                  </div>
                </div>

                <div className="add-subject-textarea">
                  <div className="add-subject-left-textarea">
                    <label>Description *</label>
                  </div>
                  <div className="add-subject-right">
                    <textarea type="text" className="subject-description" />
                  </div>
                </div>

                <div className="add-subject-input">
                  <div className="add-subject-left">
                    <label>Year *</label>
                  </div>
                  <div className="add-subject-right">
                    <input type="text" className="subject-year" />
                  </div>
                </div>

                <div className="add-subject-input">
                  <div className="add-subject-left">
                    <label>Capacity *</label>
                  </div>
                  <div className="add-subject-right">
                    <input type="text" className="subject-capacity" />
                  </div>
                </div>
                <input
                  type="submit"
                  className="add-subject-submit"
                  value="Submit"
                />
              </div>
            </form>
          </>
        ) : null}
        <Dashboard />
        <div
          onClick={() => setShowForm(!showForm)}
          className={showForm ? "subject-wrapper-active" : ""}
        ></div>
        <div className="subject-content">
          <DashboardHeader />
          <div className="subject-content-body">
            <div className="subject-content-body-header">
              <p>List of Subjects</p>
            </div>
            <div className="subject-content-body-body">
              <div className="subject-content-body-body-header">
                <input
                  type="search"
                  className="subject-content-search"
                  placeholder="Type to Search"
                />
                <span
                  onClick={() => setShowForm(true)}
                  className="add-subject-span"
                >
                  <i class="fas fa-plus"></i>Add Subject
                </span>
              </div>
              <div className="subject-lists-header">
                <div className="subject-lists-code">Subject Code</div>
                <div className="subject-lists-name">Subject</div>
                <div className="subject-lists-capacity">Student capacity</div>
                <div className="subject-lists-action">Action</div>
              </div>
              <div
                className={
                  subjectList === ""
                    ? "subject-lists-empty"
                    : "subject-lists-wrapper"
                }
              >
                {subjectList === "" ? (
                  <p>There is currently no subject.</p>
                ) : (
                  "Have"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Subjects);
