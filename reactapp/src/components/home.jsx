import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          description: 'Write description here ...'
        };

        this.handleDescChange = this.handleDescChange.bind(this);
      }

    state = {
        name: '',
        profiles:[],
        userProfile: [],
        description: '',
        chars_left: 500,
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

        var profileFiltered = this.state.profiles.filter(profile=> profile.user_id==this.state.user.pk)
        this.setState({userProfile:profileFiltered})

        
    }


    handleClick() {
        this.props.history.push('/sign-in');
    }

    projectList(){
        this.props.history.push('/project-list')
    }

    addBio(){
        this.props.history.push('/create-profile')
    }

    redirectMyProject = event => {
        event.preventDefault();
        this.props.history.push('/my-projects');
      }

    handleDescChange = async (event) => {
        await this.setState({ description: event.target.value });
        await this.setState({
            chars_left: 500 - event.target.value.length
        });
        }

    handleNameChange = async (event) => {
        await this.setState({ name: event.target.value });
        }

    handleProjectSubmit = async (event) => {
        event.preventDefault();

        const user = {
            name: this.state.name,
            description: this.state.description,

        }

        const options = {
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": cookies.get("csrftoken"),
            }
          };

        await axios.post(`http://127.0.0.1:8000/api/v1/projects/`, { name: this.state.name, description: this.state.description }, options)
        .then(res => {
          console.log(res);
          console.log(res.data);

          if(res.status!==404){
            //this.props.history.push('/home');
            console.log("Project added");
          } else{
            console.log("Project not added.")
            console.log(res.status)
          }
        }).catch((err) => {
            alert("Project not added")
            console.log(err);
            this.setState({error: "Project not added"})
        });
      }
    
    render() {
        return (
            <>
        <div>
            <div class="card">
                <img class="card-img-top" src="https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress" alt="Card image cap"/>
            </div>
            <br/>
        <h1>Home</h1>
        {/* <p>Welcome</p> */}
        {/* <h4>Search</h4>
        <div className="input-group">
            
            <input type="text" className="form-control" placeholder="Find a member..." aria-label="" aria-describedby="basic-addon1"/>
            <div className="input-group-append">
                <button className="btn btn-success" type="button">Go</button>
            </div>
            
        </div> */}
        {/* <br/> */}
        {/* <div className="card">
            <div className="card-body">
                <h4 className="card-title">My Projects</h4>
                <p className="card-text">
                    get existing projects as a list
                </p>
                <a href="#!" onClick={this.redirectMyProject} className="btn btn-primary btn-block">Go to my projects</a>
            </div>
        </div>
        <br/> */}
        <form onSubmit={this.handleProjectSubmit}>
            <h4>Create a project</h4>
            <div className="form-group">
                <label htmlFor="formGroupExampleInput">Project Name</label>
                <input type="text" onChange={this.handleNameChange} className="form-control" id="formGroupExampleInput" placeholder="Enter project name"/>
            </div>
            <div className="form-group">
                    <label htmlFor="formGroupExampleInput">Description</label>
                    <textarea rows = "5" cols = "60" name="description" description={this.state.description} onChange={this.handleDescChange} 
                    className="form-control" />
                     
                </div>

                <p>Characters Left: {this.state.chars_left}</p>
            <button className="btn btn-success" type="submit">Submit</button>
        </form>
        <br/>
        <button className="btn btn-primary btn-block" onClick={() => this.projectList()} type="button">Join a new project</button>
        <br/>
        <button className="btn btn-primary btn-block" onClick={() => this.addBio()} type="button">Add Bio</button>
        <br/>
            

        </div>

        </>
        );
    }
}

