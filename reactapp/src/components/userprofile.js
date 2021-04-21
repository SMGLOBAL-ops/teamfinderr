import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const categorys = [
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
        category: "",
        name:"",
     }

    componentDidMount = async () => {
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
            console.log(res.data);
            this.setState({user:res.data});
            console.log(`current state of user ${this.state.user}`);
            console.log(`current state of user_id ${this.state.user.pk}`);
        });

        var profileFiltered = this.state.profiles.filter(profile=> profile.user_id==this.state.user.pk)
        console.log(`profile filtered ${profileFiltered}`)
        await this.setState({userProfile:profileFiltered})
        console.log(`User profile is ${this.state.userProfile}`)
        
    }

    handleCategoryChange = (selectedCategory) => {
        this.setState({ category: selectedCategory.value });
        console.log('Category selected:', selectedCategory)
        }

    handleNameChange = event => {
        this.setState({ name: event.target.value });
        }

    handleSubmit = (event) => {
        event.preventDefault();
       
        //console.log(_csrfToken);

        const user = {
            category: this.state.category,
            name: this.state.name,

        }

        const options = {
            headers: {
                'Content-Type': 'application/json',
                //'Cookie' : `csrftoken=${_csrfToken}`,
                "X-CSRFToken": cookies.get("csrftoken"),
            }
          };

        console.log(user)

        axios.post(`http://127.0.0.1:8000/api/v1/profiles/${this.state.user.pk}/skills/`, { category: this.state.category, name: this.state.name }, options)
        .then(res => {
          console.log(res);
          console.log(res.data);

          if(res.status==200){
            console.log("Skill added");
            this.props.history.push('/user-profile');
          } else{
            console.log("Could not add skill.")
          }
        }).catch((err) => {
            console.log(err);
            this.setState({error: "Could not add skill after catching error."})
        });
        /*.then(() => {
            console.log(this.state)
            if (this.state.error===""){
                this.props.history.push('/home');
            }
        });
        */
      }

    render() { 
        const { selectedCategory } = this.state.category;
        return (
        <>
        <div>

            <div class="card">
                <img class="card-img-top" src="https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress" alt="Card image cap"/>
                <div class="card-body">
                    <h4 class="card-title">Bio</h4>
                    <p class="card-text">
                    </p>
                    <ul>
                        { this.state.userProfile.map(profile => <li>{profile.bio}</li>)}
                    </ul>
                    <a href="#!" onClick={this.getProfiles} class="btn btn-primary">Edit</a>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Skills</h4>
                    <p class="card-text">
                        get as a list
                    </p>
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
                                <input type="text" onChange={this.handleNameChange} class="form-control" placeholder="Name of skill"/>
                        </div>
                            <button type="submit" class="btn btn-dark btn-block">Submit</button>
                    </form>
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
