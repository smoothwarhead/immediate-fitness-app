import { Link } from 'react-router-dom';
import NoUserHeader from '../../components/NoUserHeader';

const PageNotFound = () => {
    return ( 

        <>
            <NoUserHeader cName="account-logo" />

            <div className="content">
               
                    <div className="not_found_container">

                        <h1 className="code_404">404</h1>
                        <h3 className="not_found">Sorry, we couldn't find that page.</h3>
                        <div className="return-btn">
                            <Link to="/"><div className="back_home">Back to Home page</div></Link>
                        </div>
                    </div>
                    


            </div>        
        </>
     );
}
 
export default PageNotFound;