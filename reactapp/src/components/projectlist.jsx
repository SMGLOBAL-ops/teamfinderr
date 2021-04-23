import React, { Component } from "react";
import img from './projects.png'
import '../styles.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
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
        await axios.get(`http://127.0.0.1:8000/api/v1/projects/`,{ 
          headers: {
              'Content-Type': 'application/json',
              "X-CSRFToken": cookies.get("csrftoken"),
          }
        })
        .then(res => {
              const projects = res.data;
              this.setState({projects});
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
      

      await axios.get(`http://127.0.0.1:8000/api/v1/projects/${id}/`,{ 
          headers: {
              'Content-Type': 'application/json',
              "X-CSRFToken": cookies.get("csrftoken"),
          }
        })
        .then(res => {
              const project = res.data;
              this.setState({currentProject:project});
          });

      await axios.post(`http://127.0.0.1:8000/api/v1/projects/${id}/members/`, {name:"Python", category: "relationship"}, options)
        .then(res => {
          console.log(res);
          console.log(res.data);

          if(res.status===200||201){
            alert("Request has been successfully made")
            console.log("Submitted request successfully");
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

      let listOfProjects = projects.map(project => 
      <tr key={project.id}>
          <td>{project.name}</td>
          <td>{project.description}</td>
          <td>{project.members}</td>
          <td><button onClick={()=>this.sendRequest(project.id)} className="btn btn-success btn-sm">Join</button></td>
        </tr>
      )

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
  