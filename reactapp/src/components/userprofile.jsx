import React, { Component } from "react";

class UserProfileView extends Component {
    state = {  }
    render() { 
        return (
        <>
        <div>

<<<<<<< HEAD:reactapp/src/components/userprofile.js
            <div className="card">
                <img className="card-img-top" src="/images/pathToYourImage.png" alt="Card image cap"/>
                <div className="card-body">
                    <h4 className="card-title">Bio</h4>
                    <p className="card-text">
=======
            <div class="card">
                <img class="card-img-top" src="/images/pathToYourImage.png" alt="Card cap"/>
                <div class="card-body">
                    <h4 class="card-title">Bio</h4>
                    <p class="card-text">
>>>>>>> 27e2fbf61e4a4e801aebf03200c7d5d001dbfb24:reactapp/src/components/userprofile.jsx
                        get bio
                    </p>
                    <a href="#!" className="btn btn-primary">Edit</a>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Skills</h4>
                    <p className="card-text">
                        get as a list
                    </p>
                    <a href="#!" className="btn btn-primary">Edit</a>
                </div>
            </div>

        </div>

        </>
        );
    }
}
 
export default UserProfileView;


// TODO
// Get user profile bio details
// Get user skills
// add edit hyperlink to edit bio and skills 

