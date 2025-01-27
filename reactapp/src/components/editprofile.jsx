import React, { Component } from "react";
import axios from "axios";
import bio2 from './bio2.png';
import Cookies from "universal-cookie";
const cookies = new Cookies();
  
export default class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
          bio: 'Edit bio here ...'
        };

        this.handleBioChange = this.handleBioChange.bind(this);
      }

    state = {
        bio: '',
        chars_left: 255,
        error: '',
        user: ''
      }

    componentDidMount = async() => {
        await axios.get(`http://127.0.0.1:8000/api/v1/dj-rest-auth/user/`,{ 
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": cookies.get("csrftoken"),
            }
        })
        .then(res => {
            this.setState({user:res.data});
        });
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

        const options = {
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": cookies.get("csrftoken"),
            }
          };

        console.log(options.headers["X-CSRFToken"])

        axios.put(`http://127.0.0.1:8000/api/v1/profiles/${this.state.user.pk}/`, { bio: this.state.bio }, options)
        .then(res => {
          console.log(res);
          console.log(res.data);

          if(res.status===201 || 200){
            alert("Bio updated");
            console.log("Bio updated");
            this.props.history.push('/user-profile');
          }
        }).catch((err) => {
            alert("Bio contains too many characters.")
            console.log("caught", err);
            this.setState({error: "Bio contains too many characters."})
        });
      }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <div class="card">
                    <img class="card-img-top" src={bio2} alt=""/>
                </div>
                <br/>

                <p>Please edit bio for your profile here! 
                    (Max. 255 chars.)</p>
               
                <div className="form-group">
                    <textarea rows = "5" cols = "60" name="bio" value={this.state.bio} onChange={this.handleBioChange} 
                    className="form-control" />
                </div>

                <p>Characters Left: {this.state.chars_left}</p>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Update Bio</button>
            </form>
        );
    }
}