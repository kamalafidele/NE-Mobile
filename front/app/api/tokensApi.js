import apiClient from "./client"

const generateToken = async (meterNumber, amount) => apiClient.post('/generate-token', { meterNumber, amount });
const validateToken = async (token) => apiClient.post('/validate-token', { token });
const fetchTokens = async (meterNumber) => apiClient.get(`/?meterNumber=${meterNumber}`);

export default {
    generateToken,
    validateToken,
    fetchTokens,
}
