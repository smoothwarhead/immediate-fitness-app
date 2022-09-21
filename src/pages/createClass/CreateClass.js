import { useContext, useState } from 'react';
import Button from "../../components/Button";
import '../../files/styles/CreateClass.css';
import { Levels, Formats, Types } from "../../files/ClassEntities";
import { HiPlus } from 'react-icons/hi';
import { TimePickerComponent} from '@syncfusion/ej2-react-calendars';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import ItemForm from '../../components/addItems/ItemForm';
import ItemList from '../../components/addItems/ItemList';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate  } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import axios from '../../api/axios';
import MessageBox from '../../components/MessageBox';
import UserContext from '../../context/UserContext';





const initialValues = {
    levels: "",
    formats: "",
    types: "",
    description: "",
    startTime: "",
    endTime: "",
    frequency: "",
    equipments: [],
}




const CreateClass = () => {

    const { setLoggedIn } = useContext(UserContext);

    const [formData, setFormData] = useState(initialValues);


    const [show, setShow] = useState(false);
    const [levels, setLevels] = useState(Levels);
    const [formats, setFormats] = useState(Formats);
    const [types, setTypes] = useState(Types);
    const [startDate, setStartDate] = useState(null);
    const [moreType, setMoreType] = useState("");
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState({
        body: "",
        type: ""
    });


    const navigate = useNavigate();
    

    const showMore = () => {
        setShow(true)
    }


    
    //for levels
    function makeActiveLevels(index){
        setLevels({...levels, activeBtn: levels.allLevels[index]});
        setFormData({...formData, levels: levels.allLevels[index].name});

    }

    const showActiveLevels = (index) => {
        if(levels.allLevels[index] === levels.activeBtn){
            return "all_btn active";
        }else{
            return "all_btn";
        }
    }
    // for levels


    //for formats
    function makeActiveFormats(index){
        setFormats({...formats, activeBtn: formats.allFormats[index]});
        setFormData({...formData, formats: formats.allFormats[index].name});

    }

    const showActiveFormats = (index) => {
        if(formats.allFormats[index] === formats.activeBtn){
            return "all_btn active";
        }else{
            return "all_btn";
        }
    }
    // for formats


    //for types
    function makeActiveTypes(index){
        setTypes({...types, activeBtn: types.allTypes[index]});
        setFormData({...formData, types: types.allTypes[index].name});
    }

    const showActiveTypes = (index) => {
        if(types.allTypes[index] === types.activeBtn){
            return "all_btn active";
        }else{
            return "all_btn";
        }
    }
    // for typess

    // for checkbox //

    const handleCheck = (e) => {
        const value = e.target.value;
        if(e.target.checked){
            setFormData({...formData, frequency: value});

        }else{
            return false;
       

        }
    }


    const handleStartTime = (e) => {
        const newValue = e.target.value
        //setStartTime(newValue);
        setFormData({...formData, startTime: newValue.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})});

    }

    const handleEndTime = (e) => {
        const newValue = e.target.value
        setFormData({...formData, endTime: newValue.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})});
    }

    const handleDescription = (e) => {
        setFormData({...formData, description: e.target.value});

    }



    const handleMoreTypes = (e) => {
        const value = e.target.value
        setMoreType(value);
        
    }

    const submitMoreTypes = () => {
        setFormData({...formData, types: moreType});
        
    }


    const addItem = (newItem) => {
       
        setFormData({...formData, equipments: [newItem, ...formData.equipments]});

    };

    const removeItem = (id) => {
        // const removeItem = equipments.filter(item => item.id !== id);
        const removeItem = formData.equipments.filter(item => item.id !== id);
        // setItems(removeItem);
        setFormData({...formData, equipments: removeItem});

        
    };


// Equipment


const closeMessage = () => {
    setMessageOpen(false);
}






