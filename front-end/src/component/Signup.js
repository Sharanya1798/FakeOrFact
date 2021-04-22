import React , { useState } from 'react'
import { NavLink ,useHistory} from 'react-router-dom'

function Signup() {
        const [ userName, setUname ] = useState('')
        const [ email, setemail ] = useState('')
        const [ password, setPass ] = useState('')
        const history = useHistory();

        const onRegister = (e) => {
                e.preventDefault()
                const data = { userName,email,mobile, password  }
                const requestOptions = {
                  method: 'POST',
                  mode: 'cors',
                  headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                  body: JSON.stringify(data)
                };
                fetch('http://localhost:3000/signup', requestOptions)
                  .then(response => {
                    response.json()
                  console.log('res',response);
                  history.push("/")
                  })
                  .then(data => console.log(data));

                }
    return (
        <>
            <div className="signup-form">
                <form action="/examples/actions/confirmation.php" method="post" />
                <div className="text-center">Already have an account? <NavLink to="/login">Login here</NavLink></div>
                <h2>Sign Up</h2>
                <hr />
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <span className="fa fa-user"></span>
                            </span>
                        </div>
                        <input type="text" onChange={(e) => setUname(e.target.value)} className="form-control" name="userName" placeholder="Username" required="required" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-paper-plane"></i>
                            </span>
                        </div>
                        <input type="email" onChange={(e) => setemail(e.target.value)} className="form-control" name="email" placeholder="Email Address" required="required" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                            <i className="fa fa-phone"></i>
                            </span>
                        </div>
                        <input type="number" onChange={(e) => setMobile(e.target.value)} className="form-control" name="mobile" placeholder="Phone Number" required="required" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-lock"></i>
                            </span>
                        </div>
                        <input type="text" onChange={(e) => setPass(e.target.value)} className="form-control" name="password" placeholder="Password" required="required" />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" onClick={ onRegister } className="btn btn-primary btn-lg">Sign Up</button>
                </div>
            </div>

        </>
    )
}

export default Signup