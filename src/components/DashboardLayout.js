import { useContext } from "react"
import { useLocation } from "react-router-dom";
import UserContext from "../context/UserContext"
import Header from "./Header"
import Navbar from "./navbar/Navbar";
import { NavItems } from "./navbar/NavItems";


function DashboardLayout({ children }) {

  const { user } = useContext(UserContext)

  const location = useLocation();

  const getClassName = () => {
    if(location.pathname === "/auth/dashboard/trainer/classes"){
      return "class_main_page";
    }
    if(location.pathname === "/auth/dashboard/client/classes/find-a-class"){
      return "find_class_main_page";
    }
    if(location.pathname === "/auth/dashboard/client/trainers" || location.pathname === "/auth/dashboard/trainer/clients" ){
      return "entity_main_page";
    }
    else{
      return "main_page";
    }
  }


  

  return (
    <>
        <Header/>

        <div className={getClassName()}>

          {/* <div className="dashboard-header">
          </div> */}

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