
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faHand } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';




const TeacherLoginRegister = () => {

    //   =============For login================

    // For validation
    const [errors, setErrors] = useState([]);


    //getting login information
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();





    //submitting the login form
    const loginFormSubmit = (event) => {
        event.preventDefault();

        try {
            axios.post('http://localhost:8080/teacher/login', {
                email: email,
                password: password
            })
                .then(function (response) {
                    if (response.status === 200) {
                        toast.success("Login Successfully", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2000,
                            hideProgressBar: true
                        });
                        localStorage.setItem("teacherId", email);

                        navigate('/teacherhome')

                    }
                })
                .catch(error => {
                    if (error.response && error.response.status === 401) {
                        const error = {};
                        error.msg = "Please enter valid credentials !";
                        setErrors(error);
                    }
                });


        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className='login-main'>

            {/* Navbar to select the role of user */}
        
                <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-center" style={{width:''}}>
                    <div class="d-flex">
                        <a class="navbar-brand fw-bold text-primary" href="#"> Who Are You ? </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link to="/" className="nav-link navbar-brand" aria-current="page" style={{fontFamily:'cursive'}}>Admin</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to="/teacherlogin" className="nav-link navbar-brand" aria-current="page" style={{fontFamily:'cursive'}}>Teacher</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to="/studentlogin" className="nav-link navbar-brand" aria-current="page" style={{fontFamily:'cursive'}}>Student</Link>
                                </li>
                               
                            </ul>
                            
                        </div>
                    </div>
                </nav>
            


            <div className={`d-flex justify-content-center align-items-center container mt-4 `} id="container">

                <div className="form-container sign-in">
                    <form onSubmit={loginFormSubmit}>
                        <h1>Sign In</h1>
                        <span>or use your user id password</span>
                        {errors.msg && <div className='text-danger'>{errors.msg}</div>}
                        <input type="text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Teacher Id" />
                        <input type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Password" />
                        <button type='submit'>Sign In</button>
                    </form>
                </div>

                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-right">
                            <img src='./images/attend2.jpg' className='' alt='image'/>
                            <h2 className='mt-3 mb-4'>Hello Teacher<FontAwesomeIcon icon={faHand} className='ms-2' /></h2>
                            {/* <h2>Attendance Management System</h2> */}
                            <p>Sign up with your credentials and mark attendance online</p>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default TeacherLoginRegister
