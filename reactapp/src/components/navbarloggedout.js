import React, { Component } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

export default class NavbarLoggedOut extends Component {
  redirectLogin = event => {
    event.preventDefault();
    this.props.history.push('/sign-in');
  }

  redirectRegistration = event => {
    event.preventDefault();
    this.props.history.push('/sign-up');
  }

  redirectProject = event => {
    event.preventDefault();
    this.props.history.push('/project-list');
  }
  
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <div className="navbar-brand">TeamFound inc.</div>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <li className="nav-link" onClick={this.redirectLogin}>Login</li>
                    </li>
                  <li className="nav-item">
                    <div className="nav-link" onClick={this.redirectRegistration}>Register</div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-link" onClick={this.redirectProject}>Projects</div>
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
