
import { API } from "../backend.js";

const signup = (user) => {
  return fetch(`${API}signup`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


const signin = async(user)=>{
  try {
     const res = await fetch(`${API}signin`, {
         method:"POST",
         body:JSON.stringify(user),
         headers:{
      "Content-Type":"application/json"
         },
     }); 
     const data = await res.json(); 
     return await data; 
  } catch (error) {
      console.log(error)
      return await error;
  }
}

const signout = async next =>{
   if(typeof window != "undefined"){
   localStorage.removeItem("jwt")
  const res= await fetch(`${API}signout`,{
    method:"GET",
  });
  const data = await res.json(); 
  next();
  return data; 
}
}

const authenticate = (data, next)=>{
  if(typeof window !== "undefined"){
    localStorage.setItem("jwt", JSON.stringify(data));
      next(); 
  }
}
const isAccesed = ()=>{
  if(!localStorage.getItem("jwt")){
    return false;
  }if(localStorage.getItem("jwt")){
    return JSON.parse(localStorage.getItem("jwt"))
  }else return false;
}

export { signup, signin, authenticate, isAccesed, signout };


