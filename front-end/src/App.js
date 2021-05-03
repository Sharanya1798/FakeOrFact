import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
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
   <h2 className="text-center">FakeOrFact</h2>
<Router>
<Navbar/>
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