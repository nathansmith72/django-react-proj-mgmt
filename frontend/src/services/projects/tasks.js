import axios from "axios";
import authHeader from "../auth/authHeader"

const ROOT_URL = process.env.REACT_APP_API_URL;

class TaskService {
    getTasks() {
        return axios.get(
            ROOT_URL + "/api/tasks/",
            {headers: authHeader()}
        ).then(response => {
            return response.data;
        })
    }
}

export default new TaskService();