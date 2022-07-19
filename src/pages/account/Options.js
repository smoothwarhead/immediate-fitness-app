import { Link } from 'react-router-dom';
import { useContext } from "react";
import '../../files/styles/Profile.css';
import UserContext from "../../context/UserContext";
import NoUserHeader from '../../components/NoUserHeader';



const OptionPage = () => {

    const { user } = useContext(UserContext);


    return ( 

        <>
            <NoUserHeader cName="account-logo" />

            <div className="option_page">
                
                <div className="option-container">
                    <h3 className="heading3">Hello, {user.firstName}</h3>
                    <h2>Please create a profile to maximize your experience on this platform</h2>
                    <h2>Would you like to create your profile now?</h2>
                    <div className="selections">
                        <Link to={user.allowedRole === 3030 ? '/auth/create-trainer-profile' : '/auth/create-client-profile' }><div className="btn_select yes">Yes</div></Link>
                        <Link to={`/auth/dashboard/${user.role.toLowerCase()}`}><div className="btn_select no">No</div></Link>
                    </div>
                    
                </div>

                    
                
            </div>
        
        </>
     );
}
 
export default OptionPage;