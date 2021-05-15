import React from 'react'
import { NavLink } from 'react-router-dom'
export default class Login extends React.Component {
    constructor()
    {
        super()
        this.state = {
            userName: '',
            password: '',
            isLogin: false,
            error: ''
        }
    }

    onLogin = (e)=>{
        e.preventDefault()
        const userName = this.state.userName
        const password = this.state.password
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
          fetch('http://localhost:3000/signin', requestOptions)
          .then(response => {

            if(response.status !== 200 ) {
                return response.json().then((body) => {
                    console.log('red',body);
                    this.setState({error: body.msg})
                  })
            }
            response.json()
                .then(responseJson => {
                    this.setState({isLogin: true})
                    window.location = '/allQueries'
                    localStorage.setItem('my_token', responseJson.new_token);
                    console.log("login successful")
                })

          })
          .then(data => console.log(data));        
    }
    render() {
    return (
        <>
         
      <div className="bodyy">
            <form class="box" action="/examples/actions/confirmation.php" method="post">
                <p className="text-center text-muted small">Don't have an account? <NavLink to="/signup">Sign up here!</NavLink></p>
                <h1 style={{color: 'snow'}}>Login</h1>
                <div style={{ color: 'red'}} className='text-center mb-2'>
                    {this.state.error}
                </div>
                <input type="text" onChange = {(e)=> {
                    this.setState({userName: e.target.value, error: ''})}}
                     className="form-control" name="username" placeholder="Username" required="required"/>	

                <input type="password" onChange= {(e)=> {
                    this.setState({password: e.target.value, error: ''})}} className="form-control" name="password" placeholder="Password" required="required"/>

                <input type="submit" name="submit" onClick ={this.onLogin} value="Login" ></input>
                {/* <button name = "submit" onClick={this.onLogin}>Login</button>  */}
                <div >
                        <NavLink to="#" className="float-right" >Forgot Password?</NavLink>
                </div>

            </form>
        </div>
        </>
    )
    }
}
