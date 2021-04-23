import React, { Component } from "react";

class PasswordReset extends Component {
    state = { 
        email: "", 
    }

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