import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";

/*Components */
import My404ErrorComponent from "./Components/My404Component/My404Component";
import NoPermisison from "./Components/My404Component/NoPermission";

//Public Pages
import HomePage from "./Pages/Portal/HomePage/HomePage";
import About from "./Pages/Portal/About/About";
import EnrollmentProcedure from "./Pages/Portal/Admission/EnrollmentProcedure";
import TuitionFess from "./Pages/Portal/Admission/TuitionFees";
import BoardTrustees from "./Pages/Portal/Administration/BoardTrustees";
import TeachersStaff from "./Pages/Portal/Administration/TeachersStaff";
import Contact from "./Pages/Portal/Contact/Contact";

//Login Page
import PortalLogin from "./Pages/PortalLogin/PortalLogin";

//Admin Components and Pages
import DashboardHome from "./Pages/Admin/DashboardHome/DashboardHome";
import Announcement from "./Pages/Admin/Announcement/Announcement";
import Classroom from "./Pages/Admin/Classroom/Class";
import CreateUser from "./Pages/Admin/CreateUser/CreateUser";
import Message from "./Pages/Admin/Message/Message";
import SchoolYear from "./Pages/Admin/SchoolYear/SchoolYear";
import Users from "./Pages/Admin/Users/Users";
import UserStudent from "./Pages/Admin/Users/UserStudent";
import UserTeacher from "./Pages/Admin/Users/UserTeacher";

//Context Files
import { DashboardStatus } from "./ContextFiles/DashboardContext";
import { LogoutState } from "./ContextFiles/LogoutContext";
import { LoginProvider } from "./ContextFiles/LoginContext";
import { CreateStudentState } from "./ContextFiles/CreateStudentContext";
import { StudentListProvider } from "./ContextFiles/StudentListContext";
import { SchoolYearState } from "./ContextFiles/SchoolYearContext";
import { CreateTeacherState } from "./ContextFiles/CreateTeacherContext";

//Protected Routes
import ProtectedAdmin from "./ProtectedRoutes/ProtectedAdmin";
import ProtectedTeacher from "./ProtectedRoutes/ProtectedTeacher";
import ProtectedStudent from "./ProtectedRoutes/ProtectedStudent";

//Teacher Pages
import TeacherProfile from "./Pages/Teacher/TeacherProfile/TeacherProfile";

//Student Pages
import StudentProfile from "./Pages/Student/StudentProfile/StudentProfile";

function App() {
  const [isAuth, setIsAuth] = useState(true);

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/user-login").then((response) => {
      if (
        response.data.loggedIn &&
        response.data.user[0].userType === "Admin"
      ) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  const [studentUser, setStudentUser] = useState([]);
  const [teacherUser, setTeacherUser] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/student-list").then((response) => {
      if (response.data) {
        setStudentUser(response.data);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/teacher-list").then((response) => {
      if (response.data) {
        setTeacherUser(response.data);
      }
    });
  }, []);
  return (
    <>
      <div className="app">
        <CreateTeacherState>
          <SchoolYearState>
            <StudentListProvider>
              <CreateStudentState>
                <LoginProvider>
                  <LogoutState>
                    <DashboardStatus>
                      <Router>
                        <Switch>
                          <Route
                            path="/access-denied"
                            exact={true}
                            component={NoPermisison}
                          />
                          <Route path="/" exact component={HomePage} />
                          <Route path="/about" exact component={About} />
                          <Route
                            path="/enrollment-procedure"
                            exact
                            component={EnrollmentProcedure}
                          />
                          <Route
                            path="/tuition-fees"
                            exact
                            component={TuitionFess}
                          />
                          <Route
                            path="/board-of-trustees"
                            exact
                            component={BoardTrustees}
                          />
                          <Route
                            path="/teaching-and-non-teaching-staff"
                            exact
                            component={TeachersStaff}
                          />
                          <Route path="/contact" exact component={Contact} />
                          <Route path="/login" exact component={PortalLogin} />

                          <ProtectedAdmin
                            path="/admin/dashboard"
                            isAuth={isAuth}
                            exact
                            component={DashboardHome}
                          />
                          <ProtectedAdmin
                            path="/admin/create-user"
                            isAuth={isAuth}
                            exact
                            component={CreateUser}
                          />
                          <ProtectedAdmin
                            path="/admin/class"
                            isAuth={isAuth}
                            exact
                            component={Classroom}
                          />
                          <ProtectedAdmin
                            path="/admin/announcement"
                            isAuth={isAuth}
                            exact
                            component={Announcement}
                          />
                          <ProtectedAdmin
                            path="/admin/message"
                            isAuth={isAuth}
                            exact
                            component={Message}
                          />
                          <ProtectedAdmin
                            path="/admin/school-year"
                            isAuth={isAuth}
                            exact
                            component={SchoolYear}
                          />
                          <ProtectedAdmin
                            path="/admin/users"
                            isAuth={isAuth}
                            exact
                            component={Users}
                          />
                          <ProtectedAdmin
                            path={studentUser.map((value) => {
                              return (
                                "/admin/users/student-profile/" + value.user_id
                              );
                            })}
                            exact
                            component={UserStudent}
                            isAuth={isAuth}
                          />

                          <ProtectedAdmin
                            path={teacherUser.map((value) => {
                              return (
                                "/admin/users/teacher-profile/" + value.user_id
                              );
                            })}
                            exact
                            component={UserTeacher}
                            isAuth={isAuth}
                          />

                          <Route
                            path="/user/teacher/"
                            exact
                            component={TeacherProfile}
                          />

                          <Route
                            path="*"
                            exact={true}
                            component={My404ErrorComponent}
                          />
                        </Switch>
                      </Router>
                    </DashboardStatus>
                  </LogoutState>
                </LoginProvider>
              </CreateStudentState>
            </StudentListProvider>
          </SchoolYearState>
        </CreateTeacherState>
      </div>
    </>
  );
}

export default App;
