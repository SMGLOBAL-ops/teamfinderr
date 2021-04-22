import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
  
export default class CreateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
          bio: 'Write bio here ...'
        };

        this.handleBioChange = this.handleBioChange.bind(this);
      }

    state = {
        bio: '',
        chars_left: 255,
        error: ''
      }

    redirectHome = event => {
        event.preventDefault();
        this.props.history.push('/home');
    }

    handleBioChange = event => {
        this.setState({ bio: event.target.value });
        this.setState({
            chars_left: 255 - event.target.value.length
        });
        }

    handleSubmit = (event) => {

        event.preventDefault();
        
        console.log(this.state.bio)

        // const profile = {
        //     bio: this.state.bio,
        // }

        const options = {
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": cookies.get("csrftoken"),
            }
          };

        console.log(options.headers["X-CSRFToken"])

        axios.post(`http://127.0.0.1:8000/api/v1/profiles/`, { bio: this.state.bio }, options)
        .then(res => {
          console.log(res);
          console.log(res.data);

          if(res.status===201 || 200){
            console.log("Bio updated");
            this.props.history.push('/home');
          } else{
            console.log("Bio contains too many characters.")
          }
        }).catch((err) => {
            console.log(err);
            this.setState({error: "Bio contains too many characters."})
        });
      }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <h3>Bio</h3>

                <p>Please add a short bio for your profile here so 
                    that others can see what your skills and interests are! 
                    (Max. 255 chars.)</p>
               
                <div className="form-group">
                    <textarea rows = "5" cols = "60" name="bio" value={this.state.bio} onChange={this.handleBioChange} 
                    className="form-control" />
                </div>

                <p>Characters Left: {this.state.chars_left}</p>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Add Bio</button>
            </form>
        );
    }
}