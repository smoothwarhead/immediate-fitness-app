import { useContext } from "react"
import { useLocation } from "react-router-dom";
import useAuth from "../context/useAuth";
import UserContext from "../context/UserContext"
import DataContext from "../context/DataContext";
import Header from "./Header"
import LoadingData from "./LoadingData";
import Navbar from "./navbar/Navbar";
import { NavItems } from "./navbar/NavItems";



function DashboardLayout({ children }) {

  const { user } = useContext(UserContext);
  const {isPending} = useAuth();
  const { classes } = useContext(DataContext);
  

  const location = useLocation();

  const getClassName = () => {
    if(location.pathname === "/auth/dashboard/trainer/classes"){
      if(classes.length === 0){
        return "class_main_page empty-page";

      }
      return "class_main_page";
    }
    if(location.pathname === "/auth/dashboard/client/classes/find-a-class"){

      if(classes.length === 0){
        return "find_class_main_page empty-page";

      }
      return "find_class_main_page";
    }
    if(location.pathname === "/auth/dashboard/client/trainers" || location.pathname === "/auth/dashboard/trainer/clients" ){
      if(classes.length === 0){
        return "entity_main_page empty-page";

      }
      return "entity_main_page";
    }
    else{
      if(classes.length === 0){
        return "main_page empty-page";

      }
      return "main_page";
    }
  }


  

  return (
    <>
        { isPending && <LoadingData /> }

        { !isPending && 

          <>
            <Header/>

            <div className={getClassName()}>

              <div className="dashboard-navbar">
                <Navbar navItems = {NavItems} role = {user?.allowedRole}/>

              </div>


              <div className="dashboard_content">
                {children}
              </div>
            </div>
          </>

        }
    </>
  )
}

export default DashboardLayout