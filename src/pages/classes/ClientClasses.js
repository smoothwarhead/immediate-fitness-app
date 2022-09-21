import { Link, useLocation } from 'react-router-dom';
import FlatButton from '../../components/FlatButton';
import '../../files/styles/Classes.css';
import ClassDashboard from '../../components/classDashboard/ClassDashboard';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import useFetch from '../../hooks/useFetch';
import DashboardLayout from '../../components/DashboardLayout';
import MessageBox from '../../components/MessageBox';






const ClientClasses = () => {


    
    const { classes } = useContext(DataContext);
    

    const { messageOpen, message, closeMessage } = useFetch('https://immediate-server.herokuapp.com/auth/dashboard/client/classes');

    const navigate = useNavigate();


    const location = useLocation();
    const checkLocation = '/auth/dashboard/client/classes';

    
    const handleNavigate = () => {
        navigate('/auth/dashboard/client/classes/find-a-class', { replace: true });

    };

    return ( 
        <>
            

            <DashboardLayout>
                
                <div className={ location.pathname === checkLocation ?  ( classes.length === 0 ? "class_content_container empty-data" : "class_content_container") : "content_container" }>

                    {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }

                    

                    <div className="create-a-new-class-btn-left">
                        <FlatButton name='Find a class' cName='left_add_class_btn' action={handleNavigate}/>
                    
                    </div>
                    

                    <div className="client_class_all_classes_container">
                        { classes.length === 0 ? 
                            <div className="no-class">You have no class enrolled to at this moment. Please find a class to join</div>
                            :
                            <ClassDashboard classes={classes}/>

                        
                        }                   
                        

                    </div>

                </div>
                
            </DashboardLayout>
            
        </>
     );
}
 
export default ClientClasses;