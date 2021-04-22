import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import logo from './logo.jpeg';

import Login from "./components/login";
import SignUp from "./components/signup";
import PasswordChange from "./components/passwordchange"
import UserProfileView from './components/userprofile'
import Home from './components/home'
import ProjectListView from './components/projectlist'
import CreateProfile from './components/createprofile';
import EditProfile from './components/createprofile';
import NavbarLoggedIn from './components/navbarloggedin';
import NavbarLoggedOut from './components/navbarloggedout';

function App() {
  return (<Router>
    <div className="App">
      <div>
      <img className="logo" src={logo} alt=""/>
      </div>
    
      <Switch>
        <Route exact path='/' component={NavbarLoggedOut} />
        <Route path="/sign-in" component={NavbarLoggedOut} />
        <Route path="/sign-up" component={NavbarLoggedOut} />
        <Route path="/home" component={NavbarLoggedIn} />
        <Route path="/password-change" component={NavbarLoggedIn} />
        <Route path="/user-profile" component={NavbarLoggedIn} />
        <Route path="/project-list" component={NavbarLoggedIn} />
        <Route path="/create-profile" component={NavbarLoggedIn} />
        <Route path="/edit-profile" component={NavbarLoggedIn} />
      </Switch>
      
      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/home" component={Home} />
            <Route path="/password-change" component={PasswordChange} />
            <Route path="/user-profile" component={UserProfileView} />
            <Route path="/project-list" component={ProjectListView} />
            <Route path="/create-profile" component={CreateProfile} />
            <Route path="/edit-profile" component={EditProfile} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;

