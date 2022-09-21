import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate} from "react-router-dom";
import FlatButton from '../../components/FlatButton';
import '../../files/styles/Dashboard.css';
import ClassDashboard from "../../components/classDashboard/ClassDashboard";
import DashboardLayout from "../../components/DashboardLayout";
import LoadingData from "../../components/LoadingData";
import MessageBox from "../../components/MessageBox";




export default function TrainerDashboard({classes, messageOpen, message, closeMessage}) {

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/auth/dashboard/trainer/create-a-class', { replace: true });

    };

    return (
        <>


            <DashboardLayout>

                <div className={classes.length === 0 ? "empty-content-container" : "content_container"}>


                    {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }

                    <h2 className="hello_name">{`Hello, ${user?.firstName}!`}</h2>

                    <div className="create-a-new-class-btn">
                        <FlatButton name='Create a new class' cName='new_class_btn' action={handleNavigate}/>

                    </div>

                    <div className="content-items">
                        {classes.length === 0 ? <div className="no-class">You are yet to create a class.</div> : 
                        
                            <ClassDashboard classes={classes}/>
                        }

                    </div>
                    
                    
                    


                </div> 
                
                
            </DashboardLayout>
           
        </>
    )
}

