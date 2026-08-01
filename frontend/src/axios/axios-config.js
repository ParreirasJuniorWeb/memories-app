import axios from "axios";

axios.defaults.baseURL = "https://memories-app-7tnf.onrender.com/" || "http://localhost:3000/";

axios.defaults.headers.post["Content-Type"] = "application/json";

axios.defaults.timeout = 10000;

export default axios;
