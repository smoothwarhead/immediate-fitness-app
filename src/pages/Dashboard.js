import { useContext } from "react";
import ClientDashboard from "../pages/dashboard/ClientDashboard";
import TrainerDashboard from "../pages/dashboard/TrainerDashboard";
import UserContext from "../context/UserContext";
import DataContext from "../context/DataContext";
import { Outlet, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingData from "../components/LoadingData";


const Dashboard = () => {


    const { user } = useContext(UserContext);
    const { classes } = useContext(DataContext);
    const {id} = useParams();

    const { isPending, messageOpen, message, closeMessage } = useFetch(`https://immediate-server.herokuapp.com/auth/dashboard/${id.toLowerCase()}`);

    

    
   
   
    const checkRole = (user) => {
        if (!user){
            return <LoadingData />
        }else if(user.allowedRole === 3030){
            return <TrainerDashboard classes={classes} isPending={isPending} message={message} closeMessage={closeMessage} messageOpen={messageOpen} />

        }else{
            return <ClientDashboard classes={classes} isPending={isPending} message={message} closeMessage={closeMessage} messageOpen={messageOpen}/>

        }
    }
    
    return ( 
        <>
            <div>

                { checkRole(user) }

            </div>
            <Outlet />

        </>
        
     );
}
 
export default Dashboard;