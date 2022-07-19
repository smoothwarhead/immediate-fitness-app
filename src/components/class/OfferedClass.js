
import { useNavigate } from 'react-router-dom';

import '../../files/styles/OfferedClass.css';
// import ClassModal from '../../pages/classes/ClassModal';




function OfferedClass({item, addClass}) {
    // const { user } = useContext(UserContext);
    // const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();


     



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

    const handleView = (item) => {
        // setModalOpen(true);

        navigate(`/auth/dashboard/client/classes/details/${item.classId}`);

    }


    return (  
        <>
            <div className="offered-class-card">
                {item.isRegistered ? <div className="is-registered active">Registered</div> : <div className="is-registered"></div>}

                <div className="offered-class-container" style={getStyle()}>
                    <div className="offered-class-level">{item.level}</div>
                    <div className="offered-class-name">{item.type}</div>
                    <div className="offered-class-format">{`${item.format} training`}</div>
                    <div className="offered-class-schedule"><p className="schedule_time">{`${item.start_time} - ${item.end_time}`}</p><p className="schedule_day">{`${formatDate(item.start_date)};`}</p></div>
                    <div className={item.isRegistered ? "offered-class-btns class-registered" : "offered-class-btns normal-class"}>

                        <div className={item.isRegistered ? "offered-class-btn offered-class-view-profile-registered" : "offered-class-btn offered-class-view-profile"} onClick={() => {handleView(item)}}>
                            View details                                
                        </div>

                        <div className={item.isRegistered ? "offered-class-btn offered-class-add-trainer-registered" : "offered-class-btn offered-class-add-trainer"} onClick={() => {addClass(item)}}>
                            Add Class
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
}

export default OfferedClass;
