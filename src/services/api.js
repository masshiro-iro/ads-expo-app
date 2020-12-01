import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ads-rails-api.herokuapp.com/api/v1',
    timeout: 2000
});

export default api;