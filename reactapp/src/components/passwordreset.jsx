import React, { Component } from "react";
import Cookies from "universal-cookie";
//import axios from "axios";
//const cookies = new Cookies();

class PasswordReset extends Component {
    state = { 
        email: "", 
    }

    // handlePasswordChange = async (event) => {
    //     await this.setState({ email: event.target.value });
    //     //console.log(`password1 ${this.state.password}`)
    //     }


    // handleClick = async (event) => {
    //     event.preventDefault();

    //     const options = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "X-CSRFToken": cookies.get("csrftoken"),
    //         }
    //       };

    //     await axios.post(`http://127.0.0.1:8000/api/v1/dj-rest-auth/password/change/`, 
    //     {   email: this.state.email,
    //     }, options)
    //     .then(res => {
    //       console.log(res);
    //       console.log(res.data);

    //       if(res.status===201||200){
    //         console.log("Email has been submitted");
    //         this.props.history.push('/home');
    //       } else{
    //         console.log("Email address has not been found, please check your email address.")
    //       }
    //     }).catch((err) => {
    //         console.log(err);
    //         this.setState({error: "Certain conditions not met."})
    //     });
    // }


    render() { 
        return(
            <>
            <form onSubmit="{this.handleClick}">

                <h3>Forgot Password?</h3>
                <p>Please enter your email address below and we will send you an email to reset your password</p>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" onChange="{this.handlePasswordChange}" className="form-control" placeholder="Enter email address" />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Submit</button>
            </form> 
            </>

        );
    }
}
 
export default PasswordReset;