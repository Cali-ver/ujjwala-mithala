import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const register = (name: string, username: string, email: string, password: string) => {
    return axios.post(`${API_URL}/register`, {
        name,
        username,
        email,
        password
    });
};

export const login = (usernameOrEmail: string, password: string) => {
    return axios.post(`${API_URL}/login`, {
        usernameOrEmail,
        password
    });
};
