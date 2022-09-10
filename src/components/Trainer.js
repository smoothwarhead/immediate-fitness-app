// import { useState } from 'react';
import { AiFillStar, AiOutlineStar} from 'react-icons/ai';
import { ImLocation2 } from 'react-icons/im';
import { GoPrimitiveDot } from 'react-icons/go';
// import OfferedClassModal from './modals/OfferedClassModal';
import { useNavigate } from 'react-router-dom';
import {Image} from 'cloudinary-react';



const Trainer = ({item}) => {

    // const [modalOpen, setModalOpen] = useState(false);
    

    const navigate = useNavigate();

    const setRating = (rating) => {
        if (rating === '0'){
            return <div className="rating">
                        <AiOutlineStar fill='#1DAE8C'/>
                        <AiOutlineStar fill='#1DAE8C'/>
                        <AiOutlineStar fill='#1DAE8C'/>
                        <AiOutlineStar fill='#1DAE8C'/>
                        <AiOutlineStar fill='#1DAE8C'/>
                    </div>
        }else if(rating === '1'){
            return <div className="rating">
                        <AiFillStar fill='#1DAE8C'/>
                        <AiOutlineStar fill='#1DAE8C'/>
                        <AiOutlineStar fill='#1DAE8C'/>
                        <AiOutlineStar fill='#1DAE8C'/>
                        <AiOutlineStar fill='#1DAE8C'/>
                    </div>
        }else if(rating === '2'){
            return <div className="rating">
                        <AiFillStar fill='#1DAE8C'/>
                        <AiFillStar fill='#1DAE8C'/>
                        <AiOutlineStar fill='#1DAE8C'/>
                        <AiOutlineStar fill='#1DAE8C'/>
                        <AiOutlineStar fill='#1DAE8C'/>
                    </div>
        }else if(rating === '3'){
            return <div className="rating">
                        <AiFillStar fill='#1DAE8C'/>
                        <AiFillStar fill='#1DAE8C'/>
                        <AiFillStar fill='#1DAE8C'/>
                        <AiOutlineStar fill='#1DAE8C'/>
                        <AiOutlineStar fill='#1DAE8C'/>
                    </div>
        }else if(rating === '4'){
            return <div className="rating">
                        <AiFillStar fill='#1DAE8C'/>
                        <AiFillStar fill='#1DAE8C'/>
                        <AiFillStar fill='#1DAE8C'/>
                        <AiFillStar fill='#1DAE8C'/>
                        <AiOutlineStar fill='#1DAE8C'/>
                    </div>
        }else if(rating === '5'){
            return <div className="rating">
                        <AiFillStar fill='#1DAE8C'/>
                        <AiFillStar fill='#1DAE8C'/>
                        <AiFillStar fill='#1DAE8C'/>
                        <AiFillStar fill='#1DAE8C'/>
                        <AiFillStar fill='#1DAE8C'/>
                    </div>
        }
    }

    const handleView = (item) => {
        // setModalOpen(true);

        navigate(`/auth/dashboard/client/trainers/offered-classes/${item.trainerId}`);

    }

    const handleTrainerRating = (item) => {
        // setModalOpen(true);

        navigate(`/auth/dashboard/client/trainer-rating/${item.trainerId}`, { state: { name: item.firstName } });

    }

    return ( 

        <>
            

            <div className="card">
                <div className="card_image">
                    <Image cloudName="greenietec" publicId={`${item.profileImage}`} />

                </div>
                
                <div className="card_info">
                    <div className="card_info_empty"></div>
                    <div className="card_info_container">
                        <h5 className="person_name">{`${item.firstName} ${item.lastName}`}</h5>
                        <div className="person-rating">
                            {setRating(item.trainerRating.toString())}
                        </div>
                        
                        <div className="person-location-container">
                            <div className="person_location">
                                
                                <div className="location_icon"><ImLocation2 /></div>
                                <div className="location_addr">{`${item.city}, ${item.state}`}</div>

                            </div>
                        </div>
                        


                        <div className="xter-label">
                            <h6>Specializations:</h6>
                        </div>


                        <div className="specializations-container">
                            <div className="specializations">

                                {item.specializations.map((spec, index) => (
                                    <div className="sp_elements" key={index}>
                                        <div className="sp_element_icons"><GoPrimitiveDot /></div>
                                        <p>{spec}</p>
                                    </div>
                                ))}                        

                            </div>
                        </div>

                        


                        <div className="entity-btns card-btns">
                            {/* <div className="card_btn trainer_view_profile" onClick={()=>{handleView(item)}}>View profile</div> */}
                            <div className="card_btn offered_classes" onClick={()=>{handleView(item)}}>Offered Classes</div>
                        </div>

                        
                    </div>
                </div>

                <div className="rating-modal-open" onClick={()=>{handleTrainerRating(item)}}>
                    Rate this trainer
                </div>
            </div>
        </>
     );
}
 
export default Trainer;