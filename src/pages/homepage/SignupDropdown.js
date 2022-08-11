import { FaTimes } from 'react-icons/fa';
import '../../files/styles/SignupDropdown.css';
import { Link, useLocation } from 'react-router-dom';




const SignupDropdown = ({dropdown, handleClick}) => {

    const location = useLocation();

    const isLogin = location.pathname === "/login";
    const isSignuptrainer = location.pathname === "/signup-as-a-trainer";
    const isSignupClient = location.pathname === "/signup-as-a-client";

    return ( 
        <>
            <div className={dropdown ? `dropdown_page ${isLogin || isSignupClient || isSignuptrainer ? 'account-open' : 'open'}` : "dropdown_page close"}>
                <div className="dropdown_content">
                    <div className="close_icon" onClick={handleClick}>
                        <FaTimes size="2em" color="#1A272A" />
                    </div>

                    <div className="signup_items signup_client">
                        <Link to="/signup-as-a-client" className="signup_client_items" onClick = {handleClick}>
                            <div className="signup_links">
                                Create a client account
                            </div>
                            <div className="line"></div>
                        </Link>
                    </div>

                    <div className="signup_items signup_trainer">

                        <Link to="/signup-as-a-trainer" className="signup_trainer_items" onClick = {handleClick}>
                            <div className="signup_links">
                                Create a trainer account
                            </div>
                            <div className="line"></div>
                        </Link>

                    </div>
                </div>
                
            </div>
        
        </>
     );
}
 
export default SignupDropdown;