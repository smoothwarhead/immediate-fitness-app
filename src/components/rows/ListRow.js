import { CgArrowLongRight } from 'react-icons/cg';
import ClassCard from '../class/ClassCard';
import { Link } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';
import { makeSlider } from '../../files/makeSlider';
import { useState } from 'react';
import Carousel from '../Carousel';





const ListRow = ({ title, items, rowNumber }) => {


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


    
    



    return ( 
        <>
            <div className="row">
                <div className="row_title">
                    <div className="row_title_left class_list_title"><p>{title}</p></div>
                    {items.length < 4 ? <div></div> : 
                       <Link to={`/auth/dashboard/trainer/classes/session/${rowNumber}`}><div className="row_title_right"><p>View all</p> <div className="icon"><CgArrowLongRight /></div></div></Link>
                    }
                </div> 

                                        
                
                <div className={isMax700 ? "row_content inactive" : "row_content" }>
                    
                    {items.length === 0 ? <p>No class to display at this time</p> :                                     
                        
                        (makeSplit).map((item, index) => (
                            
                            <ClassCard item= {item} key={index} />

                        ))
                    }  

                </div>



                <div className={isMax700 ? "class-row-content active" : "class-row-content"}>
                        
                        <div className="class-row-content-classes">
                            {items.length === 0 ? <p>No available class on this day</p> :                                     
                                
                                displayData.map((item, index) => (

                                    <ClassCard item= {item} key={index} />
                                            

                                ))
                            }  
                        </div>

                        <Carousel slideNumber={slideNumber} setSlideNumber={setSlideNumber} items={items} slideCount={slideCount} isEvent={false} cName="list-row" />
                </div>
            </div>


        </>
     );
}
 
export default ListRow;