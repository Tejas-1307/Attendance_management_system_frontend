import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMagnifyingGlass, faUserSecret, faGauge, faTableColumns, faUser, faAlignLeft, faUsers, faUserGraduate, faRightFromBracket, faTrashCan, faPenToSquare, faCheckSquare, faCirclePlus, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'


const AdminStudents = () => {

    const admin = localStorage.getItem('adminId')

    //======== To get all students ========
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        setStdData('');
        axios.get('http://localhost:8080/student/').then((response) => {
            setData(response.data);
        })
            .catch((error) => {
                console.log(error)
            })
    }


    // ============= to get particular class student ============

    const [stdData, setStdData] = useState('');


    const getEleventhStudent = (std) => {
        axios.get('http://localhost:8080/student/getbyclass/' + std).then((result) => {
            setStdData(result.data);
        })
            .catch((error) => {
                console.log(error)
            })
    }


    /* ================ To save the student data ===============  */


    // To show the form to save student data
    const handleSaveShowFormn = () => {
        handleSaveShow();
    }

    // these following three copied with modal for save new book page.....
    const [showSave, setShowSave] = useState(false);

    const handleSaveClose = () => setShowSave(false);
    const handleSaveShow = () => setShowSave(true);


    // To add a new student
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [standard, setStandard] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');



    const handleSave = () => {

        const errors = validate();
        setErrors(errors);

        if (errors.name.length === 0 && errors.email.length === 0 && errors.standard.length === 0 && errors.address.length === 0 && errors.password.length === 0 && errors.mobile.length === 0) {
            const url = 'http://localhost:8080/student/';
            const data = {
                "name": name,
                "email": email,
                "standard": standard,
                "mobile": mobile,
                "address": address,
                "password": password
            }

            axios.post(url, data).then((result) => {
                handleSaveClose();
                getData();
                clear();
                toast.success("Student has been added", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true
                });
            }).catch((error) => {
                toast.error("Something went wrong", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true
                });
            })
        }


    }

    // Validate form fields
    const [errors, setErrors] = useState([]);

    const validate = () => {
        const error = {};

        // validation for name
        if (!name) {
            error.name = "Name cannot be empty.";
        } else if (name.length < 2) {
            error.name = "Name should contain at least 2 characters";
        } else if (/^\s*$/.test(name)) {
            error.name = "Name should not be just white spaces";
        } else if (/^\s/.test(name)) {
            error.name = "Name should not start with a white space";
        } else if (/^\d/.test(name)) {
            error.name = "Name should not start with a digit";
        } else if (/^[!@#$%^&*-<>?/|+=]/.test(name)) {
            error.name = "Name should not start with a special character";
        } else if (/[!@#$%^&*-<>?/|+=]/.test(name)) {
            error.name = "Name should not contain special character";
        } else {
            error.name = "";
        }


        //validation for email
        if (!email) {
            error.email = "Email cannot be empty.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            error.email = "Enter valid email , email should contain '@' and '.'";
        } else {
            error.email = "";
        }


        // validation for mobile
        if (!mobile) {
            error.mobile = "mobile number cannot be empty.";
        } else if (mobile.length < 10 || mobile.length > 10) {
            error.mobile = "mobile number length should be 10 digits only";
        } else if (!/^\d*$/.test(mobile)) {
            error.mobile = "moile number should contain only digits";
        } else {
            error.mobile = "";
        }

        //validation for standard
        if (!standard) {
            error.standard = "Class cannot be empty.";
        }else {
            error.standard = "";
        }

        //validation for address
        if (!address) {
            error.address = "Address cannot be empty.";
        }else {
            error.address = "";
        }

        // validation for password
        if (!password) {
            error.password = "Password cannot be empty.";
        }
        else if (password.length < 8) {
            error.password = "minimum length of password should be 8";
        }
        else if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])/.test(password)) {
            error.password = "Password should contain at least one capital letter, one special symbol, and one digit";
        }
        else if (/\s/.test(password)) {
            error.password = "Password should not contain white spaces";
        }
        else {
            error.password = "";
        }

        return error;
    }




    /*========= get student by roll no ( To edit the student info )========== */

    const [editRollNo, setEditRollNo] = useState('');
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editStandard, setEditStandard] = useState('');
    const [editMobile, setEditMobile] = useState('');
    const [editAddress, setEditAddress] = useState('');
    const [editPassword, setEditPassword] = useState('');

    // these following three copied with modal for edit page.....
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const handleEdit = (rollNo) => {
        handleShow();
        axios.get('http://localhost:8080/student/getbyrollno/' + rollNo).then((result) => {
            setEditRollNo(rollNo);
            setEditName(result.data.name);
            setEditEmail(result.data.email);
            setEditStandard(result.data.standard);
            setEditMobile(result.data.mobile);
            setEditAddress(result.data.address);
            setEditPassword(result.data.password);
        })
            .catch((error) => {
                console.log(error)
            })
    }


    /* ============ To update the student data================== */

    const handleUpdate = () => {
        const url = 'http://localhost:8080/student/update';

        const data = {
            "rollNo": editRollNo,
            "name": editName,
            "email": editEmail,
            "standard": editStandard,
            "mobile": editMobile,
            "address": editAddress,
            "password": editPassword
        }

        axios.put(url, data).then((result) => {
            handleClose();
            getData();
            // clear();
            toast.success("Student has been updated", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                hideProgressBar: true
            });
        }).catch((error) => {
            toast.error("Something went wrong", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                hideProgressBar: true
            });
        })
    }


    /*================== To delete the student data ================ */

    const handleDelete = (rollNo) => {
        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!"
        }).then((result) => {
            if (result.value) {
                axios.delete('http://localhost:8080/student/delete/' + rollNo).then((result) => {
                    if (result.status === 200) {
                        toast.success("Student has been deleted", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2000,
                            hideProgressBar: true
                        });
                        getData();
                    }
                }).catch((error) => {
                    // alert(error);
                    toast.error("Something went wrong", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                        hideProgressBar: true
                    });
                })
            }
        });

    }

    // To clear the form fields after submission.
    const clear = () => {
        setName('');
        setEmail('');
        setStandard('');
        setMobile('');
        setAddress('');
        setPassword('');
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


                    {/*========== To show all students in table ========= */}

                    <div class="container-fluid table-container px-4">

                        <div class="row my-5">

                            <div className='mb-1 w-100 d-flex justify-content-between'>
                                <h3 class="fs-4 mb-2">All Students</h3>
                                <div className='d-flex'>
                                    <div class="dropdown">
                                        <button className="border-0 py-2 rounded-3 dropdown-toggle px-1" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                            Select Class
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                            <li><a class="dropdown-item" onClick={() => getEleventhStudent('11th')}>11th</a></li>
                                            <li><a class="dropdown-item" onClick={() => getEleventhStudent('12th')}>12th</a></li>
                                            <li><a class="dropdown-item" onClick={() => getData()}>All</a></li>
                                        </ul>
                                    </div>
                                    <button className='mx-3 px-1 py-0 border-0 rounded-3' onClick={() => handleSaveShowFormn()}> Add Student <FontAwesomeIcon icon={faCirclePlus} /> </button>
                                </div>

                            </div>
                            {
                                stdData.length > 0 ? (
                                    <div class="col">
                                        <table class="table bg-white rounded shadow-sm table-hover">
                                            <thead>
                                                <tr>

                                                    {/* <th scope="col" width="50">S.No.</th> */}
                                                    <th scope="col">Roll No.</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Class</th>
                                                    <th scope="col">Mobile</th>
                                                    <th scope="col">Address</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    stdData && stdData.length > 0 ? stdData.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                {/* <td>{index + 1}</td> */}
                                                                <td>{item.rollNo}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.standard}</td>
                                                                <td>{item.mobile}</td>
                                                                <td>{item.address}</td>

                                                                <td colSpan={2}>
                                                                    {/* edit button */}
                                                                    <FontAwesomeIcon icon={faPenToSquare} className='me-2 fs-5 text-primary' onClick={() => handleEdit(item.rollNo)} />
                                                                    {/* delete button */}
                                                                    <FontAwesomeIcon icon={faTrashCan} className='me-2 fs-5 text-danger' onClick={() => handleDelete(item.rollNo)} />

                                                                    {/* <button className="btn btn-sm btn-primary">Edit</button> &nbsp; */}
                                                                    {/* <button className="btn btn-sm btn-danger" >Delete</button> */}
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
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Class</th>
                                                        <th scope="col">Mobile</th>
                                                        <th scope="col">Address</th>
                                                        <th scope="col">Actions</th>
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
                                                                    <td>{item.email}</td>
                                                                    <td>{item.standard}</td>
                                                                    <td>{item.mobile}</td>
                                                                    <td>{item.address}</td>

                                                                    <td colSpan={2}>
                                                                        {/* edit button */}
                                                                        <FontAwesomeIcon icon={faPenToSquare} className='me-2 fs-5 text-primary' onClick={() => handleEdit(item.rollNo)} />
                                                                        {/* delete button */}
                                                                        <FontAwesomeIcon icon={faTrashCan} className='me-2 fs-5 text-danger' onClick={() => handleDelete(item.rollNo)} />

                                                                        {/* <button className="btn btn-sm btn-primary">Edit</button> &nbsp; */}
                                                                        {/* <button className="btn btn-sm btn-danger" >Delete</button> */}
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



                </div>
            </div>
            {/* <!-- /#page-content-wrapper --> */}



            {/* ================ Modal form to save the new student details =============== */}


            <Modal show={showSave} onHide={handleSaveClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Save Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row d-flex justify-content-center">
                        <form className="col-8 needs-validation" novalidate>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" aria-describedby="inputGroupPrepend2" placeholder="Enter name" required />
                                {errors.name && <div className='text-danger w-100 d-flex justify-content-end' style={{fontSize:13}}>{errors.name}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" aria-describedby="inputGroupPrepend2" placeholder="Enter email" required />
                                {errors.email && <div className='text-danger w-100 d-flex justify-content-end' style={{fontSize:13}}>{errors.email}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Class</label>
                                <input type="text" value={standard} onChange={(e) => setStandard(e.target.value)} className="form-control" aria-describedby="inputGroupPrepend2" placeholder="Enter class ex, 11th, 12th" required />
                                {errors.standard && <div className='text-danger w-100 d-flex justify-content-end' style={{fontSize:13}}>{errors.standard}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mobile</label>
                                <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="form-control" placeholder="Enter mobile" required />
                                {errors.mobile && <div className='text-danger w-100 d-flex justify-content-end' style={{fontSize:13}}>{errors.mobile}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="Enter address" required />
                                {errors.address && <div className='text-danger w-100 d-flex justify-content-end' style={{fontSize:13}}>{errors.address}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter password" required />
                                {errors.password && <div className='text-danger w-100 d-flex justify-content-end' style={{fontSize:13}}>{errors.password}</div>}
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleSaveClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>





            {/* ================ Modal form to update the student details =============== */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row d-flex justify-content-center">
                        <form className="col-8">
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Roll No.</label>
                                <input type="text" value={editRollNo} readOnly className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter roll number" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Name</label>
                                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter name" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Email</label>
                                <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter name" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Class</label>
                                <input type="text" value={editStandard} onChange={(e) => setEditStandard(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter name" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Mobile</label>
                                <input type="text" value={editMobile} onChange={(e) => setEditMobile(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter mobile number" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Address</label>
                                <input type="text" value={editAddress} onChange={(e) => setEditAddress(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter address" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input type="text" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter password" />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>




        </div>
    )
}

export default AdminStudents
