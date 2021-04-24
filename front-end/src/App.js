import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import './App.css'
import ImageSlider from './component/imageSlider';
import Login from "./component/login";
import Navbar from "./component/Navbar";          
import Signup from './component/Signup'
import { SliderData } from './component/sliderData'



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

   <Route path="/">
     <ImageSlider slides={SliderData} />
   </Route>
   </Router>
   </>
  )
}

export default App