import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const API_URL = `${API_BASE_URL}/api/auth`;

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

export const forgotPassword = (email: string) => {
    return axios.post(`${API_URL}/forgot-password`, { email });
};

export const getProfile = () => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const resetPassword = (email: string, otp: string, newPassword: string) => {
    return axios.post(`${API_URL}/reset-password`, { email, otp, newPassword });
};
