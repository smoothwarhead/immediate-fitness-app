import { useState } from 'react';
import '../../files/styles/account.css';
import useAuth from '../../context/useAuth';
import NoUserHeader from '../../components/NoUserHeader';
import SignupDropdown from '../homepage/SignupDropdown';
import MessageBox from '../../components/MessageBox';
import useMediaQuery from '../../hooks/useMediaQuery';
import MobileSignUpDropdown from '../homepage/MobileSignUpDropdown';
import LoadingData from '../../components/LoadingData';
import { useNavigate } from 'react-router-dom';






const Login = () => {

    // const { loggedIn } = useContext(UserContext);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [dropdown, setDropdown] = useState(false);
    


    const isMax1180 = useMediaQuery('(max-width: 1180px)');

    const navigate = useNavigate();




    const { login, message, messageOpen, closeMessage, isPending, setIsPending } = useAuth();



    const validate = (values) => {
        const errors = {};

        if (!values.email){
            errors.email = 'Email required';
        }
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
            errors.email = 'Please enter a valid email';
        }
        if(!values.password){
        errors.password = 'Password is required';
        }
        else if(values.password.length < 6){
            errors.password = 'Password must contain between 6 and 60 characters'
        }


        return errors;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {email, password};

        if(email === "" || password === ""){
            setErrors(validate(data));

        }
        else{
            setIsPending(true);
            await login(data);

        }
        
    }

    const handleClick = () => {
        setDropdown(!dropdown)
    };


    return ( 

        <>

            {dropdown && <SignupDropdown dropdown={dropdown} handleClick={handleClick} />}

            {isMax1180 && dropdown &&
                <div className={`homepage-m-dropdown ${isMax1180 && dropdown ? "mobile-d-open" : "mobile-d-close"}`}>
                    <MobileSignUpDropdown dropdown={dropdown} setDropdown={setDropdown} />
                </div>
            }

            { isPending && <LoadingData /> }


            { !isPending && <NoUserHeader cName="account-logo" />}


            { !isPending &&
                <div className="login_page">
                    
                    <div className="account-back-btn-container">
                        <div className="back_btn account-back-btn" onClick={() => navigate(-1)}>Back</div>
                    </div>
                    
                    <div className="account-content">
                        
                        
                        {messageOpen && <MessageBox message={message} closeMessage={closeMessage} /> }

                        <div className="form_container login_container">
                            <div className="form_header"><p className="login-p">Login</p> </div>
                            <div className="form">

                                <div className="form_elements">
                                    <label className='login-label'>Enter your email</label>
                                    <input 
                                        type="text" 
                                        name="email" 
                                        className="email" 
                                        placeholder="Email Address" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errors.email && <span className='error-message'>{errors.email}</span>}


                                </div>

                                <div className="form_elements">
                                    <label className='login-label'>Enter a password</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        className="password" 
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}

                                    />
                                    {errors.password && <span className='error-message'>{errors.password}</span>}


                                </div>

                            </div>

                            <div 
                                onClick={handleSubmit}
                                className="btn login_btn"
                            >
                                Login
                            </div>

                            <div className="no_question"><p>Don't have an account?</p></div>
                            <div className="create-btn-container">
                                <div 
                                    className="btn create_btn"
                                    onClick={handleClick}
                                >
                                    create account
                                </div>

                            </div>

                            
                        </div>
                    </div>



                </div>
            }

        </>


     );

    

    
}
 
export default Login;