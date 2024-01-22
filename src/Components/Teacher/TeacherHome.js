import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMagnifyingGlass, faUserSecret, faGauge, faTableColumns, faUser, faAlignLeft, faUsers, faUserGraduate, faRightFromBracket, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { toast } from 'react-toastify';


const TeacherHome = () => {

    const email = localStorage.getItem('teacherId')

    // ======== get teacher by email ========
    const [teacherByEmail, setTeacherByEmail] = useState();
    

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get('http://localhost:8080/teacher/getbyemail/' + email).then((response) => {
            setTeacherByEmail(response.data);
            
        })
            .catch((error) => {
                console.log(error)
                toast.error("Something went wrong", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true
                });
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
                    <div class="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><FontAwesomeIcon icon={faUserSecret} className='me-2' />Teacher Panel</div>
                    <div class="list-group list-group-flush my-3">

                        <a href="/teacherhome" className="list-group-item list-group-item-action bg-transparent second-text active1">
                            <FontAwesomeIcon icon={faGauge} className='me-2' />Profile</a>
                        <a href="/teacherstudents" class="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                            <FontAwesomeIcon icon={faUsers} className='me-2' />Students</a>
                        <a href="/studentsattendance" class="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                            <FontAwesomeIcon icon={faSquareCheck} className='me-2' />Attendance</a>
                        <a href="/teacherlogin" class="list-group-item list-group-item-action bg-transparent text-danger fw-bold">
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
                                <FontAwesomeIcon icon={faUser} /> {email}
                            </a>

                        </div>
                    </nav>

                    <div class="container-fluid px-4">
                        {
                            teacherByEmail && (
                                <div className='d-flex justify-content-center align-items-center' style={{ height: '20em' }}>
                                    <div class="card" style={{ width: '28rem' }}>
                                        <div class="card-header">
                                            Your Details
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item">Name : {teacherByEmail.name}</li>
                                            <li class="list-group-item">Email : {teacherByEmail.email}</li>
                                            <li class="list-group-item">Mobile : {teacherByEmail.mobile}</li>
                                            <li class="list-group-item">Address : {teacherByEmail.address}</li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        }


                    </div>
                </div>
            </div>
            {/* <!-- /#page-content-wrapper --> */}
        </div>

    )
}

export default TeacherHome
