import React, { Component } from "react";
import { getProjects } from '../services/ProjectService'
import img from './projects.png'
import '../styles.css'; 

import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class ProjectListView extends Component {

    state = { 
      projects: [],
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
              //console.log(res);
              //console.log(res.data);
              const projects = res.data;
              this.setState({projects});
              console.log(`current state of projects ${JSON.stringify(this.state.projects)}`);
          });
    }

    sendRequest = async (id) => {
      console.log(`id is passed ${id}`)
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
      <>                
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

      
      </>
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