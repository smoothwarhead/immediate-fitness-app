import { useState } from 'react';


const ProfileInput = ({ rowTitle, unit, getInputedValue }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
        if(isNaN(e.target.value)){
            
            return 'Not a Number!';

        }
        else{
            getInputedValue(e.target.value);
        }
    }




    
    return ( 

        <>
            <div className="profile_row_title">{rowTitle}</div>
            <div className="create-profile-input_container">
                <div className="input_row_container">
                    <div className="profile_input_row">
                        <input type="text" value={value} className="profile_input" onChange={handleChange}/>
                        <div className="unit">{unit}</div>
                    </div>
                </div>

            </div>
        </>
     );
}
 
export default ProfileInput;