import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": cookies.get("csrftoken"),
  }
});