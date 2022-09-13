
import Header from "./Header";
import { useLocation, useParams } from "react-router-dom";
import '../files/styles/page-layout.css';
import LoadingData from "./LoadingData";
import useAuth from "../context/useAuth";
import { useContext } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import UserContext from "../context/UserContext";
import Navbar from "./navbar/Navbar";
import {NavItems} from "./navbar/NavItems";








const PageLayout = ({ children, isProfile }) => {

    const { user } = useContext(UserContext);


    const isMax960 = useMediaQuery('(max-width: 960px)');

    const {isPending} = useAuth();

    const { id } = useParams();

    const location = useLocation();

    const clientProfilePage = '/auth/dashboard/client/profile';
    const trainerProfilePage = '/auth/dashboard/trainer/profile';
  
    const setClass = () => {
        if(location.pathname === '/auth/dashboard/trainer/create-a-class' || location.pathname === `/auth/dashboard/trainer/classes/edit-class/${id}`){
            
            return "create-class-layout";
            
        }
        if(location.pathname === '/auth/dashboard/trainer/classes/upcoming-events' || location.pathname === '/auth/dashboard/client/classes/upcoming-events'){

            return "upcoming-class-layout";
            
        }
        if(location.pathname === `/auth/dashboard/trainer/classes/session/${id}`){
      
            return "session-layout";
            
        }
        
        else{

            if(isMax960) {
                return "page-layout max-960";
        
            }

            return "page-layout";
        }
    }

  return (
    <>
        { isPending && <LoadingData /> }

        { !isPending && 

            <>   
                <Header isProfile={isProfile}/>

                <div className={setClass()}>

                    { (location.pathname === clientProfilePage || trainerProfilePage) && isMax960 &&     
                        <div className="page-header">
                            <Navbar navItems = {NavItems} role = {user?.allowedRole}/>

                        </div>}

                    <div className="page-content">
                        {children}
                    </div>
                </div>     
            
            </>

        }
    

    </>
  )
}

export default PageLayout