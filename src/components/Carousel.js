import '../files/styles/session.css';
import { CgArrowLongRight, CgArrowLongLeft } from 'react-icons/cg';



const Carousel = ({ slideNumber, setSlideNumber, items, slideCount, isEvent, cName }) => {

    
    
  return (
    <>
        <div className={isEvent ? "carousel-icons-container" : `class-carousel-icons-container ${cName} ` }>
            <div  
                className={isEvent ? "carousel-icons icon-left" : "class-carousel-icons icon-left" } 
                onClick={() => {
                    slideNumber > 0 && setSlideNumber(slideNumber - 1)
                }}
            >
                { slideNumber === 0 ? <div></div> : <CgArrowLongLeft /> }
            </div>

            <div 
                className={isEvent ? "carousel-icons icon-right" : "class-carousel-icons  icon-right" } 
                onClick={() => {
                    setSlideNumber(slideNumber + 1)
                }}
            >
                { slideNumber === slideCount - 1 ? <div></div> : items.length === 0 ? <div></div> : <CgArrowLongRight /> }
            </div>


        </div>
    
    </>
  )
}

export default Carousel;