import { useState } from "react";
import { makeSlider } from "../files/makeSlider";
import Carousel from "./Carousel";
import Class from "./class/Class";
import useMediaQuery from "../hooks/useMediaQuery";





const EventSlider = ({items}) => {
    
    const [slideNumber, setSlideNumber] = useState(0);
    



    const formatDate = (value) => {
        const date = new Date(value);
        const today = new Date().toLocaleDateString()
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

        if(date.toLocaleDateString() === today){
            return 'Today';
        }else{
            return date.toLocaleDateString('en-us', options);
        }

    }

    const is700 = useMediaQuery('(min-width: 700px)');
    const isMax700 = useMediaQuery('(max-width: 700px)');
    const isMax840 = useMediaQuery('(max-width: 840px)');



    // const splitItems = (items, num) => {
    //     return items.slice(0, num);
    // }


    const makeNumber = () => {
        if(isMax700){
            return 1;
        }
        if(isMax840 && is700){
            return 2;
        }        
        else{
            return 3;
        }
        
    }

    // const makeSplit = is1120 ? splitItems(items, 3) : 
    //                     is840 ? splitItems(items, 2) :
    //                     is768 ? splitItems(items, 2) :
    //                     is700 ? splitItems(items, 2) :
    //                     is130 ? splitItems(items, 1) :
    //                     splitItems(items, 2)




    const { slideCount, displayData } = makeSlider(items, slideNumber, makeNumber());
    



    return ( 
        <>
            
            <div className="event-row">
                <div className="event-row-title">
                    <div className="event-title-left">{items.length === 0 ? <p>{ new Date().toLocaleDateString('en-us', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p> : <p>{formatDate(items[0].start_date)}</p>}</div>
                    <div className="event-title-right"><p>{`${items.length} ${items.length === 1 ? "class" : "classes"}`}</p></div>
                    
                </div>        
            
                <div className="event-row-content">

                    
                    <div className="event-row-content-classes">
                        {items.length === 0 ? <p>No available class on this day</p> :                                     
                            
                            displayData.map((item, index) => (

                                <Class item={item} key={index}/>  
                                        

                            ))
                        }  
                    </div>

                </div>

                <Carousel slideNumber={slideNumber} setSlideNumber={setSlideNumber} items={items} slideCount={slideCount} isEvent={true} cName="" />

                        
                        
            </div>
            
            
        </>
     );
}
 
export default EventSlider;