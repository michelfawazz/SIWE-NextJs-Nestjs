import axios from 'axios';

//const BASE_URL = 'https://dolphin-app-ac48r.ondigitalocean.app/';

const BASE_URL = 'http://localhost:3002/';


export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});




