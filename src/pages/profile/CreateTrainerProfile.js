import { useContext, useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { Allgenders } from '../../files/CheckboxOptions';
import ProfileCheckbox from '../../components/ProfileCheckbox';
import ItemForm from '../../components/addItems/ItemForm';
import ItemList from '../../components/addItems/ItemList';
import ProfileInput from '../../components/ProfileInput';
import '../../files/styles/makeProfile.css';
import '../../files/styles/AddItems.css';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import NoUserHeader from '../../components/NoUserHeader';
import axios, { axiosPrivate } from '../../api/axios';
import MessageBox from '../../components/MessageBox';
import useAuth from '../../context/useAuth';
import LoadingData from '../../components/LoadingData';





const initialValues = {
    gender: "",
    yearOfExp: "",
    items: [],
    aboutMe: "",
}

function CreateTrainerProfile() {

    const { user, setLoggedIn} = useContext(UserContext);

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
    const { isPending, setIsPending } = useAuth();





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



    const handleAboutMe = (e) => {
        setFormData({...formData, aboutMe: e.target.value});
    }

    //get selected box
    const getSelectedValue = (value) => {
        setFormData({...formData, gender: value});
  
    }


    //get inputed box
    const getInputedValue = (value) => {
        setFormData({...formData, yearOfExp: value});
    }





    const addItem = (newItem) => {
        
        setFormData({...formData, items: [newItem, ...formData.items]});

    };

    const removeItem = (id) => {
        const removeItem = formData.items.filter(item => item.id !== id);
        
        setFormData({...formData, items: removeItem});

        
    };

 


    const handleSubmit = async(e) => {
        e.preventDefault();

        const fileData = new FormData();

        fileData.append('file', file.file);
        fileData.append("upload_preset", "immediate");

        
       

       
        
        try{


            setIsPending(true);

            let uploadedResponse = await axiosPrivate.post('https://api.cloudinary.com/v1_1/greenietec/image/upload', fileData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });

            if(uploadedResponse.status === 200){
                const data = { fileName: uploadedResponse.data.url, fileId: uploadedResponse.data.public_id, aboutMe: formData.aboutMe,  gender: formData.gender, yearOfExp: formData.yearOfExp, areaOfSpec: JSON.stringify(formData.items) };

                let res = await axios.post('/auth/create-trainer-profile', data,
                    {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true
                    })


                if(res.status === 201){
                    setMessageOpen(true);
                    setMessage({...message, body: res.data.message, type: "success" });
                    setIsPending(false);
                    
                    navigate(`/auth/dashboard/${user.role.toLowerCase()}`);
                    
                    
                }else{
                    setIsPending(false);
    
                    setMessageOpen(true);
                    setMessage({...message, body: "Your profile could not be created at this time", type: "error" });
                }  



            }else{
                setMessageOpen(true);
                setMessage({...message, body: "Your profile could not be created at this time", type: "error" });
            }

            

        }catch(error){
            setIsPending(true);

            if(error.response.status === 401){
                
                setLoggedIn(false);
                localStorage.removeItem("currentUser");
                localStorage.setItem("isAuth", false);
                
            }
            if(error.response.status === 404){
                setIsPending(false);
                
                setMessageOpen(true);
                setMessage({...message, body: "Your profile could not be created at this time", type: "error" });

                
            }
            if(error.response.status === 500){
                setIsPending(false);
                
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
            { isPending && <LoadingData /> }

            { !isPending && <NoUserHeader cName="account-logo"/>}
            
            { !isPending &&
                <div className="create_profile_page">
                <div className="create-profile-content">

                    {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }

                    <form className="create-form-profile-container" onSubmit={handleSubmit} encType="multipart/form-data">
                        <h3 className="about_you">About you</h3>
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
                            <ProfileCheckbox getSelectedValue={getSelectedValue} name="myGender" items = {Allgenders.allRanges} rowTitle={Allgenders.title}/>

                        </div>

                        <div className="section_about_container">
                                <div className="section_text">Please take a moment to tell your clients about yourself</div>
                                <div className="profile_row_title">About me</div>
                                <div className="row_text">
                                    <textarea 
                                        name="aboutMe"
                                        placeholder="About me" 
                                        cols="80" 
                                        rows="15"
                                        value={formData.aboutMe}
                                        onChange={handleAboutMe}

                                    ></textarea>
                                </div>
                        </div>


                        <div className="check-weight">
                                <ProfileInput name="yearOfExp" getInputedValue={getInputedValue} rowTitle="Years of Experience" />                             

                        </div>

                        <div className="section_container">
                            <div className="profile_row_title">What is/are your area of specializations</div>
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
            }
        </>
     );
}

export default CreateTrainerProfile
