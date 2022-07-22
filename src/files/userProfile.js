import axios from "../api/axios";



 export const setCurrentUser = async () => {
    let userData = await axios.get('https://immediate-server.herokuapp.com/user', {
        withCredentials: true
    });
    return userData;
    
};


 export const getUserProfile= async (id) => {

    let profile = await axios.get(`https://immediate-server.herokuapp.com/${id}/check-profile`, {
        withCredentials: true
    });

    return profile;    
    
};