import { useContext } from "react";
import UserContext from "../../context/UserContext";

import '../../files/styles/Dashboard.css';
import ClassDashboard from "../../components/classDashboard/ClassDashboard";
import DashboardLayout from "../../components/DashboardLayout";
import MessageBox from "../../components/MessageBox";


export default function ClientDashboard({classes, messageOpen, message, closeMessage}) {

    const { user } = useContext(UserContext);

    

    return (
        <>

            <DashboardLayout>

                
               

                <div className={classes.length === 0 ? "empty-content-container" : "content_container"}>

                    {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }

                    <h2 className="hello_name">{`Hello, ${user?.firstName}!`}</h2>

                    <div className="content-items">
                        {classes.length === 0 ? <div className="no-class">You are not registered to any class at this time.</div> : 
                        
                            <ClassDashboard classes={classes}/>
                        }

                    </div>
                    
                    
                    


                </div> 

                

            </DashboardLayout>
            
        </>
    )
}
