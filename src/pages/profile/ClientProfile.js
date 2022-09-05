import '../../files/styles/Profile.css';
import Profile from "../../components/Profile";
import { useState, useEffect, useContext } from 'react';
import axios from '../../api/axios';
import UserContext from '../../context/UserContext';
import DataContext from '../../context/DataContext';
import PageLayout from '../../components/PageLayout';
import LoadingData from '../../components/LoadingData';
import { Link } from 'react-router-dom';
import FlatButton from '../../components/FlatButton';
import MessageBox from '../../components/MessageBox';




const ClientProfile = () => {


    const { setLoggedIn } = useContext(UserContext);

    const { profile, setProfile} = useContext(DataContext);
    const [isPending, setIsPending] = useState(true);
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState({
        body: "",
        type: ""
    });
    const isProfile = true;


    

    useEffect(() => {

        const getProfile = async () => {

            const emptyProfile = [];

            try {
                

                let res = await axios.get('https://immediate-server.herokuapp.com/auth/dashboard/client/profile', {
                    withCredentials: true
                });

                console.log(res);

                if(res.status === 200){

                    setIsPending(false);
                    setProfile(res.data.profile);
                    setLoggedIn(res.data.logIn);
                                        

                }else if(res.status === 204){
                    setIsPending(false);
                    setProfile(emptyProfile);
                    setLoggedIn(true);

                    // setErrorMessage(null);

                }
                
                else{
                    throw Error("Could not fetch the data for that resource");
                }


         
                
                
            // })
                
            } catch (error) {
                console.log(error.response);
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

        getProfile();

    }, [setLoggedIn,setProfile, message]);

   
    const closeMessage = () => {
        setMessageOpen(false);
    }




    return ( 
        <>
            { isPending && <LoadingData /> }

            {isPending ? <div></div> :
                <PageLayout isProfile={isProfile}>
                    <div className={profile.length !== 0 ? "profile-container" : "profile-container empty"}>
                        {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }

                     

                        { profile.length === 0 &&  
                            <div className="no-data-message">
                                <p>You do not have a profile created yet. Please create a profile.</p>

                                <div className="create-profile-btn-container">
                                    <Link to='/auth/create-client-profile'><FlatButton name='Create Profile' cName='create-profile-btn-dashboard'/></Link>

                                </div>

                            </div>
                        }

        
                        {profile.length !== 0 && 
                            <div className="profile-items">
                                <Profile profile={profile[0]} listItem = {profile[0].goals} classes={profile[0].classes} /> 
                            </div>
                        }


                    </div>
                </PageLayout>
            }
        </>
     );
}
 
export default ClientProfile;