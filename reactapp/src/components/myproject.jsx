import React, { useState, useEffect } from "react";
import MyProjectsListService from "../services/myProjectsListService";

const MyProject = props => {
  const initialMyProjectState = {
    id: null,
    name: "",
    description: "",
  };
  const [currentMyProject, setCurrentMyProject] = useState(initialMyProjectState);
  const [message, setMessage] = useState("");

  const getMyProject = id => {
    MyProjectsListService.get(id)
      .then(response => {
        setCurrentMyProject(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getMyProject(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentMyProject({ ...currentMyProject, [name]: value });
  };

  const updateid = status => {
    var data = {
      id: currentMyProject.id,
      title: currentMyProject.title,
      description: currentMyProject.description,
    };

    MyProjectsListService.update(currentMyProject.id, data)
      .then(response => {
        setCurrentMyProject({ ...currentMyProject, id: status });
        console.log(response.data);
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateMyProject = () => {
    MyProjectsListService.update(currentMyProject.id, currentMyProject)
      .then(response => {
        console.log(response.data);
        setMessage("The MyProject was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteMyProject = () => {
    MyProjectsListService.remove(currentMyProject.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/my-projects");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentMyProject ? (
        <div className="edit-form">
          <h4>Update Project</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentMyProject.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentMyProject.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Owner id (Your id)</label>
              <input
                type="text"
                className="form-control"
                id="id"
                name="id"
                value={currentMyProject.id}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteMyProject}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateMyProject}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Project...</p>
        </div>
      )}
    </div>
  );
};

export default MyProject;


