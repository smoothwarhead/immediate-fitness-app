import { useState } from "react";
import { FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";

const MobileSignUpDropdown = () => {

    const [click, setClick] = useState(false);

  return (
    <>
        <div className={click ? "mobile-dropdown-page clicked" : "mobile-dropdown-page"}>
            <div className="mobile-dropdown-content">
               
                <div className="mobile-signup-items mobile-signup-client">
                    <Link to="/signup-as-a-client" className="signup_client_items" onClick = {()=> setClick(false)}>
                        <div className="mobile-signup-links">
                            Create a client account
                        </div>
         
                    </Link>
                </div>

                <div className="mobile-signup-items mobile-signup-trainer">

                    <Link to="/signup-as-a-trainer" className="signup_trainer_items" onClick = {()=> setClick(false)}>
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