import { create } from 'apisauce';

const apiClient = create({
    baseURL: 'http://192.168.8.178:7000/api/tokens',
    timeout: 1000000,
});

export default apiClient;
