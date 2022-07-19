import { useState } from 'react';
import '../../files/styles/account.css';
import useAuth from '../../context/useAuth';
import NoUserHeader from '../../components/NoUserHeader';
import SignupDropdown from '../homepage/SignupDropdown';
import MessageBox from '../../components/MessageBox';





const Login = () => {

    // const { loggedIn } = useContext(UserContext);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dropdown, setDropdown] = useState(false);




    const { login, message, messageOpen, closeMessage} = useAuth();




    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {email, password};

        await login(data);

        // console.log(data);
        
    }

    const handleClick = () => {
        setDropdown(!dropdown)
    };


    return ( 

        <>
            <NoUserHeader cName="account-logo" />
            <div className="login_page">
                
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
                                {/* {errors.email && <span>*{errors.email}</span>} */}

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
                                {/* {errors.password && <span>*{errors.password}</span>} */}

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

                {dropdown && <SignupDropdown />}

            </div>

        </>


     );

    

    
}
 
export default Login;