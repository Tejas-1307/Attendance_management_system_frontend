import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMagnifyingGlass, faUserSecret, faGauge, faTableColumns, faUser, faAlignLeft, faUsers, faUserGraduate, faRightFromBracket, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const AdminHome = () => {

    const admin = localStorage.getItem('adminId')

    // getting count of all students
    const [studentCount, setStudentCount] = useState();

    useEffect(() => {
        getStudentCount();
    }, [])

    const getStudentCount = () => {
        axios.get('http://localhost:8080/student/count').then((response) => {
            setStudentCount(response.data);
        })
            .catch((error) => {
                console.log(error)
            })
    }


    // getting count of all teachers
    const [teacherCount, setTeacherCount] = useState();

    useEffect(() => {
        getTeacherCount();
    }, [])

    const getTeacherCount = () => {
        axios.get('http://localhost:8080/teacher/count').then((response) => {
            setTeacherCount(response.data);
            console.log(teacherCount);
        })
            .catch((error) => {
                console.log(error)
            })
    }



    const [isToggled, setToggled] = useState(false);

    const handleToggle = () => {
        setToggled(!isToggled);
    }


    return (
        <div>
            <div class={`d-flex ${isToggled ? 'toggled' : ''}`} id="wrapper">
                {/* <!-- Sidebar --> */}
                <div class="bg-white" id="sidebar-wrapper">
                    <div class="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><FontAwesomeIcon icon={faUserSecret} className='me-2' />Admin Panel</div>
                    <div class="list-group list-group-flush my-3">

                        <a href="/adminhome" className="list-group-item list-group-item-action bg-transparent second-text active1">
                            <FontAwesomeIcon icon={faGauge} className='me-2' />Dashboard (admin)</a>

                        <a href="/adminteachers" class="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                            <FontAwesomeIcon icon={faUserGraduate} className='me-2' />Teachers</a>
                        <a href="/adminstudents" class="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                            <FontAwesomeIcon icon={faUsers} className='me-2' />Students</a>
                        <a href="/attendance" class="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                            <FontAwesomeIcon icon={faSquareCheck} className='me-2' />Attendance</a>
                        <a href="/" class="list-group-item list-group-item-action bg-transparent text-danger fw-bold">
                            <FontAwesomeIcon icon={faRightFromBracket} className='me-2' />Logout</a>
                    </div>
                </div>
                {/* <!-- /#sidebar-wrapper --> */}

                {/* <!-- Page Content --> */}
                <div id="page-content-wrapper">
                    <nav class="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                        <div class="d-flex align-items-center col-8">
                            <FontAwesomeIcon icon={faAlignLeft} onClick={handleToggle} className='primary-text fs-4 me-3' id="menu-toggle" />
                            <h2 class="fs-3 m-0">Attendance Management System</h2>
                        </div>

                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <a class="nav-link second-text fw-bold ms-auto mb-2 mb-lg-0" href="#" id="navbarDropdown"
                                role="button" data-bs-toggle="" aria-expanded="false">
                                <FontAwesomeIcon icon={faUser} /> {admin}
                            </a>
                           
                        </div>
                    </nav>

                    <div class="container-fluid px-4">
                        <div class="row g-3 my-2">
                            <div class="col-md-4">
                                <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                    <div>
                                        <h3 class="fs-2">{studentCount}</h3>
                                        <a href='/adminstudents' className="fs-5 list-group-item">Students</a>
                                    </div>
                                    <FontAwesomeIcon icon={faUsers} className='fs-1 primary-text border rounded-full secondary-bg p-3' />
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                    <div>
                                        <h3 class="fs-2">{teacherCount}</h3>
                                        <a href='/adminteachers' className="fs-5 list-group-item">Teachers</a>
                                    </div>
                                    <FontAwesomeIcon icon={faUserGraduate} className='fs-1 primary-text border rounded-full secondary-bg p-3' />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            {/* <!-- /#page-content-wrapper --> */}
        </div>

    )
}

export default AdminHome
