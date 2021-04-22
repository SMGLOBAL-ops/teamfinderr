import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signup";
import PasswordChange from "./components/passwordchange";
import UserProfileView from './components/userprofile';
import Home from './components/home';
import ProjectListView from './components/projectlist';
import CreateProfile from './components/createprofile';
import EditProfile from './components/editprofile';
import PasswordReset from './components/passwordreset';
import NavbarLoggedIn from './components/navbarloggedin';
import NavbarLoggedOut from './components/navbarloggedout';
import Logo from './components/logo';
import BaseMessage from './components/basemessage';
 
//imports for projects table 

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";


function App() {
  return (<Router>
    <div className="App">


      {/* Project table NavBar*/}

      <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Projects Available
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add a Project 
            </Link>
          </li>
        </div>
      </nav>
    </div>

      <Switch>
        <Route exact path='/' component={Logo} />
      </Switch>

      <Switch>
        <Route exact path='/' component={BaseMessage} />
      </Switch>

      <Switch>
        < Route path="/tutorials/:id"  component={NavbarLoggedIn} />
        < Route exact path="/tutorials" component={NavbarLoggedIn}/>
        <Route exact path="/add"  component={NavbarLoggedIn} />
        <Route exact path='/' component={NavbarLoggedOut} />
        <Route path="/sign-in" component={NavbarLoggedOut} />
        <Route path="/sign-up" component={NavbarLoggedOut} />
        <Route path="/home" component={NavbarLoggedIn} />
        <Route path="/password-change" component={NavbarLoggedIn} />
        <Route path="/password-reset" component={NavbarLoggedOut} />
        <Route path="/user-profile" component={NavbarLoggedIn} />
        <Route path="/project-list" component={NavbarLoggedIn} />
        <Route path="/create-profile" component={NavbarLoggedIn} />
        <Route path="/edit-profile" component={NavbarLoggedIn} />
      </Switch>


      <Switch>
        <div className="outer">
          <div className="inner">
           < Route path="/tutorials/:id" component={Tutorial} />
           < Route exact path="/tutorials" component={TutorialsList} />
           <Route exact path="/add" component={AddTutorial} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/home" component={Home} />
            <Route path="/password-change" component={PasswordChange} />
            <Route path="/password-reset" component={PasswordReset} />
            <Route path="/user-profile" component={UserProfileView} />
            <Route path="/project-list" component={ProjectListView} />
            <Route path="/create-profile" component={CreateProfile} />
            <Route path="/edit-profile" component={EditProfile} />
          </div>
        </div>
      </Switch>


    </div></Router>
  );
}

export default App;

