import axios from "axios";
import config from "./config";

axios.defaults.baseURL = config.server;

export default axios;
