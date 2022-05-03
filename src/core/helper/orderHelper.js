import { API } from "../../backend";

const placeAnOrder = async (userId, token, orderData)=>{
  const response = await fetch(`${API}order/add/${userId}`, {
      method:"POST", 
      body:JSON.stringify(orderData),
      headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
          Authorization : `Bearer ${token}`
      }, 
  }); 
  const data = await response.json(); 
  return data; 
}

export{placeAnOrder}; 