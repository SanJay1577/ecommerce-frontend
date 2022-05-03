import React, { useState } from "react";

import { clearCart} from "./helper/cartStorageHelper";
import {API} from "../backend"; 
import { placeAnOrder } from "./helper/orderHelper";
import { isAccesed } from "../authentication/auth";


const PaymentComponent = ({
    products, 
    setReload = s=> s, 
    reload = undefined}
    )=>{

        const [success, setSuccess] = useState(""); 


 const finalAmount = ()=>{
      let amount = 0
      // eslint-disable-next-line array-callback-return
      products?.map(prod=>{
          amount = amount + prod.price
      }); 
      return amount; 
  }
  const names = products?.map(prod=>prod.name).toString(); 
const {user, token} = isAccesed(); 

  const intiatePayment = (data)=>{
      const options = {
          key :"rzp_test_5tryMhqt9Vmpby",
          amount : data.amount,
          currecy: data.currecy,
          order_id:data.id,
          description :"Products Transactions",
          name:names,
          handler : async (response)=>{
              //start of the handler function 
              try {
                  const res = await fetch(`${API}payment/verify`, {
                      method:"POST",
                      body :JSON.stringify(response),
                      headers:{
                          "Content-Type":"application/json",
                      }
                  }); 
                  const data = await res.json(); 
                  setSuccess(data.message); 
                  clearCart(()=>setReload(!reload)); 
                  const orderData = {amount :finalAmount(), name:names}
                  placeAnOrder(user._id, token, orderData ).then(data=>{
                      if(data.error){
                          console.log(data.error)
                      }
                  })
              } catch (error) {
                  console.log(error)
              }
          }, 
          theme :{
              color: "#3399cc",
          },
     
      }; 
      const rsp1 = new window.Razorpay(options); 
      rsp1.open(); 
  }

  const handlePayemnt = async ()=>{
     try {
         const response = await fetch(`${API}payment/orders`, {
             method:"POST", 
             body:JSON.stringify({amount:finalAmount()}),
             headers:{
                 Accept:"application/json",
                 "Content-Type":"application/json"
             }, 
         }); 
         const data = await response.json(); 
           intiatePayment(data.data)
     } catch (error) {
         console.log(error); 

     }
  }


    return <div>

   <h2>Total amount Rs. {finalAmount()} </h2>
  <button onClick= {handlePayemnt} className="btn-warning btn">pay with razorpay</button> 
   <br/> <br/>
   {success ?  <div className="alert alert-success">{success}</div>: ""}
    </div>
}

export default PaymentComponent; 