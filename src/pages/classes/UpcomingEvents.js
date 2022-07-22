import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import '../../files/styles/session.css';
import EventSlider from '../../components/EventSlider';
import PageLayout from '../../components/PageLayout';
import useFetch from '../../hooks/useFetch';
import LoadingData from '../../components/LoadingData';
import MessageBox from '../../components/MessageBox';
import UserContext from '../../context/UserContext';


const UpcomingEvents = () => {

    const { user } = useContext(UserContext);

    const getUrl = (role) => {
        if(role === 3030){
            return 'https://immediate-server.herokuapp.com/auth/dashboard/trainer/classes'
        }
        else{
            return 'https://immediate-server.herokuapp.com/auth/dashboard/client/classes'

        }
    }

    const { isPending, messageOpen, message, closeMessage } =  useFetch(getUrl(user.allowedRole));


    const { classes } = useContext(DataContext);

    const navigate = useNavigate();




    const daily = 24 * 60 * 60 * 1000;

    const date = new Date();
    const now = date.getTime();
    const today = date.getDay();
    const day2 = new Date(now + daily).getDay();
    const day3 = new Date(now + 2 * daily).getDay();
    const day4 = new Date(now + 3 * daily).getDay();
    const day5 = new Date(now + 4 * daily).getDay();
    const day6 = new Date(now + 5 * daily).getDay();



    

    const todayClasses = classes.map(item => {

        const itemDay = new Date(item.timeStamp).getDay();
        return {...item, day: itemDay};

        // if((item.timeStamp > now && item.frequency === "Every 2 weeks" && item.day === today) || (item.timeStamp > now && item.frequency === "Weekly" && item.day === today)){
        //     let timeStamp = now;
    
        //     let newTimeStamp = timeStamp;
        //     return {...item, timeStamp: newTimeStamp, start_date: date.toLocaleDateString(), day: today};
            
    
        // }
        // else{
        //     return item;
    
        // }
    
    }).filter(item => item.day === today);

    

    const day2Classes = classes.map(item => {

       
        const itemDay = new Date(item.timeStamp).getDay();
        return {...item, day: itemDay};
        // if(item.timeStamp > now && item.frequency === "Daily" && item.day === today){
        //     let timeStamp = new Date(item.timeStamp);
    
        //     let newTimeStamp = new Date(timeStamp.getTime() + daily);
        //     return {...item, timeStamp: newTimeStamp.getTime(), start_date: newTimeStamp.toLocaleDateString(), day: newTimeStamp.getDay()};
            
    
        // }
        // else{
        //     return item;
    
        // }
    
    }).filter(item => item.day === day2);

    const day3Classes = day2Classes.map(item => {

       
        if(item.timeStamp > now && item.frequency === "Daily" && item.day === day2){
            let timeStamp = new Date(item.timeStamp);
    
            let newTimeStamp = new Date(timeStamp.getTime() + daily);
            return {...item, timeStamp: newTimeStamp.getTime(), start_date: newTimeStamp.toLocaleDateString(), day: newTimeStamp.getDay()};
            
    
        }
        if(item.timeStamp > now && item.frequency === "Every 2 days" && item.day === today){
            let timeStamp = new Date(item.timeStamp);
    
            let newTimeStamp = new Date(timeStamp.getTime() + 2 * daily);
            return {...item, timeStamp: newTimeStamp.getTime(), start_date: newTimeStamp.toLocaleDateString(), day: newTimeStamp.getDay()};
            
    
        }
        else{
            return item;
    
        }
    
    
    
    
    }).filter(item => item.day === day3);


    const day4Classes = day3Classes.map(item => {

        if(item.timeStamp > now && item.frequency === "Daily" && item.day === day3){
            let timeStamp = new Date(item.timeStamp);
    
            let newTimeStamp = new Date(timeStamp.getTime() + daily);
            return {...item, timeStamp: newTimeStamp.getTime(), start_date: newTimeStamp.toLocaleDateString(), day: newTimeStamp.getDay()};
            
    
        }
        if(item.frequency === "Every 2 days" && item.day === day2){
            let timeStamp = new Date(item.timeStamp);
    
            let newTimeStamp = new Date(timeStamp.getTime() + 2 * daily);
            return {...item, timeStamp: newTimeStamp.getTime(), start_date: newTimeStamp.toLocaleDateString(), day: newTimeStamp.getDay()};
            
    
        }
        else{
            return item;
    
        }
    
    
    
    
    }).filter(item => item.day === day4);

    const day5Classes = day4Classes.map(item => {

        if(item.timeStamp > now && item.frequency === "Daily" && item.day === day4){
            let timeStamp = new Date(item.timeStamp);
    
            let newTimeStamp = new Date(timeStamp.getTime() + daily);
            return {...item, timeStamp: newTimeStamp.getTime(), start_date: newTimeStamp.toLocaleDateString(), day: newTimeStamp.getDay()};
            
    
        }
        if(item.frequency === "Every 2 days" && item.day === day3){
            let timeStamp = new Date(item.timeStamp);
    
            let newTimeStamp = new Date(timeStamp.getTime() + 2 * daily);
            return {...item, timeStamp: newTimeStamp.getTime(), start_date: newTimeStamp.toLocaleDateString(), day: newTimeStamp.getDay()};
            
    
        }
        else{
            return item;
    
        }
    
    
    
    
    }).filter(item => item.day === day5);

    const day6Classes = day5Classes.map(item => {

        if(item.timeStamp > now && item.frequency === "Daily" && item.day === day5){
            let timeStamp = new Date(item.timeStamp);
    
            let newTimeStamp = new Date(timeStamp.getTime() + daily);
            return {...item, timeStamp: newTimeStamp.getTime(), start_date: newTimeStamp.toLocaleDateString(), day: newTimeStamp.getDay()};
            
    
        }
        if(item.frequency === "Every 2 days" && item.day === day4){
            let timeStamp = new Date(item.timeStamp);
    
            let newTimeStamp = new Date(timeStamp.getTime() + 2 * daily);
            return {...item, timeStamp: newTimeStamp.getTime(), start_date: newTimeStamp.toLocaleDateString(), day: newTimeStamp.getDay()};
            
    
        }
        else{
            return item;
    
        }
    
    
    
    
    }).filter(item => item.day === day6);
    

    return ( 
        <>
            { isPending && <LoadingData /> }

            {isPending ? <div></div> :
                <PageLayout>
                    <div className="event_class_content">
                        <div className="back-btn-container">
                            <div className="back_btn session_back" onClick={() => navigate(-1)}>Back</div>
                        </div>
                        {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }

                        <div className="session_title">Upcoming Events</div>
                        <div className="event_session_classes">

                            <div className="days today-classes">
                                <EventSlider items = {todayClasses}/>

                            </div>

                            <div className="days day2-classes">
                                <EventSlider items = {day2Classes}/>

                            </div>

                            <div className="days day3-classes">
                                <EventSlider items = {day3Classes}/>

                            </div>


                            <div className="days day4-classes">
                                <EventSlider items = {day4Classes}/>

                            </div>

                            <div className="days day5-classes">
                                <EventSlider items = {day5Classes}/>

                            </div>

                            <div className="days day6-classes">
                                <EventSlider items = {day6Classes}/>

                            </div>
                        
                        </div>
                    </div>
                </PageLayout>
            }
        </>
     );
}
 
export default UpcomingEvents;