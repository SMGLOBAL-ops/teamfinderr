
const projects = [
  {
    _id: "0",
    title: "TeamFound", 
    description: "A front-end React.js mini project with Django back-end functionality for passionate coders to collaborate on inspiring projects", 
    members: [],
    roles: []
  },
  {
    _id: "1",
    title: "BNTA 2", 
    description: "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah 2",
    members: [],
    roles: []
  },
  {
    _id: "2",
    title: "BNTA 3", 
    description: "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah 3",
    members: [],
    roles: []
  },
];

export function getProjects() {
  return projects;
}

export function getProject(id) {
  return projects.find(p => p._id === id);
}
