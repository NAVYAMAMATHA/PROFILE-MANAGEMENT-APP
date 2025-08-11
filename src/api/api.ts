import axios from "axios";
const baseURL=process.env.REACT_APP_API_BASE_URL ?? "http://localhost:4000";
const api=axios.create({baseURL,headers:{"Content-Type":"application/json"},
timeout:12000});
export default api;