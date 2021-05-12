import React, { useState } from 'react'
import { NavLink,useHistory } from 'react-router-dom'
import jwt_decode from "jwt-decode";
function Login() {
    const [userName,setuserName] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const history = useHistory()

    const onLogin = (e)=>{
        e.preventDefault()
        const data = {userName,password}
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             },
            body: JSON.stringify(data)
          };
        //   process.env.NODE_ENV
          fetch('http://localhost:3000/signin', requestOptions)
          .then(response => {
            
            if(response.status !== 200 ) {
                return response.json().then((body) => {
                    console.log('red',body);
                    setError(body.msg)
                  })
            }
            response.json()
                .then(responseJson => {
                history.push("/allQueries")
                const { token } = responseJson.new_token;
                console.log(token)
                localStorage.setItem('my_token', responseJson.new_token);
                const decoded = jwt_decode(localStorage.getItem('my_token'));
                console.log(decoded);
                console.log("login successful")
                })

          })
          .then(data => console.log(data));        
    }

    return (
        <>
        <div className="bodyy">
            <form class="box" action="/examples/actions/confirmation.php" method="post">
                <p className="text-center text-muted small">Don't have an account? <NavLink to="/signup">Sign up here!</NavLink></p>
                <h1>Login</h1>
                <div style={{ color: 'red'}} className='text-center mb-2'>
                    {error}
                </div>
                <input type="text" onChange={(e)=> {
                    setError('')
                    setuserName(e.target.value)}}
                     className="form-control" name="username" placeholder="Username" required="required"/>	

                <input type="password" onChange={(e)=> {
                    setError('')
                    setPassword(e.target.value)}} className="form-control" name="password" placeholder="Password" required="required"/>

                <input type="submit" name="" onClick ={onLogin} value="Login" ></input>
                
                <div >
                        <NavLink to="#" className="float-right" >Forgot Password?</NavLink>
                </div>

            </form>
        </div>
        </>
    )
}

export default Login