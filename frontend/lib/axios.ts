import axios from 'axios';


const BASE_URL = process.env.BACKEND_URL || "https://xborg-tech-challenge-production.up.railway.app/"


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




