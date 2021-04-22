// import React, { useState } from 'react'
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   const [ firstName, setFname ] = useState('')
//   const [ lastName, setLname ] = useState('')
//   const [ userName, setUname ] = useState('')
//   const [ password, setPass ] = useState('')
//   console.log(firstName)

//   const onRegister = (e) => {
//     e.preventDefault()
//     const data = { firstName, lastName, userName, password  }
//     console.log(data);
//     const requestOptions = {
//       method: 'POST',
//       mode: 'cors',
//       headers: { 
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//        },
//       body: JSON.stringify(data)
//     };
//     fetch('http://localhost:4444/signup', requestOptions)
//       .then(response => {
//         response.json()
//       console.log('res',response);
//       })
//       .then(data => console.log(data));

//     // empty dependency array means this effect will only run once (like componentDidMount in classNamees)
// }
//   return (
// <form>
//   <input placeholder='First name' onChange={(e) => setFname(e.target.value)} />
//   <input placeholder='Last name' onChange={(e) => setLname(e.target.value)}/>
//   <input placeholder='Username' onChange={(e) => setUname(e.target.value)}/>
//   <input placeholder='Password' onChange={(e) => setPass(e.target.value)}/>
//   <button type='submit' onClick={ onRegister }>Submit</button>
// </form>
//   )
// }

// export default App;

import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import './App.css'
import Login from "./component/login";
import Navbar from "./component/Navbar";          
import Signup from './component/Signup'


function App() {
  return (
   <>
   {/* <Navbar/> */}
<Router>
<Navbar/>
   <Route path="/login">
   <Login/>
   </Route>

   <Route path="/signup">
   <Signup/>
   </Route>
   </Router>
  
   </>
  )
}

export default App