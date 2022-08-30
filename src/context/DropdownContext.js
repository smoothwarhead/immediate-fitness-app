import { createContext, useState } from 'react';


export const DropdownContext = createContext({});

export const DropdownProvider = ({ children }) => {

    const [drop, setDrop] = useState(false);
    
    


    return (
        <DropdownContext.Provider value={{ drop, setDrop }}>
            {children}
        </DropdownContext.Provider>
    )

}

export default DropdownContext;