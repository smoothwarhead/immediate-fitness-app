import { createContext, useEffect, useState } from 'react';


const UserContext = createContext({});


export const UserProvider = ({ children }) => {

   

    const [user, setUser] = useState(null);

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        const isAuth = JSON.parse(localStorage.getItem("isAuth"));

        setUser(currentUser);
        setLoggedIn(isAuth);


    }, []);



    return(
        <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;

