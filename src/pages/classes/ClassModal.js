import {useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import UserContext from '../../context/UserContext';
import LoadingData from '../../components/LoadingData';
import MessageBox from '../../components/MessageBox';






const ClassModal = ({closeModal}) => {

    
    const { setLoggedIn } = useContext(UserContext);

    const { id } = useParams();
    // const [oneClass, setOneClass] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [equipments, setEquipments] = useState([]);
    const [levels, setLevels] = useState(null);
    const [formats, setFormats] = useState(null);
    const [types, setTypes] = useState(null);
    const [frequency, setFrequency] = useState(null);
    const [description, setDescription] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState({
        body: "",
        type: ""
    });

    const closeMessage = () => {
        setMessageOpen(false);
    }




    useEffect(() => {

        const getOneClass = async () => {

            // const emptyClass = []

            try {
                let res = await axios.get(`https://immediate-server.herokuapp.com/auth/dashboard/client/classes/details/${id}`, {
                            withCredentials: true
                        });

                console.log(res);

                if(res.status === 200){

                    setIsPending(false);
                    setEquipments(res.data.oneClass[0].equipments);
                    setLevels(res.data.oneClass[0].level);
                    setFormats(res.data.oneClass[0].format);
                    setTypes(res.data.oneClass[0].type);
                    setFrequency(res.data.oneClass[0].frequency);
                    setDescription(res.data.oneClass[0].description);
                    setFirstName(res.data.oneClass[0].firstName);
                    setLastName(res.data.oneClass[0].lastName);
                    setStartTime(res.data.oneClass[0].start_time);
                    setStartDate(res.data.oneClass[0].start_date);
                    setEndTime(res.data.oneClass[0].end_time);
                    setLoggedIn(res.data.logIn);

                    // setErrorMessage(null);

                }else if(res.status === 204){
                    setIsPending(false);
                    setLoggedIn(res.data.logIn);


                }else if(res.status === 401){
                    setLoggedIn(false);
                }
                
                else{
                    throw Error("Could not fetch the data for that resource");
                }


            } catch (error) {
                console.log(error.response);
                if(error.response.status === 401){
                    setIsPending(false);
                    setLoggedIn(false);
                    localStorage.removeItem("currentUser");
                    localStorage.setItem("isAuth", false);
                    
                }
                if(error.response.status === 404){
                    setIsPending(false);
                    setMessageOpen(true);
                    setMessage({...message, body: "Could not fetch the data for that resource", type: "error" });
                    
                }
                if(error.response.status === 500){
                    setIsPending(false);
                    setMessageOpen(true);
                    setMessage({...message, body: "Internal server error", type: "error" });
                   
                }
            }

            
        }

        getOneClass()
        
    }, [id, setLoggedIn, message]);

    // const newClass = (item) => {

    //     let newT;
    //     let newTime;
    //     const startStr = item.start_time.slice(item.start_time.length - item.start_time.length, item.start_time.length - item.start_time.length + 2);
    //     const endStr = item.start_time.slice(item.start_time.length - 2, item.start_time.length);
    //     const middleStr = item.start_time.slice(item.start_time.length - item.start_time.length + 3, item.start_time.length - item.start_time.length + 5);
        
    
    //     if(endStr === 'am' || endStr === 'AM'){
    //         newT = parseInt(startStr) + 0
    //         newTime = `${newT}:${middleStr}`;
            
    //     }
    //     if(endStr === 'pm' || endStr === 'PM'){
    //         newT = parseInt(startStr) + 12
    //         newTime = `${newT}:${middleStr}`;
            
    //     }
    
    //     const now = new Date().getTime();
    //     const daily = 24 * 60 * 60 * 1000;
    //     const twoDays = 2 * 24 * 60 * 60 * 1000;
    //     const weekly = 7 * 24 * 60 * 60 * 1000;
    //     let newTimeStamp;
    
        
    
    
            
    //     const newDate = `${item.start_date} ${newTime}`;
        
    //     let timeStamp = new Date(newDate);
    
    //     while(timeStamp.getTime() < now){
    //         if(item.frequency === 'Daily'){
    //            newTimeStamp = new Date(timeStamp.getTime() + daily);
            
    
    //         }
    //         if(item.frequency === 'Every 2 days'){
    //            newTimeStamp = new Date(timeStamp.getTime() + twoDays);
            
    
    //         }
    //         if(item.frequency === 'Weekly'){
    //            newTimeStamp = new Date(timeStamp.getTime() + weekly);
            
    //         }
    
    //         timeStamp = newTimeStamp;
    //     }


    //     const newClass = {...item, timeStamp: newTimeStamp.getTime(), date: newTimeStamp.toLocaleDateString()};

    //     return newClass.date;
    
        
    // };

    let navigate = useNavigate();

    function handleClick() {
        navigate(-1)
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

    // console.log(oneClass[0].equipments);
   

  return (
    <>
       { isPending && <LoadingData /> }

        {isPending ? <div></div>  : 
        
            <div className='modal_background'>
                {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }

                <div className="modal_container">
                    
                    <div className="modal_header">
                        <div className="modal_class_level">{levels}</div>
                        <div className="modal_return" onClick={handleClick}>Back</div>
                    </div>
                    
                    <div className="modal_body">
                        <div className="modal_class_type">{types}</div>
                        <div className="modal_class_trainer">{`With ${firstName} ${lastName}`}</div>
                        <div className="modal_class_format">{`${frequency} ${formats} class`}</div>
                        <div className="modal_class_date">{`${formatDate(startDate)}`}</div>
                        <div className="modal_class_time">{`${startTime} - ${endTime}`}</div>
                        <div className="modal_class_description">
                            {description}
                        </div>
                        <div className="modal_equipment_title">Equipment needed</div>
                        <div className="modal_class_equipments">
                            {equipments.map((item, index) => (
                                <div className="modal_equipment" key={index}>{item.item}</div>

                            ))}
                            
                        </div>
                        


                    </div>
                    <div className="modal_footer">
                        <div className="modal_class_btns modal_cancel_btn" onClick={handleClick}>Cancel</div>
                        <div className="modal_class_btns modal_add_btn">Add Class</div>
                    </div>

                </div>
            </div>
        }
        
    </>
    );
}

export default ClassModal;
