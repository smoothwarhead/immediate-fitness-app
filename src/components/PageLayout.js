
import Header from "./Header";
import { useLocation, useParams } from "react-router-dom";
import '../files/styles/page-layout.css';
// import { useContext } from "react";
// import DropdownContext from "../context/DropdownContext";
// import useMediaQuery from "../hooks/useMediaQuery";


const PageLayout = ({ children, isProfile }) => {

    // const { drop } = useContext(DropdownContext);

    // const isMax1180 = useMediaQuery('(max-width: 1180px)');

    const { id } = useParams();

    const location = useLocation();
  
    const setClass = () => {
        if(location.pathname === '/auth/dashboard/trainer/create-a-class' || location.pathname === `/auth/dashboard/trainer/classes/edit-class/${id}`){
            
            // if(drop && isMax1180){
            //     return "create-class-layout drop";
        
            // }
           
            return "create-class-layout";
            
        }
        if(location.pathname === '/auth/dashboard/trainer/classes/upcoming-events' || location.pathname === '/auth/dashboard/client/classes/upcoming-events'){
            
            // if(drop && isMax1180){
            //     return "upcoming-class-layout drop";
        
            // }
            
            return "upcoming-class-layout";
            
        }
        if(location.pathname === `/auth/dashboard/trainer/classes/session/${id}`){
            
            // if(drop && isMax1180){
            //     return "session-layout drop";
        
            // }
            return "session-layout";
            
        }
        
        else{

            // if(drop && isMax1180){
            //     return "page-layout drop";
        
            // }

            return "page-layout";
        }
    }

  return (
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
  )
}

export default PageLayout