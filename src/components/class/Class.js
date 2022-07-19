import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import '../../files/styles/Class.css';


const Class = ({ item }) => {

    const { user } = useContext(UserContext);


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
        if(item.level === "Beginners"){
            return background_beginners;
        }else if(item.level === "Intermediate"){
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

        <div className="class_container" style={getStyle()}>
            <div className="class_level">{item.level}</div>
            <div className="class_name">{item.type}</div>
            <div className="trainer_name">{user.role === 'Trainer' ? '' : `By ${item.firstName} ${item.lastName}`}</div>
            <div className="class_format">{`${item.format} training`}</div>
            <div className="schedule"><p className="schedule_time">{`${item.start_time} - ${item.end_time}`}</p><p className="schedule_day">{`${formatDate(item.start_date)};`}</p></div>

        </div>
    );
}
 
export default Class;