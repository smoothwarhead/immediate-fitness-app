import { Link } from 'react-router-dom';
import NoUserHeader from '../../components/NoUserHeader';



const AccessDenied = () => {
    return ( 
        <>
            <NoUserHeader cName="account-logo" />

            <div className="content">
                
                <div className="not_found_container">

                    <h1 className="code_404">Access denied</h1>
                    <h3 className="not_found">Sorry, you don't have permission to view the content of this page.</h3>
                    <div className="return-btn">
                        <Link to="/"><div className="back_home">Back to Home page</div></Link>

                    </div>
                </div>
            </div>        
        </>
     );
}
 
export default AccessDenied;