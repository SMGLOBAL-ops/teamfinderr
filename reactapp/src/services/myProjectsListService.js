import http from "../http-common";

const getAll = () => {
  return http.get("/v1/projects/");
};

const get = (id) => {
  return http.get(`/v1/projects/${id}`);
};

const getUser = (id) => {
  return http.get(`/v1/profiles/${id}`);
};
const update = (id, data) => {
  return http.put(`/v1/projects/${id}/`, data);
};

const remove = (id) => {
  return http.delete(`/v1/projects/${id}/`);
};

const findByName = (project_pk) => {
  return http.get(`/api/v1/projects/${project_pk}/members/`);
};

const MyProjectsListService = {
  getAll,
  getUser,
  get,
  update,
  remove,
  findByName,
};

export default MyProjectsListService;