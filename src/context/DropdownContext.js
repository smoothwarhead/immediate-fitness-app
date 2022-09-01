import { createContext, useState } from 'react';


export const DropdownContext = createContext({});

export const DropdownProvider = ({ children }) => {

    const [drop, setDrop] = useState(false);
    
    const [openMenu, setOpenMenu] = useState(false);
    


    return (
        <DropdownContext.Provider value={{ drop, setDrop, openMenu, setOpenMenu }}>
            {children}
        </DropdownContext.Provider>
    )

}

export default DropdownContext;