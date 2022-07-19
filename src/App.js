import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserContext from './context/UserContext';
import { useEffect, useContext } from 'react';
import Homepage from './pages/homepage/Homepage';
import PageNotFound from './pages/homepage/PageNotFound';
import Login from './pages/account/Login';
import TrainerSignup from './pages/account/TrainerSignup';
import ClientSignup from './pages/account/ClientSignup';
import OptionPage from './pages/account/Options';
import CreateTrainerProfile from './pages/profile/CreateTrainerProfile';
import CreateClientProfile from './pages/profile/CreateClientProfile';
import CreateClass from './pages/createClass/CreateClass';
import TrainerClasses from './pages/classes/Classes';
import TrainerProfile from './pages/profile/TrainerProfile';
import Clients from './pages/Clients';
import Trainers from './pages/Trainers';
import ClientClasses from './pages/classes/ClientClasses';
import FindAClass from './pages/classes/FindAClass';
import ClassModal from './pages/classes/ClassModal';
import ClientProfile from './pages/profile/ClientProfile';
// import TrainerDashboard from './pages/dashboard/TrainerDashboard';
// import ClientDashboard from './pages/dashboard/ClientDashboard';
import Session from './pages/classes/Session';
import UpcomingEvents from './pages/classes/UpcomingEvents';
import EditClass from './pages/classes/EditClass';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import AccessDenied from './pages/homepage/AccessDenied';
import { setCurrentUser } from './files/userProfile';
import PersistLogin from './components/PersistLogin';
import OfferedClassModal from './components/modals/OfferedClassModal';
import TrainerReviewModal from './components/modals/TrainerReviewModal';





function App() {


 


  const { setUser, setLoggedIn, user, loggedIn } = useContext(UserContext);
  

  useEffect(() => {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const isAuth = JSON.parse(localStorage.getItem("isAuth"));

    setUser(currentUser);
    setLoggedIn(isAuth);


}, [setLoggedIn, setUser]);

  console.log(user, loggedIn);



  useEffect(() => {


    const findUser = async () => {


      const loggedInUser = localStorage.getItem("currentUser");

      if(loggedInUser){
        const currentUser = JSON.parse(loggedInUser);
        const isAuth = JSON.parse(localStorage.getItem("isAuth"));

        setUser(currentUser);
        setLoggedIn(isAuth);
      }
      else{

      

        try {


          let res = await setCurrentUser();
          console.log(res);

          if(res.status === 200){

            setUser(res.data.user[0]);
            setLoggedIn(res.data.logIn);

            localStorage.setItem("currentUser", JSON.stringify(res.data.user[0]));
            localStorage.setItem("isAuth", res.data.logIn);


          }
          if(res.status === 401){
              setLoggedIn(false);
              setUser(null);
              localStorage.removeItem("currentUser");
              localStorage.removeItem("isAuth");
          }
         

          
      } catch (error) {
        console.log(error);
          setLoggedIn(false);
          setUser(null);
      }

      }


      

      

      

    }

    findUser();


 }, [setUser, setLoggedIn]);

  return (
    <div className="App">
     
      <BrowserRouter>
        

          

            <Routes>

              <Route path="/" element={ <Layout /> }> 


                {/* public routes */}
                <Route path="/" element={ <Homepage /> } /> 
                <Route path="signup-as-a-trainer" element={ <TrainerSignup /> } />
                <Route path="signup-as-a-client" element={ <ClientSignup /> } />
                <Route path="login" element={ <Login /> } />


                <Route element={<PersistLogin />}>                  

                  {/* private routes   */}
                  <Route element={<RequireAuth allowedRoles={[3030]} />}>
                  

                    <Route path='auth/dashboard/trainer/classes' element={ <TrainerClasses /> } />
                    <Route path='auth/dashboard/trainer/clients' element={ <Clients /> } />
                    <Route path='auth/dashboard/trainer/profile' element={ <TrainerProfile /> } />
                    <Route path='auth/dashboard/trainer/create-a-class' element={ <CreateClass /> } />
                    <Route path='auth/dashboard/trainer/classes/session/:id' element={ <Session /> } />
                    <Route path='auth/dashboard/trainer/classes/edit-class/:id' element={ <EditClass /> } />
                    <Route path='auth/dashboard/trainer/classes/upcoming-events' element={ <UpcomingEvents /> } />
                    <Route path='auth/create-trainer-profile' element={ <CreateTrainerProfile /> }  />

                  
                  </Route>



                  


                  <Route element={<RequireAuth allowedRoles={[3030, 3050]} />}>
                    <Route path='auth/dashboard/:id' element={ <Dashboard /> } />
                    <Route path='auth/options' element={ <OptionPage /> } />
                  </Route>





                  <Route element={<RequireAuth allowedRoles={[3050]} />}>
                  
                    <Route path='auth/create-client-profile' element={ <CreateClientProfile /> } />
                    <Route path='/auth/dashboard/client/trainers' element={ <Trainers /> } />
                    <Route path='/auth/dashboard/client/classes' element={ <ClientClasses /> } />
                    <Route path='/auth/dashboard/client/classes/find-a-class' element={ <FindAClass /> } />
                    <Route path='/auth/dashboard/client/classes/details/:id' element={ <ClassModal /> } />
                    <Route path='/auth/dashboard/client/trainers/offered-classes/:id' element={ <OfferedClassModal /> } />
                    <Route path='/auth/dashboard/client/trainer-rating/:id' element={ <TrainerReviewModal /> } />
                    <Route path='/auth/dashboard/client/profile' element={ <ClientProfile /> } />
                    <Route path='auth/dashboard/client/classes/upcoming-events' element={ <UpcomingEvents /> } />
                    

                  </Route>


                </Route>

              
              
              </Route>      
              


             

              <Route path="/denied" element={ <AccessDenied /> } />
              <Route path="*" element={ <PageNotFound /> } />

                
            </Routes>
          

      </BrowserRouter>
    </div>
  );
}

export default App;
