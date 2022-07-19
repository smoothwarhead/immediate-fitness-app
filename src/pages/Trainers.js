
// import { Types } from '../../files/ClassEntities';
import { useContext, useState, useEffect } from 'react';
import axios from '../api/axios';
import Trainer from '../components/Trainer';
import UserContext from '../context/UserContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingData from '../components/LoadingData';
import MessageBox from '../components/MessageBox';



const Trainers = () => {

    const { setLoggedIn } = useContext(UserContext);
    const [trainers, setTrainers] = useState([]);
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

        const getTrainers = async() => {

            const emptyTrainers = [];

            try {
                

                let res = await axios.get('/auth/dashboard/client/trainers', {
                    withCredentials: true
                });

                console.log(res);
                if(res.status === 200){

                    setIsPending(false);
                    setTrainers(res.data.trainers);
                    setLoggedIn(res.data.logIn);

                }else if(res.status === 204){
                    setIsPending(false);
                    setTrainers(emptyTrainers);
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

        getTrainers();
        
        
    }, [setLoggedIn, message]);

    

    return (  
        <>

            { isPending && <LoadingData /> }

            {isPending ? <div></div> :
                <DashboardLayout>

                    <div className="entity_content_container">

                        {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }

                        <div className="clients_container">
                                {trainers.length === 0 ? <div className='no-class'>You have no trainers</div> :
                                    
                                    trainers.map((item, index) => {
                                    return <Trainer item={item} key={index}/>
                                    
                                    })
                                    
                                    
                                }
                    
                        </div>
                    </div>
                    
                </DashboardLayout>
            }
        </>
    );
}
 
export default Trainers;