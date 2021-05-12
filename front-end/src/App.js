import React from 'react';
import {Route, Redirect, BrowserRouter as Router} from 'react-router-dom';
import './App.css'
import Login from "./component/login";
import Navbar from "./component/Navbar";          
import Signup from './component/Signup';
import RaiseQuery from "./component/raiseQuery";
import AllQueries from "./component/allQueries";
import MyQueries from "./component/myQueries";
import postComments from "./component/postComments";

function App() {

  return (
   <>
   <div><h2 className="text-center1" >FakeOrFact</h2></div>
   
   <br/>
<Router>
<Route exact path="/">
    <Redirect to="/allQueries" />
</Route>
   {/* <Route path="/"><AllQueries/></Route> */}
   <Route path="/login"><Login/></Route>
   <Route path="/signup"><Signup/></Route>
   <Route path="/allQueries"><AllQueries/></Route>
   <Route path="/raiseQuery"><RaiseQuery/></Route>
   <Route path="/myQueries"><MyQueries/></Route>
   <Route path="/postComments" exact component={postComments}/>
</Router>
   </>
  )
}

export default App