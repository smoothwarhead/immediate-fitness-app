
import { useNavigate} from 'react-router-dom';
import FlatButton from '../../components/FlatButton';
import '../../files/styles/Classes.css';
import ClassDashboard from '../../components/classDashboard/ClassDashboard';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import ListRow from '../../components/rows/ListRow';
import useFetch from '../../hooks/useFetch';
import DashboardLayout from '../../components/DashboardLayout';
import MessageBox from '../../components/MessageBox';





const TrainerClasses = () => {


    const { classes } = useContext(DataContext);

    const { messageOpen, message, closeMessage } = useFetch('https://immediate-server.herokuapp.com/auth/dashboard/trainer/classes');
    

    const navigate = useNavigate();

       
    classes.sort((a, b) => {
        return a.timeStamp - b.timeStamp;
    });

    const handleNavigate = () => {
        navigate('/auth/dashboard/trainer/create-a-class', { replace: true });

    };

  
    

    return ( 
        <>
           <DashboardLayout>
                    
           <div className={classes.length === 0 ? "class-empty-content-container" : "content_container"}>

                    {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }
                    

                                            
                    
                    <div className="create-a-new-class-btn-left">
                        <FlatButton name='Create a new class' cName='left_add_class_btn' action={handleNavigate}/>

                    </div>
                        

                    <div className="list-of-all-classes">
                        <ListRow title="List of all classes" items={classes} rowNumber={1}/>

                    </div>
                    

                    <div className="class_all_classes_container">       
                        
                        
                        <ClassDashboard classes={classes}/>

                    </div>

                </div>
                    
            </DashboardLayout>
            
        </>
     );
}
 
export default TrainerClasses;