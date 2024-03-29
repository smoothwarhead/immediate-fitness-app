import { useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../files/userProfile';
import UserContext from './UserContext';
import axios from '../api/axios';





export default function  useAuth() {
    
    const { setUser, setLoggedIn } = useContext(UserContext);
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState({
        body: "",
        type: ""
    });
    const [isPending, setIsPending] = useState(false);

    const closeMessage = () => {
        setMessageOpen(false);
    }
    
    const navigate = useNavigate();
   

    // set user after register
    const register = async (data) => {

        let res = await axios.post('/register', 
            JSON.stringify(data),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            })


        try{

            console.log(res);
                 
            if(res.status === 201){                

                setMessageOpen(true);              
                setMessage({...message, body: res.data.message, type: "success" });

                let {data: resData} = await setCurrentUser();

                

                if(resData.user.length > 0){
                    

                    setUser(resData.user[0]);
                    setLoggedIn(resData.logIn);

                    localStorage.setItem("currentUser", JSON.stringify(resData.user[0]) );
                    localStorage.setItem("isAuth", resData.logIn);

                    
                    setTimeout(() => {
                        setIsPending(true);
                        navigate('/auth/options');


                    }, 2000)
                  

                }else{

                    localStorage.setItem("isAuth", resData.logIn);
                    setMessageOpen(true);              
                    setMessage({...message, body: res.data.message, type: "error" });
                    navigate('/');


                }

               

               
            }

         
            
        }
        catch(error){
            
           
            setIsPending(false);

            if(error.response){

                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);

                if(error.response.status === 400){
                    setMessageOpen(true);
                    setMessage({...message, body: "This user already exists !!!", type: "error" });
    
                }
                if(error.response.status === 401){
                   
                    setLoggedIn(false);
                    localStorage.removeItem("currentUser");
                    localStorage.setItem("isAuth", false);
                    
                }
                if(error.response.status === 404){
                    setMessageOpen(true);
                    setMessage({...message, body: "User does not exist. Please provide the correct email and password", type: "error" });
                    
                }
                if(error.response.status === 500){
                    setMessageOpen(true);
                    setMessage({...message, body: "Interval server error !!!", type: "error" });
                   
                }
                if(error.response.status === 503){
                    setMessageOpen(true);
                    setMessage({...message, body: "Inconsistent network !!!", type: "error" });
                   
                }

            }else if(error.request){
                console.log(error.request);
            }else{
                console.log('Error', error.message);
            }
           
        }


    }

    // set user after login
    const login = async (data) => {


        try{

            let res = await axios.post('/login', 

                JSON.stringify(data),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                })

                 
            if(res.status === 200){                
                setMessageOpen(true);              
                setMessage({...message, body: res.data.message, type: "success" });

                let { data: resData } = await setCurrentUser();


                if(resData.user.length > 0){
                    
                    setUser(resData.user[0]);
                    setLoggedIn(resData.logIn);

                    localStorage.setItem("currentUser", JSON.stringify(resData.user[0]) );
                    localStorage.setItem("isAuth", resData.logIn);

                    setTimeout(() => {
                        setIsPending(true);
                        navigate(`/auth/dashboard/${resData.user[0].role.toLowerCase()}`);
                    }, 2000);
                  
                }else{

                    localStorage.setItem("isAuth", false);
                    setMessageOpen(true);
                    setMessage({...message, body: "User does not exist. Please provide the correct email and password", type: "error" });
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                    
                }


               
            }
            else{
                
                setMessageOpen(true);
                setMessage({...message, body: "User does not exist. Please provide the correct email and password", type: "error" });
                setLoggedIn(res.data.logIn);


            }
            
        }
        catch(error){
            
            if(error.response.status === 400){
               
                setMessageOpen(true);
                setMessage({...message, body: "Incorrect email or password combination !!!", type: "error" });

            }
            if(error.response.status === 401){
                
                setLoggedIn(false);
                localStorage.removeItem("currentUser");
                localStorage.setItem("isAuth", false);
                
            }
            if(error.response.status === 404){
               
                setMessageOpen(true);
                setMessage({...message, body: "User does not exist. Please provide the correct email and password", type: "error" });
                
            }
            if(error.response.status === 500){
                
                setMessageOpen(true);
                setMessage({...message, body: "Incorrect email or password combination !!!", type: "error" });
               
            }
            if(error.response.status === 503){
                
                setMessageOpen(true);
                setMessage({...message, body: "Inconsistent network !!!", type: "error" });
               
            }
        }
    }
   
    
   

    // log user out
    const logoutUser = async () => {

        try {

            let res = await axios.get('/logout', {
                withCredentials: true
            });
    
            
            if(res.status === 200){

                localStorage.removeItem("currentUser");
                localStorage.removeItem("isAuth");
                localStorage.clear();

                setUser(null);
                setLoggedIn(false);

                // setLoggedIn(res.data.logIn);
                navigate('/');
                
            }

            if(res.status === 304){

                setUser(null);
                setLoggedIn(false);

                localStorage.removeItem("currentUser");
                localStorage.removeItem("isAuth");

                navigate('/');
                
            }
            
        } catch (error) {
            
            setMessageOpen(true);
            setMessage({...message, body: error.response.data.message, type: "error" });
            
        }
    };




    return {
        register, logoutUser, login, message, messageOpen, closeMessage, isPending, setIsPending
    }
}