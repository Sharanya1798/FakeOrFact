import React , { useState } from 'react'
import { NavLink ,useHistory} from 'react-router-dom'
import Navbar from './Navbar';

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
                <Navbar/>
                <br/>
                <br/>
            <div className="bodyy">
            <form class="box" action="/examples/actions/confirmation.php" method="post" >
                <div className="text-center text-muted small">Already have an account? <NavLink to="/login">Login here</NavLink></div>
                <h2 style={{color: 'snow'}}>Sign Up</h2>
                <hr />
                <div style={{ color: 'red'}} className='text-center mb-2'>
                    {error}
                </div>
                
                        <input type="text" onChange={(e) => {setError('')
                    setUname(e.target.value)}} className="form-control" name="userName" placeholder="Username" required="required" />


                        <input type="email" onChange={(e) =>{setError('') 
                        setemail(e.target.value)}} className="form-control" name="email" placeholder="Email Address" required="required" />
                
            
                        <input type="password" onChange={(e) => {setError('')
                         setPass(e.target.value)}} className="form-control" name="password" placeholder="Password" required="required" />
                    
                
               
                        <input type="password" onChange={(e) => {setError('') 
                        setPass2(e.target.value)}} className="form-control" name="password2" placeholder="Confirm Password" required="required" />
                  
                  <input type="submit" name="" onClick ={onRegister} value="Sign Up" ></input>
                   
                
                </form>

            </div>
        </>
    )
}

export default Signup