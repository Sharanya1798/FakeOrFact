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