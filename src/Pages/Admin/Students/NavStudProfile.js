import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Barangay } from "../../../Pages/Admin/Admission/Barangay";
import Loader from "../../../Components/Loader/Loader";

const NavStudProfile = (props) => {
  const [students, setStudents] = useState([]);
  const [loader, setLoader] = useState(false);
  const [gradeLevel, setGradeLevel] = useState([]);

  const updateSubmit = () => {
    setLoader(true);
    Axios.put(`https://ecplc2021.herokuapp.com/update/user/${props.id}`, {
      barangay: students.barangay,
      birthday: students.birthday,
      city: students.city,
      email: students.email,
      firstname: students.firstname,
      gender: students.gender,
      home: students.home,
      idNumber: students.idNumber,
      lastname: students.lastname,
      middlename: students.middlename,
      parentContact: students.parentContact,
      parentEmail: students.parentEmail,
      parentFirstname: students.parentFirstname,
      parentLastname: students.parentLastname,
      parentMiddlename: students.parentMiddlename,
      relation: students.relation,
      street: students.street,
      work: students.work,
      year: students.year,
      contact: students.contact,
    }).then((response) => {
      if (response.data.err) {
        props.setMessage(response.data.err);
        setLoader(false);
      } else {
        setLoader(false);
        props.setMessage(response.data.success);
        props.setInitial([]);
        setTimeout(() => props.setMessage(""), 5000);
      }
    });
  };
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get(`https://ecplc2021.herokuapp.com/student/${props.id}`).then(
      (response) => {
        let e = response.data;
        console.log(e);
        setStudents({
          barangay: e.barangay,
          birthday: e.birthday,
          city: e.city,
          email: e.email,
          firstname: e.firstname,
          gender: e.gender,
          home: e.home,
          idNumber: e.idNumber,
          lastname: e.lastname,
          middlename: e.middlename,
          parentContact: e.parent.parentContact,
          parentEmail: e.parent.parentEmail,
          parentFirstname: e.parent.parentFirstname,
          parentLastname: e.parent.parentLastname,
          parentMiddlename: e.parent.parentMiddlename,
          relation: e.parent.relation,
          street: e.street,
          work: e.work,
          year: e.year,
          contact: e.contact,
        });
      }
    );
  }, []);

  useEffect(() => {
    Axios.get("https://ecplc2021.herokuapp.com/year/create").then(
      (response) => {
        if (response.data.length === 0) {
          setGradeLevel([]);
        } else {
          setGradeLevel(response.data);
        }
      }
    );
  }, []);

  return (
    <>
      {loader && <Loader />}
      <div className="user-nav-wrapper">
        <div className="user-nav-wrapper-profile-body">
          <div className="personal-info-body">
            <div className="user-nav-wrapper-sub-header">
              Personal Infomation
            </div>
            <div className="admission-div-user-id">
              <label>Student I.D *</label>
              <div className="user-id-div-input">
                <input value={students.idNumber} type="text" />
              </div>
            </div>

            <div className="admission-div">
              <label>
                Grade <div>*</div>
              </label>
              <select
                value={students.year}
                onChange={(e) => {
                  let value = e.target.value;
                  setStudents({
                    barangay: students.barangay,
                    birthday: students.birthday,
                    city: students.city,
                    email: students.email,
                    firstname: students.firstname,
                    gender: students.gender,
                    home: students.home,
                    idNumber: students.idNumber,
                    lastname: students.lastname,
                    middlename: students.middlename,
                    parentContact: students.parentContact,
                    parentEmail: students.parentEmail,
                    parentFirstname: students.parentFirstname,
                    parentLastname: students.parentLastname,
                    parentMiddlename: students.parentMiddlename,
                    relation: students.relation,
                    street: students.street,
                    work: students.work,
                    year: value,
                    contact: students.contact,
                  });
                }}
              >
                <option disabled>Select Option</option>
                {gradeLevel.map((value) => {
                  return (
                    <option key={value._id} value={value._id}>
                      {value._id}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="multi-admission-div">
              <div className="one-multi-admission-div">
                <label>
                  Last Name <div>*</div>
                </label>
                <input
                  value={students.lastname}
                  onChange={(e) => {
                    let value = e.target.value;
                    setStudents({
                      barangay: students.barangay,
                      birthday: students.birthday,
                      city: students.city,
                      email: students.email,
                      firstname: students.firstname,
                      gender: students.gender,
                      home: students.home,
                      idNumber: students.idNumber,
                      lastname: value,
                      middlename: students.middlename,
                      parentContact: students.parentContact,
                      parentEmail: students.parentEmail,
                      parentFirstname: students.parentFirstname,
                      parentLastname: students.parentLastname,
                      parentMiddlename: students.parentMiddlename,
                      relation: students.relation,
                      street: students.street,
                      work: students.work,
                      year: students.year,
                      contact: students.contact,
                    });
                  }}
                  type="text"
                />
              </div>
              <div className="two-multi-admission-div">
                <label>
                  First Name <div>*</div>
                </label>
                <input
                  onChange={(e) => {
                    let value = e.target.value;
                    setStudents({
                      barangay: students.barangay,
                      birthday: students.birthday,
                      city: students.city,
                      email: students.email,
                      firstname: value,
                      gender: students.gender,
                      home: students.home,
                      idNumber: students.idNumber,
                      lastname: students.lastname,
                      middlename: students.middlename,
                      parentContact: students.parentContact,
                      parentEmail: students.parentEmail,
                      parentFirstname: students.parentFirstname,
                      parentLastname: students.parentLastname,
                      parentMiddlename: students.parentMiddlename,
                      relation: students.relation,
                      street: students.street,
                      work: students.work,
                      year: students.year,
                      contact: students.contact,
                    });
                  }}
                  value={students.firstname}
                  type="text"
                />
              </div>
              <div className="three-multi-admission-div">
                <label>M.I.</label>
                <input
                  value={students.middlename}
                  onChange={(e) => {
                    let value = e.target.value;
                    setStudents({
                      barangay: students.barangay,
                      birthday: students.birthday,
                      city: students.city,
                      email: students.email,
                      firstname: students.firstname,
                      gender: students.gender,
                      home: students.home,
                      idNumber: students.idNumber,
                      lastname: students.lastname,
                      middlename: value,
                      parentContact: students.parentContact,
                      parentEmail: students.parentEmail,
                      parentFirstname: students.parentFirstname,
                      parentLastname: students.parentLastname,
                      parentMiddlename: students.parentMiddlename,
                      relation: students.relation,
                      street: students.street,
                      work: students.work,
                      year: students.year,
                      contact: students.contact,
                    });
                  }}
                  type="text"
                />
              </div>
            </div>

            <div className="admission-div">
              <label>Gender *</label>
              <div className="gender-radio-btn">
                <div>
                  <input
                    checked={students.gender === "Male"}
                    value="Male"
                    onChange={(e) => {
                      let value = e.target.value;
                      setStudents({
                        barangay: students.barangay,
                        birthday: students.birthday,
                        city: students.city,
                        email: students.email,
                        firstname: students.firstname,
                        gender: value,
                        home: students.home,
                        idNumber: students.idNumber,
                        lastname: students.lastname,
                        middlename: students.middlename,
                        parentContact: students.parentContact,
                        parentEmail: students.parentEmail,
                        parentFirstname: students.parentFirstname,
                        parentLastname: students.parentLastname,
                        parentMiddlename: students.parentMiddlename,
                        relation: students.relation,
                        street: students.street,
                        work: students.work,
                        year: students.year,
                        contact: students.contact,
                      });
                    }}
                    type="radio"
                  />
                  <label>Male</label>
                </div>

                <div>
                  <input
                    checked={students.gender === "Female"}
                    onChange={(e) => {
                      let value = e.target.value;
                      setStudents({
                        barangay: students.barangay,
                        birthday: students.birthday,
                        city: students.city,
                        email: students.email,
                        firstname: students.firstname,
                        gender: value,
                        home: students.home,
                        idNumber: students.idNumber,
                        lastname: students.lastname,
                        middlename: students.middlename,
                        parentContact: students.parentContact,
                        parentEmail: students.parentEmail,
                        parentFirstname: students.parentFirstname,
                        parentLastname: students.parentLastname,
                        parentMiddlename: students.parentMiddlename,
                        relation: students.relation,
                        street: students.street,
                        work: students.work,
                        year: students.year,
                        contact: students.contact,
                      });
                    }}
                    value="Female"
                    type="radio"
                  />
                  <label>Female</label>
                </div>
              </div>
            </div>

            <div className="admission-div">
              <label>
                Birth Date <div>*</div>
              </label>
              <input
                value={students.birthday}
                onChange={(e) => {
                  let value = e.target.value;
                  setStudents({
                    barangay: students.barangay,
                    birthday: value,
                    city: students.city,
                    email: students.email,
                    firstname: students.firstname,
                    gender: students.gender,
                    home: students.home,
                    idNumber: students.idNumber,
                    lastname: students.lastname,
                    middlename: students.middlename,
                    parentContact: students.parentContact,
                    parentEmail: students.parentEmail,
                    parentFirstname: students.parentFirstname,
                    parentLastname: students.parentLastname,
                    parentMiddlename: students.parentMiddlename,
                    relation: students.relation,
                    street: students.street,
                    work: students.work,
                    year: students.year,
                    contact: students.contact,
                  });
                }}
                type="date"
              />
            </div>
          </div>

          <div className="user-nav-wrapper-sub-header">Contact Address</div>

          <div className="personal-info-body">
            <div className="admission-div">
              <label>Street</label>
              <input
                value={students.street}
                onChange={(e) => {
                  let value = e.target.value;
                  setStudents({
                    barangay: students.barangay,
                    birthday: students.birthday,
                    city: students.city,
                    email: students.email,
                    firstname: students.firstname,
                    gender: students.gender,
                    home: students.home,
                    idNumber: students.idNumber,
                    lastname: students.lastname,
                    middlename: students.middlename,
                    parentContact: students.parentContact,
                    parentEmail: students.parentEmail,
                    parentFirstname: students.parentFirstname,
                    parentLastname: students.parentLastname,
                    parentMiddlename: students.parentMiddlename,
                    relation: students.relation,
                    street: value,
                    work: students.work,
                    year: students.year,
                    contact: students.contact,
                  });
                }}
                type="text"
              ></input>
            </div>

            <div className="dual-admission-div">
              <div className="dual-admission-div-div">
                <label>Brgy. *</label>
                <select
                  value={students.barangay}
                  onChange={(e) => {
                    let value = e.target.value;
                    setStudents({
                      barangay: value,
                      birthday: students.birthday,
                      city: students.city,
                      email: students.email,
                      firstname: students.firstname,
                      gender: students.gender,
                      home: students.home,
                      idNumber: students.idNumber,
                      lastname: students.lastname,
                      middlename: students.middlename,
                      parentContact: students.parentContact,
                      parentEmail: students.parentEmail,
                      parentFirstname: students.parentFirstname,
                      parentLastname: students.parentLastname,
                      parentMiddlename: students.parentMiddlename,
                      relation: students.relation,
                      street: students.street,
                      work: students.work,
                      year: students.year,
                      contact: students.contact,
                    });
                  }}
                >
                  {Barangay.map((e) => {
                    return <option value={e.name}>{e.name}</option>;
                  })}
                </select>
              </div>

              <div className="dual-admission-div-div">
                <label>
                  City <div>*</div>
                </label>
                <input
                  value={students.city}
                  onChange={(e) => {
                    let value = e.target.value;
                    setStudents({
                      barangay: students.barangay,
                      birthday: students.birthday,
                      city: value,
                      email: students.email,
                      firstname: students.firstname,
                      gender: students.gender,
                      home: students.home,
                      idNumber: students.idNumber,
                      lastname: students.lastname,
                      middlename: students.middlename,
                      parentContact: students.parentContact,
                      parentEmail: students.parentEmail,
                      parentFirstname: students.parentFirstname,
                      parentLastname: students.parentLastname,
                      parentMiddlename: students.parentMiddlename,
                      relation: students.relation,
                      street: students.street,
                      work: students.work,
                      year: students.year,
                      contact: students.contact,
                    });
                  }}
                  type="text"
                ></input>
              </div>
            </div>

            <div className="admission-div">
              <label>Email Address</label>
              <input
                value={students.email}
                onChange={(e) => {
                  let value = e.target.value;
                  setStudents({
                    barangay: students.barangay,
                    birthday: students.birthday,
                    city: students.city,
                    email: value,
                    firstname: students.firstname,
                    gender: students.gender,
                    home: students.home,
                    idNumber: students.idNumber,
                    lastname: students.lastname,
                    middlename: students.middlename,
                    parentContact: students.parentContact,
                    parentEmail: students.parentEmail,
                    parentFirstname: students.parentFirstname,
                    parentLastname: students.parentLastname,
                    parentMiddlename: students.parentMiddlename,
                    relation: students.relation,
                    street: students.street,
                    work: students.work,
                    year: students.year,
                    contact: students.contact,
                  });
                }}
                type="text"
                placeholder="Optional"
              />
            </div>

            <div className="admission-div">
              <label>Contact No.</label>

              <input
                value={students.contact}
                onChange={(e) => {
                  let value = e.target.value;
                  setStudents({
                    barangay: students.barangay,
                    birthday: students.birthday,
                    city: students.city,
                    email: students.email,
                    firstname: students.firstname,
                    gender: students.gender,
                    home: students.home,
                    idNumber: students.idNumber,
                    lastname: students.lastname,
                    middlename: students.middlename,
                    parentContact: students.parentContact,
                    parentEmail: students.parentEmail,
                    parentFirstname: students.parentFirstname,
                    parentLastname: students.parentLastname,
                    parentMiddlename: students.parentMiddlename,
                    relation: students.relation,
                    street: students.street,
                    work: students.work,
                    year: students.year,
                    contact: value,
                  });
                }}
                maxLength="14"
                type="text"
                placeholder="0987 6543 210 (Optional)"
              />
            </div>
          </div>

          <div className="user-nav-wrapper-sub-header">Parent Infomation</div>

          <div className="personal-info-body">
            <div className="multi-admission-div">
              <div className="one-multi-admission-div">
                <label>
                  Last Name <div>*</div>
                </label>
                <input
                  value={students.parentLastname}
                  onChange={(e) => {
                    let value = e.target.value;
                    setStudents({
                      barangay: students.barangay,
                      birthday: students.birthday,
                      city: students.city,
                      email: students.email,
                      firstname: students.firstname,
                      gender: students.gender,
                      home: students.home,
                      idNumber: students.idNumber,
                      lastname: students.lastname,
                      middlename: students.middlename,
                      parentContact: students.parentContact,
                      parentEmail: students.parentEmail,
                      parentFirstname: students.parentFirstname,
                      parentLastname: value,
                      parentMiddlename: students.parentMiddlename,
                      relation: students.relation,
                      street: students.street,
                      work: students.work,
                      year: students.year,
                      contact: students.contact,
                    });
                  }}
                  type="text"
                />
              </div>
              <div className="two-multi-admission-div">
                <label>
                  First Name <div>*</div>
                </label>
                <input
                  value={students.parentFirstname}
                  onChange={(e) => {
                    let value = e.target.value;
                    setStudents({
                      barangay: students.barangay,
                      birthday: students.birthday,
                      city: students.city,
                      email: students.email,
                      firstname: students.firstname,
                      gender: students.gender,
                      home: students.home,
                      idNumber: students.idNumber,
                      lastname: students.lastname,
                      middlename: students.middlename,
                      parentContact: students.parentContact,
                      parentEmail: students.parentEmail,
                      parentFirstname: value,
                      parentLastname: students.parentLastname,
                      parentMiddlename: students.parentMiddlename,
                      relation: students.relation,
                      street: students.street,
                      work: students.work,
                      year: students.year,
                      contact: students.contact,
                    });
                  }}
                  type="text"
                />
              </div>
              <div className="three-multi-admission-div">
                <label>M.I.</label>
                <input
                  value={students.parentMiddlename}
                  onChange={(e) => {
                    let value = e.target.value;
                    setStudents({
                      barangay: students.barangay,
                      birthday: students.birthday,
                      city: students.city,
                      email: students.email,
                      firstname: students.firstname,
                      gender: students.gender,
                      home: students.home,
                      idNumber: students.idNumber,
                      lastname: students.lastname,
                      middlename: students.middlename,
                      parentContact: students.parentContact,
                      parentEmail: students.parentEmail,
                      parentFirstname: students.parentFirstname,
                      parentLastname: students.parentLastname,
                      parentMiddlename: value,
                      relation: students.relation,
                      street: students.street,
                      work: students.work,
                      year: students.year,
                      contact: students.contact,
                    });
                  }}
                  type="text"
                />
              </div>
            </div>

            <div className="admission-div">
              <label>
                Relation<div>*</div>
              </label>
              <select
                value={students.relation}
                onChange={(e) => {
                  let value = e.target.value;
                  setStudents({
                    barangay: students.barangay,
                    birthday: students.birthday,
                    city: students.city,
                    email: students.email,
                    firstname: students.firstname,
                    gender: students.gender,
                    home: students.home,
                    idNumber: students.idNumber,
                    lastname: students.lastname,
                    middlename: students.middlename,
                    parentContact: students.parentContact,
                    parentEmail: students.parentEmail,
                    parentFirstname: students.parentFirstname,
                    parentLastname: students.parentLastname,
                    parentMiddlename: students.parentMiddlename,
                    relation: value,
                    street: students.street,
                    work: students.work,
                    year: students.year,
                    contact: students.contact,
                  });
                }}
              >
                <option disabled>Select Option</option>
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Grand Mother">Grand Mother</option>
                <option value="Grand Father">Grand Father</option>
                <option value="Aunt">Aunt</option>
                <option value="Uncle">Uncle</option>
                <option value="Older Brother">Older Brother</option>
                <option value="Older Sister">Older Sister</option>
                <option value="Cousin">Cousin</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="admission-div">
              <label>
                Email Address <div>*</div>
              </label>
              <input
                value={students.parentEmail}
                onChange={(e) => {
                  let value = e.target.value;
                  setStudents({
                    barangay: students.barangay,
                    birthday: students.birthday,
                    city: students.city,
                    email: students.email,
                    firstname: students.firstname,
                    gender: students.gender,
                    home: students.home,
                    idNumber: students.idNumber,
                    lastname: students.lastname,
                    middlename: students.middlename,
                    parentContact: students.parentContact,
                    parentEmail: value,
                    parentFirstname: students.parentFirstname,
                    parentLastname: students.parentLastname,
                    parentMiddlename: students.parentMiddlename,
                    relation: students.relation,
                    street: students.street,
                    work: students.work,
                    year: students.year,
                    contact: students.contact,
                  });
                }}
                placeholder="parent@email.com (Required)"
                type="text"
              />
            </div>

            <div className="admission-div">
              <label>
                Contact No.<div>*</div>
              </label>
              <input
                value={students.parentContact}
                onChange={(e) => {
                  let value = e.target.value;
                  setStudents({
                    barangay: students.barangay,
                    birthday: students.birthday,
                    city: students.city,
                    email: students.email,
                    firstname: students.firstname,
                    gender: students.gender,
                    home: students.home,
                    idNumber: students.idNumber,
                    lastname: students.lastname,
                    middlename: students.middlename,
                    parentContact: value,
                    parentEmail: students.parentEmail,
                    parentFirstname: students.parentFirstname,
                    parentLastname: students.parentLastname,
                    parentMiddlename: students.parentMiddlename,
                    relation: students.relation,
                    street: students.street,
                    work: students.work,
                    year: students.year,
                    contact: students.contact,
                  });
                }}
                placeholder="0987 6543 210 (Required)"
                type="text"
              />
            </div>

            <div className="label-div">
              <h4>Other contact no.</h4>
            </div>

            <div className="dual-admission-div">
              <div className="dual-admission-div-div">
                <label>Home no.</label>
                <input
                  value={students.home}
                  onChange={(e) => {
                    let value = e.target.value;
                    setStudents({
                      barangay: students.barangay,
                      birthday: students.birthday,
                      city: students.city,
                      email: students.email,
                      firstname: students.firstname,
                      gender: students.gender,
                      home: value,
                      idNumber: students.idNumber,
                      lastname: students.lastname,
                      middlename: students.middlename,
                      parentContact: students.parentContact,
                      parentEmail: students.parentEmail,
                      parentFirstname: students.parentFirstname,
                      parentLastname: students.parentLastname,
                      parentMiddlename: students.parentMiddlename,
                      relation: students.relation,
                      street: students.street,
                      work: students.work,
                      year: students.year,
                      contact: students.contact,
                    });
                  }}
                  type="text"
                />
              </div>

              <div className="dual-admission-div-div">
                <label>Work no.</label>
                <input
                  value={students.work}
                  onChange={(e) => {
                    let value = e.target.value;
                    setStudents({
                      barangay: students.barangay,
                      birthday: students.birthday,
                      city: students.city,
                      email: students.email,
                      firstname: students.firstname,
                      gender: students.gender,
                      home: students.home,
                      idNumber: students.idNumber,
                      lastname: students.lastname,
                      middlename: students.middlename,
                      parentContact: students.parentContact,
                      parentEmail: students.parentEmail,
                      parentFirstname: students.parentFirstname,
                      parentLastname: students.parentLastname,
                      parentMiddlename: students.parentMiddlename,
                      relation: students.relation,
                      street: students.street,
                      work: value,
                      year: students.year,
                      contact: students.contact,
                    });
                  }}
                  type="text"
                ></input>
              </div>
            </div>
          </div>

          <div className="update-user-profile-submit">
            <input onClick={updateSubmit} type="submit" value="Update" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavStudProfile;
