import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from './logo.jpeg';
//import axios from 'axios';
//import { render } from 'react-dom';

import Login from "./components/login";
import SignUp from "./components/signup";
import PasswordChange from "./components/passwordchange"
import UserProfileView from './components/userprofile'
import MembersProfileView from './components/memberprofile'
import Home from './components/home'
import ProjectListView from './components/projectlist'
import CreateProfile from './components/createprofile';



function App() {
  return (<Router>
    <div className="App">
      <div>
      <img class="logo" src={logo} alt=""/>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>TeamFound inc.</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/home"}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to={"/user-profile"}>User</Link>
                </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/project-list"}>Projects</Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
        </div>
      </nav>

      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/home" component={Home} />
            <Route path="/password-change" component={PasswordChange} />
            <Route path="/user-profile" component={UserProfileView} />
            <Route path="/member-profile" component={MembersProfileView} />
            <Route path="/project-list" component={ProjectListView} />
            <Route path="/create-profile" component={CreateProfile} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;

