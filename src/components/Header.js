import { useContext, useState } from "react";
import useAuth from "../context/useAuth";
import UserContext from "../context/UserContext";
import '../files/styles/Header.css';
import { Link } from 'react-router-dom';
import Logo from "./Logo";
import OpenMenuIcon from "./menu/OpenMenuIcon";
import CloseMenuIcon from "./menu/CloseMenuIcon";
import MobileMenu from "../pages/homepage/MobileMenu";
import DropdownContext from "../context/DropdownContext";

// import useMediaQuery from "../hooks/useMediaQuery";


const Header = ({ isProfile }) => {

    const { logoutUser } = useAuth();
    const { user } = useContext(UserContext);
    const { drop, setDrop } = useContext(DropdownContext);

   
    const [openMenu, setOpenMenu] = useState(false);

    const handleClick = () => {
        setOpenMenu(!openMenu);
        setDrop(!drop);

    }

    // const is1120 = useMediaQuery('(min-width: 1120px)');



    

    
    return ( 

        <>

            <div className="header_bar">

                <div className="header-content">

                    <div className="logo-container">
                        <Link to="/">
                            <div className="logo">
                                <Logo cName="header-logo" />
                            </div>
                        </Link>
                    </div>

                    <div className={"header_elements"}>
                        {isProfile ? 
                            <div className="header_navs">
                                <Link to={user?.allowedRole === 3030 ? '/auth/dashboard/trainer' : '/auth/dashboard/client'}><div className="header_home">Home</div></Link> 
                                <Link to={user?.allowedRole === 3030 ? '/auth/dashboard/trainer/clients' : '/auth/dashboard/client/trainers'}><div className="header_role">{user.role === 'Trainer' ? 'Clients' : 'Trainers'}</div></Link> 
                                <Link to={user?.allowedRole === 3030 ? '/auth/dashboard/trainer/classes' : '/auth/dashboard/client/classes'}><div className="header_classes">Classes</div></Link>
                                
                            </div> :
                            <div className="header_empty"></div>
                        
                        }

                        <div className="header_logout">
                            <div className="logout" onClick={(e) => logoutUser()}>Logout</div>  

                        </div>

                    </div>

                    <div 
                        className="mobile-header-elements"
                        onClick={handleClick}
                    >
                        {openMenu ? <CloseMenuIcon cName="close-menu" />  : <OpenMenuIcon cName="open-menu" />}

                    </div>



                </div>

                
                

                
            </div>
            

            { openMenu && <MobileMenu isProfile={isProfile} /> }
            
        
        </>

        
        
     );
}
 
export default Header;