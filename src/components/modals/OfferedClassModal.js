import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
import UserContext from "../../context/UserContext";
import usePagination from "../../hooks/usePagination";
import OfferedClass from "../class/OfferedClass";
import DashboardLayout from "../DashboardLayout";
import LoadingData from "../LoadingData";
import MessageBox from "../MessageBox";
import Paginate from "../Paginate";







const OfferedClassModal = () => {

    const { id } = useParams();
    const { setLoggedIn } = useContext(UserContext);

    const navigate = useNavigate();



    const [isPending, setIsPending] = useState(true);
    const [allClasses, setAllClasses] = useState([]);
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState({
        body: "",
        type: ""
    });




    useEffect(() => {

      const getAllClasses = async() => {

          const emptyClasses = [];

          try {
              

              let res = await axios.get(`/auth/dashboard/client/trainers/offered-classes/${id}`, {
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
      
      
  }, [setLoggedIn, message, id]);


  const { displayData, pageCount, changePage } = usePagination(allClasses, 6);


  const addClass = async ( element ) => {
    const data = {
        classId: element.classId,
        trainerId: id
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
                  

                  <div className="find_all_classes_container">

                    <div className="find-all-classes-items">
                        {
                            displayData.map((item, index) => (
                                <OfferedClass item={item} key={index} addClass={addClass}/>
                            ))

                            
                        }
                    </div>
                    
                    <Paginate pageCount={pageCount} changePage={changePage} /> 


                  </div>


              </div>
              

          </DashboardLayout>
      }
       
    </>
  )
}

export default OfferedClassModal