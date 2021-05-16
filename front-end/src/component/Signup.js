import React , { useState } from 'react'
import { NavLink ,useHistory} from 'react-router-dom'
import Navbar from './Navbar';

export default class Signup extends React.Component {
  constructor()
  {
      super()
      this.state = {
          userName: '',
          email: '',
          password: '',
          password2: '',
          isSignup: false,
          error: ''
      }
  }

  onRegister = (e) => {
    e.preventDefault()
      const userName = this.state.userName;
      const email = this.state.email;
      const password = this.state.password;
      const password2 = this.state.password2;

      const data = { userName, email, password, password2 }
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
                  this.setState({error: body.msg})
              })
          }
        
          console.log("signup successful")
          this.setState({isSignup: true})
          window.location = '/login'
        
          return response.json()
      })
      .then(data => console.log(data));

  }
  render() {
    return (
        <>      
                <Navbar/>
                <br/>
                <br/>
            <div className="bodyy">
            <form class="box1" action="/examples/actions/confirmation.php" method="post" >
                <div className="text-center text-muted small">Already have an account? <NavLink to="/login">Login here</NavLink></div>
                <h2 style={{color: 'snow'}}>Sign Up</h2>
                <hr />
                <div style={{ color: 'red'}} className='text-center mb-2'>
                    {this.state.error}
                </div>
                  
                        <input type="text" onChange={(e) => {
                    this.setState({userName: e.target.value, error: ''})}} className="form-control" name="userName" placeholder="Username" required="required" />


                        <input type="email" onChange={(e) =>{
                    this.setState({email: e.target.value, error: ''})}} className="form-control" name="email" placeholder="Email Address" required="required" />
                
            
                        <input type="password" onChange={(e) => {
                    this.setState({password: e.target.value, error: ''})}} className="form-control" name="password" placeholder="Password" required="required" />
                    
                
               
                        <input type="password" onChange={(e) => {
                    this.setState({password2: e.target.value, error: ''})}} className="form-control" name="password2" placeholder="Confirm Password" required="required" />
                  
                  <input type="submit" name="" onClick ={this.onRegister} value="Sign Up" ></input>
                  {/* <button name = "submit" onClick={this.onRegister}>Sign Up</button>  */}

                
                </form>

            </div>
        </>
    )
  }
}
