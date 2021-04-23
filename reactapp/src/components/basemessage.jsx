import React, { Component } from "react";
import '../App.css';
  
export default class Logo extends Component{


    render() {

  const text = ' Welcome to TeamFound!\n Collaboration in Dev Ops'; 
  
  let newText = text.split('\n').map(i => {
    return <h3>{i}</h3>
});

  return(

      <div className="base-message">
        <h3> 
         {newText}
        </h3>
      </div>
      
  );
}

}
