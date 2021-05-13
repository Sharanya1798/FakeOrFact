import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink} from "react-router-dom";


const Navbar = () => {
  const token = localStorage.getItem('my_token');

  const logoutUser = () => {
    localStorage.removeItem('my_token');
  };

  if(token) {
    return(
      <>
    <nav className="navbar navbar-expand-lg navbar-light bg-blue">
    <a className="navbar-brand" href="/">FakeOrFact</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav mob_nav hidden-xs">
          <li className="nav-item">
            <a className="nav-link" href="/raiseQuery">
                Add New Post
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/myQueries">
                My Posts
            </a>
          </li>
      </ul>
    </div>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/allQueries">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/" onClick={logoutUser} >Logout</NavLink>
      </li>
    </ul>
    </div>
</nav>
    </>
  )
  } else {
  return(
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-blue">
  <a className="navbar-brand" href="/">FakeOrFact</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/allQueries">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/Signup">Signup</NavLink>
      </li>
     
    </ul>
   
  </div>
</nav>
    </>
  )}
}

export default Navbar