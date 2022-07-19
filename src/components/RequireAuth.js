import { useContext } from "react";
import { useLocation, Navigate, Outlet} from "react-router-dom";
import UserContext from "../context/UserContext";

function RequireAuth({ allowedRoles }) {
    const { user } = useContext(UserContext);
    const location = useLocation();


    const checkAuth = () => {
      if(user){
        if(allowedRoles.find(role => user?.allowedRole === role)){
          return <Outlet />
        }else{
          return <Navigate to="/denied" state={{ from: location}} replace />
        }

      }else{
        return <Navigate to="/" state={{ from: location}} replace />
      }
    }
  return (
    checkAuth()
  
  )
}

export default RequireAuth;