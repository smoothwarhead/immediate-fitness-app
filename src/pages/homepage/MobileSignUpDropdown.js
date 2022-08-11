import { useState } from "react";
import { Link } from "react-router-dom";

const MobileSignUpDropdown = ({dropdown, setDropdown}) => {

    const [click, setClick] = useState(false);

    const handleClick = () => {
        setClick(!click);
        setDropdown(!dropdown);
    }
   

  return (
    <>
       <div className="mobile-dropdown-page">
            <div className="mobile-dropdown-content">

                <div className="close-menu-down" onClick={handleClick}>close</div>
               
                <div className="mobile-signup-items mobile-signup-client">
                    <Link to="/signup-as-a-client" className="signup_client_items" onClick={handleClick}>
                        <div className="mobile-signup-links">
                            Create a client account
                        </div>
         
                    </Link>
                </div>

                <div className="mobile-signup-items mobile-signup-trainer">

                    <Link to="/signup-as-a-trainer" className="signup_trainer_items" onClick={handleClick}>
                        <div className="mobile-signup-links">
                            Create a trainer account
                        </div>
                        
                    </Link>

                </div>
            </div>
                
        </div>
    

    </>
  )
}

export default MobileSignUpDropdown;