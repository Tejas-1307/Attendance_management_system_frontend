import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import './Css/admin.css';

import AdminLoginRegister from './Components/Admin/AdminLoginRegister';
import TeacherLoginRegister from './Components/Teacher/TeacherLoginRegister';
import StudentLoginRegister from './Components/Student/StudentLoginRegister';
import AdminHome from './Components/Admin/AdminHome';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminStudents from './Components/Admin/AdminStudents';
import Attendance from './Components/Admin/Attendance';
import AdminTeacher from './Components/Admin/AdminTeacher';
import TeacherHome from './Components/Teacher/TeacherHome';
import TeacherStudents from './Components/Teacher/TeacherStudents';
import StudentAttendance from './Components/Teacher/StudentAttendance';
import StudentHome from './Components/Student/StudentHome';
import MyAttendance from './Components/Student/MyAttendance';



function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<AdminLoginRegister />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/adminstudents" element={<AdminStudents />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/adminteachers" element={<AdminTeacher/>} />
          <Route path="/teacherlogin" element={<TeacherLoginRegister />} />
          <Route path="/teacherhome" element={<TeacherHome />} />
          <Route path="/teacherstudents" element={<TeacherStudents />} />
          <Route path="/studentsattendance" element={<StudentAttendance />} />
          <Route path="/studentlogin" element={<StudentLoginRegister/>} />
          <Route path="/studenthome" element={<StudentHome/>} />
          <Route path="/myattendance" element={<MyAttendance/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
