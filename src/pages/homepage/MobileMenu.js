import { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import useAuth from '../../context/useAuth';
import '../../files/styles/mobile-menu.css';
import { Link } from 'react-router-dom';
import MobileSignUpDropdown from './MobileSignUpDropdown';
import DropdownContext from '../../context/DropdownContext';




const MobileMenu = ({ isProfile, openMenu }) => {

    const { user } = useContext(UserContext);
    const { setDrop } = useContext(DropdownContext);

    const { logoutUser } = useAuth();


    const [openSubMenu, setOpenSubMenu] = useState(false);

    const openAccount= () => {
        setOpenSubMenu(!openSubMenu);
    }

    const handleLogout = () => {
        logoutUser();
        setDrop(false);
    }


   
  return (
    <>

        { openSubMenu && 
            <div className={`other-m-dropdown ${openSubMenu ? "mobile-od-open" : "mobile-od-close"}`}>
                <MobileSignUpDropdown dropdown={openSubMenu} setDropdown={setOpenSubMenu} />
            </div>
        }



        <div className={!user ? `user-menu-page ${openMenu ? "mobile-m-open" : "mobile-m-close"}` : `menu-page ${openMenu ? "mobile-h-open" : "mobile-h-close"}`}>
            
            { user ? 

                <div className="user-mobile">

                    { isProfile ?

                        <>

                            <div className="profile-mobile">
                                <Link to={user?.allowedRole === 3030 ? '/auth/dashboard/trainer' : '/auth/dashboard/client'} onClick={() => setDrop(false)}><div className="profile-mobile-links mobile_home">Home</div></Link> 
                                <Link to={user?.allowedRole === 3030 ? '/auth/dashboard/trainer/clients' : '/auth/dashboard/client/trainers'} onClick={() => setDrop(false)}><div className="profile-mobile-links mobile_role">{user.role === 'Trainer' ? 'Clients' : 'Trainers'}</div></Link> 
                                <Link to={user?.allowedRole === 3030 ? '/auth/dashboard/trainer/classes' : '/auth/dashboard/client/classes'} onClick={() => setDrop(false)}><div className="profile-mobile-links mobile_classes">Classes</div></Link>

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
                            <Link to="/login" onClick={() => setDrop(false)}><li>Login</li></Link>
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