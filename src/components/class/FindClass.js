import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import '../../files/styles/Class.css';
import ClassModal from '../../pages/classes/ClassModal';




function FindClass({item, addClass}) {
    const { user } = useContext(UserContext);
    const [modalOpen, setModalOpen] = useState(false);


     



    const background_beginners = {
        background: 'transparent linear-gradient(239deg, #4871D1 0%, #CBD0D6 100%) 0% 0% no-repeat'

    }

    const background_intermediate = {
        background: 'transparent linear-gradient(241deg, #C63213 0%, #CBD0D6 100%) 0% 0% no-repeat'

    }

    const background_advanced = {
        background: 'transparent linear-gradient(241deg, #1DAE8C 0%, #CBD0D6 100%) 0% 0% no-repeat'

    }

    const getStyle = () => {
        if(item.level === 'Beginners'){
            return background_beginners;
        }else if(item.level === 'Intermediate'){
            return background_intermediate;
        }else{
            return background_advanced;
        }
    }

  




    const formatDate = (value) => {
        const date = new Date(value);
        const today = new Date().toLocaleDateString()
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

        if(date.toLocaleDateString() === today){
            return 'Today';
        }else{
            return date.toLocaleDateString('en-us', options);
        }

    }


    return (  
        <>
            {modalOpen && <ClassModal closeModal={setModalOpen} />}

            <div className="find_class_container" style={getStyle()}>
                <div className="find_class_level">{item.level}</div>
                <div className="find_class_name">{item.type}</div>
                <div className="find_trainer_name">{user.role === 'Trainer' ? '' : `By ${item.firstName} ${item.lastName}`}</div>
                <div className="find_class_format">{`${item.format} training`}</div>
                <div className="find_schedule"><p className="schedule_time">{`${item.start_time} - ${item.end_time}`}</p><p className="schedule_day">{`${formatDate(item.start_date)};`}</p></div>
                <div className="find_card_btns">

                        <div className="find_card_btn find_view_profile" onClick={()=>{setModalOpen(true)}}>
                            <Link to={`/auth/dashboard/client/classes/details/${item.classId}`}>
                                View details
                            </Link>
                        </div>

                    <div className="find_card_btn find_add_trainer" onClick={() => {addClass(item)}}>
                        Add Class
                    </div>
                </div>

            </div>

        </>
    );
}

export default FindClass;
