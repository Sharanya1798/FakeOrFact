import React , { useState } from 'react'
import { NavLink ,useHistory, Link} from 'react-router-dom'

function Signup() {
        const [ userName, setUname ] = useState('')
        const [ email, setemail ] = useState('')
        const [ password, setPass ] = useState('')
        const [ password2, setPass2 ] = useState('')
        const history = useHistory();


        const onRegister = (e) => {
                e.preventDefault()
                const data = { userName,email, password, password2 }
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
                <Link to="/" className="btn-flat waves-effect">
                    <i className="material-icons left"></i> Back to home
                </Link>
                <h2>Sign Up</h2>
                <div className="text-center">Already have an account? <NavLink to="/login">Login here</NavLink></div>
                <br/>
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
                        <input type="email" onChange={(e) => setemail(e.target.value)} className="form-control" name="email" placeholder="Email" required="required" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                            <i className="fa fa-phone"></i>
                            </span>
                        </div>
                        <input type="password" onChange={(e) => setPass(e.target.value)} className="form-control" name="password" placeholder="Password" required="required" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-lock"></i>
                            </span>
                        </div>
                        <input type="password" onChange={(e) => setPass2(e.target.value)} className="form-control" name="password2" placeholder="Confirm Password" required="required" />
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