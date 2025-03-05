import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
};

export const getRole = () => localStorage.getItem('role');
export const getToken = () => localStorage.getItem('token');
