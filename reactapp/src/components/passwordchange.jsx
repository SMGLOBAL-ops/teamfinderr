import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();

class PasswordChange extends Component {
    state = { 
        password: "",
        password2: "", 
    }

    handlePasswordChange = async (event) => {
        await this.setState({ password: event.target.value });
        }

    handlePasswordChange2 = async (event) => {
        await this.setState({ password2: event.target.value });
        }

    handleClick = async (event) => {
        event.preventDefault();

        const options = {
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": cookies.get("csrftoken"),
            }
          };

        await axios.post(`http://127.0.0.1:8000/api/v1/dj-rest-auth/password/change/`, 
        {   new_password1: this.state.password,
            new_password2: this.state.password2,
        }, options)
        .then(res => {
          console.log(res);
          console.log(res.data);

          if(res.status===201||200){
            console.log("Password changed successfully");
            this.props.history.push('/home');
          }
        }).catch((err) => {
            alert("Password not changed. Please check your passwords.")
            console.log(`Caught ${err}`);
            this.setState({error: "Credential conditions not met."})
        });
    }


    render() { 
        return(
            <>
            <form onSubmit={this.handleClick}>

                <h3>Change Password</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="username" className="form-control" placeholder="Enter username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={this.handlePasswordChange} className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" onChange={this.handlePasswordChange2} className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Submit</button>
            </form> 
            </>

        );
    }
}
 
export default PasswordChange;

// TO-DO 

