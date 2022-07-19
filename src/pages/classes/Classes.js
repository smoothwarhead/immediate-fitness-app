
import { Link } from 'react-router-dom';
import FlatButton from '../../components/FlatButton';
import '../../files/styles/Classes.css';
import ClassDashboard from '../../components/classDashboard/ClassDashboard';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import ListRow from '../../components/rows/ListRow';
import useFetch from '../../hooks/useFetch';
import DashboardLayout from '../../components/DashboardLayout';
import LoadingData from '../../components/LoadingData';
import MessageBox from '../../components/MessageBox';





const TrainerClasses = () => {


    const { classes } = useContext(DataContext);

    const { isPending, messageOpen, message, closeMessage } = useFetch('/auth/dashboard/trainer/classes');
    

       
    classes.sort((a, b) => {
        return a.timeStamp - b.timeStamp;
    });

  
    

    return ( 
        <>
            { isPending && <LoadingData /> }

            {isPending ? <div></div> :
                <DashboardLayout>
                    
                    <div className="content_container">

                        {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }
                        

                                               
                        
                        <div className="create-a-new-class-btn-left">
                            <Link to={'/auth/dashboard/trainer/create-a-class'}><FlatButton name='Create a new class' cName='left_add_class_btn'/></Link>

                        </div>
                            

                        <div className="list-of-all-classes">
                            <ListRow title="List of all classes" items={classes} rowNumber={1}/>

                        </div>
                        

                        <div className="class_all_classes_container">       
                            
                            
                            <ClassDashboard classes={classes}/>

                        </div>

                    </div>
                    
                </DashboardLayout>
            }
        </>
     );
}
 
export default TrainerClasses;