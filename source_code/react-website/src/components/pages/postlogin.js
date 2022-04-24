import React, { useEffect,useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button } from '../Button';
// import image from "./i2.jpg";
import './postlogin.css';
import regdevice from './regdevice';

const Postlogin = () => {
  
  const history = useHistory();
  const [ userData, serUserdata]= useState({})

const CallPostlogin=async()=>{
  try{
    const res= await fetch("/about",{
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:"include"
    });
    const data= await res.json();
    console.log(data);
    serUserdata(data);
    // console.log(userData.name);


    if(!res.status===200){
      
      const error=new Error(res.error);
      throw error;
    }

  }catch(err){
console.log(err);
history.push('/login');
  }

}


useEffect(()=>{
  CallPostlogin();
  
},[]);

const regd =async(e)=>{
e.preventDefault();
history.push('/reg');
}
const findf=async(e)=>{
  e.preventDefault()
  history.push('/fault');
}

  return (
    <>
    <form method='GET'>
    
  

    
    
    </form>
    <div>
        <div class="about-section">
        <div class="inner-container">
           <h1> Welcome {userData.name}</h1>   
           <h3>User id:{userData._id}</h3>
           <br>
           </br>
            <p class="text">
                Please select your option
            </p>
            <div class="skills">
                <span class="active"></span>
                
                <span></span>
                <span></span>
            </div>
            ------------------------------<br></br>
            <br></br>
            <Button onClick={regd}>Register Device</Button>
            <br></br>
            <br></br>
            <Button onClick={findf}>Check Status</Button>
        </div>
    </div>
    </div>
    
    
    </>
  )
 
}

export default Postlogin