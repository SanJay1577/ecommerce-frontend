import React, { useEffect, useState } from"react"; 
import Base from "../core/Base";
import {isAccesed} from "../authentication/auth"
import { API } from "../backend";

function UserDashBoard(){

    const {user, token} =  isAccesed(); 

    const [orders, setOrders] = useState()
    useEffect(()=>{
         const getOrderDetails = async()=>{

         const res= await fetch(`${API}orders/user/${user._id}`, {
                method:"GET",
                headers:{
                    Authorization : `Bearer ${token}`
                }
            }); 
            const data = await res.json(); 
            setOrders(data);
             
        }
        getOrderDetails()
    }, [user._id, token])

    return (
        <Base  title="User Dashboard" description="View all your orders here">
          <div className="row user-box">
              <div className="col-sm-12">
                  <h2 className="text-white">Username : <span className="text-warning">{user.name}</span></h2>
                  <div className="col-sm-12">
                      <h1 className="text-info text-center">Orders</h1>
               {orders && (
                          <table className="table">
                          <thead className= "text-warning">
                              <tr>
                                  <th>Name</th>
                                  <th>Amount</th>
                                  <th>Status </th>
                              </tr>
                          </thead>
                          { orders.map((order, index)=>(
                          <tbody key = {index} className="text-success" >
                            <tr key={index}>
                                <td>{order.name}</td>
                                <td>Rs.{order.amount}</td>
                                <td>{order.status}</td>
                            </tr>
                          </tbody>
                          ))}  
                      </table>
                      )}
                      
               

                  </div>
              </div>
          </div>
        </Base>
    )
}

export default UserDashBoard; 