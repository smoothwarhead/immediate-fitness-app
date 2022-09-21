import '../../files/styles/Profile.css';
import Profile from "../../components/Profile";
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import UserContext from '../../context/UserContext';
import axios from '../../api/axios';
import PageLayout from '../../components/PageLayout';
import FlatButton from '../../components/FlatButton';
import MessageBox from '../../components/MessageBox';
import useAuth from '../../context/useAuth';



const TrainerProfile = () => {


    const { setLoggedIn } = useContext(UserContext);

    const { profile, setProfile} = useContext(DataContext);
    const {setIsPending} = useAuth();
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState({
        body: "",
        type: ""
    });
    const isProfile = true;
    const navigate = useNavigate();

    


    useEffect(() => {

        const getProfile = async () => {

            const emptyProfile = [];

            try {
                

                let res = await axios.get('https://immediate-server.herokuapp.com/auth/dashboard/trainer/profile', {
                    withCredentials: true
                });


                if(res.status === 200){

                    setProfile(res.data.profile);
                    setLoggedIn(res.data.logIn);
                    setIsPending(false);


                }else if(res.status === 204){

                    setProfile(emptyProfile);
                    setLoggedIn(res.data.logIn);
                    setIsPending(false);


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

    }, [setLoggedIn,setProfile, message, setIsPending]);
    

    
    const closeMessage = () => {
        setMessageOpen(false);
    }

    const handleNavigate = () => {
        navigate('/auth/create-trainer-profile', { replace: true });

    };
   



    return ( 
        <>
          

            <PageLayout isProfile={isProfile}>
                <div className={profile.length === 0 ? "empty-profile-container" : "profile-container" }>

                    {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }

                

                    { profile.length === 0 &&  
                        <div className="no-data-message">
                            <p>You do not have a profile created yet. Please create a profile.</p>
                            <div className='create-profile-btn-container'><FlatButton name='Create Profile' cName='profile-create-profile-btn'action={handleNavigate} /></div>

                        </div>
                    }

                    {profile.length !== 0 && 
                        <div className="profile-items">
                            <Profile profile={profile[0]} listItem = {profile[0].specializations} classes={profile[0].classes} /> 
                        </div>
                    }


                </div>
            </PageLayout>
            
        </>
     );
}
 
export default TrainerProfile;