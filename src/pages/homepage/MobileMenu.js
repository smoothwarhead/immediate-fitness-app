import { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import useAuth from '../../context/useAuth';
import '../../files/styles/mobile-menu.css';
import { Link } from 'react-router-dom';
import MobileSignUpDropdown from './MobileSignUpDropdown';
import DropdownContext from '../../context/DropdownContext';
import useMediaQuery from '../../hooks/useMediaQuery';
import CloseMenuIcon from '../../components/menu/CloseMenuIcon';




const MobileMenu = ({ isProfile}) => {

    const { user } = useContext(UserContext);
    const { setDrop } = useContext(DropdownContext);
    const { openMenu, setOpenMenu } = useContext(DropdownContext);


    const { logoutUser } = useAuth();

    const isMax1180 = useMediaQuery('(max-width: 1180px)');


    const [openSubMenu, setOpenSubMenu] = useState(false);

    const openAccount= () => {
        setOpenSubMenu(!openSubMenu);
    }

    const handleLogout = () => {
        logoutUser();
        setDrop(false);
        setOpenMenu(false);

    }


    const handleClick = () => {
        setOpenMenu(false);
        setDrop(false);
    }

   
  return (
    <>

        { openSubMenu && isMax1180 &&
            <div className={`other-m-dropdown ${openSubMenu ? "mobile-od-open" : "mobile-od-close"}`}>
                <MobileSignUpDropdown dropdown={openSubMenu} setDropdown={setOpenSubMenu} />
            </div>
        }



        <div className={!user ? `user-menu-page ${openMenu ? "mobile-m-open" : "mobile-m-close"}` : `menu-page ${openMenu ? "mobile-h-open" : "mobile-h-close"}`}>
            <div className={user ? "menu-header user-menu-header" : "menu-header no-user-menu-header"}>

                <div 
                    className="menu-mobile-elements"
                    onClick={handleClick}
                >
                    <CloseMenuIcon cName="header-close-menu" />
                </div>

            </div>


            { user ? 

                <div className="user-mobile">

                    { isProfile ?

                        <>

                            <div className="profile-mobile">
                                <Link to={user?.allowedRole === 3030 ? '/auth/dashboard/trainer' : '/auth/dashboard/client'} onClick={handleClick}><div className="profile-mobile-links mobile_home">Dashboard</div></Link> 
                                <Link to={user?.allowedRole === 3030 ? '/auth/dashboard/trainer/clients' : '/auth/dashboard/client/trainers'} onClick={handleClick}><div className="profile-mobile-links mobile_role">{user.role === 'Trainer' ? 'Clients' : 'Trainers'}</div></Link> 
                                <Link to={user?.allowedRole === 3030 ? '/auth/dashboard/trainer/classes' : '/auth/dashboard/client/classes'} onClick={handleClick}><div className="profile-mobile-links mobile_classes">Classes</div></Link>

                            </div>

                            <div className="profile-mobile-logout">
                                <div className="profile-logout" onClick={handleLogout}>Logout</div>  

                            </div>
                        </>

                    :

                    <div className="mobile-logout">
                        <div className="no-profile-logout" onClick={handleLogout}>Logout</div>  

                    </div>

                    }

                </div>

                :

                <div className="no-user-mobile">
                    <div className="mobile-nav-elements">
                        <ul>
                            <Link to="/login" onClick={handleClick}><li>Login</li></Link>
                            <li onClick={openAccount}>Create Account</li>
                        </ul>
                
                    </div>
                </div>

                


            }
            

        </div>

        
    
    </>
  )
}

export default MobileMenu;