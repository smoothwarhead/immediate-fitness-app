
import Client from '../components/client/Client';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import axios from '../api/axios';
import DashboardLayout from '../components/DashboardLayout';
import LoadingData from '../components/LoadingData';
import MessageBox from '../components/MessageBox';



const Clients = () => {

    const { setLoggedIn } = useContext(UserContext);
    const [clients, setClients] = useState([]);
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

        const getClients = async() => {

            const emptyClients = [];

            try {
                

                let res = await axios.get('https://immediate-server.herokuapp.com/auth/dashboard/trainer/clients', {
                    withCredentials: true
                });

                console.log(res);

                if(res.status === 200){

                    setIsPending(false);
                    setClients(res.data.clients);
                    setLoggedIn(res.data.logIn);

                }else if(res.status === 204){
                    setIsPending(false);
                    setClients(emptyClients);
                    setLoggedIn(true);
                    

                }else if(res.status === 401){
                    setLoggedIn(false);
                }
                
                else{
                    throw Error("Could not fetch the data for that resource");
                }


                
            } catch (error) {
                console.log(error.response);
                setIsPending(false);
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

        getClients();
        
        
    }, [setLoggedIn, message]);

    return (  
        <>
            { isPending && <LoadingData /> }

            {isPending ? <div></div> :
    
            
                <DashboardLayout>
                    
                        
                    <div className="entity_content_container">

                        {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }


                        <div className="clients_container">
                            {clients.length === 0 ? <div className='no-class'>You have no client</div> :
                                
                                clients.map((item, index) => {
                                    return <Client item={item} key={index}/>

                                })                            
                                
                            }
                
                        </div>
                    </div>
                    
                </DashboardLayout>

            }
        </>
    );
}
 
export default Clients;