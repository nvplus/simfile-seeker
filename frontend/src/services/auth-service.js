import axios from "axios";

const API_URL = "http://localhost:5000";

class AuthService {
    verifyToken = (token) => {
        return axios.get(`${API_URL}/auth`, {headers: {"x-access-token":token}}).then(res => {
            return res;
        })
    }

    login = (email, password) => {
        return axios.post(`${API_URL}/auth/login`, {email, password})
        .then(res => {
            if (res.data.auth && res.data.result.token)
                localStorage.setItem('token', `Bearer ${res.data.result.token}`)

            return res;
        })
        .catch(e => e)
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    register = (email, username, password, avatar_url="") => {
        return axios.post(`${API_URL}/auth/signup`, {email, username, password, avatar_url})
        .then(res => res)
        .catch(e => e)
    }
}

export default new AuthService();