import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import FlatButton from '../../components/FlatButton';
import '../../files/styles/Dashboard.css';
import ClassDashboard from "../../components/classDashboard/ClassDashboard";
import DashboardLayout from "../../components/DashboardLayout";
import LoadingData from "../../components/LoadingData";
import MessageBox from "../../components/MessageBox";




export default function TrainerDashboard({classes, isPending, messageOpen, message, closeMessage}) {

    const { user } = useContext(UserContext);



    return (
        <>

            { isPending && <LoadingData /> }

            {isPending ? <div></div> :

                <DashboardLayout>

                    { isPending && <LoadingData /> }

                    { classes &&                 

                        <div className={classes.length === 0 ? "content_container empty-data" : "content_container"}>

                            {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }

                            <h2 className="hello_name">{`Hello, ${user?.firstName}!`}</h2>

                            <div className="create-a-new-class-btn">
                                <Link to={`/auth/dashboard/trainer/create-a-class`}><FlatButton name='Create a new class' cName='new_class_btn'/></Link>

                            </div>

                            <div className="content-items">
                                {classes.length === 0 ? "You are yet to create a class" : 
                                
                                    <ClassDashboard classes={classes}/>
                                }

                            </div>
                            
                            
                            


                        </div> 
                    
                    }
                    
                </DashboardLayout>
            }

        </>
    )
}

