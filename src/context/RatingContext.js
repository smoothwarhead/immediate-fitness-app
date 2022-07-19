import { createContext, useState } from 'react';


export const RatingContext = createContext({});

export const RatingProvider = ({ children }) => {

 
    


    return (
        <RatingContext.Provider value={{rating, setRating, ratingText, setRatingText, isSubmitted, setIssubmitted, handleSubmit}}>
            {children}
        </RatingContext.Provider>
    )

}

export default RatingContext;