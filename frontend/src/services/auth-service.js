import axios from "axios";

const API_URL = "http://localhost:5000";

class AuthService {
    login = (email, password) => {
        return axios.post(`${API_URL}/users/login`, {email, password})
        .then(res => res)
        .catch(e => e)
    }

    logout = () => {
        
    }

    register = (email, username, password, avatar_url="") => {
        return axios.post(`${API_URL}/users/signup`, {email, username, password, avatar_url})
        .then(res => res)
        .catch(e => e)
    }
}

export default new AuthService();