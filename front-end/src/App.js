import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import {useHistory } from 'react-router-dom'
import './App.css'
import ImageSlider from './component/imageSlider';
import Login from "./component/login";
import Navbar from "./component/Navbar";          
import Signup from './component/Signup';
import Logout from "./component/logout";
import { SliderData } from './component/sliderData'

function App() {

  return (
   <>
   <h2 className="text-center">FakeOrFact</h2>
<Router>
<Navbar/>
   <Route path="/login">
   <Login/>
   </Route>

   <Route path="/signup">
   <Signup/>
   </Route>

   <Route path="/">
     <ImageSlider slides={SliderData} />
   </Route>
   <Route path="/logout">
     <Logout/>
   </Route>
   </Router>
   </>
  )
}

export default App