
import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
import UserContext from "../../context/UserContext";
import '../../files/styles/rating.css';
import MessageBox from "../MessageBox";
import StarRating from "../StarRating";




const TrainerReviewModal = () => {

    const { setLoggedIn } = useContext(UserContext);
    const { id } = useParams(); 
    const { state } = useLocation();
    const { name } = state;
    const navigate = useNavigate();

    const [value, setValue] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState({
        body: "",
        type: ""
    });

   
    const getValue = (v) => {
        setValue(v);
    }
   



    const handleSubmit = async (e) => {       
        e.preventDefault();
        if(isSubmitted){
            const data = {rating: value};
            

            try {

                let res = await axios.post(`/auth/dashboard/client/trainer-rating/${id}`, 
    
                    JSON.stringify(data),{
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true
                    })
    
                if(res.status === 201){
                    
                    setMessageOpen(true);
                    setMessage({...message, body: res.data.message, type: "success" });
                    setTimeout(() => {
                        navigate('/auth/dashboard/client/trainers');
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
            
            setIsSubmitted(false);
        }
        


    }


    function handleClick() {
        navigate(-1)
    }

    const closeMessage = () => {
        setMessageOpen(false);
    }
    

  return (
    <>
        <div className='modal_background'>
            {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }

            <form className="modal_container" onSubmit={handleSubmit}>
                <div className="trainer-modal-header">                    
                    <div className="modal_return rating-modal-return" onClick={handleClick}>Back</div>
                </div>

                <div className="modal_body rating-modal-body">
                                    
                    <div className="rating-first-question">
                        How would you rate {`${name}`} as  a trainer?
                    </div>

                    <div className="modal-rating">
                        <StarRating getValue={getValue}/>
                    </div>


                    {/* <div className={rating !== 5 ? "modal-rating-text" : "modal-rating-text in-active" }>
                        <div className="rating-second-question">
                            Sorry to hear. What was the problem?
                        </div>

                        <textarea 
                            cols="50" 
                            rows="10"
                            value={ratingText}
                            onChange={v => setRatingText(v.target.value)}
                        ></textarea>
                    </div> */}


                </div>

                <div className="rating-modal-footer">
                    <button className="modal-rating-btn" onClick={() => setIsSubmitted(true)}>Rate and Review</button>
                </div>
            </form>
        </div>
    
    </>
  )
}

export default TrainerReviewModal