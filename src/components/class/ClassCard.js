import '../../files/styles/Class.css';
import { Link } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';




const ClassCard = ({item, isSession}) => {

    const background = {
        background: '#CBD0D6 0% 0% no-repeat padding-box'
    }

    const formatDate = (value) => {
        const date = new Date(value);
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

        return date.toLocaleDateString('en-us', options);
    }

    const isMax960 = useMediaQuery('(max-width: 960px)');
    const isMin520 = useMediaQuery('(min-width: 520px)');

    const makeClassStyle = () => {
        if(isMax960 && isMin520){

            if(isSession){
                return "session_class_card_container"
            }
            else{
                return "class_card_container";
            }
        }else{
            return "class_card_container";
        }
    }


    return (  

        <div className={makeClassStyle()} style={background}>
            <div className="class_level">{item.level}</div>
            <div className="class_name">{item.type}</div>
            <div className="class_card_format">{`${item.format} training`}</div>
            <div className="class_card_schedule class_card_schedule_first"><p className="class_card_day">{`${formatDate(item.start_date)};`}</p><p className="class_card_time">{`${item.start_time} - ${item.end_time}`}</p></div>
            <div className="class_card_schedule class_card_schedule_second"><p className="class_card_frequency">{item.frequency}</p></div>
            <div className="class_btns">
               <Link to={`/auth/dashboard/trainer/classes/edit-class/${item.classId}`}><div className="card_btn edit_class_btn class_card_btn">Edit Class</div></Link> 
               <Link to={`/auth/dashboard/trainer/classes/delete-class/${item.classId}`}><div className="card_btn delete_class_btn class_card_btn">Delete Class</div></Link>
            </div>
            

        </div>
    );
}
 
export default ClassCard;