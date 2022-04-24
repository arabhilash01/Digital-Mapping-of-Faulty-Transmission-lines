import React,{useContext,useState}from 'react';
import {useHistory} from 'react-router-dom';
import { Button } from '../Button';
import { UserContext } from '../../App';

// import {useHistory} from 'react-router-dom';

import './regd.css';

const Regdevice = () => {
    const {state,dispatch} = useContext(UserContext);
    dispatch({type:"USER",payload:true})
    const history=useHistory();
    const [user,setUser]=useState({
        deviceid:"",place:"",lat:"",lng:""
    });
    let name,value;
    const handleInputs=(e) =>{
        console.log(e);
        name=e.target.name;
        value=e.target.value;

        setUser({...user,[name]:value});
    }

const PostData= async (e)=>{
e.preventDefault();
const {deviceid,place,lat,lng}=user;
const res=await fetch("/devreg",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        deviceid,place,lat,lng
    })
});
  const data = await res.json();
  console.log(data);
  if(res.status=== 422|| !data){
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
  }else{
    window.alert(" Registration Success");
    console.log("Registration Success");
    history.push('/postlogin');
  }


}

  
  
  
  
  
  
  
  
    return (
    <>
    
    <div class="a-section">
    <form class="forms" method="POST" >
    <div class="new_container">
        <div class="ab"><h1 style={{color:"white"}}>Register Device</h1></div>
        <div class="items">
     <div>
         <label htmlFor="device_id"></label>
         <input type="text" name="deviceid" id="deviceid" autoComplete="off"
         value={user.deviceid}
         onChange={handleInputs}
         placeholder="DEVICE-ID"/>
     </div>
     <div>
         <label htmlFor="place"></label>
         <input type="text" name="place" id="place" autoComplete="off"
        value={user.place}
        onChange={handleInputs}
         placeholder="PLACE"/>
     </div>
     <div>
         <label htmlFor="lat"></label>
         <input type="text" name="lat" id="lat" autoComplete="off"
        value={user.lat}
        onChange={handleInputs}
         placeholder="LATITUDE"/>
     </div >
     <div>
         <label htmlFor="lng"></label>
         <input type="text" name="lng" id="lng" autoComplete="off"
        value={user.lng}
        onChange={handleInputs}
        // 
         placeholder="LONGITUDE"/>
     </div >
     
     
     </div>
     <div class="ab">
       
     <Button onClick={PostData}>Register device</Button>
     </div>
     </div>
     
     
 </form>
 </div>
 </>
  )
}

export default Regdevice