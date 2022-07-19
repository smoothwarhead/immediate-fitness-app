import { useState } from "react";
import { FaStar } from "react-icons/fa";
import '../files/styles/rating.css';

const StarRating = ({getValue}) => {

    const [hover, setHover] = useState(null);

    const [ rating, setRating ] = useState(null);


    const setStyle = (rating) => {
        if(rating === 1){
            return {color: "#E10321"};
        }
        if(rating === 2){
            return {color: "#E10321"};
        }
        if(rating === 3){
            return {color: "#C68A13"};
        }
        if(rating === 4){
            return {color: "#0151C3"};
        }
        if(rating === 5){
            return {color: "#1DAE8C"};
        }
    }

    const setText = (rating) => {
        if(rating === 1){
            return "Terrible";
        }
        if(rating === 2){
            return "Bad";
        }
        if(rating === 3){
            return "Not Bad";
        }
        if(rating === 4){
            return "Could be better";
        }
        if(rating === 5){
            return "Perfect";
        }
    }

    const handleClick = (value) => {
        setRating(value);
        getValue(value);
    }


  return (
    <>
        {[...Array(5)].map((star, index) => {

            const ratingValue = index + 1;

            return(
                <label className="rating-label" key={index}>
                    <input 
                        type="radio" 
                        name="rating" 
                        className="rating-radio" 
                        value={ratingValue}
                        onClick={() => handleClick(ratingValue)}
                        
                    />

                    <FaStar 
                        className="fa-star"
                        color={ratingValue <= (hover || rating) ? "#F3CE66" : "#E4E4E4"}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                    />

                </label>

                // <FaStar 
                //     className="fa-star"
                //     color={ratingValue <= (hover || rating) ? "#F3CE66" : "#E4E4E4"}
                //     onMouseEnter={() => setHover(ratingValue)}
                //     onMouseLeave={() => setHover(null)}
                //     onClick={() => setRating(ratingValue)}
                // />
                

            )
        })}

        <div style={setStyle(rating)} className="modal-rating-remark">
            {setText(rating)}
        </div>
        
    </>
  )
}

export default StarRating;