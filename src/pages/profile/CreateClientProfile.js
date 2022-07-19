import { useContext, useState } from 'react';
// import FlatButton from '../../components/FlatButton';
import { AiFillCamera } from 'react-icons/ai';
import { Allgenders, ages } from '../../files/CheckboxOptions';
import ProfileCheckbox from '../../components/ProfileCheckbox';
import ItemForm from '../../components/addItems/ItemForm';
import ItemList from '../../components/addItems/ItemList';
import ProfileInput from '../../components/ProfileInput';
import '../../files/styles/makeProfile.css';
import '../../files/styles/AddItems.css';
import { useNavigate } from 'react-router-dom';
import NoUserHeader from '../../components/NoUserHeader';
import axios from '../../api/axios';
import UserContext from '../../context/UserContext';
import MessageBox from '../../components/MessageBox';





const initialValues = {
    age: "",
    gender: "",
    foot: "",
    inches: "",
    weight: "",
    items: [],
}

function CreateClientProfile() {

    
    const [formData, setFormData] = useState(initialValues);
    const [profilePicture, setProfilePicture] = useState(null);
    const [file, setFile] = useState({
        file:[],
    });

    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState({
        body: "",
        type: ""
    });

    const navigate = useNavigate();

    const { user, setLoggedIn } = useContext(UserContext);




    //profile picture preview

    const imageHandler = (e) => {
        const selected = e.target.files[0];
        setFile({...file, file:selected});

        const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
        if(selected && ALLOWED_TYPES.includes(selected.type)){
            let reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result)
            }
            reader.readAsDataURL(selected)
        } else {
            // setError(true);
            console.log("file not supported");
        }

 
    }


    //get selected box
    const getAgeValue = (value) => {
        setFormData({...formData, age: value});
  
    }


    //get selected box
    const getGenderValue = (value) => {
        setFormData({...formData, gender: value});
  
    }


    //get inputed box
    const getWeightValue = (value) => {
        setFormData({...formData, weight: value});
    }

    //get inputed box
    const getfootValue = (value) => {
        setFormData({...formData, foot: value});
    }

    //get inputed box
    const getInchesValue = (value) => {
        setFormData({...formData, inches: value});
    }




    const addItem = (newItem) => {
        //setItems([newItem, ...items]);
        // setFormData([newItem, ...formData.items]);
        setFormData({...formData, items: [newItem, ...formData.items]});

    };

    const removeItem = (id) => {
        // const removeItem = items.filter(item => item.id !== id);
        const removeItem = formData.items.filter(item => item.id !== id);
        // setItems(removeItem);
        setFormData({...formData, items: removeItem});

        
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const height = `${formData.foot}'${formData.inches}`;

       
        const data = new FormData();

        data.append('file', file.file);
        data.append('age', formData.age );
        data.append('gender', formData.gender);
        data.append('height', height);
        data.append('weight', formData.weight);
        data.append('fitness_goals', JSON.stringify(formData.items));



        try{


            let res = await axios.post('/auth/create-client-profile', data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true
                })


                if(res.status === 201){
                    setMessageOpen(true);
                    setMessage({...message, body: res.data.message, type: "success" });
                    
                    setTimeout(() => {
                        navigate(`/auth/dashboard/${user.role.toLowerCase()}`);
                    }, 2000);
                   
                }else{
                    setMessageOpen(true);
                    setMessage({...message, body: "Your profile could not be created at this time", type: "error" });

                }  


        }catch(error){
            console.log(error);
           
            if(error.response.status === 401){
                
                setLoggedIn(false);
                localStorage.removeItem("currentUser");
                localStorage.setItem("isAuth", false);
                
            }
            if(error.response.status === 404){
                
                setMessageOpen(true);
                setMessage({...message, body: "Your profile could not be created at this time", type: "error" });

                
            }
            if(error.response.status === 500){
                
                setMessageOpen(true);
                setMessage({...message, body: "Your profile could not be created at this time", type: "error" });

               
            }
            
        }
        
    }


    const closeMessage = () => {
        setMessageOpen(false);
    }



    return ( 

        <>
            <NoUserHeader cName="account-logo" />
            <div className="create_profile_page">
               


                <div className="create-profile-content">
                    {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }


                
                    <form className="create-form-profile-container" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="about_you">About you</div>
                        <p className="profile_picture_text">Let's add a profile picture</p>
                        <div className="image_upload_container">
                            <div className="image_upload">
                                <img src={profilePicture} alt="" className="img" />
                            </div>
                            <div className="camera_container">
                                <input type="file" id="input" name="profileImage" accept="image/*" onChange={imageHandler}/>
                                <div className="camera_icon">
                                    <label htmlFor="input" className="image-uplaod">
                                        <AiFillCamera className='camera' />
                                    </label>
                                    
                                </div>
                            </div>

                        </div>
                        

                        <div className="check-ages">
                            <ProfileCheckbox items = {ages.allRanges} rowTitle={ages.title} getSelectedValue={getAgeValue}/>
                        </div>

                        <div className="check-gender">
                            <ProfileCheckbox getSelectedValue={getGenderValue} name="myGender" items = {Allgenders.allRanges} rowTitle={Allgenders.title}/>

                        </div>

                        <div className="height_inputs">
                            <ProfileInput rowTitle="What is your height" unit="ft" getInputedValue={getfootValue}/>
                            <ProfileInput unit="In" getInputedValue={getInchesValue}/>
                        </div>

                        <div className="check-weight">
                            <ProfileInput rowTitle="What is your weight" unit="lbs" getInputedValue={getWeightValue}/>

                        </div>
                            
                        <div className="section_container">
                            <div className="profile_row_title">What is/are your fitness goals</div>
                            <div className="create-profile-input_container">
                                <div className="input_row_container">
                                    <div className="profile_input_row">
                                        <ItemForm  addItem={addItem} placeholder="Area of specialization"/>
                                    </div>
                                </div>
                            </div>
                            

                            <ItemList 
                                items={formData.items}
                                removeItem={removeItem}
                                name="areaOfSpec"
                                
                            />

                        </div>                            

                        
                        <div className="client-create-button_container">
                        
                            <button className="create-profile-btn">Save Profile</button>


                        </div>



                        
                    </form>

                </div>

                    

                
                
                
            </div>
        </>
     );
}

export default CreateClientProfile;
