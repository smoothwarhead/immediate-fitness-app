import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import '../files/styles/makeProfile.css';



const ProfileCheckbox = ({ items, rowTitle, getSelectedValue }) => {


    const handleCheck = (e) => {
        const value = e.target.value;
        if(e.target.checked){
            getSelectedValue(value);
        }else{
            return false;
        }
    }


    return ( 
        
        <>
            <div className="checkbox_container">
                <div className="profile_row_title">{rowTitle}</div>
                <div className="checkbox_row_container">
                    {items.map((item, index) => (
                        <div className="profile_checkbox_row" key={index}>
                            <div className="profile_checkbox_row_label">{item.range}</div>
                            <CheckBoxComponent value={item.range} onChange={handleCheck}/>
                        </div>
                    ))}
                </div>

            </div>
        
        </>
     );
}
 
export default ProfileCheckbox;