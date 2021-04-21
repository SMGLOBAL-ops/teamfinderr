import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class Home extends Component {

    state = {
        name: '',
        description: '',
        chars_left: 500,
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

    handleBioChange = event => {
        this.setState({ description: event.target.value });
        this.setState({
            chars_left: 500 - event.target.value.length
        });
        }

    handleNameChange = event => {
        this.setState({ name: event.target.value });
        }

    handleDescChange = event => {
        this.setState({ description: event.target.value });
        }

    createProjectSubmit = (event) => {
        event.preventDefault();

        const project = {
            name: this.state.name,
            description: this.state.description,

        }

        const options = {
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": cookies.get("csrftoken"),
            }
          };

        axios.post(`http://127.0.0.1:8000/api/v1/projects/`, { name: this.state.name, description: this.state.description }, options)
        .then(res => {
          console.log(res);
          console.log(res.data);

          if(res.status==201){
            console.log("Project added");
            this.props.history.push('/home');
          } else{
            console.log("Project not added.")
          }
        }).catch((err) => {
            console.log(err);
            this.setState({error: "Project not added."})
        });
      }
    
    render() {
        return (
            <>
        <div>
        <h1>Home</h1>
        <p>Welcome {}</p>
        <h4>Search</h4>
        <div class="input-group">
            
            <input type="text" class="form-control" placeholder="Find a member..." aria-label="" aria-describedby="basic-addon1"/>
            <div class="input-group-append">
                <button class="btn btn-success" type="button">Go</button>
            </div>
            
        </div>
        <br/>
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">My Projects</h4>
                <p class="card-text">
                    get existing projects as a list
                </p>
                <a href="#!" class="btn btn-primary btn-block">Go to my projects</a>
            </div>
        </div>
        <br/>
        <form>
            <h4>Create a project</h4>
            <div className="form-group">
                <label for="formGroupExampleInput">Project Name</label>
                <input type="text" onChange={this.handleNameChange.bind(this)} class="form-control" id="formGroupExampleInput" placeholder="Enter project name"/>
            </div>
            <div className="form-group">
                    <textarea rows = "5" cols = "60" name="bio" onChange={this.handleDescChange.bind(this)} 
                    className="form-control" >
                        Write description here ...
                    </textarea>
                </div>

                <p>Characters Left: {this.state.chars_left}</p>
            <button class="btn btn-success" onSubmit={() => this.createProjectSubmit()} type="submit">Submit</button>
        </form>
        <br/>
        <button class="btn btn-primary btn-block" onClick={() => this.projectList()} type="button">Join a new project</button>
        <br/>
        <button class="btn btn-primary btn-block" onClick={() => this.addBio()} type="button">Add Bio</button>
        <br/>
            

        </div>

        </>
        );
    }
}

