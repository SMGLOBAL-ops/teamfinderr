import React, { Component } from "react";
import axios from "axios";
import imgp from './profile.png';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const categorys = [
    { value: '', label: 'Select' },
    { value: 'relationship', label: 'Relationship' },
    { value: 'communication', label: 'Communication' },
    { value: 'management', label: 'Management' },
    { value: 'analytical', label: 'Analytical' }, 
    { value: 'creative', label: 'Creative' },
    { value: 'technical', label: 'Technical' } 
  ];

export default class UserProfileView extends Component {
    state = { 
        profiles:[],
        user: "",
        userProfile: [],
        category: [],
        name:"",
        message:"",
     }

    componentDidMount = async () => {
        await axios.get(`http://127.0.0.1:8000/api/v1/profiles/`,{ 
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": cookies.get("csrftoken"),
            }
        })
        .then(res => {
            const profiles = res.data;
            this.setState({profiles});
        });

        await axios.get(`http://127.0.0.1:8000/api/v1/dj-rest-auth/user/`,{ 
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": cookies.get("csrftoken"),
            }
        })
        .then(res => {
            this.setState({user:res.data});
        });

        var profileFiltered = this.state.profiles.filter(profile=> profile.user_id===this.state.user.pk)
        this.setState({userProfile:profileFiltered})        
    }

    addBio(){
        console.log("add bio")
        this.props.history.push('/create-profile')
    }
    editBio(){
        console.log("edit bio")
        this.props.history.push('/edit-profile')
    }
    changePassword(){
        console.log("change password")
        this.props.history.push('/password-change')
    }

    handleCategoryChange = (selectedCategory) => {
        this.setState({ category: selectedCategory.target.value });

        console.log(`e-value ${selectedCategory.target.value}`)
        }

    handleNameChange = event => {
        this.setState({ name: event.target.value });
        }

    handleSubmit = async (event) => {
        event.preventDefault();

        const options = {
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": cookies.get("csrftoken"),
            }
          };
        

        await axios.post(`http://127.0.0.1:8000/api/v1/profiles/${this.state.user.pk}/skills/`, { category: this.state.category, name: this.state.name }, options)
        .then(res => {
          if(res.status===200||201){
            alert("Skill has been successfully added")
            console.log("Skill added");
          }
        }).catch((err) => {
            alert("Could not add skill. Please select category and input name")
            console.log("caught", err);
            this.setState({error: "Could not add skill."})
        });
  
      }

    render() { 

        const message = this.state.message;
        const skills = this.state.userProfile;

        let listOfSkills;
        for (let i of skills){
            listOfSkills = i.skills.map((x)=>
                <li>{x}</li>
            );
        }
        return (
        <>
        <div>
            <div class="card">
                <img class="card-img-top" src={imgp} alt=""/>
                <div class="card-body">
                    <h4 class="card-title">Bio</h4>
                    <p class="card-text">
                    </p>
                    <ul>
                        { this.state.userProfile.map(profile => <li>{profile.bio}</li>)}
                    </ul>
                    <a onClick={() => this.addBio()} class="btn btn-dark">Add Bio</a>
                    <a onClick={() => this.editBio()} class="btn btn-dark">Edit Bio</a>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Skills</h4>
                    <p class="card-text">
                        Current skills
                    </p>
                    <ul>
                        {listOfSkills}
                    </ul>
                    <form onSubmit={this.handleSubmit}>
                        <div class="form-group">
                            <label for="Select">Choose skills</label>
                            <select value={this.state.category} id="Select" class="form-control" onChange={this.handleCategoryChange} >
                                {categorys.map(category => 
                                    <option value={category.value}>{category.label}</option>
                                )}
                            </select>
                        </div>
                        <div class="form-group">
                                <label for="Name">Name:</label>
                                <input type="text" onChange={this.handleNameChange} class="form-control" placeholder="Enter name of skill ie Python"/>
                        </div>
                            <button type="submit" class="btn btn-dark btn-block">Add a skill</button>
                            <p>{message}</p>
                    </form>
                </div>
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Settings</h4>
                    <p class="card-text"></p>
                    <a onClick={() => this.changePassword()} class="btn btn-dark btn-block">Change Password</a>
                </div>
            </div>


            </div>
                                   
        </div>

        </>
        );
    }
}


// TODO
// Get user profile bio details
// Get user skills
// add edit hyperlink to edit bio and skills 
// {/* <ul>
//     { this.state.profiles.map(profile => <li>{profile.username}</li>)}
// </ul> */}
// {/* <ul>
//                         { this.state.userProfile.map(profile => <li>{profile.skills}</li>)}
//                     </ul> */}