// handle Submit
const handleSubmit = async (e) => {
    e.preventDefault();


    const data = {...formData, startDate: startDate.toLocaleDateString()};

    try {

        let res = await axios.post('https://immediate-server.herokuapp.com/auth/dashboard/trainer/create-a-class', JSON.stringify(data),  {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        });

    
        if(res.status === 201){
            setMessage({...message, body: res.data.message, type: "success" });
            
            setTimeout(() => {
                
                navigate('/auth/dashboard/trainer/classes');
            }, 2000)
    
        }else{
            setMessage({...message, body: "No class created", type: "error" });

        }
        
    } catch (error) {
      
        if(error.response.status === 401){
            setLoggedIn(false);
            localStorage.removeItem("currentUser");
            localStorage.setItem("isAuth", false);
            
        }
        if(error.response.status === 404){
            setMessageOpen(true);
            setMessage({...message, body: "Could not fetch the data for that resource", type: "error" });
            
        }
        if(error.response.status === 500){
            setMessageOpen(true);
            setMessage({...message, body: "Internal server error", type: "error" });
           
        }

    }

    
}




    return ( 

        <>
        
            <PageLayout>                

                <div className="create-class-container">
                    {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }


                    <div className="back-btn-container">
                        <div className="back_btn" onClick={() => navigate(-1)}>Back</div>
                    </div>

                    <h3 className="heading_class">Add a new class</h3>
                    <form className="create-class-form-container" onSubmit={handleSubmit}>
                        <div className="entity_row level-row" >
                            <div className="row_label">Level of competency</div>
                            <div className="row_btns">
                                {levels.allLevels.map((item, index)=>{
                                   return <Button 
                                                cName={showActiveLevels(index)}
                                                name={item.name} 
                                                click={() => {makeActiveLevels(index)}}
                                                key={index} />
                                })}
                            </div>
                        </div>

                        <div className="entity_row format-row">
                            <div className="row_label">Training Format</div>
                            <div className="row_btns">
                                {formats.allFormats.map((item, index)=>{
                                   return <Button 
                                            cName={showActiveFormats(index)} 
                                            name={item.name}
                                            click={() => {makeActiveFormats(index)}}
                                            key={index}/>
                                })}
                            </div>
                        </div>
                        <div className="entity_row type-row">
                            <div className="row_label">Training Type</div>
                            <div className="row_btns">
                                {types.allTypes.map((item, index)=>{
                                   return <Button 
                                            cName={showActiveTypes(index)} 
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
                                        value={moreType}
                                        onChange={handleMoreTypes}
                                        
                                        />
                                    <Button cName='all_btn' name='Add more type' click={() => submitMoreTypes()}/>
                                </div>
                                : null
                     
                            }

                            <span>{formData.types}</span>
                            

                        </div>

                        <div className="entity_row description-row">
                            <div className="row_label">Description</div>
                            <div className="row_text">
                                <textarea 
                                    placeholder="Provide additional description/information about the class" 
                                    cols="105" 
                                    rows="15"
                                    value={formData.description}
                                    onChange={handleDescription}
                                ></textarea>
                            </div>
                        </div>

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
                               
                            </div>                            
                            
                        </div>

                        <div className="entity_row time-row">
                            <div className="time_slots">
                                <div className="start_time">

                                    <div className="row_label">Start time</div>
                                    <div className="row_text">
                                        <TimePickerComponent 
                                            placeholder="Select a start time"
                                            value={formData.startTime}
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
                                            value={formData.endTime}
                                            step={15}
                                            onChange ={handleEndTime}
                                            
                                            >
                                            
                                        </TimePickerComponent>
                                    </div>

                                </div>
                                

                            </div>
                            
                        </div>

                        <div className="entity_row frequency-row">
                            <div className="row_label">Class frequency</div>
                            <div className="row_boxes">
                                <div className="checkbox_container">
                                    <div className="checkbox_label">Daily</div>
                                    <CheckBoxComponent value="Daily" onChange={handleCheck}/>
                                </div>
                                <div className="checkbox_container">
                                    <div className="checkbox_label">Every 2 days</div>
                                    <CheckBoxComponent value="Every 2 days" onChange={handleCheck}/>
                                </div>
                                <div className="checkbox_container">
                                    <div className="checkbox_label">Weekly</div>
                                    <CheckBoxComponent value="Weekly" onChange={handleCheck}/>
                                </div>
                                <div className="checkbox_container">
                                    <div className="checkbox_label">Monthly</div>
                                    <CheckBoxComponent value="Monthly" onChange={handleCheck}/>
                                </div>
                               
                            </div>
                        </div>

                        <div className="entity_row equipment-row">
                            <div className="row_label">Exercise equipment needed</div>
                            <div className="row_equipment">
                                <div className="profile_input_row">
                                    <ItemForm addItem={addItem} placeholder="Add an Equipment"/>
                                </div>
                                
                            </div>

                            <ItemList 
                                    items={formData.equipments}
                                    removeItem={removeItem}
                                    name="allEquipments"

                                    
                                />

                            
                        </div>


                        <div className="add-class-btn-container">
                            <button className="add_class_btn">Add Class</button>
                        </div>




                    </form>
                
                </div>

            </PageLayout>      
        </>

     );
}
 
export default CreateClass;