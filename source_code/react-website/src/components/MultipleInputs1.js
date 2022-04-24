import React,{useState,useContext}from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
//import '../App.css';
//import './login.css';
import { Button } from "./Button";
import './MultipleInputs1.css'
//import icon from "./user.png";
const MultipleInputs1=()=>{
    const {state,dispatch} = useContext(UserContext);
    const history=useHistory();
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const loginUser=async (e)=>{
e.preventDefault();
const res = await fetch('/signin',{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        email,password
    })
    
});
const data = res.json();
if(res.status===400 || !data){
    window.alert("Invalid Credentials");

}else{
    dispatch({type:"USER",payload:true})
    window.alert("Login Successful")
    history.push('/postlogin');
    
}


}


    return(
        <>
    <form method="POST" >
       <div class="container">
           <div class="ab"><h1 style={{color:"white"}}>Login</h1></div>
           <div class="items">
        <div>
            <label htmlfor="username"></label>
            <input type="text" name="username" id="username"autoComplete="off"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
             placeholder="USERNAME"/>
        </div>
        
        <div>
            <label htmlfor="password"></label>
            <input type="password" name="password" id="password"autoComplete="off"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="PASSWORD"/>
        </div>
        
        <div>
        </div>
        <div class="ab">
        <Button onClick={loginUser}>Login</Button>
        </div>
        </div>
        </div>
        <a href="./"><h6>Forgot Password?</h6></a>
    </form>
    
    </>
    );
}
export default MultipleInputs1