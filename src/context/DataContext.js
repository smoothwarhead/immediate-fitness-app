import { createContext, useState } from 'react';


export const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [classes, setClasses] = useState([]);
    // const [clientClasses, setClientClasses] = useState([]);
    const [ profile, setProfile ] = useState([]);
    


    return (
        <DataContext.Provider value={{classes, setClasses, profile, setProfile}}>
            {children}
        </DataContext.Provider>
    )

}

export default DataContext;