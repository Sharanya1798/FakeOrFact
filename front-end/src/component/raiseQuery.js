import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import jwt_decode from "jwt-decode";

function RaiseQuery() {
    const [email, setEmail] = useState("");
    const [queryName, setQueryName] = useState("")
    const [queryDescription, setDescription] = useState("")
    const [error,setError] = useState("");
    const history = useHistory()

    const onQuerySubmit = (e)=>{
        e.preventDefault()
        const decoded = jwt_decode(localStorage.getItem('my_token'));
        const userName = decoded.userName;
        //console.log(decoded.userName);
        const data = {email,queryName, queryDescription, userName}
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             },
            body: JSON.stringify(data)
          };
          fetch('http://localhost:3000/raiseQuery', requestOptions)
          .then(response => {
            
            if(response.status !== 200 ) {
                return response.json().then((body) => {
                    console.log('red',body);
                    setError(body.msg)
                  })
            }
            response.json()
                .then(responseJson => {
                history.push("/")
                console.log("query submitted successfully")
                })

          })
          .then(data => console.log(data));        
    }
    if(localStorage.getItem("my_token")){
    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <div className="signup-form">
                        <div className="section-title">
                            <br/>
                            <h3 className="title">Submit a new Query</h3><hr/>
                            <p>Please give a suitable Name and Description for the query.</p>
                            <div style={{ color: 'red'}} className='text-center mb-2'> {error} </div>
                            <form id="contact-form" 
                                method="POST">
                            <div className="form-group">
                                <input placeholder = "Email"  name="email" type="email"
                                  className="form-control" onChange={(e)=> {
                                    setError('')
                                    setEmail(e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <input placeholder = "Name the Query"  name="subject" type="text"
                                  className="form-control" onChange={(e)=> {
                                    setError('')
                                    setQueryName(e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <textarea placeholder = "Write description of the query"  name="description" 
                                 type="text" className="form-control" rows="3" onChange={(e)=> {
                                    setError('')
                                    setDescription(e.target.value)}}/>
                            </div><br/>
                            <button type="submit" onClick ={onQuerySubmit} className="btn btn-primary login-btn btn-block">Submit</button>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );} else {
        history.push("/login")
    }
}
export default RaiseQuery