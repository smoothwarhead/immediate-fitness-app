// import { useContext } from "react";
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Class from '../../components/class/Class';
import ClassCard from '../../components/class/ClassCard';
import PageLayout from '../../components/PageLayout';
import Paginate from '../../components/Paginate';
import { DataContext } from '../../context/DataContext';
import '../../files/styles/session.css';
import usePagination from '../../hooks/usePagination';
import useMediaQuery from '../../hooks/useMediaQuery';
import useFetch from '../../hooks/useFetch';
import LoadingData from '../../components/LoadingData';
import MessageBox from '../../components/MessageBox';
import UserContext from '../../context/UserContext';


const Session = () => {

    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const isSession = true;



    const getUrl = (role) => {
        if(role === 3030){
            return 'https://immediate-server.herokuapp.com/auth/dashboard/trainer/classes'
        }
        else{
            return 'https://immediate-server.herokuapp.com/auth/dashboard/client/classes'

        }
    }
    
    const { isPending, messageOpen, message, closeMessage } = useFetch(getUrl(user.allowedRole));



    const { classes } = useContext(DataContext);

    const { id } = useParams();

    const getTitle = (id) => {

        if(id === "1"){
            return "List of all classes";
        }else if(id === "2"){
            return "Personal Sessions";
        }else{
            return "Group Sessions";
        }
    }




    const getClasses = (id, items) => {

        const personalClasses = items.filter(item => item.format === "Personal");
        const groupClasses = items.filter(item => item.format === "Group");

        if(id === "1"){
            return items;
           
        }
    
        if(id === "2"){
            return personalClasses;
           
        }
        if(id === "3"){
            return groupClasses;
            
        }
        

    }

    const isMax960 = useMediaQuery('(max-width: 960px)');


    const makeNumber = () => {
        if(isMax960){
            return 4;
        }       
        else{
            return 6;
        }
        
    }




    const { displayData, pageCount, changePage } = usePagination(getClasses(id, classes), makeNumber());

   



    return ( 
        <>
            { isPending && <LoadingData /> }

            {isPending ? <div></div> :

                <PageLayout>

                    <div className="session_class_content">
                        <div className="back-btn-container">
                            <div className="back_btn session_back" onClick={() => navigate(-1)}>Back</div>
                        </div>
                        {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }


                        <div className="session_title">{ getTitle(id) }</div>
                        <div className="session_classes">

                            <div className="session-classes-flex">

                                {id === "1" ? 
                                    displayData.map((item, index) => (
                                        <ClassCard item= {item} key={index} isSession={isSession}/>
                                    ))
                                
                                
                                :
                
                                displayData.map((item, index) => (
                                    <Class item={item} key={index} />
                                    
                                ))}

                            </div>
                            

                        </div>

                        <div className="session-pagination">
                            <Paginate pageCount={pageCount} changePage={changePage} />

                        </div>
                        



                    </div>
                </PageLayout>
            }
        </>
     );
}
 
export default Session;