import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import axios from "../api/axios";
import UserContext from "../context/UserContext";




const useFetch = (url, id) => {

    const {setClasses} = useContext(DataContext);
    
    const { setLoggedIn } = useContext(UserContext);
    const [isPending, setIsPending] = useState(true);
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState({
        body: "",
        type: ""
    });

    const closeMessage = () => {
        setMessageOpen(false);
    }
  

    useEffect(() => {

        const getClasses = async () => {

            const emptyData = [];

            try {

                let res = await axios.get(url, {
                    withCredentials: true
                });

                console.log(res);

                if(res.status === 200){

                    setClasses(res.data.classes);
                    setLoggedIn(res.data.logIn);
                    setIsPending(false);
                    
                }else if(res.status === 204){
                    setClasses(emptyData);
                    setLoggedIn(true);
                    setIsPending(false);
                    
                }
                else{
                    throw Error("Could not fetch the data for that resource");
                }

                
            } catch (error) {
                console.log(error.response.status);
                
                if(error.response.status === 401){
                    setIsPending(false);
                    setLoggedIn(false);
                    localStorage.removeItem("currentUser");
                    localStorage.setItem("isAuth", false);
                    
                }
                if(error.response.status === 404){
                    setIsPending(false);
                    setMessageOpen(true);
                    setMessage({...message, body: "Could not fetch the data for that resource", type: "error" });
                    
                }
                if(error.response.status === 500){
                    setIsPending(false);
                    setMessageOpen(true);
                    setMessage({...message, body: "Internal server error", type: "error" });
                   
                }
                
            }

            
    
        }

        getClasses();

    }, [setClasses, id, url, setLoggedIn, message]);

    return { isPending, messageOpen, message, closeMessage }
    
}

export default useFetch;