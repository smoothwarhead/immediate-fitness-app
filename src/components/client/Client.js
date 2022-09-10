import { ImLocation2 } from 'react-icons/im';
import { GoPrimitiveDot } from 'react-icons/go';
import '../../files/styles/Client.css';
import {Image} from 'cloudinary-react';


const Client = ({ item }) => {

    return ( 
        <div className="card">
            <div className="card_image">
                <Image cloudName="greenietec" publicId={`${item.profileImage}`} />

            </div>
            
            <div className="card_info">

                <div className="card_info_empty"></div>
                <div className="card_info_container">
                    <h5 className="person_name">{`${item.firstName} ${item.lastName}`}</h5>
                    

                    <div className="person-location-container">
                        <div className="person_location">
                            <div className="location_icon"><ImLocation2 /></div>
                            <div className="location_addr">{`${item.city}, ${item.state}`}</div>

                        </div>
                    </div>

                    <div className="xter-label">
                        <h6>Fitness goals:</h6>
                    </div>


                    <div className="specializations-container">
                        <div className="specializations">

                            {item.goals.map((item, index) => (
                                    <div className="sp_elements" key={index}>
                                        <div className="sp_element_icons"><GoPrimitiveDot /></div>
                                        <p>{item}</p>
                                    </div>
                            ))}   

                        </div>
                    </div>

                                      
                </div>
            </div>
        </div>
     );
}
 
export default Client;