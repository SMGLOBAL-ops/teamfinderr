import React, { Component } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
  

export default class NavbarLoggedOut extends Component{
  redirectHome = event => {
    event.preventDefault();
    this.props.history.push('/home');
  }
  redirectMyProject = event => {
    event.preventDefault();
    this.props.history.push('/tutorials');
  }
  redirectProfile = event => {
    event.preventDefault();
    this.props.history.push('/user-profile');
  }
  redirectProjects = event => {
    event.preventDefault();
    this.props.history.push('/project-list');
  }

  handleLogout = (event) => {
    event.preventDefault();

    const options = {
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": cookies.get("csrftoken"),
        }
      };
    console.log(cookies.get("csrftoken"))
    axios.post(`http://127.0.0.1:8000/api/v1/dj-rest-auth/logout/`,{   },options)
    .then(res => {
      console.log(res);
      console.log(res.data);

      if(res.status===200){
        console.log("Logout successful");
        this.props.history.push('/sign-in');
      } else{
        console.log("Logout failed.")
      }
    }).catch((err) => {
        console.log(err);
        this.setState({error: "Logout failed."})

    
    });
  }

  render() {
    return(
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="navbar-brand">TeamFound inc.</div>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <div className="nav-link" onClick={this.redirectHome}>Home</div>
              </li>
              <li className="nav-item">
                <div className="nav-link" onClick={this.redirectMyProject}>My Projects</div>
              </li>
                <li className="nav-item">
                <div className="nav-link" onClick={this.redirectProfile}>Profile</div>
                </li>
              <li className="nav-item">
              <div className="nav-link" onClick={this.redirectProjects}>Projects</div>
              </li>
              <li className="nav-item">
              <div className="nav-link" onClick={this.handleLogout}>Logout</div>
              </li>

            </ul>
          </div>
        </div>
        <div>
        </div>
      </nav>
    );
  }
  
}
