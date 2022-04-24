import React,{useState} from "react";
import {useHistory} from 'react-router-dom';



import '../App.css';
//import './login.css';
import { Button } from "./Button";
import './MultipleInputs.css'
const MultipleInputs=()=>{
    
    const history=useHistory();
    const [user,setUser]=useState({
        name:"",email:"",phone:"",password:"",cpassword:""
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
const {name,email,phone,password,cpassword}=user;
const res=await fetch("/register",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        name,email,phone,password,cpassword
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
    history.push('/login');
  }


}


    return(
        
    <form method="POST" >
       <div class="container">
           <div class="ab"><h1 style={{color:"white"}}>Sign-Up</h1></div>
           <div class="items">
        <div>
            <label htmlFor="name"></label>
            <input type="text" name="name" id="name" autoComplete="off"
            value={user.name}
            onChange={handleInputs}
            placeholder="USERNAME"/>
        </div>
        <div>
            <label htmlFor="email"></label>
            <input type="email" name="email" id="email" autoComplete="off"
            value={user.email}
            onChange={handleInputs}
            placeholder="EMAIL"/>
        </div>
        <div>
            <label htmlFor="phone"></label>
            <input type="tel" name="phone" id="phone" autoComplete="off"
            value={user.phone}
            onChange={handleInputs}
            placeholder="PHONE"/>
        </div >
        <div>
            <label htmlFor="password"></label>
            <input type="password" name="password" id="password" autoComplete="off"
            value={user.password}
            onChange={handleInputs}
            placeholder="NEW PASSWORD"/>
        </div>
        <div>
            <label htmlFor="cpassword"></label>
            <input type="password" name="cpassword" id="cpassword"autoComplete="off"
            value={user.cpassword}
            onChange={handleInputs}
            placeholder="VERIFY PASSWORD"/>
        </div>
        
        </div>
        <div class="ab">
        <Button onClick={PostData}>Register</Button>
        </div>
        </div>
        
    </form>
    
    );
}
export default MultipleInputs