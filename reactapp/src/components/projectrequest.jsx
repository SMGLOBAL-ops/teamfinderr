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

     constructor(props) {
        super(props);
    }


    componentDidMount = async () => {
        //console.log("UserProfile calledddddd")
        await axios.get(`http://127.0.0.1:8000/api/v1/profiles/`,{ 
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": cookies.get("csrftoken"),
            }
        })
        .then(res => {
            //console.log(res);
            //console.log(res.data);
            const profiles = res.data;
            this.setState({profiles});
            console.log(`current state of profiles ${this.state.profiles}`);
        });

        await axios.get(`http://127.0.0.1:8000/api/v1/dj-rest-auth/user/`,{ 
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": cookies.get("csrftoken"),
            }
        })
        .then(res => {
            //console.log(res.data);
            this.setState({user:res.data});
            //console.log(`current state of user ${this.state.user}`);
            //console.log(`current state of user_id ${this.state.user.pk}`);
        });

        var profileFiltered = this.state.profiles.filter(profile=> profile.user_id===this.state.user.pk)
        //console.log(`profile filtered ${profileFiltered}`)
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
    handleMessageChange = event => {
        this.setState({ message: event.target.value });
        }

    handleSubmit = async (event) => {
        event.preventDefault();

        const options = {
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": cookies.get("csrftoken"),
            }
          };
        

        await axios.post(`http://127.0.0.1:8000/api/v1/projects/${this.state.project_pk}/members/`, { category: this.state.category, name: this.state.name, message: this.state.message }, options)
        .then(res => {
          console.log(res);
          console.log(res.data);

          if(res.status===200||201){
            alert("Request has been successfully made")
            console.log("Submitted request successfully");
          } else{
            console.log("Could not request.")
            console.log(res.status)
          }
        }).catch((err) => {
            alert("Could not request. Please select category and input name")
            console.log("caught", err);
            this.setState({error: "Could not add request."})
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

        const id = this.props.match;
        console.log(`id is ${JSON.stringify(id)}`);

        return (
        <> <div>
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
                        <div class="form-group">
                                <label for="Message">Message:</label>
                                <input type="text" onChange={this.handleMessageChange} class="form-control" placeholder="Enter message for the group"/>
                        </div>
                            <button type="submit" class="btn btn-dark btn-block">Add a skill</button>
                            <p>{message}</p>
                    </form>
                </div> 
            </div>
                                   
        </div>

        </>
        );
    }
}