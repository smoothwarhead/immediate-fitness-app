import axios from "../api/axios";



 export const setCurrentUser = async () => {
    let userData = await axios.get('/user', {
        withCredentials: true
    });
    return userData;
    
};


 export const getUserProfile= async (id) => {

    let profile = await axios.get(`/${id}/check-profile`, {
        withCredentials: true
    });

    return profile;    
    
};