import React, { createContext,useReducer } from 'react';
import './App.css';
import Navbar from './components/Navbar';

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './components/pages/Home';
import login from './components/pages/login';
import signup from './components/pages/signup';
import find from './components/pages/find';
import Aboutus from './components/pages/Aboutus';
import Postlogin from './components/pages/postlogin';
import plog from './components/pages/plog';
import Logout from './components/logout';
import  Regdevice from './components/pages/regdevice';
import Findfault from './components/pages/findfault';
import { initialState,reducer } from './components/reducer/UseReducer';

//import vid1 from "./components/videos/video1.mp4";
//  import HeroSection from './components/HeroSection';
export const UserContext =createContext();
const Routing=()=>{
  return(
<Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={login} />
        <Route path='/sign-up' component={signup} />
        <Route path='/find' component={find} />
        <Route path='/Aboutus' component={Aboutus} /> 
        <Route path='/plog' component={plog} /> 
        <Route path='/postlogin' component={Postlogin} /> 
        <Route path='/logout' component={Logout} /> 
        <Route path='/reg' component={Regdevice} /> 
        <Route path='/fault' component={Findfault} /> 
         
      </Switch>
  )
}

const App=()=> {
  const [state,dispatch]=useReducer(reducer,initialState)


  return (
    
    <>
  
    <Router>
      <UserContext.Provider value={{state,dispatch}}>
      <Navbar />
      <Routing/>
      </UserContext.Provider>
      </Router>
      
      
        
    </>
  );
}

export default App;
