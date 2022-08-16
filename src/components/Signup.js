import { useState, useEffect } from "react";
import { states } from "../files/states";
import validations  from '../files/ValidateFile';
import useAuth from '../context/useAuth';
import NoUserHeader from "./NoUserHeader";
import MessageBox from "./MessageBox";
// import useMediaQuery from "../hooks/useMediaQuery";
// import SignupDropdown from "../pages/homepage/SignupDropdown";
// import MobileSignUpDropdown from "../pages/homepage/MobileSignUpDropdown";
import LoadingData from "./LoadingData";





const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    city: '',
    state: ''
};

function Signup({role}) {

    const [data, setData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // const [dropdown, setDropdown] = useState(false);

    // const isMax1180 = useMediaQuery('(max-width: 1180px)');




    const { register, message, messageOpen, closeMessage, isPending, setIsPending } = useAuth();


    const handleSubmit = (e) => {
        e.preventDefault();

        if(errors){                
            setIsSubmitted(false);
            setErrors(validations(data));
        }
        setIsSubmitted(true);

        if(isSubmitted){
            const allValues = {...data, role: role};

            setIsPending(true);
            register(allValues);
        }
        
        

        // register(allValues);
    }

    useEffect(() => {
        if(Object.keys(errors).length === 0){           
           setIsSubmitted(true)
        }
    }, [errors, isSubmitted]);



    return ( 

        <>

                    
           

            { isPending && <LoadingData /> }

            { !isPending && <NoUserHeader cName="account-logo" />}


            {!isPending &&
                <div className="signup_page">
                
                    <div className="account-content">
                        
                        {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }

                        <div className="form_container signup_container">
                            <div className="form_header"><p className="register-p">Create Account</p></div>
                            <div className="form">

                                <div className="form_elements_flex">

                                    <div className="form_elements first_element">
                                        <label className="register-label">Enter your first name</label>
                                        <input 
                                            type="text" 
                                            name="firstName" 
                                            className={!errors.firstName ? "firstName" : "error" }
                                            placeholder="First Name"
                                            value={data.firstName}
                                            onChange={(e) => setData({...data, firstName: e.target.value})}
                                    
                                        />
                                        {errors.firstName && <span>*{errors.firstName}</span>}
                                    </div>

                                    <div className="form_elements last_element">
                                        <label className="register-label">Enter your last name</label>
                                        <input 
                                            type="text" 
                                            name="lastName" 
                                            className={!errors.lastName ? "lastName" : "error" } 
                                            placeholder="Last Name"
                                            value={data.lastName}
                                            onChange={(e) => setData({...data, lastName: e.target.value})}

                                        />
                                        {errors.lastName && <span>*{errors.lastName}</span>}

                                    </div>
                                </div>

                                <div className="form_elements">
                                    <label className="register-label">Enter your email</label>
                                    <input 
                                        type="text" 
                                        name="email" 
                                        className={!errors.email ? "email" : "error" } 
                                        placeholder="Email Address"
                                        value={data.email}
                                        onChange={(e) => setData({...data, email: e.target.value})}
                                        
                                    />
                                    {errors.email && <span>*{errors.email}</span>}

                                </div>

                                <div className="form_elements">
                                    <label className="register-label">Create password</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        className={!errors.password ? "password" : "error" } 
                                        placeholder="Password"
                                        value={data.password}
                                        onChange={(e) => setData({...data, password: e.target.value})}

                                    />
                                    {errors.password && <span>*{errors.password}</span>}

                                </div>


                                <div className="form_elements_flex">

                                    <div className="form_elements first_element">
                                        <label className="register-label">City</label>
                                        <input 
                                            type="text" 
                                            name="city" 
                                            className={!errors.city ? "city" : "error" } 
                                            placeholder="City"
                                            value={data.city}
                                            onChange={(e) => setData({...data, city: e.target.value})}
                                            
                                        />
                                        {errors.city && <span>*{errors.city}</span>}

                                    </div>

                                    <div className="form_elements last_element">
                                        <label className="register-label">State</label>
                                        <select name="states" className="states" value={data.state} onChange={(e) => setData({...data, state: e.target.value})}>

                                            { states.map((state, index) => <option value={state} key={index}>{state}</option>

                                            )};
                                            
                                        </select>
                                    </div>




                                </div>
                                

                            </div>
                            <div 
                                className="btn register_btn" 
                                onClick={handleSubmit}
                            >
                                Create Account
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
     );
}

export default Signup
