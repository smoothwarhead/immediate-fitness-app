import { Outlet  } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";

const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true);
    const { setUser, loggedIn, setLoggedIn } = useContext(UserContext);

    useEffect(() => {
        const verifyRefresh = async ( ) => {
            try {
                const currentUser = localStorage.getItem("currentUser");
                const isAuth = localStorage.getItem("isAuth");

                setUser(currentUser);
                setLoggedIn(isAuth);

            } catch (error) {
                console.log(error)
            }
            finally{
                setIsLoading(false);
            }
        }

        !loggedIn ? verifyRefresh() : setIsLoading(false);

    }, [loggedIn, setLoggedIn, setUser])


  return (
    <>
        {isLoading
            ? <p>Loading ... </p>
            : <Outlet />
        }
    </>
  )
}

export default PersistLogin;