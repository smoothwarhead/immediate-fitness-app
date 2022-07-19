
import Header from "./Header";
import { useLocation, useParams } from "react-router-dom";
import '../files/styles/page-layout.css';


const PageLayout = ({ children, isProfile }) => {

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
        <div className={setClass()}>

            <div className="page-header">
                <Header isProfile={isProfile}/>
            </div>

            <div className="page-content">
                {children}
            </div>
        </div>
    

    </>
  )
}

export default PageLayout