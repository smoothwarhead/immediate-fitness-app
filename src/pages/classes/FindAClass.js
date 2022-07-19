
import { Levels, Formats } from "../../files/ClassEntities";
import { useContext, useState, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import FindClass from '../../components/class/FindClass';
import axios from '../../api/axios';
import { useNavigate  } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import LoadingData from '../../components/LoadingData';
import Paginate from "../../components/Paginate";
import usePagination from "../../hooks/usePagination";
import MessageBox from "../../components/MessageBox";







const FindAClass = () => {

    const { setLoggedIn } = useContext(UserContext);
    const [levels, setLevels] = useState(Levels);
    const [formats, setFormats] = useState(Formats);
    const [isPending, setIsPending] = useState(true);
    const [allClasses, setAllClasses] = useState([]);
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState({
        body: "",
        type: ""
    });
   
    
    // const [buttonValue, setButtonValue] = useState('');
    // const [filters] = useState([
    //     {value: "All"},
    //     {value: "Personal"},
    //     {value: "Group"},
    //     {value: "Beginners"},
    //     {value: "Intermediate"},
    //     {value: "Advanced"}

    // ])


    const navigate = useNavigate();

   
  
    useEffect(() => {

        const getAllClasses = async() => {

            const emptyClasses = [];

            try {
                

                let res = await axios.get('/auth/dashboard/client/classes/find-a-class', {
                    withCredentials: true
                });

                console.log(res);

                if(res.status === 200){

                    setIsPending(false);
                    setAllClasses(res.data.classes);
                    setLoggedIn(res.data.logIn);

                }else if(res.status === 204){
                    setIsPending(false);
                    setAllClasses(emptyClasses);
                    setLoggedIn(true);
                   
                }                
                else{
                    throw Error("Could not fetch the data for that resource");
                }


         
                
                
            // })
                
            } catch (error) {
                console.log(error.response);
                
                if(error.response.status === 401){
                    setIsPending(false);
                    setLoggedIn(false);
                    localStorage.removeItem("currentUser");
                    localStorage.setItem("isAuth", false);
                    
                }
                if(error.response.status === 404){
                    setIsPending(false);
                    setMessageOpen(true);
                    setMessage({...message, body: "Could not fetch the data for that resource", type: "error" });
                    
                }
                if(error.response.status === 500){
                    setIsPending(false);
                    setMessageOpen(true);
                    setMessage({...message, body: "Internal server error", type: "error" });
                   
                }
            }

        }

        getAllClasses();
        
        
    }, [setLoggedIn, message]);

    const { displayData, pageCount, changePage } = usePagination(allClasses, 6);



    const addClass = async ( element ) => {
        const data = {
            classId: element.classId,
            trainerId: element.trainerId
        }

        try {

            let res = await axios.post('/auth/dashboard/client/classes/add-a-class', 

                JSON.stringify(data),{
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                })

            if(res.status === 201){
                
                setMessageOpen(true);
                setMessage({...message, body: res.data.message, type: "success" });
                setTimeout(() => {
                    navigate('/auth/dashboard/client/classes');
                }, 2000);

            }
            if(res.status === 200){
                
                setMessageOpen(true);
                setMessage({...message, body: res.data.message, type: "error" });
                
            }

            if(res.status === 400){
                setMessageOpen(true);
                setMessage({...message, body: "Something went wrong", type: "error" })

            }
            
        } catch (error) {
            console.log(error);
            setMessageOpen(true);
            if(error.response.status === 401){
                // setIsPending(false);
                setLoggedIn(false);
                localStorage.removeItem("currentUser");
                localStorage.setItem("isAuth", false);
                
            }
            if(error.response.status === 404){
                // setIsPending(false);
                setMessageOpen(true);
                setMessage({...message, body: "Something went wrong", type: "error" })
                
            }
            if(error.response.status === 500){
                // setIsPending(false);
                setMessageOpen(true);
                setMessage({...message, body: "Internal server error", type: "error" });
               
            }
        }


        
    }






    function makeActiveFormats(index, e){
        setFormats({...formats, activeBtn: formats.allFormats[index]});
        setMakeAll(false);

        const personalClasses = displayData.filter(item => item.format === "Personal");
        const groupClasses = displayData.filter(item => item.format === "Group");


        if(e.target.textContent === "Personal"){
            setFilteredClasses(personalClasses);
        }

        if(e.target.textContent === "Group"){
            setFilteredClasses(groupClasses);
        }

    }

    const showActiveFormats = (index) => {
        if(formats.allFormats[index] === formats.activeBtn){
            return "filter_elements_btn active";
        }else{
            return "filter_elements_btn";
        }
    }


    const showActiveLevels = (index) => {
        if(levels.allLevels[index] === levels.activeBtn){
            return "filter_elements_btn active";
        }else{
            return "filter_elements_btn";
        }
    }

    function makeActiveLevels(index, e){
        setLevels({...levels, activeBtn: levels.allLevels[index]});
        setMakeAll(false);


        const beginnersClasses = displayData.filter(item => item.level === "Beginners");
        const intermediateClasses = displayData.filter(item => item.level === "Intermediate");
        const advancedClasses = displayData.filter(item => item.level === "Advanced");

        


        if(e.target.textContent === "Beginners"){
            setFilteredClasses(beginnersClasses);
        }
        if(e.target.textContent === "Intermediate"){
            setFilteredClasses(intermediateClasses);
        }
        if(e.target.textContent === "Advanced"){
            setFilteredClasses(advancedClasses);
        }


    }
    

    const [makeAll, setMakeAll] = useState(true);

    const allClick = () => {
        setMakeAll(true);
        setFormats({...formats, activeBtn: null});
        setLevels({...levels, activeBtn: null});
        setFilteredClasses(displayData);


    }


    
    const closeMessage = () => {
        setMessageOpen(false);
    }


    

    return (  
        <>
            { isPending && <LoadingData /> }

            {isPending ? <div></div> :
                <DashboardLayout>
                    <div className="find-class-content-container">

                        {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }
                        
                        
                        <div className="filters_container">

                            <div className="filters">
                                <div className="filter_elements all_section">
                                    <div className="filter_elements_title">All</div>
                                    <div className="filter_elements_btns">
                                        <div 
                                            className={makeAll ? "filter_elements_btn active" : "filter_elements_btn"} 
                                            onClick={() => allClick()}
                                        >All</div>

                                    </div>
                                </div>

                                
                                <div className="filter_elements level_section">
                                    <div className="filter_elements_title">Levels</div>
                                    <div className="filter_elements_btns">

                                            {levels.allLevels.map((item, index) => (
                                                <div 
                                                    className={showActiveLevels(index)}
                                                    name={item.name}
                                                    onClick={(e) => {makeActiveLevels(index, e)}}
                                                    key={index}
                                                >
                                                    {item.name}
                                                </div>
                                                
                                            ))}
                    
                                    </div>
                                </div>

                                <div className="filter_elements format_section">
                                    <div className="filter_elements_title">Formats</div>
                                    <div className="filter_elements_btns">
                                        {formats.allFormats.map((item, index)=>(
                                            <div 
                                                className={showActiveFormats(index)}
                                                name={item.name} 
                                                onClick={(e) => {makeActiveFormats(index, e)}}
                                                key={index}
                                            >
                                                {item.name}
                                            </div>
                                        ))}

                    
                                    </div>
                                </div>

                                

                            </div>


                        </div>


                        <div className="search_container">
                            <input type="text" className="input_search" placeholder='Type here to search'/>
                        </div>

                        <div className="find_all_classes_container">

                            {/* <div className="test-btn" onClick={() => handleTestSuccess()}>Success</div>
                            <div className="test-btn" onClick={() => handleTestError()}>Error</div> */}

                            <div className="find-all-classes-items">
                                {
                                    displayData.map((item, index) => (
                                            <FindClass item={item} key={index} addClass={addClass}/>
                                    ))

                                    //  displayData.length === 0 ? 
                                    
                                    //  displayData.map((item, index) => (
                                    //      <FindClass item={item} key={index} addClass={addClass}/>
                                    //  ))
        
                                    //  :  
        
                                    //  filteredClasses.map((item, index) => (
                                    //      <FindClass item={item} key={index} addClass={addClass}/>
                                    //  ))
                                }
                            </div>
                            
            

                            <Paginate pageCount={pageCount} changePage={changePage} /> 


                        </div>


                    </div>
                    

                </DashboardLayout>
            }
        </>
    );
}
 
export default FindAClass;