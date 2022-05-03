import React, { useEffect, useState } from"react"; 
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAllOrders } from "../admin/helper/adminApiRequest";
import { isAccesed } from "../authentication/auth";
import Base from "../core/Base";

const AdminLeftSide = ()=>{
    const history = useHistory(); 
    return (
        <div className="card">
            <div className="card-header bg-dark text-white text-center">Admin Works</div>
            <ul className="list-group">
                <li className="list-group item">
                    <button onClick={()=>history.push("/admin/add/category")} 
                    className="btn bg-success text-white p-2 m-2">Add Category</button>
                </li>

                <li className="list-group item">
                    <button onClick={()=>history.push("/admin/categories")} 
                    className="btn bg-success text-white p-2 m-2">Manage Category</button>
                </li>

                <li className="list-group item">
                    <button onClick={()=>history.push("/admin/add/products")} 
                    className="btn bg-success text-white p-2 m-2">Add Product</button>
                </li>

                <li className="list-group item">
                    <button onClick={()=>history.push("/admin/products")} 
                    className="btn bg-success text-white p-2 m-2">Manage Product</button>
                </li>

                <li className="list-group item">
                    <button onClick={()=>history.push("/admin/orders")} 
                    className="btn bg-success text-white p-2 m-2">Manage Orders</button>
                </li>
            </ul>
        </div>
    )
}

const AdminRightSide= ()=>{
    const {user, token} = isAccesed(); 
    const [length, setLength]= useState(null);
    useEffect(()=>{
           getAllOrders(user._id, token).then(data=>{
               if(data.error){
                    console.log(data.error)
               }if(data.status !== "Deliverd"){
                   setLength(data.length)
               }
           })
    }, [user._id, token])

    return (
      <div className="card mb-4">
          <h4 className="card-header bg-dark">Admin Information</h4>
          <ul className="list-group ">
              <li className="list-group-item text-dark bg-white m-2 p-2">
                  <span className="badge badge-warning">Name:</span> {user.name}
              </li>
              <li className="list-group-item text-dark bg-white m-2 p-2">
                  <span className="badge badge-warning">Email:</span> {user.email}
              </li>
              <li className="list-group-item text-dark bg-white m-2 p-2">
                  <span className="badge badge-success">No of pending Orders</span>
                   <h2>{length}</h2>
              </li>

          </ul>
      </div>
    )
}

function AdminDashBoard(){
    return (
        <Base  title="Admin Dashboard" description="This is Admin Dashboard">
          <div className="row admin-dash bg-secondary p-2">
              <div className="col-sm-3"><AdminLeftSide/></div>
              <div className="col-sm-9"><AdminRightSide/></div>
          </div>
        </Base>
    )
}

export default AdminDashBoard; 