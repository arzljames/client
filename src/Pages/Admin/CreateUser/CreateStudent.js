import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./CreateUser.css";
import Axios from "axios";

const CreateStudent = (props) => {
  const submitStudent = () => {
    Axios.post("http://localhost:3001/register-student", {
      id: props.regStudent.id,
      year: props.regStudent.year,
      password: props.regStudent.password,
      rePassword: props.regStudent.rePassword,
      lastname: props.regStudent.lastname,
      firstname: props.regStudent.firstname,
      middlename: props.regStudent.middlename,
      fullname:
        props.regStudent.firstname +
        " " +
        props.regStudent.middlename[0] +
        "." +
        " " +
        props.regStudent.lastname,
    }).then((response) => {
      if (response.data.err) {
        setErrMsg(response.data.err);
      } else if (response.data.success) {
        setErrMsg(response.data.success);
        setTimeout(() => setErrMsg(""), 5000);
        props.setRegStudent({
          id: "",
          year: "",
          password: "",
          rePassword: "",
          lastname: "",
          firstname: "",
          middlename: "",
        });
        props.setStudents([
          ...props.students,
          {
            _id: props.regStudent.id,
            firstname: props.regStudent.firstname,
            middlename: props.regStudent.middlename,
            lastname: props.regStudent.lastname,
            fullname:
              props.regStudent.firstname +
              " " +
              props.regStudent.middlename[0] +
              "." +
              " " +
              props.regStudent.lastname,
            year: props.regStudent.year,
          },
        ]);
      }
    });
  };
  const [errMsg, setErrMsg] = useState("");

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="user-wrapper">
        <div
          className={
            errMsg === ""
              ? "error-prompt"
              : errMsg === "Successfully created account"
              ? "error-prompt-green"
              : "error-prompt-red"
          }
        >
          {errMsg}
        </div>
        <div className="left-right-wrapper">
          <div className="user-wrapper-left">
            <div>
              <label>Student ID *</label>
              <input
                type="text"
                value={props.regStudent.id}
                onChange={(e) => {
                  let value = e.target.value;
                  props.setRegStudent({
                    id: value,
                    userType: props.regStudent.userType,
                    year: props.regStudent.year,
                    password: props.regStudent.password,
                    rePassword: props.regStudent.rePassword,
                    lastname: props.regStudent.lastname,
                    firstname: props.regStudent.firstname,
                    middlename: props.regStudent.middlename,
                  });
                }}
              ></input>
            </div>

            <div>
              <label>Grade *</label>
              <select
                value={props.regStudent.year}
                onChange={(e) => {
                  let value = e.target.value;
                  props.setRegStudent({
                    id: props.regStudent.id,
                    userType: props.regStudent.userType,
                    year: value,
                    password: props.regStudent.password,
                    rePassword: props.regStudent.rePassword,
                    lastname: props.regStudent.lastname,
                    firstname: props.regStudent.firstname,
                    middlename: props.regStudent.middlename,
                  });
                }}
              >
                <option disabled value="">
                  - Select Option -
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

            <div>
              <label>Password *</label>
              <input
                type="text"
                value={props.regStudent.password}
                onChange={(e) => {
                  let value = e.target.value;
                  props.setRegStudent({
                    id: props.regStudent.id,
                    userType: props.regStudent.userType,
                    year: props.regStudent.year,
                    password: value,
                    rePassword: props.regStudent.rePassword,
                    lastname: props.regStudent.lastname,
                    firstname: props.regStudent.firstname,
                    middlename: props.regStudent.middlename,
                  });
                }}
              ></input>
            </div>

            <div>
              <label>Confirm Password *</label>
              <input
                type="text"
                value={props.regStudent.rePassword}
                onChange={(e) => {
                  let value = e.target.value;
                  props.setRegStudent({
                    id: props.regStudent.id,
                    userType: props.regStudent.userType,
                    year: props.regStudent.year,
                    password: props.regStudent.password,
                    rePassword: value,
                    lastname: props.regStudent.lastname,
                    firstname: props.regStudent.firstname,
                    middlename: props.regStudent.middlename,
                  });
                }}
              ></input>
            </div>
          </div>
          <div className="user-wrapper-right">
            <div>
              <label>Last Name *</label>
              <input
                type="text"
                value={props.regStudent.lastname}
                onChange={(e) => {
                  let value = e.target.value;
                  props.setRegStudent({
                    id: props.regStudent.id,
                    userType: props.regStudent.userType,
                    year: props.regStudent.year,
                    password: props.regStudent.password,
                    rePassword: props.regStudent.rePassword,
                    lastname: value,
                    firstname: props.regStudent.firstname,
                    middlename: props.regStudent.middlename,
                  });
                }}
              ></input>
            </div>

            <div>
              <label>First Name *</label>
              <input
                type="text"
                value={props.regStudent.firstname}
                onChange={(e) => {
                  let value = e.target.value;
                  props.setRegStudent({
                    id: props.regStudent.id,
                    userType: props.regStudent.userType,
                    year: props.regStudent.year,
                    password: props.regStudent.password,
                    rePassword: props.regStudent.rePassword,
                    lastname: props.regStudent.lastname,
                    firstname: value,
                    middlename: props.regStudent.middlename,
                  });
                }}
              ></input>
            </div>
            <div>
              <label>Middle Name *</label>
              <input
                type="text"
                value={props.regStudent.middlename}
                onChange={(e) => {
                  let value = e.target.value;
                  props.setRegStudent({
                    id: props.regStudent.id,
                    userType: props.regStudent.userType,
                    year: props.regStudent.year,
                    password: props.regStudent.password,
                    rePassword: props.regStudent.rePassword,
                    lastname: props.regStudent.lastname,
                    firstname: props.regStudent.firstname,
                    middlename: value,
                  });
                }}
              ></input>
            </div>

            <span>
              <input
                onClick={submitStudent}
                id="submit-btn"
                type="submit"
                value="Create"
              />
            </span>
          </div>
        </div>
      </form>
    </>
  );
};

export default withRouter(CreateStudent);
