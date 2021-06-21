import React from "react";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";

import {
  BrowserRouter as Router,
  Route,
  Switch,

} from "react-router-dom";

import EditUser from "./components/users/EditUser";
import User from "./components/users/User";
import "./styles/main.scss";

function App(props) {
  return (
    <Router>
      <div className="App">
        

        <Switch>
          <Route exact path="/" component={Home} />

 
          <Route exact path="/users/edit/:id" component={EditUser} />
          <Route exact path="/users/:id" component={User} />

          
   
        </Switch>
      </div>
    </Router>
  );
}

export default App;
