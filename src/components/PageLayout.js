
import Header from "./Header";
import { useLocation, useParams } from "react-router-dom";
import '../files/styles/page-layout.css';
import LoadingData from "./LoadingData";
import useAuth from "../context/useAuth";


const PageLayout = ({ children, isProfile }) => {


    const {isPending} = useAuth();

    const { id } = useParams();

    const location = useLocation();
  
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

                    {/* <div className="page-header">
                    </div> */}

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