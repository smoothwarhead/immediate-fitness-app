import '../files/styles/Profile.css';
import ProfileBanner from '../components/profileBanner/ProfileBanner';
import SubBanner from '../components/profileBanner/SubBanner';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

const Profile = ({ profile, listItem, classes }) => {

    const { user } = useContext(UserContext);
    
    // const isProfile = true;
   
    

    return ( 
        <>
            <div className="profile-content">
            
                <div className="profile-banner">
                    <ProfileBanner profile={profile} />

                </div>

                <div className="profile-sub-banner">
                    <SubBanner numOfEntities={profile.numberOfEntities} rating={profile.trainerRating} numOfClasses={profile.numberOfClasses} />
                </div>

                <div className="profile_info">
                    

                    {user.role === "Trainer" ? 
                        <div className="profile_section">
                            <div className="profile_section_title">About me</div>
                            <p className="about_me_para">
                                {profile.about_me}
                            </p>
                        </div>
                        : 
                        <div></div>
                
                    }

                    {user.role === "Trainer" ? 

                        <div></div>
                        :
                        <div className="profile_section">
                            <div className="profile_section_title">Height</div>
                            <p className="about_me_para">
                                {profile.height}
                            </p>
                        </div>
                        
                    }

                    {user.role === "Trainer" ? 

                        <div></div>
                        :
                        <div className="profile_section">
                            <div className="profile_section_title">Weight</div>
                            <p className="about_me_para">
                                {profile.weight}
                            </p>
                        </div>
                        
                    }
                    
                    <div className="profile_section">
                        <div className="profile_section_title">{user.role === "Trainer" ? "Specializations" : "Fitness goals"}</div>
                        <div className="specs_container">
                            {listItem.map((item, index) => {
                                return <div className="specs" key={index}>{item}</div>
                            })}
                        </div>
                        
                    </div>
                    <div className="profile_section">
                        <div className="profile_section_title">{user.role === "Trainer" ? "Offered classes" : "Enrolled classes"}</div>
                        <div className="offer_container">

                            {classes.length === 0 ? user.role === "Trainer" ? <div className='no-offer'>No classes offered yet</div> : <div className='no-offer'>No classes enrolled to yet</div>
                                :
                                classes.map((item, index) => {
                                    return <div className="my_classes" key={index}>{item}</div>
                                })
                            }
                            
                        </div>
                        
                    </div>
                </div>

            </div>
          
        
        </>
     );
}
 
export default Profile;