import { ImLocation2 } from "react-icons/im";
import '../../files/styles/ProfileBanner.css';
import {Image} from 'cloudinary-react';


const ProfileBanner = ({ profile }) => {
    return ( 
        <div className="banner">
            <div className="banner_elements">
                <div className="profile_pic">
                    <Image cloudName="greenietec" publicId={`${profile.profileImage}`} />

                </div>
                <div className="profile_name"><p>{`${profile.firstName} ${profile.lastName}`}</p></div>
                <div className="banner_location">
                    <div className="profile_icon"><ImLocation2 /></div>
                    <div className="profile_addr">{`${profile.city}, ${profile.state}`}</div>
                </div>
                <div className="edit_profile">
                    <div className="edit_btn">Edit profile</div>
                    <div className="edit_line"></div>
                </div>

            </div>
            
        </div>
     );
}
 
export default ProfileBanner;