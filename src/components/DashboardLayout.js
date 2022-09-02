import { useContext } from "react"
import { useLocation } from "react-router-dom";
// import DropdownContext from "../context/DropdownContext";
import UserContext from "../context/UserContext"
// import useMediaQuery from "../hooks/useMediaQuery";
import Header from "./Header"
import Navbar from "./navbar/Navbar";
import { NavItems } from "./navbar/NavItems";



function DashboardLayout({ children }) {

  const { user } = useContext(UserContext);
  // const { drop } = useContext(DropdownContext);

  // const isMax1180 = useMediaQuery('(max-width: 1180px)');

  const location = useLocation();

  const getClassName = () => {
    if(location.pathname === "/auth/dashboard/trainer/classes"){
      // if(drop && isMax1180){
      //   return "class_main_page drop";

      // }
      return "class_main_page";
    }
    if(location.pathname === "/auth/dashboard/client/classes/find-a-class"){
      // if(drop && isMax1180){
      //   return "find_class_main_page drop";

      // }
      return "find_class_main_page";
    }
    if(location.pathname === "/auth/dashboard/client/trainers" || location.pathname === "/auth/dashboard/trainer/clients" ){
      // if(drop && isMax1180){
      //   return "entity_main_page drop";

      // }
      return "entity_main_page";
    }
    else{

      // if(drop && isMax1180){
      //   return "main_page drop";

      // }
      return "main_page";
    }
  }


  

  return (
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
  )
}

export default DashboardLayout