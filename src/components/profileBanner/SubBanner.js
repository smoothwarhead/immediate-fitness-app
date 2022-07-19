import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import '../../files/styles/ProfileBanner.css';

const SubBanner = ({ numOfEntities, rating, numOfClasses }) => {

    const { user } = useContext(UserContext);



    return ( 

        <>
            <div className="sub_banner_info">
                <div className="sub_elements">
                    <div className="sub_element_name">{user.role === 'Trainer' ? 'Clients' : 'Trainers'}</div>
                    <div className="sub_element_number">{numOfEntities}</div>
                </div>
                { user.role === 'Trainer' ? 
                
                    <div className="sub_elements">
                        <div className="sub_element_name">{user.role === "Trainer" ? "Rating" : ""}</div>
                        <div className="sub_element_number">{rating === '' ? "" : rating}</div>
                    </div> : <div></div>
            
                }
                

                <div className="sub_elements">
                    <div className="sub_element_name">Classes</div>
                    <div className="sub_element_number">{numOfClasses}</div>
                </div>
            </div>
        
        </>
     );
}
 
export default SubBanner;