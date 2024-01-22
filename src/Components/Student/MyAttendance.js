import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMagnifyingGlass, faUserSecret, faGauge, faTableColumns, faUser, faAlignLeft, faUsers, faUserGraduate, faRightFromBracket, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { toast } from 'react-toastify';


const MyAttendance = () => {

    const email = localStorage.getItem('studentId')

    // ======== get teacher by email ========
    const [studentByEmail, setStudentByEmail] = useState();
    const [allAttendance, setAllAttendance] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get('http://localhost:8080/student/getbyemail/' + email).then((response) => {
            setStudentByEmail(response.data);
            setAllAttendance(response.data.attendance);
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


    // ============ To mark attendance of student ===============

    const [attendance, setAttendance] = useState();


    const markAttendance = (rollNo) => {
        axios.post('http://localhost:8080/student_attendance/' + rollNo, {
            "attendance": attendance
        }).then((result) => {
            getData();
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
                    <div class="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><FontAwesomeIcon icon={faUserSecret} className='me-2' />Student Panel</div>
                    <div class="list-group list-group-flush my-3">

                        <a href="/studenthome" className="list-group-item list-group-item-action bg-transparent second-text active1">
                            <FontAwesomeIcon icon={faGauge} className='me-2' />Profile</a>
                        <a href="/myattendance" class="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                            <FontAwesomeIcon icon={faSquareCheck} className='me-2' />Attendance</a>
                        <a href="/studentlogin" class="list-group-item list-group-item-action bg-transparent text-danger fw-bold">
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

                    <div className='d-flex justify-content-end'>
                        <div className='mx-4 mt-3'>
                            <h5 className='text-primary p-0'><b> Mark Today's Attendance </b></h5>
                            <input type="radio" id="html" name="fav_language" value="Present" onChange={(e) => setAttendance(e.target.value)} />
                            <label for="html">Present</label>
                            <button type='submit' className='btn btn-sm btn-primary ms-3' onClick={() => markAttendance(studentByEmail.rollNo)}>Submit</button>
                        </div>
                    </div>


                    <div class="container-fluid table-container px-4">
                        <div class="row my-5">

                            <div className='mb-1 w-100 d-flex justify-content-between'>
                                <h3 class="fs-4 mb-3">Your Attendance Records</h3>
                            </div>

                            {
                                studentByEmail && (
                                    <div class="col">
                                        <table class="table bg-white rounded shadow-sm table-hover">
                                            <thead>
                                                <tr>

                                                    <th scope="col" width="50">S.No.</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Time</th>
                                                    <th scope="col">Attendance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allAttendance && allAttendance.length > 0 ? allAttendance.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{item.date}</td>
                                                                <td>{item.time}</td>
                                                                <td>{item.attendance}</td>
                                                            </tr>
                                                        )
                                                    })
                                                        :
                                                        'Loading...'
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )

                            }
                        </div>

                    </div>
                </div>
            </div>
            {/* <!-- /#page-content-wrapper --> */}
        </div>

    )
}

export default MyAttendance
