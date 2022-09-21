import { createContext, useState } from 'react';


export const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [classes, setClasses] = useState([]);
    const [ profile, setProfile ] = useState([]);
    const [ clients, setClients ] = useState([]);
    const [ trainers, setTrainers ] = useState([]);
    
    


    return (
        <DataContext.Provider value={{classes, setClasses, profile, setProfile, clients, setClients, trainers, setTrainers}}>
            {children}
        </DataContext.Provider>
    )

}

export default DataContext;