import apiClient from "./client"

const login = async (email, password) => apiClient.post('/auth/login', { email, password });
const register = async (name, phone, email, password) => apiClient.post('/auth/register', { name, phone, email, password });

export default {
    login,
    register,
}
