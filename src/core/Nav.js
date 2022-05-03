import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {  isAccesed, signout } from "../authentication/auth";
import { Fragment } from "react";


function NavBar(){
   const history = useHistory(); 
    return (
        <nav>
            <ul className="nav nav-tabs">
                
                <li className="nav-item">
                    <button className="btn bg-dark text-white p-1 m-1"
                    onClick={()=>history.push("/")}>Home</button>
                </li>
            
               <li className="nav-item">
                    <button className="btn bg-dark text-white p-1 m-1"
                    onClick={()=>history.push("/cart")}>Cart</button>
                </li>
         

                {isAccesed() && isAccesed().user.role === 0 && (
                <li className="nav-item">
                    <button className="btn bg-dark text-white p-1 m-1"
                    onClick={()=>history.push("/user/dashboard")}>Dashboard</button>
                </li>
                )}

                {isAccesed() && isAccesed().user.role === 1 && (
                <li className="nav-item">
                    <button className="btn bg-dark text-white p-1 m-1"
                    onClick={()=>history.push("/admin/dashboard")}>Admin</button>
                </li>
                )}

                {!isAccesed() && (
                <Fragment>
                <li className="nav-item">
                    <button className="btn bg-dark text-white p-1 m-1"
                    onClick={()=>history.push("/signup")} >Signup</button>
                </li>
                <li className="nav-item">
                    <button className="btn bg-dark text-white p-1 m-1"
                    onClick={()=>history.push("/signin")}>Signin</button>
                </li>
                </Fragment>
                )}

                 {isAccesed() && ( <li className="nav-item">
                    <button className="btn bg-dark text-white p-1 m-1"
                    onClick={()=>{signout(()=>{history.push("/")})}}>Signout</button>
                </li>)}
            </ul>
            
        </nav>
    )
}

export default NavBar; 