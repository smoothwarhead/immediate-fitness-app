import { Link, Outlet } from 'react-router-dom';
import { useContext, useState } from 'react';
import '../../files/styles/Homepage.css';
import SignupDropdown from './SignupDropdown';
import UserContext from '../../context/UserContext';
import Header from '../../components/Header';
import NoUserHeader from '../../components/NoUserHeader';


function Homepage() {

    const [dropdown, setDropdown] = useState(false);
    const { loggedIn, user } = useContext(UserContext);
    


    const handleClick = () => {
        setDropdown(!dropdown)
    };


    return (
        <>
            <div className="background">
                <img src="/images/front-page-img.png" alt="front-page" />
                
                { user && <div className="user-header"><Header isProfile={true} /></div> }
                { !user && <div className="no-user-header"><NoUserHeader handleClick={handleClick} cName="homepage-logo" /></div> }


                <div className="content">
                    {user && <div className="welcome-msg">Welcome back, {user?.firstName}!</div> }
                                 
                    

                    <div className="content-btns">
                        { loggedIn ? <div></div> : <Link to="/signup-as-a-trainer"><div className="train-btn trainee">i want to train</div></Link>}

                        { loggedIn ? <div></div> : <Link to="/signup-as-a-client"><div className="train-btn trainer">i want to be trained</div></Link>}
                    </div>
                </div>

            
                {dropdown && <SignupDropdown />}
                
                
            </div>
            <Outlet />

        </>
        
    )
}

export default Homepage;
