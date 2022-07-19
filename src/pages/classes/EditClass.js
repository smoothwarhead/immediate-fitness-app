// import Axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Levels, Formats, Types } from "../../files/ClassEntities";
import Button from "../../components/Button";
import { HiPlus } from 'react-icons/hi';
import DatePicker from 'react-datepicker';
import { TimePickerComponent} from '@syncfusion/ej2-react-calendars';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import ItemForm from '../../components/addItems/ItemForm';
import ItemList from '../../components/addItems/ItemList';
import axios from '../../api/axios';
import PageLayout from '../../components/PageLayout';
import LoadingData from '../../components/LoadingData';
import MessageBox from '../../components/MessageBox';
import UserContext from '../../context/UserContext';








// import { DataContext } from '../../context/DataContext';





const EditClass = () => {


    const { setLoggedIn } = useContext(UserContext);


    const navigate = useNavigate();
    const { id } = useParams();
    const [oneClass, setOneClass] = useState([]);
    const [isPending, setIsPending] = useState(true);

    const [show, setShow] = useState(false);
    const [levelBtn, setLevelBtn] = useState(Levels);
    const [formatBtn, setFormatBtn] = useState(Formats);
    const [typeBtn, setTypeBtn] = useState(Types);
    const [isEditLevel, setIsEditLevel] = useState(false);
    const [isEditFormat, setIsEditFormat] = useState(false);
    const [isEditType, setIsEditType] = useState(false);
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [frequency, setFrequency] = useState("");
    const [isFreq, setIsFreq] = useState(false);
    const [items, setItems] = useState([]);
    const [levels, setLevels] = useState(null);
    const [formats, setFormats] = useState(null);
    const [types, setTypes] = useState(null);
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState({
        body: "",
        type: ""
    });


    const closeMessage = () => {
        setMessageOpen(false);
    }





    useEffect(() => {
      
        const getClass = async () => {

            try {

                let res = await axios.get(`/auth/dashboard/trainer/classes/edit-class/${id}`, {
                        withCredentials: true
                    });

                console.log(res);

                if(res.status === 200){

                    setIsPending(false);
                    setOneClass(res.data.oneClass);
                    setIsEditLevel(true);
                    setIsEditFormat(true);
                    setIsEditType(true);
                    setDescription(res.data.oneClass[0].description);
                    setStartDate(new Date(res.data.oneClass[0].start_date));
                    setStartTime(res.data.oneClass[0].start_time);
                    setEndTime(res.data.oneClass[0].end_time);
                    setFrequency(res.data.oneClass[0].frequency);
                    setIsFreq(true);
                    setItems(res.data.oneClass[0].equipments);
                    setLevels(res.data.oneClass[0].level);
                    setFormats(res.data.oneClass[0].format);
                    setTypes(res.data.oneClass[0].type);
                        

                        
                }
                
            } catch (error) {
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

        getClass();


    }, [id, message, setLoggedIn]);


    const showActiveLevels = (index) => {
        if(levelBtn.allLevels[index] === levelBtn.activeBtn){
            return "all_btn active";
        }else{
            return "all_btn";
        }
    }

    function makeActiveLevels(index){
        setIsEditLevel(false);
        setLevelBtn({...levelBtn, activeBtn: levelBtn.allLevels[index]});
        setLevels(levels.allLevels[index].name);

    }


    const showActiveFormats = (index) => {
        if(formatBtn.allFormats[index] === formatBtn.activeBtn){
            return "all_btn active";
        }else{
            return "all_btn";
        }
    }


    function makeActiveFormats(index){
        setIsEditFormat(false);
        setFormatBtn({...formatBtn, activeBtn: formatBtn.allFormats[index]});
        setFormats(formats.allFormats[index].name);

    }


    
    //for types

    const showActiveTypes = (index) => {
        if(typeBtn.allTypes[index] === typeBtn.activeBtn){
            return "all_btn active";
        }else{
            return "all_btn";
        }
    }

    function makeActiveTypes(index){
        setIsEditType(false);
        setTypeBtn({...typeBtn, activeBtn: typeBtn.allTypes[index]});
        setTypes(types.allTypes[index].name);
    }


    const showMore = () => {
        setShow(true)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);

    }

    const handleStartTime = (e) => {
        const newValue = e.target.value
        //setStartTime(newValue);
        setStartTime(newValue.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));

    }

    const handleEndTime = (e) => {
        const newValue = e.target.value
        setEndTime(newValue.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    }

    const handleCheck = (e) => {
        const value = e.target.value;
        if(e.target.checked){
            setIsFreq(false);
            setFrequency(value);

        }else{
            return false;
       

        }
    }

    const addItem = (newItem) => {
       
        // setFormData({...formData, equipments: [newItem, ...formData.equipments]});
        setItems([...items, newItem]);

    };

    const removeItem = (id) => {
        const removeItem = items.filter(item => item.id !== id);
        setItems(removeItem);
        // const removeItem = formData.equipments.filter(item => item.id !== id);
        // setFormData({...formData, equipments: removeItem});

        
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        

        const data = {levels, formats, types, description, startDate, startTime, endTime, frequency, items};


        try{

            let res = await axios.put(`/auth/dashboard/trainer/classes/edit-class/${id}`, 

                JSON.stringify(data),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                })

                 
            if(res.status === 201){                

                setMessageOpen(true);
                setMessage({...message, body: res.data.message, type: "success" });
                setTimeout(() => {
                    navigate(-1);
                }, 2000)


               
            }
            
        }
        catch(error){

            console.log(error);
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
    
    


    return ( 
        <>
            { isPending && <LoadingData /> }

            {isPending ? <div></div> :
                <PageLayout>

                
                    <div className="create-class-container">

                        {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }



                        <div className="back-btn-container">
                            <div className="back_btn" onClick={() => navigate(-1)}>Back</div>
                        </div>
                        
                        <h3 className="heading_class">Update the selected class</h3>

                        <form className="create-class-form-container" onSubmit={handleSubmit}>


                            <div className="entity_row level-row">
                                <div className="row_label">Level of competency</div>
                                <div className="row_btns">
                                    {oneClass.length === 0 ? <div>Loading...</div> : levelBtn.allLevels.map((item, index)=>{
                                    return <Button 
                                                    cName={isEditLevel && item.name === oneClass[0].level ? "all_btn active" : showActiveLevels(index)}
                                                    name={item.name} 
                                                    click={() => {makeActiveLevels(index)}}
                                                    key={index} />
                                    })}
                                </div> 
                            </div>

                            <div className="entity_row format-row">
                                <div className="row_label">Training Format</div>
                                <div className="row_btns">
                                    {oneClass.length === 0 ? <div>Loading...</div> : formatBtn.allFormats.map((item, index)=>{
                                        return <Button 
                                                cName={isEditFormat && item.name === oneClass[0].format ? "all_btn active" : showActiveFormats(index)} 
                                                name={item.name}
                                                click={() => {makeActiveFormats(index)}}
                                                key={index}/>
                                    })}
                                </div>
                            </div>


                            <div className="entity_row type-row">
                                <div className="row_label">Training Type</div>
                                <div className="row_btns">
                                    {oneClass.length === 0 ? <div>Loading...</div> : typeBtn.allTypes.map((item, index)=>{
                                    return <Button 
                                                cName={isEditType && item.name === oneClass[0].type ? "all_btn active" : showActiveTypes(index)} 
                                                name={item.name}
                                                click={() => {makeActiveTypes(index)}} 
                                                key={index}/>
                                    })}
                                </div>

                                <div className="other_btn all_btn" onClick={showMore}>
                                    <div className="more_options">Other</div>
                                    <div className="plus_icon"><HiPlus /></div>
                                </div>

                                { show ? 
                                
                                    <div className="more">
                                        <p>Type a training type that's not in the list above</p>
                                        <input 
                                            type="text" 
                                            className="input_more"
                                            // value={formData.types}
                                            // onChange={handleTypes}
                                            
                                            />
                                        <Button cName='all_btn' name='Add more type'/>
                                    </div>
                                    : null
                        
                                }
                                

                            </div>

                            <div className="entity_row description-row">
                                <div className="row_label">Description</div>
                                <div className="row_text">
                                    <textarea 
                                        // placeholder="Provide additional description/information about the class" 
                                        cols="105" 
                                        rows="15"
                                        value={description}
                                        onChange={handleDescription}
                                    ></textarea>
                                </div>
                            </div>

                            {oneClass.length === 0 ? <div>Loading...</div> : 
                                <div className="entity_row date-row">
                                    <div className="row_label">Select a date</div>
                                    <div className="row_date">

                                        <DatePicker 
                                            selected={startDate}
                                            onChange={date => setStartDate(date)}
                                            placeholderText = "Select a date"
                                            minDate={new Date()}
                                            className='date-picker'
                                        
                                        />
                                        {/* <IoMdArrowDropdown className='date-icon'/> */}
                                    </div>                            
                                
                                </div>
                            }

                            {
                                oneClass.length === 0 ? <div>Loading...</div> :

                                <div className="entity_row time-row">
                                    <div className="time_slots">
                                        <div className="start_time">

                                            <div className="row_label">Start time</div>
                                            <div className="row_text">
                                                <TimePickerComponent 
                                                    placeholder="Select a start time"
                                                    value={startTime}
                                                    step={15}
                                                    onChange ={handleStartTime}
                                                                                                
                                                    >

                                                </TimePickerComponent>
                                            </div>

                                        </div>

                                        <div className="end_time">

                                            <div className="row_label">End time</div>
                                            <div className="row_text">
                                                
                                                <TimePickerComponent 
                                                    placeholder="Select an end time"
                                                    value={endTime}
                                                    step={15}
                                                    onChange ={handleEndTime}
                                                    
                                                    >
                                                    
                                                </TimePickerComponent>
                                            </div>

                                        </div>
                                        

                                    </div>
                                    
                                </div>
                            }

                            {
                                oneClass.length === 0 ? <div>Loading...</div> :

                                <div className="entity_row frequency-row">
                                    <div className="row_label">Class frequency</div>
                                    <div className="row_boxes">
                                        <div className="checkbox_container">
                                            <div className="checkbox_label">Daily</div>
                                            <CheckBoxComponent 
                                                value="Daily"  
                                                onChange={handleCheck} 
                                                checked={frequency === "Daily" && isFreq ? true : false }
                                            />
                                        </div>
                                        <div className="checkbox_container">
                                            <div className="checkbox_label">Every 2 days</div>
                                            <CheckBoxComponent 
                                                value="Every 2 days" 
                                                onChange={handleCheck}
                                                checked={frequency === "Every 2 days" && isFreq ? true : false }

                                            />
                                        </div>
                                        <div className="checkbox_container">
                                            <div className="checkbox_label">Weekly</div>
                                            <CheckBoxComponent 
                                                value="Weekly" 
                                                onChange={handleCheck}
                                                checked={frequency === "Weekly" ? true : false }

                                            />
                                        </div>
                                        <div className="checkbox_container">
                                            <div className="checkbox_label">Monthly</div>
                                            <CheckBoxComponent 
                                                value="Monthly" 
                                                onChange={handleCheck}
                                                checked={frequency === "Monthly" && isFreq ? true : false }

                                            />
                                        </div>
                                    
                                    </div>
                                </div>
                            }


                            {
                                oneClass.length === 0 ? <div>Loading...</div> :

                                <div className="entity_row equipment-row">
                                    <div className="row_label">Exercise equipment needed</div>
                                    <div className="row_equipment">
                                        <div className="profile_input_row">
                                            <ItemForm addItem={addItem} placeholder="Add an Equipment"/>
                                        </div>
                                        
                                    </div>

                                    <ItemList 
                                            items={items}
                                            removeItem={removeItem}
                                            name="allEquipments"

                                            
                                    />

                                    
                                </div>

                            }
                            

                            <div className="add-class-btn-container">
                                <button className="add_class_btn">Update Class</button>
                            </div>





                        
                        
                        </form>

                        
                    </div>

                    
                

                </PageLayout>
            }
        </>
     );
}
 
export default EditClass;