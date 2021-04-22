import React, { Component } from "react";

import img from './projects.png'
import '../styles.css';
import {
  BrowserRouter as Router,
} from "react-router-dom"; 

import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class ProjectListView extends Component {

    state = { 
      projects: [],
      profiles:[],
      user: "",
      userProfile: [],
      category: [],
      name:"",
      message:"",
      currentProject:[],
     }; 

     componentDidMount = async () => {
        console.log("Projects calledddddd")

        await axios.get(`http://127.0.0.1:8000/api/v1/projects/`,{ 
          headers: {
              'Content-Type': 'application/json',
              "X-CSRFToken": cookies.get("csrftoken"),
          }
        })
        .then(res => {
              const projects = res.data;
              this.setState({projects});
              //console.log(`current state of projects ${JSON.stringify(this.state.projects)}`);
          });
        
        await axios.get(`http://127.0.0.1:8000/api/v1/profiles/`,{ 
          headers: {
              'Content-Type': 'application/json',
              "X-CSRFToken": cookies.get("csrftoken"),
          }
        })
        .then(res => {
            const profiles = res.data;
            this.setState({profiles});
            //console.log(`current state of profiles ${this.state.profiles}`);
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

    sendRequest = async (id) => {
      console.log(`id is passed ${id}`)
      const message = `Hi, I am interested in joining your project`
      const newArray = this.state.userProfile.map(x=>x.skills);

      const options = {
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": cookies.get("csrftoken"),
        }
      };
      console.log(`project pk ${id}`)
      console.log(`userProfile ${JSON.stringify(this.state.userProfile)}`)
      console.log(`userProfile.skills ${JSON.stringify(newArray[0].toString())}`)
      
      //const role = name:"", category: "relationship";

      await axios.get(`http://127.0.0.1:8000/api/v1/projects/${id}/`,{ 
          headers: {
              'Content-Type': 'application/json',
              "X-CSRFToken": cookies.get("csrftoken"),
          }
        })
        .then(res => {
              const project = res.data;
              this.setState({currentProject:project});
              console.log(`current project ${JSON.stringify(this.state.currentProject)}`);
          });

      await axios.post(`http://127.0.0.1:8000/api/v1/projects/${id}/members/`, {user: this.state.userProfile, message: message, role:{name:"Python", category: "relationship"}}, options)
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
      const { length: count }  = Object.keys(this.state.projects);
  
      if (count === 0) return <p>There are no projects available in the database!</p>
      //console.log(`count is ${count}`)

      const projects = this.state.projects;
      //const table  = 
      console.log(`projects are ${projects}`)

      let listOfProjects = projects.map(project => 
      <tr key={project.id}>
          <td>{project.name}</td>
          <td>{project.description}</td>
          <td>{project.members}</td>
          <td><button onClick={()=>this.sendRequest(project.id)} className="btn btn-success btn-sm">Join</button></td>
        </tr>
      )

      // for (let i of projects){
      //   listOfProjects = i.map((x)=>
      //     <li>{x.name}</li>
      //   );
      // }


      console.log(`list of projects is ${listOfProjects}`)
      // let listOfSkills;
        // for (let i of skills){
        //     listOfSkills = i.skills.map((x)=>
        //         <li>{x}</li>
        //     );
        // }

      //console.log(`table is ${table}`)

      return (
      <Router>                
        <div class="card">
            <img class="card-img-top" src={img} alt=""/>
        </div>

        <p>Showing {count} projects in the database</p>
        
       <table className="table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Description</th>
            <th>Member's id</th>
            <th>Join</th>
          </tr>
        </thead>
          <tbody>
              {listOfProjects}
          </tbody>
      </table>

      </Router>
      )}
  }
   
  export default ProjectListView;
  

/*
  
export default class ProjectListView extends Component {

    state = {
        projects: [],
        project: {},
        isProjectViewOn: false,
        sortValue: '',
        inputValue: '',

    }

    projectList(){
        this.props.history.push('/project-list')
    }

    fetchProjects = async () => {
    const { data } = await axios.get(
        "http://127.0.0.1:8000/api/v1/projects/"
    );
    console.log(data);
    return { data };
    };


    
    render() {
        return (
        <>
            <div  onLoad = {this.fetchProjects}>
                <h1>Projects</h1>
               
                <br/>
                <h4>Search</h4>
                <div class="input-group">
                    
                    <input type="text" class="form-control" placeholder="Find a project..." aria-label="" aria-describedby="basic-addon1"/>
                    <div class="input-group-append">
                        <button class="btn btn-success" type="button">Go</button>
                    </div>
                    
                </div>
                <br/>
                <p>sort get request here - each item in list in container with join button</p>
                <br/>

            </div>

        </>
        );
    }
}
*/

{/* <tbody>
          { this.state.projects.map(project => <tr key={project._id}>
            <td>{project.title}</td>
            <td>{project.description}</td>
            <td>{project.members}</td>
            <td>{project.roles}</td>
            <td><button onClick={() => console.log("function to join project to User profile of projects")} className="btn btn-success btn-sm">Join Project</button></td>
            <td><button onClick={() => this.handleDelete(project)} className="btn btn-danger btn-sm m-2">Delete</button></td>
          </tr>)}
          
        </tbody> */}