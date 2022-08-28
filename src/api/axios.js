import Axios from 'axios';

const BASE_URL = "https://immediate-server.herokuapp.com"


export default Axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }, 
    withCredentials: true
});

export const axiosPrivate =  Axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }, 
    withCredentials: true
});
