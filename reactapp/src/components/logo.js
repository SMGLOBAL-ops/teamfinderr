import React, { Component } from "react";
import '../App.css';
import logo from '../logo.jpeg';
  

export default class Logo extends Component{

  render() {
    return(
        <div>
        <img className="logo" src={logo} alt="TeamFound"/>
        </div>
    );
  }
  
}
