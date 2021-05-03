import React , { useState } from 'react'
import { NavLink ,useHistory} from 'react-router-dom'

function Signup() {
        const [ userName, setUname ] = useState('')
        const [ email, setemail ] = useState('')
        const [ password, setPass ] = useState('')
        const [ password2, setPass2 ] = useState('')
        const [error,setError] = useState("");

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
                    if(response.status !== 200 ) {
                        return response.json().then((body) => {
                            console.log('red',body);
                            setError(body.msg)
                          })
                    }
        
                    console.log("signup successful")
                    history.push("/login")
        
                    return response.json()
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
                <div style={{ color: 'red'}} className='text-center mb-2'>{error}</div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <span className="fa fa-user"></span>
                            </span>
                        </div>
                        <input type="text" onChange={(e) => {setError('')
                    setUname(e.target.value)}} className="form-control" name="userName" placeholder="Username" required="required" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-paper-plane"></i>
                            </span>
                        </div>
                        <input type="email" onChange={(e) =>{setError('') 
                        setemail(e.target.value)}} className="form-control" name="email" placeholder="Email Address" required="required" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-lock"></i>
                            </span>
                        </div>
                        <input type="password" onChange={(e) => {setError('')
                         setPass(e.target.value)}} className="form-control" name="password" placeholder="Password" required="required" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-lock"></i>
                            </span>
                        </div>
                        <input type="password" onChange={(e) => {setError('') 
                        setPass2(e.target.value)}} className="form-control" name="password2" placeholder="Confirm Password" required="required" />
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