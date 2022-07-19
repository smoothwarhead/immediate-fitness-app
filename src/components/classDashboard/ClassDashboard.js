
// import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
// import { DataContext } from '../../context/DataContext';
// import { UserContext } from '../../context/UserContext';
import ClassRow from '../rows/ClassRow';



const ClassDashboard = ({classes}) => {


    // const { user } = useContext(UserContext);

    // const [isOpen, setIsOpen] = useState(true);

    // const hideRow = () => {
    //     setIsOpen(!isOpen);
    // }


    
    classes.sort((a, b) => {
        return a.timeStamp - b.timeStamp;
    });
    

    
    const personalClasses = classes.filter(item => item.format === "Personal");
    const groupClasses = classes.filter(item => item.format === "Group");
   

    
    return ( 
        <>
         {classes.length === 0 ? <div></div> :
            
            <div className="all_classes_container">   

                                              

               <ClassRow title= "Upcoming Events" items={classes} isUpcoming = {true} />
               <ClassRow title= "Your Personal Sessions" items={personalClasses} rowNumber={2} isUpcoming = {false} />
               <ClassRow title= "Your Group Sessions" items={groupClasses} rowNumber={3} isUpcoming = {false} />

                

                {/* <div className="row">
                    <div className="row_title">
                        <div className="row_title_left"><p>Your Group Sessions</p> <div className="icon">{isOpen ? <IoIosArrowDown onClick={hideRow}/> : <IoIosArrowUp onClick={hideRow}/>}</div></div>
                        <div className="row_title_right"><p>View all</p> <div className="icon"><CgArrowLongRight /></div></div>
                    </div>                        
                    
                    <div className="row_content">

                        {groupClasses.length === 0 ? <p>No class to display at this time</p> :                                     
                                    
                            groupClasses.map((item, index) => (
                                
                                <Class item={item} key={index}/>

                            ))
                        }  
                       
                    </div>
                

                </div> */}

                

            </div>

        }

        </>
     );
}
 
export default ClassDashboard;