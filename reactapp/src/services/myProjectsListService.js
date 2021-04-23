import http from "../http-common";

const getAll = () => {
  return http.get("/v1/projects/");
};

const get = (id) => {
  return http.get(`/v1/projects/${id}/`);
};


const getUserProjects = (profile_pk) => {
  return http.get(`/v1/profiles/${profile_pk}/projects/`);
};

const getUser = () => {
  return http.get(`/v1/dj-rest-auth/user/`);
};

const update = (id, data) => {
  return http.put(`/v1/projects/${id}/`, data);
};

const remove = (id) => {
  return http.delete(`/v1/projects/${id}/`);
};

const findByName = (profile_pk) => {
  return http.get(`/v1/profiles/${profile_pk}/projects/`);
};

const MyProjectsListService = {
  getAll,
  getUser,
  getUserProjects,
  update,
  get,
  remove,
  findByName,
};

export default MyProjectsListService;