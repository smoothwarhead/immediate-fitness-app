import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import useAuth from '../../context/useAuth';
import '../../files/styles/mobile-menu.css';
import { Link } from 'react-router-dom';



const MobileMenu = ({ isProfile, openAccount }) => {

    const { user } = useContext(UserContext);
    const { logoutUser } = useAuth();
   
  return (
    <>
        <div className={!user ? "user-menu-page" : "menu-page"}>
            
            { user ? 

                <div className="user-mobile">

                    { isProfile ?

                        <>

                            <div className="profile-mobile">
                                <Link to={user?.allowedRole === 3030 ? '/auth/dashboard/trainer' : '/auth/dashboard/client'}><div className="profile-mobile-links mobile_home">Home</div></Link> 
                                <Link to={user?.allowedRole === 3030 ? '/auth/dashboard/trainer/clients' : '/auth/dashboard/client/trainers'}><div className="profile-mobile-links mobile_role">{user.role === 'Trainer' ? 'Clients' : 'Trainers'}</div></Link> 
                                <Link to={user?.allowedRole === 3030 ? '/auth/dashboard/trainer/classes' : '/auth/dashboard/client/classes'}><div className="profile-mobile-links mobile_classes">Classes</div></Link>

                            </div>

                            <div className="profile-mobile-logout">
                                <div className="profile-logout" onClick={(e) => logoutUser()}>Logout</div>  

                            </div>
                        </>

                    :

                    <div className="mobile-logout">
                        <div className="no-profile-logout" onClick={(e) => logoutUser()}>Logout</div>  

                    </div>

                    }

                </div>

                :

                <div className="no-user-mobile">
                    <div className="mobile-nav-elements">
                        <ul>
                            <Link to="/login"><li>Login</li></Link>
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