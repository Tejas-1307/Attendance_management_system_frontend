import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMagnifyingGlass, faUserSecret, faGauge, faTableColumns, faUser, faAlignLeft, faUsers, faUserGraduate, faRightFromBracket, faTrashCan, faPenToSquare, faCheckSquare, faCirclePlus, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';


const Attendance = () => {

    const admin = localStorage.getItem('adminId')

    //======== To get all students ========
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getStudentByClass(std);
        axios.get('http://localhost:8080/student/').then((response) => {
            setData(response.data);
            setDataByDate(response.data);
        })
            .catch((error) => {
                console.log(error)
            })
    }



    // ============ To mark attendance of student ===============

    const [attendance, setAttendance] = useState();

    // const [todayAttendance, setTodayAttendance] = useState();

    const markAttendance = (rollNo) => {
        axios.post('http://localhost:8080/student_attendance/' + rollNo, {
            "attendance": attendance
        }).then((result) => {

            getData();
            console.log(result.data);
        })
            .catch((error) => {
                console.log(error)
            })
        console.log(attendance);
    }


    // ============= to get particular class student ============

    const [std, setStd] = useState('')
    const [stdData, setStdData] = useState('');


    const getStudentByClass = (std) => {
        setStd(std);
        axios.get('http://localhost:8080/student/getbyclass/' + std).then((result) => {
            setStdData(result.data);
        })
            .catch((error) => {
                console.log(error)
            })
    }



    // ============= search students attendance by date ================

    const [dataByDate, setDataByDate] = useState([]);
    const [date, setDate] = useState('');
    const finalSortedData = [];

    // formatting the date

    const formatDate = (dt) => {
        setDate(dt);

        const dateObject = new Date(dt);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();

        const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

        studentsByDate(formattedDate);
        
    }



    const studentsByDate = (dt) => {
        console.log("formatted date" + dt);

        axios.get('http://localhost:8080/student/getbydate/' + dt).then((result) => {
                setDataByDate(result.data);
                setData(result.data);
                console.log(result.data);
        })
        .catch((error) => {
          console.log(error)
        })

    }


    // To show all all students from dropdown.
    const showAllStudents = () => {
        setStd('');
        setStdData('');
    }


    // To hide the sidebar
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


                    {/*=============== student attendance table ==============*/}

                    {
                                <div class="container-fluid table-container px-4">

                                    <div class="row my-5">

                                        <div className='mb-1 w-100 d-flex justify-content-between'>
                                            <h3 class="fs-4 mb-3">Student Attendance</h3>

                                            <div className='d-flex'>
                                               {/*======= Calender to select date =======*/}
                                                <div className=''>
                                                    <input type='date' value={date} onChange={(e) => formatDate(e.target.value)}
                                                        className='border-0 rounded-2 px-1 py-1 mt-1' />
                                                </div>

                                                <div class="dropdown">
                                                    <button className="border-0 py-2 rounded-3 dropdown-toggle px-1 mx-4" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Select Class
                                                    </button>
                                                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                                        <li><a class="dropdown-item" onClick={() => getStudentByClass('11th')}>11th</a></li>
                                                        <li><a class="dropdown-item" onClick={() => getStudentByClass('12th')}>12th</a></li>
                                                        <li><a class="dropdown-item" onClick={() => showAllStudents()}>All</a></li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>

                                        {
                                            stdData.length > 0 ? (
                                                <div class="col">
                                                    <table class="table bg-white rounded shadow-sm table-hover">
                                                        <thead>
                                                            <tr>

                                                                <th scope="col" width="50">S.No.</th>
                                                                <th scope="col">Roll No.</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Attendance</th>
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                stdData && stdData.length > 0 ? stdData.map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{item.rollNo}</td>
                                                                            <td>{item.name}</td>
                                                                            {
                                                                                (item.attendance[item.attendance.length - 1] != null)
                                                                                    ?

                                                                                    (<td>{item.attendance[item.attendance.length - 1].attendance}</td>)
                                                                                    :
                                                                                    (<td></td>)

                                                                            }
                                                                            <td colSpan={2}>

                                                                                <input type="radio" id="html" name="fav_language" value="Present" onChange={(e) => setAttendance(e.target.value)} />
                                                                                <label for="html">Present</label> &nbsp;
                                                                                <input type="radio" id="css" name="fav_language" value="Absent" onChange={(e) => setAttendance(e.target.value)} />
                                                                                <label for="css">Absent</label>
                                                                                <button type='submit' className='btn btn-sm btn-primary ms-3' onClick={() => markAttendance(item.rollNo)}>Submit</button>

                                                                            </td>
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
                                                :

                                                (
                                                    <div class="col">
                                                        <table class="table bg-white rounded shadow-sm table-hover">
                                                            <thead>
                                                                <tr>

                                                                    <th scope="col" width="50">S.No.</th>
                                                                    <th scope="col">Roll No.</th>
                                                                    <th scope="col">Name</th>
                                                                    <th scope="col">Date</th>
                                                                    <th scope="col">Attendance</th>
                                                                    <th scope="col">Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    data && data.length > 0 ? data.map((item, index) => {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>{index + 1}</td>
                                                                                <td>{item.rollNo}</td>
                                                                                <td>{item.name}</td>
                                                                                {/* <td>{item.attendance[item.attendance.length - 1].date}</td> */}

                                                                                {
                                                                                    (item.attendance[item.attendance.length - 1] != null)
                                                                                    ?
                                                                                    (<td>{item.attendance[item.attendance.length - 1].date}</td>)
                                                                                    :
                                                                                    (<td></td>)
                                                                                }

                                                                                {

                                                                                    (item.attendance[item.attendance.length - 1] != null)
                                                                                        ?
                                                                                        // <td>{attendance}</td>
                                                                                        (<td>{item.attendance[item.attendance.length - 1].attendance}</td>)
                                                                                        :
                                                                                        (<td></td>)

                                                                                }
                                                                                <td colSpan={2}>

                                                                                    <input type="radio" id="html" name="fav_language" value="Present" onChange={(e) => setAttendance(e.target.value)} />
                                                                                    <label for="html">Present</label> &nbsp;
                                                                                    <input type="radio" id="css" name="fav_language" value="Absent" onChange={(e) => setAttendance(e.target.value)} />
                                                                                    <label for="css">Absent</label>
                                                                                    <button type='submit' className='btn btn-sm btn-primary ms-3' onClick={() => markAttendance(item.rollNo)}>Submit</button>

                                                                                </td>
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
                            
                    }

                </div>
            </div>
            {/* <!-- /#page-content-wrapper --> */}



        </div >
    )
}

export default Attendance
