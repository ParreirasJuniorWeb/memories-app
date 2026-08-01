import axios from "axios";

const apiBaseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/";

axios.defaults.baseURL = apiBaseURL;

axios.defaults.headers.post["Content-Type"] = "application/json";

axios.defaults.timeout = 10000;

export default axios;
