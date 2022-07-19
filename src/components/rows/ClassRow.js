import { useContext, useState } from 'react';
import { CgArrowLongRight } from 'react-icons/cg';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Link } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';
// import Session from '../../pages/classes/Session';
import Class from '../class/Class';
import { makeSlider } from '../../files/makeSlider';
import Carousel from '../Carousel';
import UserContext from '../../context/UserContext';




const ClassRow = ({ title, items, rowNumber, isUpcoming }) => {

    const { user } = useContext(UserContext);

    const [isOpen, setIsOpen] = useState(true);

    const hideRow = () => {
        setIsOpen(!isOpen);
    }

    // const trimClasses = (arr) => {
    //     const size = 3
    //     return arr.slice(0, size);
    // }

    const is1120 = useMediaQuery('(min-width: 1120px)');
    const is840 = useMediaQuery('(min-width: 840px)');
    const is768 = useMediaQuery('(min-width: 768px)');
    const is700 = useMediaQuery('(min-width: 700px)');
    const is130 = useMediaQuery('(min-width: 130px)');

    const isMax700 = useMediaQuery('(max-width: 700px)');


    const splitItems = (items, num) => {
        return items.slice(0, num);
    }

    const makeSplit = is1120 ? splitItems(items, 3) : 
                        is840 ? splitItems(items, 2) :
                        is768 ? splitItems(items, 2) :
                        is700 ? splitItems(items, 2) :
                        is130 ? splitItems(items, 1) :
                        splitItems(items, 2)




    const [slideNumber, setSlideNumber] = useState(0);
    const {slideCount, displayData} = makeSlider(items, slideNumber, 1);

    const setUpcoming = (rowNum) => {
        if(isUpcoming){
            if(user.role === 'Trainer'){
                return '/auth/dashboard/trainer/classes/upcoming-events';
            }
            else{
                return '/auth/dashboard/client/classes/upcoming-events';

            }
        }else{
            return `/auth/dashboard/trainer/classes/session/${rowNum}`;
        }
    }



    return ( 
        <>
            <div className="row">
                <div className="row_title">
                    <div className="row_title_left"><p>{title}</p><div className="icon">{isOpen ? <IoIosArrowDown onClick={hideRow}/> : <IoIosArrowUp onClick={hideRow}/>}</div></div>
                    {items.length < 4 ? <div></div> : 
                       <Link to={setUpcoming(rowNumber)}><div className="row_title_right"><p>View all</p> <div className="icon"><CgArrowLongRight /></div></div></Link> 
                    }
                </div> 

                                        
                
                {isOpen ? 

                    <>
                
                        <div className={isMax700 ? "row_content inactive" : "row_content" }> 
                                
                            {items.length === 0 ? <p>No class to display at this time</p> :                                     
                                
                                (makeSplit).map((item, index) => (

                                    <Class item={item} key={index} />                            

                                ))
                            }  

                        </div>


                        <div className={isMax700 ? "class-row-content active" : "class-row-content"}>
                        
                            <div className="class-row-content-classes">
                                {items.length === 0 ? <p>No class to display at this time</p> :                                     
                                    
                                    displayData.map((item, index) => (

                                        <Class item={item} key={index} />                            

                                                

                                    ))
                                }  
                            </div>

                            <Carousel slideNumber={slideNumber} setSlideNumber={setSlideNumber} items={items} slideCount={slideCount} isEvent={false} cName="class-row" />

                        </div>

                    </>
                
                    : 
                
                    <div></div>               
                   
                
                }
                
            </div>
        </>
     );
}
 
export default ClassRow;