import React, { useEffect, useState, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import "./Class.css";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import Axios from "axios";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import Loader from "../../../Components/Loader/Loader";

const Class = (props) => {
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
  }, [props.initial]);

  const [teachers, setTeachers] = useState([]);
  const [activeClass, setActiveClass] = useState(0);
  const [archivedClass, setArchivedClass] = useState(0);

  const [showCreate, setShowCreate] = useState(false);

  const { loginRole, valueClassroom } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const [activeArch, setActiveArch] = useState(false);

  const [classroom, setClassroom] = valueClassroom;
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    Axios.get("https://ecplc2021.herokuapp.com/class/populate-teacher").then(
      (response) => {
        if (response.data.length === 0) {
          setClassroom([]);
        } else {
          setClassroom(response.data);
        }
      }
    );
  }, [props.initial]);

  useEffect(() => {
    Axios.get("https://ecplc2021.herokuapp.com/class/class-active").then(
      (response) => {
        if (response.data.length === 0) {
          setActiveClass(0);
        } else {
          setActiveClass(response.data);
        }
      }
    );
  }, [props.initial]);

  useEffect(() => {
    Axios.get("https://ecplc2021.herokuapp.com/class/class-archived").then(
      (response) => {
        if (response.data.length === 0) {
          setArchivedClass(0);
        } else {
          setArchivedClass(response.data);
        }
      }
    );
  }, []);

  const makeFalse = () => {
    setShowCreate(false);
    setErrMsg("");
  };

  let date = new Date();
  let getDate = date.getFullYear();
  let nextDate = date.getFullYear() + 1;
  let years = getDate + "-" + nextDate.toString().replace(/^.{2}/g, "");

  const [className, setClassName] = useState("");
  const [classCapacity, setClassCapacity] = useState("");
  const [classYear, setClassYear] = useState("");
  const [classAdviser, setClassAdviser] = useState("");
  const [section, setSection] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const submitCreate = () => {
    setLoader(true);
    Axios.post("https://ecplc2021.herokuapp.com/class/create-class", {
      className: classYear + "-" + section,
      years: years,
      classCapacity: classCapacity,
      section: section,
      classAdviser: classAdviser,
      classYear: classYear,
    }).then((response) => {
      if (response.data.err) {
        setErrMsg(response.data.err);
        setLoader(false);
      } else if (response.data.success) {
        setClassName("");
        setClassCapacity("");
        setClassYear("");
        setClassAdviser("");
        setSection("");
        setErrMsg(response.data.success);
        setTimeout(() => setErrMsg(""), 5000);
        setShowCreate(false);
        setLoader(false);
        props.setInitial([]);
      }
    });
  };

  return (
    <>
      {loader && <Loader />}
      {role !== "Admin" ? (
        <BrokenPage />
      ) : (
        <div className="classs-wrapper">
          <div
            className={
              errMsg === ""
                ? "hidden"
                : errMsg !== "Successfully created."
                ? "hidden"
                : "classs-wrapper-after"
            }
          >
            {errMsg}
          </div>
          {showCreate ? (
            <>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="create-subject-form"
              >
                <div className="create-subject-form-header">
                  <h3>Create Class</h3>
                </div>
                <div className="create-subject-form-body">
                  <div
                    className={
                      errMsg === ""
                        ? "class-error-message"
                        : errMsg === "Successfully created."
                        ? "hidden"
                        : "class-error-message-red"
                    }
                  >
                    {errMsg}
                  </div>

                  <div className="create-class-div">
                    <label>Class Name</label>
                    <input
                      readOnly
                      value={classYear + " - " + section}
                      type="text"
                    ></input>
                  </div>

                  <div className="create-class-div">
                    <label>Grade Year</label>
                    <select
                      onChange={(e) => setClassYear(e.target.value)}
                      value={classYear}
                    >
                      <option disabled value="">
                        Select Option
                      </option>
                      <option value="Kinder 1">Kinder 1</option>
                      <option value="Kinder 2">Kinder 2</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 3">Grade 3</option>
                      <option value="Grade 4">Grade 4</option>
                      <option value="Grade 5">Grade 5</option>
                      <option value="Grade 6">Grade 6</option>
                    </select>
                  </div>

                  <div className="create-class-div">
                    <label>Section</label>
                    <input
                      onChange={(e) => setSection(e.target.value)}
                      value={section}
                      type="text"
                    ></input>
                  </div>

                  <div className="create-class-div">
                    <label>Size</label>
                    <input
                      onChange={(e) => setClassCapacity(e.target.value)}
                      value={classCapacity}
                      type="number"
                      min="1"
                      max="40"
                    ></input>
                  </div>

                  <div className="create-class-div">
                    <label>Class Adviser</label>
                    <select
                      onChange={(e) => setClassAdviser(e.target.value)}
                      value={classAdviser}
                    >
                      <option disabled value="">
                        Select Option
                      </option>
                      {teachers.map((value, key) => {
                        return (
                          <option key={key} value={value._id}>
                            {value.firstname + " " + value.lastname}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="create-class-div-submit">
                    <input
                      onClick={makeFalse}
                      type="button"
                      className="create-class-reset-btn"
                      value="Cancel"
                    />
                    <input
                      onClick={submitCreate}
                      type="submit"
                      className="create-class-create-btn"
                      value="Create"
                    />
                  </div>
                </div>
              </form>
            </>
          ) : (
            ""
          )}
          <Dashboard />
          <div
            onClick={() => setShowCreate(!showCreate)}
            className={showCreate ? "classs-wrapper-active" : ""}
          ></div>
          <div className="classs-content">
            <DashboardHeader />
            <div className="students-content-lists-body-header">
              <div className="div-class-search">
                <i className="fas fa-search"></i>
                <input type="search" placeholder="Search for a Class"></input>
              </div>
              <div className="div-class-active">
                <span
                  className={
                    activeArch === false
                      ? "class-actual-body-header-1-active"
                      : "class-actual-body-header-1"
                  }
                >
                  Active
                </span>
                <span
                  className={
                    activeArch === true
                      ? "class-actual-body-header-2-active"
                      : "class-actual-body-header-1"
                  }
                >
                  Archive
                </span>
              </div>
              <span
                onClick={() => setShowCreate(true)}
                className="add-class-button"
              >
                Create
              </span>
            </div>
            <div className="class-actual-body">
              {activeArch === false ? (
                <div className="class-actual-body-active">
                  <div className="class-actual-body-active-header">
                    <div className="class-actual-body-active-year">S.Y</div>
                    <div className="class-actual-body-active-name">
                      Class name
                    </div>

                    <div className="class-actual-body-active-capacity">
                      Section
                    </div>
                    <div className="class-actual-body-active-adviser">
                      Class adviser
                    </div>
                    <div className="class-actual-body-active-capacity">
                      Size
                    </div>
                    <div className="class-actual-body-active-action">
                      Action
                    </div>
                  </div>
                  {classroom.length === 0 ? (
                    ""
                  ) : (
                    <>
                      {classroom.map((key) => {
                        return (
                          <div
                            key={key._id}
                            className="class-actual-body-active-body"
                          >
                            <div className="class-actual-body-active-year">
                              {key.years}
                            </div>
                            <div className="class-actual-body-active-name">
                              {key.className}
                            </div>
                            <div className="class-actual-body-active-capacity">
                              {key.section}
                            </div>
                            <div className="class-actual-body-active-adviser">
                              {key.adviser_id.firstname +
                                " " +
                                key.adviser_id.lastname}
                            </div>
                            <div className="class-actual-body-active-capacity">
                              {key.capacity}
                            </div>
                            <div className="class-actual-body-active-action">
                              <Link
                                className="router"
                                to={"/admin/class/edit/" + key._id}
                              >
                                <i className="fas fa-pen"></i>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              ) : (
                <div className="class-actual-body-archive">
                  {archivedClass === 0 ? (
                    <p>There is no archived class.</p>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
            <p></p>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(Class);
