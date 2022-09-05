import { useContext } from "react";
import UserContext from "../../context/UserContext";

import '../../files/styles/Dashboard.css';
import ClassDashboard from "../../components/classDashboard/ClassDashboard";
import LoadingData from "../../components/LoadingData";
import DashboardLayout from "../../components/DashboardLayout";
import MessageBox from "../../components/MessageBox";


export default function ClientDashboard({classes, isPending, messageOpen, message, closeMessage}) {

    const { user } = useContext(UserContext);

    

    return (
        <>

            { isPending && <LoadingData /> }

            {isPending ? <div></div> :
                <DashboardLayout>

                    

                    { classes &&                 

                        <div className={classes.length === 0 ? "content_container empty-data" : "content_container"}>

                            {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }

                            <h2 className="hello_name">{`Hello, ${user?.firstName}!`}</h2>

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
